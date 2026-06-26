---
title: "EC2 — Virtual Servers"
description: "Amazon EC2 provides resizable virtual servers in the cloud — instances, AMIs, instance types, key pairs, and security groups."
sidebar:
  order: 1
---

## EC2 — Virtual Servers

**Amazon Elastic Compute Cloud (EC2)** is a service that provides virtual servers (called **instances**) in the cloud. You can launch, stop, and terminate instances in minutes, and you pay only for what you use.

> **Analogy:** EC2 is like renting a pre-configured computer in a remote data center. You choose the specs (CPU, RAM, storage), turn it on when you need it, and turn it off when you're done — paying only for the time it's running.

---

### EC2 + Security Group Flow

```mermaid
sequenceDiagram
    participant User as Developer
    participant Console as AWS Console/CLI
    participant EC2 as EC2 Service
    participant SG as Security Group
    participant Instance as EC2 Instance

    User->>Console: Launch instance<br/>(AMI, type, key pair)
    Console->>EC2: Create instance
    EC2->>SG: Attach security group
    EC2-->>Console: Instance running + IP
    
    Note over SG: Security Group Rules:
    Note over SG: Inbound: SSH (22), HTTP (80), HTTPS (443)
    Note over SG: Outbound: All traffic (default)

    User->>Instance: SSH (port 22)
    SG->>SG: Check: SSH inbound allowed?
    SG->>SG: Source IP in rules?
    alt Allowed
        SG-->>Instance: Allow connection ✅
    else Denied
        SG-->>User: Connection timed out ❌
    end
```

---

### Key EC2 Concepts

**1. AMI (Amazon Machine Image)**
A pre-configured template for your instance — includes OS, software, and configuration.

```bash
# List available AMIs
aws ec2 describe-images --owners amazon --filters "Name=name,Values=amzn2-ami-*"
```

**2. Instance Types**
| Family | Use Case | Example |
|--------|----------|---------|
| **t** (burstable) | General purpose, low-cost | `t2.micro` (free tier), `t3.medium` |
| **m** (general) | Balanced compute/memory | `m5.large` |
| **c** (compute) | CPU-intensive | `c5.xlarge` |
| **r** (memory) | RAM-intensive | `r5.large` |
| **g** (GPU) | Machine learning, rendering | `g4dn.xlarge` |

**3. Key Pairs**
SSH keys for secure access to your instance:
```bash
# Create a key pair
aws ec2 create-key-pair --key-name my-key --query 'KeyMaterial' --output text > my-key.pem

# SSH into instance
chmod 400 my-key.pem
ssh -i my-key.pem ec2-user@<public-ip>
```

**4. Security Groups** — Virtual firewalls
```bash
# Create security group
aws ec2 create-security-group --group-name web-sg --description "Web server SG"

# Allow HTTP inbound
aws ec2 authorize-security-group-ingress \
    --group-name web-sg \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0

# Allow SSH only from your IP
aws ec2 authorize-security-group-ingress \
    --group-name web-sg \
    --protocol tcp \
    --port 22 \
    --cidr 203.0.113.0/32  # ← YOUR public IP
```

---

### Launching an EC2 Instance

```bash
# Via AWS CLI — launch a t2.micro (free tier eligible)
aws ec2 run-instances \
    --image-id ami-0c55b159cbfafe1f0 \
    --instance-type t2.micro \
    --key-name my-key \
    --security-groups web-sg \
    --user-data install-web.sh
```

```bash
# View running instances
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"

# Stop (still pay for storage)
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Terminate (delete the instance)
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
```

---

### EC2 Instance Type Decision

```mermaid
flowchart TB
    Question["What does your app need most?"] --> CPU{"CPU-heavy?<br/>Encoding, rendering<br/>batch processing"}
    Question --> Memory{"Memory-heavy?<br/>Caching, analytics<br/>in-memory DB"}
    Question --> Balanced{"Balanced?<br/>Web servers,<br/>microservices"}
    Question --> GPU{"GPU needed?<br/>ML, video transcoding<br/>3D rendering"}

    CPU -->|"c5/c6g series"| C_Family["c5.xlarge, c6g.2xlarge<br/>High CPU, reasonable RAM"]
    Memory -->|"r5/x1e series"| R_Family["r5.large, x1e.xlarge<br/>High RAM, moderate CPU"]
    Balanced -->|"m5/t3 series"| M_Family["m5.large, t3.medium<br/>Balanced CPU & RAM"]
    GPU -->|"g4dn/p3 series"| G_Family["g4dn.xlarge, p3.2xlarge<br/>NVIDIA GPU, ML-optimized"]

    style Question fill:#f59e0b,color:#fff
    style C_Family fill:#3b82f6,color:#fff
    style R_Family fill:#059669,color:#fff
    style M_Family fill:#7c3aed,color:#fff
    style G_Family fill:#ef4444,color:#fff
```

---

### EC2 Lifecycle

```mermaid
flowchart LR
    Pending["🟡 Pending<br/>Starting up"] --> Running["🟢 Running<br/>Billed for usage"]
    Running --> Stopping["🟡 Stopping"]
    Stopping --> Stopped["⏹️ Stopped<br/>Not billed for instance<br/>(EBS storage billed)"]
    Running --> Rebooting["🔄 Rebooting"]
    Rebooting --> Running
    Running --> Terminated["❌ Terminated<br/>Instance deleted<br/>Not recoverable"]
    Stopped --> Running
    Stopped --> Terminated

    style Running fill:#059669,color:#fff
    style Stopped fill:#f59e0b,color:#fff
    style Terminated fill:#ef4444,color:#fff
```

---

### EC2 Pricing Models

| Model | Description | Use When |
|-------|------------|----------|
| **On-Demand** | Pay per hour/second, no commitment | Short-term, unpredictable workloads |
| **Reserved** | 1-3 year commitment, up to 72% discount | Steady-state production workloads |
| **Spot** | Bid for spare capacity, up to 90% discount | Fault-tolerant, flexible workloads |
| **Savings Plan** | Commit to $/hour usage, flexible across services | Mixed workloads |

### Pricing Model Comparison

```mermaid
flowchart TB
    subgraph OnDemand["On-Demand — Pay as you go"]
        OD1["$$ per hour"]
        OD2["No commitment"]
        OD3["Good for dev/test"]
    end

    subgraph Reserved["Reserved — Commit for savings"]
        R1["$ per hour (up to 72% off)"]
        R2["1 or 3 year term"]
        R3["Best for steady production"]
    end

    subgraph Spot["Spot — Bid for spare"]
        S1["¢ per hour (up to 90% off)"]
        S2["Can be terminated at 2 min notice"]
        S3["Best for batch jobs, CI/CD"]
    end

    Cost{"More predictable load?"}
    Cost -->|"Yes — steady 24/7"| Reserved
    Cost -->|"No — spiky or new"| Interruptible{"Can tolerate<br/>interruptions?"}
    Interruptible -->|"Yes"| Spot
    Interruptible -->|"No"| OnDemand

    style OnDemand fill:#3b82f6,color:#fff
    style Reserved fill:#059669,color:#fff
    style Spot fill:#f59e0b,color:#fff
```

---

### In Simple Words

- **EC2** = virtual servers in the cloud — launch, stop, terminate on demand
- **AMI** = the OS/template for your instance
- **Instance types** = different CPU/RAM/storage combos (t, m, c, r families)
- **Security groups** = virtual firewalls controlling inbound/outbound traffic
- **Key pairs** = SSH keys for secure access
- Pay **On-Demand** for flexibility, **Reserved** for savings, **Spot** for cheap batch jobs
