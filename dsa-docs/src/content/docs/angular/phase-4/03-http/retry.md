---
title: "Retry Strategies"
description: "Retry failed HTTP requests."
sidebar:
  order: 3
---

## Introduction
Retry strategies automatically re-attempt failed HTTP requests, improving resilience.

## Exponential Backoff

```typescript
http.get('/api/data').pipe(
  retry({
    count: 3,
    delay: (error, retryCount) => timer(Math.pow(2, retryCount) * 1000)
  }),
  catchError(err => of(fallbackData))
)
```

## Summary
Retry with exponential backoff is the standard pattern for resilient HTTP calls."
