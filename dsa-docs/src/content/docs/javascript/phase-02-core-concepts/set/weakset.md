---
title: WeakSet
description: WeakSet for garbage-collectable object collections
sidebar:
  order: 3
---

# WeakSet

## Introduction

**WeakSet** is a Set variant where values **must be objects** and references are **weak** — if no other references exist to an object, it can be garbage collected and automatically removed.

## Basic Usage

```javascript
const ws = new WeakSet();
let user = { name: 'Alice' };

ws.add(user);
console.log(ws.has(user)); // true

user = null; // user object can now be GC'd
// The WeakSet entry is automatically removed
```

## Limitations

```javascript
const ws = new WeakSet();

// ❌ Values must be objects
ws.add(42); // TypeError: Invalid value

// ❌ No iteration methods
ws.forEach(); // Not available
for (const v of ws) {} // TypeError

// ❌ No size property
console.log(ws.size); // undefined

// ✅ Only these methods work:
ws.add(obj);
ws.has(obj);
ws.delete(obj);
```

## Practical Use Cases

```javascript
// 1. Prevent double-processing
const processed = new WeakSet();

function processItem(item) {
  if (processed.has(item)) return; // already processed
  processed.add(item);
  // process the item...
}

// 2. Mark objects as visited (e.g., graph traversal)
function hasCycle(graph) {
  const visited = new WeakSet();
  
  function dfs(node) {
    if (visited.has(node)) return true;
    visited.add(node);
    
    for (const neighbor of node.neighbors) {
      if (dfs(neighbor)) return true;
    }
    return false;
  }
  
  return dfs(graph.root);
}

// 3. Track active instances without preventing GC
const activeInstances = new WeakSet();

class Component {
  constructor() {
    activeInstances.add(this);
  }
  
  destroy() {
    // Cleanup logic
    activeInstances.delete(this);
  }
}
```

## WeakSet vs Set

| Feature | Set | WeakSet |
|---------|-----|---------|
| Values | Any type | Objects only |
| References | Strong | Weak |
| Iterable | ✅ Yes | ❌ No |
| Size property | ✅ Yes | ❌ No |
| Memory leak risk | Higher | Lower (auto-cleanup) |
| Use case | General storage | Object tracking |

## Summary

- WeakSet values must be objects (weak references)
- Not iterable — cannot enumerate
- Use for tracking/flagging objects without preventing GC
- Great for: marking visited nodes, preventing double-processing
- Auto-cleaned when objects are garbage collected

## Further Reading

- [MDN: WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
- [Previous: Set Operations](./set-operations)
