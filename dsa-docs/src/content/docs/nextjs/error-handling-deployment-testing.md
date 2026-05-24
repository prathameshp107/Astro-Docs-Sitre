---
title: "Next.js Error Handling, Deployment & Testing"
description: "Production-focused Next.js guide covering error handling, deployment strategies, CI/CD, hosting, testing patterns, and interview preparation."
---

# Next.js Complete Guide â€” Part 4B
## Sections 18â€“20: Error Handling Â· Deployment Â· Testing

> **Series:** Next.js App Router (v14+) Â· TypeScript Â· Production-Ready
> **Level:** Beginner-friendly with production-level depth

---

## Table of Contents

- [Section 18: Error Handling](#section-18-error-handling)
- [Section 19: Deployment](#section-19-deployment)
- [Section 20: Testing](#section-20-testing)
- [Summary & Key Takeaways](#summary)
- [Practice Exercises](#practice-exercises)
- [Mini Project Ideas](#mini-project-ideas)
- [Interview Preparation](#interview-preparation)

---

# Section 18: Error Handling

## 18.1 What Is Error Handling?

Error handling is the process of **anticipating, detecting, and gracefully recovering** from problems that occur during application execution. In Next.js, errors can happen at different layers â€” during rendering, data fetching, API calls, or build time â€” and each layer needs a distinct strategy.

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
Occur **while the app is running** â€” unexpected null values, failed network requests, unhandled promise rejections.

### Build Errors
Occur **during `next build`** â€” TypeScript type errors, missing imports, syntax errors.

### API Errors
Occur inside **Route Handlers** â€” database failures, third-party API timeouts, invalid payloads.

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
  <text x="100" y="115" text-anchor="middle" fill="#93c5fd" font-size="11">Browser â†’ Server</text>

  <!-- Arrow 1â†’2 -->
  <line x1="170" y1="100" x2="210" y2="100" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- 2: Next.js Router -->
  <rect x="210" y="70" width="140" height="60" rx="10" fill="#1e40af"/>
  <text x="280" y="97" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Next.js Router</text>
  <text x="280" y="115" text-anchor="middle" fill="#93c5fd" font-size="11">Segment matching</text>

  <!-- Arrow 2â†’3 -->
  <line x1="350" y1="100" x2="390" y2="100" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- 3: Server Component -->
  <rect x="390" y="70" width="140" height="60" rx="10" fill="#1e40af"/>
  <text x="460" y="97" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Server Component</text>
  <text x="460" y="115" text-anchor="middle" fill="#93c5fd" font-size="11">Data fetching</text>

  <!-- Arrow 3â†’4 -->
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
  <text x="390" y="330" text-anchor="middle" fill="#6ee7b7" font-size="11">reset() â†’ retry render</text>

  <!-- Error logging box -->
  <rect x="250" y="360" width="280" height="40" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="390" y="376" text-anchor="middle" fill="#94a3b8" font-size="11">Error Logging â†’</text>
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

### `error.tsx` â€” Segment Error Boundary

```tsx
// app/dashboard/error.tsx
'use client'; // REQUIRED â€” error boundaries must be Client Components

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
- The `digest` property is a hashed server-side error identifier â€” safe to show users
- Does **not** catch errors thrown in the same segment's `layout.tsx`

---

### `global-error.tsx` â€” Root Error Boundary

```tsx
// app/global-error.tsx
'use client';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    // Must include <html> and <body> â€” replaces the root layout on error
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
              âš ï¸ Critical Error
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

> âš ï¸ `global-error.tsx` must include full `<html>` and `<body>` tags because it completely **replaces the root layout** when triggered.

---

### `not-found.tsx` â€” 404 Handler

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

### `loading.tsx` â€” Suspense Wrapper

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
  <text x="590" y="332" text-anchor="middle" fill="#64748b" font-size="10">useEffect â†’ logger</text>
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
  <text x="220" y="98" text-anchor="middle" fill="#93c5fd" font-size="10">app/api/â€¦</text>

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

- âœ… Always add `error.tsx` to data-fetching route segments
- âœ… Use `notFound()` instead of returning null for missing resources
- âœ… Show the `error.digest` for support purposes â€” never raw stack traces
- âœ… Log errors server-side using `useEffect` in error boundaries
- âœ… Provide actionable fallback UI (retry button, go home link)
- âœ… Validate all API inputs with Zod or similar before processing
- âœ… Use HTTP status codes correctly in route handlers (400, 401, 404, 500)
- âœ… Test error boundaries explicitly in your test suite

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

## 18.12 Interview Questions â€” Error Handling

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

# Section 19: Deployment

## 19.1 What Is Deployment?

Deployment is the process of **taking your application from development to production** â€” making it accessible to real users on the internet. It involves building, configuring, hosting, and maintaining your Next.js application on a server or cloud platform.

> **Simple analogy:** Writing code is like baking a cake. Deployment is delivering it to the customer's table â€” packaged, fresh, and ready to be enjoyed.

---

## 19.2 Why Deployment Matters

| Aspect | Description |
|--------|-------------|
| **Availability** | Makes the app accessible 24/7 globally |
| **Performance** | Production builds are optimized (minified, tree-shaken) |
| **Security** | Enforces HTTPS, environment variable isolation |
| **Scalability** | Real hosting can scale to millions of users |
| **Monitoring** | Production environments support error tracking and analytics |

---

## 19.3 Deployment Lifecycle

```txt
<svg viewBox="0 0 740 130" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="740" height="130" rx="12" fill="#0f172a"/>
  <text x="370" y="24" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">Next.js Deployment Lifecycle</text>

  <!-- Stages -->
  <!-- 1 -->
  <rect x="20" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="70" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Code</text>
  <text x="70" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">Write &amp;</text>
  <text x="70" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Commit</text>

  <line x1="120" y1="72" x2="155" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 2 -->
  <rect x="155" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="205" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">CI/CD</text>
  <text x="205" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">Test &amp;</text>
  <text x="205" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Lint</text>

  <line x1="255" y1="72" x2="290" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 3 -->
  <rect x="290" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="340" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Build</text>
  <text x="340" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">next build</text>
  <text x="340" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Optimize</text>

  <line x1="390" y1="72" x2="425" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 4 -->
  <rect x="425" y="45" width="100" height="55" rx="8" fill="#1e40af"/>
  <text x="475" y="66" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Deploy</text>
  <text x="475" y="82" text-anchor="middle" fill="#93c5fd" font-size="10">Push to</text>
  <text x="475" y="96" text-anchor="middle" fill="#93c5fd" font-size="10">Host</text>

  <line x1="525" y1="72" x2="560" y2="72" stroke="#475569" stroke-width="2" marker-end="url(#dp1)"/>

  <!-- 5 -->
  <rect x="560" y="45" width="100" height="55" rx="8" fill="#065f46"/>
  <text x="610" y="66" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Monitor</text>
  <text x="610" y="82" text-anchor="middle" fill="#34d399" font-size="10">Logs &amp;</text>
  <text x="610" y="96" text-anchor="middle" fill="#34d399" font-size="10">Alerts</text>

  <!-- Feedback loop -->
  <path d="M610 100 Q610 118 370 118 Q130 118 70 100" stroke="#a78bfa" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#dp2)"/>

  <defs>
    <marker id="dp1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="dp2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

---

## 19.4 Production Build Commands

```bash
# Install dependencies
npm install

# Create an optimized production build
npm run build

# Start the production server (Node.js required)
npm run start

# Inspect build output sizes
npx next build --debug
```

The `npm run build` command:
1. Compiles TypeScript
2. Bundles and minifies JavaScript
3. Optimizes images
4. Generates static pages where possible
5. Creates the `.next` directory with all output

---

## 19.5 Deployment Option: Vercel (Recommended)

Vercel is the company behind Next.js and offers **zero-config deployment**.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Deploy to production
vercel --prod
```

**Automatic features on Vercel:**
- Edge Network (CDN) globally
- Automatic HTTPS via Let's Encrypt
- Preview deployments on every PR
- Environment variable management
- Serverless Functions for API routes
- Image optimization via `next/image`

| Feature | Vercel Free | Vercel Pro |
|---------|-------------|------------|
| Deployments | Unlimited | Unlimited |
| Bandwidth | 100 GB/mo | 1 TB/mo |
| Serverless Functions | 100 GB-hrs | 1000 GB-hrs |
| Custom Domains | Unlimited | Unlimited |
| Team Collaboration | 1 member | Unlimited |

---

## 19.6 Deployment Option: Docker

Docker packages your app into a **portable container** that runs the same on any server.

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - web
```

> âš ï¸ Enable `output: 'standalone'` in `next.config.js` for minimal Docker images:
> ```js
> // next.config.js
> module.exports = { output: 'standalone' }
> ```

---

## 19.7 Deployment Option: AWS

```bash
# Using AWS Amplify
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish

# Using AWS EC2 (manual VPS approach)
ssh ubuntu@your-ec2-ip

# On server:
sudo apt update && sudo apt install -y nodejs npm nginx
git clone your-repo && cd your-repo
npm ci && npm run build
pm2 start npm --name "nextjs" -- start
pm2 save && pm2 startup
```

---

## 19.8 Deployment Option: VPS Server

A VPS (Virtual Private Server) gives you full control. Use **PM2** to keep Next.js running.

```bash
# Install PM2 process manager
npm install -g pm2

# Start Next.js with PM2
pm2 start npm --name "nextjs-app" -- start

# Save PM2 process list
pm2 save

# Generate startup script (survives reboots)
pm2 startup

# Monitor logs
pm2 logs nextjs-app
pm2 monit
```

---

## 19.9 Deployment Architecture Diagram

```txt
<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="700" height="400" rx="14" fill="#0f172a"/>
  <text x="350" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">Next.js Production Deployment Architecture</text>

  <!-- Internet / User -->
  <rect x="280" y="50" width="140" height="44" rx="8" fill="#1e3a5f"/>
  <text x="350" y="68" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">ðŸŒ User Browser</text>
  <text x="350" y="85" text-anchor="middle" fill="#93c5fd" font-size="10">Internet</text>

  <line x1="350" y1="94" x2="350" y2="120" stroke="#475569" stroke-width="2" marker-end="url(#dp3)"/>

  <!-- CDN Layer -->
  <rect x="180" y="120" width="340" height="44" rx="8" fill="#065f46"/>
  <text x="350" y="138" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600">â˜ï¸ CDN / Edge Network</text>
  <text x="350" y="155" text-anchor="middle" fill="#34d399" font-size="10">Static assets Â· Caching Â· SSL termination</text>

  <line x1="350" y1="164" x2="350" y2="190" stroke="#475569" stroke-width="2" marker-end="url(#dp3)"/>

  <!-- Load Balancer -->
  <rect x="230" y="190" width="240" height="44" rx="8" fill="#1e40af"/>
  <text x="350" y="208" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">âš–ï¸ Load Balancer</text>
  <text x="350" y="225" text-anchor="middle" fill="#93c5fd" font-size="10">Nginx Â· Route traffic</text>

  <!-- Distribute to instances -->
  <line x1="280" y1="234" x2="160" y2="265" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>
  <line x1="350" y1="234" x2="350" y2="265" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>
  <line x1="420" y1="234" x2="540" y2="265" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>

  <!-- App instances -->
  <rect x="80" y="265" width="140" height="50" rx="8" fill="#1e3a5f"/>
  <text x="150" y="285" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Next.js Instance 1</text>
  <text x="150" y="301" text-anchor="middle" fill="#93c5fd" font-size="10">Port 3000</text>

  <rect x="270" y="265" width="160" height="50" rx="8" fill="#1e3a5f"/>
  <text x="350" y="285" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Next.js Instance 2</text>
  <text x="350" y="301" text-anchor="middle" fill="#93c5fd" font-size="10">Port 3001</text>

  <rect x="480" y="265" width="140" height="50" rx="8" fill="#1e3a5f"/>
  <text x="550" y="285" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Next.js Instance 3</text>
  <text x="550" y="301" text-anchor="middle" fill="#93c5fd" font-size="10">Port 3002</text>

  <!-- Database layer -->
  <line x1="350" y1="315" x2="350" y2="345" stroke="#475569" stroke-width="1.5" marker-end="url(#dp3)"/>
  <rect x="180" y="345" width="140" height="40" rx="8" fill="#312e81"/>
  <text x="250" y="361" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">ðŸ—„ï¸ Database</text>
  <text x="250" y="377" text-anchor="middle" fill="#a78bfa" font-size="10">PostgreSQL / MongoDB</text>

  <rect x="380" y="345" width="140" height="40" rx="8" fill="#312e81"/>
  <text x="450" y="361" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">âš¡ Redis Cache</text>
  <text x="450" y="377" text-anchor="middle" fill="#a78bfa" font-size="10">Session / Cache</text>

  <defs>
    <marker id="dp3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

## 19.10 Environment Variables

```bash
# .env.local (never commit to git)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# .env.production
NEXTAUTH_URL=https://yourdomain.com
```

| Variable Prefix | Exposed to Browser? | Use For |
|-----------------|---------------------|---------|
| `NEXT_PUBLIC_` | âœ… Yes | Public keys, feature flags |
| No prefix | âŒ No | DB URLs, secrets, API keys |

```tsx
// Accessing env vars
const dbUrl = process.env.DATABASE_URL;        // Server only
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY; // Client + Server
```

---

## 19.11 CI/CD Workflow

```txt
<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="200" rx="12" fill="#0f172a"/>
  <text x="360" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">CI/CD Pipeline (GitHub Actions)</text>

  <!-- Steps -->
  <rect x="20" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="65" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">ðŸ“</text>
  <text x="65" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Push Code</text>
  <text x="65" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">git push</text>

  <line x1="110" y1="95" x2="135" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="135" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="180" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">ðŸ”</text>
  <text x="180" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Lint &amp; Type</text>
  <text x="180" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">ESLint + tsc</text>

  <line x1="225" y1="95" x2="250" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="250" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="295" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">ðŸ§ª</text>
  <text x="295" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Run Tests</text>
  <text x="295" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">Jest + Playwright</text>

  <line x1="340" y1="95" x2="365" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="365" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="410" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">ðŸ—ï¸</text>
  <text x="410" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Build</text>
  <text x="410" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">next build</text>

  <line x1="455" y1="95" x2="480" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="480" y="50" width="90" height="90" rx="8" fill="#1e40af"/>
  <text x="525" y="88" text-anchor="middle" fill="#bfdbfe" font-size="22">ðŸš€</text>
  <text x="525" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Deploy</text>
  <text x="525" y="126" text-anchor="middle" fill="#93c5fd" font-size="9">Vercel / AWS</text>

  <line x1="570" y1="95" x2="595" y2="95" stroke="#475569" stroke-width="2" marker-end="url(#ci1)"/>

  <rect x="595" y="50" width="100" height="90" rx="8" fill="#065f46"/>
  <text x="645" y="88" text-anchor="middle" fill="#6ee7b7" font-size="22">âœ…</text>
  <text x="645" y="110" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Live!</text>
  <text x="645" y="126" text-anchor="middle" fill="#34d399" font-size="9">Monitor</text>

  <!-- Fail arrow -->
  <path d="M295 140 Q295 175 180 175 Q65 175 65 140" stroke="#f87171" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#ci2)"/>
  <text x="180" y="172" text-anchor="middle" fill="#fca5a5" font-size="9">âŒ Tests fail â†’ Notify developer</text>

  <defs>
    <marker id="ci1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="ci2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>
</svg>
```

**GitHub Actions example:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test -- --ci

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 19.12 Domain, SSL & Monitoring

### Domain Configuration
1. Buy domain from Namecheap, Cloudflare, or GoDaddy
2. Add DNS A record pointing to your server IP
3. Add CNAME for `www` pointing to root domain
4. In Vercel: Settings â†’ Domains â†’ Add custom domain

### SSL (HTTPS)
- **Vercel:** Automatic, powered by Let's Encrypt
- **Self-hosted:** Use Certbot: `sudo certbot --nginx -d yourdomain.com`

### Monitoring Basics
```bash
# Check application health
curl https://yourdomain.com/api/health

# View PM2 logs
pm2 logs --lines 100

# Monitor resources
pm2 monit
```

```tsx
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

---

## 19.13 Deployment Comparison Table

| Platform | Ease | Cost | Scalability | Control | Best For |
|----------|------|------|-------------|---------|---------|
| **Vercel** | â­â­â­â­â­ | Free â†’ $20/mo | Auto | Low | Startups, MVP |
| **Docker + VPS** | â­â­â­ | $5â€“$20/mo | Manual | High | Full control |
| **AWS Amplify** | â­â­â­â­ | Pay-per-use | Auto | Medium | AWS ecosystem |
| **Railway** | â­â­â­â­ | $5/mo | Auto | Medium | Simplicity |
| **DigitalOcean** | â­â­â­ | $12/mo | Manual | High | VPS experience |

---

## 19.14 Best Practices for Deployment

- âœ… Use separate `.env.local`, `.env.staging`, `.env.production` files
- âœ… Never commit secrets â€” use CI/CD secret management
- âœ… Enable `output: 'standalone'` for Docker to minimize image size
- âœ… Run `npm ci` (not `npm install`) in CI for deterministic builds
- âœ… Set up health check endpoints for load balancers
- âœ… Use a CDN in front of your server for static assets
- âœ… Enable HTTP â†’ HTTPS redirect
- âœ… Set `NEXT_TELEMETRY_DISABLED=1` in Docker for privacy

---

## 19.15 Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Committing `.env` files | Secret exposure | Add to `.gitignore` |
| Using `npm install` in Docker | Non-deterministic deps | Use `npm ci` |
| Missing `NEXTAUTH_URL` in prod | Auth breaks | Set all required env vars |
| No process manager | App dies on crash | Use PM2 or systemd |
| Forgetting `output: 'standalone'` | Huge Docker images | Set in `next.config.js` |
| HTTP in production | Insecure | Always enforce HTTPS |

---

## 19.16 Interview Questions â€” Deployment

**Beginner:**
1. What is the difference between `npm run build` and `npm run start`?
2. What is the `.next` directory and what does it contain?
3. How do you set environment variables in Next.js?

**Intermediate:**
4. What does `output: 'standalone'` do in `next.config.js`?
5. How would you set up a CI/CD pipeline for a Next.js project?
6. What is the purpose of a load balancer in a deployment?

**Advanced:**
7. How would you deploy Next.js to a multi-region setup for global performance?
8. What strategies would you use to achieve zero-downtime deployments?
9. How do you handle database migrations in a CI/CD pipeline?

---

# Section 20: Testing

## 20.1 What Is Testing?

Testing is the practice of **verifying that your application behaves as expected** under various conditions. It involves writing automated code that exercises your application and asserts specific outcomes.

> **Simple analogy:** Testing is like a pre-flight checklist for a pilot. You check each system (engine, instruments, controls) before every flight to ensure nothing is broken â€” even if nothing seemed wrong yesterday.

---

## 20.2 Why Testing Matters

| Benefit | Description |
|---------|-------------|
| **Confidence** | Deploy without fear of breaking things |
| **Regression prevention** | Old bugs don't come back |
| **Documentation** | Tests describe expected behavior |
| **Refactoring safety** | Change code freely with a safety net |
| **Team velocity** | Faster review, clearer contracts between components |

---

## 20.3 The Testing Pyramid

```txt
<svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="500" height="340" rx="12" fill="#0f172a"/>
  <text x="250" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">Testing Pyramid</text>

  <!-- E2E layer (top - small) -->
  <polygon points="250,55 175,155 325,155" fill="#7c3aed"/>
  <text x="250" y="108" text-anchor="middle" fill="#ede9fe" font-size="11" font-weight="700">E2E Tests</text>
  <text x="250" y="124" text-anchor="middle" fill="#c4b5fd" font-size="9">Cypress / Playwright</text>
  <text x="250" y="140" text-anchor="middle" fill="#c4b5fd" font-size="9">Slow Â· Expensive Â· Few</text>

  <!-- Integration layer (middle) -->
  <polygon points="175,165 100,255 400,255" fill="#1d4ed8"/>
  <text x="250" y="205" text-anchor="middle" fill="#dbeafe" font-size="11" font-weight="700">Integration Tests</text>
  <text x="250" y="220" text-anchor="middle" fill="#93c5fd" font-size="9">React Testing Library</text>
  <text x="250" y="236" text-anchor="middle" fill="#93c5fd" font-size="9">Medium speed Â· Medium count</text>

  <!-- Unit layer (bottom - wide) -->
  <polygon points="100,265 50,315 450,315" fill="#065f46"/>
  <text x="250" y="293" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="700">Unit Tests</text>
  <text x="250" y="308" text-anchor="middle" fill="#34d399" font-size="9">Jest Â· Fast Â· Cheap Â· Many</text>

  <!-- Labels right -->
  <text x="350" y="108" fill="#a78bfa" font-size="10">5â€“10%</text>
  <text x="418" y="210" fill="#93c5fd" font-size="10">20â€“30%</text>
  <text x="455" y="295" fill="#34d399" font-size="10">60â€“70%</text>
</svg>
```

---

## 20.4 Types of Testing

### Unit Testing
Tests **individual functions or components** in isolation.
- Fast to run
- Easy to write
- No network or database needed

### Integration Testing
Tests **how multiple units work together** â€” components with context, API calls, routing.
- Slower than unit tests
- More realistic
- May require mocking

### End-to-End (E2E) Testing
Tests the **entire application flow** from the user's perspective in a real browser.
- Slowest
- Most realistic
- Catches issues other tests miss

---

## 20.5 Testing Tools

| Tool | Type | Purpose |
|------|------|---------|
| **Jest** | Unit / Integration | Test runner, assertions, mocking |
| **React Testing Library** | Integration | Render and interact with React components |
| **Cypress** | E2E | Browser automation, visual testing |
| **Playwright** | E2E | Cross-browser automation by Microsoft |
| **MSW (Mock Service Worker)** | Mocking | Intercept API calls in tests |
| **Testing Library / user-event** | Integration | Simulate real user interactions |

---

## 20.6 Setting Up Jest + React Testing Library

```bash
# Install dependencies
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
```

```js
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Next.js project root
});

const customConfig = {
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customConfig);
```

```ts
// jest.setup.ts
import '@testing-library/jest-dom';
```

---

## 20.7 Writing Tests: `describe`, `it`, `expect`

```tsx
// components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

// describe() groups related tests
describe('Button Component', () => {

  // it() (alias: test()) describes a single test case
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);

    // expect() makes an assertion
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn(); // Mock function

    render(<Button onClick={handleClick}>Submit</Button>);

    await user.click(screen.getByRole('button'));

    // expect().toHaveBeenCalledTimes() checks mock call count
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 20.8 Testing Async Code

```tsx
// components/__tests__/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from '@/components/UserProfile';

// Mock the fetch globally
global.fetch = jest.fn();

describe('UserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Alice', email: 'alice@example.com' }),
    });

    render(<UserProfile userId="1" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays user data after fetch', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Alice', email: 'alice@example.com' }),
    });

    render(<UserProfile userId="1" />);

    // waitFor retries until assertion passes or times out
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });

  it('shows error when fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
```

---

## 20.9 Mocking APIs with MSW

```tsx
// __mocks__/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Mock User',
      email: 'mock@test.com',
    });
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as { name: string };
    return HttpResponse.json({ id: '123', ...body }, { status: 201 });
  }),
];
```

```tsx
// jest.setup.ts (add MSW setup)
import { setupServer } from 'msw/node';
import { handlers } from './__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## 20.10 Testing Forms

```tsx
// components/__tests__/LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/components/LoginForm';

describe('LoginForm', () => {
  it('shows validation error for empty email', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'user@test.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'password123',
      });
    });
  });
});
```

---

## 20.11 Testing Lifecycle Diagram

```txt
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="700" height="280" rx="14" fill="#0f172a"/>
  <text x="350" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">Testing Lifecycle in Next.js</text>

  <!-- Boxes in sequence -->
  <!-- Write component -->
  <rect x="20" y="60" width="120" height="60" rx="8" fill="#1e40af"/>
  <text x="80" y="84" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Write</text>
  <text x="80" y="100" text-anchor="middle" fill="#93c5fd" font-size="10">Component</text>
  <text x="80" y="114" text-anchor="middle" fill="#93c5fd" font-size="9">+ Logic</text>

  <line x1="140" y1="90" x2="170" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#tc1)"/>

  <!-- Write test -->
  <rect x="170" y="60" width="120" height="60" rx="8" fill="#1e40af"/>
  <text x="230" y="84" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Write Test</text>
  <text x="230" y="100" text-anchor="middle" fill="#93c5fd" font-size="10">describe()</text>
  <text x="230" y="114" text-anchor="middle" fill="#93c5fd" font-size="9">it() Â· expect()</text>

  <line x1="290" y1="90" x2="320" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#tc1)"/>

  <!-- Run tests -->
  <rect x="320" y="60" width="120" height="60" rx="8" fill="#1e40af"/>
  <text x="380" y="84" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Run Tests</text>
  <text x="380" y="100" text-anchor="middle" fill="#93c5fd" font-size="10">jest --watch</text>
  <text x="380" y="114" text-anchor="middle" fill="#93c5fd" font-size="9">npm test</text>

  <line x1="440" y1="90" x2="470" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#tc1)"/>

  <!-- Pass/Fail -->
  <polygon points="560,65 640,90 560,115 480,90" fill="#374151" stroke="#6b7280"/>
  <text x="560" y="87" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">All</text>
  <text x="560" y="101" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">Pass?</text>

  <!-- Yes: deploy -->
  <line x1="640" y1="90" x2="670" y2="90" stroke="#34d399" stroke-width="2" marker-end="url(#tc2)"/>
  <rect x="650" y="65" width="40" height="50" rx="8" fill="#065f46"/>
  <text x="670" y="92" text-anchor="middle" fill="#6ee7b7" font-size="9">âœ… CI</text>

  <!-- No: fix -->
  <line x1="560" y1="115" x2="560" y2="165" stroke="#f87171" stroke-width="2" marker-end="url(#tc3)"/>
  <rect x="480" y="165" width="160" height="50" rx="8" fill="#7f1d1d"/>
  <text x="560" y="185" text-anchor="middle" fill="#fecaca" font-size="11" font-weight="600">âŒ Fix Code</text>
  <text x="560" y="201" text-anchor="middle" fill="#fca5a5" font-size="10">Debug failing test</text>

  <!-- Loop back -->
  <path d="M480 190 Q400 190 380 150" stroke="#f87171" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#tc3)"/>

  <!-- Bottom: coverage -->
  <rect x="130" y="235" width="440" height="35" rx="8" fill="#1e293b" stroke="#475569"/>
  <text x="350" y="249" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Code Coverage Report</text>
  <text x="350" y="263" text-anchor="middle" fill="#64748b" font-size="9">Statements Â· Branches Â· Functions Â· Lines â†’ jest --coverage</text>

  <defs>
    <marker id="tc1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="tc2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
    <marker id="tc3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>
</svg>
```

---

## 20.12 End-to-End Testing with Playwright

```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install
```

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

```ts
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'user@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'wrong@test.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
```

---

## 20.13 Cypress vs Playwright Comparison

| Feature | Cypress | Playwright |
|---------|---------|------------|
| **Browser Support** | Chrome, Firefox, Edge | Chromium, Firefox, WebKit |
| **Language** | JS/TS | JS/TS, Python, Java, C# |
| **Speed** | Moderate | Fast |
| **Parallel execution** | Paid plan | Built-in (free) |
| **Auto-waiting** | âœ… Yes | âœ… Yes |
| **Network mocking** | âœ… Yes | âœ… Yes |
| **Mobile viewport** | âœ… Yes | âœ… Yes |
| **Screenshot/Video** | âœ… Yes | âœ… Yes |
| **Community size** | Very large | Growing fast |
| **API testing** | Limited | Built-in |
| **Best for** | Traditional SPA testing | Modern cross-browser |

---

## 20.14 Unit vs Integration Testing Comparison

| Aspect | Unit Testing | Integration Testing |
|--------|-------------|---------------------|
| **What is tested** | Single function/component | Multiple units together |
| **Speed** | Very fast (ms) | Moderate (seconds) |
| **Isolation** | Full (mocked deps) | Partial (real components) |
| **Confidence level** | Low-Medium | Medium-High |
| **Test count** | Many (hundreds) | Moderate (tens) |
| **Finds bugs** | Logic errors | Integration issues |
| **Example** | `formatDate()` function | Login form â†’ API call |

---

## 20.15 Component Testing Workflow

```txt
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="660" height="240" rx="12" fill="#0f172a"/>
  <text x="330" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">Component Testing Workflow</text>

  <!-- render() -->
  <rect x="20" y="55" width="120" height="55" rx="8" fill="#1e40af"/>
  <text x="80" y="78" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">1. render()</text>
  <text x="80" y="95" text-anchor="middle" fill="#93c5fd" font-size="9">Mount component</text>
  <text x="80" y="108" text-anchor="middle" fill="#93c5fd" font-size="9">into DOM</text>

  <line x1="140" y1="82" x2="170" y2="82" stroke="#475569" stroke-width="2" marker-end="url(#cw1)"/>

  <!-- query DOM -->
  <rect x="170" y="55" width="120" height="55" rx="8" fill="#1e40af"/>
  <text x="230" y="78" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">2. Query DOM</text>
  <text x="230" y="95" text-anchor="middle" fill="#93c5fd" font-size="9">getByRole()</text>
  <text x="230" y="108" text-anchor="middle" fill="#93c5fd" font-size="9">getByText()</text>

  <line x1="290" y1="82" x2="320" y2="82" stroke="#475569" stroke-width="2" marker-end="url(#cw1)"/>

  <!-- user interaction -->
  <rect x="320" y="55" width="120" height="55" rx="8" fill="#1e40af"/>
  <text x="380" y="78" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">3. Interact</text>
  <text x="380" y="95" text-anchor="middle" fill="#93c5fd" font-size="9">userEvent.click()</text>
  <text x="380" y="108" text-anchor="middle" fill="#93c5fd" font-size="9">userEvent.type()</text>

  <line x1="440" y1="82" x2="470" y2="82" stroke="#475569" stroke-width="2" marker-end="url(#cw1)"/>

  <!-- Assert -->
  <rect x="470" y="55" width="160" height="55" rx="8" fill="#065f46"/>
  <text x="550" y="78" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">4. Assert</text>
  <text x="550" y="95" text-anchor="middle" fill="#34d399" font-size="9">expect().toBeInTheDocument()</text>
  <text x="550" y="108" text-anchor="middle" fill="#34d399" font-size="9">expect().toHaveValue()</text>

  <!-- Key principle box -->
  <rect x="100" y="150" width="460" height="70" rx="10" fill="#1e293b" stroke="#334155"/>
  <text x="330" y="172" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="700">ðŸ’¡ Key Principle: Test behavior, not implementation</text>
  <text x="330" y="192" text-anchor="middle" fill="#64748b" font-size="10">âœ… "User sees 'Welcome Alice'" â€” âŒ "state.userName === 'Alice'"</text>
  <text x="330" y="208" text-anchor="middle" fill="#64748b" font-size="10">Query by role/label (a11y) â€” not by CSS class or internal IDs</text>

  <defs>
    <marker id="cw1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

## 20.16 Best Practices for Testing

- âœ… Follow the Testing Trophy (favoring integration tests over pure unit)
- âœ… Query by accessibility attributes (`getByRole`, `getByLabelText`)
- âœ… Avoid testing implementation details (internal state, CSS classes)
- âœ… Use `userEvent` over `fireEvent` for realistic interactions
- âœ… Mock only what you must â€” prefer real implementations
- âœ… Keep tests close to the code they test (`__tests__` folder or `.test.tsx` alongside)
- âœ… Run tests in CI on every push
- âœ… Aim for 70â€“80% coverage â€” 100% is usually not worth the cost

---

## 20.17 Common Mistakes in Testing

| Mistake | Problem | Fix |
|---------|---------|-----|
| Testing implementation details | Tests break on refactor | Test behavior visible to users |
| Not awaiting async operations | Flaky tests | Use `waitFor`, `findBy*` |
| Over-mocking | Tests don't reflect reality | Use MSW for API mocks |
| No `act()` around state updates | Warning floods | Use RTL which handles this |
| Testing third-party libraries | Wasted effort | Trust library authors |
| Snapshot tests everywhere | Noisy diffs, brittle | Use sparingly for stable UI |

---

## 20.18 Interview Questions â€” Testing

**Beginner:**
1. What is the difference between unit, integration, and E2E testing?
2. Why should you query by role instead of test ID?
3. What does `jest.fn()` do?

**Intermediate:**
4. How does Mock Service Worker (MSW) differ from mocking `fetch` directly?
5. What is the `waitFor` utility and when do you use it?
6. How would you test a form with validation in React Testing Library?

**Advanced:**
7. How do you handle testing of Next.js Server Components vs Client Components?
8. What strategy would you use to achieve stable, non-flaky E2E tests?
9. How do you test custom React hooks?

---

# Summary

This document covered three essential production concerns for any Next.js application:

**Section 18 â€” Error Handling** teaches you to build resilient applications that catch failures gracefully using `error.tsx`, `global-error.tsx`, `not-found.tsx`, and `loading.tsx`. You learned how to log errors, build fallback UIs, and handle API errors correctly.

**Section 19 â€” Deployment** covers the full journey from code to production. You now understand how to deploy on Vercel, Docker, AWS, and VPS servers. You know how to manage environment variables, build production bundles, set up CI/CD pipelines, configure domains, and monitor your app.

**Section 20 â€” Testing** gives you the foundation to write confident code. Unit tests, integration tests, and E2E tests each serve a distinct purpose. Jest, React Testing Library, and Playwright are the industry-standard tools to master.

---

# Key Takeaways

1. **`error.tsx` must be a Client Component** â€” this is the most common mistake developers make
2. **`notFound()` is cleaner than returning null** â€” always use it for missing resources
3. **Never commit `.env` files** â€” use CI/CD secrets management
4. **Use `npm ci` not `npm install`** in production and CI environments
5. **Test behavior, not implementation** â€” query by role/label, not CSS classes
6. **E2E tests are not a replacement** for unit and integration tests â€” use all three layers
7. **`output: 'standalone'`** dramatically reduces Docker image size
8. **MSW is the gold standard** for mocking API calls in tests

---

# Practice Exercises

## Beginner
1. Create a route `app/products/[id]/page.tsx` that calls `notFound()` when a product doesn't exist
2. Add a `loading.tsx` skeleton to your homepage
3. Write a unit test for a `formatPrice(price: number): string` utility function

## Intermediate
4. Implement a global error boundary with Sentry logging
5. Dockerize a Next.js app with a multi-stage build
6. Write integration tests for a login form including validation states
7. Set up a GitHub Actions workflow that runs tests on every PR

## Advanced
8. Build a CI/CD pipeline that deploys to staging on PRs and production on merges to main
9. Implement exponential backoff retry logic for API calls and write tests for it
10. Write Playwright tests for an authenticated user flow including cookie handling

---

# Mini Project Ideas

## 1. Error Handling Project
**Goal:** Build a dashboard that handles all error states gracefully.
- Product listing page with `error.tsx` for failed API calls
- Individual product page with `notFound()` for missing items
- `loading.tsx` skeleton screens for all data-fetching pages
- Global error boundary with `global-error.tsx`
- Sentry integration for error logging
- Error summary page (`/admin/errors`) showing recent errors

## 2. Deploying a Blog Application
**Goal:** Take a Next.js blog from local dev to fully deployed production.
- Build with App Router, MDX for posts, Tailwind CSS
- Dockerize with `output: 'standalone'`
- Deploy to both Vercel (easy) and a VPS with Nginx + PM2
- Configure custom domain + SSL via Certbot
- Set up GitHub Actions for automated deployments
- Add an `/api/health` endpoint for uptime monitoring

## 3. Testing a Dashboard App
**Goal:** Achieve 80%+ test coverage on a metrics dashboard.
- Unit tests for all data transformation utilities
- Integration tests for dashboard components using RTL
- Mock API responses using MSW
- E2E test with Playwright covering: login â†’ view dashboard â†’ filter data â†’ logout
- CI integration with coverage report on every PR

---

# Interview Preparation

## Beginner Questions

| Question | Key Points to Cover |
|----------|---------------------|
| What is the purpose of `error.tsx` in Next.js? | Client Component, receives `error` + `reset`, segment-level |
| How do you show a 404 page in Next.js? | `not-found.tsx` file + `notFound()` function |
| What is the difference between dev and production builds? | Minification, tree-shaking, optimized images, `.next` folder |
| What is `npm run build` used for? | Compiles + optimizes app, required before `npm start` |
| What does a unit test do? | Tests a single function/component in isolation |

## Intermediate Questions

| Question | Key Points to Cover |
|----------|---------------------|
| How does the `reset()` function work in error boundaries? | Re-renders the segment, does not refresh the page |
| What is the difference between Vercel and a VPS deployment? | Serverless vs persistent process, auto-scaling vs manual |
| How do you pass secrets to a Next.js app in production? | Environment variables, CI/CD secret managers |
| Why use `waitFor` in React Testing Library? | Async state updates, DOM changes after fetch |
| What is MSW and why is it better than mocking `fetch`? | Intercepts at network level, more realistic, reusable |

## Advanced Questions

| Question | Key Points to Cover |
|----------|---------------------|
| How does error boundary scoping work with nested layouts? | Each `error.tsx` catches errors in its subtree, not parent layout |
| How would you handle zero-downtime deployments? | Blue-green deployments, rolling updates, health checks |
| What is the `digest` property on server-side errors? | Hashed identifier safe to show users, maps to server logs |
| How do you test Next.js Server Components? | Different strategy â€” test output HTML, use `@testing-library/react` |
| How would you optimize Docker image size for Next.js? | Multi-stage builds, `output: 'standalone'`, Alpine base image |
| What metrics would you monitor in a production Next.js app? | Core Web Vitals, error rate, p95 latency, memory usage |

---

> **Next in the Series:** Part 5 will cover Advanced Topics: Middleware, Internationalization (i18n), Performance Optimization, and Building a Full-Stack Application.

---

*Last updated: May 2026 Â· Next.js 14+ App Router Â· TypeScript*

