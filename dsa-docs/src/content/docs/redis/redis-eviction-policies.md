---
title: "Redis Eviction Policies"
description: "When Redis runs out of memory, eviction policies decide which keys to remove. LRU, LFU, TTL, and the other maxmemory policies explained."
---

## 16. Redis Eviction Policies

### What is Eviction?

When Redis reaches its configured memory limit (`maxmemory`), it must **evict** (delete) some keys to make room for new writes. The **eviction policy** decides which keys to remove.

> **Analogy:** Eviction is like your refrigerator being full — when you need to add something new, you must throw away old items. The policy decides whether to throw away the oldest, the least used, or whatever is expiring soon.

### Eviction Decision Flow

```mermaid
flowchart TB
    App[App writes new data<br/>SET / LPUSH / SADD etc.] --> Check{Is Redis<br/>over maxmemory?}
    Check -->|No ✅| Accept[Store the data normally]
    Check -->|Yes ❌| Policy{Which eviction<br/>policy is set?}
    
    Policy -->|noeviction| Reject[Return error<br/>Writes rejected]
    
    subgraph Lru[LRU — Least Recently Used]
        LRU1[Remove keys that<br/>haven't been accessed<br/>the longest]
    end
    Policy -->|allkeys-lru| Lru
    
    subgraph Lfu[LFU — Least Frequently Used]
        LFU1[Remove keys that<br/>are accessed the<br/>least often]
    end
    Policy -->|allkeys-lfu| Lfu
    
    subgraph Ttl[TTL — Expiring Soonest]
        TTL1[Remove keys with<br/>the shortest TTL /<br/>nearest expiration]
    end
    Policy -->|volatile-ttl| Ttl
    
    subgraph Random[Random]
        RAND1[Remove a<br/>random key]
    end
    Policy -->|allkeys-random| Random
    
    Lru --> Evict[Evict selected key(s)]
    Lfu --> Evict
    Ttl --> Evict
    RAND1 --> Evict
    
    Evict --> Check
    
    style App fill:#3b82f6,color:#fff
    style Check fill:#f59e0b,color:#fff
    style Accept fill:#059669,color:#fff
    style Reject fill:#ef4444,color:#fff
    style Policy fill:#7c3aed,color:#fff
    style Lru fill:#7c3aed,color:#fff
    style Lfu fill:#3b82f6,color:#fff
    style Ttl fill:#f59e0b,color:#fff
    style Evict fill:#ec4899,color:#fff
```

---

### All Eviction Policies

| Policy | Description | Best For |
|--------|-------------|----------|
| `noeviction` | Return error on writes when full (default) | When every key matters |
| `allkeys-lru` | Evict least recently used keys from **all** keys | General-purpose caching ✅ |
| `allkeys-lfu` | Evict least frequently used keys from all keys | When access frequency matters |
| `allkeys-random` | Evict a random key | Simple, predictable eviction |
| `volatile-lru` | Evict LRU from keys **with TTL** set only | Mixed caching + persistent data |
| `volatile-lfu` | Evict LFU from keys with TTL only | When TTL keys have varying frequency |
| `volatile-ttl` | Evict keys with the shortest remaining TTL | When expiry is the priority |
| `volatile-random` | Evict random key from TTL keys only | Simple eviction for TTL keys |

---

### Configure in redis.conf

```bash
# Set maximum memory (e.g., 256 MB)
maxmemory 256mb

# Set eviction policy
maxmemory-policy allkeys-lru

# For LRU/LFU: sample size for approximation (default 5)
maxmemory-samples 10  # Higher = more accurate, slower
```

---

### LRU vs LFU vs TTL

```bash
# allkeys-lru — removes keys you haven't touched recently
# Good for: Most caching use cases
# Example: User session data — old sessions get evicted first

# allkeys-lfu — removes keys you rarely access
# Good for: Content caching where some items are "evergreen"
# Example: Product catalog — popular products stay cached

# volatile-ttl — removes keys about to expire
# Good for: When you only want to evict TTL keys
# Example: OTP codes — ones about to expire are removed first
```

---

### Real-World Examples

**Example 1: General Cache (Recommended)**
```bash
maxmemory 512mb
maxmemory-policy allkeys-lru
```

**Example 2: Session Store Only**
```bash
maxmemory 1gb
maxmemory-policy volatile-ttl
# Only keys with TTL get evicted — persistent keys stay safe
```

**Example 3: Mixed Data (Cache + Persistent)**
```bash
maxmemory 2gb
maxmemory-policy volatile-lru
# Cached data (with TTL) gets evicted before persistent data
```

---

### Common Mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| No `maxmemory` set | Redis uses all available RAM | Always set `maxmemory` |
| Using `noeviction` for caching | Writes fail when full | Use `allkeys-lru` instead |
| Setting `maxmemory-policy` without `maxmemory` | Policy has no effect without a limit | Always set both |

---

### In Simple Words

- **Eviction** is Redis's way of freeing memory when it's full
- **`allkeys-lru`** is the best default for most caching use cases
- **`noeviction`** (default) just returns errors — only use if data loss is unacceptable
- **LFU** tracks access frequency; **LRU** tracks access recency
- Always set `maxmemory` and `maxmemory-policy` together in production
