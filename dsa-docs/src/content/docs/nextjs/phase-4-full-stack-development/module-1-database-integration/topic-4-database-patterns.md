# Database Patterns

## Introduction

Beyond basic CRUD, production applications need pagination, search, query caching, and transactional integrity. This topic covers common database patterns for Next.js applications.

## Cursor-based Pagination

Offset pagination (`skip`/`take`) becomes inefficient on large datasets. Cursor-based pagination is more performant:

```ts
// app/actions/posts.ts
"use server"

import { db } from '@/lib/db'

export async function getPosts(cursor?: string) {
  const take = 10
  
  const posts = await db.post.findMany({
    take: take + 1, // Fetch one extra to check if there's a next page
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  })
  
  const hasNextPage = posts.length > take
  const data = hasNextPage ? posts.slice(0, take) : posts
  const nextCursor = hasNextPage ? data[data.length - 1].id : null
  
  return { posts: data, nextCursor }
}
```

```tsx
// app/posts/page.tsx
"use client"

import { useState } from 'react'

export default function PostsClient({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts.posts)
  const [cursor, setCursor] = useState(initialPosts.nextCursor)
  
  async function loadMore() {
    const result = await getPosts(cursor)
    setPosts(prev => [...prev, ...result.posts])
    setCursor(result.nextCursor)
  }
  
  return (
    <>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
      {cursor && <button onClick={loadMore}>Load More</button>}
    </>
  )
}
```

## Full-Text Search

### PostgreSQL Full-Text Search

```ts
import { db } from '@/lib/db'
import { posts } from '@/db/schema'
import { sql, ilike, or } from 'drizzle-orm'

export async function searchPosts(query: string) {
  return db.select()
    .from(posts)
    .where(
      or(
        ilike(posts.title, `%${query}%`),
        ilike(posts.content, `%${query}%`),
      )
    )
    .limit(20)
}

// Better: PostgreSQL tsvector
export async function searchPostsFullText(query: string) {
  return db.select()
    .from(posts)
    .where(
      sql`to_tsvector('english', ${posts.title} || ' ' || ${posts.content}) @@ plainto_tsquery('english', ${query})`
    )
    .orderBy(
      sql`ts_rank(to_tsvector('english', ${posts.title} || ' ' || ${posts.content}), plainto_tsquery('english', ${query})) DESC`
    )
}
```

## Query Caching

Cache expensive database queries with Next.js's built-in data cache:

```ts
// app/page.tsx (Server Component)
import { unstable_cache } from 'next/cache'
import { db } from '@/lib/db'

const getCachedPosts = unstable_cache(
  async () => {
    return db.post.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
  },
  ['posts-list'],
  { revalidate: 60, tags: ['posts'] }
)

export default async function PostsPage() {
  const posts = await getCachedPosts()
  return <div>{/* render */}</div>
}
```

## Transactions

### Prisma

```ts
// app/actions/order.ts
"use server"

import { db } from '@/lib/db'

export async function placeOrder(formData: FormData) {
  await db.$transaction(async (tx) => {
    const product = await tx.product.findUniqueOrThrow({
      where: { id: formData.get('productId') as string }
    })
    
    if (product.stock < 1) throw new Error('Out of stock')
    
    await tx.product.update({
      where: { id: product.id },
      data: { stock: { decrement: 1 } }
    })
    
    await tx.order.create({
      data: {
        productId: product.id,
        userId: formData.get('userId') as string,
        total: product.price,
      }
    })
  })
  
  revalidatePath('/orders')
}
```

### Drizzle

```ts
import { db } from '@/db'
import { products, orders } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export async function placeOrder(formData: FormData) {
  await db.transaction(async (tx) => {
    const product = await tx.query.products.findFirst({
      where: eq(products.id, Number(formData.get('productId')))
    })
    
    if (!product || product.stock < 1) throw new Error('Out of stock')
    
    await tx.update(products)
      .set({ stock: sql`stock - 1` })
      .where(eq(products.id, product.id))
    
    await tx.insert(orders)
      .values({ productId: product.id, userId: formData.get('userId') as string })
  })
}
```

## Filtering & Sorting

```ts
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const products = await db.product.findMany({
    where: {
      ...(searchParams.get('category') && {
        category: searchParams.get('category')!
      }),
      ...(searchParams.get('minPrice') && {
        price: { gte: Number(searchParams.get('minPrice')) }
      }),
      ...(searchParams.get('maxPrice') && {
        price: { lte: Number(searchParams.get('maxPrice')) }
      }),
      ...(searchParams.get('search') && {
        OR: [
          { name: { contains: searchParams.get('search')!, mode: 'insensitive' } },
          { description: { contains: searchParams.get('search')!, mode: 'insensitive' } },
        ]
      }),
    },
    orderBy: {
      [searchParams.get('sort') || 'createdAt']: searchParams.get('order') || 'desc',
    },
    take: Number(searchParams.get('limit')) || 20,
    skip: Number(searchParams.get('offset')) || 0,
  })
  
  return NextResponse.json(products)
}
```

## Common Mistakes

- **Offset pagination on large datasets** — Use cursor-based pagination for tables with 10k+ rows
- **Not indexing search columns** — Full-text search without indexes is slow on large tables
- **Over-caching** — Cache only what's expensive to compute. Simple queries are fast enough.
- **Not using transactions for multi-step mutations** — Partial failures can corrupt data.

## Best Practices

- Use cursor-based pagination for infinite scroll, offset-based for admin pages
- Add database indexes on columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses
- Cache expensive aggregation queries with `unstable_cache`
- Wrap all multi-step writes in transactions

## Summary

Production database patterns go beyond basic CRUD. Use cursor-based pagination for efficiency, full-text search for discoverability, caching for performance, and transactions for data integrity. Index your query columns and always handle pagination correctly at scale.

## Related Topics

- [Prisma with Next.js](./topic-2-prisma-with-nextjs.md)
- [Drizzle ORM with Next.js](./topic-3-drizzle-orm-with-nextjs.md)
- [Caching & Revalidation (Phase 3)](../../phase-3-rendering-data-fetching/module-3-caching-revalidation/)
