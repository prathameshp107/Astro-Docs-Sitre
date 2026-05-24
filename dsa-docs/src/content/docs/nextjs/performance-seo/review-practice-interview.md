---
title: "Performance & SEO Review, Practice & Interview Prep"
description: "This guide covered the two most critical aspects of production Next.js applications:"
---

# Summary & Key Takeaways

## Summary

This guide covered the two most critical aspects of production Next.js applications:

**Performance Optimization** is about delivering fast, smooth user experiences by reducing what users download, loading only what's needed, and rendering efficiently. Next.js provides powerful built-in tools — the `<Image />` component, `next/font`, dynamic imports, Suspense streaming, and multi-layer caching — that make optimization accessible.

**SEO in Next.js** leverages server-side rendering to ensure search engines can always read your content. The Metadata API, `generateMetadata()`, structured data (JSON-LD), sitemaps, and robots.txt together create a comprehensive SEO foundation that would require complex manual configuration in a traditional React SPA.

## Key Takeaways

| Area | Key Insight |
|------|------------|
| **Core Web Vitals** | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 are Google ranking factors |
| **Images** | Always use `<Image />` with `priority` on LCP images, `sizes` attribute always |
| **Code splitting** | Next.js auto-splits per route; use `dynamic()` for component-level splitting |
| **Server Components** | Default to server; only use `'use client'` when needed |
| **Caching** | 4 layers: Request Memoization, Data Cache, Full Route Cache, Router Cache |
| **Streaming** | `loading.tsx` + Suspense enables progressive page rendering |
| **Metadata** | Static `metadata` for layout/known pages, `generateMetadata()` for dynamic data |
| **SEO vs CSR** | Next.js SSR ensures crawlers see real HTML, not empty JS shells |
| **JSON-LD** | Add schema.org markup for rich snippets in search results |
| **Sitemap** | `app/sitemap.ts` auto-generates `/sitemap.xml` from your routes |

---

# Practice Exercises

1. **Bundle Analysis**: Add `@next/bundle-analyzer` to a project, run `ANALYZE=true npm run build`, and identify the 3 largest dependencies. Try to reduce each by at least 50%.

2. **Image Audit**: Audit a Next.js project's images — add `priority` to hero images, correct `sizes` values to all images, convert any `<img>` tags to `<Image />`.

3. **Dynamic Import**: Take a component that uses a heavy third-party library (chart, editor, date picker) and convert it to a dynamic import with a loading skeleton.

4. **Metadata Setup**: Build a complete metadata setup for a blog — `layout.tsx` with default metadata, `generateMetadata()` for posts, OG image generation.

5. **Structured Data**: Add Product JSON-LD to a product page and validate it using Google's Rich Results Test tool.

6. **Sitemap + robots.txt**: Implement `app/sitemap.ts` that fetches blog posts from an API and combines them with static routes. Add `app/robots.ts` to block the `/admin` route.

7. **Performance Optimization**: Take a slow dashboard page and: (a) convert data components to Server Components, (b) wrap sections in Suspense, (c) add `loading.tsx`, (d) parallelize API calls.

---

# Mini Project Ideas

## 1. SEO-Optimized Blog

Build a blog with:
- Dynamic `generateMetadata()` for each post
- Auto-generated OG images using `ImageResponse`
- Article JSON-LD structured data
- `sitemap.ts` with all blog posts
- `robots.ts` with proper directives
- `next/font` for typography
- `<Image />` for all media
- Lighthouse score target: 95+

## 2. Product E-commerce Website

Build a product catalog with:
- Product page Product JSON-LD (enables star ratings in search)
- Category page BreadcrumbList JSON-LD
- Dynamic metadata per product (name, price, brand in title)
- Canonical URLs for filtered/sorted views
- Image optimization for product gallery
- Dynamic import for reviews section
- Suspense streaming for related products
- Bundle analysis and optimization

## 3. Landing Page with Full SEO

Build a SaaS landing page with:
- Organization JSON-LD for knowledge panel
- FAQPage JSON-LD for FAQ section
- Optimized metadata for social sharing
- Lighthouse performance score 90+
- Font optimization with `next/font`
- Core Web Vitals under the "good" threshold
- Search Console integration guidance

---

# Interview Preparation

## Beginner Questions

1. What is the difference between LCP, INP, and CLS?
2. What does the `<Image />` component in Next.js do that a regular `<img>` tag doesn't?
3. What is code splitting and how does Next.js implement it?
4. What is the purpose of the `priority` prop on `<Image />`?
5. What is `useMemo` and when should you use it?
6. What is SEO and why does Next.js have better SEO than a regular React app?
7. What is the `metadata` export in App Router used for?
8. What is an OG (Open Graph) tag? Give an example.

## Intermediate Questions

1. Explain all four caching layers in Next.js App Router.
2. What is tree shaking and how does Next.js support it?
3. How do `useMemo` and `useCallback` differ? When would you use each?
4. What is the difference between `dynamic()` with `ssr: false` vs `ssr: true`?
5. How does streaming with Suspense work in Next.js?
6. What is `generateMetadata()` and how does it differ from static metadata?
7. What is JSON-LD and what types of rich snippets can it enable?
8. How do you generate a dynamic sitemap in Next.js App Router?
9. What is a canonical URL and when do you need one?
10. How would you implement parallel data fetching in a Server Component?

## Advanced Questions

1. How does Next.js streaming differ from traditional SSR and when would you choose each?
2. Explain request memoization vs data cache in Next.js. How do you control each?
3. How would you optimize a Next.js e-commerce site to achieve Lighthouse score > 90?
4. What are the performance trade-offs of moving a component from Server to Client?
5. How would you implement tag-based cache invalidation in Next.js?
6. Explain the rendering performance implications of putting `'use client'` at a high level in the component tree.
7. How would you implement international SEO (hreflang) in Next.js?
8. Describe a complete strategy to diagnose and fix a poor CLS (Cumulative Layout Shift) score.
9. How does `React.cache()` differ from Next.js's data cache?
10. What is the impact of `generateStaticParams` on SEO and when would you use ISR instead?

---

> **Next in the series**: Part 4B — Testing in Next.js, Error Handling, and Deployment Strategies

---

*Next.js Deep Dive Documentation — Part 4A | Performance Optimization & SEO*  
*TypeScript · App Router · Production-Ready Examples*
