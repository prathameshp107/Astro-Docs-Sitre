---
title: Generator Functions
description: Generator functions with function* syntax, yield, and next()
sidebar:
  order: 1
---

# Generator Functions

## Introduction

Generator functions are declared with `function*` and can be **paused** using `yield` and **resumed** using `next()`.

## Basic Generator

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Or use for...of
for (const num of numberGenerator()) {
  console.log(num); // 1, 2, 3
}
```

## Generator as Iterable

Generators implement both the iterable and iterator protocols:

```javascript
function* countTo(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

console.log([...countTo(5)]); // [1, 2, 3, 4, 5]

for (const num of countTo(3)) {
  console.log(num); // 1, 2, 3
}

const [a, b, c] = countTo(3);
console.log(a, b, c); // 1 2 3
```

## Infinite Sequences

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
// Can keep going forever!
```

## Use Cases

```javascript
// 1. Generate IDs
function* idGenerator() {
  let id = 0;
  while (true) yield ++id;
}
const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2

// 2. Pagination
function* paginate(data, pageSize) {
  for (let i = 0; i < data.length; i += pageSize) {
    yield data.slice(i, i + pageSize);
  }
}

// 3. State machines
function* trafficLight() {
  while (true) {
    yield 'GREEN';
    yield 'YELLOW';
    yield 'RED';
  }
}
```

## Summary

- `function*` declares a generator function
- `yield` pauses execution and produces a value
- Generators are both iterable and iterator
- `for...of` consumes generators
- Perfect for sequences, ID generation, and lazy evaluation

## Further Reading

- [MDN: function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [Next: yield](./yield)
