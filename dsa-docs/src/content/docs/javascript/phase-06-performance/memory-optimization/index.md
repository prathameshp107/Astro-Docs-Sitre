---
title: Memory Optimization
description: Reducing memory footprint and preventing leaks in JavaScript applications
sidebar:
  order: 3
---

# Memory Optimization

## Introduction

Memory optimization is critical for performance, especially on mobile devices. Optimized memory usage means faster page loads, smoother animations, and better battery life.

## Topics Covered

- [Common Memory Leaks](./common-leaks) — Global variables, detached DOM, and closures
- [Object Pooling](./object-pooling) — Reusing objects to reduce GC pressure
- [Event Cleanup](./event-cleanup) — Preventing listener leaks with proper teardown

## Key Strategies

### 1. Avoid Global Variables

```javascript
// ❌ Leaks to global scope
function bad() { data = 'leaked'; }

// ✅ Properly scoped
function good() { let data = 'scoped'; }
```

### 2. Object Pooling

```javascript
// ❌ Creating new objects repeatedly
function createParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({ x: 0, y: 0, vx: 0, vy: 0 });
  }
  return particles;
}

// ✅ Reusing objects (object pooling)
const particlePool = [];
function getParticle() {
  return particlePool.pop() || { x: 0, y: 0, vx: 0, vy: 0 };
}
function releaseParticle(p) {
  particlePool.push(p);
}
```

### 3. Limit Closures Holding Large Data

```javascript
// ❌ Closure holds large data forever
function processData() {
  const largeData = new Array(1000000);
  return function() {
    console.log('Still holds largeData');
  };
}

// ✅ Clear reference when no longer needed
function processData() {
  const largeData = new Array(1000000);
  const result = computeResult(largeData);
  return function() {
    console.log(result); // Only holds result, not largeData
  };
}
```

### 4. Proper Event Cleanup

```javascript
class Component {
  mount() {
    this.handler = () => { /* ... */ };
    window.addEventListener('resize', this.handler);
  }
  
  unmount() {
    window.removeEventListener('resize', this.handler); // ✅
  }
}
```

## Summary

- Avoid global variables
- Use object pooling for frequently created objects
- Be careful with closures holding large data
- Always clean up event listeners
- Use WeakMap/WeakSet for object-associated metadata

## Further Reading

- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [Chrome DevTools: Memory Issues](https://developer.chrome.com/docs/devtools/memory-problems/)
