---
title: "Error Handling"
description: "Error handling is the process of anticipating, detecting, and gracefully recovering from problems that occur during application execution. In Next.js, erro"
---

# Section 18: Error Handling

## 18.1 What Is Error Handling?

Error handling is the process of **anticipating, detecting, and gracefully recovering** from problems that occur during application execution. In Next.js, errors can happen at different layers — during rendering, data fetching, API calls, or build time — and each layer needs a distinct strategy.

> **Simple analogy:** Think of error handling like a safety net under a tightrope walker. The goal is to never fall, but when you do, the net catches you and prevents disaster.

---

## 18.2 Why Error Handling Matters

| Reason | Without Error Handling | With Error Handling |
|--------|------------------------|---------------------|
| **User Experience** | White screen, cryptic messages | Friendly fallback UI |
| **Debugging** | Silent failures, no logs | Structured error logs |
| **SEO** | 500 errors hurt ranking | Graceful 404/redirect |
| **Security** | Stack traces leaked to users | Sanitized messages |
| **Reliability** | Entire app crashes | Isolated failure zones |

---

## 18.3 Types of Errors in Next.js

### Runtime Errors
Occur **while the app is running** — unexpected null values, failed network requests, unhandled promise rejections.

### Build Errors
Occur **during `next build`** — TypeScript type errors, missing imports, syntax errors.

### API Errors
Occur inside **Route Handlers** — database failures, third-party API timeouts, invalid payloads.

---

## 18.4 Error Lifecycle Diagram

```txt
<svg viewBox="0 0 780 420" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <!-- Background -->
  <rect width="780" height="420" rx="16" fill="#0f172a"/>

  <!-- Title -->
  <text x="390" y="38" text-anchor="middle" fill="#f1f5f9" font-size="17" font-weight="700">Next.js Error Lifecycle</text>

  <!-- Step boxes -->
  <!-- 1: User Request -->
  <rect x="30" y="70" width="140" height="60" rx="10" fill="#1e40af"/>
  <text x="100" y="97" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">User Request</text>
  <text x="100" y="115" text-anchor="middle" fill="#93c5fd" font-size="11">Browser → Server</text>

  <!-- Arrow 1→2 -->
  <line x1="170" y1="100" x2="210" y2="100" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- 2: Next.js Router -->
  <rect x="210" y="70" width="140" height="60" rx="10" fill="#1e40af"/>
  <text x="280" y="97" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Next.js Router</text>
  <text x="280" y="115" text-anchor="middle" fill="#93c5fd" font-size="11">Segment matching</text>

  <!-- Arrow 2→3 -->
  <line x1="350" y1="100" x2="390" y2="100" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- 3: Server Component -->
  <rect x="390" y="70" width="140" height="60" rx="10" fill="#1e40af"/>
  <text x="460" y="97" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Server Component</text>
  <text x="460" y="115" text-anchor="middle" fill="#93c5fd" font-size="11">Data fetching</text>

  <!-- Arrow 3→4 -->
  <line x1="530" y1="100" x2="570" y2="100" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- 4: Render -->
  <rect x="570" y="70" width="140" height="60" rx="10" fill="#1e40af"/>
  <text x="640" y="97" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Render HTML</text>
  <text x="640" y="115" text-anchor="middle" fill="#93c5fd" font-size="11">Hydration</text>

  <!-- Error paths -->
  <!-- Error from Router -->
  <line x1="280" y1="130" x2="280" y2="200" stroke="#f87171" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrowRed)"/>
  <text x="285" y="170" fill="#fca5a5" font-size="10">not-found()</text>

  <!-- not-found box -->
  <rect x="200" y="200" width="160" height="50" rx="8" fill="#7f1d1d"/>
  <text x="280" y="222" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="600">not-found.tsx</text>
  <text x="280" y="240" text-anchor="middle" fill="#fca5a5" font-size="10">404 Page</text>

  <!-- Error from Server Component -->
  <line x1="460" y1="130" x2="460" y2="200" stroke="#f87171" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrowRed)"/>
  <text x="465" y="170" fill="#fca5a5" font-size="10">throw Error</text>

  <!-- error.tsx box -->
  <rect x="380" y="200" width="160" height="50" rx="8" fill="#7f1d1d"/>
  <text x="460" y="222" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="600">error.tsx</text>
  <text x="460" y="240" text-anchor="middle" fill="#fca5a5" font-size="10">Segment Error Boundary</text>

  <!-- Error from Render (global) -->
  <line x1="640" y1="130" x2="640" y2="200" stroke="#f87171" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrowRed)"/>
  <text x="645" y="170" fill="#fca5a5" font-size="10">Fatal error</text>

  <!-- global-error box -->
  <rect x="560" y="200" width="160" height="50" rx="8" fill="#7f1d1d"/>
  <text x="640" y="222" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="600">global-error.tsx</text>
  <text x="640" y="240" text-anchor="middle" fill="#fca5a5" font-size="10">Root Layout Boundary</text>

  <!-- Loading path -->
  <line x1="460" y1="70" x2="460" y2="40" stroke="#34d399" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrowGreen)"/>
  <rect x="380" y="10" width="160" height="30" rx="6" fill="#065f46"/>
  <text x="460" y="30" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">loading.tsx (Suspense)</text>

  <!-- Recovery arrow -->
  <path d="M280 250 Q280 310 390 310 Q500 310 560 250" stroke="#34d399" stroke-width="2" fill="none" stroke-dasharray="4,3" marker-end="url(#arrowGreen)"/>
  <text x="390" y="330" text-anchor="middle" fill="#6ee7b7" font-size="11">reset() → retry render</text>

  <!-- Error logging box -->
  <rect x="250" y="360" width="280" height="40" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="390" y="376" text-anchor="middle" fill="#94a3b8" font-size="11">Error Logging →</text>
  <text x="390" y="392" text-anchor="middle" fill="#64748b" font-size="10">Sentry / Datadog / Console</text>

  <!-- Arrows from error boxes to logging -->
  <line x1="280" y1="250" x2="310" y2="360" stroke="#475569" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="460" y1="250" x2="420" y2="360" stroke="#475569" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="640" y1="250" x2="510" y2="360" stroke="#475569" stroke-width="1" stroke-dasharray="3,3"/>

  <!-- Arrow markers -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
  </defs>
</svg>
```

---

## 18.5 Special Files for Error Handling

Next.js App Router introduces **convention-based** error files. Place them inside any route segment folder.

| File | Purpose | Scope |
|------|---------|-------|
| `error.tsx` | Catches runtime errors in a segment | Segment-level |
| `global-error.tsx` | Catches root layout errors | Entire app |
| `not-found.tsx` | Renders 404 UI | Segment or global |
| `loading.tsx` | Shows skeleton while data loads | Segment-level |

---

### `error.tsx` — Segment Error Boundary

```tsx
// app/dashboard/error.tsx
'use client'; // REQUIRED — error boundaries must be Client Components

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to external service (e.g., Sentry)
    console.error('[Dashboard Error]', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-red-700 mb-2">
          Something went wrong!
        </h2>
        <p className="text-red-600 text-sm mb-4">
          {error.message || 'An unexpected error occurred.'}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

**Key points about `error.tsx`:**
- Must be a **Client Component** (`'use client'`)
- Receives `error` (the Error object) and `reset` (a function to re-render the segment)
- The `digest` property is a hashed server-side error identifier — safe to show users
- Does **not** catch errors thrown in the same segment's `layout.tsx`

---

### `global-error.tsx` — Root Error Boundary

```tsx
// app/global-error.tsx
'use client';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    // Must include <html> and <body> — replaces the root layout on error
    <html lang="en">
      <body>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'system-ui, sans-serif',
          background: '#0f172a',
          color: '#f1f5f9',
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              ⚠️ Critical Error
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              The application encountered a fatal error.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '0.5rem 1.5rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
```

> ⚠️ `global-error.tsx` must include full `<html>` and `<body>` tags because it completely **replaces the root layout** when triggered.

---

### `not-found.tsx` — 404 Handler

```tsx
// app/not-found.tsx  (global)
// OR app/blog/not-found.tsx  (segment-specific)
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-black text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-700">Page Not Found</h2>
      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
```

**Triggering `notFound()` programmatically:**

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);

  // Triggers not-found.tsx automatically
  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

### `loading.tsx` — Suspense Wrapper

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-4">
      {/* Skeleton loaders */}
      <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
    </div>
  );
}
```

Next.js automatically wraps the page in `<Suspense>` using `loading.tsx` as the fallback.

---

## 18.6 Error Boundary Workflow Diagram

```txt
<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="700" height="360" rx="14" fill="#0f172a"/>
  <text x="350" y="32" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Error Boundary Workflow</text>

  <!-- Render attempt -->
  <rect x="270" y="55" width="160" height="44" rx="8" fill="#1d4ed8"/>
  <text x="350" y="73" text-anchor="middle" fill="#dbeafe" font-size="12" font-weight="600">Component Renders</text>
  <text x="350" y="90" text-anchor="middle" fill="#93c5fd" font-size="10">Normal execution path</text>

  <!-- Diamond: Error? -->
  <polygon points="350,125 420,160 350,195 280,160" fill="#374151" stroke="#6b7280" stroke-width="1.5"/>
  <text x="350" y="156" text-anchor="middle" fill="#f9fafb" font-size="11" font-weight="600">Error</text>
  <text x="350" y="171" text-anchor="middle" fill="#f9fafb" font-size="11" font-weight="600">thrown?</text>

  <!-- Arrow: Yes -->
  <line x1="420" y1="160" x2="510" y2="160" stroke="#f87171" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="465" y="152" text-anchor="middle" fill="#fca5a5" font-size="10">YES</text>

  <!-- Error Boundary catches -->
  <rect x="510" y="136" width="160" height="48" rx="8" fill="#7f1d1d"/>
  <text x="590" y="156" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="600">Error Boundary</text>
  <text x="590" y="173" text-anchor="middle" fill="#fca5a5" font-size="10">Catches the error</text>

  <!-- Render fallback UI -->
  <rect x="510" y="220" width="160" height="48" rx="8" fill="#92400e"/>
  <text x="590" y="240" text-anchor="middle" fill="#fde68a" font-size="12" font-weight="600">Fallback UI</text>
  <text x="590" y="257" text-anchor="middle" fill="#fcd34d" font-size="10">error.tsx renders</text>

  <line x1="590" y1="184" x2="590" y2="220" stroke="#f87171" stroke-width="2" marker-end="url(#arr2)"/>

  <!-- Log error -->
  <rect x="510" y="300" width="160" height="40" rx="8" fill="#1e293b" stroke="#475569"/>
  <text x="590" y="316" text-anchor="middle" fill="#94a3b8" font-size="11">Log to Sentry</text>
  <text x="590" y="332" text-anchor="middle" fill="#64748b" font-size="10">useEffect → logger</text>
  <line x1="590" y1="268" x2="590" y2="300" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Arrow: No -->
  <line x1="350" y1="195" x2="350" y2="240" stroke="#34d399" stroke-width="2" marker-end="url(#arr3)"/>
  <text x="358" y="222" fill="#6ee7b7" font-size="10">NO</text>

  <!-- Success -->
  <rect x="270" y="240" width="160" height="44" rx="8" fill="#065f46"/>
  <text x="350" y="258" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600">Render Success</text>
  <text x="350" y="275" text-anchor="middle" fill="#34d399" font-size="10">UI shown to user</text>

  <!-- reset() path -->
  <path d="M510 245 Q460 245 440 210 Q420 175 420 160" stroke="#a78bfa" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arr4)"/>
  <text x="455" y="228" fill="#c4b5fd" font-size="10">reset()</text>

  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
    <marker id="arr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

---

## 18.7 API Error Handling in Route Handlers

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Input validation schema
const CreateUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Simulate DB call
    const user = await createUser(parsed.data);

    return NextResponse.json({ user }, { status: 201 });

  } catch (error) {
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: 'Database unavailable' },
        { status: 503 }
      );
    }

    console.error('[POST /api/users]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

---

## 18.8 Request Failure Flow Diagram

```txt
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="680" height="300" rx="14" fill="#0f172a"/>
  <text x="340" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">API Request Failure Flow</text>

  <!-- Client -->
  <rect x="20" y="60" width="100" height="50" rx="8" fill="#1e40af"/>
  <text x="70" y="82" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Client</text>
  <text x="70" y="98" text-anchor="middle" fill="#93c5fd" font-size="10">fetch()</text>

  <line x1="120" y1="85" x2="160" y2="85" stroke="#475569" stroke-width="2" marker-end="url(#a1)"/>

  <!-- Route Handler -->
  <rect x="160" y="60" width="120" height="50" rx="8" fill="#1e40af"/>
  <text x="220" y="82" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Route Handler</text>
  <text x="220" y="98" text-anchor="middle" fill="#93c5fd" font-size="10">app/api/…</text>

  <line x1="280" y1="85" x2="320" y2="85" stroke="#475569" stroke-width="2" marker-end="url(#a1)"/>

  <!-- DB / External API -->
  <rect x="320" y="60" width="130" height="50" rx="8" fill="#1e40af"/>
  <text x="385" y="82" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">DB / External API</text>
  <text x="385" y="98" text-anchor="middle" fill="#93c5fd" font-size="10">Third-party call</text>

  <!-- DB fails -->
  <line x1="385" y1="110" x2="385" y2="150" stroke="#f87171" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#a2)"/>
  <text x="390" y="135" fill="#fca5a5" font-size="10">throws Error</text>

  <!-- Catch block -->
  <rect x="305" y="150" width="160" height="50" rx="8" fill="#7f1d1d"/>
  <text x="385" y="170" text-anchor="middle" fill="#fecaca" font-size="11" font-weight="600">catch(error)</text>
  <text x="385" y="188" text-anchor="middle" fill="#fca5a5" font-size="10">Log + format response</text>

  <!-- Response back -->
  <line x1="305" y1="175" x2="160" y2="175" stroke="#f87171" stroke-width="1.5" marker-end="url(#a2)"/>
  <text x="230" y="167" text-anchor="middle" fill="#fca5a5" font-size="10">500 / 503 JSON</text>

  <!-- Client handles -->
  <line x1="160" y1="175" x2="120" y2="175" stroke="#f87171" stroke-width="1.5" marker-end="url(#a2)"/>
  <rect x="20" y="150" width="100" height="50" rx="8" fill="#7f1d1d"/>
  <text x="70" y="171" text-anchor="middle" fill="#fecaca" font-size="11" font-weight="600">Error State</text>
  <text x="70" y="188" text-anchor="middle" fill="#fca5a5" font-size="10">Show error UI</text>

  <!-- Retry -->
  <path d="M70 200 Q70 250 220 250 Q370 250 385 200" stroke="#a78bfa" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#a3)"/>
  <text x="225" y="268" text-anchor="middle" fill="#c4b5fd" font-size="10">Retry with exponential backoff</text>

  <!-- Logger -->
  <rect x="490" y="60" width="160" height="50" rx="8" fill="#1e293b" stroke="#475569"/>
  <text x="570" y="80" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Error Logger</text>
  <text x="570" y="97" text-anchor="middle" fill="#64748b" font-size="10">Sentry / Datadog</text>
  <line x1="465" y1="175" x2="490" y2="85" stroke="#475569" stroke-width="1" stroke-dasharray="3,3"/>

  <defs>
    <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

---

## 18.9 Error Logging

Integrate error logging with external services to monitor production errors:

```tsx
// lib/logger.ts
import * as Sentry from '@sentry/nextjs';

export function logError(error: Error, context?: Record<string, unknown>) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', error.message, context);
    return;
  }

  // Capture in Sentry in production
  Sentry.withScope((scope) => {
    if (context) {
      scope.setExtras(context);
    }
    Sentry.captureException(error);
  });
}
```

```tsx
// Usage in error.tsx
useEffect(() => {
  logError(error, {
    component: 'DashboardPage',
    userId: session?.user?.id,
    digest: error.digest,
  });
}, [error]);
```

---

## 18.10 Best Practices for Error Handling

- ✅ Always add `error.tsx` to data-fetching route segments
- ✅ Use `notFound()` instead of returning null for missing resources
- ✅ Show the `error.digest` for support purposes — never raw stack traces
- ✅ Log errors server-side using `useEffect` in error boundaries
- ✅ Provide actionable fallback UI (retry button, go home link)
- ✅ Validate all API inputs with Zod or similar before processing
- ✅ Use HTTP status codes correctly in route handlers (400, 401, 404, 500)
- ✅ Test error boundaries explicitly in your test suite

---

## 18.11 Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Forgetting `'use client'` in `error.tsx` | Build error | Always add `'use client'` |
| Catching errors silently | No logs, hard to debug | Always log before swallowing |
| Leaking stack traces | Security risk | Show generic message, log internally |
| Not handling loading state | Jarring UX | Always add `loading.tsx` |
| Missing `global-error.tsx` | Root layout errors unhandled | Create it at `app/global-error.tsx` |
| Using try/catch without re-throwing | Error boundaries never fire | Let unexpected errors propagate |

---

## 18.12 Interview Questions — Error Handling

**Beginner:**
1. What is the difference between `error.tsx` and `global-error.tsx`?
2. Why must `error.tsx` be a Client Component?
3. How do you programmatically trigger a 404 page in Next.js?

**Intermediate:**
4. What does the `reset()` function do in an error boundary?
5. How does `loading.tsx` relate to React Suspense?
6. How would you integrate Sentry for error tracking in a Next.js App Router project?

**Advanced:**
7. How does error boundary scoping work across nested layouts in the App Router?
8. What is the `digest` property on an error object, and why is it useful?
9. How would you implement retry logic with exponential backoff for failed API requests?

---
