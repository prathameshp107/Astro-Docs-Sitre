---
title: Phase 3 — Asynchronous JavaScript
description: Master asynchronous JavaScript — callbacks, promises, async/await, event loop, fetch, workers, and timing patterns
sidebar:
  order: 3
---

# Phase 3 — Asynchronous JavaScript

## Introduction

Asynchronous JavaScript is what makes the web work. From fetching data to handling user interactions, async programming is essential. This phase covers the **event loop**, **promises**, **async/await**, **fetch API**, **web workers**, and performance patterns like **debounce** and **throttle**.

## Learning Objectives

- Understand synchronous vs asynchronous execution
- Master promises, async/await, and the event loop
- Make HTTP requests with the Fetch API
- Run background code with Web Workers
- Optimize performance with debounce and throttle

## Prerequisites

- Phase 1 — Fundamentals
- Phase 2 — Core Concepts (especially execution context and call stack)

## Topics Covered

| Topic | Description |
|-------|-------------|
| Sync vs Async | Blocking vs non-blocking execution |
| Callbacks | Traditional async patterns |
| Callback Hell | The pyramid of doom problem |
| Promises | Clean async control flow |
| Promise Chaining | Sequential async operations |
| Promise APIs | Promise.all, .race, .any, .allSettled |
| Async/Await | Syntactic sugar for promises |
| Event Loop | How JavaScript handles concurrency |
| Microtask Queue | Promise callbacks, queueMicrotask |
| Macrotask Queue | setTimeout, setInterval, I/O |
| Fetch API | Modern HTTP requests |
| AbortController | Cancelling fetch requests |
| Web Workers | Background thread execution |
| requestAnimationFrame | Smooth visual updates |
| Debounce | Rate-limiting rapid events |
| Throttle | Ensuring minimum execution intervals |

## Learning Path

```
Sync vs Async → Callbacks → Callback Hell → Promises → Promise Chaining → Promise APIs → Async/Await → Event Loop → Microtask/Macrotask Queues → Fetch → AbortController → Web Workers → requestAnimationFrame → Debounce → Throttle
```

## Estimated Learning Time

**4–6 hours**

## Related Topics

- Phase 2 — Core Concepts (execution context, call stack)
- Phase 4 — Browser APIs
- Phase 6 — Performance
