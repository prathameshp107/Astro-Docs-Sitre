---
title: "Case Study 2 — Design WhatsApp"
description: "HLD case study: Design a messaging app like WhatsApp — real-time messaging, presence, multi-device sync, and end-to-end encryption."
sidebar:
  order: 2
---

## Case Study 2 — Design WhatsApp

**Problem:** Design a real-time messaging application like WhatsApp supporting 2B+ users with text, images, videos, voice messages, group chats, and end-to-end encryption.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | 1:1 messaging, group chats (up to 256 users), media sharing, voice messages, read receipts, online/last-seen, multi-device |
| **Non-Functional** | < 100ms delivery latency (median), 99.99% availability, 100B+ messages/day, support 2B+ users, end-to-end encryption |
| **Constraints** | Message delivery must be at-least-once, messages stored for 30 days on server |

---

### Capacity Estimation

| Metric | Value |
|--------|-------|
| **Users** | 2B+ |
| **Daily messages** | 100B+ (~1M/sec) |
| **Storage per message** | ~100 bytes (text), 100KB-10MB (media) |
| **Monthly storage** | ~300TB (text) + petabytes (media) |
| **Peak throughput** | ~2M messages/sec |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Clients["Clients"]
        Mobile["Mobile App"]
        Web["Web App"]
        Desktop["Desktop App"]
    end

    subgraph Gateway["Connection Layer"]
        WS["WebSocket Gateway<br/>Persistent connections"]
        HTTP["Long Poll Fallback"]
    end

    subgraph Services["Services"]
        Msg["Message Service"]
        Presence["Presence Service"]
        Group["Group Service"]
        Media["Media Service"]
        Sync["Multi-Device Sync"]
    end

    subgraph Storage["Data Layer"]
        MySQL["MySQL<br/>Users, Groups"]
        Cassandra["Cassandra<br/>Messages"]
        S3["S3 / Blob Store<br/>Media files"]
        Redis["Redis<br/>Presence, Sessions"]
    end

    Clients --> Gateway
    Gateway --> Services
    Services --> Storage

    style Clients fill:#3b82f6,color:#fff
    style Gateway fill:#7c3aed,color:#fff
    style Services fill:#059669,color:#fff
    style Storage fill:#f59e0b,color:#fff
```

---

### Message Delivery Flow

```mermaid
sequenceDiagram
    participant Alice as Alice (Sender)
    participant WS as WebSocket Gateway
    participant Msg as Message Service
    participant Queue as Message Queue
    participant Storage as Message Store
    participant Bob as Bob (Receiver)

    Alice->>WS: Send encrypted message
    WS->>Msg: Route to message service
    
    Msg->>Storage: Save message (encrypted)
    Storage-->>Msg: Stored
    
    Msg->>Queue: Enqueue for delivery
    Queue->>Msg: Route to Bob's WebSocket
    
    alt Bob Online
        Msg->>Bob: Deliver message ⚡
        Bob-->>Msg: Delivery receipt
        Msg->>Alice: ✅ Delivered
    else Bob Offline
        Msg->>Storage: Store for push notification
        Storage-->>Msg: Wait for Bob to come online
        Note over Msg,Bob: When Bob connects, pull pending messages
    end
```

---

### Key Design Decisions

| Decision | Approach | Why |
|----------|----------|-----|
| **Real-time transport** | Custom WebSocket protocol | Low latency, bidirectional |
| **Message cache** | Last 100 messages in-memory per user | Fast sync when device comes online |
| **Media storage** | Encrypted Blob store + CDN | Scalable storage, fast global delivery |
| **End-to-end encryption** | Signal Protocol (X3DH + Double Ratchet) | Messages encrypted before leaving device |
| **Multi-device** | Merkle tree sync protocol | Each client has independent key bundle |

---

### Scaling & Trade-offs

| Aspect | Approach | Trade-off |
|--------|----------|-----------|
| **Message ordering** | Server-assigned timestamp per conversation | Clock skew between devices |
| **Delivery guarantee** | At-least-once + dedup | Duplicate detection adds complexity |
| **Group messaging** | Server fanout for groups < 256 | Higher server load for large groups |
| **Media expiration** | 30-day auto-delete | User may lose media after 30 days |

---

### In Simple Words

- **WebSocket** persistent connections for real-time delivery (< 100ms)
- **End-to-end encryption** using Signal Protocol — server can't read messages
- **Message store** in Cassandra for horizontal scalability
- **Offline messages** stored and delivered when user reconnects
- **Presence system** via heartbeats stored in Redis
- **Multi-device** uses Merkle trees to sync conversation state
- Scale with **more WebSocket servers** + **pub/sub backplane**
