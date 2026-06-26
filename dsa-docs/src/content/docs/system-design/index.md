---
title: "System Design"
description: "Complete system design track covering fundamentals to case studies — with diagrams, trade-offs, and interview prep."
sidebar:
  order: 1
---

# System Design

> System design is the art of building large-scale systems. This track takes you from zero to confidently designing **URL shorteners, chat apps, video streaming, ride-sharing, and more**.

---

## Learning Path

```mermaid
flowchart TB
    F["01 Fundamentals<br/>Concepts & Estimation"] --> B["02 Building Blocks<br/>LB, DNS, CDN, Proxies"]
    B --> DB["03 Databases<br/>SQL vs NoSQL, Replication, Sharding"]
    DB --> C["04 Caching<br/>Strategies & Eviction"]
    C --> Comm["05 Communication<br/>REST, gRPC, MQ, WebSockets"]
    Comm --> Arch["06 Architecture Patterns<br/>Microservices, CQRS, Saga"]
    Arch --> DS["07 Distributed Systems<br/>Consensus, Idempotency"]
    DS --> R["08 Reliability & Scale<br/>Rate Limiting, Observability"]
    R --> Sec["09 Security<br/>Auth, Encryption"]
    Sec --> IG["10 Interview Guide<br/>Framework & Templates"]
    IG --> CS["11 Case Studies<br/>Apply Everything!"]

    style F fill:#7c3aed,color:#fff
    style B fill:#4f46e5,color:#fff
    style DB fill:#6366f1,color:#fff
    style C fill:#8b5cf6,color:#fff
    style Comm fill:#7c3aed,color:#fff
    style Arch fill:#4f46e5,color:#fff
    style DS fill:#6366f1,color:#fff
    style R fill:#8b5cf6,color:#fff
    style Sec fill:#7c3aed,color:#fff
    style IG fill:#059669,color:#fff
    style CS fill:#059669,color:#fff
```

---

## Sections at a Glance

| Section | What You'll Learn |
|---------|-------------------|
| **01 Fundamentals** | HLD vs LLD, requirements, estimation, scalability terms |
| **02 Building Blocks** | Client-server, scaling, load balancers, DNS, CDN, proxies |
| **03 Databases** | SQL vs NoSQL, replication, sharding, CAP theorem |
| **04 Caching** | Cache strategies, eviction policies, CDN caching |
| **05 Communication** | REST vs gRPC vs GraphQL, WebSockets, message queues |
| **06 Architecture Patterns** | Monolith vs microservices, serverless, CQRS, Saga |
| **07 Distributed Systems** | Consistency models, consensus, idempotency |
| **08 Reliability & Scale** | SLAs, rate limiting, circuit breakers, observability |
| **09 Security** | Auth/OAuth2, encryption, common attacks |
| **10 Interview Guide** | Step-by-step framework, mistakes to avoid, cheat sheet |
| **11 Case Studies** | URL shortener, chat, video streaming, Uber, and more |

---

## How to Use This Track

- Start with **01 Fundamentals** if you're new to system design.
- Each page ends with **Trade-offs** and **In Simple Words**.
- The **Case Studies** section ties everything together — each follows the same template.
- Jump to the **Interview Guide** for a quick revision before interviews.
