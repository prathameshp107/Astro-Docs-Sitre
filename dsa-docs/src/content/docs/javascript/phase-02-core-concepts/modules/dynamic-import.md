---
title: Dynamic Import
description: Lazy loading JavaScript modules with dynamic import()
sidebar:
  order: 3
---

# Dynamic Import

## Introduction

**Dynamic imports** (`import()`) load modules **on demand**, at runtime. Unlike static imports, they return a **Promise** and can be called conditionally.

## Basic Usage

```javascript
button.addEventListener('click', async () => {
  // Module is loaded only when button is clicked
  const { format } = await import('./formatter.js');
  console.log(format('Hello'));
});
```

## Use Cases

### 1. Route-based Code Splitting

```javascript
const routes = {
  '/home': () => import('./pages/home.js'),
  '/about': () => import('./pages/about.js'),
  '/dashboard': () => import('./pages/dashboard.js'),
};

async function navigate(path) {
  const module = await routes[path]();
  module.render();
}
```

### 2. Conditional Loading

```javascript
async function loadChart() {
  if (typeof window !== 'undefined') {
    const { Chart } = await import('chart.js');
    return new Chart(ctx, config);
  }
}
```

### 3. Feature Flags

```javascript
async function loadFeature(featureName) {
  const features = {
    analytics: () => import('./features/analytics.js'),
    chat: () => import('./features/chat.js'),
    export: () => import('./features/export.js'),
  };
  
  if (features[featureName]) {
    const module = await features[featureName]();
    module.init();
  }
}
```

## Default and Named Imports

```javascript
// Named export
const { add, PI } = await import('./utils.js');

// Default export
const User = (await import('./User.js')).default;
// Or simpler:
const { default: User } = await import('./User.js');
```

## Static vs Dynamic

| Aspect | Static `import` | Dynamic `import()` |
|--------|---------------|-------------------|
| Timing | At parse time | At runtime |
| Conditional | No | Yes |
| Returns | Nothing (hoisted) | Promise |
| Use case | Core dependencies | Lazy loading |

## Best Practices

- Use static imports for critical dependencies
- Use dynamic imports for code splitting
- Handle loading states for dynamic imports
- Preload critical dynamic imports with `<link rel="preload">`

## Summary

- `import()` returns a Promise of the module
- Enables lazy loading and code splitting
- Supports both named and default imports
- Use for route-based splitting, feature flags, conditional loading

## Further Reading

- [MDN: Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [Previous: Default Exports](./default-exports)
- [Next: ESM vs CommonJS](./esm-vs-commonjs)
