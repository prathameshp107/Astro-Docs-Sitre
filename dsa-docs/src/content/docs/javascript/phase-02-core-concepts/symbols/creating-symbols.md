---
title: Creating Symbols
description: Creating and using JavaScript symbols — Symbol(), Symbol.for(), Symbol.keyFor()
sidebar:
  order: 1
---

# Creating Symbols

## Introduction

Symbols are created using the `Symbol()` function. Each call creates a **completely unique** value.

## Symbol() — Unique Symbols

```javascript
const sym1 = Symbol('debug');
const sym2 = Symbol('debug');

console.log(sym1 === sym2); // false — every Symbol is unique!
console.log(typeof sym1);   // 'symbol'
console.log(sym1.toString()); // 'Symbol(debug)'
```

## Symbol.for() — Global Registry

```javascript
const sym1 = Symbol.for('app.id');
const sym2 = Symbol.for('app.id');

console.log(sym1 === sym2); // true — same symbol from registry
console.log(Symbol.keyFor(sym1)); // 'app.id'
```

## Symbol() vs Symbol.for()

| Aspect | `Symbol()` | `Symbol.for()` |
|--------|-----------|----------------|
| Uniqueness | Always unique | Shared globally |
| Same description | Different symbols | Same symbol |
| Use case | Private, unique keys | Cross-realm sharing |

## Using Symbols as Property Keys

```javascript
const id = Symbol('id');

const user = {
  name: 'Alice',
  [id]: 12345  // Symbol as property key
};

console.log(user[id]);   // 12345
console.log(user.name);  // 'Alice'

// Symbols don't appear in normal enumeration
console.log(Object.keys(user));           // ['name']
console.log(JSON.stringify(user));        // {'name':'Alice'}
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]
```

## Summary

- `Symbol()` creates unique, private keys
- `Symbol.for()` creates/retrieves global symbols
- Symbols as property keys are hidden from normal iteration
- `Object.getOwnPropertySymbols()` retrieves symbol keys
- Great for metadata, private properties, and framework internals

## Further Reading

- [MDN: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Next: Well-Known Symbols](./well-known-symbols)
