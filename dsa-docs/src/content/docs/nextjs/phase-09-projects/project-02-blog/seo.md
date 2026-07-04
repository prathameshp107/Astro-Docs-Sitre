---
title: "SEO"
description: "Optimize your blog for search engines and social sharing."
---

# SEO

## Introduction

A blog without SEO is like a library with no catalog. Search engines need to understand your content, and social platforms need preview cards. Next.js provides built-in tools for both.

## Metadata API

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/posts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [`/og/${post.slug}.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}
```

## Sitemap Generation

```ts
// app/sitemap.ts
import { getAllPosts } from '@/lib/posts'

export default async function sitemap() {
  const posts = getAllPosts()
  
  const blogEntries = posts.map(post => ({
    url: `https://yoursite.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yoursite.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogEntries,
  ]
}
```

## RSS Feed

```ts
// app/feed.xml/route.ts
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>My Blog</title>
    <link>https://yoursite.com</link>
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>https://yoursite.com/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

## Structured Data (JSON-LD)

Add structured data to help search engines understand your content:

```tsx
// components/json-ld.tsx
export function BlogPostJsonLd({ post }: { post: any }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Your Name' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

## Open Graph Images

Generate dynamic OG images for each post using `@vercel/og` (Satori):

```tsx
// app/og/[slug]/route.tsx
import { ImageResponse } from '@vercel/og'
import { getPostBySlug } from '@/lib/posts'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return new ImageResponse(
    (
      <div style={{ background: '#000', color: '#fff', padding: 60, fontSize: 48 }}>
        {post.title}
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

## Best Practices

- Every post must have a unique title and description
- Use `generateMetadata` for dynamic pages
- Generate a sitemap and RSS feed at build time
- Add Open Graph images for social sharing
- Use structured data (JSON-LD) for rich search results

## Common Mistakes

- **Duplicate titles** — Every page needs a unique title tag
- **Missing descriptions** — Search engines use descriptions for snippets
- **No fallback for OG images** — Always provide a default OG image
- **Ignoring mobile SEO** — Google uses mobile-first indexing

## Summary

SEO is built into Next.js. Use `generateMetadata` for dynamic titles and descriptions, `sitemap.ts` for search engine discovery, and Open Graph for social sharing. Every post needs a title, description, and OG image.
