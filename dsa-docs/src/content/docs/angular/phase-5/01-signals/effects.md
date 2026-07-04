---
title: "Effects"
description: "Side effects with Signals."
sidebar:
  order: 3
---

## Introduction
Effects run side effects when signal dependencies change — like console.log, localStorage, or analytics.

## Example

```typescript
effect(() => {
  console.log(`Count changed to: ${this.count()}`);
  // Runs automatically when count() changes
});

// With cleanup
effect((onCleanup) => {
  const subscription = someObservable$.subscribe(v => console.log(v));
  onCleanup(() => subscription.unsubscribe());
});
```

## Summary
Effects handle side effects triggered by signal changes."
