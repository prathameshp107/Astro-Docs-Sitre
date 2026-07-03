---
title: "concatMap"
description: "Sequential inner observable execution."
sidebar:
  order: 6
---

## Introduction
concatMap queues inner Observables and processes them one at a time, waiting for each to complete before starting the next.

## Example

```typescript
actions$.pipe(
  concatMap(action => this.processAction(action))
  // Strictly sequential
).subscribe();
```

## When to Use
- Sequential file uploads
- Ordered form submissions
- Any scenario requiring order preservation

## Summary
concatMap guarantees sequential processing order."
