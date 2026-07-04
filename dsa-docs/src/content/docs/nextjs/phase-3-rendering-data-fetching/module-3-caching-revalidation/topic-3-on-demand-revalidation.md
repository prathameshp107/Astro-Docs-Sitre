---
title: "On-demand Revalidation"
description: "// After creating a new post export default async function createPost(formData: FormData) { const post = await db.post.create({ data: { title: formData.get"
---

# On-demand Revalidation

## Introduction
On-demand revalidation lets you purge cached data instantly when content changes — without waiting for time-based ISR. When you publish a new blog post, update a product, or modify CMS content, you can trigger immediate revalidation via `revalidatePath` or `revalidateTag`.

## revalidatePath vs revalidateTag

| Function | What it does | Use case |
|----------|-------------|----------|
| `revalidatePath(path)` | Purges cache for a specific URL path | Blog post published → revalidate `/blog` |
| `revalidateTag(tag)` | Purges all fetch requests with a tag | CMS update → revalidate all `posts` tagged fetches |

## revalidatePath

```tsx
import { revalidatePath } from 'next/cache'

// After creating a new post
export default async function createPost(formData: FormData) {
  const post = await db.post.create({ data: { title: formData.get('title') } })
  
  // Revalidate the blog listing and the new post page
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  
  return { success: true }
}
```

## revalidateTag

First, tag your fetches:

```tsx
export default async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] } // Tag this fetch with 'posts'
  }).then(r => r.json())
  
  return <BlogList posts={posts} />
}
```

Then revalidate by tag:

```tsx
import { revalidateTag } from 'next/cache'

export default async function updatePost(id: string, data: any) {
  await db.post.update({ where: { id }, data })
  
  // This revalidates ALL fetch calls tagged with 'posts'
  revalidateTag('posts')
  
  return { success: true }
}
```

## Webhook-based Revalidation (Production)

For CMS-driven sites, trigger revalidation via webhook:

```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { secret, path, tag } = await request.json()
  
  // Verify secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  if (path) revalidatePath(path)
  if (tag) revalidateTag(tag)
  
  return NextResponse.json({ revalidated: true })
}
```

Configure your CMS to POST to `/api/revalidate` whenever content is published.

## Comparison Table

| Method | Granularity | Use Case | Example |
|--------|------------|----------|---------|
| `revalidatePath('/blog')` | Route-level | Specific page needs refresh | New blog post |
| `revalidateTag('posts')` | Data-level | All tagged data needs refresh | CMS content update |
| Time-based ISR | Time-granular | Predictable update cycles | News site |
| Webhook | Event-driven | CMS publishing workflow | Headless CMS |

## Best Practices
1. **Use tags over paths** — More granular, revalidates exactly what changed
2. **Secure webhook endpoints** — Use a secret to prevent abuse
3. **Combine with ISR** — Use on-demand for critical updates, ISR for routine freshness
4. **Call revalidation after mutations** — Inside Server Actions or Route Handlers

## Common Mistakes
- Not securing webhook endpoints (anyone can trigger revalidation)
- Calling `revalidatePath` with the wrong path (case-sensitive)
- Using `revalidateTag` without tagging fetches first (no effect)
- Over-revalidating — revalidating entire site when only one page changed

## Summary
On-demand revalidation (`revalidatePath` and `revalidateTag`) lets you instantly refresh cached content when data changes. Use tags for granular control, paths for page-level refreshes, and webhooks for CMS integration.

## Related Topics
- [ISR with App Router](./topic-2-isr-with-app-router.md)
- [Understanding Next.js Caching](./topic-1-understanding-nextjs-caching.md)
- [Server Actions (Module 5)](../module-5-server-actions/)
