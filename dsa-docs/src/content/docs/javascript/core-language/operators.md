---
title: "Operators"
description: "Arithmetic, comparison, logical, ternary, nullish coalescing, optional chaining, and spread operators in JavaScript."
sidebar:
  order: 2
---

## Operators

JavaScript operators let you perform operations on values — from basic math to property access and control flow.

### Arithmetic

```javascript
10 + 3;   // 13  (addition)
10 - 3;   // 7   (subtraction)
10 * 3;   // 30  (multiplication)
10 / 3;   // 3.333... (division)
10 % 3;   // 1   (remainder)
10 ** 3;  // 1000 (exponentiation)
```

**`+` with strings triggers concatenation instead of addition:**

```javascript
"1" + 2;  // "12"
1 + "2";  // "12"
1 + 2 + "3"; // "33" (left-to-right: 1+2=3, then 3+"3"="33")
```

### Assignment

```javascript
let x = 10;
x += 5;   // x = 15
x -= 3;   // x = 12
x *= 2;   // x = 24
x /= 4;   // x = 6
x %= 4;   // x = 2
x **= 3;  // x = 8
```

### Comparison: `==` vs `===`

```javascript
// === strict equality — checks value AND type (prefer this)
5 === "5";  // false
5 === 5;    // true

// == loose equality — coerces types before comparing
5 == "5";   // true ← coercion happens

// !=  vs  !==
5 != "5";   // false (loose, coerces)
5 !== "5";  // true  (strict)
```

**Coercion table for `==`:**

```javascript
0 == "";          // true
0 == "0";         // true
"" == "0";        // false
false == "false"; // false
false == 0;       // true
null == undefined;// true
[] == false;      // true ← surprising
```

> **Best Practice:** Always use `===` and `!==`. Avoid `==` unless you explicitly need coercion.

### Relational

```javascript
5 > 3;   // true
5 >= 5;  // true
5 < 3;   // false
5 <= 3;  // false
```

### Logical

```javascript
true && false;  // false (AND — returns first falsy or last truthy)
true || false;  // true  (OR — returns first truthy or last falsy)
!true;          // false (NOT)

// Short-circuit evaluation
false && console.log("won't run");  // stops at false
true || console.log("won't run");   // stops at true
```

### Ternary Operator

```javascript
const age = 20;
const status = age >= 18 ? "Adult" : "Minor"; // "Adult"

// Nested (use sparingly)
const score = 75;
const grade = score >= 90 ? "A"
            : score >= 75 ? "B"
            : "C"; // "B"
```

### Nullish Coalescing (`??`)

Returns the right side only when the left is `null` or `undefined`.

```javascript
null ?? "default";      // "default"
undefined ?? "default"; // "default"
0 ?? "default";         // 0 (0 is NOT null/undefined)
"" ?? "default";        // "" (empty string is NOT null/undefined)

// Compare with || (triggers on ALL falsy values)
0 || "default";         // "default"
0 ?? "default";         // 0
```

### Optional Chaining (`?.`)

Safely access nested properties without throwing.

```javascript
const user = { profile: { name: "Alice" } };

user?.address?.city;     // undefined (no error)
user?.getAge?.();        // undefined if method missing
user?.friends?.[0];      // undefined if array missing
```

### Spread (`...`)

```javascript
const arr = [1, 2, 3];
const copy = [...arr, 4];           // [1, 2, 3, 4]

const obj = { a: 1, b: 2 };
const merged = { ...obj, c: 3 };    // { a: 1, b: 2, c: 3 }
```

### Operator Precedence (Brief)

Remember the acronym **PEMDAS** + logical: `()` → `!` → `* / %` → `+ -` → `< > <= >=` → `== ===` → `&&` → `||` → `??` → `=`

```javascript
2 + 3 * 4;          // 14 (not 20)
(2 + 3) * 4;        // 20
!true && false;     // false (! binds tighter than &&)
```

### Key Takeaways

- Use `===` and `!==` by default — avoid coercion surprises
- `??` is for `null`/`undefined` only, `||` triggers on all falsy
- `?.` prevents `TypeError` on nested access
- `+` doubles as addition and string concatenation
- Short-circuit evaluation lets you write concise conditionals
- Use parentheses for clarity when precedence isn't obvious
