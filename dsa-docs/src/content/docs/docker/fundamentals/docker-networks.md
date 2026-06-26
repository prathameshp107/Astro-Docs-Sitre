---
title: "Docker Networks"
description: "By default, containers are isolated. Docker networking lets containers communicate with each other and with the outside world."
sidebar:
  order: 12
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

```xml
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
