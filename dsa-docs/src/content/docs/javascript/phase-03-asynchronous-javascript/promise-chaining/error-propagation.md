---
title: Error Propagation
description: How errors flow through promise chains
sidebar:
  order: 2
---

# Error Propagation

## Introduction

When an error occurs at any point in a promise chain, it skips all subsequent `.then()` handlers until it reaches the nearest `.catch()`.

## How Errors Flow

```javascript
Promise.resolve(5)
  .then(n => { throw new Error('Failed at step 1'); })
  .then(n => n * 2)  // Skipped
  .then(n => n + 3)  // Skipped
  .catch(err => {
    console.log(err.message); // 'Failed at step 1'
    return 0; // Recovery value
  })
  .then(n => console.log(n)); // 0
```

## Error Recovery

```javascript
fetch('/api/data')
  .then(response => response.json())
  .catch(err => {
    console.error('Fetch failed, using cache:', err);
    return getCachedData(); // Fallback
  })
  .then(data => {
    // This runs whether we got fresh or cached data
    renderData(data);
  });
```

## Multiple Catch Handlers

```javascript
Promise.resolve()
  .then(() => step1())
  .catch(err => { /* handle step1 errors */ return fallback1(); })
  .then(() => step2())
  .catch(err => { /* handle step2 errors */ return fallback2(); });
```

## Summary

- Errors skip `.then()` handlers until a `.catch()` is found
- `.catch()` can return a recovery value to continue the chain
- Place `.catch()` at the end for global error handling
- Multiple `.catch()` handlers can handle errors at different stages

## Further Reading

- [MDN: Promise.catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
