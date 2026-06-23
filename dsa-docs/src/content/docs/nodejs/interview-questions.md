---
title: "Node.js Interview Questions"
description: "Beginner, intermediate, and advanced Node.js interview questions with answers and code examples."
sidebar:
  order: 1
---

# Interview Questions

## Beginner Questions

### Q1: What is the difference between Node.js and browser JavaScript?

| Aspect | Node.js | Browser JS |
|--------|---------|------------|
| Global object | `global` | `window` |
| DOM | ❌ No | ✅ Yes |
| File system | ✅ Yes (`fs` module) | ❌ No |
| Modules | CommonJS / ES Modules | ES Modules |
| Server capabilities | ✅ Built-in | ❌ No |

### Q2: What is npm?

npm stands for **Node Package Manager**. It is the default package manager for Node.js, used to install, share, and manage dependencies (third-party libraries).

### Q3: What is the difference between `require` and `import`?

- `require`: CommonJS, synchronous, can be called anywhere, runtime loading
- `import`: ES Modules, asynchronous, static (must be at top), supports tree shaking

### Q4: What is callback hell and how do you avoid it?

Callback hell is deeply nested callbacks that make code hard to read. Avoid it by using Promises, Async/Await, or modularizing code.

### Q5: What is `package.json`?

A JSON file that contains metadata about the project — name, version, dependencies, scripts, etc.

---

## Intermediate Questions

### Q6: Explain the Event Loop in Node.js.

The Event Loop allows Node.js to perform non-blocking I/O operations by offloading operations to the OS kernel when possible. Phases: Timers → Pending I/O → Idle/Prepare → Poll → Check → Close Callbacks. Microtasks (process.nextTick, Promises) run between each phase.

### Q7: What is the difference between `process.nextTick()` and `setImmediate()`?

- `process.nextTick()`: Runs before the next Event Loop phase (highest priority)
- `setImmediate()`: Runs in the Check phase (after I/O callbacks)

### Q8: What are streams in Node.js?

Streams process data chunk-by-chunk instead of loading everything into memory. Types: Readable, Writable, Duplex, Transform.

### Q9: What is middleware in Express.js?

Middleware functions that have access to `req`, `res`, and `next`. They can execute code, modify request/response, end the request cycle, or call the next middleware.

### Q10: How does JWT authentication work?

1. User logs in with credentials
2. Server verifies and creates a JWT token (Header.Payload.Signature)
3. Client stores the token (localStorage or httpOnly cookie)
4. Client sends token in Authorization header for subsequent requests
5. Server verifies the token on protected routes

---

## Advanced Questions

### Q11: How do you handle CPU-intensive tasks in Node.js?

Use Worker Threads for CPU-bound operations within a single process, or use Clustering to distribute load across multiple processes/CPUs.

### Q12: What is clustering in Node.js?

Clustering forks multiple instances of Node.js (workers) that share the same server port, utilizing all available CPU cores for better performance.

### Q13: How do you prevent memory leaks in Node.js?

- Remove event listeners when done
- Avoid global variables accumulating data
- Use LRU caches with size limits
- Close database connections and file handles properly
- Use `heapdump` and Chrome DevTools for profiling

### Q14: Explain the difference between horizontal and vertical scaling.

- **Vertical scaling**: Add more power (CPU/RAM) to a single machine
- **Horizontal scaling**: Add more machines behind a load balancer (Node.js excels here)

### Q15: How do you handle errors in async code?

Use try/catch blocks with async/await, global error middleware in Express, and process-level handlers (`process.on('uncaughtException')`, `process.on('unhandledRejection')`).

---

## Scenario-Based Questions

### Q16: Implement a custom rate limiter

```javascript
const rateLimit = new Map();

function rateLimiter(maxRequests, windowMs) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, []);
    }
    
    const timestamps = rateLimit.get(ip).filter(t => now - t < windowMs);
    
    if (timestamps.length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    timestamps.push(now);
    rateLimit.set(ip, timestamps);
    next();
  };
}
```

### Q17: Implement graceful shutdown

```javascript
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(async () => {
    await mongoose.disconnect();
    await redisClient.quit();
    console.log('Server shut down');
    process.exit(0);
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('Forced shutdown');
    process.exit(1);
  }, 30000);
});
```

---

## Quick Reference: Common npm Packages

| Category | Package |
|----------|---------|
| Framework | express, fastify, koa |
| Auth | jsonwebtoken, bcrypt, passport |
| Database | mongoose, pg, sequelize, prisma |
| Validation | joi, zod, express-validator |
| Testing | jest, mocha, supertest |
| Logging | winston, pino, morgan |
| Cache | redis, node-cache, lru-cache |
| Security | helmet, cors, express-rate-limit |
| Real-time | socket.io, ws |
| Queue | bull, bullmq, kafkajs |
| HTTP Client | axios, node-fetch, got |
| Environment | dotenv, cross-env |
| Process | pm2, nodemon, forever |
