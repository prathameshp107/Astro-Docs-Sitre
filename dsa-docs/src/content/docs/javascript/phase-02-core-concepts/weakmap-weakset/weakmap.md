---
title: WeakMap
description: WeakMap for garbage-collectable key-value pairs with object keys
sidebar:
  order: 1
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

user = null; // The WeakMap entry is auto-removed!
```

## Limitations

- Keys **must be objects** (no primitives)
- No iteration methods (no `.keys()`, `.values()`, `.forEach()`)
- No `.size` property
- Only `.set()`, `.get()`, `.has()`, `.delete()` available

## Use Cases

```javascript
// Private data
const privateData = new WeakMap();
class Person {
  constructor(name, ssn) {
    privateData.set(this, { ssn });
  }
  getSSN() { return privateData.get(this).ssn; }
}

// DOM element metadata (auto-cleaned on removal)
const elementData = new WeakMap();
elementData.set(btn, { clicks: 0 });
```

## WeakMap vs Map

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any | Objects only |
| References | Strong | Weak |
| Iterable | ✅ | ❌ |
| Size | ✅ | ❌ |

## Further Reading

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Next: WeakSet](./weakset)
