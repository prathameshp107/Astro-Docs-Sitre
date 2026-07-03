# Feature 01 — Real Online Judge for DSA Problems

| | |
|---|---|
| **Tier** | 1 — Core Loop |
| **Priority** | ⭐ Highest — build this first |
| **Depends on** | Nothing (foundation feature) |
| **Effort** | Large (3–4 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
Today the DSA Problem Lab lets users *browse* problems and *write* code, but nothing
**judges** them. There is no "Submit → Accepted / Wrong Answer / Time Limit Exceeded"
moment. That verdict moment is the single most important interaction on LeetCode — it is
the dopamine loop that brings 5M+ users back daily. Without it, we are a notes site with
an editor; with it, we are a practice platform.

### Competitive context
- **LeetCode:** server-side judge, 3000+ problems, the gold standard. Weakness: costs
  them enormous infra money; premium paywall.
- **NeetCode:** links out to LeetCode for judging — doesn't own the loop.
- **Our wedge:** a **100% in-browser judge** (JS natively, Python via Pyodide — both
  already in our stack). Zero server cost, instant verdicts, works offline. Nobody else
  offers a full judge that runs free forever.

### Why now
Every other Tier 1/2 feature (study plans, streaks, AI code review, mock interviews,
company tracks) needs a canonical "did the user solve this problem?" signal. The judge
produces that signal. It is the foundation everything else stands on.

---

## 2. What to Build

### User stories
1. As a user, I open a problem page, read the statement, examples, and constraints,
   write a solution in JS or Python, click **Run** to test against visible examples,
   and click **Submit** to run against **hidden test cases**.
2. As a user, I get a verdict within ~2 seconds: `Accepted`, `Wrong Answer` (with the
   first failing input/expected/actual shown), `Time Limit Exceeded`, or
   `Runtime Error` (with the stack trace).
3. As a user, I see my past submissions for each problem (verdict, runtime, timestamp,
   code) and can restore any of them into the editor.
4. As a user, after `Accepted` I see the editorial solution, complexity analysis, and
   related problems.
5. As a user, my solved/attempted status shows on the problem list (✅ solved,
   🟡 attempted, ⚪ untouched) with filters.

### Scope — v1
- **Languages:** JavaScript (Web Worker) and Python (Pyodide in a Web Worker).
- **Problem format:** JSON spec per problem (see §3.2) — statement, starter code per
  language, visible examples, hidden tests, time/memory limits, editorial.
- **Verdicts:** AC, WA, TLE, RE. Per-test-case status list (`✓ ✓ ✗ – –`).
- **Seed content:** convert 50 existing DSA Lab problems to the new format
  (Blind-75 overlap first — arrays, strings, hashmaps, two pointers, trees).
- **Persistence:** submissions + solved-status in localStorage (keyed store, ready for
  later sync by Feature 03).

### Explicitly out of scope for v1
- Server-side judging, C++/Java support (needs WASM toolchains — v2)
- Memory-limit enforcement (browser can't measure reliably — approximate in v2)
- Contests / timed judging (Tier 3 gamification builds on this later)

---

## 3. How to Build It (in this codebase)

### 3.1 Architecture

```
ProblemPage (Astro route: /problems/[slug])
 ├── ProblemStatement (React — renders MDX/JSON statement)
 ├── JudgeEditor (React — Monaco, language switcher, Run/Submit)
 ├── ResultsPanel (React — verdicts, test case detail, console output)
 └── SubmissionHistory (React — past attempts from store)

Judging pipeline (all client-side):
 user code ──► sandbox Web Worker ──► harness wraps user fn ──► runs each test
                    │                        │
                    │ postMessage timeout    │ deep-equal compare (order-insensitive
                    ▼ = TLE (kill worker)    ▼  option for set-type answers)
              verdict per test ──────► aggregate verdict ──► ResultsPanel + store
```

- **JS execution:** dedicated Web Worker, `new Function` inside worker, hard-terminate
  via `worker.terminate()` on timeout (default 4000 ms). No DOM/network access in worker.
- **Python execution:** persistent Pyodide worker (load once, reuse; ~6 MB — lazy-load
  only when user switches to Python). Use `pyodide.runPythonAsync` with an interrupt
  buffer for TLE.
- **Comparison:** JSON-serialize outputs; support `compareMode`: `exact`,
  `unordered` (sort arrays), `float` (epsilon), `anyValid` (validator function string).

### 3.2 Problem JSON schema (`src/data/judge/problems/*.json`)

```jsonc
{
  "id": "two-sum",
  "title": "Two Sum",
  "difficulty": "easy",            // easy | medium | hard
  "topics": ["arrays", "hashmap"],
  "companies": ["google", "amazon"],
  "statement": "…markdown…",
  "constraints": ["2 <= nums.length <= 10^4"],
  "examples": [{ "input": "[2,7,11,15], 9", "output": "[0,1]", "explanation": "…" }],
  "functionName": "twoSum",
  "starterCode": {
    "javascript": "function twoSum(nums, target) {\n  // your code\n}",
    "python": "def two_sum(nums, target):\n    pass"
  },
  "tests": [
    { "args": [[2,7,11,15], 9], "expected": [0,1], "hidden": false },
    { "args": [[3,3], 6],       "expected": [0,1], "hidden": true }
    // 10–20 hidden tests incl. edge cases & max-constraint stress test
  ],
  "compareMode": "exact",
  "timeLimitMs": 4000,
  "editorial": { "approach": "…markdown…", "complexity": "O(n) time / O(n) space" },
  "relatedProblems": ["three-sum", "two-sum-ii"]
}
```

> **Note on hidden tests:** in a client-side judge, tests ship to the browser — a
> determined user can find them. Accept this; obfuscation is not worth it (LeetCode's
> value isn't secret tests, it's the habit loop). Don't render them in the UI.

### 3.3 Files to create

```
src/data/judge/problems/*.json          ← problem bank
src/data/judge/index.json               ← manifest (id, title, difficulty, topics)
src/workers/js-judge.worker.js          ← JS sandbox + harness
src/workers/py-judge.worker.js          ← Pyodide harness
src/components/judge/JudgeEditor.jsx
src/components/judge/ProblemStatement.jsx
src/components/judge/ResultsPanel.jsx
src/components/judge/SubmissionHistory.jsx
src/components/judge/ProblemList.jsx    ← filterable list w/ solved status
src/store/judgeStore.js                 ← Zustand: submissions, solved map, editor drafts
src/pages/problems/index.astro          ← problem list page
src/pages/problems/[slug].astro         ← problem page (static paths from manifest)
```

### 3.4 Store shape (`judgeStore.js`, persisted to localStorage)

```js
{
  solved:    { "two-sum": "accepted" | "attempted" },
  drafts:    { "two-sum": { javascript: "…", python: "…" } },
  submissions: {
    "two-sum": [
      { ts, lang, code, verdict, runtimeMs, failedCase: {input, expected, actual} | null }
    ]
  }
}
```

### 3.5 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 (wk 1) | JS worker judge + harness + 5 problems + Run button end-to-end |
| 2 (wk 2) | Submit w/ hidden tests, verdicts UI, submission history, store persistence |
| 3 (wk 3) | Pyodide judge, language switcher, editorial reveal after AC |
| 4 (wk 4) | Problem list page w/ filters + solved badges; convert 50 problems; polish |

---

## 4. Expected Result

### User-visible outcome
A `/problems` section indistinguishable in core experience from LeetCode: browse →
solve → submit → verdict → editorial → next problem. Instant verdicts (faster than
LeetCode, since there's no queue), fully free, works offline.

### Success metrics
- **Activation:** ≥ 40% of problem-page visitors click Run; ≥ 20% Submit.
- **Loop:** median time-to-first-verdict < 2 s; ≥ 3 problems attempted per session.
- **Foundation:** solved-signal consumed by Study Plans (02), Streaks (10),
  Analytics (11), Company Tracks (09).

### Definition of done / acceptance criteria
- [ ] 50 problems live in the new format across ≥ 6 topics and 3 difficulties
- [ ] JS and Python both judge correctly; infinite loop yields TLE without freezing the tab
- [ ] WA shows first failing case (input / expected / actual); RE shows stack trace
- [ ] Submissions persist across reloads; drafts auto-save per problem per language
- [ ] Problem list filters by topic, difficulty, company, and solved-status
- [ ] Editorial hidden until first AC (or explicit "give up" click)
- [ ] Lighthouse perf ≥ 90 on problem pages; Pyodide loaded only on demand
- [ ] All state goes through `judgeStore` so Feature 03 can sync it later

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build Phase 1 of an in-browser online judge for my Astro + Starlight + React 19 site
(dsa-docs/). Read roadmap/tier-1-core-loop/01-online-judge.md first and follow its
schema and file layout exactly.

Deliver: (1) src/workers/js-judge.worker.js — a sandboxed Web Worker that receives
{code, functionName, tests, timeLimitMs}, wraps the user function in a harness, runs
each test with deep-equal comparison per compareMode, enforces TLE by worker
termination, and posts back per-test verdicts; (2) five problems in
src/data/judge/problems/ (two-sum, valid-anagram, best-time-to-buy-sell-stock,
contains-duplicate, valid-parentheses) with 10+ hidden tests each including edge and
stress cases; (3) React components JudgeEditor (Monaco, matching our existing
playground editor styling), ProblemStatement, ResultsPanel; (4) judgeStore.js Zustand
store with localStorage persistence; (5) /problems/[slug] Astro page wiring it
together with client:only React islands. Match the site's existing dark/light theme
tokens from src/styles/tokens.css. Then verify by running the dev server and solving
two-sum with a correct, a wrong, and an infinite-loop solution.
```
