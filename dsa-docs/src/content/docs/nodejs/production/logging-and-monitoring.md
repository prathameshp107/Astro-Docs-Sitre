---
title: "Logging & Monitoring"
description: "console vs structured logging (winston/pino), morgan for HTTP logging, health checks, and basic metrics."
sidebar:
  order: 2
---

## Logging & Monitoring

Logging and monitoring are essential for understanding what your application is doing in production. Structured logging makes logs searchable and analyzable.

### `console.log` Isn't Enough

```javascript
// ❌ console.log — no structure, no levels, no searchability
console.log('User logged in:', userId);
console.log('Error:', err);

// These are fine for quick debugging during development
// But in production, you need structure
```

### Structured Logging with Pino

Pino is the fastest Node.js logger — **5x faster** than Winston.

```javascript
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined, // JSON in production (for log aggregators)
});

logger.info('Server started');
logger.warn({ user: 'alice' }, 'Login attempt from unknown IP');
logger.error({ err }, 'Database connection failed');

// Log levels: trace, debug, info, warn, error, fatal

// Add context to all log entries
const childLogger = logger.child({ service: 'auth', requestId: req.id });
childLogger.info('User authenticated'); // Includes { service: 'auth' }
```

### Logging with Winston

Winston is the most popular Node.js logger — flexible with multiple transports.

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'my-api' },
  transports: [
    // Write to console
    new winston.transports.Console({
      format: process.env.NODE_ENV !== 'production'
        ? winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        : winston.format.json(),
    }),
    // Write errors to file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs to file
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Usage
logger.info('Server started', { port: 3000 });
logger.warn('High memory usage', { memory: process.memoryUsage() });
logger.error('Database connection failed', { error: err.message });
```

### HTTP Request Logging with Morgan

Morgan logs HTTP requests in the standard Apache/Nginx format.

```javascript
const morgan = require('morgan');
const express = require('express');

const app = express();

// Dev format — colored, human-readable
app.use(morgan('dev'));
// Output: POST /users 201 45.123 ms - 124

// Combined format — Apache standard (for production log aggregators)
app.use(morgan('combined'));
// Output: ::1 - - [22/Jun/2026:14:30:00 +0000] "POST /users HTTP/1.1" 201 124 "-" "curl/7.68.0"

// Custom format with Pino
const morganStream = {
  write: (message) => logger.info(message.trim()),
};

app.use(morgan('combined', { stream: morganStream }));
```

### Health Checks

```javascript
const os = require('os');

// Simple health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now(),
    memory: process.memoryUsage(),
    cpu: os.loadavg(),
  };
  
  res.json(health);
});

// Detailed health check (check dependencies)
app.get('/health/detailed', async (req, res) => {
  const checks = {
    server: { status: 'ok' },
    database: { status: 'unknown' },
    redis: { status: 'unknown' },
  };
  
  // Check database
  try {
    await mongoose.connection.db.admin().ping();
    checks.database = { status: 'ok' };
  } catch (err) {
    checks.database = { status: 'error', message: err.message };
  }
  
  // Check Redis
  try {
    await redis.ping();
    checks.redis = { status: 'ok' };
  } catch (err) {
    checks.redis = { status: 'error', message: err.message };
  }
  
  const allHealthy = Object.values(checks).every(c => c.status === 'ok');
  const statusCode = allHealthy ? 200 : 503;
  
  res.status(statusCode).json({
    status: allHealthy ? 'healthy' : 'degraded',
    checks,
  });
});
```

### Basic Metrics (Prometheus)

```javascript
const promClient = require('prom-client');

// Collect default metrics (CPU, memory, event loop, etc.)
promClient.collectDefaultMetrics();

// Custom metrics
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'path'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});

// Middleware to record metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestCounter.inc({
      method: req.method,
      path: req.route?.path || req.path,
      status: res.statusCode,
    });
    
    httpRequestDuration.observe(
      { method: req.method, path: req.route?.path || req.path },
      duration
    );
  });
  
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

### Logging in Practice

```javascript
// logger.js
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: { // Never log sensitive fields
    paths: ['password', 'token', 'secret', 'authorization'],
    censor: '[REDACTED]',
  },
});

module.exports = logger;

// app.js
const logger = require('./utils/logger');
const morgan = require('morgan');

// Morgan -> Pino pipe
const morganStream = { write: (msg) => logger.info(msg.trim()) };
app.use(morgan('combined', { stream: morganStream }));

// Request context middleware
app.use((req, res, next) => {
  req.log = logger.child({ requestId: req.id, method: req.method, url: req.url });
  next();
});

// Usage in routes
app.get('/users', async (req, res) => {
  req.log.info('Fetching users');
  try {
    const users = await User.find({});
    req.log.info({ count: users.length }, 'Users fetched successfully');
    res.json({ data: users });
  } catch (err) {
    req.log.error({ err }, 'Failed to fetch users');
    res.status(500).json({ error: 'Internal error' });
  }
});
```

### 🚨 Common Gotchas

```javascript
// ❌ Logging sensitive information
logger.info('User login', { password: req.body.password });
// ✅ Redact sensitive fields
logger.info('User login', { userId: req.body.userId });

// ❌ Logging too much — creating noise
app.use((req, res, next) => {
  logger.debug('Request received'); // Every single request!
  next();
});
// ✅ Log at appropriate levels — debug for dev, info for prod

// ❌ Not rotating log files
// Log files grow unboundedly and fill the disk!
// ✅ Use winston File transport with maxsize/maxFiles or external log rotation
```

### Key Takeaways

- Use **structured logging** (Pino or Winston) instead of `console.log` in production
- **Pino** is the fastest logger; **Winston** has the richest ecosystem
- Use **Morgan** for HTTP request logging — it integrates with your logger
- Implement **health check** endpoints for load balancers and monitoring
- Track **metrics** (request count, duration, error rate) with Prometheus
- **Never log sensitive data** — use redaction
- Use **log levels** appropriately — debug in dev, info/warn/error in prod
- **Rotate log files** to prevent disk full issues
