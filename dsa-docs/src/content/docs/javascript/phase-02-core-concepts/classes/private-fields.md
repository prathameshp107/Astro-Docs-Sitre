---
title: Private Fields
description: Private class fields in JavaScript — true encapsulation with the # prefix
sidebar:
  order: 6
---

# Private Fields

## Introduction

**Private fields** (ES2022) provide **true encapsulation** in JavaScript classes. Fields prefixed with `#` are only accessible from inside the class — not from subclasses or external code.

## Basic Syntax

```javascript
class BankAccount {
  #balance = 0; // private field
  
  constructor(owner) {
    this.owner = owner;
  }
  
  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount('Alice');
account.deposit(1000);
console.log(account.getBalance()); // 1000

// ❌ Cannot access outside class
console.log(account.#balance); // SyntaxError: Private field
```

## Private Methods

```javascript
class User {
  #password;
  
  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }
  
  // Private method
  #hashPassword(password) {
    // Simulated hashing
    return password.split('').reverse().join('');
  }
  
  authenticate(password) {
    return this.#hashPassword(password) === this.#password;
  }
}

const user = new User('Alice', 'secret123');
console.log(user.authenticate('secret123')); // true

// ❌ Cannot access private method
user.#hashPassword('test'); // SyntaxError
```

## Private Fields are Not Inherited

```javascript
class Parent {
  #secret = 'parent secret';
  
  getSecret() {
    return this.#secret;
  }
}

class Child extends Parent {
  tryAccess() {
    // ❌ Cannot access parent's private fields
    return this.#secret; // SyntaxError
  }
}

const child = new Child();
console.log(child.getSecret()); // 'parent secret' — works via Parent's method
```

## Private vs Public Fields

```javascript
class Example {
  publicField = 'accessible everywhere';   // public
  #privateField = 'only inside class';     // private
  
  getPrivate() {
    return this.#privateField; // ✅
  }
  
  static getStaticPrivate(instance) {
    // Static methods can access private fields of instances
    return instance.#privateField;
  }
}

const ex = new Example();
console.log(ex.publicField);       // ✅ 'accessible everywhere'
console.log(ex.getPrivate());      // ✅ 'only inside class'
console.log(Example.getStaticPrivate(ex)); // ✅ 'only inside class'
console.log(ex.#privateField);     // ❌ SyntaxError
```

## Why Private Matters

Before private fields, developers used conventions like `_`:

```javascript
// ❌ Old convention — not truly private
class OldWay {
  constructor() {
    this._secret = 'can be accessed'; // just a convention
  }
}
const old = new OldWay();
old._secret; // works (but shouldn't)

// ✅ New way — truly private
class NewWay {
  #secret = 'truly private'; // enforced by the engine
}
const newer = new NewWay();
newer.#secret; // SyntaxError
```

## Use Cases

```javascript
// 1. Internal state management
class Counter {
  #count = 0;
  
  increment() { this.#count++; }
  decrement() { this.#count--; }
  get value() { return this.#count; }
}

// 2. Validation with private state
class Product {
  #price;
  
  constructor(name, price) {
    this.name = name;
    this.#setPrice(price);
  }
  
  #setPrice(price) {
    if (price < 0) throw new Error('Price cannot be negative');
    this.#price = price;
  }
  
  get price() { return this.#price; }
}
```

## Summary

- Private fields use `#` prefix (e.g., `#balance`)
- Only accessible from inside the class
- Not inherited by subclasses
- Private methods also supported
- Enforced by the JavaScript engine (syntax error at compile time)
- Use for truly internal state, not just naming conventions

## Further Reading

- [MDN: Private Class Fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [MDN: Private Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#private_methods)
- [Previous: Static Members](./static-members)
