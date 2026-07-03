---
title: yield
description: The yield keyword — yielding values, yield* delegation, and bidirectional communication
sidebar:
  order: 2
---

# yield

## Introduction

The `yield` keyword is the heart of generators. It **pauses** the generator and outputs a value. It also enables **bidirectional communication** — you can pass values back into the generator.

## Basic yield

```javascript
function* simple() {
  yield 'first';
  yield 'second';
  yield 'third';
}

const gen = simple();
console.log(gen.next()); // { value: 'first', done: false }
```

## Passing Values to yield

```javascript
function* game() {
  const name = yield 'What is your name?';
  yield `Hello, ${name}!`;
  const age = yield 'How old are you?';
  yield `You are ${age} years old!`;
}

const gen = game();
console.log(gen.next().value);        // 'What is your name?'
console.log(gen.next('Alice').value); // 'Hello, Alice!'
console.log(gen.next().value);        // 'How old are you?'
console.log(gen.next(25).value);      // 'You are 25 years old!'
```

## yield* Delegation

`yield*` delegates to another generator or iterable:

```javascript
function* generateNumbers() {
  yield 1;
  yield* [2, 3, 4]; // Delegate to array iterator
  yield 5;
}

console.log([...generateNumbers()]); // [1, 2, 3, 4, 5]

// With nested generators
function* inner() {
  yield 'a';
  yield 'b';
}

function* outer() {
  yield 'start';
  yield* inner();
  yield 'end';
}

console.log([...outer()]); // ['start', 'a', 'b', 'end']
```

## Returning from a Generator

```javascript
function* withReturn() {
  yield 1;
  yield 2;
  return 3; // done: true, value: 3
}

const gen = withReturn();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: true }

// for...of ignores the return value!
for (const val of withReturn()) {
  console.log(val); // 1, 2 (3 is not included)
}
```

## Summary

- `yield` pauses and produces a value
- `yield` receives values from `next(value)`
- `yield*` delegates to another iterable/generator
- `return` in a generator sets the final value
- `for...of` ignores the return value

## Further Reading

- [MDN: yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)
- [MDN: yield*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*)
- [Previous: Generator Functions](./generator-functions)
- [Next: Async Generators](./async-generators)
