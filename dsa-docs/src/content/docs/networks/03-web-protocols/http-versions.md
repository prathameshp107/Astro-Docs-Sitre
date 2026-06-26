---
title: "HTTP Versions"
description: "HTTP has evolved from simple text-based requests (1.1) to multiplexed streams (2) to UDP-based low-latency (3)."
sidebar:
  order: 2
---

## HTTP Versions

### 🤔 Why Versions Matter

HTTP has gone through three major versions. Each version made the web faster:

- **HTTP/1.1** (1997) — The classic, still everywhere
- **HTTP/2** (2015) — Faster with multiplexing
- **HTTP/3** (2022) — Even faster, uses UDP instead of TCP

Think of it like **ordering at a restaurant**:

| Version | Analogy |
|---------|---------|
| HTTP/1.1 | Order one dish at a time, wait for it, then order the next |
| HTTP/2 | Order everything at once, get everything at once |
| HTTP/3 | Order everything at once, get everything at once, and the kitchen is right next to you |

---

### 📋 Comparison Table

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---------|----------|--------|--------|
| **Transport** | TCP | TCP | **QUIC** (UDP-based) |
| **Connections** | Multiple (usually 6 per domain) | One connection (multiplexed) | One connection |
| **Multiplexing** | ❌ No (one request at a time) | ✅ Yes (multiple streams) | ✅ Yes |
| **Head-of-line blocking** | ❌ Yes (big problem) | Partial (TCP-level) | ✅ None |
| **Header compression** | ❌ No | ✅ Yes (HPACK) | ✅ Yes (QPACK) |
| **Connection setup** | TCP handshake + TLS | TCP handshake + TLS | **0-1 RTT** (faster!) |
| **Encryption** | Optional | Required (de facto) | Required |

---

### 🐢 HTTP/1.1 — The Workhorse

**How it works:**
- Each request needs a separate TCP connection
- Browsers open 6 connections per domain to load resources in parallel
- **Head-of-line blocking**: A slow response blocks everything behind it

```
Connection 1: GET /index.html ──────────────────► (waiting...)
Connection 2: GET /style.css ──► (done fast)
Connection 3: GET /script.js ──► (done fast)
```

> **Result:** If one request is slow, others on that connection wait. Browsers work around this with multiple connections.

---

### ⚡ HTTP/2 — The Speedup

**Key innovations:**
- **Single connection** with **multiple streams** (multiplexing)
- **Server push** — server sends resources before they're requested
- **Header compression** (HPACK) — reduces overhead

```
One connection, multiple streams:
┌─ Stream 1: GET /index.html ──────────────────────►
├─ Stream 2: GET /style.css ──► (done)
├─ Stream 3: GET /script.js ──► (done)
└─ Stream 4: GET /logo.png ───► (loading)
```

> **Result:** All resources load in parallel over one connection. No more head-of-line blocking at the HTTP level.

---

### 🚀 HTTP/3 — The Future

HTTP/3 uses **QUIC** (Quick UDP Internet Connections) instead of TCP:

**Why QUIC?**
- **Faster connection setup** — 0-RTT in many cases (vs 2+ round trips for TCP+TLS)
- **No head-of-line blocking** — if one packet is lost, only that stream is affected
- **Connection migration** — switch from WiFi to mobile data without dropping the connection
- Built-in **encryption** (TLS 1.3 is mandatory)

```
HTTP/1.1:  TCP handshake → TLS handshake → Send data = 3 round trips
HTTP/2:    TCP handshake → TLS handshake → Send data = 3 round trips
HTTP/3:    QUIC handshake (includes TLS) → Send data = 1 round trip
```

---

### In Simple Words

- **HTTP/1.1** — old but reliable, one request at a time, needs multiple connections
- **HTTP/2** — multiplexed streams over one connection, much faster
- **HTTP/3** — uses **QUIC** (based on UDP) for even lower latency
- Each version is **backward compatible** — servers and browsers negotiate the best version
- Most websites now support HTTP/2; HTTP/3 is growing quickly
