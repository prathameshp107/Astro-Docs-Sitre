---
title: Properties
description: Working with object properties — access, assignment, enumeration, and deletion
sidebar:
  order: 2
---

# Properties

## Introduction

Object properties are the key-value pairs stored in an object. Keys are strings (or Symbols), and values can be any type.

## Accessing Properties

```javascript
const user = { name: 'Alice', age: 25 };

// Dot notation
user.name;  // 'Alice'

// Bracket notation (for dynamic keys)
user['name']; // 'Alice'
const key = 'age';
user[key];    // 25
```

## Adding and Updating

```javascript
const user = { name: 'Alice' };
user.age = 25;           // Add new property
user.name = 'Bob';       // Update existing
user['isActive'] = true; // Bracket notation
```

## Deleting Properties

```javascript
const user = { name: 'Alice', age: 25 };
delete user.age;
console.log(user.age); // undefined
```

## Property Enumeration

```javascript
const user = { name: 'Alice', age: 25 };

Object.keys(user);     // ['name', 'age']
Object.values(user);   // ['Alice', 25]
Object.entries(user);  // [['name', 'Alice'], ['age', 25]]
```

## Summary

- Access with `.` (static) or `[]` (dynamic)
- Add/update by assignment
- Delete with `delete` operator
- Use `Object.keys/values/entries` for enumeration

## Further Reading

- [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
