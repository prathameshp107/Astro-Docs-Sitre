---
title: "11. LangGraph — Stateful AI Agent Framework"
description: "Build production-grade AI agents with LangGraph — state graphs, nodes, edges, conditional routing, checkpointing, human-in-the-loop, and multi-agent workflows."
sidebar:
  order: 11
---

## Introduction

> **LangGraph is a framework for building stateful, multi-actor AI agent applications. It extends LangChain by adding cycles, state management, persistence, and human-in-the-loop support — essential for production agent systems.**

LangChain was great for linear chains (LLM call → tool → response), but real-world agents aren't linear. They loop, branch, pause, resume, and retry. LangGraph was built specifically for these non-linear, stateful agent workflows.

```mermaid
flowchart TD
    START["🎯 Start"] --> PLANNER["📋 Planner Node\nDecompose goal"]
    PLANNER --> RESEARCH["🔍 Research Node\nGather information"]
    RESEARCH --> DECISION{"🧠 Decision\nEnough info?"}
    DECISION -->|"No"| RESEARCH
    DECISION -->|"Yes"| CODE["💻 Code Node\nGenerate solution"]
    CODE --> REVIEW["📝 Review Node\nCheck quality"]
    REVIEW -->|"Needs fixes"| CODE
    REVIEW -->|"Approved"| DONE["✅ Done"]
    STATE["💾 State\n(passed between nodes)"] -.-> PLANNER
    STATE -.-> RESEARCH
    STATE -.-> DECISION
    STATE -.-> CODE
    STATE -.-> REVIEW

    style START fill:#3b82f6,color:#fff
    style PLANNER fill:#8b5cf6,color:#fff
    style RESEARCH fill:#f59e0b,color:#fff
    style DECISION fill:#ef4444,color:#fff
    style CODE fill:#22c55e,color:#fff
    style REVIEW fill:#6366f1,color:#fff
    style DONE fill:#22c55e,color:#fff
    style STATE fill:#ec4899,color:#fff
```

---

## Why This Exists

### The Problem: LangChain Couldn't Handle Loops

LangChain was designed for DAGs (Directed Acyclic Graphs) — data flows in one direction, no cycles. But AI agents need:

- **Loops** — Keep searching until you find the answer
- **Branching** — Choose different paths based on results
- **Pausing** — Wait for human input mid-task
- **Persistence** — Save state and resume after crashes

LangGraph solves all of these with a **state graph** architecture.

```mermaid
flowchart LR
    subgraph LANGCHAIN["LangChain (Linear)"]
        LC1["Prompt"] --> LC2["LLM"] --> LC3["Tool"] --> LC4["Response"]
    end

    subgraph LANGGRAPH["LangGraph (Cyclic)"]
        LG1["Start"] --> LG2["Node A"]
        LG2 --> LG3{"Decision"}
        LG3 -->|"Try again"| LG2
        LG3 -->|"Continue"| LG4["Node B"]
        LG4 --> LG5["✅ End"]
    end

    style LANGCHAIN fill:#3b82f6,color:#fff
    style LANGGRAPH fill:#22c55e,color:#fff
```

---

## Real-World Analogy

### The GPS Navigation System

Think of LangChain as a simple GPS that says "Turn left, then turn right, then you've arrived." If you miss a turn, it can't help — it was designed for perfect execution.

LangGraph is like a modern GPS that:
- **Recalculates** when you miss a turn (loops)
- **Asks** "Do you want to avoid tolls?" (human-in-the-loop)
- **Remembers** your route preferences (persistent state)
- **Pauses** navigation when you stop for gas (interrupt/resume)

The **state graph** is the map. **Nodes** are the turns. **Edges** are the roads connecting them. **Conditional edges** are "if traffic, take alternate route."

---

## Core Concepts

```mermaid
flowchart TD
    subgraph LANGGRAPH["LangGraph Architecture"]
        SC["State Graph\n(Application Blueprint)"]
        SC --> NODES["Nodes\n(Functions / Agents)"]
        SC --> EDGES["Edges\n(Connections)"]
        SC --> STATE["State\n(Shared Data)"]
        
        NODES --> N1["Node: Planner\nCreates plan"]
        NODES --> N2["Node: Researcher\nSearches web"]
        NODES --> N3["Node: Writer\nGenerates content"]
        
        EDGES --> E1["Normal Edge\nA → B"]
        EDGES --> E2["Conditional Edge\nRoute based on condition"]
        
        STATE --> S1["AgentState\n{ messages, steps, results }"]
    end

    style SC fill:#8b5cf6,color:#fff
    style NODES fill:#3b82f6,color:#fff
    style EDGES fill:#f59e0b,color:#fff
    style STATE fill:#22c55e,color:#fff
```

| Concept | Description | Example |
|---------|-------------|---------|
| **StateGraph** | The overall application graph | ResearchAgentGraph |
| **Node** | A function that processes state | `planner_node(state)`, `search_node(state)` |
| **Edge** | Connects nodes (A → B) | planner → search |
| **Conditional Edge** | Routes based on conditions | If `state.has_results` → write, else → search |
| **State** | Shared data passed between nodes | `AgentState` with messages, steps, results |
| **Checkpointer** | Persists state for recovery | Save to SQLite/PostgreSQL after each step |
| **Interrupt** | Pause execution for human input | `interrupt_before=["review_node"]` |

---

## Building a Graph: Simple Research Agent

```python
from typing import TypedDict, Literal
from langgraph.graph import StateGraph, END

# 1. Define the state
class AgentState(TypedDict):
    messages: list
    research_results: list
    report: str
    steps_complete: int

# 2. Define node functions
def planner_node(state: AgentState) -> AgentState:
    """Create a research plan."""
    state["steps_complete"] = 0
    state["research_results"] = []
    return state

def search_node(state: AgentState) -> AgentState:
    """Search the web for information."""
    query = state["messages"][-1]  # Last user query
    results = search_web(query)    # Tool call
    state["research_results"] = results
    state["steps_complete"] += 1
    return state

def writer_node(state: AgentState) -> AgentState:
    """Write the final report."""
    state["report"] = generate_report(state["research_results"])
    state["steps_complete"] += 1
    return state

def should_continue(state: AgentState) -> Literal["search", "writer"]:
    """Conditional edge: decide next step."""
    if len(state["research_results"]) < 3:
        return "search"  # Need more research — loop back
    return "writer"      # Enough info — write report

# 3. Build the graph
builder = StateGraph(AgentState)

builder.add_node("planner", planner_node)
builder.add_node("search", search_node)
builder.add_node("writer", writer_node)

builder.set_entry_point("planner")
builder.add_edge("planner", "search")
builder.add_conditional_edges("search", should_continue)
builder.add_edge("writer", END)

# 4. Compile the graph
graph = builder.compile()
```

---

## Graph Execution Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Graph as LangGraph
    participant Node1 as Planner Node
    participant Node2 as Search Node
    participant Node3 as Writer Node
    participant State as State Store

    App->>Graph: run(goal="Research AI trends")
    Graph->>Node1: planner_node(state)
    Node1->>State: Update state (steps=0)
    Node1-->>Graph: Return state
    
    Graph->>Node2: search_node(state)
    Node2->>Node2: Search web for "AI trends 2025"
    Node2->>State: Update state (results=[...])
    Node2-->>Graph: Return state
    
    Graph->>Graph: should_continue(state)
    Note over Graph: Only 1 result, need more → loop
    
    Graph->>Node2: search_node(state) again
    Node2->>Node2: Search for "latest AI breakthroughs"
    Node2->>State: Update state (results=[...])
    Node2-->>Graph: Return state
    
    Graph->>Graph: should_continue(state)
    Note over Graph: 3 results, enough → write
    
    Graph->>Node3: writer_node(state)
    Node3->>State: Update state (report=generated)
    Node3-->>Graph: Return state
    
    Graph-->>App: Return final state with report
```

---

## Advanced Features

```mermaid
flowchart TD
    subgraph FEATURES["LangGraph Advanced Features"]
        CHECK["💾 Checkpointing\nAuto-save after every node"]
        HITL["👤 Human-in-the-Loop\nPause for approval"]
        MEM["🧠 Persistence\nCross-session memory"]
        PAR["⚡ Parallel Execution\nRun nodes simultaneously"]
        TIME["⏱️ Timeout & Retry\nPer-node error handling"]
    end

    CHECK --> EX1["Resume after crash\nAudit trail of all steps"]
    HITL --> EX2["Human reviews code\nbefore execution"]
    MEM --> EX3["Store user preferences\nacross sessions"]
    PAR --> EX4["Search 5 sources\nat the same time"]
    TIME --> EX5["Retry failed API calls\nwith exponential backoff"]

    style FEATURES fill:#3b82f6,color:#fff
```

### Checkpointing Example

```python
from langgraph.checkpoint import SqliteSaver

# Add checkpointing for persistence and recovery
memory = SqliteSaver.from_conn_string("checkpoints.db")
graph = builder.compile(checkpointer=memory)

# Run with a thread ID for session tracking
config = {"configurable": {"thread_id": "user_session_123"}}
result = graph.invoke({"messages": ["Research quantum computing"]}, config)

# Resume after interruption
result = graph.invoke(None, config)  # Continues from last checkpoint
```

---

## Comparison: LangGraph vs LangChain

| Feature | LangChain | LangGraph |
|---------|-----------|-----------|
| **Graph type** | DAG (linear) | State graph (cyclic) |
| **Loops** | ❌ Not supported | ✅ First-class support |
| **State management** | Simple key-value | Typed state, full persistence |
| **Human-in-the-loop** | ❌ Not supported | ✅ Interrupt/resume |
| **Checkpointing** | ❌ None | ✅ Built-in checkpointer |
| **Parallel nodes** | ✅ Simple | ✅ With state merging |
| **Conditional routing** | ❌ Limited | ✅ Full conditional edges |
| **Best for** | Simple chains, RAG | Complex agents, production |

---

## Real Production Examples

| Company | Use Case | Why LangGraph |
|---------|----------|---------------|
| **Research assistant** | Multi-step research with validation | Loops for follow-up searches, human review checkpoint |
| **Customer support** | Ticket resolution with escalation | Conditional routing to specialized agents |
| **Code review bot** | Review, fix, re-review cycle | Loop between coder and reviewer nodes |
| **Medical diagnosis** | Symptom analysis with verification | Interrupt for doctor approval before diagnosis |

---

## Best Practices

1. **Keep nodes focused** — Each node should do one thing: plan, search, write, review
2. **Design state carefully** — The state shape determines everything. Include messages, intermediate results, and metadata
3. **Use checkpointing from day one** — Even in development, it helps with debugging
4. **Add human-in-the-loop for destructive actions** — Always pause before write/delete/deploy operations
5. **Set per-node timeouts** — A stuck API call shouldn't block the entire graph

---

## Common Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| **Too much state** | Slow performance, memory issues | Keep state minimal, only what nodes need |
| **No error handling in nodes** | One node failure crashes the graph | Wrap each node in try/except |
| **Infinite loops** | Graph runs forever | Add max iteration limit in conditional edges |
| **Ignoring checkpointing** | Lost progress on crash | Use checkpointer from the start |
| **Complex state updates** | Hard to debug, race conditions | Keep state updates simple and atomic |

---

## Interview Questions

### Easy

**Q: What is LangGraph and why was it created?**

> LangGraph is a framework for building stateful AI agents with cycles, loops, and human-in-the-loop support. It was created because LangChain could only handle linear chains, but real-world agents need non-linear workflows with loops, branching, and persistence.

**Q: What's the difference between a Node and an Edge in LangGraph?**

> A Node is a function that processes the state (like "search the web" or "generate a report"). An Edge connects nodes — it defines the flow from one node to the next. Conditional edges can route to different nodes based on the current state.

### Intermediate

**Q: How does state flow through a LangGraph application?**

> State is a TypedDict that flows through every node. Each node receives the full state, modifies it, and returns the updated state. The graph manager passes the returned state to the next node. Checkpointing saves the state after every node execution, enabling recovery and audit trails.

### Senior

**Q: Design a LangGraph for an e-commerce customer service agent that can handle returns, refunds, and technical support.**

> **Nodes:** Classifier (routes to return/refund/tech support), Order Lookup, Return Processor, Refund Processor, Tech Support. **Edges:** Classifier → conditional routing. Return → Order Lookup → Human Approval → Return Processor. Refund → Order Lookup → Refund Processor. Tech Support → Troubleshoot → loop or escalate. **State:** messages, order_id, issue_type, resolution. **Human-in-the-loop:** Before processing refunds over $100.

### Staff Engineer

**Q: How would you handle state conflicts in a LangGraph with parallel nodes? E.g., two nodes trying to update the same field.**

> Use **state reducers**. Define how conflicting updates should be merged: `{"field": {"reducer": "concat"}}` for lists, `{"field": {"reducer": "max"}}` for counters, or custom reducer functions. For critical sections, use sequential execution instead of parallel. For truly independent work, ensure each parallel node writes to different state fields.

### System Design

**Q: Design a LangGraph system that can handle 10,000 concurrent agent runs.**

> **Stateless nodes** — Each node is a pure function of state → new state. **Checkpointer** — Use PostgreSQL for checkpoint storage. Shard by thread_id. **Queue** — Each graph run is a job in a task queue. **Workers** — 100 worker processes pull jobs, execute one node, save checkpoint, and return job to queue. **Scaling** — Auto-scale workers based on queue depth. **Timeout** — Per-node timeout of 30 seconds. If exceeded, mark node as failed and route to error handler.

### Architecture

**Q: Compare LangGraph and LangChain architectures. When would you choose one over the other?**

> **LangChain**: Simple, linear, good for chatbots and RAG. Choose when your flow is predictable and doesn't need loops. **LangGraph**: Stateful, cyclic, supports interrupts. Choose when you need multi-step agents, human approval, loops, or complex state management. In practice, most production agent systems should use LangGraph because real-world tasks rarely follow a perfect linear path.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| **LangGraph** | Stateful graph framework for building production AI agents |
| **StateGraph** | Application blueprint with nodes, edges, and state |
| **Nodes** | Functions that process and update state |
| **Edges** | Connections — normal or conditional (routed by logic) |
| **Checkpointing** | Auto-save state after each node for recovery |
| **Human-in-the-loop** | Pause execution for human approval |
| **vs LangChain** | LangChain is linear; LangGraph supports cycles and state |

---

## Navigation

**Previous:** [10 — AI Agent Architectures](/ai/phase-06-ai-agents/10-agent-architectures)

**Next:** [12 — CrewAI](/ai/phase-06-ai-agents/12-crewai)
