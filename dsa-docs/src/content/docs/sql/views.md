---
title: "Views"
description: "-- Use view like a table SELECT FROM employeesummary WHERE deptname = 'Engineering'; SELECT deptname, AVG(salary) FROM employeesummary GROUP BY deptname;"
---

## 11. Views

### What is a View?
A **view** is a virtual table based on a SQL query. It doesn't store data — it's a saved query.

```sql
-- Create view
CREATE VIEW employee_summary AS
SELECT
    e.id,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    d.dept_name,
    e.salary,
    CASE
        WHEN e.salary >= 90000 THEN 'Senior'
        WHEN e.salary >= 70000 THEN 'Mid-level'
        ELSE 'Junior'
    END AS level
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- Use view like a table
SELECT * FROM employee_summary WHERE dept_name = 'Engineering';
SELECT dept_name, AVG(salary) FROM employee_summary GROUP BY dept_name;

-- Update view
CREATE OR REPLACE VIEW employee_summary AS ...;

-- Drop view
DROP VIEW employee_summary;
```

### Updatable vs Non-Updatable Views

A view is **updatable** (INSERT/UPDATE/DELETE allowed) if it:
- Doesn't use `DISTINCT`, `GROUP BY`, `HAVING`, `UNION`
- Doesn't use aggregate functions
- References only one table

```sql
-- WITH CHECK OPTION — prevents INSERT/UPDATE that would make row invisible
CREATE VIEW high_earners AS
SELECT * FROM employees WHERE salary > 80000
WITH CHECK OPTION;

UPDATE high_earners SET salary = 50000 WHERE id = 1;
-- ❌ Error: fails CHECK OPTION (row would no longer be visible in view)
```

### Use Cases for Views
- **Security:** expose only certain columns to users
- **Simplicity:** hide complex joins from application layer
- **Compatibility:** rename/reshape tables without changing apps

---