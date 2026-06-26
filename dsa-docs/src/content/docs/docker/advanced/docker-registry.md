---
title: "Docker Registry"
description: "---"
sidebar:
  order: 111
---

## 10. Docker Registry

### 📦 Registry Options Comparison

| Registry | Cost | Privacy | Best For |
|----------|------|---------|----------|
| Docker Hub | Free (limited) | Public/Private | Open source, personal |
| GitHub Container Registry | Free for public | Public/Private | GitHub projects |
| AWS ECR | Pay per GB | Private | AWS deployments |
| Google Artifact Registry | Pay per GB | Private | GCP deployments |
| Azure ACR | Pay per tier | Private | Azure deployments |
| Self-hosted (Harbor) | Infrastructure cost | Full control | Air-gapped / compliance |

---

### 🚀 GitHub Container Registry (GHCR)

```bash
# Login with personal access token
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag image for GHCR
docker tag my-app ghcr.io/username/my-app:latest
docker tag my-app ghcr.io/username/my-app:1.0.0

# Push
docker push ghcr.io/username/my-app:latest
docker push ghcr.io/username/my-app:1.0.0

# Pull
docker pull ghcr.io/username/my-app:1.0.0
```

---

### ☁️ AWS ECR (Elastic Container Registry)

```bash
# Authenticate to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS \
  --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Create repository
aws ecr create-repository --repository-name my-app --region us-east-1

# Tag and push
docker tag my-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
```

---

### 🏗️ Private Registry with Harbor

```bash
# Run Harbor (production-grade private registry)
# Download installer from: https://github.com/goharbor/harbor/releases

# After installation:
docker login registry.company.com
docker tag myapp registry.company.com/myproject/myapp:1.0
docker push registry.company.com/myproject/myapp:1.0
```

---
