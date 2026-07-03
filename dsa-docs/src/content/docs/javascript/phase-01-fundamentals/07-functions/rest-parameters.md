---
title: Rest Parameters
description: JavaScript rest parameters — handling variable number of arguments
sidebar:
  order: 12
---

# Rest Parameters

## Introduction

Rest parameters (`...`) allow a function to accept an **indefinite number of arguments** as an array. They replaced the older `arguments` object in modern JavaScript.

## Syntax

```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
```

## Example

```javascript
function logAll(...args) {
  args.forEach(arg => console.log(arg));
}

logAll(1, 2, 3, 4); // logs 1, 2, 3, 4
```

## With Named Parameters

```javascript
function greet(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}

console.log(greet('Hello', 'Alice', 'Bob', 'Charlie'));
// ['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!']
```

## Rest vs arguments

```javascript
// arguments — array-like, not a real array
function oldWay() {
  const args = Array.from(arguments); // must convert
}

// rest — real array
function newWay(...args) {
  // args is a real array
  args.map, args.filter, args.reduce all work
}
```

## Summary

- `...params` collects all remaining arguments into an array
- Must be the last parameter
- It's a real Array (unlike `arguments`)
- Cleaner, modern alternative to `arguments`

## Further Reading

- [MDN: Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
