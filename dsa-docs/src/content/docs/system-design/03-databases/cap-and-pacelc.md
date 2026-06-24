---
title: "CAP Theorem & PACELC"
description: "In a distributed system, you can't have all three: consistency, availability, and partition tolerance."
sidebar:
  order: 7
---

# CAP Theorem & PACELC

> The **CAP theorem** says: under a network partition (P), you must choose between **Consistency** (all nodes see the same data) and **Availability** (every request gets a response).

---

## The CAP Triangle

```mermaid
flowchart TB
    subgraph CAP["CAP Theorem — Pick 2"]
        direction LR
        C["Consistency<br/>Every read gets the latest write"]
        A["Availability<br/>Every request gets a response"]
        P["Partition Tolerance<br/>System works despite network failures"]
    end

    C --- A
    A --- P
    P --- C
    CP["CP Systems:<br/>Banking, Zookeeper"] --- A
    AP["AP Systems:<br/>DNS, Cassandra"] --- C
    CA["CA Systems (rare):<br/>Single-node DB"] --- P

    style C fill:#7c3aed,color:#fff
    style A fill:#4f46e5,color:#fff
    style P fill:#6366f1,color:#fff
    style CP fill:#059669,color:#fff
    style AP fill:#8b5cf6,color:#fff
    style CA fill:#dc2626,color:#fff
```

**The reality:** Network partitions are inevitable. So the real choice is **CP vs AP**.

---

## CP vs AP — Real Examples

### CP (Consistency + Partition Tolerance)

When a partition happens, the system stops accepting writes until consistency is restored.

**Example — Bank transfer:**
- Network splits between two data centers
- The system blocks writes
- Better to be down than to show wrong balances

### AP (Availability + Partition Tolerance)

When a partition happens, the system continues accepting writes. Consistency will be restored later.

**Example — Social media likes:**
- Network splits between two data centers
- Both centers accept likes
- When the network heals, they sync up

---

## PACELC Extension

PACELC adds nuance: if no partition (E = Else), the choice is between **Latency** and **Consistency**:

```
If Partition (P) → choose Availability or Consistency
Else (E)         → choose Latency or Consistency

Example — Cassandra:
  - P → AP (keep accepting writes, sync later)
  - E → Prefer lower latency (eventual consistency)
```

---

## System Classifications

| System | CAP Choice | Reasoning |
|--------|:----------:|-----------|
| PostgreSQL | CA (single node) / CP (clustered) | Strong consistency, will reject writes during partition |
| MongoDB | CP (default) | Primary handles writes, replicas only if consistent |
| Cassandra | AP | Always writable, eventual consistency |
| Redis (cluster) | CP | Cluster unavailable during failover |
| DNS | AP | Stale records are fine, availability is critical |

---

## Trade-offs

- There's no "right" choice — it depends on your requirements.
- **Finance/Inventory** → Consistency (can't show wrong balance).
- **Social/Content** → Availability (better to show stale data than an error).
- **Monitoring/Logs** → Availability (a few lost metrics is fine).

---

## In Simple Words

- CAP says: when the network breaks, pick between correct data (consistency) or always-up service (availability).
- Most systems pick availability because showing slightly stale data is better than showing nothing.
- PACELC adds: even without network issues, you choose between fast responses and perfectly up-to-date data.
