---
title: "Protected API Routes"
description: "API routes (Route Handlers) often need authentication — they should only return data if the user is logged in. Protecting them is essential for data securi"
---

# Protected API Routes

## Introduction

API routes (Route Handlers) often need authentication — they should only return data if the user is logged in. Protecting them is essential for data security.

## Why Do We Need This?

Unprotected API routes expose data to anyone who knows the URL. Even if the UI hides certain features, the underlying API must enforce access control.

## Basic Protected API Route

```ts
// app/api/posts/route.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
  
  const posts = await db.post.findMany()
  return NextResponse.json({ data: posts })
}
```

## Protecting POST/PUT/DELETE

```ts
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  const post = await db.post.create({
    data: { ...body, authorId: session.user.id },
  })
  
  revalidatePath('/posts') // Refresh cached pages
  
  return NextResponse.json({ data: post }, { status: 201 })
}
```

## API Route Protection Patterns

| Pattern | When to Use | Implementation |
|---------|-------------|----------------|
| Check session | All protected routes | `getServerSession()` + 401 |
| Check role | Admin-only endpoints | Check `session.user.role === 'admin'` |
| Check ownership | User-specific data | Compare `session.user.id` with resource owner |

## Ownership Check Example

```ts
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const post = await db.post.findUnique({ where: { id: params.id } })
  
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  
  if (post.authorId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  await db.post.delete({ where: { id: params.id } })
  return new NextResponse(null, { status: 204 })
}
```

## Common Mistakes

- **Not returning proper status codes** — Use 401 for unauthenticated, 403 for unauthorized (forbidden)
- **Exposing data that should be filtered by user** — A list of "my posts" should filter by `session.user.id`
- **Only checking auth in middleware** — API routes must check auth themselves

## Best Practices

- Check `getServerSession()` at the start of every protected handler
- Return 401 for missing session, 403 for insufficient permissions
- Filter database queries by the authenticated user
- Never expose data that the user shouldn't access

## Summary

Protect API routes with `getServerSession()` at the start of each handler. Return proper status codes (401 for unauthenticated, 403 for forbidden). Always filter database results by the authenticated user.

## Related Topics

- [Middleware](./middleware.md)
- [Protected Pages](./protected-pages.md)
- [Role-Based Access](./role-based-access.md)
