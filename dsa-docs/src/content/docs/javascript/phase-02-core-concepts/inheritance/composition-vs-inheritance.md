---
title: Composition vs Inheritance
description: Why composition is often preferred over inheritance in JavaScript
sidebar:
  order: 3
---

# Composition vs Inheritance

## Introduction

**Composition** ("has-a") builds objects by combining smaller, focused pieces. **Inheritance** ("is-a") builds hierarchical relationships. The principle **"favor composition over inheritance"** is a core design guideline.

## The Problem with Deep Inheritance

```javascript
// ❌ Deep inheritance — fragile and rigid
class Animal { eat() {} }
class Mammal extends Animal { walk() {} }
class Dog extends Mammal { bark() {} }
class Cat extends Mammal { meow() {} }
class Puppy extends Dog { play() {} }
// What if Puppy needs cat behaviors too? Can't — single inheritance!
```

## Composition Approach

```javascript
// ✅ Composition — mix and match behaviors
const canEat = {
  eat() { return `${this.name} is eating`; }
};

const canBark = {
  bark() { return `${this.name} says woof!`; }
};

const canMeow = {
  meow() { return `${this.name} says meow!`; }
};

const canWalk = {
  walk() { return `${this.name} is walking`; }
};

// Compose objects with the behaviors they need
function createDog(name) {
  return Object.assign(
    { name },
    canEat,
    canWalk,
    canBark
  );
}

function createCat(name) {
  return Object.assign(
    { name },
    canEat,
    canWalk,
    canMeow
  );
}

const rex = createDog('Rex');
console.log(rex.eat());  // 'Rex is eating'
console.log(rex.bark()); // 'Rex says woof!'
```

## Object.assign Composition

```javascript
const canEat = { eat() { return `${this.name} is eating`; } };
const canSwim = { swim() { return `${this.name} is swimming`; } };
const canFly = { fly() { return `${this.name} is flying`; } };

// Create a duck that can eat, swim, and fly
function createDuck(name) {
  return Object.assign({ name }, canEat, canSwim, canFly);
}
```

## Spread Composition (Modern)

```javascript
const canEat = { eat() { return `${this.name} is eating`; } };
const canBark = { bark() { return `${this.name} says woof!`; } };

function createDog(name) {
  return {
    name,
    ...canEat,
    ...canBark
  };
}
```

## When to Use Inheritance

Inheritance is appropriate when:
- There's a clear **is-a** relationship
- Subtypes are **substitutable** for their parent (Liskov)
- The hierarchy is **stable** and **shallow** (2-3 levels max)

```javascript
// ✅ Good use of inheritance
class Shape { area() {} }
class Circle extends Shape {}
class Rectangle extends Shape {}

// ❌ Overused inheritance
class Database {}
class MySQLDatabase extends Database {}
class PostgreSQLDatabase extends Database {}
class Connection extends MySQLDatabase {} // too deep, wrong relationship
```

## Decision Guide

| Use Inheritance When... | Use Composition When... |
|------------------------|------------------------|
| Clear "is-a" relationship | "Has-a" relationship |
| Behavior is shared + stable | Behavior varies independently |
| Deep hierarchy unlikely | Need to mix multiple behaviors |
| Subtypes are substitutable | Code reuse across unrelated classes |

## Summary

- Composition is more flexible than inheritance
- Inheritance creates tight coupling; composition is loose
- Use `Object.assign()` or spread for composition
- Prefer shallow inheritance (2-3 levels max)
- "Favor composition over inheritance"

## Further Reading

- [MDN: Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Previous: Class Inheritance](./class-inheritance)
