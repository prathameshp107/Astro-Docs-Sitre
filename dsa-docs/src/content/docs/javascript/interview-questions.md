---
title: "JavaScript Interview Questions"
description: "150+ JavaScript interview questions from beginner to advanced with hidden answers."
sidebar:
  order: 999
  label: "Interview Questions (150+)"
---

> **How to use:** Click any question to expand the answer.

---

## 🟢 Easy (Q1–Q50)

<details class="qa-card qa-easy">
<summary>
Q1. What is JavaScript and how did it originate?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

JavaScript is a **high-level, interpreted programming language** created by **Brendan Eich** in 1995 at Netscape. It was originally called **Mocha**, then **LiveScript**, before being renamed to JavaScript.

It was created in just **10 days** to add interactivity to web pages. Today it's one of the most widely used languages, running everywhere from browsers to servers (Node.js) to IoT devices.

```js
console.log("Hello, JavaScript!");
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. What is ECMAScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**ECMAScript (ES)** is the standardized specification that JavaScript follows. It's maintained by **ECMA International** (ECMA-262).

| Version | Year | Key Features |
|---------|------|-------------|
| ES3 | 1999 | `try/catch`, regex, `switch` |
| ES5 | 2009 | `strict mode`, `JSON`, `Array.map/filter/reduce` |
| ES6/ES2015 | 2015 | `let/const`, arrow functions, classes, Promises, modules |
| ES2016 | 2016 | `Array.includes`, exponentiation operator |
| ES2017 | 2017 | `async/await`, `Object.values/entries` |
| ES2018 | 2018 | Rest/spread for objects, `Promise.finally` |
| ES2019 | 2019 | `Array.flat/flatMap`, `Object.fromEntries` |
| ES2020 | 2020 | Optional chaining, nullish coalescing, `Promise.allSettled` |
| ES2021 | 2021 | `String.replaceAll`, `Promise.any`, logical assignment |
| ES2022 | 2022 | Class fields, `await` at top level, `Array.at` |
| ES2023 | 2023 | `Array.findLast`, `toSorted/toReversed` |
| ES2024 | 2024 | `Object.groupBy`, `Promise.withResolvers` |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What is a JavaScript Engine?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **JavaScript engine** is a program that executes JavaScript code. Popular engines:

| Engine | Used By |
|--------|---------|
| **V8** | Chrome, Node.js, Deno, Brave |
| **SpiderMonkey** | Firefox |
| **JavaScriptCore** | Safari |
| **Chakra** | Legacy Edge |
| **Hermes** | React Native |

Engines typically include: a **parser** (turns code into AST), an **interpreter** (executes quickly), and a **compiler** (optimizes hot code).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What is the JavaScript Runtime?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **JavaScript runtime** is the environment that provides additional features beyond the language itself.

**Browser runtime includes:** `window`, `document`, `fetch`, `setTimeout`, DOM APIs, console, localStorage

**Node.js runtime includes:** `global`, `fs`, `http`, `path`, `process`, `Buffer`, `require()`

Both share: the JS engine, Event Loop, Microtask/Macrotask queues, and APIs like `setTimeout` and `console`.

```js
// Browser-specific
console.log(window.innerWidth);  // Browser runtime
document.getElementById("app");   // Browser runtime

// Node.js-specific
const fs = require("fs");        // Node.js runtime
console.log(process.version);     // Node.js runtime
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. How is JavaScript compiled or interpreted?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Modern JavaScript uses **Just-In-Time (JIT) compilation** — a hybrid approach:

1. **Parsing** — Source code → Abstract Syntax Tree (AST)
2. **Interpreting** — AST → Bytecode (executed by the interpreter)
3. **Compiling** — "Hot" (frequently executed) code is compiled to **native machine code** by the optimizing compiler (e.g., V8's Turbofan)
4. **Deoptimization** — If assumptions break, falls back to interpreted code

```js
// V8's pipeline: Source → Parser → AST → Ignition (interpreter) → Bytecode
//                ↓ (hot code)
//           Turbofan (optimizing compiler) → Optimized Machine Code
```

Older JavaScript was purely interpreted. Modern engines blend interpretation and compilation for both startup speed and runtime performance.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. What is an Execution Context?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

An **Execution Context** is an abstract environment where JavaScript code is evaluated. There are three types:

1. **Global Execution Context** — Created when the script starts. One per program.
2. **Function Execution Context** — Created when a function is called. One per function call.
3. **Eval Execution Context** — Created inside `eval()`.

Each execution context has:
- **Variable Environment** — `var` declarations, function declarations
- **Lexical Environment** — `let`, `const` declarations
- **`this` binding**
- **Outer environment reference** (for scope chain)

```js
const global = "I'm global";  // Global Execution Context

function outer() {
  const x = 1;                // outer() Execution Context
  function inner() {
    const y = 2;              // inner() Execution Context
    console.log(x + y);       // Access via scope chain
  }
  inner();
}
outer();
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. What is the Global Execution Context?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **Global Execution Context** is the default context created when JavaScript starts running. It:

- Creates the **global object** (`window` in browser, `global` in Node.js)
- Creates the **`this`** keyword (points to the global object)
- Allocates memory for global variables and functions (hoisting)

```js
// In browser, these are equivalent:
console.log(this === window); // true
console.log(Math === window.Math); // true

var globalVar = "accessible everywhere";
function globalFunc() { /* also global */ }
```

Only **one** Global Execution Context exists per program.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. What happens during the Memory Creation and Execution phases?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Each execution context goes through **two phases**:

**Phase 1: Memory Creation (Creation Phase)**
- Creates the scope chain
- Allocates memory for variables and functions
- Variables declared with `var` are initialized to `undefined`
- `let` and `const` are allocated but NOT initialized (Temporal Dead Zone)
- Function declarations are fully hoisted (stored in memory)

**Phase 2: Execution Phase**
- Assigns values to variables
- Executes code line by line
- Creates new execution contexts for function calls

```js
console.log(a); // undefined (memory creation: var a = undefined)
var a = 5;      // execution: a = 5

console.log(b); // ❌ ReferenceError (TDZ)
let b = 10;     // execution: b = 10

greet();        // "Hello!" — function fully hoisted
function greet() { console.log("Hello!"); }
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. What is the Call Stack?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **Call Stack** is a LIFO (Last In, First Out) data structure that tracks function execution. It records where in the program we are.

```js
function multiply(a, b) { return a * b; }
function square(n) { return multiply(n, n); }
function main() {
  const result = square(5);
  console.log(result);
}

main();
```

**Stack evolution:**
```
1. [main]              — main() called
2. [main, square]      — square() called
3. [main, square, multiply] — multiply() called
4. [main, square]      — multiply() returns
5. [main]              — square() returns
6. []                  — main() returns (empty)
```

**Stack overflow:** Too many nested calls (e.g., infinite recursion) — `RangeError: Maximum call stack size exceeded`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. What is the difference between Stack and Heap memory?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | Stack | Heap |
|---------|-------|------|
| **Stores** | Primitives and references | Objects, arrays, functions |
| **Size** | Fixed, small | Dynamic, large |
| **Speed** | Fast | Slower |
| **Management** | Automatic (by engine) | Garbage collected |
| **Lifetime** | Scope-based | Until no references remain |

```js
let name = "Alice";            // Stack: stores value "Alice"
let age = 30;                  // Stack: stores value 30
let person = { name, age };    // Stack: stores reference → Heap: stores object
let hobbies = ["reading"];     // Stack: stores reference → Heap: stores array

// When person goes out of scope, the reference is removed from Stack
// The object remains in Heap until GC collects it
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. What are the different data types in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

JavaScript has **8 data types** — 7 primitive and 1 non-primitive:

**Primitive (immutable, stored by value):**
| Type | Example | `typeof` |
|------|---------|----------|
| `string` | `"hello"` | `"string"` |
| `number` | `42`, `3.14` | `"number"` |
| `boolean` | `true`, `false` | `"boolean"` |
| `undefined` | `let a;` | `"undefined"` |
| `null` | `let a = null` | `"object"` (historical bug) |
| `symbol` | `Symbol("id")` | `"symbol"` |
| `bigint` | `9007199254740991n` | `"bigint"` |

**Non-primitive (mutable, stored by reference):**
| Type | `typeof` |
|------|----------|
| `object` | `"object"` |
| `function` | `"function"` (but functions are objects) |

```js
typeof null // "object" — this is a known bug from JS's first version
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. What is the difference between `var`, `let`, and `const`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block `{}` | Block `{}` |
| Hoisting | Yes (initialized `undefined`) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | ✅ Allowed | ❌ SyntaxError | ❌ SyntaxError |
| Re-assign | ✅ | ✅ | ❌ TypeError |
| Global property | ✅ (on `window`) | ❌ | ❌ |

```js
function example() {
  // var — function scoped
  if (true) { var x = 1; }
  console.log(x); // 1 — accessible outside block

  // let/const — block scoped
  if (true) { let y = 2; const z = 3; }
  console.log(y); // ❌ ReferenceError

  // const — cannot reassign
  const obj = { name: "Alice" };
  obj.name = "Bob";  // ✅ Allowed — const prevents reassignment, not mutation
  // obj = {};        // ❌ TypeError
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. What is scope in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Scope** determines where variables and functions are accessible. JavaScript has:

1. **Global Scope** — Variables accessible everywhere
2. **Function Scope** — Variables accessible only within the function (`var`)
3. **Block Scope** — Variables accessible only within the block (`let`, `const`)
4. **Lexical Scope** — Inner functions can access outer scopes

```js
const global = "global";                  // Global scope

function outer() {
  const outerVar = "outer";               // Function scope (outer)
  
  if (true) {
    let blockVar = "block";               // Block scope
    var functionVar = "function scoped";  // Function scope (outer, not block!)
  }
  
  console.log(outerVar);      // ✅ "outer"
  console.log(functionVar);   // ✅ "function scoped"
  console.log(blockVar);      // ❌ ReferenceError
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. What is the Temporal Dead Zone (TDZ)?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **Temporal Dead Zone** is the time between entering scope and variable declaration where `let` and `const` variables exist but cannot be accessed.

```js
// TDZ starts at beginning of scope
{
  // TDZ for name — accessing it throws ReferenceError
  // console.log(name); // ❌ ReferenceError: Cannot access 'name' before initialization
  
  const name = "Alice";  // TDZ ends here
  console.log(name);     // ✅ "Alice"
}

// var does NOT have TDZ — it's initialized with undefined
{
  console.log(age); // undefined (no TDZ)
  var age = 25;
}
```

**Why TDZ exists:** To catch errors earlier — accessing a variable before its declaration is a programming mistake.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. What is variable shadowing and illegal shadowing?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Shadowing** — When a variable in an inner scope declares the same name as a variable in an outer scope.

```js
let name = "Alice";

function greet() {
  let name = "Bob";  // Shadows the outer 'name'
  console.log(name); // "Bob"
}

greet();
console.log(name);   // "Alice" — outer is unaffected
```

**Illegal Shadowing** — Shadowing a `let` with a `var` inside the same block is not allowed:

```js
let x = 1;
{
  var x = 2;  // ❌ SyntaxError: Identifier 'x' has already been declared
}

// But this works:
let y = 1;
function test() {
  var y = 2;  // ✅ Different scope (function ≠ block)
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What is hoisting in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope during the creation phase.

```js
// 1. var — hoisted, initialized with undefined
console.log(a); // undefined (not error!)
var a = 5;

// 2. Function declaration — fully hoisted
greet(); // "Hello!" — the whole function is hoisted
function greet() { console.log("Hello!"); }

// 3. let/const — hoisted but in TDZ
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;

// 4. Function expression — only variable is hoisted (as undefined)
sayHi(); // ❌ TypeError: sayHi is not a function
var sayHi = function() { console.log("Hi!"); };
```

**Important:** Only declarations are hoisted, not initializations.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. What is `typeof` and what are its quirks?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
typeof 42            // "number"
typeof "hello"       // "string"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"  ← QUIRK: this is a bug from JS v1
typeof {}            // "object"
typeof []            // "object"  ← use Array.isArray() instead
typeof function(){}  // "function"
typeof Symbol()      // "symbol"
typeof 42n           // "bigint"
typeof NaN           // "number"  — NaN is a number type
typeof undeclaredVar // "undefined" — doesn't throw (useful for checking existence)
```

**Edge cases to remember:**
- `typeof null === "object"` — never changes for backward compatibility
- `typeof [] === "object"` — arrays are objects
- `typeof NaN === "number"` — NaN is still a numeric type

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. What is `NaN` and how do you check for it?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`NaN`** stands for "Not-a-Number" and is returned when a mathematical operation fails.

```js
0 / 0          // NaN
parseInt("abc") // NaN
Math.sqrt(-1)  // NaN
undefined + 1  // NaN
"abc" * 2      // NaN
```

**Critical quirk:** `NaN` is the only value in JavaScript that is **not equal to itself**:

```js
NaN === NaN  // false — NEVER use === to check for NaN
NaN == NaN   // false
```

**Correct ways to check:**
```js
Number.isNaN(NaN)     // true ✅ — does NOT coerce
Number.isNaN("abc")   // false ✅ — doesn't coerce strings

isNaN(NaN)            // true — but coerces first!
isNaN("abc")          // true ← BUG: coerce "abc" to Number → NaN
isNaN(undefined)      // true ← BUG
```

**Always prefer `Number.isNaN()` over global `isNaN()`.**

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. What are the differences between `==` and `===`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- **`==` (Loose equality)** — Compares after **type coercion**
- **`===` (Strict equality)** — Compares **without coercion** (checks type + value)

```js
// == with coercion
1 == "1"        // true ("1" coerced to number)
0 == false      // true (false → 0)
"" == false     // true (both coerce to 0)
null == undefined // true
[] == false     // true ([] → "" → 0, false → 0)
[1] == 1        // true ([1] → "1" → 1)

// === without coercion
1 === "1"       // false (number ≠ string)
0 === false     // false (number ≠ boolean)
null === undefined // false (different types)
```

**Best practice:** Always use `===` and `!==` to avoid coercion surprises. Use `==` only when you explicitly want coercion (rare).

**`Object.is()`** — Same-value equality (like `===` but handles edge cases):
```js
Object.is(NaN, NaN)       // true ✅ (different from ===)
Object.is(0, -0)          // false ✅ (different from ===)
Object.is("hello", "hello") // true (same as ===)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. What is the difference between `null` and `undefined`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| `undefined` | `null` |
|-------------|--------|
| Variable declared but not assigned | Intentional absence of value |
| Default return value of functions | Explicitly set by developer |
| Property doesn't exist | Often used to reset values |
| Parameter not provided | Used for object absence |
| `typeof undefined` → `"undefined"` | `typeof null` → `"object"` (bug) |

```js
// undefined
let a;
console.log(a);          // undefined
function foo() {}
console.log(foo());      // undefined
const obj = {};
console.log(obj.x);      // undefined

// null
let b = null;            // explicitly empty
const user = getUser();
if (user === null) {     // no user found
  showLogin();
}

// Comparison
null == undefined   // true
null === undefined  // false
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. What is `Symbol` in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Symbol** is a primitive type introduced in ES6, representing a unique, immutable identifier.

```js
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false — always unique, even with same description

// Use as object keys (avoids property collision)
const specialKey = Symbol("secret");
const obj = {
  [specialKey]: "hidden value",
  name: "visible"
};
obj[specialKey];     // "hidden value"
Object.keys(obj);    // ["name"] — symbol keys excluded
JSON.stringify(obj); // '{"name":"visible"}' — symbols excluded

// Well-known symbols (used by JavaScript internally)
Symbol.iterator      // Makes objects iterable
Symbol.toPrimitive   // Controls type coercion
Symbol.hasInstance   // Custom instanceof behavior
Symbol.species       // Controls derived objects

// Global symbol registry (shared across realms)
const globalSym = Symbol.for("app.key");
const sameSym = Symbol.for("app.key");
console.log(globalSym === sameSym); // true
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. What is `BigInt`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**BigInt** is a numeric type that can represent integers of **arbitrary size** (beyond the `Number.MAX_SAFE_INTEGER` limit of 9007199254740991).

```js
// Create BigInt
const big1 = 9007199254740991n;  // n suffix
const big2 = BigInt("9007199254740991123456");

// Operations (with BigInts only)
const sum = big1 + 100n;
const product = big1 * 2n;

// ❌ Cannot mix with regular numbers
big1 + 1;  // TypeError: Cannot mix BigInt and other types

// ✅ Convert first
big1 + BigInt(1);  // okay
Number(big1) + 1;  // okay (may lose precision)

// Operations that work: +, -, *, /, %, **, comparison
// Division truncates toward zero
5n / 2n;  // 2n (not 2.5n)

// Comparison with Number works
1n === 1;   // false (different types)
1n == 1;    // true
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. What are truthy and falsy values in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Falsy values** — evaluate to `false` in a boolean context (only 8):

```js
false, 0, -0, 0n, "", '', ``, null, undefined, NaN
```

**Everything else is truthy**, including:
```js
"0"          // truthy (non-empty string)
"false"      // truthy (non-empty string)
[]           // truthy (empty array)
{}           // truthy (empty object)
-1           // truthy (non-zero number)
Infinity     // truthy
```

```js
if (-1) console.log("truthy");      // ✅ prints
if ([]) console.log("truthy");      // ✅ prints
if ({}) console.log("truthy");      // ✅ prints
if ("") console.log("truthy");      // ❌ falsy
if (null) console.log("truthy");    // ❌ falsy
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. How do `===`, `==`, and `Object.is()` differ?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Comparison | `===` | `==` | `Object.is()` |
|-----------|-------|------|---------------|
| `"1" === 1` | `false` | `true` | `false` |
| `NaN === NaN` | `false` | `false` | `true` |
| `0 === -0` | `true` | `true` | `false` |
| `null === undefined` | `false` | `true` | `false` |
| Coercion | No | Yes | No |

```js
// Object.is() — SameValueZero algorithm
Object.is(NaN, NaN)   // true
Object.is(0, -0)      // false
Object.is("hello", "hello") // true
```

**Use cases:**
- Prefer `===` for 99% of comparisons
- Use `==` only when you want coercion (`x == null` checks both `null` and `undefined`)
- Use `Object.is()` when you need to distinguish `NaN` or `-0`

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. What is Optional Chaining (`?.`)?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Optional chaining** safely accesses nested properties without throwing if an intermediate reference is `null` or `undefined`.

```js
const user = { profile: { name: "Alice" } };

// Without optional chaining
user.address.city;   // ❌ TypeError: Cannot read properties of undefined

// With optional chaining
user?.address?.city;  // undefined ✅ — no error

// With methods
const result = obj?.method?.();  // undefined if method doesn't exist

// With arrays
const first = arr?.[0];  // undefined if arr is null/undefined

// Dynamic properties
const key = "name";
const value = user?.[key];

// ✅ Use with nullish coalescing for defaults
const city = user?.address?.city ?? "Unknown";
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What is the Nullish Coalescing Operator (`??`)?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`??` returns the right side **only** when the left side is `null` or `undefined` (not other falsy values).

```js
// ?? vs ||
null ?? "default"      // "default"
undefined ?? "default" // "default"
0 ?? "default"         // 0  (0 is NOT null/undefined)
"" ?? "default"        // "" ("" is NOT null/undefined)
false ?? "default"     // false

// || triggers on ANY falsy value
0 || "default"         // "default"  (0 is falsy)
"" || "default"        // "default"  ("" is falsy)
false || "default"     // "default"

// Use ?? for: setting defaults for potentially null/undefined values
const config = {
  timeout: serverTimeout ?? 5000,  // use 5000 only if serverTimeout is null/undefined
  retries: 0 ?? 3,                 // 0 — 0 is a valid value!
};

// Cannot combine with && or || without parentheses
null || undefined ?? "foo";   // ❌ SyntaxError
(null || undefined) ?? "foo"; // ✅ "foo"
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. What are the Spread (`...`) and Rest (`...`) operators?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Both use the same `...` syntax but serve different purposes:

**Spread — expands elements (used in function calls, arrays, objects):**
```js
// Array
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];   // [1, 2, 3, 4, 5]
const copy = [...arr1];          // shallow copy

// Object
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Function call
const nums = [1, 2, 3];
Math.max(...nums);  // 3
```

**Rest — collects remaining elements (used in destructuring, function params):**
```js
// Function parameters
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10

// Destructuring
const [head, ...tail] = [1, 2, 3, 4];
// head = 1, tail = [2, 3, 4]

const { name, ...rest } = { name: "Alice", age: 30, city: "NYC" };
// name = "Alice", rest = { age: 30, city: "NYC" }
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. What is the Ternary Operator?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **ternary operator** (`? :`) is a shorthand for `if...else` that returns a value.

```js
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
// "Adult"

// Can be chained (use sparingly)
const score = 85;
const grade = score >= 90 ? "A"
            : score >= 75 ? "B"
            : score >= 60 ? "C"
            : "F";
// "B"

// Use when: returning a value based on a condition
// Avoid when: doing complex side effects
const canVote = isCitizen && age >= 18 ? "Yes" : "No";
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. What are Logical Operators and short-circuit evaluation?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`&&` (AND)** — returns first falsy value or last truthy:
```js
false && "hello"   // false
0 && "hello"       // 0
true && "hello"    // "hello" (last truthy)
true && true       // true
```

**`||` (OR)** — returns first truthy value or last falsy:
```js
false || "hello"   // "hello" (first truthy)
0 || "hello"       // "hello"
true || "hello"    // true (first truthy)
false || 0         // 0 (last falsy)
```

**`??` (Nullish Coalescing)** — returns right side only for null/undefined:
```js
null ?? "default"   // "default"
0 ?? "default"      // 0 (not null/undefined)
```

**Short-circuit evaluation** means the right side is NOT evaluated if the left side determines the result:

```js
// API call only happens if user is defined
user && fetchUserData(user.id);

// Default only if value is null/undefined
const name = input ?? "Guest";

// Conditional execution
isValid && saveData();  // saveData() only runs if isValid is true
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. What is the difference between a function declaration and a function expression?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | Function Declaration | Function Expression |
|--------|---------------------|-------------------|
| **Hoisting** | Fully hoisted | Not hoisted (var) / TDZ (let/const) |
| **Syntax** | `function name() {}` | `const name = function() {}` |
| **Name** | Required | Optional (anonymous or named) |
| **When to use** | Named utilities | Callbacks, conditional assignment |

```js
// Declaration — hoisted
greet(); // ✅ "Hello!"
function greet() { console.log("Hello!"); }

// Expression — NOT hoisted
sayHi(); // ❌ TypeError (sayHi is undefined — var hoisting)
var sayHi = function() { console.log("Hi!"); };

// Named function expression
const factorial = function calc(n) {
  return n <= 1 ? 1 : n * calc(n - 1);  // calc() is visible inside
};
// calc is NOT accessible outside
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q31. What are Arrow Functions and how do they differ from regular functions?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Arrow functions** (`=>`) are a compact function syntax introduced in ES6.

```js
// Regular function
function add(a, b) { return a + b; }

// Arrow function
const add = (a, b) => a + b;
const square = x => x * x;     // Single param — no parentheses
const empty = () => {};        // No params — parentheses required
const returning = () => ({     // Return object literal
  name: "Alice"
});
```

**Key differences from regular functions:**

| Feature | Regular | Arrow |
|---------|---------|-------|
| **`this`** | Dynamic (caller-dependent) | Lexical (inherits from surrounding scope) |
| **`arguments`** | Has `arguments` object | No `arguments` (use rest params) |
| **Constructor** | Can use `new` | Cannot be used with `new` |
| **`prototype`** | Has `.prototype` property | No `.prototype` |
| **Generator** | Can use `function*` | Cannot be generators |

```js
const obj = {
  name: "Alice",
  regular: function() { console.log(this.name); }, // "Alice"
  arrow: () => console.log(this.name)              // undefined (this = outer scope)
};

obj.regular(); // "Alice"
obj.arrow();   // undefined — arrow inherits this from enclosing scope
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q32. What is an IIFE (Immediately Invoked Function Expression)?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

An **IIFE** is a function that runs immediately after being defined.

```js
// Classic IIFE
(function() {
  const private = "I am private";
  console.log(private);
})();

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();

// With parameters
((name) => {
  console.log(`Hello, ${name}!`);
})("World");

// Named IIFE
(function init() {
  console.log("Runs once");
})();
```

**Use cases:**
- **Avoid global scope pollution** (pre-ES6 modules)
- **Create isolated scope** — variables don't leak
- **One-time initialization code**
- **Module pattern** (revealing module pattern)

```js
const counter = (function() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
})();

counter.increment(); // 1
counter.increment(); // 2
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q33. What is a callback function?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **callback** is a function passed as an argument to another function, to be executed later.

```js
// Synchronous callback
function greet(name, callback) {
  console.log(callback(name));
}

greet("Alice", function(name) {
  return `Hello, ${name}!`;
});

// Asynchronous callback
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData(data => console.log(data));
```

**Problems with callbacks:**
- **Callback hell** — deeply nested callbacks become unreadable
- **Inversion of control** — trusting another function with your code
- **Error handling** — errors can be lost

```js
// Callback hell
getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      // Deep nesting continues...
    });
  });
});
```

Promises and async/await were introduced to solve these issues.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q34. What are Higher-Order Functions?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Higher-Order Function** is a function that either:
1. Takes a function as an argument, OR
2. Returns a function, OR
3. Both

```js
// Takes a function as argument
[1, 2, 3].map(n => n * 2);       // map, filter, reduce are HOFs
[1, 2, 3].filter(n => n > 1);
[1, 2, 3].reduce((a, b) => a + b, 0);

// Returns a function
function multiply(factor) {
  return function(value) {
    return value * factor;
  };
}

const double = multiply(2);
const triple = multiply(3);

double(5);  // 10
triple(5);  // 15

// Both — the core of functional programming
function createLogger(prefix) {
  return function(message) {
    console.log(`[${prefix}] ${message}`);
  };
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q35. What are First-Class Functions?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

In JavaScript, functions are **first-class citizens** — they can be:

- **Assigned to variables**: `const fn = function() {};`
- **Passed as arguments**: `[1, 2].map(double);`
- **Returned from functions**: `function makeAdder(x) { return (y) => x + y; }`
- **Stored in data structures**: `const ops = { add: (a, b) => a + b };`

```js
// All demonstrate first-class functions
const greet = (name) => `Hello ${name}`;     // assigned to variable

function callTwice(fn) {                     // passed as argument
  fn(); fn();
}

function createCounter() {                   // returned from function
  let count = 0;
  return () => ++count;
}

const handlers = {                           // stored in object
  success: (data) => console.log(data),
  error: (err) => console.error(err),
};
```

This enables functional programming patterns like currying, composition, and HOFs.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q36. What are template literals and tagged templates?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Template literals** use backticks and support interpolation and multi-line strings:

```js
const name = "Alice";
const age = 30;

// Interpolation
console.log(`My name is ${name} and I am ${age}.`);

// Expressions
console.log(`2 + 2 = ${2 + 2}`); // "2 + 2 = 4"

// Multi-line
const html = `
  <div>
    <h1>${name}</h1>
  </div>
`;
```

**Tagged templates** — call a function with the template:

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? `<mark>${values[i]}</mark>` : ""), ""
  );
}

const name = "Alice", score = 95;
highlight`Player ${name} scored ${score} points!`;
// "Player <mark>Alice</mark> scored <mark>95</mark> points!"

// Used by: styled-components (css``), GraphQL (gql``), SQL libraries
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q37. What is destructuring in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Destructuring** unpacks values from arrays or properties from objects into distinct variables.

```js
// Array destructuring
const [a, b, c] = [1, 2, 3];
const [first, , third] = [10, 20, 30]; // skip: first=10, third=30
const [head, ...tail] = [1, 2, 3, 4];  // rest: head=1, tail=[2,3,4]
const [x = 0, y = 0] = [5];            // default: x=5, y=0

// Swap variables
[a, b] = [b, a];

// Object destructuring
const { name, age } = { name: "Alice", age: 30 };
const { name: userName } = { name: "Bob" };  // rename
const { x = 10 } = { x: 5 };                 // default
const { address: { city } } = { address: { city: "Mumbai" } }; // nested

// Function parameters
function greet({ name, age = 0 }) {
  return `${name} is ${age} years old`;
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q38. What is the difference between `slice()` and `splice()`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| `slice()` | `splice()` |
|-----------|------------|
| Does NOT mutate original | **Mutates** original |
| Returns new array | Returns removed elements |
| `arr.slice(start, end)` | `arr.splice(start, deleteCount, items...)` |

```js
const arr = [1, 2, 3, 4, 5];

// slice — non-mutating
const sliced = arr.slice(1, 3);   // [2, 3]
const fromEnd = arr.slice(-2);    // [4, 5]
const copy = arr.slice();         // shallow copy
// arr is still [1, 2, 3, 4, 5]

// splice — MUTATING
const removed = arr.splice(1, 2);  // removes 2 elements at index 1 → [2, 3]
// arr is now [1, 4, 5]

arr.splice(1, 0, 10, 20);          // insert at index 1
// arr is now [1, 10, 20, 4, 5]

arr.splice(2, 1, 99);             // replace
// arr is now [1, 10, 99, 4, 5]

// ES2023: non-mutating alternatives
arr.toSpliced(1, 2);              // [1, 4, 5] — original unchanged!
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q39. What are the common Array methods and their uses?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Transformation (return new array):**
```js
[1,2,3].map(n => n * 2);       // [2,4,6] — transform each element
[1,2,3].filter(n => n > 1);    // [2,3] — keep matching
[1,2,3].flat();                 // flatten nested
[1,2,3].flatMap(n => [n, n]);  // map + flat
[3,1,2].toSorted();             // [1,2,3] — ES2023, non-mutating
[1,2,3].toReversed();           // [3,2,1] — ES2023, non-mutating
```

**Search:**
```js
[1,2,3].find(n => n > 1);       // 2 — first match
[1,2,3].findIndex(n => n > 1);  // 1 — first match index
[1,2,3].findLast(n => n > 1);   // 3 — ES2023, last match
[1,2,3].some(n => n > 2);       // true — any match?
[1,2,3].every(n => n > 0);      // true — all match?
[1,2,3].includes(2);            // true
[1,2,3].indexOf(2);             // 1
```

**Reduce (single value):**
```js
[1,2,3].reduce((acc, n) => acc + n, 0);  // 6
[1,2,3].reduceRight((acc, n) => acc + n, 0);  // right-to-left
```

**Add/Remove (mutating):**
```js
push(4), pop(), unshift(0), shift(), splice(1,1), sort(), reverse(), fill(0)
```

**Static:**
```js
Array.from("123");               // ["1","2","3"]
Array.from({length:3}, (_,i)=>i); // [0,1,2]
Array.of(1, 2, 3);              // [1,2,3] — like new Array but without the length quirk
Array.isArray([]);              // true
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q40. What are `map()`, `filter()`, and `reduce()`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
const nums = [1, 2, 3, 4, 5];

// map — transform EVERY element, output length = input length
const doubled = nums.map(n => n * 2);     // [2, 4, 6, 8, 10]

// filter — KEEP elements matching condition, output length ≤ input length
const evens = nums.filter(n => n % 2 === 0);  // [2, 4]

// reduce — accumulate to SINGLE value
const sum = nums.reduce((acc, n) => acc + n, 0);   // 15 — with initial value
const product = nums.reduce((acc, n) => acc * n);   // 120 — without init (first element as acc)

// Chaining
const result = nums
  .filter(n => n % 2 === 0)   // [2, 4]
  .map(n => n * 10)           // [20, 40]
  .reduce((a, b) => a + b);   // 60
```

**When to use each:**
- `map()` — need to transform data
- `filter()` — need to subset data
- `reduce()` — need to aggregate/accumulate data

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q41. What is the difference between `forEach()` and `map()`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| `forEach()` | `map()` |
|-------------|---------|
| Returns `undefined` | Returns a **new array** |
| For side effects (logging, mutating) | For transforming data |
| Not chainable | Chainable with other array methods |
| Cannot break early (use `for...of` for that) | Same — always processes all elements |

```js
const nums = [1, 2, 3];

// forEach — side effects
nums.forEach(n => console.log(n)); // logs 1, 2, 3
// returns undefined

// map — transformation
const doubled = nums.map(n => n * 2); // [2, 4, 6]
// returns new array

// Chaining works with map, not forEach
nums
  .map(n => n * 2)
  .filter(n => n > 3)
  .forEach(n => console.log(n)); // 4, 6
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q42. What are common String methods?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
const str = "  Hello, World!  ";

str.trim();                // "Hello, World!"
str.trimStart();           // "Hello, World!  "
str.trimEnd();             // "  Hello, World!"
str.toLowerCase();         // "  hello, world!  "
str.toUpperCase();         // "  HELLO, WORLD!  "

str.includes("World");     // true
str.startsWith("Hello");   // false (spaces)
str.endsWith("!");         // false (spaces)

str.indexOf("o");          // 4
str.lastIndexOf("o");      // 9
str.search(/world/i);      // 8 (regex)

str.slice(2, 7);           // "Hello"
str.substring(2, 7);       // "Hello"
str.substr(2, 5);          // "Hello" (deprecated)

str.replace("World", "JS");      // "  Hello, JS!  " — first match
str.replaceAll("l", "L");         // "  HeLLo, WorLd!  " — all matches
str.replace(/world/i, "JS");      // case-insensitive regex

str.split(", ");                 // ["  Hello", "World!  "]
str.concat(" How are you?");     // "  Hello, World!  How are you?"
str.repeat(2);                   // "  Hello, World!   Hello, World!  "
str.padStart(20, "*");           // "***  Hello, World!  " (to length 20)
str.padEnd(20, "*");             // "  Hello, World!  ***"
str.charAt(2);                   // "H"
str.at(-1);                      // " " (ES2022, supports negative)

"abc123".match(/\d+/);           // ["123"]
"abc123".matchAll(/\d/g);        // iterator of all matches
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q43. What are `Object.keys()`, `Object.values()`, and `Object.entries()`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);     // ["a", "b", "c"]
Object.values(obj);   // [1, 2, 3]
Object.entries(obj);  // [["a", 1], ["b", 2], ["c", 3]]

// Iterate object
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}

// Convert back from entries
Object.fromEntries([["a", 1], ["b", 2]]);  // { a: 1, b: 2 }

// Combine with array methods
Object.entries(obj)
  .filter(([_, v]) => v > 1)
  .map(([k, v]) => ({ [k]: v }));
// [{ b: 2 }, { c: 3 }]
```

**Note:** Only returns **own enumerable** properties (not inherited, not symbols).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q44. What is `JSON.stringify()` and `JSON.parse()`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
const obj = { name: "Alice", age: 30, active: true, scores: [1, 2] };

// Object → JSON string
const json = JSON.stringify(obj);
// '{"name":"Alice","age":30,"active":true,"scores":[1,2]}'

// Pretty-print
JSON.stringify(obj, null, 2);
// {
//   "name": "Alice",
//   "age": 30,
//   "active": true,
//   "scores": [1, 2]
// }

// With replacer (filter/transform)
JSON.stringify(obj, ["name", "age"]);  // only "name" and "age"
JSON.stringify(obj, (key, val) => typeof val === "number" ? val * 2 : val);

// JSON string → Object
const parsed = JSON.parse(json);
// { name: "Alice", age: 30, active: true, scores: [1, 2] }

// With reviver (transform values)
JSON.parse(json, (key, val) => typeof val === "number" ? val * 2 : val);

// Limitations — what gets dropped:
JSON.stringify({ a: undefined, b: function() {}, c: Symbol() });
// '{}' — functions, undefined, symbols are OMITTED

JSON.stringify({ a: NaN, b: Infinity });
// '{"a":null,"b":null}' — NaN, Infinity become null

JSON.stringify(new Date());
// '"2024-01-15T..."' — Date becomes string (no automatic parse back)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q45. What is `string` immutability in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Strings are immutable** — once created, they cannot be changed. Any string "modification" creates a **new string**.

```js
let str = "Hello";
str[0] = "J";          // ❌ silently fails (no effect)
console.log(str);      // "Hello" — unchanged!

str.toUpperCase();     // Returns "HELLO" — new string
console.log(str);      // "Hello" — original unchanged!

str = str.toUpperCase(); // Must reassign to update
console.log(str);      // "HELLO"

// All string methods return new strings:
const s = "  hello  ";
const trimmed = s.trim();    // new string
const upper = trimmed.toUpperCase();  // new string
// s is still "  hello  "

// Performance: string concatenation in loops creates many objects
let result = "";
for (let i = 0; i < 1000; i++) {
  result += i;  // Creates new string each iteration
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q46. What is `Object.assign()`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`Object.assign()` copies **own enumerable** properties from source objects to a target object (shallow copy).

```js
// Merge
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
// target → { a: 1, b: 2, c: 3 }

// Clone
const clone = Object.assign({}, target);

// Merge multiple
const merged = Object.assign({}, obj1, obj2, obj3);

// Later properties overwrite earlier ones
Object.assign({ a: 1 }, { a: 2, b: 3 }, { b: 4 });
// { a: 2, b: 4 }

// ⚠️ SHALLOW COPY only!
const original = { a: { x: 1 } };
const copy = Object.assign({}, original);
copy.a.x = 99;
console.log(original.a.x); // 99 — nested reference is shared!

// ⚠️ Getters/setters are NOT preserved
const obj = { get name() { return "Alice"; } };
Object.assign({}, obj); // { name: "Alice" } — getter becomes value
```

**Modern alternatives:** spread operator `{ ...obj1, ...obj2 }` (also shallow).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q47. What is `this` in JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`this` refers to the **execution context** of a function — determined by **how** the function is called, not where it's defined.

**4 binding rules:**

```js
// 1. Default binding — global object (or undefined in strict mode)
function show() { console.log(this); }
show(); // Window (browser) or undefined (strict)

// 2. Implicit binding — object before the dot
const obj = { name: "Alice", greet() { console.log(this.name); } };
obj.greet(); // "Alice"

// 3. Explicit binding — call/apply/bind
function greet() { console.log(`Hello, ${this.name}`); }
greet.call({ name: "Bob" });   // "Hello, Bob"
greet.apply({ name: "Bob" });  // "Hello, Bob"

// 4. new binding — creates new object as this
function Person(name) { this.name = name; }
new Person("Alice");  // this → new instance

// Arrow functions: ignore all 4 rules — use lexical this
const obj2 = {
  name: "Oops",
  greet: () => console.log(this.name)  // undefined — this is from outer scope
};

// Priority: new > explicit > implicit > default
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q48. What is `setTimeout` and `setInterval`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
// setTimeout — runs ONCE after delay
const timerId = setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);
clearTimeout(timerId);  // cancel

// setInterval — runs REPEATEDLY
const intervalId = setInterval(() => {
  console.log("Every 1 second");
}, 1000);
clearInterval(intervalId);  // stop

// Important: timer delays are MINIMUM delays, not guaranteed
setTimeout(() => console.log("Delayed"), 0);
// Will run AFTER current synchronous code and microtasks complete
```

**Execution order with event loop:**
```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1 → 4 → 3 → 2
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q49. What is `try/catch/finally`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
try {
  // Code that might throw
  const result = JSON.parse("invalid json");
} catch (error) {
  // Handle the error
  console.error("Error:", error.message);
} finally {
  // Always runs (whether error or not)
  console.log("Cleanup");
}

// Throw custom errors
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

try {
  divide(10, 0);
} catch (e) {
  console.log(e.name);    // "Error"
  console.log(e.message); // "Division by zero"
  console.log(e.stack);   // Stack trace
}

// Multiple error types
try {
  // some code
} catch (e) {
  if (e instanceof TypeError) { /* ... */ }
  else if (e instanceof RangeError) { /* ... */ }
  else throw e;  // re-throw
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q50. What is the difference between `for...of` and `for...in`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| `for...of` | `for...in` |
|------------|------------|
| Iterates **values** | Iterates **keys** (indices) |
| Works with iterables (Array, String, Map, Set, etc.) | Works with enumerable properties (Objects) |
| ES6+ | ES1 (legacy) |
| Does NOT iterate inherited properties | Iterates inherited enumerable properties |

```js
// for...of — values of iterables
const arr = [10, 20, 30];
for (const val of arr) {
  console.log(val); // 10, 20, 30
}

for (const char of "hello") {
  console.log(char); // "h", "e", "l", "l", "o"
}

// for...in — keys of objects (strings)
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key); // "a", "b", "c"
}

// ⚠️ Don't use for...in on arrays — it iterates INDICES as strings
Array.prototype.custom = "bad";
const nums = [1, 2, 3];
for (const i in nums) {
  console.log(i); // "0", "1", "2", "custom" — includes prototype!
}
```

</div>
</details>

---

## 🟡 Medium (Q51–Q110)

<details class="qa-card qa-medium">
<summary>
Q51. How does the JavaScript Event Loop work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Event Loop** is JavaScript's mechanism for handling asynchronous operations despite being single-threaded.

**Components:**
1. **Call Stack** — Executes synchronous code (LIFO)
2. **Microtask Queue** — Promises `.then/catch/finally`, `queueMicrotask`, `MutationObserver` (higher priority)
3. **Macrotask Queue** — `setTimeout`, `setInterval`, `setImmediate`, I/O, UI rendering

**Execution order:**
```
1. Execute all synchronous code (Call Stack)
2. Process ALL microtasks (until empty)
3. Process ONE macrotask
4. Render UI (if needed)
5. Repeat from step 2
```

```js
console.log("1");                                 // sync

setTimeout(() => console.log("2"), 0);            // macrotask

Promise.resolve()
  .then(() => {
    console.log("3");                              // microtask
    setTimeout(() => console.log("4"), 0);         // macrotask (scheduled from microtask)
  })
  .then(() => console.log("5"));                   // microtask (chained)

queueMicrotask(() => console.log("6"));            // microtask

console.log("7");                                  // sync

// Output: 1 → 7 → 3 → 6 → 5 → 2 → 4
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. What are Promises in JavaScript?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **Promise** represents the eventual result of an asynchronous operation. It has three states:

- **`pending`** — Initial state
- **`fulfilled`** — Operation completed successfully (`.then()` runs)
- **`rejected`** — Operation failed (`.catch()` runs)

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5
      ? resolve("Success!")
      : reject(new Error("Failed"));
  }, 1000);
});

promise
  .then(result => console.log(result))   // "Success!"
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));   // always runs
```

**Promise lifecycle:**
```
pending → fulfilled (resolve called)   → .then() runs
pending → rejected  (reject called)    → .catch() runs
Both paths → .finally() runs
```

**Important:** Promises are **eager** — the executor runs immediately when created. `.then()/.catch()` are asynchronous (microtasks).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. How does Promise chaining work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Each `.then()` returns a **new Promise**, allowing chaining. The next `.then()` receives the return value of the previous one.

```js
fetch("/api/user")
  .then(response => {
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();              // Returns a Promise
  })
  .then(user => {
    console.log(user.name);              // Gets parsed JSON
    return fetch(`/api/posts/${user.id}`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log(posts);                  // Posts data
    return posts[0];
  })
  .catch(error => {
    console.error("Any error in chain:", error);  // Catches ANY rejection in chain
  })
  .finally(() => {
    hideSpinner();                       // Always runs
  });
```

**Key rules:**
- `.then()` returns a new Promise (enables chaining)
- Return a value → next `.then()` receives it
- Return a Promise → next `.then()` waits for it
- Throw/return rejected Promise → skips to next `.catch()`
- Errors propagate down the chain until caught

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. What are `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject("error");

// Promise.all — ALL must resolve, or fails fast
Promise.all([p1, p2]).then(v => console.log(v));   // [1, 2] ✅
Promise.all([p1, p3]).catch(e => console.log(e));  // "error" — fail fast

// Promise.allSettled — waits for ALL, never rejects
Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(r => {
    if (r.status === "fulfilled") console.log(r.value);
    if (r.status === "rejected") console.log(r.reason);
  });
});

// Promise.race — first to SETTLE (resolve or reject) wins
Promise.race([p1, p3]).then(v => console.log(v));  // 1 (fastest)

// Promise.any — first to RESOLVE wins (ignores rejections)
// All reject → AggregateError
Promise.any([p3, p1]).then(v => console.log(v));   // 1
Promise.any([Promise.reject("a"), Promise.reject("b")])
  .catch(e => console.log(e.errors));  // ["a", "b"]
```

| Method | Wait for | Rejects? | Returns |
|--------|---------|----------|---------|
| `all` | All | First rejection | Array of values |
| `allSettled` | All | Never | Array of `{status, value/reason}` |
| `race` | First settled | If first is rejection | Single value |
| `any` | First resolved | If all reject | Single value |

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What is `async/await`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`async/await` (ES2017) is **syntactic sugar** over Promises, making async code read like synchronous code.

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("HTTP " + response.status);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error; // re-throw if caller needs to handle
  }
}

// Calling an async function
const user = await fetchUser(1);

// Parallel execution
async function loadDashboard() {
  const [users, posts, stats] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchStats()
  ]);
  return { users, posts, stats };
}

// Sequential (when order matters)
async function processItems(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item); // waits for each
    results.push(result);
  }
  return results;
}
```

**Key points:**
- `async` function always returns a Promise
- `await` pauses execution until the Promise settles
- `await` can only be used inside `async` (except top-level await in modules)
- Error handling: use `try/catch` instead of `.catch()`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. How does `async/await` work under the hood?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`async/await` is essentially a **generator + Promises** pattern.

```js
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

// Under the hood, V8 transforms it into a state machine:
// 1. Creates a Promise wrapper
// 2. Runs synchronously until first `await`
// 3. Suspends execution, returns to event loop
// 4. When awaited Promise resolves, schedules resumption as microtask
// 5. Repeats until function returns
// 6. Resolves the wrapper Promise with the return value

async function demo() {
  console.log("A");          // sync
  await Promise.resolve();   // suspends here
  console.log("B");          // runs as microtask
}
console.log("before");
demo();
console.log("after");
// Output: before → A → after → B
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. What is Callback Hell and how does it relate to Promises?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Callback hell** (also called "Pyramid of Doom") occurs when callbacks are nested deeply, making code hard to read and maintain.

```js
// ❌ Callback Hell
getUser(1, (err, user) => {
  if (err) handleError(err);
  else {
    getPosts(user.id, (err, posts) => {
      if (err) handleError(err);
      else {
        getComments(posts[0].id, (err, comments) => {
          if (err) handleError(err);
          else {
            render(comments);
          }
        });
      }
    });
  }
});
```

**✅ With Promises — flat chain:**
```js
getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => render(comments))
  .catch(handleError);
```

**✅ With async/await — reads top-to-bottom:**
```js
try {
  const user = await getUser(1);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  render(comments);
} catch (err) {
  handleError(err);
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. What is the Microtask Queue and how does it differ from the Macrotask Queue?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Microtasks:** Higher priority. Processed immediately after the current synchronous code, before any macrotask.
- `Promise.then/catch/finally`
- `queueMicrotask()`
- `MutationObserver`
- `process.nextTick()` (Node.js)

**Macrotasks:** Lower priority. One task per event loop iteration.
- `setTimeout`, `setInterval`, `setImmediate`
- I/O callbacks
- UI rendering
- Event handlers (click, keydown, etc.)

**Event Loop Cycle:**
```
1. Execute all synchronous code
2. Clear the ENTIRE microtask queue (add new microtasks too!)
3. Process ONE macrotask
4. Render UI (if needed)
5. Go to step 2
```

```js
console.log("1");                                    // sync
setTimeout(() => console.log("2"), 0);               // macrotask
Promise.resolve().then(() => {
  console.log("3");                                  // microtask
  queueMicrotask(() => console.log("4"));            // microtask (added during microtask phase)
});
console.log("5");                                    // sync
// Output: 1 → 5 → 3 → 4 → 2
```

**Key insight:** Microtasks can starve macrotasks if they keep adding more microtasks.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. What is Closure? Provide real-world examples.
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **Closure** is a function that "remembers" its lexical scope even when the function executes outside that scope.

```js
function createCounter() {
  let count = 0;                         // "closed over" variable
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1 — count persists in closure
counter(); // 2
counter(); // 3
```

**Real-world use cases:**

1. **Data privacy / Encapsulation:**
```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit: (amount) => { balance += amount; },
    withdraw: (amount) => {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
    },
    getBalance: () => balance
  };
}
const acc = createBankAccount(100);
acc.deposit(50);
acc.getBalance(); // 150
// acc.balance → undefined (private!)
```

2. **Event handlers with captured state:**
```js
function setupButton(buttonId, message) {
  document.getElementById(buttonId)
    .addEventListener("click", () => {
      alert(message);  // closure over message
    });
}
```

3. **Partial application / Currying:**
```js
const multiply = (a) => (b) => a * b;
const double = multiply(2);
double(5); // 10
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. How does lexical scoping work with closures?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Lexical scoping** means inner functions have access to variables from their outer (enclosing) scopes. Closures are the mechanism that makes this work when inner functions outlive their outer function.

```js
function outer() {
  const x = 10;
  
  function inner(y) {
    return x + y;  // inner can access x from outer's scope
  }
  
  return inner;
}

const fn = outer();                // outer() has finished!
console.log(fn(5));               // 15 — still remembers x = 10
```

**Scope chain (lexical nesting):**
```js
const global = "global";

function outer(a) {
  const b = "outer";
  
  function inner(c) {
    const d = "inner";
    // Can access: d, c, b, a, global
    return `${global} > ${a} > ${b} > ${c} > ${d}`;
  }
  
  return inner;
}

// Closure captures: global, a, b
const fn = outer("param");
fn("inner-param");
```

Each function "closes over" its containing scopes by keeping references to the variables it needs.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q61. What are the Module Pattern and Data Hiding with closures?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Module Pattern** uses closures to create private state with a public API.

```js
const UserModule = (function() {
  // Private state (inaccessible outside)
  let users = [];
  let idCounter = 0;
  
  function validateUser(user) {
    return user.name && user.email;
  }
  
  // Public API
  return {
    addUser(user) {
      if (!validateUser(user)) throw new Error("Invalid user");
      const newUser = { ...user, id: ++idCounter };
      users.push(newUser);
      return newUser;
    },
    getUsers() {
      return [...users]; // return copy to prevent mutation
    },
    getUserById(id) {
      return users.find(u => u.id === id);
    },
    deleteUser(id) {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) return false;
      users.splice(index, 1);
      return true;
    }
  };
})();

UserModule.addUser({ name: "Alice", email: "alice@example.com" });
UserModule.getUsers();         // [{ id: 1, name: "Alice", ... }]
// UserModule.users → undefined (private!)
// UserModule.validateUser → undefined (private!)
```

Modern alternative: ES modules with `export`/`import` achieve similar encapsulation.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. What is the Prototype Chain?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Every JavaScript object has a hidden `[[Prototype]]` (accessible via `__proto__` or `Object.getPrototypeOf`). When you access a property, JavaScript walks up the chain until found or `null`.

```js
const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks);  // true (own property)
console.log(dog.eats);   // true (from animal prototype)
console.log(dog.toString); // from Object.prototype
console.log(dog.nonExistent); // undefined (reached end of chain)

// Prototype chain: dog → animal → Object.prototype → null
```

**With constructor functions:**
```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);  // call parent constructor
}
// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const rex = new Dog("Rex");
rex.bark();   // "Rex barks!" (own)
rex.speak();  // "Rex makes a sound" (inherited via prototype chain)
```

**Chain:** `rex → Dog.prototype → Animal.prototype → Object.prototype → null`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. What is `__proto__` vs `prototype`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| `__proto__` | `prototype` |
|-------------|-------------|
| Property on **instances** | Property on **constructor functions** |
| Points to the object's prototype | Object shared by all instances created with `new` |
| `obj.__proto__` | `Constructor.prototype` |
| `Object.getPrototypeOf(obj)` (modern) | Inherited property lookup uses it |
| Every object has it | Only functions have it |

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  return `Hello, I'm ${this.name}`;
};

const alice = new Person("Alice");

// __proto__ — instance's prototype reference
alice.__proto__ === Person.prototype;         // true
alice.__proto__ === Object.getPrototypeOf(alice);  // true

// prototype — on the constructor itself
Person.prototype === alice.__proto__;         // true

// Chain
alice.__proto__ === Person.prototype;                          // true
Person.prototype.__proto__ === Object.prototype;              // true
Object.prototype.__proto__ === null;                           // true

// Modern approach: use Object.getPrototypeOf() / Object.setPrototypeOf()
// __proto__ is deprecated but widely supported
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. What are ES6 Classes and how do they relate to prototypes?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

ES6 `class` is **syntactic sugar** over JavaScript's existing prototype-based inheritance.

```js
class Animal {
  #privateField = "private";  // Private field (ES2022)
  
  constructor(name) {
    this.name = name;          // instance property
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
  
  static create(name) {       // static method (on class, not instances)
    return new Animal(name);
  }
  
  get info() { return this.name; }  // getter
  set info(val) { this.name = val; }  // setter
}

class Dog extends Animal {
  constructor(name) {
    super(name);  // must call super() before using this
  }
  
  speak() {  // Override
    return `${this.name} barks!`;
  }
  
  fetch() {
    return `${this.name} fetches the ball!`;
  }
}
```

**What classes actually ARE (prototype-based):**
```js
console.log(typeof Animal);  // "function" — class is a function
console.log(Animal.prototype.speak);  // method is on prototype
// Dog.prototype → Animal.prototype → Object.prototype
```

**Difference from class-based languages:**
- JavaScript classes are still prototype-based under the hood
- Methods are on `.prototype`, not copied to each instance
- `class` syntax makes inheritance cleaner but doesn't change the mechanism

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. How does inheritance work in JavaScript?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

JavaScript inheritance is **prototypal** — objects inherit from other objects (not classes like Java/C++).

**Prototypal inheritance patterns:**

```js
// 1. Object.create() — simplest
const animal = {
  speak() { return `${this.name} makes a sound`; },
  eat() { return `${this.name} eats`; }
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.bark = function() { return `${this.name} barks`; };
dog.speak(); // "Rex makes a sound" (inherited)
dog.bark();  // "Rex barks" (own)

// 2. Constructor function
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return `${this.name} speaks`; };

function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() { return `${this.name} barks`; };

// 3. ES6 class (syntactic sugar over #2)
class Animal { constructor(name) { this.name = name; } speak() { /* ... */ } }
class Dog extends Animal { bark() { /* ... */ } }
```

**Inheritance chain with ES6 classes:**
```js
const rex = new Dog("Rex");
// rex → Dog.prototype → Animal.prototype → Object.prototype → null
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true
console.log(rex instanceof Object); // true
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. What is `Object.create()` and how is it different from `new`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`Object.create(proto)` creates a new object with its prototype set to the given object. It does NOT call a constructor.

```js
const animal = { speak() { return "Hello"; } };

// Object.create — sets prototype, no constructor call
const obj1 = Object.create(animal);
obj1.name = "Rex";
obj1.speak(); // "Hello" (inherited)

// new Constructor — calls constructor, sets prototype
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return "Hello"; };
const obj2 = new Animal("Rex");

// Difference
const pure = Object.create(null);  // No prototype chain at all!
pure.toString; // undefined — no Object.prototype
pure + "";     // TypeError: Cannot convert to primitive

// Object.create polyfill (simplified)
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```

**When to use `Object.create`:**
- Simple prototypal inheritance (without constructors)
- Creating "pure" dictionary objects: `Object.create(null)`
- Implementing class inheritance manually

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. How does `call()`, `apply()`, and `bind()` work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

All three explicitly set `this`, but differ in invocation timing and argument passing:

```js
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Alice" };

// call — invokes immediately, args comma-separated
greet.call(user, "Hello", "!");     // "Hello, Alice!"

// apply — invokes immediately, args as array
greet.apply(user, ["Hello", "!"]);  // "Hello, Alice!"

// bind — returns NEW function (does NOT invoke)
const bound = greet.bind(user, "Hello");
bound("!");          // "Hello, Alice!"
bound("?");          // "Hello, Alice?"

// Practical uses:
// 1. Method borrowing
const arr = [1, 2, 3];
[].push.call(arr, 4);  // arr → [1, 2, 3, 4]
[].slice.call(arguments);  // convert arguments to array

// 2. Function currying with bind
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);
double(5);  // 10

// 3. setTimeout with this
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    setInterval(this.tick.bind(this), 1000); // bind preserves this
  }
  tick() { this.seconds++; }
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. What is event bubbling and event capturing?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

When an event fires on an element, it goes through three phases:

1. **Capturing phase** — Event travels from `window` down to the target
2. **Target phase** — Event reaches the target element
3. **Bubbling phase** — Event travels back up from target to `window`

```html
<div id="parent">
  <button id="child">Click</button>
</div>
```

```js
// Bubbling (default: useCapture = false)
// Event bubbles UP: child → parent → document → window
document.getElementById("parent").addEventListener("click",
  () => console.log("parent (bubble)")
);
document.getElementById("child").addEventListener("click",
  (e) => console.log("child (bubble)")
);
// Click button → "child (bubble)" → "parent (bubble)"

// Capturing (useCapture = true)
// Event goes DOWN: window → document → parent → child
document.getElementById("parent").addEventListener("click",
  () => console.log("parent (capture)"),
  true  // capture phase
);
document.getElementById("child").addEventListener("click",
  () => console.log("child (capture)"),
  true
);
// Click button → "parent (capture)" → "child (capture)"

// Stop propagation
e.stopPropagation();           // stops bubbling
e.stopImmediatePropagation();  // stops ALL listeners on current element too

// Prevent default action
e.preventDefault();  // e.g., prevent link navigation
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. What is Event Delegation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Event delegation** is attaching a single event listener to a parent to handle events from multiple children, including dynamically added ones.

```js
// ❌ Inefficient: one listener per element
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", handleClick);
});
// New li elements added later WON'T have listeners!

// ✅ Efficient: single listener on parent
document.querySelector("ul").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) {
    console.log("Clicked:", li.dataset.id, li.textContent);
  }
});
// Works for ALL li elements — current + future!

// More robust version
document.querySelector("#list").addEventListener("click", (e) => {
  const target = e.target;
  
  if (target.matches("li.item")) {
    handleItemClick(target);
  } else if (target.matches("button.delete")) {
    handleDelete(target);
  } else if (target.matches("button.edit")) {
    handleEdit(target);
  }
});
```

**Benefits:**
- Memory efficient: one listener vs N listeners
- Handles dynamically added elements automatically
- Simpler code for managing many elements

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. What are `debounce` and `throttle`? Implement them.
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Debounce** — Executes after a period of inactivity. Like an elevator: waits while doors open.

```js
function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: search input, window resize
const handleSearch = debounce((e) => {
  fetchResults(e.target.value);
}, 300);
input.addEventListener("input", handleSearch);
```

**Throttle** — Executes at most once per interval. Like a bus: leaves every 15 min regardless.

```js
function throttle(fn, limit = 300) {
  let inThrottle = false;
  let lastArgs;
  
  return function(...args) {
    if (inThrottle) {
      lastArgs = args;  // remember last call
      return;
    }
    fn.apply(this, args);
    inThrottle = true;
    setTimeout(() => {
      inThrottle = false;
      if (lastArgs) {
        fn.apply(this, lastArgs);
        lastArgs = null;
      }
    }, limit);
  };
}

// Usage: scroll, mousemove, resize
const handleScroll = throttle(() => {
  updatePosition();
}, 100);
window.addEventListener("scroll", handleScroll);
```

**Key difference:**
- Debounce: waits for a pause (like search as you type)
- Throttle: ensures regular execution (like scroll position tracking)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q71. What is memoization and how do you implement it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Memoization** caches function results based on arguments to avoid redundant computation.

```js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Cache hit:", key);
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fastFib = memoize((n) => {
  if (n <= 1) return n;
  return fastFib(n - 1) + fastFib(n - 2);
});

fastFib(40); // Fast — O(n) instead of O(2^n)
```

**When to memoize:**
- Pure functions (same input → same output)
- Expensive computations (data transformation, complex math)
- Frequently called with same arguments

**When NOT to memoize:**
- Impure functions (random, date, API calls)
- Functions called once or with unique args
- Side-effect-heavy functions

**React's built-in memoization:**
```js
const value = useMemo(() => expensive(a, b), [a, b]);
const fn = useCallback(() => doSomething(a), [a]);
const MemoizedComp = React.memo(Component);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q72. What is currying and partial application?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Currying** transforms a function with multiple arguments into a sequence of single-argument functions.

```js
// Normal function
const add = (a, b, c) => a + b + c;

// Curried version
const curriedAdd = (a) => (b) => (c) => a + b + c;

curriedAdd(1)(2)(3); // 6

// Generic curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...next) {
      return curried.apply(this, args.concat(next));
    };
  };
}

const curriedSum = curry((a, b, c) => a + b + c);
curriedSum(1)(2)(3);       // 6
curriedSum(1, 2)(3);       // 6
curriedSum(1, 2, 3);       // 6
```

**Partial application** — preset some arguments (not necessarily one at a time):
```js
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);  // partial application
double(5);  // 10

// Practical use: creating specialized functions
const formatPrice = (currency, price) => `${currency}${price.toFixed(2)}`;
const formatUSD = formatPrice.bind(null, "$");
const formatEUR = formatPrice.bind(null, "€");

formatUSD(19.99); // "$19.99"
formatEUR(29.99); // "€29.99"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q73. What is the difference between deep copy and shallow copy?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Shallow copy** — copies only the top-level properties. Nested objects still share references.

**Deep copy** — recursively copies all levels. No shared references.

```js
const original = {
  name: "Alice",
  address: { city: "Mumbai", zip: 400001 },
  hobbies: ["reading", "coding"]
};

// ❌ Shallow copies
const spread = { ...original };
const assign = Object.assign({}, original);

spread.address.city = "Delhi";
console.log(original.address.city); // "Delhi" — MUTATED!

// ✅ Deep copy methods:

// 1. JSON (simple but limited — loses functions, undefined, Date, etc.)
const deep1 = JSON.parse(JSON.stringify(original));

// 2. structuredClone (modern, recommended in browsers/Node 17+)
const deep2 = structuredClone(original);
deep2.address.city = "Pune";
console.log(original.address.city); // "Mumbai" — NOT mutated ✅

// 3. Lodash
// const deep3 = _.cloneDeep(original);

// 4. Custom recursive clone (handles edge cases)
function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Array) return value.map(deepClone);
  const clone = {};
  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key]);
  }
  return clone;
}
```

**What `structuredClone` supports:** Array, ArrayBuffer, Boolean, Date, Error, Map, Number, Object, RegExp, Set, String, TypedArray, Blob, File, ImageData

**What it doesn't:** Functions, DOM nodes, class instances, Symbols, WeakMap/WeakSet

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q74. What is `Object.freeze()` vs `Object.seal()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | `Object.freeze()` | `Object.seal()` |
|---------|-------------------|-----------------|
| Add properties | ❌ | ❌ |
| Delete properties | ❌ | ❌ |
| Modify existing | ❌ | ✅ |
| Configurable | ❌ | ❌ |
| Writable | ❌ | Maintains original |
| Nested objects | ❌ (shallow) | ❌ (shallow) |

```js
const obj = { name: "Alice", age: 30, address: { city: "Mumbai" } };

// Object.freeze — completely immutable (top-level)
const frozen = Object.freeze(obj);
frozen.name = "Bob";        // ❌ silently fails (or TypeError in strict)
frozen.email = "a@b.com";   // ❌ cannot add
delete frozen.age;          // ❌ cannot delete
frozen.address.city = "Delhi"; // ✅ nested objects NOT frozen!

// Object.seal — cannot add/delete, CAN modify
const sealed = Object.seal({ name: "Alice", age: 30 });
sealed.name = "Bob";        // ✅ allowed
sealed.email = "a@b.com";   // ❌ cannot add
delete sealed.age;          // ❌ cannot delete

// Check
Object.isFrozen(frozen);  // true
Object.isSealed(sealed);  // true
Object.isExtensible(obj); // true (for normal objects)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q75. What are Getters and Setters in JavaScript?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Getters** and **Setters** allow defining computed properties that look like regular property access.

```js
// Object literal
const user = {
  firstName: "Alice",
  lastName: "Smith",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  }
};

user.fullName;        // "Alice Smith" (getter)
user.fullName = "Bob Jones";  // setter
user.firstName;       // "Bob"

// Class
class Temperature {
  #celsius = 0;
  
  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }
  
  set fahrenheit(value) {
    this.#celsius = (value - 32) * 5/9;
  }
  
  get celsius() { return this.#celsius; }
  set celsius(value) {
    if (value < -273.15) throw new RangeError("Below absolute zero");
    this.#celsius = value;
  }
}

// Object.defineProperty
Object.defineProperty(obj, "computed", {
  get() { /* ... */ },
  set(val) { /* ... */ },
  enumerable: true,
  configurable: true
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q76. What is `Proxy` in JavaScript?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Proxy** creates a wrapper that intercepts and customizes operations on an object (traps).

```js
const handler = {
  // Property access
  get(target, key) {
    console.log(`GET ${String(key)}`);
    return key in target ? target[key] : `Property "${String(key)}" not found`;
  },
  
  // Property assignment
  set(target, key, value) {
    if (key === "age" && (typeof value !== "number" || value < 0)) {
      throw new TypeError("Age must be a positive number");
    }
    target[key] = value;
    return true; // signal success
  },
  
  // Property deletion
  deleteProperty(target, key) {
    if (key === "protected") throw new Error("Cannot delete protected");
    delete target[key];
    return true;
  },
  
  // Check property existence
  has(target, key) {
    return key in target;
  },
  
  // Function invocation
  apply(target, thisArg, args) {
    console.log(`Called with: ${args}`);
    return target.apply(thisArg, args);
  }
};

const person = new Proxy({ name: "Alice", age: 30 }, handler);
person.name;            // "Alice" (logs GET name)
person.city;            // 'Property "city" not found'
person.age = -5;        // ❌ TypeError
delete person.name;     // ✅ allowed
delete person.protected; // ❌ Error

// Use cases:
// - Validation (Vue 3 uses Proxy for reactivity!)
// - Logging / Debugging
// - Lazy loading / memoization
// - Auto-populating properties (default values)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q77. What is `Reflect` in JavaScript?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Reflect** is a built-in object that provides methods for interceptable JavaScript operations — mirrors all Proxy traps as functions.

```js
const obj = { x: 1, y: 2 };

Reflect.get(obj, "x");                 // 1
Reflect.set(obj, "y", 99);             // true (success)
Reflect.has(obj, "x");                 // true (like "x" in obj)
Reflect.deleteProperty(obj, "x");      // true
Reflect.ownKeys(obj);                  // ["y"]
Reflect.defineProperty(obj, "z", { value: 3 });  // true

// Preferred over old patterns
// Instead of: delete obj.x  →  Reflect.deleteProperty(obj, "x")
// Instead of: "x" in obj    →  Reflect.has(obj, "x")
// Instead of: Object.keys   →  Reflect.ownKeys (includes symbols)

// With Proxy — forward default behavior
const handler = {
  set(target, key, value, receiver) {
    console.log(`Setting ${String(key)} = ${value}`);
    return Reflect.set(target, key, value, receiver); // default behavior
  },
  deleteProperty(target, key) {
    console.log(`Deleting ${String(key)}`);
    return Reflect.deleteProperty(target, key);
  }
};

const proxy = new Proxy(obj, handler);
```

**Why use Reflect?** Correctly handles `this` binding, return types, and receiver propagation with Proxy.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q78. What are Generators (`function*`)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Generators** are functions that can be paused (`yield`) and resumed, maintaining their state.

```js
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite sequence
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2
fib.next().value; // 3
fib.next().value; // 5

// Bidirectional communication
function* quiz() {
  const answer = yield "What is 2+2?";
  if (answer === 4) yield "Correct!";
  else yield "Wrong!";
}

const q = quiz();
q.next();            // { value: "What is 2+2?", done: false }
q.next(4);           // { value: "Correct!", done: false }
```

**Use cases:** Infinite sequences, iterators, async flow control, state machines.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q79. What are Async Generators?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Async Generators** combine `async/await` with generators — yielding Promises and consuming with `for await...of`.

```js
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 100)); // simulate delay
    yield i;
  }
}

// Consume
async function main() {
  for await (const num of asyncRange(1, 5)) {
    console.log(num); // 1, 2, 3, 4, 5 (each 100ms apart)
  }
}

// Real use case: paginated API fetching
async function* paginate(url) {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    
    yield data.items;               // Yield current page
    hasMore = data.hasMore;          // Check for more
    page++;
  }
}

async function loadAll() {
  const results = [];
  for await (const page of paginate("/api/items")) {
    results.push(...page);
  }
  return results;
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q80. What is `Symbol.iterator` and how do you make objects iterable?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

An object is **iterable** if it implements the `Symbol.iterator` method, which returns an iterator (an object with `next()`).

```js
// Built-in iterables: String, Array, Map, Set, arguments, NodeList
for (const char of "hello") { /* ... */ }
for (const num of [1,2,3]) { /* ... */ }

// Making a custom object iterable
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
      
      // Optional: return() is called when loop exits early
      return(value) {
        console.log("Iterator closed early");
        return { value, done: true };
      }
    };
  }
}

const range = new Range(1, 5);
for (const n of range) console.log(n); // 1, 2, 3, 4, 5
[...range]; // [1, 2, 3, 4, 5]
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q81. What is `Map` and how is it different from a plain object?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | Object | Map |
|---------|--------|-----|
| Key type | Strings, Symbols | Any (objects, functions, primitives) |
| Order | Integer keys ordered, insertion order for strings | Insertion order for all keys |
| Size | Manual (`Object.keys(obj).length`) | `map.size` |
| Iteration | `Object.keys/values/entries` | `map.forEach`, `for...of` |
| Performance | Good for few properties | Better for frequent add/delete |
| Inheritance | Inherits prototype keys | No prototype chain issues |
| Serialization | `JSON.stringify` | No built-in serialization |

```js
// Map — keys can be ANY type
const map = new Map();
map.set("name", "Alice");
map.set(42, "a number key");
map.set({}, "an object key");
map.set(() => {}, "a function key");

map.size;                    // 4
map.get("name");             // "Alice"
map.has(42);                 // true
map.delete(42);              // true

// Iteration
map.forEach((value, key) => console.log(key, value));
for (const [key, value] of map) console.log(key, value);
const entries = [...map];    // [["name","Alice"], [42,"number"], ...]

// When to use Map:
// - Need keys other than strings
// - Frequent add/delete operations (Map performs better)
// - Need size property
// - Need insertion order

// When to use Object:
// - JSON serialization needed
// - Need prototype methods
// - Simple key-value storage with string keys
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q82. What is `Set` in JavaScript?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Set** is a collection of **unique** values (no duplicates). Useful for deduplication and membership checks.

```js
const set = new Set([1, 2, 3, 2, 1, 3]);
console.log(set); // Set(3) {1, 2, 3} — duplicates removed

set.add(4);
set.has(3);       // true
set.delete(2);    // true
set.size;         // 3
set.clear();      // remove all

// Iteration
for (const val of set) console.log(val);
set.forEach(val => console.log(val));

// Convert to array
const arr = [...set];        // [1, 2, 3]
const arr2 = Array.from(set); // [1, 2, 3]

// Practical: remove duplicates
const unique = [...new Set([1, 2, 2, 3, 3, 4])]; // [1, 2, 3, 4]

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

const union = new Set([...setA, ...setB]);                    // {1,2,3,4}
const intersection = new Set([...setA].filter(x => setB.has(x))); // {2,3}
const difference = new Set([...setA].filter(x => !setB.has(x)));  // {1}
const symmetricDiff = new Set([
  ...[...setA].filter(x => !setB.has(x)),
  ...[...setB].filter(x => !setA.has(x))
]); // {1,4}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q83. What are `WeakMap` and `WeakSet`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**WeakMap** and **WeakSet** hold "weak" references to objects — they don't prevent garbage collection.

```js
// WeakMap — keys MUST be objects, values can be anything
const wm = new WeakMap();
let user = { id: 1 };
const metadata = { lastLogin: Date.now() };

wm.set(user, metadata);
wm.get(user);   // metadata
wm.has(user);   // true

user = null;    // user object can be GC'd — WeakMap entry automatically removed

// WeakMap methods: get, set, has, delete
// NO: size, forEach, keys, values, entries, clear

// Use case: private data
const _private = new WeakMap();
class Person {
  constructor(name, age) {
    _private.set(this, { age });  // age is truly private
    this.name = name;
  }
  getAge() { return _private.get(this).age; }
}

// WeakSet — only stores objects
const ws = new WeakSet();
let obj = { data: "test" };
ws.add(obj);
ws.has(obj);  // true
obj = null;   // obj GC'd → WeakSet entry removed

// Use case: marking/tracking objects
const processed = new WeakSet();
function processItem(item) {
  if (processed.has(item)) return;  // skip already processed
  processed.add(item);
  // process...
}
```

**Why use WeakMap/WeakSet:** Automatic memory management — no need to manually clean up entries when the key object is no longer needed.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q84. What are ES Modules (ESM) vs CommonJS?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | ES Modules (ESM) | CommonJS (CJS) |
|---------|-----------------|----------------|
| Syntax | `import` / `export` | `require()` / `module.exports` |
| Loading | Asynchronous | Synchronous |
| Resolution | Static (analyzed at parse time) | Dynamic (resolved at runtime) |
| Tree-shaking | ✅ Supported | ❌ Not supported |
| Top-level await | ✅ Supported | ❌ Not supported |
| File extension | `.mjs` or `"type": "module"` | `.cjs` or default |
| Browser | ✅ Native support | ❌ Needs bundler |
| Live bindings | ✅ Export is live binding | ❌ Export is copy of value |

```js
// ESM
// math.mjs
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calculator {}

// main.mjs
import Calculator, { PI, add } from "./math.mjs";
import * as math from "./math.mjs";

// Dynamic import
const module = await import("./heavy.mjs");

// CommonJS
// math.js
const PI = 3.14;
function add(a, b) { return a + b; }
module.exports = { PI, add };
// or: exports.PI = PI;

// main.js
const { PI, add } = require("./math.js");
const math = require("./math.js");

// Dynamic require
const module = require("./heavy.js"); // synchronous
```

**Live bindings (ESM):**
```js
// counter.mjs
export let count = 0;
export function increment() { count++; }

// main.mjs
import { count, increment } from "./counter.mjs";
console.log(count); // 0
increment();
console.log(count); // 1 ✅ — live binding!

// CommonJS — copy, NOT live
const { count, increment } = require("./counter");
console.log(count); // 0
increment();
console.log(count); // 0 ❌ — still 0!
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q85. What is dynamic import and tree shaking?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Dynamic import** (`import()`) loads modules on demand, returning a Promise.

```js
// Static import (bundled at build time)
import { heavyFunction } from "./heavy.js";

// Dynamic import (loaded on demand)
button.addEventListener("click", async () => {
  const module = await import("./heavy.js");
  module.heavyFunction();
});

// Pattern: lazy loading routes
const Dashboard = React.lazy(() => import("./Dashboard"));

// Condition-based loading
const i18n = await import(`./locales/${language}.js`);
```

**Tree shaking** — build tools (Webpack, Rollup, Vite) remove unused exports during bundling.

```js
// utils.js — only `formatDate` is used
export function formatDate(date) { /* ... */ }
export function unusedHelper() { /* ... */ }     // 🗑️ removed by tree-shaking
export function alsoUnused() { /* ... */ }       // 🗑️ removed

// main.js
import { formatDate } from "./utils.js";
```

**For tree shaking to work:**
- Use ES modules (not CommonJS)
- Avoid side effects in modules
- No importing entire modules when you only need specific exports
- Build tool must support it (Webpack, Rollup, Vite, esbuild)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q86. What is the Fetch API?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Fetch API** provides a modern interface for making HTTP requests, returning Promises.

```js
// GET request
fetch("/api/users")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// POST request with JSON
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" })
});

// Request with different response types
const text = await fetch(url).then(r => r.text());
const json = await fetch(url).then(r => r.json());
const blob = await fetch(url).then(r => r.blob());   // binary data
const buffer = await fetch(url).then(r => r.arrayBuffer());
const stream = await fetch(url).then(r => r.body);   // ReadableStream

// Error handling
async function fetchWithError(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request was cancelled");
    } else if (error instanceof TypeError) {
      console.log("Network error (no internet?)");
    }
    throw error;
  }
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q87. What is `AbortController` and how do you cancel fetch requests?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**AbortController** allows canceling fetch requests and other async operations.

```js
// Basic cancellation
const controller = new AbortController();
const signal = controller.signal;

fetch("/api/slow-endpoint", { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Fetch was cancelled");
    } else {
      console.error("Fetch failed:", err);
    }
  });

// Cancel after 3 seconds
setTimeout(() => controller.abort(), 3000);

// Cancelling stale requests (search-as-you-type)
let currentController = null;

async function search(query) {
  // Cancel previous request
  if (currentController) {
    currentController.abort();
  }
  
  currentController = new AbortController();
  
  try {
    const results = await fetch(`/api/search?q=${query}`, {
      signal: currentController.signal
    });
    return await results.json();
  } catch (err) {
    if (err.name === "AbortError") return; // silently ignore
    throw err;
  }
}

// AbortController listens to the 'abort' event
const controller = new AbortController();
controller.signal.addEventListener("abort", () => {
  console.log("Operation was cancelled");
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q88. What is the difference between `localStorage`, `sessionStorage`, and `cookies`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | localStorage | sessionStorage | Cookie |
|---------|-------------|----------------|--------|
| Capacity | ~5–10 MB | ~5 MB | ~4 KB |
| Persistence | Until cleared | Tab/browser close | Based on `expires`/`max-age` |
| Sent to server | ❌ No | ❌ No | ✅ Yes (per request) |
| Access (JS) | ✅ | ✅ | ✅ (unless `HttpOnly`) |
| Scope | Origin (protocol + domain + port) | Tab + Origin | Path + Domain |
| Secure flag | N/A | N/A | Can set `Secure` |

```js
// localStorage (persists across sessions)
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");     // "dark"
localStorage.removeItem("theme");
localStorage.clear();                            // clear all

// sessionStorage (per tab session)
sessionStorage.setItem("tempData", "abc123");
const data = sessionStorage.getItem("tempData");
sessionStorage.removeItem("tempData");

// Cookies
document.cookie = "name=Alice; max-age=3600; path=/; Secure; SameSite=Strict";
document.cookie = "name=Bob";  // overwrites if name already exists
console.log(document.cookie);   // "name=Bob" (all cookies as string)

// Cookie attributes:
// max-age: seconds until expiry
// expires: specific date (RFC 1123 format)
// path: scope to path
// domain: scope to domain
// Secure: only over HTTPS
// HttpOnly: not accessible from JS (more secure)
// SameSite: Strict, Lax, or None
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q89. What are Web Workers?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Web Workers** run JavaScript in a separate thread, enabling parallel execution without blocking the UI.

```js
// main.js
const worker = new Worker("worker.js");

// Send data to worker
worker.postMessage({ type: "process", data: largeArray });

// Receive results from worker
worker.onmessage = (event) => {
  console.log("Result:", event.data);
};

// Handle errors
worker.onerror = (error) => {
  console.error("Worker error:", error);
};

// Terminate worker
worker.terminate();

// worker.js (separate file)
self.onmessage = (event) => {
  const { type, data } = event.data;
  
  if (type === "process") {
    // Heavy computation (doesn't block UI)
    const result = expensiveCalculation(data);
    self.postMessage(result);
  }
};

// Worker limitations:
// ❌ No DOM access (no document, window, parent)
// ❌ No localStorage/sessionStorage
// ✅ Has: fetch, setTimeout, indexedDB, WebSocket, XMLHttpRequest
// ✅ Has: importScripts() for loading libraries

// SharedWorker (shared across multiple tabs)
const sharedWorker = new SharedWorker("shared-worker.js");
sharedWorker.port.postMessage("hello");
sharedWorker.port.onmessage = (e) => console.log(e.data);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q90. What are Service Workers?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Service Workers** act as a programmable proxy between the browser and the network, enabling offline experiences and push notifications.

```js
// 1. Register (main script)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(reg => console.log("SW registered:", reg.scope))
    .catch(err => console.error("SW failed:", err));

  // Listen for updates
  navigator.serviceWorker.ready.then(reg => {
    reg.onupdatefound = () => {
      const installing = reg.installing;
      installing.onstatechange = () => {
        if (installing.state === "installed" && navigator.serviceWorker.controller) {
          console.log("New version available! Refresh to update.");
        }
      };
    };
  });
}

// 2. sw.js — Service Worker lifecycle
// INSTALL — cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then(cache =>
      cache.addAll(["/", "/index.html", "/styles.css", "/app.js"])
    )
  );
  self.skipWaiting(); // activate immediately
});

// ACTIVATE — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== "v1").map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // take control immediately
});

// FETCH — intercept network requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match("/offline.html")) // offline fallback
  );
});

// PUSH — receive push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon.png"
  });
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q91. What is `requestAnimationFrame`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`requestAnimationFrame` schedules a callback before the next browser repaint (~16.6ms at 60fps).

```js
function animate() {
  element.style.transform = `translateX(${x}px)`;
  x++;
  
  if (x < 500) {
    animationId = requestAnimationFrame(animate); // loop
  }
}

let animationId = requestAnimationFrame(animate);
cancelAnimationFrame(animationId); // cancel

// vs setTimeout/setInterval
// ✅ Synced to display refresh rate (no jank)
// ✅ Pauses when tab is hidden (saves battery/CPU)
// ✅ Smoother animations (browser can batch updates)
// ❌ No guaranteed interval (timing is approximate)

// Practical: smooth scroll
function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  
  function scroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    
    window.scrollTo(0, startY + distance * ease);
    
    if (progress < 1) requestAnimationFrame(scroll);
  }
  
  requestAnimationFrame(scroll);
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q92. What is the `Error` object and custom errors?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

JavaScript has built-in error types and supports custom errors.

```js
// Built-in error types
new Error("generic");
new SyntaxError("syntax");
new TypeError("type mismatch");
new ReferenceError("undefined variable");
new RangeError("out of range");
new URIError("invalid URI");
new AggregateError([err1, err2], "multiple errors");

// Custom error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.timestamp = new Date();
  }
}

class NetworkError extends Error {
  constructor(status, url) {
    super(`HTTP ${status}: ${url}`);
    this.name = "NetworkError";
    this.status = status;
    this.url = url;
  }
}

// Usage
async function createUser(data) {
  if (!data.email) {
    throw new ValidationError("Email is required", "email");
  }
  
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new NetworkError(response.status, "/api/users");
  }
  
  return response.json();
}

// Catching specific types
try {
  await createUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`${error.field}: ${error.message}`);
  } else if (error instanceof NetworkError) {
    console.log(`Server error ${error.status}`);
    retry();
  } else {
    console.error("Unknown error:", error);
  }
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q93. What is the `finally` block and when does it execute?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`finally` runs **regardless** of whether an error occurred or not — even if there's a `return`, `break`, or `continue` in `try` or `catch`.

```js
// Always runs
function readFile() {
  const file = openFile();
  try {
    // Process file
    return file.read();    // ← returns first
  } catch (error) {
    console.error(error);
    throw error;           // ← or re-throws
  } finally {
    file.close();          // ← ALWAYS runs before the return/throw!
  }
}

// Order of execution
function test() {
  try {
    console.log("1: try");
    return "2: return value";
  } finally {
    console.log("3: finally");  // runs BEFORE the function returns
  }
}

console.log(test());
// Output:
// 1: try
// 3: finally
// 2: return value

// finally overrides previous return values if it returns something
function confusing() {
  try {
    return "from try";
  } finally {
    return "from finally";  // ❌ overrides the try return!
  }
}
console.log(confusing()); // "from finally"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q94. What is `Array.from()` and `Array.of()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`Array.from()` creates arrays from iterables or array-like objects. `Array.of()` creates arrays from arguments (unlike `new Array()` which has a length quirk).

```js
// Array.from()
Array.from("hello");         // ["h", "e", "l", "l", "o"]

Array.from({ length: 3 }, (_, i) => i);  // [0, 1, 2]

// From Set
Array.from(new Set([1, 2, 2, 3]));  // [1, 2, 3]

// From Map
const map = new Map([["a", 1], ["b", 2]]);
Array.from(map);             // [["a", 1], ["b", 2]]
Array.from(map.values());    // [1, 2]

// From arguments
function getArgs() {
  return Array.from(arguments);  // [1, 2, 3]
}
getArgs(1, 2, 3);

// From NodeList
const divs = Array.from(document.querySelectorAll("div"));

// With map function
Array.from([1, 2, 3], x => x * 2);  // [2, 4, 6]

// Array.of() — avoids new Array(length) behavior
Array.of(3);     // [3] — not [empty × 3]
Array.of(1, 2);  // [1, 2]
new Array(3);    // [empty × 3] — length of 3, but no elements
new Array(1, 2); // [1, 2] — but inconsistent!
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q95. What is tagged template literals practical use?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Tagged templates** call a function with the processed template parts, enabling custom processing.

```js
function sanitize(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? String(values[i])
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;") : "";
    return result + str + value;
  }, "");
}

const userInput = "<script>alert('xss')</script>";
sanitize`<div>${userInput}</div>`;
// "<div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>"

// CSS-in-JS (styled-components)
const Button = styled.button`
  background: ${props => props.primary ? "blue" : "gray"};
  color: white;
  padding: 10px 20px;
`;

// SQL escaping
function sql(strings, ...values) {
  return strings.reduce((query, str, i) => {
    const escaped = values[i] ? `'${String(values[i]).replace(/'/g, "''")}'` : "";
    return query + str + escaped;
  }, "");
}

const name = "O'Brien";
sql`SELECT * FROM users WHERE name = ${name}`;
// "SELECT * FROM users WHERE name = 'O''Brien'"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q96. What is the `Intl` API in JavaScript?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **`Intl`** API provides language-sensitive formatting for dates, numbers, and strings.

```js
// Date formatting
const date = new Date("2024-12-25");
new Intl.DateTimeFormat("en-US").format(date);     // "12/25/2024"
new Intl.DateTimeFormat("en-GB").format(date);     // "25/12/2024"
new Intl.DateTimeFormat("de-DE").format(date);     // "25.12.2024"
new Intl.DateTimeFormat("ja-JP").format(date);     // "2024/12/25"

// With options
new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(date); // "Wednesday, December 25, 2024"

// Number formatting
new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
}).format(12345.67); // "$12,345.67"

new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR"
}).format(12345.67); // "12.345,67 €"

// Percentage
new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1
}).format(0.875); // "87.5%"

// List formatting
new Intl.ListFormat("en", { style: "long", type: "conjunction" })
  .format(["Alice", "Bob", "Charlie"]);
// "Alice, Bob, and Charlie"

new Intl.ListFormat("en", { style: "short", type: "disjunction" })
  .format(["Apples", "Oranges"]);
// "Apples or Oranges"

// Relative time
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
rtf.format(-1, "day");    // "yesterday"
rtf.format(3, "months");  // "in 3 months"
rtf.format(-7, "hours");  // "7 hours ago"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q97. What is `structuredClone()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`structuredClone()` (global function, Node 17+, modern browsers) creates a **deep clone** using the structured clone algorithm.

```js
const original = {
  name: "Alice",
  address: { city: "Mumbai", zip: 400001 },
  hobbies: ["reading", "coding"],
  date: new Date("2024-01-15"),
  set: new Set([1, 2, 3]),
  map: new Map([["key", "value"]]),
  buffer: new ArrayBuffer(8),
  regex: /hello/gi,
  error: new Error("test"),
  blob: new Blob(["data"], { type: "text/plain" })
};

const clone = structuredClone(original);

clone.address.city = "Delhi";
console.log(original.address.city); // "Mumbai" — deep copy ✅

clone.hobbies.push("gaming");
console.log(original.hobbies); // ["reading", "coding"] — unaffected ✅

// ✅ Supports: Object, Array, Date, RegExp, Map, Set, Blob, File,
//    ImageData, ArrayBuffer, TypedArray, Error types

// ❌ Does NOT support: Functions, DOM nodes, class instances,
//    WeakMap, WeakSet, Symbols, prototype chain

// Better than JSON.parse(JSON.stringify()):
// ✅ Handles Date, Map, Set, RegExp, ArrayBuffer, Blob
// ✅ Handles circular references
// ❌ Same limitations for functions and Symbols
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q98. What is `queueMicrotask()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`queueMicrotask()` schedules a function to run as a **microtask** (before macrotasks like `setTimeout`).

```js
console.log("1");

queueMicrotask(() => console.log("2 - microtask"));

Promise.resolve().then(() => console.log("3 - promise microtask"));

setTimeout(() => console.log("4 - setTimeout (macrotask)"), 0);

console.log("5");

// Output: 1 → 5 → 2 → 3 → 4
// Microtasks (queueMicrotask + Promise.then) run BEFORE macrotasks

// Practical: batch DOM updates before browser repaint
let updateScheduled = false;
let pendingUpdates = [];

function scheduleUpdate(data) {
  pendingUpdates.push(data);
  
  if (!updateScheduled) {
    updateScheduled = true;
    queueMicrotask(() => {
      // Runs once, before any setTimeout but after sync code
      processUpdates(pendingUpdates);
      pendingUpdates = [];
      updateScheduled = false;
    });
  }
}

// Multiple calls in same sync block → only one batch update
scheduleUpdate("data1");
scheduleUpdate("data2");
scheduleUpdate("data3"); // All processed in one batch
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q99. How do you handle errors in async code?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. try/catch with async/await:**
```js
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error; // re-throw if caller needs to handle
  }
}
```

**2. .catch() with Promises:**
```js
fetch("/api/data")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Fetch failed:", error);
    // Handle or re-throw
  });
```

**3. Global error handlers:**
```js
// Unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled rejection:", event.reason);
  event.preventDefault(); // prevent console warning
});

// General errors
window.onerror = (message, source, line, col, error) => {
  console.error("Global error:", error);
};

// Node.js
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
```

**4. Wrapper for safe async:**
```js
function asyncHandler(fn) {
  return function(...args) {
    return fn(...args).catch(error => {
      console.error("Async error:", error);
      // Show user-friendly error
      showErrorToast(error.message);
    });
  };
}

const safeFetchData = asyncHandler(async (id) => {
  const data = await fetch(`/api/${id}`);
  return data.json();
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q100. What is `globalThis`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`globalThis` provides a **standard way** to access the global object across environments.

```js
// Before globalThis — different per environment:
// Browser: window
// Node.js: global
// Web Worker: self
// Non-strict function: this

// globalThis — works everywhere (ES2020)
console.log(globalThis);
// Browser → Window
// Node.js → global
// Web Worker → DedicatedWorkerGlobalScope

// Practical use
globalThis.myGlobal = "accessible everywhere";

// Polyfill-free: all modern environments support it
// Use in: cross-platform libraries, configuration, feature detection

// Examples
const canRun = typeof globalThis.setTimeout === "function";
const isBrowser = typeof globalThis.document !== "undefined";
const isNode = typeof globalThis.process !== "undefined" &&
               globalThis.process.versions?.node;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q101. What is `Object.defineProperty()` and property descriptors?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`Object.defineProperty()` defines a property with fine-grained control over its behavior via **property descriptors**.

```js
const person = {};

// Data descriptor
Object.defineProperty(person, "name", {
  value: "Alice",
  writable: false,      // can reassign? (default: false)
  enumerable: true,     // shows in Object.keys/for...in? (default: false)
  configurable: false    // can delete or redefine? (default: false)
});

person.name = "Bob";    // ❌ silently fails (strict: TypeError)
delete person.name;      // ❌ cannot delete
Object.keys(person);     // ["name"] — enumerable

// Accessor descriptor (getter/setter)
Object.defineProperty(person, "fullName", {
  get() { return `${this.first} ${this.last}`; },
  set(value) { [this.first, this.last] = value.split(" "); },
  enumerable: true,
  configurable: true
});

person.fullName = "Bob Jones";
person.first; // "Bob"

// Multiple properties
Object.defineProperties(person, {
  age: { value: 30, writable: true },
  email: { value: "a@b.com", writable: false }
});

// Check descriptors
Object.getOwnPropertyDescriptor(person, "name");
// { value: "Alice", writable: false, enumerable: true, configurable: false }
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q102. What is the difference between `Object.create()` and `Object.assign()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| `Object.create(proto)` | `Object.assign(target, ...sources)` |
|------------------------|-------------------------------------|
| Sets the prototype | Copies own properties |
| No constructor call | Copies property values |
| Used for prototypal inheritance | Used for merging/cloning objects |
| `const obj = Object.create(parent)` | `const obj = Object.assign({}, source)` |

```js
// Object.create — inheritance via prototype
const animal = { eats: true, walks: true };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats);   // true (from prototype)
console.log(Object.keys(dog)); // ["barks"] — only own keys
dog.hasOwnProperty("eats"); // false — inherited

// Object.assign — property copying
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);  // target = { a: 1, b: 2, c: 3 }

// Combining both
function createWithProps(proto, props) {
  const obj = Object.create(proto);
  Object.assign(obj, props);
  return obj;
}

const user = createWithProps(
  { greet() { return `Hello, ${this.name}`; } },
  { name: "Alice", age: 30 }
);
user.greet(); // "Hello, Alice"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q103. What is `Object.hasOwn()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`Object.hasOwn(obj, prop)` (ES2022) is a safer alternative to `hasOwnProperty()`.

```js
const obj = Object.create(null);  // No prototype
obj.name = "Alice";

// ❌ Broken — obj has no prototype, so hasOwnProperty doesn't exist
obj.hasOwnProperty("name"); // TypeError: obj.hasOwnProperty is not a function

// ❌ Unsafe — can be overridden
const obj2 = { hasOwnProperty: () => true };
obj2.hasOwnProperty("nonexistent"); // true — LIES!

// ✅ Object.hasOwn — always works
Object.hasOwn(obj, "name");  // true
Object.hasOwn(obj2, "nonexistent"); // false (correct!)

// ✅ Also works with the prototype-safe call pattern
Object.prototype.hasOwnProperty.call(obj, "name"); // true (but verbose)

// Compare
const person = { name: "Alice" };
Object.hasOwn(person, "name");  // true — own property
Object.hasOwn(person, "toString"); // false — inherited
"toString" in person; // true — includes inherited
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q104. What are private class fields (`#`)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Private fields** (ES2022) use `#` prefix to create truly private properties.

```js
class BankAccount {
  #balance = 0;           // Private field
  #owner;                 // Private field
  static #bankName = "MyBank";  // Private static field
  
  constructor(owner, initialDeposit) {
    this.#owner = owner;
    this.#balance = initialDeposit;
  }
  
  #validate(amount) {     // Private method
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
  }
  
  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    this.#validate(amount);
    this.#balance -= amount;
    return this.#balance;
  }
  
  get balance() { return this.#balance; }
  
  static get bankName() { return this.#bankName; }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log(account.balance);     // 1500
// account.#balance               // ❌ SyntaxError — truly private!
// account.#validate(100)         // ❌ SyntaxError

// Private fields are:
// ✅ Truly private (not accessible via Object.keys, getOwnPropertyNames, etc.)
// ✅ Different from TypeScript's private (which is just compile-time)
// ✅ Inherited differently: subclasses CANNOT access parent's #private fields
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q105. What is `Error.cause`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`Error.cause` (ES2022) allows chaining errors by specifying the original error as a `cause` property.

```js
// Without cause — lose the original error
async function getData() {
  try {
    const response = await fetch("/api/data");
    return await response.json();
  } catch (error) {
    // Original error (network issue) is LOST
    throw new Error("Failed to load data");
  }
}

// With cause — preserve the chain
async function getData() {
  try {
    const response = await fetch("/api/data");
    return await response.json();
  } catch (error) {
    throw new Error("Failed to load data", { cause: error });
  }
}

// Usage
try {
  await getData();
} catch (error) {
  console.log(error.message);    // "Failed to load data"
  console.log(error.cause);      // Original TypeError/NetworkError
  console.log(error.cause?.message); // Original error message
}

// Deep chains
class AppError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "AppError";
  }
}

async function loadDashboard() {
  try {
    return await getData();
  } catch (error) {
    throw new AppError("Dashboard failed to load", { cause: error });
  }
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q106. What is `Number.EPSILON` and floating point precision?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

JavaScript uses **IEEE 754 double-precision floating point** — binary representation causes precision issues.

```js
// The problem
0.1 + 0.2; // 0.30000000000000004 — NOT 0.3!
0.1 + 0.2 === 0.3; // false

// Why? These decimal fractions can't be represented exactly in binary:
// 0.1 = 0.0001100110011001... (repeating)
// 0.2 = 0.0011001100110011... (repeating)

// Solutions:
// 1. Number.EPSILON for comparison
function areEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
areEqual(0.1 + 0.2, 0.3); // true

// 2. Round to fixed decimal
+(0.1 + 0.2).toFixed(2); // 0.3

// 3. Scale to integers
(0.1 * 10 + 0.2 * 10) / 10; // 0.3

// Other quirks
Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_SAFE_INTEGER; // -9007199254740991
Number.MAX_VALUE;        // ~1.8e308
Number.MIN_VALUE;        // ~5e-324 (closest to zero)

// Use BigInt for integers beyond safe range
// Use libraries like decimal.js for exact decimal arithmetic
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q107. What is `at()` method for arrays and strings?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The `at()` method (ES2022) takes an integer index and supports **negative indexing**, returning `undefined` for out-of-bounds.

```js
const arr = [10, 20, 30, 40, 50];
const str = "hello";

// Before at() — clumsy negative indexing
arr[arr.length - 1];   // 50
arr[arr.length - 3];   // 30

// With at() — clean and consistent
arr.at(-1);  // 50 — last element
arr.at(-2);  // 40 — second-to-last
arr.at(2);   // 30
arr.at(10);  // undefined (no error)
arr.at(-10); // undefined (no error)

// Strings work too
str.at(0);   // "h"
str.at(-1);  // "o"
"hello".at(-2); // "l"

// Without at():
"hello"[-1];  // undefined (but doesn't work in older JS engines)
// Before .at(), you'd use: "hello".slice(-1, undefined) // "o"

// Practical: get last element of an array
const lastItem = data.at(-1) ?? "default";
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q108. What is `String.prototype.replaceAll()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`replaceAll()` (ES2021) replaces **all** occurrences of a substring or regex (with `g` flag).

```js
const str = "Hello, World! Hello, everyone!";

// replace — only first match
str.replace("Hello", "Hi");   // "Hi, World! Hello, everyone!"

// replaceAll — replaces ALL matches (string)
str.replaceAll("Hello", "Hi"); // "Hi, World! Hi, everyone!"

// regex — must have global flag
str.replaceAll(/Hello/g, "Hi");  // "Hi, World! Hi, everyone!"
// str.replaceAll(/Hello/, "Hi"); // ❌ TypeError (requires global flag)

// Practical: sanitization
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Replacing dynamic values
const censored = "password".replaceAll(/./g, "*"); // "********"

// Compare
"aaa".replace("a", "b");   // "baa" (first only)
"aaa".replaceAll("a", "b"); // "bbb" (all)
"aaa".replace(/a/g, "b");   // "bbb" (old way with regex)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q109. What are logical assignment operators (`&&=`, `||=`, `??=`)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Logical assignment operators (ES2021) combine logical operators with assignment.

```js
let x = 0, y = 5, z = null;

// &&= — assigns only if variable is TRUTHY
x &&= 10;   // x = 0 (0 is falsy, no assignment)
y &&= 10;   // y = 10 (5 is truthy, assigned)

// ||= — assigns only if variable is FALSY
x ||= 20;   // x = 20 (0 is falsy, assigned)
y ||= 20;   // y = 10 (already 10, truthy, no change)

// ??= — assigns only if variable is null/undefined
z ??= 30;   // z = 30 (null, assigned)
0 ??= 50;   // 0 (NOT null/undefined, no change)

// Practical examples
function updateSettings(settings) {
  settings.timeout ??= 5000;     // default only if null/undefined
  settings.retry ||= 3;          // default for falsy values
  settings.debug &&= logEnabled; // only enable if already truthy
}

// Equivalent without operators
settings.timeout = settings.timeout ?? 5000;
settings.retry = settings.retry || 3;
settings.debug = settings.debug ? logEnabled : settings.debug;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q110. What is Top-Level Await?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Top-level await** (ES2022) allows using `await` outside of `async` functions — in ES modules only.

```js
// module.mjs (must be ES module)

// Before — wrapped in async IIFE
(async () => {
  const data = await fetch("/api/data");
  console.log(data);
})();

// After — clean and direct
const response = await fetch("/api/data");
const data = await response.json();
console.log(data);

// Practical: loading configuration
// config.mjs
export const config = await fetch("/api/config").then(r => r.json());

// main.mjs
import { config } from "./config.mjs";
console.log(config.theme); // Works after config loads

// Dynamic imports
const module = await import(`./locale/${language}.mjs`);

// Fallback / retry pattern
let db;
try {
  db = await connectToPrimary();
} catch {
  db = await connectToFallback();
}

export { db };

// ⚠️ Cautions:
// - Blocks the entire module from executing
// - Can delay other modules that import it
// - Only works in modules (not classic scripts)
```

</div>
</details>

---

## 🔴 Hard (Q111–Q160+)

<details class="qa-card qa-hard">
<summary>
Q111. How does JavaScript's Garbage Collection work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

JavaScript uses **automatic garbage collection** with the **Mark-and-Sweep** algorithm.

**The algorithm:**
1. **Mark** — Starting from roots (global object, current execution context, etc.), traverse all reachable objects and mark them
2. **Sweep** — Remove unmarked (unreachable) objects
3. **Compact** (optional) — Defragment memory

**Memory lifecycle:**
```
Allocate → Use → Release (GC)
```

```js
// Memory leak examples

// 1. Accidental globals
function leak() {
  leaked = "I'm global!";  // ❌ no var/let/const → becomes global
}

// 2. Forgotten timers/intervals
const heavy = new Array(1000000);
const id = setInterval(() => {
  // heavy is captured in closure — never released
}, 1000);
// clearInterval(id) was never called!

// 3. Detached DOM nodes
const div = document.createElement("div");
document.body.appendChild(div);
document.body.removeChild(div);
// div reference still exists — not GC'd!
// div = null;  // ✅ would allow GC

// 4. Closures holding large data
function process(data) {
  return function() {
    // ❌ Holds reference to entire data
    // return data;
    
    // ✅ Only keep what's needed
    return data.length;
  };
}

// 5. Event listeners not removed
element.addEventListener("click", handler);
// element.removeEventListener("click", handler);  // required
```

**V8-specific GC (Orinoco):**
- **Young Generation** (semi-space) — fast, frequent GC for short-lived objects
- **Old Generation** — slower, less frequent GC for long-lived objects
- Incremental/mark-sweep in old generation to avoid long pauses

Modern engines use **generational collection**: new objects are checked frequently, long-surviving objects are checked rarely.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q112. How does V8 optimize JavaScript code?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**V8** (Chrome's JavaScript engine) uses multiple optimization tiers:

**Pipeline:**
```
Source → Parser → AST → Ignition (Interpreter) → Bytecode
                          ↓ (hot code detected)
                     Turbofan (Optimizing Compiler) → Optimized Machine Code
                          ↓ (assumptions broken)
                     Deoptimization → Falls back to interpreter
```

**Hidden Classes (Shapes/Maps):**
V8 creates internal "hidden classes" to optimize property access — objects with the same shape share the same hidden class.

```js
// ✅ OPTIMAL — same shape, single hidden class
class Point {
  constructor(x, y) {
    this.x = x;  // property order is consistent
    this.y = y;
  }
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
// Both share the same hidden class → fast property access

// ❌ SUBOPTIMAL — dynamic property addition
function createPoint(x, y) {
  const obj = {};
  obj.x = x;  // hidden class A
  obj.y = y;  // hidden class B (transition)
  return obj;
}

// ❌ Different ordering = different hidden classes
function createUser(name, age) {
  const obj = {};
  obj.name = name;  // hidden class X
  obj.age = age;    // hidden class Y
  return obj;
}
function createUserAlt(name, age) {
  return { age, name };  // different order = different hidden class
}
```

**Inline Caching (IC):** V8 caches the result of property lookups, making repeated access to the same property on the same shape extremely fast.

**Deoptimization triggers:**
- Adding/removing properties dynamically
- Changing property types
- `try/catch` in optimized functions
- Using `arguments` object
- `debugger` statement

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q113. Explain the JavaScript Event Loop in detail with microtasks and macrotasks.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The Event Loop coordinates between the Call Stack, Microtask Queue, and Macrotask Queue.

**Full algorithm:**
```
WHILE (true) {
  1. Execute all synchronous code on the Call Stack
  2. Process ALL entries in the Microtask Queue
     (including microtasks added during this step)
  3. Extract ONE entry from the Macrotask Queue
  4. Execute it (may add more microtasks)
  5. Perform UI rendering (browser)
  6. REPEAT
}
```

```js
// Comprehensive example
console.log("1: sync");

// Macrotask
setTimeout(() => {
  console.log("2: setTimeout");
  
  // This microtask runs in step 2 of NEXT iteration
  Promise.resolve().then(() => console.log("3: promise in setTimeout"));
}, 0);

// Microtask
Promise.resolve()
  .then(() => {
    console.log("4: promise 1");
    
    // Schedule another microtask — same iteration!
    queueMicrotask(() => console.log("5: microtask in microtask"));
  })
  .then(() => console.log("6: promise 2"));  // chained, same iteration

// Microtask
queueMicrotask(() => console.log("7: queueMicrotask"));

// Another macrotask
setTimeout(() => console.log("8: setTimeout 2"), 0);

console.log("9: sync end");

// Output:
// 1: sync
// 9: sync end
// 4: promise 1
// 7: queueMicrotask
// 5: microtask in microtask
// 6: promise 2
// 2: setTimeout
// 3: promise in setTimeout
// 8: setTimeout 2
```

**Key insight:** Microtasks can starve macrotasks. If microtasks keep adding more microtasks, macrotasks (including UI rendering) never run.

```js
function starve() {
  queueMicrotask(() => starve());  // ❌ infinite microtask loop
  // setTimeout, I/O, rendering NEVER get a chance
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q114. Implement a polyfill for `Promise.all`.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    
    const results = new Array(promises.length);
    let resolved = 0;
    
    promises.forEach((promise, index) => {
      // Handle non-Promise values
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          resolved++;
          
          if (resolved === promises.length) {
            resolve(results); // All resolved
          }
        })
        .catch(reject); // First rejection rejects the whole thing
    });
  });
}

// Tests
promiseAll([Promise.resolve(1), Promise.resolve(2)])
  .then(v => console.log(v)); // [1, 2]

promiseAll([1, 2, 3]) // non-Promise values
  .then(v => console.log(v)); // [1, 2, 3]

promiseAll([])
  .then(v => console.log(v)); // []

promiseAll([Promise.resolve(1), Promise.reject("error")])
  .catch(e => console.log(e)); // "error"
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q115. Implement `Function.prototype.bind` from scratch.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
Function.prototype.myBind = function(thisArg, ...outerArgs) {
  const originalFn = this;
  
  function BoundFunction(...innerArgs) {
    // Handle `new` binding — if called with `new`, `this` is an instance
    // of BoundFunction, so we should create a new instance properly
    if (new.target) {
      // Called as constructor: ignore bound `thisArg`
      const instance = new originalFn(...outerArgs, ...innerArgs);
      return instance;
    }
    // Normal call: use bound `thisArg`
    return originalFn.apply(thisArg, [...outerArgs, ...innerArgs]);
  }
  
  // Preserve prototype for constructor calls
  BoundFunction.prototype = originalFn.prototype;
  
  // Preserve the function's length (number of parameters minus bound ones)
  Object.defineProperty(BoundFunction, "length", {
    value: Math.max(0, originalFn.length - outerArgs.length),
    configurable: true
  });
  
  return BoundFunction;
};

// Tests
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Alice" };
const bound = greet.myBind(user, "Hello");
console.log(bound("!")); // "Hello, Alice!"

// Called as constructor
function Person(name) {
  this.name = name;
}
const BoundPerson = Person.myBind(null, "BoundName");
const p = new BoundPerson();
console.log(p.name); // "BoundName"
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q116. Implement a deep clone function that handles circular references.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
function deepClone(value, visited = new WeakMap()) {
  // Handle primitives and functions (share reference)
  if (value === null || typeof value !== "object") return value;
  
  // Handle circular references — return already cloned object
  if (visited.has(value)) return visited.get(value);
  
  // Handle Date
  if (value instanceof Date) return new Date(value.getTime());
  
  // Handle RegExp
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  
  // Handle Map
  if (value instanceof Map) {
    const clone = new Map();
    visited.set(value, clone);
    value.forEach((v, k) => {
      clone.set(deepClone(k, visited), deepClone(v, visited));
    });
    return clone;
  }
  
  // Handle Set
  if (value instanceof Set) {
    const clone = new Set();
    visited.set(value, clone);
    value.forEach(v => clone.add(deepClone(v, visited)));
    return clone;
  }
  
  // Handle ArrayBuffer, TypedArray
  if (value instanceof ArrayBuffer) {
    return value.slice(0);
  }
  if (ArrayBuffer.isView(value)) {
    return new value.constructor(value);
  }
  
  // Handle plain objects and arrays
  const clone = Array.isArray(value) ? [] : Object.create(
    Object.getPrototypeOf(value)
  );
  
  visited.set(value, clone);
  
  // Copy all properties (including Symbols)
  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], visited);
  }
  
  return clone;
}

// Tests
const obj = { a: 1, b: { c: 2 }, d: [1, 2, { e: 3 }] };
const cloned = deepClone(obj);
cloned.b.c = 99;
console.log(obj.b.c); // 2 (deep copy ✅)

// Circular reference
obj.self = obj;
const clonedCircular = deepClone(obj);
console.log(clonedCircular.self === clonedCircular); // true ✅

// Special types
const withDate = { date: new Date(), regex: /hello/gi };
const clonedSpecial = deepClone(withDate);
console.log(clonedSpecial.date instanceof Date); // true ✅
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q117. Implement an LRU Cache.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
class LRUCache {
  #capacity;
  #cache = new Map(); // Map preserves insertion order
  
  constructor(capacity) {
    this.#capacity = capacity;
  }
  
  get(key) {
    if (!this.#cache.has(key)) return -1;
    
    // Move to end (most recently used) — delete and re-insert
    const value = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, value);
    return value;
  }
  
  put(key, value) {
    if (this.#cache.has(key)) {
      this.#cache.delete(key); // Remove existing
    } else if (this.#cache.size >= this.#capacity) {
      // Evict least recently used (first item)
      const lruKey = this.#cache.keys().next().value;
      this.#cache.delete(lruKey);
    }
    
    this.#cache.set(key, value);
  }
  
  get size() { return this.#cache.size; }
  clear() { this.#cache.clear(); }
}

// O(1) implementation using Map
const cache = new LRUCache(3);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
cache.get("a");        // 1 (a becomes most recent)
cache.put("d", 4);     // evicts "b" (least recently used)
cache.get("b");        // -1 (evicted)
cache.get("c");        // 3
cache.get("a");        // 1
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q118. Implement an Event Emitter (Pub/Sub).
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
class EventEmitter {
  #events = new Map();
  
  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    this.#events.get(event).add(listener);
    
    // Return unsubscribe function
    return () => this.off(event, listener);
  }
  
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
  
  off(event, listener) {
    this.#events.get(event)?.delete(listener);
  }
  
  emit(event, ...args) {
    this.#events.get(event)?.forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        // Don't let one listener crash others
        console.error(`Error in listener for "${event}":`, error);
      }
    });
  }
  
  removeAllListeners(event) {
    if (event) {
      this.#events.delete(event);
    } else {
      this.#events.clear();
    }
  }
  
  listenerCount(event) {
    return this.#events.get(event)?.size ?? 0;
  }
  
  rawListeners(event) {
    return [...(this.#events.get(event) ?? [])];
  }
}

// Usage
const emitter = new EventEmitter();

const unsub = emitter.on("user:login", (user) => {
  console.log(`User logged in: ${user.name}`);
});

emitter.once("app:init", () => console.log("App initialized once"));

emitter.emit("user:login", { name: "Alice" }); // "User logged in: Alice"
emitter.emit("user:login", { name: "Bob" });   // "User logged in: Bob"

unsub(); // unsubscribe
emitter.emit("user:login", { name: "Charlie" }); // No output

emitter.emit("app:init"); // "App initialized once"
emitter.emit("app:init"); // No output (was once)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q119. Implement a debounce function with leading and trailing options.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
function debounce(fn, delay = 300, options = {}) {
  const { leading = false, trailing = true } = options;
  let timer = null;
  let hasPendingCall = false;
  
  const debounced = function(...args) {
    const callNow = leading && !timer;
    
    // Clear existing timer
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    
    if (callNow) {
      // Leading: execute immediately, then debounce
      fn.apply(this, args);
    }
    
    if (trailing !== false) {
      // Trailing: execute after inactivity
      hasPendingCall = true;
      timer = setTimeout(() => {
        timer = null;
        if (trailing && !leading) {
          // Only call trailing if we haven't already called leading
          fn.apply(this, args);
        }
        hasPendingCall = false;
      }, delay);
    }
  };
  
  // Allow immediate cancellation
  debounced.cancel = function() {
    if (timer) clearTimeout(timer);
    timer = null;
    hasPendingCall = false;
  };
  
  // Allow immediate execution
  debounced.flush = function() {
    if (hasPendingCall) {
      fn.apply(this, arguments);
      debounced.cancel();
    }
  };
  
  return debounced;
}

// Usage
const log = debounce((msg) => console.log(msg), 1000, {
  leading: true,   // call immediately on first invocation
  trailing: true   // also call after inactivity
});

log("A"); // Called immediately (leading)
log("B"); // Ignored
log("C"); // Ignored
// After 1s: "C" (trailing)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q120. Implement a throttle function with leading and trailing options.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
function throttle(fn, limit = 300, options = {}) {
  const { leading = true, trailing = true } = options;
  let inThrottle = false;
  let lastArgs = null;
  let lastThis = null;
  let timer = null;
  
  const throttled = function(...args) {
    if (!inThrottle) {
      if (leading !== false) {
        fn.apply(this, args); // Execute immediately
      }
      inThrottle = true;
      
      timer = setTimeout(() => {
        inThrottle = false;
        
        if (trailing && lastArgs) {
          fn.apply(lastThis, lastArgs); // Execute last call
          lastArgs = null;
          lastThis = null;
          // Restart throttle cycle for trailing call
          throttled.apply(lastThis, lastArgs);
        }
      }, limit);
    } else {
      // Remember the last call
      lastArgs = args;
      lastThis = this;
    }
  };
  
  throttled.cancel = function() {
    clearTimeout(timer);
    inThrottle = false;
    lastArgs = null;
    lastThis = null;
  };
  
  return throttled;
}

// Usage
const trackScroll = throttle((pos) => {
  console.log("Scroll position:", pos);
}, 200);

// Only fires at most once every 200ms
window.addEventListener("scroll", () => trackScroll(window.scrollY));
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q121. How does the `new` keyword work internally?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

When you call `new Constructor(args)`, JavaScript performs these steps:

```js
function myNew(Constructor, ...args) {
  // 1. Create a new empty object
  const obj = {};
  
  // 2. Set prototype — link the new object's prototype to
  //    the constructor's prototype property
  Object.setPrototypeOf(obj, Constructor.prototype);
  // Or: obj.__proto__ = Constructor.prototype;
  // Or: const obj = Object.create(Constructor.prototype);
  
  // 3. Call the constructor with `this` bound to the new object
  const result = Constructor.apply(obj, args);
  
  // 4. If constructor returns an object, return that instead
  //    Otherwise, return the new object
  const isObject = result !== null && typeof result === "object";
  const isFunction = typeof result === "function";
  
  return (isObject || isFunction) ? result : obj;
}

// Test
function Person(name, age) {
  this.name = name;
  this.age = age;
  // No return — implicit return of `this`
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const alice = myNew(Person, "Alice", 30);
console.log(alice.name);          // "Alice"
console.log(alice.greet());       // "Hello, I'm Alice"
console.log(alice instanceof Person); // true

// Constructor returning an object
function Special(name) {
  this.name = name;
  return { custom: "object" };  // overrides `this`
}
const special = new Special("test");
console.log(special.name);   // undefined (returned object)
console.log(special.custom); // "object"
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q122. What is the difference between `Map`, `WeakMap`, `Object`, and when to use each?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
// ═══════════════════════════════════════════════════
// Object
// ═══════════════════════════════════════════════════
// Use: JSON data, simple records, string-keyed data
const obj = { name: "Alice", age: 30 };
// ✅ JSON.stringify/parse works
// ✅ Dot notation (obj.name)
// ✅ Prototype methods (toString, hasOwnProperty)
// ❌ Keys must be strings or symbols
// ❌ No size property
// ❌ Iteration requires Object.keys/values/entries

// ═══════════════════════════════════════════════════
// Map
// ═══════════════════════════════════════════════════
// Use: Dynamic keys, frequent add/delete, non-string keys
const map = new Map();
map.set(user, metadata);  // ✅ Object keys
map.set(42, "number");    // ✅ Number keys
// ✅ map.size — O(1)
// ✅ Insertion order preserved
// ✅ Easy iteration (for...of, forEach)
// ❌ No dot notation
// ❌ No JSON serialization

// ═══════════════════════════════════════════════════
// WeakMap
// ═══════════════════════════════════════════════════
// Use: Private data, metadata for objects, caching
const wm = new WeakMap();
// ✅ Keys are garbage collected when no other references
// ✅ Prevents memory leaks
// ❌ No iteration (no keys(), values(), entries())
// ❌ No size
// ❌ Keys must be objects

// Decision guide:
const decision = {
  "Need JSON?": "Object",
  "Need non-string keys?": "Map",
  "Frequent add/delete?": "Map",
  "Need size?": "Map",
  "Object keys should auto-GC?": "WeakMap",
  "Simple record with known keys?": "Object",
  "Need prototype methods?": "Object",
  "Private data on objects?": "WeakMap"
};
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q123. What is the difference between shallow and deep comparison?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Shallow comparison** — checks reference equality for objects, value equality for primitives.

**Deep comparison** — recursively compares the structure and content of objects.

```js
const a = { x: 1, y: { z: 2 } };
const b = { x: 1, y: { z: 2 } };
const c = a;

// Shallow equality
a === b;          // false — different references
a === c;          // true — same reference
Object.is(a, b);  // false

// Shallow comparison function (used by React.memo)
function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== "object" || objA === null) return false;
  if (typeof objB !== "object" || objB === null) return false;
  
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key =>
    Object.hasOwn(objB, key) && Object.is(objA[key], objB[key])
  );
}

shallowEqual(a, b);  // false — a.y !== b.y (different references)

// Deep comparison
function deepEqual(a, b, visited = new WeakSet()) {
  if (Object.is(a, b)) return true;
  if (a === null || b === null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;
  
  // Handle circular references
  if (visited.has(a) || visited.has(b)) return false;
  visited.add(a);
  visited.add(b);
  
  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key =>
    Reflect.ownKeys(b).includes(key) && deepEqual(a[key], b[key], visited)
  );
}

deepEqual(a, b);  // true — same structure, same values
deepEqual({ x: NaN }, { x: NaN }); // true (NaN === NaN would be false)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q124. How does the `instanceof` operator work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`instanceof` checks if the `prototype` property of a constructor appears anywhere in an object's prototype chain.

```js
function myInstanceof(obj, Constructor) {
  if (obj === null || typeof obj !== "object") return false;
  
  let proto = Object.getPrototypeOf(obj);
  const prototype = Constructor.prototype;
  
  while (proto !== null) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  
  return false;
}

// Tests
class Animal {}
class Dog extends Animal {}
const rex = new Dog();

myInstanceof(rex, Dog);     // true
myInstanceof(rex, Animal);  // true
myInstanceof(rex, Object);  // true
myInstanceof(rex, Array);   // false

// Edge cases
myInstanceof(null, Object);           // false
myInstanceof(5, Number);              // false (primitives)
myInstanceof(Object.create(null), Object); // false (no prototype chain)

// Can be fooled by modifying prototype
const obj = {};
obj.__proto__ = Array.prototype;
obj instanceof Array; // true — even though obj isn't an array!
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q125. What is `Object.getPrototypeOf()` vs `Object.setPrototypeOf()`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
const animal = { speak() { return "Hello"; } };
const dog = { bark() { return "Woof"; } };

// Get prototype
Object.getPrototypeOf(dog);  // Object.prototype (by default)
console.log(Object.getPrototypeOf(dog) === Object.prototype); // true

// Set prototype — ⚠️ DANGEROUS for performance!
Object.setPrototypeOf(dog, animal);
dog.speak();  // "Hello" — inherited from animal via new prototype
dog.bark();   // "Woof" — own property

// Better: Object.create() instead of setPrototypeOf
const betterDog = Object.create(animal);
betterDog.bark = function() { return "Woof"; };

// Or use the __proto__ setter (also discouraged)
const pup = {};
pup.__proto__ = animal;

// ⚠️ Performance warning:
// Object.setPrototypeOf() deoptimizes V8 — all objects with
// the old hidden class are deoptimized. AVOID in production.
// Instead:
// ✅ Object.create(proto) — at creation time
// ✅ class extends — at definition time
// ❌ Object.setPrototypeOf — NEVER after creation
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q126. How does `in` operator differ from `hasOwnProperty`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| `in` | `hasOwnProperty` |
|------|------------------|
| Checks OWN + INHERITED properties | Checks ONLY own properties |
| Works with objects without prototype | Can fail if overridden |
| `"key" in obj` | `obj.hasOwnProperty("key")` |

```js
const obj = { name: "Alice" };
obj.__proto__ = { inherited: true };

// in — includes inherited
"name" in obj;       // true (own)
"inherited" in obj;  // true (inherited!)
"toString" in obj;   // true (from Object.prototype)

// hasOwnProperty — only own
obj.hasOwnProperty("name");      // true
obj.hasOwnProperty("inherited"); // false
obj.hasOwnProperty("toString");  // false

// ⚠️ hasOwnProperty can be overridden
const malicious = { hasOwnProperty: () => true };
malicious.hasOwnProperty("nonexistent"); // true — LIES!

// ✅ Safer alternatives
Object.prototype.hasOwnProperty.call(malicious, "nonexistent"); // false
Object.hasOwn(malicious, "nonexistent");     // false (ES2022)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q127. Explain `Object.freeze()` deep vs shallow behavior.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Object.freeze()` is **shallow** — it only freezes the top-level properties. Nested objects must be frozen recursively.

```js
const user = {
  name: "Alice",
  address: {
    city: "Mumbai",
    zip: 400001
  },
  hobbies: ["reading", "coding"]
};

const frozen = Object.freeze(user);

// Top-level — immutable
frozen.name = "Bob";            // ❌ fails (strict: TypeError)
delete frozen.name;             // ❌ fails
frozen.email = "a@b.com";       // ❌ fails

// Nested — NOT frozen!
frozen.address.city = "Delhi";  // ✅ works! ❌
frozen.hobbies.push("gaming");  // ✅ works! ❌

// Deep freeze
function deepFreeze(obj) {
  const propNames = Reflect.ownKeys(obj);
  
  for (const name of propNames) {
    const value = obj[name];
    
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  
  return Object.freeze(obj);
}

const deeply = deepFreeze(user);
deeply.address.city = "Pune";   // ❌ fails
deeply.hobbies.push("sports");  // ❌ fails
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q128. What is the difference between `Array.indexOf` and `Array.includes` for NaN?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
const arr = [1, NaN, 2, 3];

// indexOf — uses === (Strict Equality)
arr.indexOf(NaN);    // -1 ❌ (NaN !== NaN)
arr.indexOf(1);      // 0 ✅

// includes — uses SameValueZero algorithm
arr.includes(NaN);    // true ✅ (correctly finds NaN)
arr.includes(1);      // true ✅

// SameValueZero (used by includes, Map, Set):
// - Like === but treats NaN as equal to itself
// - Unlike Object.is() which distinguishes +0 and -0

// Other methods that use SameValueZero:
// Map.has(), Map.set(), Set.has(), Set.add(), Array.includes()

// Other methods that use ===:
// Array.indexOf(), Array.lastIndexOf(), switch/case
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q129. What happens when you run a JavaScript file?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Complete execution pipeline:**

**Phase 1: Parsing**
1. **Lexical Analysis** — Source code → Tokens
2. **Syntactic Analysis** — Tokens → Abstract Syntax Tree (AST)
3. **Error Detection** — Syntax errors are caught here (Script parsing stops on error)

**Phase 2: Compilation (JIT)**
1. **Bytecode Generation** — AST → Ignition interpreter bytecode
2. **Execution starts** on bytecode
3. **Profiling** — V8 monitors "hot" code paths
4. **Optimization** — Hot code compiled to native machine code by Turbofan
5. **Deoptimization** — If optimization assumptions fail

**Phase 3: Execution**
1. **Global Execution Context** created
2. **Creation Phase** — Memory allocated, functions hoisted, `this` bound
3. **Execution Phase** — Code runs line by line
4. **Event Loop** orchestrates async operations

**Memory management:**
- Stack: primitives, function calls, execution contexts
- Heap: objects, closures, dynamically allocated data
- Garbage Collection: Mark-and-Sweep, Generational collection

```
Source Code
    ↓
Parser (Lexer + Syntax) → AST
    ↓ (if syntax valid)
Ignition Interpreter → Bytecode
    ↓ (hot code)
Turbofan Optimizing Compiler → Optimized Machine Code
    ↓ (runs on CPU)
Results
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q130. What is the `Reflect` API and why use it over direct operations?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Reflect` provides methods that correspond to each Proxy trap, with consistent return values and correct `this` handling.

**Comparison with direct operations:**

```js
const obj = { x: 1, get y() { return this.x; } };

// ❌ try/catch for error handling
try { Object.defineProperty(obj, "z", {}); } catch (e) {}
// ✅ Boolean return — no try/catch needed
Reflect.defineProperty(obj, "z", {}); // true/false

// ❌ delete operator ignores strict mode
delete obj.x; // true (may throw in strict)
// ✅ Always returns boolean
Reflect.deleteProperty(obj, "x"); // true

// ❌ "in" operator doesn't capture receiver
"y" in obj; // true
// ✅ But Reflect.has uses same algorithm

// ❌ Proxy needs Reflect for correct receiver handling
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    // ❌ target[key] — wrong for getters (this = target, not proxy)
    // ✅ Reflect.get — correct (this = receiver = proxy)
    return Reflect.get(target, key, receiver);
  }
});

// Consistent return values
Reflect.set(obj, "key", "value");   // true (success)
Reflect.deleteProperty(obj, "key"); // true (deleted)
Reflect.defineProperty(obj, "p", { value: 1 }); // true

// All Reflect methods:
Reflect.get(target, key, receiver)
Reflect.set(target, key, value, receiver)
Reflect.has(target, key)
Reflect.deleteProperty(target, key)
Reflect.defineProperty(target, key, desc)
Reflect.getOwnPropertyDescriptor(target, key)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, proto)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.ownKeys(target)
Reflect.apply(func, thisArg, args)
Reflect.construct(Constructor, args)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q131. How does JavaScript handle type coercion?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

JavaScript automatically converts types in certain operations. Understanding coercion is crucial for avoiding bugs.

**1. String coercion (concatenation with `+`):**
```js
"5" + 3;   // "53"
"5" + true;  // "5true"
"5" + null;  // "5null"
"5" + undefined; // "5undefined"
```

**2. Number coercion (other operators):**
```js
"5" - 3;     // 2
"5" * "3";   // 15
"10" / 2;    // 5
"5" - true;  // 4 (true → 1)
"5" - null;  // 5 (null → 0)
"5" - undefined; // NaN

+"5";        // 5 (unary plus)
+"true";     // NaN
```

**3. Boolean coercion (logical context):**
```js
if ("hello") {}    // truthy → enters block
if (0) {}          // falsy → skips
!"hello";          // false
!!"hello";         // true
!0;                // true
```

**4. Abstract equality (`==`) coercion:**
```js
// Number vs String → string to number
"5" == 5;      // true ("5" → 5)

// Boolean → boolean to number
true == 1;     // true (true → 1)
false == 0;    // true
"1" == true;   // true (true → 1, "1" → 1)

// null/undefined special
null == undefined; // true
null == 0;         // false
undefined == false; // false

// Object vs Primitive → object to primitive
[1] == 1;          // true ([1] → "1" → 1)
[] == 0;           // true ([] → "" → 0)
[] == ![];         // true ([] → "" → 0, ![] → false → 0)
```

**5. ToPrimitive algorithm:**
- If object has `Symbol.toPrimitive`, call it
- Otherwise: call `valueOf()` (if returns primitive), else `toString()`

```js
const obj = {
  valueOf: () => 42,
  toString: () => "custom"
};
obj + 1;  // 43 (valueOf used for number)
String(obj); // "custom" (toString used for string)

// Override Symbol.toPrimitive
const custom = {
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return "string version";
    return 99;
  }
};
`${custom}`; // "string version"
custom + 1;  // 100
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q132. What is `Symbol.toPrimitive` and how does it affect type coercion?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Symbol.toPrimitive` is a well-known symbol that allows objects to customize how they're converted to primitive values.

```js
const temperature = {
  value: 30,
  unit: "°C",
  
  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return `${this.value}${this.unit}`;
    }
    if (hint === "number") {
      return this.value;
    }
    // default
    return `${this.value}${this.unit}`;
  }
};

String(temperature);  // "30°C"
+temperature;         // 30
temperature + "!";    // "30°C!" (default hint)
temperature + 10;     // "30°C10" (default hint — NOT 40!)

// Customizing via valueOf/toString
const counter = {
  count: 0,
  valueOf() { return this.count; },
  toString() { return `Count: ${this.count}`; }
};

+counter;           // 0 (valueOf)
counter + 1;        // 1 (valueOf)
`${counter}`;       // "Count: 0" (toString)

// Priority: Symbol.toPrimitive > valueOf > toString
const withAll = {
  value: 5,
  valueOf() { console.log("valueOf"); return this.value; },
  toString() { console.log("toString"); return "text"; },
  [Symbol.toPrimitive](hint) {
    console.log("toPrimitive:", hint);
    return hint === "string" ? "text" : this.value;
  }
};
+withAll;          // toPrimitive: number → 5
`${withAll}`;      // toPrimitive: string → "text"
withAll + 1;       // toPrimitive: default → 6
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q133. What is `AggregateError` and `Promise.withResolvers`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**AggregateError** (ES2021) wraps multiple errors into a single error — used by `Promise.any()`.

```js
// Promise.any rejects with AggregateError when ALL promises reject
const p1 = Promise.reject(new Error("Error 1"));
const p2 = Promise.reject(new Error("Error 2"));

Promise.any([p1, p2]).catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.message);   // "All promises were rejected"
  console.log(err.errors);    // [Error: Error 1, Error: Error 2]
});

// Manual usage
try {
  const errors = [];
  // ... multiple validations
  if (errors.length > 0) {
    throw new AggregateError(errors, "Validation failed");
  }
} catch (err) {
  if (err instanceof AggregateError) {
    err.errors.forEach(e => console.log(e.message));
  }
}
```

**Promise.withResolvers** (ES2024) — creates a Promise with the resolve/reject functions exposed externally:

```js
// Before — needed to wrap in new Promise
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// After — cleaner API
const { promise, resolve, reject } = Promise.withResolvers();

// Usage
setTimeout(() => resolve("Done!"), 1000);
const result = await promise; // "Done!"

// Practical: converting callback APIs
function readFilePromise(path) {
  const { promise, resolve, reject } = Promise.withResolvers();
  
  fs.readFile(path, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
  
  return promise;
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q134. How does the `for await...of` loop work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`for await...of` iterates over **async iterables** — objects with a `Symbol.asyncIterator` method.

```js
// Async iterable
const asyncRange = {
  from: 1,
  to: 5,
  [Symbol.asyncIterator]() {
    let current = this.from;
    const end = this.to;
    
    return {
      async next() {
        await new Promise(r => setTimeout(r, 200)); // simulate delay
        
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// Consume with for await...of
async function main() {
  for await (const num of asyncRange) {
    console.log(num); // 1, 2, 3, 4, 5 (200ms apart)
  }
}

// Async generator
async function* fetchPages(url) {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    yield data.items;
    hasMore = data.hasMore;
    page++;
  }
}

async function getAllItems(url) {
  const all = [];
  for await (const page of fetchPages(url)) {
    all.push(...page);
  }
  return all;
}

// for await...of handles errors
async function safeIterate() {
  try {
    for await (const item of asyncIterable) {
      process(item);
    }
  } catch (error) {
    console.error("Iteration failed:", error);
  }
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q135. How do you implement a custom iterable with `Symbol.iterator`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
// Implement Iterable protocol
class PaginatedResults {
  #data;
  #pageSize;
  
  constructor(data, pageSize = 10) {
    this.#data = data;
    this.#pageSize = pageSize;
  }
  
  [Symbol.iterator]() {
    let page = 0;
    const data = this.#data;
    const pageSize = this.#pageSize;
    
    return {
      next() {
        const start = page * pageSize;
        const chunk = data.slice(start, start + pageSize);
        page++;
        
        if (chunk.length > 0) {
          return { value: { page: page - 1, items: chunk }, done: false };
        }
        return { value: undefined, done: true };
      },
      
      // Optional: called if iteration exits early (break, return, throw)
      return() {
        console.log("Iteration ended early");
        return { value: undefined, done: true };
      }
    };
  }
}

const data = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);
const paginated = new PaginatedResults(data, 10);

for (const page of paginated) {
  console.log(`Page ${page.page}:`, page.items.length, "items");
  if (page.page === 1) break; // triggers return()
}

// Using with spread
const allPages = [...paginated]; // iterates all

// Using with destructuring
const [first, second] = paginated;

// Making plain objects iterable
const range = {
  start: 1, end: 5,
  [Symbol.iterator]() {
    let i = this.start;
    return {
      next: () => ({
        value: i,
        done: i++ > this.end
      })
    };
  }
};

console.log([...range]); // [1, 2, 3, 4, 5]
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q136. What are `WeakRef` and `FinalizationRegistry`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**WeakRef** (ES2021) holds a weak reference to an object — doesn't prevent garbage collection.

**FinalizationRegistry** (ES2021) registers cleanup callbacks that run when objects are garbage collected.

```js
// WeakRef — reference that doesn't prevent GC
let cache = new Map();

function getCachedData(key, expensiveFn) {
  if (cache.has(key)) {
    const ref = cache.get(key);
    const cached = ref.deref(); // Try to get the object
    if (cached !== undefined) return cached; // Still alive
  }
  
  const fresh = expensiveFn();
  cache.set(key, new WeakRef(fresh));
  return fresh;
}

// FinalizationRegistry — cleanup when GC'd
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Cleanup for: ${heldValue}`);
  // Close connections, free resources, etc.
});

function createResource(name) {
  const resource = { name, data: new Array(10000) };
  
  // Register cleanup callback (called when resource is GC'd)
  registry.register(resource, `resource-${name}`);
  
  return resource;
}

let res = createResource("test");
res = null; // When GC runs: "Cleanup for: resource-test"

// ⚠️ Warnings:
// - GC behavior is unpredictable — don't rely on specific timing
// - WeakRef.deref() may return undefined (object was collected)
// - FinalizationRegistry callbacks run on cleanup thread, not main thread
// - Use sparingly — mostly for caching, resource management, monitoring
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q137. What are the latest ES2023/ES2024 features in detail?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**ES2023 Features:**

```js
// 1. Array findLast / findLastIndex
const arr = [1, 2, 3, 4, 5];
arr.findLast(n => n % 2 === 0);   // 4
arr.findLastIndex(n => n % 2 === 0); // 3

// 2. Immutable Array methods (return COPY, don't mutate)
arr.toSorted((a, b) => a - b);    // sorted copy
arr.toReversed();                  // reversed copy
arr.toSpliced(1, 2, 99);           // modified copy
arr.with(0, 99);                   // [99, 2, 3, 4, 5] — copy with changed index
// arr is unchanged!

// 3. Hashbang support
#!/usr/bin/env node
console.log("Hello from CLI");
```

**ES2024 Features:**

```js
// 1. Object.groupBy / Map.groupBy
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 }
];

const byAge = Object.groupBy(people, p =>
  p.age >= 18 ? "Adult" : "Minor"
);
// { Adult: [{Alice}, {Charlie}], Minor: [{Bob}] }

// 2. Promise.withResolvers
const { promise, resolve, reject } = Promise.withResolvers();
// Cleaner than wrapping in new Promise((res, rej) => ...)

// 3. Array.fromAsync
const asyncGen = async function*() {
  yield 1; yield 2; yield 3;
};
const arr = await Array.fromAsync(asyncGen()); // [1, 2, 3]

// 4. RegExp v flag (set notation)
const greek = /[\p{Script=Greek}&&[^α-ω]]/v; // Greek, excludes lowercase
/\p{ASCII}/v.test("a");  // true
/\p{Emoji}/v.test("🚀"); // true

// 5. Atomics.waitAsync (non-blocking wait)
const sab = new SharedArrayBuffer(4);
const i32 = new Int32Array(sab);
Atomics.waitAsync(i32, 0, 0).then(r => console.log(r));
Atomics.notify(i32, 0, 1);
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q138. What is the `Error.cause` chain pattern?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Error chaining with `cause` preserves the error hierarchy for debugging:

```js
class DatabaseError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "DatabaseError";
    this.timestamp = new Date();
  }
}

class ValidationError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ValidationError";
  }
}

class ApplicationError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ApplicationError";
  }
}

// Deep error chain
async function createUser(data) {
  try {
    validateInput(data);
  } catch (err) {
    throw new ValidationError("Invalid user data", { cause: err });
  }
  
  try {
    await db.users.insert(data);
  } catch (err) {
    throw new DatabaseError("Failed to save user", { cause: err });
  }
}

async function handleRequest(data) {
  try {
    return await createUser(data);
  } catch (err) {
    throw new ApplicationError("Request failed", { cause: err });
  }
}

// Error chain inspection
try {
  await handleRequest({ email: "invalid" });
} catch (err) {
  console.error(err.name);           // "ApplicationError"
  console.error(err.message);        // "Request failed"
  console.error(err.cause.name);     // "ValidationError"
  console.error(err.cause.message);  // "Invalid user data"
  console.error(err.cause.cause);    // Original validation error
}

// Utility to traverse error chain
function getAllErrors(error) {
  const errors = [error];
  let current = error;
  while (current.cause) {
    errors.push(current.cause);
    current = current.cause;
  }
  return errors;
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q139. How does `Symbol.species` work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Symbol.species` lets subclasses override the default constructor used by methods that return new instances.

```js
// Default behavior — array methods return Array instances
class MyArray extends Array {}
const arr = new MyArray(1, 2, 3);
const mapped = arr.map(x => x * 2);
console.log(mapped instanceof MyArray); // true (default)
console.log(mapped instanceof Array);   // true

// Override species — return plain Array instead
class MyCustomArray extends Array {
  static get [Symbol.species]() {
    return Array; // map/filter/slice return Array, not MyCustomArray
  }
}

const custom = new MyCustomArray(1, 2, 3);
const filtered = custom.filter(x => x > 1);
console.log(filtered instanceof MyCustomArray); // false
console.log(filtered instanceof Array);         // true

// Practical: Subclass that returns itself
class ImmutableArray extends Array {
  static get [Symbol.species]() { return this; }
  
  push(...items) {
    return ImmutableArray.from([...this, ...items]);
  }
}

// Symbol.species is used by:
// Array: map, filter, slice, splice, concat, flat, flatMap
// Map: map.keys(), map.values(), map.entries()
// Set: set.keys(), set.values(), set.entries()
// Promise: then, catch, finally
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q140. What is `Atomics` and `SharedArrayBuffer`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`SharedArrayBuffer` creates a shared memory buffer that can be accessed by multiple threads (Web Workers). `Atomics` provides thread-safe operations on shared memory.

```js
// Main thread
const sharedBuffer = new SharedArrayBuffer(4 * 4); // 4 integers
const sharedArray = new Int32Array(sharedBuffer);

// Initialize values
sharedArray[0] = 0;
sharedArray[1] = 42;

// Create worker
const worker = new Worker("worker.js");
worker.postMessage(sharedBuffer); // Transfer shared buffer

// Atomic operations — safe for concurrent access
Atomics.add(sharedArray, 0, 1);        // atomic increment
Atomics.sub(sharedArray, 0, 1);        // atomic decrement
Atomics.load(sharedArray, 1);          // atomic read
Atomics.store(sharedArray, 1, 99);     // atomic write
Atomics.exchange(sharedArray, 0, 100); // swap
Atomics.compareExchange(sharedArray, 0, 100, 200); // CAS

// Synchronization
Atomics.wait(sharedArray, 0, 0);       // Block until value at index 0 changes from 0
Atomics.notify(sharedArray, 0, 1);     // Wake 1 waiting thread

// worker.js
self.onmessage = (event) => {
  const sab = event.data;
  const arr = new Int32Array(sab);
  
  console.log(Atomics.load(arr, 1)); // 42
  
  Atomic.add(arr, 0, 5); // atomic increment from worker
  
  // Notify main thread
  Atomics.store(arr, 2, 1);
  Atomics.notify(arr, 2, 1);
};

// ⚠️ Security: requires special HTTP headers
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Embedder-Policy: require-corp
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q141. What is the difference between `Object.preventExtensions`, `Object.seal`, and `Object.freeze`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
const obj = { name: "Alice", age: 30, address: { city: "Mumbai" } };

// 1. Object.preventExtensions — cannot ADD properties
const ext = Object.preventExtensions({ ...obj });
ext.email = "a@b.com";  // ❌ cannot add
ext.name = "Bob";       // ✅ can modify
delete ext.age;         // ✅ can delete

// 2. Object.seal — cannot ADD or DELETE, but can MODIFY
const sealed = Object.seal({ ...obj });
sealed.email = "a@b.com"; // ❌ cannot add
delete sealed.age;        // ❌ cannot delete
sealed.name = "Bob";      // ✅ can modify

// 3. Object.freeze — cannot ADD, DELETE, or MODIFY
const frozen = Object.freeze({ ...obj });
frozen.name = "Bob";      // ❌ cannot modify
delete frozen.age;        // ❌ cannot delete
frozen.email = "a@b.com"; // ❌ cannot add

// Check
Object.isExtensible(obj);     // true (default)
Object.isSealed(obj);         // false
Object.isFrozen(obj);         // false

Object.isExtensible(ext);     // false
Object.isSealed(sealed);      // true (implies not extensible)
Object.isFrozen(frozen);      // true (implies sealed + non-writable)

// All are SHALLOW — nested objects are NOT affected
frozen.address.city = "Delhi"; // ✅ works!
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q142. What is `TypedArray` and when would you use it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**TypedArrays** provide a mechanism for accessing raw binary data with a specific numeric type.

```js
// Creating TypedArrays
const buffer = new ArrayBuffer(16); // 16 bytes of raw memory

const int8 = new Int8Array(buffer);      // 16 elements (1 byte each)
const uint8 = new Uint8Array(buffer);    // 16 elements (unsigned)
const int16 = new Int16Array(buffer);    // 8 elements (2 bytes each)
const uint32 = new Uint32Array(buffer);  // 4 elements (4 bytes each)
const float64 = new Float64Array(buffer); // 2 elements (8 bytes each)
const uint8Clamped = new Uint8ClampedArray(buffer); // clamped 0-255

// Direct creation
const scores = new Uint8Array([95, 87, 100, 73]); // from array
const zeros = new Uint32Array(10); // 10 zeros
const fromStr = Uint8Array.from("hello"); // [104, 101, 108, 108, 111]

// Properties
scores.length;   // 4
scores.byteLength; // 4
scores.BYTES_PER_ELEMENT; // 1

// Values clamp for Uint8Clamped
const clamped = new Uint8ClampedArray(1);
clamped[0] = 300;  // clamped to 255
clamped[0] = -10;  // clamped to 0

// Practical: Canvas pixel data
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixels = new Uint8ClampedArray(imageData.data.buffer);

// Modify pixels (grayscale)
for (let i = 0; i < pixels.length; i += 4) {
  const gray = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
  pixels[i] = pixels[i + 1] = pixels[i + 2] = gray; // R=G=B
}
ctx.putImageData(imageData, 0, 0);

// DataView — fine-grained access
const view = new DataView(buffer);
view.setInt32(0, 42, true);     // little-endian 32-bit int at byte 0
view.setUint16(4, 255, false);  // big-endian 16-bit uint at byte 4
view.getFloat64(8, true);       // little-endian 64-bit float at byte 8
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q143. What is `Atomics.waitAsync`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Atomics.waitAsync` (ES2024) is a **non-blocking** version of `Atomics.wait` that returns a Promise instead of blocking the thread.

```js
const sab = new SharedArrayBuffer(4);
const i32 = new Int32Array(sab);
i32[0] = 0;

// Atomics.wait — BLOCKS the thread (main thread: DON'T use!)
// Atomics.wait(i32, 0, 0); // ❌ Blocks main thread forever

// Atomics.waitAsync — returns a Promise (NON-blocking)
const result = Atomics.waitAsync(i32, 0, 0); // Wait for value to change from 0

console.log(result.async); // true — indicates it's waiting async

result.value.then(({ value }) => {
  console.log("Value changed, new value:", Atomics.load(i32, 0));
});

// Somewhere else (another worker or event):
setTimeout(() => {
  Atomics.store(i32, 0, 42);
  Atomics.notify(i32, 0, 1); // Notify waiter
}, 1000);

// If the value has already changed, result.async is false
i32[0] = 0; // Reset
Atomics.store(i32, 0, 99);
const immediate = Atomics.waitAsync(i32, 0, 0); // Wait for 0 — but it's 99!
console.log(immediate.async); // false
console.log(immediate.value); // "not-equal" — resolved immediately

// Practical: coordination between workers without blocking
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q144. What is microtask starvation and how do you prevent it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Microtask starvation** occurs when microtasks keep adding more microtasks, preventing macrotasks (including UI rendering) from ever executing.

```js
// ❌ Starvation example
function starve() {
  queueMicrotask(() => {
    // Processing...
    starve(); // Schedule another microtask
  });
}
starve(); // Never-ending microtask loop — UI freezes forever!

// ✅ Solution: Use macrotask breaks
function nonBlocking() {
  setTimeout(() => {
    // Processing...
    nonBlocking(); // Schedule as macrotask
  }, 0);
}

// ✅ Solution: Yield to event loop periodically
async function processBatch(items, batchSize = 100) {
  let index = 0;

  while (index < items.length) {
    // Process a batch synchronously
    const batch = items.slice(index, index + batchSize);
    for (const item of batch) {
      await processItem(item);
    }
    index += batchSize;

    // Yield to event loop (allow microtasks + UI to run)
    await new Promise(resolve => setTimeout(resolve, 0));
    // Or: await new Promise(queueMicrotask); ❌ still microtask!
    // Or: await null; // Still too fast — use setTimeout!
  }
}

// ✅ Solution: requestIdleCallback (browser)
function processWithIdleCallback(items) {
  let index = 0;

  function processChunk(deadline) {
    while (index < items.length && deadline.timeRemaining() > 0) {
      processItem(items[index]);
      index++;
    }

    if (index < items.length) {
      requestIdleCallback(processChunk);
    }
  }

  requestIdleCallback(processChunk);
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q145. What is the Tail Call Optimization?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Tail Call Optimization (TCO)** allows recursive functions to execute in constant stack space when the recursive call is in **tail position** (the last operation before returning).

```js
// ❌ NOT tail call — multiplies after return
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // ❌ multiplication after call
}

// ✅ Tail call — nothing after return
function factorialTCO(n, accumulator = 1) {
  if (n <= 1) return accumulator;
  return factorialTCO(n - 1, n * accumulator); // ✅ tail call
}

// Problem: Only Safari implements TCO properly
// Node.js (V8): TCO is NOT implemented
// Solution: Trampoline

// Trampoline technique
function trampoline(fn) {
  return function(...args) {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
}

function factorialTrampolined(n, acc = 1) {
  if (n <= 1) return acc;
  return () => factorialTrampolined(n - 1, n * acc); // returns function
}

const factorialSafe = trampoline(factorialTrampolined);
factorialSafe(100000); // Works without stack overflow!

// Alternative: explicit loop (always safest)
function factorialLoop(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q146. How do you implement async/await using generators?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`async/await` can be polyfilled using generators — each `await` is replaced by `yield`:

```js
function asyncToGenerator(generatorFn) {
  return function(...args) {
    const generator = generatorFn.apply(this, args);
    
    return new Promise((resolve, reject) => {
      function step(method, arg) {
        let result;
        try {
          result = generator[method](arg);
        } catch (error) {
          return reject(error);
        }
        
        const { value, done } = result;
        
        if (done) {
          resolve(value);
        } else {
          // Handle both Promises and non-Promise values
          Promise.resolve(value)
            .then(
              val => step("next", val),     // continue
              err => step("throw", err)      // throw in generator
            );
        }
      }
      
      step("next", undefined);
    });
  };
}

// Usage
const asyncFn = asyncToGenerator(function*() {
  const data1 = yield fetch("/api/data1").then(r => r.json());
  const data2 = yield fetch("/api/data2").then(r => r.json());
  return { data1, data2 };
});

asyncFn().then(result => console.log(result));

// The state machine pattern (how V8 actually implements it):
// Each await creates a state in the state machine
function fetchUser(id) {
  // Internal state machine
  let state = 0;
  let user, response;
  
  function next() {
    switch (state) {
      case 0:
        state = 1;
        return { value: fetch(`/api/users/${id}`), done: false };
      case 1:
        response = /* result */;
        state = 2;
        return { value: response.json(), done: false };
      case 2:
        user = /* result */;
        return { value: user, done: true };
    }
  }
  
  // ... wrapped in Promise machinery
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q147. Explain how V8's inline caching works.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Inline Caching (IC)** is a V8 optimization that caches the result of property lookups for objects with the same "shape" (hidden class).

```js
// Without IC: V8 needs to look up property each time
function getX(obj) {
  return obj.x; // Each call: traverse prototype chain → O(n)
}

// With IC: V8 remembers the result for the same shape
for (let i = 0; i < 1000; i++) {
  getX({ x: i, y: i * 2 }); // After first call, IC caches the offset of 'x'
}

// IC States:
// 1. UNINITIALIZED — No calls yet
// 2. MONOMORPHIC — Only 1 shape seen → fast path
// 3. POLYMORPHIC  — 2-4 shapes seen → lookup in small cache
// 4. MEGAMORPHIC  — 5+ shapes → full lookup (deoptimized)

// ✅ Monomorphic (fast)
function monomorphic(obj) { return obj.x; }
for (let i = 0; i < 10000; i++) {
  monomorphic({ x: i }); // Same shape every time → MONOMORPHIC → fastest
}

// ❌ Megamorphic (slow)
function megamorphic(obj) { return obj.x; }
for (let i = 0; i < 10000; i++) {
  // Each iteration creates a different shape (different property order!)
  megamorphic({ x: i, [`key${i}`]: i });
}

// Key practices for engine optimization:
// ✅ Always add properties in the same order
// ✅ Initialize all properties in constructor
// ❌ Never delete properties (changes shape)
// ❌ Never add properties dynamically (changes shape)
// ✅ Use classes (consistent shape)
// ✅ Use arrays for indexed data (fixed shapes)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q148. How does JavaScript handle `this` in arrow vs regular functions in different contexts?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
// Arrow functions: `this` is LEXICAL (from enclosing scope at definition time)
// Regular functions: `this` is DYNAMIC (determined by call site)

// Context 1: Object method
const obj = {
  name: "Alice",
  
  regular() {
    console.log(this.name); // "Alice" (obj is caller)
  },
  
  arrow: () => {
    console.log(this.name); // undefined (this = outer scope, likely Window)
  }
};

// Context 2: DOM event handlers
button.addEventListener("click", function() {
  console.log(this); // button element
});

button.addEventListener("click", () => {
  console.log(this); // Window (lexical — from enclosing scope)
});

// Context 3: setTimeout
const timer = {
  name: "Timer",
  startRegular() {
    setTimeout(function() {
      console.log(this.name); // undefined (this = Window)
    }, 100);
  },
  startArrow() {
    setTimeout(() => {
      console.log(this.name); // "Timer" (lexical from startArrow)
    }, 100);
  }
};

// Context 4: Class
class MyClass {
  name = "instance";
  
  regularMethod() {
    return this.name;
  }
  
  arrowMethod = () => {
    return this.name; // Lexical — bound to instance
  }
}

const instance = new MyClass();
const { regularMethod, arrowMethod } = instance;
regularMethod(); // undefined (this lost)
arrowMethod();   // "instance" (arrow captures this from class field)

// Context 5: Constructor
function RegularPerson(name) {
  this.name = name;  // this = new instance
}
const ArrowPerson = (name) => {
  this.name = name;  // Cannot be used with `new`!
};
// new ArrowPerson("Alice"); // ❌ TypeError: ArrowPerson is not a constructor
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q149. What is `Function.prototype.toString` and how is it used?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Function.prototype.toString()` returns the source code of a function (including comments in modern engines).

```js
function greet(name) {
  // This is a greeting function
  return `Hello, ${name}!`;
}

console.log(greet.toString());
// "function greet(name) {
//   // This is a greeting function
//   return `Hello, ${name}!`;
// }"

// Uses:
// 1. Serialization (send functions to Web Workers via postMessage)
worker.postMessage({ type: "process", fn: myFunction.toString() });

// 2. Source code inspection / debugging
// 3. Hot reloading (replace function implementations)
// 4. Creating dynamic code

// ⚠️ Limitations:
// - Native functions return "[native code]"
Math.max.toString(); // "function max() { [native code] }"

// - Bound functions return target function's source
const bound = greet.bind(null);
bound.toString(); // Same as greet.toString()

// - Arrow functions show source as-is
const arrow = (x) => x * 2;
arrow.toString(); // "(x) => x * 2"

// - Minified/obfuscated code loses formatting
// - ES2020 spec requires returning exact source (including comments)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q150. How does JavaScript handle error stack traces?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Stack traces show the path of function calls that led to an error.

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  throw new Error("Something went wrong in c");
}

try {
  a();
} catch (error) {
  console.log(error.stack);
  // Error: Something went wrong in c
  //     at c (file.js:10:11)
  //     at b (file.js:6:5)
  //     at a (file.js:2:5)
  //     at file.js:14:5
}

// Error.captureStackTrace (V8-specific)
function CustomError(message) {
  this.name = "CustomError";
  this.message = message;
  
  // Capture stack trace, excluding this constructor
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, CustomError);
  }
}
CustomError.prototype = Object.create(Error.prototype);

// Stack trace format (V8):
// <ErrorType>: <message>
//     at <name> (<file>:<line>:<column>)
//     at <name> (<file>:<line>:<column>)
//     ...

// Async stack traces
async function asyncA() {
  await asyncB();
}

async function asyncB() {
  throw new Error("Async error");
}

asyncA().catch(err => {
  console.log(err.stack);
  // Modern engines (V8, SpiderMonkey) preserve async stack:
  // Error: Async error
  //     at asyncB (file.js:7:11)
  //     at asyncA (file.js:3:11)
  //     at file.js:10:5
});

// Limiting stack trace
Error.stackTraceLimit = 50; // V8 default is 10 frames
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q151. How does the `console` object work? What's its impact on performance?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The `console` object provides debugging facilities. It's **not** part of the JavaScript language — it's provided by the runtime (browser/Node.js).

```js
// Logging levels
console.log("General info");
console.info("Information");
console.warn("Warning — not an error");
console.error("Error — includes stack trace");
console.debug("Debug details (hidden by default)");

// Formatting
console.log("%s is %d years old", "Alice", 30);
console.log("%cStyled text", "color: red; font-size: 20px;");
console.log({ name: "Alice", age: 30 }); // Object tree
console.table([{ name: "Alice" }, { name: "Bob" }]); // Table view

// Grouping
console.group("User Details");
console.log("Name: Alice");
console.log("Age: 30");
console.groupEnd();

// Timing
console.time("fetch");
await fetch("/api/data");
console.timeEnd("fetch"); // "fetch: 234ms"

// Counting
console.count("click"); // "click: 1"
console.count("click"); // "click: 2"

// Tracing
console.trace("Where was I called?");

// Performance impact ⚠️
// Console.log in production CAN slow down your app!
// Especially logging large objects — serialization is expensive
// In Node.js: console.log is synchronous (blocks the event loop)
// In browsers: console.log may cause re-renders in DevTools

// Best practices:
// - Remove console.log in production (or use a logger that can be silenced)
// - Use conditional logging: if (DEBUG) console.log(...)
// - Don't log large objects in hot code paths
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q152. What is the `Intl.Segmenter` API?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Intl.Segmenter` (ES2023) splits text into linguistic segments — graphemes, words, or sentences.

```js
const text = "Hello 👋 World! How are you? 🌟";

// Grapheme segmentation (user-perceived characters)
const graphemeSeg = new Intl.Segmenter("en", { granularity: "grapheme" });
const graphemes = [...graphemeSeg.segment(text)];
graphemes.forEach(({ segment, index }) => {
  console.log(`"${segment}" at ${index}`);
});
// "H" at 0, "e" at 1, "l" at 2, "l" at 3, "o" at 4,
// " " at 5, "👋" at 6, " " at 7, "W" at 8, ...

// Word segmentation
const wordSeg = new Intl.Segmenter("en", { granularity: "word" });
[...wordSeg.segment(text)].forEach(w => {
  if (w.isWordLike) console.log(`Word: "${w.segment}"`);
});
// Word: "Hello", Word: "World", Word: "How", Word: "are", Word: "you"

// Sentence segmentation
const sentSeg = new Intl.Segmenter("en", { granularity: "sentence" });
[...sentSeg.segment("Hello! How are you? I'm fine.")].forEach(s => {
  console.log(`Sentence: "${s.segment}"`);
});
// Sentence: "Hello! ", Sentence: "How are you? ", Sentence: "I'm fine."

// 🌟 Crucial for internationalization!
// "👨‍👩‍👧‍👦".length → 11 (code units)
// [..."👨‍👩‍👧‍👦"].length → 4 (but it's ONE grapheme!)
// Intl.Segmenter correctly identifies it as one grapheme
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q153. What is `Promise.allSettled` and when would you use it over `Promise.all`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Promise.allSettled` waits for ALL promises to settle (resolve or reject), never rejects itself.

```js
// Scenario: Load user data, don't fail if some requests fail
const promises = [
  fetch("/api/user/profile"),
  fetch("/api/user/posts"),
  fetch("/api/user/notifications"),
  fetch("/api/user/settings") // This might fail
];

// Promise.all — fails fast if ANY fails
try {
  const [profile, posts, notif, settings] = await Promise.all(promises);
  // If settings fails, we lose ALL data!
} catch {
  // Everything fails — even profile and posts that succeeded!
}

// Promise.allSettled — handles partial failures gracefully
const results = await Promise.allSettled(promises);

const data = {
  profile: null,
  posts: [],
  notifications: [],
  theme: "default"
};

results.forEach((result, index) => {
  if (result.status === "fulfilled") {
    switch (index) {
      case 0: data.profile = result.value; break;
      case 1: data.posts = result.value; break;
      case 2: data.notifications = result.value; break;
      case 3: data.settings = result.value; break;
    }
  } else {
    console.warn(`Request ${index} failed:`, result.reason);
  }
});

// Render with partial data
render(data);

// Custom allSettled polyfill
function allSettled(promises) {
  return Promise.all(
    Array.from(promises).map(p =>
      Promise.resolve(p)
        .then(value => ({ status: "fulfilled", value }))
        .catch(reason => ({ status: "rejected", reason }))
    )
  );
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q154. How does `Symbol.toStringTag` and `Symbol.hasInstance` work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
// Symbol.toStringTag — customize Object.prototype.toString output
class CustomCollection {
  get [Symbol.toStringTag]() {
    return "CustomCollection";
  }
}

const cc = new CustomCollection();
Object.prototype.toString.call(cc); // "[object CustomCollection]"

// Without toStringTag:
Object.prototype.toString.call([]);  // "[object Array]"
Object.prototype.toString.call({});  // "[object Object]"
Object.prototype.toString.call(new Map()); // "[object Map]" (has built-in toStringTag)

// Symbol.hasInstance — customize instanceof behavior
class PositiveNumber {
  static [Symbol.hasInstance](value) {
    return typeof value === "number" && value > 0;
  }
}

console.log(5 instanceof PositiveNumber);   // true
console.log(-5 instanceof PositiveNumber);  // false
console.log("hello" instanceof PositiveNumber); // false

// Override built-in Array instanceof
class MyArray extends Array {
  static [Symbol.hasInstance](value) {
    return Array.isArray(value); // Any array is "instanceof" MyArray
  }
}

[] instanceof MyArray; // true — even though [] is not MyArray's instance!

// Practical: type checking
class StringOrNumber {
  static [Symbol.hasInstance](value) {
    return typeof value === "string" || typeof value === "number";
  }
}

"hello" instanceof StringOrNumber; // true
42 instanceof StringOrNumber;      // true
true instanceof StringOrNumber;    // false
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q155. What are `globalThis`, `window`, `global`, and `self` differences?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Different JavaScript environments have different global objects:

```js
// Browser: window, self, frames, this (non-strict module scope)
console.log(window);              // Window object
console.log(this === window);     // true (script scope, non-strict)
console.log(self === window);     // true (Web Workers: self, not window)

// Node.js: global
console.log(global);              // Node.js global object
console.log(globalThis);          // Works everywhere

// Web Worker: self (NOT window)
// self.postMessage(), self.onmessage
console.log(self);                // DedicatedWorkerGlobalScope
// console.log(window);           // ❌ ReferenceError (no window)

// globalThis: ES2020, works in ALL environments
console.log(globalThis);
// Browser: Window
// Node.js: global
// Deno: Window (Deno acts like browser)
// Web Worker: DedicatedWorkerGlobalScope

// Practical differences matrix:
const env = {
  hasWindow: typeof window !== "undefined",
  hasGlobal: typeof global !== "undefined",
  hasSelf: typeof self !== "undefined",
  hasDocument: typeof document !== "undefined",
  hasProcess: typeof process !== "undefined",
  isBrowser: typeof window !== "undefined" && typeof document !== "undefined",
  isNode: typeof process !== "undefined" && process.versions?.node,
  isWorker: typeof self !== "undefined" && typeof Window === "undefined",
  isDeno: typeof Deno !== "undefined"
};

// Add global variables safely
function setGlobal(key, value) {
  globalThis[key] = value;
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q156. How does garbage collection work with closures?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Closures keep references to their outer scope — this prevents garbage collection of those variables as long as the closure exists.

```js
// Memory retained by closure
function createProcessor(data) {
  // `data` is kept in memory for the closure's lifetime
  const largeArray = new Array(1000000).fill(data);
  
  return {
    process() {
      return largeArray.map(x => x * 2);
    },
    getLength() {
      return largeArray.length;
    }
  };
}

const processor = createProcessor(42);
// largeArray CANNOT be GC'd — the returned object's methods
// (process, getLength) close over it

processor = null;
// Now largeArray can be GC'd (no references to the closure remain)

// Optimizing memory with closures
function createOptimized(data) {
  // Only keep what's needed
  const length = new Array(1000000).fill(data).length; // extract what's needed
  
  return {
    getLength() {
      return length; // Only closes over the small `length` variable
    }
    // large array can be GC'd because it's NOT referenced by closure
  };
}

// Even more explicit: release references
function createManager() {
  let resource = null;
  
  return {
    init() {
      resource = loadHeavyResource(); // Large object
    },
    process() {
      return resource.process();
    },
    destroy() {
      resource = null; // Explicit release — allows GC
    }
  };
}

const manager = createManager();
manager.init();
manager.process();
manager.destroy(); // Release — GC can collect resource
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q157. How does `Object.seal` affect property descriptors?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Object.seal()` sets all properties' `configurable` descriptor to `false` while keeping `writable` unchanged.

```js
const obj = { x: 1, get y() { return 2; } };
Object.seal(obj);

// After seal:
// - configurable: false (all properties)
// - writable: unchanged

const descX = Object.getOwnPropertyDescriptor(obj, "x");
console.log(descX.configurable); // false
console.log(descX.writable);     // true (unchanged)

Object.freeze() additionally sets writable to false.

// Practical impact:
obj.x = 99;        // ✅ Allowed (writable still true)
delete obj.x;       // ❌ Blocked (configurable = false)
obj.z = 3;          // ❌ Blocked (not extensible)

// Configurable = false means:
// ❌ Cannot delete property
// ❌ Cannot change configurable/writable/enumerable flags
// ❌ Cannot change getter/setter (accessor descriptor)
// ✅ Can still change VALUE if writable is true

// Property descriptor states after seal:
// Data properties: { value: 1, writable: true (unchanged), enumerable: true (unchanged), configurable: false }
// Accessor properties: { get: [Function], set: undefined, enumerable: true (unchanged), configurable: false }

// Can't convert between data and accessor descriptors after seal
Object.defineProperty(obj, "x", { get() { return 1; } }); // ❌ TypeError (can't convert)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q158. What is `RegExp` `lastIndex` and sticky flag?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`lastIndex` tracks where the next search starts in a regex with `g` or `y` flags.

```js
const text = "hello world hello";

// Global flag — continues from lastIndex
const globalRegex = /hello/g;
console.log(globalRegex.exec(text)); // "hello" at index 0
console.log(globalRegex.lastIndex);  // 5
console.log(globalRegex.exec(text)); // "hello" at index 12
console.log(globalRegex.lastIndex);  // 17
console.log(globalRegex.exec(text)); // null (no more)
console.log(globalRegex.lastIndex);  // 0 (reset)

// Sticky flag (y) — only matches at lastIndex (no searching ahead)
const stickyRegex = /hello/y;
stickyRegex.lastIndex = 0;
console.log(stickyRegex.exec(text)); // "hello" at index 0 (matches at position 0)
stickyRegex.lastIndex = 0;
console.log(stickyRegex.exec(text)); // "hello" again (always position 0)

// Key difference: sticky requires match at EXACT lastIndex
const gRegex = /ll/g;
gRegex.exec(text); // "ll" at index 2 (searches for "ll" anywhere)

const yRegex = /ll/y;
yRegex.lastIndex = 0;
yRegex.exec(text); // null — "ll" doesn't start at index 0!

yRegex.lastIndex = 2;
yRegex.exec(text); // "ll" at index 2 (matches at position 2)

// Practical: tokenizer with sticky regex
function tokenize(code) {
  const tokens = [];
  const rules = [
    [/number/y, /\d+/y],
    [/string/y, /"[^"]*"/y],
    [/ident/y, /[a-z]+/y],
    [/space/y, /\s+/y],
    [/op/y, /[+\-*/]/y],
  ];
  
  let pos = 0;
  while (pos < code.length) {
    let matched = false;
    
    for (const [type, regex] of rules) {
      regex.lastIndex = pos;
      const m = regex.exec(code);
      if (m) {
        tokens.push({ type, value: m[0], pos });
        pos = regex.lastIndex;
        matched = true;
        break;
      }
    }
    
    if (!matched) throw new Error(`Unexpected char at ${pos}`);
  }
  
  return tokens;
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q159. What are `RegExp` named capture groups?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Named capture groups (ES2018) give names to capture groups, making regexes more readable.

```js
// Before — numbered groups (fragile, hard to read)
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
const match = "2024-12-25".match(dateRegex);
const year = match[1];  // "2024" — magic number!
const month = match[2]; // "12"
const day = match[3];   // "25"

// After — named groups (clear, self-documenting)
const namedRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const namedMatch = "2024-12-25".match(namedRegex);
const { year, month, day } = namedMatch.groups;
// year = "2024", month = "12", day = "25"

// With destructuring
const { groups: { year: y, month: m, day: d } } = "2024-12-25".match(namedRegex);

// Replace with named backreferences
const dateStr = "2024-12-25";
const reformatted = dateStr.replace(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  "$<month>/$<day>/$<year>"
); // "12/25/2024"

// Nested groups
const urlRegex = /(?<protocol>https?):\/\/(?<domain>[^/]+)(?<path>\/.*)?/;
const url = "https://example.com/users/123";
const { groups: { protocol, domain, path } } = url.match(urlRegex);
// protocol = "https", domain = "example.com", path = "/users/123"

// Real-world: log parser
const logRegex = /^\[(?<timestamp>[^\]]+)\] (?<level>INFO|WARN|ERROR) (?<message>.+)$/;
const logLine = "[2024-01-15T10:30:00Z] ERROR User authentication failed";
const { groups: log } = logLine.match(logRegex);
// log.timestamp = "2024-01-15T10:30:00Z"
// log.level = "ERROR"
// log.message = "User authentication failed"
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q160. How does the JavaScript Module Loading work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

ES Module loading follows a specific algorithm with three phases:

**Phase 1: Construction (Parse)**
1. **Module Resolution** — Find the file (URL resolution)
2. **Fetching** — Download the file (network or file system)
3. **Parsing** — Parse to Module Record (static analysis)

**Phase 2: Instantiation**
- Create module instances
- Allocate memory for exports (but NOT yet initialized)
- Wire up export/import bindings (live bindings)

**Phase 3: Evaluation**
- Execute module code top-to-bottom
- Initialize exported values
- Handle side effects

```js
// Module resolution algorithm:
// import { x } from "./module"
// 1. "./module" → "./module.js" or "./module/index.js" or "./module.mjs"
// 2. Cache check (same URL returns cached module)
// 3. Fetch → Parse → Instantiate → Evaluate

// Circular dependencies are handled differently from CommonJS
// In ESM: "live bindings" allow references across cycles
// In CJS: exports are copied at require time

// export/import are "live bindings" — changes are visible across modules
// counter.mjs
export let count = 0;
export function increment() { count++; }

// main.mjs
import { count, increment } from "./counter.mjs";
console.log(count); // 0
increment();
console.log(count); // 1 ✅ — live binding!

// vs CommonJS — copied value
// counter.js
let count = 0;
module.exports = { count, increment: () => count++ };

// main.js
const { count, increment } = require("./counter");
console.log(count); // 0
increment();
console.log(count); // 0 ❌ — still 0! (copy, not live binding)
```

**Execution order with imports:**
```
// a.mjs
import "./b.mjs";
console.log("A");

// b.mjs
console.log("B");
// Output: B → A
// (b.mjs is fully evaluated before a.mjs continues)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q161. What are `ArrayBuffer`, `SharedArrayBuffer`, and `DataView`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```js
// ArrayBuffer — fixed-length raw binary data buffer
const buffer = new ArrayBuffer(16); // 16 bytes
console.log(buffer.byteLength); // 16

// Cannot access directly — need a "view"
const view1 = new Int32Array(buffer); // 4 integers (32-bit each)
const view2 = new Uint8Array(buffer);  // 16 unsigned bytes
const view3 = new Float64Array(buffer); // 2 double-precision floats

// All views share the same memory
view1[0] = 0x12345678;
console.log(view2[0]); // 0x78 (little-endian: least significant byte first)

// SharedArrayBuffer — accessible from multiple threads
const sab = new SharedArrayBuffer(8);
const shared = new Int32Array(sab);

// DataView — fine-grained control (byte offsets, endianness)
const dv = new DataView(buffer);

// Reading/writing at specific byte offsets
dv.setInt32(0, 42, true);    // Little-endian 32-bit int at byte 0
dv.setUint16(4, 255, false); // Big-endian 16-bit uint at byte 4
dv.setFloat32(6, 3.14, true); // Little-endian 32-bit float at byte 6

dv.getInt32(0, true);  // 42 (read back)
dv.getUint16(4, false); // 255
dv.getFloat32(6, true); // 3.14

// Available typed arrays:
// Int8Array, Uint8Array, Uint8ClampedArray
// Int16Array, Uint16Array
// Int32Array, Uint32Array
// Float32Array, Float64Array
// BigInt64Array, BigUint64Array

// Practical: binary file processing
async function readFileHeader(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const view = new DataView(buffer);
  
  const magic = view.getUint32(0, false);  // Big-endian magic number
  const version = view.getUint16(4, false); // Version
  const flags = view.getUint8(6);           // Flags byte
  
  return { magic, version, flags };
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q162. How does `Symbol.match`, `Symbol.replace`, and `Symbol.search` work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

These well-known symbols customize how an object behaves with `String.prototype` methods.

```js
// Symbol.match — customizes str.match(obj)
class StartsWith {
  [Symbol.match](string) {
    return string.startsWith(this.prefix) ? [this.prefix] : null;
  }
  constructor(prefix) { this.prefix = prefix; }
}

"Hello World".match(new StartsWith("Hello")); // ["Hello"]
"Goodbye World".match(new StartsWith("Hello")); // null

// Symbol.replace — customizes str.replace(obj, replacement)
class Redact {
  [Symbol.replace](string, replacement) {
    return string.split(this.pattern).join(replacement || "***");
  }
  constructor(pattern) { this.pattern = pattern; }
}

const redact = new Redact(/password|secret/gi);
"Your password is secret".replace(redact, "REDACTED");
// "Your REDACTED is REDACTED"

// Symbol.search — customizes str.search(obj)
class ContainsDigit {
  [Symbol.search](string) {
    for (let i = 0; i < string.length; i++) {
      if (/\d/.test(string[i])) return i;
    }
    return -1;
  }
}

"abc123".search(new ContainsDigit()); // 3
"abc".search(new ContainsDigit());    // -1

// Symbol.split — customizes str.split(obj)
class SplitLines {
  [Symbol.split](string) {
    return string.split(/\r?\n/);
  }
}

"line1\nline2\nline3".split(new SplitLines());
// ["line1", "line2", "line3"]

// Practical: creating custom pattern objects
class CaseInsensitivePattern {
  constructor(pattern) {
    this.pattern = pattern;
  }
  
  [Symbol.match](string) {
    return string.match(new RegExp(this.pattern, "gi"));
  }
  
  [Symbol.replace](string, replacement) {
    return string.replace(new RegExp(this.pattern, "gi"), replacement);
  }
}

const pattern = new CaseInsensitivePattern("hello");
"Hello HELLO hello".match(pattern); // ["Hello", "HELLO", "hello"]
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q163. How does the `with` statement work (and why is it deprecated)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`with` extends the scope chain for a block, making object properties accessible as variables. It's **deprecated and forbidden in strict mode**.

```js
const obj = { a: 1, b: 2, c: 3 };

// ❌ Deprecated — don't use this!
with (obj) {
  console.log(a); // 1 (reads obj.a)
  console.log(b); // 2 (reads obj.b)
  a = 99;         // Sets obj.a = 99
  c = { x: 1 };   // Sets obj.c = { x: 1 }
}

// Problems with `with`:
// 1. Ambiguity — can't tell if a is variable or property
// 2. Performance — V8 can't optimize (unknown scope at parse time)
// 3. Confusing errors — accidentally creating globals

function bad() {
  "use strict";
  // with (obj) {} // ❌ SyntaxError in strict mode
}

// What could go wrong:
with (obj) {
  // Is `value` a property of obj or a variable?
  // JavaScript checks obj first, then outer scopes
  value = 100; // If obj has no 'value' property → creates global!
}

// Modern alternatives:
// 1. Destructuring
const { a, b, c } = obj;
console.log(a, b, c);

// 2. Chaining
console.log(obj.a, obj.b, obj.c);

// 3. Short aliases
const o = obj;
console.log(o.a, o.b, o.c);
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q164. What is the `eval()` function and why is it dangerous?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`eval()` executes arbitrary JavaScript code from a string. It's considered dangerous due to security and performance implications.

```js
// What it does
const result = eval("2 + 2"); // 4
eval("const x = 10; console.log(x)"); // 10

// ⚠️ Security risks
const userInput = "'; process.env.SECRET = 'stolen'; '";
eval(`getData('${userInput}')`); // ❌ Code injection!

// ⚠️ Performance impact
// - Cannot be optimized by JIT (unknown code)
// - V8 deoptimizes the entire containing function
// - Prevents hidden class optimizations

// ⚠️ Scope access
function test() {
  const secret = "hidden";
  eval("console.log(secret)"); // "hidden" — can access local scope!
}

// Safer alternatives:
// 1. JSON.parse() — for parsing JSON (NOT eval!)
// ❌ const data = eval("(" + json + ")");
// ✅ const data = JSON.parse(json);

// 2. Function constructor (slightly safer, still bad)
const fn = new Function("a", "b", "return a + b");
fn(2, 3); // 5
// Function creates in global scope — can't access local vars

// 3. Don't execute user code

// When eval might be acceptable (rare):
// - JSON parsing in ancient browsers (use JSON.parse now)
// - Code runners/playgrounds (with proper sandboxing)
// - Template engines (but use proper parsers instead)

// Indirect eval — slightly safer (global scope only)
const globalEval = (0, eval); // indirect eval call
globalEval("var globalVar = 'global'"); // Creates GLOBAL variable
// But still dangerous!
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q165. How does `Object.prototype.toString.call()` work for type checking?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Object.prototype.toString.call()` uses `Symbol.toStringTag` to return the internal class of any value.

```js
// Reliable type checking
function getType(value) {
  return Object.prototype.toString.call(value);
}

getType(42);           // "[object Number]"
getType("hello");      // "[object String]"
getType(true);         // "[object Boolean]"
getType(null);         // "[object Null]"
getType(undefined);    // "[object Undefined]"
getType({});           // "[object Object]"
getType([]);           // "[object Array]"
getType(/hello/);      // "[object RegExp]"
getType(new Date());   // "[object Date]"
getType(new Map());    // "[object Map]"
getType(new Set());    // "[object Set]"
getType(Promise.resolve()); // "[object Promise]"
getType(function(){}); // "[object Function]"
getType(Symbol());     // "[object Symbol]"
getType(42n);          // "[object BigInt]"
getType(new Error());  // "[object Error]"

// Custom type checking
function isPlainObject(value) {
  return getType(value) === "[object Object]";
}

function isRegExp(value) {
  return getType(value) === "[object RegExp]";
}

// Customizing with Symbol.toStringTag
class MyClass {
  get [Symbol.toStringTag]() { return "MyCustomClass"; }
}
getType(new MyClass()); // "[object MyCustomClass]"

// vs typeof (limited):
typeof null;   // "object" — wrong
typeof [];     // "object"
typeof /regex/; // "object"

// vs instanceof (fails across realms/iframes):
[] instanceof Array; // true, but:
// In different iframe: [] instanceof iframe.Array → false
// Object.prototype.toString always works across realms
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q166. How does `Object.is()` differ from `===` for `NaN` and `-0`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Object.is()` uses the **SameValue** algorithm, which differs from `===` (Strict Equality) in two edge cases.

```js
// === (Strict Equality) with SameValue comparison:
console.log(NaN === NaN);  // false ← confusing!
console.log(0 === -0);     // true  ← hides sign difference!
console.log(-0 === -0);    // true

// Object.is (SameValue):
console.log(Object.is(NaN, NaN));  // true  ← corrected!
console.log(Object.is(0, -0));     // false ← distinguishes!
console.log(Object.is(-0, -0));    // true

// Internal algorithm (SameValue):
function sameValue(x, y) {
  if (x === y) {
    // Handle +0 !== -0
    return x !== 0 || 1 / x === 1 / y;
  }
  // Handle NaN === NaN
  return x !== x && y !== y;
}

// Practical implications:
// 1. Array.indexOf() uses === → can't find NaN
[1, NaN].indexOf(NaN); // -1 ❌

// 2. Array.includes() uses SameValueZero → CAN find NaN
[1, NaN].includes(NaN); // true ✅

// 3. Map keys use SameValueZero → NaN as key works
const map = new Map();
map.set(NaN, "found");
map.get(NaN); // "found" ✅

// 4. Set uses SameValueZero
const set = new Set([1, NaN, NaN]);
set.size; // 2 (NaN only stored once) ✅

// 5. Object.is for property comparison in React
// if (!Object.is(nextProp, prevProp)) { /* update */ }
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q167. What is the `Proxy` revocable pattern?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`Proxy.revocable()` creates a Proxy that can be **permanently disabled** — all operations throw after revocation.

```js
const target = { secret: "classified" };
const { proxy, revoke } = Proxy.revocable(target, {
  get(obj, prop) {
    if (prop === "secret" && !isAuthenticated) {
      throw new Error("Access denied");
    }
    return obj[prop];
  }
});

// Use proxy normally
console.log(proxy.secret); // Works if authenticated

// Revoke — permanently disable the proxy
revoke();

// After revocation, any operation on proxy throws
console.log(proxy.secret);  // ❌ TypeError: Cannot perform 'get' on a proxy that has been revoked
console.log(proxy.anything); // ❌ TypeError

// Practical: Finite lifetime objects
function createEphemeralResource(timeout = 5000) {
  const resource = {
    data: "sensitive data",
    access() { console.log("Accessed"); },
    cleanup() { console.log("Cleaned up"); }
  };
  
  const { proxy, revoke } = Proxy.revocable(resource, {
    get(target, prop) {
      if (typeof target[prop] === "function") {
        return function(...args) {
          return target[prop].apply(this, args);
        };
      }
      return target[prop];
    }
  });
  
  // Auto-revoke after timeout
  setTimeout(() => {
    revoke();
    resource.cleanup();
    console.log("Resource revoked");
  }, timeout);
  
  return proxy;
}

const resource = createEphemeralResource(3000);
resource.access(); // Works
// After 3 seconds: resource.access() → TypeError

// Use cases:
// - Grant temporary access (API tokens, permissions)
// - Test isolation (each test gets fresh proxy)
// - Web Component lifecycle management
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q168. What is `Atomics` and how do you use it for thread-safe operations?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The `Atomics` object provides **atomic operations** on `SharedArrayBuffer` — guaranteeing that operations complete without interruption.

```js
const sab = new SharedArrayBuffer(4 * 4);
const shared = new Int32Array(sab);

// Atomic read/write
Atomics.load(shared, 0);        // Read value at index 0
Atomics.store(shared, 0, 42);  // Write value at index 0

// Atomic arithmetic
Atomics.add(shared, 0, 5);     // shared[0] += 5
Atomics.sub(shared, 0, 3);     // shared[0] -= 3
Atomics.and(shared, 0, 0xFF);  // bitwise AND
Atomics.or(shared, 0, 0xF0);   // bitwise OR
Atomics.xor(shared, 0, 0x0F);  // bitwise XOR

// Atomic exchange
Atomics.exchange(shared, 0, 100);          // Set to 100, return old value
Atomics.compareExchange(shared, 0, 100, 200); // If == 100, set to 200

// Synchronization primitives
// Atomics.wait — BLOCKING (never use on main thread!)
// Atomics.notify — wake waiting threads

// Simple mutex implementation
class Mutex {
  constructor(sab = new SharedArrayBuffer(4)) {
    this.lock = new Int32Array(sab);
    this.lock[0] = 0; // 0 = unlocked, 1 = locked
  }
  
  lock() {
    while (true) {
      if (Atomics.compareExchange(this.lock, 0, 0, 1) === 0) {
        return; // Acquired
      }
      // Optional: yield to avoid busy-waiting
      Atomics.wait(this.lock, 0, 1);
    }
  }
  
  unlock() {
    Atomics.store(this.lock, 0, 0);
    Atomics.notify(this.lock, 0, 1);
  }
}

// Usage in workers
const sab = new SharedArrayBuffer(4);
const mutex = new Mutex(sab);

// Critical section
mutex.lock();
try {
  // Safely modify shared memory
  shared[0]++;
} finally {
  mutex.unlock();
}

// Atomics.waitAsync (ES2024) — non-blocking version
Atomics.waitAsync(shared, 0, 0).then(result => {
  console.log("Value changed:", result);
});
```

</div>
</details>

---

## 📊 Summary

| Level | Questions | Topics Covered |
|-------|-----------|----------------|
| 🟢 Easy | Q1–Q50 | History, data types, variables, operators, functions, scope, arrays, strings, objects, `this`, basic async |
| 🟡 Medium | Q51–Q110 | Event Loop, Promises, async/await, closures, prototypes, classes, DOM, modules, Map/Set, Proxy, storage |
| 🔴 Hard | Q111–Q168 | GC internals, V8 optimization, engines, patterns, memory model, concurrency, latest ES features, typed arrays |

---

*Covers 168 JavaScript interview questions from beginner to advanced, spanning ES5 through ES2024, suitable for 0–10+ years of experience.*
