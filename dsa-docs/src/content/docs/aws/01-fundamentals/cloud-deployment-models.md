---
title: "Cloud Deployment Models & Shared Responsibility"
description: "Public, private, and hybrid cloud deployment models plus the AWS shared responsibility model for security."
sidebar:
  order: 4
---

## Cloud Deployment Models & Shared Responsibility

Beyond the service models (IaaS/PaaS/SaaS), there are different **deployment models** — how you choose to run your cloud infrastructure. And critically, the **shared responsibility model** defines who secures what.

> **Analogy:** Deployment models are like different housing arrangements — public cloud is a rental apartment, private cloud is owning your own house, hybrid is having a house with a rented office space. The shared responsibility model is like deciding who locks which doors.

---

### Cloud Deployment Models

```mermaid
flowchart TB
    subgraph Public["Public Cloud"]
        A1["AWS / Azure / GCP"]
        A2["Multi-tenant<br/>Shared infrastructure"]
        A3["No upfront cost<br/>Pay-as-you-go"]
    end

    subgraph Private["Private Cloud"]
        B1["On-premises or hosted"]
        B2["Single-tenant<br/>Dedicated infrastructure"]
        B3["Full control<br/>Higher cost"]
    end

    subgraph Hybrid["Hybrid Cloud"]
        C1["Public + Private connected"]
        C2["Data stays on-prem<br/>Apps burst to cloud"]
        C3["Best of both worlds<br/>Complex to manage"]
    end

    Public <--> Hybrid
    Hybrid <--> Private

    style Public fill:#3b82f6,color:#fff
    style Private fill:#f59e0b,color:#fff
    style Hybrid fill:#7c3aed,color:#fff
```

| Model | Description | Use When |
|-------|-------------|----------|
| **Public Cloud** | Resources owned by cloud provider, shared across customers | Startups, variable workloads, cost-sensitive |
| **Private Cloud** | Resources dedicated to one organization | Compliance-heavy (finance, healthcare), full control needed |
| **Hybrid Cloud** | Public + private connected (often via VPN/Direct Connect) | Sensitive data on-prem, burst to cloud for compute |

---

### Multi-Cloud vs Hybrid Cloud

```mermaid
flowchart LR
    subgraph Multi_Cloud["Multi-Cloud"]
        MC1["App 1 on AWS"]
        MC2["App 2 on Azure"]
        MC3["App 3 on GCP"]
    end

    subgraph Hybrid["Hybrid Cloud"]
        H1["On-Prem DC"]
        H2["AWS Cloud"]
        H1 <-->|"VPN / Direct Connect"| H2
    end

    style Multi_Cloud fill:#4f46e5,color:#fff
    style Hybrid fill:#059669,color:#fff
```

| Term | Meaning |
|------|---------|
| **Multi-Cloud** | Using multiple cloud providers (AWS + Azure) for different workloads |
| **Hybrid Cloud** | Connecting on-premises + cloud (same or different providers) |
| **Community Cloud** | Shared infrastructure for organizations with common concerns |

---

### The Shared Responsibility Model

```mermaid
flowchart TB
    subgraph Customer["Customer Responsible"]
        C1["Customer Data"]
        C2["Platform & App Management"]
        C3["OS, Network & Firewall Config"]
        C4["IAM & Access Management"]
        C5["Client-side Encryption"]
    end

    subgraph AWS["AWS Responsible"]
        A1["Hardware & Global Infrastructure"]
        A2["Regions, AZs, Edge Locations"]
        A3["Physical Security (data centers)"]
        A4["Hypervisor & Host OS"]
        A5["Network Infrastructure"]
    end

    Customer ---|"Boundary"| AWS

    style Customer fill:#ef4444,color:#fff
    style AWS fill:#3b82f6,color:#fff
```

**How responsibility shifts by service type:**

```mermaid
flowchart LR
    subgraph EC2_Resp["EC2 (IaaS)"]
        EC2_C["You manage:<br/>OS, patches, apps, firewall"]
        EC2_A["AWS manages:<br/>Host, network, datacenter"]
    end

    subgraph Lambda_Resp["Lambda (Serverless)"]
        L_C["You manage:<br/>Code, config"]
        L_A["AWS manages:<br/>OS, runtime, scaling, patches"]
    end

    subgraph SaaS_Resp["SaaS"]
        S_C["You manage:<br/>Data, users"]
        S_A["AWS manages:<br/>Everything else"]
    end

    EC2_C -->|More control| EC2_A
    L_C -->|Less control| L_A
    S_C -->|Least control| S_A

    style EC2_Resp fill:#4f46e5,color:#fff
    style Lambda_Resp fill:#7c3aed,color:#fff
    style SaaS_Resp fill:#059669,color:#fff
```

---

### Shared Responsibility Quick Reference

| Security Area | IaaS (EC2) | PaaS (Beanstalk) | Serverless (Lambda) | SaaS (RDS) |
|--------------|------------|-------------------|-------------------|------------|
| **Customer Data** | You | You | You | You |
| **IAM & Access** | You | You | You | You |
| **OS & Patches** | **You** | AWS | AWS | AWS |
| **App Runtime** | You | **You** | AWS | AWS |
| **Network Config** | **You** | AWS | AWS | AWS |
| **Hypervisor** | AWS | AWS | AWS | AWS |
| **Physical Security** | AWS | AWS | AWS | AWS |

---

### In Simple Words

- **Public cloud** = shared infrastructure, pay-as-you-go — best for most workloads
- **Private cloud** = dedicated infrastructure — best for compliance-heavy industries
- **Hybrid cloud** = on-prem + cloud connected — best for gradual migration
- **Shared responsibility model**: AWS secures **the cloud**; you secure **what's in the cloud**
- With **IaaS**, you manage more (OS, patches). With **serverless**, AWS manages more
- The **boundary shifts** based on the service you choose — less control = less responsibility
