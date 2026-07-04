---
title: GET Requests
description: Making GET requests with fetch
sidebar:
  order: 1
---

# GET Requests

## Introduction

GET requests retrieve data from a server. The Fetch API makes GET requests by default.

## Basic GET

```javascript
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## With Async/Await

```javascript
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
```

## With Query Parameters

```javascript
function searchUsers(query, page = 1) {
  const params = new URLSearchParams({ q: query, page });
  return fetch(`/api/users?${params}`).then(r => r.json());
}

searchUsers('alice', 2).then(users => console.log(users));
```

## Summary

- GET is the default fetch method
- Always check `response.ok` for HTTP errors
- Use `URLSearchParams` for query parameters
- Network errors throw TypeError (not HTTP errors)

## Further Reading

- [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
