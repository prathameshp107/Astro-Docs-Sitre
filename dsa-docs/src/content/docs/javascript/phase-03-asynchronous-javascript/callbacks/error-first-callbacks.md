---
title: Error-First Callbacks
description: The Node.js error-first callback convention
sidebar:
  order: 3
---

# Error-First Callbacks

## Introduction

The **error-first callback** pattern (also called Node.js style) passes errors as the first argument to the callback. If there's no error, the first argument is `null`.

## Why Do We Need This?

This convention standardizes error handling across async APIs, making it predictable and consistent.

## The Pattern

```javascript
function readFile(path, callback) {
  // ... read file
  if (error) {
    callback(new Error('File not found'), null);  // Error first
  } else {
    callback(null, fileData);                       // null = no error
  }
}

// Usage
readFile('/path/to/file', (err, data) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log(data);
});
```

## Multiple Results

```javascript
function getUser(id, callback) {
  setTimeout(() => {
    if (!id) {
      callback(new Error('Invalid ID'), null);
      return;
    }
    callback(null, { id, name: 'Alice', email: 'alice@email.com' });
  }, 100);
}

getUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log(user.name); // 'Alice'
});
```

## Summary

- First argument is always error (or `null` if success)
- Second argument is the result data
- Standard in Node.js core APIs
- Always check for errors first in the callback

## Further Reading

- [Node.js: Error-first Callbacks](https://nodejs.org/en/knowledge/errors/error-first-callbacks/)
