# Sitemap

## Introduction

A sitemap is an XML file that lists all the pages on your website. It helps search engines discover and index your content more efficiently, especially for new sites or pages that aren't linked from other pages.

## Why Do We Need This?

- Helps Google discover new pages faster
- Ensures all your pages are indexed
- Provides metadata about each page (when it was last updated, how important it is)
- Essential for large sites with hundreds or thousands of pages

## Static Sitemap

For small sites with fixed routes, export a static sitemap:

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yourdomain.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://yourdomain.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
```

## Dynamic Sitemap

For sites with dynamic content (blog posts, products), generate the sitemap from your database:

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com'
  
  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.5 },
  ]
  
  // Dynamic blog posts
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  })
  
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    priority: 0.7,
  }))
  
  // Dynamic product pages
  const products = await db.product.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  })
  
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    priority: 0.6,
  }))
  
  return [...staticPages, ...postPages, ...productPages]
}
```

## Sitemap Fields

| Field | Description | Recommendation |
|-------|-------------|----------------|
| `url` | Full page URL | Always include |
| `lastModified` | When the page was last updated | Update when content changes |
| `changeFrequency` | How often the page changes | `weekly` for blogs, `monthly` for static |
| `priority` | Relative importance (0.0 to 1.0) | Homepage = 1.0, less important = lower |

## Large Sitemaps

For sites with more than 50,000 URLs or 50MB sitemaps, split into multiple files:

```tsx
// app/sitemap.ts
export default async function sitemap() {
  const entries = await generateAllEntries()
  
  // Next.js automatically splits into multiple sitemaps
  // if you return more than 50,000 entries
  return entries
}
```

## Sitemap Index

Next.js automatically generates a sitemap index when needed. The index looks like:

```xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://yourdomain.com/sitemap.xml/1</loc>
  </sitemap>
  <sitemap>
    <loc>https://yourdomain.com/sitemap.xml/2</loc>
  </sitemap>
</sitemapindex>
```

## Submitting to Search Engines

1. Submit your sitemap URL in [Google Search Console](https://search.google.com/search-console)
2. Submit to [Bing Webmaster Tools](https://www.bing.com/webmasters)
3. Reference the sitemap in `robots.txt`

## Common Mistakes

- **Not updating `lastModified`** — Search engines use this to decide when to recrawl.
- **Including unpublished or draft pages** — Only include published, indexable content.
- **Missing trailing slashes** — Be consistent with URL format.
- **Not submitting to Search Console** — Creating a sitemap is only half the work. Submit it.

## Best Practices

- Include all public, indexable pages in the sitemap
- Update `lastModified` when content changes
- Use dynamic sitemaps for database-driven content
- Submit your sitemap URL to Google Search Console
- Reference the sitemap in `robots.txt`
- Keep sitemaps under 50,000 URLs or 50MB

## Summary

Sitemaps help search engines discover and index your content. Use static sitemaps for fixed pages and dynamic sitemaps for database-driven content. Update `lastModified` when content changes and submit the sitemap URL to Google Search Console.

## Related Topics

- [robots.txt](./robots-txt.md)
- [Canonical URLs](./canonical-url.md)
- [SEO Best Practices](./seo-best-practices.md)
