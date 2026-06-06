---
title: "JavaScript Fundamentals — Interview Questions"
description: "Core JavaScript interview questions: data types, variables, hoisting, closures, this, functions, scoping, and more."
sidebar:
  order: 2
---

# 🟢 JavaScript Fundamentals

Core language fundamentals — data types, variables, scoping, functions, closures, and `this`.

---

## Q1. What are the different data types in JavaScript?

**Answer:**
JavaScript has **8 data types**:

**Primitive Types:**
- `String` — `"hello"`
- `Number` — `42`, `3.14`
- `BigInt` — `9007199254740991n`
- `Boolean` — `true` / `false`
- `Undefined` — variable declared but not assigned
- `Null` — intentional absence of value
- `Symbol` — unique identifier

**Non-Primitive:**
- `Object` — includes Arrays, Functions, Dates, etc.

```js
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" ← known JS quirk
typeof Symbol()    // "symbol"
typeof {}          // "object"
typeof function(){} // "function"
```

---

## Q2. What is the difference between `var`, `let`, and `const`?

**Answer:**

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |

```js
var x = 1;
var x = 2; // ✅ allowed

let y = 1;
let y = 2; // ❌ SyntaxError

const z = 1;
z = 2;     // ❌ TypeError
```

---

## Q3. What is `==` vs `===` in JavaScript?

**Answer:**
- `==` (loose equality) — performs **type coercion** before comparison
- `===` (strict equality) — checks **both value and type**

```js
0 == "0"   // true  (coercion happens)
0 === "0"  // false (different types)

null == undefined   // true
null === undefined  // false
```

> **Best Practice:** Always use `===` to avoid unexpected bugs.

---

## Q4. What is `null` vs `undefined`?

**Answer:**
- `undefined` — a variable has been declared but **not assigned** a value
- `null` — an **intentional empty value**, explicitly set by the developer

```js
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null

typeof null      // "object" (JS quirk)
typeof undefined // "undefined"

null == undefined  // true
null === undefined // false
```

---

## Q5. What is hoisting in JavaScript?

**Answer:**
Hoisting is JavaScript's behavior of **moving declarations to the top** of their scope before code executes.

- `var` declarations are hoisted and initialized with `undefined`
- `function` declarations are fully hoisted
- `let` and `const` are hoisted but stay in the **Temporal Dead Zone (TDZ)**

```js
console.log(x); // undefined (not error)
var x = 5;

console.log(y); // ❌ ReferenceError
let y = 5;

greet(); // ✅ "Hello" — function fully hoisted
function greet() { console.log("Hello"); }

hello(); // ❌ TypeError — only variable is hoisted, not the function
var hello = function() { console.log("Hello"); };
```

---

## Q6. What are arrow functions and how do they differ from regular functions?

**Answer:**

```js
// Regular function
function add(a, b) { return a + b; }

// Arrow function
const add = (a, b) => a + b;
```

**Key Differences:**
- Arrow functions do **not** have their own `this`
- Arrow functions cannot be used as **constructors**
- Arrow functions have no `arguments` object
- Arrow functions cannot be used as generator functions

```js
const obj = {
  name: "Alice",
  regular: function() { console.log(this.name); }, // "Alice"
  arrow: () => { console.log(this.name); }          // undefined
};
```

---

## Q7. What is a closure in JavaScript?

**Answer:**
A closure is a function that **retains access to its outer scope** even after the outer function has returned.

```js
function counter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
```

> The inner function "closes over" the `count` variable.

**Common use cases:** Module pattern, memoization, event handlers, debouncing/throttling.

---

## Q8. What is the difference between `function declaration` and `function expression`?

**Answer:**

```js
// Function Declaration — hoisted fully
greet(); // ✅ works
function greet() { return "Hello"; }

// Function Expression — not hoisted
hello(); // ❌ TypeError
const hello = function() { return "Hello"; };

// Named Function Expression
const greetUser = function sayHello() {
  return "Hello";
};
```

---

## Q9. What is `typeof` and what are its quirks?

**Answer:**

```js
typeof 42          // "number"
typeof "hello"     // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object"  ← bug in JS (historical)
typeof []          // "object"  ← use Array.isArray()
typeof {}          // "object"
typeof function(){} // "function"
typeof Symbol()    // "symbol"
typeof 42n         // "bigint"
```

---

## Q10. What is `NaN` and how do you check for it?

**Answer:**
`NaN` (Not-a-Number) is returned when a math operation fails.

```js
console.log(0 / 0);         // NaN
console.log("abc" * 2);     // NaN

// Quirk: NaN is not equal to itself!
NaN === NaN // false

// Correct ways to check
Number.isNaN(NaN)    // true ✅
Number.isNaN("abc")  // false ✅ (does NOT coerce)
isNaN("abc")         // true ← coerces, unreliable
```

---

## Q11. What are `truthy` and `falsy` values?

**Answer:**

**Falsy values (only 8):**
```js
false, 0, -0, 0n, "", '', ``, null, undefined, NaN
```

**Everything else is truthy**, including:
```js
"0"     // truthy (non-empty string)
[]      // truthy (empty array)
{}      // truthy (empty object)
-1      // truthy
"false" // truthy
```

```js
if ([]) console.log("truthy!"); // ✅ prints
if ({}) console.log("truthy!"); // ✅ prints
```

---

## Q12. What is `short-circuit evaluation`?

**Answer:**

```js
// && returns first falsy OR last value
false && "hello"  // false
true && "hello"   // "hello"
true && true      // true

// || returns first truthy OR last value
false || "hello"  // "hello"
"hi" || "hello"   // "hi"
false || false    // false

// Nullish coalescing ?? — only triggers on null/undefined
null ?? "default"      // "default"
undefined ?? "default" // "default"
0 ?? "default"         // 0 (not null/undefined)
"" ?? "default"        // "" (not null/undefined)
```

---

## Q13. What is `strict mode`?

**Answer:**

```js
"use strict";

// Benefits:
x = 10;            // ❌ ReferenceError (undeclared var)
delete Object.prototype; // ❌ TypeError
function(a, a) {}  // ❌ duplicate params error
this               // undefined in functions (not global)
```

---

## Q14. What is the difference between deep copy and shallow copy?

**Answer:**

```js
const obj = { a: 1, b: { c: 2 } };

// Shallow copy — nested objects share reference
const shallow = { ...obj };
shallow.b.c = 99;
console.log(obj.b.c); // 99 ← mutated!

// Deep copy methods:

// 1. JSON (simple but limited — no functions/undefined)
const deep = JSON.parse(JSON.stringify(obj));

// 2. structuredClone (modern, recommended)
const deep2 = structuredClone(obj);

// 3. Lodash
import _ from "lodash";
const deep3 = _.cloneDeep(obj);
```

---

## Q15. What is `this` in JavaScript? (4 binding rules)

**Answer:**
`this` refers to the **execution context** of a function.

**Rule 1: Default binding** — global (or undefined in strict mode)
```js
function show() { console.log(this); }
show(); // Window / undefined(strict)
```

**Rule 2: Implicit binding** — object before the dot
```js
const obj = { name: "Alice", greet() { console.log(this.name); } };
obj.greet(); // "Alice"

// Binding lost:
const fn = obj.greet;
fn(); // undefined
```

**Rule 3: Explicit binding** — call/apply/bind
```js
show.call({ name: "Bob" }); // {name:"Bob"}
```

**Rule 4: new binding** — creates new object
```js
function Person(name) { this.name = name; }
const p = new Person("Alice");
p.name; // "Alice"
```

**Priority:** `new` > explicit > implicit > default

---

## Q16. What is the difference between `call`, `apply`, and `bind`?

**Answer:**
All three set `this` explicitly.

```js
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Alice" };

// call — invokes immediately, args comma-separated
greet.call(user, "Hello", "!"); // "Hello, Alice!"

// apply — invokes immediately, args as array
greet.apply(user, ["Hello", "!"]); // "Hello, Alice!"

// bind — returns new function, does NOT invoke
const boundGreet = greet.bind(user, "Hello");
boundGreet("!"); // "Hello, Alice!"

// Real use case: method borrowing
const obj1 = { name: "Bob", greet() { return this.name; } };
const obj2 = { name: "Carol" };
obj1.greet.call(obj2); // "Carol"
```

---

## Q17. What is IIFE (Immediately Invoked Function Expression)?

**Answer:**

```js
// Classic IIFE
(function() {
  const privateVar = "I am private";
  console.log(privateVar);
})();

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();

// With parameters
((name) => {
  console.log(`Hello, ${name}`);
})("World");

// Use cases:
// - Avoid polluting global scope (pre-ES6 modules)
// - Create isolated scope
// - One-time initialization
```

---

## Q18. What is `Object.freeze()` vs `Object.seal()`?

**Answer:**

```js
// Object.freeze() — cannot add, delete, or MODIFY properties
const frozen = Object.freeze({ name: "Alice", age: 30 });
frozen.name = "Bob";   // ❌ silently fails
frozen.city = "NYC";   // ❌ cannot add
delete frozen.age;     // ❌ cannot delete

// Object.seal() — cannot add or delete, but CAN modify
const sealed = Object.seal({ name: "Alice", age: 30 });
sealed.name = "Bob";   // ✅ modification allowed
sealed.city = "NYC";   // ❌ cannot add
delete sealed.age;     // ❌ cannot delete

// ⚠️ Both are SHALLOW — nested objects are NOT frozen/sealed
```

---

## Q19. What is `globalThis`?

**Answer:**

```js
// Before globalThis — different globals per environment
// Browser: window
// Node.js: global
// Web Worker: self

// globalThis — unified way to access global object
console.log(globalThis); // works in all environments
globalThis.myGlobal = "hello";
```

---

## Q20. What is `try...catch...finally`?

**Answer:**

```js
try {
  const result = JSON.parse("invalid json");
} catch (error) {
  console.error("Error:", error.message);
} finally {
  console.log("This always runs");
}

// Custom error
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

try {
  divide(10, 0);
} catch (e) {
  console.log(e.message); // "Division by zero"
}
```

---

## Q21. What is `JSON.stringify` and `JSON.parse`?

**Answer:**

```js
const obj = { name: "Alice", age: 30 };

// Object → JSON string
const json = JSON.stringify(obj);
// '{"name":"Alice","age":30}'

// JSON string → Object
const parsed = JSON.parse(json);

// Pretty print
JSON.stringify(obj, null, 2);

// Note: undefined, functions, symbols are omitted
JSON.stringify({ a: undefined, b: () => {} }); // '{}'
```

---

## Q22. What is currying in JavaScript?

**Answer:**
Currying transforms a function with multiple arguments into a series of functions each taking one argument.

```js
// Curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6

// Real use case
const multiply = curry((factor, value) => factor * value);
const double = multiply(2);
const triple = multiply(3);
[1, 2, 3].map(double); // [2, 4, 6]
```

---

## Q23. What is function composition?

**Answer:**

```js
// compose — right to left
const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

// pipe — left to right
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

const trim = str => str.trim();
const lower = str => str.toLowerCase();
const split = str => str.split(" ");

const process = pipe(trim, lower, split);
process("  Hello World  "); // ["hello", "world"]
```

---

## Q24. What is memoization?

**Answer:**

```js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("cache hit");
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fastFib = memoize(fibonacci);
fastFib(40); // fast!
```

---

## Q25. What is `Object.defineProperty()`?

**Answer:**

```js
const person = {};

Object.defineProperty(person, "name", {
  value: "Alice",
  writable: false,    // cannot reassign
  enumerable: true,   // shows in for...in, Object.keys
  configurable: false // cannot delete or redefine
});

person.name = "Bob"; // silently fails (or TypeError in strict)
person.name; // "Alice"

// Getters/setters with defineProperty
Object.defineProperty(person, "fullName", {
  get() { return `${this.first} ${this.last}`; },
  set(value) { [this.first, this.last] = value.split(" "); },
  enumerable: true,
  configurable: true
});
```

---

## Q26. What is `Object.getOwnPropertyDescriptor`?

**Answer:**

```js
const obj = { name: "Alice" };
Object.getOwnPropertyDescriptor(obj, "name");
// {
//   value: "Alice",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// Immutable constant
Object.defineProperty(obj, "ID", {
  value: 12345,
  writable: false,
  enumerable: false,
  configurable: false
});

// Get ALL descriptors
Object.getOwnPropertyDescriptors(obj);
```

---

## Q27. Implement `Function.prototype.bind` from scratch.

**Answer:**

```js
Function.prototype.myBind = function(thisArg, ...outerArgs) {
  const originalFn = this;

  function BoundFunction(...innerArgs) {
    // Handle `new` call — new overrides bind's thisArg
    if (this instanceof BoundFunction) {
      return new originalFn(...outerArgs, ...innerArgs);
    }
    return originalFn.apply(thisArg, [...outerArgs, ...innerArgs]);
  }

  // Maintain prototype chain for new
  if (originalFn.prototype) {
    BoundFunction.prototype = Object.create(originalFn.prototype);
  }

  return BoundFunction;
};
```

---

## Q28. How does the `new` keyword work internally?

**Answer:**

```js
// When you do: const obj = new MyClass(args)
// JavaScript does these steps:
function myNew(Constructor, ...args) {
  // 1. Create empty object with Constructor's prototype
  const obj = Object.create(Constructor.prototype);

  // 2. Bind `this` to new object and call constructor
  const result = Constructor.apply(obj, args);

  // 3. Return the new object (unless constructor returns an object)
  return (result !== null && typeof result === "object") ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const alice = myNew(Person, "Alice", 30);
alice instanceof Person; // true
alice.name; // "Alice"
```

---

## Q29. What is tail call optimization (TCO)?

**Answer:**

```js
// Regular recursion — stack overflow risk at large n
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // ← NOT a tail call
}

// Tail call — last operation is the recursive call
function factorialTCO(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTCO(n - 1, n * acc); // ← tail call
}

// With TCO, engine reuses the current stack frame
// ES6 spec mandates TCO in strict mode — only Safari implements it
// Alternative: trampoline
function trampoline(fn) {
  return function(...args) {
    let result = fn(...args);
    while (typeof result === "function") result = result();
    return result;
  };
}
```

---

## Q30. How do you handle circular references in JSON serialization?

**Answer:**

```js
// Problem
const obj = { name: "Alice" };
obj.self = obj; // circular reference
JSON.stringify(obj); // ❌ TypeError

// Solution: replacer function
function circularStringify(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    return value;
  });
}
```

---

## Q31. Implement `Object.assign` from scratch.

**Answer:**

```js
function myAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const to = Object(target);

  for (const source of sources) {
    if (source === null || source === undefined) continue;

    // Only own enumerable properties
    for (const key of Object.keys(source)) {
      to[key] = source[key];
    }

    // Also copy Symbol properties
    for (const sym of Object.getOwnPropertySymbols(source)) {
      if (Object.prototype.propertyIsEnumerable.call(source, sym)) {
        to[sym] = source[sym];
      }
    }
  }

  return to;
}
```

---

## Q32. Implement a deep clone function from scratch.

**Answer:**

```js
function deepClone(value, visited = new WeakMap()) {
  // Handle primitives and null
  if (value === null || typeof value !== "object") return value;

  // Handle circular references
  if (visited.has(value)) return visited.get(value);

  // Handle special types
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Set) {
    const clone = new Set();
    visited.set(value, clone);
    value.forEach(item => clone.add(deepClone(item, visited)));
    return clone;
  }
  if (value instanceof Map) {
    const clone = new Map();
    visited.set(value, clone);
    value.forEach((v, k) => clone.set(deepClone(k, visited), deepClone(v, visited)));
    return clone;
  }

  // Handle arrays and objects
  const clone = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  visited.set(value, clone);

  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], visited);
  }

  return clone;
}
```
