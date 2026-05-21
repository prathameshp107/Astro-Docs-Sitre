---
title: "Indexing"
description: "NON-CLUSTERED INDEX (Secondary Index) ┌───────────────────────────────────────┐ │ B-Tree leaf nodes = (key, PK value) │ │ Points back to clustered index │"
sidebar:
  order: 17
---

## 7. Indexing

### What is an Index?
An index is a **data structure** (B-Tree by default in MySQL) that speeds up data retrieval at the cost of extra storage and slower writes.

```
Without index:  Full table scan → O(n)
With index:     B-Tree lookup   → O(log n)
```

### B-Tree Index Structure

```
                    [50]
                   /    \
              [25]        [75]
             /    \      /    \
          [10]  [30]  [60]  [90]
          / \   / \   / \   / \
        [5][15][28][35][55][65][80][95]
                    ↑
          Leaf nodes hold actual row pointers
```

### Clustered vs Non-Clustered Index

```
CLUSTERED INDEX (InnoDB Primary Key)
┌───────────────────────────────────────┐
│  B-Tree leaf nodes = actual row data  │
│  Data IS the index                    │
│  One per table (PK = clustered)       │
│  Fast for range queries on PK         │
└───────────────────────────────────────┘

NON-CLUSTERED INDEX (Secondary Index)
┌───────────────────────────────────────┐
│  B-Tree leaf nodes = (key, PK value)  │
│  Points back to clustered index       │
│  Multiple per table allowed           │
│  Extra lookup step required           │
└───────────────────────────────────────┘
```

### Creating Indexes

```sql
-- Single column index
CREATE INDEX idx_salary ON employees(salary);

-- Composite index (order matters!)
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);
-- ✅ Uses index: WHERE dept_id = 1
-- ✅ Uses index: WHERE dept_id = 1 AND salary > 50000
-- ❌ Uses index: WHERE salary > 50000 (leftmost prefix rule)

-- Unique index
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Full-text index (for LIKE-style text search)
CREATE FULLTEXT INDEX idx_bio ON employees(bio);
SELECT * FROM employees WHERE MATCH(bio) AGAINST('developer' IN BOOLEAN MODE);

-- Drop index
DROP INDEX idx_salary ON employees;

-- Show indexes
SHOW INDEX FROM employees;
```

### When to Use / Avoid Indexes

**Use indexes on:**
- Columns in `WHERE`, `JOIN ON`, `ORDER BY`, `GROUP BY`
- Columns with high cardinality (many unique values)
- Foreign key columns

**Avoid indexes on:**
- Columns rarely used in queries
- Low cardinality columns (e.g., boolean, gender)
- Small tables (full scan is faster)
- Frequently updated columns (index maintenance cost)

> **Interview Tip:** Over-indexing slows down `INSERT`/`UPDATE`/`DELETE`. Every write must update all indexes on the table.

### Covering Index
An index that contains all the columns a query needs — no need to look up the actual row.

```sql
-- Query
SELECT salary FROM employees WHERE dept_id = 1;

-- Covering index (includes both columns)
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);
-- MySQL can answer the query purely from the index ← "Using index" in EXPLAIN
```

---