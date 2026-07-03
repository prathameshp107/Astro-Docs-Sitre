---
title: "Hydration"
description: "Attach Angular to pre-rendered HTML."
sidebar:
  order: 2
---

## Introduction
Hydration reuses server-rendered DOM and attaches Angular's event listeners without re-rendering.

## Setup

```typescript
export const appConfig = {
  providers: [
    provideClientHydration()
  ]
};

// Incremental hydration (Angular 18+)
provideClientHydration(withIncrementalHydration())
```

## Summary
Hydration eliminates the blank flash that plagues non-hydrated SSR apps."
