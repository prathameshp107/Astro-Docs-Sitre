---
title: "📁 System Design Content Structure Overview"
---
# 📁 System Design Content Structure Overview

> **Location:** `dsa-docs/src/content/docs/system-design/`
> **Total Files:** 52+ files across 11 sections

## 📂 Directory Tree

```
system-design/
├── 📄 index.md
│
├── 📂 01-fundamentals/             (4 files)
│   ├── what-is-system-design.md
│   ├── functional-vs-non-functional-requirements.md
│   ├── how-to-approach-a-problem.md
│   └── back-of-the-envelope-estimation.md
│
├── 📂 02-building-blocks/          (5 files)
│   ├── client-server-model.md
│   ├── dns-and-cdn.md
│   ├── load-balancing.md
│   ├── proxies.md
│   └── scaling-vertical-vs-horizontal.md
│
├── 📂 03-databases/                (7 files)
│   ├── database-types.md
│   ├── sql-vs-nosql.md
│   ├── cap-and-pacelc.md
│   ├── acid-vs-base.md
│   ├── replication.md
│   ├── sharding-and-partitioning.md
│   └── indexing-basics.md
│
├── 📂 04-caching/                  (3 files)
│   ├── caching-basics.md
│   ├── cache-strategies.md
│   └── eviction-and-invalidation.md
│
├── 📂 05-communication/            (5 files)
│   ├── sync-vs-async.md
│   ├── rest-grpc-graphql.md
│   ├── websockets-and-realtime.md
│   ├── message-queues-and-streaming.md
│   └── event-driven-architecture.md
│
├── 📂 06-architecture-patterns/    (5 files)
│   ├── monolith-vs-microservices.md
│   ├── layered-and-hexagonal.md
│   ├── cqrs-and-event-sourcing.md
│   ├── saga-and-distributed-transactions.md
│   └── serverless.md
│
├── 📂 07-distributed-systems/      (5 files)
│   ├── consistency-models.md
│   ├── consensus-and-leader-election.md
│   ├── clocks-and-ordering.md
│   ├── fault-tolerance-and-redundancy.md
│   └── idempotency-and-retries.md
│
├── 📂 08-reliability-and-scale/    (4 files)
│   ├── availability-and-sla.md
│   ├── rate-limiting-and-throttling.md
│   ├── backpressure-and-circuit-breakers.md
│   └── observability.md
│
├── 📂 09-security/                 (3 files)
│   ├── auth-and-authorization.md
│   ├── encryption-and-tls.md
│   └── common-attacks-and-defenses.md
│
├── 📂 10-interview-guide/          (3 files)
│   ├── the-framework.md
│   ├── trade-off-cheat-sheet.md
│   └── common-mistakes.md
│
└── 📂 11-case-studies/             (12 files)
    ├── design-url-shortener.md
    ├── design-rate-limiter.md
    ├── design-chat-system.md
    ├── design-news-feed.md
    ├── design-video-streaming.md
    ├── design-file-storage.md
    ├── design-ride-sharing.md
    ├── design-payment-system.md
    ├── design-distributed-cache.md
    ├── design-search-autocomplete.md
    ├── design-notification-system.md
    └── design-web-crawler.md
```

## 📜 Section Summary

| Section | Files | Key Concepts |
|---------|-------|-------------|
| **01 Fundamentals** | 4 | What is system design, requirements, problem approach, estimation |
| **02 Building Blocks** | 5 | Client-server, DNS/CDN, load balancing, proxies, scaling |
| **03 Databases** | 7 | DB types, SQL vs NoSQL, CAP, ACID vs BASE, replication, sharding |
| **04 Caching** | 3 | Cache basics, strategies (CDN, write-through, write-behind), eviction |
| **05 Communication** | 5 | Sync vs async, REST/gRPC/GraphQL, WebSockets, message queues, event-driven |
| **06 Architecture Patterns** | 5 | Monolith vs microservices, layered, hexagonal, CQRS/event sourcing, Saga |
| **07 Distributed Systems** | 5 | Consistency, consensus/Raft, clocks, fault tolerance, idempotency |
| **08 Reliability & Scale** | 4 | Availability/SLA, rate limiting, circuit breakers, observability |
| **09 Security** | 3 | Auth/authz, encryption/TLS, common attacks |
| **10 Interview Guide** | 3 | Framework, trade-off cheat sheet, common mistakes |
| **11 Case Studies** | 12 | URL shortener, rate limiter, chat, news feed, video streaming, file storage, ride sharing, payment, cache, autocomplete, notifications, web crawler |

---

*File Count: 52+ files | Created: July 3, 2026*
