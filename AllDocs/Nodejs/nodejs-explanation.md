# Complete Node.js Guide
## Beginner → Advanced

> 🚀 A premium learning handbook — from zero to production-grade engineer

---

## 📖 Table of Contents

1. [Introduction to Node.js](#section-1-introduction-to-nodejs)
2. [Node.js Architecture](#section-2-nodejs-architecture)
3. [Core Concepts & Built-in Modules](#section-3-core-concepts--built-in-modules)
4. [Async Programming](#section-4-async-programming)
5. [Building APIs](#section-5-building-apis)
6. [Express.js Framework](#section-6-expressjs-framework)
7. [Authentication & Security](#section-7-authentication--security)
8. [Databases](#section-8-databases)
9. [Advanced Node.js](#section-9-advanced-nodejs)
10. [Production Architecture](#section-10-production-architecture)
11. [Design Patterns](#section-11-design-patterns)
12. [Performance Optimization](#section-12-performance-optimization)
13. [Testing](#section-13-testing)
14. [Deployment](#section-14-deployment)
15. [Real-World Project Architecture](#section-15-real-world-project-architecture)
16. [Interview Questions](#section-16-interview-questions)

---

# Section 1: Introduction to Node.js

## 🤔 What is Node.js?

Node.js is a **runtime environment** that lets you run JavaScript code on the **server side** — outside of a web browser.

Think of it this way:
- Before Node.js: JavaScript could only run inside browsers (Chrome, Firefox, Safari)
- After Node.js: JavaScript can now run on a server, read files, talk to databases, handle HTTP requests

> **Simple Analogy**: JavaScript was a fish that could only live in the ocean (browser). Node.js gave it legs to walk on land (server).

---

## ❓ Why Was Node.js Created?

In 2009, **Ryan Dahl** created Node.js to solve a specific problem: **traditional web servers were slow and wasteful when handling many simultaneous connections**.

### The Problem Before Node.js

Imagine a restaurant:

- **Old approach (Apache/PHP)**: Every customer gets a dedicated waiter. If the waiter is waiting for the kitchen (database), he just stands there doing nothing. With 1000 customers, you need 1000 waiters — very expensive!
- **Node.js approach**: One very smart waiter handles all customers. When he places an order and waits for the kitchen, he immediately goes to take another order. When the kitchen is done, he circles back.

### Problems Before Node.js

| Problem | Old Way | Node.js Way |
|---------|---------|-------------|
| High traffic (1M users) | Needed many threads, ate RAM | Single thread handles all requests |
| Slow database queries | Thread blocked, wasted CPU | Non-blocking I/O, thread moves on |
| Real-time features (chat) | Very difficult | Built-in with events |
| Developer context switch | Frontend JS + Backend PHP/Java | One language everywhere |

---

## 🌐 Client vs Server — What's the Difference?

```
CLIENT                          SERVER
┌─────────────────┐            ┌─────────────────────┐
│  Your Browser   │  Request   │   Node.js App       │
│  (Chrome/Safari)│ ────────→  │                     │
│                 │            │  - Handles requests │
│  Shows the UI   │  Response  │  - Talks to DB      │
│  Runs HTML/CSS  │ ←────────  │  - Runs business    │
│  Runs JS in     │            │    logic            │
│  browser        │            │  - Returns data     │
└─────────────────┘            └─────────────────────┘
```

- **Client** = The user's browser. It shows the website.
- **Server** = A computer running Node.js. It processes requests and returns data.

---

## 💻 Frontend vs Backend

| Aspect | Frontend | Backend |
|--------|----------|---------|
| What it is | What users see & interact with | The logic behind the scenes |
| Technologies | HTML, CSS, JavaScript | Node.js, Python, Java, PHP |
| Runs on | User's browser | Server |
| Examples | Facebook's UI, buttons, forms | User authentication, payments, databases |
| Real-world analogy | A restaurant's dining room | The restaurant's kitchen |

---

## 🤔 Why JavaScript on the Server Side?

**Before Node.js**, if you were a JavaScript developer, you had to learn a completely different language (PHP, Java, Python) for the backend. This was painful.

With Node.js:

1. **One language, everywhere** — Use JavaScript on frontend AND backend
2. **Share code** — Validation logic used in UI can also run on server
3. **JSON everywhere** — JavaScript natively handles JSON (the most common data format)
4. **Massive ecosystem** — npm has 2 million+ packages
5. **Fast I/O** — Non-blocking architecture handles huge traffic

> **Real-world example**: Netflix switched from Java to Node.js and their startup time decreased by 70%!

---

## 🏗️ Node.js Runtime Architecture Overview

```svg
<svg width="700" height="380" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="700" height="380" fill="#0f172a" rx="12"/>
  
  <!-- Title -->
  <text x="350" y="32" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold">Node.js Runtime Architecture</text>
  
  <!-- Your Application Layer -->
  <rect x="30" y="50" width="640" height="60" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="350" y="76" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Your Application Code (JavaScript)</text>
  <text x="350" y="97" text-anchor="middle" fill="#64748b" font-size="11">app.js, routes, controllers, services...</text>
  
  <!-- Arrow down -->
  <line x1="350" y1="110" x2="350" y2="130" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- V8 Engine -->
  <rect x="30" y="130" width="300" height="60" fill="#1a3326" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="180" y="156" text-anchor="middle" fill="#86efac" font-size="13" font-weight="bold">V8 Engine (Google)</text>
  <text x="180" y="178" text-anchor="middle" fill="#64748b" font-size="11">Compiles JS to machine code</text>
  
  <!-- libuv -->
  <rect x="370" y="130" width="300" height="60" fill="#2d1a3a" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="520" y="156" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="bold">libuv (C Library)</text>
  <text x="520" y="178" text-anchor="middle" fill="#64748b" font-size="11">Event Loop, Thread Pool, I/O</text>
  
  <!-- Arrow down -->
  <line x1="350" y1="190" x2="350" y2="210" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- Node.js APIs -->
  <rect x="30" y="210" width="640" height="60" fill="#1e293b" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="350" y="236" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold">Node.js Built-in APIs</text>
  <text x="350" y="257" text-anchor="middle" fill="#64748b" font-size="11">fs, http, crypto, path, os, events, stream, buffer...</text>
  
  <!-- Arrow down -->
  <line x1="350" y1="270" x2="350" y2="290" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- OS Layer -->
  <rect x="30" y="290" width="640" height="60" fill="#1a1a2e" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="350" y="316" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Operating System</text>
  <text x="350" y="337" text-anchor="middle" fill="#64748b" font-size="11">Linux / Windows / macOS — File system, Network, Processes</text>
  
  <!-- Arrow definitions -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

# Section 2: Node.js Architecture

## 🔄 Single-Threaded Architecture

Most traditional servers (like Apache) use a **multi-threaded** model — they create a new thread (like a mini-program) for every request. Each thread takes memory (~2MB). So 10,000 concurrent users = 20GB RAM just for threads!

Node.js uses a **single thread** for JavaScript execution. But it's smarter — it uses **non-blocking I/O** so that one thread can handle thousands of requests.

```svg
<svg width="700" height="320" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="320" fill="#0f172a" rx="12"/>
  <text x="350" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Multi-Thread (Old) vs Single-Thread (Node.js)</text>
  
  <!-- Multi-thread side -->
  <rect x="20" y="50" width="310" height="240" fill="#1a1a2e" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="175" y="75" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Traditional Server (Apache)</text>
  
  <!-- Threads -->
  <rect x="40" y="90" width="270" height="30" fill="#2d1a1a" rx="5" stroke="#ef4444" stroke-width="1"/>
  <text x="175" y="110" text-anchor="middle" fill="#fca5a5" font-size="11">Thread 1 → Request A (BLOCKED waiting DB)</text>
  
  <rect x="40" y="130" width="270" height="30" fill="#2d1a1a" rx="5" stroke="#ef4444" stroke-width="1"/>
  <text x="175" y="150" text-anchor="middle" fill="#fca5a5" font-size="11">Thread 2 → Request B (BLOCKED waiting file)</text>
  
  <rect x="40" y="170" width="270" height="30" fill="#2d1a1a" rx="5" stroke="#ef4444" stroke-width="1"/>
  <text x="175" y="190" text-anchor="middle" fill="#fca5a5" font-size="11">Thread 3 → Request C (BLOCKED waiting API)</text>
  
  <rect x="40" y="210" width="270" height="30" fill="#2d1a1a" rx="5" stroke="#ef4444" stroke-width="1"/>
  <text x="175" y="230" text-anchor="middle" fill="#fca5a5" font-size="11">Thread 4 → Request D (BLOCKED...)</text>
  
  <text x="175" y="265" text-anchor="middle" fill="#ef4444" font-size="11">❌ Each thread uses ~2MB RAM</text>
  <text x="175" y="282" text-anchor="middle" fill="#ef4444" font-size="11">10K users = 20GB RAM wasted!</text>

  <!-- Node.js side -->
  <rect x="370" y="50" width="310" height="240" fill="#0f2a1a" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="525" y="75" text-anchor="middle" fill="#86efac" font-size="13" font-weight="bold">Node.js Server</text>
  
  <rect x="390" y="90" width="270" height="55" fill="#1a3326" rx="5" stroke="#22c55e" stroke-width="1"/>
  <text x="525" y="115" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Single Thread (Event Loop)</text>
  <text x="525" y="133" text-anchor="middle" fill="#64748b" font-size="10">Handles all requests, never blocks</text>
  
  <rect x="390" y="158" width="80" height="30" fill="#163b20" rx="4" stroke="#22c55e" stroke-width="1"/>
  <text x="430" y="178" text-anchor="middle" fill="#86efac" font-size="10">Req A</text>
  
  <rect x="480" y="158" width="80" height="30" fill="#163b20" rx="4" stroke="#22c55e" stroke-width="1"/>
  <text x="520" y="178" text-anchor="middle" fill="#86efac" font-size="10">Req B</text>
  
  <rect x="570" y="158" width="80" height="30" fill="#163b20" rx="4" stroke="#22c55e" stroke-width="1"/>
  <text x="610" y="178" text-anchor="middle" fill="#86efac" font-size="10">Req C</text>
  
  <!-- Callbacks complete -->
  <rect x="390" y="200" width="270" height="30" fill="#163b20" rx="5" stroke="#22c55e" stroke-width="1"/>
  <text x="525" y="220" text-anchor="middle" fill="#86efac" font-size="11">Callbacks complete → responds to each</text>
  
  <text x="525" y="265" text-anchor="middle" fill="#22c55e" font-size="11">✅ Single thread, very low memory</text>
  <text x="525" y="282" text-anchor="middle" fill="#22c55e" font-size="11">10K users = handled easily!</text>
</svg>
```

---

## ⚡ Event-Driven Architecture

Node.js is built around **events**. When something happens (a request arrives, a file is read, a database query finishes), an **event** is emitted, and a **listener** (callback function) handles it.

Think of it like a **notification system**:
- You subscribe to notifications: "Tell me when my pizza is ready"
- You go do other things
- When the pizza is ready, your phone buzzes (event fires)
- You handle it (eat the pizza)

---

## 🚫 Blocking vs Non-Blocking I/O

**I/O** = Input/Output operations: reading files, database queries, network requests — anything that involves waiting.

```javascript
// ❌ BLOCKING — The entire program FREEZES here until file is read
const fs = require('fs');
const data = fs.readFileSync('big-file.txt'); // FREEZE for 500ms
console.log(data);
console.log('This prints AFTER the file is read');

// ✅ NON-BLOCKING — Program continues while file reads in background
fs.readFile('big-file.txt', (err, data) => {
  // This callback runs LATER when file is ready
  console.log(data);
});
console.log('This prints IMMEDIATELY, without waiting!');
```

> **Real-world analogy**: Blocking is like standing in a coffee queue and refusing to do anything until you get your coffee. Non-blocking is placing your order and sitting down to work — you get notified when coffee is ready.

---

## 🔁 The Event Loop — The Heart of Node.js

The **Event Loop** is the mechanism that makes Node.js non-blocking. It constantly checks: "Is there anything to do?" and executes tasks one by one.

```svg
<svg width="700" height="500" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="500" fill="#0f172a" rx="12"/>
  <text x="350" y="32" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold">Node.js Event Loop Architecture</text>

  <!-- Call Stack -->
  <rect x="20" y="55" width="160" height="200" fill="#1e293b" rx="8" stroke="#3b82f6" stroke-width="2"/>
  <text x="100" y="78" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">Call Stack</text>
  <text x="100" y="94" text-anchor="middle" fill="#64748b" font-size="10">(JS execution)</text>
  <rect x="30" y="103" width="140" height="25" fill="#1e3a5f" rx="3" stroke="#3b82f6" stroke-width="1"/>
  <text x="100" y="120" text-anchor="middle" fill="#93c5fd" font-size="10">main()</text>
  <rect x="30" y="133" width="140" height="25" fill="#1e3a5f" rx="3" stroke="#3b82f6" stroke-width="1"/>
  <text x="100" y="150" text-anchor="middle" fill="#93c5fd" font-size="10">readFile()</text>
  <rect x="30" y="163" width="140" height="25" fill="#1e3a5f" rx="3" stroke="#3b82f6" stroke-width="1"/>
  <text x="100" y="180" text-anchor="middle" fill="#93c5fd" font-size="10">console.log()</text>

  <!-- Event Loop phases circle -->
  <circle cx="350" cy="240" r="130" fill="none" stroke="#334155" stroke-width="2"/>
  <circle cx="350" cy="240" r="100" fill="#1e293b" stroke="#1e3a5f" stroke-width="1"/>
  
  <!-- Phase labels around circle -->
  <!-- Timers - top -->
  <rect x="300" y="82" width="100" height="36" fill="#1a3326" rx="6" stroke="#22c55e" stroke-width="1.5"/>
  <text x="350" y="96" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Timers</text>
  <text x="350" y="112" text-anchor="middle" fill="#4ade80" font-size="9">setTimeout / setInterval</text>
  
  <!-- I/O - right-top -->
  <rect x="480" y="130" width="100" height="36" fill="#1a1a3a" rx="6" stroke="#6366f1" stroke-width="1.5"/>
  <text x="530" y="144" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">Pending I/O</text>
  <text x="530" y="160" text-anchor="middle" fill="#818cf8" font-size="9">I/O error callbacks</text>
  
  <!-- Poll - right -->
  <rect x="510" y="222" width="100" height="36" fill="#2d1a1a" rx="6" stroke="#ef4444" stroke-width="1.5"/>
  <text x="560" y="236" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Poll</text>
  <text x="560" y="252" text-anchor="middle" fill="#f87171" font-size="9">Retrieve new I/O events</text>
  
  <!-- Check - right-bottom -->
  <rect x="470" y="320" width="100" height="36" fill="#2d2a1a" rx="6" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="520" y="334" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Check</text>
  <text x="520" y="350" text-anchor="middle" fill="#fbbf24" font-size="9">setImmediate callbacks</text>
  
  <!-- Close Callbacks - bottom -->
  <rect x="300" y="370" width="100" height="36" fill="#2a1a3a" rx="6" stroke="#a855f7" stroke-width="1.5"/>
  <text x="350" y="384" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">Close CBS</text>
  <text x="350" y="400" text-anchor="middle" fill="#c084fc" font-size="9">socket.on('close',...)</text>
  
  <!-- Idle/Prepare - left-bottom -->
  <rect x="120" y="320" width="100" height="36" fill="#1a2a3a" rx="6" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="170" y="334" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Idle/Prepare</text>
  <text x="170" y="350" text-anchor="middle" fill="#38bdf8" font-size="9">Internal use only</text>

  <!-- Center text -->
  <text x="350" y="232" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">EVENT</text>
  <text x="350" y="252" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">LOOP</text>
  
  <!-- Rotation arrows around circle -->
  <path d="M 350 112 A 128 128 0 0 1 475 168" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrSmall)"/>
  <path d="M 480 240 A 128 128 0 0 1 440 356" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrSmall)"/>
  <path d="M 350 368 A 128 128 0 0 1 225 310" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrSmall)"/>
  <path d="M 222 240 A 128 128 0 0 1 262 120" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrSmall)"/>

  <!-- Microtask queue -->
  <rect x="20" y="280" width="160" height="80" fill="#1e293b" rx="8" stroke="#f59e0b" stroke-width="2"/>
  <text x="100" y="298" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Microtask Queue</text>
  <text x="100" y="314" text-anchor="middle" fill="#64748b" font-size="9">Runs between EVERY phase</text>
  <text x="100" y="332" text-anchor="middle" fill="#fb923c" font-size="10">• process.nextTick()</text>
  <text x="100" y="348" text-anchor="middle" fill="#fb923c" font-size="10">• Promise.then()</text>
  
  <!-- Thread Pool -->
  <rect x="520" y="50" width="160" height="120" fill="#1e293b" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="600" y="72" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">Thread Pool (libuv)</text>
  <text x="600" y="88" text-anchor="middle" fill="#64748b" font-size="9">4 threads by default</text>
  <rect x="535" y="98" width="60" height="22" fill="#2d1a3a" rx="3" stroke="#a855f7" stroke-width="1"/>
  <text x="565" y="114" text-anchor="middle" fill="#d8b4fe" font-size="9">Thread 1</text>
  <rect x="605" y="98" width="60" height="22" fill="#2d1a3a" rx="3" stroke="#a855f7" stroke-width="1"/>
  <text x="635" y="114" text-anchor="middle" fill="#d8b4fe" font-size="9">Thread 2</text>
  <rect x="535" y="128" width="60" height="22" fill="#2d1a3a" rx="3" stroke="#a855f7" stroke-width="1"/>
  <text x="565" y="144" text-anchor="middle" fill="#d8b4fe" font-size="9">Thread 3</text>
  <rect x="605" y="128" width="60" height="22" fill="#2d1a3a" rx="3" stroke="#a855f7" stroke-width="1"/>
  <text x="635" y="144" text-anchor="middle" fill="#d8b4fe" font-size="9">Thread 4</text>
  <text x="600" y="165" text-anchor="middle" fill="#94a3b8" font-size="9">fs, crypto, DNS, zlib</text>

  <defs>
    <marker id="arrSmall" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

### 🔢 Event Loop Phases Explained

The Event Loop runs through these phases continuously:

| Phase | What Happens | Example |
|-------|-------------|---------|
| **Timers** | Runs expired `setTimeout` and `setInterval` callbacks | `setTimeout(() => {}, 0)` |
| **Pending I/O** | Handles I/O callbacks from previous loop | Error callbacks |
| **Idle/Prepare** | Internal use only | — |
| **Poll** | Gets new I/O events, runs their callbacks | File read complete, HTTP response received |
| **Check** | Runs `setImmediate` callbacks | `setImmediate(() => {})` |
| **Close Callbacks** | Handles closed connections | `socket.on('close', ...)` |

**Important:** Between every phase, Node.js checks the **Microtask Queue** (process.nextTick + Promises) and runs them ALL before moving to next phase.

### 🔑 Priority Order

```
process.nextTick()     ← Highest priority (runs before anything else)
Promise.then()         ← Second priority
setTimeout(fn, 0)      ← Third
setImmediate()         ← After I/O
```

```javascript
console.log('1 - Start');

setTimeout(() => console.log('4 - setTimeout'), 0);

Promise.resolve().then(() => console.log('3 - Promise'));

process.nextTick(() => console.log('2 - nextTick'));

console.log('5 - End');

// Output:
// 1 - Start
// 5 - End
// 2 - nextTick     (microtask, runs first)
// 3 - Promise      (microtask, runs second)
// 4 - setTimeout   (timer phase)
```

---

# Section 3: Core Concepts & Built-in Modules

## 📦 Modules

Modules are how you split your Node.js code into separate files and reuse them.

### CommonJS (The Original Node.js Way)

Every file in Node.js is a module. By default, variables and functions are **private** to that file.

```javascript
// math.js — creating a module
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Export what you want to share
module.exports = { add, multiply };

// Or export one thing
module.exports = add;
```

```javascript
// app.js — using the module
const math = require('./math');         // Import relative path
console.log(math.add(5, 3));           // 8
console.log(math.multiply(4, 3));      // 12

// Or destructure
const { add, multiply } = require('./math');
```

### ES Modules (Modern Way — used in frontend too)

```javascript
// math.mjs (or set "type": "module" in package.json)

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export default class Calculator {
  // ...
}
```

```javascript
// app.mjs
import Calculator, { add, multiply } from './math.mjs';
import fs from 'fs'; // Node.js built-in
```

### CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| When | Runtime | Parse time (static) |
| Tree shaking | ❌ No | ✅ Yes |
| Default in Node.js | ✅ Yes | Needs `"type":"module"` |
| Default in browser | ❌ No | ✅ Yes |

---

## 📁 File System Module (`fs`)

The `fs` module lets you interact with the file system — read files, write files, create directories, etc.

**Used in**: Log files, configuration files, data processing pipelines

```javascript
const fs = require('fs');
const path = require('path');

// ─── READ FILE ───────────────────────────────────────

// Async (NON-BLOCKING) — recommended
fs.readFile('data.txt', 'utf8', (err, content) => {
  if (err) {
    console.error('Error reading file:', err.message);
    return;
  }
  console.log(content);
});

// Promise-based (modern, recommended)
const fsPromises = require('fs').promises;

async function readData() {
  try {
    const content = await fsPromises.readFile('data.txt', 'utf8');
    console.log(content);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// ─── WRITE FILE ──────────────────────────────────────

async function writeData() {
  await fsPromises.writeFile('output.txt', 'Hello World!');
  // Append instead of overwrite:
  await fsPromises.appendFile('log.txt', 'New log entry\n');
}

// ─── DIRECTORY OPERATIONS ────────────────────────────

async function dirOps() {
  await fsPromises.mkdir('new-folder', { recursive: true });
  const files = await fsPromises.readdir('./');
  console.log('Files:', files);
  await fsPromises.rename('old.txt', 'new.txt');
  await fsPromises.unlink('delete-me.txt');
}
```

### ⚠️ Common Mistakes

```javascript
// ❌ WRONG: Using sync methods in a server (blocks everything!)
app.get('/data', (req, res) => {
  const data = fs.readFileSync('huge-file.json'); // BLOCKS entire server!
  res.send(data);
});

// ✅ CORRECT: Use async methods
app.get('/data', async (req, res) => {
  const data = await fsPromises.readFile('huge-file.json', 'utf8');
  res.send(data);
});
```

---

## 🌊 Streams

Streams are one of Node.js's most powerful features. Instead of loading an entire file into memory, streams process data **chunk by chunk**.

**Why streams?** Imagine you need to send a 10GB video file to a user. Without streams, you'd load 10GB into RAM first — your server would crash. With streams, you send it piece by piece.

**Used in**: Netflix video streaming, file uploads/downloads, log processing

```svg
<svg width="700" height="180" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="180" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Stream Flow: File → Transform → Response</text>
  
  <!-- Source -->
  <rect x="20" y="55" width="130" height="70" fill="#1a3326" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="85" y="80" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">Readable</text>
  <text x="85" y="97" text-anchor="middle" fill="#86efac" font-size="11">Stream</text>
  <text x="85" y="113" text-anchor="middle" fill="#4ade80" font-size="10">(e.g. fs.createReadStream)</text>

  <!-- Arrow with chunks -->
  <line x1="152" y1="90" x2="210" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="181" y="80" text-anchor="middle" fill="#64748b" font-size="9">chunks</text>
  
  <!-- Transform -->
  <rect x="210" y="55" width="130" height="70" fill="#2d2a1a" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="275" y="80" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold">Transform</text>
  <text x="275" y="97" text-anchor="middle" fill="#fcd34d" font-size="11">Stream</text>
  <text x="275" y="113" text-anchor="middle" fill="#fbbf24" font-size="10">(e.g. zlib.createGzip)</text>

  <line x1="342" y1="90" x2="400" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="371" y="80" text-anchor="middle" fill="#64748b" font-size="9">chunks</text>
  
  <!-- Passthrough / Another Transform -->
  <rect x="400" y="55" width="130" height="70" fill="#1a1a3a" rx="8" stroke="#6366f1" stroke-width="1.5"/>
  <text x="465" y="80" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="bold">Writable</text>
  <text x="465" y="97" text-anchor="middle" fill="#a5b4fc" font-size="11">Stream</text>
  <text x="465" y="113" text-anchor="middle" fill="#818cf8" font-size="10">(e.g. res / fs.createWriteStream)</text>

  <line x1="532" y1="90" x2="590" y2="90" stroke="#475569" stroke-width="2" marker-end="url(#arr2)"/>
  
  <!-- Client -->
  <rect x="590" y="65" width="90" height="50" fill="#1e293b" rx="8" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="635" y="87" text-anchor="middle" fill="#e2e8f0" font-size="12">Client</text>
  <text x="635" y="103" text-anchor="middle" fill="#64748b" font-size="10">receives data</text>
  
  <!-- Memory label -->
  <text x="350" y="155" text-anchor="middle" fill="#22c55e" font-size="11">✅ Memory stays LOW — only one chunk loaded at a time!</text>

  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

```javascript
const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

// Without Streams ❌ — loads entire file into memory
http.createServer((req, res) => {
  fs.readFile('video.mp4', (err, data) => {
    res.end(data); // Reads ENTIRE file into RAM!
  });
});

// With Streams ✅ — memory efficient
http.createServer((req, res) => {
  const readStream = fs.createReadStream('video.mp4');
  const gzip = zlib.createGzip();
  
  res.setHeader('Content-Encoding', 'gzip');
  readStream.pipe(gzip).pipe(res); // Stream chunk by chunk!
});
```

### Types of Streams

| Type | Description | Example |
|------|-------------|---------|
| **Readable** | You can read data from it | `fs.createReadStream()`, `http.IncomingMessage` |
| **Writable** | You can write data to it | `fs.createWriteStream()`, `http.ServerResponse` |
| **Duplex** | Both readable and writable | `net.Socket` (TCP socket) |
| **Transform** | Duplex that modifies data | `zlib.createGzip()`, `crypto.createCipher()` |

---

## 🔔 Events Module

Node.js is event-driven. The `EventEmitter` class lets you create, fire, and listen to custom events.

**Used in**: All of Node.js internals, real-time features, pub/sub patterns

```javascript
const EventEmitter = require('events');

// Create an event emitter
class OrderSystem extends EventEmitter {
  placeOrder(item) {
    console.log(`Order placed: ${item}`);
    this.emit('orderPlaced', { item, time: new Date() });
  }
  
  completeOrder(item) {
    this.emit('orderCompleted', { item });
  }
}

const orders = new OrderSystem();

// Subscribe to events (listen for notifications)
orders.on('orderPlaced', (data) => {
  console.log(`📧 Send email for: ${data.item}`);
});

orders.on('orderPlaced', (data) => {
  console.log(`📦 Notify warehouse about: ${data.item}`);
});

orders.on('orderCompleted', (data) => {
  console.log(`✅ Order done: ${data.item}`);
});

// Fire events
orders.placeOrder('iPhone 15');
// Output:
// Order placed: iPhone 15
// 📧 Send email for: iPhone 15
// 📦 Notify warehouse about: iPhone 15
```

---

## 🧮 Buffer

A **Buffer** is a chunk of raw binary data — like a temporary storage area for bytes. Used when dealing with binary data (images, videos, network packets).

```javascript
// Create buffers
const buf1 = Buffer.from('Hello World');           // From string
const buf2 = Buffer.from([72, 101, 108, 108, 111]); // From byte array
const buf3 = Buffer.alloc(10);                      // 10 bytes, filled with zeros

// Convert
console.log(buf1.toString('utf8'));   // 'Hello World'
console.log(buf1.toString('base64')); // 'SGVsbG8gV29ybGQ='
console.log(buf1.toString('hex'));    // '48656c6c6f20576f726c64'

// Buffer length
console.log(buf1.length); // 11

// Concatenate buffers
const combined = Buffer.concat([buf1, buf2]);
```

---

## 🛣️ Path Module

```javascript
const path = require('path');

// Different OS uses different separators
// Windows: C:\Users\file.txt
// Linux/Mac: /home/user/file.txt
// path module handles this automatically!

path.join('/user', 'data', 'file.txt');     // /user/data/file.txt
path.resolve('folder', 'file.txt');          // Absolute path from CWD
path.dirname('/user/data/file.txt');         // '/user/data'
path.basename('/user/data/file.txt');        // 'file.txt'
path.extname('file.txt');                    // '.txt'

// __dirname is current directory, __filename is current file
const absolutePath = path.join(__dirname, 'templates', 'email.html');
```

---

## 💻 OS Module

```javascript
const os = require('os');

os.platform();    // 'linux', 'win32', 'darwin'
os.arch();        // 'x64', 'arm64'
os.cpus();        // Array of CPU info
os.totalmem();    // Total RAM in bytes
os.freemem();     // Free RAM in bytes
os.hostname();    // Machine hostname
os.homedir();     // '/home/user'
os.uptime();      // System uptime in seconds

// Useful for scaling decisions!
const cpuCount = os.cpus().length;
console.log(`Server has ${cpuCount} CPUs — spawn ${cpuCount} workers`);
```

---

## 🌐 URL Module

```javascript
const { URL } = require('url');

const url = new URL('https://shop.amazon.com/products?category=electronics&page=2#results');

url.protocol;  // 'https:'
url.hostname;  // 'shop.amazon.com'
url.pathname;  // '/products'
url.search;    // '?category=electronics&page=2'
url.hash;      // '#results'

// Search params
url.searchParams.get('category');   // 'electronics'
url.searchParams.get('page');       // '2'
url.searchParams.set('page', '3');
url.searchParams.append('sort', 'price');
```

---

# Section 4: Async Programming

Async programming is how Node.js handles operations that take time (file reading, database queries, API calls) **without blocking** the rest of the program.

```svg
<svg width="700" height="260" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="260" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">Evolution of Async Programming in JavaScript</text>

  <!-- 1990s to present timeline -->
  <line x1="50" y1="90" x2="650" y2="90" stroke="#334155" stroke-width="2"/>
  
  <!-- Callbacks -->
  <circle cx="130" cy="90" r="20" fill="#2d1a1a" stroke="#ef4444" stroke-width="2"/>
  <text x="130" y="96" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">1</text>
  <rect x="70" y="120" width="120" height="80" fill="#1e293b" rx="6" stroke="#ef4444" stroke-width="1"/>
  <text x="130" y="140" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Callbacks</text>
  <text x="130" y="157" text-anchor="middle" fill="#64748b" font-size="10">2010 era</text>
  <text x="130" y="174" text-anchor="middle" fill="#64748b" font-size="9">Simple but leads</text>
  <text x="130" y="190" text-anchor="middle" fill="#64748b" font-size="9">to "callback hell"</text>

  <!-- Promises -->
  <circle cx="330" cy="90" r="20" fill="#1a3326" stroke="#22c55e" stroke-width="2"/>
  <text x="330" y="96" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">2</text>
  <rect x="270" y="120" width="120" height="80" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1"/>
  <text x="330" y="140" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Promises</text>
  <text x="330" y="157" text-anchor="middle" fill="#64748b" font-size="10">ES6 (2015)</text>
  <text x="330" y="174" text-anchor="middle" fill="#64748b" font-size="9">Chainable, better</text>
  <text x="330" y="190" text-anchor="middle" fill="#64748b" font-size="9">error handling</text>

  <!-- Async/Await -->
  <circle cx="530" cy="90" r="20" fill="#1a1a3a" stroke="#6366f1" stroke-width="2"/>
  <text x="530" y="96" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">3</text>
  <rect x="470" y="120" width="120" height="80" fill="#1e293b" rx="6" stroke="#6366f1" stroke-width="1"/>
  <text x="530" y="140" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">Async/Await</text>
  <text x="530" y="157" text-anchor="middle" fill="#64748b" font-size="10">ES8 (2017)</text>
  <text x="530" y="174" text-anchor="middle" fill="#64748b" font-size="9">Reads like sync</text>
  <text x="530" y="190" text-anchor="middle" fill="#64748b" font-size="9">code. Best practice!</text>
  
  <text x="350" y="235" text-anchor="middle" fill="#22c55e" font-size="11">✅ Modern Node.js: Always use Async/Await (built on Promises)</text>
</svg>
```

## 1️⃣ Callbacks

A **callback** is a function passed as an argument to another function, to be called when the operation completes.

```javascript
// Simple callback example
function getUserFromDB(userId, callback) {
  // Simulate database query (takes 100ms)
  setTimeout(() => {
    const user = { id: userId, name: 'John', email: 'john@example.com' };
    callback(null, user);  // Convention: first arg is error, second is result
  }, 100);
}

getUserFromDB(1, (err, user) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('User:', user);
});
```

### 😱 Callback Hell (Pyramid of Doom)

When you nest many callbacks, the code becomes **impossible to read and maintain**:

```javascript
// Real-world example: Login user, get their profile, get their orders, send email
loginUser(credentials, (err, user) => {
  if (err) return handleError(err);
  
  getUserProfile(user.id, (err, profile) => {
    if (err) return handleError(err);
    
    getUserOrders(user.id, (err, orders) => {
      if (err) return handleError(err);
      
      sendWelcomeEmail(user.email, (err, result) => {
        if (err) return handleError(err);
        
        updateLoginTime(user.id, (err) => {
          if (err) return handleError(err);
          
          // We're 5 levels deep! 😱
          res.json({ user, profile, orders });
        });
      });
    });
  });
});
```

---

## 2️⃣ Promises

A **Promise** is an object representing the eventual completion (or failure) of an async operation.

Think of it like: "I promise to give you the data. I'm either Pending, Fulfilled, or Rejected."

```javascript
// Creating a Promise
function getUserFromDB(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject(new Error('User ID is required'));
        return;
      }
      const user = { id: userId, name: 'John' };
      resolve(user);  // Success!
    }, 100);
  });
}

// Using a Promise
getUserFromDB(1)
  .then(user => {
    console.log('Got user:', user);
    return getUserOrders(user.id); // Return another promise!
  })
  .then(orders => {
    console.log('Got orders:', orders);
  })
  .catch(err => {
    console.error('Error:', err.message);
  })
  .finally(() => {
    console.log('Done (runs always)');
  });

// Promise combinators
const p1 = fetchUser(1);
const p2 = fetchOrders(1);
const p3 = fetchProfile(1);

// Run ALL in parallel
Promise.all([p1, p2, p3]).then(([user, orders, profile]) => {
  console.log({ user, orders, profile });
});

// Get the FIRST one that resolves
Promise.race([p1, p2, p3]).then(first => {
  console.log('Fastest:', first);
});

// Wait for ALL (even if some fail)
Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(r => {
    if (r.status === 'fulfilled') console.log('✅', r.value);
    else console.log('❌', r.reason);
  });
});
```

---

## 3️⃣ Async/Await (Modern — Use This!)

`async/await` is syntactic sugar over Promises — it makes async code look like synchronous code. Much easier to read!

```javascript
// Same login flow from callback hell — now clean!
async function loginFlow(credentials) {
  try {
    const user = await loginUser(credentials);
    const profile = await getUserProfile(user.id);
    const orders = await getUserOrders(user.id);
    await sendWelcomeEmail(user.email);
    await updateLoginTime(user.id);
    
    return { user, profile, orders }; // Clean!
    
  } catch (err) {
    console.error('Login flow error:', err.message);
    throw err;
  }
}

// Run multiple things in PARALLEL (don't await one by one if independent!)
async function getDashboardData(userId) {
  // ❌ SLOW — waits for each one sequentially
  // const user = await getUser(userId);
  // const orders = await getOrders(userId);
  // const notifications = await getNotifications(userId);

  // ✅ FAST — runs all in parallel
  const [user, orders, notifications] = await Promise.all([
    getUser(userId),
    getOrders(userId),
    getNotifications(userId)
  ]);
  
  return { user, orders, notifications };
}
```

### Best Practices

```javascript
// ✅ Always use try/catch in async functions
async function fetchData() {
  try {
    const data = await someAsyncOperation();
    return data;
  } catch (err) {
    // Handle error properly
    logger.error('fetchData failed:', err);
    throw err; // Re-throw if caller needs to handle it
  }
}

// ✅ Don't forget await!
async function badExample() {
  const data = fetchData(); // ❌ Missing await! data is a Promise, not the value!
  const data2 = await fetchData(); // ✅ Correct
}

// ✅ Handle errors at the right level
async function routeHandler(req, res) {
  try {
    const result = await processRequest(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
```

---

# Section 5: Building APIs

## 🌐 What is a REST API?

An **API** (Application Programming Interface) is a way for different software systems to communicate. A **REST API** is a specific style that uses HTTP.

> **Real-world analogy**: A restaurant menu is an API. You (client) look at the menu (API docs), place an order (make a request), and the kitchen (server) prepares and returns your food (response).

```svg
<svg width="700" height="260" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="260" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">REST API Request Lifecycle</text>

  <!-- Client -->
  <rect x="20" y="55" width="110" height="150" fill="#1e293b" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="80" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">CLIENT</text>
  <text x="75" y="100" text-anchor="middle" fill="#64748b" font-size="10">React App</text>
  <text x="75" y="118" text-anchor="middle" fill="#64748b" font-size="10">Mobile App</text>
  <text x="75" y="136" text-anchor="middle" fill="#64748b" font-size="10">Third-party</text>
  <text x="75" y="185" text-anchor="middle" fill="#3b82f6" font-size="10">HTTP Request</text>

  <!-- Arrow 1 -->
  <line x1="132" y1="130" x2="175" y2="130" stroke="#3b82f6" stroke-width="2" marker-end="url(#a3)"/>
  <text x="155" y="120" text-anchor="middle" fill="#64748b" font-size="9">POST /login</text>
  
  <!-- Middleware Stack -->
  <rect x="175" y="55" width="120" height="150" fill="#1e293b" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="235" y="78" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold">MIDDLEWARE</text>
  <rect x="185" y="88" width="100" height="22" fill="#2d2a1a" rx="4" stroke="#f59e0b" stroke-width="1"/>
  <text x="235" y="104" text-anchor="middle" fill="#fbbf24" font-size="10">Auth check</text>
  <rect x="185" y="115" width="100" height="22" fill="#2d2a1a" rx="4" stroke="#f59e0b" stroke-width="1"/>
  <text x="235" y="131" text-anchor="middle" fill="#fbbf24" font-size="10">Rate limit</text>
  <rect x="185" y="142" width="100" height="22" fill="#2d2a1a" rx="4" stroke="#f59e0b" stroke-width="1"/>
  <text x="235" y="158" text-anchor="middle" fill="#fbbf24" font-size="10">Validate body</text>
  <rect x="185" y="169" width="100" height="22" fill="#2d2a1a" rx="4" stroke="#f59e0b" stroke-width="1"/>
  <text x="235" y="185" text-anchor="middle" fill="#fbbf24" font-size="10">Log request</text>
  
  <!-- Arrow 2 -->
  <line x1="297" y1="130" x2="335" y2="130" stroke="#22c55e" stroke-width="2" marker-end="url(#a3)"/>
  
  <!-- Route Handler -->
  <rect x="335" y="55" width="120" height="150" fill="#1e293b" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="395" y="78" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">CONTROLLER</text>
  <text x="395" y="100" text-anchor="middle" fill="#64748b" font-size="10">loginController()</text>
  <rect x="345" y="110" width="100" height="22" fill="#1a3326" rx="4" stroke="#22c55e" stroke-width="1"/>
  <text x="395" y="126" text-anchor="middle" fill="#4ade80" font-size="10">Parse request</text>
  <rect x="345" y="137" width="100" height="22" fill="#1a3326" rx="4" stroke="#22c55e" stroke-width="1"/>
  <text x="395" y="153" text-anchor="middle" fill="#4ade80" font-size="10">Call service</text>
  <rect x="345" y="164" width="100" height="22" fill="#1a3326" rx="4" stroke="#22c55e" stroke-width="1"/>
  <text x="395" y="180" text-anchor="middle" fill="#4ade80" font-size="10">Return response</text>
  
  <!-- Arrow 3 -->
  <line x1="457" y1="130" x2="495" y2="130" stroke="#a855f7" stroke-width="2" marker-end="url(#a3)"/>
  
  <!-- Database -->
  <rect x="495" y="55" width="180" height="150" fill="#1e293b" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="585" y="78" text-anchor="middle" fill="#d8b4fe" font-size="12" font-weight="bold">SERVICE + DATABASE</text>
  <rect x="510" y="88" width="150" height="35" fill="#2d1a3a" rx="4" stroke="#a855f7" stroke-width="1"/>
  <text x="585" y="103" text-anchor="middle" fill="#c084fc" font-size="10">AuthService.login()</text>
  <text x="585" y="117" text-anchor="middle" fill="#c084fc" font-size="9">bcrypt.compare(password)</text>
  <rect x="510" y="130" width="150" height="35" fill="#2d1a3a" rx="4" stroke="#a855f7" stroke-width="1"/>
  <text x="585" y="145" text-anchor="middle" fill="#c084fc" font-size="10">MongoDB / PostgreSQL</text>
  <text x="585" y="160" text-anchor="middle" fill="#c084fc" font-size="9">db.users.findOne({email})</text>
  <rect x="510" y="172" width="150" height="22" fill="#2d1a3a" rx="4" stroke="#22c55e" stroke-width="1"/>
  <text x="585" y="187" text-anchor="middle" fill="#86efac" font-size="9">Returns JWT token ✅</text>

  <text x="350" y="235" text-anchor="middle" fill="#94a3b8" font-size="10">Response flows back: Database → Controller → Client with HTTP status code</text>

  <defs>
    <marker id="a3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

## 📋 HTTP Methods

| Method | Purpose | Example | Body? |
|--------|---------|---------|-------|
| `GET` | Retrieve data | `GET /users` | ❌ No |
| `POST` | Create new data | `POST /users` | ✅ Yes |
| `PUT` | Replace entire resource | `PUT /users/1` | ✅ Yes |
| `PATCH` | Update part of resource | `PATCH /users/1` | ✅ Yes |
| `DELETE` | Delete resource | `DELETE /users/1` | ❌ No |

---

## 📊 HTTP Status Codes

| Range | Category | Common Codes |
|-------|----------|-------------|
| 2xx | ✅ Success | 200 OK, 201 Created, 204 No Content |
| 3xx | ↩️ Redirect | 301 Moved, 304 Not Modified |
| 4xx | ❌ Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | 💥 Server Error | 500 Internal Error, 502 Bad Gateway, 503 Service Unavailable |

---

## 🏗️ Building a Raw HTTP Server

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  
  // Set response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
  
  // Router
  if (path === '/health' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'OK', uptime: process.uptime() }));
  
  } else if (path === '/users' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify([{ id: 1, name: 'Alice' }]));
  
  } else if (path === '/users' && method === 'POST') {
    let body = '';
    
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const user = JSON.parse(body);
      res.writeHead(201);
      res.end(JSON.stringify({ id: 2, ...user }));
    });
  
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
```

---

# Section 6: Express.js Framework

## 🤔 Why Express?

The built-in `http` module works, but it's very **low-level**. Every little thing (parsing JSON body, routing, error handling) requires manual code. **Express.js** is a minimal, flexible framework that handles all of this for you.

| Feature | Raw `http` | Express.js |
|---------|-----------|------------|
| Routing | Manual if/else | `app.get('/path', handler)` |
| JSON parsing | Manual `req.on('data')` | `express.json()` middleware |
| Serving static files | Custom logic | `express.static('public')` |
| Error handling | Manual try/catch everywhere | Global error middleware |
| Middleware | DIY | Built-in + 3rd party ecosystem |

---

## 🚀 Express Basics

```javascript
const express = require('express');
const app = express();

// ─── MIDDLEWARE ─────────────────────────────────────
app.use(express.json());              // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// Custom middleware (runs for every request)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next(); // IMPORTANT: call next() to pass to next middleware/route
});

// ─── ROUTES ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;          // URL params: /users/123
  const { page, limit } = req.query;  // Query strings: ?page=1&limit=10
  res.json({ id, page, limit });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;   // Request body (JSON)
  res.status(201).json({ id: 1, name, email });
});

// ─── ERROR HANDLER ───────────────────────────────────
// Must have 4 parameters!
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(3000, () => console.log('🚀 Running on port 3000'));
```

---

## 🗂️ Professional Express Folder Structure

```
project/
│
├── src/
│   ├── controllers/          # Handle HTTP req/res
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── product.controller.js
│   │
│   ├── routes/               # Define URL paths
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── index.js          # Combine all routes
│   │
│   ├── services/             # Business logic
│   │   ├── auth.service.js
│   │   └── user.service.js
│   │
│   ├── middleware/           # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── validate.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── models/               # Database schemas/models
│   │   ├── User.model.js
│   │   └── Product.model.js
│   │
│   ├── utils/                # Utility functions
│   │   ├── logger.js
│   │   ├── email.js
│   │   └── helpers.js
│   │
│   ├── config/               # Configuration
│   │   ├── database.js
│   │   └── env.js
│   │
│   └── app.js                # Express app setup
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env                      # Environment variables (never commit!)
├── .env.example              # Template for .env
├── .gitignore
├── package.json
└── server.js                 # Entry point
```

---

## 🔌 Middleware Deep Dive

Middleware functions are the backbone of Express. They run in sequence for every request.

```javascript
// Middleware = (req, res, next) => { ... }
// next() passes to next middleware
// Not calling next() STOPS the chain

// 1. APPLICATION-LEVEL middleware (runs for all routes)
app.use(express.json());
app.use(cors());
app.use(helmet());

// 2. ROUTE-LEVEL middleware (runs for specific routes)
app.get('/admin', requireAdmin, (req, res) => { ... });
app.post('/users', validateBody, sanitize, createUser);

// 3. ERROR-HANDLING middleware (4 params)
app.use((err, req, res, next) => { ... });

// Custom auth middleware example
const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request object
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Use it
app.get('/profile', requireAuth, (req, res) => {
  res.json(req.user); // User attached by middleware
});
```

---

## 📁 Express Router

```javascript
// routes/user.routes.js
const router = express.Router();

router.get('/', getUsers);         // GET /users
router.post('/', createUser);      // POST /users
router.get('/:id', getUser);       // GET /users/123
router.put('/:id', updateUser);    // PUT /users/123
router.delete('/:id', deleteUser); // DELETE /users/123

module.exports = router;

// app.js
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
```

---

# Section 7: Authentication & Security

## 🔐 JWT (JSON Web Tokens)

**JWT** is a compact, URL-safe token format used to securely transmit information between parties.

### Structure of a JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9    ← Header (base64)
.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ  ← Payload (base64)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Signature (HMAC)
```

```svg
<svg width="700" height="300" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="300" fill="#0f172a" rx="12"/>
  <text x="350" y="30" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">JWT Authentication Flow</text>

  <!-- Step 1 -->
  <rect x="20" y="50" width="160" height="60" fill="#1e293b" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="100" y="73" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">1. Login Request</text>
  <text x="100" y="91" text-anchor="middle" fill="#64748b" font-size="10">POST /auth/login</text>
  <text x="100" y="104" text-anchor="middle" fill="#64748b" font-size="9">{ email, password }</text>
  
  <line x1="182" y1="80" x2="220" y2="80" stroke="#475569" stroke-width="1.5" marker-end="url(#a4)"/>
  
  <!-- Step 2 -->
  <rect x="220" y="50" width="160" height="60" fill="#1e293b" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="300" y="73" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">2. Verify Password</text>
  <text x="300" y="91" text-anchor="middle" fill="#64748b" font-size="10">bcrypt.compare()</text>
  <text x="300" y="104" text-anchor="middle" fill="#64748b" font-size="9">Check DB</text>
  
  <line x1="382" y1="80" x2="420" y2="80" stroke="#475569" stroke-width="1.5" marker-end="url(#a4)"/>
  
  <!-- Step 3 -->
  <rect x="420" y="50" width="160" height="60" fill="#1e293b" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="500" y="73" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold">3. Create JWT</text>
  <text x="500" y="91" text-anchor="middle" fill="#64748b" font-size="10">jwt.sign(payload,</text>
  <text x="500" y="104" text-anchor="middle" fill="#64748b" font-size="9">secret, { expiresIn })</text>

  <!-- Arrow back to client -->
  <path d="M 610 80 Q 650 80 650 150 Q 650 230 610 230" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="5"/>
  <line x1="610" y1="230" x2="180" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#a4)" stroke-dasharray="5"/>
  <text x="600" y="165" fill="#64748b" font-size="9" text-anchor="middle">JWT Token</text>
  <text x="600" y="178" fill="#64748b" font-size="9" text-anchor="middle">returned</text>
  
  <!-- Client stores token -->
  <rect x="20" y="200" width="160" height="60" fill="#1e293b" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="100" y="220" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">4. Client Stores JWT</text>
  <text x="100" y="237" text-anchor="middle" fill="#64748b" font-size="9">localStorage or</text>
  <text x="100" y="250" text-anchor="middle" fill="#64748b" font-size="9">httpOnly Cookie</text>

  <line x1="182" y1="230" x2="220" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#a4)"/>

  <!-- Protected Request -->
  <rect x="220" y="200" width="160" height="60" fill="#1e293b" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="300" y="220" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">5. Protected Request</text>
  <text x="300" y="237" text-anchor="middle" fill="#64748b" font-size="9">Authorization:</text>
  <text x="300" y="250" text-anchor="middle" fill="#64748b" font-size="9">Bearer &lt;token&gt;</text>

  <line x1="382" y1="230" x2="420" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#a4)"/>

  <!-- Verify -->
  <rect x="420" y="200" width="160" height="60" fill="#1e293b" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="500" y="220" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">6. Verify Token</text>
  <text x="500" y="237" text-anchor="middle" fill="#64748b" font-size="9">jwt.verify(token, secret)</text>
  <text x="500" y="250" text-anchor="middle" fill="#4ade80" font-size="9">✅ Grant access</text>

  <defs>
    <marker id="a4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ─── AUTH SERVICE ────────────────────────────────────
class AuthService {
  async login(email, password) {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    
    // 2. Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');
    
    // 3. Create tokens
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }  // Short-lived access token
    );
    
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }   // Long-lived refresh token
    );
    
    return { accessToken, refreshToken };
  }
  
  async register(name, email, password) {
    // Hash password — NEVER store plain text!
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    return user;
  }
}
```

---

## 🔒 Security Best Practices

### CORS (Cross-Origin Resource Sharing)

```javascript
const cors = require('cors');

// Allow specific origins (recommended for production)
app.use(cors({
  origin: ['https://myapp.com', 'https://www.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // Allow cookies
}));
```

### Helmet (Security Headers)

```javascript
const helmet = require('helmet');

// Sets many HTTP security headers automatically
app.use(helmet());
// Adds: X-XSS-Protection, X-Frame-Options, HSTS, Content-Security-Policy, etc.
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Max 100 requests per window
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,     // Return rate limit info in headers
});

// Apply to all routes
app.use(limiter);

// Stricter limit for auth routes (prevent brute force)
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.use('/auth', authLimiter);
```

### Environment Variables

```javascript
// .env (NEVER commit to Git)
JWT_SECRET=super-long-random-secret-key-here
DB_URL=mongodb://localhost:27017/myapp
PORT=3000
NODE_ENV=production

// Load them
require('dotenv').config();
const secret = process.env.JWT_SECRET;

// Validate required env vars at startup
const requiredEnvVars = ['JWT_SECRET', 'DB_URL', 'PORT'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```

---

# Section 8: Databases

## 🍃 MongoDB (NoSQL)

MongoDB stores data as **documents** (like JSON objects) in **collections** (like tables).

```svg
<svg width="700" height="260" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="260" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">SQL vs MongoDB: Data Organization</text>

  <!-- SQL Side -->
  <rect x="20" y="45" width="310" height="195" fill="#1e293b" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="175" y="68" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">SQL (PostgreSQL/MySQL)</text>
  
  <rect x="35" y="80" width="280" height="140" fill="#1e3a5f" rx="5"/>
  <text x="175" y="98" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">users TABLE</text>
  <line x1="35" y1="104" x2="315" y2="104" stroke="#334155" stroke-width="1"/>
  <text x="65" y="120" fill="#94a3b8" font-size="10">id</text>
  <text x="115" y="120" fill="#94a3b8" font-size="10">name</text>
  <text x="190" y="120" fill="#94a3b8" font-size="10">email</text>
  <text x="265" y="120" fill="#94a3b8" font-size="10">age</text>
  <line x1="35" y1="126" x2="315" y2="126" stroke="#1e293b" stroke-width="1"/>
  <text x="65" y="143" fill="#e2e8f0" font-size="10">1</text>
  <text x="115" y="143" fill="#e2e8f0" font-size="10">Alice</text>
  <text x="190" y="143" fill="#e2e8f0" font-size="10">alice@..</text>
  <text x="265" y="143" fill="#e2e8f0" font-size="10">25</text>
  <text x="65" y="160" fill="#e2e8f0" font-size="10">2</text>
  <text x="115" y="160" fill="#e2e8f0" font-size="10">Bob</text>
  <text x="190" y="160" fill="#e2e8f0" font-size="10">bob@..</text>
  <text x="265" y="160" fill="#e2e8f0" font-size="10">30</text>
  <text x="175" y="200" text-anchor="middle" fill="#64748b" font-size="10">Fixed schema • JOINs • ACID transactions</text>

  <!-- MongoDB Side -->
  <rect x="370" y="45" width="310" height="195" fill="#1e293b" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="525" y="68" text-anchor="middle" fill="#86efac" font-size="13" font-weight="bold">MongoDB</text>
  
  <rect x="385" y="80" width="280" height="140" fill="#1a3326" rx="5"/>
  <text x="525" y="98" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">users COLLECTION</text>
  <line x1="385" y1="104" x2="665" y2="104" stroke="#334155" stroke-width="1"/>
  <text x="525" y="122" text-anchor="middle" fill="#94a3b8" font-size="9">Document 1:</text>
  <text x="525" y="136" text-anchor="middle" fill="#e2e8f0" font-size="9">{ _id: "abc123", name: "Alice", email: "alice@..",</text>
  <text x="525" y="150" text-anchor="middle" fill="#e2e8f0" font-size="9">  address: { city: "NY", zip: "10001" },</text>
  <text x="525" y="164" text-anchor="middle" fill="#e2e8f0" font-size="9">  hobbies: ["coding", "reading"] }</text>
  <line x1="385" y1="170" x2="665" y2="170" stroke="#334155" stroke-width="1"/>
  <text x="525" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">Document 2 can have DIFFERENT fields!</text>
  <text x="525" y="200" text-anchor="middle" fill="#64748b" font-size="10">Flexible schema • Embedded docs • Horizontal scale</text>
</svg>
```

### Mongoose — MongoDB ODM for Node.js

```javascript
const mongoose = require('mongoose');

// ─── CONNECT ─────────────────────────────────────────
await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log('MongoDB connected');

// ─── DEFINE SCHEMA ───────────────────────────────────
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false  // Never return password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
});

// ─── METHODS & HOOKS ─────────────────────────────────
userSchema.pre('save', async function(next) {
  // Hash password before saving
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ─── CRUD OPERATIONS ─────────────────────────────────
// Create
const user = await User.create({ name: 'Alice', email: 'alice@example.com', password: 'secret123' });

// Read
const allUsers = await User.find({});
const user1 = await User.findById('user-id-here');
const adminUsers = await User.find({ role: 'admin' }).sort({ createdAt: -1 }).limit(10);

// Update
await User.findByIdAndUpdate(id, { name: 'New Name' }, { new: true, runValidators: true });

// Delete
await User.findByIdAndDelete(id);

// Advanced query
const result = await User
  .find({ role: 'user', createdAt: { $gte: new Date('2024-01-01') } })
  .select('name email createdAt')  // Only return these fields
  .populate('orders')              // Join with orders collection
  .sort({ name: 1 })
  .skip(20)
  .limit(10);
```

---

## 🐘 SQL Databases (PostgreSQL / MySQL)

```javascript
// Using pg (PostgreSQL)
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,  // Max 20 connections in pool
});

// ─── BASIC QUERIES ───────────────────────────────────
// Parameterized queries prevent SQL injection!
const getUser = async (userId) => {
  const query = 'SELECT id, name, email FROM users WHERE id = $1';
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};

const createUser = async (name, email, passwordHash) => {
  const query = `
    INSERT INTO users (name, email, password_hash, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id, name, email, created_at
  `;
  const { rows } = await pool.query(query, [name, email, passwordHash]);
  return rows[0];
};

// ─── TRANSACTIONS ────────────────────────────────────
const transferFunds = async (fromId, toId, amount) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );
    
    await client.query('COMMIT');
    console.log('Transfer successful');
  } catch (err) {
    await client.query('ROLLBACK');  // If anything fails, undo everything!
    throw err;
  } finally {
    client.release();
  }
};
```

### SQL vs MongoDB

| Feature | SQL (PostgreSQL) | MongoDB |
|---------|-----------------|---------|
| Schema | Fixed, strict | Flexible, dynamic |
| Relationships | JOINs | Embedded docs or references |
| Transactions | Full ACID | Multi-document ACID (v4.0+) |
| Scaling | Vertical | Horizontal (sharding) |
| Best for | Financial data, complex relations | Content, catalogs, real-time |
| Query language | SQL | MongoDB Query Language |
| Example use | Banking, ERP, Analytics | E-commerce catalog, CMS, IoT |

---

# Section 9: Advanced Node.js

## 🔄 Clustering

Node.js is single-threaded, but modern servers have multiple CPU cores. **Clustering** lets you run multiple Node.js processes (workers) that all share the same port, utilizing all CPU cores.

**Used by**: Netflix, LinkedIn to handle millions of requests

```javascript
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Primary PID ${process.pid} running`);
  console.log(`Spawning ${numCPUs} workers...`);
  
  // Fork one worker per CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Auto-restart crashed workers
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // Each worker runs this code
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker PID: ${process.pid}`);
  }).listen(3000);
  
  console.log(`Worker ${process.pid} started`);
}
```

---

## 🧵 Worker Threads

**Clustering** creates multiple Node.js processes. **Worker Threads** create multiple threads within ONE process, sharing memory. Use for CPU-intensive work.

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// worker.js
if (!isMainThread) {
  // This runs in a worker thread
  const { numbers } = workerData;
  const result = numbers.reduce((sum, n) => sum + n, 0);
  parentPort.postMessage({ result });
}

// main.js
if (isMainThread) {
  const bigArray = Array.from({ length: 1000000 }, (_, i) => i);
  
  const worker = new Worker(__filename, {
    workerData: { numbers: bigArray }
  });
  
  worker.on('message', ({ result }) => {
    console.log('Sum:', result);
  });
  
  worker.on('error', (err) => console.error(err));
}
```

---

## 🔴 Redis — In-Memory Cache

Redis is an in-memory data store — it's incredibly fast (sub-millisecond). Use it to cache expensive database queries.

**Real-world**: Twitter uses Redis to cache user timelines, so they don't query the DB on every page load.

```javascript
const redis = require('redis');

const client = redis.createClient({ url: process.env.REDIS_URL });
await client.connect();

// Cache middleware
const cacheMiddleware = (duration) => async (req, res, next) => {
  const key = `cache:${req.url}`;
  
  const cached = await client.get(key);
  if (cached) {
    console.log('Cache HIT ✅');
    return res.json(JSON.parse(cached));
  }
  
  // Override res.json to cache the response
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    client.setEx(key, duration, JSON.stringify(data));
    return originalJson(data);
  };
  
  console.log('Cache MISS — querying database...');
  next();
};

// Usage
app.get('/products', cacheMiddleware(300), getProducts); // Cache for 5 minutes

// Session storage with Redis
app.use(session({
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }
}));
```

---

## 🌐 WebSockets — Real-Time Communication

HTTP is request-response. **WebSockets** create a persistent, bidirectional connection — perfect for chat apps, live dashboards, multiplayer games.

**Used by**: WhatsApp Web, Slack, Google Docs (live collaboration), stock tickers

```javascript
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'https://myapp.com' }
});

// Middleware for auth
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.user.name} connected`);
  
  // Join a chat room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { user: socket.user.name });
  });
  
  // Send a message
  socket.on('send-message', ({ roomId, message }) => {
    io.to(roomId).emit('new-message', {
      from: socket.user.name,
      message,
      time: new Date()
    });
  });
  
  // Typing indicators
  socket.on('typing', ({ roomId }) => {
    socket.to(roomId).emit('user-typing', socket.user.name);
  });
  
  socket.on('disconnect', () => {
    console.log(`User ${socket.user.name} disconnected`);
  });
});
```

---

## 📨 Message Queues (Bull/BullMQ)

Message queues handle tasks asynchronously. Instead of making a user wait for a slow operation (sending email, resizing image), you push it to a queue and process it in the background.

**Used by**: Amazon (order processing), Uber (ride matching), Gmail (email delivery)

```javascript
const Queue = require('bull');

// Create queues
const emailQueue = new Queue('email', { redis: { host: 'localhost', port: 6379 } });
const imageQueue = new Queue('image-processing');

// Add jobs to queue (fast — returns immediately)
app.post('/register', async (req, res) => {
  const user = await createUser(req.body);
  
  // Don't wait for email to be sent! Push to queue.
  await emailQueue.add('welcome-email', {
    to: user.email,
    name: user.name,
    template: 'welcome'
  });
  
  res.status(201).json({ success: true, user });
});

// Process jobs (runs in background worker)
emailQueue.process('welcome-email', async (job) => {
  const { to, name, template } = job.data;
  await sendEmail({ to, subject: `Welcome ${name}!`, template });
});

// Job events
emailQueue.on('completed', (job) => console.log(`Email sent: ${job.id}`));
emailQueue.on('failed', (job, err) => console.error(`Email failed: ${err.message}`));
```

---

# Section 10: Production Architecture

## 🏗️ Production-Ready Architecture

```svg
<svg width="700" height="480" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="480" fill="#0f172a" rx="12"/>
  <text x="350" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Production Node.js Architecture</text>

  <!-- Users -->
  <rect x="270" y="50" width="160" height="40" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="350" y="75" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">👥 Users (Millions)</text>
  
  <line x1="350" y1="92" x2="350" y2="112" stroke="#475569" stroke-width="1.5" marker-end="url(#a5)"/>
  
  <!-- CDN -->
  <rect x="130" y="112" width="480" height="40" fill="#2d2a1a" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="370" y="137" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold">CDN (Cloudflare / CloudFront) — Static assets, DDoS protection</text>
  
  <line x1="350" y1="154" x2="350" y2="174" stroke="#475569" stroke-width="1.5" marker-end="url(#a5)"/>
  
  <!-- Load Balancer -->
  <rect x="200" y="174" width="300" height="40" fill="#1a3326" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="350" y="199" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">⚖️ Load Balancer (Nginx / AWS ALB)</text>
  
  <!-- Fan out to servers -->
  <line x1="270" y1="216" x2="180" y2="250" stroke="#475569" stroke-width="1.5" marker-end="url(#a5)"/>
  <line x1="350" y1="216" x2="350" y2="250" stroke="#475569" stroke-width="1.5" marker-end="url(#a5)"/>
  <line x1="430" y1="216" x2="520" y2="250" stroke="#475569" stroke-width="1.5" marker-end="url(#a5)"/>
  
  <!-- Node Servers -->
  <rect x="110" y="250" width="130" height="50" fill="#1a1a3a" rx="8" stroke="#6366f1" stroke-width="1.5"/>
  <text x="175" y="271" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">Node.js #1</text>
  <text x="175" y="288" text-anchor="middle" fill="#64748b" font-size="9">Port 3001 | 8 CPUs</text>
  
  <rect x="285" y="250" width="130" height="50" fill="#1a1a3a" rx="8" stroke="#6366f1" stroke-width="1.5"/>
  <text x="350" y="271" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">Node.js #2</text>
  <text x="350" y="288" text-anchor="middle" fill="#64748b" font-size="9">Port 3002 | 8 CPUs</text>
  
  <rect x="460" y="250" width="130" height="50" fill="#1a1a3a" rx="8" stroke="#6366f1" stroke-width="1.5"/>
  <text x="525" y="271" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">Node.js #3</text>
  <text x="525" y="288" text-anchor="middle" fill="#64748b" font-size="9">Port 3003 | 8 CPUs</text>
  
  <!-- Shared services below -->
  <line x1="350" y1="302" x2="350" y2="325" stroke="#475569" stroke-width="1.5" marker-end="url(#a5)"/>
  
  <!-- Data Layer -->
  <rect x="30" y="325" width="150" height="55" fill="#1a3326" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="105" y="347" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">🍃 MongoDB</text>
  <text x="105" y="364" text-anchor="middle" fill="#64748b" font-size="9">Primary + 2 Replicas</text>
  <text x="105" y="374" text-anchor="middle" fill="#64748b" font-size="9">Auto-failover</text>
  
  <rect x="200" y="325" width="150" height="55" fill="#2d1a1a" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="275" y="347" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">🔴 Redis</text>
  <text x="275" y="364" text-anchor="middle" fill="#64748b" font-size="9">Cache + Sessions</text>
  <text x="275" y="374" text-anchor="middle" fill="#64748b" font-size="9">Pub/Sub</text>
  
  <rect x="370" y="325" width="150" height="55" fill="#1a1a3a" rx="8" stroke="#6366f1" stroke-width="1.5"/>
  <text x="445" y="347" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">📨 Message Queue</text>
  <text x="445" y="364" text-anchor="middle" fill="#64748b" font-size="9">RabbitMQ / Bull</text>
  <text x="445" y="374" text-anchor="middle" fill="#64748b" font-size="9">Async jobs</text>
  
  <rect x="540" y="325" width="140" height="55" fill="#2d2a1a" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="610" y="347" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">☁️ Object Store</text>
  <text x="610" y="364" text-anchor="middle" fill="#64748b" font-size="9">S3 / GCS</text>
  <text x="610" y="374" text-anchor="middle" fill="#64748b" font-size="9">Files, images</text>
  
  <!-- Monitoring -->
  <rect x="30" y="402" width="640" height="50" fill="#1e293b" rx="8" stroke="#475569" stroke-width="1.5"/>
  <text x="350" y="420" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">🔍 Monitoring: Datadog | Prometheus + Grafana | Sentry (Error tracking) | ELK Stack (Logs)</text>
  <text x="350" y="440" text-anchor="middle" fill="#64748b" font-size="10">Alerts • Dashboards • APM • Distributed Tracing</text>

  <defs>
    <marker id="a5" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

## 🐳 Docker

Docker packages your app and all its dependencies into a **container** — a lightweight, isolated environment that runs identically everywhere.

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Set user to non-root for security
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Start command
CMD ["node", "src/server.js"]
```

```yaml
# docker-compose.yml — local development
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - MONGO_URI=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    volumes:
      - ./src:/app/src  # Hot reload in development

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mongo-data:
```

---

## ⚡ PM2 — Process Manager

PM2 keeps your Node.js app alive, restarts it on crashes, and manages multiple processes.

```bash
# Install
npm install -g pm2

# Start app
pm2 start src/server.js --name "my-api"

# Start with clustering (use all CPU cores)
pm2 start src/server.js -i max --name "my-api"

# Monitor
pm2 monit

# View logs
pm2 logs my-api

# Auto-start on server reboot
pm2 startup
pm2 save
```

```javascript
// ecosystem.config.js — PM2 config file
module.exports = {
  apps: [{
    name: 'my-api',
    script: 'src/server.js',
    instances: 'max',          // One per CPU core
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',  // Restart if uses more than 1GB
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

---

# Section 11: Design Patterns

## 🏗️ MVC Pattern (Model-View-Controller)

The most common architecture pattern. Separates concerns into three layers.

```
Request → Router → Controller → Service → Model → Database
                       ↓
                   Response
```

```javascript
// Model — data shape + DB interaction
// models/User.model.js
const User = mongoose.model('User', userSchema);
module.exports = User;

// Service — business logic
// services/user.service.js
class UserService {
  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }
  
  async updateProfile(id, updates) {
    // Business logic: can't change email to one already in use
    if (updates.email) {
      const exists = await User.findOne({ email: updates.email, _id: { $ne: id } });
      if (exists) throw new ConflictError('Email already in use');
    }
    return User.findByIdAndUpdate(id, updates, { new: true });
  }
}

// Controller — handle HTTP layer
// controllers/user.controller.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  
  getUser = async (req, res, next) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }
}
```

---

## 🏭 Repository Pattern

Abstracts database access behind an interface. You can swap MongoDB for PostgreSQL without changing business logic.

```javascript
// repositories/user.repository.js
class UserRepository {
  async findById(id) {
    return User.findById(id);
  }
  
  async findByEmail(email) {
    return User.findOne({ email });
  }
  
  async create(userData) {
    return User.create(userData);
  }
  
  async update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
  
  async delete(id) {
    return User.findByIdAndDelete(id);
  }
}

// Now service uses repository, not model directly
class AuthService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }
  
  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    // ... business logic
  }
}
```

---

## 💉 Dependency Injection

Instead of creating dependencies inside a class, **inject** them from outside. Makes testing easy — you can inject mock dependencies.

```javascript
// Without DI ❌ — hard to test
class OrderService {
  async createOrder(data) {
    const db = new MongoDatabase(); // Hardcoded dependency
    const emailer = new SendGridEmailer(); // Hardcoded
    // ...
  }
}

// With DI ✅ — easy to test
class OrderService {
  constructor(db, emailer, paymentGateway) {
    this.db = db;
    this.emailer = emailer;
    this.payment = paymentGateway;
  }
  
  async createOrder(data) {
    const order = await this.db.create('orders', data);
    await this.payment.charge(data.amount, data.cardToken);
    await this.emailer.send({ to: data.email, template: 'order-confirm' });
    return order;
  }
}

// In tests — inject mocks!
const mockDb = { create: jest.fn().mockResolvedValue({ id: 1 }) };
const mockEmailer = { send: jest.fn() };
const service = new OrderService(mockDb, mockEmailer, mockPayment);
```

---

# Section 12: Performance Optimization

## ⚡ Key Optimizations

### 1. Compression

```javascript
const compression = require('compression');

// Compress all responses
app.use(compression({ threshold: 1024 })); // Only compress > 1KB
// This can reduce response size by 60-80%!
```

### 2. Database Query Optimization

```javascript
// ❌ N+1 Query Problem — makes 1 + N database calls!
const users = await User.find({});
for (const user of users) {
  user.orders = await Order.find({ userId: user._id }); // Called N times!
}

// ✅ Use populate() or aggregate — one query
const users = await User.find({}).populate('orders');

// ✅ Add database indexes for frequently queried fields
userSchema.index({ email: 1 });             // Single field index
userSchema.index({ name: 1, createdAt: -1 }); // Compound index
userSchema.index({ '$**': 'text' });        // Text search index
```

### 3. Pagination (Never Return Everything!)

```javascript
// ❌ TERRIBLE — returns millions of records
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// ✅ Always paginate
app.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Max 100
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    Product.find({}).skip(skip).limit(limit),
    Product.countDocuments({})
  ]);
  
  res.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit)
    }
  });
});
```

### 4. Memory Leak Prevention

```javascript
// ❌ Memory leak — event listeners never removed!
class MyService {
  startListening() {
    eventEmitter.on('data', this.handleData); // Keeps adding listeners!
  }
}

// ✅ Remove listeners when done
class MyService {
  startListening() {
    this.handleData = this.processData.bind(this);
    eventEmitter.on('data', this.handleData);
  }
  
  stopListening() {
    eventEmitter.off('data', this.handleData); // Clean up!
  }
}

// ❌ Global variables accumulating data
const cache = {};
function addToCache(key, value) {
  cache[key] = value; // Never cleaned up = memory leak!
}

// ✅ Use an LRU cache with max size
const LRU = require('lru-cache');
const cache = new LRU({ max: 500, ttl: 1000 * 60 * 5 }); // 500 items, 5min TTL
```

---

# Section 13: Testing

## 🧪 Why Testing?

Testing ensures your code works correctly and prevents regressions when you make changes. Netflix, Amazon — they have thousands of tests running on every code push.

### Unit Testing with Jest

```javascript
// services/cart.service.js
class CartService {
  calculateTotal(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  applyDiscount(total, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Invalid discount percentage');
    }
    return total * (1 - discountPercent / 100);
  }
}

// tests/unit/cart.service.test.js
const CartService = require('../../services/cart.service');

describe('CartService', () => {
  let service;
  
  beforeEach(() => {
    service = new CartService();
  });
  
  describe('calculateTotal', () => {
    test('calculates total for multiple items', () => {
      const items = [
        { price: 100, quantity: 2 },
        { price: 50, quantity: 1 }
      ];
      expect(service.calculateTotal(items)).toBe(250);
    });
    
    test('returns 0 for empty cart', () => {
      expect(service.calculateTotal([])).toBe(0);
    });
  });
  
  describe('applyDiscount', () => {
    test('applies 10% discount correctly', () => {
      expect(service.applyDiscount(100, 10)).toBe(90);
    });
    
    test('throws error for invalid discount', () => {
      expect(() => service.applyDiscount(100, -5)).toThrow('Invalid discount percentage');
      expect(() => service.applyDiscount(100, 150)).toThrow('Invalid discount percentage');
    });
  });
});
```

### Integration Testing with Supertest

```javascript
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

describe('POST /auth/login', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URL);
    // Seed test user
    await User.create({ email: 'test@test.com', password: await bcrypt.hash('password123', 10) });
  });
  
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });
  
  test('returns JWT on valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.accessToken).toBeTruthy();
  });
  
  test('returns 401 on invalid password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'wrongpassword' });
    
    expect(response.status).toBe(401);
  });
});
```

---

# Section 14: Deployment

## 🚀 Deployment Options

| Option | Best For | Complexity | Cost |
|--------|----------|------------|------|
| **Heroku** | Quick prototypes | ⭐ Easy | $$ |
| **Railway** | Startups | ⭐ Easy | $ |
| **AWS EC2** | Full control | ⭐⭐⭐ Hard | $$ |
| **AWS ECS/EKS** | Containers at scale | ⭐⭐⭐⭐ Expert | $$$ |
| **Vercel / Netlify** | Serverless/Edge | ⭐ Easy | $ |
| **VPS (DigitalOcean)** | Small-medium apps | ⭐⭐ Medium | $ |

### VPS Deployment with Nginx

```nginx
# /etc/nginx/sites-available/myapp
server {
  listen 80;
  server_name myapp.com www.myapp.com;
  
  # Redirect HTTP to HTTPS
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name myapp.com www.myapp.com;
  
  ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;
  
  # Proxy to Node.js
  location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_cache_bypass $http_upgrade;
  }
  
  # Serve static files directly (faster)
  location / {
    root /var/www/myapp/public;
    try_files $uri $uri/ /index.html;
  }
}
```

---

# Section 15: Real-World Project Architecture

## 🏢 Microservices Architecture

```svg
<svg width="700" height="520" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <rect width="700" height="520" fill="#0f172a" rx="12"/>
  <text x="350" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">E-Commerce Microservices Architecture</text>

  <!-- API Gateway -->
  <rect x="220" y="55" width="260" height="45" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="2"/>
  <text x="350" y="74" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">🌐 API Gateway</text>
  <text x="350" y="91" text-anchor="middle" fill="#64748b" font-size="10">Auth • Rate Limit • Routing • Load Balance</text>
  
  <!-- Fan out arrows -->
  <line x1="290" y1="102" x2="130" y2="150" stroke="#334155" stroke-width="1.5" marker-end="url(#a6)"/>
  <line x1="320" y1="102" x2="240" y2="150" stroke="#334155" stroke-width="1.5" marker-end="url(#a6)"/>
  <line x1="350" y1="102" x2="350" y2="150" stroke="#334155" stroke-width="1.5" marker-end="url(#a6)"/>
  <line x1="380" y1="102" x2="460" y2="150" stroke="#334155" stroke-width="1.5" marker-end="url(#a6)"/>
  <line x1="410" y1="102" x2="570" y2="150" stroke="#334155" stroke-width="1.5" marker-end="url(#a6)"/>
  
  <!-- Microservices row 1 -->
  <rect x="50" y="152" width="130" height="65" fill="#1a1a3a" rx="8" stroke="#6366f1" stroke-width="1.5"/>
  <text x="115" y="172" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="bold">🔐 Auth Service</text>
  <text x="115" y="189" text-anchor="middle" fill="#64748b" font-size="9">JWT • OAuth2</text>
  <text x="115" y="203" text-anchor="middle" fill="#64748b" font-size="9">Port: 3001</text>
  
  <rect x="200" y="152" width="130" height="65" fill="#1a3326" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="265" y="172" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">👤 User Service</text>
  <text x="265" y="189" text-anchor="middle" fill="#64748b" font-size="9">Profile • Prefs</text>
  <text x="265" y="203" text-anchor="middle" fill="#64748b" font-size="9">Port: 3002</text>
  
  <rect x="285" y="152" width="130" height="65" fill="#2d2a1a" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="350" y="172" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">🛍️ Product Service</text>
  <text x="350" y="189" text-anchor="middle" fill="#64748b" font-size="9">Catalog • Search</text>
  <text x="350" y="203" text-anchor="middle" fill="#64748b" font-size="9">Port: 3003</text>
  
  <rect x="430" y="152" width="130" height="65" fill="#2d1a1a" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="495" y="172" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">🛒 Order Service</text>
  <text x="495" y="189" text-anchor="middle" fill="#64748b" font-size="9">Cart • Orders</text>
  <text x="495" y="203" text-anchor="middle" fill="#64748b" font-size="9">Port: 3004</text>
  
  <rect x="570" y="152" width="110" height="65" fill="#1a2d3a" rx="8" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="625" y="172" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">💳 Payment</text>
  <text x="625" y="189" text-anchor="middle" fill="#64748b" font-size="9">Stripe/Razorpay</text>
  <text x="625" y="203" text-anchor="middle" fill="#64748b" font-size="9">Port: 3005</text>

  <!-- Message Bus -->
  <rect x="30" y="248" width="640" height="40" fill="#1e293b" rx="8" stroke="#a855f7" stroke-width="2" stroke-dasharray="5"/>
  <text x="350" y="263" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">📨 Message Bus (RabbitMQ / Kafka)</text>
  <text x="350" y="280" text-anchor="middle" fill="#64748b" font-size="10">Event-driven communication between services: OrderPlaced • PaymentConfirmed • EmailTrigger</text>
  
  <!-- Databases row -->
  <rect x="35" y="315" width="110" height="55" fill="#1e293b" rx="6" stroke="#6366f1" stroke-width="1"/>
  <text x="90" y="335" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">Auth DB</text>
  <text x="90" y="352" text-anchor="middle" fill="#64748b" font-size="9">PostgreSQL</text>
  <text x="90" y="362" text-anchor="middle" fill="#64748b" font-size="9">Users + Sessions</text>
  
  <rect x="162" y="315" width="110" height="55" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1"/>
  <text x="217" y="335" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">User DB</text>
  <text x="217" y="352" text-anchor="middle" fill="#64748b" font-size="9">PostgreSQL</text>
  <text x="217" y="362" text-anchor="middle" fill="#64748b" font-size="9">Profiles</text>
  
  <rect x="289" y="315" width="110" height="55" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1"/>
  <text x="344" y="335" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">Product DB</text>
  <text x="344" y="352" text-anchor="middle" fill="#64748b" font-size="9">MongoDB</text>
  <text x="344" y="362" text-anchor="middle" fill="#64748b" font-size="9">Catalog</text>
  
  <rect x="416" y="315" width="110" height="55" fill="#1e293b" rx="6" stroke="#ef4444" stroke-width="1"/>
  <text x="471" y="335" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Order DB</text>
  <text x="471" y="352" text-anchor="middle" fill="#64748b" font-size="9">PostgreSQL</text>
  <text x="471" y="362" text-anchor="middle" fill="#64748b" font-size="9">Transactions</text>
  
  <rect x="543" y="315" width="110" height="55" fill="#1e293b" rx="6" stroke="#0ea5e9" stroke-width="1"/>
  <text x="598" y="335" text-anchor="middle" fill="#7dd3fc" font-size="10" font-weight="bold">Payment DB</text>
  <text x="598" y="352" text-anchor="middle" fill="#64748b" font-size="9">PostgreSQL</text>
  <text x="598" y="362" text-anchor="middle" fill="#64748b" font-size="9">Transactions</text>
  
  <!-- Shared infrastructure -->
  <rect x="35" y="393" width="200" height="50" fill="#1e293b" rx="6" stroke="#ef4444" stroke-width="1"/>
  <text x="135" y="413" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">🔴 Redis Cluster</text>
  <text x="135" y="431" text-anchor="middle" fill="#64748b" font-size="9">Shared Cache • Rate Limiting • Sessions</text>
  
  <rect x="253" y="393" width="200" height="50" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1"/>
  <text x="353" y="413" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">🔔 Notification Service</text>
  <text x="353" y="431" text-anchor="middle" fill="#64748b" font-size="9">Email (SendGrid) • SMS • Push</text>
  
  <rect x="471" y="393" width="185" height="50" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1"/>
  <text x="563" y="413" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">📊 Monitoring</text>
  <text x="563" y="431" text-anchor="middle" fill="#64748b" font-size="9">Grafana • Prometheus • Jaeger</text>
  
  <!-- Arrows from services to DBs -->
  <line x1="90" y1="218" x2="90" y2="314" stroke="#334155" stroke-width="1" stroke-dasharray="3"/>
  <line x1="217" y1="218" x2="217" y2="314" stroke="#334155" stroke-width="1" stroke-dasharray="3"/>
  <line x1="344" y1="218" x2="344" y2="314" stroke="#334155" stroke-width="1" stroke-dasharray="3"/>
  <line x1="471" y1="218" x2="471" y2="314" stroke="#334155" stroke-width="1" stroke-dasharray="3"/>
  <line x1="598" y1="218" x2="598" y2="314" stroke="#334155" stroke-width="1" stroke-dasharray="3"/>

  <defs>
    <marker id="a6" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#334155"/>
    </marker>
  </defs>
</svg>
```

---

# Section 16: Interview Questions

## 🎯 Beginner Questions

**Q1: What is Node.js and how is it different from browser JavaScript?**
> Node.js is a JavaScript runtime built on Chrome's V8 engine. Unlike browser JS, Node.js can access the file system, create servers, connect to databases, and run on the command line. It doesn't have `window`, `document`, or `DOM` APIs, but adds things like `fs`, `http`, `path`, and `process`.

**Q2: What is npm?**
> npm (Node Package Manager) is the default package manager for Node.js. It lets you install, share, and manage third-party libraries (packages). `package.json` lists your app's dependencies.

**Q3: Explain the difference between `require` and `import`.**
> `require` is CommonJS (Node.js's original module system) — synchronous, runtime loading. `import` is ES Modules — static analysis, supports tree shaking, asynchronous. They can't be freely mixed.

**Q4: What is callback hell and how do you avoid it?**
> Callback hell occurs when callbacks are nested inside callbacks, creating deeply indented, hard-to-read code. Avoid it using: (1) Named functions instead of anonymous callbacks, (2) Promises with `.then()/.catch()`, (3) `async/await`.

**Q5: What is `package.json`?**
> It's a metadata file for your Node.js project that defines: project name/version, dependencies (needed in production), devDependencies (only needed for development), scripts (like `start`, `test`, `build`), and the entry point.

---

## 🚀 Intermediate Questions

**Q6: Explain the Node.js Event Loop.**
> The Event Loop is what makes Node.js non-blocking. It has phases: Timers → Pending I/O → Idle/Prepare → Poll → Check → Close Callbacks. Between each phase, it processes the microtask queue (Promises + process.nextTick). It constantly loops, picking up completed async tasks and running their callbacks.

**Q7: What is the difference between `process.nextTick()` and `setImmediate()`?**
> `process.nextTick()` runs BEFORE the event loop moves to the next phase — it's part of the microtask queue, highest priority. `setImmediate()` runs in the "check" phase of the current event loop iteration, after I/O events. `nextTick` fires before `setImmediate`.

**Q8: What are streams? When would you use them?**
> Streams process data piece by piece rather than loading it all into memory. Use them when: sending large files, processing logs in real-time, piping HTTP responses, handling file uploads. They prevent memory exhaustion with large data.

**Q9: What is middleware in Express?**
> Middleware is a function with `(req, res, next)` signature that sits between the request and the final route handler. It can modify `req`/`res`, run code, end the request, or call `next()` to pass to the next middleware. Used for logging, auth, validation, CORS, compression.

**Q10: Explain JWT authentication flow.**
> 1. User sends credentials (email + password), 2. Server verifies, creates JWT with user ID/role signed with secret, 3. Client stores JWT (localStorage or httpOnly cookie), 4. Client sends JWT in `Authorization: Bearer <token>` header on every request, 5. Middleware verifies JWT signature, extracts user info, attaches to `req.user`.

---

## 🏆 Advanced Questions

**Q11: How does Node.js handle CPU-intensive tasks?**
> Since the event loop runs on a single thread, CPU-intensive work (image processing, video encoding, large calculations) will block it. Solutions: (1) Worker Threads — run JS in separate threads, (2) Child Processes — spawn separate processes, (3) Offload to a queue (Bull) and process asynchronously, (4) Use clustering to spread load across CPUs.

**Q12: What is clustering and how does it improve performance?**
> Clustering creates multiple Node.js process instances (one per CPU core) that all listen on the same port. The OS or Node cluster module distributes incoming requests across workers. With 8 cores, you can handle ~8x the throughput. PM2's `cluster` mode automates this.

**Q13: How would you prevent memory leaks in Node.js?**
> Common causes: (1) Unbounded caches/arrays, (2) Event listeners never removed, (3) Closures holding references to large objects, (4) Global variables accumulating data. Prevention: Use LRU caches, always remove event listeners with `emitter.off()`, use WeakMap/WeakRef for caches, profile with `--inspect` and Chrome DevTools heap snapshots.

**Q14: Explain the difference between horizontal and vertical scaling.**
> Vertical scaling: add more power to one machine (bigger RAM, more CPUs) — has limits, expensive. Horizontal scaling: add more machines — theoretically unlimited, requires stateless design (no in-memory sessions), needs a load balancer, and shared state storage (Redis for sessions).

**Q15: Scenario: Your Node.js API is slow under load. How do you diagnose and fix it?**
> 1. **Measure**: Check response times, CPU/memory usage, DB query times, 2. **Profile**: Use `--prof` flag, Node.js Inspector, clinic.js, 3. **Common issues**: Synchronous code blocking event loop, N+1 DB queries, missing DB indexes, no caching, 4. **Fix**: Add Redis caching, fix queries, add indexes, use `worker_threads` for CPU work, enable compression, enable clustering.

---

## 🎭 Scenario-Based Questions

**Q16: Design a rate limiter without any npm package.**

```javascript
const requestCounts = new Map();

const rateLimiter = (maxRequests, windowMs) => (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }
  
  const requests = requestCounts.get(ip).filter(time => now - time < windowMs);
  
  if (requests.length >= maxRequests) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  requests.push(now);
  requestCounts.set(ip, requests);
  next();
};
```

**Q17: How would you implement graceful shutdown?**

```javascript
const server = app.listen(3000);

const gracefulShutdown = async (signal) => {
  console.log(`${signal} received. Starting graceful shutdown...`);
  
  // Stop accepting new connections
  server.close(async () => {
    try {
      // Close database connections
      await mongoose.disconnect();
      await redisClient.quit();
      
      // Finish processing queue jobs
      await emailQueue.close();
      
      console.log('Graceful shutdown complete');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });
  
  // Force shutdown if graceful takes too long
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Docker/Kubernetes
process.on('SIGINT', () => gracefulShutdown('SIGINT'));   // Ctrl+C
```

---

## 📊 Quick Reference: Common npm Packages

| Category | Package | Use Case |
|----------|---------|----------|
| Framework | `express` | HTTP server, routing |
| Validation | `joi`, `zod` | Request validation |
| Auth | `jsonwebtoken`, `bcrypt` | JWT + password hashing |
| ORM | `mongoose`, `prisma`, `sequelize` | Database abstraction |
| Testing | `jest`, `supertest` | Unit + integration tests |
| Logging | `winston`, `pino` | Structured logging |
| Config | `dotenv`, `convict` | Environment variables |
| Security | `helmet`, `cors`, `express-rate-limit` | HTTP security |
| Process | `pm2` | Process management |
| Cache | `ioredis` | Redis client |
| Queues | `bull`, `bullmq` | Background jobs |
| WebSockets | `socket.io` | Real-time communication |
| HTTP Client | `axios` | Outgoing HTTP requests |
| Scheduling | `node-cron` | Cron jobs |
| File Upload | `multer` | Multipart file upload |
| Compression | `compression` | Gzip responses |
| Email | `nodemailer` | Send emails |
| Documentation | `swagger-jsdoc` | API docs |

---

> 📌 **Remember**: Great Node.js developers think about **non-blocking**, **scalability**, and **maintainability** in every decision. Practice building real projects — a REST API, a chat app, a CLI tool — and this knowledge becomes intuition.

---

*Document created as a premium learning handbook — Node.js Beginner to Advanced*