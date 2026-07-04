---
title: sessionStorage
description: Session-scoped browser storage
sidebar:
  order: 2
---

# sessionStorage

## Introduction

`sessionStorage` stores data for the duration of a page session. Data is cleared when the tab or browser is closed.

## Basic Usage

```javascript
// Same API as localStorage, but cleared on tab close
sessionStorage.setItem('tabState', JSON.stringify({ scrollPosition: 150 }));
const state = JSON.parse(sessionStorage.getItem('tabState'));
```

## localStorage vs sessionStorage

| Feature | localStorage | sessionStorage |
|---------|-------------|----------------|
| Persistence | Until explicitly cleared | Until tab closes |
| Scope | All tabs of same origin | Current tab only |
| Storage limit | ~5-10MB | ~5-10MB |
| Sent to server | No | No |

## When to Use

- Temporary form state (user refreshes → data preserved)
- Tab-specific preferences
- Multi-step wizard progress
- Shopping cart for the current session

## Summary

- Same API as localStorage
- Data persists only for the current browser tab
- Cleared when tab/window is closed
- Use for temporary, tab-specific data

## Further Reading

- [MDN: sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
