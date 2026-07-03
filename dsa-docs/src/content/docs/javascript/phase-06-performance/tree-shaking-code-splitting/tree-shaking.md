---
title: Tree Shaking
description: Dead code elimination with ES modules
sidebar:
  order: 1
---

# Tree Shaking

## Introduction

**Tree shaking** is dead code elimination — it removes unused exports from JavaScript bundles. The name comes from the idea of shaking a tree to remove dead leaves.

## How It Works

Tree shaking relies on ES module's **static structure** — imports and exports are known at compile time, not runtime.

```javascript
// 📁 utils.js
export function used() { return 'used'; }
export function unused() { return 'never used'; }

// 📁 main.js
import { used } from './utils.js';
// 'unused' is removed during tree shaking 🎯
```

## Best Practices

```javascript
// ✅ ES modules (static analyzable)
export const value = 42;
export function add(a, b) { return a + b; }

// ❌ CommonJS (cannot be tree-shaken)
module.exports = { value: 42 };

// ✅ Import only what you need
import { map, filter } from 'lodash-es';

// ❌ Importing the whole library
import _ from 'lodash'; // Can't tree-shake

// ✅ Named exports for better tree shaking
export const PI = 3.14;
export function circumference(r) { return 2 * PI * r; }

// ❌ Default exports can be harder to tree-shake
export default { PI, circumference };
```

## sideEffects Flag

In your `package.json`, mark modules as side-effect free:

```json
{
  "sideEffects": false
}
```

Or specify files with side effects:

```json
{
  "sideEffects": [
    "*.css",
    "src/polyfills.js"
  ]
}
```

## Summary

| Practice | Benefit |
|----------|---------|
| Use ES modules | Enables tree shaking |
| Named exports | Better optimization |
| Import specific symbols | More dead code removed |
| `sideEffects: false` | Aggressive elimination |
| Avoid CommonJS | Cannot be tree-shaken |

## Further Reading

- [Webpack: Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
