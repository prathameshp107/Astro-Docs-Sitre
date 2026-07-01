---
title: "15. AI Agent Projects & Complete Roadmap"
description: "Build 8 production AI agent projects — coding assistant, research agent, travel planner, repository agent, customer support, email assistant, DevOps agent, and enterprise knowledge agent."
sidebar:
  order: 15
---

## Introduction

> **Theory is important, but building real projects is how you master AI agents. This document presents 8 production-grade AI agent projects you can build, each with architecture, workflow, tech stack, and deployment guidance.**

These projects progress from simple (single-agent with few tools) to complex (multi-agent with memory, retrieval, and human-in-the-loop). Each project is inspired by a real product.

---

## Complete AI Agent Roadmap

```mermaid
flowchart TD
    LLM["🧠 Step 1: LLM\nBasic question answering"] --> RAG["📚 Step 2: RAG\nKnowledge retrieval"]
    RAG --> AGENT["🤖 Step 3: Agent\nTool use & actions"]
    AGENT --> PLAN["📋 Step 4: Planning\nTask decomposition"]
    PLAN --> MEM["💾 Step 5: Memory\nCross-session context"]
    MEM --> TOOLS["🛠️ Step 6: Tools\nRegistry & execution"]
    TOOLS --> EXEC["⚡ Step 7: Execution\nAgent loop & reflection"]
    EXEC --> PROD["🚀 Step 8: Production\nObservability & guardrails"]
    PROD --> ENTERPRISE["🏢 Step 9: Enterprise\nMulti-agent & scaling"]

    style LLM fill:#3b82f6,color:#fff
    style RAG fill:#8b5cf6,color:#fff
    style AGENT fill:#f59e0b,color:#fff
    style PROD fill:#22c55e,color:#fff
    style ENTERPRISE fill:#ef4444,color:#fff
```

---

## Project 1: AI Coding Assistant (Cursor Clone)

### Problem

Developers spend 40% of their time searching for code and debugging. An AI coding assistant understands context, suggests code, runs commands, and fixes errors.

### Architecture

```mermaid
flowchart TD
    USER_CODE["👤 Developer writes code"] --> CTX_BUILDER["📄 Context Builder"]
    CTX_BUILDER --> FILE_READER["📁 Current file + imports"]
    CTX_BUILDER --> DIFF["🔍 Recent changes"]
    CTX_BUILDER --> ERRORS["❌ Compiler errors"]
    
    CTX_BUILDER --> CODE_LLM["🧠 Code LLM"]
    CODE_LLM --> SUGGEST["💡 Code suggestion"]
    CODE_LLM --> REFACTOR["🔄 Refactor suggestion"]
    CODE_LLM --> EXPLAIN["📖 Code explanation"]
    
    USER_CODE --> TERMINAL["💻 Terminal execution"]
    TERMINAL --> OUTPUT_CHECK["📊 Check output"]
    OUTPUT_CHECK -->|"Error"| CODE_LLM
    OUTPUT_CHECK -->|"Success"| CONTINUE["Continue coding"]

    style USER_CODE fill:#3b82f6,color:#fff
    style CODE_LLM fill:#8b5cf6,color:#fff
    style SUGGEST fill:#22c55e,color:#fff
```

### Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | VS Code extension / Web UI |
| **Code LLM** | GPT-4o / Claude 3.5 (code-optimized) |
| **Code Index** | Tree-sitter (AST parser) + Voyage Code embeddings |
| **Storage** | SQLite (project index) |
| **Context** | LSP (Language Server Protocol) for real-time analysis |

### Key Features

1. **Context-aware completions** — Understands imports, types, and patterns in the current file
2. **Error fixing** — Detects compiler errors, suggests and applies fixes
3. **Terminal integration** — Runs commands, captures output, detects failures
4. **Code explanation** — Select code, ask "what does this do?"

---

## Project 2: Research Agent (Perplexity Style)

### Problem

Researching a topic requires searching multiple sources, reading articles, extracting key information, and synthesizing findings.

### Architecture

```mermaid
sequenceDiagram
    participant User
    participant Planner
    participant Searcher as Search Agent
    participant Reader as Content Reader
    participant Synthesizer

    User->>Planner: "Research the impact of AI on healthcare"
    Planner->>Planner: Break down: 5 sub-topics
    
    par Parallel Research
        Searcher->>Searcher: Search "AI diagnostics accuracy 2025"
        Searcher->>Searcher: Search "AI drug discovery breakthroughs"
        Searcher->>Searcher: Search "AI healthcare ethics concerns"
        Searcher->>Searcher: Search "AI hospital deployment cases"
        Searcher->>Searcher: Search "AI healthcare market size"
    end
    
    Searcher->>Reader: Read top 3 articles per topic
    Reader->>Synthesizer: Extracted key findings
    
    Synthesizer->>Synthesizer: Combine findings into structured report
    Synthesizer-->>User: "Here's your research report with 15 sources"
```

### Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | LangGraph (for loops) or CrewAI (for team) |
| **Search** | Tavily / SerpAPI / Bing Search API |
| **Content** | Firecrawl / Jina Reader |
| **Embeddings** | OpenAI text-embedding-3-small |
| **Storage** | Chroma / Qdrant (for storing research) |

---

## Project 3: Travel Planner Agent

### Problem

Planning a trip involves searching flights, comparing hotels, checking weather, finding activities, and creating an itinerary.

### Architecture

```mermaid
flowchart TD
    USER_TRAVEL["👤 'Plan a trip to\nParis for 5 days'"] --> DEST["📍 Destination Research"]
    DEST --> DATES["📅 Date optimization\n(best prices)"]
    DATES --> FLIGHTS["✈️ Flight Search"]
    DATES --> HOTELS["🏨 Hotel Search"]
    DATES --> ACTIVITIES["🎭 Activity Search"]
    
    FLIGHTS --> BUDGET["💰 Budget Optimizer"]
    HOTELS --> BUDGET
    ACTIVITIES --> BUDGET
    
    BUDGET --> ITINERARY["📋 Itinerary Builder"]
    ITINERARY --> WEATHER["🌤️ Weather Check"]
    ITINERARY --> MAP["🗺️ Map Integration"]
    ITINERARY --> USER_REVIEW["👤 User Review & Approve"]
    USER_REVIEW -->|"Approve"| BOOK["✅ Book selected items"]
    USER_REVIEW -->|"Change"| ITINERARY

    style USER_TRAVEL fill:#3b82f6,color:#fff
    style BUDGET fill:#f59e0b,color:#fff
    style ITINERARY fill:#8b5cf6,color:#fff
    style BOOK fill:#22c55e,color:#fff
```

### Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | OpenAI Agents SDK |
| **Flight API** | Amadeus / Skyscanner API |
| **Hotel API** | Booking.com API / Google Hotels |
| **Maps** | Google Maps / Mapbox |
| **Weather** | OpenWeather API |
| **Memory** | Redis (session state) |
| **Safety** | Human approval for all bookings |

---

## Project 4: GitHub Repository Agent

### Problem

Understanding a new codebase is hard. A repository agent can explain architecture, find code, trace dependencies, and suggest improvements.

### Architecture

```mermaid
flowchart LR
    REPO["📦 GitHub Repo"] --> PARSER["📖 AST Parser\n(Tree-sitter)"]
    PARSER --> FUNCTIONS["📋 Functions Index"]
    PARSER --> CLASSES["🏷️ Classes Index"]
    PARSER --> IMPORTS["🔗 Dependency Graph"]
    PARSER --> FILES["📁 File Structure"]
    
    FUNCTIONS --> VDB_REPO[("🗄️ Code Vector DB")]
    CLASSES --> VDB_REPO
    FILES --> VDB_REPO
    
    QUERY["User: 'Explain auth flow'"] --> SEARCH_REPO["🔍 Multi-Search"]
    SEARCH_REPO --> SEMANTIC["🔤 Semantic Search"]
    SEARCH_REPO --> SYMBOL["🏷️ Symbol Search"]
    SEARCH_REPO --> FILE["📁 File Search"]
    SEARCH_REPO --> DEP["🔗 Dependency Search"]
    
    SEMANTIC --> CONTEXT_REPO["🧠 Context Builder"]
    SYMBOL --> CONTEXT_REPO
    FILE --> CONTEXT_REPO
    DEP --> CONTEXT_REPO
    
    CONTEXT_REPO --> LLM_REPO["🤖 Code LLM"]
    LLM_REPO --> ANSWER["✅ Answer with citations"]

    style REPO fill:#3b82f6,color:#fff
    style VDB_REPO fill:#f59e0b,color:#fff
    style LLM_REPO fill:#8b5cf6,color:#fff
    style ANSWER fill:#22c55e,color:#fff
```

---

## Project 5: Customer Support Agent

### Problem

Customer support teams handle thousands of tickets daily. An agent can classify, resolve common issues, and escalate complex ones.

### Architecture

```mermaid
flowchart TD
    TICKET["📧 New Ticket"] --> CLASSIFIER["🔀 Classifier Agent"]
    
    CLASSIFIER -->|"Billing"| BILLING["💰 Billing Agent\n• Check invoice\n• Process refund\n• Update plan"]
    CLASSIFIER -->|"Technical"| TECH["💻 Technical Agent\n• Check logs\n• Run diagnostics\n• Suggest fix"]
    CLASSIFIER -->|"Account"| ACCOUNT["👤 Account Agent\n• Update profile\n• Reset password\n• Change settings"]
    CLASSIFIER -->|"Complex"| HUMAN["👤 Human Agent\n• Prepare summary\n• Escalate ticket"]
    
    BILLING --> QUALITY["📊 Quality Check"]
    TECH --> QUALITY
    ACCOUNT --> QUALITY
    
    QUALITY -->|"Confidence > 90%"| RESOLVED["✅ Auto-resolved"]
    QUALITY -->|"Confidence < 90%"| HUMAN

    style TICKET fill:#3b82f6,color:#fff
    style CLASSIFIER fill:#8b5cf6,color:#fff
    style HUMAN fill:#f59e0b,color:#fff
    style RESOLVED fill:#22c55e,color:#fff
```

### Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | OpenAI Agents SDK (production-ready) |
| **Classifier** | GPT-4o-mini (cheap, fast) |
| **Knowledge Base** | RAG pipeline with Qdrant |
| **Tracing** | OpenAI Agents SDK tracing |
| **Human-in-loop** | Approval queue for complex tickets |

---

## Project 6: Email & Calendar Assistant

### Problem

Managing emails and calendar is time-consuming. An agent can read, summarize, draft replies, schedule meetings, and manage your inbox.

### Architecture

```mermaid
flowchart LR
    EMAIL["📧 Inbox"] --> CLASSIFY_EMAIL["🔀 Classify"]
    CLASSIFY_EMAIL -->|"Important"| SUMMARIZE["📝 Summarize"]
    CLASSIFY_EMAIL -->|"Meeting Request"| CALENDAR["📅 Check Calendar"]
    CLASSIFY_EMAIL -->|"Spam"| TRASH["🗑️ Trash"]
    CLASSIFY_EMAIL -->|"Newsletter"| LABEL["📁 Label"]
    
    SUMMARIZE --> DRAFT["✍️ Draft Reply"]
    CALENDAR --> SUGGEST_TIME["⏰ Suggest Times"]
    CALENDAR --> CONFIRM["✅ Send Invite"]
    
    DRAFT --> USER_APPROVE["👤 Review & Approve"]
    SUGGEST_TIME --> USER_APPROVE
    CONFIRM --> USER_APPROVE
    USER_APPROVE -->|"Approve"| SEND["📤 Send"]

    style EMAIL fill:#3b82f6,color:#fff
    style CLASSIFY_EMAIL fill:#f59e0b,color:#fff
    style SEND fill:#22c55e,color:#fff
    style USER_APPROVE fill:#8b5cf6,color:#fff
```

---

## Project 7: DevOps Deployment Agent

### Problem

Deploying applications involves multiple steps: build, test, stage, deploy, monitor. A DevOps agent automates this pipeline with safety checks.

### Architecture

```mermaid
flowchart TD
    GIT_PUSH["📤 Git Push"] --> BUILD["🔨 Build Agent\n• npm install\n• npm run build\n• Check for errors"]
    BUILD --> TEST_PHASE["🧪 Test Agent\n• Run unit tests\n• Run integration tests\n• Check coverage"]
    
    TEST_PHASE -->|"Tests pass"| STAGE["🧪 Stage Agent\n• Deploy to staging\n• Run smoke tests\n• Health check"]
    TEST_PHASE -->|"Tests fail"| NOTIFY["📧 Notify team\n❌ Build failed"]
    
    STAGE -->|"Health OK"| APPROVE["👤 Approve production\ndeployment?"]
    STAGE -->|"Health bad"| ROLLBACK["⏪ Auto-rollback staging"]
    
    APPROVE -->|"Yes"| DEPLOY_PROD["🚀 Deploy to Production\n• Blue-green deploy\n• Run health checks\n• Enable monitoring"]
    APPROVE -->|"No"| CANCEL["❌ Deployment cancelled"]
    
    DEPLOY_PROD --> MONITOR["📊 Monitor for 10 min\n• Error rates\n• Latency\n• CPU/Memory"]
    MONITOR -->|"All stable"| DONE["✅ Deployment complete"]
    MONITOR -->|"Issues detected"| ROLLBACK_PROD["⏪ Auto-rollback production"]

    style GIT_PUSH fill:#3b82f6,color:#fff
    style BUILD fill:#8b5cf6,color:#fff
    style DEPLOY_PROD fill:#22c55e,color:#fff
    style MONITOR fill:#f59e0b,color:#fff
```

---

## Project 8: Enterprise Knowledge Agent

### Problem

Enterprise knowledge is scattered across wikis, documents, and databases. A knowledge agent answers questions with citations and access control.

### Architecture

```mermaid
flowchart TD
    QUESTION["👤 'What's the remote\nwork policy?'"] --> AUTH_KNOWLEDGE["🔐 Auth Check\nUser: employee\nRole: engineering"]
    AUTH_KNOWLEDGE --> RETRIEVE_KNOWLEDGE["🔍 Retrieve\n• Confluence API\n• SharePoint API\n• HR system"]
    
    RETRIEVE_KNOWLEDGE --> FILTER_KNOWLEDGE["🔒 Metadata Filter\nDepartment: engineering\nRegion: US\nRole: employee"]
    FILTER_KNOWLEDGE --> RERANK_KNOWLEDGE["📊 Re-rank\nCross-encoder"]
    RERANK_KNOWLEDGE --> CONTEXT_KNOWLEDGE["🧠 Build Context\nTop 5 chunks\n+ citations"]
    
    CONTEXT_KNOWLEDGE --> LLM_KNOWLEDGE["🤖 LLM\nAnswer with sources"]
    LLM_KNOWLEDGE --> GUARD_KNOWLEDGE["🛡️ Guardrail\n• No PII leak\n• Only authorized info"]
    GUARD_KNOWLEDGE --> ANSWER_KNOWLEDGE["✅ Answer with citations"]

    style QUESTION fill:#3b82f6,color:#fff
    style AUTH_KNOWLEDGE fill:#f59e0b,color:#fff
    style FILTER_KNOWLEDGE fill:#ef4444,color:#fff
    style LLM_KNOWLEDGE fill:#8b5cf6,color:#fff
    style ANSWER_KNOWLEDGE fill:#22c55e,color:#fff
```

---

## Project Comparison

```mermaid
flowchart LR
    subgraph PROJECTS["Project Complexity Comparison"]
        P1["Project 1: Coding Assistant\nComplexity: ⭐⭐⭐\nTime to MVP: 2-4 weeks"]
        P2["Project 2: Research Agent\nComplexity: ⭐⭐\nTime to MVP: 1-2 weeks"]
        P3["Project 3: Travel Planner\nComplexity: ⭐⭐⭐\nTime to MVP: 2-3 weeks"]
        P4["Project 4: Repo Agent\nComplexity: ⭐⭐⭐⭐\nTime to MVP: 4-6 weeks"]
        P5["Project 5: Support Agent\nComplexity: ⭐⭐\nTime to MVP: 1-2 weeks"]
        P6["Project 6: Email Assistant\nComplexity: ⭐⭐⭐\nTime to MVP: 2-3 weeks"]
        P7["Project 7: DevOps Agent\nComplexity: ⭐⭐⭐⭐\nTime to MVP: 4-6 weeks"]
        P8["Project 8: Knowledge Agent\nComplexity: ⭐⭐⭐⭐⭐\nTime to MVP: 6-10 weeks"]
    end

    style PROJECTS fill:#3b82f6,color:#fff
```

| Project | Framework | LLM | Key Tools | Cost/Month |
|---------|-----------|-----|-----------|------------|
| **Coding Assistant** | LangGraph | GPT-4o | Terminal, File system, LSP | $200-500 |
| **Research Agent** | CrewAI | GPT-4o-mini | Web search, Content reader | $100-300 |
| **Travel Planner** | OpenAI SDK | GPT-4o | Flight/Hotel/Weather APIs | $200-400 |
| **Repo Agent** | LangGraph | GPT-4o | Tree-sitter, Git, File system | $300-800 |
| **Support Agent** | OpenAI SDK | GPT-4o-mini | Knowledge base, CRM API | $100-500 |
| **Email Assistant** | OpenAI SDK | GPT-4o | Gmail API, Calendar API | $100-300 |
| **DevOps Agent** | LangGraph | GPT-4o | Docker, K8s, Cloud APIs | $300-1000 |
| **Knowledge Agent** | LangGraph | GPT-4o | Confluence, SharePoint, RAG | $500-2000 |

---

## Learning Path

```mermaid
flowchart TD
    START["Start Here"] --> WEEK1["Week 1-2: Project 2\nResearch Agent\nSimple, low risk\nLearn: Tools + Planning"]
    WEEK1 --> WEEK2["Week 3-4: Project 5\nSupport Agent\nProduction patterns\nLearn: Guardrails + Tracing"]
    WEEK2 --> WEEK3["Week 5-6: Project 1\nCoding Assistant\nTool integration\nLearn: Context building"]
    WEEK3 --> WEEK4["Week 7-8: Project 6\nEmail Assistant\nExternal APIs\nLearn: Auth + Human-in-Loop"]
    WEEK4 --> WEEK5["Week 9-10: Project 3\nTravel Planner\nMulti-API orchestration\nLearn: State management"]
    WEEK5 --> WEEK6["Week 11-12: Project 4\nRepo Agent\nCode understanding\nLearn: AST + Vector search"]
    WEEK6 --> WEEK7["Week 13-14: Project 7\nDevOps Agent\nSafety-critical\nLearn: Approval flows"]
    WEEK7 --> WEEK8["Week 15-18: Project 8\nKnowledge Agent\nEnterprise scale\nLearn: Multi-agent + Security"]

    style START fill:#22c55e,color:#fff
    style WEEK1 fill:#3b82f6,color:#fff
    style WEEK8 fill:#8b5cf6,color:#fff
```

---

## Phase 6 Complete Summary

```mermaid
mindmap
  root((Phase 6:\nAI Agents))
    Chunk 1: Fundamentals
      01. What is an AI Agent
      02. Agent vs LLM
      03. Agent Lifecycle
      04. Planning & Reasoning
      05. Memory
      06. Tool Usage
      07. Agent Loop
      08. Single vs Multi-Agent
      09. Design Patterns
      10. Agent Architectures
    Chunk 2: Production
      11. LangGraph
      12. CrewAI
      13. AutoGen & OpenAI SDK
      14. Production Architecture
      15. Projects & Roadmap
```

**Next: Phase 7 — Model Context Protocol (MCP)**

You've learned how to build AI agents. Now learn how they securely connect to external systems — databases, APIs, file systems, and services — using the emerging open standard for tools, resources, prompts, and context sharing.

---

## Navigation

**Previous:** [14 — Production AI Agent Architecture](/ai/phase-06-ai-agents/14-production-ai-agent-architecture)

**Next:** Phase 7 — Model Context Protocol (MCP) (Coming Soon)

**🎉 Congratulations on completing Phase 6: AI Agents & Agentic Systems!**
