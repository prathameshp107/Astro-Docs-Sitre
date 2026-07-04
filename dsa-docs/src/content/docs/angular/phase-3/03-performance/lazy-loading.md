---
title: "Lazy Loading & Preloading"
description: "Lazy loading and preloading strategies."
sidebar:
  order: 3
---

## Introduction
Lazy loading defers loading modules until needed. Preloading downloads lazy chunks in the background after initial load.

## Preloading Strategies

```typescript
provideRouter(routes, withPreloading(PreloadAllModules))
// or
provideRouter(routes, withPreloading(PreloadAllModules))
```

## Summary
Combine lazy loading with preloading for optimal performance."
