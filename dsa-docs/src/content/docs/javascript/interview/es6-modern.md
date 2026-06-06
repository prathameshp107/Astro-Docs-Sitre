---
title: "ES6+ & Modern JavaScript — Interview Questions"
description: "JavaScript interview questions on ES6+ features: destructuring, spread, modules, Proxy, Symbol, Temporal API, and latest ECMAScript features."
sidebar:
  order: 5
---

# 🟡 ES6+ & Modern JavaScript

---

## Q1. What are template literals?

**Answer:**
Template literals use backticks and support embedded expressions and multi-line strings.

```js
const name = "Alice";
const age = 30;

// String interpolation
console.log(`My name is ${name} and I am ${age} years old.`);

// Multi-line
const msg = `Line 1
Line 2`;

// Expression
console.log(`2 + 2 = ${2 + 2}`); // "2 + 2 = 4"

// Tagged templates
function tag(strings, ...values) {
  return strings[0] + values[0].toUpperCase();
}
tag`Hello ${"world"}`; // "Hello WORLD"
```

---

## Q2. What is destructuring in JavaScript?

**Answer:**

```js
// Array Destructuring
const [a, b, c] = [1, 2, 3];
const [first, , third] = [10, 20, 30]; // skip elements

// Object Destructuring
const { name, age } = { name: "Alice", age: 30 };

// Renaming
const { name: userName } = { name: "Bob" };

// Default values
const { x = 10, y = 20 } = { x: 5 };
console.log(x, y); // 5, 20

// Nested
const { address: { city } } = { address: { city: "Mumbai" } };
```

---

## Q3. What is the spread (`...`) and rest (`...`) operator?

**Answer:**

```js
// Spread — expands elements
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Rest — collects remaining elements
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

const [head, ...tail] = [1, 2, 3, 4];
// head = 1, tail = [2, 3, 4]
```

---

## Q4. What are default parameters?

**Answer:**

```js
function greet(name = "World") {
  return `Hello, ${name}!`;
}

greet();        // "Hello, World!"
greet("Alice"); // "Hello, Alice!"

// Works with expressions
function add(a, b = a * 2) {
  return a + b;
}
add(5); // 15
```

---

## Q5. What is optional chaining (`?.`)?

**Answer:**

```js
const user = { profile: { name: "Alice" } };

// Without optional chaining — can throw
user.address.city; // ❌ TypeError

// With optional chaining — returns undefined
user?.address?.city; // undefined ✅

// With methods
user?.getAge?.();     // undefined if method doesn't exist

// With arrays
user?.friends?.[0];   // undefined if friends doesn't exist
```

---

## Q6. What is the nullish coalescing operator (`??`)?

**Answer:**

```js
// Returns right side only if left is null or undefined
null ?? "default"      // "default"
undefined ?? "default" // "default"
0 ?? "default"         // 0 ← 0 is NOT null/undefined
"" ?? "default"        // "" ← "" is NOT null/undefined
false ?? "default"     // false

// vs || which triggers on any falsy
0 || "default"         // "default"  ← 0 is falsy
"" || "default"        // "default"  ← "" is falsy
```

---

## Q7. What is `Symbol` in JavaScript?

**Answer:**

```js
// Symbol creates a unique identifier
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false — always unique

// Use case: unique object keys (avoid property collisions)
const key = Symbol("secretKey");
const obj = { [key]: "hidden value" };
obj[key]; // "hidden value"

// Symbols are NOT enumerable
Object.keys(obj);    // [] — symbol keys excluded
Object.getOwnPropertySymbols(obj); // [Symbol(secretKey)]

// Well-known symbols
Symbol.iterator
Symbol.toPrimitive
Symbol.hasInstance
```

---

## Q8. What is `Proxy` in JavaScript?

**Answer:**

```js
const handler = {
  get(target, key) {
    console.log(`Getting ${key}`);
    return key in target ? target[key] : `Property "${key}" not found`;
  },
  set(target, key, value) {
    if (typeof value !== "number") throw new TypeError("Only numbers!");
    target[key] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.age = 30;     // ✅
obj.age;          // logs "Getting age", returns 30
obj.name = "Bob"; // ❌ TypeError: Only numbers!

// Use cases: validation, logging, reactive data (Vue 3 uses Proxy!)
```

---

## Q9. What is `Reflect` in JavaScript?

**Answer:**

```js
// Reflect mirrors all Proxy traps as functions
const obj = { x: 1 };

Reflect.get(obj, "x");        // 1
Reflect.set(obj, "y", 2);     // true
Reflect.has(obj, "x");        // true
Reflect.deleteProperty(obj, "x"); // true
Reflect.ownKeys(obj);         // ["y"]

// Common with Proxy — forward default behavior
const handler = {
  set(target, key, value) {
    console.log(`Setting ${key} = ${value}`);
    return Reflect.set(target, key, value); // default behavior
  }
};
```

---

## Q10. What are tagged template literals?

**Answer:**

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : "");
  }, "");
}

const name = "Alice";
const score = 95;
highlight`Player ${name} scored ${score} points!`;
// "Player <mark>Alice</mark> scored <mark>95</mark> points!"

// Real use cases:
// - css`` (styled-components)
// - sql`` (SQL template literals)
// - html`` (sanitizing HTML)
// - gql`` (GraphQL queries)
```

---

## Q11. What are JavaScript modules (ESM)?

**Answer:**

```js
// math.js — named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// Default export
export default class Calculator { /* ... */ }

// main.js — imports
import Calculator, { PI, add } from "./math.js";
import * as math from "./math.js"; // namespace import

// Dynamic import
const module = await import("./heavy.js"); // lazy loading

// Re-export
export { add, subtract } from "./math.js";
export * from "./math.js";
```

---

## Q12. What is the difference between CommonJS and ES Modules?

**Answer:**

```js
// CommonJS (Node.js default)
const fs = require("fs");
module.exports = { add, subtract };

// ES Modules
import fs from "fs";
export { add, subtract };

// Key differences:
// CJS: synchronous, loads at runtime, dynamic require() allowed
// ESM: asynchronous, static analysis at parse time, tree-shakeable

// CJS: exports is an object (copy), ESM: live bindings
// CJS: works in Node.js out of the box
// ESM: requires .mjs extension or "type": "module" in package.json
// ESM: supports top-level await
```

---

## Q13. What are `WeakRef` and `FinalizationRegistry`?

**Answer:**

```js
// WeakRef — hold reference without preventing GC
let obj = { name: "Alice" };
const weakRef = new WeakRef(obj);
weakRef.deref()?.name; // "Alice"
obj = null; // obj can now be GC'd

// FinalizationRegistry — run cleanup when object is GC'd
const registry = new FinalizationRegistry((value) => {
  console.log(`${value} was garbage collected`);
});

let target = { data: "important" };
registry.register(target, "target object");
target = null; // When GC runs: "target object was garbage collected"
```

---

## Q14. What is `setTimeout` and `setInterval`?

**Answer:**

```js
// setTimeout — runs once after delay (ms)
const timerId = setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);
clearTimeout(timerId); // cancel before it runs

// setInterval — runs repeatedly every interval
const intervalId = setInterval(() => {
  console.log("Runs every second");
}, 1000);
clearInterval(intervalId); // stop it
```

---

## Q15. What is the `Temporal` API (Stage 3)?

**Answer:**

```js
// Temporal replaces the broken Date API

// Current date
const today = Temporal.Now.plainDateISO();

// Date arithmetic (immutable!)
const nextWeek = today.add({ days: 7 });
const lastMonth = today.subtract({ months: 1 });

// Duration
const duration = Temporal.Duration.from({ days: 30, hours: 2 });
today.add(duration);

// Timezone-aware
const now = Temporal.Now.zonedDateTimeISO("Asia/Kolkata");

// Difference between dates
const start = Temporal.PlainDate.from("2024-01-01");
const end = Temporal.PlainDate.from("2024-12-31");
start.until(end); // Duration { days: 365 }

// No mutation, no timezone bugs, no month indexing confusion!
```

---

## Q16. What are the latest JavaScript features (ES2023/ES2024)?

**Answer:**

```js
// ES2023
// Array.findLast / findLastIndex
[1,2,3,4,5].findLast(n => n % 2 === 0); // 4
[1,2,3,4,5].findLastIndex(n => n < 4);   // 2

// Array.toSorted / toReversed / toSpliced / with (non-mutating!)
const arr = [3, 1, 2];
arr.toSorted();      // [1, 2, 3] — original unchanged
arr.toReversed();    // [2, 1, 3] — original unchanged
arr.with(1, 99);     // [3, 99, 2] — original unchanged

// ES2024
// Object.groupBy / Map.groupBy
const people = [{name:"Alice", age:25}, {name:"Bob", age:17}];
Object.groupBy(people, p => p.age >= 18 ? "adults" : "minors");
// { adults: [{Alice}], minors: [{Bob}] }

// Promise.withResolvers
const { promise, resolve, reject } = Promise.withResolvers();
resolve("done");
await promise; // "done"

// Array.fromAsync (ES2024)
const arr2 = await Array.fromAsync(asyncGenerator());
```

---

## Q17. What is `AggregateError` and when is it used?

**Answer:**

```js
// AggregateError — holds multiple errors
// Used by Promise.any() when ALL promises reject

const p1 = Promise.reject(new Error("error 1"));
const p2 = Promise.reject(new Error("error 2"));
const p3 = Promise.reject(new Error("error 3"));

Promise.any([p1, p2, p3]).catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.message);  // "All promises were rejected"
  console.log(err.errors);   // [Error: error 1, Error: error 2, Error: error 3]
});

// Throw it manually
throw new AggregateError(
  [new Error("a"), new Error("b")],
  "Multiple errors occurred"
);
```

---

## Q18. What is the `AbortController`?

**Answer:**

```js
// Cancel fetch requests
const controller = new AbortController();
const signal = controller.signal;

fetch("/api/data", { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Request was cancelled");
    }
  });

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

// Real use: cancel stale search requests
let currentController;
input.addEventListener("input", async (e) => {
  currentController?.abort(); // cancel previous
  currentController = new AbortController();
  const results = await fetch(`/search?q=${e.target.value}`, {
    signal: currentController.signal
  });
});
```

---

## Q19. What is `queueMicrotask`?

**Answer:**

```js
// Schedule a microtask (higher priority than setTimeout)
console.log("1");

queueMicrotask(() => console.log("2 - microtask"));

Promise.resolve().then(() => console.log("3 - promise"));

setTimeout(() => console.log("4 - setTimeout"), 0);

console.log("5");

// Output: 1 → 5 → 2 → 3 → 4
// (microtasks run before macrotasks in same cycle)
```

---

## Q20. What is `TypedArray` and `ArrayBuffer`?

**Answer:**

```js
// ArrayBuffer — fixed-size raw binary data
const buffer = new ArrayBuffer(16); // 16 bytes

// TypedArray — view over ArrayBuffer with a specific type
const int32 = new Int32Array(buffer);     // 4 ints (4 bytes each)
const float64 = new Float64Array(buffer);  // 2 doubles (8 bytes each)
const uint8 = new Uint8Array(buffer);      // 16 bytes

// Write
int32[0] = 42;
uint8[0]; // access same memory, different view

// DataView — fine-grained control over byte order
const view = new DataView(buffer);
view.setInt32(0, 42, true);   // true = little-endian
view.getInt32(0, false);       // big-endian read

// Use cases: WebGL, Web Audio, WebSockets binary, WASM
const pixels = new Uint8ClampedArray(width * height * 4); // RGBA
```
