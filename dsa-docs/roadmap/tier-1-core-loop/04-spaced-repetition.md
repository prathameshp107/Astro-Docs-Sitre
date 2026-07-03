# Feature 04 — Spaced Repetition Review System ("Daily Review")

| | |
|---|---|
| **Tier** | 1 — Core Loop |
| **Priority** | High — the daily-return hook |
| **Depends on** | MCQ Hub (exists); Accounts (03) for sync; Judge (01) enriches it |
| **Effort** | Medium (1.5–2 weeks) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
Interview prep is a memory problem as much as a skill problem. Users read our closure
notes today and forget them in a week (the Ebbinghaus forgetting curve is brutal:
~70% forgotten within 24 hours without review). We have MCQs and 1000+ notes but no
mechanism that says **"you're about to forget this — review it now."**

### Competitive context
Anki proved spaced repetition (SRS) works but is generic, ugly, and requires users to
author their own cards. **No major interview-prep platform has a first-class SRS** —
not LeetCode, not GreatFrontEnd. This is a genuine gap in the market: pre-built,
high-quality interview flashcards with an SM-2 scheduler, integrated with the rest of
the loop (wrong MCQ answers auto-become cards; solved problems resurface as "can you
still recall the approach?").

### Why it's a retention machine
"You have **12 cards due today** (~5 min)" is the single best daily-return trigger in
learning products (Duolingo's entire model). It gives users a reason to open the site
on days they don't feel like grinding a full problem.

---

## 2. What to Build

### User stories
1. As a user, I open `/review` and see today's due queue: "12 cards due · ~5 min".
2. As a user, I flip through cards: question → reveal answer → self-grade
   **Again / Hard / Good / Easy** → the SM-2 scheduler sets the next due date.
3. As a user, when I answer an MCQ **wrong** anywhere on the site, it automatically
   becomes a review card (deduped).
4. As a user, when I solve a judge problem (Feature 01), an optional "recall card" is
   created: *"What's the optimal approach & complexity for Two Sum?"* → answer =
   editorial summary. (Toggle in settings.)
5. As a user, I can browse **prebuilt decks** (JS Core, React Hooks, SQL Joins, DSA
   Patterns, Big-O, HTTP/Networks) and add them to my rotation.
6. As a user, I see my review stats: due today, learned, mature, daily review heatmap.

### Scope — v1
- **Scheduler:** SM-2 (Anki's classic algorithm) — simple, proven, ~40 lines of code.
- **Card types:** basic front/back (markdown + code blocks), MCQ-replay (re-answer the
  actual MCQ), problem-recall (from judge).
- **Prebuilt decks:** 6 decks × 40–80 cards, authored from existing notes/MCQs.
- **Daily cap:** default 20 reviews + 10 new cards/day (configurable) — prevents the
  death-spiral backlog that kills Anki habits.
- **Nav hook:** due-count badge on the navbar Review link.

### Out of scope for v1
- FSRS scheduler (better than SM-2; swap in v2 behind the same interface)
- User-authored cards (v2)
- Push/email reminders (needs notification infra, later)

---

## 3. How to Build It (in this codebase)

### 3.1 SM-2 scheduler (`src/lib/srs/sm2.js`)

```js
// state per card: { reps, intervalDays, ease (start 2.5), dueTs, lapses }
// grade: 0=Again, 1=Hard, 2=Good, 3=Easy
export function schedule(card, grade, now) {
  if (grade === 0) return { ...card, reps: 0, intervalDays: 0,
    lapses: card.lapses + 1, ease: Math.max(1.3, card.ease - 0.2),
    dueTs: now + 10 * MIN };                      // relearn in 10 minutes
  const ease = clamp(card.ease + [null, -0.15, 0, 0.15][grade], 1.3, 2.8);
  const interval =
    card.reps === 0 ? 1 :
    card.reps === 1 ? (grade === 3 ? 4 : 3) :
    Math.round(card.intervalDays * ease * (grade === 1 ? 0.8 : grade === 3 ? 1.3 : 1));
  return { ...card, reps: card.reps + 1, ease, intervalDays: interval,
           dueTs: now + interval * DAY };
}
```

Pure function → trivially unit-testable. Keep the scheduler behind
`src/lib/srs/index.js` so FSRS can replace SM-2 later without touching UI.

### 3.2 Deck & card format (`src/data/srs/decks/*.json`)

```jsonc
{
  "id": "js-core",
  "title": "JavaScript Core",
  "description": "Closures, event loop, prototypes, coercion — the perennials.",
  "cards": [
    {
      "id": "js-core-001",
      "type": "basic",
      "front": "What is a **closure**? Give a one-line definition.",
      "back": "A function bundled with its lexical scope — it can access variables from the scope where it was defined, even after that scope has returned.\n\n```js\nfunction counter(){ let n=0; return () => ++n; }\n```",
      "sourceNote": "/javascript/closures"        // deep-link back to the full note
    },
    { "id": "js-core-002", "type": "mcq-replay", "mcqRef": "js-event-loop-04" }
  ]
}
```

### 3.3 Store shape (`src/store/srsStore.js`, persisted + registered with syncManager)

```js
{
  decks: ["js-core", "sql-joins"],                 // subscribed decks
  cards: { "js-core-001": { reps, intervalDays, ease, dueTs, lapses, addedTs } },
  autoCards: { fromMcq: true, fromJudge: true },   // settings
  log: [{ ts, cardId, grade }],                    // powers heatmap + Feature 11
  dailyCaps: { reviews: 20, new: 10 }
}
```

**Auto-card wiring:**
- MCQ store: on wrong answer → `srsStore.addCard({type:"mcq-replay", mcqRef})` (idempotent).
- Judge store: on first AC → `srsStore.addCard({type:"problem-recall", problemRef})`.
Use store subscriptions (like Plans does), not imports inside MCQ/judge components.

### 3.4 Files to create

```
src/lib/srs/sm2.js  + sm2.test.js         ← scheduler + unit tests
src/lib/srs/index.js                      ← queue builder (due + new, respecting caps)
src/data/srs/decks/*.json                 ← 6 prebuilt decks
src/components/srs/ReviewSession.jsx      ← card flip UI, grade buttons, keyboard (space/1-4)
src/components/srs/DeckGallery.jsx
src/components/srs/ReviewStats.jsx        ← heatmap (reuse D3), counts
src/components/srs/DueBadge.jsx           ← navbar badge
src/store/srsStore.js
src/pages/review/index.astro              ← today's session
src/pages/review/decks.astro              ← browse/subscribe decks
```

UI notes: Framer Motion card-flip; keyboard-first (Space = reveal, 1–4 = grade);
session ends with a satisfying "Done for today ✅ — next review tomorrow" screen
(this completion moment is the habit anchor — make it feel good).

### 3.5 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | sm2.js + tests, srsStore, ReviewSession UI with 1 deck (JS Core) |
| 2 | Deck gallery + subscribe flow, due badge in navbar, daily caps |
| 3 | Auto-cards from MCQ wrong answers; problem-recall cards from judge |
| 4 | Stats heatmap; author remaining decks; register store with syncManager (03) |

---

## 4. Expected Result

### User-visible outcome
A "Review" item in the nav with a red **12** badge. Five minutes a day of satisfying,
Duolingo-smooth flashcard review that provably fights the forgetting curve — and a
reason to visit daily even without a study session planned.

### Success metrics
- ≥ 25% of users who complete one review session return for a second within 3 days
- Median session length 3–7 min (shorter = caps working, longer = queue tuning needed)
- MCQ re-answer accuracy on mature cards ≥ 85% (proof the system actually works)

### Definition of done / acceptance criteria
- [ ] SM-2 unit tests pass for all grade paths incl. lapse + ease floor
- [ ] Wrong MCQ answers create cards exactly once (idempotent)
- [ ] Daily caps enforced; backlog never shows more than caps allow per day
- [ ] Due badge accurate on every page load; zero-due state shows next due date
- [ ] Keyboard-only review works end-to-end
- [ ] 6 decks live, every `sourceNote` link resolves
- [ ] Store registered with syncManager; reviews merge across devices without dupes

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Implement a spaced-repetition review system for my Astro + React 19 site (dsa-docs/).
Read roadmap/tier-1-core-loop/04-spaced-repetition.md and follow the SM-2 spec, store
shape, and file layout exactly.

Deliver Phase 1+2: (1) src/lib/srs/sm2.js pure scheduler + Vitest tests covering
Again/Hard/Good/Easy paths, lapse handling, and the 1.3 ease floor; (2) src/lib/srs/
index.js queue builder that mixes due cards + new cards under dailyCaps;
(3) src/store/srsStore.js Zustand persisted store per the spec; (4) ReviewSession.jsx
with Framer Motion card flip, markdown+code rendering on both faces, grade buttons,
and Space/1-4 keyboard shortcuts; (5) the "JavaScript Core" deck with 40 cards
authored from my existing notes in src/content/docs/javascript/ and namaste-js/
(read them and write accurate, concise cards with sourceNote deep links);
(6) /review page + DueBadge in the navbar. Style with Tailwind using
src/styles/tokens.css variables, dark/light both. Verify: run dev server, review 5
cards, reload, confirm due counts and next-due scheduling are correct.
```
