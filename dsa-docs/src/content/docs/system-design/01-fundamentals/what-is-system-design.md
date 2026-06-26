---
title: "What is System Design?"
description: "High-level design vs low-level design, why system design matters for interviews and real-world engineering."
sidebar:
  order: 1
---

# What is System Design?

> System design is the process of defining the architecture, components, modules, and data flow of a system to satisfy specific requirements.

**Analogy — Building a house:**

- **Low-Level Design (LLD)** = deciding which bricks, the electrical wiring diagram, the pipe diameter — the details.
- **High-Level Design (HLD)** = deciding how many floors, where the kitchen goes, where the windows face — the big picture.

System design interviews test **HLD** — can you architect a system that serves millions of users?

---

## HLD vs LLD

| Aspect | High-Level Design (HLD) | Low-Level Design (LLD) |
|--------|------------------------|------------------------|
| Scope | Overall architecture | Component-level details |
| Who | Architects, senior engineers | Individual developers |
| Output | Block diagrams, tech choices | Class diagrams, API specs, DB schemas |
| Interview | System design rounds (whiteboard) | Coding rounds (implement a feature) |
| Time | 30-60 min discussion | Hours to days |

---

## Why It Matters

**For interviews:** Every top tech company (Google, Meta, Amazon, Microsoft) has system design rounds for mid-to-senior positions. It tests your ability to think at scale.

**For real-world engineering:** Without good system design, you get:
- A site that crashes under load (fail)
- Wasted money on over-provisioned servers (cost)
- Impossible-to-change spaghetti architecture (maintenance)

---

## Key Quality Attributes

When designing systems, these are the qualities you optimize for:

| Attribute | What It Means |
|-----------|---------------|
| **Scalability** | Can the system handle more users? |
| **Availability** | Is the system up when users need it? |
| **Latency** | How fast does it respond? |
| **Consistency** | Do all users see the same data? |
| **Durability** | Is data safe if a server crashes? |
| **Fault Tolerance** | Does the system survive failures? |
| **Maintainability** | Can engineers easily update it? |

---

## Trade-offs

- Every design choice is a trade-off. **Consistency vs availability.** **Latency vs throughput.** **Cost vs reliability.**
- There's no perfect system — only the right system for your constraints.

---

## In Simple Words

- System design = planning how a large software system is built before coding it.
- HLD is the big picture (what servers, databases, caches to use). LLD is the details (exact code, queries, classes).
- Every choice trades one quality for another — good designers understand these trade-offs.
