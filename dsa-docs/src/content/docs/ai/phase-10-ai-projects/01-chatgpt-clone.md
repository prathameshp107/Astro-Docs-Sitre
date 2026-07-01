---
title: "01. Build a ChatGPT Clone"
description: "Build a complete ChatGPT clone with streaming, chat history, conversation memory, tool calling, and multi-model support."
sidebar:
  order: 1
---

## Introduction

> **Build a production-grade conversational AI platform like ChatGPT — with streaming responses, conversation memory, tool/function calling, file uploads, multi-model selection, and a polished UI.**

ChatGPT redefined how users interact with AI. This project teaches you to build every feature that makes ChatGPT great — from real-time token streaming to conversation management, tool calling, and markdown rendering.

---

## Problem Statement

Users need a conversational AI interface that provides real-time responses, maintains context across conversations, supports multiple AI models, handles file uploads, and enables tools/plugins — all with a polished, responsive UX.

### Business Use Case

A startup building an AI chat platform for customer support teams needs a ChatGPT-like interface that:
- Handles 10K+ conversations/day
- Supports multiple LLM providers (OpenAI, Anthropic, Gemini)
- Provides real-time streaming responses
- Includes conversation history and search
- Supports file uploads and tool calling
- Deploys cost-effectively on cloud infrastructure

---

## Requirements

### Functional Requirements

| # | Feature | Description |
|---|---------|-------------|
| FR1 | User authentication | Sign up, login, OAuth (Google, GitHub) |
| FR2 | Chat sessions | Create, rename, delete conversations |
| FR3 | Streaming responses | Real-time token display via SSE |
| FR4 | Model selection | Switch between GPT-4o, Claude, Gemini |
| FR5 | Conversation memory | Maintain context across turns |
| FR6 | Message history | Persist and retrieve past conversations |
| FR7 | File upload | Upload images, PDFs, documents |
| FR8 | Tool calling | Calculator, web search, code execution |
| FR9 | Markdown rendering | Code syntax highlighting, tables, math |
| FR10 | Conversation search | Full-text search across history |
| FR11 | Export chat | Download as PDF, Markdown, JSON |
| FR12 | Dark mode | Light/dark theme toggle |

### Non-Functional Requirements

| # | Requirement | Target |
|---|-------------|--------|
| NFR1 | Response latency | TTFT < 500ms, streaming at 30+ tokens/s |
| NFR2 | Availability | 99.9% uptime |
| NFR3 | Scalability | Support 10K concurrent users |
| NFR4 | Security | End-to-end encryption, SOC2 compliance |
| NFR5 | Cost efficiency | $0.02 per avg conversation |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 + React + Tailwind CSS | Web UI, SSR, streaming |
| **Backend** | FastAPI (Python) | API server, WebSocket management |
| **Database** | PostgreSQL + pgvector | Conversations, user data, embeddings |
| **Cache** | Redis | Session cache, rate limiting |
| **Vector DB** | Qdrant / pgvector | Message embeddings for search |
| **AI** | OpenAI, Anthropic, Gemini APIs | Multi-model LLM support |
| **Streaming** | Server-Sent Events (SSE) | Real-time token streaming |
| **Auth** | NextAuth.js / JWT | Authentication |
| **File Storage** | S3 / GCS | File upload storage |
| **Deployment** | Docker + Kubernetes + AWS | Production infrastructure |

---

## Folder Structure

```
chatgpt-clone/
├── frontend/
│   ├── app/
│   │   ├── (auth)/          # Login, signup pages
│   │   ├── chat/            # Main chat interface
│   │   │   ├── [id]/        # Individual chat session
│   │   │   └── layout.tsx   # Chat layout with sidebar
│   │   └── api/             # Next.js API routes
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatMessage.tsx    # Message bubble
│   │   │   ├── ChatInput.tsx      # Input with file upload
│   │   │   ├── StreamingText.tsx  # Real-time token display
│   │   │   └── ModelSelector.tsx  # Model picker dropdown
│   │   ├── ui/
│   │   │   ├── Markdown.tsx       # Rendered markdown
│   │   │   └── CodeBlock.tsx      # Syntax highlighted code
│   │   └── layout/
│   │       ├── Sidebar.tsx        # Conversation list
│   │       └── Header.tsx         # User menu, settings
│   ├── lib/
│   │   ├── api.ts            # API client
│   │   ├── streaming.ts      # SSE handler
│   │   └── utils.ts
│   └── store/
│       └── chat.ts           # Zustand state
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py       # Auth endpoints
│   │   │   ├── chat.py       # Chat CRUD + streaming
│   │   │   ├── conversations.py
│   │   │   └── files.py      # File upload
│   │   ├── services/
│   │   │   ├── llm_service.py     # Multi-provider LLM
│   │   │   ├── memory_service.py  # Conversation memory
│   │   │   ├── tool_service.py    # Tool execution
│   │   │   └── search_service.py  # Conversation search
│   │   ├── models/
│   │   │   └── conversation.py    # DB models
│   │   └── core/
│   │       ├── config.py
│   │       └── security.py
│   └── requirements.txt
├── ai/
│   ├── prompts/
│   │   ├── system-chat.yaml
│   │   └── tools/
│   └── embeddings/
├── deployment/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── k8s/
└── docs/
    └── architecture.md
```

---

## API Design

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API Gateway
    participant Chat as Chat Service
    participant LLM as LLM Service
    participant DB as Database
    
    U->>F: Type message
    F->>API: POST /api/chat/{id}/messages
    API->>Chat: Process message
    Chat->>DB: Save user message
    Chat->>Chat: Build context (history + system prompt)
    Chat->>LLM: Stream completion
    LLM-->>Chat: Token stream (SSE)
    Chat-->>API: Stream tokens
    API-->>F: SSE events
    F-->>U: Render tokens in real-time
    Note over F: User sees tokens appearing
    LLM-->>Chat: Complete response
    Chat->>DB: Save assistant response
    API-->>F: Stream complete event
```

### Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/signup` | User registration |
| GET | `/api/conversations` | List user conversations |
| POST | `/api/conversations` | Create new conversation |
| GET | `/api/conversations/{id}` | Get conversation history |
| DELETE | `/api/conversations/{id}` | Delete conversation |
| POST | `/api/chat/{id}/messages` | Send message + stream response |
| POST | `/api/chat/{id}/stream` | SSE streaming endpoint |
| POST | `/api/files/upload` | Upload file for context |
| GET | `/api/search?q=` | Search conversations |
| GET | `/api/models` | List available models |

---

## Architecture

```mermaid
flowchart TD
    subgraph FRONTEND["Frontend (Next.js)"]
        UI["Chat UI\nReact Components"]
        STATE["State Management\nZustand"]
        SSE["SSE Client\nEventSource"]
    end
    subgraph API["API Layer"]
        GW["NextAuth\nAuthentication"]
        ROUTER["API Routes\nEdge Functions"]
        WS["WebSocket\nStreaming"]
    end
    subgraph SERVICES["Backend Services"]
        CHAT_SVC["Chat Service\nConversation management"]
        LLM_SVC["LLM Service\nMulti-provider routing"]
        TOOL_SVC["Tool Service\nFunction execution"]
        MEM_SVC["Memory Service\nContext window"]
    end
    subgraph DATA["Data Layer"]
        PG["PostgreSQL\n+ pgvector"]
        REDIS["Redis\nCache + Sessions"]
        S3["Object Store\nFiles"]
    end
    subgraph AI["AI Providers"]
        OPENAI["OpenAI\nGPT-4o"]
        ANTHRO["Anthropic\nClaude"]
        GEMINI["Google\nGemini"]
    end
    
    UI --> GW
    UI --> SSE
    SSE --> ROUTER
    ROUTER --> CHAT_SVC
    CHAT_SVC --> LLM_SVC
    LLM_SVC --> TOOL_SVC
    LLM_SVC --> MEM_SVC
    CHAT_SVC --> PG
    LLM_SVC --> REDIS
    LLM_SVC --> OPENAI
    LLM_SVC --> ANTHRO
    LLM_SVC --> GEMINI
    CHAT_SVC --> S3
    
    style FRONTEND fill:#3b82f6,color:#fff
    style API fill:#8b5cf6,color:#fff
    style SERVICES fill:#22c55e,color:#fff
    style DATA fill:#f59e0b,color:#fff
    style AI fill:#ef4444,color:#fff
```

---

## Authentication & Authorization

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant Auth as NextAuth
    participant DB as Database
    
    U->>F: Click "Sign in with Google"
    F->>Auth: OAuth request
    Auth->>U: Google login page
    U->>Auth: Grant access
    Auth->>F: JWT token
    F->>F: Store token (httpOnly cookie)
    Note over F: All subsequent requests include JWT
    
    F->>Auth: GET /api/conversations
    Auth->>Auth: Verify JWT signature
    Auth->>DB: Fetch user's conversations
    DB-->>Auth: Filtered by user_id
    Auth-->>F: Return conversations
```

**Authorization rules:**
- Users can only access their own conversations
- Admin users can view system-wide analytics
- API keys are scoped to specific features

---

## Streaming Implementation

```mermaid
flowchart LR
    USER["User sends message"] --> QUEUE["Queue message"]
    QUEUE --> CONTEXT["Build context\nHistory + System prompt + Files"]
    CONTEXT --> MODEL{"Model\nSelection"}
    MODEL -->|"GPT-4o"| GPT["OpenAI Stream"]
    MODEL -->|"Claude"| CLAUDE["Anthropic Stream"]
    MODEL -->|"Gemini"| GEMINI["Google Stream"]
    
    GPT --> SSE["SSE Connection"]
    CLAUDE --> SSE
    GEMINI --> SSE
    
    SSE --> PARSE["Parse tokens\nMarkdown rendering"]
    PARSE --> UI["Update UI\nReal-time display"]
    
    style SSE fill:#3b82f6,color:#fff
    style UI fill:#22c55e,color:#fff
```

### Streaming Event Format

```
event: token
data: {"token": "Hello", "index": 0}

event: token  
data: {"token": " world", "index": 1}

event: done
data: {"conversation_id": "abc123", "usage": {"prompt_tokens": 150, "completion_tokens": 42}}

event: error
data: {"code": "rate_limit", "message": "Rate limit exceeded"}
```

---

## Deployment Architecture

```mermaid
flowchart TD
    subgraph CI_CD["CI/CD Pipeline"]
        GIT["Git Push"] --> BUILD["Docker Build"]
        BUILD --> TEST["Run Tests"]
        TEST --> REGISTRY["Push to ECR"]
    end
    subgraph PROD["Production (AWS)"]
        subgraph NET["Networking"]
            CF["CloudFront CDN"]
            ALB["Application Load Balancer"]
        end
        subgraph K8S["EKS Cluster"]
            FE["Frontend Pods\nNext.js"]
            API_PODS["API Pods\nFastAPI"]
            WORKER["Background Workers"]
        end
        subgraph DATA_LAYER["Data"]
            RDS["RDS PostgreSQL"]
            ELASTICACHE["ElastiCache Redis"]
            S3_BUCKET["S3 Files"]
        end
    end
    
    REGISTRY --> K8S
    USER["Users"] --> CF
    CF --> ALB
    ALB --> FE
    ALB --> API_PODS
    FE --> API_PODS
    API_PODS --> RDS
    API_PODS --> ELASTICACHE
    API_PODS --> S3_BUCKET
    
    style PROD fill:#1e293b,color:#fff
    style K8S fill:#3b82f6,color:#fff
    style DATA_LAYER fill:#f59e0b,color:#fff
```

---

## Security

| Concern | Implementation |
|---------|---------------|
| **Authentication** | NextAuth.js with OAuth + JWT |
| **Authorization** | Row-level security on conversations |
| **Encryption** | TLS 1.3, AES-256 at rest |
| **Rate limiting** | Redis-based token bucket (100 req/min per user) |
| **Input validation** | Sanitize all user input before LLM calls |
| **Output safety** | Guardrails on LLM output (toxicity, PII) |
| **Secret management** | AWS Secrets Manager / HashiCorp Vault |

---

## Monitoring

```mermaid
flowchart LR
    subgraph METRICS["Key Metrics"]
        LATENCY["TTFT, TPOT, Total Latency"]
        TOKENS["Tokens per Conversation"]
        COST["Cost per User per Day"]
        ERRORS["Error Rate by Endpoint"]
        USAGE["Active Users, Conversations"]
    end
    subgraph TOOLS["Tools"]
        GRAFANA["Grafana Dashboards"]
        DATADOG["Datadog APM"]
        LANGSMITH["LangSmith Traces"]
        PAGERDUTY["Alerting"]
    end
    
    METRICS --> TOOLS
    
    style METRICS fill:#3b82f6,color:#fff
    style TOOLS fill:#22c55e,color:#fff
```

---

## Evaluation

| Dimension | Method | Target |
|-----------|--------|--------|
| Response quality | LLM-as-a-Judge | ≥ 90% |
| User satisfaction | Thumbs up/down | ≥ 85% |
| Task completion | Rate of conversations with resolution | ≥ 80% |
| Latency P95 | Monitor | ≤ 3s |
| Cost per conversation | Token tracking | ≤ $0.05 |

---

## Scaling

| Component | Strategy |
|-----------|----------|
| **Frontend** | Next.js CDN caching, ISR for static pages |
| **API servers** | Horizontal autoscaling (HPA), target 70% CPU |
| **Database** | Read replicas for conversation history, connection pooling |
| **Cache** | Redis cluster with read replicas |
| **LLM API** | Multi-key rotation, fallback models, request queuing |
| **File storage** | S3 with CDN for uploaded files |

---

## Future Improvements

| Feature | Priority | Complexity |
|---------|----------|------------|
| Voice input/output | High | Medium |
| Image generation (DALL-E) | Medium | Low |
| Custom GPTs/prompt library | High | Medium |
| Team workspaces | Medium | High |
| Offline mode (PWA) | Low | High |
| Plugin ecosystem | Medium | High |

---

## Interview Questions

### Architecture

**Q: How would you design the streaming architecture for a ChatGPT clone handling 10K concurrent users?**

> Use SSE (Server-Sent Events) from FastAPI to stream tokens. Each user gets a persistent SSE connection. Use async generators to yield tokens from the LLM API. Implement backpressure — if the client is slow, buffer tokens or drop older ones. Use Redis pub/sub to handle horizontal scaling: any API pod can stream to any user.

**Q: How do you manage conversation context within token limits?**

> Strategy: (1) Track total tokens per conversation, (2) When approaching limit, summarize older messages, (3) Keep system prompt + last N messages in full, summarize everything before that, (4) Use a sliding window — discard oldest messages first, (5) For very long conversations, create "checkpoints" that summarize the conversation so far.

### System Design

**Q: Design the database schema for a ChatGPT clone.**

> Tables: `users` (id, email, name, auth_provider), `conversations` (id, user_id, title, model, created_at, updated_at), `messages` (id, conversation_id, role, content, tokens, created_at), `message_files` (id, message_id, file_url, file_type). Use pgvector for message embeddings to enable semantic search across conversations.

### Coding

**Q: Implement an SSE streaming endpoint for chat.**

> See the streaming implementation above. Key: use `StreamingResponse` with an async generator that yields tokens as they arrive from the LLM provider.

---

## Summary

| Feature | Implementation |
|---------|---------------|
| **Chat UI** | Next.js + Tailwind + React Server Components |
| **Streaming** | SSE from FastAPI to Next.js |
| **Multi-model** | OpenAI, Anthropic, Gemini through unified interface |
| **Memory** | Sliding window + summarization |
| **Files** | S3 upload + context injection |
| **Search** | pgvector embeddings |
| **Auth** | NextAuth.js + JWT |
| **Deployment** | Docker + Kubernetes + AWS |

---

## Navigation

**Previous:** [13 — Phase Summary — Production AI](/ai/phase-09-production-ai/13-phase-summary)

**Next:** [02 — Build a Perplexity Clone](/ai/phase-10-ai-projects/02-perplexity-clone)

**Related Projects:**
- [Perplexity Clone](/ai/phase-10-ai-projects/02-perplexity-clone)
- [AI Document Assistant](/ai/phase-10-ai-projects/07-ai-document-assistant)
- [AI System Design](/ai/phase-10-ai-projects/13-ai-system-design)
