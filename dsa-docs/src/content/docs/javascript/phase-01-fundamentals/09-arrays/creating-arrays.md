---
title: Creating Arrays
description: Different ways to create arrays in JavaScript
sidebar:
  order: 1
---

# Creating Arrays

## Introduction

JavaScript offers multiple ways to create arrays: literals, constructors, `Array.from()`, and `Array.of()`.

## Array Literal (Recommended)

```javascript
const fruits = ['apple', 'banana', 'orange'];
const mixed = [1, 'hello', true, null];
const empty = [];
const nested = [[1, 2], [3, 4]];
```

## Array Constructor

```javascript
const arr = new Array(5);    // Creates array of length 5 (empty slots)
const arr2 = new Array(1, 2, 3); // [1, 2, 3]
```

## Array.from()

```javascript
// From iterable
Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

// From array-like (with map function)
Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

## Array.of()

```javascript
Array.of(5);    // [5] — unlike new Array(5)
Array.of(1, 2); // [1, 2]
```

## Summary

- Use array literals `[]` for most cases
- `Array.from()` for converting iterables
- `Array.of()` to avoid constructor ambiguity

## Further Reading

- [MDN: Array Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
