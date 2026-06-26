---
title: "Special Files in App Router"
description: "Every special file in the Next.js App Router — layout, page, loading, error, not-found, route, template, default — and how they nest together."
sidebar:
  order: 4
---

# Special Files in App Router

## Simple Analogy 🏗️

Think of your `app/` folder like a shopping mall. Each floor (folder) has:
- A **floor plan** (`layout.tsx`) — the walls, escalators, bathrooms (shared structure)
- The **stores** (`page.tsx`) — the actual shops you visit
- A **"coming soon" sign** (`loading.tsx`) — shown while a store is being built
- A **"closed" sign** (`error.tsx`) — shown if something went wrong
- A **lost & found** (`not-found.tsx`) — shown when someone can't find a store

---

## File Conventions Overview

Every special file in the App Router has a unique purpose. Here's how they nest:

```mermaid
flowchart TB
    RootLayout["📄 layout.tsx\nRoot Layout\nWraps everything"] --> RootPage["📄 page.tsx\nHome Page\n/"]
    RootLayout --> BlogLayout["📄 layout.tsx\nBlog Layout\nWraps /blog/*"]
    RootLayout --> ShopLayout["📄 layout.tsx\nShop Layout\nWraps /shop/*"]

    BlogLayout --> BlogLoading["⏳ loading.tsx\nShows while\n/blog loads"]
    BlogLayout --> BlogPage["📄 page.tsx\nBlog Index\n/blog"]
    BlogLayout --> SlugPage["📄 page.tsx\nBlog Post\n/blog/[slug]"]
    BlogLayout --> BlogError["⚠️ error.tsx\nCatches errors\nin /blog/*"]
    BlogLayout --> BlogNotFound["🔍 not-found.tsx\nCustom 404\nfor /blog/*"]

    ShopLayout --> ShopLoading["⏳ loading.tsx\nShows while\n/shop loads"]
    ShopLayout --> ShopPage["📄 page.tsx\nShop Page\n/shop"]
    ShopLayout --> ShopError["⚠️ error.tsx\nCatches errors\nin /shop/*"]

    RootLayout --> RootNotFound["🔍 not-found.tsx\nGlobal 404"]

    style RootLayout fill:#7c3aed,color:#fff
    style RootPage fill:#4f46e5,color:#fff
    style BlogLayout fill:#059669,color:#fff
    style ShopLayout fill:#059669,color:#fff
    style BlogLoading fill:#f59e0b,color:#000
    style ShopLoading fill:#f59e0b,color:#000
    style BlogError fill:#dc2626,color:#fff
    style ShopError fill:#dc2626,color:#fff
    style BlogNotFound fill:#6366f1,color:#fff
    style RootNotFound fill:#6366f1,color:#fff
    style BlogPage fill:#4f46e5,color:#fff
    style SlugPage fill:#4f46e5,color:#fff
    style ShopPage fill:#4f46e5,color:#fff
```

---

## The Special Files

### 1. `page.tsx` — The Page UI

The **page** is what users actually see at a route. Every route MUST have a `page.tsx` (or `route.ts` for APIs).

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <h1>About Us</h1>;
}
// → Renders at /about
```

### 2. `layout.tsx` — Shared UI Wrapper

A **layout** wraps its child pages and **persists across navigations** (it doesn't re-render when the user navigates between pages inside it).

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />        {/* Stays mounted during navigation */}
      <main>{children}</main>  {/* The page changes here */}
    </div>
  );
}
```

**Key:** Layouts are **nested** — a blog layout wraps blog pages, a root layout wraps everything.

### 3. `loading.tsx` — Loading UI

Shown **instantly** while the page content is being fetched. Uses React Suspense under the hood.

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
```

### 4. `error.tsx` — Error Boundary

Catches **unexpected errors** in the route segment and shows a fallback UI. Must be a **Client Component** (has `"use client"`).

```tsx
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-state">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
```

### 5. `not-found.tsx` — 404 Page

Shown when a route **is not found** (either no matching route, or `notFound()` was called).

```tsx
// app/not-found.tsx — Global 404
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link href="/">Go Home</Link>
    </div>
  );
}
```

### 6. `route.ts` — API Route Handler

Creates an API endpoint (not a page). Used for GET/POST/PUT/DELETE handlers.

```tsx
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
```

### 7. `template.tsx` — Fresh Layout

Like `layout.tsx`, but **re-renders on every navigation** (doesn't persist state).

```tsx
// app/(marketing)/template.tsx
export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
  // Re-renders every time user navigates — good for page transitions
}
```

### 8. `default.tsx` — Parallel Routes Fallback

Used with **parallel routes** (`@slot`). Shows content when no matching page exists for a slot.

```tsx
// app/@analytics/default.tsx
export default function DefaultAnalytics() {
  return <div>No analytics data available</div>;
}
```

---

## Nesting Behavior

When Next.js renders a route like `/dashboard/settings`, it **nests** the files from top to bottom:

```
layout.tsx (root)          ← Mounted first
  layout.tsx (dashboard)   ← Wraps dashboard section
    loading.tsx            ← Shown while page loads
    error.tsx              ← Catches errors
    page.tsx               ← The actual page UI
```

```mermaid
flowchart LR
    Request["🚀 Request\n/dashboard/settings"] --> RootL["📄 Root\nlayout.tsx"]
    RootL --> DashL["📄 Dashboard\nlayout.tsx"]
    DashL --> Loading["⏳ loading.tsx\n(skips if instant)"]
    Loading --> Error["⚠️ error.tsx\n(if something breaks)"]
    Error --> Page["📄 page.tsx\nSettings Page"]

    style Request fill:#7c3aed,color:#fff
    style RootL fill:#059669,color:#fff
    style DashL fill:#059669,color:#fff
    style Loading fill:#f59e0b,color:#000
    style Error fill:#dc2626,color:#fff
    style Page fill:#4f46e5,color:#fff
```

---

## Quick Reference

| File | Purpose | Re-renders on nav? | Persists state? |
|------|---------|-------------------|-----------------|
| `page.tsx` | Page content | ✅ Yes | ❌ No |
| `layout.tsx` | Shared wrapper | ❌ No | ✅ Yes |
| `template.tsx` | Fresh wrapper | ✅ Yes | ❌ No |
| `loading.tsx` | Loading skeleton | N/A | N/A |
| `error.tsx` | Error fallback | N/A | N/A |
| `not-found.tsx` | 404 page | N/A | N/A |
| `route.ts` | API endpoint | N/A | N/A |
| `default.tsx` | Parallel route fallback | ✅ Yes | ❌ No |

---

## 🧠 In Simple Words

- **`page.tsx`** = what users see at a URL (required for every route)
- **`layout.tsx`** = shared wrapper that stays mounted during navigation (sidebar, nav)
- **`loading.tsx`** = instant skeleton shown while data loads (uses Suspense)
- **`error.tsx`** = catches errors, shows a retry button (must be a Client Component)
- **`not-found.tsx`** = custom 404 page for missing routes
- **`route.ts`** = makes an API endpoint instead of a page
- Files **nest** — root layout wraps child layout, which wraps page, with loading/error in between
