# DSA & Dev Notes — Feature Changelog

> A comprehensive overview of all the features built for the DSA & Dev Notes project.

---

## 📍 Routes Overview

| Route | Description |
|-------|-------------|
| `/` | **React Landing Page** — Modern landing page explaining the app |
| `/overview` | **Docs Home** — Original Starlight docs home (moved from `/`) |
| `/playground` | **Basic Playground** — Original textarea-based code playground |
| `/practice` | **JS Interview Lab** — Full interview practice platform with Monaco Editor |

---

## 1. 🏠 Landing Page (`/`)

A modern, interactive landing page built with React.

### Features
- **Particle background** — 20 floating particles with rise animation
- **Mouse-following glow** — Cursor-tracked radial gradient on the hero
- **Floating gradient orbs** — 3 animated colored blobs (blue, teal, purple)
- **Animated gradient text** — "Notes to Interviews" cycles through blue → teal → purple
- **Glassmorphism cards** — `backdrop-filter: blur()` throughout
- **Scroll-reveal animations** — IntersectionObserver triggers `fadeUp` on stats, features, paths, CTA
- **Animated counters** — Stats count up (1000+, 500+, 100+, 10+) when scrolled into view
- **Shine hover effect** — Diagonal gradient sweep on feature cards
- **Learning paths grid** — 6 colored path cards with progress bars
- **Responsive design** — Works on all screen sizes

### Key Files
- `src/components/ReactLanding.jsx` — Main landing component
- `src/pages/index.astro` — Astro page wrapper

---

## 2. 🎨 Docs Home (`/overview`)

The original Starlight docs home page was moved from `/` to `/overview` to make room for the new React landing page at `/`.

### Key Files
- `src/content/docs/overview.mdx` — Original docs home content

---

## 3. ▶️ Basic Playground (`/playground`)

A simple JavaScript code playground with a textarea editor and output console.

### Key Files
- `src/components/ReactPlayground.jsx` — Playground component
- `src/pages/playground.astro` — Astro page wrapper

---

## 4. 🧪 JS Interview Lab (`/practice`)

A full-featured JavaScript interview practice platform with 5 main sections (6 tabs).

### Architecture

```
src/
├── data/
│   └── questions.js          # All seed data (24 questions, 5 bugs, 4 mini apps)
├── components/
│   └── practice/
│       ├── JSPracticePlatform.jsx  # Main hub with tab navigation
│       ├── MonacoPlayground.jsx    # Monaco Editor playground
│       ├── SnippetQuestions.jsx    # Question browser & answer reveal
│       ├── FixBug.jsx             # Debug challenge system
│       ├── MiniApps.jsx           # Mini app challenges
│       └── InterviewMode.jsx      # Timed quiz with scoring
├── pages/
│   └── practice.astro         # Astro page wrapper
└── styles/
    └── landing.css            # All styles (merged)
```

### 4.1 ◀ Playground Tab

Built with **Monaco Editor** (`@monaco-editor/react`).

- **Syntax highlighting** — JavaScript language with `vs-dark` theme
- **Snippet completions** — Type `clog`/`clg`, `fn`, `afn`, `for`, `settimeout` for auto-complete
- **Format code** — Monaco's format action (needs formatter worker for full support)
- **Theme toggle** — Dark/light Monaco themes
- **Copy code** — Clipboard copy
- **Reset code** — Restore default starter code
- **Run code** — Executes JavaScript via `Function()` and captures console output
- **Output panel** — Displays `console.log`, `console.warn`, `console.error` output with line markers

### 4.2 📝 Questions Tab

24 interview-style snippet questions across 7 topics:

| Topic | # Questions |
|-------|:-----------:|
| Equality & Coercion | 4 |
| Hoisting | 3 |
| Scope | 2 |
| Closures | 3 |
| Event Loop & Async | 4 |
| Array Methods | 4 |
| Objects & References | 3 |
| this Keyword | 2 |
| Prototypes | 1 |

**Features:**
- Search by title/tags
- Filter by topic and difficulty (Easy/Medium/Hard)
- Reveal answer with expected output and explanation
- "Try in Playground" button sends code to editor
- Completion tracking via `sessionStorage`
- Progress badge on tab

### 4.3 🐛 Fix Bug Tab

5 debugging challenges where users identify and fix broken code.

**Features:**
- Broken code display with expected vs actual output comparison
- Hint system (one hint per challenge)
- Solution reveal with explanation and fix approach
- Fixed code comparison
- "Debug in Playground" button to experiment
- Difficulty filtering (Beginner/Intermediate)
- Mastery tracking

### 4.4 🎤 Interview Mode Tab

A timed interview simulation with randomized questions, countdown timer, and detailed performance analytics.

**Features:**

#### Setup Phase
- **Difficulty selection** — Easy / Medium / Hard / All Levels
- **Question count** — 5 / 10 / 15 / 20 questions per session
- **Time limit** — 30s / 60s / 90s per question or no limit
- **Past session stats** — Shows cumulative analytics (sessions, avg accuracy, total solved) from last 20 sessions
- **Empty pool guard** — Shows an error banner if no questions match the selected difficulty

#### Playing Phase
- **Multiple-choice options** — 4 options generated dynamically (correct answer + 3 wrong answers from other questions)
- **Countdown timer** — Per-question timer with warning pulse animation when ≤10s remain
- **Progress dots** — Visual indicator showing correct (green), wrong (red), and current (blue) questions
- **Instant feedback** — Shows correct/wrong with expected output and detailed explanation after each answer
- **"Try in Playground"** — Button to send the code to the Monaco Editor for experimentation

#### Results Phase
- **Score ring** — Circular percentage display with grade (Excellent ≥90% / Good ≥70% / Fair ≥50% / Keep Practicing)
- **Stats grid** — Correct/total, answered count, total time spent, question count
- **Question breakdown** — Per-question list with correct/wrong indicators, answer shown, and Review button
- **Review mode** — Click any question's Review button to revisit it with full context, answer, and explanation

#### Session Persistence
- Stores last 20 interview sessions in `sessionStorage`
- Cumulative stats shown on setup screen for returning users

### 4.5 📱 Mini Apps Tab

4 mini application challenges with starter code:

| App | Difficulty | Requirements |
|-----|:----------:|:------------:|
| Counter | Beginner | Increment, decrement, reset |
| Todo List | Intermediate | Add, toggle, delete, list, pending count |
| Search Filter | Beginner | Case-insensitive search, empty query handling |
| Calculator | Intermediate | Add, subtract, multiply, divide, div-by-zero |

**Features:**
- Requirements list
- Starter code with test cases
- "Build in Playground" button
- Solution reveal with explanation

### 4.6 📊 Progress Tab

Dashboard showing completion stats:

- Questions completed / total
- Bugs mastered / total
- Mini apps count
- Overall completion percentage
- Progress bars for each category
- All progress stored in `sessionStorage`

---

## 5. 🎨 UI/Design System

### Theme
- **Dark mode** only (background: `#030712`)
- Colors: Blue (`#3b82f6`), Teal (`#2dd4bf`), Purple (`#a78bfa`)
- Fonts: Inter (UI), JetBrains Mono (code)

### Design Patterns
- Glassmorphism (`backdrop-filter: blur()`)
- Gradient accents
- Smooth cubic-bezier transitions
- Hover lift effects
- Responsive breakpoints at 640px, 768px, 1024px

### Key Files
- `src/styles/landing.css` — All styles (~2000+ lines)
- `src/styles/custom.css` — Starlight theme overrides

---

## 6. 🧭 Navigation Updates

### Sidebar (Starlight)
Added to `astro.config.mjs`:
1. **Home** → `/` (React landing page)
2. **Overview** → `/overview` (Docs home)
3. **Playground** → `/playground` (Basic playground)
4. **JS Interview Lab** → `/practice` (Full platform with Interview Mode)

### Landing Page Nav
- "Explore Docs" → `/overview`
- "JS Interview Lab" → `/practice`
- GitHub link → external

---

## 7. 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro 6** | Static site generator |
| **Starlight** | Documentation framework |
| **React 19** | UI components |
| **Monaco Editor** | Code editor (playground) |
| **Vite** | Build tool (via Astro) |
| **Inter + JetBrains Mono** | Fonts |

---

## 8. 📦 Dependencies Added

```json
{
  "@astrojs/react": "^5.0.7",
  "@monaco-editor/react": "^4.7.0",
  "react": "^19.2.7",
  "react-dom": "^19.2.7"
}
```

---

## 9. 🔜 Planned Improvements

- [ ] Add Prettier formatter worker for the "Format" button
- [ ] 50+ more snippet questions
- [ ] Structured learning paths (Beginner → Intermediate → Advanced)
- [ ] Light/dark mode toggle for the entire page
- [ ] Update old `/playground` route with Monaco Editor too
- [ ] Extract `landing.css` into separate files by section
