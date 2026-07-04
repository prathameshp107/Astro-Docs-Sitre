---
title: Response Methods
description: Parsing different response formats with fetch
sidebar:
  order: 3
---

# Response Methods

## Introduction

The Response object provides several methods to parse the response body in different formats.

## Available Methods

```javascript
const response = await fetch('/api/data');

response.json();        // Parse as JSON
response.text();        // Parse as plain text
response.blob();        // Parse as binary blob (images, files)
response.formData();    // Parse as FormData
response.arrayBuffer(); // Parse as ArrayBuffer

// Response properties
response.status;       // 200, 404, 500, etc.
response.ok;           // true if status 200-299
response.headers;      // Headers object
response.url;          // The response URL
```

## Practical Examples

```javascript
// JSON API
const user = await fetch('/api/user/1').then(r => r.json());

// HTML or text
const html = await fetch('/template.html').then(r => r.text());

// Image
const blob = await fetch('/image.png').then(r => r.blob());
const imgUrl = URL.createObjectURL(blob);
```

## Summary

- `response.json()` — JSON data
- `response.text()` — Plain text/HTML
- `response.blob()` — Binary data (images, files)
- `response.ok` — Check for HTTP success (200-299)
- Methods can only be called once (body is consumed)

## Further Reading

- [MDN: Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
