---
title: Methods
description: Defining and using methods in JavaScript objects
sidebar:
  order: 3
---

# Methods

## Introduction

Methods are functions that are **properties of objects**. They can access the object's other properties via the `this` keyword.

## Shorthand Method Syntax (ES6)

```javascript
const user = {
  name: 'Alice',
  greet() {       // shorthand — no 'function' keyword
    return `Hi, I'm ${this.name}`;
  }
};

user.greet(); // "Hi, I'm Alice"
```

## Traditional Syntax

```javascript
const user = {
  name: 'Alice',
  greet: function() {
    return `Hi, I'm ${this.name}`;
  }
};
```

## Arrow Functions as Methods

```javascript
const user = {
  name: 'Alice',
  greet: () => {
    return `Hi, I'm ${this.name}`; // this is NOT user!
  }
};
// Arrow functions don't have their own 'this'
```

## Method Chaining

```javascript
const calculator = {
  value: 0,
  add(n) { this.value += n; return this; },
  subtract(n) { this.value -= n; return this; },
  getResult() { return this.value; }
};

calculator.add(5).subtract(2).getResult(); // 3
```

## Summary

- Methods are functions stored as object properties
- Use shorthand syntax: `methodName() {}`
- Use `this` to access other properties
- Arrow functions don't bind their own `this`

## Further Reading

- [MDN: Method Definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)
