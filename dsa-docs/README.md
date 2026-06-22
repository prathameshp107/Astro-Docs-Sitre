# DSA & Dev Notes

A comprehensive learning hub for Data Structures & Algorithms, JavaScript, React, Angular, Node.js, MongoDB, MySQL, Docker, Python, Redis, and interview preparation — built with **Astro** + **Starlight**.

> **Live Site:** [prathameshp107.github.io/DSA-Notes-Problems](https://prathameshp107.github.io/DSA-Notes-Problems)

---

## 🚀 Features

| Feature | Description |
| :------ | :---------- |
| **📝 Structured Notes** | 1000+ well-organized notes across DSA, JavaScript, React, Angular, Node.js, MongoDB, MySQL, Docker, Python, and Redis |
| **📊 DSA Visualizer** | Interactive step-by-step visualizations for Arrays, Sorting, Trees, Graphs, Linked Lists, Stacks, Queues, Recursion, Dynamic Programming, Heaps, and Searching algorithms |
| **💻 Interactive Playground** | Browser-based code editor (Monaco Editor) to write, run, and test JavaScript/React code instantly |
| **🎯 Practice Labs** | Hands-on coding labs for HTML, CSS, JavaScript, React, DSA Problems, SQL, Python, MongoDB, and Git |
| **✅ MCQ Hub** | Interactive multiple-choice quizzes across programming topics with progress tracking |
| **📋 Interview Prep** | 200+ curated interview questions with answers covering frontend, backend, and full-stack topics |
| **🎨 Dark/Light Theme** | Full theme support with smooth transitions |
| **⚡ Skeleton Loading** | Polished loading states for a seamless user experience |

---

## 📚 Learning Tracks

| Track | Topics Covered |
| :---- | :------------- |
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
| **DSA** | Arrays, stacks, queues, linked lists, trees, graphs, sorting, binary search, dynamic programming, recursion & backtracking |

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

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
- **UI Runtime:** React 19
- **Styling:** Tailwind CSS, Custom CSS
- **Code Editor:** Monaco Editor (@monaco-editor/react)
- **Visualizations:** D3.js, React Flow (@xyflow/react)
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Icons:** React Icons
- **SQL Practice:** SQL.js (WebAssembly SQLite)
- **Python Practice:** Pyodide (Python in the browser via WebAssembly)
- **Babel:** @babel/standalone (for live code transpilation)
- **Deployment:** GitHub Pages / Vercel

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
├── public/                  # Static assets
├── src/
│   ├── components/          # React components (Navbar, Landing, Labs, Visualizers, MCQ)
│   │   ├── visualizers/     # DSA visualizer components
│   │   ├── labs/            # Practice lab components
│   │   ├── mcq/             # MCQ hub components
│   │   └── dsa/             # DSA problem components
│   ├── content/
│   │   └── docs/            # Starlight documentation (MDX)
│   │       ├── javascript/  # JavaScript notes & interview questions
│   │       ├── react/       # React complete guide
│   │       ├── angular/     # Angular multi-phase notes
│   │       ├── nextjs/      # Next.js comprehensive guide
│   │       ├── nodejs/      # Node.js architecture & guides
│   │       ├── mongodb/     # MongoDB & aggregation pipeline
│   │       ├── sql/         # MySQL / SQL complete guide
│   │       ├── docker/      # Docker fundamentals & advanced
│   │       ├── python/      # Python complete guide
│   │       ├── redis/       # Redis fundamentals & integration
│   │       ├── data-structures/ # DSA notes (arrays, trees, graphs, DP, etc.)
│   │       ├── interview/   # Full-stack interview preparation
│   │       └── namaste-js/  # Namaste JavaScript notes
│   ├── data/                # Curriculum data, problems, questions
│   ├── store/               # Zustand stores for visualizers
│   ├── styles/              # CSS stylesheets
│   └── pages/               # Astro pages (landing, visualizer, labs, MCQ, etc.)
├── astro.config.mjs         # Astro configuration
├── tailwind.config.cjs      # Tailwind CSS configuration
└── package.json
```

---

## 👤 Author

Built by **Prathamesh Pawar**

- GitHub: [@prathameshp107](https://github.com/prathameshp107)
- Repository: [DSA-Notes-Problems](https://github.com/prathameshp107/DSA-Notes-Problems)
