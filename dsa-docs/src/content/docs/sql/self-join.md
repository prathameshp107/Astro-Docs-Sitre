---
title: "SELF JOIN"
description: "!useState diagram"
sort: 12
---

## 6. SELF JOIN

### What it does
Joins a table **with itself**. You use table aliases to treat the same table as if it were two separate tables. This is essential for hierarchical or recursive data like org charts, category trees, or social networks.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/self-join.svg)


### SQL
```sql
-- Find each employee and their manager's name
SELECT
    e.name   AS employee,
    m.name   AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

### Result
| employee | manager |
|----------|---------|
| Alice    | NULL    |
| Bob      | Alice   |
| Carol    | Alice   |
| David    | Bob     |

### How it works
The key is aliasing the same table twice — `e` for "the employee row" and `m` for "the manager row." The join condition `e.manager_id = m.id` follows the reference from the employee's `manager_id` back to another row in the same table.

We use a `LEFT JOIN` (not `INNER JOIN`) so that Alice (who has no manager) still appears in the result with `NULL`.

### Other self-join use cases
- **Category trees**: `parent_id` references `id` in the same categories table
- **Friend networks**: `user_id` and `friend_id` both reference the `users` table
- **Version chains**: each record has a `previous_version_id` pointing to an earlier row

---