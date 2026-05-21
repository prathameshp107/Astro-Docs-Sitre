---
title: "CROSS JOIN"
description: "!useState diagram"
sort: 11
---

## 5. CROSS JOIN

### What it does
Produces the **Cartesian product** — every row in the left table is paired with every row in the right table. There is no `ON` condition. With 4 employees and 3 departments, the result is `4 × 3 = 12` rows.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/cross-join.svg)


### SQL
```sql
SELECT e.name, d.dept_name
FROM employees e
CROSS JOIN departments d;
```

### Output size rule
`rows_in_A × rows_in_B = output rows`

**Warning:** On large tables, CROSS JOINs are extremely expensive. A table of 1,000 rows crossed with another 1,000-row table yields 1,000,000 rows.

### Real-world use cases
- Generating all possible combinations (e.g., size × color for product variants)
- Creating test data
- Building a calendar — cross joining a list of dates with a list of time slots

---