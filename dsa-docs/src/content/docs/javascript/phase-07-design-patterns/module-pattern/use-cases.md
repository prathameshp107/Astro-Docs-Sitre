---
title: Module Pattern Use Cases
description: When and why to use the Module pattern
sidebar:
  order: 2
---

# Module Pattern Use Cases

## Introduction

The Module pattern is best suited for scenarios where you need encapsulation, namespace management, or controlled access to internal state.

## Singleton Services

```javascript
const Config = (function() {
  const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
  };

  return {
    get(key) { return config[key]; },
    set(key, value) { config[key] = value; },
    getAll() { return { ...config }; }
  };
})();
```

## Namespace Management

```javascript
// Before modules — prevent global namespace pollution
const MyApp = (function() {
  // All internal code is scoped here

  const Utils = {
    formatDate(date) { /* ... */ },
    debounce(fn, ms) { /* ... */ }
  };

  const API = {
    async get(url) { /* ... */ },
    async post(url, data) { /* ... */ }
  };

  return { Utils, API };
})();

MyApp.API.get('/users');
```

## Counter / State Management

```javascript
const Counter = (function() {
  let count = 0;

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    reset() { count = 0; },
    getCount() { return count; }
  };
})();
```

## Summary

- Singleton services (config, logging)
- Namespace management (avoid global pollution)
- Simple state management without a framework
- Legacy codebases (pre-ES modules)

## Further Reading

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
