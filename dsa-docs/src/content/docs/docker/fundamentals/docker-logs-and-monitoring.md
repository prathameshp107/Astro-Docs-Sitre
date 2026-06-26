---
title: "Docker Logs and Monitoring"
description: "---"
sidebar:
  order: 16
---

## 12. Docker Logs and Monitoring

### 📋 Viewing Container Logs

```bash
# View logs of a container
docker logs my-container

# Follow logs in real-time (like tail -f)
docker logs -f my-container

# Show last N lines
docker logs --tail 100 my-container

# Show logs with timestamps
docker logs -t my-container

# Combine: last 50 lines, with timestamps, follow
docker logs -f -t --tail 50 my-container

# Show logs since a timestamp
docker logs --since 2024-01-01T10:00:00 my-container

# Show logs in last 30 minutes
docker logs --since 30m my-container
```

---

### 📊 Resource Monitoring

```bash
# Live resource usage (like top for containers)
docker stats

# Stats for specific container
docker stats my-container

# One-time snapshot (no streaming)
docker stats --no-stream

# Custom format
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

**Sample `docker stats` output:**
```
NAME        CPU %   MEM USAGE / LIMIT     MEM %   NET I/O
web-app     0.5%    45.2MiB / 7.77GiB    0.57%   12.5kB / 8.4kB
mongodb     1.2%    312MiB / 7.77GiB     3.9%    1.2MB / 890kB
```

---

### 🔍 Inspecting Containers

```bash
# Full JSON details of a container
docker inspect my-container

# Get specific field (IP address)
docker inspect --format '{{.NetworkSettings.IPAddress}}' my-container

# Get environment variables
docker inspect --format '{{.Config.Env}}' my-container

# Get mounted volumes
docker inspect --format '{{.Mounts}}' my-container

# View running processes inside container
docker top my-container

# View port mappings
docker port my-container
```

---

### 🐛 Debugging Common Issues

```bash
# Container exits immediately? Check logs:
docker logs my-container

# Container won't start? Check events:
docker events --filter container=my-container

# High memory usage? Check stats:
docker stats --no-stream my-container

# Can't connect to service? Check ports:
docker port my-container
docker inspect my-container | grep IPAddress
```

---
