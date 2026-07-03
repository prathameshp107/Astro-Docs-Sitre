---
title: Await Keyword
description: Pausing execution until a promise resolves
sidebar:
  order: 2
---

# Await Keyword

## Introduction

The `await` keyword pauses the execution of an async function until a Promise settles. It can only be used inside `async` functions.

## Basic Usage

```javascript
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();
  return user;
}

// Same as:
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json());
}
```

## Await vs .then()

```javascript
// .then() style
function loadUser() {
  return fetch('/api/user')
    .then(r => r.json())
    .then(user => fetch(`/api/posts/${user.id}`))
    .then(r => r.json());
}

// async/await style (more readable)
async function loadUser() {
  const response = await fetch('/api/user');
  const user = await response.json();
  const postsResponse = await fetch(`/api/posts/${user.id}`);
  return postsResponse.json();
}
```

## Summary

- `await` pauses execution until the Promise resolves
- Only usable inside `async` functions
- Returns the resolved value of the Promise
- Makes async code read like synchronous code

## Further Reading

- [MDN: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
