---
title: "Message Queues"
description: "Why queues, RabbitMQ/Kafka/BullMQ basics, pub/sub vs work queues, and practical implementations."
sidebar:
  order: 3
---

## Message Queues

**Message queues** enable asynchronous communication between services. Instead of processing a task immediately (blocking the user), you send a message to a queue and process it in the background.

### Why Use a Queue?

```javascript
// ❌ Synchronous — user waits for the entire flow
app.post('/register', async (req, res) => {
  const user = await createUser(req.body);
  await sendWelcomeEmail(user.email);  // User waits for this!
  await updateAnalytics();              // And this!
  await notifyAdmin(user);              // And this!
  res.json({ success: true });         // Slow response
});

// ✅ Async — user gets instant response, tasks queued
app.post('/register', async (req, res) => {
  const user = await createUser(req.body);
  
  // Queue tasks for background processing
  await emailQueue.add({ type: 'welcome', email: user.email });
  await analyticsQueue.add({ type: 'registration', userId: user.id });
  await notificationQueue.add({ type: 'admin-alert', userId: user.id });
  
  res.json({ success: true }); // Instant!
});
```

### Queue Architectures

| Pattern | Description | Example |
|---|---|---|
| **Work Queue** | One producer, one consumer — each message processed once | Email sending |
| **Pub/Sub** | One producer, multiple consumers — each gets every message | Notifications |
| **RPC Queue** | Producer expects a response | Request-reply patterns |

### BullMQ — Redis-Based Queue

BullMQ is the most popular queue library for Node.js. It uses Redis for durability and fast access.

```javascript
const { Queue, Worker, QueueScheduler } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis({ host: 'localhost', port: 6379 });

// 1. Define a queue
const emailQueue = new Queue('email', { connection });

// 2. Add jobs
await emailQueue.add('welcome-email', {
  to: 'user@example.com',
  name: 'Alice',
  template: 'welcome',
}, {
  attempts: 3,               // Retry up to 3 times
  backoff: { type: 'exponential', delay: 5000 },
  removeOnComplete: { count: 100 }, // Keep last 100 completed
});

// 3. Process jobs (in a separate worker process)
const worker = new Worker('email', async (job) => {
  const { to, name, template } = job.data;
  
  console.log(`Processing job ${job.id}: sending ${template} to ${to}`);
  
  // Simulate sending email
  await sendEmail({ to, subject: `Welcome ${name}!`, template });
  
  return { sent: true, to, time: Date.now() };
}, { connection });

// Event handlers
worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

worker.on('progress', (job, progress) => {
  console.log(`Job ${job.id}: ${progress}% complete`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await worker.close();
  await emailQueue.close();
});
```

### Job Scheduling & Delays

```javascript
// Schedule a job to run later
await emailQueue.add('reminder', {
  to: 'user@example.com',
}, {
  delay: 24 * 60 * 60 * 1000,  // 24 hours from now
});

// Repeatable jobs (cron)
await emailQueue.add('daily-digest', {}, {
  repeat: {
    pattern: '0 8 * * *', // Every day at 8 AM
  },
});

// Priority
await emailQueue.add('urgent', data, { priority: 10 });  // High
await emailQueue.add('normal', data, { priority: 50 });  // Medium
await emailQueue.add('low', data, { priority: 100 });    // Low
```

### Pub/Sub Pattern (Redis)

```javascript
const Redis = require('ioredis');

const publisher = new Redis();
const subscriber = new Redis();

// Publisher
app.post('/events', (req, res) => {
  const event = req.body;
  publisher.publish('order-events', JSON.stringify(event));
  res.json({ published: true });
});

// Subscriber (microservice A)
subscriber.subscribe('order-events');
subscriber.on('message', (channel, message) => {
  const event = JSON.parse(message);
  if (event.type === 'order.placed') {
    console.log('Sending confirmation email for order', event.orderId);
  }
});

// Subscriber (microservice B)
subscriber.subscribe('order-events');
subscriber.on('message', (channel, message) => {
  const event = JSON.parse(message);
  if (event.type === 'order.placed') {
    console.log('Updating inventory for order', event.orderId);
  }
});
```

### RabbitMQ with amqplib

```javascript
const amqp = require('amqplib');

async function setupRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  
  const queueName = 'email_queue';
  await channel.assertQueue(queueName, { durable: true });
  
  // Send message
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify({
    to: 'user@example.com',
    subject: 'Hello!',
  })), { persistent: true });
  
  // Consume messages
  channel.consume(queueName, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('Processing:', data);
      channel.ack(msg); // Acknowledge — message processed
    }
  });
}
```

### Common Use Cases

| Use Case | Queue Type | Why |
|---|---|---|
| **Email/SMS sending** | Work queue | Slow, retry on failure, don't block user |
| **Image/video processing** | Work queue | CPU-intensive, process in background |
| **Notifications** | Pub/Sub | Multiple services need to know |
| **Analytics** | Work queue | Batch processing, decouple from web tier |
| **Order processing** | Work queue | Orchestrate multi-step workflow |
| **Webhook delivery** | Work queue | Retry with exponential backoff |

### 🚨 Common Gotchas

```javascript
// ❌ Not handling job failures
const worker = new Worker('queue', async (job) => {
  // If this throws, the job fails silently
  // and stays in the queue forever!
  await riskyOperation();
});
// ✅ Always add error handling
worker.on('failed', (job, err) => {
  logger.error(`Job ${job.id} failed:`, err);
});

// ❌ Not acknowledging messages (RabbitMQ)
channel.consume('queue', (msg) => {
  // If you don't call channel.ack(msg), the message stays in the queue
  // and gets re-delivered after the consumer disconnects
});

// ❌ Too many retries with no backoff — overwhelms the system
await queue.add('task', data, { attempts: 10 });
// Use exponential backoff instead
await queue.add('task', data, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});
```

### Key Takeaways

- Message queues **decouple** producers from consumers — users don't wait for slow tasks
- **BullMQ** (Redis-based) is the most popular Node.js queue library
- Use **work queues** for one-to-one processing (each message processed once)
- Use **pub/sub** for one-to-many broadcasting (each consumer gets every message)
- Always configure **retry with backoff** for transient failures
- Set **TTL** on messages to prevent queues from growing unboundedly
- Queues are essential for microservices communication, background jobs, and reliable processing
