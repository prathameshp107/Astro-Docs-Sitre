# Next.js Deep Dive — Part 3A: Middleware & Authentication

> **Series:** Next.js Complete Guide | **Part:** 3A | **Level:** Beginner → Advanced  
> **Covers:** Sections 11 (Middleware) & 12 (Authentication)

---

## Table of Contents

- [Section 11: Middleware](#section-11-middleware)
  - [What is Middleware?](#what-is-middleware)
  - [Why Use Middleware?](#why-use-middleware)
  - [Middleware Lifecycle](#middleware-lifecycle)
  - [middleware.ts File](#middlewarets-file)
  - [Route Matching](#route-matching)
  - [NextRequest & NextResponse](#nextrequest--nextresponse)
  - [Common Middleware Patterns](#common-middleware-patterns)
  - [Geo-Based & Device Detection Middleware](#geo-based--device-detection-middleware)
  - [Edge Runtime & Limitations](#edge-runtime--limitations)
  - [Best Practices — Middleware](#best-practices--middleware)
  - [Common Mistakes — Middleware](#common-mistakes--middleware)
  - [Interview Questions — Middleware](#interview-questions--middleware)
- [Section 12: Authentication](#section-12-authentication)
  - [What is Authentication?](#what-is-authentication)
  - [Authentication vs Authorization](#authentication-vs-authorization)
  - [Session vs JWT vs OAuth](#session-vs-jwt-vs-oauth)
  - [Login, Registration & Password Flows](#login-registration--password-flows)
  - [Cookies, Sessions, Access & Refresh Tokens](#cookies-sessions-access--refresh-tokens)
  - [Protected Routes & RBAC](#protected-routes--rbac)
  - [NextAuth.js / Auth.js](#nextauthjs--authjs)
  - [Credentials, Google & GitHub Providers](#credentials-google--github-providers)
  - [Core Auth Functions](#core-auth-functions)
  - [Password Security & Secure Cookies](#password-security--secure-cookies)
  - [CSRF Basics](#csrf-basics)
  - [Best Practices — Authentication](#best-practices--authentication)
  - [Common Mistakes — Authentication](#common-mistakes--authentication)
  - [Interview Questions — Authentication](#interview-questions--authentication)
- [Summary](#summary)
- [Key Takeaways](#key-takeaways)
- [Practice Exercises](#practice-exercises)
- [Mini Project Ideas](#mini-project-ideas)
- [Interview Preparation](#interview-preparation)

---

# Section 11: Middleware

## What is Middleware?

Middleware is a **function that runs before a request reaches your page or API route**. Think of it as a security guard at the entrance of a building — every visitor (HTTP request) must pass through the guard before entering (reaching your page).

In Next.js, middleware runs **at the Edge** (close to the user), making it extremely fast. It can:

- Read and modify the incoming request
- Read and modify the outgoing response
- Redirect or rewrite URLs
- Set or read cookies and headers
- Block requests entirely

```
Browser Request
      │
      ▼
  ┌─────────────┐
  │  Middleware  │  ← Runs FIRST (before pages, API routes, static files)
  └─────────────┘
      │
      ▼
  ┌─────────────┐
  │  Next.js     │
  │  Page/Route  │
  └─────────────┘
      │
      ▼
  Browser Response
```

---

## Why Use Middleware?

| Use Case | Without Middleware | With Middleware |
|---|---|---|
| Auth check | Repeated in every page/component | Single file, runs everywhere |
| Redirects | Requires client-side JS or server code | Instant, server-side, before render |
| A/B testing | Complex, flickers on load | Silent URL rewriting at edge |
| Geo-blocking | Server-side per route | One middleware, all routes |
| Rate limiting | Per-API-route boilerplate | Centralized |
| Logging | Scattered throughout code | One place |

---

## Middleware Lifecycle

Every HTTP request in Next.js goes through this lifecycle:

```svg
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <!-- Background -->
  <rect width="760" height="420" fill="#0f172a" rx="12"/>
  
  <!-- Title -->
  <text x="380" y="32" fill="#e2e8f0" font-size="15" font-weight="700" text-anchor="middle">Next.js Middleware Lifecycle</text>

  <!-- Step boxes -->
  <!-- 1: Browser -->
  <rect x="20" y="60" width="110" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="81" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle">Browser</text>
  <text x="75" y="97" fill="#94a3b8" font-size="10" text-anchor="middle">HTTP Request</text>

  <!-- Arrow 1→2 -->
  <line x1="130" y1="85" x2="158" y2="85" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- 2: Edge Network -->
  <rect x="158" y="60" width="110" height="50" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="213" y="81" fill="#c4b5fd" font-size="11" font-weight="700" text-anchor="middle">Edge Network</text>
  <text x="213" y="97" fill="#94a3b8" font-size="10" text-anchor="middle">CDN / Edge Node</text>

  <!-- Arrow 2→3 -->
  <line x1="268" y1="85" x2="296" y2="85" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- 3: Middleware -->
  <rect x="296" y="50" width="130" height="70" rx="8" fill="#1e3a5f" stroke="#06b6d4" stroke-width="2"/>
  <text x="361" y="76" fill="#67e8f9" font-size="13" font-weight="700" text-anchor="middle">middleware.ts</text>
  <text x="361" y="94" fill="#94a3b8" font-size="10" text-anchor="middle">Auth / Redirect /</text>
  <text x="361" y="108" fill="#94a3b8" font-size="10" text-anchor="middle">Rewrite / Log</text>

  <!-- Arrow 3→4 -->
  <line x1="426" y1="85" x2="454" y2="85" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- 4: Next.js Server -->
  <rect x="454" y="60" width="110" height="50" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
  <text x="509" y="81" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle">Next.js Server</text>
  <text x="509" y="97" fill="#94a3b8" font-size="10" text-anchor="middle">Page / API Route</text>

  <!-- Arrow 4→5 -->
  <line x1="564" y1="85" x2="592" y2="85" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- 5: Response -->
  <rect x="592" y="60" width="110" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="647" y="81" fill="#fcd34d" font-size="11" font-weight="700" text-anchor="middle">Response</text>
  <text x="647" y="97" fill="#94a3b8" font-size="10" text-anchor="middle">Sent to Browser</text>

  <!-- Middleware Decision Box -->
  <text x="361" y="155" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">Middleware Decision Tree</text>

  <!-- Decision diamond -->
  <polygon points="361,175 420,210 361,245 302,210" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="361" y="206" fill="#67e8f9" font-size="10" font-weight="700" text-anchor="middle">Check</text>
  <text x="361" y="220" fill="#67e8f9" font-size="10" font-weight="700" text-anchor="middle">Request</text>

  <!-- Yes branch → Continue -->
  <line x1="420" y1="210" x2="530" y2="210" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrowGreen)"/>
  <text x="475" y="203" fill="#6ee7b7" font-size="10" text-anchor="middle">✓ Pass</text>
  <rect x="530" y="190" width="100" height="40" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="580" y="208" fill="#6ee7b7" font-size="10" font-weight="700" text-anchor="middle">Continue to</text>
  <text x="580" y="222" fill="#6ee7b7" font-size="10" font-weight="700" text-anchor="middle">Page/API</text>

  <!-- No branch → Block/Redirect -->
  <line x1="302" y1="210" x2="192" y2="210" stroke="#ef4444" stroke-width="1.5" marker-end="url(#arrowRed)"/>
  <text x="247" y="203" fill="#fca5a5" font-size="10" text-anchor="middle">✗ Block</text>
  <rect x="92" y="190" width="100" height="40" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="142" y="208" fill="#fca5a5" font-size="10" font-weight="700" text-anchor="middle">Redirect /</text>
  <text x="142" y="222" fill="#fca5a5" font-size="10" font-weight="700" text-anchor="middle">Return 401</text>

  <!-- Rewrite branch (down) -->
  <line x1="361" y1="245" x2="361" y2="285" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrowYellow)"/>
  <text x="380" y="270" fill="#fcd34d" font-size="10">Rewrite</text>
  <rect x="296" y="285" width="130" height="40" rx="6" fill="#1c1002" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="361" y="303" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Rewrite URL</text>
  <text x="361" y="317" fill="#94a3b8" font-size="10" text-anchor="middle">Transparent to User</text>

  <!-- Legend -->
  <rect x="20" y="355" width="720" height="52" rx="6" fill="#1e293b"/>
  <text x="40" y="374" fill="#94a3b8" font-size="10" font-weight="700">LEGEND:</text>
  <rect x="100" y="364" width="12" height="12" rx="2" fill="#052e16" stroke="#10b981" stroke-width="1.5"/>
  <text x="118" y="374" fill="#94a3b8" font-size="10">Continue</text>
  <rect x="190" y="364" width="12" height="12" rx="2" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="208" y="374" fill="#94a3b8" font-size="10">Block/Redirect</text>
  <rect x="310" y="364" width="12" height="12" rx="2" fill="#1c1002" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="328" y="374" fill="#94a3b8" font-size="10">Rewrite URL</text>
  <rect x="415" y="364" width="12" height="12" rx="2" fill="#1e3a5f" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="433" y="374" fill="#94a3b8" font-size="10">Middleware</text>

  <text x="40" y="396" fill="#64748b" font-size="9">Middleware runs at the EDGE before any server-side rendering. It does not have access to Node.js APIs.</text>

  <!-- Arrow markers -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#10b981"/>
    </marker>
    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#ef4444"/>
    </marker>
    <marker id="arrowYellow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>
```

---

## middleware.ts File

The middleware file **must be placed at the root of your project** (same level as `app/` or `pages/`), and must be named exactly `middleware.ts` (or `middleware.js`).

```
my-next-app/
├── app/
│   ├── page.tsx
│   └── dashboard/
│       └── page.tsx
├── middleware.ts        ← RIGHT HERE
├── next.config.js
└── package.json
```

### Minimal Middleware

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function runs on EVERY matching request
export function middleware(request: NextRequest) {
  // Just continue — do nothing special
  return NextResponse.next()
}
```

### The `config` Export (Route Matching)

By default, middleware runs on **every** route. You almost always want to restrict it:

```ts
// middleware.ts

export const config = {
  matcher: [
    // Only run on these paths:
    '/dashboard/:path*',    // /dashboard and all sub-paths
    '/admin/:path*',        // /admin and all sub-paths
    '/api/protected/:path*' // Protected API routes
  ]
}
```

---

## Route Matching

Route matching controls **which URLs** trigger your middleware.

### Matcher Syntax

| Pattern | Matches |
|---|---|
| `/dashboard` | Exactly `/dashboard` |
| `/dashboard/:path*` | `/dashboard`, `/dashboard/stats`, `/dashboard/a/b` |
| `/blog/:slug` | `/blog/hello`, `/blog/world` (one segment only) |
| `/((?!api\|_next\|favicon).*)` | Everything except `/api`, `/_next`, `/favicon` |
| `/admin/:path*` | All admin routes |

### Advanced Matcher with Exclusions

```ts
// middleware.ts
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (Next.js static files)
     * - _next/image   (Next.js image optimization)
     * - favicon.ico   (browser favicon)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
```

---

## NextRequest & NextResponse

These are enhanced versions of the standard Web API `Request` and `Response` objects.

### NextRequest

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // ─── URL Information ───────────────────────────────────
  const url = request.nextUrl               // Enhanced URL object
  const pathname = request.nextUrl.pathname // e.g. "/dashboard/stats"
  const origin = request.nextUrl.origin    // e.g. "https://myapp.com"
  const searchParams = request.nextUrl.searchParams // Query string

  // ─── Request Details ───────────────────────────────────
  const method = request.method            // "GET", "POST", etc.
  const headers = request.headers          // Request headers

  // ─── Cookies ───────────────────────────────────────────
  const token = request.cookies.get('auth-token')?.value
  const allCookies = request.cookies.getAll()

  // ─── Geo Information (Vercel only) ─────────────────────
  const country = request.geo?.country    // "US", "IN", etc.
  const city = request.geo?.city          // "New York"
  const region = request.geo?.region      // "NY"

  // ─── IP Address ────────────────────────────────────────
  const ip = request.ip                   // Client IP

  return NextResponse.next()
}
```

### NextResponse

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ─── 1. Continue (do nothing, pass request through) ───
  return NextResponse.next()

  // ─── 2. Redirect (browser URL changes) ────────────────
  return NextResponse.redirect(new URL('/login', request.url))

  // ─── 3. Rewrite (URL stays same, different page renders) ─
  return NextResponse.rewrite(new URL('/home', request.url))

  // ─── 4. Return a custom response (block request) ──────
  return new NextResponse('Forbidden', { status: 403 })

  // ─── 5. Return JSON response ──────────────────────────
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  )
}
```

### Setting Headers and Cookies on the Response

```ts
export function middleware(request: NextRequest) {
  // Clone the response to modify headers
  const response = NextResponse.next()

  // Add a custom header to EVERY response
  response.headers.set('X-Custom-Header', 'my-value')
  response.headers.set('X-Request-ID', crypto.randomUUID())

  // Set a cookie on the response
  response.cookies.set('visited', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  })

  // Delete a cookie
  response.cookies.delete('old-session')

  return response
}
```

---

## Common Middleware Patterns

### Authentication Middleware

Redirect unauthenticated users to the login page:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings']

// Routes that should NOT be accessible if logged in
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get auth token from cookie
  const token = request.cookies.get('auth-token')?.value
  const isAuthenticated = !!token // Simplified: in production, verify the token

  // If user is on an auth page but already logged in → go to dashboard
  if (AUTH_ROUTES.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is on a protected route but NOT logged in → go to login
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    // Save the URL they were trying to visit
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // All good — continue
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/login', '/register'],
}
```

### Admin-Only Routes

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Simple JWT payload decoder (no verification — verification in API)
function getTokenPayload(token: string) {
  try {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64').toString('utf8')
    return JSON.parse(payload)
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const payload = getTokenPayload(token)

    // Check role — redirect non-admins to home
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

### Logging Middleware

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const start = Date.now()
  const { pathname, search } = request.nextUrl
  const method = request.method
  const userAgent = request.headers.get('user-agent') ?? 'unknown'

  // Log the incoming request
  console.log(`[${new Date().toISOString()}] → ${method} ${pathname}${search}`)
  console.log(`  User-Agent: ${userAgent}`)
  console.log(`  IP: ${request.ip ?? 'unknown'}`)

  const response = NextResponse.next()

  // Add timing header (visible in browser DevTools)
  response.headers.set('X-Response-Time', `${Date.now() - start}ms`)

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### Analytics Middleware

```ts
// middleware.ts — Track page views at the edge
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only track page views (not API, static, etc.)
  const isPageView =
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.includes('.')

  if (isPageView) {
    // Fire-and-forget analytics call (don't await — don't block the user)
    fetch('https://analytics.example.com/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        timestamp: Date.now(),
        country: request.geo?.country,
        referrer: request.headers.get('referer'),
      }),
    }).catch(() => {
      // Silently ignore analytics failures — never block the user
    })
  }

  return NextResponse.next()
}
```

### Security Middleware (Headers)

```ts
// middleware.ts — Add security headers to all responses
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Enable XSS protection in older browsers
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Strict Transport Security (HTTPS only)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  return response
}
```

### Redirecting Users (Maintenance Mode)

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Don't redirect the maintenance page itself (infinite loop prevention)
  if (MAINTENANCE_MODE && pathname !== '/maintenance') {
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }

  return NextResponse.next()
}
```

---

## Geo-Based & Device Detection Middleware

### Geo-Based Middleware (Vercel)

```ts
// middleware.ts — Serve different content based on country
import { NextRequest, NextResponse } from 'next/server'

const BLOCKED_COUNTRIES = ['XX', 'YY'] // Example country codes

export function middleware(request: NextRequest) {
  const country = request.geo?.country ?? 'US'
  const { pathname } = request.nextUrl

  // Block certain countries
  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse('Service not available in your region.', {
      status: 451, // "Unavailable For Legal Reasons"
    })
  }

  // Redirect to country-specific content
  if (pathname === '/') {
    if (country === 'IN') {
      return NextResponse.rewrite(new URL('/in/home', request.url))
    }
    if (country === 'GB') {
      return NextResponse.rewrite(new URL('/gb/home', request.url))
    }
  }

  return NextResponse.next()
}
```

### Device Detection Middleware

```ts
// middleware.ts — Detect mobile vs desktop
import { NextRequest, NextResponse } from 'next/server'

function getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
  if (/Mobile|Android|iPhone/i.test(userAgent)) return 'mobile'
  if (/iPad|Tablet/i.test(userAgent)) return 'tablet'
  return 'desktop'
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? ''
  const deviceType = getDeviceType(userAgent)

  const response = NextResponse.next()

  // Pass device info to pages via header
  response.headers.set('X-Device-Type', deviceType)

  // Optionally rewrite to mobile-specific layout
  if (deviceType === 'mobile' && request.nextUrl.pathname === '/checkout') {
    return NextResponse.rewrite(
      new URL('/mobile/checkout', request.url)
    )
  }

  return response
}
```

---

## Request Interception Diagram

```svg
<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="700" height="380" fill="#0f172a" rx="12"/>
  <text x="350" y="30" fill="#e2e8f0" font-size="14" font-weight="700" text-anchor="middle">Request Interception in Middleware</text>

  <!-- Incoming request -->
  <rect x="20" y="55" width="120" height="44" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="73" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle">Incoming</text>
  <text x="80" y="89" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle">Request</text>

  <!-- Arrow -->
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
  <line x1="140" y1="77" x2="175" y2="77" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Middleware box -->
  <rect x="175" y="40" width="350" height="260" rx="10" fill="#0d2036" stroke="#06b6d4" stroke-width="2"/>
  <text x="350" y="62" fill="#67e8f9" font-size="13" font-weight="700" text-anchor="middle">middleware.ts</text>

  <!-- Step 1 -->
  <rect x="195" y="72" width="310" height="38" rx="6" fill="#1e293b" stroke="#4ade80" stroke-width="1"/>
  <text x="210" y="88" fill="#4ade80" font-size="11" font-weight="700">1. Read request</text>
  <text x="210" y="102" fill="#94a3b8" font-size="10">cookies, headers, pathname, IP, geo</text>

  <!-- Step 2 -->
  <rect x="195" y="118" width="310" height="38" rx="6" fill="#1e293b" stroke="#facc15" stroke-width="1"/>
  <text x="210" y="134" fill="#facc15" font-size="11" font-weight="700">2. Business logic</text>
  <text x="210" y="148" fill="#94a3b8" font-size="10">auth check, role validation, geo rules</text>

  <!-- Step 3 -->
  <rect x="195" y="164" width="310" height="38" rx="6" fill="#1e293b" stroke="#f87171" stroke-width="1"/>
  <text x="210" y="180" fill="#f87171" font-size="11" font-weight="700">3. Decision</text>
  <text x="210" y="194" fill="#94a3b8" font-size="10">continue / redirect / rewrite / block</text>

  <!-- Step 4 -->
  <rect x="195" y="210" width="310" height="38" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1"/>
  <text x="210" y="226" fill="#c084fc" font-size="11" font-weight="700">4. Modify response (optional)</text>
  <text x="210" y="240" fill="#94a3b8" font-size="10">set headers, set cookies</text>

  <!-- Step 5 -->
  <rect x="195" y="256" width="310" height="34" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
  <text x="210" y="272" fill="#38bdf8" font-size="11" font-weight="700">5. Return NextResponse</text>
  <text x="210" y="286" fill="#94a3b8" font-size="10">.next() / .redirect() / .rewrite() / JSON</text>

  <!-- Arrow out -->
  <line x1="525" y1="77" x2="560" y2="77" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- 3 outcome boxes -->
  <!-- Continue -->
  <rect x="560" y="45" width="120" height="36" rx="7" fill="#052e16" stroke="#4ade80" stroke-width="1.5"/>
  <text x="620" y="60" fill="#4ade80" font-size="10" font-weight="700" text-anchor="middle">✓ Continue</text>
  <text x="620" y="74" fill="#94a3b8" font-size="9" text-anchor="middle">to page/API</text>

  <!-- Redirect -->
  <rect x="560" y="95" width="120" height="36" rx="7" fill="#450a0a" stroke="#f87171" stroke-width="1.5"/>
  <text x="620" y="110" fill="#f87171" font-size="10" font-weight="700" text-anchor="middle">↩ Redirect</text>
  <text x="620" y="124" fill="#94a3b8" font-size="9" text-anchor="middle">to /login etc.</text>

  <!-- Block -->
  <rect x="560" y="145" width="120" height="36" rx="7" fill="#2d1b69" stroke="#c084fc" stroke-width="1.5"/>
  <text x="620" y="160" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">⛔ Block</text>
  <text x="620" y="174" fill="#94a3b8" font-size="9" text-anchor="middle">403/401 JSON</text>

  <!-- Note box -->
  <rect x="20" y="325" width="660" height="40" rx="6" fill="#1e293b"/>
  <text x="40" y="342" fill="#64748b" font-size="9" font-weight="700">IMPORTANT:</text>
  <text x="110" y="342" fill="#64748b" font-size="9">Middleware runs at the EDGE (V8 runtime). No Node.js built-ins (fs, crypto from node:). Use</text>
  <text x="40" y="356" fill="#64748b" font-size="9">the Web Crypto API instead: crypto.randomUUID(), crypto.subtle.digest() etc.</text>
</svg>
```

---

## Edge Runtime & Limitations

### What is the Edge Runtime?

Next.js middleware runs on the **Edge Runtime** — a lightweight JavaScript environment (based on V8) that runs at CDN nodes around the world, very close to your users.

```
Traditional Server                  Edge Runtime
─────────────────                  ────────────
One server in one location         Runs in 100+ locations
Slower (far from users)            Near-instant (close to users)
Full Node.js APIs available        Limited APIs (no Node.js)
More memory                        Very lightweight
```

### What You CANNOT Use in Middleware

| ❌ Not Available | ✅ Alternative |
|---|---|
| `fs` (file system) | Fetch from an API instead |
| `path` | String methods |
| `crypto` (Node.js) | `Web Crypto API` (`crypto.subtle`) |
| `bcrypt` | Cannot hash in middleware — do it in API routes |
| Prisma / DB connections | Too slow; use cached tokens |
| Most npm packages that use Node.js internals | Edge-compatible packages only |

### Size Limit

Middleware bundles must be **under 1MB** (typically much smaller). Heavy libraries will fail the build.

### Performance Considerations

```ts
// ❌ BAD — Database call in middleware (slow, unreliable)
export async function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value
  const user = await db.user.findUnique({ where: { id: userId } }) // DON'T DO THIS
  if (!user) return NextResponse.redirect('/login')
  return NextResponse.next()
}

// ✅ GOOD — Verify a JWT (fast, stateless)
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return NextResponse.redirect(new URL('/login', request.url))

  try {
    // Use Web Crypto or a lightweight edge-compatible library
    const payload = verifyJWT(token) // Fast, no DB
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

---

## Best Practices — Middleware

- **Keep middleware fast** — it runs on every matching request. Avoid I/O operations (database, file system).
- **Use JWT or opaque cookies** for auth checks — not database lookups.
- **Always exclude static files** from middleware matchers (`_next/static`, `_next/image`, `favicon.ico`).
- **Use `NextResponse.redirect` with absolute URLs** — always construct with `new URL('/path', request.url)`.
- **Set a `callbackUrl`** when redirecting to login so users return to their original destination.
- **Never trust headers from users** — always validate server-side.
- **Log sparingly in production** — console.log in edge functions can have minor performance impact.
- **Test middleware locally** before deploying — use `next dev` and check edge behavior.

---

## Common Mistakes — Middleware

- **Forgetting the `config.matcher`** — middleware then runs on every request including `_next/static`, causing weird behavior.
- **Using Node.js APIs** — `fs`, `path`, `crypto` from Node are not available. Use Web APIs.
- **Database calls in middleware** — breaks edge runtime and slows every request.
- **Infinite redirect loops** — redirecting `/login` to `/login`. Always check `pathname !== '/login'` before redirecting.
- **Not handling the `callbackUrl`** — users get redirected to login but can't get back to their original page.
- **Placing `middleware.ts` inside `app/`** — it must be at the project root.
- **Forgetting `async`** when using `await` (e.g., for edge-compatible crypto operations).
- **Relying on middleware for authorization alone** — always double-check in the page/API route as well.

---

## Interview Questions — Middleware

**Beginner:**
1. What is Next.js middleware, and where does it run?
2. What file name and location must middleware use?
3. What is the difference between `NextResponse.redirect()` and `NextResponse.rewrite()`?
4. How do you restrict middleware to only certain routes?

**Intermediate:**
5. Why should you avoid database calls in middleware?
6. How would you implement an admin-only route using middleware?
7. What is the Edge Runtime, and how does it differ from a regular Node.js server?
8. How can you pass information from middleware to a page component?
9. How do you prevent an infinite redirect loop in middleware?

**Advanced:**
10. How would you implement rate limiting in Next.js middleware?
11. Explain how `NextResponse.rewrite()` can be used for A/B testing.
12. How do you verify a JWT in middleware without using Node.js crypto?
13. What are the bundle size constraints for middleware, and how do you stay within them?

---

# Section 12: Authentication

## What is Authentication?

**Authentication** answers the question: **"Who are you?"**

It is the process of verifying a user's identity before granting them access to a system.

```
User says: "I am Alice"
System asks: "Prove it"
User provides: password / fingerprint / token
System checks: ✓ Verified — welcome, Alice!
```

**Why it matters:**
- Without authentication, anyone could access any user's data
- Prevents unauthorized access to private resources
- Forms the foundation of every secure web application

---

## Authentication vs Authorization

These two concepts are often confused but are very different:

| | Authentication | Authorization |
|---|---|---|
| Question | "Who are you?" | "What can you do?" |
| When | On login | After login, on every request |
| Example | Entering a password | An admin can delete users; a regular user cannot |
| Failure result | 401 Unauthorized | 403 Forbidden |

```svg
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="680" height="220" fill="#0f172a" rx="12"/>
  <text x="340" y="28" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">Authentication vs Authorization</text>

  <!-- User -->
  <circle cx="60" cy="110" r="30" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="60" y="106" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle">User</text>
  <text x="60" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Alice</text>

  <!-- Arrow 1 -->
  <line x1="92" y1="110" x2="145" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#a2)"/>
  <text x="118" y="104" fill="#94a3b8" font-size="9" text-anchor="middle">login</text>

  <!-- AuthN box -->
  <rect x="145" y="78" width="160" height="64" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="225" y="99" fill="#93c5fd" font-size="12" font-weight="700" text-anchor="middle">Authentication</text>
  <text x="225" y="114" fill="#94a3b8" font-size="10" text-anchor="middle">"Who are you?"</text>
  <text x="225" y="128" fill="#64748b" font-size="9" text-anchor="middle">verify password / token</text>

  <!-- Arrow 2 -->
  <line x1="305" y1="110" x2="360" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#a2)"/>
  <text x="332" y="104" fill="#4ade80" font-size="9" text-anchor="middle">✓ identity</text>

  <!-- AuthZ box -->
  <rect x="360" y="78" width="160" height="64" rx="8" fill="#1a2e1a" stroke="#4ade80" stroke-width="2"/>
  <text x="440" y="99" fill="#4ade80" font-size="12" font-weight="700" text-anchor="middle">Authorization</text>
  <text x="440" y="114" fill="#94a3b8" font-size="10" text-anchor="middle">"What can you do?"</text>
  <text x="440" y="128" fill="#64748b" font-size="9" text-anchor="middle">check role / permissions</text>

  <!-- Arrow 3 -->
  <line x1="520" y1="110" x2="575" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#a2)"/>
  <text x="547" y="104" fill="#94a3b8" font-size="9" text-anchor="middle">access</text>

  <!-- Resource -->
  <rect x="575" y="88" width="80" height="44" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="615" y="106" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Protected</text>
  <text x="615" y="120" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Resource</text>

  <!-- Legend -->
  <text x="40" y="175" fill="#64748b" font-size="10">401 Unauthorized → Authentication failed (not logged in)</text>
  <text x="40" y="193" fill="#64748b" font-size="10">403 Forbidden → Authorization failed (logged in, but no permission)</text>

  <defs>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
</svg>
```

---

## Session vs JWT vs OAuth

### Session Authentication

A **session** stores login state on the **server**. The browser only holds a session ID cookie.

```
Login:
  User sends username + password
  Server verifies → creates session in DB
  Server sends session ID cookie to browser

Subsequent requests:
  Browser sends session ID cookie
  Server looks up session ID in DB
  Server confirms user is authenticated
```

**Pros:** Easy to invalidate (just delete the session), secure by default  
**Cons:** Server must store sessions (memory/DB), harder to scale

### JWT (JSON Web Token) Authentication

A **JWT** is a **self-contained token** signed by the server. The server doesn't store anything.

```
Login:
  User sends username + password
  Server verifies → creates signed JWT
  Server sends JWT to browser (cookie or localStorage)

Subsequent requests:
  Browser sends JWT
  Server VERIFIES the signature (no DB lookup needed!)
  Server reads user info from the token payload
```

**Pros:** Stateless, scales easily, works across services  
**Cons:** Cannot be invalidated before expiry (use short expiry + refresh tokens)

### OAuth Authentication

**OAuth** lets users log in with a third-party provider (Google, GitHub, etc.) without sharing their password with your app.

```
1. User clicks "Sign in with Google"
2. Redirect to Google's auth page
3. User logs into Google
4. Google redirects back with an authorization code
5. Your server exchanges code for access token
6. Your server fetches user profile from Google
7. Create or find user in your DB
8. Create your own session/JWT
```

### Comparison Table

| Feature | Session | JWT | OAuth |
|---|---|---|---|
| Storage | Server DB | Client (cookie/localStorage) | Third-party provider |
| Stateless | No | Yes | Depends |
| Invalidation | Easy | Hard (need blocklist) | Provider handles it |
| Scalability | Harder | Easy | Easy |
| Best for | Simple apps | APIs, microservices | Social login |
| Security | High (server-side) | Medium (must expire fast) | High |

---

## Login, Registration & Password Flows

### Login Flow

```
1. User fills login form (email + password)
2. POST /api/auth/login
3. Server: find user by email in DB
4. Server: compare password with bcrypt.compare()
5. If match → create JWT or session
6. Set HttpOnly cookie with token
7. Return 200 + redirect to dashboard
8. If no match → return 401 + error message
```

### Registration Flow

```
1. User fills registration form (name, email, password)
2. POST /api/auth/register
3. Server: check if email already exists
4. If exists → return 409 Conflict
5. Server: hash password with bcrypt.hash(password, 12)
6. Server: save user to DB (with HASHED password, never plain)
7. Optionally send verification email
8. Return 201 Created
```

### Password Hashing

**NEVER store plain-text passwords.** Use `bcrypt`:

```ts
// app/api/auth/register/route.ts
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json()

  // Validate inputs
  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  // Check if user exists
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
  }

  // Hash password — salt rounds of 12 is recommended for production
  const hashedPassword = await bcrypt.hash(password, 12)

  // Save user — store the HASH, never the plain password
  const user = await db.user.create({
    data: { email, name, password: hashedPassword },
  })

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
}
```

---

## Cookies, Sessions, Access & Refresh Tokens

### Cookies

Cookies store small pieces of data in the browser, automatically sent with every request:

```ts
// Setting a secure HttpOnly cookie in a Next.js API route
import { cookies } from 'next/headers'

// In a Server Action or Route Handler:
const cookieStore = cookies()
cookieStore.set('auth-token', token, {
  httpOnly: true,        // ← JS cannot read this (XSS protection)
  secure: true,          // ← HTTPS only
  sameSite: 'lax',       // ← CSRF protection
  maxAge: 60 * 60 * 24,  // ← 1 day in seconds
  path: '/',
})
```

### Access Tokens vs Refresh Tokens

| | Access Token | Refresh Token |
|---|---|---|
| Purpose | Authenticate API requests | Get a new access token |
| Lifetime | Short (15 min – 1 hour) | Long (7 days – 30 days) |
| Storage | Memory or HttpOnly cookie | HttpOnly cookie only |
| Sent with | Every API request | Only to `/api/auth/refresh` |

```svg
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="700" height="300" fill="#0f172a" rx="12"/>
  <text x="350" y="28" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">JWT Lifecycle — Access + Refresh Token Flow</text>

  <defs>
    <marker id="al" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>

  <!-- Client -->
  <rect x="20" y="55" width="120" height="200" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="80" y="80" fill="#93c5fd" font-size="12" font-weight="700" text-anchor="middle">Client</text>
  <text x="80" y="96" fill="#64748b" font-size="9" text-anchor="middle">(Browser)</text>
  <line x1="80" y1="105" x2="80" y2="245" stroke="#334155" stroke-width="1" stroke-dasharray="4"/>

  <!-- Server -->
  <rect x="560" y="55" width="120" height="200" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="620" y="80" fill="#6ee7b7" font-size="12" font-weight="700" text-anchor="middle">Server</text>
  <text x="620" y="96" fill="#64748b" font-size="9" text-anchor="middle">(API)</text>
  <line x1="620" y1="105" x2="620" y2="245" stroke="#334155" stroke-width="1" stroke-dasharray="4"/>

  <!-- Step 1: Login -->
  <line x1="80" y1="120" x2="615" y2="120" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="114" fill="#93c5fd" font-size="10" text-anchor="middle">1. POST /login (email + password)</text>

  <!-- Step 2: Tokens returned -->
  <line x1="620" y1="145" x2="85" y2="145" stroke="#10b981" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="140" fill="#6ee7b7" font-size="10" text-anchor="middle">2. Returns access_token (15min) + refresh_token (7d) in HttpOnly cookies</text>

  <!-- Step 3: API call with access token -->
  <line x1="80" y1="175" x2="615" y2="175" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="169" fill="#fcd34d" font-size="10" text-anchor="middle">3. GET /api/data — access_token sent automatically via cookie</text>

  <!-- Step 4: Data returned -->
  <line x1="620" y1="195" x2="85" y2="195" stroke="#4ade80" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="190" fill="#4ade80" font-size="10" text-anchor="middle">4. ✓ Protected data returned</text>

  <!-- Step 5: Token expired -->
  <line x1="80" y1="218" x2="615" y2="218" stroke="#f87171" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="212" fill="#f87171" font-size="10" text-anchor="middle">5. access_token expired → POST /api/auth/refresh (refresh_token in cookie)</text>

  <!-- Step 6: New access token -->
  <line x1="620" y1="240" x2="85" y2="240" stroke="#c084fc" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="235" fill="#c084fc" font-size="10" text-anchor="middle">6. New access_token issued — user stays logged in seamlessly</text>

  <text x="350" y="272" fill="#475569" font-size="9" text-anchor="middle">Both tokens stored in HttpOnly cookies — invisible to JavaScript</text>
</svg>
```

---

## Protected Routes & RBAC

### Protected Routes in App Router

```tsx
// app/dashboard/layout.tsx — Protect entire dashboard
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // getServerSession checks the session cookie server-side
  const session = await getServerSession(authOptions)

  // If no session, redirect to login
  if (!session) {
    redirect('/login?callbackUrl=/dashboard')
  }

  return (
    <div>
      <nav>Welcome, {session.user?.name}</nav>
      {children}
    </div>
  )
}
```

### Role-Based Access Control (RBAC)

RBAC restricts pages/features based on the user's role (e.g., `admin`, `editor`, `viewer`).

```ts
// types/next-auth.d.ts — Extend the session type to include role
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role: 'admin' | 'editor' | 'user'  // ← Add role here
    }
  }
}
```

```tsx
// app/admin/page.tsx — Admin only page
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Not logged in
  if (!session) redirect('/login')

  // Logged in but not admin
  if (session.user.role !== 'admin') redirect('/unauthorized')

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Only admins can see this</p>
    </div>
  )
}
```

### Permissions System

For fine-grained control, use a permissions map:

```ts
// lib/permissions.ts
type Role = 'admin' | 'editor' | 'user'
type Permission = 'read:posts' | 'write:posts' | 'delete:posts' | 'manage:users'

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['read:posts', 'write:posts', 'delete:posts', 'manage:users'],
  editor: ['read:posts', 'write:posts'],
  user: ['read:posts'],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

// Usage in a component or API route:
// if (!hasPermission(session.user.role, 'delete:posts')) throw new Error('Forbidden')
```

---

## NextAuth.js / Auth.js

**NextAuth.js** (rebranded as **Auth.js**) is the most popular authentication library for Next.js. It handles:

- Multiple providers (Google, GitHub, credentials, etc.)
- Session management
- JWT or database sessions
- CSRF protection
- Callbacks for customizing tokens and sessions

### Installation

```bash
npm install next-auth
# or
npm install next-auth@beta  # for Auth.js v5
```

### Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts    ← NextAuth API handler
│   ├── login/
│   │   └── page.tsx
│   └── dashboard/
│       └── page.tsx
├── lib/
│   └── auth.ts                 ← Auth configuration
└── types/
    └── next-auth.d.ts          ← Type extensions
```

---

## Credentials, Google & GitHub Providers

### auth.ts — Full Configuration

```ts
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  // Use Prisma to persist sessions/users in your DB
  adapter: PrismaAdapter(db),

  // Use JWT for session strategy (good for Edge/serverless)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Custom pages (optional — override NextAuth defaults)
  pages: {
    signIn: '/login',       // Custom login page
    error: '/auth/error',   // Auth error page
  },

  // Providers — ways users can log in
  providers: [
    // ─── Credentials (email + password) ──────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        // Find user in DB
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) {
          throw new Error('User not found')
        }

        // Compare password with hash
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),

    // ─── Google OAuth ─────────────────────────────────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ─── GitHub OAuth ─────────────────────────────────────
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  // Callbacks — customize JWT and session
  callbacks: {
    // Runs whenever a JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        // First login — add extra fields to the token
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },

    // Runs whenever a session is checked
    async session({ session, token }) {
      if (token) {
        // Pass JWT fields to the session (available in components)
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  // Secret for signing JWTs — use a strong random string
  secret: process.env.NEXTAUTH_SECRET,
}
```

### API Route Handler

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

// Export for both GET and POST (NextAuth uses both)
export { handler as GET, handler as POST }
```

---

## Core Auth Functions

### signIn()

```tsx
// app/login/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCredentialsLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    // Sign in with credentials
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false, // Handle redirect manually
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
      return
    }

    // Redirect to dashboard on success
    router.push('/dashboard')
    router.refresh() // Refresh server components
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      {/* Credentials form */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded-lg"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {/* Google OAuth */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          Sign in with Google
        </button>

        {/* GitHub OAuth */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  )
}
```

### signOut()

```tsx
// components/LogoutButton.tsx
'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: '/login', // Where to redirect after logout
        })
      }
      className="px-4 py-2 bg-red-600 text-white rounded-lg"
    >
      Sign Out
    </button>
  )
}
```

### getServerSession()

Used in **Server Components** and **API Routes** to get the current user session:

```tsx
// app/dashboard/page.tsx — Server Component
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  // Fetch session on the server — no API call, reads from cookie
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}!</p>
      <p>Email: {session.user?.email}</p>
      <p>Role: {session.user?.role}</p>
    </div>
  )
}
```

```ts
// app/api/protected/route.ts — Protected API Route
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'Protected data',
    user: session.user,
  })
}
```

### Registration Page

```tsx
// app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    // Validate password length client-side
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    // Call registration API
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const body = await res.json()
      setError(body.error ?? 'Registration failed')
      setLoading(false)
      return
    }

    // Auto-login after registration
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
    })
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="name" type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg"/>
        <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded-lg"/>
        <input name="password" type="password" placeholder="Password (min. 8 chars)" required className="w-full p-3 border rounded-lg"/>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="w-full p-3 bg-blue-600 text-white rounded-lg disabled:opacity-50">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
```

### Protected Dashboard with Role Display

```tsx
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-white border rounded-xl p-6 space-y-3">
        <p><span className="font-semibold">Name:</span> {session.user?.name}</p>
        <p><span className="font-semibold">Email:</span> {session.user?.email}</p>
        <p>
          <span className="font-semibold">Role:</span>{' '}
          <span className={`px-2 py-1 rounded text-sm ${
            session.user?.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {session.user?.role ?? 'user'}
          </span>
        </p>
      </div>

      {/* Admin-only section */}
      {session.user?.role === 'admin' && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="font-bold text-red-700 mb-2">Admin Panel</h2>
          <p className="text-sm text-red-600">This section is only visible to admins.</p>
        </div>
      )}
    </div>
  )
}
```

---

## OAuth Flow Diagram

```svg
<svg viewBox="0 0 720 390" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="720" height="390" fill="#0f172a" rx="12"/>
  <text x="360" y="28" fill="#e2e8f0" font-size="14" font-weight="700" text-anchor="middle">OAuth 2.0 Flow (e.g., Sign in with Google)</text>

  <defs>
    <marker id="oa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>

  <!-- Actors -->
  <rect x="20" y="50" width="100" height="40" rx="7" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="70" y="66" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle">Browser</text>
  <text x="70" y="80" fill="#64748b" font-size="9" text-anchor="middle">(User)</text>
  <line x1="70" y1="90" x2="70" y2="360" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="3"/>

  <rect x="290" y="50" width="140" height="40" rx="7" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="360" y="66" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle">Your Next.js App</text>
  <text x="360" y="80" fill="#64748b" font-size="9" text-anchor="middle">(NextAuth handler)</text>
  <line x1="360" y1="90" x2="360" y2="360" stroke="#1e4a3a" stroke-width="1" stroke-dasharray="3"/>

  <rect x="570" y="50" width="130" height="40" rx="7" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="635" y="66" fill="#fcd34d" font-size="11" font-weight="700" text-anchor="middle">Google / GitHub</text>
  <text x="635" y="80" fill="#64748b" font-size="9" text-anchor="middle">(OAuth Provider)</text>
  <line x1="635" y1="90" x2="635" y2="360" stroke="#3d2e00" stroke-width="1" stroke-dasharray="3"/>

  <!-- Steps -->
  <!-- 1 -->
  <line x1="70" y1="115" x2="355" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="110" fill="#93c5fd" font-size="10" text-anchor="middle">1. Click "Sign in with Google"</text>

  <!-- 2 -->
  <line x1="360" y1="140" x2="75" y2="140" stroke="#10b981" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="135" fill="#6ee7b7" font-size="10" text-anchor="middle">2. Redirect to Google auth URL</text>

  <!-- 3 -->
  <line x1="70" y1="165" x2="630" y2="165" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="350" y="160" fill="#fcd34d" font-size="10" text-anchor="middle">3. Browser goes to Google → user logs into Google</text>

  <!-- 4 -->
  <line x1="635" y1="195" x2="75" y2="195" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="350" y="190" fill="#fcd34d" font-size="10" text-anchor="middle">4. Google redirects back with ?code=AUTH_CODE</text>

  <!-- 5 -->
  <line x1="70" y1="220" x2="355" y2="220" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="215" fill="#93c5fd" font-size="10" text-anchor="middle">5. Browser hits your callback URL</text>

  <!-- 6 -->
  <line x1="360" y1="248" x2="630" y2="248" stroke="#10b981" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="490" y="243" fill="#6ee7b7" font-size="10" text-anchor="middle">6. Server exchanges code for access_token</text>

  <!-- 7 -->
  <line x1="635" y1="273" x2="365" y2="273" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="490" y="268" fill="#fcd34d" font-size="10" text-anchor="middle">7. Google returns access_token + user profile</text>

  <!-- 8 -->
  <rect x="275" y="285" width="170" height="30" rx="5" fill="#1e3a2f" stroke="#10b981" stroke-width="1"/>
  <text x="360" y="298" fill="#6ee7b7" font-size="10" font-weight="700" text-anchor="middle">8. Create/find user in DB,</text>
  <text x="360" y="310" fill="#6ee7b7" font-size="10" font-weight="700" text-anchor="middle">create your session/JWT</text>

  <!-- 9 -->
  <line x1="360" y1="316" x2="75" y2="316" stroke="#10b981" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="311" fill="#6ee7b7" font-size="10" text-anchor="middle">9. Set session cookie → redirect to /dashboard</text>

  <text x="360" y="360" fill="#475569" font-size="9" text-anchor="middle">NextAuth handles steps 2–9 automatically. You only configure providers and callbacks.</text>
</svg>
```

---

## Password Security & Secure Cookies

### Password Security Best Practices

```ts
// ─── Password hashing with bcrypt ───────────────────────
import bcrypt from 'bcryptjs'

// Hashing — always use cost factor 12 or higher in production
const SALT_ROUNDS = 12
const hash = await bcrypt.hash('userPassword123', SALT_ROUNDS)

// Comparing — timing-safe, returns boolean
const isMatch = await bcrypt.compare('userPassword123', hash)

// ─── NEVER DO THESE ─────────────────────────────────────
// ❌ Store plain text passwords
// ❌ Use MD5 or SHA1 for passwords (not designed for passwords)
// ❌ Use a fast hash like SHA256 (too fast = easy to brute force)
// ❌ Use bcrypt cost factor < 10 in production
```

### Secure Cookie Configuration

```ts
// Setting a production-safe auth cookie
import { cookies } from 'next/headers'

function setAuthCookie(token: string) {
  const cookieStore = cookies()

  cookieStore.set('auth-token', token, {
    httpOnly: true,            // JS can't read it (stops XSS)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'lax',           // Prevents CSRF on cross-site requests
    maxAge: 60 * 60 * 24 * 7,  // 7 days
    path: '/',                 // Available to all routes
  })
}
```

| Cookie Attribute | Purpose | Recommended Value |
|---|---|---|
| `httpOnly` | Prevents JS from reading the cookie | `true` |
| `secure` | HTTPS only | `true` in production |
| `sameSite` | CSRF protection | `lax` (or `strict` for maximum security) |
| `maxAge` | Expiry in seconds | 7 days for refresh, 15 min for access |
| `path` | Which routes send the cookie | `/` |

---

## CSRF Basics

**CSRF (Cross-Site Request Forgery)** is an attack where a malicious website tricks your browser into making a request to your app while you're logged in.

```
Attack flow without protection:
  1. You're logged into bank.com
  2. You visit evil.com
  3. evil.com has a hidden form that posts to bank.com/transfer
  4. Your browser sends the request WITH your bank.com cookie
  5. Bank thinks it's you!
```

**Defenses:**

- `sameSite: 'lax'` on cookies — browser won't send cookie on cross-site POST
- CSRF tokens — server generates a unique token, client must send it in the form
- NextAuth.js **handles CSRF protection automatically** (it generates a CSRF token for every sign-in)

```ts
// NextAuth's built-in CSRF token (used automatically by its sign-in forms)
// GET /api/auth/csrf → returns { csrfToken: "..." }
// You can read it to build custom forms:
import { getCsrfToken } from 'next-auth/react'
const csrfToken = await getCsrfToken()
```

---

## Authentication Workflow Diagram

```svg
<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="700" height="420" fill="#0f172a" rx="12"/>
  <text x="350" y="28" fill="#e2e8f0" font-size="14" font-weight="700" text-anchor="middle">Full Authentication Workflow</text>

  <defs>
    <marker id="aw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
    <marker id="awg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4ade80"/>
    </marker>
    <marker id="awr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>

  <!-- Registration path -->
  <text x="40" y="58" fill="#c084fc" font-size="11" font-weight="700">REGISTRATION</text>
  <rect x="30" y="65" width="100" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="80" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Register</text>
  <text x="80" y="93" fill="#64748b" font-size="9" text-anchor="middle">name/email/pass</text>

  <line x1="130" y1="82" x2="165" y2="82" stroke="#c084fc" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="165" y="65" width="100" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="215" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Hash Password</text>
  <text x="215" y="93" fill="#64748b" font-size="9" text-anchor="middle">bcrypt(pass, 12)</text>

  <line x1="265" y1="82" x2="300" y2="82" stroke="#c084fc" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="300" y="65" width="100" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="350" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Save to DB</text>
  <text x="350" y="93" fill="#64748b" font-size="9" text-anchor="middle">user + hash</text>

  <line x1="400" y1="82" x2="435" y2="82" stroke="#c084fc" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="435" y="65" width="110" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="490" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">201 Created</text>
  <text x="490" y="93" fill="#64748b" font-size="9" text-anchor="middle">→ auto sign in</text>

  <!-- Login path -->
  <text x="40" y="138" fill="#3b82f6" font-size="11" font-weight="700">LOGIN</text>
  <rect x="30" y="145" width="100" height="35" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="160" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">Login Form</text>
  <text x="80" y="173" fill="#64748b" font-size="9" text-anchor="middle">email + password</text>

  <line x1="130" y1="162" x2="165" y2="162" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="165" y="145" width="100" height="35" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="215" y="160" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">Find User</text>
  <text x="215" y="173" fill="#64748b" font-size="9" text-anchor="middle">by email in DB</text>

  <line x1="265" y1="162" x2="300" y2="162" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="300" y="145" width="100" height="35" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="350" y="160" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">bcrypt.compare</text>
  <text x="350" y="173" fill="#64748b" font-size="9" text-anchor="middle">pass vs hash</text>

  <!-- Match / No match -->
  <line x1="400" y1="162" x2="435" y2="162" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#aw)"/>

  <polygon points="490,145 540,162 490,179 440,162" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="490" y="158" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">Match?</text>

  <!-- Yes path -->
  <line x1="540" y1="162" x2="575" y2="162" stroke="#4ade80" stroke-width="1.5" marker-end="url(#awg)"/>
  <text x="557" y="156" fill="#4ade80" font-size="9">Yes</text>
  <rect x="575" y="145" width="100" height="35" rx="6" fill="#052e16" stroke="#4ade80" stroke-width="1.5"/>
  <text x="625" y="160" fill="#4ade80" font-size="10" font-weight="700" text-anchor="middle">Issue JWT</text>
  <text x="625" y="173" fill="#64748b" font-size="9" text-anchor="middle">set cookie</text>

  <!-- No path -->
  <line x1="490" y1="179" x2="490" y2="210" stroke="#f87171" stroke-width="1.5" marker-end="url(#awr)"/>
  <text x="505" y="200" fill="#f87171" font-size="9">No</text>
  <rect x="435" y="210" width="110" height="35" rx="6" fill="#450a0a" stroke="#f87171" stroke-width="1.5"/>
  <text x="490" y="225" fill="#f87171" font-size="10" font-weight="700" text-anchor="middle">401 Error</text>
  <text x="490" y="238" fill="#64748b" font-size="9" text-anchor="middle">Invalid credentials</text>

  <!-- Accessing protected route -->
  <text x="40" y="285" fill="#f59e0b" font-size="11" font-weight="700">PROTECTED ROUTE ACCESS</text>
  <rect x="30" y="293" width="110" height="35" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="85" y="308" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Request with</text>
  <text x="85" y="321" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">auth cookie</text>

  <line x1="140" y1="310" x2="175" y2="310" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="175" y="293" width="110" height="35" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="230" y="308" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Middleware</text>
  <text x="230" y="321" fill="#64748b" font-size="9" text-anchor="middle">verify JWT</text>

  <line x1="285" y1="310" x2="320" y2="310" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#aw)"/>

  <polygon points="375,293 425,310 375,327 325,310" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="375" y="306" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Valid</text>
  <text x="375" y="318" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Token?</text>

  <!-- Yes allow -->
  <line x1="425" y1="310" x2="460" y2="310" stroke="#4ade80" stroke-width="1.5" marker-end="url(#awg)"/>
  <text x="442" y="304" fill="#4ade80" font-size="9">Yes</text>
  <rect x="460" y="293" width="110" height="35" rx="6" fill="#052e16" stroke="#4ade80" stroke-width="1.5"/>
  <text x="515" y="308" fill="#4ade80" font-size="10" font-weight="700" text-anchor="middle">Render Page</text>
  <text x="515" y="321" fill="#64748b" font-size="9" text-anchor="middle">with session data</text>

  <!-- No block -->
  <line x1="375" y1="327" x2="375" y2="357" stroke="#f87171" stroke-width="1.5" marker-end="url(#awr)"/>
  <rect x="315" y="358" width="120" height="35" rx="6" fill="#450a0a" stroke="#f87171" stroke-width="1.5"/>
  <text x="375" y="373" fill="#f87171" font-size="10" font-weight="700" text-anchor="middle">Redirect /login</text>
  <text x="375" y="386" fill="#64748b" font-size="9" text-anchor="middle">401 / 403</text>
</svg>
```

---

## Best Practices — Authentication

- **Always hash passwords** with `bcrypt` (cost factor 12+). Never store plain text.
- **Use short-lived access tokens** (15–60 minutes) and refresh them silently.
- **Store tokens in HttpOnly cookies**, not `localStorage` (XSS protection).
- **Use `sameSite: 'lax'`** on auth cookies for CSRF protection.
- **Validate sessions server-side** on protected routes — never trust client-side state alone.
- **Implement rate limiting** on login endpoints to prevent brute-force attacks.
- **Send verification emails** for new accounts before allowing access.
- **Use HTTPS in production** — auth tokens are useless if intercepted in plain text.
- **Never log passwords or tokens** — scrub them from logs.
- **Extend NextAuth session types** to include `role` and `id` — don't cast as `any` everywhere.
- **Use `redirect: false`** in `signIn()` to handle errors client-side.
- **Always call `router.refresh()`** after sign-in to update Server Components with the new session.

---

## Common Mistakes — Authentication

- **Storing JWT in localStorage** — vulnerable to XSS. Use HttpOnly cookies.
- **Not verifying the JWT on the server** — only checking the cookie name, not the signature.
- **Long-lived access tokens** — if stolen, attacker has access for a long time. Use 15-minute tokens.
- **Not extending the NextAuth session type** — `session.user.role` shows a TypeScript error or is typed as `any`.
- **Forgetting `NEXTAUTH_SECRET`** in environment variables — NextAuth silently falls back to a weak secret.
- **Fetching session with `useSession()`** in Server Components — use `getServerSession()` instead.
- **Not wrapping the app in `SessionProvider`** — `useSession()` fails in client components.
- **Not calling `router.refresh()`** after sign-in — Server Components still show the logged-out state.
- **Checking auth only in middleware** — still double-check in the page/API route (defense in depth).
- **Sending passwords over HTTP** — always require HTTPS in production.

---

## Interview Questions — Authentication

**Beginner:**
1. What is the difference between authentication and authorization?
2. Why should passwords never be stored in plain text?
3. What is a JWT and what does it contain?
4. What is an HttpOnly cookie, and why is it more secure than localStorage?

**Intermediate:**
5. How does OAuth work? Walk through the flow step by step.
6. What is the difference between access tokens and refresh tokens?
7. How do you protect a page in the Next.js App Router?
8. What is `getServerSession()` and when would you use it?
9. What is CSRF, and how does `sameSite: 'lax'` help prevent it?
10. How would you implement role-based access control in Next.js?

**Advanced:**
11. How do you implement silent token refresh without interrupting the user experience?
12. What are the security tradeoffs between session-based and JWT-based authentication?
13. How does NextAuth.js handle CSRF protection internally?
14. What is token rotation, and why is it important for refresh tokens?
15. How would you securely implement "remember me" functionality?

---

# Summary

This document covered two of the most critical concepts in modern Next.js development:

**Middleware (Section 11)** runs at the Edge before any page or API route. It is the ideal place for authentication checks, redirects, URL rewrites, logging, and security headers. It uses the Edge Runtime (V8, not Node.js), which means it is extremely fast but has limited API access. The `middleware.ts` file lives at the project root and exports a `middleware` function and a `config` object for route matching.

**Authentication (Section 12)** covers the full spectrum from password hashing and JWT lifecycle to OAuth flows and session management. NextAuth.js (Auth.js) abstracts the complexity of multiple providers, CSRF protection, and session handling into a clean configuration. Proper authentication requires secure cookies, short-lived tokens, server-side session validation, and role-based access control.

---

# Key Takeaways

- Middleware runs **before** pages and API routes, at the **Edge** (not Node.js).
- Use `NextResponse.redirect()` to change the URL, `NextResponse.rewrite()` to serve different content silently.
- Always add a `config.matcher` to avoid running middleware on static files.
- Never make database calls in middleware — use JWTs for stateless auth checks.
- Authentication = "Who are you?"; Authorization = "What can you do?"
- Always hash passwords with bcrypt (cost 12+). Never store plain text.
- Store auth tokens in HttpOnly cookies, never in localStorage.
- Short-lived access tokens + long-lived refresh tokens = secure and seamless UX.
- NextAuth.js handles OAuth, CSRF, sessions, and JWTs with minimal configuration.
- Always double-check auth in Server Components/API routes — middleware is not enough alone.

---

# Practice Exercises

1. Create a `middleware.ts` that redirects all `/old-blog/:slug` paths to `/blog/:slug`.
2. Build authentication middleware that checks for a valid JWT cookie and redirects to `/login` if missing.
3. Implement a logging middleware that writes request method, path, and response time to the console.
4. Add security headers (X-Frame-Options, CSP, HSTS) via middleware.
5. Implement a registration API route (`/api/auth/register`) with bcrypt password hashing.
6. Configure NextAuth.js with a Credentials provider and connect it to a Prisma database.
7. Add Google OAuth to an existing NextAuth configuration.
8. Create a protected dashboard page using `getServerSession()`.
9. Build a role-based admin page that returns 403 for non-admin users.
10. Implement a logout button that calls `signOut()` and redirects to `/login`.

---

# Mini Project Ideas

## Login System

Build a complete login system with:
- Registration page with form validation
- Login page with email/password and Google OAuth
- Email verification flow
- Forgot password / reset password flow
- Protected dashboard showing user info
- Logout functionality

**Tech stack:** Next.js App Router, NextAuth.js, Prisma, PostgreSQL, bcrypt, Resend (email)

---

## Admin Dashboard

Build a multi-role admin dashboard with:
- Public home page
- User registration and login
- User dashboard (role: `user`)
- Editor dashboard — create/edit content (role: `editor`)
- Admin dashboard — manage users, view analytics, delete content (role: `admin`)
- Middleware protecting all `/dashboard` and `/admin` routes
- RBAC enforced both in middleware and in Server Components

**Tech stack:** Next.js App Router, NextAuth.js with role in JWT, Prisma, shadcn/ui

---

## Protected Application

Build a note-taking app where:
- Users must register/login
- Each user can only see their own notes (row-level security)
- Notes are stored in a database
- Protected by middleware (redirect to login if no session)
- API routes check session before returning data
- Refresh token rotation for long sessions

**Tech stack:** Next.js App Router, NextAuth.js, Prisma, PostgreSQL, Tailwind CSS

---

# Interview Preparation

## Beginner Questions

1. What is middleware in Next.js? Where does it run?
2. What is `middleware.ts` and where should it be placed?
3. What is the difference between `redirect()` and `rewrite()` in NextResponse?
4. What is authentication? Give a real-world analogy.
5. What is the difference between a session and a JWT?
6. Why should we use bcrypt instead of SHA256 for password hashing?
7. What is an HttpOnly cookie? Why is it more secure?
8. What does NextAuth.js do?

## Intermediate Questions

9. How do you restrict middleware to specific routes?
10. Why can't you use Node.js APIs (like `fs`) in Next.js middleware?
11. How does OAuth 2.0 work at a high level?
12. What is the difference between access tokens and refresh tokens?
13. How do you access the current user session in a Server Component?
14. What is `sameSite: 'lax'` and how does it prevent CSRF attacks?
15. How would you implement role-based access control in Next.js?
16. What is the purpose of the `jwt` and `session` callbacks in NextAuth.js?

## Advanced Questions

17. How do you verify a JWT at the Edge without Node.js crypto APIs?
18. Explain token rotation and why it matters for refresh tokens.
19. How would you implement silent token refresh in a Next.js app?
20. What are the security tradeoffs between storing JWT in localStorage vs HttpOnly cookies?
21. How does NextAuth.js protect against CSRF attacks internally?
22. How would you implement a permissions system with fine-grained controls (not just roles)?
23. Describe how you'd architect auth for a multi-tenant SaaS application in Next.js.
24. What are the performance implications of running auth checks in middleware vs Server Components?

---

> **Next Up:** Part 3B will cover Advanced Data Fetching, Caching Strategies, and Incremental Static Regeneration (ISR) in the Next.js App Router.
