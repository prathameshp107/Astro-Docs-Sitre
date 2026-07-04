---
title: "exhaustMap"
description: "Ignore new emissions while inner observable is active."
sidebar:
  order: 7
---

## Introduction
exhaustMap ignores new outer emissions while the current inner Observable is active. Perfect for preventing double submissions.

## Example

```typescript
submitClicks$.pipe(
  exhaustMap(() => this.http.post('/api/submit', data))
  // Second click is ignored while request is in flight
).subscribe();
```

## When to Use
- Login/Submit buttons (prevent double-clicks)
- Token refresh (don't refresh while already refreshing)

## Summary
exhaustMap prevents duplicate concurrent operations."
