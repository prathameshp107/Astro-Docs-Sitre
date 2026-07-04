# SEO Best Practices

## Introduction

This topic summarizes the key SEO practices for Next.js applications. Use it as a checklist to ensure your application is well-optimized for search engines.

## SEO Checklist

### Metadata
- [ ] Root layout has `title.default` and `title.template`
- [ ] Every page has a unique title (< 60 characters)
- [ ] Every page has a description (< 160 characters)
- [ ] Dynamic routes use `generateMetadata`
- [ ] Title template is consistent (e.g., "Page | Site Name")

### Open Graph
- [ ] OG title, description, and image set on every page
- [ ] OG image is 1200x630px
- [ ] Twitter card is configured
- [ ] Dynamic OG images for blog/product pages

### Technical SEO
- [ ] `robots.txt` exists at the site root
- [ ] Sitemap is generated and submitted to Search Console
- [ ] Canonical URLs are set on all pages
- [ ] Preview deployments block crawlers
- [ ] SSL/HTTPS is enforced

### Content
- [ ] Use semantic HTML (`<h1>`, `<h2>`, `<article>`, `<nav>`)
- [ ] Descriptive heading hierarchy
- [ ] Image alt text on all images
- [ ] Internal links use descriptive anchor text
- [ ] No duplicate content issues

## Semantic HTML

Search engines understand content structure better with semantic HTML:

```tsx
// ✅ Good — semantic HTML
<article>
  <header>
    <h1>Blog Post Title</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  <main>
    <p>Post content...</p>
  </main>
  <footer>
    <nav aria-label="Categories">
      <a href="/category/react">React</a>
    </nav>
  </footer>
</article>

// ❌ Not ideal — div soup
<div class="post">
  <div class="title">Blog Post Title</div>
  <div class="content">Post content...</div>
</div>
```

## Performance Impact on SEO

SEO and performance are connected. Google uses Core Web Vitals as ranking signals:

| Metric | SEO Impact |
|--------|-----------|
| LCP > 2.5s | Poor ranking signal |
| FID > 100ms | Poor user experience |
| CLS > 0.1 | Poor visual stability |

Optimizing images, fonts, and scripts (covered in the Performance module) directly improves SEO.

## Monitoring SEO

### Google Search Console

1. Submit your sitemap
2. Monitor indexing status
3. Identify crawl errors
4. Track search queries and click-through rates

### Lighthouse SEO Audit

Run Lighthouse in Chrome DevTools to get an SEO score and specific improvement suggestions.

## Common SEO Mistakes in Next.js

- **Client-only rendering** — Content that needs JavaScript to render may not be indexed. Use Server Components or SSG.
- **No `generateMetadata` on dynamic routes** — Blog posts and product pages without metadata won't rank.
- **Blocking CSS/JS in robots.txt** — Don't block resources crawlers need to render pages.
- **Infinite scroll without proper pagination links** — Crawlers can't navigate infinite scroll. Add "Load more" links.
- **Missing 404 pages** — Return proper 404 status codes for non-existent pages.

## Best Practices

- Use Server Components for content-heavy pages (blog, docs, products)
- Add metadata to every page, including error pages
- Use semantic HTML and proper heading hierarchy
- Monitor SEO with Google Search Console and Lighthouse
- Fix Core Web Vitals issues (they affect both UX and rankings)
- Submit sitemaps and monitor crawl status

## Summary

SEO in Next.js is about using the built-in tools correctly: metadata, semantic HTML, proper status codes, and performance optimization. Follow the SEO checklist, use Google Search Console to monitor, and fix Core Web Vitals issues.

## Related Topics

- [Metadata](./metadata.md)
- [Open Graph](./open-graph.md)
- [Sitemap](./sitemap.md)
