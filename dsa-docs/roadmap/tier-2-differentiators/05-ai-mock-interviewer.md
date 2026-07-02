# Feature 05 — AI Mock Interviewer

| | |
|---|---|
| **Tier** | 2 — Differentiator |
| **Priority** | ⭐⭐ THE headline feature — this is how we beat the incumbents |
| **Depends on** | Judge (01) for the coding surface; Accounts (03) for saving reports |
| **Effort** | Large (4–6 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
The gap between "can solve LeetCode problems" and "can pass an interview" is enormous,
and no amount of solo grinding closes it. Real interviews test **communication under
observation**: clarifying the problem, thinking aloud, taking hints, handling
follow-ups, discussing trade-offs. Today users have two options: expensive humans
(interviewing.io: $100–225/session; Pramp: free but peer-quality lottery) or nothing.

### Competitive context
- **interviewing.io / Pramp:** human-based — great quality, terrible availability
  and price. Can't practice at 2 AM before your interview.
- **LeetCode's AI interview feature:** shallow — it's a chatbot next to a problem,
  no real rubric, no progressive hinting discipline, no session structure.
- **Our wedge:** a **structured, rubric-driven AI interviewer** integrated with our own
  editor and judge: it watches your actual code, runs your actual tests, gives hints on
  a disciplined ladder, and produces a hiring-committee-style scored report. Available
  24/7, costs us cents per session.

### Why this makes us #1
Every other feature in this roadmap has an equivalent somewhere. A genuinely good AI
interviewer does not exist yet at any price. This is the feature people tweet about.

---

## 2. What to Build

### The session flow (45-minute DSA interview, the v1 format)

```
1. SETUP      — user picks: track (DSA v1), difficulty, duration (25/45 min)
2. INTRO      — AI greets, states format, presents the problem (from judge bank,
                filtered to unsolved problems at the chosen difficulty)
3. CLARIFY    — user asks clarifying questions; AI answers like a real interviewer
                (reveals constraints only when asked — and scores that they asked)
4. SOLVE      — user codes in Monaco (same JudgeEditor); AI receives code snapshots
                on run/idle and responds: nudges, "what's your complexity?",
                "walk me through this loop"
5. HINTS      — strict 3-level ladder, each level logged and scored:
                L1 nudge ("what data structure gives O(1) lookup?")
                L2 approach ("consider a hashmap of value→index")
                L3 pseudocode outline. NEVER writes the solution.
6. FOLLOW-UP  — after AC (or time warning): complexity discussion, one twist
                ("what if the array is sorted?"), edge cases
7. REPORT     — scored rubric (see below), full transcript, verdict, next steps
```

### The rubric (hiring-committee style, 1–5 each)

| Dimension | What the AI evaluates |
|-----------|----------------------|
| Problem comprehension | Asked clarifying questions? Restated the problem? Caught edge cases early? |
| Communication | Thought aloud? Explained approach before coding? Responded to prompts? |
| Correctness | Judge verdicts; bugs found by AI reading code; edge-case handling |
| Complexity & optimization | Stated Big-O correctly? Improved from brute force? |
| Code quality | Naming, structure, idiomatic use of language |
| Hint independence | Score decays with hint ladder depth used |

Final report: per-dimension score + evidence quotes from the transcript + overall
**Strong Hire / Hire / Lean Hire / No Hire** verdict + 3 concrete improvement actions
(each linking to our notes/plans — closing the loop back into the platform).

### Session history
`/interview` lists past sessions: date, problem, verdict, score trend chart.
Reports saved to localStorage → synced via Feature 03.

### Out of scope for v1
- Voice mode (v2 — the architecture must not preclude it; keep transport abstract)
- System design interviews (v2, after Feature 07 provides content)
- Behavioral interviews (Feature 08 reuses this session engine)

---

## 3. How to Build It (in this codebase)

### 3.1 Architecture — the one place we need a backend

```
Browser                           Edge Function (Vercel/Supabase)         Claude API
┌──────────────────────┐          ┌─────────────────────────────┐
│ InterviewSession.jsx │──POST──► │ /api/interview               │──────►  claude-sonnet-5
│  - transcript state  │  turn    │  - holds SYSTEM PROMPT +     │         (system prompt
│  - Monaco snapshots  │          │    problem solution/rubric   │          server-side
│  - judge results     │ ◄─stream─│  - streams response          │          ONLY — never
│  - phase machine     │          │  - rate limit per user/IP    │          shipped to
└──────────────────────┘          └─────────────────────────────┘          client)
```

**Critical security/cost rules:**
- API key + system prompt (which contains the problem's solution and rubric) live ONLY
  in the edge function. Client sends transcript + code + judge results.
- Rate limits: logged-out 1 session/day per fingerprint; logged-in 3/day (tune later;
  this is also the future monetization dial).
- Use `claude-sonnet-5` for in-session turns (fast, cheap); one `claude-opus-4-8`
  call at the end for the report (quality matters most there).
- Cap transcript context: sliding window + running summary after ~30 turns.

### 3.2 The interviewer system prompt (the actual product — iterate hard on this)

Store as versioned files: `src/prompts/interviewer/dsa-v1.md`. Key clauses:

```
You are a senior engineer conducting a real coding interview. Persona: warm but
rigorous; you want the candidate to succeed but you never solve for them.

RULES
- Never write solution code. Never confirm an approach is optimal unprompted —
  ask "can you do better?" instead.
- Hints only when: candidate asks, is silent/stuck > 3 min, or is on a doomed path
  > 5 min. Always use the shallowest useful ladder level. Log every hint as
  [HINT:L1|L2|L3] at the start of that message.
- If the candidate asks a clarifying question, answer as an interviewer would
  (short, factual) and log [CLARIFY-ASKED].
- On each code snapshot: silently diff against last; comment ONLY if there's a bug
  they've moved past, or it's time for "walk me through your approach".
- Time-keeping: at 50%, if no working code, nudge toward brute force first.
  At 85%, move to complexity discussion regardless of state.
- Output structured events inline: [PHASE:solve→followup] so the client state
  machine can track progress.
```

The report prompt is separate (`report-v1.md`): takes full transcript + hint log +
judge results, outputs strict JSON matching the rubric schema (use tool-use /
structured output for reliability).

### 3.3 Files to create

```
api/interview.js  (or supabase/functions/interview/) ← edge fn: chat turns + report
src/prompts/interviewer/dsa-v1.md                    ← interviewer system prompt
src/prompts/interviewer/report-v1.md                 ← report generation prompt
src/components/interview/InterviewLobby.jsx          ← setup screen
src/components/interview/InterviewSession.jsx        ← split view: chat | editor
src/components/interview/InterviewChat.jsx           ← streaming chat, phase banner, timer
src/components/interview/InterviewReport.jsx         ← rubric scores, transcript, verdict
src/components/interview/SessionHistory.jsx
src/store/interviewStore.js                          ← sessions, reports (sync-ready)
src/pages/interview/index.astro
src/pages/interview/session.astro
```

Reuse: `JudgeEditor` + judge workers from Feature 01 (judge results feed both the UI
and the AI's context). Timer + phase machine in the client; AI phase events keep it
honest.

### 3.4 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 (wk 1–2) | Edge function + streaming chat next to JudgeEditor; prompt v0; happy path |
| 2 (wk 3) | Phase machine, hint ladder logging, code-snapshot diffing, timer behaviors |
| 3 (wk 4) | Report generation (structured JSON) + InterviewReport UI + history |
| 4 (wk 5–6) | Prompt iteration against test transcripts; rate limiting; polish; launch |

**Prompt QA:** build a small harness — 10 scripted candidate personas (silent
struggler, hint-fisher, over-talker, instant-solver) replayed against prompt versions;
manually grade AI behavior. The interviewer's quality IS the product.

---

## 4. Expected Result

### User-visible outcome
"Practice a real 45-minute coding interview with an AI interviewer that watches your
code, gives real hints, and scores you like a hiring committee — free, 24/7."
A session that genuinely feels like an interview: mild pressure, real interruptions
("what's the complexity of that?"), and a report that tells you exactly what to fix.

### Success metrics
- ≥ 60% session completion rate (started → report generated)
- ≥ 30% of completers run a second session within a week
- Report "was this accurate?" thumbs-up ≥ 75%
- Cost per session ≤ $0.15 at Sonnet pricing (monitor via edge fn logging)

### Definition of done / acceptance criteria
- [ ] Full session flow works: setup → intro → clarify → solve → hints → follow-up → report
- [ ] AI never emits solution code (verified across the 10-persona test harness)
- [ ] Hint ladder logged correctly and reflected in the independence score
- [ ] Report is valid JSON, renders with evidence quotes, saves to history
- [ ] API key and solution never reach the client (verify in network tab)
- [ ] Rate limiting enforced; graceful "out of sessions today" state
- [ ] Judge integration: AI references actual run/submit results in its comments
- [ ] Works on mobile (chat-over-editor stacked layout)

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build Phase 1 of an AI mock interviewer for my Astro + React 19 site (dsa-docs/). Read
roadmap/tier-2-differentiators/05-ai-mock-interviewer.md and follow its architecture
exactly — especially: system prompt and problem solutions live ONLY server-side.

Deliver: (1) a Vercel edge function api/interview.js that accepts {sessionConfig,
transcript, codeSnapshot, judgeResults}, prepends the system prompt from
src/prompts/interviewer/dsa-v1.md (author v0 of this prompt per the RULES section of
the spec), calls the Claude API (claude-sonnet-5) with streaming, and returns the
stream; include per-IP rate limiting (3/day) and read ANTHROPIC_API_KEY from env;
(2) InterviewLobby + InterviewSession + InterviewChat React components — split-pane
session view reusing the existing JudgeEditor from Feature 01 on the right, streaming
chat with a 45-min countdown timer on the left; (3) interviewStore.js persisting the
active session transcript so a reload resumes it; (4) /interview pages. Wire code
snapshots to send on every judge Run and after 45s of editor idle. Style to match
tokens.css. Verify end-to-end in dev with a real session against two-sum: confirm
streaming works, the AI presents the problem, and it responds to a code snapshot.
```
