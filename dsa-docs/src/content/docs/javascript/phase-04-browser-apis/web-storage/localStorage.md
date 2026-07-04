---
title: localStorage
description: Persistent browser storage across sessions
sidebar:
  order: 1
---

# localStorage

## Introduction

`localStorage` stores data that persists even after the browser is closed and reopened. Data remains until explicitly cleared.

## Basic Usage

```javascript
// Store
localStorage.setItem('theme', 'dark');
localStorage.setItem('user', JSON.stringify({ name: 'Alice', id: 1 }));

// Retrieve
const theme = localStorage.getItem('theme'); // 'dark'
const user = JSON.parse(localStorage.getItem('user')); // { name: 'Alice', id: 1 }

// Remove
localStorage.removeItem('theme');

// Clear all
localStorage.clear();

// Length
console.log(localStorage.length); // Number of stored items
```

## Important: JSON Serialization

```javascript
// localStorage stores strings only — use JSON for objects/arrays
const settings = { fontSize: 14, theme: 'dark' };

// Store
localStorage.setItem('settings', JSON.stringify(settings));

// Retrieve
const saved = JSON.parse(localStorage.getItem('settings'));
console.log(saved.fontSize); // 14
```

## Summary

- Data persists until explicitly cleared
- ~5-10MB storage limit per origin
- Strings only — use JSON.stringify/parse for objects
- Synchronous API (can block main thread for large data)

## Further Reading

- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
