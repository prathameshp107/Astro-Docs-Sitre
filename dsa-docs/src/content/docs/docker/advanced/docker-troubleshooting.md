---
title: "Docker Troubleshooting"
description: "<!-- Start -- <ellipse cx=\"340\" cy=\"60\" rx=\"100\" ry=\"25\" fill=\"e3f2fd\" stroke=\"1565c0\" stroke-width=\"2\"/ <text x=\"340\" y=\"65\" text-anchor=\"middle\" font-siz"
sidebar:
  order: 116
---

## 15. Docker Troubleshooting

### 🔍 Debugging Flowchart

```xml
<svg viewBox="0 0 680 500" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="680" height="500" fill="#f8f9fa" rx="10"/>
  <text x="340" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Container Troubleshooting Flowchart</text>
  <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#607d8b"/></marker></defs>

  <!-- Start -->
  <ellipse cx="340" cy="60" rx="100" ry="25" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="340" y="65" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">Container Problem?</text>

  <line x1="340" y1="87" x2="340" y2="112" stroke="#607d8b" stroke-width="1.5" marker-end="url(#fa)"/>

  <!-- Check logs -->
  <rect x="220" y="115" width="240" height="40" rx="7" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="340" y="133" text-anchor="middle" font-size="11" font-weight="bold" fill="#e65100">Step 1: Check Logs</text>
  <text x="340" y="148" text-anchor="middle" font-size="9" fill="#777">docker logs --tail 100 my-container</text>

  <line x1="340" y1="157" x2="340" y2="182" stroke="#607d8b" stroke-width="1.5" marker-end="url(#fa)"/>

  <!-- Container running? -->
  <polygon points="340,185 460,220 340,255 220,220" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="340" y="217" text-anchor="middle" font-size="11" font-weight="bold" fill="#4a148c">Container</text>
  <text x="340" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#4a148c">Running?</text>

  <!-- YES path -->
  <line x1="460" y1="220" x2="540" y2="220" stroke="#2e7d32" stroke-width="1.5" marker-end="url(#fa)"/>
  <text x="500" y="213" text-anchor="middle" font-size="10" fill="#2e7d32">YES</text>
  <rect x="542" y="198" width="120" height="44" rx="7" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="602" y="217" text-anchor="middle" font-size="10" font-weight="bold" fill="#1b5e20">docker exec</text>
  <text x="602" y="232" text-anchor="middle" font-size="9" fill="#555">-it container sh</text>

  <!-- NO path -->
  <line x1="340" y1="255" x2="340" y2="280" stroke="#c62828" stroke-width="1.5" marker-end="url(#fa)"/>
  <text x="353" y="270" font-size="10" fill="#c62828">NO</text>
  <rect x="220" y="283" width="240" height="40" rx="7" fill="#ffebee" stroke="#c62828" stroke-width="1.5"/>
  <text x="340" y="301" text-anchor="middle" font-size="11" font-weight="bold" fill="#7f0000">Check Exit Code</text>
  <text x="340" y="316" text-anchor="middle" font-size="9" fill="#777">docker inspect --format '{{.State.ExitCode}}'</text>

  <line x1="340" y1="325" x2="340" y2="350" stroke="#607d8b" stroke-width="1.5" marker-end="url(#fa)"/>

  <!-- Exit codes -->
  <rect x="30"  y="353" width="150" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="105" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 1</text>
  <text x="105" y="389" text-anchor="middle" font-size="9" fill="#555">App error — check</text>
  <text x="105" y="402" text-anchor="middle" font-size="9" fill="#555">application logs</text>

  <rect x="195" y="353" width="150" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="270" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 137</text>
  <text x="270" y="389" text-anchor="middle" font-size="9" fill="#555">OOMKilled — increase</text>
  <text x="270" y="402" text-anchor="middle" font-size="9" fill="#555">--memory limit</text>

  <rect x="360" y="353" width="150" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="435" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 126</text>
  <text x="435" y="389" text-anchor="middle" font-size="9" fill="#555">Permission denied</text>
  <text x="435" y="402" text-anchor="middle" font-size="9" fill="#555">check USER + chmod</text>

  <rect x="525" y="353" width="130" height="55" rx="7" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="590" y="374" text-anchor="middle" font-size="10" font-weight="bold" fill="#e65100">Exit Code 0</text>
  <text x="590" y="389" text-anchor="middle" font-size="9" fill="#555">Process finished</text>
  <text x="590" y="402" text-anchor="middle" font-size="9" fill="#555">use CMD ["-f"] flag</text>

  <!-- Lines to exit codes -->
  <line x1="290" y1="351" x2="165" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="320" y1="351" x2="295" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="360" y1="351" x2="405" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="390" y1="351" x2="555" y2="353" stroke="#607d8b" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="340" y="478" text-anchor="middle" font-size="10" fill="#777">Pro tip: docker events --filter container=name gives real-time lifecycle events</text>
</svg>
```

---

### 🛠️ Common Issues and Fixes

**Problem 1: Container exits immediately**

```bash
# Diagnose
docker logs my-container
docker inspect my-container | grep '"ExitCode"'

# Common causes:
# - App crashes on startup (check logs for stack trace)
# - CMD process exits (use a foreground process)
# - Missing environment variable

# Wrong: process exits immediately
CMD ["npm", "run", "build"]   # Build command, not a server!

# Right: keep running
CMD ["node", "server.js"]
```

---

**Problem 2: Port already in use**

```bash
# Error: bind: address already in use
# Find what's using port 8080
lsof -i :8080               # macOS / Linux
netstat -ano | findstr 8080  # Windows

# Kill the process or use a different port
docker run -p 8081:80 nginx
```

---

**Problem 3: Permission denied on volume**

```bash
# Error: EACCES: permission denied, open '/app/data/file'
# The container user doesn't own the host directory

# Fix 1: Change ownership on host
sudo chown -R 1000:1000 ./data

# Fix 2: Set permissions in Dockerfile
RUN mkdir -p /app/data && chown node:node /app/data
USER node

# Fix 3: Use named volumes (Docker manages permissions)
docker run -v mydata:/app/data node-app
```

---

**Problem 4: Container can't connect to another container**

```bash
# Error: ECONNREFUSED connecting to mongodb:27017
# Containers are on different networks

# Check networks
docker inspect container1 | grep NetworkMode
docker inspect container2 | grep NetworkMode

# Fix: put both on same network
docker network create mynet
docker run --network mynet --name mongodb mongo
docker run --network mynet --name api my-api

# Or in docker-compose: both services must be in same network section
```

---

**Problem 5: Build fails with "no space left"**

```bash
# Check Docker disk usage
docker system df

# Full cleanup
docker system prune -a --volumes

# Increase Docker Desktop disk allocation:
# Docker Desktop → Settings → Resources → Disk Image Size
```

---

**Problem 6: Image build is slow**

```bash
# Check build context size (should be < 100MB)
du -sh .

# If large: update .dockerignore

# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker build .

# Or set in daemon config (/etc/docker/daemon.json):
{ "features": { "buildkit": true } }
```

---
