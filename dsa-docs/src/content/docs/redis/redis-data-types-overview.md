---
title: "Redis Data Types Overview"
description: "Redis is not just a simple key-value store. It supports multiple rich data structures, each designed for specific use cases."
---

## 5. Redis Data Types Overview

Redis is not just a simple key-value store. It supports multiple rich data structures, each designed for specific use cases.

| Data Type | Best Used For | Real-World Example |
|---|---|---|
| **String** | Simple values, counters, cached HTML | Page view counter, session token |
| **List** | Ordered collections, queues, timelines | Task queue, activity feed |
| **Set** | Unique collections, memberships | Unique visitors, user tags |
| **Sorted Set** | Ranked collections with scores | Leaderboard, trending topics |
| **Hash** | Object-like storage with fields | User profile, product details |
| **Bitmap** | Bit-level operations | Daily active users tracking |
| **HyperLogLog** | Approximate unique count | Unique website visitors (approximate) |
| **Stream** | Append-only log, event sourcing | IoT sensor data, event logs |

---

### Data Type Hierarchy Diagram

![Data Type Hierarchy Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-data-types-overview-data-type-hierarchy-diagram.svg)

---
