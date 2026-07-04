---
title: Transferable Objects
description: Zero-copy data transfer for better performance
sidebar:
  order: 4
---

# Transferable Objects

## Introduction

Transferable objects allow data to be moved between threads with zero copying — ownership is transferred instead of cloning the data.

## The Problem

```javascript
// Without transferable objects, large data is CLONED (slow)
const largeData = new ArrayBuffer(1024 * 1024 * 100); // 100MB
worker.postMessage(largeData); // CLONING — 100MB copy!
```

## The Solution

```javascript
// With transferable objects, ownership is TRANSFERRED (fast)
const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB

worker.postMessage(buffer, [buffer]);
// buffer is now EMPTY in the main thread — ownership transferred
// Much faster than cloning for large data
```

## What Can Be Transferred

```javascript
// Transferable types:
// - ArrayBuffer
// - MessagePort
// - ImageBitmap
// - OffscreenCanvas
// - ReadableStream, WritableStream, TransformStream

// After transfer, the original is detached
const buf = new ArrayBuffer(1024);
worker.postMessage(buf, [buf]);
console.log(buf.byteLength); // 0 — detached!
```

## Summary

- Transferable objects avoid cloning large data
- Ownership is transferred, not copied
- Original reference becomes empty after transfer
- Ideal for large ArrayBuffers, canvases, streams

## Further Reading

- [MDN: Transferable](https://developer.mozilla.org/en-US/docs/Web/API/Transferable)
