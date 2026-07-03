---
title: Named Exports
description: Exporting and importing named values from JavaScript modules
sidebar:
  order: 1
---

# Named Exports

## Introduction

**Named exports** let you export multiple values from a module. Each exported value has a specific name that must match when importing.

## Exporting

```javascript
// 📁 utils.js

// Inline export
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class Calculator {}

// Or export at the end
const PI = 3.14159;
function add(a, b) { return a + b; }
class Calculator {}
export { PI, add, Calculator };
```

## Importing

```javascript
// 📁 main.js
import { PI, add } from './utils.js';
console.log(add(PI, 2)); // 5.14159
```

## Import All

```javascript
import * as Utils from './utils.js';
console.log(Utils.add(1, 2)); // 3
console.log(Utils.PI);        // 3.14159
Utils.Calculator;             // class
```

## Renaming

```javascript
// Rename on export
export { add as sum, PI as pi };

// Rename on import
import { add as sum, PI as pi } from './utils.js';
console.log(sum(1, 2)); // 3
```

## Multiple Named Exports

```javascript
// 📁 helpers.js
export const formatDate = (date) => date.toISOString();
export const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
export const formatPhone = (phone) => phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
```

## Re-exporting (Barrel Files)

```javascript
// 📁 index.js — barrel file
export { User } from './user.js';
export { formatDate } from './helpers.js';
export { API_BASE_URL } from './constants.js';

// Then import from the barrel:
// import { User, formatDate } from './index.js';
```

## Summary

- Named exports export multiple values with specific names
- Import with exact names or `import * as`
- Use `as` for renaming
- Barrel files re-export for cleaner imports

## Further Reading

- [MDN: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Next: Default Exports](./default-exports)
