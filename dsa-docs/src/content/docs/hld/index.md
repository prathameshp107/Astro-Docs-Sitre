---
title: "High-Level Design (HLD)"
description: "Complete High-Level Design track — system architecture, scalability, distributed systems, cloud architecture, and real-world case studies."
---

# High-Level Design (HLD)

**High-Level Design (HLD)** is the big-picture view of a software system. It describes the **architecture, components, data flow, scalability, and trade-offs** before a single line of code is written. This track teaches you how to think like a software architect.

> **Analogy:** HLD is like the blueprint of a skyscraper — it shows the floor plan, elevator shafts, plumbing routes, and electrical grid. The actual construction (LLD / coding) happens later, guided by this blueprint.

---

## Learning Path

```mermaid
flowchart LR
    Intro["01 Introduction<br/>What is HLD?"] --> Req["02 Requirements<br/>Functional & Non-Functional"]
    Req --> Cap["03 Capacity Estimation<br/>Traffic & Storage"]
    Cap --> Arch["04 Architecture Styles<br/>Monolith vs Microservices"]
    Arch --> LB["05 Load Balancers"]
    LB --> GW["06 API Gateway"]
    GW --> Cache["07 Caching Strategies"]
    Cache --> DB["08 Database Selection"]
    DB --> MQ["09 Message Queues"]
    MQ --> EDA["10 Event-Driven Architecture"]
    EDA --> CDN["11 CDN Design"]
    CDN --> Auth["12 Auth Architecture"]
    Auth --> File["13 File Storage"]
    File --> Mon["14 Monitoring & Observability"]
    Mon --> HA["15 High Availability"]
    HA --> DR["16 Disaster Recovery"]
    DR --> Cloud["17 Cloud Architecture"]
    Cloud --> Multi["18 Multi-Tenant Systems"]
    Multi --> RT["19 Real-Time Systems"]
    RT --> Interview["20 System Design Interviews"]

    style Intro fill:#7c3aed,color:#fff
    style Arch fill:#4f46e5,color:#fff
    style DB fill:#059669,color:#fff
    style HA fill:#f59e0b,color:#fff
    style Cloud fill:#ef4444,color:#fff
    style Interview fill:#6366f1,color:#fff
```

---

## Sections Overview

| # | Topic | What You'll Learn |
|---|-------|-------------------|
| 01 | Introduction to HLD | What is HLD, goals, key concepts, architecture vs design |
| 02 | Requirements Gathering | Functional vs non-functional requirements, defining scope |
| 03 | Capacity Estimation | Traffic estimation, storage calculation, bandwidth planning |
| 04 | Monolith vs Microservices | Architecture styles, when to use which, trade-offs |
| 05 | Load Balancers | Types (ALB/NLB), algorithms, health checks, session persistence |
| 06 | API Gateway | Routing, rate limiting, auth, aggregation, versioning |
| 07 | Caching Strategies | Cache types, eviction policies, CDN caching, cache invalidation |
| 08 | Database Selection | SQL vs NoSQL, sharding, replication, CAP theorem in practice |
| 09 | Message Queues | SQS, Kafka, RabbitMQ, pub/sub, async processing patterns |
| 10 | Event-Driven Architecture | Events, event sourcing, CQRS, saga patterns |
| 11 | CDN Design | Content delivery, edge caching, dynamic vs static content |
| 12 | Authentication Architecture | OAuth 2.0, JWT, SSO, session management, token storage |
| 13 | File Storage Architecture | Object vs block vs file storage, S3, CDN integration |
| 14 | Monitoring & Observability | Logs, metrics, traces, dashboards, SLI/SLO/SLA |
| 15 | High Availability | Redundancy, failover, multi-AZ, active-passive/active-active |
| 16 | Disaster Recovery | RPO/RTO, backup strategies, DR plans (pilot light, warm standby) |
| 17 | Cloud Architecture | AWS/Azure/GCP patterns, multi-cloud, hybrid cloud, cost optimization |
| 18 | Multi-Tenant Systems | Tenant isolation, data partitioning, rate limiting per tenant |
| 19 | Real-Time Systems | WebSockets, server-sent events, pub/sub, low-latency design |
| 20 | System Design Interviews | Framework, template, common questions, mock interviews |

---

## Case Studies

Each case study follows a consistent template: **Problem → Requirements → Architecture → Components → Data Flow → Trade-offs → Scaling**.

| # | Case Study | Key Concepts |
|---|-----------|--------------|
| 1 | Design URL Shortener | Key generation, redirection, analytics, sharding |
| 2 | Design WhatsApp | Real-time messaging, presence, end-to-end encryption |
| 3 | Design Netflix | Video streaming, CDN, recommendation engine |
| 4 | Design YouTube | Video upload, transcoding, global distribution |
| 5 | Design Uber | Ride matching, geolocation, real-time tracking |
| 6 | Design Instagram | Feed generation, media storage, social graph |
| 7 | Design Google Drive | File sync, versioning, conflict resolution |
| 8 | Design Notification System | Push/email/SMS, delivery guarantees, templating |
| 9 | Design Payment Gateway | Transaction flow, idempotency, reconciliation |
| 10 | Design Search Engine | Crawling, indexing, ranking, query processing |

---

## Prerequisites

- Basic understanding of **web applications** (client-server model)
- Familiarity with **databases** (SQL and NoSQL concepts)
- Basic knowledge of **networking** (HTTP, TCP/IP)
- No prior architecture experience required — this track starts from fundamentals

---

## How This Track Works

- Each page follows a consistent template: **Problem → Requirements → Architecture → Components → Data Flow → Trade-offs → Scaling → Interview Questions → Real-World Examples**
- **Mermaid diagrams** illustrate every architecture and flow
- Pages end with key **trade-offs** and **in simple words** summaries
- **Case studies** apply everything you've learned to real-world systems

Start with **[01 — Introduction to HLD](./01-introduction-to-hld)** to begin your journey!
