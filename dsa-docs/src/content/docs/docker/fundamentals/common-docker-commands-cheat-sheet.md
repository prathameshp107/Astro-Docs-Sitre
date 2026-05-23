---
title: "Common Docker Commands Cheat Sheet"
description: "---"
sidebar:
  order: 16
---

## 16. Common Docker Commands Cheat Sheet

### 🖼️ Image Commands

| Command | Description |
|---------|-------------|
| `docker pull nginx` | Download image from Docker Hub |
| `docker images` | List all local images |
| `docker rmi nginx` | Remove an image |
| `docker image prune` | Remove unused images |
| `docker build -t myapp .` | Build image from Dockerfile |
| `docker history nginx` | Show image layer history |
| `docker inspect nginx` | Show detailed image info |
| `docker search nginx` | Search Docker Hub |
| `docker tag myapp user/myapp:v1` | Tag an image |
| `docker push user/myapp:v1` | Push image to registry |
| `docker save nginx > nginx.tar` | Export image to file |
| `docker load < nginx.tar` | Import image from file |

---

### 📦 Container Commands

| Command | Description |
|---------|-------------|
| `docker run -d nginx` | Run container in background |
| `docker run -it ubuntu bash` | Run interactively |
| `docker run --name web nginx` | Run with custom name |
| `docker run -p 8080:80 nginx` | Run with port mapping |
| `docker run --rm nginx` | Run and auto-remove |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop web` | Stop container gracefully |
| `docker start web` | Start stopped container |
| `docker restart web` | Restart container |
| `docker rm web` | Remove stopped container |
| `docker rm -f web` | Force remove running container |
| `docker container prune` | Remove all stopped containers |
| `docker exec -it web bash` | Access running container |
| `docker logs web` | View container logs |
| `docker logs -f web` | Follow logs |
| `docker inspect web` | Detailed container info |
| `docker stats` | Live resource usage |
| `docker top web` | View processes |
| `docker port web` | Show port mappings |
| `docker cp web:/file ./local` | Copy file from container |

---

### 💾 Volume Commands

| Command | Description |
|---------|-------------|
| `docker volume create mydata` | Create a named volume |
| `docker volume ls` | List all volumes |
| `docker volume inspect mydata` | Show volume details |
| `docker volume rm mydata` | Remove a volume |
| `docker volume prune` | Remove unused volumes |
| `docker run -v mydata:/data mongo` | Use named volume |
| `docker run -v $(pwd):/app node` | Use bind mount |

---

### 🌐 Network Commands

| Command | Description |
|---------|-------------|
| `docker network ls` | List all networks |
| `docker network create mynet` | Create a network |
| `docker network inspect mynet` | Show network details |
| `docker network rm mynet` | Remove a network |
| `docker network prune` | Remove unused networks |
| `docker network connect mynet web` | Connect container to network |
| `docker network disconnect mynet web` | Disconnect container |
| `docker run --network mynet nginx` | Run on specific network |

---
