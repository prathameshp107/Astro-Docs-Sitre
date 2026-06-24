---
title: "Message Queues & Streaming"
description: "Decouple services with message queues — Kafka vs RabbitMQ, point-to-point vs pub/sub."
sidebar:
  order: 4
---

# Message Queues & Streaming

> A **message queue** lets services send messages to each other without knowing about each other. The sender puts a message on a queue. The consumer picks it up later.

---

## Visual: Producer → Queue → Consumers

```mermaid
flowchart LR
    Prod["📤 Producer<br/>(Order Service)"] --> Queue["📨 Message Queue"]
    Queue -->|"Deliver"| Cons1["📥 Consumer 1<br/>(Email Service)"]
    Queue -->|"Deliver"| Cons2["📥 Consumer 2<br/>(Analytics)"]

    style Prod fill:#7c3aed,color:#fff
    style Queue fill:#4f46e5,color:#fff
    style Cons1 fill:#059669,color:#fff
    style Cons2 fill:#059669,color:#fff
```

---

## Point-to-Point vs Pub/Sub

```mermaid
flowchart LR
    subgraph P2P["Point-to-Point (Queue)"]
        P1["Producer"] --> Q1["Queue"]
        Q1 --> C1["Consumer 1"]
        Q1 --> C2["Consumer 2"]
        Note1["Each message consumed once"]
    end

    subgraph PubSub["Pub/Sub (Topic)"]
        P2["Producer"] --> T["Topic"]
        T --> Sub1["Subscriber 1"]
        T --> Sub2["Subscriber 2"]
        Note2["Each subscriber gets ALL messages"]
    end

    style P1 fill:#7c3aed,color:#fff
    style C1 fill:#059669,color:#fff
    style C2 fill:#059669,color:#fff
    style P2 fill:#7c3aed,color:#fff
    style Sub1 fill:#059669,color:#fff
    style Sub2 fill:#059669,color:#fff
```

---

## Kafka vs RabbitMQ

| Aspect | RabbitMQ | Kafka |
|--------|:--------:|:-----:|
| **Model** | Smart broker, dumb consumer | Dumb broker, smart consumer |
| **Message retention** | Deleted after consumption | **Persistent** (configurable retention) |
| **Ordering** | Within one queue | Within one partition |
| **Throughput** | ~10K msg/s | **~1M msg/s** |
| **Routing** | Complex (exchanges, bindings) | Simple (topics, partitions) |
| **Best for** | Task queues, RPC, complex routing | Event streaming, data pipelines, logs |

---

## When to Use a Message Queue

| Use Case | Why Queue? |
|----------|------------|
| **Send email on order** | Don't make user wait for email — queue it |
| **Image/video processing** | Long-running task, process async |
| **Decouple microservices** | Order service doesn't need to know about notification service |
| **Handle traffic spikes** | Queue buffers requests, consumers process at their pace |
| **Event-driven architecture** | Multiple services react to the same event |

---

## Key Concepts

- **Dead Letter Queue** — messages that failed processing go here for debugging
- **Idempotency** — processing the same message twice should have the same effect
- **Backpressure** — if consumers can't keep up, the queue grows (or drops messages)

---

## Trade-offs

- Queues add latency (message sits in queue before processing).
- Exactly-once delivery is hard — most queues guarantee at-least-once (retries may cause duplicates).
- Kafka is the right choice for high-throughput event streaming. RabbitMQ for task queues and routing.
- A queue is another system to maintain — adds operational complexity.

---

## In Simple Words

- Message queue = a buffer between services. Producer sends, consumer receives later.
- Point-to-point = one consumer gets each message. Pub/sub = all subscribers get all messages.
- Kafka for streaming and high throughput. RabbitMQ for task queues and flexible routing.
