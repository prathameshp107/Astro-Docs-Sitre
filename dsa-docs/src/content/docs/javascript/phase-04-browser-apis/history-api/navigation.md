---
title: Navigation
description: Using back, forward, and go methods
sidebar:
  order: 1
---

# Navigation

## Introduction

The History API provides methods to navigate through the browser's session history.

## Basic Navigation

```javascript
// Go back one page
history.back();

// Go forward one page
history.forward();

// Go back/forward by a number of steps
history.go(-2); // Go back 2 pages
history.go(1);  // Go forward 1 page
history.go(0);  // Reload current page
```

## Current State

```javascript
console.log(history.length); // Number of entries in session history
```

## Summary

- `history.back()` — navigate to previous page
- `history.forward()` — navigate to next page
- `history.go(n)` — navigate n steps (negative = back, positive = forward)
- `history.length` — number of history entries

## Further Reading

- [MDN: History](https://developer.mozilla.org/en-US/docs/Web/API/History)
