---
title: Memory Leaks
description: Common JavaScript memory leak patterns and how to prevent them
sidebar:
  order: 3
---

# Memory Leaks

## Introduction

A **memory leak** occurs when memory that is no longer needed is not released. JavaScript's garbage collector handles most cleanup, but certain patterns can prevent it.

## 1. Accidental Global Variables

```javascript
function leak() {
  leaked = 'I am global'; // ❌ no var/let/const!
}
leak();
console.log(leaked); // 'I am global' — never GC'd!

// ✅ Fix: always use let/const
function noLeak() {
  const local = 'I am local';
}
```

## 2. Forgotten Timers

```javascript
const data = new Array(1000000).fill('large data');

// ❌ setInterval keeps reference to data forever
setInterval(() => {
  console.log(data.length);
}, 1000);

// ✅ Fix: clear when no longer needed
const timer = setInterval(() => {
  console.log(data.length);
}, 1000);
// clearInterval(timer) when component unmounts
```

## 3. Closures Holding References

```javascript
// ❌ Closure keeps large data alive
function createLeak() {
  const largeData = new Array(1000000).fill('data');
  return function() {
    console.log('closure still references largeData');
  };
}
const leakedFn = createLeak(); // largeData can't be GC'd

// ✅ Fix: only reference what's needed
function createNoLeak() {
  const largeData = new Array(1000000).fill('data');
  const message = 'small message';
  return function() {
    console.log(message); // only closes over 'message'
  };
}
```

## 4. Detached DOM Elements

```javascript
const btn = document.getElementById('button');

// ❌ Holds reference to removed element
btn.addEventListener('click', () => {
  console.log(btn.id); // still referenced!
});
btn.remove(); // DOM element disconnected but still in memory

// ✅ Fix: clean up references
function setupButton() {
  const btn = document.getElementById('button');
  const handler = () => console.log(btn.id);
  btn.addEventListener('click', handler);
  
  // Return cleanup function
  return () => {
    btn.removeEventListener('click', handler);
  };
}
```

## 5. Event Listeners Not Removed

```javascript
class Component {
  mount() {
    window.addEventListener('resize', this.handleResize);
  }
  
  // ❌ Forgot to remove listener
  // destroy() { 
  //   window.removeEventListener('resize', this.handleResize);
  // }
  
  handleResize() { /* ... */ }
}
```

## Detection

```javascript
// Chrome DevTools: Performance tab
// 1. Record heap allocations
// 2. Look for growing memory usage
// 3. Take heap snapshots to find retained objects
// 4. Check "Detached DOM nodes" in heap snapshot
```

## Prevention Checklist

- ✅ Always declare variables with `let`/`const`
- ✅ Clear `setInterval`/`setTimeout` IDs on cleanup
- ✅ Remove event listeners when unmounting
- ✅ Use WeakMap/WeakSet for cache/metadata on objects
- ✅ Nullify references to large data when done
- ✅ Avoid closures over large data
- ✅ Detach DOM references when elements are removed

## Summary

- Memory leaks happen when the GC can't free memory
- Common causes: globals, timers, closures, event listeners
- Use cleanup patterns (similar to useEffect return functions)
- Chrome DevTools: Heap snapshots + Performance recording
- WeakMap/WeakSet help prevent leaks with object data

## Further Reading

- [MDN: Memory Leaks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#memory_leaks)
- [Previous: Memory Lifecycle](./memory-lifecycle)
