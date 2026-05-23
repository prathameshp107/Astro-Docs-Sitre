---
title: "Introduction to Docker"
description: "Docker is an open-source platform that lets you package your application and everything it needs (code, libraries, dependencies, config files) into a singl"
sidebar:
  order: 1
---

## 1. Introduction to Docker

### 🤔 What is Docker?

Docker is an **open-source platform** that lets you package your application and everything it needs (code, libraries, dependencies, config files) into a single portable unit called a **container**.

Think of Docker like a **shipping container** in the real world:

- A shipping container can hold anything — furniture, electronics, food.
- It works the same on a ship, a truck, or a train.
- The content inside doesn't change regardless of where it's transported.

Docker containers work the same way — your app runs identically on your laptop, your colleague's machine, the test server, or production.

---

### 📜 History of Docker

| Year | Event |
|------|-------|
| 2008 | Linux introduces `cgroups` — the foundation of container isolation |
| 2013 | Solomon Hykes demos Docker at PyCon (open-sourced) |
| 2014 | Docker 1.0 released; rapid adoption begins |
| 2015 | Docker Compose, Docker Swarm introduced |
| 2016 | Kubernetes rises as the container orchestration standard |
| 2017 | Docker adopts Moby Project; enterprise features added |
| 2020+ | Docker Desktop improves; Podman and containerd gain popularity |

---

### 😤 Problems Before Docker

Imagine you're a developer. You write a Node.js app on your laptop. It works perfectly. You push it to GitHub and your colleague pulls it. It breaks immediately.

Why?

- Your laptop has **Node 18**. Your colleague has **Node 14**.
- You have a library installed globally that your colleague doesn't have.
- Your OS is macOS; the production server is Ubuntu.

This is the legendary **"Works on my machine"** problem.

---

### 🏗️ Traditional Deployment Problems

```
Developer Machine  →  Test Server  →  Production Server
   Node 18              Node 14          Node 16
   npm 9.0              npm 6.0          npm 8.0
   MongoDB 6            MongoDB 4        MongoDB 5
   Ubuntu 22            CentOS 7         Debian 11
```

Every environment is different. Every deployment is a gamble.

**The old solution? Virtual Machines.**
- A VM runs a full OS (kernel + everything)
- Takes minutes to start
- Uses several GBs of RAM per instance
- Still has environment drift over time

**Docker's solution? Containers.**
- Package the app with its exact dependencies
- Runs in seconds
- Uses MBs of RAM
- Identical everywhere

---

### 📊 Dependency Conflict Diagram

```xml
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">

  <!-- Background -->
  <rect width="760" height="320" fill="#f8f9fa" rx="12"/>

  <!-- Title -->
  <text x="380" y="30" text-anchor="middle" font-size="15" font-weight="bold" fill="#222">"Works on My Machine" Problem</text>

  <!-- Developer Box -->
  <rect x="30" y="55" width="200" height="220" rx="10" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="130" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565c0">💻 Developer</text>
  <text x="130" y="96" text-anchor="middle" font-size="11" fill="#1565c0">macOS Sonoma</text>
  <rect x="50" y="108" width="160" height="30" rx="5" fill="#bbdefb"/>
  <text x="130" y="128" text-anchor="middle" font-size="11" fill="#222">Node.js 18.0</text>
  <rect x="50" y="145" width="160" height="30" rx="5" fill="#bbdefb"/>
  <text x="130" y="165" text-anchor="middle" font-size="11" fill="#222">MongoDB 6.0</text>
  <rect x="50" y="182" width="160" height="30" rx="5" fill="#bbdefb"/>
  <text x="130" y="202" text-anchor="middle" font-size="11" fill="#222">npm 9.2</text>
  <rect x="50" y="219" width="160" height="30" rx="5" fill="#c8e6c9"/>
  <text x="130" y="239" text-anchor="middle" font-size="11" fill="#2e7d32">✅ App Works!</text>

  <!-- Test Server Box -->
  <rect x="280" y="55" width="200" height="220" rx="10" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="380" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#e65100">🖥️ Test Server</text>
  <text x="380" y="96" text-anchor="middle" font-size="11" fill="#e65100">Ubuntu 18.04</text>
  <rect x="300" y="108" width="160" height="30" rx="5" fill="#ffe0b2"/>
  <text x="380" y="128" text-anchor="middle" font-size="11" fill="#222">Node.js 14.0 ⚠️</text>
  <rect x="300" y="145" width="160" height="30" rx="5" fill="#ffe0b2"/>
  <text x="380" y="165" text-anchor="middle" font-size="11" fill="#222">MongoDB 4.0 ⚠️</text>
  <rect x="300" y="182" width="160" height="30" rx="5" fill="#ffe0b2"/>
  <text x="380" y="202" text-anchor="middle" font-size="11" fill="#222">npm 6.0 ⚠️</text>
  <rect x="300" y="219" width="160" height="30" rx="5" fill="#ffcdd2"/>
  <text x="380" y="239" text-anchor="middle" font-size="11" fill="#c62828">❌ App Breaks!</text>

  <!-- Production Server Box -->
  <rect x="530" y="55" width="200" height="220" rx="10" fill="#fce4ec" stroke="#880e4f" stroke-width="2"/>
  <text x="630" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#880e4f">🚀 Production</text>
  <text x="630" y="96" text-anchor="middle" font-size="11" fill="#880e4f">CentOS 7</text>
  <rect x="550" y="108" width="160" height="30" rx="5" fill="#f8bbd0"/>
  <text x="630" y="128" text-anchor="middle" font-size="11" fill="#222">Node.js 16.0 ⚠️</text>
  <rect x="550" y="145" width="160" height="30" rx="5" fill="#f8bbd0"/>
  <text x="630" y="165" text-anchor="middle" font-size="11" fill="#222">MongoDB 5.0 ⚠️</text>
  <rect x="550" y="182" width="160" height="30" rx="5" fill="#f8bbd0"/>
  <text x="630" y="202" text-anchor="middle" font-size="11" fill="#222">npm 8.0 ⚠️</text>
  <rect x="550" y="219" width="160" height="30" rx="5" fill="#ffcdd2"/>
  <text x="630" y="239" text-anchor="middle" font-size="11" fill="#c62828">❌ App Breaks!</text>

  <!-- Arrows -->
  <line x1="232" y1="165" x2="278" y2="165" stroke="#999" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="482" y1="165" x2="528" y2="165" stroke="#999" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- Arrow marker -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#999"/>
    </marker>
  </defs>

  <!-- Bottom Note -->
  <text x="380" y="300" text-anchor="middle" font-size="12" fill="#555">Different environments = Different results = Deployment nightmares</text>
</svg>
```

---
