---
title: "Trade-Off Cheat Sheet"
description: "Quick reference for common system design trade-offs — use this to compare options during interviews."
sidebar:
  order: 3
---

# Trade-Off Cheat Sheet

> Use this as a quick reference during interview prep. Each trade-off is a common discussion point.

---

## Database

| Trade-off | Option A | Option B | When to Choose |
|-----------|----------|----------|----------------|
| **SQL vs NoSQL** | Strong consistency, joins | High throughput, flexible schema | A: finances, reporting. B: user profiles, logging |
| **Replication: sync vs async** | No data loss, higher latency | Faster writes, possible data loss | A: banking. B: social media |
| **Normalized vs denormalized** | Less storage, complex queries | Faster reads, more storage | A: normalized for writes. B: denormalized for reads |
| **Single leader vs multi-leader** | Simple consistency | Higher availability, conflict resolution | A: traditional. B: multi-region |

---

## Caching

| Trade-off | Option A | Option B | When to Choose |
|-----------|----------|----------|----------------|
| **Cache-aside vs Write-through** | Simple, cache only hot data | Always consistent, slower writes | A: general purpose. B: critical reads |
| **LRU vs TTL** | Optimizes for access patterns | Predictable expiration | A: unpredictable access. B: time-sensitive data |
| **Local vs Distributed cache** | Faster (no network), uses RAM | Larger capacity, shared across servers | A: single server. B: multi-server |

---

## APIs & Communication

| Trade-off | Option A | Option B | When to Choose |
|-----------|----------|----------|----------------|
| **REST vs gRPC** | Human-readable, universal, cached | Fast, typed, streaming | A: public APIs. B: internal services |
| **Sync vs Async** | Simple, immediate response | Decoupled, handles spikes | A: CRUD. B: background processing |
| **Polling vs WebSocket** | Simple, stateless | Real-time, persistent connection | A: low-frequency updates. B: real-time |

---

## Architecture

| Trade-off | Option A | Option B | When to Choose |
|-----------|----------|----------|----------------|
| **Monolith vs Microservices** | Simple to build, hard to scale | Complex, scales independently | A: small team. B: large team, high scale |
| **Stateful vs Stateless** | Server remembers context | Scales horizontally | A: simple apps. B: large-scale systems |
| **Event-driven vs Request-driven** | Loose coupling, eventual consistency | Simple, strong consistency | A: many services react. B: simple CRUD |
| **Server vs Serverless** | Predictable cost, no cold starts | Pay per use, auto-scaling | A: steady traffic. B: spiky traffic |

---

## Distributed Systems

| Trade-off | Option A | Option B | When to Choose |
|-----------|----------|----------|----------------|
| **Strong vs Eventual consistency** | Correct, slower, lower availability | Fast, available, stale reads possible | A: banking. B: social feeds |
| **CP vs AP** (under partition) | Stop writes to stay consistent | Keep accepting writes | A: financial. B: content delivery |
| **Active-Passive vs Active-Active** | Simpler failover, standby cost | No downtime, N× servers | A: cost-sensitive. B: uptime-critical |

---

## Quick Reference by Scenario

| Scenario | Recommended Choice |
|----------|-------------------|
| You need ACID transactions | PostgreSQL |
| You need high write throughput | Cassandra, Kafka |
| You need flexible schemas | MongoDB |
| You need real-time updates | WebSocket |
| You need to handle traffic spikes | Auto-scaling + queue |
| You need to protect from DDoS | CDN + rate limiting |
| You need to survive a zone failure | Multi-AZ deployment |
| You need to debug a microservice issue | Distributed tracing (Jaeger) |

---

## In Simple Words

- Every choice in system design is a trade-off. Know the two options and when to pick each.
- The cheat sheet helps you quickly compare alternatives during interviews.
- Always explain **why** you chose one option over the other.
