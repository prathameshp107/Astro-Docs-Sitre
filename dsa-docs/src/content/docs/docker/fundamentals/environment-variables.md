---
title: "Environment Variables"
description: "Environment variables are key-value pairs passed into a container at runtime. They let you configure your app without hardcoding values."
sidebar:
  order: 13
---

## 11. Environment Variables

### 🔐 What are Environment Variables?

Environment variables are **key-value pairs** passed into a container at runtime. They let you configure your app without hardcoding values.

**Why use them?**
- Different values for dev/staging/production
- Keep secrets out of your code
- 12-Factor App methodology

---

### 🛠️ Setting Environment Variables

```bash
# Single variable
docker run -e NODE_ENV=production my-app

# Multiple variables
docker run \
  -e NODE_ENV=production \
  -e DB_HOST=localhost \
  -e DB_PORT=5432 \
  -e DB_NAME=myapp \
  my-app

# From an env file
docker run --env-file .env my-app

# Example .env file:
# NODE_ENV=production
# DB_HOST=db.example.com
# DB_PASSWORD=s3cr3t
# API_KEY=abc123xyz
```

---

### 🔑 Common Environment Variables by Service

```bash
# MySQL
docker run -e MYSQL_ROOT_PASSWORD=rootpass \
           -e MYSQL_DATABASE=mydb \
           -e MYSQL_USER=myuser \
           -e MYSQL_PASSWORD=mypass \
           mysql:8

# PostgreSQL
docker run -e POSTGRES_PASSWORD=secret \
           -e POSTGRES_DB=myapp \
           -e POSTGRES_USER=admin \
           postgres:15

# MongoDB
docker run -e MONGO_INITDB_ROOT_USERNAME=admin \
           -e MONGO_INITDB_ROOT_PASSWORD=password \
           mongo:6

# Redis (with password)
docker run -e REDIS_PASSWORD=mypassword redis

# Node.js app
docker run -e NODE_ENV=production \
           -e PORT=3000 \
           -e DATABASE_URL=postgresql://admin:pass@db:5432/myapp \
           my-node-app
```

---

### ⚠️ Security Warning

> **🚨 Never hardcode secrets in Dockerfiles or commit `.env` files to Git!**

```bash
# Bad: hardcoded in command (visible in shell history)
docker run -e DB_PASSWORD=mysecret myapp

# Better: use an env file (add to .gitignore)
docker run --env-file .env myapp

# Best: Use Docker Secrets (Swarm) or K8s Secrets
```

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

---
