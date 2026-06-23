---
title: "Suspense & Lazy Loading"
description: "React.lazy + Suspense lets you code-split your app — load components only when they're needed."
sidebar:
  order: 2
---

# Suspense & Lazy Loading

## Simple Words First 🟡

> **Analogy:** 👉 Imagine a huge textbook. Instead of printing all chapters at once, you give the reader just the table of contents, then print each chapter only when they turn to it. `React.lazy` is like "print this chapter on demand." `<Suspense>` is like a "Loading..." page while the chapter prints.

## Suspense + Lazy Flow

```mermaid
flowchart LR
    User["User navigates\\nto /dashboard"] --> Load["React loads\\nthe chunk"]
    Load --> Fallback["<Suspense> shows\\nfallback UI (spinner)"]
    Fallback --> Ready["Chunk loaded ✅"]
    Ready --> Component["Component renders"]

    style User fill:#4f46e5,color:#fff
    style Load fill:#d97706,color:#fff
    style Fallback fill:#f59e0b,color:#fff
    style Ready fill:#059669,color:#fff
    style Component fill:#10b981,color:#fff
```

## Basic Usage

```jsx
import { lazy, Suspense } from 'react';

// 1️⃣ Lazy load the component (only fetched when rendered)
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <div>
      <h1>My App</h1>

      {/* 2️⃣ Wrap with Suspense — provides a fallback while loading */}
      <Suspense fallback={<div>⏳ Loading dashboard...</div>}>
        <Dashboard />
      </Suspense>

      <Suspense fallback={<div>⏳ Loading settings...</div>}>
        <Settings />
      </Suspense>
    </div>
  );
}
```

## With React Router (Most Common Pattern)

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>🔄 Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

## Named Exports

```jsx
const Dashboard = lazy(() =>
  import('./Dashboard').then(module => ({
    default: module.Dashboard,
  }))
);
// 👆 .then() remaps the named export to .default
```

## Multiple Fallbacks — Granular vs Single

```jsx
// ✅ Granular — each section can load independently
<section>
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
  <Suspense fallback={<MainSkeleton />}>
    <MainContent />
  </Suspense>
</section>

// ⚠️ Single — all lazy components share one fallback
<Suspense fallback={<FullPageSpinner />}>
  <Sidebar />
  <MainContent />
  <Footer />
</Suspense>
```

## In Simple Words 🧠

- `React.lazy()` lets you **code-split** your app — only load the JavaScript a component needs when it's needed
- `<Suspense>` shows a fallback (spinner, skeleton) while the lazy component loads
- Always combine **lazy + Suspense** — Suspense without lazy works but needs a data-fetching library
- Best used with **routing** — each route becomes its own chunk
- Named exports need a small `.then()` wrapper to map to `.default`
- React 19 improves Suspense with stable data-fetching support
