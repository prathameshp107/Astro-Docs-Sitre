---
title: Object.defineProperty()
description: Fine-grained property definition with Object.defineProperty()
sidebar:
  order: 9
---

# Object.defineProperty()

## Introduction

`Object.defineProperty()` lets you define or modify a property with **fine-grained control** over its descriptor attributes.

## Syntax

```javascript
Object.defineProperty(obj, propertyName, descriptor);
```

## Example

```javascript
const user = {};

Object.defineProperty(user, 'id', {
  value: 12345,
  writable: false,    // cannot change
  enumerable: false,  // hidden from iteration
  configurable: false // cannot be deleted
});

console.log(user.id); // 12345
user.id = 999;        // ❌ Fails silently (strict: throws)
console.log(Object.keys(user)); // [] — not enumerable
```

## Getters and Setters

```javascript
const user = {
  _name: 'Alice'
};

Object.defineProperty(user, 'name', {
  get() { return this._name.toUpperCase(); },
  set(value) { this._name = value.trim(); },
  enumerable: true
});

user.name = '  bob  ';
console.log(user.name); // 'BOB'
```

## Use Cases

- Hiding internal properties (`enumerable: false`)
- Creating read-only properties (`writable: false`)
- Implementing computed properties (getters/setters)
- Library/Framework internal APIs

## Summary

- `Object.defineProperty()` gives full control over property behavior
- Use `writable: false` for constants
- Use `enumerable: false` to hide properties
- Use getters/setters for computed or validated properties

## Further Reading

- [MDN: Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
