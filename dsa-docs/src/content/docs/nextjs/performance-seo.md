---
title: "Next.js Performance Optimization & SEO"
description: "Next.js guide covering performance optimization, Core Web Vitals, caching, bundle optimization, Metadata API, structured data, and SEO best practices."
---

# Next.js Deep Dive â€” Part 4A
## Performance Optimization & SEO in Next.js

> **Series**: Next.js Complete Guide | **Part**: 4A | **Level**: Beginner â†’ Advanced  
> **Prerequisites**: Basic React, Next.js App Router, TypeScript fundamentals

---

## Table of Contents

- [Section 16: Performance Optimization](#section-16-performance-optimization)
  - [16.1 What is Performance Optimization?](#161-what-is-performance-optimization)
  - [16.2 Why Performance Matters](#162-why-performance-matters)
  - [16.3 Core Web Vitals](#163-core-web-vitals)
  - [16.4 Measuring Application Performance](#164-measuring-application-performance)
  - [16.5 Code Splitting](#165-code-splitting)
  - [16.6 Lazy Loading & Dynamic Imports](#166-lazy-loading--dynamic-imports)
  - [16.7 Tree Shaking](#167-tree-shaking)
  - [16.8 Caching Strategies](#168-caching-strategies)
  - [16.9 Memoization](#169-memoization)
  - [16.10 Image Optimization](#1610-image-optimization)
  - [16.11 Font Optimization](#1611-font-optimization)
  - [16.12 Bundle Optimization](#1612-bundle-optimization)
  - [16.13 Rendering Performance](#1613-rendering-performance)
  - [16.14 Optimizing API Calls](#1614-optimizing-api-calls)
  - [16.15 Suspense & Streaming](#1615-suspense--streaming)
  - [16.16 Practical Examples](#1616-practical-examples)
  - [16.17 Lighthouse & Debugging Tools](#1617-lighthouse--debugging-tools)
  - [16.18 Best Practices & Common Mistakes](#1618-best-practices--common-mistakes)
  - [16.19 Interview Questions](#1619-interview-questions)
- [Section 17: SEO in Next.js](#section-17-seo-in-nextjs)
  - [17.1 What is SEO?](#171-what-is-seo)
  - [17.2 Why SEO Matters](#172-why-seo-matters)
  - [17.3 SEO in SSR Applications](#173-seo-in-ssr-applications)
  - [17.4 Metadata API](#174-metadata-api)
  - [17.5 Dynamic Metadata](#175-dynamic-metadata)
  - [17.6 OpenGraph & Social Tags](#176-opengraph--social-tags)
  - [17.7 Sitemap & robots.txt](#177-sitemap--robotstxt)
  - [17.8 Structured Data & JSON-LD](#178-structured-data--json-ld)
  - [17.9 Practical SEO Examples](#179-practical-seo-examples)
  - [17.10 SEO Debugging](#1710-seo-debugging)
  - [17.11 Best Practices & Common Mistakes](#1711-best-practices--common-mistakes)
  - [17.12 Interview Questions](#1712-interview-questions)
- [Summary & Key Takeaways](#summary--key-takeaways)
- [Practice Exercises](#practice-exercises)
- [Mini Project Ideas](#mini-project-ideas)
- [Interview Preparation](#interview-preparation)

---

# Section 16: Performance Optimization

## 16.1 What is Performance Optimization?

**Performance optimization** is the process of making your web application load faster, respond quicker, and consume fewer resources â€” so users have a smooth, responsive experience.

Think of it like this: imagine a restaurant. A **slow restaurant** takes 20 minutes to even bring the menu. A **fast restaurant** greets you, hands you the menu, and takes your order within 2 minutes. Users (and search engines) prefer the fast restaurant.

In web development, performance optimization involves:

- Reducing the amount of code the browser downloads
- Loading resources only when needed
- Caching data so we don't re-fetch it unnecessarily
- Optimizing images and fonts
- Minimizing unnecessary re-renders in React

```
Without Optimization          With Optimization
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€         â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
User visits page              User visits page
    â”‚                              â”‚
    â–¼                              â–¼
Downloads 5MB JS bundle       Downloads 200KB critical JS
Downloads all images          Loads only visible images
Fetches all API data          Fetches only needed data
Renders everything at once    Streams content progressively
    â”‚                              â”‚
    â–¼                              â–¼
Page loads in 8s              Page loads in 1.2s
User frustrated â†’ leaves      User happy â†’ stays
```

---

## 16.2 Why Performance Matters

Performance is not just a technical concern â€” it directly impacts **business outcomes**.

| Metric | Impact |
|--------|--------|
| 1 second delay | 7% reduction in conversions (Amazon study) |
| 100ms improvement | 1% increase in revenue |
| 53% of users | Abandon mobile sites that take >3s to load |
| Google ranking | Page speed is a direct ranking factor since 2021 |
| Bounce rate | Slow pages have 123% higher bounce rates |

### The Three Pillars of Performance

```txt
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <!-- Background -->
  <rect width="700" height="280" fill="#0f172a" rx="12"/>
  
  <!-- Title -->
  <text x="350" y="35" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold">Three Pillars of Web Performance</text>
  
  <!-- Pillar 1: Loading Performance -->
  <rect x="50" y="60" width="180" height="180" fill="#1e3a5f" rx="10" stroke="#3b82f6" stroke-width="2"/>
  <text x="140" y="90" text-anchor="middle" fill="#3b82f6" font-size="14" font-weight="bold">Loading</text>
  <text x="140" y="110" text-anchor="middle" fill="#3b82f6" font-size="11">Performance</text>
  <circle cx="140" cy="145" r="28" fill="#1d4ed8" opacity="0.6"/>
  <text x="140" y="140" text-anchor="middle" fill="#93c5fd" font-size="20">âš¡</text>
  <text x="140" y="158" text-anchor="middle" fill="#60a5fa" font-size="10">FCP, LCP</text>
  <text x="140" y="185" text-anchor="middle" fill="#94a3b8" font-size="10">How fast content</text>
  <text x="140" y="198" text-anchor="middle" fill="#94a3b8" font-size="10">first appears</text>
  <text x="140" y="225" text-anchor="middle" fill="#64748b" font-size="9">Code splitting, lazy</text>
  <text x="140" y="238" text-anchor="middle" fill="#64748b" font-size="9">loading, caching</text>
  
  <!-- Pillar 2: Interactivity -->
  <rect x="260" y="60" width="180" height="180" fill="#1e3a2f" rx="10" stroke="#10b981" stroke-width="2"/>
  <text x="350" y="90" text-anchor="middle" fill="#10b981" font-size="14" font-weight="bold">Interactivity</text>
  <text x="350" y="110" text-anchor="middle" fill="#10b981" font-size="11">Performance</text>
  <circle cx="350" cy="145" r="28" fill="#065f46" opacity="0.6"/>
  <text x="350" y="140" text-anchor="middle" fill="#6ee7b7" font-size="20">ðŸ–±ï¸</text>
  <text x="350" y="158" text-anchor="middle" fill="#34d399" font-size="10">FID, INP, TBT</text>
  <text x="350" y="185" text-anchor="middle" fill="#94a3b8" font-size="10">How fast UI responds</text>
  <text x="350" y="198" text-anchor="middle" fill="#94a3b8" font-size="10">to user input</text>
  <text x="350" y="225" text-anchor="middle" fill="#64748b" font-size="9">Memoization, reducing</text>
  <text x="350" y="238" text-anchor="middle" fill="#64748b" font-size="9">re-renders</text>
  
  <!-- Pillar 3: Visual Stability -->
  <rect x="470" y="60" width="180" height="180" fill="#3a1e2f" rx="10" stroke="#a855f7" stroke-width="2"/>
  <text x="560" y="90" text-anchor="middle" fill="#a855f7" font-size="14" font-weight="bold">Visual</text>
  <text x="560" y="110" text-anchor="middle" fill="#a855f7" font-size="11">Stability</text>
  <circle cx="560" cy="145" r="28" fill="#581c87" opacity="0.6"/>
  <text x="560" y="140" text-anchor="middle" fill="#d8b4fe" font-size="20">ðŸ“</text>
  <text x="560" y="158" text-anchor="middle" fill="#c084fc" font-size="10">CLS</text>
  <text x="560" y="185" text-anchor="middle" fill="#94a3b8" font-size="10">How stable layout</text>
  <text x="560" y="198" text-anchor="middle" fill="#94a3b8" font-size="10">is while loading</text>
  <text x="560" y="225" text-anchor="middle" fill="#64748b" font-size="9">Image dimensions,</text>
  <text x="560" y="238" text-anchor="middle" fill="#64748b" font-size="9">font display swap</text>
</svg>
```

---

## 16.3 Core Web Vitals

**Core Web Vitals** are Google's set of specific measurements that define what a good user experience looks like. They are used directly in Google's search ranking algorithm.

```txt
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="320" fill="#0f172a" rx="12"/>
  <text x="350" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Core Web Vitals â€” At a Glance</text>

  <!-- LCP -->
  <rect x="30" y="50" width="195" height="240" fill="#0c1a2e" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <rect x="30" y="50" width="195" height="40" fill="#1d4ed8" rx="8"/>
  <rect x="30" y="70" width="195" height="20" fill="#1d4ed8"/>
  <text x="127" y="76" text-anchor="middle" fill="white" font-size="13" font-weight="bold">LCP</text>
  <text x="127" y="102" text-anchor="middle" fill="#93c5fd" font-size="10">Largest Contentful Paint</text>
  <text x="127" y="122" text-anchor="middle" fill="#64748b" font-size="9">Measures: Loading</text>
  
  <rect x="50" y="135" width="155" height="28" fill="#14532d" rx="4"/>
  <text x="127" y="153" text-anchor="middle" fill="#86efac" font-size="11">Good: â‰¤ 2.5s</text>
  <rect x="50" y="170" width="155" height="28" fill="#713f12" rx="4"/>
  <text x="127" y="188" text-anchor="middle" fill="#fde68a" font-size="11">Needs Work: â‰¤ 4s</text>
  <rect x="50" y="205" width="155" height="28" fill="#7f1d1d" rx="4"/>
  <text x="127" y="223" text-anchor="middle" fill="#fca5a5" font-size="11">Poor: &gt; 4s</text>
  
  <text x="127" y="258" text-anchor="middle" fill="#94a3b8" font-size="9">Time until largest visible</text>
  <text x="127" y="271" text-anchor="middle" fill="#94a3b8" font-size="9">image or text block loads</text>
  
  <!-- INP -->
  <rect x="253" y="50" width="195" height="240" fill="#0c1a2e" rx="8" stroke="#10b981" stroke-width="1.5"/>
  <rect x="253" y="50" width="195" height="40" fill="#065f46" rx="8"/>
  <rect x="253" y="70" width="195" height="20" fill="#065f46"/>
  <text x="350" y="76" text-anchor="middle" fill="white" font-size="13" font-weight="bold">INP</text>
  <text x="350" y="102" text-anchor="middle" fill="#6ee7b7" font-size="10">Interaction to Next Paint</text>
  <text x="350" y="122" text-anchor="middle" fill="#64748b" font-size="9">Measures: Interactivity</text>
  
  <rect x="273" y="135" width="155" height="28" fill="#14532d" rx="4"/>
  <text x="350" y="153" text-anchor="middle" fill="#86efac" font-size="11">Good: â‰¤ 200ms</text>
  <rect x="273" y="170" width="155" height="28" fill="#713f12" rx="4"/>
  <text x="350" y="188" text-anchor="middle" fill="#fde68a" font-size="11">Needs Work: â‰¤ 500ms</text>
  <rect x="273" y="205" width="155" height="28" fill="#7f1d1d" rx="4"/>
  <text x="350" y="223" text-anchor="middle" fill="#fca5a5" font-size="11">Poor: &gt; 500ms</text>
  
  <text x="350" y="258" text-anchor="middle" fill="#94a3b8" font-size="9">Time from user interaction</text>
  <text x="350" y="271" text-anchor="middle" fill="#94a3b8" font-size="9">to visual feedback</text>
  
  <!-- CLS -->
  <rect x="476" y="50" width="195" height="240" fill="#0c1a2e" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <rect x="476" y="50" width="195" height="40" fill="#581c87" rx="8"/>
  <rect x="476" y="70" width="195" height="20" fill="#581c87"/>
  <text x="573" y="76" text-anchor="middle" fill="white" font-size="13" font-weight="bold">CLS</text>
  <text x="573" y="102" text-anchor="middle" fill="#d8b4fe" font-size="10">Cumulative Layout Shift</text>
  <text x="573" y="122" text-anchor="middle" fill="#64748b" font-size="9">Measures: Visual Stability</text>
  
  <rect x="496" y="135" width="155" height="28" fill="#14532d" rx="4"/>
  <text x="573" y="153" text-anchor="middle" fill="#86efac" font-size="11">Good: â‰¤ 0.1</text>
  <rect x="496" y="170" width="155" height="28" fill="#713f12" rx="4"/>
  <text x="573" y="188" text-anchor="middle" fill="#fde68a" font-size="11">Needs Work: â‰¤ 0.25</text>
  <rect x="496" y="205" width="155" height="28" fill="#7f1d1d" rx="4"/>
  <text x="573" y="223" text-anchor="middle" fill="#fca5a5" font-size="11">Poor: &gt; 0.25</text>
  
  <text x="573" y="258" text-anchor="middle" fill="#94a3b8" font-size="9">How much page layout</text>
  <text x="573" y="271" text-anchor="middle" fill="#94a3b8" font-size="9">shifts unexpectedly</text>

  <text x="350" y="308" text-anchor="middle" fill="#475569" font-size="9">Replaced FID (First Input Delay) â€” INP became official Core Web Vital in March 2024</text>
</svg>
```

---

## 16.4 Measuring Application Performance

### Tools for Measuring Performance

| Tool | Type | What It Measures | When to Use |
|------|------|-----------------|-------------|
| **Lighthouse** | Audit tool | All Core Web Vitals + more | During development |
| **Chrome DevTools** | Browser tool | Network, CPU, Memory | Deep debugging |
| **PageSpeed Insights** | Google service | Real-world + lab data | Pre/post deployment |
| **WebPageTest** | Online tool | Detailed waterfall | Advanced analysis |
| **Vercel Analytics** | Built-in | Real user data | Production monitoring |
| **next/bundle-analyzer** | Package | Bundle sizes | Bundle optimization |

### Setting Up Bundle Analyzer

```bash
npm install @next/bundle-analyzer
```

```ts
// next.config.ts
import type { NextConfig } from 'next';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // your config here
};

export default withBundleAnalyzer(nextConfig);
```

```bash
# Run analysis
ANALYZE=true npm run build
```

---

## 16.5 Code Splitting

**Code splitting** means breaking your JavaScript bundle into smaller chunks that are loaded only when needed, rather than loading everything upfront.

```txt
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="300" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Code Splitting Workflow</text>

  <!-- Without splitting -->
  <text x="175" y="55" text-anchor="middle" fill="#f87171" font-size="12" font-weight="bold">âŒ Without Code Splitting</text>
  <rect x="50" y="65" width="250" height="50" fill="#7f1d1d" rx="6" stroke="#ef4444" stroke-width="1.5"/>
  <text x="175" y="87" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">main.js â€” 4.2 MB</text>
  <text x="175" y="103" text-anchor="middle" fill="#f87171" font-size="10">All pages + libs loaded upfront</text>

  <text x="175" y="135" text-anchor="middle" fill="#94a3b8" font-size="10">User visits /home</text>
  <text x="175" y="152" text-anchor="middle" fill="#f87171" font-size="10">Waits 8s for everything to load</text>
  <rect x="80" y="160" width="190" height="25" fill="#450a0a" rx="4"/>
  <text x="175" y="177" text-anchor="middle" fill="#fca5a5" font-size="10">LCP: 8.2s âŒ Poor</text>

  <!-- Separator -->
  <line x1="340" y1="50" x2="340" y2="250" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,3"/>

  <!-- With splitting -->
  <text x="525" y="55" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="bold">âœ… With Code Splitting</text>
  
  <rect x="390" y="65" width="115" height="35" fill="#14532d" rx="5" stroke="#22c55e" stroke-width="1.5"/>
  <text x="447" y="85" text-anchor="middle" fill="#86efac" font-size="10">home.js 120KB</text>
  
  <rect x="515" y="65" width="115" height="35" fill="#1e3a5f" rx="5" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="572" y="85" text-anchor="middle" fill="#93c5fd" font-size="10">about.js 80KB</text>

  <rect x="390" y="115" width="115" height="35" fill="#312e81" rx="5" stroke="#818cf8" stroke-width="1.5"/>
  <text x="447" y="135" text-anchor="middle" fill="#c7d2fe" font-size="10">dashboard.js 340KB</text>
  
  <rect x="515" y="115" width="115" height="35" fill="#3f1f5a" rx="5" stroke="#a855f7" stroke-width="1.5"/>
  <text x="572" y="135" text-anchor="middle" fill="#d8b4fe" font-size="10">cart.js 95KB</text>

  <text x="525" y="170" text-anchor="middle" fill="#94a3b8" font-size="10">User visits /home</text>
  <text x="525" y="186" text-anchor="middle" fill="#4ade80" font-size="10">Only loads home.js (120KB)</text>
  <rect x="420" y="195" width="210" height="25" fill="#052e16" rx="4"/>
  <text x="525" y="212" text-anchor="middle" fill="#86efac" font-size="10">LCP: 1.1s âœ… Good</text>

  <text x="350" y="270" text-anchor="middle" fill="#475569" font-size="9">Next.js performs automatic code splitting per page/route by default</text>
</svg>
```

Next.js does **automatic code splitting** â€” each page gets its own bundle. But you can go further with manual code splitting using dynamic imports.

---

## 16.6 Lazy Loading & Dynamic Imports

**Lazy loading** delays the loading of resources until they're actually needed. **Dynamic imports** are the JavaScript mechanism that enables lazy loading for components and modules.

### Comparison: Lazy vs Normal Loading

| Aspect | Normal Loading | Lazy Loading |
|--------|---------------|--------------|
| **When loaded** | At page load (all at once) | When component is needed |
| **Initial bundle size** | Large | Small |
| **Time to Interactive** | Slow | Fast |
| **UX for heavy components** | Blocks rendering | Loads progressively |
| **Use case** | Small, critical components | Large/rarely-used components |
| **Code** | `import Component` | `dynamic(() => import(...))` |

### Using `dynamic()` in Next.js

```tsx
// app/dashboard/page.tsx
import dynamic from 'next/dynamic';

// 1. Basic dynamic import â€” loads when component mounts
const HeavyChart = dynamic(() => import('@/components/HeavyChart'));

// 2. With loading fallback â€” shows skeleton while loading
const DataTable = dynamic(() => import('@/components/DataTable'), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
  ),
});

// 3. Disable SSR â€” render only on client
// Useful for: window-dependent code, browser-only libraries (e.g., charts)
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

// 4. Named export â€” for components not exported as default
const Modal = dynamic(() =>
  import('@/components/ui/Modal').then((mod) => mod.Modal)
);

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* HeavyChart only loads when this page is visited */}
      <HeavyChart />
      {/* DataTable shows a skeleton while loading */}
      <DataTable />
      {/* MapComponent never renders on the server */}
      <MapComponent center={[40.7128, -74.006]} zoom={12} />
    </div>
  );
}
```

### Static Imports vs Dynamic Imports

| Feature | Static Import | Dynamic Import |
|---------|--------------|----------------|
| **Syntax** | `import X from 'x'` | `dynamic(() => import('x'))` |
| **Bundle inclusion** | Always included | Only when used |
| **SSR support** | Yes | Optional (`ssr: false`) |
| **Loading state** | No | Yes (via `loading` prop) |
| **Tree shaking** | Full support | Full support |
| **Conditional loading** | No | Yes |
| **Performance impact** | Higher initial load | Lower initial load |

### Lazy Loading Images and Third-Party Scripts

```tsx
// app/blog/page.tsx
import Image from 'next/image';
import Script from 'next/script';

export default function BlogPage() {
  return (
    <article>
      {/* Hero image: eager (loads immediately, above fold) */}
      <Image
        src="/hero.webp"
        alt="Blog hero"
        width={1200}
        height={630}
        priority // <-- marks as eager / LCP image
      />

      {/* Body images: lazy (loads when scrolled into view) */}
      <Image
        src="/diagram.webp"
        alt="Architecture diagram"
        width={800}
        height={450}
        loading="lazy" // default behavior for non-priority images
      />

      {/* Third-party script: defer until page is interactive */}
      <Script
        src="https://analytics.example.com/script.js"
        strategy="afterInteractive" // or 'lazyOnload' for lowest priority
      />
    </article>
  );
}
```

---

## 16.7 Tree Shaking

**Tree shaking** is the process of removing unused code ("dead code") from your final bundle. The name comes from "shaking a tree to remove dead leaves."

```tsx
// âŒ Bad: Imports ENTIRE lodash library (560KB+)
import _ from 'lodash';
const result = _.groupBy(items, 'category');

// âœ… Good: Imports ONLY the groupBy function (~2KB)
import groupBy from 'lodash/groupBy';
const result = groupBy(items, 'category');

// âœ… Even better with ES modules (tree-shakeable by default)
import { groupBy } from 'lodash-es';
const result = groupBy(items, 'category');
```

```tsx
// âŒ Bad: Importing full icon library
import * as Icons from 'lucide-react'; // imports ALL icons

// âœ… Good: Import only what you need
import { Home, Settings, User } from 'lucide-react'; // only these 3
```

> **Note**: Next.js and webpack/turbopack handle tree shaking automatically for ES modules. Make sure your libraries export ES modules (check for `"module"` field in `package.json`).

---

## 16.8 Caching Strategies

Caching stores a copy of data so future requests can be served faster without re-fetching or re-computing.

```txt
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="340" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Next.js Caching Workflow</text>

  <!-- Browser -->
  <rect x="20" y="50" width="120" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="72" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">Browser</text>
  <text x="80" y="88" text-anchor="middle" fill="#60a5fa" font-size="9">HTTP Cache</text>

  <!-- CDN/Edge -->
  <rect x="200" y="50" width="120" height="50" fill="#0f3320" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="260" y="72" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">CDN / Edge</text>
  <text x="260" y="88" text-anchor="middle" fill="#4ade80" font-size="9">Vercel Edge Cache</text>

  <!-- Next.js Server -->
  <rect x="380" y="50" width="140" height="50" fill="#2d1b69" rx="8" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="450" y="72" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold">Next.js Server</text>
  <text x="450" y="88" text-anchor="middle" fill="#a78bfa" font-size="9">Data Cache + Router Cache</text>

  <!-- Database/API -->
  <rect x="575" y="50" width="110" height="50" fill="#1c0a00" rx="8" stroke="#f97316" stroke-width="1.5"/>
  <text x="630" y="72" text-anchor="middle" fill="#fdba74" font-size="11" font-weight="bold">Database</text>
  <text x="630" y="88" text-anchor="middle" fill="#fb923c" font-size="9">/ External API</text>

  <!-- Arrows top row -->
  <line x1="140" y1="75" x2="198" y2="75" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="320" y1="75" x2="378" y2="75" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="520" y1="75" x2="573" y2="75" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>

  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>

  <!-- Cache types -->
  <text x="350" y="130" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Cache Layers in Next.js</text>

  <!-- 4 cache cards -->
  <rect x="20" y="145" width="150" height="110" fill="#0c1a2e" rx="8" stroke="#3b82f6" stroke-width="1"/>
  <text x="95" y="168" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="bold">Request Memoization</text>
  <text x="95" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">Deduplicates identical</text>
  <text x="95" y="197" text-anchor="middle" fill="#94a3b8" font-size="9">fetch() calls in one</text>
  <text x="95" y="209" text-anchor="middle" fill="#94a3b8" font-size="9">render pass</text>
  <rect x="40" y="220" width="110" height="20" fill="#1e3a5f" rx="3"/>
  <text x="95" y="233" text-anchor="middle" fill="#93c5fd" font-size="9">Scope: Per Request</text>

  <rect x="185" y="145" width="150" height="110" fill="#0c1a2e" rx="8" stroke="#22c55e" stroke-width="1"/>
  <text x="260" y="168" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">Data Cache</text>
  <text x="260" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">Persists fetch() results</text>
  <text x="260" y="197" text-anchor="middle" fill="#94a3b8" font-size="9">across requests and</text>
  <text x="260" y="209" text-anchor="middle" fill="#94a3b8" font-size="9">deployments</text>
  <rect x="205" y="220" width="110" height="20" fill="#052e16" rx="3"/>
  <text x="260" y="233" text-anchor="middle" fill="#86efac" font-size="9">Scope: Persistent</text>

  <rect x="350" y="145" width="150" height="110" fill="#0c1a2e" rx="8" stroke="#f59e0b" stroke-width="1"/>
  <text x="425" y="168" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">Full Route Cache</text>
  <text x="425" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">Stores rendered HTML</text>
  <text x="425" y="197" text-anchor="middle" fill="#94a3b8" font-size="9">+ RSC payload at</text>
  <text x="425" y="209" text-anchor="middle" fill="#94a3b8" font-size="9">build time</text>
  <rect x="370" y="220" width="110" height="20" fill="#451a03" rx="3"/>
  <text x="425" y="233" text-anchor="middle" fill="#fde68a" font-size="9">Scope: Per Deploy</text>

  <rect x="515" y="145" width="165" height="110" fill="#0c1a2e" rx="8" stroke="#a855f7" stroke-width="1"/>
  <text x="597" y="168" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="bold">Router Cache</text>
  <text x="597" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">Client-side cache of</text>
  <text x="597" y="197" text-anchor="middle" fill="#94a3b8" font-size="9">visited route segments</text>
  <text x="597" y="209" text-anchor="middle" fill="#94a3b8" font-size="9">in browser memory</text>
  <rect x="535" y="220" width="125" height="20" fill="#2e1065" rx="3"/>
  <text x="597" y="233" text-anchor="middle" fill="#d8b4fe" font-size="9">Scope: Per Session</text>

  <text x="350" y="290" text-anchor="middle" fill="#475569" font-size="9">Caches are checked in order: Router â†’ Full Route â†’ Data â†’ Origin</text>
  <text x="350" y="308" text-anchor="middle" fill="#334155" font-size="9">Use revalidatePath() or revalidateTag() to purge specific cache entries</text>
</svg>
```

### Fetch Caching in Next.js App Router

```tsx
// app/products/page.tsx

// 1. Default: cached indefinitely (like getStaticProps)
const data = await fetch('https://api.example.com/products');

// 2. No cache: always fresh (like getServerSideProps)
const freshData = await fetch('https://api.example.com/products', {
  cache: 'no-store',
});

// 3. Revalidate after N seconds (ISR equivalent)
const revalidatedData = await fetch('https://api.example.com/products', {
  next: { revalidate: 3600 }, // re-fetch after 1 hour
});

// 4. Tag-based revalidation â€” invalidate by tag
const taggedData = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
});

// Then in a Server Action:
import { revalidateTag, revalidatePath } from 'next/cache';

async function updateProduct() {
  'use server';
  // ... update logic
  revalidateTag('products');       // invalidate all fetches tagged 'products'
  revalidatePath('/products');     // or invalidate a specific path
}
```

---

## 16.9 Memoization

**Memoization** is a performance technique where the result of an expensive computation is cached so it doesn't need to be recalculated if the same inputs are given again.

### `useMemo` â€” Memoize Computed Values

```tsx
// components/ProductList.tsx
'use client';

import { useMemo, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'name'>('name');

  // âŒ Without useMemo: runs on EVERY render (including unrelated state changes)
  // const filteredProducts = products
  //   .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  //   ...

  // âœ… With useMemo: only recalculates when dependencies change
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        return a.name.localeCompare(b.name);
      });
  }, [products, searchTerm, selectedCategory, sortBy]);
  // â†‘ Only re-runs when these values change

  // Memoize expensive stats calculation
  const stats = useMemo(() => ({
    total: filteredProducts.length,
    avgPrice:
      filteredProducts.reduce((sum, p) => sum + p.price, 0) /
      (filteredProducts.length || 1),
    inStockCount: filteredProducts.filter((p) => p.inStock).length,
  }), [filteredProducts]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <p>
        {stats.total} products | Avg: ${stats.avgPrice.toFixed(2)} |{' '}
        {stats.inStockCount} in stock
      </p>
      {filteredProducts.map((p) => (
        <div key={p.id}>{p.name} â€” ${p.price}</div>
      ))}
    </div>
  );
}
```

### `useCallback` â€” Memoize Functions

```tsx
// components/SearchableList.tsx
'use client';

import { useCallback, useState, memo } from 'react';

// Wrap child in memo so it only re-renders when its props change
const FilterButton = memo(function FilterButton({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  console.log(`FilterButton "${label}" rendered`); // only logs when props change
  return (
    <button
      onClick={onClick}
      className={active ? 'bg-blue-500 text-white' : 'bg-gray-200'}
    >
      {label}
    </button>
  );
});

export default function SearchableList() {
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState(0); // unrelated state

  // âŒ Without useCallback: new function created every render
  // even when count changes, FilterButton re-renders unnecessarily
  // const handleAll = () => setFilter('all');

  // âœ… With useCallback: same function reference until dependencies change
  const handleAll = useCallback(() => setFilter('all'), []);
  const handleActive = useCallback(() => setFilter('active'), []);
  const handleInactive = useCallback(() => setFilter('inactive'), []);

  return (
    <div>
      {/* These buttons won't re-render when count changes */}
      <FilterButton label="All" onClick={handleAll} active={filter === 'all'} />
      <FilterButton label="Active" onClick={handleActive} active={filter === 'active'} />
      <FilterButton label="Inactive" onClick={handleInactive} active={filter === 'inactive'} />

      {/* This triggers re-render of parent but NOT FilterButtons */}
      <button onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}
```

> **When to use `useMemo` vs `useCallback`**:
> - `useMemo` â†’ memoize a **computed value** (e.g., filtered array, statistics)
> - `useCallback` â†’ memoize a **function reference** (to pass as prop to memoized children)

---

## 16.10 Image Optimization

The `<Image />` component from `next/image` is one of Next.js's most powerful performance features.

### What `<Image />` Does Automatically

| Feature | Description |
|---------|-------------|
| **Format conversion** | Converts to WebP/AVIF (smaller than JPEG/PNG) |
| **Resizing** | Generates multiple sizes for different screens |
| **Lazy loading** | Loads images only when near viewport |
| **Blur placeholder** | Shows blurred preview while image loads |
| **Prevents CLS** | Requires width/height, reserving space |
| **CDN delivery** | Serves optimized images from Vercel's CDN |

```tsx
// app/products/[id]/page.tsx
import Image from 'next/image';

interface Props {
  product: {
    name: string;
    heroImage: string;
    thumbnailImage: string;
  };
}

export default function ProductPage({ product }: Props) {
  return (
    <article>
      {/* Hero image â€” above the fold, load immediately */}
      <Image
        src={product.heroImage}
        alt={`${product.name} hero`}
        width={1200}
        height={630}
        priority         // preload: this is the LCP element
        quality={90}     // 90% quality (default: 75)
        sizes="100vw"    // hint: takes full viewport width
      />

      {/* Gallery image â€” below fold, lazy load */}
      <Image
        src={product.thumbnailImage}
        alt={`${product.name} thumbnail`}
        width={400}
        height={400}
        loading="lazy"   // explicit (this is the default for non-priority)
        placeholder="blur"               // show blurred preview
        blurDataURL="data:image/jpeg;base64,/9j..." // tiny base64 preview
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        // â†‘ tells browser what size image to request at each breakpoint
      />

      {/* Remote image from external domain */}
      {/* Requires: next.config.ts â†’ images.remotePatterns */}
      <Image
        src="https://cdn.example.com/photo.jpg"
        alt="External photo"
        fill              // fills parent container (parent must be relative)
        style={{ objectFit: 'cover' }}
      />
    </article>
  );
}
```

```ts
// next.config.ts â€” allow external image domains
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optional: define responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

---

## 16.11 Font Optimization

Font loading is a surprisingly common cause of poor performance and layout shift.

### Why Font Loading is Tricky

Without optimization:
1. Browser requests HTML
2. Browser parses HTML, finds font `<link>` or `@import`
3. Browser requests font files (can be 100KBâ€“500KB+)
4. Text is invisible (FOIT) or shown in fallback (FOUT)
5. Font loads â†’ layout shifts â†’ CLS score suffers

### `next/font` â€” The Solution

```tsx
// app/layout.tsx
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts â€” downloaded at build time, self-hosted
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',    // show fallback until custom font loads (prevents FOIT)
  variable: '--font-inter', // expose as CSS variable
  preload: true,      // preload this font (default: true)
});

// Display/heading font
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700'], // only load needed weights (reduces file size)
});

// Monospace for code blocks
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

// Local font (e.g., brand/custom font)
const brandFont = localFont({
  src: [
    { path: '../public/fonts/brand-regular.woff2', weight: '400' },
    { path: '../public/fonts/brand-bold.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-brand',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // Apply font class names to html element
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} ${brandFont.variable}`}
    >
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

```css
/* app/globals.css â€” using font CSS variables */
h1, h2, h3 {
  font-family: var(--font-playfair);
}

code, pre {
  font-family: var(--font-mono);
}

.brand-text {
  font-family: var(--font-brand);
}
```

---

## 16.12 Bundle Optimization

### Analyzing Your Bundle

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer --save-dev

# Run build with analysis
ANALYZE=true npm run build
# Opens interactive bundle visualization in browser
```

### Strategies to Reduce Bundle Size

```tsx
// 1. Use barrel files carefully
// âŒ Bad: barrel re-exports can prevent tree shaking
// utils/index.ts: export { formatDate, parseDate, ... }
// import { formatDate } from '@/utils'; // may import everything

// âœ… Good: import directly from the file
import { formatDate } from '@/utils/date';

// 2. Use lighter alternatives
// âŒ moment.js â€” 67KB gzipped
import moment from 'moment';
// âœ… date-fns â€” tree-shakeable, only imports what you use
import { format, parseISO } from 'date-fns';

// 3. Conditional third-party loading
// âŒ Always loading heavy editor
import RichTextEditor from 'some-heavy-editor'; // 400KB

// âœ… Only load when user needs it
const RichTextEditor = dynamic(() => import('some-heavy-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

// 4. Split large route-level code
// In app/admin/layout.tsx â€” admin bundle is separate from public bundle
// Users who never visit /admin never download admin code
```

---

## 16.13 Rendering Performance

### Rendering Optimization Flow

```txt
<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="380" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Rendering Optimization Decision Flow</text>

  <!-- Start -->
  <rect x="280" y="45" width="140" height="35" fill="#1e40af" rx="17"/>
  <text x="350" y="67" text-anchor="middle" fill="white" font-size="11" font-weight="bold">New Component</text>

  <!-- Q1 -->
  <polygon points="350,105 460,140 350,175 240,140" fill="#0f2d4a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="350" y="135" text-anchor="middle" fill="#7dd3fc" font-size="10">Needs user</text>
  <text x="350" y="150" text-anchor="middle" fill="#7dd3fc" font-size="10">interaction?</text>

  <!-- No â†’ Server Component -->
  <line x1="240" y1="140" x2="100" y2="140" stroke="#22c55e" stroke-width="1.5" marker-end="url(#arrowG)"/>
  <text x="170" y="132" text-anchor="middle" fill="#4ade80" font-size="9">No</text>
  <rect x="20" y="115" width="80" height="50" fill="#052e16" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="60" y="138" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">Server</text>
  <text x="60" y="152" text-anchor="middle" fill="#4ade80" font-size="10">Component</text>

  <!-- Yes â†’ Client Component -->
  <line x1="460" y1="140" x2="580" y2="140" stroke="#f87171" stroke-width="1.5" marker-end="url(#arrowR)"/>
  <text x="520" y="132" text-anchor="middle" fill="#f87171" font-size="9">Yes</text>
  <rect x="580" y="115" width="90" height="50" fill="#2d0a0a" rx="6" stroke="#ef4444" stroke-width="1.5"/>
  <text x="625" y="138" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Client</text>
  <text x="625" y="152" text-anchor="middle" fill="#f87171" font-size="10">Component</text>

  <!-- Down from Q1 -->
  <line x1="350" y1="175" x2="350" y2="205" stroke="#475569" stroke-width="1.5" marker-end="url(#arrowG)"/>

  <!-- Q2 -->
  <polygon points="350,205 460,240 350,275 240,240" fill="#0f2d4a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="350" y="235" text-anchor="middle" fill="#7dd3fc" font-size="10">Renders</text>
  <text x="350" y="250" text-anchor="middle" fill="#7dd3fc" font-size="10">too often?</text>

  <!-- No â†’ Done -->
  <line x1="240" y1="240" x2="140" y2="240" stroke="#22c55e" stroke-width="1.5" marker-end="url(#arrowG)"/>
  <text x="190" y="232" text-anchor="middle" fill="#4ade80" font-size="9">No</text>
  <rect x="60" y="220" width="80" height="40" fill="#052e16" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="100" y="244" text-anchor="middle" fill="#86efac" font-size="10">âœ… Done</text>

  <!-- Yes â†’ Memoize -->
  <line x1="460" y1="240" x2="560" y2="240" stroke="#f87171" stroke-width="1.5" marker-end="url(#arrowR)"/>
  <text x="510" y="232" text-anchor="middle" fill="#f87171" font-size="9">Yes</text>
  <rect x="560" y="215" width="120" height="50" fill="#2d0a0a" rx="6" stroke="#ef4444" stroke-width="1.5"/>
  <text x="620" y="238" text-anchor="middle" fill="#fca5a5" font-size="10">Use React.memo</text>
  <text x="620" y="252" text-anchor="middle" fill="#f87171" font-size="10">useMemo/useCallback</text>

  <!-- Down arrow -->
  <line x1="350" y1="275" x2="350" y2="305" stroke="#475569" stroke-width="1.5" marker-end="url(#arrowG)"/>

  <!-- Q3 -->
  <polygon points="350,305 455,335 350,365 245,335" fill="#0f2d4a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="350" y="330" text-anchor="middle" fill="#7dd3fc" font-size="10">Heavy</text>
  <text x="350" y="345" text-anchor="middle" fill="#7dd3fc" font-size="10">computation?</text>

  <defs>
    <marker id="arrowG" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/>
    </marker>
    <marker id="arrowR" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#ef4444"/>
    </marker>
  </defs>
</svg>
```

### Server vs Client Rendering Performance

| Metric | Server Component | Client Component |
|--------|-----------------|-----------------|
| **Bundle size** | 0 (not in JS bundle) | Adds to bundle |
| **Data fetching** | Direct DB access | API call needed |
| **First render** | Fast (HTML from server) | Slower (hydration) |
| **Interactivity** | None | Full |
| **Re-renders** | No | Yes (on state change) |
| **SEO** | Excellent | Requires extra setup |
| **Best for** | Static content, data display | Forms, animations, real-time |

### Reducing Re-renders

```tsx
// components/ExpensiveItem.tsx
'use client';

import { memo } from 'react';

interface ItemProps {
  id: number;
  name: string;
  price: number;
  onBuy: (id: number) => void; // â† must be stable (useCallback)
}

// React.memo: only re-renders if props actually changed
const ProductItem = memo(function ProductItem({ id, name, price, onBuy }: ItemProps) {
  console.log(`ProductItem ${id} rendered`);
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={() => onBuy(id)}>Buy Now</button>
    </div>
  );
});

// Parent component
export default function ProductGrid({ products }: { products: ItemProps[] }) {
  const [cart, setCart] = useState<number[]>([]);

  // âœ… Stable function reference â€” ProductItem won't re-render when cart changes
  const handleBuy = useCallback((id: number) => {
    setCart((prev) => [...prev, id]);
  }, []); // no dependencies = created once

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          {...product}
          onBuy={handleBuy}
        />
      ))}
    </div>
  );
}
```

---

## 16.14 Optimizing API Calls

```tsx
// app/dashboard/page.tsx

// âŒ Bad: Sequential API calls (waterfall)
// Each request waits for the previous one to complete
async function getBadData() {
  const user = await fetch('/api/user');           // waits...
  const posts = await fetch('/api/posts');          // waits after user...
  const analytics = await fetch('/api/analytics'); // waits after posts...
}
// Total time: 300ms + 200ms + 400ms = 900ms

// âœ… Good: Parallel API calls using Promise.all
async function getParallelData() {
  const [user, posts, analytics] = await Promise.all([
    fetch('/api/user').then((r) => r.json()),
    fetch('/api/posts').then((r) => r.json()),
    fetch('/api/analytics').then((r) => r.json()),
  ]);
  // Total time: max(300ms, 200ms, 400ms) = 400ms
  return { user, posts, analytics };
}

// âœ… Even better: React cache() for Server Components
// Deduplicates identical requests across the render tree
import { cache } from 'react';

// Wrap your fetch in cache() so calling it multiple times
// in one render only fetches ONCE
const getUser = cache(async (id: string) => {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
});

// Now both these components can call getUser(id) but only ONE fetch occurs
// app/layout.tsx â€” calls getUser(id) for header
// app/profile/page.tsx â€” also calls getUser(id) for page content
```

---

## 16.15 Suspense & Streaming

**Streaming** allows Next.js to send pieces of the HTML to the browser progressively, rather than waiting for all data to be ready.

```txt
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="260" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Streaming vs Traditional SSR</text>

  <!-- Traditional SSR -->
  <text x="175" y="55" text-anchor="middle" fill="#f87171" font-size="12">Traditional SSR (No Streaming)</text>
  
  <!-- Timeline bar -->
  <rect x="30" y="65" width="290" height="20" fill="#1e293b" rx="3"/>
  
  <!-- Steps sequential -->
  <rect x="30" y="65" width="70" height="20" fill="#7c3aed" rx="3 0 0 3"/>
  <text x="65" y="79" text-anchor="middle" fill="white" font-size="8">Fetch all data</text>
  
  <rect x="103" y="65" width="60" height="20" fill="#0369a1"/>
  <text x="133" y="79" text-anchor="middle" fill="white" font-size="8">Render HTML</text>
  
  <rect x="166" y="65" width="60" height="20" fill="#0f766e"/>
  <text x="196" y="79" text-anchor="middle" fill="white" font-size="8">Send to browser</text>
  
  <rect x="229" y="65" width="60" height="20" fill="#b45309"/>
  <text x="259" y="79" text-anchor="middle" fill="white" font-size="8">Hydrate JS</text>
  
  <rect x="292" y="65" width="28" height="20" fill="#16a34a" rx="0 3 3 0"/>
  <text x="306" y="79" text-anchor="middle" fill="white" font-size="7">Interactive</text>

  <text x="175" y="105" text-anchor="middle" fill="#94a3b8" font-size="9">User sees blank screen for 2.4 seconds total</text>
  <text x="175" y="120" text-anchor="middle" fill="#f87171" font-size="9">âŒ Slow API blocks entire page</text>

  <!-- Streaming -->
  <text x="530" y="55" text-anchor="middle" fill="#4ade80" font-size="12">With Streaming + Suspense</text>

  <!-- Row 1: Shell -->
  <text x="385" y="80" text-anchor="start" fill="#94a3b8" font-size="9">Shell:</text>
  <rect x="415" y="68" width="40" height="16" fill="#7c3aed" rx="2"/>
  <text x="435" y="79" text-anchor="middle" fill="white" font-size="7">Render</text>
  <rect x="458" y="68" width="35" height="16" fill="#0f766e" rx="2"/>
  <text x="475" y="79" text-anchor="middle" fill="white" font-size="7">Send</text>
  <text x="500" y="79" text-anchor="start" fill="#4ade80" font-size="9">â† Instant (0.2s)</text>

  <!-- Row 2: Component A -->
  <text x="385" y="105" text-anchor="start" fill="#94a3b8" font-size="9">Posts:</text>
  <rect x="415" y="93" width="70" height="16" fill="#1e293b" rx="2" stroke="#475569" stroke-dasharray="3,2" stroke-width="1"/>
  <text x="450" y="104" text-anchor="middle" fill="#475569" font-size="7">...fetching...</text>
  <rect x="488" y="93" width="40" height="16" fill="#0369a1" rx="2"/>
  <text x="508" y="104" text-anchor="middle" fill="white" font-size="7">Stream in</text>
  <text x="535" y="104" text-anchor="start" fill="#4ade80" font-size="9">â† 0.8s</text>

  <!-- Row 3: Component B -->
  <text x="385" y="130" text-anchor="start" fill="#94a3b8" font-size="9">Analytics:</text>
  <rect x="415" y="118" width="110" height="16" fill="#1e293b" rx="2" stroke="#475569" stroke-dasharray="3,2" stroke-width="1"/>
  <text x="470" y="129" text-anchor="middle" fill="#475569" font-size="7">...fetching...</text>
  <rect x="528" y="118" width="40" height="16" fill="#0369a1" rx="2"/>
  <text x="548" y="129" text-anchor="middle" fill="white" font-size="7">Stream in</text>
  <text x="575" y="129" text-anchor="start" fill="#4ade80" font-size="9">â† 1.8s</text>

  <text x="530" y="160" text-anchor="middle" fill="#4ade80" font-size="9">âœ… User sees page shell in 0.2s, content streams in progressively</text>

  <!-- Legend -->
  <line x1="30" y1="200" x2="670" y2="200" stroke="#1e293b" stroke-width="1"/>
  <text x="350" y="220" text-anchor="middle" fill="#475569" font-size="10" font-weight="bold">Comparison</text>
  <text x="175" y="240" text-anchor="middle" fill="#f87171" font-size="9">Total wait: 2.4s | Nothing visible until fully ready</text>
  <text x="530" y="240" text-anchor="middle" fill="#4ade80" font-size="9">First visible: 0.2s | Content appears as each part loads</text>
</svg>
```

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import DashboardShell from '@/components/DashboardShell';
import RecentPosts from '@/components/RecentPosts';
import AnalyticsWidget from '@/components/AnalyticsWidget';
import RevenueChart from '@/components/RevenueChart';

// Each of these components fetches its own data
// They render independently â€” no waterfall!

export default function DashboardPage() {
  return (
    <DashboardShell> {/* Static shell renders immediately */}
      <div className="grid grid-cols-3 gap-4">
        
        {/* Fast data â€” shows quickly */}
        <Suspense fallback={<div className="skeleton h-32" />}>
          <RecentPosts /> {/* fetches /api/posts */}
        </Suspense>

        {/* Medium data â€” streams in when ready */}
        <Suspense fallback={<div className="skeleton h-64" />}>
          <AnalyticsWidget /> {/* fetches /api/analytics */}
        </Suspense>

        {/* Slow data â€” streams in last */}
        <Suspense fallback={<div className="skeleton h-64" />}>
          <RevenueChart /> {/* fetches /api/revenue â€” slowest */}
        </Suspense>

      </div>
    </DashboardShell>
  );
}
```

```tsx
// app/dashboard/loading.tsx â€” automatic Suspense boundary for the whole route
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
```

---

## 16.16 Practical Examples

### Dashboard Optimization

```tsx
// app/admin/dashboard/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { cache } from 'react';

// Heavy chart library â€” only loads client-side, shows loading state
const AnalyticsChart = dynamic(() => import('@/components/AnalyticsChart'), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-100 animate-pulse rounded-lg" />,
});

// Cached data fetcher â€” called multiple times but fetches once
const getDashboardData = cache(async () => {
  const [metrics, recentOrders, topProducts] = await Promise.all([
    fetch('/api/metrics').then(r => r.json()),
    fetch('/api/orders?limit=5').then(r => r.json()),
    fetch('/api/products?sort=revenue&limit=5').then(r => r.json()),
  ]);
  return { metrics, recentOrders, topProducts };
});

export default async function AdminDashboard() {
  const { metrics, recentOrders, topProducts } = await getDashboardData();

  return (
    <div>
      {/* Static metrics render instantly */}
      <MetricCards metrics={metrics} />

      {/* Chart loads lazily client-side */}
      <AnalyticsChart />

      {/* Tables stream in progressively */}
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<TableSkeleton />}>
          <RecentOrdersTable orders={recentOrders} />
        </Suspense>
        <Suspense fallback={<TableSkeleton />}>
          <TopProductsTable products={topProducts} />
        </Suspense>
      </div>
    </div>
  );
}
```

### Blog Optimization

```tsx
// app/blog/[slug]/page.tsx
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Comment section: only loads when user scrolls to it
const CommentSection = dynamic(() => import('@/components/CommentSection'), {
  ssr: false,
  loading: () => <p className="text-gray-400">Loading comments...</p>,
});

// Share widget: loads after page is interactive
const ShareWidget = dynamic(() => import('@/components/ShareWidget'), {
  ssr: false,
});

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      {/* Hero image with priority (LCP element) */}
      <Image
        src={post.coverImage}
        alt={post.title}
        width={1200}
        height={630}
        priority
        sizes="100vw"
      />

      <h1>{post.title}</h1>

      {/* Body images without priority (lazy) */}
      <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />

      {/* Non-critical components load lazily */}
      <ShareWidget url={`/blog/${params.slug}`} />
      <CommentSection postId={post.id} />
    </article>
  );
}

// Generate static pages at build time for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((slug) => ({ slug }));
}
```

### E-commerce Optimization

```tsx
// app/products/[id]/page.tsx
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense } from 'react';

// Heavy components loaded lazily
const ProductReviews = dynamic(() => import('@/components/ProductReviews'));
const SizeGuide = dynamic(() => import('@/components/SizeGuide'), { ssr: false });
const RelatedProducts = dynamic(() => import('@/components/RelatedProducts'));

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Fetch critical data in parallel
  const [product, inventory] = await Promise.all([
    getProduct(params.id),
    getInventory(params.id),
  ]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        {/* Product images â€” first one is priority */}
        <div>
          {product.images.map((img, i) => (
            <Image
              key={img.url}
              src={img.url}
              alt={`${product.name} - view ${i + 1}`}
              width={600}
              height={600}
              priority={i === 0} // only first image is priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>

        {/* Product info â€” static, renders instantly */}
        <div>
          <h1>{product.name}</h1>
          <p>${product.price}</p>
          <StockBadge inventory={inventory} />
          <AddToCartButton productId={product.id} />
          <SizeGuide /> {/* modal, ssr=false */}
        </div>
      </div>

      {/* Non-critical sections stream in */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={product.id} />
      </Suspense>

      <Suspense fallback={<ProductGridSkeleton />}>
        <RelatedProducts categoryId={product.categoryId} excludeId={product.id} />
      </Suspense>
    </div>
  );
}
```

---

## 16.17 Lighthouse & Debugging Tools

### Running a Lighthouse Audit

1. Open Chrome DevTools (`F12`)
2. Click the **Lighthouse** tab
3. Select: **Performance**, **Best Practices**, **SEO**
4. Click **Analyze page load**

### Reading Lighthouse Results

| Score Range | Rating | Color |
|-------------|--------|-------|
| 90â€“100 | Good | ðŸŸ¢ Green |
| 50â€“89 | Needs Improvement | ðŸŸ¡ Yellow |
| 0â€“49 | Poor | ðŸ”´ Red |

### Key Lighthouse Metrics to Watch

| Metric | What It Measures | How to Improve |
|--------|-----------------|----------------|
| **FCP** (First Contentful Paint) | Time to first content | Reduce server response time, remove render-blocking resources |
| **LCP** (Largest Contentful Paint) | Time to main content | Optimize hero image, add `priority` prop |
| **TBT** (Total Blocking Time) | JS blocking main thread | Code split, reduce JS, lazy load |
| **CLS** (Cumulative Layout Shift) | Layout stability | Add width/height to images, avoid dynamic content insertion |
| **Speed Index** | How fast content appears visually | Streaming, Suspense |

### Performance Debugging in DevTools

```bash
# Profile CPU usage
1. Chrome DevTools â†’ Performance tab
2. Click Record â†’ interact with page â†’ Stop
3. Look for long tasks (>50ms), layout/paint bottlenecks

# Check bundle contents
1. DevTools â†’ Network tab â†’ filter by JS
2. Look for large files
3. Run: ANALYZE=true npm run build (for bundle analyzer)

# Memory leaks
1. DevTools â†’ Memory tab
2. Take heap snapshots
3. Compare before/after interactions
```

---

## 16.18 Best Practices & Common Mistakes

### âœ… Best Practices

1. **Use `priority` on LCP images** â€” the hero/banner image should always have `priority`
2. **Always specify `sizes` on `<Image />`** â€” tells browser what size to request
3. **Use Server Components by default** â€” only add `'use client'` when needed
4. **Move client components down** â€” keep interactive islands small
5. **Parallel data fetching** â€” use `Promise.all` not sequential `await`
6. **Use `next/font`** â€” prevents FOUT/FOIT, eliminates layout shift
7. **Cache aggressively, revalidate intentionally** â€” use `revalidateTag`
8. **Add `loading.tsx` files** â€” instant streaming skeleton
9. **Memoize expensive calculations** â€” `useMemo` for computed values
10. **Lazy load non-critical components** â€” charts, modals, editors

### âŒ Common Mistakes

1. **Adding `'use client'` at layout level** â€” makes entire subtree client-side
2. **Forgetting `priority` on hero images** â€” poor LCP scores
3. **Using `<img>` instead of `<Image />`** â€” loses all optimization benefits
4. **Sequential `await` for unrelated data** â€” creates request waterfall
5. **`useMemo` on everything** â€” memoization has a cost; only use for expensive operations
6. **Not specifying `sizes` on responsive images** â€” browser loads wrong image size
7. **Importing full libraries** â€” `import _ from 'lodash'` pulls in 560KB+
8. **Ignoring bundle analyzer output** â€” hidden large dependencies
9. **Client components that only show data** â€” should be Server Components
10. **No `loading.tsx` or Suspense boundaries** â€” users see blank pages

---

## 16.19 Interview Questions

### Beginner

**Q1: What is the purpose of the `<Image />` component in Next.js?**
> It automatically optimizes images by converting them to modern formats (WebP/AVIF), resizing for different screen sizes, lazy loading by default, and preventing layout shift by requiring width/height.

**Q2: What is code splitting and does Next.js do it automatically?**
> Code splitting divides the JS bundle into smaller chunks loaded on demand. Yes, Next.js automatically splits code per route â€” each page gets its own bundle.

**Q3: What is the difference between `useMemo` and `useCallback`?**
> `useMemo` memoizes a computed **value** (runs a function and caches its return value). `useCallback` memoizes a **function reference** itself (useful for passing stable callbacks to memoized child components).

### Intermediate

**Q4: Explain the difference between Next.js's 4 caching layers.**
> (1) **Request Memoization**: deduplicates same `fetch()` calls in one render. (2) **Data Cache**: persists `fetch()` results across requests. (3) **Full Route Cache**: stores rendered HTML at build time. (4) **Router Cache**: client-side cache of visited routes in browser memory.

**Q5: When would you use `dynamic(() => import(...), { ssr: false })`?**
> When a component uses browser-only APIs (like `window`, `document`, WebGL) or client-only libraries (e.g., D3 charts, Leaflet maps) that cannot run during server-side rendering.

**Q6: How does Suspense improve perceived performance?**
> Suspense allows components to render a fallback (skeleton) while waiting for async data/code. Combined with streaming, the server sends HTML progressively â€” users see content appear piece by piece rather than waiting for everything.

### Advanced

**Q7: How would you optimize an e-commerce product page to get a Lighthouse score above 90?**
> (1) Hero image with `priority`, correct `sizes`. (2) Server Component for static product data. (3) Parallel fetch for product + inventory. (4) Dynamic imports for reviews, related products. (5) `next/font` for fonts. (6) Suspense boundaries for streaming. (7) React.memo + useCallback for interactive elements.

**Q8: What is the performance impact of improper use of `useMemo`?**
> `useMemo` has an overhead cost: it stores the value, compares dependencies on every render, and uses memory. If the computation is cheap (simple addition, accessing a property), `useMemo` can actually make performance *worse*. It should only be used for genuinely expensive calculations or to maintain stable object references.

**Q9: How does Next.js's streaming differ from traditional SSR and static generation?**
> Traditional SSR waits for all data, then sends complete HTML. Static generation pre-renders at build time. Streaming sends the page shell immediately, then streams in each Suspense boundary's content as its data resolves â€” achieving fast TTFB and progressive rendering without the limitations of static generation.

---

# Section 17: SEO in Next.js

## 17.1 What is SEO?

**SEO (Search Engine Optimization)** is the practice of optimizing your website so search engines (like Google, Bing) can find it, understand it, and rank it highly in search results for relevant queries.

Think of it like this: if the internet is a massive library and your website is a book, **SEO is making sure your book has a clear title, table of contents, and is in the right section** â€” so the librarian (Google) can easily recommend it when someone asks for it.

### How Search Engines Work

```txt
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="300" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Search Engine Crawling Lifecycle</text>

  <!-- Steps -->
  <!-- 1 Discover -->
  <circle cx="80" cy="130" r="45" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="80" y="118" text-anchor="middle" fill="#93c5fd" font-size="20">ðŸ”</text>
  <text x="80" y="138" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="bold">1. Discover</text>
  <text x="80" y="152" text-anchor="middle" fill="#93c5fd" font-size="8">Crawler finds</text>
  <text x="80" y="162" text-anchor="middle" fill="#93c5fd" font-size="8">your page</text>

  <line x1="128" y1="130" x2="158" y2="130" stroke="#475569" stroke-width="2" marker-end="url(#arrowW)"/>

  <!-- 2 Crawl -->
  <circle cx="205" cy="130" r="45" fill="#0f3320" stroke="#22c55e" stroke-width="2"/>
  <text x="205" y="118" text-anchor="middle" fill="#4ade80" font-size="20">ðŸ•·ï¸</text>
  <text x="205" y="138" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">2. Crawl</text>
  <text x="205" y="152" text-anchor="middle" fill="#4ade80" font-size="8">Downloads HTML,</text>
  <text x="205" y="162" text-anchor="middle" fill="#4ade80" font-size="8">reads metadata</text>

  <line x1="253" y1="130" x2="283" y2="130" stroke="#475569" stroke-width="2" marker-end="url(#arrowW)"/>

  <!-- 3 Index -->
  <circle cx="330" cy="130" r="45" fill="#2d1b69" stroke="#8b5cf6" stroke-width="2"/>
  <text x="330" y="118" text-anchor="middle" fill="#c4b5fd" font-size="20">ðŸ“š</text>
  <text x="330" y="138" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="bold">3. Index</text>
  <text x="330" y="152" text-anchor="middle" fill="#c4b5fd" font-size="8">Stores page in</text>
  <text x="330" y="162" text-anchor="middle" fill="#c4b5fd" font-size="8">search database</text>

  <line x1="378" y1="130" x2="408" y2="130" stroke="#475569" stroke-width="2" marker-end="url(#arrowW)"/>

  <!-- 4 Rank -->
  <circle cx="455" cy="130" r="45" fill="#1c0a00" stroke="#f97316" stroke-width="2"/>
  <text x="455" y="118" text-anchor="middle" fill="#fdba74" font-size="20">ðŸ“Š</text>
  <text x="455" y="138" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">4. Rank</text>
  <text x="455" y="152" text-anchor="middle" fill="#fdba74" font-size="8">Scores relevance,</text>
  <text x="455" y="162" text-anchor="middle" fill="#fdba74" font-size="8">authority, quality</text>

  <line x1="503" y1="130" x2="533" y2="130" stroke="#475569" stroke-width="2" marker-end="url(#arrowW)"/>

  <!-- 5 Serve -->
  <circle cx="595" cy="130" r="45" fill="#14532d" stroke="#16a34a" stroke-width="2"/>
  <text x="595" y="118" text-anchor="middle" fill="#86efac" font-size="20">ðŸŽ¯</text>
  <text x="595" y="138" text-anchor="middle" fill="#16a34a" font-size="10" font-weight="bold">5. Serve</text>
  <text x="595" y="152" text-anchor="middle" fill="#86efac" font-size="8">Shows in search</text>
  <text x="595" y="162" text-anchor="middle" fill="#86efac" font-size="8">results for queries</text>

  <defs>
    <marker id="arrowW" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>

  <!-- Next.js impact -->
  <rect x="30" y="205" width="640" height="60" fill="#0c1824" rx="8" stroke="#1e3a5f" stroke-width="1"/>
  <text x="350" y="225" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Next.js's Role in SEO</text>
  <text x="350" y="245" text-anchor="middle" fill="#94a3b8" font-size="9">Server-side rendering ensures crawler sees fully-rendered HTML with all metadata â†’ better indexing</text>
  <text x="350" y="258" text-anchor="middle" fill="#94a3b8" font-size="9">Metadata API provides structured title/description/OG tags â†’ better ranking signals and rich snippets</text>
</svg>
```

---

## 17.2 Why SEO Matters

| Benefit | Detail |
|---------|--------|
| **Organic traffic** | 53% of all website traffic comes from organic search |
| **Trust** | Users trust organic results more than ads |
| **Cost-effective** | Unlike ads, good rankings generate free traffic |
| **Long-term ROI** | Good SEO compounds over time |
| **Competitive advantage** | Outranking competitors = more market share |
| **User experience** | SEO best practices overlap with UX best practices |

---

## 17.3 SEO in SSR Applications

### CSR vs SSR for SEO

| Aspect | CSR (React SPA) | SSR (Next.js) |
|--------|-----------------|---------------|
| **Initial HTML** | Empty `<div id="root">` | Full rendered HTML |
| **Crawler sees** | Empty or minimal content | Complete page content |
| **Metadata** | May not be set correctly | Set on server, always present |
| **Indexing reliability** | Inconsistent (JS must execute) | Reliable (HTML ready) |
| **Time to index** | Slower (crawler waits for JS) | Faster (instant HTML) |
| **Dynamic content** | Crawler may miss JS-rendered text | Always indexed |
| **Recommendation** | âŒ Poor for SEO | âœ… Excellent for SEO |

---

## 17.4 Metadata API

Next.js App Router provides a powerful **Metadata API** that replaces the old `<Head>` component.

### Static Metadata

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

// Static metadata â€” known at build time
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: 'My Awesome App',          // used when no page title
    template: '%s | My Awesome App',    // %s = page title, appended with site name
  },
  description: 'The best app for managing your tasks efficiently.',

  // Application info
  applicationName: 'My Awesome App',
  authors: [{ name: 'Jane Doe', url: 'https://janedoe.com' }],
  generator: 'Next.js',
  keywords: ['task management', 'productivity', 'todo app'],
  referrer: 'origin-when-cross-origin',

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Manifest
  manifest: '/site.webmanifest',

  // Open Graph (social sharing)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myapp.com',
    siteName: 'My Awesome App',
    title: 'My Awesome App â€” Task Management',
    description: 'The best app for managing your tasks.',
    images: [
      {
        url: 'https://myapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Awesome App preview',
      },
    ],
  },

  // Twitter/X cards
  twitter: {
    card: 'summary_large_image',
    site: '@myawesomeapp',
    creator: '@janedoe',
    title: 'My Awesome App',
    description: 'The best task management app.',
    images: ['https://myapp.com/twitter-card.png'],
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: 'https://myapp.com',
    languages: {
      'en-US': 'https://myapp.com/en',
      'es-ES': 'https://myapp.com/es',
    },
  },

  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## 17.5 Dynamic Metadata

`generateMetadata()` is used when metadata depends on data fetched at runtime (e.g., product name, blog title).

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next';

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Fetch blog post data (shared with page component via cache())
import { cache } from 'react';
const getPost = cache(async (slug: string) => {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 3600 }, // revalidate every hour
  });
  if (!res.ok) return null;
  return res.json();
});

// Dynamic metadata generation
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata // access parent metadata if needed
): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  // Access parent metadata (e.g., site name from layout)
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,                  // â†’ "My Post Title | My Awesome App"
    description: post.excerpt,
    
    // Authors from post data
    authors: [{ name: post.author.name }],
    
    // Publication date
    other: {
      'article:published_time': post.publishedAt,
      'article:modified_time': post.updatedAt,
    },

    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://myapp.com/blog/${params.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage || 'https://myapp.com/og-default.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImages, // include parent images as fallback
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || 'https://myapp.com/twitter-default.png'],
    },

    alternates: {
      canonical: `https://myapp.com/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug); // uses cache() â€” no duplicate fetch
  // ...
}
```

### Static vs Dynamic Metadata

| Feature | Static (`export const metadata`) | Dynamic (`generateMetadata()`) |
|---------|----------------------------------|--------------------------------|
| **When evaluated** | Build time | Request time |
| **Can fetch data** | No | Yes |
| **Performance** | Faster (pre-rendered) | Slightly slower |
| **Use case** | Layout, static pages | Product pages, blog posts |
| **Supports params** | No | Yes |
| **TypeScript support** | Yes | Yes |

---

## 17.6 OpenGraph & Social Tags

**OpenGraph** tags control how your pages appear when shared on social media (Facebook, LinkedIn, WhatsApp). **Twitter Cards** control appearance on Twitter/X.

### Metadata Flow Diagram

```txt
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="340" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Metadata Flow in Next.js</text>

  <!-- Source: Page Component -->
  <rect x="20" y="50" width="150" height="60" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="95" y="73" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="bold">Page / Layout</text>
  <text x="95" y="88" text-anchor="middle" fill="#93c5fd" font-size="9">exports metadata</text>
  <text x="95" y="101" text-anchor="middle" fill="#93c5fd" font-size="9">or generateMetadata()</text>

  <!-- Arrow -->
  <line x1="170" y1="80" x2="220" y2="80" stroke="#475569" stroke-width="1.5" marker-end="url(#arrowB)"/>

  <!-- Next.js Metadata Resolver -->
  <rect x="220" y="50" width="160" height="60" fill="#1a1a3e" rx="8" stroke="#818cf8" stroke-width="1.5"/>
  <text x="300" y="68" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">Next.js Resolver</text>
  <text x="300" y="83" text-anchor="middle" fill="#818cf8" font-size="9">Merges layout +</text>
  <text x="300" y="96" text-anchor="middle" fill="#818cf8" font-size="9">page metadata</text>
  <text x="300" y="108" text-anchor="middle" fill="#6366f1" font-size="8">(page overrides layout)</text>

  <!-- Arrow -->
  <line x1="380" y1="80" x2="430" y2="80" stroke="#475569" stroke-width="1.5" marker-end="url(#arrowB)"/>

  <!-- HTML Head -->
  <rect x="430" y="50" width="240" height="60" fill="#052e16" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="550" y="68" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="bold">Rendered HTML &lt;head&gt;</text>
  <text x="550" y="83" text-anchor="middle" fill="#86efac" font-size="9">&lt;title&gt;, &lt;meta&gt;, &lt;link&gt; tags</text>
  <text x="550" y="96" text-anchor="middle" fill="#4ade80" font-size="9">og:title, og:image, etc.</text>

  <!-- Who reads it -->
  <text x="350" y="135" text-anchor="middle" fill="#475569" font-size="11">Who reads the &lt;head&gt; metadata?</text>

  <!-- Google -->
  <rect x="20" y="150" width="135" height="80" fill="#1c0a00" rx="8" stroke="#f97316" stroke-width="1.5"/>
  <text x="87" y="172" text-anchor="middle" fill="#fb923c" font-size="22">ðŸ”</text>
  <text x="87" y="195" text-anchor="middle" fill="#fdba74" font-size="11" font-weight="bold">Google</text>
  <text x="87" y="210" text-anchor="middle" fill="#f97316" font-size="9">title, description,</text>
  <text x="87" y="222" text-anchor="middle" fill="#f97316" font-size="9">robots, canonical</text>

  <!-- Facebook/LinkedIn -->
  <rect x="170" y="150" width="135" height="80" fill="#0c1f5c" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="237" y="172" text-anchor="middle" fill="#60a5fa" font-size="22">ðŸ‘¥</text>
  <text x="237" y="195" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">FB / LinkedIn</text>
  <text x="237" y="210" text-anchor="middle" fill="#60a5fa" font-size="9">og:title, og:image</text>
  <text x="237" y="222" text-anchor="middle" fill="#60a5fa" font-size="9">og:description</text>

  <!-- Twitter/X -->
  <rect x="320" y="150" width="135" height="80" fill="#0a1628" rx="8" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="387" y="172" text-anchor="middle" fill="#7dd3fc" font-size="22">ð•</text>
  <text x="387" y="195" text-anchor="middle" fill="#bae6fd" font-size="11" font-weight="bold">Twitter / X</text>
  <text x="387" y="210" text-anchor="middle" fill="#7dd3fc" font-size="9">twitter:card,</text>
  <text x="387" y="222" text-anchor="middle" fill="#7dd3fc" font-size="9">twitter:image</text>

  <!-- Slack/WhatsApp -->
  <rect x="470" y="150" width="135" height="80" fill="#0f2d1a" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="537" y="172" text-anchor="middle" fill="#4ade80" font-size="22">ðŸ’¬</text>
  <text x="537" y="195" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Slack / WhatsApp</text>
  <text x="537" y="210" text-anchor="middle" fill="#4ade80" font-size="9">og:title, og:image</text>
  <text x="537" y="222" text-anchor="middle" fill="#4ade80" font-size="9">og:description</text>

  <!-- Schema -->
  <rect x="30" y="255" width="640" height="60" fill="#0c1a2e" rx="8" stroke="#475569" stroke-width="1"/>
  <text x="350" y="275" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Metadata Hierarchy (page overrides layout overrides root)</text>
  <text x="350" y="293" text-anchor="middle" fill="#64748b" font-size="9">app/layout.tsx â†’ app/blog/layout.tsx â†’ app/blog/[slug]/page.tsx</text>
  <text x="350" y="306" text-anchor="middle" fill="#64748b" font-size="9">Fields merge; conflicting fields use the most-specific (deepest) value</text>

  <defs>
    <marker id="arrowB" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

### OG Image Generation with `ImageResponse`

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog post cover';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
    .then((r) => r.json());

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '60px',
        }}
      >
        <p style={{ color: '#93c5fd', fontSize: 28, margin: '0 0 12px' }}>
          My Awesome Blog
        </p>
        <h1 style={{ color: 'white', fontSize: 64, fontWeight: 700, margin: 0 }}>
          {post.title}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 28, marginTop: 16 }}>
          {post.author.name} Â· {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      </div>
    ),
    { ...size }
  );
}
// This generates a dynamic OG image for every blog post
// Accessible at: /blog/[slug]/opengraph-image
```

---

## 17.7 Sitemap & robots.txt

### Generating a Sitemap

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

// Returns a programmatically generated sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://myapp.com';

  // Fetch dynamic pages (blog posts, products)
  const posts = await fetch(`${baseUrl}/api/posts`).then((r) => r.json());
  const products = await fetch(`${baseUrl}/api/products`).then((r) => r.json());

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
// Generates: https://myapp.com/sitemap.xml
```

### robots.txt

```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',          // applies to all crawlers
        allow: '/',              // allow everything
        disallow: [
          '/api/',               // don't crawl API routes
          '/admin/',             // don't crawl admin panel
          '/private/',           // don't crawl private pages
          '/_next/',             // Next.js internal files
        ],
      },
      {
        userAgent: 'Googlebot',  // specific rules for Googlebot
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: 'https://myapp.com/sitemap.xml', // tell crawlers where sitemap is
    host: 'https://myapp.com',                // canonical host
  };
}
// Generates: https://myapp.com/robots.txt
```

### Canonical URLs

Canonical URLs tell search engines which URL is the "official" version of a page (to prevent duplicate content penalties).

```tsx
// app/products/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return {
    // Canonical URL â€” even if page is accessible via multiple URLs
    alternates: {
      canonical: `https://myapp.com/products/${params.id}`,
      // For multi-language sites:
      languages: {
        'en-US': `https://myapp.com/en/products/${params.id}`,
        'fr-FR': `https://myapp.fr/fr/products/${params.id}`,
      },
    },
  };
}
```

---

## 17.8 Structured Data & JSON-LD

**Structured data** (JSON-LD) is a way to tell search engines explicitly what type of content your page contains. It can unlock **rich snippets** in search results â€” like star ratings, prices, FAQ dropdowns, and recipe details.

```txt
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="200" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">JSON-LD Structured Data â†’ Rich Snippets</text>

  <!-- Normal result -->
  <rect x="20" y="50" width="300" height="120" fill="#0c1824" rx="8" stroke="#334155" stroke-width="1"/>
  <text x="170" y="72" text-anchor="middle" fill="#60a5fa" font-size="11">myapp.com/products/widget</text>
  <text x="40" y="92" text-anchor="start" fill="#e2e8f0" font-size="12" font-weight="bold">Premium Widget â€” $49.99</text>
  <text x="40" y="110" text-anchor="start" fill="#94a3b8" font-size="10">The best widget for all your needs. Shop now and get...</text>
  <text x="170" y="145" text-anchor="middle" fill="#64748b" font-size="9">Without JSON-LD: Basic result</text>

  <!-- Rich result -->
  <rect x="360" y="50" width="320" height="120" fill="#0c1824" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="520" y="72" text-anchor="middle" fill="#60a5fa" font-size="11">myapp.com/products/widget</text>
  <text x="380" y="92" text-anchor="start" fill="#e2e8f0" font-size="12" font-weight="bold">Premium Widget â€” $49.99</text>
  <!-- Stars -->
  <text x="380" y="112" text-anchor="start" fill="#fbbf24" font-size="14">â˜…â˜…â˜…â˜…â˜…</text>
  <text x="450" y="112" text-anchor="start" fill="#94a3b8" font-size="10">4.8 (247 reviews)</text>
  <!-- Price badge -->
  <rect x="380" y="118" width="80" height="16" fill="#14532d" rx="3"/>
  <text x="420" y="130" text-anchor="middle" fill="#86efac" font-size="9">âœ… In Stock</text>
  <text x="380" y="152" text-anchor="start" fill="#94a3b8" font-size="10">The best widget for all your needs...</text>
  <text x="520" y="165" text-anchor="middle" fill="#4ade80" font-size="9">With JSON-LD: Rich Snippet âœ…</text>
</svg>
```

```tsx
// app/products/[id]/page.tsx
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  brand: string;
  sku: string;
}

// JSON-LD for a Product page
function ProductJsonLd({ product }: { product: Product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://myapp.com/products/${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return (
    <>
      <ProductJsonLd product={product} />
      <main>
        {/* Page content */}
      </main>
    </>
  );
}
```

```tsx
// app/blog/[slug]/page.tsx â€” Blog post JSON-LD
function BlogJsonLd({ post }: { post: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          author: {
            '@type': 'Person',
            name: post.author.name,
            url: post.author.profileUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: 'My Awesome Blog',
            logo: { '@type': 'ImageObject', url: 'https://myapp.com/logo.png' },
          },
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://myapp.com/blog/${post.slug}`,
          },
        }),
      }}
    />
  );
}
```

```tsx
// app/faq/page.tsx â€” FAQ JSON-LD (enables accordion in search results)
function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}
```

---

## 17.9 Practical SEO Examples

### Blog SEO â€” Complete Setup

```tsx
// app/blog/[slug]/page.tsx â€” Full blog post SEO
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { cache } from 'react';

const getPost = cache(async (slug: string) => {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { tags: [`post-${slug}`] },
  });
  if (!res.ok) return null;
  return res.json();
});

// Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,                   // "How to Build Next.js Apps | My Blog"
    description: post.excerpt,           // 150-160 chars, compelling summary
    keywords: post.tags,                 // ['nextjs', 'react', 'typescript']
    authors: [{ name: post.author.name }],

    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://myblog.com/blog/${params.slug}`,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      tags: post.tags,
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },

    alternates: {
      canonical: `https://myblog.com/blog/${params.slug}`,
    },
  };
}

// Pre-generate static pages for all posts
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map((p: any) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article itemScope itemType="https://schema.org/BlogPosting">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.publishedAt,
            author: { '@type': 'Person', name: post.author.name },
          }),
        }}
      />

      {/* Semantic HTML for SEO */}
      <header>
        <h1 itemProp="headline">{post.title}</h1>
        <time dateTime={post.publishedAt} itemProp="datePublished">
          {new Date(post.publishedAt).toLocaleDateString()}
        </time>
        <span itemProp="author">{post.author.name}</span>
      </header>

      <Image
        src={post.coverImage}
        alt={post.title}
        width={1200}
        height={630}
        priority
        itemProp="image"
      />

      <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
    </article>
  );
}
```

### Product Page SEO

```tsx
// app/products/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);

  // Descriptive title with key info
  const title = `${product.name} â€” ${product.brand} | ${product.category}`;
  // Meta description with price (eye-catching in search results)
  const description = `Buy ${product.name} for $${product.price}. ${product.shortDescription}. Free shipping on orders over $50.`;

  return {
    title,
    description,
    openGraph: {
      type: 'website', // use 'product' with og:price extensions for e-commerce
      title: product.name,
      description,
      images: product.images.slice(0, 4).map((img: string) => ({
        url: img,
        width: 800,
        height: 800,
      })),
    },
    alternates: {
      canonical: `https://mystore.com/products/${params.id}`,
    },
  };
}
```

### Landing Page SEO

```tsx
// app/page.tsx â€” Homepage/Landing Page
export const metadata: Metadata = {
  title: 'My App â€” Best Task Management for Teams',  // ~60 chars max
  description:
    'Manage tasks, track progress, and collaborate with your team. Join 10,000+ teams using My App. Free plan available.',
  // â†‘ 150-160 chars, includes: value prop, social proof, CTA hint

  openGraph: {
    type: 'website',
    title: 'My App â€” Best Task Management for Teams',
    description: 'Manage tasks, track progress, and collaborate with your team.',
    url: 'https://myapp.com',
    images: [
      {
        url: 'https://myapp.com/og-homepage.png',  // 1200x630px, branded
        width: 1200,
        height: 630,
        alt: 'My App dashboard screenshot',
      },
    ],
  },

  // Organization structured data for knowledge panel
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'My App Inc.',
      url: 'https://myapp.com',
      logo: 'https://myapp.com/logo.png',
      sameAs: [
        'https://twitter.com/myapp',
        'https://linkedin.com/company/myapp',
      ],
    }),
  },
};
```

---

## 17.10 SEO Debugging

### Tools for SEO Testing

| Tool | Purpose | URL |
|------|---------|-----|
| **Google Search Console** | Monitor indexing, coverage, Core Web Vitals | search.google.com/search-console |
| **Rich Results Test** | Validate structured data / JSON-LD | search.google.com/test/rich-results |
| **Google PageSpeed Insights** | Performance + SEO scores | pagespeed.web.dev |
| **Open Graph Debugger** | Preview Facebook/LinkedIn sharing | developers.facebook.com/tools/debug |
| **Twitter Card Validator** | Preview Twitter card | cards-dev.twitter.com/validator |
| **Screaming Frog** | Crawl and audit your site | screamingfrog.co.uk |
| **Ahrefs/SEMrush** | Keyword ranking, backlinks | External subscription |

### Checking Metadata in Browser DevTools

```bash
# Check if metadata is in HTML source (not JS-rendered)
1. Right-click page â†’ "View Page Source" (not "Inspect")
2. Ctrl+F to search for:
   - <title>
   - <meta name="description"
   - <meta property="og:
   - <script type="application/ld+json"

# If you see it in source â†’ great, it's server-rendered (SEO-friendly)
# If you don't see it â†’ it's client-rendered (SEO problem)
```

### Rich Snippets Validation

```tsx
// Validate your JSON-LD at: https://search.google.com/test/rich-results
// Or programmatically test structure:

// app/api/validate-schema/route.ts
export async function GET() {
  const exampleProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Test Product',
    offers: {
      '@type': 'Offer',
      price: '29.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return Response.json({ schema: exampleProduct });
}
```

---

## 17.11 Best Practices & Common Mistakes

### âœ… SEO Best Practices

1. **Every page needs a unique title** â€” 50-60 characters, most important keyword near the start
2. **Write compelling meta descriptions** â€” 150-160 characters, include a call to action
3. **Use semantic HTML** â€” `<h1>`, `<article>`, `<nav>`, `<main>` help crawlers understand structure
4. **One `<h1>` per page** â€” matches the page topic and title
5. **All images need descriptive `alt` text** â€” both for SEO and accessibility
6. **Add JSON-LD for rich content** â€” products, articles, FAQs, recipes
7. **Generate sitemap.xml** â€” helps crawlers discover all pages
8. **Set canonical URLs** â€” especially for paginated or filtered pages
9. **Ensure mobile-friendliness** â€” Google uses mobile-first indexing
10. **Page speed is a ranking factor** â€” optimize Core Web Vitals

### âŒ Common SEO Mistakes

1. **Using CSR for SEO-critical pages** â€” search bots may not execute JavaScript
2. **Duplicate titles across pages** â€” confuses crawlers about page hierarchy
3. **Missing `alt` attributes on images** â€” loses image search traffic
4. **Keyword stuffing in metadata** â€” penalized by modern algorithms
5. **No sitemap or broken sitemap** â€” pages may never be discovered
6. **Blocking important pages in robots.txt** â€” accidentally hiding content
7. **Missing canonical tags on duplicate pages** â€” pagination, filters
8. **No OG images** â€” social shares look unprofessional, lower click rates
9. **Using `display: none` to hide content** â€” Google may ignore it
10. **Not submitting sitemap to Search Console** â€” slower indexing

---

## 17.12 Interview Questions

### Beginner

**Q1: What is the difference between CSR and SSR for SEO?**
> CSR (Client-Side Rendering) sends an empty HTML page that JavaScript fills in. Many crawlers can't execute JavaScript reliably, so they may index empty pages. SSR (Server-Side Rendering) in Next.js sends fully rendered HTML with all content and metadata â€” which crawlers can index immediately and reliably.

**Q2: What does the `metadata` export in Next.js do?**
> It generates `<meta>` tags, `<title>`, Open Graph tags, Twitter card tags, and other `<head>` elements automatically during server rendering, making sure search engines and social platforms always see correct metadata.

**Q3: What is JSON-LD and when would you use it?**
> JSON-LD is a structured data format added to pages as `<script type="application/ld+json">`. It explicitly tells search engines what type of content a page contains (Product, Article, FAQ, etc.), enabling rich snippets in search results like star ratings, prices, and FAQ dropdowns.

### Intermediate

**Q4: How does `generateMetadata()` differ from `export const metadata`?**
> `export const metadata` is evaluated at build time and only works for static, known metadata. `generateMetadata()` is an async function that runs at request time, allowing you to fetch data and generate dynamic metadata (e.g., a blog post title from a database lookup).

**Q5: How do you prevent duplicate content SEO issues on a Next.js e-commerce site with filters?**
> Use canonical URLs in metadata. For filtered pages (e.g., `/products?color=red&sort=price`), point the canonical to the base page (`/products`). Also configure robots rules to disallow crawling parameterized URLs, or use `noindex` for filter combinations.

**Q6: Explain the sitemap generation approach in Next.js App Router.**
> Create `app/sitemap.ts` that exports a default async function returning an array of `{ url, lastModified, changeFrequency, priority }` objects. Next.js automatically serves this as `/sitemap.xml`. You can fetch dynamic routes (blog posts, products) from your API and combine with static routes.

### Advanced

**Q7: How would you implement internationalized SEO in Next.js?**
> Use `alternates.languages` in metadata to add `<link rel="alternate" hreflang="...">` tags for each locale. Configure Next.js i18n routing with sub-paths (`/en/`, `/fr/`) or domains. Use `generateStaticParams` to pre-generate pages for all locales. Ensure each locale has its own canonical URL and metadata.

**Q8: How does Next.js's `generateStaticParams` affect SEO?**
> It pre-renders pages at build time as static HTML, which is the most SEO-friendly approach. Crawlers receive instant, fully-rendered HTML without server computation delay. Combined with ISR (`revalidate`), you get the best of both worlds: static-speed performance with fresh content.

**Q9: What strategies would you use to optimize Core Web Vitals specifically for SEO?**
> For LCP: add `priority` to hero images, preload critical fonts with `next/font`, minimize server response time. For CLS: always specify image dimensions, use `font-display: swap`, avoid injecting DOM above existing content. For INP: minimize JavaScript execution time using Server Components, lazy load non-critical JS, use `useCallback`/`useMemo` to prevent unnecessary re-renders. Monitor with Vercel Analytics for real user data.

---

# Summary & Key Takeaways

## Summary

This guide covered the two most critical aspects of production Next.js applications:

**Performance Optimization** is about delivering fast, smooth user experiences by reducing what users download, loading only what's needed, and rendering efficiently. Next.js provides powerful built-in tools â€” the `<Image />` component, `next/font`, dynamic imports, Suspense streaming, and multi-layer caching â€” that make optimization accessible.

**SEO in Next.js** leverages server-side rendering to ensure search engines can always read your content. The Metadata API, `generateMetadata()`, structured data (JSON-LD), sitemaps, and robots.txt together create a comprehensive SEO foundation that would require complex manual configuration in a traditional React SPA.

## Key Takeaways

| Area | Key Insight |
|------|------------|
| **Core Web Vitals** | LCP â‰¤2.5s, INP â‰¤200ms, CLS â‰¤0.1 are Google ranking factors |
| **Images** | Always use `<Image />` with `priority` on LCP images, `sizes` attribute always |
| **Code splitting** | Next.js auto-splits per route; use `dynamic()` for component-level splitting |
| **Server Components** | Default to server; only use `'use client'` when needed |
| **Caching** | 4 layers: Request Memoization, Data Cache, Full Route Cache, Router Cache |
| **Streaming** | `loading.tsx` + Suspense enables progressive page rendering |
| **Metadata** | Static `metadata` for layout/known pages, `generateMetadata()` for dynamic data |
| **SEO vs CSR** | Next.js SSR ensures crawlers see real HTML, not empty JS shells |
| **JSON-LD** | Add schema.org markup for rich snippets in search results |
| **Sitemap** | `app/sitemap.ts` auto-generates `/sitemap.xml` from your routes |

---

# Practice Exercises

1. **Bundle Analysis**: Add `@next/bundle-analyzer` to a project, run `ANALYZE=true npm run build`, and identify the 3 largest dependencies. Try to reduce each by at least 50%.

2. **Image Audit**: Audit a Next.js project's images â€” add `priority` to hero images, correct `sizes` values to all images, convert any `<img>` tags to `<Image />`.

3. **Dynamic Import**: Take a component that uses a heavy third-party library (chart, editor, date picker) and convert it to a dynamic import with a loading skeleton.

4. **Metadata Setup**: Build a complete metadata setup for a blog â€” `layout.tsx` with default metadata, `generateMetadata()` for posts, OG image generation.

5. **Structured Data**: Add Product JSON-LD to a product page and validate it using Google's Rich Results Test tool.

6. **Sitemap + robots.txt**: Implement `app/sitemap.ts` that fetches blog posts from an API and combines them with static routes. Add `app/robots.ts` to block the `/admin` route.

7. **Performance Optimization**: Take a slow dashboard page and: (a) convert data components to Server Components, (b) wrap sections in Suspense, (c) add `loading.tsx`, (d) parallelize API calls.

---

# Mini Project Ideas

## 1. SEO-Optimized Blog

Build a blog with:
- Dynamic `generateMetadata()` for each post
- Auto-generated OG images using `ImageResponse`
- Article JSON-LD structured data
- `sitemap.ts` with all blog posts
- `robots.ts` with proper directives
- `next/font` for typography
- `<Image />` for all media
- Lighthouse score target: 95+

## 2. Product E-commerce Website

Build a product catalog with:
- Product page Product JSON-LD (enables star ratings in search)
- Category page BreadcrumbList JSON-LD
- Dynamic metadata per product (name, price, brand in title)
- Canonical URLs for filtered/sorted views
- Image optimization for product gallery
- Dynamic import for reviews section
- Suspense streaming for related products
- Bundle analysis and optimization

## 3. Landing Page with Full SEO

Build a SaaS landing page with:
- Organization JSON-LD for knowledge panel
- FAQPage JSON-LD for FAQ section
- Optimized metadata for social sharing
- Lighthouse performance score 90+
- Font optimization with `next/font`
- Core Web Vitals under the "good" threshold
- Search Console integration guidance

---

# Interview Preparation

## Beginner Questions

1. What is the difference between LCP, INP, and CLS?
2. What does the `<Image />` component in Next.js do that a regular `<img>` tag doesn't?
3. What is code splitting and how does Next.js implement it?
4. What is the purpose of the `priority` prop on `<Image />`?
5. What is `useMemo` and when should you use it?
6. What is SEO and why does Next.js have better SEO than a regular React app?
7. What is the `metadata` export in App Router used for?
8. What is an OG (Open Graph) tag? Give an example.

## Intermediate Questions

1. Explain all four caching layers in Next.js App Router.
2. What is tree shaking and how does Next.js support it?
3. How do `useMemo` and `useCallback` differ? When would you use each?
4. What is the difference between `dynamic()` with `ssr: false` vs `ssr: true`?
5. How does streaming with Suspense work in Next.js?
6. What is `generateMetadata()` and how does it differ from static metadata?
7. What is JSON-LD and what types of rich snippets can it enable?
8. How do you generate a dynamic sitemap in Next.js App Router?
9. What is a canonical URL and when do you need one?
10. How would you implement parallel data fetching in a Server Component?

## Advanced Questions

1. How does Next.js streaming differ from traditional SSR and when would you choose each?
2. Explain request memoization vs data cache in Next.js. How do you control each?
3. How would you optimize a Next.js e-commerce site to achieve Lighthouse score > 90?
4. What are the performance trade-offs of moving a component from Server to Client?
5. How would you implement tag-based cache invalidation in Next.js?
6. Explain the rendering performance implications of putting `'use client'` at a high level in the component tree.
7. How would you implement international SEO (hreflang) in Next.js?
8. Describe a complete strategy to diagnose and fix a poor CLS (Cumulative Layout Shift) score.
9. How does `React.cache()` differ from Next.js's data cache?
10. What is the impact of `generateStaticParams` on SEO and when would you use ISR instead?

---

> **Next in the series**: Part 4B â€” Testing in Next.js, Error Handling, and Deployment Strategies

---

*Next.js Deep Dive Documentation â€” Part 4A | Performance Optimization & SEO*  
*TypeScript Â· App Router Â· Production-Ready Examples*

