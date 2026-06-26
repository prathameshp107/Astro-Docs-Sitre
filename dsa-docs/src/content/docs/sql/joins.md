---
title: "Joins"
description: "---"
sidebar:
  order: 6
---

## 6. Joins

# SQL Joins — Complete Visual Guide

---

## Setup: The Sample Data

Before diving in, here are the two tables used throughout all examples. Refer back here whenever you need to trace a result.

### The Six Joins at a Glance

```mermaid
flowchart TB
    subgraph Joins[The Six SQL JOIN Types]
        IJ["INNER JOIN<br/>✅ Only matched rows<br/>from BOTH tables"]
        LJ["LEFT JOIN<br/>✅ ALL left rows<br/>NULL on right if no match"]
        RJ["RIGHT JOIN<br/>✅ ALL right rows<br/>NULL on left if no match"]
        FOJ["FULL OUTER JOIN<br/>✅ ALL rows from BOTH<br/>NULL on missing side<br/>⛔ MySQL: use UNION"]
        CJ["CROSS JOIN<br/>✅ Every A × B combination<br/>(Cartesian product)"]
        SJ["SELF JOIN<br/>✅ Table joined to itself<br/>(employee ↔ manager)"]
    end
    
    style IJ fill:#7c3aed,color:#fff
    style LJ fill:#3b82f6,color:#fff
    style RJ fill:#059669,color:#fff
    style FOJ fill:#f59e0b,color:#fff
    style CJ fill:#ec4899,color:#fff
    style SJ fill:#06b6d4,color:#fff
```

---

### Sample Data Setup

```mermaid
erDiagram
    employees {
        int id PK
        string name
        int dept_id FK
        int manager_id
    }
    departments {
        int dept_id PK
        string dept_name
    }
    employees ||--o{ departments : "belongs to"
```

```
Table A — employees                    Table B — departments
┌────┬────────┬─────────┬────────────┐  ┌─────────┬────────────┐
│ id │  name  │ dept_id │ manager_id │  │ dept_id │  dept_name │
├────┼────────┼─────────┼────────────┤  ├─────────┼────────────┤
│  1 │ Alice  │    1    │    NULL    │  │    1    │ Engineering│
│  2 │ Bob    │    2    │      1     │  │    2    │  Marketing │
│  3 │ Carol  │   NULL  │      1     │  │    3    │   Finance  │
│  4 │ David  │    4    │      2     │  └─────────┴────────────┘
└────┴────────┴─────────┴────────────┘
```

**Three edge cases that matter:**
- `Carol` has `dept_id = NULL` — she has no department assigned
- `David` has `dept_id = 4` — that department does not exist in the departments table
- `Finance` (dept_id 3) has no employees assigned to it

These three cases determine what each join type includes or excludes.

---