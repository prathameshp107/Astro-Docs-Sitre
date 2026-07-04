---
title: Factory Implementation
description: Centralized object creation with the Factory pattern
sidebar:
  order: 1
---

# Factory Implementation

## Introduction

A Factory centralizes object creation logic, hiding the instantiation details from the caller.

## Simple Factory Function

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

const alice = userFactory('admin', 'Alice');
const bob = userFactory('user', 'Bob');
```

## Factory with Configuration

```javascript
function createApiClient(config) {
  const baseURL = config.baseURL;
  const headers = { 'Content-Type': 'application/json', ...config.headers };

  return {
    async get(endpoint) {
      const res = await fetch(`${baseURL}${endpoint}`, { headers });
      return res.json();
    },
    async post(endpoint, data) {
      const res = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST', headers, body: JSON.stringify(data)
      });
      return res.json();
    }
  };
}

const api = createApiClient({ baseURL: 'https://api.example.com' });
```

## Summary

- Factory functions centralize object creation
- Hides complex instantiation logic
- Easy to extend with new types
- Useful for API clients, model creation, and dependency injection

## Further Reading

- [Refactoring Guru: Factory Method](https://refactoring.guru/design-patterns/factory-method)
