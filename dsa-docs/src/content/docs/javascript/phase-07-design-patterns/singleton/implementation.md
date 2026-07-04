---
title: Singleton Implementation
description: Different ways to implement the Singleton pattern in JavaScript
sidebar:
  order: 1
---

# Singleton Implementation

## Introduction

A Singleton ensures a class has only one instance and provides a global point of access. Here are multiple ways to implement it.

## Class-Based Singleton

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

## Module Pattern Singleton

```javascript
const Logger = (function() {
  let instance;

  function createInstance() {
    return {
      logs: [],
      log(level, message) {
        this.logs.push({ level, message, timestamp: Date.now() });
        console.log(`[${level}] ${message}`);
      },
      getLogs() { return [...this.logs]; }
    };
  }

  return {
    getInstance() {
      if (!instance) instance = createInstance();
      return instance;
    }
  };
})();

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
console.log(logger1 === logger2); // true
```

## Summary

- Class-based: store instance as a static property
- Module pattern: use closure to hold instance
- Both approaches guarantee a single instance
- Choose based on your coding style preferences

## Further Reading

- [Refactoring Guru: Singleton](https://refactoring.guru/design-patterns/singleton)
