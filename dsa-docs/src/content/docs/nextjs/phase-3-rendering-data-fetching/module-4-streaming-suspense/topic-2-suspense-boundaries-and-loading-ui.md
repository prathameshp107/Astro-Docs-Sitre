---
title: "Suspense Boundaries & Loading UI"
description: "React's Suspense boundary is the primitive that enables streaming. It lets you declare what to show while a component is loading, and React automatically s"
---

# Suspense Boundaries & Loading UI

## Introduction

React's Suspense boundary is the primitive that enables streaming. It lets you declare what to show while a component is loading, and React automatically swaps in the real content when it's ready. Next.js extends this with file-convention-based loading states.

## Why Do We Need This?

Users hate waiting with no feedback. A blank screen for 3 seconds feels like an eternity. A skeleton or spinner that appears immediately makes the wait feel shorter. Suspense boundaries give you fine-grained control over these loading states — exactly which parts show placeholders, and what those placeholders look like.

## Page-Level Loading: `loading.tsx`

Every route segment can have a `loading.tsx` file. Next.js automatically wraps the segment's `page.tsx` in a Suspense boundary:

```
app/
  dashboard/
    page.tsx          # Main content
    loading.tsx       # Shows while page.tsx renders
    layout.tsx        # Layout renders immediately
```

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
    </div>
  )
}
```

The layout above the loading boundary renders immediately. Only the page content waits.

## Granular Suspense Boundaries

For pages with multiple independent sections, use `<Suspense>` directly for better UX:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { PostList, UserProfile, TrendingSidebar } from '@/components'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-8">
      <main className="space-y-8">
        <UserProfile /> {/* Fast — no boundary needed */}
        
        <Suspense fallback={<PostSkeleton count={5} />}>
          <PostList /> {/* Streams when data is ready */}
        </Suspense>
      </main>
      
      <aside>
        <Suspense fallback={<SidebarSkeleton />}>
          <TrendingSidebar />
        </Suspense>
      </aside>
    </div>
  )
}
```

Each Suspense boundary is independent. `PostList` can still be streaming while `TrendingSidebar` has already rendered.

## Suspense with async Server Components

Suspense boundaries automatically work with async Server Components:

```tsx
// app/posts/page.tsx
import { Suspense } from 'react'

// This function is a Server Component — it fetches and renders
async function RecentPosts() {
  const posts = await fetch('https://api.example.com/posts')
    .then(r => r.json())
  
  return posts.map(post => (
    <article key={post.id} className="border-b py-4">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-600">{post.excerpt}</p>
    </article>
  ))
}

export default function PostsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Recent Posts</h1>
      <Suspense fallback={<div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded bg-gray-100" />
        ))}
      </div>}>
        <RecentPosts />
      </Suspense>
    </div>
  )
}
```

## Nested Suspense & Layout Streaming

Suspense boundaries compose naturally. Inner boundaries can have their own fallbacks:

```tsx
// app/products/page.tsx
export default function ProductsPage() {
  return (
    <div className="space-y-12">
      {/* Hero section streams first */}
      <Suspense fallback={<HeroSkeleton />}>
        <ProductHero />
      </Suspense>
      
      {/* Product grid streams next — with its own inner suspense */}
      <Suspense fallback={<GridSkeleton columns={4} />}>
        <ProductGrid>
          <Suspense fallback={<CardSkeleton />}>
            <FeaturedProduct />
          </Suspense>
        </ProductGrid>
      </Suspense>
    </div>
  )
}
```

## Suspense Key for Navigation

When navigating between similar pages, the `key` prop tells Suspense to re-trigger:

```tsx
// app/posts/[id]/page.tsx
export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <Suspense key={params.id} fallback={<PostSkeleton />}>
      <PostContent id={params.id} />
    </Suspense>
  )
}
```

Without `key`, Suspense might reuse the previous content while new data loads.

## Loading UI Patterns

| Pattern | When to Use | Implementation |
|---------|-------------|----------------|
| **Spinner** | Quick operations (<1s) | Simple rotating icon |
| **Skeleton** | Content loading (1-3s) | Gray boxes matching layout shape |
| **Progressive** | Slow sections (3s+) | Show partial content, then stream rest |
| **Skeleton + Spinner** | Unknown duration | Skeleton initially, spinner if delayed |

```tsx
// Skeleton example — matches the actual content shape
function PostSkeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded-xl border p-6">
      <div className="h-4 w-1/4 rounded bg-gray-200" />
      <div className="h-6 w-3/4 rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-5/6 rounded bg-gray-200" />
    </div>
  )
}
```

## Common Mistakes

- **Not wrapping async components in Suspense** — This causes the entire page to be blocked.
- **Complex skeletons causing layout shift** — Match skeleton dimensions to the actual content size.
- **Too many boundaries** — Each Suspense boundary adds server overhead. Group related content.
- **Missing `key` on dynamic routes** — Old content flashes before new content streams in.

## Best Practices

- Always provide a `loading.tsx` for data-fetching pages
- Use skeletons over spinners — they set expectation of content shape
- Keep fallbacks lightweight — they render before data is fetched
- Match skeleton dimensions to real content to prevent Cumulative Layout Shift (CLS)
- Use the `key` prop on Suspense for dynamic routes

## Summary

`loading.tsx` and `<Suspense>` are your primary tools for progressive rendering. Use `loading.tsx` for page-level streaming and `<Suspense>` for granular control. Match your fallback UI to the expected content shape, and keep boundaries at a reasonable granularity.

## Related Topics

- [Understanding Streaming](./topic-1-understanding-streaming-in-nextjs.md)
- [Streaming Architecture & Best Practices](./topic-3-streaming-architecture-and-best-practices.md)
- [Server Components (Module 1)](../module-1-server-components/)
