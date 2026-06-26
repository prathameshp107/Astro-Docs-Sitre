---
title: "Case Study 8 — Design Notification System"
description: "HLD case study: Design a scalable notification system — push notifications, email, SMS, delivery guarantees, and templating."
sidebar:
  order: 8
---

## Case Study 8 — Design Notification System

**Problem:** Design a notification system that sends push notifications, emails, and SMS to millions of users reliably and at scale.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Send push (mobile/web), email, SMS; notification preferences; templates; scheduling; read/unread tracking |
| **Non-Functional** | < 1s delivery for push, < 5min for email, 99.9% delivery rate, support 10+ billion notifications/day |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Producers["Producers"]
        Services["Microservices<br/>Events"]
        Cron["Scheduled Jobs"]
        RealTime["Real-Time Triggers"]
    end

    subgraph Ingestion["Ingestion Layer"]
        EventBus["Event Bus (Kafka)"]
        Dedup["Deduplication"]
        Priority["Priority Queue"]
    end

    subgraph Processing["Processing"]
        Router["Router<br/>(Type, Channel, Template)"]
        Enrich["Enrichment<br/>(User prefs, content)"]
        Batch["Batching Engine"]
    end

    subgraph Delivery["Delivery Channels"]
        FCM["FCM/APNS<br/>Push"]
        SES["SES/SendGrid<br/>Email"]
        SNS["Twilio/SNS<br/>SMS"]
        WS["WebSocket<br/>In-app"]
    end

    Producers --> EventBus --> Dedup --> Priority --> Router
    Router --> Enrich --> Batch
    Batch --> FCM & SES & SNS & WS

    style Producers fill:#3b82f6,color:#fff
    style Ingestion fill:#7c3aed,color:#fff
    style Processing fill:#059669,color:#fff
    style Delivery fill:#f59e0b,color:#fff
```

---

### Key Design Decisions

| Decision | Approach | Why |
|----------|----------|-----|
| **Deduplication** | Dedup window (5 min), event ID | Same event fired multiple times |
| **Priority queue** | Critical (security alerts) → Normal → Bulk (marketing) | Don't block urgent notifications |
| **Batch sending** | Batch emails (200/req), push (1,000/req) | Higher throughput, rate limits |
| **Templating** | Server-side render templates | Consistent formatting, dynamic content |
| **Retry** | Exponential backoff + DLQ after 5 retries | Transient failures |
| **Preference filtering** | Check user opt-in preferences before sending | Compliance (GDPR, CAN-SPAM) |

---

### Delivery Flow

```mermaid
sequenceDiagram
    participant Service as Microservice
    participant Queue as Event Bus
    participant Router as Router
    participant Channel as Channel Service
    participant Provider as External Provider

    Service->>Queue: Publish (type: order_confirmed, user: 123)
    Queue->>Router: Route to processor
    Router->>Router: Get user preferences
    Router->>Router: Choose channel (push + email)
    
    Router->>Channel: Send push (FCM)
    Channel->>Provider: FCM API call
    Provider-->>Channel: 200 OK
    Channel->>Channel: Check delivery status
    
    alt Push Failed
        Channel->>Channel: Retry (exponential backoff)
        Channel->>DLQ: Failed after 5 retries
    end
    
    Router->>Channel: Send email (SES)
    Channel->>Provider: SES API call
    Provider-->>Channel: 200 OK
```

---

### In Simple Words

- **Decoupled architecture** — producers publish events, consumers send notifications
- **Kafka** ingests all notification events — durable, replayable
- **Deduplication** prevents sending the same notification twice
- **Priority queues** ensure critical notifications aren't delayed by bulk ones
- **Template service** renders notification content from templates + variables
- **Channel services** (push, email, SMS) handle provider-specific logic and rate limits
- **Retry with DLQ** — transient failures retry, persistent failures go to dead letter queue
- **User preference filtering** ensures you only send via channels users have opted into
