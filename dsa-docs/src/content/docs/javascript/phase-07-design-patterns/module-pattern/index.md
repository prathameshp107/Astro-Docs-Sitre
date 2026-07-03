---
title: Module Pattern
description: Encapsulating private state with the Module pattern
sidebar:
  order: 1
---

# Module Pattern

## Introduction

The Module pattern encapsulates **private state** and exposes only a public API using closures and IIFEs.

## Topics Covered

- [Implementation](./implementation) — IIFE closures and private state
- [Use Cases](./use-cases) — When to use the Module pattern

## Implementation

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

## Summary

- Uses closure for private state
- Returns public API object
- Pre-ES6 module pattern (still used for simple cases)

## Further Reading

- [MDN: Module Pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
