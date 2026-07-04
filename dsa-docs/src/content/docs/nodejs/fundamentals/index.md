---
title: "1️⃣ Node.js Fundamentals"
description: "Master Node.js fundamentals — runtime architecture, modules, npm, and the tooling that powers modern backend development."
sidebar:
  order: 1
---

# 1️⃣ Node.js Fundamentals

## 📖 Introduction

Node.js revolutionized backend development by bringing JavaScript to the server. This module covers everything you need to build a solid foundation — from understanding what Node.js is and how its event-driven architecture works, to mastering npm, modules, and the core built-in modules that ship with the runtime.

## 🎯 Why This Module Exists

Most beginners jump straight into Express.js without understanding the fundamentals. This leads to:
- Confusion about async behavior and the event loop
- Poor module organization
- Security vulnerabilities from misused core modules
- Difficulty debugging production issues

This module eliminates those gaps by building mental models that senior engineers use daily.

## 📚 Learning Objectives

By the end of this module, you will be able to:

| # | Objective |
|---|-----------|
| 1 | Explain what Node.js is and how it differs from browser JavaScript |
| 2 | Trace the Event Loop execution order for any code snippet |
| 3 | Publish, version, and manage npm packages |
| 4 | Choose between CommonJS and ES Modules with clear reasoning |
| 5 | Use all core built-in modules (`fs`, `path`, `os`, `http`, `crypto`, etc.) |
| 6 | Set up a Node.js project with TypeScript |
| 7 | Debug Node.js applications using the inspector and DevTools |

## 🧱 Prerequisites

| Skill | Level Required |
|-------|---------------|
| JavaScript basics (variables, functions, loops) | ✅ Comfortable |
| ES6+ features (arrow functions, destructuring, classes) | ✅ Comfortable |
| Basic terminal/command line usage | ✅ Familiar |
| Git basics | 🔧 Helpful but not required |

> 💡 **Not comfortable with JavaScript?** Review our [JavaScript fundamentals](/DSA-Notes-Problems/javascript) module first.

## 🗺️ Learning Roadmap

```mermaid
flowchart LR
    Intro["1.1 What is Node.js?"] --> Setup["1.2 Installation & Setup"]
    Setup --> REPL["1.3 REPL & CLI Basics"]
    REPL --> Arch["1.4 Architecture & Event Loop"]
    Arch --> NPM["1.5 npm & package.json"]
    NPM --> Modules["1.6 CommonJS vs ESM"]
    Modules --> Core["1.7 Core Built-in Modules"]
    Core --> Debug["1.8 Debugging"]
    Debug --> TS["1.9 Node.js + TypeScript"]
    
    style Intro fill:#4f46e5,color:#fff
    style Setup fill:#6366f1,color:#fff
    style REPL fill:#818cf8,color:#fff
    style Arch fill:#7c3aed,color:#fff
    style NPM fill:#059669,color:#fff
    style Modules fill:#10b981,color:#fff
    style Core fill:#d97706,color:#fff
    style Debug fill:#f59e0b,color:#fff
    style TS fill:#ef4444,color:#fff
```

## 📋 Topics Covered

| # | Topic | Est. Time | Difficulty |
|---|-------|-----------|------------|
| 1.1 | [Introduction to Node.js](/DSA-Notes-Problems/nodejs/fundamentals/introduction) | 45 min | 🟢 Beginner |
| 1.2 | Installation & Setup | 30 min | 🟢 Beginner |
| 1.3 | REPL & CLI Basics | 30 min | 🟢 Beginner |
| 1.4 | [Node.js Architecture & Event Loop](/DSA-Notes-Problems/nodejs/fundamentals/architecture) | 60 min | 🟡 Intermediate |
| 1.5 | [npm & package.json](/DSA-Notes-Problems/nodejs/fundamentals/npm-and-package-json) | 60 min | 🟢 Beginner |
| 1.6 | [Modules: CommonJS vs ESM](/DSA-Notes-Problems/nodejs/fundamentals/modules-commonjs-vs-esm) | 60 min | 🟡 Intermediate |
| 1.7 | [Core Built-in Modules](/DSA-Notes-Problems/nodejs/fundamentals/core-modules) | 90 min | 🟡 Intermediate |
| 1.8 | Debugging Node.js Applications | 45 min | 🟡 Intermediate |
| 1.9 | Node.js with TypeScript | 60 min | 🔴 Advanced |

**Total estimated time:** 8 hours

## 🌍 Real-World Applications

Understanding Node.js fundamentals is critical for:

| Application Area | Why It Matters |
|-----------------|----------------|
| **REST API Servers** | The event loop handles thousands of concurrent requests |
| **Real-Time Systems** (Chat, Gaming) | Non-blocking I/O enables sub-100ms response times |
| **CLI Tools** | npm's module system makes building CLI tools elegant |
| **Microservices** | Understanding modules prevents dependency hell at scale |
| **Serverless Functions** | Cold starts are minimized by understanding Node.js internals |
| **Streaming Platforms** (Netflix, YouTube) | Streams and buffers are the backbone of video processing |

## 🛠️ Mini Projects

| Project | Topics Reinforced | Est. Time |
|---------|-------------------|-----------|
| **📝 Markdown File Analyzer** | `fs`, `path`, CLI arguments | 2 hours |
| **🔐 Password Generator CLI** | `crypto`, `process.argv`, npm packaging | 1.5 hours |
| **📊 System Monitor Dashboard** | `os`, `process`, `events` | 2.5 hours |
| **📁 File Organizer Script** | `fs`, `path`, streams | 2 hours |

## 🧪 Practice Labs

Interactive labs to reinforce your learning:
- [Node.js Lab: File System Operations](/DSA-Notes-Problems/labs/nodejs/file-system)
- [Node.js Lab: Event Loop Simulator](/DSA-Notes-Problems/labs/nodejs/event-loop)
- [Node.js Lab: npm Package Publishing](/DSA-Notes-Problems/labs/nodejs/npm-publish)

## 🎯 Interview Preparation

Common interview questions from this module:
- "Explain the Event Loop in Node.js"
- "What's the difference between `process.nextTick()` and `setImmediate()`?"
- "CommonJS vs ES Modules — when to use which?"
- "How does Node.js handle concurrent requests with a single thread?"
- "What is libuv and what role does it play?"
- "Explain the difference between blocking and non-blocking I/O"

📄 Full interview guide: [Node.js Interview Questions](/DSA-Notes-Problems/nodejs/interview-questions)

## 🔗 Related Modules

| Module | Connection |
|--------|-----------|
| [JavaScript Fundamentals](/DSA-Notes-Problems/javascript) | Prerequisite — Node.js runs JavaScript |
| [Core Concepts](/DSA-Notes-Problems/nodejs/core) | Builds directly on fundamentals |
| [Web Development](/DSA-Notes-Problems/nodejs/web) | Express.js relies on `http` module |
| [TypeScript](/DSA-Notes-Problems/typescript) | Adding types to Node.js |

---

> 💡 **Pro Tip:** Don't rush through this module. The fundamentals you learn here will determine how well you understand every subsequent module. Senior engineers can explain the event loop in their sleep.
