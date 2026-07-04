---
title: Factory Pattern
description: Creating objects without specifying the exact class
sidebar:
  order: 3
---

# Factory Pattern

## Introduction

The Factory pattern provides an interface for creating objects without exposing the creation logic to the caller.

## Topics Covered

- [Implementation](./implementation) — Centralized object creation
- [Real-World Examples](./real-world-examples) — Practical factory scenarios

## Implementation

```javascript
class User { constructor(name) { this.name = name; this.role = 'user'; } }
class Admin { constructor(name) { this.name = name; this.role = 'admin'; } }
class Guest { constructor(name) { this.name = name; this.role = 'guest'; } }

function userFactory(type, name) {
  switch (type) {
    case 'admin': return new Admin(name);
    case 'guest': return new Guest(name);
    default: return new User(name);
  }
}

const alice = userFactory('admin', 'Alice'); // Admin { name: 'Alice', role: 'admin' }
const bob = userFactory('user', 'Bob');       // User { name: 'Bob', role: 'user' }
```

## Summary

- Centralizes object creation
- Hides complex instantiation logic
- Easy to extend with new types

## Further Reading

- [Refactoring Guru: Factory](https://refactoring.guru/design-patterns/factory-method)
