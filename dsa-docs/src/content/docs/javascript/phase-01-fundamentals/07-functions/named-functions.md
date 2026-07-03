---
title: Named Functions
description: Named function expressions and their benefits for debugging and recursion
sidebar:
  order: 5
---

# Named Functions

## Introduction

Named function expressions give a name to a function expression. The name is only accessible inside the function body but appears in stack traces for better debugging.

## Example

```javascript
const greet = function sayHello(name) {
  return `Hello, ${name}!`;
};

console.log(greet('Alice')); // 'Hello, Alice!'
console.log(sayHello); // ReferenceError — not accessible outside
```

## Benefits

```javascript
// Better stack traces
const factorial = function calc(n) {
  if (n <= 1) return 1;
  return n * calc(n - 1); // can use the name recursively
};
```

## Summary

- Named function expressions: `const fn = function name() {}`
- Name is only accessible inside
- Better debugging with named stack traces
- Useful for recursion

## Further Reading

- [MDN: Function Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
