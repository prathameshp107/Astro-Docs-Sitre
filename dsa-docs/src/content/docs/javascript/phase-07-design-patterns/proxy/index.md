---
title: Proxy Pattern
description: Controlling access to objects with a proxy
sidebar:
  order: 8
---

# Proxy Pattern

## Introduction

The Proxy pattern provides a **surrogate** that controls access to another object. JavaScript has built-in `Proxy` for this.

## Implementation

```javascript
const user = { name: 'Alice', role: 'user' };

const protectedUser = new Proxy(user, {
  get(target, prop) {
    if (prop === 'password') {
      throw new Error('Access denied');
    }
    return target[prop];
  },

  set(target, prop, value) {
    if (prop === 'role' && target.role === 'admin') {
      throw new Error('Cannot change admin role');
    }
    target[prop] = value;
    return true;
  }
});

console.log(protectedUser.name);    // 'Alice'
// protectedUser.password;          // Error: Access denied

// Caching proxy
function createCacheProxy(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = target.apply(thisArg, args);
      cache.set(key, result);
      return result;
    }
  });
}
```

## Summary

- Controls access to target objects
- Built-in JavaScript `Proxy` API
- Use cases: validation, caching, logging, access control

## Further Reading

- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Refactoring Guru: Proxy](https://refactoring.guru/design-patterns/proxy)
