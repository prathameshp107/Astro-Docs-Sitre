---
title: Starvation
description: When microtasks prevent macrotasks from executing
sidebar:
  order: 3
---

# Microtask Starvation

## Introduction

If microtasks keep queuing new microtasks, the macrotask queue never gets processed. This is called **starvation**.

## The Problem

```javascript
// ⚠️ Microtasks keep queuing new microtasks
function loop() {
  queueMicrotask(() => {
    console.log('Microtask');
    loop(); // Keeps adding more microtasks
  });
}

loop();

setTimeout(() => {
  console.log('This may never run!');
}, 100);
// Macrotasks get starved by infinite microtasks
```

## Why This Matters

In real applications, promise chains could accidentally starve the event loop:

```javascript
async function processItems(items) {
  for (const item of items) {
    // Each await adds a microtask
    await Promise.resolve().then(() => processItem(item));
  }
}
// This might delay rendering and user interactions
```

## Prevention

```javascript
// Yield to the event loop periodically
async function processItems(items) {
  for (const item of items) {
    processItem(item); // Synchronous processing
    if (item.index % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0)); // Yield
    }
  }
}
```

## Summary

- Microtasks run continuously until the queue is empty
- Infinite microtask loops starve macrotasks
- setTimeout, rendering, and I/O can be delayed
- Yield periodically in long microtask chains

## Further Reading

- [MDN: Microtask guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)
