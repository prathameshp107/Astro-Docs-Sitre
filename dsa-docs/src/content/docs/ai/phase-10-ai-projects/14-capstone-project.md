---
title: "14. Capstone Project — Enterprise AI Platform"
description: "The capstone project — build a complete enterprise AI SaaS platform combining RAG, agents, MCP, monitoring, evaluation, and deployment."
sidebar:
  order: 14
---

## Introduction

> **The capstone project: Build a complete enterprise AI SaaS platform from scratch — combining every skill learned across all 10 phases of the curriculum.**

This is the final, comprehensive project that ties together everything: RAG, AI agents, Model Context Protocol, streaming, monitoring, evaluation, security, deployment, and CI/CD. By the end, you'll have a production-ready enterprise AI platform you can showcase.

---

## Problem Statement

Enterprises need a unified AI platform that:
- Integrates with their existing data sources (documents, databases, APIs)
- Provides secure, governed access to AI capabilities
- Supports multiple AI use cases (chat, RAG, agents, search)
- Includes monitoring, evaluation, and cost tracking
- Deploys on their infrastructure with enterprise security

### Business Use Case

A Fortune 500 company needs an enterprise AI platform that 5000 employees will use daily for:
- Internal knowledge base Q&A
- Document analysis and summarization
- Automated workflows and data extraction
- Secure, compliant AI access with audit trails

---

## System Requirements

### Functional Requirements

| # | Feature | Description |
|---|---------|-------------|
| FR1 | Multi-tenant auth | SSO, RBAC, API key management |
| FR2 | Document ingestion | PDF, DOCX, web pages, databases |
| FR3 | RAG pipeline | Multi-source retrieval with re-ranking |
| FR4 | AI agents | Custom agents with tool integration |
| FR5 | MCP support | Model Context Protocol server/client |
| FR6 | Chat interface | Streaming, history, model selection |
| FR7 | Admin dashboard | Usage analytics, cost tracking |
| FR8 | Evaluation | LLM-as-a-Judge, human review |
| FR9 | Monitoring | Tracing, logging, alerting |
| FR10 | CI/CD | Automated testing, eval gates, deployment |

### Non-Functional Requirements

| # | Requirement | Target |
|---|-------------|--------|
| NFR1 | Availability | 99.95% |
| NFR2 | Latency P95 | < 3s |
| NFR3 | Scalability | 10K concurrent users |
| NFR4 | Security | SOC2, GDPR compliant |
| NFR5 | Multi-tenancy | 100+ tenants isolated |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js + Tailwind + Shadcn | Dashboard + Chat UI |
| **Backend** | FastAPI (Python) + Node.js | API, streaming, agents |
| **Database** | PostgreSQL + pgvector | Data + embeddings |
| **Cache** | Redis | Session, rate limiting |
| **Vector DB** | Qdrant (self-hosted) | RAG retrieval |
| **AI** | OpenAI + Anthropic + Gemini | Multi-provider |
| **Agent** | LangGraph | Agent orchestration |
| **MCP** | Custom MCP server | Tool integration |
| **Queue** | Celery + Redis | Async processing |
| **Monitoring** | Prometheus + Grafana + Loki | Observability |
| **Evaluation** | LangFuse / Custom | Quality tracking |
| **CI/CD** | GitHub Actions + ArgoCD | Deployment pipeline |
| **Infrastructure** | Terraform + Kubernetes + AWS | Cloud infra |

---

## Architecture

```mermaid
flowchart TD
    subgraph FRONTEND["Frontend Layer"]
        WEB["Web App\nNext.js + Tailwind"]
        ADMIN["Admin Dashboard\nUsage + Analytics"]
    end
    subgraph API["API Gateway"]
        GW["API Gateway\nKong / Envoy"]
        AUTH["Auth Service\nSSO + RBAC"]
        RATE["Rate Limiter\nPer-tenant"]
    end
    subgraph CORE["Core Services"]
        CHAT["Chat Service\nStreaming + History"]
        RAG["RAG Service\nMulti-source retrieval"]
        AGENT["Agent Service\nLangGraph workflows"]
        MCP_SVR["MCP Server\nTool integration"]
        FILE["File Service\nUpload + Processing"]
    end
    subgraph AI["AI Layer"]
        LLM_GW["LLM Gateway\nProvider routing"]
        EMBED["Embedding Service"]
        EVAL["Evaluation Service\nQuality scoring"]
    end
    subgraph DATA["Data Layer"]
        PG["PostgreSQL\n+ pgvector"]
        QDRANT["Qdrant\nVector store"]
        REDIS["Redis\nCache"]
        S3["Object Store"]
    end
    subgraph OPS["Operations"]
        PROM["Prometheus\nMetrics"]
        GRAFANA["Grafana\nDashboards"]
        LOKI["Loki\nLogs"]
        TEMPO["Tempo\nTraces"]
        ALERT["AlertManager"]
    end
    
    WEB --> GW
    ADMIN --> GW
    GW --> AUTH
    GW --> RATE
    GW --> CORE
    CORE --> AI
    CORE --> DATA
    CORE --> OPS
    
    style FRONTEND fill:#3b82f6,color:#fff
    style API fill:#ef4444,color:#fff
    style CORE fill:#8b5cf6,color:#fff
    style AI fill:#22c55e,color:#fff
    style DATA fill:#f59e0b,color:#fff
    style OPS fill:#6366f1,color:#fff
```

---

## Folder Structure

```
enterprise-ai-platform/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── chat/
│   │   ├── admin/
│   │   └── evaluation/
│   ├── components/
│   └── lib/
├── backend/
│   ├── api/
│   ├── services/
│   │   ├── chat/
│   │   ├── rag/
│   │   ├── agents/
│   │   ├── mcp/
│   │   └── evaluation/
│   ├── models/
│   └── core/
│       ├── auth.py
│       ├── config.py
│       └── observability.py
├── ai/
│   ├── prompts/
│   ├── agents/
│   │   ├── research_agent/
│   │   └── support_agent/
│   ├── mcp/
│   │   ├── servers/
│   │   └── tools/
│   └── evaluation/
│       ├── golden_datasets/
│       └── evaluators/
├── infrastructure/
│   ├── terraform/
│   ├── k8s/
│   └── monitoring/
│       ├── prometheus/
│       ├── grafana/
│       └── loki/
├── deployment/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── ci/
└── docs/
    ├── architecture.md
    ├── api.md
    └── security.md
```

---

## Implementation Phases

```mermaid
flowchart TD
    subgraph PHASE1["Phase 1: Foundation (Week 1-2)"]
        P1A["Setup project structure"]
        P1B["Authentication + multi-tenancy"]
        P1C["Basic chat API with streaming"]
        P1D["Database schema + migrations"]
    end
    subgraph PHASE2["Phase 2: RAG (Week 3-4)"]
        P2A["Document ingestion pipeline"]
        P2B["Vector store + embeddings"]
        P2C["RAG retrieval + re-ranking"]
        P2D["Q&A with citations"]
    end
    subgraph PHASE3["Phase 3: Agents (Week 5-6)"]
        P3A["LangGraph agent framework"]
        P3B["Tool definitions + execution"]
        P3C["MCP server implementation"]
        P3D["Multi-agent coordination"]
    end
    subgraph PHASE4["Phase 4: Operations (Week 7-8)"]
        P4A["Monitoring + tracing"]
        P4B["Evaluation pipeline"]
        P4C["Admin dashboard"]
        P4D["CI/CD + deployment"]
    end
    
    PHASE1 --> PHASE2 --> PHASE3 --> PHASE4
    
    style PHASE1 fill:#3b82f6,color:#fff
    style PHASE2 fill:#22c55e,color:#fff
    style PHASE3 fill:#f59e0b,color:#fff
    style PHASE4 fill:#8b5cf6,color:#fff
```

---

## Multi-Tenant Architecture

```mermaid
flowchart TD
    subgraph TENANT_A["Tenant A"]
        DB_A["Database\nTenant A schema"]
        VS_A["Vector Store\nTenant A index"]
        CONFIG_A["Config\nTenant A settings"]
    end
    subgraph TENANT_B["Tenant B"]
        DB_B["Database\nTenant B schema"]
        VS_B["Vector Store\nTenant B index"]
        CONFIG_B["Config\nTenant B settings"]
    end
    subgraph SHARED["Shared Infrastructure"]
        LLM_GW["LLM Gateway"]
        MONITOR_SHARED["Monitoring"]
        CACHE_SHARED["Cache Cluster"]
    end
    
    TENANT_A --> LLM_GW
    TENANT_B --> LLM_GW
    TENANT_A --> MONITOR_SHARED
    TENANT_B --> MONITOR_SHARED
    
    style TENANT_A fill:#3b82f6,color:#fff
    style TENANT_B fill:#22c55e,color:#fff
    style SHARED fill:#f59e0b,color:#fff
```

---

## Deployment Architecture

```mermaid
flowchart TD
    subgraph CI["CI/CD Pipeline"]
        GIT["Git Push"] --> TEST["Tests + Eval"]
        TEST --> BUILD["Docker Build"]
        BUILD --> REGISTRY["Container Registry"]
    end
    subgraph K8S["Kubernetes Cluster"]
        subgraph PROD_NS["Production Namespace"]
            FE["Frontend\nHPA: 3-20 pods"]
            API["API\nHPA: 5-50 pods"]
            WORKERS["Workers\nHPA: 2-10 pods"]
        end
        subgraph OPS_NS["Observability"]
            PROM["Prometheus"]
            GRAFANA["Grafana"]
            LOKI["Loki"]
        end
    end
    subgraph DATA_SERVICES["Data Services"]
        RDS["RDS PostgreSQL"]
        ELASTICACHE["ElastiCache Redis"]
        QDRANT_CLOUD["Qdrant Cloud"]
    end
    
    REGISTRY --> K8S
    FE --> API
    API --> WORKERS
    API --> DATA_SERVICES
    API --> PROM
    
    style CI fill:#3b82f6,color:#fff
    style K8S fill:#22c55e,color:#fff
    style DATA_SERVICES fill:#f59e0b,color:#fff
```

---

## Monitoring & Observability

```mermaid
flowchart LR
    subgraph TRACES["Tracing"]
        OTLP["OpenTelemetry\nAll services"]
        SPANS["Spans\nEvery LLM call"]
        EXPORT["Export to\nGrafana Tempo"]
    end
    subgraph METRICS["Metrics"]
        REQ["Requests/sec\nPer tenant"]
        LAT["Latency P50/P95/P99"]
        COST["Cost/request\nPer model"]
        TOKENS["Token usage\nInput + Output"]
    end
    subgraph LOGS["Logging"]
        STRUCT["Structured logs\nJSON format"]
        SEARCH["Full-text search\nGrafana Loki"]
        RETENTION["Retention\n30 days hot, 1 year cold"]
    end
    subgraph ALERTS["Alerting"]
        QUALITY["Quality drop\nAuto-rollback"]
        COST_SPIKE["Cost spike\n> 2x budget"]
        ERROR["Error rate\n> 5% in 5 min"]
        LATENCY["P95 latency\n> 5s"]
    end
    
    TRACES --> GRAFANA["Grafana\nDashboards"]
    METRICS --> GRAFANA
    LOGS --> GRAFANA
    ALERTS --> DUTY["PagerDuty\nOn-call"]
    
    style TRACES fill:#3b82f6,color:#fff
    style METRICS fill:#22c55e,color:#fff
    style LOGS fill:#f59e0b,color:#fff
    style ALERTS fill:#ef4444,color:#fff
```

---

## Evaluation Pipeline

| Evaluator | What It Checks | Frequency |
|-----------|---------------|-----------|
| LLM-as-a-Judge | Response quality | Every response |
| Safety classifier | Toxic output | Every response |
| PII detector | Data leakage | Every response |
| Golden dataset | Regression testing | Every deploy |
| Human review | Stratified sampling | 1% of responses |

---

## Security Architecture

| Concern | Implementation |
|---------|---------------|
| **Authentication** | SSO (SAML/OIDC) + API keys |
| **Authorization** | RBAC with tenant isolation |
| **Encryption** | TLS 1.3, AES-256 at rest |
| **Audit logging** | All AI operations logged |
| **Data isolation** | Schema-per-tenant |
| **Secrets** | Vault / AWS Secrets Manager |
| **Compliance** | SOC2, GDPR data processing agreements |

---

## Interview Questions

### System Design

**Q: Design the multi-tenant data isolation strategy for this enterprise AI platform.**

> Isolate by **schema-per-tenant** in PostgreSQL (data), **collection-per-tenant** in Qdrant (vectors), **prefix-per-tenant** in Redis (cache). Each tenant's LLM requests include tenant_id for cost allocation. Tenant config stored in central config DB. API keys scoped to tenant. Row-level security ensures tenants can only access their data.

**Q: Design the evaluation and monitoring system that auto-rollbacks bad deployments.**

> Pipeline: (1) Deploy to 5% of users, (2) LLM-as-a-Judge evaluates every response, (3) Score compared to baseline (rolling 24h window), (4) If score drops > 5% for 5 min → auto-rollback, (5) Rollback: revert prompt + model config + deployment version, (6) Notification sent to on-call with diff analysis.

---

## Grading Rubric

| Category | Weight | Pass Criteria |
|----------|--------|---------------|
| Architecture | 20% | Clean, well-documented microservices |
| Functionality | 25% | All core features working |
| Code quality | 15% | Tests, type hints, documentation |
| Monitoring | 15% | Dashboards, alerts, tracing |
| Security | 10% | Auth, encryption, audit logs |
| Deployment | 15% | CI/CD, K8s, infrastructure as code |

---

## Summary

| Area | What You Build |
|------|---------------|
| **Frontend** | Chat UI + Admin dashboard |
| **Backend** | Multi-service API with streaming |
| **RAG** | Document ingestion + multi-source retrieval |
| **Agents** | LangGraph agents with tools |
| **MCP** | Model Context Protocol server |
| **Monitoring** | Prometheus + Grafana + Tempo |
| **Evaluation** | LLM-as-a-Judge + golden datasets |
| **Security** | Multi-tenant SSO + RBAC |
| **Deployment** | K8s + CI/CD + Terraform |

---

## Navigation

**Previous:** [13 — AI System Design](/ai/phase-10-ai-projects/13-ai-system-design)

**Next:** [15 — Phase Summary](/ai/phase-10-ai-projects/15-phase-summary)

**Related Topics:**
- [All Phase 9 Production AI Concepts](/ai/phase-09-production-ai/01-introduction-to-llmops)
- [All Phase 10 Projects](/ai/phase-10-ai-projects/01-chatgpt-clone)
- [Phase Summary](/ai/phase-10-ai-projects/15-phase-summary)
