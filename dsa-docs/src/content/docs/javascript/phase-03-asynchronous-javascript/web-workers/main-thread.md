---
title: Main Thread
description: Creating workers and communicating from the main thread
sidebar:
  order: 1
---

# Main Thread

## Introduction

The main thread creates workers, sends them data, and receives results via `postMessage()` and `onmessage`.

## Creating a Worker

```javascript
// Create a worker from a separate JS file
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

// Receive results from worker
worker.onmessage = (event) => {
  console.log('Result from worker:', event.data);
};

// Handle errors
worker.onerror = (error) => {
  console.error('Worker error:', error.message);
};
```

## Visual Explanation

```mermaid
flowchart LR
    subgraph "Main Thread"
        A["UI Updates"]
        B["User Events"]
        C["DOM Manipulation"]
    end

    subgraph "Worker Thread"
        D["Heavy Computation"]
        E["Data Processing"]
        F["File Parsing"]
    end

    Main -->|"postMessage()"| Worker
    Worker -->|"postMessage()"| Main

    style Worker fill:#4CAF50
    style Main fill:#2196F3
```

## Terminating a Worker

```javascript
// Stop the worker
worker.terminate();

// After termination, the worker can no longer be used
```

## Summary

- Create with `new Worker('file.js')`
- Send data with `worker.postMessage(data)`
- Receive with `worker.onmessage = (e) => {}`
- Terminate with `worker.terminate()`

## Further Reading

- [MDN: Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
