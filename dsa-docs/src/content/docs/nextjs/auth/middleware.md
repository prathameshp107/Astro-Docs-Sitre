---
title: "Middleware"
description: "Middleware is a function that runs before a request reaches your page or API route. Think of it as a security guard at the entrance of a building — every v"
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

```txt
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

```txt
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
