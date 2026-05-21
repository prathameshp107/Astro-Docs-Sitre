---
title: "Exclusion Joins (Anti-Joins)"
description: "These are not a separate join type — they're a pattern built on top of LEFT or FULL OUTER JOIN. The goal is to find rows that have no match in the other ta"
sidebar:
  order: 13
---

## 7. Exclusion Joins (Anti-Joins)

These are not a separate join type — they're a pattern built on top of LEFT or FULL OUTER JOIN. The goal is to find rows that have **no match** in the other table.

### Find employees with no department
```sql
SELECT e.name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;
-- Result: Carol, David
```

### Find departments with no employees
```sql
SELECT d.dept_name
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.dept_id
WHERE e.id IS NULL;
-- Result: Finance
```

![useState diagram](/DSA-Notes-Problems/assets/sql/exclusion-join.svg)


> **How it works:** After a LEFT JOIN, rows with no match on the right side have `NULL` for all right-table columns. Filtering `WHERE right_table.id IS NULL` isolates exactly those unmatched rows.

---