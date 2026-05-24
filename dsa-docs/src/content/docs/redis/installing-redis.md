---
title: "Installing Redis"
description: "Redis does not officially support Windows natively. You have two options:"
---

## 4. Installing Redis

### Windows

Redis does not officially support Windows natively. You have two options:

**Option 1: WSL2 (Recommended)**
```bash
# Install WSL2 first, then inside Ubuntu terminal:
sudo apt update
sudo apt install redis-server -y
sudo service redis-server start
```

**Option 2: Use Docker (see Section 17)**

---

### Ubuntu / Debian Linux

```bash
# Update package list
sudo apt update

# Install Redis
sudo apt install redis-server -y

# Start Redis service
sudo systemctl start redis-server

# Enable Redis to start on boot
sudo systemctl enable redis-server

# Check status
sudo systemctl status redis-server
```

---

### macOS

```bash
# Install via Homebrew
brew install redis

# Start Redis as a background service
brew services start redis

# Or start manually in the foreground
redis-server
```

---

### Docker

```bash
# Pull and run Redis
docker run --name my-redis -p 6379:6379 -d redis

# Verify it's running
docker ps

# Connect to Redis CLI inside the container
docker exec -it my-redis redis-cli
```

---

### Verifying Your Installation

```bash
# Start Redis server
redis-server

# Open a new terminal and connect with CLI
redis-cli

# Test connection — Redis should reply PONG
127.0.0.1:6379> PING
PONG

# Set a test key
127.0.0.1:6379> SET hello "Redis is working!"
OK

# Get the value back
127.0.0.1:6379> GET hello
"Redis is working!"
```

> **Tip:** Redis CLI connects to `127.0.0.1:6379` by default. For a remote host, use `redis-cli -h <host> -p <port>`.

---
