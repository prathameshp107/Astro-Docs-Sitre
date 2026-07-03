---
title: Common Memory Leaks
description: Global variables, detached DOM, and closure-related leaks
sidebar:
  order: 1
---

# Common Memory Leaks

## Introduction

Memory leaks happen when the application holds references to memory that's no longer needed. They cause performance degradation over time.

## Global Variables

```javascript
// ❌ Leaks to global scope
function bad() {
  data = 'leaked'; // Implicit global!
}

// ❌ Accidental global through 'this'
function leaky() {
  this.leak = 'global leak';
}
leaky(); // 'this' is window!

// ✅ Properly scoped
function good() {
  let data = 'scoped'; // Local variable — GC eligible
}
```

## Forgotten Timers & Intervals

```javascript
// ❌ Timer holds reference to DOM element
function startTimer() {
  const element = document.getElementById('heavy');
  setInterval(() => {
    element.innerHTML = Date.now(); // Holds element reference forever!
  }, 1000);
}

// ✅ Clean up timers
function startSafeTimer() {
  const element = document.getElementById('heavy');
  const timer = setInterval(() => {
    element.innerHTML = Date.now();
  }, 1000);
  // Store timer reference to clear later
  return () => clearInterval(timer);
}
```

## Detached DOM Elements

```javascript
// ❌ Removed from DOM but still referenced
const detachedElements = [];

function createAndDetach() {
  const el = document.createElement('div');
  el.textContent = 'I am detached';
  document.body.appendChild(el);
  document.body.removeChild(el); // Removed from DOM
  detachedElements.push(el);     // But still referenced! ❌
  // Memory leak — DOM elements stay in memory
}
```

## Closures Holding Large Data

```javascript
// ❌ Closure holds entire large array forever
function processData() {
  const largeArray = new Array(1000000).fill('data');
  return function() {
    console.log(largeArray.length); // Holds reference to largeArray
  };
}

// ✅ Clear reference after use
function processDataSafely() {
  const largeArray = new Array(1000000).fill('data');
  const result = largeArray.length;
  largeArray = null; // Allow GC
  return function() {
    console.log(result); // Only holds a number, not the array
  };
}

// ✅ Or use closure carefully
function processDataBetter() {
  const result = new Array(1000000).fill('data').length;
  return () => console.log(result);
}
```

## Detecting Leaks

```javascript
// In Chrome DevTools:
// 1. Memory tab → Heap snapshot
// 2. Take initial snapshot
// 3. Perform actions in the app
// 4. Take another snapshot
// 5. Compare — look for detached DOM nodes

// Programmatic memory check
if (performance.memory) {
  console.log(`JS Heap: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
}
```

## Summary

- Global variables are the #1 cause of leaks
- Always clean up timers, intervals, and event listeners
- Detached DOM elements still in array = leak
- Closures can unintentionally hold large data
- Use Chrome DevTools Memory tab to detect leaks

## Further Reading

- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
