# 🚀 Top 100 JavaScript Interview Questions
### For 4+ Years Software Engineer Interview Preparation

---

## 📋 Table of Contents
- [🟢 Easy (Q1–Q35)](#-easy-questions-q1q35)
- [🟡 Medium (Q36–Q70)](#-medium-questions-q36q70)
- [🔴 Hard (Q71–Q100)](#-hard-questions-q71q100)

---

## 🟢 Easy Questions (Q1–Q35)

---

### Q1. What are the different data types in JavaScript?

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

### Q2. What is the difference between `var`, `let`, and `const`?

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

### Q3. What is `==` vs `===` in JavaScript?

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

### Q4. What is `null` vs `undefined`?

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

### Q5. What is hoisting in JavaScript?

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

### Q6. What are arrow functions and how do they differ from regular functions?

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

### Q7. What is a closure in JavaScript?

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

---

### Q8. What is the difference between `forEach`, `map`, `filter`, and `reduce`?

**Answer:**

```js
const nums = [1, 2, 3, 4, 5];

// forEach — iterates, returns nothing
nums.forEach(n => console.log(n));

// map — transforms each element, returns new array
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter — returns elements matching condition
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce — reduces to single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 15
```

---

### Q9. What is `typeof` and what are its quirks?

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

### Q10. What is the difference between `function declaration` and `function expression`?

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

### Q11. What is `NaN` and how do you check for it?

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

### Q12. What are template literals?

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

### Q13. What is destructuring in JavaScript?

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

### Q14. What is the spread (`...`) and rest (`...`) operator?

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

### Q15. What are default parameters?

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

### Q16. What is `Array.isArray()`?

**Answer:**
Used to reliably check if a value is an array, since `typeof []` returns `"object"`.

```js
Array.isArray([]);        // true
Array.isArray({});        // false
Array.isArray("string");  // false
Array.isArray(new Array()); // true
```

---

### Q17. What are `truthy` and `falsy` values?

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

### Q18. What is `short-circuit evaluation`?

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

### Q19. What is the ternary operator?

**Answer:**

```js
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
// "Adult"

// Nested ternary (use carefully)
const score = 75;
const grade = score >= 90 ? "A"
            : score >= 75 ? "B"
            : score >= 60 ? "C"
            : "F";
// "B"
```

---

### Q20. What is `JSON.stringify` and `JSON.parse`?

**Answer:**

```js
const obj = { name: "Alice", age: 30 };

// Object → JSON string
const json = JSON.stringify(obj);
// '{"name":"Alice","age":30}'

// JSON string → Object
const parsed = JSON.parse(json);
// { name: "Alice", age: 30 }

// Pretty print
JSON.stringify(obj, null, 2);

// With replacer
JSON.stringify(obj, ["name"]); // '{"name":"Alice"}'

// Note: undefined, functions, symbols are omitted
JSON.stringify({ a: undefined, b: () => {} }); // '{}'
```

---

### Q21. What is `setTimeout` and `setInterval`?

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

### Q22. What are `string` methods you use most often?

**Answer:**

```js
const str = "  Hello, World!  ";

str.trim()               // "Hello, World!"
str.toLowerCase()        // "  hello, world!  "
str.toUpperCase()        // "  HELLO, WORLD!  "
str.includes("World")    // true
str.startsWith("Hello")  // false (has spaces)
str.endsWith("!")        // false (has spaces)
str.replace("World", "JS") // "  Hello, JS!  "
str.split(", ")          // ["  Hello", "World!  "]
str.slice(2, 7)          // "Hello"
str.indexOf("o")         // 4
str.padStart(20, "*")    // pads to length 20
str.repeat(2)            // repeats string
```

---

### Q23. What are common `array` methods?

**Answer:**

```js
const arr = [1, 2, 3, 4, 5];

arr.push(6)       // add to end → [1,2,3,4,5,6]
arr.pop()         // remove from end
arr.unshift(0)    // add to start
arr.shift()       // remove from start
arr.splice(1, 2)  // remove 2 at index 1
arr.slice(1, 3)   // new array [2, 3]
arr.indexOf(3)    // 2
arr.includes(3)   // true
arr.find(n => n > 3)       // 4
arr.findIndex(n => n > 3)  // 3
arr.some(n => n > 4)       // true
arr.every(n => n > 0)      // true
arr.flat()                 // flatten nested arrays
arr.flatMap(n => [n, n*2]) // map + flat
arr.sort((a,b) => a - b)   // ascending sort
arr.reverse()              // reverse in place
Array.from({length: 3}, (_, i) => i) // [0, 1, 2]
```

---

### Q24. What is `Object.keys`, `Object.values`, `Object.entries`?

**Answer:**

```js
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj)    // ["a", "b", "c"]
Object.values(obj)  // [1, 2, 3]
Object.entries(obj) // [["a",1], ["b",2], ["c",3]]

// Iterate
Object.entries(obj).forEach(([key, val]) => {
  console.log(`${key}: ${val}`);
});

// Convert back
Object.fromEntries([["a", 1], ["b", 2]]); // { a: 1, b: 2 }
```

---

### Q25. What is `this` in JavaScript?

**Answer:**
`this` refers to the **execution context** of a function.

```js
// Global context
console.log(this); // Window (browser) / global (Node)

// Object method
const obj = {
  name: "Alice",
  greet() { return this.name; } // "Alice"
};

// Regular function — this = global or undefined (strict)
function show() { console.log(this); }

// Arrow function — inherits this from parent scope
const obj2 = {
  name: "Bob",
  greet: () => console.log(this) // Window, not obj2
};

// Class
class Person {
  constructor(name) { this.name = name; }
  greet() { return `Hi, ${this.name}`; }
}
```

---

### Q26. What is `strict mode`?

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

### Q27. What is the difference between `slice` and `splice`?

**Answer:**

```js
const arr = [1, 2, 3, 4, 5];

// slice — returns new array, does NOT mutate
arr.slice(1, 3);  // [2, 3]
arr.slice(-2);    // [4, 5]
// arr is still [1, 2, 3, 4, 5]

// splice — mutates original array
arr.splice(1, 2);        // removes 2 at index 1 → [2, 3]
// arr is now [1, 4, 5]

arr.splice(1, 0, 10, 20); // insert at index 1
// arr is now [1, 10, 20, 4, 5]
```

---

### Q28. What is optional chaining (`?.`)?

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

### Q29. What is the nullish coalescing operator (`??`)?

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

### Q30. What is `Object.assign`?

**Answer:**

```js
const target = { a: 1 };
const source = { b: 2, c: 3 };

Object.assign(target, source);
// target is now { a: 1, b: 2, c: 3 }

// Shallow clone
const clone = Object.assign({}, target);

// Merge multiple objects
const merged = Object.assign({}, obj1, obj2, obj3);

// Note: Object.assign does SHALLOW copy
const original = { a: { x: 1 } };
const copy = Object.assign({}, original);
copy.a.x = 99;
console.log(original.a.x); // 99 ← shared reference!
```

---

### Q31. What is `try...catch...finally`?

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

### Q32. What is the difference between `for...of` and `for...in`?

**Answer:**

```js
// for...of — iterates values (arrays, strings, maps, sets)
const arr = [10, 20, 30];
for (const val of arr) {
  console.log(val); // 10, 20, 30
}

// for...in — iterates keys (object properties)
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key); // "a", "b", "c"
}

// ⚠️ Avoid for...in on arrays — it iterates indices as strings
// and includes inherited properties
```

---

### Q33. What is `Array.from()`?

**Answer:**

```js
// From array-like or iterable
Array.from("hello");         // ["h","e","l","l","o"]
Array.from({length: 5}, (_, i) => i); // [0,1,2,3,4]
Array.from(new Set([1,2,3])); // [1,2,3]
Array.from(new Map([["a",1]])); // [["a",1]]

// Convert NodeList to Array
const divs = Array.from(document.querySelectorAll("div"));
```

---

### Q34. What is the difference between deep copy and shallow copy?

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

### Q35. What is `Symbol` in JavaScript?

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

## 🟡 Medium Questions (Q36–Q70)

---

### Q36. How does the JavaScript Event Loop work?

**Answer:**
The event loop allows JavaScript (single-threaded) to perform non-blocking operations.

```
Call Stack → Web APIs → Task Queue → Microtask Queue
```

**Order of execution:**
1. **Call Stack** — synchronous code runs first
2. **Microtask Queue** — Promises (`.then`), `queueMicrotask`, `MutationObserver`
3. **Macrotask Queue** — `setTimeout`, `setInterval`, `setImmediate`

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1 → 4 → 3 → 2
```

---

### Q37. What are Promises in JavaScript?

**Answer:**
A Promise represents a value that will be available now, in the future, or never.

**States:** `pending` → `fulfilled` or `rejected`

```js
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve("data"), 1000);
});

fetchData()
  .then(data => console.log(data))   // "data"
  .catch(err => console.error(err))
  .finally(() => console.log("done"));

// Promise combinators
Promise.all([p1, p2, p3])         // all resolve or one rejects
Promise.allSettled([p1, p2, p3])  // waits for all, regardless
Promise.race([p1, p2, p3])        // first to settle wins
Promise.any([p1, p2, p3])         // first to RESOLVE wins
```

---

### Q38. What is `async/await`?

**Answer:**
`async/await` is syntactic sugar over Promises, making async code look synchronous.

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) throw new Error("User not found");
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

// Parallel execution
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ]);
}
```

---

### Q39. What is the Prototype Chain?

**Answer:**
Every JavaScript object has a hidden `[[Prototype]]` link. When a property is accessed, JS walks up the chain until found or `null` is reached.

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const dog = new Dog("Rex");
dog.bark();   // "Rex barks!" (own)
dog.speak();  // "Rex makes a sound" (inherited)
```

---

### Q40. What is the difference between `call`, `apply`, and `bind`?

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

### Q41. What are ES6 Classes?

**Answer:**

```js
class Animal {
  #sound; // Private field (ES2022)
  
  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }
  
  speak() {
    return `${this.name} says ${this.#sound}`;
  }
  
  static create(name, sound) {
    return new Animal(name, sound);
  }
  
  get info() { return `${this.name}`; }
  set info(val) { this.name = val; }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "woof");
  }
  
  fetch() { return `${this.name} fetches the ball!`; }
}

const dog = new Dog("Rex");
dog.speak();  // "Rex says woof"
dog.fetch();  // "Rex fetches the ball!"
```

---

### Q42. What are generators in JavaScript?

**Answer:**
Generators are functions that can be paused and resumed with `yield`.

```js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Infinite sequence
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

const nat = naturals();
nat.next().value; // 1
nat.next().value; // 2

// Use with for...of
for (const num of numberGenerator()) {
  console.log(num); // 1, 2, 3
}
```

---

### Q43. What is `WeakMap` and `WeakSet`?

**Answer:**

```js
// WeakMap — keys must be objects, entries garbage-collected
// when key has no other references
const wm = new WeakMap();
let obj = {};
wm.set(obj, "metadata");
wm.get(obj); // "metadata"
obj = null; // entry will be GC'd

// WeakSet — set of objects, auto-cleaned
const ws = new WeakSet();
let user = { name: "Alice" };
ws.has(user); // false initially
ws.add(user);
ws.has(user); // true
user = null; // GC'd automatically

// Use case: private data per object
const _private = new WeakMap();
class Person {
  constructor(name, age) {
    _private.set(this, { age });
    this.name = name;
  }
  getAge() { return _private.get(this).age; }
}
```

---

### Q44. What is `Map` vs plain Object?

**Answer:**

```js
// Map — key can be ANY type, maintains insertion order
const map = new Map();
map.set("name", "Alice");
map.set(42, "a number key");
map.set({}, "an object key");

map.size;           // 3
map.get("name");    // "Alice"
map.has(42);        // true
map.delete(42);
map.forEach((val, key) => console.log(key, val));

// Convert
const obj = Object.fromEntries(map);
const map2 = new Map(Object.entries(obj));

// Map vs Object:
// ✅ Map: any key type, size property, better for frequent add/delete
// ✅ Object: JSON serializable, dot notation, prototype methods
```

---

### Q45. What is `Set` in JavaScript?

**Answer:**

```js
const set = new Set([1, 2, 3, 2, 1]);
console.log(set); // Set(3) {1, 2, 3} — unique values only

set.add(4);
set.has(3);    // true
set.delete(2);
set.size;      // 3
set.forEach(val => console.log(val));

// Convert to array
const arr = [...set]; // or Array.from(set)

// Remove duplicates from array
const unique = [...new Set([1, 2, 2, 3, 3, 4])];
// [1, 2, 3, 4]

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);
const union = new Set([...setA, ...setB]);         // {1,2,3,4}
const intersection = new Set([...setA].filter(x => setB.has(x))); // {2,3}
```

---

### Q46. What is event bubbling and capturing?

**Answer:**

```
  Phase 1 (Capture): Window → Document → Body → ... → Target
  Phase 2 (Bubble):  Target → ... → Body → Document → Window
```

```js
// Bubbling (default — useCapture = false)
document.querySelector(".child").addEventListener("click", () => {
  console.log("child clicked"); // fires 1st
});
document.querySelector(".parent").addEventListener("click", () => {
  console.log("parent clicked"); // fires 2nd (bubbling)
});

// Capturing
document.querySelector(".parent").addEventListener("click", () => {
  console.log("parent capturing"); // fires 1st
}, true); // <-- true = capture phase

// Stop bubbling
element.addEventListener("click", (e) => {
  e.stopPropagation(); // stops event from bubbling further
});

// Prevent default action
link.addEventListener("click", (e) => {
  e.preventDefault(); // e.g. stops navigation
});
```

---

### Q47. What is event delegation?

**Answer:**
Attach a single listener to a **parent** to handle events from many children (current and future).

```js
// ❌ Inefficient — listener on every item
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", handleClick);
});

// ✅ Event delegation — one listener on parent
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});

// Works for dynamically added elements too!
const ul = document.querySelector("ul");
ul.addEventListener("click", (e) => {
  const li = e.target.closest("li[data-id]");
  if (li) handleItem(li.dataset.id);
});
```

---

### Q48. What is the difference between `localStorage`, `sessionStorage`, and `cookies`?

**Answer:**

| Feature | localStorage | sessionStorage | Cookies |
|---|---|---|---|
| Capacity | ~5–10 MB | ~5 MB | ~4 KB |
| Expiry | Never (manual) | Tab close | Custom |
| Sent to server | No | No | Yes (every request) |
| Accessible from JS | Yes | Yes | Yes (if not HttpOnly) |
| Scope | Origin | Tab + Origin | Domain + Path |

```js
// localStorage
localStorage.setItem("key", JSON.stringify({ name: "Alice" }));
const data = JSON.parse(localStorage.getItem("key"));
localStorage.removeItem("key");
localStorage.clear();

// sessionStorage
sessionStorage.setItem("token", "abc123");

// Cookies
document.cookie = "name=Alice; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
```

---

### Q49. What is `debounce` and `throttle`?

**Answer:**

```js
// DEBOUNCE — execute after N ms of inactivity
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Use: search input, resize
const handleSearch = debounce((e) => fetchResults(e.target.value), 300);
input.addEventListener("input", handleSearch);

// THROTTLE — execute at most once per N ms
function throttle(fn, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

// Use: scroll, mousemove, resize
const handleScroll = throttle(() => updatePosition(), 100);
window.addEventListener("scroll", handleScroll);
```

---

### Q50. What is memoization?

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

### Q51. What is currying in JavaScript?

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
curriedAdd(1, 2)(3); // 6
curriedAdd(1)(2, 3); // 6

// Real use case
const multiply = curry((factor, value) => factor * value);
const double = multiply(2);
const triple = multiply(3);

[1, 2, 3].map(double); // [2, 4, 6]
[1, 2, 3].map(triple); // [3, 6, 9]
```

---

### Q52. What is function composition?

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

const processReverse = compose(split, lower, trim);
processReverse("  Hello World  "); // same result
```

---

### Q53. What is `Proxy` in JavaScript?

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

### Q54. What is `Reflect` in JavaScript?

**Answer:**

```js
// Reflect mirrors all Proxy traps as functions
// Makes meta-programming cleaner

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

### Q55. What is the `Iterator` protocol?

**Answer:**

```js
// An iterator has a next() method returning { value, done }
function createRange(start, end) {
  let current = start;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      return current <= end
        ? { value: current++, done: false }
        : { value: undefined, done: true };
    }
  };
}

const range = createRange(1, 5);
for (const n of range) console.log(n); // 1, 2, 3, 4, 5
[...range]; // [1, 2, 3, 4, 5]

// Built-in iterables: String, Array, Map, Set, arguments, NodeList
```

---

### Q56. What is `Promise.all` vs `Promise.allSettled` vs `Promise.race` vs `Promise.any`?

**Answer:**

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject("error");
const p3 = Promise.resolve(3);

// Promise.all — rejects if ANY rejects
Promise.all([p1, p2, p3]).catch(e => console.log(e)); // "error"
Promise.all([p1, p3]).then(v => console.log(v)); // [1, 3]

// Promise.allSettled — waits for ALL, never rejects
Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(r => console.log(r.status, r.value ?? r.reason));
  // "fulfilled" 1 | "rejected" "error" | "fulfilled" 3
});

// Promise.race — first to SETTLE (resolve or reject) wins
Promise.race([p1, p2, p3]).then(v => console.log(v)); // 1

// Promise.any — first to RESOLVE wins (ignores rejections)
Promise.any([p2, p1, p3]).then(v => console.log(v)); // 1
```

---

### Q57. What are `getter` and `setter` in JavaScript?

**Answer:**

```js
class Temperature {
  #celsius;
  
  constructor(celsius) {
    this.#celsius = celsius;
  }
  
  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }
  
  set fahrenheit(value) {
    this.#celsius = (value - 32) * 5/9;
  }
  
  get celsius() { return this.#celsius; }
  set celsius(value) {
    if (value < -273.15) throw new RangeError("Below absolute zero!");
    this.#celsius = value;
  }
}

const temp = new Temperature(0);
temp.fahrenheit; // 32
temp.fahrenheit = 212;
temp.celsius; // 100
```

---

### Q58. What is IIFE (Immediately Invoked Function Expression)?

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

// Named IIFE
(function init() {
  // Initialization code
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

### Q59. What is the difference between `Object.freeze()` and `Object.seal()`?

**Answer:**

```js
// Object.freeze() — cannot add, delete, or MODIFY properties
const frozen = Object.freeze({ name: "Alice", age: 30 });
frozen.name = "Bob";   // ❌ silently fails (or throws in strict)
frozen.city = "NYC";   // ❌ cannot add
delete frozen.age;     // ❌ cannot delete
// { name: "Alice", age: 30 }

// Object.seal() — cannot add or delete, but CAN modify
const sealed = Object.seal({ name: "Alice", age: 30 });
sealed.name = "Bob";   // ✅ modification allowed
sealed.city = "NYC";   // ❌ cannot add
delete sealed.age;     // ❌ cannot delete

// Check
Object.isFrozen(frozen); // true
Object.isSealed(sealed); // true

// ⚠️ Both are SHALLOW — nested objects are NOT frozen/sealed
```

---

### Q60. What is `globalThis`?

**Answer:**

```js
// Before globalThis — different globals per environment
// Browser: window
// Node.js: global
// Web Worker: self

// globalThis — unified way to access global object
console.log(globalThis); // works in all environments

globalThis.myGlobal = "hello";
console.log(globalThis.myGlobal); // "hello"

// Useful in cross-environment code (libraries, polyfills)
```

---

### Q61. Explain `Object.create()` and prototypal inheritance.

**Answer:**

```js
const animal = {
  speak() { return `${this.name} speaks`; },
  eat() { return `${this.name} eats`; }
};

// Create object with animal as prototype
const dog = Object.create(animal);
dog.name = "Rex";
dog.bark = function() { return `${this.name} barks`; };

dog.bark();   // "Rex barks" (own)
dog.speak();  // "Rex speaks" (inherited from animal)

// Check prototype chain
Object.getPrototypeOf(dog) === animal; // true

// Object.create(null) — no prototype (pure dictionary)
const dict = Object.create(null);
// No toString, hasOwnProperty, etc.
```

---

### Q62. What is `structuredClone()`?

**Answer:**

```js
// Modern deep clone (no need for JSON tricks or lodash)
const original = {
  name: "Alice",
  address: { city: "Mumbai" },
  hobbies: ["reading", "coding"],
  date: new Date(),
  set: new Set([1, 2, 3]),
  map: new Map([["key", "value"]])
};

const clone = structuredClone(original);
clone.address.city = "Delhi";

console.log(original.address.city); // "Mumbai" ✅ not affected

// Supports: Date, Set, Map, ArrayBuffer, RegExp, etc.
// Does NOT support: functions, DOM nodes, class instances
```

---

### Q63. What is `requestAnimationFrame`?

**Answer:**

```js
// Execute callback before next browser repaint (~60fps)
function animate() {
  // Update animation state
  element.style.left = `${x++}px`;
  
  if (x < 500) {
    requestAnimationFrame(animate); // loop
  }
}
requestAnimationFrame(animate);

// vs setTimeout(fn, 16) — rAF:
// - Synced to display refresh rate
// - Pauses when tab is not visible (saves battery)
// - More accurate timing
// - Batches DOM updates optimally

// Cancel
const id = requestAnimationFrame(myFn);
cancelAnimationFrame(id);
```

---

### Q64. What are tagged template literals?

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

### Q65. What is the `AbortController`?

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

### Q66. What are `WeakRef` and `FinalizationRegistry`?

**Answer:**

```js
// WeakRef — hold reference without preventing GC
let obj = { name: "Alice" };
const weakRef = new WeakRef(obj);

weakRef.deref()?.name; // "Alice"
obj = null; // obj can now be GC'd
// Later: weakRef.deref() might return undefined

// FinalizationRegistry — run cleanup when object is GC'd
const registry = new FinalizationRegistry((value) => {
  console.log(`${value} was garbage collected`);
});

let target = { data: "important" };
registry.register(target, "target object");
target = null; // When GC runs: "target object was garbage collected"

// Use case: cleanup (clear cache, close connections, etc.)
```

---

### Q67. What is `Object.defineProperty()`?

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

### Q68. What is `queueMicrotask`?

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

### Q69. What are JavaScript modules (ESM)?

**Answer:**

```js
// math.js — named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// Default export
export default class Calculator { /* ... */ }

// main.js — imports
import Calculator, { PI, add, subtract } from "./math.js";
import * as math from "./math.js"; // namespace import

// Dynamic import
const module = await import("./heavy.js"); // lazy loading
module.default();

// Re-export
export { add, subtract } from "./math.js";
export * from "./math.js";
```

---

### Q70. What is the difference between CommonJS and ES Modules?

**Answer:**

```js
// CommonJS (Node.js default)
const fs = require("fs");
module.exports = { add, subtract };
module.exports.PI = 3.14;

// ES Modules
import fs from "fs";
export { add, subtract };
export const PI = 3.14;

// Key differences:
// CJS: synchronous, loads at runtime, dynamic require() allowed
// ESM: asynchronous, static analysis at parse time, tree-shakeable

// CJS: exports is an object (copy), ESM: live bindings
// CJS: works in Node.js out of the box
// ESM: requires .mjs extension or "type": "module" in package.json
// ESM: supports top-level await
```

---

## 🔴 Hard Questions (Q71–Q100)

---

### Q71. Explain the JavaScript memory model and garbage collection.

**Answer:**

JavaScript uses **automatic garbage collection** with the **Mark-and-Sweep** algorithm.

**Memory lifecycle:**
1. **Allocate** — when declaring variables, objects, functions
2. **Use** — reading/writing
3. **Release** — GC reclaims unreachable memory

```js
// Memory leak examples and fixes:

// 1. Forgotten timers
const id = setInterval(() => { /* uses reference */ }, 1000);
clearInterval(id); // ✅ always clear

// 2. Detached DOM nodes
let div = document.createElement("div");
document.body.appendChild(div);
document.body.removeChild(div);
div = null; // ✅ remove reference

// 3. Closures holding large data
function process(largeData) {
  const summary = summarize(largeData);
  return function() {
    return summary; // ✅ only keep what's needed
  };
}

// 4. Global variables
function oops() {
  leakedVar = "I am global!"; // ❌ no var/let/const
}
```

---

### Q72. How do you implement `Promise.all` from scratch?

**Answer:**

```js
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    
    const results = new Array(promises.length);
    let resolved = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          resolved++;
          if (resolved === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // first rejection cancels all
    });
  });
}

// Test
myPromiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(console.log); // [1, 2, 3]
```

---

### Q73. Implement a deep clone function from scratch.

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

---

### Q74. How does JavaScript's `async/await` work under the hood?

**Answer:**

```js
// async/await is syntactic sugar over Promises + generators

// This async function:
async function fetchUser(id) {
  const response = await fetch(`/api/${id}`);
  const user = await response.json();
  return user;
}

// Is roughly equivalent to:
function fetchUser(id) {
  return Promise.resolve()
    .then(() => fetch(`/api/${id}`))
    .then(response => response.json())
    .then(user => user);
}

// Under the hood, V8 transforms async functions into state machines:
// 1. Function runs synchronously until first await
// 2. Suspends execution, returns Promise
// 3. When awaited Promise resolves, execution resumes
// 4. Repeat until function returns

// This means:
async function demo() {
  console.log("A");           // sync
  await Promise.resolve();
  console.log("B");           // after microtask
}
console.log("before");
demo();
console.log("after");
// Output: before → A → after → B
```

---

### Q75. Implement a pub/sub (event emitter) system.

**Answer:**

```js
class EventEmitter {
  #listeners = new Map();
  
  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
    return () => this.off(event, listener); // return unsubscribe fn
  }
  
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
  
  off(event, listener) {
    this.#listeners.get(event)?.delete(listener);
  }
  
  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(listener => {
      listener(...args);
    });
  }
  
  removeAllListeners(event) {
    if (event) this.#listeners.delete(event);
    else this.#listeners.clear();
  }
}

const emitter = new EventEmitter();
const unsub = emitter.on("data", data => console.log("Received:", data));
emitter.emit("data", { id: 1 }); // "Received: {id:1}"
unsub(); // unsubscribe
```

---

### Q76. What is the Virtual DOM and how does it work conceptually?

**Answer:**

```js
// Virtual DOM — lightweight JS representation of real DOM

// 1. Create virtual node
function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

// 2. Render to real DOM
function render(vNode, container) {
  if (typeof vNode === "string") {
    container.appendChild(document.createTextNode(vNode));
    return;
  }
  
  const el = document.createElement(vNode.type);
  
  Object.entries(vNode.props).forEach(([key, val]) => {
    if (key.startsWith("on")) {
      el.addEventListener(key.slice(2).toLowerCase(), val);
    } else {
      el.setAttribute(key, val);
    }
  });
  
  vNode.children.forEach(child => render(child, el));
  container.appendChild(el);
}

// 3. Diff algorithm compares old vs new vDOM
// Only updates changed parts → O(n) instead of full re-render
// This is the core of React/Vue performance
```

---

### Q77. What is `tail call optimization` (TCO)?

**Answer:**

```js
// Regular recursion — stack overflow risk at large n
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // ← NOT a tail call (multiplied after return)
}

// Tail call — last operation is the recursive call
function factorialTCO(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTCO(n - 1, n * acc); // ← tail call (nothing after)
}

// With TCO, engine reuses the current stack frame
// ES6 spec mandates TCO in strict mode — but only Safari implements it
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

### Q78. Explain how `this` binding works with all 4 rules.

**Answer:**

```js
// Rule 1: Default binding — global (or undefined in strict mode)
function show() { console.log(this); }
show(); // Window / undefined(strict)

// Rule 2: Implicit binding — object before the dot
const obj = { name: "Alice", greet() { console.log(this.name); } };
obj.greet(); // "Alice"

// Binding lost:
const fn = obj.greet;
fn(); // undefined — no implicit binding anymore!

// Rule 3: Explicit binding — call/apply/bind
show.call({ name: "Bob" }); // {name:"Bob"}

// Rule 4: new binding — creates new object
function Person(name) { this.name = name; }
const p = new Person("Alice");
p.name; // "Alice"

// Priority: new > explicit > implicit > default
// Arrow functions: inherit lexical this (none of the above)
```

---

### Q79. Implement `Function.prototype.bind` from scratch.

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

// Test
function greet(greeting, name) {
  return `${greeting}, ${name || this.name}!`;
}
const greetAlice = greet.myBind({ name: "Alice" }, "Hello");
greetAlice(); // "Hello, Alice!"
```

---

### Q80. How does `new` keyword work internally?

**Answer:**

```js
// When you do: const obj = new MyClass(args)
// JavaScript does these steps:
function myNew(Constructor, ...args) {
  // 1. Create empty object
  const obj = Object.create(Constructor.prototype);
  
  // 2. Bind `this` to new object and call constructor
  const result = Constructor.apply(obj, args);
  
  // 3. Return the new object (unless constructor returns an object)
  return (result !== null && typeof result === "object") ? result : obj;
}

// Test
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const alice = myNew(Person, "Alice", 30);
alice instanceof Person; // true
alice.name; // "Alice"
```

---

### Q81. What is `Object.getOwnPropertyDescriptor` and property descriptors?

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

// Copy with descriptors (unlike spread which loses accessors)
const copy = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
```

---

### Q82. What is a Service Worker and how does it work?

**Answer:**

```js
// Service Worker — intercepts network requests, enables offline

// 1. Register (in main script)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(reg => console.log("SW registered:", reg.scope))
    .catch(err => console.error("SW failed:", err));
}

// 2. Service Worker lifecycle (sw.js)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then(cache =>
      cache.addAll(["/", "/index.html", "/app.js", "/style.css"])
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== "v1").map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
```

---

### Q83. Explain JavaScript's `Symbol.iterator` and how to make objects iterable.

**Answer:**

```js
class InfiniteCounter {
  constructor(start = 0) {
    this.value = start;
  }
  
  [Symbol.iterator]() {
    let current = this.value;
    return {
      next() {
        return { value: current++, done: false };
      },
      return(value) { // called when loop exits early
        console.log("Iterator closed early");
        return { value, done: true };
      }
    };
  }
}

const counter = new InfiniteCounter(1);
const [first, second, third] = counter; // 1, 2, 3

for (const n of counter) {
  if (n > 5) break; // triggers return()
  console.log(n);
}
```

---

### Q84. What are async generators?

**Answer:**

```js
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

// Consume with for await...of
async function main() {
  for await (const num of asyncRange(1, 5)) {
    console.log(num); // 1, 2, 3, 4, 5 — each delayed 100ms
  }
}

// Real use: paginated API fetching
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = await fetch(`${url}?page=${page}`).then(r => r.json());
    if (!data.items.length) return;
    yield data.items;
    page++;
  }
}
```

---

### Q85. How do you handle circular references in JSON serialization?

**Answer:**

```js
// Problem
const obj = { name: "Alice" };
obj.self = obj; // circular reference
JSON.stringify(obj); // ❌ TypeError: circular structure

// Solution 1: replacer function
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

// Solution 2: structured clone (handles it natively)
// structuredClone handles circular — but throws on JSON.stringify

// Solution 3: Use a library like flatted
// import { stringify } from "flatted";
```

---

### Q86. Implement `Object.assign` from scratch.

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

### Q87. What is the `Temporal` API (Stage 3)?

**Answer:**

```js
// Temporal replaces the broken Date API

// Current date
const today = Temporal.Now.plainDateISO();
// PlainDate { year: 2024, month: 12, day: 25 }

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

### Q88. What is `AggregateError` and when is it used?

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

### Q89. Explain the difference between microtasks and macrotasks with execution order.

**Answer:**

```js
// Macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
// Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver

console.log("1");                          // sync

setTimeout(() => console.log("2"), 0);    // macrotask

Promise.resolve()
  .then(() => {
    console.log("3");                      // microtask
    setTimeout(() => console.log("4"), 0); // macrotask (scheduled inside microtask)
  })
  .then(() => console.log("5"));           // microtask (chained)

queueMicrotask(() => console.log("6"));   // microtask

console.log("7");                          // sync

// Output: 1 → 7 → 3 → 6 → 5 → 2 → 4
// Explanation:
// Sync: 1, 7
// Microtasks: 3, 6, 5 (3 adds setTimeout, 6 is queueMicrotask, 5 is chained)
// Macrotasks: 2 (original), 4 (added during microtask)
```

---

### Q90. How do you implement a rate limiter in JavaScript?

**Answer:**

```js
class RateLimiter {
  #queue = [];
  #running = 0;
  #limit;
  #interval;
  
  constructor(limit, interval) {
    this.#limit = limit;     // max requests
    this.#interval = interval; // per interval (ms)
  }
  
  async execute(fn) {
    return new Promise((resolve, reject) => {
      this.#queue.push({ fn, resolve, reject });
      this.#process();
    });
  }
  
  #process() {
    while (this.#queue.length && this.#running < this.#limit) {
      const { fn, resolve, reject } = this.#queue.shift();
      this.#running++;
      
      Promise.resolve()
        .then(() => fn())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          setTimeout(() => {
            this.#running--;
            this.#process();
          }, this.#interval);
        });
    }
  }
}

// Max 3 requests per second
const limiter = new RateLimiter(3, 1000);
const fetchWithLimit = url => limiter.execute(() => fetch(url));
```

---

### Q91. What is `module federation` and microfrontends?

**Answer:**

```js
// Webpack Module Federation — share code between apps at runtime

// App 1 (host) — webpack.config.js
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js"
  },
  shared: { react: { singleton: true }, "react-dom": { singleton: true } }
});

// App 2 (remote) — webpack.config.js
new ModuleFederationPlugin({
  name: "remoteApp",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/components/Button",
    "./Header": "./src/components/Header"
  },
  shared: { react: { singleton: true } }
});

// Usage in host
const RemoteButton = React.lazy(() => import("remoteApp/Button"));

// Benefits: Independent deploy, team autonomy, shared dependencies
// Drawbacks: Version conflicts, runtime failures, complexity
```

---

### Q92. Explain `TypedArray` and `ArrayBuffer`.

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

---

### Q93. What are JavaScript design patterns? Name and implement key ones.

**Answer:**

```js
// 1. SINGLETON
class Database {
  static #instance = null;
  constructor() {
    if (Database.#instance) return Database.#instance;
    this.connection = "DB connected";
    Database.#instance = this;
  }
  static getInstance() {
    return Database.#instance || new Database();
  }
}

// 2. OBSERVER
class Store {
  #state = {};
  #observers = new Set();
  
  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#observers.forEach(fn => fn(this.#state));
  }
  subscribe(fn) { this.#observers.add(fn); return () => this.#observers.delete(fn); }
}

// 3. FACTORY
function createUser(role) {
  const roles = { admin: AdminUser, user: RegularUser };
  const UserClass = roles[role] || RegularUser;
  return new UserClass();
}

// 4. DECORATOR
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
```

---

### Q94. How does `V8` optimize JavaScript? What are hidden classes?

**Answer:**

```js
// V8 uses Hidden Classes (Shapes/Maps) for property access optimization

// ✅ Good — V8 creates ONE hidden class for all Person objects
class Person {
  constructor(name, age) {
    this.name = name; // property order matters!
    this.age = age;
  }
}

// ❌ Bad — creates DIFFERENT hidden classes
function createPerson(name, age) {
  const obj = {};
  obj.name = name; // hidden class A
  obj.age = age;   // hidden class B (transition)
  return obj;
}

// ❌ Bad — dynamic property addition breaks optimization
const p = new Person("Alice", 30);
p.email = "alice@example.com"; // hidden class C — new class!

// V8 optimization pipeline:
// 1. Interpreter (Ignition) — runs immediately
// 2. Baseline compiler
// 3. Optimizing compiler (Turbofan) — for "hot" code
// 4. Deoptimization — if assumptions broken
```

---

### Q95. Implement an observable/reactive system from scratch.

**Answer:**

```js
// Mini-reactive system (inspired by Vue 3)
let activeEffect = null;

function reactive(obj) {
  const deps = new Map();
  
  const getDeps = key => {
    if (!deps.has(key)) deps.set(key, new Set());
    return deps.get(key);
  };
  
  return new Proxy(obj, {
    get(target, key) {
      if (activeEffect) getDeps(key).add(activeEffect);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      getDeps(key).forEach(effect => effect()); // trigger
      return true;
    }
  });
}

function effect(fn) {
  activeEffect = fn;
  fn(); // run immediately to collect deps
  activeEffect = null;
}

// Usage
const state = reactive({ count: 0 });
effect(() => console.log("Count:", state.count)); // "Count: 0"
state.count++; // "Count: 1"
state.count++; // "Count: 2"
```

---

### Q96. What is `Atomics` and `SharedArrayBuffer`?

**Answer:**

```js
// SharedArrayBuffer — shared memory between main thread and workers
const sharedBuffer = new SharedArrayBuffer(4); // 4 bytes
const sharedArray = new Int32Array(sharedBuffer);

// Worker 1
sharedArray[0] = 42;

// Worker 2 — can read same memory
console.log(sharedArray[0]); // 42

// Problem: race conditions!
// Atomics — thread-safe operations
Atomics.add(sharedArray, 0, 1);       // atomic increment
Atomics.sub(sharedArray, 0, 1);       // atomic decrement
Atomics.load(sharedArray, 0);         // atomic read
Atomics.store(sharedArray, 0, 100);   // atomic write
Atomics.compareExchange(sharedArray, 0, 100, 200); // CAS
Atomics.wait(sharedArray, 0, 100);    // block until value changes
Atomics.notify(sharedArray, 0, 1);    // wake up waiting threads
```

---

### Q97. How do you implement `async/await` using generators?

**Answer:**

```js
// async/await can be polyfilled using generators

function asyncToGenerator(generatorFn) {
  return function(...args) {
    const generator = generatorFn.apply(this, args);
    
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let result;
        try {
          result = generator[key](arg);
        } catch (error) {
          return reject(error);
        }
        
        const { value, done } = result;
        
        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(
            val => step("next", val),
            err => step("throw", err)
          );
        }
      }
      
      step("next", undefined);
    });
  };
}

// Usage
const fetchUser = asyncToGenerator(function*(id) {
  const response = yield fetch(`/api/users/${id}`);
  const user = yield response.json();
  return user;
});
```

---

### Q98. Explain CSP (Content Security Policy) and its JavaScript implications.

**Answer:**

```js
// CSP prevents XSS by controlling which resources load
// Set via HTTP header or <meta> tag:
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'

// Inline scripts are blocked by default with CSP
// ❌ This is blocked
<script>alert("XSS")</script>

// ✅ With nonce (unique per request)
<script nonce="abc123">console.log("safe")</script>

// ❌ eval() is blocked by default (no 'unsafe-eval')
eval("malicious code"); // blocked!
new Function("return malicious"); // blocked!
setTimeout("malicious()", 0); // blocked if string!
setTimeout(() => malicious(), 0); // ✅ function is fine

// Implications for developers:
// - No inline event handlers: onclick="fn()" ❌
// - Use addEventListener instead ✅
// - Libraries using eval() won't work (e.g. some template engines)
// - Dynamic imports may need 'script-src' adjustments
```

---

### Q99. What are the latest JavaScript features (ES2023/ES2024)?

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

// Regex /v flag (set notation)
/[\p{Script=Latin}&&[^aeiou]]/v // consonants

// Array.fromAsync (ES2024)
const arr2 = await Array.fromAsync(asyncGenerator());
```

---

### Q100. How do you architect a large-scale JavaScript application?

**Answer:**

```
Architecture Principles for Scale:
1. Separation of Concerns
2. Single Responsibility
3. Dependency Inversion
4. Observable State Management
```

```js
// 1. LAYERED ARCHITECTURE
//
// UI Layer (React/Vue)
//    ↓
// Application Layer (Use Cases / Services)
//    ↓
// Domain Layer (Business Logic / Entities)
//    ↓
// Infrastructure Layer (API / Storage / External)

// 2. STATE MANAGEMENT (Flux/Redux pattern)
const store = {
  state: { users: [], loading: false },
  
  dispatch(action) {
    this.state = reducer(this.state, action);
    this.subscribers.forEach(fn => fn(this.state));
  },
  
  subscribe(fn) { this.subscribers.push(fn); }
};

// 3. DEPENDENCY INJECTION
class UserService {
  constructor(private api: ApiClient, private cache: CacheService) {}
  
  async getUser(id) {
    return this.cache.get(`user:${id}`)
      ?? await this.api.get(`/users/${id}`);
  }
}

// 4. ERROR BOUNDARIES & RESILIENCE
class CircuitBreaker {
  #failures = 0;
  #threshold = 5;
  #state = "CLOSED"; // CLOSED → OPEN → HALF_OPEN
  
  async execute(fn) {
    if (this.#state === "OPEN") throw new Error("Circuit open");
    try {
      const result = await fn();
      this.#onSuccess();
      return result;
    } catch (err) {
      this.#onFailure();
      throw err;
    }
  }
}

// 5. CODE SPLITTING & LAZY LOADING
const Dashboard = React.lazy(() => import("./Dashboard"));
const route = { path: "/admin", component: () => import("./Admin") };

// 6. PERFORMANCE
// - Bundle splitting (vendor, app, async chunks)
// - Tree shaking (named exports, side-effect free)
// - Web Workers for CPU-intensive tasks
// - Virtual scrolling for large lists
// - SSR/SSG for initial load performance
```

---

## 📊 Summary

| Level | Questions | Topics Covered |
|---|---|---|
| 🟢 Easy | Q1–Q35 | Data types, var/let/const, closures, array/object methods, ES6 basics |
| 🟡 Medium | Q36–Q70 | Event loop, Promises, async/await, Proxy, generators, modules |
| 🔴 Hard | Q71–Q100 | Memory management, V8 internals, patterns, advanced async, architecture |

---

## 💡 Interview Tips

- **Always explain your thought process** — interviewers want to know HOW you think
- **Start with the simple case**, then add complexity (edge cases, performance, etc.)
- **Know the tradeoffs** — there's rarely one right answer in software engineering
- **Practice coding** common utilities from scratch: `debounce`, `deepClone`, `Promise.all`
- **Understand the WHY** behind language features, not just the what

---

*Good luck with your interview! 🚀*
