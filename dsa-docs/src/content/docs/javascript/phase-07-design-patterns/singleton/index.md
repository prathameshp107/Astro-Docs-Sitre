---
title: Singleton Pattern
description: Ensuring a class has only one instance
sidebar:
  order: 2
---

# Singleton Pattern

## Introduction

The Singleton pattern ensures a class has **only one instance** and provides a global point of access to it.

## Topics Covered

- [Implementation](./implementation) — Ensuring a single instance
- [Pros & Cons](./pros-cons) — When to use (and avoid) singletons

## Implementation

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    Database.instance = this;
  }

  connect(url) {
    this.connection = url;
    console.log(`Connected to ${url}`);
  }

  query(sql) {
    if (!this.connection) throw new Error('Not connected');
    return `Result of: ${sql}`;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true
```

## Summary

- Single instance guarantee
- Often controversial — can make testing difficult
- Useful for configuration, logging, database connections

## Further Reading

- [Refactoring Guru: Singleton](https://refactoring.guru/design-patterns/singleton)
