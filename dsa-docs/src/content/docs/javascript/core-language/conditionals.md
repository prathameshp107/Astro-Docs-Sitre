---
title: "Conditionals"
description: "Control flow with if/else, switch, ternary, short-circuiting, and guard clauses in JavaScript."
sidebar:
  order: 6
---

## Conditionals

Conditionals let your code make decisions based on boolean conditions.

### `if / else if / else`

```javascript
const score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 75) {
  console.log("B");  // ← runs
} else if (score >= 60) {
  console.log("C");
} else {
  console.log("F");
}
// Output: B
```

### `switch`

Use `switch` when comparing one expression against many values. Don't forget `break` — without it, execution **falls through** to the next case.

```javascript
const day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";  // ← this runs
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  default:
    dayName = "Weekend";
}
// dayName: "Wednesday"
```

**Fall-through (intentional):**

```javascript
const fruit = "apple";
switch (fruit) {
  case "apple":
  case "pear":
    console.log("Pome fruit");
    break;
  case "banana":
    console.log("Tropical");
    break;
}
// Output: Pome fruit
```

### Ternary as Expression

The ternary operator `condition ? exprIfTrue : exprIfFalse` is an **expression** (it returns a value), which makes it useful inside template literals or return statements.

```javascript
const isLoggedIn = true;
const greeting = `Welcome${isLoggedIn ? " back" : ""}!`;
// "Welcome back!"

function getFee(isMember) {
  return isMember ? "$2.00" : "$10.00";
}
```

### Short-Circuit Conditionals

Logical operators can replace simple conditionals for concise code.

```javascript
// Instead of:
let name;
if (user) {
  name = user.name;
} else {
  name = "Guest";
}

// Write:
const name = user?.name ?? "Guest";
```

### Guard Clauses

Early returns reduce nesting and make code more readable.

```javascript
// ❌ Nested
function processOrder(order) {
  if (order) {
    if (order.isPaid) {
      if (order.items.length > 0) {
        return shipOrder(order);
      }
    }
  }
  return null;
}

// ✅ Guard clauses
function processOrder(order) {
  if (!order) return null;
  if (!order.isPaid) return null;
  if (order.items.length === 0) return null;
  return shipOrder(order);
}
```

### Key Takeaways

- `if/else if/else` is the most common conditional — use it for ranges and complex logic
- `switch` is best for single-expression, multi-value matching
- Always `break` in `switch` unless you intentionally want fall-through
- Ternary is an expression that returns a value — but keep it simple (no nesting)
- Use short-circuit `??` and `&&` for concise defaults
- Guard clauses (early returns) reduce nesting and improve readability
