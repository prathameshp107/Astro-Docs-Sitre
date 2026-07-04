---
title: "Lazy Loading"
description: "Lazy loading defers loading of non-critical code until it's needed. This reduces initial bundle size and speeds up the first page load. For large applicati"
---

# Lazy Loading

## Introduction

Lazy loading defers loading of non-critical code until it's needed. This reduces initial bundle size and speeds up the first page load. For large applications, lazy loading is essential for performance.

## Why Do We Need This?

In a large application, many features are rarely used — admin panels, settings pages, heavy chart components. Loading everything upfront would create a multi-megabyte bundle. Lazy loading ensures users only download what they actually use.

## Component-Level Lazy Loading

```tsx
import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('@/features/admin/AdminPanel'), {
  ssr: false,
  loading: () => <AdminPanelSkeleton />,
})

const Chart = dynamic(() => import('@/components/shared/Chart'), {
  ssr: false,
})

export default function DashboardPage() {
  const [showAdmin, setShowAdmin] = useState(false)
  
  return (
    <div>
      <Chart /> {/* Loaded immediately but component is lazy */}
      
      <button onClick={() => setShowAdmin(true)}>
        Open Admin Panel
      </button>
      
      {showAdmin && <AdminPanel />}
      {/* Admin panel loads only when button is clicked */}
    </div>
  )
}
```

## Route-Based Code Splitting

Next.js automatically splits code by route. Each page gets its own bundle:

```bash
Route (app)                              Size
┌ ○ /                                    87 kB
├ ○ /dashboard                           120 kB
├ ○ /dashboard/analytics                 85 kB  ← Separate bundle
├ ○ /dashboard/settings                  45 kB  ← Separate bundle
└ ● /blog/[slug]                         62 kB
```

This is automatic — no configuration needed.

## Library Lazy Loading

```ts
// Only loads date-fns when the function is called
export async function formatRelativeDate(date: Date) {
  const { formatDistanceToNow } = await import('date-fns')
  return formatDistanceToNow(date, { addSuffix: true })
}
```

## Decision Flow

```mermaid
flowchart TD
    A[Component] --> B{Critical for first paint?}
    B -->|Yes| C[Import normally (not lazy)]
    B -->|No| D{Large bundle size?}
    D -->|> 10KB| E[Dynamic import]
    D -->|< 10KB| F[Import normally]
    E --> G{Depends on browser APIs?}
    G -->|Yes| H[ssr: false]
    G -->|No| I[Allow SSR]
```

## Common Mistakes

- **Lazy loading everything** — The overhead of dynamic imports adds up. Only lazy load components over ~10KB.
- **No loading state** — Always provide a loading fallback for lazy-loaded components.
- **Lazy loading above-the-fold content** — Critical visible content should not be lazy loaded.

## Best Practices

- Let Next.js handle route-level code splitting automatically
- Use dynamic imports for heavy components (> 10KB) not visible on first paint
- Show meaningful loading states (skeletons) when lazy loading
- Use `ssr: false` for components that depend on browser APIs

## Summary

Lazy loading is essential for large applications. Route-level splitting is automatic. Use dynamic imports for large, non-critical components. Always provide loading states and avoid lazy loading above-the-fold content.

## Related Topics

- [Code Splitting](./code-splitting.md)
- [Project Scaling](./project-scaling.md)
- [Performance (Phase 6)](../../phase-06-performance-seo/01-performance/)
