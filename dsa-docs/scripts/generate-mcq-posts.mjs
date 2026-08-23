/**
 * MCQ image-post generator — Instagram carousels from the quiz bank.
 *
 *   node scripts/generate-mcq-posts.mjs                    # everything in POSTS
 *   node scripts/generate-mcq-posts.mjs javascript         # one technology
 *   node scripts/generate-mcq-posts.mjs javascript:js-12   # one question by id
 *   node scripts/generate-mcq-posts.mjs --list             # show the queue
 *   node scripts/generate-mcq-posts.mjs --limit=3          # cap per group
 *   node scripts/generate-mcq-posts.mjs --skip-existing    # resume a big run
 *
 * Requires playwright (already a devDependency). Unlike the reel recorder this
 * needs NO dev server and NO build — the slides are a self-contained HTML string
 * rendered by page.setContent(), so it runs standalone in seconds.
 *
 * Output is grouped by technology and topic, which matters because the full bank
 * is 1,760 questions / 3,520 images:
 *
 *   mcq-posts/js/event-loop/js-42-1.png    question + options
 *   mcq-posts/js/event-loop/js-42-2.png    answer + explanation
 *   mcq-posts/js/event-loop/js-42.md       caption, ready to paste
 */

import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { POSTS, RENDER, THEME, TECH_DIR } from './mcq-posts.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'mcq-posts');
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** Files land in mcq-posts/<tech>/<topic>/ so 3,520 images stay navigable. */
const slug = (s) =>
  String(s ?? 'general')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'general';

const dirFor = (q) => path.join(OUT, TECH_DIR[q.technology] ?? q.technology, slug(q.topic));

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Inline `code` spans in explanations/questions become styled <code>. */
const inlineCode = (s) =>
  esc(s).replace(/`([^`]+)`/g, '<code class="ic">$1</code>');

async function loadQuestions(tech) {
  const mod = await import(`../src/components/mcq/questions/${tech}.js`);
  const arr = mod.default ?? mod[Object.keys(mod)[0]];
  if (!Array.isArray(arr)) throw new Error(`${tech}.js did not export an array`);
  return arr;
}

/**
 * Adaptive type scale.
 *
 * The slide is a fixed 1080x1350, so long content has to be met by smaller type
 * rather than by clipping. These thresholds were chosen against the real bank:
 * questions run 30-180 characters and options 3-140.
 */
function scale(q) {
  const qLen = (q.question || '').length;
  const optMax = Math.max(...(q.options || ['']).map((o) => String(o).length));
  const codeLines = q.codeSnippet ? q.codeSnippet.split('\n').length : 0;

  // Slide 2 now carries explanation AND keyConcept, so budget them together.
  // Measured across the bank: combined runs 160-951 characters (median 427),
  // and the slide height is fixed, so the tail has to be met by smaller type.
  const proseLen = (q.explanation || '').length + (q.keyConcept || '').length;

  return {
    q: qLen > 130 ? 40 : qLen > 90 ? 46 : qLen > 55 ? 52 : 58,
    opt: optMax > 100 ? 25 : optMax > 70 ? 28 : optMax > 45 ? 31 : 34,
    code: codeLines > 9 ? 21 : codeLines > 6 ? 24 : 27,
    why: proseLen > 800 ? 22 : proseLen > 620 ? 24 : proseLen > 450 ? 26 : proseLen > 300 ? 28 : 30,
    key: proseLen > 800 ? 21 : proseLen > 620 ? 23 : proseLen > 450 ? 25 : 27,
    // On a long slide the answer rows can shrink a little; the reveal is already
    // unmistakable, so the prose is the better use of the space.
    optShrink: proseLen > 700 ? 3 : 0,
  };
}

const shell = (q, bodyHtml, opts = {}) => {
  const z = scale(q);
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }

  body {
    width:${RENDER.width}px; height:${RENDER.height}px; overflow:hidden;
    background:${THEME.bg};
    color:${THEME.text};
    font-family:'Space Grotesk',system-ui,sans-serif;
    display:flex; flex-direction:column;
    padding:70px 64px 56px;
    position:relative;
  }

  /* Graph-paper wash. The site's visualizers use a chalkboard metaphor; faint
     ruling is honest to that, and it stops a flat fill reading as a slide
     template. Kept at 3% so it never competes with the type. */
  body::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(${THEME.accent}08 1px, transparent 1px),
      linear-gradient(90deg, ${THEME.accent}08 1px, transparent 1px);
    background-size:54px 54px;
    mask-image:radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%);
  }
  body > * { position:relative; }

  /* ── eyebrow: technology, topic, slide position ── */
  .eyebrow {
    display:flex; align-items:baseline; gap:14px;
    font-family:'JetBrains Mono',monospace; font-size:23px; letter-spacing:.14em;
    text-transform:uppercase; color:${THEME.accent};
    padding-bottom:20px; border-bottom:1px solid ${THEME.border};
    margin-bottom:40px;
  }
  .eyebrow .dot { color:${THEME.border}; }
  .eyebrow .topic { color:${THEME.textMuted}; letter-spacing:.1em; }
  .eyebrow .pos { margin-left:auto; color:${THEME.textMuted}; letter-spacing:.06em; }

  /* Difficulty as three segments — reads at a glance and comes straight from
     the question data, so it is structure rather than ornament. */
  .meter { display:flex; gap:5px; align-items:center; }
  .meter i {
    display:block; width:22px; height:6px; border-radius:1px;
    background:${THEME.border};
  }
  .meter i.on { background:${THEME.accent}; }

  /* ── question ── */
  .q {
    font-size:${z.q}px; line-height:1.2; font-weight:700; letter-spacing:-.02em;
    margin-bottom:34px; text-wrap:balance;
  }

  /* ── code: an editor block, ruled on the left rather than boxed ── */
  pre {
    font-family:'JetBrains Mono',monospace; font-size:${z.code}px; line-height:1.62;
    color:#e8e2d7; background:${THEME.code};
    border-left:4px solid ${THEME.accent};
    padding:24px 28px; margin-bottom:34px;
    white-space:pre-wrap; word-break:break-word;
  }

  /* ── options: gutter keys + hairline rows, not cards ── */
  .opts { display:flex; flex-direction:column; }
  .row {
    display:flex; align-items:flex-start; gap:18px;
    padding:19px 0; border-top:1px solid ${THEME.border};
    font-size:${(opts.tight ? z.opt - z.optShrink : z.opt)}px; line-height:1.34;
  }
  .row:last-child { border-bottom:1px solid ${THEME.border}; }
  .row .rowkey {
    flex:0 0 auto; width:34px;
    font-family:'JetBrains Mono',monospace; font-weight:700;
    font-size:${Math.round((opts.tight ? z.opt - z.optShrink : z.opt) * 0.86)}px;
    color:${THEME.textMuted}; padding-top:2px;
  }
  .row .val { flex:1 1 auto; }

  /* Checkbox affordance. The point is that the slide looks answerable — an
     empty box invites a choice in a way a bare letter does not. Rendered in the
     mono face so it belongs to the gutter rather than looking like a UI widget
     borrowed from elsewhere. */
  .row .box {
    flex:0 0 auto; font-family:'JetBrains Mono',monospace; font-weight:500;
    font-size:${(opts.tight ? z.opt - z.optShrink : z.opt)}px;
    color:${THEME.border}; letter-spacing:-.06em; padding-top:1px;
  }
  .row.hit .box { color:${THEME.correct}; font-weight:700; }
  .row.miss .box { opacity:.3; }

  /* THE SIGNATURE MOVE — the reveal is a diff-added line.
     It bleeds 64px left past the gutter to the page edge, so the answer reads
     as marked rather than merely coloured. Nothing else on either slide is
     allowed this treatment. */
  .row.hit {
    margin-left:-64px; padding-left:64px;
    margin-right:-64px; padding-right:64px;
    background:linear-gradient(90deg, ${THEME.correct}26, ${THEME.correct}0a 70%, transparent);
    border-top-color:${THEME.correct}55;
    box-shadow:inset 5px 0 0 ${THEME.correct};
  }
  .row.hit .rowkey { color:${THEME.correct}; }
  .row.hit .val { color:#e9fbf3; font-weight:600; }
  .row.hit .mark {
    margin-left:auto; padding-left:22px; color:${THEME.correct};
    font-family:'JetBrains Mono',monospace; font-weight:700;
    font-size:${Math.round(z.opt * 0.8)}px; letter-spacing:.06em;
  }
  .row.miss .rowkey, .row.miss .val { opacity:.42; }

  /* ── ask: an underline, not a boxed banner ── */
  .ask {
    margin-top:36px; display:flex; align-items:baseline; gap:18px;
    font-size:33px; font-weight:700;
  }
  .ask .lead { color:${THEME.accent}; border-bottom:3px solid ${THEME.accent}; padding-bottom:5px; }
  .ask .hint {
    margin-left:auto; font-family:'JetBrains Mono',monospace;
    font-size:24px; font-weight:400; color:${THEME.textMuted}; letter-spacing:.08em;
  }

  /* ── why: an annotation beside the diff ──
     Ruled on the left in the muted border tone, not amber — it should read as a
     margin note on the reveal above, never compete with it. */
  .why {
    margin-top:32px; padding:22px 0 0 26px;
    border-left:3px solid ${THEME.border};
  }
  /* Label with a hairline running to the edge: an editor section divider. */
  .whyhead {
    display:flex; align-items:center; gap:16px; margin-bottom:16px;
  }
  .whyhead .lbl {
    font-family:'JetBrains Mono',monospace; font-size:22px; letter-spacing:.2em;
    text-transform:uppercase; color:${THEME.accent}; white-space:nowrap;
  }
  .whyhead .rule { flex:1 1 auto; height:1px; background:${THEME.border}; }
  .why p.body { font-size:${z.why}px; line-height:1.46; color:#DBD5CB; }

  /* Takeaway tier. Brighter and heavier than the reasoning, behind a single
     amber marker — the one line worth remembering after the scroll. */
  .key {
    display:flex; gap:14px; margin-top:20px; padding-top:18px;
    border-top:1px dashed ${THEME.border};
  }
  .key .arrow {
    flex:0 0 auto; font-family:'JetBrains Mono',monospace; font-weight:700;
    font-size:${z.key}px; color:${THEME.accent}; line-height:1.4;
  }
  .key .txt {
    font-size:${z.key}px; line-height:1.4; font-weight:600;
    color:${THEME.text}; letter-spacing:-.005em;
  }

  .push { flex:1 1 auto; min-height:14px; }

  /* ── footer ── */
  .foot {
    display:flex; align-items:center; gap:16px; margin-top:26px;
    padding-top:22px; border-top:1px solid ${THEME.border};
    font-family:'JetBrains Mono',monospace; font-size:25px; letter-spacing:.04em;
  }
  .foot .site { color:${THEME.text}; font-weight:700; }
  .foot .tail { margin-left:auto; color:${THEME.textMuted}; }

  code.ic {
    font-family:'JetBrains Mono',monospace; font-size:.9em;
    color:${THEME.accent}; background:${THEME.accent}14;
    padding:1px 8px; border-radius:4px;
  }
</style></head><body>${bodyHtml}</body></html>`;
};

const DIFF_LEVEL = { easy: 1, medium: 2, hard: 3 };

const eyebrow = (q, n) => {
  const lit = DIFF_LEVEL[q.difficulty] ?? 2;
  const meter = [1, 2, 3].map((i) => `<i class="${i <= lit ? 'on' : ''}"></i>`).join('');
  return `
  <div class="eyebrow">
    <span>${esc(q.technology)}</span>
    <span class="dot">/</span>
    <span class="topic">${esc(q.topic || '')}</span>
    <span class="meter" title="${esc(q.difficulty || '')}">${meter}</span>
    <span class="pos">${n} of 2</span>
  </div>`;
};

const foot = (tail) => `
  <div class="foot">
    <span class="site">${THEME.brand}</span>
    <span class="tail">${tail}</span>
  </div>`;

export function slideQuestion(q) {
  const code = q.codeSnippet ? `<pre>${esc(q.codeSnippet)}</pre>` : '';
  const rows = q.options.map((o, i) => `
    <div class="row">
      <span class="box">[&nbsp;]</span>
      <span class="rowkey">${LETTERS[i]}</span>
      <span class="val">${inlineCode(o)}</span>
    </div>`).join('');

  return shell(q, `
    ${eyebrow(q, 1)}
    <div class="q">${inlineCode(q.question)}</div>
    ${code}
    <div class="opts">${rows}</div>
    <div class="ask">
      <span class="lead">Comment your answer</span>
      <span class="hint">swipe to check &rarr;</span>
    </div>
    <div class="push"></div>
    ${foot('1,800+ free MCQs')}`);
}

export function slideAnswer(q) {
  const right = new Set(q.correctAnswer || []);
  const rows = q.options.map((o, i) => `
    <div class="row ${right.has(i) ? 'hit' : 'miss'}">
      <span class="box">${right.has(i) ? '[x]' : '[&nbsp;]'}</span>
      <span class="rowkey">${LETTERS[i]}</span>
      <span class="val">${inlineCode(o)}</span>
      ${right.has(i) ? '<span class="mark">CORRECT</span>' : ''}
    </div>`).join('');

  const takeaway = q.keyConcept
    ? `<div class="key"><span class="arrow">&rarr;</span><span class="txt">${inlineCode(q.keyConcept)}</span></div>`
    : '';

  const why = (q.explanation || q.keyConcept)
    ? `<div class="why">
         <div class="whyhead"><span class="lbl">Why</span><span class="rule"></span></div>
         ${q.explanation ? `<p class="body">${inlineCode(q.explanation)}</p>` : ''}
         ${takeaway}
       </div>`
    : '';

  const proseLen = (q.explanation || '').length + (q.keyConcept || '').length;

  return shell(q, `
    ${eyebrow(q, 2)}
    <div class="opts">${rows}</div>
    ${why}
    <div class="push"></div>
    ${foot('interviewpreprationbuddy.in/mcq')}`, { tight: proseLen > 700 });
}

export function caption(q) {
  const right = (q.correctAnswer || []).map((i) => LETTERS[i]).join(', ');
  const tags = [
    `#${String(q.technology || '').replace(/[^a-z0-9]/gi, '')}`,
    '#mcq', '#quiz', '#codinginterview', '#dsa', '#programming',
    '#developer', '#softwareengineer', '#interviewprep', '#coding',
  ].filter((t) => t.length > 1).join(' ');

  return `# ${q.technology} · ${q.topic || ''} · ${q.id}

Slides: \`${q.id}-1.png\` (question) + \`${q.id}-2.png\` (answer)

---

## Instagram

\`\`\`
${THEME.site}

${q.question.replace(/`/g, '')}

Comment your answer below — A, B, C or D ✨
Then swipe to slide 2 to check it.

${q.explanation ? q.explanation.replace(/`/g, '') : ''}

${q.keyConcept ? `Key idea: ${q.keyConcept.replace(/`/g, '')}\n` : ''}
▶ 1,700+ more MCQs, free and no sign-up:
${THEME.site}mcq

${tags}
\`\`\`
`;
}

async function main() {
  const args = process.argv.slice(2);
  const listOnly = args.includes('--list');
  const skipExisting = args.includes('--skip-existing');
  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? Number(limitArg.split('=')[1]) : null;
  const filters = args.filter((a) => !a.startsWith('--'));

  // Resolve the queue
  const queue = [];
  for (const group of POSTS) {
    const all = await loadQuestions(group.technology);
    let pool = all;
    if (group.difficulty) pool = pool.filter((q) => q.difficulty === group.difficulty);
    if (group.ids) pool = all.filter((q) => group.ids.includes(q.id));
    const take = limit ?? group.count ?? pool.length;
    for (const q of pool.slice(0, take)) queue.push(q);
  }

  const selected = filters.length
    ? queue.filter((q) => filters.some((f) => {
        const [tech, id] = f.split(':');
        return q.technology === tech && (!id || q.id === id);
      }))
    : queue;

  if (!selected.length) {
    console.error(`No questions matched: ${filters.join(', ')}`);
    console.error(`Technologies in POSTS: ${[...new Set(POSTS.map((p) => p.technology))].join(', ')}`);
    process.exit(1);
  }

  if (listOnly) {
    console.log(`${selected.length} posts queued (2 slides each):`);
    for (const q of selected) {
      const dir = dirFor(q);
      const done = existsSync(path.join(dir, `${q.id}-2.png`));
      const rel = path.relative(OUT, dir).replace(/\\/g, '/');
      console.log(`  ${done ? '[done]' : '[    ]'} ${rel}/${q.id}`);
    }
    return;
  }

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.error('playwright missing — run: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: RENDER.width, height: RENDER.height },
    deviceScaleFactor: RENDER.deviceScaleFactor,
  });

  let done = 0, skipped = 0;
  const failed = [];
  const t0 = Date.now();

  for (const [i, q] of selected.entries()) {
    const dir = dirFor(q);
    const rel = path.relative(OUT, dir).replace(/\\/g, '/');
    const label = `${rel}/${q.id}`;

    if (skipExisting && existsSync(path.join(dir, `${q.id}-2.png`))) {
      skipped++;
      continue;
    }

    process.stdout.write(`[${String(i + 1).padStart(4)}/${selected.length}] ${label.padEnd(46)} `);
    try {
      await mkdir(dir, { recursive: true });
      for (const [n, html] of [[1, slideQuestion(q)], [2, slideAnswer(q)]]) {
        await page.setContent(html, { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: path.join(dir, `${q.id}-${n}.png`) });
      }
      await writeFile(path.join(dir, `${q.id}.md`), caption(q), 'utf8');
      done++;
      const rate = (Date.now() - t0) / done / 1000;
      const left = Math.round((selected.length - i - 1) * rate / 60);
      console.log(`ok  ${rate.toFixed(1)}s/post  ~${left}m left`);
    } catch (e) {
      console.log('FAILED — ' + e.message.split('\n')[0]);
      failed.push(label);
    }
  }
  if (skipped) console.log(`skipped ${skipped} already rendered (--skip-existing)`);

  await browser.close();

  const count = async (dir) => {
    let n = 0;
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) n += await count(path.join(dir, e.name));
      else if (e.name.endsWith('.png')) n += 1;
    }
    return n;
  };
  const files = existsSync(OUT) ? await count(OUT) : 0;
  console.log(`\n${done} rendered, ${skipped} skipped -> ${path.relative(ROOT, OUT)}/  (${files} images total)`);
  if (failed.length) {
    console.log(`failed: ${failed.join(', ')}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
