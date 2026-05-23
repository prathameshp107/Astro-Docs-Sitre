---
title: "Docker Compose"
description: "Docker Compose is a tool for defining and running multi-container applications using a single YAML file. Instead of running five docker run commands manual"
sidebar:
  order: 104
---

## 4. Docker Compose

### 🎼 What is Docker Compose?

Docker Compose is a tool for defining and running **multi-container applications** using a single YAML file. Instead of running five `docker run` commands manually, you declare everything in `docker-compose.yml` and start it all with one command.

**Analogy:** If Docker is a musician, Docker Compose is the conductor — it makes every instrument (container) play together in harmony.

---

### 📐 The docker-compose.yml Structure

```yaml
version: "3.9"          # Compose file format version

services:               # Your containers (the "musicians")
  web:                  # Service name (also DNS name on the network)
    image: nginx        # Use an existing image
    build: .            # OR build from local Dockerfile
    ports:
      - "8080:80"       # host:container
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - NODE_ENV=production
    depends_on:
      - api             # Start after "api" service
    networks:
      - app-network
    restart: unless-stopped

volumes:                # Named volumes declaration
  db-data:

networks:               # Custom networks declaration
  app-network:
    driver: bridge
```

---

### 🔑 Key `docker-compose.yml` Options

#### `services`

```yaml
services:
  api:
    # Build from local Dockerfile
    build:
      context: .          # Build context directory
      dockerfile: Dockerfile.prod
      args:
        NODE_VERSION: 18

    # OR use a pre-built image
    image: node:18-alpine

    container_name: my-api    # Fixed name (optional)

    restart: unless-stopped   # always | on-failure | no | unless-stopped

    ports:
      - "3000:3000"

    environment:
      NODE_ENV: production
      PORT: 3000

    env_file:
      - .env                  # Load from file

    volumes:
      - ./src:/app/src         # Bind mount
      - node_modules:/app/node_modules  # Named volume

    networks:
      - backend

    depends_on:
      db:
        condition: service_healthy   # Wait for health check

    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
```

#### `volumes`

```yaml
volumes:
  db-data:               # Simple named volume (Docker managed)
  
  app-cache:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /host/path # Bind to specific host path
```

#### `networks`

```yaml
networks:
  frontend:              # Public-facing (nginx, web app)
    driver: bridge
  
  backend:               # Internal (API, DB)
    driver: bridge
    internal: true       # No external access!
```

---

### 💻 Core Docker Compose Commands

```bash
# Start all services (build if needed)
docker compose up

# Start in detached mode (background)
docker compose up -d

# Build images before starting
docker compose up --build

# Start specific service only
docker compose up api

# Stop and remove containers + networks
docker compose down

# Stop and also remove volumes (⚠️ data loss!)
docker compose down -v

# Stop without removing
docker compose stop

# View running services
docker compose ps

# View logs (all services)
docker compose logs

# Follow logs for specific service
docker compose logs -f api

# Run one-off command in a service
docker compose exec api sh
docker compose run api npm run migrate

# Pull latest images
docker compose pull

# Restart a specific service
docker compose restart api

# Scale a service (run multiple instances)
docker compose up -d --scale api=3

# View resource usage
docker compose stats

# Validate compose file
docker compose config
```

---

### ⚙️ Multiple Compose Files (Overrides)

```bash
# Base config (docker-compose.yml)
# Override for dev (docker-compose.dev.yml)
# Override for prod (docker-compose.prod.yml)

# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

```yaml
# docker-compose.dev.yml  (extends base)
services:
  api:
    volumes:
      - .:/app          # Live code reload in dev
    environment:
      NODE_ENV: development
    command: npm run dev
```

---
