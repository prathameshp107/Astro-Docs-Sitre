---
title: "02. Production AI Architecture"
description: "Design production-ready AI architectures — from frontend to LLM, with monitoring, caching, and scaling."
sidebar:
  order: 2
---

## Introduction

> **A production AI architecture is a multi-layered system that connects user-facing applications to LLMs, with observability, caching, security, and reliability built into every layer.**

A prototype AI app might just be a single Python script calling an API. A production AI system requires dozens of interconnected services — API gateways, prompt routers, RAG pipelines, vector stores, caches, queues, observability platforms, and more.

```mermaid
flowchart TD
    subgraph FRONTEND["Frontend Layer"]
        WEB["Web App"]
        MOBILE["Mobile App"]
        API["External API"]
    end
    subgraph EDGE["Edge Layer"]
        CDN["CDN"]
        LB["Load Balancer"]
        WAF["WAF / DDoS Protection"]
    end
    subgraph GATEWAY["API Gateway Layer"]
        AUTH["Authentication"]
        RATE["Rate Limiting"]
        ROUTE["Request Routing"]
        CACHE["Response Cache"]
    end
    subgraph ORCH["Orchestration Layer"]
        PM["Prompt Manager"]
        RAG["RAG Pipeline"]
        AGENT["Agent System"]
        GUARD["Guardrails"]
    end
    subgraph LLM_LAYER["LLM Layer"]
        OPENAI["OpenAI GPT-4"]
        ANTHRO["Anthropic Claude"]
        AZURE["Azure OpenAI"]
        VERTEX["Vertex AI"]
        FALLBACK["Fallback Model"]
    end
    subgraph DATA["Data Layer"]
        VS["Vector Store\nPinecone/PgVector"]
        DOCS["Document Store\nS3/GCS"]
        DB["Database\nPostgreSQL"]
        CACHE_L["Cache\nRedis"]
    end
    subgraph OBS["Observability Layer"]
        TRACE["Tracing\nLangSmith/Phoenix"]
        LOGS["Logging\nDatadog/Grafana"]
        METRICS["Metrics\nPrometheus"]
        ALERTS["Alerting\nPagerDuty"]
    end
    
    FRONTEND --> EDGE
    EDGE --> GATEWAY
    GATEWAY --> ORCH
    ORCH --> LLM_LAYER
    ORCH --> DATA
    LLM_LAYER --> OBS
    ORCH --> OBS
    
    style FRONTEND fill:#f59e0b,color:#fff
    style EDGE fill:#ef4444,color:#fff
    style GATEWAY fill:#3b82f6,color:#fff
    style ORCH fill:#8b5cf6,color:#fff
    style LLM_LAYER fill:#22c55e,color:#fff
    style DATA fill:#6366f1,color:#fff
    style OBS fill:#ec4899,color:#fff
```

---

## The Problem: From Monolith to Distributed Architecture

### The Story

You start with a simple chatbot. A single Python script calls OpenAI, returns a response. It works for you and a few friends.

Then your company wants to deploy it to customers. Suddenly you need:
- **Authentication** — Only authorized users can access it
- **Rate limiting** — Prevent a single user from overwhelming the API
- **Caching** — Same questions get the same answers
- **RAG** — Answers should use company knowledge, not just the model's training
- **Monitoring** — Track latency, cost, and errors
- **Safety** — Filter toxic inputs and outputs
- **Scaling** — Handle thousands of concurrent users

Your single script becomes a distributed system. That's production AI architecture.

```mermaid
flowchart LR
    subgraph MONO["Monolith (Prototype)"]
        M1["Python Script"]
        M2["OpenAI SDK"]
        M1 --> M2
    end
    subgraph DIST["Distributed (Production)"]
        D1["Web App"]
        D2["API Gateway"]
        D3["Prompt Router"]
        D4["RAG Pipeline"]
        D5["Vector DB"]
        D6["LLM API"]
        D7["Observability"]
        D1 --> D2 --> D3 --> D4 --> D5
        D4 --> D6
        D4 --> D7
        D6 --> D7
    end
    MONO -->|"Needs to scale"| DIST
    style MONO fill:#ef4444,color:#fff
    style DIST fill:#22c55e,color:#fff
```

---

## Architecture Layers Explained

### 1. Frontend Layer

The user-facing entry point. Could be a web app, mobile app, Slack bot, or API integration.

| Component | Purpose | Technology |
|-----------|---------|-----------|
| Web App | Chat interface for users | React, Next.js, Vue |
| Mobile App | On-the-go access | Swift, Kotlin, React Native |
| API Client | Programmatic access | REST, GraphQL, WebSocket |
| Integration | Embedding in existing tools | Slack API, Zendesk, Intercom |

### 2. Edge Layer

Protects the system before requests reach your infrastructure.

```mermaid
flowchart TD
    USER["User Request"] --> CDN["CDN\nCloudflare/Akamai"]
    CDN --> WAF["WAF\nWeb Application Firewall"]
    WAF --> LB["Load Balancer\nNGINX / AWS ALB"]
    LB -->|"Route to healthy instance"| APP["Application"]
    
    style USER fill:#f59e0b,color:#fff
    style CDN fill:#3b82f6,color:#fff
    style WAF fill:#ef4444,color:#fff
    style LB fill:#22c55e,color:#fff
```

### 3. API Gateway Layer

The control point for all AI traffic.

```mermaid
flowchart TD
    REQ["Incoming Request"] --> AUTH{"Authenticated?"}
    AUTH -->|"No"| REJECT["401 Unauthorized"]
    AUTH -->|"Yes"| RATE{"Within Rate Limit?"}
    RATE -->|"No"| THROTTLE["429 Too Many Requests"]
    RATE -->|"Yes"| CACHE{"Cache Hit?"}
    CACHE -->|"Yes"| HIT["Return Cached Response"]
    CACHE -->|"No"| ROUTE["Route to Orchestration"]
    
    style REJECT fill:#ef4444,color:#fff
    style THROTTLE fill:#f59e0b,color:#fff
    style HIT fill:#22c55e,color:#fff
```

**Key responsibilities:**
- **Authentication** — Verify identity via API keys, JWT, or OAuth
- **Rate limiting** — Per-user, per-API-key, global limits
- **Request routing** — Route to different models or prompts based on request
- **Response caching** — Return cached responses for identical queries
- **Cost tracking** — Log token usage per request for billing

### 4. Orchestration Layer

The brain of the AI system. This is where prompts, RAG, agents, and guardrails live.

```mermaid
flowchart TD
    REQ["Request from Gateway"] --> CLASS{"Query Type?"}
    CLASS -->|"Simple FAQ"| SIMPLE["Direct Prompt\nSmall model\nLow cost"]
    CLASS -->|"Knowledge Question"| RAG["RAG Pipeline\nRetrieve + Generate"]
    CLASS -->|"Complex Task"| AGENT["Agent Loop\nPlan + Execute + Observe"]
    CLASS -->|"Classification"| CLASSIFIER["Classification Prompt\nStructured output"]
    
    RAG --> GUARD["Guardrails\nSafety check\nPII detection"]
    AGENT --> GUARD
    SIMPLE --> GUARD
    CLASSIFIER --> GUARD
    
    GUARD -->|"Pass"| LLM["Send to LLM Layer"]
    GUARD -->|"Block"| BLOCK["Return Error / Fallback"]
    
    style CLASS fill:#f59e0b,color:#fff
    style LLM fill:#22c55e,color:#fff
    style BLOCK fill:#ef4444,color:#fff
```

### 5. LLM Layer

The actual model serving. Production systems rarely use a single model.

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **Single provider** | All requests to one LLM | Simple apps, cost predictability |
| **Multi-provider** | Route to different providers | Resilience, best-priced routing |
| **Model routing** | Small/large model based on task complexity | Cost optimization |
| **Fallback chain** | Primary → Fallback1 → Fallback2 | High availability |
| **Ensemble** | Multiple models, vote on answer | Quality-critical applications |

```mermaid
flowchart LR
    REQ["Request"] --> DECIDE{"Task Complexity?"}
    DECIDE -->|"Simple"| SMALL["GPT-4o-mini\n$0.15/M tokens\n150ms latency"]
    DECIDE -->|"Complex"| LARGE["GPT-4o\n$2.50/M tokens\n800ms latency"]
    DECIDE -->|"Code"| CLAUDE["Claude Sonnet\n$3.00/M tokens\nCode specialist"]
    
    LARGE -->|"If unavailable"| FALLBACK["Claude Haiku\nFallback"]
    SMALL -->|"If unavailable"| FALLBACK
    
    style DECIDE fill:#f59e0b,color:#fff
    style SMALL fill:#22c55e,color:#fff
    style LARGE fill:#3b82f6,color:#fff
    style CLAUDE fill:#8b5cf6,color:#fff
    style FALLBACK fill:#ef4444,color:#fff
```

### 6. Data Layer

All persistent state for the AI system.

| Component | Purpose | Examples |
|-----------|---------|----------|
| **Vector Store** | Semantic search for RAG | Pinecone, Weaviate, PgVector |
| **Document Store** | Original source documents | S3, GCS, Azure Blob |
| **Database** | Application state, user data | PostgreSQL, MySQL |
| **Cache** | Low-latency response storage | Redis, Memcached |
| **Queue** | Async processing | RabbitMQ, SQS, Kafka |

### 7. Observability Layer

Monitoring everything that happens in the system.

```mermaid
flowchart LR
    subgraph SOURCES["Data Sources"]
        LLM["LLM Calls"]
        APP["Application Logs"]
        INFRA["Infrastructure"]
    end
    subgraph COLLECT["Collection"]
        OTEL["OpenTelemetry"]
        AGENTS["Agents/Exporters"]
    end
    subgraph STORE["Storage"]
        TRACES["Tracing Store"]
        METRICS_DB["Metrics DB"]
        LOGS_DB["Log Store"]
    end
    subgraph VIS["Visualization"]
        GRAFANA["Grafana"]
        DATADOG["Datadog"]
        LANG["LangSmith Dashboard"]
    end
    
    SOURCES --> COLLECT
    COLLECT --> STORE
    STORE --> VIS
    
    style SOURCES fill:#3b82f6,color:#fff
    style COLLECT fill:#8b5cf6,color:#fff
    style STORE fill:#6366f1,color:#fff
    style VIS fill:#22c55e,color:#fff
```

---

## Architectural Patterns

### Microservices Architecture

Each component (prompt router, RAG, agents, guardrails) is a separate service.

```mermaid
flowchart TD
    GW["API Gateway"] --> PR["Prompt Router Service"]
    GW --> AUTH_S["Auth Service"]
    GW --> RATE_S["Rate Limiter Service"]
    
    PR --> RAG_S["RAG Service"]
    PR --> AGENT_S["Agent Service"]
    PR --> DIRECT_S["Direct LLM Service"]
    
    RAG_S --> VS["Vector Store"]
    RAG_S --> LLM["LLM Provider"]
    AGENT_S --> LLM
    DIRECT_S --> LLM
    
    subgraph SHARED["Shared Infrastructure"]
        REDIS["Redis Cache"]
        QUEUE["Message Queue"]
        MONGO["MongoDB"]
    end
    
    RAG_S --> REDIS
    RAG_S --> QUEUE
    AGENT_S --> REDIS
    
    style GW fill:#f59e0b,color:#fff
    style PR fill:#3b82f6,color:#fff
    style SHARED fill:#6366f1,color:#fff
```

> **Pros:** Independent scaling, team autonomy, fault isolation
> **Cons:** Network latency, operational complexity, distributed debugging

### Queue-Based Architecture

For heavy workloads, requests go through a queue for async processing.

```mermaid
sequenceDiagram
    participant U as User
    participant GW as API Gateway
    participant Q as Queue
    participant W as Worker
    participant LLM as LLM API
    participant DB as Database
    
    U->>GW: Send Request
    GW->>Q: Enqueue Request
    GW->>U: Return Request ID
    
    Q->>W: Dequeue Request
    W->>LLM: Call LLM
    LLM->>W: Response
    W->>DB: Store Response
    W->>U: Webhook/Poll: Response Ready
    
    U->>DB: Poll for Result
    DB->>U: Return Response
```

### Streaming Architecture

For real-time responses, use streaming at every layer.

```mermaid
flowchart LR
    REQ["User Request"] --> GW["API Gateway\nStreaming Support"]
    GW --> RAG["RAG Pipeline\nStreaming retrieval"]
    RAG --> LLM["LLM\nStreaming tokens"]
    LLM --> GUARD["Guardrails\nStreaming check"]
    GUARD --> USER["User\nReal-time tokens"]
    
    style REQ fill:#f59e0b,color:#fff
    style USER fill:#22c55e,color:#fff
```

---

## Caching Strategy

```mermaid
flowchart TD
    REQ["Request"] --> L1{"L1 Cache\nExact match?"}
    L1 -->|"Hit"| L1_HIT["Return cached\n< 10ms"]
    L1 -->|"Miss"| L2{"L2 Cache\nSemantic match?"}
    L2 -->|"Hit"| L2_HIT["Return cached\n~50ms"]
    L2 -->|"Miss"| LLM["Query LLM\n~500ms-2s"]
    LLM --> STORE["Store in cache"]
    STORE --> RESP["Return response"]
    
    style L1_HIT fill:#22c55e,color:#fff
    style L2_HIT fill:#3b82f6,color:#fff
    style LLM fill:#f59e0b,color:#fff
```

| Cache Level | Store | TTL | Hit Rate | Latency Saved |
|------------|-------|-----|----------|---------------|
| **L1: Exact match** | Redis (key-value) | 24h | 20-30% | ~95% |
| **L2: Semantic match** | Vector DB | 1h | 10-20% | ~80% |
| **L3: Prompt cache** | LLM provider | 5min | Varies | Partial |

---

## Retry & Fallback Strategy

```mermaid
flowchart TD
    CALL["Call Primary LLM"] --> OK{"Success?"}
    OK -->|"Yes"| DONE["✅ Return Response"]
    OK -->|"No"| RETRY{"Retry eligible?\nRate limit / 5xx"}
    RETRY -->|"Yes"| WAIT["Wait\nExponential backoff"]
    WAIT --> CALL
    RETRY -->|"No"| FALLBACK{"Fallback model\navailable?"}
    FALLBACK -->|"Yes"| FB["Call Fallback LLM"]
    FB --> OK2{"Success?"}
    OK2 -->|"Yes"| DONE
    OK2 -->|"No"| ERROR["❌ Return Error to User"]
    FALLBACK -->|"No"| ERROR
    
    style DONE fill:#22c55e,color:#fff
    style ERROR fill:#ef4444,color:#fff
    style WAIT fill:#f59e0b,color:#fff
```

---

## Disaster Recovery

### Multi-Region Architecture

```mermaid
flowchart TD
    subgraph REGION1["Primary Region (US-East)"]
        GW1["API Gateway"]
        RAG1["RAG Service"]
        LLM1["LLM Provider"]
        DB1["Database Primary"]
    end
    subgraph REGION2["Secondary Region (US-West)"]
        GW2["API Gateway"]
        RAG2["RAG Service"]
        LLM2["LLM Provider"]
        DB2["Database Replica"]
    end
    subgraph DNS["Global DNS"]
        ROUTER["Route53 / Cloudflare\nHealth check + failover"]
    end
    
    USER["User"] --> ROUTER
    ROUTER -->|"Primary"| REGION1
    ROUTER -->|"Failover"| REGION2
    DB1 -->|"Async Replication"| DB2
    
    style REGION1 fill:#22c55e,color:#fff
    style REGION2 fill:#3b82f6,color:#fff
    style DNS fill:#f59e0b,color:#fff
```

---

## Production Checklist

### Architecture Readiness

- [ ] API Gateway with auth and rate limiting
- [ ] Multi-model routing with fallback
- [ ] RAG pipeline with vector store
- [ ] Response caching at multiple levels
- [ ] Streaming support for real-time responses
- [ ] Queue-based processing for heavy workloads
- [ ] Distributed tracing across all services
- [ ] Health checks and readiness probes

### Reliability

- [ ] Retry logic with exponential backoff
- [ ] Fallback models for every provider
- [ ] Circuit breakers for failing services
- [ ] Graceful degradation (degraded but working)
- [ ] Multi-region deployment
- [ ] Regular disaster recovery drills

---

## Best Practices

1. **Design for failure** — Every service should have a fallback. Assume LLM APIs will fail
2. **Decouple with queues** — Async processing prevents cascading failures
3. **Cache aggressively** — AI calls are expensive. Cache everything you can
4. **Stream responses** — Users preferea treaming over waiting for full response
5. **Monitor every layer** — Frontend metrics don't tell you about LLM latency
6. **Use circuit breakers** — Stop calling failing services before they cause cascading failures
7. **Version your models** — Never update a model in place. Always deploy with versioning

## Common Mistakes

| Mistake | Why It's Wrong |
|---------|---------------|
| Single model without fallback | One outage takes down the entire application |
| No caching | Every identical request calls the LLM, wasting money and latency |
| Monolithic architecture | Hard to scale individual components, single point of failure |
| No rate limiting | One user's abuse can exhaust your API quota and budget |
| Ignoring streaming | Users wait for full response instead of seeing real-time tokens |
| No circuit breakers | A slow LLM backs up requests across the entire system |

---

## Interview Questions

### Beginner

**Q: What are the main layers of a production AI architecture?**

> Seven layers: (1) Frontend, (2) Edge (CDN, WAF, Load Balancer), (3) API Gateway (Auth, Rate Limiting, Routing), (4) Orchestration (Prompt Manager, RAG, Agents, Guardrails), (5) LLM Layer (Primary + Fallback models), (6) Data Layer (Vector Store, Cache, Database), (7) Observability (Tracing, Logging, Metrics).

**Q: Why do production AI systems need an API Gateway?**

> An API Gateway provides authentication, rate limiting, request routing, caching, and logging — all before requests reach your AI services. Without it, every service would need to implement these capabilities independently, and you'd have no single control point for security and cost management.

### Intermediate

**Q: How would you design a caching strategy for an AI chatbot?**

> Three-tier caching: (1) **Exact match cache** — Redis keyed by (user_id + prompt_hash), 24h TTL. Returns cached response instantly. (2) **Semantic cache** — Vector DB storing query embeddings + responses. New query finds similar query, returns cached response. ~80% latency savings on similar queries. (3) **LLM prompt caching** — Provider-side cache for system prompts. Saves on input tokens for repeated system prompts.

**Q: What's the difference between model routing and a fallback model?**

> **Model routing** is proactive — you choose the best model for each request based on complexity, cost, and latency requirements. **Fallback model** is reactive — when the primary model fails (error, timeout), you retry with a different model. A complete strategy uses both: route intelligently, fallback gracefully.

### Senior

**Q: Design a multi-region architecture for an AI application that must maintain 99.99% uptime.**

> Architecture: (1) **Global DNS** — Route53 with health checks routing traffic to healthy regions, (2) **Primary region** — Full deployment (API Gateway → Orchestration → LLM) with active traffic, (3) **Secondary region** — Same deployment ready to take traffic, (4) **Database** — Active-passive with async replication, (5) **LLM failover** — Each region hasits own API keys, plus cross-region fallback, (6) **Cache warming** — Primary region warms secondary cache for common queries, (7) **Failover testing** — Monthly drills where primary region is deliberately taken down.

**Q: How would you handle LLM API rate limits in a high-throughput production system?**

> Strategies: (1) **Request queue** — Buffer requests when approaching limits, (2) **Token bucket** — Smooth request rate over time, (3) **Multi-key rotation** — Distribute requests across multiple API keys, (4) **Multi-provider routing** — Route some traffic to alternative providers, (5) **Request prioritization** — Critical requests get priority access to remaining quota, (6) **Semideferral** — Non-urgent requests wait until quota refreshes, (7) **Monitoring** — Real-time dashboard of remaining quota with alerts.

### Staff Engineer

**Q: Compare event-driven vs request-driven architecture for an AI agent system.**

> **Request-driven** — User sends request, agent processes synchronously, returns response. Simpler to build and debug. Works for simple agents (< 5 steps). But blocks users, doesn't scale for long-running agents. **Event-driven** — User sends request, agent workflow is event-driven: each step produces events that trigger the next step. Scales to complex multi-step agents. Better for long-running workflows. But harder to debug, requires event sourcing. **Recommendation**: Use request-driven for simple agents (chatbots, Q&A). Use event-driven for complex agents (research, multi-step planning).

### System Design

**Q: Design a system that routes user queries to different LLMs based on task complexity, cost, and latency requirements.**

> Components: (1) **Classifier** — Fast, cheap model (GPT-4o-mini) classifies query into Simple/Medium/Complex, (2) **Router** — Maps classifications to model endpoints, (3) **Small model pool** — Multiple cheap model instances (throughput-optimized), (4) **Large model pool** — Multiple powerful model instances (quality-optimized), (5) **Fallback pool** — Alternative providers, (6) **Monitoring** — Tracks routing decisions, latencies, costs, (7) **Adaptive routing** — If large model pool is overloaded, route complex queries to fallback pool with priority flag.

> Decision logic: Simple (≤ 5 tokens output, factual) → GPT-4o-mini (< 200ms). Medium (needs some reasoning) → Claude Haiku (< 500ms). Complex (multi-step reasoning, code) → GPT-4o or Claude Sonnet (< 2s). Critical (customer-facing, needs maximum quality) → GPT-4o with backup.

---

## Summary

| Layer | Purpose | Key Components |
|-------|---------|---------------|
| **Frontend** | User interface | Web, Mobile, API, Integrations |
| **Edge** | First line of defense | CDN, WAF, Load Balancer |
| **API Gateway** | Traffic control | Auth, Rate Limiting, Caching, Routing |
| **Orchestration** | AI logic | Prompt Manager, RAG Pipeline, Agents, Guardrails |
| **LLM** | Model inference | Primary, Fallback, Multi-provider |
| **Data** | State & storage | Vector Store, Database, Cache, Queue |
| **Observability** | Monitoring | Tracing, Logging, Metrics, Alerting |

---

## Navigation

**Previous:** [01 — Introduction to LLMOps](/ai/phase-09-production-ai/01-introduction-to-llmops)

**Next:** [03 — Prompt Management](/ai/phase-09-production-ai/03-prompt-management)

**Related Topics:**
- [LLMOps Introduction](/ai/phase-09-production-ai/01-introduction-to-llmops)
- [Deployment & Scaling](/ai/phase-09-production-ai/09-deployment-and-scaling)
- [Performance & Cost Optimization](/ai/phase-09-production-ai/08-performance-and-cost-optimization)
