---
title: "Docker Containers"
description: "If an image is a recipe, then a container is the cooked meal."
sidebar:
  order: 8
---

## 6. Docker Containers

### 🚀 What is a Container (Running)?

If an image is a recipe, then a **container is the cooked meal**.

A container is a **running instance of an image**. You can run multiple containers from the same image, just like cooking the same recipe multiple times.

---

### 🕹️ Core Container Commands

```bash
# === CREATING AND RUNNING ===

# Run a container (creates + starts)
docker run nginx

# Run with a custom name
docker run --name my-nginx nginx

# Run in detached mode (background)
docker run -d nginx

# Run interactively (with terminal)
docker run -it ubuntu bash

# Run and auto-remove when stopped
docker run --rm nginx

# === LISTING CONTAINERS ===

# List running containers
docker ps

# List ALL containers (including stopped)
docker ps -a
docker ps --all

# === STARTING / STOPPING ===

# Stop a running container
docker stop my-nginx

# Start a stopped container
docker start my-nginx

# Restart a container
docker restart my-nginx

# Pause a container
docker pause my-nginx

# Unpause a container
docker unpause my-nginx

# === REMOVING ===

# Remove a stopped container
docker rm my-nginx

# Force remove a running container
docker rm -f my-nginx

# Remove all stopped containers
docker container prune

# === INSPECTING ===

# View container details
docker inspect my-nginx

# View running processes inside container
docker top my-nginx
```

---

### 🔍 Understanding `docker ps` Output

```bash
docker ps
```

```
CONTAINER ID   IMAGE    COMMAND                  CREATED         STATUS         PORTS                  NAMES
a3f5b2c1d4e8   nginx    "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:80->80/tcp     my-nginx
```

| Column | Meaning |
|--------|---------|
| CONTAINER ID | Unique short ID of the container |
| IMAGE | Image used to create the container |
| COMMAND | Process running inside the container |
| CREATED | When the container was created |
| STATUS | Current state (Up, Exited, Paused) |
| PORTS | Port mappings (host:container) |
| NAMES | Human-readable name |

---

### 🔄 Container Lifecycle Example

```bash
# 1. Create and run nginx
docker run -d --name web nginx

# 2. Check it's running
docker ps

# 3. Stop it
docker stop web

# 4. See it in stopped state
docker ps -a

# 5. Start it again
docker start web

# 6. Remove it (must be stopped first)
docker stop web
docker rm web

# Or force remove while running
docker rm -f web
```

---

### ⚠️ Common Container Mistakes

- Forgetting `-d` and blocking your terminal
- Running `docker rm` on a running container without `-f`
- Accumulating stopped containers — always clean up with `docker container prune`

---
