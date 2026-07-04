---
title: Clean Code
description: Writing maintainable, readable JavaScript code
sidebar:
  order: 9
---

# Clean Code

## Introduction

Clean code is code that is **easy to read, understand, and maintain**. It's the most important skill for professional developers.

## Naming

```javascript
// ❌ Bad
function d(a, b) { return a - b; }
const x = ['Alice', 'Bob'];

// ✅ Good
function calculateDifference(a, b) { return a - b; }
const userNames = ['Alice', 'Bob'];
```

## Functions

```javascript
// ❌ Bad — too many responsibilities
function processUser(user) {
  // validate
  // save to DB
  // send email
  // log
}

// ✅ Good — single responsibility
function validateUser(user) { /* ... */ }
function saveUser(user) { /* ... */ }
function sendWelcomeEmail(user) { /* ... */ }
```

## Avoid Deep Nesting

```javascript
// ❌ Bad
function process(order) {
  if (order) {
    if (order.isValid) {
      if (order.paid) {
        // process
      }
    }
  }
}

// ✅ Good — guard clauses
function process(order) {
  if (!order) return;
  if (!order.isValid) return;
  if (!order.paid) return;
  // process
}
```

## Summary

- Meaningful names for variables and functions
- Functions should do one thing (single responsibility)
- Use guard clauses to reduce nesting
- Keep functions small (under 20 lines ideally)
- Comments explain WHY, not WHAT

## Further Reading

- [Clean Code: JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
