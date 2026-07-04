---
title: Object.freeze()
description: Making objects immutable with Object.freeze()
sidebar:
  order: 6
---

# Object.freeze()

## Introduction

`Object.freeze()` makes an object **immutable** — you cannot add, delete, or change its properties. It's a **shallow** freeze.

## Example

```javascript
const config = Object.freeze({
  apiUrl: 'https://api.example.com',
  timeout: 5000
});

config.apiUrl = 'https://evil.com'; // ❌ Fails silently (strict mode: throws)
config.newProp = 'test';            // ❌ Cannot add
delete config.timeout;              // ❌ Cannot delete
Object.isFrozen(config);            // true
```

## Shallow Freeze

```javascript
const config = Object.freeze({
  settings: { theme: 'dark' }
});

config.settings.theme = 'light'; // ✅ Allowed — nested object is not frozen
```

## Deep Freeze

```javascript
function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
}
```

## Summary

- `Object.freeze()` makes objects immutable (shallow)
- Use for configuration objects and constants
- Deep freeze required for nested objects
- Check with `Object.isFrozen()`

## Further Reading

- [MDN: Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
