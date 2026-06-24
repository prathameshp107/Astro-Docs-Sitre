---
title: "Case Study 5 — Design Uber"
description: "HLD case study: Design Uber — ride matching, real-time location tracking, pricing, and geospatial indexing."
sidebar:
  order: 5
---

## Case Study 5 — Design Uber

**Problem:** Design a ride-sharing platform like Uber connecting riders with drivers in real-time, with location tracking, pricing, and payment processing.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Rider request ride, driver accept, real-time location tracking, fare calculation, payment, ratings |
| **Non-Functional** | < 1s ride match time, < 5s ETA updates, 99.99% uptime, support 25M+ trips/day, global coverage |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Users["Users"]
        Rider["🚗 Rider App"]
        Driver["🚕 Driver App"]
    end

    subgraph Services["Core Services"]
        ML["Matching Service"]
        Geo["Geospatial Service"]
        Pricing["Dynamic Pricing"]
        Trip["Trip Service"]
        Payment["Payment Service"]
    end

    subgraph Data["Data Layer"]
        Redis_Geo["Redis Geo<br/>Driver locations"]
        MySQL["MySQL<br/>Trips, Users"]
        Cassandra["Cassandra<br/>Trip history"]
        Kafka["Kafka<br/>Events stream"]
    end

    Rider --> ML
    Driver --> ML
    Rider --> Geo
    Driver --> Geo
    ML --> Pricing
    ML --> Trip --> Payment
    Geo --> Redis_Geo
    Trip --> MySQL & Cassandra
    Trip --> Kafka

    style Users fill:#f59e0b,color:#fff
    style Services fill:#7c3aed,color:#fff
    style Data fill:#3b82f6,color:#fff
```

---

### Ride Matching Flow

```mermaid
sequenceDiagram
    participant Rider as Rider
    participant Match as Matching Service
    participant Geo as Geospatial Service
    participant Driver as Nearby Drivers

    Rider->>Match: Request ride at lat/lng
    Match->>Geo: Find nearest drivers
    Geo->>Geo: Query Redis GEO (radius 2km)
    Geo-->>Match: 5 nearby drivers
    
    par Surge Pricing Check
        Match->>Pricing: Calculate fare
        Pricing-->>Match: $12.50 (distance × time × surge)
    end
    
    Match->>Driver: Send ride offer (batch)
    
    Note over Match,Driver: Drivers have 15 seconds to respond
    
    Driver-->>Match: Driver #42 accepted < 2s
    
    alt Multiple Accepts
        Match->>Match: Accept first responder
        Match->>Driver #42: ✅ Trip confirmed
        Match->>Other Drivers: ❌ Trip taken
    end
    
    Match-->>Rider: Driver assigned (ETA: 3 min)
```

---

### Key Design Decisions

**1. Geospatial Indexing**

Uber uses **H3** (hierarchical hexagonal grid) for geospatial indexing — divide the world into hexagons at different resolutions.

| System | How It Works | Pros | Cons |
|--------|-------------|------|------|
| **Redis GEO** | Geohash-based, radius query | Simple, fast | Single-threaded at high QPS |
| **H3** | Hexagonal grid, pre-computed | Highly scalable, consistent | Complex setup |
| **Elasticsearch geo** | Geo-distance query | Full-text + geo | Slower for high write volume |

**2. Dynamic Pricing (Surge)**

```mermaid
flowchart TB
    RealTime["Real-time supply/demand<br/>per geohash cell"] --> Compare{"Demand > Supply?<br/>by threshold"}
    Compare -->|"Yes"| Surge["Apply surge multiplier<br/>1.2x - 5x"]
    Compare -->|"No"| Normal["Base pricing"]
    Surge --> Incentive["Drivers incentivized<br/>→ Move to surge area"]
    Incentive --> Rebalance["Supply rebalanced"]
    Rebalance --> Normal

    style RealTime fill:#f59e0b,color:#fff
    style Surge fill:#ef4444,color:#fff
    style Normal fill:#059669,color:#fff
```

---

### Scaling & Trade-offs

| Aspect | Approach | Trade-off |
|--------|----------|-----------|
| **Location updates** | Driver app sends GPS every 4 seconds | High write throughput to Kafka |
| **Ride matching** | H3 hex grid, pre-filter by cell | Grid boundary edge cases |
| **Real-time tracking** | WebSocket + Kafka stream | Connection management at scale |
| **Payment** | Separate payment service, async | Settlement delay |

---

### In Simple Words

- **Ride matching** = find nearest driver using **geospatial index** (H3 hex grid)
- **Real-time location** = drivers stream GPS to Kafka, riders subscribe via WebSocket
- **Dynamic pricing** adjusts fares based on real-time supply/demand per area
- **Trip service** tracks the entire trip lifecycle: request → match → pick up → drop off → payment
- **Kafka** is the backbone — events flow between all microservices
- **Consistency** is eventual — it's okay if driver location lags by 2-3 seconds
