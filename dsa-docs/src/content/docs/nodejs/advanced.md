---
title: "Advanced Node.js"
description: "Clustering, Worker Threads, Redis caching, WebSockets, and Message Queues."
---

# Section 9: Advanced Node.js

## 🔄 Clustering

Node.js is single-threaded, but modern servers have multiple CPU cores. **Clustering** lets you run multiple Node.js processes (workers) that all share the same port.

**Used by**: Netflix, LinkedIn to handle millions of requests

```javascript
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Spawning ${numCPUs} workers...`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker PID: ${process.pid}`);
  }).listen(3000);
}
```

---

## 🧵 Worker Threads

**Clustering** creates multiple Node.js processes. **Worker Threads** create multiple threads within ONE process, sharing memory. Use for CPU-intensive work.

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// worker.js
if (!isMainThread) {
  const { numbers } = workerData;
  const result = numbers.reduce((sum, n) => sum + n, 0);
  parentPort.postMessage({ result });
}

// main.js
if (isMainThread) {
  const bigArray = Array.from({ length: 1000000 }, (_, i) => i);
  const worker = new Worker(__filename, {
    workerData: { numbers: bigArray }
  });
  worker.on('message', ({ result }) => console.log('Sum:', result));
  worker.on('error', (err) => console.error(err));
}
```

---

## 🔴 Redis — In-Memory Cache

Redis is an in-memory data store — incredibly fast (sub-millisecond). Use it to cache expensive database queries.

```javascript
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });
await client.connect();

// Cache middleware
const cacheMiddleware = (duration) => async (req, res, next) => {
  const key = `cache:${req.url}`;
  const cached = await client.get(key);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    client.setEx(key, duration, JSON.stringify(data));
    return originalJson(data);
  };
  next();
};

app.get('/products', cacheMiddleware(300), getProducts);
```

---

## 🌐 WebSockets — Real-Time Communication

**WebSockets** create a persistent, bidirectional connection — perfect for chat apps, live dashboards, multiplayer games.

```javascript
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'https://myapp.com' }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.user.name} connected`);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { user: socket.user.name });
  });
  
  socket.on('send-message', ({ roomId, message }) => {
    io.to(roomId).emit('new-message', {
      from: socket.user.name,
      message,
      time: new Date()
    });
  });
  
  socket.on('disconnect', () => {
    console.log(`User ${socket.user.name} disconnected`);
  });
});
```

---

## 📨 Message Queues (Bull/BullMQ)

Message queues handle tasks asynchronously. Instead of making a user wait for a slow operation, you push it to a queue and process it in the background.

```javascript
const Queue = require('bull');

const emailQueue = new Queue('email', { redis: { host: 'localhost', port: 6379 } });

app.post('/register', async (req, res) => {
  const user = await createUser(req.body);
  await emailQueue.add('welcome-email', {
    to: user.email,
    name: user.name,
    template: 'welcome'
  });
  res.status(201).json({ success: true, user });
});

emailQueue.process('welcome-email', async (job) => {
  const { to, name, template } = job.data;
  await sendEmail({ to, subject: `Welcome ${name}!`, template });
});

emailQueue.on('completed', (job) => console.log(`Email sent: ${job.id}`));
emailQueue.on('failed', (job, err) => console.error(`Email failed: ${err.message}`));
```
