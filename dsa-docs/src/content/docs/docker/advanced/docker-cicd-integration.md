---
title: "Docker CI/CD Integration"
description: "on: push: branches: [main, develop] pullrequest: branches: [main]"
sidebar:
  order: 111
---

## 11. Docker CI/CD Integration

### 🔄 GitHub Actions — Build, Test, Push

```yaml
# .github/workflows/docker.yml
name: Docker CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      # ── Checkout code ──────────────────────────────
      - name: Checkout
        uses: actions/checkout@v4

      # ── Setup Docker Buildx (multi-platform) ───────
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # ── Login to GitHub Container Registry ─────────
      - name: Log in to GHCR
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      # ── Extract metadata (tags, labels) ────────────
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}

      # ── Build and push ──────────────────────────────
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha          # GitHub Actions cache
          cache-to: type=gha,mode=max

      # ── Scan for vulnerabilities ────────────────────
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          format: sarif
          output: trivy-results.sarif

      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: trivy-results.sarif
```

---

### 🚀 Full Deploy Pipeline (Build → Test → Push → Deploy)

```yaml
# .github/workflows/deploy.yml
name: Build, Test, and Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests in Docker
        run: |
          docker compose -f docker-compose.test.yml up \
            --abort-on-container-exit \
            --exit-code-from api

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      image-tag: ${{ steps.meta.outputs.version }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: type=sha,prefix=

      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            docker compose pull
            docker compose up -d --no-deps api
            docker image prune -f
```

---

### 🔁 CI/CD Pipeline Diagram

```xml
<svg viewBox="0 0 720 130" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="720" height="130" fill="#f8f9fa" rx="10"/>
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#222">CI/CD Pipeline</text>
  <defs><marker id="ca" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#607d8b"/></marker></defs>

  <rect x="15"  y="40" width="100" height="50" rx="7" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="65"  y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">📝 Code</text>
  <text x="65"  y="80" text-anchor="middle" font-size="9"  fill="#555">git push</text>

  <rect x="135" y="40" width="100" height="50" rx="7" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="185" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#f57f17">🧪 Test</text>
  <text x="185" y="80" text-anchor="middle" font-size="9"  fill="#555">unit + integration</text>

  <rect x="255" y="40" width="100" height="50" rx="7" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5"/>
  <text x="305" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#6a1b9a">🐳 Build</text>
  <text x="305" y="80" text-anchor="middle" font-size="9"  fill="#555">docker build</text>

  <rect x="375" y="40" width="100" height="50" rx="7" fill="#fce4ec" stroke="#880e4f" stroke-width="1.5"/>
  <text x="425" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#880e4f">🔍 Scan</text>
  <text x="425" y="80" text-anchor="middle" font-size="9"  fill="#555">trivy / snyk</text>

  <rect x="495" y="40" width="100" height="50" rx="7" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="545" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">📦 Push</text>
  <text x="545" y="80" text-anchor="middle" font-size="9"  fill="#555">docker push GHCR</text>

  <rect x="615" y="40" width="90" height="50" rx="7" fill="#e8f5e9" stroke="#388e3c" stroke-width="1.5"/>
  <text x="660" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#1b5e20">🚀 Deploy</text>
  <text x="660" y="80" text-anchor="middle" font-size="9"  fill="#555">compose up</text>

  <line x1="117" y1="65" x2="133" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="237" y1="65" x2="253" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="357" y1="65" x2="373" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="477" y1="65" x2="493" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>
  <line x1="597" y1="65" x2="613" y2="65" stroke="#607d8b" stroke-width="1.5" marker-end="url(#ca)"/>

  <text x="360" y="116" text-anchor="middle" font-size="10" fill="#777">Automated on every push to main — no manual steps</text>
</svg>
```

---
