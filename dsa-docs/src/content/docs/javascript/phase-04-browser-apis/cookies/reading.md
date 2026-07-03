---
title: Reading Cookies
description: Accessing cookies with document.cookie
sidebar:
  order: 1
---

# Reading Cookies

## Introduction

`document.cookie` returns all cookies as a single string. You need to parse it to access individual values.

## Basic Reading

```javascript
// document.cookie returns all cookies as a single string
console.log(document.cookie);
// "theme=dark; session=abc123"

// Parse cookies into an object
function getCookies() {
  return Object.fromEntries(
    document.cookie.split('; ').map(c => {
      const [key, ...val] = c.split('=');
      return [key, val.join('=')];
    })
  );
}

console.log(getCookies().theme); // 'dark'
```

## Getting a Single Cookie

```javascript
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

console.log(getCookie('session')); // 'abc123'
```

## Summary

- `document.cookie` returns all cookies as a string
- Parse manually or use a helper function
- Cookies are separated by `; `
- Format: `key=value; key2=value2`

## Further Reading

- [MDN: document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
