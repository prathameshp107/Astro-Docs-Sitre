---
title: Promise.all
description: Waiting for all promises to fulfill
sidebar:
  order: 1
---

# Promise.all

## Introduction

`Promise.all` waits for **all** promises to fulfill. If any promise rejects, the entire `Promise.all` rejects immediately.

## Basic Usage

```javascript
const promises = [
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
];

try {
  const [users, posts, comments] = await Promise.all(promises);
  console.log('All data loaded:', { users, posts, comments });
} catch (error) {
  console.error('One request failed:', error);
}
```

## Fail-Fast Behavior

```javascript
const p1 = Promise.resolve('OK');
const p2 = Promise.reject(new Error('Failed!'));
const p3 = Promise.resolve('Also OK'); // Never reached

Promise.all([p1, p2, p3])
  .then(results => console.log(results))
  .catch(err => console.log(err.message)); // 'Failed!'
// Promise.all rejects IMMEDIATELY when p2 rejects
// p3 is still pending — its result is lost
```

## When to Use

- Loading multiple independent data sets in parallel
- Performing parallel operations where all must succeed
- Waiting for several async setup steps before proceeding

## Summary

- Resolves with array of results when all promises fulfill
- Rejects immediately if any promise rejects
- Results maintain the order of the input array
- Fail-fast behavior: one failure cancels the whole operation

## Further Reading

- [MDN: Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
