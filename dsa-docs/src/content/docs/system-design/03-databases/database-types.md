---
title: "Database Types"
description: "Relational, document, key-value, wide-column, graph, and time-series databases — when to use each."
sidebar:
  order: 2
---

# Database Types

> Not all data is the same shape. Different database types are optimized for different data patterns.

---

## The 6 Major Types

| Type | Example | Data Shape | Use Case |
|------|---------|-----------|----------|
| **Relational** | PostgreSQL, MySQL | Tables with rows | Transactions, inventory |
| **Document** | MongoDB, Couchbase | JSON-like documents | User profiles, catalogs |
| **Key-Value** | Redis, DynamoDB | Key → value pairs | Cache, session store |
| **Wide-Column** | Cassandra, Bigtable | Rows with many columns | Time-series, IoT |
| **Graph** | Neo4j, ArangoDB | Nodes + edges | Social networks, recommendations |
| **Time-Series** | InfluxDB, TimescaleDB | Timestamp → value | Metrics, monitoring |

---

## Quick Decision Guide

```mermaid
flowchart TB
    Q1{"Data has strong<br/>relationships,<br/>needs JOINs?"}
    Q1 -->|Yes| SQL["Relational (PostgreSQL)"]
    Q1 -->|No| Q2{"Schema is<br/>flexible or<br/>changes often?"}

    Q2 -->|Yes| Q3{"Data structure<br/>looks like<br/>documents?"}
    Q2 -->|No| Q4{"Primary access<br/>is by key?"}

    Q3 -->|Yes| Doc["Document (MongoDB)"]
    Q3 -->|No| GraphQ{"Need to traverse<br/>relationships?"}
    GraphQ -->|Yes| Graph["Graph (Neo4j)"]

    Q4 -->|Yes| KV["Key-Value (Redis)"]
    Q4 -->|No| WC{"Massive write<br/>volume, time-ordered?"}
    WC -->|Yes| Col["Wide-Column (Cassandra)"]
    WC -->|No| TS["Time-Series (InfluxDB)"]

    style SQL fill:#7c3aed,color:#fff
    style Doc fill:#4f46e5,color:#fff
    style KV fill:#6366f1,color:#fff
    style Col fill:#8b5cf6,color:#fff
    style Graph fill:#059669,color:#fff
    style TS fill:#059669,color:#fff
```

---

## Trade-offs

| Database | Read Perf | Write Perf | Consistency | Scalability |
|----------|:---------:|:----------:|:-----------:|:-----------:|
| Relational | Medium | Medium | Strong | Hard |
| Document | High | High | Tunable | Good |
| Key-Value | ⚡ Very High | ⚡ Very High | Usually eventual | Excellent |
| Wide-Column | High | ⚡ Very High | Eventual | Excellent |
| Graph | Medium (traversal) | Low (nodes) | Strong | Hard |
| Time-Series | High (range) | ⚡ Very High | Eventual | Good |

---

## In Simple Words

- Use the database that matches your data shape — don't force a square peg into a round hole.
- Relational for structured, joined data. Document for JSON-like objects. KV for fast lookups.
- Wide-column for write-heavy time-series. Graph for connected data (friends, recommendations).
