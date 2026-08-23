# MCQ Image Posts

Turns the quiz bank into Instagram carousel posts — no design tool, no manual
screenshots.

Each question becomes a **2-slide carousel**: the question with its options, then
the answer with an explanation. Because the images are generated from
`src/components/mcq/questions/*.js`, a post can never contradict the site, and
fixing a question fixes every post derived from it on the next run.

**Scale:** 1,760 questions · 231 topics · 15 technologies → 3,520 images.

---

## Files

| File | Role |
|---|---|
| `scripts/generate-mcq-posts.mjs` | Builds the slide HTML and screenshots it |
| `scripts/mcq-posts.config.mjs` | Which questions, render size, palette, folder names |
| `src/components/mcq/questions/*.js` | Source of truth — 15 files, the quiz bank |
| `mcq-posts/` | Output (git-ignored) |

---

## Setup

```bash
cd dsa-docs
npm i -D playwright
npx playwright install chromium
```

That is all. **No dev server, no build** — unlike the reel recorder, the slides
are a self-contained HTML string passed to `page.setContent()`, so this runs
standalone in seconds and never touches the Astro project.

---

## Running

```bash
npm run mcq:list                                     # all 1,760 with output paths
node scripts/generate-mcq-posts.mjs --limit=2        # 2 per technology (30 posts) — start here
npm run mcq:posts                                    # everything
node scripts/generate-mcq-posts.mjs --skip-existing  # resume a part-done run
node scripts/generate-mcq-posts.mjs javascript       # one technology
node scripts/generate-mcq-posts.mjs javascript:js-42 # one question
```

### Flags

| Flag | Effect |
|---|---|
| `--list` | Print the queue with output paths, render nothing |
| `--limit=N` | Cap to N questions per technology |
| `--skip-existing` | Skip questions whose slide 2 already exists |

**Start with `--limit=2`.** Thirty posts, roughly thirty seconds, one from every
technology — enough to catch layout clipping across all 15 designs before
committing to the full run. The run prints a live rate and ETA
(`ok 0.6s/post ~18m left`).

---

## Output layout

Grouped by technology and topic, because 3,520 flat files are unusable:

```
mcq-posts/
  js/
    closures-scope/
      js-1-1.png        question + options
      js-1-2.png        answer + explanation
      js-1.md           caption, ready to paste
    event-loop/
    promises-async/
  react/
    useeffect-hook/
  data-structures/
    linked-lists/
  system-design/
    load-balancing/
```

Folder names come from `TECH_DIR` in the config — `javascript` → `js`,
`typescript` → `ts`, `nodejs` → `node`; anything unlisted keeps its own name.
Topics are hyphen-slugged, so *"Event Loop"* becomes `event-loop/`.

---

## Why two slides

| Slide | Contents |
|---|---|
| **1** | Topic + difficulty badges, question, code snippet, options A–D, and a **"Comment your answer 👇"** strip. The answer is deliberately absent |
| **2** | The same options with the correct one bordered green and ticked, plus a "Why" explanation |

This split is the entire mechanic. A single image that reveals the answer gets
scrolled past; a question the reader answers in their head earns the swipe, and
asks for the comment. Swipes and comments are the two signals Instagram weights
most heavily.

For the same reason **the caption does not print the answer letter**. An early
version ended with *"Answer is C"*, which removed any reason to comment or swipe.

---

## Caption

One `.md` per question, in the same folder as its slides, leading with the site
link (matching the reel captions):

```
https://interviewpreprationbuddy.in/

What will be the output of the following code?

Comment your answer below — A, B, C or D ✨
Then swipe to slide 2 to check it.

Functions can access variables from their parent scope through lexical scoping…

Key idea: Functions remember the scope where they were created…

▶ 1,700+ more MCQs, free and no sign-up:
https://interviewpreprationbuddy.in/mcq

#javascript #mcq #quiz #codinginterview #dsa …
```

Every part is read from the question object — `question`, `explanation`,
`keyConcept`, `technology`. Nothing is written by hand, so captions stay true to
the bank.

---

## Configuration

`scripts/mcq-posts.config.mjs`.

### `RENDER`

| Key | Value | Why |
|---|---|---|
| `width` / `height` | 1080 / 1350 | Instagram 4:5 portrait — the largest feed footprint on a phone. 1080×1080 also works if you prefer a uniform grid |
| `deviceScaleFactor` | **1** | 1080×1350 already *is* Instagram's upload size, so 2× only produces files Instagram immediately downscales. Across the full bank that is ~0.6 GB instead of ~2.1 GB |
| `format` | `png` | Flat dark UI with text — compresses well and stays crisp |

### `POSTS`

Defaults to every technology. Narrow it per entry while experimenting:

```js
export const POSTS = [
  { technology: 'javascript', difficulty: 'medium', count: 5 },
  { technology: 'react', ids: ['react-2', 'react-8'] },
];
```

`difficulty` filters (`easy` / `medium` / `hard`), `count` takes the first N,
`ids` selects explicitly.

### `THEME`

Ten colour tokens mirroring the site's chalkboard visualizer palette — `accent`
(amber) for badges and the comment strip, `correct` (emerald) for the answer.
Change them here rather than in the generator.

---

## Volume and runtime

| Selection | Posts | Images | Approx. size |
|---|---|---|---|
| `--limit=2` | 30 | 60 | ~11 MB |
| One technology | 80–150 | 160–300 | ~30–55 MB |
| Everything | 1,760 | 3,520 | **~0.6 GB** |

`mcq-posts/` is git-ignored — these must not enter the repo.

At roughly 0.5–1s per post the full run is about **15–30 minutes**, and
`--skip-existing` makes it resumable across sessions.

---

## The question bank

Verified across all 15 files: **1,760 questions, none malformed** — every one has
exactly 4 options, a `correctAnswer`, and no multi-answer questions. 752 carry a
`codeSnippet`.

| Field | Used for |
|---|---|
| `question` | Slide 1 heading, caption hook |
| `codeSnippet` | Slide 1 code block (752 questions) |
| `options` | Both slides, lettered A–D |
| `correctAnswer` | Which option slide 2 marks (array of indices) |
| `explanation` | Slide 2 "Why", caption body |
| `keyConcept` | Caption "Key idea" line |
| `topic` | Badge and output folder |
| `difficulty` | Badge, and the `difficulty` filter |

Multi-answer questions would render correctly — slide 2 ticks every index in
`correctAnswer` — but the bank currently has none.

---

## Troubleshooting

**`playwright missing`** — `npm i -D playwright && npx playwright install chromium`.

**Text clipped at the bottom** — the slide is a fixed 1350px. A long question
plus a tall code snippet plus a long explanation can overflow. Options: raise
`height`, drop the `.q` / `pre` font sizes in the generator's `<style>`, or
exclude that question via `ids`.

**Fonts look wrong** — the template pulls Inter and JetBrains Mono from Google
Fonts, so the first render needs network access. `document.fonts.ready` is
awaited before each screenshot, so a slow font load delays rather than breaks it.

**Answer marked on the wrong option** — `correctAnswer` holds *indices*, not
letters. Check the question in `src/components/mcq/questions/<tech>.js`; the
generator maps index → letter, so a wrong tick means wrong data.

---

## Constraints

- **No answer in the caption**, by design. Do not "helpfully" add it back.
- **Fixed slide height.** No auto-shrink to fit; long content clips rather than
  scaling, because auto-scaling text produces inconsistent-looking sets.
- **Two slides only.** A 3rd slide (key concept) is possible but each extra
  slide is another swipe to lose people on.
- **Captions are generated.** Edit `explanation` / `keyConcept` in the bank, not
  the output — regenerating overwrites the `.md`.
