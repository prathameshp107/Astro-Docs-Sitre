---
title: Map vs Object
description: Key differences between Map and Object and when to use each
sidebar:
  order: 2
---

# Map vs Object

## Introduction

Both Map and Object store key-value pairs, but they have significant differences in key types, iteration, and performance.

## Comparison Table

| Feature | Map | Object |
|---------|-----|--------|
| Key types | Any (primitives, objects, functions) | String or Symbol only |
| Order | Insertion order | Integer keys first, then insertion |
| Size | `.size` property | Manual (`Object.keys().length`) |
| Iteration | Directly iterable (`for...of`) | Needs `Object.keys/values/entries` |
| Prototype | None (no inherited keys) | Has Object.prototype |
| JSON | No native serialization | `JSON.stringify()` works |
| Performance | Better with frequent add/delete | Better for property access |

## When to Use Map

```javascript
// ✅ Map for dynamic key collections
const userRoles = new Map();
userRoles.set(user1, 'admin');
userRoles.set(user2, 'user');
userRoles.set(user3, 'editor');

// ✅ Map for frequent add/delete
const cache = new Map();
function memoized(fn) {
  return function(key) {
    if (cache.has(key)) return cache.get(key);
    const result = fn(key);
    cache.set(key, result);
    return result;
  };
}

// ✅ Map when keys are objects or mixed types
const mixed = new Map();
mixed.set(1, 'number');
mixed.set('1', 'string');
mixed.set(true, 'boolean');
mixed.set({ obj: true }, 'object');
```

## When to Use Object

```javascript
// ✅ Object for fixed known keys
const config = {
  theme: 'dark',
  lang: 'en',
  debug: false
};

// ✅ Object when JSON serialization is needed
const data = { id: 1, name: 'Alice' };
const json = JSON.stringify(data);

// ✅ Object for a simple record/struct
const point = { x: 10, y: 20 };
```

## Key Type Demonstration

```javascript
// Object: keys are coerced to strings
const obj = {};
obj[42] = 'number';
obj['42'] = 'string'; // overwrites!
console.log(obj); // { '42': 'string' }

// Map: keys retain their type
const map = new Map();
map.set(42, 'number');
map.set('42', 'string');
console.log(map.get(42));  // 'number'
console.log(map.get('42')); // 'string'
```

## Summary

- Use **Map** for dynamic keys, object keys, frequent add/delete, and iteration
- Use **Object** for fixed keys, JSON serialization, and simple records
- Map has better performance for collections that change frequently
- Object is more natural for configuration and data transfer

## Further Reading

- [MDN: Map vs Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)
- [Previous: Map Methods](./map-methods)
- [Next: Iteration](./iteration)
