---
title: Promise.any
description: First fulfilled promise wins
sidebar:
  order: 4
---

# Promise.any

## Introduction

`Promise.any` resolves with the **first fulfilled** promise. It rejects only if **all** promises reject (with an `AggregateError`).

## Basic Usage

```javascript
const promises = [
  fetch('/api/server1').then(r => r.json()),
  fetch('/api/server2').then(r => r.json()),
  fetch('/api/server3').then(r => r.json())
];

Promise.any(promises)
  .then(result => console.log('Got data from fastest server:', result))
  .catch(err => {
    // AggregateError — all promises rejected
    console.error('All servers failed:', err.errors);
  });
```

## Comparison with Promise.race

```javascript
// Promise.race — first to SETTLE (could be rejection)
Promise.race([
  fetch('/api/data'),
  Promise.reject('Error')
]).then(console.log) // Never runs — rejects immediately

// Promise.any — first to FULFILL (ignores rejections)
Promise.any([
  fetch('/api/data'),
  Promise.reject('Error')
]).then(console.log) // Runs if fetch succeeds
```

## Summary

- Resolves with the first fulfilled promise
- Rejects with AggregateError only if ALL reject
- Unlike `Promise.race` which rejects on first rejection
- Great for redundant/failover scenarios

## Further Reading

- [MDN: Promise.any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
