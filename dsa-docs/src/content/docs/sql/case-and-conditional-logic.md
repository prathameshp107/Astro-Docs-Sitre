---
title: "CASE & Conditional Logic"
description: "CASE WHEN, IF, COALESCE, NULLIF, and IFNULL — SQL's conditional logic functions explained simply."
sidebar:
  order: 33
---

## CASE & Conditional Logic

SQL has several ways to handle **conditional logic** — think of them as "if/then/else" for your queries.

### Real-World Analogy

Think of a **school report card**:

- **CASE WHEN**: "If score >= 90 → A, if score >= 80 → B, else → C"
- **COALESCE**: "If the student has a nickname, use it; otherwise use their full name"
- **NULLIF**: "If their old and new addresses are the same, don't bother updating"

### CASE WHEN — The SQL If/Else

```sql
SELECT name, salary,
    CASE
        WHEN salary >= 90000 THEN 'Senior'
        WHEN salary >= 70000 THEN 'Mid-level'
        WHEN salary >= 50000 THEN 'Junior'
        ELSE 'Entry'
    END AS level
FROM employees;
```

```text
┌────────┬────────┬───────────┐
│ name   │ salary │ level     │
├────────┼────────┼───────────┤
│ Alice  │ 95000  │ Senior    │
│ Bob    │ 75000  │ Mid-level │
│ Carol  │ 55000  │ Junior    │
│ David  │ 35000  │ Entry     │
└────────┴────────┴───────────┘
```

### CASE with GROUP BY

```sql
SELECT
    CASE
        WHEN salary >= 90000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_range,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY salary_range
ORDER BY avg_salary DESC;
```

### CASE in WHERE, ORDER BY, and UPDATE

```sql
-- CASE in WHERE
SELECT name, salary
FROM employees
WHERE
    CASE WHEN department = 'Engineering' THEN salary > 80000
         WHEN department = 'Marketing' THEN salary > 60000
         ELSE salary > 50000
    END;

-- CASE in ORDER BY (custom sort order)
SELECT name, status
FROM tasks
ORDER BY
    CASE status
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
        ELSE 5
    END;

-- CASE in UPDATE
UPDATE employees
SET bonus = CASE
    WHEN salary > 100000 THEN salary * 0.20
    WHEN salary > 70000 THEN salary * 0.15
    ELSE salary * 0.10
END;
```

### CASE with Multiple Conditions

```sql
SELECT name, department, salary,
    CASE
        WHEN department = 'Engineering' AND salary > 80000 THEN 'Star Engineer'
        WHEN department = 'Engineering' THEN 'Engineer'
        WHEN department = 'Marketing' AND salary > 70000 THEN 'Senior Marketer'
        WHEN department = 'Marketing' THEN 'Marketer'
        ELSE 'Other'
    END AS role_label
FROM employees;
```

### Simple CASE vs Searched CASE

```sql
-- Simple CASE (checks equality)
CASE department
    WHEN 'Engineering' THEN 'Tech'
    WHEN 'Marketing' THEN 'Growth'
    ELSE 'Other'
END

-- Searched CASE (checks any condition)
CASE
    WHEN salary > 100000 THEN 'High'
    WHEN salary > 50000 THEN 'Medium'
    ELSE 'Low'
END
```

### COALESCE — First Non-NULL Value

```sql
SELECT name,
    COALESCE(nickname, first_name, 'Unknown') AS display_name
FROM employees;
-- If nickname exists → use it
-- If not, try first_name
-- If that's also NULL → use 'Unknown'
```

### NULLIF — Return NULL if Two Values Equal

```sql
SELECT name, salary,
    NULLIF(salary, 0) AS non_zero_salary
FROM employees;
-- If salary = 0, returns NULL (to avoid division by zero later)
```

### IFNULL — Simpler Version of COALESCE (MySQL)

```sql
SELECT name,
    IFNULL(nickname, first_name) AS display_name
FROM employees;
-- Same as COALESCE with 2 arguments
```

### Practical Examples

```sql
-- 1. Categorize by date range
SELECT name, hire_date,
    CASE
        WHEN hire_date < '2020-01-01' THEN 'Veteran'
        WHEN hire_date < '2022-01-01' THEN 'Senior'
        WHEN hire_date < '2024-01-01' THEN 'Junior'
        ELSE 'New Hire'
    END AS tenure
FROM employees;

-- 2. Pivot table with CASE
SELECT department,
    SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS male_count,
    SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS female_count
FROM employees
GROUP BY department;

-- 3. Safe division (avoid divide by zero)
SELECT name,
    revenue / NULLIF(employees, 0) AS revenue_per_employee
FROM departments;

-- 4. Conditional aggregation
SELECT
    SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) AS completed_revenue,
    SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending_revenue
FROM orders;
```

---

### In Simple Words

- **CASE WHEN** is SQL's if/then/else — use it to create conditional columns
- **COALESCE** returns the first non-NULL value — great for fallback defaults
- **NULLIF** returns NULL when two values are equal — useful for safe division
- **CASE in ORDER BY** lets you define a custom sort order (like priority: critical > high > medium)
- **CASE in GROUP BY** is powerful for creating custom buckets/ranges
