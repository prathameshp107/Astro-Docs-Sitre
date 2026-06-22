---
title: "ES6+ Features"
description: "Destructuring, spread/rest, template literals, enhanced object literals, Symbols, iterators, Map, and Set."
sidebar:
  order: 21
---

## ES6+ Features

ES6 (ECMAScript 2015) was a landmark release. Modern JavaScript builds on these features daily.

### Destructuring

Unpack values from arrays or properties from objects into distinct variables.

```javascript
// Array destructuring
const [a, b, c] = [1, 2, 3];
// a=1, b=2, c=3

const [first, , third] = [10, 20, 30];
// first=10, third=30 (skip second)

const [head, ...tail] = [1, 2, 3, 4];
// head=1, tail=[2, 3, 4]

// Default values
const [x = 10, y = 20] = [5];
// x=5, y=20

// Object destructuring
const { name, age } = { name: "Alice", age: 30 };
// name="Alice", age=30

// Renaming
const { name: userName } = { name: "Bob" };
// userName="Bob"

// Nested
const { address: { city } } = { address: { city: "Mumbai" } };
// city="Mumbai"

// Function parameter destructuring
function printUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}
printUser({ name: "Alice", age: 30 });
```

### Spread & Rest (Recap)

```javascript
// Spread — expands iterable into elements
const arr = [1, 2, 3];
const copy = [...arr, 4, 5];           // [1, 2, 3, 4, 5]

const obj = { a: 1, b: 2 };
const merged = { ...obj, c: 3 };       // { a: 1, b: 2, c: 3 }
const override = { ...obj, a: 99 };    // { a: 99, b: 2 }

// Rest — collects remaining values
const [first, ...rest] = [1, 2, 3, 4];
// first=1, rest=[2, 3, 4]

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

### Enhanced Object Literals

```javascript
const name = "Alice";
const age = 30;

// Shorthand
const user = { name, age };
// { name: "Alice", age: 30 }

// Method shorthand
const obj = {
  greet() { return "Hello!"; } // instead of greet: function() {}
};

// Computed property names
const key = "dynamicKey";
const obj2 = {
  [key]: 42,
  [`${key}_computed`]: 99
};
// { dynamicKey: 42, dynamicKey_computed: 99 }
```

### Symbols

Symbols create unique, immutable identifiers.

```javascript
const id1 = Symbol("id");
const id2 = Symbol("id");
id1 === id2; // false — always unique

// Use as object keys (avoid property collision)
const key = Symbol("secret");
const obj = { [key]: "hidden value" };
obj[key]; // "hidden value"

// Well-known symbols
Symbol.iterator;    // makes objects iterable
Symbol.toPrimitive; // custom type coercion
Symbol.hasInstance; // custom instanceof
```

### Iterators (Brief)

Any object with a `[Symbol.iterator]` method is iterable.

```javascript
// Built-in iterables: String, Array, Map, Set, NodeList, arguments
const str = "hi";
const iterator = str[Symbol.iterator]();
iterator.next(); // { value: "h", done: false }
iterator.next(); // { value: "i", done: false }
iterator.next(); // { value: undefined, done: true }
```

### `Map` & `Set` Quick Intro

```javascript
// Map — any key type, maintains insertion order
const map = new Map();
map.set("name", "Alice");
map.set(42, "a number key");
map.size; // 2
map.get("name"); // "Alice"

// Set — unique values only
const set = new Set([1, 2, 3, 2, 1]);
// Set(3) { 1, 2, 3 }

set.add(4);
set.has(2); // true

// Remove duplicates
const unique = [...new Set([1, 2, 2, 3, 3, 4])];
// [1, 2, 3, 4]
```

> For a deep dive into Map, Set, WeakMap, and WeakSet — including iteration, performance, and practical patterns — see the dedicated [Map & Set page](/DSA-Notes-Problems/javascript/collections/map-and-set).

### Key Takeaways

- Destructuring makes extracting values concise and readable
- Spread (`...`) clones arrays/objects; rest (`...`) collects remaining values
- Enhanced object literals reduce boilerplate (shorthand, computed keys)
- Symbols provide guaranteed-unique keys and power the iteration protocol
- `Map` accepts any key type; `Set` stores unique values
- These features form the foundation of modern JavaScript style
