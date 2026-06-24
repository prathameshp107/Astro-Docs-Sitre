---
title: "VPC Basics"
description: "Amazon VPC lets you create a private virtual network in AWS — subnets, security groups, and internet gateways."
sidebar:
  order: 1
---

## VPC Basics

**Amazon Virtual Private Cloud (VPC)** lets you create a logically isolated private network within AWS. You control IP addressing, subnets, route tables, and gateways — just like a traditional network, but virtual.

> **Analogy:** A VPC is like your own private gated community in the cloud. Subnets are neighborhoods within that community. Security groups and NACLs are the gates that control who can enter each house.

---

### VPC Architecture

```mermaid
flowchart TB
    subgraph VPC["VPC — 10.0.0.0/16"]
        IGW[Internet Gateway] --> PublicSubnet["Public Subnet<br/>10.0.1.0/24"]
        PublicSubnet --> Web["Web Server (EC2)"]
        
        NAT[NAT Gateway] --> PrivateSubnet["Private Subnet<br/>10.0.2.0/24"]
        PrivateSubnet --> DB["Database (RDS)"]
        
        Web -->|Internet access| IGW
        DB -->|Outbound only| NAT
    end

    Internet[Internet] --> IGW

    style VPC fill:#7c3aed,color:#fff
    style IGW fill:#3b82f6,color:#fff
    style PublicSubnet fill:#059669,color:#fff
    style PrivateSubnet fill:#d97706,color:#fff
    style Web fill:#f59e0b,color:#fff
    style DB fill:#ef4444,color:#fff
```

---

### Key VPC Components

| Component | What It Does |
|-----------|-------------|
| **VPC** | Isolated virtual network (CIDR block, e.g., `10.0.0.0/16`) |
| **Subnet** | A range of IPs within a VPC (public or private) |
| **Internet Gateway (IGW)** | Allows public internet access to a VPC |
| **NAT Gateway** | Allows private subnets to access internet (not inbound) |
| **Route Table** | Rules for where traffic goes |
| **Security Group** | Instance-level firewall (stateful) |
| **Network ACL (NACL)** | Subnet-level firewall (stateless) |

---

### Multi-AZ High Availability

A well-architected VPC spans **multiple Availability Zones** for fault tolerance:

```mermaid
flowchart TB
    IGW[Internet Gateway]
    ALB[Application Load Balancer]

    subgraph AZ1["Availability Zone A — us-east-1a"]
        Pub1["Public Subnet<br/>10.0.1.0/24"]
        Priv1["Private Subnet<br/>10.0.3.0/24"]
        Pub1 --> Web1["EC2 Web Server"]
        Priv1 --> DB1["RDS Primary<br/>(Read/Write)"]
    end

    subgraph AZ2["Availability Zone B — us-east-1b"]
        Pub2["Public Subnet<br/>10.0.2.0/24"]
        Priv2["Private Subnet<br/>10.0.4.0/24"]
        Pub2 --> Web2["EC2 Web Server"]
        Priv2 --> DB2["RDS Standby<br/>(Failover)"]
    end

    IGW --> ALB
    ALB --> Pub1
    ALB --> Pub2
    DB1 <-->|Synchronous Replication| DB2

    style IGW fill:#3b82f6,color:#fff
    style ALB fill:#059669,color:#fff
    style AZ1 fill:#7c3aed,color:#fff
    style AZ2 fill:#7c3aed,color:#fff
    style Pub1 fill:#6366f1,color:#fff
    style Priv1 fill:#f59e0b,color:#fff
    style Pub2 fill:#6366f1,color:#fff
    style Priv2 fill:#f59e0b,color:#fff
    style DB1 fill:#ef4444,color:#fff
    style DB2 fill:#dc2626,color:#fff
```

---

### NAT Gateway & VPC Peering

```mermaid
flowchart TB
    Internet[🌍 Internet]

    subgraph VPC_A["VPC A — Production 10.0.0.0/16"]
        IGW[Internet Gateway]
        PubA["Public Subnet<br/>10.0.1.0/24"]
        PrivA["Private Subnet<br/>10.0.2.0/24"]
        NAT[NAT Gateway]
        
        IGW --> PubA
        PubA --> WebA["Web Server"]
        PrivA --> DBA["Database"]
        WebA -->|Outbound internet| IGW
        DBA -->|Outbound only| NAT
        NAT --> IGW
    end

    subgraph VPC_B["VPC B — Staging 10.1.0.0/16"]
        PrivB["Private Subnet<br/>10.1.1.0/24"]
        PrivB --> AppB["App Server"]
        PrivB --> DBB["Database"]
    end

    VPC_A <-.->|VPC Peering<br/>Private connectivity| VPC_B
    Internet --> IGW

    style VPC_A fill:#7c3aed,color:#fff
    style VPC_B fill:#3b82f6,color:#fff
    style IGW fill:#059669,color:#fff
    style NAT fill:#f59e0b,color:#fff
    style PubA fill:#6366f1,color:#fff
    style PrivA fill:#a855f7,color:#fff
    style PrivB fill:#93c5fd,color:#fff
```

---

### Security Groups vs NACLs

| Feature | Security Group | NACL |
|---------|---------------|------|
| **Level** | Instance-level | Subnet-level |
| **State** | Stateful (return traffic allowed) | Stateless (explicit allow for return) |
| **Rules** | Allow only | Allow and Deny |
| **Order** | All rules evaluated | Rules evaluated in order (lowest number first) |
| **Default** | Deny all inbound, allow all outbound | Allow all inbound and outbound (default NACL) |

**Security Group Example:**
```bash
# Allow HTTP from anywhere
aws ec2 authorize-security-group-ingress \
    --group-id sg-123456 \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0

# Allow SSH from office IP only
aws ec2 authorize-security-group-ingress \
    --group-id sg-123456 \
    --protocol tcp \
    --port 22 \
    --cidr 203.0.113.0/32
```

### Security Group vs NACL — Decision Flow

```mermaid
flowchart TB
    Q["Need to control traffic?"] --> Level{"What level?"}
    
    Level -->|"Instance-level (per EC2)"| SG["Use Security Group<br/>Stateful, allow-only<br/>Ideal for per-app rules"]
    
    Level -->|"Subnet-level (whole range)"| NACL["Use Network ACL<br/>Stateless, allow+deny<br/>Ideal for IP blacklists"]

    SG --> SG_Example["Example: Allow HTTP/HTTPS<br/>to web servers only"]
    NACL --> NACL_Example["Example: Block traffic<br/>from known bad IP ranges"]

    Q2{"Should return traffic<br/>be auto-allowed?"}
    SG -->|"Yes — stateful"| Q2
    NACL -->|"No — need explicit<br/>ephemeral port rules"| Q2

    style Q fill:#f59e0b,color:#fff
    style SG fill:#059669,color:#fff
    style NACL fill:#3b82f6,color:#fff
```

---

### Default VPC

Every AWS account has a **default VPC** in each region — it's pre-configured with:
- A VPC with a `/16` CIDR block
- A public subnet in each AZ
- An internet gateway
- A default route table

Most beginners start with the default VPC. It's ready to use immediately.

---

### Creating a Custom VPC

```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create subnets
aws ec2 create-subnet --vpc-id vpc-123 --cidr-block 10.0.1.0/24
aws ec2 create-subnet --vpc-id vpc-123 --cidr-block 10.0.2.0/24

# Attach internet gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --vpc-id vpc-123 --internet-gateway-id igw-456

# Create route to internet
aws ec2 create-route --route-table-id rtb-789 \
    --destination-cidr-block 0.0.0.0/0 \
    --gateway-id igw-456
```

---

### In Simple Words

- A **VPC** is your own private network in the AWS cloud
- **Subnets** divide your VPC into public and private sections
- **Security groups** = instance-level firewalls; **NACLs** = subnet-level firewalls
- **Internet Gateway** connects public subnets to the internet
- Each region comes with a **default VPC** ready to use immediately
