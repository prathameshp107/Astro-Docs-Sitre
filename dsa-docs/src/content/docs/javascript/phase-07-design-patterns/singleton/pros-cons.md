---
title: Singleton Pros & Cons
description: When to use (and avoid) singletons
sidebar:
  order: 2
---

# Singleton Pros & Cons

## Introduction

Singletons are a controversial pattern. They're useful in moderation but can create problems when overused.

## When to Use Singletons

- **Configuration**: App-wide settings that are consistent everywhere
- **Logging**: A centralized logger for the application
- **Database connections**: A single connection pool
- **Caching**: A shared cache instance

## When to Avoid Singletons

```javascript
// ❌ Bad — singleton makes testing difficult
class PaymentService {
  processPayment(amount) {
    Logger.getInstance().log('Processing payment...');
    Database.getInstance().query('INSERT INTO payments...');
  }
}

// ✅ Better — dependency injection for testability
class PaymentService {
  constructor(logger, database) {
    this.logger = logger;
    this.database = database;
  }

  processPayment(amount) {
    this.logger.log('Processing payment...');
    this.database.query('INSERT INTO payments...');
  }
}

// Now you can mock in tests!
const mockLogger = { log: jest.fn() };
const mockDb = { query: jest.fn() };
const service = new PaymentService(mockLogger, mockDb);
```

## Drawbacks

- **Hidden dependencies**: Components implicitly depend on the singleton
- **Testing difficulty**: Hard to mock or replace in tests
- **Global state**: Creates implicit global state
- **Tight coupling**: Components become coupled to the singleton

## Summary

| Pros | Cons |
|------|------|
| Single instance guarantee | Global state |
| Easy access | Hidden dependencies |
| Consistent state | Hard to test |
| Saves memory | Tight coupling |

## Further Reading

- [Refactoring Guru: Singleton Critique](https://refactoring.guru/design-patterns/singleton#criticism)
