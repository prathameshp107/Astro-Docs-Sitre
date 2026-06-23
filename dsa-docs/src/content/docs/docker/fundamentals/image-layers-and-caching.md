---
title: "Image Layers & Build Caching"
description: "Docker images are built as a stack of layers. Each Dockerfile instruction creates a new layer, and Docker caches unchanged layers to speed up builds."
sidebar:
  order: 7
---

## 7. Image Layers & Build Caching

### 🧅 What Are Image Layers?

A Docker image is a **stack of read-only layers**. Each layer is the filesystem change caused by a single Dockerfile instruction (`FROM`, `RUN`, `COPY`, etc.).

**Analogy:** Think of image layers like a stack of **transparent sheets**. Each sheet has one change (install Python, copy app code, etc.). Stack them up, and you see the complete image. Change one sheet at the bottom, and everything above needs to be rebuilt.

```mermaid
flowchart TB
    subgraph Image[Complete Docker Image — Stacked Layers]
        direction TB
        L5[Layer 5 — Container Writable Layer<br/>Logs, temp files, runtime changes<br/>🟡 Exists only while container runs]
        L4[Layer 4 — App Code<br/>COPY app.js package.json<br/>🟢 Changed most often]
        L3[Layer 3 — npm Dependencies<br/>RUN npm ci<br/>🟢 Changes when package.json changes]
        L2[Layer 2 — OS Packages<br/>RUN apt-get install -y curl python3<br/>🔵 Rarely changes]
        L1[Layer 1 — Base OS<br/>FROM node:18-alpine<br/>🟣 Changes only when base image updates]
    end
    
    L5 --> L4
    L4 --> L3
    L3 --> L2
    L2 --> L1
    
    style L1 fill:#e1bee7,color:#333
    style L2 fill:#bbdefb,color:#333
    style L3 fill:#c8e6c9,color:#333
    style L4 fill:#a5d6a7,color:#333
    style L5 fill:#ffcc80,color:#333
    style Image fill:#f8f9fa,color:#333
```

**Key rules:**
- Each instruction = one layer
- Layers are **read-only** (except the container's writable layer)
- Layers are **cached** — unchanged layers are reused between builds
- If a layer **changes**, all layers **below it** are still cached, but all layers **above it** must rebuild

---

### 🔄 How the Build Cache Works

```mermaid
flowchart TB
    Start[Start Build] --> Read[Read Dockerfile]
    Read --> CacheCheck{Check cache<br/>for each layer}
    
    CacheCheck -->|Layer unchanged<br/>Cache HIT ✅| Reuse[Reuse cached layer]
    CacheCheck -->|Layer changed<br/>Cache MISS ❌| Invalidate[Invalidate all<br/>downstream layers]
    
    Reuse --> Next[Next instruction]
    Invalidate --> Rebuild[Rebuild this and<br/>all downstream layers]
    Next --> More{More instructions?}
    More -->|Yes| CacheCheck
    More -->|No| Done[Build complete 🎉]
    
    style Start fill:#e3f2fd,color:#333
    style Reuse fill:#c8e6c9,color:#333
    style Invalidate fill:#ffcdd2,color:#333
    style Rebuild fill:#ffcdd2,color:#333
    style Done fill:#c8e6c9,color:#333
```

---

### ⚡ Why Layer Order Matters

This is the single most important optimization for Dockerfile performance.

**Bad order — every code change reinstalls dependencies:**

```dockerfile
FROM node:18-alpine

# App code first (changes on every edit)
COPY . .

# Then dependencies (re-runs every time code changes!)
RUN npm ci
```

**Good order — dependencies are cached unless package.json changes:**

```dockerfile
FROM node:18-alpine

# Dependencies first (rarely changes)
COPY package*.json ./
RUN npm ci

# App code last (changes on every edit)
COPY . .
```

**Result with good order:**
- 1st build: ~60 seconds
- 2nd build (only app code changed): **~3 seconds** (npm layer cached!)
- 3rd build (package.json changed): ~60 seconds (deps rebuild)

---

### 🔍 See Layers in Action

```bash
# View all layers of an image
docker history nginx:latest

# Output (simplified):
# IMAGE          CREATED       CREATED BY                                      SIZE
# d4c3b2a1f6e5   2 weeks ago   /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B
# c3b2a1f6e5d4   2 weeks ago   /bin/sh -c #(nop)  EXPOSE 80                    0B
# b2a1f6e5d4c3   2 weeks ago   /bin/sh -c #(nop)  STOPSIGNAL SIGQUIT           0B
# a1f6e5d4c3b2   2 weeks ago   /bin/sh -c #(nop)  ENTRYPOINT ["/docker-entr…   0B
# f6e5d4c3b2a1   2 weeks ago   /bin/sh -c #(nop)  COPY file:09a3... in /       12kB
# e5d4c3b2a1f6   2 weeks ago   /bin/sh -c apt-get update && apt-get install…   45MB
# d4c3b2a1f6e5   3 weeks ago   /bin/sh -c #(nop)  ENV NGINX_VERSION=1.25.0     0B
# c3b2a1f6e5d4   3 weeks ago   /bin/sh -c #(nop)  FROM ubuntu:22.04            0B
```

Notice: The bottom layers (base OS, apt packages) are large but rarely change. The top layers (config, CMD) are tiny but change more often.

---

### 📦 Layer Sharing Between Images

When you pull multiple images that share a common base, Docker reuses the layers:

```bash
# Both images use node:18-alpine as base
# The base layers are downloaded ONCE and shared
docker pull my-app:v1
docker pull my-other-app:v2
```

```mermaid
flowchart LR
    subgraph Base[Shared Base Layer<br/>node:18-alpine ~ 50 MB]
        BaseOS[Alpine + Node.js Runtime]
    end
    
    subgraph App1[my-app:v1]
        Deps1[npm deps layer]
        Code1[app code layer]
    end
    
    subgraph App2[my-other-app:v2]
        Deps2[npm deps layer]
        Code2[app code layer]
    end
    
    Base --> Deps1
    Base --> Deps2
    Deps1 --> Code1
    Deps2 --> Code2
    
    style Base fill:#e1bee7,color:#333
    style App1 fill:#c8e6c9,color:#333
    style App2 fill:#bbdefb,color:#333
```

---

### 🏗️ Build → Image → Container Lifecycle

```mermaid
flowchart LR
    DF[Dockerfile] -->|docker build| Image[Docker Image<br/>Read-only layers]
    Image -->|docker run| Container[Running Container<br/>+ writable layer]
    Container -->|docker stop| Stopped[Stopped Container<br/>Filesystem preserved]
    Stopped -->|docker start| Container
    Stopped -->|docker rm| Removed[Deleted]
    
    Image -->|docker push| Registry[Registry<br/>Docker Hub / ECR]
    Registry -->|docker pull| Image
    
    style DF fill:#fff3e0,color:#333
    style Image fill:#c8e6c9,color:#333
    style Container fill:#a5d6a7,color:#333
    style Stopped fill:#ffcc80,color:#333
    style Removed fill:#ffcdd2,color:#333
    style Registry fill:#e3f2fd,color:#333
```

---

### 🛠️ Commands to Inspect Layers

```bash
# See layer history
docker history node:18-alpine

# See image size breakdown (detailed)
docker history node:18-alpine --no-trunc

# Inspect image metadata
docker inspect node:18-alpine

# See how much space images use
docker system df

# Output (simplified):
# TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
# Images          5         2         1.2GB     800MB (66%)
# Containers      3         1         50MB      40MB (80%)
# Local Volumes   2         2         100MB     0B (0%)
# Build Cache     12        0         200MB     200MB
```

---

### ⚠️ Common Mistakes with Layers

- **Putting code before deps** — every code change reinstalls all dependencies
- **Not using `.dockerignore`** — the entire directory is sent to Docker context, including `node_modules`
- **Running `apt upgrade`** — changes the base layer, invalidating the entire cache
- **Multiple `RUN` commands instead of one** — each `RUN` is a layer, but more layers mean more metadata overhead
- **Not using `--no-cache` for `apt-get`** — package lists linger in the layer, wasting space

---

### ✅ In Simple Words

- Every Dockerfile instruction creates a **layer** — a snapshot of file changes.
- Docker **caches** each layer. If a layer hasn't changed, it's reused from the cache.
- **Layer order matters**: put things that rarely change (base image, dependencies) first, and things that change often (app code) last.
- Multiple images sharing the same base (like `node:18-alpine`) **share the same layers** on disk — no duplicate downloads.
- The container's **writable layer** sits on top of all image layers — changes made at runtime only modify this thin top layer.
