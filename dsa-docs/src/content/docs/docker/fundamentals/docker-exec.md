---
title: "Docker Exec"
description: "docker exec lets you run commands inside a running container without stopping it."
sidebar:
  order: 17
---

## 13. Docker Exec

### 💻 Accessing a Running Container

`docker exec` lets you run commands inside a **running** container without stopping it.

**Analogy:** It's like SSH-ing into a running server to run commands.

---

### 🔧 Exec Commands

```bash
# Open an interactive bash shell inside a running container
docker exec -it my-container bash

# If bash is not available (Alpine Linux), use sh
docker exec -it my-container sh

# Run a one-off command
docker exec my-container ls /app

# Run as a specific user
docker exec -u root -it my-container bash

# Set environment variable for the exec session
docker exec -e MY_VAR=hello -it my-container bash

# Run command in a specific directory
docker exec -w /app my-container ls
```

---

### 🛠️ Real-World Exec Use Cases

```bash
# Debug a Node.js container
docker exec -it my-api sh
> ls /app
> node -v
> cat package.json

# Access MongoDB shell inside container
docker exec -it mongodb mongosh
> show dbs
> use myapp

# Access PostgreSQL inside container
docker exec -it postgres-db psql -U postgres
> \l
> \c myapp

# Check environment variables
docker exec my-container env

# Run database migration
docker exec my-app node migrate.js

# View a config file inside a container
docker exec nginx cat /etc/nginx/nginx.conf
```

---

### ⚠️ Important Notes

- `docker exec` only works on **running** containers
- Changes made via `exec` are not persistent — they're lost when the container is recreated
- For permanent changes, update your Dockerfile

---
