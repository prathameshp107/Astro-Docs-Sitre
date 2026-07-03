---
title: "Lazy Loading"
description: "Load feature modules on demand for better performance."
sidebar:
  order: 3
---

## Introduction
Lazy loading defers loading of feature modules until they're needed, reducing the initial bundle size and improving Time to Interactive.

## Implementation

```typescript
const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.module')
      .then(m => m.ProductsModule)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component')
      .then(m => m.SettingsComponent)
  }
];
```

## Summary
Lazy loading is essential for large Angular applications, reducing initial load time significantly."
