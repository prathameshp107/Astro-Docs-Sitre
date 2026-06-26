---
title: "Design a URL Shortener"
description: "Full case study: shortening URLs like TinyURL — requirements, estimation, design, and trade-offs."
sidebar:
  order: 1
---

# Case Study: Design a URL Shortener

> A URL shortener like TinyURL turns long URLs into short, shareable links.

---

## Requirements

**Functional:**
- Shorten a long URL into a short code
- Redirect to the original URL when accessing the short code
- (Optional) Track click counts, custom aliases

**Non-functional:**
- High availability (redirects must always work)
- Low latency (redirects in <100ms)
- 100M new URLs/month growing

---

## Estimation

| Metric | Calculation |
|--------|-------------|
| New URLs/month | 100M |
| New URLs/second | 100M / (30 × 86,400) ≈ **40 QPS** |
| Read (redirect) QPS | 100× writes = **4,000 QPS** |
| Storage (5 years) | 100M × 500 bytes × 60 = **3 TB** |
| Bandwidth (redirects) | 4,000 × 500 bytes = **2 MB/s** |

---

## API Design

```json
POST /shorten
{ "url": "https://example.com/very/long/url" }
→ { "short_url": "https://short.ly/abc123", "expires_in_days": 365 }

GET /{short_code}
→ 301 Redirect to original URL
```

---

## Data Model

```sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  click_count BIGINT DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
```

**Storage:** PostgreSQL for ACID (idempotent inserts). Redis cache for redirects.

---

## High-Level Design

```mermaid
flowchart LR
    Client["📱 Client"] --> LB["Load Balancer"]
    LB --> App["Web Servers"]
    App --> Cache[("Redis Cache<br/>short_code → URL")]
    App --> DB[("PostgreSQL")]
    App --> Seq["ID Generator<br/>(Snowflake)"]

    style Client fill:#7c3aed,color:#fff
    style LB fill:#4f46e5,color:#fff
    style App fill:#6366f1,color:#fff
    style Cache fill:#8b5cf6,color:#fff
    style DB fill:#059669,color:#fff
```

---

## Deep Dive: Short Code Generation

**Approach 1: Base62 Encoding**
- Generate a unique numeric ID (Snowflake or DB sequence)
- Convert to base62 (0-9, a-z, A-Z) → 6 characters = 62⁶ ≈ 57 billion combinations
- `12345 → base62(12345) = "dnh"`

**Approach 2: Pre-generated Keys (KGS)**
- Pre-generate a pool of short codes in a separate table
- Assign a code atomically when a shorten request comes in
- No encoding logic, very fast allocation

**Our choice:** Base62 encoding with a sequence ID. Simpler, no separate key management.

---

## Deep Dive: Redirect Flow (Cache-Aside)

1. User visits `https://short.ly/abc123`
2. App checks Redis: `GET abc123`
3. **Cache hit** → return original URL, redirect
4. **Cache miss** → query PostgreSQL by `short_code`
5. Populate cache: `SET abc123 = original_url, TTL = 3600`
6. Return redirect

**P99 latency target:** < 50ms with cache hit, < 200ms on cache miss.

---

## Bottlenecks & Trade-offs

| Bottleneck | Solution |
|-----------|----------|
| **DB write load** | Batch analytics writes, use a separate analytics DB |
| **Cache miss storm** | Gradual cache warmup, preload popular URLs |
| **ID generation** | Use Snowflake or pre-allocated ID ranges per server |
| **Malicious URLs** | Add URL validation + blocklist before shortening |

---

## In Simple Words

- URL shortener = simple write (shorten) + very frequent read (redirect).
- Cache is critical — redirects should almost never hit the database.
- Base62 encoding gives short, user-friendly codes from numeric IDs.
