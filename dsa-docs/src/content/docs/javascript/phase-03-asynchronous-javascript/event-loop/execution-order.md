---
title: Execution Order
description: Understanding what runs when in the event loop
sidebar:
  order: 2
---

# Execution Order

## Introduction

Understanding the exact order JavaScript executes code helps you predict behavior and avoid bugs.

## The Classic Example

```javascript
console.log('1. Sync');

setTimeout(() => console.log('2. setTimeout'), 0);

Promise.resolve().then(() => console.log('3. Promise'));

queueMicrotask(() => console.log('4. Microtask'));

console.log('5. Sync end');

// Output:
// 1. Sync
// 5. Sync end
// 3. Promise    ← microtask queue
// 4. Microtask  ← microtask queue
// 2. setTimeout ← macrotask queue
```

## Why This Order?

1. **Sync code** runs first (call stack)
2. **Microtasks** (Promise.then, queueMicrotask) run next
3. **Macrotasks** (setTimeout) run last

## Real-World Example

```javascript
document.getElementById('button').addEventListener('click', () => {
  console.log('Click event');
});

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

// Clicking the button:
// 1. Promise  ← microtask
// 2. Timeout  ← macrotask
// 3. Click    ← macrotask (user events have higher priority)
```

## Summary

- Sync code always completes before async callbacks
- Microtasks (promises) run before macrotasks (setTimeout)
- `queueMicrotask()` adds to the microtask queue
- Each event loop cycle: 1 macrotask → all microtasks → render

## Further Reading

- [YouTube: Jake Archibald — In The Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
