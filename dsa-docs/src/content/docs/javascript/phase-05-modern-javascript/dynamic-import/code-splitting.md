---
title: Code Splitting with Dynamic Imports
description: Splitting bundles using dynamic import() for lazy loading
sidebar:
  order: 1
---

# Code Splitting with Dynamic Imports

## Introduction

**Code splitting** divides your JavaScript bundle into smaller chunks loaded on demand using dynamic `import()`. This reduces initial bundle size and improves page load time.

## Basic Splitting

```javascript
// Instead of a single static import:
// import { heavyFunction } from './heavy-module.js';

// Split with dynamic import:
button.addEventListener('click', async () => {
  const { heavyFunction } = await import('./heavy-module.js');
  heavyFunction();
});
```

## Named vs Default Exports

```javascript
// Named export
const { formatDate } = await import('./date-utils.js');

// Default export
const moment = await import('moment');
moment.default().format('YYYY-MM-DD');

// Renaming default for convenience
const { default: format } = await import('./formatter.js');
```

## Webpack / Vite Chunk Naming

Bundlers automatically create separate chunk files. You can hint at chunk names:

```javascript
const admin = await import(/* webpackChunkName: "admin" */ './admin.js');
// Creates a separate chunk: admin.[hash].js
```

## React.lazy & Suspense

```jsx
import React, { Suspense } from 'react';

const Dashboard = React.lazy(() => import('./Dashboard'));
const Settings = React.lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
```

## Summary

- Dynamic `import()` triggers code splitting automatically
- Each `import()` call creates a separate chunk
- Use `React.lazy` + `Suspense` for React component splitting
- Chunk names can be hinted for debugging

## Further Reading

- [MDN: Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [Webpack: Code Splitting](https://webpack.js.org/guides/code-splitting/)
