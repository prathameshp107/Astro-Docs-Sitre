---
title: "Eviction & Invalidation"
description: "When the cache is full, which data gets removed? And how do you keep cached data fresh?"
sidebar:
  order: 3
---

# Eviction & Invalidation

> **Eviction** decides what to remove when the cache is full. **Invalidation** marks cached data as stale when the source data changes.

---

## Eviction Policies

| Policy | How It Works | Good For |
|--------|-------------|----------|
| **LRU** (Least Recently Used) | Remove the item not used for the longest time | Most workloads — popularity decays |
| **LFU** (Least Frequently Used) | Remove the item used the fewest times | Consistent popular items |
| **FIFO** (First In, First Out) | Remove the oldest item | Simple, predictable |
| **TTL** (Time To Live) | Remove after a fixed time | Data that becomes stale naturally |
| **Random** | Evict a random item | Simple, surprisingly effective |

> **Most caches use LRU + TTL** together. LRU for space, TTL for freshness.

---

## TTL (Time To Live)

Every cached item should have a TTL:

```json
{
  "key": "user:profile:123",
  "value": { "name": "Alice", "avatar": "..." },
  "ttl": 3600  // expires in 1 hour
}
```

**Suggested TTLs by data type:**

| Data | TTL | Why |
|------|:---:|-----|
| User session | 24 hours | Logged in session |
| News feed posts | 5 minutes | Fresh enough for most users |
| Weather data | 30 minutes | Forecast changes slowly |
| Stock prices | Seconds | Changes fast |
| Static image | 1 year + versioned URL | Never changes |

---

## Invalidation Strategies

### Passive (TTL-based)
Data expires automatically after TTL. Next read sees a miss and refetches.

**Pros:** Simple. **Cons:** Might serve stale data before TTL expires.

### Active (Write-through or explicit)
When data changes, explicitly delete or update the cache.

**Pros:** Always fresh. **Cons:** Need to know all cache keys for that data.

### Version-Based
Include a version number in the cache key: `user:profile:123:v2`. Increment version on update.

**Pros:** No invalidation needed. **Cons:** Old versions waste space.

---

## The Cache Invalidation Problem

> "There are only two hard things in computer science: cache invalidation and naming things." — Phil Karlton

**Why it's hard:**
- The same data can be cached in multiple places (CDN, browser, Redis, local)
- Finding all cached copies of a piece of data is difficult
- Simultaneous updates can race with cache clears

---

## Trade-offs

- Shorter TTL = fresher data but more cache misses (higher DB load).
- Longer TTL = better cache hit rate but stale data.
- Active invalidation is ideal but complex — start with TTLs.
- For critical data, use write-through (always consistent, slightly slower writes).

---

## In Simple Words

- Eviction = making room in the cache. LRU (remove what's least recently used) is the default.
- TTL = automatic expiration. Every cached item should have one.
- Cache invalidation is hard because data can be cached in many places.
