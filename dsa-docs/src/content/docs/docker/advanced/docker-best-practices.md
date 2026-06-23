---
title: "Docker Best Practices"
description: "---"
sidebar:
  order: 115
---

## 14. Docker Best Practices

### ✅ Production Image Checklist

```dockerfile
# syntax=docker/dockerfile:1

# ① Pin exact versions — no 'latest'
FROM node:18.17.0-alpine3.18

# ② Set working directory
WORKDIR /app

# ③ Create non-root user early
RUN addgroup -S app && adduser -S app -G app

# ④ Copy dependency files first (cache optimization)
COPY --chown=app:app package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ⑤ Copy source code last
COPY --chown=app:app src/ ./src/

# ⑥ Switch to non-root
USER app

# ⑦ Expose port as documentation
EXPOSE 3000

# ⑧ Add health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# ⑨ Use exec form for CMD (no shell wrapper)
CMD ["node", "src/server.js"]
```

---

### 🏷️ Image Tagging Conventions

```bash
# Semantic versioning (recommended)
myapp:1.0.0           # Exact release
myapp:1.0             # Minor version family
myapp:1               # Major version family
myapp:latest          # Latest stable (auto-updated)

# Git SHA tags (for traceability)
myapp:sha-a3f5b2c     # Exact commit

# Environment tags
myapp:1.0.0-dev
myapp:1.0.0-staging
myapp:1.0.0-prod

# Full production tagging workflow
VERSION=1.0.0
GIT_SHA=$(git rev-parse --short HEAD)
docker tag myapp registry.io/myapp:${VERSION}
docker tag myapp registry.io/myapp:${VERSION}-${GIT_SHA}
docker tag myapp registry.io/myapp:latest
```

---

### 🧹 Regular Cleanup

```bash
# Check Docker disk usage
docker system df

# Aggressive cleanup (removes everything unused)
docker system prune -a --volumes

# Targeted cleanup (safer)
docker container prune    # Remove stopped containers
docker image prune -a     # Remove unused images
docker volume prune       # Remove unused volumes
docker network prune      # Remove unused networks

# Remove images older than 24h
docker image prune -a --filter "until=24h"
```

---
