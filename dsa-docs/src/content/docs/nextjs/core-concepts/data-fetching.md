---
title: "Data Fetching"
description: "Data fetching is how your application gets data — from your own server, a database, or a third-party API. Next.js offers multiple strategies depending on y"
---

# Section 8: Data Fetching

## 8.1 What is Data Fetching?

Data fetching is how your application **gets data** — from your own server, a database, or a third-party API. Next.js offers multiple strategies depending on your needs.

**Analogy:** Think of a restaurant. Some items are pre-made (static), some are cooked fresh (dynamic), and some are prepared ahead and refreshed regularly (incremental).

---

## 8.2 Client-Side vs Server-Side Fetching

```txt
<svg viewBox="0 0 740 300" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="740" height="300" fill="#0f1117" rx="12"/>
  <text x="370" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Data Fetching Lifecycle</text>

  <!-- Client fetch flow -->
  <rect x="20" y="50" width="680" height="100" fill="#1e293b" rx="8" stroke="#f59e0b" stroke-width="1"/>
  <text x="36" y="72" fill="#fcd34d" font-weight="bold" font-size="12">CLIENT-SIDE FETCHING (useEffect / SWR / React Query)</text>

  <rect x="36" y="82" width="110" height="50" fill="#92400e" rx="6"/>
  <text x="91" y="103" text-anchor="middle" fill="#fff" font-size="11">1. Page loads</text>
  <text x="91" y="119" text-anchor="middle" fill="#fde68a" font-size="10">Empty UI shown</text>

  <line x1="146" y1="107" x2="166" y2="107" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="164,103 174,107 164,111" fill="#f59e0b"/>

  <rect x="174" y="82" width="120" height="50" fill="#92400e" rx="6"/>
  <text x="234" y="103" text-anchor="middle" fill="#fff" font-size="11">2. useEffect</text>
  <text x="234" y="119" text-anchor="middle" fill="#fde68a" font-size="10">fires after render</text>

  <line x1="294" y1="107" x2="314" y2="107" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="312,103 322,107 312,111" fill="#f59e0b"/>

  <rect x="322" y="82" width="120" height="50" fill="#92400e" rx="6"/>
  <text x="382" y="103" text-anchor="middle" fill="#fff" font-size="11">3. API call</text>
  <text x="382" y="119" text-anchor="middle" fill="#fde68a" font-size="10">Loading spinner</text>

  <line x1="442" y1="107" x2="462" y2="107" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="460,103 470,107 460,111" fill="#f59e0b"/>

  <rect x="470" y="82" width="110" height="50" fill="#92400e" rx="6"/>
  <text x="525" y="103" text-anchor="middle" fill="#fff" font-size="11">4. Data arrives</text>
  <text x="525" y="119" text-anchor="middle" fill="#fde68a" font-size="10">UI re-renders</text>

  <!-- Server fetch flow -->
  <rect x="20" y="170" width="680" height="100" fill="#1e293b" rx="8" stroke="#22c55e" stroke-width="1"/>
  <text x="36" y="192" fill="#86efac" font-weight="bold" font-size="12">SERVER-SIDE FETCHING (async Server Component)</text>

  <rect x="36" y="202" width="110" height="50" fill="#14532d" rx="6"/>
  <text x="91" y="223" text-anchor="middle" fill="#fff" font-size="11">1. Request</text>
  <text x="91" y="239" text-anchor="middle" fill="#bbf7d0" font-size="10">Server receives</text>

  <line x1="146" y1="227" x2="166" y2="227" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="164,223 174,227 164,231" fill="#22c55e"/>

  <rect x="174" y="202" width="120" height="50" fill="#14532d" rx="6"/>
  <text x="234" y="223" text-anchor="middle" fill="#fff" font-size="11">2. Fetch data</text>
  <text x="234" y="239" text-anchor="middle" fill="#bbf7d0" font-size="10">DB/API on server</text>

  <line x1="294" y1="227" x2="314" y2="227" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="312,223 322,227 312,231" fill="#22c55e"/>

  <rect x="322" y="202" width="120" height="50" fill="#14532d" rx="6"/>
  <text x="382" y="223" text-anchor="middle" fill="#fff" font-size="11">3. Render HTML</text>
  <text x="382" y="239" text-anchor="middle" fill="#bbf7d0" font-size="10">With data included</text>

  <line x1="442" y1="227" x2="462" y2="227" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="460,223 470,227 460,231" fill="#22c55e"/>

  <rect x="470" y="202" width="110" height="50" fill="#14532d" rx="6"/>
  <text x="525" y="220" text-anchor="middle" fill="#fff" font-size="11">4. Browser gets</text>
  <text x="525" y="236" text-anchor="middle" fill="#bbf7d0" font-size="10">complete HTML</text>
  <text x="525" y="249" text-anchor="middle" fill="#86efac" font-size="10">✅ No loading state</text>
</svg>
```

---

## 8.3 The `fetch` API in Next.js

Next.js **extends** the native `fetch` with caching options.

### Static Fetch (Cached Forever)

```tsx
// Cached at build time — only fetches once
async function getProducts() {
  const res = await fetch("https://api.example.com/products", {
    cache: "force-cache", // Default behavior
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
```

### Dynamic Fetch (No Cache)

```tsx
// Fresh data on every request
async function getLiveStockPrice(symbol: string) {
  const res = await fetch(`https://api.example.com/stock/${symbol}`, {
    cache: "no-store", // Never cache — always fresh
  });
  return res.json();
}
```

### Revalidated Fetch (ISR-style)

```tsx
// Refresh every 60 seconds
async function getNews() {
  const res = await fetch("https://api.example.com/news", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  return res.json();
}
```

---

## 8.4 Async Server Components

```tsx
// app/blog/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// This entire component runs on the server
async function BlogPage() {
  // Parallel fetching — much faster than sequential
  const [posts, categories] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
  ]);

  return (
    <div>
      <h1>Blog Posts ({posts.length})</h1>
      <ul>
        {posts.slice(0, 5).map((post: Post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogPage;
```

---

## 8.5 Suspense and Streaming

**Suspense** lets you show a **loading placeholder** while a component is fetching data. **Streaming** sends parts of the page as they're ready — users see content faster.

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

// Each section loads independently
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Shows skeleton while StatsSection loads */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      {/* Shows skeleton while RecentOrders loads */}
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}

// Loading skeleton
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-xl" />
      ))}
    </div>
  );
}

// These are async Server Components
async function StatsSection() {
  const stats = await fetchStats(); // Slow DB query
  return <StatsGrid data={stats} />;
}

async function RecentOrders() {
  const orders = await fetchRecentOrders();
  return <OrdersTable data={orders} />;
}
```

---

## 8.6 Caching and Revalidation

```txt
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="700" height="280" fill="#0f1117" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Next.js Cache Workflow</text>

  <rect x="20" y="50" width="120" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="72" text-anchor="middle" fill="#93c5fd" font-weight="bold">Request</text>
  <text x="80" y="88" text-anchor="middle" fill="#bfdbfe" font-size="11">User visits page</text>

  <line x1="140" y1="75" x2="180" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="178,71 188,75 178,79" fill="#475569"/>

  <rect x="188" y="50" width="130" height="50" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="253" y="70" text-anchor="middle" fill="#fcd34d" font-weight="bold">Cache Check</text>
  <text x="253" y="86" text-anchor="middle" fill="#fde68a" font-size="11">Is data cached?</text>

  <!-- Yes path -->
  <line x1="318" y1="65" x2="380" y2="65" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="378,61 388,65 378,69" fill="#22c55e"/>
  <text x="348" y="58" fill="#86efac" font-size="11">✅ HIT</text>

  <rect x="388" y="45" width="130" height="40" fill="#14532d" rx="8"/>
  <text x="453" y="62" text-anchor="middle" fill="#86efac" font-weight="bold">Serve from Cache</text>
  <text x="453" y="76" text-anchor="middle" fill="#bbf7d0" font-size="10">Instant response</text>

  <!-- No path -->
  <line x1="253" y1="100" x2="253" y2="135" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="249,133 253,143 257,133" fill="#ef4444"/>
  <text x="264" y="122" fill="#fca5a5" font-size="11">❌ MISS</text>

  <rect x="150" y="143" width="200" height="50" fill="#450a0a" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="250" y="165" text-anchor="middle" fill="#fca5a5" font-weight="bold">Fetch Fresh Data</text>
  <text x="250" y="181" text-anchor="middle" fill="#fca5a5" font-size="11">Call API/DB</text>

  <!-- Store in cache -->
  <line x1="350" y1="168" x2="390" y2="168" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="388,164 398,168 388,172" fill="#a78bfa"/>

  <rect x="398" y="148" width="150" height="40" fill="#2d1b69" rx="8" stroke="#a78bfa" stroke-width="1"/>
  <text x="473" y="165" text-anchor="middle" fill="#c4b5fd" font-weight="bold">Store in Cache</text>
  <text x="473" y="179" text-anchor="middle" fill="#a78bfa" font-size="10">With TTL / revalidate</text>

  <!-- Revalidation -->
  <rect x="20" y="220" width="660" height="45" fill="#1e293b" rx="8"/>
  <text x="350" y="240" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Revalidation Strategies</text>
  <text x="30" y="256" fill="#64748b" font-size="11">Time-based: next: { revalidate: 60 }   |   On-demand: revalidatePath('/blog')   |   Tag-based: revalidateTag('posts')</text>
</svg>
```

### On-Demand Revalidation

```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json();

  // Validate secret to prevent abuse
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (path) {
    revalidatePath(path); // Revalidate a specific page
  }

  if (tag) {
    revalidateTag(tag); // Revalidate all fetches with this tag
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
```

---

## 8.7 Error Handling in Data Fetching

```tsx
// app/products/page.tsx

async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    const res = await fetch("https://api.example.com/products");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    products = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

Or use Next.js `error.tsx` for automatic error boundaries:

```tsx
// app/products/error.tsx
"use client"; // Error components must be Client Components

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center py-20">
      <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
```

---

## 8.8 Client-Side Fetching with React Query

For complex client-side scenarios, **React Query** (TanStack Query) is the industry standard:

```tsx
// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

```tsx
// components/UserProfile.tsx
"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <div className="skeleton h-20" />;
  if (error) return <p className="text-red-500">Error loading user</p>;

  return <div>{user.name}</div>;
}
```

---

## 8.9 Data Fetching Comparison Tables

### Client vs Server Fetching

| Aspect | Client-Side Fetching | Server-Side Fetching |
|--------|---------------------|---------------------|
| When data loads | After component mounts | Before page sends to browser |
| Loading state needed | ✅ Yes | ❌ No (data is ready) |
| SEO | ❌ Content not in HTML | ✅ Content in HTML |
| API keys exposure | ⚠️ Risky in browser | ✅ Safe on server |
| Real-time updates | ✅ Easy with polling/WS | ❌ Requires revalidation |
| User-specific data | ✅ Ideal | ✅ Also possible |
| Bundle size | Adds fetch code | No impact |

### Cache Strategies

| Strategy | Config | When to Use |
|----------|--------|-------------|
| Static (cached forever) | `cache: "force-cache"` | Marketing pages, docs |
| Time-based revalidation | `next: { revalidate: 60 }` | News, prices, feeds |
| No cache (always fresh) | `cache: "no-store"` | User data, auth pages |
| Tag-based revalidation | `next: { tags: ["posts"] }` | CMS-driven content |

---

## 8.10 Interview Questions — Data Fetching

1. **What is the difference between `cache: "force-cache"` and `cache: "no-store"`?**
2. **How does `next: { revalidate: 60 }` work?**
3. **What is `Suspense` and how does it improve UX?**
4. **What is streaming in Next.js? How does it differ from traditional rendering?**
5. **When would you use client-side fetching over server-side fetching?**
6. **What is `revalidatePath`? When is it useful?**
7. **How do you handle errors in server component data fetching?**
8. **What is the waterfall problem in data fetching? How do you fix it?**
9. **What is `Promise.all` and why is it important for performance?**
10. **What is React Query and when should you prefer it over `fetch`?**

---
