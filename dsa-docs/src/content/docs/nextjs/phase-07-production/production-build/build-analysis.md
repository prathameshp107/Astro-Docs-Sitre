# Build Analysis

## Introduction

Build analysis helps you understand what's in your JavaScript bundles. By identifying large dependencies or duplicate code, you can reduce bundle sizes and improve page load times.

## Why Do We Need This?

A production build might look fine from the outside — no errors, all pages work — but hide bloated bundles that slow down your users. Build analysis reveals these issues.

## Using Bundle Analyzer

### Setup

```bash
npm install @next/bundle-analyzer
```

```ts
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})
```

### Running

```bash
ANALYZE=true npm run build
```

This opens an interactive treemap in your browser showing the size of every module.

## Reading the Bundle Analyzer

```
▼ .next/static/chunks/
  ├── framework-123.js (50 kB)     — React, Next.js runtime
  ├── main-app-456.js (120 kB)     — Your app code (route pages)
  ├── polyfills-789.js (30 kB)     — Browser polyfills
  └── webpack-abc.js (15 kB)       — Webpack runtime
    
▼ node_modules/
  ├── recharts (80 kB)             — Large chart library
  ├── date-fns (25 kB)             — Date utilities
  └── lodash (70 kB)               — (should use tree-shaking)
```

## Identifying Optimization Targets

| Finding | Action |
|---------|--------|
| Large library (100kB+) | Dynamic import it |
| Duplicate library versions | Deduplicate with npm dedupe |
| Unused imports | Use tree-shakeable imports |
| Moment.js (230kB) | Replace with date-fns |

## Common Optimization Patterns

### 1. Replace Large Libraries

```tsx
// ❌ Moment.js (230kB, can't tree-shake)
import moment from 'moment'
moment().format('YYYY-MM-DD')

// ✅ date-fns (tree-shakeable)
import { format } from 'date-fns'
format(new Date(), 'yyyy-MM-dd')
```

### 2. Dynamic Import Heavy Components

```tsx
// Only loaded when needed
const Chart = dynamic(() => import('recharts').then(m => m.LineChart), {
  ssr: false,
})
```

### 3. Specific Imports

```tsx
// ❌ Imports entire lodash
import _ from 'lodash'
_.debounce(fn, 300)

// ✅ Imports only what's needed
import debounce from 'lodash/debounce'
```

## Common Mistakes

- **Not checking the bundle before optimizing** — You might optimize something that's already small. Always measure first.
- **Using `ANALYZE=true` in CI** — The analyzer opens browser windows. Only use it locally.
- **Ignoring `node_modules` contributions** — Third-party libraries often make up most of your bundle.

## Best Practices

- Run bundle analyzer before and after optimizations to measure impact
- Set a performance budget (e.g., initial JS < 200kB)
- Check the bundle when adding new dependencies
- Use `npm ls <package>` to check for duplicate versions

## Summary

Build analysis reveals what's in your JavaScript bundles. Use `@next/bundle-analyzer` to visualize bundle contents. Target large libraries for dynamic imports or replacement. Always measure before and after optimization.

## Related Topics

- [Production Build](./production-build.md)
- [Production Best Practices](./production-best-practices.md)
