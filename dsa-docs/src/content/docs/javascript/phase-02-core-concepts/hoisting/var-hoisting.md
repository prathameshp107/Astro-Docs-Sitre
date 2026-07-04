---
title: var Hoisting
description: How var declarations are hoisted to the top of their function scope
sidebar:
  order: 2
---

# var Hoisting

## Introduction

Variables declared with `var` are **hoisted** to the top of their **function scope** and initialized to `undefined`.

## The Hoisting Behavior

```javascript
console.log(myVar); // undefined — not ReferenceError!
var myVar = 10;

// Interpreted as:
// var myVar; → hoisted & initialized to undefined
// console.log(myVar); → undefined
// myVar = 10; → assigned here
```

## Function Scope

`var` ignores block scope — it's hoisted to the nearest function:

```javascript
if (true) {
  var x = 10; // NOT block-scoped!
}
console.log(x); // 10 — accessible outside the if block!

function test() {
  var y = 20;
}
console.log(y); // ReferenceError — function-scoped
```

## Common Pitfall

```javascript
// ❌ var in loops creates unexpected behavior
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (not 0, 1, 2!)
// Because var i is hoisted to the function scope

// ✅ let creates a new binding each iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
```

## Summary

| Aspect | var Behavior |
|--------|-------------|
| Hoisted | ✅ Yes, to function scope |
| Initial value | `undefined` |
| Scope | Function scope (not block scope) |
| TDZ | ❌ No Temporal Dead Zone |
| Redeclaration | ✅ Allowed |

## Further Reading

- [MDN: var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [Previous: Function Hoisting](./function-hoisting)
- [Next: let/const Hoisting](./let-const-hoisting)
