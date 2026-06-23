---
title: "Docker Images"
description: "A Docker image is a read-only template used to create containers. Think of it like a recipe:"
sidebar:
  order: 6
---

## 5. Docker Images

### 🖼️ What is a Docker Image?

A Docker image is a **read-only template** used to create containers. Think of it like a **recipe**:

- The recipe (image) tells you exactly what ingredients and steps are needed
- Every time you cook (run), you get the same dish (container)
- Many people can use the same recipe to cook the same dish

Images are built in **layers** — each layer represents a set of file system changes.

---

### 📚 Image Layers

```xml
<svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="500" height="350" fill="#f8f9fa" rx="12"/>
  <text x="250" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Image Layer System</text>

  <!-- Layer 5 - App Code (top, writable) -->
  <rect x="100" y="50" width="300" height="45" rx="6" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="250" y="69" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">Your App Code Layer</text>
  <text x="250" y="85" text-anchor="middle" font-size="10" fill="#2e7d32">app.js, package.json, etc.</text>
  <text x="420" y="78" text-anchor="end" font-size="9" fill="#555">Writable (Container)</text>

  <!-- Arrow -->
  <text x="250" y="108" text-anchor="middle" font-size="16" fill="#999">▲ built on top of</text>

  <!-- Layer 4 - npm packages -->
  <rect x="100" y="115" width="300" height="40" rx="6" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
  <text x="250" y="132" text-anchor="middle" font-size="12" fill="#1b5e20">npm dependencies Layer</text>
  <text x="250" y="147" text-anchor="middle" font-size="10" fill="#388e3c">node_modules/</text>

  <!-- Layer 3 - Node.js -->
  <rect x="100" y="162" width="300" height="40" rx="6" fill="#bbdefb" stroke="#1565c0" stroke-width="1.5"/>
  <text x="250" y="179" text-anchor="middle" font-size="12" fill="#0d47a1">Node.js Runtime Layer</text>
  <text x="250" y="194" text-anchor="middle" font-size="10" fill="#1565c0">node, npm binaries</text>

  <!-- Layer 2 - OS utilities -->
  <rect x="100" y="209" width="300" height="40" rx="6" fill="#e1bee7" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="250" y="226" text-anchor="middle" font-size="12" fill="#4a148c">OS Utilities Layer</text>
  <text x="250" y="241" text-anchor="middle" font-size="10" fill="#6a1b9a">curl, bash, apt packages</text>

  <!-- Layer 1 - Base OS -->
  <rect x="100" y="256" width="300" height="40" rx="6" fill="#ffe0b2" stroke="#e65100" stroke-width="1.5"/>
  <text x="250" y="273" text-anchor="middle" font-size="12" fill="#bf360c">Base OS Layer</text>
  <text x="250" y="288" text-anchor="middle" font-size="10" fill="#e65100">ubuntu:22.04 (slim)</text>

  <!-- Read-only label -->
  <rect x="30" y="115" width="60" height="185" rx="4" fill="#ffecb3" stroke="#ffc107" stroke-width="1"/>
  <text x="60" y="195" text-anchor="middle" font-size="10" fill="#f57f17" transform="rotate(-90, 60, 195)">READ-ONLY (Image)</text>

  <!-- Bottom note -->
  <text x="250" y="330" text-anchor="middle" font-size="10" fill="#777">Each layer is cached — unchanged layers are reused across builds</text>
</svg>
```

**Why layers matter:**
- Layers are **cached** — if a layer doesn't change, Docker reuses it
- Speeds up builds dramatically
- Multiple images can share identical base layers, saving disk space

---

### 📋 Key Image Commands

```bash
# Pull an image from Docker Hub
docker pull nginx
docker pull node:18
docker pull ubuntu:22.04

# List all local images
docker images
# or
docker image ls

# Remove an image
docker rmi nginx
docker image rm nginx

# Remove all unused images
docker image prune

# View image layer history
docker history node:18

# Inspect image details
docker inspect nginx

# Search for images on Docker Hub
docker search nginx

# Pull a specific version (tag)
docker pull node:18-alpine
docker pull postgres:15.2
```

---

### 🏷️ Understanding Image Tags

```bash
# Format: repository:tag
nginx           # same as nginx:latest
nginx:latest    # latest stable version
nginx:1.25      # specific version
node:18         # Node.js 18.x
node:18-alpine  # Node.js 18 on Alpine Linux (tiny!)
node:18-slim    # Node.js 18, reduced size
```

> **💡 Tip:** Always use specific version tags in production (`node:18.17.0`, not `node:latest`) to avoid unexpected updates breaking your app.

---

### 🌟 Official vs Community Images

| Type | Example | Description |
|------|---------|-------------|
| Official | `nginx`, `node`, `postgres` | Maintained by Docker/vendor |
| Verified Publisher | `bitnami/nginx` | Trusted companies |
| Community | `username/myapp` | Individual users |

---

### ⚠️ Common Mistakes with Images

- Using `latest` tag in production — always use specific versions
- Pulling huge images when Alpine variants exist (e.g., `node:18-alpine` is ~50MB vs `node:18` at ~1GB)
- Forgetting to `docker image prune` — unused images pile up fast

---
