---
title: "Redis Pub/Sub"
description: "Pub/Sub (Publish/Subscribe) is a real-time messaging pattern where: - Publishers send messages to a channel - Subscribers listen to channels and receive me"
---

## 13. Redis Pub/Sub

### What is Pub/Sub?

Pub/Sub (Publish/Subscribe) is a **real-time messaging pattern** where:
- **Publishers** send messages to a **channel**
- **Subscribers** listen to channels and receive messages instantly

Publishers and subscribers are completely decoupled — they do not know about each other.

> **Analogy:** Think of a radio station. The station (publisher) broadcasts on FM 98.5 (channel). Anyone tuning into that frequency (subscriber) receives the broadcast in real time.

---

### Core Commands

**Terminal 1 — Subscriber:**
```bash
# Subscribe to a channel
SUBSCRIBE notifications

# Subscribe to multiple channels
SUBSCRIBE notifications alerts updates

# Subscribe using pattern matching
PSUBSCRIBE news:*      # matches: news:tech, news:sports, etc.
```

**Terminal 2 — Publisher:**
```bash
# Publish a message to a channel
PUBLISH notifications "New order received: #1042"

# Publisher sees how many subscribers received it
# Output: (integer) 1
```

**Subscriber Terminal output:**
```
1) "message"
2) "notifications"
3) "New order received: #1042"
```

---

### Pub/Sub Communication Diagram

![Pub/Sub Communication Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-pub-sub-pub-sub-communication-diagram.svg)

---

### Real-World Examples

**Chat Application:**
```bash
# User joins room channel
SUBSCRIBE chat:room:general

# User sends a message
PUBLISH chat:room:general '{"user":"Alice","msg":"Hello everyone!"}'
```

**Live Notifications:**
```bash
# Notification service publishes
PUBLISH user:notifications:42 '{"type":"order","message":"Your order shipped!"}'

# Frontend WebSocket server subscribed to this channel pushes to browser
```

---
