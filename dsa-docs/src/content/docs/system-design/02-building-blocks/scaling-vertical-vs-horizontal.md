---
title: "Vertical vs Horizontal Scaling"
description: "Scale up (bigger machine) vs scale out (more machines) — costs, limits, and trade-offs."
sidebar:
  order: 2
---

# Vertical vs Horizontal Scaling

> **Vertical scaling** = get a bigger server. **Horizontal scaling** = get more servers.

---

## Visual Comparison

```mermaid
flowchart LR
    subgraph Vertical["Vertical Scaling (Scale Up)"]
        V1["1 Server<br/>32 CPU, 128 GB RAM"] --> V2["1 Server<br/>64 CPU, 256 GB RAM"]
    end

    subgraph Horizontal["Horizontal Scaling (Scale Out)"]
        H1["1 Server"] --> H2["2 Servers"]
        H2 --> H3["4 Servers<br/>+ Load Balancer"]
    end

    style V1 fill:#7c3aed,color:#fff
    style V2 fill:#4f46e5,color:#fff
    style H1 fill:#6366f1,color:#fff
    style H2 fill:#8b5cf6,color:#fff
    style H3 fill:#059669,color:#fff
```

---

## Comparison

| Aspect | Vertical | Horizontal |
|--------|----------|------------|
| **Method** | Bigger machine | More machines |
| **Max limit** | Hardware ceiling (largest machine available) | Theoretically infinite |
| **Cost** | Expensive (top-tier hardware has a premium) | Can use cheap commodity machines |
| **Complexity** | Simple (run on one machine) | Complex (load balancers, data sync) |
| **Fault tolerance** | None (one machine fails → system down) | High (other machines take over) |
| **Downtime on upgrade** | Required (restart the machine) | None (rolling update) |
| **Best for** | Small apps, databases | Large-scale web services |

---

## When to Use Which

**Use vertical scaling when:**
- Your traffic is predictable and small
- You want simple operations
- You're running a database (distributed DBs are hard)

**Use horizontal scaling when:**
- You expect to grow beyond one machine's capacity
- You need high availability (no downtime)
- You want to use cheap commodity hardware

---

## The Database Problem

Databases are hard to scale horizontally because they need **consistency**. Common approaches:

- **Read replicas** — one primary writes, many replicas read (horizontal reads)
- **Sharding** — split data across databases (horizontal writes — complicated)
- **Caching** — reduce database load (delays the scaling problem)

---

## Trade-offs

- Vertical has a hard ceiling. Horizontal is elastic.
- Horizontal adds operational complexity (more machines = more things that break).
- Most mature systems start vertical, then add horizontal layers as they grow.

---

## In Simple Words

- Vertical = buy a bigger truck. Horizontal = buy more trucks.
- Vertical is simpler but has limits. Horizontal is complex but can grow forever.
- Databases usually start vertical; only shard when you absolutely must.
