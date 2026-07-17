# UX / CX Audit — DSA & Dev Notes Learning Platform

> Scope: the live application under `dsa-docs/` (routes, navigation, landing experience, Labs, MCQ Hub, DSA Problems, Visualizers, Study Plans, Review/SRS, Company tracks, Profile).
> Method: route-by-route inspection of `src/pages/`, `AppNav.jsx`, and hub components, cross-referenced against the `graphify-out` knowledge graph (community/hub structure, 916 nodes / 1569 edges, built at commit `b8ca5da9`) for architectural grounding. `graphify-out` was used only as a map of what exists — it is not the subject of this audit.
> Audit date: 2026-07-17 · Branch: `FaceChange_2_16July`
> Companion doc: `LABS-IMPROVEMENT-PLAN.md` (Labs-specific engineering plan — this audit covers the whole platform's IA/UX and treats Labs at a summary level, deferring lab-internal detail to that doc).

**TLDR:** The platform has an unusually large amount of genuinely good content and tooling — real judges, real WASM runtimes, spaced repetition, company tracks, study plans, visualizers — but it is organized as roughly **12 semi-independent products** stitched together by one nav bar, with **3 different "landing page" experiences**, **2 competing DSA-problem systems**, and **progress state split across 15+ uncoordinated localStorage keys**. A first-time visitor cannot tell what the primary path through the product is. Fixing the information architecture (not adding features) is the highest-leverage next step.

---

## 1. What Exists Today (Feature Map)

| Area | Route(s) | Component | Notes |
|---|---|---|---|
| Marketing landing | `/` | `ReactLanding.jsx` (1,323 lines, dark theme) | Hero, "why", stats, tracks, visualizers, labs, problems, MCQ, prep, features, roadmap, CTA — **13 sections** |
| Docs hub | `/overview` (linked as "Docs" in nav) | Starlight `overview.mdx` | A **second** hero + stats + topic-pill landing, different visual system (light Starlight theme vs. dark landing) |
| Docs content | `/javascript`, `/react`, `/angular`, `/dsa/...` etc. (Starlight collections) | Starlight sidebars (`sidebar-*.js`, 13+ files) | 524+ documents across 13 topics |
| DSA Problems (judge) | `/problems`, `/problems/[slug]` | `ProblemList.jsx` + `judge/` | "Online Judge" — real in-browser verdicts (Accepted/WA/RE/TLE) |
| DSA Problems (lab) | `/dsa/problems`, `/dsa/problems/[id]` | `DSAProblemList.jsx` / `DSAProblemView.jsx` | Separate catalog, separate data source, separate UI — **duplicate of the above** |
| Labs hub | `/labs` | `LabHub.jsx` | Catalog of 10 language/tool playgrounds, "jump back in" resume card |
| Labs (10 platforms) | `/labs/*`, `/labs/*-lab` | `*LabsPlatform.jsx` | JS, React, CSS, HTML, Python, SQL, MongoDB, Git, Tailwind (see companion doc for detail) |
| Legacy practice routes | `/practice`, `/practice/js-lab`, `/practice/mongodb-lab`, `/practice/python-lab`, `/practice/react-lab` | redirects / old shells | `/practice` 301-redirects to `/labs`; the `/practice/*-lab` subroutes still exist as separate files |
| MCQ Hub | `/mcq`, `/mcq/[category]`, `/mcq/quiz/[category]`, `/mcq/dashboard` | `MCQHub.jsx` | Quizzes, achievements, dashboard |
| Visualizers | `/visualizer` (hub) + 10 topic pages (`/visualizer/arrays`, `/sorting`, `/trees`, …) | `DSAVisualizerHub.jsx` + per-topic visualizer components | Array, Sorting, Searching, Trees, Graphs, Stack, Queue, Heap, Recursion, DP |
| Interview Questions | `/interview-questions`, `/interview/[slug]` | `interview-questions-data.js` | Language-wise Qs |
| Behavioral | `/behavioral` | — | Separate from the above, one level up in nav dropdown |
| System Design | `/system-design`, `/system-design/url-shortener` | — | Only 1 worked example currently |
| Companies | `/companies`, `/companies/[slug]` | `CompanyDirectory.jsx` | Per-company interview tracks |
| Study Plans | `/plans`, `/plans/[slug]` | `PlanGallery.jsx` | Day-by-day guided plans |
| Review (SRS) | `/review`, `/review/decks` | `ReviewSession.jsx` | Spaced-repetition flashcards, badge count in nav |
| OOP Cheatsheet | `/oops/cheatsheet` | `OOPCheatSheet.jsx` | Freestanding, not in main nav |
| Profile | `/u`, `/u/[username]` | `UserProfilePage.jsx` | **Not in main nav** — reachable only via avatar dropdown |
| Auth | `/auth/callback` | Supabase | Magic-link + Google, syncs judge/plans/MCQ/SRS (not Labs — see below) |
| Playground | `/playground` | — | Linked from docs hero ("Try Playground"), unclear relation to `/labs` |

---

## 2. Answering the Audit Questions

**1. Can a new user immediately understand what this platform does?**
No. There are **three different first-impression pages** doing the same job differently: `/` (dark marketing landing, 13 scroll sections), `/overview` (light Starlight docs landing with its own hero/stats), and `/labs` (a hub with its own framing). A new user who clicks "Docs" from the root nav lands on a page that *re-explains the whole platform* in a different visual language than the page they just left. There is no single, obvious "start here."

**2. Can users easily find what they want to learn?**
Partially. Docs are well organized *inside* Starlight (13 sidebar files, clear topic separation). The problem is upstream: deciding *which of the 12 top-level systems* to enter is not guided — the nav presents 9 co-equal items with no visual hierarchy signaling what's foundational vs. supplementary.

**3. Can users easily move between Documentation, Labs, MCQs, DSA Problems, Visualizers, Roadmaps, and Interview Prep?**
Structurally yes (all reachable from one persistent `AppNav`), but the *DSA Problems* link inside the Labs dropdown ("DSA Problem Lab" → `/dsa/problems`) sits next to language labs even though solving problems isn't a "language playground" — and it silently competes with the separate `/problems` online judge, which isn't in the nav at all. A user following "Labs → DSA Problem Lab" never discovers `/problems` exists, and vice versa.

**4. Is there a clear difference between Learn, Practice, Solve, Visualize, and Test?**
No consistent verb model. Compare the actual nav labels: "Docs" (learn), "Visualizer" (visualize), "Language Playgrounds" (practice), "MCQ Hub" (test), "Interview Q" (learn+test mixed), "Sys Design" (learn), "Companies" (learn+plan), "Study Plans" (organize), "Review" (test/reinforce). Five distinct *modes of engagement* (Learn / Practice / Solve / Visualize / Test) are scattered across nine nav items with no shared naming convention or visual grouping — e.g. nothing tells a user that Labs, DSA Problems (×2!), and MCQ Hub are all "practice/test" while Docs, Sys Design, and Companies are "learn."

**5. Does the landing page properly showcase everything available?**
`ReactLanding.jsx` does try — it has dedicated sections for tracks, visualizers, labs, problems, MCQ, prep, and a feature grid (13 sections, 1,323 lines). The issue isn't omission, it's **redundancy and length**: a new visitor must scroll through 13 sections before reaching the "start" CTA area, and several of those sections restate what `/overview` (the *docs'* landing) already restates. Showcasing is thorough to the point of diluting the primary action.

**6. Are too many features competing for the user's attention?**
Yes. 12 largely independent systems, 3 landing experiences, 2 duplicate problem catalogs, gamification (XP/streak/confetti) present in only 3 of 10 labs, and a command palette in only 5 of 10 — inconsistent feature presence itself becomes a distraction, since power users learn "some labs have shortcuts, some don't" rather than trusting the platform uniformly.

**7. Is navigation simple and predictable?**
The nav bar mechanics (sticky header, mobile hamburger, dropdown menus) are well built (`AppNav.jsx`) — keyboard-accessible, `aria-expanded`, closes on outside click/route change. The *content* of the nav is what's unpredictable: two items (`Labs`, `Interview Q`) are dropdowns, seven are flat links, and one major feature (Profile) isn't in the nav at all — it's tucked behind the avatar menu with no top-level affordance. A returning user has to remember that "my profile" lives under the tiny avatar icon, not the main bar.

**8. Can users easily continue where they left off?**
Inconsistently. Labs hub has a "jump back in" resume card built on visit-count/localStorage (`LabHub.jsx`). The Review page shows a due-count badge in the nav. But there is **no single "continue" surface** — a user with in-progress Docs reading, an in-progress DSA problem, a half-done MCQ set, and an active study plan gets four different, disconnected "resume" affordances (or none, for Docs). The Profile page is the natural place to unify this, but it isn't linked from the nav, so most users won't find it.

**9. Are Labs easy to discover and use?**
Discovery: yes, via the nav dropdown and the `/labs` hub. Use: undermined by the issues in the companion `LABS-IMPROVEMENT-PLAN.md` — most critically, the Labs hub's own links (CSS, HTML, Git, Python) point at marketing splash pages instead of the actual practice platform, so "discoverable" doesn't mean "one click to the tool." That's a CX bug, not just an engineering one: the promised action (click a lab card, start practicing) silently fails to deliver on click.

**10. Is the relationship between learning content and practice clear?**
No. Nothing in a Starlight doc page (e.g. a JavaScript closures article) links forward to the matching JS Lab exercise or MCQ category, and nothing in a Lab links back to the doc that explains the underlying concept. Docs and Practice are two parallel universes that happen to share a nav bar. (The companion plan flags the same gap from the Labs side: "Cross-link labs ↔ existing docs.")

**11. Is progress tracking useful and understandable?**
Fragmented to the point of being untrustworthy. Distinct, uncoordinated progress stores currently include: `jsl-progress`, `sql-progress`, `mongo-progress`, `git-progress` + `git-achievements`, `pyl-progress`, `tw-progress`, `lab-xp-v1`, judge submission history, MCQ scores, SRS (`srsStore`) card state, and Study Plan progress. Supabase auth + a `syncManager` already sync judge/plans/MCQ/SRS across devices — **but Labs progress (the largest single feature surface) is not registered with it**, so clearing the browser silently erases most of a user's practice history with no warning. A user has no single place to answer "how am I doing overall?" — the Profile page is the closest candidate but only reflects the systems that *are* synced.

**12. Are there unnecessary or duplicate sections?**
Yes, concretely:
- **Two DSA problem catalogs**: `/problems` (online judge, real verdicts) and `/dsa/problems` (DSA Problem Lab, separate data/UI). Same user need, two products.
- **Two landing pages**: `/` and `/overview`, different visual systems, overlapping stats/hero content.
- **`/practice` is dead weight**: 3-line redirect to `/labs`, but `/practice/js-lab`, `/practice/mongodb-lab`, `/practice/python-lab`, `/practice/react-lab` still exist as their own files alongside the *current* `/labs/js-lab` etc. — likely orphaned from a prior IA generation.
- **`/mongodb`, `/mysql`, `/python`, `/css`, `/html`, `/git`** top-level marketing pages exist *in addition to* `/labs/mongodb`, `/labs/mysql`, etc. — this is the root cause of the "Labs hub links to the wrong page" bug in the companion plan: there are simply two pages per language and the hub picks the wrong one.

**13. What should be reorganized, merged, renamed, or moved?**
See §4 (Recommended IA) below — summary: collapse to one problems catalog, one landing page, remove the `/practice` and standalone `/css` `/html` `/git` `/python` `/mongodb` `/mysql` splash pages (or make them redirect, consistently, to their lab), add Profile to the nav, and regroup the 9 nav items under 4 named modes (Learn / Practice / Test / Track).

**14. What UX improvements can be made without adding AI or paid APIs?**
All of the above are zero-cost IA/content changes — no new infrastructure, no AI, no paid APIs. Additionally: a single unified `useProgress`-style store (already exists per the companion plan) surfaced as one "Continue where you left off" widget on the landing page for logged-in users; consistent verb-based section headers; consistent redirect behavior for legacy routes instead of dead splash pages.

---

## 3. Root Causes of Confusion

1. **Organic growth without a merge step.** Nav items, routes, and hero sections read like each feature was added independently (own landing section, own progress key, own splash page) with no later pass to unify them. The `graphify-out` community structure reflects this literally — 84 communities with very low cohesion scores (e.g. `AppNav.jsx` community cohesion 0.06, `MongoLabsPlatform.jsx` 0.07) confirm the codebase itself is a loose federation, not a single connected product.
2. **No named "modes."** Users think in verbs — *learn, practice, test, track*. The product thinks in nouns — *Docs, Labs, MCQ, Problems, Visualizer, Companies, Plans, Review*. Mapping nouns to verbs is left as an exercise for the user.
3. **Duplicate systems from incomplete migrations.** The judge (`/problems`) looks like the newer, better-engineered system (real verdicts, per the companion plan) built to eventually replace `/dsa/problems`, but the old one was never removed or redirected.
4. **Progress lives wherever a feature's author put it.** No architectural contract ("every feature registers with `syncManager`") existed when most features were built, so sync coverage is accidental rather than designed.

---

## 4. Recommended Information Architecture

**Collapse 3 landing experiences → 1.** Keep `/` as the single entry point. Either delete `/overview`'s duplicate hero/stats and make it a plain docs index (breadcrumb + topic grid, no second marketing pitch), or delete `/` and make `/overview` the one true landing — but not both re-pitching the product.

**Collapse 2 problem catalogs → 1.** Pick the online judge (`/problems`, real verdicts) as canonical. Migrate any content unique to `/dsa/problems` into it, then 301-redirect `/dsa/problems*` → `/problems*`. Update the Labs dropdown's "DSA Problem Lab" entry to point at `/problems`.

**Regroup the nav under named modes**, e.g.:
- **Learn** — Docs, System Design, Companies (reference/reading content)
- **Practice** — Labs, DSA Problems (hands-on, produces an artifact/verdict)
- **Test** — MCQ Hub, Interview Questions, Behavioral (assessment-style)
- **Track** — Study Plans, Review, Profile (planning/reinforcement/progress)

This can be a visual grouping within the existing flat nav (section dividers or a grouped dropdown) without a large rebuild — it's a labeling and IA change, not new engineering.

**Add Profile to the main nav.** It's the only place a unified "continue where you left off" view can live; it currently has zero top-level discoverability.

**Kill or redirect dead routes.** `/practice/*`, and the standalone `/css` `/html` `/git` `/python` `/mongodb` `/mysql` pages should either be deleted or turned into permanent redirects to their `/labs/*-lab` equivalent, matching the pattern `/practice` already uses. This alone fixes the "Labs hub links to marketing splash page" bug from the root, rather than patching each link individually.

**Cross-link Docs ↔ Practice bidirectionally.** Any Starlight doc page for a topic with a matching Lab/MCQ category should end with a "Practice this: [Lab] · [MCQ] · [Problems]" strip; each Lab/MCQ/Problem should link back to its concept doc. This directly serves audit question 10 and is pure content/template work.

**One progress surface.** Extend `syncManager` registration to Labs progress and `lab-xp-v1` (already recommended in the companion plan for data-integrity reasons — it also *is* the UX fix for question 11: it turns Profile into a genuinely complete "how am I doing" page instead of a partial one).

---

## 5. Recommended User Journey (Target State)

```
Land on "/" (single landing, shortened to hero + "why" + one clear primary CTA)
        │
        ▼
   Pick a Learn track (Docs) ──or── jump straight to Practice/Test if returning
        │                                   │
        ▼                                   ▼
  Read a concept doc  ──cross-link──►  Practice it (Lab) / Solve it (Problems) / Test it (MCQ)
        │                                   │
        └─────────────► Profile / Track ◄───┘
              (unified progress, streaks, "continue" widget,
               feeds Study Plans + Review/SRS)
```

The through-line every screen should reinforce: **Learn a concept → Practice/Test it → Track it → Repeat (Review).** Right now each of those four verbs is a disconnected destination; the fix is making the connective tissue between them visible on every page, not building new destinations.

---

## 6. Prioritized Change List

| # | Change | Effort | Impact | Type |
|---|---|---|---|---|
| 1 | Add "Profile" to main nav | XS | High — unlocks discoverability of the one unifying progress view | IA |
| 2 | Redirect dead/duplicate routes (`/practice/*`, standalone `/css` `/html` `/git` `/python` `/mongodb` `/mysql`) to their `/labs/*-lab` equivalents | S | High — fixes broken-feeling links at the root, not per-link | IA |
| 3 | Pick one DSA problem catalog (`/problems`), redirect the other, unify the nav entry | M | High — removes the single most confusing duplication | IA |
| 4 | Regroup nav into Learn / Practice / Test / Track labeled sections | S | High — gives users a mental model in one glance | IA |
| 5 | Collapse `/` and `/overview` into one landing experience | M | High — removes the "which page is actually home" confusion | Content/IA |
| 6 | Add bidirectional Docs ↔ Lab/MCQ/Problems cross-links | M | Medium-High — makes "learn then practice" an actual guided path | Content |
| 7 | Register Labs progress + XP with `syncManager` (shared with companion plan §2.4) | M | Medium-High — makes Profile/Track trustworthy | Engineering |
| 8 | Add a unified "Continue where you left off" widget (post-login landing / Profile) | S–M | Medium — surfaces existing per-feature resume state in one place | UX |
| 9 | Shorten `ReactLanding.jsx` to reduce section count / scroll depth before primary CTA | M | Medium — faster time-to-first-action for new visitors | Content |
| 10 | Feature-parity pass on Labs (palette, XP, autosave) — deferred to companion plan | L | Medium — consistency reduces "some labs feel unfinished" perception | Engineering |

---

## 7. What's Already Working (Keep Doing This)

- The Starlight docs sidebar structure (13 topic files) is a genuinely clean, scalable pattern — the confusion is entirely upstream of it, in how users *arrive*.
- `AppNav.jsx` mechanics (accessibility, mobile behavior, sticky scroll, due-review badge) are solid engineering; the fix needed is content/labeling, not a rebuild.
- The Labs hub's "jump back in" resume card and visit tracking are the right idea — it just needs to become the platform-wide pattern (see #8) instead of a Labs-only one.
- Study Plans' framing ("Pick a plan. The site tells you exactly what to do every day.") is the clearest, most confident copy on the entire site — it's a model for how every other hub's intro copy should read.

---

## 8. Proposed Fixes — Exact Steps (Not Implemented Yet)

Each item below is written as a literal to-do: file(s) to touch and the precise change. Nothing in this section has been applied — it's the execution spec for whenever the team says go.

### 8.1 Add Profile to main nav
- **File:** `src/components/AppNav.jsx`
- Add a `User` (or `CircleUserRound`) import from `lucide-react`.
- Insert one entry into `NAV_SECTIONS`, after `review`:
  ```js
  {
    id: 'profile',
    label: 'Profile',
    href: '/u',
    icon: User,
  },
  ```
- No dropdown needed — `/u` already resolves the logged-in user via `AuthButton`'s own session check inside `UserProfilePage.jsx`.
- Pass `activeSection="profile"` from `src/pages/u/index.astro` and `src/pages/u/[username].astro` (currently `u/index.astro` calls `<AppNav client:load />` with no `activeSection` at all — add it so the nav highlights correctly).

### 8.2 Redirect dead/duplicate routes
Replace each file's contents with the existing `practice.astro` redirect pattern (`return Astro.redirect('<target>', 301);`), then delete the component imports that become unused.

| File to convert | Redirect target |
|---|---|
| `src/pages/practice/js-lab.astro` | `/labs/js-lab` |
| `src/pages/practice/mongodb-lab.astro` | `/labs/mongodb-lab` |
| `src/pages/practice/python-lab.astro` | `/labs/python-lab` |
| `src/pages/practice/react-lab.astro` | `/labs/react-lab` |
| `src/pages/css.astro` | `/labs/css-lab` |
| `src/pages/html.astro` | `/labs/html-lab` |
| `src/pages/git.astro` | `/labs/git-lab` |
| `src/pages/python.astro` | `/labs/python-lab` |
| `src/pages/mongodb.astro` | `/labs/mongodb-lab` |
| `src/pages/mysql.astro` | `/labs/mysql` (until 8.3-adjacent `/labs/sql` rename from the companion plan lands, then update this target too) |

After converting the table above, fix `LabHub.jsx`'s card links (flagged in the companion plan §2.2) to point directly at the `*-lab` routes rather than relying on the redirect — the redirect is a safety net for old bookmarks/external links, not the primary path.

### 8.3 Unify the two DSA-problem catalogs
1. Diff the data shape: `src/data/judge/index.js` (`getJudgeManifest`, keyed by `slug`) vs. `src/data/dsa-problems.js` (keyed by `id`, per `graphify-out` god-node list). Identify any problems present in `/dsa/problems` and absent from `/problems`.
2. Port the missing problems into the judge's data format (or its content-collection equivalent) so `/problems` has full coverage.
3. Convert `src/pages/dsa/problems.astro` → redirect to `/problems`.
4. Convert `src/pages/dsa/problems/[id].astro` → redirect to `/problems/[slug]` (requires an `id → slug` lookup map if the two keys don't already match 1:1 — build this map from step 1's diff).
5. **File:** `src/components/AppNav.jsx` — in `LABS_SUB_ITEMS`, change the `dsa-problems` entry's `href` from `/dsa/problems` to `/problems`.
6. Grep the repo for any other internal links to `/dsa/problems` (docs cross-links, `PlanGallery`, `CompanyDirectory` problem references) and repoint them.

### 8.4 Regroup nav into Learn / Practice / Test / Track
- **File:** `src/components/AppNav.jsx`
- Restructure `NAV_SECTIONS` from a flat array of 9 items into 4 top-level entries, each `hasDropdown: true` (reusing the existing `Menu`/`MenuItems` pattern already built for `labs` and `interview-questions`):
  - **Learn** → Docs, System Design, Companies
  - **Practice** → Labs, DSA Problems (`/problems`, post-8.3)
  - **Test** → MCQ Hub, Interview Questions, Behavioral
  - **Track** → Study Plans, Review, Profile
- Keep each existing route/href unchanged — this is a presentation/grouping change on top of `NAV_SECTIONS`, not a routing change. Replace the ad-hoc `subItems === 'INTERVIEW_SUB_ITEMS' ? ... : LABS_SUB_ITEMS` string-matching in `renderNavLink` with a direct array reference per section (cleaner and supports 4 groups instead of 2).
- Update the mobile menu render block (`app-nav-mobile-section`) the same way — it currently branches on `section.hasDropdown` and will Just Work once all 4 groups set that flag consistently.

### 8.5 Collapse `/` and `/overview` into one landing
- **Decision needed first** (recommend keeping `/` as the marketing landing, since `ReactLanding.jsx` is the more built-out/animated experience): once decided,
- **File:** `src/content/docs/overview.mdx` — delete the `dl-hero` and `dl-stats` blocks (lines ~1–60+), replace with a short one-paragraph intro plus the existing topic-pill grid, so it reads as a docs *index*, not a second pitch.
- Keep `/overview`'s topic pills (`../javascript/`, `../react/`, etc.) — those are genuinely useful in-docs navigation, just drop the duplicate hero/stats framing around them.

### 8.6 Bidirectional Docs ↔ Practice cross-links
- Add a small shared component, e.g. `src/components/docs/PracticeLinks.jsx`, taking a `topic` prop (`"javascript"`, `"sql"`, …) and rendering "Practice this: [Lab →] [MCQ →] [Problems →]" with hrefs built from a small `topic → routes` lookup table (new file, e.g. `src/data/topic-links.js`).
- Insert `<PracticeLinks topic="..." />` at the bottom of each Starlight doc's frontmatter-driven layout (likely `src/layouts/` or the Starlight doc template override) — one template change propagates to all 524+ docs rather than per-file edits.
- On the Lab/MCQ/Problem side, add a small "Related reading" strip pointing back to the matching doc topic, sourced from the same lookup table.

### 8.7 Register Labs progress with `syncManager`
- **File:** `src/lib/sync/syncManager.js` — follow the existing registration pattern already used for judge/plans/MCQ/SRS stores.
- Register each lab's localStorage key (`jsl-progress`, `sql-progress`, `mongo-progress`, `git-progress`, `git-achievements`, `pyl-progress`, `tw-progress`, `lab-xp-v1`, and the CSS/HTML/React equivalents) as synced stores.
- This is shared work with `LABS-IMPROVEMENT-PLAN.md` §2.4 — implement once, benefits both the data-integrity concern (there) and the "trustworthy Profile" concern (here).

### 8.8 "Continue where you left off" widget
- New component, e.g. `src/components/ContinueWidget.jsx`: reads the same localStorage/synced-store keys used by `LabHub.jsx`'s existing "jump back in" card, plus judge's last-submission, plus SRS due-count, plus active Study Plan — picks the single most recent activity across all of them.
- Mount it in two places: `ReactLanding.jsx` (conditionally, only when a session/local activity exists — replaces or sits above the "why" section for returning users) and `UserProfilePage.jsx` (as the top module).
- No new backend work — this is a read-and-merge layer over state that already exists in `LabHub.jsx`, `syncManager`-backed stores, and `srsStore`.

### 8.9 Shorten `ReactLanding.jsx`
- **File:** `src/components/ReactLanding.jsx`
- Candidates to cut or merge (each is a `ref`-tracked `<section>` around line numbers noted in §1's exploration): `whyRef` (~501) and `featuresRef` (~1073) cover overlapping ground ("why this platform" vs. "features") — merge into one section.
- `tracksRef` (~621), `labsRef` (~803), `problemsRef` (~858), `mcqRef` (~935), `prepRef` (~1016) are five near-identical "here's a hub, here's its stats, here's a CTA" blocks — replace with one consistent grid component (`<HubShowcase hub={...} />`) parameterized per hub, cutting repeated markup and vertical scroll length without losing any linked hub.

### 8.10 Labs feature-parity pass
- Deferred to `LABS-IMPROVEMENT-PLAN.md` §3 (command palette, XP/streak, draft autosave, fullscreen, font size — per-lab checklist already defined there). No duplicate spec needed here; listed for completeness of the prioritized list in §6.

---

## 9. Broader Platform Audit (Performance / Accessibility / SEO / Code Quality & Security)

Scope expansion beyond IA/UX: a technical sweep of the same codebase for improvements that don't require adding AI or paid APIs. Findings only — nothing below has been applied.

### 9.1 Performance

- **Every heavy hub hydrates eagerly.** All `.astro` pages use only `client:load` (~65×) or `client:only="react"` (~15×) — **zero** uses of `client:idle`/`client:visible`/`client:media` anywhere. `MCQHub`, `LabHub`, `DSAVisualizerHub`, `DSAProblemList`, `CompanyDirectory`, `ReviewSession`, `InterviewQuestionHub` etc. all block/hydrate immediately even though none are above-the-fold-critical.
  - **Fix:** switch these to `client:visible` (hydrate when scrolled into view) or at minimum `client:idle`. Reserve `client:load` for `AppNav` only (it's genuinely needed immediately on every page).
- **`client:only="react"` Labs platforms render nothing until JS loads** (no SSR fallback) — combined with Monaco/Pyodide/sql.js this is a blank-page flash on every lab visit.
  - **Fix:** add a lightweight static skeleton/loading shell in the `.astro` file itself (plain HTML, no hydration) so there's paint before the island mounts.
- **No resource hints for the CDN runtimes** actually fetched at runtime — `unpkg.com` (React UMD for the in-iframe React runner, `src/components/labs/react/runner/reactRunner.js:41-42`) and `cdn.jsdelivr.net` (Pyodide, `src/workers/py-judge.worker.js`, `python-lab.astro`). Only Google Fonts origins get `preconnect`.
  - **Fix:** add `<link rel="preconnect" href="https://unpkg.com">` / `https://cdn.jsdelivr.net` to the React/Python lab pages specifically (not sitewide — no need to pay the connection cost on pages that don't use them).
- **Font `<head>` block is copy-pasted into 51 separate `.astro` files** (same 3-family Google Fonts `<link>` + inline theme-detection script) because **no shared `Layout.astro`/`BaseHead.astro` exists**.
  - **Fix:** extract a `src/layouts/BaseHead.astro` with the fonts/theme-script block; import it in every page. One-time refactor, then font/theme changes are a single-file edit forever after.
- **Unoptimized images:** no `astro:assets`/`<Image>` usage anywhere; several 1.2–1.6MB GIFs served raw from `public/assets/js/` (`microtask3.gif`, `microtask.gif`, `microtask5.gif`, `microtask6.gif`, `microtask2.gif`).
  - **Fix:** convert those GIFs to optimized video (`<video autoplay loop muted>`) or WebP/APNG, and route future doc images through `astro:assets` for automatic sizing/format.
- **No `manualChunks` / vendor splitting** in `astro.config.mjs`, and each `client:only` lab imports its own copies of heavy deps (Monaco, Babel-standalone, D3, `@xyflow/react`) — likely duplicated vendor code across per-lab bundles.
  - **Fix:** add `vite.build.rollupOptions.output.manualChunks` grouping shared heavy deps (Monaco, D3) into one chunk reused across labs that need them.
- **No service worker / PWA manifest exists** — confirmed absent (no `sw.js`, no `manifest.json`/`site.webmanifest`, no `navigator.serviceWorker.register`). Matches the companion Labs plan's "offline breaks" flag; noted here as a platform-wide gap, not just a Labs one.

### 9.2 Accessibility

- **No focus trap / `role="dialog"` on the command palette** (`LabCommandPalette.jsx`) — Tab can escape behind the overlay.
  - **Fix:** add `role="dialog"` `aria-modal="true"`, and trap focus (headlessui's `Dialog`, already a project dependency via `@headlessui/react`, does this for free).
- **Resizable panel handles are mouse-only** (`LabResizableHandle.jsx`) — a plain `<div>` with `mousedown`/`mousemove`, no `tabIndex`, `role="separator"`, `aria-valuenow`, or keyboard handler. Panels cannot be resized via keyboard at all.
  - **Fix:** add `role="separator"` `tabIndex={0}` `aria-orientation` and arrow-key resize handling.
- **29 occurrences of `focus:outline-none` with no replacement focus ring**, concentrated in `AuthButton.jsx` (10 instances alone) across 11 files — keyboard focus becomes invisible on many controls.
  - **Fix:** replace with a visible `focus-visible:ring-2` (Tailwind) or an explicit `:focus-visible` CSS rule using the existing token palette.
- **Decorative icon `aria-hidden` pattern from `AppNav.jsx` isn't followed elsewhere** — zero `aria-hidden` usage across the entire `components/labs/**` tree (30+ files using `react-icons`) and in `AuthButton.jsx`; `MCQHub.jsx` inline SVGs (lines 135/144/153/245) also lack it.
  - **Fix:** sweep decorative icons in those files and add `aria-hidden="true"`, matching the existing `AppNav` convention.
- **Heading-level skips:** `LabHub.jsx` (`h1` → `h3`, skips `h2`) and `DSAVisualizerHub.jsx` (`h2` → `h4`, skips `h3`).
  - **Fix:** renumber to sequential levels; no visual change needed if font-size classes are decoupled from the semantic tag.
- **14 `<div onClick>` "fake buttons"** without `role="button"`/keydown handling across `StoryBuilder.jsx`, `MiniApps.jsx`, `FixBug.jsx`, `GitLanding.jsx` and similar.
  - **Fix:** convert to real `<button>` elements where visually feasible (removes the need for manual `role`/`tabIndex`/keydown shims).
- **Reduced-motion respected in only ~5 places**, not honored in all 11 visualizers, `MCQQuiz.jsx`'s confetti/XP-flyout, `MCQHub.jsx`, `MCQCategory.jsx`, `MCQDashboard.jsx`, `ReviewSession.jsx`.
  - **Fix:** centralize a `usePrefersReducedMotion()` hook (one already informs `LabHub`/palette) and gate the animation-heavy code paths in the listed components behind it.
- **Auth form labeling gaps:** username input's `<label>` isn't linked via `htmlFor`/`id`; the email magic-link input has no `<label>` at all (placeholder only); `modalError` isn't `aria-live`, so screen readers won't announce auth errors.
  - **Fix:** wire `htmlFor`/`id` pairs, add a (visually-hideable) `<label>` for the email field, add `aria-live="polite"` to the error region.

### 9.3 SEO / Metadata

- **Title collision:** `/labs/css` and `/labs/css-lab` share the identical `<title>` ("CSS Labs — Interactive CSS Learning Platform") while both are live, indexed routes.
  - **Fix:** resolved automatically once §8.2's redirect (`/labs/css` → `/labs/css-lab`) ships — only one indexable URL remains.
- **No `<link rel="canonical">` emitted anywhere**, even though `SEOHead.astro:21` already computes `canonicalUrl` (it's only used for `og:url` and JSON-LD, line 45/100) — confirmed zero real canonical tags in built `dist/*.html`, and `dist/sitemap-0.xml` (2,313 URLs) includes both `/labs/css/` and `/labs/css-lab/`.
  - **Fix:** in `SEOHead.astro`, add `<link rel="canonical" href={canonicalUrl} />` next to the existing `og:url` line — one-line addition, reuses a value that's already computed.
- **Open Graph / Twitter cards only exist on Starlight docs pages** (via `SEOHead.astro`, wired as the Starlight `Head` override) — every standalone `src/pages/**/*.astro` (labs, mcq, visualizer, companies except `[slug]`, plans) has no `og:`/`twitter:` tags, so link shares from those pages render with no preview.
  - **Fix:** extract `SEOHead.astro`'s OG/Twitter block into a small reusable partial and import it in the standalone pages' `<head>` (natural to combine with the `BaseHead.astro` extraction in §9.1).
- **Several pages render their `<h1>` client-side only** (inside the hydrated React island, invisible to crawlers pre-hydration): `labs/css.astro`, `labs/css-lab.astro`, `mcq/index.astro`, `mcq/[category].astro`, `visualizer/arrays.astro`, `plans/[slug].astro`.
  - **Fix:** move a static `<h1>` into the `.astro` shell itself (as `dsa/problems.astro` and `problems/index.astro` already do), even if the island re-renders its own heading below/instead — crawlers and no-JS visibility need one in the initial HTML.
- **No `@astrojs/sitemap` integration** — sitemap comes from Starlight's bundled default, which is why non-doc routes' duplicate-content issue reaches the sitemap unfiltered. Structured data (JSON-LD) exists for docs (`SEOHead.astro`) and company pages (`companies/[slug].astro`) but nowhere else — acceptable, not every page needs it.

### 9.4 Code Quality & Security

- **Leftover duplicate/forked content dirs beyond the already-known `JavaScript/javascript` case-dupe:** `src/content/docs/nextjs/phase-1-fundamentals/module-1-settingup/` vs `module-1-setting-up/` (near-identical, one copy corrupted — `import Button from '../components/BGUTTON'`, "Custom Forks" instead of "Custom Hooks"); and in `phase-05-authentication/`, `01-authentication-basics/` vs `authentication/` and `02-authjs-nextauth/` vs `authjs/` are drifted duplicate forks of the same lessons.
  - **Fix:** diff each pair, keep the non-corrupted/most complete version, delete the other, fix any internal links pointing at the deleted path.
- **Minor XSS-adjacent issue, low real severity:** `src/components/labs/react/runner/reactRunner.js:66-77` builds sandboxed-iframe `srcdoc` HTML and interpolates `err.message` unescaped into it. Since the iframe already runs arbitrary user-authored code (`sandbox="allow-scripts"`), this is self-XSS, not a real escalation — but still worth escaping on principle/lint-cleanliness.
  - **Fix:** HTML-escape `err.message` before interpolation (or render it via `textContent` instead of a raw template string).
- **No hardcoded secrets found** — Supabase URL/anon key are correctly read via `import.meta.env.PUBLIC_SUPABASE_*` with a safe mock fallback (`src/lib/supabase.js:3-4`). Good as-is, no action needed.
- **Tests exist but are unwired:** `src/lib/srs/sm2.test.js` and `src/lib/sync/merges.test.js` are real vitest files, but `package.json` has no `"test"` script and no `vitest.config.*` — so in practice they never run (corrects the companion plan's "zero developer tests" claim to "tests exist, but nothing executes them").
  - **Fix:** add `"test": "vitest run"` to `package.json` scripts (and ideally a CI workflow that runs it on PRs) — near-zero effort to reactivate coverage that already exists.
- **No ESLint configured at all** (no config file, no `eslint` dependency) — `tsconfig.json` extends `astro/tsconfigs/strict` but nothing (no CI) actually runs `tsc`/`astro check` against it, so the strict config is aspirational only.
  - **Fix:** add a baseline ESLint config (`eslint-plugin-astro` + `eslint-plugin-jsx-a11y` would directly catch several §9.2 issues going forward) and a CI workflow running lint + `astro check` + `vitest run` on PRs.
- **`console.log` volume (689 hits/40 files) is mostly benign** — the large majority are lesson/quiz content strings or default editor placeholder code shown to learners (`ReactPlayground.jsx`, `MonacoPlayground.jsx`, `OOPCheatSheet.jsx`), not leftover debug statements. No `debugger;` statements found anywhere. No action needed beyond the specific reactRunner.js item above.
- **No TODO/FIXME/HACK debt in real source** — the 26 files matched are either teaching content discussing TODOs conceptually, or intentional `// TODO` exercise placeholders in lab data files for learners to fix. Not real dev debt; no action needed.

---

## 10. Combined Non-UX Fix Priority List

| # | Change | Effort | Impact | Area |
|---|---|---|---|---|
| 1 | Add `"test": "vitest run"` to `package.json`; reactivate existing test files | XS | Medium — free coverage that already exists | Code quality |
| 2 | Add `<link rel="canonical">` in `SEOHead.astro` (value already computed) | XS | Medium — prevents duplicate-content indexing | SEO |
| 3 | Switch non-critical hub islands from `client:load` to `client:visible`/`client:idle` | S | High — real, sitewide load-time win | Performance |
| 4 | Extract `src/layouts/BaseHead.astro` (fonts + theme script + OG/canonical tags) | S–M | Medium — kills 51-file duplication, unlocks OG tags everywhere in one shot | Perf + SEO |
| 5 | Add focus trap (`role="dialog"`/`aria-modal`) to command palette; fix `focus:outline-none` instances | S–M | Medium — keyboard users currently lose focus visibility/containment | Accessibility |
| 6 | Add baseline ESLint (+ `jsx-a11y`, `eslint-plugin-astro`) and a CI workflow (lint + `astro check` + `vitest run`) | M | Medium-High — turns every other fix here into an enforced standard, not a one-time cleanup | Code quality |
| 7 | Fix heading-level skips (`LabHub.jsx`, `DSAVisualizerHub.jsx`) and add static `<h1>`s to client-rendered-only pages | S | Medium — accessibility + crawlability | A11y + SEO |
| 8 | Make resizable panel handles keyboard-operable (`role="separator"`, arrow keys) | S | Medium | Accessibility |
| 9 | Compress/replace the five 1.2–1.6MB GIFs under `public/assets/js/` | XS | Low-Medium — easy page-weight win on the pages embedding them | Performance |
| 10 | Delete/repair the drifted duplicate Next.js doc-content forks (`module-1-settingup` vs `-setting-up`, `authjs` vs `02-authjs-nextauth`, etc.) | S | Low-Medium — content quality/trust (one copy has visibly broken text) | Code quality |
| 11 | Escape `err.message` before interpolation in `reactRunner.js` sandbox HTML | XS | Low (self-XSS in an already-sandboxed iframe) but easy | Security |
| 12 | Centralize `usePrefersReducedMotion()` and gate the ~17 animated components currently ignoring it | M | Medium — accessibility + matches an already-partially-adopted pattern | Accessibility |
