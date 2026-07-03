# Feature 12 — Community: Discussions, Solutions & Interview Experiences

| | |
|---|---|
| **Tier** | 3 — Growth & Stickiness |
| **Priority** | Medium — build LAST in Tier 3, only after real traffic exists |
| **Depends on** | Accounts (03) hard requirement; Judge (01) for solution threads |
| **Effort** | Large (3–4 weeks + permanent moderation cost) |
| **Status** | 📋 Planned — ⚠️ gated on traffic threshold (see §1) |

---

## 1. Why We Need This (and why NOT yet)

### The problem
Learning alone is demoralizing, and a solved problem teaches half of what reading five
other people's solutions does. LeetCode's discussion tabs and solution threads are
arguably half its moat — user-generated content that compounds, ranks on Google, and
costs LeetCode nothing to produce. Interview experiences ("Amazon SDE onsite, March
2026") are the highest-value UGC in this domain and directly feed Feature 09.

### The honest warning — sequencing matters more than features here
An empty forum is **worse than no forum**: it broadcasts "nobody uses this site."
Community is the only feature in this roadmap that fails by existing too early.

**Gate: do not ship this until ≥ 500 weekly active authenticated users, OR seed every
surface with quality content yourself first.** Until then, run community
off-platform (a Discord link costs nothing and validates demand).

### Our wedge when we do build it
- **Verified solutions:** a solution post on our platform can carry an **"AC-verified"
  badge** — the judge (01) re-runs the posted code against the test suite before the
  post publishes. LeetCode solution threads are full of broken code; ours provably run.
- Structured interview experiences (template-driven) that render INTO company pages
  (09) rather than rotting in a forum.

---

## 2. What to Build

### 2.1 Solution threads (per problem — the highest-value surface)
- After (and only after) your first AC on a problem, you can **publish a solution**:
  title, language, approach tags (hashmap / two-pointer / …), complexity claim,
  markdown write-up, and the code — which the judge re-runs before publishing;
  passing earns the ✅ AC-verified badge on the post.
- Readers: upvote, sorted by votes within language/approach filters; collapsible code.
- "Editorial + top 3 community solutions" become visible on the problem page after
  the reader's own AC (or explicit give-up) — same spoiler rule as the editorial.

### 2.2 Q&A discussions (per problem + per note page)
- Lightweight thread: question → replies, markdown + code blocks, upvotes.
- Attached to a **specific page** (problem or note) — context-bound, not a general
  forum (general forums die; page-bound Q&A compounds like Stack Overflow).

### 2.3 Interview experiences (template-enforced UGC)
- Structured form: company · role · level · date (month granularity) · outcome
  (offer/reject/no-answer — optional) · rounds, each with type + free-text +
  problem tags ("was asked something like Two Sum" → links the judge problem).
- Renders into the company page (09) "Recent experiences" section after moderation.
- Anonymized by default (shows "SDE candidate, Mar 2026", not username, unless opted in).

### 2.4 Moderation (the feature that decides whether this survives)
- **Layer 1 — automated:** rate limits (3 posts/day new accounts), link limits,
  AI screening via the 05 proxy (spam/toxicity/low-effort classifier → hold queue).
- **Layer 2 — human:** admin review queue (approve/reject/ban) — a simple
  `/admin/moderation` page gated to admin user IDs.
- **Layer 3 — community:** report button; auto-hide at 3 reports pending review;
  trusted-user flag (level ≥ N from Feature 10) skips the hold queue.
- Every post soft-deletes (audit trail); banned users' content mass-retractable.

### Out of scope for v1
- DMs, follows, notifications-on-reply (each is a big lift; revisit at 5k WAU)
- General/off-topic forum (never — page-bound only)
- Comments on plans/visualizers (start with problems + notes only)

---

## 3. How to Build It (in this codebase)

### 3.1 Data model (Supabase — extends the 03 schema)

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  author uuid references profiles(id),
  kind text not null,              -- 'solution' | 'question' | 'reply' | 'experience'
  page_ref text not null,          -- 'problem:two-sum' | 'note:/javascript/closures' | 'company:amazon'
  parent_id uuid references posts(id),
  title text, body markdown_text, code text, lang text,
  meta jsonb,                      -- approach tags, complexity, experience template fields
  ac_verified boolean default false,
  status text default 'pending',   -- 'pending' | 'live' | 'hidden' | 'deleted'
  created_at timestamptz default now()
);
create table votes ( post_id uuid, user_id uuid, primary key (post_id, user_id) );
create table reports ( post_id uuid, user_id uuid, reason text, created_at timestamptz,
                       primary key (post_id, user_id) );
-- RLS: read live posts; authors read own pending; write = authenticated + rate rules;
-- moderation status changes = admin role only (Supabase custom claim)
```

**AC-verification flow:** client runs the posted code through the local judge worker →
sends the verdict + a hash of (code + problem tests version) → an edge function
re-checks the hash matches the current problem version before setting `ac_verified`.
(Client-side judging means verification is advisory, not cryptographic — accept this,
label the badge "runs against our tests as of {date}".)

### 3.2 Files to create

```
supabase/migrations/xxx_community.sql
api/moderate.js                             ← AI screen on submit (reuses 05 proxy infra)
src/components/community/SolutionList.jsx   ← tab on problem page, spoiler-gated
src/components/community/SolutionComposer.jsx  ← gated on user's AC; judge-verify step
src/components/community/ThreadView.jsx / PostComposer.jsx / VoteButton.jsx
src/components/community/ExperienceForm.jsx / ExperienceCard.jsx
src/components/community/ReportButton.jsx
src/pages/admin/moderation.astro            ← queue UI, admin-gated
src/store/communityStore.js                 ← cache + optimistic votes
```

Touch points: problem page (01) gains Solutions + Discussion tabs; note pages gain a
Discussion footer island; company pages (09) render approved experiences.

### 3.3 Build phases

| Phase | Deliverable |
|-------|-------------|
| 0 | Discord link in navbar TODAY (zero code, validates demand while we wait for the gate) |
| 1 | Schema + RLS; solution threads with AC-verify + votes on 20 seeded problems |
| 2 | Page-bound Q&A on problems + notes; moderation layers 1–2 |
| 3 | Interview experiences + company-page integration; reports + trusted users |

**Seeding requirement before public launch:** author 2 solutions per top-50 problem
and 1 experience per launch company yourself/with friends. Empty threads kill this.

---

## 4. Expected Result

### User-visible outcome
Every problem page becomes three products: the problem, a Solutions tab where every
top answer provably runs, and a Discussion tab where someone already asked your
question. Company pages fill with fresh, structured, real interview reports. UGC
starts compounding — content that writes itself and ranks on Google.

### Success metrics
- ≥ 5% of users who AC a problem read solutions; ≥ 1% publish one
- ≥ 80% of published solutions carry the AC-verified badge
- Moderation queue median wait < 24 h; spam rate on live content < 1%
- 20+ interview experiences submitted in the first quarter post-launch

### Definition of done / acceptance criteria
- [ ] Traffic gate confirmed (≥ 500 weekly authenticated actives) OR seeding complete
- [ ] Solutions publishable only after own AC; verify-on-publish works; badge labeled honestly
- [ ] Spoiler gating: solutions/discussions hidden pre-AC exactly like the editorial
- [ ] RLS verified: no path for a non-admin to change post status or read others' pending posts
- [ ] All three moderation layers functional; soft-delete + author-mass-retract work
- [ ] Experiences render on company pages, anonymized by default
- [ ] Optimistic votes reconcile correctly on failure (no phantom counts)

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build Phase 1 of community features for my Astro + React 19 + Supabase site
(dsa-docs/). Read roadmap/tier-3-growth-stickiness/12-community-discussions.md first
— note the traffic gate; we are building behind a feature flag
(PUBLIC_COMMUNITY_ENABLED) for seeding, not launching publicly.

Deliver: (1) supabase/migrations SQL for posts/votes/reports exactly per the spec
schema with RLS policies (read live; authors read own pending; admin-only status
changes via custom claim); (2) SolutionComposer.jsx — gated on judgeStore showing AC
for that problem, with a mandatory verify step that re-runs the pasted code through
the existing judge worker and blocks publish on failure; (3) SolutionList.jsx as a new
tab on the problem page, spoiler-gated behind the reader's own AC (reuse the
editorial's gating logic), with language/approach filters, vote sorting, and
optimistic VoteButton; (4) communityStore.js with post cache and optimistic-vote
reconciliation; (5) a minimal /admin/moderation.astro queue page (approve/reject)
gated to an ADMIN_USER_IDS env list. Verify: publish a working solution end-to-end,
confirm a broken solution is blocked, confirm a second account cannot see the pending
post, and approve it from the moderation queue.
```
