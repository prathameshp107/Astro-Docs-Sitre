---
title: "Docker Security"
description: "<rect x=\"40\" y=\"45\" width=\"520\" height=\"52\" rx=\"8\" fill=\"e8f5e9\" stroke=\"2e7d32\" stroke-width=\"1.5\"/ <text x=\"300\" y=\"68\" text-anchor=\"middle\" font-size=\"1"
sidebar:
  order: 108
---

## 8. Docker Security

### 🔐 Security Layers in Docker

```xml
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="600" height="320" fill="#f8f9fa" rx="10"/>
  <text x="300" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Security Layers</text>

  <rect x="40" y="45"  width="520" height="52" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="300" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">🏗️ Build Security — Minimal base images, multi-stage, no secrets</text>
  <text x="300" y="85" text-anchor="middle" font-size="10" fill="#555">FROM node:18-alpine | .dockerignore | ARG not ENV for build secrets</text>

  <rect x="70" y="108" width="460" height="52" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="300" y="131" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565c0">👤 Runtime Security — Non-root user, read-only filesystem</text>
  <text x="300" y="148" text-anchor="middle" font-size="10" fill="#555">USER node | --read-only | --cap-drop ALL | --security-opt no-new-privileges</text>

  <rect x="100" y="171" width="400" height="52" rx="8" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="300" y="194" text-anchor="middle" font-size="12" font-weight="bold" fill="#e65100">🌐 Network Security — Isolated networks, no unnecessary ports</text>
  <text x="300" y="211" text-anchor="middle" font-size="10" fill="#555">internal: true | expose only needed ports | network segmentation</text>

  <rect x="130" y="234" width="340" height="52" rx="8" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="300" y="257" text-anchor="middle" font-size="12" font-weight="bold" fill="#6a1b9a">🔑 Secrets Security — Docker secrets, env files, vault</text>
  <text x="300" y="274" text-anchor="middle" font-size="10" fill="#555">docker secret | --env-file | HashiCorp Vault | never hardcode</text>
</svg>
```

---

### 👤 Running as Non-Root

```dockerfile
# Alpine Linux
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Ubuntu/Debian
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser

# Use existing node user (node:alpine images include it)
USER node
```

---

### 🔍 Image Scanning

```bash
# Docker Scout (built into Docker Desktop)
docker scout cves nginx:latest
docker scout recommendations nginx:latest

# Trivy (open source, excellent)
trivy image node:18

# Snyk
snyk container test node:18

# Grype
grype node:18
```

---

### 🔐 Secrets Management

```bash
# ─── Docker Secrets (Swarm mode only) ────────────────────────
echo "mysecretpassword" | docker secret create db_password -
docker service create \
  --name api \
  --secret db_password \
  my-api-image
# Secret available at: /run/secrets/db_password

# ─── Runtime secrets via env file (never commit!) ─────────────
docker run --env-file .env.production my-app

# ─── Build secrets (never stored in layers) ───────────────────
# syntax=docker/dockerfile:1
FROM node:18-alpine
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm install
# Build with:
# docker build --secret id=npmrc,src=.npmrc .
```

---

### 🛡️ Security Hardening at Runtime

```bash
docker run \
  --read-only \                        # Read-only root filesystem
  --tmpfs /tmp \                       # Writable tmp in memory
  --cap-drop ALL \                     # Drop all Linux capabilities
  --cap-add NET_BIND_SERVICE \         # Add back only what's needed
  --security-opt no-new-privileges \   # Prevent privilege escalation
  --security-opt seccomp=default \     # Seccomp filtering
  --memory="256m" \                    # Memory limit
  --cpus="0.5" \                       # CPU limit
  --pids-limit 100 \                   # Limit process count
  my-app
```

---

### ✅ Security Checklist

| Check | Command / Practice |
|-------|--------------------|
| Non-root user | `USER node` in Dockerfile |
| Scan for CVEs | `trivy image myapp:latest` |
| No secrets in image | Audit with `docker history` |
| Minimal base image | Use `alpine` or `distroless` |
| Read-only filesystem | `--read-only` flag |
| Drop capabilities | `--cap-drop ALL` |
| Resource limits | `--memory --cpus` |
| Up-to-date base image | Rebuild images regularly |
| Network isolation | `internal: true` networks |
| .dockerignore set | Exclude `.env`, `.git` |

---
