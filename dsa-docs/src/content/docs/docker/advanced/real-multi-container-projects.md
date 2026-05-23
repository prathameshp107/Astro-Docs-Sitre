---
title: "Real Multi-Container Projects"
description: "Folder Structure:"
sidebar:
  order: 105
---

## 5. Real Multi-Container Projects

### 🏗️ Project 1: Node.js API + MongoDB + Redis

**Folder Structure:**

```
my-api/
├── src/
│   └── server.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── .env
```

**`docker-compose.yml`:**

```yaml
version: "3.9"

services:

  # ── Node.js API ──────────────────────────────────
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: node-api
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      MONGO_URL: mongodb://admin:password@mongodb:27017/myapp?authSource=admin
      REDIS_URL: redis://redis:6379
    depends_on:
      mongodb:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    restart: unless-stopped

  # ── MongoDB ──────────────────────────────────────
  mongodb:
    image: mongo:6
    container_name: mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: myapp
    volumes:
      - mongo-data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/init.js
    ports:
      - "27017:27017"   # Remove in production!
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  # ── Redis ────────────────────────────────────────
  redis:
    image: redis:7-alpine
    container_name: redis
    command: redis-server --requirepass redispassword
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"     # Remove in production!
    networks:
      - app-network
    restart: unless-stopped

volumes:
  mongo-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

---

### 🏗️ Project 2: React + Express API + PostgreSQL

**Folder Structure:**

```
fullstack-app/
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
└── .env
```

**`docker-compose.yml`:**

```yaml
version: "3.9"

services:

  # ── Nginx Reverse Proxy ──────────────────────────
  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - frontend
      - backend
    networks:
      - frontend-net
    restart: unless-stopped

  # ── React Frontend ───────────────────────────────
  frontend:
    build:
      context: ./frontend
      target: runner        # Multi-stage: use the runner stage
    container_name: react-app
    networks:
      - frontend-net
    restart: unless-stopped

  # ── Express Backend API ──────────────────────────
  backend:
    build:
      context: ./backend
    container_name: express-api
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://postgres:password@postgres:5432/myapp
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - frontend-net
      - backend-net
    restart: unless-stopped

  # ── PostgreSQL Database ──────────────────────────
  postgres:
    image: postgres:15-alpine
    container_name: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./backend/migrations:/docker-entrypoint-initdb.d
    networks:
      - backend-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  postgres-data:

networks:
  frontend-net:
  backend-net:
    internal: true    # Database not exposed externally
```

**`nginx/nginx.conf`:**

```nginx
upstream backend {
    server backend:3000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;

    # API requests → Express backend
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # All other requests → React frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---
