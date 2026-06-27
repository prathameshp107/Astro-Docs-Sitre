---
title: "Object Relationships"
description: "Understanding how objects relate to each other — association, aggregation, composition, and dependency."
sidebar:
  order: 1
---

# Object Relationships

## Introduction

Objects in a system don't exist in isolation — they **relate to each other**. Understanding object relationships is crucial for designing flexible, maintainable systems.

---

## Relationship Types

| Type | Strength | Lifetime | UML Symbol | Example |
|------|----------|----------|------------|---------|
| **Association** | Weakest | Independent | Simple arrow | Teacher → Student |
| **Aggregation** | Weak | Independent | Empty diamond ◊ | Department → Teachers |
| **Composition** | Strong | Dependent | Filled diamond ◆ | House → Rooms |
| **Dependency** | Weakest (temporary) | Temporary | Dashed arrow | OrderService → PaymentService |

---

## Visual Overview

```mermaid
graph TD
    A[Class A] --o|Aggregation<br/>Weak has-a| B[Part B]
    A --*|Composition<br/>Strong has-a| C[Part C]
    A -.->|Dependency<br/>Uses temporarily| D[Service D]
    A -->|Association<br/>Knows about| E[Related E]
```

---

## Topics in This Section

| Topic | Description |
|-------|-------------|
| [Association](/DSA-Notes-Problems/oops/04-object-relationships/association) | Objects knowing about each other |
| [Aggregation](/DSA-Notes-Problems/oops/04-object-relationships/aggregation) | Weak has-a relationship |
| [Composition](/DSA-Notes-Problems/oops/04-object-relationships/composition) | Strong has-a relationship |
| [Dependency](/DSA-Notes-Problems/oops/04-object-relationships/dependency) | Using other objects |
| [Coupling vs Cohesion](/DSA-Notes-Problems/oops/04-object-relationships/coupling-vs-cohesion) | Measuring code quality |

---

**Previous Topic:** [Polymorphism →](/DSA-Notes-Problems/oops/03-four-pillars/polymorphism/)
**Next Topic:** [Association →](/DSA-Notes-Problems/oops/04-object-relationships/association)
