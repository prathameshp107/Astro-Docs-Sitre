---
title: "Redis Persistence"
description: "Redis stores data in RAM, which is volatile — a server restart means all data is gone. Redis provides two persistence mechanisms to save data to disk."
---

## 12. Redis Persistence

### Why Persistence Matters

Redis stores data in RAM, which is volatile — a server restart means all data is gone. Redis provides two persistence mechanisms to save data to disk.

---

### RDB (Redis Database) Snapshots

RDB creates a **point-in-time snapshot** of the entire dataset and saves it to a binary file (`dump.rdb`).

**How it works:**
1. At configured intervals, Redis forks a child process
2. The child writes the entire dataset to a temporary file
3. The temporary file replaces the old `dump.rdb`

**Configure in redis.conf:**
```
save 900 1     # Save if 1 key changed in 900 seconds
save 300 10    # Save if 10 keys changed in 300 seconds
save 60 10000  # Save if 10000 keys changed in 60 seconds
```

**Manual snapshot:**
```bash
# Synchronous — blocks Redis until done (avoid in production)
SAVE

# Asynchronous — Redis continues serving clients
BGSAVE
```

---

### AOF (Append Only File) Logs

AOF logs **every write command** to a file (`appendonly.aof`). On restart, Redis replays all commands to rebuild the dataset.

**Configure in redis.conf:**
```
appendonly yes
appendfilename "appendonly.aof"

# How often to sync to disk:
# always   — every command (safest, slowest)
# everysec — every second (good balance)
# no       — let OS decide (fastest, least safe)
appendfsync everysec
```

---

### RDB vs AOF Comparison

| Feature | RDB | AOF |
|---|---|---|
| **Data safety** | May lose up to minutes of data | Can lose at most 1 second of data |
| **File size** | Compact binary file | Larger (all commands logged) |
| **Performance impact** | Low (periodic fork) | Slightly higher (every write) |
| **Recovery speed** | Fast | Slower (replay all commands) |
| **Use case** | Backups, disaster recovery | High durability requirements |

> **Best practice:** Use **both** RDB and AOF together. RDB for fast recovery, AOF for minimal data loss.

---

### Persistence Flow Diagram

```mermaid
flowchart TB
    Redis[Redis Server<br/>Data in RAM] --> RDB[RDB Snapshot
Point-in-time dump.rdb]
    Redis --> AOF[AOF Append-Only Log
Every write command logged]
    
    RDB --> RDBHow["Saves periodically<br/>save 900 1 / save 300 10<br/>Compact binary file<br/>Fast recovery ⚡"]
    AOF --> AOFHow["Logs every command<br/>appendfsync everysec<br/>Larger file, slower recovery
Minimal data loss 🛡️"]
    
    RDB --> Best1["Best for: Backups,
    disaster recovery"]
    AOF --> Best2["Best for: High durability,
    crash recovery"]
    
    Both["✅ Best Practice: Use BOTH<br/>RDB for fast restart + AOF for safety"]
    RDBHow --> Both
    AOFHow --> Both
    
    style Redis fill:#7c3aed,color:#fff
    style RDB fill:#3b82f6,color:#fff
    style AOF fill:#059669,color:#fff
    style RDBHow fill:#3b82f6,color:#fff
    style AOFHow fill:#059669,color:#fff
    style Best1 fill:#3b82f6,color:#fff
    style Best2 fill:#059669,color:#fff
    style Both fill:#f59e0b,color:#fff
```

> **One-liner:** RDB takes photos of your data at set times. AOF records every single action. Use both for best results.

---
