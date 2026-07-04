# API Security & Rate Limiting

## Introduction

Public APIs need protection against abuse, unauthorized access, and common web vulnerabilities. This topic covers securing Next.js Route Handlers with authentication, CORS, rate limiting, and input validation.

## CORS Configuration

For public APIs consumed by other domains, configure CORS:

```ts
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  // Origin check
  const origin = request.headers.get('origin')
  if (origin && !isAllowedOrigin(origin)) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
  }
  
  const posts = await db.post.findMany()
  return NextResponse.json({ data: posts }, { headers: corsHeaders })
}
```

## Authentication for Route Handlers

```ts
// app/api/posts/route.ts
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
  
  const body = await request.json()
  const post = await db.post.create({
    data: { ...body, authorId: session.user.id }
  })
  
  return NextResponse.json({ data: post }, { status: 201 })
}
```

### API Key Authentication

```ts
// app/api/external/route.ts
export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return NextResponse.json(
      { error: 'Invalid API key' },
      { status: 401 }
    )
  }
  
  return NextResponse.json({ data: await fetchData() })
}
```

## Rate Limiting

Using Upstash Rate Limiting:

```ts
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})
```

```ts
// app/api/posts/route.ts
import { rateLimiter } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  const { success, limit, remaining, reset } = await rateLimiter.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      }
    )
  }
  
  return NextResponse.json({ data: await getPosts() })
}
```

## Middleware-based API Protection

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  // Rate limiting check
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { success } = await rateLimiter.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
```

## Input Validation & Sanitization

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { rateLimiter } from '@/lib/rate-limit'

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const validated = contactSchema.safeParse(body)
  if (!validated.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validated.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  
  // Sanitize user input
  const sanitized = {
    ...validated.data,
    message: DOMPurify.sanitize(validated.data.message),
  }
  
  // Store safely
  await db.contact.create({ data: sanitized })
  
  return NextResponse.json({ message: 'Message sent' }, { status: 201 })
}
```

## Headers Security

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}
```

## Common Mistakes

- **Relying only on origin headers for CORS** — Origin headers can be spoofed. Combine with authentication for sensitive endpoints.
- **Not rate-limiting public endpoints** — Public APIs without rate limits are vulnerable to DDoS.
- **Trusting request body blindly** — Always validate and sanitize user input.
- **Exposing internal error details** — Don't return stack traces or database error details to the client.

## Best Practices

- Always authenticate API requests for sensitive operations
- Rate limit all public endpoints
- Use CORS headers only when the API is consumed by different origins
- Validate and sanitize all user input before processing
- Set security headers via middleware or `next.config.js`

## Summary

API security requires multiple layers: authentication for access control, rate limiting for abuse prevention, input validation for data integrity, and security headers for browser protection. Never trust the client — validate everything on the server.

## Related Topics

- [Building RESTful APIs](./topic-1-building-restful-apis.md)
- [Third-party API Integration](./topic-3-third-party-api-integration.md)
- [Middleware (Phase 2)](../../phase-2-app-router/module-3-route-handlers-middleware/topic-3-middleware-basics.md)
