---
title: POST, PUT, DELETE
description: Sending data with different HTTP methods
sidebar:
  order: 2
---

# POST, PUT, DELETE

## Introduction

Fetch supports all HTTP methods via the `method` option. You send data using the `body` option.

## POST — Create

```javascript
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'Alice',
    email: 'alice@email.com'
  })
});

const newUser = await response.json();
```

## PUT — Update

```javascript
await fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Updated Name' })
});
```

## DELETE — Remove

```javascript
const response = await fetch('/api/users/1', { method: 'DELETE' });
if (response.ok) console.log('User deleted');
```

## Summary

- Set `method` for POST, PUT, DELETE
- Use `JSON.stringify()` for JSON body
- Set `Content-Type: application/json` header
- Always handle the response status

## Further Reading

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
