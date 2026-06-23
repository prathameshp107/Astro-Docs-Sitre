---
title: "Common Mistakes Beginners Make"
description: "---"
sidebar:
  order: 21
---

## 17. Common Mistakes Beginners Make

### ❌ Mistake 1: Not Naming Containers

```bash
# Bad: random names like "nervous_darwin"
docker run -d nginx

# Good: meaningful names
docker run -d --name web-server nginx
```

---

### ❌ Mistake 2: Using `latest` in Production

```bash
# Bad: unpredictable updates
docker run node:latest

# Good: pin to specific version
docker run node:18.17.0-alpine3.18
```

---

### ❌ Mistake 3: Storing Data Inside Containers

```bash
# Bad: data lost when container is removed!
docker run -d mongo

# Good: use a volume
docker run -d -v mongo-data:/data/db mongo
```

---

### ❌ Mistake 4: Port Conflicts

```bash
# Error: port 8080 already in use
docker run -p 8080:80 nginx

# Fix: check what's using the port
lsof -i :8080                    # macOS/Linux
netstat -ano | findstr :8080     # Windows

# Or use a different host port
docker run -p 8081:80 nginx
```

---

### ❌ Mistake 5: Massive Image Sizes

```bash
# Bad: full OS image (~1GB)
FROM ubuntu:22.04
RUN apt-get install nodejs

# Good: use official slim/alpine images (~50MB)
FROM node:18-alpine
```

---

### ❌ Mistake 6: Forgetting `.dockerignore`

Without `.dockerignore`, your `node_modules` (often 500MB+) gets copied into the build context.

```bash
# Create .dockerignore
cat > .dockerignore << 'EOF'
node_modules
.git
.env
*.log
dist
build
.DS_Store
EOF
```

---

### ❌ Mistake 7: Not Cleaning Up

```bash
# Accumulated stopped containers, images, volumes eat disk space!
# Check disk usage:
docker system df

# Full cleanup (use carefully!):
docker system prune -a --volumes

# Safer: clean specific resources
docker container prune
docker image prune
docker volume prune
docker network prune
```

---

### ❌ Mistake 8: Running as Root Inside Containers

```bash
# Bad: container runs as root by default (security risk)
FROM node:18-alpine
CMD ["node", "app.js"]

# Good: create and use a non-root user
FROM node:18-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
CMD ["node", "app.js"]
```

---
