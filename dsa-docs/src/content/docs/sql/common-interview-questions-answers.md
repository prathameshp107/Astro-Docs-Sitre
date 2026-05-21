---
title: "Common Interview Questions & Answers"
description: "---"
sort: 28
---

## 18. Common Interview Questions & Answers

---

### Q1: What is the difference between DELETE, TRUNCATE, and DROP?

| | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Type | DML | DDL | DDL |
| WHERE clause | ✅ Yes | ❌ No | ❌ No |
| Rollback | ✅ Yes | ❌ No (mostly) | ❌ No |
| Triggers | ✅ Fires | ❌ No | ❌ No |
| AUTO_INCREMENT reset | ❌ No | ✅ Yes | N/A |
| Removes structure | ❌ No | ❌ No | ✅ Yes |
| Speed | Slow (row by row) | Fast | Instant |

---

### Q2: Find the second highest salary.

```sql
-- Method 1: LIMIT + OFFSET
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Method 2: Subquery
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 3: DENSE_RANK (handles ties, nth salary)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr
    FROM employees
) t WHERE dr = 2;
```

---

### Q3: Find duplicate records in a table.

```sql
-- Find duplicate emails
SELECT email, COUNT(*) AS cnt
FROM employees
GROUP BY email
HAVING cnt > 1;

-- Get full rows of duplicates
SELECT * FROM employees
WHERE email IN (
    SELECT email FROM employees GROUP BY email HAVING COUNT(*) > 1
)
ORDER BY email;

-- Delete duplicates (keep the lowest id)
DELETE FROM employees
WHERE id NOT IN (
    SELECT MIN(id) FROM employees GROUP BY email
);
```

---

### Q4: What is the difference between UNION and UNION ALL?

```sql
-- UNION removes duplicates (slower — sorts result)
SELECT name FROM employees
UNION
SELECT name FROM contractors;

-- UNION ALL keeps duplicates (faster)
SELECT name FROM employees
UNION ALL
SELECT name FROM contractors;

-- Rules: same number of columns, compatible data types
```

---

### Q5: What are the different types of indexes in MySQL?

```
B-Tree Index    → default, for =, <, >, BETWEEN, LIKE 'abc%'
Hash Index      → exact lookups only (MEMORY engine)
Full-Text Index → text search with MATCH...AGAINST
Spatial Index   → geospatial data (GIS)
Covering Index  → includes all query columns
Composite Index → multi-column B-Tree index
```

---

### Q6: Explain GROUP BY with HAVING vs WHERE.

```sql
-- WHERE filters rows BEFORE grouping
-- HAVING filters AFTER grouping

SELECT dept_id, AVG(salary) AS avg_sal
FROM employees
WHERE hire_date > '2020-01-01'    -- ← WHERE: filter rows first
GROUP BY dept_id
HAVING avg_sal > 70000;           -- ← HAVING: filter groups after
```

---

### Q7: What is a self-join? Give an example.

```sql
-- Find all employees and their direct managers
SELECT
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
-- LEFT JOIN ensures employees without managers (CEO) are included
```

---

### Q8: Difference between CHAR and VARCHAR?

```
CHAR(10)    → always stores 10 bytes (padded with spaces)
             → faster for fixed-length data
             → e.g., country_code CHAR(2), uuid CHAR(36)

VARCHAR(10) → stores only actual length + 1-2 length bytes
             → better for variable-length data
             → e.g., name VARCHAR(100), email VARCHAR(255)
```

---

### Q9: What is a covering index?

A covering index is one that **contains all the columns needed** by a query — MySQL can answer the query purely from the index without reading the actual table rows. Look for `Using index` in EXPLAIN.

```sql
CREATE INDEX idx_covering ON employees(dept_id, salary, name);
SELECT name, salary FROM employees WHERE dept_id = 1;
-- EXPLAIN shows: Using index ← no table access needed
```

---

### Q10: What happens when you execute a SELECT query in MySQL?

```
1. Client sends SQL to MySQL server
2. Parser checks syntax, creates parse tree
3. Preprocessor checks semantics (tables exist, permissions)
4. Query Optimizer generates execution plan (cost-based)
5. Execution Engine executes the plan
6. Storage Engine (InnoDB) reads/fetches data
7. Result sent back to client
```

---

### Q11: Difference between correlated and non-correlated subquery?

```sql
-- Non-correlated: inner query runs ONCE
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Correlated: inner query runs ONCE PER ROW of outer query
SELECT name FROM employees e1
WHERE salary > (
    SELECT AVG(salary) FROM employees e2
    WHERE e2.dept_id = e1.dept_id  -- ← references outer
);
-- Can be slow — consider rewriting with JOIN or CTE
```

---

### Q12: How do you optimize a slow query?

```
Step-by-step approach:
1. Run EXPLAIN / EXPLAIN ANALYZE to inspect execution plan
2. Check type column — avoid ALL (full table scan)
3. Add/fix indexes on WHERE, JOIN, ORDER BY columns
4. Avoid functions on indexed columns in WHERE
5. Rewrite subqueries as JOINs where possible
6. Use LIMIT to reduce result set
7. Check for N+1 query problems
8. Review schema design (data types, normalization)
9. Check slow query log for patterns
10. Consider caching for repeated read-heavy queries
```

---

### Q13: What is the difference between NOW() and CURRENT_TIMESTAMP?

```sql
NOW()               -- returns datetime at start of statement
CURRENT_TIMESTAMP   -- synonym for NOW()
SYSDATE()           -- returns datetime at moment of execution
                    -- (matters inside long stored procedures)

SELECT NOW(), SYSDATE();
-- In most cases they return the same value
-- Difference shows inside long-running SP or trigger
```

---

### Q14: How to get employees not in any department?

```sql
-- Method 1: LEFT JOIN + IS NULL
SELECT e.*
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;

-- Method 2: NOT IN (careful with NULLs!)
SELECT * FROM employees
WHERE dept_id NOT IN (SELECT dept_id FROM departments);
-- ⚠️ If any dept_id in departments is NULL, this returns no rows!

-- Method 3: NOT EXISTS (safe with NULLs)
SELECT * FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM departments d WHERE d.dept_id = e.dept_id
);
```

---

### Q15: What is a deadlock and how does MySQL handle it?

A deadlock occurs when two transactions each hold a lock the other needs, causing infinite waiting. MySQL's InnoDB **automatically detects deadlocks** and **rolls back the transaction** that has done the least work (`innodb_deadlock_detect = ON` by default).

```sql
-- Check deadlock info
SHOW ENGINE INNODB STATUS;
-- Look for: LATEST DETECTED DEADLOCK section
```

**Prevention:**
- Lock resources in consistent order
- Keep transactions short
- Use appropriate isolation level
- Avoid user interaction inside transactions

---