---
title: find() and findIndex()
description: Searching arrays with find() and findIndex()
sidebar:
  order: 7
---

# find() & findIndex()

## Introduction

`find()` returns the **first element** that passes a test. `findIndex()` returns the **index** of the first passing element.

## Examples

```javascript
const numbers = [5, 12, 8, 130, 44];

numbers.find(x => x > 10);      // 12
numbers.findIndex(x => x > 10); // 1
numbers.find(x => x > 200);     // undefined
```

## Objects

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

users.find(user => user.id === 2);
// { id: 2, name: 'Bob' }
```

## Summary

- `find` — returns first matching element (or undefined)
- `findIndex` — returns index of first match (or -1)
- Stops searching after first match (efficient)

## Further Reading

- [MDN: Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
