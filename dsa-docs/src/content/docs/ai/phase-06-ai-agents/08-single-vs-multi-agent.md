---
title: "08. Single Agent vs Multi-Agent Systems"
description: "Compare single-agent and multi-agent architectures — when to use one powerful agent vs multiple specialized agents working together."
sidebar:
  order: 8
---

## Introduction

> **A single agent is a specialist. A multi-agent system is a team. The right choice depends on the complexity of the task and the diversity of skills needed.**

Should you build one agent that can do everything? Or multiple agents, each specialized in one area? This is one of the most important architectural decisions in agent design.

```mermaid
flowchart LR
    subgraph SINGLE["Single Agent"]
        S1["🤖 One Agent"]
        S1 --> S2["All Tools\nAll Skills\nAll Memory"]
        S2 --> S3["Does everything\nfrom start to finish"]
    end

    subgraph MULTI["Multi-Agent System"]
        M1["👤 Coordinator Agent"]
        M1 --> M2["🔍 Research Agent"]
        M1 --> M3["💻 Code Agent"]
        M1 --> M4["📝 Review Agent"]
        M1 --> M5["🧪 Test Agent"]
    end

    style SINGLE fill:#3b82f6,color:#fff
    style MULTI fill:#22c55e,color:#fff
```

---

## Why This Choice Matters

### The Problem: One Agent vs Many

Building a single agent is simpler but has limits:
- **Context window contention** — One agent handles planning, research, coding, and debugging in the same context
- **Tool overload** — Too many tools in one registry confuse the agent
- **No specialization** — The same agent writes code and reviews code, reducing quality

Building multiple agents adds complexity but unlocks:
- **Specialization** — Each agent masters one domain
- **Parallel work** — Multiple agents work simultaneously
- **Quality control** — One agent writes, another reviews

---

## Real-World Analogy

### The Solo Developer vs A Development Team

A **solo developer** (single agent) works alone. They handle everything: requirements, design, coding, testing, deployment. This works for small projects but doesn't scale. The developer gets context-switched, makes mistakes because they review their own work, and can only do one thing at a time.

A **development team** (multi-agent) has specialists:
- **Product Manager** — Defines requirements (Planner agent)
- **Frontend Developer** — Builds the UI (Frontend agent)
- **Backend Developer** — Builds the API (Backend agent)
- **QA Engineer** — Tests everything (Reviewer agent)
- **DevOps Engineer** — Deploys (Operations agent)

The team completes complex projects faster and with higher quality because each member focuses on what they do best.

---

## Architecture Comparison

```mermaid
flowchart TD
    subgraph SINGLE_ARCH["Single Agent Architecture"]
        USER1["User Goal"] --> AGENT1["🤖 Single Agent"]
        AGENT1 --> T1["🛠️ All Tools"]
        T1 --> R1["Result"]
        MEM1["💾 Memory"] -.-> AGENT1
    end

    subgraph MULTI_ARCH["Multi-Agent Architecture"]
        USER2["User Goal"] --> COORD["👤 Coordinator"]
        COORD --> RESEARCH["🔍 Research Agent"]
        COORD --> CODE["💻 Code Agent"]
        COORD --> REVIEW["📝 Review Agent"]
        COORD --> TEST["🧪 Test Agent"]
        
        RESEARCH --> RESEARCH_TOOLS["🔍 Search, Read, Synthesize"]
        CODE --> CODE_TOOLS["💻 Python, File System, Git"]
        REVIEW --> REVIEW_TOOLS["📝 Code Analysis, Documentation"]
        TEST --> TEST_TOOLS["🧪 Test Runner, Linter"]
        
        CODE --> REVIEW
        REVIEW --> TEST
        TEST --> COORD
        RESEARCH --> CODE
    end

    style SINGLE_ARCH fill:#3b82f6,color:#fff
    style MULTI_ARCH fill:#22c55e,color:#fff
    style COORD fill:#8b5cf6,color:#fff
```

---

## Comparison Table

| Dimension | Single Agent | Multi-Agent System |
|-----------|-------------|-------------------|
| **Complexity** | Low — one agent, one context | High — coordination, communication overhead |
| **Cost** | Lower — one LLM per task | Higher — multiple LLM calls per task |
| **Speed** | Sequential — one thing at a time | Parallel — agents can work simultaneously |
| **Quality** | Limited by one perspective | Higher — review and validation by different agents |
| **Specialization** | Generalist — does everything | Specialist — each agent excels at one domain |
| **Scalability** | Limited by one agent's context | High — add more agents for more work |
| **Debugging** | Simple — trace one agent's decisions | Complex — trace inter-agent communication |
| **Best for** | Simple, well-defined tasks | Complex, multi-domain projects |

---

## When to Use Single Agent

```mermaid
flowchart TD
    TASK["Is the task..."]
    TASK --> Q1["Well-defined with\nclear steps?"]
    Q1 -->|"Yes"| Q2["Requires only one\ndomain of expertise?"]
    Q2 -->|"Yes"| Q3["Can be done\nsequentially?"]
    Q3 -->|"Yes"| SINGLE["Use Single Agent\n✅ Simpler, cheaper, faster"]
    
    Q1 -->|"No"| MULTI["Use Multi-Agent"]
    Q2 -->|"No"| MULTI
    Q3 -->|"No"| MULTI

    style SINGLE fill:#22c55e,color:#fff
    style MULTI fill:#f59e0b,color:#fff
```

### Good for Single Agent

- **Research and summarize** a topic
- **Translate** a document
- **Generate** a report from structured data
- **Format** and clean data
- **Send** an email or message
- **Answer** questions from a knowledge base

---

## When to Use Multi-Agent

### Good for Multi-Agent

```mermaid
flowchart LR
    subgraph EXAMPLES["Multi-Agent Use Cases"]
        SW["💻 Software Development\nPlanner + Coder + Reviewer + Tester"]
        RESEARCH["🔬 Deep Research\nSearcher + Analyst + Synthesizer + Writer"]
        CUSTOMER["📞 Customer Support\nClassifier + Resolver + Escalator + Quality"]
        CONTENT["📝 Content Production\nStrategist + Writer + Editor + Publisher"]
    end

    style SW fill:#3b82f6,color:#fff
    style RESEARCH fill:#8b5cf6,color:#fff
    style CUSTOMER fill:#f59e0b,color:#fff
    style CONTENT fill:#22c55e,color:#fff
```

### Multi-Agent Patterns

```mermaid
flowchart TD
    subgraph PATTERNS["Common Multi-Agent Patterns"]
        SUPERVISOR["Supervisor Pattern\nOne coordinator delegates\nand reviews work"]
        DEBATE["Debate Pattern\nMultiple agents propose\nsolutions, vote on best"]
        PIPELINE["Pipeline Pattern\nEach agent completes\none stage, passes to next"]
        COLLAB["Collaboration Pattern\nAgents work together\non shared goal"]
    end

    style SUPERVISOR fill:#3b82f6,color:#fff
    style DEBATE fill:#8b5cf6,color:#fff
    style PIPELINE fill:#f59e0b,color:#fff
    style COLLAB fill:#22c55e,color:#fff
```

---

## Communication Between Agents

Multi-agent systems need protocols for agents to communicate.

```mermaid
sequenceDiagram
    participant Coordinator
    participant Research as Research Agent
    participant Code as Code Agent
    participant Review as Review Agent

    Coordinator->>Research: "Research best React form libraries"
    Research-->>Coordinator: "Top 3: Formik, React Hook Form, Final Form"
    
    Coordinator->>Code: "Build a login form using React Hook Form"
    Code->>Code: Writes LoginForm.tsx
    Code-->>Coordinator: "Login form created, ready for review"
    
    Coordinator->>Review: "Review the login form for quality"
    Review->>Review: Analyzes code for issues
    Review-->>Coordinator: "Issues found: 1) Missing error boundaries 2) No loading state"
    
    Coordinator->>Code: "Fix the 2 issues identified by review"
    Code->>Code: Updates LoginForm.tsx
    Code-->>Coordinator: "Both issues fixed"
    
    Coordinator->>Review: "Verify fixes"
    Review-->>Coordinator: "Both issues resolved. Code approved."
    
    Coordinator->>Coordinator: "Task complete. Quality score: 9/10"
```

---

## Production Examples

| Product | Architecture | Why Multiple Agents? |
|---------|-------------|---------------------|
| **Devin** | Multi-agent (Planner + Coder + Reviewer + Tester) | Software development needs specialized skills |
| **Microsoft Copilot** | Multi-agent (Orchestrator + multiple specialized agents) | Enterprise tasks span many domains |
| **ChatGPT Canvas** | Single agent (one model, one context) | Simple editing tasks |
| **OpenAI Operator** | Single agent (one model + browser tools) | Sequential web tasks |
| **Claude Desktop** | Single agent (one model + computer tools) | Direct computer interaction |

---

## Best Practices

1. **Start with a single agent** — Most tasks don't need multiple agents. Add complexity only when needed.
2. **Clear handoff protocols** — When agent A passes work to agent B, the handoff should include full context.
3. **Shared memory** — All agents should have access to a shared memory store so they don't duplicate work.
4. **Guard against infinite delegation** — Agent A asks Agent B, who asks Agent C, who asks Agent A... Set max delegation depth (3 levels).
5. **Log all inter-agent communication** — For debugging, you need to trace the full chain of communication.

---

## Common Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| **Over-engineering** | 5 agents for a simple Q&A task | Start with 1, add agents only when needed |
| **Poor handoff** | Agent B doesn't know what Agent A did | Include full context in each handoff |
| **No shared context** | Agents work with stale information | Use a shared memory store |
| **Delegation loops** | Infinite cycle of agent A → B → A | Set max 3 levels of delegation |
| **Redundant work** | Two agents research the same topic | Track progress in shared state |

---

## Interview Questions

### Easy

**Q: What's the difference between a single agent and a multi-agent system?**

> A single agent does everything itself — planning, research, coding, reviewing. A multi-agent system has multiple specialized agents — a researcher searches, a coder writes code, a reviewer checks quality — coordinated by a supervisor agent.

**Q: When would you choose a single agent over multiple agents?**

> For simple, well-defined tasks that require one domain of expertise and can be done sequentially. For example: "Translate this document to Spanish" is perfect for a single agent.

### Intermediate

**Q: How do agents in a multi-agent system communicate?**

> Through a shared message bus or coordinator. Agent A sends a message to the coordinator: "Task done, result: X." The coordinator forwards the result to Agent B with a new instruction: "Now use result X to do Y." Communication can be synchronous (wait for response) or asynchronous (queue-based). For complex systems, use a shared board where agents write results and read others' results.

### Senior

**Q: Design a multi-agent system that builds a web application from a user's description. How do you prevent conflicting code changes?**

> Use a **git workflow**: (1) **Planner Agent** creates a plan and branches. (2) **Frontend Agent** works on the UI branch. (3) **Backend Agent** works on API branch. (4) Each agent commits changes with descriptive messages. (5) **Integration Agent** merges branches, runs tests, resolves conflicts. (6) **Review Agent** verifies the merged code. If conflicts occur, the integration agent asks the conflicting agents to resolve them. This prevents overwrites and maintains code quality.

### Staff Engineer

**Q: How do you evaluate whether a multi-agent system is actually better than a single agent for a given task?**

> A/B test both architectures on the same task set. Measure: (1) **Task completion rate** — % of tasks fully completed. (2) **Quality score** — LLM-as-judge rating. (3) **Cost per task** — total API costs. (4) **Latency** — time to completion. (5) **Error rate** — % of tasks needing human intervention. If multi-agent doesn't improve completion rate by > 15% and quality by > 20%, the overhead isn't worth it. Most tasks see diminishing returns past 3 agents.

### Architecture

**Q: Design a multi-agent system for enterprise customer support with 100,000 tickets per day.**

> **Tiered architecture**: (1) **Classifier Agent** — Routes tickets to the right queue (billing, technical, account). One LLM call, < 1 second. (2) **Resolver Agents** — 5-10 specialized agents per domain. Each agent has domain-specific tools and knowledge base. Handles 80% of tickets autonomously. (3) **Escalation Agents** — For complex tickets, an escalation agent researches and prepares a summary for human agents. (4) **Quality Agent** — Samples 5% of resolved tickets and scores quality. **Scaling**: Auto-scale resolver agents based on queue depth. Target: 95% of tickets resolved within 5 minutes.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| **Single Agent** | One agent does everything — simple, cheap, good for focused tasks |
| **Multi-Agent** | Multiple specialized agents — complex, expensive, good for multi-domain tasks |
| **When single** | Simple, sequential, one-domain tasks |
| **When multi** | Complex, parallel, multi-domain tasks needing quality review |
| **Patterns** | Supervisor, Debate, Pipeline, Collaboration |
| **Start small** | Always start with a single agent; add agents as needed |

---

## Navigation

**Previous:** [07 — Agent Loop](/ai/phase-06-ai-agents/07-agent-loop)

**Next:** [09 — Agent Design Patterns](/ai/phase-06-ai-agents/09-agent-design-patterns)
