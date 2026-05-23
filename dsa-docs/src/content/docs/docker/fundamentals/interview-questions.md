---
title: "Interview Questions"
description: "Q1: What is Docker? Docker is an open-source platform that uses containerization to package applications and their dependencies into portable, lightweight"
sidebar:
  order: 19
---

## 19. Interview Questions

### 🎯 Beginner Level

**Q1: What is Docker?**
> Docker is an open-source platform that uses containerization to package applications and their dependencies into portable, lightweight containers. Containers run consistently across any environment that has Docker installed.

---

**Q2: What is the difference between a Docker Image and a Container?**
> A Docker Image is a read-only template (like a recipe or blueprint) used to create containers. A Container is a running instance of an image (like a house built from a blueprint). You can create multiple containers from a single image.

---

**Q3: What is Docker Hub?**
> Docker Hub is the official public container registry where Docker images are stored and shared. It's similar to GitHub for code. You can pull public images from it and push your own images to private or public repositories.

---

**Q4: What is the difference between Docker and a Virtual Machine?**
> VMs run a full OS (including kernel) and require a hypervisor, making them heavy (GBs in size, minutes to start). Docker containers share the host OS kernel and are lightweight (MBs in size, seconds to start). Containers are more portable and resource-efficient.

---

**Q5: What is a Dockerfile?**
> A Dockerfile is a text file containing instructions to build a Docker image. Each instruction creates a layer. Common instructions include: `FROM` (base image), `RUN` (execute commands), `COPY` (copy files), `CMD` (default command), `EXPOSE` (declare port).

---

**Q6: What does `docker run -d -p 8080:80 nginx` mean?**
> - `docker run`: create and start a container
> - `-d`: run in detached/background mode
> - `-p 8080:80`: map host port 8080 to container port 80
> - `nginx`: use the nginx image

---

### 🎯 Intermediate Level

**Q7: What is a Docker Volume? Why is it needed?**
> Docker Volumes provide persistent storage for containers. Since containers are ephemeral (data inside is lost when deleted), volumes store data outside the container lifecycle. Types: Named volumes (Docker-managed), Bind mounts (host path), Anonymous volumes.

---

**Q8: What is the difference between `CMD` and `ENTRYPOINT` in a Dockerfile?**
> - `CMD`: specifies the default command. Can be overridden at `docker run` time.
> - `ENTRYPOINT`: specifies the main executable. Always runs; arguments to `docker run` are appended.
> - Often used together: `ENTRYPOINT ["node"]` + `CMD ["app.js"]`

---

**Q9: What is Docker networking? Explain bridge network.**
> Docker networks enable container communication. The default `bridge` network creates an isolated virtual network on the host. Containers on the same bridge network can communicate using container names (DNS). Custom bridge networks are preferred over the default because they provide automatic DNS resolution.

---

**Q10: What is the use of `.dockerignore`?**
> `.dockerignore` prevents specified files from being sent to the Docker build context. This speeds up builds and reduces image size by excluding unnecessary files like `node_modules`, `.git`, `.env`, and log files.

---

**Q11: What is layer caching in Docker?**
> Docker caches each layer of an image during builds. If a layer and all preceding layers haven't changed, Docker reuses the cached version instead of rebuilding. This makes subsequent builds much faster. That's why you should copy `package.json` and install dependencies before copying your source code.

---

**Q12: How do you pass environment variables to a Docker container?**
> Three ways:
> 1. `-e KEY=value` flag: `docker run -e NODE_ENV=production myapp`
> 2. `--env-file .env` flag: `docker run --env-file .env myapp`
> 3. In Dockerfile with `ENV` instruction (not for secrets)

---

**Q13: What is the difference between `docker stop` and `docker kill`?**
> - `docker stop`: sends SIGTERM signal, gives the container 10 seconds to gracefully shut down, then SIGKILL
> - `docker kill`: immediately sends SIGKILL, no graceful shutdown
> - Always prefer `docker stop` for clean shutdowns

---

**Q14: How do you debug a container that keeps crashing?**
```bash
# Check logs
docker logs my-container

# Check logs from a stopped container
docker logs --tail 100 my-container

# Inspect the exit code
docker inspect my-container | grep ExitCode

# Run interactively to debug
docker run -it my-image sh
```

---

**Q15: What is Docker Compose? (Bonus)**
> Docker Compose is a tool for defining and running multi-container applications using a `docker-compose.yml` file. With a single `docker-compose up` command, you can start all your services (web, database, cache) configured with networks, volumes, and environment variables.

---
