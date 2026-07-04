---
title: "forkJoin"
description: "Wait for all observables to complete."
sidebar:
  order: 9
---

## Introduction
forkJoin waits for all source Observables to complete, then emits an array of their last values.

## Example

```typescript
forkJoin({
  users: this.http.get('/api/users'),
  products: this.http.get('/api/products'),
  config: this.http.get('/api/config')
}).subscribe(({ users, products, config }) => {
  // All data available simultaneously
});
```

## Summary
forkJoin is the Observable equivalent of Promise.all."
