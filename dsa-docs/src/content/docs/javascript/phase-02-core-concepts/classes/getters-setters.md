---
title: Getters & Setters
description: Computed properties in JavaScript classes using get and set
sidebar:
  order: 4
---

# Getters & Setters

## Introduction

**Getters** and **setters** are special methods that let you define **computed properties** on a class. They look like regular property access but run code underneath.

## Basic Getter

```javascript
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user = new User('Alice', 'Johnson');
console.log(user.fullName); // "Alice Johnson" — no () needed!
```

## Getter and Setter Together

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius; // convention: _ for internal
  }
  
  get celsius() {
    return this._celsius;
  }
  
  set celsius(value) {
    if (value < -273.15) throw new Error('Below absolute zero!');
    this._celsius = value;
  }
  
  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }
  
  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature(0);
console.log(temp.celsius);    // 0
console.log(temp.fahrenheit); // 32

temp.celsius = 100;
console.log(temp.fahrenheit); // 212

temp.celsius = -300; // ❌ Error: Below absolute zero!
```

## Practical Examples

### Computed Properties

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  get area() {
    return this.width * this.height;
  }
  
  get perimeter() {
    return 2 * (this.width + this.height);
  }
  
  set dimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }
}

const rect = new Rectangle(3, 4);
console.log(rect.area);      // 12
console.log(rect.perimeter); // 14

rect.dimensions = { width: 5, height: 6 };
console.log(rect.area); // 30
```

### Validation with Setters

```javascript
class BankAccount {
  constructor(owner) {
    this.owner = owner;
    this._balance = 0;
  }
  
  get balance() {
    return this._balance;
  }
  
  set balance(value) {
    if (value < 0) throw new Error('Balance cannot be negative');
    this._balance = value;
  }
}

const account = new BankAccount('Alice');
account.balance = 1000; // ✅
console.log(account.balance); // 1000

account.balance = -500; // ❌ Error!
```

## Getters/Setters vs Regular Methods

```javascript
class Example {
  get computed() {
    return 'Accessed as a property';
  }
  
  computedMethod() {
    return 'Accessed as a method with ()';
  }
}

const ex = new Example();
ex.computed;         // property-style access
ex.computedMethod(); // method-style call
```

## The _ Convention

Prefixing internal properties with `_` is a **naming convention** (not enforced):

```javascript
class Person {
  constructor(name) {
    this._name = name; // _ indicates "internal, don't access directly"
  }
  
  get name() {
    return this._name;
  }
  
  set name(value) {
    if (!value) throw new Error('Name is required');
    this._name = value;
  }
}
```

## Summary

- Getters/setters define computed properties
- Called without parentheses (like properties)
- Setters enable validation on assignment
- Getters provide read-only computed values
- Use `_` prefix convention for internal storage

## Further Reading

- [MDN: Getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
- [MDN: Setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
- [Previous: extends & super](./extends-super)
- [Next: Static Members](./static-members)
