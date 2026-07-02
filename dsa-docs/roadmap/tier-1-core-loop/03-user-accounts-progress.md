# Feature 03 — User Accounts & Progress Sync

| | |
|---|---|
| **Tier** | 1 — Core Loop |
| **Priority** | ⭐ High — unlocks retention, gamification, analytics, community |
| **Depends on** | Nothing; syncs stores created by 01, 02, 04 and the existing MCQ store |
| **Effort** | Medium (2 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
All progress today lives in `localStorage`: one browser, one device, wiped by a cache
clear. A user who studies on their office laptop and phone sees two different sites.
Worse, **without identity there is no retention machinery** — no streaks that survive
devices, no "welcome back", no email nudges ever, no public profiles, no leaderboards,
no community. Every top platform is account-based for this reason.

### Competitive context
Every competitor requires an account for progress. Our twist: **accounts optional,
never a wall**. Everything works logged-out (localStorage); signing in adds sync,
backup, and identity. "No signup required" is a real acquisition advantage —
GreatFrontEnd and AlgoExpert gate almost everything, and users hate it.

### Why now
Features 04 (SRS), 10 (gamification), 11 (analytics), 12 (community) all consume
identity. Building sync EARLY, while there are only 2–3 stores, is 10× easier than
retrofitting it across ten stores later. This is the architectural keystone.

---

## 2. What to Build

### User stories
1. As a user, I can use the entire site logged-out, forever, with localStorage.
2. As a user, I click **Sign in** → GitHub or Google OAuth (one click, no password) →
   my existing local progress is **merged up** to my account, never lost.
3. As a user, on any other device I sign in and see the same progress within seconds.
4. As a user, I have a **profile page** (`/u/[username]`): avatar, join date, solved
   count by difficulty, active plans, streak (once Feature 10 exists).
5. As a user, I can export all my data as JSON and delete my account (GDPR-friendly).

### Scope — v1
- **Provider:** Supabase (free tier: 50k MAU auth, 500 MB Postgres, RLS). Astro has
  first-class Supabase integration; no server of our own needed.
- **Auth methods:** GitHub + Google OAuth only (target audience = developers; no
  password flows to build or secure).
- **Sync engine:** a small `syncManager` that wraps the existing Zustand
  persist stores — debounced push on change, pull + merge on sign-in/load.
- **Merge policy:** per-key union with "most progress wins": solved beats attempted,
  done beats not-done, later timestamp wins for drafts/code.
- **Profile page:** public by default with opt-out; username claimed at first sign-in.

### Out of scope for v1
- Email magic links, password auth
- Realtime multi-tab sync (last-write-wins is fine)
- Followers/social graph (Feature 12 territory)

---

## 3. How to Build It (in this codebase)

### 3.1 Data model (Supabase Postgres)

```sql
-- profiles: one row per user
create table profiles (
  id uuid primary key references auth.users,
  username text unique not null,
  avatar_url text,
  is_public boolean default true,
  created_at timestamptz default now()
);

-- progress: one row per user per store ("judge", "plans", "mcq", "srs", …)
create table progress (
  user_id uuid references auth.users,
  store text not null,
  data jsonb not null,
  updated_at timestamptz default now(),
  primary key (user_id, store)
);

-- RLS: users read/write only their own progress; profiles readable if is_public
alter table progress enable row level security;
create policy "own progress" on progress
  for all using (auth.uid() = user_id);
```

One JSONB blob per store keeps the schema stable as stores evolve — no migrations when
a store adds a field. (Move hot paths to real tables only if/when leaderboards need
queries across users — Feature 10 can add a `stats` table then.)

### 3.2 Sync engine design

```
                 ┌────────────── on sign-in / page load ──────────────┐
                 ▼                                                     │
   pull remote blob ──► merge(remote, local) ──► set store ──► push merged
                 ▲
   on store change (debounced 3 s, and on visibilitychange/pagehide)
                 └── push local blob if authenticated
```

```js
// src/lib/sync/syncManager.js
registerStore("judge", useJudgeStore, mergeJudge);
registerStore("plans", usePlanStore, mergePlans);
// each merge fn: (remote, local) => merged   — pure, unit-tested

// merge example for judge store
function mergeJudge(a = {}, b = {}) {
  return {
    solved: mergeMap(a.solved, b.solved, (x, y) =>
      x === "accepted" || y === "accepted" ? "accepted" : "attempted"),
    submissions: mergeMap(a.submissions, b.submissions,
      (x, y) => dedupeByTs([...(x||[]), ...(y||[])])),
    drafts: mergeMap(a.drafts, b.drafts, latestByTimestamp)
  };
}
```

Key properties: **merge is pure and unit-tested** (this is the one piece of code that
can destroy user data — test it hard); pushes are debounced and fire-and-forget;
offline is a no-op (localStorage remains source of truth until next successful pull).

### 3.3 Files to create

```
src/lib/supabase.js                     ← client init (public anon key)
src/lib/sync/syncManager.js             ← register/pull/merge/push engine
src/lib/sync/merges.js                  ← per-store merge functions + tests
src/components/auth/AuthButton.jsx      ← navbar: Sign in / avatar dropdown
src/components/auth/AuthProvider.jsx    ← session context, triggers sync on auth change
src/components/profile/ProfileCard.jsx
src/pages/u/[username].astro            ← public profile (SSR or client-fetch)
src/pages/auth/callback.astro           ← OAuth redirect handler
src/store/authStore.js                  ← session, username, sync status
```

Env: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` (safe to expose; RLS enforces
access). Configure GitHub/Google OAuth apps in Supabase dashboard.

> **Hosting note:** GitHub Pages is static-only — fine, because Supabase is called
> directly from the browser. If deploying the profile page with SSR, use Vercel.

### 3.4 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | Supabase project, schema + RLS, AuthButton with GitHub OAuth end-to-end |
| 2 | syncManager + merge fns for judge/plans/mcq stores + unit tests for merges |
| 3 | Google OAuth, username claim flow, profile page, data export/delete |
| 4 | Sync status indicator (☁️ synced / syncing / offline), edge-case hardening |

---

## 4. Expected Result

### User-visible outcome
A "Sign in with GitHub" button in the navbar. One click and progress follows the user
everywhere; a shareable `/u/username` page shows their stats. Users who don't sign in
notice nothing changed.

### Success metrics
- ≥ 15% of weekly active users authenticated within 2 months of launch
- Zero data-loss reports from merge (the metric that actually matters)
- Sync round-trip < 1.5 s p95 on sign-in

### Definition of done / acceptance criteria
- [ ] Full site works logged-out; no feature gated on auth
- [ ] Sign-in merges local → remote without losing any solved/plan/MCQ progress
      (unit tests cover: fresh account, conflicting devices, empty remote, empty local)
- [ ] Second device pulls identical state after sign-in
- [ ] RLS verified: user A cannot read/write user B's progress rows
- [ ] Profile page renders public stats; respects `is_public = false`
- [ ] Export-my-data returns complete JSON; delete-account removes all rows
- [ ] Stores gain no Supabase imports — sync stays isolated in `src/lib/sync/`

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Implement user accounts + progress sync for my Astro + React 19 site (dsa-docs/) using
Supabase. Read roadmap/tier-1-core-loop/03-user-accounts-progress.md and follow its
schema, merge policy, and file layout exactly.

Deliver: (1) src/lib/supabase.js client using PUBLIC_SUPABASE_URL/ANON_KEY env vars;
(2) SQL migration file (supabase/migrations/) with profiles + progress tables and RLS
policies as specified; (3) src/lib/sync/syncManager.js implementing registerStore /
pull-merge-push with 3s debounce and pagehide flush; (4) src/lib/sync/merges.js with
pure merge functions for the judge, plan, and MCQ stores plus Vitest unit tests
covering fresh-account, two-device-conflict, empty-remote, and empty-local cases;
(5) AuthProvider + AuthButton (GitHub OAuth) wired into the existing Navbar component,
with a first-sign-in username claim dialog; (6) /u/[username].astro public profile
showing solved counts by difficulty and active plans. Do NOT import supabase inside
any Zustand store — sync stays in src/lib/sync/. Everything must keep working fully
logged-out. Run the merge unit tests to verify.
```
