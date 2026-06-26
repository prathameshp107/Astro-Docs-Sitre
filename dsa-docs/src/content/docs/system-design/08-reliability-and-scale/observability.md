---
title: "Observability"
description: "Logging, metrics, and distributed tracing — understanding what's happening inside your system."
sidebar:
  order: 4
---

# Observability

> **Observability** is the ability to understand what's happening inside your system by looking at the outputs. It has three pillars: **logging, metrics, and tracing**.

---

## The Three Pillars

```mermaid
flowchart TB
    App["📱 Application"] --> Logs["📝 Logs<br/>Events (errors, info)"]
    App --> Metrics["📊 Metrics<br/>Counters, gauges, histograms"]
    App --> Traces["🔍 Traces<br/>Request spans across services"]

    Logs --> Dashboard["📈 Monitoring Dashboard<br/>(Grafana, Datadog)"]
    Metrics --> Dashboard
    Traces --> Dashboard
    Dashboard --> Alerts["🔔 Alerts<br/>(PagerDuty, Slack)"]

    style App fill:#7c3aed,color:#fff
    style Logs fill:#4f46e5,color:#fff
    style Metrics fill:#6366f1,color:#fff
    style Traces fill:#8b5cf6,color:#fff
    style Dashboard fill:#059669,color:#fff
    style Alerts fill:#dc2626,color:#fff
```

---

## Logging

| Log Level | When to Use |
|:---------:|-------------|
| **ERROR** | A failure that needs investigation (DB connection lost, payment failed) |
| **WARN** | Something unexpected but not critical (rate limit approaching, retry attempt) |
| **INFO** | Important events (user registered, order placed) |
| **DEBUG** | Detailed information for debugging (not in production) |

**Best practice:** Log in **structured format** (JSON), not plain text.

```json
{ "level": "ERROR", "service": "payment", "msg": "Payment declined",
  "userId": 123, "orderId": 456, "errorCode": "INSUFFICIENT_FUNDS",
  "traceId": "abc-123-def", "timestamp": "2024-01-15T10:30:00Z" }
```

---

## Metrics

| Metric Type | Example |
|-------------|---------|
| **Counter** | Total requests, total errors (only increases) |
| **Gauge** | Current CPU, memory usage, queue size (goes up and down) |
| **Histogram** | Request latency p50, p95, p99 |

**The "Four Golden Signals"** (Google SRE):
1. **Latency** — time to serve requests (p50, p95, p99)
2. **Traffic** — requests per second
3. **Errors** — rate of failed requests (explicit 5xx + implicit errors like wrong data)
4. **Saturation** — how "full" your system is (CPU, memory, queue depth)

---

## Distributed Tracing

A **trace** tracks a single request as it travels through multiple services:

```mermaid
sequenceDiagram
    participant Client as 📱 Client
    participant API as 🚪 API Gateway
    participant Auth as 🔐 Auth Service
    participant DB as 🗄️ Database

    Client->>API: POST /order (traceId: abc)
    API->>Auth: Validate token (span: auth)
    Auth-->>API: ✅ Valid
    API->>DB: Create order (span: db)
    DB-->>API: ✅ Order 123
    API-->>Client: ✅ 201 Created

    Note over Client,API: Trace = abc (spans: auth=15ms, db=45ms, total=80ms)
```

**Tools:** Jaeger, Zipkin, OpenTelemetry, AWS X-Ray

---

## What to Monitor

| Component | What to Watch | Why |
|-----------|---------------|-----|
| **API Gateway** | QPS, error rate, p99 latency | Is the system reachable? |
| **Application** | CPU, memory, GC pauses, thread count | Is the app healthy? |
| **Database** | Connection count, query latency, slow queries | Is the DB the bottleneck? |
| **Cache** | Hit rate, memory usage, evictions | Is caching working? |
| **Queue** | Queue depth, consumer lag | Are consumers keeping up? |

---

## Trade-offs

- Observability is **essential** but adds cost (storage for logs, overhead for tracing).
- Too little observability = blind debugging.
- Too much observability = alert fatigue, high storage costs.
- Start with **logs + the 4 golden signals**. Add tracing when you have microservices.

---

## In Simple Words

- Observability = seeing what's happening inside your system.
- Three pillars: logs (events), metrics (numbers), traces (request paths).
- Monitor the 4 golden signals: latency, traffic, errors, saturation.
