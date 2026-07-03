---
title: URL Properties
description: Accessing parts of the URL
sidebar:
  order: 1
---

# URL Properties

## Introduction

The `location` object provides properties to access every part of the current URL.

## URL Parts

```javascript
// For URL: http://example.com:8080/path/page?q=js#section

location.href;       // 'http://example.com:8080/path/page?q=js#section'
location.protocol;   // 'http:'
location.host;       // 'example.com:8080'
location.hostname;   // 'example.com'
location.port;       // '8080'
location.pathname;   // '/path/page'
location.search;     // '?q=js'
location.hash;       // '#section'
location.origin;     // 'http://example.com:8080'
```

## Modifying URL Parts

```javascript
// Changing location properties navigates to the new URL
location.hash = '#new-section';    // Scrolls to #new-section without reload
location.search = '?q=new-search'; // Reloads with new query string
```

## Summary

| Property | Example | Description |
|----------|---------|-------------|
| `href` | Full URL | Complete URL string |
| `protocol` | `http:` | Protocol with colon |
| `host` | `example.com:8080` | Hostname + port |
| `pathname` | `/path/page` | Path after host |
| `search` | `?q=js` | Query string |
| `hash` | `#section` | Fragment identifier |

## Further Reading

- [MDN: Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)
