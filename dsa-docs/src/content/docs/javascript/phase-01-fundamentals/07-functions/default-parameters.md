---
title: Default Parameters
description: JavaScript default function parameters — ES6 feature
sidebar:
  order: 11
---

# Default Parameters

## Introduction

Default parameters allow you to specify **default values** for function parameters. If an argument is `undefined`, the default value is used.

## Syntax

```javascript
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}
```

## Example

```javascript
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5, 2)); // 10
console.log(multiply(5));    // 5 (b defaults to 1)
```

## Defaults Can Be Expressions

```javascript
function createElement(type = 'div', content = getDefaultContent()) {
  // ...
}

function getDefaultContent() {
  return 'Default content';
}
```

## Important Notes

```javascript
// Defaults only apply for undefined, NOT for null
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

greet(undefined); // 'Hello, Guest!'
greet(null);      // 'Hello, null!'
```

## Summary

- Default parameters use `=` in function signatures
- Only trigger for `undefined` arguments
- Can be expressions or function calls
- Make functions more flexible and safer

## Further Reading

- [MDN: Default Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
