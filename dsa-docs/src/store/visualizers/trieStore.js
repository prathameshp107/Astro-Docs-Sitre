import { create } from 'zustand';

/**
 * Trie visualizer state.
 *
 * Unlike the older visualizers, the step arrays here are NOT hand-authored —
 * they are produced by generators that walk a real trie. Two consequences:
 *
 *   1. Steps cannot describe a state the algorithm never reaches, and the
 *      `logicData` view is derived from this same trace, so the two arrays are
 *      1-to-1 by construction rather than by discipline.
 *   2. `setWords` / `setQuery` can retrace with different input, which the
 *      hardcoded stores cannot do.
 *
 * Every yielded step carries both the fields the visualizer renders and the
 * extra narration fields (`stepNum`, `title`, `computation`, `comparison`,
 * `action`) that LogicSection expects.
 */

// ── Pseudocode shown in the Concept Code panel ────────────────────────────
export const TRIE_CODE = {
  insert: [
    { line: 1, text: 'node = root' },
    { line: 2, text: 'for ch in word:' },
    { line: 3, text: '  if ch not in node.children:' },
    { line: 4, text: '    node.children[ch] = TrieNode()' },
    { line: 5, text: '  node = node.children[ch]' },
    { line: 6, text: 'node.isEnd = true' },
  ],
  search: [
    { line: 1, text: 'node = root' },
    { line: 2, text: 'for ch in word:' },
    { line: 3, text: '  if ch not in node.children:' },
    { line: 4, text: '    return false' },
    { line: 5, text: '  node = node.children[ch]' },
    { line: 6, text: 'return node.isEnd' },
  ],
  prefix: [
    { line: 1, text: 'node = root' },
    { line: 2, text: 'for ch in prefix:' },
    { line: 3, text: '  if ch not in node.children:' },
    { line: 4, text: '    return []' },
    { line: 5, text: '  node = node.children[ch]' },
    { line: 6, text: 'collect words in subtree(node)' },
  ],
};

// ── Trie model ────────────────────────────────────────────────────────────
// Nodes are kept flat with a parent pointer so the view can lay them out by
// depth without walking a nested structure. Ids are path-derived, which makes
// them stable across steps and unique without a counter.
const ROOT = 'root';
const makeNodes = () => [{ id: ROOT, parentId: null, char: '', isEnd: false, depth: 0 }];
const childOf = (nodes, parentId, char) =>
  nodes.find((n) => n.parentId === parentId && n.char === char);

const snapshot = (nodes) => nodes.map((n) => ({ ...n }));

/** Words reachable below `startId`, in insertion order. */
function wordsBelow(nodes, startId) {
  const out = [];
  const walk = (id, acc) => {
    const node = nodes.find((n) => n.id === id);
    if (node?.isEnd) out.push(acc);
    for (const c of nodes.filter((n) => n.parentId === id)) walk(c.id, acc + c.char);
  };
  walk(startId, pathTo(nodes, startId));
  return out;
}

/** Characters from root down to `id`. */
function pathTo(nodes, id) {
  let s = '';
  let cur = nodes.find((n) => n.id === id);
  while (cur && cur.parentId) {
    s = cur.char + s;
    cur = nodes.find((n) => n.id === cur.parentId);
  }
  return s;
}

const ancestors = (nodes, id) => {
  const ids = [];
  let cur = nodes.find((n) => n.id === id);
  while (cur) {
    ids.unshift(cur.id);
    cur = cur.parentId ? nodes.find((n) => n.id === cur.parentId) : null;
  }
  return ids;
};

// ── Traces ────────────────────────────────────────────────────────────────

function* traceInsert(words) {
  const nodes = makeNodes();

  yield {
    activeLine: 1,
    nodes: snapshot(nodes),
    activeId: ROOT,
    pathIds: [ROOT],
    word: '',
    charIndex: -1,
    status: 'init',
    state: { words: words.join(', '), nodes: nodes.length },
    title: 'Initialise empty trie',
    computation: 'root = TrieNode()',
    comparison: 'Trie empty',
    action: 'Init',
    desc: `Start with an empty trie — a single root node holding no character. Insert ${words.map((w) => `"${w}"`).join(', ')} one at a time.`,
  };

  for (const word of words) {
    let cur = ROOT;

    yield {
      activeLine: 1,
      nodes: snapshot(nodes),
      activeId: cur,
      pathIds: [ROOT],
      word,
      charIndex: -1,
      status: 'start-word',
      state: { inserting: word, node: 'root' },
      title: `Insert "${word}" — start at root`,
      computation: 'node = root',
      comparison: '—',
      action: `Begin "${word}"`,
      desc: `Insert "${word}". Every insertion restarts at the root and walks down one character at a time.`,
    };

    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      const existing = childOf(nodes, cur, ch);
      let createdId = null;

      if (!existing) {
        createdId = `${cur}/${ch}`;
        const depth = nodes.find((n) => n.id === cur).depth + 1;
        nodes.push({ id: createdId, parentId: cur, char: ch, isEnd: false, depth });
      }

      const nextId = existing ? existing.id : createdId;
      cur = nextId;

      yield {
        activeLine: existing ? 5 : 4,
        nodes: snapshot(nodes),
        activeId: cur,
        pathIds: ancestors(nodes, cur),
        createdId,
        word,
        charIndex: i,
        status: existing ? 'reuse' : 'create',
        state: {
          char: `'${ch}'`,
          [existing ? 'reused existing branch' : 'created node']: `'${ch}'`,
          nodes: nodes.length,
        },
        title: existing
          ? `'${ch}' already exists — reuse it`
          : `'${ch}' missing — create a node`,
        computation: existing
          ? `node = node.children['${ch}']`
          : `node.children['${ch}'] = TrieNode()`,
        comparison: existing ? `'${ch}' in children ✅` : `'${ch}' in children ❌`,
        action: existing ? `Reuse '${ch}'` : `Create '${ch}'`,
        desc: existing
          ? `'${ch}' is already a child here, so the branch is shared rather than duplicated — this is exactly how a trie saves space on common prefixes. Move down to it.`
          : `No child '${ch}' at this node, so create one and move down to it.`,
      };
    }

    nodes.find((n) => n.id === cur).isEnd = true;

    yield {
      activeLine: 6,
      nodes: snapshot(nodes),
      activeId: cur,
      pathIds: ancestors(nodes, cur),
      word,
      charIndex: word.length - 1,
      status: 'end-word',
      state: { inserted: word, 'isEnd at': `'${word.at(-1)}'`, nodes: nodes.length },
      title: `Mark end of "${word}"`,
      computation: 'node.isEnd = true',
      comparison: `"${word}" stored ✅`,
      action: 'Mark isEnd',
      desc: `Mark this node as the end of a word. Without this flag the trie could not tell "${word}" from a prefix of some longer word.`,
    };
  }

  yield {
    activeLine: 6,
    nodes: snapshot(nodes),
    activeId: ROOT,
    pathIds: [],
    word: '',
    charIndex: -1,
    status: 'done',
    state: { stored: words.join(', '), nodes: nodes.length },
    title: 'INSERT COMPLETE 🎉',
    computation: `${nodes.length} nodes total`,
    comparison: 'All words stored',
    action: 'Done',
    desc: `All ${words.length} words are stored in ${nodes.length} nodes. Words sharing a prefix share the same nodes, so a trie stores them in far less space than a plain list.`,
  };
}

function* traceSearch(words, queries) {
  // Build the trie silently; the search trace starts from a populated tree.
  const nodes = makeNodes();
  for (const word of words) {
    let cur = ROOT;
    for (const ch of word) {
      const existing = childOf(nodes, cur, ch);
      if (existing) { cur = existing.id; continue; }
      const id = `${cur}/${ch}`;
      nodes.push({ id, parentId: cur, char: ch, isEnd: false, depth: nodes.find((n) => n.id === cur).depth + 1 });
      cur = id;
    }
    nodes.find((n) => n.id === cur).isEnd = true;
  }

  yield {
    activeLine: 1,
    nodes: snapshot(nodes),
    activeId: ROOT,
    pathIds: [ROOT],
    word: '',
    charIndex: -1,
    status: 'init',
    state: { contains: words.join(', ') },
    title: 'Trie already holds the words',
    computation: `${nodes.length} nodes`,
    comparison: '—',
    action: 'Init',
    desc: `The trie already stores ${words.map((w) => `"${w}"`).join(', ')}. Now search it. Searching costs O(L) in the length of the query — the size of the dictionary does not matter.`,
  };

  for (const query of queries) {
    let cur = ROOT;
    let failed = false;

    yield {
      activeLine: 1,
      nodes: snapshot(nodes),
      activeId: cur,
      pathIds: [ROOT],
      word: query,
      charIndex: -1,
      status: 'start-word',
      state: { searching: query, node: 'root' },
      title: `Search "${query}" — start at root`,
      computation: 'node = root',
      comparison: '—',
      action: `Search "${query}"`,
      desc: `Search for "${query}". Walk down one character at a time from the root.`,
    };

    for (let i = 0; i < query.length; i++) {
      const ch = query[i];
      const existing = childOf(nodes, cur, ch);

      if (!existing) {
        yield {
          activeLine: 4,
          nodes: snapshot(nodes),
          activeId: cur,
          pathIds: ancestors(nodes, cur),
          missingChar: ch,
          word: query,
          charIndex: i,
          status: 'not-found',
          state: { char: `'${ch}'`, result: 'FALSE ❌' },
          title: `'${ch}' not found — "${query}" is absent`,
          computation: 'return false',
          comparison: `'${ch}' in children ❌`,
          action: 'Return false',
          desc: `There is no child '${ch}' at this node, so no word beginning "${query.slice(0, i + 1)}" was ever inserted. The search returns false immediately — it never looks at the rest of the trie.`,
        };
        failed = true;
        break;
      }

      cur = existing.id;
      yield {
        activeLine: 5,
        nodes: snapshot(nodes),
        activeId: cur,
        pathIds: ancestors(nodes, cur),
        word: query,
        charIndex: i,
        status: 'walk',
        state: { char: `'${ch}'`, depth: nodes.find((n) => n.id === cur).depth },
        title: `Match '${ch}' — move down`,
        computation: `node = node.children['${ch}']`,
        comparison: `'${ch}' in children ✅`,
        action: `Match '${ch}'`,
        desc: `'${ch}' exists as a child, so move down to it and continue with the next character.`,
      };
    }

    if (failed) continue;

    const node = nodes.find((n) => n.id === cur);
    yield {
      activeLine: 6,
      nodes: snapshot(nodes),
      activeId: cur,
      pathIds: ancestors(nodes, cur),
      word: query,
      charIndex: query.length - 1,
      status: node.isEnd ? 'found' : 'prefix-only',
      state: { 'node.isEnd': node.isEnd ? 'TRUE ✅' : 'FALSE ❌', result: node.isEnd ? 'FOUND' : 'PREFIX ONLY' },
      title: node.isEnd ? `"${query}" found ✅` : `"${query}" is only a prefix ❌`,
      computation: 'return node.isEnd',
      comparison: node.isEnd ? 'isEnd TRUE ✅' : 'isEnd FALSE ❌',
      action: node.isEnd ? 'Return true' : 'Return false',
      desc: node.isEnd
        ? `Every character matched and this node is flagged isEnd, so "${query}" was inserted as a complete word. Return true.`
        : `Every character matched, but this node is not flagged isEnd — "${query}" exists only as a prefix of a longer word, not as a word itself. This is why the isEnd flag is needed.`,
    };
  }
}

function* tracePrefix(words, prefix) {
  const nodes = makeNodes();
  for (const word of words) {
    let cur = ROOT;
    for (const ch of word) {
      const existing = childOf(nodes, cur, ch);
      if (existing) { cur = existing.id; continue; }
      const id = `${cur}/${ch}`;
      nodes.push({ id, parentId: cur, char: ch, isEnd: false, depth: nodes.find((n) => n.id === cur).depth + 1 });
      cur = id;
    }
    nodes.find((n) => n.id === cur).isEnd = true;
  }

  yield {
    activeLine: 1,
    nodes: snapshot(nodes),
    activeId: ROOT,
    pathIds: [ROOT],
    word: prefix,
    charIndex: -1,
    status: 'init',
    state: { contains: words.join(', '), prefix },
    title: `Autocomplete "${prefix}"`,
    computation: 'node = root',
    comparison: '—',
    action: 'Init',
    desc: `Find every stored word starting with "${prefix}". This is what powers autocomplete, and it is the operation a trie does better than any hash map.`,
  };

  let cur = ROOT;
  for (let i = 0; i < prefix.length; i++) {
    const ch = prefix[i];
    const existing = childOf(nodes, cur, ch);

    if (!existing) {
      yield {
        activeLine: 4,
        nodes: snapshot(nodes),
        activeId: cur,
        pathIds: ancestors(nodes, cur),
        missingChar: ch,
        word: prefix,
        charIndex: i,
        status: 'not-found',
        state: { char: `'${ch}'`, matches: '[] (none)' },
        title: `'${ch}' missing — no matches`,
        computation: 'return []',
        comparison: `'${ch}' in children ❌`,
        action: 'Return []',
        desc: `No child '${ch}', so nothing in the trie starts with "${prefix}". Return an empty list.`,
      };
      return;
    }

    cur = existing.id;
    yield {
      activeLine: 5,
      nodes: snapshot(nodes),
      activeId: cur,
      pathIds: ancestors(nodes, cur),
      word: prefix,
      charIndex: i,
      status: 'walk',
      state: { char: `'${ch}'`, depth: nodes.find((n) => n.id === cur).depth },
      title: `Walk to '${ch}'`,
      computation: `node = node.children['${ch}']`,
      comparison: `'${ch}' in children ✅`,
      action: `Match '${ch}'`,
      desc: `'${ch}' matched. Walking the prefix costs only O(${prefix.length}) — the length of the prefix, not the number of stored words.`,
    };
  }

  const matches = wordsBelow(nodes, cur);
  const subtree = [];
  const collect = (id) => { subtree.push(id); nodes.filter((n) => n.parentId === id).forEach((c) => collect(c.id)); };
  collect(cur);

  yield {
    activeLine: 6,
    nodes: snapshot(nodes),
    activeId: cur,
    pathIds: ancestors(nodes, cur),
    subtreeIds: subtree,
    word: prefix,
    charIndex: prefix.length - 1,
    status: 'found',
    state: { matches: matches.join(', ') || 'none', count: matches.length },
    title: `PREFIX COMPLETE 🎉 — ${matches.length} match${matches.length === 1 ? '' : 'es'}`,
    computation: `collect subtree → [${matches.join(', ')}]`,
    comparison: `${matches.length} words found ✅`,
    action: 'Collect',
    desc: `Landing on the prefix node, every word underneath it starts with "${prefix}". Collecting the subtree gives ${matches.map((m) => `"${m}"`).join(', ')}. A hash map would have to scan every key to answer this.`,
  };
}

// ── Defaults ──────────────────────────────────────────────────────────────
export const TRIE_DEFAULTS = {
  words: ['cat', 'car', 'dog'],
  searchQueries: ['car', 'cab', 'ca'],
  prefix: 'ca',
};

/** Build a step array for a track. Exported so trieLogic can reuse the trace. */
export function buildTrieSteps(track, opts = {}) {
  const words = opts.words ?? TRIE_DEFAULTS.words;
  if (track === 'search') return [...traceSearch(words, opts.queries ?? TRIE_DEFAULTS.searchQueries)];
  if (track === 'prefix') return [...tracePrefix(words, opts.prefix ?? TRIE_DEFAULTS.prefix)];
  return [...traceInsert(words)];
}

export const useTrieStore = create((set, get) => ({
  track: 'insert',
  words: TRIE_DEFAULTS.words,
  steps: buildTrieSteps('insert'),
  currentStep: 0,
  isPlaying: false,
  speed: 1,

  setTrack: (track) => {
    const t = ['insert', 'search', 'prefix'].includes(track) ? track : 'insert';
    set({ track: t, steps: buildTrieSteps(t, { words: get().words }), currentStep: 0, isPlaying: false });
  },

  /** Retrace with a different word list — impossible in the hardcoded stores. */
  setWords: (words) => {
    const clean = words
      .map((w) => String(w).toLowerCase().replace(/[^a-z]/g, ''))
      .filter(Boolean)
      .slice(0, 6);
    if (!clean.length) return;
    set({ words: clean, steps: buildTrieSteps(get().track, { words: clean }), currentStep: 0, isPlaying: false });
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) set({ currentStep: step });
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) set({ currentStep: currentStep + 1 });
    else set({ isPlaying: false });
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },

  restart: () => set({ currentStep: 0, isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
}));
