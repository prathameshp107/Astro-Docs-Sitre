---
title: "09 — Message Queues"
description: "Message queue patterns — SQS, Kafka, RabbitMQ — for decoupling services, async processing, and event-driven architectures."
sidebar:
  order: 9
---

## 09 — Message Queues

**Message queues** enable asynchronous communication between services. A producer sends a message to a queue, and a consumer processes it when ready — decoupling the two services in time and space.

> **Analogy:** A message queue is like an email inbox. You send an email (produce a message), and the recipient reads and acts on it when they have time (consume). You don't need to wait on the phone for them to respond.

---

### Problem Statement

Without message queues:
- **Synchronous coupling** — a slow consumer blocks the producer
- **Traffic spikes** — burst traffic crashes downstream services
- **Retry complexity** — failed operations require complex retry logic
- **Fan-out** — sending the same data to multiple consumers is complex

---

### Architecture Overview

```mermaid
flowchart LR
    subgraph Producers["Producers"]
        P1["Web App"]
        P2["Mobile App"]
        P3["Cron Job"]
    end

    subgraph Queue["Message Queue"]
        Q["Queue / Topic / Stream"]
    end

    subgraph Consumers["Consumers"]
        C1["Email Service"]
        C2["Notification Service"]
        C3["Analytics Pipeline"]
        C4["Search Index"]
    end

    P1 & P2 & P3 --> Queue
    Queue --> C1 & C2 & C3 & C4

    style Producers fill:#3b82f6,color:#fff
    style Queue fill:#7c3aed,color:#fff
    style Consumers fill:#059669,color:#fff
```

---

### Message Queue Models

| Model | Description | Example |
|-------|-------------|---------|
| **Point-to-Point** | One message → one consumer | SQS, RabbitMQ work queues |
| **Pub/Sub (Fan-out)** | One message → all subscribers | SNS, Kafka consumer groups |
| **Streaming** | Ordered log of events, replayable | Kafka, Kinesis |
| **Dead Letter Queue (DLQ)** | Failed messages after retries | All queue systems |

---

### Queue vs Stream vs Pub/Sub

```mermaid
flowchart TB
    MSG["Message Systems"] --> Queue["Queue<br/>SQS, RabbitMQ<br/>Point-to-point<br/>Message deleted after consume"]
    MSG --> PubSub["Pub/Sub<br/>SNS, RabbitMQ<br/>Broadcast to all<br/>subscribers"]
    MSG --> Stream["Stream<br/>Kafka, Kinesis<br/>Ordered log<br/>Replayable"]
    MSG --> DLQ["Dead Letter Queue<br/>Failed messages<br/>Retry policies"]

    style MSG fill:#7c3aed,color:#fff
    style Queue fill:#3b82f6,color:#fff
    style PubSub fill:#059669,color:#fff
    style Stream fill:#f59e0b,color:#fff
    style DLQ fill:#ef4444,color:#fff
```

---

### Async Processing Flow

```mermaid
sequenceDiagram
    participant User as User
    participant App as Web App
    participant Queue as Message Queue
    participant Worker as Worker (Consumer)
    participant DB as Database
    participant Email as Email Service

    User->>App: Place order
    App->>DB: Save order (status: processing)
    App->>Queue: SendMessage({ orderId: 123 })
    App-->>User: 202 Accepted (order received)

    Note over Worker: Worker polls queue

    Worker->>Queue: ReceiveMessage
    Queue-->>Worker: { orderId: 123 }
    
    Worker->>DB: Update order (processing)
    Worker->>Worker: Validate payment
    Worker->>Email: Send confirmation email
    Worker->>DB: Update order (confirmed)
    Worker->>Queue: DeleteMessage (done)

    alt Failed after retries
        Queue->>DLQ["Dead Letter Queue"]: Move message
    end
```

---

### Popular Message Queue Technologies

| Technology | Type | Persistence | Ordering | Best For |
|------------|------|-------------|----------|----------|
| **Apache Kafka** | Stream | Disk (configurable) | Partition-order | Event streaming, logs, metrics |
| **RabbitMQ** | Queue | Disk or Memory | Optional | Task queues, pub/sub, RPC |
| **AWS SQS** | Queue | Disk (AWS) | Best-effort (Standard) | Decoupling microservices |
| **AWS SNS** | Pub/Sub | None (push) | N/A | Fan-out notifications |
| **Redis Streams** | Stream | Memory/Disk | Yes | Real-time, lightweight |
| **Google Pub/Sub** | Pub/Sub | Disk (GCP) | Yes (ordered) | Event-driven, serverless |

---

### Kafka Architecture (Streaming)

```mermaid
flowchart TB
    subgraph Producers["Producers"]
        Prod1["App Events"]
        Prod2["DB Changes"]
        Prod3["Metrics"]
    end

    subgraph Kafka["Apache Kafka Cluster"]
        Topic1["Topic: user-events<br/>Partition 0 | 1 | 2"]
        Topic2["Topic: page-views<br/>Partition 0 | 1"]
    end

    subgraph Consumers["Consumer Groups"]
        CG1["Analytics Group"]
        CG2["Notification Group"]
    end

    Prod1 & Prod2 --> Topic1
    Prod3 --> Topic2
    Topic1 --> CG1 & CG2
    Topic2 --> CG1

    style Producers fill:#3b82f6,color:#fff
    style Kafka fill:#7c3aed,color:#fff
    style Consumers fill:#059669,color:#fff
```

---

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Producer** | Sends messages to a queue/topic |
| **Consumer** | Receives and processes messages |
| **Topic** | Named channel (Kafka, SNS) |
| **Partition** | Sub-division of a topic (parallelism in Kafka) |
| **Consumer Group** | Group of consumers sharing work (Kafka) |
| **Broker** | Server hosting queue/topic partitions |
| **Retry Policy** | How many times to retry failed messages |
| **DLQ (Dead Letter Queue)** | Final destination for messages that can't be processed |
| **Message TTL** | How long a message lives before auto-deletion |

---

### Message Processing Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Work Queue** | Multiple workers compete for messages | Image processing, email sending |
| **Pub/Sub** | Each subscriber gets every message | Notifications, audit logs |
| **Event Sourcing** | Store all events, rebuild state | Audit trails, financial systems |
| **Transactional Outbox** | DB transaction → message to queue | Reliable cross-service communication |
| **Saga** | Distributed transaction via messages | Microservice transactions |

---

### Trade-offs

| Choice | Pros | Cons |
|--------|------|------|
| **Synchronous** | Simple, consistent | Coupled, slower, no retry |
| **Async with queue** | Decoupled, resilient | Eventual consistency, complexity |
| **Kafka** | High throughput, replayable | Heavy operations, higher latency |
| **SQS** | Fully managed, simple | Limited ordering (Standard), vendor lock |
| **At-least-once delivery** | No message loss | Duplicate processing (idempotency needed) |
| **Exactly-once** | No duplicates | Lower throughput, complex |

---

### Scaling Strategies

| Strategy | Description |
|----------|-------------|
| **Increase partitions** | More parallelism (Kafka) |
| **More consumers** | Scale consumer count within group |
| **Batch processing** | Consume messages in batches |
| **Rate limiting** | Control how fast consumers process |
| **Priority queues** | Critical messages processed first |

---

### Interview Questions

1. **What's the difference between a queue and a pub/sub system?**
2. **How does Kafka achieve high throughput?**
3. **How do you handle duplicate messages in a queue?**
4. **What is the transactional outbox pattern?**
5. **How would you design a reliable notification system with message queues?**

---

### Real-World Examples

| System | Message Queue Usage |
|--------|---------------------|
| **Uber** | Kafka for ride events, trip tracking, analytics |
| **Netflix** | Kafka for event streaming (2M+ events/sec) |
| **LinkedIn** | Kafka invented at LinkedIn for activity streams |
| **Amazon** | SQS for order processing, inventory updates |

---

### In Simple Words

- **Message queues** decouple producers (senders) from consumers (processors)
- **SQS/RabbitMQ** = simple queues — one message consumed by one worker
- **Kafka** = event stream — ordered, replayable, high throughput
- **SNS/Pub-Sub** = one message broadcast to many subscribers
- **DLQ** (Dead Letter Queue) catches messages that failed after all retries
- **At-least-once delivery** is the default — design your consumers to be **idempotent**
- Use queues for **async processing, load smoothing, and decoupling** services
