# Feature 06 — AI Code Review & Complexity Coach

| | |
|---|---|
| **Tier** | 2 — Differentiator |
| **Priority** | High — cheapest AI feature to ship, immediate wow factor |
| **Depends on** | Judge (01); shares the AI edge-function infra with Feature 05 |
| **Effort** | Medium (1.5–2 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
Getting `Accepted` teaches you that your code *works* — not that it's *good*. The gap
between "passes tests" and "impresses an interviewer" is exactly what candidates can't
see themselves: an O(n²) solution that squeaks under the time limit, a working but
unidiomatic mess, missed edge cases the tests happened not to cover, variable names
that make an interviewer wince. Today, after AC, we show a static editorial and the
learning stops.

### Competitive context
- LeetCode shows runtime percentiles (a number, not feedback) and community solutions
  (you must diagnose your own gap).
- AlgoExpert has fixed video explanations — not feedback on *your* code.
- **Nobody reviews the user's actual submission like a senior engineer would.** With
  the judge (01) giving us the code + verdict + runtime, and the AI proxy (05) giving
  us infrastructure, this feature is a thin, high-value layer on top of both.

### Why it multiplies other features
Every review deep-links to our notes ("read: hashmaps") and can push weak areas into
the SRS (04) and analytics (11). It converts a one-time AC into a learning loop.

---

## 2. What to Build

### User stories
1. As a user, after any submission (AC or not), I click **"AI Review"** and within
   ~5 seconds get a structured review of *my* code.
2. As a user with a **failing** submission, the review explains *why* it fails
   (references the failing test), and gives a Socratic hint — not the fix — unless I
   click "just show me".
3. As a user with an **accepted** submission, the review gives:
   - **Complexity analysis** — stated time/space with line-level reasoning ("this
     `.includes` inside the loop makes it O(n²)")
   - **Optimality check** — "optimal" or "an O(n) approach exists — want a hint?"
   - **Code quality notes** — max 3, prioritized (naming, idiom, structure)
   - **Edge-case audit** — inputs that would break it even though tests passed
   - **Interviewer's one-liner** — "In an interview, I'd push you on X"
4. As a user, I can ask **follow-up questions** in a short chat under the review.
5. As a user, each review offers one-click actions: "Add complexity card to Review
   deck" (SRS), "Read the hashmap note", "Try the follow-up problem".

### Scope — v1
- Review button on the judge's ResultsPanel + SubmissionHistory entries.
- One review per submission cached forever (localStorage) — re-review only on new code.
- Follow-up chat capped at 5 turns per review.
- Rate limit: 10 reviews/day logged-in, 3 logged-out (same limiter infra as 05).

### Out of scope for v1
- Reviewing arbitrary pasted code (playground integration — v2)
- Line-by-line inline annotations in Monaco (v2; v1 renders review as a panel)

---

## 3. How to Build It (in this codebase)

### 3.1 Architecture
Reuses the Feature 05 edge function pattern — a second endpoint:

```
POST /api/review
  body: { problemId, code, lang, verdict, runtimeMs, failedCase? , followUp?: [turns] }
  server: loads problem JSON (statement, constraints, editorial, optimal complexity)
          + review system prompt → claude-sonnet-5 → structured JSON response
```

The server knowing the editorial/optimal-complexity (from the problem JSON, server
side) is what lets the AI say "an O(n) approach exists" with confidence instead of
guessing.

### 3.2 Structured review schema (force via tool-use / structured output)

```jsonc
{
  "verdictExplanation": "…only when verdict != AC…",
  "complexity": { "time": "O(n^2)", "space": "O(1)",
                  "reasoning": "The .includes() on line 4 scans the array inside the loop." },
  "isOptimal": false,
  "optimalHint": "Can you trade space for time with a lookup structure?",
  "qualityNotes": [ { "severity": "minor", "note": "`temp` on line 6 → name it `seen`." } ],
  "edgeCases": [ "empty array", "all duplicates", "negative numbers" ],
  "interviewerTake": "I'd ask you to improve the complexity before moving on.",
  "links": [ { "label": "Hashmap patterns note", "href": "/data-structures/hashmaps" } ],
  "srsCard": { "front": "Optimal complexity for Two Sum & why?", "back": "O(n) — single pass with a value→index hashmap." }
}
```

Structured JSON (not free text) so the UI renders consistent, scannable cards and the
one-click SRS action is machine-readable.

### 3.3 Review system prompt — key clauses (`src/prompts/review/dsa-v1.md`)

```
You are a senior engineer reviewing an interview candidate's submission.
- Be specific to THEIR code: quote line numbers and identifiers. Never give a
  generic editorial.
- Failing code: explain the failure mechanism via the provided failing test.
  Give a Socratic hint. Provide the fix ONLY if request.revealFix is true.
- Accepted code: complexity with line-level reasoning; compare against the known
  optimal (provided server-side); max 3 quality notes, most important first.
- Tone: direct, kind, zero filler. You are not a cheerleader.
- Output ONLY the JSON schema provided.
```

### 3.4 Files to create

```
api/review.js                              ← edge function (share limiter util with 05)
src/prompts/review/dsa-v1.md               ← review system prompt
src/components/judge/AIReviewPanel.jsx     ← renders schema: complexity card, notes,
                                              edge cases, action buttons, follow-up chat
src/store/reviewStore.js                   ← cache: submissionHash → review JSON
```

Touch points: `ResultsPanel.jsx` gains the "AI Review" button; `AIReviewPanel` action
buttons call `srsStore.addCard(review.srsCard)` (04) and link to notes.

### 3.5 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | /api/review endpoint + prompt v0 + structured output validated on 10 real submissions |
| 2 | AIReviewPanel UI (both AC and failing states) + caching + rate limits |
| 3 | Follow-up chat (5 turns), SRS card action, note deep links |

---

## 4. Expected Result

### User-visible outcome
Every submission gets a "senior engineer looked at my code" moment: precise complexity
reasoning about *their* lines, the two things an interviewer would nitpick, and the
edge case they didn't think of. For failing code: an explanation that teaches rather
than a solution that spoils.

### Success metrics
- ≥ 35% of submissions request a review (button CTR)
- Thumbs-up rating on reviews ≥ 80%
- ≥ 15% of reviews result in a resubmission with improved complexity (the real win)
- Cost ≤ $0.02 per review

### Definition of done / acceptance criteria
- [ ] Review returns valid schema JSON for AC, WA, TLE, and RE submissions
- [ ] Complexity reasoning references actual line numbers/identifiers from user code
- [ ] Failing-code path never reveals the fix unless explicitly requested
- [ ] Reviews cached by code-hash; identical resubmission costs zero API calls
- [ ] "Add to Review deck" creates a valid SRS card once (idempotent)
- [ ] Rate limits enforced with a graceful out-of-quota state
- [ ] Renders cleanly in both themes and on mobile

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build the AI code review feature for my Astro + React 19 site (dsa-docs/). Read
roadmap/tier-2-differentiators/06-ai-code-review.md and follow the schema and prompt
clauses exactly. Prereq: the judge (Feature 01) and the api/interview.js edge function
(Feature 05) already exist — reuse the same rate-limiter util and env config.

Deliver: (1) api/review.js edge function that loads the problem JSON server-side,
builds the review prompt from src/prompts/review/dsa-v1.md (author it per the spec),
calls claude-sonnet-5 with structured output enforcing the review JSON schema, and
returns it; (2) AIReviewPanel.jsx rendering complexity card, quality notes with
severity chips, edge-case list, interviewer's take, links, and the two action buttons
(Add SRS card → srsStore.addCard; Read note → link) — plus the failing-submission
variant with the Socratic hint and a "just show me" reveal; (3) reviewStore.js caching
reviews by sha-256 of (problemId+code); (4) the "AI Review" button wired into
ResultsPanel.jsx. Verify in dev: submit an O(n²) accepted two-sum solution and confirm
the review flags non-optimality with correct line references; submit a wrong solution
and confirm the hint appears without the fix.
```
