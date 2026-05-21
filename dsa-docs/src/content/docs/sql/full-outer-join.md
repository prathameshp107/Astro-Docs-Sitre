---
title: "FULL OUTER JOIN"
description: "!useState diagram"
---

## 4. FULL OUTER JOIN

### What it does
Returns **all rows from both tables**. Where there is no match on either side, the missing columns are `NULL`. It is the union of LEFT JOIN and RIGHT JOIN.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/full-outer-join.svg)

### SQL (Standard — PostgreSQL, SQL Server, Oracle)
```sql
SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id;
```

### SQL (MySQL workaround — MySQL does not support FULL OUTER JOIN)
```sql
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id

UNION

SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;
```
> `UNION` (without `ALL`) deduplicates rows, so matching rows (Alice, Bob) appear only once.

### Result
| name  | dept_name   |
|-------|-------------|
| Alice | Engineering |
| Bob   | Marketing   |
| Carol | NULL        |
| David | NULL        |
| NULL  | Finance     |

### When to use FULL OUTER JOIN
Use it when doing **data reconciliation** — finding rows that exist in one source but not the other. Adding a `WHERE` clause makes it a powerful mismatch detector:

```sql
-- Find employees with no department AND departments with no employees
SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id
WHERE e.dept_id IS NULL OR d.dept_id IS NULL;
```

---