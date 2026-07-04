---
title: Error Handling
description: Proper error handling with fetch
sidebar:
  order: 4
---

# Error Handling

## Introduction

Fetch only rejects on network errors, not HTTP errors. You must check `response.ok` for HTTP error status codes.

## The Key Difference

```javascript
// ❌ This only catches NETWORK errors
try {
  const response = await fetch('/api/not-found'); // 404
  // No error thrown for 404!
} catch (error) {
  // Only catches network failures
}

// ✅ You must check response.ok
const response = await fetch('/api/not-found');
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
```

## Complete Error Handler

```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('Network error (no internet, CORS, etc.):', error);
    } else {
      console.error('Request failed:', error);
    }
    throw error;
  }
}
```

## Summary

- Fetch only rejects on network errors
- Check `response.ok` for HTTP errors (4xx, 5xx)
- Network errors throw `TypeError`
- Always handle both error types

## Further Reading

- [MDN: Fetch error handling](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful)
