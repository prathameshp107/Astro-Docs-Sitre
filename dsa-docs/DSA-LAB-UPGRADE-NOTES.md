# DSA Lab Upgrade — Session Notes

What got built/changed in `/dsa/problems` this session, kept as a playbook to repeat on other labs (`js-lab`, etc).

---

## 1. Problems added (content work)

Filled gaps between `/dsa/problems` (`src/data/dsa-problems.js`) and `/problems` (`src/data/judge/problems/*.json`) — two separate problem banks that don't auto-sync. For every topic below, checked both banks, added whichever was missing, verified logic with throwaway Node scripts before writing test expectations.

| Topic | Problems added this session |
|---|---|
| Arrays & Hashing | Valid Anagram, Group Anagrams, Product of Array Except Self, Top K Frequent Elements, Longest Consecutive Sequence |
| Two Pointers | Two Sum II, Container With Most Water, Trapping Rain Water |
| Sliding Window | Best Time to Buy/Sell Stock, Longest Repeating Char Replacement, Permutation in String, Minimum Window Substring, Sliding Window Maximum |
| Stack | Evaluate RPN, Generate Parentheses, Car Fleet, Largest Rectangle in Histogram |
| Binary Search | Search a 2D Matrix, Koko Eating Bananas, Find Min in Rotated Sorted Array, Time Based KV Store, Median of Two Sorted Arrays (judge JSON side only — dsa-problems.js side was already there) |
| Linked List | Linked List Cycle, Reorder List, Remove Nth From End, Copy List w/ Random Pointer, Add Two Numbers, Merge k Sorted Lists, Reverse Nodes in k-Group |
| Trees | Diameter, Balanced Tree, Same Tree, Subtree of Another Tree, LCA of BST, Level Order Traversal, Right Side View, Count Good Nodes, Validate BST, Kth Smallest in BST, Construct from Preorder/Inorder, Max Path Sum, Serialize/Deserialize |

**Pattern per problem:** write judge JSON (`src/data/judge/problems/<id>.json`) with statement/examples/tests/editorial, AND a matching entry in `DSA_PROBLEMS` array (`dsa-problems.js`) with conceptOverview/patternRecognition/hints/bruteForce+optimized solutions/tests. Verify every test expectation against a hand-run reference implementation in Node before committing it — caught several wrong expected-values this way (e.g. Car Fleet math).

**Linked-list & Tree convention:** the judge only passes plain arrays (no real `ListNode`/`TreeNode` marshalling exists in the executor). So starter code embeds a small `TreeNode`/`ListNode` class + `buildTree`/`buildList`/`toArray`/`treeToArray`/`toPairs` helper, builds the real node structure inside the function, and returns an array. Real pointer-based algorithm practice, array-only judge I/O boundary.

---

## 2. Editor Premium Pack

File: `src/components/dsa/DSAProblemView.jsx`, `src/styles/dsa-lab.css`

- Drag-resizable statement/editor split (persisted %, `dsa-editor-settings-v1`)
- Fullscreen editor toggle (Esc to exit, palette command)
- Font size +/- controls (persisted)
- **Ctrl+Enter = Run, Ctrl+Shift+Enter = Submit** — previously advertised in the toolbar but not actually wired to Monaco
- Boilerplate (TreeNode/buildTree helpers) auto-hidden from the editor view with a "N helper lines hidden ▼ view" banner to expand if curious — fixed a bug where the split logic hid the actual editable functions for some problems (e.g. serialize/deserialize) instead of just the harness code

## 3. Real judging (replaced fake validation)

Previously: Run/Submit just ran `test.validate(code)` string-based closures with zero real execution feedback loop, and any `console.log` the user added was silently swallowed.

Now:
- **Run** executes the visible `sampleTests` for real in a sandboxed Web Worker (`src/workers/js-judge.worker.js`, same worker the separate `/problems` Judge already used) → live pass/fail + runtime per test
- **Submit** does the same, then runs the full legacy `tests[]` suite (source of truth for solved/XP) → proper verdicts: **Accepted / Wrong Answer / Runtime Error / Time Limit Exceeded**, with a colored verdict banner and a failed-case diff (Input / Expected / Got)
- Draft autosave per problem (`dsa-drafts-v1`, 400ms debounce), restored on reload
- Problems with no `sampleTests` (older class-based ones: MinStack, LRUCache, TimeMap, MyQueue; a few legacy ones with bugs) fall back to raw console execution rather than a false verdict

### Console Output vs Test Results — fixed the confusion
- **Console Output** = the user's own `console.log`/`warn`/`error`, streamed live as their code runs. Fixed the worker (`js-judge.worker.js`) to actually forward these back (it silently dropped them before).
- **Test Results** = pass/fail checklist per test.
- Removed duplicate "X/Y passed... see Test Results below" summary lines that were cluttering Console Output — banner + Test Results panel already say that, console should only show genuinely new info (the user's prints, real errors, the accepted celebration).
- Pretty-print objects in console (`JSON.stringify(x, null, 2)`) instead of one unreadable single-line dump.

## 4. Premium Extras

- Per-problem **Notes** (autosaved textarea, `dsa-notes-v1`)
- **Similar Problems** section (topic-overlap based, top 4, linked)
- **Submission history** in DSA lab (last 20: verdict/time/runtime + Restore code button, `dsa-submissions-v1`)
- **Random problem** picker in the command palette
- Problem list: solved count + per-topic progress bars now real (were hardcoded to `0`); green solved dot on rows
- Judge (`/problems`, separate system): confetti on Accepted (previously only the DSA lab celebrated), and `relatedProblems` field (existed in JSON, was never rendered) now shows as a linked list in `ProblemStatement.jsx`

## 5. Bugs found & fixed along the way

- `reverse-linked-list` (#5, pre-existing) — tests referenced a `ListNode` constructor that was never defined anywhere; unsolvable as shipped. Injected the constructor into the test harness.
- Several `sampleTests` entries were stale/wrong shape for class-based problems (MinStack, Queue, LRUCache, TimeMap, GroupAnagrams-with-unordered-compare) — emptied them so Run correctly falls back to console instead of always failing.
- `top-k-frequent-elements` needed `compareMode: "unordered"` set on the DSA-lab side too (judge JSON already had it).

---

## Audit — other labs vs this baseline

Shared infra already in `src/components/labs/shared/`: resizable panes, Ctrl+Enter hook, worker sandbox (console forwarding works fine there — the eaten-console bug was DSA-lab-specific), XP/celebrate/palette, `useProgress`.

**Universal gap, fix once:** `useProgress.js` persists to **sessionStorage** not localStorage — progress wiped on tab close, across all 9 labs. Biggest single win, one file.

Also universal misses everywhere except DSA: no fullscreen editor, no font-size controls, no notes/drafts/submission-history, XP+celebrate+palette wired into only 2 of 9 labs (JS, SQL).

| Lab | Run = real exec? | Grading | Leverage |
|---|---|---|---|
| React Lab | ❌ fakes it (300ms spinner, no real console) | regex `.includes()` | **Highest** — biggest gap |
| JS Lab | ✅ real worker, console fine | regex `.includes()` | High — only grading needs swap |
| SQL / Mongo Lab | ✅ real SQLite / mongo-engine | **none** — just a "Mark Done" button | High — engine's there, add real result-diffing |
| Python Lab | ✅ best in app, real Pyodide stdout | regex `.includes()` | Medium — only grading needs swap |
| CSS / HTML / Tailwind | real iframe render, no console concept | regex `.includes()` | Medium-low — needs computed-style grading instead |
| Git Lab | own command-interpreter, not code-judge shaped | n/a — no fake validation to fix | Low — just needs universal extras |

**Order of attack:** (1) ~~sessionStorage→localStorage fix~~ **done**, (2) React Lab real execution, (3) JS Lab grading swap, (4) SQL/Mongo result-diffing, (5) Python grading swap, (6) CSS/HTML/Tailwind computed-style grading, (7) roll universal extras (notes/drafts/history/fullscreen/font-size/XP-wiring) everywhere.

### ✅ Step 1 done — sessionStorage → localStorage

Fixed the inline progress read/write in all 9 platform files (each hardcodes its own key, no shared hook was actually wired up): `css-progress` (CSSLabsPlatform), `git-progress` + `git-achievements` (GitLabsPlatform), `html-progress` (HTMLLabsPlatform), `jsl-progress` (JSLabsPlatform), `mongo-progress` (MongoLabsPlatform), `pyl-progress` (PythonLabsPlatform), `rl-progress` (ReactLabsPlatform), `sql-progress` (SQLLabsPlatform), `tw-progress` (TailwindLabsPlatform). Also fixed the shared-but-unused `useProgress.js` hook for future callers. Left `LabHub.jsx`'s `lh-typed` key alone — that's a one-time "seen the intro animation" flag, not user progress, sessionStorage is correct there. All 9 files verified to still parse after the edit.

---

## Playbook for repeating this on another lab (e.g. `js-lab`)

1. **Map the lab first** — find its data file(s), its view component, whether it already has any real-execution engine (a worker) vs string-match validation, what it persists to localStorage.
2. **Editor pack** — check: resizable panes? fullscreen? font size? Ctrl+Enter actually wired to the right handler (not just labeled)? boilerplate-hiding needed if there's shared helper code per problem?
3. **Real execution** — if the lab fakes validation via `.includes()`/regex on the code string, that's the highest-leverage fix. Reuse the worker-sandbox pattern here if the lab is JS: run real code, capture `console.*` output live (don't let it get eaten — that was the big bug this session), keep a separate Test Results checklist that never duplicates the console's summary text.
4. **Content parity** — if there's a second, richer or newer version of the same lab elsewhere in the app, check whether problems/exercises exist in one but not the other and cross-fill, verifying every expected value against a hand-run reference solution before trusting it.
5. **Extras** — notes-per-item, related/similar links, submission history, solved-count wiring on the list page, confetti/XP hookup — cheap, high perceived-value additions once the core loop is real.
6. Always verify: JSX/worker source parses (`esbuild.transformSync` / `new Function(source)`), and run the full test suite against every "optimized solution" reference programmatically before calling it done — don't trust visual review alone for anything touching `dsa-problems.js`-sized files.
