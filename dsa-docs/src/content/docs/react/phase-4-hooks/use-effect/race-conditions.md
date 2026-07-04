---
title: "Race Conditions with useEffect"
description: "Preventing race conditions: how stale API responses overwrite newer data and how AbortController fixes it."
sidebar:
  order: 3
---

# Race Conditions with useEffect

## Introduction

A race condition occurs when an asynchronous operation (like a fetch request) completes in a different order than it was started. In React, this typically happens when the user changes a filter or navigates between items faster than the server responds — a previous request's response arrives **after** a newer one, overwriting the correct data.

---

## The Problem

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data)); // Race condition!
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

**The bug:** If the user switches from userId=1 to userId=2 quickly:
1. Fetch for userId=1 starts.
2. Fetch for userId=2 starts.
3. Fetch for userId=2 completes — `setUser(user2)` runs.
4. Fetch for userId=1 completes — `setUser(user1)` runs. **Wrong!** User sees user 1's data even though the URL shows user 2.

---

## The Solution: AbortController

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => {
        // Ignore abort errors — they're intentional
        if (err.name !== 'AbortError') {
          console.error('Fetch failed:', err);
        }
      });

    // Abort the previous fetch when userId changes
    return () => controller.abort();
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

**How it works:** When `userId` changes, the cleanup function calls `controller.abort()`, cancelling the in-flight request. The `.catch` handler ignores `AbortError` (which is thrown when a request is aborted), so the stale response never calls `setUser`.

---

## Production Pattern: useFetch Hook

```jsx
import { useState, useEffect, useRef } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef(new Map());

  useEffect(() => {
    if (!url) return;

    // Check cache first
    if (cache.current.has(url)) {
      setData(cache.current.get(url));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          cache.current.set(url, data);
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled && err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    // Two layers of protection: AbortController + cancelled flag
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
```

---

## Alternative: Ignoring Stale Responses with a Flag

```jsx
useEffect(() => {
  let ignore = false; // Local flag — unique to this effect instance

  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (!ignore) {
        setUser(data); // Only update if this effect instance is still active
      }
    });

  return () => {
    ignore = true; // Mark this effect instance as stale
  };
}, [userId]);
```

**Note:** The `ignore` flag prevents `setUser` from running on stale responses, but the fetch still completes (consuming bandwidth). `AbortController` actually cancels the network request, which is more efficient.

---

## Summary

- Race conditions happen when a slower previous response overwrites a faster newer one.
- Use `AbortController` to cancel in-flight requests when the component unmounts or dependencies change.
- Use the `ignore` flag as a simpler alternative when you can't abort (e.g., non-fetch async operations).
- In production, combine `AbortController` with caching to prevent redundant fetches.

## Related Topics

- [useEffect Overview](index)
- [Cleanup Functions](cleanup-functions)
- [Common Mistakes](common-mistakes)

## Further Reading

- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [React Docs: Fetching Data with Effects](https://react.dev/learn/you-might-not-need-an-effect#fetching-data)
