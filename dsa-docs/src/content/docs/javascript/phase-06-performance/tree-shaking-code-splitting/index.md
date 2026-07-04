---
title: Tree Shaking & Code Splitting
description: Eliminating unused code and splitting bundles for better performance
sidebar:
  order: 5
---

# Tree Shaking & Code Splitting

## Topics Covered

- [Tree Shaking](./tree-shaking) — Dead code elimination with ES modules
- [Code Splitting](./code-splitting) — Splitting bundles into smaller chunks
- [Measuring Impact](./measuring-impact) — Analyzing bundle size reductions

## Tree Shaking

### Introduction

**Tree shaking** is dead code elimination — removing unused exports from JavaScript bundles. It relies on ES module's static structure.

### How It Works

```javascript
// 📁 utils.js
export function used() { return 'used'; }
export function unused() { return 'never used'; }

// 📁 main.js
import { used } from './utils.js';
// 'unused' is removed during tree shaking 🎯
```

### Best Practices for Tree Shaking

```javascript
// ✅ ES modules (static analyzable)
export const value = 42;

// ❌ CommonJS (cannot be tree-shaken)
module.exports = { value: 42 };

// ✅ Import only what you need
import { map, filter } from 'lodash-es';

// ❌ Importing the whole library
import _ from 'lodash';

// ✅ Side-effect free modules
// package.json: "sideEffects": false
```

## Code Splitting

### Introduction

**Code splitting** breaks your bundle into smaller chunks that can be loaded on demand, reducing the initial load size.

### Entry Point Splitting

```javascript
// webpack/vite: multiple entry points
module.exports = {
  entry: {
    main: './src/main.js',
    admin: './src/admin.js'
  }
};
```

### Dynamic Splitting

```javascript
// Route-based splitting (most common)
const Home = () => import('./routes/Home.js');
const About = () => import('./routes/About.js');
const Dashboard = () => import('./routes/Dashboard.js');

// Route: load on navigation
async function navigate(route) {
  switch (route) {
    case 'home': return (await Home()).default;
    case 'about': return (await About()).default;
    case 'dashboard': return (await Dashboard()).default;
  }
}
```

### Vendor Splitting

```javascript
// webpack: split vendor code
optimization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}
```

## Measuring Impact

```javascript
// Check bundle sizes
console.log(`Initial bundle: ${bundleSize / 1024}KB`);
console.log(`Lazy loaded chunk: ${chunkSize / 1024}KB`);

// After optimization
// 200KB → 50KB initial + 50KB lazy = 75% reduction 🚀
```

## Summary

| Technique | What It Does | Benefit |
|-----------|-------------|---------|
| **Tree Shaking** | Removes unused code | Smaller bundles |
| **Code Splitting** | Splits into chunks | Faster initial load |
| **Dynamic Import** | Loads on demand | Lazy loading |
| **Vendor Splitting** | Separates library code | Better caching |

## Further Reading

- [Webpack: Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Webpack: Code Splitting](https://webpack.js.org/guides/code-splitting/)
- [Vite: Code Splitting](https://vitejs.dev/guide/features.html#chunk-splitting)
