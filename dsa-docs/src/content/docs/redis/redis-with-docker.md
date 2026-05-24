---
title: "Redis with Docker"
description: "services: redis: image: redis:7-alpine containername: redis ports: - \"6379:6379\" volumes: - redisdata:/data command: redis-server --appendonly yes healthch"
---

## 17. Redis with Docker

### Running Redis in Docker

```bash
# Pull official Redis image and run
docker run --name my-redis \
  -p 6379:6379 \
  -d redis:latest

# Verify it is running
docker ps

# Access Redis CLI inside the container
docker exec -it my-redis redis-cli

# Test
127.0.0.1:6379> PING
PONG
```

---

### Redis with Persistence Volume

```bash
# Run Redis with a volume for data persistence
docker run --name my-redis \
  -p 6379:6379 \
  -v /my/local/path:/data \
  -d redis redis-server --appendonly yes
```

---

### Docker Compose (Redis + Node.js App)

```yaml
# docker-compose.yml
version: '3.9'

services:
  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build: .
    container_name: node-app
    ports:
      - "3000:3000"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      redis:
        condition: service_healthy

volumes:
  redis_data:
```

```bash
# Start the stack
docker compose up -d

# View Redis logs
docker logs redis -f

# Stop everything
docker compose down
```

---

### Redis with Custom Configuration

```bash
# redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru
appendonly yes
requirepass your_strong_password
```

```bash
# Run with custom config
docker run --name my-redis \
  -p 6379:6379 \
  -v /path/to/redis.conf:/usr/local/etc/redis/redis.conf \
  -d redis redis-server /usr/local/etc/redis/redis.conf
```

---
