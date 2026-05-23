---
title: "Best Practices"
description: "---"
sidebar:
  order: 18
---

## 18. Best Practices

### ✅ 1. Use Small Base Images

```dockerfile
# Use Alpine or slim variants
FROM node:18-alpine        # ~50MB
# instead of
FROM node:18               # ~900MB

# Use distroless for production
FROM gcr.io/distroless/nodejs18-debian11
```

---

### ✅ 2. Leverage Layer Caching

```dockerfile
# Bad: copies everything first (cache busted on ANY change)
COPY . .
RUN npm install

# Good: copy package.json first (npm install cached unless deps change)
COPY package*.json ./
RUN npm install
COPY . .
```

---

### ✅ 3. One Process Per Container

```bash
# Bad: run Nginx + MongoDB + Redis in one container
# Good: separate containers for each service

docker run -d --name web nginx
docker run -d --name db mongo
docker run -d --name cache redis
```

---

### ✅ 4. Use `.dockerignore`

```
node_modules
.git
.env
*.log
dist
build
coverage
.DS_Store
```

---

### ✅ 5. Use Specific Tags

```dockerfile
# Bad
FROM node:latest

# Good
FROM node:18.17.0-alpine3.18
```

---

### ✅ 6. Set Resource Limits

```bash
# Limit CPU and memory to prevent runaway containers
docker run \
  --memory="256m" \
  --cpus="0.5" \
  my-app
```

---

### ✅ 7. Use Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

---

### ✅ 8. Keep Secrets Out of Images

```bash
# Never do this in Dockerfile:
ENV DB_PASSWORD=mysecret

# Use --env-file or Docker Secrets instead
docker run --env-file .env my-app
```

---

### ✅ 9. Regular Cleanup

```bash
# Add to your routine:
docker system prune          # Remove unused resources
docker image prune -a        # Remove all unused images
```

---

### ✅ 10. Use Multi-Stage Builds (Bonus)

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage (tiny!)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

---
