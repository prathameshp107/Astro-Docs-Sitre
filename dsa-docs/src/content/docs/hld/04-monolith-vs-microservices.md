---
title: "04 — Monolith vs Microservices"
description: "Comparing monolithic and microservices architecture — when to use each, trade-offs, and migration strategies."
sidebar:
  order: 4
---

## 04 — Monolith vs Microservices

**Architecture style** defines how your system is structured. The two most common styles are **monolithic** (single deployable unit) and **microservices** (independent services communicating over a network).

> **Analogy:** A monolith is a food truck — one kitchen, one menu, one line. Microservices are a food court — multiple specialized stalls, each with its own kitchen, but diners can mix and match.

---

### Problem Statement

Choosing the wrong architecture:
- Monolith that's too large → "big ball of mud," hard to maintain, slow deployments
- Microservices too early → distributed monolith, debugging nightmare, operational overhead
- Wrong service boundaries → chatty services, data inconsistency, complex transactions

---

### Architecture Comparison

```mermaid
flowchart TB
    subgraph Monolith["Monolithic Architecture"]
        App["Single Application"]
        UI["UI Layer"]
        Logic["Business Logic"]
        Data["Data Access"]
        DB1["Database"]
        UI --> Logic --> Data --> DB1
    end

    subgraph Microservices["Microservices Architecture"]
        GW["API Gateway"]
        S1["User Service"] --> DB2["Users DB"]
        S2["Order Service"] --> DB3["Orders DB"]
        S3["Payment Service"] --> DB4["Payments DB"]
        S4["Notification Service"]
        GW --> S1 & S2 & S3 & S4
        S2 --> S3
        S2 --> S4
    end

    style Monolith fill:#3b82f6,color:#fff
    style Microservices fill:#7c3aed,color:#fff
    style GW fill:#f59e0b,color:#fff
```

---

### Monolith — Pros & Cons

| Pros | Cons |
|------|------|
| Simple to develop and deploy | Becomes bloated over time |
| Single codebase, easy to navigate | Hard to understand for new devs |
| Low operational overhead | Any change requires full deploy |
| Easy testing (single process) | Can't scale components independently |
| Low latency (in-process calls) | Technology lock-in |
| Simple transaction management | Slows down large teams |

### Microservices — Pros & Cons

| Pros | Cons |
|------|------|
| Independent deployment per service | Complex networking & service discovery |
| Scale only what needs scaling | Distributed transaction complexity |
| Team autonomy (each team owns services) | Debugging across services is hard |
| Technology diversity (pick best tool) | Data consistency challenges |
| Fault isolation (one failure doesn't cascade) | Operational overhead (monitoring, logging) |
| Better for large, complex systems | Requires mature DevOps practices |

---

### When to Choose Which

```mermaid
flowchart TB
    Q{"How big is your<br/>team & codebase?"}
    Q -->|"Small team (<10)<br/>Simple app"| Mono["Start with Monolith<br/>Fast to build, easy to iterate"]
    Q -->|"Growing team<br/>Complex domain"| Split{"Clear service<br/>boundaries?"}
    Split -->|"Yes"| MS["Microservices<br/>Independent services"]
    Split -->|"No"| Modu["Modular Monolith<br/>Separate modules, single deploy"]

    Q2{"Need to scale<br/>components independently?"}
    Q2 -->|"No"| Mono
    Q2 -->|"Yes"| MS

    style Mono fill:#3b82f6,color:#fff
    style MS fill:#7c3aed,color:#fff
    style Modu fill:#059669,color:#fff
```

---

### Monolith to Microservices Migration

```mermaid
sequenceDiagram
    participant Mono as Monolith
    participant Team as Team
    participant S1 as Service 1
    participant S2 as Service 2
    participant S3 as Service 3

    Note over Mono: Step 1: Identify bounded contexts
    Team->>Mono: Extract payment module
    Mono-->>S1: New Payment Service
    Note over S1: Step 2: Strangler Fig pattern
    
    Team->>Mono: Extract user management
    Mono-->>S2: New User Service
    Note over S2: Step 3: Route traffic gradually
    
    Team->>Mono: Extract notification
    Mono-->>S3: New Notification Service
    Note over Mono: Step 4: Monolith shrinks
    
    Note over S1,S3: ✓ Complete: Monolith → Microservices
```

| Migration Step | Description |
|----------------|-------------|
| **1. Identify boundaries** | Find natural service boundaries (bounded contexts) |
| **2. Extract one service** | Start with the most independent module |
| **3. Strangler Fig pattern** | Route new traffic to service, keep old path |
| **4. Repeat** | Extract another service once the first is stable |
| **5. Retire monolith** | When all modules are services, decommission |

---

### Modular Monolith (Best of Both?)

A **modular monolith** keeps a single deployment unit but enforces **module boundaries** in code.

```mermaid
flowchart TB
    subgraph ModularMonolith["Modular Monolith"]
        Shared["Shared Kernel<br/>Common utilities"]
        Module1["📦 Orders Module<br/>Internal bounded context"]
        Module2["📦 Payments Module<br/>Internal bounded context"]
        Module3["📦 Users Module<br/>Internal bounded context"]
        
        Module1 -.->|Strict interface| Shared
        Module2 -.->|Strict interface| Shared
        Module3 -.->|Strict interface| Shared
    end

    DB_Single[("Single Database<br/>Separate schemas")]

    Module1 --> DB_Single
    Module2 --> DB_Single
    Module3 --> DB_Single

    style ModularMonolith fill:#7c3aed,color:#fff
    style Shared fill:#3b82f6,color:#fff
    style Module1 fill:#059669,color:#fff
    style Module2 fill:#f59e0b,color:#fff
    style Module3 fill:#ef4444,color:#fff
```

---

### Trade-offs

| Decision | Pros | Cons |
|----------|------|------|
| **Start monolithic** | Fast development, simple ops | Need to refactor later |
| **Start microservices** | Scales from day one | Slow initial development |
| **Modular monolith** | Clean boundaries, simple deploy | Easy to break module boundaries |
| **Service mesh** | Advanced traffic management | Operational complexity |
| **Event-driven services** | Loose coupling | Eventual consistency challenges |

---

### Scaling Strategies

| Architecture | Scaling Approach |
|-------------|------------------|
| **Monolith** | Clone entire app (horizontal) |
| **Microservices** | Scale individual services by demand |
| **Modular monolith** | Clone entire app, optimize hot modules |
| **Hybrid** | Keep monolith core, extract hot services |

---

### Interview Questions

1. **When would you choose a monolith over microservices?**
2. **How do you decide service boundaries for microservices?**
3. **What is the strangler fig pattern?**
4. **How do microservices handle distributed transactions?**
5. **What is a modular monolith and when would you use it?**

---

### Real-World Examples

| Company | Started As | Evolved To | Why |
|---------|-----------|------------|-----|
| **Amazon** | Monolith (1990s) | Microservices (2000s) | Scale, team autonomy |
| **Netflix** | Monolith (DVD delivery) | Microservices (streaming) | Independent scaling, fault isolation |
| **Shopify** | Monolith | Modular monolith | Balance of simplicity and scale |
| **Uber** | Monolith (one city) | Microservices (global) | Geographic scaling, team growth |

---

### In Simple Words

- **Monolith** = one big app — simple to start, harder as you grow
- **Microservices** = many small apps — complex initially but scales well
- **Start monolithic** until you clearly understand your service boundaries
- Use the **strangler fig pattern** to migrate — extract one service at a time
- A **modular monolith** is a great middle ground — module boundaries with single deployment
- Don't do microservices just because they're trendy — they come with real operational costs
