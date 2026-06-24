---
title: "Consistency Models"
description: "Strong, eventual, causal consistency — what each guarantees and when to use them."
sidebar:
  order: 1
---

# Consistency Models

> A **consistency model** defines when a write is visible to subsequent reads. Different models trade correctness for performance.

---

## The Spectrum

```mermaid
flowchart LR
    Strong["🔒 Strong<br/>Every read sees latest write"] --> Causal["🔄 Causal<br/>Related events in order"]
    Causal --> Eventual["☁️ Eventual<br/>All copies converge eventually"]
    Eventual --> Weak["⚡ Weak<br/>No guarantees"]

    style Strong fill:#7c3aed,color:#fff
    style Causal fill:#4f46e5,color:#fff
    style Eventual fill:#6366f1,color:#fff
    style Weak fill:#8b5cf6,color:#fff
```

| Model | Guarantee | Latency | Use Case |
|-------|-----------|:-------:|----------|
| **Strong** | Read returns the latest write | High | Banking, inventory |
| **Eventual** | Reads may return stale data, converges | Low | Social feeds, DNS |
| **Causal** | Related events in order, unrelated events can be stale | Medium | Comments, chat |
| **Weak** | No guarantees for a time window | Lowest | Logs, analytics |

---

## Strong Consistency

Every read returns the **most recent write** — always.

**How it's achieved:** Quorum reads/writes, synchronous replication.

**Example — Bank balance:**
- User A sends $100 to User B
- Any read of the balance immediately shows the deduction

**Cost:** Higher latency (must wait for all replicas to confirm).

---

## Eventual Consistency

Given enough time without updates, all replicas converge to the same value.

**How it's achieved:** Asynchronous replication, conflict resolution.

**Example — DNS:**
- You update a DNS record
- It takes minutes/hours to propagate worldwide
- Some users see the old IP, some see the new one
- Eventually everyone sees the new IP

**Cost:** Stale reads, but very fast writes.

---

## Causal Consistency

Related operations are seen in order. Unrelated operations can be out of order.

**Example — Social media comments:**
- Alice posts "Great photo!"
- Bob replies "Thanks!"
- Any user sees Bob's reply AFTER Alice's comment (causal order)
- But Bob's unrelated status update might appear in either order

---

## Trade-offs

- Strong consistency is **expensive** (high latency, low availability during partitions).
- Eventual consistency is **fast** but users might see stale data.
- Pick the weakest consistency that your application can tolerate.
- Most systems use **strong consistency for critical paths** (payments) and **eventual for non-critical** (likes, views).

---

## In Simple Words

- Strong = you always see the latest data (but slow).
- Eventual = you might see old data for a bit, but it'll catch up (but fast).
- Pick consistency based on what each feature needs — not a single model for everything.
