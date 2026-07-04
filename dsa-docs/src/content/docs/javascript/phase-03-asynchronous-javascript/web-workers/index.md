---
title: Web Workers
description: Running JavaScript in background threads with Web Workers
sidebar:
  order: 11
---

# Web Workers

## Introduction

**Web Workers** allow JavaScript to run in a **background thread** separate from the main execution thread, enabling CPU-intensive operations without blocking the UI.

## Topics Covered

- [Main Thread](./main-thread) — Creating workers and communicating from the main thread
- [Worker Thread](./worker-thread) — Receiving messages and posting results from workers
- [Limitations](./limitations) — What workers can and cannot access
- [Transferable Objects](./transferable-objects) — Zero-copy data transfer for performance

## Learning Objectives

- Create and communicate with Web Workers
- Understand worker limitations (no DOM access)
- Use transferable objects for large data

## Summary

Workers run JS in a separate thread. Communicate via `postMessage()` and `onmessage`. No DOM access. Transferable objects for zero-copy data passing.

## Further Reading

- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
