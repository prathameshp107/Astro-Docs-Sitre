---
title: "What is an In-Memory Database"
description: "Every computer has two types of storage:"
---

## 2. What is an In-Memory Database

### What Does "In-Memory" Mean?

Every computer has two types of storage:

| Storage Type | Location | Speed | Volatile? | Size |
|---|---|---|---|---|
| **RAM (Memory)** | Memory chips on motherboard | ~100 nanoseconds | Yes (lost on power off) | 8 GB – 256 GB |
| **Disk (SSD/HDD)** | Physical drive | ~100 microseconds (SSD) | No (persistent) | 256 GB – 16 TB |

> **Analogy:** RAM is your desk — fast access, limited space. Disk is your filing cabinet — slow access, unlimited space.

Redis stores all data in **RAM**. This means:
- No waiting for disk read/write operations
- Data access is in **nanoseconds to microseconds**
- It is 100x to 1000x faster than disk-based databases

---

### Performance Comparison

| Operation | MySQL (disk) | Redis (RAM) |
|---|---|---|
| Simple key lookup | ~1–5 ms | ~0.1 ms |
| Complex query | ~10–500 ms | N/A (not designed for this) |
| Write throughput | ~5,000/sec | ~1,000,000/sec |
| Read throughput | ~10,000/sec | ~1,000,000/sec |

---

### Disk vs Memory Diagram

```mermaid
flowchart LR
    subgraph RAM[RAM — Memory
      ~100 nanoseconds
      Volatile (lost on restart)]
        R1["📝 Redis<br/>1M ops/sec
        < 0.1ms per lookup"]
    end
    
    subgraph Disk[Disk — SSD/HDD
      ~100 microseconds
      Persistent (survives restart)]
        D1["🗄️ MySQL / PostgreSQL<br/>~5K ops/sec
        ~1-5ms per lookup"]
    end
    
    RAM -->|100x - 1000x faster ⚡| Speed[Redis wins on speed]
    Disk -->|Safe storage ✅| Safety[DB wins on durability]
    
    style RAM fill:#7c3aed,color:#fff
    style Disk fill:#3b82f6,color:#fff
    style R1 fill:#7c3aed,color:#fff
    style D1 fill:#3b82f6,color:#fff
    style Speed fill:#059669,color:#fff
    style Safety fill:#f59e0b,color:#fff
```

> **Analogy:** RAM is your desk — fast access, limited space. Disk is your filing cabinet — slow access, unlimited space.

---

### Volatility Concern

Since Redis stores data in RAM, if the server crashes, the data is **lost**. Redis solves this with **persistence mechanisms** (RDB snapshots and AOF logs) discussed in [Section 12](#12-redis-persistence).

> **Tip:** For use cases like session caching or rate limiting, losing data on restart is acceptable. For critical data, enable persistence or use Redis alongside a durable database.

---
