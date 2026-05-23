---
title: "Docker Architecture"
description: "Docker uses a client-server architecture:"
sidebar:
  order: 3
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

```xml
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
