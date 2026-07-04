---
title: "Server Actions with Database"
description: "Server Actions naturally integrate with databases. Since they run on the server, they can directly use Prisma, Drizzle, or any other ORM. This eliminates t"
---

# Server Actions with Database

## Introduction

Server Actions naturally integrate with databases. Since they run on the server, they can directly use Prisma, Drizzle, or any other ORM. This eliminates the need for separate API endpoints for database mutations.

## Direct Database Access

```tsx
// app/actions/posts.ts
"use server"

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  const post = await db.post.create({
    data: { title, content, published: false }
  })
  
  revalidatePath('/posts')
  return { postId: post.id }
}
```

## Prisma Integration

### Read Operations

```tsx
// app/posts/page.tsx (Server Component)
import { db } from '@/lib/prisma'

export default async function PostsPage() {
  const posts = await db.post.findMany({
    include: { author: true, _count: { select: { comments: true } } },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <article key={post.id} className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-500 text-sm">
            By {post.author.name} · {post._count.comments} comments
          </p>
        </article>
      ))}
    </div>
  )
}
```

### Write Operations

```tsx
// app/actions/posts.ts
"use server"

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function publishPost(formData: FormData) {
  const postId = formData.get('postId') as string
  
  await db.post.update({
    where: { id: postId },
    data: { published: true, publishedAt: new Date() }
  })
  
  revalidatePath(`/posts/${postId}`)
}

export async function deletePost(formData: FormData) {
  const postId = formData.get('postId') as string
  
  await db.post.delete({
    where: { id: postId }
  })
  
  revalidatePath('/posts')
}
```

## Drizzle Integration

```tsx
// app/actions/users.ts
"use server"

import { db } from '@/lib/drizzle'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const userId = formData.get('userId') as string
  const name = formData.get('name') as string
  const bio = formData.get('bio') as string
  
  await db.update(users)
    .set({ name, bio, updatedAt: new Date() })
    .where(eq(users.id, userId))
  
  revalidatePath(`/profile/${userId}`)
}
```

## Transaction Patterns

For operations involving multiple related changes, use database transactions:

```tsx
"use server"

export async function transferPoints(formData: FormData) {
  const fromUser = formData.get('fromUserId') as string
  const toUser = formData.get('toUserId') as string
  const amount = Number(formData.get('amount'))
  
  // Both operations succeed or both fail
  await db.$transaction([
    db.user.update({
      where: { id: fromUser },
      data: { points: { decrement: amount } }
    }),
    db.user.update({
      where: { id: toUser },
      data: { points: { increment: amount } }
    }),
    db.transactionLog.create({
      data: { fromUser, toUser, amount, type: 'POINT_TRANSFER' }
    })
  ])
  
  revalidatePath('/dashboard')
}
```

## Optimistic Updates with Server Actions

For a snappy UX, combine Server Actions with optimistic UI:

```tsx
// app/posts/[id]/page.tsx
"use client"

import { useOptimistic } from 'react'
import { addComment } from './actions'

export default function PostPage({ post, comments }) {
  const [optimisticComments, setOptimisticComments] = useOptimistic(comments)
  
  async function handleSubmit(formData: FormData) {
    const content = formData.get('comment') as string
    
    setOptimisticComments(prev => [...prev, {
      id: 'temp',
      content,
      createdAt: new Date().toISOString(),
      author: { name: 'You' }
    }])
    
    await addComment(formData)
  }
  
  return (
    <form action={handleSubmit}>
      {/* ... */}
    </form>
  )
}
```

## File Uploads with Server Actions

Server Actions can handle file uploads via FormData:

```tsx
"use server"

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadAvatar(formData: FormData) {
  const file = formData.get('avatar') as File
  
  if (!file || file.size > 5 * 1024 * 1024) {
    return { error: 'File too large (max 5MB)' }
  }
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const filename = `${Date.now()}-${file.name}`
  const path = join('public/uploads', filename)
  await writeFile(path, buffer)
  
  revalidatePath('/settings')
  return { url: `/uploads/${filename}` }
}
```

## Common Mistakes

- **No connection pooling** — When using serverless, ensure your database connection uses pooling (Prisma Accelerate, PgBouncer, etc.)
- **Missing input validation** — Always validate and sanitize database inputs. Use Zod to parse before writing.
- **N+1 queries in Server Components** — Use Prisma's `include` or Drizzle's `with` to eager-load relations.
- **Not handling concurrent mutations** — Use transactions or optimistic locking for critical operations.

## Best Practices

- Use an ORM (Prisma or Drizzle) for type safety and migrations
- Always validate input before database operations
- Use database transactions for multi-step mutations
- Implement proper error handling — return errors, don't let them crash the server
- Revalidate affected paths after every mutation

## Summary

Server Actions integrate directly with your database layer. Use Prisma or Drizzle for type-safe queries, transactions for atomic operations, and always validate inputs server-side. Combine with optimistic UI for a responsive user experience.

## Related Topics

- [Introduction to Server Actions](./topic-1-introduction-to-server-actions.md)
- [Forms & Mutations](./topic-2-forms-and-mutations.md)
- [Error Handling & Best Practices](./topic-4-error-handling-and-best-practices.md)
- [Route Handlers (Phase 2)](../../phase-2-app-router/module-3-route-handlers-middleware/)
