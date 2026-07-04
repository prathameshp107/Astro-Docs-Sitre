---
title: Function Parameters
description: Destructuring in function arguments
sidebar:
  order: 3
---

# Function Parameters

## Introduction

Destructuring in function parameters is a common pattern for handling options objects and extracting values cleanly.

## Basic Usage

```javascript
function greet({ name, age }) {
  return `${name} is ${age} years old`;
}

greet({ name: 'Alice', age: 25 }); // 'Alice is 25 years old'
```

## With Defaults

```javascript
function createUser({ name, age = 18, role = 'user' } = {}) {
  return { name, age, role };
}

createUser({ name: 'Alice' }); // { name: 'Alice', age: 18, role: 'user' }
createUser(); // { name: undefined, age: 18, role: 'user' }
```

## Rest Parameters

```javascript
function logUser({ name, ...rest }) {
  console.log(name); // 'Alice'
  console.log(rest); // { age: 25, email: 'alice@email.com' }
}
```

## Summary

- Destructure in parameter list for clean API
- Provide defaults for optional parameters
- Use `= {}` default for the whole parameter
- Common in React props, API handlers, and configs

## Further Reading

- [MDN: Destructuring parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
