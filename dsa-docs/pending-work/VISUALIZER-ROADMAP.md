# Visualizer Roadmap — New Sections & New Tracks

What to build next in `/visualizer/*`, chosen from problems **you have already
written up** rather than from a generic algorithm list. Every candidate below
already has a problem statement, examples, constraints and solutions in
`src/data/dsa-problems.js` — so the visualizer is the only missing piece.

Current state: **16 topics, 67 tracks.**

---

## How this was measured

Cross-referenced three sources:

1. `DSA_PROBLEMS` (`src/data/dsa-problems.js`) — 135 curated problems
2. The judge bank (`src/data/judge/problems/*.json`) — 126 problems, used as a
   second demand signal
3. `TOPIC_TRACKS` (`VisualizerSidebar.jsx`) — what the 67 existing tracks cover

**Caveat on the counts.** Problems are bucketed by their *first* topic tag, so a
problem can read as uncovered under one topic while a different topic's track
already visualizes it — "Two Sum" is tagged `arrays` but is covered by
`two-pointers:two-sum-ii`. Treat the per-topic totals as an **upper bound** and
the named picks below as the reviewed shortlist.

---

## Part 1 — New sections (topics with no visualizer)

Four topics have problems written up and no visualizer at all.

| Rank | Topic | Problems | Visual payoff | Notes |
|---|---|---|---|---|
| **1** | **Strings** | 11 | High | Largest gap. Palindrome checks, anagram grouping and reverse-words all animate as pointer walks — reuses patterns the two-pointers visualizer already proves |
| **2** | **Bit Manipulation** | 6 | High | Binary digits flipping is inherently visual and nothing else on the site shows it. Counting Bits, Single Number, Reverse Bits all animate cleanly |
| **3** | **Greedy** | 5 | Medium-High | Jump Game, Non-overlapping Intervals, Gas Station, Task Scheduler. Sort-then-pick is a clean two-phase animation |
| **4** | **Topological Sort** | 0 as primary | High | No problems tag it primary, but `graphs:course-schedule` needs it. Best delivered as a **graphs track**, not its own section — see Part 2 |

Three more worth adding beyond the current topic vocabulary:

| Topic | Why |
|---|---|
| **Union-Find (DSU)** | Set merging with path compression is very visual, and almost no good free visualizer exists — a genuine ranking opening |
| **Matrix / 2D grid** | Spiral traversal, rotate image, flood fill. Highly visual, common interview fare, and a grid renderer would be reused by Number of Islands and Unique Paths |
| **LRU Cache** | Hashmap + doubly-linked list moving in sync. Extremely common question, rarely visualized well. Could also be a `hash-table` track |

**Start with Strings.** Biggest content gap, and the pointer-walk animations
reuse machinery that already works.

---

## Part 2 — New tracks in existing sections

Reviewed shortlist, chosen for visual payoff and interview frequency. Ordered
within each topic by what I would build first.

### graphs — 4 tracks now, 11 candidates

The highest-value topic to extend; grid problems animate better than anything
else on the site.

| Track | Difficulty | Why |
|---|---|---|
| **Number of Islands** | Medium | Flood fill on a grid. Probably the single most visually satisfying algorithm in the whole set, and one of the most-asked questions anywhere |
| **Course Schedule** | Medium | Delivers topological sort without a new section. In-degree queue draining is very watchable |
| **Rotting Oranges** | Medium | Multi-source BFS — the frontier expanding from several points at once makes BFS *click* |
| Clone Graph | Medium | Teaches the visited-map pattern |

### trees — 4 tracks now, 14 candidates

| Track | Difficulty | Why |
|---|---|---|
| **Level Order Traversal** | Medium | BFS on a tree; completes the traversal set (in/pre/post already exist) |
| **Invert Binary Tree** | Easy | Famous, trivial to follow, and the mirror animation is genuinely satisfying |
| **Validate BST** | Medium | Teaches the classic bug — comparing only against immediate children. The range propagation is the lesson |
| Lowest Common Ancestor | Medium | Two paths converging is a clean visual |

### dp — 4 tracks now, 13 candidates

| Track | Difficulty | Why |
|---|---|---|
| **House Robber** | Medium | The best *first* DP: 1D table, two choices per cell, no 2D confusion |
| **Unique Paths** | Medium | Grid DP — each cell visibly the sum of two neighbours |
| **Longest Increasing Subsequence** | Medium | Shows the O(n²) table and motivates the binary-search variant |
| Word Break | Medium | String + DP, pairs well with a Strings visualizer |

### stack — 4 tracks now, 6 candidates

| Track | Difficulty | Why |
|---|---|---|
| **Daily Temperatures** | Medium | The monotonic stack pattern the existing on-page content already describes but never shows |
| **Min Stack** | Medium | Two stacks moving in sync |
| **Largest Rectangle in Histogram** | Hard | The most spectacular animation available — bars, expanding widths, stack popping. Hard to author, high payoff |

### linked-list — 4 tracks now, 8 candidates

| Track | Difficulty | Why |
|---|---|---|
| **Linked List Cycle** | Easy | Floyd's tortoise-and-hare. Iconic, and the two speeds are obvious on screen |
| **Merge Two Sorted Lists** | Easy | Two pointers weaving into one list |
| Remove Nth From End | Medium | The gap-pointer trick |

### searching — 2 tracks now, 6 candidates

Only 2 tracks — the thinnest coverage relative to demand (binary-search is 10 in
the judge bank).

| Track | Difficulty | Why |
|---|---|---|
| **Search in Rotated Sorted Array** | Medium | The canonical "binary search with a twist" |
| **Koko Eating Bananas** | Medium | Binary search *on the answer* — the generalisation most people never learn |
| Find Minimum in Rotated Array | Medium | Pairs with the above |

### heaps — 4 tracks now, 3 candidates

| Track | Difficulty | Why |
|---|---|---|
| **Find Median from Data Stream** | Hard | Two heaps balancing against each other — one of the most elegant visuals in DSA |
| **Kth Largest Element** | Medium | Shows why a k-sized heap beats sorting |

### backtracking — 3 tracks now, 5 candidates

| Track | Difficulty | Why |
|---|---|---|
| **Permutations** | Medium | The clearest decision tree of the set |
| **Word Search** | Medium | Grid + backtracking, and pairs naturally with the Trie visualizer |
| Combination Sum | Medium | Shows pruning on a numeric target |

### hash-table — 4 tracks now, 1 candidate

| Track | Difficulty | Why |
|---|---|---|
| **LRU Cache** | Medium | Hashmap and doubly-linked list updating together. Very common, rarely shown well |

### arrays — 6 tracks now

Reads as 21 uncovered, but most are covered under `two-pointers`,
`sliding-window` or `hash-table`. Genuinely missing:

| Track | Difficulty | Why |
|---|---|---|
| **Product of Array Except Self** | Medium | Prefix and suffix passes are very visual, and the no-division trick is the lesson |
| **Maximum Subarray (Kadane's)** | Medium | Running sum resetting at each negative is a clean animation |

### Nearly complete

`two-pointers` (8 tracks, 2 left) · `sliding-window` (5, 1) · `sorting` (5, 1)
· `queue` (3, 1) · `trie` (3, 1). Low priority — extend these last.

---

## Recommended build order

Balances visual payoff, interview frequency, and reuse of work already done.

| # | Build | Type | Why here |
|---|---|---|---|
| 1 | **graphs: Number of Islands** | Track | Best visual payoff on the site, huge search demand, and builds the grid renderer that 3 later items reuse |
| 2 | **Strings** section | Section | Largest content gap (11 problems), reuses two-pointers patterns |
| 3 | **trees: Level Order + Invert** | Tracks | Two easy wins in one topic; completes the traversal set |
| 4 | **graphs: Course Schedule** | Track | Delivers topological sort without a new section |
| 5 | **dp: House Robber + Unique Paths** | Tracks | The missing gentle entry point to DP; Unique Paths reuses the grid renderer |
| 6 | **Bit Manipulation** section | Section | Nothing else on the site shows binary, and it animates well |
| 7 | **stack: Daily Temperatures** | Track | Shows the monotonic stack the page already talks about |
| 8 | **heaps: Find Median from Data Stream** | Track | Most elegant visual remaining |
| 9 | **hash-table: LRU Cache** | Track | High demand, distinctive |
| 10 | **Greedy** section | Section | Solid but lower payoff than the above |

**Build the grid renderer once** (item 1) and Unique Paths, Rotting Oranges and
Word Search all become much cheaper. That is the main reason Number of Islands
leads.

---

## Before building any of these

Two things in `VISUALIZER-AUDIT.md` should land first:

1. **Fix the mobile sidebar.** New visualizers reaching a broken mobile layout
   is wasted work.
2. **Namespace the `logicData` keys.** Strings, Greedy and Bit Manipulation will
   want generic track names like `reverse`, `search` and `insert` — exactly the
   ones that already collide across topics. Fix the mechanism before adding four
   more topics through it.

## How to build them

Use the **generator-first** approach from `trieStore.js`, not hand-authored step
arrays — see `VISUALIZERS.md` → "Or generate the steps instead". Roughly half the
authoring effort, correct by construction, and it supports custom input, which
none of the 15 original visualizers do.

Adding a track touches 5 files; adding a section touches 12. Both checklists are
in `VISUALIZERS.md`.
