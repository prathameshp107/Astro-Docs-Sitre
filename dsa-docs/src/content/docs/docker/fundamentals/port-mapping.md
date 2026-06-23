---
title: "Port Mapping"
description: "Containers are isolated — they have their own network. Your host machine can't access a container's internal ports unless you explicitly map them."
sidebar:
  order: 10
---

## 8. Port Mapping

### 🌐 What is Port Mapping?

Containers are **isolated** — they have their own network. Your host machine can't access a container's internal ports unless you explicitly map them.

**Analogy:** Imagine your app is in an office building (container). The building has internal room numbers (container ports). Port mapping is like the reception desk — it says "if someone calls extension 8080 from outside (host port), connect them to room 80 inside (container port)."

---

### 🔌 Port Mapping Syntax

```bash
docker run -p HOST_PORT:CONTAINER_PORT image
```

```bash
# Host port 8080 → Container port 80
docker run -p 8080:80 nginx

# Access via: http://localhost:8080

# Same port on both
docker run -p 3000:3000 my-node-app

# Multiple ports
docker run -p 80:80 -p 443:443 nginx

# All interfaces on host
docker run -p 0.0.0.0:8080:80 nginx

# Specific interface only
docker run -p 127.0.0.1:8080:80 nginx
```

---

### 🗺️ Port Mapping Flow Diagram

```xml
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="700" height="280" fill="#f0f4f8" rx="12"/>
  <text x="350" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Port Mapping: Host ↔ Container</text>

  <!-- User/Browser -->
  <rect x="20" y="80" width="130" height="80" rx="10" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="85" y="112" text-anchor="middle" font-size="22">🌐</text>
  <text x="85" y="135" text-anchor="middle" font-size="12" fill="#1565c0">Browser</text>
  <text x="85" y="150" text-anchor="middle" font-size="10" fill="#555">localhost:8080</text>

  <!-- Arrow 1 -->
  <line x1="152" y1="120" x2="210" y2="120" stroke="#607d8b" stroke-width="2.5"/>
  <polygon points="210,114 222,120 210,126" fill="#607d8b"/>
  <text x="181" y="110" text-anchor="middle" font-size="10" fill="#607d8b">:8080</text>

  <!-- Host Machine Box -->
  <rect x="222" y="50" width="220" height="160" rx="10" fill="#fff8e1" stroke="#f57f17" stroke-width="2"/>
  <text x="332" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">Host Machine</text>
  <rect x="242" y="85" width="180" height="50" rx="6" fill="#ffe082" stroke="#f9a825" stroke-width="1"/>
  <text x="332" y="108" text-anchor="middle" font-size="11" fill="#e65100">Host Port: 8080</text>
  <text x="332" y="125" text-anchor="middle" font-size="9" fill="#777">0.0.0.0:8080</text>

  <!-- Port mapping label -->
  <text x="332" y="160" text-anchor="middle" font-size="11" fill="#f57f17">-p 8080:80</text>
  <text x="332" y="177" text-anchor="middle" font-size="9" fill="#777">maps to →</text>
  <text x="332" y="195" text-anchor="middle" font-size="9" fill="#777">container port 80</text>

  <!-- Arrow 2 -->
  <line x1="444" y1="120" x2="500" y2="120" stroke="#607d8b" stroke-width="2.5"/>
  <polygon points="500,114 512,120 500,126" fill="#607d8b"/>
  <text x="472" y="110" text-anchor="middle" font-size="10" fill="#607d8b">:80</text>

  <!-- Container Box -->
  <rect x="512" y="50" width="168" height="160" rx="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="596" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">Container</text>
  <rect x="527" y="85" width="138" height="50" rx="6" fill="#a5d6a7" stroke="#388e3c" stroke-width="1"/>
  <text x="596" y="105" text-anchor="middle" font-size="11" fill="#1b5e20">Nginx Server</text>
  <text x="596" y="123" text-anchor="middle" font-size="11" fill="#1b5e20">Port: 80</text>

  <rect x="527" y="145" width="138" height="40" rx="6" fill="#c8e6c9"/>
  <text x="596" y="165" text-anchor="middle" font-size="10" fill="#1b5e20">Serves HTML/CSS</text>
  <text x="596" y="180" text-anchor="middle" font-size="9" fill="#388e3c">isolated network</text>

  <!-- Bottom explanation -->
  <text x="350" y="240" text-anchor="middle" font-size="11" fill="#555">User → localhost:8080 → Host listens → Routes to container:80 → Nginx responds</text>
  <text x="350" y="258" text-anchor="middle" font-size="10" fill="#888">Without -p flag, container port 80 is unreachable from host</text>
</svg>
```

---

### 🌐 Real-World Port Mapping Examples

```bash
# Nginx (web server)
docker run -d -p 8080:80 nginx
# → Access at http://localhost:8080

# Node.js app
docker run -d -p 3000:3000 node:18
# → Access at http://localhost:3000

# MongoDB
docker run -d -p 27017:27017 mongo
# → Connect at mongodb://localhost:27017

# PostgreSQL
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secret postgres
# → Connect at postgresql://localhost:5432

# Redis
docker run -d -p 6379:6379 redis
# → Connect at redis://localhost:6379

# Multiple services (different host ports)
docker run -d -p 8080:80 nginx        # Web → localhost:8080
docker run -d -p 5432:5432 postgres   # DB  → localhost:5432
docker run -d -p 6379:6379 redis      # Cache → localhost:6379
```

---

### ⚠️ Port Conflict Error

```bash
docker run -p 8080:80 nginx
# Error: bind: address already in use
# Solution: use a different host port
docker run -p 8081:80 nginx
```

---
