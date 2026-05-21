---
title: "Choosing the Right Join — Decision Guide"
description: "Are you working with one table that references itself? └─ Yes → SELF JOIN (with LEFT or INNER depending on above)"
sidebar:
  order: 16
---

## 10. Choosing the Right Join — Decision Guide

```
Do you need rows even when there's no match?
│
├─ No  →  INNER JOIN
│          (strictest, only full matches)
│
└─ Yes →  Which side must always appear?
           │
           ├─ Left table only  →  LEFT JOIN  (most common)
           │
           ├─ Right table only →  RIGHT JOIN (or rewrite as LEFT JOIN)
           │
           └─ Both sides       →  FULL OUTER JOIN

Are you working with one table that references itself?
└─ Yes  →  SELF JOIN  (with LEFT or INNER depending on above)

Do you need every possible combination?
└─ Yes  →  CROSS JOIN  (use with caution on large tables)

Do you need rows that do NOT match?
└─ Yes  →  Anti-Join pattern  (LEFT JOIN + WHERE right.id IS NULL)
```

---

> **Interview Tip:** When asked about joins, trace through the edge cases — `NULL` department, missing department ID, and a department with no employees. Interviewers specifically want to see you understand how `NULL` interacts with join conditions, not just the textbook definition.---