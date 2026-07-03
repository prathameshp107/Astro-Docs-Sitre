---
title: Array Destructuring
description: Extracting values from arrays
sidebar:
  order: 1
---

# Array Destructuring

## Introduction

Array destructuring extracts values from arrays into individual variables using a concise syntax.

## Basic Destructuring

```javascript
const numbers = [1, 2, 3, 4, 5];

const [first, second] = numbers;
console.log(first);  // 1
console.log(second); // 2
```

## Skipping Elements

```javascript
const [a, , b] = numbers;
console.log(a); // 1
console.log(b); // 3
```

## Rest Pattern

```javascript
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]
```

## Default Values

```javascript
const [x = 0, y = 0, z = 0] = [1, 2];
console.log(z); // 0 (default)
```

## Summary

- Positional matching: values are assigned in order
- Skip elements with empty commas: `const [a, , b] = arr`
- Use `...rest` to collect remaining elements
- Default values for undefined positions

## Further Reading

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
