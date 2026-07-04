---
title: Class Declaration
description: Basic class syntax and class expressions in JavaScript
sidebar:
  order: 1
---

# Class Declaration

## Introduction

A **class declaration** is the primary way to define classes in JavaScript. Classes are functions under the hood — they're syntactic sugar over constructor functions and prototypes.

## Basic Syntax

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const user = new User('Alice', 'alice@email.com');
console.log(user.greet()); // "Hello, I'm Alice"
console.log(typeof User); // 'function' — classes are functions!
```

## Class vs Function Constructor

```javascript
// Class syntax
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() { return `Hi, ${this.name}`; }
}

// Equivalent function constructor
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() { 
  return `Hi, ${this.name}`; 
};

// They work the same way:
const alice = new Person('Alice');
console.log(alice.greet()); // "Hi, Alice"
```

## Class Expressions

Classes can be named or anonymous:

```javascript
// Anonymous class expression
const User = class {
  constructor(name) { this.name = name; }
};

// Named class expression
const Admin = class AdminClass {
  constructor(name) { this.name = name; }
  getClassName() { return AdminClass.name; }
};

// First-class — can be passed around
function createClass(className) {
  return class {
    constructor(name) { this.name = name; }
    greet() { return `Hi from ${className}`; }
  };
}
const MyClass = createClass('Custom');
```

## Key Characteristics

- Classes are **not hoisted** (unlike function declarations)
- Code inside a class is always **strict mode**
- Methods are **non-enumerable** on the prototype
- Cannot call a class without `new` (throws TypeError)

```javascript
// ❌ Not hoisted
const obj = new MyClass(); // ReferenceError
class MyClass {}

// ❌ Must use new
User(); // TypeError: Class constructor User cannot be invoked without 'new'
```

## typeof and instanceof

```javascript
class Rectangle {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
  area() { return this.w * this.h; }
}

console.log(typeof Rectangle); // 'function'
console.log(Rectangle.prototype.area); // [Function: area]
console.log(Rectangle.prototype.constructor === Rectangle); // true

const rect = new Rectangle(3, 4);
console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Object);    // true
```

## Summary

- `class` syntax is syntactic sugar over prototypes
- Classes are not hoisted — declare before use
- Class code is always in strict mode
- Methods are added to the prototype
- Must use `new` to instantiate

## Further Reading

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Next: Constructor](./constructor)
