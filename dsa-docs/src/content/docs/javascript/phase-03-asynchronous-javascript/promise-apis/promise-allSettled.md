---
title: Promise.allSettled
description: Waiting for all promises to settle, regardless of outcome
sidebar:
  order: 3
---

# Promise.allSettled

## Introduction

`Promise.allSettled` waits for **all** promises to settle (fulfill or reject). It never rejects — it always resolves with an array of result objects.

## Basic Usage

```javascript
const promises = [
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
];

const results = await Promise.allSettled(promises);
// [
//   { status: 'fulfilled', value: 'Success' },
//   { status: 'rejected', reason: 'Error' },
//   { status: 'fulfilled', value: 'Another success' }
// ]

const successful = results.filter(r => r.status === 'fulfilled');
const failed = results.filter(r => r.status === 'rejected');
```

## When to Use

```javascript
async function loadAllData() {
  const results = await Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);

  const data = {};
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      data[['users', 'posts', 'comments'][i]] = result.value;
    } else {
      console.warn(`Failed to load ${['users', 'posts', 'comments'][i]}:`, result.reason);
    }
  });

  return data; // Partial data even if some failed
}
```

## Summary

- Always resolves — never rejects
- Returns `{ status, value/reason }` for each promise
- Perfect for "best effort" parallel operations
- Different from `Promise.all` which fails fast

## Further Reading

- [MDN: Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
