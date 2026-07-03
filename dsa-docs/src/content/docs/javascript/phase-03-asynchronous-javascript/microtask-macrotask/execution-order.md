---
title: Execution Order
description: How the event loop prioritizes microtasks and macrotasks
sidebar:
  order: 2
---

# Execution Order

## Introduction

The event loop follows a strict order: each iteration processes one macrotask, then all available microtasks.

## The Execution Flow

```javascript
console.log('1. Start');

setTimeout(() => console.log('2. Macrotask'), 0);

Promise.resolve()
  .then(() => console.log('3. Microtask 1'))
  .then(() => console.log('4. Microtask 2'));

queueMicrotask(() => console.log('5. queueMicrotask'));

console.log('6. End');

// Output:
// 1. Start
// 6. End
// 3. Microtask 1  ← microtasks run first
// 4. Microtask 2  ← microtasks continue
// 5. queueMicrotask
// 2. Macrotask    ← one macrotask per cycle
```

## Practical Implications

```javascript
// Promise callbacks run before setTimeout
setTimeout(() => console.log('timeout'));
Promise.resolve().then(() => console.log('promise'));
// Output: promise, timeout

// Microtask queue is cleared after every macrotask
setTimeout(() => {
  console.log('macrotask 1');
  Promise.resolve().then(() => console.log('micro during macro'));
});
setTimeout(() => console.log('macrotask 2'));
// Output: macrotask 1, micro during macro, macrotask 2
```

## Summary

- One macrotask → all microtasks → render → repeat
- Microtask queue is fully cleared each cycle
- Macrotasks run one per event loop iteration
- Promise callbacks are microtasks (higher priority than setTimeout)

## Further Reading

- [HTML Spec: Event Loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)
