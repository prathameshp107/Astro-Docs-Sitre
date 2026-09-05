/**
 * Caption generator — writes ready-to-paste post copy for every reel.
 *
 *   node scripts/reel-captions.mjs                 # all reels
 *   node scripts/reel-captions.mjs sorting         # one topic
 *   node scripts/reel-captions.mjs trie:insert     # one reel
 *   node scripts/reel-captions.mjs --stdout        # print instead of writing
 *
 * Output: reels-out/captions/<topic>-<track>.md  plus a combined ALL-CAPTIONS.md
 *
 * Copy is derived from the same sources the site renders — VISUALIZER_CONTENT
 * (intro, FAQs, complexity table), DSA_TOPICS (why it matters, interview
 * questions) and reels.config — so a caption states the real complexity of the
 * real algorithm rather than generic filler, and it stays true if that content
 * is edited later. Nothing here is invented.
 *
 * Run it standalone (no browser, no ffmpeg, instant) or let record-reel.mjs
 * emit captions automatically alongside each MP4.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { REELS } from './reels.config.mjs';
import { VISUALIZER_CONTENT } from '../src/data/visualizers/visualizerContent.js';
import { DSA_TOPICS } from '../src/data/visualizers/dsaTopics.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'reels-out', 'captions');
const SITE = 'https://interviewpreprationbuddy.in';

/** Hashtags: a stable core plus topic-specific ones. Instagram favours ~8-15. */
const CORE_TAGS = ['#dsa', '#coding', '#programming', '#codinginterview', '#leetcode', '#softwareengineer'];
const TOPIC_TAGS = {
  sorting: ['#sorting', '#algorithms', '#bigo'],
  searching: ['#binarysearch', '#algorithms', '#bigo'],
  trees: ['#binarytree', '#datastructures', '#bst'],
  graphs: ['#graphs', '#bfs', '#dfs', '#algorithms'],
  'two-pointers': ['#twopointers', '#arrays', '#optimization'],
  'sliding-window': ['#slidingwindow', '#arrays', '#optimization'],
  stack: ['#stack', '#datastructures'],
  queue: ['#queue', '#datastructures'],
  'linked-list': ['#linkedlist', '#datastructures', '#pointers'],
  'hash-table': ['#hashmap', '#hashtable', '#datastructures'],
  heaps: ['#heap', '#priorityqueue', '#datastructures'],
  recursion: ['#recursion', '#callstack'],
  dp: ['#dynamicprogramming', '#dp', '#memoization'],
  backtracking: ['#backtracking', '#recursion'],
  arrays: ['#arrays', '#datastructures'],
  trie: ['#trie', '#prefixtree', '#autocomplete', '#datastructures'],
};

/**
 * The complexity row for this specific algorithm.
 *
 * Matching is deliberately strict. A naive "any token longer than 3 chars"
 * match made "Merge Sort" hit the *Bubble Sort* row, because both labels
 * contain "sort" and Bubble comes first — publishing O(n²) for merge sort.
 * So: exact match, then prefix, then a distinctive token with the shared
 * category words removed. No fuzzy fallback — a wrong complexity in a caption
 * is worse than none.
 */
const GENERIC_TOKENS = new Set([
  'sort', 'search', 'word', 'insert', 'delete', 'the', 'and', 'with',
  'visualizer', 'algorithm', 'tree', 'prefix', 'call', 'stack', 'heap',
]);

function complexityFor(topic, title) {
  const c = VISUALIZER_CONTENT[topic];
  if (!c) return null;
  const want = title.toLowerCase().trim();
  const rows = c.complexity;

  let row = rows.find((r) => String(r[0]).toLowerCase() === want);
  if (!row) row = rows.find((r) => String(r[0]).toLowerCase().startsWith(want));
  if (!row) row = rows.find((r) => want.startsWith(String(r[0]).toLowerCase()));

  if (!row) {
    const distinctive = want
      .split(/\s+/)
      .filter((w) => w.length > 3 && !GENERIC_TOKENS.has(w));
    if (distinctive.length) {
      // Score by how many distinctive tokens each row matches, then require a
      // clear winner. Plain "any token matches" was too loose — "BST In-Order
      // Traversal" hit both the in-order and level-order rows on "traversal"
      // and got discarded as ambiguous. Ranking picks in-order (2 tokens) over
      // level-order (1), while a genuine tie still declines.
      const scored = rows
        .map((r) => {
          const label = String(r[0]).toLowerCase();
          return { r, score: distinctive.filter((w) => label.includes(w)).length };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score);

      if (scored.length === 1 || (scored.length > 1 && scored[0].score > scored[1].score)) {
        row = scored[0].r;
      }
    }
  }

  if (!row) return null;
  return { head: c.complexityHead, row };
}

function complexityLine(topic, title) {
  const hit = complexityFor(topic, title);
  if (!hit) return null;
  // Pair each header with its cell, skipping the name column.
  return hit.head
    .slice(1)
    .map((h, i) => `${h}: ${hit.row[i + 1]}`)
    .filter((s) => !/undefined/.test(s))
    .join(' · ');
}

function build(reel) {
  const { topic, track, title, subtitle } = reel;
  const content = VISUALIZER_CONTENT[topic];
  const meta = DSA_TOPICS[topic] ?? DSA_TOPICS[topic === 'heaps' ? 'heap' : topic];
  const url = `${SITE}/visualizer/${topic}/?track=${track}`;

  // An explicit `cx` on the reel wins. Reel titles are written for humans
  // ("Breadth-First Search") while complexity tables use the short form
  // ("BFS"), so lexical matching cannot bridge every case — and guessing a
  // complexity is worse than stating none.
  const cx = reel.cx ?? complexityLine(topic, title);
  const faq = content?.faqs?.[0];
  const why = meta?.overview?.why ?? '';
  const firstQ = meta?.interviewQuestions?.[0]?.question;

  // Hook: the subtitle already reads as one, and it is written per reel.
  const hook = `${title} — ${subtitle}`;

  // Body: real sentences, but page-relative phrasing has to go — the site copy
  // says things like "the visualizer above", which is meaningless in a caption.
  // DSA_TOPICS.overview is written page-agnostically, so prefer it and fall back
  // to the article intro with deictic sentences dropped.
  const deictic = /\b(above|below|this page|on this page|the visualizer above)\b/i;
  const sentences = (str) => String(str || '').split(/(?<=\.)\s+/).filter(Boolean);

  const pool = [
    ...sentences(meta?.overview?.what),
    ...sentences(why),
    ...sentences(content?.intro?.[0]),
  ].filter((sent) => sent && !deictic.test(sent));

  const explain = pool.slice(0, 2).join(' ').trim();

  const tags = [...(TOPIC_TAGS[topic] ?? []), ...CORE_TAGS].slice(0, 14).join(' ');

  // ── Instagram / TikTok: hook, payoff, CTA, tags ────────────────────────
  // The site URL leads every caption: Instagram does not linkify caption text,
  // so putting it first maximises the chance it is read and remembered rather
  // than buried under a "more" fold.
  const igLines = [
    SITE + '/',
    '',
    hook,
    '',
    explain,
    '',
    cx ? `⏱ ${cx}` : null,
    firstQ ? `💬 Gets asked as: "${firstQ}"` : null,
    '',
    `▶ Step through it yourself (free, no sign-up):`,
    url,
    '',
    tags,
  ].filter((l) => l !== null);
  const instagram = igLines.join('\n');

  // ── YouTube Shorts: title under 100 chars, description carries the links ──
  const ytTitle = `${title} Visualized Step by Step${cx && cx.length < 30 ? ` (${cx.split(' · ')[0]})` : ''}`;
  const youtube = [
    `TITLE (${ytTitle.length}/100 chars):`,
    ytTitle,
    '',
    'DESCRIPTION:',
    SITE + '/',
    '',
    explain,
    '',
    cx ? `Complexity — ${cx}` : null,
    '',
    faq ? `${faq.q}\n${faq.a}` : null,
    '',
    `Interactive version (free): ${url}`,
    `All visualizers: ${SITE}/visualizer/`,
    '',
    tags.replace(/#/g, '#'),
  ].filter((l) => l !== null).join('\n');

  // ── LinkedIn: no hashtag spam, lead with the insight ──────────────────
  const linkedin = [
    SITE + '/',
    '',
    `${title}: ${subtitle}`,
    '',
    explain,
    '',
    cx ? `Complexity: ${cx}` : null,
    firstQ ? `\nCommonly asked as: "${firstQ}"` : null,
    '',
    `I built an interactive version — step through it one operation at a time, free and without a sign-up: ${url}`,
    '',
    (TOPIC_TAGS[topic] ?? []).slice(0, 3).join(' ') + ' #softwareengineering',
  ].filter((l) => l !== null).join('\n');

  return { id: `${topic}-${track}`, title, url, instagram, youtube, linkedin };
}

function toMarkdown(c) {
  return `# ${c.title}

Reel: \`${c.id}.mp4\` · Page: ${c.url}

---

## Instagram / TikTok

\`\`\`
${c.instagram}
\`\`\`

## YouTube Shorts

\`\`\`
${c.youtube}
\`\`\`

## LinkedIn

\`\`\`
${c.linkedin}
\`\`\`
`;
}

/** Exported so record-reel.mjs can emit a caption next to each MP4. */
export function captionFor(reel) {
  return build(reel);
}

export function captionMarkdown(reel) {
  return toMarkdown(build(reel));
}

async function main() {
  const args = process.argv.slice(2);
  const stdout = args.includes('--stdout');
  const filters = args.filter((a) => !a.startsWith('--'));

  const selected = filters.length
    ? REELS.filter((r) => filters.some((f) => {
        const [t, tr] = f.split(':');
        return r.topic === t && (!tr || r.track === tr);
      }))
    : REELS;

  if (!selected.length) {
    console.error(`No reels matched: ${filters.join(', ')}`);
    process.exit(1);
  }

  const built = selected.map(build);

  if (stdout) {
    for (const c of built) console.log(toMarkdown(c) + '\n');
    return;
  }

  await mkdir(OUT, { recursive: true });
  for (const c of built) {
    await writeFile(path.join(OUT, `${c.id}.md`), toMarkdown(c), 'utf8');
  }

  const combined = [
    '# Reel captions',
    '',
    `${built.length} reels. Copy the block for the platform you are posting to.`,
    'Regenerate with `npm run reels:captions` after editing visualizerContent.js.',
    '',
    ...built.map((c) => toMarkdown(c)),
  ].join('\n');
  await writeFile(path.join(OUT, 'ALL-CAPTIONS.md'), combined, 'utf8');

  console.log(`${built.length} captions -> ${path.relative(ROOT, OUT)}/`);
  for (const c of built) {
    const igLen = c.instagram.length;
    const warn = igLen > 2200 ? '  ** over IG 2200 limit **' : '';
    console.log(`  ${c.id.padEnd(30)} ${String(igLen).padStart(4)} chars${warn}`);
  }
  console.log(`\ncombined: ${path.relative(ROOT, path.join(OUT, 'ALL-CAPTIONS.md'))}`);
}

// Only run as a CLI; importing it (from record-reel.mjs) must not write files.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
