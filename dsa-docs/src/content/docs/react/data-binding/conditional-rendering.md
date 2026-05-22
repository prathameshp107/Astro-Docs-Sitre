---
title: "Conditional Rendering"
description: "Conditional rendering patterns in React."
---

## Conditional Rendering

Allows rendering different elements based on conditions.

**Use cases:** Showing/hiding elements, toggling functionality, authentication.

**Methods:**
- `if...else` Statement
- `switch` Statement
- Ternary Operator
- Logical `&&` (Short Circuit Evaluation)

```jsx
// Ternary
<div>{flag ? <h1>Hello</h1> : null}</div>

// Short Circuit
<div>{flag && <h1>Hello</h1>}</div>
```

---
