---
title: Object Destructuring
description: Extracting properties from objects
sidebar:
  order: 2
---

# Object Destructuring

## Introduction

Object destructuring extracts properties from objects into variables with matching names.

## Basic Destructuring

```javascript
const user = { name: 'Alice', age: 25, email: 'alice@email.com' };

const { name, age } = user;
console.log(name); // 'Alice'
console.log(age);  // 25
```

## Renaming

```javascript
const { name: userName, age: userAge } = user;
console.log(userName); // 'Alice'
console.log(userAge);  // 25
```

## Default Values

```javascript
const { name, role = 'user' } = user;
console.log(role); // 'user' (default)
```

## Nested Destructuring

```javascript
const data = { user: { name: 'Bob', address: { city: 'NYC' } } };
const { user: { name, address: { city } } } = data;
console.log(name); // 'Bob'
console.log(city); // 'NYC'
```

## Summary

- Property names must match (or use renaming)
- `{ prop: newName }` renames a property
- `{ prop = default }` sets a default value
- Works with nested objects

## Further Reading

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
