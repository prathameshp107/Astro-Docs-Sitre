---
title: "Code Splitting"
description: "Code splitting is the practice of splitting your JavaScript bundle into smaller chunks that load on demand. It's essential for large applications to keep i"
---

# Code Splitting

## Introduction

Code splitting is the practice of splitting your JavaScript bundle into smaller chunks that load on demand. It's essential for large applications to keep initial load times fast.

## Why Do We Need This?

A single bundle containing all routes and components would be too large. Users on slow connections would wait minutes to see anything. Code splitting ensures users only download what they need for the current page.

## Automatic Route Splitting

Next.js automatically creates separate bundles for each route:

```bash
Route (app)                              Size
┌ ○ /                                    87 kB
├ ○ /dashboard                           120 kB
├ ○ /dashboard/analytics                 85 kB
├ ○ /dashboard/settings                  45 kB
└ ● /blog/[slug]                         62 kB
```

When a user visits `/dashboard`, only the `/dashboard` bundle (120KB) loads — not the analytics or settings bundles.

## Component Splitting with Dynamic Imports

```tsx
import dynamic from 'next/dynamic'

// HeavyChart and RichTextEditor get their own chunks
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  ssr: false,
})

export default function AnalyticsPage() {
  const [showChart, setShowChart] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && <HeavyChart />}
      {/* 85KB chart code loads only when needed */}
    </div>
  )
}
```

## Named Exports

```tsx
const LineChart = dynamic(() =>
  import('recharts').then(mod => mod.LineChart)
)
```

## Loading Shared Chunks

Next.js automatically detects shared dependencies and extracts them into common chunks. If multiple pages import the same components, those components go into a shared chunk rather than being duplicated.

## Code Splitting Strategy

| What | How | Automatic? |
|------|-----|------------|
| Routes | Separate bundles per page | ✅ Yes |
| Layouts | Shared layout bundles | ✅ Yes |
| Large components | `next/dynamic` | ❌ Manual |
| Libraries | Dynamic `import()` | ❌ Manual |

## Common Mistakes

- **Not using dynamic imports for heavy components** — If a chart library is 80KB and only used on one page, it should be dynamically imported.
- **Splitting everything** — Dynamic imports add overhead. Only split components over ~10KB.
- **Forgetting SSR control** — If a dynamic component uses browser APIs, set `ssr: false`.

## Best Practices

- Rely on Next.js's automatic route splitting as the baseline
- Use dynamic imports for heavy components not needed on first paint
- Review bundle size regularly with the analyzer
- Group smaller components into meaningful chunks

## Summary

Code splitting keeps initial bundles small by deferring non-essential code. Next.js handles route-level splitting automatically. Use dynamic imports for heavy components and libraries. Review bundles with the analyzer to identify splitting opportunities.

## Related Topics

- [Lazy Loading](./lazy-loading.md)
- [Build Analysis (Phase 7)](../../phase-07-production/production-build/build-analysis.md)
- [Project Scaling](./project-scaling.md)
