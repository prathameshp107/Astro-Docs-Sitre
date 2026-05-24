---
title: "Rendering Methods"
description: "Next.js offers four main rendering strategies. Choosing the right one impacts performance, SEO, and user experience significantly."
---

# Section 9: Rendering Methods

## 9.1 The Four Rendering Strategies

Next.js offers four main rendering strategies. Choosing the right one impacts **performance**, **SEO**, and **user experience** significantly.

| Strategy | Acronym | When HTML is Generated |
|----------|---------|----------------------|
| Static Site Generation | SSG | At **build time** |
| Server-Side Rendering | SSR | At **request time** |
| Incremental Static Regeneration | ISR | Build time + **periodic refresh** |
| Client-Side Rendering | CSR | In the **browser** |

---

## 9.2 Static Site Generation (SSG)

**SSG** pre-renders pages at build time. All pages become static HTML files — blazing fast.

```tsx
// app/blog/[slug]/page.tsx

// Tell Next.js all possible blog post slugs at build time
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then((r) =>
    r.json()
  );

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// This page is statically generated for each slug
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`, {
    cache: "force-cache", // Cache this forever (SSG behavior)
  }).then((r) => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export default BlogPost;
```

```txt
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="680" height="240" fill="#0f1117" rx="12"/>
  <text x="340" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">SSG Build Flow</text>

  <rect x="20" y="50" width="110" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#93c5fd" font-weight="bold">npm run</text>
  <text x="75" y="88" text-anchor="middle" fill="#93c5fd" font-weight="bold">build</text>

  <line x1="130" y1="75" x2="160" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="158,71 168,75 158,79" fill="#475569"/>

  <rect x="168" y="50" width="120" height="50" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="228" y="70" text-anchor="middle" fill="#fcd34d" font-weight="bold">Fetch all data</text>
  <text x="228" y="86" text-anchor="middle" fill="#fde68a" font-size="11">API calls run once</text>

  <line x1="288" y1="75" x2="318" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="316,71 326,75 316,79" fill="#475569"/>

  <rect x="326" y="50" width="130" height="50" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="391" y="70" text-anchor="middle" fill="#86efac" font-weight="bold">Generate HTML</text>
  <text x="391" y="86" text-anchor="middle" fill="#bbf7d0" font-size="11">One file per page</text>

  <line x1="456" y1="75" x2="486" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="484,71 494,75 484,79" fill="#475569"/>

  <rect x="494" y="50" width="120" height="50" fill="#2d1057" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="554" y="70" text-anchor="middle" fill="#d8b4fe" font-weight="bold">Deploy to CDN</text>
  <text x="554" y="86" text-anchor="middle" fill="#e9d5ff" font-size="11">Global distribution</text>

  <rect x="20" y="130" width="640" height="90" fill="#1e293b" rx="8"/>
  <text x="340" y="150" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="12">SSG Characteristics</text>
  <text x="36" y="170" fill="#64748b" font-size="11">✅ Fastest possible load time (HTML served from CDN edge)</text>
  <text x="36" y="188" fill="#64748b" font-size="11">✅ Best for: blogs, docs, marketing pages, portfolios</text>
  <text x="36" y="206" fill="#64748b" font-size="11">❌ Not for: real-time data, user-specific content, dashboards requiring fresh data</text>
</svg>
```

---

## 9.3 Server-Side Rendering (SSR)

**SSR** generates HTML **on every request**. Always fresh, always current.

```tsx
// app/dashboard/page.tsx

// Force dynamic rendering (SSR behavior)
export const dynamic = "force-dynamic";

async function DashboardPage() {
  // This runs on EVERY request — always fresh data
  const userData = await fetch("https://api.example.com/user/me", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  }).then((r) => r.json());

  return (
    <div>
      <h1>Welcome back, {userData.name}</h1>
      <p>Last login: {userData.lastLogin}</p>
    </div>
  );
}

export default DashboardPage;
```

```txt
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="680" height="240" fill="#0f1117" rx="12"/>
  <text x="340" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">SSR Request Flow</text>

  <rect x="20" y="50" width="110" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#93c5fd" font-weight="bold">User</text>
  <text x="75" y="88" text-anchor="middle" fill="#93c5fd" font-weight="bold">Request</text>

  <line x1="130" y1="75" x2="160" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="158,71 168,75 158,79" fill="#475569"/>

  <rect x="168" y="50" width="110" height="50" fill="#450a0a" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="223" y="70" text-anchor="middle" fill="#fca5a5" font-weight="bold">Next.js</text>
  <text x="223" y="86" text-anchor="middle" fill="#fca5a5" font-weight="bold">Server</text>

  <line x1="278" y1="75" x2="308" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="306,71 316,75 306,79" fill="#475569"/>

  <rect x="316" y="50" width="110" height="50" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="371" y="70" text-anchor="middle" fill="#fcd34d" font-weight="bold">Fetch Data</text>
  <text x="371" y="86" text-anchor="middle" fill="#fde68a" font-size="11">DB / API call</text>

  <line x1="426" y1="75" x2="456" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="454,71 464,75 454,79" fill="#475569"/>

  <rect x="464" y="50" width="110" height="50" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="519" y="70" text-anchor="middle" fill="#86efac" font-weight="bold">Render &</text>
  <text x="519" y="86" text-anchor="middle" fill="#bbf7d0" font-size="11">Send HTML</text>

  <!-- Notes -->
  <rect x="20" y="130" width="640" height="90" fill="#1e293b" rx="8"/>
  <text x="340" y="150" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="12">SSR Characteristics</text>
  <text x="36" y="170" fill="#64748b" font-size="11">✅ Always fresh — data fetched on every single request</text>
  <text x="36" y="188" fill="#64748b" font-size="11">✅ Best for: user dashboards, e-commerce product pages, real-time data</text>
  <text x="36" y="206" fill="#64748b" font-size="11">⚠️ Slower than SSG — server must render before responding; no CDN caching of HTML</text>
</svg>
```

---

## 9.4 Incremental Static Regeneration (ISR)

**ISR** is the best of both worlds — pages are static but **automatically refreshed** on a schedule.

```tsx
// app/shop/[id]/page.tsx

// ISR: regenerate this page every 10 minutes
export const revalidate = 600; // seconds

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`)
    .then((r) => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ₹{product.price}</p>
      {/* Last updated shown to user */}
      <small>Updated: {new Date().toLocaleString()}</small>
    </div>
  );
}

export default ProductPage;
```

```txt
<svg viewBox="0 0 700 290" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="700" height="290" fill="#0f1117" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">ISR Regeneration Flow</text>

  <!-- Build -->
  <rect x="20" y="55" width="100" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1"/>
  <text x="70" y="76" text-anchor="middle" fill="#93c5fd" font-weight="bold">Build</text>
  <text x="70" y="92" text-anchor="middle" fill="#bfdbfe" font-size="10">Static HTML</text>

  <line x1="120" y1="80" x2="155" y2="80" stroke="#475569" stroke-width="1.5"/>
  <polygon points="153,76 163,80 153,84" fill="#475569"/>

  <!-- CDN -->
  <rect x="163" y="55" width="100" height="50" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1"/>
  <text x="213" y="76" text-anchor="middle" fill="#86efac" font-weight="bold">CDN Serves</text>
  <text x="213" y="92" text-anchor="middle" fill="#bbf7d0" font-size="10">Fast responses</text>

  <!-- User arrow -->
  <line x1="263" y1="80" x2="298" y2="80" stroke="#475569" stroke-width="1.5"/>
  <polygon points="296,76 306,80 296,84" fill="#475569"/>

  <rect x="306" y="55" width="100" height="50" fill="#2d1057" rx="8" stroke="#a855f7" stroke-width="1"/>
  <text x="356" y="76" text-anchor="middle" fill="#d8b4fe" font-weight="bold">User gets</text>
  <text x="356" y="92" text-anchor="middle" fill="#e9d5ff" font-size="10">cached page</text>

  <!-- Timer -->
  <line x1="356" y1="105" x2="356" y2="140" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4"/>
  <rect x="290" y="140" width="130" height="40" fill="#3b1f00" rx="6" stroke="#f59e0b" stroke-width="1"/>
  <text x="355" y="158" text-anchor="middle" fill="#fcd34d" font-weight="bold">⏰ Revalidate time</text>
  <text x="355" y="172" text-anchor="middle" fill="#fde68a" font-size="10">e.g. 60 seconds passed</text>

  <!-- Background regen -->
  <line x1="355" y1="180" x2="355" y2="210" stroke="#475569" stroke-width="1.5"/>
  <polygon points="351,208 355,218 359,208" fill="#475569"/>

  <rect x="260" y="218" width="190" height="40" fill="#450a0a" rx="8" stroke="#ef4444" stroke-width="1"/>
  <text x="355" y="235" text-anchor="middle" fill="#fca5a5" font-weight="bold">Background regen</text>
  <text x="355" y="251" text-anchor="middle" fill="#fca5a5" font-size="10">New HTML built silently</text>

  <!-- Note -->
  <rect x="480" y="140" width="195" height="80" fill="#1e293b" rx="8"/>
  <text x="578" y="160" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="11">Key Behavior:</text>
  <text x="490" y="178" fill="#64748b" font-size="10">Old page served until</text>
  <text x="490" y="193" fill="#64748b" font-size="10">new one is ready.</text>
  <text x="490" y="208" fill="#86efac" font-size="10">✅ Zero downtime updates</text>
</svg>
```

---

## 9.5 Client-Side Rendering (CSR)

**CSR** renders entirely in the browser. The server sends minimal HTML; React builds the UI.

```tsx
// components/LiveChart.tsx
"use client";

import { useEffect, useState } from "react";

interface DataPoint {
  time: string;
  value: number;
}

// Pure CSR — browser fetches and renders all data
export function LiveChart({ dataUrl }: { dataUrl: string }) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(dataUrl);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };

    fetchData();

    // Poll every 5 seconds for live updates
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [dataUrl]);

  if (loading) return <div className="animate-pulse h-40 bg-gray-200 rounded" />;

  return (
    <div>
      {/* Render chart with data */}
      {data.map((point, i) => (
        <div key={i}>{point.time}: {point.value}</div>
      ))}
    </div>
  );
}
```

---

## 9.6 Rendering Methods Comparison

### SSR vs SSG vs ISR vs CSR

| Feature | SSR | SSG | ISR | CSR |
|---------|-----|-----|-----|-----|
| HTML generated | Per request | At build | Build + refresh | In browser |
| Performance | Medium | 🏆 Fastest | Fast | Slow initial |
| SEO | ✅ Excellent | ✅ Excellent | ✅ Excellent | ❌ Poor |
| Data freshness | 🏆 Always fresh | Stale | Periodic | Controlled |
| Server load | High | None (CDN) | Low | None |
| Personalized | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| Build time | Fast | Slow (all pages) | Fast | Fast |
| Use cases | Dashboards, auth | Blogs, docs | E-commerce | Real-time apps |

### SEO Comparison

| Method | SEO Score | Reason |
|--------|-----------|--------|
| SSG | ⭐⭐⭐⭐⭐ | Static HTML on CDN, fastest crawl |
| ISR | ⭐⭐⭐⭐⭐ | Same as SSG + auto-refresh |
| SSR | ⭐⭐⭐⭐ | HTML rendered per request, great for bots |
| CSR | ⭐⭐ | Bots may not run JavaScript |

---

## 9.7 Hydration Deep Dive

**Partial Hydration** — Next.js only hydrates Client Components, not Server Components. This makes apps faster.

**Streaming Rendering** — With Suspense, parts of the page stream to the browser as they're ready. No need to wait for all data.

```tsx
// This page streams content progressively
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      {/* Immediately sent — no waiting */}
      <Header />

      {/* Streams when ready */}
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />
      </Suspense>

      {/* Also streams independently */}
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </>
  );
}
```

---

## 9.8 Edge Rendering

Next.js can run pages at **CDN edge locations** for ultra-low latency worldwide.

```tsx
// app/api/geo/route.ts
export const runtime = "edge"; // Run at CDN edge

export async function GET(request: Request) {
  // Runs at the nearest edge location to the user
  return new Response("Hello from the edge!", {
    headers: { "Content-Type": "text/plain" },
  });
}
```

---

## 9.9 Choosing the Right Rendering Method

```
Is content the same for all users?
  ├── YES → Does it change frequently?
  │         ├── NO → SSG (blogs, docs, marketing)
  │         └── YES → ISR (news, product pages, pricing)
  └── NO → Is SEO important?
            ├── YES → SSR (user-specific but SEO-critical)
            └── NO → CSR (dashboards, real-time, auth-only)
```

---

## 9.10 Interview Questions — Rendering Methods

1. **What is the difference between SSG and SSR?**
2. **When would you choose ISR over SSG?**
3. **What does `export const dynamic = "force-dynamic"` do?**
4. **What is `generateStaticParams` and when is it used?**
5. **What is partial hydration? How does it help performance?**
6. **What is streaming rendering in Next.js?**
7. **Can you mix SSG and SSR on the same site?**
8. **What happens when a user requests a page that hasn't been statically generated yet (ISR)?**
9. **What is edge rendering? What are its benefits?**
10. **How does CSR affect SEO? How do you mitigate this?**

---
