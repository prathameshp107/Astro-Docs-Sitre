---
title: Promise.race
description: First promise to settle wins
sidebar:
  order: 2
---

# Promise.race

## Introduction

`Promise.race` settles with the result of the **first** promise to settle (fulfill or reject). It's like a race — the fastest runner wins.

## Basic Usage

```javascript
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timeout')), 5000)
);

const data = fetch('/api/data').then(r => r.json());

Promise.race([data, timeout])
  .then(result => console.log('Got data:', result))
  .catch(err => console.error('Failed or timed out:', err));
```

## Practical: Request Timeout

```javascript
function fetchWithTimeout(url, ms = 5000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
  );

  return Promise.race([
    fetch(url).then(r => r.json()),
    timeout
  ]);
}

// Usage
try {
  const data = await fetchWithTimeout('/api/slow-endpoint', 3000);
  console.log(data);
} catch (err) {
  console.error(err.message); // 'Request timed out after 3000ms'
}
```

## Summary

- Resolves/rejects with the first settled promise
- Useful for timeouts and race conditions
- Can reject even if the "winning" promise rejects
- The losing promises still run (they're not cancelled)

## Further Reading

- [MDN: Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
