---
title: "Docker CLI Deep Dive"
description: "docker run -p 3000:3000 node-app Both host and container use port 3000"
sidebar:
  order: 9
---

## 7. Docker CLI Deep Dive

### 🔧 Essential Flags Explained

#### `--name` — Give your container a name

```bash
docker run --name my-app nginx
# Without --name, Docker assigns random names like "vibrant_curie"
```

#### `-p` — Port mapping (host:container)

```bash
docker run -p 8080:80 nginx
# Access nginx at localhost:8080, which maps to container port 80

docker run -p 3000:3000 node-app
# Both host and container use port 3000
```

#### `-d` — Detached mode (run in background)

```bash
docker run -d nginx
# Returns container ID, terminal remains free
```

#### `-it` — Interactive terminal

```bash
docker run -it ubuntu bash
# Opens a bash shell inside the container
# -i = interactive (keep STDIN open)
# -t = allocate a pseudo-TTY (terminal)
```

#### `--rm` — Auto-remove after exit

```bash
docker run --rm ubuntu echo "Hello World"
# Container is automatically deleted after the command finishes
```

#### `-v` — Volume mount

```bash
docker run -v /host/path:/container/path nginx
docker run -v my-volume:/data postgres
```

#### `--network` — Connect to a network

```bash
docker run --network my-network nginx
```

#### `-e` — Set environment variable

```bash
docker run -e NODE_ENV=production node-app
docker run -e MYSQL_ROOT_PASSWORD=secret mysql
```

---

### 🛠️ Combining Flags — Real Examples

```bash
# Run MongoDB: named, detached, with port, env var, and volume
docker run \
  --name mongodb \
  -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v mongo-data:/data/db \
  mongo:6

# Run Node.js app: named, detached, with port, env, and remove on stop
docker run \
  --name my-api \
  -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --rm \
  my-api-image

# Run Ubuntu interactively and auto-remove
docker run -it --rm ubuntu bash
```

---
