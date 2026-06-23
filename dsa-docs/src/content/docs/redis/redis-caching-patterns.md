---
title: "Redis Caching Patterns"
description: "There are several strategies for keeping the cache and database in sync. Choosing the right one depends on your read/write ratio and consistency requiremen"
---

## 15. Redis Caching Patterns

### Why Caching Patterns Matter

There are several strategies for keeping the cache and database in sync. Choosing the right one depends on your read/write ratio and consistency requirements.

---

### Pattern 1: Cache-Aside (Lazy Loading)

The most common pattern. The application controls when to load data into cache.

**Flow:**
1. Application checks Redis for the data
2. **Cache HIT** → return data from Redis
3. **Cache MISS** → query database, store result in Redis, return result

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`;
  
  // Step 1: Check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);  // Cache HIT
  
  // Step 2: Cache MISS — query database
  const product = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
  
  // Step 3: Store in cache for 10 minutes
  await redis.setex(cacheKey, 600, JSON.stringify(product));
  
  return product;
}
```

**Pros:** Only caches data that is actually requested. Cache stays lean.  
**Cons:** First request is always slow (cache miss).

---

### Pattern 2: Write-Through Cache

Every database write also writes to Redis. Cache is always up to date.

```javascript
async function updateProduct(productId, data) {
  // Step 1: Write to database
  await db.query('UPDATE products SET ... WHERE id = ?', [productId]);
  
  // Step 2: Update Redis immediately
  await redis.setex(`product:${productId}`, 600, JSON.stringify(data));
}
```

**Pros:** Cache is always fresh. No stale data.  
**Cons:** Every write is slower (two writes). Cache may hold data that is never read.

---

### Pattern 3: Write-Back (Write-Behind) Cache

Write to Redis first, then asynchronously write to the database later.

```javascript
// Write only to Redis
await redis.set(`product:${productId}`, JSON.stringify(data));

// Background worker periodically flushes Redis → Database
setInterval(async () => {
  const dirtyKeys = await redis.smembers('dirty:products');
  for (const key of dirtyKeys) {
    const data = await redis.get(key);
    await db.query('UPDATE products SET ...');
    await redis.srem('dirty:products', key);
  }
}, 5000);
```

**Pros:** Extremely fast writes.  
**Cons:** Risk of data loss if Redis crashes before flush. Complex to implement.

---

### Cache Patterns Diagram

```mermaid
flowchart TB
    subgraph CacheAside[Cache-Aside — Most Common]
        CA1[App requests data] --> CA2{Check Redis}
        CA2 -->|HIT ✅| CA3[Return cached data<br/>< 1ms]
        CA2 -->|MISS ❌| CA4[Query database<br/>~5-50ms]
        CA4 --> CA5[Store result in Redis<br/>SETEX with TTL]
        CA5 --> CA6[Return fresh data to client]
    end
    
    subgraph WriteThrough[Write-Through]
        WT1[App writes data] --> WT2[Write to database]
        WT2 --> WT3[Write to Redis immediately]
        WT3 --> WT4[Cache always fresh ✅]<br/>Slower writes ❌
    end
    
    subgraph WriteBack[Write-Behind]
        WB1[App writes data] --> WB2[Write to Redis only
⚡ Ultra-fast write]
        WB2 --> WB3[Background worker<br/>syncs Redis → DB<br/>every 5 seconds]
        WB3 --> WB4[Fast writes ✅<br/>Risk of data loss if<br/>Redis crashes ❌]
    end
    
    style CacheAside fill:#7c3aed,color:#fff
    style CA2 fill:#f59e0b,color:#fff
    style CA3 fill:#059669,color:#fff
    style WriteThrough fill:#3b82f6,color:#fff
    style WriteBack fill:#ec4899,color:#fff
```

> **Recommendation:** Start with **Cache-Aside** — it's the simplest and most predictable. Add Write-Through for data that must always be fresh. Use Write-Behind only when you fully understand the data loss risks.

---
