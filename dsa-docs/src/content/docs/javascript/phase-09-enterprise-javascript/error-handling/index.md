---
title: Error Handling
description: Enterprise-grade error handling strategies
sidebar:
  order: 4
---

# Error Handling

## Introduction

Robust error handling is critical in production applications. It prevents crashes, provides meaningful feedback, and aids debugging.

## Layers of Error Handling

```javascript
// 1. Try/catch at service layer
class UserService {
  async getUser(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return this.transformUser(response.data);
    } catch (error) {
      this.handleError(error, 'Failed to fetch user');
      throw new AppError('USER_FETCH_ERROR', 'Unable to load user');
    }
  }
}

// 2. Global error boundary (React)
// 3. API error interceptor (axios/fetch wrapper)
// 4. Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
  logError(event.reason);
});

// 5. Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  logError(event.error);
});
```

## Custom Error Classes

```javascript
class AppError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super('NOT_FOUND', `${resource} with id ${id} not found`);
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super('VALIDATION_ERROR', message, { field });
  }
}
```

## Summary

- Multiple error handling layers
- Custom error classes with codes
- Global error handlers for uncaught errors
- Centralized logging

## Further Reading

- [MDN: Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
