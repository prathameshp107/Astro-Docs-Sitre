---
title: How Currying Works
description: Understanding currying — transforming multi-arg functions into chained single-arg functions
sidebar:
  order: 1
---

# How Currying Works

## Introduction

Currying transforms a function that takes multiple arguments into a chain of functions, each accepting a **single argument**.

## The Core Idea

```javascript
// Normal function — takes all arguments at once
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Curried version — each argument returns a new function
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3); // 6
```

## Manual Curry Implementation

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // Enough arguments — call the original function
      return fn.apply(this, args);
    } else {
      // Not enough — return a function waiting for more
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// Usage
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
curriedSum(1)(2, 3); // 6
```

## Arrow Function Shortcut

```javascript
// Manual currying with arrows
const add = a => b => c => a + b + c;
add(1)(2)(3); // 6

const greet = greeting => name => `${greeting}, ${name}!`;
const sayHello = greet('Hello');
sayHello('Alice'); // 'Hello, Alice!'
sayHello('Bob');   // 'Hello, Bob!'
```

## Why Curry Matters

Currying enables **partial application** and creates reusable, specialized functions:

```javascript
const multiply = a => b => a * b;

const double = multiply(2);    // specialized: times 2
const triple = multiply(3);    // specialized: times 3

double(5);  // 10
triple(5);  // 15
```

## Summary

- Currying: `fn(a, b, c)` → `fn(a)(b)(c)`
- Each call returns a new function until all arguments are collected
- Enables partial application and function specialization
- Arrow functions make currying syntax clean

## Further Reading

- [MDN: Currying](https://developer.mozilla.org/en-US/docs/Glossary/Currying)
