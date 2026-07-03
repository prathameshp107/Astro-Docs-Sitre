---
title: Class Inheritance
description: ES6 class-based inheritance using extends and super
sidebar:
  order: 2
---

# Class Inheritance

## Introduction

ES6 classes provide a **cleaner syntax** for inheritance. The `extends` keyword sets up the prototype chain automatically, and `super` calls the parent class.

## Basic Class Inheritance

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    return `${this.name} is eating`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // calls Animal constructor
    this.breed = breed;
  }
  
  bark() {
    return `${this.name} says woof!`;
  }
}

const rex = new Dog('Rex', 'Labrador');
console.log(rex.eat());  // 'Rex is eating' — inherited
console.log(rex.bark()); // 'Rex says woof!' — own
```

## Method Overriding

```javascript
class Animal {
  speak() {
    return 'Some sound';
  }
}

class Dog extends Animal {
  speak() {
    return 'Woof!'; // overrides parent
  }
}

const dog = new Dog();
console.log(dog.speak()); // 'Woof!'
```

## Calling Parent Methods with super

```javascript
class Animal {
  speak() {
    return 'Some sound';
  }
}

class Dog extends Animal {
  speak() {
    const parentMessage = super.speak(); // call parent
    return `${parentMessage} → Woof!`; // extend it
  }
}

const dog = new Dog();
console.log(dog.speak()); // 'Some sound → Woof!'
```

## Multi-level Inheritance

```javascript
class Animal {
  constructor(name) { this.name = name; }
  eat() { return `${this.name} is eating`; }
}

class Mammal extends Animal {
  constructor(name, hasFur) {
    super(name);
    this.hasFur = hasFur;
  }
  walk() { return `${this.name} is walking`; }
}

class Dog extends Mammal {
  constructor(name, breed) {
    super(name, true); // Mammals have fur
    this.breed = breed;
  }
  bark() { return `${this.name} says woof!`; }
}

const rex = new Dog('Rex', 'Lab');
console.log(rex.eat());  // Animal method
console.log(rex.walk()); // Mammal method
console.log(rex.bark()); // Dog method
```

## super() Rules

- Must call `super()` before accessing `this` in a subclass constructor
- If a subclass has a constructor, `super()` is required
- Without a constructor, `super()` is automatically called

## Summary

- `extends` sets up prototype chain automatically
- `super()` calls parent constructor
- `super.method()` calls parent method
- Method overriding is straightforward
- Multi-level inheritance works through the chain

## Further Reading

- [MDN: extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
- [Previous: Prototypal Inheritance](./prototypal-inheritance)
- [Next: Composition vs Inheritance](./composition-vs-inheritance)
