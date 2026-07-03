---
title: Real-World Factory Examples
description: Practical scenarios where the Factory pattern shines
sidebar:
  order: 2
---

# Real-World Factory Examples

## Introduction

Factories are used extensively in real-world applications for creating objects with complex setup, conditional logic, or configuration.

## UI Component Factory

```javascript
function createButton(type, label) {
  const button = document.createElement('button');
  button.textContent = label;

  switch (type) {
    case 'primary':
      button.className = 'btn btn-primary';
      break;
    case 'secondary':
      button.className = 'btn btn-secondary';
      break;
    case 'danger':
      button.className = 'btn btn-danger';
      break;
  }

  return button;
}

const saveBtn = createButton('primary', 'Save');
const deleteBtn = createButton('danger', 'Delete');
```

## API Client Factory

```javascript
function createHttpClient(baseURL, options = {}) {
  const defaults = {
    timeout: 5000,
    retries: 3,
    headers: { 'Content-Type': 'application/json' }
  };

  const config = { ...defaults, ...options };

  return {
    async get(endpoint) { /* ... */ },
    async post(endpoint, data) { /* ... */ },
    async put(endpoint, data) { /* ... */ },
    async delete(endpoint) { /* ... */ },
    setAuth(token) { config.headers.Authorization = `Bearer ${token}`; }
  };
}

const api = createHttpClient('https://api.example.com', { timeout: 10000 });
```

## Summary

- UI element creation with conditional styling
- API client configuration with defaults
- Model instantiation with different strategies
- Dependency injection containers

## Further Reading

- [Refactoring Guru: Factory](https://refactoring.guru/design-patterns/factory-method)
