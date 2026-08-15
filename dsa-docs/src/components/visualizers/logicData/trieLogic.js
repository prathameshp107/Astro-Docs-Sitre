import { buildTrieSteps, TRIE_DEFAULTS } from '../../../store/visualizers/trieStore';

/**
 * Logic-tab data for the Trie visualizer.
 *
 * Every other topic keeps a second, hand-written copy of its steps here, which
 * has to stay 1-to-1 with the store by discipline alone — a wrong or missing
 * field renders as a blank diagram with nothing to catch it.
 *
 * This file instead derives from the same generator the store uses, so the two
 * arrays are identical in count and shape by construction. The traces already
 * emit `title`, `computation`, `comparison` and `action` for exactly this.
 */

const withStepNumbers = (steps) =>
  steps.map((s, i) => ({ ...s, stepNum: i + 1, array: [] }));

const TERMS = {
  Trie: 'A tree where each edge is one character, so a path from the root spells a prefix. Also called a prefix tree.',
  'isEnd flag': 'Marks a node as the end of a complete word. Without it, a trie cannot distinguish a stored word from a prefix of a longer one.',
  'Shared prefix': 'Words beginning with the same characters reuse the same nodes — this is where a trie saves space over storing whole strings.',
  'O(L) lookup': 'Search cost depends on the length of the query, not on how many words are stored.',
};

/**
 * NOTE ON KEY NAMES
 *
 * SPECIFIC_PROBLEM_LOGIC in LogicSection merges every topic's logic object into
 * one flat map, and it also aliases raw track names ('insert' -> 'insertion',
 * 'search' -> 'linear-search'). Plain 'search' here would therefore resolve to
 * searchingLogic's 'linear-search' entry and render the binary-search diagram.
 * Keys are namespaced with a `trie-` prefix to stay collision-proof.
 */

export const trieLogic = {
  'trie-insert': {
    title: 'Trie — Insert Words',
    input: `words = [${TRIE_DEFAULTS.words.join(', ')}]`,
    goal: 'Store each word character by character, creating nodes only where a branch does not already exist, and flag the final node with isEnd.',
    terms: TERMS,
    array: [],
    steps: withStepNumbers(buildTrieSteps('insert')),
  },

  'trie-search': {
    title: 'Trie — Search for a Word',
    input: `trie = [${TRIE_DEFAULTS.words.join(', ')}], queries = [${TRIE_DEFAULTS.searchQueries.join(', ')}]`,
    goal: 'Walk the query one character at a time, failing fast on a missing child, and return the isEnd flag of the final node.',
    terms: TERMS,
    array: [],
    steps: withStepNumbers(buildTrieSteps('search')),
  },

  'trie-prefix': {
    title: 'Trie — Prefix Search (Autocomplete)',
    input: `trie = [${TRIE_DEFAULTS.words.join(', ')}], prefix = "${TRIE_DEFAULTS.prefix}"`,
    goal: 'Walk to the prefix node, then collect every word in the subtree beneath it.',
    terms: TERMS,
    array: [],
    steps: withStepNumbers(buildTrieSteps('prefix')),
  },
};
