---
title: How It Works
description: The event loop mechanism in detail
sidebar:
  order: 1
---

# How It Works

## Introduction

The event loop continuously checks the call stack and task queues, moving callbacks to the stack when it's empty.

## Visual Explanation

```mermaid
flowchart LR
    A["Call Stack"]
    B["Web APIs"]
    C["Macrotask Queue"]
    D["Microtask Queue"]
    E["Event Loop 🔄"]

    A -->|"Async operation"| B
    B -->|"Callback ready"| C
    B -->|"Promise callback"| D
    E -->|"Monitor"| A
    E -->|"Check & move"| D
    E -->|"Check & move"| C

    style E fill:#FF9800,color:white
    style A fill:#4CAF50
    style D fill:#2196F3
    style C fill:#f44336
```

## The Four Components

1. **Call Stack** — Executes synchronous code (LIFO)
2. **Web APIs** — Handles async operations (timers, fetch, DOM events)
3. **Microtask Queue** — Promise callbacks, `queueMicrotask()`
4. **Macrotask Queue** — `setTimeout`, `setInterval`, I/O callbacks

## The Event Loop Cycle

```mermaid
flowchart TD
    Start["Event Loop Cycle"]
    Stack["Call Stack Empty?"]
    Microtask["Process ALL Microtasks"]
    Render["(Optional) Render"]
    Macrotask["Process ONE Macrotask"]

    Start --> Stack
    Stack -->|No| Stack
    Stack -->|Yes| Microtask
    Microtask -->|"Continue until queue empty"| Microtask
    Microtask -->|"Empty"| Render
    Render --> Macrotask
    Macrotask --> Start
```

## Summary

- Event loop monitors call stack and queues
- Processes all microtasks before each macrotask
- Call stack must be empty before processing callbacks
- Render step happens between microtasks and macrotasks

## Further Reading

- [MDN: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
