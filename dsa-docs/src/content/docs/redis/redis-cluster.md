---
title: "Redis Cluster"
description: "Redis Cluster provides horizontal scaling by automatically sharding data across multiple Redis nodes using hash slots."
---

## 20. Redis Cluster

### What is Redis Cluster?

**Redis Cluster** is a way to run Redis on **multiple machines** by automatically splitting (sharding) data across them. It provides **horizontal scaling** — you can add more nodes to handle more data.

> **Analogy:** A single Redis is like one cashier at a store — they handle all customers. A Cluster is like having 10 cashiers — each handles a separate line, so the store can serve 10x more customers.

### Cluster Architecture: Hash Slots

```mermaid
flowchart LR
    Key["Key: user:42"] --> Hash[Hash the key<br/>CRC16 hash function]
    Hash --> Slot[Compute slot<br/>CRC16(key) % 16384<br/>→ Slot 7623]
    Slot --> Node{Pick node by slot}
    
    Node -->|Slots 0-5500| Node1[🟢 Node 1<br/>Primary]
    Node -->|Slots 5501-11000| Node2[🟢 Node 2<br/>Primary]
    Node -->|Slots 11001-16383| Node3[🟢 Node 3<br/>Primary]
    
    Node1 --> R1[🟡 Replica<br/>Backup for Node 1]
    Node2 --> R2[🟡 Replica<br/>Backup for Node 2]
    Node3 --> R3[🟡 Replica<br/>Backup for Node 3]
    
    style Key fill:#7c3aed,color:#fff
    style Hash fill:#3b82f6,color:#fff
    style Slot fill:#f59e0b,color:#fff
    style Node1 fill:#059669,color:#fff
    style Node2 fill:#059669,color:#fff
    style Node3 fill:#059669,color:#fff
    style R1 fill:#f59e0b,color:#fff
    style R2 fill:#f59e0b,color:#fff
    style R3 fill:#f59e0b,color:#fff
```

---

### How Cluster Works

- **16,384 hash slots** — Redis hashes every key and assigns it to one slot
- Each node in the cluster owns a **range of slots** (e.g., Node 1: slots 0-5500)
- When you add/remove nodes, slots are **rebalanced** (some moved to new nodes)
- Every node knows about every other node — **full mesh topology**
- **Replicas** provide high availability — if a primary fails, its replica takes over

---

### Key Commands

```bash
# Create a cluster (6 nodes: 3 primaries + 3 replicas)
redis-cli --cluster create \
  192.168.1.1:6379 192.168.1.2:6379 192.168.1.3:6379 \
  192.168.1.4:6379 192.168.1.5:6379 192.168.1.6:6379 \
  --cluster-replicas 1

# Check cluster info
CLUSTER INFO

# List nodes in the cluster
CLUSTER NODES

# Check which slot a key belongs to
CLUSTER KEYSLOT user:42
# Output: (integer) 7623

# Count keys in a specific slot
CLUSTER COUNTKEYSINSLOT 7623
```

---

### Hash Slot Tags

By default, Redis hashes the **entire key** to determine its slot. Hash tags let you force certain keys to the same slot:

```bash
# Keys with {USER} in the same part go to the same slot
SET {USER}:42:name "Alice"
SET {USER}:42:email "alice@example.com"
# Both keys go to the same slot → supports multi-key operations!
```

---

### When to Use Cluster

| Scenario | Use Cluster? | Why |
|----------|-------------|-----|
| < 10 GB data | ❌ No | Single Redis is simpler and faster |
| 10-100 GB data | ✅ Maybe | Depends on write throughput |
| > 100 GB data | ✅ Yes | Must split across machines |
| High write throughput | ✅ Yes | Spread writes across primaries |
| Need multi-key transactions | ⚠️ Partial | Only within same hash slot |
| Simple setup | ❌ No | Cluster adds complexity |

---

### Cluster vs Sentinel vs Replication

| Feature | Replication | Sentinel | Cluster |
|---------|-------------|----------|---------|
| Read scaling | ✅ Yes | ✅ Yes | ✅ Yes |
| Write scaling | ❌ No | ❌ No | ✅ Yes (sharding) |
| Auto failover | ❌ Manual | ✅ Automatic | ✅ Automatic |
| Max data size | RAM of one server | RAM of one server | RAM of all servers combined |
| Multi-key ops | ✅ Yes | ✅ Yes | ⚠️ Same slot only |
| Complexity | Low | Medium | High |

---

### In Simple Words

- **Cluster** splits data across multiple Redis servers (horizontal scaling)
- Each key is assigned to one of **16,384 hash slots** using CRC16 hashing
- Each node owns a range of slots — add nodes to redistribute slots
- **Replicas** provide automatic failover if a primary node fails
- Use Cluster when **data exceeds one server's RAM** or **write throughput is too high**
- Hash tags (`{...}`) let you keep related keys on the same node
- Cluster adds complexity — use only when you truly need it
