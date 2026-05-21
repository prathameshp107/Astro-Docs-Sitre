---
title: "Performance Optimization"
description: "-- ✅ Use indexes for filtering, avoid functions on indexed columns -- ❌ Bad: SELECT FROM employees WHERE UPPER(email) = 'ALICE@COMPANY.COM'; -- ✅ Good: SEL"
sidebar:
  order: 27
---

## 17. Performance Optimization

### Query-Level Optimization

```sql
-- ✅ Select only needed columns (avoid SELECT *)
SELECT id, name FROM employees WHERE dept_id = 1;

-- ✅ Use indexes for filtering, avoid functions on indexed columns
-- ❌ Bad:
SELECT * FROM employees WHERE UPPER(email) = 'ALICE@COMPANY.COM';
-- ✅ Good:
SELECT * FROM employees WHERE email = 'alice@company.com';

-- ✅ Use LIMIT with ORDER BY for top-N
SELECT * FROM employees ORDER BY salary DESC LIMIT 10;

-- ✅ Use EXISTS instead of COUNT for existence checks
-- ❌ Slow:
SELECT * FROM employees WHERE (SELECT COUNT(*) FROM orders WHERE emp_id = employees.id) > 0;
-- ✅ Fast:
SELECT * FROM employees WHERE EXISTS (SELECT 1 FROM orders WHERE emp_id = employees.id);

-- ✅ Avoid OR on indexed columns (use UNION instead)
-- ❌
SELECT * FROM employees WHERE dept_id = 1 OR dept_id = 2;
-- ✅
SELECT * FROM employees WHERE dept_id IN (1, 2);
```

### Index Optimization

```sql
-- ✅ Use composite indexes wisely (leftmost prefix rule)
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);

-- ✅ Covering index for frequently queried columns
CREATE INDEX idx_cover ON employees(dept_id, salary, name);
SELECT name, salary FROM employees WHERE dept_id = 1;  -- index-only scan

-- ✅ Analyze index usage
SELECT * FROM sys.schema_unused_indexes;     -- find unused indexes
SELECT * FROM sys.schema_redundant_indexes;  -- find duplicate indexes
```

### Schema-Level Optimization

```sql
-- ✅ Use appropriate data types (smaller = faster)
-- ❌ Using VARCHAR(255) for a 2-char country code
country_code VARCHAR(2)  -- better than VARCHAR(255)

-- ✅ Use INT for FK references (not VARCHAR)
dept_id INT  -- not VARCHAR(50) for department name as FK

-- ✅ Partition large tables
CREATE TABLE orders (
    id       BIGINT AUTO_INCREMENT,
    order_date DATE,
    ...
)
PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);
```

### Configuration-Level Tips

```sql
-- Check slow query log
SHOW VARIABLES LIKE 'slow_query_log%';
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- log queries > 1 second

-- Check buffer pool (InnoDB)
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
-- Should be 70-80% of available RAM for dedicated MySQL servers

-- Query cache (deprecated in MySQL 8)
-- Use application-level caching (Redis/Memcached) instead
```

### The N+1 Problem

```sql
-- ❌ N+1: 1 query for employees + N queries for each dept name
SELECT * FROM employees;  -- 100 rows
-- Then for each employee:
SELECT dept_name FROM departments WHERE dept_id = ?;  -- 100 more queries!

-- ✅ Fix: use a JOIN
SELECT e.*, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;
-- 1 query, done!
```

---