---
title: "JOIN Conditions & Pitfalls"
description: "---"
---

## 8. JOIN Conditions & Pitfalls

### Non-equi joins
Joins don't have to use `=`. Any comparison operator works:
```sql
-- Find employees whose salary falls within a salary band
SELECT e.name, sb.band_name
FROM employees e
JOIN salary_bands sb ON e.salary BETWEEN sb.min_sal AND sb.max_sal;
```

### Multiple conditions
You can combine conditions with `AND`:
```sql
SELECT e.name, p.project_name
FROM employees e
JOIN assignments a ON e.id = a.employee_id AND a.active = 1
JOIN projects p ON a.project_id = p.id;
```

### NULL behavior
`NULL` never equals anything — not even another `NULL`. This matters in joins:
```sql
-- This join will NEVER match Carol (dept_id = NULL)
ON e.dept_id = d.dept_id  -- NULL = anything → UNKNOWN → no match
```

### Performance tips
- Always join on **indexed columns**. Foreign keys should have indexes.
- Filter early: push `WHERE` conditions as close to the source tables as possible.
- Avoid joining on expressions: `ON YEAR(e.hire_date) = 2020` cannot use an index. Instead, filter with `WHERE` after joining.

---