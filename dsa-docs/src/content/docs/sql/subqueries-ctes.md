---
title: "Subqueries & CTEs"
description: "-- Row subquery SELECT FROM employees WHERE (deptid, salary) = (SELECT deptid, MAX(salary) FROM employees WHERE deptid = 1);"
sidebar:
  order: 25
---

## 15. Subqueries & CTEs

### Subqueries

```sql
-- Scalar subquery (returns single value)
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Row subquery
SELECT * FROM employees
WHERE (dept_id, salary) = (SELECT dept_id, MAX(salary) FROM employees WHERE dept_id = 1);

-- Table subquery (derived table)
SELECT dept_id, avg_sal
FROM (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY dept_id
) AS dept_averages
WHERE avg_sal > 75000;

-- Correlated subquery (references outer query — runs once per row)
SELECT e1.name, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.dept_id = e1.dept_id  -- ← references outer e1
);

-- EXISTS (check if subquery returns any rows)
SELECT name FROM employees e
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.emp_id = e.id
);

-- NOT EXISTS
SELECT name FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.emp_id = e.id
);

-- IN vs EXISTS
-- IN: better for small subquery results
-- EXISTS: better for large tables (short-circuits on first match)
```

### CTEs (Common Table Expressions)

```sql
-- Basic CTE (WITH clause)
WITH dept_avg AS (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_salary
FROM employees e
JOIN dept_avg d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_salary;

-- Multiple CTEs
WITH
high_earners AS (
    SELECT * FROM employees WHERE salary > 80000
),
engineering AS (
    SELECT * FROM departments WHERE dept_name = 'Engineering'
)
SELECT h.name, h.salary
FROM high_earners h
JOIN engineering e ON h.dept_id = e.dept_id;

-- Recursive CTE (org chart / hierarchy)
WITH RECURSIVE org_chart AS (
    -- Anchor: CEO (no manager)
    SELECT id, name, manager_id, 0 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: employees who report to someone in org_chart
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT REPEAT('  ', level) || name AS hierarchy, level
FROM org_chart
ORDER BY level, name;
```

### CTE vs Subquery

| Feature | Subquery | CTE |
|---|---|---|
| Readability | ❌ Can get deeply nested | ✅ Much cleaner |
| Reuse in same query | ❌ Must repeat | ✅ Reference multiple times |
| Recursive | ❌ No | ✅ Yes |
| Performance | Similar | Similar (materialized in some cases) |

---