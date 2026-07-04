---
title: "Dynamic Routing"
description: "Set up dynamic routes for blog posts and generate static params."
---

# Dynamic Routing

## Introduction

Dynamic routing lets each blog post have its own URL like `/blog/getting-started-nextjs`. Next.js handles this with folder-based dynamic routes and the `generateStaticParams` function.

## Setting Up the Route

```
app/
  blog/
    page.tsx              # /blog — post listing
    [slug]/
      page.tsx            # /blog/:slug — individual post
```

## Generating Static Params

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'

// Generate all post pages at build time
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const htmlContent = await markdownToHtml(post.content)

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose">
      <h1>{post.title}</h1>
      <div className="flex gap-2 text-gray-500 text-sm mb-8">
        <time>{post.date}</time>
        <span>{post.category}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  )
}
```

## SEO Metadata

```tsx
import { generateMetadata } from 'next'
import { getPostBySlug } from '@/lib/posts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}
```

## Category Filtering

```tsx
// app/blog/category/[name]/page.tsx
import { getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = [...new Set(posts.map(p => p.category))]
  return categories.map(name => ({ name }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const posts = getAllPosts().filter(p => p.category === name)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{name}</h1>
      {/* Post list */}
    </div>
  )
}
```

## Best Practices

- Use `generateStaticParams` for content that doesn't change frequently
- Set `fallback: 'blocking'` or use ISR for new posts
- Validate slugs to prevent path traversal attacks
- Use `notFound()` for missing posts

## Common Mistakes

- **Missing `generateStaticParams`** — Dynamic routes fail without it if `dynamicParams = false`
- **Forgetting `await params`** — In Next.js 14+, params is a Promise that must be awaited
- **Not handling missing slugs** — Always check if the post exists and call `notFound()` if not

## Summary

Dynamic routing with `[slug]` and `generateStaticParams` gives you static pages with dynamic-looking URLs. Generate all post pages at build time, add category filtering, and serve 404s for missing posts.
