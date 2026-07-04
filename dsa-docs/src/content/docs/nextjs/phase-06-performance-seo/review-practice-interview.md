---
title: "Review, Practice & Interview Prep"
description: "Phase 6 covered three areas of Next.js optimization:"
---

# Review, Practice & Interview Prep

## Phase Summary

Phase 6 covered three areas of Next.js optimization:

**Performance**: Using `next/image` for image optimization, `next/font` for font loading, `next/script` for third-party scripts, dynamic imports for lazy loading, and bundle analysis for code size optimization.

**SEO**: Using the Metadata API for page metadata, Open Graph and Twitter cards for social sharing, `robots.txt` for crawler control, sitemaps for content discovery, and canonical URLs for duplicate content prevention.

**Caching**: The four caching layers (Full Route, Data, Router, React), time-based revalidation (ISR), on-demand revalidation (`revalidatePath`, `revalidateTag`), and Cache-Control headers.

## Practice Tasks

### Performance
1. Add `next/image` to an existing page — verify it generates WebP images
2. Replace a Google Fonts CDN link with `next/font/google`
3. Lazy load a heavy component with `next/dynamic` and `ssr: false`
4. Run Lighthouse before and after optimization — compare scores

### SEO
1. Add metadata to a static page and a dynamic route
2. Generate dynamic OG tags for a blog post page
3. Create a `robots.txt` that blocks admin routes
4. Generate a dynamic sitemap from database content

### Caching
1. Implement ISR on a blog page with `revalidate: 3600`
2. Add on-demand revalidation to a Server Action
3. Set Cache-Control headers on an API route
4. Verify cache behavior using response headers

## Common Interview Questions

**Q: How does `next/image` optimize images?**
A: It automatically resizes images to the dimensions specified, converts to modern formats (WebP/AVIF), lazy loads by default, and adds `width`/`height` to prevent layout shift.

**Q: What is ISR and when would you use it?**
A: Incremental Static Regeneration allows static pages to be updated after deployment without rebuilding the entire site. Use it for content that changes periodically (blog posts, product pages).

**Q: How do you add metadata to a dynamic route?**
A: Use `generateMetadata` which receives `params` and `searchParams`, fetches the data, and returns a `Metadata` object.

**Q: What are the four caching layers in Next.js?**
A: Full Route Cache (HTML), Data Cache (fetch responses), Router Cache (client-side), and React Cache (per-request component data).

**Q: How is `revalidatePath` different from `revalidateTag`?**
A: `revalidatePath` clears the cache for a specific URL route. `revalidateTag` clears all data cached with a specific tag string, regardless of which page uses it.

## Related Topics

- [Performance Module](./01-performance/)
- [SEO Module](./02-seo/)
- [Caching Module](./03-caching/)
- [Phase 3: Rendering & Data Fetching](../phase-3-rendering-data-fetching/)
