---
title: Prototypal Inheritance
description: Classical-style prototypal inheritance using constructor functions
sidebar:
  order: 1
---

# Prototypal Inheritance

## Introduction

Before ES6 classes, JavaScript used **constructor functions** and manual prototype manipulation to implement inheritance. Understanding this pattern helps you understand how JavaScript's inheritance actually works under the hood.

## The Classical Pattern

```javascript
// Parent constructor
function Animal(name) {
  this.name = name;
}

// Parent method on prototype
Animal.prototype.eat = function() {
  return `${this.name} is eating`;
};

// Child constructor
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

// Add child methods
Dog.prototype.bark = function() {
  return `${this.name} says woof!`;
};

const rex = new Dog('Rex', 'Labrador');
console.log(rex.eat());  // 'Rex is eating' — inherited
console.log(rex.bark()); // 'Rex says woof!' — own
```

## Step by Step

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.eat = function() { return `${this.name} is eating`; };

function Dog(name, breed) {
  // Step 1: Call parent constructor to initialize name
  Animal.call(this, name);
  this.breed = breed;
}

// Step 2: Set Dog.prototype to inherit from Animal.prototype
Dog.prototype = Object.create(Animal.prototype);

// Step 3: Fix the constructor reference
Dog.prototype.constructor = Dog;

// Step 4: Add Dog-specific methods
Dog.prototype.bark = function() { return `${this.name} says woof!`; };
```

## Why Fix the Constructor?

```javascript
console.log(Dog.prototype.constructor); // Dog (after fix)
// Without fix: Dog.prototype.constructor would be Animal

const rex = new Dog('Rex', 'Lab');
console.log(rex.constructor); // Dog (because we fixed it)
```

## The instanceof Check

```javascript
const rex = new Dog('Rex', 'Lab');

console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true — inherits from Animal
console.log(rex instanceof Object); // true — inherits from Object
```

## Summary

- Constructor functions set up instance-specific properties
- Prototype methods are shared across instances
- `Object.create()` sets up the prototype chain
- Always fix the constructor reference
- The pattern works but is verbose — ES6 classes simplify it

## Further Reading

- [MDN: Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [Next: Class Inheritance](./class-inheritance)
