---
title: "Generators & Iterators"
description: "The iteration protocol, custom iterables, generator functions, yield, and async generators."
sidebar:
  order: 6
---

## Generators & Iterators

Iterators provide a standard way to consume data one element at a time. Generators are functions that can be paused and resumed — they're the easiest way to create iterators.

### The Iteration Protocol

An object is **iterable** if it has a `[Symbol.iterator]` method that returns an **iterator** — an object with a `next()` method returning `{ value, done }`.

```javascript
// Built-in iterables
const str = "hello";
const arr = [1, 2, 3];
const map = new Map([["a", 1]]);
const set = new Set([1, 2, 3]);

// Works with for...of and spread
for (const char of "hi") console.log(char); // "h", "i"
[...new Set([1, 2, 3])]; // [1, 2, 3]
```

### Making Custom Objects Iterable

```javascript
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  },
};

for (const n of range) console.log(n); // 1 2 3 4 5
console.log([...range]); // [1, 2, 3, 4, 5]
```

### The Iterator Protocol Manually

```javascript
const arrayIterator = [10, 20, 30][Symbol.iterator]();

arrayIterator.next(); // { value: 10, done: false }
arrayIterator.next(); // { value: 20, done: false }
arrayIterator.next(); // { value: 30, done: false }
arrayIterator.next(); // { value: undefined, done: true }
```

### Generator Functions

A `function*` returns a Generator object that is both iterable and an iterator.

```javascript
function* numberSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberSequence();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Works with for...of
for (const n of numberSequence()) {
  console.log(n); // 1, 2, 3
}
```

### Infinite Generators

```javascript
function* infiniteCounter(start = 0) {
  let count = start;
  while (true) {
    yield count++;
  }
}

const counter = infiniteCounter();
counter.next().value; // 0
counter.next().value; // 1
counter.next().value; // 2
// continues forever — but only computes on demand
```

### Generator with Dynamic Input

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
// Output: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

### Two-Way Communication with `.next()`

You can pass values back into a generator via `.next(value)`.

```javascript
function* question() {
  const name = yield "What's your name?";
  const age = yield `Hello, ${name}! How old are you?`;
  return `${name} is ${age} years old.`;
}

const q = question();
console.log(q.next().value);       // "What's your name?"
console.log(q.next("Alice").value); // "Hello, Alice! How old are you?"
console.log(q.next(30).value);      // "Alice is 30 years old."
```

### `yield*` — Delegating to Another Generator

```javascript
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield 3;
  yield* gen1(); // delegate to gen1
  yield 4;
}

console.log([...gen2()]); // [3, 1, 2, 4]
```

### Practical Use: Lazy Sequence

```javascript
function* take(n, iterable) {
  let i = 0;
  for (const value of iterable) {
    if (i >= n) return;
    yield value;
    i++;
  }
}

function* naturals() {
  let n = 1;
  while (true) yield n++;
}

// Only computes the first 5 values
const firstFive = [...take(5, naturals())];
console.log(firstFive); // [1, 2, 3, 4, 5]
```

### Async Generators

For asynchronous data sources like paginated APIs.

```javascript
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    if (!data.items.length) return;
    yield data.items;
    page++;
  }
}

// Consume with for await...of
async function main() {
  for await (const page of fetchPages("/api/users")) {
    console.log(`Got ${page.length} users`);
  }
}
```

### 🚨 Common Gotchas

```javascript
// Generators cannot be arrow functions
// const gen = *() => {} // ❌ SyntaxError

// Generators create new instances each call
function* nums() { yield 1; yield 2; }
const a = nums();
const b = nums(); // independent of a

// Once exhausted, a generator won't restart
const g = nums();
[...g]; // [1, 2]
[...g]; // [] — already done!

// Generators are NOT reusable — create a new instance each time
```

### Key Takeaways

- An **iterable** has `[Symbol.iterator]`; an **iterator** has `.next()` returning `{ value, done }`
- `function*` declares a generator that returns a Generator (iterable + iterator)
- Generators are **lazy** — they compute values only when requested via `.next()`
- Use `yield*` to delegate to another generator (composable sequences)
- Pass values back into generators via `.next(value)` for two-way communication
- **Async generators** (`async function*`) are ideal for streaming async data
- Generators power libraries like Redux-Saga and are the foundation of async/await polyfills
