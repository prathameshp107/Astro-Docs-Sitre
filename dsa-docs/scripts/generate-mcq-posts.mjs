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

const shell = (bodyHtml) => `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:${RENDER.width}px; height:${RENDER.height}px; overflow:hidden;
    background:${THEME.bg}; color:${THEME.text};
    font-family:Inter,system-ui,sans-serif;
    display:flex; flex-direction:column;
    /* Instagram overlays nothing on feed posts, so padding is purely visual. */
    padding:64px 60px 52px;
  }
  .top { display:flex; align-items:center; justify-content:space-between; margin-bottom:38px; }
  .badges { display:flex; gap:12px; align-items:center; }
  .badge {
    font-size:24px; font-weight:700; letter-spacing:.02em;
    padding:9px 20px; border-radius:999px;
    border:2px solid ${THEME.accent}; color:${THEME.accent};
  }
  .badge.diff { border-color:${THEME.border}; color:${THEME.textMuted}; text-transform:capitalize; }
  .slideno { font-size:24px; font-weight:700; color:${THEME.textMuted}; font-family:'JetBrains Mono',monospace; }
  .q { font-size:46px; line-height:1.28; font-weight:700; margin-bottom:30px; }
  pre {
    background:${THEME.code}; border:2px solid ${THEME.border}; border-radius:20px;
    padding:26px 30px; margin-bottom:30px; overflow:hidden;
    font-family:'JetBrains Mono',monospace; font-size:29px; line-height:1.5;
    color:#e7e2d9; white-space:pre-wrap; word-break:break-word;
  }
  .opts { display:flex; flex-direction:column; gap:16px; }
  .opt {
    display:flex; gap:20px; align-items:flex-start;
    border:2px solid ${THEME.border}; border-radius:18px;
    padding:22px 26px; background:${THEME.bgPanel};
    font-size:33px; line-height:1.35;
  }
  .opt .k {
    flex:0 0 auto; width:48px; height:48px; border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    font-weight:800; font-size:28px;
    border:2px solid ${THEME.border}; color:${THEME.textMuted};
  }
  .opt.right { border-color:${THEME.correct}; background:rgba(16,185,129,.12); }
  .opt.right .k { border-color:${THEME.correct}; color:${THEME.correct}; background:rgba(16,185,129,.18); }
  .opt.right .t { color:#d1fae5; font-weight:600; }
  .tick { margin-left:auto; color:${THEME.correct}; font-size:34px; font-weight:800; }
  .why { margin-top:6px; }
  .why h3 {
    font-size:26px; letter-spacing:.08em; text-transform:uppercase;
    color:${THEME.accent}; margin-bottom:14px; font-weight:800;
  }
  .why p { font-size:31px; line-height:1.45; color:#ded8cf; }
  .spacer { flex:1 1 auto; min-height:16px; }
  .foot { display:flex; align-items:center; justify-content:space-between; margin-top:26px; }
  .brand { font-size:27px; font-weight:800; color:${THEME.accent}; }
  .cta { font-size:26px; font-weight:600; color:${THEME.textMuted}; }
  .ask {
    margin-top:22px; border:3px solid ${THEME.accent}; border-radius:20px;
    background:rgba(245,158,11,.12); padding:22px 26px;
    display:flex; align-items:center; gap:16px;
  }
  .ask .big { font-size:36px; font-weight:900; color:${THEME.accent}; letter-spacing:.01em; }
  .ask .sub { font-size:26px; color:${THEME.textMuted}; font-weight:600; margin-left:auto; }
  code.ic {
    font-family:'JetBrains Mono',monospace; font-size:.92em;
    background:rgba(255,255,255,.07); border:1px solid ${THEME.border};
    border-radius:8px; padding:2px 9px;
  }
</style></head><body>${bodyHtml}</body></html>`;

const head = (q, n) => `
  <div class="top">
    <div class="badges">
      <span class="badge">${esc(q.topic || q.technology)}</span>
      <span class="badge diff">${esc(q.difficulty || '')}</span>
    </div>
    <span class="slideno">${n}/2</span>
  </div>`;

const foot = (cta) => `
  <div class="foot">
    <span class="brand">${THEME.brand}</span>
    <span class="cta">${cta}</span>
  </div>`;

export function slideQuestion(q) {
  const code = q.codeSnippet ? `<pre>${esc(q.codeSnippet)}</pre>` : '';
  const opts = q.options.map((o, i) => `
    <div class="opt">
      <span class="k">${LETTERS[i]}</span>
      <span class="t">${inlineCode(o)}</span>
    </div>`).join('');
  return shell(`
    ${head(q, 1)}
    <div class="q">${inlineCode(q.question)}</div>
    ${code}
    <div class="opts">${opts}</div>
    <div class="ask">
      <span class="big">Comment your answer &#128071;</span>
      <span class="sub">swipe for the answer</span>
    </div>
    <div class="spacer"></div>
    ${foot('A / B / C / D')}`);
}

export function slideAnswer(q) {
  const right = new Set(q.correctAnswer || []);
  const opts = q.options.map((o, i) => `
    <div class="opt${right.has(i) ? ' right' : ''}">
      <span class="k">${LETTERS[i]}</span>
      <span class="t">${inlineCode(o)}</span>
      ${right.has(i) ? '<span class="tick">&#10003;</span>' : ''}
    </div>`).join('');
  const why = q.explanation
    ? `<div class="why"><h3>Why</h3><p>${inlineCode(q.explanation)}</p></div>`
    : '';
  return shell(`
    ${head(q, 2)}
    <div class="opts">${opts}</div>
    <div class="spacer"></div>
    ${why}
    <div class="spacer"></div>
    ${foot('More at the link')}`);
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
