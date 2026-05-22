---
title: "Introduction to Node.js"
description: "What is Node.js, why it was created, and the fundamentals of client-server architecture."
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

![Node.js Runtime Architecture](/DSA-Notes-Problems/images/nodejs-runtime-architecture.svg)

Node.js consists of three main layers:

1. **Your Application Code** (JavaScript) — app.js, routes, controllers, services
2. **V8 Engine** (Google) — Compiles JS to machine code
3. **libuv** (C Library) — Event Loop, Thread Pool, I/O

On top of these sit **Node.js Built-in APIs** (fs, http, crypto, path, os, events, stream, buffer) and the **Operating System** layer.
