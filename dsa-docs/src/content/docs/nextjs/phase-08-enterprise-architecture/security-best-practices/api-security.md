---
title: "API Security"
description: "API routes handle sensitive operations — creating data, processing payments, accessing user information. Securing them is critical."
---

# API Security

## Introduction

API routes handle sensitive operations — creating data, processing payments, accessing user information. Securing them is critical.

## Common API Threats

| Threat | Description | Prevention |
|--------|-------------|------------|
| Unauthorized access | Unauthenticated users accessing protected data | Authentication check |
| Injection attacks | SQL, NoSQL, or command injection | Use ORM, validate input |
| Rate limiting abuse | Too many requests overwhelming the server | Rate limiting |
| IDOR | Accessing another user's data by changing an ID | Ownership check |

## Authentication Check

Every protected API route should start with an auth check:

```ts
// app/api/posts/route.ts
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
  
  // Proceed with authenticated logic
}
```

## Input Validation

Always validate and sanitize user input:

```ts
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(5000),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = createPostSchema.safeParse(body)
  
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  
  // parsed.data is safely typed
}
```

## Ownership Checks

Prevent users from accessing other users' data:

```ts
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const post = await db.post.findUnique({ where: { id: params.id } })
  
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  if (post.authorId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  await db.post.delete({ where: { id: params.id } })
  return new NextResponse(null, { status: 204 })
}
```

## Rate Limiting

```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  
  // Proceed
}
```

## Common Mistakes

- **Not validating input** — Trusting user input without validation is the most common security vulnerability.
- **Inconsistent auth checks** — Checking auth in one route but not another. Apply it consistently.
- **No rate limiting on public endpoints** — Public APIs without rate limits can be abused.

## Best Practices

- Validate every input with Zod or similar
- Check authentication at the start of every protected handler
- Return appropriate status codes (401, 403, 404, 429)
- Use rate limiting for public endpoints
- Never expose internal error details to the client

## Summary

Secure API routes with authentication checks, input validation, ownership verification, and rate limiting. Validate with Zod, check session at the start of every handler, and never trust user input.

## Related Topics

- [Authentication Best Practices](./authentication-best-practices.md)
- [Authorization Best Practices](./authorization-best-practices.md)
- [Common Security Mistakes](./common-security-mistakes.md)
