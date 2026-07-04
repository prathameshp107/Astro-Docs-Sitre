---
title: Iteration Protocol
description: The JavaScript iteration protocol — iterables, iterators, and next()
sidebar:
  order: 1
---

# Iteration Protocol

## Introduction

The iteration protocol consists of two parts: **iterable** and **iterator**. An iterable is any object with a `Symbol.iterator` method. Calling that method returns an **iterator** — an object with a `next()` method.

## The Protocol

```javascript
// An iterable has Symbol.iterator method
const iterable = [1, 2, 3];

// Get the iterator
const iterator = iterable[Symbol.iterator]();

// Call next() to get values
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

## The next() Method

Each call to `next()` returns an object with two properties:

- `value`: the current value in the sequence
- `done`: `false` if more values remain, `true` if the sequence is complete

## Built-in Iterables

```javascript
// Arrays
for (const item of [1, 2, 3]) console.log(item);

// Strings
for (const char of 'hello') console.log(char);

// Maps
for (const [key, value] of new Map([['a', 1]])) {}

// Sets
for (const value of new Set([1, 2, 3])) {}

// Arguments (array-like)
function demo() {
  for (const arg of arguments) console.log(arg);
}

// Typed Arrays, NodeLists, etc.
```

## Using the Spread Operator

The spread operator (`...`) also uses the iteration protocol:

```javascript
const str = 'hello';
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']

const set = new Set([1, 2, 3]);
const arr = [...set]; // [1, 2, 3]

const map = new Map([['a', 1], ['b', 2]]);
const entries = [...map]; // [['a', 1], ['b', 2]]
```

## Destructuring with Iterables

```javascript
const [a, b, c] = [1, 2, 3]; // works via iteration protocol
const [first, ...rest] = 'hello';
console.log(first); // 'h'
console.log(rest);  // ['e', 'l', 'l', 'o']
```

## Summary

- **Iterable**: object with `Symbol.iterator` method
- **Iterator**: object with `next()` returning `{ value, done }`
- `for...of` consumes any iterable
- Spread operator (`...`) uses the iteration protocol
- Arrays, Strings, Maps, Sets are built-in iterables

## Further Reading

- [MDN: Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [Next: Custom Iterables](./custom-iterables)
