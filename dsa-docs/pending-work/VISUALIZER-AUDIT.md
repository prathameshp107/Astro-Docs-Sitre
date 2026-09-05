# Visualizer Section — Audit & Fix Order

Audit of the 16 visualizers at `/visualizer/*`, focused on two questions: what is
**broken**, and what structurally **blocks reach**.

Every finding below was verified against the source by cross-referencing the
sidebar's advertised tracks, each store's `setTrack()`, and each `logicData`
key — not by inspection or assumption. Repro commands are included so any
finding can be re-checked, and so a fix can be proven.

**Scope:** 16 topics, 67 advertised tracks.
**Original result:** 5 broken tracks, 1 critical mobile defect, 3 structural share gaps.

## Status

Last updated after fixes 1, 2 and 5.

### Done

| # | Fix | Evidence |
|---|---|---|
| **1** | Mobile sidebar collapses under 768px | `matchMedia` listener + `max-md:fixed` overlay. SSR still renders the sidebar, so its 67 internal links stay in the HTML |
| **2** | 5 broken tracks repaired | Audit: 0 cross-topic, 0 blank. 4 arrays entries derived from exported store steps; recursion:subsets un-shadowed |
| **5** | All logic keys namespaced | 81 entries across 16 files → `<topic>-<track>`. Alias table and per-topic chain both retired |

```
session start:  cross-topic 3   blank 3
now:            cross-topic 0   blank 0   fallback 0   (67 tracks, incl. intro)
```

**A third cross-topic bug surfaced during #5**, missed by the first audit because
it skipped `intro` tracks: `sliding-window:intro` was rendering *"1. Two Pointers
Concept - Introduction"* — `slidingWindowLogic` has no `intro` key and
`twoPointersLogic` is spread earlier in the flat map. Fixed by the namespacing.

### Remaining

| # | Fix | Severity | Effort | Notes |
|---|---|---|---|---|
| **3** | Per-topic OG images | **High** | Medium | Highest-leverage growth item left. All 16 visualizers still emit one shared `/assets/og-image.png`, so every shared link looks identical. `record-reel.mjs` already drives the real page in Playwright — a sibling script can capture one 1200×630 frame per topic |
| **4** | `&step=` deep links + copy-link button | Medium | Medium | No way to link to a moment, no share affordance, no embed route. The embed matters most: it is the one item that generates backlinks, which is the current ranking ceiling |

### Not verified

Everything above is **static-verified only** — cross-reference audit, module
loads, key namespacing, parse checks. Three things that need a human:

1. **A browser at 375px** — that the canvas owns the full width and the sidebar
   toggles. I cannot open one.
2. **Diagrams actually rendering** for the repaired tracks. The audit proves each
   track resolves to the *right key*; it does not prove the diagram draws.
   Worth loading: `arrays:search`, `arrays:access`, `recursion:subsets`,
   `sliding-window:intro`, `heaps:heap-sort` — these exercise the changed paths.
3. **A production build.** Not run (10–40 min). Nothing here should affect it —
   no imports moved, no route changes — but that is reasoning, not evidence.

**None of it is committed or deployed.** The live site still runs the pre-Trie,
pre-fix code.

### A caveat on the parse checks

`esbuild` reported "19 files parse clean" while `LogicSection.jsx` still
referenced `activeTrackKey`, an identifier I had just renamed away — undeclared
identifiers are a runtime `ReferenceError`, not a parse error. It was found by
grepping for the old name. Treat parse checks as necessary but not sufficient;
grep for removed identifiers after any rename.

---

## Fix order (original prioritisation)

Kept for the reasoning. 1–2 were defects; 3–4 are the growth levers; 5 removed
the cause rather than the symptoms. 1, 2 and 5 are now done — see Status above.

| # | Fix | Severity | Effort | Why this position |
|---|---|---|---|---|
| **1** | Mobile sidebar defaults closed | **Critical** | Small | Social traffic is ~95% mobile. Every channel we post to lands on the weakest surface. Nothing else matters until this works |
| **2** | 5 broken tracks (2 wrong diagram, 3 blank) | **High** | Small | A confidently *wrong* diagram teaches the wrong thing. Worse than an empty one |
| **3** | Per-topic OG images | **High** | Medium | All 16 pages share one preview image. Compounds across every share, forever |
| **4** | `&step=` deep links + copy-link button | Medium | Medium | Turns viewers into distributors. The most shareable thing a step visualizer can offer |
| **5** | Namespace all `logicData` keys | Medium | Medium | Removes the bug class in #2 so Strings/Greedy/Bit-Manipulation don't reproduce it |

---

## 1. Mobile sidebar — CRITICAL — ✅ FIXED

**Files:** `src/components/visualizers/VisualizerSidebar.jsx:298,304`,
`src/components/visualizers/DSAVisualizerPage.jsx:133,182`

```jsx
// DSAVisualizerPage.jsx:133
const [isSidebarOpen, setIsSidebarOpen] = useState(true);   // every width

// VisualizerSidebar.jsx:298,304
if (!isOpen) return null;
<aside className="w-64 md:w-72 shrink-0 h-full ...">
```

The sidebar opens by default at **every** viewport. There is no `matchMedia`,
no `innerWidth` check, and no responsive breakpoint anywhere in either file
(verified: zero matches for `innerWidth|matchMedia|isMobile`).

On a 375px phone the sidebar consumes 256px, leaving ~119px for the animation —
inside a `h-screen overflow-hidden` shell (`DSAVisualizerPage.jsx:182`) that
cannot scroll away.

**Why this is first.** Instagram, TikTok and Shorts traffic is overwhelmingly
mobile. The reels pipeline exists to drive exactly that traffic. Succeeding at
distribution while this is broken converts attention into bounces.

**Fix:** default `isSidebarOpen` from viewport width, closed below the `md`
breakpoint, and render the open sidebar as an overlay on small screens rather
than a flex sibling that steals width. The toggle button and the Ctrl+B / `\`
shortcut already exist, so nothing is lost.

### What was done

`DSAVisualizerPage.jsx` — a `matchMedia('(max-width: 767px)')` listener closes
the sidebar on mount and reacts to rotation/resize:

```js
const mq = window.matchMedia('(max-width: 767px)');
const apply = () => setIsSidebarOpen(!mq.matches);
apply();
mq.addEventListener('change', apply);
```

`VisualizerSidebar.jsx` — below `md` the sidebar now floats over the canvas
instead of taking a flex column from it:

```
max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:shadow-2xl
```

**Deliberate:** `isSidebarOpen` still initialises to `true`, so the server-rendered
HTML keeps the sidebar's 67 internal track links. Returning `null` during SSR
would have stripped them and undone the internal-linking work. The collapse
happens on mount instead — one frame on mobile, no SEO cost.

**Verify:** DevTools at 375px — the canvas should own the full width, with the
sidebar reachable via the toggle and via Ctrl+B / `\`.

---

## 2. Five broken tracks — HIGH — ✅ FIXED

**Cause.** `LogicSection.jsx:37` merges every topic's logic object into **one
flat map**:

```js
const SPECIFIC_PROBLEM_LOGIC = { ...twoPointersLogic, ...arrayLogic, ...searchingLogic, /* …16 */ };
```

Then `LogicSection.jsx:206` rewrites raw track names (`insert` → `insertion`,
`search` → `linear-search`, …). A track can therefore resolve to a **different
topic's** entry, or to nothing. Neither throws.

### 2a. Wrong topic's diagram (2 tracks)

| Track | Resolves to | Renders |
|---|---|---|
| `arrays:search` | `linear-search` | **Searching's** diagram |
| `recursion:subsets` | `subsets` | **Backtracking's** diagram |

`arrays:search` is the serious one — a learner on the Arrays page is shown a
different topic's walkthrough. `recursion:subsets` is subtler: subsets *is* a
backtracking problem, but the recursion store has its own step sequence, so the
diagram and the animation can disagree step for step.

**Fix:** namespace the keys as Trie does — `trie-insert` / `trie-search` /
`trie-prefix`, resolved **before** the alias table.

### 2b. Blank Core Logic diagram (3 tracks)

`arrayLogic` exports only `arrays`, `prefix-sum`, `reverse-array`. So:

| Track | Looks for | Exists |
|---|---|---|
| `arrays:access` | `access` | no |
| `arrays:insert` | `insertion` | no |
| `arrays:delete` | `deletion` | no |

**Fix:** add the three entries to `arrayLogic.js`, matching the store's step
count 1-to-1 (see `VISUALIZERS.md` → authoring standards).

### What was done

**Derived instead of hand-authored.** The five entries could have been written by
hand, but that recreates the exact drift that caused the bug — a second copy of
every step that must stay 1-to-1 with the store by discipline. Instead the step
constants are now exported from their stores and the logic entries are derived
from them, so the counts are identical by construction:

- `arrayStore.js` — exported `ACCESS_STEPS`, `INSERT_STEPS`, `DELETE_STEPS`, `SEARCH_STEPS`
- `recursionStore.js` — exported `SUBSETS_STEPS`
- `arrayLogic.js` — added `array-access` (8), `array-insertion` (9), `array-deletion` (9), `array-search` (9)
- `recursionLogic.js` — added `recursion-subsets` (7, was rendering backtracking's 9)

Step arrays are exported rather than reading the live store on purpose: importing
a store and calling `setTrack()` at module scope would mutate the visitor's
current track as an import side effect.

Narration fields the stores don't carry (`title`, `computation`, `comparison`,
`action`) are synthesised by a shared `fromStoreSteps()` helper. Verified present
on every derived step.

**Routing** in `LogicSection.jsx` resolves these *before* the alias table, via an
explicit table:

```js
const ARRAY_LOGIC_KEY = {
  access: 'array-access', insert: 'array-insertion', delete: 'array-deletion',
  search: 'array-search', reverse: 'reverse-array', 'prefix-sum': 'prefix-sum',
};
```

Explicit, not `` `array-${track}` `` — a template briefly broke `arrays:reverse`
and `arrays:prefix-sum`, whose entries predate the namespacing and are keyed
`reverse-array` / `prefix-sum`. That regression was caught by re-running the
audit, which is the argument for keeping the audit runnable.

**Also:** `logicData` imports now carry explicit `.js` extensions
(`arrayLogic`, `recursionLogic`, `trieLogic`), so these files can be loaded by
plain `node` for verification instead of requiring a 40-minute build.

**Verify:** re-run the cross-reference audit — reports `cross-topic 0, blank 0`.

### Not broken

**0 dead tracks.** All 67 advertised tracks are handled by their store's
`setTrack()`, so no track silently plays a different algorithm's animation.

---

## 3. Every visualizer shares one OG image — HIGH

**File:** `src/components/PageSEO.astro:60`

```js
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;
```

Verified in the built output: `/visualizer/sorting/`, `/trees/`, `/graphs/`,
`/dp/` and the rest all emit the identical `og:image`.

**Impact.** Every link shared to Twitter, LinkedIn, WhatsApp, Slack or Discord
renders the same generic card. The preview image is the single biggest driver of
click-through on a shared link, and right now a sorting link and a graph link
are visually indistinguishable. This tax applies to every share, forever —
which is why it ranks above features.

**Fix.** Generate 16 per-topic OG images (1200×630) and pass `ogImage` through
`PageSEO`. The machinery already exists: `scripts/record-reel.mjs` drives the
real visualizer in Playwright and screenshots it. A sibling script can capture
one frame per topic at OG dimensions — real animation stills, not templated
graphics.

---

## 4. Nothing is linkable or shareable — MEDIUM

Three gaps, verified absent from `src/components/visualizers/`:

**No `&step=` deep link.** `?track=` selects an algorithm but there is no way to
link to a *moment*. "Look at step 7, where the swap happens" is the most
shareable thing a step-through visualizer has, and it is currently impossible.
The store already exposes `setStep`, and `VisualizerSidebar` already syncs
`?track=` both ways — so this is wiring, not new architecture.

**No share or copy-link button.** Zero matches for `navigator.share` or any
copy-link affordance. Someone who likes a visualizer must reach for the URL bar,
and will then share a link that loses their current track and step.

**No embed.** No iframe-friendly route. A blog post or a Stack Overflow answer
embedding a visualizer would be a durable backlink — the exact thing the site
lacks most (see the reach analysis: zero backlinks is the current ranking
ceiling).

**Fix order within this item:** `&step=` first (enables meaningful links), then
the copy-link button (makes them easy), then consider an embed route.

---

## 5. Namespace all logic keys — MEDIUM — ✅ FIXED

Findings 2a and 2b are instances; the flat map plus alias table is the cause.
Four more visualizers are planned (Strings, Bit Manipulation, Greedy,
Topological Sort per `VISUALIZERS.md`), and generic track names like `insert`,
`search` and `reverse` are exactly what those topics will want to use.

**Fix.** Namespace every `logicData` key as `<topic>-<track>` and resolve
`` `${topic}-${track}` `` before the alias table, retiring the alias chain as
each topic migrates. Then a collision becomes impossible rather than
discovered later by screenshot.

### What was done

**81 entries across 16 files namespaced**; 63 renamed in bulk plus the ones
already done for trie/arrays. Renames were anchored to object-key position at
two-space indent, so a key name appearing inside prose was never touched.

`LogicSection` resolution collapsed from a per-topic chain **plus** a 9-branch
alias table down to one deterministic join:

```js
const trackPrefix = topicId === 'hash-tables' ? 'hash-table' : topicId;
const topicKey = topicId === 'heaps' ? 'heap' : topicId;
const resolvedTrackKey = activeTrack ? `${trackPrefix}-${activeTrack}` : topicKey;
```

A namespaced miss now falls back to the **topic's own** overview entry, never to
another topic's.

Three things found while doing it:

- **`recursionLogic` already had a correct 7-step `subsets` entry** — it was
  simply shadowed by `backtrackingLogic.subsets` (9 steps), which is spread
  earlier. So the derived duplicate added during #2 was removed in favour of the
  better hand-authored content, and `SUBSETS_STEPS` no longer needs exporting.
- **`graphLogic`'s topic key was `graph`** while the topic id is `graphs`, so the
  topic-level fallback could never match. Renamed.
- **`stackLogic` has an authored `min-stack` entry with no sidebar track** —
  finished content for a Min Stack track that nothing links to. Namespaced to
  `stack-min-stack`; see `VISUALIZER-ROADMAP.md`, where Min Stack is already a
  recommended addition. It is now a wiring job, not an authoring one.

**One bug I introduced and caught:** renaming `activeTrackKey` to `activeTrack`
left a stale reference in the fallback chain — an undeclared identifier, which
would throw `ReferenceError` if reached. `esbuild` parses it happily; undeclared
identifiers only fail at runtime. Found by grepping for the old name, which is
why the greps matter as much as the parse check.

**Verify:** the audit reports `cross-topic 0, no entry 0, fallback 0` across all
67 tracks.

---

## Re-running the audit

The cross-reference script lives in the session scratchpad; the logic is small
enough to keep permanently if useful. It:

1. Parses `TOPIC_TRACKS` from `VisualizerSidebar.jsx`
2. Mirrors the alias chain from `LogicSection.jsx:206`
3. Builds an owner map of every `logicData` key → the topic that defines it
4. Reports tracks resolving cross-topic, and tracks resolving to nothing

Current baseline to beat:

```
wrong-topic: 2   blank: 3   of 67 tracks
DEAD tracks: 0
```

Static checks that need no build:

```bash
# what slugs a store really accepts
grep -A30 "setTrack:" src/store/visualizers/<topic>Store.js

# what keys a logic file really defines
node --input-type=module -e "import {x} from './src/components/visualizers/logicData/<t>Logic.js'; console.log(Object.keys(x))"

# parse check after edits
node -e "require('esbuild').transformSync(require('fs').readFileSync('<file>','utf8'),{loader:'jsx'})"
```

---

## Honest assessment

The content is not the problem. Sixteen visualizers with real explanations,
complexity tables and FAQs is stronger than most free competitors, and the Trie
build showed the generator approach can add topics with custom input support.

What holds reach back is narrower than it feels:

- **The landing experience on the device the audience uses is broken** (#1).
- **The shared artifact is undifferentiated** — same preview image, no linkable
  moment (#3, #4).
- **Five tracks actively teach the wrong thing** (#2).

None of that needs more features. It needs the surface that visitors and sharers
actually touch to work.

The one thing no code change fixes remains **zero backlinks** — which is why the
embed route in #4 matters more than it first appears, and why distribution
remains the real bottleneck.
