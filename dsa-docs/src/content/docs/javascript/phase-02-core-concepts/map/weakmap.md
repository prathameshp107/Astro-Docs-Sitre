---
title: WeakMap
description: WeakMap for garbage-collectable key-value pairs with object keys
sidebar:
  order: 4
---

# WeakMap

## Introduction

**WeakMap** is a Map variant where keys **must be objects** and references are **weak** — if no other references exist to a key object, the entry is garbage collected.

## Basic Usage

```javascript
const wm = new WeakMap();
let user = { name: 'Alice' };

wm.set(user, { role: 'admin' });
console.log(wm.get(user)); // { role: 'admin' }
console.log(wm.has(user)); // true

user = null; // user object can now be GC'd
// The WeakMap entry is automatically removed
```

## Limitations

```javascript
const wm = new WeakMap();

// ❌ Keys must be objects
wm.set('string', 'value'); // TypeError

// ❌ No iteration methods
wm.keys();   // Not available
wm.values(); // Not available
wm.forEach(); // Not available

// ❌ No size property
console.log(wm.size); // undefined

// ✅ Only these methods work:
wm.set(key, value);
wm.get(key);
wm.has(key);
wm.delete(key);
```

## Practical Use Cases

```javascript
// 1. Private data
const privateData = new WeakMap();
class Person {
  constructor(name, ssn) {
    privateData.set(this, { ssn });
    this.name = name;
  }
  getSSN() {
    return privateData.get(this).ssn;
  }
}

// 2. DOM element metadata
const elementData = new WeakMap();
const btn = document.getElementById('submit');
elementData.set(btn, { clicks: 0 });

btn.addEventListener('click', () => {
  const data = elementData.get(btn);
  data.clicks++;
});

// When btn is removed from DOM, metadata is auto-GC'd!

// 3. Caching
const cache = new WeakMap();
function computeExpensive(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = { computed: obj.value * 2 };
  cache.set(obj, result);
  return result;
}
```

## WeakMap vs Map

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any | Objects only |
| References | Strong (prevents GC) | Weak (allows GC) |
| Iterable | ✅ Yes | ❌ No |
| Size property | ✅ Yes | ❌ No |
| Memory leak risk | Higher | Lower |
| Use case | General storage | Object-associated metadata |

## Summary

- WeakMap keys must be objects
- Weak references allow garbage collection
- Not iterable — cannot enumerate keys
- Perfect for private data, DOM metadata, and caching
- Prevents memory leaks with temporary objects

## Further Reading

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Previous: Iteration](./iteration)
