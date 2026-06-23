---
title: "Docker Hub"
description: "Docker Hub is the world's largest container registry — like GitHub for Docker images."
sidebar:
  order: 18
---

## 14. Docker Hub

### 🏪 What is Docker Hub?

Docker Hub is the **world's largest container registry** — like GitHub for Docker images.

- **Public images:** Free to use, millions of images
- **Private repositories:** Store your own images privately
- **Official images:** Curated, secure images from vendors
- **Automated builds:** Auto-build images from GitHub

---

### 📤 Pushing Your Images to Docker Hub

```bash
# Step 1: Create account at hub.docker.com

# Step 2: Login from terminal
docker login
# Enter username and password when prompted

# Step 3: Tag your image with your Docker Hub username
# Format: username/repository:tag
docker tag my-app yourusername/my-app:latest
docker tag my-app yourusername/my-app:1.0.0

# Step 4: Push the image
docker push yourusername/my-app:latest
docker push yourusername/my-app:1.0.0

# Step 5: Pull from anywhere
docker pull yourusername/my-app:latest

# Logout when done
docker logout
```

---

### 🔍 Finding Images

```bash
# Search Docker Hub from CLI
docker search nginx
docker search postgres
docker search --filter=is-official=true node

# Pull official images
docker pull nginx
docker pull node:18
docker pull postgres:15
docker pull redis:7
docker pull mongo:6
docker pull python:3.11
docker pull ubuntu:22.04
docker pull alpine:3.18
```

---

### 🏷️ Understanding Docker Hub URLs

```
https://hub.docker.com/r/library/nginx     # Official image
https://hub.docker.com/r/username/my-app   # User image
```

---
