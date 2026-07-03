---
title: "Temporal Dead Zone (TDZ)"
description: "Understand the Temporal Dead Zone — why let and const behave differently from var."
sidebar:
  order: 4
---

# Temporal Dead Zone (TDZ)

> The **Temporal Dead Zone** is the time between when a variable enters scope and when it's actually initialized.

## Why Do We Need This?

TDZ prevents you from accessing variables before they're declared — catching a common programming mistake. With `var`, accessing before declaration gave `undefined` silently. With TDZ, you get a clear error.

## Visual Explanation

```mermaid
flowchart TD
    A["Block starts"] --> B["🔴 TDZ begins"]
    B --> C["console.log(x) // ❌ ReferenceError"]
    C --> D["let x = 5"]
    D --> E["🟢 TDZ ends"]
    E --> F["console.log(x) // ✅ 5"]
    
    style B fill:#ef4444,color:#fff
    style D fill:#facc15,color:#000
    style E fill:#10b981,color:#fff
```

## Code Examples

```javascript
// TDZ with let
{
  // TDZ starts
  // console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
  let x = 5;        // TDZ ends
  console.log(x);   // ✅ 5
}

// TDZ with const — same behavior
{
  // console.log(y); // ❌ ReferenceError
  const y = 10;
  console.log(y);   // ✅ 10
}

// NO TDZ with var
{
  console.log(z);   // undefined — no TDZ
  var z = 20;
}

// typeof is NOT safe in TDZ!
{
  // console.log(typeof x); // ❌ ReferenceError (unlike var!)
  let x = 5;
}
```

## 🎯 Interview Tip

> **Q:** "What is the Temporal Dead Zone and why was it introduced?"
> **A:** "TDZ is the period between entering scope and variable initialization where `let` and `const` are hoisted but uninitialized. It was introduced to catch bugs early — accessing a variable before its declaration is almost always a mistake."
