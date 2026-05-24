---
title: "Advanced Next.js Concepts"
description: "Server Actions are async functions that run on the server but can be called directly from Client Components. They eliminate the need to write separate API"
---

# Section 22: Advanced Next.js Concepts

## 22.1 Server Actions

Server Actions are **async functions that run on the server** but can be called directly from Client Components. They eliminate the need to write separate API routes for form submissions and data mutations.

> **Simple analogy:** Instead of sending a letter to an office and waiting for a reply (API route), Server Actions let you press a button in the lobby that directly updates the filing cabinet inside — no round trip needed.

```tsx
// app/actions/posts.ts
'use server'; // Every export in this file becomes a Server Action

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

// Server Action — callable from any Client Component
export async function createPost(formData: FormData) {
  // 1. Auth check (runs on server)
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  // 2. Extract and validate form data
  const raw = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const parsed = CreatePostSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // 3. DB mutation
  await prisma.post.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
    },
  });

  // 4. Invalidate cached page data
  revalidatePath('/posts');

  // 5. Redirect (runs after response)
  redirect('/posts');
}

// Server Action with return value (for useFormState)
export async function deletePost(postId: string): Promise<{ success: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, error: 'Unauthorized' };

  try {
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath('/posts');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete post' };
  }
}
```

**Using Server Actions in a form:**

```tsx
// app/posts/new/page.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions/posts';

// Submit button — shows pending state automatically
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  );
}

const initialState = { error: null };

export default function NewPostPage() {
  const [state, formAction] = useFormState(createPost, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required className="border rounded p-2 w-full" />
        {state?.error?.title && (
          <p className="text-red-500 text-sm">{state.error.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={6} className="border rounded p-2 w-full" />
        {state?.error?.content && (
          <p className="text-red-500 text-sm">{state.error.content[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
```

---

## 22.2 Server Actions Flow Diagram

```txt
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="360" rx="14" fill="#0f172a"/>
  <text x="360" y="30" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Server Actions Workflow</text>

  <!-- Client side background -->
  <rect x="15" y="48" width="320" height="290" rx="10" fill="#0c1a3a" stroke="#1e40af" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="175" y="67" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="600">CLIENT BOUNDARY</text>

  <!-- Server side background -->
  <rect x="385" y="48" width="320" height="290" rx="10" fill="#0c2918" stroke="#065f46" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="545" y="67" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">SERVER BOUNDARY</text>

  <!-- Client: User interacts -->
  <rect x="35" y="85" width="150" height="50" rx="8" fill="#1e40af"/>
  <text x="110" y="106" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">User Interaction</text>
  <text x="110" y="122" text-anchor="middle" fill="#93c5fd" font-size="10">Form submit / button click</text>

  <!-- Client: Form state -->
  <rect x="35" y="165" width="150" height="50" rx="8" fill="#1e40af"/>
  <text x="110" y="186" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">useFormState</text>
  <text x="110" y="202" text-anchor="middle" fill="#93c5fd" font-size="10">Pending / result state</text>

  <!-- Client: Optimistic UI -->
  <rect x="35" y="250" width="150" height="50" rx="8" fill="#1e3a5f"/>
  <text x="110" y="271" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Optimistic Update</text>
  <text x="110" y="287" text-anchor="middle" fill="#93c5fd" font-size="10">useOptimistic()</text>

  <!-- Arrows between client items -->
  <line x1="110" y1="135" x2="110" y2="165" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#sa1)"/>
  <line x1="110" y1="215" x2="110" y2="250" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#sa1)"/>

  <!-- Client → Server: Action call -->
  <line x1="185" y1="110" x2="400" y2="110" stroke="#a78bfa" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#sa3)"/>
  <text x="292" y="105" text-anchor="middle" fill="#c4b5fd" font-size="9">action(formData)</text>

  <!-- Server: Auth check -->
  <rect x="410" y="85" width="150" height="50" rx="8" fill="#065f46"/>
  <text x="485" y="106" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Auth + Validate</text>
  <text x="485" y="122" text-anchor="middle" fill="#34d399" font-size="10">Session · Zod schema</text>

  <!-- Server: DB mutation -->
  <rect x="410" y="165" width="150" height="50" rx="8" fill="#065f46"/>
  <text x="485" y="186" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">DB Mutation</text>
  <text x="485" y="202" text-anchor="middle" fill="#34d399" font-size="10">Prisma · SQL · ORM</text>

  <!-- Server: Revalidate -->
  <rect x="410" y="250" width="150" height="50" rx="8" fill="#065f46"/>
  <text x="485" y="271" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">revalidatePath()</text>
  <text x="485" y="287" text-anchor="middle" fill="#34d399" font-size="10">Purge cached data</text>

  <!-- Arrows between server items -->
  <line x1="485" y1="135" x2="485" y2="165" stroke="#10b981" stroke-width="1.5" marker-end="url(#sa2)"/>
  <line x1="485" y1="215" x2="485" y2="250" stroke="#10b981" stroke-width="1.5" marker-end="url(#sa2)"/>

  <!-- Server → Client: Result -->
  <line x1="410" y1="185" x2="185" y2="185" stroke="#a78bfa" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#sa3)"/>
  <text x="297" y="180" text-anchor="middle" fill="#c4b5fd" font-size="9">{ error } | redirect()</text>

  <defs>
    <marker id="sa1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="sa2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#10b981"/>
    </marker>
    <marker id="sa3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

---

## 22.3 Server Actions vs API Routes

| Aspect | Server Actions | API Routes |
|--------|---------------|------------|
| **Location** | `'use server'` in any file | `app/api/route.ts` |
| **Calling from client** | Direct function call | `fetch('/api/...')` |
| **Form integration** | Native `action={fn}` | Needs `onSubmit` + fetch |
| **Typesafety** | End-to-end with TypeScript | Manual type casting |
| **Revalidation** | `revalidatePath()` built-in | Manual `res.revalidate()` |
| **Boilerplate** | Minimal | More verbose |
| **External access** | ❌ Cannot be called externally | ✅ Public HTTP endpoint |
| **Best for** | Form mutations, internal data | Public APIs, webhooks |

---

## 22.4 Streaming & React Suspense

Streaming allows Next.js to **send HTML to the browser progressively** — the page shell renders immediately while slow data loads in the background. This dramatically improves Time-to-First-Byte (TTFB) and perceived performance.

```tsx
// app/dashboard/page.tsx — Streaming with Suspense
import { Suspense } from 'react';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentOrders } from '@/components/RecentOrders';
import { UserActivity } from '@/components/UserActivity';
import { StatsLoading, OrdersLoading, ActivityLoading } from '@/components/Skeletons';

// Each component fetches its own data independently
export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Stats load independently — don't block the page */}
      <Suspense fallback={<StatsLoading />}>
        <DashboardStats />  {/* Fetches from /api/stats */}
      </Suspense>

      <div className="grid grid-cols-2 gap-6">
        {/* Orders and activity load in parallel */}
        <Suspense fallback={<OrdersLoading />}>
          <RecentOrders />  {/* Fetches from /api/orders */}
        </Suspense>

        <Suspense fallback={<ActivityLoading />}>
          <UserActivity />  {/* Fetches from /api/activity */}
        </Suspense>
      </div>
    </div>
  );
}
```

```tsx
// app/components/DashboardStats.tsx — Server Component with async data
async function getDashboardStats() {
  // This runs on the server — can be slow
  const [revenue, users, orders] = await Promise.all([
    fetch('https://api.example.com/revenue').then(r => r.json()),
    fetch('https://api.example.com/users/count').then(r => r.json()),
    fetch('https://api.example.com/orders/today').then(r => r.json()),
  ]);
  return { revenue, users, orders };
}

export async function DashboardStats() {
  const stats = await getDashboardStats(); // Suspense catches the promise

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Revenue" value={stats.revenue} />
      <StatCard label="Users" value={stats.users} />
      <StatCard label="Orders" value={stats.orders} />
    </div>
  );
}
```

---

## 22.5 Streaming Lifecycle Diagram

```txt
<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="380" rx="14" fill="#0f172a"/>
  <text x="360" y="28" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Streaming Rendering Lifecycle</text>

  <!-- Timeline axis -->
  <line x1="60" y1="330" x2="680" y2="330" stroke="#475569" stroke-width="2"/>
  <text x="370" y="350" text-anchor="middle" fill="#64748b" font-size="10">Time →</text>

  <!-- T0 markers -->
  <line x1="80" y1="320" x2="80" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="80" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=0</text>
  <line x1="200" y1="320" x2="200" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="200" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=50ms</text>
  <line x1="380" y1="320" x2="380" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="380" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=400ms</text>
  <line x1="580" y1="320" x2="580" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="580" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=1200ms</text>

  <!-- Row labels -->
  <text x="55" y="80" text-anchor="end" fill="#94a3b8" font-size="10">Shell</text>
  <text x="55" y="140" text-anchor="end" fill="#94a3b8" font-size="10">Stats</text>
  <text x="55" y="200" text-anchor="end" fill="#94a3b8" font-size="10">Orders</text>
  <text x="55" y="260" text-anchor="end" fill="#94a3b8" font-size="10">Activity</text>

  <!-- Row dividers -->
  <line x1="60" y1="100" x2="680" y2="100" stroke="#1e293b" stroke-width="1"/>
  <line x1="60" y1="160" x2="680" y2="160" stroke="#1e293b" stroke-width="1"/>
  <line x1="60" y1="220" x2="680" y2="220" stroke="#1e293b" stroke-width="1"/>
  <line x1="60" y1="280" x2="680" y2="280" stroke="#1e293b" stroke-width="1"/>

  <!-- Shell: renders almost immediately -->
  <rect x="80" y="58" width="120" height="30" rx="6" fill="#065f46"/>
  <text x="140" y="77" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="600">HTML Shell</text>

  <!-- Stats: skeleton then data -->
  <rect x="80" y="118" width="220" height="30" rx="6" fill="#374151" stroke="#4b5563" stroke-dasharray="4,2"/>
  <text x="190" y="137" text-anchor="middle" fill="#9ca3af" font-size="10">⏳ Skeleton (loading.tsx)</text>
  <rect x="310" y="118" width="140" height="30" rx="6" fill="#1e40af"/>
  <text x="380" y="137" text-anchor="middle" fill="#bfdbfe" font-size="10" font-weight="600">✅ Stats data</text>
  <line x1="310" y1="133" x2="310" y2="133" stroke="#a78bfa" stroke-width="1"/>
  <text x="312" y="112" fill="#c4b5fd" font-size="9">Streamed in</text>

  <!-- Orders: skeleton then data (slower) -->
  <rect x="80" y="178" width="380" height="30" rx="6" fill="#374151" stroke="#4b5563" stroke-dasharray="4,2"/>
  <text x="270" y="197" text-anchor="middle" fill="#9ca3af" font-size="10">⏳ Skeleton</text>
  <rect x="470" y="178" width="130" height="30" rx="6" fill="#1e40af"/>
  <text x="535" y="197" text-anchor="middle" fill="#bfdbfe" font-size="10" font-weight="600">✅ Orders</text>

  <!-- Activity: skeleton then data (medium) -->
  <rect x="80" y="238" width="300" height="30" rx="6" fill="#374151" stroke="#4b5563" stroke-dasharray="4,2"/>
  <text x="230" y="257" text-anchor="middle" fill="#9ca3af" font-size="10">⏳ Skeleton</text>
  <rect x="390" y="238" width="150" height="30" rx="6" fill="#1e40af"/>
  <text x="465" y="257" text-anchor="middle" fill="#bfdbfe" font-size="10" font-weight="600">✅ Activity</text>

  <!-- Without streaming label -->
  <rect x="80" y="45" width="530" height="12" rx="3" fill="#7f1d1d" opacity="0.3"/>
  <text x="345" y="55" text-anchor="middle" fill="#fca5a5" font-size="9">Without streaming: entire page waits until T=1200ms</text>

  <!-- Vertical line: first paint -->
  <line x1="200" y1="48" x2="200" y2="320" stroke="#34d399" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="202" y="44" fill="#34d399" font-size="9">First Paint</text>
</svg>
```

---

## 22.6 Edge Runtime

The Edge Runtime runs your code **as close to the user as possible** using a lightweight V8 isolate (not full Node.js), distributed globally via CDN edge nodes.

```tsx
// app/api/geo/route.ts — Edge Runtime example
export const runtime = 'edge'; // Enable Edge Runtime

export async function GET(request: Request) {
  // Access geo data from edge (Vercel only)
  const { geo } = request as any;

  return Response.json({
    country: geo?.country ?? 'Unknown',
    city: geo?.city ?? 'Unknown',
    latency: 'sub-10ms', // Response from nearest edge node
  });
}
```

```tsx
// middleware.ts — Middleware ALWAYS runs on Edge Runtime
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country;

  // Redirect based on geography — executed at the edge
  if (country === 'CN') {
    return NextResponse.redirect(new URL('/cn', request.url));
  }

  return NextResponse.next();
}
```

---

## 22.7 Edge vs Node.js Runtime Comparison

| Feature | Edge Runtime | Node.js Runtime |
|---------|-------------|-----------------|
| **Location** | CDN edge nodes globally | Single server region |
| **Cold start** | ~0ms (warm always) | 100ms–500ms |
| **Latency** | Sub-10ms globally | 50–200ms |
| **Memory limit** | 128MB | No practical limit |
| **Node.js APIs** | ❌ Not available | ✅ Full access |
| **File system** | ❌ No access | ✅ Full access |
| **npm packages** | Limited (no native bindings) | All packages |
| **Database direct** | ❌ (use HTTP clients) | ✅ Direct connections |
| **Best for** | Auth, redirects, A/B tests | Complex logic, DB access |

---

## 22.8 Parallel Routes

Parallel Routes allow you to render **multiple pages simultaneously in the same layout** — perfect for dashboards, split views, or modals.

```
app/
  layout.tsx           ← Contains @team and @analytics slots
  @team/
    page.tsx           ← Renders in team slot
  @analytics/
    page.tsx           ← Renders in analytics slot
  page.tsx
```

```tsx
// app/layout.tsx — Root layout with parallel route slots
interface LayoutProps {
  children: React.ReactNode;
  team: React.ReactNode;       // @team slot
  analytics: React.ReactNode;  // @analytics slot
}

export default function Layout({ children, team, analytics }: LayoutProps) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6">
      <div className="main-content">
        {children}
      </div>
      <aside className="sidebar space-y-6">
        {team}       {/* Renders app/@team/page.tsx */}
        {analytics}  {/* Renders app/@analytics/page.tsx */}
      </aside>
    </div>
  );
}
```

---

## 22.9 Intercepting Routes

Intercepting Routes let you display content in a **modal or overlay** while keeping the original URL and allowing direct navigation to the full page.

```
app/
  photos/
    [id]/
      page.tsx         ← Full photo page (direct navigation)
  @modal/
    (.)photos/[id]/    ← (.) intercepts same-level route
      page.tsx         ← Photo shown in modal
  layout.tsx           ← Contains the @modal slot
```

```tsx
// app/@modal/(.)photos/[id]/page.tsx — Intercepting modal
import { PhotoModal } from '@/components/PhotoModal';

export default function PhotoModalPage({ params }: { params: { id: string } }) {
  return <PhotoModal photoId={params.id} />;
}
```

```tsx
// app/photos/[id]/page.tsx — Full page (when accessed directly)
import { PhotoDetail } from '@/components/PhotoDetail';

export default function PhotoPage({ params }: { params: { id: string } }) {
  return <PhotoDetail photoId={params.id} />;
}
```

**Interception conventions:**
| Convention | Intercepts |
|------------|-----------|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | From root `app/` |

---

## 22.10 Route Hierarchy Diagram

```txt
<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="400" rx="14" fill="#0f172a"/>
  <text x="360" y="30" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Next.js App Router Hierarchy</text>

  <!-- Root app -->
  <rect x="290" y="50" width="140" height="50" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="360" y="70" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="700">app/</text>
  <text x="360" y="87" text-anchor="middle" fill="#93c5fd" font-size="10">layout.tsx · page.tsx</text>

  <!-- Branches from root -->
  <line x1="290" y1="75" x2="160" y2="130" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="360" y1="100" x2="360" y2="130" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="430" y1="75" x2="560" y2="130" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>

  <!-- dashboard segment -->
  <rect x="60" y="130" width="200" height="50" rx="8" fill="#1e40af"/>
  <text x="160" y="150" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">dashboard/</text>
  <text x="160" y="167" text-anchor="middle" fill="#93c5fd" font-size="9">layout · page · error · loading</text>

  <!-- parallel routes -->
  <rect x="270" y="130" width="180" height="50" rx="8" fill="#312e81"/>
  <text x="360" y="150" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="700">@slot / Parallel</text>
  <text x="360" y="167" text-anchor="middle" fill="#a78bfa" font-size="9">@team · @analytics · @modal</text>

  <!-- blog segment -->
  <rect x="480" y="130" width="200" height="50" rx="8" fill="#1e40af"/>
  <text x="580" y="150" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">blog/</text>
  <text x="580" y="167" text-anchor="middle" fill="#93c5fd" font-size="9">layout · page</text>

  <!-- dashboard children -->
  <line x1="120" y1="180" x2="90" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="200" y1="180" x2="230" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>

  <!-- settings -->
  <rect x="30" y="230" width="120" height="45" rx="8" fill="#1e3a5f"/>
  <text x="90" y="249" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">settings/</text>
  <text x="90" y="263" text-anchor="middle" fill="#93c5fd" font-size="9">page.tsx</text>

  <!-- analytics -->
  <rect x="175" y="230" width="120" height="45" rx="8" fill="#1e3a5f"/>
  <text x="235" y="249" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">analytics/</text>
  <text x="235" y="263" text-anchor="middle" fill="#93c5fd" font-size="9">page.tsx</text>

  <!-- blog children -->
  <line x1="550" y1="180" x2="520" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="610" y1="180" x2="640" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>

  <!-- [slug] -->
  <rect x="455" y="230" width="120" height="45" rx="8" fill="#065f46"/>
  <text x="515" y="249" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">[slug]/</text>
  <text x="515" y="263" text-anchor="middle" fill="#34d399" font-size="9">Dynamic segment</text>

  <!-- intercepting -->
  <rect x="600" y="230" width="100" height="45" rx="8" fill="#92400e"/>
  <text x="650" y="249" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="600">(.)photos/</text>
  <text x="650" y="263" text-anchor="middle" fill="#fcd34d" font-size="9">Intercept</text>

  <!-- Legend -->
  <rect x="30" y="315" width="660" height="70" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="360" y="333" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="700">Legend</text>
  <rect x="50" y="340" width="14" height="14" rx="3" fill="#1e40af"/>
  <text x="70" y="352" fill="#94a3b8" font-size="10">Route Segment</text>
  <rect x="180" y="340" width="14" height="14" rx="3" fill="#312e81"/>
  <text x="200" y="352" fill="#94a3b8" font-size="10">Parallel Route (@slot)</text>
  <rect x="360" y="340" width="14" height="14" rx="3" fill="#065f46"/>
  <text x="380" y="352" fill="#94a3b8" font-size="10">Dynamic Route ([param])</text>
  <rect x="540" y="340" width="14" height="14" rx="3" fill="#92400e"/>
  <text x="560" y="352" fill="#94a3b8" font-size="10">Intercepting Route (.)</text>

  <defs>
    <marker id="rh1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

## 22.11 Caching Strategies

Next.js has a multi-layered caching system. Understanding it is critical for performance.

| Cache Layer | What It Caches | Duration | Invalidation |
|-------------|---------------|----------|-------------|
| **Request Memoization** | Duplicate `fetch()` calls in one render | Per request | Automatic |
| **Data Cache** | `fetch()` response data | Persistent | `revalidatePath()`, `revalidateTag()` |
| **Full Route Cache** | Rendered HTML + RSC payload | Persistent | Rebuild / revalidation |
| **Router Cache** | Client-side route segments | 30s–5min | Manual `router.refresh()` |

```tsx
// lib/data/posts.ts — Caching examples

// 1. Static cache — cached until revalidation (default)
export async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] }, // Tag for targeted revalidation
  });
  return res.json();
}

// 2. Time-based revalidation (ISR behavior)
export async function getPopularPosts() {
  const res = await fetch('https://api.example.com/posts/popular', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// 3. No cache — always fresh (dynamic)
export async function getLivePrices() {
  const res = await fetch('https://api.example.com/prices', {
    cache: 'no-store', // Never cache
  });
  return res.json();
}

// 4. Tag-based revalidation in a Server Action
import { revalidateTag } from 'next/cache';

export async function publishPost(id: string) {
  'use server';
  await prisma.post.update({ where: { id }, data: { published: true } });
  revalidateTag('posts'); // Invalidates all fetches tagged with 'posts'
}
```

---

## 22.12 Static vs Dynamic Rendering

| Aspect | Static Rendering | Dynamic Rendering |
|--------|-----------------|-------------------|
| **When** | At build time | Per request |
| **Speed** | ⚡ Fastest (pre-built HTML) | Slower (real-time) |
| **Data** | Fixed at build | Always fresh |
| **Use case** | Blog, marketing, docs | Dashboard, user-specific pages |
| **CDN cacheable** | ✅ Yes | ❌ No |
| **Personalization** | ❌ None | ✅ Full |
| **Triggered by** | Default behavior | `cookies()`, `headers()`, `searchParams`, `no-store` |

```tsx
// app/blog/[slug]/page.tsx

// generateStaticParams → Static (pre-rendered at build time)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// If a slug isn't pre-rendered, generate it dynamically
export const dynamicParams = true; // default: true

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
```

```tsx
// app/dashboard/page.tsx — Forces dynamic rendering
import { cookies } from 'next/headers'; // Opting into dynamic rendering

export default async function Dashboard() {
  const sessionCookie = cookies().get('session'); // Makes page dynamic
  const userData = await getUserData(sessionCookie?.value);

  return <DashboardView user={userData} />;
}
```

---

## 22.13 Rendering Workflow Diagram

```txt
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="360" rx="14" fill="#0f172a"/>
  <text x="360" y="28" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Next.js Rendering Decision Flow</text>

  <!-- Start -->
  <rect x="290" y="50" width="140" height="45" rx="8" fill="#1e40af"/>
  <text x="360" y="70" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Page Request</text>
  <text x="360" y="86" text-anchor="middle" fill="#93c5fd" font-size="10">User visits URL</text>

  <line x1="360" y1="95" x2="360" y2="120" stroke="#475569" stroke-width="1.5" marker-end="url(#rd1)"/>

  <!-- Decision: Static params? -->
  <polygon points="360,120 460,150 360,180 260,150" fill="#374151" stroke="#6b7280"/>
  <text x="360" y="147" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">Uses dynamic</text>
  <text x="360" y="162" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">functions?</text>

  <!-- No → Static -->
  <line x1="260" y1="150" x2="150" y2="150" stroke="#34d399" stroke-width="1.5" marker-end="url(#rd2)"/>
  <text x="205" y="143" text-anchor="middle" fill="#6ee7b7" font-size="10">NO</text>
  <rect x="30" y="125" width="120" height="50" rx="8" fill="#065f46"/>
  <text x="90" y="145" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Static Cache</text>
  <text x="90" y="162" text-anchor="middle" fill="#34d399" font-size="9">Pre-built HTML</text>

  <!-- Yes → Dynamic -->
  <line x1="460" y1="150" x2="570" y2="150" stroke="#f87171" stroke-width="1.5" marker-end="url(#rd3)"/>
  <text x="515" y="143" text-anchor="middle" fill="#fca5a5" font-size="10">YES</text>
  <rect x="570" y="125" width="120" height="50" rx="8" fill="#1e40af"/>
  <text x="630" y="145" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Dynamic Render</text>
  <text x="630" y="162" text-anchor="middle" fill="#93c5fd" font-size="9">Per-request</text>

  <!-- Static → CDN -->
  <line x1="90" y1="175" x2="90" y2="215" stroke="#34d399" stroke-width="1.5" marker-end="url(#rd2)"/>
  <rect x="30" y="215" width="120" height="50" rx="8" fill="#065f46"/>
  <text x="90" y="236" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Serve from CDN</text>
  <text x="90" y="252" text-anchor="middle" fill="#34d399" font-size="9">~1ms response</text>

  <!-- Dynamic → Server -->
  <line x1="630" y1="175" x2="630" y2="215" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#rd1)"/>
  <rect x="570" y="215" width="120" height="50" rx="8" fill="#1e3a5f"/>
  <text x="630" y="236" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Server Render</text>
  <text x="630" y="252" text-anchor="middle" fill="#93c5fd" font-size="9">Auth + DB access</text>

  <!-- Streaming check -->
  <line x1="360" y1="180" x2="360" y2="210" stroke="#475569" stroke-width="1.5" marker-end="url(#rd1)"/>
  <rect x="280" y="210" width="160" height="50" rx="8" fill="#312e81"/>
  <text x="360" y="230" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">Suspense?</text>
  <text x="360" y="246" text-anchor="middle" fill="#a78bfa" font-size="9">Streaming enabled</text>

  <!-- Stream → Progressive HTML -->
  <line x1="360" y1="260" x2="360" y2="295" stroke="#a78bfa" stroke-width="1.5" marker-end="url(#rd4)"/>
  <rect x="250" y="295" width="220" height="45" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="360" y="314" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Progressive HTML Stream</text>
  <text x="360" y="330" text-anchor="middle" fill="#64748b" font-size="9">Shell → Components as data resolves</text>

  <defs>
    <marker id="rd1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="rd2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
    <marker id="rd3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="rd4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

---

## 22.14 Practical Examples

### Dashboard Application with Streaming

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { RevenueChart } from '@/components/RevenueChart';
import { LatestInvoices } from '@/components/LatestInvoices';
import { CardSkeleton, ChartSkeleton } from '@/components/Skeletons';
import { fetchCardData } from '@/lib/data';

export default async function DashboardPage() {
  // Fast data — loaded immediately
  const cardData = await fetchCardData();

  return (
    <main>
      {/* Static data — renders immediately */}
      <SummaryCards data={cardData} />

      {/* Slow chart — streamed in with skeleton */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      {/* Latest invoices — streamed independently */}
      <Suspense fallback={<CardSkeleton />}>
        <LatestInvoices />
      </Suspense>
    </main>
  );
}
```

### Real-time Chat with Server Actions & Optimistic UI

```tsx
// app/chat/[roomId]/page.tsx
'use client';

import { useOptimistic, useRef } from 'react';
import { sendMessage } from '@/app/actions/chat';

interface Message {
  id: string;
  text: string;
  author: string;
  pending?: boolean;
}

export default function ChatRoom({
  roomId,
  initialMessages,
  userId,
}: {
  roomId: string;
  initialMessages: Message[];
  userId: string;
}) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(
    initialMessages,
    (state, newText) => [
      ...state,
      { id: crypto.randomUUID(), text: newText, author: userId, pending: true },
    ]
  );

  const ref = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const text = formData.get('message') as string;
    ref.current?.reset();

    // Optimistically add message immediately
    addOptimisticMessage(text);

    // Then send to server
    await sendMessage({ roomId, text, userId });
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {optimisticMessages.map(msg => (
          <div
            key={msg.id}
            className={`p-2 rounded ${msg.pending ? 'opacity-50' : ''}`}
          >
            <span className="font-bold">{msg.author}:</span> {msg.text}
            {msg.pending && <span className="text-xs ml-2 text-gray-400">sending...</span>}
          </div>
        ))}
      </div>

      <form ref={ref} action={handleSubmit} className="p-4 flex gap-2">
        <input
          name="message"
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}
```

### E-commerce with Parallel Routes + Intercepting

```tsx
// app/shop/@cart/default.tsx — Cart slot (always visible)
import { getCart } from '@/lib/cart';

export default async function CartSidebar() {
  const cart = await getCart();

  return (
    <div className="cart-sidebar">
      <h3>Cart ({cart.items.length})</h3>
      {cart.items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <p className="font-bold">Total: ${cart.total}</p>
    </div>
  );
}
```

```tsx
// app/shop/@modal/(.)product/[id]/page.tsx — Quick-view modal
import { Modal } from '@/components/Modal';
import { getProduct } from '@/lib/products';

export default async function QuickView({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <Modal>
      <div className="p-6">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </Modal>
  );
}
```

---

## 22.15 Best Practices for Advanced Concepts

- ✅ Use Server Actions for all form mutations — eliminates boilerplate API routes
- ✅ Always validate Server Action inputs on the server (Zod) — client bypass is trivial
- ✅ Add `useFormStatus` to submit buttons to prevent double-submission
- ✅ Use `useOptimistic` for instant UI feedback on chat/list operations
- ✅ Tag fetches with `next: { tags: ['...'] }` for precise cache invalidation
- ✅ Wrap slow data-fetching components in `<Suspense>` for streaming
- ✅ Choose `cache: 'no-store'` only when data truly must be real-time
- ✅ Use Edge Runtime for auth/redirects, Node.js for heavy DB/file operations
- ✅ Use Parallel Routes for dashboards requiring independent data fetches
- ✅ Test static/dynamic rendering behavior with `next build && next start`

---

## 22.16 Common Mistakes in Advanced Concepts

| Mistake | Problem | Fix |
|---------|---------|-----|
| Marking Server Actions `'use client'` | Breaks — they must be `'use server'` | Move to separate `.ts` file with `'use server'` |
| Fetching same data in multiple components | N+1 requests | Use request memoization (same fetch URL) |
| No `Suspense` around slow components | Entire page waits | Wrap each slow component individually |
| Using `cache: 'no-store'` everywhere | Kills performance | Use it only for real-time data |
| Not calling `revalidatePath` after mutation | Stale UI after action | Always revalidate after Server Action |
| Mixing Edge + Node packages | Runtime crash | Check compatibility before setting `export const runtime = 'edge'` |
| No `default.tsx` in parallel route slots | 404 on direct navigation | Add `default.tsx` to every slot |

---

## 22.17 Interview Questions — Advanced Concepts

**Beginner:**
1. What is a Server Action in Next.js and how is it different from an API route?
2. What does `'use server'` mean at the top of a file?
3. How does `loading.tsx` use React Suspense under the hood?

**Intermediate:**
4. How do you invalidate the Next.js data cache after a Server Action mutation?
5. What is the difference between `revalidatePath` and `revalidateTag`?
6. When would you choose Edge Runtime over Node.js Runtime?

**Advanced:**
7. How does Next.js streaming work at the HTTP protocol level (transfer-encoding: chunked)?
8. Explain request memoization in Next.js — when does it apply and what are its limits?
9. Design the routing structure for a photo app where clicking a photo shows a modal, but direct URL access shows a full page.

---
