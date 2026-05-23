# 🐳 Advanced Docker

> **Production-grade Docker mastery — from Dockerfile architecture to CI/CD pipelines, security hardening, and beyond.**

---

## Table of Contents

1. [Deep Dive into Dockerfile](#1-deep-dive-into-dockerfile)
2. [Dockerfile Optimization](#2-dockerfile-optimization)
3. [Multi-Stage Builds](#3-multi-stage-builds)
4. [Docker Compose](#4-docker-compose)
5. [Real Multi-Container Projects](#5-real-multi-container-projects)
6. [Docker Networking Advanced](#6-docker-networking-advanced)
7. [Docker Volumes Advanced](#7-docker-volumes-advanced)
8. [Docker Security](#8-docker-security)
9. [Docker in Production](#9-docker-in-production)
10. [Docker Registry](#10-docker-registry)
11. [Docker CI/CD Integration](#11-docker-cicd-integration)
12. [Monitoring Containers](#12-monitoring-containers)
13. [Docker Backup and Recovery](#13-docker-backup-and-recovery)
14. [Docker Best Practices](#14-docker-best-practices)
15. [Docker Troubleshooting](#15-docker-troubleshooting)
16. [Docker vs Kubernetes](#16-docker-vs-kubernetes)
17. [Docker Interview Questions](#17-docker-interview-questions)
18. [Final Learning Roadmap](#18-final-learning-roadmap)

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

```svg
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

## 2. Dockerfile Optimization

### 🎯 Why Optimization Matters

| Problem | Impact |
|---------|--------|
| Large images | Slow deployments, high storage cost |
| Many layers | Slow builds, poor cache utilization |
| Root user | Security vulnerability |
| Secrets in layers | Data leakage |
| Unnecessary files | Bloated images |

---

### ⚡ Layer Caching Strategy

```svg
<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="700" height="380" fill="#f8f9fa" rx="10"/>
  <text x="350" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Layer Caching: Bad vs Good Order</text>

  <!-- BAD side -->
  <text x="165" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">❌ Bad Order</text>
  <rect x="30"  y="62" width="270" height="38" rx="6" fill="#ffcdd2" stroke="#c62828" stroke-width="1.5"/>
  <text x="165" y="87" text-anchor="middle" font-size="11" fill="#7f0000">FROM node:18-alpine</text>

  <rect x="30"  y="107" width="270" height="38" rx="6" fill="#ef9a9a" stroke="#c62828" stroke-width="1.5"/>
  <text x="165" y="132" text-anchor="middle" font-size="11" fill="#7f0000">COPY . .  ← copies EVERYTHING first</text>

  <rect x="30"  y="152" width="270" height="38" rx="6" fill="#ef9a9a" stroke="#c62828" stroke-width="1.5"/>
  <text x="165" y="177" text-anchor="middle" font-size="11" fill="#7f0000">RUN npm install</text>

  <rect x="30"  y="197" width="270" height="55" rx="6" fill="#ffebee" stroke="#c62828" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="165" y="218" text-anchor="middle" font-size="10" fill="#c62828">⚠️ Every code change</text>
  <text x="165" y="234" text-anchor="middle" font-size="10" fill="#c62828">invalidates npm install cache!</text>
  <text x="165" y="250" text-anchor="middle" font-size="10" fill="#c62828">Full reinstall every build.</text>

  <!-- GOOD side -->
  <text x="535" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">✅ Good Order</text>
  <rect x="400" y="62"  width="270" height="38" rx="6" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="535" y="87"  text-anchor="middle" font-size="11" fill="#1b5e20">FROM node:18-alpine</text>

  <rect x="400" y="107" width="270" height="38" rx="6" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="535" y="132" text-anchor="middle" font-size="11" fill="#1b5e20">COPY package*.json ./  ← deps only</text>

  <rect x="400" y="152" width="270" height="38" rx="6" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="535" y="177" text-anchor="middle" font-size="11" fill="#1b5e20">RUN npm ci  ← cached unless deps change</text>

  <rect x="400" y="197" width="270" height="38" rx="6" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="535" y="222" text-anchor="middle" font-size="11" fill="#1b5e20">COPY . .  ← source code last</text>

  <rect x="400" y="242" width="270" height="50" rx="6" fill="#e8f5e9" stroke="#388e3c" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="535" y="263" text-anchor="middle" font-size="10" fill="#2e7d32">✅ Code changes only invalidate</text>
  <text x="535" y="279" text-anchor="middle" font-size="10" fill="#2e7d32">the COPY layer. npm ci stays cached!</text>

  <!-- divider -->
  <line x1="350" y1="55" x2="350" y2="310" stroke="#ccc" stroke-width="1.5" stroke-dasharray="6,4"/>

  <text x="350" y="345" text-anchor="middle" font-size="11" fill="#555">Rule: put things that change LEAST at the top, things that change MOST at the bottom</text>
</svg>
```

---

### 🔬 Before vs After: Optimized Dockerfile

**Before (Unoptimized — 900MB+)**

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
```

**After (Optimized — ~90MB)**

```dockerfile
FROM node:18-alpine

WORKDIR /app

# ① Dependency layer (cached unless package.json changes)
COPY package*.json ./
RUN npm ci --only=production \
    && npm cache clean --force

# ② Source code layer (only invalidated on code changes)
COPY --chown=node:node src/ ./src/

# ③ Non-root user
USER node

EXPOSE 3000
CMD ["node", "src/server.js"]
```

| Metric | Before | After |
|--------|--------|-------|
| Image size | ~900MB | ~90MB |
| Build time (cold) | 3 min | 1 min |
| Build time (cached) | 3 min | 5 sec |
| Security | Root user | Non-root |

---

### 🧹 `.dockerignore` — Keep Build Context Clean

```dockerignore
# Dependencies
node_modules
npm-debug.log

# Version control
.git
.gitignore

# Environment files
.env
.env.*
*.env

# Build output
dist
build
.next
out

# Logs
logs
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode
.idea
*.swp

# Tests
coverage
.nyc_output
__tests__
*.test.js
*.spec.js

# Documentation
README.md
docs/
```

---

## 3. Multi-Stage Builds

### 🏗️ What are Multi-Stage Builds?

Multi-stage builds use multiple `FROM` instructions in a single Dockerfile. Each `FROM` starts a new stage with a clean filesystem. You can selectively **copy artifacts** from earlier stages into the final image.

**Result:** Tiny production images that contain only what's needed to run — not to build.

---

### 🗺️ Multi-Stage Workflow Diagram

```svg
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="720" height="300" fill="#f0f4f8" rx="10"/>
  <text x="360" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Multi-Stage Build Workflow</text>

  <!-- Stage 1: Builder -->
  <rect x="20" y="48" width="200" height="190" rx="10" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="120" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565c0">Stage 1: builder</text>
  <text x="120" y="86" text-anchor="middle" font-size="9" fill="#555">FROM node:18 (900MB)</text>
  <rect x="35" y="95"  width="170" height="22" rx="4" fill="#bbdefb"/>
  <text x="120" y="111" text-anchor="middle" font-size="10" fill="#1565c0">Source Code</text>
  <rect x="35" y="123" width="170" height="22" rx="4" fill="#bbdefb"/>
  <text x="120" y="139" text-anchor="middle" font-size="10" fill="#1565c0">node_modules (all)</text>
  <rect x="35" y="151" width="170" height="22" rx="4" fill="#bbdefb"/>
  <text x="120" y="167" text-anchor="middle" font-size="10" fill="#1565c0">Build Tools (tsc, webpack)</text>
  <rect x="35" y="179" width="170" height="22" rx="4" fill="#90caf9"/>
  <text x="120" y="195" text-anchor="middle" font-size="10" font-weight="bold" fill="#0d47a1">→ /app/dist (compiled)</text>
  <text x="120" y="228" text-anchor="middle" font-size="10" fill="#888">~900MB total</text>

  <!-- Arrow with COPY --from -->
  <line x1="222" y1="185" x2="310" y2="185" stroke="#e65100" stroke-width="2.5"/>
  <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#e65100"/></marker></defs>
  <line x1="222" y1="185" x2="308" y2="185" stroke="#e65100" stroke-width="2.5" marker-end="url(#a2)"/>
  <text x="265" y="175" text-anchor="middle" font-size="9" fill="#e65100">COPY --from=builder</text>
  <text x="265" y="198" text-anchor="middle" font-size="9" fill="#e65100">/app/dist only</text>

  <!-- Stage 2: Production -->
  <rect x="312" y="48" width="200" height="190" rx="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="412" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">Stage 2: production</text>
  <text x="412" y="86" text-anchor="middle" font-size="9" fill="#555">FROM node:18-alpine (50MB)</text>
  <rect x="327" y="95"  width="170" height="22" rx="4" fill="#c8e6c9"/>
  <text x="412" y="111" text-anchor="middle" font-size="10" fill="#2e7d32">dist/ (compiled output)</text>
  <rect x="327" y="123" width="170" height="22" rx="4" fill="#c8e6c9"/>
  <text x="412" y="139" text-anchor="middle" font-size="10" fill="#2e7d32">node_modules (prod only)</text>
  <rect x="327" y="151" width="170" height="22" rx="4" fill="#c8e6c9"/>
  <text x="412" y="167" text-anchor="middle" font-size="10" fill="#2e7d32">Non-root user</text>
  <text x="412" y="228" text-anchor="middle" font-size="10" fill="#2e7d32">~90MB total ✅</text>

  <!-- What's excluded -->
  <rect x="540" y="48" width="160" height="190" rx="10" fill="#ffebee" stroke="#c62828" stroke-width="2"/>
  <text x="620" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">❌ Excluded</text>
  <text x="620" y="86" text-anchor="middle" font-size="9" fill="#888">(never in final image)</text>
  <rect x="555" y="95"  width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="110" text-anchor="middle" font-size="9" fill="#7f0000">TypeScript compiler</text>
  <rect x="555" y="121" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="136" text-anchor="middle" font-size="9" fill="#7f0000">webpack / vite</text>
  <rect x="555" y="147" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="162" text-anchor="middle" font-size="9" fill="#7f0000">devDependencies</text>
  <rect x="555" y="173" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="188" text-anchor="middle" font-size="9" fill="#7f0000">Source .ts files</text>
  <rect x="555" y="199" width="130" height="20" rx="4" fill="#ffcdd2"/>
  <text x="620" y="214" text-anchor="middle" font-size="9" fill="#7f0000">Test files</text>

  <text x="360" y="268" text-anchor="middle" font-size="11" fill="#555">Build stage does the heavy lifting → runtime stage gets only what's needed</text>
</svg>
```

---

### 🟢 Example 1: Node.js + TypeScript

```dockerfile
# ─── Stage 1: Build ───────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
RUN npm run build     # Compiles TypeScript → dist/

# ─── Stage 2: Production ──────────────────────────────────────
FROM node:18-alpine AS production

WORKDIR /app

# Copy only production dependencies manifest
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy compiled output from builder stage
COPY --from=builder /app/dist ./dist

# Security: non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
```

---

### ⚛️ Example 2: React / Next.js App

```dockerfile
# ─── Stage 1: Dependencies ────────────────────────────────────
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ─── Stage 2: Build ───────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── Stage 3: Production Runtime ──────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# Copy Next.js standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

> **💡 Tip:** Enable `output: 'standalone'` in `next.config.js` for smallest possible Next.js images.

---

### 🐹 Example 3: Go Binary (Scratch Image)

```dockerfile
# ─── Stage 1: Build Go Binary ─────────────────────────────────
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o api ./cmd/api

# ─── Stage 2: Minimal Runtime ─────────────────────────────────
FROM scratch

# Copy SSL certs for HTTPS calls
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the binary only
COPY --from=builder /app/api /api

EXPOSE 8080
ENTRYPOINT ["/api"]
# Final image: ~10MB 🚀
```

---

## 4. Docker Compose

### 🎼 What is Docker Compose?

Docker Compose is a tool for defining and running **multi-container applications** using a single YAML file. Instead of running five `docker run` commands manually, you declare everything in `docker-compose.yml` and start it all with one command.

**Analogy:** If Docker is a musician, Docker Compose is the conductor — it makes every instrument (container) play together in harmony.

---

### 📐 The docker-compose.yml Structure

```yaml
version: "3.9"          # Compose file format version

services:               # Your containers (the "musicians")
  web:                  # Service name (also DNS name on the network)
    image: nginx        # Use an existing image
    build: .            # OR build from local Dockerfile
    ports:
      - "8080:80"       # host:container
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - NODE_ENV=production
    depends_on:
      - api             # Start after "api" service
    networks:
      - app-network
    restart: unless-stopped

volumes:                # Named volumes declaration
  db-data:

networks:               # Custom networks declaration
  app-network:
    driver: bridge
```

---

### 🔑 Key `docker-compose.yml` Options

#### `services`

```yaml
services:
  api:
    # Build from local Dockerfile
    build:
      context: .          # Build context directory
      dockerfile: Dockerfile.prod
      args:
        NODE_VERSION: 18

    # OR use a pre-built image
    image: node:18-alpine

    container_name: my-api    # Fixed name (optional)

    restart: unless-stopped   # always | on-failure | no | unless-stopped

    ports:
      - "3000:3000"

    environment:
      NODE_ENV: production
      PORT: 3000

    env_file:
      - .env                  # Load from file

    volumes:
      - ./src:/app/src         # Bind mount
      - node_modules:/app/node_modules  # Named volume

    networks:
      - backend

    depends_on:
      db:
        condition: service_healthy   # Wait for health check

    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
```

#### `volumes`

```yaml
volumes:
  db-data:               # Simple named volume (Docker managed)
  
  app-cache:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /host/path # Bind to specific host path
```

#### `networks`

```yaml
networks:
  frontend:              # Public-facing (nginx, web app)
    driver: bridge
  
  backend:               # Internal (API, DB)
    driver: bridge
    internal: true       # No external access!
```

---

### 💻 Core Docker Compose Commands

```bash
# Start all services (build if needed)
docker compose up

# Start in detached mode (background)
docker compose up -d

# Build images before starting
docker compose up --build

# Start specific service only
docker compose up api

# Stop and remove containers + networks
docker compose down

# Stop and also remove volumes (⚠️ data loss!)
docker compose down -v

# Stop without removing
docker compose stop

# View running services
docker compose ps

# View logs (all services)
docker compose logs

# Follow logs for specific service
docker compose logs -f api

# Run one-off command in a service
docker compose exec api sh
docker compose run api npm run migrate

# Pull latest images
docker compose pull

# Restart a specific service
docker compose restart api

# Scale a service (run multiple instances)
docker compose up -d --scale api=3

# View resource usage
docker compose stats

# Validate compose file
docker compose config
```

---

### ⚙️ Multiple Compose Files (Overrides)

```bash
# Base config (docker-compose.yml)
# Override for dev (docker-compose.dev.yml)
# Override for prod (docker-compose.prod.yml)

# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

```yaml
# docker-compose.dev.yml  (extends base)
services:
  api:
    volumes:
      - .:/app          # Live code reload in dev
    environment:
      NODE_ENV: development
    command: npm run dev
```

---

## 5. Real Multi-Container Projects

### 🏗️ Project 1: Node.js API + MongoDB + Redis

**Folder Structure:**

```
my-api/
├── src/
│   └── server.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── .env
```

**`docker-compose.yml`:**

```yaml
version: "3.9"

services:

  # ── Node.js API ──────────────────────────────────
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: node-api
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      MONGO_URL: mongodb://admin:password@mongodb:27017/myapp?authSource=admin
      REDIS_URL: redis://redis:6379
    depends_on:
      mongodb:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    restart: unless-stopped

  # ── MongoDB ──────────────────────────────────────
  mongodb:
    image: mongo:6
    container_name: mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: myapp
    volumes:
      - mongo-data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/init.js
    ports:
      - "27017:27017"   # Remove in production!
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  # ── Redis ────────────────────────────────────────
  redis:
    image: redis:7-alpine
    container_name: redis
    command: redis-server --requirepass redispassword
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"     # Remove in production!
    networks:
      - app-network
    restart: unless-stopped

volumes:
  mongo-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

---

### 🏗️ Project 2: React + Express API + PostgreSQL

**Folder Structure:**

```
fullstack-app/
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
└── .env
```

**`docker-compose.yml`:**

```yaml
version: "3.9"

services:

  # ── Nginx Reverse Proxy ──────────────────────────
  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - frontend
      - backend
    networks:
      - frontend-net
    restart: unless-stopped

  # ── React Frontend ───────────────────────────────
  frontend:
    build:
      context: ./frontend
      target: runner        # Multi-stage: use the runner stage
    container_name: react-app
    networks:
      - frontend-net
    restart: unless-stopped

  # ── Express Backend API ──────────────────────────
  backend:
    build:
      context: ./backend
    container_name: express-api
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://postgres:password@postgres:5432/myapp
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - frontend-net
      - backend-net
    restart: unless-stopped

  # ── PostgreSQL Database ──────────────────────────
  postgres:
    image: postgres:15-alpine
    container_name: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./backend/migrations:/docker-entrypoint-initdb.d
    networks:
      - backend-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  postgres-data:

networks:
  frontend-net:
  backend-net:
    internal: true    # Database not exposed externally
```

**`nginx/nginx.conf`:**

```nginx
upstream backend {
    server backend:3000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;

    # API requests → Express backend
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # All other requests → React frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 6. Docker Networking Advanced

### 🔍 Internal DNS Resolution

Docker's embedded DNS server resolves container names to IP addresses automatically within custom networks.

```
Container: api
Network: app-network
IP: 172.18.0.3

Other containers on app-network can reach it as:
→ http://api:3000
→ ping api
→ mongodb://mongodb:27017
```

```svg
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="700" height="340" fill="#f0f4f8" rx="10"/>
  <text x="350" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Internal DNS Resolution</text>

  <!-- Network boundary -->
  <rect x="30" y="45" width="640" height="260" rx="12" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="350" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#388e3c">app-network (172.18.0.0/16)</text>

  <!-- Docker DNS Server -->
  <rect x="270" y="78" width="160" height="50" rx="8" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
  <text x="350" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#f57f17">🔍 Docker DNS</text>
  <text x="350" y="117" text-anchor="middle" font-size="9" fill="#777">127.0.0.11</text>

  <!-- Container: api -->
  <rect x="50"  y="175" width="140" height="70" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="120" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">api</text>
  <text x="120" y="216" text-anchor="middle" font-size="9" fill="#555">172.18.0.2</text>
  <text x="120" y="230" text-anchor="middle" font-size="9" fill="#555">port: 3000</text>

  <!-- Container: mongodb -->
  <rect x="280" y="175" width="140" height="70" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="350" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">mongodb</text>
  <text x="350" y="216" text-anchor="middle" font-size="9" fill="#555">172.18.0.3</text>
  <text x="350" y="230" text-anchor="middle" font-size="9" fill="#555">port: 27017</text>

  <!-- Container: redis -->
  <rect x="510" y="175" width="140" height="70" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="580" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">redis</text>
  <text x="580" y="216" text-anchor="middle" font-size="9" fill="#555">172.18.0.4</text>
  <text x="580" y="230" text-anchor="middle" font-size="9" fill="#555">port: 6379</text>

  <!-- DNS query arrows -->
  <defs><marker id="da" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f57f17"/></marker></defs>
  <line x1="120" y1="175" x2="295" y2="130" stroke="#f57f17" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#da)"/>
  <text x="180" y="148" font-size="9" fill="#f57f17">resolve "mongodb"</text>

  <line x1="305" y1="130" x2="160" y2="175" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#da)"/>
  <text x="165" y="158" font-size="9" fill="#1565c0">→ 172.18.0.3</text>

  <!-- Direct connection arrow -->
  <defs><marker id="dc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#2e7d32"/></marker></defs>
  <line x1="192" y1="210" x2="278" y2="210" stroke="#2e7d32" stroke-width="2" marker-end="url(#dc)"/>
  <text x="235" y="203" text-anchor="middle" font-size="9" fill="#2e7d32">mongodb://mongodb:27017</text>

  <line x1="422" y1="210" x2="508" y2="210" stroke="#2e7d32" stroke-width="2" marker-end="url(#dc)"/>
  <text x="465" y="203" text-anchor="middle" font-size="9" fill="#2e7d32">redis://redis:6379</text>

  <text x="350" y="305" text-anchor="middle" font-size="11" fill="#555">Containers on the same network reach each other by service name — no IPs needed</text>
</svg>
```

---

### 🔒 Network Isolation Pattern

```yaml
# Production best practice: separate frontend and backend networks
networks:
  public:      # Nginx talks here
  private:     # API + DB only — completely isolated from internet
    internal: true
```

```bash
# Verify network isolation
docker network inspect app-network

# Test connectivity between containers
docker exec api ping mongodb          # ✅ works (same network)
docker exec nginx ping postgres       # ❌ blocked (different network)
```

---

## 7. Docker Volumes Advanced

### 🗄️ Persistent Database with Backups

```bash
# Run PostgreSQL with named volume
docker run -d \
  --name postgres \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres:15

# Inspect volume location on host
docker volume inspect postgres-data
# Output: Mountpoint: /var/lib/docker/volumes/postgres-data/_data
```

---

### 💾 Backup Strategies

```bash
# ─── Method 1: Volume Backup to tar.gz ───────────────────────
docker run --rm \
  -v postgres-data:/data \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/postgres-backup-$(date +%Y%m%d).tar.gz -C /data .

# ─── Method 2: PostgreSQL pg_dump via exec ────────────────────
docker exec -t postgres \
  pg_dumpall -c -U postgres \
  > backup-$(date +%Y%m%d).sql

# ─── Method 3: MongoDB mongodump ──────────────────────────────
docker exec mongodb \
  mongodump --username admin --password password \
  --authenticationDatabase admin \
  --out /dump

docker cp mongodb:/dump ./mongo-backup-$(date +%Y%m%d)

# ─── Restore PostgreSQL ───────────────────────────────────────
cat backup.sql | docker exec -i postgres psql -U postgres

# ─── Restore MongoDB ──────────────────────────────────────────
docker cp ./mongo-backup mongodb:/dump
docker exec mongodb \
  mongorestore --username admin --password password \
  --authenticationDatabase admin /dump
```

---

### 🔄 Shared Volume Between Containers

```yaml
# Multiple containers sharing one volume (e.g., log aggregator)
services:
  api:
    volumes:
      - app-logs:/app/logs

  log-aggregator:
    image: fluentd
    volumes:
      - app-logs:/fluentd/log   # Same volume!

volumes:
  app-logs:
```

---

## 8. Docker Security

### 🔐 Security Layers in Docker

```svg
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="600" height="320" fill="#f8f9fa" rx="10"/>
  <text x="300" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Security Layers</text>

  <rect x="40" y="45"  width="520" height="52" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="300" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">🏗️ Build Security — Minimal base images, multi-stage, no secrets</text>
  <text x="300" y="85" text-anchor="middle" font-size="10" fill="#555">FROM node:18-alpine | .dockerignore | ARG not ENV for build secrets</text>

  <rect x="70" y="108" width="460" height="52" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="300" y="131" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565c0">👤 Runtime Security — Non-root user, read-only filesystem</text>
  <text x="300" y="148" text-anchor="middle" font-size="10" fill="#555">USER node | --read-only | --cap-drop ALL | --security-opt no-new-privileges</text>

  <rect x="100" y="171" width="400" height="52" rx="8" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="300" y="194" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">🌐 Network Security — Isolated networks, no unnecessary ports</text>
  <text x="300" y="211" text-anchor="middle" font-size="10" fill="#555">internal: true | expose only needed ports | network segmentation</text>

  <rect x="130" y="234" width="340" height="52" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="300" y="257" text-anchor="middle" font-size="12" font-weight="bold" fill="#6a1b9a">🔑 Secrets Security — Docker secrets, env files, vault</text>
  <text x="300" y="274" text-anchor="middle" font-size="10" fill="#555">docker secret | --env-file | HashiCorp Vault | never hardcode</text>
</svg>
```

---

### 👤 Running as Non-Root

```dockerfile
# Alpine Linux
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Ubuntu/Debian
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser

# Use existing node user (node:alpine images include it)
USER node
```

---

### 🔍 Image Scanning

```bash
# Docker Scout (built into Docker Desktop)
docker scout cves nginx:latest
docker scout recommendations nginx:latest

# Trivy (open source, excellent)
trivy image node:18

# Snyk
snyk container test node:18

# Grype
grype node:18
```

---

### 🔐 Secrets Management

```bash
# ─── Docker Secrets (Swarm mode only) ────────────────────────
echo "mysecretpassword" | docker secret create db_password -
docker service create \
  --name api \
  --secret db_password \
  my-api-image
# Secret available at: /run/secrets/db_password

# ─── Runtime secrets via env file (never commit!) ─────────────
docker run --env-file .env.production my-app

# ─── Build secrets (never stored in layers) ───────────────────
# syntax=docker/dockerfile:1
FROM node:18-alpine
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm install
# Build with:
# docker build --secret id=npmrc,src=.npmrc .
```

---

### 🛡️ Security Hardening at Runtime

```bash
docker run \
  --read-only \                        # Read-only root filesystem
  --tmpfs /tmp \                       # Writable tmp in memory
  --cap-drop ALL \                     # Drop all Linux capabilities
  --cap-add NET_BIND_SERVICE \         # Add back only what's needed
  --security-opt no-new-privileges \   # Prevent privilege escalation
  --security-opt seccomp=default \     # Seccomp filtering
  --memory="256m" \                    # Memory limit
  --cpus="0.5" \                       # CPU limit
  --pids-limit 100 \                   # Limit process count
  my-app
```

---

### ✅ Security Checklist

| Check | Command / Practice |
|-------|--------------------|
| Non-root user | `USER node` in Dockerfile |
| Scan for CVEs | `trivy image myapp:latest` |
| No secrets in image | Audit with `docker history` |
| Minimal base image | Use `alpine` or `distroless` |
| Read-only filesystem | `--read-only` flag |
| Drop capabilities | `--cap-drop ALL` |
| Resource limits | `--memory --cpus` |
| Up-to-date base image | Rebuild images regularly |
| Network isolation | `internal: true` networks |
| .dockerignore set | Exclude `.env`, `.git` |

---

## 9. Docker in Production

### 🚀 Production Architecture Diagram

```svg
<svg viewBox="0 0 740 420" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="740" height="420" fill="#f0f4f8" rx="10"/>
  <text x="370" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Production Docker Infrastructure</text>

  <!-- Internet -->
  <ellipse cx="370" cy="60" rx="70" ry="28" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="370" y="65" text-anchor="middle" font-size="12">🌍 Internet</text>

  <!-- Arrow down -->
  <defs><marker id="pa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#607d8b"/></marker></defs>
  <line x1="370" y1="90" x2="370" y2="108" stroke="#607d8b" stroke-width="2" marker-end="url(#pa)"/>

  <!-- Nginx Reverse Proxy -->
  <rect x="240" y="110" width="260" height="55" rx="8" fill="#fff9c4" stroke="#f57f17" stroke-width="2"/>
  <text x="370" y="134" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">🔀 Nginx Reverse Proxy</text>
  <text x="370" y="152" text-anchor="middle" font-size="10" fill="#777">SSL termination | Rate limiting | Load balancing</text>

  <!-- Arrows to services -->
  <line x1="290" y1="167" x2="180" y2="200" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>
  <line x1="370" y1="167" x2="370" y2="200" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>
  <line x1="450" y1="167" x2="560" y2="200" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>

  <!-- Frontend Container -->
  <rect x="50"  y="200" width="250" height="65" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="175" y="224" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">⚛️ React Frontend</text>
  <text x="175" y="240" text-anchor="middle" font-size="10" fill="#555">Static files served by Nginx</text>
  <text x="175" y="255" text-anchor="middle" font-size="9" fill="#888">node:18-alpine | port 3000</text>

  <!-- API Container -->
  <rect x="245" y="200" width="250" height="65" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="370" y="224" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">🟢 Express API</text>
  <text x="370" y="240" text-anchor="middle" font-size="10" fill="#555">REST API | JWT Auth</text>
  <text x="370" y="255" text-anchor="middle" font-size="9" fill="#888">node:18-alpine | port 3000</text>

  <!-- Cache Container -->
  <rect x="440" y="200" width="250" height="65" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="565" y="224" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">🔴 Redis Cache</text>
  <text x="565" y="240" text-anchor="middle" font-size="10" fill="#555">Session store | Cache</text>
  <text x="565" y="255" text-anchor="middle" font-size="9" fill="#888">redis:7-alpine | port 6379</text>

  <!-- Database -->
  <line x1="370" y1="267" x2="370" y2="300" stroke="#607d8b" stroke-width="1.5" marker-end="url(#pa)"/>
  <rect x="245" y="300" width="250" height="65" rx="8" fill="#ffe0b2" stroke="#e65100" stroke-width="1.5"/>
  <text x="370" y="324" text-anchor="middle" font-size="12" font-weight="bold" fill="#bf360c">🐘 PostgreSQL</text>
  <text x="370" y="340" text-anchor="middle" font-size="10" fill="#555">Primary + Read replicas</text>
  <text x="370" y="355" text-anchor="middle" font-size="9" fill="#888">postgres:15-alpine | port 5432 (internal)</text>

  <!-- Volumes indicator -->
  <text x="370" y="395" text-anchor="middle" font-size="10" fill="#888">💾 Named volumes for DB | 🔒 Internal network for DB | 🌐 External only via Nginx</text>
</svg>
```

---

### 🔒 Nginx with SSL in Docker

```nginx
# nginx/nginx.conf
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;  # Force HTTPS
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;

    location /api/ {
        proxy_pass http://api:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

### 🌍 Let's Encrypt with Certbot + Docker

```yaml
services:
  certbot:
    image: certbot/certbot
    volumes:
      - ./ssl:/etc/letsencrypt
      - ./certbot-www:/var/www/certbot
    command: certonly --webroot -w /var/www/certbot
             -d example.com --email admin@example.com
             --agree-tos --non-interactive
```

---

### 📦 Environment Separation

```
docker-compose.yml           # Base config (shared)
docker-compose.dev.yml       # Development overrides
docker-compose.staging.yml   # Staging overrides
docker-compose.prod.yml      # Production overrides
```

```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## 10. Docker Registry

### 📦 Registry Options Comparison

| Registry | Cost | Privacy | Best For |
|----------|------|---------|----------|
| Docker Hub | Free (limited) | Public/Private | Open source, personal |
| GitHub Container Registry | Free for public | Public/Private | GitHub projects |
| AWS ECR | Pay per GB | Private | AWS deployments |
| Google Artifact Registry | Pay per GB | Private | GCP deployments |
| Azure ACR | Pay per tier | Private | Azure deployments |
| Self-hosted (Harbor) | Infrastructure cost | Full control | Air-gapped / compliance |

---

### 🚀 GitHub Container Registry (GHCR)

```bash
# Login with personal access token
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag image for GHCR
docker tag my-app ghcr.io/username/my-app:latest
docker tag my-app ghcr.io/username/my-app:1.0.0

# Push
docker push ghcr.io/username/my-app:latest
docker push ghcr.io/username/my-app:1.0.0

# Pull
docker pull ghcr.io/username/my-app:1.0.0
```

---

### ☁️ AWS ECR (Elastic Container Registry)

```bash
# Authenticate to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS \
  --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Create repository
aws ecr create-repository --repository-name my-app --region us-east-1

# Tag and push
docker tag my-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
```

---

### 🏗️ Private Registry with Harbor

```bash
# Run Harbor (production-grade private registry)
# Download installer from: https://github.com/goharbor/harbor/releases

# After installation:
docker login registry.company.com
docker tag myapp registry.company.com/myproject/myapp:1.0
docker push registry.company.com/myproject/myapp:1.0
```

---

## 11. Docker CI/CD Integration

### 🔄 GitHub Actions — Build, Test, Push

```yaml
# .github/workflows/docker.yml
name: Docker CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      # ── Checkout code ──────────────────────────────
      - name: Checkout
        uses: actions/checkout@v4

      # ── Setup Docker Buildx (multi-platform) ───────
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # ── Login to GitHub Container Registry ─────────
      - name: Log in to GHCR
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      # ── Extract metadata (tags, labels) ────────────
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}

      # ── Build and push ──────────────────────────────
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha          # GitHub Actions cache
          cache-to: type=gha,mode=max

      # ── Scan for vulnerabilities ────────────────────
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          format: sarif
          output: trivy-results.sarif

      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: trivy-results.sarif
```

---

### 🚀 Full Deploy Pipeline (Build → Test → Push → Deploy)

```yaml
# .github/workflows/deploy.yml
name: Build, Test, and Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests in Docker
        run: |
          docker compose -f docker-compose.test.yml up \
            --abort-on-container-exit \
            --exit-code-from api

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      image-tag: ${{ steps.meta.outputs.version }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: type=sha,prefix=

      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            docker compose pull
            docker compose up -d --no-deps api
            docker image prune -f
```

---

### 🔁 CI/CD Pipeline Diagram

```svg
<svg viewBox="0 0 720 130" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="720" height="130" fill="#f8f9fa" rx="10"/>
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">CI/CD Pipeline</text>
  <defs><marker id="ca" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#607d8b"/></marker></defs>

  <rect x="15"  y="40" width="100" height="50" rx="7" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="65"  y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">📝 Code</text>
  <text x="65"  y="80" text-anchor="middle" font-size="9"  fill="#555">git push</text>

  <rect x="135" y="40" width="100" height="50" rx="7" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="185" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#f57f17">🧪 Test</text>
  <text x="185" y="80" text-anchor="middle" font-size="9"  fill="#555">unit + integration</text>

  <rect x="255" y="40" width="100" height="50" rx="7" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="305" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#6a1b9a">🐳 Build</text>
  <text x="305" y="80" text-anchor="middle" font-size="9"  fill="#555">docker build</text>

  <rect x="375" y="40" width="100" height="50" rx="7" fill="#fce4ec" stroke="#880e4f" stroke-width="1.5"/>
  <text x="425" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#880e4f">🔍 Scan</text>
  <text x="425" y="80" text-anchor="middle" font-size="9"  fill="#555">trivy / snyk</text>

  <rect x="495" y="40" width="100" height="50" rx="7" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="545" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">📦 Push</text>
  <text x="545" y="80" text-anchor="middle" font-size="9"  fill="#555">docker push GHCR</text>

  <rect x="615" y="40" width="90" height="50" rx="7" fill="#e8f5e9" stroke="#388e3c" stroke-width="1.5"/>
  <text x="660" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#1b5e20">🚀 Deploy</text>
  <text x="660" y="80" text-anchor="middle" font-size="9"  fill="#555">compose up</text>

  <line x1="117" y1="65" x2="133" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="237" y1="65" x2="253" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="357" y1="65" x2="373" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="477" y1="65" x2="493" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="597" y1="65" x2="613" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>

  <text x="360" y="116" text-anchor="middle" font-size="10" fill="#777">Automated on every push to main — no manual steps</text>
</svg>
```

---

## 12. Monitoring Containers

### 📊 Built-in Monitoring Commands

```bash
# Live stats for all containers
docker stats

# One-time snapshot (scriptable)
docker stats --no-stream --format \
  "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"

# View logs with timestamps
docker logs -f --timestamps api

# Top processes inside a container
docker top api

# Container events stream
docker events --filter type=container
```

---

### 🏥 Health Checks

```dockerfile
# ── In Dockerfile ────────────────────────────────────────────
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=15s \
            --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

```yaml
# ── In docker-compose.yml ────────────────────────────────────
services:
  api:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s
```

```bash
# Check health status
docker ps                    # Shows (healthy) or (unhealthy)
docker inspect api | grep -A 10 '"Health"'
```

---

### 📈 Prometheus + Grafana Stack

```yaml
# docker-compose.monitoring.yml
services:

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    ports:
      - "8080:8080"

volumes:
  prometheus-data:
  grafana-data:
```

**`prometheus.yml`:**

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'api'
    static_configs:
      - targets: ['api:3000']    # Your app's /metrics endpoint
```

---

## 13. Docker Backup and Recovery

### 💾 Complete Backup Strategy

```bash
# ─── 1. Backup all named volumes ──────────────────────────────
for volume in $(docker volume ls -q); do
  docker run --rm \
    -v $volume:/data \
    -v $(pwd)/backups:/backup \
    alpine \
    tar czf /backup/${volume}-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .
  echo "✅ Backed up volume: $volume"
done

# ─── 2. Backup PostgreSQL database ────────────────────────────
docker exec postgres \
  pg_dump -U postgres myapp \
  > backups/myapp-$(date +%Y%m%d-%H%M%S).sql

# ─── 3. Backup MongoDB ────────────────────────────────────────
docker exec mongodb \
  mongodump --username admin --password pass \
  --authenticationDatabase admin \
  --archive --gzip \
  > backups/mongo-$(date +%Y%m%d-%H%M%S).archive

# ─── 4. Save Docker images to files ──────────────────────────
docker save my-app:1.0.0 | gzip > backups/my-app-1.0.0.tar.gz
docker load < backups/my-app-1.0.0.tar.gz

# ─── 5. Export container filesystem snapshot ──────────────────
docker export my-container | gzip > container-snapshot.tar.gz
docker import container-snapshot.tar.gz my-app:snapshot
```

---

### 🔄 Automated Backup with Cron

```bash
# /etc/cron.d/docker-backup
# Run at 2 AM every day
0 2 * * * root /usr/local/bin/backup-docker.sh >> /var/log/docker-backup.log 2>&1

# /usr/local/bin/backup-docker.sh
#!/bin/bash
BACKUP_DIR="/backups/$(date +%Y-%m-%d)"
mkdir -p $BACKUP_DIR

# Backup all containers' volumes
docker run --rm \
  -v postgres-data:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/postgres-data.tar.gz -C /data .

# Rotate: keep last 7 days
find /backups -maxdepth 1 -type d -mtime +7 -exec rm -rf {} +
```

---

### 🆘 Disaster Recovery

```bash
# ─── Restore Volume from backup ───────────────────────────────
docker volume create postgres-data

docker run --rm \
  -v postgres-data:/data \
  -v $(pwd)/backups:/backup \
  alpine \
  sh -c "cd /data && tar xzf /backup/postgres-data-20240101.tar.gz"

# ─── Restore PostgreSQL from SQL dump ─────────────────────────
cat backups/myapp-20240101.sql | \
  docker exec -i postgres psql -U postgres -d myapp

# ─── Restore MongoDB archive ──────────────────────────────────
docker exec -i mongodb \
  mongorestore --username admin --password pass \
  --authenticationDatabase admin \
  --archive --gzip \
  < backups/mongo-20240101.archive
```

---

## 14. Docker Best Practices

### ✅ Production Image Checklist

```dockerfile
# syntax=docker/dockerfile:1

# ① Pin exact versions — no 'latest'
FROM node:18.17.0-alpine3.18

# ② Set working directory
WORKDIR /app

# ③ Create non-root user early
RUN addgroup -S app && adduser -S app -G app

# ④ Copy dependency files first (cache optimization)
COPY --chown=app:app package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ⑤ Copy source code last
COPY --chown=app:app src/ ./src/

# ⑥ Switch to non-root
USER app

# ⑦ Expose port as documentation
EXPOSE 3000

# ⑧ Add health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# ⑨ Use exec form for CMD (no shell wrapper)
CMD ["node", "src/server.js"]
```

---

### 🏷️ Image Tagging Conventions

```bash
# Semantic versioning (recommended)
myapp:1.0.0           # Exact release
myapp:1.0             # Minor version family
myapp:1               # Major version family
myapp:latest          # Latest stable (auto-updated)

# Git SHA tags (for traceability)
myapp:sha-a3f5b2c     # Exact commit

# Environment tags
myapp:1.0.0-dev
myapp:1.0.0-staging
myapp:1.0.0-prod

# Full production tagging workflow
VERSION=1.0.0
GIT_SHA=$(git rev-parse --short HEAD)
docker tag myapp registry.io/myapp:${VERSION}
docker tag myapp registry.io/myapp:${VERSION}-${GIT_SHA}
docker tag myapp registry.io/myapp:latest
```

---

### 🧹 Regular Cleanup

```bash
# Check Docker disk usage
docker system df

# Aggressive cleanup (removes everything unused)
docker system prune -a --volumes

# Targeted cleanup (safer)
docker container prune    # Remove stopped containers
docker image prune -a     # Remove unused images
docker volume prune       # Remove unused volumes
docker network prune      # Remove unused networks

# Remove images older than 24h
docker image prune -a --filter "until=24h"
```

---

## 15. Docker Troubleshooting

### 🔍 Debugging Flowchart

```svg
<svg viewBox="0 0 680 500" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="680" height="500" fill="#f8f9fa" rx="10"/>
  <text x="340" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Container Troubleshooting Flowchart</text>
  <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#607d8b"/></marker></defs>

  <!-- Start -->
  <ellipse cx="340" cy="60" rx="100" ry="25" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="340" y="65" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">Container Problem?</text>

  <line x1="340" y1="87" x2="340" y2="112" stroke="#607d8b" stroke-width="1.5" marker-end="url(#fa)"/>

  <!-- Check logs -->
  <rect x="220" y="115" width="240" height="40" rx="7" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="340" y="133" text-anchor="middle" font-size="11" font-weight="bold" fill="#e65100">Step 1: Check Logs</text>
  <text x="340" y="148" text-anchor="middle" font-size="9" fill="#777">docker logs --tail 100 my-container</text>

  <line x1="340" y1="157" x2="340" y2="182" stroke="#607d8b" stroke-width="1.5" marker-end="url(#fa)"/>

  <!-- Container running? -->
  <polygon points="340,185 460,220 340,255 220,220" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="340" y="217" text-anchor="middle" font-size="11" font-weight="bold" fill="#4a148c">Container</text>
  <text x="340" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#4a148c">Running?</text>

  <!-- YES path -->
  <line x1="460" y1="220" x2="540" y2="220" stroke="#2e7d32" stroke-width="1.5" marker-end="url(#fa)"/>
  <text x="500" y="213" text-anchor="middle" font-size="10" fill="#2e7d32">YES</text>
  <rect x="542" y="198" width="120" height="44" rx="7" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="602" y="217" text-anchor="middle" font-size="10" font-weight="bold" fill="#1b5e20">docker exec</text>
  <text x="602" y="232" text-anchor="middle" font-size="9" fill="#555">-it container sh</text>

  <!-- NO path -->
  <line x1="340" y1="255" x2="340" y2="280" stroke="#c62828" stroke-width="1.5" marker-end="url(#fa)"/>
  <text x="353" y="270" font-size="10" fill="#c62828">NO</text>
  <rect x="220" y="283" width="240" height="40" rx="7" fill="#ffebee" stroke="#c62828" stroke-width="1.5"/>
  <text x="340" y="301" text-anchor="middle" font-size="11" font-weight="bold" fill="#7f0000">Check Exit Code</text>
  <text x="340" y="316" text-anchor="middle" font-size="9" fill="#777">docker inspect --format '{{.State.ExitCode}}'</text>

  <line x1="340" y1="325" x2="340" y2="350" stroke="#607d8b" stroke-width="1.5" marker-end="url(#fa)"/>

  <!-- Exit codes -->
  <rect x="30"  y="353" width="150" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="105" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 1</text>
  <text x="105" y="389" text-anchor="middle" font-size="9" fill="#555">App error — check</text>
  <text x="105" y="402" text-anchor="middle" font-size="9" fill="#555">application logs</text>

  <rect x="195" y="353" width="150" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="270" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 137</text>
  <text x="270" y="389" text-anchor="middle" font-size="9" fill="#555">OOMKilled — increase</text>
  <text x="270" y="402" text-anchor="middle" font-size="9" fill="#555">--memory limit</text>

  <rect x="360" y="353" width="150" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="435" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 126</text>
  <text x="435" y="389" text-anchor="middle" font-size="9" fill="#555">Permission denied</text>
  <text x="435" y="402" text-anchor="middle" font-size="9" fill="#555">check USER + chmod</text>

  <rect x="525" y="353" width="130" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="590" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 0</text>
  <text x="590" y="389" text-anchor="middle" font-size="9" fill="#555">Process finished</text>
  <text x="590" y="402" text-anchor="middle" font-size="9" fill="#555">use CMD ["-f"] flag</text>

  <!-- Lines to exit codes -->
  <line x1="290" y1="351" x2="165" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="320" y1="351" x2="295" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="360" y1="351" x2="405" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="390" y1="351" x2="555" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="340" y="478" text-anchor="middle" font-size="10" fill="#777">Pro tip: docker events --filter container=name gives real-time lifecycle events</text>
</svg>
```

---

### 🛠️ Common Issues and Fixes

**Problem 1: Container exits immediately**

```bash
# Diagnose
docker logs my-container
docker inspect my-container | grep '"ExitCode"'

# Common causes:
# - App crashes on startup (check logs for stack trace)
# - CMD process exits (use a foreground process)
# - Missing environment variable

# Wrong: process exits immediately
CMD ["npm", "run", "build"]   # Build command, not a server!

# Right: keep running
CMD ["node", "server.js"]
```

---

**Problem 2: Port already in use**

```bash
# Error: bind: address already in use
# Find what's using port 8080
lsof -i :8080               # macOS / Linux
netstat -ano | findstr 8080  # Windows

# Kill the process or use a different port
docker run -p 8081:80 nginx
```

---

**Problem 3: Permission denied on volume**

```bash
# Error: EACCES: permission denied, open '/app/data/file'
# The container user doesn't own the host directory

# Fix 1: Change ownership on host
sudo chown -R 1000:1000 ./data

# Fix 2: Set permissions in Dockerfile
RUN mkdir -p /app/data && chown node:node /app/data
USER node

# Fix 3: Use named volumes (Docker manages permissions)
docker run -v mydata:/app/data node-app
```

---

**Problem 4: Container can't connect to another container**

```bash
# Error: ECONNREFUSED connecting to mongodb:27017
# Containers are on different networks

# Check networks
docker inspect container1 | grep NetworkMode
docker inspect container2 | grep NetworkMode

# Fix: put both on same network
docker network create mynet
docker run --network mynet --name mongodb mongo
docker run --network mynet --name api my-api

# Or in docker-compose: both services must be in same network section
```

---

**Problem 5: Build fails with "no space left"**

```bash
# Check Docker disk usage
docker system df

# Full cleanup
docker system prune -a --volumes

# Increase Docker Desktop disk allocation:
# Docker Desktop → Settings → Resources → Disk Image Size
```

---

**Problem 6: Image build is slow**

```bash
# Check build context size (should be < 100MB)
du -sh .

# If large: update .dockerignore

# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker build .

# Or set in daemon config (/etc/docker/daemon.json):
{ "features": { "buildkit": true } }
```

---

## 16. Docker vs Kubernetes

### 📊 When to Use What

| Feature | Docker + Compose | Kubernetes |
|---------|-----------------|------------|
| Learning curve | Low | High |
| Setup complexity | Minutes | Hours/Days |
| Team size | Small (1-10) | Medium-Large |
| Scale | Single host | Multi-host cluster |
| Auto-healing | Basic (restart policy) | Full (self-healing) |
| Rolling updates | Manual | Automated |
| Service discovery | DNS on same host | Cluster-wide DNS |
| Load balancing | Nginx manual | Built-in |
| Secret management | Env files / Docker Secrets | Kubernetes Secrets |
| Cost | Low | Higher (infra) |
| Best for | Dev, small prod | Large-scale production |

---

### 🧭 Decision Guide

```
Use Docker + Compose when:
  ✅ Single server deployment
  ✅ < 10 containers
  ✅ Small team
  ✅ Development environments
  ✅ Simple microservices
  ✅ Budget constraints

Use Kubernetes when:
  ✅ Multiple servers needed
  ✅ Need zero-downtime deployments
  ✅ Auto-scaling is required
  ✅ 10+ containers / services
  ✅ High availability is critical
  ✅ Large engineering team
  ✅ Complex networking requirements
```

---

### 🔄 The Path from Docker to Kubernetes

```
Docker CLI          → Learn containers basics
Docker Compose      → Multi-container apps on one host
Docker Swarm        → Simple multi-host clustering (built-in)
Kubernetes          → Production-grade orchestration
Helm                → Kubernetes package manager
Service Mesh        → Istio / Linkerd for advanced networking
```

---

## 17. Docker Interview Questions

### 🎯 Intermediate Level

**Q1: What is the difference between `COPY` and `ADD` in a Dockerfile?**
> `COPY` simply copies files from build context to the image — explicit and predictable. `ADD` does the same but also supports auto-extracting `.tar.gz` archives and fetching remote URLs. Best practice: use `COPY` always unless you specifically need `ADD`'s tar extraction feature.

---

**Q2: What is a multi-stage build and why would you use it?**
> Multi-stage builds use multiple `FROM` statements. Earlier stages (build stage) compile/build the application; the final stage copies only the runtime artifacts, leaving behind all build tools and dependencies. Result: tiny, secure production images. For example, a TypeScript app might compile in a `node:18` stage but only ship the `dist/` output in an `alpine` image.

---

**Q3: How does Docker layer caching work and how do you optimize for it?**
> Each Dockerfile instruction creates a cached layer. If an instruction and all preceding layers are unchanged, Docker reuses the cache. Optimization: order instructions from least-changed (base image, dependencies) to most-changed (source code). Always copy `package.json` and run `npm install` before `COPY . .`.

---

**Q4: What is `docker-compose depends_on` and what are its limitations?**
> `depends_on` controls startup order — it starts services in dependency order. However, it does NOT wait for a service to be *ready* (only started). For database readiness, use `condition: service_healthy` with a `healthcheck` defined. Otherwise, your API might start before the DB accepts connections.

---

**Q5: How do you manage secrets in Docker?**
> Three approaches:
> 1. **Env files** (`--env-file .env`) — simple but requires file security
> 2. **Docker Secrets** (Swarm mode) — secrets available as files at `/run/secrets/`
> 3. **External secret managers** — HashiCorp Vault, AWS Secrets Manager injected at runtime
>
> Never hardcode secrets in Dockerfiles or commit them to version control.

---

**Q6: Explain Docker networking: what is the difference between bridge, host, and overlay?**
> - **Bridge**: Default isolated network on one host. Containers get their own IPs; communicate by name on custom bridge networks.
> - **Host**: Container shares the host's network stack directly — no network isolation, best performance, Linux only.
> - **Overlay**: Spans multiple Docker hosts (used in Swarm/Kubernetes). Containers on different physical machines can communicate.

---

### 🎯 Advanced Level

**Q7: How would you reduce a Docker image from 900MB to under 100MB?**
> Four strategies:
> 1. Use Alpine base image (`node:18-alpine` vs `node:18`)
> 2. Multi-stage builds — copy only compiled output to final stage
> 3. `npm ci --only=production` — exclude devDependencies
> 4. `.dockerignore` — exclude `node_modules`, `.git`, test files
> 5. Chain `RUN` commands to reduce layers; clean up in same step

---

**Q8: How do you implement zero-downtime deployments with Docker Compose?**
```bash
# Pull new image
docker compose pull api

# Rolling update: start new container before stopping old
docker compose up -d --no-deps --scale api=2 api
# Wait for new instance to be healthy
sleep 10
docker compose up -d --no-deps --scale api=1 api
```
> For true zero-downtime, Nginx upstream health checks detect the new instance before traffic is routed.

---

**Q9: What happens when you run `docker build --no-cache`?**
> All cached layers are ignored and every instruction is re-executed from scratch. Useful when you need the latest versions of packages from `apt-get` or `apk` that would otherwise be served from a stale cache.

---

**Q10: Describe a production-grade Docker security hardening approach.**
> A layered approach:
> - Dockerfile: non-root user, specific version tags, minimal base image, multi-stage build
> - Runtime: `--read-only`, `--cap-drop ALL`, `--security-opt no-new-privileges`, memory/CPU limits
> - Network: internal networks for databases, no unnecessary port exposure
> - Registry: scan images with Trivy/Snyk in CI before deployment
> - Secrets: Docker Secrets or external vault — never env vars with sensitive values in plain text

---

### 🎭 Scenario-Based Questions

**Q11: Your Node.js container starts but the database connection fails. How do you debug it?**
```bash
# 1. Check if DB container is running and healthy
docker ps
docker logs postgres

# 2. Verify they're on the same network
docker inspect api | grep Networks
docker inspect postgres | grep Networks

# 3. Test connectivity from inside the API container
docker exec -it api sh
> ping postgres
> nc -zv postgres 5432

# 4. Check the connection string env var
docker exec api env | grep DATABASE_URL

# 5. Add depends_on with healthcheck in compose
```

---

**Q12: Your CI pipeline takes 20 minutes to build. How do you speed it up?**
> - **Layer caching**: copy `package.json` before source code; GitHub Actions cache (`cache-from: type=gha`)
> - **Multi-stage builds**: build and test in parallel stages
> - **Docker BuildKit**: `DOCKER_BUILDKIT=1` for parallel layer builds
> - **Smaller base images**: fewer layers to pull
> - **Registry-based caching**: pull previous image as cache source
> ```yaml
> cache-from: type=registry,ref=ghcr.io/user/app:cache
> cache-to: type=registry,ref=ghcr.io/user/app:cache,mode=max
> ```

---

## 18. Final Learning Roadmap

### 🗺️ Complete Docker to DevOps Path

```svg
<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="700" height="480" fill="#f0f4f8" rx="10"/>
  <text x="350" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker → DevOps Learning Roadmap</text>

  <defs><marker id="ra" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#607d8b"/></marker></defs>

  <!-- Stage 1 -->
  <rect x="50"  y="48" width="180" height="70" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="140" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565c0">① Docker Basics</text>
  <text x="140" y="89" text-anchor="middle" font-size="9"  fill="#555">Images, Containers, CLI</text>
  <text x="140" y="104" text-anchor="middle" font-size="9" fill="#555">Volumes, Networks, Hub</text>

  <line x1="232" y1="83" x2="278" y2="83" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 2 -->
  <rect x="280" y="48" width="180" height="70" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="370" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">② Dockerfile Mastery</text>
  <text x="370" y="89" text-anchor="middle" font-size="9"  fill="#555">Instructions, Optimization</text>
  <text x="370" y="104" text-anchor="middle" font-size="9" fill="#555">Multi-stage, Security</text>

  <line x1="462" y1="83" x2="508" y2="83" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 3 -->
  <rect x="510" y="48" width="160" height="70" rx="8" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="590" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">③ Docker Compose</text>
  <text x="590" y="89" text-anchor="middle" font-size="9"  fill="#555">Multi-container apps</text>
  <text x="590" y="104" text-anchor="middle" font-size="9" fill="#555">Real projects</text>

  <!-- Arrow down -->
  <line x1="590" y1="120" x2="590" y2="155" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 4 -->
  <rect x="510" y="158" width="160" height="70" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2"/>
  <text x="590" y="183" text-anchor="middle" font-size="12" font-weight="bold" fill="#6a1b9a">④ Production Docker</text>
  <text x="590" y="199" text-anchor="middle" font-size="9"  fill="#555">Security, Nginx, SSL</text>
  <text x="590" y="214" text-anchor="middle" font-size="9" fill="#555">CI/CD Pipelines</text>

  <line x1="508" y1="193" x2="462" y2="193" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 5 -->
  <rect x="280" y="158" width="180" height="70" rx="8" fill="#fce4ec" stroke="#880e4f" stroke-width="2"/>
  <text x="370" y="183" text-anchor="middle" font-size="12" font-weight="bold" fill="#880e4f">⑤ Docker Swarm</text>
  <text x="370" y="199" text-anchor="middle" font-size="9"  fill="#555">Clustering, Scaling</text>
  <text x="370" y="214" text-anchor="middle" font-size="9" fill="#555">Rolling updates</text>

  <line x1="278" y1="193" x2="232" y2="193" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 6 -->
  <rect x="50" y="158" width="180" height="70" rx="8" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
  <text x="140" y="183" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">⑥ Kubernetes</text>
  <text x="140" y="199" text-anchor="middle" font-size="9"  fill="#555">Pods, Deployments</text>
  <text x="140" y="214" text-anchor="middle" font-size="9" fill="#555">Services, Ingress</text>

  <!-- Arrow down -->
  <line x1="140" y1="230" x2="140" y2="265" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 7 -->
  <rect x="50" y="268" width="180" height="70" rx="8" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
  <text x="140" y="293" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">⑦ GitOps / ArgoCD</text>
  <text x="140" y="309" text-anchor="middle" font-size="9"  fill="#555">Declarative deployments</text>
  <text x="140" y="324" text-anchor="middle" font-size="9" fill="#555">Flux, ArgoCD</text>

  <line x1="232" y1="303" x2="278" y2="303" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 8 -->
  <rect x="280" y="268" width="180" height="70" rx="8" fill="#e3f2fd" stroke="#0288d1" stroke-width="2"/>
  <text x="370" y="293" text-anchor="middle" font-size="12" font-weight="bold" fill="#01579b">⑧ Observability</text>
  <text x="370" y="309" text-anchor="middle" font-size="9"  fill="#555">Prometheus, Grafana</text>
  <text x="370" y="324" text-anchor="middle" font-size="9" fill="#555">Loki, Jaeger</text>

  <line x1="462" y1="303" x2="508" y2="303" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ra)"/>

  <!-- Stage 9 -->
  <rect x="510" y="268" width="160" height="70" rx="8" fill="#fce4ec" stroke="#c62828" stroke-width="2"/>
  <text x="590" y="293" text-anchor="middle" font-size="12" font-weight="bold" fill="#7f0000">⑨ DevSecOps</text>
  <text x="590" y="309" text-anchor="middle" font-size="9"  fill="#555">SAST, DAST, Trivy</text>
  <text x="590" y="324" text-anchor="middle" font-size="9" fill="#555">Policy as Code</text>

  <!-- Time estimates -->
  <text x="350" y="375" text-anchor="middle" font-size="12" font-weight="bold" fill="#444">Estimated Timeline</text>
  <text x="350" y="395" text-anchor="middle" font-size="10" fill="#555">① – ③: 2–4 weeks (fundamentals + compose)</text>
  <text x="350" y="413" text-anchor="middle" font-size="10" fill="#555">④ – ⑤: 2–4 weeks (production + swarm)</text>
  <text x="350" y="431" text-anchor="middle" font-size="10" fill="#555">⑥ – ⑦: 4–8 weeks (Kubernetes + GitOps)</text>
  <text x="350" y="449" text-anchor="middle" font-size="10" fill="#555">⑧ – ⑨: 2–4 weeks (observability + security)</text>
  <text x="350" y="467" text-anchor="middle" font-size="10" fill="#888">Practice daily — build real projects at each stage</text>
</svg>
```

---

### 👨‍💻 Role-Specific Advice

#### Backend Developers
```
Priority: Dockerfile → Compose → Volumes → Networking → CI/CD
Focus on: Containerizing APIs, database setup, secrets, health checks
Projects: Containerize your existing REST API or service
```

#### Frontend Developers
```
Priority: Dockerfile → Compose → Nginx → Multi-stage → CI/CD
Focus on: Multi-stage builds for React/Next.js, Nginx serving, CDN
Projects: Containerize a React app with Nginx reverse proxy
```

#### DevOps Engineers
```
Priority: All sections + Swarm → Kubernetes → Monitoring → Security
Focus on: Production architecture, CI/CD pipelines, security scanning, scaling
Projects: Full production stack with monitoring, CI/CD, and auto-scaling
```

---

### 📚 Recommended Resources

| Resource | Type | Level |
|----------|------|-------|
| [docs.docker.com](https://docs.docker.com) | Official docs | All |
| Docker Deep Dive (Nigel Poulton) | Book | Beginner |
| Play with Docker | Interactive | All |
| KodeKloud Docker course | Video | Beginner-Intermediate |
| Kubernetes Up & Running | Book | Advanced |
| [killer.sh](https://killer.sh) | Practice exams | Advanced |

---

### 🔑 The 10 Commands Every Docker Engineer Must Know

```bash
docker build -t myapp:1.0 .                    # Build an image
docker run -d -p 3000:3000 --name api myapp    # Run a container
docker compose up -d --build                   # Start compose stack
docker logs -f api                             # Follow logs
docker exec -it api sh                         # Enter container
docker stats --no-stream                       # Resource snapshot
docker system df                               # Disk usage
docker image prune -a                          # Clean images
docker compose down -v                         # Full teardown
docker inspect api | grep -i "ipaddr\|port"    # Network info
```

---

> **🏁 You've reached the end of Advanced Docker.** The best way to solidify this knowledge is to **build something real** — take an existing project and containerize it end-to-end: write the Dockerfile, set up Compose, add a CI/CD pipeline, and deploy it. Every concept here will click the moment you struggle through a real problem and solve it.

---

*Documentation version: 2.0 | Last updated: 2025 | Covers Docker Engine 24.x+ and Compose v2*
