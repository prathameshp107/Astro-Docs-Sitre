---
title: Module Pattern Implementation
description: IIFE closures and private state encapsulation
sidebar:
  order: 1
---

# Module Pattern Implementation

## Introduction

The Module pattern uses an IIFE (Immediately Invoked Function Expression) to create a closure that encapsulates private state and exposes a controlled public API.

## Basic IIFE Module

```javascript
const UserModule = (function() {
  // Private state
  const users = [];
  let nextId = 1;

  function validateUser(user) {
    return user.name && user.email;
  }

  // Public API
  return {
    add(name, email) {
      if (!name || !email) throw new Error('Name and email required');
      const user = { id: nextId++, name, email };
      users.push(user);
      return user;
    },

    getAll() {
      return [...users];
    },

    getById(id) {
      return users.find(u => u.id === id);
    },

    remove(id) {
      const index = users.findIndex(u => u.id === id);
      if (index !== -1) return users.splice(index, 1)[0];
    }
  };
})();

UserModule.add('Alice', 'alice@email.com');
UserModule.getAll(); // [{ id: 1, name: 'Alice', email: 'alice@email.com' }]
```

## Revealing Module Pattern

```javascript
const Calculator = (function() {
  // Private
  let result = 0;

  function validate(num) {
    if (typeof num !== 'number') throw new Error('Invalid number');
  }

  // Public references
  return {
    add(num) { validate(num); result += num; return this; },
    subtract(num) { validate(num); result -= num; return this; },
    multiply(num) { validate(num); result *= num; return this; },
    getResult() { return result; },
    reset() { result = 0; return this; }
  };
})();

Calculator.add(5).multiply(2).getResult(); // 10
```

## ES Module Alternative

Modern ES modules provide the same encapsulation natively:

```javascript
// 📁 userModule.js (private by default)
const users = [];
let nextId = 1;

export function createUser(name, email) {
  const user = { id: nextId++, name, email };
  users.push(user);
  return user;
}

export function getUsers() { return [...users]; }
```

## Summary

- IIFE creates a closure for private state
- Return an object with only the public methods
- Private variables and functions stay hidden
- ES modules make the pattern less necessary today

## Further Reading

- [MDN: IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
