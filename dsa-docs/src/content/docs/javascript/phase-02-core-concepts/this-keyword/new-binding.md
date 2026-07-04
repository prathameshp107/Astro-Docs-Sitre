---
title: new Binding
description: The new binding rule for JavaScript's this keyword — constructor calls
sidebar:
  order: 4
---

# new Binding

## Introduction

When a function is called with the `new` keyword, JavaScript creates a **new object** and sets `this` to that new object. This is called **new binding**.

## How It Works

Using `new` with a constructor function:

```javascript
function Person(name) {
  // 'this' = newly created object
  this.name = name;
  // 'this' = { name: 'Alice' }
}

const alice = new Person('Alice');
console.log(alice.name); // 'Alice'
```

## What new Does Behind the Scenes

1. Creates a brand new empty object `{}`
2. Links the object's prototype to the function's `prototype`
3. Sets `this` to the new object
4. Returns `this` (unless the function returns a non-primitive)

```javascript
function Person(name) {
  // Step 1 & 2: JS creates {} and links prototype
  // Step 3: this = {}
  this.name = name;  // this = { name: 'Alice' }
  // Step 4: return this (implicit)
}

// Conceptual equivalent:
function newPerson(name) {
  const obj = {};
  Object.setPrototypeOf(obj, Person.prototype);
  const result = Person.call(obj, name);
  return result || obj;
}
```

## Constructor Functions vs Regular Functions

```javascript
// With new — this = new object
const alice = new Person('Alice');
console.log(alice instanceof Person); // true

// Without new — this = global (default binding!)
const bob = Person('Bob'); 
console.log(bob); // undefined (no return)
console.log(window.name); // 'Bob' — accidentally set global!
```

## Priority

`new` binding has the **highest priority** — it overrides explicit binding:

```javascript
function show() {
  console.log(this);
}

const obj = { name: 'obj' };
const bound = show.bind(obj);

new bound(); // this = new object, NOT obj
// new binding wins over explicit binding!
```

## ES6 Classes

The `new` binding is how ES6 classes work:

```javascript
class User {
  constructor(name) {
    // this = new object (created by new)
    this.name = name;
  }
}

const user = new User('Alice');
console.log(user.name); // 'Alice'
```

## Best Practices

- Always use `new` with constructor functions and classes
- Name constructor functions with PascalCase as convention
- Use ES6 `class` syntax for cleaner constructors
- Ensure constructors always create valid objects

## Summary

- `new` creates a new object and binds `this` to it
- Highest priority binding rule
- Functions called with `new` are constructors
- ES6 classes automatically use `new` binding
- Without `new` → `this` falls back to default binding

## Further Reading

- [MDN: new operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)
- [Previous: Explicit Binding](./explicit-binding)
- [Next: Arrow Functions](./arrow-functions)
