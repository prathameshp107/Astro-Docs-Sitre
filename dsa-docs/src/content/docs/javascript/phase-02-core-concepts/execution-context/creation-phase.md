---
title: Creation Phase
description: The first phase of execution context — memory allocation and scope setup
sidebar:
  order: 2
---

# Creation Phase

## Introduction

The **Creation Phase** (also called Memory Allocation Phase) is the first of two phases in every execution context. During this phase, JavaScript sets up memory space for variables and functions before any code is executed.

## What Happens

1. Create the **LexicalEnvironment** (scope)
2. Create the **VariableEnvironment**
3. Set up the **`this`** binding
4. Allocate memory for variables (initialized to `undefined`)
5. Store function declarations (fully hoisted)

## Example

```javascript
// What you write:
console.log(myVar);  // undefined
var myVar = 10;

// Behind the scenes (creation phase):
// var myVar; → allocated, initialized to undefined
// Then execution phase runs:
// console.log(myVar); → undefined
// myVar = 10; → assigned
```

## Hoisting During Creation

```javascript
// During creation phase:
var a;              // allocated, set to undefined
function greet() {} // fully stored in memory
let b;              // allocated, NOT initialized (TDZ)
const c;            // allocated, NOT initialized (TDZ)
```

## The this Binding

```javascript
// Global context: this = global object
console.log(this); // window (browser)

// Function context: this depends on how the function is called
function showThis() {
  console.log(this);
}
```

## Summary

- Creation phase runs **before** any code executes
- Variables with `var` are initialized to `undefined`
- Function declarations are fully hoisted
- `let` and `const` are allocated but not initialized
- `this` binding is set up

## Further Reading

- [ECMAScript: Execution Contexts](https://tc39.es/ecma262/#sec-execution-contexts)
- [Previous: Types of Context](./types-of-context)
- [Next: Execution Phase](./execution-phase)
