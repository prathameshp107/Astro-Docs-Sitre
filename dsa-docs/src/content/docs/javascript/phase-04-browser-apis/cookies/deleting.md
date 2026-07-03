---
title: Deleting Cookies
description: Removing cookies by setting them to expire
sidebar:
  order: 3
---

# Deleting Cookies

## Introduction

Delete a cookie by setting its expiration to a past date or `max-age=0`.

## How to Delete

```javascript
// Set max-age to 0 or use a past date
document.cookie = 'session=; max-age=0; path=/';

// Alternative: set expires to a past date
document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
```

## Important: Match the Path

```javascript
// Cookies are identified by name + path + domain
// To delete, you must match the same path and domain

// Set at path=/
document.cookie = 'session=abc123; path=/';

// Delete with same path
document.cookie = 'session=; max-age=0; path=/';

// If set at path=/app, you must delete at path=/app
document.cookie = 'session=; max-age=0; path=/app';
```

## Summary

- Set `max-age=0` or use a past `expires` date
- Must match the cookie's original path and domain
- `document.cookie = 'key=; max-age=0'` removes a cookie
- Deleting all cookies at once requires iterating and matching

## Further Reading

- [MDN: document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
