---
title: Writing Cookies
description: Setting cookies with options
sidebar:
  order: 2
---

# Writing Cookies

## Introduction

Set cookies by assigning to `document.cookie`. Each assignment creates or updates a single cookie.

## Basic Writing

```javascript
// Set a cookie (key=value)
document.cookie = 'theme=dark';
```

## Cookie Options

```javascript
document.cookie = 'session=abc123; path=/; max-age=86400; Secure; SameSite=Strict';

// Options:
// path=/       — Available on all paths
// max-age=86400 — Expires in 24 hours (seconds)
// Secure       — Only over HTTPS
// SameSite=Strict — Block cross-site requests
// domain=.example.com — Share with subdomains
```

## Using Expires

```javascript
// Set expiration date
const expires = new Date();
expires.setDate(expires.getDate() + 7); // 7 days from now
document.cookie = `premium=true; expires=${expires.toUTCString()}; path=/`;
```

## Summary

- `document.cookie = 'key=value'` sets a cookie
- Append options after the value: `; path=/; max-age=86400`
- `Secure` flag restricts to HTTPS only
- `SameSite=Strict` prevents CSRF attacks
- `max-age` sets expiration in seconds

## Further Reading

- [MDN: document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
