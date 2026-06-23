---
title: "Practice Exercises"
description: "Hands-on Docker exercises: build a Dockerfile, write a Compose file, use multi-stage builds, optimize layers, and deploy a Swarm stack."
sidebar:
  order: 120
---

## 20. Practice Exercises

### 🎯 How These Exercises Work

Each exercise has:
- **Objectives** — what you'll learn
- **Starter files** — templates to begin from
- **Expected output** — what a correct solution produces
- **Hints** — if you get stuck
- **Solutions** — check your work after trying

> **💡 Pro tip:** Actually type these out. Don't copy-paste. Muscle memory matters.

---

## Exercise 1: Build Your First Dockerfile

**Difficulty:** Beginner | **Time:** 10 minutes

### Objectives
- Write a Dockerfile from scratch
- Use `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`
- Build and run a container

### The App

Create a simple Node.js Express server that responds with "Hello Docker!" on port 3000.

**`app.js`:**
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello Docker! 🐳');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**`package.json`:**
```json
{
  "name": "docker-hello",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

### Your Task

Write a `Dockerfile` that:
1. Uses `node:18-alpine` as the base image (slim!)
2. Sets the working directory to `/app`
3. Copies `package.json` first, then runs `npm ci --only=production`
4. Copies the rest of the app code
5. Exposes port 3000
6. Runs `node app.js`

### Starter Dockerfile

```dockerfile
FROM node:18-alpine

# TODO: Set working directory

# TODO: Copy package.json

# TODO: Install dependencies

# TODO: Copy app code

# TODO: Expose port

# TODO: Define start command
```

### Commands to Run

```bash
# Build the image
docker build -t hello-docker .

# Run it
docker run -d -p 3000:3000 --name hello hello-docker

# Test it
curl http://localhost:3000
# Expected: Hello Docker! 🐳

# View logs
docker logs hello

# Clean up
docker stop hello && docker rm hello
```

### Hint

<details>
<summary>💡 Click for hint</summary>

The order of `COPY` instructions matters! Copy `package.json` **before** the app code so Docker can cache the `npm install` layer. That way, changing your code doesn't reinstall dependencies.
</details>

### Solution

<details>
<summary>🔍 Click for solution</summary>

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```
</details>

### 🏆 Your Turn — Challenge Mode

Modify the Dockerfile to:
- Add a `HEALTHCHECK` that pings `http://localhost:3000` every 30 seconds
- Run the app as a non-root user (`node` user exists in the `node:18-alpine` image)
- Set `NODE_ENV=production` as an environment variable

---

## Exercise 2: Build a Go Binary with Multi-Stage Builds

**Difficulty:** Intermediate | **Time:** 15 minutes

### Objectives
- Use multi-stage builds to create a tiny production image
- Build a Go binary and run it on `scratch`
- Compare image sizes

### The App

**`main.go`:**
```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from Go! 🚀")
	})

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

**`go.mod`:**
```
module hello-go
go 1.21
```

### Your Task

Write a multi-stage Dockerfile:
1. **Stage 1 (`builder`):** Use `golang:1.21-alpine`, copy source, build a static binary
2. **Stage 2 (`production`):** Use `scratch`, copy the binary from builder
3. Build and run the container
4. Check the final image size

### Starter Dockerfile

```dockerfile
# ─── Stage 1: Build ─────────────────────────────────
# TODO: FROM golang:1.21-alpine AS builder

# TODO: Set WORKDIR

# TODO: Copy go.mod and download deps

# TODO: Copy source and build
# Use: CGO_ENABLED=0 GOOS=linux go build -o /app/server

# ─── Stage 2: Production ─────────────────────────────
# TODO: FROM scratch

# TODO: Copy binary from builder

# TODO: Copy SSL certs (for HTTPS calls)

# TODO: EXPOSE 8080

# TODO: ENTRYPOINT
```

### Commands to Run

```bash
# Build the image
docker build -t hello-go .

# Check image size — it should be tiny!
docker images hello-go
# Expected: ~10 MB (not 1 GB!)

# Run it
docker run -d -p 8080:8080 --name hello-go hello-go

# Test it
curl http://localhost:8080
# Expected: Hello from Go! 🚀

# Clean up
docker stop hello-go && docker rm hello-go
```

### Hint

<details>
<summary>💡 Click for hint</summary>

- Use `CGO_ENABLED=0` to build a fully static binary (no C library dependencies)
- `scratch` is an empty base image — perfect for Go binaries
- Copy SSL certs from the builder: `COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/`
</details>

### Solution

<details>
<summary>🔍 Click for solution</summary>

```dockerfile
# ─── Stage 1: Build ─────────────────────────────────
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server

# ─── Stage 2: Production ─────────────────────────────
FROM scratch

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/server /server

EXPOSE 8080
ENTRYPOINT ["/server"]
```
</details>

### 🏆 Your Turn — Challenge Mode

- Add a third stage: a `dev` stage that uses `golang:1.21-alpine` with hot-reload via `air` or `nodemon`
- Add Docker labels for maintainer and version
- Use `--platform linux/amd64` flag to build for a different architecture

---

## Exercise 3: Layer Optimization

**Difficulty:** Intermediate | **Time:** 10 minutes

### Objectives
- Understand how layer ordering affects build cache
- Optimize a Dockerfile for faster rebuilds
- Use `.dockerignore` to reduce build context

### The Problem

Here's a **poorly optimized** Dockerfile:

```dockerfile
FROM node:18

COPY . .

RUN npm install

RUN apt-get update && apt-get install -y python3

EXPOSE 3000

CMD ["node", "server.js"]
```

### Your Task

1. Identify all the problems with this Dockerfile
2. Rewrite it to be optimized

### Problems to Find

| # | Issue | Why It's Bad |
|---|-------|-------------|
| 1 | Using `node:18` (full) instead of `node:18-alpine` | Image is ~1 GB vs ~50 MB |
| 2 | `COPY . .` before `npm install` | Every code change reinstalls all deps |
| 3 | `npm install` instead of `npm ci` | `npm install` can produce different results |
| 4 | Installing `python3` in a Node image | Unnecessary dependency — don't install what you don't need |
| 5 | No `.dockerignore` | Sends `node_modules` and `.git` to Docker daemon |
| 6 | No layer order optimization | Changing any file invalidates all downstream layers |

### Optimized Solution

<details>
<summary>🔍 Click for solution</summary>

**`.dockerignore`:**
```
node_modules
.git
.env
*.md
.gitignore
```

**`Dockerfile`:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 1. Dependencies first (rarely changes)
COPY package*.json ./
RUN npm ci --only=production

# 2. App code last (changes often)
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```
</details>

### 🏆 Your Turn — Challenge Mode

Create a Dockerfile for a Python Flask app that:
- Uses `python:3.11-slim` (not the full image!)
- Installs dependencies from `requirements.txt` **before** copying the app code
- Runs as a non-root user
- Has a healthcheck

---

## Exercise 4: Docker Compose — Multi-Container App

**Difficulty:** Intermediate | **Time:** 20 minutes

### Objectives
- Write a `docker-compose.yml` file from scratch
- Define multiple services that communicate over a network
- Use environment variables and volumes
- Set healthchecks and dependencies

### The App

A simple web app with:
- **`web`** — Node.js frontend/API (port 3000)
- **`db`** — PostgreSQL database (port 5432, internal only)
- **`redis`** — Redis cache (port 6379, internal only)

### Your Task

Write a `docker-compose.yml` that:
1. Defines all three services
2. Creates a custom network for internal communication
3. Mounts a named volume for PostgreSQL data
4. Sets environment variables for DB credentials
5. Makes `web` depend on `db` (with healthcheck condition)
6. Adds resource limits to each service

### Starter docker-compose.yml

```yaml
version: "3.9"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://app:secret@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - NODE_ENV=production
    # TODO: depends_on with healthcheck condition
    # TODO: attach to network
    # TODO: resource limits (256M memory, 0.5 CPU)
    # TODO: restart policy

  db:
    image: postgres:15-alpine
    # TODO: environment variables (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB)
    # TODO: volumes for data persistence
    # TODO: healthcheck (pg_isready)
    # TODO: attach to network (internal only)

  redis:
    image: redis:7-alpine
    # TODO: healthcheck (redis-cli ping)
    # TODO: attach to network (internal only)

volumes:
  # TODO: declare named volume

networks:
  # TODO: declare network
```

### Solution

<details>
<summary>🔍 Click for solution</summary>

```yaml
version: "3.9"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://app:secret@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - NODE_ENV=production
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - app-network
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: "0.5"
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3
    networks:
      - app-network
    restart: unless-stopped

volumes:
  pgdata:

networks:
  app-network:
    driver: bridge
```
</details>

### Commands to Run

```bash
# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Test that web can reach db
docker compose exec web sh -c "wget -qO- http://localhost:3000"

# Stop everything
docker compose down

# Stop and remove volumes (⚠️ deletes data!)
docker compose down -v
```

### 🌟 Verify Your Compose File

```bash
# Validate the compose file
docker compose config

# The output should show the fully resolved configuration
# with defaults filled in
```

### 🏆 Your Turn — Challenge Mode

- Add a fourth service: `nginx` as a reverse proxy on port 80
- Add a `migration` service that runs database migrations and then exits
- Use environment variable interpolation with `${VARIABLE:-default}` syntax

---

## Exercise 5: Deploy a Docker Swarm Stack

**Difficulty:** Advanced | **Time:** 25 minutes

### Objectives
- Initialize a Docker Swarm
- Deploy a stack using `docker stack deploy`
- Scale services
- Perform a rolling update
- Roll back a bad deployment

### Prerequisites

You need at least **2 Docker hosts** for a full Swarm experience, but you can simulate a single-node Swarm for learning:

```bash
# Initialize Swarm (on your main machine, or even locally)
docker swarm init

# Check it worked
docker node ls
# Expected: one node listed as "Leader"
```

> **Note:** Running Swarm on a single node is fine for learning. In production you'd have 3+ managers and many workers.

### The Stack

Deploy a simple stack with:
- **`api`** — a Node.js API (5 replicas)
- **`redis`** — a Redis cache (1 replica)

### Your Task

1. Initialize a Docker Swarm
2. Create the `docker-compose.yml` for Swarm (with `deploy` section)
3. Deploy the stack using `docker stack deploy`
4. Scale the `api` service up and down
5. Perform a rolling update
6. Roll back

### The Stack File

```yaml
# docker-compose.yml (Swarm mode)
version: "3.9"

services:
  api:
    image: nginx:alpine
    ports:
      - target: 80
        published: 8080
        mode: host
    deploy:
      replicas: 5
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
        order: start-first
      rollback_config:
        parallelism: 1
        delay: 5s
      restart_policy:
        condition: any
        max_attempts: 3
      resources:
        limits:
          cpus: "0.25"
          memory: 128M
    healthcheck:
      test: ["CMD", "service", "nginx", "status"]
      interval: 30s
      timeout: 5s
      retries: 3
    networks:
      - swarm-net

  redis:
    image: redis:7-alpine
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      resources:
        limits:
          memory: 256M
    networks:
      - swarm-net

networks:
  swarm-net:
    driver: overlay
```

### Commands to Run

```bash
# ─── 1. INITIALIZE ───────────────────────────────────
docker swarm init

# ─── 2. DEPLOY ──────────────────────────────────────
docker stack deploy -c docker-compose.yml myapp

# Check the stack
docker stack ls
# Expected: myapp, 2 services

# List services
docker stack services myapp
# Expected: myapp_api (5/5 replicas), myapp_redis (1/1 replica)

# List tasks (containers)
docker service ps myapp_api

# ─── 3. SCALE ────────────────────────────────────────
docker service scale myapp_api=10
# Expected: 10/10 replicas

docker service scale myapp_api=3
# Expected: 3/3 replicas

# ─── 4. ROLLING UPDATE ──────────────────────────────
# Update the api service to use a different nginx version
docker service update \
  --image nginx:1.25-alpine \
  --update-parallelism 1 \
  --update-delay 5s \
  myapp_api

# Watch the update
docker service ps myapp_api

# ─── 5. ROLL BACK ────────────────────────────────────
# Imagine the update failed — roll it back
docker service rollback myapp_api

# ─── 6. CLEAN UP ──────────────────────────────────────
docker stack rm myapp
docker swarm leave --force
```

### Expected Swarm Output

```bash
# After deployment:
$ docker stack services myapp
ID                  NAME         MODE        REPLICAS   IMAGE
abc123...           myapp_api    replicated  5/5        nginx:alpine
def456...           myapp_redis  replicated  1/1        redis:7-alpine

# After scaling to 3:
$ docker service ps myapp_api
ID             NAME           IMAGE           NODE         STATE
ghi789...      myapp_api.1    nginx:alpine    manager-1    Running
jkl012...      myapp_api.2    nginx:alpine    manager-1    Running
mno345...      myapp_api.3    nginx:alpine    manager-1    Running
```

### 🏆 Your Turn — Challenge Mode

- Add a `visualizer` service using `dockersamples/visualizer` to see the Swarm UI
- Create an overlay network and verify containers on different services can communicate
- Set up a **production-grade** setup: 3 manager nodes, 5 worker nodes (using Docker Machine or Play with Docker)

---

## Bonus: Dockerfile Best Practices Checklist

Use this checklist to review any Dockerfile you write:

```markdown
- [ ] Uses a slim/alpine base image (not full OS)
- [ ] Dependencies copied and installed before app code
- [ ] Uses `npm ci` instead of `npm install` (or equivalent for your language)
- [ ] Has a `.dockerignore` file
- [ ] Runs as a non-root user
- [ ] Has a `HEALTHCHECK` instruction
- [ ] Uses specific version tags (not `:latest`)
- [ ] Multi-stage build where appropriate
- [ ] Labels applied (maintainer, version)
- [ ] `EXPOSE` only the ports needed
- [ ] No sensitive data baked in (use secrets or env vars at runtime)
- [ ] Cleaned up package manager caches (`apt-get clean`, `npm cache clean --force`)
```

---

### ✅ In Simple Words

- **Exercise 1** teaches the basic Dockerfile — the foundation for everything else.
- **Exercise 2** shows how multi-stage builds produce tiny production images (~10 MB instead of ~1 GB).
- **Exercise 3** trains you to organize Dockerfile instructions for optimal caching.
- **Exercise 4** demonstrates Compose for multi-container apps with proper healthchecks and dependencies.
- **Exercise 5** simulates production-grade Swarm deployment with scaling, rollouts, and rollbacks.
- Each exercise has a **Challenge Mode** for extra practice once you've mastered the basics.

---

## 📋 Exercise Summary

| Exercise | Topic | Difficulty | Time |
|----------|-------|------------|------|
| 1 | Build a Dockerfile | Beginner | 10 min |
| 2 | Multi-stage Go build | Intermediate | 15 min |
| 3 | Layer optimization | Intermediate | 10 min |
| 4 | Docker Compose | Intermediate | 20 min |
| 5 | Docker Swarm stack | Advanced | 25 min |

- **Exercise 1** teaches the basic Dockerfile — the foundation for everything else.
- **Exercise 2** shows how multi-stage builds produce tiny production images (~10 MB instead of ~1 GB).
- **Exercise 3** trains you to organize Dockerfile instructions for optimal caching.
- **Exercise 4** demonstrates Compose for multi-container apps with proper healthchecks and dependencies.
- **Exercise 5** simulates production-grade Swarm deployment with scaling, rollouts, and rollbacks.
- Each exercise has a **Challenge Mode** for extra practice once you've mastered the basics.
