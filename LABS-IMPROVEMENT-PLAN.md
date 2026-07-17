# Labs Playground — Assessment & Improvement Plan

> Goal: make this the world's #1 labs playground platform.
> Audit date: 2026-07-16 · Branch: `FaceChange_2_16July`
> Companion docs: `DSA-LAB-UPGRADE-NOTES.md` (prior upgrade playbook), `CHANGELOG-FEATURES.md`

**TLDR:** The foundation is unusually strong — 10 labs, real WASM runtimes, a polished shared component kit — but it's held back by fake grading in 6 of 10 labs, two coexisting architectures, broken hub links, and progress that dies with the browser. Fix those four things first; the "world #1" differentiators come after.

---

## 1. Current Architecture

The labs feature is a collection of **10 self-contained practice-lab SPAs**, each a React island mounted in a thin Astro page shell under `dsa-docs/`.

- **Hub:** `/labs` → `src/pages/labs.astro` → `LabHub.jsx` — searchable/filterable catalog with visit tracking, track filters, "jump back in" resume card, `/`-to-search shortcut.
- **Two structural generations coexist:**
  - **Modular (new):** JS, CSS, HTML, React — `components/labs/<lang>/` with `Platform.jsx` + `config.js` + `runner/` (runner + validator) + `components/` (views), data split into `data/labs/<lang>/{lessons,challenges,projects,bugs,validators}.js`. Old curriculum files are re-export shims.
  - **Monolithic (legacy):** Git, Mongo, SQL, Python, Tailwind — one giant `*LabsPlatform.jsx` + one giant `*-curriculum.js` with data and engine logic inline.
- **Shared kit:** `components/labs/shared/` — topbar, sidebar, command palette, tests panel, console panel, resizable handles, XP/streak system, confetti, tour, markdown renderer, and hooks (`useProgress`, `useLabXP`, `usePanelResize`, `useKeyboardShortcut`, `workerSandbox`).

### Per-lab summary

| Lab | Platform (lines) | Editor | Execution | Grading | Content |
|---|---|---|---|---|---|
| JavaScript | `javascript/JSLabsPlatform.jsx` (1,146) | Monaco | **Real** — Web Worker sandbox, 2.5s TLE timeout, console forwarding | Regex/substring on source ⚠️ | 20 lessons, 16 bugs, 8 projects |
| React | `react/ReactLabsPlatform.jsx` (968) | Monaco | **Real** — Babel-standalone JSX → iframe with React UMD from unpkg | Regex/substring on source ⚠️ | 16 lessons, 16 bugs, ~30 projects |
| CSS | `css/CSSLabsPlatform.jsx` (1,243) | Monaco | iframe live preview | Regex/substring on source ⚠️ | 20 lessons, 10 challenges, 10 components, 6 animations |
| HTML | `html/HTMLLabsPlatform.jsx` (1,163) | Monaco | iframe live preview | Regex/substring on source ⚠️ | 16 lessons, 10 challenges, 6 projects |
| Python | `PythonLabsPlatform.jsx` (1,015) | Monaco | **Real Pyodide** (WASM CPython, CDN) with real stdout/stderr | Regex/substring on source ⚠️ | 24 lessons, 10 challenges, 8 projects, 10 debug |
| SQL | `SQLLabsPlatform.jsx` (1,316) | Monaco | **Real sql.js** (WASM SQLite), fresh in-memory DB per dataset | ✅ Real result-diffing vs solution query | 12 lessons, 10 challenges, 3 projects |
| MongoDB | `MongoLabsPlatform.jsx` (1,853) | Monaco | Simulated — custom ~580-line JS query/aggregation engine (`$match/$group/$lookup/$facet/…`) | ✅ Real result-diffing vs solution | 16 lessons, 8 challenges, 6 projects, 10 agg labs |
| Git | `GitLabsPlatform.jsx` (2,514) | terminal (textarea) | Simulated — full git state machine (commit/branch/merge/rebase/cherry-pick/stash/…) + CLI parser + commit graph | Command-outcome based | 30 lessons, boss battles, merge arena, team scenarios |
| Tailwind | `TailwindLabsPlatform.jsx` (634) | Monaco | iframe preview with Tailwind CDN; device preview modes | Regex/substring on source ⚠️ | 20 chapters (~23 lessons) |
| DSA (reference impl) | `components/dsa/DSAProblemView.jsx` | Monaco | **Real worker judge** (`js-judge.worker.js`) | ✅ Real verdicts: Accepted / WA / RE / TLE | ~20+ problems |

### What already works well

- Real execution where it counts: JS (sandboxed worker), Python (Pyodide), SQL (sql.js), React (Babel + iframe).
- Impressive hand-built engines: Git state-machine simulator and the MongoDB aggregation engine.
- Polished shared kit: XP/streaks, command palette, guided tour, confetti, keyboard shortcuts, resizable panes, themes.
- The DSA lab is the reference implementation — real judging with verdicts, draft autosave, submission history, per-problem notes, fullscreen, font controls, similar problems, random picker.

---

## 2. Fix First — These Undermine Trust

### 2.1 Fake grading in 6 of 10 labs (highest priority)

JS, React, CSS, HTML, Python, and Tailwind validate via regex/`.includes()` on the **source code string** — a comment containing the right keyword passes. `DSA-LAB-UPGRADE-NOTES.md` already flags this and the DSA lab already fixed it.

- **JS/React/Python:** run the code and assert on real output/return values (worker judge pattern from DSA lab; Pyodide already provides real stdout for Python).
- **CSS/HTML/Tailwind:** grade against the rendered iframe's **computed styles and DOM** (getComputedStyle, element queries), like CSSBattle/freeCodeCamp — not the source text.
- Only SQL and MongoDB currently do genuine result comparison.

### 2.2 Hub links point at the wrong pages

In `LabHub.jsx`: CSS, HTML, Git, and Python cards link to marketing splash pages (`/labs/css`, `/labs/html`, `/labs/git`, `/labs/python`) instead of the actual platforms (`*-lab` routes). Also:

- `/labs/mongodb` and `/labs/mongodb-lab` are duplicate routes to the same component.
- SQL lives only at the unguessable `/labs/mysql` (no `/labs/sql` or `/labs/sql-lab`).

### 2.3 Case-duplicate directories will break Linux/CI builds

Both `components/labs/JavaScript/` and `components/labs/javascript/` exist with byte-identical files (same for `data/labs/JavaScript` vs `data/labs/javascript`). `js-lab.astro` imports the capital-J path while barrels/conventions use lowercase. This is a case-insensitive-filesystem git artifact. **Pick lowercase, delete the duplicate.** Also delete the orphan 0-byte `src/data/labs/css/_orig_curriculum.js` (repo root, outside dsa-docs).

### 2.4 Progress is localStorage-only, keys are ad-hoc

Each platform hardcodes its own key (`jsl-progress`, `sql-progress`, `mongo-progress`, `git-progress` + `git-achievements`, `pyl-progress`, `tw-progress`, …) instead of using the shared `useProgress` hook. Meanwhile **Supabase auth + `syncManager` already exist** and sync judge/plans/MCQ/SRS stores — labs are simply not registered. Clear the browser → lose everything.

→ Register lab progress (and `lab-xp-v1`) as a synced store in `src/lib/sync/syncManager.js`. This unlocks accounts, cross-device progress, and streaks that mean something.

---

## 3. Consistency Debt — One Platform, Not Ten Apps

| Issue | Detail |
|---|---|
| Two architectures | 5 labs still monolithic: Git (2,514 lines), Mongo (1,853), SQL (1,316), Python, Tailwind; curriculum files up to 4,444 lines (`python-labs-curriculum.js`), with the Mongo engine embedded inside a data file. Finish the modular migration. |
| Command palette | Wired in only 5/10 labs (SQL, Tailwind, CSS, HTML, JS). Missing: Python, React, Mongo, Git. |
| XP/streak system | Wired in only 3/10 (JS, SQL, Mongo) despite being a polished shared system. |
| Draft autosave | JS lab only. Everyone else loses edits on reload. |
| Fullscreen editor | Nowhere in labs (DSA lab only). |
| Font-size controls | Nowhere in labs (DSA lab only). |
| Mobile/responsive | Only LabHub, CSS, HTML, Tailwind have real `@media` handling; code-heavy labs are desktop-only. |
| Reduced-motion | Only LabHub + palette respect it. |
| Hub stats are fiction | `LabHub.jsx` hand-types counts ("150 challenges" vs actual ~44 for JS; React "80", Mongo "30"). Derive counts from the curriculum data so they're always true. |
| Copy-pasted validators | `jsValidator`/`cssValidator`/`reactValidator` near-identical; SQL and Mongo test builders structurally identical. Extract a shared judge module. |
| Zero developer tests | Vitest is installed but no tests exist for labs. Runners, validators, the git state machine, and the Mongo engine are pure functions — ideal unit-test targets. |
| CDN runtime deps | React (unpkg UMD, no SRI), Pyodide (jsdelivr, has SRI), Tailwind (CDN) require network at runtime; offline breaks. |

**Recommendation:** define a per-lab feature checklist (XP · palette · autosave · fullscreen · font size · tour · mobile · real grading · synced progress) and bring every lab up to it.

---

## 4. "World #1" Roadmap (after the above)

Ordered by leverage:

1. **Shareable playgrounds** — encode code in the URL (compressed hash) or a Supabase row so any snippet gets a permalink + embeddable iframe. This is CodePen/StackBlitz's entire growth engine; the app currently has none of it (no `navigator.share`, only copy-code).
2. **Real multi-file React environment** — adopt **Sandpack** (CodeSandbox's open-source embed) for multi-file projects, npm imports, hot reload. Also removes the unpkg-at-runtime dependency. The current single-file Babel setup can't teach real React.
3. **AI tutor in the editor** — "explain my error", "nudge, not answer", review-my-code-vs-solution, contextual help on the actual failing test. Static hints/solutions exist; contextual AI help is what free incumbents lack.
4. **Deeper gamification** — daily challenges, per-lab skill certificates, leaderboards (trivial once progress syncs through Supabase), public profile pages with solved history.
5. **Curriculum depth + interlinking** — 8–30 exercises per track is a demo, not a curriculum; leaders have hundreds. Cross-link labs ↔ existing docs/interview-prep content both ways ("learn concept → try it in the lab").
6. **Mobile + offline PWA** — vendor the CDN runtimes, add a service worker. Offline-capable labs are a real differentiator for learners on poor connections.
7. **More runtimes on the same chassis** — once grading is worker-based and modular: TypeScript, Node/Express (WebContainers), Bash, Redis-style labs become incremental.

---

## 5. Suggested Execution Order

| # | Task | Effort | Impact |
|---|---|---|---|
| 1 | Delete case-duplicate `JavaScript/` dirs + orphan files; fix `js-lab.astro` import | XS | Prevents CI/deploy breakage |
| 2 | Fix `LabHub` links → `*-lab` platform routes; dedupe mongodb routes; add `/labs/sql` | XS | Users reach the actual tools |
| 3 | Derive hub stats from curriculum data | S | Honest marketing |
| 4 | Real output-based grading — start with **Python** (Pyodide already gives real execution), template it, roll out to JS → React → CSS/HTML (computed-style checks) → Tailwind | M–L | Credibility; biggest product gap |
| 5 | Register lab progress + XP in `syncManager` (Supabase) | M | Accounts, cross-device, retention |
| 6 | Per-lab feature-parity checklist (palette, XP, autosave, fullscreen, font size, mobile) | M | Feels like one product |
| 7 | Refactor remaining 5 monoliths into the modular pattern; extract shared judge | L | Velocity for everything after |
| 8 | Unit tests (Vitest) for runners/validators/git machine/Mongo engine | M | Safety net for the refactor |
| 9 | Shareable permalinks | M | Growth loop |
| 10 | Sandpack for React; vendor CDN runtimes; PWA | L | Best-in-class runtime experience |
| 11 | AI tutor, gamification depth, curriculum expansion | L+ | Differentiation |
