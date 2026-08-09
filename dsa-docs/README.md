# Interview Prep Buddy

A comprehensive interview preparation platform for Software Engineers — covering Data Structures & Algorithms, System Design, JavaScript, React, Angular, Node.js, and more — built with **Astro** + **React**.

> **Live Site:** [interviewpreprationbuddy.in](https://interviewpreprationbuddy.in)

---

## 🚀 Features

| Feature | Description |
| :------ | :---------- |
| **📝 Structured Notes** | 1000+ well-organized notes across DSA, JavaScript, React, Angular, Next.js, Node.js, MongoDB, MySQL, Docker, Python, and Redis |
| **📊 DSA Visualizer** | Interactive step-by-step visualizations for Arrays, Sorting, Trees, Graphs, Linked Lists, Stacks, Queues, Recursion, DP, Heaps, and Searching |
| **💻 Interactive Playground** | Browser-based code editor (Monaco Editor) to write, run, and test JavaScript/React code instantly |
| **🧪 Practice Labs** | Hands-on coding labs for HTML, CSS, JavaScript, React, DSA Problems, SQL, Python, MongoDB, and Git |
| **✅ MCQ Hub** | Interactive multiple-choice quizzes across programming topics with progress tracking |
| **📋 Interview Questions** | 200+ curated interview Q&As covering frontend, backend, and full-stack topics |
| **🏢 Company Prep** | Per-company DSA problem lists, interview processes, study plans, and system design case studies |
| **🎨 System Design** | HLD & LLD guides with real-world case studies, architecture diagrams, and design patterns |
| **🧠 Spaced Repetition** | Flashcard-based daily review system using the SM-2 algorithm to beat the forgetting curve |
| **🔍 Global Search** | Site-wide search across all notes, problems, and questions |
| **🌓 Dark/Light Theme** | Full theme support with smooth transitions |
| **📈 Google Analytics 4** | Privacy-safe GA4 integration with client-side navigation tracking |
| **⚡ Skeleton Loading** | Polished loading states for a seamless user experience |
| **🔐 Auth** | User authentication via Supabase with profile pages |

---

## 📚 Learning Tracks

| Track | Topics Covered |
| :---- | :------------- |
| **DSA** | Arrays, stacks, queues, linked lists, trees, graphs, sorting, binary search, dynamic programming, recursion & backtracking |
| **JavaScript** | Core fundamentals, closures, event loop, prototypes, async patterns, ES6+ |
| **Namaste JS** | Structured Namaste JavaScript notes with visual explanations and deep concepts |
| **React** | Components, Hooks (useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, custom hooks), State Management, Routing, Performance |
| **Angular** | Architecture, components, lifecycle, routing, forms, RxJS, NgRx |
| **Next.js** | Routing, layouts, data fetching, SSR/SSG, middleware, auth, performance, SEO, deployment |
| **Node.js** | Runtime architecture, Express, async patterns, databases, production deployment |
| **MongoDB** | CRUD, aggregation pipeline, indexing, data modeling, Mongoose |
| **MySQL / SQL** | Queries, joins (INNER, LEFT, RIGHT, FULL, CROSS, SELF), indexing, optimization, transactions, ACID |
| **Docker** | Containers, images, Dockerfiles, Compose, networking, volumes |
| **Python** | Syntax, OOP, modules, file handling, regex, decorators, generators, concurrency |
| **Redis** | Caching, Pub/Sub, data types, persistence, clustering |
| **System Design** | HLD & LLD, scalability, databases, caching, microservices, distributed systems |
| **OOP / OOPS** | Principles, design patterns, UML, cheatsheet |

---

## 📊 DSA Visualizer Topics

- **Arrays** — Operations, traversal, manipulation
- **Sorting** — Bubble, Selection, Insertion, Merge, Quick Sort with comparisons
- **Trees** — Binary Tree, BST, traversals (in-order, pre-order, post-order, level-order)
- **Graphs** — BFS, DFS, pathfinding
- **Linked Lists** — Singly, Doubly, operations
- **Stacks & Queues** — Push, pop, enqueue, dequeue operations
- **Recursion** — Step-by-step call stack visualization
- **Dynamic Programming** — Memoization, tabulation patterns
- **Heaps** — Min-heap, Max-heap operations
- **Searching** — Linear, Binary search with animations

---

## 🧪 Practice Labs

- HTML Lab — Hands-on HTML exercises
- CSS Lab — CSS styling challenges
- JS Interview Lab — Code snippet output guessing, bug fixing, and mini-app challenges
- React Practice Lab — React coding exercises
- DSA Problem Lab — Browse problems by topic, difficulty, and company
- SQL Query Lab — Interactive SQL query practice with SQL.js
- Python Labs — Python coding exercises
- MongoDB Lab — MongoDB query practice
- Git & GitHub Labs — Git workflow exercises

---

## 🗺 Routes Overview

| Route | Description |
| :---- | :---------- |
| `/` | Landing page |
| `/overview` | Docs home (Starlight) |
| `/visualizer` | DSA Visualizer Hub |
| `/playground` | JavaScript Playground (Monaco Editor) |
| `/practice` | JS Interview Lab |
| `/dsa/problems` | Browse DSA problems by topic, difficulty, and company |
| `/dsa/patterns` | DSA patterns reference |
| `/mcq` | MCQ Hub — category picker |
| `/mcq/quiz/[category]` | Interactive timed quiz |
| `/interview-questions` | Curated full-stack interview Q&A |
| `/system-design` | System Design Hub (HLD & LLD) |
| `/system-design/case/[slug]` | Individual system design case study |
| `/companies/[slug]` | Per-company prep: problems, interview process, study plan |
| `/labs` | All practice labs index |
| `/review` | Daily spaced-repetition review session |
| `/review/decks` | Manage flashcard decks |
| `/plans/[slug]` | Structured study plans |
| `/oops/cheatsheet` | OOP cheatsheet |
| `/about` | About page |
| `/contact` | Contact page |
| `/u/[username]` | User profile |

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--------- | :------ |
| **[Astro](https://astro.build)** | Static site framework with partial hydration |
| **[Starlight](https://starlight.astro.build)** | Documentation framework (notes/docs section) |
| **React 19** | UI components & islands |
| **TypeScript** | Type safety across components |
| **Tailwind CSS + Custom CSS** | Styling |
| **Monaco Editor** | Browser-based code editor |
| **D3.js** | DSA algorithm visualizations |
| **React Flow (@xyflow/react)** | Graph/flowchart visualizations |
| **Framer Motion** | Animations & transitions |
| **Zustand** | State management (visualizers) |
| **SQL.js (WASM SQLite)** | In-browser SQL query practice |
| **Pyodide (WASM Python)** | In-browser Python execution |
| **@babel/standalone** | Live JSX/React code transpilation |
| **Supabase** | Auth & database backend |
| **React Icons** | Icon library |
| **Google Analytics 4** | Privacy-safe usage analytics |
| **Vercel** | Deployment & hosting |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
| :------- | :------- | :---------- |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 Measurement ID (e.g. `G-XXXXXXXXXX`). Leave unset to disable analytics in dev/forks. |
| `PUBLIC_FEEDBACK_EMAIL` | Optional | Email address used by the FormSubmit feedback widget. |
| `PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL. |
| `PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anon/public key. |

> All variables are prefixed with `PUBLIC_` so Astro exposes them to the client-side browser. **Never** put secrets (service role keys, private API keys) in `PUBLIC_` variables.

### Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com) → create a GA4 property.
2. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`) from the Google Tag snippet.
3. Add it to your `.env`:
   ```env
   PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

The integration is handled by `src/components/GoogleAnalytics.astro`:
- Renders **nothing** if the ID is unset (safe for local dev and forks).
- Tracks page views via `page_view` events, correctly handling Astro's client-side navigation.
- Reusable event helpers (`trackSearchPerformed`, `trackDsaProblemOpened`, `trackQuizStarted`, etc.) live in `src/lib/analytics.js`.

To add GA4 to a new page, drop `<GoogleAnalytics />` in `<head>`:

```astro
---
import GoogleAnalytics from '../components/GoogleAnalytics.astro';
---
<html>
  <head>
    <GoogleAnalytics />
  </head>
</html>
```

---

## 🧞 Commands

All commands are run from the `dsa-docs/` directory:

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands |

---

## 📁 Project Structure

```
dsa-docs/
├── public/                    # Static assets (favicon, OG image)
├── src/
│   ├── components/            # All UI components
│   │   ├── GoogleAnalytics.astro   # GA4 tag loader
│   │   ├── SEOHead.astro           # Reusable SEO / Open Graph head
│   │   ├── PageSEO.astro           # Per-page SEO meta helper
│   │   ├── GlobalSearch.jsx        # Site-wide search
│   │   ├── DSAVisualizerHub.jsx    # DSA visualizer
│   │   ├── FeedbackButton.jsx      # Feedback widget
│   │   ├── Skeleton.jsx            # Loading skeletons
│   │   ├── ThemeToggle.jsx         # Dark/light toggle
│   │   ├── auth/                   # Auth components
│   │   ├── companies/              # Company-specific prep UI
│   │   ├── dsa/                    # DSA problem components
│   │   ├── interview/              # Interview question components
│   │   ├── labs/                   # Practice lab components
│   │   ├── landing/                # Landing page (Nav, Hero, etc.)
│   │   ├── mcq/                    # MCQ quiz components
│   │   ├── plans/                  # Study plan components
│   │   ├── practice/               # JS interview lab platform
│   │   ├── profile/                # User profile components
│   │   ├── srs/                    # Spaced repetition (flashcards)
│   │   ├── system-design/          # System design hub (HLD/LLD)
│   │   └── visualizers/            # Individual algorithm visualizers
│   ├── content/
│   │   └── docs/                   # Starlight documentation (MDX)
│   │       ├── javascript/         # JavaScript notes & interview questions
│   │       ├── react/              # React complete guide
│   │       ├── angular/            # Angular multi-phase notes
│   │       ├── nextjs/             # Next.js comprehensive guide
│   │       ├── nodejs/             # Node.js architecture & guides
│   │       ├── mongodb/            # MongoDB & aggregation pipeline
│   │       ├── sql/                # MySQL / SQL complete guide
│   │       ├── docker/             # Docker fundamentals & advanced
│   │       ├── python/             # Python complete guide
│   │       ├── redis/              # Redis fundamentals & integration
│   │       ├── data-structures/    # DSA notes (arrays, trees, graphs, DP, etc.)
│   │       ├── interview/          # Full-stack interview preparation
│   │       └── namaste-js/         # Namaste JavaScript notes
│   ├── data/                       # Curriculum data, problems, company data, plans
│   ├── lib/
│   │   └── analytics.js            # GA4 event tracking helpers
│   ├── store/                      # Zustand stores (visualizers, quiz state)
│   ├── styles/                     # CSS stylesheets
│   ├── env.d.ts                    # Astro env variable type definitions
│   └── pages/                      # Astro pages / routes
├── .env.example                    # Environment variable template
├── astro.config.mjs                # Astro + Starlight configuration
├── tailwind.config.cjs             # Tailwind CSS configuration
└── package.json
```

---

## 👤 Author

Built by **Prathamesh Pawar**

- GitHub: [@prathameshp107](https://github.com/prathameshp107)
- Repository: [DSA-Notes-Problems](https://github.com/prathameshp107/DSA-Notes-Problems)
