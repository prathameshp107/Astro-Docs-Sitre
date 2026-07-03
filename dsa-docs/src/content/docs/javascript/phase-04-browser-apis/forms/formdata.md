---
title: FormData API
description: Accessing form values programmatically
sidebar:
  order: 2
---

# FormData API

## Introduction

The `FormData` API provides an easy way to access form field values without querying each input individually.

## Basic Usage

```javascript
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  // Access values
  formData.get('username');       // Single value
  formData.getAll('hobbies');     // Multiple values (checkboxes)
  formData.has('email');          // Check if field exists

  // Iterate
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
});
```

## Sending as JSON

```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const plainData = Object.fromEntries(formData);

  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plainData)
  });
});
```

## Adding Extra Data

```javascript
const formData = new FormData(form);
formData.append('timestamp', Date.now().toString());
formData.append('userId', '123');
// These extra fields are sent alongside the form fields
```

## Summary

- `new FormData(form)` captures all form fields
- `get()` for single values, `getAll()` for multiple
- `has()` to check field existence
- `Object.fromEntries(formData)` converts to plain object
- `append()` to add extra data

## Further Reading

- [MDN: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
