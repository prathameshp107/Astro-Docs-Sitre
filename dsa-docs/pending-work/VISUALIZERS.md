# Visualizer Platform

How `/visualizer/*` works, what it costs to add a new one, and which ones to
build next.

16 topic visualizers exist today: **arrays, sorting, searching, trees, graphs,
stack, queue, linked-list, hash-table, heaps, recursion, dp, two-pointers,
sliding-window, backtracking, trie**.

---

## The mental model: it's a slideshow, not a running algorithm

This is the single thing to understand before touching anything here.

**Nothing executes.** Bubble sort never runs. Each track is a hand-authored
array of frozen states:

```js
const BUBBLE_SORT_STEPS = [
  { activeLine: 1, array: [5,2,8,1,4], state: { i:0, j:0 }, desc: 'Step 1: ...' },
  { activeLine: 3, array: [2,5,8,1,4], state: { i:0, j:1 }, desc: 'Step 2: ...' },
  // ~12 of these
];
```

Playback is an index into that array:

```
/visualizer/sorting/?track=bubble-sort
          │
          ▼
  VisualizerSidebar reads ?track=  ──►  store.setTrack('bubble-sort')
          │
          ▼
  store: { steps: BUBBLE_SORT_STEPS, currentStep: 0, isPlaying: false }
          │
          ▼
  SortingVisualizer renders steps[currentStep]
     ├── canvas: cards, pointers, highlights
     ├── Concept Code: line highlighted where activeLine === line
     ├── State box: step.state
     └── Logic tab: LogicSection reads the parallel logicData entry
```

Play is `setInterval(nextStep)`. Every panel reads from that one step object.

### What this means for you

Adding a visualizer is **authoring content, not writing an algorithm**. The
effort is writing 8–12 precise state snapshots per track and keeping two
parallel arrays in lockstep. Budget time for the step authoring, not the React.

### Or generate the steps instead

The 15 original visualizers hand-write their arrays. `trieStore.js` does not —
generators walk a real trie and *yield* step objects:

```js
function* traceInsert(words) {
  yield { activeLine: 1, nodes: snapshot(nodes), state: {...}, desc: '...' };
  // ...one yield per meaningful transition
}
```

The step array is the interface: nothing downstream cares whether it was typed
or generated. Three things this buys —

- **Custom input.** `setWords(['tree','try','to'])` retraces the whole animation.
  The hardcoded stores are locked to their fixed data forever.
- **No drift.** `trieLogic.js` imports the same generator instead of keeping a
  second hand-written copy, so the 1-to-1 requirement is structural.
- **Correct by construction.** A generated step cannot describe a state the
  algorithm never reaches.

Prefer this for new visualizers. Don't rewrite the existing 15 — they work, and
~13,800 lines of authored step data is not worth re-deriving.

---

## Anatomy

| Layer | File | Holds |
|---|---|---|
| Route | `src/pages/visualizer/<topic>.astro` | SEO, schema, mounts `DSAVisualizerPage` |
| Shell | `src/components/visualizers/DSAVisualizerPage.jsx` | Tabs, header, topic lookup, `VISUALIZER_MAP` |
| View | `src/components/visualizers/<Topic>Visualizer.jsx` | The animation |
| State | `src/store/visualizers/<topic>Store.js` | `steps`, `currentStep`, `setTrack()` |
| Diagram | `src/components/visualizers/logicData/<topic>Logic.js` | Per-step structural diagram data |
| Diagram router | `src/components/visualizers/LogicSection.jsx` | Picks the diagram branch per topic |
| Metadata | `src/data/visualizers/dsaTopics.js` | `title`, `icon`, `description`, `overview`, `complexity`, `code`, `interviewQuestions` |
| Nav | `src/components/visualizers/VisualizerSidebar.jsx` | Topic + track list |
| Hub | `src/components/DSAVisualizerHub.jsx`, `src/pages/visualizer.astro` | Landing grid |
| SEO/AEO | `src/data/visualizers/visualizerContent.js` | On-page article + FAQ schema |
| Reels | `src/components/visualizers/RecorderBridge.jsx`, `scripts/reels.config.mjs` | Video generation (see `REELS.md`) |

Stores are zustand and **in-memory** — no `persist` middleware, so nothing
survives a refresh.

---

## Adding a new visualizer — 12 touch points

> Derived by tracing every file that references an existing topic. `CLAUDE.md`
> and `GEMINI.md` carry the same list in short form.

1. **`src/store/visualizers/<topic>Store.js`** — `<TRACK>_STEPS` arrays, plus a
   `setTrack(key)` router that swaps `steps` and resets `currentStep`.
2. **`src/components/visualizers/<Topic>Visualizer.jsx`** — the view. Model on
   `StackVisualizer.jsx` (simple) or `GraphVisualizer.jsx` (complex).
3. **`src/components/visualizers/logicData/<topic>Logic.js`** — diagram data,
   keyed **`<topic>-<track>`** (namespaced — see Track-name collisions).
   **Must match the store's step count 1-to-1.**
4. ⚠ **`src/components/visualizers/LogicSection.jsx`** — three edits: import and
   spread the logic object into `SPECIFIC_PROBLEM_LOGIC`, add the topic to the
   `activeTrack` chain, **and add a diagram branch**. The diagram is a ternary
   keyed on step properties (`st.grid`, `st.nodes`, …); a step matching none of
   them renders an empty canvas rather than erroring.
5. ⚠ **`src/components/visualizers/DSAVisualizerPage.jsx`** — two edits:
   `VISUALIZER_MAP`, **and** the long `topicId === '...'` condition at
   ~line 242. Miss the second and the page renders "Visualizer Coming Soon"
   even though the component exists.
6. **`src/data/visualizers/dsaTopics.js`** — `DSA_TOPICS` entry:
   `title`, `icon`, `description`, `overview { what, why, examples, advantages,
   disadvantages }`, `complexity`, `code` (js/ts/python/java/cpp),
   `interviewQuestions`.
7. ⚠ **`src/components/visualizers/VisualizerSidebar.jsx`** — the worst offender.
   A `TOPIC_TRACKS` entry, the store's selector/setter, and the topic listed in
   **five separate chains**:

   | chain | symptom if missed |
   |---|---|
   | `?track=` read effect | deep links ignore the track |
   | `?track=` write effect | URL never reflects the current track |
   | `isSelected` | every track renders as active (chain ends `: true`) |
   | `handleClick` | clicking a track does nothing |
   | button/link switch | items render as `<a>` to the topic root **without `?track=`**, so every track opens the default |
8. **`src/pages/visualizer/<topic>.astro`** — copy `sorting.astro`; update
   `topicId`, title, description, keywords, `PAGE_URL` (**keep the trailing
   slash**), schema, breadcrumbs.
9. **`src/components/DSAVisualizerHub.jsx`** — hub card.
10. **`src/pages/visualizer.astro`** — hub listing.
11. **`src/data/visualizers/visualizerContent.js`** — `heading`, `intro`,
    `complexityHead`/`complexity`, `howTo`, `faqs`, `related`. Renders as the
    on-page article and generates the FAQPage JSON-LD, so schema and visible
    copy stay in sync.
12. **`src/components/visualizers/RecorderBridge.jsx`** — add to `STORES`, else
    reel recording fails with `no store registered for topic "..."`.

Optionally add entries to `scripts/reels.config.mjs` to generate social videos.

### Track-name collisions — solved, keep it that way

Historically `SPECIFIC_PROBLEM_LOGIC` merged every topic's logic into one flat
map **and** `LogicSection` rewrote raw track names (`insert` → `insertion`,
`search` → `linear-search`). A track named `search` therefore resolved to
`searchingLogic`'s entry and rendered the wrong diagram. Three real bugs came
from this: `arrays:search`, `recursion:subsets`, `sliding-window:intro`.

**All 81 logic keys are now namespaced `<topic>-<track>`** and the alias table is
retired. Resolution is one join:

```js
const trackPrefix = topicId === 'hash-tables' ? 'hash-table' : topicId;
const topicKey = topicId === 'heaps' ? 'heap' : topicId;
const resolvedTrackKey = activeTrack ? `${trackPrefix}-${activeTrack}` : topicKey;
```

**So: name every new logic key `<topic>-<track>`.** An un-namespaced key is
unreachable now, and re-introducing a bare one risks colliding again. A miss
falls back to the topic's own overview entry, never another topic's.

### Verifying without a full build

A production build takes 10–40 minutes. Check statically instead:

```bash
# track slugs the store actually accepts
grep -A30 "setTrack:" src/store/visualizers/<topic>Store.js

# step counts must match between store and logicData
node --input-type=module -e "
import { use<T>Store } from './src/store/visualizers/<topic>Store.js';
console.log(use<T>Store.getState().steps.length);
"

# syntax check
node -e "require('esbuild').transformSync(require('fs').readFileSync('<file>','utf8'),{loader:'jsx'})"
```

Then `npm run dev` and load the route directly.

---

## Authoring standards

Carried over from `CLAUDE.md`, which remains correct on these:

**Step granularity.** 7–12+ steps per track. Every sequence includes problem
setup, base case / allocation, line-by-line transitions, verification /
traceback, and a completion step.

**1-to-1 sync.** Each step object in `logicData` must carry *all* visual state
properties the store's step carries (`dp1D`, `dp2D`, `activeCell`, `depCells`,
`buckets`, `hashIdx`, `probeIdx`, etc.), or `LogicSection` falls back to blank
boxes.

**Design.** No `framer-motion` layout-shifting keyframes — plain CSS transitions
so containers don't collapse. 1D arrays use `sketch-card` styling with `[0]`
index badges and un-boxed pointer badges below. Generous max widths
(`max-w-[760px]`) and `pb-8` so index labels and pointer arrows never clip.
Completion badge when `currentStep >= steps.length - 1`.

**Concept Code is read-only.** The editable "Practice" textarea was removed —
the code was never executed, checked or persisted, and it hid the
animation-synced line highlight while open.

---

## Roadmap: what to build next

Ranked by evidence — topics that already have problems in `src/data/dsa-problems.js`
but no visualizer.

| Rank | Visualizer | Problems | Why |
|---|---|---|---|
| ~~1~~ | ~~**Trie**~~ | 5 | **Built** — generator-backed, 3 tracks, accepts custom words |
| 2 | **Strings** | 11 | Largest content gap. Palindrome, anagram, reverse-words animate as pointer moves — reuses two-pointers patterns |
| 3 | **Bit Manipulation** | 7 | Binary digits flipping is inherently visual, and nothing else on the site shows it |
| 4 | **Greedy** | 6 | Interval scheduling / activity selection: sort, then pick — a clean two-phase animation |
| 5 | **Topological Sort** | 2 | Fewest problems, but Kahn's in-degree queue draining is very watchable |

Beyond the current topic vocabulary, three worth adding for differentiation:

- **Union-Find (DSU)** — set merging with path compression. Very few good free
  visualizers exist; a genuine ranking opportunity.
- **Matrix / 2D grid** — spiral traversal, rotate image, flood fill. Highly
  visual, common interview fare.
- **LRU Cache** — hashmap and doubly-linked list moving in sync. Extremely
  common question, rarely visualized well.

**Trie is done.**

**See `VISUALIZER-ROADMAP.md`** for the full picture: the four missing sections,
a reviewed shortlist of ~30 new tracks for existing sections (measured against
the problems already written up in `dsa-problems.js`), and a 10-step build order.

Short version: build **graphs: Number of Islands** first — best visual payoff on
the site, high search demand, and it creates the grid renderer that Unique Paths,
Rotting Oranges and Word Search all reuse. Then the **Strings** section.

---

## Gotchas

- **Two silent-failure chains.** `VisualizerSidebar`'s `isSelected` ternary ends
  in `: true`, so a topic with no branch shows every track as active. And
  `LogicSection`'s diagram is a ternary keyed on step properties (`st.grid`,
  `st.nodes`, …) — a step carrying none of them renders an empty canvas rather
  than an error. Both bit the Trie build.
- **Parse checks are not enough.** `esbuild` accepts a reference to an
  identifier that no longer exists — undeclared identifiers only fail at
  runtime. After any rename, grep for the old name.
- **`stackLogic` has an authored `stack-min-stack` entry with no track.**
  Finished content nothing links to; wiring it up is a small job.

- **`DSA_PROBLEMS.topics` and `VISUALIZER_MAP` are separate vocabularies.**
  Adding a problem with topic `trie` does not surface it in any visualizer, and
  there is no auto-routing between them. That is expected.
- **The Playground and the Visualizer are not linked.**
- **No SSR-blocking placeholders.** Do not gate render behind a mount-only
  `loading` state — effects don't run on the server, so the page would ship a
  skeleton with no crawlable content. This was fixed across 18 components; don't
  reintroduce it.
- **`heap` vs `heaps` and `hash-table` vs `hash-tables`** both appear as
  `VISUALIZER_MAP` keys. `DSAVisualizerPage` normalises `heaps → heap` when
  looking up `DSA_TOPICS`.
