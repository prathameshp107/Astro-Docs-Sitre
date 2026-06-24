---
title: "05 — Load Balancers"
description: "Load balancer types, algorithms, health checks, session persistence, and design patterns for distributing traffic."
sidebar:
  order: 5
---

## 05 — Load Balancers

A **load balancer** distributes incoming network traffic across multiple backend servers. It's a critical component for scalability, high availability, and fault tolerance.

> **Analogy:** A load balancer is like a host at a restaurant — when customers arrive, the host directs them to the first available table, making sure no server is overwhelmed while another sits idle.

---

### Problem Statement

Without a load balancer:
- One server gets all traffic and crashes
- Users experience downtime when a server fails
- Cannot add or remove servers without downtime
- SSL termination and rate limiting must be handled by each server individually

---

### Architecture Overview

```mermaid
flowchart TB
    Users["🌍 Users"] --> DNS["DNS<br/>Round Robin"]
    DNS --> LB["Load Balancer"]
    
    subgraph LB_Internals["Load Balancer Internals"]
        Algo["Scheduling Algorithm"]
        HC["Health Checks"]
        SSL["SSL Termination"]
        Stick["Session Persistence"]
    end
    
    LB --> Backend1["Backend Server 1"]
    LB --> Backend2["Backend Server 2"]
    LB --> Backend3["Backend Server 3"]
    LB --> BackendN["Backend Server N"]

    style Users fill:#f59e0b,color:#fff
    style LB fill:#7c3aed,color:#fff
    style LB_Internals fill:#3b82f6,color:#fff
```

---

### Load Balancer Types

| Type | Layer | Description | Example |
|------|-------|-------------|---------|
| **ALB** (Application LB) | L7 | HTTP/HTTPS, path-based routing, host-based routing | AWS ALB |
| **NLB** (Network LB) | L4 | TCP/UDP, extreme performance, static IP | AWS NLB |
| **GLB** (Gateway LB) | L3 | IP packet-level, for appliances | AWS GLB |
| **Classic LB** | L4/L7 | Legacy, simple TCP/HTTP LB | AWS CLB (retired) |
| **HAProxy** | L4/L7 | Open-source, flexible, battle-tested | Self-managed |
| **NGINX** | L7 | Reverse proxy + LB, great for HTTP | Self-managed |

---

### Load Balancing Algorithms

```mermaid
flowchart TB
    Algo["Load Balancing Algorithms"] --> RR["Round Robin<br/>Requests distributed equally<br/>Simple, no state needed"]
    Algo --> WRR["Weighted Round Robin<br/>More traffic to powerful servers<br/>Uneven capacity"]
    Algo --> LeastConn["Least Connections<br/>Send to server with fewest<br/>active connections"]
    Algo --> IPHash["IP Hash<br/>Same client → same server<br/>Session persistence"]
    Algo --> Random["Random<br/>Random selection<br/>Simple, statistically fair"]
    Algo --> Geolocation["Geolocation<br/>Route based on client location<br/>Lowest latency"]

    style Algo fill:#7c3aed,color:#fff
    style RR fill:#3b82f6,color:#fff
    style LeastConn fill:#059669,color:#fff
    style IPHash fill:#f59e0b,color:#fff
```

| Algorithm | Best For | Pros | Cons |
|-----------|----------|------|------|
| **Round Robin** | Equal-capacity servers | Simple, fair | Doesn't consider load |
| **Least Connections** | Varying request durations | Better resource use | Slightly more complex |
| **IP Hash** | Sticky sessions | No extra config needed | Uneven distribution if clients from same IP |
| **Weighted** | Mixed server specs | Optimizes heterogeneous clusters | Manual weight tuning |

---

### Health Checks

```mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant S1 as Server 1 ✅
    participant S2 as Server 2 ❌ (Down)

    LB->>S1: Health check (GET /health)
    S1-->>LB: 200 OK
    Note over S1: Healthy → send traffic

    LB->>S2: Health check (GET /health)
    S2-->>LB: Timeout (no response)
    Note over S2: Unhealthy → remove from pool

    LB->>S2: Retry health check (after interval)
    S2-->>LB: 200 OK
    Note over S2: Back healthy → add to pool

    loop Every N seconds
        LB->>S1: Periodic check
        LB->>S2: Periodic check
    end
```

| Health Check Type | What It Checks | Interval |
|-------------------|----------------|----------|
| **TCP** | Port is open (connection succeeds) | 5-30 seconds |
| **HTTP** | Endpoint returns 200 | 5-30 seconds |
| **HTTPS** | Secure endpoint returns 200 | 10-30 seconds |
| **Custom script** | Complex logic (e.g., DB connectivity) | 30-60 seconds |

---

### Session Persistence (Sticky Sessions)

```mermaid
flowchart TB
    User1["User A"] --> LB
    User2["User B"] --> LB
    LB -->|"User A → Server 1<br/>Session stored locally"| S1["Server 1"]
    LB -->|"User B → Server 2<br/>Session stored locally"| S2["Server 2"]

    subgraph Better["Better Approach: Shared Session Store"]
        S_Shared["Server 1"]
        S_Shared2["Server 2"]
        Redis["Redis<br/>Shared session store"]
        S_Shared --> Redis
        S_Shared2 --> Redis
    end

    style User1 fill:#3b82f6,color:#fff
    style User2 fill:#059669,color:#fff
    style LB fill:#7c3aed,color:#fff
    style Redis fill:#ef4444,color:#fff
```

**Sticky sessions** route the same client to the same server. Avoid when possible — use a **shared session store** (Redis) instead so any server can handle any request.

---

### Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| **ALB (L7)** | Smart routing, path-based | Slightly slower than NLB |
| **NLB (L4)** | Ultra-fast, static IP | No HTTP-level features |
| **Sticky sessions** | Simple session handling | Uneven load, server affinity issues |
| **Health checks** | Automatic failover | Adds complexity |
| **Multiple LBs** | High availability | Cost, management overhead |

---

### Scaling Strategies

| Strategy | How It Works |
|----------|-------------|
| **DNS Round Robin** | Multiple LB DNS entries, client picks one |
| **Multi-region LB** | Geo-routing to closest region's LB |
| **LB Auto Scaling** | Automatically register/deregister new servers |
| **Layer 7 Routing** | Route /api/* to API servers, /static/* to CDN |
| **Weighted routing** | Canary deployments (5% → 50% → 100%) |

---

### Interview Questions

1. **How does a load balancer improve availability?**
2. **What's the difference between L4 and L7 load balancing?**
3. **How do health checks work and what should they check?**
4. **What is the difference between sticky sessions and a shared session store?**
5. **How would you design load balancing for a global application?**

---

### Real-World Examples

| System | Load Balancer Strategy |
|--------|------------------------|
| **Amazon** | Multi-region Route53 + ALB per region + NLB for internal |
| **Netflix** | Zuul (gateway) + Ribbon (client-side LB) → migrated to Spring Cloud Gateway |
| **Cloudflare** | Global anycast + L4 LB at edge + L7 LB at origin |
| **Kubernetes** | Ingress Controller (L7) + Service (L4) — built-in LB abstraction |

---

### In Simple Words

- **Load balancers** distribute traffic across servers — essential for scaling and HA
- **L4 (NLB)** = fast, works for any TCP/UDP traffic
- **L7 (ALB)** = smarter, understands HTTP paths and headers
- **Health checks** automatically remove dead servers from the pool
- **Avoid sticky sessions** — use a shared cache (Redis) for session data instead
- **Multiple LB layers** = multiple layers of scale and redundancy
