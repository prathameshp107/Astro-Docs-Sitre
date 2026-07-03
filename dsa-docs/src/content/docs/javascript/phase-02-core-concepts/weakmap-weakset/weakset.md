---
title: WeakSet
description: WeakSet for garbage-collectable object collections
sidebar:
  order: 2
---

# WeakSet

## Introduction

**WeakSet** is a Set variant where values **must be objects** and references are **weak** — if no other references exist, the object can be garbage collected and automatically removed.

## Basic Usage

```javascript
const ws = new WeakSet();
let user = { name: 'Alice' };

ws.add(user);
console.log(ws.has(user)); // true

user = null; // Auto-removed from WeakSet!
```

## Limitations

- Values **must be objects** (no primitives)
- No iteration methods (no `.forEach()`, no `for...of`)
- No `.size` property
- Only `.add()`, `.has()`, `.delete()` available

## Use Cases

```javascript
// Prevent double-processing
const processed = new WeakSet();
function processItem(item) {
  if (processed.has(item)) return;
  processed.add(item);
  // process...
}

// Track visited nodes in graph
const visited = new WeakSet();
function dfs(node) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const n of node.neighbors) dfs(n);
}
```

## WeakSet vs Set

| Feature | Set | WeakSet |
|---------|-----|---------|
| Values | Any type | Objects only |
| References | Strong | Weak |
| Iterable | ✅ | ❌ |
| Size | ✅ | ❌ |

## Further Reading

- [MDN: WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
- [Previous: WeakMap](./weakmap)
