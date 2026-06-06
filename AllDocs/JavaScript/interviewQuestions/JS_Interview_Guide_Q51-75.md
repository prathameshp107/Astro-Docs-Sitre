# 🚀 JavaScript Interview Preparation Guide
## Questions 51–75 | Senior Engineer Edition

> **Crafted by a Senior JavaScript Engineer | 15+ Years @ FAANG**
> Topics: Objects • Arrays • Array Methods • String Methods • ES6+ Features • Template Literals • Destructuring • Spread Operator • Rest Operator

---

## 📋 Table of Contents

| # | Question | Topic | Level |
|---|----------|-------|-------|
| 51 | Object Property Shorthand & Computed Keys | Objects | Beginner |
| 52 | Difference Between `null` and `undefined` in Objects | Objects | Beginner |
| 53 | Array Holes vs `undefined` | Arrays | Beginner |
| 54 | `typeof` on Arrays | Arrays | Beginner |
| 55 | `map()` vs `forEach()` – What's the Difference? | Array Methods | Beginner |
| 56 | `find()` vs `filter()` | Array Methods | Beginner |
| 57 | `padStart()` / `padEnd()` Use Cases | String Methods | Beginner |
| 58 | `let` vs `const` vs `var` – ES6 Deep Dive | ES6+ Features | Beginner |
| 59 | Tagged Template Literals | Template Literals | Intermediate |
| 60 | Nested Destructuring | Destructuring | Intermediate |
| 61 | Object `freeze()` vs `seal()` – Deep Dive | Objects | Intermediate |
| 62 | `reduce()` — The Swiss Army Knife | Array Methods | Intermediate |
| 63 | `flat()` and `flatMap()` | Array Methods | Intermediate |
| 64 | String `replaceAll()` vs `replace()` with RegEx | String Methods | Intermediate |
| 65 | Default Parameter Values in Destructuring | Destructuring | Intermediate |
| 66 | Spread Operator with Objects — Shallow Clone Trap | Spread Operator | Intermediate |
| 67 | Rest in Function Signatures | Rest Operator | Intermediate |
| 68 | Optional Chaining `?.` and Nullish Coalescing `??` | ES6+ Features | Intermediate |
| 69 | Object Property Descriptors | Objects | Advanced |
| 70 | `Array.from()` vs Spread — Subtle Differences | Arrays | Advanced |
| 71 | Chaining Array Methods — Performance Pitfalls | Array Methods | Advanced |
| 72 | `Symbol` as Object Keys | ES6+ Features | Advanced |
| 73 | Destructuring with Renaming, Defaults & Rest Combined | Destructuring | Advanced |
| 74 | Spread vs `Object.assign()` — Prototype Chain | Spread Operator | Advanced |
| 75 | Iterators, Generators & the Rest/Spread Protocol | Rest Operator | Advanced |

---

## 🟢 BEGINNER LEVEL (Questions 51–58)

---

### Question 51

| Field | Details |
|-------|---------|
| **Number** | 51 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | Objects |
| **Type** | Conceptual + Code Output |

#### ❓ Interview Question
> *"What is object property shorthand in ES6? What are computed property names? Show examples."*

#### 📖 Detailed Answer

**Property Shorthand** allows you to omit the value when the variable name matches the key name.

**Computed Property Names** allow you to use expressions (including variables) as object keys using square bracket `[]` syntax.

#### 🧠 Simple Explanation
> "Instead of writing `{ name: name }`, you write just `{ name }`. And instead of building object keys with string concatenation, you write `{ [expression]: value }`."

#### 🏢 Real-World Example
At **Netflix**, when building a user session object, you'd often have variables that map directly to object fields. Property shorthand keeps the code clean and DRY.

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// PROPERTY SHORTHAND
// ─────────────────────────────────────────────

const userId   = 'u_123';
const userName = 'Alice';
const userRole = 'admin';

// ❌ Old (ES5) verbose way
const userOld = {
  userId:   userId,
  userName: userName,
  userRole: userRole
};

// ✅ ES6 Shorthand
const user = { userId, userName, userRole };
console.log(user);
// { userId: 'u_123', userName: 'Alice', userRole: 'admin' }


// ─────────────────────────────────────────────
// COMPUTED PROPERTY NAMES
// ─────────────────────────────────────────────

const field  = 'email';
const prefix = 'user';

const profile = {
  [field]: 'alice@example.com',         // key = 'email'
  [`${prefix}Age`]: 30,                 // key = 'userAge'
  [`${prefix}${field.toUpperCase()}`]: 'alice@example.com'  // key = 'userEMAIL'
};

console.log(profile);
// { email: 'alice@example.com', userAge: 30, userEMAIL: 'alice@example.com' }


// ─────────────────────────────────────────────
// REAL-WORLD: Dynamic form field builder
// ─────────────────────────────────────────────

function updateField(state, fieldName, value) {
  return {
    ...state,
    [fieldName]: value   // Computed key + spread — the React/Redux pattern
  };
}

const formState = { name: '', email: '' };
const updated   = updateField(formState, 'email', 'alice@test.com');
console.log(updated); // { name: '', email: 'alice@test.com' }
```

#### 💡 Important Interview Tips
- Property shorthand works **only** when the variable name exactly matches the intended key name.
- Computed keys are evaluated **at runtime**, so they can be any expression.
- Both features are heavily used in **React state management** and **Redux reducers**.

#### ⚠️ Common Mistakes
```javascript
// ❌ Mistake: Trying to shorthand a renamed variable
const n = 'Alice';
const obj = { name }; // ReferenceError: name is not defined!
// ✅ Fix:
const obj2 = { name: n };

// ❌ Mistake: Forgetting brackets on computed keys
const key = 'id';
const obj3 = { key: 1 };    // key = 'key' (literal string), NOT 'id'
const obj4 = { [key]: 1 };  // key = 'id' ✅
```

#### 🔁 Follow-up Questions
1. Can you use a `Symbol` as a computed property name?
2. How does computed property naming interact with `JSON.stringify()`?
3. How is this pattern used in Redux action creators?

---

### Question 52

| Field | Details |
|-------|---------|
| **Number** | 52 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | Objects |
| **Type** | Tricky / Output |

#### ❓ Interview Question
> *"What is the difference between a property with value `null` vs a property with value `undefined` in an object? What about a missing property? How does `JSON.stringify` treat them?"*

#### 📖 Detailed Answer

| Scenario | `key in obj` | `obj.key` | `JSON.stringify` |
|----------|-------------|-----------|-----------------|
| Property = `undefined` | `true` | `undefined` | **key omitted** |
| Property = `null` | `true` | `null` | `"key":null` |
| Property missing | `false` | `undefined` | **key omitted** |

#### 🧠 Simple Explanation
> "`null` means **intentionally empty**. `undefined` means **not yet set**. JSON treats them completely differently — `null` survives serialization, `undefined` vanishes."

#### 🏢 Real-World Example
In an **API response** (like at Amazon), if a user has no middle name, you'd use `null` (explicit absence) vs. `undefined` (field shouldn't exist at all).

#### 💻 JavaScript Code Example

```javascript
const obj = {
  a: undefined,
  b: null,
  // c: does not exist
};

// Checking existence
console.log('a' in obj);  // true  (property EXISTS, value is undefined)
console.log('b' in obj);  // true
console.log('c' in obj);  // false (property DOESN'T EXIST)

// Accessing values
console.log(obj.a);       // undefined
console.log(obj.b);       // null
console.log(obj.c);       // undefined (same result, different meaning!)

// JSON serialization — the KEY difference
console.log(JSON.stringify(obj));
// '{"b":null}'   ← 'a' is completely dropped!

// ─────────────────────────────────────────────
// TRICKY OUTPUT QUESTION
// ─────────────────────────────────────────────

const config = { timeout: undefined };
const merged = { timeout: 5000, ...config };
console.log(merged); // { timeout: undefined } ← spread OVERWRITES with undefined!

// ✅ Use null-coalescing to guard against this
const safeTimeout = merged.timeout ?? 5000;
console.log(safeTimeout); // 5000 — because undefined triggers ??
```

#### 💡 Important Interview Tips
- **`null`** = developer explicitly says "no value here" (intentional empty state).
- **`undefined`** = JS says "this doesn't exist or hasn't been assigned".
- Always check APIs with `?? ` (nullish coalescing) to handle **both** `null` and `undefined`.

#### ⚠️ Common Mistakes
```javascript
// ❌ Using || instead of ?? — treats 0, '' as falsy too
const count = obj.count || 10;  // Returns 10 even if count is 0!
// ✅ Use ?? which only checks for null/undefined
const count2 = obj.count ?? 10; // Returns 0 if count is 0
```

#### 🔁 Follow-up Questions
1. How does `Object.keys()` treat properties with `undefined` values?
2. What does `delete obj.a` do vs setting `obj.a = undefined`?
3. How do you safely check for a key without triggering a prototype chain lookup?

---

### Question 53

| Field | Details |
|-------|---------|
| **Number** | 53 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | Arrays |
| **Type** | Tricky / Output |

#### ❓ Interview Question
> *"What are 'holes' in JavaScript arrays? What is the difference between `[,,,]`, `new Array(3)`, and `[undefined, undefined, undefined]`?"*

#### 📖 Detailed Answer

A **sparse array** (array with holes) is created when indices exist without values. This is different from explicitly assigning `undefined`.

#### 🧠 Simple Explanation
> "A hole is like an **empty seat** in a row — the seat number exists, but nobody's sitting there. `undefined` is like having a seat with a **placeholder person** who represents 'nothing'."

#### 🏢 Real-World Example
This trips up engineers at **Meta** during code reviews when processing large datasets — `map()` silently skips holes, producing subtly wrong results.

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// THREE DIFFERENT ARRAYS — SUBTLE DIFFERENCES
// ─────────────────────────────────────────────

const holey    = [, , ,];          // 3 holes (sparse array)
const newArray = new Array(3);     // 3 holes (sparse array)
const undefs   = [undefined, undefined, undefined]; // 3 explicit undefineds

console.log(holey.length);     // 3
console.log(newArray.length);  // 3
console.log(undefs.length);    // 3

// They look the same but BEHAVE DIFFERENTLY:
console.log(0 in holey);    // false ← hole at index 0
console.log(0 in newArray); // false ← hole at index 0
console.log(0 in undefs);   // true  ← index 0 EXISTS with value undefined

// ─────────────────────────────────────────────
// THE BIG TRAP: Array methods skip holes!
// ─────────────────────────────────────────────

const a = [1, , 3]; // hole at index 1

console.log(a.map(x => x * 2));
// [2, empty, 6] — hole is PRESERVED, callback NEVER called for index 1!

console.log(a.filter(x => x > 0));
// [1, 3] — hole is SKIPPED

console.log(a.forEach(x => console.log(x)));
// 1
// 3       ← 'undefined' for index 1 is NEVER logged!

// Compare with explicit undefined:
const b = [1, undefined, 3];
console.log(b.map(x => x * 2));
// [2, NaN, 6] — callback IS called for index 1 (undefined * 2 = NaN)

// ─────────────────────────────────────────────
// FILLING HOLES — The right way
// ─────────────────────────────────────────────

const filled = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
const filled2 = [...new Array(3)].map((_, i) => i);     // [0, 1, 2]
// Spread converts holes → undefined, making them iterable safely
```

#### 💡 Important Interview Tips
- `new Array(3)` creates **holes**, NOT an array of `undefined`.
- Use `Array.from({ length: n })` or spread + fill to create safe arrays.
- In TypeScript, holes are a type-safety anti-pattern — avoid sparse arrays.

#### ⚠️ Common Mistakes
```javascript
// ❌ Common mistake in competitive coding
const matrix = new Array(3).fill(new Array(3).fill(0));
// All rows share THE SAME reference!
matrix[0][0] = 1;
console.log(matrix); // [[1,0,0],[1,0,0],[1,0,0]] ← all rows affected!

// ✅ Correct:
const matrix2 = Array.from({ length: 3 }, () => new Array(3).fill(0));
```

#### 🔁 Follow-up Questions
1. How does `Array.from()` handle holes vs `[...arr]`?
2. How does `JSON.stringify` serialize holes?
3. What does `delete arr[1]` create — a hole or `undefined`?

---

### Question 54

| Field | Details |
|-------|---------|
| **Number** | 54 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | Arrays |
| **Type** | Output / Tricky |

#### ❓ Interview Question
> *"What does `typeof []` return? How do you reliably check if something is an array? What are at least 3 different ways?"*

#### 📖 Detailed Answer

`typeof []` returns `"object"` — arrays are objects in JavaScript. This is a classic beginner trap.

#### 🧠 Simple Explanation
> "Arrays are just objects with numeric keys and a `length` property. `typeof` can't tell them apart, so you need specialized checks."

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// THE typeof TRAP
// ─────────────────────────────────────────────

console.log(typeof []);         // "object"  ← NOT "array"!
console.log(typeof {});         // "object"
console.log(typeof null);       // "object"  ← another classic trap

// ─────────────────────────────────────────────
// 5 WAYS TO CHECK FOR AN ARRAY
// ─────────────────────────────────────────────

const arr = [1, 2, 3];

// 1. ✅ BEST — Array.isArray() (ES5+, works across iframes)
console.log(Array.isArray(arr));    // true
console.log(Array.isArray({}));     // false
console.log(Array.isArray('abc'));  // false

// 2. instanceof (fails across iframes/realms)
console.log(arr instanceof Array);  // true

// 3. Object.prototype.toString (reliable, verbose)
console.log(Object.prototype.toString.call(arr)); // "[object Array]"

// 4. Constructor check (fragile)
console.log(arr.constructor === Array); // true

// 5. Array.prototype.isPrototypeOf
console.log(Array.prototype.isPrototypeOf(arr)); // true

// ─────────────────────────────────────────────
// WHY Array.isArray beats instanceof
// ─────────────────────────────────────────────

// In an iframe or Node.js VM context:
// const iframeArray = iframe.contentWindow.Array;
// [] instanceof iframeArray  → FALSE (different Array constructor)
// Array.isArray([])          → TRUE  (always works)
```

#### 💡 Important Interview Tips
- **Always use `Array.isArray()`** — it's the industry standard.
- `instanceof` breaks in multi-realm environments (iframes, Node VMs).
- This question is a gateway to discussing the **prototype chain**.

#### ⚠️ Common Mistakes
```javascript
// ❌ Checking truthiness of an empty array
if ([]) { console.log('truthy!') } // prints 'truthy!' — arrays are ALWAYS truthy
if ([].length) { console.log('has items') } // ✅ correct check
```

#### 🔁 Follow-up Questions
1. Why does `typeof null === "object"`? (Historical JS bug — V8 history)
2. How would you write a deep `isArray` that works across realms?
3. Is `Array.isArray(Array.prototype)` true or false? (Answer: `true`!)

---

### Question 55

| Field | Details |
|-------|---------|
| **Number** | 55 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | Array Methods |
| **Type** | Conceptual + Real-world |

#### ❓ Interview Question
> *"What is the difference between `map()` and `forEach()`? When would you use each?"*

#### 📖 Detailed Answer

| Feature | `map()` | `forEach()` |
|---------|---------|-------------|
| **Returns** | New array | `undefined` |
| **Purpose** | **Transform** data | **Side effects** |
| **Chainable** | ✅ Yes | ❌ No |
| **Mutates original** | No | No (but callback can) |
| **Break early** | ❌ No | ❌ No |
| **Performance** | Slightly heavier (new array) | Slightly lighter |

#### 🧠 Simple Explanation
> "`map()` is like a **conveyor belt that transforms items**. `forEach()` is like a **worker who does something with each item** but doesn't produce a new line."

#### 🏢 Real-World Example
**Google Maps**: `map()` to transform raw coordinates into marker objects. `forEach()` to attach event listeners to each marker DOM element.

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// map() — TRANSFORMS data, returns new array
// ─────────────────────────────────────────────

const prices  = [10, 20, 30];
const withTax = prices.map(price => price * 1.18);
console.log(withTax);  // [11.8, 23.6, 35.4]
console.log(prices);   // [10, 20, 30] — original UNCHANGED

// Chainable!
const result = [1, 2, 3, 4, 5]
  .map(x => x * 2)
  .filter(x => x > 4)
  .map(x => `$${x}`);
console.log(result); // ['$6', '$8', '$10']


// ─────────────────────────────────────────────
// forEach() — SIDE EFFECTS, returns undefined
// ─────────────────────────────────────────────

const users = ['Alice', 'Bob', 'Charlie'];
users.forEach((user, index) => {
  console.log(`${index + 1}. Hello, ${user}!`);
  // Side effect: logging to console
});

// ❌ COMMON MISTAKE: trying to use forEach return value
const badResult = users.forEach(u => u.toUpperCase());
console.log(badResult); // undefined — not ['ALICE', 'BOB', 'CHARLIE']!


// ─────────────────────────────────────────────
// TRICKY QUESTION: What does this output?
// ─────────────────────────────────────────────

const nums   = [1, 2, 3];
const mapped = nums.map(function(n) {
  if (n === 2) return; // implicitly returns undefined
  return n * 2;
});
console.log(mapped); // [2, undefined, 6]
// map() ALWAYS returns an array of the same length!
```

#### 💡 Important Interview Tips
- Use `map()` when you need a **transformed array**.
- Use `forEach()` for **side effects** (DOM manipulation, logging, API calls).
- Neither can be **broken out of early** — use `for...of` or `some()`/`every()` for that.

#### ⚠️ Common Mistakes
```javascript
// ❌ Using map() when you don't need the return value (wastes memory)
users.map(user => sendEmail(user)); // Bad practice — use forEach

// ❌ Using forEach() when you need a new array
const names = [];
users.forEach(u => names.push(u.name)); // Verbose — use map!
// ✅ const names = users.map(u => u.name);
```

#### 🔁 Follow-up Questions
1. Can you implement `map()` using `reduce()`?
2. How does `map()` handle sparse arrays (holes)?
3. What is the third argument passed to the `map()` callback?

---

### Question 56

| Field | Details |
|-------|---------|
| **Number** | 56 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | Array Methods |
| **Type** | Conceptual + Output |

#### ❓ Interview Question
> *"What is the difference between `find()` and `filter()`? What about `findIndex()` vs `indexOf()`?"*

#### 📖 Detailed Answer

| Method | Returns | Stops at first match | Use case |
|--------|---------|---------------------|----------|
| `find()` | **Single element** or `undefined` | ✅ Yes | Find one item |
| `filter()` | **Array** (possibly empty) | ❌ No (scans all) | Find all matching |
| `findIndex()` | **Index** or `-1` | ✅ Yes | Find index by condition |
| `indexOf()` | **Index** or `-1` | ✅ Yes | Find index by value (strict `===`) |

#### 💻 JavaScript Code Example

```javascript
const products = [
  { id: 1, name: 'Laptop',  price: 999,  inStock: true  },
  { id: 2, name: 'Phone',   price: 699,  inStock: false },
  { id: 3, name: 'Tablet',  price: 499,  inStock: true  },
  { id: 4, name: 'Monitor', price: 399,  inStock: true  },
];

// find() — returns FIRST matching element
const firstAffordable = products.find(p => p.price < 500);
console.log(firstAffordable); // { id: 3, name: 'Tablet', ... }

// filter() — returns ALL matching elements
const allAffordable = products.filter(p => p.price < 500);
console.log(allAffordable); // [{ id: 3, Tablet... }, { id: 4, Monitor... }]

// find() returns undefined if not found
const notFound = products.find(p => p.price > 5000);
console.log(notFound); // undefined

// filter() returns empty array if not found
const noneFound = products.filter(p => p.price > 5000);
console.log(noneFound); // []

// ─────────────────────────────────────────────
// findIndex() vs indexOf()
// ─────────────────────────────────────────────

// findIndex — works with objects, uses callback
const tabletIndex = products.findIndex(p => p.name === 'Tablet');
console.log(tabletIndex); // 2

// indexOf — uses strict equality (=== ), can't handle objects by reference
const nums = [10, 20, 30, 20];
console.log(nums.indexOf(20));     // 1 (first occurrence)
console.log(nums.lastIndexOf(20)); // 3 (last occurrence)

// ❌ indexOf FAILS for objects (reference equality)
const objs = [{ a: 1 }, { a: 2 }];
console.log(objs.indexOf({ a: 1 })); // -1 ← different reference!
// ✅ Use findIndex for objects:
console.log(objs.findIndex(o => o.a === 1)); // 0 ✅
```

#### 💡 Important Interview Tips
- `find()` is **O(n)** in worst case but **short-circuits** — prefer it over `filter()[0]`.
- `filter()` always scans **the entire array** — heavier for large datasets.
- `findIndex()` is to `find()` what `indexOf()` is to value search.

#### ⚠️ Common Mistakes
```javascript
// ❌ Using filter()[0] instead of find()
const first = products.filter(p => p.inStock)[0]; // Scans everything first!
// ✅ Use find():
const first2 = products.find(p => p.inStock); // Stops at first match
```

#### 🔁 Follow-up Questions
1. ES2023 added `findLast()` and `findLastIndex()` — what do they do?
2. How would you implement `find()` from scratch using `for...of`?
3. What does `Array.prototype.find()` return for sparse arrays?

---

### Question 57

| Field | Details |
|-------|---------|
| **Number** | 57 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | String Methods |
| **Type** | Real-world Scenario |

#### ❓ Interview Question
> *"When and why would you use `padStart()` and `padEnd()`? Show at least 3 real-world use cases."*

#### 📖 Detailed Answer

`padStart(targetLength, padString)` and `padEnd(targetLength, padString)` pad a string to a desired length. They are **pure** (return new strings, don't mutate).

#### 🧠 Simple Explanation
> "Think of them like **text alignment in a spreadsheet** — you're forcing a string to a fixed width by adding fill characters."

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// SYNTAX
// ─────────────────────────────────────────────
// str.padStart(targetLength [, padString])
// str.padEnd(targetLength [, padString])

// ─────────────────────────────────────────────
// USE CASE 1: Formatting time (HH:MM:SS)
// ─────────────────────────────────────────────

function formatTime(h, m, s) {
  return [h, m, s]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
}
console.log(formatTime(9, 5, 3));    // "09:05:03"
console.log(formatTime(14, 30, 0));  // "14:30:00"


// ─────────────────────────────────────────────
// USE CASE 2: Masking credit card numbers (Security)
// ─────────────────────────────────────────────

function maskCard(cardNumber) {
  const last4 = String(cardNumber).slice(-4);
  return last4.padStart(16, '*');
}
console.log(maskCard('4111111111111234')); // "************1234"


// ─────────────────────────────────────────────
// USE CASE 3: Fixed-width log formatting (like AWS CloudWatch)
// ─────────────────────────────────────────────

const logs = [
  { level: 'INFO',  message: 'Server started' },
  { level: 'WARN',  message: 'High memory usage' },
  { level: 'ERROR', message: 'DB connection failed' },
];

logs.forEach(({ level, message }) => {
  console.log(`[${level.padEnd(5)}] ${message}`);
});
// [INFO ] Server started
// [WARN ] High memory usage
// [ERROR] DB connection failed


// ─────────────────────────────────────────────
// USE CASE 4: Invoice / Order ID generation
// ─────────────────────────────────────────────

const orderId = 42;
const formattedId = `ORD-${String(orderId).padStart(8, '0')}`;
console.log(formattedId); // "ORD-00000042"


// ─────────────────────────────────────────────
// EDGE CASES
// ─────────────────────────────────────────────

console.log('abc'.padStart(2, '0')); // "abc"  ← no padding if already >= targetLength
console.log('5'.padStart(4, 'XY')); // "XY5"  ← multi-char padString is truncated to fit
console.log('5'.padStart(5, 'XY')); // "XYXY5"
```

#### 💡 Important Interview Tips
- `padStart` / `padEnd` were introduced in **ES2017**.
- The `padString` argument defaults to a **space** `' '`.
- If the string is already >= `targetLength`, it's **returned as-is**.

#### ⚠️ Common Mistakes
```javascript
// ❌ Forgetting to convert numbers to string first
console.log(42..padStart(5, '0')); // TypeError: padStart is not a function
// ✅ 
console.log(String(42).padStart(5, '0')); // "00042"
console.log((42).toString().padStart(5, '0')); // "00042"
```

#### 🔁 Follow-up Questions
1. How would you implement `padStart()` from scratch?
2. What happens with negative `targetLength`?
3. Is `padStart()` Unicode-aware? (It counts **code units**, not code points!)

---

### Question 58

| Field | Details |
|-------|---------|
| **Number** | 58 |
| **Difficulty** | 🟢 Beginner |
| **Topic** | ES6+ Features |
| **Type** | Deep Technical |

#### ❓ Interview Question
> *"Explain `var`, `let`, and `const` in depth — covering scope, hoisting, TDZ, and re-declaration rules."*

#### 📖 Detailed Answer

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| **Scope** | Function | Block | Block |
| **Hoisting** | Yes (initialized to `undefined`) | Yes (TDZ — uninitialized) | Yes (TDZ — uninitialized) |
| **Re-declaration** | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
| **Re-assignment** | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| **Global property** | ✅ Becomes `window.x` | ❌ Does NOT | ❌ Does NOT |
| **`typeof` before declaration** | `"undefined"` | ReferenceError | ReferenceError |

```
EXECUTION FLOW — var vs let

var:          Creation Phase → hoisted (value: undefined)
              Execution Phase → assigned actual value

let/const:    Creation Phase → hoisted (value: <TDZ — uninitialized>)
              Execution Phase (before declaration) → ReferenceError (TDZ)
              Execution Phase (after declaration) → assigned value
```

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// SCOPE
// ─────────────────────────────────────────────

function demoScope() {
  if (true) {
    var   x = 'var';   // function-scoped → visible outside the if block
    let   y = 'let';   // block-scoped    → NOT visible outside
    const z = 'const'; // block-scoped    → NOT visible outside
  }
  console.log(x); // "var" ← leaks out of block!
  console.log(y); // ReferenceError: y is not defined
}


// ─────────────────────────────────────────────
// HOISTING & TDZ (Temporal Dead Zone)
// ─────────────────────────────────────────────

console.log(a); // undefined (var is hoisted, initialized to undefined)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;     // TDZ: b is hoisted but NOT initialized


// ─────────────────────────────────────────────
// THE CLASSIC LOOP TRAP
// ─────────────────────────────────────────────

// ❌ var in loop — all closures share ONE 'i'
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// ✅ let in loop — each iteration gets its OWN 'i'
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Output: 0, 1, 2


// ─────────────────────────────────────────────
// const — immutable BINDING, not immutable VALUE
// ─────────────────────────────────────────────

const user = { name: 'Alice', age: 30 };
user.age = 31;        // ✅ Allowed — mutating the object
user.city = 'Paris';  // ✅ Allowed — adding property

user = {};            // ❌ TypeError: Assignment to constant variable
                      // Cannot re-bind the const identifier

// ✅ To truly freeze an object:
const frozen = Object.freeze({ name: 'Alice' });
frozen.name = 'Bob'; // Silently fails (or throws in strict mode)
console.log(frozen.name); // 'Alice'
```

#### 💡 Important Interview Tips
- **TDZ** is why `typeof b` throws a ReferenceError for `let`/`const` (unlike `var` which returns `"undefined"`).
- **`const` prevents re-binding, not mutation** — this is the #1 misconception.
- In modern JS, **never use `var`** — `let` for mutable, `const` for everything else.

#### ⚠️ Common Mistakes
```javascript
// ❌ Assuming const makes objects immutable
const config = { debug: false };
config.debug = true; // ✅ This works and is NOT an error!

// ❌ Using var in loops with async code
// (See the loop trap above)
```

#### 🔁 Follow-up Questions
1. What is the TDZ and why was it introduced?
2. If `const` doesn't make objects immutable, what does?
3. Does `let` or `const` add properties to the global `window` object?

---

## 🟡 INTERMEDIATE LEVEL (Questions 59–68)

---

### Question 59

| Field | Details |
|-------|---------|
| **Number** | 59 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Template Literals |
| **Type** | Advanced Feature |

#### ❓ Interview Question
> *"What are Tagged Template Literals? How do they work and what are real-world use cases?"*

#### 📖 Detailed Answer

A **tagged template literal** prefixes a template literal with a function name. The function receives the string parts and interpolated values as separate arguments — giving you full control over how the template is processed.

```
Execution Flow:
─────────────────────────────────────────────────────────
tag`Hello ${name}, you have ${count} messages!`
      │            │                  │
      │            └──── values[0]    └──── values[1]
      └── strings: ['Hello ', ', you have ', ' messages!']
─────────────────────────────────────────────────────────
tag(strings, ...values)
   strings.raw  → raw string array (unprocessed escape sequences)
```

#### 🏢 Real-World Example
Used in the popular **`styled-components`** library (React), **`sql` template tags** (safe query building), and **`gql`** (GraphQL queries).

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// BASIC TAGGED TEMPLATE
// ─────────────────────────────────────────────

function tag(strings, ...values) {
  console.log(strings); // ['Hello ', ', you are ', ' years old']
  console.log(values);  // ['Alice', 30]
  // strings.length === values.length + 1 (always)

  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] !== undefined ? values[i] : '');
  }, '');
}

const name = 'Alice';
const age  = 30;
const result = tag`Hello ${name}, you are ${age} years old`;
console.log(result); // "Hello Alice, you are 30 years old"


// ─────────────────────────────────────────────
// REAL-WORLD USE CASE 1: SQL Sanitization
// (Prevents SQL Injection — used in production at scale)
// ─────────────────────────────────────────────

function sql(strings, ...values) {
  const sanitized = values.map(v =>
    typeof v === 'string' ? v.replace(/'/g, "''") : v
  );
  return strings.reduce((query, str, i) => {
    return query + str + (sanitized[i] !== undefined ? `'${sanitized[i]}'` : '');
  }, '');
}

const userInput = "'; DROP TABLE users; --"; // SQL injection attempt!
const query = sql`SELECT * FROM users WHERE name = ${userInput}`;
console.log(query);
// SELECT * FROM users WHERE name = '''; DROP TABLE users; --'
// ← Injection neutralized!


// ─────────────────────────────────────────────
// REAL-WORLD USE CASE 2: HTML Escaping (XSS prevention)
// ─────────────────────────────────────────────

function safeHtml(strings, ...values) {
  const escape = str =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  return strings.reduce((html, str, i) => {
    return html + str + (values[i] !== undefined ? escape(values[i]) : '');
  }, '');
}

const userComment = '<script>alert("XSS")</script>';
const html = safeHtml`<p>User said: ${userComment}</p>`;
console.log(html);
// <p>User said: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</p>


// ─────────────────────────────────────────────
// String.raw — built-in tag
// ─────────────────────────────────────────────

console.log(`C:\new\folder`);         // C:
                                       //  ew
                                       // older  ← \n and \f are escape sequences!
console.log(String.raw`C:\new\folder`);// C:\new\folder  ← raw, no escaping
```

#### 💡 Important Interview Tips
- `strings.length` is **always** `values.length + 1`.
- `strings.raw` gives you the **unprocessed** string (backslashes not escaped).
- Tagged templates are the foundation of `styled-components`, `graphql-tag`, `sql`, `i18n` libraries.

#### ⚠️ Common Mistakes
```javascript
// ❌ Forgetting that the tag function receives strings FIRST, then values
function badTag(values, ...strings) { /* Wrong parameter order! */ }
// ✅ Always: tag(strings, ...values)
```

#### 🔁 Follow-up Questions
1. How does `styled-components` use tagged templates internally?
2. What is `strings.raw` and when would you use it?
3. Can you create a tagged template that returns a non-string value (e.g., a number)?

---

### Question 60

| Field | Details |
|-------|---------|
| **Number** | 60 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Destructuring |
| **Type** | Output + Real-world |

#### ❓ Interview Question
> *"Demonstrate nested destructuring for objects and arrays. What are the gotchas?"*

#### 📖 Detailed Answer

**Nested destructuring** lets you unpack values from deeply nested structures in a single statement, matching the **exact shape** of the data.

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// NESTED OBJECT DESTRUCTURING
// ─────────────────────────────────────────────

const user = {
  id: 42,
  name: 'Alice',
  address: {
    city: 'Mumbai',
    geo: {
      lat: 19.076,
      lng: 72.877
    }
  },
  roles: ['admin', 'editor']
};

// Deep destructure in one shot
const {
  name,
  address: {
    city,
    geo: { lat, lng }  // Note: 'address' and 'geo' are NOT extracted as variables!
  },
  roles: [primaryRole]
} = user;

console.log(name);        // 'Alice'
console.log(city);        // 'Mumbai'
console.log(lat);         // 19.076
console.log(primaryRole); // 'admin'
console.log(address);     // ReferenceError! 'address' is a pattern, not a binding


// ─────────────────────────────────────────────
// NESTED ARRAY DESTRUCTURING
// ─────────────────────────────────────────────

const matrix = [[1, 2], [3, 4], [5, 6]];

const [[a, b], [c, d], [, f]] = matrix; // skip index 0 of third sub-array
console.log(a, b, c, d, f); // 1 2 3 4 6


// ─────────────────────────────────────────────
// DESTRUCTURING FUNCTION PARAMETERS (very common in React)
// ─────────────────────────────────────────────

// Before:
function renderUser(props) {
  console.log(props.user.name, props.user.age);
}

// After (React component pattern):
function UserCard({ user: { name, age, address: { city } }, isAdmin }) {
  console.log(name, age, city, isAdmin);
}

UserCard({ user: { name: 'Alice', age: 30, address: { city: 'Mumbai' } }, isAdmin: true });
// Alice 30 Mumbai true


// ─────────────────────────────────────────────
// API RESPONSE DESTRUCTURING (real-world)
// ─────────────────────────────────────────────

const apiResponse = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice', meta: { verified: true } },
      { id: 2, name: 'Bob',   meta: { verified: false } }
    ],
    total: 2
  }
};

const {
  data: {
    users: [
      { name: firstName, meta: { verified: firstVerified } },
      { name: secondName }
    ],
    total
  }
} = apiResponse;

console.log(firstName, firstVerified); // 'Alice' true
console.log(secondName, total);        // 'Bob' 2
```

#### 💡 Important Interview Tips
- When you destructure a nested path (`address: { city }`), the **intermediate key** (`address`) is a pattern — it **does NOT create a variable**.
- To create BOTH the nested and the parent variable, you need to destructure twice or use a combination.
- Nested destructuring becomes hard to read beyond 2-3 levels — prefer intermediate variables.

#### ⚠️ Common Mistakes
```javascript
// ❌ Trying to access intermediate keys as variables
const { a: { b } } = { a: { b: 1 } };
console.log(a); // ReferenceError! 'a' was a pattern, not a binding

// ✅ To get BOTH a and b:
const { a, a: { b } } = { a: { b: 1 } };
console.log(a); // { b: 1 }
console.log(b); // 1
```

#### 🔁 Follow-up Questions
1. How do you destructure with default values at nested levels?
2. What happens if you try to destructure `null` or `undefined`?
3. How does destructuring interact with getter properties?

---

### Question 61

| Field | Details |
|-------|---------|
| **Number** | 61 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Objects |
| **Type** | Deep Technical |

#### ❓ Interview Question
> *"What is the difference between `Object.freeze()` and `Object.seal()`? What are their limitations?"*

#### 📖 Detailed Answer

```
Object State Machine:
─────────────────────────────────────────────────────────────────────
Normal Object
  │ Object.preventExtensions()  → Cannot ADD new properties
  │ Object.seal()               → Cannot ADD or DELETE properties
  │ Object.freeze()             → Cannot ADD, DELETE, or MODIFY properties
─────────────────────────────────────────────────────────────────────
```

| Operation | Normal | preventExtensions | seal | freeze |
|-----------|--------|------------------|------|--------|
| Add property | ✅ | ❌ | ❌ | ❌ |
| Delete property | ✅ | ✅ | ❌ | ❌ |
| Modify value | ✅ | ✅ | ✅ | ❌ |
| Reconfigure descriptor | ✅ | ✅ | ❌ | ❌ |

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// Object.freeze() — immutable values (shallow)
// ─────────────────────────────────────────────

const config = Object.freeze({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  nested: { retries: 3 }  // ← NOT frozen!
});

config.apiUrl  = 'https://evil.com'; // Silently fails (throws in strict mode)
config.newProp = 'test';             // Silently fails
delete config.timeout;               // Silently fails

console.log(config.apiUrl);  // 'https://api.example.com' ← unchanged

// THE SHALLOW TRAP:
config.nested.retries = 999; // ✅ WORKS! Nested objects are NOT frozen!
console.log(config.nested.retries); // 999

// Check if frozen:
console.log(Object.isFrozen(config)); // true


// ─────────────────────────────────────────────
// Object.seal() — no add/delete, but can modify
// ─────────────────────────────────────────────

const session = Object.seal({
  userId: 'u_123',
  token:  'abc',
  expiry: Date.now() + 3600000
});

session.token  = 'xyz';       // ✅ Modification ALLOWED
session.newKey = 'test';      // ❌ Addition BLOCKED (silently)
delete session.expiry;        // ❌ Deletion BLOCKED (silently)

console.log(session.token);   // 'xyz' ← modified successfully
console.log(Object.isSealed(session)); // true


// ─────────────────────────────────────────────
// DEEP FREEZE utility function
// ─────────────────────────────────────────────

function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]); // Recursively freeze nested objects
    }
  });
  return Object.freeze(obj);
}

const deepConfig = deepFreeze({
  db: { host: 'localhost', port: 5432 },
  cache: { ttl: 300 }
});

deepConfig.db.host = 'remotehost'; // Silently fails — truly frozen now
console.log(deepConfig.db.host);  // 'localhost' ✅
```

#### 💡 Important Interview Tips
- Both `freeze()` and `seal()` are **shallow** — nested objects are NOT affected.
- Operations on frozen/sealed objects **fail silently in sloppy mode**, throw `TypeError` in **strict mode**.
- `Object.freeze()` is used for **immutable config objects** and **Redux initial state**.

#### ⚠️ Common Mistakes
```javascript
// ❌ Assuming freeze is deep
const state = Object.freeze({ user: { loggedIn: true } });
state.user.loggedIn = false; // This WORKS — nested is not frozen!

// ✅ Use deepFreeze or immutable libraries (Immer, Immutable.js)
```

#### 🔁 Follow-up Questions
1. Can you `Object.freeze()` an array?
2. How does `const` relate to `Object.freeze()`?
3. What is the performance impact of `Object.freeze()`?

---

### Question 62

| Field | Details |
|-------|---------|
| **Number** | 62 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Array Methods |
| **Type** | Deep Technical + Real-world |

#### ❓ Interview Question
> *"Explain `Array.prototype.reduce()` in depth. Show how it can replace `map()`, `filter()`, and `groupBy` patterns."*

#### 📖 Detailed Answer

`reduce(callback, initialValue)` applies a function against an **accumulator** and each element, reducing the array to a single value of **any type**.

```
Execution Flow of reduce([1,2,3,4], (acc, cur) => acc + cur, 0):

Round 1: acc=0,  cur=1  → returns 1
Round 2: acc=1,  cur=2  → returns 3
Round 3: acc=3,  cur=3  → returns 6
Round 4: acc=6,  cur=4  → returns 10
         ──────────────────────────
Final result: 10
```

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// BASICS
// ─────────────────────────────────────────────

const nums = [1, 2, 3, 4, 5];

const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15

const product = nums.reduce((acc, cur) => acc * cur, 1);
console.log(product); // 120


// ─────────────────────────────────────────────
// reduce() as map()
// ─────────────────────────────────────────────

const doubled = nums.reduce((acc, cur) => {
  acc.push(cur * 2);
  return acc;
}, []);
console.log(doubled); // [2, 4, 6, 8, 10]


// ─────────────────────────────────────────────
// reduce() as filter()
// ─────────────────────────────────────────────

const evens = nums.reduce((acc, cur) => {
  if (cur % 2 === 0) acc.push(cur);
  return acc;
}, []);
console.log(evens); // [2, 4]


// ─────────────────────────────────────────────
// groupBy — the killer use case (ES2024 has Object.groupBy natively now!)
// ─────────────────────────────────────────────

const orders = [
  { id: 1, status: 'pending',   amount: 100 },
  { id: 2, status: 'shipped',   amount: 250 },
  { id: 3, status: 'pending',   amount: 75  },
  { id: 4, status: 'delivered', amount: 500 },
  { id: 5, status: 'shipped',   amount: 150 },
];

const grouped = orders.reduce((acc, order) => {
  const key = order.status;
  if (!acc[key]) acc[key] = [];
  acc[key].push(order);
  return acc;
}, {});

console.log(grouped);
// {
//   pending:   [{ id: 1 }, { id: 3 }],
//   shipped:   [{ id: 2 }, { id: 5 }],
//   delivered: [{ id: 4 }]
// }


// ─────────────────────────────────────────────
// Flatten nested array with reduce (before flat())
// ─────────────────────────────────────────────

const nested = [[1, 2], [3, 4], [5, 6]];
const flat   = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]


// ─────────────────────────────────────────────
// Pipeline of transformations
// ─────────────────────────────────────────────

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const transform = pipe(
  x => x * 2,
  x => x + 1,
  x => `Result: ${x}`
);

console.log(transform(5)); // "Result: 11"


// ─────────────────────────────────────────────
// TRICKY: reduce without initialValue
// ─────────────────────────────────────────────

const max = [3, 1, 4, 1, 5, 9].reduce((a, b) => Math.max(a, b));
console.log(max); // 9 — first element becomes the initial accumulator

// ⚠️ DANGER: Without initialValue, empty array throws TypeError!
[].reduce((a, b) => a + b); // TypeError: Reduce of empty array with no initial value
[].reduce((a, b) => a + b, 0); // ✅ Returns 0 safely
```

#### 💡 Important Interview Tips
- **Always provide an `initialValue`** unless you have a specific reason not to.
- `reduce()` can produce **any type** — array, object, string, number, boolean.
- It's the foundation of **functional programming pipelines** in JavaScript.

#### ⚠️ Common Mistakes
```javascript
// ❌ Forgetting to return the accumulator
const bad = [1,2,3].reduce((acc, cur) => {
  acc.push(cur * 2); // Missing return!
}, []);
console.log(bad); // TypeError on second iteration (acc is undefined)

// ✅ Always return acc
const good = [1,2,3].reduce((acc, cur) => {
  acc.push(cur * 2);
  return acc; // ← Required!
}, []);
```

#### 🔁 Follow-up Questions
1. What is `reduceRight()`? When would you use it?
2. Implement a `compose()` function using `reduceRight()`.
3. ES2024 introduced `Object.groupBy()` — how does it compare to a reduce-based groupBy?

---

### Question 63

| Field | Details |
|-------|---------|
| **Number** | 63 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Array Methods |
| **Type** | Practical / Debugging |

#### ❓ Interview Question
> *"Explain `Array.prototype.flat()` and `flatMap()`. What are common use cases and performance considerations?"*

#### 📖 Detailed Answer

- `flat(depth)` — creates a new array with sub-array elements flattened up to `depth` levels.
- `flatMap(fn)` — `map()` + `flat(1)` in one pass. More performant than chaining the two.

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// flat() — flattening nested arrays
// ─────────────────────────────────────────────

const data = [1, [2, 3], [4, [5, 6]], [7, [8, [9]]]];

console.log(data.flat());       // [1, 2, 3, 4, [5, 6], 7, [8, [9]]]  depth=1 (default)
console.log(data.flat(2));      // [1, 2, 3, 4, 5, 6, 7, [8, [9]]]   depth=2
console.log(data.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]      fully flattened


// ─────────────────────────────────────────────
// flat() removes holes in arrays
// ─────────────────────────────────────────────

const sparse = [1, , 2, , 3];
console.log(sparse.flat()); // [1, 2, 3] ← holes removed!


// ─────────────────────────────────────────────
// flatMap() — one-pass map + flatten(1)
// ─────────────────────────────────────────────

const sentences = ['Hello World', 'I love JS'];

// Using map() + flat()
const words1 = sentences.map(s => s.split(' ')).flat();
console.log(words1); // ['Hello', 'World', 'I', 'love', 'JS']

// Using flatMap() — same result, one pass (better performance)
const words2 = sentences.flatMap(s => s.split(' '));
console.log(words2); // ['Hello', 'World', 'I', 'love', 'JS']


// ─────────────────────────────────────────────
// REAL-WORLD USE CASE: Expand/contract items
// ─────────────────────────────────────────────

const cart = [
  { name: 'T-Shirt', qty: 3, price: 20 },
  { name: 'Jeans',   qty: 1, price: 80 }
];

// Expand each item into individual units
const items = cart.flatMap(({ name, qty, price }) =>
  Array(qty).fill({ name, price })
);
console.log(items);
// [
//   { name: 'T-Shirt', price: 20 },
//   { name: 'T-Shirt', price: 20 },
//   { name: 'T-Shirt', price: 20 },
//   { name: 'Jeans',   price: 80 }
// ]


// ─────────────────────────────────────────────
// KILLER USE CASE: Conditional inclusion with flatMap
// (returning empty array to "remove" items, array to "expand")
// ─────────────────────────────────────────────

const data2 = [1, 2, 3, 4, 5];

const result = data2.flatMap(x => {
  if (x === 3) return [];          // Remove 3
  if (x === 5) return [x, x * 10]; // Expand 5 → [5, 50]
  return [x];                       // Keep others as-is
});
console.log(result); // [1, 2, 4, 5, 50]
// flatMap as a combined filter + map + expand — VERY powerful pattern
```

#### 💡 Important Interview Tips
- `flatMap()` is **only depth-1 flattening** — use `map().flat(n)` for deeper nesting.
- The empty-array-return trick in `flatMap()` is a **filter pattern** — a common interview question.
- `flat()` always returns a **new array**.

#### ⚠️ Common Mistakes
```javascript
// ❌ Expecting flatMap to flatten more than 1 level
const deep = [[1, [2]], [3, [4]]];
console.log(deep.flatMap(x => x)); // [1, [2], 3, [4]] — only 1 level!
// ✅ Use flat(2):
console.log(deep.flat(2)); // [1, 2, 3, 4]
```

#### 🔁 Follow-up Questions
1. How would you implement `flat()` using `reduce()`?
2. What is the time complexity of `flat(Infinity)` on a deeply nested structure?
3. Is `flatMap(fn)` strictly equivalent to `.map(fn).flat(1)`? Are there edge cases?

---

### Question 64

| Field | Details |
|-------|---------|
| **Number** | 64 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | String Methods |
| **Type** | Practical + Output |

#### ❓ Interview Question
> *"What is the difference between `String.replace()` and `String.replaceAll()`? How do you use both with regular expressions?"*

#### 📖 Detailed Answer

| Method | Replaces | Accepts RegEx | Introduced |
|--------|----------|---------------|-----------|
| `replace(pattern, replacement)` | First match (string) / All matches (with `/g` flag) | ✅ | ES1 |
| `replaceAll(pattern, replacement)` | **All** matches | ✅ (must have `/g` flag or throws) | ES2021 |

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// replace() — replaces FIRST occurrence (with string pattern)
// ─────────────────────────────────────────────

const text = 'foo bar foo baz foo';

console.log(text.replace('foo', 'qux'));   // 'qux bar foo baz foo' ← only first!
console.log(text.replace(/foo/g, 'qux')); // 'qux bar qux baz qux' ← all (with /g)


// ─────────────────────────────────────────────
// replaceAll() — replaces ALL occurrences
// ─────────────────────────────────────────────

console.log(text.replaceAll('foo', 'qux')); // 'qux bar qux baz qux' ✅

// replaceAll with RegEx requires /g flag:
console.log(text.replaceAll(/foo/g, 'qux')); // ✅ Works
// text.replaceAll(/foo/, 'qux');              // ❌ TypeError: without /g flag


// ─────────────────────────────────────────────
// CAPTURE GROUPS — Advanced replace usage
// ─────────────────────────────────────────────

// $1, $2... reference capture groups
const date = '2024-12-25';
const formatted = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
console.log(formatted); // '25/12/2024'


// ─────────────────────────────────────────────
// FUNCTION REPLACEMENT — Most powerful form
// ─────────────────────────────────────────────

// Dynamic replacements based on matched value
const template = 'Hello {{name}}, you have {{count}} messages';
const vars = { name: 'Alice', count: 5 };

const rendered = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
  return vars[key] !== undefined ? vars[key] : match;
});
console.log(rendered); // 'Hello Alice, you have 5 messages'


// ─────────────────────────────────────────────
// REAL-WORLD: URL slug generator
// ─────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/g, '')    // Remove special chars
    .replaceAll(/[\s_-]+/g, '-')   // Replace spaces/underscores with hyphens
    .replaceAll(/^-+|-+$/g, '');   // Trim hyphens from start/end
}

console.log(slugify('Hello, World! This is a Test.'));
// 'hello-world-this-is-a-test'
console.log(slugify('  JavaScript ES6+ Features  '));
// 'javascript-es6-features'
```

#### 💡 Important Interview Tips
- `replaceAll()` with a **string** pattern replaces all occurrences without needing `/g`.
- `replaceAll()` with a **RegEx** pattern **requires** the `/g` flag, or it throws `TypeError`.
- The **function replacement** form of `replace()` is extremely powerful for templating.

#### ⚠️ Common Mistakes
```javascript
// ❌ Using replace() for global replacement with string pattern
'a.b.c'.replace('.', '/'); // 'a/b.c' ← only first dot replaced!
// ✅ 
'a.b.c'.replaceAll('.', '/'); // 'a/b/c'
// or:
'a.b.c'.replace(/\./g, '/'); // 'a/b/c'
```

#### 🔁 Follow-up Questions
1. How does the replacement string `$&` work in `replace()`?
2. What is a named capture group and how do you use it with `replace()`?
3. What is the performance difference between `replaceAll()` and `replace()` with `/g`?

---

### Question 65

| Field | Details |
|-------|---------|
| **Number** | 65 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Destructuring |
| **Type** | Tricky + Real-world |

#### ❓ Interview Question
> *"How do default values work in destructuring? What is the difference between `undefined` and `null` in this context?"*

#### 📖 Detailed Answer

Default values in destructuring are applied **only when the value is `undefined`** — not for `null`, `0`, `''`, or `false`.

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// OBJECT DESTRUCTURING WITH DEFAULTS
// ─────────────────────────────────────────────

const config = {
  host: 'localhost',
  port: undefined,  // ← will trigger default
  debug: null,      // ← will NOT trigger default (null ≠ undefined)
  timeout: 0        // ← will NOT trigger default (0 ≠ undefined)
};

const {
  host    = '127.0.0.1',  // default not used (value exists)
  port    = 3000,         // default USED ← undefined triggers default
  debug   = true,         // default NOT used ← null doesn't trigger default!
  timeout = 5000,         // default NOT used ← 0 doesn't trigger default!
  retries = 3             // default USED ← key doesn't exist (undefined)
} = config;

console.log(host);    // 'localhost'
console.log(port);    // 3000  ← default applied
console.log(debug);   // null  ← null preserved, NOT replaced by true!
console.log(timeout); // 0     ← 0 preserved, NOT replaced by 5000!
console.log(retries); // 3     ← default applied


// ─────────────────────────────────────────────
// ARRAY DESTRUCTURING WITH DEFAULTS
// ─────────────────────────────────────────────

const [x = 10, y = 20, z = 30] = [1, undefined, null];

console.log(x); // 1   ← value exists
console.log(y); // 20  ← undefined → default applied
console.log(z); // null ← null → default NOT applied!


// ─────────────────────────────────────────────
// COMBINING: Rename + Default
// ─────────────────────────────────────────────

const response = { statusCode: 200 };

const {
  statusCode: status = 500,   // rename to 'status', default 500
  message: msg = 'OK',        // rename to 'msg', default 'OK'
  data: payload = {}          // rename to 'payload', default {}
} = response;

console.log(status);  // 200
console.log(msg);     // 'OK'    ← default applied
console.log(payload); // {}      ← default applied


// ─────────────────────────────────────────────
// FUNCTION PARAMETERS WITH DEFAULTS (React pattern)
// ─────────────────────────────────────────────

function createButton({
  label    = 'Click Me',
  color    = 'blue',
  disabled = false,
  onClick  = () => {}
} = {}) {  // ← default to empty object (allows calling createButton() with no args)
  return { label, color, disabled, onClick };
}

console.log(createButton());
// { label: 'Click Me', color: 'blue', disabled: false, onClick: [Function] }

console.log(createButton({ label: 'Submit', color: 'green' }));
// { label: 'Submit', color: 'green', disabled: false, onClick: [Function] }
```

#### 💡 Important Interview Tips
- Default values **only** kick in for `undefined` — not `null`, `0`, `''`, or `false`.
- The ` = {}` at the end of the function parameter destructure allows calling the function with **no arguments**.
- Combine rename + default: `{ key: newName = defaultValue }`.

#### ⚠️ Common Mistakes
```javascript
// ❌ Expecting null to trigger the default
const { x = 10 } = { x: null };
console.log(x); // null ← NOT 10! This surprises many developers
// ✅ Guard explicitly if you want to handle null too:
const rawX = null;
const safeX = rawX ?? 10; // 10 — nullish coalescing handles both null and undefined
```

#### 🔁 Follow-up Questions
1. Can default values in destructuring be expressions or function calls?
2. What is the order of evaluation: default values or aliasing?
3. How do you destructure with defaults from a function that might return `null`?

---

### Question 66

| Field | Details |
|-------|---------|
| **Number** | 66 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Spread Operator |
| **Type** | Debugging / Tricky |

#### ❓ Interview Question
> *"The spread operator creates a 'shallow clone' of objects. Explain what that means, the bugs it causes, and how to deep clone properly."*

#### 📖 Detailed Answer

A **shallow clone** copies only the **top-level properties**. Nested objects are **still shared by reference** between the original and the clone.

```
Shallow Clone Memory Diagram:
─────────────────────────────────────────────────────────
original = { a: 1, b: { c: 2 } }
clone    = { ...original }

Stack:           Heap:
original.a → 1   (primitive — copied by value ✅)
original.b ──────────────┐
clone.b    ──────────────┘──→ { c: 2 }  (same reference! ❌)
─────────────────────────────────────────────────────────
```

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// SHALLOW CLONE — The Trap
// ─────────────────────────────────────────────

const original = {
  name: 'Alice',
  address: { city: 'Mumbai', zip: '400001' },
  hobbies: ['reading', 'coding']
};

const clone = { ...original };

clone.name           = 'Bob';      // ✅ Doesn't affect original (primitive)
clone.address.city   = 'Pune';     // ❌ AFFECTS ORIGINAL! (shared reference)
clone.hobbies.push('gaming');      // ❌ AFFECTS ORIGINAL! (shared reference)

console.log(original.name);          // 'Alice' ← safe
console.log(original.address.city);  // 'Pune'  ← MUTATED! Bug!
console.log(original.hobbies);       // ['reading', 'coding', 'gaming'] ← MUTATED!


// ─────────────────────────────────────────────
// DEEP CLONE — 4 approaches
// ─────────────────────────────────────────────

// 1. JSON (simple, has limitations)
const deepClone1 = JSON.parse(JSON.stringify(original));
// Limitations: loses functions, undefined, Date, Map, Set, circular refs!

// 2. structuredClone() (ES2022, modern & recommended)
const deepClone2 = structuredClone(original);
deepClone2.address.city = 'Delhi';
console.log(original.address.city); // 'Pune' ← not affected ✅

// 3. Recursive deep clone (for learning)
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
}

// 4. Libraries: lodash _.cloneDeep() (most battle-tested)


// ─────────────────────────────────────────────
// SPREAD IN ARRAYS — same shallow behavior
// ─────────────────────────────────────────────

const arr = [[1, 2], [3, 4]];
const arrClone = [...arr];

arrClone[0].push(99); // Mutates original!
console.log(arr[0]);  // [1, 2, 99] ← surprise!

// ✅ Deep clone array:
const deepArr = arr.map(row => [...row]); // One level down
```

#### 💡 Important Interview Tips
- Spread is **always shallow** — for primitives this is fine, for objects/arrays it causes shared references.
- **`structuredClone()`** is the modern standard for deep cloning (handles `Date`, `Map`, `Set`, `ArrayBuffer`).
- `JSON.parse(JSON.stringify())` is the **quick but limited** approach — avoids it in production.

#### ⚠️ Common Mistakes
```javascript
// ❌ Redux/React state mutation through shallow spread
const state = { user: { name: 'Alice', prefs: { theme: 'dark' } } };
const newState = { ...state, user: { ...state.user } };
newState.user.prefs.theme = 'light'; // Still mutates original.user.prefs!
// ✅ Must spread ALL nested levels or use Immer
const newState2 = {
  ...state,
  user: { ...state.user, prefs: { ...state.user.prefs, theme: 'light' } }
};
```

#### 🔁 Follow-up Questions
1. What are the limitations of `structuredClone()`? (It doesn't handle functions, DOM nodes, class instances with methods)
2. How does Immer solve the immutable update problem?
3. What is the difference between `Object.assign({}, obj)` and `{ ...obj }`?

---

### Question 67

| Field | Details |
|-------|---------|
| **Number** | 67 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | Rest Operator |
| **Type** | Practical + Real-world |

#### ❓ Interview Question
> *"Explain the rest operator in function parameters. How does it differ from `arguments`? Show advanced patterns."*

#### 📖 Detailed Answer

| Feature | `arguments` | Rest `...args` |
|---------|------------|---------------|
| **Type** | Array-like object | **Real Array** |
| **Array methods** | ❌ No direct access | ✅ Full array API |
| **Arrow functions** | ❌ Not available | ✅ Available |
| **Named params** | ❌ All or nothing | ✅ Collects remaining |
| **`length`** | ✅ All args | ✅ Only rest args |

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// BASIC REST OPERATOR
// ─────────────────────────────────────────────

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15


// ─────────────────────────────────────────────
// Rest collects REMAINING arguments (after named params)
// ─────────────────────────────────────────────

function logger(level, timestamp, ...messages) {
  console.log(`[${level}] ${timestamp}: ${messages.join(' | ')}`);
}

logger('INFO', '10:30:00', 'Server started', 'Port 3000', 'Env: prod');
// [INFO] 10:30:00: Server started | Port 3000 | Env: prod


// ─────────────────────────────────────────────
// REST vs arguments
// ─────────────────────────────────────────────

function oldWay() {
  // arguments is NOT a real array
  const args = Array.from(arguments); // Must convert
  return args.map(x => x * 2);
}

function newWay(...args) {
  return args.map(x => x * 2); // Already a real array!
}

// Arrow functions: arguments doesn't exist!
const arrowFn = (...args) => args.reduce((a, b) => a + b, 0);
// const brokenArrow = () => arguments; // ❌ ReferenceError in strict mode


// ─────────────────────────────────────────────
// REAL-WORLD: Middleware/HOF patterns
// ─────────────────────────────────────────────

// Curried function builder
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));   // 6
console.log(add(1, 2)(3));   // 6
console.log(add(1)(2, 3));   // 6
console.log(add(1, 2, 3));   // 6


// ─────────────────────────────────────────────
// REST in destructuring (array)
// ─────────────────────────────────────────────

const [first, second, ...remaining] = [10, 20, 30, 40, 50];
console.log(first);     // 10
console.log(second);    // 20
console.log(remaining); // [30, 40, 50]


// REST in destructuring (object)
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a);    // 1
console.log(b);    // 2
console.log(rest); // { c: 3, d: 4 }
```

#### 💡 Important Interview Tips
- Rest must **always be the last parameter** — you can't have `(a, ...b, c)`.
- Rest in destructuring is different from rest in function params but uses the **same syntax**.
- `arguments` is **not available** in arrow functions — always use rest in modern code.

#### ⚠️ Common Mistakes
```javascript
// ❌ Rest must be LAST
function bad(a, ...b, c) { } // SyntaxError!

// ❌ Using arguments in arrow functions
const fn = () => console.log(arguments); // ReferenceError

// ❌ Forgetting rest params are a real array
function good(...args) {
  // args IS a real array - no need for Array.from()
  return args.filter(x => x > 0);
}
```

#### 🔁 Follow-up Questions
1. What is `Function.prototype.length` when using rest parameters?
2. Can you use rest parameter destructuring in a `for...of` loop?
3. How does rest interact with default parameters?

---

### Question 68

| Field | Details |
|-------|---------|
| **Number** | 68 |
| **Difficulty** | 🟡 Intermediate |
| **Topic** | ES6+ Features |
| **Type** | Conceptual + Output |

#### ❓ Interview Question
> *"Explain Optional Chaining `?.` and Nullish Coalescing `??`. What problems do they solve? Show tricky output questions."*

#### 📖 Detailed Answer

- **`?.`** (Optional Chaining, ES2020) — safely access nested properties that might be `null`/`undefined`.
- **`??`** (Nullish Coalescing, ES2020) — return right side **only if** left side is `null` or `undefined`.

```
?.  Short-circuits if null/undefined:
obj?.prop      → obj == null ? undefined : obj.prop
arr?.[i]       → arr == null ? undefined : arr[i]
fn?.()         → fn == null ? undefined : fn()

?? vs ||:
null  ?? 'default'  → 'default'  (null is nullish)
0     ?? 'default'  → 0          (0 is NOT nullish!)
''    ?? 'default'  → ''         ('' is NOT nullish!)
false ?? 'default'  → false      (false is NOT nullish!)

null  || 'default'  → 'default'
0     || 'default'  → 'default'  ← DANGER if 0 is a valid value!
''    || 'default'  → 'default'  ← DANGER if '' is a valid value!
```

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// OPTIONAL CHAINING
// ─────────────────────────────────────────────

const user = {
  id: 1,
  profile: {
    name: 'Alice',
    address: null
  },
  getAge: () => 30
};

// Without ?.  (verbose, error-prone)
const city1 = user && user.profile && user.profile.address && user.profile.address.city;

// With ?.  (clean)
const city2 = user?.profile?.address?.city;
console.log(city2); // undefined (not an error!)

// Optional method calling
console.log(user.getAge?.());    // 30
console.log(user.getScore?.());  // undefined (method doesn't exist)

// Optional index access
const arr = null;
console.log(arr?.[0]); // undefined (not a TypeError)


// ─────────────────────────────────────────────
// NULLISH COALESCING
// ─────────────────────────────────────────────

const settings = {
  volume:    0,
  username:  '',
  debugMode: false,
  theme:     null
};

// ?? — only falls back for null/undefined
console.log(settings.volume    ?? 50);     // 0      ← 0 is kept!
console.log(settings.username  ?? 'Guest');// ''     ← '' is kept!
console.log(settings.debugMode ?? true);   // false  ← false is kept!
console.log(settings.theme     ?? 'dark'); // 'dark' ← null triggers fallback
console.log(settings.missing   ?? 'N/A'); // 'N/A'  ← undefined triggers fallback

// || vs ?? — THE KEY DIFFERENCE:
console.log(settings.volume    || 50);     // 50    ← 0 is falsy, REPLACED!
console.log(settings.username  || 'Guest');// 'Guest' ← '' is falsy, REPLACED!


// ─────────────────────────────────────────────
// COMBINING ?.  and ??
// ─────────────────────────────────────────────

const apiData = {
  user: null
};

const displayName = apiData?.user?.name ?? 'Anonymous';
console.log(displayName); // 'Anonymous'


// ─────────────────────────────────────────────
// TRICKY OUTPUT QUESTIONS
// ─────────────────────────────────────────────

const obj = { a: { b: 0 } };
console.log(obj?.a?.b ?? 'default'); // 0   ← b exists and is 0
console.log(obj?.a?.c ?? 'default'); // 'default' ← c is undefined

// Short-circuit with side effects
let counter = 0;
const nullObj = null;
nullObj?.method(counter++); // counter++ is NEVER called!
console.log(counter); // 0 ← side effect skipped!

// ??= (Logical Nullish Assignment, ES2021)
let x = null;
x ??= 'default'; // assigns only if null/undefined
console.log(x);  // 'default'

let y = 0;
y ??= 'default'; // 0 is NOT null/undefined, so no assignment
console.log(y);  // 0
```

#### 💡 Important Interview Tips
- `?.` is **short-circuit** — if it evaluates to `null`/`undefined`, the rest of the chain (including side effects) is NOT evaluated.
- `??` is stricter than `||` — only catches `null`/`undefined`, not all falsy values.
- New logical assignment operators: `??=`, `||=`, `&&=` (ES2021).

#### ⚠️ Common Mistakes
```javascript
// ❌ Can't use ?. on the left side of an assignment
obj?.prop = 'value'; // SyntaxError

// ❌ Confusing ?? with ||
const score = 0;
const display = score || 'N/A'; // 'N/A' ← WRONG if 0 is valid!
const display2 = score ?? 'N/A'; // 0    ← CORRECT
```

#### 🔁 Follow-up Questions
1. Can you use `?.` with `new` keyword? (`new Foo?.()` — is this valid?)
2. What is `?.` compiled to in older Babel targets?
3. How does `?.` interact with `delete`? (`delete obj?.prop`)

---

## 🔴 ADVANCED LEVEL (Questions 69–75)

---

### Question 69

| Field | Details |
|-------|---------|
| **Number** | 69 |
| **Difficulty** | 🔴 Advanced |
| **Topic** | Objects |
| **Type** | Deep Technical |

#### ❓ Interview Question
> *"What are property descriptors in JavaScript? Explain `writable`, `enumerable`, `configurable`, and `value`. How do `Object.defineProperty()` and `Object.getOwnPropertyDescriptor()` work?"*

#### 📖 Detailed Answer

Every property on an object has a **descriptor** — metadata that controls how the property behaves.

```
Property Descriptor:
┌─────────────────────────────────────────────┐
│  value        → The stored value            │
│  writable     → Can value be changed?       │
│  enumerable   → Shows in for...in / keys()? │
│  configurable → Can descriptor be changed?  │
│               → Can property be deleted?    │
└─────────────────────────────────────────────┘
Accessor Descriptor (instead of value+writable):
  get  → getter function
  set  → setter function
```

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// Inspecting descriptors
// ─────────────────────────────────────────────

const obj = { name: 'Alice' };
console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
// { value: 'Alice', writable: true, enumerable: true, configurable: true }


// ─────────────────────────────────────────────
// Object.defineProperty
// ─────────────────────────────────────────────

const config = {};

Object.defineProperty(config, 'VERSION', {
  value:        '2.0.0',
  writable:     false,  // Cannot change value
  enumerable:   false,  // Won't appear in for...in or Object.keys()
  configurable: false   // Cannot reconfigure or delete
});

config.VERSION = '3.0.0'; // Silently fails (throws in strict mode)
console.log(config.VERSION);      // '2.0.0' ← unchanged
console.log(Object.keys(config)); // [] ← VERSION is non-enumerable!
console.log('VERSION' in config); // true ← but it EXISTS


// ─────────────────────────────────────────────
// GETTER / SETTER descriptors
// ─────────────────────────────────────────────

const person = { _age: 25 };

Object.defineProperty(person, 'age', {
  get() {
    return this._age;
  },
  set(newAge) {
    if (typeof newAge !== 'number' || newAge < 0 || newAge > 150) {
      throw new RangeError('Invalid age');
    }
    this._age = newAge;
  },
  enumerable: true,
  configurable: true
});

console.log(person.age);  // 25
person.age = 30;
console.log(person.age);  // 30
person.age = -5;          // RangeError: Invalid age


// ─────────────────────────────────────────────
// REAL-WORLD: Non-enumerable private-like fields
// ─────────────────────────────────────────────

function createUser(name, password) {
  const user = { name };

  Object.defineProperty(user, '_password', {
    value:        password,
    writable:     true,
    enumerable:   false,   // Hidden from JSON.stringify and Object.keys
    configurable: false
  });

  user.checkPassword = function(input) {
    return input === this._password;
  };

  return user;
}

const user = createUser('Alice', 'secret123');
console.log(JSON.stringify(user));     // {"name":"Alice"} ← password hidden!
console.log(Object.keys(user));        // ['name', 'checkPassword']
console.log(user.checkPassword('secret123')); // true


// ─────────────────────────────────────────────
// Object.defineProperties — multiple at once
// ─────────────────────────────────────────────

const point = {};
Object.defineProperties(point, {
  x: { value: 0, writable: true,  enumerable: true, configurable: true },
  y: { value: 0, writable: true,  enumerable: true, configurable: true },
  toString: {
    value: function() { return `(${this.x}, ${this.y})`; },
    enumerable: false
  }
});
```

#### 💡 Important Interview Tips
- Descriptor defaults when using `defineProperty`: all flags are `false` by default.
- Descriptor defaults for literal `{ key: value }`: all flags are `true`.
- `Object.freeze()` is implemented by setting `writable: false` and `configurable: false` on all properties.

#### ⚠️ Common Mistakes
```javascript
// ❌ Assuming defineProperty defaults to writable: true
Object.defineProperty(obj, 'x', { value: 5 });
obj.x = 10; // Silently fails! writable defaults to false in defineProperty
// ✅ Be explicit:
Object.defineProperty(obj, 'x', { value: 5, writable: true });
```

#### 🔁 Follow-up Questions
1. Can you have both `value` and `get` in the same descriptor?
2. What is the difference between `configurable: false` and `writable: false`?
3. How does Vue 2's reactivity system use property descriptors (`Object.defineProperty`)?

---

### Question 70

| Field | Details |
|-------|---------|
| **Number** | 70 |
| **Difficulty** | 🔴 Advanced |
| **Topic** | Arrays |
| **Type** | Deep Technical + Output |

#### ❓ Interview Question
> *"What is the difference between `Array.from()` and the spread operator `[...iterable]`? When would one fail where the other works?"*

#### 📖 Detailed Answer

Both convert **iterables** to arrays, but `Array.from()` has superpowers.

| Feature | `[...iterable]` | `Array.from(iterable)` |
|---------|----------------|----------------------|
| **Array-like objects** | ❌ (no Symbol.iterator) | ✅ |
| **Map function** | ❌ (separate `.map()` call) | ✅ Second argument |
| **Infinite iterators** | ❌ (would loop forever) | ❌ (same issue) |
| **Custom length** | ❌ | ✅ `Array.from({ length: n })` |
| **NodeList/DOM** | ✅ | ✅ |

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// Both work on iterables (String, Set, Map, etc.)
// ─────────────────────────────────────────────

const str = 'hello';
console.log([...str]);           // ['h', 'e', 'l', 'l', 'o']
console.log(Array.from(str));    // ['h', 'e', 'l', 'l', 'o']

const set = new Set([1, 2, 3, 2, 1]);
console.log([...set]);           // [1, 2, 3]
console.log(Array.from(set));    // [1, 2, 3]


// ─────────────────────────────────────────────
// Array-like objects (have length + indexed props, NO Symbol.iterator)
// ─────────────────────────────────────────────

const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };

console.log(Array.from(arrayLike)); // ['a', 'b', 'c'] ✅
console.log([...arrayLike]);        // TypeError: arrayLike is not iterable ❌


// ─────────────────────────────────────────────
// Array.from MAP function — the killer feature
// ─────────────────────────────────────────────

// Create array [1..10] without loops:
const range = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Generate times table:
const table5 = Array.from({ length: 10 }, (_, i) => (i + 1) * 5);
console.log(table5); // [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

// Create 3x3 zero matrix:
const matrix = Array.from({ length: 3 }, () => Array(3).fill(0));


// ─────────────────────────────────────────────
// Unicode strings — Array.from wins!
// ─────────────────────────────────────────────

const emoji = '😀🎉🚀';
console.log(emoji.length);        // 6 ← UTF-16 code units (wrong for emoji!)
console.log([...emoji].length);   // 3 ← correct! (spread is Unicode-aware)
console.log(Array.from(emoji).length); // 3 ← also correct

// ← Both spread and Array.from handle surrogate pairs correctly
// But simple for loop with emoji.length is WRONG:
for (let i = 0; i < emoji.length; i++) {
  console.log(emoji[i]); // Prints broken half-surrogates!
}


// ─────────────────────────────────────────────
// arguments object (array-like, no Symbol.iterator in older engines)
// ─────────────────────────────────────────────

function test() {
  const arr = Array.from(arguments);  // ✅ Always works
  const arr2 = [...arguments];         // ✅ Works in modern JS (arguments has iterator)
  return arr.reduce((a, b) => a + b, 0);
}
```

#### 💡 Important Interview Tips
- `Array.from({ length: n }, mapFn)` is the idiomatic way to create **range arrays**.
- For **Unicode/emoji strings**, both spread and `Array.from` are aware of surrogate pairs — unlike `str[i]` indexing.
- `Array.from()` is strictly more capable — use spread only when you don't need the map function.

#### ⚠️ Common Mistakes
```javascript
// ❌ Using new Array(n).map() — doesn't work because holes!
new Array(5).map((_, i) => i); // [empty × 5] ← holes, map skips them!

// ✅ Use Array.from:
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

// ✅ Or spread + map:
[...Array(5)].map((_, i) => i); // [0, 1, 2, 3, 4] (spread converts holes to undefined)
```

#### 🔁 Follow-up Questions
1. How does `Array.from()` handle `Map` objects (what does each element look like)?
2. Is `Array.from(new Set(arr))` a common dedup pattern?
3. What is `Array.of()` and how does it differ from `new Array()`?

---

### Question 71

| Field | Details |
|-------|---------|
| **Number** | 71 |
| **Difficulty** | 🔴 Advanced |
| **Topic** | Array Methods |
| **Type** | Performance + Debugging |

#### ❓ Interview Question
> *"What are the performance pitfalls of chaining array methods? How would you optimize a pipeline processing 1 million records?"*

#### 📖 Detailed Answer

Each chained array method creates a **new intermediate array** and does a **full pass** through the data. For large datasets, this is O(n × number_of_methods).

```
Chaining Execution Flow:
[...1M items]
  .filter()   → creates new array (1M iterations) → result: 500K items
  .map()      → creates new array (500K iterations)
  .filter()   → creates new array (varies)
  .map()      → creates new array (final result)

Total iterations: ~2M+ | Extra memory: 3 intermediate arrays
```

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// NAIVE APPROACH — Multiple passes, multiple arrays
// ─────────────────────────────────────────────

const data = Array.from({ length: 1_000_000 }, (_, i) => ({
  id: i,
  value: Math.random() * 100,
  active: Math.random() > 0.5
}));

console.time('chained');
const result1 = data
  .filter(x => x.active)          // Pass 1: ~1M iterations → ~500K array
  .map(x => ({ ...x, value: x.value * 2 }))  // Pass 2: ~500K iterations
  .filter(x => x.value > 50)      // Pass 3: ~500K iterations
  .map(x => x.id);                // Pass 4: varies
console.timeEnd('chained');


// ─────────────────────────────────────────────
// OPTIMIZED — Single pass with reduce()
// ─────────────────────────────────────────────

console.time('reduce');
const result2 = data.reduce((acc, x) => {
  if (!x.active) return acc;       // Filter condition 1
  const doubled = x.value * 2;
  if (doubled <= 50) return acc;   // Filter condition 2
  acc.push(x.id);                  // Map: collect only id
  return acc;
}, []);
console.timeEnd('reduce');
// ← Typically 2-4x faster for large datasets


// ─────────────────────────────────────────────
// GENERATOR-BASED LAZY PIPELINE
// (Process items on-demand, no intermediate arrays)
// ─────────────────────────────────────────────

function* lazyFilter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
  }
}

function* lazyMap(iterable, transform) {
  for (const item of iterable) {
    yield transform(item);
  }
}

function take(iterable, n) {
  const result = [];
  for (const item of iterable) {
    result.push(item);
    if (result.length >= n) break; // STOP early!
  }
  return result;
}

// Lazy pipeline — only processes items as needed!
const pipeline = lazyMap(
  lazyFilter(data, x => x.active && x.value * 2 > 50),
  x => x.id
);

const first100 = take(pipeline, 100);
// With lazy evaluation, we stop after finding 100 items
// Even if data has 1M items, we might only touch 300 items!


// ─────────────────────────────────────────────
// TRANSDUCER PATTERN — Compose transforms without intermediate arrays
// ─────────────────────────────────────────────

const filterActive   = reducer => (acc, x) => x.active ? reducer(acc, x) : acc;
const doubleValue    = reducer => (acc, x) => reducer(acc, { ...x, value: x.value * 2 });
const filterAbove50  = reducer => (acc, x) => x.value > 50 ? reducer(acc, x) : acc;
const collectIds     = (acc, x) => { acc.push(x.id); return acc; };

const transduce = (xform, reducer, init, data) =>
  data.reduce(xform(reducer), init);

const composed = x => filterActive(doubleValue(filterAbove50(x)));
const result3  = transduce(composed, collectIds, [], data);
// Single pass, no intermediate arrays, fully composable
```

#### 💡 Important Interview Tips
- For **critical paths** with large data, prefer `reduce()` over chained methods.
- **Lazy evaluation** via generators is the most memory-efficient approach.
- This question demonstrates knowledge of **algorithmic optimization**, not just syntax.

#### ⚠️ Common Mistakes
```javascript
// ❌ Early optimization — premature optimization is the root of all evil
// For small arrays (< 10K items), chaining is FINE and more readable
// Only optimize when profiling shows a bottleneck

// ❌ Using sort() without benchmark
[...largeArray].sort((a, b) => a - b); // sort is O(n log n) and mutates!
```

#### 🔁 Follow-up Questions
1. What is the time complexity of `sort()` in V8's implementation? (Timsort — O(n log n))
2. How would you implement a lazy `map` and `filter` using generators?
3. What are **transducers** and when would you reach for them?

---

### Question 72

| Field | Details |
|-------|---------|
| **Number** | 72 |
| **Difficulty** | 🔴 Advanced |
| **Topic** | ES6+ Features |
| **Type** | Deep Technical |

#### ❓ Interview Question
> *"What are `Symbol`s in JavaScript? How do they work as object keys? What built-in `Symbol`s exist and how are they used?"*

#### 📖 Detailed Answer

A `Symbol` is a **unique, immutable primitive**. Every Symbol is guaranteed to be distinct — even if they have the same description. They are often used as **non-string object keys** to avoid naming collisions.

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// SYMBOLS ARE ALWAYS UNIQUE
// ─────────────────────────────────────────────

const s1 = Symbol('id');
const s2 = Symbol('id');
console.log(s1 === s2);       // false! Each Symbol is unique
console.log(typeof s1);       // 'symbol'
console.log(s1.toString());   // 'Symbol(id)'
console.log(s1.description);  // 'id'


// ─────────────────────────────────────────────
// Symbol as object keys — avoid collisions
// ─────────────────────────────────────────────

const ID    = Symbol('id');
const SCORE = Symbol('score');

const user = {
  name: 'Alice',
  [ID]: 'u_secret_123',    // Symbol key
  [SCORE]: 9999
};

console.log(user[ID]);    // 'u_secret_123'
console.log(user.name);   // 'Alice'

// Symbol keys are HIDDEN from most enumeration:
console.log(Object.keys(user));          // ['name'] ← Symbol keys excluded!
console.log(JSON.stringify(user));       // '{"name":"Alice"}' ← Symbols excluded!
console.log(Object.getOwnPropertyNames(user)); // ['name'] ← Symbols excluded!

// But you can get them:
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id), Symbol(score)]
console.log(Reflect.ownKeys(user)); // ['name', Symbol(id), Symbol(score)]


// ─────────────────────────────────────────────
// Symbol.for() — Global Symbol Registry (shared)
// ─────────────────────────────────────────────

const g1 = Symbol.for('globalKey');
const g2 = Symbol.for('globalKey');
console.log(g1 === g2); // true! ← Symbol.for shares across realms


// ─────────────────────────────────────────────
// WELL-KNOWN SYMBOLS — customize built-in behavior
// ─────────────────────────────────────────────

// Symbol.iterator — make ANY object iterable!
class Range {
  constructor(start, end) {
    this.start = start;
    this.end   = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end   = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

const range = new Range(1, 5);
console.log([...range]);     // [1, 2, 3, 4, 5]
for (const n of range) console.log(n); // 1 2 3 4 5


// Symbol.toPrimitive — control type coercion
class Money {
  constructor(amount, currency) {
    this.amount   = amount;
    this.currency = currency;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number')  return this.amount;
    if (hint === 'string')  return `${this.amount} ${this.currency}`;
    return this.amount; // 'default'
  }
}

const price = new Money(42, 'USD');
console.log(`Price: ${price}`);     // 'Price: 42 USD'  (string hint)
console.log(price + 10);            // 52               (number hint)
console.log(price > 40);            // true             (number hint)


// Symbol.hasInstance — control instanceof
class EvenNumber {
  static [Symbol.hasInstance](num) {
    return num % 2 === 0;
  }
}
console.log(2  instanceof EvenNumber); // true
console.log(3  instanceof EvenNumber); // false
```

#### 💡 Important Interview Tips
- Symbols solve the **name collision problem** in mixins and plugins (like how React uses `$$typeof`).
- `Symbol.for()` uses a **global registry** — same key = same Symbol (useful for cross-realm sharing).
- Well-known symbols are the protocol for customizing JS built-in behavior.

#### ⚠️ Common Mistakes
```javascript
// ❌ Expecting Symbol descriptions to make them equal
Symbol('x') === Symbol('x'); // false! ALWAYS false

// ❌ Forgetting Symbol keys are invisible to JSON.stringify
// This can cause data loss if you store important data in Symbol keys!
```

#### 🔁 Follow-up Questions
1. How does React use `Symbol.for('react.element')` internally?
2. What is `Symbol.asyncIterator` and how does it work with `for await...of`?
3. What is `Symbol.species`? (Controversial — mostly deprecated in modern specs)

---

### Question 73

| Field | Details |
|-------|---------|
| **Number** | 73 |
| **Difficulty** | 🔴 Advanced |
| **Topic** | Destructuring |
| **Type** | Complex Pattern |

#### ❓ Interview Question
> *"Demonstrate advanced destructuring: combining renaming, defaults, rest, nested patterns, and parameter destructuring in a single complex example."*

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// COMPLEX REAL-WORLD API RESPONSE PROCESSING
// ─────────────────────────────────────────────

const apiPayload = {
  status: 'success',
  timestamp: '2024-12-25T10:00:00Z',
  data: {
    users: [
      {
        id:    1,
        login: 'alice_dev',
        profile: {
          displayName: 'Alice Smith',
          avatar: null,
          stats: { posts: 42, followers: 1200 }
        },
        roles: ['admin', 'editor', 'viewer'],
        settings: undefined
      },
      {
        id:    2,
        login: 'bob_ops',
        profile: {
          displayName: 'Bob Jones',
          avatar: 'https://cdn.example.com/bob.jpg',
          stats: { posts: 7, followers: 300 }
        },
        roles: ['viewer'],
        settings: { theme: 'dark' }
      }
    ],
    pagination: { page: 1, total: 2, perPage: 20 }
  }
};

// ─────────────────────────────────────────────
// MASTER DESTRUCTURE — All features combined
// ─────────────────────────────────────────────

const {
  status,
  timestamp: createdAt,      // ← RENAME: timestamp → createdAt
  data: {
    users: [
      {
        id:    firstId,      // ← RENAME
        login: firstLogin,
        profile: {
          displayName: firstName = 'Unknown',   // ← RENAME + DEFAULT
          avatar:      firstAvatar = '/default.png', // ← DEFAULT (null doesn't trigger!)
          stats: { posts: firstPosts, ...otherStats }  // ← NESTED REST
        },
        roles: [primaryRole, ...otherRoles],    // ← ARRAY DESTRUCTURE + REST
        settings: firstSettings = {}            // ← DEFAULT for undefined
      },
      ...remainingUsers      // ← REST in array destructure (remaining users)
    ],
    pagination: { page, total, perPage: pageSize = 20 }  // ← RENAME + DEFAULT
  }
} = apiPayload;

console.log(status);       // 'success'
console.log(createdAt);    // '2024-12-25T10:00:00Z'
console.log(firstId);      // 1
console.log(firstName);    // 'Alice Smith'
console.log(firstAvatar);  // null ← null doesn't trigger default! Bug potential!
console.log(firstPosts);   // 42
console.log(otherStats);   // { followers: 1200 }
console.log(primaryRole);  // 'admin'
console.log(otherRoles);   // ['editor', 'viewer']
console.log(firstSettings);// {} ← undefined → default applied
console.log(remainingUsers.length); // 1
console.log(pageSize);     // 20 (default, perPage existed)


// ─────────────────────────────────────────────
// FUNCTION PARAMETER DESTRUCTURING — Real React component
// ─────────────────────────────────────────────

function UserCard({
  user: {
    login,
    profile: {
      displayName: name = 'Anonymous',
      avatar = '/default.png',
      stats: { posts = 0, followers = 0 } = {}  // ← Default for the stats object itself
    } = {},  // ← Default if profile is null/undefined
    roles:  [primaryRole2 = 'viewer'] = [],      // ← Default role if empty
    settings: { theme = 'light' } = {}           // ← Default if settings undefined
  },
  isCurrentUser = false,               // ← Top-level default param
  onSelect,
  ...eventHandlers                     // ← Collect remaining props (like React spread)
}) {
  return { login, name, avatar, posts, followers, primaryRole2, theme, isCurrentUser };
}

console.log(UserCard({ user: apiPayload.data.users[0] }));
// { login: 'alice_dev', name: 'Alice Smith', avatar: null, posts: 42,
//   followers: 1200, primaryRole2: 'admin', theme: 'light', isCurrentUser: false }
```

#### 💡 Important Interview Tips
- The `= {}` default at the object level protects against `undefined` top-level values.
- Null still won't trigger defaults — use `?? ` after destructuring if null is possible.
- Deep destructuring beyond 3 levels hurts readability — extract intermediate variables.

#### 🔁 Follow-up Questions
1. What happens if `profile` is `null` vs `undefined` in the above example?
2. How does TypeScript's interface relate to destructuring patterns?
3. Can you destructure function return values directly in a `for...of` loop?

---

### Question 74

| Field | Details |
|-------|---------|
| **Number** | 74 |
| **Difficulty** | 🔴 Advanced |
| **Topic** | Spread Operator |
| **Type** | Deep Technical / Debugging |

#### ❓ Interview Question
> *"What is the difference between spread (`{ ...obj }`) and `Object.assign()`? How does each handle the prototype chain, getters, and non-enumerable properties?"*

#### 📖 Detailed Answer

| Feature | `{ ...obj }` | `Object.assign()` |
|---------|-------------|------------------|
| Copies enumerable own props | ✅ | ✅ |
| Invokes getters | ✅ (copies the VALUE) | ✅ (copies the VALUE) |
| Copies non-enumerable | ❌ | ❌ |
| Copies prototype | ❌ | ❌ |
| Triggers target setters | ❌ (defines new prop) | ✅ (calls setter on target!) |
| Multiple sources | ✅ `{ ...a, ...b }` | ✅ `Object.assign(target, a, b)` |

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// THE GETTER TRAP
// ─────────────────────────────────────────────

const source = {
  get value() {
    console.log('getter called!');
    return Math.random(); // Dynamic value
  }
};

const spread  = { ...source };    // getter called! → copies the RESULT (a fixed number)
const assign  = Object.assign({}, source); // getter called! → copies the RESULT

console.log(spread.value === spread.value);   // true (static copy)
console.log(source.value === source.value);   // false (dynamic getter)


// ─────────────────────────────────────────────
// THE SETTER TRAP — KEY DIFFERENCE
// ─────────────────────────────────────────────

const target = {
  _x: 0,
  set x(val) {
    console.log(`setter called with ${val}`);
    this._x = val * 10; // Multiplies by 10!
  }
};

Object.assign(target, { x: 5 });
// "setter called with 5" ← Object.assign TRIGGERS the setter!
console.log(target._x); // 50 (setter applied transformation)

const spreadTarget = { ...target, x: 5 };
// Setter NOT called ← spread DEFINES the property directly
console.log(spreadTarget.x);  // 5 (no transformation)
console.log(spreadTarget._x); // 0 (setter never ran)


// ─────────────────────────────────────────────
// NON-ENUMERABLE PROPERTIES — neither copies them
// ─────────────────────────────────────────────

const obj = Object.create({ protoMethod: () => 'from proto' }, {
  visible:  { value: 1, enumerable: true  },
  hidden:   { value: 2, enumerable: false },
});

const copy1 = { ...obj };
const copy2 = Object.assign({}, obj);

console.log(copy1.visible);   // 1   ← enumerable own: YES
console.log(copy1.hidden);    // undefined ← non-enumerable: NO
console.log(copy1.protoMethod); // undefined ← prototype: NO

// To copy ALL own properties (including non-enumerable):
const fullCopy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(obj) // ← copies complete descriptors!
);
console.log(fullCopy.hidden); // 2 ✅


// ─────────────────────────────────────────────
// Object.getOwnPropertyDescriptors + Object.create
// — Perfect clone including prototype and all descriptors
// ─────────────────────────────────────────────

function perfectClone(obj) {
  return Object.create(
    Object.getPrototypeOf(obj),           // Preserve prototype
    Object.getOwnPropertyDescriptors(obj) // Preserve all descriptors
  );
}

class Vector {
  constructor(x, y) { this.x = x; this.y = y; }
  get magnitude() { return Math.sqrt(this.x**2 + this.y**2); }
  toString() { return `(${this.x}, ${this.y})`; }
}

const v = new Vector(3, 4);
const vClone = perfectClone(v);

console.log(vClone instanceof Vector); // true ← prototype preserved
console.log(vClone.magnitude);         // 5    ← getter works
console.log(vClone.toString());        // "(3, 4)" ← method works
```

#### 💡 Important Interview Tips
- `Object.getOwnPropertyDescriptors()` + `Object.create()` = the only way to **truly clone** an object with all its descriptors and prototype.
- `Object.assign()` triggers **setters** on the target — spread **does not**.
- This distinction matters in **Vue 2 reactivity** and **class-based patterns**.

#### ⚠️ Common Mistakes
```javascript
// ❌ Assuming spread copies methods from prototype
class Animal { speak() { return 'roar'; } }
const a = new Animal();
const copy = { ...a };
copy.speak(); // TypeError: copy.speak is not a function!
// Prototype methods are NOT own enumerable properties
```

#### 🔁 Follow-up Questions
1. How would you shallow clone a class instance preserving its methods?
2. When would `Object.assign()` triggering setters be desirable vs dangerous?
3. How does `Object.getOwnPropertyDescriptors()` help with mixins?

---

### Question 75

| Field | Details |
|-------|---------|
| **Number** | 75 |
| **Difficulty** | 🔴 Advanced |
| **Topic** | Rest Operator |
| **Type** | Expert-level / System Design |

#### ❓ Interview Question
> *"How does the spread/rest protocol work under the hood with `Symbol.iterator`? How do you create a custom iterable that works with both spread and rest patterns?"*

#### 📖 Detailed Answer

```
The Iteration Protocol:
────────────────────────────────────────────────────────────
Iterable:    obj[Symbol.iterator]()  → returns an iterator
Iterator:    { next() → { value, done } }

Spread Protocol:  calls Symbol.iterator, exhausts it
Rest Protocol:    calls Symbol.iterator, exhausts remainder

for...of, [...spread], destructuring, Array.from, Promise.all
  — ALL use Symbol.iterator under the hood
────────────────────────────────────────────────────────────
```

#### 💻 JavaScript Code Example

```javascript
// ─────────────────────────────────────────────
// CUSTOM ITERABLE — Works with ALL spread/rest patterns
// ─────────────────────────────────────────────

class InfiniteCounter {
  constructor(start = 0, step = 1) {
    this.current = start;
    this.step    = step;
  }

  [Symbol.iterator]() {
    let current = this.current;
    const step  = this.step;
    return {
      next() {
        return { value: current, done: false }; // never done!
        current += step; // NOTE: unreachable here — demonstration only
      },
      // Return method: called when iteration breaks early
      return(value) {
        console.log('Iterator cleaned up');
        return { value, done: true };
      }
    };
  }
}

// ─────────────────────────────────────────────
// FINITE CUSTOM ITERABLE — SAFE to spread
// ─────────────────────────────────────────────

class Fibonacci {
  constructor(limit) {
    this.limit = limit;
  }

  [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    let count        = 0;
    const limit      = this.limit;

    return {
      next() {
        if (count++ >= limit) return { done: true };
        const value = prev;
        [prev, curr] = [curr, prev + curr];
        return { value, done: false };
      }
    };
  }
}

const fib = new Fibonacci(8);

// Works with for...of
for (const n of fib) process.stdout.write(n + ' ');
// 0 1 1 2 3 5 8 13

// Works with spread
console.log([...new Fibonacci(8)]);  // [0, 1, 1, 2, 3, 5, 8, 13]

// Works with destructuring + rest
const [f1, f2, f3, ...restFibs] = new Fibonacci(8);
console.log(f1, f2, f3);   // 0 1 1
console.log(restFibs);     // [2, 3, 5, 8, 13]

// Works with Array.from
const fibArr = Array.from(new Fibonacci(6), n => n * 2);
console.log(fibArr); // [0, 2, 2, 4, 6, 10]


// ─────────────────────────────────────────────
// GENERATOR FUNCTION — Sugar for the iterator protocol
// ─────────────────────────────────────────────

function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

// Automatically implements Symbol.iterator!
console.log([...range(0, 10, 2)]); // [0, 2, 4, 6, 8]

const [first, second, ...rest] = range(1, 100);
console.log(first, second, rest.length); // 1 2 97


// ─────────────────────────────────────────────
// ASYNC ITERABLE — for await...of (ES2018)
// ─────────────────────────────────────────────

async function* asyncDataStream(urls) {
  for (const url of urls) {
    const response = await fetch(url);  // Real async operation
    const data     = await response.json();
    yield data;
  }
}

// Usage:
// for await (const data of asyncDataStream(urls)) {
//   console.log(data);
// }


// ─────────────────────────────────────────────
// ITERABLE WITH BOTH Symbol.iterator AND Symbol.asyncIterator
// ─────────────────────────────────────────────

class DataPipeline {
  constructor(items) {
    this.items = items;
  }

  // Synchronous iteration
  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }

  // Async iteration with delay simulation
  async *[Symbol.asyncIterator]() {
    for (const item of this.items) {
      await new Promise(r => setTimeout(r, 10)); // simulate async
      yield item;
    }
  }
}

const pipeline = new DataPipeline([1, 2, 3, 4, 5]);

// Sync:
console.log([...pipeline]); // [1, 2, 3, 4, 5]

// Async:
// (async () => {
//   for await (const item of pipeline) console.log(item);
// })();
```

#### 💡 Important Interview Tips
- **Generators** (`function*`) are syntactic sugar over the iterator protocol — they automatically implement `Symbol.iterator`.
- The `return()` method on an iterator is called when iteration is **broken early** (via `break`, `return`, or thrown error) — important for cleanup.
- Understanding the iterator protocol is essential for working with **streams**, **pagination**, and **lazy evaluation** at scale.

#### ⚠️ Common Mistakes
```javascript
// ❌ Spreading an infinite iterator (hangs the process!)
const natural = { [Symbol.iterator]: function*() { let n=0; while(true) yield n++; } };
// [...natural] ← Never resolves! OOM or infinite loop

// ✅ Always take a finite slice:
const first10 = Array.from({ length: 10 }, () => natural[Symbol.iterator]().next().value);
// Or use a generator with a limit
```

#### 🔁 Follow-up Questions
1. What is the difference between an **iterable** and an **iterator**?
2. How do generators implement `return()` and `throw()` methods on the iterator?
3. How does `Symbol.asyncIterator` work and what consumes it natively? (`for await...of`, `Promise.all` with `for await`)

---

## 📋 REVISION CHEAT SHEET

> *Quick-reference summary for last-minute interview prep*

---

### 🔷 Objects — Key Points

| Concept | Remember |
|---------|---------|
| Property shorthand | `{ name }` = `{ name: name }` |
| Computed keys | `{ [expr]: value }` — brackets at key |
| `null` vs `undefined` | `null` → JSON preserved; `undefined` → JSON dropped |
| `freeze()` | No add/delete/modify — but **shallow only** |
| `seal()` | No add/delete, can modify — but **shallow only** |
| Property descriptors | `writable`, `enumerable`, `configurable`, `value` |
| Deep clone | `structuredClone()` (ES2022) or `JSON.parse(JSON.stringify())` |
| `defineProperty` defaults | All flags `false` by default |

---

### 🔶 Arrays — Key Points

| Concept | Remember |
|---------|---------|
| `typeof []` | `"object"` — always use `Array.isArray()` |
| Sparse arrays | `new Array(3)` creates holes, not `undefined` |
| `find()` vs `filter()` | `find()` stops early; `filter()` always full scan |
| `map()` vs `forEach()` | `map()` returns new array; `forEach()` returns `undefined` |
| `flat(Infinity)` | Full recursive flatten |
| `flatMap()` | `map + flat(1)` in one pass — use empty array `[]` to remove items |
| `reduce()` without init | First element = accumulator; empty array throws |
| `Array.from({length})` | Only way to safely create mapped arrays from length |

---

### 🔸 String Methods — Key Points

| Concept | Remember |
|---------|---------|
| `replace()` | Replaces FIRST only (with string); all with `/g` flag |
| `replaceAll()` | Replaces ALL; RegEx requires `/g` flag |
| `padStart/End` | Only adds characters if current length < target |
| Function in `replace()` | `str.replace(/pattern/, (match, g1, g2) => ...)` |
| `String.raw` tag | No escape processing on backslashes |

---

### 🔹 ES6+ Features — Key Points

| Concept | Remember |
|---------|---------|
| `var` | Function-scoped, hoisted (undefined), re-declarable |
| `let` / `const` | Block-scoped, TDZ, no re-declaration |
| `const` | Prevents re-binding, NOT mutation |
| `??` vs `\|\|` | `??` only for `null`/`undefined`; `\|\|` for all falsy |
| `?.` short-circuit | Side effects after `?.` are NOT executed if null/undefined |
| `Symbol` | Unique key, hidden from `Object.keys`, `JSON.stringify` |
| `Symbol.iterator` | Protocol for `for...of`, spread, destructuring |

---

### 🟣 Destructuring — Quick Reference

```javascript
// Rename              { a: newName }
// Default             { a = 10 }
// Rename + Default    { a: newName = 10 }
// Rest                { a, ...rest }
// Array Skip          [, , third]
// Array Rest          [first, ...others]
// Nested              { a: { b: { c } } }  ← 'a' and 'b' are NOT variables!
// Default in params   function({ x = 10 } = {})
```

> ⚠️ **Critical**: Default values trigger only for `undefined`, NOT for `null`!

---

### 🟠 Spread vs Rest — When to Use What

```javascript
// SPREAD — expands/unpacks
const arr    = [...iter];           // Iterable → Array
const clone  = { ...obj };          // Shallow clone
const merged = { ...a, ...b };      // Merge objects
fn(...args);                        // Array → Arguments

// REST — collects/packs
function f(a, b, ...rest) { }       // Collect remaining params
const [x, y, ...tail] = arr;        // Collect remaining elements
const { a, b, ...others } = obj;    // Collect remaining properties
```

---

### 🎯 Top Tricky Output Questions to Remember

```javascript
// 1. const doesn't deep freeze
const obj = { x: 1 };
obj.x = 2;           // ✅ No error!

// 2. null doesn't trigger destructuring defaults
const { a = 10 } = { a: null };
console.log(a);      // null (not 10!)

// 3. map() preserves length even for undefined returns
[1,2,3].map(n => { if(n===2) return; return n*2; }); // [2, undefined, 6]

// 4. spread doesn't trigger setters on target
const t = { set x(v) { this._x = v * 10; } };
const s = { ...t, x: 5 };
s.x;                 // 5 (setter not triggered)

// 5. typeof before let/const throws TDZ error
console.log(typeof undeclaredVar); // "undefined" (safe for var)
console.log(typeof letVar);        // ReferenceError (TDZ!)
let letVar = 1;

// 6. Array holes skip callbacks
[1, , 3].map(x => x * 2);  // [2, empty, 6]

// 7. Object.assign triggers setters; spread doesn't
```

---

*🚀 Built with precision by a Senior JavaScript Engineer | 15+ Years @ FAANG*
*Topics: Objects | Arrays | Array Methods | String Methods | ES6+ | Template Literals | Destructuring | Spread | Rest*
