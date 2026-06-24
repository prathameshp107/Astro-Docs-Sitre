---
title: "Sharding & Partitioning"
description: "Splitting data across multiple databases to handle massive datasets that don't fit on one machine."
sidebar:
  order: 4
---

# Sharding & Partitioning

> **Sharding** splits your data across multiple database instances. Each shard holds a subset of the data. Queries go to the correct shard based on a **shard key**.

---

## Visual: Sharding by User ID

```mermaid
flowchart LR
    App["📱 Application"] --> Router["Shard Router"]
    Router -->|"User ID 1-1000"| Shard1["Shard 1<br/>Users 1-1000"]
    Router -->|"User ID 1001-2000"| Shard2["Shard 2<br/>Users 1001-2000"]
    Router -->|"User ID 2001-3000"| Shard3["Shard 3<br/>Users 2001-3000"]

    style App fill:#7c3aed,color:#fff
    style Router fill:#4f46e5,color:#fff
    style Shard1 fill:#6366f1,color:#fff
    style Shard2 fill:#8b5cf6,color:#fff
    style Shard3 fill:#059669,color:#fff
```

---

## Sharding Strategies

| Strategy | How It Works | Pros | Cons |
|----------|-------------|------|------|
| **Hash-based** | `shard = hash(shard_key) % N` | Even distribution | Hard to add shards (rehashing) |
| **Range-based** | `shard_key` falls in a range (A-M, N-Z) | Easy range queries | Hotspots (some ranges more active) |
| **Directory-based** | A lookup table maps key → shard | Flexible, can change | The lookup service is SPOF |

---

## Horizontal vs Vertical Partitioning

| Type | Description | Example |
|------|-------------|---------|
| **Vertical** | Split columns into different tables | User profile in one table, user settings in another |
| **Horizontal** (Sharding) | Split rows across databases | Users 1-1000 in DB1, 1001-2000 in DB2 |

---

## Shard Key — The Most Important Decision

A **good shard key** distributes data **evenly** and supports your **common queries**.

**Bad shard key:** `country` — if 80% of users are from India, that shard is overloaded (hotspot).

**Good shard key:** `user_id` or `hash(user_id)` — distributes evenly.

---

## Challenges with Sharding

| Challenge | What Happens | Mitigation |
|-----------|-------------|------------|
| **Resharding** | Data grows, need to rebalance | Consistent hashing, virtual shards |
| **Joins across shards** | Slow and complex | Denormalize, or accept app-level joins |
| **Transactions across shards** | Not supported in most DBs | Distributed transactions (Saga) |
| **Hotspots** | One shard gets too much traffic | Better shard key, split hot shard |

---

## Trade-offs

- Sharding adds significant operational complexity.
- Queries that need data from multiple shards (cross-shard joins) are expensive.
- Resharding (adding more shards) requires migrating data.
- Start without sharding. Only shard when a single database can't handle the load.

---

## In Simple Words

- Sharding = cutting a big database into smaller pieces spread across machines.
- The shard key determines which piece each record goes to — pick it carefully.
- Sharding is powerful but complex. Avoid it until you genuinely outgrow one database.
