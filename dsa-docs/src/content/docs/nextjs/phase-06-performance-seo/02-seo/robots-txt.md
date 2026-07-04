# robots.txt

## Introduction

`robots.txt` is a file that tells search engine crawlers which pages they can and cannot access. It's placed at the root of your site and is checked by crawlers before they index your pages.

## Why Do We Need This?

Without `robots.txt`, crawlers will try to index every page on your site, including:

- Admin pages (`/admin`, `/dashboard`)
- API routes (`/api/*`)
- Staging or test pages
- Search results pages (which could be infinite)

`robots.txt` prevents wasted crawl budget on pages that shouldn't appear in search results.

## Creating robots.txt

Next.js can serve a static `robots.txt` file from the `public` directory:

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/

Sitemap: https://yourdomain.com/sitemap.xml
```

## Dynamic robots.txt

For more control, use a Route Handler:

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dashboard/'],
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

### Environment-Specific Rules

```tsx
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
  
  // Block all crawlers on preview deployments
  if (process.env.VERCEL_ENV === 'preview') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

## Common robots.txt Directives

| Directive | Example | Effect |
|-----------|---------|--------|
| `Allow` | `Allow: /public/` | Allow crawling a specific path |
| `Disallow` | `Disallow: /admin/` | Block crawling a path |
| `User-agent` | `User-agent: Googlebot` | Apply rules to specific crawlers |
| `Sitemap` | `Sitemap: https://...` | Point to your sitemap |
| `Crawl-delay` | `Crawl-delay: 10` | Request delay between crawls |

## Testing robots.txt

```bash
curl https://yourdomain.com/robots.txt
```

Also test in Google Search Console's robots.txt tester.

## Common Mistakes

- **Blocking CSS and JS files** — This prevents crawlers from rendering your page properly.
- **Using `Disallow: /` on production** — This blocks all crawling. Only use on staging/preview.
- **Forgetting the sitemap URL** — Include `Sitemap:` directive to help crawlers find your sitemap.
- **Not handling preview deployments** — Preview URLs should block crawling to prevent duplicate content.

## Best Practices

- Always include a `robots.txt` file
- Block admin, API, and internal pages from crawling
- Include the sitemap URL in `robots.txt`
- Block crawlers on preview/staging environments
- Don't block CSS, JS, or image files

## Summary

`robots.txt` controls which parts of your site search engines can crawl. Block admin and API routes, include your sitemap URL, and use environment-specific rules for preview deployments. Test with `curl` and Google Search Console.

## Related Topics

- [Sitemap](./sitemap.md)
- [Canonical URLs](./canonical-url.md)
- [SEO Best Practices](./seo-best-practices.md)
