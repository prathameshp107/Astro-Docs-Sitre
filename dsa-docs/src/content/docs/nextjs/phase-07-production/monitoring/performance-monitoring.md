---
title: "Performance Monitoring"
description: "Performance monitoring tracks how fast your application loads for real users. It captures Core Web Vitals — the metrics Google uses for search rankings."
---

# Performance Monitoring

## Introduction

Performance monitoring tracks how fast your application loads for real users. It captures Core Web Vitals — the metrics Google uses for search rankings.

## Why Do We Need This?

Performance testing in development doesn't reflect real-world conditions. Users on slow networks with older devices may have a very different experience. Real User Monitoring (RUM) captures actual user data.

## Core Web Vitals

| Metric | What It Measures | Good Target |
|--------|-----------------|-------------|
| LCP | Largest Contentful Paint — loading speed | < 2.5s |
| FID/INP | First Input Delay / Interaction to Next Paint | < 200ms |
| CLS | Cumulative Layout Shift — visual stability | < 0.1 |

## Tracking Web Vitals in Next.js

```tsx
// app/layout.tsx
export function reportWebVitals(metric: any) {
  console.log(metric) // name, value, rating, delta, id

  // Send to analytics
  const body = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    page: window.location.pathname,
  }
  
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
```

## Vercel Analytics (RUM)

If deployed on Vercel, enable "Web Vitals" in the Analytics dashboard. This automatically captures real user metrics without any code changes.

## Lighthouse Audits

Run Lighthouse in Chrome DevTools or via CLI:

```bash
npx lighthouse https://yourdomain.com --view
```

Lighthouse gives you scores and specific improvement suggestions for each metric.

## Performance Budgets

Set targets for key metrics and alert when they're exceeded:

```ts
const PERFORMANCE_BUDGETS = {
  lcp: 2500,    // 2.5s
  fid: 100,     // 100ms
  cls: 0.1,     // 0.1 score
  tti: 3000,    // 3s
  bundleSize: 200 * 1024, // 200KB
}
```

## Common Mistakes

- **Only testing on fast connections** — Test on Slow 3G throttling and mid-range devices.
- **Ignoring CLS** — Layout shifts are often missed in development. Test with real content.
- **Not monitoring after deployment** — Performance can regress with any change. Monitor continuously.

## Best Practices

- Monitor real user metrics (RUM), not just Lighthouse scores
- Test on actual mobile devices and throttled networks
- Track performance changes over time to catch regressions
- Set up alerts when Core Web Vitals exceed targets

## Summary

Performance monitoring captures real user experience with Core Web Vitals. Use `reportWebVitals`, Vercel Analytics, and Lighthouse to measure and improve. Monitor continuously — performance is not a one-time fix.

## Related Topics

- [Analytics](./analytics.md)
- [Logging](./logging.md)
- [Error Monitoring](./error-monitoring.md)
