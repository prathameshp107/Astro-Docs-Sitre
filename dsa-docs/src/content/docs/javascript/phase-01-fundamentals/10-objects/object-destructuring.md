---
title: Object Destructuring
description: Extracting properties from objects using destructuring syntax
sidebar:
  order: 4
---

# Object Destructuring

## Introduction

Destructuring is a concise syntax for extracting properties from objects into variables. It's a powerful ES6 feature.

## Basic Destructuring

```javascript
const user = { name: 'Alice', age: 25, email: 'alice@email.com' };

const { name, age } = user;
console.log(name); // 'Alice'
console.log(age);  // 25
```

## Renaming Variables

```javascript
const user = { name: 'Alice', age: 25 };

const { name: userName, age: userAge } = user;
console.log(userName); // 'Alice'
```

## Default Values

```javascript
const user = { name: 'Alice' };
const { name, age = 18 } = user;
console.log(age); // 18 — default used
```

## Nested Destructuring

```javascript
const user = { 
  name: 'Alice', 
  address: { city: 'NYC', zip: '10001' }
};

const { address: { city, zip } } = user;
console.log(city); // 'NYC'
```

## Function Parameters

```javascript
function greet({ name, age }) {
  return `${name} is ${age} years old`;
}

greet({ name: 'Alice', age: 25 });
```

## Summary

- Destructuring extracts properties into variables
- Rename with `{ oldName: newName }`
- Default values with `=`
- Works great with function parameters

## Further Reading

- [MDN: Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
