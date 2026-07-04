# Why Performance Matters

## Introduction

Performance isn't just about speed — it's about how users perceive your application. A fast-loading page keeps users engaged, improves conversion rates, and ranks higher in search results.

## Core Web Vitals

Google measures three key metrics that directly impact search rankings:

| Metric | What It Measures | Good Target |
|--------|-----------------|-------------|
| **LCP** (Largest Contentful Paint) | Loading speed — when main content appears | < 2.5s |
| **FID** (First Input Delay) | Interactivity — how fast the page responds to clicks | < 100ms |
| **CLS** (Cumulative Layout Shift) | Visual stability — how much the layout shifts unexpectedly | < 0.1 |

Next.js provides built-in tools to help you meet these targets:

```tsx
// Layout shift example — avoid this
<img src="/photo.jpg" /> {/* No width/height — causes layout shift */}

// ✅ Better — use next/image (automatic dimension handling)
import Image from 'next/image'
<Image src="/photo.jpg" width={800} height={600} alt="Photo" />
```

## Measuring Performance

### Using Lighthouse

Lighthouse is built into Chrome DevTools. Run it on any page to get a performance score and specific improvement suggestions.

```bash
# Or run from CLI
npx lighthouse https://your-site.com --view
```

### Using Next.js Built-in Metrics

```tsx
// app/layout.tsx
export const reportWebVitals = (metric: any) => {
  console.log(metric.name, metric.value)
  
  // Send to analytics
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
  })
}
```

### Using Vercel Analytics

If deployed on Vercel, enable Analytics in the dashboard to see real user metrics (RUM data).

## Real-World Example

**Before optimization:** An e-commerce site takes 4.5s to load the product page. The hero image is 2MB, fonts aren't optimized, and the page downloads 500KB of unused JavaScript.

**After Next.js optimization:** Using `next/image` with WebP format, `next/font` for Google Fonts, and dynamic imports for the product gallery reduces load time to 1.2s — a 73% improvement.

## Best Practices

- Set performance budgets (e.g., JavaScript < 200KB per page)
- Measure before and after each optimization
- Focus on what impacts user experience most (usually images)
- Test on real mobile devices, not just desktop DevTools

## Summary

Performance directly impacts user experience, SEO rankings, and business metrics. The three Core Web Vitals (LCP, FID, CLS) are the standard benchmarks. Next.js provides built-in tools for all major optimizations — use them to meet the "Good" targets.

## Related Topics

- [Image Optimization](./image-optimization.md)
- [Bundle Optimization](./bundle-optimization.md)
- [Best Practices](./best-practices.md)
