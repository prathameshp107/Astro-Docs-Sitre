---
title: "Redis Sentinel"
description: "Redis Sentinel provides high availability by automatically monitoring Redis instances and promoting a replica to primary when the current primary fails."
---

## 19. Redis Sentinel

### What is Sentinel?

**Sentinel** is a distributed system that provides **high availability** for Redis. It monitors your Redis instances and automatically handles failures — if the primary goes down, Sentinel promotes a replica to become the new primary.

> **Analogy:** Sentinel is like a building security guard who monitors security cameras. If they see the main guard (primary) is asleep, they wake up the backup guard (replica) to take over.

### Sentinel Failover

```mermaid
flowchart TB
    subgraph Normal[Normal Operation]
        P1[🔵 Primary<br/>Handles all writes] --> R1[🟢 Replica 1<br/>Read-only]
        P1 --> R2[🟢 Replica 2<br/>Read-only]
        S1[👁️ Sentinel] --- P1
        S2[👁️ Sentinel] --- P1
        S3[👁️ Sentinel] --- P1
    end
    
    Normal -->|Primary crashes 💥| Detection
    
    subgraph Detection[Failure Detection]
        D1[Sentinels detect<br/>primary is DOWN<br/>Quorum: 2 of 3 agree]
    end
    
    Detection --> Failover
    
    subgraph Failover[Automatic Failover]
        F1[Sentinel elects<br/>a replica to promote]
        F2[Replica becomes<br/>new primary 🔵]
        F3[Other replica<br/>points to new primary]
        F1 --> F2 --> F3
    end
    
    Failover --> Recovery
    
    subgraph Recovery[After Recovery]
        NewP[🔵 New Primary<br/>(formerly Replica 1)] --> NewR1[🟢 Replica 2<br/>Pointed to new primary]
        NewP --> OldP[🟢 Old primary comes back<br/>Becomes a replica of new primary]
    end
    
    style P1 fill:#7c3aed,color:#fff
    style Normal fill:#3b82f6,color:#fff
    style Detection fill:#f59e0b,color:#fff
    style Failover fill:#ec4899,color:#fff
    style Recovery fill:#059669,color:#fff
    style NewP fill:#7c3aed,color:#fff
```

---

### How Sentinel Works

1. **Monitor** — 3+ Sentinel processes constantly ping Redis instances (every 1 second)
2. **Detect** — If primary doesn't respond, Sentinel marks it as "subjectively down" (SDOWN)
3. **Confirm** — Multiple Sentinels must agree (quorum) — then it's "objectively down" (ODOWN)
4. **Vote** — Sentinels vote on which replica should become the new primary
5. **Failover** — The chosen replica becomes primary, other replicas point to it
6. **Notify** — Sentinels update the application about the new primary address

---

### Sentinel Configuration

```bash
# sentinel.conf
sentinel monitor mymaster 127.0.0.1 6379 2  # 2 = quorum
sentinel down-after-milliseconds mymaster 5000  # 5s = considered down
sentinel failover-timeout mymaster 60000  # 60s max for failover
sentinel parallel-syncs mymaster 1  # 1 replica at a time during failover
```

```bash
# Run Sentinels (3 separate processes)
redis-sentinel /path/to/sentinel.conf
```

---

### Sentinel Commands

```bash
# Check Sentinel status
SENTINEL masters
SENTINEL replicas mymaster
SENTINEL sentinels mymaster

# Get current primary address (app connects here)
SENTINEL get-master-addr-by-name mymaster
# Output: 1) "192.168.1.100" 2) "6379"

# Force failover (manually trigger)
SENTINEL failover mymaster
```

---

### Minimum Production Setup

```text
3 Redis instances:    1 primary + 2 replicas
3 Sentinel processes: Monitor the Redis instances

Why 3 Sentinels? If 1 Sentinel fails, the other 2 can still reach quorum (2/3).
```

---

### In Simple Words

- **Sentinel** provides automatic failover — if your Redis primary crashes, a replica takes over
- You need **at least 3 Sentinel processes** for reliable quorum voting
- Sentinels talk to each other to agree if a failure happened
- Applications ask Sentinel for the current primary address (it changes after failover)
- Sentinel handles: monitoring, failure detection, voting, promoting replicas, and notifying apps
- Use Sentinel when you need **high availability** (99.99% uptime) without manual intervention
