---
title: "JavaScript Trick Questions — Code Output"
description: "60+ tricky JavaScript code output questions covering type coercion, equality, references, hoisting, closures, promises, generators, and more."
sidebar:
  order: 9
---

# 🎯 JavaScript Trick Questions — Guess the Output

These are **classic JavaScript gotcha questions** that test your understanding of type coercion, equality, references, hoisting, closures, promises, and the event loop. Try to guess the output **before** reading the explanation!

---

## 1. Loose vs Strict Equality

### Q1: `==` vs `===`

```javascript
console.log(0 == "0");
console.log(0 === "0");
console.log(null == undefined);
console.log(null === undefined);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
true
false
true
false
```

**Why?**
- `==` performs **type coercion** — `"0"` becomes `0`, so `0 == 0` is `true`
- `===` checks **both value and type** — `number` ≠ `string`, so `false`
- `null == undefined` is `true` (special JS rule for `==`)
- `null === undefined` is `false` (different types)
</details>

---

### Q2: Empty Array Comparisons

```javascript
console.log([] == []);
console.log([] === []);
console.log([] == ![]);
console.log([] == 0);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
false
false
true
true
```

**Why?**
- `[] == []` — references are different (two separate objects in memory)
- `[] === []` — same reason, strict equality checks reference identity
- `[] == ![]` — `![]` is `false`. Then `[] == false` → `[]` coerces to `""`, then `"" == false` → both coerce to `0`, so `0 == 0` → **`true`!** 🤯
- `[] == 0` — `[]` → `""` → `0`, so `0 == 0` → `true`
</details>

---

### Q3: Weird Number Coercions

```javascript
console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log({} + {});
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
""
"[object Object]"
"[object Object]"
"[object Object][object Object]"
```

**Why?**
- `+` with objects triggers **string coercion** via `.toString()`
- `[].toString()` → `""` → `"" + ""` → `""`
- `[].toString()` → `""`, `{}.toString()` → `"[object Object]"` → `"" + "[object Object]"` → `"[object Object]"`
- `{} + []` — behavior depends on context: in browser or with parens `({} + [])` → `"[object Object]"`. In Node.js console, `{} + []` is parsed as an empty block + unary `+[]` → returns `0`!
- `{}.toString()` + `{}.toString()` = `"[object Object][object Object]"`
</details>

---

## 2. typeof Quirks

### Q4: `typeof` Edge Cases

```javascript
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof []);
console.log(typeof NaN);
console.log(typeof typeof 1);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"object"
"undefined"
"object"
"number"
"string"
```

**Why?**
- `typeof null` → `"object"` — **historic bug** in JS (cannot be fixed, would break existing code)
- `typeof NaN` → `"number"` — NaN is still a numeric type
- `typeof typeof 1` → `typeof "number"` → `"string"` (typeof always returns a string)
</details>

---

### Q5: typeof Function

```javascript
console.log(typeof function(){});
console.log(typeof class {});
console.log(typeof (() => {}));
console.log(typeof async function() {});
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"function"
"function"
"function"
"function"
```

**Why?**
- All function types return `"function"` from typeof
- Classes in JS are syntactical sugar over functions, so `typeof class {}` is `"function"`
- Async functions are still functions
</details>

---

## 3. NaN Is Not Equal to Itself

### Q6: NaN Comparisons

```javascript
console.log(NaN === NaN);
console.log(NaN == NaN);
console.log(Object.is(NaN, NaN));
console.log([NaN].indexOf(NaN));
console.log([NaN].includes(NaN));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
false
false
true
-1
true
```

**Why?**
- `NaN === NaN` → `false` — **NaN is the only JS value not equal to itself** (IEEE 754 standard)
- `Object.is(NaN, NaN)` → `true` — `Object.is` treats NaN as equal (ES6 fix)
- `[NaN].indexOf(NaN)` → `-1` — indexOf uses strict equality, so can't find NaN
- `[NaN].includes(NaN)` → `true` — includes uses `SameValueZero` algorithm (ES6 fix)
</details>

---

## 4. Truthy vs Falsy

### Q7: Falsy Values

```javascript
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean(-0));
console.log(Boolean(0n));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
false
false
false
false
false
false
false
false
```

**There are exactly 8 falsy values in JavaScript:**
```javascript
false, 0, -0, 0n, "", '', ``, null, undefined, NaN
```

Everything else is **truthy**, including `[]`, `{}`, `"false"`, `"0"`, `-1`, `Infinity`.
</details>

---

### Q8: Truthy Gotchas

```javascript
if ([]) console.log("[] is truthy");
if ({}) console.log("{} is truthy");
if ("false") console.log("'false' is truthy");
if ("0") console.log("'0' is truthy");
if (-1) console.log("-1 is truthy");

console.log([] ? "true" : "false");
console.log("" ? "true" : "false");
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
[] is truthy
{} is truthy
'false' is truthy
'0' is truthy
-1 is truthy
true
false
```

**Why?**
- Empty arrays and objects are **truthy** — they are objects, not primitives
- `"false"` is a **non-empty string** — truthy!
- `"0"` is also a non-empty string — truthy! Even though `"0" == 0` is true, `Boolean("0")` is true
- `-1` is non-zero → truthy
</details>

---

## 5. Addition and Coercion

### Q9: String vs Number Addition

```javascript
console.log(1 + "2");
console.log("1" + 2);
console.log(1 + 2 + "3");
console.log("1" + 2 + 3);
console.log(1 - "2");
console.log("5" * "3");
console.log("10" / "2");
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"12"
"12"
"33"
"123"
-1
15
5
```

**Why?**
- `+` with a string triggers **string concatenation**
- `1 + "2"` → `"12"` (number coerced to string)
- `1 + 2 + "3"` → `3 + "3"` → `"33"` (left-associative: first add numbers, then concat)
- `"1" + 2 + 3` → `"12" + 3` → `"123"` (first concat, keeps going)
- `-`, `*`, `/` always coerce to **numbers** — `1 - "2"` → `1 - 2` → `-1`
</details>

---

### Q10: Unary Plus and Minus

```javascript
console.log(+"123");
console.log(+true);
console.log(+false);
console.log(+null);
console.log(+undefined);
console.log(+"");
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
123
1
0
0
NaN
0
```

**Why?**
- Unary `+` coerces to **number**
- `+true` → `1`, `+false` → `0`, `+null` → `0`
- `+undefined` → `NaN` (undefined is not a valid number)
- `+""` → `0` (empty string → 0)
</details>

---

## 6. Reference vs Value

### Q11: Object vs Primitive Assignment

```javascript
let a = 10;
let b = a;
b = 20;
console.log(a);

let x = { value: 10 };
let y = x;
y.value = 20;
console.log(x.value);

let z = x;
z = { value: 30 };
console.log(x.value);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
10
20
20
```

**Why?**
- Primitives are assigned **by value** — `a` and `b` are independent copies
- Objects are assigned **by reference** — `x` and `y` point to the same object
- `y.value = 20` modifies the shared object → `x.value` is also `20`
- `z = { value: 30 }` creates a **new object** — `z` now points somewhere else, `x` is unchanged
</details>

---

### Q12: Array References

```javascript
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log(arr1);

const arr3 = [1, 2, 3];
const arr4 = arr3;
arr4 = [4, 5, 6]; // What happens here?
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
[1, 2, 3, 4]
TypeError: Assignment to constant variable
```

**Why?**
- `arr1` and `arr2` point to the same array — mutating `arr2` also affects `arr1`
- `arr4 = [4, 5, 6]` — ❌ `const` prevents reassignment (but allows mutation)
</details>

---

## 7. Hoisting

### Q13: var vs let Hoisting

```javascript
console.log(a);
var a = 5;

console.log(b);
let b = 5;
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
undefined
ReferenceError: Cannot access 'b' before initialization
```

**Why?**
- `var` is hoisted and **initialized with `undefined`** — accessible before declaration
- `let` and `const` are hoisted but **not initialized** — they're in the **Temporal Dead Zone (TDZ)**
</details>

---

### Q14: Function Hoisting

```javascript
console.log(foo());
function foo() { return "function declaration"; }

console.log(bar());
var bar = function() { return "function expression"; };

console.log(baz());
let baz = function() { return "arrow function"; };
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"function declaration"
TypeError: bar is not a function
ReferenceError: Cannot access 'baz' before initialization
```

**Why?**
- `function` declarations are **fully hoisted** — can be called before definition
- `var bar = function()` — `bar` is hoisted as `undefined`, but calling `undefined()` throws `TypeError`
- `let baz = ...` — TDZ, can't access before initialization
</details>

---

### Q15: Var in Block Scope

```javascript
if (true) {
  var x = 10;
  let y = 20;
}
console.log(x);
console.log(y);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
10
ReferenceError: y is not defined
```

**Why?**
- `var` is **function-scoped**, not block-scoped — it leaks out of `{}` blocks
- `let` is **block-scoped** — stays inside the `{}` block
</details>

---

## 8. Closure Gotchas

### Q16: Classic Closure Loop Problem

```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}

for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log(j), 100);
}
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
4
4
4
1
2
3
```

**Why?**
- **`var`**: All three closures share the **same `i`** variable. By the time the callbacks run (100ms later), the loop has finished and `i` is `4`.
- **`let`**: `let` creates a **new binding** for each iteration. Each closure captures its own `j` value.
</details>

---

### Q17: Closure Independence

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const fn1 = outer();
const fn2 = outer();
console.log(fn1());
console.log(fn1());
console.log(fn2());
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1
2
1
```

**Why?**
- Each call to `outer()` creates a **new `count` variable** in a new closure scope
- `fn1` and `fn2` have **independent** count variables
</details>

---

### Q18: IIFE Closure Fix

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout((function(x) {
    return function() { console.log(x); };
  })(i), 100);
}
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
0
1
2
```

**Why?**
- The IIFE creates a new scope each iteration, capturing `i` as `x`
- Each callback has its own `x` value (0, 1, 2)
</details>

---

## 9. `this` Binding

### Q19: `this` in Different Contexts

```javascript
const obj = {
  name: "Alice",
  regular: function() { console.log(this.name); },
  arrow: () => console.log(this.name)
};

obj.regular();
obj.arrow();

const regularFn = obj.regular;
regularFn();
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"Alice"
undefined
undefined
```

**Why?**
- **`obj.regular()`** — Implicit binding: `this` = `obj` (object before the dot)
- **`obj.arrow()`** — Arrow functions **don't have their own `this`**. They inherit `this` from the enclosing scope (here: global/undefined in strict)
- **`regularFn()`** — Default binding: `this` = `window`/`undefined` (no object context)
</details>

---

### Q20: `this` Inside setTimeout

```javascript
const obj = {
  name: "Alice",
  sayName: function() {
    setTimeout(function() { console.log(this.name); }, 100);
    setTimeout(() => console.log(this.name), 100);
  }
};

obj.sayName();
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
undefined  (or "" in browser)
"Alice"
```

**Why?**
- **Regular function in setTimeout**: `this` is the **global object** — NOT `obj`
- **Arrow function in setTimeout**: Arrow functions **inherit `this`** from `sayName`'s context, which is `obj`
</details>

---

### Q21: Binding Precedence

```javascript
function greet() { console.log(this.name); }

const user = { name: "Alice" };
const admin = { name: "Admin" };

const boundGreet = greet.bind(user);
boundGreet.call(admin);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"Alice"
```

**Why?**
- **`bind` has the highest precedence** (after `new`)
- Once a function is bound with `.bind()`, subsequent `.call()` or `.apply()` **cannot override** the binding
- Exception: `new` operator overrides `bind`
</details>

---

## 10. Array Quirks

### Q22: Array Length

```javascript
const arr = [1, 2, 3];
arr.length = 0;
console.log(arr);

arr.length = 5;
console.log(arr);

arr[10] = 10;
console.log(arr.length);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
[]
[empty × 5]
11
```

**Why?**
- Setting `arr.length = 0` **empties the array**
- Setting `arr.length = 5` creates **empty slots** (sparse array)
- Setting `arr[10] = 10` makes length = 11 (index + 1)
</details>

---

### Q23: Array delete and splice

```javascript
const arr = [1, 2, 3, 4];
delete arr[1];
console.log(arr);
console.log(arr.length);

const arr2 = [1, 2, 3, 4];
arr2.splice(1, 1);
console.log(arr2);
console.log(arr2.length);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
[1, empty, 3, 4]
4
[1, 3, 4]
3
```

**Why?**
- `delete arr[1]` removes the value but **keeps the slot** — length stays 4
- `arr2.splice(1, 1)` removes the element **and shifts** everything — length becomes 3
</details>

---

## 11. Object Quirks

### Q24: Object Keys

```javascript
const obj = {
  1: "one",
  "1": "two"
};
console.log(obj);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
{"1": "two"}
```

**Why?**
- Object keys are always **strings** (or Symbols)
- Numeric keys `1` and string keys `"1"` are **the same key**
- The second assignment overwrites the first
</details>

---

### Q25: Object Key Order

```javascript
const obj = {
  b: 1,
  a: 2,
  3: 3,
  1: 4,
  [Symbol()]: 5
};

console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(JSON.stringify(obj));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
["1", "3", "b", "a"]
[4, 3, 1, 2]
{"1":4,"3":3,"b":1,"a":2}
```

**Why?**
- Object property order: Integer indices → String keys (insertion) → Symbols
- Symbols are not shown in JSON/keys output
</details>

---

### Q26: Property Access

```javascript
const obj = { name: "Alice" };
console.log(obj.name);
console.log(obj["name"]);
// console.log(obj[name]); // ReferenceError: name is not defined
console.log(obj.nickname?.length);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"Alice"
"Alice"
undefined
```

**Why?**
- `obj.name` and `obj["name"]` are equivalent
- `obj[name]` treats `name` as a **variable** — would throw if `name` is not defined
- `obj.nickname?.length` — optional chaining: returns `undefined` without throwing
</details>

---

## 12. Coercion Tricks

### Q27: Coercion in Conditionals

```javascript
if ("0") console.log("1");
if ("") console.log("2");
if ([]) console.log("3");
if ([0]) console.log("4");
if ([1, 2]) console.log("5");
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1
3
4
5
```

**Why?**
- `"0"` is a **non-empty string** → truthy
- `""` is empty → falsy
- `[]` is an **object** → truthy
- `[0]` is also an object → truthy
- `[1, 2]` is also an object → truthy
</details>

---

### Q28: Bizarre Coercion Chain

```javascript
console.log(true + false);
console.log(true + true);
console.log(12 / "6");
console.log("number" + 15 + 3);
console.log(15 + 3 + "number");
console.log([1] > null);
console.log("foo" + +"bar");
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1
2
2
"number153"
"18number"
true
"fooNaN"
```

**Why?**
- `true + false` → `1 + 0` → `1`
- `15 + 3 + "number"` → `18 + "number"` → `"18number"`
- `[1] > null` → `"1" > 0` → `1 > 0` → `true`
- `+"bar"` → `NaN`, so `"foo" + NaN` → `"fooNaN"`
</details>

---

### Q29: Plus Operator Precedence

```javascript
console.log(1 + 2 + 3 + "4");
console.log("1" + 2 + 3 + 4);
console.log(1 + "2" + 3 + 4);
console.log(1 + 2 + "3" + 4);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"64"
"1234"
"1234"
"334"
```

**Why?**
- `1 + 2 + 3 + "4"` → `6 + "4"` → `"64"` (adds numbers first, then concat)
- `"1" + 2 + 3 + 4` → `"1234"` (once string, always string)
- `1 + 2 + "3" + 4` → `3 + "3" + 4` → `"33" + 4` → `"334"`
</details>

---

## 13. parseInt Quirks

### Q30: parseInt Edge Cases

```javascript
console.log(parseInt(""));
console.log(parseInt("0xF"));
console.log(parseInt("0xf"));
console.log(parseInt("08"));
console.log(parseInt("123abc"));
console.log(parseInt("abc123"));
console.log(parseInt("  123  "));
console.log(parseInt(0.0000005));
console.log(parseInt(0.5));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
NaN
15
15
8
123
NaN
123
5
0
```

**Why?**
- `parseInt("")` → `NaN`
- `parseInt("0xF")` → `15` (hex)
- `parseInt("123abc")` → `123` (parses up to first non-digit)
- `parseInt(0.0000005)` → `5` (String is `"5e-7"`, reads `"5"`)
- `parseInt(0.5)` → `0` (String is `"0.5"`, stops at `.`)
</details>

---

### Q31: parseInt With Radix

```javascript
["1", "2", "3"].map(parseInt);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
[1, NaN, NaN]
```

**Why?**
- `.map(parseInt)` is equivalent to `.map((item, index) => parseInt(item, index))`
- `parseInt("1", 0)` → `1` (radix 0 = auto)
- `parseInt("2", 1)` → `NaN` (radix must be 2-36)
- `parseInt("3", 2)` → `NaN` (binary has no digit `3`)
</details>

---

## 14. Operator Precedence

### Q32: Comma Operator

```javascript
console.log((1, 2, 3));
console.log(1, 2, 3);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
3
1 2 3
```

**Why?**
- The **comma operator** returns the **last** value: `(1, 2, 3)` → `3`
- `console.log(1, 2, 3)` — comma separates **arguments**, so it logs all three
</details>

---

### Q33: Assignment vs Comparison

```javascript
let x = 0;
if (x = 10) {
  console.log("true");
}
console.log(x);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"true"
10
```

**Why?**
- `x = 10` is an **assignment**, not a comparison — returns `10`
- `10` is truthy, so the if-block executes
- **Common bug:** accidentally using `=` instead of `===`
</details>

---

### Q34: Chained Comparisons

```javascript
console.log(3 > 2 > 1);
console.log(1 < 2 < 3);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
false
true
```

**Why?**
- `3 > 2 > 1` → `true > 1` → `1 > 1` → `false`
- `1 < 2 < 3` → `true < 3` → `1 < 3` → `true`
- **Correct way:** `3 > 2 && 2 > 1`
</details>

---

## 15. Prototypes & Inheritance

### Q35: Instanceof Check

```javascript
console.log([] instanceof Array);
console.log([] instanceof Object);
console.log({} instanceof Object);
console.log({} instanceof Array);
console.log(null instanceof Object);
console.log(undefined instanceof Object);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
true
true
true
false
false
false
```

**Why?**
- `instanceof` checks the **prototype chain**
- `[]` is an instance of `Array` and also `Object` (Array inherits from Object)
- `null` and `undefined` are **primitives** → `instanceof` returns `false`
</details>

---

### Q36: Constructor Without new

```javascript
function Person(name) {
  this.name = name;
  return { name: "overridden" };
}

const p1 = new Person("Alice");
const p2 = Person("Bob");

console.log(p1);
console.log(p2);
// console.log(name); // "Bob" in non-strict mode (global leak)
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output (non-strict):**
```
{ name: "overridden" }
{ name: "overridden" }
```

**Why?**
- With `new`: If the constructor **explicitly returns an object**, that object is used instead of `this`
- Without `new`: `this` is the **global object** — `this.name = "Bob"` leaks as a global
- Both return the same explicit return object `{ name: "overridden" }`
</details>

---

## 16. Destructuring & Spread

### Q37: Default Values in Destructuring

```javascript
const { a = 10, b = 20 } = { a: undefined };
console.log(a, b);

const [x = 1, y = 2, z = 3] = [0, null, undefined];
console.log(x, y, z);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
10 20
0 null 3
```

**Why?**
- Default values only apply when the value is **`undefined`**
- For objects: `a` is `undefined` → default `10` applies. `b` is missing → default `20`
- For arrays: `x=0` (not undefined), `y=null` (not undefined), `z=undefined` → default `3`
- `null` is **not** `undefined`, so the default does NOT apply to `y`
</details>

---

### Q38: Spread Operator — Shallow Copy

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };
copy.a = 99;
copy.b.c = 99;

console.log(original.a);
console.log(original.b.c);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1
99
```

**Why?**
- Spread `{...obj}` creates a **shallow copy**
- `copy.a = 99` — `a` is a primitive, so `original.a` is unaffected
- `copy.b.c = 99` — `b` is an **object reference**, so modifying `copy.b` also modifies `original.b`
- For deep copy, use `structuredClone()` or `JSON.parse(JSON.stringify(obj))`
</details>

---

### Q39: Rest Operator in Destructuring

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
const { x, ...others } = { x: 10, y: 20, z: 30 };

console.log(first, rest);
console.log(x, others);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1 [2, 3, 4, 5]
10 { y: 20, z: 30 }
```

**Why?**
- Rest operator `...` collects **remaining elements** into a new array/object
- In arrays: `rest` is `[2, 3, 4, 5]`
- In objects: `others` is `{ y: 20, z: 30 }`
- Rest must be the **last** element in destructuring
</details>

---

## 17. Promises & Async Edge Cases

### Q40: Promise Chaining — Error Propagation

```javascript
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error(String(x)); })
  .then(x => console.log("A:", x))
  .catch(e => console.log("B:", e.message))
  .then(x => console.log("C:", x));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
B: 2
C: undefined
```

**Why?**
- `1 → 2` (first then), `2 → throw Error("2")` (second then)
- Error is caught by `.catch()` → logs `"B: 2"`
- `.catch()` returns `undefined` (no explicit return)
- Next `.then()` receives `undefined` → logs `"C: undefined"`
- **Important:** A `.catch()` after a throw **recovers** the chain — subsequent `.then()` still runs!
</details>

---

### Q41: Promise.all — Short Circuit

```javascript
const p1 = Promise.resolve("one");
const p2 = Promise.reject("fail");
const p3 = new Promise(resolve => setTimeout(() => resolve("three"), 1000));

Promise.all([p1, p2, p3])
  .then(results => console.log("All:", results))
  .catch(err => console.log("Error:", err));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
Error: fail
```

**Why?**
- `Promise.all()` **short-circuits** on the first rejection
- `p2` rejects immediately with `"fail"` — no waiting for `p3`
- `.catch()` receives `"fail"` immediately
- `p3` is still pending but its result is ignored
- For waiting on all (even failures), use `Promise.allSettled()`
</details>

---

### Q42: Async Error Handling

```javascript
async function test() {
  try {
    return await Promise.reject("FAIL");
  } finally {
    console.log("finally");
  }
}

test().then(r => console.log("then:", r)).catch(e => console.log("catch:", e));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
finally
catch: FAIL
```

**Why?**
- `await Promise.reject("FAIL")` throws before the `return`
- `finally` block **always runs**, even when an error is thrown
- The error is not caught by `try` (no `catch` block), so it propagates
- `.catch()` on the promise chain catches `"FAIL"`
- **Key:** `finally` does NOT swallow the error — it continues propagating
</details>

---

### Q43: Promise.race Behavior

```javascript
const slow = new Promise(resolve => setTimeout(() => resolve("slow"), 500));
const fast = new Promise((_, reject) => setTimeout(() => reject("fast error"), 100));

Promise.race([slow, fast])
  .then(r => console.log("Winner:", r))
  .catch(e => console.log("Error:", e));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
Error: fast error
```

**Why?**
- `Promise.race()` settles with the **first** promise to settle (resolve or reject)
- `fast` rejects at 100ms, `slow` resolves at 500ms
- The race is won by `fast`'s rejection — `.catch()` is called
- Even though `slow` resolves later, its result is ignored
</details>

---

## 18. Nullish Coalescing & Optional Chaining

### Q44: `??` vs `||`

```javascript
console.log(0 || "default");
console.log(0 ?? "default");
console.log("" || "fallback");
console.log("" ?? "fallback");
console.log(null ?? "nullish");
console.log(undefined ?? "nullish");
console.log(false ?? "truthy");
console.log(false || "truthy");
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"default"
0
"fallback"
""
"nullish"
"nullish"
false
"truthy"
```

**Why?**
- `||` returns the first **truthy** value — `0`, `""`, `false`, `null`, `undefined` all trigger the default
- `??` (nullish coalescing) returns the default **only for `null` or `undefined`**
- `0 ?? "default"` → `0` (0 is not null/undefined)
- `"" ?? "fallback"` → `""` (empty string is not null/undefined)
- `false ?? "truthy"` → `false`
- **Use `??`** when `0`, `""`, or `false` are valid values!
</details>

---

### Q45: Optional Chaining — Method Call

```javascript
const obj1 = { greet: () => "hello" };
const obj2 = {};

console.log(obj1.greet?.());
console.log(obj2.greet?.());
console.log(obj2.greet?.());
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"hello"
undefined
undefined
```

**Why?**
- `obj1.greet?.()` — `greet` exists and is a function → calls it → returns `"hello"`
- `obj2.greet?.()` — `greet` is `undefined` → optional chaining stops → returns `undefined`
- Without `?.`, `obj2.greet()` would throw `TypeError: obj2.greet is not a function`
</details>

---

### Q46: Nullish Assignment `??=`

```javascript
let a = null;
let b = undefined;
let c = 0;
let d = "hello";

a ??= "default A";
b ??= "default B";
c ??= "default C";
d ??= "default D";

console.log(a, b, c, d);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"default A" "default B" 0 "hello"
```

**Why?**
- `??=` (logical nullish assignment) assigns the value **only if** the variable is `null` or `undefined`
- `a` is `null` → assigned `"default A"`
- `b` is `undefined` → assigned `"default B"`
- `c` is `0` (not null/undefined) → NOT assigned
- `d` is `"hello"` (not null/undefined) → NOT assigned
</details>

---

## 19. Set, Map & Collections

### Q47: Set — Reference Equality

```javascript
const set = new Set();
set.add([1, 2]);
set.add([1, 2]);
set.add({ a: 1 });
set.add({ a: 1 });
console.log(set.size);

const obj = { x: 10 };
set.add(obj);
set.add(obj);
console.log(set.size);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
4
5
```

**Why?**
- `Set` uses **SameValueZero** equality — which is reference equality for objects
- `[1, 2]` and `[1, 2]` are **different array instances** → both added (count: 2)
- `{ a: 1 }` and `{ a: 1 }` are **different object instances** → both added (count: 4)
- `obj` is added once, the second `add(obj)` does nothing (same reference!) → count: 5
</details>

---

### Q48: Map — Object Keys

```javascript
const map = new Map();
map.set("1", "string key");
map.set(1, "number key");
map.set(true, "boolean key");

console.log(map.get("1"));
console.log(map.get(1));
console.log(map.get(true));
console.log(map.size);

// vs Object
const obj = {};
obj["1"] = "string";
obj[1] = "number"; // overwrites "1"!
console.log(obj);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"string key"
"number key"
"boolean key"
3
{"1": "number"}
```

**Why?**
- `Map` treats keys **by their actual type** — `"1"` (string) and `1` (number) are different keys
- Object coerces all keys to **strings** — `obj[1]` overwrites `obj["1"]`
- `Map` preserves all 3 distinct keys → size is `3`
- `Map` also accepts objects, functions, and even `NaN` as keys!
</details>

---

### Q49: WeakMap — No Iteration

```javascript
const wm = new WeakMap();
let obj = { name: "temporary" };
wm.set(obj, "some value");

console.log(wm.get(obj));
// console.log(wm.size);      // undefined
// for (let [k, v] of wm) {}  // TypeError

obj = null; // obj becomes eligible for garbage collection
// The key-value pair is automatically removed from the WeakMap
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"some value"
```

**Why?**
- `WeakMap` keys must be **objects**, and the reference is **weak** (doesn't prevent GC)
- `WeakMap` has **no `size` property** and **no iteration methods** (no `forEach`, no `for...of`)
- When `obj = null` — the original object is garbage collected, and the WeakMap entry is **automatically removed**
- Use case: storing private data attached to DOM elements without memory leaks
- **`WeakSet`** works the same way (object keys only, no iteration)
</details>

---

## 20. Generators & Iterators

### Q50: Generator Basics

```javascript
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUp();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
```

**Why?**
- Generators return an **iterator** via `next()`
- Each `next()` returns `{ value, done }` — resumes execution until the next `yield`
- When all `yield`s are exhausted, returns `{ value: undefined, done: true }`
- `yield` can also receive values: `const x = yield;`
</details>

---

### Q51: Generator Delegation

```javascript
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield "a";
  yield* gen1();
  yield "b";
}

console.log([...gen2()]);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
["a", 1, 2, "b"]
```

**Why?**
- `yield*` **delegates** to another generator (or any iterable)
- All values from `gen1()` are **yielded one by one** into `gen2()`
- `[...gen2()]` spreads all yielded values into an array
- Works with any iterable: `yield* [1, 2, 3]` works too!
</details>

---

### Q52: Generator Return and Throw

```javascript
function* numbers() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.log("Caught:", e);
  }
}

const gen = numbers();
console.log(gen.next());
console.log(gen.return("early exit"));
console.log(gen.next());
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
{ value: 1, done: false }
{ value: "early exit", done: true }
{ value: undefined, done: true }
```

**Why?**
- `gen.return(value)` terminates the generator early with the given value
- `gen.throw(error)` throws an error at the last `yield` point (caught inside if there's a try/catch)
- After `return` or `throw`, the generator is **done** — subsequent `next()` returns `{ done: true }`
</details>

---

## 21. Classes & Inheritance

### Q53: Super in Derived Classes

```javascript
class Parent {
  constructor() {
    this.name = "Parent";
  }
}

class Child extends Parent {
  constructor() {
    // this.name = "Child"; // What if we don't call super?
    super();
    this.name = "Child";
  }
}

// What happens if we comment out super()?
console.log(new Child().name);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"Child"
```

**But if `super()` is commented out:**
```
ReferenceError: Must call super constructor in derived class before accessing 'this'
```

**Why?**
- In a derived class constructor, **`super()` must be called before using `this`**
- `super()` calls the parent constructor to initialize `this`
- After `super()`, `this.name = "Parent"`, then `this.name = "Child"` overwrites it
- Without `super()`, `this` is uninitialized → throws `ReferenceError`
</details>

---

### Q54: Static Methods — Inheritance

```javascript
class Parent {
  static greet() { return "Hello from Parent"; }
  static getMessage() { return this.greet(); }
}

class Child extends Parent {
  static greet() { return "Hello from Child"; }
}

console.log(Parent.getMessage());
console.log(Child.getMessage());
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"Hello from Parent"
"Hello from Child"
```

**Why?**
- Static methods are **inherited** by subclasses
- Inside a static method, `this` refers to the **class itself** (not an instance)
- `Parent.getMessage()` — `this` is `Parent` → calls `Parent.greet()`
- `Child.getMessage()` — `this` is `Child` → calls `Child.greet()` (polymorphism!)
- Static methods support **polymorphism** just like instance methods
</details>

---

### Q55: Private Fields

```javascript
class Person {
  #secret = "hidden";
  getSecret() { return this.#secret; }
}

const p = new Person();
console.log(p.getSecret());
console.log(p.#secret);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
"hidden"
SyntaxError: Private field '#secret' must be declared in an enclosing class
```

**Why?**
- `#` makes a field **truly private** (enforced at the engine level)
- Can only be accessed **inside** the class
- Accessing `p.#secret` from outside throws a `SyntaxError` (not a runtime error)
- Private fields are **not** just a naming convention (unlike `_private`) — they are truly inaccessible
- No way to access them with `Object.keys()`, `Reflect.ownKeys()`, or any other trick
</details>

---

## 22. Timers & Execution Order

### Q56: setTimeout Inside Promises

```javascript
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
}, 0);

Promise.resolve().then(() => {
  console.log(4);
  setTimeout(() => console.log(5), 0);
});

console.log(6);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1
6
4
2
3
5
```

**Why?**
- **Synchronous**: `1`, `6`
- **Microtask queue**: Promise `.then` — `console.log(4)`, then `setTimeout(() => console.log(5))` is scheduled
- **Macrotask 1**: First `setTimeout` — `console.log(2)` runs, then microtask `console.log(3)` is queued
- **Microtask**: `console.log(3)` runs
- **Macrotask 2**: Second `setTimeout` — `console.log(5)` runs

**Order:** sync > microtasks > macro1 > micro(inside macro1) > macro2
</details>

---

### Q57: Multiple setTimeout Order

```javascript
setTimeout(() => console.log("A"), 100);
setTimeout(() => console.log("B"), 0);
setTimeout(() => console.log("C"), 50);
setTimeout(() => console.log("D"), 0);
console.log("E");
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
E
B
D
C
A
```

**Why?**
- `console.log("E")` runs first (synchronous)
- `setTimeout(fn, 0)` callbacks are queued in order: `B`, then `D`
- `setTimeout(fn, 50)` → `C` is queued at 50ms
- `setTimeout(fn, 100)` → `A` is queued at 100ms
- Even though timers are delayed **at least** the specified time, they execute in order of the timer queue
- All three timers (0, 50, 100) don't expire simultaneously — they execute when their time is up
</details>

---

### Q58: setInterval Behavior

```javascript
let count = 0;
const interval = setInterval(() => {
  console.log(++count);
  if (count === 3) clearInterval(interval);
}, 100);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1
2
3
```

**Why?**
- `setInterval(fn, 100)` calls `fn` every 100ms
- Each call increments and logs `count`
- When `count === 3`, `clearInterval(interval)` stops the interval
- **Note:** If the callback takes longer than the interval, calls can stack up
- **Best practice:** Use recursive `setTimeout` instead for guaranteed gap between calls
</details>

---

## 23. JSON, toPrimitive & Coercion

### Q59: JSON.stringify Edge Cases

```javascript
console.log(JSON.stringify(undefined));
console.log(JSON.stringify(function() {}));
console.log(JSON.stringify(Symbol()));
console.log(JSON.stringify([undefined, function() {}, Symbol()]));
console.log(JSON.stringify({ a: undefined, b: function() {}, c: Symbol(), d: 42 }));
console.log(JSON.stringify({ a: NaN, b: Infinity, c: -Infinity }));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
undefined
undefined
undefined
[null, null, null]
{"d":42}
{"a":null,"b":null,"c":null}
```

**Why?**
- `JSON.stringify` **omits** `undefined`, functions, and Symbols in **objects**
- In **arrays**, they become `null` (to preserve array indices/sparseness)
- `NaN`, `Infinity`, `-Infinity` are all converted to `null`
- `JSON.stringify(undefined)` returns `undefined` (not the string `"undefined"`)
- Circular references throw `TypeError`
</details>

---

### Q60: Symbol.toPrimitive

```javascript
const obj = {
  value: 42,
  [Symbol.toPrimitive](hint) {
    console.log("hint:", hint);
    return hint === "string" ? `Value is ${this.value}` : this.value;
  }
};

console.log(String(obj));
console.log(+obj);
console.log(`${obj}`);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
hint: string
Value is 42
hint: number
42
hint: string
Value is 42
```

**Why?**
- `Symbol.toPrimitive` overrides the default coercion behavior
- `String(obj)` — hint is `"string"`
- `+obj` — hint is `"number"`
- `${obj}` — hint is `"string"` (template literals)
- Without this, JS would use `toString()` and `valueOf()` with specific ordering rules
- This is the **most powerful** way to control object-to-primitive conversion
</details>

---

### Q61: valueOf vs toString Priority

```javascript
const obj = {
  valueOf() { return 42; },
  toString() { return "hello"; }
};

console.log(obj + 0);
console.log(String(obj));
console.log(`${obj}`);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
42
"hello"
"hello"
```

**Why?**
- `obj + 0` — `+` operator with a number hints at `number`. `valueOf()` returns `42`
- `String(obj)` — explicitly asks for string. `toString()` returns `"hello"`
- Intersting: in some browsers with the older spec, template literals might use `valueOf()` but modern spec uses `toString()` for string context
- The priority: `Symbol.toPrimitive` > `valueOf` > `toString` for numeric hints
- For string hints: `Symbol.toPrimitive` > `toString` > `valueOf`
</details>

---

## 24. Regex & Beyond

### Q62: Regex — LastIndex Quirk

```javascript
const regex = /abc/g;
const str = "abc abc abc";

console.log(regex.test(str));
console.log(regex.test(str));
console.log(regex.test(str));
console.log(regex.test(str));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
true
true
true
false
```

**Why?**
- The `g` flag makes the regex **stateful** — it tracks `lastIndex`
- After each `test()`, `lastIndex` advances to the end of the match
- Match 1: `lastIndex = 3`, Match 2: `lastIndex = 7`, Match 3: `lastIndex = 11`
- Match 4: no more matches → `lastIndex` resets to `0`, returns `false`
- **Common bug:** Using a global regex in a loop can skip alternate matches!
- **Fix:** Reset `lastIndex = 0` manually, or use `.match()` non-global
</details>

---

### Q63: Date — Month Indexing

```javascript
console.log(new Date(2024, 0, 1));
console.log(new Date(2024, 11, 25));
console.log(new Date(2024, 12, 1));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
2024-01-01T00:00:00.000Z
2024-12-25T00:00:00.000Z
2025-01-01T00:00:00.000Z
```

**Why?**
- JavaScript `Date` months are **0-indexed**: January = `0`, December = `11`
- `new Date(2024, 0, 1)` → January 1, 2024 ✅
- `new Date(2024, 11, 25)` → December 25, 2024 ✅
- `new Date(2024, 12, 1)` → Month `12` overflows to **January 2025**! (12 = month 0 of next year)
- **Always remember:** Months are 0-11, not 1-12!
- Day of month (3rd parameter) is 1-indexed (which adds to the confusion)
</details>

---

### Q64: parseInt vs Number

```javascript
console.log(Number("123abc"));
console.log(parseInt("123abc"));
console.log(Number(""));
console.log(parseInt(""));
console.log(Number(null));
console.log(parseInt(null));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
NaN
123
0
NaN
0
NaN
```

**Why?**
- `Number("123abc")` → `NaN` — `Number()` is **strict**, requires the entire string to be numeric
- `parseInt("123abc")` → `123` — `parseInt()` parses **left to right** until it hits a non-digit
- `Number("")` → `0` — empty string coerces to `0` (!)
- `parseInt("")` → `NaN` — no digits to parse
- `Number(null)` → `0` — null coerces to `0`
- `parseInt(null)` → `NaN` — `String(null)` is `"null"`, can't parse that
</details>

---

## 25. Advanced Edge Cases

### Q65: Function.length — Default Parameters

```javascript
function f1(a, b, c) {}
function f2(a, b = 1, c) {}
function f3(a, ...rest) {}

console.log(f1.length);
console.log(f2.length);
console.log(f3.length);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
3
1
1
```

**Why?**
- `function.length` counts the number of parameters **before** the first default value or rest parameter
- `f1(a, b, c)` — all regular params → length is `3`
- `f2(a, b = 1, c)` — `b` has a default → only `a` counts → length is `1`
- `f3(a, ...rest)` — rest parameter doesn't count → only `a` → length is `1`
- This can cause subtle bugs with libraries that check `fn.length`!
</details>

---

### Q66: Arrow Function — No arguments

```javascript
function regular() {
  console.log(arguments[0], arguments[1]);
}

const arrow = () => {
  // console.log(arguments); // What happens here?
};

regular(1, 2);

const arrowWithRest = (...args) => {
  console.log(args[0], args[1]);
};
arrowWithRest(3, 4);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
1 2
3 4
```

**Why?**
- Regular functions have the `arguments` object (array-like, all passed args)
- Arrow functions **do NOT have their own `arguments`** — accessing it would throw `ReferenceError`
- **Fix:** Use rest parameters `...args` instead
- Arrow functions also cannot:
  - Be used with `new` (no `[[Construct]]`)
  - Have a `prototype` property
  - Be generators (no `function*` syntax)
</details>

---

### Q67: Conditional Object Properties

```javascript
const flag = true;
const obj = {
  a: 1,
  ...(flag && { b: 2 }),
  ...(!flag && { c: 3 }),
};

console.log(obj);
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output:**
```
{ a: 1, b: 2 }
```

**Why?**
- `flag && { b: 2 }` → `true && { b: 2 }` → `{ b: 2 }` → spread into object
- `!flag && { c: 3 }` → `false && { c: 3 }` → `false` → spread `false` into object does nothing
- This is a common pattern for **conditional object properties**
- If `flag` were `false`: `{ a: 1 }` (no `b`)
- Works because spreading `false`/`null`/`undefined` is a no-op in objects
</details>

---

### Q68: Array Sort Stability

```javascript
const items = [
  { name: "A", priority: 1 },
  { name: "B", priority: 1 },
  { name: "C", priority: 2 },
  { name: "D", priority: 2 },
];

items.sort((a, b) => a.priority - b.priority);
console.log(items.map(i => i.name).join(""));
```

<details>
<summary>👉 Click to reveal answer</summary>

**Output (ES2019+):**
```
"ABDC"
```

**Why?**
- Since ES2019, `Array.sort()` is **stable** — equal elements maintain their original order
- `A` (priority 1) and `B` (priority 1) keep original order: `A` then `B`
- `C` (priority 2) and `D` (priority 2) keep original order: `C` then `D`
- Before ES2019, sort order for equal elements was **implementation-dependent**
- Stable sort is important for multi-key sorting (sort by city, then by name)
</details>

---

## 📊 Quick Reference — Must-Know Gotchas

| Expression | Result | Why |
|---|---|---|
| `[] == []` | `false` | Different references |
| `[] == ![]` | `true` | Coercion chain: `[] → "" → 0`, `![] → false → 0` |
| `null == undefined` | `true` | Special == rule |
| `null === undefined` | `false` | Different types |
| `NaN === NaN` | `false` | IEEE 754 spec |
| `typeof null` | `"object"` | Historic bug |
| `typeof NaN` | `"number"` | NaN is still numeric |
| `1 + "2"` | `"12"` | String wins in + |
| `"2" - 1` | `1` | Number wins in -, *, / |
| `[] + []` | `""` | Both toString to `""` |
| `parseInt(0.0000005)` | `5` | String is `"5e-7"` |
| `3 > 2 > 1` | `false` | Chained as `true > 1` |
| `(1, 2, 3)` | `3` | Comma operator returns last |
| `0 ?? "default"` | `0` | `??` checks null/undefined only |
| `"" ?? "fallback"` | `""` | `??` checks null/undefined only |
| `undefined, fn, Symbol` in obj | omitted | `JSON.stringify` skips them |
| `.map(parseInt)` | `[1, NaN, NaN]` | Radix is the index! |

---

## 🧠 Key Takeaways

1. **Always use `===`** — `==` with coercion causes unpredictable bugs
2. **Objects are truthy** — even empty arrays and objects
3. **NaN is the only value not equal to itself** — use `Number.isNaN()` to check
4. **`typeof null` is `"object"`** — historic bug, check with `value === null`
5. **`var` is not block-scoped** — use `let` and `const`
6. **Arrow functions don't have their own `this`** — they inherit it
7. **Microtasks (Promise) run before macrotasks (setTimeout)**
8. **Default `.sort()` converts to strings** — always pass a compare function
9. **Closures capture variables, not values** — `let` fixes the loop problem
10. **`parseInt` second argument is the radix** — be careful with `.map(parseInt)`!
11. **`??` is different from `||`** — `??` only checks null/undefined
12. **Spread is shallow** — nested objects are still references
13. **`Map` has type-safe keys** — `"1"` and `1` are different keys
14. **Private fields `#` are truly private** — no way to access from outside
15. **Promise `.catch()` recovers the chain** — subsequent `.then()` still runs

---

**Back to:** [JavaScript Interview Overview](/DSA-Notes-Problems/javascript/interview/)
