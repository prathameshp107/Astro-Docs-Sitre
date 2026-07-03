---
title: "Standalone Routing"
description: "Routing with standalone components."
sidebar:
  order: 2
---

## Introduction
With standalone components, routing is simpler. Use provideRouter() and loadComponent().

## Example

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});

// Lazy load standalone components
const routes: Routes = [{
  path: 'products',
  loadComponent: () => import('./products.component').then(m => m.ProductsComponent)
}];
```

## Summary
Standalone routing eliminates module-based lazy loading complexity."
