# Feature 02 — Structured Study Plans / Roadmaps

| | |
|---|---|
| **Tier** | 1 — Core Loop |
| **Priority** | ⭐ Very High — highest value-to-effort ratio in the roadmap |
| **Depends on** | Nothing hard; integrates with Judge (01) and Accounts (03) when available |
| **Effort** | Medium (1–2 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
We have 1000+ notes, hundreds of problems, MCQs, and labs — and that is exactly the
problem. A user preparing for an interview does not want a library; they want an answer
to one question: **"What should I do today?"** Right now every visitor has to invent
their own curriculum. Most bounce because the choice paralysis is real.

### Competitive context
- **NeetCode built an entire business** on ONE curated list (NeetCode 150). The list IS
  the product; the videos are the upsell.
- **LeetCode's "Study Plans"** (Top Interview 150, 30 Days of JS) are among their
  highest-engagement features.
- **Our advantage:** we can interleave content types nobody else has together — a plan
  day can mix a note → a visualizer → a judged problem → an MCQ set → a lab. A full
  learning loop per day, all on one platform.

### Why now
It is mostly **curation of content we already have**, so it ships fast, and it gives
every other feature a spine: streaks attach to plan days, analytics recommend the next
plan, company tracks ARE plans (Feature 09 reuses this system entirely).

---

## 2. What to Build

### User stories
1. As a user, I browse a **Plans gallery** (`/plans`) with cards: title, description,
   duration, difficulty, estimated hrs/day, and my progress % if started.
2. As a user, I open a plan and see a **day-by-day checklist**: Day 1 → 4 items (read
   this note, watch this visualizer, solve these 2 problems, take this quiz).
3. As a user, I check off items; problems auto-check when the Judge (01) reports AC;
   MCQs auto-check when the quiz is completed.
4. As a user, I always see a **"Continue where you left off"** button on the plan page
   and on the site landing page.
5. As a user, I can see plan progress: days completed, items remaining, projected
   finish date at current pace.

### Launch plans (v1 content — 6 plans)
| Plan | Duration | Audience |
|------|----------|----------|
| **Blind 75 (Guided)** | 8 weeks | The classic — our judged versions + our notes per pattern |
| **30-Day DSA Bootcamp** | 30 days | Beginners; notes + visualizers + easy problems |
| **Frontend Interview in 21 Days** | 21 days | JS deep-dives + React notes + JS Interview Lab + MCQs |
| **SQL in 7 Days** | 7 days | SQL notes + SQL Query Lab exercises |
| **JavaScript Mastery (Namaste JS track)** | 14 days | Namaste JS notes + output-guessing labs + MCQs |
| **Last-Minute Revision (3 days)** | 3 days | Cheat-sheet notes + top 30 MCQs + 10 must-solve problems |

### Out of scope for v1
- User-created custom plans (v2)
- AI-personalized plans (comes with Analytics, Feature 11)
- Calendar/email reminders (needs accounts + notifications, later)

---

## 3. How to Build It (in this codebase)

### 3.1 Plan JSON schema (`src/data/plans/*.json`)

```jsonc
{
  "id": "blind-75-guided",
  "title": "Blind 75 (Guided)",
  "tagline": "The 75 questions that cover every pattern — with notes and visualizers.",
  "difficulty": "intermediate",
  "durationDays": 56,
  "hoursPerDay": 1.5,
  "tags": ["dsa", "faang"],
  "heroTopics": ["arrays", "trees", "dp"],
  "days": [
    {
      "day": 1,
      "title": "Arrays & Hashing — the foundation",
      "items": [
        { "type": "note",       "ref": "/data-structures/arrays/intro",    "label": "Read: Array fundamentals", "minutes": 15 },
        { "type": "visualizer", "ref": "/visualizer/arrays",               "label": "Visualize: array operations", "minutes": 10 },
        { "type": "problem",    "ref": "two-sum",                          "label": "Solve: Two Sum", "minutes": 25 },
        { "type": "problem",    "ref": "contains-duplicate",               "label": "Solve: Contains Duplicate", "minutes": 20 },
        { "type": "mcq",        "ref": "arrays-basics",                    "label": "Quiz: Arrays basics (10 Qs)", "minutes": 10 }
      ]
    }
    // … one entry per day
  ]
}
```

Item `type` drives both the icon/link and the **auto-completion source**:
- `note` / `visualizer` / `lab` → manual checkbox (mark-as-done)
- `problem` → auto-completes when `judgeStore.solved[ref] === "accepted"`
- `mcq` → auto-completes when the MCQ store records the quiz finished

### 3.2 Files to create

```
src/data/plans/*.json                       ← 6 launch plans
src/data/plans/index.json                   ← gallery manifest
src/components/plans/PlanGallery.jsx        ← card grid w/ progress rings
src/components/plans/PlanDetail.jsx         ← day accordion + checklist
src/components/plans/PlanDayItem.jsx        ← one checklist row (icon, link, checkbox)
src/components/plans/ContinueBanner.jsx     ← "Continue Day 12 →" (also embed on landing)
src/store/planStore.js                      ← Zustand persisted store
src/pages/plans/index.astro
src/pages/plans/[slug].astro
```

### 3.3 Store shape (`planStore.js`)

```js
{
  active: ["blind-75-guided"],               // plans user has started
  progress: {
    "blind-75-guided": {
      startedAt: 1720000000,
      done: { "1:0": true, "1:1": true },    // "day:itemIndex" → completed
      lastTouched: 1720090000
    }
  }
}
```

Derived selectors (not stored): `percentComplete`, `currentDay` (first day with an
unfinished item), `projectedFinish` (pace = days elapsed / days completed).

**Auto-completion wiring:** `PlanDayItem` subscribes to `judgeStore.solved` and the MCQ
store; when the underlying ref completes, dispatch `planStore.markDone(planId, key)`.
One-directional — unchecking a plan item never un-solves a problem.

### 3.4 SEO note
Every plan page is a static Astro route with full day-by-day content server-rendered
(checkboxes hydrate client-side). "blind 75 study plan", "30 day dsa plan", "frontend
interview roadmap" are high-volume search queries — these pages are SEO magnets.

### 3.5 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | Schema + planStore + PlanDetail with manual checkboxes + 1 plan (SQL in 7 Days) |
| 2 | Gallery page, ContinueBanner on landing, progress rings |
| 3 | Auto-completion wiring to judgeStore + MCQ store |
| 4 | Author remaining 5 plans; cross-link from relevant notes ("Part of Blind 75 →") |

---

## 4. Expected Result

### User-visible outcome
A visitor lands, clicks "Start the 30-Day DSA Bootcamp", and from that moment the site
tells them exactly what to do every day. The landing page greets returning users with
"Continue Day 12 → Binary Trees". The platform shifts from *library* to *coach*.

### Success metrics
- ≥ 30% of new visitors who view the gallery start a plan
- Plan-followers return ≥ 3× more often than non-followers (measure via Feature 11)
- Day-7 completion rate ≥ 25% on the 7-day SQL plan (short plan = funnel health check)

### Definition of done / acceptance criteria
- [ ] 6 plans live, every `ref` resolves to a real page/problem/quiz (CI link-check script)
- [ ] Progress persists in localStorage; state shape sync-ready for Feature 03
- [ ] Problems auto-check on AC; MCQs auto-check on quiz completion
- [ ] Continue banner appears on landing page for users with an active plan
- [ ] Plan pages statically rendered with meta tags + OG image per plan
- [ ] Works fully logged-out

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Implement the Study Plans feature for my Astro + Starlight + React 19 site (dsa-docs/).
Read roadmap/tier-1-core-loop/02-study-plans.md and follow its JSON schema, store
shape, and file layout exactly.

Deliver Phase 1+2: (1) src/store/planStore.js — Zustand store persisted to
localStorage with markDone/markUndone actions and percentComplete/currentDay
selectors; (2) the "SQL in 7 Days" plan JSON authored from my existing SQL notes under
src/content/docs/sql/ and SQL Lab exercises (inspect them to pick real refs);
(3) PlanGallery, PlanDetail (day accordion, checklist, progress ring), PlanDayItem,
ContinueBanner components styled with Tailwind matching src/styles/tokens.css theme
variables; (4) /plans and /plans/[slug] Astro pages with static rendering and per-plan
meta tags. Add the ContinueBanner to the landing page component. Verify in the dev
server: start the plan, check off Day 1, reload, confirm persistence and the continue
banner shows "Day 1" → then "Day 2" when Day 1 completes.
```
