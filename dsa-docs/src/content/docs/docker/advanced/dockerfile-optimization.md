---
title: "Dockerfile Optimization"
description: "---"
sidebar:
  order: 102
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

```xml
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

```text
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
