---
title: Top-Level Await
description: Using await outside async functions in modules
sidebar:
  order: 5
---

# Top-Level Await

## Introduction

Top-level await allows you to use `await` at the top level of modules without wrapping it in an `async` function.

## Basic Usage

```javascript
// In a module — no async function needed!
const response = await fetch('/api/config');
const config = await response.json();
console.log(config);
```

## Practical Example

```javascript
// config.js
export const config = await fetch('/api/config').then(r => r.json());
// Module waits for this to resolve before its imports resolve

// main.js
import { config } from './config.js';
console.log(config); // Already loaded!
```

## Important Notes

- Only works in ES modules (not classic scripts)
- Blocks the module's execution (not the entire app)
- Other modules importing this module will wait
- Use with care — it delays module evaluation

## Summary

- `await` at the top level of modules
- No `async` wrapper needed
- Only in ES modules
- Blocks the importing module chain

## Further Reading

- [MDN: Top-level await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)
