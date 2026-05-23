---
title: "Docker Volumes"
description: "Problem: When a container is deleted, all data inside it is gone forever."
sidebar:
  order: 9
---

## 9. Docker Volumes

### 💾 What is a Volume?

**Problem:** When a container is deleted, all data inside it is gone forever.

**Analogy:** A container is like a hotel room. When you check out, the room is cleaned — everything left behind is gone. A volume is like a storage locker outside the hotel — you can store things there, check out, and come back later to retrieve them.

Volumes solve **data persistence** in Docker.

---

### 📦 Types of Storage in Docker

| Type | Description | Use Case |
|------|-------------|----------|
| **Named Volume** | Docker manages the storage location | Databases, persistent data |
| **Bind Mount** | You specify the exact host path | Development (sync code) |
| **Anonymous Volume** | Docker manages, no name | Temporary, discarded after use |
| **tmpfs Mount** | Stored in host memory only | Sensitive temporary data |

---

### 💽 Storage Diagram

```xml
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="700" height="320" fill="#f8f9fa" rx="12"/>
  <text x="350" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Storage Types</text>

  <!-- Host Machine -->
  <rect x="20" y="50" width="660" height="250" rx="10" fill="#fff8e1" stroke="#f57f17" stroke-width="2"/>
  <text x="350" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">Host Machine Filesystem</text>

  <!-- Named Volume -->
  <rect x="40" y="88" width="180" height="100" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">Named Volume</text>
  <text x="130" y="128" text-anchor="middle" font-size="10" fill="#388e3c">/var/lib/docker/volumes/</text>
  <text x="130" y="144" text-anchor="middle" font-size="10" fill="#388e3c">my-data/_data</text>
  <rect x="55" y="155" width="150" height="24" rx="4" fill="#a5d6a7"/>
  <text x="130" y="172" text-anchor="middle" font-size="10" fill="#1b5e20">Docker Managed ✓</text>

  <!-- Bind Mount -->
  <rect x="255" y="88" width="180" height="100" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="345" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#0d47a1">Bind Mount</text>
  <text x="345" y="128" text-anchor="middle" font-size="10" fill="#1565c0">/home/user/myapp</text>
  <text x="345" y="144" text-anchor="middle" font-size="10" fill="#1565c0">(your chosen path)</text>
  <rect x="270" y="155" width="150" height="24" rx="4" fill="#90caf9"/>
  <text x="345" y="172" text-anchor="middle" font-size="10" fill="#0d47a1">You Control Path ✓</text>

  <!-- Anonymous Volume -->
  <rect x="470" y="88" width="180" height="100" rx="8" fill="#fce4ec" stroke="#880e4f" stroke-width="1.5"/>
  <text x="560" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#880e4f">Anonymous Vol</text>
  <text x="560" y="128" text-anchor="middle" font-size="10" fill="#880e4f">/var/lib/docker/volumes/</text>
  <text x="560" y="144" text-anchor="middle" font-size="10" fill="#880e4f">a3b4c5d6.../_data</text>
  <rect x="485" y="155" width="150" height="24" rx="4" fill="#f48fb1"/>
  <text x="560" y="172" text-anchor="middle" font-size="10" fill="#880e4f">Random ID (Temporary)</text>

  <!-- Container -->
  <rect x="200" y="215" width="300" height="60" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2"/>
  <text x="350" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#4a148c">Container</text>
  <text x="350" y="258" text-anchor="middle" font-size="10" fill="#6a1b9a">/data  /app  /tmp</text>

  <!-- Arrows from volumes to container -->
  <line x1="130" y1="190" x2="250" y2="225" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="345" y1="190" x2="345" y2="213" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="560" y1="190" x2="450" y2="225" stroke="#880e4f" stroke-width="1.5" stroke-dasharray="5,3"/>
</svg>
```

---

### 🔧 Volume Commands

```bash
# === NAMED VOLUMES ===

# Create a named volume
docker volume create my-data

# List all volumes
docker volume ls

# Inspect a volume
docker volume inspect my-data

# Remove a volume
docker volume rm my-data

# Remove all unused volumes
docker volume prune

# Use a named volume when running a container
docker run -v my-data:/data/db mongo

# === BIND MOUNTS ===

# Mount current directory into container
docker run -v $(pwd):/app node:18

# Mount specific host path
docker run -v /home/user/myapp:/app node:18

# Read-only bind mount
docker run -v $(pwd):/app:ro node:18

# === ANONYMOUS VOLUMES ===

# Docker creates a random volume
docker run -v /data mongo
```

---

### 💡 Real-World Volume Use Case

```bash
# Run PostgreSQL with persistent data
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=myapp \
  -v postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15

# Even if you delete and recreate the container, data persists:
docker rm -f postgres-db
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=secret \
  -v postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15
# ✅ Your database data is still there!
```

---
