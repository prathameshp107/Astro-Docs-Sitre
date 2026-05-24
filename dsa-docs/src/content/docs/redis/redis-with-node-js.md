---
title: "Redis with Node.js"
description: "const redis = new Redis({ host: '127.0.0.1', port: 6379, // password: 'yourpassword', // if auth is enabled // db: 0, // database index (0-15) });"
---

## 16. Redis with Node.js

### Installation

```bash
# Initialize a new Node.js project
mkdir redis-demo && cd redis-demo
npm init -y

# Install Redis client (ioredis — most popular)
npm install ioredis

# Install Express for API examples
npm install express
```

---

### Connecting to Redis

```javascript
// redis.js
const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  // password: 'your_password',  // if auth is enabled
  // db: 0,                      // database index (0-15)
});

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err));

module.exports = redis;
```

---

### Basic CRUD Operations

```javascript
const redis = require('./redis');

async function examples() {
  // SET
  await redis.set('username', 'prathamesh');
  
  // SET with TTL (seconds)
  await redis.setex('session:xyz', 3600, 'user:42');
  
  // GET
  const name = await redis.get('username');
  console.log(name); // "prathamesh"
  
  // DELETE
  await redis.del('username');
  
  // INCR
  await redis.set('visits', 0);
  await redis.incr('visits');
  
  // Hash operations
  await redis.hset('user:42', 'name', 'Prathamesh', 'city', 'Pune');
  const user = await redis.hgetall('user:42');
  console.log(user); // { name: 'Prathamesh', city: 'Pune' }
  
  // List operations
  await redis.rpush('tasks', 'task1', 'task2', 'task3');
  const task = await redis.lpop('tasks');
  console.log(task); // "task1"
  
  // Check TTL
  const ttl = await redis.ttl('session:xyz');
  console.log(ttl); // remaining seconds
}

examples();
```

---

### Caching API Responses with Express

```javascript
// server.js
const express = require('express');
const redis = require('./redis');
const axios = require('axios');

const app = express();
const CACHE_TTL = 300; // 5 minutes

// Middleware: Check cache before hitting the API
async function cacheMiddleware(req, res, next) {
  const cacheKey = `cache:${req.originalUrl}`;
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return res.json({
        source: 'cache',
        data: JSON.parse(cached)
      });
    }
    
    // Store cache key on request for use in route
    req.cacheKey = cacheKey;
    next();
  } catch (err) {
    // If Redis fails, don't break the app — proceed to route
    console.error('Redis error, skipping cache:', err.message);
    next();
  }
}

// Route: Fetch products with caching
app.get('/api/products', cacheMiddleware, async (req, res) => {
  try {
    // Simulate a slow database call
    const products = await fetchProductsFromDB();
    
    // Store in Redis cache
    if (req.cacheKey) {
      await redis.setex(req.cacheKey, CACHE_TTL, JSON.stringify(products));
      console.log(`📦 Cache SET: ${req.cacheKey}`);
    }
    
    res.json({ source: 'database', data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Get user profile with Hash
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;
  
  // Try Redis first
  const cached = await redis.hgetall(cacheKey);
  if (cached && Object.keys(cached).length > 0) {
    return res.json({ source: 'cache', user: cached });
  }
  
  // Fallback to DB
  const user = await fetchUserFromDB(userId);
  await redis.hset(cacheKey, user);
  await redis.expire(cacheKey, 600);
  
  res.json({ source: 'database', user });
});

// Route: Rate limiting
app.get('/api/limited', async (req, res) => {
  const ip = req.ip;
  const key = `ratelimit:${ip}`;
  
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, 60); // Reset every minute
  }
  
  if (current > 10) {
    return res.status(429).json({ error: 'Too many requests. Try again in a minute.' });
  }
  
  res.json({ message: 'Request successful', count: current });
});

async function fetchProductsFromDB() {
  // Simulate DB delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Mouse' }];
}

async function fetchUserFromDB(id) {
  return { id, name: 'Prathamesh', city: 'Pune', role: 'engineer' };
}

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
```

---

### Session Management with Express

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('./redis');

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,    // true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24  // 24 hours
  }
}));

app.post('/login', (req, res) => {
  req.session.userId = 42;
  req.session.role = 'admin';
  res.json({ message: 'Logged in' });
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ userId: req.session.userId });
});
```

---
