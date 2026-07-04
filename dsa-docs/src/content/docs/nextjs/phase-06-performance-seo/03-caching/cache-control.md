# Cache-Control

## Introduction

Cache-Control headers tell browsers and CDNs how long to cache content. While Next.js manages server-side caching internally, you still need to set Cache-Control headers for static assets and API responses.

## Why Do We Need This?

Without Cache-Control headers:

- Browsers may cache assets for unpredictable durations
- CDNs may not cache your content at all
- Users may see outdated versions of your API responses

With proper Cache-Control headers, you control exactly how long assets are cached at each level.

## Setting Cache-Control in Route Handlers

```tsx
// app/api/posts/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await db.post.findMany()
  
  // Cache at CDN for 1 hour, browser for 2 minutes
  return NextResponse.json(
    { data: posts },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, max-age=120',
      },
    }
  )
}
```

## Cache-Control Directives

| Directive | Meaning | Example |
|-----------|---------|---------|
| `public` | Cacheable by anyone (CDN + browser) | API responses |
| `private` | Cacheable only by the browser | Personalized content |
| `max-age` | Browser cache duration (seconds) | `max-age=3600` (1 hour) |
| `s-maxage` | CDN/proxy cache duration (seconds) | `s-maxage=86400` (1 day) |
| `no-cache` | Check with server before using cache | Dynamic content |
| `no-store` | Never cache | Sensitive data |
| `stale-while-revalidate` | Serve stale while fetching fresh | Best for performance |

## CDN-Specific Headers (Vercel)

```tsx
// Override Vercel's default CDN behavior
export async function GET() {
  return NextResponse.json(
    { data },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'CDN-Cache-Control': 'public, s-maxage=3600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
    }
  )
}
```

> **Note:** `CDN-Cache-Control` and `Vercel-CDN-Cache-Control` are specific to Vercel. Other CDN providers may use different mechanisms.

## static Assets

Next.js automatically optimizes caching for static assets in `public/`:

```tsx
// Static files in public/ get optimal cache headers automatically
// public/favicon.ico → Cache-Control: public, max-age=31536000, immutable
```

## Caching Strategy by Content Type

| Content | Cache-Control | Rationale |
|---------|---------------|-----------|
| Static assets (JS, CSS) | `max-age=31536000, immutable` | Hashed filenames, can cache forever |
| Images | `max-age=86400, s-maxage=604800` | Cache 1 day browser, 1 week CDN |
| API responses | `max-age=60, s-maxage=300` | Short browser cache, longer CDN |
| User-specific data | `private, max-age=0` | Never cache on CDN |
| SEO metadata | `public, max-age=3600` | Cache for 1 hour |

## Common Mistakes

- **Not setting any Cache-Control headers** — Default behavior may not be optimal for your use case.
- **Confusing `max-age` and `s-maxage`** — `max-age` is for browsers, `s-maxage` is for CDNs.
- **Using `no-cache` when you mean `no-store`** — `no-cache` still caches (just revalidates first).
- **Setting `immutable` on non-hashed files** — Only use `immutable` for files with content hashes in their filenames.

## Best Practices

- Use `s-maxage` for CDN caching and `max-age` for browser caching
- Use `stale-while-revalidate` for API responses to serve fast fallbacks
- Set `immutable` on versioned static assets (JS/CSS bundles)
- Set `private` for user-specific API responses
- Never cache sensitive data with `public`

## Summary

Cache-Control headers give you fine-grained control over caching at the browser and CDN level. Use `s-maxage` for CDN duration, `max-age` for browser duration, and `stale-while-revalidate` for performance. Set `immutable` for versioned static assets.

## Related Topics

- [Cache Overview](./cache-overview.md)
- [Revalidation](./revalidation.md)
- [Practical Examples](./practical-examples.md)
