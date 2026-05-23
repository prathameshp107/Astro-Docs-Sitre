---
title: "Deep Dive into Dockerfile"
description: "A Dockerfile is a plain-text script of instructions that Docker reads top-to-bottom to build an image automatically. Every instruction creates a new image"
sidebar:
  order: 101
---

## 1. Deep Dive into Dockerfile

### 📄 What is a Dockerfile?

A **Dockerfile** is a plain-text script of instructions that Docker reads top-to-bottom to build an image automatically. Every instruction creates a new image layer.

**Analogy:** A Dockerfile is like a detailed recipe card. The chef (Docker daemon) reads every step in order and produces the finished dish (image).

---

### ⚙️ The Docker Build Process

```bash
docker build -t my-app:1.0 .
```

What happens behind the scenes:

```
1. Docker CLI sends the build context (files) to Docker daemon
2. Daemon reads the Dockerfile instruction by instruction
3. Each instruction creates a new intermediate layer
4. Layers are cached — unchanged layers are reused
5. Final image is tagged and stored locally
```

```xml
<svg viewBox="0 0 740 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="740" height="200" fill="#f8f9fa" rx="10"/>
  <text x="370" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Build Process</text>

  <!-- Step boxes -->
  <rect x="20"  y="50" width="110" height="55" rx="7" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="75"  y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">Build Context</text>
  <text x="75"  y="92" text-anchor="middle" font-size="9"  fill="#555">files sent to daemon</text>

  <rect x="160" y="50" width="110" height="55" rx="7" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="215" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">Parse</text>
  <text x="215" y="92" text-anchor="middle" font-size="9"  fill="#555">read Dockerfile</text>

  <rect x="300" y="50" width="110" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="355" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#e65100">Execute</text>
  <text x="355" y="92" text-anchor="middle" font-size="9"  fill="#555">run each instruction</text>

  <rect x="440" y="50" width="110" height="55" rx="7" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="495" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#6a1b9a">Cache Check</text>
  <text x="495" y="92" text-anchor="middle" font-size="9"  fill="#555">reuse if unchanged</text>

  <rect x="580" y="50" width="110" height="55" rx="7" fill="#e8f5e9" stroke="#388e3c" stroke-width="1.5"/>
  <text x="635" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#388e3c">Final Image</text>
  <text x="635" y="92" text-anchor="middle" font-size="9"  fill="#555">tagged + stored</text>

  <!-- Arrows -->
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#999"/></marker></defs>
  <line x1="132" y1="77" x2="158" y2="77" stroke="#999" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="272" y1="77" x2="298" y2="77" stroke="#999" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="412" y1="77" x2="438" y2="77" stroke="#999" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="552" y1="77" x2="578" y2="77" stroke="#999" stroke-width="1.5" marker-end="url(#arr)"/>

  <text x="370" y="160" text-anchor="middle" font-size="11" fill="#555">docker build -t my-app:1.0 .</text>
  <text x="370" y="178" text-anchor="middle" font-size="10" fill="#888">The dot ( . ) means "use current directory as build context"</text>
</svg>
```

---

### 📋 All Dockerfile Instructions Explained

#### `FROM` — Base Image

Every Dockerfile must begin with `FROM`. It sets the starting point for the image.

```dockerfile
FROM ubuntu:22.04
FROM node:18-alpine
FROM python:3.11-slim

# Scratch: truly empty base (for Go binaries, etc.)
FROM scratch
```

---

#### `RUN` — Execute Commands During Build

`RUN` executes shell commands and commits the result as a new layer.

```dockerfile
# Shell form
RUN apt-get update && apt-get install -y curl

# Exec form (no shell, preferred for security)
RUN ["apt-get", "install", "-y", "curl"]

# Chain commands to minimize layers (BEST PRACTICE)
RUN apt-get update \
    && apt-get install -y \
       curl \
       git \
       vim \
    && rm -rf /var/lib/apt/lists/*
```

> **💡 Best Practice:** Chain `&&` commands in one `RUN` to reduce layers and always clean up package caches in the same instruction.

---

#### `CMD` — Default Command at Runtime

`CMD` sets the default command that runs when a container starts. Can be overridden at `docker run` time.

```dockerfile
# Exec form (preferred)
CMD ["node", "server.js"]

# Shell form
CMD node server.js

# Passing default args to ENTRYPOINT
CMD ["--port", "3000"]
```

---

#### `ENTRYPOINT` — Fixed Executable

`ENTRYPOINT` defines the main process. Unlike `CMD`, it is NOT overridden by `docker run` arguments — those become arguments to the entrypoint.

```dockerfile
ENTRYPOINT ["node"]
CMD ["app.js"]

# docker run myapp         → runs: node app.js
# docker run myapp main.js → runs: node main.js
```

---

#### `WORKDIR` — Set Working Directory

Sets the current working directory for all subsequent instructions. Creates the directory if it doesn't exist.

```dockerfile
WORKDIR /app

# All following instructions run relative to /app
COPY . .
RUN npm install
```

---

#### `COPY` vs `ADD`

```dockerfile
# COPY: simple, explicit, preferred
COPY package.json ./
COPY src/ ./src/
COPY --chown=node:node . .

# ADD: more powerful but use carefully
# Can auto-extract .tar.gz files
ADD app.tar.gz /app/
# Can fetch remote URLs (avoid — use curl in RUN instead)
ADD https://example.com/file.txt /tmp/
```

> **💡 Rule:** Always prefer `COPY` over `ADD` unless you specifically need tar extraction.

---

#### `ENV` — Environment Variables

Sets environment variables available during build AND at runtime.

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
ENV APP_HOME=/app

# Multiple in one instruction (Docker 1.4+)
ENV NODE_ENV=production \
    PORT=3000 \
    LOG_LEVEL=info
```

---

#### `ARG` — Build-Time Variables

`ARG` defines variables passed at build time only (not available at runtime).

```dockerfile
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

ARG APP_VERSION=1.0.0
LABEL version=${APP_VERSION}

# Pass at build time:
# docker build --build-arg NODE_VERSION=20 .
```

| Feature | `ENV` | `ARG` |
|---------|-------|-------|
| Available at build | ✅ | ✅ |
| Available at runtime | ✅ | ❌ |
| Visible in `docker inspect` | ✅ | ❌ |
| Use for secrets | ❌ Never | ❌ Never |

---

#### `EXPOSE` — Document Ports

`EXPOSE` documents which port the container listens on. It does NOT publish the port — use `-p` for that.

```dockerfile
EXPOSE 3000
EXPOSE 80 443
EXPOSE 5432/tcp
```

---

#### `LABEL` — Metadata

Add key-value metadata to images.

```dockerfile
LABEL maintainer="alice@example.com"
LABEL version="1.0.0"
LABEL description="My Node.js API"
LABEL org.opencontainers.image.source="https://github.com/user/repo"
```

---

#### `USER` — Run as Non-Root

Switches the user for subsequent `RUN`, `CMD`, and `ENTRYPOINT` instructions.

```dockerfile
# Create user and switch
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "app.js"]
```

---

#### `VOLUME` — Declare Mount Points

Declares a mount point and marks it as externally mounted.

```dockerfile
VOLUME ["/data"]
VOLUME /var/lib/postgresql/data
```

---

### 📦 Complete Dockerfile Example

```dockerfile
# syntax=docker/dockerfile:1

# ── Build Arguments ──────────────────────────────
ARG NODE_VERSION=18

# ── Base Image ────────────────────────────────────
FROM node:${NODE_VERSION}-alpine

# ── Metadata ─────────────────────────────────────
LABEL maintainer="devops@company.com"
LABEL version="1.0.0"
LABEL description="Production Node.js API"

# ── Environment Variables ─────────────────────────
ENV NODE_ENV=production \
    PORT=3000 \
    APP_DIR=/app

# ── Working Directory ─────────────────────────────
WORKDIR ${APP_DIR}

# ── Install Dependencies (cached layer) ───────────
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ── Copy Source Code ──────────────────────────────
COPY --chown=node:node src/ ./src/

# ── Security: Run as non-root ─────────────────────
USER node

# ── Expose Port ───────────────────────────────────
EXPOSE ${PORT}

# ── Health Check ──────────────────────────────────
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/health || exit 1

# ── Start Command ─────────────────────────────────
CMD ["node", "src/server.js"]
```

---
