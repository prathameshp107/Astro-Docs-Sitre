---
title: Returning Promises
description: How to return promises from within .then() handlers
sidebar:
  order: 3
---

# Returning Promises

## Introduction

When you return a promise from a `.then()` handler, the chain waits for it to resolve before continuing. This flattens nested async operations.

## Flattening Nested Operations

```javascript
// ❌ Nesting (like callbacks)
fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    fetch(`/api/posts/${user.id}`)
      .then(response => response.json())
      .then(posts => {
        console.log(posts);
      });
  });

// ✅ Chaining (flat)
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts));
```

## Practical Example

```javascript
function getUser(id) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

function getPosts(userId) {
  return fetch(`/api/users/${userId}/posts`).then(r => r.json());
}

getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => console.log('User posts:', posts))
  .catch(err => console.error(err));
```

## Summary

- Return a promise from `.then()` to wait for it to resolve
- This flattens nested async operations into a chain
- The next `.then()` receives the resolved value
- Errors in the returned promise propagate to the chain's `.catch()`

## Further Reading

- [MDN: Promise Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining)
