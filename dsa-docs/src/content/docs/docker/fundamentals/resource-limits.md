---
title: "Resource Limits"
description: "Set memory and CPU limits on containers to prevent one container from starving others in production."
sidebar:
  order: 14
---

## 14. Resource Limits

### 🤔 Why Set Limits?

Without limits, a single container can **eat all system resources** and bring down other containers — or even the entire host.

**Analogy:** Imagine a buffet with no portion limits. One person could eat all the food, leaving nothing for others. Resource limits are like giving each person a plate of a fixed size.

**Without limits:** One runaway container can crash everything.
**With limits:** Each container gets a fair share — no more, no less.

---

### 💾 Memory Limits

```bash
# Limit to 256 MB of memory
docker run -d --memory="256m" --name api node

# Limit with swap (256 MB RAM + 128 MB swap = 384 MB total)
docker run -d --memory="256m" --memory-swap="384m" --name api node

# Disable swap entirely
docker run -d --memory="256m" --memory-swap="256m" --name api node

# Set a soft limit (container can burst but will be throttled)
docker run -d --memory-reservation="128m" --memory="256m" --name api node

# What happens when you exceed the limit?
docker run -d --memory="10m" node node -e "const arr = []; while(true) arr.push('x'.repeat(1000000))"
# ⚠️ Container gets OOM-killed (exit code 137)
```

**Real output:**
```bash
$ docker stats api
CONTAINER ID   NAME   CPU %   MEM USAGE / LIMIT    MEM %
a1b2c3d4e5f6   api    12.3%   142.5MiB / 256MiB    55.7%
```

**Memory limit flags:**

| Flag | What It Does |
|------|--------------|
| `--memory` / `-m` | Hard limit — container is killed if it exceeds this |
| `--memory-reservation` | Soft limit — container is throttled above this, but not killed |
| `--memory-swap` | Total memory + swap (must be ≥ `--memory`) |
| `--memory-swappiness` | Kernel's tendency to swap (0 = avoid swap, 100 = aggressive) |
| `--oom-kill-disable` | Don't kill the container on OOM (⚠️ risky — host could freeze) |

---

### 🖥️ CPU Limits

```bash
# Limit to 1 full CPU core
docker run -d --cpus="1.0" --name api node

# Limit to half a CPU core
docker run -d --cpus="0.5" --name api node

# Limit to 1.5 CPU cores (on a multi-core machine)
docker run -d --cpus="1.5" --name api node

# Set CPU shares (relative weight — not a hard limit)
docker run -d --cpu-shares=512 --name api node
# Default is 1024. 512 = half the default weight.
```

**CPU limit flags:**

| Flag | What It Does |
|------|--------------|
| `--cpus` | Hard limit on CPU cores (e.g., `1.5` = 1.5 cores) |
| `--cpu-shares` | Relative weight (default 1024). 512 = half priority, 2048 = double |
| `--cpuset-cpus` | Pin to specific CPU cores (e.g., `0,2` = cores 0 and 2) |
| `--cpu-period` | CPU CFS period in microseconds (default 100000) |
| `--cpu-quota` | CPU CFS quota in microseconds (used with `--cpu-period`) |

---

### 📊 Docker Compose Resource Limits

```yaml
# docker-compose.yml
services:
  api:
    image: node:18-alpine
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 256M
        reservations:
          cpus: "0.25"
          memory: 128M
    # Note: deploy.resources only works in swarm mode
    # For plain compose, use these instead:
    # (Docker Compose v2 also supports these top-level)
    mem_limit: 256m
    mem_reservation: 128m
    cpus: 0.5
```

---

### 🔍 Monitor Usage

```bash
# Live stats for all running containers
docker stats

# Stats for specific containers
docker stats api db redis

# Output (real-time updating):
# CONTAINER ID   NAME       CPU %   MEM USAGE / LIMIT    MEM %   NET I/O        BLOCK I/O
# a1b2c3d4e5f6   api        12.3%   142.5MiB / 256MiB    55.7%   1.5kB / 2.1kB  0B / 0B
# b2c3d4e5f6a1   db         8.1%    89.2MiB / 512MiB     17.4%   3.2kB / 5.1kB  0B / 0B
```

---

### ⚠️ Why Production Limits Are Non-Negotiable

**Scenario: No limits on production**

```bash
# You deploy a new Node.js app
docker run -d -p 3000:3000 --name myapp node-app

# There's a memory leak in the new version
# The container eats up all 8 GB of host memory
# All other containers on the host get OOM-killed
# Your database container crashes → full outage 😱
```

**Scenario: With limits on production**

```bash
docker run -d -p 3000:3000 --memory="512m" --cpus="0.75" --name myapp node-app

# Same memory leak — but container hits 512 MB
# Docker kills just this container → restart policy starts it again
# Other containers continue running fine ✅
```

---

### 🧪 Practical Example

```bash
# Run two containers with different limits to see the difference

# Container A — heavily limited
docker run -d --name limited --memory="64m" --cpus="0.25" alpine sh -c "while true; do echo 'working...'; sleep 1; done"

# Container B — no limits (can use all resources)
docker run -d --name unlimited alpine sh -c "while true; do echo 'working...'; sleep 1; done"

# Compare their stats
docker stats limited unlimited

# Output:
# CONTAINER ID   NAME        CPU %   MEM USAGE / LIMIT
# a1b2c3d4       limited     0.1%    2.3MiB / 64MiB     ← capped at 64 MB
# e5f6a1b2       unlimited   0.1%    2.5MiB / 8GiB      ← no limit, uses all host memory
```

---

### ✅ In Simple Words

- Use `--memory` to set a **hard limit** — the container gets killed if it exceeds this.
- Use `--cpus` to limit how many CPU cores a container can use.
- **Always set limits in production** — one bad container can bring down everything.
- Use `docker stats` to monitor real-time resource usage.
- `--memory-reservation` is a **soft limit** — good for normal operation with headroom for bursts.
- Without limits, a memory leak or infinite loop becomes a **full outage**.
