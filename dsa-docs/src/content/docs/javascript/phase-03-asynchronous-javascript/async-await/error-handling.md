---
title: Error Handling
description: Handling errors with try/catch in async functions
sidebar:
  order: 3
---

# Error Handling

## Introduction

With async/await, error handling uses the familiar `try/catch` syntax instead of `.catch()` on promises.

## Basic Try/Catch

```javascript
async function loadData() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return comments;
  } catch (error) {
    console.error('Something went wrong:', error);
    return []; // Default value on error
  }
}
```

## Multiple Catch Blocks

```javascript
async function robustLoad() {
  try {
    return await fetch('/api/data').then(r => r.json());
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
      return null;
    }
    if (error instanceof TypeError) {
      console.log('Network error — using cache');
      return loadFromCache();
    }
    // Generic error
    console.error('Unexpected error:', error);
    throw error; // Re-throw if we can't handle it
  }
}
```

## Without try/catch

```javascript
// .catch() also works with async/await
async function load() {
  const data = await fetch('/api/data')
    .then(r => r.json())
    .catch(err => {
      console.error(err);
      return null;
    });
  return data;
}
```

## Summary

- Use `try/catch` for sync-style error handling
- Multiple catch blocks for different error types
- Can mix `.catch()` with `await` for hybrid approach
- Always handle errors in async functions

## Further Reading

- [MDN: try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
