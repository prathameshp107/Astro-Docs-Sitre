/**
 * Reel generator — turns the live algorithm visualizers into vertical MP4s.
 *
 *   node scripts/record-reel.mjs                  # every reel in reels.config
 *   node scripts/record-reel.mjs sorting          # only sorting reels
 *   node scripts/record-reel.mjs sorting:merge-sort
 *   node scripts/record-reel.mjs --keep-frames    # leave PNGs for inspection
 *   node scripts/record-reel.mjs --dev            # record from `npm run dev`
 *   node scripts/record-reel.mjs --skip-existing  # resume a part-done batch
 *   node scripts/record-reel.mjs --list           # show the queue, record nothing
 *
 * --dev records against the running dev server (localhost:4321) instead of
 * dist/. Use it while tuning framing: a full build takes ~40 minutes, and a
 * stale dist/ silently records the previous version of the page.
 *
 * Requires: `npm i -D playwright ffmpeg-static && npx playwright install chromium`
 * and a production build in dist/ (the script serves it itself). ffmpeg is taken
 * from PATH when present, otherwise from the ffmpeg-static package.
 *
 * How it works: opens each visualizer with ?record=1, which mounts
 * RecorderBridge and exposes window.__viz. The driver then sets one step at a
 * time and screenshots — no reliance on the in-page autoplay timer, so frames
 * are deterministic and every step lands exactly once regardless of machine
 * speed. Frames are stitched by ffmpeg's concat demuxer with per-frame
 * durations, which is what lets the first and last frames hold longer.
 */

import { createServer } from 'node:http';
import { readFile, mkdir, rm, writeFile, readdir, stat } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { REELS, RENDER } from './reels.config.mjs';
import { captionMarkdown, writeSectionCaptions } from './reel-captions.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(ROOT, 'reels-out');
const AUDIO_DIR = path.join(ROOT, 'scripts', 'audio');
const PORT = 4399;

async function getAvailableAudioTracks() {
  try {
    if (!existsSync(AUDIO_DIR)) return [];
    const files = await readdir(AUDIO_DIR);
    return files
      .filter((f) => /\.(mp3|wav|ogg|m4a|aac)$/i.test(f))
      .map((f) => path.join(AUDIO_DIR, f));
  } catch {
    return [];
  }
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.wasm': 'application/wasm', '.pdf': 'application/pdf',
};

function serveDist() {
  const server = createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      let file = path.join(DIST, p);
      if (!existsSync(file)) file = path.join(DIST, p, 'index.html');
      if (!existsSync(file)) { res.writeHead(404); return res.end('not found'); }
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(500); res.end('error');
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

/** Restructure the desktop visualizer into a 9:16 reel frame. */
const REEL_CSS = `
  /* Strip everything that isn't the animation. */
  nav, header, .starlight-header, [class*="AppNav"],
  aside, .visualizer-sidebar, [class*="VisualizerSidebar"] { display: none !important; }
  body { overflow: hidden !important; background: var(--sketch-bg) !important; }
  body > div, #root > div { height: auto !important; overflow: visible !important; }
  .flex.h-screen { height: auto !important; display: block !important; overflow: visible !important; }
  .flex-1.h-full { height: auto !important; overflow: visible !important; padding: 0 !important; }

  /* Hide the tab bar, the reference article, and any section that isn't the canvas. */
  #reel-hide-tabs, .sketch-no-scrollbar { display: none !important; }
  article { display: none !important; }

  /* The source page keeps this panel tall and padded for the desktop layout.
     In a 9:16 frame that reads as a big empty box, so collapse it to hug the
     drawing before the scale factor is measured. */
  #reel-body .sketch-canvas-box {
    min-height: 0 !important;
    padding: 26px 34px !important;
    /* fit-content, NOT auto: this is a block element, so width:auto means
       "fill the parent" — the panel stayed 1032px wide, the measured width
       matched the frame, and the scale factor collapsed to ~1.0 while the
       cards stayed tiny inside an edge-to-edge box. */
    width: fit-content !important;
    max-width: none !important;
    margin: 0 auto !important;
  }
  /* Anything left over from the desktop chrome that slipped into the stage. */
  #reel-stage .sketch-milestone-dot,
  #reel-stage input[type="range"],
  #reel-stage button { display: none !important; }

  #reel-stage {
    position: fixed; inset: 0; z-index: 999999;
    display: flex; flex-direction: column; align-items: center;
    /* Centred, not top-aligned: once #reel-body is pinned to its scaled height
       the whole group is shorter than the frame, and centring keeps it off the
       Instagram chrome at both ends. */
    justify-content: center;
    background: var(--sketch-bg);
    /* Safe area. Instagram overlays the username, caption and audio strip over
       roughly the bottom 250px of a 1920-tall reel, and the like/comment/share
       column over the right edge, so keep content clear of both. */
    /* Side padding kept tight: the animation is width-bound (a row of cards is
       wide and short), so every pixel of horizontal room raises the scale. The
       right-hand action-button column only overlaps the lower half, which the
       bottom padding already clears. */
    padding: 100px 24px 260px;
    box-sizing: border-box;
  }
  #reel-title { font-size: 58px; line-height: 1.1; font-weight: 800; text-align: center;
    color: var(--sketch-text); margin: 0 0 10px; }
  #reel-sub { font-size: 30px; text-align: center; color: var(--sketch-accent-orange);
    margin: 0 0 26px; font-weight: 600; }
  #reel-body { width: 100%; flex: 1; display: flex; align-items: center; justify-content: center; }
  #reel-body > * { transform-origin: center center; }
  /* The explanation is the point of the reel — it gets weight, contrast and a
     panel of its own rather than sitting as small grey text under the canvas.
     Fixed min-height keeps the canvas from jumping as caption length varies. */
  #reel-caption {
    min-height: 190px; width: 100%; box-sizing: border-box;
    display: flex; align-items: center; justify-content: center;
    font-size: 36px; line-height: 1.35; font-weight: 600; text-align: center;
    color: #fff;
    background: rgba(255,255,255,.05);
    border: 2px solid var(--sketch-border);
    border-radius: 24px;
    padding: 22px 28px; margin-top: 26px;
    text-wrap: balance;
  }
  /* Brand is the whole point of posting — sized to stay legible after
     Instagram's compression and when the reel is viewed on a small phone. */
  #reel-brand {
    font-size: 38px; font-weight: 700; letter-spacing: .01em;
    color: var(--sketch-text); opacity: .75;
    margin-top: 24px; text-align: center;
  }
  #reel-progress { height: 6px; width: 60%; background: rgba(255,255,255,.12); border-radius: 99px;
    overflow: hidden; margin-top: 26px; }
  #reel-progress > i { display: block; height: 100%; background: var(--sketch-accent-orange); }
`;

async function buildStage(page, reel) {
  await page.evaluate(({ title, subtitle }) => {
    // Move the canvas itself — not .closest('div'), which drags the playback
    // controls and milestone strip along and leaves them bleeding into frame.
    const canvas = document.querySelector('.sketch-canvas-box');
    const stage = document.createElement('div');
    stage.id = 'reel-stage';
    stage.innerHTML =
      `<h1 id="reel-title"></h1><p id="reel-sub"></p>` +
      `<div id="reel-body"></div>` +
      `<div id="reel-caption"></div>` +
      `<div id="reel-progress"><i style="width:0%"></i></div>` +
      `<div id="reel-brand">interviewpreprationbuddy.in</div>`;
    document.body.appendChild(stage);
    stage.querySelector('#reel-title').textContent = title;
    stage.querySelector('#reel-sub').textContent = subtitle;
    if (canvas) stage.querySelector('#reel-body').appendChild(canvas);
  }, reel);

  // Scale so the *content* fills the frame.
  //
  // Measuring the panel itself gave scale ~1.0: .sketch-canvas-box is a wide,
  // mostly-empty box, so avail.width / panel.width is already ~1 and the array
  // stayed a small cluster in a tall empty frame. Measure the union of the
  // panel's children instead — that is the actual drawing — and scale on that.
  await page.evaluate(() => {
    const body = document.querySelector('#reel-body');
    const el = body?.firstElementChild;
    if (!el) return;

    const avail = body.getBoundingClientRect();

    // Measure the element that receives the transform. width:fit-content above
    // makes the panel hug its drawing, so its own box is the right thing to
    // scale — border and padding included, which keeps it inside the frame.
    const r = el.getBoundingClientRect();
    const cw = r.width;
    const ch = r.height;
    if (cw <= 0 || ch <= 0) return;
    // Fill the column almost completely — these drawings are the subject of the
    // reel, and at 1080 wide an under-scaled row of cards is unreadable on a
    // phone. Cap 6 only guards against a 2-node diagram being blown up so far
    // it turns soft.
    const scale = Math.max(Math.min((avail.width * 0.99) / cw, (avail.height * 0.99) / ch, 6), 1);
    el.style.transform = `scale(${scale.toFixed(3)})`;

    // transform doesn't affect layout, so #reel-body kept reserving its full
    // flex height — leaving the drawing floating in a tall empty band that made
    // it read as small next to the caption. Pin the row to the scaled height so
    // the visual and its explanation sit together as one block.
    body.style.flex = '0 0 auto';
    body.style.height = `${Math.ceil(ch * scale)}px`;
  });
}

/**
 * Locate ffmpeg: PATH first, then the `ffmpeg-static` package.
 *
 * ffmpeg-static ships a platform binary as a normal devDependency, so the reel
 * pipeline needs no system-wide install and no admin rights on Windows.
 */
let FFMPEG = 'ffmpeg';

async function resolveFfmpeg() {
  try {
    await run('ffmpeg', ['-version']);
    return 'ffmpeg (PATH)';
  } catch { /* fall through to the bundled binary */ }

  try {
    const mod = await import('ffmpeg-static');
    const bin = mod.default ?? mod;
    if (bin && existsSync(bin)) {
      FFMPEG = bin;
      await run(FFMPEG, ['-version']);
      return 'ffmpeg-static';
    }
  } catch { /* not installed */ }

  return null;
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => { err += d.toString(); });
    p.on('error', reject);
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err.trim().split('\n').slice(-4).join('\n')))));
  });
}

async function recordOne(browser, reel, keepFrames, origin, preset = 'veryfast', audioTracks = []) {
  const id = `${reel.topic}-${reel.track}`;
  const frameDir = path.join(OUT, '.frames', id);
  await rm(frameDir, { recursive: true, force: true });
  await mkdir(frameDir, { recursive: true });

  const page = await browser.newPage({
    viewport: { width: RENDER.width, height: RENDER.height },
    deviceScaleFactor: 1,
  });

  const url = `${origin}/visualizer/${reel.topic}/?track=${reel.track}&record=1`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await page.waitForFunction(() => window.__viz?.ready === true, { timeout: 60000 })
    .catch(() => {
      throw new Error(
        `window.__viz never appeared at ${url}\n` +
        `  If serving dist/, it is probably stale — RecorderBridge must be in the build.\n` +
        `  Rebuild, or re-run with --dev against \`npm run dev\`.`,
      );
    });

  const applied = await page.evaluate((t) => window.__viz.setTrack(t), reel.track);
  if (applied && applied !== reel.track) {
    console.warn(`  ! track "${reel.track}" not accepted (store reports "${applied}") — recording that instead`);
  }

  await page.addStyleTag({ content: REEL_CSS });
  await buildStage(page, reel);

  const total = await page.evaluate(() => window.__viz.total());
  if (!total) throw new Error(`no steps for ${id}`);

  // Decide how many steps actually fit the time budget before capturing, so a
  // long track is trimmed rather than compressed into unreadable flashes.
  const holds = RENDER.holdFirst + RENDER.holdLast;
  const budget = RENDER.maxTotalSeconds - holds;
  const maxByFloor = Math.max(2, Math.floor(budget / RENDER.floorStepSeconds));
  const count = Math.min(total, RENDER.maxSteps, maxByFloor);

  const durations = [];
  for (let i = 0; i < count; i++) {
    const caption = await page.evaluate((n) => {
      window.__viz.setStep(n);
      return window.__viz.describe();
    }, i);

    await page.evaluate(({ caption, pct }) => {
      const c = document.querySelector('#reel-caption');
      if (c) c.textContent = caption || '';
      const bar = document.querySelector('#reel-progress > i');
      if (bar) bar.style.width = pct + '%';
    }, { caption, pct: Math.round(((i + 1) / count) * 100) });

    // Let CSS transitions in the visualizer settle before capturing.
    await page.waitForTimeout(160);

    const f = path.join(frameDir, `f-${String(i).padStart(4, '0')}.png`);
    await page.screenshot({ path: f });
    // Time this step by how much there is to read, not a flat constant.
    const words = String(caption).trim().split(/\s+/).filter(Boolean).length;
    const read = words / RENDER.readingWordsPerSecond + RENDER.stepPadSeconds;
    const stepDuration = Math.min(Math.max(read, RENDER.minStepSeconds), RENDER.maxStepSeconds);
    const hold = (i === 0 ? RENDER.holdFirst : 0) + (i === count - 1 ? RENDER.holdLast : 0);
    // Strict cap: ensure each step is at most RENDER.maxStepSeconds (2.0s)
    const finalDuration = Math.min(stepDuration + hold, RENDER.maxStepSeconds);
    durations.push(finalDuration);
  }

  await page.close();

  // Fit the budget: scale reading time down proportionally if the captions on
  // this track are collectively too long. Holds are excluded from the scaling
  // so the opening and closing beats keep their weight.
  const readTotal = durations.reduce((a, b) => a + b, 0) - holds;
  if (readTotal > budget) {
    const k = budget / readTotal;
    for (let i = 0; i < durations.length; i++) {
      const hold = (i === 0 ? RENDER.holdFirst : 0) + (i === count - 1 ? RENDER.holdLast : 0);
      durations[i] = Math.max((durations[i] - hold) * k, RENDER.floorStepSeconds) + hold;
    }
  }

  const secs = durations.reduce((a, b) => a + b, 0);

  // concat demuxer: per-frame durations, last entry repeated (demuxer drops the
  // final duration otherwise, cutting the closing frame short).
  const frames = (await readdir(frameDir)).filter((f) => f.endsWith('.png')).sort();
  const list = frames
    .map((f, i) => `file '${f}'\nduration ${durations[i].toFixed(3)}`)
    .concat(`file '${frames[frames.length - 1]}'`)
    .join('\n');
  await writeFile(path.join(frameDir, 'list.txt'), list);

  const topicDir = path.join(OUT, reel.topic);
  await mkdir(topicDir, { recursive: true });
  const outFile = path.join(topicDir, `${reel.track}.mp4`);

  const chosenAudio = audioTracks.length
    ? audioTracks[Math.floor(Math.random() * audioTracks.length)]
    : null;

  const ffmpegArgs = [
    '-y', '-f', 'concat', '-safe', '0',
    '-i', path.join(frameDir, 'list.txt'),
  ];

  if (chosenAudio) {
    const fadeStart = Math.max(0, secs - 1.5).toFixed(2);
    ffmpegArgs.push(
      '-stream_loop', '-1',
      '-i', chosenAudio,
      '-map', '0:v',
      '-map', '1:a',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-af', `volume=0.35,afade=t=out:st=${fadeStart}:d=1.5`,
      '-shortest'
    );
  }

  ffmpegArgs.push(
    '-r', String(RENDER.fps),
    '-c:v', 'libx264', '-preset', preset, '-crf', String(RENDER.crf),
    '-pix_fmt', 'yuv420p',            // required for Instagram/QuickTime playback
    '-movflags', '+faststart',
    outFile,
  );

  await run(FFMPEG, ffmpegArgs);

  if (!keepFrames) await rm(frameDir, { recursive: true, force: true });

  // Post copy alongside the video in the section folder, so the reel is ready
  // to publish without a second command.
  await writeFile(path.join(topicDir, `${reel.track}.md`), captionMarkdown(reel), 'utf8');
  const topicReels = REELS.filter((r) => r.topic === reel.topic);
  await writeSectionCaptions(reel.topic, topicReels).catch(() => { });

  return {
    id,
    outFile,
    count,
    total,
    secs,
    audio: chosenAudio ? path.basename(chosenAudio) : null,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const keepFrames = args.includes('--keep-frames');
  const devMode = args.includes('--dev');
  const skipExisting = args.includes('--skip-existing');
  const listOnly = args.includes('--list');
  const serverArg = args.find((a) => a.startsWith('--server='));
  const concurrencyArg = args.find((a) => a.startsWith('--concurrency=') || a.startsWith('--workers='));
  const concurrency = concurrencyArg ? Math.max(1, parseInt(concurrencyArg.split('=')[1], 10)) : 6;
  const presetArg = args.find((a) => a.startsWith('--preset='));
  const preset = presetArg ? presetArg.split('=')[1] : 'veryfast';
  const filters = args.filter((a) => !a.startsWith('--'));

  // Where pages are fetched from: an already-running server, or dist/ served here.
  let origin = serverArg ? serverArg.slice('--server='.length).replace(/\/$/, '')
    : devMode ? 'http://localhost:4321'
      : `http://localhost:${PORT}`;

  let selected = filters.length
    ? REELS.filter((r) => filters.some((f) => {
      const [t, tr] = f.split(':');
      return r.topic === t && (!tr || r.track === tr);
    }))
    : REELS;

  const isRendered = (r) => {
    const sectionFile = path.join(OUT, r.topic, `${r.track}.mp4`);
    const legacyFile = path.join(OUT, `${r.topic}-${r.track}.mp4`);
    try {
      if (existsSync(sectionFile) && statSync(sectionFile).size > 1000) return true;
      if (existsSync(legacyFile) && statSync(legacyFile).size > 1000) return true;
    } catch { /* ignore */ }
    return false;
  };

  if (listOnly) {
    console.log(`${selected.length} reels queued:`);
    for (const r of selected) {
      const done = isRendered(r);
      console.log(`  ${done ? '[done]' : '[    ]'} ${r.topic}:${r.track}  — ${r.title}`);
    }
    return;
  }

  if (skipExisting) {
    const before = selected.length;
    selected = selected.filter((r) => !isRendered(r));
    const skipped = before - selected.length;
    if (skipped) console.log(`skipping ${skipped} already rendered (--skip-existing)`);
    if (!selected.length) { console.log('nothing left to record.'); return; }
  }

  if (!selected.length) {
    console.error(`No reels matched: ${filters.join(', ')}`);
    console.error(`Available: ${[...new Set(REELS.map((r) => r.topic))].join(', ')}`);
    process.exit(1);
  }

  const selfServe = origin === `http://localhost:${PORT}`;

  if (selfServe && !existsSync(DIST)) {
    console.error('dist/ not found — run `npm run build`, or use --dev against `npm run dev`.');
    process.exit(1);
  }

  if (!selfServe) {
    let reachable = await fetch(origin).then(() => true).catch(() => false);
    if (!reachable && devMode && origin === 'http://localhost:4321') {
      reachable = await fetch('http://[::1]:4321').then(() => true).catch(() => false);
      if (reachable) origin = 'http://[::1]:4321';
    }
    if (!reachable) {
      console.error(`no server at ${origin} — start it first (\`npm run dev\`) or drop --dev.`);
      process.exit(1);
    }
  }

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.error('playwright missing — run: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }

  const noAudio = args.includes('--no-audio');
  const ffSource = await resolveFfmpeg();
  if (!ffSource) {
    console.error('ffmpeg not found. Either:');
    console.error('  npm i -D ffmpeg-static          (no admin, recommended)');
    console.error('  winget install Gyan.FFmpeg      (system-wide)');
    process.exit(1);
  }
  console.log(`using ${ffSource}`);

  const audioTracks = noAudio ? [] : await getAvailableAudioTracks();
  if (audioTracks.length) {
    console.log(`audio: ${audioTracks.length} royalty-free background tracks loaded from scripts/audio/`);
  } else if (!noAudio) {
    console.log(`audio: none found in scripts/audio/ (video-only)`);
  }

  await mkdir(OUT, { recursive: true });
  const server = selfServe ? await serveDist() : null;
  console.log(`source: ${origin}${selfServe ? ' (dist/)' : ''}`);
  console.log(`workers: ${Math.min(concurrency, selected.length)} parallel | preset: ${preset}`);

  const startTime = Date.now();
  const browser = await chromium.launch();

  const done = [];
  const failed = [];
  let nextIdx = 0;
  const totalItems = selected.length;

  async function worker(workerId) {
    while (nextIdx < totalItems) {
      const i = nextIdx++;
      const reel = selected[i];
      const id = `${reel.topic}-${reel.track}`;
      const prefix = `[W${workerId}][${String(i + 1).padStart(2)}/${totalItems}] ${id.padEnd(28)}`;
      try {
        const r = await recordOne(browser, reel, keepFrames, origin, preset, audioTracks);
        const capped = r.count < r.total ? ` (capped ${r.count}/${r.total} steps)` : '';
        const over = r.secs > RENDER.warnOverSeconds ? '  ** over Reels 90s limit **' : '';
        const audioTag = r.audio ? ` [♫ ${r.audio}]` : '';
        const mp4 = await stat(r.outFile).catch(() => null);
        const mb = mp4 ? ` (${(mp4.size / 1048576).toFixed(2)} MB)` : '';
        console.log(`${prefix} ${r.secs.toFixed(1)}s, ${r.count} steps${capped}${over}${audioTag}${mb}`);
        done.push(r);
      } catch (e) {
        console.log(`${prefix} FAILED: ${e.message.split('\n')[0]}`);
        failed.push({ id, message: e.message });
      }
    }
  }

  const workerCount = Math.min(concurrency, totalItems);
  await Promise.all(Array.from({ length: workerCount }, (_, idx) => worker(idx + 1)));

  await browser.close();
  server?.close();

  const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const elapsedMin = (elapsedSec / 60).toFixed(1);
  console.log(`\nFinished in ${elapsedSec}s (~${elapsedMin} mins)`);
  console.log(`${done.length}/${selected.length} reels -> ${path.relative(ROOT, OUT)}/`);
  if (failed.length) {
    console.log(`${failed.length} failed:`);
    for (const f of failed) console.log(`  ${f.id}: ${f.message.split('\n')[0]}`);
    process.exitCode = 1;
  }
}

main();

