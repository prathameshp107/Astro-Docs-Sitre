---
title: Consuming Promises
description: Using .then(), .catch(), and .finally() to consume promises
sidebar:
  order: 3
---

# Consuming Promises

## Introduction

You consume a promise using `.then()` for success, `.catch()` for errors, and `.finally()` for cleanup that runs regardless of outcome.

## Basic Usage

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Data loaded'), 1000);
});

promise
  .then(result => {
    console.log(result); // 'Data loaded'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Cleanup — always runs');
  });
```

## then() Returns a New Promise

```javascript
Promise.resolve(5)
  .then(value => value * 2)      // Returns 10 (wrapped in Promise)
  .then(value => value + 3)      // Returns 13
  .then(value => console.log(value)); // Logs 13
```

## Error Handling

```javascript
Promise.resolve(5)
  .then(n => { throw new Error('Failed!'); })
  .then(n => n * 2)              // Skipped (error)
  .catch(err => {
    console.log(err.message);    // 'Failed!'
    return 0;                    // Recovery value
  })
  .then(n => console.log(n));    // 0
```

## Summary

- `.then(onFulfilled)` handles success
- `.catch(onRejected)` handles errors
- `.finally(onFinally)` runs regardless (no arguments)
- Each `.then()` returns a new promise for chaining
- Errors skip to the nearest `.catch()`

## Further Reading

- [MDN: Promise.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
