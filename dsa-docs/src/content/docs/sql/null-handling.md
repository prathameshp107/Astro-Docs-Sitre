---
title: "NULL Handling"
description: "How NULL behaves in SQL — comparisons, aggregates, joins, and common traps. NULL is not zero, not empty string — it's unknown."
sidebar:
  order: 34
---

## NULL Handling

NULL is SQL's way of saying **"I don't know"** or **"no value"**. It's not zero, not an empty string — it's **unknown**.

### Real-World Analogy

Think of a **sign-up form**:

| Column | Value | Meaning |
|--------|-------|---------|
| `name` | "Alice" | Known value ✅ |
| `phone` | "" | Empty string — she entered nothing ❓ |
| `age` | NULL | She didn't answer — we don't know ❓ |

NULL means **the value is unknown**, not that the value is zero, empty, or false.

### NULL in Comparisons

**NULL is not equal to anything — not even NULL!**

```sql
SELECT NULL = NULL;   -- Result: NULL (not TRUE!)
SELECT NULL <> NULL;  -- Result: NULL
SELECT NULL = 0;      -- Result: NULL
SELECT NULL = '';     -- Result: NULL
SELECT NULL IS NULL;  -- Result: TRUE ✅ (use IS NULL!)
```

```text
NULL = NULL → UNKNOWN (not TRUE!)
NULL > 5   → UNKNOWN
NULL + 5   → NULL
```

> 💡 **Any comparison with NULL returns NULL** (which is treated as FALSE in WHERE clauses).

### Checking for NULL

```sql
-- ✅ Correct: Use IS NULL / IS NOT NULL
SELECT * FROM employees WHERE phone IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;

-- ❌ Wrong: Can't use = NULL or != NULL
SELECT * FROM employees WHERE phone = NULL;   -- returns no rows!
SELECT * FROM employees WHERE phone != NULL;  -- returns no rows!
```

### NULL in WHERE Clauses

```sql
-- Find employees who DON'T have a manager
SELECT name, manager_id
FROM employees
WHERE manager_id IS NULL;  -- ✅ correct

-- ❌ This returns nothing!
SELECT name, manager_id
FROM employees
WHERE manager_id = NULL;
```

### NULL in Aggregates

**Aggregate functions ignore NULL values — except COUNT(*)!**

```sql
-- Sample data: salaries = [90000, 80000, NULL, 75000, NULL]

SELECT COUNT(*)      FROM employees;  -- 5  (counts ALL rows)
SELECT COUNT(salary) FROM employees;  -- 3  (ignores NULLs)
SELECT AVG(salary)   FROM employees;  -- 81666 (90000+80000+75000)/3, NOT /5
SELECT SUM(salary)   FROM employees;  -- 245000
SELECT MAX(salary)   FROM employees;  -- 90000
SELECT MIN(salary)   FROM employees;  -- 75000 (ignores NULL)
```

**Important trap:**

```sql
-- If all values are NULL:
SELECT AVG(salary) FROM employees WHERE 1=0;  -- Returns NULL!
SELECT SUM(salary) FROM employees WHERE 1=0;  -- Returns NULL!
SELECT COUNT(*)    FROM employees WHERE 1=0;  -- Returns 0  (only COUNT(*) returns 0)
```

### NULL in JOINs

```sql
-- INNER JOIN excludes rows with NULL on the join key
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;
-- ❌ Employees with NULL dept_id are EXCLUDED
```

```mermaid
flowchart LR
    subgraph Employees[employees table]
        E1[Alice | dept_id: 1]
        E2[Bob | dept_id: 2]
        E3[Carol | dept_id: NULL]
    end
    
    subgraph Departments[departments table]
        D1[1: Engineering]
        D2[2: Marketing]
    end
    
    E1 -->|JOIN ON dept_id| D1
    E2 -->|JOIN ON dept_id| D2
    E3 -.->|NULL can't match| X[❌ Excluded from INNER JOIN]
    
    style E1 fill:#3b82f6,color:#fff
    style E2 fill:#3b82f6,color:#fff
    style E3 fill:#ef4444,color:#fff
    style X fill:#ef4444,color:#fff
```

### NOT IN Trap with NULL

```sql
-- ❌ Dangerous: NOT IN with NULL in subquery returns NOTHING!
SELECT name FROM employees
WHERE dept_id NOT IN (SELECT dept_id FROM departments);
-- If any dept_id in departments is NULL, the whole query returns 0 rows!

-- Why? WHERE dept_id NOT IN (1, 2, NULL)
--     → dept_id != 1 AND dept_id != 2 AND dept_id != NULL
--     → dept_id != NULL is UNKNOWN (not TRUE)
--     → So the whole WHERE is UNKNOWN for every row!

-- ✅ Safe alternative: use NOT EXISTS
SELECT name FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM departments d WHERE d.dept_id = e.dept_id
);
```

### Handling NULL Safely

```sql
-- COALESCE: replace NULL with a default
SELECT name, COALESCE(salary, 0) AS salary
FROM employees;
-- If salary is NULL, show 0 instead

SELECT name, COALESCE(phone, 'No phone') AS phone
FROM employees;
-- If phone is NULL, show 'No phone'

-- IFNULL (MySQL-specific)
SELECT name, IFNULL(salary, 0) AS salary FROM employees;

-- NULLIF: return NULL if two values are equal
SELECT NULLIF(0, 0);    -- NULL
SELECT NULLIF(5, 0);    -- 5

-- Safe division
SELECT name, 
    revenue / NULLIF(employees, 0) AS revenue_per_emp
FROM departments;
```

### NULL in ORDER BY

```sql
-- NULLs sort last by default in MySQL (ASC)
SELECT name, manager_id
FROM employees
ORDER BY manager_id ASC;
-- NULLs come at the end

-- Control NULL position
SELECT name, manager_id
FROM employees
ORDER BY manager_id IS NULL, manager_id;
-- NULLs first (IS NULL = 1, IS NOT NULL = 0)
```

---

### In Simple Words

- **NULL means "unknown"**, not zero, empty, or false
- **NULL = NULL is FALSE** — always use `IS NULL` to check
- **Aggregates ignore NULL** — `AVG()`, `SUM()`, `COUNT(column)` skip NULLs
- **NOT IN with a NULL subquery** returns NO rows — use `NOT EXISTS` instead
- **INNER JOIN excludes NULLs** on the join key — use `LEFT JOIN` to keep them
- Use `COALESCE` to provide defaults for NULL values
