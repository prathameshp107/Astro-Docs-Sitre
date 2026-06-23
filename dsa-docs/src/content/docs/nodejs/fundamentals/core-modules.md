---
title: "Core Concepts & Built-in Modules"
description: "Modules, File System, Streams, Events, Buffer, Path, OS, and URL modules in Node.js."
sidebar:
  order: 5
---

# Core Concepts & Built-in Modules

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

### ES Modules (Modern Way)

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

> 🔍 See the dedicated **[Streams & Buffers](/DSA-Notes-Problems/nodejs/core/streams-and-buffers)** page for a deep dive with mermaid diagrams on pipe, backpressure, and transform streams.

![Stream Flow](/DSA-Notes-Problems/assets/nodejs/stream-flow.svg)

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

> 🔍 See the dedicated **[Event Emitter](/DSA-Notes-Problems/nodejs/core/event-emitter)** page for a deep dive with custom emitters, async handlers, and memory leak prevention.


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

// Subscribe to events
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
```

---

## 🧮 Buffer

A **Buffer** is a chunk of raw binary data — like a temporary storage area for bytes.

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

path.join('/user', 'data', 'file.txt');     // /user/data/file.txt
path.resolve('folder', 'file.txt');          // Absolute path from CWD
path.dirname('/user/data/file.txt');         // '/user/data'
path.basename('/user/data/file.txt');        // 'file.txt'
path.extname('file.txt');                    // '.txt'

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

const cpuCount = os.cpus().length;
console.log(`Server has ${cpuCount} CPUs — spawn ${cpuCount} workers`);
```

---

## 🌐 URL Module

```javascript
const { URL } = require('url');

const url = new URL('https://shop.example.com/products?category=electronics&page=2#results');

url.protocol;  // 'https:'
url.hostname;  // 'shop.example.com'
url.pathname;  // '/products'
url.search;    // '?category=electronics&page=2'
url.hash;      // '#results'

url.searchParams.get('category');   // 'electronics'
url.searchParams.get('page');       // '2'
url.searchParams.set('page', '3');
url.searchParams.append('sort', 'price');
```
