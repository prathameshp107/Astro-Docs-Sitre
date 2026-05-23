---
title: "Production Architecture"
description: "Production-ready Node.js architecture, Docker, and PM2 process management."
---

# Section 10: Production Architecture

## 🏗️ Production-Ready Architecture

A production Node.js setup typically includes:

![Production Node.js Architecture](/DSA-Notes-Problems/assets/nodejs/production-architecture.svg)

```
Users → CDN (Cloudflare) → Load Balancer (Nginx/ALB) → Node.js Servers (clustered)
                                                                ↓
                        ┌────────────────────────────────────────┐
                        │  MongoDB (Primary + Replicas)           │
                        │  Redis (Cache + Sessions)               │
                        │  Message Queue (RabbitMQ/Bull)          │
                        │  Object Store (S3/GCS)                  │
                        └────────────────────────────────────────┘
                        🔍 Monitoring: Datadog / Prometheus + Grafana / Sentry
```

---

## 🐳 Docker

Docker packages your app and all its dependencies into a **container** — a lightweight, isolated environment that runs identically everywhere.

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["node", "src/server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - MONGO_URI=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mongo-data:
```

---

## ⚡ PM2 — Process Manager

PM2 keeps your Node.js app alive, restarts it on crashes, and manages multiple processes.

```bash
# Install
npm install -g pm2

# Start app
pm2 start src/server.js --name "my-api"

# Start with clustering (use all CPU cores)
pm2 start src/server.js -i max --name "my-api"

# Monitor
pm2 monit

# View logs
pm2 logs my-api

# Auto-start on server reboot
pm2 startup
pm2 save
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-api',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```
