---
title: "Next.js Fundamentals, Routing & Layouts"
description: "Beginner-friendly Next.js guide covering setup, project structure, file-based routing, layouts, templates, and core concepts."
---

# Next.js Complete Guide â€” Part 1

> **A beginner-friendly, production-level reference for modern Next.js development**

---

## Table of Contents

1. [Introduction to Next.js](#1-introduction-to-nextjs)
2. [Installing Next.js](#2-installing-nextjs)
3. [Next.js Folder Structure](#3-nextjs-folder-structure)
4. [Routing in Next.js](#4-routing-in-nextjs)
5. [Layouts and Templates](#5-layouts-and-templates)
6. [Summary & Key Takeaways](#summary--key-takeaways)
7. [Practice Exercises](#practice-exercises)
8. [Mini Project Ideas](#mini-project-ideas)
9. [Interview Preparation](#interview-preparation)

---

# 1. Introduction to Next.js

## What is Next.js?

Next.js is a **React framework** built by Vercel that adds powerful features on top of React â€” things React alone cannot do out of the box, like server-side rendering, file-based routing, automatic code splitting, and API routes.

> **Analogy**: If React is the engine of a car, Next.js is the full car â€” body, wheels, dashboard, GPS, and all. You can drive with just the engine, but the complete car is far more practical.

```
React  â†’  A JavaScript library for building UI components
Next.js â†’  A full-stack framework built on top of React
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
| SEO | Poor â€” content rendered client-side | Excellent â€” server renders HTML |
| Initial Load Speed | Slow â€” white screen until JS loads | Fast â€” HTML arrives ready |
| Routing | Manual setup with React Router | File-based, zero config |
| API Endpoints | Separate backend required | Built-in API routes |
| Code Splitting | Manual configuration | Automatic per page |
| Image Optimization | Manual | Built-in `<Image>` component |
| TypeScript | Manual setup | First-class support |
| Deployment | Complex | One-click on Vercel |

---

## Benefits of Using Next.js

- **Performance** â€” Automatic static optimization, image optimization, lazy loading
- **SEO** â€” Server-side and static rendering make pages crawlable
- **Developer Experience** â€” Fast refresh, TypeScript, ESLint all built-in
- **Full-Stack** â€” API routes let you write backend code in the same project
- **Flexibility** â€” Mix SSR, SSG, ISR, and CSR per page
- **Scalability** â€” Used by Fortune 500 companies in production

---

## Core Features of Next.js

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚               NEXT.JS FEATURES              â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ App Router      â”‚ File-based routing system  â”‚
â”‚ Server Comps    â”‚ React Server Components    â”‚
â”‚ Data Fetching   â”‚ fetch() with caching       â”‚
â”‚ API Routes      â”‚ Built-in backend endpoints â”‚
â”‚ Image Optim.    â”‚ <Image> component          â”‚
â”‚ Font Optim.     â”‚ next/font                  â”‚
â”‚ Metadata API    â”‚ SEO metadata management    â”‚
â”‚ Middleware      â”‚ Edge runtime functions     â”‚
â”‚ Streaming       â”‚ Progressive rendering      â”‚
â”‚ Turbopack       â”‚ Ultra-fast bundler         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## When to Use Next.js

âœ… **Use Next.js when:**
- Building a website that needs good SEO (blogs, marketing, e-commerce)
- You need fast initial page loads
- You want both frontend and backend in one project
- Your team prefers React but needs more structure
- Building a SaaS product, admin dashboard, or content platform

## When NOT to Use Next.js

âŒ **Avoid Next.js when:**
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
| SSR | âŒ | âœ… |
| SSG | âŒ | âœ… |
| API Routes | âŒ | âœ… |
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
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Browser â†’ Request Page
Browser â† Empty HTML (just <div id="root">)
Browser â†’ Downloads JS bundle
Browser â†’ Renders UI in browser
User sees content (slow first load)
Search bots see: empty page âŒ

SSR (Next.js)
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Browser â†’ Request Page
Server â†’ Builds HTML with data
Browser â† Full HTML (instant content)
User sees content immediately âœ…
Search bots see: full content âœ…
Browser â†’ Downloads JS (hydration)
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
  <text x="200" y="328" text-anchor="middle" fill="#fca5a5" font-size="12">âŒ Slow First Load</text>
  <text x="200" y="345" text-anchor="middle" fill="#fca5a5" font-size="12">âŒ Bad SEO (bots see empty page)</text>

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
  <text x="600" y="328" text-anchor="middle" fill="#86efac" font-size="12">âœ… Fast First Load (FCP)</text>
  <text x="600" y="345" text-anchor="middle" fill="#86efac" font-size="12">âœ… SEO Friendly (full HTML)</text>
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
  <text x="400" y="175" text-anchor="middle" fill="#6ee7b7" font-size="11">Rendered HTML returned to browser â†’ hydration</text>

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

## ðŸ“ Interview Questions â€” Section 1

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

# 2. Installing Next.js

## System Requirements

Before installing Next.js, ensure you have:

| Requirement | Minimum Version | Recommended |
|---|---|---|
| Node.js | 18.17.0 | 20.x LTS or later |
| npm | 9.x | 10.x |
| OS | Windows / macOS / Linux | Any modern OS |
| RAM | 4GB | 8GB+ |
| Disk | 1GB free | 5GB+ |

Check your Node version:

```bash
node --version   # Should show v18.17.0 or higher
npm --version    # Should show 9.x or higher
```

---

## Installing Node.js

If you don't have Node.js, install it from [nodejs.org](https://nodejs.org).

**Recommended: Use a version manager**

```bash
# Install nvm (Node Version Manager) on macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and use the latest LTS
nvm install --lts
nvm use --lts
```

```powershell
# On Windows, use nvm-windows or fnm
winget install Schniz.fnm
fnm install --lts
fnm use lts-latest
```

---

## Creating a New Next.js Project

### Using npm (default)

```bash
npx create-next-app@latest my-app
```

### Using yarn

```bash
yarn create next-app my-app
```

### Using pnpm

```bash
pnpm create next-app my-app
```

### Using bun

```bash
bunx create-next-app my-app
```

---

## Interactive Setup Prompts

When you run the command, you'll be asked:

```
What is your project named? â€º my-app
Would you like to use TypeScript? â€º Yes âœ“
Would you like to use ESLint? â€º Yes âœ“
Would you like to use Tailwind CSS? â€º Yes âœ“
Would you like your code inside a `src/` directory? â€º No
Would you like to use App Router? (recommended) â€º Yes âœ“
Would you like to use Turbopack for `next dev`? â€º Yes âœ“
Would you like to customize the import alias (@/*)? â€º No
```

> **Best Practice**: Always say **Yes** to TypeScript, App Router, and ESLint for any serious project.

---

## Key Configuration Explanations

### TypeScript
Next.js has first-class TypeScript support. Choosing TypeScript generates `.tsx`/`.ts` files and a `tsconfig.json`. TypeScript catches bugs at compile time before they reach production.

### ESLint
ESLint is a linter that enforces code quality rules. Next.js ships with `eslint-config-next`, which includes rules specific to Next.js like requiring `<Image>` instead of `<img>`.

### Tailwind CSS
Tailwind is a utility-first CSS framework. Next.js sets it up with `tailwind.config.ts` and `postcss.config.js` automatically.

### App Router
The App Router (introduced in Next.js 13) uses React Server Components by default. It lives inside the `app/` folder. **Always choose App Router** for new projects â€” the older Pages Router is legacy.

### Turbopack
Turbopack is Next.js's new Rust-based bundler, replacing Webpack. It's significantly faster for development. Stable as of Next.js 15.

---

## Development Server

```bash
cd my-app
npm run dev      # Start dev server at http://localhost:3000
```

With Turbopack (default in v15):
```bash
npm run dev      # Automatically uses Turbopack
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server (after build) |
| `npm run lint` | Run ESLint checks |

---

## Production Build

```bash
npm run build
```

This generates:
- Optimized JavaScript bundles
- Prerendered HTML for static pages
- Server bundles for dynamic routes

```bash
npm start         # Serves the production build locally
```

---

## Generated Files Explained

After running `create-next-app`, you'll see:

```
my-app/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ favicon.ico
â”‚   â”œâ”€â”€ globals.css
â”‚   â”œâ”€â”€ layout.tsx       â† Root layout (wraps all pages)
â”‚   â””â”€â”€ page.tsx         â† Home page (renders at /)
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ next.svg
â”‚   â””â”€â”€ vercel.svg
â”œâ”€â”€ .eslintrc.json       â† ESLint configuration
â”œâ”€â”€ .gitignore           â† Git ignored files
â”œâ”€â”€ next.config.ts       â† Next.js configuration
â”œâ”€â”€ package.json         â† Dependencies and scripts
â”œâ”€â”€ postcss.config.mjs   â† PostCSS for Tailwind
â”œâ”€â”€ tailwind.config.ts   â† Tailwind configuration
â””â”€â”€ tsconfig.json        â† TypeScript configuration
```

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Configure allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
```

### `tsconfig.json` (key parts)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,          // Enable all strict type checks
    "paths": {
      "@/*": ["./*"]         // Import alias: @/components = ./components
    }
  }
}
```

---

## SVG: Development Workflow

```txt
<svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="760" height="160" fill="#0f172a" rx="10"/>
  <text x="380" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Next.js Development Workflow</text>

  <rect x="20" y="45" width="120" height="45" fill="#1e293b" rx="6" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="65" text-anchor="middle" fill="#93c5fd">Write Code</text>
  <text x="80" y="81" text-anchor="middle" fill="#60a5fa" font-size="10">.tsx / .ts files</text>

  <rect x="180" y="45" width="120" height="45" fill="#1e293b" rx="6" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="240" y="65" text-anchor="middle" fill="#c4b5fd">Turbopack</text>
  <text x="240" y="81" text-anchor="middle" fill="#a78bfa" font-size="10">Compiles instantly</text>

  <rect x="340" y="45" width="120" height="45" fill="#1e293b" rx="6" stroke="#ec4899" stroke-width="1.5"/>
  <text x="400" y="65" text-anchor="middle" fill="#f9a8d4">Hot Reload</text>
  <text x="400" y="81" text-anchor="middle" fill="#f472b6" font-size="10">Browser updates</text>

  <rect x="500" y="45" width="120" height="45" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="560" y="65" text-anchor="middle" fill="#fcd34d">npm run build</text>
  <text x="560" y="81" text-anchor="middle" fill="#fbbf24" font-size="10">Optimized output</text>

  <rect x="650" y="45" width="90" height="45" fill="#052e16" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="695" y="65" text-anchor="middle" fill="#86efac">Deploy</text>
  <text x="695" y="81" text-anchor="middle" fill="#4ade80" font-size="10">Vercel / VPS</text>

  <line x1="140" y1="67" x2="180" y2="67" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#bl)"/>
  <line x1="300" y1="67" x2="340" y2="67" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#bl)"/>
  <line x1="460" y1="67" x2="500" y2="67" stroke="#ec4899" stroke-width="1.5" marker-end="url(#bl)"/>
  <line x1="620" y1="67" x2="650" y2="67" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#bl)"/>

  <!-- Loop back -->
  <path d="M400 90 Q400 130 240 130 Q150 130 80 130 L80 90" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#bl)"/>
  <text x="240" y="148" text-anchor="middle" fill="#64748b" font-size="10">Iterate until ready to build</text>

  <defs>
    <marker id="bl" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
</svg>
```

---

## Package Manager Comparison

| Feature | npm | yarn | pnpm | bun |
|---|---|---|---|---|
| Speed | Moderate | Fast | Very Fast | Fastest |
| Disk Usage | High | High | Low (symlinks) | Low |
| Lockfile | package-lock.json | yarn.lock | pnpm-lock.yaml | bun.lockb |
| Workspaces | âœ… | âœ… | âœ… | âœ… |
| Stability | Most stable | Very stable | Stable | Newer |
| Recommendation | âœ… Default | Good choice | Best for monorepos | Fastest builds |

---

## Troubleshooting Common Issues

| Error | Cause | Fix |
|---|---|---|
| `Node version too old` | Node < 18.17 | Update Node.js |
| `EACCES permission denied` | Wrong npm permissions | Use nvm or fix npm permissions |
| `Port 3000 already in use` | Another process | `npx kill-port 3000` |
| `Module not found` | Missing package | `npm install` |
| `Hydration mismatch` | Server/client HTML differs | Check for browser-only APIs in RSC |
| `Cannot read properties of undefined` | Async data not awaited | Use `async/await` properly |

---

## ðŸ“ Interview Questions â€” Section 2

**Beginner:**
1. What is the minimum Node.js version required for Next.js 14+?
2. What does `npm run build` do differently from `npm run dev`?
3. What is the App Router and when was it introduced?

**Intermediate:**
4. What is Turbopack and how does it differ from Webpack?
5. Explain the role of `next.config.ts` in a Next.js project.
6. What is the significance of `reactStrictMode: true`?

**Advanced:**
7. How would you configure Next.js to support multiple environments (dev/staging/prod)?
8. Explain how `tsconfig.json` path aliases improve code maintainability in large projects.

---

# 3. Next.js Folder Structure

## Why Structure Matters

> "Code is read more often than it is written." â€” Guido van Rossum

A well-organized folder structure:
- Makes onboarding new developers faster
- Reduces bugs from misplaced files
- Enables better team collaboration
- Scales gracefully from small to large projects

### Key Principles

| Principle | Description |
|---|---|
| Separation of Concerns | UI, business logic, and data layers separated |
| Feature Cohesion | Related files grouped together |
| Single Responsibility | Each file/folder has one clear purpose |
| Discoverability | A new developer can find anything intuitively |

---

## Beginner Project Structure

For small projects and learning:

```
my-app/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ layout.tsx          â† Root layout
â”‚   â”œâ”€â”€ page.tsx            â† Home page (/)
â”‚   â”œâ”€â”€ about/
â”‚   â”‚   â””â”€â”€ page.tsx        â† About page (/about)
â”‚   â””â”€â”€ globals.css
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ Navbar.tsx
â”‚   â”œâ”€â”€ Footer.tsx
â”‚   â””â”€â”€ Button.tsx
â”œâ”€â”€ public/
â”‚   â””â”€â”€ images/
â”‚       â””â”€â”€ logo.png
â”œâ”€â”€ next.config.ts
â”œâ”€â”€ package.json
â””â”€â”€ tsconfig.json
```

---

## Intermediate Project Structure

For real applications:

```
my-app/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ (auth)/
â”‚   â”‚   â”œâ”€â”€ login/page.tsx
â”‚   â”‚   â””â”€â”€ register/page.tsx
â”‚   â”œâ”€â”€ (dashboard)/
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â”œâ”€â”€ page.tsx
â”‚   â”‚   â””â”€â”€ settings/page.tsx
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â””â”€â”€ users/
â”‚   â”‚       â””â”€â”€ route.ts
â”‚   â”œâ”€â”€ layout.tsx
â”‚   â””â”€â”€ page.tsx
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ ui/
â”‚   â”‚   â”œâ”€â”€ Button.tsx
â”‚   â”‚   â”œâ”€â”€ Input.tsx
â”‚   â”‚   â””â”€â”€ Modal.tsx
â”‚   â””â”€â”€ shared/
â”‚       â”œâ”€â”€ Navbar.tsx
â”‚       â””â”€â”€ Footer.tsx
â”œâ”€â”€ lib/
â”‚   â”œâ”€â”€ db.ts               â† Database connection
â”‚   â””â”€â”€ auth.ts             â† Auth utilities
â”œâ”€â”€ hooks/
â”‚   â”œâ”€â”€ useAuth.ts
â”‚   â””â”€â”€ useDebounce.ts
â”œâ”€â”€ types/
â”‚   â””â”€â”€ index.ts            â† TypeScript interfaces
â”œâ”€â”€ utils/
â”‚   â”œâ”€â”€ format.ts
â”‚   â””â”€â”€ validation.ts
â””â”€â”€ public/
    â”œâ”€â”€ images/
    â””â”€â”€ fonts/
```

---

## Advanced Scalable Project Structure

For large teams and enterprise applications:

```
my-app/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ (auth)/
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â”œâ”€â”€ login/
â”‚   â”‚   â”‚   â”œâ”€â”€ page.tsx
â”‚   â”‚   â”‚   â””â”€â”€ loading.tsx
â”‚   â”‚   â””â”€â”€ register/
â”‚   â”‚       â””â”€â”€ page.tsx
â”‚   â”œâ”€â”€ (dashboard)/
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â”œâ”€â”€ page.tsx
â”‚   â”‚   â”œâ”€â”€ analytics/
â”‚   â”‚   â”‚   â””â”€â”€ page.tsx
â”‚   â”‚   â””â”€â”€ settings/
â”‚   â”‚       â””â”€â”€ page.tsx
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â”‚   â””â”€â”€ route.ts
â”‚   â”‚   â”œâ”€â”€ users/
â”‚   â”‚   â”‚   â””â”€â”€ route.ts
â”‚   â”‚   â””â”€â”€ products/
â”‚   â”‚       â””â”€â”€ route.ts
â”‚   â”œâ”€â”€ error.tsx
â”‚   â”œâ”€â”€ not-found.tsx
â”‚   â”œâ”€â”€ layout.tsx
â”‚   â””â”€â”€ page.tsx
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ ui/                 â† Reusable design system components
â”‚   â”‚   â”œâ”€â”€ Button/
â”‚   â”‚   â”‚   â”œâ”€â”€ Button.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Button.test.tsx
â”‚   â”‚   â”‚   â””â”€â”€ index.ts
â”‚   â”‚   â”œâ”€â”€ Input/
â”‚   â”‚   â””â”€â”€ Card/
â”‚   â”œâ”€â”€ forms/              â† Form-specific components
â”‚   â”‚   â”œâ”€â”€ LoginForm.tsx
â”‚   â”‚   â””â”€â”€ ProductForm.tsx
â”‚   â””â”€â”€ layouts/            â† Layout components
â”‚       â”œâ”€â”€ DashboardLayout.tsx
â”‚       â””â”€â”€ AuthLayout.tsx
â”œâ”€â”€ features/               â† Feature-based organization
â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â”œâ”€â”€ actions.ts
â”‚   â”‚   â””â”€â”€ types.ts
â”‚   â”œâ”€â”€ products/
â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â””â”€â”€ types.ts
â”‚   â””â”€â”€ users/
â”‚       â”œâ”€â”€ components/
â”‚       â””â”€â”€ types.ts
â”œâ”€â”€ lib/
â”‚   â”œâ”€â”€ db/
â”‚   â”‚   â”œâ”€â”€ index.ts        â† Database client (Prisma/Drizzle)
â”‚   â”‚   â””â”€â”€ schema.ts
â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â””â”€â”€ index.ts
â”‚   â””â”€â”€ email/
â”‚       â””â”€â”€ index.ts
â”œâ”€â”€ hooks/
â”‚   â”œâ”€â”€ useAuth.ts
â”‚   â”œâ”€â”€ useLocalStorage.ts
â”‚   â””â”€â”€ useDebounce.ts
â”œâ”€â”€ services/               â† External API integrations
â”‚   â”œâ”€â”€ stripe.ts
â”‚   â”œâ”€â”€ sendgrid.ts
â”‚   â””â”€â”€ cloudinary.ts
â”œâ”€â”€ store/                  â† Global state (Zustand/Redux)
â”‚   â”œâ”€â”€ index.ts
â”‚   â””â”€â”€ slices/
â”‚       â””â”€â”€ authSlice.ts
â”œâ”€â”€ types/
â”‚   â”œâ”€â”€ index.ts            â† Shared TypeScript types
â”‚   â”œâ”€â”€ api.ts
â”‚   â””â”€â”€ db.ts
â”œâ”€â”€ utils/
â”‚   â”œâ”€â”€ format.ts
â”‚   â”œâ”€â”€ validation.ts
â”‚   â””â”€â”€ helpers.ts
â”œâ”€â”€ config/
â”‚   â”œâ”€â”€ constants.ts
â”‚   â””â”€â”€ env.ts
â”œâ”€â”€ middleware.ts            â† Next.js Middleware
â””â”€â”€ public/
    â”œâ”€â”€ images/
    â”œâ”€â”€ icons/
    â””â”€â”€ fonts/
```

---

## Folder Purpose Reference

| Folder | Purpose | Contains |
|---|---|---|
| `app/` | Next.js App Router | Pages, layouts, API routes |
| `components/` | Reusable UI | React components |
| `lib/` | Core utilities | DB, auth, third-party setup |
| `hooks/` | Custom React hooks | `useXxx.ts` files |
| `utils/` | Pure functions | Formatters, validators |
| `services/` | External APIs | Stripe, email, storage |
| `types/` | TypeScript types | Interfaces, enums |
| `store/` | Global state | Zustand/Redux slices |
| `config/` | App configuration | Constants, env vars |
| `features/` | Feature modules | Self-contained feature code |
| `public/` | Static assets | Images, fonts, icons |
| `middleware.ts` | Edge middleware | Auth guards, redirects |

---

## SVG: Folder Relationships

```txt
<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="760" height="380" fill="#0f172a" rx="10"/>
  <text x="380" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Next.js Folder Architecture</text>

  <!-- app/ center -->
  <rect x="300" y="50" width="160" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="2"/>
  <text x="380" y="73" text-anchor="middle" fill="#93c5fd" font-size="13">app/</text>
  <text x="380" y="89" text-anchor="middle" fill="#60a5fa" font-size="10">Pages + API Routes</text>

  <!-- Surrounding folders -->
  <rect x="30" y="180" width="130" height="45" fill="#1e293b" rx="6" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="95" y="200" text-anchor="middle" fill="#c4b5fd">components/</text>
  <text x="95" y="215" text-anchor="middle" fill="#a78bfa" font-size="10">UI Components</text>

  <rect x="190" y="180" width="120" height="45" fill="#1e293b" rx="6" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="250" y="200" text-anchor="middle" fill="#67e8f9">lib/</text>
  <text x="250" y="215" text-anchor="middle" fill="#22d3ee" font-size="10">DB, Auth, Config</text>

  <rect x="330" y="180" width="100" height="45" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="380" y="200" text-anchor="middle" fill="#fcd34d">hooks/</text>
  <text x="380" y="215" text-anchor="middle" fill="#fbbf24" font-size="10">Custom Hooks</text>

  <rect x="450" y="180" width="110" height="45" fill="#1e293b" rx="6" stroke="#ec4899" stroke-width="1.5"/>
  <text x="505" y="200" text-anchor="middle" fill="#f9a8d4">services/</text>
  <text x="505" y="215" text-anchor="middle" fill="#f472b6" font-size="10">External APIs</text>

  <rect x="580" y="180" width="110" height="45" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="635" y="200" text-anchor="middle" fill="#86efac">utils/</text>
  <text x="635" y="215" text-anchor="middle" fill="#4ade80" font-size="10">Helper Functions</text>

  <!-- Bottom row -->
  <rect x="100" y="295" width="110" height="45" fill="#1e293b" rx="6" stroke="#f97316" stroke-width="1.5"/>
  <text x="155" y="315" text-anchor="middle" fill="#fed7aa">types/</text>
  <text x="155" y="330" text-anchor="middle" fill="#fb923c" font-size="10">TypeScript Types</text>

  <rect x="240" y="295" width="110" height="45" fill="#1e293b" rx="6" stroke="#a855f7" stroke-width="1.5"/>
  <text x="295" y="315" text-anchor="middle" fill="#d8b4fe">features/</text>
  <text x="295" y="330" text-anchor="middle" fill="#c084fc" font-size="10">Feature Modules</text>

  <rect x="380" y="295" width="110" height="45" fill="#1e293b" rx="6" stroke="#64748b" stroke-width="1.5"/>
  <text x="435" y="315" text-anchor="middle" fill="#cbd5e1">public/</text>
  <text x="435" y="330" text-anchor="middle" fill="#94a3b8" font-size="10">Static Assets</text>

  <rect x="520" y="295" width="130" height="45" fill="#1e293b" rx="6" stroke="#ef4444" stroke-width="1.5"/>
  <text x="585" y="315" text-anchor="middle" fill="#fca5a5">middleware.ts</text>
  <text x="585" y="330" text-anchor="middle" fill="#f87171" font-size="10">Edge Guards</text>

  <!-- Lines from app/ down -->
  <line x1="320" y1="100" x2="95" y2="180" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="350" y1="100" x2="250" y2="180" stroke="#06b6d4" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="380" y1="100" x2="380" y2="180" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="410" y1="100" x2="505" y2="180" stroke="#ec4899" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="440" y1="100" x2="635" y2="180" stroke="#22c55e" stroke-width="1" stroke-dasharray="4,3"/>
</svg>
```

---

## Real-World Structure Examples

### E-commerce Project

```
ecommerce/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ (shop)/
â”‚   â”‚   â”œâ”€â”€ page.tsx             â† Home / product listing
â”‚   â”‚   â”œâ”€â”€ products/
â”‚   â”‚   â”‚   â”œâ”€â”€ page.tsx         â† All products
â”‚   â”‚   â”‚   â””â”€â”€ [slug]/page.tsx  â† Product detail
â”‚   â”‚   â””â”€â”€ cart/page.tsx        â† Shopping cart
â”‚   â”œâ”€â”€ (checkout)/
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â””â”€â”€ page.tsx
â”‚   â”œâ”€â”€ (account)/
â”‚   â”‚   â”œâ”€â”€ orders/page.tsx
â”‚   â”‚   â””â”€â”€ profile/page.tsx
â”‚   â””â”€â”€ api/
â”‚       â”œâ”€â”€ products/route.ts
â”‚       â”œâ”€â”€ orders/route.ts
â”‚       â””â”€â”€ webhooks/stripe/route.ts
â”œâ”€â”€ features/
â”‚   â”œâ”€â”€ cart/
â”‚   â”œâ”€â”€ checkout/
â”‚   â””â”€â”€ products/
â””â”€â”€ services/
    â”œâ”€â”€ stripe.ts
    â””â”€â”€ inventory.ts
```

### SaaS Dashboard

```
saas-app/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ (marketing)/            â† Public pages
â”‚   â”‚   â”œâ”€â”€ page.tsx
â”‚   â”‚   â””â”€â”€ pricing/page.tsx
â”‚   â”œâ”€â”€ (app)/                  â† Authenticated app
â”‚   â”‚   â”œâ”€â”€ layout.tsx          â† Dashboard layout
â”‚   â”‚   â”œâ”€â”€ dashboard/page.tsx
â”‚   â”‚   â”œâ”€â”€ projects/
â”‚   â”‚   â””â”€â”€ team/
â”‚   â””â”€â”€ api/
â”‚       â””â”€â”€ webhooks/
â”œâ”€â”€ features/
â”‚   â”œâ”€â”€ projects/
â”‚   â”œâ”€â”€ billing/
â”‚   â””â”€â”€ team/
â””â”€â”€ lib/
    â”œâ”€â”€ db/
    â””â”€â”€ stripe/
```

### Blog Application

```
blog/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ page.tsx                â† Blog listing
â”‚   â”œâ”€â”€ posts/
â”‚   â”‚   â””â”€â”€ [slug]/
â”‚   â”‚       â”œâ”€â”€ page.tsx        â† Blog post
â”‚   â”‚       â””â”€â”€ loading.tsx
â”‚   â”œâ”€â”€ categories/
â”‚   â”‚   â””â”€â”€ [category]/page.tsx
â”‚   â””â”€â”€ feed.xml/route.ts       â† RSS feed
â”œâ”€â”€ lib/
â”‚   â””â”€â”€ mdx.ts                  â† MDX processing
â””â”€â”€ content/
    â””â”€â”€ posts/
        â””â”€â”€ hello-world.mdx
```

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `UserProfile` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| API routes | lowercase | `route.ts` |
| Page files | lowercase | `page.tsx` |
| Folders | lowercase with hyphens | `user-profile/` |

---

## Common Mistakes âŒ

```
âŒ Putting all components in one giant file
âŒ Mixing UI logic with business logic
âŒ Importing directly from deep nested paths (use barrel exports)
âŒ Keeping API keys in component files (use environment variables)
âŒ Not separating server and client components
âŒ Creating circular imports between modules
âœ… Use @/ alias instead of ../../.. relative paths
âœ… Create index.ts barrel files for clean imports
```

---

## ðŸ“ Interview Questions â€” Section 3

**Beginner:**
1. What is the purpose of the `public/` folder in Next.js?
2. What goes inside the `lib/` folder vs `utils/` folder?
3. Where should TypeScript interfaces be stored?

**Intermediate:**
4. What is feature-based architecture and when should you use it?
5. How do barrel files (index.ts) improve imports in large projects?
6. Explain the difference between `components/ui/` and `components/features/`.

**Advanced:**
7. How would you structure a monorepo with multiple Next.js apps sharing components?
8. Describe the Clean Architecture pattern and how it applies to Next.js.

---

# 4. Routing in Next.js

## How File-Based Routing Works

Next.js App Router uses the **file system as the router**. Every folder inside `app/` that contains a `page.tsx` file becomes a route.

```
app/
â”œâ”€â”€ page.tsx          â†’  /
â”œâ”€â”€ about/
â”‚   â””â”€â”€ page.tsx      â†’  /about
â”œâ”€â”€ blog/
â”‚   â”œâ”€â”€ page.tsx      â†’  /blog
â”‚   â””â”€â”€ post/
â”‚       â””â”€â”€ page.tsx  â†’  /blog/post
```

> **Analogy**: Think of your `app/` folder as a filing cabinet. Each drawer (folder) is a URL segment, and the `page.tsx` inside is the actual page.

---

## Route File Conventions

| File | Purpose | URL |
|---|---|---|
| `page.tsx` | The page UI | `/route` |
| `layout.tsx` | Shared UI wrapper | Wraps children |
| `loading.tsx` | Loading skeleton | Shows while page loads |
| `error.tsx` | Error boundary | Shows on error |
| `not-found.tsx` | 404 page | When route not found |
| `route.ts` | API endpoint | REST API handler |
| `template.tsx` | Re-renders on nav | Like layout, but fresh each time |
| `default.tsx` | Fallback for parallel routes | Default slot content |

---

## Basic Routes

```typescript
// app/page.tsx â€” renders at /
export default function HomePage() {
  return <h1>Welcome Home</h1>;
}

// app/about/page.tsx â€” renders at /about
export default function AboutPage() {
  return <h1>About Us</h1>;
}

// app/blog/page.tsx â€” renders at /blog
export default function BlogPage() {
  return <h1>Blog</h1>;
}
```

---

## Nested Routes

```
app/
â””â”€â”€ dashboard/
    â”œâ”€â”€ page.tsx         â†’  /dashboard
    â”œâ”€â”€ analytics/
    â”‚   â””â”€â”€ page.tsx     â†’  /dashboard/analytics
    â””â”€â”€ settings/
        â””â”€â”€ page.tsx     â†’  /dashboard/settings
```

Each segment maps directly to a URL path.

---

## Dynamic Routes

Use square brackets `[param]` to create dynamic segments:

```
app/
â”œâ”€â”€ blog/
â”‚   â””â”€â”€ [slug]/
â”‚       â””â”€â”€ page.tsx     â†’  /blog/hello-world
â”‚                        â†’  /blog/nextjs-guide
â””â”€â”€ users/
    â””â”€â”€ [id]/
        â””â”€â”€ page.tsx     â†’  /users/123
```

```typescript
// app/blog/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  // Fetch post data using the slug
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

## Catch-All Routes

Use `[...slug]` to match multiple URL segments:

```
app/
â””â”€â”€ docs/
    â””â”€â”€ [...slug]/
        â””â”€â”€ page.tsx
```

| URL | `params.slug` |
|---|---|
| `/docs/intro` | `['intro']` |
| `/docs/guide/setup` | `['guide', 'setup']` |
| `/docs/a/b/c` | `['a', 'b', 'c']` |

```typescript
// app/docs/[...slug]/page.tsx
interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/'); // e.g., "guide/setup"

  return <div>Docs: {path}</div>;
}
```

---

## Optional Catch-All Routes

Use `[[...slug]]` (double brackets) to also match the base path:

```
app/
â””â”€â”€ shop/
    â””â”€â”€ [[...categories]]/
        â””â”€â”€ page.tsx
```

| URL | `params.categories` |
|---|---|
| `/shop` | `undefined` |
| `/shop/clothing` | `['clothing']` |
| `/shop/clothing/shirts` | `['clothing', 'shirts']` |

---

## Route Groups

Wrap a folder in parentheses `(group)` to organize routes **without affecting the URL**:

```
app/
â”œâ”€â”€ (marketing)/
â”‚   â”œâ”€â”€ page.tsx         â†’  /
â”‚   â”œâ”€â”€ about/page.tsx   â†’  /about
â”‚   â””â”€â”€ pricing/page.tsx â†’  /pricing
â””â”€â”€ (dashboard)/
    â”œâ”€â”€ layout.tsx        â† Dashboard layout (only for these routes)
    â””â”€â”€ dashboard/page.tsx â†’  /dashboard
```

Route groups are perfect for:
- Applying different layouts to groups of routes
- Organizing code without changing URLs
- Separating marketing pages from app pages

---

## Parallel Routes

Render multiple pages simultaneously in the same layout using `@slot` syntax:

```
app/
â””â”€â”€ dashboard/
    â”œâ”€â”€ layout.tsx
    â”œâ”€â”€ page.tsx
    â”œâ”€â”€ @analytics/
    â”‚   â””â”€â”€ page.tsx      â† analytics slot
    â””â”€â”€ @notifications/
        â””â”€â”€ page.tsx      â† notifications slot
```

```typescript
// app/dashboard/layout.tsx
interface Props {
  children: React.ReactNode;
  analytics: React.ReactNode;    // @analytics slot
  notifications: React.ReactNode; // @notifications slot
}

export default function DashboardLayout({
  children,
  analytics,
  notifications,
}: Props) {
  return (
    <div className="dashboard">
      <main>{children}</main>
      <aside>
        {analytics}
        {notifications}
      </aside>
    </div>
  );
}
```

---

## Intercepting Routes

Intercept routes to show content in a modal while the URL changes, but show the full page on direct navigation:

```
app/
â”œâ”€â”€ feed/
â”‚   â””â”€â”€ page.tsx
â”œâ”€â”€ photos/
â”‚   â””â”€â”€ [id]/
â”‚       â””â”€â”€ page.tsx          â† Full photo page
â””â”€â”€ (.)photos/
    â””â”€â”€ [id]/
        â””â”€â”€ page.tsx          â† Modal version (intercepted)
```

| Convention | Matches |
|---|---|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | Root `app/` directory |

---

## Linking Between Pages

### `<Link>` Component

Always prefer `<Link>` over `<a>` for internal navigation:

```typescript
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      {/* Dynamic route */}
      <Link href={`/blog/${post.slug}`}>
        {post.title}
      </Link>

      {/* With query params */}
      <Link href={{ pathname: '/search', query: { q: 'nextjs' } }}>
        Search
      </Link>

      {/* Replace instead of push to history */}
      <Link href="/dashboard" replace>
        Dashboard
      </Link>

      {/* Prefetch control */}
      <Link href="/about" prefetch={false}>
        About (no prefetch)
      </Link>
    </nav>
  );
}
```

### `useRouter()` Hook

Use for **programmatic navigation** in Client Components:

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  async function handleLogin() {
    const success = await loginUser();

    if (success) {
      router.push('/dashboard');      // Navigate
      // router.replace('/dashboard') // Navigate without history
      // router.back()                // Go back
      // router.refresh()             // Re-fetch server data
    }
  }

  return <button onClick={handleLogin}>Login</button>;
}
```

### `redirect()` Function

Use in **Server Components** to redirect:

```typescript
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getSession();

  // Redirects and stops execution
  if (!session) {
    redirect('/login');
  }

  return <div>Protected Content</div>;
}
```

### `notFound()` Function

Trigger the `not-found.tsx` page:

```typescript
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound(); // Renders not-found.tsx
  }

  return <div>{product.name}</div>;
}
```

---

## SVG: Routing Flow Diagram

```txt
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="760" height="320" fill="#0f172a" rx="10"/>
  <text x="380" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Next.js App Router â€” Routing Flow</text>

  <!-- URL input -->
  <rect x="300" y="45" width="160" height="40" fill="#1e3a5f" rx="6" stroke="#3b82f6" stroke-width="2"/>
  <text x="380" y="65" text-anchor="middle" fill="#93c5fd">URL Request</text>
  <text x="380" y="79" text-anchor="middle" fill="#60a5fa" font-size="10">/dashboard/settings</text>

  <!-- Middleware -->
  <line x1="380" y1="85" x2="380" y2="105" stroke="#475569" stroke-width="1.5"/>
  <rect x="305" y="105" width="150" height="38" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="380" y="122" text-anchor="middle" fill="#fcd34d">middleware.ts</text>
  <text x="380" y="136" text-anchor="middle" fill="#fbbf24" font-size="10">Auth check, rewrites</text>

  <!-- Branch: Auth fail -->
  <line x1="305" y1="124" x2="200" y2="124" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="60" y="108" width="140" height="32" fill="#450a0a" rx="5" stroke="#991b1b" stroke-width="1"/>
  <text x="130" y="128" text-anchor="middle" fill="#fca5a5">redirect('/login')</text>

  <!-- App Router -->
  <line x1="380" y1="143" x2="380" y2="163" stroke="#475569" stroke-width="1.5"/>
  <rect x="280" y="163" width="200" height="38" fill="#1e293b" rx="6" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="380" y="180" text-anchor="middle" fill="#c4b5fd">App Router Matches</text>
  <text x="380" y="194" text-anchor="middle" fill="#a78bfa" font-size="10">app/dashboard/settings/page.tsx</text>

  <!-- Layout tree -->
  <line x1="380" y1="201" x2="380" y2="221" stroke="#475569" stroke-width="1.5"/>
  <rect x="270" y="221" width="220" height="55" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="380" y="238" text-anchor="middle" fill="#86efac">Layout Hierarchy</text>
  <text x="380" y="252" text-anchor="middle" fill="#4ade80" font-size="10">app/layout.tsx (root)</text>
  <text x="380" y="265" text-anchor="middle" fill="#4ade80" font-size="10">app/dashboard/layout.tsx</text>

  <!-- Page render -->
  <line x1="380" y1="276" x2="380" y2="296" stroke="#475569" stroke-width="1.5"/>
  <rect x="295" y="296" width="170" height="18" fill="#052e16" rx="4" stroke="#166534" stroke-width="1"/>
  <text x="380" y="309" text-anchor="middle" fill="#86efac">Page Component Renders</text>
</svg>
```

---

## SVG: URL Mapping Diagram

```txt
<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="760" height="280" fill="#0f172a" rx="10"/>
  <text x="380" y="24" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">File System â†’ URL Mapping</text>

  <!-- Headers -->
  <text x="190" y="48" text-anchor="middle" fill="#64748b" font-size="12">File Path</text>
  <text x="570" y="48" text-anchor="middle" fill="#64748b" font-size="12">URL Route</text>
  <line x1="380" y1="35" x2="380" y2="270" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Rows -->
  <text x="190" y="75" text-anchor="middle" fill="#93c5fd">app/page.tsx</text>
  <text x="570" y="75" text-anchor="middle" fill="#86efac">/</text>
  <line x1="20" y1="83" x2="740" y2="83" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="105" text-anchor="middle" fill="#93c5fd">app/about/page.tsx</text>
  <text x="570" y="105" text-anchor="middle" fill="#86efac">/about</text>
  <line x1="20" y1="113" x2="740" y2="113" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="135" text-anchor="middle" fill="#93c5fd">app/blog/[slug]/page.tsx</text>
  <text x="570" y="135" text-anchor="middle" fill="#86efac">/blog/:slug</text>
  <line x1="20" y1="143" x2="740" y2="143" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="165" text-anchor="middle" fill="#93c5fd">app/docs/[...slug]/page.tsx</text>
  <text x="570" y="165" text-anchor="middle" fill="#86efac">/docs/*</text>
  <line x1="20" y1="173" x2="740" y2="173" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="195" text-anchor="middle" fill="#93c5fd">app/(auth)/login/page.tsx</text>
  <text x="570" y="195" text-anchor="middle" fill="#86efac">/login</text>
  <line x1="20" y1="203" x2="740" y2="203" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="225" text-anchor="middle" fill="#93c5fd">app/api/users/route.ts</text>
  <text x="570" y="225" text-anchor="middle" fill="#fcd34d">GET /api/users</text>
  <line x1="20" y1="233" x2="740" y2="233" stroke="#1e293b" stroke-width="1"/>

  <text x="190" y="258" text-anchor="middle" fill="#93c5fd">app/blog/[[...cat]]/page.tsx</text>
  <text x="570" y="258" text-anchor="middle" fill="#86efac">/blog or /blog/*</text>
</svg>
```

---

## SEO Benefits of Routing

- Each page has a unique URL â†’ indexable by search engines
- Server-rendered pages mean bots see full HTML content
- `layout.tsx` + Metadata API let you set `<title>` and `<meta>` per route
- Loading states prevent layout shift (better Core Web Vitals)

---

## Common Routing Mistakes âŒ

```
âŒ Using <a href="/about"> instead of <Link href="/about">
   (causes full page reload instead of client-side navigation)

âŒ Calling useRouter() in a Server Component
   (only works in Client Components)

âŒ Forgetting to add 'use client' when using useRouter
   (will throw an error)

âŒ Not handling the case when a dynamic param doesn't exist
   (always use notFound() when data is null)

âŒ Creating deeply nested routes unnecessarily
   (use route groups to organize without deep nesting)

âœ… Always use <Link> for internal navigation
âœ… Use redirect() in Server Components, useRouter() in Client
âœ… Always handle notFound() for dynamic routes
âœ… Use route groups () to organize without changing URLs
```

---

## ðŸ“ Interview Questions â€” Section 4

**Beginner:**
1. How does file-based routing work in Next.js?
2. What is the difference between `<Link>` and `<a>` in Next.js?
3. How do you create a dynamic route in Next.js?

**Intermediate:**
4. What is the difference between `[slug]`, `[...slug]`, and `[[...slug]]`?
5. What are route groups and when would you use them?
6. Explain parallel routes and give a real-world use case.

**Advanced:**
7. How do intercepting routes work and when would you use them (e.g., photo modal)?
8. Explain the difference between `redirect()` (Server Component) and `router.push()` (Client Component) in terms of performance.
9. How does prefetching work with `<Link>` and how would you disable it?

---

# 5. Layouts and Templates

## What is a Layout?

A `layout.tsx` file wraps its child pages and **persists across navigation**. When a user navigates between pages sharing the same layout, the layout component does NOT re-render â€” only the page content changes.

> **Analogy**: A layout is like the frame of a house. When you walk between rooms (pages), the walls (layout) don't rebuild â€” only what's inside the room changes.

---

## Root Layout (Required)

Every Next.js app **must** have a root layout at `app/layout.tsx`. It replaces the old `_document.js` and `_app.js` from Pages Router:

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Load the font
const inter = Inter({ subsets: ['latin'] });

// Page metadata (SEO)
export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with Next.js',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Must include <html> and <body>
    <html lang="en">
      <body className={inter.className}>
        <header>Site-wide Header</header>
        {children}  {/* Page content renders here */}
        <footer>Site-wide Footer</footer>
      </body>
    </html>
  );
}
```

---

## Nested Layouts

You can nest layouts â€” each folder can have its own `layout.tsx`:

```
app/
â”œâ”€â”€ layout.tsx              â† Root layout (wraps everything)
â”œâ”€â”€ page.tsx
â””â”€â”€ dashboard/
    â”œâ”€â”€ layout.tsx           â† Dashboard layout (wraps dashboard pages)
    â”œâ”€â”€ page.tsx
    â””â”€â”€ settings/
        â””â”€â”€ page.tsx
```

```typescript
// app/dashboard/layout.tsx
import Sidebar from '@/components/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
```

When visiting `/dashboard/settings`, the render order is:
```
RootLayout
  â””â”€â”€ DashboardLayout
        â””â”€â”€ SettingsPage
```

---

## What is a Template?

A `template.tsx` is similar to a layout but **re-renders on every navigation**. Each route gets a fresh instance.

```typescript
// app/dashboard/template.tsx
'use client';

import { useEffect } from 'react';

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  // This runs on every navigation within dashboard
  useEffect(() => {
    console.log('Page changed!');
  }, []);

  return <div>{children}</div>;
}
```

---

## Layout vs Template

| Feature | `layout.tsx` | `template.tsx` |
|---|---|---|
| Re-renders on navigation | âŒ No (persists) | âœ… Yes (fresh instance) |
| State preserved | âœ… Yes | âŒ No |
| Effects re-run | âŒ No | âœ… Yes |
| Use case | Sidebar, navbar | Analytics, animations |
| Performance | Better | Slightly worse |

**When to use Template:**
- Page transition animations (each page enters fresh)
- Analytics pageview tracking (`useEffect` must run per page)
- Resetting UI state on navigation
- Enter/exit animations per route

---

## Metadata API

Next.js has a built-in Metadata API for managing `<head>` content:

### Static Metadata

```typescript
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | My Company',
  description: 'Learn about our mission and team.',
  keywords: ['next.js', 'react', 'web development'],
  authors: [{ name: 'John Doe', url: 'https://johndoe.com' }],
  openGraph: {
    title: 'About Us | My Company',
    description: 'Learn about our mission and team.',
    url: 'https://mycompany.com/about',
    siteName: 'My Company',
    images: [
      {
        url: 'https://mycompany.com/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About My Company',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | My Company',
    description: 'Learn about our mission and team.',
    images: ['https://mycompany.com/og-about.jpg'],
  },
};

export default function AboutPage() {
  return <div>...</div>;
}
```

### Dynamic Metadata

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// generateMetadata is called before rendering the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}
```

### Title Templates

```typescript
// app/layout.tsx â€” Define a title template
export const metadata: Metadata = {
  title: {
    template: '%s | My Company',   // %s = page-specific title
    default: 'My Company',          // fallback when no title set
  },
};

// app/about/page.tsx â€” Just set the page title
export const metadata: Metadata = {
  title: 'About Us',  // Becomes: "About Us | My Company"
};
```

---

## Real-World: Dashboard Layout

```typescript
// app/(dashboard)/layout.tsx
import type { Metadata } from 'next';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'Dashboard',
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={session.user} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Top header bar */}
        <Header user={session.user} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## Real-World: Authentication Layout

```typescript
// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Decorative left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="mt-4 text-indigo-200">
            The best platform for your projects.
          </p>
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}
```

---

## Nested Dashboard Layout Example

```
app/
â”œâ”€â”€ layout.tsx                    â† Root: <html>, <body>
â”œâ”€â”€ (marketing)/
â”‚   â”œâ”€â”€ layout.tsx                â† Marketing: Navbar + Footer
â”‚   â””â”€â”€ page.tsx
â””â”€â”€ (app)/
    â”œâ”€â”€ layout.tsx                â† App: Auth check + Dashboard shell
    â””â”€â”€ dashboard/
        â”œâ”€â”€ layout.tsx            â† Dashboard: Sidebar
        â”œâ”€â”€ page.tsx
        â”œâ”€â”€ analytics/
        â”‚   â”œâ”€â”€ layout.tsx        â† Analytics: Tab navigation
        â”‚   â””â”€â”€ page.tsx
        â””â”€â”€ settings/
            â””â”€â”€ page.tsx
```

The render tree for `/dashboard/analytics`:
```
RootLayout
  â””â”€â”€ AppLayout (auth check, sidebar)
        â””â”€â”€ DashboardLayout (sidebar, header)
              â””â”€â”€ AnalyticsLayout (tabs)
                    â””â”€â”€ AnalyticsPage
```

---

## SVG: Layout Hierarchy

```txt
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="11">
  <rect width="760" height="360" fill="#0f172a" rx="10"/>
  <text x="380" y="24" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Layout Hierarchy â€” /dashboard/settings</text>

  <!-- Root layout box -->
  <rect x="20" y="40" width="720" height="300" fill="none" rx="8" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="40" y="58" fill="#3b82f6" font-size="11">RootLayout (app/layout.tsx)</text>

  <!-- Dashboard layout box -->
  <rect x="50" y="70" width="640" height="240" fill="none" rx="7" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="70" y="88" fill="#8b5cf6" font-size="11">DashboardLayout (app/dashboard/layout.tsx)</text>

  <!-- Sidebar -->
  <rect x="80" y="100" width="120" height="185" fill="#1e293b" rx="6" stroke="#64748b" stroke-width="1"/>
  <text x="140" y="122" text-anchor="middle" fill="#94a3b8">Sidebar</text>
  <text x="140" y="140" text-anchor="middle" fill="#64748b" font-size="10">Persists across</text>
  <text x="140" y="154" text-anchor="middle" fill="#64748b" font-size="10">dashboard pages</text>
  <rect x="88" y="165" width="104" height="20" fill="#334155" rx="3"/>
  <text x="140" y="178" text-anchor="middle" fill="#60a5fa" font-size="10">Dashboard</text>
  <rect x="88" y="190" width="104" height="20" fill="#1e40af" rx="3"/>
  <text x="140" y="203" text-anchor="middle" fill="#93c5fd" font-size="10">Settings â—€</text>
  <rect x="88" y="215" width="104" height="20" fill="#334155" rx="3"/>
  <text x="140" y="228" text-anchor="middle" fill="#60a5fa" font-size="10">Analytics</text>

  <!-- Page content box -->
  <rect x="220" y="100" width="450" height="185" fill="none" rx="6" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="238" y="118" fill="#22c55e" font-size="11">Page (app/dashboard/settings/page.tsx)</text>

  <!-- Settings page content -->
  <rect x="240" y="128" width="410" height="145" fill="#1e293b" rx="5"/>
  <text x="445" y="150" text-anchor="middle" fill="#86efac">Settings Page Content</text>
  <rect x="260" y="162" width="370" height="28" fill="#334155" rx="4"/>
  <text x="445" y="180" text-anchor="middle" fill="#94a3b8" font-size="10">Profile Settings Form</text>
  <rect x="260" y="197" width="370" height="28" fill="#334155" rx="4"/>
  <text x="445" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Notification Preferences</text>
  <rect x="260" y="232" width="370" height="28" fill="#334155" rx="4"/>
  <text x="445" y="250" text-anchor="middle" fill="#94a3b8" font-size="10">Security Settings</text>
</svg>
```

---

## Protected Route Layout Pattern

```typescript
// app/(protected)/layout.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Server-side protection â€” no client-side flicker
  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

---

## Sidebar Layout with Dynamic Navigation

```typescript
// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: 'ðŸ“Š' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: 'ðŸ“ˆ' },
  { href: '/dashboard/users', label: 'Users', icon: 'ðŸ‘¥' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'âš™ï¸' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg transition',
              // Highlight active route
              pathname === item.href
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

---

## Common Layout Mistakes âŒ

```
âŒ Putting <html> and <body> in a nested layout
   (Only the root layout should have these)

âŒ Using useState in a layout without 'use client'
   (Layouts are Server Components by default)

âŒ Fetching data in layout AND page separately
   (Next.js deduplicates fetch(), but still avoid duplication)

âŒ Using template.tsx when layout.tsx would work
   (Template is heavier â€” use only when re-rendering is needed)

âŒ Forgetting that layouts don't receive searchParams
   (Only pages receive searchParams â€” layouts do not)

âœ… Do auth checks in layouts, not in every page
âœ… Use the Metadata API instead of manually adding <title> tags
âœ… Use generateMetadata() for dynamic SEO data
âœ… Keep the root layout minimal â€” just globals, font, and metadata
```

---

## ðŸ“ Interview Questions â€” Section 5

**Beginner:**
1. What is the difference between `layout.tsx` and `template.tsx`?
2. Why is the root layout required in Next.js App Router?
3. How do you add metadata like title and description in Next.js?

**Intermediate:**
4. How does nested layout work and in what order do they render?
5. How do you implement protected routes using layouts?
6. What is the Title Template in Next.js Metadata API?

**Advanced:**
7. How does Next.js deduplicate fetch requests made in both a layout and its child page?
8. Explain how `generateMetadata()` differs from the static `metadata` export and when to use each.
9. Describe how you would implement a multi-tenant SaaS app using nested layouts with different branding per tenant.

---

# Summary & Key Takeaways

## Key Concepts Learned

| Concept | Key Point |
|---|---|
| Next.js | Full-stack React framework with SSR, routing, and more |
| SSR | Server renders HTML â€” fast loads and good SEO |
| App Router | File-system routing inside the `app/` folder |
| RSC | React Server Components â€” no JS sent for server components |
| Layouts | Persistent UI wrappers that don't re-render on navigation |
| Metadata | SEO tags managed via `metadata` export or `generateMetadata()` |
| Dynamic Routes | `[param]`, `[...param]`, `[[...param]]` |
| Route Groups | `(group)` â€” organize without affecting URL |

## Important Terminology

| Term | Definition |
|---|---|
| SSR | Server-Side Rendering |
| SSG | Static Site Generation |
| ISR | Incremental Static Regeneration |
| CSR | Client-Side Rendering |
| RSC | React Server Components |
| Hydration | Attaching JS interactivity to server-rendered HTML |
| Layout | Persistent UI wrapper shared across pages |
| Template | UI wrapper that re-renders on every navigation |
| Turbopack | Rust-based bundler replacing Webpack |

## Architecture Recap

```
Next.js Request Flow:
Request â†’ CDN (cache hit?) â†’ Middleware (auth?) â†’
App Router (match route) â†’ Layout Tree â†’ Page Component â†’
Fetch data (Server) â†’ Render HTML â†’ Stream to browser â†’
Hydrate (Client JS loads) â†’ Interactive
```

---

# Practice Exercises

## Beginner Exercises

1. **Static Page**: Create a Next.js app with pages: Home, About, Contact. Link them with `<Link>`.
2. **Dynamic Route**: Build a `/users/[id]` page that displays a user's name using mock data.
3. **Layout**: Add a `Navbar` and `Footer` to the root layout so they appear on every page.
4. **Metadata**: Add unique `<title>` and `<description>` to each page using the Metadata API.
5. **Folder Structure**: Organize a project with 5 pages into a clean folder structure.

## Intermediate Exercises

6. **Route Groups**: Use route groups to apply a dashboard layout to some routes and a marketing layout to others â€” without changing the URLs.
7. **Catch-All**: Build a `/docs/[...slug]` route that renders docs based on the URL path.
8. **Nested Layouts**: Create a dashboard with a root layout (header), dashboard layout (sidebar), and settings layout (tabs).
9. **Protected Routes**: Implement a layout that redirects unauthenticated users to `/login`.
10. **Dynamic Metadata**: Use `generateMetadata()` to fetch a blog post and return its title/description as metadata.

## Advanced Exercises

11. **Parallel Routes**: Build a dashboard with two parallel slots â€” one for analytics charts, one for recent activity.
12. **Intercepting Routes**: Implement a photo gallery where clicking a photo shows it in a modal (intercepted route), but `/photos/[id]` shows it full-screen on direct navigation.
13. **E-commerce Structure**: Design a complete folder structure for an e-commerce app with products, cart, checkout, and account management.
14. **ISR with Revalidation**: Build a blog where posts are statically generated but revalidate every 60 seconds.
15. **Middleware Auth**: Write middleware that protects all `/dashboard/*` routes and redirects to `/login` if no session cookie exists.

---

# Mini Project Ideas

| Project | Description | Key Concepts Used |
|---|---|---|
| **Portfolio Website** | Personal site with projects, blog, contact | SSG, Metadata, Layouts |
| **Blog Platform** | Write and publish posts with Markdown | Dynamic routes, ISR, MDX |
| **Admin Dashboard** | Manage users and data with charts | Parallel routes, protected layouts |
| **E-commerce Frontend** | Browse products, add to cart, checkout | Dynamic routes, route groups |
| **Authentication App** | Sign up, login, protected profile page | Middleware, layouts, redirect() |
| **Documentation Site** | Multi-page docs with sidebar navigation | Catch-all routes, nested layouts |
| **Link Shortener** | Create and track short URLs | API routes, dynamic routes |

---

# Interview Preparation

## Beginner Questions

1. What is Next.js and how is it different from React?
2. What is SSR and why does it help with SEO?
3. How does file-based routing work in Next.js?
4. What is the difference between `<Link>` and `<a>` tags?
5. What does the `app/` folder contain?
6. What is a layout in Next.js?
7. How do you add a page title using Next.js?
8. What command creates a new Next.js project?
9. What is the purpose of the `public/` folder?
10. What does `npm run build` do?

## Intermediate Questions

11. Explain the difference between Server Components and Client Components.
12. What are route groups and when do you use them?
13. How do dynamic routes work? What's the difference between `[slug]` and `[...slug]`?
14. What is the difference between `layout.tsx` and `template.tsx`?
15. How do you implement protected routes in Next.js App Router?
16. What is middleware in Next.js and where does it run?
17. What is `generateMetadata()` and when do you use it over static `metadata`?
18. How does `useRouter()` differ from `redirect()`?
19. What is ISR and how does it differ from SSG?
20. How do you handle a 404 page in Next.js?

## Advanced Scenario-Based Questions

21. **Scenario**: Your Next.js app shows stale data after a database update. How would you fix this using `revalidatePath()` or `revalidateTag()`?

22. **Scenario**: You need a photo gallery where clicking a photo shows a modal without losing the background scroll position, but sharing the URL shows the full photo page. How would you implement this?
*(Answer: Intercepting routes with `(.)photos/[id]` + parallel routes)*

23. **Scenario**: You're building a multi-tenant SaaS where each company has its own subdomain with different branding. How would you architect this in Next.js?
*(Answer: Middleware to detect subdomain + tenant-specific layouts + database-driven themes)*

24. **Scenario**: Your e-commerce product pages need to be fast but also show up-to-date inventory. What rendering strategy would you use?
*(Answer: ISR with `revalidate: 60` for product info, client-side fetch for real-time inventory)*

25. **Scenario**: A client asks you to migrate a large Create React App (CRA) project to Next.js. What's your migration strategy?
*(Answer: Incremental adoption â€” set up Next.js, migrate pages one by one using App Router, move API calls to Server Components, add SSR/SSG where needed)*

---

> **End of Next.js Notes â€” Part 1**
>
> Part 2 will cover: Data Fetching, Server Actions, API Routes, Authentication, Performance Optimization, Deployment, and Advanced Patterns.


