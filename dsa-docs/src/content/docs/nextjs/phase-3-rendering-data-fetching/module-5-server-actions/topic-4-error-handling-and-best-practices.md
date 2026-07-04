# Error Handling & Best Practices

## Introduction

Production-ready Server Actions need robust error handling, logging, and consistent response patterns. This topic covers how to structure errors, handle edge cases, and follow best practices for maintainable Server Actions.

## Error Handling Patterns

### Structured Error Responses

Always return structured objects instead of relying on thrown errors:

```tsx
"use server"

type ActionResult = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
  data?: any
}

export async function createPost(_prevState: unknown, formData: FormData): Promise<ActionResult> {
  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    
    if (!title || title.length < 3) {
      return { success: false, fieldErrors: { title: 'Title must be at least 3 characters' } }
    }
    
    const post = await db.post.create({ data: { title, content } })
    revalidatePath('/posts')
    
    return { success: true, data: post }
  } catch (error) {
    console.error('Failed to create post:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
```

### Zod Validation with Detailed Errors

```tsx
"use server"

import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(5000),
  categoryId: z.string().uuid(),
  tags: z.array(z.string()).max(5).optional(),
  published: z.coerce.boolean(),
})

export async function createPost(prevState: unknown, formData: FormData) {
  const parsed = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    categoryId: formData.get('categoryId'),
    tags: formData.getAll('tag'),
    published: formData.get('published'),
  })
  
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Validation failed'
    }
  }
  
  try {
    await db.post.create({ data: parsed.data })
    revalidatePath('/posts')
    return { message: 'Post created!' }
  } catch (error) {
    console.error('Create post error:', error)
    return { message: 'Database error. Please try again.' }
  }
}
```

### Rate Limiting

```tsx
"use server"

// Uses a rate limiting library like upstash-rate-limit or @arcjet/next
import { rateLimit } from '@/lib/rate-limit'

export async function submitContact(prevState: unknown, formData: FormData) {
  const identifier = formData.get('email') as string
  
  const { success } = await rateLimit(identifier, { limit: 3, window: '60s' })
  
  if (!success) {
    return { error: 'Too many requests. Please wait before trying again.' }
  }
  
  // Proceed with the action
}
```

## Consistent Response Types

Use a shared type for all action responses:

```tsx
// app/actions/types.ts
export type ActionResponse = {
  success: boolean
  message?: string
  errors?: Record<string, string[]>
  data?: unknown
}
```

```tsx
// app/actions/posts.ts
"use server"

import { ActionResponse } from './types'

export async function createPost(formData: FormData): Promise<ActionResponse> {
  // ...
}
```

## Logging & Monitoring

```tsx
"use server"

import { logger } from '@/lib/logger'

export async function processOrder(formData: FormData) {
  const orderId = formData.get('orderId') as string
  
  logger.info('Processing order', { orderId, userId: '...' })
  
  try {
    const result = await db.order.update({
      where: { id: orderId },
      data: { status: 'PROCESSING' }
    })
    
    logger.info('Order processed successfully', { orderId })
    revalidatePath(`/orders/${orderId}`)
    
    return { success: true }
  } catch (error) {
    logger.error('Order processing failed', { orderId, error })
    return { success: false, error: 'Failed to process order' }
  }
}
```

## Revalidation Strategies

| Strategy | Function | Use Case |
|----------|----------|----------|
| Full path | `revalidatePath('/posts')` | Clear entire page cache |
| Dynamic path | `revalidatePath('/posts/[slug]', 'page')` | Clear specific dynamic page |
| Layout | `revalidatePath('/dashboard', 'layout')` | Clear layout and all children |
| Tag | `revalidateTag('posts')` | Clear all fetches tagged with 'posts' |

```tsx
"use server"

import { revalidatePath, revalidateTag } from 'next/cache'

export async function publishPost(postId: string) {
  await db.post.update({ where: { id: postId }, data: { published: true } })
  
  // Revalidate everything related
  revalidatePath('/posts')
  revalidatePath(`/posts/${postId}`)
  revalidateTag('post-list')
  revalidateTag(`post-${postId}`)
}
```

## Security Considerations

### Input Sanitization

```tsx
"use server"

import DOMPurify from 'isomorphic-dompurify'
import { z } from 'zod'

export async function updateBio(prevState: unknown, formData: FormData) {
  const raw = formData.get('bio') as string
  
  // Sanitize HTML content
  const sanitized = DOMPurify.sanitize(raw)
  
  const validated = z.string().max(500).safeParse(sanitized)
  if (!validated.success) {
    return { error: 'Bio must be under 500 characters' }
  }
  
  await db.user.update({ where: { id: userId }, data: { bio: validated.data } })
  revalidatePath('/profile')
}
```

### Authorization Checks

```tsx
"use server"

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function deletePost(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized' }
  }
  
  const postId = formData.get('postId') as string
  const post = await db.post.findUnique({ where: { id: postId } })
  
  // Check ownership
  if (post?.authorId !== session.user.id) {
    return { error: 'You can only delete your own posts' }
  }
  
  await db.post.delete({ where: { id: postId } })
  revalidatePath('/posts')
}
```

## Performance Best Practices

- **Keep actions focused** — Each action should do one thing. Don't create a single "super action" that handles everything.
- **Avoid unnecessary revalidation** — Only revalidate the paths that actually changed. Over-revalidation hurts performance.
- **Use tags for granular cache invalidation** — `revalidateTag` is more targeted than `revalidatePath`.
- **Handle serverless cold starts** — Keep database connections warm with connection pooling.

## Common Mistakes

- **Swallowing errors** — Catching without logging or meaningful error messages
- **Over-validation on server** — Don't re-validate what the database schema already validates (e.g., unique constraints)
- **Missing CSRF protection** — Server Actions include CSRF tokens automatically, but be careful with custom headers
- **Slow actions blocking other requests** — Heavy operations (resizing images, sending emails) should be offloaded to queues

## Summary

Error handling in Server Actions should follow a consistent pattern: validate input with Zod, return structured responses, authorize every mutation, and revalidate caches precisely. Log errors for debugging and use rate limiting for public actions. Always return user-friendly error messages, never raw database errors.

## Related Topics

- [Forms & Mutations](./topic-2-forms-and-mutations.md)
- [Server Actions with Database](./topic-3-server-actions-with-database.md)
- [Middleware (Phase 2)](../../phase-2-app-router/module-3-route-handlers-middleware/topic-3-middleware-basics.md)
