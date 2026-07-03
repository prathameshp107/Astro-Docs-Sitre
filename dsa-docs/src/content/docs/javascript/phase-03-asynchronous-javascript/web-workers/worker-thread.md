---
title: Worker Thread
description: Receiving messages and posting results from workers
sidebar:
  order: 2
---

# Worker Thread

## Introduction

The worker thread listens for messages from the main thread, processes data, and sends results back.

## Receiving and Sending

```javascript
// 📁 worker.js
// Receive data from main thread
onmessage = (event) => {
  const { numbers } = event.data;

  // Perform heavy computation
  const result = numbers.map(n => expensiveComputation(n));

  // Send result back to main thread
  postMessage(result);
};

function expensiveComputation(n) {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(n * i);
  }
  return result;
}
```

## Worker Self Reference

```javascript
// In a worker, `self` refers to the worker's global scope
self.onmessage = (event) => {
  self.postMessage(processData(event.data));
};

// self.close() terminates the worker from within
self.close();
```

## Summary

- Workers receive data via `onmessage` event
- Workers send results via `postMessage(data)`
- Use `self` to refer to the worker's global scope
- `self.close()` terminates the worker from inside

## Further Reading

- [MDN: Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker)
