---
title: Limitations
description: What Web Workers can and cannot access
sidebar:
  order: 3
---

# Limitations

## Introduction

Web Workers run in a separate thread with restricted access to browser APIs.

## What Workers Cannot Access

```javascript
// ❌ Cannot access:
// - DOM (document, window)
// - Parent object
// - Most browser APIs (localStorage, etc.)
// - The main thread's variables or functions
```

## What Workers Can Access

```javascript
// ✅ Can access:
// - navigator (limited info)
// - setTimeout, setInterval
// - XMLHttpRequest, fetch
// - WebSockets
// - IndexedDB
// - importScripts() for loading external libraries
```

## Loading Libraries

```javascript
// importScripts() loads external scripts synchronously
importScripts('lodash.js');
importScripts('math.js', 'validator.js'); // Multiple files

// Now you can use the loaded libraries
const result = _.chunk(array, 2);
```

## Summary

- No DOM access (document, window, parent)
- Can use fetch, WebSockets, IndexedDB
- Load libraries with `importScripts()`
- Workers are isolated from the main thread's scope

## Further Reading

- [MDN: Worker limitations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)
