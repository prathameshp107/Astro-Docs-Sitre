---
title: Default Exports
description: Default exports in JavaScript modules — one main export per module
sidebar:
  order: 2
---

# Default Exports

## Introduction

A **default export** is the **main export** of a module. Each module can have at most one default export. When importing, you can name it anything.

## Exporting Default

```javascript
// 📁 User.js
export default class User {
  constructor(name) { this.name = name; }
}

// 📁 format.js
export default function formatDate(date) {
  return date.toISOString();
}

// 📁 config.js
export default {
  theme: 'dark',
  lang: 'en'
};
```

## Importing Default

```javascript
// You can name the import anything you want
import User from './User.js';
import format from './format.js';
import settings from './config.js';

console.log(settings.theme); // 'dark'
```

## Combining Named and Default

```javascript
// 📁 user.js
export default class User {
  constructor(name) { this.name = name; }
}
export function formatName(user) {
  return user.name.toUpperCase();
}

// 📁 main.js
import User, { formatName } from './user.js';

const user = new User('Alice');
console.log(formatName(user)); // 'ALICE'
```

## Default vs Named

| Feature | Default Export | Named Export |
|---------|--------------|--------------|
| Per module | 1 | Unlimited |
| Import name | Any name | Must match export |
| Syntax | `export default` | `export const` / `export function` |
| Re-export | `export { default as X }` | `export { X }` |

## Summary

- Use default exports for the main exported value
- Import name can be anything
- Combine with named exports when needed
- Good for: classes, main functions, single object configs

## Further Reading

- [MDN: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Previous: Named Exports](./named-exports)
- [Next: Dynamic Import](./dynamic-import)
