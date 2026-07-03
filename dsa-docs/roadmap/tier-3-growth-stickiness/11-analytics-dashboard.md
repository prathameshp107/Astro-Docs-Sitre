# Feature 11 — Personal Analytics & Weakness Detection ("Your Coach Dashboard")

| | |
|---|---|
| **Tier** | 3 — Growth & Stickiness |
| **Priority** | Medium — closes the loop between all Tier 1/2 data |
| **Depends on** | Judge (01), Plans (02), SRS (04) as data sources; Accounts (03) for cross-device |
| **Effort** | Medium (2 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
By the time Tier 1 ships, we're sitting on rich signals — verdicts per topic, SRS
grades, quiz scores, hint-ladder depth from mock interviews — and showing the user
none of it. Users are terrible at self-diagnosis: they grind arrays (comfortable)
while their graph skills rot (scary). Every solved problem generates data that could
answer the only question that matters: **"Am I ready, and if not, what exactly is
weak?"** Right now nothing answers it.

### Competitive context
- **LeetCode:** counts and a topic pie chart — descriptive, not prescriptive. It
  tells you what you did, never what to do.
- **Our wedge:** we have signals no one else has in one place — judged code, spaced
  recall grades (04 knows what you *forget*, not just what you failed), MCQ accuracy,
  and interview rubric scores (05). Fusing them into a per-topic **mastery score**
  with a concrete "do these 3 things this week" output is a genuine differentiator,
  and it's 100% client-side computation — no AI cost, no backend.

### The product framing
Not "analytics" (nobody wants charts) — a **coach**. The dashboard's job is one
prioritized sentence: *"Your weakest area is graphs — 40% WA rate and 3 lapsed
cards. Here's your week."*

---

## 2. What to Build

### 2.1 Mastery model (the engine)
Per topic (arrays, trees, graphs, DP, … — same taxonomy as problem/MCQ tags), compute
a 0–100 mastery score from four signals:

```
mastery(topic) =
    35% × solve strength   (AC rate weighted by difficulty; decays for stale ACs)
  + 25% × retention        (SRS ease/lapse stats on that topic's cards — from 04)
  + 20% × quiz accuracy    (MCQ history on that topic)
  + 20% × independence     (inverse of hint depth + editorial peeks + AI-review
                            "not optimal" flags on that topic)
```

Each factor normalized 0–1 with sensible priors for missing data (no signal ≠ zero —
show "not enough data" below a confidence threshold instead of a fake number).
Recency decay: half-life 45 days on solve strength (matches interview-prep reality:
what you solved 3 months ago is not what you know today).

### 2.2 Dashboard page (`/dashboard`) — sections in priority order
1. **Coach card** (top): the one-sentence diagnosis + a generated **weekly focus
   list**: 3 problems + 1 note + 1 SRS deck targeting the two weakest topics with
   enough data. Regenerates weekly (seeded by ISO week — deterministic).
2. **Readiness radar** — D3 radar chart of mastery across topics; overlay a target
   profile ("mid-level frontend" / "SDE-2 generalist" presets) so gaps are visual.
3. **Topic drill-down** — click a radar axis → that topic's factor breakdown (solve
   strength / retention / quiz / independence), history sparkline, weakest problems
   to retry, lapsed SRS cards.
4. **Trajectory** — solved-over-time by difficulty (stacked area), current pace vs
   the pace needed for a user-set target date ("interview on Aug 15" date picker →
   "you need 2.3 medium/week; you're at 1.1").
5. **Interview readiness** (if any 05 sessions exist) — rubric scores over time.

### 2.3 Integration hooks (what makes it a loop, not a report)
- Coach card items deep-link with one-click add: "Add this week's focus to my plan"
  (creates/updates a lightweight personal plan via the 02 engine).
- Weakest-topic chips link to filtered problem lists (01) and deck subscribe (04).
- Streak/XP heatmap embeds from (10) — one dashboard, not two.

### Out of scope for v1
- AI-generated study advice (the deterministic model must prove itself first; AI
  narrative layer is a cheap v2 add via the 05 proxy)
- Percentile-vs-other-users comparisons (needs server aggregation + bigger user base)

---

## 3. How to Build It (in this codebase)

### 3.1 Architecture — pure derivation, no new state

Critical decision: the dashboard **stores nothing** (except the target-date setting
and dismissed-tips). Everything derives from existing store data at render time.
No sync issues, no staleness, no migrations.

```
judgeStore ─┐
srsStore   ─┤                                    ┌─ CoachCard
mcqStore   ─┼─► selectors in src/lib/mastery/ ──┼─ ReadinessRadar
gameStore  ─┤   (pure, memoized, unit-tested)   ├─ TopicDrilldown
interview  ─┘                                    └─ Trajectory
```

```
src/lib/mastery/model.js        ← mastery(), factors, decay math + tests
src/lib/mastery/coach.js        ← diagnosis sentence + weekly focus generator + tests
src/lib/mastery/selectors.js    ← adapters reading each store's shape
```

One prerequisite to verify: judge submissions and MCQ history must carry topic tags
(they do per the 01 schema; MCQ store may need a small enrichment — check first).

### 3.2 Files to create

```
src/lib/mastery/{model,coach,selectors}.js + tests
src/components/dashboard/CoachCard.jsx
src/components/dashboard/ReadinessRadar.jsx     ← D3 radar, theme-aware
src/components/dashboard/TopicDrilldown.jsx
src/components/dashboard/TrajectoryChart.jsx    ← D3 stacked area + pace line
src/components/dashboard/TargetDatePicker.jsx
src/store/dashboardStore.js                     ← ONLY targetDate + dismissed tips
src/pages/dashboard.astro
```

Charts: follow the dataviz conventions already used by the visualizer components;
every chart needs an empty/insufficient-data state that says what to do to unlock it
("Solve 3 graph problems to see your graph mastery") — for new users the dashboard
must motivate, not shame.

### 3.3 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | mastery model + selectors + tests against synthetic store fixtures |
| 2 | Dashboard page: CoachCard + radar + drill-down with real store data |
| 3 | Trajectory + target-date pace math; empty states; embed game heatmap |
| 4 | One-click "add focus to plan" integration with the 02 engine |

---

## 4. Expected Result

### User-visible outcome
`/dashboard` opens with: *"Your weakest area is Dynamic Programming — 45% acceptance,
heavy hint use, 4 lapsed cards. This week: these 3 problems, this note, this deck."*
A radar chart makes the gap visceral; a pace line answers "will I be ready by Aug 15?"
The platform stops being a place you visit and becomes a coach that knows you.

### Success metrics
- ≥ 50% of users with 10+ solved problems visit the dashboard weekly
- ≥ 30% of coach-card recommendations get clicked; ≥ 15% completed within the week
- Users with a target date set retain at 2× baseline (deadline = commitment)

### Definition of done / acceptance criteria
- [ ] Mastery model unit-tested against fixtures: cold start, single-signal,
      all-signal, decay-over-time, and missing-topic cases
- [ ] "Not enough data" shown below the confidence threshold — never a fake score
- [ ] Weekly focus is deterministic within an ISO week and changes across weeks
- [ ] Every recommendation deep-links correctly (problem/note/deck all resolve)
- [ ] Radar + charts readable in both themes, responsive, with empty states
- [ ] Zero new synced state beyond targetDate + dismissals
- [ ] Dashboard render < 100 ms with 500 submissions in store (memoize selectors)

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build Phase 1+2 of the personal analytics dashboard for my Astro + React 19 site
(dsa-docs/). Read roadmap/tier-3-growth-stickiness/11-analytics-dashboard.md and
follow the pure-derivation rule: no new persisted state except targetDate and
dismissed tips; everything else derives from judgeStore, srsStore, the MCQ store, and
gameStore via memoized selectors.

Deliver: (1) src/lib/mastery/model.js implementing the 35/25/20/20 weighted mastery
score with 45-day half-life recency decay and a confidence threshold that yields
"insufficient data" instead of a score — plus Vitest tests using synthetic store
fixtures for cold-start, partial-signal, and decay cases; (2) coach.js generating the
one-sentence diagnosis and an ISO-week-seeded deterministic weekly focus list (3
problems + 1 note + 1 deck from the two weakest confident topics); (3) selectors.js
adapters over the real store shapes (read the stores first and verify topic tags are
available; report any gaps); (4) /dashboard page with CoachCard and a D3
ReadinessRadar (theme-aware via tokens.css, with per-axis click-through to a
TopicDrilldown panel showing the four factor bars). Include empty states that tell
new users how to unlock each section. Run the tests, then verify in dev with seeded
localStorage data.
```
