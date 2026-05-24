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

![Cache Patterns Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-caching-patterns-cache-patterns-diagram.svg)

---
