---
title: "Error Handling"
description: "Handle errors in RxJS streams."
sidebar:
  order: 11
---

## Introduction
RxJS provides operators for graceful error recovery without terminating the stream.

## Operators

```typescript
// catchError — recover from errors
http.get('/api/data').pipe(
  catchError(err => {
    console.error(err);
    return of([]); // Return fallback
  })
)

// retry — retry failed requests
http.get('/api/data').pipe(
  retry({ count: 3, delay: (_, n) => timer(Math.pow(2, n) * 1000) })
)
```

## Summary
Proper error handling ensures streams remain resilient in production."
