# Feature 09 — Company-Specific Interview Tracks

| | |
|---|---|
| **Tier** | 3 — Growth & Stickiness |
| **Priority** | High within Tier 3 — massive SEO surface + high purchase-intent traffic |
| **Depends on** | Judge (01) company tags, Study Plans (02) engine; Behavioral (08) enriches |
| **Effort** | Medium (2 weeks engine reuse + ongoing content) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
Nobody prepares for "interviews" — they prepare for **the Google interview in 3
weeks**. The moment a user has a real interview scheduled, their search behavior
changes: "google interview questions", "amazon SDE interview process", "TCS NQT
pattern". Right now we answer none of those queries, and generic prep content feels
irrelevant to someone with a named target and a date.

### Competitive context
- **LeetCode Premium's #1 selling point** is literally company-tagged questions —
  it's the feature people pay $35/mo for.
- **Glassdoor/GeeksforGeeks experiences:** high traffic, terrible structure.
- **Our wedge:** we give away company tagging free (our problems already have a
  `companies` field from Feature 01), AND we structure it better: not just a question
  list but a full track — process map, round-by-round expectations, curated plan,
  the right MCQs, the right behavioral style. LeetCode has the tags; we have the
  **whole pipeline per company** because Features 01/02/04/08 compose.

### Strategic note for our market
Include India-focused targets (TCS, Infosys, Wipro service companies + Flipkart,
Swiggy, Zomato, Razorpay product companies) alongside FAANG — that's an enormous,
underserved audience that US-centric platforms ignore.

---

## 2. What to Build

### 2.1 Company track page (`/companies/[slug]`) — the template

1. **Process map** — visual timeline of rounds (OA → phone → onsite loop → HM →
   offer), duration, what each round tests. Rendered from JSON so it's consistent.
2. **What's different here** — the 5 things that distinguish this company (Amazon:
   LPs woven into every round; Google: follow-up depth; TCS: aptitude + NQT format).
3. **Curated problem set** — judge problems tagged with this company, ordered by
   reported frequency, with solved-status from the user's judgeStore.
4. **The plan** — a company Study Plan (Feature 02 engine, `companyTrack: true`):
   "Amazon SDE in 3 weeks" mixing problems + system design + LP behavioral prep.
5. **Behavioral fit** — links into Feature 08 filtered to this company's style.
6. **Salary/level context** — levels table (L4/L5… or their equivalent), links out to
   levels.fyi (don't maintain salary data ourselves — it rots).
7. **Recent experiences** — v1: curated/summarized from public sources with
   attribution; v2: user-submitted via Feature 12 (community).

### 2.2 Launch set — 12 companies
FAANG+: Google, Amazon, Meta, Microsoft, Apple, Netflix
India product: Flipkart, Swiggy, Razorpay, Zomato
India services: TCS, Infosys

### 2.3 Company directory (`/companies`)
Card grid with logo, difficulty rating, question count, "start track" CTA; filter by
region/type. Plus a "request a company" vote box (tells us what to author next).

### Out of scope for v1
- User-submitted interview experiences (needs Feature 12 moderation)
- Frequency data claiming precision we don't have — use Low/Medium/High bands with
  an honesty note about sourcing

---

## 3. How to Build It (in this codebase)

### 3.1 Data model (`src/data/companies/*.json`)

```jsonc
{
  "id": "amazon",
  "name": "Amazon",
  "region": ["us", "india"],
  "type": "product",
  "difficulty": 4,
  "rounds": [
    { "name": "Online Assessment", "duration": "105 min",
      "tests": ["2 DSA problems", "work simulation"], "tips": "…" },
    { "name": "Phone Screen", "duration": "60 min",
      "tests": ["1–2 DSA + 1 LP question"], "tips": "…" }
    // …
  ],
  "distinctives": ["Every round includes Leadership Principle questions…", "…"],
  "problemFrequency": { "two-sum": "high", "lru-cache": "high" },   // band, not rank
  "planRef": "amazon-sde-3-weeks",          // Feature 02 plan id
  "behavioralStyle": "amazon-lp",           // Feature 08 filter key
  "levelsNote": "SDE I (L4) … SDE III (L7)",
  "sources": ["…public attribution links…"]
}
```

### 3.2 Files to create

```
src/data/companies/*.json                    ← 12 company defs
src/data/plans/company-*.json                ← 12 company plans (Feature 02 format)
src/components/companies/ProcessMap.jsx      ← round timeline (horizontal stepper)
src/components/companies/CompanyDirectory.jsx
src/components/companies/CompanyProblemList.jsx  ← reuses ProblemList w/ company filter
src/pages/companies/index.astro
src/pages/companies/[slug].astro             ← static paths from data
```

Reuse ratio is the point: problems come from 01, plans render via 02's PlanDetail,
behavioral links into 08. New code is mostly ProcessMap + page assembly.

### 3.3 SEO (this feature is 50% an SEO play)
- Title pattern: "Amazon SDE Interview Process & Questions (2026) — Free Prep Track"
- FAQ structured data on each page ("How many rounds…", "How hard is…")
- Keep pages fresh: `lastVerified` date in JSON, shown on page; quarterly review task

### 3.4 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | Schema + ProcessMap + [slug] page assembled from existing components; Amazon + Google live |
| 2 | Directory page; 4 more FAANG+ companies + their plans |
| 3 | India set (6 companies) + their plans; FAQ structured data |

---

## 4. Expected Result

### User-visible outcome
A user with "Amazon interview, March 15" opens `/companies/amazon` and finds
everything: how the loop works, what's different, exactly which problems to grind (with
their solve-status), a 3-week plan to follow, and LP behavioral prep — free, where
LeetCode charges $35/mo for the tags alone.

### Success metrics
- Company pages = top-3 organic traffic source within 6 months
- ≥ 35% of company-page visitors start the company plan or solve a problem
- Track-followers' 4-week retention ≥ 2× site average (they have a deadline — highest-intent users on the platform)

### Definition of done / acceptance criteria
- [ ] 12 company pages live, all sections populated, every problem/plan/behavioral ref resolves
- [ ] Each company has a working plan on the Feature 02 engine
- [ ] Problem lists show live solved-status; frequency shown as bands with source note
- [ ] ProcessMap renders any rounds JSON; mobile = vertical stepper
- [ ] FAQ structured data validates in Google's Rich Results test
- [ ] `lastVerified` visible on every page; no salary figures maintained in-repo

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build company interview tracks for my Astro + React 19 site (dsa-docs/). Read
roadmap/tier-3-growth-stickiness/09-company-tracks.md and follow the JSON schema and
reuse strategy exactly — problems from the judge (01), plans via the Study Plan engine
(02), behavioral links to (08).

Deliver Phase 1: (1) the company JSON schema instantiated for Amazon and Google with
accurate, well-researched round structures, distinctives, and tips (mark
lastVerified with today's date, cite public sources); (2) ProcessMap.jsx — horizontal
round stepper (vertical on mobile) with duration and expandable tips per round;
(3) /companies/[slug].astro assembling: hero, ProcessMap, distinctives, company-filtered
problem list with solved badges (reuse ProblemList from Feature 01), embedded plan
progress (reuse PlanDetail from 02), behavioral link section; (4) an
"amazon-sde-3-weeks" plan JSON on the Feature 02 schema mixing judge problems, system
design case studies, and behavioral items; (5) /companies directory page with card
grid and region/type filters. Add FAQ structured data (JSON-LD) with 4 questions per
company page. Verify in dev: both company pages render, problem solved-status shows,
plan starts correctly.
```
