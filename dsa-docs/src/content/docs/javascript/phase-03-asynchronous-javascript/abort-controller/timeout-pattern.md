---
title: Timeout Pattern
description: Automatic request cancellation with timeout
sidebar:
  order: 2
---

# Timeout Pattern

## Introduction

Use AbortController with setTimeout to automatically cancel requests that take too long.

## Implementation

```javascript
function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal: controller.signal })
    .then(response => {
      clearTimeout(timeoutId);
      return response.json();
    })
    .catch(err => {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw err;
    });
}

// Usage
try {
  const data = await fetchWithTimeout('/api/slow-endpoint', 3000);
  console.log(data);
} catch (err) {
  console.error(err.message); // 'Request timed out'
}
```

## AbortSignal.timeout()

```javascript
// Modern browsers — built-in timeout signal
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000)
});
// Automatically aborts after 5 seconds
```

## Summary

- Combine AbortController with setTimeout for timeouts
- Clear the timeout in both success and error handlers
- `AbortSignal.timeout(ms)` provides built-in timeout
- Always clean up the timeout to avoid memory leaks

## Further Reading

- [MDN: AbortSignal.timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout)
