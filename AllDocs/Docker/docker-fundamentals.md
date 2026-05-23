# 🐳 Docker Fundamentals

> **A complete beginner-to-intermediate guide to Docker — explained simply, practically, and visually.**

---

## Table of Contents

1. [Introduction to Docker](#1-introduction-to-docker)
2. [What are Containers](#2-what-are-containers)
3. [Docker Architecture](#3-docker-architecture)
4. [Installing Docker](#4-installing-docker)
5. [Docker Images](#5-docker-images)
6. [Docker Containers](#6-docker-containers)
7. [Docker CLI Deep Dive](#7-docker-cli-deep-dive)
8. [Port Mapping](#8-port-mapping)
9. [Docker Volumes](#9-docker-volumes)
10. [Docker Networks](#10-docker-networks)
11. [Environment Variables](#11-environment-variables)
12. [Docker Logs and Monitoring](#12-docker-logs-and-monitoring)
13. [Docker Exec](#13-docker-exec)
14. [Docker Hub](#14-docker-hub)
15. [Real Project Examples](#15-real-project-examples)
16. [Common Docker Commands Cheat Sheet](#16-common-docker-commands-cheat-sheet)
17. [Common Mistakes Beginners Make](#17-common-mistakes-beginners-make)
18. [Best Practices](#18-best-practices)
19. [Interview Questions](#19-interview-questions)
20. [Summary](#20-summary)

---

## 1. Introduction to Docker

### 🤔 What is Docker?

Docker is an **open-source platform** that lets you package your application and everything it needs (code, libraries, dependencies, config files) into a single portable unit called a **container**.

Think of Docker like a **shipping container** in the real world:

- A shipping container can hold anything — furniture, electronics, food.
- It works the same on a ship, a truck, or a train.
- The content inside doesn't change regardless of where it's transported.

Docker containers work the same way — your app runs identically on your laptop, your colleague's machine, the test server, or production.

---

### 📜 History of Docker

| Year | Event |
|------|-------|
| 2008 | Linux introduces `cgroups` — the foundation of container isolation |
| 2013 | Solomon Hykes demos Docker at PyCon (open-sourced) |
| 2014 | Docker 1.0 released; rapid adoption begins |
| 2015 | Docker Compose, Docker Swarm introduced |
| 2016 | Kubernetes rises as the container orchestration standard |
| 2017 | Docker adopts Moby Project; enterprise features added |
| 2020+ | Docker Desktop improves; Podman and containerd gain popularity |

---

### 😤 Problems Before Docker

Imagine you're a developer. You write a Node.js app on your laptop. It works perfectly. You push it to GitHub and your colleague pulls it. It breaks immediately.

Why?

- Your laptop has **Node 18**. Your colleague has **Node 14**.
- You have a library installed globally that your colleague doesn't have.
- Your OS is macOS; the production server is Ubuntu.

This is the legendary **"Works on my machine"** problem.

---

### 🏗️ Traditional Deployment Problems

```
Developer Machine  →  Test Server  →  Production Server
   Node 18              Node 14          Node 16
   npm 9.0              npm 6.0          npm 8.0
   MongoDB 6            MongoDB 4        MongoDB 5
   Ubuntu 22            CentOS 7         Debian 11
```

Every environment is different. Every deployment is a gamble.

**The old solution? Virtual Machines.**
- A VM runs a full OS (kernel + everything)
- Takes minutes to start
- Uses several GBs of RAM per instance
- Still has environment drift over time

**Docker's solution? Containers.**
- Package the app with its exact dependencies
- Runs in seconds
- Uses MBs of RAM
- Identical everywhere

---

### 📊 Dependency Conflict Diagram

```svg
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">

  <!-- Background -->
  <rect width="760" height="320" fill="#f8f9fa" rx="12"/>

  <!-- Title -->
  <text x="380" y="30" text-anchor="middle" font-size="15" font-weight="bold" fill="#222">"Works on My Machine" Problem</text>

  <!-- Developer Box -->
  <rect x="30" y="55" width="200" height="220" rx="10" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="130" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565c0">💻 Developer</text>
  <text x="130" y="96" text-anchor="middle" font-size="11" fill="#1565c0">macOS Sonoma</text>
  <rect x="50" y="108" width="160" height="30" rx="5" fill="#bbdefb"/>
  <text x="130" y="128" text-anchor="middle" font-size="11" fill="#222">Node.js 18.0</text>
  <rect x="50" y="145" width="160" height="30" rx="5" fill="#bbdefb"/>
  <text x="130" y="165" text-anchor="middle" font-size="11" fill="#222">MongoDB 6.0</text>
  <rect x="50" y="182" width="160" height="30" rx="5" fill="#bbdefb"/>
  <text x="130" y="202" text-anchor="middle" font-size="11" fill="#222">npm 9.2</text>
  <rect x="50" y="219" width="160" height="30" rx="5" fill="#c8e6c9"/>
  <text x="130" y="239" text-anchor="middle" font-size="11" fill="#2e7d32">✅ App Works!</text>

  <!-- Test Server Box -->
  <rect x="280" y="55" width="200" height="220" rx="10" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="380" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#e65100">🖥️ Test Server</text>
  <text x="380" y="96" text-anchor="middle" font-size="11" fill="#e65100">Ubuntu 18.04</text>
  <rect x="300" y="108" width="160" height="30" rx="5" fill="#ffe0b2"/>
  <text x="380" y="128" text-anchor="middle" font-size="11" fill="#222">Node.js 14.0 ⚠️</text>
  <rect x="300" y="145" width="160" height="30" rx="5" fill="#ffe0b2"/>
  <text x="380" y="165" text-anchor="middle" font-size="11" fill="#222">MongoDB 4.0 ⚠️</text>
  <rect x="300" y="182" width="160" height="30" rx="5" fill="#ffe0b2"/>
  <text x="380" y="202" text-anchor="middle" font-size="11" fill="#222">npm 6.0 ⚠️</text>
  <rect x="300" y="219" width="160" height="30" rx="5" fill="#ffcdd2"/>
  <text x="380" y="239" text-anchor="middle" font-size="11" fill="#c62828">❌ App Breaks!</text>

  <!-- Production Server Box -->
  <rect x="530" y="55" width="200" height="220" rx="10" fill="#fce4ec" stroke="#880e4f" stroke-width="2"/>
  <text x="630" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#880e4f">🚀 Production</text>
  <text x="630" y="96" text-anchor="middle" font-size="11" fill="#880e4f">CentOS 7</text>
  <rect x="550" y="108" width="160" height="30" rx="5" fill="#f8bbd0"/>
  <text x="630" y="128" text-anchor="middle" font-size="11" fill="#222">Node.js 16.0 ⚠️</text>
  <rect x="550" y="145" width="160" height="30" rx="5" fill="#f8bbd0"/>
  <text x="630" y="165" text-anchor="middle" font-size="11" fill="#222">MongoDB 5.0 ⚠️</text>
  <rect x="550" y="182" width="160" height="30" rx="5" fill="#f8bbd0"/>
  <text x="630" y="202" text-anchor="middle" font-size="11" fill="#222">npm 8.0 ⚠️</text>
  <rect x="550" y="219" width="160" height="30" rx="5" fill="#ffcdd2"/>
  <text x="630" y="239" text-anchor="middle" font-size="11" fill="#c62828">❌ App Breaks!</text>

  <!-- Arrows -->
  <line x1="232" y1="165" x2="278" y2="165" stroke="#999" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="482" y1="165" x2="528" y2="165" stroke="#999" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- Arrow marker -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#999"/>
    </marker>
  </defs>

  <!-- Bottom Note -->
  <text x="380" y="300" text-anchor="middle" font-size="12" fill="#555">Different environments = Different results = Deployment nightmares</text>
</svg>
```

---

## 2. What are Containers

### 📦 What is a Container?

A **container** is a lightweight, isolated unit that packages your application's code together with all its dependencies — libraries, runtime, config — into a single runnable object.

**Real-world analogy:** Think of a container like a **lunchbox**:
- The lunchbox has everything you need for lunch (food, fork, napkin).
- You can carry it anywhere.
- No matter where you eat — office, park, home — the lunch is the same.

A Docker container has everything an app needs to run. No matter where it runs, the behavior is identical.

---

### ⚡ Container vs Virtual Machine

This is one of the most important concepts in Docker.

| Feature | Virtual Machine | Docker Container |
|---------|----------------|-----------------|
| Size | Several GB | A few MB |
| Boot time | Minutes | Milliseconds |
| OS | Runs full OS | Shares host OS kernel |
| Isolation | Strong (hardware level) | Strong (process level) |
| Portability | Low | Very High |
| Performance | Overhead | Near-native |
| Resource usage | Heavy | Very lightweight |

---

### 🏛️ VM vs Container Architecture

```svg
<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="760" height="400" fill="#f8f9fa" rx="12"/>
  <text x="380" y="28" text-anchor="middle" font-size="15" font-weight="bold" fill="#333">Virtual Machines vs Docker Containers</text>

  <!-- ===== VM Side ===== -->
  <text x="190" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565c0">Virtual Machines</text>

  <!-- Hardware -->
  <rect x="30" y="340" width="320" height="40" rx="6" fill="#b0bec5" stroke="#607d8b" stroke-width="1.5"/>
  <text x="190" y="365" text-anchor="middle" font-size="12" fill="#222">🖥️ Physical Hardware (CPU, RAM, Disk)</text>

  <!-- Host OS -->
  <rect x="30" y="295" width="320" height="38" rx="6" fill="#90caf9" stroke="#1565c0" stroke-width="1.5"/>
  <text x="190" y="319" text-anchor="middle" font-size="12" fill="#0d47a1">Host Operating System</text>

  <!-- Hypervisor -->
  <rect x="30" y="250" width="320" height="38" rx="6" fill="#ef9a9a" stroke="#c62828" stroke-width="1.5"/>
  <text x="190" y="274" text-anchor="middle" font-size="12" fill="#7f0000">Hypervisor (VMware / VirtualBox)</text>

  <!-- VM 1 -->
  <rect x="30" y="65" width="145" height="180" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="102" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">VM 1</text>
  <rect x="42" y="92" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="102" y="111" text-anchor="middle" font-size="10" fill="#333">Guest OS (Linux)</text>
  <rect x="42" y="126" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="102" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime/Libs</text>
  <rect x="42" y="160" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="102" y="179" text-anchor="middle" font-size="10" fill="#333">App A</text>

  <!-- VM 2 -->
  <rect x="205" y="65" width="145" height="180" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="277" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">VM 2</text>
  <rect x="217" y="92" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="277" y="111" text-anchor="middle" font-size="10" fill="#333">Guest OS (Windows)</text>
  <rect x="217" y="126" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="277" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime/Libs</text>
  <rect x="217" y="160" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="277" y="179" text-anchor="middle" font-size="10" fill="#333">App B</text>

  <!-- ===== Docker Side ===== -->
  <text x="570" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">Docker Containers</text>

  <!-- Hardware -->
  <rect x="410" y="340" width="320" height="40" rx="6" fill="#b0bec5" stroke="#607d8b" stroke-width="1.5"/>
  <text x="570" y="365" text-anchor="middle" font-size="12" fill="#222">🖥️ Physical Hardware (CPU, RAM, Disk)</text>

  <!-- Host OS -->
  <rect x="410" y="295" width="320" height="38" rx="6" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="570" y="319" text-anchor="middle" font-size="12" fill="#1b5e20">Host OS + Docker Engine (Shared Kernel)</text>

  <!-- Container 1 -->
  <rect x="410" y="65" width="145" height="225" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="482" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">Container 1</text>
  <rect x="422" y="92" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="482" y="111" text-anchor="middle" font-size="10" fill="#333">Libs only (no OS)</text>
  <rect x="422" y="126" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="482" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime</text>
  <rect x="422" y="160" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="482" y="179" text-anchor="middle" font-size="10" fill="#333">App A</text>
  <text x="482" y="270" text-anchor="middle" font-size="9" fill="#555">~50MB</text>

  <!-- Container 2 -->
  <rect x="585" y="65" width="145" height="225" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="657" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">Container 2</text>
  <rect x="597" y="92" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="657" y="111" text-anchor="middle" font-size="10" fill="#333">Libs only (no OS)</text>
  <rect x="597" y="126" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="657" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime</text>
  <rect x="597" y="160" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="657" y="179" text-anchor="middle" font-size="10" fill="#333">App B</text>
  <text x="657" y="270" text-anchor="middle" font-size="9" fill="#555">~50MB</text>

  <!-- Size labels -->
  <text x="102" y="260" text-anchor="middle" font-size="9" fill="#888">~2-10 GB each</text>
  <text x="277" y="260" text-anchor="middle" font-size="9" fill="#888">~2-10 GB each</text>
</svg>
```

---

### 🔄 Container Lifecycle

```
Created → Running → Paused → Stopped → Removed
```

| State | Description |
|-------|-------------|
| `Created` | Container is created but not started |
| `Running` | Container is active and processes are executing |
| `Paused` | Container processes are suspended |
| `Stopped` | Container is stopped; filesystem still exists |
| `Removed` | Container is deleted permanently |

---

## 3. Docker Architecture

### 🏗️ How Docker Works Internally

Docker uses a **client-server architecture**:

- **Docker Client** — The CLI tool you use (`docker run`, `docker build`)
- **Docker Daemon** (`dockerd`) — The background service that does all the actual work
- **Docker Engine** — The combination of client + daemon
- **Docker Registry** — A storage system for Docker images (like GitHub for code)
- **Docker Hub** — Docker's official public registry

---

### 🗺️ Docker Architecture Diagram

```svg
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="760" height="420" fill="#f0f4f8" rx="12"/>
  <text x="380" y="28" text-anchor="middle" font-size="15" font-weight="bold" fill="#222">Docker Architecture</text>

  <!-- Docker Client Box -->
  <rect x="20" y="50" width="180" height="300" rx="10" fill="#e8eaf6" stroke="#3949ab" stroke-width="2"/>
  <text x="110" y="73" text-anchor="middle" font-size="13" font-weight="bold" fill="#3949ab">Docker Client</text>
  <text x="110" y="90" text-anchor="middle" font-size="10" fill="#666">(Your Terminal)</text>

  <rect x="35" y="100" width="150" height="30" rx="5" fill="#c5cae9"/>
  <text x="110" y="120" text-anchor="middle" font-size="11" fill="#283593">docker build</text>
  <rect x="35" y="138" width="150" height="30" rx="5" fill="#c5cae9"/>
  <text x="110" y="158" text-anchor="middle" font-size="11" fill="#283593">docker pull</text>
  <rect x="35" y="176" width="150" height="30" rx="5" fill="#c5cae9"/>
  <text x="110" y="196" text-anchor="middle" font-size="11" fill="#283593">docker run</text>
  <rect x="35" y="214" width="150" height="30" rx="5" fill="#c5cae9"/>
  <text x="110" y="234" text-anchor="middle" font-size="11" fill="#283593">docker stop</text>
  <rect x="35" y="252" width="150" height="30" rx="5" fill="#c5cae9"/>
  <text x="110" y="272" text-anchor="middle" font-size="11" fill="#283593">docker push</text>

  <!-- REST API label -->
  <line x1="200" y1="200" x2="270" y2="200" stroke="#607d8b" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="235" y="193" text-anchor="middle" font-size="10" fill="#607d8b">REST API</text>

  <!-- Docker Daemon Box -->
  <rect x="270" y="50" width="240" height="300" rx="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="390" y="73" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">Docker Daemon</text>
  <text x="390" y="90" text-anchor="middle" font-size="10" fill="#666">(dockerd — runs on host)</text>

  <!-- Images section in daemon -->
  <rect x="285" y="100" width="210" height="90" rx="6" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
  <text x="390" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#1b5e20">Images</text>
  <rect x="295" y="124" width="90" height="22" rx="4" fill="#a5d6a7"/>
  <text x="340" y="139" text-anchor="middle" font-size="10" fill="#1b5e20">nginx:latest</text>
  <rect x="395" y="124" width="90" height="22" rx="4" fill="#a5d6a7"/>
  <text x="440" y="139" text-anchor="middle" font-size="10" fill="#1b5e20">node:18</text>
  <rect x="295" y="152" width="90" height="22" rx="4" fill="#a5d6a7"/>
  <text x="340" y="167" text-anchor="middle" font-size="10" fill="#1b5e20">mongo:6</text>
  <rect x="395" y="152" width="90" height="22" rx="4" fill="#a5d6a7"/>
  <text x="440" y="167" text-anchor="middle" font-size="10" fill="#1b5e20">redis:7</text>

  <!-- Containers section in daemon -->
  <rect x="285" y="200" width="210" height="130" rx="6" fill="#dcedc8" stroke="#558b2f" stroke-width="1"/>
  <text x="390" y="218" text-anchor="middle" font-size="11" font-weight="bold" fill="#33691e">Containers</text>
  <rect x="295" y="224" width="90" height="35" rx="4" fill="#aed581"/>
  <text x="340" y="238" text-anchor="middle" font-size="10" fill="#33691e">web-app</text>
  <text x="340" y="251" text-anchor="middle" font-size="9" fill="#558b2f">Running ●</text>
  <rect x="395" y="224" width="90" height="35" rx="4" fill="#aed581"/>
  <text x="440" y="238" text-anchor="middle" font-size="10" fill="#33691e">database</text>
  <text x="440" y="251" text-anchor="middle" font-size="9" fill="#558b2f">Running ●</text>
  <rect x="295" y="266" width="90" height="35" rx="4" fill="#d4e157"/>
  <text x="340" y="280" text-anchor="middle" font-size="10" fill="#33691e">cache</text>
  <text x="340" y="293" text-anchor="middle" font-size="9" fill="#f57f17">Stopped ■</text>

  <!-- Arrow to registry -->
  <line x1="512" y1="200" x2="570" y2="200" stroke="#607d8b" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="541" y="193" text-anchor="middle" font-size="10" fill="#607d8b">HTTPS</text>

  <!-- Docker Registry Box -->
  <rect x="570" y="50" width="170" height="300" rx="10" fill="#fff3e0" stroke="#e65100" stroke-width="2"/>
  <text x="655" y="73" text-anchor="middle" font-size="13" font-weight="bold" fill="#e65100">Registry</text>
  <text x="655" y="90" text-anchor="middle" font-size="10" fill="#666">(Docker Hub)</text>

  <rect x="585" y="105" width="140" height="50" rx="6" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
  <text x="655" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#bf360c">Official Images</text>
  <text x="655" y="142" text-anchor="middle" font-size="9" fill="#555">nginx, node, postgres...</text>

  <rect x="585" y="165" width="140" height="50" rx="6" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
  <text x="655" y="186" text-anchor="middle" font-size="11" font-weight="bold" fill="#bf360c">User Images</text>
  <text x="655" y="202" text-anchor="middle" font-size="9" fill="#555">yourname/myapp...</text>

  <rect x="585" y="225" width="140" height="50" rx="6" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
  <text x="655" y="246" text-anchor="middle" font-size="11" font-weight="bold" fill="#bf360c">Private Registry</text>
  <text x="655" y="262" text-anchor="middle" font-size="9" fill="#555">ECR, GCR, ACR...</text>

  <!-- Bottom label -->
  <text x="380" y="395" text-anchor="middle" font-size="11" fill="#777">Client sends commands → Daemon processes them → Registry stores/serves images</text>
</svg>
```

---

### 🔍 Component Breakdown

**Docker Client**
- The CLI tool you interact with
- Sends commands to the Docker daemon via REST API
- Can connect to local or remote daemons

**Docker Daemon (`dockerd`)**
- Background service running on your machine
- Manages images, containers, volumes, and networks
- Does the actual "work" of Docker

**Docker Engine**
- The complete system = Client + Daemon
- Available for Linux, macOS (via VM), Windows (via WSL2)

**Docker Registry**
- A server that stores Docker images
- Docker Hub is the public default
- You can run private registries (e.g., Harbor, AWS ECR)

**Docker Hub**
- Like GitHub, but for Docker images
- Contains millions of public images
- URL: [hub.docker.com](https://hub.docker.com)

---

## 4. Installing Docker

### 🪟 Windows

```powershell
# Step 1: Enable WSL2 (Windows Subsystem for Linux)
wsl --install

# Step 2: Download Docker Desktop from:
# https://docs.docker.com/desktop/install/windows-install/

# Step 3: Run the installer and restart

# Step 4: Verify installation
docker --version
docker run hello-world
```

> **Note:** Docker Desktop on Windows uses WSL2 backend. Enable it in Settings → General → "Use the WSL2 based engine".

---

### 🐧 Linux (Ubuntu/Debian)

```bash
# Step 1: Update package index
sudo apt-get update

# Step 2: Install prerequisites
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Step 3: Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Step 4: Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 5: Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Step 6: Run Docker without sudo (optional but recommended)
sudo usermod -aG docker $USER
newgrp docker

# Step 7: Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify
docker --version
docker run hello-world
```

---

### 🍎 macOS

```bash
# Option 1: Docker Desktop (GUI + CLI)
# Download from: https://docs.docker.com/desktop/install/mac-install/

# Option 2: Homebrew
brew install --cask docker

# Start Docker Desktop, then verify:
docker --version
docker run hello-world
```

---

### ✅ Verification Commands

```bash
# Check Docker version
docker --version
# Output: Docker version 24.0.5, build ced0996

# Check Docker info
docker info

# Run the test container
docker run hello-world

# Check if daemon is running
sudo systemctl status docker    # Linux
```

---

## 5. Docker Images

### 🖼️ What is a Docker Image?

A Docker image is a **read-only template** used to create containers. Think of it like a **recipe**:

- The recipe (image) tells you exactly what ingredients and steps are needed
- Every time you cook (run), you get the same dish (container)
- Many people can use the same recipe to cook the same dish

Images are built in **layers** — each layer represents a set of file system changes.

---

### 📚 Image Layers

```svg
<svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="500" height="350" fill="#f8f9fa" rx="12"/>
  <text x="250" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Image Layer System</text>

  <!-- Layer 5 - App Code (top, writable) -->
  <rect x="100" y="50" width="300" height="45" rx="6" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="250" y="69" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">Your App Code Layer</text>
  <text x="250" y="85" text-anchor="middle" font-size="10" fill="#2e7d32">app.js, package.json, etc.</text>
  <text x="420" y="78" text-anchor="end" font-size="9" fill="#555">Writable (Container)</text>

  <!-- Arrow -->
  <text x="250" y="108" text-anchor="middle" font-size="16" fill="#999">▲ built on top of</text>

  <!-- Layer 4 - npm packages -->
  <rect x="100" y="115" width="300" height="40" rx="6" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
  <text x="250" y="132" text-anchor="middle" font-size="12" fill="#1b5e20">npm dependencies Layer</text>
  <text x="250" y="147" text-anchor="middle" font-size="10" fill="#388e3c">node_modules/</text>

  <!-- Layer 3 - Node.js -->
  <rect x="100" y="162" width="300" height="40" rx="6" fill="#bbdefb" stroke="#1565c0" stroke-width="1.5"/>
  <text x="250" y="179" text-anchor="middle" font-size="12" fill="#0d47a1">Node.js Runtime Layer</text>
  <text x="250" y="194" text-anchor="middle" font-size="10" fill="#1565c0">node, npm binaries</text>

  <!-- Layer 2 - OS utilities -->
  <rect x="100" y="209" width="300" height="40" rx="6" fill="#e1bee7" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="250" y="226" text-anchor="middle" font-size="12" fill="#4a148c">OS Utilities Layer</text>
  <text x="250" y="241" text-anchor="middle" font-size="10" fill="#6a1b9a">curl, bash, apt packages</text>

  <!-- Layer 1 - Base OS -->
  <rect x="100" y="256" width="300" height="40" rx="6" fill="#ffe0b2" stroke="#e65100" stroke-width="1.5"/>
  <text x="250" y="273" text-anchor="middle" font-size="12" fill="#bf360c">Base OS Layer</text>
  <text x="250" y="288" text-anchor="middle" font-size="10" fill="#e65100">ubuntu:22.04 (slim)</text>

  <!-- Read-only label -->
  <rect x="30" y="115" width="60" height="185" rx="4" fill="#ffecb3" stroke="#ffc107" stroke-width="1"/>
  <text x="60" y="195" text-anchor="middle" font-size="10" fill="#f57f17" transform="rotate(-90, 60, 195)">READ-ONLY (Image)</text>

  <!-- Bottom note -->
  <text x="250" y="330" text-anchor="middle" font-size="10" fill="#777">Each layer is cached — unchanged layers are reused across builds</text>
</svg>
```

**Why layers matter:**
- Layers are **cached** — if a layer doesn't change, Docker reuses it
- Speeds up builds dramatically
- Multiple images can share identical base layers, saving disk space

---

### 📋 Key Image Commands

```bash
# Pull an image from Docker Hub
docker pull nginx
docker pull node:18
docker pull ubuntu:22.04

# List all local images
docker images
# or
docker image ls

# Remove an image
docker rmi nginx
docker image rm nginx

# Remove all unused images
docker image prune

# View image layer history
docker history node:18

# Inspect image details
docker inspect nginx

# Search for images on Docker Hub
docker search nginx

# Pull a specific version (tag)
docker pull node:18-alpine
docker pull postgres:15.2
```

---

### 🏷️ Understanding Image Tags

```bash
# Format: repository:tag
nginx           # same as nginx:latest
nginx:latest    # latest stable version
nginx:1.25      # specific version
node:18         # Node.js 18.x
node:18-alpine  # Node.js 18 on Alpine Linux (tiny!)
node:18-slim    # Node.js 18, reduced size
```

> **💡 Tip:** Always use specific version tags in production (`node:18.17.0`, not `node:latest`) to avoid unexpected updates breaking your app.

---

### 🌟 Official vs Community Images

| Type | Example | Description |
|------|---------|-------------|
| Official | `nginx`, `node`, `postgres` | Maintained by Docker/vendor |
| Verified Publisher | `bitnami/nginx` | Trusted companies |
| Community | `username/myapp` | Individual users |

---

### ⚠️ Common Mistakes with Images

- Using `latest` tag in production — always use specific versions
- Pulling huge images when Alpine variants exist (e.g., `node:18-alpine` is ~50MB vs `node:18` at ~1GB)
- Forgetting to `docker image prune` — unused images pile up fast

---

## 6. Docker Containers

### 🚀 What is a Container (Running)?

If an image is a recipe, then a **container is the cooked meal**.

A container is a **running instance of an image**. You can run multiple containers from the same image, just like cooking the same recipe multiple times.

---

### 🕹️ Core Container Commands

```bash
# === CREATING AND RUNNING ===

# Run a container (creates + starts)
docker run nginx

# Run with a custom name
docker run --name my-nginx nginx

# Run in detached mode (background)
docker run -d nginx

# Run interactively (with terminal)
docker run -it ubuntu bash

# Run and auto-remove when stopped
docker run --rm nginx

# === LISTING CONTAINERS ===

# List running containers
docker ps

# List ALL containers (including stopped)
docker ps -a
docker ps --all

# === STARTING / STOPPING ===

# Stop a running container
docker stop my-nginx

# Start a stopped container
docker start my-nginx

# Restart a container
docker restart my-nginx

# Pause a container
docker pause my-nginx

# Unpause a container
docker unpause my-nginx

# === REMOVING ===

# Remove a stopped container
docker rm my-nginx

# Force remove a running container
docker rm -f my-nginx

# Remove all stopped containers
docker container prune

# === INSPECTING ===

# View container details
docker inspect my-nginx

# View running processes inside container
docker top my-nginx
```

---

### 🔍 Understanding `docker ps` Output

```bash
docker ps
```

```
CONTAINER ID   IMAGE    COMMAND                  CREATED         STATUS         PORTS                  NAMES
a3f5b2c1d4e8   nginx    "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:80->80/tcp     my-nginx
```

| Column | Meaning |
|--------|---------|
| CONTAINER ID | Unique short ID of the container |
| IMAGE | Image used to create the container |
| COMMAND | Process running inside the container |
| CREATED | When the container was created |
| STATUS | Current state (Up, Exited, Paused) |
| PORTS | Port mappings (host:container) |
| NAMES | Human-readable name |

---

### 🔄 Container Lifecycle Example

```bash
# 1. Create and run nginx
docker run -d --name web nginx

# 2. Check it's running
docker ps

# 3. Stop it
docker stop web

# 4. See it in stopped state
docker ps -a

# 5. Start it again
docker start web

# 6. Remove it (must be stopped first)
docker stop web
docker rm web

# Or force remove while running
docker rm -f web
```

---

### ⚠️ Common Container Mistakes

- Forgetting `-d` and blocking your terminal
- Running `docker rm` on a running container without `-f`
- Accumulating stopped containers — always clean up with `docker container prune`

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

## 8. Port Mapping

### 🌐 What is Port Mapping?

Containers are **isolated** — they have their own network. Your host machine can't access a container's internal ports unless you explicitly map them.

**Analogy:** Imagine your app is in an office building (container). The building has internal room numbers (container ports). Port mapping is like the reception desk — it says "if someone calls extension 8080 from outside (host port), connect them to room 80 inside (container port)."

---

### 🔌 Port Mapping Syntax

```bash
docker run -p HOST_PORT:CONTAINER_PORT image
```

```bash
# Host port 8080 → Container port 80
docker run -p 8080:80 nginx

# Access via: http://localhost:8080

# Same port on both
docker run -p 3000:3000 my-node-app

# Multiple ports
docker run -p 80:80 -p 443:443 nginx

# All interfaces on host
docker run -p 0.0.0.0:8080:80 nginx

# Specific interface only
docker run -p 127.0.0.1:8080:80 nginx
```

---

### 🗺️ Port Mapping Flow Diagram

```svg
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="700" height="280" fill="#f0f4f8" rx="12"/>
  <text x="350" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Port Mapping: Host ↔ Container</text>

  <!-- User/Browser -->
  <rect x="20" y="80" width="130" height="80" rx="10" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="85" y="112" text-anchor="middle" font-size="22">🌐</text>
  <text x="85" y="135" text-anchor="middle" font-size="12" fill="#1565c0">Browser</text>
  <text x="85" y="150" text-anchor="middle" font-size="10" fill="#555">localhost:8080</text>

  <!-- Arrow 1 -->
  <line x1="152" y1="120" x2="210" y2="120" stroke="#607d8b" stroke-width="2.5"/>
  <polygon points="210,114 222,120 210,126" fill="#607d8b"/>
  <text x="181" y="110" text-anchor="middle" font-size="10" fill="#607d8b">:8080</text>

  <!-- Host Machine Box -->
  <rect x="222" y="50" width="220" height="160" rx="10" fill="#fff8e1" stroke="#f57f17" stroke-width="2"/>
  <text x="332" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">Host Machine</text>
  <rect x="242" y="85" width="180" height="50" rx="6" fill="#ffe082" stroke="#f9a825" stroke-width="1"/>
  <text x="332" y="108" text-anchor="middle" font-size="11" fill="#e65100">Host Port: 8080</text>
  <text x="332" y="125" text-anchor="middle" font-size="9" fill="#777">0.0.0.0:8080</text>

  <!-- Port mapping label -->
  <text x="332" y="160" text-anchor="middle" font-size="11" fill="#f57f17">-p 8080:80</text>
  <text x="332" y="177" text-anchor="middle" font-size="9" fill="#777">maps to →</text>
  <text x="332" y="195" text-anchor="middle" font-size="9" fill="#777">container port 80</text>

  <!-- Arrow 2 -->
  <line x1="444" y1="120" x2="500" y2="120" stroke="#607d8b" stroke-width="2.5"/>
  <polygon points="500,114 512,120 500,126" fill="#607d8b"/>
  <text x="472" y="110" text-anchor="middle" font-size="10" fill="#607d8b">:80</text>

  <!-- Container Box -->
  <rect x="512" y="50" width="168" height="160" rx="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="596" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">Container</text>
  <rect x="527" y="85" width="138" height="50" rx="6" fill="#a5d6a7" stroke="#388e3c" stroke-width="1"/>
  <text x="596" y="105" text-anchor="middle" font-size="11" fill="#1b5e20">Nginx Server</text>
  <text x="596" y="123" text-anchor="middle" font-size="11" fill="#1b5e20">Port: 80</text>

  <rect x="527" y="145" width="138" height="40" rx="6" fill="#c8e6c9"/>
  <text x="596" y="165" text-anchor="middle" font-size="10" fill="#1b5e20">Serves HTML/CSS</text>
  <text x="596" y="180" text-anchor="middle" font-size="9" fill="#388e3c">isolated network</text>

  <!-- Bottom explanation -->
  <text x="350" y="240" text-anchor="middle" font-size="11" fill="#555">User → localhost:8080 → Host listens → Routes to container:80 → Nginx responds</text>
  <text x="350" y="258" text-anchor="middle" font-size="10" fill="#888">Without -p flag, container port 80 is unreachable from host</text>
</svg>
```

---

### 🌐 Real-World Port Mapping Examples

```bash
# Nginx (web server)
docker run -d -p 8080:80 nginx
# → Access at http://localhost:8080

# Node.js app
docker run -d -p 3000:3000 node:18
# → Access at http://localhost:3000

# MongoDB
docker run -d -p 27017:27017 mongo
# → Connect at mongodb://localhost:27017

# PostgreSQL
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secret postgres
# → Connect at postgresql://localhost:5432

# Redis
docker run -d -p 6379:6379 redis
# → Connect at redis://localhost:6379

# Multiple services (different host ports)
docker run -d -p 8080:80 nginx        # Web → localhost:8080
docker run -d -p 5432:5432 postgres   # DB  → localhost:5432
docker run -d -p 6379:6379 redis      # Cache → localhost:6379
```

---

### ⚠️ Port Conflict Error

```bash
docker run -p 8080:80 nginx
# Error: bind: address already in use
# Solution: use a different host port
docker run -p 8081:80 nginx
```

---

## 9. Docker Volumes

### 💾 What is a Volume?

**Problem:** When a container is deleted, all data inside it is gone forever.

**Analogy:** A container is like a hotel room. When you check out, the room is cleaned — everything left behind is gone. A volume is like a storage locker outside the hotel — you can store things there, check out, and come back later to retrieve them.

Volumes solve **data persistence** in Docker.

---

### 📦 Types of Storage in Docker

| Type | Description | Use Case |
|------|-------------|----------|
| **Named Volume** | Docker manages the storage location | Databases, persistent data |
| **Bind Mount** | You specify the exact host path | Development (sync code) |
| **Anonymous Volume** | Docker manages, no name | Temporary, discarded after use |
| **tmpfs Mount** | Stored in host memory only | Sensitive temporary data |

---

### 💽 Storage Diagram

```svg
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="700" height="320" fill="#f8f9fa" rx="12"/>
  <text x="350" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Storage Types</text>

  <!-- Host Machine -->
  <rect x="20" y="50" width="660" height="250" rx="10" fill="#fff8e1" stroke="#f57f17" stroke-width="2"/>
  <text x="350" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">Host Machine Filesystem</text>

  <!-- Named Volume -->
  <rect x="40" y="88" width="180" height="100" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">Named Volume</text>
  <text x="130" y="128" text-anchor="middle" font-size="10" fill="#388e3c">/var/lib/docker/volumes/</text>
  <text x="130" y="144" text-anchor="middle" font-size="10" fill="#388e3c">my-data/_data</text>
  <rect x="55" y="155" width="150" height="24" rx="4" fill="#a5d6a7"/>
  <text x="130" y="172" text-anchor="middle" font-size="10" fill="#1b5e20">Docker Managed ✓</text>

  <!-- Bind Mount -->
  <rect x="255" y="88" width="180" height="100" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="345" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#0d47a1">Bind Mount</text>
  <text x="345" y="128" text-anchor="middle" font-size="10" fill="#1565c0">/home/user/myapp</text>
  <text x="345" y="144" text-anchor="middle" font-size="10" fill="#1565c0">(your chosen path)</text>
  <rect x="270" y="155" width="150" height="24" rx="4" fill="#90caf9"/>
  <text x="345" y="172" text-anchor="middle" font-size="10" fill="#0d47a1">You Control Path ✓</text>

  <!-- Anonymous Volume -->
  <rect x="470" y="88" width="180" height="100" rx="8" fill="#fce4ec" stroke="#880e4f" stroke-width="1.5"/>
  <text x="560" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#880e4f">Anonymous Vol</text>
  <text x="560" y="128" text-anchor="middle" font-size="10" fill="#880e4f">/var/lib/docker/volumes/</text>
  <text x="560" y="144" text-anchor="middle" font-size="10" fill="#880e4f">a3b4c5d6.../_data</text>
  <rect x="485" y="155" width="150" height="24" rx="4" fill="#f48fb1"/>
  <text x="560" y="172" text-anchor="middle" font-size="10" fill="#880e4f">Random ID (Temporary)</text>

  <!-- Container -->
  <rect x="200" y="215" width="300" height="60" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2"/>
  <text x="350" y="240" text-anchor="middle" font-size="12" font-weight="bold" fill="#4a148c">Container</text>
  <text x="350" y="258" text-anchor="middle" font-size="10" fill="#6a1b9a">/data  /app  /tmp</text>

  <!-- Arrows from volumes to container -->
  <line x1="130" y1="190" x2="250" y2="225" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="345" y1="190" x2="345" y2="213" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="560" y1="190" x2="450" y2="225" stroke="#880e4f" stroke-width="1.5" stroke-dasharray="5,3"/>
</svg>
```

---

### 🔧 Volume Commands

```bash
# === NAMED VOLUMES ===

# Create a named volume
docker volume create my-data

# List all volumes
docker volume ls

# Inspect a volume
docker volume inspect my-data

# Remove a volume
docker volume rm my-data

# Remove all unused volumes
docker volume prune

# Use a named volume when running a container
docker run -v my-data:/data/db mongo

# === BIND MOUNTS ===

# Mount current directory into container
docker run -v $(pwd):/app node:18

# Mount specific host path
docker run -v /home/user/myapp:/app node:18

# Read-only bind mount
docker run -v $(pwd):/app:ro node:18

# === ANONYMOUS VOLUMES ===

# Docker creates a random volume
docker run -v /data mongo
```

---

### 💡 Real-World Volume Use Case

```bash
# Run PostgreSQL with persistent data
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=myapp \
  -v postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15

# Even if you delete and recreate the container, data persists:
docker rm -f postgres-db
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=secret \
  -v postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15
# ✅ Your database data is still there!
```

---

## 10. Docker Networks

### 🌐 What is Docker Networking?

By default, containers are isolated. Docker networking lets containers communicate with each other and with the outside world.

**Analogy:** Think of Docker networks like office floors. Containers on the same network (floor) can talk freely. Containers on different networks (floors) can't talk unless you set up a connection.

---

### 🕸️ Network Types

| Network Driver | Description | Use Case |
|---------------|-------------|----------|
| `bridge` | Default, isolated network | Single-host container communication |
| `host` | Container shares host network | High performance, Linux only |
| `none` | No networking | Maximum isolation |
| `overlay` | Multi-host networking | Docker Swarm, Kubernetes |
| `macvlan` | Container gets own MAC address | Legacy apps needing direct network access |

---

### 🗺️ Network Diagram

```svg
<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="700" height="360" fill="#f0f4f8" rx="12"/>
  <text x="350" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Bridge Network Communication</text>

  <!-- Internet -->
  <ellipse cx="350" cy="65" rx="80" ry="30" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="350" y="70" text-anchor="middle" font-size="13">🌍 Internet</text>

  <!-- Host Machine -->
  <rect x="50" y="115" width="600" height="225" rx="10" fill="#fff8e1" stroke="#f57f17" stroke-width="2"/>
  <text x="350" y="137" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">Host Machine</text>

  <!-- Bridge Network -->
  <rect x="80" y="150" width="540" height="170" rx="8" fill="#e8f5e9" stroke="#388e3c" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="350" y="170" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">my-bridge-network (172.18.0.0/16)</text>

  <!-- Container 1: Web App -->
  <rect x="100" y="180" width="150" height="120" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="175" y="202" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">web-app</text>
  <text x="175" y="218" text-anchor="middle" font-size="10" fill="#388e3c">Node.js API</text>
  <text x="175" y="234" text-anchor="middle" font-size="10" fill="#555">IP: 172.18.0.2</text>
  <text x="175" y="250" text-anchor="middle" font-size="10" fill="#555">Port: 3000</text>
  <rect x="115" y="260" width="120" height="25" rx="4" fill="#a5d6a7"/>
  <text x="175" y="277" text-anchor="middle" font-size="10" fill="#1b5e20">-p 3000:3000</text>

  <!-- Container 2: Database -->
  <rect x="280" y="180" width="150" height="120" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="355" y="202" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">mongodb</text>
  <text x="355" y="218" text-anchor="middle" font-size="10" fill="#388e3c">MongoDB</text>
  <text x="355" y="234" text-anchor="middle" font-size="10" fill="#555">IP: 172.18.0.3</text>
  <text x="355" y="250" text-anchor="middle" font-size="10" fill="#555">Port: 27017</text>
  <rect x="295" y="260" width="120" height="25" rx="4" fill="#a5d6a7"/>
  <text x="355" y="277" text-anchor="middle" font-size="10" fill="#1b5e20">no external port</text>

  <!-- Container 3: Redis -->
  <rect x="460" y="180" width="140" height="120" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="530" y="202" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">redis-cache</text>
  <text x="530" y="218" text-anchor="middle" font-size="10" fill="#388e3c">Redis</text>
  <text x="530" y="234" text-anchor="middle" font-size="10" fill="#555">IP: 172.18.0.4</text>
  <text x="530" y="250" text-anchor="middle" font-size="10" fill="#555">Port: 6379</text>
  <rect x="475" y="260" width="110" height="25" rx="4" fill="#a5d6a7"/>
  <text x="530" y="277" text-anchor="middle" font-size="10" fill="#1b5e20">internal only</text>

  <!-- Communication arrows inside network -->
  <line x1="250" y1="240" x2="280" y2="240" stroke="#2e7d32" stroke-width="1.5"/>
  <polygon points="278,235 288,240 278,245" fill="#2e7d32"/>
  <text x="265" y="232" text-anchor="middle" font-size="9" fill="#2e7d32">connect by name</text>

  <line x1="430" y1="240" x2="460" y2="240" stroke="#2e7d32" stroke-width="1.5"/>
  <polygon points="458,235 468,240 458,245" fill="#2e7d32"/>

  <!-- External access arrow -->
  <line x1="350" y1="95" x2="350" y2="113" stroke="#1565c0" stroke-width="2"/>
  <polygon points="344,111 350,123 356,111" fill="#1565c0"/>
  <text x="370" y="108" font-size="9" fill="#1565c0">:3000 exposed</text>
</svg>
```

---

### 🔧 Network Commands

```bash
# List all networks
docker network ls

# Create a custom bridge network
docker network create my-network

# Create with custom subnet
docker network create --subnet=172.20.0.0/16 my-network

# Run container on specific network
docker run --network my-network --name web nginx

# Connect existing container to a network
docker network connect my-network my-container

# Disconnect from network
docker network disconnect my-network my-container

# Inspect network details
docker network inspect my-network

# Remove unused networks
docker network prune

# Remove specific network
docker network rm my-network
```

---

### 📡 Container-to-Container Communication

On the same custom network, containers can reach each other by **name**:

```bash
# Create network
docker network create app-network

# Start MongoDB
docker run -d --name mongodb --network app-network mongo

# Start Node.js app — it can connect to "mongodb" by name!
docker run -d \
  --name api \
  --network app-network \
  -e MONGO_URL=mongodb://mongodb:27017/mydb \
  my-node-app

# Inside the API container, use: mongodb://mongodb:27017
# Docker's DNS resolves "mongodb" to the container's IP automatically
```

> **💡 Key Insight:** Use custom networks (not the default bridge). On custom networks, Docker automatically provides DNS resolution by container name.

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

## 15. Real Project Examples

### 🌐 Project 1: Running Nginx Web Server

```bash
# Step 1: Pull and run Nginx
docker run -d \
  --name my-website \
  -p 8080:80 \
  nginx

# Step 2: Open http://localhost:8080 in browser
# You'll see the Nginx welcome page!

# Step 3: Serve your own HTML
docker run -d \
  --name my-website \
  -p 8080:80 \
  -v $(pwd)/html:/usr/share/nginx/html \
  nginx

# Create html/index.html:
echo "<h1>Hello from Docker!</h1>" > html/index.html

# Step 4: View logs
docker logs -f my-website

# Step 5: Clean up
docker stop my-website && docker rm my-website
```

---

### 🗄️ Project 2: Running MongoDB

```bash
# Step 1: Run MongoDB with authentication
docker run -d \
  --name my-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -v mongo-data:/data/db \
  mongo:6

# Step 2: Connect via MongoDB shell
docker exec -it my-mongo mongosh \
  -u admin \
  -p password123 \
  --authenticationDatabase admin

# Step 3: Create a database and collection
use myapp
db.users.insertOne({ name: "Alice", email: "alice@example.com" })
db.users.find()

# Step 4: Connect from your app (Node.js)
# Connection string: mongodb://admin:password123@localhost:27017/myapp?authSource=admin

# Clean up (data persists in mongo-data volume)
docker stop my-mongo && docker rm my-mongo
```

---

### ⚡ Project 3: Running Redis

```bash
# Step 1: Run Redis
docker run -d \
  --name my-redis \
  -p 6379:6379 \
  redis:7 \
  redis-server --requirepass mypassword

# Step 2: Access Redis CLI
docker exec -it my-redis redis-cli -a mypassword

# Step 3: Basic Redis commands
AUTH mypassword
SET name "Alice"
GET name
SETEX session:123 3600 "user_data"
TTL session:123

# Step 4: Test from Node.js
# const redis = require('redis');
# const client = redis.createClient({ url: 'redis://:mypassword@localhost:6379' });

# Clean up
docker stop my-redis && docker rm my-redis
```

---

### 🟢 Project 4: Running a Node.js App

```bash
# Step 1: Create a simple Node.js app
mkdir my-node-app && cd my-node-app

# app.js
cat > app.js << 'EOF'
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`<h1>Hello from Docker! Running on port ${port}</h1>`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
EOF

# Step 2: Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]
EOF

# Step 3: Build the image
docker build -t my-node-app .

# Step 4: Run the container
docker run -d \
  --name node-server \
  -p 3000:3000 \
  -e PORT=3000 \
  my-node-app

# Step 5: Test it
curl http://localhost:3000

# Step 6: View logs
docker logs node-server

# Clean up
docker stop node-server && docker rm node-server
docker rmi my-node-app
```

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

## 17. Common Mistakes Beginners Make

### ❌ Mistake 1: Not Naming Containers

```bash
# Bad: random names like "nervous_darwin"
docker run -d nginx

# Good: meaningful names
docker run -d --name web-server nginx
```

---

### ❌ Mistake 2: Using `latest` in Production

```bash
# Bad: unpredictable updates
docker run node:latest

# Good: pin to specific version
docker run node:18.17.0-alpine3.18
```

---

### ❌ Mistake 3: Storing Data Inside Containers

```bash
# Bad: data lost when container is removed!
docker run -d mongo

# Good: use a volume
docker run -d -v mongo-data:/data/db mongo
```

---

### ❌ Mistake 4: Port Conflicts

```bash
# Error: port 8080 already in use
docker run -p 8080:80 nginx

# Fix: check what's using the port
lsof -i :8080                    # macOS/Linux
netstat -ano | findstr :8080     # Windows

# Or use a different host port
docker run -p 8081:80 nginx
```

---

### ❌ Mistake 5: Massive Image Sizes

```bash
# Bad: full OS image (~1GB)
FROM ubuntu:22.04
RUN apt-get install nodejs

# Good: use official slim/alpine images (~50MB)
FROM node:18-alpine
```

---

### ❌ Mistake 6: Forgetting `.dockerignore`

Without `.dockerignore`, your `node_modules` (often 500MB+) gets copied into the build context.

```bash
# Create .dockerignore
cat > .dockerignore << 'EOF'
node_modules
.git
.env
*.log
dist
build
.DS_Store
EOF
```

---

### ❌ Mistake 7: Not Cleaning Up

```bash
# Accumulated stopped containers, images, volumes eat disk space!
# Check disk usage:
docker system df

# Full cleanup (use carefully!):
docker system prune -a --volumes

# Safer: clean specific resources
docker container prune
docker image prune
docker volume prune
docker network prune
```

---

### ❌ Mistake 8: Running as Root Inside Containers

```bash
# Bad: container runs as root by default (security risk)
FROM node:18-alpine
CMD ["node", "app.js"]

# Good: create and use a non-root user
FROM node:18-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
CMD ["node", "app.js"]
```

---

## 18. Best Practices

### ✅ 1. Use Small Base Images

```dockerfile
# Use Alpine or slim variants
FROM node:18-alpine        # ~50MB
# instead of
FROM node:18               # ~900MB

# Use distroless for production
FROM gcr.io/distroless/nodejs18-debian11
```

---

### ✅ 2. Leverage Layer Caching

```dockerfile
# Bad: copies everything first (cache busted on ANY change)
COPY . .
RUN npm install

# Good: copy package.json first (npm install cached unless deps change)
COPY package*.json ./
RUN npm install
COPY . .
```

---

### ✅ 3. One Process Per Container

```bash
# Bad: run Nginx + MongoDB + Redis in one container
# Good: separate containers for each service

docker run -d --name web nginx
docker run -d --name db mongo
docker run -d --name cache redis
```

---

### ✅ 4. Use `.dockerignore`

```
node_modules
.git
.env
*.log
dist
build
coverage
.DS_Store
```

---

### ✅ 5. Use Specific Tags

```dockerfile
# Bad
FROM node:latest

# Good
FROM node:18.17.0-alpine3.18
```

---

### ✅ 6. Set Resource Limits

```bash
# Limit CPU and memory to prevent runaway containers
docker run \
  --memory="256m" \
  --cpus="0.5" \
  my-app
```

---

### ✅ 7. Use Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

---

### ✅ 8. Keep Secrets Out of Images

```bash
# Never do this in Dockerfile:
ENV DB_PASSWORD=mysecret

# Use --env-file or Docker Secrets instead
docker run --env-file .env my-app
```

---

### ✅ 9. Regular Cleanup

```bash
# Add to your routine:
docker system prune          # Remove unused resources
docker image prune -a        # Remove all unused images
```

---

### ✅ 10. Use Multi-Stage Builds (Bonus)

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage (tiny!)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

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

## 20. Summary

### 🏆 Key Takeaways

| Concept | What to Remember |
|---------|-----------------|
| **Container** | Lightweight, isolated, portable runtime unit |
| **Image** | Read-only template built in layers |
| **Dockerfile** | Instructions to build an image |
| **Volume** | Persistent storage outside containers |
| **Network** | How containers communicate |
| **Docker Hub** | Public registry for images |
| **Port mapping** | `-p HOST:CONTAINER` exposes container ports |
| **Env variables** | Configure containers at runtime with `-e` |

---

### 🗺️ Your Docker Learning Roadmap

```
BEGINNER
│
├── ✅ Understand containers vs VMs
├── ✅ Install Docker
├── ✅ Run pre-built images (nginx, mongodb, redis)
├── ✅ Understand images, containers, tags
├── ✅ Port mapping and volumes
├── ✅ Basic CLI commands
│
INTERMEDIATE
│
├── 📝 Write your first Dockerfile
├── 📝 Build custom images
├── 📝 Multi-stage builds
├── 📝 Docker Compose (multi-container apps)
├── 📝 Docker networking deep dive
├── 📝 Docker secrets and security
│
ADVANCED
│
├── 🚀 Container orchestration (Kubernetes)
├── 🚀 Docker Swarm
├── 🚀 CI/CD with Docker (GitHub Actions, Jenkins)
├── 🚀 Private registries (ECR, GCR, Harbor)
├── 🚀 Container monitoring (Prometheus, Grafana)
├── 🚀 Security scanning (Trivy, Snyk)
```

---

### 📚 Next Topics to Learn

1. **Dockerfile** — Write your own image definitions
2. **Docker Compose** — Orchestrate multiple containers with one YAML file
3. **Multi-Stage Builds** — Create tiny production images
4. **Docker Swarm** — Basic container orchestration
5. **Kubernetes** — Production-grade container orchestration
6. **CI/CD Integration** — Automate Docker builds in pipelines

---

### 🔑 Most Important Commands to Memorize

```bash
docker run -d -p 8080:80 --name web nginx     # Run container
docker ps -a                                   # List all containers
docker logs -f web                             # Follow logs
docker exec -it web sh                         # Enter container
docker stop web && docker rm web               # Stop and remove
docker images                                  # List images
docker pull node:18-alpine                     # Download image
docker volume create mydata                    # Create volume
docker network create mynet                    # Create network
docker system prune                            # Clean up resources
```

---

> **🎉 Congratulations!** You've completed Docker Fundamentals. You now understand why Docker exists, how it works under the hood, and how to use it effectively for real-world projects. Keep practicing by containerizing your own projects — that's the fastest way to master Docker.

---

*Documentation version: 1.0 | Last updated: 2025 | Covers Docker Engine 24.x+*
