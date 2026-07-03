---
title: Constructor
description: The constructor method in JavaScript classes — initialization and super
sidebar:
  order: 2
---

# Constructor

## Introduction

The `constructor` method is a special method that runs automatically when a new instance is created with `new`. It's where you set up instance properties and perform initialization.

## Basic Constructor

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
}

const user = new User('Alice', 'alice@email.com');
console.log(user.name);      // 'Alice'
console.log(user.createdAt); // Date object
```

## Default Values

```javascript
class Config {
  constructor(theme = 'dark', lang = 'en') {
    this.theme = theme;
    this.lang = lang;
    this.version = '1.0.0';
  }
}

const defaultConfig = new Config();
console.log(defaultConfig.theme); // 'dark'

const customConfig = new Config('light', 'fr');
console.log(customConfig.theme); // 'light'
```

## Validation in Constructor

```javascript
class BankAccount {
  constructor(owner, initialBalance = 0) {
    if (!owner) throw new Error('Owner is required');
    if (initialBalance < 0) throw new Error('Balance cannot be negative');
    
    this.owner = owner;
    this.balance = initialBalance;
  }
}

// Valid
const account = new BankAccount('Alice', 1000);

// Throws
const invalid = new BankAccount('', -500); // Error!
```

## super() in Subclass Constructors

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Must call super before using this
    this.breed = breed;
  }
}

const rex = new Dog('Rex', 'Labrador');
console.log(rex.name);  // 'Rex'
console.log(rex.breed); // 'Labrador'
```

### super() Requirements

- Must call `super()` before accessing `this`
- If a subclass defines a constructor, it **must** call `super()`
- If no constructor is defined in a subclass, `super()` is automatically called

```javascript
class Animal {
  constructor(name) { this.name = name; }
}

class Dog extends Animal {
  // ❌ constructor(name, breed) { this.breed = breed; }
  // ReferenceError: Must call super before accessing this
  
  constructor(name, breed) {
    super(name); // ✅ Required
    this.breed = breed;
  }
}
```

## Default Constructor

If you don't define a constructor, JavaScript provides a default one:

```javascript
class User {
  // Default constructor is equivalent to:
  // constructor() {}
  greet() { return 'Hello!'; }
}

const user = new User(); // works fine
console.log(user.greet()); // 'Hello!'
```

## Summary

- `constructor()` runs once when a new instance is created
- Default values and validation can be done in the constructor
- Subclass constructors must call `super()` before `this`
- Without a constructor, JS provides a default one

## Further Reading

- [MDN: constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)
- [Previous: Class Declaration](./class-declaration)
- [Next: extends & super](./extends-super)
