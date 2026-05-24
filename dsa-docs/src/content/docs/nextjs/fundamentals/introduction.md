---
title: "Introduction to Next.js"
description: "Next.js is a React framework built by Vercel that adds powerful features on top of React — things React alone cannot do out of the box, like server-side re"
---

# 1. Introduction to Next.js

## What is Next.js?

Next.js is a **React framework** built by Vercel that adds powerful features on top of React — things React alone cannot do out of the box, like server-side rendering, file-based routing, automatic code splitting, and API routes.

> **Analogy**: If React is the engine of a car, Next.js is the full car — body, wheels, dashboard, GPS, and all. You can drive with just the engine, but the complete car is far more practical.

```
React  →  A JavaScript library for building UI components
Next.js →  A full-stack framework built on top of React
```

---

## Why Was Next.js Created?

React by itself is a **UI library**. When developers started building real-world apps with React, they ran into recurring problems:

- Pages weren't indexed by search engines (bad SEO)
- Initial page loads were slow (blank screen until JS loaded)
- Setting up routing, API handling, and code splitting required lots of manual configuration
- No standard way to fetch data before rendering

Vercel created Next.js in **2016** to solve all these problems with a single, opinionated framework.

---

## Problems Solved by Next.js

| Problem | Without Next.js | With Next.js |
|---|---|---|
| SEO | Poor — content rendered client-side | Excellent — server renders HTML |
| Initial Load Speed | Slow — white screen until JS loads | Fast — HTML arrives ready |
| Routing | Manual setup with React Router | File-based, zero config |
| API Endpoints | Separate backend required | Built-in API routes |
| Code Splitting | Manual configuration | Automatic per page |
| Image Optimization | Manual | Built-in `<Image>` component |
| TypeScript | Manual setup | First-class support |
| Deployment | Complex | One-click on Vercel |

---

## Benefits of Using Next.js

- **Performance** — Automatic static optimization, image optimization, lazy loading
- **SEO** — Server-side and static rendering make pages crawlable
- **Developer Experience** — Fast refresh, TypeScript, ESLint all built-in
- **Full-Stack** — API routes let you write backend code in the same project
- **Flexibility** — Mix SSR, SSG, ISR, and CSR per page
- **Scalability** — Used by Fortune 500 companies in production

---

## Core Features of Next.js

```
┌─────────────────────────────────────────────┐
│               NEXT.JS FEATURES              │
├─────────────────┬───────────────────────────┤
│ App Router      │ File-based routing system  │
│ Server Comps    │ React Server Components    │
│ Data Fetching   │ fetch() with caching       │
│ API Routes      │ Built-in backend endpoints │
│ Image Optim.    │ <Image> component          │
│ Font Optim.     │ next/font                  │
│ Metadata API    │ SEO metadata management    │
│ Middleware      │ Edge runtime functions     │
│ Streaming       │ Progressive rendering      │
│ Turbopack       │ Ultra-fast bundler         │
└─────────────────┴───────────────────────────┘
```

---

## When to Use Next.js

✅ **Use Next.js when:**
- Building a website that needs good SEO (blogs, marketing, e-commerce)
- You need fast initial page loads
- You want both frontend and backend in one project
- Your team prefers React but needs more structure
- Building a SaaS product, admin dashboard, or content platform

## When NOT to Use Next.js

❌ **Avoid Next.js when:**
- Building a highly interactive single-page app with no SEO needs (e.g., a real-time game or internal tool)
- Your team is not familiar with React
- You need a simple static site (use Astro or plain HTML)
- You have strict self-hosting requirements with no Node.js support

---

## Companies Using Next.js

| Company | Use Case |
|---|---|
| Netflix | Content platform |
| TikTok | Web app |
| Twitch | Streaming platform |
| GitHub | Developer platform |
| Notion | Productivity tool |
| Hulu | Streaming |
| Airbnb | Marketplace |
| Target | E-commerce |
| OpenAI | AI products (ChatGPT web) |

---

## History and Evolution

| Year | Version | Major Change |
|---|---|---|
| 2016 | v1.0 | Initial release by Vercel |
| 2018 | v7.0 | Dynamic routing |
| 2020 | v9.5 | Incremental Static Regeneration (ISR) |
| 2021 | v12 | Middleware, React 18 support |
| 2022 | v13 | App Router (beta), Server Components |
| 2023 | v13.4 | App Router stable |
| 2024 | v14 | Partial Prerendering, Server Actions stable |
| 2025 | v15 | Turbopack stable, improved caching |

---

## React vs Next.js Comparison

| Feature | React | Next.js |
|---|---|---|
| Type | UI Library | Full-stack Framework |
| Routing | Manual (React Router) | Built-in (file-based) |
| SSR | ❌ | ✅ |
| SSG | ❌ | ✅ |
| API Routes | ❌ | ✅ |
| SEO | Poor by default | Excellent |
| Code Splitting | Manual | Automatic |
| Image Optimization | Manual | Built-in |
| TypeScript | Manual setup | Built-in |
| Learning Curve | Lower | Moderate |
| Bundle Size | Smaller | Larger (more features) |

---

## SPA vs SSR Comparison

```
SPA (React without Next.js)
──────────────────────────
Browser → Request Page
Browser ← Empty HTML (just <div id="root">)
Browser → Downloads JS bundle
Browser → Renders UI in browser
User sees content (slow first load)
Search bots see: empty page ❌

SSR (Next.js)
─────────────
Browser → Request Page
Server → Builds HTML with data
Browser ← Full HTML (instant content)
User sees content immediately ✅
Search bots see: full content ✅
Browser → Downloads JS (hydration)
```

---

## SVG: Client vs Server Rendering

```txt
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="13">
  <!-- Background -->
  <rect width="800" height="400" fill="#0f172a" rx="12"/>

  <!-- Title -->
  <text x="400" y="35" text-anchor="middle" fill="#94a3b8" font-size="15" font-weight="bold">Client-Side vs Server-Side Rendering</text>

  <!-- CSR Side -->
  <rect x="20" y="55" width="360" height="320" fill="#1e293b" rx="8" stroke="#334155" stroke-width="1"/>
  <text x="200" y="80" text-anchor="middle" fill="#f472b6" font-size="14" font-weight="bold">CSR (React SPA)</text>

  <!-- CSR steps -->
  <rect x="45" y="95" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="200" y="112" text-anchor="middle" fill="#94a3b8">1. Browser requests page</text>
  <text x="200" y="126" text-anchor="middle" fill="#64748b" font-size="11">GET /about</text>

  <line x1="200" y1="133" x2="200" y2="148" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="45" y="148" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="200" y="165" text-anchor="middle" fill="#94a3b8">2. Server returns empty HTML</text>
  <text x="200" y="179" text-anchor="middle" fill="#64748b" font-size="11">&lt;div id="root"&gt;&lt;/div&gt;</text>

  <line x1="200" y1="186" x2="200" y2="201" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="45" y="201" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="200" y="218" text-anchor="middle" fill="#94a3b8">3. Browser downloads JS bundle</text>
  <text x="200" y="232" text-anchor="middle" fill="#64748b" font-size="11">~200KB+ JavaScript</text>

  <line x1="200" y1="239" x2="200" y2="254" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="45" y="254" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="200" y="271" text-anchor="middle" fill="#94a3b8">4. React renders UI in browser</text>
  <text x="200" y="285" text-anchor="middle" fill="#64748b" font-size="11">User waits... then sees content</text>

  <rect x="45" y="310" width="310" height="45" fill="#450a0a" rx="5" stroke="#991b1b" stroke-width="1"/>
  <text x="200" y="328" text-anchor="middle" fill="#fca5a5" font-size="12">❌ Slow First Load</text>
  <text x="200" y="345" text-anchor="middle" fill="#fca5a5" font-size="12">❌ Bad SEO (bots see empty page)</text>

  <!-- SSR Side -->
  <rect x="420" y="55" width="360" height="320" fill="#1e293b" rx="8" stroke="#334155" stroke-width="1"/>
  <text x="600" y="80" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold">SSR (Next.js)</text>

  <rect x="445" y="95" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="600" y="112" text-anchor="middle" fill="#94a3b8">1. Browser requests page</text>
  <text x="600" y="126" text-anchor="middle" fill="#64748b" font-size="11">GET /about</text>

  <line x1="600" y1="133" x2="600" y2="148" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="445" y="148" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="600" y="165" text-anchor="middle" fill="#94a3b8">2. Server fetches data &amp; builds HTML</text>
  <text x="600" y="179" text-anchor="middle" fill="#64748b" font-size="11">Full HTML with content</text>

  <line x1="600" y1="186" x2="600" y2="201" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="445" y="201" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="600" y="218" text-anchor="middle" fill="#94a3b8">3. Browser renders HTML instantly</text>
  <text x="600" y="232" text-anchor="middle" fill="#64748b" font-size="11">User sees content immediately</text>

  <line x1="600" y1="239" x2="600" y2="254" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="445" y="254" width="310" height="38" fill="#0f172a" rx="5"/>
  <text x="600" y="271" text-anchor="middle" fill="#94a3b8">4. JS loads &amp; hydrates (interactive)</text>
  <text x="600" y="285" text-anchor="middle" fill="#64748b" font-size="11">React attaches event handlers</text>

  <rect x="445" y="310" width="310" height="45" fill="#052e16" rx="5" stroke="#166534" stroke-width="1"/>
  <text x="600" y="328" text-anchor="middle" fill="#86efac" font-size="12">✅ Fast First Load (FCP)</text>
  <text x="600" y="345" text-anchor="middle" fill="#86efac" font-size="12">✅ SEO Friendly (full HTML)</text>
</svg>
```

---

## SVG: Next.js Request Lifecycle

```txt
<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="800" height="220" fill="#0f172a" rx="12"/>
  <text x="400" y="28" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="bold">Next.js Request Lifecycle</text>

  <!-- Boxes -->
  <rect x="20" y="55" width="110" height="50" fill="#1e3a5f" rx="6" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="76" text-anchor="middle" fill="#93c5fd">Browser</text>
  <text x="75" y="92" text-anchor="middle" fill="#60a5fa" font-size="10">User clicks link</text>

  <rect x="175" y="55" width="110" height="50" fill="#1e3a5f" rx="6" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="230" y="76" text-anchor="middle" fill="#93c5fd">CDN / Edge</text>
  <text x="230" y="92" text-anchor="middle" fill="#60a5fa" font-size="10">Cache check</text>

  <rect x="330" y="55" width="110" height="50" fill="#1e293b" rx="6" stroke="#6366f1" stroke-width="1.5"/>
  <text x="385" y="76" text-anchor="middle" fill="#a5b4fc">Middleware</text>
  <text x="385" y="92" text-anchor="middle" fill="#818cf8" font-size="10">Auth / redirect</text>

  <rect x="485" y="55" width="110" height="50" fill="#1e293b" rx="6" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="540" y="76" text-anchor="middle" fill="#c4b5fd">Next.js Server</text>
  <text x="540" y="92" text-anchor="middle" fill="#a78bfa" font-size="10">RSC + fetch data</text>

  <rect x="640" y="55" width="110" height="50" fill="#1e293b" rx="6" stroke="#ec4899" stroke-width="1.5"/>
  <text x="695" y="76" text-anchor="middle" fill="#f9a8d4">Response</text>
  <text x="695" y="92" text-anchor="middle" fill="#f472b6" font-size="10">HTML / JSON</text>

  <!-- Arrows -->
  <line x1="130" y1="80" x2="175" y2="80" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="285" y1="80" x2="330" y2="80" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="440" y1="80" x2="485" y2="80" stroke="#6366f1" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="595" y1="80" x2="640" y2="80" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Return arrow -->
  <path d="M695 105 Q695 155 400 155 Q105 155 75 105" fill="none" stroke="#34d399" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#garr)"/>
  <text x="400" y="175" text-anchor="middle" fill="#6ee7b7" font-size="11">Rendered HTML returned to browser → hydration</text>

  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="garr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
  </defs>
</svg>
```

---

## 📝 Interview Questions — Section 1

**Beginner:**
1. What is Next.js and how is it different from React?
2. What does SSR stand for and why does it matter for SEO?
3. Name three features of Next.js that React doesn't have out of the box.

**Intermediate:**
4. What is hydration in Next.js?
5. Explain the difference between SSR, SSG, and ISR.
6. When would you choose Next.js over plain React?

**Advanced:**
7. How does Next.js App Router differ from Pages Router in its rendering model?
8. What is Partial Prerendering (PPR) introduced in Next.js 14?
9. Explain the trade-offs of CSR vs SSR in terms of Time to First Byte (TTFB) and Total Blocking Time (TBT).

---
