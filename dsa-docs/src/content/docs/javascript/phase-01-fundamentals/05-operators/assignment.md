---
title: Assignment Operators
description: JavaScript assignment operators — =, +=, -=, and compound assignments
sidebar:
  order: 4
---

# Assignment Operators

## Introduction

Assignment operators assign values to variables. The basic `=` operator is extended by compound assignment operators that combine assignment with arithmetic.

## Visual Explanation

```mermaid
flowchart LR
    A["x = 5"] --> B["Basic assignment"]
    C["x += 3"] --> D["x = x + 3 → 8"]
    E["x -= 2"] --> F["x = x - 2 → 3"]
    G["x *= 4"] --> H["x = x * 4 → 20"]
    I["x /= 2"] --> J["x = x / 2 → 2.5"]
```

## Operators

```javascript
let x = 10;

x += 5;   // x = x + 5 → 15
x -= 3;   // x = x - 3 → 12
x *= 2;   // x = x * 2 → 24
x /= 4;   // x = x / 4 → 6
x %= 4;   // x = x % 4 → 2
x **= 3;  // x = x ** 3 → 8
```

## Summary

- `=` assigns a value
- Compound operators combine operation with assignment
- They make code concise and readable

## Further Reading

- [MDN: Assignment Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_operators)
