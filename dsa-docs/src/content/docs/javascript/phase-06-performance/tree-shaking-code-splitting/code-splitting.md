---
title: Code Splitting
description: Splitting bundles into smaller chunks for better performance
sidebar:
  order: 2
---

# Code Splitting

## Introduction

**Code splitting** breaks your JavaScript bundle into smaller chunks that can be loaded on demand, reducing the initial load size.

## Entry Point Splitting

Split your application by entry points (pages):

```javascript
// webpack.config.js
module.exports = {
  entry: {
    main: './src/main.js',     // Core app
    admin: './src/admin.js',   // Admin panel
    vendor: './src/vendor.js'  // Third-party libraries
  }
};
```

## Dynamic Splitting

Load code on demand with dynamic `import()`:

```javascript
// Route-based splitting (most common)
const Home = () => import('./routes/Home.js');
const About = () => import('./routes/About.js');
const Dashboard = () => import('./routes/Dashboard.js');

async function navigate(route) {
  switch (route) {
    case 'home':
      return (await Home()).default;
    case 'about':
      return (await About()).default;
    case 'dashboard':
      return (await Dashboard()).default;
  }
}
```

## Vendor Splitting

Separate third-party code into its own chunk:

```javascript
// webpack.config.js
optimization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        priority: 10
      },
      common: {
        minChunks: 2,
        minSize: 10000,
        name: 'common',
        chunks: 'all'
      }
    }
  }
}
```

## Chunk Naming

```javascript
// Use magic comments for named chunks (Webpack)
const Admin = () => import(/* webpackChunkName: "admin" */ './Admin.js');
const Reports = () => import(/* webpackChunkName: "reports" */ './Reports.js');

// Output: admin.[hash].js, reports.[hash].js
```

## Summary

| Technique | What It Does | Benefit |
|-----------|-------------|---------|
| Entry splitting | Separate entry points | Per-page bundles |
| Dynamic splitting | `import()` per route | Load on demand |
| Vendor splitting | Separate vendor chunk | Better caching |
| Chunk naming | Named chunks | Debugging |

## Further Reading

- [Webpack: Code Splitting](https://webpack.js.org/guides/code-splitting/)
