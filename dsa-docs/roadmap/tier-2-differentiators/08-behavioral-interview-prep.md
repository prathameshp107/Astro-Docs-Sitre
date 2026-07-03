# Feature 08 — Behavioral Interview Prep (+ AI Practice Partner)

| | |
|---|---|
| **Tier** | 2 — Differentiator |
| **Priority** | Medium-High — most neglected interview surface, cheap to build |
| **Depends on** | Session engine + AI infra from Feature 05; Accounts (03) for saved stories |
| **Effort** | Medium (2–3 weeks; content + one AI mode) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
Candidates over-index on algorithms and then fail the round nobody practiced:
behavioral. At Amazon, the Leadership Principles rounds carry **equal or greater
weight than coding**; at every company, the hiring-manager round is behavioral. And
"tell me about a time you disagreed with your manager" is genuinely hard to answer
well without rehearsal. Engineers systematically undervalue this — which is exactly
why a platform that makes it easy wins loyalty.

### Competitive context
- **Exponent** does behavioral well but is PM-centric and $150/yr.
- **LeetCode/NeetCode:** essentially nothing.
- **Generic ChatGPT:** people do use it, but with no structure, no rubric, no bank,
  no story management.
- **Our wedge:** we already built (Feature 05) a session engine with phases, rubrics,
  and reports. Behavioral is a second "track" on that engine, plus a genuinely useful
  tool nobody has: a **STAR story bank builder** that turns your real experiences into
  reusable, polished interview stories mapped to question categories.

### The insight that shapes the design
Great behavioral interviewing = **8–10 prepared stories, each mappable to 5+ question
types**. The product isn't "practice 500 questions"; it's "build 10 great stories,
then practice retrieving and adapting them under pressure."

---

## 2. What to Build

### 2.1 Question bank (`/behavioral/questions`)
~150 questions, tagged by:
- **Category:** conflict · failure · leadership · ambiguity · delivery/deadlines ·
  disagreement · growth/feedback · cross-team · customer focus · innovation
- **Company style:** Amazon LP (each question mapped to its Leadership Principle),
  Google (Googleyness), Meta (move fast), generic
- **Level:** junior / mid / senior (same question, different expectations — show
  "what a senior answer includes" notes)

Each question page: what the interviewer is really asking · rubric of a strong answer
· common failure modes ("blamed the team", "no measurable result") · 2 sample answers
(good + weak, annotated).

### 2.2 STAR Story Bank (`/behavioral/stories`) — the sticky tool
A guided builder where users write their own stories once, reuse everywhere:

1. Guided form: **S**ituation (2 sentences max — the builder enforces brevity),
   **T**ask, **A**ction (the bulk — "what did YOU do", first-person singular enforced
   by lint-style hints), **R**esult (must contain a number or concrete outcome —
   builder nags if none detected).
2. Tag the story with the categories it can answer (a story about a botched release
   covers: failure, delivery, conflict, growth).
3. **Coverage matrix view:** categories × stories grid showing gaps — "you have no
   story for *disagreement* — here are prompts to jog your memory."
4. **AI polish** (one click, reuses AI proxy): tightens wording, flags missing
   metrics, suggests a stronger result framing. Never invents facts — prompt
   explicitly forbids adding events; it may only ask "can you quantify X?".

Stories are personal data: localStorage + synced (03), marked private, never public.

### 2.3 AI behavioral mock interview (`/interview` — new track on the 05 engine)
- 20-minute session: AI asks 3–4 questions (user picks focus category or company
  style), listens, asks realistic follow-ups ("what would you do differently?",
  "what was YOUR contribution specifically?" when the user says "we" too much).
- Report rubric: **Structure** (followed STAR?) · **Specificity** (concrete details
  vs generalities) · **Ownership** ("I" vs "we" analysis) · **Impact** (quantified
  result?) · **Reflection** (lessons learned) — each 1–5 with quoted evidence.
- If the user has a Story Bank, the report cross-references: "Your answer used your
  'Release rollback' story — consider your 'Migration' story instead for conflict
  questions; it shows more ownership."

### Out of scope for v1
- Voice mode (text first; the engine must not preclude voice — same rule as 05)
- Resume-based question generation ("tell me about this project on your resume") — v2,
  it's a natural extension once story bank adoption is proven

---

## 3. How to Build It (in this codebase)

### 3.1 Files to create

```
src/data/behavioral/questions.json             ← 150 tagged questions
src/data/behavioral/categories.json            ← category defs + memory-jogger prompts
src/content/docs/behavioral/*.mdx              ← guides: STAR method, company styles,
                                                  seniority expectations, question pages
src/components/behavioral/QuestionBank.jsx     ← filterable list (category/company/level)
src/components/behavioral/StoryBuilder.jsx     ← guided STAR form with live hints
src/components/behavioral/CoverageMatrix.jsx   ← categories × stories gap grid
src/components/behavioral/StoryCard.jsx
src/store/storyStore.js                        ← stories (private; sync-ready)
src/prompts/interviewer/behavioral-v1.md       ← new track prompt for the 05 engine
src/prompts/review/story-polish-v1.md          ← AI polish prompt (no-fabrication rules)
src/pages/behavioral/index.astro               ← hub: bank + stories + start-mock CTA
```

Touch points: `InterviewLobby.jsx` (05) gains a "Behavioral" track option; the edge
function routes to the behavioral system prompt; report renderer handles the new rubric.

### 3.2 StoryBuilder "lint" hints (client-side, no AI needed)
- Situation > 2 sentences → "Trim — interviewers lose interest in setup."
- Action section containing < 60% of total words → "The Action is the answer."
- "we" count > "I" count in Action → "Interviewers hire YOU — own your part."
- Result with no digits/percentages → "Add a number: time saved, bugs prevented, users affected."

These cheap heuristics teach the framework even for users who never touch the AI.

### 3.3 Behavioral interviewer prompt — key clauses
```
You are a hiring manager. Ask ONE question at a time from the provided set.
Follow-ups: probe for specificity ("what exactly did you do?"), ownership
(if candidate says "we" 3+ times, ask "what was your individual contribution?"),
and reflection ("what would you do differently?"). One follow-up per answer,
two if the answer was vague. Never coach mid-session — evaluation happens in
the report. Keep your messages under 40 words; you're listening, not talking.
```

### 3.4 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | Question bank data + QuestionBank UI + 5 guide MDX pages (STAR, Amazon LP, etc.) |
| 2 | StoryBuilder + lint hints + CoverageMatrix + storyStore |
| 3 | Behavioral track on the 05 session engine + report rubric |
| 4 | AI story polish + story↔report cross-referencing |

---

## 4. Expected Result

### User-visible outcome
The night-before-interview flow nobody else offers: build/refresh your 10 STAR
stories, see the coverage matrix confirm you can handle any category, run one 20-min
AI mock, get told your "we-to-I ratio" is too high — fix it before it costs you an
offer.

### Success metrics
- ≥ 40% of story-builder users create 3+ stories (the habit threshold)
- Behavioral mock completion rate ≥ 70% (sessions are short; should beat DSA's rate)
- Story bank users return within 30 days at 2× the rate of non-users

### Definition of done / acceptance criteria
- [ ] 150 questions live, filterable, each with rubric + annotated sample answers
- [ ] StoryBuilder enforces STAR with all four lint hints working
- [ ] Coverage matrix correctly maps story tags → category gaps with jogger prompts
- [ ] Behavioral mock runs end-to-end on the 05 engine with its own rubric report
- [ ] AI polish never fabricates events (verified against adversarial test stories)
- [ ] Stories are private: excluded from public profiles, encrypted-at-rest via
      Supabase defaults, exportable via the Feature 03 data export
- [ ] Question pages statically rendered (SEO: "amazon leadership principles questions")

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build Phases 1+2 of Behavioral Interview Prep for my Astro + Starlight + React 19 site
(dsa-docs/). Read roadmap/tier-2-differentiators/08-behavioral-interview-prep.md and
follow its data shapes and file layout.

Deliver: (1) src/data/behavioral/questions.json with 60 high-quality questions to
start (I'll expand later) tagged by category/companyStyle/level per the spec —
write real, thoughtful rubrics and failure modes for each, and map Amazon questions
to actual Leadership Principles; (2) categories.json with memory-jogger prompts;
(3) QuestionBank.jsx with category/company/level filters matching our existing lab
list UI patterns; (4) StoryBuilder.jsx implementing the guided STAR form with all
four client-side lint hints from §3.2, plus storyStore.js (Zustand, persisted,
private); (5) CoverageMatrix.jsx grid of categories × stories highlighting gaps;
(6) /behavioral hub page and MDX guides for the STAR method and Amazon LP style.
Style with tokens.css variables, both themes. Verify in dev: create two stories,
confirm lint hints trigger correctly, and check the matrix shows covered vs gap
categories.
```
