---
title: ESM vs CommonJS
description: Differences between ES Modules and CommonJS in JavaScript
sidebar:
  order: 4
---

# ESM vs CommonJS

## Introduction

**ES Modules (ESM)** is JavaScript's official module system. **CommonJS** is the module system used by Node.js before ESM. Understanding the differences is important for working with both environments.

## Key Differences

| Feature | ESM | CommonJS |
|---------|-----|----------|
| Syntax | `import` / `export` | `require()` / `module.exports` |
| Loading | Static (parse time) | Dynamic (runtime) |
| Scope | Module scope | Module scope |
| Strict mode | Always | Optional |
| `this` at top level | `undefined` | `exports` object |
| Top-level await | ✅ Yes | ❌ No |
| File extensions | Required (.js, .mjs) | Optional |

## Syntax Comparison

```javascript
// ESM — export
export const greet = () => 'Hello';
export default class User {}

// CommonJS — export
module.exports.greet = () => 'Hello';
module.exports = class User {};

// ESM — import
import User, { greet } from './user.js';

// CommonJS — import
const User = require('./user');
const { greet } = require('./user');
```

## Static vs Dynamic

```javascript
// ESM — static (analyzed at parse time)
import { something } from './module.js'; // must be at top level

// CommonJS — dynamic (can be conditional)
if (condition) {
  const module = require('./module.js'); // ✅ works
}

// ESM — dynamic import for runtime loading
if (condition) {
  const module = await import('./module.js'); // ✅
}
```

## Circular Dependencies

CommonJS handles circular dependencies by returning the partially built `module.exports`. ESM handles them better due to live bindings:

```javascript
// ESM: imports are live read-only bindings to the exporting module
// Even with circular deps, you always get the latest value

// CommonJS: imports are copies at require time
// Circular deps can get undefined if accessed too early
```

## File Extensions

```javascript
// ESM — must include extension (in browsers, Node.js)
import { greet } from './utils.js'; // ✅
import { greet } from './utils';    // ❌ in browsers

// CommonJS — extension optional
const { greet } = require('./utils'); // ✅
const { greet } = require('./utils.js'); // ✅
```

## Using Both

```javascript
// Package.json allows mixing with "type" field
{
  "type": "module",     // .js files treated as ESM
  "exports": {
    "import": "./src/index.js",   // ESM consumers
    "require": "./dist/index.js"  // CommonJS consumers
  }
}
```

## Summary

| Aspect | ESM | CommonJS |
|--------|-----|----------|
| Standard | Official JavaScript spec | Node.js convention |
| Syntax | `import` / `export` | `require` / `module.exports` |
| Loading | Static (faster) | Dynamic (flexible) |
| Top-level await | ✅ | ❌ |
| Browser support | ✅ Native | ❌ (needs bundler) |
| File extension | Required | Optional |

## Further Reading

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Node.js: ESM docs](https://nodejs.org/api/esm.html)
- [Previous: Dynamic Import](./dynamic-import)
