---
title: Creating Promises
description: How to create and use JavaScript Promises
sidebar:
  order: 2
---

# Creating Promises

## Introduction

You create a Promise using the `new Promise(executor)` constructor, where the executor function receives `resolve` and `reject` callbacks.

## Basic Creation

```javascript
const promise = new Promise((resolve, reject) => {
  // Async operation here
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve('Operation succeeded!');
    } else {
      reject(new Error('Operation failed'));
    }
  }, 1000);
});
```

## Consuming a Promise

```javascript
promise
  .then(result => {
    console.log(result); // 'Operation succeeded!'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Always runs');
  });
```

## Converting Callback to Promise

```javascript
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFilePromise('/path/to/file')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## Summary

- `new Promise(executor)` creates a new promise
- Executor runs immediately (synchronously)
- `resolve(value)` transitions to fulfilled
- `reject(error)` transitions to rejected
- `.then()`, `.catch()`, `.finally()` consume the result

## Further Reading

- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
