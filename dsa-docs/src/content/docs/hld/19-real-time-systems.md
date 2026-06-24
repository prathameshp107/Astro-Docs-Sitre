---
title: "19 — Real-Time Systems"
description: "Real-time system design — WebSockets, server-sent events, pub/sub, low-latency communication, and presence systems."
sidebar:
  order: 19
---

## 19 — Real-Time Systems

**Real-time systems** process and deliver data with minimal delay — typically milliseconds to seconds. They power chat apps, live notifications, collaborative editing, gaming, and live dashboards.

> **Analogy:** A real-time system is like a live conversation vs email. Email (batch) has minutes to hours of delay. A conversation (real-time) has milliseconds of delay — you hear the words almost as soon as they're spoken.

---

### Problem Statement

Building real-time systems is challenging:
- **Low latency requirement** — messages must arrive in < 100ms
- **Connection management** — millions of persistent connections
- **State synchronization** — all clients must see the same state
- **At-least-once delivery** — no message loss
- **Scaling** — WebSocket connections don't scale like HTTP

---

### Real-Time Communication Protocols

```mermaid
flowchart TB
    RT["Real-Time Communication"] --> WebSocket["WebSocket<br/>Full-duplex, persistent<br/>Bidirectional"]
    RT --> SSE["Server-Sent Events<br/>One-way (server → client)<br/>HTTP-based"]
    RT --> LongPoll["Long Polling<br/>Client polls, server holds<br/>Legacy fallback"]
    RT --> WebRTC["WebRTC<br/>Peer-to-peer<br/>Lowest latency"]

    WebSocket --> Use_WS["Use: Chat, gaming, live updates"]
    SSE --> Use_SSE["Use: Notifications, stock tickers"]
    LongPoll --> Use_LP["Use: Fallback when WebSocket unavailable"]
    WebRTC --> Use_WR["Use: Video calls, file sharing"]

    style RT fill:#7c3aed,color:#fff
    style WebSocket fill:#3b82f6,color:#fff
    style SSE fill:#059669,color:#fff
    style LongPoll fill:#f59e0b,color:#fff
    style WebRTC fill:#ef4444,color:#fff
```

| Protocol | Direction | Latency | Browser Support | Use Case |
|----------|-----------|---------|-----------------|----------|
| **WebSocket** | Bidirectional | < 50ms | ✅ Excellent | Chat, gaming, live apps |
| **SSE** | Server → Client | < 100ms | ✅ Good (no IE) | Notifications, feeds |
| **Long Polling** | Half-duplex | 200ms-5s | ✅ Universal | Fallback |
| **WebRTC** | Peer-to-peer | < 20ms | ✅ Good | Video/audio calls |

---

### WebSocket Architecture

```mermaid
sequenceDiagram
    participant Client as Client
    participant LB as Load Balancer
    participant WS as WebSocket Server
    participant PubSub as Pub/Sub (Redis)
    participant Other as Other Client

    Client->>LB: HTTP Upgrade Request
    LB->>WS: Upgrade to WebSocket
    
    Note over Client,WS: Persistent connection established
    
    Client->>WS: Send message
    WS->>PubSub: Publish message to channel
    PubSub-->>WS: Message routed
    WS-->>Client: Acknowledge
    
    Note over WS,PubSub: Pub/Sub broadcasts to all WebSocket servers
    
    PubSub->>Other: Deliver message
    Other-->>Client: Message received in real-time ⚡

    Note over Client,Other: Millions of concurrent connections handled via horizontal scaling
```

---

### Real-Time Architecture Patterns

```mermaid
flowchart TB
    Patterns["Real-Time Patterns"] --> PubSub["Pub/Sub Broker<br/>Redis Pub/Sub / Kafka<br/>Broadcast messages<br/>to all subscribers"]
    Patterns --> Presence["Presence System<br/>Track online/offline<br/>Active connections<br/>User status"]
    Patterns --> Fanout["Fanout on Write<br/>When data changes,<br/>push to all connected<br/>clients"]
    Patterns --> CQRS["CQRS + Events<br/>Write events to stream,<br/>read model updated<br/>asynchronously"]

    style Patterns fill:#7c3aed,color:#fff
    style PubSub fill:#3b82f6,color:#fff
    style Presence fill:#059669,color:#fff
    style Fanout fill:#f59e0b,color:#fff
    style CQRS fill:#ef4444,color:#fff
```

---

### Scaling WebSocket Connections

A single server can handle ~10K-100K concurrent WebSocket connections. To scale beyond that:

```mermaid
flowchart TB
    Users["10M Users"] --> LB["Load Balancer<br/>(Sticky sessions or<br/>application routing)"]

    LB --> WS1["WebSocket Server 1<br/>100K connections"]
    LB --> WS2["WebSocket Server 2<br/>100K connections"]
    LB --> WS3["WebSocket Server 3<br/>100K connections"]
    LB --> WSN["WebSocket Server N<br/>100K connections"]

    WS1 & WS2 & WS3 & WSN --> PubSub["Pub/Sub Backplane<br/>Redis / RabbitMQ / Kafka"]
    PubSub --> API["Application Services"]

    style Users fill:#f59e0b,color:#fff
    style LB fill:#3b82f6,color:#fff
    style PubSub fill:#7c3aed,color:#fff
```

| Challenge | Solution |
|-----------|----------|
| **Server affinity** | Client always connects to same WebSocket server (sticky routing) |
| **Cross-server broadcast** | Pub/sub backplane (Redis Pub/Sub or Kafka) between WebSocket servers |
| **Connection state** | Store session state in Redis — not in WebSocket server memory |
| **Graceful close** | Send drain signal, let clients reconnect to other servers |

---

### Presence System Design

```mermaid
flowchart TB
    subgraph Online["Online Users"]
        U1["User 1 🟢"]
        U2["User 2 🟢"]
        U3["User 3 🟢"]
    end

    subgraph Redis_Presence["Redis Presence Store"]
        Key1["user:1 → 'online'<br/>TTL: 30s"]
        Key2["user:2 → 'online'<br/>TTL: 30s"]
        Key3["user:3 → 'online'<br/>TTL: 30s"]
        Key4["user:4 → 'away'<br/>TTL: 30s"]
    end

    subgraph Heartbeat["Heartbeat Process"]
        HB["Client sends heartbeat<br/>every 15 seconds"]
        HB -->|"Update TTL"| Redis_Presence
        Expire["TTL expired →<br/>user marked offline"]
    end

    Online -->|"Heartbeat"| Redis_Presence
    Redis_Presence -->|"Presence updates"| Clients["Other clients<br/>see status changes"]

    style Online fill:#059669,color:#fff
    style Redis_Presence fill:#7c3aed,color:#fff
    style Heartbeat fill:#3b82f6,color:#fff
```

| Presence Strategy | How It Works | Pros | Cons |
|-------------------|-------------|------|------|
| **Heartbeat** | Client sends "I'm alive" every N seconds | Simple | False offline if heartbeat delayed |
| **WebSocket disconnect** | Detect connection close | Accurate | No heartbeat = may miss timeout |
| **Hybrid** | Heartbeat + connection state | Most reliable | Most complex |

---

### Trade-offs

| Decision | Pros | Cons |
|----------|------|------|
| **WebSocket** | Bidirectional, low latency | Connection management complexity |
| **SSE** | Simpler (HTTP), auto-reconnect | Server → client only |
| **Polling** | Simple to implement | Lots of wasted requests |
| **Pub/sub backplane** | Scales WebSocket horizontally | Extra infrastructure (Redis/Kafka) |
| **In-memory state** | Fastest, simplest | Lost on server restart, can't scale |

---

### Scaling Strategies

| Strategy | Description |
|----------|-------------|
| **Horizontal WebSocket servers** | Multiple servers behind sticky load balancer |
| **Pub/sub backplane** | Redis Pub/Sub or Kafka for cross-server communication |
| **Connection pooling** | Reduce overhead of creating new connections |
| **Binary protocols** | Use Protocol Buffers, MessagePack instead of JSON |
| **Backpressure** | Slow down producers when consumers can't keep up |
| **Edge delivery** | Deploy WebSocket servers at edge (Cloudflare Workers, AWS@Edge) |

---

### Interview Questions

1. **What's the difference between WebSockets and Server-Sent Events?**
2. **How do you scale WebSocket connections to millions of users?**
3. **How would you design a real-time chat system?**
4. **How does a presence system (online/offline) work?**
5. **What is a pub/sub backplane and why is it needed for real-time systems?**

---

### Real-World Examples

| System | Real-Time Approach |
|--------|-------------------|
| **WhatsApp** | Custom WebSocket implementation, Erlang-based servers |
| **Slack** | WebSocket for real-time messages, presence via heartbeat |
| **Figma** | WebSocket + CRDT for collaborative editing |
| **Twitter/X** | WebSocket-based streaming API for real-time tweets |

---

### In Simple Words

- **Real-time** = data delivered within milliseconds — users see changes instantly
- **WebSocket** = persistent bidirectional connection — best for chat, gaming, live apps
- **SSE** = server pushes to client — simpler, good for notifications, feeds
- **Scaling WebSockets** needs sticky routing + pub/sub backplane (Redis/Kafka)
- **Presence** = knowing who's online — implemented via heartbeats with TTL in Redis
- **Pub/sub backplane** is the key to scaling — it relays messages between WebSocket servers
- Always handle **reconnection** gracefully — networks fail, clients move between servers
