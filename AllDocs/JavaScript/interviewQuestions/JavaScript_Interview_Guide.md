# 🚀 JavaScript Interview Preparation Guide
### *A Premium Handbook by a Senior JavaScript Engineer*

> **Crafted with 15+ years of interviewing experience at Google, Amazon, Microsoft, Netflix, and Meta.**
> This guide covers the **first 50 most critical JavaScript interview questions** — from beginner to advanced — across 15 core topics. Every question includes real code, tricky edge cases, and tips that actually get you hired.

---

## 📋 Table of Contents

| # | Topic | Questions |
|---|-------|-----------|
| 1 | JavaScript Introduction | Q1–Q3 |
| 2 | Variables (var, let, const) | Q4–Q7 |
| 3 | Data Types | Q8–Q11 |
| 4 | Type Conversion | Q12–Q14 |
| 5 | Operators | Q15–Q17 |
| 6 | Control Flow | Q18–Q20 |
| 7 | Functions | Q21–Q24 |
| 8 | Arrow Functions | Q25–Q27 |
| 9 | Scope | Q28–Q30 |
| 10 | Hoisting | Q31–Q33 |
| 11 | Closures | Q34–Q37 |
| 12 | Execution Context | Q38–Q40 |
| 13 | Call Stack | Q41–Q43 |
| 14 | Memory Management | Q44–Q47 |
| 15 | Strict Mode | Q48–Q50 |

---

## 🟢 BEGINNER QUESTIONS (Q1–Q20)

---

### Q1 · Beginner · JavaScript Introduction

## What is JavaScript? How is it different from Java?

**Detailed Answer:**
JavaScript is a **lightweight, interpreted, single-threaded, dynamically typed** scripting language primarily used to make web pages interactive. It was created by Brendan Eich in 1995 in just 10 days at Netscape. Despite its name, JavaScript has almost nothing in common with Java — the naming was a marketing decision.

| Feature | JavaScript | Java |
|---------|-----------|------|
| Type System | Dynamic (types resolved at runtime) | Static (types at compile time) |
| Compilation | Interpreted / JIT compiled | Compiled to bytecode |
| Threading | Single-threaded (event loop) | Multi-threaded |
| Usage | Browser + Node.js | Enterprise backend, Android |
| Memory | Garbage collected automatically | Garbage collected (JVM) |
| Syntax Origin | C-like, prototype-based OOP | C-like, class-based OOP |

**Simple Explanation:**
> Think of Java as a formal architect who plans everything upfront (types, structures). JavaScript is like a jazz musician — flexible, improvised, plays as it goes.

**Real-world Example:**
When you type in a search box and see instant suggestions — that's JavaScript running in your browser, making asynchronous calls to a server **without** reloading the page.

```javascript
// JavaScript in action — DOM manipulation + event handling
document.getElementById("searchBox").addEventListener("input", function (e) {
  const query = e.target.value;
  console.log(`Fetching suggestions for: ${query}`);
  // fetch(`/api/suggest?q=${query}`) — real-world AJAX call
});
```

**💡 Interview Tips:**
- Mention ECMAScript — JavaScript is the implementation; ECMAScript is the specification (maintained by TC39).
- Say "JavaScript is single-threaded but non-blocking thanks to the event loop."

**⚠️ Common Mistakes:**
- Saying "JavaScript is compiled" — it's JIT compiled in modern engines (V8, SpiderMonkey), but conceptually interpreted.
- Confusing JavaScript with Java.

**🔁 Follow-up Questions:**
1. What is ECMAScript? What version are we on?
2. What is the difference between JavaScript engine and JavaScript runtime?
3. Explain the V8 engine briefly.

---

### Q2 · Beginner · JavaScript Introduction

## What are the key features of JavaScript?

**Detailed Answer:**

JavaScript's power comes from a combination of features that no other language had when it launched:

| Feature | Description |
|---------|-------------|
| **Interpreted** | Executed line-by-line (with JIT optimization) |
| **Dynamic Typing** | Variable types determined at runtime |
| **Prototype-based OOP** | Objects inherit from other objects |
| **First-class Functions** | Functions are values — assignable, passable |
| **Event-driven** | Reacts to events (clicks, HTTP responses) |
| **Non-blocking I/O** | Async operations via event loop |
| **Cross-platform** | Runs in browsers, Node.js, Deno, Bun |

**Simple Explanation:**
> JavaScript is the Swiss Army knife of the web — it can do everything: run in the browser, on servers, on IoT devices, in mobile apps (React Native), and even in machine learning (TensorFlow.js).

**Real-world Example:**
Netflix uses JavaScript (Node.js) on the server to handle millions of concurrent streaming requests — leveraging its non-blocking I/O.

```javascript
// First-class functions — functions as values
const greet = function(name) {
  return `Hello, ${name}!`;
};

const sayHi = greet; // Assign function to another variable
console.log(sayHi("Google Interviewer")); // "Hello, Google Interviewer!"

// Functions passed as arguments (higher-order functions)
const names = ["Alice", "Bob", "Carol"];
const greeted = names.map(greet);
console.log(greeted); // ["Hello, Alice!", "Hello, Bob!", "Hello, Carol!"]
```

**💡 Interview Tips:**
- Emphasize **first-class functions** — this is the foundation of closures, callbacks, and functional programming in JS.
- Mention that JavaScript is **multi-paradigm**: OOP, functional, and procedural.

**⚠️ Common Mistakes:**
- Forgetting to mention prototype-based inheritance (not class-based, even though ES6 `class` syntax exists).

**🔁 Follow-up Questions:**
1. What does "first-class function" mean?
2. What is a higher-order function?

---

### Q3 · Beginner · JavaScript Introduction

## What is the difference between JavaScript engine and JavaScript runtime?

**Detailed Answer:**

This is a nuanced question that trips up many candidates.

```
┌─────────────────────────────────────────────┐
│            JavaScript RUNTIME (Node.js)      │
│  ┌─────────────────┐   ┌──────────────────┐  │
│  │  JS ENGINE (V8)  │   │  Web APIs / C++  │  │
│  │  ┌───────────┐  │   │  (fs, http,      │  │
│  │  │  Heap     │  │   │   timers, etc.)  │  │
│  │  │  (Memory) │  │   └──────────────────┘  │
│  │  ├───────────┤  │   ┌──────────────────┐  │
│  │  │Call Stack │  │   │   Event Loop     │  │
│  │  └───────────┘  │   │   + Task Queue   │  │
│  └─────────────────┘   └──────────────────┘  │
└─────────────────────────────────────────────┘
```

- **JavaScript Engine**: Parses and executes JS code. Contains the **Call Stack** and **Heap**. Examples: V8 (Chrome/Node), SpiderMonkey (Firefox), JavaScriptCore (Safari).
- **JavaScript Runtime**: The engine PLUS the environment APIs. In browsers: DOM, fetch, setTimeout. In Node.js: fs, http, crypto modules.

**Simple Explanation:**
> The engine is the car's engine — it converts fuel (code) to motion (execution). The runtime is the entire car — engine + wheels + GPS + radio (all the extra APIs you can use).

```javascript
// setTimeout is NOT part of the JS engine — it's a Runtime API
// The engine doesn't know time. The runtime (browser/Node) provides it.
console.log("Start");       // Engine executes this
setTimeout(() => {          // Runtime API (Web API / libuv in Node)
  console.log("Async!");
}, 0);
console.log("End");

// Output:
// Start
// End
// Async!  ← Even with 0ms delay! Because it goes through the event loop.
```

**💡 Interview Tips:**
- This question tests deep understanding of JS internals. Mentioning `libuv` (Node.js's async I/O library) scores extra points.

**⚠️ Common Mistakes:**
- Thinking `setTimeout` is part of the JS language/engine — it's not.

**🔁 Follow-up Questions:**
1. How does the event loop work?
2. What is the difference between microtask queue and macrotask queue?

---

### Q4 · Beginner · Variables

## What is the difference between `var`, `let`, and `const`?

**Detailed Answer:**

This is one of the **most asked** JavaScript questions in every interview, from junior to senior level.

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| **Scope** | Function-scoped | Block-scoped | Block-scoped |
| **Hoisting** | Hoisted (initialized as `undefined`) | Hoisted (TDZ — not initialized) | Hoisted (TDZ — not initialized) |
| **Re-declaration** | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
| **Re-assignment** | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| **Global object property** | ✅ Yes (browser: `window`) | ❌ No | ❌ No |
| **Introduced** | ES1 (1997) | ES6 (2015) | ES6 (2015) |

**Simple Explanation:**
> `var` is the wild west — no rules, causes bugs. `let` is a responsible adult — block-scoped, reassignable. `const` is a contract — you promise this binding won't change.

**Real-world Example:**
```javascript
// ❌ VAR - Classic Bug in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 — because var leaks out of the for block!

// ✅ LET - Block scoped, each iteration has its own `i`
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 — correct!

// CONST - Must be initialized, cannot be reassigned
const API_URL = "https://api.example.com";
// API_URL = "other"; // ❌ TypeError: Assignment to constant variable

// ⚠️ TRICKY: const with objects — the reference is constant, NOT the content
const user = { name: "Alice" };
user.name = "Bob"; // ✅ This works! We're mutating, not reassigning
console.log(user.name); // "Bob"
user = {}; // ❌ TypeError — can't reassign the binding
```

**💡 Interview Tips:**
- **Always default to `const`**. Use `let` only when you need to reassign. Never use `var` in modern code.
- Explain **Temporal Dead Zone (TDZ)** for `let`/`const` — they are hoisted but not initialized.

**⚠️ Common Mistakes:**
- Thinking `const` makes objects immutable. It only prevents rebinding the variable. Use `Object.freeze()` for true immutability.
- Forgetting `var` pollutes the global `window` object in browsers.

**🔁 Follow-up Questions:**
1. What is Temporal Dead Zone (TDZ)?
2. Why should we prefer `const` by default?
3. How do you make an object truly immutable?

---

### Q5 · Beginner · Variables

## 🔍 Output Question: What will this code print?

```javascript
console.log(x); // ?
var x = 5;
console.log(x); // ?

console.log(y); // ?
let y = 10;
```

**Detailed Answer:**

```javascript
console.log(x); // undefined  (var is hoisted and initialized as undefined)
var x = 5;
console.log(x); // 5

console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

**Execution Flow Explanation:**
```
COMPILATION PHASE (before execution):
  var x → hoisted to top of scope, initialized as undefined
  let y → hoisted to top of scope, but stays UNINITIALIZED (TDZ)

EXECUTION PHASE:
  Line 1: console.log(x) → x exists but is undefined → prints: undefined
  Line 2: x = 5          → x now holds 5
  Line 3: console.log(x) → prints: 5
  Line 4: console.log(y) → y is in TDZ → ❌ ReferenceError thrown
  Line 5: (never reached)
```

**Simple Explanation:**
> `var` is like a friend who promises to come to the party (hoisted) but shows up empty-handed at first (`undefined`). `let` is different — it refuses to answer the door until it's fully ready (TDZ).

**💡 Interview Tips:**
- The key phrase: `let` and `const` are hoisted but **not initialized** — they exist in the Temporal Dead Zone (TDZ) from the start of the block until the declaration is reached.

**⚠️ Common Mistakes:**
- Saying `let` is NOT hoisted. It IS hoisted — the TDZ is proof (the engine knows it exists, it just won't let you access it yet).

**🔁 Follow-up Questions:**
1. Why does JavaScript have TDZ?
2. What is the purpose of hoisting?

---

### Q6 · Beginner · Variables

## What is the Temporal Dead Zone (TDZ)?

**Detailed Answer:**

The **Temporal Dead Zone** is the period between when a `let` or `const` variable enters scope (is hoisted) and when it is actually initialized with a value.

```
Block/Function starts
        │
        ▼
┌───────────────────────┐
│  TDZ begins for `x`   │  ← variable exists but accessing throws ReferenceError
│  ...other code...     │
│  let x = 5;           │  ← TDZ ENDS here, x is initialized
│  console.log(x); // 5 │  ← Safe to access
└───────────────────────┘
```

```javascript
{
  // TDZ for `name` starts here ↓
  console.log(typeof name); // ❌ ReferenceError (NOT "undefined" like with var!)
  // Note: typeof usually returns "undefined" for undeclared vars,
  // but TDZ variables throw an error even for typeof!

  let name = "Alice"; // TDZ ends here
  console.log(name);  // "Alice" ✅
}

// Compare with var:
{
  console.log(typeof age); // "undefined" — no error
  var age = 25;
  console.log(age); // 25
}
```

**Real-world Example:**
```javascript
// TDZ catches bugs early — if you try to use a variable before its declaration,
// you get a hard crash (ReferenceError) instead of a silent undefined bug.

function processOrder() {
  // ❌ Bug caught at runtime:
  console.log(total); // ReferenceError — forces developer to fix ordering
  const total = items.reduce((sum, item) => sum + item.price, 0);
}
```

**💡 Interview Tips:**
- TDZ was introduced **intentionally** in ES6 to prevent using variables before they're declared — a common source of bugs with `var`.

**⚠️ Common Mistakes:**
- Thinking `typeof` is always safe for undeclared variables — it's NOT safe for TDZ variables.

**🔁 Follow-up Questions:**
1. Why was TDZ introduced?
2. Does TDZ apply to function declarations?

---

### Q7 · Beginner · Variables

## 🔍 Tricky Question: What's the difference between `undefined` and undeclared variables?

**Detailed Answer:**

| | `undefined` variable | Undeclared variable |
|---|---|---|
| **Declaration** | Declared but not assigned | Never declared |
| **`typeof`** | `"undefined"` | `"undefined"` (safe!) |
| **Direct access** | Returns `undefined` | ❌ ReferenceError |

```javascript
let x;
console.log(x);          // undefined — declared, not initialized
console.log(typeof x);   // "undefined"

// y was never declared
console.log(typeof y);   // "undefined" — typeof is special, never throws
console.log(y);          // ❌ ReferenceError: y is not defined

// Real-world pattern: feature detection
if (typeof window !== "undefined") {
  // Safe browser-specific code
  console.log("Running in browser");
}
```

**💡 Interview Tips:**
- `typeof` is the only operator that doesn't throw on undeclared variables — that's why it's used for feature detection.
- In Node.js, `window` is undeclared; using `typeof window` safely checks the environment.

**🔁 Follow-up Questions:**
1. How do you check if a variable has been declared?
2. What does `void 0` return? Why is it used?

---

### Q8 · Beginner · Data Types

## What are the data types in JavaScript?

**Detailed Answer:**

JavaScript has **8 data types** — 7 primitive and 1 non-primitive (object):

```
PRIMITIVE TYPES (immutable, stored by value)
┌──────────────────────────────────────────────────┐
│  string     │ "hello", 'world', `template`        │
│  number     │ 42, 3.14, NaN, Infinity, -Infinity  │
│  bigint     │ 9007199254740993n                   │
│  boolean    │ true, false                         │
│  undefined  │ undefined                           │
│  null       │ null                                │
│  symbol     │ Symbol("unique")                    │
└──────────────────────────────────────────────────┘

NON-PRIMITIVE (mutable, stored by reference)
┌──────────────────────────────────────────────────┐
│  object     │ {}, [], function(){}, Date, RegExp  │
└──────────────────────────────────────────────────┘
```

```javascript
// All primitive types
console.log(typeof "hello");           // "string"
console.log(typeof 42);               // "number"
console.log(typeof 42n);              // "bigint"
console.log(typeof true);             // "boolean"
console.log(typeof undefined);        // "undefined"
console.log(typeof null);             // "object" ← FAMOUS BUG in JS!
console.log(typeof Symbol("id"));     // "symbol"

// Non-primitive
console.log(typeof {});               // "object"
console.log(typeof []);               // "object"  ← arrays are objects!
console.log(typeof function(){});     // "function" ← special case

// Correct way to check for null:
const value = null;
console.log(value === null); // true ✅

// Correct way to check for array:
console.log(Array.isArray([])); // true ✅
```

**Simple Explanation:**
> Primitives are like Post-it notes — copying one creates a new note. Objects are like Google Docs shared links — copying the link gives you access to the same document.

**💡 Interview Tips:**
- `typeof null === "object"` is a **historical bug** in JavaScript from 1995 that was never fixed to avoid breaking the web.
- Know all 7 primitives. BigInt (added in ES2020) is often forgotten.

**⚠️ Common Mistakes:**
- Forgetting `symbol` and `bigint`.
- Thinking arrays have their own type — they're objects.

**🔁 Follow-up Questions:**
1. What is the difference between primitive and reference types?
2. How do you deeply clone an object?

---

### Q9 · Beginner · Data Types

## 🔍 Tricky Question: What is `NaN`? What is `typeof NaN`?

**Detailed Answer:**

`NaN` stands for **"Not a Number"** — it's a numeric value representing an undefined mathematical result.

```javascript
console.log(typeof NaN);          // "number" ← Ironic! NaN is of type number
console.log(NaN === NaN);         // false ← NaN is not equal to itself!
console.log(NaN == NaN);          // false

// How to check for NaN:
console.log(isNaN("hello"));      // true (but coerces first! "hello" → NaN)
console.log(isNaN(undefined));    // true (undefined → NaN)
console.log(Number.isNaN("hello")); // false ← Better! No coercion
console.log(Number.isNaN(NaN));   // true ✅ Best way

// Common NaN scenarios:
console.log(0 / 0);               // NaN
console.log(Math.sqrt(-1));       // NaN
console.log(parseInt("abc"));     // NaN
console.log(undefined + 1);      // NaN
console.log("hello" * 2);        // NaN

// NaN in calculations — it's contagious!
const result = NaN + 5;
console.log(result); // NaN — any operation with NaN gives NaN
```

**Simple Explanation:**
> `NaN` is JavaScript's way of saying "this math went wrong." It's like dividing by zero — the result isn't a real number, so JS gives you a placeholder.

**💡 Interview Tips:**
- Always use `Number.isNaN()` over global `isNaN()` — the global version coerces its argument.
- `NaN` is the **only value in JavaScript that is not equal to itself** — use this to your advantage.

**⚠️ Common Mistakes:**
- Using `value === NaN` to check for NaN — this always returns `false`!
- Using global `isNaN()` which has surprising behavior.

**🔁 Follow-up Questions:**
1. Why is `NaN !== NaN`?
2. What does `Number.isFinite()` do?

---

### Q10 · Beginner · Data Types

## What is the difference between `null` and `undefined`?

**Detailed Answer:**

| | `null` | `undefined` |
|---|---|---|
| **Meaning** | Intentional absence of value | Variable declared but not assigned |
| **Type** | `object` (bug) | `undefined` |
| **Set by** | Developer (intentionally) | JavaScript engine |
| **Equality** | `null == undefined` is `true` | `null === undefined` is `false` |

```javascript
// undefined — JS engine sets it
let a;
console.log(a);           // undefined — declared, not initialized
console.log(typeof a);    // "undefined"

function greet(name) {
  console.log(name);      // undefined — parameter not passed
}
greet();

// null — developer sets it intentionally
let user = null;          // Explicitly: "no user logged in yet"
console.log(user);        // null
console.log(typeof user); // "object" (famous JS bug)

// Equality comparisons:
console.log(null == undefined);   // true  (loose equality)
console.log(null === undefined);  // false (strict equality — different types)
console.log(null == 0);           // false
console.log(null == false);       // false
console.log(undefined == false);  // false

// Practical pattern:
function getUser(id) {
  if (!id) return null; // Intentionally returning "nothing"
}
const user2 = getUser(null);
console.log(user2 === null); // true — explicit check
```

**Simple Explanation:**
> `undefined` is like an empty drawer — someone set up the drawer but forgot to put anything in it. `null` is like deliberately labeling a drawer "EMPTY" — it's a conscious choice.

**💡 Interview Tips:**
- Use `null` to **intentionally** signal "no value." Use `undefined` for uninitialized variables.
- When checking for either, use `== null` (loose equality catches both): `if (value == null)`.

**🔁 Follow-up Questions:**
1. Why does `typeof null` return `"object"`?
2. When would you use `null` vs `undefined` in an API response?

---

### Q11 · Beginner · Data Types

## What is the difference between primitive and reference types in memory?

**Detailed Answer:**

```
STACK MEMORY (primitives — fixed size, fast)
┌──────────────────────────────┐
│  Variable │ Value            │
│───────────┼──────────────────│
│    a      │   42             │
│    b      │   42 (copy)      │
│    name   │   "Alice"        │
└──────────────────────────────┘

HEAP MEMORY (objects — dynamic size)
┌──────────────────────────────┐
│  Address  │ Value            │
│───────────┼──────────────────│
│  0x001    │ {name: "Alice"}  │
│  0x002    │ [1, 2, 3]        │
└──────────────────────────────┘

Stack holds reference to heap:
┌──────────────────┐        ┌──────────────────┐
│  obj1 → 0x001    │───────▶│  {name: "Alice"} │
│  obj2 → 0x001    │───────▶│  (same object!)  │
└──────────────────┘        └──────────────────┘
```

```javascript
// Primitives — copied by value
let a = 42;
let b = a;    // b gets a COPY of 42
b = 100;
console.log(a); // 42 — unchanged!
console.log(b); // 100

// Reference types — copied by reference
let obj1 = { name: "Alice" };
let obj2 = obj1;    // obj2 points to SAME object in heap
obj2.name = "Bob";
console.log(obj1.name); // "Bob" — obj1 was also changed!
console.log(obj2.name); // "Bob"

// Shallow copy workarounds:
let obj3 = { ...obj1 };      // Spread operator — shallow copy
let obj4 = Object.assign({}, obj1); // Also shallow copy
obj3.name = "Carol";
console.log(obj1.name); // "Bob" — obj1 unchanged now ✅

// Deep copy:
let deepCopy = JSON.parse(JSON.stringify(obj1)); // Works for simple objects
// Or use structuredClone (modern):
let deepCopy2 = structuredClone(obj1);
```

**💡 Interview Tips:**
- Always mention `structuredClone()` — it's the modern standard for deep cloning (available in Node 17+ and modern browsers).
- `JSON.parse(JSON.stringify())` doesn't handle `undefined`, `Date`, `functions`, circular references.

**🔁 Follow-up Questions:**
1. What is a shallow copy vs deep copy?
2. How does `structuredClone` differ from `JSON.parse(JSON.stringify)`?

---

### Q12 · Beginner · Type Conversion

## What is the difference between implicit and explicit type conversion (coercion)?

**Detailed Answer:**

**Explicit conversion** (type casting) is when you intentionally convert a type using built-in functions.
**Implicit conversion** (type coercion) is when JavaScript automatically converts types during operations.

```javascript
// ===== EXPLICIT CONVERSION =====
// String to Number
console.log(Number("42"));       // 42
console.log(Number(""));         // 0
console.log(Number("hello"));    // NaN
console.log(parseInt("42px"));   // 42 (stops at non-numeric)
console.log(parseFloat("3.14")); // 3.14
console.log(+"42");              // 42 (unary + operator)

// Number to String
console.log(String(42));         // "42"
console.log((42).toString());    // "42"
console.log(42 + "");            // "42" (implicit!)

// To Boolean
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false
console.log(Boolean("hello"));   // true
console.log(Boolean(42));        // true
console.log(Boolean([]));        // true (⚠️ empty array is truthy!)
console.log(Boolean({}));        // true (⚠️ empty object is truthy!)

// ===== IMPLICIT COERCION =====
console.log("5" + 3);    // "53" — number coerced to string (+ prefers strings)
console.log("5" - 3);    // 2   — string coerced to number (- forces numeric)
console.log("5" * "3");  // 15  — both coerced to numbers
console.log(true + 1);   // 2   — true → 1
console.log(false + 1);  // 1   — false → 0
console.log(null + 1);   // 1   — null → 0
console.log(undefined + 1); // NaN — undefined → NaN
```

**💡 Interview Tips:**
- The `+` operator is the most dangerous for coercion because it's overloaded for both addition and string concatenation.
- Memorize the 6 **falsy** values: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy.

**🔁 Follow-up Questions:**
1. What are all the falsy values in JavaScript?
2. Why is `[] + []` equal to `""`?

---

### Q13 · Beginner · Type Conversion

## 🔍 Tricky Output Question: What does `[] + []`, `[] + {}`, `{} + []` produce?

**Detailed Answer:**

This is a **legendary JavaScript tricky question** asked at top companies.

```javascript
console.log([] + []);    // "" (empty string)
console.log([] + {});    // "[object Object]"
console.log({} + []);    // "[object Object]" OR 0 (context-dependent!)

// Step-by-step breakdown:

// [] + []
// Arrays have no primitive hint, so they convert to strings
// [].toString() → ""
// "" + "" → ""

// [] + {}
// [].toString() → ""
// ({}).toString() → "[object Object]"
// "" + "[object Object]" → "[object Object]"

// {} + [] — THE TRICKY ONE
// In an EXPRESSION context: ({}) + [] → "[object Object]" + "" → "[object Object]"
// As a STATEMENT (start of line): {} is treated as empty block, then +[] is unary +
// +[] → +("") → 0
// So in console: {} + [] → 0

// To force expression context:
console.log(({}) + []); // "[object Object]"
```

**Simple Explanation:**
> JavaScript tries to convert things to strings for the `+` operator. Arrays become empty strings, objects become `"[object Object]"`. The `{}` at the start of a line fools JS into thinking it's a code block, not an object literal.

**💡 Interview Tips:**
- This tests your knowledge of **type coercion rules** and **statement vs expression contexts**.
- Mention `Symbol.toPrimitive` for advanced follow-up.

**🔁 Follow-up Questions:**
1. What is `Symbol.toPrimitive`?
2. What does `valueOf()` do in type coercion?

---

### Q14 · Beginner · Type Conversion

## What is the difference between `==` (loose equality) and `===` (strict equality)?

**Detailed Answer:**

| | `==` Loose Equality | `===` Strict Equality |
|---|---|---|
| Type coercion | ✅ Yes, converts types | ❌ No, compares as-is |
| Speed | Slightly slower | Faster |
| Predictability | Surprising results | Predictable |
| Recommended | Almost never | Always |

```javascript
// === Strict equality — no coercion
console.log(1 === 1);         // true
console.log(1 === "1");       // false — different types
console.log(null === null);   // true
console.log(NaN === NaN);     // false — NaN is never equal to itself

// == Loose equality — with coercion
console.log(1 == "1");        // true  — "1" coerced to 1
console.log(0 == false);      // true  — false coerced to 0
console.log("" == false);     // true  — both → 0
console.log(null == undefined); // true — special rule
console.log(null == 0);       // false — special rule!
console.log(null == false);   // false — special rule!

// The == rules are complex — Abstract Equality Comparison algorithm:
// 1. If same type, use ===
// 2. null == undefined → true (only these two)
// 3. number == string → coerce string to number
// 4. boolean == anything → coerce boolean to number first
// 5. object == primitive → call ToPrimitive on object

// Practical example:
const id = "42";
if (id == 42) console.log("Loose match"); // Works but risky
if (id === 42) console.log("Strict match"); // false — won't print
if (Number(id) === 42) console.log("Explicit!"); // ✅ Best practice
```

**💡 Interview Tips:**
- Rule of thumb: **always use `===`**. The only acceptable use of `==` is `value == null` to check for both `null` and `undefined` simultaneously.
- Senior engineers at FAANG companies write `value == null` as a deliberate, readable pattern.

**🔁 Follow-up Questions:**
1. When would you use `==` over `===`?
2. How does object comparison work with `===`?

---

### Q15 · Beginner · Operators

## What is the difference between `&&`, `||`, and `??` operators?

**Detailed Answer:**

| Operator | Name | Returns |
|----------|------|---------|
| `&&` | Logical AND | First falsy value, or last value |
| `\|\|` | Logical OR | First truthy value, or last value |
| `??` | Nullish Coalescing | First non-null/undefined value, or last |

```javascript
// && — returns first FALSY, or last value if all truthy
console.log(true && "hello");    // "hello" — all truthy, returns last
console.log(false && "hello");   // false   — false is falsy, return it
console.log(0 && "hello");       // 0       — 0 is falsy
console.log("a" && "b" && "c");  // "c"     — all truthy, returns last

// || — returns first TRUTHY, or last value if all falsy
console.log(false || "hello");   // "hello" — false is falsy, skip it
console.log(0 || "default");     // "default"
console.log("value" || "default"); // "value" — truthy, return it

// ?? — Nullish Coalescing (ES2020) — only null/undefined trigger fallback
console.log(null ?? "default");      // "default"
console.log(undefined ?? "default"); // "default"
console.log(0 ?? "default");         // 0  — 0 is NOT null/undefined!
console.log("" ?? "default");        // "" — "" is NOT null/undefined!
console.log(false ?? "default");     // false

// Real-world example:
const config = {
  timeout: 0,       // Valid value — should NOT be overridden
  name: "",         // Valid empty string
  retries: null,    // Should use default
};

// ❌ BUG with ||: 0 and "" are falsy — gets overridden!
const timeout1 = config.timeout || 3000;  // 3000 — WRONG!
const name1 = config.name || "Anonymous"; // "Anonymous" — maybe wrong?

// ✅ Correct with ??
const timeout2 = config.timeout ?? 3000;  // 0 — correct!
const name2 = config.name ?? "Anonymous"; // "" — correct!
const retries = config.retries ?? 3;      // 3 — correct!
```

**💡 Interview Tips:**
- `??` is extremely useful in React for default props. Mention it in any React context too.
- Short-circuit evaluation: `&&` and `||` stop evaluating as soon as the result is determined — useful for performance and conditional execution.

**⚠️ Common Mistakes:**
- Using `||` for default values when `0` or `""` are valid — always use `??` in that case.

**🔁 Follow-up Questions:**
1. What is optional chaining (`?.`)?
2. How do `&&` and `||` enable short-circuit evaluation?

---

### Q16 · Beginner · Operators

## What is the difference between `++i` (pre-increment) and `i++` (post-increment)?

**Detailed Answer:**

```javascript
// Post-increment: returns THEN increments
let a = 5;
let b = a++;          // b gets current value (5), then a becomes 6
console.log(a);       // 6
console.log(b);       // 5

// Pre-increment: increments THEN returns
let c = 5;
let d = ++c;          // c becomes 6, then d gets 6
console.log(c);       // 6
console.log(d);       // 6

// 🔍 Tricky Output Question:
let x = 3;
console.log(x++ + ++x); // ?

// Step by step:
// x++ → returns 3, THEN x becomes 4
// ++x → x becomes 5, then returns 5
// 3 + 5 = 8
console.log(x++ + ++x); // 8
console.log(x);         // 5 (after all operations)

// In loops — usually identical:
for (let i = 0; i < 5; i++) { }  // Same result as ++i in for loop
for (let i = 0; i < 5; ++i) { }  // Both work the same here
```

**💡 Interview Tips:**
- In for loops, `i++` and `++i` produce the same result because the return value isn't used.
- In languages like C++, `++i` can be slightly more efficient (no temp copy) — but in modern JS/V8, the JIT compiler optimizes both identically.

**🔁 Follow-up Questions:**
1. Is there a performance difference between `++i` and `i++` in JavaScript?

---

### Q17 · Beginner · Operators

## What is the spread operator (`...`) and rest parameter (`...`)?

**Detailed Answer:**

Same syntax (`...`), different purposes based on context:

```javascript
// ===== SPREAD OPERATOR — expands iterables =====
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy array (shallow)
const copy = [...arr1];
copy.push(99);
console.log(arr1);  // [1, 2, 3] — original unchanged
console.log(copy);  // [1, 2, 3, 99]

// Objects
const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "fr", fontSize: 14 };
const settings = { ...defaults, ...userPrefs }; // Later props override
console.log(settings); // { theme: "dark", lang: "fr", fontSize: 14 }

// Spread into function arguments
const nums = [3, 1, 4, 1, 5, 9];
console.log(Math.max(...nums)); // 9

// ===== REST PARAMETERS — collects remaining args =====
function sum(first, second, ...rest) {
  console.log(first);  // 1
  console.log(second); // 2
  console.log(rest);   // [3, 4, 5]
  return first + second + rest.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// ⚠️ Difference from arguments object:
function oldWay() {
  console.log(arguments);       // Arguments object (array-like, not real array)
  console.log(Array.from(arguments)); // Must convert
}
function newWay(...args) {
  console.log(args);            // Real array ✅
  console.log(args.map(x => x * 2)); // Can use array methods directly
}
```

**💡 Interview Tips:**
- Spread is used at the **call site** (passing values out). Rest is used in **function definition** (collecting values in).
- `arguments` object doesn't work in arrow functions — another reason to use rest parameters.

**🔁 Follow-up Questions:**
1. What is the difference between `arguments` object and rest parameters?
2. How does spread work with strings?

---

### Q18 · Beginner · Control Flow

## What is the difference between `for...in` and `for...of` loops?

**Detailed Answer:**

| | `for...in` | `for...of` |
|---|---|---|
| **Iterates over** | Keys/properties (enumerable) | Values (iterable) |
| **Works with** | Objects (any) | Arrays, Strings, Maps, Sets |
| **Includes prototype** | ✅ Yes (inherited) | ❌ No |
| **Array use** | ⚠️ Not recommended | ✅ Recommended |

```javascript
// for...in — iterates over property KEYS
const person = { name: "Alice", age: 30, city: "NYC" };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// name: Alice
// age: 30
// city: NYC

// ⚠️ for...in on arrays — dangerous!
const arr = ["a", "b", "c"];
for (const index in arr) {
  console.log(index); // "0", "1", "2" — string indices, not values!
}

// Also picks up prototype properties!
Array.prototype.custom = "oops";
for (const index in arr) {
  console.log(index); // "0", "1", "2", "custom" ← unexpected!
}
delete Array.prototype.custom; // Cleanup

// for...of — iterates over VALUES (requires iterable)
for (const value of arr) {
  console.log(value); // "a", "b", "c"
}

// Works on strings:
for (const char of "hello") {
  console.log(char); // h, e, l, l, o
}

// Works on Map and Set:
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(`${key} → ${value}`); // a → 1, b → 2
}

// ❌ for...of on plain objects — throws error!
// for (const val of person) {} // TypeError: person is not iterable
// Solution:
for (const [key, val] of Object.entries(person)) {
  console.log(`${key}: ${val}`);
}
```

**💡 Interview Tips:**
- Never use `for...in` on arrays — use `for...of`, `.forEach()`, or `for` loop.
- `for...in` is best for inspecting object keys; add `hasOwnProperty` check to exclude prototype properties.

**🔁 Follow-up Questions:**
1. What is an iterable? What makes something iterable?
2. How does `Symbol.iterator` work?

---

### Q19 · Beginner · Control Flow

## 🔍 Output Question: Explain `switch` statement fall-through behavior.

**Detailed Answer:**

```javascript
const day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    // NO break — falls through to case 3!
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  default:
    console.log("Unknown");
}
// Output:
// Tuesday
// Wednesday  ← fall-through! case 3 also executed

// ✅ Intentional fall-through (documented):
switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("Weekday");
    break;
  case 6:
  case 7:
    console.log("Weekend");
    break;
}

// switch uses === internally:
const x = "1";
switch (x) {
  case 1:        // 1 === "1" → false!
    console.log("Number 1");
    break;
  case "1":      // "1" === "1" → true!
    console.log("String 1");
    break;
}
// Output: "String 1"
```

**💡 Interview Tips:**
- Always add `break` unless fall-through is intentional. Some style guides even require a comment `// falls through` for intentional ones.

**🔁 Follow-up Questions:**
1. When should you use `switch` vs `if/else`?
2. Can you use `return` inside a switch case?

---

### Q20 · Beginner · Control Flow

## What is short-circuit evaluation and how is it used?

**Detailed Answer:**

Short-circuit evaluation means JavaScript **stops evaluating** as soon as the result is determined.

```javascript
// && stops at the first FALSY value
// || stops at the first TRUTHY value

// Conditional execution pattern:
const user = { name: "Alice", isAdmin: true };

// Old way:
if (user.isAdmin) {
  showAdminPanel();
}

// Short-circuit way:
user.isAdmin && showAdminPanel(); // Function called only if isAdmin is truthy

// Default values:
function greet(name) {
  name = name || "Guest"; // If name is falsy, use "Guest"
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet(""));      // "Hello, Guest!" (empty string is falsy)
console.log(greet());        // "Hello, Guest!" (undefined is falsy)

// 🔥 Real-world React pattern:
const isLoggedIn = true;
const userName = "Alice";

// Render component only if logged in:
const element = isLoggedIn && `<div>Welcome, ${userName}!</div>`;
console.log(element); // "<div>Welcome, Alice!</div>"

const notLoggedIn = false;
const element2 = notLoggedIn && `<div>Welcome!</div>`;
console.log(element2); // false — renders nothing in React

// ⚠️ Tricky: 0 short-circuits AND renders "0" in React
const count = 0;
const display = count && `Count: ${count}`; // false — but 0 in React renders "0"!
// Safe version:
const display2 = count > 0 && `Count: ${count}`;
```

**💡 Interview Tips:**
- This is critical for React developers — `0 && <Component>` renders `0` to the DOM! Always use booleans: `count > 0 &&`.

**🔁 Follow-up Questions:**
1. What are the performance implications of short-circuit evaluation?

---

## 🟡 INTERMEDIATE QUESTIONS (Q21–Q37)

---

### Q21 · Intermediate · Functions

## What is the difference between function declaration and function expression?

**Detailed Answer:**

```javascript
// ===== FUNCTION DECLARATION =====
sayHello(); // ✅ Works! Hoisted completely (name + body)

function sayHello() {
  console.log("Hello!");
}
sayHello(); // ✅ Works after declaration too

// ===== FUNCTION EXPRESSION =====
// greet(); // ❌ TypeError: greet is not a function (var is hoisted as undefined)

var greet = function() {
  console.log("Hi!");
};
greet(); // ✅ Works after assignment

// Named function expression:
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1); // Can reference itself by name inside
};
console.log(factorial(5)); // 120
// console.log(fact(5));  // ❌ ReferenceError — name only accessible inside

// ===== KEY DIFFERENCES =====
// 1. Hoisting: declarations fully hoisted, expressions only variable hoisted
// 2. Named function expressions aid debugging (show in stack traces)
// 3. Function declarations can't be conditional (technically)

// ⚠️ Conditional function declarations (avoid!):
if (true) {
  function conditional() { return "true branch"; }
} else {
  function conditional() { return "false branch"; }
}
// Behavior is inconsistent across environments — use function expressions instead:
const safe = true
  ? function() { return "true branch"; }
  : function() { return "false branch"; }
```

**💡 Interview Tips:**
- Function declarations are **fully hoisted** (name and body). Function expressions only hoist the variable declaration, not the assignment.
- Prefer function expressions with `const` in modern code — it prevents accidental redeclaration.

**🔁 Follow-up Questions:**
1. What is an IIFE (Immediately Invoked Function Expression)?
2. Why would you use a named function expression?

---

### Q22 · Intermediate · Functions

## What is an IIFE and why would you use it?

**Detailed Answer:**

An **Immediately Invoked Function Expression** is a function that runs as soon as it's defined.

```javascript
// Basic IIFE syntax:
(function() {
  const message = "I run immediately!";
  console.log(message);
})();

// Arrow function IIFE:
(() => {
  console.log("Arrow IIFE");
})();

// IIFE with parameters:
(function(name, version) {
  console.log(`${name} v${version}`);
})("MyApp", "1.0.0");

// WHY USE IIFE?

// 1. Avoid polluting global scope (classic use case):
(function() {
  var privateVar = "can't access me globally";
  function privateHelper() { /* ... */ }
  
  window.MyLibrary = {
    publicMethod: function() {
      return privateHelper();
    }
  };
})();
// console.log(privateVar); // ❌ ReferenceError

// 2. Module pattern (pre-ES6 modules):
const Counter = (function() {
  let count = 0; // Private!
  
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
})();

Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // 2
// console.log(count);           // ❌ ReferenceError — private!

// 3. Async IIFE (modern usage):
(async () => {
  const data = await fetch("/api/data");
  const json = await data.json();
  console.log(json);
})();
```

**Simple Explanation:**
> IIFE is like a self-destructing note — it runs once, keeps its variables private, and disappears. Before ES6 modules, it was THE way to write modular JavaScript.

**💡 Interview Tips:**
- Modern code uses ES6 modules instead of IIFE for module encapsulation, but IIFE is still used for async top-level code and initialization scripts.

**🔁 Follow-up Questions:**
1. How do ES6 modules replace IIFE?
2. What is the module pattern?

---

### Q23 · Intermediate · Functions

## What are `call`, `apply`, and `bind`?

**Detailed Answer:**

All three are Function prototype methods that let you explicitly set `this`.

| Method | Invokes function | `this` setting | Arguments |
|--------|-----------------|----------------|-----------|
| `call` | Immediately | First arg | Listed individually |
| `apply` | Immediately | First arg | As array |
| `bind` | Returns new function | First arg | Can be pre-filled (currying) |

```javascript
const person = {
  name: "Alice",
  greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
  }
};

const anotherPerson = { name: "Bob" };

// call — invoke immediately, args listed
console.log(person.greet.call(anotherPerson, "Hello", "!"));
// "Hello, Bob!"

// apply — invoke immediately, args as array
console.log(person.greet.apply(anotherPerson, ["Hi", "?"]));
// "Hi, Bob?"

// bind — returns NEW function with `this` permanently set
const boundGreet = person.greet.bind(anotherPerson, "Hey");
console.log(boundGreet(".")); // "Hey, Bob."
console.log(boundGreet("!")); // "Hey, Bob!"
// Note: "Hey" is pre-filled (partial application)

// Real-world use cases:
// 1. Borrowing methods:
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const realArray = Array.prototype.slice.call(arrayLike);
console.log(realArray); // ["a", "b", "c"]

// 2. Event handlers — preserving `this`:
class Button {
  constructor(label) {
    this.label = label;
    this.handleClick = this.handleClick.bind(this); // ← bind in constructor
  }
  handleClick() {
    console.log(`${this.label} clicked!`);
  }
}

// 3. apply for Math.max with arrays (pre-spread):
const numbers = [3, 1, 4, 1, 5, 9];
console.log(Math.max.apply(null, numbers)); // 9
// Modern equivalent:
console.log(Math.max(...numbers)); // 9
```

**💡 Interview Tips:**
- `bind` is crucial for class-based React components (before hooks). Arrow function class properties are the modern alternative.
- `call` vs `apply` mnemonic: **C**all = **C**ommas (listed), **A**pply = **A**rray.

**🔁 Follow-up Questions:**
1. How does `bind` relate to currying?
2. What does `this` refer to in an arrow function?

---

### Q24 · Intermediate · Functions

## What is a pure function? What are side effects?

**Detailed Answer:**

A **pure function**: given the same inputs, always returns the same output, and has no side effects.

**Side effects**: Anything a function does beyond computing a return value (modifying external state, I/O, network requests, etc.)

```javascript
// ===== PURE FUNCTIONS =====
function add(a, b) {
  return a + b; // Same inputs → same output, no side effects
}

function formatName(first, last) {
  return `${first} ${last}`; // Pure — no external state touched
}

const multiply = (x, y) => x * y; // Pure

// ===== IMPURE FUNCTIONS (side effects) =====
let total = 0;

// Side effect: modifies external variable
function addToTotal(amount) {
  total += amount; // ❌ Modifies external state
  return total;
}

// Side effect: modifies input argument
function sortArray(arr) {
  return arr.sort(); // ❌ Mutates the original array!
}

// Side effect: I/O
function logAndReturn(x) {
  console.log(x); // ❌ console.log is a side effect
  return x;
}

// ===== PURE ALTERNATIVES =====
// Pure sort — returns new array:
function pureSort(arr) {
  return [...arr].sort(); // ✅ Doesn't mutate original
}

const original = [3, 1, 2];
const sorted = pureSort(original);
console.log(original); // [3, 1, 2] — unchanged ✅
console.log(sorted);   // [1, 2, 3]

// Real-world: Redux reducers must be pure!
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 }; // ✅ Returns new state
    default:
      return state;
  }
  // ❌ NEVER: state.count++ — mutation in reducer breaks Redux!
}
```

**💡 Interview Tips:**
- Pure functions are the **foundation of functional programming**, React hooks, Redux, and testability.
- Emphasize that pure functions are **easier to test** (no mocking needed), **cacheable** (memoization), and **parallelizable**.

**🔁 Follow-up Questions:**
1. What is referential transparency?
2. Why must Redux reducers be pure functions?

---

### Q25 · Intermediate · Arrow Functions

## What are arrow functions and how do they differ from regular functions?

**Detailed Answer:**

Arrow functions (ES6) are a shorter syntax for function expressions, but with important semantic differences:

| Feature | Regular Function | Arrow Function |
|---------|-----------------|----------------|
| `this` binding | Dynamic (call-site) | Lexical (enclosing scope) |
| `arguments` object | ✅ Available | ❌ Not available |
| `new` keyword | ✅ Can be constructor | ❌ Cannot be constructor |
| `prototype` | ✅ Has prototype | ❌ No prototype |
| Named | ✅ Can be named | ❌ Always anonymous (but can assign) |
| Implicit return | ❌ No | ✅ Yes (single expressions) |

```javascript
// Syntax variations:
const a = x => x * 2;             // Single param, implicit return
const b = (x, y) => x + y;        // Multiple params
const c = (x) => {                 // Block body, explicit return needed
  const result = x * 2;
  return result;
};
const d = () => ({ name: "Alice" }); // Return object — wrap in parens!

// ===== CRITICAL: `this` binding =====
const obj = {
  name: "Alice",
  
  // Regular function — `this` depends on how called
  regularGreet: function() {
    console.log(this.name); // "Alice" when called as obj.regularGreet()
  },
  
  // Arrow function — `this` is LEXICALLY bound (from enclosing scope)
  arrowGreet: () => {
    console.log(this.name); // undefined! Arrow captures outer `this`
    // In this context, outer `this` is global/undefined (strict mode)
  },
  
  // Common use: arrow in timer
  delayedGreet: function() {
    setTimeout(() => {
      console.log(this.name); // ✅ "Alice" — arrow captures method's `this`
    }, 100);
  },
  
  // ❌ Problem: arrow in timer without outer regular function
  brokenDelayedGreet: () => {
    setTimeout(() => {
      console.log(this.name); // undefined — nested arrows, same issue
    }, 100);
  }
};

// arguments object:
function regular() {
  console.log(arguments); // Arguments {0: 1, 1: 2, 2: 3}
}
regular(1, 2, 3);

const arrow = (...args) => {
  // console.log(arguments); // ❌ ReferenceError
  console.log(args);          // [1, 2, 3] — use rest params
};
arrow(1, 2, 3);
```

**💡 Interview Tips:**
- The single most important difference: **lexical `this`**. Arrow functions inherit `this` from where they are **defined**, not where they are **called**.
- Never use arrow functions as object methods (if you need `this`), event handlers where `this` should be the element, or constructors.

**🔁 Follow-up Questions:**
1. Can you use `new` with an arrow function?
2. How do you decide between arrow function and regular function?

---

### Q26 · Intermediate · Arrow Functions

## 🔍 Output Question: What does `this` refer to in these contexts?

```javascript
const obj = {
  x: 42,
  getX: function() { return this.x; },
  getXArrow: () => this.x,
  getXDelayed: function() {
    return setTimeout(() => this.x, 0);
  }
};
```

**Detailed Answer:**

```javascript
"use strict";

const obj = {
  x: 42,

  // Regular method — `this` = the object calling it
  getX: function() {
    return this.x;
  },

  // Arrow function — `this` = outer scope at DEFINITION time
  // Defined in module/script scope, so `this` = undefined (strict) or window
  getXArrow: () => {
    return this.x; // `this` is NOT obj, it's the outer scope
  },

  // Regular function with arrow inside — arrow captures the method's `this`
  getXDelayed: function() {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.x), 0); // ✅ Arrow captures method's `this` = obj
    });
  }
};

console.log(obj.getX());        // 42 ✅
console.log(obj.getXArrow());   // undefined (strict) or window.x

// What if you destructure?
const { getX } = obj;
console.log(getX()); // undefined (strict) — `this` is now undefined, not obj!

// Fix with bind:
const boundGetX = obj.getX.bind(obj);
console.log(boundGetX()); // 42 ✅
```

**💡 Interview Tips:**
- The key rule: **regular functions have dynamic `this`** (determined at call time). **Arrow functions have lexical `this`** (determined at definition time).

**🔁 Follow-up Questions:**
1. How do you use arrow functions in class methods?
2. Why do React class components need `.bind(this)` in the constructor?

---

### Q27 · Intermediate · Arrow Functions

## What is the implicit return in arrow functions, and what are the gotchas?

**Detailed Answer:**

```javascript
// ===== IMPLICIT RETURN =====
// Single expression — no braces needed, no return keyword
const double = x => x * 2;
const add = (a, b) => a + b;
const greet = name => `Hello, ${name}!`;

// ===== GOTCHA 1: Returning an object literal =====
// ❌ This creates a block with a label — NOT an object!
const getUser = () => { name: "Alice" }; // Parsed as block + label
console.log(getUser()); // undefined — the block doesn't return!

// ✅ Wrap object in parentheses:
const getUser2 = () => ({ name: "Alice" });
console.log(getUser2()); // { name: "Alice" }

// ===== GOTCHA 2: Multi-line needs explicit return =====
const process = (data) => {
  const cleaned = data.trim();
  const processed = cleaned.toUpperCase();
  return processed; // Must have explicit return with braces
};

// ===== GOTCHA 3: Arrow functions and conditional expressions =====
const classify = n => n > 0 ? "positive" : n < 0 ? "negative" : "zero";
console.log(classify(5));  // "positive"
console.log(classify(-3)); // "negative"
console.log(classify(0));  // "zero"

// ===== GOTCHA 4: Chaining with implicit return =====
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0)    // [2, 4]
  .map(n => n * n)             // [4, 16]
  .reduce((sum, n) => sum + n, 0); // 20
console.log(result); // 20
```

**💡 Interview Tips:**
- Implicit return makes functional programming chains much more readable — highly valued in modern JS and React.

**🔁 Follow-up Questions:**
1. Can arrow functions have default parameters?
2. How do you handle complex logic in a `.map()` callback?

---

### Q28 · Intermediate · Scope

## What are the different types of scope in JavaScript?

**Detailed Answer:**

```
SCOPE CHAIN (nested scopes)
┌──────────────────────────────────────────┐
│           GLOBAL SCOPE                   │
│  var globalVar = "global";               │
│  ┌────────────────────────────────────┐  │
│  │       FUNCTION SCOPE               │  │
│  │  var funcVar = "function";         │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │       BLOCK SCOPE            │  │  │
│  │  │  let blockVar = "block";     │  │  │
│  │  │  const blockConst = "block"; │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

```javascript
// ===== GLOBAL SCOPE =====
var globalVar = "I'm global";
let globalLet = "Also global (but not window property)";
console.log(window.globalVar); // "I'm global" (browser)
console.log(window.globalLet); // undefined — let/const don't attach to window

// ===== FUNCTION SCOPE =====
function outer() {
  var outerVar = "outer";
  let outerLet = "outer let";

  function inner() {
    var innerVar = "inner";
    console.log(outerVar);    // ✅ "outer" — can access outer function scope
    console.log(outerLet);    // ✅ "outer let" — scope chain lookup
    console.log(globalVar);   // ✅ "I'm global" — found in global scope
  }
  
  inner();
  // console.log(innerVar); // ❌ ReferenceError — inner's var is not accessible
}

// ===== BLOCK SCOPE (let/const only) =====
{
  let blockLet = "in block";
  const blockConst = "in block";
  var blockVar = "leaks out!"; // var ignores block scope
}
// console.log(blockLet);   // ❌ ReferenceError
// console.log(blockConst); // ❌ ReferenceError
console.log(blockVar);      // ✅ "leaks out!" — var is function/global scoped

// ===== MODULE SCOPE (ES6 modules) =====
// In .mjs or <script type="module">:
// Variables are scoped to the module — not global
// export keyword makes them accessible outside

// ===== LEXICAL SCOPE =====
// Scope is determined at WRITE TIME, not run time
const x = 10;
function makeAdder() {
  const y = 20;
  return function add() {
    return x + y; // Looks up scope chain at DEFINITION time
  };
}
const adder = makeAdder();
console.log(adder()); // 30 — x and y resolved via lexical scope
```

**💡 Interview Tips:**
- JavaScript uses **lexical (static) scoping** — scope is determined by where code is written, not where it's called.
- The scope chain goes from innermost to outermost until global — if a variable isn't found, it's a `ReferenceError`.

**🔁 Follow-up Questions:**
1. What is lexical scope vs dynamic scope?
2. What is the scope chain?

---

### Q29 · Intermediate · Scope

## 🔍 Tricky Question: What is the output and why?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 1000);
}
```

**Detailed Answer:**

```javascript
// Output: 3, 3, 3 (after 1 second)
// NOT 0, 1, 2 as beginners expect!

// WHY?
// var is FUNCTION-scoped (or global-scoped) — there's only ONE `i`
// By the time setTimeout callbacks run (1s later), the loop has finished
// and `i` is 3 (the condition that stopped the loop)

// All 3 closures close over the SAME `i` variable

// ===== FIXES =====

// Fix 1: Use let (block-scoped — each iteration has its own `i`)
for (let i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 1000);
}
// Output: 0, 1, 2 ✅

// Fix 2: IIFE to capture current value
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() { console.log(j); }, 1000);
  })(i); // Immediately pass i as j — captures current value
}
// Output: 0, 1, 2 ✅

// Fix 3: bind
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(null, i), 1000);
}
// Output: 0, 1, 2 ✅

// Fix 4: Extra closure with let inside
for (var i = 0; i < 3; i++) {
  const j = i; // New const for each iteration
  setTimeout(function() { console.log(j); }, 1000);
}
// Output: 0, 1, 2 ✅
```

**Simple Explanation:**
> Imagine three people sharing one scoreboard. By the time they all look at it (1 second later), the scoreboard shows 3. That's `var`. With `let`, each person gets their own personal scoreboard that doesn't change.

**💡 Interview Tips:**
- This is the **#1 most asked JavaScript closure/scope question** in interviews. Know all four fixes.
- The preferred modern solution is simply using `let`.

**🔁 Follow-up Questions:**
1. How does `let` create a new scope per iteration?
2. What is a closure? (This leads directly into Q34)

---

### Q30 · Intermediate · Scope

## What is the scope chain and how does JavaScript look up variables?

**Detailed Answer:**

```
Variable Lookup — Scope Chain Walk
═══════════════════════════════════

function outer() {        ← Scope 3: {outerVar, inner}
  const outerVar = "O";
  
  function inner() {      ← Scope 2: {innerVar}
    const innerVar = "I";
    
    function deepest() {  ← Scope 1: {deepVar} — starts lookup here
      const deepVar = "D";
      console.log(deepVar);   // Found in Scope 1 ✓
      console.log(innerVar);  // Not in 1, found in Scope 2 ✓
      console.log(outerVar);  // Not in 1,2, found in Scope 3 ✓
      console.log(globalVar); // Not in 1,2,3, found in Global ✓
      console.log(missing);   // Not found anywhere → ReferenceError ✗
    }
    deepest();
  }
  inner();
}
```

```javascript
const globalVar = "global";

function outer() {
  const outerVar = "outer";
  
  function inner() {
    const innerVar = "inner";
    
    // JavaScript walks up the scope chain:
    // 1. Check inner's own scope → innerVar ✅
    // 2. Check outer's scope → outerVar ✅
    // 3. Check global scope → globalVar ✅
    console.log(innerVar);  // "inner"
    console.log(outerVar);  // "outer" — found via scope chain
    console.log(globalVar); // "global" — found in global scope
  }
  
  inner();
}

// Shadowing — inner variable hides outer one
const x = "global x";
function testShadow() {
  const x = "local x"; // Shadows the global `x`
  console.log(x);      // "local x" — found immediately, chain stops
}
testShadow();
console.log(x); // "global x" — original unchanged
```

**💡 Interview Tips:**
- JavaScript only walks **up** the scope chain, never sideways or down.
- Variable shadowing is valid but can cause bugs — use linters to catch accidental shadowing.

**🔁 Follow-up Questions:**
1. What is the performance implication of deep scope chains?
2. What is variable shadowing?

---

### Q31 · Intermediate · Hoisting

## What is hoisting? How does it work for functions and variables?

**Detailed Answer:**

**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope during the compilation phase (before execution).

```
BEFORE EXECUTION (Compilation Phase):
JavaScript scans the code and:
  1. Creates memory for var declarations (initialized as undefined)
  2. Creates memory for function declarations (stores entire function)
  3. Notes let/const declarations (adds to TDZ)

THEN execution happens top-to-bottom.
```

```javascript
// ===== WHAT ACTUALLY HAPPENS =====

// What you write:
console.log(x);         // undefined
console.log(greet());   // "Hello!"
// console.log(y);      // ❌ ReferenceError (TDZ)

var x = 5;

function greet() {
  return "Hello!";
}

let y = 10;

// What the JS engine effectively sees:
// var x;              // Hoisted, initialized as undefined
// function greet() { return "Hello!"; } // Hoisted completely!
// 
// console.log(x);     // undefined
// console.log(greet()); // "Hello!"
// console.log(y);     // ❌ ReferenceError — TDZ
//
// x = 5;
// let y = 10;         // TDZ ends here

// ===== FUNCTION DECLARATIONS vs EXPRESSIONS =====
// Declarations — fully hoisted
console.log(add(2, 3)); // 5 ✅
function add(a, b) { return a + b; }

// Expressions — NOT hoisted (only var hoisted as undefined)
// console.log(multiply(2, 3)); // ❌ TypeError: multiply is not a function
var multiply = function(a, b) { return a * b; };
// At the point of the call, multiply === undefined

// ===== HOISTING IN BLOCKS =====
{
  console.log(blockVar); // undefined — var hoisted to FUNCTION/global scope
  var blockVar = "in block";
}
console.log(blockVar); // "in block" — var leaked out of block!
```

**💡 Interview Tips:**
- Hoisting is why it's called "hoisting" — as if declarations are **physically lifted** to the top. But remember: only **declarations** are hoisted, not **initializations**.
- Interview trap: "Is `let` hoisted?" — Yes, but it's in TDZ until its declaration is reached.

**🔁 Follow-up Questions:**
1. What is the difference between a variable being hoisted vs initialized?
2. Are class declarations hoisted?

---

### Q32 · Intermediate · Hoisting

## 🔍 Tricky Output Question: What is the output?

```javascript
var x = 1;
function foo() {
  console.log(x);
  var x = 2;
  console.log(x);
}
foo();
console.log(x);
```

**Detailed Answer:**

```javascript
// Output:
// undefined   ← NOT 1 as beginners expect!
// 2
// 1

// WHY?
// Step 1 — Compilation phase:
// Global scope: var x; function foo() {...}
// Inside foo: var x; (hoisted to TOP of foo, initialized as undefined)

// Step 2 — Execution:
// var x = 1; → global x = 1
// foo() called:
//   Inside foo, var x is hoisted → foo's own x = undefined
//   console.log(x) → logs foo's local x → undefined
//   x = 2 → foo's local x = 2
//   console.log(x) → 2
// Back in global: console.log(x) → global x = 1

// The equivalent code after hoisting:
var x;      // global
x = 1;

function foo() {
  var x;    // local x hoisted inside foo — SHADOWS global x
  console.log(x); // undefined — local x not yet assigned
  x = 2;
  console.log(x); // 2
}

foo();
console.log(x); // 1 — global x untouched
```

**💡 Interview Tips:**
- This tests understanding that each function creates its own scope, and `var` inside a function is hoisted to the TOP of THAT function — not globally.

**🔁 Follow-up Questions:**
1. What would change if `var` was replaced with `let` inside `foo`?

---

### Q33 · Intermediate · Hoisting

## Are class declarations hoisted?

**Detailed Answer:**

```javascript
// ===== CLASS DECLARATION — Hoisted but in TDZ (like let/const) =====

// console.log(new Person()); // ❌ ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

console.log(new Person("Alice").greet()); // ✅ "Hi, I'm Alice"

// ===== CLASS EXPRESSION — Same as function expression =====
// console.log(Animal); // undefined (if var) or ReferenceError (if let/const)

const Animal = class {
  constructor(type) {
    this.type = type;
  }
};

console.log(new Animal("Dog").type); // ✅ "Dog"

// ===== KEY DIFFERENCE: Functions vs Classes =====
// Functions are fully hoisted — can be used before declaration
greet2(); // ✅ Works
function greet2() { console.log("Hello"); }

// Classes are NOT usable before their declaration (TDZ)
// new Car(); // ❌ ReferenceError
class Car {
  constructor() { this.type = "car"; }
}
new Car(); // ✅ Works after declaration
```

**💡 Interview Tips:**
- Classes in JavaScript are **syntactic sugar over prototype-based inheritance** — they don't change JS's fundamental prototype system.
- Class declarations are in TDZ just like `let`/`const` — they exist but can't be accessed before declaration.

**🔁 Follow-up Questions:**
1. How do JavaScript classes relate to prototypes?
2. What are static methods in a class?

---

### Q34 · Intermediate · Closures

## What is a closure? Explain with a real-world example.

**Detailed Answer:**

A **closure** is a function that **remembers** its lexical scope even when executed outside that scope.

```
CLOSURE VISUALIZATION:
═══════════════════════════════

function makeCounter() {         ← OUTER function
  let count = 0;                 ← Variable in outer scope
  
  return function() {            ← INNER function returned
    count++;                     ← References outer variable
    return count;
  };                             ← Inner function "closes over" count
}

const counter = makeCounter();   ← outer() finished, but...
counter(); // 1                  ← count is still alive in memory!
counter(); // 2
counter(); // 3                  ← count persists between calls!
```

```javascript
// Basic closure:
function makeCounter(start = 0) {
  let count = start; // Private state!
  
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    reset()     { count = start; return count; },
    getCount()  { return count; }
  };
}

const counter1 = makeCounter(10);
const counter2 = makeCounter(0);

console.log(counter1.increment()); // 11
console.log(counter1.increment()); // 12
console.log(counter2.increment()); // 1  — independent state!
console.log(counter1.getCount()); // 12
// console.log(count); // ❌ ReferenceError — `count` is private!

// Real-world: memoization
function memoize(fn) {
  const cache = {}; // Cache lives in closure!
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("Cache hit!");
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

function expensiveAdd(a, b) {
  console.log("Computing...");
  return a + b;
}

const memoAdd = memoize(expensiveAdd);
console.log(memoAdd(2, 3)); // "Computing..." → 5
console.log(memoAdd(2, 3)); // "Cache hit!" → 5
console.log(memoAdd(4, 5)); // "Computing..." → 9

// Real-world: partial application
function multiply(x, y) {
  return x * y;
}

function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const double = partial(multiply, 2);
const triple = partial(multiply, 3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

**Simple Explanation:**
> A closure is like a backpack a function carries everywhere. The backpack contains variables from the function where it was created. Even after the outer function finishes, the inner function still has its backpack.

**💡 Interview Tips:**
- Closures enable: **data privacy**, **factory functions**, **memoization**, **event handlers**, **module patterns**, and **currying**.
- Every function in JavaScript is technically a closure (it closes over at least the global scope).

**⚠️ Common Mistakes:**
- Memory leaks: Closures keep referenced variables in memory. If a closure is long-lived and holds a reference to a large object, it prevents garbage collection.

**🔁 Follow-up Questions:**
1. How do closures cause memory leaks?
2. What is currying, and how does it use closures?

---

### Q35 · Intermediate · Closures

## 🔍 Tricky Output Question: Explain the closure in this code:

```javascript
function createFunctions() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push(function() { return i; });
  }
  return funcs;
}
const fns = createFunctions();
console.log(fns[0](), fns[1](), fns[2]());
```

**Detailed Answer:**

```javascript
// Output: 3 3 3

// WHY?
// All three functions close over the SAME `i` variable (var is function-scoped)
// When the functions are called, the loop has finished and `i` === 3
// They all reference the same `i`, which is now 3

// ===== CORRECT SOLUTIONS =====

// Solution 1: Use let (new binding per iteration)
function createFunctions1() {
  const funcs = [];
  for (let i = 0; i < 3; i++) { // let creates new `i` for each iteration
    funcs.push(function() { return i; });
  }
  return funcs;
}
const fns1 = createFunctions1();
console.log(fns1[0](), fns1[1](), fns1[2]()); // 0 1 2 ✅

// Solution 2: IIFE to capture value
function createFunctions2() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push((function(j) {
      return function() { return j; }; // j is a local copy
    })(i));
  }
  return funcs;
}
const fns2 = createFunctions2();
console.log(fns2[0](), fns2[1](), fns2[2]()); // 0 1 2 ✅

// Solution 3: Array.from with factory
function createFunctions3() {
  return Array.from({ length: 3 }, (_, i) => () => i);
}
const fns3 = createFunctions3();
console.log(fns3[0](), fns3[1](), fns3[2]()); // 0 1 2 ✅
```

**💡 Interview Tips:**
- This is the classic **closure-in-a-loop** problem. Know all solutions.
- The mental model: `var` creates one variable for the entire function. `let` creates a new variable for **each iteration** of the loop.

---

### Q36 · Intermediate · Closures

## What is currying? How does it use closures?

**Detailed Answer:**

**Currying** transforms a function that takes multiple arguments into a sequence of functions, each taking one argument.

```javascript
// Regular function:
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried version:
function curriedAdd(a) {
  return function(b) {        // Closure over `a`
    return function(c) {      // Closure over `a` and `b`
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function style:
const curried = a => b => c => a + b + c;
console.log(curried(1)(2)(3)); // 6

// Partial application:
const add1 = curriedAdd(1);     // Fixes first argument
const add1And2 = add1(2);       // Fixes second argument
console.log(add1And2(3));       // 6
console.log(add1And2(10));      // 13

// Generic curry utility:
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const curriedAddGeneric = curry(add);
console.log(curriedAddGeneric(1)(2)(3));    // 6
console.log(curriedAddGeneric(1, 2)(3));    // 6
console.log(curriedAddGeneric(1)(2, 3));    // 6
console.log(curriedAddGeneric(1, 2, 3));    // 6

// Real-world use case:
const multiply = curry((factor, number) => factor * number);
const double = multiply(2);
const triple = multiply(3);

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.map(double)); // [2, 4, 6, 8, 10]
console.log(numbers.map(triple)); // [3, 6, 9, 12, 15]
```

**💡 Interview Tips:**
- Currying is used heavily in **functional programming** libraries (Lodash/fp, Ramda) and is valued at companies like Netflix and Facebook.
- `fn.length` gives the number of expected parameters — this is what the generic `curry` function uses.

**🔁 Follow-up Questions:**
1. What is the difference between currying and partial application?
2. How is currying used in function composition?

---

### Q37 · Intermediate · Closures

## How can closures cause memory leaks? How do you prevent them?

**Detailed Answer:**

```javascript
// ===== MEMORY LEAK EXAMPLE =====
function setupHandler() {
  const largeData = new Array(1000000).fill("data"); // 1M items — large!
  
  const button = document.getElementById("btn");
  button.addEventListener("click", function() {
    // This closure holds a reference to `largeData`
    // Even if we never use largeData in the handler!
    console.log("clicked");
  });
  
  // When setupHandler returns, we expect largeData to be GC'd
  // But the event listener closure keeps largeData alive! Memory leak!
}

// ===== HOW TO FIX IT =====

// Fix 1: Remove event listener when done
function setupHandlerFixed() {
  const largeData = new Array(1000000).fill("data");
  const processedData = processOnce(largeData); // Extract what you need
  
  function handleClick() {
    console.log("clicked", processedData.length); // Only keep what's needed
  }
  
  const button = document.getElementById("btn");
  button.addEventListener("click", handleClick);
  
  return () => button.removeEventListener("click", handleClick); // Cleanup fn
}
const cleanup = setupHandlerFixed();
// Later:
cleanup(); // ✅ Removes listener, allows GC

// Fix 2: Extract only necessary data
function setupHandlerBetter() {
  const largeData = new Array(1000000).fill("data");
  const count = largeData.length; // Only keep what you need
  // largeData is no longer referenced — eligible for GC
  
  document.getElementById("btn").addEventListener("click", function() {
    console.log("count:", count); // Small value, not the huge array
  });
}

// Fix 3: WeakRef for optional references (ES2021)
function withWeakRef() {
  let bigObject = { data: new Array(1000000).fill("x") };
  const weakRef = new WeakRef(bigObject);
  
  return function() {
    const obj = weakRef.deref(); // Returns undefined if GC'd
    if (obj) {
      console.log(obj.data.length);
    } else {
      console.log("Object was garbage collected");
    }
  };
}
```

**💡 Interview Tips:**
- Memory leaks in JavaScript typically come from: **global variables**, **detached DOM elements**, **forgotten event listeners**, and **closures holding large objects**.
- Use Chrome DevTools Memory tab to take heap snapshots and identify leaks.

**🔁 Follow-up Questions:**
1. How do you profile memory usage in Node.js?
2. What is WeakMap and WeakSet? How do they help with memory?

---

## 🔴 ADVANCED QUESTIONS (Q38–Q50)

---

### Q38 · Advanced · Execution Context

## What is an Execution Context? Explain its phases and components.

**Detailed Answer:**

An **Execution Context (EC)** is the environment in which JavaScript code is evaluated and executed.

```
EXECUTION CONTEXT STRUCTURE:
══════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────┐
│               EXECUTION CONTEXT                     │
│  ┌───────────────────────────────────────────────┐  │
│  │         VARIABLE ENVIRONMENT                   │  │
│  │  - Variable declarations (var)                 │  │
│  │  - Function declarations                       │  │
│  │  - Arguments object (for functions)            │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │         LEXICAL ENVIRONMENT                    │  │
│  │  - let/const bindings                          │  │
│  │  - Outer reference (scope chain link)          │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │         THIS BINDING                           │  │
│  │  - Value of `this` in this context             │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

TYPES:
  1. Global Execution Context (GEC) — one per program
  2. Function Execution Context (FEC) — one per function call
  3. Eval Execution Context — (rarely used)
```

```javascript
// Two phases of Execution Context creation:

// ===== PHASE 1: CREATION PHASE =====
// 1. Create Variable Environment:
//    - Scan for var declarations → set to undefined
//    - Scan for function declarations → store full function
// 2. Create Lexical Environment (for let/const — TDZ)
// 3. Determine `this` binding

// ===== PHASE 2: EXECUTION PHASE =====
// Execute code line by line, assigning values

// Example:
function example() {
  console.log(a); // undefined (creation phase set a = undefined)
  console.log(b); // ❌ ReferenceError (TDZ)
  console.log(fn); // [Function: fn] (function declaration hoisted)
  
  var a = 10;
  let b = 20;
  function fn() { return "hello"; }
  
  console.log(a); // 10
  console.log(b); // 20
}

// Global EC:
// Creation: window/global object created, this = window
// Execution: code runs top-to-bottom

// Function EC created on each invocation:
function outer() {
  const x = 10;
  
  function inner() {  // New EC created when inner() is called
    const y = 20;
    console.log(x + y); // 30 — x found via outer reference (scope chain)
  }
  
  inner(); // Creates new FEC, pushed to call stack
}

outer(); // Creates new FEC, pushed to call stack
```

**💡 Interview Tips:**
- The **Execution Context Stack** (Call Stack) stores all active execution contexts. GEC is always at the bottom.
- This concept is the foundation of understanding hoisting, scope, closures, and `this`.

**🔁 Follow-up Questions:**
1. How many global execution contexts exist in a JS program?
2. What is the difference between Variable Environment and Lexical Environment?

---

### Q39 · Advanced · Execution Context

## What is `this` keyword? How is it determined in different contexts?

**Detailed Answer:**

`this` refers to the **execution context object** — it changes based on how a function is called.

```javascript
// ===== 5 RULES FOR `this` BINDING =====

// Rule 1: DEFAULT BINDING — `this` = global (or undefined in strict mode)
function showThis() {
  console.log(this);
}
showThis(); // window (browser) or global (Node) or undefined (strict)

// Rule 2: IMPLICIT BINDING — `this` = the object before the dot
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};
obj.greet(); // "Alice" — `this` = obj

// ⚠️ Lost `this`:
const fn = obj.greet;
fn(); // undefined — `this` is no longer obj (default binding)

// Rule 3: EXPLICIT BINDING — call, apply, bind
function greet() { return this.name; }
const person = { name: "Bob" };
console.log(greet.call(person));  // "Bob"
console.log(greet.apply(person)); // "Bob"
const bound = greet.bind(person);
console.log(bound());             // "Bob"

// Rule 4: NEW BINDING — `this` = newly created object
function Person(name) {
  this.name = name; // `this` = new empty object
  // implicit return of `this`
}
const alice = new Person("Alice");
console.log(alice.name); // "Alice"

// Rule 5: ARROW FUNCTION — lexical `this` (inherits from enclosing)
const counter = {
  count: 0,
  start() {
    // `this` here = counter (method call)
    setInterval(() => {
      this.count++; // Arrow inherits `this` from start() ✅
      console.log(this.count);
    }, 1000);
  }
};

// ===== PRIORITY ORDER =====
// new > explicit (bind/call/apply) > implicit (method call) > default

// ===== CLASS CONTEXT =====
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  speakArrow = () => { // Class field — arrow function
    console.log(`${this.name} speaks`); // `this` always = instance
  };
}

const dog = new Animal("Dog");
dog.speak();        // "Dog makes a sound"

const { speak } = dog;
// speak();         // ❌ `this` lost — TypeError in strict mode

const { speakArrow } = dog;
speakArrow();       // ✅ "Dog speaks" — arrow preserves `this`
```

**💡 Interview Tips:**
- The `this` priority: `new` binding > explicit binding > implicit binding > default binding.
- Arrow functions don't have their own `this` — they **never** apply the 5 rules above; they always use lexical `this`.

**🔁 Follow-up Questions:**
1. What happens when you use `bind` on an already-bound function?
2. What does `new` actually do step by step?

---

### Q40 · Advanced · Execution Context

## What does the `new` keyword actually do step-by-step?

**Detailed Answer:**

```javascript
// What `new` does internally — 4 steps:
// 1. Create a new empty object: {}
// 2. Set its __proto__ to Constructor.prototype
// 3. Call the constructor with `this` = new object
// 4. Return `this` (unless constructor returns non-primitive explicitly)

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

// What `new Person("Alice", 30)` does:
function myNew(Constructor, ...args) {
  // Step 1: Create empty object
  const obj = {};
  
  // Step 2: Set prototype chain
  Object.setPrototypeOf(obj, Constructor.prototype);
  // Equivalent: obj.__proto__ = Constructor.prototype;
  
  // Step 3: Call constructor with `this` = new object
  const result = Constructor.apply(obj, args);
  
  // Step 4: Return object (unless constructor returns a non-primitive)
  return result instanceof Object ? result : obj;
}

const alice = myNew(Person, "Alice", 30);
console.log(alice.name);    // "Alice"
console.log(alice.greet()); // "Hi, I'm Alice"
console.log(alice instanceof Person); // true ✅

// ⚠️ Returning a value from constructor:
function BadConstructor() {
  this.name = "Alice";
  return { name: "Bob" }; // Non-primitive return — OVERRIDES `this`!
}
const bad = new BadConstructor();
console.log(bad.name); // "Bob" — not "Alice"!

function GoodConstructor() {
  this.name = "Alice";
  return 42; // Primitive return — IGNORED, `this` is returned
}
const good = new GoodConstructor();
console.log(good.name); // "Alice" ✅
```

**💡 Interview Tips:**
- If a constructor explicitly returns an object, that object is used instead of `this`. If it returns a primitive (or nothing), `this` is returned.
- `instanceof` checks the prototype chain — this is why `alice instanceof Person` is true.

**🔁 Follow-up Questions:**
1. What is the prototype chain?
2. What is the difference between `__proto__` and `prototype`?

---

### Q41 · Advanced · Call Stack

## What is the Call Stack? How does JavaScript execute code?

**Detailed Answer:**

The **Call Stack** is a LIFO (Last In, First Out) data structure that tracks function calls.

```
CALL STACK VISUALIZATION:
═══════════════════════════

function c() { return 1; }
function b() { return c() + 1; }
function a() { return b() + 1; }
a();

Execution steps:
┌────────────┐
│            │  ← Stack is empty
└────────────┘

┌────────────┐
│  a()       │  ← a() is called, pushed
└────────────┘

┌────────────┐
│  b()       │  ← b() is called inside a(), pushed
│  a()       │
└────────────┘

┌────────────┐
│  c()       │  ← c() is called inside b(), pushed
│  b()       │
│  a()       │
└────────────┘

┌────────────┐
│  b()       │  ← c() returns 1, popped
│  a()       │
└────────────┘

┌────────────┐
│  a()       │  ← b() returns 2, popped
└────────────┘

┌────────────┐
│            │  ← a() returns 3, popped. Stack empty!
└────────────┘
```

```javascript
function c() {
  console.trace("In c"); // Shows full stack trace
  return 1;
}

function b() {
  return c() + 1;
}

function a() {
  return b() + 1;
}

console.log(a()); // 3

// Stack overflow — recursive without base case:
function infinite() {
  return infinite(); // Each call pushes to stack — never pops!
}
// infinite(); // ❌ RangeError: Maximum call stack size exceeded

// Correct recursion with base case:
function factorial(n) {
  if (n <= 1) return 1; // Base case — stack starts popping
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Stack during factorial(3):
// factorial(3) → 3 * factorial(2)
// factorial(2) → 2 * factorial(1)
// factorial(1) → returns 1 (base case)
// factorial(2) → 2 * 1 = 2
// factorial(3) → 3 * 2 = 6
```

**💡 Interview Tips:**
- The call stack is synchronous — it can only do one thing at a time (single-threaded).
- Maximum call stack size is typically ~10,000–15,000 frames in V8. Use iteration or trampolining for deep recursion.

**🔁 Follow-up Questions:**
1. What causes a stack overflow in JavaScript?
2. What is tail call optimization?

---

### Q42 · Advanced · Call Stack

## How does the Event Loop work? Explain with microtasks and macrotasks.

**Detailed Answer:**

```
EVENT LOOP ARCHITECTURE:
════════════════════════════════════════════════════════

┌──────────────────┐    ┌──────────────────────────────┐
│                  │    │         WEB APIS              │
│   CALL STACK     │    │  setTimeout, fetch, DOM events│
│                  │    └──────────────────────────────┘
│  [function calls]│              │
│                  │              ▼
└──────────────────┘    ┌──────────────────────────────┐
         ▲              │      MACROTASK QUEUE          │
         │              │  (setTimeout, setInterval,    │
         │  ←─────────  │   I/O callbacks, UI events)  │
         │              └──────────────────────────────┘
         │
         │  (checked FIRST after each task)
         │              ┌──────────────────────────────┐
         └─────────────│      MICROTASK QUEUE          │
                        │  (Promise.then, queueMicrotask│
                        │   MutationObserver callbacks) │
                        └──────────────────────────────┘

EVENT LOOP ALGORITHM:
1. Execute all code in the call stack (current task)
2. When stack is empty, drain the ENTIRE microtask queue
3. Render (if needed)
4. Pick ONE macrotask, push to stack
5. Go to step 2
```

```javascript
console.log("1 - Synchronous");

setTimeout(() => console.log("2 - setTimeout (macrotask)"), 0);

Promise.resolve()
  .then(() => console.log("3 - Promise.then (microtask)"))
  .then(() => console.log("4 - Chained Promise (microtask)"));

queueMicrotask(() => console.log("5 - queueMicrotask (microtask)"));

console.log("6 - Synchronous");

// Output ORDER:
// 1 - Synchronous         (sync)
// 6 - Synchronous         (sync)
// 3 - Promise.then        (microtask — checked before macrotask)
// 4 - Chained Promise     (microtask — added to queue during step 2)
// 5 - queueMicrotask      (microtask)
// 2 - setTimeout          (macrotask — last)

// ===== MICROTASK STARVATION =====
// Microtasks can starve the macrotask queue!
function floodMicrotasks() {
  Promise.resolve().then(function continuous() {
    // This keeps adding microtasks FOREVER
    Promise.resolve().then(continuous);
  });
  // setTimeout callback will NEVER run — microtask queue never empty!
}
```

**💡 Interview Tips:**
- **Microtasks always run before macrotasks** (after each task/after each microtask).
- `async/await` is syntactic sugar over Promises — `await` schedules a microtask.
- This is a **top 5 senior JavaScript interview question** at FAANG companies.

**🔁 Follow-up Questions:**
1. What is the output of mixing async/await with setTimeout?
2. What is `queueMicrotask`?

---

### Q43 · Advanced · Call Stack

## 🔍 Advanced Output Question: What is the output?

```javascript
async function fetchData() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

console.log("1");
fetchData();
console.log("2");
```

**Detailed Answer:**

```javascript
// Output:
// 1
// A
// 2
// B

// STEP-BY-STEP EXECUTION:
// 1. console.log("1") → synchronous → prints "1"
// 
// 2. fetchData() is called:
//    - Enters async function
//    - console.log("A") → synchronous → prints "A"
//    - hits `await Promise.resolve()`
//    - Promise resolves immediately but `await` suspends the function
//    - Schedules the rest (after await) as a MICROTASK
//    - Returns a Promise, control goes back to caller
//
// 3. console.log("2") → synchronous → prints "2"
//
// 4. Call stack is now empty
//    → Event loop checks microtask queue
//    → Finds the suspended fetchData continuation
//    → Resumes: console.log("B") → prints "B"

// More complex example:
async function one() {
  console.log("one start");
  await Promise.resolve();
  console.log("one end");
}

async function two() {
  console.log("two start");
  await Promise.resolve();
  console.log("two end");
}

console.log("start");
one();
two();
console.log("end");

// Output:
// start
// one start
// two start
// end
// one end
// two end
```

**💡 Interview Tips:**
- `await` doesn't block the thread — it suspends the async function and yields control back to the event loop, returning a microtask continuation.

**🔁 Follow-up Questions:**
1. What is the difference between `await Promise.resolve()` and `setTimeout(fn, 0)`?

---

### Q44 · Advanced · Memory Management

## How does JavaScript's garbage collection work?

**Detailed Answer:**

JavaScript uses **automatic garbage collection** — memory is allocated and freed without explicit programmer control.

```
GARBAGE COLLECTION ALGORITHMS:
════════════════════════════════════════

1. REFERENCE COUNTING (old, flawed)
   Object is GC'd when reference count = 0
   
   Problem: Circular references → count never reaches 0!
   
   let a = {};    // a.refcount = 1
   let b = {};    // b.refcount = 1
   a.ref = b;     // b.refcount = 2
   b.ref = a;     // a.refcount = 2
   a = null;      // a.refcount = 1 (still > 0 because b.ref = a)
   b = null;      // b.refcount = 1 (still > 0 because a.ref = b)
   // Neither gets collected! Memory leak.

2. MARK AND SWEEP (modern, V8 uses this)
   - Start from "roots" (global variables, stack)
   - Mark all reachable objects
   - Sweep (delete) unmarked objects
   
   Roots → can reach → alive
   Everything else → garbage collected
```

```javascript
// ===== WHAT GETS COLLECTED =====

// Scenario 1: Simple — eligible for GC
function createObject() {
  const obj = { data: "some data" }; // obj allocated
  return obj.data; // Only the string is returned, obj itself unreachable
} // obj is eligible for GC after this
createObject();

// Scenario 2: Closure keeping object alive
function createKeeper() {
  const bigData = { array: new Array(1000000) }; // Large allocation
  
  return function() {
    return bigData.array.length; // bigData kept alive by closure!
  };
}
const keeper = createKeeper();
// bigData is NOT collected — keeper function references it

keeper = null; // Now bigData is eligible for GC ✅

// Scenario 3: DOM References
function leakExample() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  
  // Later, remove from DOM but keep JS reference:
  document.body.removeChild(div);
  // div is removed from DOM but still in JS variable — NOT collected!
  
  // Fix: set to null after removal
  // div = null; // ← but you can't reassign const
}

// Scenario 4: WeakMap/WeakSet — allow GC
const cache = new WeakMap(); // Keys are weak references
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveOperation(obj);
  cache.set(obj, result);
  return result;
}
// When `obj` is no longer referenced elsewhere, it CAN be GC'd
// even though it's in the WeakMap!
```

**💡 Interview Tips:**
- Modern V8 uses **generational GC**: Young generation (new objects, collected often and quickly) and Old generation (long-lived objects, collected less often).
- Mention **incremental GC** — V8 breaks collection into small chunks to avoid long pauses ("stop the world").

**🔁 Follow-up Questions:**
1. What is `WeakRef` in JavaScript?
2. How do you detect memory leaks in a Node.js application?

---

### Q45 · Advanced · Memory Management

## What is the difference between `WeakMap`, `WeakSet`, `Map`, and `Set`?

**Detailed Answer:**

| Feature | `Map` | `WeakMap` | `Set` | `WeakSet` |
|---------|-------|-----------|-------|-----------|
| Keys/Values | Any type | Object keys only | Any type | Object values only |
| GC behavior | Prevents GC | Allows GC (weak reference) | Prevents GC | Allows GC |
| Iterable | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| `.size` property | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| Use case | General key-value | Private data, caches | Unique values | Object tracking |

```javascript
// ===== MAP — remembers insertion order, any key type =====
const map = new Map();
const objKey = { id: 1 };
map.set(objKey, "metadata");
map.set("string key", 42);
map.set(123, "number key");

console.log(map.get(objKey)); // "metadata"
console.log(map.size);        // 3
console.log([...map.keys()]); // [{id:1}, "string key", 123]

// vs Object: Map has O(1) lookup, ordered, any key type, no prototype collisions

// ===== WEAKMAP — keys are weakly held =====
const weakMap = new WeakMap();
let element = document.getElementById("btn");

weakMap.set(element, { clickCount: 0 }); // Associates data with DOM element

// When element is removed from DOM and dereferenced:
element = null;
// The WeakMap entry can now be garbage collected! ✅
// You can't iterate WeakMap, so this is expected behavior

// Common use: private data for class instances
const _private = new WeakMap();

class BankAccount {
  constructor(balance) {
    _private.set(this, { balance }); // "Private" data
  }
  
  deposit(amount) {
    const data = _private.get(this);
    data.balance += amount;
  }
  
  getBalance() {
    return _private.get(this).balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.balance);   // undefined — truly private!

// ===== SET — unique values collection =====
const set = new Set([1, 2, 3, 2, 1]); // Duplicates removed
console.log(set.size);           // 3
console.log([...set]);           // [1, 2, 3]
set.add(4);
console.log(set.has(3));         // true

// Remove duplicates from array:
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]

// ===== WEAKSET =====
const visitedNodes = new WeakSet();
function processNode(node) {
  if (visitedNodes.has(node)) return; // Skip if already visited
  visitedNodes.add(node);
  // Process node...
}
// When node is removed/unreferenced, WeakSet entry is GC'd automatically
```

**💡 Interview Tips:**
- `WeakMap` and `WeakSet` are perfect for caches and associating metadata with objects without preventing GC.
- `Map` vs `Object`: Use `Map` when you need non-string keys, need to know the size, or need guaranteed insertion order.

---

### Q46 · Advanced · Memory Management

## 🔍 Debugging Question: How would you find and fix this memory leak?

```javascript
const listeners = [];
function addListener(element) {
  const handler = () => console.log(element.id);
  element.addEventListener("click", handler);
  listeners.push(handler);
}
```

**Detailed Answer:**

```javascript
// THE PROBLEM:
// 1. `listeners` array grows indefinitely — handlers are never removed
// 2. Each handler closure holds a reference to `element`
// 3. Even if the DOM element is removed, the handler in `listeners` keeps it alive

// HOW TO DETECT:
// Chrome DevTools → Memory tab → Take heap snapshots → Look for growing
// "Event listener" or element count that doesn't decrease

// THE FIX — Multiple approaches:

// Fix 1: Return cleanup function
function addListenerFixed(element) {
  const handler = () => console.log(element.id);
  element.addEventListener("click", handler);
  
  return () => {
    element.removeEventListener("click", handler);
    // handler is no longer referenced — eligible for GC
  };
}

const cleanup = addListenerFixed(document.getElementById("btn"));
// When done:
cleanup(); // ✅

// Fix 2: AbortController (modern approach)
function addListenerAbortable(element) {
  const controller = new AbortController();
  
  element.addEventListener("click", 
    () => console.log(element.id),
    { signal: controller.signal }
  );
  
  return () => controller.abort(); // Removes all listeners with this signal!
}

// Fix 3: Use { once: true } for one-time handlers
element.addEventListener("click", handler, { once: true });
// Automatically removes itself after first invocation!

// Fix 4: WeakRef for the element
function addListenerWeak(element) {
  const weakElement = new WeakRef(element);
  
  const handler = () => {
    const el = weakElement.deref();
    if (el) console.log(el.id);
  };
  
  element.addEventListener("click", handler);
  return handler; // Still need to track for removal...
}
```

**💡 Interview Tips:**
- `AbortController` is the modern, elegant solution for managing multiple event listeners.
- Always provide cleanup mechanisms in libraries and long-running applications.

---

### Q47 · Advanced · Memory Management

## What are the best practices for memory management in JavaScript?

**Detailed Answer:**

```javascript
// 1. AVOID ACCIDENTAL GLOBALS
function leakyFunction() {
  accidentalGlobal = "oops"; // Missing var/let/const — creates global!
}
// Fix: always declare variables, use "use strict"

// 2. CLEAN UP TIMERS AND INTERVALS
const intervalId = setInterval(() => {
  updateUI();
}, 1000);
// When component unmounts / no longer needed:
clearInterval(intervalId); // ✅

// 3. REMOVE EVENT LISTENERS
const handler = () => processData();
element.addEventListener("click", handler);
// Later:
element.removeEventListener("click", handler); // ✅

// 4. CLEAR OBJECT REFERENCES
let bigObject = { data: new Array(1000000) };
processData(bigObject);
bigObject = null; // ✅ Eligible for GC now

// 5. USE WEAKMAP/WEAKSET FOR CACHES
const cache = new WeakMap(); // ✅ Instead of Map for object keys
// Entries automatically eligible for GC when keys are unreachable

// 6. AVOID CLOSURES HOLDING LARGE DATA
// ❌ Bad:
function setupHandler(largeConfig) {
  const processed = process(largeConfig); // small result
  return () => processed; // Closure still holds all of largeConfig!
}
// Wait — actually this is OK if largeConfig isn't in the closure
// ❌ Real bad:
function setupHandlerBad(largeConfig) {
  return () => largeConfig.value; // Holds entire largeConfig
}
// ✅ Good:
function setupHandlerGood(largeConfig) {
  const value = largeConfig.value; // Extract only what you need
  return () => value; // Only holds `value`, not all of largeConfig
}

// 7. USE OBJECT POOLING FOR HIGH-FREQUENCY ALLOCATIONS
class ObjectPool {
  constructor(factory, size = 10) {
    this.factory = factory;
    this.pool = Array.from({ length: size }, factory);
  }
  
  acquire() {
    return this.pool.pop() || this.factory();
  }
  
  release(obj) {
    this.pool.push(obj); // Reuse instead of GC'ing
  }
}
```

**💡 Interview Tips:**
- In React: return cleanup functions from `useEffect` — this is the most common memory leak source in modern React apps.
- Profile with `process.memoryUsage()` in Node.js or Chrome DevTools Memory tab.

---

### Q48 · Advanced · Strict Mode

## What is strict mode? How do you enable it and what does it change?

**Detailed Answer:**

**Strict mode** (`"use strict"`) enables a restricted variant of JavaScript that catches silent errors by throwing exceptions, disallows certain syntax, and improves performance.

```javascript
// ===== ENABLING STRICT MODE =====

// File-level (top of file):
"use strict";
// All code in this file runs in strict mode

// Function-level:
function strictFunction() {
  "use strict";
  // Only this function (and nested) is strict
}

// ES6 Modules and Classes are ALWAYS in strict mode (no need to declare)
// import/export → strict
// class declarations → strict

// ===== WHAT STRICT MODE CHANGES =====

"use strict";

// 1. Prevents accidental global variables
function test() {
  x = 10; // ❌ ReferenceError in strict — would silently create global without!
}

// 2. Assignment to non-writable properties throws
const obj = {};
Object.defineProperty(obj, "readOnly", { value: 42, writable: false });
// obj.readOnly = 100; // ❌ TypeError (silent fail without strict)

// 3. Deleting undeletable properties throws
// delete Object.prototype; // ❌ TypeError

// 4. Duplicate parameter names not allowed
// function dup(a, a) {} // ❌ SyntaxError in strict mode

// 5. `this` is undefined in standalone functions (not window)
function showThis() {
  "use strict";
  console.log(this); // undefined (not window/global)
}
showThis();

// 6. `with` statement is forbidden
// with (obj) { console.log(x); } // ❌ SyntaxError

// 7. `eval` has its own scope
eval("var evalVar = 10");
// console.log(evalVar); // ReferenceError in strict mode

// 8. Octal literals not allowed
// const octal = 010; // ❌ SyntaxError (0o10 is correct ES6 syntax)

// 9. Reserved words can't be used as identifiers
// const implements = 1; // ❌ SyntaxError (reserved for future use)
// const let = 2;        // ❌ SyntaxError
// const static = 3;     // ❌ SyntaxError
```

**Simple Explanation:**
> Strict mode is like having a strict teacher — it catches your mistakes immediately instead of letting them slide silently. It's especially good for catching `this`-related bugs and accidental globals.

**💡 Interview Tips:**
- ES6 modules and class bodies are always in strict mode — no need to add `"use strict"` in modern modular code.
- Strict mode prevents some optimizations that would be impossible without it (e.g., `with` makes scope analysis impossible).

**🔁 Follow-up Questions:**
1. Can you un-strict a section of strict code?
2. What is the `eval` behavior difference in strict mode?

---

### Q49 · Advanced · Strict Mode

## 🔍 Debugging Question: Find the bugs that strict mode would catch.

```javascript
function processUser(user) {
  userName = user.name;
  userAge = user.age;
  return { userName, userAge };
}

function createUser(name, name) {
  return { name };
}

const config = {};
Object.defineProperty(config, 'apiUrl', {
  value: 'https://api.example.com',
  writable: false
});
config.apiUrl = 'https://evil.com';
```

**Detailed Answer:**

```javascript
"use strict"; // ← Add this to catch all the bugs below

// BUG 1: Accidental global variables
function processUser(user) {
  userName = user.name; // ❌ ReferenceError in strict: userName not declared
  userAge = user.age;   // ❌ Same — both create global variables silently
  
  // FIX:
  const userName = user.name; // ✅
  const userAge = user.age;   // ✅
  return { userName, userAge };
}

// BUG 2: Duplicate parameter names
function createUser(name, name) { // ❌ SyntaxError in strict mode
  return { name }; // Which `name` would this even be? (last one in non-strict)
  
  // FIX:
  // function createUser(firstName, lastName) { ... }
}

// BUG 3: Writing to read-only property (silently fails without strict!)
const config = {};
Object.defineProperty(config, 'apiUrl', {
  value: 'https://api.example.com',
  writable: false
});
config.apiUrl = 'https://evil.com'; 
// ❌ TypeError in strict: Cannot assign to read only property
// Without strict: silently fails! config.apiUrl remains original value
// This is a SECURITY BUG if uncaught — you think you changed it, but didn't!

// FIX: Use a different config structure, or use the value directly
const API_URL = 'https://api.example.com'; // Immutable via const
```

**💡 Interview Tips:**
- The silent failure of writing to non-writable properties is especially dangerous — you might think your code is working, but the change never takes effect.

---

### Q50 · Advanced · Strict Mode

## 🔍 Advanced: How does strict mode affect `this` in class methods and callbacks?

**Detailed Answer:**

```javascript
// WITHOUT strict mode (browser global context):
function Person(name) {
  this.name = name;
}

// Called without `new` (easy mistake):
// const alice = Person("Alice"); // this = window! window.name = "Alice"!

// WITH strict mode:
"use strict";
function PersonStrict(name) {
  this.name = name; // this = undefined → TypeError: Cannot set property 'name' of undefined
}
// const bob = PersonStrict("Bob"); // ❌ Immediately throws — catches the bug!

// ===== IN CLASS METHODS =====
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  
  on(event, callback) {
    this.listeners[event] = callback;
  }
  
  emit(event, data) {
    // ❌ Problem when method is extracted:
    const handler = this.listeners[event];
    handler(data); // `this` inside callback will be undefined (strict mode in class)
  }
  
  emitSafe(event, data) {
    // ✅ Fix: call with explicit context or use arrow function stored handlers
    this.listeners[event]?.call(this, data);
  }
}

// ===== PRACTICAL EXAMPLE: setTimeout and strict mode =====
class Timer {
  constructor() {
    this.ticks = 0;
  }
  
  start() {
    // ❌ Regular function — `this` is undefined in strict mode
    setTimeout(function() {
      this.ticks++; // TypeError: Cannot set property 'ticks' of undefined
    }, 1000);
    
    // ✅ Arrow function — lexical `this`
    setTimeout(() => {
      this.ticks++; // ✅ `this` = Timer instance
    }, 1000);
    
    // ✅ bind
    setTimeout(function() {
      this.ticks++;
    }.bind(this), 1000);
  }
}

// ===== STRICT MODE + ARGUMENTS OBJECT =====
function test() {
  "use strict";
  
  // In strict mode, arguments object doesn't track parameter changes:
  function looseFn(a) {
    a = 99;
    console.log(arguments[0]); // Non-strict: 99 (linked)
  }
  
  function strictFn(a) {
    "use strict";
    a = 99;
    console.log(arguments[0]); // Strict: original value (not linked)
  }
  
  looseFn(1);  // 99
  strictFn(1); // 1
}
```

**💡 Interview Tips:**
- Classes are always strict — this is why you always see `this` binding issues in class-based React components (pre-hooks era).
- Strict mode makes `this` in regular functions `undefined` instead of `window` — this catches missing `new` keyword bugs immediately.

**🔁 Follow-up Questions:**
1. How did React class components handle `this` binding before hooks?
2. How do React hooks avoid the `this` problem entirely?

---

## 📚 REVISION CHEAT SHEET

> *Quick-reference for last-minute prep — print or bookmark this!*

---

### 🔑 Variables

```
var   → function-scoped, hoisted (undefined), re-declarable
let   → block-scoped, hoisted (TDZ), not re-declarable
const → block-scoped, hoisted (TDZ), must initialize, no reassignment

TDZ   → Temporal Dead Zone: let/const hoisted but inaccessible until declaration
```

### 🔑 Data Types

```
Primitives (7): string, number, bigint, boolean, undefined, null, symbol
Non-primitive:  object (includes arrays, functions, Date, etc.)

typeof null      → "object"   (historical bug)
typeof NaN       → "number"   (ironic)
typeof function  → "function" (special case)
NaN === NaN      → false      (use Number.isNaN())
```

### 🔑 Type Coercion Rules

```
+ with string → string concatenation
- * / %      → numeric coercion
== vs ===    → loose (coerces) vs strict (no coercion)
null == undefined  → true
null === undefined → false

Falsy values: false, 0, "", null, undefined, NaN
Everything else is TRUTHY (including [], {}, "0")
```

### 🔑 Operators

```
&&  → returns first FALSY or last value
||  → returns first TRUTHY or last value
??  → returns first non-null/undefined (use for 0/"" safe defaults)
?.  → optional chaining — short-circuits on null/undefined
```

### 🔑 Functions

```
Declaration    → fully hoisted (use before definition)
Expression     → only var hoisted (as undefined)
IIFE           → (function(){})() — runs immediately, private scope
Pure function  → same input → same output, no side effects
```

### 🔑 Arrow Functions

```
Key difference: lexical `this` (inherits from where DEFINED)
No `arguments` object (use ...rest)
Cannot use with `new`
No `prototype` property
Implicit return for single expressions
```

### 🔑 Scope & Hoisting

```
Scope types:  global → function → block (let/const only)
Scope chain:  inner → outer → global (upward only)
Hoisting:     var (undefined) → function decl (full) → let/const (TDZ)
```

### 🔑 Closures

```
Definition: function + its lexical scope (even after outer function returns)
Uses: data privacy, factory functions, memoization, currying, module pattern
Leak risk: closures holding large objects prevent GC
Classic bug: var in loop — use let or IIFE
```

### 🔑 Execution Context

```
Types: Global EC (1), Function EC (1 per call), Eval EC
Phases: 1. Creation (hoist, set this)  2. Execution (run code)
this rules (priority): new > bind/call/apply > method call > default
```

### 🔑 Call Stack & Event Loop

```
Call Stack:    LIFO, synchronous execution, one thing at a time
Event Loop:    1. Run sync code  2. Drain microtasks  3. One macrotask  4. Repeat
Microtasks:    Promise.then, queueMicrotask, async/await continuations
Macrotasks:    setTimeout, setInterval, I/O callbacks, UI events
Order:         sync → microtasks → macrotasks
```

### 🔑 Memory Management

```
GC algorithm:  Mark and Sweep (from roots, mark reachable, sweep rest)
Leaks:         global vars, forgotten listeners, detached DOM, closures
WeakMap/Set:   keys/values weakly held → can be GC'd if unreferenced
Prevention:    cleanup functions, AbortController, null references
```

### 🔑 Strict Mode

```
Enable:     "use strict" (file/function top) — ES modules/classes always strict
Changes:    no accidental globals, this=undefined in functions, no duplicate params
            writing to read-only throws, no with, no octal literals
Use:        Always — prevents entire categories of bugs
```

---

### ⚡ Top 10 Must-Know Tricky Outputs

| Code | Output | Why |
|------|--------|-----|
| `typeof null` | `"object"` | Historical bug |
| `typeof NaN` | `"number"` | NaN is numeric type |
| `NaN === NaN` | `false` | NaN is never equal to itself |
| `null == undefined` | `true` | Special loose equality rule |
| `null === undefined` | `false` | Different types |
| `[] + []` | `""` | Arrays → empty strings |
| `[] + {}` | `"[object Object]"` | `[] → ""`, `{} → "[object Object]"` |
| `0 == false` | `true` | `false → 0` |
| `"" == false` | `true` | Both → `0` |
| `[] == false` | `true` | `[] → ""` → `0`, `false → 0` |

---

### ⚡ var vs let vs const in One Table

| | `var` | `let` | `const` |
|--|--|--|--|
| Scope | Function | Block | Block |
| Hoisting | ✅ (undefined) | ✅ (TDZ) | ✅ (TDZ) |
| Re-declare | ✅ | ❌ | ❌ |
| Re-assign | ✅ | ✅ | ❌ |
| Global property | ✅ | ❌ | ❌ |

---

### ⚡ this Binding Quick Reference

```
Regular function() {}    → dynamic this (depends on call site)
Arrow () => {}           → lexical this (from definition scope)
method call: obj.fn()    → this = obj
fn()                     → this = undefined (strict) / global (non-strict)
new Constructor()        → this = new empty object
fn.call(ctx)             → this = ctx
fn.bind(ctx)()           → this = ctx (permanently)
```

---

*📌 Pro Tip from a Senior Engineer: Don't just memorize these answers — understand the **WHY** behind each behavior. Interviewers at top companies are testing your mental model of JavaScript's execution engine, not your ability to recall facts. When in doubt, explain your reasoning step-by-step — interviewers value that over a quick, memorized answer.*

---

**Happy interviewing! 🚀**

*Guide covers: Q1–Q50 | Topics: 15 Core JS Concepts | Difficulty: Beginner → Advanced*
