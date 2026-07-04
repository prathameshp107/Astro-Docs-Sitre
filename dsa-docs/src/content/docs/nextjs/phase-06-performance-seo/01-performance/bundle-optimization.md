# Bundle Optimization

## Introduction

The JavaScript bundle is the code the browser must download, parse, and execute before a page becomes interactive. Optimizing the bundle — making it smaller and loading only what's needed — is one of the most impactful performance improvements you can make.

## Why Do We Need This?

A 500KB JavaScript bundle takes significantly longer to parse and execute than a 150KB one — especially on mobile devices with slower CPUs. Next.js automatically splits code by route, but you still need to be mindful of what you add to each page.

## Automatic Code Splitting

Next.js automatically creates a separate bundle for each route:

```
- / → chunk-home.js (40KB)
- /about → chunk-about.js (25KB)
- /blog → chunk-blog.js (60KB)
```

When the user visits `/`, only `chunk-home.js` is downloaded. The other bundles load on demand.

## Tree Shaking

Next.js automatically removes unused exports from your bundles. This happens at build time when you import specific functions from a library:

```tsx
// ❌ Imports the entire lodash library (~70KB)
import _ from 'lodash'
_.debounce(fn, 300)

// ✅ Only imports the debounce function (~5KB)
import debounce from 'lodash/debounce'
debounce(fn, 300)
```

## Analyzing Your Bundle

Use `@next/bundle-analyzer` to visualize what's in your bundles:

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

```bash
ANALYZE=true npm run build
```

This opens an interactive treemap showing the size of every imported module. Use it to identify large, unnecessary dependencies.

## Common Bundle Culprits

| Library | Approx Size | Optimization |
|---------|-------------|--------------|
| Moment.js | 230KB | Use `date-fns` (tree-shakeable) |
| Lodash | 70KB | Import individual functions |
| Chart.js | 60KB | Dynamic import on interaction |
| Three.js | 500KB+ | Dynamic import, only when needed |

## Reducing Bundle Size

### 1. Prefer Tree-Shakeable Libraries

```tsx
// ❌ Moment.js — can't tree-shake
import moment from 'moment'
moment().format('YYYY-MM-DD')

// ✅ date-fns — tree-shakeable
import { format } from 'date-fns'
format(new Date(), 'yyyy-MM-dd')
```

### 2. Use Dynamic Imports for Large Libraries

```tsx
const Chart = dynamic(() => import('recharts').then(m => m.LineChart), {
  ssr: false,
})
```

### 3. Remove Unused Dependencies

Regularly audit your `package.json` for unused packages:

```bash
npm prune
npx depcheck
```

## Common Mistakes

- **Not analyzing the bundle** — You can't optimize what you don't measure. Run the bundle analyzer before optimizing.
- **Importing entire libraries for one function** — Always import specific functions, not the whole library.
- **Not lazy loading heavy components** — Charts, maps, and editors should be dynamic imports.
- **Including polyfills unnecessarily** — Next.js automatically includes modern polyfills. Only add what's needed for your target browsers.

## Best Practices

- Keep the initial bundle under 200KB (gzipped)
- Use dynamic imports for components > 10KB
- Prefer tree-shakeable libraries (date-fns, lodash-es)
- Run bundle analyzer regularly to catch regressions
- Remove unused dependencies from `package.json`

## Summary

Bundle optimization is about shipping only the JavaScript that's needed. Next.js handles route-level code splitting automatically. Use tree-shakeable imports, dynamic imports for heavy components, and the bundle analyzer to identify optimization opportunities.

## Related Topics

- [Lazy Loading](./lazy-loading.md)
- [Image Optimization](./image-optimization.md)
- [Best Practices](./best-practices.md)
