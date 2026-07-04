---
title: Core Principles of Functional Programming
description: Pure functions, declarative style, and the foundations of FP
sidebar:
  order: 1
---

# Core Principles of Functional Programming

## Introduction

Functional programming rests on a few core principles that distinguish it from imperative and object-oriented paradigms.

## Pure Functions

A **pure function** always returns the same output for the same input and has **no side effects**.

```javascript
// Impure — depends on external state
let taxRate = 0.1;
function calculatePrice(amount) {
  return amount + amount * taxRate; // taxRate could change!
}

// Pure — always predictable
function calculatePrice(amount, rate) {
  return amount + amount * rate;
}

// Impure — mutates external state and logs
function addItem(cart, item) {
  cart.push(item);         // mutates input
  console.log('Added!');   // side effect
  return cart;
}

// Pure — returns new state
function addItem(cart, item) {
  return [...cart, item];  // creates new array
}
```

## Declarative vs Imperative

**Imperative**: *How* to do something. **Declarative**: *What* to do.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Imperative — step by step
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Declarative — describe the result
const doubled = numbers.map(n => n * 2);
```

## First-Class Functions

Functions are values — they can be assigned, passed, and returned:

```javascript
const double = x => x * 2;

function applyOperation(arr, fn) {
  return arr.map(fn);
}

applyOperation([1, 2, 3], double); // [2, 4, 6]

function createMultiplier(factor) {
  return x => x * factor; // returning a function
}

const triple = createMultiplier(3);
triple(5); // 15
```

## Higher-Order Functions

Functions that take or return other functions:

```javascript
// .map, .filter, .reduce are built-in higher-order functions
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 },
];

const adults = users
  .filter(u => u.age >= 18)
  .map(u => u.name)
  .sort();
// ['Alice', 'Charlie']
```

## Summary

- Pure functions: same input → same output, no side effects
- Declarative: describe *what*, not *how*
- First-class functions: functions as values
- Higher-order functions: functions operating on functions

## Further Reading

- [MDN: Functional Programming Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Functional_programming)
