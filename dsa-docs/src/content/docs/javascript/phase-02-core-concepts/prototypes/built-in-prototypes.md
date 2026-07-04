---
title: Built-in Prototypes
description: JavaScript's built-in prototypes — Array, Function, Object, and how they connect
sidebar:
  order: 3
---

# Built-in Prototypes

## Introduction

All built-in objects in JavaScript have prototypes that provide their methods. Understanding the built-in prototype chain helps you know where methods come from.

## The Prototype Hierarchy

```javascript
// Array → Array.prototype → Object.prototype → null
// Function → Function.prototype → Object.prototype → null
// String → String.prototype → Object.prototype → null
```

## Array.prototype

All array methods live on `Array.prototype`:

```javascript
const arr = [1, 2, 3];

// These methods are defined on Array.prototype:
// push, pop, map, filter, reduce, find, sort, forEach, etc.

console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
```

## Function.prototype

```javascript
function greet() {}
// call, apply, bind, etc. are on Function.prototype

console.log(greet.__proto__ === Function.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
```

## Object.prototype

The **top of the prototype chain** (for most objects):

```javascript
// Methods all objects inherit:
// toString, hasOwnProperty, valueOf, isPrototypeOf, propertyIsEnumerable

const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null — end of chain
```

## Why This Matters

```javascript
const arr = [3, 1, 2];

// arr inherits from Array.prototype
arr.sort(); // Array.prototype.sort
console.log(arr); // [1, 2, 3]

// arr also inherits from Object.prototype (via Array.prototype)
console.log(arr.hasOwnProperty(0)); // Object.prototype.hasOwnProperty
```

## Extending Built-in Prototypes (⚠️ Avoid!)

```javascript
// ❌ Bad practice — don't modify built-in prototypes
Array.prototype.first = function() { return this[0]; };
// Now ALL arrays have this method — potential conflicts!

// ❌ Even worse — overwriting existing methods
Array.prototype.push = function() { 
  console.log('push disabled'); 
  // Breaks all arrays!
};
```

## Checking Where a Method Comes From

```javascript
const arr = [1, 2, 3];

// Check if it's an own property
console.log(arr.hasOwnProperty('map'));  // false — inherited

// Check the prototype
console.log('map' in arr);                // true — found in chain
console.log(arr.map === Array.prototype.map); // true — same reference
```

## Summary

| Constructor | Prototype | Key Methods |
|------------|-----------|-------------|
| `Array` | `Array.prototype` | push, pop, map, filter, reduce |
| `Function` | `Function.prototype` | call, apply, bind |
| `String` | `String.prototype` | charAt, slice, toUpperCase |
| `Number` | `Number.prototype` | toFixed, toPrecision |
| `Object` | `Object.prototype` | toString, hasOwnProperty |

- All built-in prototypes ultimately inherit from `Object.prototype`
- The chain ends at `Object.prototype.__proto__` = `null`
- Never modify built-in prototypes (risks global conflicts)

## Further Reading

- [MDN: Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
- [Previous: Setting Prototypes](./setting-prototypes)
- [Next: Prototype vs Instance](./prototype-vs-instance)
