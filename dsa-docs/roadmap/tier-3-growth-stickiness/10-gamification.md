# Feature 10 — Gamification: Streaks, XP, Daily Challenge, Leaderboards

| | |
|---|---|
| **Tier** | 3 — Growth & Stickiness |
| **Priority** | Medium-High — cheap multiplier on every existing feature |
| **Depends on** | Judge (01), Accounts (03) for leaderboards; SRS (04) & Plans (02) feed XP |
| **Effort** | Medium (2 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
Interview prep takes 8–12 weeks of consistency, and consistency — not content — is
where users fail. Our platform currently offers no reason to come back *today*
specifically. Duolingo built a $10B company substantially on one mechanic (the streak)
because loss-aversion beats motivation: people who don't feel like studying will still
do one problem to keep a 47-day streak alive.

### Competitive context
- **LeetCode:** daily challenge + streak + contest rating — their retention engine.
- **Duolingo:** the masterclass — streaks, freezes, leagues.
- **Our angle:** we have MORE activity types to reward than LeetCode (problems, SRS
  reviews, plan days, MCQs, mock interviews), so our streak is easier to keep with
  variety — "do ANY meaningful thing today" — which is healthier and stickier than
  problem-only streaks.

### Design principles (to avoid gamification's failure modes)
1. **Reward learning, not grinding** — XP for first-solves, not re-solves; caps per day.
2. **Streak = any meaningful activity** (AC, SRS session, plan item, quiz ≥ 70%) —
   min effort ~5 min, so it never forces busywork.
3. **Leaderboards opt-in and cohort-based** (weekly league of ~30 active users, not a
   global board where rank #48,201 demotivates).

---

## 2. What to Build

### 2.1 Streaks
- A day counts if the user does ≥ 1 **qualifying activity** (defined above).
- **Streak freeze:** 1 earned per 7-day streak, max 2 banked, auto-applied on a
  missed day (Duolingo-proven mercy mechanic; prevents rage-quit after day-40 loss).
- UI: flame + count in navbar; calendar heatmap on profile; "streak saved by freeze"
  toast; timezone-safe day boundaries (user's local midnight, store tz offset).

### 2.2 XP & Levels
| Activity | XP |
|---|---|
| First AC on a problem | 10 (easy) / 20 (medium) / 40 (hard) |
| Daily challenge solved | +50% bonus on the problem's XP |
| SRS session completed (all due done) | 15 |
| Plan day completed | 25 |
| MCQ quiz ≥ 70% (first time) | 10 |
| Mock interview completed | 60 |

- Daily XP cap: 200 (anti-grind). Level curve: `xpForLevel(n) = 100 * n^1.5`,
  levels get named titles ("Recurser", "Tree Shaker", "Graph Wizard" — 20 levels).
- XP is a **progress signal, not a currency** — nothing is purchasable; no XP decay.

### 2.3 Daily Challenge
- One problem/day, same for everyone (deterministic rotation from the judge bank,
  seeded by date — no backend needed), difficulty cycling easy→medium→medium→hard.
- `/daily` page + navbar dot; solving it = streak credit + bonus XP.
- Monthly calendar view: solved days get badges (LeetCode-proven mechanic).

### 2.4 Badges (launch set ~20)
Milestones: first AC, 10/50/100 solved, 7/30/100-day streak, first mock interview,
plan completed, all-topics-touched, night-owl (solve after midnight), polyglot
(AC in both JS and Python on one problem). Displayed on profile (03); each has
name + icon + earned-date; SVG icon set, no external images.

### 2.5 Weekly League (leaderboard done right)
- Opt-in. Cohorts of ≤ 30 users active that week, ranked by weekly XP; resets Monday.
- Top 5 promote to next league tier (Bronze→Silver→Gold→Sapphire→Ruby), bottom 5
  demote. Requires accounts (03) + a small `weekly_xp` table with a Supabase RPC.
- v1 can ship without leagues if accounts adoption is still low — streaks/XP/badges/daily
  all work logged-out via localStorage.

### Out of scope
- Paid streak repair, cosmetic shops, XP-gated content (all dark patterns — never)
- Contest mode with global ranking (needs server-side judging integrity — much later)

---

## 3. How to Build It (in this codebase)

### 3.1 Architecture — one event bus, one reducer

The key design decision: **gamification observes, never participates.** Feature
stores (judge, srs, plans, mcq, interview) emit events; a single gamification store
consumes them. No feature imports gamification code.

```js
// src/lib/events.js — tiny pub/sub
emit("problem.accepted", { id, difficulty, firstTime });
emit("srs.sessionCompleted", { reviewed });
emit("plan.dayCompleted", { planId, day });
// existing stores add emit() calls at their mutation points (5 one-line changes)

// src/store/gameStore.js — subscribes to all, applies rules
{
  xp, level, dailyXp: { date, amount },
  streak: { current, best, lastQualifyingDay, freezes, tzOffset },
  badges: { "first-ac": earnedTs },
  activityLog: [{ date, type }]        // powers heatmap; pruned to 400 days
}
```

Rules (XP table, caps, streak qualification, badge conditions) live in
`src/lib/game/rules.js` as pure functions with unit tests — the streak/timezone
logic especially (day boundaries, freeze application, DST) is classic bug territory.

### 3.2 Files to create

```
src/lib/events.js                          ← pub/sub (≤ 30 lines)
src/lib/game/rules.js + rules.test.js      ← XP table, streak logic, badge conditions
src/store/gameStore.js                     ← consumes events, persisted, sync-registered
src/components/game/StreakFlame.jsx        ← navbar widget + freeze indicator
src/components/game/XPToast.jsx            ← "+20 XP" toast on qualifying events
src/components/game/BadgeGrid.jsx          ← profile section
src/components/game/ActivityHeatmap.jsx    ← GitHub-style year heatmap (D3)
src/components/game/DailyChallenge.jsx
src/components/game/LeagueBoard.jsx        ← phase 3, Supabase-backed
src/pages/daily.astro
```

Daily challenge selection: `hash(dateString) % eligibleProblems.length` with a
difficulty-cycle filter — deterministic, identical for all users, zero backend.

### 3.3 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | events.js + rules.js + tests + gameStore; streak + XP live w/ navbar flame + toasts |
| 2 | Daily challenge page + calendar; badges + profile integration + heatmap |
| 3 | Weekly leagues (Supabase table + RPC + LeagueBoard) — gate on accounts adoption |

---

## 4. Expected Result

### User-visible outcome
The site starts *pulling users back*: a flame in the navbar you don't want to lose, a
daily problem everyone's solving, "+40 XP" moments after every hard-won AC, a profile
that visibly fills with badges and a heatmap that looks like a GitHub graph worth
screenshotting (free marketing when shared).

### Success metrics
- D7 retention of users who reach a 3-day streak ≥ 3× baseline
- ≥ 20% of WAU solve the daily challenge
- Median streak at 30 days post-launch ≥ 4 days among active users
- Zero "lost my streak unfairly" bug reports (timezone tests earn their keep)

### Definition of done / acceptance criteria
- [ ] rules.test.js covers: day boundaries across timezones, DST shift, freeze
      auto-application, freeze banking cap, XP daily cap, first-time-only awards
- [ ] No feature store imports gameStore (events only — verified by grep)
- [ ] Daily challenge is identical for all users on the same date, difficulty cycles
- [ ] All of streak/XP/badges/daily work logged-out; gameStore syncs via 03 when logged in
- [ ] XP toasts are throttled and never interrupt an active interview/review session
- [ ] Heatmap + badges render on the public profile page

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build Phase 1 of gamification for my Astro + React 19 site (dsa-docs/). Read
roadmap/tier-3-growth-stickiness/10-gamification.md and follow the architecture rule
strictly: feature stores emit events; only gameStore consumes them; no feature file
may import gameStore.

Deliver: (1) src/lib/events.js minimal pub/sub; (2) src/lib/game/rules.js pure
functions implementing the XP table, 200/day cap, first-time-only logic, streak
qualification, timezone-safe day boundary (user-local midnight), and streak-freeze
auto-application with a bank cap of 2 — plus Vitest tests covering timezone edges,
DST, freeze paths, and the XP cap; (3) src/store/gameStore.js persisted Zustand store
consuming the events; (4) emit() calls added at the mutation points of judgeStore
(problem.accepted with firstTime flag), srsStore (session completed), planStore (day
completed), and the MCQ store (quiz ≥70% first time); (5) StreakFlame.jsx navbar
widget with freeze indicator and XPToast.jsx (throttled, suppressed while an
interview session is active). Run the tests, then verify in dev: solve a problem →
flame appears + XP toast; solve it again → no duplicate XP.
```
