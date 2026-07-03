# 🗺️ Feature Roadmap — World #1 Interview Prep Platform

This folder contains in-depth build specifications for every feature needed to evolve
**DSA & Dev Notes** from a content + practice site into the world's best software
developer interview preparation platform.

Each spec file answers: **Why we need it → What to build → How to build it (in this
codebase) → Expected result → Acceptance criteria**, and ends with a ready-to-use
**AI Build Prompt** you can paste into Claude Code to start implementation.

---

## The Core Insight

Today the platform is a **content + practice sandbox**. The platforms we compete with
(LeetCode, NeetCode, AlgoExpert, GreatFrontEnd, Exponent, interviewing.io) all have one
thing we don't: a **feedback loop** — users are judged, tracked, scheduled, and coached.
That loop drives daily return, and daily return is what makes a platform #1.

```
  Tier 1 builds the LOOP        →  judge, plans, accounts, spaced repetition
  Tier 2 builds the DIFFERENCE  →  AI interviewer, AI review, system design, behavioral
  Tier 3 builds the STICKINESS  →  company tracks, gamification, analytics, community, PWA
```

---

## Build Order (recommended)

| # | Feature | Tier | Depends On | Effort |
|---|---------|------|-----------|--------|
| 1 | [Online Judge](tier-1-core-loop/01-online-judge.md) | 1 | — | Large |
| 2 | [Study Plans](tier-1-core-loop/02-study-plans.md) | 1 | — | Medium |
| 3 | [Accounts & Progress Sync](tier-1-core-loop/03-user-accounts-progress.md) | 1 | — | Medium |
| 4 | [Spaced Repetition](tier-1-core-loop/04-spaced-repetition.md) | 1 | #3 | Medium |
| 5 | [AI Mock Interviewer](tier-2-differentiators/05-ai-mock-interviewer.md) | 2 | #1, #3 | Large |
| 6 | [AI Code Review](tier-2-differentiators/06-ai-code-review.md) | 2 | #1 | Medium |
| 7 | [System Design Hub](tier-2-differentiators/07-system-design-hub.md) | 2 | — | Large |
| 8 | [Behavioral Prep](tier-2-differentiators/08-behavioral-interview-prep.md) | 2 | #5 (shares AI infra) | Medium |
| 9 | [Company Tracks](tier-3-growth-stickiness/09-company-tracks.md) | 3 | #1, #2 | Medium |
| 10 | [Gamification](tier-3-growth-stickiness/10-gamification.md) | 3 | #3 | Medium |
| 11 | [Analytics Dashboard](tier-3-growth-stickiness/11-analytics-dashboard.md) | 3 | #3, #4 | Medium |
| 12 | [Community & Discussions](tier-3-growth-stickiness/12-community-discussions.md) | 3 | #3 | Large |
| 13 | [PWA & Offline Mode](tier-3-growth-stickiness/13-pwa-offline.md) | 3 | — | Small |

---

## Architectural Ground Rules (apply to every feature)

1. **Serverless-first.** Everything that CAN run in the browser DOES (judge, SRS,
   analytics computation). Only auth/sync and AI proxying need a backend
   (Supabase free tier + a thin edge function for AI calls). Hosting stays free.
2. **localStorage-first, sync-later.** Every feature must work logged-out with
   localStorage, then transparently sync when the user signs in. No feature may
   hard-require an account.
3. **Reuse the existing stack.** Astro + Starlight, React 19, Zustand, Monaco,
   Pyodide, SQL.js, D3/React Flow, Framer Motion, Tailwind. No new heavy deps
   without justification.
4. **Content stays in-repo.** Problems, plans, questions live as JSON/MDX in
   `src/data/` and `src/content/` — versioned, reviewable, SEO-indexable.
5. **Every page is an SEO asset.** Static-render everything renderable; each
   problem/plan/question gets its own URL, meta tags, and structured data.

---

## Folder Map

```
roadmap/
├── README.md                          ← you are here
├── tier-1-core-loop/                  ← the retention loop (build first)
│   ├── 01-online-judge.md
│   ├── 02-study-plans.md
│   ├── 03-user-accounts-progress.md
│   └── 04-spaced-repetition.md
├── tier-2-differentiators/            ← how we beat the incumbents
│   ├── 05-ai-mock-interviewer.md
│   ├── 06-ai-code-review.md
│   ├── 07-system-design-hub.md
│   └── 08-behavioral-interview-prep.md
└── tier-3-growth-stickiness/          ← retention & distribution
    ├── 09-company-tracks.md
    ├── 10-gamification.md
    ├── 11-analytics-dashboard.md
    ├── 12-community-discussions.md
    └── 13-pwa-offline.md
```
