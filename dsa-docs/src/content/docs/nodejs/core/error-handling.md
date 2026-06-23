---
title: "Error Handling"
description: "Operational vs programmer errors, try/catch in async code, uncaughtException, unhandledRejection, and central error middleware."
sidebar:
  order: 4
---

## Error Handling

Error handling in Node.js requires understanding the **types of errors** and using the right strategy for each. A well-handled error doesn't crash your server — it logs, reports, and recovers gracefully.

### Operational vs Programmer Errors

| Type | Description | Examples |
|---|---|---|
| **Operational** | Expected runtime errors | Invalid input, DB connection failure, file not found, rate limit exceeded |
| **Programmer** | Bugs in the code | `TypeError: Cannot read property of undefined`, referencing undeclared variables |

```javascript
// Operational error — should be caught and handled
try {
  await db.connect();
} catch (err) {
  logger.error('Database connection failed, retrying in 5s...');
  setTimeout(() => db.connect(), 5000);
}

// Programmer error — should crash/fail fast
const user = null;
user.name; // TypeError! This is a bug — fix the code
```

### Express Error Middleware

The standard pattern for Express apps — a central error handler catches all errors.

```javascript
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Async wrapper — catches errors from async route handlers
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Route handler
app.get('/users/:id', catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json({ data: user });
}));

// Central error handler (must have 4 parameters!)
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
```

### `uncaughtException` and `unhandledRejection`

These are **process-level** error handlers — your last line of defense.

```javascript
// Catch unhandled promise rejections (modern Node.js)
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(reason);
  
  // Give the server time to finish ongoing requests, then exit
  server.close(() => {
    process.exit(1);
  });
  
  // Force exit after 30s if server.close hangs
  setTimeout(() => process.exit(1), 30000);
});

// Catch uncaught exceptions (synchronous errors)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err);
  
  // uncaughtException means the app is in an inconsistent state
  // Must restart the process
  process.exit(1);
});

// Warning: Don't use these as substitutes for proper error handling!
// They're safety nets, not regular error handlers.
```

### Async/Await Error Handling

```javascript
// ✅ Pattern 1: try/catch (recommended)
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new AppError(`HTTP ${response.status}`, response.status);
    }
    return response.json();
  } catch (err) {
    logger.error(`Failed to fetch user ${id}:`, err);
    throw err; // Re-throw for the caller
  }
}

// ✅ Pattern 2: Central wrapper (for Express routes)
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get('/users/:id', catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ data: user });
}));

// ✅ Pattern 3: Result wrapper (returns [error, data])
async function safeAsync(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

const [err, user] = await safeAsync(User.findById(id));
if (err) return res.status(500).json({ error: err.message });
```

### Error Handling in Streams

```javascript
const fs = require('fs');

const stream = fs.createReadStream('data.txt');

// Always handle error events on streams!
stream.on('error', (err) => {
  console.error('Stream error:', err.message);
  // Clean up, close handles, etc.
});

stream.pipe(res).on('error', (err) => {
  console.error('Pipe error:', err.message);
  if (!res.headersSent) {
    res.status(500).end('Internal error');
  }
});
```

### Graceful Shutdown

```javascript
async function gracefulShutdown(signal) {
  console.log(`${signal} received. Starting graceful shutdown...`);

  // 1. Stop accepting new requests
  server.close(() => {
    console.log('HTTP server closed.');
  });

  // 2. Close database connections
  await mongoose.disconnect();
  await redisClient.quit();

  // 3. Wait for ongoing requests to finish (server.close handles this)

  // 4. Exit
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Force shutdown after 30 seconds
const forceExit = setTimeout(() => {
  console.error('Forced shutdown after timeout');
  process.exit(1);
}, 30000).unref();
```

### 🚨 Common Gotchas

```javascript
// ❌ Swallowing errors silently
try {
  await riskyOperation();
} catch (err) {
  // Nothing! Error is swallowed — impossible to debug
}

// ✅ Always log or re-throw
try {
  await riskyOperation();
} catch (err) {
  logger.error(err);
  throw err; // or handle appropriately
}

// ❌ Missing catch on promises
async function load() {
  await fetchData(); // If this rejects, it's an unhandled rejection
}
load(); // No .catch()!

// ✅ Always handle promise rejections
load().catch((err) => console.error(err));

// ❌ Using process.on('uncaughtException') to keep the app running
process.on('uncaughtException', (err) => {
  // Don't just log and continue — app state is corrupted
});
```

### Key Takeaways

- **Operational errors** (invalid input, DB failure) should be caught and handled gracefully
- **Programmer errors** (bugs) should crash the process — fix the code
- Use a **central error handler** in Express (4-parameter middleware)
- `process.on('unhandledRejection')` and `process.on('uncaughtException')` are safety nets, not error handlers
- Always handle `error` events on streams — unhandled errors crash the process
- Implement **graceful shutdown** — close connections, finish requests, then exit
- Never swallow errors silently — log them and/or re-throw
