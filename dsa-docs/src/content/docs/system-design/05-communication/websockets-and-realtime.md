---
title: "WebSockets & Real-Time Communication"
description: "Polling, long-polling, Server-Sent Events, and WebSockets — comparing real-time data delivery methods."
sidebar:
  order: 3
---

# WebSockets & Real-Time Communication

> Real-time communication means the server pushes data to the client **without the client asking** — like chat messages, live scores, or notifications.

---

## The Options

```mermaid
flowchart TB
    RT["Need real-time updates?"] --> O{"How fast?"}
    O -->|"Every 5-60s is fine"| Poll["Polling<br/>Client asks every N seconds"]
    O -->|"Need low latency"| LP["Long Polling<br/>Server holds request open"]
    O -->|"Server→Client only"| SSE["SSE (EventSource)<br/>Server pushes to client"]
    O -->|"Bidirectional"| WS["WebSocket<br/>Full duplex"]

    style Poll fill:#7c3aed,color:#fff
    style LP fill:#4f46e5,color:#fff
    style SSE fill:#6366f1,color:#fff
    style WS fill:#059669,color:#fff
```

---

## Comparison

| Method | Direction | Latency | HTTP? | Complexity | Browser Support |
|--------|:---------:|:-------:|:-----:|:----------:|:---------------:|
| **Polling** | Client → Server | Seconds | ✅ Yes | Low | ✅ Universal |
| **Long Polling** | Client → Server → Client | ~100ms | ✅ Yes | Medium | ✅ Universal |
| **SSE** | Server → Client only | ~10ms | ✅ Yes | Low | Modern browsers |
| **WebSocket** | Bidirectional | ~10ms | Starts as HTTP, then upgrades | Medium-High | Modern browsers |

---

## WebSocket Handshake

```mermaid
sequenceDiagram
    participant Client as 📱 Browser
    participant Server as 🖥️ Server

    Client->>Server: HTTP GET /ws (Upgrade: websocket)
    Server->>Client: 101 Switching Protocols
    Note over Client,Server: Connection upgraded to WebSocket
    Client->>Server: Send message (chat)
    Server->>Client: Push message (notification)
    Server->>Client: Push message (message from another user)
    Note over Client,Server: Bidirectional, low latency
```

---

## When to Use Each

| Scenario | Best Choice |
|----------|-------------|
| Dashboard polling every 30 seconds | **Polling** — simple, good enough |
| Real-time stock ticker | **WebSocket** — low latency, constant stream |
| Live sports scores (on mobile) | **SSE** — server pushes, no upload needed |
| Collaborative editing (Google Docs) | **WebSocket** — bidirectional, low latency |
| Notification badge count | **Long polling** — faster than polling, simpler than WS |

---

## Trade-offs

- **Polling** is simple but wasteful — many requests return no data.
- **WebSockets** are efficient but need persistent connections (more server resources).
- **SSE** is simpler than WebSockets but only works one direction (server → client).
- For most systems: use **polling** for non-critical updates, **WebSockets** for real-time features.

---

## In Simple Words

- Polling = client keeps asking "got anything new?" every N seconds.
- WebSocket = permanent open connection. Both sides can send data anytime.
- SSE = server pushes to client only (like live scores, news ticker).
- WebSocket is the gold standard for real-time chat, gaming, and live updates.
