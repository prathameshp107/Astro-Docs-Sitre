---
title: "What is AWS?"
description: "Amazon Web Services is the world's leading cloud platform — regions, availability zones, and how to access services."
sidebar:
  order: 2
---

## What is AWS?

**Amazon Web Services (AWS)** is a cloud platform launched by Amazon in 2006. It offers over 200 services across compute, storage, databases, networking, machine learning, and more. AWS is the most widely adopted cloud platform, serving millions of customers.

> **Analogy:** AWS is like a massive global warehouse network. Instead of building your own warehouses (data centers), you rent space and tools from AWS's existing facilities around the world.

---

### AWS Global Infrastructure

```mermaid
flowchart TB
    subgraph Region["AWS Region<br/>e.g., us-east-1 (N. Virginia)"]
        AZ1["Availability Zone A<br/>(us-east-1a)"]
        AZ2["Availability Zone B<br/>(us-east-1b)"]
        AZ3["Availability Zone C<br/>(us-east-1c)"]
    end

    subgraph Region2["AWS Region<br/>e.g., eu-west-1 (Ireland)"]
        AZ4["Availability Zone A"]
        AZ5["Availability Zone B"]
    end

    subgraph Edge["Edge Locations<br/>(300+ Points of Presence)"]
        E1["CloudFront CDN"]
        E2["Route53 DNS"]
    end

    Region --- Region2
    Region2 --- Edge

    style Region fill:#7c3aed,color:#fff
    style Region2 fill:#4f46e5,color:#fff
    style Edge fill:#059669,color:#fff
    style AZ1 fill:#c4b5fd,color:#333
    style AZ2 fill:#c4b5fd,color:#333
    style AZ3 fill:#c4b5fd,color:#333
```

| Component | What It Is | Example |
|-----------|-----------|---------|
| **Region** | A geographic area with 2-6 Availability Zones | `us-east-1` (Virginia), `eu-west-1` (Ireland) |
| **Availability Zone (AZ)** | One or more data centers, isolated from other AZs | `us-east-1a`, `us-east-1b` |
| **Edge Location** | CDN endpoint for content delivery (300+ globally) | CloudFront, Route53 |

---

### Choosing a Region

```mermaid
flowchart TB
    Question["Which region should I choose?"] --> Latency["1. Proximity to users<br/>Lowest latency"]
    Question --> Compliance["2. Compliance & regulations<br/>Data residency laws"]
    Question --> Services["3. Available services<br/>Not all services in all regions"]
    Question --> Pricing["4. Pricing<br/>Varies by region"]

    style Question fill:#f59e0b,color:#fff
    style Latency fill:#3b82f6,color:#fff
    style Compliance fill:#ef4444,color:#fff
    style Services fill:#7c3aed,color:#fff
    style Pricing fill:#059669,color:#fff
```

---

### Accessing AWS

There are **three ways** to interact with AWS:

**1. AWS Management Console** — Web-based UI
- Go to [console.aws.amazon.com](https://console.aws.amazon.com)
- Sign in with root user or IAM user
- Browse and manage services visually

**2. AWS CLI** — Command-line access
```bash
# Install
pip install awscli

# Configure
aws configure
# → Enter AWS Access Key ID
# → Enter AWS Secret Access Key
# → Choose default region

# Use
aws s3 ls
aws ec2 describe-instances
aws lambda invoke --function-name my-function output.json
```

**3. AWS SDKs** — Programmatic access
```python
# Python (boto3)
import boto3
s3 = boto3.client('s3')
buckets = s3.list_buckets()
for bucket in buckets['Buckets']:
    print(bucket['Name'])
```

---

### AWS Free Tier (New Users)

AWS offers a **free tier** for 12 months after sign-up:

| Service | Free Tier Limit |
|---------|----------------|
| EC2 | 750 hours/month (t2.micro) |
| S3 | 5 GB storage |
| Lambda | 1 million requests/month |
| RDS | 750 hours (db.t2.micro) |
| DynamoDB | 25 GB storage |

> 💡 Always check current pricing at [aws.amazon.com/free](https://aws.amazon.com/free) before using any service.

---

### In Simple Words

- AWS has **Regions** (geographic areas) and **Availability Zones** (data centers within a region)
- Choose a region based on **proximity to users, compliance, service availability, and pricing**
- Access AWS via **Console** (web UI), **CLI** (command line), or **SDKs** (code)
- The **AWS Free Tier** lets you experiment with many services for 12 months
- Always use **IAM users** (not the root account) for daily work
