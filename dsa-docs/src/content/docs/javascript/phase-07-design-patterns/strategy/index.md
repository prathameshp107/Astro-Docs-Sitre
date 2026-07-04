---
title: Strategy Pattern
description: Interchangeable algorithms at runtime
sidebar:
  order: 5
---

# Strategy Pattern

## Introduction

The Strategy pattern defines a family of interchangeable algorithms and lets you **choose which one to use at runtime**.

## Topics Covered

- [Implementation](./implementation) — Interchangeable algorithm families
- [Real-World Examples](./real-world-examples) — Form validation, sorting, payment processing

## Implementation

```javascript
// Strategies
const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

// Context
function calculate(strategy, a, b) {
  if (!strategies[strategy]) throw new Error('Unknown strategy');
  return strategies[strategy](a, b);
}

calculate('add', 5, 3);      // 8
calculate('multiply', 5, 3); // 15

// Form validation example
const validators = {
  required: value => value.trim() !== '' ? null : 'Required',
  email: value => /^.+@.+$/.test(value) ? null : 'Invalid email',
  minLength: min => value => value.length >= min ? null : `Min ${min} chars`
};

function validate(field, value, rules) {
  for (const rule of rules) {
    const error = validators[rule] ? validators[rule](value) : rule(value);
    if (error) return { field, error };
  }
  return null;
}
```

## Summary

- Selects algorithm at runtime
- Avoids long if/else chains
- Each strategy is independently testable

## Further Reading

- [Refactoring Guru: Strategy](https://refactoring.guru/design-patterns/strategy)
