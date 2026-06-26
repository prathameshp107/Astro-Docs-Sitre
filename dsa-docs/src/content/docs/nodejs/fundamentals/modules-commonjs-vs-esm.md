---
title: "Modules: CommonJS vs ESM"
description: "require/module.exports vs import/export, 'type': 'module', interop between CommonJS and ES Modules, and when to use each."
sidebar:
  order: 4
---

## Modules: CommonJS vs ESM

Node.js supports two module systems: **CommonJS** (CJS, the original) and **ES Modules** (ESM, the modern standard).

### CommonJS (CJS)

CommonJS uses `require()` to import and `module.exports` to export. It's the default in Node.js for `.js` files.

```javascript
// 📁 math.js
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

module.exports = { add, multiply };
// or: exports.add = add;
```

```javascript
// 📁 app.js
const math = require('./math.js');
console.log(math.add(5, 3)); // 8

// Destructure on import
const { add, multiply } = require('./math.js');
```

### ES Modules (ESM)

ESM uses `import` and `export`. It's the standard for modern JavaScript and browsers.

```javascript
// 📁 math.mjs (or "type": "module" in package.json)
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// Default export
export default class Calculator {
  add(a, b) { return a + b; }
}
```

```javascript
// 📁 app.mjs
import Calculator, { add, multiply } from './math.mjs';

console.log(add(5, 3)); // 8
```

### Enabling ESM in Node.js

```json
// package.json
{
  "type": "module"  // All .js files are treated as ESM
}
```

Without `"type": "module"`:
- `.js` files → CommonJS
- `.mjs` files → ESM
- `.cjs` files → CommonJS (always)

### Key Differences

| Feature | CommonJS | ES Modules |
|---|---|---|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | **Synchronous** | **Asynchronous** |
| Time | Runtime (dynamic) | Parse time (static) |
| Top-level `await` | ❌ Not supported | ✅ Supported |
| Tree-shaking | ❌ Not supported | ✅ Supported |
| Default in Node.js | ✅ Yes (no `"type"`) | ❌ Needs `.mjs` or `"type": "module"` |
| Dynamic imports | `require()` anywhere | `import()` function |
| `__dirname` | ✅ Available | ❌ Use `import.meta.url` |
| `require.resolve` | ✅ Available | ❌ Not available |

### Dynamic `import()`

ESM's `import()` function works in both CJS and ESM:

```javascript
// Works in CommonJS too!
async function loadModule() {
  const { format } = await import('date-fns');
  return format(new Date(), 'yyyy-MM-dd');
}

// Conditional loading
if (isAdmin) {
  const { AdminPanel } = await import('./admin-panel.js');
}
```

### Interop: CJS ↔ ESM

**Importing CJS from ESM:**

```javascript
// ESM file
import fs from 'fs';               // default import
import { readFile } from 'fs';     // named import from CJS

// CJS default export becomes the default import
import myLib from 'my-lib';
```

**Importing ESM from CJS:**

```javascript
// CJS file — use dynamic import()
async function loadESM() {
  const esmModule = await import('./esm-file.mjs');
  console.log(esmModule.default);
}
```

> `require()` **cannot** load ESM modules. Use `import()` instead.

### `__dirname` Equivalent in ESM

```javascript
// CommonJS — has __dirname
const path = require('path');
console.log(__dirname); // /Users/alice/project/src

// ESM — use import.meta.url
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

### When to Use Each

| Scenario | Recommendation |
|---|---|
| New Node.js projects | **ESM** — use `"type": "module"` |
| Libraries published to npm | **ESM** (with CJS fallback for older consumers) |
| Legacy codebases | **CJS** — stick with what works |
| Browser code | **ESM** — browsers only support ESM |
| Quick scripts | **CJS** — simpler, no config needed |
| Mixed project | Use `.mjs`/`.cjs` extensions for explicit control |

### 🚨 Common Gotchas

```javascript
// ❌ require() cannot import ESM
const myModule = require('./esm-module.mjs'); // Error!

// ✅ Use dynamic import instead
const myModule = await import('./esm-module.mjs');

// ❌ Missing file extension in require()
const data = require('./data'); // Node.js tries .js, .json, .node

// ✅ Always include extensions in ESM imports
import data from './data.js'; // Required in ESM!

// ❌ Circular dependencies — CJS can get partial exports
// CJS returns the current exports object at the time of require
```

### Key Takeaways

- **CJS** uses `require()` / `module.exports` — synchronous, runtime, default in Node.js
- **ESM** uses `import` / `export` — asynchronous, static, modern standard
- Enable ESM with `"type": "module"` in `package.json` or use `.mjs` extension
- Use dynamic `import()` to load ESM from CJS code
- ESM supports tree-shaking, top-level `await`, and static analysis
- For new projects, start with ESM — it's the future of JavaScript
