---
title: "Modules"
description: "export (named + default), import, dynamic import(), module scope, ESM vs CommonJS, and why modules matter."
sidebar:
  order: 22
---

## Modules

Modules let you split code into separate files, each with its own scope. Before ES modules, JavaScript had no built-in module system.

### Named Exports

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
```

```javascript
// main.js
import { PI, add, subtract } from "./math.js";

console.log(add(PI, 2)); // 5.14159
```

You can also export after declaration:

```javascript
const PI = 3.14159;
function add(a, b) { return a + b; }
export { PI, add };
```

### Default Export

Each module can have one default export.

```javascript
// calculator.js
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}
```

```javascript
// main.js — default imports can be named anything
import Calculator from "./calculator.js";
// or rename named imports
import { default as Calc } from "./calculator.js";
```

### Mixed Exports

```javascript
// shapes.js
export default class Circle { /* ... */ }
export class Square { /* ... */ }
export const TAU = 6.28318;
```

```javascript
import Circle, { Square, TAU } from "./shapes.js";
```

### Namespace Import

Import everything as a single object.

```javascript
import * as math from "./math.js";
math.add(1, 2); // 3
math.PI;        // 3.14159
```

### Dynamic `import()`

Load modules on demand (returns a Promise).

```javascript
// Lazy load when needed
const button = document.querySelector("#load");
button.addEventListener("click", async () => {
  const { format } = await import("./date-utils.js");
  console.log(format(new Date()));
});

// Conditional import
if (isAdmin) {
  const { AdminPanel } = await import("./admin.js");
}
```

### Module Scope

Each module has its own top-level scope. Variables declared in a module are **not** global.

```javascript
// utils.js
const privateVar = "only visible in this file";
export const publicVar = "visible to importers";
```

### ESM vs CommonJS

| Feature | ESM (ES Modules) | CommonJS (CJS) |
|---|---|---|
| Syntax | `import` / `export` | `require()` / `module.exports` |
| Loading | Asynchronous | Synchronous |
| Analysis | Static (at parse time) | Dynamic (at runtime) |
| Tree-shaking | ✅ Supported | ❌ Not supported |
| Top-level `await` | ✅ Supported | ❌ Not supported |
| File extension | `.mjs` or `"type": "module"` | `.cjs` or default |

```javascript
// CommonJS (Node.js default without "type": "module")
const fs = require("fs");
const { add } = require("./math.js");
module.exports = { add };
```

### Why Modules?

- **Encapsulation** — variables stay scoped to the file
- **Reusability** — import/export across files
- **Dependency management** — explicit imports make dependencies clear
- **Tree-shaking** — bundlers remove unused exports
- **Lazy loading** — `import()` loads code on demand

### Key Takeaways

- Named exports require matching names; default exports can be renamed on import
- Dynamic `import()` is a function that returns a Promise — use it for lazy loading
- ESM is the standard; CommonJS is Node.js legacy
- Modules provide encapsulation — each file gets its own scope
- Use `import * as ns` to import everything as a namespace object
- Static analysis enables tree-shaking and better optimization
