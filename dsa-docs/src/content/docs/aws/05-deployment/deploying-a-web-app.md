---
title: "Deploying a Web App"
description: "End-to-end deployment of a web app on AWS — Route53 → CloudFront → ELB → EC2 → RDS/S3."
sidebar:
  order: 1
---

## Deploying a Web App

Let's walk through an **end-to-end production architecture** for deploying a web application on AWS, from domain to database.

> **Analogy:** Deploying a web app on AWS is like opening a restaurant. You need a location (EC2), a sign (Route53), a delivery service (CloudFront), a host who seats guests (ELB), a kitchen that scales (Auto Scaling), and a pantry (S3/RDS).

---

### Full Web App Architecture

```mermaid
flowchart LR
    User["User<br/>🌍"] --> R53["Route53<br/>DNS"]
    R53 --> CF["CloudFront<br/>CDN + HTTPS"]
    CF --> WAF["AWS WAF<br/>Web Firewall"]
    WAF --> ALB["Application LB<br/>Traffic Distribution"]
    
    subgraph ASG["Auto Scaling Group"]
        EC2_1["EC2 Web Server"]
        EC2_2["EC2 Web Server"]
        EC2_3["EC2 Web Server"]
    end
    
    ALB --> ASG
    
    ASG --> S3["S3<br/>Static Assets"]
    ASG --> RDS["RDS<br/>Database"]
    ASG --> ECache["ElastiCache<br/>Redis Cache"]

    style User fill:#f59e0b,color:#fff
    style R53 fill:#3b82f6,color:#fff
    style CF fill:#7c3aed,color:#fff
    style ALB fill:#059669,color:#fff
    style ASG fill:#6366f1,color:#fff
    style S3 fill:#ef4444,color:#fff
    style RDS fill:#dc2626,color:#fff
```

---

### Deployment Strategies — Rolling vs Blue/Green vs Canary

Different strategies for updating your app with minimal downtime:

```mermaid
flowchart TB
    subgraph Rolling["🔄 Rolling Update"]
        direction LR
        R1["Old v1<br/>Instance 1"] -->|Update| R1new["New v2<br/>Instance 1"]
        R2["Old v1<br/>Instance 2"] -->|Wait for health| R2new["New v2<br/>Instance 2"]
        R3["Old v1<br/>Instance 3"] -->|Wait for health| R3new["New v2<br/>Instance 3"]
    end

    subgraph BlueGreen["🔵🟢 Blue/Green Deployment"]
        direction LR
        BG_Blue["🔵 Blue (current)<br/>v1 — Full capacity"]
        BG_Green["🟢 Green (new)<br/>v2 — Full capacity"]
        BG_Blue -.->|Switch DNS/ALB| BG_Green
    end

    subgraph Canary["🐤 Canary Deployment"]
        direction LR
        C_Old["v1 — 90% traffic"]
        C_New["v2 — 10% traffic<br/>Canary group"]
        C_Mon["Monitor metrics<br/>errors, latency"]
        C_Scale["Gradually shift<br/>to 100% v2"]
        
        C_Old --> C_Mon
        C_New --> C_Mon
        C_Mon -->|If healthy| C_Scale
    end

    style Rolling fill:#3b82f6,color:#fff
    style BlueGreen fill:#7c3aed,color:#fff
    style Canary fill:#059669,color:#fff
```

| Strategy | Risk | Speed | Zero-downtime? | Best For |
|----------|------|-------|----------------|----------|
| **Rolling** | Low | Medium | ✅ Yes | Most apps |
| **Blue/Green** | Very Low | Fast (swap) | ✅ Yes | Critical production |
| **Canary** | Minimal | Gradual | ✅ Yes | Testing with real traffic |

Elastic Beanstalk supports **rolling** and **immutable** (blue/green) deploys out of the box.

---

### Deployment Options by App Type

| App Type | Deployment Strategy | Where |
|----------|-------------------|-------|
| **Static site** (HTML/CSS/JS) | S3 + CloudFront | S3 static hosting + CloudFront CDN |
| **Single-page app** (React/Vue) | S3 + CloudFront | `npm run build` → sync to S3 |
| **Server-side app** (Node/Django) | EC2 + ALB or Elastic Beanstalk | Beanstalk handles everything |
| **Serverless API** | Lambda + API Gateway | No servers to manage |
| **Containerized app** (Docker) | ECS + Fargate | Serverless containers |

---

### Step-by-Step: Static Site on S3 + CloudFront

**1. Build your site**
```bash
# For React/Vue/Svelte
npm run build
# → creates build/ folder with index.html, assets/
```

**2. Upload to S3**
```bash
# Create bucket
aws s3 mb s3://my-app-website --region us-east-1

# Enable static hosting
aws s3 website s3://my-app-website \
    --index-document index.html \
    --error-document error.html

# Upload build
aws s3 sync ./build s3://my-app-website --acl public-read
```

**3. Set up CloudFront**
```bash
# Create distribution
aws cloudfront create-distribution \
    --origin-domain-name my-app-website.s3-website-us-east-1.amazonaws.com \
    --default-root-object index.html \
    --enabled
```

**4. Add domain with Route53**
```bash
# Create A record pointing to CloudFront
# Type: A → Alias: Yes → CloudFront distribution
```

**5. Done!** Your site is live at `https://www.yourdomain.com` 🚀

---

### Step-by-Step: Server App on Elastic Beanstalk

```bash
# 1. Initialize Beanstalk
eb init -p node.js-20 my-app --region us-east-1

# 2. Create environment
eb create production
# → Creates: EC2, ALB, ASG, security groups

# 3. Deploy updates
eb deploy

# 4. Open the site
eb open
```

**That's it!** Elastic Beanstalk handles:
- EC2 instance provisioning
- Load balancer configuration
- Auto scaling (configurable by CPU or request count)
- Rolling updates (zero-downtime deploys)
- CloudWatch monitoring

---

### Architecture Decision Flow

```mermaid
flowchart TB
    Q["What type of app?"] --> Static{"Static or<br/>dynamic?"}
    
    Static -->|"Static (HTML/CSS/JS)"| S3_CF["S3 + CloudFront<br/>Cheapest, fastest, easiest"]
    Static -->|"Dynamic (server)"| Full{"Containers?"}
    
    Full -->|"No"| Simple{"Simple app?"}
    Full -->|"Yes"| ECS_["ECS + Fargate<br/>Containerized"]
    
    Simple -->|"Yes"| Beanstalk["Elastic Beanstalk<br/>Easiest deploy"]
    Simple -->|"No / full control"| EC2_ALB["EC2 + ALB + ASG<br/>Full control"]
    
    Q --> API{"API only?"}
    API -->|"Yes"| Lambda_API["Lambda + API Gateway<br/>Serverless"]

    style S3_CF fill:#059669,color:#fff
    style Beanstalk fill:#7c3aed,color:#fff
    style EC2_ALB fill:#3b82f6,color:#fff
    style Lambda_API fill:#f59e0b,color:#fff
    style ECS_ fill:#6366f1,color:#fff
```

---

### In Simple Words

- **Static sites** = S3 + CloudFront — simplest, cheapest, fastest
- **Server apps** = Elastic Beanstalk (easy) or EC2 + ALB (full control)
- **Serverless APIs** = Lambda + API Gateway — no servers to manage
- **Route53** connects your domain; **CloudFront** adds CDN + HTTPS
- **ALB** distributes traffic; **Auto Scaling** handles load changes
- Start simple and add complexity as you grow
