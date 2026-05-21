---
title: "EXPLAIN & Query Optimization"
description: "EXPLAIN output columns:"
sort: 26
---

## 16. EXPLAIN & Query Optimization

### Understanding EXPLAIN

```sql
EXPLAIN SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > 70000;
```

**EXPLAIN output columns:**

| Column | Meaning |
|---|---|
| `id` | Query step ID |
| `select_type` | SIMPLE, SUBQUERY, DERIVED, UNION |
| `table` | Table being accessed |
| `type` | Access type (best → worst) |
| `possible_keys` | Indexes that could be used |
| `key` | Index actually used |
| `key_len` | Length of index used |
| `rows` | Estimated rows examined |
| `filtered` | % of rows after WHERE filter |
| `Extra` | Additional info |

### Access Types (type column) — Best to Worst

```
system   → single row in MyISAM/MEMORY (best)
const    → at most one matching row (PK/unique lookup)
eq_ref   → one row per join row (PK/unique join)
ref      → multiple rows per join (non-unique index)
range    → index range scan (BETWEEN, <, >, IN)
index    → full index scan (better than ALL)
ALL      → full table scan (WORST — avoid!)
```

```sql
-- Use EXPLAIN ANALYZE (MySQL 8.0.18+) for actual execution stats
EXPLAIN ANALYZE SELECT * FROM employees WHERE dept_id = 1;

-- Use FORMAT=JSON for more detail
EXPLAIN FORMAT=JSON SELECT * FROM employees WHERE salary > 50000;
```

### Reading EXPLAIN — Red Flags

```sql
-- ❌ BAD: type = ALL (full table scan)
EXPLAIN SELECT * FROM employees WHERE YEAR(hire_date) = 2020;

-- ✅ FIX: use range condition for index
EXPLAIN SELECT * FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2020-12-31';

-- ❌ BAD: Extra = "Using filesort" on large tables
EXPLAIN SELECT * FROM employees ORDER BY salary;
-- Fix: Add index on salary

-- ❌ BAD: Extra = "Using temporary"
EXPLAIN SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id;
-- Fix: Add index on dept_id
```

---