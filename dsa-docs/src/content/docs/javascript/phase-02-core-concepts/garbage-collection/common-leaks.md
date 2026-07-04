---
title: Common Memory Leaks
description: Patterns that prevent garbage collection and cause memory leaks
sidebar:
  order: 3
---

# Common Memory Leaks

## Introduction

These patterns create references that prevent garbage collection even when the objects are no longer needed.

## 1. Accidental Globals

```javascript
function bad() {
  leak = 'global'; // ❌ No declaration → global scope
  this.alsoLeak = 'global'; // ❌ 'this' is global in non-strict
}
```

## 2. Forgotten Closures

```javascript
const heavy = new Array(1000000);
const btn = document.getElementById('btn');

// ❌ The closure holds 'heavy' as long as 'btn' exists
btn.addEventListener('click', () => {
  console.log(heavy); // heavy can't be GC'd
});

// ✅ Only reference what's needed
btn.addEventListener('click', () => {
  console.log('clicked!'); // no large reference
});
```

## 3. Detached DOM Nodes

```javascript
let element = document.getElementById('temp');
document.body.appendChild(element);
document.body.removeChild(element);
// element variable still holds reference → not GC'd!
element = null; // Now it can be collected
```

## 4. Outdated References

```javascript
const cache = new Map();
function processUser(user) {
  cache.set(user.id, user);
  // If user is deleted, cache still holds the reference
}

// ✅ Use WeakMap for auto-cleanup
const betterCache = new WeakMap();
```

## 5. Forgotten Subscriptions

```javascript
class Store {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(callback) {
    this.subscribers.add(callback);
    // ✅ Return unsubscribe function
    return () => this.subscribers.delete(callback);
  }
}
```

## Detection

- Chrome DevTools → Memory tab → Heap Snapshots
- Look for "Detached DOM nodes"
- Record allocation timeline
- Compare snapshots before/after actions

## Summary

- Most leaks are caused by **lingering references**
- Closures, event listeners, and subscriptions are common culprits
- Always clean up with cleanup/unsubscribe patterns
- Use WeakMap/WeakSet for object-associated data
- Heap snapshots in DevTools help find leaks

## Further Reading

- [Previous: Generational GC](./generational-gc)
- [Chrome DevTools: Memory](https://developer.chrome.com/docs/devtools/memory/)
