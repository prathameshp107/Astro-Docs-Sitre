---
title: "Docker Interview Questions"
description: "Q1: What is the difference between COPY and ADD in a Dockerfile? COPY simply copies files from build context to the image — explicit and predictable. ADD d"
sidebar:
  order: 117
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
