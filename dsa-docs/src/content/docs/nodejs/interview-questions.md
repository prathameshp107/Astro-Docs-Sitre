---
title: "Node.js Interview Questions"
description: "150+ Node.js interview questions from beginner to advanced with hidden answers."
sidebar:
  order: 999
  label: "Interview Questions (150+)"
---

> **How to use:** Click any question to expand the answer.

---

## 🟢 Easy (Q1–Q50)

<details class="qa-card qa-easy">
<summary>
Q1. What is Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Node.js is an **open-source, cross-platform JavaScript runtime environment** built on Chrome's V8 JavaScript engine. It allows JavaScript to run **outside the browser** — on servers, desktops, and IoT devices.

Created by **Ryan Dahl** in 2009, Node.js uses an **event-driven, non-blocking I/O model** that makes it lightweight and efficient for data-intensive real-time applications.

```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Node.js!');
});
server.listen(3000);
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. Why would you choose Node.js for a project?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Good fits for Node.js:**
- Real-time applications (chat, live updates, gaming)
- REST APIs and microservices
- Data streaming (video, audio)
- Serverless functions
- CLI tools and build scripts
- Web scraping and automation

**Not ideal for:**
- CPU-intensive applications (image processing, video encoding)
- Heavy computation tasks (use Worker Threads or microservices instead)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What are the key features of Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | Benefit |
|---------|---------|
| **Asynchronous & Event-Driven** | Non-blocking I/O handles thousands of concurrent connections |
| **Single-Threaded** | Simple programming model (no thread management) |
| **Fast Execution** | Built on V8 JavaScript engine |
| **npm Ecosystem** | Largest package registry (2M+ packages) |
| **Cross-Platform** | Windows, macOS, Linux |
| **Streaming** | Process data chunk-by-chunk instead of buffering |
| **Scalable** | Clustering, Worker Threads, microservices |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What are the advantages and disadvantages of Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Advantages:**
- **Fast** — V8 engine JIT compilation, non-blocking I/O
- **Scalable** — Handles many concurrent connections efficiently
- **JavaScript everywhere** — Full-stack with the same language
- **Rich ecosystem** — npm provides millions of packages
- **Real-time capable** — Built for WebSocket and streaming applications
- **Strong community** — Extensive resources, tools, and frameworks

**Disadvantages:**
- **CPU-intensive tasks** — Single-threaded model blocks the event loop
- **Callback complexity** — Async patterns can be confusing (mitigated by Promises/async-await)
- **Immature tooling** — Some areas have less mature tooling compared to established ecosystems
- **NPM quality** — Package quality varies widely
- **Debugging** — Async debugging can be challenging

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. What is the Node.js architecture?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Node.js architecture consists of:

1. **V8 Engine** — Compiles and executes JavaScript
2. **Libuv** — C library providing the event loop, thread pool, async I/O
3. **C/C++ Bindings** — Bridge between JS and native code
4. **Core Modules** — Built-in modules (fs, http, path, etc.)
5. **npm Packages** — Third-party modules

```
JavaScript Code (Your app)
    ↓
Node.js API (Core Modules)
    ↓
Node.js Bindings (C++ layer)
    ↓
V8 Engine  |  Libuv (Event Loop, Thread Pool)
    ↓
Operating System (File System, Network, etc.)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. Is Node.js single-threaded? Explain.
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Node.js is **single-threaded** for JavaScript execution but uses **multiple threads internally** via libuv's thread pool.

- **Main thread:** Runs the event loop and executes JavaScript
- **Libuv thread pool:** Default 4 threads, handles file I/O, DNS, crypto operations
- **Worker threads:** Can be created manually for CPU-intensive JavaScript tasks

```js
// JavaScript runs on the main thread (single-threaded)
console.log('Main thread:', process.pid);

// Blocking the main thread blocks EVERYTHING
setTimeout(() => console.log('Never runs during blocking'), 0);
while (true) {} // ❌ Blocks event loop
```

The single-threaded model simplifies programming (no race conditions from shared state) while non-blocking I/O achieves concurrency.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. What is event-driven architecture in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Node.js uses an **event-driven architecture** where entities communicate through events rather than direct calls.

```js
const EventEmitter = require('events');

class Server extends EventEmitter {
  start() {
    console.log('Server started');
    this.emit('ready');
  }
}

const server = new Server();
server.on('ready', () => console.log('Ready to handle requests'));
server.start();
```

Benefits:
- **Loose coupling** — Components don't need to know about each other
- **Scalability** — Easily add new event listeners
- **Asynchronous** — Events can be handled later

Node.js itself is built on events: HTTP requests, stream data, socket connections are all events.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. What is non-blocking I/O in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Non-blocking I/O** means I/O operations (file reads, network requests) don't block the execution thread. Instead, they initiate the operation and register a callback to run when complete.

```js
// ❌ Blocking (synchronous) — blocks the thread
const data = fs.readFileSync('file.txt');  // Waits here
console.log('Done reading');

// ✅ Non-blocking (asynchronous) — doesn't block
fs.readFile('file.txt', (err, data) => {
  console.log('Done reading');  // Runs later
});
console.log('This runs first');
```

This allows a single thread to handle thousands of concurrent operations without creating threads for each.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. What is the V8 Engine?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**V8** is Google's open-source JavaScript engine, written in C++, that compiles JavaScript to native machine code. It powers Chrome, Node.js, Deno, and Edge.

**V8 compilation pipeline:**
1. **Parser** — JavaScript source → Abstract Syntax Tree (AST)
2. **Ignition** — AST → Bytecode (interpreter)
3. **Turbofan** — Hot code → Optimized Machine Code (compiler)
4. **Orinoco** — Garbage collector (generational, mark-sweep)

```js
// V8 optimizes hot code paths automatically
for (let i = 0; i < 100000; i++) {
  // After ~10,000 iterations, V8 compiles this to optimized machine code
  doSomething(i);
}
```

Node.js exposes V8 memory and optimization information via the `v8` module.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. What is Libuv?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Libuv** is a C library that provides the **event loop**, **thread pool**, and **asynchronous I/O** for Node.js.

**What libuv handles:**
- **Event Loop** — Manages the event loop phases
- **Thread Pool** — For operations that can't be done asynchronously at OS level
- **File I/O** — Asynchronous file operations
- **DNS** — DNS resolution
- **Signal handling** — Unix signals
- **Timer** — `setTimeout`, `setInterval`
- **Child processes** — Spawning and managing processes

```js
// File I/O goes through libuv's thread pool
fs.readFile('/large/file.txt', callback);  // libuv thread pool handles this

// Network I/O goes through OS kernel (epoll/kqueue/IOCP)
http.get('http://example.com', callback);  // OS async I/O, no thread pool
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. How does the Node.js Event Loop work?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **Event Loop** is a mechanism that allows Node.js to perform non-blocking I/O by offloading operations to the OS kernel.

**Phases (in order):**
1. **Timers** — Executes `setTimeout` and `setInterval` callbacks
2. **Pending Callbacks** — I/O callbacks deferred from the previous poll
3. **Idle/Prepare** — Internal use
4. **Poll** — Retrieves new I/O events (blocks waiting if nothing pending)
5. **Check** — Executes `setImmediate` callbacks
6. **Close Callbacks** — Close event callbacks (e.g., `socket.on('close')`)

Between each phase, Node.js processes the **microtask queue** (Promise callbacks, `process.nextTick`).

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. What is the difference between Node.js and browser JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | Node.js | Browser |
|--------|---------|---------|
| **Global object** | `global` | `window` |
| **DOM** | ❌ No | ✅ Yes |
| **File system** | ✅ `fs` module | ❌ No |
| **Module system** | CommonJS + ESM | ESM |
| **require()** | ✅ Native | ❌ (bundled) |
| **Server capabilities** | ✅ HTTP server | ❌ |
| **Event loop** | ✅ Full control | ✅ Limited control |
| **process** | ✅ `process` object | ❌ (partial with `process` shim) |
| **N-API** | ✅ Native addons | ❌ |
| **Web APIs** | Limited (fetch, setTimeout) | Full (WebSocket, Canvas, etc.) |

```js
// Node.js: process is the global process object
console.log(process.version);  // "v20.x.x"

// Browser: window is the global object
console.log(window.innerWidth);  // Viewport width
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. How do you install Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Methods:**
1. **Official installer** — Download from [nodejs.org](https://nodejs.org)
2. **nvm (Node Version Manager)** — Switch between versions
```bash
nvm install 20    # Install Node.js 20
nvm use 20        # Use Node.js 20
nvm ls             # List installed versions
```
3. **fnm (Fast Node Manager)** — Faster alternative to nvm
4. **Package manager** — `brew install node` (macOS), `apt install nodejs` (Ubuntu)

```bash
node --version  # v20.x.x
npm --version   # 10.x.x
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. What is npm and how do you use it?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**npm** (Node Package Manager) is the default package manager for Node.js. It manages dependencies, runs scripts, and provides access to 2M+ packages.

```bash
# Initialize a project
npm init -y              # Creates package.json

# Install packages
npm install express      # Installs as dependency
npm install -D jest      # Installs as devDependency
npm install -g nodemon   # Installs globally

# Run scripts
npm run dev              # Runs the "dev" script from package.json
npm test                 # Runs the "test" script

# Update packages
npm update               # Update all packages
npm outdated             # Show outdated packages

# Audit
npm audit                # Check security vulnerabilities
npm audit fix            # Auto-fix vulnerabilities
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. What is npx?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**npx** is a tool that comes with npm (v5.2+) for executing Node packages without installing them globally.

```bash
# Run a package without installing it
npx create-react-app my-app
npx prisma init

# Run a specific version
npx cowsay@1.5.0 "Hello"

# Run from the local node_modules
npx eslint .             # Equivalent to ./node_modules/.bin/eslint .

# Benefits:
# ✅ No global installs needed
# ✅ Always uses the latest version (or specified version)
# ✅ Runs from local node_modules if available
# ✅ Temporary packages are cleaned up
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What is package.json?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`package.json` is the metadata file for a Node.js project. It contains project info, dependencies, scripts, and configuration.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js application",
  "main": "index.js",
  "type": "module",          // "module" for ESM, "commonjs" for CJS
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"     // Caret: minor version updates allowed
  },
  "devDependencies": {
    "jest": "^29.0.0"        // Dev only (testing)
  },
  "engines": {
    "node": ">=20.0.0"       // Node.js version requirement
  }
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. What is package-lock.json?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`package-lock.json` **locks** the exact version of every dependency (and their dependencies) to ensure reproducible builds across environments.

```json
{
  "name": "my-app",
  "lockfileVersion": 3,    // npm v7+ format
  "packages": {
    "node_modules/express": {
      "version": "4.18.2",  // Exact version locked
      "resolved": "https://...",
      "integrity": "sha512-..."
    }
  }
}
```

**Why it matters:**
- Ensures the same `node_modules` across all installs
- Contains checksums for security verification
- Speeds up `npm install` (can use integrity hashes)
- **Always commit** `package-lock.json` to version control

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. What is semantic versioning?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Semantic Versioning (SemVer)** uses a three-part version number: `MAJOR.MINOR.PATCH`.

```
v2.4.1 → Major: 2, Minor: 4, Patch: 1
```

| Change | When to increment | Example |
|--------|------------------|---------|
| **Major** | Breaking changes | `1.0.0` → `2.0.0` |
| **Minor** | New features (backward-compatible) | `1.0.0` → `1.1.0` |
| **Patch** | Bug fixes (backward-compatible) | `1.0.0` → `1.0.1` |

**npm version ranges:**
| Symbol | Meaning | Example |
|--------|---------|---------|
| `^` | Compatible with minor updates | `^1.2.0` → 1.x.x |
| `~` | Approximate (patch updates) | `~1.2.0` → 1.2.x |
| `*` | Any version | `*` |
| `>=` | Greater or equal | `>=1.0.0` |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. How do you structure a Node.js project?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A well-structured Node.js project:

```
project/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/           # Data models
│   ├── routes/           # Route definitions
│   ├── middleware/       # Express middleware
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration
│   └── app.js            # Express app setup
├── tests/                # Test files
├── scripts/              # Build/deploy scripts
├── node_modules/         # Dependencies
├── .env                  # Environment variables
├── .env.example          # Environment template
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── Dockerfile
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. How do you use environment variables in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Environment variables are accessed via `process.env`:

```js
// Access environment variables
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const nodeEnv = process.env.NODE_ENV || 'development';

// With dotenv package (.env file)
// .env file:
// PORT=4000
// DATABASE_URL=postgres://localhost:5432/mydb

import 'dotenv/config';
// Or: require('dotenv').config();

// Set in terminal
// PORT=4000 node index.js
// Or: export PORT=4000 (Unix)
// Or: set PORT=4000 (Windows cmd)
```

**Best practices:**
- Never commit `.env` — use `.env.example` as a template
- Use defaults for optional variables
- Validate required variables at startup
- Use libraries like `envalid` for validation

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. What is the difference between CommonJS and ES Modules in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | CommonJS (CJS) | ES Modules (ESM) |
|---------|---------------|------------------|
| **Syntax** | `require()` / `module.exports` | `import` / `export` |
| **File extension** | `.js`, `.cjs` | `.js` (with `"type": "module"`), `.mjs` |
| **Loading** | Synchronous | Asynchronous |
| **Static analysis** | ❌ No | ✅ Yes (tree-shaking) |
| **Top-level await** | ❌ No | ✅ Yes |
| **Circular deps** | Partial (copied exports) | ✅ Live bindings |
| **Default** | Default in Node.js | Opt-in |

```js
// CommonJS
const express = require('express');
module.exports = { myFunction };

// ES Modules
import express from 'express';
export const myFunction = () => {};
export default myFunction;
```

To use ESM in Node.js: set `"type": "module"` in `package.json` or use `.mjs` extension.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. What is `require()` and how does it work?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`require()` is the CommonJS function for importing modules. It synchronously loads and caches modules.

**Resolution algorithm:**
1. **Core module** — Check built-in modules (fs, path, http)
2. **Relative/absolute path** — Check `./` or `/`
3. **node_modules** — Walk up directory tree
4. **Not found** — Throw MODULE_NOT_FOUND error

```js
// Loading order
require('fs');              // 1. Core module
require('./utils/helper');  // 2. Relative path (resolves .js, .json, .node)
require('express');         // 3. node_modules/express
require('example');         // 4. Searches parent directories' node_modules
```

**Caching:** Modules are cached after first `require()`. Subsequent calls return the cached module.

```js
// module.js
let count = 0;
module.exports = { increment: () => ++count, getCount: () => count };

// a.js
const mod = require('./module');
mod.increment();  // count = 1

// b.js
const mod = require('./module');
console.log(mod.getCount()); // 1 — same module instance!
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. What is `module.exports` vs `exports`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`module.exports` is the actual object returned by `require()`. `exports` is a **reference** to `module.exports`.

```js
// These are equivalent:
module.exports.foo = 'bar';
exports.foo = 'bar';  // ✓ Works (exports references module.exports)

// ❌ THIS BREKS IT:
exports = { foo: 'bar' };  // Reassigns exports, NOT module.exports!
// require() still returns module.exports (empty object!)

// ✅ Correct way to export a single value:
module.exports = { foo: 'bar' };

// Pattern:
// Adding properties to exports → works
// Reassigning exports → breaks the reference
// Always use module.exports for clarity
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. How does dynamic import work in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Dynamic import** (`import()`) is an ESM feature for loading modules **on-demand** at runtime. Works in both CJS and ESM.

```js
// Dynamic import — returns a Promise
async function loadModule(name) {
  try {
    const module = await import(`./plugins/${name}.js`);
    return module.default;
  } catch (err) {
    console.error(`Failed to load plugin: ${name}`, err);
  }
}

// Conditional loading
if (process.env.FEATURE_FLAG) {
  const { feature } = await import('./feature.js');
  feature.init();
}

// Type-based loading
const format = file.endsWith('.json') ? 'json' : 'yaml';
const parser = await import(`./parsers/${format}.js`);

// Dynamic import in CommonJS
async function loadExpress() {
  const express = await import('express');
  // Not cached like require — each call re-evaluates!
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. How does Node.js resolve modules?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Node.js module resolution follows a specific algorithm:

```
1. Check if it's a BUILT-IN module (fs, path, http, etc.)
   → Yes: Return the core module

2. Check if path starts with '/' (absolute) or './' / '../' (relative)
   → Yes: Resolve relative to the current file
     - Try exact filename
     - Try + .js, .json, .node, .mjs, .cjs
     - Try/index.js, index.json, index.node
     - Fail: MODULE_NOT_FOUND

3. Look in node_modules/
   → Walk UP the directory tree checking node_modules/ at each level
   → Same resolution steps as #2

4. MODULE_NOT_FOUND error
```

```js
// Resolution order example for require('./data')
// 1. ./data.js
// 2. ./data.json
// 3. ./data.node
// 4. ./data/index.js
// 5. ./data/index.json
// 6. ./data/index.node
// 7. MODULE_NOT_FOUND
```

ESM resolution is stricter — requires full file extensions and doesn't search for index.js.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What are built-in modules in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Core built-in modules** (no npm install required):

```js
const fs = require('fs');           // File system operations
const path = require('path');       // File path utilities
const http = require('http');       // HTTP server/client
const https = require('https');     // HTTPS server/client
const os = require('os');           // Operating system info
const crypto = require('crypto');   // Cryptographic functions
const events = require('events');   // Event emitter
const stream = require('stream');   // Streaming data
const buffer = require('buffer');   // Binary data handling
const util = require('util');       // Utility functions
const child_process = require('child_process'); // Spawn processes
const cluster = require('cluster'); // Multi-process scaling
const worker_threads = require('worker_threads'); // Threads
const net = require('net');         // TCP server/client
const dns = require('dns');         // DNS resolution
const url = require('url');         // URL parsing
const readline = require('readline'); // Readable input
const zlib = require('zlib');       // Compression
const timers = require('timers');   // setTimeout/setInterval
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. What is the `fs` module used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The `fs` (File System) module provides file I/O operations — all available in both synchronous and asynchronous forms.

```js
const fs = require('fs');

// Reading
fs.readFile('file.txt', 'utf8', (err, data) => console.log(data));
const data = fs.readFileSync('file.txt', 'utf8');

// Writing
fs.writeFile('file.txt', 'Hello', (err) => {});
fs.writeFileSync('file.txt', 'Hello');

// Appending
fs.appendFile('file.txt', 'More text', () => {});

// Directory operations
fs.mkdir('new-dir', { recursive: true }, () => {});
fs.readdir('./', (err, files) => console.log(files));

// File info
const stats = fs.statSync('file.txt');
stats.isFile();      // true
stats.isDirectory(); // false
stats.size;          // File size in bytes

// Watch for changes
fs.watch('file.txt', (event, filename) => {
  console.log(`${filename} changed: ${event}`);
});

// Promises API (Node.js v14+)
const fsp = require('fs/promises');
const data = await fsp.readFile('file.txt', 'utf8');
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. What is the `path` module used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The `path` module provides utilities for working with file and directory paths.

```js
const path = require('path');

// Join path segments
path.join('/users', 'john', 'documents', 'file.txt');
// '/users/john/documents/file.txt' (uses OS separator)

// Resolve to absolute path
path.resolve('file.txt');            // '/current/dir/file.txt'
path.resolve('/base', 'file.txt');   // '/base/file.txt'

// Get directory name
path.dirname('/a/b/c.txt');  // '/a/b'

// Get file name
path.basename('/a/b/c.txt');       // 'c.txt'
path.basename('/a/b/c.txt', '.txt'); // 'c'

// Get extension
path.extname('/a/b/c.txt');  // '.txt'

// Parse path
path.parse('/home/user/file.txt');
// { root: '/', dir: '/home/user', base: 'file.txt', ext: '.txt', name: 'file' }

// Normalize
path.normalize('/a/b//c/../d');  // '/a/b/d'

// Platform-specific separator
path.sep;   // '/' on Unix, '\\' on Windows
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. What is the `os` module used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The `os` module provides operating system-related utility methods and properties.

```js
const os = require('os');

// System info
os.platform();       // 'linux', 'darwin', 'win32'
os.arch();           // 'x64', 'arm64'
os.release();        // '5.15.0-...' (kernel version)
os.hostname();       // Machine hostname
os.type();           // 'Linux', 'Darwin', 'Windows_NT'

// CPU info
os.cpus();           // Array of CPU/core objects
os.cpus().length;    // Number of CPU cores

// Memory
os.totalmem();       // Total memory in bytes
os.freemem();        // Free memory in bytes

// Network
os.networkInterfaces(); // Network interfaces

// User info
os.homedir();        // User home directory
os.userInfo();       // User info object
os.tmpdir();         // Temp directory

// Uptime
os.uptime();         // System uptime in seconds

// Memory usage in MB
const used = (os.totalmem() - os.freemem()) / 1024 / 1024;
console.log(`Memory usage: ${used.toFixed(2)} MB`);
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. What is the `process` object?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The `process` object is a global providing information and control over the current Node.js process.

```js
// Process info
process.pid;            // Process ID
process.ppid;           // Parent process ID
process.title;          // Process title
process.platform;       // 'linux', 'darwin', 'win32'
process.arch;           // 'x64', 'arm64'
process.version;        // Node.js version (v20.x.x)
process.versions;       // All version info (v8, libuv, etc.)
process.release;        // Release info

// Environment
process.env;            // Environment variables
process.env.NODE_ENV;   // 'development', 'production'
process.argv;           // Command line arguments

// Current working directory
process.cwd();          // Current directory
process.chdir('/tmp');  // Change directory

// Exit
process.exit(0);        // Exit with success
process.exitCode = 1;   // Set exit code (graceful)

// Events
process.on('exit', (code) => console.log(`Exiting with ${code}`));
process.on('uncaughtException', (err) => console.error(err));
process.on('unhandledRejection', (reason) => console.error(reason));

// Memory
process.memoryUsage();
// { rss, heapTotal, heapUsed, external }

// Next tick (microtask)
process.nextTick(() => console.log('Runs before next event loop phase'));
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q31. How do you create a simple HTTP server in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Using the built-in `http` module:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  // Set response header
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Route handling
  if (req.url === '/') {
    res.end(JSON.stringify({ message: 'Hello World' }));
  } else if (req.url === '/api/users') {
    res.end(JSON.stringify([{ id: 1, name: 'Alice' }]));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

ESM with top-level await:
```js
import http from 'http';

const server = http.createServer((req, res) => {
  res.end('Hello');
});

await new Promise(resolve => server.listen(3000, resolve));
console.log('Server running');
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q32. What are the request and response objects in Node.js HTTP server?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Request (`req`) — Readable stream:**
```js
const server = http.createServer((req, res) => {
  req.method;        // 'GET', 'POST', etc.
  req.url;           // '/api/users?id=123'
  req.headers;       // { 'content-type': 'application/json', ... }
  req.httpVersion;   // '1.1'
  req.statusCode;    // Only for client requests

  // Read body
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => console.log('Body:', body));
});
```

**Response (`res`) — Writable stream:**
```js
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.setHeader('X-Custom', 'value');
res.statusCode = 404;
res.write('Partial response');
res.end('Final response');  // Must call end()
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q33. What is Express.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Express.js** is the most popular web framework for Node.js. It provides a robust set of features for web and mobile applications.

```js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000);
```

**Key features:**
- Routing (params, query strings, multiple methods)
- Middleware system
- Template engine support
- Static file serving
- Error handling
- Request body parsing

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q34. How do you create routes in Express.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
const express = require('express');
const app = express();

// Route methods
app.get('/users', listUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.patch('/users/:id', partialUpdate);

// Route parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, page = 1 } = req.query;
  res.json({ query: q, page });
});

// Multiple handlers (middleware chain)
app.get('/protected', authenticate, authorize, handler);

// Router
const router = express.Router();
router.get('/profile', getProfile);
app.use('/api', router);

// Chained routes
app.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q35. What is middleware in Express.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Middleware** are functions that have access to `req`, `res`, and the `next` middleware function. They can:
- Execute code
- Modify `req` and `res` objects
- End the request-response cycle
- Call the next middleware

```js
// Application-level middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // Pass to next middleware
});

// Built-in middleware
app.use(express.json());         // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(express.static('public'));  // Serve static files

// Third-party middleware
const helmet = require('helmet');
const cors = require('cors');
app.use(helmet());               // Security headers
app.use(cors());                 // CORS

// Error-handling middleware (4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
```

**Order matters** — Middleware executes in the order they're defined.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q36. What is error middleware in Express?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Error middleware** has four parameters `(err, req, res, next)` and handles errors thrown in the application.

```js
// Async error wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes that throw errors
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await findUser(req.params.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  res.json(user);
}));

// Global error middleware (must be after routes)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${status}] ${message}`);
  if (status === 500) console.error(err.stack);

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q37. What is REST API and its principles?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**REST (Representational State Transfer)** is an architectural style for designing networked applications.

**Principles:**
1. **Stateless** — Each request contains all necessary info
2. **Client-Server** — Separation of concerns
3. **Cacheable** — Responses define cacheability
4. **Uniform Interface** — Consistent resource-based URLs
5. **Layered System** — Intermediaries (proxies, gateways)

```js
// RESTful API design
GET    /users          // List users
POST   /users          // Create user
GET    /users/:id      // Get single user
PUT    /users/:id      // Full update
PATCH  /users/:id      // Partial update
DELETE /users/:id      // Delete user
GET    /users/:id/posts // User's posts

// Query parameters for filtering, sorting, pagination
GET /users?role=admin&page=1&limit=20&sort=name
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q38. What are HTTP status codes you use most often?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Code | Name | Meaning |
|------|------|---------|
| **200** | OK | Success |
| **201** | Created | Resource created successfully |
| **204** | No Content | Success, no response body |
| **301** | Moved Permanently | Resource has new URL |
| **400** | Bad Request | Invalid client input |
| **401** | Unauthorized | Authentication required |
| **403** | Forbidden | Authenticated but not allowed |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate resource, version conflict |
| **422** | Unprocessable Entity | Validation failed |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server-side error |
| **502** | Bad Gateway | Upstream server error |
| **503** | Service Unavailable | Server overloaded or down |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q39. What is JWT authentication?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**JWT (JSON Web Token)** is a compact, URL-safe token format for securely transmitting information between parties.

**Structure:** `header.payload.signature`

```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.abc123signature
```

**How it works:**
```js
const jwt = require('jsonwebtoken');

// Login: create token
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body);
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// Middleware: verify token
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Protected route
app.get('/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId });
});
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q40. What is bcrypt and why use it?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**bcrypt** is a password hashing library designed to be computationally expensive (resistant to brute-force attacks).

```js
const bcrypt = require('bcrypt');

// Hash password (async)
const saltRounds = 12;  // Higher = more secure but slower
const hashedPassword = await bcrypt.hash('userPassword', saltRounds);

// Compare password
const isMatch = await bcrypt.compare('userPassword', hashedPassword);
```

**Why bcrypt over SHA-256/MD5:**
- **Slow by design** — Configurable cost factor (saltRounds)
- **Salt built-in** — No need to manage salts separately
- **Future-proof** — Can increase cost as hardware improves

**Never** store plain-text passwords or use fast hashing algorithms (MD5, SHA-1, SHA-256) for passwords.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q41. What is CORS and how do you handle it in Express?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the page.

```js
const cors = require('cors');

// Allow all origins (development only)
app.use(cors());

// Specific origin
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies
  maxAge: 86400        // Cache preflight request for 24h
}));

// Dynamic origin
app.use(cors({
  origin: (origin, callback) => {
    const whitelist = ['https://app1.com', 'https://app2.com'];
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q42. What is Helmet.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Helmet** is a middleware that sets various HTTP security headers to protect against common web vulnerabilities.

```js
const helmet = require('helmet');
app.use(helmet());

// What Helmet sets:
// Content-Security-Policy — Prevents XSS
// X-Content-Type-Options  — Prevents MIME sniffing
// X-Frame-Options         — Prevents clickjacking
// Strict-Transport-Security — Enforces HTTPS
// X-XSS-Protection        — XSS filter (legacy)
// Referrer-Policy         — Controls referrer header
```

Always use Helmet (or similar) in production Express applications.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q43. What is npm audit?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`npm audit` scans your project's dependencies for known security vulnerabilities.

```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix              # Auto-fix (patch/minor)
npm audit fix --force      # Auto-fix (may include major upgrades)

# Detailed report
npm audit --json

# Example output:
# === npm audit security report ===
#
# │ Low            │ Regular Expression Denial of Service │
# │ Package        │ debug                               │
# │ Dependency of  │ express                             │
# │ Path           │ express > debug                     │
# │ Fixed in       │ debug@3.2.0                         │
```

**Best practice:** Run `npm audit` regularly and before production deployments.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q44. How do you connect to a database from Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**MongoDB with Mongoose:**
```js
const mongoose = require('mongoose');
await mongoose.connect(process.env.MONGODB_URI);
const User = mongoose.model('User', { name: String, email: String });
```

**PostgreSQL with pg:**
```js
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
```

**MySQL with mysql2:**
```js
const mysql = require('mysql2/promise');
const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
```

**Redis:**
```js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);
await redis.set('key', 'value');
const value = await redis.get('key');
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q45. How do you handle file uploads in Express?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Using `multer` middleware:

```js
const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images allowed'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Single file
app.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({ file: req.file });
});

// Multiple files
app.post('/uploads', upload.array('photos', 10), (req, res) => {
  res.json({ files: req.files });
});
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q46. What is the EventEmitter class?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`EventEmitter` is a core Node.js class that implements the observer pattern — objects emit named events that cause listeners to fire.

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

// Register listeners
emitter.on('data', (chunk) => console.log('Data:', chunk));
emitter.once('error', (err) => console.error('Error:', err));

// Emit events
emitter.emit('data', 'Hello');
emitter.emit('data', 'World');

// Remove listeners
emitter.off('data', handler);
emitter.removeAllListeners('data');

// Get listeners
emitter.listeners('data');      // Array of listeners
emitter.listenerCount('data');  // Count

// Max listeners warning (default 10)
emitter.setMaxListeners(20);
```

Many Node.js objects inherit from EventEmitter: `http.Server`, `http.ClientRequest`, `stream.Readable`, `child_process`, `fs.ReadStream`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q47. What is `util.promisify`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`util.promisify` converts callback-based functions to Promise-based functions.

```js
const util = require('util');
const fs = require('fs');

// Before promisify
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// After promisify
const readFile = util.promisify(fs.readFile);
try {
  const data = await readFile('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// Custom promisify
function myFunction(param, callback) {
  // Must follow error-first callback pattern
  if (param < 0) return callback(new Error('Invalid param'));
  callback(null, param * 2);
}
const myFunctionAsync = util.promisify(myFunction);
const result = await myFunctionAsync(5); // 10
```

**Note:** Most modern APIs already return Promises natively (e.g., `fs/promises`).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q48. What are Timers in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Node.js provides timer functions for scheduling callbacks:

```js
// setTimeout — runs once after delay
const timeout = setTimeout(() => console.log('Delayed'), 1000);
clearTimeout(timeout);  // Cancel

// setInterval — runs repeatedly
const interval = setInterval(() => console.log('Every second'), 1000);
clearInterval(interval);  // Stop

// setImmediate — runs after I/O callbacks (check phase)
setImmediate(() => console.log('After I/O'));

// unref — allows Node to exit if timer is the only thing pending
timeout.unref();  // Won't prevent exit
timeout.ref();    // Re-allow (default)
```

**Execution order:**
```js
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// In main module: order depends on event loop phase
// Inside I/O callback: immediate always runs first
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q49. What is the `console` module in Node.js?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Node.js provides a `console` module similar to the browser's console but with additional features:

```js
// Standard logging
console.log('Info');
console.warn('Warning');      // stderr
console.error('Error');       // stderr with stack
console.debug('Debug');

// Formatting
console.log('%s %d', 'Age:', 30);
console.log({ name: 'Alice' });          // Object
console.table([{ name: 'Alice' }, { name: 'Bob' }]);  // Table

// Timing
console.time('operation');
// ... expensive operation
console.timeEnd('operation');  // "operation: 234ms"

// Counting
console.count('click');  // "click: 1"
console.count('click');  // "click: 2"

// Stack trace
console.trace('Where am I?');

// Assertion
console.assert(1 === 2, 'This is false');  // Throws AssertionError

// Grouping
console.group('Details');
console.log('Nested');
console.groupEnd();
```

In Node.js, `console.log` is synchronous on stdout (can block the event loop for large data).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q50. What is NODE_ENV and why is it important?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`NODE_ENV` is an environment variable used to indicate the application's runtime environment.

```js
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
```

**Why it matters:**
- **Express** enables caching, suppresses stack traces in production
- **npm** installs only prod dependencies with `--production`
- **Libraries** (React, Vue) skip development warnings in production builds
- **Logging** — More verbose in development, minimal in production

```js
// Setting it
// Linux/Mac: NODE_ENV=production node index.js
// Windows: SET NODE_ENV=production && node index.js

// In package.json scripts:
"scripts": {
  "dev": "NODE_ENV=development node --watch index.js",
  "start": "NODE_ENV=production node index.js"
}
```

**Never** rely on NODE_ENV for security — it can be overridden.

</div>
</details>

---

## 🟡 Medium (Q51–Q110)

<details class="qa-card qa-medium">
<summary>
Q51. Explain the Event Loop phases in detail.
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The Event Loop has **six phases**, with microtasks executed between each phase.

**1. Timers Phase**
- Executes callbacks from `setTimeout()` and `setInterval()`
- Minimum delay, not guaranteed execution time

**2. Pending Callbacks Phase**
- I/O callbacks deferred to next iteration
- Some OS-specific callbacks (e.g., TCP errors)

**3. Idle/Prepare Phase**
- Internal libuv operations (not accessible from JS)

**4. Poll Phase**
- **Retrieves new I/O events**
- If the poll queue is **not empty**: execute callbacks synchronously
- If the poll queue is **empty**:
  - If `setImmediate()` is queued: move to check phase
  - Otherwise: wait for I/O callbacks (blocking)

**5. Check Phase**
- Executes `setImmediate()` callbacks

**6. Close Callbacks Phase**
- Emitted close events (e.g., `socket.on('close')`)

**Microtask execution (between each phase):**
1. `process.nextTick()` — Entire nextTick queue
2. Promise callbacks — `.then()`, `.catch()`, `.finally()`

```js
// Example showing all phases
const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('1. Poll (I/O callback)');

  setTimeout(() => console.log('2. Timer'), 0);
  setImmediate(() => console.log('3. Check'));
  process.nextTick(() => console.log('4. nextTick'));
  Promise.resolve().then(() => console.log('5. Promise'));
});

// Output: 1 → 4 → 5 → 3 → 2
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. What is `process.nextTick()` and when should you use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`process.nextTick()` schedules a callback to run **before the next event loop phase** — it's a microtask with the **highest priority**.

```js
console.log('Start');

process.nextTick(() => console.log('nextTick 1'));
process.nextTick(() => console.log('nextTick 2'));

Promise.resolve().then(() => console.log('Promise'));

setTimeout(() => console.log('Timeout'), 0);

console.log('End');

// Output: Start → End → nextTick 1 → nextTick 2 → Promise → Timeout
```

**When to use `process.nextTick()`:**
- **Error handling** — Re-throw errors before continuing
- **Initialize before I/O** — Emit event after constructor
- **Batched operations** — Defer work without blocking

```js
// Real use: EventEmitter initialization
class MyServer extends EventEmitter {
  constructor() {
    super();
    process.nextTick(() => this.emit('ready'));
  }
}

// ⚠️ Don't use nextTick recursively — can starve the event loop!
function bad() {
  process.nextTick(bad);  // ❌ Never lets I/O run
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. What is the difference between `process.nextTick()` and `setImmediate()`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| `process.nextTick()` | `setImmediate()` |
|---------------------|------------------|
| Runs **before** the next event loop phase | Runs in the **check** phase (after I/O) |
| **Highest priority** microtask | Macrotask (lower priority) |
| Not part of the event loop | Named poorly — actually not immediate |
| Can **starve** I/O if used recursively | Can't starve I/O (macrotask) |

```js
// Inside I/O callback, setImmediate always runs before setTimeout
const fs = require('fs');
fs.readFile(__filename, () => {
  setImmediate(() => console.log('1. setImmediate'));
  setTimeout(() => console.log('2. setTimeout'), 0);
  process.nextTick(() => console.log('3. nextTick'));
});
// Output: 3 → 1 → 2

// Outside I/O callback, order is non-deterministic
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// Can be: timeout → immediate OR immediate → timeout
```

**Rule of thumb:** Prefer `setImmediate()` over `process.nextTick()` unless you specifically need to run before the next phase.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. How does libuv's thread pool work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Libuv's thread pool** handles operations that can't be performed asynchronously at the OS level.

**Default pool size:** 4 threads
**Can be increased:** `UV_THREADPOOL_SIZE=8`

**What uses the thread pool:**
- `fs` module operations (file I/O)
- `crypto` operations (pbkdf2, randomBytes, scrypt)
- `dns.lookup()` (DNS resolution)
- `zlib` compression/decompression
- Some `child_process` operations

**What does NOT use the thread pool (uses OS async I/O instead):**
- Network I/O (`http`, `net`, `dgram`)
- `setTimeout`/`setInterval` (kernel timer)
- Unix signals

```js
// Thread pool impact
const fs = require('fs');
const crypto = require('crypto');

// These file operations use the thread pool
fs.readFile('file1.txt', cb);
fs.readFile('file2.txt', cb);
fs.readFile('file3.txt', cb);
fs.readFile('file4.txt', cb);
fs.readFile('file5.txt', cb);  // Waits for a free thread

// This crypto operation also uses the thread pool
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', cb);

// Increase pool size for heavy I/O
// UV_THREADPOOL_SIZE=8 node app.js
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What are Streams in Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Streams** are objects that let you read/write data chunk-by-chunk without loading everything into memory.

**4 types of streams:**
| Type | Description | Example |
|------|-------------|---------|
| **Readable** | Source of data | `fs.createReadStream`, `http.IncomingMessage` |
| **Writable** | Destination for data | `fs.createWriteStream`, `http.ServerResponse` |
| **Duplex** | Both readable and writable | `net.Socket` |
| **Transform** | Duplex that modifies data | `zlib.createGzip`, `crypto.createCipher` |

```js
// Readable stream
const readStream = fs.createReadStream('large-file.txt', { highWaterMark: 64 * 1024 });
readStream.on('data', chunk => console.log(`Received ${chunk.length} bytes`));
readStream.on('end', () => console.log('Done'));
readStream.on('error', err => console.error(err));

// Writable stream
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello');
writeStream.end('World');

// Piping (readable → writable)
readStream.pipe(writeStream);

// Stream pipeline (recommended — handles errors)
const { pipeline } = require('stream');
pipeline(readStream, zlib.createGzip(), fs.createWriteStream('out.gz'), (err) => {
  if (err) console.error('Pipeline failed', err);
  else console.log('Pipeline succeeded');
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. What is backpressure in streams?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Backpressure** occurs when a readable stream provides data faster than a writable stream can consume it.

```js
// ❌ Without backpressure handling — buffering grows unbounded
readStream.on('data', (chunk) => {
  writeStream.write(chunk);  // No backpressure check!
});

// ✅ With backpressure
readStream.on('data', (chunk) => {
  const canContinue = writeStream.write(chunk);
  if (!canContinue) {
    readStream.pause();  // Stop reading until drain event
    writeStream.once('drain', () => readStream.resume());
  }
});

// ✅ Best: use pipe or pipeline (built-in backpressure)
readStream.pipe(writeStream);  // Automatic backpressure handling
```

**Signs of backpressure issues:**
- High memory usage when processing large files
- Slow response times under load
- Out of memory errors

`pipe()` and `pipeline()` handle backpressure automatically. Always use them instead of manual `.on('data')` for production.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. What are Buffers in Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Buffer** is a temporary storage for binary data — raw memory allocation outside the V8 heap.

```js
// Create buffers
const buf1 = Buffer.alloc(10);               // Zero-filled, 10 bytes
const buf2 = Buffer.alloc(10, 1);            // Filled with byte 1
const buf3 = Buffer.from('Hello');           // From string (UTF-8)
const buf4 = Buffer.from([1, 2, 3]);         // From byte array
const buf5 = Buffer.from('Hello', 'base64'); // From encoded string

// Reading/writing
buf1.write('Hello');               // Write string
buf1[0];                           // Read byte (72 for 'H')
buf1.length;                       // Buffer size in bytes

// Encoding
buf3.toString();                   // 'Hello' (default UTF-8)
buf3.toString('hex');              // '48656c6c6f'
buf3.toString('base64');           // 'SGVsbG8='

// Slicing (creates a view into original — no copy)
const slice = buf3.slice(0, 4);    // Points to same memory!

// Copying (new memory)
const copy = Buffer.alloc(buf3.length);
buf3.copy(copy);

// Concatenation
const combined = Buffer.concat([buf3, Buffer.from(' World')]);

// Comparison
Buffer.compare(buf3, Buffer.from('Hello')); // 0 (equal)

// Practical: encoding conversion
const base64 = Buffer.from('Hello World').toString('base64');
const decoded = Buffer.from(base64, 'base64').toString();
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. What is the `crypto` module used for?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The `crypto` module provides cryptographic functionality.

```js
const crypto = require('crypto');

// Hashing (one-way)
const hash = crypto.createHash('sha256').update('password123').digest('hex');
// For passwords, use bcrypt or scrypt instead

// HMAC (keyed-hash)
const hmac = crypto.createHmac('sha256', 'secret-key').update('data').digest('hex');

// Random bytes
const buf = crypto.randomBytes(32);  // Cryptographically secure
const id = crypto.randomUUID();      // Random UUID v4

// Password-based key derivation (PBKDF2)
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
  console.log(key.toString('hex')); // Derived key
});

// Scrypt (modern, memory-hard)
crypto.scrypt('password', 'salt', 64, (err, key) => {
  console.log(key.toString('hex'));
});

// Encryption (AES-256-GCM)
const algorithm = 'aes-256-gcm';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('secret message', 'utf8', 'hex');
encrypted += cipher.final('hex');
const authTag = cipher.getAuthTag().toString('hex');

// Decryption
const decipher = crypto.createDecipheriv(algorithm, key, iv);
decipher.setAuthTag(Buffer.from(authTag, 'hex'));
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. What is the `child_process` module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The `child_process` module allows spawning child processes — useful for running system commands, Python scripts, or other executables.

```js
const { exec, execSync, spawn, fork } = require('child_process');

// exec — runs command in shell, buffers output
exec('ls -la', (error, stdout, stderr) => {
  if (error) console.error(`Error: ${error}`);
  console.log(`Output: ${stdout}`);
});

// execSync — synchronous version (blocks event loop!)
const output = execSync('ls -la', { encoding: 'utf8' });

// spawn — streams output (better for large data)
const child = spawn('find', ['.', '-name', '*.js']);
child.stdout.on('data', (data) => console.log(`Output: ${data}`));
child.stderr.on('data', (data) => console.error(`Error: ${data}`));
child.on('close', (code) => console.log(`Exited with ${code}`));

// fork — special case of spawn for Node.js processes
// Creates a new Node.js process with IPC channel
const worker = fork('./worker.js');
worker.send({ task: 'process', data: largeData });
worker.on('message', (result) => console.log('Result:', result));
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. What is the `cluster` module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The `cluster` module allows you to create child processes (workers) that share the same server port, enabling multi-core utilization.

```js
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isPrimary) {  // or cluster.isMaster
  console.log(`Primary ${process.pid} is running`);

  // Fork workers (one per CPU)
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // Handle worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Replace dead worker
    cluster.fork();
  });

} else {
  // Workers share the same HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Worker ${process.pid} handled request`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

**Features:**
- Automatic load balancing across workers (round-robin on Unix)
- Zero-downtime restarts by rolling workers
- Shares only server ports — each worker has its own memory space

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q61. What is the `worker_threads` module?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`worker_threads` provides true **multi-threading** within a single process — threads share memory (unlike `cluster`).

```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Main thread
  const worker = new Worker(__filename, {
    workerData: { numbers: [1, 2, 3, 4, 5] }
  });

  worker.on('message', result => console.log('Result:', result));
  worker.on('error', err => console.error(err));
  worker.on('exit', code => console.log(`Exited with ${code}`));

} else {
  // Worker thread
  const result = workerData.numbers.reduce((a, b) => a + b, 0);
  parentPort.postMessage(result);
}
```

**Key differences from cluster:**

| Worker Threads | Cluster |
|---------------|---------|
| Same process, multiple threads | Multiple processes |
| **Shared memory** (SharedArrayBuffer) | Separate memory (copy via IPC) |
| Lightweight (threads) | Heavier (processes) |
| Best for CPU-intensive JS | Best for load balancing I/O |
| Communication via `postMessage` | Communication via IPC |

**Use `worker_threads` for:** CPU-intensive operations (image processing, complex calculations, data transformation) within a single server.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. What is the difference between `worker_threads` and `cluster`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | `worker_threads` | `cluster` |
|---------|-----------------|-----------|
| **Process model** | Single process, multiple threads | Multiple processes |
| **Memory** | Shared (can use SharedArrayBuffer) | Separate (each worker has own memory) |
| **Port sharing** | ❌ Must manually manage | ✅ All workers share same port |
| **CPU usage** | Good for CPU-intensive JS | Good for I/O-bound workloads |
| **Isolation** | Threads share process (less isolated) | Separate processes (fully isolated) |
| **Crash impact** | Thread crash kills process | Worker crash doesn't affect others |
| **IPC** | `postMessage` (direct memory access) | Message passing (serialized) |
| **Use case** | Parallel computation | Scaling HTTP servers |

```js
// Pick worker_threads when:
// - Need to process CPU-intensive tasks (image processing, data crunching)
// - Need shared memory for performance
// - Want lightweight parallelism

// Pick cluster when:
// - Scaling HTTP server across all CPU cores
// - Need port sharing (load balancing)
// - Need process isolation for stability
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. How do you handle large file uploads efficiently?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Use **streams** to process uploads chunk-by-chunk instead of buffering the entire file in memory.

```js
const express = require('express');
const fs = require('fs');
const path = require('path');

app.post('/upload', (req, res) => {
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const writeStream = fs.createWriteStream(path.join('uploads', filename));

  // Stream the upload directly to disk
  req.pipe(writeStream);

  let progress = 0;
  req.on('data', chunk => {
    progress += chunk.length;
    console.log(`Uploaded ${progress} bytes`);
  });

  writeStream.on('finish', () => {
    res.json({ filename, size: progress });
  });

  req.on('error', err => {
    writeStream.destroy();
    res.status(500).json({ error: 'Upload failed' });
  });
});

// With progress tracking (using busboy for multipart)
const Busboy = require('busboy');

app.post('/upload-multipart', (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  let fileSize = 0;

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = fs.createWriteStream(path.join('uploads', filename));
    file.pipe(saveTo);

    file.on('data', data => {
      fileSize += data.length;
      // Optionally send progress to client via WebSocket
    });
  });

  busboy.on('finish', () => {
    res.json({ fileSize });
  });

  req.pipe(busboy);
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. How do you watch files for changes in Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Node.js provides `fs.watch()` and `fs.watchFile()` for monitoring file changes:

```js
const fs = require('fs');

// fs.watch — efficient (OS-level notifications)
fs.watch('file.txt', (eventType, filename) => {
  console.log(`Event: ${eventType}, File: ${filename}`);
});

// Watch directory recursively
fs.watch('src/', { recursive: true }, (event, filename) => {
  console.log(`${filename} changed: ${event}`);
});

// fs.watchFile — polling-based (less efficient, more compatible)
fs.watchFile('config.json', (curr, prev) => {
  console.log(`Modified: ${curr.mtime}, Size: ${curr.size}`);
  reloadConfig();
});

// Node.js built-in file watcher for development
// node --watch app.js  (Node.js 18+)

// Third-party: chokidar (recommended for production)
const chokidar = require('chokidar');
chokidar.watch('src/**/*.js').on('all', (event, path) => {
  console.log(`${event}: ${path}`);
});
```

**Caveats:**
- `fs.watch()` behavior varies across platforms (inconsistent on macOS)
- `fs.watch()` might report multiple events for a single change
- `chokidar` is more reliable for cross-platform file watching

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. What is the difference between `readFile` and `createReadStream`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| `fs.readFile()` | `fs.createReadStream()` |
|----------------|------------------------|
| Loads entire file into **memory** | Processes file **chunk-by-chunk** |
| Returns a Buffer/string | Returns a Readable Stream |
| Simpler API | More complex (event-driven) |
| **Bad for large files** | **Good for large files** |
| Blocks until fully read | Data arrives incrementally |

```js
const fs = require('fs');
const http = require('http');

// ❌ BAD for large files — loads everything into memory
const server = http.createServer((req, res) => {
  fs.readFile('large-video.mp4', (err, data) => {
    res.end(data);  // Memory: video size
  });
});

// ✅ GOOD — streams data without buffering all in memory
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream('large-video.mp4');
  stream.pipe(res);  // Memory: ~64KB chunks
});
```

**Rule of thumb:** If the file is > 50MB or you have memory constraints, use streams. For small configuration files, `readFile` is fine.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. What are Transform streams?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Transform streams** are Duplex streams that modify data as it passes through (readable → modify → writable).

```js
const { Transform } = require('stream');
const fs = require('fs');

// Custom transform stream
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Transform the chunk
    this.push(chunk.toString().toUpperCase());
    callback();  // Signal done
  }
});

// Usage
fs.createReadStream('file.txt')
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream('file-uppercase.txt'));

// Built-in transform streams
const zlib = require('zlib');
// Gzip compression is a Transform stream!
fs.createReadStream('file.txt')
  .pipe(zlib.createGzip())  // Transform: compresses data
  .pipe(fs.createWriteStream('file.txt.gz'));

// Crypto encryption
const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'password');
fs.createReadStream('file.txt')
  .pipe(cipher)  // Transform: encrypts data
  .pipe(fs.createWriteStream('file.enc'));
```

**Practical: CSV to JSON transformer:**
```js
class CsvToJson extends Transform {
  constructor() {
    super({ objectMode: true });
    this.headers = null;
  }

  _transform(line, encoding, callback) {
    const values = line.toString().split(',');
    if (!this.headers) {
      this.headers = values;
    } else {
      const obj = {};
      this.headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
      this.push(JSON.stringify(obj) + '\n');
    }
    callback();
  }
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. What is the `stream.pipeline()` function?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`stream.pipeline()` provides a cleaner way to pipe streams with automatic error handling and cleanup.

```js
const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

// ✅ pipeline with Promises (Node.js 15+)
async function compress() {
  try {
    await pipeline(
      fs.createReadStream('input.txt'),
      zlib.createGzip(),
      fs.createWriteStream('input.txt.gz')
    );
    console.log('Compression complete');
  } catch (err) {
    console.error('Pipeline failed:', err);
  }
}

// ❌ .pipe() — doesn't handle errors well
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
  .on('error', (err) => console.error(err));  // Only last stream errors!

// ✅ pipeline with callback
const { pipeline: callbackPipeline } = require('stream');
callbackPipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('input.txt.gz'),
  (err) => {
    if (err) console.error('Pipeline failed:', err);
    else console.log('Success');
  }
);
```

**Why pipeline over pipe:**
- Properly destroys all streams on error
- Handles backpressure correctly
- Cleans up resources automatically
- Prevents memory leaks

**Always use `pipeline()` instead of `.pipe()` in production code!**

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. How does error handling work in Express.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Express error handling requires specific patterns:

```js
// 1. Synchronous errors — Express catches these automatically
app.get('/sync-error', (req, res) => {
  throw new Error('Will be caught by error handler');
});

// 2. Async errors — MUST be forwarded to next()
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await findUser(req.params.id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    res.json(user);
  } catch (err) {
    next(err);  // Forward to error middleware
  }
});

// 3. Wrapper for async handlers (Express 5 auto-handles this)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/profile', asyncHandler(async (req, res) => {
  const user = await findUser(req.userId);
  res.json(user);
}));

// 4. Global error handler (4 params!)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  // Log
  console.error(`[${status}] ${err.message}`);

  // Response
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 5. Unhandled rejections and exceptions
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);  // Uncaught exceptions leave app in unknown state
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. What are Global Error Handlers in Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Node.js provides process-level events for catching unhandled errors:

```js
// 1. Uncaught Exception — catch errors that weren't caught anywhere
process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION:', error);
  // Log, send alert, then exit
  process.exit(1);  // Required — app state is unreliable
});

// 2. Unhandled Rejection — catch Promise rejections without .catch()
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
  // In Node 15+, this will terminate the process in the future
  // Best: exit and restart via process manager
  process.exit(1);
});

// 3. Warning — deprecation, multiple listeners, etc.
process.on('warning', (warning) => {
  console.warn(warning.name, warning.message, warning.stack);
});

// 4. SIGTERM/SIGINT — graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down...');
  await server.close();
  await db.disconnect();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received');
  process.exit(0);
});

// Best practice: graceful shutdown
async function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new requests
  server.close(() => {
    console.log('HTTP server closed');
  });

  // Close database connections
  await Promise.all([
    mongoose.disconnect(),
    redis.quit(),
    // Other cleanup
  ]);

  console.log('Cleanup complete. Exiting.');
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. What is logging best practice in Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Use a structured logging library like **Winston** or **Pino** for production logging:

**Winston example:**
```js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'development'
        ? winston.format.simple()
        : winston.format.json()
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ]
});

logger.info('Server started', { port: 3000, env: process.env.NODE_ENV });
logger.warn('Rate limit approaching', { ip: req.ip });
logger.error('Database connection failed', { error: err.message });
```

**Pino (faster):**
```js
const pino = require('pino');
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty' }  // Pretty print in dev
    : undefined
});

logger.info({ user: userId }, 'User logged in');
```

**Request logging with Morgan:**
```js
const morgan = require('morgan');
app.use(morgan('combined'));  // Apache combined format
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q71. How do you implement caching in Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**In-memory caching (simple):**
```js
class MemoryCache {
  constructor(ttlSeconds = 60) {
    this.cache = new Map();
    this.ttl = ttlSeconds * 1000;
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  set(key, value, ttlOverride) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + (ttlOverride || this.ttl)
    });
  }

  del(key) { this.cache.delete(key); }
  flush() { this.cache.clear(); }
}
```

**Redis caching:**
```js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// Caching middleware
function cache(duration = 60) {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    const cached = await redis.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // Override res.json to cache before sending
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redis.setex(key, duration, JSON.stringify(data));
      return originalJson(data);
    };

    next();
  };
}

app.get('/api/users', cache(300), async (req, res) => {
  const users = await db.findMany();
  res.json(users);
});
```

**HTTP caching headers:**
```js
app.get('/static/file.js', (req, res) => {
  res.set('Cache-Control', 'public, max-age=31536000, immutable');
  res.sendFile(filePath);
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q72. What is rate limiting and how do you implement it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Rate limiting prevents abuse by limiting the number of requests from a client within a time window.

```js
// Using express-rate-limit (recommended)
const rateLimit = require('express-rate-limit');

// Global limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                    // limit each IP to 100 requests per windowMs
  standardHeaders: true,       // Return rate limit info in headers
  legacyHeaders: false,        // Disable X-RateLimit-* headers
  message: { error: 'Too many requests, please try again later.' }
});
app.use(globalLimiter);

// Auth-specific limiter (more restrictive)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' }
});
app.use('/api/login', authLimiter);

// With Redis store (for distributed apps)
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Custom implementation (for learning)
function simpleRateLimiter(maxRequests, windowMs) {
  const clients = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const clientData = clients.get(ip) || [];

    // Remove expired timestamps
    const recent = clientData.filter(t => now - t < windowMs);

    if (recent.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    recent.push(now);
    clients.set(ip, recent);
    next();
  };
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q73. How do you secure a Node.js/Express application?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```js
// 1. Security headers (helmet)
const helmet = require('helmet');
app.use(helmet());

// 2. CORS
const cors = require('cors');
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));

// 3. Rate limiting
const rateLimit = require('express-rate-limit');
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// 4. Input validation
const { body, validationResult } = require('express-validator');
app.post('/users',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors);
  }
);

// 5. SQL Injection prevention (parameterized queries)
// ❌ Vulnerable
const sql = `SELECT * FROM users WHERE email = '${email}'`;
// ✅ Safe
const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

// 6. XSS prevention (sanitize output)
const createDOMPurify = require('dompurify');
const sanitized = DOMPurify.sanitize(userInput);

// 7. Authentication
app.use('/api', authenticate);

// 8. Environment variables (not hardcoded secrets)
// .env file — never commit!
// NODE_ENV=production
// JWT_SECRET=...
// DATABASE_URL=...

// 9. Disable x-powered-by
app.disable('x-powered-by');

// 10. HTTPS redirect in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure) return res.redirect('https://' + req.headers.host + req.url);
    next();
  });
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q74. What is CSRF and how do you prevent it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**CSRF (Cross-Site Request Forgery)** tricks an authenticated user into performing unwanted actions on a website.

**Prevention with csurf/csrf-csrf:**
```js
const { doubleCsrf } = require('csrf-csrf');
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  cookieName: 'csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
  size: 64,
});

// Apply CSRF protection
app.use(doubleCsrfProtection);

// Generate token for forms
app.get('/form', (req, res) => {
  res.json({ csrfToken: generateToken(req, res) });
});

// CSRF token is validated on POST/PUT/DELETE requests
```

**Alternative: SameSite cookies:**
```js
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict', // Prevents sending cookie from other sites
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q75. How do you handle database connection pooling?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Connection pooling** reuses database connections instead of creating new ones for each request — critical for performance.

**PostgreSQL with pg:**
```js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                 // Maximum pool size
  idleTimeoutMillis: 30000, // Close idle clients after 30s
  connectionTimeoutMillis: 2000, // Return error after 2s if no connection
});

// Query
const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

// Transaction
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - 100 WHERE id = $1', [1]);
  await client.query('UPDATE accounts SET balance = balance + 100 WHERE id = $1', [2]);
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release();  // Return connection to pool
}
```

**MongoDB with Mongoose:**
```js
await mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

**Connection pool best practices:**
- Set `max` based on expected concurrency (usually 10-50)
- Monitor pool usage — set alerts for pool exhaustion
- Release connections back to pool (`.release()`, `.end()`)
- Use connection string with SSL for production
- Implement retry logic for transient failures

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q76. How do you implement transactions in Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**MongoDB with Mongoose:**
```js
const session = await mongoose.startSession();
session.startTransaction();

try {
  const user = await User.create([{ name: 'Alice' }], { session });
  const account = await Account.create([{ userId: user[0]._id, balance: 1000 }], { session });

  await session.commitTransaction();
  console.log('Transaction committed');
} catch (error) {
  await session.abortTransaction();
  console.error('Transaction aborted:', error);
  throw error;
} finally {
  session.endSession();
}
```

**PostgreSQL with pg:**
```js
const client = await pool.connect();
try {
  await client.query('BEGIN');

  const { rows } = await client.query(
    'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING *',
    [quantity, productId]
  );

  if (rows.length === 0) {
    await client.query('ROLLBACK');
    throw new Error('Insufficient stock');
  }

  await client.query(
    'INSERT INTO orders (product_id, quantity) VALUES ($1, $2)',
    [productId, quantity]
  );

  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q77. How does indexing work in MongoDB/PostgreSQL with Node.js?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Indexing** speeds up queries by creating data structures optimized for search.

**MongoDB with Mongoose:**
```js
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true },
  name: String,
  createdAt: { type: Date, index: true },
  role: String,
  status: String,
});

// Compound index
userSchema.index({ role: 1, status: 1 });

// Text index for search
userSchema.index({ name: 'text', email: 'text' });

// TTL index (auto-delete after 30 days)
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

// Sparse index (only for documents that have the field)
userSchema.index({ optionalField: 1 }, { sparse: true });
```

**PostgreSQL:**
```js
// Create indexes
await pool.query('CREATE INDEX idx_users_email ON users (email)');
await pool.query('CREATE INDEX idx_users_role_status ON users (role, status)');
await pool.query('CREATE UNIQUE INDEX idx_users_email_unique ON users (email)');
await pool.query('CREATE INDEX idx_users_created ON users (created_at DESC)');

// Partial index
await pool.query(
  'CREATE INDEX idx_active_users ON users (last_login) WHERE status = $1', ['active']
);
```

**Query analysis:**
```js
// In MongoDB
const result = await User.find({ email: 'test@test.com' }).explain('executionStats');

// In PostgreSQL
const { rows } = await pool.query('EXPLAIN ANALYZE SELECT * FROM users WHERE email = $1', [email]);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q78. How do you implement pagination in a REST API?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Offset-based pagination (common):**
```js
app.get('/api/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit),
    User.countDocuments()
  ]);

  res.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  });
});
```

**Cursor-based pagination (better for real-time):**
```js
app.get('/api/users', async (req, res) => {
  const cursor = req.query.cursor;  // Last ID from previous page
  const limit = parseInt(req.query.limit) || 20;

  const query = cursor
    ? { _id: { $gt: cursor } }  // Get items after cursor
    : {};

  const users = await User.find(query)
    .sort({ _id: 1 })
    .limit(limit + 1);  // Fetch one extra to check if more exist

  const hasNext = users.length > limit;
  const items = hasNext ? users.slice(0, limit) : users;
  const nextCursor = items[items.length - 1]?._id;

  res.json({
    data: items,
    pagination: {
      nextCursor,
      hasNext,
      limit
    }
  });
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q79. How do you design a RESTful API properly?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**REST API design best practices:**

```js
// 1. Use nouns for resources (not verbs)
// ✅ /users, /orders, /products
// ❌ /getUsers, /createOrder, /getProducts

// 2. Use HTTP methods semantically
app.get('/users', list);        // List
app.post('/users', create);      // Create
app.get('/users/:id', get);      // Read
app.put('/users/:id', update);   // Full update
app.patch('/users/:id', patch);  // Partial update
app.delete('/users/:id', del);   // Delete

// 3. Consistency in naming (plural, kebab-case)
// ✅ /users, /order-items, /user-profiles
// ❌ /user, /OrderItems, /UserProfile

// 4. Versioning
// /api/v1/users, /api/v2/users

// 5. Filtering, sorting, pagination
// GET /api/users?role=admin&status=active&sort=-createdAt&page=1&limit=20

// 6. Proper status codes
res.status(200).json(data);       // OK
res.status(201).json(created);    // Created
res.status(204).send();           // No Content
res.status(400).json(error);      // Bad Request
res.status(404).json(error);      // Not Found
res.status(422).json(errors);     // Validation
res.status(429).json(error);      // Rate Limited

// 7. Consistent error format
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      { "field": "email", "message": "Email must be a valid email address" }
    ]
  }
}

// 8. HATEOAS (Hypermedia links)
res.json({
  data: { id: 1, name: "Alice" },
  _links: {
    self: { href: "/users/1" },
    orders: { href: "/users/1/orders" },
    update: { href: "/users/1", method: "PUT" }
  }
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q80. What is idempotency in REST APIs?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Idempotency** means making the same request multiple times produces the same result as making it once.

| Method | Idempotent? | Behavior |
|--------|-------------|----------|
| **GET** | ✅ Yes | Reading never modifies state |
| **PUT** | ✅ Yes | Same payload produces same state |
| **DELETE** | ✅ Yes | Deleting already deleted resource returns same result |
| **POST** | ❌ No | Creates a new resource each time |
| **PATCH** | ❓ Varies | Can be idempotent if designed that way |

```js
// PUT (idempotent) — full replacement
app.put('/users/:id', async (req, res) => {
  const user = await User.findOneAndReplace(
    { _id: req.params.id },
    req.body,
    { upsert: true }  // Create if doesn't exist
  );
  res.json(user);
  // Same request → same state every time
});

// POST (non-idempotent) — creates new resource
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
  // Same request → creates multiple users!
});

// Idempotency key for POST (payment processing)
app.post('/payments', async (req, res) => {
  const idempotencyKey = req.headers['idempotency-key'];
  if (!idempotencyKey) return res.status(400).json({ error: 'Missing idempotency key' });

  // Check if already processed
  const existing = await Payment.findOne({ idempotencyKey });
  if (existing) return res.json(existing);  // Return cached result

  // Process payment
  const payment = await processPayment(req.body);
  payment.idempotencyKey = idempotencyKey;
  await payment.save();
  res.status(201).json(payment);
});
```

</div>
</details>
