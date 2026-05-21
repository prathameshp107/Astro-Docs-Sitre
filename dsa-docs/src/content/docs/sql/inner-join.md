---
title: "INNER JOIN"
description: "Think of it as the strictest join — it requires both sides to agree."
---

## 1. INNER JOIN

### What it does
Returns **only the rows where a match exists in both tables**. Any row in either table that has no matching row in the other table is completely dropped from the result.

Think of it as the **strictest** join — it requires both sides to agree.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/inner-join-svg.svg)


### SQL
```sql
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;
```

### Result
| name  | dept_name   |
|-------|-------------|
| Alice | Engineering |
| Bob   | Marketing   |

### Why Carol and David are excluded
- **Carol**: her `dept_id` is `NULL`. In SQL, `NULL = 1` is not `TRUE` — it is `UNKNOWN`. The `ON` clause requires `TRUE`, so Carol never matches any department row.
- **David**: his `dept_id = 4`, but no row in the departments table has `dept_id = 4`. No match → excluded.
- **Finance** (dept_id 3): no employee has `dept_id = 3`. No match → excluded from the result.

### When to use INNER JOIN
Use it when you **only care about records that have complete data on both sides** — e.g., orders with valid customers, employees with valid departments.

---