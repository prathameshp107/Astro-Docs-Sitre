---
title: Object Pooling
description: Reusing objects to reduce garbage collection pressure
sidebar:
  order: 2
---

# Object Pooling

## Introduction

**Object pooling** reuses objects instead of creating new ones. It reduces garbage collection (GC) pressure and improves performance in scenarios with frequent allocations.

## Basic Object Pool

```javascript
// ❌ Creating new objects every frame (gaming/animations)
function createParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({ x: 0, y: 0, vx: 0, vy: 0, life: 1 });
  }
  return particles;
}

// ✅ Object pool pattern
class ObjectPool {
  constructor(factory, reset) {
    this.pool = [];
    this.factory = factory;
    this.reset = reset;
  }

  acquire() {
    return this.pool.pop() || this.factory();
  }

  release(obj) {
    this.reset(obj);
    this.pool.push(obj);
  }

  get size() {
    return this.pool.length;
  }
}

// Usage
const particlePool = new ObjectPool(
  () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 1 }),
  (p) => { p.x = 0; p.y = 0; p.vx = 0; p.vy = 0; p.life = 1; }
);

const p = particlePool.acquire();
p.x = 100;
p.y = 200;
// ... use particle ...
particlePool.release(p); // Return to pool
```

## Array Pooling

```javascript
const arrayPool = [];

function getArray() {
  return arrayPool.pop() || [];
}

function releaseArray(arr) {
  arr.length = 0; // Clear elements
  arrayPool.push(arr);
}

// Usage — reuse arrays instead of creating new ones
const temp = getArray();
for (const item of data) {
  temp.push(process(item));
}
// Use temp...
releaseArray(temp);
```

## When to Use Object Pooling

**Good for:**
- Game loops (particles, bullets, effects)
- Real-time data processing (audio, video frames)
- Animation frames
- Network packet processing

**Avoid for:**
- Simple UI state management
- Low-frequency operations
- Objects with expensive setup/teardown

## Summary

- Object pooling reuses objects to reduce GC pressure
- Common in games, animations, and real-time processing
- Every `acquire()` should have a matching `release()`
- Pool size grows naturally to meet demand

## Further Reading

- [Game Programming Patterns: Object Pool](https://gameprogrammingpatterns.com/object-pool.html)
