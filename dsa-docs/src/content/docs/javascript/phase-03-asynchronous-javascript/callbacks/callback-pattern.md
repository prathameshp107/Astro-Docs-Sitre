---
title: Callback Pattern
description: How callback functions enable async operations in JavaScript
sidebar:
  order: 1
---

# Callback Pattern

## Introduction

A **callback** is a function passed as an argument to another function to be executed later. Callbacks were the original async pattern in JavaScript.

## Why Do We Need This?

Callbacks allow you to specify "what happens next" after an async operation completes. They're the foundation of all async patterns in JavaScript.

## Basic Callback

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('Data received');
  }, 1000);
}

fetchData((result) => {
  console.log(result); // 'Data received' (after 1 second)
});
```

## Synchronous vs Asynchronous Callbacks

```javascript
// Synchronous callback (executed immediately)
[1, 2, 3].forEach(n => console.log(n));

// Asynchronous callback (executed later)
setTimeout(() => console.log('Later'), 1000);
```

## Anonymous vs Named Callbacks

```javascript
// Anonymous callback
button.addEventListener('click', () => {
  console.log('Clicked!');
});

// Named callback (reusable, better for debugging)
function handleClick() {
  console.log('Clicked!');
}
button.addEventListener('click', handleClick);
```

## Summary

- Callbacks are functions passed to other functions for later execution
- Foundation of all async patterns in JavaScript
- Can be synchronous (forEach) or asynchronous (setTimeout)
- Named callbacks are easier to debug and reuse

## Further Reading

- [MDN: Callback Function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
