// ─── Docker Interview Questions (200) ───────────────────────────────────
export const DOCKER_QUESTIONS = [
  // ── Easy ─────────────────────────────────────────────────────────────────
  [
    "What is Docker?",
    "easy",
    "Docker is a platform for developing, shipping, and running applications in containers. Containers package an application with all its dependencies (code, runtime, libraries, config) into a single unit. Provides consistency across environments (dev, staging, prod). Docker uses OS-level virtualization — containers share the host OS kernel."
  ],
  [
    "What is a container?",
    "easy",
    "A container is a lightweight, standalone, executable package that includes everything needed to run an application. Unlike VMs (which virtualize hardware and include a full OS), containers share the host's OS kernel. Containers: start faster (milliseconds), use less memory, and provide application-level isolation via Linux namespaces and cgroups."
  ],
  [
    "What is the difference between a container and a virtual machine?",
    "easy",
    "Container: shares host kernel, lightweight (MBs), starts in seconds, OS-level virtualization, less isolation. VM: includes full guest OS (GBs), starts in minutes, hardware virtualization, strong isolation via hypervisor. Containers are more resource-efficient; VMs provide stronger security boundaries. Both can be used together in production."
  ],
  [
    "What is a Docker image?",
    "easy",
    "A Docker image is a read-only template with instructions for creating a container. Built from a Dockerfile. Images consist of layers (each instruction adds a layer). Stored in a registry (Docker Hub, ECR, GCR). Images are versioned with tags. `docker pull nginx:latest` downloads an image. Images can be extended: `FROM node:18`."
  ],
  [
    "What is a Dockerfile?",
    "easy",
    "A Dockerfile is a text file with instructions to build a Docker image. Each instruction creates a layer. Common instructions: `FROM` (base image), `RUN` (execute commands), `COPY`/`ADD` (files), `WORKDIR` (working directory), `CMD` (default command), `ENTRYPOINT` (executable), `ENV` (environment variables), `EXPOSE` (ports). Example: `FROM node:18; WORKDIR /app; COPY . .; RUN npm install; CMD [\"node\", \"server.js\"]`."
  ],
  [
    "What is Docker Hub?",
    "easy",
    "Docker Hub is a cloud-based registry for storing and sharing Docker images. Contains official images (nginx, node, python, ubuntu) and community images. `docker pull nginx` downloads from Docker Hub. You can push your own images: `docker push username/myapp:latest`. Alternatives: AWS ECR, Google GCR, GitHub Container Registry, self-hosted registries."
  ],
  [
    "What is the docker pull command?",
    "easy",
    "`docker pull image:tag` downloads an image from a registry. If no tag, defaults to `:latest`. Pulls ALL layers of the image. Layers already present locally are reused. Hashed digests ensure integrity: `docker pull nginx@sha256:...`."
  ],
  [
    "What is the docker run command?",
    "easy",
    "`docker run [options] image [command]` creates and starts a container. Options: `-d` (detached), `-p 8080:80` (port mapping), `-v /host:/container` (volume), `--name myapp` (container name), `-e ENV=value` (env vars), `--rm` (remove on stop). Example: `docker run -d -p 3000:3000 --name myapp myimage`."
  ],
  [
    "What is the docker build command?",
    "easy",
    "`docker build -t myapp:latest .` builds an image from a Dockerfile in the current directory (`.` = build context). `-t` tags the image. Layers are cached — only changed steps are rebuilt. Options: `--no-cache` (force rebuild all), `--build-arg` (pass build-time variables), `-f` (specify Dockerfile path)."
  ],
  [
    "What is the docker ps command?",
    "easy",
    "`docker ps` lists RUNNING containers. Shows: container ID, image, command, created time, status, ports, name. `docker ps -a` lists ALL containers (including stopped). `docker ps -q` shows only IDs (useful for scripting: `docker stop $(docker ps -q)`)."
  ],
  [
    "What is the difference between docker ps and docker ps -a?",
    "easy",
    "`docker ps` shows only RUNNING containers. `docker ps -a` shows ALL containers (running, stopped, exited, created). Stopped containers are preserved until removed — useful for debugging (checking logs of crashed container)."
  ],
  [
    "What is the docker stop command?",
    "easy",
    "`docker stop container` sends SIGTERM (graceful shutdown) to the main process, waits for timeout (default 10s), then sends SIGKILL. Use `docker kill` to skip SIGTERM (immediate SIGKILL). Stopped containers can be restarted with `docker start`."
  ],
  [
    "What is the difference between docker stop and docker kill?",
    "easy",
    "`docker stop` sends SIGTERM first (allows graceful shutdown — cleanup, flushing connections), waits for timeout, then SIGKILL. `docker kill` sends SIGKILL immediately (no graceful shutdown). Use `stop` for services that handle SIGTERM. Use `kill` for hung containers."
  ],
  [
    "What is the docker rm command?",
    "easy",
    "`docker rm container` removes a STOPPED container (frees disk space). Use `-f` to remove a RUNNING container (force kill). Remove all stopped containers: `docker container prune` or `docker rm $(docker ps -a -q)`. Cannot remove a running container without `-f`."
  ],
  [
    "What is the docker rmi command?",
    "easy",
    "`docker rmi image` removes an image (frees disk space). Add `-f` to force remove. Remove all unused images: `docker image prune` or `docker image prune -a` (removes ALL unused images). Containers using the image must be removed first."
  ],
  [
    "What is the docker exec command?",
    "easy",
    "`docker exec -it container bash` runs a command in a RUNNING container. `-i` (interactive), `-t` (TTY). Used for: debugging (inspect container state), running maintenance commands, checking logs/files. Alternative: `docker exec -it container sh` (if bash not available)."
  ],
  [
    "What is the docker logs command?",
    "easy",
    "`docker logs container` shows STDOUT/STDERR from the container's main process. Options: `-f` (follow — tail in real-time), `--tail n` (show last N lines), `--since` (show logs since timestamp). Logs are stored as JSON files by default (`/var/lib/docker/containers/`). For production, use a logging driver (json-file, syslog, fluentd, awslogs)."
  ],
  [
    "What is the FROM instruction in a Dockerfile?",
    "easy",
    "`FROM image:tag` sets the BASE image for subsequent instructions. Every Dockerfile MUST start with FROM (except scratch). Common bases: `node:18-alpine`, `python:3.11-slim`, `ubuntu:22.04`, `nginx:alpine`, `golang:1.21`. `FROM scratch` starts with an empty image (for statically compiled binaries). Multi-stage builds use multiple FROM statements."
  ],
  [
    "What is the RUN instruction in a Dockerfile?",
    "easy",
    "`RUN command` executes a command in a NEW layer on top of the current image. Commands are executed during `docker build`. Each RUN creates a layer — chain commands with `&&` to reduce layers: `RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*`."
  ],
  [
    "What is the CMD instruction in a Dockerfile?",
    "easy",
    "`CMD [\"executable\", \"param1\", \"param2\"]` (exec form — preferred) or `CMD command param1` (shell form). Sets the DEFAULT command to run when a container starts. If a command is provided to `docker run`, it OVERRIDES CMD. Only ONE CMD per Dockerfile (last one wins). Used with ENTRYPOINT: CMD provides default arguments to ENTRYPOINT."
  ],
  [
    "What is the COPY instruction in a Dockerfile?",
    "easy",
    "`COPY source destination` copies files/directories from the BUILD CONTEXT into the image. Source is relative to the build context. Works with `--chown` flag. Unlike ADD (which can extract archives and download URLs), COPY is simpler and more predictable. Use COPY for local files; use ADD only when you need URL download or tar auto-extraction."
  ],
  [
    "What is the EXPOSE instruction in a Dockerfile?",
    "easy",
    "`EXPOSE 8080` documents which port the container listens on. It's INFORMATIONAL only — does NOT publish the port. You still need `-p 8080:8080` in `docker run` to actually expose the port. Used for documentation and by tools that inspect images."
  ],
  [
    "What is the WORKDIR instruction in a Dockerfile?",
    "easy",
    "`WORKDIR /app` sets the working directory for RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow. Creates the directory if it doesn't exist. Use absolute paths to avoid confusion. Multiple WORKDIRs can be used (each relative to the previous one). Best practice: set WORKDIR early."
  ],
  [
    "What is the ENV instruction in a Dockerfile?",
    "easy",
    "`ENV KEY=VALUE` sets environment variables available during build AND at runtime. `ENV NODE_ENV=production`. For runtime-only env vars, use `-e` flag or `--env-file`. `ARG` is for build-time only variables (not persisted in final image)."
  ],
  [
    "What is port mapping in Docker? (-p flag)",
    "easy",
    "`-p host_port:container_port` maps a port on the host to a port in the container. Example: `-p 80:8080` makes the container's port 8080 accessible on the host's port 80. Without mapping, ports are only accessible within the Docker network. Multiple `-p` flags: `-p 80:80 -p 443:443`."
  ],
  [
    "What is a Docker volume?",
    "easy",
    "A Docker volume is persistent storage that outlives containers. Volumes are stored in Docker's storage directory (`/var/lib/docker/volumes/`). Benefits: persists data across container restarts, can be shared among containers, faster than bind mounts (managed by Docker), backup-friendly. Created: `docker volume create mydata`. Used: `docker run -v mydata:/data`."
  ],
  [
    "What is the -v flag in docker run?",
    "easy",
    "`-v host_path:container_path` mounts a volume or bind mount. Types: `-v volume_name:/container` (named volume — Docker manages storage), `-v /host/path:/container` (bind mount — direct host mapping), `-v /container` (anonymous volume — random name, removed with `--rm`). Modern: use `--mount` for more explicit syntax."
  ],
  [
    "What is the difference between an image and a container?",
    "easy",
    "An IMAGE is a READ-ONLY template (filesystem + metadata). A CONTAINER is a RUNNABLE instance of an image (with a writable layer). Image = class (blueprint). Container = instance (runtime). You can create multiple containers from one image. Containers can be started, stopped, restarted, and deleted."
  ],
  [
    "What is docker-compose?",
    "easy",
    "Docker Compose defines and runs multi-container Docker applications. Uses a YAML file (`docker-compose.yml`) to configure: services (containers), networks, volumes, ports, env vars, dependencies. `docker-compose up` starts all services. `docker-compose down` stops and removes them. Simplifies orchestrating related services (app + DB + cache)."
  ],
  [
    "What is a docker-compose.yml file?",
    "easy",
    "A YAML file defining services for Docker Compose. Example: `version: '3.8'; services: web: build: . ports: - '3000:3000'; db: image: postgres:15 environment: POSTGRES_PASSWORD: secret`. Each service can specify: image, build, ports, volumes, environment, networks, depends_on, healthcheck, restart policy."
  ],

  // ── Medium ────────────────────────────────────────────────────────────────
  [
    "What is the difference between CMD and ENTRYPOINT in a Dockerfile?",
    "med",
    "ENTRYPOINT defines the EXECUTABLE that always runs. CMD provides DEFAULT ARGUMENTS to ENTRYPOINT (or the command if ENTRYPOINT is not set). `docker run` arguments OVERRIDE CMD but APPEND to ENTRYPOINT. Example: `ENTRYPOINT [\"nginx\", \"-g\"]; CMD [\"daemon off;\"]` → run: `docker run myimage` executes `nginx -g \"daemon off;\"`. `docker run myimage -c \"...\"` → `nginx -g -c \"...\"`."
  ],
  [
    "What is the difference between COPY and ADD instructions?",
    "med",
    "COPY: copies files from build context to image. Simple, predictable. ADD: does everything COPY does, PLUS: 1) Auto-extracts tar archives (`ADD archive.tar /dest`). 2) Can download from URLs. Prefer COPY for clarity — use ADD only when you need tar extraction or URL download (URL downloads don't cache well)."
  ],
  [
    "What is the difference between RUN, CMD, and ENTRYPOINT?",
    "med",
    "RUN: executes at BUILD time, creates layers. CMD: default command at RUNTIME (can be overridden). ENTRYPOINT: main executable at RUNTIME (not easily overridden). RUN = `docker build` step. CMD = `docker run` default. ENTRYPOINT = always-run executable. All three have shell form (`CMD command`) and exec form (`CMD [\"exec\", \"arg\"]` — preferred for proper signal handling)."
  ],
  [
    "What are Docker layers and how do they affect build performance?",
    "med",
    "Each Dockerfile instruction creates a layer (added to the image). Layers are cached — if a layer hasn't changed, Docker reuses the cached version. Cache is invalidated when: a layer's instruction changes, or the COPY source changes. Order matters: put infrequently changing layers FIRST (package.json, dependencies) and frequently changing layers LAST (source code). Reduces build time."
  ],
  [
    "What is the Docker build cache and how do you use it effectively?",
    "med",
    "Docker caches each layer after a successful build. On subsequent builds, if the instruction and context haven't changed, the cached layer is used. Effective use: 1) Order COPY statements — copy package.json FIRST (caches npm install). 2) Add source code LATER (frequently changes). 3) Use `.dockerignore` to exclude unnecessary files from build context. 4) Combine RUN commands to reduce layers."
  ],
  [
    "What is a multi-stage Docker build?",
    "med",
    "Multi-stage builds use MULTIPLE `FROM` statements in one Dockerfile to separate build dependencies from runtime. Example: first stage: `FROM golang:1.21 AS builder` — compiles a Go binary. Second stage: `FROM alpine:3.18` — copies only the binary. Result: a tiny production image (Alpine + binary) without the Go compiler and build tools. Greatly reduces image size."
  ],
  [
    "What is a .dockerignore file?",
    "med",
    "`.dockerignore` excludes files/directories from the Docker build context (similar to .gitignore). Reduces build context size, speeds up builds, and prevents secrets from being included. Example: `.git, node_modules, .env, *.log, dist, .gitignore`. Patterns: `**/*.md`, `!dist/*.js` (negate pattern to include)."
  ],
  [
    "What are Docker networks? (bridge, host, none, overlay)",
    "med",
    "Bridge: default network — containers communicate via IP, isolated from host. Host: container uses host's network stack (no isolation, no port mapping needed — faster). None: no networking (loopback only). Overlay: connects containers across multiple Docker hosts (Swarm mode). Use: bridge for most needs, host for performance-critical apps, overlay for multi-host services."
  ],
  [
    "What is the default Docker network?",
    "med",
    "`bridge` (also called `docker0`). Containers on the default bridge can communicate via IP (not DNS — need `--link` or user-defined bridge for DNS resolution). User-defined bridge networks provide automatic DNS resolution (service names resolve to container IPs)."
  ],
  [
    "How do containers communicate with each other in Docker?",
    "med",
    "1) On the same user-defined bridge network: by container/service NAME (Docker's embedded DNS resolves names). 2) On default bridge: by IP (or `--link` — legacy). 3) Via host network: using host's localhost. 4) Overlay network across hosts. Best practice: create a custom network `docker network create mynet`, connect containers with `--network mynet`."
  ],
  [
    "What is the difference between a bind mount and a Docker volume?",
    "med",
    "Bind mount: maps a HOST directory directly into container. `-v /host/path:/container/path`. File system is managed by the host (any process can read/write). Volume: Docker manages the storage in `/var/lib/docker/volumes/`. More portable, easier to backup, secure (only Docker can access). Volumes are the recommended choice for persistent data."
  ],
  [
    "What is a named volume vs anonymous volume?",
    "med",
    "Named volume: `docker run -v mydata:/data` — explicitly named, persists after container removal, can be reused by other containers, survives `docker system prune`. Anonymous volume: `docker run -v /data` — randomly generated name, typically removed with `--rm` flag, cleaned up by `docker volume prune`. Use named volumes for important data."
  ],
  [
    "What is docker volume inspect?",
    "med",
    "`docker volume inspect mydata` shows detailed info about a volume: mount point on host, driver, labels, scope, options. Useful for: finding where volume data actually lives on the host, debugging volume issues, verifying volume created correctly."
  ],
  [
    "What are environment variables in Docker and how do you pass them?",
    "med",
    "Pass env vars via: `-e VAR=value` (single), `--env-file .env` (file with key=value pairs). Set in Dockerfile: `ENV VAR=value` (available at build AND runtime). Containers read env vars as standard OS environment variables. Never store secrets in Dockerfiles — use Docker secrets (Swarm), env_file with .gitignore, or external secret managers."
  ],
  [
    "What is the docker inspect command?",
    "med",
    "`docker inspect container/image` returns detailed JSON metadata about any Docker object. Shows: config, network settings, mounts, ports, env vars, labels, health status, layers, and more. Pipe to `jq` for filtering: `docker inspect container | jq '.[0].NetworkSettings.IPAddress'`."
  ],
  [
    "What is the docker stats command?",
    "med",
    "`docker stats` shows LIVE resource usage of running containers: CPU %, memory usage/limit, memory %, block I/O, network I/O, PIDs. Similar to `top` for containers. `docker stats --no-stream` takes a single snapshot. Useful for: monitoring container resource consumption, identifying resource leaks."
  ],
  [
    "What is docker-compose up vs docker-compose up -d?",
    "med",
    "`docker-compose up` starts services in FOREGROUND — logs print to terminal, Ctrl+C stops them. `docker-compose up -d` starts services in DETACHED (background) mode. Use `-d` for production; use foreground for development (live logs). `docker-compose logs -f` to view logs after detached start."
  ],
  [
    "What is docker-compose down?",
    "med",
    "`docker-compose down` stops and REMOVES containers, networks. By default does NOT remove volumes (data preserved) or images. `docker-compose down -v` removes volumes too (DESTROYS DATA). `--rmi all` removes images. Use `down` to clean between projects; use `stop` to pause without removing."
  ],
  [
    "What is the depends_on option in docker-compose?",
    "med",
    "`depends_on: - db - redis` controls startup ORDER — `db` and `redis` containers are started before `web`. This does NOT wait for services to be READY (only started). For readiness checks, use `condition: service_healthy` with healthcheck. `depends_on` also controls shutdown order (reverse of startup)."
  ],
  [
    "What is healthcheck in Docker?",
    "med",
    "Healthcheck: Docker probes if a container is working. `HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD curl -f http://localhost/ || exit 1`. States: `starting`, `healthy`, `unhealthy`. Docker reports health status in `docker inspect`. Compose: `healthcheck: test: [\"CMD\", \"curl\", \"-f\", \"http://localhost\"]; interval: 30s`."
  ],
  [
    "What is Docker restart policy? (no, always, unless-stopped, on-failure)",
    "med",
    "`no`: (default) don't restart automatically. `always`: always restart (unless manually stopped). `unless-stopped`: like always, but not after daemon restart if manually stopped. `on-failure[:max-retries]`: restart only on non-zero exit. Use `unless-stopped` for services that should always run (unless explicitly stopped). Use `on-failure` for batch jobs."
  ],
  [
    "What is the difference between docker-compose v2 and v3?",
    "med",
    "Compose V2 (deprecated): older format, `version: '2'`, limited Swarm support. V3: for Compose + Swarm, adds `deploy` section (replicas, resources, restart_policy, update_config, rollback_config). Compose V3 files can be deployed to Swarm with `docker stack deploy`. Modern Compose (V2 engine) supports both formats but recommends the new format (no version key, `services:` at top level)."
  ],
  [
    "What is a Docker registry?",
    "med",
    "A registry stores and distributes Docker images. Docker Hub is the default public registry. Private registries: AWS ECR, Google GCR/GAR, Azure ACR, GitHub Container Registry, self-hosted (registry:2 image). Interact: `docker pull`, `docker push`, `docker tag`. Secure with TLS, authentication, and access controls."
  ],
  [
    "How do you push an image to Docker Hub?",
    "med",
    "1) `docker login -u username` (authenticate). 2) `docker tag myapp:latest username/myapp:latest` (tag with registry/username). 3) `docker push username/myapp:latest`. For private registries: `docker tag myapp:latest myregistry.com/app:v1; docker push myregistry.com/app:v1`."
  ],
  [
    "What is image tagging in Docker?",
    "med",
    "Tags label specific versions of an image. Format: `repository:tag`. `docker tag myapp:latest myapp:v1.0.0` creates a new tag (alias). Tags can be reassigned (move to different image). Best practice: use semantic versioning (`v1.2.3`), add `d-` for SHA short (`d-a1b2c3d`), and update `latest` for most recent stable release."
  ],
  [
    "What is the latest tag and why is it problematic in production?",
    "med",
    "`latest` is the DEFAULT tag (if no tag specified). It's a MOVABLE pointer — can change with each push. In production, `latest` is problematic because: builds are non-reproducible (what's `latest` today ≠ tomorrow), can't rollback easily, and might break production when updated. Always use specific version tags (`v1.2.3`) or SHA digests (`image@sha256:...`) in production."
  ],
  [
    "What is the USER instruction in a Dockerfile?",
    "med",
    "`USER appuser` switches to a non-root user for RUN, CMD, ENTRYPOINT. Best practice: create an app user `RUN addgroup -S appgroup && adduser -S appuser -G appgroup`, then `USER appuser`. Running as root inside containers is a security risk (container escape could give host root access)."
  ],
  [
    "What is running containers as root and why is it a security concern?",
    "med",
    "Containers running as root have the same privileges inside the container. If an attacker escapes the container (kernel exploit), they may gain root access on the HOST. Root processes in containers can also perform operations (mount, module loading) that affect the host. Always switch to a non-root USER."
  ],
  [
    "What is the ARG instruction vs ENV instruction?",
    "med",
    "`ARG` (build-time): available only during `docker build`, not persisted in the final image. `ENV` (build + runtime): available during build AND persisted in the final image for container runtime. `ARG` for: build configuration (version numbers, build flags). `ENV` for: runtime configuration (NODE_ENV, database URLs). `--build-arg VAR=value` overrides ARG."
  ],
  [
    "What is docker system prune?",
    "med",
    "`docker system prune` removes ALL unused Docker objects: stopped containers, dangling images, unused networks, build cache. `docker system prune -a` also removes unused images (not just dangling). `--volumes` includes volumes. Frees significant disk space. Use cautiously — removed containers/images cannot be recovered."
  ],
  [
    "What are dangling images?",
    "med",
    "Dangling images are untagged (`<none>:<none>`) images — usually intermediate images left after rebuilding with the same tag, or leftover layers from failed builds. They take disk space. Remove: `docker image prune` (removes dangling images). Different from unused images (which have tags but aren't used by any container)."
  ],
  [
    "How do you share data between containers?",
    "med",
    "Options: 1) Named volumes mounted in multiple containers — `docker run -v shared-data:/data container1` and `docker run -v shared-data:/data container2`. 2) Bind mount same host directory. 3) Network sharing (container A exposes a port, container B connects). Volumes are the recommended approach."
  ],
  [
    "What is the difference between docker network connect and --network?",
    "med",
    "`docker run --network mynet` connects the container to the network AT START. `docker network connect mynet container` connects an EXISTING container to a network (can connect to multiple networks). Use `--network` for primary network at runtime. Use `network connect` for adding a container to an additional network."
  ],
  [
    "What is a sidecar container pattern?",
    "med",
    "A sidecar is an auxiliary container that runs alongside the main container in the same pod/unit. Example: logging agent, proxy, config reloader, health checker. Shares volumes/network with the main container. Benefits: separation of concerns, reusable components, language-agnostic. Common in Kubernetes (main + sidecar in same pod)."
  ],
  [
    "What is the init container pattern?",
    "med",
    "An init container runs to COMPLETION before the main containers start. Used for: database migrations, setting permissions, waiting for dependencies, pre-populating data. Init containers run sequentially, main containers start after all init containers succeed. Kubernetes has native init container support."
  ],

  // ── Hard ──────────────────────────────────────────────────────────────────
  [
    "What are Linux namespaces and how does Docker use them?",
    "hard",
    "Namespaces isolate a container's view of the system. Docker uses: PID (process isolation), Network (network stacks), Mount (filesystems), UTS (hostname), IPC (inter-process communication), User (user IDs), Cgroup (resource limits). Containers share the host kernel but have isolated views of resources. Each namespace type provides a separate layer of isolation."
  ],
  [
    "What are Linux cgroups and how does Docker use them?",
    "hard",
    "Cgroups (control groups) LIMIT and ACCOUNT for resource usage (CPU, memory, disk I/O, network). Docker uses cgroups to enforce: `--memory=512m`, `--cpus=1.5`, `--blkio-weight`. Cgroups prevent a container from consuming all host resources. They don't isolate (that's namespaces) — they restrict. Essential for multi-tenant systems."
  ],
  [
    "What is the union file system (OverlayFS) in Docker?",
    "med",
    "OverlayFS layers filesystems on top of each other to create a unified view. Docker image layers are read-only (lower dir). The container's writable layer is the upper dir. When a container reads: checks upper first, then lower. When a container writes: copy-on-write (copies file from lower to upper, then modifies). Enables image layer reusability and small container write overhead."
  ],
  [
    "How does the Docker image layer system work with OverlayFS?",
    "hard",
    "Each Dockerfile instruction creates a read-only layer (stored on disk). OverlayFS merges these layers into a single view. When a container is created, a thin writable layer is added on top. Multiple containers from the same image share the read-only layers (saving disk and memory). When a container writes to a file from a lower layer, OverlayFS copies it up (copy-on-write)."
  ],
  [
    "What is the difference between Docker containerd and Docker daemon?",
    "hard",
    "Docker daemon (`dockerd`): the high-level daemon — provides Docker API, image management, build, networking, volumes, swarm, and CLI integration. containerd: the low-level container runtime — manages container lifecycle (create, start, stop), image storage, and execution via runc. Docker uses containerd internally since Docker 1.11. containerd can be used standalone (Kubernetes CRI)."
  ],
  [
    "What is containerd and runC?",
    "hard",
    "containerd: industry-standard container runtime (graduated CNCF). Manages: container lifecycle, image pull/storage, networking interfaces, and execution. runC: lightweight CLI tool for spawning containers according to OCI spec. containerd uses runC to actually create containers. Docker → containerd → runC is the execution chain."
  ],
  [
    "What is the OCI (Open Container Initiative) specification?",
    "hard",
    "OCI defines industry standards for container formats and runtimes. Two specs: 1) Image Spec — standard for container image format (layers, config, manifest). 2) Runtime Spec — standard for container lifecycle (how runtimes create and run containers). Ensures portability across different container tools (Docker, Podman, containerd)."
  ],
  [
    "What is Docker BuildKit and how does it improve builds?",
    "hard",
    "BuildKit is a modern build engine (default since Docker 23.0). Improvements: 1) Concurrent builds (parallel layer processing). 2) Skipping unused stages (FROM). 3) Secret mounts (`--mount=type=secret`). 4) Cache mounts (`--mount=type=cache`). 5) Better cache invalidation. 6) Multi-platform builds. Enable: `DOCKER_BUILDKIT=1 docker build .` or set `COMPOSE_DOCKER_CLI_BUILD=1`."
  ],
  [
    "What is a multi-platform Docker build (buildx)?",
    "hard",
    "`docker buildx` builds images for multiple architectures simultaneously (linux/amd64, linux/arm64, linux/arm/v7). Uses QEMU emulation or cross-compilation. Set up: `docker buildx create --use`. Build: `docker buildx build --platform linux/amd64,linux/arm64 -t user/app:latest --push .`. Essential for heterogeneous environments (Apple Silicon + x86 servers)."
  ],
  [
    "What are Docker secrets and how do you manage sensitive data?",
    "hard",
    "Docker secrets (Swarm mode): secures passwords, API keys, certificates. Secrets are encrypted during transit and at rest, only accessible to authorized services. `docker secret create db_password password.txt`. In service: `docker service create --secret db_password ...`. Secrets appear as files at `/run/secrets/`. NOT available in `docker-compose` (non-Swarm) — use `.env` files with proper security."
  ],
  [
    "What is the difference between Docker secrets and environment variables for credentials?",
    "med",
    "Secrets: encrypted at rest/in transit, stored in Swarm's internal DB, mounted as files (not env), not visible in `docker inspect`, automatically rotated. Env vars: visible in process listings, `docker inspect`, logs, can be leaked in debugging output. Always use secrets for credentials in Swarm mode; otherwise, use `.env` with strict access controls."
  ],
  [
    "What is Docker Swarm?",
    "hard",
    "Docker Swarm is Docker's native container orchestration (simpler than Kubernetes). Turns a group of Docker hosts into a single virtual host. Features: declarative service model, scaling, rolling updates, service discovery, load balancing, secrets, configs. Use: `docker swarm init` (manager), `docker swarm join` (workers). `docker stack deploy -c docker-compose.yml app`."
  ],
  [
    "What is the difference between Docker Swarm and Kubernetes?",
    "hard",
    "Swarm: simpler to set up, Docker-native CLI, less features, limited scaling (thousands of containers), limited auto-healing. Kubernetes: complex, powerful, auto-scaling, self-healing, service mesh, operators, broad ecosystem, multi-cloud. Choose Swarm for simple deployments with existing Docker knowledge. Choose Kubernetes for: production-scale, complex orchestration, cloud-native apps."
  ],
  [
    "What is a Docker service in Swarm mode?",
    "med",
    "A service is a declarative definition of a workload: `docker service create --name web --replicas 3 -p 80:80 nginx`. Swarm maintains the desired state — if a container crashes, Swarm replaces it automatically. Services support: rolling updates (`--update-delay`), scaling, networking (overlay), resource limits, placement constraints."
  ],
  [
    "What is a Docker stack?",
    "med",
    "A stack deploys a COMPOSE FILE to Swarm: `docker stack deploy -c docker-compose.yml mystack`. Each Compose service becomes a Swarm service. Supports: replicas, secrets, configs, networks, volumes. `docker stack ls` lists stacks. `docker stack services mystack` lists services. `docker stack ps mystack` shows individual tasks (containers)."
  ],
  [
    "What is Kubernetes and how does it relate to Docker?",
    "hard",
    "Kubernetes (K8s) is a container orchestration platform. Docker CREATES containers; Kubernetes ORCHESTRATES them (scheduling, scaling, networking, rolling updates). K8s can use containerd directly (no dockerd needed). In fact, Kubernetes deprecated Docker as a runtime in v1.20 (still works via dockershim, but containerd/CRI-O are preferred). Docker builds images; K8s runs them."
  ],
  [
    "What is a Kubernetes Pod?",
    "med",
    "A Pod is the smallest deployable unit in Kubernetes — one or more containers that share: network (same IP), storage (volumes), and lifecycle. Containers in a Pod can communicate via localhost. Typically one main container + sidecars. Pods are ephemeral — they're created, destroyed, and recreated as needed."
  ],
  [
    "What is the difference between a Docker container and a Kubernetes Pod?",
    "med",
    "Container: single process unit (Docker-native). Pod: group of containers sharing resources (Kubernetes-native). A Pod can contain one container (common) or multiple tightly coupled containers (sidecar pattern). Pods add a level of abstraction: IP address, volumes, lifecycle. Containers inside a Pod share the same network namespace."
  ],
  [
    "What is a container runtime interface (CRI)?",
    "hard",
    "CRI is a Kubernetes API for container runtimes (containerd, CRI-O). Allows Kubernetes to use any OCI-compliant runtime without modifying K8s code. `kubelet` communicates with the runtime via gRPC. CRI enables: runc (default), gVisor (security), Kata Containers (VM-level isolation), and others."
  ],
  [
    "What is Docker security scanning?",
    "hard",
    "Docker Scout (formerly Docker Security Scanning) scans images for known vulnerabilities (CVEs) against CVE databases. Integrated into Docker Hub and CLI: `docker scout quickview nginx:latest`. Shows: vulnerability count by severity, affected packages, fix availability. Essential for: supply chain security, compliance, CI/CD pipeline scanning."
  ],
  [
    "What is the principle of least privilege for Docker containers?",
    "hard",
    "Apply: 1) Non-root USER inside container. 2) Read-only root filesystem (`--read-only`). 3) Drop ALL capabilities (`--cap-drop=ALL`), add only needed (`--cap-add=NET_BIND_SERVICE`). 4) No privileged mode (unless absolutely necessary). 5) Limit resources (`--memory`, `--cpus`). 6) Use seccomp/AppArmor profiles. 7) Don't mount Docker socket inside containers."
  ],
  [
    "What is seccomp in Docker?",
    "hard",
    "Seccomp (secure computing mode) restricts the system calls a container can make. Docker ships with a default seccomp profile that blocks ~50 dangerous syscalls (mount, reboot, kexec, etc.). Custom profiles: `docker run --security-opt seccomp=custom.json`. Seccomp adds another layer of security beyond namespaces."
  ],
  [
    "What is AppArmor/SELinux in Docker security context?",
    "hard",
    "AppArmor (Ubuntu) and SELinux (RHEL/CentOS) are LSM (Linux Security Modules) that enforce mandatory access control. Docker can load AppArmor profiles: `docker run --security-opt apparmor=my-profile`. SELinux labels: `docker run --security-opt label=level:TopSecret`. Both restrict what processes can access files, network, and capabilities."
  ],
  [
    "What is a read-only filesystem in Docker and why is it recommended?",
    "hard",
    "`docker run --read-only` makes the container's filesystem READ-ONLY — the container cannot modify any files. This prevents attackers from writing malware, installing packages, or modifying config files. If the container needs temporary write access, mount a tmpfs: `--tmpfs /tmp`. Reduces the attack surface significantly."
  ],
  [
    "What is Docker Content Trust (DCT)?",
    "hard",
    "DCT (Notary) provides IMAGE SIGNING and verification. Use: `export DOCKER_CONTENT_TRUST=1`. Images must be signed with a private key; only signed images can be pulled/pushed. Verifies image publisher identity and integrity. Prevents man-in-the-middle attacks and unauthorized image modifications. `docker trust sign` signs an image; `docker trust inspect` shows signatures."
  ],
  [
    "How do you implement a CI/CD pipeline with Docker?",
    "hard",
    "Typical pipeline: 1) Lint/test code. 2) Build Docker image (`docker build`). 3) Run tests in container (`docker run image tests`). 4) Scan for vulnerabilities (Docker Scout, Trivy). 5) Push to registry (`docker push`). 6) Deploy to staging/prod (docker-compose up, Kubernetes apply, or Swarm stack deploy). Use Docker-in-Docker or mount Docker socket for CI runners."
  ],
  [
    "What is a distroless container image?",
    "med",
    "Distroless images contain ONLY your application and its runtime dependencies — NO shells, package managers, or OS utilities. Extremely small size and minimal attack surface. Provided by Google: `gcr.io/distroless/base-debian12`. Example: `FROM gcr.io/distroless/java17-debian12:latest` for Java apps. Trade-off: hard to debug (no shell/curl/ps)."
  ],
  [
    "What is the difference between scratch and alpine base images?",
    "hard",
    "SCRATCH: truly empty image (0 bytes). You must provide every dependency — only the binary. Used for statically compiled Go/Rust binaries (no libc dependencies). ALPINE: minimal Linux (~5MB) with musl libc and BusyBox utilities. Has package manager (`apk`). Alpine is more flexible (can install packages); scratch is smaller and more secure."
  ],
  [
    "How do you optimise a Docker image for size?",
    "hard",
    "Techniques: 1) Use slim/alpine/distroless base images. 2) Multi-stage builds (builder → runtime). 3) `.dockerignore` to exclude dev files. 4) Combine RUN commands (`&&`). 5) Clean up package managers (`rm -rf /var/lib/apt/lists/*`). 6) Use `COPY --from=builder /app/binary /app/` in multi-stage. 7) Compress/minify assets. 8) Use `docker-slim` for automatic optimization."
  ],
  [
    "What is the ONBUILD instruction in a Dockerfile?",
    "hard",
    "`ONBUILD instruction` adds a TRIGGER instruction that runs when this image is used as a BASE image for another Dockerfile. Example: `ONBUILD COPY package*.json /app/; ONBUILD RUN npm install`. When another Dockerfile does `FROM my-node-base`, the ONBUILD instructions execute. Useful for creating base images with common setup (npm install, bundle install) that automatically run in child images."
  ],
  [
    "What is docker commit and why should you avoid it?",
    "hard",
    "`docker commit container new-image` creates an image from a container's current state (snapshot). WHY AVOID: 1) Non-reproducible (no Dockerfile). 2) Contains ephemeral state (temp files, logs, shell history). 3) Bloated (no layer optimization). 4) Can't version control. Always use Dockerfiles for reproducible, auditable images."
  ],
  [
    "How do you debug a failing Docker container?",
    "hard",
    "Debug steps: 1) `docker logs container` — check STDOUT/STDERR. 2) `docker inspect container` — check exit code, health status, config. 3) `docker exec -it container sh` — inspect the running container. 4) `docker start -a container` — run container in foreground (see all output). 5) Build with `--no-cache` to see all build output. 6) Run with `--entrypoint bash` for interactive debugging."
  ],
  [
    "What is the difference between docker attach and docker exec?",
    "hard",
    "`docker attach` connects to the container's MAIN process STDIN/STDOUT/STDERR (same as what `-it docker run` shows). Only one attach allowed at a time. `docker exec` runs a NEW process in the container. Use attach to see main process logs. Use exec for interactive debugging."
  ],
  [
    "What is container orchestration and what problems does it solve?",
    "hard",
    "Container orchestration manages container lifecycles at scale. Solves: scheduling (which host runs a container), service discovery (how containers find each other), scaling (up/down based on load), health monitoring (restart failed containers), rolling updates (zero-downtime deployments), load balancing, secrets/configuration management, cross-host networking. Tools: Kubernetes (dominant), Docker Swarm, Nomad, Amazon ECS."
  ],
  [
    "How do you handle persistent storage in containerised applications?",
    "hard",
    "Use Docker volumes (managed by Docker) or Kubernetes PersistentVolumeClaims. For stateful apps (databases), consider: StatefulSets (K8s), operators (CrunchyDB Postgres, K8ssandra), cloud-managed databases (RDS, Cloud SQL) as alternatives to self-managed containers. Never use container-local storage for production data — containers are ephemeral."
  ],

  // ── New: Current/Industry Conceptual ──────────────────────────────────────
  [
    "Why does layer ordering matter in a Dockerfile for build caching?",
    "med",
    "Docker caches each layer. If a layer changes, ALL SUBSEQUENT LAYERS must be rebuilt. Order from MOST stable to LEAST stable: 1) Base image (FROM). 2) System dependencies (apt-get, apk). 3) Application dependencies (package.json, requirements.txt). 4) Application source code. This way, source code changes only rebuild the last layers (fast)."
  ],
  [
    "How does BuildKit's parallel build graph speed up image builds?",
    "hard",
    "BuildKit evaluates the dependency graph of build steps and runs INDEPENDENT steps IN PARALLEL. Traditional Docker builds execute instructions sequentially. BuildKit also: skips unused stages (FROM in multi-stage builds that aren't used — no empty dirs), pushes layers concurrently, and has better cache management."
  ],
  [
    "What is a cache mount in BuildKit and when would you use one?",
    "hard",
    "`--mount=type=cache,target=/root/.npm` persists package manager cache across builds. Unlike `COPY`, cache mounts don't become part of the final image. Speeds up builds by caching node_modules, apt packages, etc. across builds WITHOUT bloating image layers. Example: `RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt`."
  ],
  [
    "What is the difference between docker volume and a tmpfs mount?",
    "med",
    "Volume: persists on disk (survives container restart/removal), backed up, shared among containers. tmpfs mount: stored in MEMORY (not disk), ephemeral (lost on container stop), very fast, uses container memory limit. Use tmpfs for: sensitive data (not written to disk), temporary files, small caches that can be regenerated."
  ],
  [
    "When should you choose a multi-stage build over a single-stage build?",
    "med",
    "Multi-stage for: compiled languages (Go, Rust, Java — separate build tools from runtime), complex build pipelines (test → lint → compile → runtime), or when minimizing image size is important. Single-stage for: interpreted languages with no build step (Python, Node.js with just `npm install`), or when build tools are already small (Alpine with pip)."
  ],
  [
    "How does the build cache get invalidated by a changed COPY source?",
    "med",
    "Docker computes a checksum of each COPY source file. If ANY file in the COPY source changed (or new files added), the checksum differs → cache is invalidated for that COPY layer AND all subsequent layers. This is why: install dependencies FIRST (copy package.json, run npm install), then copy source code LATER."
  ],
  [
    "What is rootless Docker and what security benefits does it provide?",
    "hard",
    "Rootless Docker runs the Docker daemon AND containers WITHOUT root privileges. Users can be in user namespaces — root inside container = unprivileged user outside. Benefits: if an attacker escapes a container, they DON'T have root on the host (no container escape → host compromise). Limitations: networking (port mapping limited to non-privileged ports), filesystem permission issues, cgroup limitations."
  ],
  [
    "How do user namespaces remap container UIDs to host UIDs?",
    "hard",
    "User namespaces map root inside container (UID 0) to an unprivileged host UID (e.g., 100000). A container process with UID 0 can't access host files owned by UID 0 — it accesses files owned by UID 100000. Enabled globally in `/etc/docker/daemon.json`: `{ \"userns-remap\": \"default\" }`. Increases security at the cost of volume permission complexity."
  ],
  [
    "What is the role of an image manifest in a multi-platform image?",
    "med",
    "A multi-platform image uses a MANIFEST LIST (OCI index) — a list of per-platform manifests. When pulling, Docker reads the manifest list, selects the platform-specific manifest matching the host architecture, and pulls only those layers. The list references multiple manifests (linux/amd64, linux/arm64) under a single tag."
  ],
  [
    "How do you reduce the attack surface of a production container image?",
    "hard",
    "Reduce attack surface: 1) Minimal base (distroless, alpine, scratch). 2) No shells or package managers in final image. 3) Non-root USER. 4) Read-only root filesystem. 5) Drop unnecessary capabilities. 6) Scan for CVEs (Trivy, Docker Scout). 7) Multi-stage builds (no build tools in runtime). 8) No setuid/setgid binaries. 9) Regularly rebuild with updated base images."
  ],
  [
    "What trade-offs exist between alpine and distroless base images?",
    "hard",
    "Alpine: has apk package manager, musl libc (may cause incompatibility with some C extensions), shell access for debugging, ~5MB. Distroless: no package manager, no shell, glibc (better compatibility), harder to debug, ~15-20MB. Alpine is easier to debug (shell access). Distroless is more secure (no shell, no package manager)."
  ],
  [
    "How does Docker Compose resolve service names via internal DNS?",
    "med",
    "Docker Compose creates a default network for the project. Container names become hostnames (resolvable by other containers on the same network). Service name from compose file resolves to the container's IP. Example: `web` container can reach `db:5432` to connect to the database service. Docker's embedded DNS server handles resolution."
  ],
  [
    "What is the purpose of a Compose profiles feature?",
    "med",
    "Profiles in Compose selectively enable services: `services: db: ...; admin: profiles: [debug]`. Start with profile: `docker compose --profile debug up`. Services without a profile always start. Use for: development tools (admin panels, debug utilities), optional dependencies, different environments (dev vs test vs prod)."
  ],
  [
    "How do you scan a Docker image for known CVEs?",
    "med",
    "Docker Scout: `docker scout quickview image:tag` (integrated). Trivy (Aqua): `trivy image image:tag`. Grype: `grype image:tag`. Snyk: `snyk container test image:tag`. These tools scan installed packages against CVE databases and report vulnerabilities by severity. Integrate into CI/CD for policy enforcement."
  ],
  [
    "What is image layer deduplication and how does the registry use it?",
    "hard",
    "Image layers are content-addressable (identified by their SHA digest). If two images share the same layer (e.g., same base image), the registry stores it ONCE. Pulling the second image only downloads layers not already present locally. This is why pulling a second image with the same base is much faster — the base layers are cached."
  ],
  [
    "Why are fewer, larger RUN layers sometimes better than many small ones?",
    "med",
    "Each RUN instruction creates a new layer. Each layer has some overhead (metadata, indexing). Combining commands: `RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*` creates ONE layer vs three. Also important: temporary files created in one RUN but deleted in the next are STILL present in the intermediate layer (layer bloat). Delete temp files in the SAME RUN."
  ],
  [
    "How does an overlay network enable cross-host container communication?",
    "hard",
    "Docker overlay network uses VXLAN tunneling — encapsulates container traffic inside UDP packets for transport between hosts. A key-value store (consul, etcd) stores network state. Each host has a virtual switch (built using OVS or Linux bridging). Containers on different hosts get unique IPs in the overlay subnet. Packets are encapsulated, sent to the destination host, decapsulated, and delivered."
  ],
  [
    "What is the difference between host networking and bridge networking for performance?",
    "med",
    "Host networking: container uses the host's network stack directly — NO NAT, no virtual bridge, no port mapping needed. Highest performance (low latency, high throughput). Bridge networking: packets go through docker0 bridge, iptables NAT — adds overhead (small, ~5-10% depending on workload). Use host networking for latency-sensitive apps (gaming, VoIP, high-frequency trading)."
  ],
  [
    "When would you use a Kubernetes Deployment instead of a bare Pod?",
    "hard",
    "Always use Deployments — they provide: declarative updates (rolling update), self-healing (recreates failed Pods), scaling (replicas), rollback capability, pause/resume. Bare Pods are not automatically recreated if they fail or the node dies. Exception: batch jobs (Job/CronJob), daemon services (DaemonSet), stateful apps (StatefulSet)."
  ],
  [
    "What is a Kubernetes Service and how does it relate to Pods?",
    "hard",
    "A Service provides a STABLE IP address and DNS name for a set of Pods (even as Pods come and go). Selects Pods via labels. Types: ClusterIP (internal only), NodePort (expose on each node's IP), LoadBalancer (cloud LB), ExternalName. Services use kube-proxy to distribute traffic to Pods. Enables service discovery and load balancing."
  ],
  [
    "What is the role of a kubelet in a Kubernetes node?",
    "hard",
    "kubelet is the PRIMARY node agent. It: registers the node with the cluster, watches for Pod assignments from the API server, ensures Pods are running (creates/destroys containers via CRI), reports node/pod status to the API server, runs health checks (liveness, readiness, startup probes). Essentially the \"node manager\" for the cluster."
  ],
  [
    "How does Kubernetes differ from Docker Compose for production orchestration?",
    "hard",
    "Kubernetes: designed for production — auto-scaling, self-healing, rolling updates, service discovery, load balancing, secrets management, configuration management, multi-host networking, resource quotas, RBAC, multi-cloud. Docker Compose: designed for development/single-host — simpler, faster to set up, no built-in HA, no scaling, limited features. Use Compose for dev/test; K8s for production."
  ],
  [
    "What is a liveness probe vs a readiness probe in Kubernetes?",
    "hard",
    "Liveness probe: checks if the container is ALIVE (if fails → restart container). Readiness probe: checks if the container is READY to serve traffic (if fails → remove from Service endpoints). Example: liveness = basic HTTP check (is the server running?), readiness = DB connection check (can we serve requests?). Startup probe: for slow-starting containers."
  ],
  [
    "Why is pinning image digests preferred over mutable tags in production?",
    "med",
    "Image digests (`image@sha256:...`) are IMMUTABLE — they always point to the same content. Tags (`:latest`, `:v1.0`) are MUTABLE — can be reassigned. Pinning digests ensures: reproducible deployments (every node gets the exact same image), no accidental upgrades, and supply chain security (verify known-good hash). Update: use tooling (Renovate, Dependabot) to update digests."
  ],
  [
    "How does Docker Content Trust verify image authenticity?",
    "hard",
    "DCT uses The Update Framework (TUF) with a signing hierarchy: root key → targets key → snapshot key → timestamp key. Images are signed using the targets key. When pulling, Docker verifies: 1) The image manifest signature. 2) The signature chain is valid. 3) The image hasn't been tampered with. `docker trust sign` creates the signature."
  ],
  [
    "What is an SBOM and why does it matter for container security?",
    "hard",
    "SBOM (Software Bill of Materials) is a list of ALL software components in an image (packages, libraries, versions). Essential for: vulnerability management (cross-reference CVEs), license compliance, supply chain security, rapid incident response (is version X affected?). Generate: Syft, Trivy, Docker SBOM."
  ],
  [
    "How do you minimize the number of layers without hurting cache reuse?",
    "med",
    "Combine temporally-related RUN commands (`&&` chaining). But DON'T combine unrelated steps — separating by update frequency helps cache. Example: `RUN apt-get update && apt-get install -y pkg1 pkg2 && rm -rf /var/lib/apt/lists/*` — one layer for system deps. Keep package.json install separate from source code copy. Balance: too many layers = bigger pull; too few = more rebuilds."
  ],
  [
    "What is the difference between docker save and docker export?",
    "med",
    "`docker save image > image.tar` — exports ALL layers and metadata (can be loaded with `docker load`). Preserves image history, tags, layers. `docker export container > container.tar` — exports CONTAINER filesystem (flattened, no layers, no history). Smaller but can't recreate the original image. Use save for image backup/sharing; use export for filesystem snapshot."
  ],
  [
    "When should you use a named volume vs a bind mount in development?",
    "med",
    "Named volume: Docker-managed, file permissions handled, fast (native Docker), but harder to inspect/edit files. Bind mount: direct host access, easy file editing (IDE integration), can share files between host and container. Use bind mounts in development (hot reloading, edit code on host, run in container). Use named volumes for data persistence (databases, caches)."
  ],
  [
    "What is a resource limit (CPU/memory) and how does Docker enforce it?",
    "hard",
    "Docker enforces via cgroups. `--memory=512m` (hard limit — OOM kill if exceeded), `--memory-reservation=256m` (soft limit). `--cpus=1.5` (CPU shares — limit to 1.5 cores). `--blkio-weight=500` (I/O priority). Without limits, a single container can consume all host resources (CPU starvation, OOM on other containers). Always set limits in production."
  ],
  [
    "How do you prevent secrets from leaking into image layers?",
    "hard",
    "Secrets in ENV or COPY are persisted in image layers (can be accessed by anyone with image access). Prevention: 1) Use BuildKit's `--mount=type=secret` (secret is not stored in layers). 2) Use `ARG` + `--build-arg` (not persisted in final image if not in ENV). 3) Use `.dockerignore` to exclude .env files. 4) Multi-stage: secrets in builder stage (not copied to final)."
  ],
  [
    "What is the benefit of using BuildKit secrets over build-args for credentials?",
    "hard",
    "`build-arg` credentials are visible in: `docker history`, image layers, CI logs. BuildKit secrets (`--mount=type=secret,id=mysecret`) are available ONLY during the specific RUN command — not stored in any layer. Secrets are never in the image history. Example: `RUN --mount=type=secret,id=token GITHUB_TOKEN=$(cat /run/secrets/token) npm install .`"
  ],
  [
    "How does container image squashing affect layer caching?",
    "hard",
    "Squashing combines all layers into ONE layer (smaller image, no intermediate layers). Benefits: smaller push/pull, hides files deleted in later layers. Downside: LOSES build cache (any change rebuilds the entire squashed layer). Squashing is rarely worthwhile with modern tools — multi-stage builds and good layer management achieve similar results without losing cache."
  ],
  [
    "What is a registry mirror and why use one in CI?",
    "med",
    "A registry mirror (pull-through cache) sits between Docker and Docker Hub — caches pulled images. In CI/CD: 1) Faster builds (local network, no rate limiting). 2) Reliability (Hub outages don't block CI). 3) Cost savings (less egress). Set Docker daemon config: `{ \"registry-mirrors\": [\"http://mirror.example.com\"] }`."
  ],
  [
    "Why might you run a non-root USER even in a single-tenant cluster?",
    "med",
    "Defense in depth. Even in a single-tenant cluster: 1) Container vulnerabilities (app vuln → shell access → more limited as non-root). 2) Kernel exploits (container escape → limited privileges on host). 3) Compliance (PCI-DSS, SOC2 require least privilege). 4) Reduces accidental damage (can't delete important system files)."
  ],

  // ── New: Code / Implementation ────────────────────────────────────────────
  [
    "Write a Dockerfile for a Node.js app using a multi-stage build.",
    "med",
    "`FROM node:18-alpine AS builder; WORKDIR /app; COPY package*.json ./; RUN npm ci --only=production; FROM node:18-alpine; WORKDIR /app; COPY --from=builder /app/node_modules ./node_modules; COPY . .; EXPOSE 3000; CMD [\"node\", \"server.js\"]`"
  ],
  [
    "Write a Dockerfile that runs as a non-root user.",
    "med",
    "`FROM node:18-alpine; RUN addgroup -S appgroup && adduser -S appuser -G appgroup; WORKDIR /app; COPY . .; RUN chown -R appuser:appgroup /app; USER appuser; EXPOSE 3000; CMD [\"node\", \"server.js\"]`"
  ],
  [
    "What command lists all running and stopped containers?",
    "easy",
    "`docker ps -a` — lists ALL containers. `docker ps` (running only)."
  ],
  [
    "What command removes all stopped containers in one go?",
    "med",
    "`docker container prune` or `docker rm $(docker ps -a -q -f status=exited)`."
  ],
  [
    "Write a docker run command that maps host port 8080 to container port 80.",
    "easy",
    "`docker run -p 8080:80 nginx`"
  ],
  [
    "Write a docker run command that mounts the current directory into /app.",
    "med",
    "`docker run -v $(pwd):/app -w /app node:18 node script.js`"
  ],
  [
    "What command tags an image as myapp:1.0 from myapp:latest?",
    "easy",
    "`docker tag myapp:latest myapp:1.0`"
  ],
  [
    "Write a Dockerfile that sets a healthcheck on a web server.",
    "med",
    "`FROM nginx:alpine; HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O- http://localhost || exit 1`"
  ],
  [
    "Write a docker-compose service with a named volume and a port mapping.",
    "med",
    "`services: web: build: . ports: - '3000:3000' volumes: - app-data:/app/data; volumes: app-data:`"
  ],
  [
    "What command shows the layer history of an image?",
    "med",
    "`docker history image:tag` — shows each layer's creation command, size, and ID."
  ],
  [
    "Write a Dockerfile using a scratch base image for a static Go binary.",
    "hard",
    "`FROM golang:1.21 AS builder; WORKDIR /app; COPY . .; RUN CGO_ENABLED=0 go build -o server .; FROM scratch; COPY --from=builder /app/server /server; EXPOSE 8080; CMD [\"/server\"]`"
  ],
  [
    "What command prunes all unused images, networks, and volumes?",
    "med",
    "`docker system prune -a --volumes`"
  ],
  [
    "Write a docker run command that sets a memory limit of 512m.",
    "med",
    "`docker run --memory=512m --memory-reservation=256m node node app.js`"
  ],
  [
    "What command copies a file from a container to the host?",
    "med",
    "`docker cp container_name:/app/file.txt ./local-file.txt`"
  ],
  [
    "Write a Dockerfile that uses ARG to choose the base image version.",
    "med",
    "`ARG NODE_VERSION=18; FROM node:${NODE_VERSION}-alpine; WORKDIR /app; COPY . .; CMD [\"node\", \"app.js\"]` Build: `docker build --build-arg NODE_VERSION=20 -t myapp .`"
  ],
  [
    "What command inspects the IP address of a running container?",
    "med",
    "`docker inspect container | jq -r '.[0].NetworkSettings.IPAddress'`"
  ],
  [
    "Write a docker-compose snippet with a depends_on and healthcheck condition.",
    "hard",
    "`services: web: build: . depends_on: db: condition: service_healthy; db: image: postgres:15 healthcheck: test: [\"CMD-SHELL\", \"pg_isready\"] interval: 5s timeout: 5s retries: 5`"
  ],
  [
    "What command builds an image for linux/arm64 using buildx?",
    "hard",
    "`docker buildx build --platform linux/arm64 -t myapp:arm64 .`"
  ],
  [
    "Write a Dockerfile that caches dependency installation before copying source.",
    "med",
    "`FROM node:18-alpine; WORKDIR /app; COPY package*.json ./; RUN npm ci --only=production; COPY . .; CMD [\"node\", \"app.js\"]` — npm install runs before source copy (cached unless package.json changes)."
  ],
  [
    "What command attaches a shell to a running container named web?",
    "easy",
    "`docker exec -it web bash` (or `sh` if bash not available)."
  ],
  [
    "Write a Dockerfile that uses a BuildKit cache mount for npm.",
    "hard",
    "`FROM node:18-alpine; WORKDIR /app; COPY package*.json ./; RUN --mount=type=cache,target=/root/.npm npm ci --only=production; COPY . .; CMD [\"node\", \"app.js\"]` — npm cache persists across builds (not in layers)."
  ],
  [
    "What command lists all Docker networks?",
    "easy",
    "`docker network ls`"
  ],
  [
    "Write a docker network create command for a custom bridge.",
    "med",
    "`docker network create --driver bridge --subnet 172.20.0.0/16 mynetwork`"
  ],
  [
    "What command shows real-time resource usage of all containers?",
    "easy",
    "`docker stats`"
  ],
  [
    "Write a Dockerfile that copies only package.json before running install.",
    "med",
    "`FROM node:18-alpine; WORKDIR /app; COPY package.json yarn.lock ./; RUN yarn install --frozen-lockfile; COPY . .; CMD [\"node\", \"app.js\"]`"
  ],
  [
    "What command forces removal of a running container?",
    "med",
    "`docker rm -f container` — sends SIGKILL and removes the container."
  ],
  [
    "Write a docker run command that uses a read-only root filesystem.",
    "hard",
    "`docker run --read-only --tmpfs /tmp --tmpfs /var/run node node app.js` — makes rootfs read-only, mounts tmpfs for temporary writes."
  ],
  [
    "What command restarts a container automatically unless stopped?",
    "med",
    "`docker run --restart unless-stopped myimage`"
  ],
  [
    "Write a Dockerfile with ENTRYPOINT and a default CMD argument.",
    "med",
    "`FROM alpine; ENTRYPOINT [\"echo\"]; CMD [\"Hello, World!\"]` — `docker run myimage` prints \"Hello, World!\". `docker run myimage \"Custom message\"` prints \"Custom message\"."
  ],
  [
    "What command logs in to a private Docker registry?",
    "easy",
    "`docker login myregistry.com`"
  ],
  [
    "Write a docker-compose snippet that loads env vars from a .env file.",
    "med",
    "`services: web: image: nginx env_file: .env` — Compose automatically loads `.env` file from the project directory."
  ],
  [
    "What command shows the disk usage of Docker objects?",
    "med",
    "`docker system df` — shows disk usage for images, containers, volumes, and build cache."
  ],
  [
    "Write a Dockerfile that exposes port 3000 and sets NODE_ENV to production.",
    "easy",
    "`FROM node:18-alpine; ENV NODE_ENV=production; WORKDIR /app; COPY . .; EXPOSE 3000; CMD [\"node\", \"server.js\"]`"
  ],
  [
    "What command saves an image to a tar archive?",
    "med",
    "`docker save myimage:latest > myimage.tar` — or `docker save -o myimage.tar myimage:latest`."
  ],
  [
    "Write a docker run command that joins a container to a custom network.",
    "med",
    "`docker run --network mynetwork --name app nginx`"
  ],

  // ── New: Tricky Output / Behavior ─────────────────────────────────────────
  [
    "What happens when you run docker run without specifying a tag?",
    "med",
    "Docker uses `:latest` tag. Problem: `latest` is a moving tag — you might get a different version on different days or environments. Always specify a tag in production."
  ],
  [
    "What happens to data in an anonymous volume when the container is removed?",
    "med",
    "The anonymous volume is NOT automatically removed. It remains on disk until explicitly pruned. Use `docker rm -v` or `docker compose down -v` to remove them. `docker run --rm` removes the container AND anonymous volumes."
  ],
  [
    "What happens when two CMD instructions appear in one Dockerfile?",
    "med",
    "Only the LAST CMD is used. Dockerfile instructions are processed in order — later instructions override earlier ones. Same for ENTRYPOINT."
  ],
  [
    "What happens to the build cache if you reorder COPY and RUN lines?",
    "med",
    "Changing instruction ORDER invalidates cache for that instruction AND all subsequent ones. Even if the content is identical, reordering changes the Dockerfile structure — each instruction is cached by its position + content."
  ],
  [
    "What happens when you run docker stop on an already-stopped container?",
    "easy",
    "Docker returns a warning: \"No such container\" or just succeeds silently (the container is already stopped). No error — it's idempotent."
  ],
  [
    "What happens when the host port in -p is already in use?",
    "med",
    "Docker throws an error: `Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use`. The container fails to start. Use `docker ps` to find which container is using the port, or change the host port."
  ],
  [
    "What happens when ENTRYPOINT and CMD are both defined at runtime?",
    "med",
    "CMD provides DEFAULT ARGUMENTS to ENTRYPOINT. The combined command becomes: ENTRYPOINT + CMD. If you pass CLI arguments to `docker run`, they OVERRIDE CMD."
  ],
  [
    "What happens when you COPY a file that is listed in .dockerignore?",
    "med",
    "The file is NOT copied — Docker ignores it silently. No error or warning. Useful for excluding: node_modules, .env, .git, build artifacts."
  ],
  [
    "What happens to a container's writable layer when it is deleted?",
    "med",
    "The writable layer is PERMANENTLY LOST (unless it's committed to an image). All changes made to the container filesystem are gone. Volumes and bind mounts persist."
  ],
  [
    "What happens when you run docker exec on a stopped container?",
    "easy",
    "Error: `Container container is not running`. The container must be running to exec into it. Use `docker start` first."
  ],
  [
    "What happens when a healthcheck repeatedly fails for a container?",
    "med",
    "The container's status becomes `unhealthy`. Docker does NOT automatically restart it (unless restart policy is set). The container keeps running but marked unhealthy. Orchestrators (Swarm, K8s) can kill and restart unhealthy containers based on health policies."
  ],
  [
    "What happens when you change an ENV value mid-Dockerfile then reference it later?",
    "med",
    "The ENV value is UPDATED for subsequent instructions. `ENV FOO=bar; RUN echo $FOO; ENV FOO=baz; RUN echo $FOO` — first RUN prints \"bar\", second RUN prints \"baz\"."
  ],
  [
    "What happens to subsequent layers when an early layer's cache is invalidated?",
    "med",
    "ALL subsequent layers must be REBUILT. Layer N cache miss means layers N, N+1, N+2... are rebuilt. This is why stable steps should come FIRST."
  ],
  [
    "What happens when PID 1 in a container ignores SIGTERM on docker stop?",
    "hard",
    "Docker waits for `--stop-timeout` (default 10s) after SIGTERM. If the process ignores SIGTERM, Docker sends SIGKILL (forced kill, cannot be caught). The container exits ungracefully — no cleanup, open connections aborted. Handle SIGTERM properly in your app's entrypoint."
  ],
  [
    "What happens when you mount a host directory over a non-empty container path?",
    "hard",
    "The container path is HIDDEN by the mount. The original container content is still there (in the image layer) but inaccessible. The host directory's content is visible instead. For volumes, Docker copies container content to the volume if the volume is empty (initializes it). Bind mounts don't do this."
  ],
  [
    "What happens when you run a container from an image with no CMD or ENTRYPOINT?",
    "med",
    "The container exits immediately (no command to run). It's created in `created` state and immediately goes to `exited` (0). Check `docker logs` — empty. You must provide a command: `docker run image echo hello`."
  ],
  [
    "What happens when you use latest tag and the remote image was updated?",
    "med",
    "Docker checks the remote image digest — if different from local, it pulls the new version. `latest` is just a tag, not a version guarantee. Your local image may be outdated. This is why CI/CD pipelines should pull fresh images or pin digests."
  ],
  [
    "What happens to environment variables set with ARG after the build finishes?",
    "med",
    "ARG values are NOT available in the running container. They exist only during the build. Use ENV instead for runtime variables."
  ],
  [
    "What happens when two containers publish the same host port?",
    "med",
    "The FIRST container binds the port successfully. The SECOND container fails with \"port already in use\". Each container needs a unique host port unless they're in Swarm mode (ingress routing)."
  ],
  [
    "What happens when docker-compose up is run without rebuilding a changed Dockerfile?",
    "med",
    "Docker Compose does NOT automatically rebuild images. It uses the existing image (if built before). Use `docker compose up --build` to force rebuild. Without `--build`, source changes are NOT reflected."
  ],
  [
    "What happens when you set a memory limit below the app's working set?",
    "hard",
    "The container will be KILLED (OOM kill) when it tries to exceed the limit — `exit code 137`. Monitor with `docker stats`. Use `--memory-reservation` for soft limits."
  ],
  [
    "What happens when the union filesystem has the same file in two layers?",
    "hard",
    "The HIGHER layer (later in Dockerfile) WINS. OverlayFS reads from the topmost layer first. Files from lower layers are hidden but still present (can see them with `docker diff`)."
  ],
  [
    "What happens when you run docker rmi on an image used by a container?",
    "med",
    "The image is NOT deleted (marked as a dangling reference). Docker prevents deleting images that are in use. Stop and remove the container first, then rmi."
  ],
  [
    "What happens when WORKDIR points to a path that does not exist?",
    "easy",
    "Docker CREATES the directory (like `mkdir -p`). No error."
  ],
  [
    "What happens when a multi-stage build references a stage by an undefined name?",
    "med",
    "Build FAILS with error: `target stage \"builder2\" could not be found`. All stage aliases must be defined via `FROM ... AS alias`."
  ],
  [
    "What happens when you docker commit a running container's state?",
    "hard",
    "The container's current filesystem (writable layer + image layers) is saved as a new image. Includes: runtime state (temp files, caches, logs), but NOT running processes or network connections. `docker commit` creates non-reproducible images — avoid."
  ],
  [
    "What happens when a container writes to a read-only root filesystem?",
    "hard",
    "The write FAILS with a permission error (`Read-only file system`). The app or process trying to write crashes. To allow writes in specific paths, mount tmpfs or volumes."
  ],
  [
    "What happens when the default bridge network is used vs a user-defined bridge for DNS?",
    "med",
    "Default bridge: containers can only communicate via IP addresses (no DNS resolution). User-defined bridge: Docker's embedded DNS resolves container names to IPs. Use user-defined bridges for reliable container-to-container communication."
  ],
  [
    "What happens to a detached container's logs when the daemon restarts?",
    "med",
    "Log files persist on disk (JSON files in `/var/lib/docker/containers/`). They're preserved across daemon restarts. The `docker logs` command works as long as the container still exists."
  ],
  [
    "What is the layer-count impact of chaining apt-get update and install in one RUN?",
    "med",
    "Combining in ONE RUN creates ONE layer, NOT two. `RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*` creates one layer with only the installed packages — delete apt lists in the SAME RUN to minimize layer size (otherwise apt lists are persisted)."
  ],
];
