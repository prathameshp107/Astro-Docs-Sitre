---
title: Use Cases
description: Practical AbortController patterns
sidebar:
  order: 3
---

# Use Cases

## Introduction

AbortController is essential for cleanup in modern web applications.

## Navigation Cleanup

```javascript
// Cancel pending requests when navigating away
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => { /* ignore aborts */ });

  return () => controller.abort(); // Cleanup on unmount
}, []);
```

## Search with Cancellation

```javascript
function SearchBox() {
  const controllerRef = useRef(null);

  async function handleSearch(query) {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancel previous request
    }

    controllerRef.current = new AbortController();

    try {
      const results = await fetch(`/api/search?q=${query}`, {
        signal: controllerRef.current.signal
      });
      // Update results…
    } catch (err) {
      if (err.name !== 'AbortError') throw err;
    }
  }
}
```

## Summary

- Prevents race conditions from stale requests
- Essential for React useEffect cleanup
- Ideal for search-as-you-type patterns
- Prevents wasted bandwidth and data races

## Further Reading

- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
