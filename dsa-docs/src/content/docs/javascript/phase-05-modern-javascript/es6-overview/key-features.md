---
title: Key Features
description: The most important ES6+ features
sidebar:
  order: 2
---

# Key Features

## Introduction

ES6 introduced features that fundamentally changed how JavaScript is written.

## The Most Important Features

```javascript
// Variables
let x = 10;
const y = 20;

// Arrow functions
const add = (a, b) => a + b;

// Template literals
`Hello, ${name}!`

// Destructuring
const { name, age } = person;
const [first, second] = array;

// Spread
const copy = { ...obj };
const combined = [...arr1, ...arr2];

// Modules
export const value = 42;
import { value } from './module.js';

// Promises
const result = await fetch('/api/data');
```

## Modern Features (ES2020+)

```javascript
// Optional chaining
const city = user?.address?.city;

// Nullish coalescing
const name = user.name ?? 'Anonymous';

// BigInt
const big = 9007199254740991n;

// Logical assignment
let x = 0;
x ||= 10; // x becomes 10 if falsy
x &&= 20; // x becomes 20 if truthy
x ??= 30; // x becomes 30 if null/undefined
```

## Summary

- ES6 features (let/const, arrow functions, classes, modules) are used daily
- Modern features (optional chaining, nullish coalescing) reduce boilerplate
- Most features have excellent browser support
- Use a transpiler (Babel) for older browser support

## Further Reading

- [MDN: JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
