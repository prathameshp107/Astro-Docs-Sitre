---
title: performance.now()
description: High-resolution timing with sub-millisecond precision
sidebar:
  order: 1
---

# performance.now()

## Introduction

`performance.now()` returns a high-resolution timestamp (in milliseconds) with sub-millisecond precision — far more accurate than `Date.now()`.

## Basic Usage

```javascript
const start = performance.now();

// Code to measure
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

const end = performance.now();
console.log(`Took ${end - start}ms`);
```

## Date.now() vs performance.now()

| Feature | Date.now() | performance.now() |
|---------|-----------|-------------------|
| Precision | Milliseconds | Microseconds (fractional ms) |
| Monotonic | No (can jump with system clock) | Yes (always increases) |
| Purpose | Calendar time | Code performance measurement |

```javascript
// Date.now() can be affected by clock changes
const t1 = Date.now();
await someAsyncOperation();
const t2 = Date.now(); // Could be wrong if clock adjusted!

// performance.now() is monotonic — always reliable
const p1 = performance.now();
await someAsyncOperation();
const p2 = performance.now(); // Always accurate
```

## Measuring Async Operations

```javascript
async function measureAsync() {
  const start = performance.now();

  await fetch('/api/data');
  await processData();

  const duration = performance.now() - start;
  console.log(`Total async operation: ${duration.toFixed(2)}ms`);
}
```

## Measuring Individual Operations

```javascript
function measureOperation(fn, iterations = 1000) {
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const total = performance.now() - start;
  const average = total / iterations;
  console.log(`Total: ${total.toFixed(2)}ms, Average: ${average.toFixed(4)}ms`);
}

// Usage
measureOperation(() => Math.sqrt(42));
measureOperation(() => [1, 2, 3].map(n => n * 2), 10000);
```

## Summary

- Sub-millisecond precision (fractional milliseconds)
- Monotonic clock — not affected by system time changes
- Ideal for measuring code performance
- Use with `Date.now()` for timestamps; use `performance.now()` for durations

## Further Reading

- [MDN: performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
