---
title: Default Binding
description: The default binding rule for JavaScript's this keyword — standalone function calls
sidebar:
  order: 1
---

# Default Binding

## Introduction

**Default binding** is the rule that applies when a function is called as a **standalone function** — not as a method, not with `new`, not with `call`/`apply`/`bind`. In this case, `this` refers to the **global object** (or `undefined` in strict mode).

## How It Works

When you call a function without any context, JavaScript falls back to the default binding:

```javascript
function showThis() {
  console.log(this);
}

showThis();
// Browser: Window { ... }
// Node.js: global { ... }
// Strict mode: undefined
```

## Strict Mode Difference

```javascript
function nonStrict() {
  console.log(this); // Window / global
}

function strict() {
  'use strict';
  console.log(this); // undefined
}
```

## Why This Matters

Default binding is the **lowest priority** rule. It only applies when no other rule matches. Understanding when it applies helps you avoid bugs where `this` unexpectedly refers to the global object.

## Common Scenarios

```javascript
// 1. Direct function call
function logThis() {
  console.log(this);
}
logThis(); // default binding → global

// 2. Callback (non-strict)
function User(name) {
  this.name = name;
}
User.prototype.sayHi = function() {
  setTimeout(function() {
    console.log(`Hi, I'm ${this.name}`); // this = global → undefined
  }, 100);
};

// 3. Function expression
const greet = function() {
  console.log(this);
};
greet(); // default binding → global
```

## Best Practices

- Use `'use strict'` to avoid accidental global `this`
- Use arrow functions when you want to avoid default binding
- Never rely on default binding in your code

## Summary

- Default binding applies to standalone function calls
- `this` = global object (non-strict) or `undefined` (strict)
- Lowest priority binding rule
- Avoid relying on default binding in production code

## Further Reading

- [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Back to Overview](./)
