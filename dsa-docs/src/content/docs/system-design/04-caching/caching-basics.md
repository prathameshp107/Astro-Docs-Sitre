---
title: "Caching Basics"
description: "Why cache, where to cache (client, CDN, server, database), and how caching improves latency."
sidebar:
  order: 1
---

# Caching Basics

> **Caching** stores a copy of frequently accessed data in a fast storage layer. When data is requested again, the cache serves it instead of recomputing or fetching from the slow database.

**Analogy — Coffee shop:**
- Without cache: every latte requires roasting beans, grinding, and brewing (slow).
- With cache: the barista pre-makes popular drinks and serves them instantly.

---

## Where to Cache

```mermaid
flowchart LR
    Client["📱 Client Browser"] -->|"1. Browser Cache"| CDN["🌐 CDN Edge"]
    CDN -->|"2. CDN Cache"| Reverse["Reverse Proxy / LB"]
    Reverse -->|"3. Server Cache<br/>(Redis, Memcached)"| App["App Server"]
    App -->|"4. Database Cache<br/>(Buffer Pool)"| DB[("Database")]

    style Client fill:#7c3aed,color:#fff
    style CDN fill:#4f46e5,color:#fff
    style Reverse fill:#6366f1,color:#fff
    style App fill:#8b5cf6,color:#fff
    style DB fill:#dc2626,color:#fff
```

| Cache Layer | Latency | Capacity | Example |
|:-----------:|:-------:|:--------:|---------|
| **Browser** | ~1 ms | Small | LocalStorage, HTTP cache headers |
| **CDN** | ~10-50 ms | Medium | CloudFlare, Fastly, CloudFront |
| **Server Cache** | ~1-5 ms | Medium | Redis, Memcached |
| **Database Cache** | ~0.1 ms | Large | InnoDB buffer pool |

---

## What to Cache

| Data Type | Cache? | Why |
|-----------|:------:|-----|
| Static assets (images, CSS, JS) | ✅ Yes | Never changes, serve from CDN |
| User session data | ✅ Yes | Read on every request, fast access |
| Database query results | ✅ Yes | Expensive queries, slow to recompute |
| User feed (personalized) | ✅ Maybe | Cache for a few seconds, then refresh |
| Real-time stock prices | ❌ No | Changes too fast, stale data is bad |
| Passwords / sensitive data | ❌ No | Security risk |

---

## Cache Performance Impact

| Scenario | Latency |
|----------|:-------:|
| Cache hit (Redis, in-memory) | ~1-5 ms |
| Cache miss (query database) | ~10-100 ms |
| Cache hit (CDN, edge) | ~10-50 ms |
| No cache (full origin) | ~100-500 ms |

**A cache hit is 10-100× faster than a database query.**

---

## Trade-offs

- Cache adds complexity (another system to manage).
- Stale data: cache might serve outdated content.
- Cache breakdown: if the cache goes down and all requests hit the database at once (thundering herd), the database can crash.

---

## In Simple Words

- Cache = storing copies of slow-to-get data in a fast place (memory).
- Cache data that's read often and changes rarely.
- A cache hit takes milliseconds. A cache miss costs a database query (tens of milliseconds).
