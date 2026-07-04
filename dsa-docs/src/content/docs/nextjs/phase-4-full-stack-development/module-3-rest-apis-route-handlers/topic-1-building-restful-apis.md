---
title: "Building RESTful APIs"
description: "Route Handlers (route.ts) are Next.js's native way to build API endpoints. They run on the server, support all HTTP methods, and integrate with Next.js's c"
---

# Building RESTful APIs

## Introduction

Route Handlers (`route.ts`) are Next.js's native way to build API endpoints. They run on the server, support all HTTP methods, and integrate with Next.js's caching and middleware system.

## Basic CRUD API

```ts
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/posts — List posts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  
  const posts = await db.post.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  })
  
  const total = await db.post.count()
  
  return NextResponse.json({
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
  })
}

// POST /api/posts — Create post
export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const validated = createPostSchema.safeParse(body)
  if (!validated.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validated.error.flatten() },
      { status: 400 }
    )
  }
  
  const post = await db.post.create({
    data: { ...validated.data, authorId: session.user.id }
  })
  
  return NextResponse.json({ data: post }, { status: 201 })
}
```

## Dynamic Route Handlers

```ts
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/posts/123
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({ where: { id: params.id } })
  
  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ data: post })
}

// PUT /api/posts/123
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  
  const validated = updatePostSchema.safeParse(body)
  if (!validated.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
  }
  
  const post = await db.post.update({
    where: { id: params.id },
    data: validated.data,
  })
  
  return NextResponse.json({ data: post })
}

// DELETE /api/posts/123
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.post.delete({ where: { id: params.id } })
  
  return new NextResponse(null, { status: 204 })
}
```

## Error Handling Patterns

```ts
// app/api/users/route.ts
import { NextResponse } from 'next/server'

async function handleApiError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A record with this value already exists' },
        { status: 409 }
      )
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      )
    }
  }
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}

// Usage
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const user = await db.user.create({ data: body })
    return NextResponse.json({ data: user }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
```

## API Versioning

```ts
// app/api/v1/posts/route.ts — v1 (stable)
export async function GET() {
  const posts = await db.post.findMany()
  return NextResponse.json({ data: posts, version: '1.0' })
}

// app/api/v2/posts/route.ts — v2 (new version)
export async function GET() {
  const posts = await db.post.findMany({
    include: { author: true, tags: true }
  })
  return NextResponse.json({ data: posts, version: '2.0' })
}
```

## Request Logging Middleware

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    console.log(`[API] ${request.method} ${request.nextUrl.pathname}`)
    
    const start = Date.now()
    const response = NextResponse.next()
    
    response.headers.set('X-Response-Time', `${Date.now() - start}ms`)
    return response
  }
}
```

## Common Mistakes

- **Not validating request bodies** — Always validate with Zod before processing
- **Returning raw database errors** — Prisma errors contain sensitive info. Map them to safe messages.
- **Missing proper status codes** — Use 201 for created, 204 for deleted, 404 for not found
- **Not handling JSON parse errors** — Wrap `request.json()` in try/catch

## Best Practices

- Use consistent response shapes (`{ data, error, pagination }`)
- Return appropriate HTTP status codes for each operation
- Validate all inputs with Zod before processing
- Log API errors with enough context for debugging
- Consider API versioning for public endpoints

## Summary

RESTful APIs with Route Handlers follow the same patterns as any backend framework: CRUD endpoints, proper status codes, input validation, and error handling. Use NextResponse for JSON responses and handle errors gracefully with structured error responses.

## Related Topics

- [API Security & Rate Limiting](./topic-2-api-security-and-rate-limiting.md)
- [Third-party API Integration](./topic-3-third-party-api-integration.md)
- [Database Patterns (Module 1)](../module-1-database-integration/topic-4-database-patterns.md)
