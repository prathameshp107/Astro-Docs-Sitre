# Reel Generator

Turns the live algorithm visualizers into vertical MP4s for Instagram Reels,
TikTok and YouTube Shorts — no screen recording, no video editor.

The pipeline drives the real `/visualizer/*` pages in a headless browser, steps
the animation one frame at a time, screenshots each step, and stitches the
frames with ffmpeg. Because it records the actual site, a reel never drifts out
of sync with the product: fix a visualizer, re-run, and every reel is current.

Output: `dsa-docs/reels-out/<topic>-<track>.mp4`, 1080×1920, H.264.

## Coverage

**65 reels — one per visualizer problem track.** The catalogue is generated from
the same 16 sections / 67 tracks the site ships; the 2 `intro` concept pages are
excluded because they have no animation to record.

Titles and subtitles for the auto-added entries come from the sidebar's own
`label` / `subtitle` text, so reel copy matches what the site displays. All 65
carry a hand-checked complexity line (36 via an explicit `cx`, the rest matched
from the topic's complexity table).

Rendering the full set takes roughly **1.5–3 minutes per reel** — about 2–3
hours for all 65, producing ~50 minutes of footage. Use
`npm run reels:resume` to work through it in sessions; it skips whatever is
already rendered.

---

## Files

| File | Role |
|---|---|
| `scripts/record-reel.mjs` | Driver: serves the site, drives the browser, calls ffmpeg |
| `scripts/reels.config.mjs` | Which reels to render + all timing/render settings |
| `scripts/reel-captions.mjs` | Generates ready-to-paste post copy per reel |
| `src/components/visualizers/RecorderBridge.jsx` | In-app hook exposing `window.__viz` (only under `?record=1`) |
| `reels-out/` | Rendered MP4s + per-reel caption `.md` (git-ignored) |
| `reels-out/captions/` | Caption files, plus `ALL-CAPTIONS.md` |
| `reels-out/.frames/` | Intermediate PNGs, deleted unless `--keep-frames` |

---

## Setup

One-time:

```bash
cd dsa-docs
npm i -D playwright ffmpeg-static
npx playwright install chromium
```

`ffmpeg-static` ships a platform binary as a normal devDependency — no
system-wide install, no admin rights on Windows. If ffmpeg is already on PATH
that one is used instead.

---

## Running

```bash
npm run reels:captions  # post copy for every reel (fast, no browser needed)
npm run reels:list      # show the queue and what's already rendered
npm run reels:dev       # render all, from the dev server
npm run reels:resume    # render only what's missing
npm run reels           # render all, from dist/ (final output)
```

Direct invocation gives finer control:

```bash
node scripts/record-reel.mjs                      # everything, from dist/
node scripts/record-reel.mjs sorting              # every sorting reel
node scripts/record-reel.mjs sorting:merge-sort   # one reel
node scripts/record-reel.mjs graphs dp --dev      # two topics, from dev server
```

### Flags

| Flag | Effect |
|---|---|
| `--dev` | Record from `http://localhost:4321` (`npm run dev`) instead of `dist/` |
| `--server=<url>` | Record from any other origin |
| `--keep-frames` | Keep the PNGs in `reels-out/.frames/` for inspection |
| `--skip-existing` | Skip reels whose MP4 already exists — resumes a part-done batch |
| `--list` | Print the queue and exit without recording |

### Two modes, and when to use each

**`--dev` — while tuning.** Picks up source changes immediately. A production
build of this site takes 10–40 minutes, so iterating against `dist/` is not
viable. Slower per frame (Vite serves unbundled modules), identical output.

**`dist/` — for final renders.** Requires a current `npm run build`. A stale
`dist/` silently records the *previous* version of the page, which is the single
easiest way to waste a batch.

Recommended loop:

```bash
# terminal 1
npm run dev

# terminal 2 — check one reel first, all 19 share the same stage layout
node scripts/record-reel.mjs sorting:bubble-sort --dev --keep-frames
# inspect reels-out/.frames/sorting-bubble-sort/*.png, then:
npm run reels:dev
```

---

## Captions

Every reel needs post copy, so it is generated from the same content the site
renders rather than written by hand per platform.

```bash
npm run reels:captions                            # all reels
node scripts/reel-captions.mjs sorting            # one topic
node scripts/reel-captions.mjs trie:insert        # one reel
node scripts/reel-captions.mjs trie --stdout      # print, don't write files
```

Output: `reels-out/captions/<topic>-<track>.md`, plus `ALL-CAPTIONS.md`
containing all of them. **Recording a reel also writes its caption file**, so
`npm run reels:dev` leaves every reel publish-ready — no second command needed.

Captions need no browser and no ffmpeg, so regenerating all 21 takes about a
second. Re-run after editing `visualizerContent.js` or `dsaTopics.js` and the
copy follows.

### Three variants per reel

The same text does not work everywhere, so each file carries three blocks:

| Block | Shape |
|---|---|
| **Instagram / TikTok** | Hook, two sentences, complexity, interview framing, CTA, 9–14 hashtags. Length is reported per reel and warned about over IG's 2,200 limit |
| **YouTube Shorts** | Title with a live character count against the 100 limit, description carrying the full FAQ answer and both links |
| **LinkedIn** | No hashtag spam, leads with the insight, first-person build note |

### Where the copy comes from

Nothing is invented. Each field is pulled from a real source, so a caption
cannot claim something the site contradicts:

| Caption part | Source |
|---|---|
| hook | `reels.config.mjs` — `title` + `subtitle` |
| explanation | `DSA_TOPICS[topic].overview.what` / `.why` |
| complexity | the matching row of `VISUALIZER_CONTENT[topic].complexity`, or the reel's `cx` |
| "gets asked as" | `DSA_TOPICS[topic].interviewQuestions[0]` |
| YouTube long description | `VISUALIZER_CONTENT[topic].faqs[0]` |
| hashtags | `CORE_TAGS` + `TOPIC_TAGS` in `reel-captions.mjs` |

`DSA_TOPICS.overview` is preferred over the article intro because the on-page
copy is page-relative — it says things like "the visualizer above", which is
meaningless in a caption. Any sentence containing that phrasing is filtered out.

### Complexity matching, and the `cx` override

Complexity is looked up by matching the reel title against the topic's
complexity table: exact match, then prefix, then a ranked distinctive-token
match. **If no clear winner exists it prints nothing rather than guessing** — an
early version matched "Merge Sort" to the *Bubble Sort* row (both labels contain
"sort") and published O(n²) for merge sort.

Reel titles are written for humans ("Breadth-First Search") while tables use the
short form ("BFS"), which lexical matching cannot bridge. For those, set `cx`
explicitly on the reel and it wins over any lookup:

```js
{ topic: 'graphs', track: 'bfs', cx: 'Time: O(V + E) · Space: O(V)',
  title: 'Breadth-First Search', subtitle: 'O(V+E) — shortest path, unweighted' },
```

36 of the 65 reels use `cx`; all 65 carry a correct complexity line. When adding
a reel, check with `node scripts/reel-captions.mjs <topic>:<track> --stdout` and
add `cx` if the complexity line is missing.

### Tune the voice

The hashtag sets and CTA wording are defaults, not gospel. They live at the top
of `reel-captions.mjs` (`CORE_TAGS`, `TOPIC_TAGS`) and in the three template
strings inside `build()`. Worth a pass in your own voice — that copy reads as
you, not as a tool.

---

## How it works

### 1. The bridge

`RecorderBridge` mounts inside `DSAVisualizerPage` but **only when the URL
carries `?record=1`**. Without the flag it renders nothing and registers
nothing, so visitors and the production bundle are unaffected.

With the flag it exposes the active topic's zustand store:

```js
window.__viz.total()      // number of steps in the current track
window.__viz.current()    // current step index
window.__viz.setStep(i)   // jump to a step, pausing autoplay
window.__viz.setTrack(t)  // switch algorithm track
window.__viz.describe()   // caption text for the current step
window.__viz.ready        // true once driveable
```

### 2. Why the store, not the play button

Clicking the in-page play control couples frame capture to a `setTimeout`
loop — frames drop or duplicate depending on machine load, and the result is
non-reproducible. Setting `currentStep` directly means every step lands exactly
once, and the total frame count is known before capture starts, which is what
makes the duration budgeting below possible.

### 3. The stage

The visualizer is a wide desktop layout; a reel is 9:16. Before capturing, the
driver injects CSS and rebuilds the DOM into a vertical stage:

```
┌─────────────────────────────┐
│  title        (58px bold)   │
│  subtitle     (30px accent) │
│                             │
│  [ visualization panel ]    │  ← .sketch-canvas-box, scaled to fit
│                             │
│  ┌───────────────────────┐  │
│  │ step explanation      │  │  ← caption, 36px on its own panel
│  └───────────────────────┘  │
│  ▬▬▬▬▬▬▬▬░░░░░░  progress   │
│  interviewpreprationbuddy.in│
└─────────────────────────────┘
```

Nav, sidebar, tab bar, playback controls and the reference article are hidden.
Only `.sketch-canvas-box` is moved onto the stage — *not* its parent, which
would drag the playback controls into frame.

**Scaling.** The panel is forced to `width: fit-content` so it hugs its drawing,
then scaled to 99% of the available width (cap 6×). Wide topics (graphs, DP
tables) naturally land at a lower factor than a short row of cards.

**Safe area.** Padding is `100px 24px 260px`. Instagram overlays the username,
caption and audio strip across roughly the bottom 250px of a 1920-tall reel, so
content stays clear of it. Side padding is deliberately tight because these
drawings are width-bound — horizontal room *is* the scale factor.

### 4. Timing

Step duration follows caption length rather than a fixed interval:

```
duration = clamp(words / readingWordsPerSecond + stepPadSeconds,
                 minStepSeconds, maxStepSeconds)
```

At 2.4 words/sec a 14-word explanation gets ~5.5s; a 6-word one gets ~3.2s.
A flat interval either flashes long captions past unread or drags short ones.

Then a budget pass guarantees the platform limit: step count is capped by what
fits in `maxTotalSeconds`, and if the captions are still collectively too long
the durations scale down proportionally, never below `floorStepSeconds`. Opening
and closing holds are excluded from that scaling so the loop keeps its beats.

### 5. Encoding

Frames are stitched with ffmpeg's **concat demuxer**, which accepts a per-frame
`duration` — that is what allows variable step lengths and longer first/last
holds without emitting duplicate PNGs.

```
-r 30 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart
```

- `-r 30` alone resamples the variable durations to constant frame rate.
  **Do not add `-vsync`/`-fps_mode`** — ffmpeg 7+ errors with *"One of
  -r/-fpsmax was specified together a non-CFR -vsync/-fps_mode"*.
- `-pix_fmt yuv420p` is required or Instagram and QuickTime refuse the file.
- `+faststart` moves the index to the front for streaming.

---

## Configuration

All knobs live in `scripts/reels.config.mjs`.

### `RENDER`

| Key | Default | Meaning |
|---|---|---|
| `width` / `height` | 1080 / 1920 | Canvas size (9:16) |
| `fps` | 30 | Output frame rate |
| `readingWordsPerSecond` | 2.4 | On-screen reading speed. **Raise for shorter reels** |
| `minStepSeconds` | 2.2 | Floor per step before budgeting |
| `maxStepSeconds` | 5.5 | Ceiling per step |
| `stepPadSeconds` | 0.7 | Comprehension pad added to every step |
| `holdFirst` / `holdLast` | 2.0 / 3.0 | Extra hold on opening and closing frames |
| `maxSteps` | 22 | Hard cap on steps per reel |
| `maxTotalSeconds` | 84 | Duration budget (Reels limit is 90s) |
| `floorStepSeconds` | 1.6 | Never compress a step below this |
| `warnOverSeconds` | 88 | Print a warning past this length |
| `crf` | 20 | x264 quality; 23 roughly halves file size |

### `REELS`

```js
{ topic: 'sorting', track: 'merge-sort',
  title: 'Merge Sort', subtitle: 'O(n log n) — divide & conquer' }
```

- `topic` — the `/visualizer/<topic>/` route segment
- `track` — **must match a slug the store's `setTrack()` accepts.** Verify:
  ```bash
  grep -A30 "setTrack:" src/store/visualizers/sortingStore.js
  ```
  A wrong slug silently records the store's *default* track.
- `title` / `subtitle` — overlay text, not read from the page

---

## Adding a reel

Captions come along automatically — a new entry in `REELS` is picked up by
`reel-captions.mjs` with no extra work. Add `cx` if the title will not match a
complexity row (check with `node scripts/reel-captions.mjs <topic>:<track>
--stdout`).


1. Find a valid track slug in the relevant `src/store/visualizers/*Store.js`.
2. Append an entry to `REELS`.
3. `node scripts/record-reel.mjs <topic>:<track> --dev --keep-frames`
4. Check the PNGs before batching.

Adding a whole new *topic* also needs an entry in `RecorderBridge`'s `STORES`
map, or it fails with `no store registered for topic "..."`.

---

## Troubleshooting

**`window.__viz never appeared`**
`dist/` predates `RecorderBridge`. Rebuild, or use `--dev`.

**`no server at http://localhost:4321`**
`npm run dev` isn't running, or hasn't finished its content sync. Wait for
`watching for file changes...` — cold sync takes 2–4 minutes on this project.

**`One of -r/-fpsmax was specified together a non-CFR -vsync/-fps_mode`**
Something reintroduced `-vsync`/`-fps_mode` alongside `-r`. Remove it.

**`ffmpeg not found`**
`npm i -D ffmpeg-static`, or `winget install Gyan.FFmpeg`.

**Visualization renders small**
The panel isn't shrink-wrapping. It needs `width: fit-content` — `width: auto`
on a block element means *fill the parent*, which pins the scale factor to ~1.0.

**Track records the wrong algorithm**
The slug isn't in that store's `setTrack()`. The driver warns
`track "x" not accepted (store reports "y")` when the store disagrees.

---

## Constraints

- **90s hard limit** on Reels. The budget pass enforces 84s.
- **Width-bound.** A row of array cards is wide and short; it already scales to
  the full 1080px frame. Making it visually larger means fewer array elements in
  the store's default data, not a recorder change.
- **Sequential by design.** Parallel pages contend for CPU during screenshot and
  encode, and interleaved failures are unreadable.
- **No audio.** Add music in the Instagram composer — platform-native audio gets
  better reach than a baked-in track.
