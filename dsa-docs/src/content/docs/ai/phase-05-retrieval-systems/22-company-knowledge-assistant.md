---
title: "22. Project 2 — Company Knowledge Assistant"
description: "Build an enterprise AI assistant that answers questions across company policies, wikis, HR documents, engineering docs, and internal knowledge bases with RBAC, multi-tenancy, and security."
sidebar:
  order: 22
---

## Introduction

> **Build an enterprise AI knowledge assistant — the same architecture used by Notion AI, Slack AI, Microsoft Copilot, and Atlassian Intelligence.**

Your ChatPDF project from Project 1 worked for individual documents. Now scale that to an entire organization. A Company Knowledge Assistant ingests documents from multiple sources (Confluence, SharePoint, Notion, wikis, HR docs, engineering docs) and makes them searchable with proper access controls.

```mermaid
flowchart TD
    subgraph SOURCES["Document Sources"]
        CONFL["📄 Confluence"]
        SHARE["📁 SharePoint"]
        NOTION["📝 Notion"]
        WIKI["🌐 Internal Wiki"]
        HR["👤 HR Documents"]
        ENG["💻 Engineering Docs"]
    end

    subgraph INGESTION["Ingestion Pipeline"]
        CONN["Connectors"]
        SYNC["Sync Service"]
        INDEX["Index Builder"]
    end

    subgraph STORAGE["Storage"]
        VDB[("Vector DB")]
        META[("Metadata Store")]
    end

    subgraph QUERY["Query Layer"]
        AUTH["Auth + RBAC"]
        FILTER["Metadata Filter"]
        RET["Retriever"]
        RERANK["Re-ranker"]
    end

    subgraph AI["AI Layer"]
        LLM["LLM"]
    end

    SOURCES --> INGESTION --> STORAGE
    QUERY --> STORAGE
    AUTH --> FILTER --> RET --> RERANK --> LLM

    style SOURCES fill:#3b82f6,color:#fff
    style INGESTION fill:#8b5cf6,color:#fff
    style STORAGE fill:#f59e0b,color:#fff
    style QUERY fill:#22c55e,color:#fff
    style AI fill:#ef4444,color:#fff
```

---

## Problem Statement

**The Problem:** Enterprise knowledge is scattered across dozens of tools — Confluence for documentation, SharePoint for policies, Notion for team wikis, HR systems for employee handbooks, GitHub for engineering docs. Employees waste 20-30% of their time searching for information they know exists somewhere.

**The Solution:** A unified knowledge assistant that:
1. Connects to all internal knowledge sources
2. Synchronizes documents and maintains freshness
3. Enforces access controls so users only see what they're authorized to see
4. Answers natural language questions with citations

**Real-World Use Cases:**
- **New employees** — "What's the company policy on remote work?" → searches HR docs
- **Engineers** — "How do I set up the local development environment?" → searches engineering wiki
- **Managers** — "What's the process for quarterly reviews?" → searches HR policies
- **Sales** — "What's our pricing for enterprise customers?" → searches sales enablement docs

---

## System Architecture

```mermaid
flowchart LR
    subgraph SOURCES["Document Sources"]
        A["Confluence"]
        B["SharePoint"]
        C["Notion"]
        D["Internal Wiki"]
        E["HR System"]
    end

    subgraph CONNECTORS["Connector Layer"]
        CA["Confluence\nConnector"]
        CB["SharePoint\nConnector"]
        CC["Notion\nConnector"]
        CD["Wiki\nConnector"]
        CE["HR\nConnector"]
    end

    subgraph CORE["Core Services"]
        SYNC["🔄 Sync Engine"]
        DEDUP["🧹 Deduplication"]
        VER["📌 Version Tracking"]
    end

    subgraph STORAGE["Storage"]
        VDB[("Vector DB")]
        MDB[("PostgreSQL")]
        CACHE[("Redis")]
    end

    subgraph API["API Layer"]
        AUTH["Auth Service"]
        QUERY["Query Service"]
        ADMIN["Admin Console"]
    end

    A --> CA
    B --> CB
    C --> CC
    D --> CD
    E --> CE

    CA --> SYNC
    CB --> SYNC
    CC --> SYNC
    CD --> SYNC
    CE --> SYNC

    SYNC --> DEDUP --> VER --> STORAGE
    CORE -.-> STORAGE
    STORAGE -.-> API

    style SOURCES fill:#3b82f6,color:#fff
    style CONNECTORS fill:#8b5cf6,color:#fff
    style CORE fill:#f59e0b,color:#fff
    style STORAGE fill:#22c55e,color:#fff
    style API fill:#ef4444,color:#fff
```

---

## Access Control & Metadata Security

This is the most critical part of an enterprise knowledge assistant. Every document has metadata that determines who can see it.

### Metadata Schema

```json
{
  "document_id": "doc_12345",
  "title": "Remote Work Policy 2025",
  "source": "confluence",
  "source_url": "https://company.atlassian.net/wiki/...",
  "department": "hr",
  "owner": "hr-team",
  "visibility": "all_employees",
  "roles": ["employee", "manager", "admin"],
  "regions": ["us", "eu"],
  "confidentiality": "internal",
  "version": 3,
  "last_synced": "2025-06-15T10:30:00Z"
}
```

### Access Control Architecture

```mermaid
sequenceDiagram
    participant User
    participant Auth as Auth Service
    participant Filter as Metadata Filter
    participant Retriever as Retriever
    participant VDB as Vector DB
    participant LLM

    User->>Auth: "What's the remote work policy?"
    Auth->>Auth: Verify JWT + extract user claims
    Auth-->>User: { user_id, roles, department, region }
    
    User->>Filter: Query + User Claims
    Filter->>Filter: Build metadata filter
    
    Note over Filter: WHERE department IN ('hr', 'engineering')<br/>AND visibility = 'all_employees'<br/>AND region IN ('us', 'eu')
    
    Filter->>Retriever: Query + Metadata Filter
    Retriever->>VDB: ANN search with pre-filtering
    VDB-->>Retriever: 20 authorized chunks
    Retriever-->>Filter: Filtered results
    
    Filter->>Filter: Verify each result against user claims
    Filter-->>User: 5 authorized chunks
    
    User->>LLM: Generate answer with authorized context
    LLM-->>User: Answer with citations
```

### Pre-Filtering vs Post-Filtering

| Approach | How It Works | Pros | Cons |
|----------|-------------|------|------|
| **Pre-filtering** | Filter metadata before vector search | Fast, efficient, scales well | Requires metadata index |
| **Post-filtering** | Search all, filter results after | Simpler to implement | Wasted search on unauthorized docs |

> **Enterprise recommendation:** Use pre-filtering for RBAC-based access (department, role) and post-filtering for per-document permissions. Most vector databases support pre-filtering natively.

---

## Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React + Tailwind + Slack/Teams integration | Multi-surface deployment |
| **Backend** | FastAPI or Node.js | Async, high throughput |
| **Connectors** | Custom + Unstructured.io | Handles 20+ document formats |
| **Sync Engine** | Celery / BullMQ | Scheduled + webhook-based sync |
| **Auth** | Auth0 / Okta + JWT | Enterprise SSO, SCIM |
| **Vector DB** | Qdrant with payload indexing | Built-in metadata filtering |
| **PostgreSQL** | Document metadata + user permissions | ACID compliance |
| **Cache** | Redis | Session cache, embedding cache |
| **LLM** | GPT-4o / Claude 3 | High-quality answers |
| **Monitoring** | Grafana + Prometheus | Observability |

---

## Data Flow: Sync & Ingestion

```mermaid
flowchart LR
    subgraph SCHEDULE["Scheduled Sync"]
        PERIODIC["⏰ Every 6 hours"]
        WEBHOOK["🔔 On Change Webhook"]
        MANUAL["👤 Admin Triggered"]
    end

    subgraph PROCESS["Sync Process"]
        FETCH["Fetch Changed Docs"]
        DIFF["Diff Against Cache"]
        UPDATE["Update Changed"]
        DELETE["Remove Deleted"]
        NEW["Index New Docs"]
    end

    subgraph ACTIONS["Actions"]
        UPSERT["Upsert to Vector DB"]
        META_UPDATE["Update Metadata DB"]
        INVALIDATE["Invalidate Cache"]
        LOG["Log Changes"]
    end

    SCHEDULE --> FETCH
    FETCH --> DIFF
    DIFF --> UPDATE
    DIFF --> DELETE
    DIFF --> NEW
    UPDATE --> ACTIONS
    DELETE --> ACTIONS
    NEW --> ACTIONS

    style SCHEDULE fill:#3b82f6,color:#fff
    style PROCESS fill:#f59e0b,color:#fff
    style ACTIONS fill:#22c55e,color:#fff
```

---

## Security Architecture

```mermaid
flowchart TD
    subgraph OUTER["Perimeter"]
        WAF["Web Application Firewall"]
        DDOS["DDoS Protection"]
    end

    subgraph AUTH_L["Authentication Layer"]
        SSO["SSO / SAML / OIDC"]
        MFA["Multi-Factor Auth"]
        SCIM["SCIM Provisioning"]
    end

    subgraph AUTHZ["Authorization Layer"]
        RBAC["Role-Based Access"]
        ABAC["Attribute-Based Access"]
        POLICIES["Policy Engine"]
    end

    subgraph DATA["Data Protection"]
        ENC_REST["Encryption at Rest (AES-256)"]
        ENC_TRANSIT["Encryption in Transit (TLS 1.3)"]
        PII["PII Masking"]
        AUDIT["Audit Logging"]
    end

    subgraph COMPLIANCE["Compliance"]
        GDPR["GDPR"]
        HIPAA["HIPAA"]
        SOC2["SOC 2"]
    end

    OUTER --> AUTH_L --> AUTHZ --> DATA
    DATA --> COMPLIANCE

    style OUTER fill:#ef4444,color:#fff
    style AUTH_L fill:#f59e0b,color:#fff
    style AUTHZ fill:#8b5cf6,color:#fff
    style DATA fill:#3b82f6,color:#fff
    style COMPLIANCE fill:#22c55e,color:#fff
```

---

## Deployment

| Component | Scaling Strategy | Min Instances | Max Instances |
|-----------|-----------------|---------------|---------------|
| **API Server** | Horizontal (CPU) | 2 | 20 |
| **Sync Workers** | Horizontal (queue depth) | 2 | 50 |
| **Vector DB** | Sharded by tenant | 3 nodes | 20 nodes |
| **PostgreSQL** | Read replicas | 1 primary + 2 replicas | 1 + 10 replicas |
| **Redis** | Cluster mode | 3 nodes | 10 nodes |
| **LLM** | API-based, no GPU needed | N/A | N/A |

---

## Best Practices

1. **Sync incrementally** — Never re-index everything. Use change detection (webhooks or periodic diff) to sync only changed documents.
2. **Version your indexes** — When a document is updated, keep the old version for a rollback window (usually 7 days).
3. **Implement rate limits per source** — Confluence API limits: 100 req/min. Respect source API limits or you'll get blocked.
4. **Use tenant isolation** — For multi-company deployments, use separate vector DB collections or metadata-based isolation.
5. **Audit everything** — Every query, every access, every document view should be logged with user ID, timestamp, and action.
6. **Provide confidence scores** — Users should know when the AI is confident vs unsure. Show retrieval scores alongside answers.

---

## Common Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| **No deduplication** | Same content from Confluence + Notion → duplicate chunks | Hash-based dedup on content |
| **Ignoring permissions** | Users see unauthorized documents | Always enforce metadata filtering |
| **No stale document handling** | Outdated policies referenced | Track last-synced, flag old docs |
| **Over-syncing** | API rate limits exceeded, connector banned | Respect rate limits, backoff on errors |
| **No PII protection** | Employee SSNs in HR docs leaked | PII scanning before indexing |

---

## Exercises

### Easy

1. Set up a connector that pulls documents from a Notion workspace via API
2. Create a metadata schema for documents with department, role, and region fields
3. Implement a pre-filtering query using Qdrant's payload filter

### Intermediate

4. Build a sync engine that polls Confluence every 6 hours and updates changed documents
5. Implement RBAC where users with role "manager" see manager-level documents
6. Create an audit log that records every query with user ID and timestamp

### Advanced

7. Build a multi-tenant version where Company A and Company B have completely isolated document stores
8. Implement incremental sync with diff detection (only re-embed changed documents)
9. Create an admin dashboard showing sync status, document counts, and query metrics

### Architecture

10. Design a connector for a new internal tool (e.g., Google Docs) — what API endpoints, sync strategy, and metadata mapping would you use?
11. Design a document versioning system that supports rollback to previous versions

---

## Interview Questions

### System Design

**Q: Design an enterprise knowledge assistant for a 5000-employee company with 10+ knowledge sources.**

> **Architecture:** Connector layer (10+ source-specific adapters) → Ingestion pipeline (async with queue) → Unified storage (Vector DB + PostgreSQL for metadata) → Query pipeline with auth pre-filtering. **Scaling:** 50k docs → 500k chunks → 50M queries/month. Cost: $3k-10k/mo. **Key challenge:** Permissions. Each source has different access models. Map all to a unified RBAC+ABAC system using metadata filtering.

### Architecture

**Q: Why use metadata pre-filtering instead of post-filtering for enterprise RAG?**

> Pre-filtering reduces the search space before the ANN search, making it faster (O(log n) instead of O(n)). More importantly, post-filtering can return 0 results if the top-k vectors are all unauthorized — the user gets no answer despite relevant documents existing. Pre-filtering guarantees that all search results are authorized, so the user always sees the best available answer they're allowed to see.

### Senior Engineer

**Q: How do you handle document conflicts when the same topic is covered in Confluence, Notion, and an internal wiki with slightly different information?**

> Implement a **source priority system**: each source has a trust score (e.g., HR system > Confluence > Wiki > Notion). When retrieving, deduplicate chunks by content hash (cosine similarity > 0.95) and keep the highest-priority source. Also track source staleness — if Confluence doc was updated 2 days ago and wiki doc 6 months ago, prefer the fresher source.

### Staff Engineer

**Q: Design a system to handle 200 simultaneous document uploads from different sources without overwhelming the vector database.**

> Use a **message queue** (RabbitMQ/SQS) as a buffer. The sync workers produce messages; the ingestion workers consume them. Implement backpressure: if the queue grows beyond 10k messages, ingestion workers increase by 2x; if it's below 100, decrease by half. Batch vector DB writes (upsert 100 chunks at once). Use a circuit breaker for the vector DB — if it returns errors, pause all ingestion for 30s and retry.

### Principal Engineer

**Q: How do you evaluate search quality in an enterprise context where you don't have ground-truth labels?**

> Use **implicit feedback signals**: (1) Click-through rate on citations — do users click on the cited documents? (2) Follow-up question rate — do users ask clarifying questions? (3) Answer rating — thumbs up/down on each answer (requires UI). Use these to compute an automated quality score per document source, per department, per query type. Source quality declining? Alert the connector maintainer. Use **LLM-as-judge** with GPT-4o evaluating system answers for faithfulness, relevance, and completeness against the retrieved chunks.

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Multiple sources** | Connector pattern — one adapter per source with unified output format |
| **Access control** | Pre-filter metadata by role/department BEFORE vector search |
| **Sync strategy** | Incremental sync with change detection, never full re-index |
| **Permissions** | Map each source's permission model to a unified RBAC/ABAC system |
| **Audit** | Every query logged with user, timestamp, and retrieved documents |
| **Multi-tenancy** | Use metadata-based isolation or separate collections per tenant |

---

## Navigation

**Previous:** [21 — Chat with PDF](/ai/phase-05-retrieval-systems/21-chat-with-pdf)

**Next:** [23 — Documentation Chatbot](/ai/phase-05-retrieval-systems/23-documentation-chatbot)
