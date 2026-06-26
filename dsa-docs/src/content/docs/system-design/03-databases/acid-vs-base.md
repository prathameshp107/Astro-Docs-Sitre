---
title: "ACID vs BASE"
description: "Two philosophies of database transactions — ACID for consistency, BASE for availability."
sidebar:
  order: 6
---

# ACID vs BASE

> **ACID** guarantees strict consistency. **BASE** relaxes consistency for higher availability.

---

## ACID (SQL Databases)

| Property | Stands For | What It Means |
|:--------:|------------|---------------|
| **A** | Atomicity | A transaction either completes fully or not at all. No partial updates. |
| **C** | Consistency | Data always follows rules (constraints, triggers). |
| **I** | Isolation | Concurrent transactions don't interfere with each other. |
| **D** | Durability | Once committed, data survives crashes (written to disk). |

**Analogy — Bank transfer:** You transfer $100 from A to B. Either both accounts update (atomic), or neither does. If the server crashes mid-transfer, your money isn't lost.

---

## BASE (NoSQL Databases)

| Property | Stands For | What It Means |
|:--------:|------------|---------------|
| **BA** | Basically Available | The system responds to every request (even if data is stale). |
| **S** | Soft State | Data may change over time without input (replicas syncing). |
| **E** | Eventual Consistency | Given enough time, all copies converge to the same data. |

**Analogy — Social media:** Alice posts a photo. Bob (across the world) might not see it for a few seconds. But eventually, his feed will show it.

---

## ACID vs BASE

| Aspect | ACID | BASE |
|--------|:----:|:----:|
| **Consistency** | Strong (immediate) | Eventual (converges over time) |
| **Availability** | Lower (can reject writes to preserve consistency) | High (always accepts writes) |
| **Performance** | Slower (locking, logging) | Faster (no locking overhead) |
| **Use case** | Banking, inventory, billing | Social feeds, recommendations, logs |
| **Example DB** | PostgreSQL, MySQL | Cassandra, MongoDB (tunable) |

---

## Trade-offs

- ACID is safe but slower. BASE is fast but data might be stale.
- Pick ACID when data correctness is critical (money, hospital records).
- Pick BASE when scale and availability matter more than immediate consistency (social feeds, analytics).

---

## In Simple Words

- ACID = strict rules. All or nothing. Transaction is always correct.
- BASE = relaxed rules. Accept writes now, fix consistency later.
- Banks use ACID. Social media uses BASE. Neither is "better" — it depends on the problem.
