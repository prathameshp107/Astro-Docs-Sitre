---
title: "SQL vs NoSQL"
description: "When to pick a relational vs non-relational database — structure, scalability, consistency."
sidebar:
  order: 1
---

# SQL vs NoSQL

> **SQL databases** store data in tables with fixed schemas. **NoSQL databases** use flexible formats: documents, key-value pairs, wide columns, or graphs.

---

## The Big Difference

| Aspect | SQL (Relational) | NoSQL |
|--------|:----------------:|:-----:|
| **Structure** | Tables (rows + columns) | Flexible (documents, KV, graph) |
| **Schema** | Fixed — defined upfront | Dynamic — per record |
| **Relations** | ✅ JOINs, foreign keys | ❌ Denormalized, embedded |
| **Transactions** | ✅ ACID | Usually BASE (eventual consistency) |
| **Scale** | Vertical (hard to shard) | Horizontal (built-in sharding) |
| **Best for** | Structured data, complex queries | Unstructured data, rapid growth |

---

## When to Pick SQL

| Scenario | Why SQL |
|----------|---------|
| Banking / Finance | Need ACID transactions — money transfers must be atomic |
| Inventory management | Complex joins between products, orders, customers |
| Reporting & analytics | Rich querying (GROUP BY, JOIN, window functions) |
| Data integrity matters | Constraints enforce correctness (unique, foreign keys) |

---

## When to Pick NoSQL

| Scenario | Why NoSQL |
|----------|-----------|
| User profiles / session store | Flexible schema (different users have different fields) |
| Real-time chat / messaging | High-write throughput, simple key-based lookups |
| IoT sensor data | Time-series data, massive write volume |
| Product catalog | Different products have different attributes |

---

## Trade-offs

- SQL gives you **consistency and constraints** at the cost of scalability.
- NoSQL gives you **scale and flexibility** at the cost of consistency guarantees.
- Many modern systems use **both** — SQL for core transactions, NoSQL for high-volume features.

---

## In Simple Words

- SQL = rigid table with rows. Great for financial data where correctness is critical.
- NoSQL = flexible documents. Great for rapidly changing data at massive scale.
- Pick SQL first by default. Only move to NoSQL when you have a specific reason (scale, flexible schema).
