---
title: "Docker Interview Questions"
description: "150+ Docker interview questions from beginner to advanced with hidden answers."
sidebar:
  order: 999
  label: "Interview Questions (150+)"
---

> **How to use:** Click any question to expand the answer.

---

## 🟢 Easy (Q1–Q50)

<details class="qa-card qa-easy">
<summary>
Q1. What is Docker?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Docker is an **open-source platform** that automates the deployment, scaling, and management of applications using **containerization**. It packages an application and its dependencies into a lightweight, portable **container** that runs consistently across any environment (development, staging, production).

Docker was released in 2013 by **DotCloud** (now Docker Inc.) and popularized container technology, making it accessible to developers worldwide.

```bash
docker --version
# Docker version 24.0.7, build afdd53b
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. What is the difference between a Docker Image and a Container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | Docker Image | Docker Container |
|--------|-------------|------------------|
| **Definition** | Read-only template | Running instance of an image |
| **State** | Immutable | Mutable (writable layer) |
| **Lifecycle** | Static, versioned | Ephemeral, created/destroyed |
| **Persistence** | Always exists | Data lost when deleted (unless volumes) |
| **Creation** | Built with `docker build` | Created with `docker run` |

Think of an **image** as a blueprint/class and a **container** as an object/instance. You can create many containers from one image.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What is the difference between Docker and a Virtual Machine?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | Docker Container | Virtual Machine |
|---------|-----------------|----------------|
| **OS** | Shares host kernel | Full guest OS per VM |
| **Size** | MBs | GBs |
| **Startup** | Seconds | Minutes |
| **Isolation** | Process-level | Hardware-level |
| **Performance** | Near-native | Some overhead (hypervisor) |
| **Resource usage** | Lightweight | Heavy (each VM reserves resources) |

Containers are **not virtual machines** — they are isolated processes running on the same host kernel.

```
VM:        [App] [Guest OS] → [Hypervisor] → [Host OS] → [Hardware]
Container: [App] → [Container Runtime] → [Host OS Kernel] → [Hardware]
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What is a Dockerfile?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Dockerfile** is a text file containing a series of instructions to build a Docker image. Each instruction creates a **layer** in the image.

```dockerfile
FROM node:18-alpine          # Base image
WORKDIR /app                  # Working directory
COPY package*.json ./         # Copy dependency files
RUN npm install               # Install dependencies
COPY . .                      # Copy source code
EXPOSE 3000                   # Declare port
CMD ["node", "app.js"]        # Default command
```

Common instructions: `FROM`, `RUN`, `COPY`, `ADD`, `CMD`, `ENTRYPOINT`, `ENV`, `EXPOSE`, `WORKDIR`, `USER`, `VOLUME`

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. What does `docker run -d -p 8080:80 nginx` do?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

This command:
- **`docker run`** — Create and start a new container
- **`-d`** — Run in **detached mode** (background)
- **`-p 8080:80`** — Map **host port 8080** to **container port 80**
- **`nginx`** — Use the **nginx image** (pulled from Docker Hub if not local)

Breaking down `-p 8080:80`:
- Host port (left side): What you type in your browser (`localhost:8080`)
- Container port (right side): What the application inside the container listens on

```bash
docker run -d -p 8080:80 nginx
# Access at http://localhost:8080
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. What is Docker Hub?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Docker Hub** is the official public **container registry** where Docker images are stored, shared, and distributed. It's similar to GitHub for code, but for container images.

```bash
# Pull a public image
docker pull nginx:latest

# Push your own image (requires Docker Hub account)
docker push myusername/myapp:latest

# Search for images
docker search nginx
```

Docker Hub features:
- **Official images** — Maintained by Docker and software vendors (nginx, node, python, postgres)
- **Public/private repos** — Free public repos, paid private repos
- **Automated builds** — Build images from GitHub/Bitbucket
- **Webhooks** — Trigger actions when images are pushed

Alternatives: **GitHub Container Registry (ghcr.io)**, **AWS ECR**, **Google Container Registry**, **Harbor** (self-hosted)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. How do you list running containers?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List only container IDs (useful for scripting)
docker ps -q

# List with custom format
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# List last N containers (running and stopped)
docker ps -n 5
```

`docker ps` output columns:
- **CONTAINER ID** — Short ID (use full ID with `docker inspect`)
- **IMAGE** — The image used
- **COMMAND** — The command running inside
- **CREATED** — When it was created
- **STATUS** — Running, Exited, Up X minutes
- **PORTS** — Port mappings
- **NAMES** — Container name (auto-generated or assigned with `--name`)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. How do you stop and remove a container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```bash
# Stop a running container (graceful: SIGTERM + 10s timeout)
docker stop container_name

# Force stop (immediate: SIGKILL)
docker kill container_name

# Remove a stopped container
docker rm container_name

# Stop and remove in one command
docker rm -f container_name

# Remove all stopped containers
docker container prune

# Remove all containers (including running with -f)
docker rm -f $(docker ps -aq)
```

When a container is removed, all changes in its writable layer are **lost** (unless saved to a volume). Use `docker stop` instead of `docker kill` for graceful shutdowns.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. What is the `docker pull` command?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker pull image:tag` downloads a Docker image from a registry without running it:

```bash
# Pull latest tag
docker pull nginx

# Pull specific version
docker pull node:18-alpine

# Pull from a specific registry
docker pull ghcr.io/myorg/myapp:latest

# Pull all tags (not recommended)
docker pull -a myimage
```

If no tag is specified, `:latest` is used by default. Always specify a specific version tag for reproducible builds.

`docker run` automatically pulls the image if it's not found locally (equivalent to `docker pull` + `docker run`).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. What are Docker Images and how do you build them?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Docker Image** is a lightweight, standalone, executable package that includes everything needed to run an application: code, runtime, system tools, libraries, and settings.

```bash
# Build an image from a Dockerfile in the current directory
docker build -t myapp:1.0 .

# Tag an existing image
docker tag myapp:1.0 myapp:latest

# List images
docker images

# Remove an image
docker rmi myapp:1.0

# Remove unused images
docker image prune
```

Images consist of **read-only layers** created by each Dockerfile instruction. When you change your code, only the layers above the change need to be rebuilt (caching).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. How do you view logs from a container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```bash
# View logs from a running container
docker logs container_name

# Follow logs in real-time (like tail -f)
docker logs -f container_name

# View last N lines
docker logs --tail 100 container_name

# View logs with timestamps
docker logs -t container_name

# View logs since a specific time
docker logs --since 2024-01-01T00:00:00 container_name

# View logs from a specific period
docker logs --since 10m --until 5m container_name
```

For debugging crashed containers, check logs even after the container has stopped — they persist until the container is removed.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. What is `docker inspect` used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker inspect` returns detailed **JSON metadata** about any Docker object (containers, images, volumes, networks):

```bash
# Inspect a container
docker inspect container_name

# Get specific field (using Go template syntax)
docker inspect -f '{{.State.Status}}' container_name

# Get IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name

# Get mount information
docker inspect -f '{{json .Mounts}}' container_name | jq

# Inspect an image
docker inspect nginx:latest
```

Useful for extracting runtime information like IP addresses, port mappings, mount points, environment variables, and network settings.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. How do you execute commands inside a running container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use `docker exec` to run commands inside a running container:

```bash
# Run a command and exit
docker exec container_name ls -la

# Open an interactive shell
docker exec -it container_name sh
# (or bash, if available)

# Set environment variables for the command
docker exec -e MY_VAR=value container_name env

# Run as a different user
docker exec -u root container_name whoami

# Run in the background
docker exec -d container_name touch /tmp/healthcheck
```

The `-it` flags are important for interactive sessions:
- `-i` (interactive) — Keep STDIN open
- `-t` (tty) — Allocate a pseudo-TTY

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. What is the default network mode in Docker?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The default network mode is **bridge** network. When Docker starts, it creates:
- A virtual bridge (`docker0`) on the host
- A private IP subnet for containers (default: 172.17.0.0/16)

```bash
# List networks
docker network ls
# NETWORK ID  NAME    DRIVER  SCOPE
# abc123      bridge  bridge  local
# def456      host    host    local
# ghi789      none    null    local

# Inspect default bridge
docker network inspect bridge
```

**Bridge network features:**
- Containers get their own IP addresses (NATed behind the host)
- Containers can communicate with each other by IP
- Ports must be explicitly published (`-p`) for external access
- No automatic DNS resolution between containers (use custom bridge for that)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. What is a Docker Volume and why is it used?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Docker Volume** is persistent storage that exists independently of container lifecycles. Since containers are ephemeral (data inside is lost when deleted), volumes ensure data survives container restarts and removals.

```bash
# Create a named volume
docker volume create mydata

# Mount a volume when running a container
docker run -v mydata:/app/data myapp

# Using --mount syntax (preferred for more options)
docker run --mount source=mydata,target=/app/data myapp

# List volumes
docker volume ls

# Remove unused volumes
docker volume prune
```

**Volume types:**
1. **Named volumes** — Docker-managed, stored in `/var/lib/docker/volumes/`
2. **Bind mounts** — Mount a host directory: `docker run -v /host/path:/container/path`
3. **Anonymous volumes** — Docker generates a random name, useful for temporary data

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What is the difference between CMD and ENTRYPOINT in a Dockerfile?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Instruction | Purpose | Overridable |
|-------------|---------|-------------|
| `CMD` | Default command/arguments | Yes — replaced at `docker run` |
| `ENTRYPOINT` | Main executable | No — `docker run` arguments are appended |

```dockerfile
# CMD alone — fully overridable
CMD ["node", "app.js"]
# docker run myimage → node app.js
# docker run myimage python test.py → python test.py

# ENTRYPOINT + CMD — CMD provides default args
ENTRYPOINT ["node"]
CMD ["app.js"]
# docker run myimage → node app.js
# docker run myimage server.js → node server.js
```

**Best practice:** Use `ENTRYPOINT` for the main command and `CMD` for default arguments. This gives a clear, flexible interface.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. How do you pass environment variables to a container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Three ways to pass environment variables:

```bash
# 1. Directly with -e flag
docker run -e NODE_ENV=production -e DB_URL=postgres://... myapp

# 2. Using an env file
docker run --env-file .env myapp

# 3. From host environment (just the variable name)
docker run -e MY_HOST_VAR myapp
```

**Security warning:** Never put secrets (passwords, API keys, tokens) in:
- Dockerfiles (`ENV` instruction)
- Image layers
- Version control

Use **Docker Secrets** (Swarm mode), external secret managers (Vault, AWS Secrets Manager), or secret injection at runtime.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. What does `.dockerignore` do?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`.dockerignore` prevents specified files/directories from being sent to the Docker build context, improving build speed and security:

```dockerignore
node_modules
.git
.env
*.md
dist/*.map
coverage/
.gitignore
Dockerfile
.dockerignore
```

**Why it matters:**
- **Faster builds** — Smaller build context means faster transfer to Docker daemon
- **Smaller images** — Unnecessary files aren't included (even if in `.dockerignore`, they don't become layers)
- **Security** — Prevents secrets (.env, .git) from being added to the image

The `.dockerignore` file should be in the same directory as your Dockerfile.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. What is `docker commit`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker commit` creates a new image from a container's current state (including all changes made to the writable layer):

```bash
# Commit changes to a new image
docker commit container_name myapp:snapshot

# Commit with a message and author
docker commit -m "Added feature X" -a "Alice" container_name myapp:v2
```

**When to use:**
- Debugging — save a container's state for later analysis
- Quick prototyping — but not for production builds

**When NOT to use (most of the time):**
- Builds are not reproducible (no Dockerfile)
- No layer caching
- Hard to version control
- Opaque — no way to understand what's in the image

**Best practice:** Always use a Dockerfile for reproducible builds.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. What is `docker tag` used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker tag` creates an alias/tag for an existing image:

```bash
# Tag an image
docker tag myapp:1.0 myapp:latest

# Tag with registry information (for pushing)
docker tag myapp:1.0 myregistry.io/alice/myapp:1.0
docker tag myapp:1.0 myregistry.io/alice/myapp:latest

# Tag is a reference, not a copy (shares the same image ID)
```

**Tagging conventions:**
- `:latest` — Default tag (avoid for production — ambiguous)
- `:1.0`, `:v1.0.0` — Semantic versioning (recommended)
- `:sha-abc123` — Git commit SHA (traceable)
- `:production`, `:staging` — Environment-specific
- `:alpine`, `:slim` — Base image variants

Best practice: Use **specific version tags** for deployments, not `:latest`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. How do you view the contents of a container's filesystem?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Several methods:

```bash
# 1. Interactive shell
docker exec -it container_name sh
# Then navigate: ls, cat, etc.

# 2. Copy files out without entering
docker cp container_name:/app/config.json ./config.json

# 3. Export container filesystem to a tar archive
docker export container_name -o container-fs.tar

# 4. Using docker diff (shows changes since container started)
docker diff container_name
# A = added, C = changed, D = deleted
```

`docker diff` is useful for debugging:
```bash
docker diff my_container
C /app          # Directory changed
A /app/config.json  # File added
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. What is the difference between `docker stop` and `docker kill`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Command | Signal | Behavior |
|---------|--------|----------|
| `docker stop` | SIGTERM → (10s wait) → SIGKILL | **Graceful shutdown** — allows cleanup |
| `docker kill` | SIGKILL (or custom signal) | **Immediate termination** |

```bash
# Graceful stop (recommended)
docker stop mycontainer

# Force kill
docker kill mycontainer

# Send a custom signal
docker kill --signal SIGUSR1 mycontainer
```

**Always prefer `docker stop`** — it gives the application time to:
- Flush pending data to the database
- Close network connections gracefully
- Clean up temporary files
- Log a clean shutdown

`docker kill` should only be used when a container is not responding to `docker stop`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. What are Docker container states?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A container goes through these states:

```
Created → Running → Paused
   ↓                    ↓
Stopped ← (exit) ← Unpaused
```

1. **Created** — `docker create` ran but container hasn't started
2. **Running** — Container is executing its process
3. **Paused** — Processes are frozen (SIGSTOP); uses `docker pause`
4. **Unpaused** — Processes resume (SIGCONT); uses `docker unpause`
5. **Exited** — Process finished (or crashed); exit code indicates status
6. **Dead** — Container was forcibly removed while running

```bash
# Check current state
docker inspect -f '{{.State.Status}}' container_name
# Output: running, exited, paused, created, restarting, removing, dead
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. How do you copy files between host and container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use `docker cp` to copy files between the host and container:

```bash
# Copy FROM container TO host
docker cp container_name:/app/logs/app.log ./logs/

# Copy FROM host TO container
docker cp ./config.json container_name:/app/config.json

# Copy entire directories
docker cp container_name:/app/data/ ./backup-data/

# Copy with current directory (.)
docker cp container_name:/app/. ./app-backup/
```

**Limitations:**
- Container doesn't need to be running (can copy from stopped containers)
- Doesn't work across Docker hosts (use volumes or shared storage)
- Paths are resolved relative to the container's filesystem, not the image

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. What is the Docker build context?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **build context** is the set of files and directories sent to the Docker daemon when building an image:

```bash
# Current directory (.) is the build context
docker build -t myapp .

# Specify a different context directory
docker build -t myapp -f ./docker/Dockerfile ./app

# Context with a URL (Git repo)
docker build -t myapp https://github.com/user/repo.git#main
```

**How it works:**
1. Docker CLI tars the context directory
2. Sends it to the Docker daemon
3. The daemon extracts it, making files available to `COPY` and `ADD` instructions
4. The `.dockerignore` file filters out files BEFORE sending

**Best practices:**
- Keep context small (use `.dockerignore`)
- Don't put the Dockerfile in a parent directory above your app
- CI/CD should use minimal contexts

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What is `docker system prune`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker system prune` cleans up unused Docker resources:

```bash
# Remove all unused containers, networks, images (dangling), and build cache
docker system prune

# Remove everything, including unused images (not just dangling)
docker system prune -a

# Force without confirmation
docker system prune -af

# Filter: only prune resources older than 24h
docker system prune --filter "until=24h"

# Specific prunes:
docker container prune   # Remove stopped containers
docker image prune -a    # Remove unused images
docker volume prune      # Remove unused volumes
docker network prune     # Remove unused networks
```

**What gets removed:**
- Stopped containers
- Networks not used by at least one container
- Dangling images (untagged: `<none>:<none>`)
- Build cache

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. What is the `docker stats` command?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker stats` shows real-time resource usage of running containers:

```bash
# Show stats for all running containers
docker stats

# Show stats for specific containers
docker stats container1 container2

# Show once and exit (no streaming)
docker stats --no-stream

# Format output
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

**Typical output:**
```
CONTAINER ID   NAME      CPU %   MEM USAGE / LIMIT     MEM %
abc123         web       0.25%   45.6MiB / 1.944GiB   2.29%
def456         db        5.10%   256.8MiB / 1.944GiB  13.19%
```

Useful for identifying containers that are consuming too much CPU or memory.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. How do you set resource limits for a container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Set CPU and memory limits to prevent containers from consuming all host resources:

```bash
# Memory limits
docker run -m 512m myapp                    # Max 512MB memory
docker run --memory-swap 1g myapp           # Max 1GB (memory + swap)

# CPU limits
docker run --cpus 1.5 myapp                 # Max 1.5 CPU cores
docker run --cpuset-cpus 0-3 myapp          # Only use CPUs 0-3
docker run --cpu-shares 512 myapp           # Relative weight (default 1024)

# Combined
docker run -d --name web --restart unless-stopped \
  -m 512m --cpus 0.5 \
  -p 8080:80 nginx
```

In Docker Compose:
```yaml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

Always set resource limits in production to prevent noisy neighbors.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. What is the difference between `docker run` and `docker start`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Command | Purpose |
|---------|---------|
| `docker run` | **Create + start** a new container from an image |
| `docker start` | **Start** an existing (stopped) container |

```bash
# docker run = docker create + docker start
docker create --name myapp nginx  # Create (but don't start)
docker start myapp                # Start the created container

# Same as one command:
docker run --name myapp nginx     # Create and start
```

**When to use `docker start`:**
- Restart a container that stopped (e.g., after a crash)
- Start a container you previously stopped
- The container retains its filesystem, volumes, and network configuration

**When to use `docker run`:**
- The first time you want to run an image
- You need different configuration (ports, volumes, env vars)
- You want a clean instance

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. How do you restart a container automatically?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use the `--restart` flag to set the restart policy:

```bash
# Restart unless explicitly stopped (recommended for most services)
docker run --restart unless-stopped nginx

# Always restart, regardless of exit code
docker run --restart always nginx

# Restart on failure (max 5 times)
docker run --restart on-failure:5 nginx

# No automatic restart (default)
docker run --restart no nginx
```

| Policy | Behavior |
|--------|----------|
| `no` | Never restart (default) |
| `on-failure[:max-retries]` | Restart if container exits with non-zero code |
| `always` | Always restart regardless of exit code |
| `unless-stopped` | Always restart, but not if manually stopped |

`unless-stopped` is generally the best choice for production services.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q31. What is the `EXPOSE` instruction in a Dockerfile?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`EXPOSE` **documents** which ports the container listens on — it does NOT actually publish the ports:

```dockerfile
EXPOSE 3000
EXPOSE 8080/tcp  # Default is TCP
EXPOSE 53/udp    # UDP also supported
```

**What `EXPOSE` does:**
- Acts as **documentation** for developers
- Creates a layer of metadata on the image
- Does NOT make ports accessible from outside

**What you still need to do:**
```bash
# -p publishes the port (makes it accessible from host)
docker run -p 3000:3000 myapp
```

You can think of `EXPOSE` as saying "This container will listen on port 3000" — it's a hint to the person running the container.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q32. What is Docker's `ENTRYPOINT` with `exec` form vs `shell` form?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Dockerfile instructions can use two forms:

```dockerfile
# Exec form (JSON array) — RECOMMENDED
ENTRYPOINT ["node", "app.js"]
CMD ["node", "app.js"]
RUN ["apt-get", "install", "-y", "curl"]

# Shell form (string)
ENTRYPOINT node app.js
CMD node app.js
RUN apt-get install -y curl
```

**Exec form:**
- No shell processing (no variable expansion)
- PID 1 is the process itself (receives signals directly)
- Preferred for `CMD` and `ENTRYPOINT`
- Signals (SIGTERM, SIGINT) are passed correctly

**Shell form:**
- Runs through `/bin/sh -c`
- Variable expansion works (`$HOME`)
- PID 1 is the shell, not your app
- **Signals may not reach your app** (the shell doesn't forward them)

```dockerfile
# Bad: signals won't propagate
ENTRYPOINT npm start

# Good: signals propagate correctly
ENTRYPOINT ["node", "server.js"]
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q33. How do you check the exit code of a container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```bash
# After a container exits, check its exit code
docker inspect container_name --format='{{.State.ExitCode}}'

# List containers with their exit codes
docker ps -a

# Get exit code from docker run (foreground mode)
docker run myapp
echo $?    # Prints exit code

# Exit code meanings:
# 0    → Success
# 1    → Application error
# 125  → Docker run error (command failed)
# 126  → Command cannot be invoked (permission)
# 127  → Command not found
# 137  → SIGKILL (128 + 9) — typically OOM killed
# 139  → SIGSEGV (128 + 11) — segmentation fault
# 143  → SIGTERM (128 + 15) — graceful shutdown
```

Exit code 137 (128 + SIGKILL=9) often indicates the container was killed for exceeding its memory limit.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q34. What is a bridge network in Docker?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **bridge** network is Docker's default network driver. It creates an isolated virtual network on the host:

```bash
# Default bridge is created automatically
docker network inspect bridge

# Create a custom bridge network (recommended!)
docker network create mynetwork

# Run containers on the custom network
docker run --network mynetwork --name web nginx
docker run --network mynetwork --name db postgres
```

**Default bridge vs Custom bridge:**

| Feature | Default Bridge | Custom Bridge |
|---------|---------------|---------------|
| DNS resolution | By IP only | **By container name** |
| Isolation | All containers on default bridge can communicate | Isolated per network |
| `--link` | Required | Not needed (DNS works automatically) |
| Detachability | Can detach/reattach | Can detach/reattach |

**Always use a custom bridge network** for automatic DNS resolution between containers.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q35. What is the `WORKDIR` instruction in a Dockerfile?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`WORKDIR` sets the **working directory** for subsequent `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ADD` instructions:

```dockerfile
FROM node:18-alpine
WORKDIR /app           # Creates /app if it doesn't exist
COPY package*.json .   # Copies to /app/package*.json
RUN npm install        # Runs in /app
COPY . .               # Copies source to /app
CMD ["node", "server.js"]  # Runs in /app
```

**Why use WORKDIR:**
- Creates the directory if it doesn't exist
- Sets the directory for all subsequent instructions
- Avoids hardcoding paths
- Use multiple `WORKDIR` instructions to navigate between directories

```dockerfile
WORKDIR /app
RUN mkdir data
WORKDIR /app/data
RUN touch file.txt    # Creates /app/data/file.txt
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q36. How do you rename a Docker container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use `docker rename` to rename an existing container:

```bash
# Rename a running or stopped container
docker rename old_name new_name

# Example
docker run -d nginx
docker rename elegant_moore webserver
```

You can only rename a container (not an image). Container names must be unique on the host.

For images, use `docker tag` to create additional names/tags.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q37. What is `docker compose up` and `docker compose down`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Docker Compose manages multi-container applications defined in a `docker-compose.yml` file:

```bash
# Start all services (build, create, start)
docker compose up

# Start in detached mode (background)
docker compose up -d

# Stop and remove all containers, networks
docker compose down

# Remove volumes too (will delete data!)
docker compose down -v

# Rebuild images and start
docker compose up --build

# View logs
docker compose logs -f

# List services
docker compose ps
```

A simple `docker-compose.yml`:
```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q38. What is the `HEALTHCHECK` instruction in Docker?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`HEALTHCHECK` tells Docker how to test if a container is working properly:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

**Options:**
- `--interval` — How often to run the check (default: 30s)
- `--timeout` — Maximum time for the check (default: 30s)
- `--retries` — Consecutive failures before marking unhealthy (default: 3)
- `--start-period` — Grace period before checks start (default: 0s)

**Health states:**
- `starting` — Initial state (during start-period)
- `healthy` — Check passed
- `unhealthy` — All retries failed

```bash
# View health status
docker inspect --format='{{.State.Health.Status}}' container_name
```

Healthchecks are critical for production — orchestration tools use them for rolling updates and automatic restarts.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q39. What are Docker tags?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Docker **tags** are labels for image versions. The format is `image:tag`:

```bash
# Format: [registry/][user/]image[:tag]

# Common tags
nginx:latest          # Most recent version (default)
nginx:1.25            # Major version
nginx:1.25.3          # Full version
node:18-alpine        # Version + variant
node:18-bullseye-slim # Version + OS + variant
```

**Tagging conventions:**
```
:latest     → Ambiguous (changes over time). Avoid in production.
:v1.0.0     → Semantic versioning (recommended)
:sha-abc123 → Git commit hash (traceable to source)
:production → Environment-specific
```

**Best practice:** Always pin to a specific version tag for reproducible builds. Use automation (Dependabot, Renovate) to update tags.

```bash
# Bad
FROM node:latest

# Good
FROM node:18.17.0-alpine
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q40. What is the `docker save` and `docker load` commands?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker save` and `docker load` are used to **export/import images** as tar archives:

```bash
# Save an image to a tar file
docker save -o myapp.tar myapp:1.0

# Compress for transfer
docker save myapp:1.0 | gzip > myapp.tar.gz

# Load an image from a tar file
docker load -i myapp.tar
docker load < myapp.tar.gz

# Transfer between hosts
docker save myapp:1.0 | ssh user@host "docker load"
```

**Use cases:**
- Transfer images between hosts without a registry
- Air-gapped environments (no internet access)
- Archiving specific image versions
- CI/CD pipelines (save → upload artifact → download → load)

**Not to be confused with:**
- `docker export` — Exports a **container's filesystem** (no metadata, no layers)
- `docker commit` — Saves container state as an image

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q41. What is the `USER` instruction in a Dockerfile?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`USER` sets the username (or UID) to use when running the container:

```dockerfile
FROM node:18-alpine

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser
WORKDIR /app
COPY . .
CMD ["node", "server.js"]
```

**Why use a non-root user:**
- **Security** — If an attacker compromises the app, they don't have root access
- **Principle of least privilege** — The app doesn't need root
- Containers running as root are vulnerable to privilege escalation

**Best practice:** Always create and switch to a non-root user in your Dockerfile:
```dockerfile
RUN addgroup -S mygroup && adduser -S myuser -G mygroup
USER myuser
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q42. What is the difference between `COPY` and `ADD` in a Dockerfile?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | COPY | ADD |
|---------|------|-----|
| **Copy files** | ✅ Yes | ✅ Yes |
| **Tar auto-extraction** | ❌ No | ✅ Yes |
| **Remote URL support** | ❌ No | ✅ Yes |
| **Transparency** | Explicit and predictable | Hidden magic |

```dockerfile
# COPY — simple, explicit (PREFERRED)
COPY ./app /app
COPY package.json /app/package.json

# ADD — only when you need tar extraction
ADD app.tar.gz /app/     # Auto-extracts the tar.gz
```

**Best practice:** Use `COPY` unless you specifically need `ADD`'s tar extraction feature. Remote URL fetching with `ADD` is discouraged — use `curl` or `wget` in a `RUN` command instead for better caching and control.

```dockerfile
# Bad — ADD from URL (no caching, no error handling)
ADD https://example.com/file.tar.gz /tmp/

# Good — RUN with curl (better caching, can chain commands)
RUN curl -fsSL https://example.com/file.tar.gz | tar xz -C /tmp/
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q43. What is a Docker registry?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Docker Registry** is a storage and distribution system for Docker images:

```bash
# Public registries
docker pull nginx                             # Docker Hub (default)
docker pull ghcr.io/myorg/myapp:latest        # GitHub Container Registry
docker pull 123456789.dkr.ecr.us-east-1.amazonaws.com/myapp  # AWS ECR

# Log in to a registry
docker login
docker login myregistry.com -u username -p password

# Push to a registry
docker tag myapp:1.0 myregistry.com/username/myapp:1.0
docker push myregistry.com/username/myapp:1.0
```

**Popular registries:**
| Registry | Best For |
|----------|----------|
| **Docker Hub** | Public images, official bases |
| **GitHub Container Registry (ghcr.io)** | GitHub-integrated workflows |
| **AWS ECR** | AWS deployments |
| **Google Artifact Registry** | GCP deployments |
| **Azure Container Registry** | Azure deployments |
| **Harbor** | Self-hosted, enterprise |
| **Sonatype Nexus** | Self-hosted, general purpose |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q44. What does `docker image prune` do?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker image prune` removes unused Docker images:

```bash
# Remove dangling images (untagged: <none>:<none>)
docker image prune

# Remove all unused images (not just dangling)
docker image prune -a

# Force without confirmation
docker image prune -af

# Filter: only images older than 24h
docker image prune --filter "until=24h"

# Labels filter
docker image prune --filter "label!=keep"
```

**What's removed:**
- **Dangling images** (`<none>:<none>`) — images no longer tagged, usually intermediate build artifacts
- **Unused images** (with `-a`) — images not referenced by any container (running or stopped)

Run `docker system df` to see how much disk space is used by Docker images, containers, volumes, and build cache.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q45. What is the default restart policy for Docker containers?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The default restart policy is **`no`** — containers do NOT restart automatically on exit.

```bash
# This is the default — no automatic restart
docker run nginx
```

To enable automatic restarts, use `--restart`:
```bash
docker run --restart unless-stopped nginx
```

**Docker Compose** also has `restart`:
```yaml
services:
  web:
    image: nginx
    restart: unless-stopped
```

`unless-stopped` is recommended for production — it restarts the container on crashes and reboots, but not if the administrator explicitly stopped it.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q46. How do you see the command used to start a container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use `docker inspect` or `docker ps` to see how a container was started:

```bash
# See the full command and arguments
docker inspect -f '{{.Config.Cmd}}' container_name

# See the entrypoint
docker inspect -f '{{.Config.Entrypoint}}' container_name

# See all config
docker inspect -f '{{json .Config}}' container_name | jq

# See the original docker run command (partial)
docker ps --no-trunc

# Get full creation details
docker inspect container_name | grep -A 10 "Cmd"
```

For a complete "how was this container started" reconstruction, use `docker inspect` and look at the `Config`, `HostConfig`, and `Mounts` sections.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q47. What is the difference between `docker logs` and `docker logs -f`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Command | Behavior |
|---------|----------|
| `docker logs` | Prints all logs and exits (like `cat` a log file) |
| `docker logs -f` | Follows logs in real-time (like `tail -f`) |

```bash
# View all logs (past)
docker logs container_name

# View last 100 lines
docker logs --tail 100 container_name

# Follow new log output
docker logs -f container_name

# Tail last 50 and follow
docker logs --tail 50 -f container_name

# With timestamps
docker logs -ft container_name
```

`docker logs` reads the container's stdout/stderr streams, which Docker captures. It works even if the container has stopped (but not after `docker rm`).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q48. How do you view the port mappings of a container?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Multiple ways to see port mappings:

```bash
# docker ps shows port mappings
docker ps

# docker port (specific to port mapping)
docker port container_name
# 80/tcp → 0.0.0.0:8080

# docker inspect with Go template
docker inspect -f '{{json .NetworkSettings.Ports}}' container_name
# {"80/tcp":[{"HostIp":"0.0.0.0","HostPort":"8080"}]}

# Human-readable format
docker inspect -f '{{range $p, $conf := .NetworkSettings.Ports}} \
  {{$p}} → {{(index $conf 0).HostPort}}{{end}}' container_name
```

`docker port` is the simplest and most readable option.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q49. What is `docker attach`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`docker attach` connects your terminal to a **running container's** stdin/stdout/stderr:

```bash
# Attach to a running container
docker attach container_name

# Detach without stopping (Ctrl+P, Ctrl+Q)
# (press Ctrl+P then Ctrl+Q to detach)
```

**Key difference from `docker exec -it`:**
- `docker attach` connects to the **main process** (PID 1)
- `docker exec -it` starts a **new process** inside the container

**When to use:**
- When you started a container in the foreground and need to reconnect
- To see the main process's output in real-time

**Caution:** If you send Ctrl+C while attached, it terminates the main process (which will stop the container).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q50. What is the `ONBUILD` instruction in a Dockerfile?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`ONBUILD` adds a **trigger instruction** that runs later when the image is used as a **base image** in another Dockerfile:

```dockerfile
# Base image Dockerfile (node-base)
FROM node:18-alpine
ONBUILD COPY package*.json ./
ONBUILD RUN npm install
ONBUILD COPY . .

# Child Dockerfile
FROM node-base    # ← ONBUILD triggers run here
# Triggers run automatically before any child instructions
CMD ["node", "server.js"]
```

**How it works:**
1. When building `node-base`, `ONBUILD` instructions are stored as metadata (not executed)
2. When building a child image that uses `FROM node-base`, the `ONBUILD` instructions execute first
3. The child Dockerfile's own instructions run after `ONBUILD` complete

**Use case:** Creating reusable framework/base images that can't know the application's specific files.

**Caution:** `ONBUILD` can create confusing, non-transparent builds. Most projects prefer explicit Dockerfiles over `ONBUILD`.

</div>
</details>

---

## 🟡 Medium (Q51–Q110)

<details class="qa-card qa-medium">
<summary>
Q51. What is Docker layer caching and how do you optimize for it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker builds images in **layers**. Each instruction in the Dockerfile creates a layer. Docker **caches** each layer if the instruction and its context haven't changed:

```dockerfile
# OPTIMIZED: Dependencies before source code
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./       # Layer rarely changes
RUN npm install              # Layer cached unless package.json changes
COPY . .                     # Layer changes most frequently
CMD ["node", "server.js"]
```

**Optimization strategies:**

1. **Order from least to most frequently changing instructions:**
   - Base image
   - System dependencies
   - Application dependencies
   - Application code

2. **Combine related RUN commands:**
```dockerfile
# Bad — 3 layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Good — 1 layer
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean
```

3. **Use `.dockerignore`** to exclude unnecessary files from the build context

4. **Use BuildKit** (`DOCKER_BUILDKIT=1`) for better caching

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. What is a multi-stage build and why would you use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Multi-stage builds** use multiple `FROM` statements in a single Dockerfile. Each `FROM` starts a new stage, and you can selectively copy artifacts from earlier stages:

```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (tiny image!)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Why use them:**
- **Dramatically smaller images** — build tools (compilers, dev dependencies) are left behind
- **Security** — smaller attack surface (fewer packages, no build-time secrets)
- **Organization** — one Dockerfile for building and running
- **Separation of concerns** — build stage vs runtime stage

**Example sizes:**
- Single-stage Node.js: ~1.2GB
- Multi-stage with `node:18-alpine` → `distroless`: < 150MB
- Go binary in `scratch` image: ~15MB

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. How does Docker networking work? Explain bridge, host, and overlay networks.
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker has several network **drivers**:

**1. Bridge (default)**
```bash
docker run --network bridge nginx
docker network create --driver bridge mynetwork
```
- Creates an isolated virtual network on the host
- Containers get private IPs (NATed through the host)
- Default: no DNS resolution between containers
- **Custom bridge:** automatic DNS resolution by container name

**2. Host**
```bash
docker run --network host nginx
```
- Container shares the **host's network stack** directly
- No network isolation (best performance)
- Port publishing is automatic
- **Linux only** (doesn't work on Docker Desktop for Mac/Windows)

**3. Overlay**
```bash
docker network create --driver overlay myoverlay
```
- Spans multiple Docker hosts (Docker Swarm mode)
- Containers on different hosts communicate as if on the same network
- Encrypted by default (IPsec)
- Uses VXLAN under the hood

**4. None**
```bash
docker run --network none nginx
```
- No network access at all
- Maximum isolation
- For offline/security-sensitive tasks

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. How do you create a custom bridge network and connect containers?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```bash
# 1. Create a custom bridge network
docker network create myapp-network

# 2. Run containers on the network
docker run -d --name web --network myapp-network nginx
docker run -d --name api --network myapp-network node:18
docker run -d --name db --network myapp-network postgres

# 3. Containers can now communicate by name:
# Inside 'web' container: ping api → resolves to api's IP
# Inside 'api' container: curl http://db:5432

# 4. Connect a running container to an additional network
docker network connect myapp-network existing_container

# 5. Inspect network
docker network inspect myapp-network
```

**Key benefits of custom bridge:**
- **Automatic DNS** — containers resolve each other by name
- **Isolation** — only containers on the same network can communicate
- **Detach/reattach** — containers can be connected/disconnected at runtime

In Docker Compose:
```yaml
services:
  web:
    image: nginx
    networks:
      - frontend
  db:
    image: postgres
    networks:
      - backend
networks:
  frontend:
  backend:
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What is the difference between a bind mount and a Docker volume?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | Bind Mount | Named Volume |
|---------|------------|--------------|
| **Managed by Docker** | No | Yes |
| **Location** | Any host path | Docker storage directory |
| **Backup** | Manual | `docker run --volumes-from` |
| **Portability** | Tied to host path | Portable across hosts |
| **Permissions** | Host ownership | Docker-managed |
| **Use case** | Development, config files | Production data |

```bash
# Bind mount: host path explicitly specified
docker run -v /host/data:/app/data myapp
docker run --mount type=bind,source=/host/data,target=/app/data myapp

# Named volume: Docker-managed
docker volume create mydata
docker run -v mydata:/app/data myapp
docker run --mount source=mydata,target=/app/data myapp
```

**When to use each:**
- **Bind mounts:** Development (hot-reload), mounting config files, Docker socket
- **Named volumes:** Database data, production persistent storage, sharing data between containers
- **tmpfs mounts:** Temporary sensitive data (in memory, not on disk)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. What is Docker Compose and what are its main use cases?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Docker Compose** is a tool for defining and running multi-container applications using a YAML file:

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=pass

volumes:
  pgdata:
```

**Main use cases:**
1. **Local development** — Spin up entire app stack (web + DB + cache + queue) with one command
2. **CI/CD testing** — Run integration tests with real dependencies
3. **Single-host deployments** — Simple production setups (though Swarm/K8s is better for multi-host)
4. **Demo environments** — Quick reproducible setups for demos

**Key commands:**
```bash
docker compose up -d        # Start all services
docker compose down         # Stop and remove
docker compose logs -f      # Follow logs
docker compose ps           # List services
docker compose exec web sh  # Shell into a service
docker compose build        # Rebuild images
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. What is `depends_on` in Docker Compose and what are its limitations?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`depends_on` controls the **startup order** of services:

```yaml
services:
  web:
    build: .
    depends_on:
      - db
      - redis

  db:
    image: postgres

  redis:
    image: redis
```

**What `depends_on` does:**
- Starts services in dependency order (`db` and `redis` start before `web`)
- Stops services in reverse order

**What `depends_on` does NOT do:**
- Does NOT wait for services to be **ready** — only that they've started
- A database container may start in 1 second but take 10 seconds to be ready to accept connections

**Solution: `condition: service_healthy`**
```yaml
services:
  web:
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
```

For Compose v3+, a startup script or wait-for-it.sh is commonly used instead.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. How do you manage environment variables in Docker Compose?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Multiple ways to manage environment variables:

```yaml
services:
  web:
    image: myapp

    # 1. Hardcoded (bad for secrets)
    environment:
      - NODE_ENV=production
      - PORT=3000

    # 2. From .env file
    env_file:
      - .env

    # 3. Interpolation from shell environment
    # Uses ${VARIABLE} syntax
    environment:
      - DATABASE_URL=${DATABASE_URL}
```

**The `.env` file** (placed next to `docker-compose.yml`):
```env
DATABASE_URL=postgres://user:pass@db:5432/mydb
API_KEY=abc123
```

**Variable substitution:**
```yaml
services:
  web:
    image: myapp:${TAG:-latest}     # Defaults to "latest"
    ports:
      - "${HOST_PORT:-8080}:80"
```

**Best practices:**
- Never commit `.env` files with secrets to version control
- Use `.env.example` as a template
- Use Docker secrets or an external vault for production secrets
- Use `environment:` in Compose for non-sensitive config only

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. How do you scale services with Docker Compose?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Use `docker compose up --scale` to run multiple copies of a service:

```bash
# Run 3 instances of the web service
docker compose up -d --scale web=3

# Scale different services independently
docker compose up -d --scale web=3 --scale worker=2
```

**Requirements for scaling:**
- Services must be **stateless** (no sticky sessions, no local storage)
- Use a load balancer (Nginx, HAProxy) in front of scaled services
- Databases usually should NOT be scaled (use orchestrator for that)

**Example with load balancer:**
```yaml
services:
  lb:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro

  web:
    image: myapp
    # Scale this service
```

**Note:** `docker compose up --scale` is limited to a single host. For multi-host scaling, use Docker Swarm or Kubernetes.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. What is Docker Swarm mode?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Docker Swarm** is Docker's native **clustering and orchestration** solution:

```bash
# Initialize a swarm
docker swarm init --advertise-addr 192.168.1.100

# Join worker nodes
docker swarm join --token SWMTKN-1-xxx 192.168.1.100:2377

# Deploy a stack (using Compose file)
docker stack deploy -c docker-compose.yml myapp

# List services
docker service ls

# List nodes
docker node ls

# Scale a service
docker service scale myapp_web=5
```

**Key features:**
- **Desired state reconciliation** — Swarm ensures the actual state matches the declared state
- **Rolling updates** — Update services with zero downtime
- **Service discovery** — Built-in DNS-based service discovery
- **Load balancing** — Built-in ingress load balancing
- **Secrets management** — Encrypted secrets at rest and in transit
- **Multi-host networking** — Overlay networks span all nodes

Swarm is simpler than Kubernetes but has fewer features. It's a good choice for teams wanting a simple orchestrator.

</div>
</details>
<details class="qa-card qa-medium">
<summary>
Q61. What is the difference between Docker Swarm and Kubernetes?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | Docker Swarm | Kubernetes |
|---------|-------------|------------|
| **Setup** | Simple (2 commands) | Complex (many components) |
| **Learning curve** | Low | High |
| **Scaling** | Manual (docker service scale) | Auto-scaling (HPA) |
| **Networking** | Built-in overlay (simple) | CNI plugins (complex, powerful) |
| **Load balancing** | Built-in ingress | Ingress controllers (many options) |
| **Storage** | Volumes, basic | PV/PVC, StorageClass, CSI drivers |
| **Rolling updates** | Yes (simple) | Yes (advanced: canary, blue/green) |
| **Self-healing** | Basic restart | Advanced (node health, rescheduling) |
| **Community** | Smaller | Massive |
| **Ecosystem** | Limited (part of Docker) | Rich (Helm, Operators, CRDs) |

**When to choose Swarm:** Simple deployments, small teams, already using Docker Compose, want minimal operational overhead.

**When to choose Kubernetes:** Complex microservices, need advanced orchestration, large teams, multi-cloud deployments, need fine-grained control.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. How does Docker store images and containers on disk?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker uses a **storage driver** to manage image layers and container data:

```bash
# Check storage driver
docker info | grep "Storage Driver"
# Storage Driver: overlay2
```

**Default storage driver (Linux): overlay2**

```
/var/lib/docker/
├── containers/     # Container metadata (config, logs)
├── image/          # Image layer metadata
│   └── overlay2/   # Layer database
├── overlay2/       # Actual layer data (diff directories)
├── volumes/        # Named volumes
├── networks/       # Network configurations
└── buildkit/       # BuildKit cache (Build v2)
```

**How layers work:**
- Each Dockerfile instruction creates a **diff** (changes compared to previous layer)
- `overlay2` merges layers into a single view using union mount
- When a container modifies a file, **copy-on-write** copies it to the container's writable layer
- The writable layer is deleted when the container is removed

**Other storage drivers:**
- `aufs` — Original (deprecated)
- `devicemapper` — Older, block-level (deprecated)
- `overlay` — Predecessor to overlay2 (deprecated)
- `zfs` — ZFS filesystem
- `btrfs` — Btrfs filesystem
- `vfs` — No copy-on-write (worst performance)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. How do you debug a container that fails to start?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Systematic debugging approach:

```bash
# 1. Check the logs
docker logs mycontainer
docker logs --tail 50 mycontainer

# 2. Check exit code
docker inspect -f '{{.State.ExitCode}}' mycontainer
# 137 = OOM killed, 139 = segfault, 0 = success

# 3. Check the command that was supposed to run
docker inspect -f '{{.Config.Cmd}}' mycontainer
docker inspect -f '{{.Config.Entrypoint}}' mycontainer

# 4. Run interactively with different entrypoint
docker run -it --entrypoint sh myimage
# Once inside, manually run the app to see errors

# 5. Check resource limits
docker inspect -f '{{.HostConfig.Memory}}' mycontainer
docker inspect -f '{{.HostConfig.CpuShares}}' mycontainer

# 6. Check for port conflicts
docker ps -a | grep "0.0.0.0:8080"

# 7. Check volume mounts exist
docker inspect -f '{{json .Mounts}}' mycontainer | jq

# 8. Common causes:
# - Missing environment variables
# - Database not ready (startup race)
# - File permissions (running as non-root)
# - Port already in use
# - Out of memory (OOM)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. What is BuildKit and how is it different from the legacy Docker build?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**BuildKit** is Docker's next-generation build system (enabled by default in Docker 23+):

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1
docker build -t myapp .

# Or using docker buildx (BuildKit-based)
docker buildx build -t myapp .
```

**Key improvements over legacy builder:**

| Feature | Legacy Builder | BuildKit |
|---------|---------------|----------|
| **Parallelism** | Sequential layer processing | **Parallel** independent stages |
| **Caching** | Basic layer cache | Advanced (registry cache, inline cache) |
| **Secrets** | No built-in support | `--secret` flag (build-time secrets) |
| **SSH forwarding** | Not supported | `--ssh` flag for private repos |
| **Concurrent builds** | No | Yes |
| **Skipping unused stages** | No | Yes (only builds what's needed) |

**BuildKit features:**
```dockerfile
# Mount cache between builds (npm, pip, apt)
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Mount secret (not in image layers)
RUN --mount=type=secret,id=mysecret \
    cat /run/secrets/mysecret

# SSH agent forwarding
RUN --mount=type=ssh \
    git clone git@github.com:org/repo.git
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. How do you reduce Docker image size?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Proven strategies to shrink Docker images:**

**1. Use slim/alpine base images**
```
node:18 → ~350MB → node:18-slim → ~180MB → node:18-alpine → ~120MB
```

**2. Multi-stage builds**
```dockerfile
# Build stage (includes full SDK)
FROM node:18 AS builder
COPY . .
RUN npm install && npm run build

# Production stage (only runtime)
FROM node:18-alpine
COPY --from=builder /app/dist ./dist
```

**3. Combine RUN commands**
```dockerfile
# Reduces layer count
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

**4. Remove unnecessary dependencies**
```dockerfile
RUN npm ci --only=production
# vs npm install (includes devDependencies)
```

**5. Use distroless images**
```dockerfile
FROM node:18 AS build
# ...
FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build /app /app
# ~130MB, only runtime + app (no shell, no package manager)
```

**6. Use `.dockerignore`**
```dockerignore
node_modules
.git
*.md
test/
```

**Size comparison (Node.js app):**
| Strategy | Size |
|----------|------|
| `node:18` | ~950 MB |
| `node:18` + multi-stage | ~350 MB |
| `node:18-alpine` + multi-stage | ~160 MB |
| `distroless` + multi-stage | ~130 MB |
| `alpine` + static binary (Go) | ~15 MB |

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. How does Docker handle container-to-container communication across hosts?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Overlay networks** enable cross-host container communication:

**How it works:**
1. Docker creates a **VXLAN** overlay network across the Swarm cluster
2. Each container gets a virtual IP on the overlay network
3. Traffic between containers on different hosts is **encapsulated** in UDP packets
4. The overlay network handles routing, encryption, and service discovery

```
Container A (Host 1) ─┐
        │              │
   veth pair           │
        │              │
   docker_gwbridge     │
        │              │
   eth0 (Host 1) ──────┼── VXLAN tunnel (UDP 4789)
                       │
                  eth0 (Host 2)
                       │
                  docker_gwbridge
                       │
                  veth pair
                       │
Container B (Host 2) ─┘
```

**Encryption:**
```bash
# Create encrypted overlay network
docker network create \
  --driver overlay \
  --opt encrypted \
  mysecurenetwork
```

**In Docker Swarm:**
```bash
docker network create --driver overlay --attachable myscope

docker service create --network myscope --name web nginx
docker service create --network myscope --name api myapp
```

Containers resolve each other using DNS (built-in service discovery).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. What is the difference between `docker stack deploy` and `docker compose up`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | docker compose up | docker stack deploy |
|---------|------------------|-------------------|
| **Target** | Single Docker host | Docker Swarm cluster |
| **Deploy section** | Ignored | Used (replicas, update_config) |
| **Networks** | bridge (default) | overlay (required for multi-host) |
| **`depends_on`** | Yes | No (use healthchecks) |
| **Secrets** | Not supported | Supported (Docker Secrets) |
| **Rolling updates** | Manual | Automatic (configurable) |
| **Scaling** | `--scale` flag | `deploy.replicas` in Compose |
| **Configs** | Not supported | Supported (Docker Configs) |

```yaml
# docker-stack.yml (for stack deploy)
version: '3.8'
services:
  web:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: any
    secrets:
      - db_password
secrets:
  db_password:
    external: true
```

```bash
# Deploy to Swarm
docker stack deploy -c docker-stack.yml myapp

# List stacks
docker stack ls

# List services in stack
docker stack services myapp
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. How do you handle database backups for Docker containers?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Using `docker exec` to run backup commands:**
```bash
# PostgreSQL backup
docker exec pg_container pg_dump -U postgres mydb > backup.sql

# MySQL backup
docker exec mysql_container mysqldump -u root -p$PASS mydb > backup.sql

# MongoDB backup
docker exec mongo_container mongodump --out /tmp/backup
docker cp mongo_container:/tmp/backup ./backup
```

**2. Automated backups with a sidecar container:**
```yaml
services:
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

  backup:
    image: postgres:16
    volumes:
      - ./backups:/backups
    environment:
      - PGPASSWORD=secret
    command: |
      sh -c 'while true; do
        pg_dump -h db -U postgres mydb > /backups/db_$(date +%Y%m%d).sql
        sleep 86400
      done'
```

**3. Using volume snapshots (cloud):**
```bash
# AWS EBS snapshot
aws ec2 create-snapshot --volume-id vol-xxx --description "DB backup $(date)"

# Or rsync to external storage
docker run --rm -v pgdata:/source:ro -v /mnt/backups:/backup alpine \
  tar czf /backup/pgdata-$(date +%Y%m%d).tar.gz -C /source .
```

**Best practices:**
- Backup to a different host/region than where the container runs
- Test backups regularly (restore from backup)
- Use `--rm` for backup containers (cleanup automatically)
- Rotate backups (keep last N, delete older ones)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. How do you implement container health monitoring?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Docker HEALTHCHECK instruction:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 --start-period=40s \
  CMD curl -f http://localhost:3000/health || exit 1
```

**2. Docker Compose healthcheck:**
```yaml
services:
  web:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

**3. Monitoring tools:**
```bash
# cAdvisor (container metrics)
docker run -d --name cadvisor \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /sys:/sys:ro \
  -p 8080:8080 \
  gcr.io/cadvisor/cadvisor

# Prometheus + Grafana stack
# docker-compose.yml with prom/node-exporter + grafana
```

**4. Health states and what they mean:**
| Status | Meaning |
|--------|---------|
| `healthy` | Healthcheck passed |
| `unhealthy` | Healthcheck failed (retries exhausted) |
| `starting` | In start_period (checks not yet running) |
| `none` | No healthcheck defined |

```bash
# View health status
docker inspect --format='{{.State.Health.Status}}' container_name
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. How does Docker's copy-on-write (COW) work at the filesystem level?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker uses **copy-on-write (CoW)** at the filesystem level to efficiently share data between images and containers:

**How CoW works:**

1. **Image layers** are read-only and shared across all containers
2. When a container starts, Docker adds a **thin writable layer** on top
3. When the container writes to a file:
   - **Read:** Container reads from the writable layer (if exists) or falls through to image layers
   - **Write:** Container writes to its writable layer (image layers stay untouched)
   - **Modify:** File is **copied up** from the image layer to the writable layer, then modified

```
Container 1: [Writable Layer] ─┐
                                ├── [Layer 3: App code]
                                ├── [Layer 2: Dependencies]
                                ├── [Layer 1: OS packages]
                                └── [Layer 0: Base image]

Container 2: [Writable Layer] ─┘
```

**Benefits:**
- **Space efficiency** — 100 containers from the same image use only one copy of the image
- **Speed** — Container creation is instant (no file copying)
- **Memory efficiency** — Shared pages can be shared in memory (with overlay2)

**CoW overhead:**
- First write to a file is slower (must "copy up" from image layer)
- The writable layer grows as the container modifies files
- Deleting a file in the container only marks it as deleted (space not reclaimed)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q71. What is the `VOLUME` instruction in a Dockerfile?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`VOLUME` creates a mount point with an **anonymous volume** at runtime:

```dockerfile
FROM postgres:16
VOLUME /var/lib/postgresql/data
```

**What `VOLUME` does:**
- Declares that the specified path should be a **volume mount point**
- If the user runs the container without `-v`, Docker creates an **anonymous volume** automatically
- Data written to this path persists after the container is removed

**What `VOLUME` does NOT do:**
- It does NOT create a named volume
- It does NOT allow the Dockerfile to specify a host path

```bash
# Without -v, Docker creates an anonymous volume
docker run postgres
docker volume ls
# local   abc123def456   (anonymous volume)

# With -v, named volume overrides the Dockerfile's VOLUME
docker run -v pgdata:/var/lib/postgresql/data postgres
```

**Best practice:** Declare volumes in the Dockerfile for important data paths, but manage them in Compose or at runtime for production:

```yaml
services:
  db:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data  # Named volume overrides
volumes:
  pgdata:
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q72. How do you use Docker for CI/CD pipelines?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker is essential for CI/CD pipelines:

**1. Build and tag:**
```yaml
# GitHub Actions example
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myapp:latest
      - name: Push to registry
        run: |
          docker push myapp:${{ github.sha }}
          docker push myapp:latest
```

**2. Test in isolated environments:**
```bash
# Run integration tests with real dependencies
docker compose -f docker-compose.test.yml up -d
docker compose exec app npm test
docker compose down
```

**3. Docker layer caching (GitHub Actions):**
```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3
- name: Cache Docker layers
  uses: actions/cache@v3
  with:
    path: /tmp/.buildx-cache
    key: ${{ runner.os }}-buildx-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-buildx-
```

**4. Docker in Docker (DinD):**
```yaml
services:
  dind:
    image: docker:24-dind
    privileged: true
```

**Best CI/CD practices:**
- Use specific image tags (not `:latest`)
- Cache Docker layers for faster builds
- Use BuildKit for parallel builds
- Scan images for vulnerabilities before deployment
- Use multi-stage builds in CI (don't ship build tools)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q73. How do you implement zero-downtime deployments with Docker?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Strategies for zero-downtime deployments:**

**1. Rolling updates with Docker Swarm:**
```yaml
services:
  web:
    image: myapp:${TAG}
    deploy:
      replicas: 3
      update_config:
        parallelism: 1        # Update one at a time
        delay: 10s            # Wait between updates
        order: start-first    # Start new before stopping old
      rollback_config:
        parallelism: 0
        order: stop-first
```

```bash
# Deploy new version with zero downtime
docker service update --image myapp:2.0 myapp_web
```

**2. Blue-green deployment:**
```
Blue: v1 (live)    ─→  Load balancer → Users
Green: v2 (staging)

# Deploy:
1. Deploy Green (v2) alongside Blue (v1)
2. Health check Green
3. Switch load balancer to Green
4. Scale down Blue
```

```bash
# Scale up new version
docker service scale myapp_v2_web=3
# Wait for health
# Switch load balancer (Nginx/HAPRoxy)
# Scale down old version
docker service scale myapp_v1_web=0
```

**3. Health check + graceful shutdown:**
```dockerfile
HEALTHCHECK --interval=5s --timeout=3s --retries=2 \
  CMD curl -f http://localhost:3000/health || exit 1
STOPSIGNAL SIGTERM
```

The application must handle `SIGTERM` by:
- Stopping accepting new requests
- Draining existing connections
- Performing cleanup

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q74. How does Docker Swarm handle service discovery?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker Swarm has **built-in DNS-based service discovery**:

**How it works:**
1. Every service in the Swarm gets a DNS name (the service name)
2. Swarm's embedded DNS server resolves service names to **virtual IPs (VIPs)**
3. VIPs are load-balanced across all container replicas

```bash
# Create a service
docker service create --name api --replicas 3 myapi

# Other services connect using hostname "api"
# DNS resolves: api → 10.0.1.2 (VIP)
# VIP distributes traffic to all 3 replicas
```

**DNS resolution modes:**

**VIP (Virtual IP — default):**
- One DNS name resolves to one virtual IP
- VIP load-balances across all healthy containers
- Good for most services (simple, transparent)

**DNSRR (DNS Round Robin):**
```bash
docker service create --name api --endpoint-mode dnsrr myapi
```
- DNS returns all container IPs (client does its own load balancing)
- Used for stateful services or custom load balancing

```bash
# Inspect service discovery
docker service inspect api
# ..."Endpoint": {"VirtualIPs": [{"Network": "...", "Addr": "10.0.1.2"}]}

# Check DNS resolution from a container
docker exec container_name nslookup api
# Name:      api
# Address 1: 10.0.1.2
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q75. What is a Docker layer and how many layers can an image have?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A Docker **layer** is the output of a single instruction in the Dockerfile:

```dockerfile
FROM node:18-alpine          # Layer 1: Base image (contains many layers)
WORKDIR /app                  # Layer 2: Creates /app directory
COPY package*.json ./         # Layer 3: Copies files
RUN npm install               # Layer 4: Installs deps
COPY . .                      # Layer 5: Copies source
EXPOSE 3000                   # Layer 6: Metadata (affects image config)
CMD ["node", "server.js"]     # Layer 7: Metadata (affects image config)
```

**Layer characteristics:**
- Each layer is a **diff** of the filesystem (only changed files)
- Layers are **immutable** (never changed after creation)
- Layers are **shared** between images (same base image = same layers)
- Layers are **cached** during builds

**Layer limits:**
- Older storage drivers: 42 layers maximum
- `overlay2`: 128 layers maximum
- In practice, keep layers under 30-40 for performance

**Layer vs no layer:**
- `FROM`, `COPY`, `ADD`, `RUN` — create filesystem layers
- `CMD`, `ENTRYPOINT`, `EXPOSE`, `ENV`, `LABEL` — modify image metadata (no filesystem layer)
- `WORKDIR`, `USER`, `VOLUME`, `STOPSIGNAL` — modify image config (no filesystem layer)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q76. How do you troubleshoot "port is already allocated" errors?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

This error occurs when the host port you're trying to map is already in use:

```
docker: Error response from daemon: driver failed programming external connectivity on endpoint
mycontainer: Bind for 0.0.0.0:8080 failed: port is already allocated.
```

**Troubleshooting steps:**

```bash
# 1. Find what's using the port
# Check other containers
docker ps --format "table {{.Names}}\t{{.Ports}}" | grep 8080

# Check host processes
netstat -tulpn | grep 8080    # Linux
# or
lsof -i :8080                  # macOS/Linux

# 2. On Windows:
netstat -ano | findstr :8080

# 3. Stop the container using the port
docker stop container_using_port

# 4. Or use a different host port
docker run -p 8081:80 nginx

# 5. Kill the process using the port (if not Docker)
kill -9 $(lsof -t -i:8080)   # Linux/macOS
# Windows:
# taskkill /PID <pid> /F
```

**Prevention:**
- Use dynamic port mapping (`-p 80` without host port → random port)
- Document ports used by your containers
- Use Docker Compose to manage port assignments

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q77. How do you pass arguments at build time (ARG vs ENV)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | ARG | ENV |
|---------|-----|-----|
| **Available during build** | ✅ Yes | ✅ Yes |
| **Available at runtime** | ❌ No | ✅ Yes |
| **Persists in image** | ❌ No (unless saved) | ✅ Yes |
| **Overridable** | `--build-arg` | `-e` flag at runtime |

```dockerfile
# ARG — build-time only
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

ARG APP_VERSION
LABEL version=${APP_VERSION}

# ENV — build-time AND runtime
ENV NODE_ENV=production
ENV PORT=3000
```

```bash
# Pass ARG at build time
docker build --build-arg NODE_VERSION=20 --build-arg APP_VERSION=1.0 -t myapp .

# Override ENV at runtime
docker run -e NODE_ENV=development -e PORT=4000 myapp
```

**Security note:** `ENV` values are visible in the image (can be seen with `docker inspect`). Never put secrets in `ENV`. Use build secrets (`--secret` with BuildKit) for sensitive build-time values.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q78. How do you handle static files and assets in Docker containers?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Include in the image (for small assets):**
```dockerfile
FROM nginx:alpine
COPY ./public /usr/share/nginx/html
```
Best for: small assets that rarely change (logos, icons, CSS).

**2. Volume mount for development (hot reload):**
```yaml
services:
  web:
    build: .
    volumes:
      - ./src:/app/src:ro     # Read-only mount of source code
      - ./public:/app/public:ro
```
Best for: development, changing assets.

**3. Shared volume for user uploads:**
```yaml
services:
  web:
    volumes:
      - uploads:/app/uploads

volumes:
  uploads:
```
Best for: user-generated content that must persist across deployments.

**4. External storage (CDN/S3):**
Use cloud storage (S3, GCS, CloudFront) for production assets.
Dockerfile just needs SDK:
```dockerfile
RUN pip install boto3  # Python AWS SDK
```

**5. Nginx for static files:**
```yaml
services:
  nginx:
    image: nginx:alpine
    volumes:
      - ./static:/usr/share/nginx/html:ro
    ports:
      - "80:80"

  api:
    image: myapi
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q79. What is `docker system df`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`docker system df` shows **disk usage** for all Docker objects:

```bash
docker system df

TYPE                TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images              12        5         2.345GB   1.234GB (52%)
Containers          8         3         456MB     234MB (51%)
Local Volumes       6         2         1.2GB     800MB (66%)
Build Cache         24        0         345MB     345MB (100%)
```

**Verbose mode:**
```bash
docker system df -v
# Shows detailed breakdown per image, container, volume
```

**Quick cleanup commands:**
```bash
# Remove dangling images
docker image prune

# Remove all unused images
docker image prune -a

# Remove stopped containers
docker container prune

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a --volumes  # CAREFUL! Removes all unused resources
```

Use `docker system df` regularly to monitor disk usage and plan cleanups.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q80. How do you optimize Docker build performance?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Layer ordering — put stable instructions first:**
```dockerfile
# Fast to rebuild (rarely changes)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

# Slow to rebuild (changes frequently)
COPY . .
CMD ["node", "server.js"]
```

**2. Use BuildKit:**
```bash
DOCKER_BUILDKIT=1 docker build -t myapp .
```

**3. Registry-based caching:**
```bash
docker buildx build \
  --cache-from type=registry,ref=myregistry/myapp:cache \
  --cache-to type=registry,ref=myregistry/myapp:cache,mode=max \
  -t myapp .
```

**4. Use `.dockerignore` effectively:**
```dockerignore
.git
node_modules
*.md
dist/*.map
```

**5. Combine RUN commands:**
```dockerfile
# Bad (3 layers, 3 apt-get calls)
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# Good (1 layer)
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*
```

**6. Use specific base image tags:**
```dockerfile
# Bad — pulls new image every build
FROM node:latest

# Good — cached until you explicitly update
FROM node:18.17.0-alpine
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q81. How do you run Docker containers as a non-root user?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Using the USER instruction in Dockerfile:**
```dockerfile
FROM node:18-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser
WORKDIR /home/appuser/app
COPY --chown=appuser:appgroup . .
CMD ["node", "server.js"]
```

**2. Using `docker run --user`:**
```bash
# Run as user with ID 1000
docker run --user 1000:1000 myapp

# Run as user named "appuser" (must exist in container)
docker run --user appuser myapp
```

**3. In Docker Compose:**
```yaml
services:
  web:
    image: myapp
    user: "1000:1000"
```

**4. Using `--security-opt no-new-privileges`:**
```bash
docker run --security-opt no-new-privileges myapp
```

**Why run as non-root:**
- Security: compromised app can't modify host filesystem
- Reduced attack surface
- Follows principle of least privilege
- Prevents privilege escalation attacks

**Common issues:**
- Port binding: ports below 1024 require root, use high port (>1024) or use `-p`
- File permissions: mounted volumes may have wrong ownership

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q82. How do you handle Docker networking for a microservices architecture?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Best practices for microservices networking:**

**1. Network isolation:**
```yaml
services:
  # Public-facing services
  api-gateway:
    image: nginx
    networks:
      - public

  # Internal services
  users-service:
    image: users-api
    networks:
      - internal
      - public  # Accessible by gateway

  # Database — most isolated
  users-db:
    image: postgres
    networks:
      - internal  # Only accessible by users-service

networks:
  public:
    driver: overlay
  internal:
    driver: overlay
    internal: true  # No external access
```

**2. Service discovery (Swarm/K8s):**
- Services discover each other by DNS name
- Load balancing is built-in
- No need for service registries with Swarm

**3. API Gateway pattern:**
```
[Internet] → [API Gateway] → [Auth Service]
                    ↓
            [User Service] → [User DB]
                    ↓
           [Product Service] → [Product DB]
```

**4. Encrypted inter-service communication:**
```yaml
networks:
  internal:
    driver: overlay
    options:
      encrypted: "true"
```

**5. Network policies (Kubernetes):**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
spec:
  podSelector:
    matchLabels:
      app: users-service
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q83. What is `docker events` and how do you use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`docker events` streams **real-time events** from the Docker daemon:

```bash
# Watch all events
docker events

# Filter by type
docker events --filter 'type=container'
docker events --filter 'type=image'
docker events --filter 'type=network'
docker events --filter 'type=volume'

# Filter by event name
docker events --filter 'event=start'
docker events --filter 'event=die'
docker events --filter 'event=destroy'

# Filter by label
docker events --filter 'label=com.docker.compose.project=myapp'

# Show events since a specific time
docker events --since '2024-01-01T00:00:00'

# Filter by container name
docker events --filter 'container=myapp'
```

**Sample output:**
```
2024-01-15T10:30:00 container start  abc123 (image=nginx, name=webserver)
2024-01-15T10:30:05 container die   def456 (image=myapp, exitCode=1)
2024-01-15T10:30:10 image delete   ghi789 (image=myimage)
```

**Use cases:**
- Monitoring container lifecycle
- Triggering automated responses (restart, alert)
- Auditing deployments
- Integration with monitoring systems (webhook, log aggregator)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q84. What is the difference between `docker compose` and `docker-compose`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Aspect | `docker compose` (v2) | `docker-compose` (v1) |
|--------|----------------------|----------------------|
| **Type** | Docker CLI plugin (Go) | Standalone tool (Python) |
| **Version** | Docker Compose v2 (2022+) | Docker Compose v1 (legacy) |
| **Command** | `docker compose` | `docker-compose` |
| **Installation** | Bundled with Docker Desktop | Separate install (`pip install`) |
| **Performance** | Faster (Go) | Slower (Python) |
| **BuildKit** | Enabled by default | Not by default |
| **Compose specification** | v2 format | v1/v2/v3 formats |

```bash
# v1 (legacy, separate binary)
docker-compose up -d

# v2 (new, Docker CLI plugin)
docker compose up -d
```

**Why `docker compose` (v2) is better:**
- Faster execution (compiled Go vs interpreted Python)
- Better integration with Docker CLI
- Supports the latest Compose specification
- Active development (v1 is deprecated)

**Migrating from v1 to v2:**
- Replace `docker-compose` with `docker compose` in scripts
- Install Docker Compose v2: `docker compose` (bundled with Docker Desktop)
- Or on Linux: `sudo apt-get install docker-compose-plugin`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q85. How do you build Docker images for ARM architecture (Apple Silicon)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Building multi-architecture images:**

**1. Using Docker Buildx:**
```bash
# Create a builder that supports multi-arch
docker buildx create --name mybuilder --use

# Build for multiple architectures
docker buildx build \
  --platform linux/amd64,linux/arm64,linux/arm/v7 \
  -t myregistry/myapp:1.0 \
  --push .
```

**2. Building for Apple Silicon (M1/M2/M3):**
```bash
# Default build targets your native arch (arm64)
docker build -t myapp .

# Force amd64 build (for deployment on x86 servers)
docker build --platform linux/amd64 -t myapp:amd64 .

# Run amd64 image on Apple Silicon (emulation)
docker run --platform linux/amd64 myapp:amd64
```

**3. Multi-architecture Docker Compose:**
```yaml
services:
  app:
    image: myapp:latest
    platform: linux/amd64  # Force specific platform
```

**4. Base images that support both:**
```dockerfile
# Alpine supports both amd64 and arm64 natively
FROM node:18-alpine
# Buildx automatically picks the right variant
```

**5. Checking image architecture:**
```bash
docker inspect myapp | grep Architecture
# "Architecture": "arm64"
```

**Key considerations:**
- Arm64 builds are faster on Apple Silicon (no emulation)
- Some base images may not support arm64
- Use `--platform` flag to test specific architectures
- Buildx creates manifest lists (single tag for multiple architectures)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q86. How do you handle logging in Docker containers?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Logging drivers:**

Docker captures container stdout/stderr and routes it to a **logging driver**:

```bash
# Default: json-file (logs stored as JSON files)
docker run nginx

# Other drivers:
docker run --log-driver syslog nginx
docker run --log-driver journald nginx
docker run --log-driver gelf --log-opt gelf-address=udp://... nginx
docker run --log-driver awslogs --log-opt awslogs-group=mygroup nginx

# No logging
docker run --log-driver none nginx
```

**JSON file options:**
```bash
docker run --log-opt max-size=10m --log-opt max-file=3 nginx
# Limits: 3 files × 10MB = 30MB max logs
```

**Application logging best practices:**
```javascript
// Always log to stdout/stderr (Docker captures these)
console.log(JSON.stringify({ level: 'info', msg: 'Server started', port: 3000 }));

// Don't log to files inside the container
// (files are lost when container is removed)
```

**Docker Compose logging:**
```yaml
services:
  web:
    image: myapp
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**Centralized logging:**
```yaml
services:
  # Use ELK/Grafana Loki stack for centralized logs
  loki:
    image: grafana/loki:latest
  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q87. How do you manage Docker container networking with multiple networks?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Containers can connect to **multiple networks** simultaneously:

```bash
# Create networks
docker network create frontend
docker network create backend
docker network create database

# Connect container to multiple networks
docker run -d --name api \
  --network frontend \
  --network backend \
  myapi

# Add network to running container
docker network connect database api

# Remove network
docker network disconnect frontend api
```

**Network segmentation example:**
```
Internet ─→ [Nginx] ── frontend ── [API] ── backend ── [DB]
                    ↕                        ↕
              [frontend network]       [backend network]
```

```yaml
services:
  nginx:
    image: nginx
    networks:
      - frontend

  api:
    image: myapi
    networks:
      - frontend   # Can receive requests from nginx
      - backend    # Can connect to database

  db:
    image: postgres
    networks:
      - backend    # Isolated: only API can reach it

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
```

**Key benefit:** Nginx cannot connect directly to the database (security), while the API can reach both.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q88. What is the `STOPSIGNAL` instruction in a Dockerfile?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`STOPSIGNAL` sets the **system call signal** that Docker sends to stop the container:

```dockerfile
# Default signal for most containers
STOPSIGNAL SIGTERM

# Custom signal
STOPSIGNAL SIGQUIT

# For init systems that expect SIGWINCH
STOPSIGNAL SIGWINCH
```

**How container shutdown works:**
1. `docker stop` sends `STOPSIGNAL` (default: SIGTERM)
2. Application has 10 seconds to handle it gracefully
3. If still running after 10s, Docker sends SIGKILL

```dockerfile
# Node.js — native signal handling
FROM node:18-alpine
STOPSIGNAL SIGTERM
CMD ["node", "server.js"]

# Python — needs explicit signal handling
FROM python:3.11-slim
STOPSIGNAL SIGTERM
CMD ["python", "app.py"]  # Python doesn't handle SIGTERM by default
```

**Why you might need to change it:**
- Some applications don't handle SIGTERM
- Nginx needs SIGQUIT for graceful shutdown
- Java apps may need SIGTERM (but JVM handles it differently)
- Init process (tini, dumb-init) forwards signals to child processes

```dockerfile
# Nginx graceful shutdown
FROM nginx:alpine
STOPSIGNAL SIGQUIT  # Nginx gracefully shuts down on SIGQUIT
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q89. How do you restrict a container's access to the host filesystem?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Read-only root filesystem:**
```bash
docker run --read-only myapp
# Container can't write anywhere except mounted volumes
```

**2. Read-only with tmpfs for temp files:**
```bash
docker run --read-only --tmpfs /tmp --tmpfs /var/run myapp
```

**3. Drop all capabilities:**
```bash
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp
# Start with zero capabilities, add only what's needed
```

**4. No new privileges:**
```bash
docker run --security-opt no-new-privileges:true myapp
# Prevents privilege escalation (su, sudo)
```

**5. Seccomp security profile:**
```bash
docker run --security-opt seccomp=/path/to/seccomp-profile.json myapp
# Restrict system calls
```

**6. AppArmor/SELinux:**
```bash
docker run --security-opt apparmor=myprofile myapp
```

**Production Docker Compose example:**
```yaml
services:
  web:
    image: myapp
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=64M
      - /var/run
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    security_opt:
      - no-new-privileges:true
    volumes:
      - data:/app/data:rw  # Only writable path
```

**Note:** With `--read-only`, the container can't write to its filesystem at all. You must mount volumes for any writable paths the application needs.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q90. How do you implement rate limiting with Docker?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Docker rate limiting for `docker pull` (Docker Hub):**
Docker Hub has built-in rate limits:
- Anonymous users: 100 pulls per 6 hours
- Authenticated free users: 200 pulls per 6 hours
- Pro/Team: Higher limits

```bash
# Check pull rate limit status
curl -s https://hub.docker.com/v2/users/login | head

# Authenticate for higher limits
docker login
```

**2. Container resource limits:**
```bash
# CPU throttling (rate limit on CPU usage)
docker run --cpus=0.5 --cpu-quota=50000 myapp

# I/O rate limiting
docker run --device-read-bps /dev/sda:1mb --device-write-bps /dev/sda:1mb myapp

# Network rate limiting (not built-in — use traffic control)
```

**3. Application-level rate limiting:**
Use an API gateway (Nginx, Kong, Traefik) in front of containers:
```nginx
# nginx.conf
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

server {
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://api:3000;
    }
}
```

**4. Docker Compose resource limits:**
```yaml
services:
  web:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q91. How do you update a Docker service with zero downtime?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Docker Swarm rolling updates:**

```yaml
services:
  web:
    image: myapp:1.0
    deploy:
      replicas: 5
      update_config:
        parallelism: 1          # Update one container at a time
        delay: 10s              # Wait 10s between updates
        order: start-first      # Start new container before stopping old
        failure_action: rollback # Rollback on failure
        monitor: 30s            # Wait 30s to monitor health after update
      rollback_config:
        parallelism: 0          # Rollback all at once
        order: stop-first
```

```bash
# Trigger rolling update
docker service update --image myapp:2.0 myapp_web

# Or using docker stack deploy
docker stack deploy -c docker-compose.yml myapp
```

**Health check (critical for zero-downtime):**
```yaml
services:
  web:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 5s
      timeout: 3s
      retries: 3
      start_period: 30s
```

**Container drain (handling existing connections):**
The application must handle `SIGTERM` by:
1. Notifying the load balancer it's leaving (health check fails)
2. Draining existing connections (wait for in-flight requests to complete)
3. Then exiting gracefully

```javascript
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
  // Force shutdown after 30s if not drained
  setTimeout(() => process.exit(1), 30000);
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q92. How do you run Docker containers that need access to the host's Docker daemon?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Mounting the Docker socket (`/var/run/docker.sock`):**

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock docker:cli
```

**Security implications:**
- Mounting the Docker socket gives the container **root access to the host**
- The container can create, start, stop, and delete any container on the host
- Only do this with trusted containers

**Use cases where it's necessary:**

**1. CI/CD runners (GitLab CI, Jenkins, Drone):**
```yaml
services:
  runner:
    image: gitlab/gitlab-runner
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

**2. Docker-in-Docker (DinD) for CI:**
```yaml
services:
  dind:
    image: docker:24-dind
    privileged: true  # Requires privileged mode
```

**3. Container monitoring tools:**
```bash
docker run -d --name cadvisor \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  gcr.io/cadvisor/cadvisor
```

**4. Portainer (Docker UI):**
```bash
docker run -d -p 8000:8000 -p 9443:9443 \
  --name portainer \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  portainer/portainer-ce
```

**Secure alternatives:**
- Use Docker's API with TLS certificates instead of socket
- Use authorization plugin (e.g., `docker-flow-proxy`)
- Use Kubernetes instead (RBAC, service accounts)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q93. How does Docker's network namespace isolation work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker uses **Linux network namespaces** to create isolated network stacks:

**Each container gets its own:**
- Network interfaces (eth0, lo)
- IP addresses and routing tables
- Firewall rules (iptables)
- Network sockets (ports)
- /proc/net directory

**How Docker creates isolation:**

```
Host Network Namespace:
[eth0] [docker0] [iptables] [routes]

Container A's Namespace:
[vethA] [lo] [routes]
     │
     └── connects to docker0 bridge

Container B's Namespace:
[vethB] [lo] [routes]
     │
     └── connects to docker0 bridge
```

**Key components:**

1. **veth pairs** — Virtual Ethernet cables connecting container to the bridge
2. **Bridge** — Virtual switch (docker0 or custom)
3. **iptables** — NAT rules for external access
4. **Network namespace** — Isolated network stack per container

**Communication paths:**
- Container ↔ Container (same bridge): Direct via bridge
- Container → Internet: NAT through host's IP
- Internet → Container: Port forwarding (iptables DNAT)

```bash
# See network namespaces on host
ls -la /var/run/netns/
# (Docker doesn't create visible namespace entries — use docker inspect)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q94. What is the `LABEL` instruction in a Dockerfile?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`LABEL` adds **metadata** to an image as key-value pairs:

```dockerfile
FROM node:18-alpine

LABEL maintainer="devops@company.com"
LABEL version="1.0.0"
LABEL description="My application image"
LABEL org.opencontainers.image.source="https://github.com/org/repo"
LABEL org.opencontainers.image.created="2024-01-15T10:00:00Z"
LABEL org.opencontainers.image.version="1.0.0"
```

**Viewing labels:**
```bash
# Inspect image labels
docker inspect --format='{{json .Config.Labels}}' myapp | jq

# Filter containers by label
docker ps --filter "label=version=1.0.0"

# Filter images by label
docker images --filter "label=maintainer=devops@company.com"
```

**Common use cases:**
- Version tracking (Git SHA, version number)
- Contact information (maintainer, support)
- CI/CD metadata (build number, build URL)
- OCI annotations (standardized labels)
- Security scanning integration

**OCI annotation standards:**
```dockerfile
LABEL org.opencontainers.image.title="My App"
LABEL org.opencontainers.image.description="Backend API service"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.created="2024-01-15T10:00:00Z"
LABEL org.opencontainers.image.source="https://github.com/org/repo"
LABEL org.opencontainers.image.revision="${{ github.sha }}"
LABEL org.opencontainers.image.licenses="MIT"
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q95. How do you handle database migrations with Docker?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Strategies for running database migrations:**

**1. Init container (Kubernetes pattern):**
```yaml
services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s

  migrate:
    image: myapp-migrations
    depends_on:
      db:
        condition: service_healthy
    command: ["npm", "run", "migrate"]
    # Exits after migration completes

  app:
    image: myapp
    depends_on:
      migrate:
        condition: service_completed_successfully
    # Starts only after migrations succeed
```

**2. Application-initialized migrations:**
Run migrations as part of the application startup:
```javascript
// server.js
const start = async () => {
  await db.migrate();     // Run migrations first
  await app.listen(3000); // Then start server
};
start();
```

**3. Dedicated migration container with volumes:**
```yaml
services:
  migrate:
    image: node:18-alpine
    volumes:
      - ./migrations:/migrations
    working_dir: /migrations
    depends_on:
      db:
        condition: service_healthy
    command: sh -c "npm install && npm run migrate"
```

**4. Rolling migration (zero downtime — backward compatible):**
```yaml
# Phase 1: Add new columns (old app still works)
# Phase 2: Deploy new app version that uses new columns
# Phase 3: Remove old columns
```

**Best practices:**
- Always test migrations in a staging environment first
- Ensure migrations are idempotent (can run multiple times safely)
- Never run destructive migrations (DROP COLUMN) without backup
- Use transaction-wrapped migrations for atomic changes

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q96. What is the difference between `docker pause` and `docker stop`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Command | Signal | Effect | Memory | State |
|---------|--------|--------|--------|-------|
| `docker pause` | SIGSTOP | Freezes all processes | Preserved in memory | "Paused" |
| `docker stop` | SIGTERM → SIGKILL | Terminates main process | Released | "Exited" |

```bash
# Pause: freeze processes (uses cgroups freezer)
docker pause container_name
# Processes are suspended (not terminated)
docker unpause container_name  # Resume

# Stop: graceful shutdown
docker stop container_name
# To restart a stopped container, use docker start
```

**When to use pause:**
- Temporarily halt a container for debugging
- Freeze processes for checkpoint/restore
- Suspend a container to reduce CPU usage without losing state
- Testing failure scenarios

**When to use stop:**
- Clean shutdown of a container
- Freeing resources (memory, ports)
- Preparing for container removal

**Key difference:** Paused containers still consume memory. Stopped containers release all resources except disk storage.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q97. How do you set up a private Docker registry?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Run a local registry:**
```bash
docker run -d -p 5000:5000 --name registry registry:2

# Push to local registry
docker tag myapp localhost:5000/myapp:1.0
docker push localhost:5000/myapp:1.0

# Pull from local registry
docker pull localhost:5000/myapp:1.0
```

**2. Registry with storage:**
```yaml
services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    environment:
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - registry-data:/data

volumes:
  registry-data:
```

**3. Registry with TLS (HTTPS):**
```yaml
services:
  registry:
    image: registry:2
    ports:
      - "443:5000"
    environment:
      REGISTRY_HTTP_TLS_CERTIFICATE: /certs/domain.crt
      REGISTRY_HTTP_TLS_KEY: /certs/domain.key
    volumes:
      - ./certs:/certs:ro
      - registry-data:/var/lib/registry
```

**4. Registry with authentication:**
```bash
# Create htpasswd file
docker run --entrypoint htpasswd httpd:2 -Bbn username password > auth/htpasswd

# Enable authentication
docker run -d -p 5000:5000 \
  -v $PWD/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  registry:2

# Login and push
docker login localhost:5000
docker push localhost:5000/myapp:1.0
```

**5. Using Harbor (enterprise registry):**
```yaml
# Harbor includes: registry, UI, vulnerability scanning, replication, RBAC
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q98. How do you handle graceful shutdown of Node.js applications in Docker?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Node.js signal handling for graceful shutdown:**

```javascript
const server = require('http').createServer((req, res) => {
  // ... handle request
});

// Handle SIGTERM (docker stop)
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Starting graceful shutdown...');

  // Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed.');

    // Close database connections
    await db.close();

    // Close Redis connections
    await redis.quit();

    // Flush logs
    console.log('Shutdown complete.');
    process.exit(0);
  });

  // Force shutdown if graceful fails
  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 30000);  // 30 second timeout
});
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine

# Use tini for proper signal handling
RUN apk add --no-cache tini

WORKDIR /app
COPY . .

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
```

**Common pitfalls:**
- **Exec form vs shell form:** Use `CMD ["node", "server.js"]` (exec form) — shell form (`CMD node server.js`) doesn't forward signals
- **PID 1:** Node as PID 1 doesn't handle SIGTERM by default. Use tini, dumb-init, or handle signals explicitly
- **Container stop timeout:** Docker's default 10 seconds may not be enough. Use `docker stop -t 30` for more time

```bash
# Extend stop timeout
docker stop -t 60 mycontainer
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q99. What is `docker compose config` used for?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`docker compose config` **validates and displays** the resolved Compose file:

```bash
# Validate Compose file (no output if valid)
docker compose config

# Show the resolved configuration
docker compose config

# Show services only
docker compose config --services

# Show volume names only
docker compose config --volumes

# Output as JSON
docker compose config --format json

# Don't interpolate environment variables
docker compose config --no-interpolate

# Resolve all variables and show final config
docker compose config --resolve-image-digests
```

**What it resolves:**
- Environment variable interpolation (${VAR})
- `.env` file values
- Compose file inheritance (extends)
- Default values (ports, networks, volumes)
- YAML anchors and aliases

**Example:**
```bash
# docker-compose.yml
services:
  web:
    image: ${IMAGE:-nginx}:latest
    ports:
      - "${PORT:-8080}:80"

# Output of `docker compose config`
services:
  web:
    image: nginx:latest
    networks:
      default: null
    ports:
      - mode: ingress
        target: 80
        published: "8080"
        protocol: tcp
```

**Use cases:**
- Debugging variable resolution issues
- Validating Compose file syntax before deployment
- Generating deployment artifacts (CI/CD)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q100. How do you handle file permissions with Docker volumes?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**The permission problem:**
- Host users have UID/GID (e.g., 1000:1000)
- Container users have different UID/GID (e.g., root or node:1000)
- Files created by the container on a mounted volume have container's UID/GID

**Solutions:**

**1. Match the UID between host and container:**
```dockerfile
FROM node:18-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup -u 1000
USER appuser
```

**2. Use `user:` in Docker Compose to match host UID:**
```yaml
services:
  web:
    image: myapp
    user: "1000:1000"  # Match host user's UID/GID
    volumes:
      - ./data:/app/data
```

**3. Fix permissions with an entrypoint script:**
```bash
#!/bin/sh
# entrypoint.sh
chown -R appuser:appgroup /app/data
exec "$@"
```

**4. Use `fsGroup` (Kubernetes):**
```yaml
securityContext:
  fsGroup: 1000  # All files in volumes get this GID
```

**5. Named volumes (Docker-managed):**
```yaml
services:
  db:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    # Docker handles permissions for named volumes
volumes:
  pgdata:
```

**6. Avoid bind mounts for write-intensive data in containers:**
Use named volumes instead — Docker manages the permissions internally and they work across platforms more reliably.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q101. How does Docker handle secrets in Swarm mode?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Docker Secrets** securely manage sensitive data in Swarm:

```bash
# Create a secret (from stdin)
echo "MyDBPassword123!" | docker secret create db_password -

# Create from file
docker secret create db_password ./db_password.txt

# List secrets
docker secret ls

# Use in a service
docker service create --name db \
  --secret db_password \
  -e POSTGRES_PASSWORD_FILE=/run/secrets/db_password \
  postgres:16
```

**In Docker Compose (v3.1+):**
```yaml
services:
  web:
    image: myapp
    secrets:
      - api_key
      - db_password
    environment:
      - API_KEY_FILE=/run/secrets/api_key

secrets:
  api_key:
    external: true        # Created with docker secret create
  db_password:
    file: ./db_password.txt  # Created from file
```

**How secrets work:**
1. Secrets are encrypted during transit and at rest
2. Secrets are mounted as files at `/run/secrets/<secret_name>` (tmpfs, never on disk)
3. Only containers in services that have been granted access can see the secret
4. Secrets are never stored in image layers

```javascript
// Reading a secret from file
const fs = require('fs');
const apiKey = fs.readFileSync('/run/secrets/api_key', 'utf8').trim();
```

**Important:** Docker Secrets only works in Swarm mode, not with standalone containers. For standalone mode, use bind mounts with restricted permissions or environment files.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q102. How do you run Docker containers with GPU access?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Running containers with GPU access (NVIDIA):**

**1. Install NVIDIA Container Toolkit:**
```bash
# Ubuntu/Debian
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
```

**2. Run with GPU access:**
```bash
# Request all GPUs
docker run --gpus all nvidia/cuda:12.0-base nvidia-smi

# Request specific GPUs
docker run --gpus '"device=0,1"' nvidia/cuda:12.0-base nvidia-smi

# Request GPUs with capabilities
docker run --gpus 'capabilities=compute,utility' nvidia/cuda:12.0-base nvidia-smi
```

**Docker Compose:**
```yaml
services:
  ml:
    image: tensorflow/tensorflow:latest-gpu
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

**Verifying GPU access:**
```bash
docker run --gpus all nvidia/cuda:12.0-base nvidia-smi
# Should show GPU information
```

**ML frameworks with GPU Docker:**
```bash
# PyTorch
docker run --gpus all -it pytorch/pytorch:latest-cuda

# TensorFlow
docker run --gpus all -it tensorflow/tensorflow:latest-gpu

# Jupyter with GPU
docker run --gpus all -p 8888:8888 jupyter/datascience-notebook
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q103. What is the `docker trust` command?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`docker trust` manages **Docker Content Trust (DCT)** — image signing and verification:

```bash
# Sign an image
docker trust sign myregistry/myapp:1.0

# View image signature information
docker trust inspect myregistry/myapp:1.0

# Revoke a signature
docker trust revoke myregistry/myapp:1.0

# Manage signing keys
docker trust key generate my-key-name
docker trust signer add --key signer.pub my-signer myregistry/myapp
```

**Enabling content trust:**
```bash
# Pull only signed images
export DOCKER_CONTENT_TRUST=1
docker pull myregistry/myapp:1.0  # Fails if not signed

# Also works for push
DOCKER_CONTENT_TRUST=1 docker push myregistry/myapp:1.0
```

**How it works:**
1. Image publisher signs the image with a private key
2. The signature is stored in the registry (Notary server)
3. Users verify the signature before pulling
4. Ensures image hasn't been tampered with

**Key hierarchy:**
- **Root key:** Top-level key (highly protected, offline)
- **Repository key:** Per-repository signing key
- **Tag keys:** Sign specific image tags
- **Snapshot key:** Signs metadata snapshots
- **Timestamp key:** Ensures freshness (automated)

**Use cases:**
- Preventing supply chain attacks
- Ensuring only approved images run in production
- Compliance with security policies

**Note:** DCT uses Notary (open-source) under the hood. It's independent of Docker Hub — works with any OCI-compatible registry.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q104. How does Docker implement container isolation using Linux namespaces?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Docker uses **Linux namespaces** to provide isolated environments:

| Namespace | Isolates | Docker Flag |
|-----------|----------|-------------|
| **PID** | Process IDs (each container sees its own PID tree) | Not configurable |
| **Network** | Network stack (interfaces, iptables, routing) | `--network` |
| **Mount** | Filesystem mount points | `--mount` |
| **UTS** | Hostname and domain name | `--hostname` |
| **IPC** | Inter-process communication (semaphores, shared memory) | `--ipc` |
| **User** | User and group IDs (UID/GID mapping) | `--userns-remap` |
| **Cgroup** | Resource limits (cgroup hierarchy) | Not configurable |

```bash
# Each namespace provides a different view of the system:

# PID namespace: Container sees only its own processes
docker exec container_a ps aux
#  PID  USER   COMMAND
#    1  root   nginx
#   12  root   sh

# On host, these PIDs are different
ps aux | grep nginx
# ... PID 1234 ... nginx
# ... PID 1245 ... nginx
```

**User namespace remapping:**
```bash
# Map container's root user to a non-root user on the host
dockerd --userns-remap=default

# Container sees UID 0 (root), but host sees UID 100000
# This prevents privilege escalation from the container
```

**Combined effect:**
When you run a container, Docker creates new instances of all these namespaces, giving the container its own isolated view of the system. This is how containers achieve process-level virtualization.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q105. How do you debug a container with network connectivity issues?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Step-by-step network debugging:**

```bash
# 1. Check if container is running
docker ps | grep container_name

# 2. Inspect network configuration
docker inspect -f '{{json .NetworkSettings}}' container_name | jq

# 3. Check which networks the container is on
docker inspect -f '{{.NetworkSettings.Networks}}' container_name

# 4. Check DNS resolution inside container
docker exec container_name cat /etc/resolv.conf
docker exec container_name nslookup google.com

# 5. Test external connectivity
docker exec container_name ping 8.8.8.8
docker exec container_name curl -v http://google.com

# 6. Test inter-container connectivity
docker exec container_a ping container_b
docker exec container_a curl http://container_b:3000

# 7. Check network rules
docker network inspect mynetwork

# 8. Check host firewall
iptables -L -n | grep DOCKER

# 9. Check port mapping
docker port container_name

# 10. Run a network debugging container
docker run --net container:target_container --rm nicolaka/netshoot
# netshoot includes: ping, curl, dig, nmap, tcpdump, iperf, etc.
```

**Common issues:**
- Container not on the same Docker network → can't communicate by name
- Firewall blocking ports on the host
- Service only listening on localhost (127.0.0.1 vs 0.0.0.0)
- DNS not resolving (wrong DNS server in /etc/resolv.conf)
- MTU issues (common with overlay networks in Docker Cloud)

**Quick test with netshoot:**
```bash
docker run -it --network container:myapp nicolaka/netshoot
# Now you can run ping, curl, nmap, tcpdump from inside myapp's network
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q106. How do you create a minimal Docker image from scratch?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Using the `scratch` base image (minimal possible):**
```dockerfile
# Nothing. Truly empty.
FROM scratch

# Add a statically linked binary
COPY myapp /myapp
CMD ["/myapp"]
```

**For Go apps (fully static binary):**
```dockerfile
# Build
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o myapp .

# Production — truly minimal
FROM scratch
COPY --from=builder /app/myapp /myapp
EXPOSE 8080
CMD ["/myapp"]
```

**Result:** ~10-15MB image (just the Go binary, nothing else!)

**2. For Rust apps:**
```dockerfile
FROM rust:1.75 AS builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM scratch
COPY --from=builder /app/target/release/myapp /myapp
CMD ["/myapp"]
```

**3. For distroless images (better than scratch for most cases):**
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM gcr.io/distroless/nodejs18-debian11
COPY --from=builder /app/dist /app
CMD ["/app/server.js"]
# ~130MB (Node runtime + app, no shell, no OS utilities)
```

**4. Using Alpine for a tiny (but functional) image:**
```dockerfile
FROM alpine:3.19
RUN apk add --no-cache ca-certificates
COPY mybinary /bin/
CMD ["/bin/mybinary"]
# ~8MB + binary size
```

**Image size comparison:**
| Strategy | Size |
|----------|------|
| `ubuntu:latest` | ~80MB |
| `alpine:latest` | ~5MB |
| `scratch` + Go binary | ~10MB |
| `gcr.io/distroless/static` | ~2MB |

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q107. How do you handle Docker container autoscaling?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Docker Swarm autoscaling:**
Swarm doesn't have built-in autoscaling. You need external tools:

```bash
# Using docker service scale (manual)
docker service scale myapp_web=10

# Using Docker Swarm autoscaler (community)
docker run -d \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e "INTERVAL=30" \
  -e "SERVICE_NAME=myapp_web" \
  -e "MIN_REPLICAS=2" \
  -e "MAX_REPLICAS=10" \
  -e "TARGET_CPU=70" \
  stalniy/docker-swarm-autoscaler
```

**2. Docker Compose with `--scale` (manual):**
```bash
docker compose up -d --scale web=5
```

**3. Kubernetes HPA (recommended for autoscaling):**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

**4. Monitoring-based autoscaling:**
- Use Prometheus metrics for CPU, memory, request latency
- Trigger scaling based on custom metrics (queue depth, requests per second)
- Tools: Prometheus + Alertmanager (with webhook), or custom scripts

**Important considerations:**
- Services must be **stateless** for horizontal scaling
- Use a shared data layer (database, cache) for all replicas
- Health checks must be implemented for auto-recovery
- Consider **vertical scaling** for stateful services

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q108. What is Docker's `--network host` mode and when would you use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`--network host` makes the container share the **host's network stack** directly (no network namespace isolation):

```bash
docker run --network host nginx
```

**What changes:**
- Container uses the **host's IP address** (no separate container IP)
- Port publishing (`-p`) is **unnecessary** — container ports are directly on the host
- `localhost` in the container refers to the **host's localhost**
- Maximum network performance (no NAT, no bridge overhead)

**Use cases:**
- **Performance-critical network applications** (no bridge overhead)
- **Network monitoring tools** that need to see host traffic
- **Applications needing to bind to specific host ports dynamically**
- **Web servers** on Linux where port 80/443 binding is needed without port mapping

```bash
# Network monitoring container
docker run --network host --privileged -d nicolaka/netshoot

# Web server on host ports directly
docker run --network host nginx
# Accessible at http://localhost:80 (no -p needed)
```

**Limitations:**
- **Linux only** (doesn't work on Docker Desktop for Mac/Windows)
- **No network isolation** — container has full access to host networking
- **Port conflicts** — can't run two containers on the same host port
- **Less configurable** — can't use custom bridge features (DNS, network policies)

**Security implications:**
- Container can bind to **any host port**
- Can see **all host network interfaces**
- Can potentially sniff host traffic
- Use with caution — only for trusted containers

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q109. How do you use `docker buildx` for building images?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`docker buildx` is Docker's **next-generation build system** (based on BuildKit):

```bash
# List available builders
docker buildx ls

# Create a new builder (with multi-arch support)
docker buildx create --name mybuilder --driver docker-container
docker buildx use mybuilder

# Build and push multi-architecture image
docker buildx build \
  --platform linux/amd64,linux/arm64,linux/arm/v7 \
  -t myregistry/myapp:1.0 \
  --push .

# Build with cache from registry
docker buildx build \
  --cache-from type=registry,ref=myregistry/myapp:cache \
  --cache-to type=registry,ref=myregistry/myapp:cache,mode=max \
  -t myapp .

# Build with inline cache (simpler)
docker buildx build --cache-to type=inline -t myapp .

# Inspect the builder's supported platforms
docker buildx inspect --bootstrap
```

**Common buildx use cases:**

1. **Multi-architecture builds** — Build for amd64, arm64, armv7 in one command
2. **External cache** — Share build cache between CI runs (registry, S3)
3. **Advanced features**:
```dockerfile
# BuildKit secrets
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm install

# SSH agent forwarding for private repos
RUN --mount=type=ssh \
    git clone git@github.com:org/repo.git
```

```bash
# Build with secrets
docker buildx build \
  --secret id=npmrc,src=$HOME/.npmrc \
  --ssh default \
  -t myapp .

# Build with outputs (save to tar, load into Docker)
docker buildx build -o type=tar,dest=image.tar .
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q110. How does Docker handle container-to-container DNS resolution?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Docker's embedded DNS server:**

```bash
# Container can resolve names of other containers on the same network
docker exec web ping api
# PING api (172.18.0.3) 56(84) bytes of data.
```

**How it works:**

1. Docker runs an embedded **DNS resolver** at `127.0.0.11` inside each container
2. Containers' `/etc/resolv.conf` points to this DNS server:
```
nameserver 127.0.0.11
options ndots:0
```

3. When a container queries a name:
   - Docker DNS resolves names of containers on the same network
   - Falls through to the host's DNS for external names

**DNS resolution per network type:**

| Network Type | Container Name Resolution | External Resolution |
|--------------|--------------------------|-------------------|
| **Default bridge** | ❌ No (use links or IP) | ✅ Yes (host DNS) |
| **Custom bridge** | ✅ Yes (by container name) | ✅ Yes |
| **Overlay** | ✅ Yes (by service name) | ✅ Yes |
| **Host** | N/A (shares host network) | N/A |
| **None** | ❌ No network | ❌ No |

**Custom bridge DNS features:**
```bash
# Create a custom bridge
docker network create mynet

# Container names are resolved as DNS names
docker run --network mynet --name web nginx
docker run --network mynet --name api --add-host internal.service:10.0.1.2 alpine

# Test DNS resolution
docker exec api nslookup web
# Server:    127.0.0.11
# Address 1: 172.18.0.2 web
```

**Docker Compose service names:**
```yaml
services:
  api:
    # Resolved as hostname "api" by other services
  db:
    # Resolved as "db"
```

</div>
</details>

---

## 🔴 Hard (Q111–Q170)

<details class="qa-card qa-hard">
<summary>
Q111. How does Docker's overlay network work under the hood?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Docker's **overlay network** enables communication between containers on different hosts:

**Architecture:**

```
Host 1                        Host 2
┌────────────────────┐        ┌────────────────────┐
│ Container A        │        │ Container B        │
│ 10.0.1.2/24        │        │ 10.0.1.3/24        │
└──────┬─────────────┘        └──────┬─────────────┘
       │                             │
┌──────┴─────────────┐        ┌──────┴─────────────┐
│ veth pair          │        │ veth pair          │
└──────┬─────────────┘        └──────┬─────────────┘
       │                             │
┌──────┴─────────────┐        ┌──────┴─────────────┐
│ docker_gwbridge    │        │ docker_gwbridge    │
│ (10.0.2.0/24)     │        │ (10.0.2.0/24)     │
└──────┬─────────────┘        └──────┬─────────────┘
       │                             │
┌──────┴─────────────┐        ┌──────┴─────────────┐
│ VXLAN Tunnel       │◄──────►│ VXLAN Tunnel       │
│ (UDP 4789)         │        │ (UDP 4789)         │
└──────┬─────────────┘        └──────┬─────────────┘
       │                             │
┌──────┴─────────────┐        ┌──────┴─────────────┐
│ eth0 (host)        │        │ eth0 (host)        │
│ 192.168.1.10       │        │ 192.168.1.20       │
└────────────────────┘        └────────────────────┘
```

**Key components:**

1. **VXLAN** — Encapsulates Layer 2 frames in UDP packets (default port 4789)
2. **VNI (VXLAN Network Identifier)** — Unique ID per overlay network (16M possible)
3. **docker_gwbridge** — Bridge for outbound traffic (internet access)
4. **Embedded DNS** — Resolves service names across hosts

**Encryption:**
```bash
docker network create --driver overlay --opt encrypted myscope
```
Uses IPsec ESP encryption (added ~3% CPU overhead).

**Performance considerations:**
- VXLAN adds ~50 bytes overhead per packet
- Can reduce throughput by 5-10% compared to host networking
- Encryption adds additional ~3-5% overhead
- For high-performance apps, consider host networking or macvlan

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q112. How do you implement container trust and image signing in production?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Container image signing ensures supply chain security:**

**1. Docker Content Trust (Notary):**
```bash
# Enable in production
export DOCKER_CONTENT_TRUST=1

# Sign images during CI
docker trust sign myregistry/myapp:${CI_COMMIT_SHA}

# Verify before deploy
docker trust inspect --pretty myregistry/myapp:${CI_COMMIT_SHA}
```

**2. Cosign (Sigstore) — Modern approach:**
```bash
# Install cosign
cosign generate-key-pair

# Sign an image
cosign sign --key cosign.key myregistry/myapp:1.0

# Verify
cosign verify --key cosign.pub myregistry/myapp:1.0

# Keyless signing (uses OIDC)
cosign sign myregistry/myapp:1.0

# Keyless verification
cosign verify myregistry/myapp:1.0
```

**3. In-toto attestations:**
Provenance attestations describe how the image was built:
```bash
# Generate provenance attestation
docker buildx build \
  --attest type=provenance,mode=max \
  --attest type=sbom \
  -t myregistry/myapp:1.0 \
  --push .
```

**4. Admission control (Kubernetes):**
```yaml
# Only allow signed images to run
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredProvenance
spec:
  match:
    kinds: [{"apiGroups": [""], "kinds": ["Pod"]}]
  parameters:
    images:
      - "myregistry/*"
```

**5. SBOM (Software Bill of Materials):**
```bash
# Generate SBOM during build
docker buildx build --attest type=sbom -t myapp --push .

# Scan for vulnerabilities
docker scout cves myapp:1.0
```

**Production policy example:**
1. All images must be signed (Cosign or Notary)
2. All images must have a SBOM
3. No images with critical vulnerabilities can run
4. Images must be built from approved base images

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q113. How does Docker's cgroup implementation work for resource limiting?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Docker uses **Linux cgroups (control groups)** to limit and isolate container resource usage:

**cgroup v2 (modern, default in Linux 4.15+):**

**CPU limiting:**
```bash
# Limit to 0.5 CPU cores
docker run --cpus 0.5 myapp

# cgroup writes:
# /sys/fs/cgroup/cpu.max → "50000 100000"
# (50ms of every 100ms period)

# CPU shares (relative weight)
docker run --cpu-shares 512 myapp
# /sys/fs/cgroup/cpu.weight → 512 (relative to other containers)
```

**Memory limiting:**
```bash
# Limit to 512MB
docker run -m 512m myapp

# cgroup writes:
# /sys/fs/cgroup/memory.max → 536870912 (512MB)
# /sys/fs/cgroup/memory.high → 512MB (soft limit)

# OOM priority
docker run --oom-kill-disable myapp
# /sys/fs/cgroup/memory.oom.group → 1

# Swap limit
docker run --memory-swap 1g myapp
# memory.swap.max → 1073741824
```

**Block I/O limiting:**
```bash
# Read/write speed limits
docker run --device-read-bps /dev/sda:10mb --device-write-bps /dev/sda:10mb myapp

# cgroup writes:
# /sys/fs/cgroup/io.max → "8:0 rbps=10485760 wbps=10485760"
```

**PID limiting:**
```bash
docker run --pids-limit 100 myapp  # Max 100 processes
# /sys/fs/cgroup/pids.max → 100
```

**Viewing cgroup settings from inside the container:**
```bash
docker exec container_name cat /sys/fs/cgroup/memory.max
# 536870912 (512MB)
```

**cgroup v1 vs v2:**
- Docker defaults to cgroup v2 on modern Linux distributions
- cgroup v2 unifies controllers under a single hierarchy
- cgroup v2 has better accounting for memory and I/O

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q114. How do you implement a container security scanning pipeline?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Container security scanning in CI/CD:**

**1. Docker Scout (Docker's built-in scanner):**
```bash
# Analyze local image
docker scout quickview myapp:1.0

# Compare to a baseline
docker scout compare myapp:1.0 --to myapp:1.0-safe

# Get CVE details
docker scout cves myapp:1.0

# Continuous monitoring (Docker Hub)
# Enable "Vulnerability Scanning" under repository settings
```

**2. Trivy (open-source, fast):**
```bash
# Scan image
trivy image myapp:1.0

# Scan with severity filter
trivy image --severity CRITICAL,HIGH myapp:1.0

# Output formats: table, json, sarif
trivy image --format json myapp:1.0 > scan-results.json

# Fail on critical/high vulns
trivy image --exit-code 1 --severity CRITICAL myapp:1.0
```

**3. GitHub Actions integration:**
```yaml
- name: Build and scan
  run: |
    docker build -t myapp:${{ github.sha }} .
    trivy image --exit-code 1 --severity CRITICAL,HIGH myapp:${{ github.sha }}
    docker push myapp:${{ github.sha }}
```

**4. Multi-stage scanning strategy:**

| Stage | Scan | Tool | Action |
|-------|------|------|--------|
| Development | Dependencies | `npm audit` / `pip-audit` | Fix before commit |
| Build | Base image | `docker scout quickview` | Choose safe base |
| Build | Image layers | Trivy / Grype | Block critical CVEs |
| Registry | All images | Trivy / Clair | Continuous monitoring |
| Deploy | Runtime | Falco | Real-time threat detection |

**5. Base image policy:**
```dockerfile
# Always use specific versions (not :latest)
FROM node:18.17.0-alpine@sha256:abc123...

# Prefer distroless for production
FROM gcr.io/distroless/nodejs18-debian11
```

**6. Runtime security (Falco):**
```bash
# Detect unexpected behavior (shell in container, privilege escalation)
docker run -d --name falco \
  --privileged \
  -v /var/run/docker.sock:/host/var/run/docker.sock \
  falcosecurity/falco
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q115. How does Docker's storage driver (overlay2) work internally?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **overlay2** storage driver is Docker's default and most efficient storage driver:

**Directory structure:**
```
/var/lib/docker/overlay2/
├── l/                          # Shortened layer links (for path length limits)
├── <layer-id>/                 # Each image layer
│   ├── diff/                   # Layer's filesystem changes
│   ├── link                    # Symbolic link to l/<short-id>
│   ├── lower                   # Parent layer(s)
│   └── work/                   # OverlayFS working directory
├── <container-id>/             # Each running container
│   ├── diff/                   # Container's writable layer
│   ├── link
│   ├── lower                   # All image layers (merged)
│   ├── merged/                 # Complete merged view (container sees this)
│   └── work/
```

**How overlay2 merges layers:**
```
Container View (merged):
/merged → overlay mount of [diff on top of lower layers]
  ├── /app
  ├── /etc
  ├── /usr
  └── /var

Lower Layers (image layers):
Layer 3: diff3 (app code)
Layer 2: diff2 (npm packages)
Layer 1: diff1 (OS packages)

Upper Layer (container):
diff/ (writable, changes here)
```

**Copy-on-write (CoW):**
- **Read:** Search upper layer first, then lower layers
- **Write (new file):** Written to upper layer
- **Write (existing file):** Copy-up to upper layer first, then modify
- **Delete:** "Whiteout" file created in upper layer (hides the file from lower layers)

**Performance characteristics:**
- CoW is fast for reads (no copy needed)
- First write to an existing file is slower (copy-up)
- Deleting large files doesn't reclaim space (whiteout only)
- Page cache sharing: shared pages from the same base image are shared in memory

```bash
# Check storage driver
docker info | grep "Storage Driver"

# View layer details
ls -la /var/lib/docker/overlay2/<layer-id>/
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q116. How do you implement a multi-stage Docker build for a compiled language (Go/Rust)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**1. Go — Minimal scratch image:**
```dockerfile
# Build stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o myapp .

# Run stage — truly minimal
FROM scratch
COPY --from=builder /app/myapp /myapp
COPY --from=alpine:latest /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
CMD ["/myapp"]
```

**2. Rust — Small musl-based:**
```dockerfile
# Build stage
FROM rust:1.75-alpine AS builder
WORKDIR /app
RUN apk add --no-cache musl-dev
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

# Run stage
FROM alpine:3.19
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/target/release/myapp /usr/local/bin/
CMD ["myapp"]
```

**3. Rust — Zero size scratch:**
```dockerfile
FROM rust:1.75 AS builder
WORKDIR /app
COPY . .
RUN cargo build --release --target x86_64-unknown-linux-musl

FROM scratch
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/myapp /myapp
CMD ["/myapp"]
```

**4. Go with multi-platform support:**
```dockerfile
ARG TARGETOS
ARG TARGETARCH

FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} \
    CGO_ENABLED=0 \
    go build -o myapp .

FROM alpine:3.19
COPY --from=builder /app/myapp /usr/local/bin/
CMD ["myapp"]
```

```bash
# Build for multiple platforms
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t myapp --push .
```

**Size results:**
| Language | Strategy | Image Size |
|----------|----------|------------|
| Go | scratch | ~15MB |
| Go | alpine | ~20MB |
| Rust | scratch (musl) | ~8MB |
| Rust | alpine | ~15MB |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q117. How do you implement container-level backup and disaster recovery?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Comprehensive backup strategy for Docker:**

**1. Volume backups:**
```bash
# Backup a named volume to a tar file
docker run --rm -v pgdata:/source:ro -v $(pwd):/backup alpine \
  tar czf /backup/pgdata-$(date +%Y%m%d-%H%M%S).tar.gz -C /source .

# Restore volume from backup
docker run --rm -v pgdata:/target -v $(pwd):/backup alpine \
  tar xzf /backup/pgdata-20240115.tar.gz -C /target
```

**2. Database-specific backups:**
```bash
# PostgreSQL
docker exec pg_container pg_dumpall -U postgres > backup.sql
# Restore
cat backup.sql | docker exec -i pg_container psql -U postgres

# MySQL
docker exec mysql_container mysqldump --all-databases -u root -p$PASS > backup.sql

# MongoDB
docker exec mongo_container mongodump --archive > backup.archive
```

**3. Automated backup with a sidecar:**
```yaml
services:
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

  backup:
    image: alpine
    volumes:
      - pgdata:/source:ro
      - ./backups:/backups
      - /var/run/docker.sock:/var/run/docker.sock:ro
    command: |
      sh -c '
        while true; do
          tar czf "/backups/db-$(date +%Y%m%d-%H%M%S).tar.gz" -C /source .
          find /backups -name "*.tar.gz" -mtime +7 -delete
          sleep 86400
        done'
```

**4. Image registry backup:**
```bash
# Backup registry data
docker run --rm -v registry-data:/source:ro -v $(pwd):/backup alpine \
  tar czf /backup/registry-$(date +%Y%m%d).tar.gz -C /source .
```

**5. Disaster recovery plan:**

| Scenario | Recovery Strategy | RTO | RPO |
|----------|------------------|-----|-----|
| Container crash | Restart container | <1 min | 0 |
| Host failure | Re-deploy on new host | 5-15 min | 1 hour |
| Data corruption | Restore volume backup | 30-60 min | Past backup |
| Full site failure | Multi-region DR | 1-4 hours | 1 day |
| Registry loss | Re-push/rebuild images | 1-2 hours | N/A |

**6. Docker Compose DR script:**
```bash
#!/bin/bash
# backup-all.sh
docker compose down
tar czf backup-all-$(date +%Y%m%d).tar.gz \
  docker-compose.yml \
  .env \
  /var/lib/docker/volumes/*/_data
docker compose up -d
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q118. How does Docker handle OOM (Out of Memory) situations?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**When a container exceeds its memory limit, the Linux OOM killer terminates processes:**

**OOM detection flow:**
1. Container reaches `--memory` limit
2. Kernel's OOM killer is triggered
3. OOM killer assigns an **oom_score** to each process
4. Process with highest score is killed
5. Container exits with code **137** (128 + SIGKILL=9)

```bash
# Check if container was OOM killed
docker inspect -f '{{.State.OOMKilled}}' container_name
# true → OOM killed
# false → other exit reason

# Get exit code
docker inspect -f '{{.State.ExitCode}}' container_name
# 137 → OOM killed (128 + SIGKILL)
```

**OOM priority configuration:**

```bash
# Prevent OOM killer from killing the container
docker run --oom-kill-disable myapp
# (Dangerous — container could hang the host)

# Adjust OOM score (lower = less likely to be killed)
docker run --oom-score-adj -500 myapp
# Range: -1000 (least likely) to +1000 (most likely)

# Set memory limits (reduces OOM risk)
docker run -m 512m --memory-reservation 256m myapp
```

**Swarm OOM handling:**
```yaml
services:
  web:
    image: myapp
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    restart_policy:
      condition: on-failure  # Auto-restart after OOM
```

**Preventing OOM:**
1. Set appropriate `--memory` limits based on profiling
2. Use `--memory-reservation` for soft limits
3. Monitor memory usage (`docker stats`, cAdvisor, Prometheus)
4. Implement circuit breakers in the application
5. Use swap with caution (can mask memory pressure)

**OOM debugging:**
```bash
# Check dmesg for OOM killer details
dmesg | grep -i "killed process"
# [12345.678] oom-kill: ... memory used=512000kB ...
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q119. How do you optimize Docker for high-performance computing?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Optimization strategies for high-performance workloads:**

**1. Network performance:**
```bash
# Use host networking (best performance, no overhead)
docker run --network host myapp

# Use macvlan (direct container IP on physical network)
docker network create -d macvlan --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 -o parent=eth0 mynetwork
docker run --network mynetwork myapp

# Tune network buffer sizes
sysctl -w net.core.rmem_max=26214400
sysctl -w net.core.wmem_max=26214400
```

**2. Storage performance:**
```bash
# Use volume driver for faster I/O (local driver with optimizations)
docker volume create --driver local --opt type=tmpfs \
  --opt device=tmpfs --opt o=size=10G fast-data

# Use direct filesystem access (bind mount)
docker run -v /data:/data:rw myapp

# Avoid overlay2 for databases (use bind mounts)
```

**3. CPU/ Memory tuning:**
```bash
# Pin containers to specific CPU cores (improves cache locality)
docker run --cpuset-cpus 0-3 myapp

# Reserve CPU time
docker run --cpus 4 --cpu-shares 2048 myapp

# Huge pages for memory-intensive apps
docker run --sysctl vm.nr_hugepages=128 myapp
```

**4. Kernel tuning:**
```bash
# Per-container sysctl settings
docker run --sysctl net.core.somaxconn=65535 \
           --sysctl net.ipv4.tcp_tw_reuse=1 \
           myapp
```

**5. Use performance monitoring:**
```bash
# perf profiling inside containers
docker run --privileged --pid=host my-perf-image

# Collect container performance metrics
docker stats --no-stream
```

**6. Avoid unnecessary overhead:**
- Don't run unnecessary processes inside containers
- Use `--read-only` when possible (no filesystem modifications)
- Pre-allocate memory with JVM flags (`-Xms`)
- Use connection pooling for databases

**Performance comparison (relative):**
| Networking | Throughput | Latency Overhead |
|------------|------------|------------------|
| Host | 100% | ~0μs |
| macvlan | 95-99% | ~0-2μs |
| Bridge | 90-95% | ~5-20μs |
| Overlay | 85-95% | ~20-50μs |
| Overlay (encrypted) | 80-90% | ~50-100μs |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q120. How do you implement a Docker registry with garbage collection?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Docker Registry garbage collection removes unreferenced blobs:**

**1. Understanding blob references:**
- Manifests (tags) → reference config → reference layers (blobs)
- Blobs not referenced by any manifest → eligible for GC

**2. Running garbage collection:**
```bash
# Run garbage collection (registry must be in readonly mode)
docker run -d --name registry \
  -e REGISTRY_STORAGE_MAINTENANCE_READONLY_ENABLED=true \
  registry:2

# Execute GC
docker exec registry registry garbage-collect /etc/docker/registry/config.yml

# Dry run (see what would be deleted)
docker exec registry registry garbage-collect \
  --dry-run /etc/docker/registry/config.yml
```

**3. Registry with automatic GC (configuration):**
```yaml
# config.yml
version: 0.1
storage:
  delete:
    enabled: true
  maintenance:
    readonly:
      enabled: true
```

**4. Deleting specific manifests/tags:**
```bash
# Delete a tag
REGISTRY_HOST=localhost:5000
REPO=myapp
DIGEST=$(curl -s -H "Accept: application/vnd.docker.distribution.manifest.v2+json" \
  https://$REGISTRY_HOST/v2/$REPO/manifests/1.0 | jq -r '.config.digest')
curl -X DELETE "https://$REGISTRY_HOST/v2/$REPO/manifests/$DIGEST"

# Prune deleted blobs
docker exec registry registry garbage-collect /etc/docker/registry/config.yml
```

**5. Automated cleanup with cron:**
```bash
#!/bin/bash
# docker-gc.sh

# Put registry in maintenance mode
docker exec registry env REGISTRY_STORAGE_MAINTENANCE_READONLY_ENABLED=true

# Dry run
docker exec registry registry garbage-collect --dry-run /etc/docker/registry/config.yml

# Actually run GC
docker exec registry registry garbage-collect /etc/docker/registry/config.yml

# Remove old images (older than 30 days)
REGISTRY_HOST=localhost:5000
for repo in $(curl -s "http://$REGISTRY_HOST/v2/_catalog" | jq -r '.repositories[]'); do
  for tag in $(curl -s "http://$REGISTRY_HOST/v2/$repo/tags/list" | jq -r '.tags[]'); do
    # Check age and delete if older than 30 days
  done
done
```

**Important:** After GC, the registry may use less disk space, but removed images can still be accessed by digest for a period (casync).

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q121. How do you handle Docker image layer attestations and provenance?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Provenance and attestations verify the origin and build process of images:**

**1. Build attestations (Docker BuildKit):**
```bash
# Generate provenance attestation
docker buildx build \
  --attest type=provenance,mode=max \
  --attest type=sbom \
  -t myregistry/myapp:1.0 \
  --push .
```

**2. Provenance attestation types:**
```json
// Provenance (SLSA Level 3)
{
  "predicateType": "https://slsa.dev/provenance/v1",
  "predicate": {
    "builder": { "id": "https://github.com/actions/runner" },
    "buildType": "https://github.com/actions/docker-build-push@v5",
    "invocation": {
      "configSource": {
        "uri": "git+https://github.com/org/repo.git",
        "digest": {"sha1": "abc123..."}
      }
    },
    "materials": [
      {"uri": "docker://node@sha256:abc..."}
    ]
  }
}
```

**3. SBOM (Software Bill of Materials):**
```json
// SBOM in SPDX format
{
  "spdxVersion": "SPDX-2.3",
  "packages": [
    {
      "name": "express",
      "versionInfo": "4.18.2",
      "licenseConcluded": "MIT",
      "externalRefs": [{
        "referenceCategory": "PACKAGE-MANAGER",
        "referenceLocator": "pkg:npm/express@4.18.2"
      }]
    }
  ]
}
```

**4. Verifying attestations:**
```bash
# View attestations
docker buildx imagetools inspect myregistry/myapp:1.0

# Download specific attestation
docker buildx imagetools inspect myregistry/myapp:1.0 \
  --format "{{ json .Manifest }}}"

# Cosign verification
cosign verify-attestation --key cosign.pub myregistry/myapp:1.0
```

**5. Policy enforcement (Kyverno):**
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-provenance
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-provenance
      match:
        resources: { kinds: ["Pod"] }
      validate:
        message: "Image must have SLSA provenance attestation"
        attest:
          - predicateType: "https://slsa.dev/provenance/v1"
            attestors:
              - entries:
                  - keys:
                      publicKeys: |-
                        -----BEGIN PUBLIC KEY-----
                        abc123...
                        -----END PUBLIC KEY-----
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q122. How do you implement Docker container checkpoint and restore?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Docker checkpoint/restore (CRIU-based) allows saving and restoring container state:**

**1. Enable experimental features:**
```bash
# /etc/docker/daemon.json
{
  "experimental": true
}

systemctl restart docker
```

**2. Create a checkpoint:**
```bash
# Checkpoint a running container (save state to disk)
docker checkpoint create mycontainer mycheckpoint

# List checkpoints
docker checkpoint ls mycontainer

# Checkpoint with different options
docker checkpoint create \
  --leave-running        # Don't stop the container
  --checkpoint-dir /tmp/checkpoints \
  mycontainer mycheckpoint
```

**3. Restore from checkpoint:**
```bash
# Start a new container from checkpoint
docker start --checkpoint mycheckpoint mycontainer

# Start from checkpoint on a different host
# (copy checkpoint files first)
docker start --checkpoint mycheckpoint \
  --checkpoint-dir /tmp/checkpoints \
  mycontainer
```

**4. CRIU internals:**
CRIU (Checkpoint/Restore In Userspace) works by:
1. Freezing the container processes (SIGSTOP)
2. Dumping memory pages to disk
3. Saving file descriptors, socket states, and process info
4. The checkpoint can be transferred to another host
5. CRIU restores processes with the same PIDs, file handles, etc.

**Limitations:**
- **Linux only** (not on Docker Desktop for Mac/Windows)
- Requires **same kernel version** on source and target hosts
- Some resources can't be checkpointed: TCP connections, GPUs, devices
- Large memory footprint checkpoints (memory dump equals RAM usage)
- Experimental: not suitable for production yet

**Use cases:**
- Live migration of containers between hosts
- Pre-warming containers (checkpoint after initialization)
- Debugging (replay container state)
- Snapshot for rollback

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q123. How do you run Docker containers with real-time scheduling?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Real-time scheduling for latency-sensitive containers:**

```bash
# Enable real-time scheduling
docker run --cap-add=sys_nice \
  --cpu-rt-runtime 950000 \
  --ulimit rtprio=99 \
  myapp
```

**Configuration:**
```json
// /etc/docker/daemon.json
{
  "cpu-rt-runtime": 950000,
  "cpu-rt-period": 1000000
}
```

**SCHED_FIFO (First In, First Out):**
```bash
docker run --security-opt seccomp=seccomp-rt.json \
  myapp
```

**SCHED_RR (Round Robin):**
```bash
# Inside container, the application must:
# 1. Set scheduler policy
sched_setscheduler(0, SCHED_RR, &param);
```

**Use cases:**
- Audio/video processing
- Industrial control systems
- Financial trading platforms
- Real-time data processing

**Important considerations:**
- Real-time scheduling can starve other processes if misconfigured
- Requires `CAP_SYS_NICE` capability
- Must set appropriate CPU quotas to prevent monopolizing CPU
- Monitor with `docker stats` to ensure no CPU starvation

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q124. How do you implement Docker image streaming and lazy loading?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Image streaming (lazy loading) starts containers without downloading the full image:**

**1. Docker's built-in lazy loading (overlayfs snapshots):**
- Standard Docker downloads all layers before starting
- No native lazy loading in base Docker

**2. Nydus (from Dragonfly):**
```bash
# Install Nydus snapshotter
# Convert image to Nydus format
nydusify convert --source myapp:latest --target myapp:nydus

# Use with containerd
ctr image pull myapp:nydus
ctr run --snapshotter nydus myapp:nydus mycontainer
```

**3. Starlight (from Containerd):**
```bash
# Use lazy pulling with containerd
# Configure containerd to use Starlight snapshotter

# Container starts immediately with metadata
# Data blocks are fetched on-demand
```

**4. eStargz (from Google):**
```bash
# Convert image to eStargz
crane rebase --format=estargz myapp:latest

# Pull with lazy loading
nerdctl pull --snapshotter=stargz myapp:latest
nerdctl run myapp:latest
```

**5. Docker Desktop's "Virtual Machine Filesystem":**
- macOS/Windows Docker Desktop uses a custom filesystem
- Lazy-loads image layers on demand
- Significantly improves `docker pull` times

**Performance comparison:**
| Method | First Pull | Container Start | On-demand Read |
|--------|------------|-----------------|----------------|
| Standard | Download all layers | After full download | Fast (all local) |
| eStargz | Download metadata only | Immediate | Slight delay on first read |
| Nydus | Download metadata only | Immediate | Fast (chunk-based) |
| Starlight | Download metadata only | Immediate | Moderate delay |

**Trade-offs:**
- Lazily-loaded images are slightly slower on first access to each file
- Best for large images where most files aren't accessed immediately
- Requires containerd-based setups (not standard Docker)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q125. How do you implement Docker container migration between hosts?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Container migration strategies:**

**1. CRIU-based live migration:**
```bash
# Source host
docker checkpoint create --leave-running myapp mycheckpoint
tar czf checkpoint.tar.gz /var/lib/docker/containers/<id>/checkpoints/

# Copy to destination
scp checkpoint.tar.gz dest-host:/tmp/

# Destination host
tar xzf /tmp/checkpoint.tar.gz -C /var/lib/docker/containers/<id>/checkpoints/
docker start --checkpoint mycheckpoint myapp
```

**2. Volume migration (using volumes):**
```bash
# Source
docker run --rm -v appdata:/source:ro -v $(pwd):/backup alpine \
  tar czf /backup/appdata.tar.gz -C /source .

# Copy to destination
scp appdata.tar.gz dest-host:/tmp/

# Destination (restore and restart)
docker run --rm -v appdata:/target -v /tmp:/backup alpine \
  tar xzf /backup/appdata.tar.gz -C /target
docker run -d --name myapp -v appdata:/data myapp
```

**3. Swarm service migration:**
```bash
# Stop service
docker service scale myapp_web=0

# Update service to new config
docker service update \
  --constraint-add node.hostname!=old-host \
  myapp_web

# Scale up on new node
docker service scale myapp_web=3
```

**4. Docker Registry-based migration:**
```bash
# Source: push to registry
docker commit myapp migrated-app:latest
docker tag migrated-app:latest new-host-registry/app:latest
docker push new-host-registry/app:latest

# Destination: pull and run
docker pull new-host-registry/app:latest
docker volume create appdata
# Restore data volume
# Start container
docker run -d --name myapp -v appdata:/data new-host-registry/app:latest
```

**5. Automated migration with tools:**
- **Docker Swarm** — Automatic rescheduling on node failure
- **Kubernetes** — Pod eviction and rescheduling
- **Nomad** — Job migration
- **Portainer** — Manual container redeploy

**Challenges:**
- Stateful containers require volume migration
- Network connections are lost during move
- DNS and service discovery updates needed
- Zero-downtime migration is complex

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q126. How do you implement Docker host fault tolerance with Swarm?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Docker Swarm fault tolerance ensures services survive host failures:**

**1. Raft consensus for management:**
```
Swarm managers use Raft consensus:
- 3 managers → tolerate 1 failure
- 5 managers → tolerate 2 failures
- 7 managers → tolerate 3 failures (rarely needed)
```

```bash
# Initialize with 3 managers
docker swarm init
docker swarm join-token manager
docker swarm join --token <manager-token> manager2:2377
docker swarm join --token <manager-token> manager3:2377
```

**2. Service replication across nodes:**
```yaml
services:
  web:
    image: myapp:1.0
    deploy:
      replicas: 5
      placement:
        constraints:
          - node.role == worker
        preferences:
          - spread: node.labels.zone  # Spread across zones
```

**3. Node failure handling:**
```bash
# Drain a node for maintenance
docker node update --availability drain node1

# All containers on node1 are rescheduled to other nodes
docker service ls
# Replicas are redistributed

# Bring node back
docker node update --availability active node1
```

**4. Auto-lock (encryption at rest):**
```bash
# Enable auto-lock on Swarm init
docker swarm init --autolock

# Swarm restarts require unlocking
docker swarm unlock
# Enter key...
```

**5. Multi-zone deployment:**
```yaml
services:
  db:
    image: postgres
    deploy:
      replicas: 2
      placement:
        constraints:
          - node.labels.zone != same  # Different zones
    volumes:
      - pgdata:/var/lib/postgresql/data
```

**6. Health checks for automatic recovery:**
```yaml
services:
  web:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 5s
      retries: 3
      start_period: 10s
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
```

```bash
# Swarm creates new containers if health check fails
docker service ls
docker service ps myapp_web
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q127. How does Docker handle container orchestration at scale?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Scaling Docker orchestration presents several challenges:**

**1. Docker Swarm scaling limits:**

| Resource | Maximum | Recommendation |
|----------|---------|---------------|
| Nodes | 1000+ | 50-100 per manager |
| Services | 1000+ | 100-500 |
| Containers | 10,000+ | 1,000 per node |
| Networks | 100+ | 50 |
| Secrets | 100+ | 50 |

**2. Performance bottlenecks at scale:**
```bash
# Gossip protocol overhead increases with node count
# Each node communicates with random subset of nodes

# Raft consensus slows with many managers
# Solution: use 3-5 managers, rest as workers

# DNS resolution latency
# Solution: increase DNS cache TTL
```

**3. Large-scale Swarm best practices:**
```yaml
services:
  web:
    image: myapp
    deploy:
      replicas: 50
      update_config:
        parallelism: 5     # Update 5 at a time
        delay: 10s          # Wait 10s between groups
        monitor: 30s        # Monitor health 30s
      restart_policy:
        condition: any
        delay: 5s
        max_attempts: 3
```

**4. Monitoring at scale:**
```bash
# Use Prometheus for metrics collection
docker service create \
  --name prometheus \
  --mode global \
  -p 9090:9090 \
  prom/prometheus

# Use cAdvisor for container metrics
docker service create \
  --name cadvisor \
  --mode global \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
  gcr.io/cadvisor/cadvisor
```

**5. Container scheduling strategies:**
```yaml
services:
  worker:
    image: myworker
    deploy:
      placement:
        constraints:
          - node.role == worker       # Only workers
          - node.labels.disk == ssd   # With SSD
        preferences:
          - spread: node.labels.zone  # Spread evenly
```

**6. Resource-aware scheduling:**
```yaml
services:
  web:
    image: myapp
    deploy:
      resources:
        reservations:
          cpus: '0.5'
          memory: 256M
        limits:
          cpus: '1.0'
          memory: 512M
```

**7. Network optimization:**
```bash
# Use overlay networks with encryption disabled for performance
docker network create --driver overlay \
  --opt encrypted=false \
  myscope

# Increase MTU for better performance
docker network create --driver overlay \
  --opt com.docker.network.driver.mtu=1450 \
  myscope
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q128. How do you implement Docker multi-tenancy?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Docker multi-tenancy strategies for isolating workloads:**

**1. Namespace isolation per tenant:**
```yaml
# docker-compose.tenant-a.yml
services:
  web:
    image: myapp
    networks:
      - tenant-a-net
    volumes:
      - tenant-a-data:/data
networks:
  tenant-a-net:
volumes:
  tenant-a-data:
```

**2. User namespace remapping:**
```json
// /etc/docker/daemon.json
{
  "userns-remap": "default"
}
```

Maps container root (UID 0) to a non-privileged host UID (e.g., 100000).

```bash
# Each tenant gets different UID mapping
docker run --userns=host --user 1000:1000 myapp
```

**3. Resource quotas per tenant:**
```yaml
services:
  tenant-a:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 1G
        reservations:
          cpus: '1'
          memory: 512M

  tenant-b:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 2G
        reservations:
          cpus: '2'
          memory: 1G
```

**4. Network isolation:**
```bash
# Each tenant gets isolated networks
docker network create --internal tenant-a-internal
docker network create --internal tenant-b-internal

# Tenants can't communicate across networks
docker run --network tenant-a-internal --name app-a myapp
docker run --network tenant-a-internal --name db-a postgres
```

**5. Port management:**
```yaml
services:
  tenant-a:
    ports:
      - "8081:80"  # Different ports per tenant
  tenant-b:
    ports:
      - "8082:80"
```

**6. Image segregation:**
```bash
# Use separate registries or namespaces per tenant
docker tag myapp registry.example.com/tenant-a/myapp:1.0
docker tag myapp registry.example.com/tenant-b/myapp:1.0
```

**7. Security policies per tenant:**
```bash
# Each tenant gets different security policies
docker run \
  --security-opt seccomp=/path/to/tenant-a/seccomp.json \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  --read-only \
  myapp
```

**8. Kubernetes is better for multi-tenancy:**
- Namespaces (native isolation)
- ResourceQuotas (per-namespace limits)
- NetworkPolicies (per-namespace network rules)
- RBAC (per-user permissions)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q129. How do you implement Docker containers with RDMA (Remote Direct Memory Access)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**RDMA in Docker enables ultra-low-latency communication for HPC workloads:**

**1. RDMA device access:**
```bash
# Pass RDMA devices to container
docker run --device /dev/infiniband/uverbs0 \
  --device /dev/infiniband/rdma_cm \
  --cap-add=IPC_LOCK \
  --ulimit memlock=-1 \
  rdma-app
```

**2. Docker Compose RDMA configuration:**
```yaml
services:
  hpc:
    image: rdma-app:latest
    devices:
      - /dev/infiniband/uverbs0
      - /dev/infiniband/rdma_cm
      - /dev/infiniband/issm0
    cap_add:
      - IPC_LOCK
      - SYS_ADMIN
    ulimits:
      memlock:
        soft: -1
        hard: -1
    network_mode: host
```

**3. SR-IOV for RDMA:**
```bash
# Use SR-IOV virtual functions
docker run --device /sys/bus/pci/devices/0000:05:00.0 rdma-app

# Or with docker-compose
services:
  rdma:
    image: rdma-app
    devices:
      - /dev/vfio/vfio
    volumes:
      - /sys/bus/pci/devices:/sys/bus/pci/devices:ro
```

**4. NVIDIA GPUDirect RDMA:**
```bash
docker run --gpus all \
  --device /dev/infiniband/uverbs0 \
  --cap-add=IPC_LOCK \
  --ulimit memlock=-1 \
  nvidia/cuda:12.0-runtime
```

**Performance comparison:**
| Protocol | Latency | Throughput |
|----------|---------|------------|
| TCP (host) | 50μs | 10 Gbps |
| TCP (bridge) | 70μs | 9.5 Gbps |
| RDMA (host) | 1μs | 100 Gbps |
| RDMA (container) | 2μs | 100 Gbps |

**Use cases:**
- High-performance computing (HPC)
- Machine learning training with multi-GPU
- Distributed databases
- Financial trading systems

**Limitations:**
- Requires RDMA-capable hardware
- Linux only (no support on Mac/Windows)
- Complex setup and configuration
- Limited container portability

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q130. How do you implement immutable infrastructure with Docker?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Immutable infrastructure with Docker means never modifying running containers:**

**1. Principles:**
- Never `docker exec` into running containers to make changes
- Always build a new image for any change
- Use `docker commit` only for debugging, never production
- Treat containers as disposable

**2. Immutable deployment workflow:**
```bash
# Build new image (never modify running containers)
docker build -t myapp:${BUILD_NUMBER} .
docker push myapp:${BUILD_NUMBER}

# Deploy new version (replace, don't modify)
docker service update --image myapp:${BUILD_NUMBER} myapp_web

# Rollback if needed
docker service rollback myapp_web
```

**3. Configuration management:**
```yaml
# Inject config at runtime (not baked into image)
services:
  web:
    image: myapp:${BUILD_NUMBER}
    environment:
      - NODE_ENV=production
      - DB_HOST=db.internal
    configs:
      - source: app_config
        target: /app/config.json
    secrets:
      - db_password

configs:
  app_config:
    file: ./config/${ENV}/config.json
```

**4. Blue-green deployment:**
```bash
# Blue (current)
docker service create --name myapp-blue --replicas 3 myapp:v1

# Green (new)
docker service create --name myapp-green --replicas 3 myapp:v2

# Switch traffic
# (Update load balancer to point to green)

# Remove blue
docker service rm myapp-blue
```

**5. Canary deployment:**
```yaml
services:
  web:
    image: myapp:v2
    deploy:
      replicas: 1  # Start with 1 canary
  web-stable:
    image: myapp:v1
    deploy:
      replicas: 9  # Keep most on stable
```

**6. Read-only filesystem (enforce immutability):**
```yaml
services:
  web:
    image: myapp
    read_only: true
    tmpfs:
      - /tmp
      - /var/run
```

**7. Benefits:**
- **Reproducible deployments** — every deployment is identical
- **Predictable rollbacks** — rollback = deploy previous image
- **No configuration drift** — each deploy is a fresh start
- **Audit trail** — every version is a tagged image
- **Security** — harder for attackers to persist

**8. CI/CD for immutable infrastructure:**
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    steps:
      - uses: actions/checkout@v4
      - name: Build image
        run: docker build -t myapp:${{ github.sha }} .
      - name: Push to registry
        run: docker push myapp:${{ github.sha }}
      - name: Deploy
        run: docker service update --image myapp:${{ github.sha }} myapp_web
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q131. How do you debug Docker networking performance issues?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Systematic approach to debug Docker networking issues:**

**1. Baseline latency measurement:**
```bash
# Measure network latency from host
docker run --rm alpine ping -c 10 google.com

# Measure inter-container latency
docker run --network container:target --rm nicolaka/netshoot \
  ping -c 10 localhost

# Measure overlay latency
docker run --network overlay-net --rm alpine ping -c 10 other-service
```

**2. Check for packet loss:**
```bash
# Ping with statistics
docker run --rm alpine ping -c 100 -i 0.1 google.com

# Use mtr (traceroute + ping)
docker run --rm nicolaka/netshoot mtr google.com
```

**3. Bandwidth testing:**
```bash
# Start iperf server
docker run --rm -p 5201:5201 networkstatic/iperf3 -s

# Run client
docker run --rm networkstatic/iperf3 -c server-ip

# Test overlay network bandwidth
docker run --network overlay --rm networkstatic/iperf3 -c other-service
```

**4. DNS resolution issues:**
```bash
# Check DNS configuration
docker exec container_name cat /etc/resolv.conf

# Test DNS resolution time
docker exec container_name time nslookup service-name

# Check for DNS timeouts
docker exec container_name dig service-name +stats
```

**5. MTU issues (common cause of slowness):**
```bash
# Check interface MTU inside container
docker exec container_name ip link show eth0

# Overlay networks add 50 bytes overhead
# If host MTU is 1500, overlay MTU should be 1450
docker network create --driver overlay --opt com.docker.network.driver.mtu=1450 mynet
```

**6. TCP tuning:**
```bash
# Check TCP buffer sizes
docker exec container_name sysctl net.ipv4.tcp_rmem
docker exec container_name sysctl net.ipv4.tcp_wmem

# Enable TCP BBR congestion control
docker run --sysctl net.ipv4.tcp_congestion_control=bbr myapp
```

**7. Container to host bridge performance:**
```bash
# Test with and without bridge
# Host network
docker run --network host --rm alpine ping -c 10 localhost

# Bridge network
docker run --rm alpine ping -c 10 host.docker.internal
```

**8. Network profiling:**
```bash
# Use tcpdump to capture traffic
docker run --net container:target --rm nicolaka/netshoot \
  tcpdump -i any -w /tmp/traffic.pcap

# Use netstat to check for connection issues
docker exec container_name netstat -s
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q132. How do you implement Docker container capacity planning?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Capacity planning for Docker environments:**

**1. Resource profiling:**
```bash
# Monitor resource usage over time
docker stats --no-stream --format "{{.Name}},{{.CPUPerc}},{{.MemUsage}}"

# Long-term monitoring with Prometheus
# 1. Deploy Prometheus stack
# 2. Collect metrics over days/weeks
# 3. Analyze trends
```

**2. Memory planning:**
```bash
# Determine average memory per container
docker stats --no-stream | awk '{sum+=$4} END {print "Average:", sum/NR}'

# Formula:
# Total Memory = (Max memory per container × replicas) + (20% overhead) + (system reserve)

# Example: 512MB per container × 100 replicas + 20% + 2GB system = ~63.5GB
```

**3. CPU planning:**
```bash
# Determine average CPU per container
docker stats --no-stream | awk '{sum+=$3} END {print "Average:", sum/NR}'

# Formula:
# Total CPU = (Max CPU per container × replicas) + (25% headroom)

# Example: 0.5 CPU × 100 replicas + 25% = 62.5 CPU cores
```

**4. Disk space planning:**
```bash
# Check current Docker disk usage
docker system df

# Image storage: (average image size × number of versions) × 2
# Data volumes: estimate per-container data growth
# Logs: (average log rate × retention period × number of containers)
# Build cache: varies (prune regularly)
```

**5. Network bandwidth:**
```bash
# Estimate per-container bandwidth
# Total bandwidth = (peak throughput per container × replicas) × (1 + overhead)

# Example: 100Mbps × 100 replicas + 20% overhead = 12 Gbps
```

**6. Capacity planning formulas:**

| Resource | Formula | Example |
|----------|---------|---------|
| **Memory** | (max_mem × replicas) / 0.8 + 2GB | (512MB × 100) / 0.8 + 2GB = 66GB |
| **CPU** | (max_cpu × replicas) / 0.75 | (0.5 × 100) / 0.75 = 67 cores |
| **Disk (images)** | image_size × versions × 2 | 500MB × 20 × 2 = 20GB |
| **Disk (data)** | daily_growth × retention_days | 1GB × 30 = 30GB |
| **Disk (logs)** | log_rate × retention | 100MB × 30 = 3GB |
| **Network** | throughput × replicas × 1.2 | 100Mbps × 100 × 1.2 = 12Gbps |

**7. Scaling thresholds (what to monitor):**

| Metric | Warning | Critical |
|--------|---------|----------|
| CPU usage | 70% | 85% |
| Memory usage | 75% | 90% |
| Disk usage | 80% | 90% |
| Network bandwidth | 60% | 80% |
| Docker image count | - | Storage full |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q133. How do you implement cross-cluster Docker networking?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Cross-cluster Docker networking connects containers across different Docker clusters or cloud regions:**

**1. VXLAN/overlay across clusters:**
```bash
# Extend overlay network across clusters
# Requires direct network connectivity between nodes
docker network create --driver overlay \
  --subnet 10.0.0.0/16 \
  --gateway 10.0.0.1 \
  --opt encrypted=true \
  cross-cluster-net
```

**2. Service mesh (Istio/Linkerd):**
```yaml
# Istio service mesh connects services across clusters
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: cross-cluster-svc
spec:
  hosts:
  - svc.cluster-b.local
  addresses:
  - 240.0.0.1
  ports:
  - number: 8080
    name: http
    protocol: HTTP
  resolution: DNS
  endpoints:
  - address: cluster-b-svc.internal
```

**3. Consul Connect:**
```bash
# Service mesh with Consul
consul connect envoy -sidecar-for web

# Services communicate via sidecar proxies
# Cross-cluster traffic through WAN gossip
```

**4. Direct network peering:**
```bash
# AWS VPC Peering
aws ec2 create-vpc-peering-connection \
  --vpc-id vpc-a \
  --peer-vpc-id vpc-b \
  --peer-region us-west-2

# GCP VPC Network Peering
gcloud compute networks peerings create \
  --network vpc-a \
  --peer-network vpc-b
```

**5. VPN-based connectivity:**
```yaml
services:
  vpn-client:
    image: openvpn-client
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    networks:
      - local-net
      - cross-cluster

  app:
    networks:
      - local-net
    depends_on:
      - vpn-client
    network_mode: service:vpn-client
```

**6. DNS-based service discovery across clusters:**
```yaml
services:
  app:
    environment:
      - OTHER_CLUSTER_URL=http://svc.cluster-b.internal:8080
    dns:
      - 10.0.0.2  # Cross-cluster DNS server
    dns_search:
      - cluster-b.internal
```

**7. Docker Swarm federation (multi-cluster):**
```bash
# Not natively supported in Swarm
# Use Consul or etcd for service discovery across clusters
```

**8. Kubernetes federation (KubeFed):**
```yaml
apiVersion: types.kubefed.io/v1beta1
kind: FederatedDeployment
metadata:
  name: myapp
spec:
  template:
    spec:
      replicas: 3
  placement:
    clusters:
      - name: cluster-a
      - name: cluster-b
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q134. How do you implement Docker security scanning in CI/CD pipelines?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Comprehensive security scanning pipeline:**

**1. Pre-commit scanning:**
```yaml
# .gitleaks.toml — secret scanning
[[rules]]
  id = "docker-password"
  regex = '''(?i)(?:docker|registry).*(?:password|token|secret)\s*[:=]\s*.+'''
```

**2. Build-time scanning (Trivy):**
```yaml
# GitHub Actions
- name: Scan Docker image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'myapp:${{ github.sha }}'
    format: 'sarif'
    output: 'trivy-results.sarif'
    severity: 'CRITICAL,HIGH'
    exit-code: 1  # Fail build on critical/high
```

**3. Dockerfile linting (Hadolint):**
```yaml
- name: Lint Dockerfile
  uses: hadolint/hadolint-action@v3
  with:
    dockerfile: Dockerfile
    failure-threshold: warning
```

**4. Base image validation:**
```yaml
- name: Check base image
  run: |
    docker scout quickview myapp:${{ github.sha }}
    docker scout compare myapp:${{ github.sha }} \
      --to myapp:base-safe \
      --exit-code
```

**5. Registry scanning:**
```bash
# Continuous scanning (Harbor)
# Harbor automatically scans all images in the registry
# Generates reports and blocks unsafe images

# Docker Scout (Docker Hub)
# Enable "Vulnerability Scanning" in repository settings
```

**6. Runtime scanning (Falco):**
```yaml
services:
  falco:
    image: falcosecurity/falco
    privileged: true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /proc:/host/proc:ro
      - /etc:/host/etc:ro
    command:
      - --cri=/var/run/containerd/containerd.sock
```

**7. Compliance scanning (Docker Bench Security):**
```bash
docker run --rm --net host \
  -v /etc:/host/etc:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  docker/docker-bench-security
```

**8. Full pipeline integration:**
```yaml
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Secret scanning
        run: gitleaks detect --verbose
      - name: Dockerfile lint
        uses: hadolint/hadolint-action@v3
      - name: Build image
        run: docker build -t myapp:${{ github.sha }} .
      - name: Scan image
        run: |
          trivy image --exit-code 1 --severity CRITICAL myapp:${{ github.sha }}
          docker scout cves myapp:${{ github.sha }}
      - name: Sign image
        run: cosign sign --key cosign.key myapp:${{ github.sha }}
      - name: Push
        run: docker push myapp:${{ github.sha }}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q135. How do you implement Docker container networking with service meshes?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Service meshes add advanced networking capabilities to container deployments:**

**1. Istio architecture:**
```
┌─────────────────────────────────────────┐
│ Pod                                      │
│  ┌─────────┐    ┌──────────────────────┐ │
│  │ Service  │────▶  Envoy Sidecar      │ │
│  │ (app)    │    │ - Traffic management│ │
│  │          │    │ - Security (mTLS)   │ │
│  └─────────┘    │ - Observability     │ │
│                  └──────────────────────┘ │
└─────────────────────────────────────────┘
```

**2. Istio configuration:**
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp
spec:
  hosts:
  - myapp
  http:
  - match:
    - headers:
        env:
          exact: canary
    route:
    - destination:
        host: myapp
        subset: v2
      weight: 10
  - route:
    - destination:
        host: myapp
        subset: v1
      weight: 90
```

**3. Mutual TLS (mTLS) for container communication:**
```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
spec:
  mtls:
    mode: STRICT  # All traffic must be mTLS
```

**4. Traffic shifting (canary deployments):**
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp
spec:
  hosts:
  - myapp
  http:
  - route:
    - destination:
        host: myapp
        subset: v1
      weight: 90
    - destination:
        host: myapp
        subset: v2
      weight: 10
```

**5. Circuit breaking:**
```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: myapp
spec:
  host: myapp
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 10
        maxRequestsPerConnection: 10
    outlierDetection:
      consecutiveErrors: 5
      interval: 30s
      baseEjectionTime: 30s
```

**6. Observability:**
```yaml
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: mesh-default
spec:
  accessLogging:
  - providers:
    - name: envoy
```

**7. Linkerd (simpler alternative):**
```yaml
apiVersion: linkerd.io/v1alpha2
kind: ServiceProfile
metadata:
  name: myapp.default.svc.cluster.local
spec:
  routes:
  - name: GET /api/users
    condition:
      method: GET
      pathRegex: /api/users
    isRetryable: true
```

**Benefits of service mesh for containers:**
- **Zero-trust networking** with mTLS
- **Automatic retries and circuit breaking**
- **Traffic splitting** for canary deployments
- **Observability** with distributed tracing
- **Security policies** at the network level

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q136. How do you implement a Docker-based CI/CD pipeline with security gates?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Complete CI/CD pipeline with security gates:**

```yaml
# .github/workflows/deploy.yml
name: Build, Scan & Deploy
on:
  push:
    branches: [main]

jobs:
  security-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Gate 1: Secret scanning
      - name: Scan for secrets
        uses: zricethezav/gitleaks-action@v2

      # Gate 2: Dockerfile lint
      - name: Lint Dockerfile
        uses: hadolint/hadolint-action@v3
        with:
          dockerfile: Dockerfile

      # Gate 3: Build
      - name: Build image
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myapp:latest

      # Gate 4: Vulnerability scan
      - name: Scan for vulnerabilities
        id: scan
        run: |
          trivy image --exit-code 1 \
            --severity CRITICAL,HIGH \
            --ignore-unfixed \
            myapp:${{ github.sha }}

      # Gate 5: SBOM generation
      - name: Generate SBOM
        uses: anchore/sbom-action@v0
        with:
          image: myapp:${{ github.sha }}
          format: spdx-json

      # Gate 6: Sign image
      - name: Sign image
        run: |
          cosign sign --key env://COSIGN_KEY \
            myregistry/myapp:${{ github.sha }}

      # Gate 7: Push to registry
      - name: Push image
        run: |
          docker push myregistry/myapp:${{ github.sha }}
          docker push myregistry/myapp:latest

      # Gate 8: Deploy to staging
      - name: Deploy to staging
        run: |
          docker stack deploy -c docker-compose.staging.yml staging

      # Gate 9: Integration tests
      - name: Run integration tests
        run: |
          ./test/integration/run.sh staging

      # Gate 10: Deploy to production
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: |
          docker stack deploy -c docker-compose.prod.yml production

  # Report
  report:
    needs: security-gates
    steps:
      - name: Generate security report
        run: |
          docker scout cves myapp:${{ github.sha }} \
            --format sarif > report.sarif
      - name: Upload report
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: report.sarif
```

**Security gates flow:**
```
Commit → Secret Scan → Dockerfile Lint → Build
  → Vuln Scan → SBOM → Sign → Push
  → Deploy Staging → Integration Tests
  → Deploy Production
```

**Failure policies:**
| Gate | Failure Action |
|------|---------------|
| Secrets found | Block commit |
| Dockerfile warnings | Warning only |
| Critical CVEs | Block deployment |
| High CVEs | Block production deployment |
| Medium CVEs | Warning, allow deploy |
| SBOM missing | Warning |
| Signature missing | Block deployment |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q137. How do you implement Docker container autoscaling with custom metrics?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Custom metrics-based autoscaling for containers:**

**1. Prometheus metrics collection:**
```yaml
services:
  app:
    image: myapp
    ports:
      - "9090"  # Metrics endpoint

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - --config.file=/etc/prometheus/prometheus.yml
      - --web.enable-remote-write-receiver
```

**2. Application metrics (prometheus client):**
```javascript
// Node.js example
const prometheus = require('prom-client');

// Custom metric
const requestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  buckets: [0.1, 0.5, 1, 2, 5]
});

const queueDepth = new prometheus.Gauge({
  name: 'queue_depth',
  help: 'Current queue depth'
});
```

**3. Kubernetes HPA with custom metrics:**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Pods
      pods:
        metric:
          name: queue_depth
        target:
          type: AverageValue
          averageValue: "10"
    - type: Object
      object:
        metric:
          name: requests_per_second
        describedObject:
          apiVersion: networking.k8s.io/v1
          kind: Ingress
          name: myapp-ingress
        target:
          type: Value
          value: "1000"
```

**4. AWS ECS Service Auto Scaling:**
```json
{
  "targetTrackingScalingPolicyConfiguration": {
    "targetValue": 70.0,
    "predefinedMetricSpecification": {
      "predefinedMetricType": "ECSServiceAverageCPUUtilization"
    },
    "scaleInCooldown": 300,
    "scaleOutCooldown": 60
  }
}
```

**5. Docker Swarm with custom metrics (external trigger):**
```yaml
services:
  autoscaler:
    image: stalniy/docker-swarm-autoscaler
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - PROMETHEUS_URL=http://prometheus:9090
      - POLL_INTERVAL=30
      - TARGET_SERVICE=myapp_web
      - METRIC_NAME=queue_depth
      - TARGET_VALUE=10
      - MIN_REPLICAS=2
      - MAX_REPLICAS=20
```

**6. Custom autoscaler script:**
```bash
#!/bin/bash
# autoscale.sh

SERVICE="myapp_web"
MIN=2
MAX=20
TARGET_QUEUE=10

while true; do
  # Get current queue depth from Prometheus
  QUEUE=$(curl -s "http://prometheus:9090/api/v1/query" \
    --data-urlencode "query=avg(queue_depth)" | jq -r '.data.result[0].value[1]')

  # Get current replicas
  REPLICAS=$(docker service ls --filter name=$SERVICE \
    --format "{{.Replicas}}" | cut -d'/' -f1)

  if (( $(echo "$QUEUE > $TARGET_QUEUE" | bc -l) )); then
    NEW=$((REPLICAS + 1))
    [ $NEW -le $MAX ] && docker service scale $SERVICE=$NEW
  elif (( $(echo "$QUEUE < $TARGET_QUEUE * 0.5" | bc -l) )); then
    NEW=$((REPLICAS - 1))
    [ $NEW -ge $MIN ] && docker service scale $SERVICE=$NEW
  fi

  sleep 30
done
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q138. How do you implement Docker container network policies and segmentation?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Network segmentation for Docker containers:**

**1. Docker Swarm network segmentation:**
```yaml
services:
  # Public-facing service
  gateway:
    image: nginx
    ports:
      - "443:443"
    networks:
      - public

  # Internal API service
  api:
    image: myapi
    networks:
      - public     # Gateway can reach it
      - private    # Can reach database

  # Database — fully isolated
  db:
    image: postgres
    networks:
      - private    # Only API can reach it

  # Admin service — separate network
  admin:
    image: admin-ui
    networks:
      - admin_net

networks:
  public:
    driver: overlay
  private:
    driver: overlay
    internal: true  # No external access
  admin_net:
    driver: overlay
    internal: true
```

**2. Kubernetes NetworkPolicy:**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: gateway
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - ipBlock:
        cidr: 0.0.0.0/0
        except:
        - 10.0.0.0/8
        - 172.16.0.0/12
        - 192.168.0.0/16
    ports:
    - protocol: UDP
      port: 53  # DNS only
```

**3. Calico network policies:**
```yaml
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: security-policy
spec:
  selector: app == 'api'
  ingress:
    - action: Allow
      protocol: TCP
      source:
        selector: app == 'gateway'
      destination:
        ports:
          - 3000
    - action: Deny  # Deny all others
  egress:
    - action: Allow
      protocol: TCP
      destination:
        selector: app == 'database'
        ports:
          - 5432
    - action: Deny
```

**4. Micro-segmentation with service mesh (Istio):**
```yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: api-authz
spec:
  selector:
    matchLabels:
      app: api
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/gateway"]
    to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/api/*"]
```

**5. iptables-based isolation (advanced):**
```bash
# Block all inter-container traffic except specific ones
iptables -I FORWARD -i docker0 -o docker0 -j DROP
iptables -I FORWARD -i docker0 -o docker0 \
  -s container-a-ip -d container-b-ip -j ACCEPT
```

**6. Network segmentation principles:**
- **Least privilege**: Only allow necessary traffic
- **Defense in depth**: Firewall + network policies + service mesh
- **East-west security**: Control traffic between containers
- **Default deny**: Block all traffic, only allow explicitly

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q139. How do you implement Docker container backup with continuous data protection?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Continuous Data Protection (CDP) for Docker containers:**

**1. Continuous volume snapshots (using LVM):**
```bash
# Set up LVM thin provisioning
lvcreate -L 10G -T vg00/lvthin

# Create thin snapshot (instantaneous)
lvcreate -s vg00/lvthin --name snap-$(date +%s) -L 5G

# Backup snapshot
dd if=/dev/vg00/snap-$(date +%s) | gzip > /backup/vol-$(date +%s).img.gz

# Remove snapshot
lvremove vg00/snap-$(date +%s)
```

**2. Database WAL archiving (PostgreSQL):**
```yaml
services:
  db:
    image: postgres:16
    environment:
      - WAL_LEVEL=replica
      - ARCHIVE_MODE=on
      - ARCHIVE_COMMAND=cp %p /backups/wal/%f
    volumes:
      - pgdata:/var/lib/postgresql/data
      - wal_backup:/backups/wal

  wal_archive:
    image: amazon/aws-cli
    volumes:
      - wal_backup:/wal:ro
    command: |
      sh -c 'while true; do
        aws s3 sync /wal/ s3://myapp-db-backups/wal/
        sleep 60
      done'
```

**3. Continuous file replication (rsync):**
```bash
#!/bin/bash
# cdp-sync.sh — continuous file-level backup
SRC=/var/lib/docker/volumes/
DST=user@backup-server:/backups/

while true; do
  rsync -avz --delete \
    --exclude '*/tmp/*' \
    --exclude '*/cache/*' \
    -e "ssh -i /backup-key" \
    $SRC $DST
  sleep 300  # Every 5 minutes
done
```

**4. Application-level CDC (Change Data Capture):**
```javascript
// Node.js example — capture data changes
const { Client } = require('pg');
const client = new Client();

async function captureChanges() {
  await client.connect();
  await client.query('CREATE PUBLICATION mypub FOR ALL TABLES');
  
  client.on('notification', (msg) => {
    // Stream changes to backup
    backupStream.write(msg.payload);
  });

  await client.query('LISTEN data_changes');
}
```

**5. Docker volume replication (Raft-based):**
```bash
# Use REX-Ray or Portworx for volume replication
docker volume create --driver rexray --opt size=10 \
  --opt replication=3 myvolume
```

**6. Kubernetes Velero for continuous backup:**
```yaml
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-backup
spec:
  schedule: "0 */4 * * *"  # Every 4 hours
  template:
    includedNamespaces:
    - production
    ttl: 720h  # 30 days retention
```

**7. Backup verification strategy:**
```bash
#!/bin/bash
# Verify backups by restoring to test environment
docker compose -f docker-compose.test.yml up -d
docker exec test-db pg_restore -U postgres -d testdb /backups/latest.dump
docker compose run --rm test-api npm test
docker compose down
```

**8. RPO/RTO targets:**

| Tier | RPO | RTO | Method |
|------|-----|-----|--------|
| Platinum | < 1s | < 1min | Database replication + CDP |
| Gold | < 5min | < 15min | WAL archiving + volume snapshots |
| Silver | < 1h | < 1h | Periodic backups + WAL |
| Bronze | < 24h | < 4h | Daily full backups |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q140. How do you implement canary deployments with Docker?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Canary deployments with Docker gradually roll out new versions to a subset of users:**

**1. Weighted routing with Nginx:**
```nginx
upstream myapp {
    server myapp-v1:3000 weight=90;  # 90% of traffic
    server myapp-v2:3000 weight=10;  # 10% of traffic (canary)
}
```

**2. Docker Swarm canary deployment:**
```yaml
services:
  # Current stable version
  web-stable:
    image: myapp:v1
    deploy:
      replicas: 9
      endpoint_mode: dnsrr  # Direct DNS resolution

  # Canary version
  web-canary:
    image: myapp:v2
    deploy:
      replicas: 1  # Start small
      endpoint_mode: dnsrr
```

**3. Load balancer routing (Traefik):**
```yaml
services:
  web-stable:
    image: myapp:v1
    labels:
      - "traefik.http.routers.web.rule=Host(`myapp.com`)"
      - "traefik.http.routers.web.service=web-stable"

  web-canary:
    image: myapp:v2
    labels:
      - "traefik.http.routers.canary.rule=Host(`myapp.com`) && Header(`X-Canary`, `true`)"
      - "traefik.http.routers.canary.service=web-canary"
```

**4. Istio canary deployment:**
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp
spec:
  hosts:
  - myapp
  http:
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: myapp
        subset: v2
  - route:
    - destination:
        host: myapp
        subset: v1
      weight: 100
```

**5. Header/cookie-based canary:**
```yaml
services:
  web-canary:
    image: myapp:v2
    labels:
      - "traefik.http.routers.canary.rule=Host(`myapp.com`) && Cookie(`canary`, `true`)"
```

**6. Canary automation script:**
```bash
#!/bin/bash
# canary-deploy.sh

VERSION=$1
SERVICE="myapp"

# Deploy canary with 1 replica
docker service create --name ${SERVICE}-canary \
  --replicas 1 \
  --network mynet \
  --label canary=true \
  myapp:$VERSION

# Monitor for 10 minutes
sleep 600

# Check error rate
ERRORS=$(docker service logs ${SERVICE}-canary \
  --since 10m | grep "ERROR" | wc -l)

if [ $ERRORS -gt 10 ]; then
  echo "Canary failed! Rolling back..."
  docker service rm ${SERVICE}-canary
  exit 1
fi

# Promote canary
docker service update --image myapp:$VERSION ${SERVICE}
docker service rm ${SERVICE}-canary
```

**7. Automated canary analysis:**
```yaml
# Flagger (Kubernetes)
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: myapp
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  service:
    port: 80
  canaryAnalysis:
    interval: 1m
    threshold: 5
    maxWeight: 50
    stepWeight: 10
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99
      interval: 1m
    - name: request-duration
      thresholdRange:
        max: 500
      interval: 30s
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q141. How do you implement Docker container compliance (SOC2, HIPAA, PCI-DSS)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Compliance requirements for Docker containers:**

**1. SOC2 compliance:**
```yaml
services:
  app:
    image: myapp
    # Access control
    user: "1000:1000"
    # Encryption in transit
    labels:
      - "traefik.http.routers.app.tls=true"
    # Logging
    logging:
      driver: "awslogs"
      options:
        awslogs-group: "myapp-logs"
        awslogs-region: "us-east-1"
    # Resource limits
    deploy:
      resources:
        limits:
          memory: 512M
```

**2. HIPAA compliance:**
```yaml
services:
  app:
    image: myapp
    # Encryption at rest
    volumes:
      - encrypted-data:/app/data
    
    # Encryption in transit
    networks:
      - secure-net
    
    # Audit logging
    environment:
      - AUDIT_LOG_LEVEL=info
      - PHI_LOG_ENABLED=true
    
    # Access controls
    user: "1000:1000"
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100M

volumes:
  encrypted-data:
    driver: local
    driver_opts:
      type: "crypt"
      device: "/dev/mapper/encrypted"

networks:
  secure-net:
    driver: overlay
    options:
      encrypted: "true"
```

**3. PCI-DSS compliance:**
```json
// /etc/docker/daemon.json
{
  "icc": false,
  "log-driver": "syslog",
  "log-opts": {
    "syslog-address": "tcp://logs.example.com:514"
  },
  "userns-remap": "default",
  "live-restore": true,
  "userland-proxy": false,
  "iptables": true,
  "ip-forward": true,
  "ip-masq": true,
  "storage-driver": "overlay2"
}
```

**4. Docker Bench Security (compliance scanning):**
```bash
# Run compliance check
docker run --rm --net host \
  -v /etc:/host/etc:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  docker/docker-bench-security

# Output categories:
# [PASS] 1.1 - Ensure container host is secure
# [WARN] 2.1 - Ensure network is secure
# [NOTE] 3.2 - Ensure logging is configured
```

**5. Container compliance checklist:**

| Requirement | Implementation | Standard |
|-------------|---------------|----------|
| **Access control** | Non-root user, `--cap-drop ALL` | All |
| **Encryption in transit** | TLS/mTLS for all traffic | All |
| **Encryption at rest** | Encrypted volumes | HIPAA, PCI |
| **Audit logging** | Centralized log collection | SOC2, HIPAA |
| **Vulnerability scanning** | Trivy, Docker Scout | All |
| **Image signing** | Cosign, Notary | SOC2, PCI |
| **Network segmentation** | Internal networks, firewalls | All |
| **Resource limits** | CPU/memory limits | All |
| **Secrets management** | Docker secrets, vault | All |
| **Backup and recovery** | Regular backups, DR plan | All |
| **Change management** | Immutable deployments | SOC2 |
| **Incident response** | Monitoring, alerting | All |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q142. How do you implement Docker container autoscaling with predictive scaling?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Predictive autoscaling anticipates traffic patterns before they happen:**

**1. Time-based scaling (scheduled):**
```bash
#!/bin/bash
# scale-schedule.sh

# Scale up before peak hours
case $(date +%H) in
  08|09|10|11|12|13|14|15|16|17)
    docker service scale myapp=10
    ;;
  18|19|20)
    docker service scale myapp=8
    ;;
  *)
    docker service scale myapp=3  # Off-peak
    ;;
esac
```

**2. KEDA (Kubernetes Event-Driven Autoscaling):**
```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: predictive-scaler
spec:
  scaleTargetRef:
    name: myapp
  minReplicaCount: 2
  maxReplicaCount: 20
  triggers:
  - type: cron
    metadata:
      timezone: America/New_York
      start: 0 8 * * 1-5   # Weekdays at 8 AM
      end: 0 18 * * 1-5    # Weekdays at 6 PM
      desiredReplicas: "10"
  - type: prometheus
    metadata:
      serverAddress: http://prometheus:9090
      metricName: http_requests_per_second
      threshold: "1000"
```

**3. Predictive model (ML-based):**
```python
# predictor.py — simple time-series prediction
import numpy as np
from sklearn.linear_model import LinearRegression

def predict_traffic(last_7_days):
    """Predict tomorrow's traffic based on last 7 days"""
    X = np.array(range(7)).reshape(-1, 1)
    y = np.array(last_7_days)
    
    model = LinearRegression()
    model.fit(X, y)
    
    return model.predict([[7], [8], [9]])  # Next 3 hours
```

**4. AWS Auto Scaling with predictive scaling:**
```json
{
  "TargetTrackingScalingPolicyConfiguration": {
    "TargetValue": 70.0,
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ECSServiceAverageCPUUtilization"
    },
    "ScaleOutCooldown": 60,
    "ScaleInCooldown": 300
  },
  "PredictiveScalingConfiguration": {
    "MetricSpecifications": [{
      "TargetValue": 70.0,
      "PredefinedLoadMetricSpecification": {
        "PredefinedMetricType": "ASGTotalCPUUtilization"
      }
    }],
    "Mode": "ForecastAndScale",
    "SchedulingBufferTime": 300,
    "MaxCapacityBreachBehavior": "IncreaseMaxCapacity",
    "MaxCapacityBuffer": 10
  }
}
```

**5. Docker Swarm with predictive scaling:**
```bash
#!/bin/bash
# predictive-autoscale.sh

PREDICTED_TRAFFIC=$(curl -s http://ml-service:5000/predict)
CURRENT_REPLICAS=$(docker service ls --filter name=myapp \
  --format "{{.Replicas}}" | cut -d'/' -f1)

# Scale based on prediction
if [ "$PREDICTED_TRAFFIC" -gt 1000 ]; then
  TARGET=20
elif [ "$PREDICTED_TRAFFIC" -gt 500 ]; then
  TARGET=10
else
  TARGET=3
fi

# Gradual scaling to avoid oscillation
if [ "$TARGET" -gt "$CURRENT_REPLICAS" ]; then
  docker service scale myapp=$TARGET
fi
```

**6. Metrics for predictive scaling:**
```yaml
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - --storage.tsdb.retention.time=30d  # Keep 30 days for ML

  prophet-scaler:
    image: myapp/prophet-scaler
    environment:
      - PROMETHEUS_URL=http://prometheus:9090
      - SERVICE=myapp_web
      - LOOKBACK_DAYS=30
      - FORECAST_HOURS=2
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q143. How do you implement Docker container disaster recovery across regions?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Multi-region disaster recovery for Docker containers:**

**1. Active-Passive (hot standby):**
```
Region A (Active)          Region B (Passive)
┌────────────────────┐     ┌────────────────────┐
│ Docker Swarm       │     │ Docker Swarm       │
│  web: replicas 5   │     │  web: replicas 0   │
│  db: primary       │◄───►│  db: replica       │
│  redis: active     │     │  redis: standby    │
└────────────────────┘     └────────────────────┘
        │                          │
        └────────── DNS ──────────┘
                   │
              Traffic Router
```

```yaml
# docker-compose.dr.yml
services:
  db:
    image: postgres:16
    environment:
      - REPLICATION_SLOT=dr_slot
      - PRIMARY_CONNINFO=host=region-a-db user=replicator
    volumes:
      - dbdata:/var/lib/postgresql/data
volumes:
  dbdata:
```

**2. Active-Active (multi-primary):**
```yaml
services:
  app:
    image: myapp
    deploy:
      replicas: 5
      placement:
        constraints:
          - node.labels.region == us-east
    environment:
      - REGION=us-east
      - DB_URL=postgres://user:pass@local-db:5432/mydb

  app-eu:
    image: myapp
    deploy:
      replicas: 3
      placement:
        constraints:
          - node.labels.region == eu-west
    environment:
      - REGION=eu-west
      - DB_URL=postgres://user:pass@local-db:5432/mydb
```

**3. Data replication strategies:**
```yaml
services:
  # Synchronous replication (strong consistency, higher latency)
  db-sync:
    image: postgres:16
    command: |
      postgres -c synchronous_commit=on
                -c synchronous_standby_names='*'

  # Asynchronous replication (eventual consistency, lower latency)
  db-async:
    image: postgres:16
    command: |
      postgres -c synchronous_commit=local
                -c wal_sender_timeout=60s
```

**4. DNS failover (Route53):**
```json
{
  "Name": "app.example.com",
  "Type": "A",
  "SetIdentifier": "primary",
  "Failover": "PRIMARY",
  "HealthCheckId": "abc123",
  "AliasTarget": {
    "DNSName": "region-a-load-balancer.amazonaws.com",
    "EvaluateTargetHealth": true
  }
}
```

**5. Automated DR failover:**
```bash
#!/bin/bash
# dr-failover.sh

REGION_A="us-east-1"
REGION_B="us-west-2"
HEALTH_URL="http://app.example.com/health"

# Check primary health
if ! curl -f -s $HEALTH_URL; then
  echo "Primary region unhealthy! Initiating failover..."

  # 1. Promote DR database
  ssh dr-host "docker exec db pg_ctl promote"

  # 2. Scale up DR services
  ssh dr-host "docker service scale web=5"

  # 3. Update DNS
  aws route53 change-resource-record-sets \
    --hosted-zone-id ZONE_ID \
    --change-batch '{
      "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "app.example.com",
          "Type": "A",
          "Failover": "PRIMARY",
          "AliasTarget": {
            "DNSName": "region-b-lb.amazonaws.com"
          }
        }
      }]
    }'

  # 4. Notify team
  curl -X POST -H "Content-Type: application/json" \
    -d '{"text":"DR failover initiated to region B"}' \
    $SLACK_WEBHOOK_URL
fi
```

**6. DR testing schedule:**
```bash
# Regular DR testing
#!/bin/bash
# dr-test.sh

echo "Starting DR test..."
docker service scale web=0  # Simulate failure
sleep 30

# Verify failover
if curl -f http://dr-region.example.com/health; then
  echo "DR test PASSED"
else
  echo "DR test FAILED"
  exit 1
fi

# Restore
docker service scale web=5
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q144. How do you implement eBPF-based monitoring for Docker containers?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**eBPF provides deep observability into Docker containers without modifying the application:**

**1. eBPF basics:**
- eBPF programs run in the Linux kernel
- Can observe system calls, network packets, file operations
- No application changes needed
- Low overhead (microseconds per event)

**2. Cilium (eBPF-based networking and observability):**
```yaml
services:
  cilium:
    image: cilium/cilium:latest
    command: cilium-agent
    volumes:
      - /sys/fs/cgroup:/sys/fs/cgroup:ro
      - /var/run/docker.sock:/var/run/docker.sock
    cap_add:
      - SYS_ADMIN
      - NET_ADMIN
    environment:
      - DOCKER_HOST=unix:///var/run/docker.sock
```

**3. Pixie (eBPF-based Kubernetes observability):**
```yaml
# Install Pixie
helm install pixie pixie-operator/pixie \
  --set deployKey=px-api-key \
  --set clusterName=docker-cluster
```

**4. Tracee (eBPF-based runtime security):**
```bash
# Monitor container behavior
docker run --name tracee \
  --privileged \
  --pid=host \
  -v /lib/modules:/lib/modules:ro \
  -v /sys/kernel/security:/sys/kernel/security:ro \
  -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/tracee:latest \
  --events syscall_write,syscall_execve
```

**5. Custom eBPF program for container monitoring:**
```c
// container-monitor.c — eBPF program
SEC("tracepoint/syscalls/sys_enter_open")
int trace_open(struct trace_event_raw_sys_enter *ctx) {
    char comm[TASK_COMM_LEN];
    u32 pid = bpf_get_current_pid_tgid() >> 32;
    
    bpf_get_current_comm(comm, sizeof(comm));
    
    // Log file opens from container
    bpf_printk("Container PID %d opened file: %s\n", pid, comm);
    
    return 0;
}
```

**6. Falco with eBPF probe:**
```yaml
services:
  falco:
    image: falcosecurity/falco:latest
    driver: ebpf  # Use eBPF instead of kernel module
    privileged: true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - FALCO_BPF_PROBE=/sys/fs/bpf/falco
```

**7. Metrics from eBPF:**
```bash
# Container network metrics (Cilium)
cilium metrics list
# cilium_forward_count_total
# cilium_drop_count_total
# cilium_identity_count

# Container syscall metrics
docker run --rm -it \
  -v /sys/kernel/debug:/sys/kernel/debug:rw \
  iovisor/bpftrace:latest \
  -e 'tracepoint:syscalls:sys_enter_* /pid == $1/ { @[probe] = count(); }'
```

**8. Benefits of eBPF monitoring:**
- **No instrumentation needed** — works with any container
- **Low overhead** — typically < 1% CPU
- **Kernel-level visibility** — can't be bypassed by application
- **Real-time events** — microsecond latency
- **Security** — detect suspicious behavior immediately

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q145. How do you implement Docker container security with SELinux/AppArmor?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Mandatory Access Control (MAC) for Docker containers:**

**1. SELinux (Security-Enhanced Linux):**
```bash
# Check SELinux status
getenforce
# Enforcing

# Set SELinux context for container
docker run --security-opt label=type:container_t myapp

# SELinux profiles for Docker
# container_t — default container type
# container_net_t — network access only
# container_ro_t — read-only filesystem

# Enable SELinux in Docker
docker run --security-opt label:disable myapp  # Disable SELinux for container

# Custom SELinux policy
docker run --security-opt label=type:myapp_t myapp
```

**2. AppArmor profiles:**
```bash
# Load a custom AppArmor profile
apparmor_parser -r -W /etc/apparmor.d/docker-myapp

# Use the profile
docker run --security-opt apparmor=docker-myapp myapp
```

**AppArmor profile example:**
```
#include <tunables/global>

profile docker-myapp flags=(attach_disconnected,mediate_deleted) {
  #include <abstractions/base>
  #include <abstractions/nameservice>

  # Deny all networking except specific ports
  network inet tcp,
  
  # Allow access to specific paths
  /app/** r,
  /app/config.json r,
  /app/data/** rw,
  
  # Deny system admin
  deny /sbin/** ix,
  deny /usr/sbin/** ix,
  
  # Deny kernel module access
  deny /sys/module/** r,
  
  # Capability denials
  deny capability sys_admin,
  deny capability sys_module,
  deny capability sys_ptrace,
}
```

**3. Seccomp (secure computing mode):**
```bash
# Use default Docker seccomp profile
docker run --security-opt seccomp=default myapp

# Use custom profile
docker run --security-opt seccomp=/path/to/profile.json myapp
```

**Seccomp profile example:**
```json
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    {
      "names": ["read", "write", "open", "close", "stat", "mmap", "brk"],
      "action": "SCMP_ACT_ALLOW"
    },
    {
      "names": ["clone", "fork", "vfork"],
      "action": "SCMP_ACT_ALLOW",
      "args": [],
      "comment": "Process creation"
    },
    {
      "names": ["mount", "umount2", "swapon"],
      "action": "SCMP_ACT_ERRNO",
      "comment": "Block filesystem operations"
    }
  ]
}
```

**4. Combining security mechanisms:**
```bash
docker run \
  --security-opt seccomp=/path/to/seccomp.json \
  --security-opt apparmor=docker-myapp \
  --security-opt label=type:container_t \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  --read-only \
  myapp
```

**5. Security levels comparison:**
| Mechanism | Protection | Performance | Complexity |
|-----------|------------|-------------|------------|
| **Default** | Basic | 0% overhead | None |
| **Capabilities** | Good | < 1% | Low |
| **Seccomp** | Good | < 1% | Medium |
| **AppArmor** | Very good | < 1% | High |
| **SELinux** | Very good | < 2% | Very high |
| **Combined** | Excellent | < 3% | Expert |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q146. How do you implement Docker container migration to Kubernetes?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Migrating from Docker Compose/Swarm to Kubernetes:**

**1. Kompose (Compose to K8s converter):**
```bash
# Install kompose
curl -L https://github.com/kubernetes/kompose/releases/latest/download/kompose-linux-amd64 -o kompose
chmod +x ./kompose

# Convert docker-compose.yml to K8s manifests
kompose convert -f docker-compose.yml

# Creates:
# - myapp-deployment.yaml
# - myapp-service.yaml
# - db-deployment.yaml
# - db-service.yaml
# - myapp-networkpolicy.yaml
```

**2. Docker Compose → Kubernetes migration:**
```yaml
# docker-compose.yml (source)
services:
  web:
    image: myapp:1.0
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    volumes:
      - app-data:/app/data
    depends_on:
      - db

  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  app-data:
  db-data:
```

```yaml
# deployment.yaml (target)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: myapp:1.0
        ports:
        - containerPort: 80
        env:
        - name: NODE_ENV
          value: "production"
        volumeMounts:
        - name: app-data
          mountPath: /app/data
      volumes:
      - name: app-data
        persistentVolumeClaim:
          claimName: app-data-pvc
```

**3. Migration considerations:**

| Docker Concept | Kubernetes Equivalent |
|---------------|----------------------|
| `docker run` | `kubectl run` / Deployment |
| `docker compose up` | `kubectl apply -f manifests/` |
| Docker network | NetworkPolicy + Service |
| Docker volume | PersistentVolume + PersistentVolumeClaim |
| Docker secret | Secret (base64 encoded) |
| Docker Compose depends_on | initContainers + readiness probes |
| Docker healthcheck | livenessProbe + readinessProbe |
| Docker restart policy | restartPolicy (Always, OnFailure, Never) |
| Docker Swarm | Deployment + Service + Ingress |

**4. Migration steps:**
```bash
# 1. Convert Compose to K8s
kompose convert -f docker-compose.yml -o k8s/

# 2. Review and adjust manifests
vim k8s/web-deployment.yaml
# Add: livenessProbe, readinessProbe, resource limits

# 3. Create namespace
kubectl create namespace myapp

# 4. Apply manifests
kubectl apply -f k8s/ -n myapp

# 5. Verify deployment
kubectl get pods -n myapp
kubectl get services -n myapp
kubectl get ingress -n myapp
```

**5. Common migration challenges:**
- **Networking**: Docker's bridge network → Kubernetes Services
- **Storage**: Named volumes → PersistentVolumeClaims
- **Configuration**: Environment files → ConfigMaps
- **Secrets**: Docker secrets → Kubernetes Secrets
- **Service discovery**: Docker DNS → Kubernetes DNS (service.namespace.svc.cluster.local)
- **Scaling**: `docker service scale` → `kubectl scale deployment`

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q147. How do you implement Docker container cost optimization at scale?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Cost optimization strategies for Docker containers at scale:**

**1. Right-sizing containers:**
```bash
# Profile CPU and memory usage over time
docker stats --no-stream --format "{{.Name}},{{.CPUPerc}},{{.MemUsage}}"

# Example: resize based on actual usage
# Before: --cpus 2 --memory 2G (over-provisioned)
# After:  --cpus 0.5 --memory 512M (actual usage)
```

**2. Resource utilization targets:**
| Resource | Current | Target | Savings |
|----------|---------|--------|---------|
| CPU average | 15% | 60-70% | Reduce by 75% |
| Memory average | 30% | 70-80% | Reduce by 60% |

**3. Image optimization for cost:**
```bash
# Smaller images = faster deploy = lower cost
# Before: ~900MB (node:18)
# After: ~120MB (node:18-alpine + multi-stage)
# Savings: 86% storage cost

# Remove unused images
docker image prune -a -f
```

**4. Spot/preemptible instances:**
```yaml
services:
  worker:
    image: myworker
    deploy:
      replicas: 10
      resources:
        limits:
          memory: 1G

# Run on spot instances (low priority)
docker node update --label-add spot=true spot-node-1
docker service update --constraint-add node.labels.spot==true myapp_worker
```

**5. Autoscaling for cost:**
```yaml
services:
  web:
    image: myapp
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
    # Scale down during off-peak
    # Scale up based on demand
```

**6. Cost monitoring:**
```bash
# Docker resource cost estimates
#!/bin/bash
# cost-calculator.sh

for container in $(docker ps --format "{{.Names}}"); do
  CPU=$(docker stats --no-stream --format "{{.CPUPerc}}" $container | sed 's/%//')
  MEM=$(docker stats --no-stream --format "{{.MemUsage}}" $container | cut -d' ' -f1)
  
  # Convert to GB
  MEM_GB=$(echo "$MEM" | grep -oP '\d+\.?\d*(?=GiB|MiB)')
  
  # Cost estimate ($0.10/hour for 1 CPU + 1GB)
  COST=$(echo "scale=4; ($CPU / 100 * 0.05 + $MEM_GB * 0.05) * 730" | bc)
  
  echo "$container: CPU=$CPU% MEM=$MEM_GB GB Monthly cost=\$$COST"
done
```

**7. Infrastructure cost optimization:**
```yaml
# Use reserved instances for baseline capacity
# Use spot instances for burst capacity
services:
  web:
    image: myapp
    deploy:
      replicas: 5  # Baseline: reserved instances
      resources:
        limits:
          memory: 512M

  web-burst:
    image: myapp
    deploy:
      replicas: 0  # Start at 0, scale when needed
      placement:
        constraints:
          - node.labels.type == spot
```

**8. Cost optimization checklist:**
- [ ] Use smaller base images (Alpine, distroless)
- [ ] Remove unused images and volumes
- [ ] Right-size container resources
- [ ] Use autoscaling for variable workloads
- [ ] Implement spot/preemptible instances
- [ ] Monitor idle resources
- [ ] Use multi-stage builds
- [ ] Implement HPA with custom metrics
- [ ] Use container lifecycle management

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q148. How do you implement Docker container tracing with OpenTelemetry?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Distributed tracing for Docker containers with OpenTelemetry:**

**1. OpenTelemetry Collector:**
```yaml
services:
  otel-collector:
    image: otel/opentelemetry-collector:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "4317:4317"  # OTLP gRPC
      - "4318:4318"  # OTLP HTTP
```

**2. Application instrumentation (Node.js):**
```javascript
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');

const provider = new NodeTracerProvider();
provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new OTLPTraceExporter({
      url: 'http://otel-collector:4317',
    })
  )
);
provider.register();

// Now all HTTP requests, database calls are automatically traced
```

**3. Jaeger for trace visualization:**
```yaml
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"  # UI
      - "14250:14250"  # gRPC
    environment:
      - COLLECTOR_OTLP_ENABLED=true
```

**4. Sidecar pattern for tracing:**
```yaml
services:
  app:
    image: myapp
    ports:
      - "3000:3000"

  envoy:
    image: envoyproxy/envoy:v1.28
    network_mode: "service:app"
    volumes:
      - ./envoy.yaml:/etc/envoy/envoy.yaml
    # Envoy automatically adds trace context
```

**5. Trace context propagation:**
```yaml
# Trace context flows through service calls
# HTTP headers:
# - traceparent: 00-abc123...-def456...-01
# - tracestate: vendor=value

services:
  app:
    image: myapp
    environment:
      - OTEL_SERVICE_NAME=myapp
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
      - OTEL_TRACES_SAMPLER=parentbased_traceidratio
      - OTEL_TRACES_SAMPLER_ARG=0.1  # Sample 10% of traces
```

**6. Docker Compose with full tracing:**
```yaml
services:
  # Frontend service
  frontend:
    image: myapp-frontend
    environment:
      - OTEL_SERVICE_NAME=frontend
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317

  # Backend service
  backend:
    image: myapp-backend
    environment:
      - OTEL_SERVICE_NAME=backend
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317

  # Database
  db:
    image: postgres:16
    # Database tracing via PostgreSQL extension

  # Tracing infrastructure
  otel-collector:
    image: otel/opentelemetry-collector:latest
  
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
```

**7. Viewing traces:**
```bash
# Access Jaeger UI at http://localhost:16686
# Select service: myapp
# Select operation: any
# Click "Find Traces"

# You'll see:
# [myapp] - GET /api/users - 245ms
#  ├── [myapp] - middleware:auth - 10ms
#  ├── [backend] - GET /users - 100ms
#  │   └── [db] - SELECT FROM users - 80ms
#  └── [cache] - GET user:cache - 5ms
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q149. How do you implement Docker container observability with OpenTelemetry?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Complete observability with OpenTelemetry provides metrics, traces, and logs:**

**1. OpenTelemetry Collector configuration:**
```yaml
# otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  
  docker_stats:
    endpoint: unix:///var/run/docker.sock
    collection_interval: 30s
    metrics:
      container.cpu.usage:
        enabled: true
      container.memory.usage:
        enabled: true

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024
  
  attributes:
    actions:
      - key: environment
        value: production
        action: insert

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
  
  otlp:
    endpoint: jaeger:14250
  
  logging:
    loglevel: info

service:
  pipelines:
    metrics:
      receivers: [otlp, docker_stats]
      processors: [batch, attributes]
      exporters: [prometheus, logging]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp, logging]
```

**2. Prometheus for metrics:**
```yaml
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - --config.file=/etc/prometheus/prometheus.yml
      - --storage.tsdb.retention.time=30d
```

**3. Grafana for visualization:**
```yaml
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana-dashboards:/etc/grafana/provisioning/dashboards
```

**4. Loki for logs:**
```yaml
services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yaml:/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/log:/var/log:ro
      - ./promtail-config.yaml:/etc/promtail/config.yaml
```

**5. Docker Compose with full observability stack:**
```yaml
services:
  app:
    image: myapp
    logging:
      driver: loki
      options:
        loki-url: http://loki:3100/loki/api/v1/push

  # Metrics
  prometheus:
    image: prom/prometheus
  
  # Traces
  otel-collector:
    image: otel/opentelemetry-collector
  
  # Logs
  loki:
    image: grafana/loki
  promtail:
    image: grafana/promtail
  
  # Visualization
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
```

**6. Application metrics instrumentation:**
```javascript
const { metrics } = require('@opentelemetry/api');
const meter = metrics.getMeter('myapp');

const requestCount = meter.createCounter('http_requests_total', {
  description: 'Total HTTP requests'
});

const requestDuration = meter.createHistogram('http_request_duration_ms', {
  description: 'HTTP request duration in ms',
  unit: 'ms'
});

// Usage in middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    requestCount.add(1, { method: req.method, path: req.path });
    requestDuration.record(Date.now() - start, {
      method: req.method,
      status: res.statusCode
    });
  });
  next();
});
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q150. How do you implement Docker container governance and policy as code?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Container governance with policy-as-code enforces rules across the organization:**

**1. Open Policy Agent (OPA) for Docker:**
```rego
# docker-policy.rego
package docker.authz

# Deny running images from untrusted registries
deny[msg] {
    input.Image != ""
    not startswith(input.Image, "myregistry.com/")
    not startswith(input.Image, "docker.io/library/")
    msg = sprintf("Image '%s' not from approved registry", [input.Image])
}

# Deny privileged containers
deny[msg] {
    input.Privileged == true
    msg = "Privileged containers are not allowed"
}

# Deny mounting host paths
deny[msg] {
    input.Binds[_] == "/var/run/docker.sock:/var/run/docker.sock"
    msg = "Mounting Docker socket is not allowed"
}

# Require resource limits
deny[msg] {
    input.Memory == 0
    msg = "Memory limit is required"
}

# Allow by default
allow {
    not deny[_]
}
```

**2. OPA with Docker authorization plugin:**
```bash
# Configure Docker to use OPA
# /etc/docker/daemon.json
{
  "authorization-plugins": ["openpolicyagent/opa-docker-authz"]
}

# Run OPA
docker run -d --name opa \
  -v /path/to/policy:/policy \
  -p 8181:8181 \
  openpolicyagent/opa run --server /policy
```

**3. Kyverno (Kubernetes policy engine):**
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-labels
spec:
  validationFailureAction: Enforce
  rules:
  - name: check-required-labels
    match:
      resources:
        kinds:
        - Pod
    validate:
      message: "All containers must have 'app.kubernetes.io/name' label"
      pattern:
        metadata:
          labels:
            app.kubernetes.io/name: "?*"
```

**4. Conftest (policy testing with OPA):**
```bash
# Test Docker Compose files
conftest test docker-compose.yml \
  --policy policy/ \
  --all-namespaces

# Test Kubernetes manifests
conftest test deployment.yaml \
  --policy k8s-policies/ \
  --namespace kubernetes
```

**5. Policy categories:**
```rego
# Security policies
package security

# No privileged containers
deny[msg] {
    input.securityContext.privileged
    msg = "Privileged containers prohibited"
}

# No host network
deny[msg] {
    input.hostNetwork
    msg = "Host network prohibited"
}

# Resource policies
package resources

# Require limits
deny[msg] {
    not input.resources.limits
    msg = "Resource limits required"
}

# Compliance policies
package compliance

# Require health checks
deny[msg] {
    not input.livenessProbe
    msg = "Liveness probe required"
}
```

**6. Policy enforcement in CI/CD:**
```yaml
# GitHub Actions
- name: Policy check
  run: |
    # Test Dockerfile
    conftest test Dockerfile --policy ops/docker-policies/
    
    # Test Compose file
    conftest test docker-compose.yml --policy ops/compose-policies/
    
    # Test K8s manifests
    conftest test k8s/*.yaml --policy ops/k8s-policies/
```

**7. Policy audit and reporting:**
```bash
# Audit all running containers
for container in $(docker ps --format "{{.Names}}"); do
  echo "Checking: $container"
  docker inspect $container | conftest test - --policy policies/
done
```

**8. Policy as code benefits:**
- **Automated enforcement** — catch violations before deployment
- **Consistent rules** — same policies across all teams
- **Audit trail** — know who violated what
- **Shift left** — catch issues in CI/CD, not production
- **Self-service** — teams can preview policy impact

</div>
</details>

> **🎯 Quick Summary:** These 150+ questions cover Docker fundamentals, images, containers, Dockerfiles, volumes, networking, Compose, Swarm, security, CI/CD, monitoring, and advanced orchestration concepts. Master these for Docker interview success.
