---
title: "Core Concepts Review, Practice & Interview Prep"
description: "1. Create a Greeting Server Component that accepts a name prop and displays a personalized message. 2. Build a Counter Client Component using useState. 3."
---

# Summary

## Important Concepts Covered

### Section 6 — Components
- **Server Components** run on the server, never hydrated — zero JS bundle impact
- **Client Components** (`"use client"`) handle interactivity and browser APIs
- **Hydration** is React attaching to server-rendered HTML
- **`dynamic()`** enables lazy loading for performance optimization
- **Composition pattern** builds complex UIs from simple, focused components

### Section 7 — Styling
- **CSS Modules** provide scoped, conflict-free styles
- **Tailwind CSS** enables rapid development with utility classes
- **Dark mode** is implemented via `class` toggle and CSS variables
- **Mobile-first** responsive design uses Tailwind's breakpoint prefixes

### Section 8 — Data Fetching
- **Server-side fetching** in async Server Components is the Next.js default
- **`cache: "no-store"`** forces fresh data; **`next: { revalidate: N }`** enables ISR-style caching
- **Suspense + Streaming** progressively loads page sections
- **React Query** handles complex client-side data management

### Section 9 — Rendering Methods
- **SSG** — fastest, built at compile time, best for static content
- **SSR** — always fresh, runs per request, best for personalized content
- **ISR** — static with automatic refresh, best for frequently updating content
- **CSR** — browser-rendered, best for real-time/interactive apps

### Section 10 — API Routes
- Route Handlers (`route.ts`) support all HTTP methods
- **Middleware** runs before every request — ideal for auth
- **Environment variables** keep secrets server-side
- **Zod** validates and types API inputs automatically

---

## Architecture Recap

```
Next.js App
├── Frontend (React Components)
│   ├── Server Components → Run on server, zero JS, async data
│   └── Client Components → Run in browser, interactive
├── Styling
│   ├── CSS Modules → Scoped, no conflicts
│   └── Tailwind CSS → Utility-first, rapid development
├── Data Layer
│   ├── Server fetch → Direct DB/API access in components
│   └── API Routes → /api/* for client fetching
├── Rendering
│   ├── SSG → Build-time HTML (CDN)
│   ├── SSR → Per-request HTML
│   ├── ISR → Periodic revalidation
│   └── CSR → Browser rendering
└── Backend (Route Handlers)
    ├── REST API → CRUD operations
    ├── Middleware → Auth, rate limiting
    └── DB integrations → MongoDB, MySQL
```

---

# Key Takeaways

## Performance Tips
1. **Default to Server Components** — reduce client JavaScript bundle
2. **Use `dynamic()` with `ssr: false`** for browser-only heavy libraries
3. **Prefer SSG/ISR over SSR** unless data must be per-request
4. **Use `Promise.all()`** for parallel data fetching (avoid waterfall)
5. **Purge Tailwind** correctly to keep CSS bundle minimal
6. **Use Suspense** to progressively stream UI instead of loading states

## Rendering Strategy Tips
1. **Blog/docs/marketing** → SSG (fastest + best SEO)
2. **Product listing** → ISR (fresh enough + fast)
3. **User dashboard** → SSR or CSR (personalized)
4. **Real-time features** → CSR with polling or WebSockets
5. **Auth-protected pages** → SSR with middleware

## Component Best Practices
1. **Keep components small and focused** — one purpose each
2. **Lift state up** when siblings need shared state
3. **Type all props** with TypeScript interfaces
4. **Use composition** instead of deeply nested props
5. **Name components clearly** — `ProductCard`, not `Card2`

---

# Practice Exercises

## Beginner

1. Create a `Greeting` Server Component that accepts a `name` prop and displays a personalized message.
2. Build a `Counter` Client Component using `useState`.
3. Write a CSS Module for a `Badge` component with 3 variants (success, warning, error).
4. Create a Tailwind-styled `Navbar` that is responsive on mobile.
5. Write an API route at `/api/ping` that returns `{ status: "ok", timestamp: "..." }`.

## Intermediate

6. Build a `BlogList` page that fetches posts from `jsonplaceholder.typicode.com` using a Server Component.
7. Implement dark mode toggle using Tailwind's `dark:` prefix and `localStorage`.
8. Create a full CRUD API for a `Todo` resource with in-memory storage.
9. Use `Suspense` to show a skeleton while a slow data component loads.
10. Implement a `Modal` component with Escape key close and click-outside close.

## Advanced

11. Build an ISR product page that revalidates every 5 minutes and supports on-demand revalidation.
12. Implement JWT-based authentication with login/logout API routes and middleware protection.
13. Create a streaming page where 3 sections load independently with different data sources.
14. Build a file upload API with type and size validation, saving to disk.
15. Implement a search API with MongoDB text search, pagination, and sorting.
16. Create a theme system with CSS variables supporting light/dark/custom themes.
17. Build a rate-limited API endpoint that allows 5 requests per minute per IP.

---

# Mini Project Ideas

## 1. Personal Blog Application
- **Stack:** Next.js + MDX + Tailwind + Vercel
- **Features:** SSG for articles, ISR for homepage, Dark mode, RSS feed
- **API Routes:** Newsletter signup, comment submission

## 2. Weather Application
- **Stack:** Next.js + OpenWeather API + Tailwind
- **Features:** CSR with location detection, 5-day forecast, SSR for initial load
- **Concepts:** Client fetching, Suspense, skeleton loaders, Geolocation API

## 3. Admin Dashboard
- **Stack:** Next.js + MongoDB + Tailwind + JWT auth
- **Features:** Protected routes via middleware, Stats with charts, User management
- **Concepts:** SSR, API Routes, Middleware, CRUD operations, Data visualization

## 4. Authentication System
- **Stack:** Next.js + NextAuth.js / custom JWT + MongoDB
- **Features:** Login/register, Google OAuth, Password reset, Profile management
- **Concepts:** JWT, HTTP-only cookies, Protected routes, Middleware, Email APIs

## 5. Product Management System (E-Commerce)
- **Stack:** Next.js + MySQL + Stripe + Tailwind
- **Features:** ISR product pages, Cart with Zustand, Stripe payments, Admin panel
- **Concepts:** ISR, API routes, File uploads, Webhooks, Form validation

---

# Interview Preparation

## Beginner Questions

1. What is Next.js and why use it over plain React?
2. What is the App Router? How is it different from Pages Router?
3. What is a Server Component?
4. What does `"use client"` do?
5. What is the difference between CSS Modules and global CSS?
6. What is Tailwind CSS?
7. What is data fetching?
8. What is SSG?
9. What is an API Route in Next.js?
10. What is hydration?

## Intermediate Questions

11. Explain the difference between SSG, SSR, and ISR.
12. When would you choose SSR over SSG?
13. What is `next: { revalidate }` and how does it work?
14. How do you protect routes in Next.js?
15. What is `NextResponse` and how do you use it?
16. What is the Composition Pattern in React?
17. How does Tailwind's `dark:` prefix work?
18. What is the difference between `cache: "no-store"` and `cache: "force-cache"`?
19. What is `dynamic()` in Next.js?
20. How do you handle errors in Server Components?

## Advanced Scenario-Based Questions

21. **"Your blog is slow — how would you optimize it?"**
   → Use SSG for articles, ISR for homepage, dynamic import for heavy editor, image optimization, prefetch.

22. **"Your e-commerce site shows stale prices. What strategy would you use?"**
   → ISR with `revalidate: 60` (1 min) + on-demand revalidation triggered by inventory webhook.

23. **"You need to build a dashboard with user-specific data — what rendering method?"**
   → SSR or CSR. SSR if SEO matters or initial render speed is critical. CSR if data is highly dynamic.

24. **"How would you prevent an API key from being exposed in the browser?"**
   → Keep in `.env.local` without `NEXT_PUBLIC_` prefix. Use API routes as proxy to call external APIs.

25. **"Your Server Component needs to render interactive content — how do you structure it?"**
   → Server Component fetches data, passes it as props to a Client Component for interaction. Never make everything a Client Component.

26. **"How would you implement authentication that persists across page refreshes?"**
   → JWT stored in `httpOnly` cookie, verified in middleware on every request. Never store JWT in localStorage.

27. **"You have 10 API calls on a page — how do you make them fast?"**
   → Use `Promise.all()` for parallel fetching. Use Suspense so each section streams independently.

28. **"What is a hydration error and how do you fix it?"**
   → Server HTML doesn't match client render. Fix: don't use `Date.now()` or `Math.random()` in Server Components without caution; use `suppressHydrationWarning` sparingly.

---

> **End of Next.js Notes — Part 2**
>
> Sections 1–5 are covered in Part 1 (Foundations, File System, Routing, Layouts, Navigation).

---

*Generated for PrepTechLab — Production-Ready Next.js Learning Resource*
