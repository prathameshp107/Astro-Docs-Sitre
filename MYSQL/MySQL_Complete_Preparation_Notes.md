# 🐬 MySQL Interview Preparation Guide
> A complete revision guide + quick reference for technical interviews — Beginner to Advanced

---

## 📋 Table of Contents

| # | Topic |
|---|-------|
| 1 | [Database & RDBMS Basics](#1-database--rdbms-basics) |
| 2 | [MySQL Architecture](#2-mysql-architecture) |
| 3 | [Data Types](#3-data-types) |
| 4 | [CRUD Operations](#4-crud-operations) |
| 5 | [Keys & Constraints](#5-keys--constraints) |
| 6 | [Joins](#6-joins) |
| 7 | [Indexing](#7-indexing) |
| 8 | [Normalization](#8-normalization) |
| 9 | [Transactions & ACID](#9-transactions--acid-properties) |
| 10 | [Locks](#10-locks) |
| 11 | [Views](#11-views) |
| 12 | [Stored Procedures & Functions](#12-stored-procedures--functions) |
| 13 | [Triggers](#13-triggers) |
| 14 | [Aggregations & Functions](#14-aggregations--functions) |
| 15 | [Subqueries & CTEs](#15-subqueries--ctes) |
| 16 | [EXPLAIN & Query Optimization](#16-explain--query-optimization) |
| 17 | [Performance Optimization](#17-performance-optimization) |
| 18 | [Common Interview Questions](#18-common-interview-questions--answers) |
| 19 | [Quick Revision Cheat Sheet](#19-quick-revision-cheat-sheet) |

---

## 1. Database & RDBMS Basics

### What is a Database?
A **database** is an organized collection of structured data stored electronically. A **DBMS** (Database Management System) is software that manages this data.

### RDBMS vs DBMS

| Feature | DBMS | RDBMS |
|---|---|---|
| Data Storage | Files | Tables (rows + columns) |
| Relationships | Not enforced | Enforced via keys |
| ACID | Not always | Yes |
| Examples | File system, XML | MySQL, PostgreSQL, Oracle |

### Key Terminology

| Term | Definition |
|---|---|
| **Table** | A collection of rows and columns (like a spreadsheet) |
| **Row / Record** | A single data entry in a table |
| **Column / Field** | A category of data (attribute) |
| **Schema** | The structure/blueprint of a database |
| **Query** | A request to retrieve or manipulate data |
| **Relation** | A table in relational model terms |

### SQL Sublanguages

```
DDL  (Data Definition Language)    → CREATE, ALTER, DROP, TRUNCATE
DML  (Data Manipulation Language)  → SELECT, INSERT, UPDATE, DELETE
DCL  (Data Control Language)       → GRANT, REVOKE
TCL  (Transaction Control Language)→ COMMIT, ROLLBACK, SAVEPOINT
DQL  (Data Query Language)         → SELECT
```

---

## 2. MySQL Architecture

```
┌─────────────────────────────────────────────┐
│              CLIENT LAYER                   │
│   (mysql CLI, MySQL Workbench, App)         │
└───────────────────┬─────────────────────────┘
                    │ Connection (TCP/IP or Unix Socket)
┌───────────────────▼─────────────────────────┐
│           CONNECTION LAYER                  │
│  Authentication │ Thread Cache │ SSL        │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│            SQL LAYER (Server)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Parser  │→ │Optimizer │→ │Executor  │   │
│  └──────────┘  └──────────┘  └──────────┘   │
│  Query Cache │ Privilege Check              │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│          STORAGE ENGINE LAYER               │
│   InnoDB │ MyISAM │ Memory │ Archive        │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│            FILE SYSTEM                      │
│   .ibd (InnoDB data) │ .frm (table def)     │
└─────────────────────────────────────────────┘
```

### InnoDB vs MyISAM

| Feature | InnoDB | MyISAM |
|---|---|---|
| Transactions | ✅ Yes | ❌ No |
| Foreign Keys | ✅ Yes | ❌ No |
| Row-level Lock | ✅ Yes | ❌ (Table lock only) |
| Crash Recovery | ✅ Yes | ❌ Limited |
| Full-text Search | ✅ (5.6+) | ✅ Yes |
| Default since | MySQL 5.5+ | MySQL < 5.5 |

> **Interview Tip:** InnoDB is the default and preferred engine. Always use InnoDB unless you have a specific reason.

---

## 3. Data Types

### Numeric Types

```sql
TINYINT      -- 1 byte,  range: -128 to 127
SMALLINT     -- 2 bytes, range: -32,768 to 32,767
MEDIUMINT    -- 3 bytes
INT          -- 4 bytes, range: ~-2B to 2B
BIGINT       -- 8 bytes
FLOAT(p)     -- Approximate decimal (4 or 8 bytes)
DOUBLE       -- Double precision float
DECIMAL(M,D) -- Exact decimal → use for money! (e.g., DECIMAL(10,2))
```

### String Types

```sql
CHAR(n)      -- Fixed length, max 255  → fast for fixed-size data (e.g., country code)
VARCHAR(n)   -- Variable length, max 65,535 → most common
TEXT         -- Up to 65,535 chars (no default, not indexable fully)
MEDIUMTEXT   -- Up to 16 MB
LONGTEXT     -- Up to 4 GB
ENUM('a','b')-- One value from a list → stored as integer internally
SET('a','b') -- Multiple values from a list
```

### Date & Time Types

```sql
DATE         -- YYYY-MM-DD
TIME         -- HH:MM:SS
DATETIME     -- YYYY-MM-DD HH:MM:SS  (no timezone)
TIMESTAMP    -- YYYY-MM-DD HH:MM:SS  (stores UTC, auto-converts timezone)
YEAR         -- YYYY
```

> **Interview Tip:** Use `TIMESTAMP` for audit fields (`created_at`, `updated_at`) — it auto-converts to server timezone. Use `DATETIME` when timezone-independence is needed.

### Binary Types

```sql
BINARY(n)    -- Fixed-length binary
VARBINARY(n) -- Variable-length binary
BLOB         -- Binary large object (images, files)
```

---

## 4. CRUD Operations

### CREATE (DDL)

```sql
-- Create database
CREATE DATABASE company_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE company_db;

-- Create table
CREATE TABLE employees (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    salary      DECIMAL(10,2) DEFAULT 0.00,
    dept_id     INT,
    hire_date   DATE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Alter table
ALTER TABLE employees ADD COLUMN phone VARCHAR(15);
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12,2);
ALTER TABLE employees DROP COLUMN phone;
ALTER TABLE employees RENAME COLUMN first_name TO fname;
```

### INSERT (DML)

```sql
-- Single row
INSERT INTO employees (first_name, last_name, email, salary, dept_id)
VALUES ('Alice', 'Smith', 'alice@company.com', 75000.00, 1);

-- Multiple rows
INSERT INTO employees (first_name, last_name, email, salary, dept_id)
VALUES
    ('Bob',   'Jones',  'bob@company.com',   80000.00, 2),
    ('Carol', 'White',  'carol@company.com', 90000.00, 1),
    ('David', 'Brown',  'david@company.com', 70000.00, 3);

-- Insert from another table
INSERT INTO archive_employees
SELECT * FROM employees WHERE hire_date < '2020-01-01';
```

### SELECT (DQL)

```sql
-- Basic
SELECT * FROM employees;
SELECT first_name, last_name, salary FROM employees;

-- Filtering
SELECT * FROM employees WHERE salary > 75000 AND dept_id = 1;
SELECT * FROM employees WHERE salary BETWEEN 60000 AND 90000;
SELECT * FROM employees WHERE last_name IN ('Smith', 'Jones');
SELECT * FROM employees WHERE email LIKE '%@company.com';
SELECT * FROM employees WHERE phone IS NULL;

-- Sorting
SELECT * FROM employees ORDER BY salary DESC, last_name ASC;

-- Limiting
SELECT * FROM employees ORDER BY salary DESC LIMIT 5;
SELECT * FROM employees LIMIT 10 OFFSET 20;  -- pagination: page 3 (10 per page)

-- Distinct
SELECT DISTINCT dept_id FROM employees;

-- Aliasing
SELECT CONCAT(first_name, ' ', last_name) AS full_name, salary AS annual_salary
FROM employees;
```

### UPDATE (DML)

```sql
-- Single record
UPDATE employees SET salary = 85000 WHERE id = 1;

-- Multiple columns
UPDATE employees
SET salary = salary * 1.10, updated_at = NOW()
WHERE dept_id = 1;

-- ⚠️ NEVER update without WHERE unless you mean it!
-- Safe update mode: SET SQL_SAFE_UPDATES = 1;
```

### DELETE (DML)

```sql
-- Delete specific rows
DELETE FROM employees WHERE id = 5;

-- Delete with condition
DELETE FROM employees WHERE hire_date < '2015-01-01';

-- TRUNCATE vs DELETE
TRUNCATE TABLE employees;  -- Removes ALL rows, resets AUTO_INCREMENT, faster, no WHERE
DELETE FROM employees;     -- Removes ALL rows, keeps AUTO_INCREMENT, can rollback

-- DROP vs TRUNCATE vs DELETE
-- DELETE  → DML, keeps structure, supports WHERE, can rollback
-- TRUNCATE→ DDL, keeps structure, removes all, faster, cannot rollback
-- DROP    → DDL, removes table entirely
```

---

## 5. Keys & Constraints

### Types of Keys

```
PRIMARY KEY
├── Uniquely identifies each row
├── Cannot be NULL
├── Only ONE per table
└── Creates a Clustered Index automatically

UNIQUE KEY
├── Ensures all values in column are unique
├── Can be NULL (multiple NULLs allowed)
└── Multiple per table allowed

FOREIGN KEY
├── Links to PRIMARY KEY in another table
├── Enforces referential integrity
└── Can be NULL (optional relationship)

COMPOSITE KEY
├── Primary key made of multiple columns
└── Combination must be unique

CANDIDATE KEY
└── Any column(s) that COULD be a primary key

SURROGATE KEY
└── Artificial PK (AUTO_INCREMENT id) — no business meaning

NATURAL KEY
└── PK derived from real-world data (e.g., SSN, email)
```

### Defining Keys

```sql
-- Primary Key
CREATE TABLE departments (
    dept_id   INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);

-- Foreign Key
CREATE TABLE employees (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100),
    dept_id INT,
    CONSTRAINT fk_dept
        FOREIGN KEY (dept_id)
        REFERENCES departments(dept_id)
        ON DELETE SET NULL    -- options: CASCADE, SET NULL, RESTRICT, NO ACTION
        ON UPDATE CASCADE
);

-- Composite Primary Key
CREATE TABLE order_items (
    order_id   INT,
    product_id INT,
    quantity   INT,
    PRIMARY KEY (order_id, product_id)  -- composite
);

-- Unique Key
ALTER TABLE employees ADD CONSTRAINT uq_email UNIQUE (email);
```

### ON DELETE / ON UPDATE Options

| Option | Behavior |
|---|---|
| `CASCADE` | Delete/update child rows automatically |
| `SET NULL` | Set FK column to NULL in child |
| `RESTRICT` | Prevent delete/update if child rows exist |
| `NO ACTION` | Same as RESTRICT (default) |
| `SET DEFAULT` | Set FK to default value (rarely used) |

### Constraints

```sql
CREATE TABLE products (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,              -- NOT NULL
    price       DECIMAL(10,2) NOT NULL,
    stock       INT DEFAULT 0,                      -- DEFAULT
    category    ENUM('electronics','clothing','food'),
    sku         VARCHAR(50) UNIQUE,                 -- UNIQUE
    discount    DECIMAL(5,2) CHECK (discount >= 0 AND discount <= 100), -- CHECK (MySQL 8.0.16+)
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Joins

# SQL Joins — Complete Visual Guide

---

## Setup: The Sample Data

Before diving in, here are the two tables used throughout all examples. Refer back here whenever you need to trace a result.

```
Table A — employees                    Table B — departments
┌────┬────────┬─────────┬────────────┐  ┌─────────┬────────────┐
│ id │  name  │ dept_id │ manager_id │  │ dept_id │  dept_name │
├────┼────────┼─────────┼────────────┤  ├─────────┼────────────┤
│  1 │ Alice  │    1    │    NULL    │  │    1    │ Engineering│
│  2 │ Bob    │    2    │      1     │  │    2    │  Marketing │
│  3 │ Carol  │   NULL  │      1     │  │    3    │   Finance  │
│  4 │ David  │    4    │      2     │  └─────────┴────────────┘
└────┴────────┴─────────┴────────────┘
```

**Three edge cases that matter:**
- `Carol` has `dept_id = NULL` — she has no department assigned
- `David` has `dept_id = 4` — that department does not exist in the departments table
- `Finance` (dept_id 3) has no employees assigned to it

These three cases determine what each join type includes or excludes.

---

## 1. INNER JOIN

### What it does
Returns **only the rows where a match exists in both tables**. Any row in either table that has no matching row in the other table is completely dropped from the result.

Think of it as the **strictest** join — it requires both sides to agree.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/inner-join-svg.svg)


### SQL
```sql
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;
```

### Result
| name  | dept_name   |
|-------|-------------|
| Alice | Engineering |
| Bob   | Marketing   |

### Why Carol and David are excluded
- **Carol**: her `dept_id` is `NULL`. In SQL, `NULL = 1` is not `TRUE` — it is `UNKNOWN`. The `ON` clause requires `TRUE`, so Carol never matches any department row.
- **David**: his `dept_id = 4`, but no row in the departments table has `dept_id = 4`. No match → excluded.
- **Finance** (dept_id 3): no employee has `dept_id = 3`. No match → excluded from the result.

### When to use INNER JOIN
Use it when you **only care about records that have complete data on both sides** — e.g., orders with valid customers, employees with valid departments.

---

## 2. LEFT JOIN (LEFT OUTER JOIN)

### What it does
Returns **all rows from the left table**, plus matching rows from the right table. Where there is no match on the right side, columns from the right table are filled with `NULL`.

The left table is never filtered. It is the "anchor."

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/left-join-svg.svg)


### SQL
```sql
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;
```

### Result
| name  | dept_name   |
|-------|-------------|
| Alice | Engineering |
| Bob   | Marketing   |
| Carol | NULL        |
| David | NULL        |

### Key observations
- Carol and David appear because they are in the **left** table (employees), even though their `dept_id` has no match in departments.
- Finance does **not** appear because it exists only in the **right** table.
- `NULL` in `dept_name` tells you "this employee has no valid department."

### When to use LEFT JOIN
This is the **most commonly used join** in practice. Use it when:
- You want all records from one table, and optionally related data from another.
- You're checking for missing relationships: `WHERE d.dept_id IS NULL` after a LEFT JOIN finds all employees with no department.

---

## 3. RIGHT JOIN (RIGHT OUTER JOIN)

### What it does
The mirror image of LEFT JOIN. Returns **all rows from the right table**, plus matching rows from the left. Non-matching left-side columns become `NULL`.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/right-join.svg)


### SQL
```sql
SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;
```

### Result
| name  | dept_name   |
|-------|-------------|
| Alice | Engineering |
| Bob   | Marketing   |
| NULL  | Finance     |

### Key observations
- Finance appears even though no employee belongs to it. It is in the **right** table (departments), so it is always included.
- Carol and David do **not** appear — they are in the left table and have no match in the right table.
- `NULL` in `name` means "this department has no assigned employees."

### Practical tip
RIGHT JOIN is rarely needed. Any RIGHT JOIN can be rewritten as a LEFT JOIN by **swapping the table order**:
```sql
-- These two queries produce identical results:
SELECT e.name, d.dept_name
FROM employees e RIGHT JOIN departments d ON e.dept_id = d.dept_id;

-- Equivalent LEFT JOIN (more readable):
SELECT e.name, d.dept_name
FROM departments d LEFT JOIN employees e ON e.dept_id = d.dept_id;
```

---

## 4. FULL OUTER JOIN

### What it does
Returns **all rows from both tables**. Where there is no match on either side, the missing columns are `NULL`. It is the union of LEFT JOIN and RIGHT JOIN.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/full-outer-join.svg)

### SQL (Standard — PostgreSQL, SQL Server, Oracle)
```sql
SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id;
```

### SQL (MySQL workaround — MySQL does not support FULL OUTER JOIN)
```sql
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id

UNION

SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;
```
> `UNION` (without `ALL`) deduplicates rows, so matching rows (Alice, Bob) appear only once.

### Result
| name  | dept_name   |
|-------|-------------|
| Alice | Engineering |
| Bob   | Marketing   |
| Carol | NULL        |
| David | NULL        |
| NULL  | Finance     |

### When to use FULL OUTER JOIN
Use it when doing **data reconciliation** — finding rows that exist in one source but not the other. Adding a `WHERE` clause makes it a powerful mismatch detector:

```sql
-- Find employees with no department AND departments with no employees
SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id
WHERE e.dept_id IS NULL OR d.dept_id IS NULL;
```

---

## 5. CROSS JOIN

### What it does
Produces the **Cartesian product** — every row in the left table is paired with every row in the right table. There is no `ON` condition. With 4 employees and 3 departments, the result is `4 × 3 = 12` rows.

### Visual Diagram

![useState diagram](/DSA-Notes-Problems/assets/sql/cross-join.svg)


### SQL
```sql
SELECT e.name, d.dept_name
FROM employees e
CROSS JOIN departments d;
```

### Output size rule
`rows_in_A × rows_in_B = output rows`

**Warning:** On large tables, CROSS JOINs are extremely expensive. A table of 1,000 rows crossed with another 1,000-row table yields 1,000,000 rows.

### Real-world use cases
- Generating all possible combinations (e.g., size × color for product variants)
- Creating test data
- Building a calendar — cross joining a list of dates with a list of time slots

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

## 9. Quick Reference Summary

| Join Type      | Returns                                            | NULL appears when                           |
|----------------|----------------------------------------------------|---------------------------------------------|
| INNER JOIN     | Only rows with a match in both tables              | Never (unmatched rows are dropped entirely) |
| LEFT JOIN      | All rows from left + matched rows from right       | Right-side columns when left has no match   |
| RIGHT JOIN     | Matched rows from left + all rows from right       | Left-side columns when right has no match   |
| FULL OUTER     | All rows from both tables                          | Either side when the other has no match     |
| CROSS JOIN     | Every combination (no ON condition)                | Never (all combinations are output)         |
| SELF JOIN      | A table joined to itself via aliases               | Depends on whether LEFT or INNER is used    |
| Anti-Join      | Rows that have NO match in the other table         | Used intentionally to find unmatched rows   |

---

## 10. Choosing the Right Join — Decision Guide

```
Do you need rows even when there's no match?
│
├─ No  →  INNER JOIN
│          (strictest, only full matches)
│
└─ Yes →  Which side must always appear?
           │
           ├─ Left table only  →  LEFT JOIN  (most common)
           │
           ├─ Right table only →  RIGHT JOIN (or rewrite as LEFT JOIN)
           │
           └─ Both sides       →  FULL OUTER JOIN

Are you working with one table that references itself?
└─ Yes  →  SELF JOIN  (with LEFT or INNER depending on above)

Do you need every possible combination?
└─ Yes  →  CROSS JOIN  (use with caution on large tables)

Do you need rows that do NOT match?
└─ Yes  →  Anti-Join pattern  (LEFT JOIN + WHERE right.id IS NULL)
```

---

> **Interview Tip:** When asked about joins, trace through the edge cases — `NULL` department, missing department ID, and a department with no employees. Interviewers specifically want to see you understand how `NULL` interacts with join conditions, not just the textbook definition.---

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

## 8. Normalization

### What is Normalization?
The process of organizing a database to **reduce redundancy** and **improve data integrity** by dividing tables and defining relationships.

### Unnormalized Table (Example)

```
┌────┬──────────┬───────────────────────┬──────────────────────────────┐
│ id │ student  │        courses        │          teachers            │
├────┼──────────┼───────────────────────┼──────────────────────────────┤
│  1 │ Alice    │ Math, Physics         │ Mr. Roy, Dr. Singh           │
│  2 │ Bob      │ Math, Chemistry       │ Mr. Roy, Dr. Mehta           │
│  3 │ Alice    │ Chemistry             │ Dr. Mehta                    │
└────┴──────────┴───────────────────────┴──────────────────────────────┘
Problems: Multi-valued cells, data duplication
```

---

### 1NF — First Normal Form
**Rule:** Each column must contain **atomic (indivisible) values**. No repeating groups.

```sql
-- ❌ Violates 1NF (multi-valued column)
┌────┬─────────┬──────────────────────┐
│ id │ student │       courses        │
├────┼─────────┼──────────────────────┤
│  1 │ Alice   │ Math, Physics        │  ← not atomic!

-- ✅ 1NF compliant
┌────┬─────────┬───────────┐
│ id │ student │  course   │
├────┼─────────┼───────────┤
│  1 │ Alice   │ Math      │
│  2 │ Alice   │ Physics   │
│  3 │ Bob     │ Math      │
│  4 │ Bob     │ Chemistry │
```

---

### 2NF — Second Normal Form
**Rule:** Must be in 1NF + **no partial dependency** (non-key column depends on part of composite key).

```
-- ❌ Violates 2NF
Table: enrollment(student_id, course_id, student_name, course_name, grade)
                  [─────────── composite PK ──────────]
student_name depends only on student_id   ← partial dependency!
course_name  depends only on course_id    ← partial dependency!

-- ✅ 2NF compliant
students(student_id PK, student_name)
courses(course_id PK, course_name)
enrollment(student_id FK, course_id FK, grade)  ← only grade depends on full PK
```

---

### 3NF — Third Normal Form
**Rule:** Must be in 2NF + **no transitive dependency** (non-key column depends on another non-key column).

```
-- ❌ Violates 3NF
employees(emp_id PK, name, dept_id, dept_name)
dept_name depends on dept_id, which is not the PK ← transitive dependency!

-- ✅ 3NF compliant
employees(emp_id PK, name, dept_id FK)
departments(dept_id PK, dept_name)
```

---

### BCNF — Boyce-Codd Normal Form
**Rule:** Stricter version of 3NF — for every dependency X → Y, X must be a **superkey**.

```
-- ❌ Violates BCNF
course_teacher(student, course, teacher)
  Dependency: teacher → course (teacher teaches only one course)
  But teacher is NOT a superkey

-- ✅ BCNF compliant
teacher_course(teacher PK, course)
student_teacher(student, teacher FK)
```

### Normalization Summary

| Form | Rule |
|---|---|
| 1NF | Atomic values, no repeating groups |
| 2NF | 1NF + no partial dependencies |
| 3NF | 2NF + no transitive dependencies |
| BCNF | 3NF + every determinant is a superkey |

> **Interview Tip:** In practice, most production databases target **3NF**. Sometimes you **denormalize** intentionally for read performance (e.g., data warehouses use star schema).

---

## 9. Transactions & ACID Properties

### What is a Transaction?
A **transaction** is a sequence of SQL operations treated as a single logical unit. Either **all succeed** or **all fail**.

```sql
START TRANSACTION;

    UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- debit
    UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- credit

COMMIT;    -- make changes permanent

-- If anything fails:
ROLLBACK;  -- undo all changes in transaction
```

### ACID Properties

```
┌─────────────────────────────────────────────────────────────┐
│                    ACID PROPERTIES                          │
├──────────────┬──────────────────────────────────────────────┤
│ ATOMICITY    │ All or nothing — transaction fully completes  │
│              │ or fully rolls back. No partial updates.      │
├──────────────┼──────────────────────────────────────────────┤
│ CONSISTENCY  │ Database moves from one valid state to        │
│              │ another. All rules/constraints are respected. │
├──────────────┼──────────────────────────────────────────────┤
│ ISOLATION    │ Concurrent transactions don't interfere with  │
│              │ each other. Intermediate state is invisible.  │
├──────────────┼──────────────────────────────────────────────┤
│ DURABILITY   │ Once committed, changes persist even on       │
│              │ system crash (written to disk/WAL).           │
└──────────────┴──────────────────────────────────────────────┘
```

### Transaction Flow

```
BEGIN ──────────────────────────────────────────► COMMIT
  │                                                  │
  │    [SQL 1] → [SQL 2] → [SQL 3] → ...            │
  │                                                  ▼
  │                                          Changes are
  │                                          permanent
  │
  ▼
ROLLBACK
  │
  ▼
All changes undone
(returns to state before BEGIN)
```

### SAVEPOINT

```sql
START TRANSACTION;
    INSERT INTO orders VALUES (1, 'Alice', 500);
    SAVEPOINT sp1;

    INSERT INTO order_items VALUES (1, 'Laptop', 1, 500);
    SAVEPOINT sp2;

    -- Something goes wrong with payment
    ROLLBACK TO sp1;  -- undo only from sp1, keep order

COMMIT;
```

### Isolation Levels

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| READ UNCOMMITTED | ✅ Possible | ✅ Possible | ✅ Possible |
| READ COMMITTED | ❌ Prevented | ✅ Possible | ✅ Possible |
| REPEATABLE READ | ❌ Prevented | ❌ Prevented | ✅ Possible |
| SERIALIZABLE | ❌ Prevented | ❌ Prevented | ❌ Prevented |

```sql
-- Set isolation level
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;  -- InnoDB default
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

**Read Anomalies Explained:**
- **Dirty Read** — reading uncommitted data from another transaction
- **Non-Repeatable Read** — same row returns different values in same transaction
- **Phantom Read** — same query returns different number of rows in same transaction

---

## 10. Locks

### Lock Types

```
ROW-LEVEL LOCK (InnoDB)
├── Shared Lock (S)     → READ lock — multiple readers allowed
├── Exclusive Lock (X)  → WRITE lock — only one writer, no readers
└── Intention Lock      → signals intent to lock rows in a table

TABLE-LEVEL LOCK (MyISAM / InnoDB DDL)
├── READ LOCK  → all sessions can read, no writes
└── WRITE LOCK → only lock holder can read/write
```

```sql
-- Shared lock (read lock)
SELECT * FROM accounts WHERE id = 1 LOCK IN SHARE MODE;
-- Other sessions can also read, but cannot write

-- Exclusive lock (write lock)
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
-- Only this session can read/write this row

-- Table lock (manual)
LOCK TABLES employees READ;
LOCK TABLES employees WRITE;
UNLOCK TABLES;
```

### Deadlock

```
Session A:                       Session B:
LOCK row 1 (exclusive)           LOCK row 2 (exclusive)
  ↓                                ↓
Wait for row 2... ←─────────────── Wait for row 1...
                                    ↑
                    DEADLOCK! MySQL detects and kills
                    the transaction with less work done
```

**Prevent Deadlocks:**
- Always lock resources in the **same order**
- Keep transactions **short**
- Use appropriate **isolation level**
- Use `SELECT ... FOR UPDATE` consistently

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

## 12. Stored Procedures & Functions

### Stored Procedure
A saved block of SQL code you can execute by name. Supports logic, loops, and conditionals.

```sql
DELIMITER $$

CREATE PROCEDURE give_raise(
    IN dept_name_param VARCHAR(100),
    IN raise_percent    DECIMAL(5,2),
    OUT affected_rows   INT
)
BEGIN
    DECLARE dept_id_val INT;

    -- Get department ID
    SELECT dept_id INTO dept_id_val
    FROM departments
    WHERE dept_name = dept_name_param;

    -- Update salaries
    UPDATE employees
    SET salary = salary * (1 + raise_percent / 100)
    WHERE dept_id = dept_id_val;

    SET affected_rows = ROW_COUNT();
END$$

DELIMITER ;

-- Call
CALL give_raise('Engineering', 10, @rows);
SELECT @rows AS employees_updated;
```

### Control Flow

```sql
-- IF / ELSEIF / ELSE
IF salary > 90000 THEN
    SET level = 'Senior';
ELSEIF salary > 70000 THEN
    SET level = 'Mid';
ELSE
    SET level = 'Junior';
END IF;

-- CASE
CASE dept_id
    WHEN 1 THEN SET dept_label = 'Engineering';
    WHEN 2 THEN SET dept_label = 'Marketing';
    ELSE        SET dept_label = 'Other';
END CASE;

-- WHILE loop
WHILE counter < 10 DO
    SET counter = counter + 1;
END WHILE;

-- LOOP / LEAVE
my_loop: LOOP
    IF counter >= 10 THEN LEAVE my_loop; END IF;
    SET counter = counter + 1;
END LOOP;
```

### Stored Function (returns a value)

```sql
DELIMITER $$

CREATE FUNCTION calculate_tax(salary DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE tax DECIMAL(10,2);
    IF salary > 100000 THEN
        SET tax = salary * 0.30;
    ELSEIF salary > 50000 THEN
        SET tax = salary * 0.20;
    ELSE
        SET tax = salary * 0.10;
    END IF;
    RETURN tax;
END$$

DELIMITER ;

-- Use in query
SELECT name, salary, calculate_tax(salary) AS tax FROM employees;
```

### Procedure vs Function

| Feature | Stored Procedure | Stored Function |
|---|---|---|
| Returns | 0 or more values (OUT params) | Exactly 1 value |
| Used in SELECT | ❌ No | ✅ Yes |
| Transactions | Can use COMMIT/ROLLBACK | Cannot |
| Call syntax | `CALL proc()` | `SELECT func()` |
| DML inside | ✅ Yes | Limited |

---

## 13. Triggers

### What is a Trigger?
A trigger is a stored program that **automatically executes** in response to a DML event (INSERT, UPDATE, DELETE) on a table.

```
Timing   × Event  =  6 trigger types
─────────────────────────────────────
BEFORE   × INSERT
AFTER    × INSERT
BEFORE   × UPDATE
AFTER    × UPDATE
BEFORE   × DELETE
AFTER    × DELETE
```

```sql
-- Audit log trigger
CREATE TABLE employee_audit (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    emp_id      INT,
    action      VARCHAR(10),
    old_salary  DECIMAL(10,2),
    new_salary  DECIMAL(10,2),
    changed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by  VARCHAR(100)
);

DELIMITER $$

CREATE TRIGGER trg_salary_audit
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO employee_audit (emp_id, action, old_salary, new_salary, changed_by)
        VALUES (OLD.id, 'UPDATE', OLD.salary, NEW.salary, USER());
    END IF;
END$$

DELIMITER ;

-- BEFORE INSERT trigger — auto-format data
CREATE TRIGGER trg_format_email
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    SET NEW.email = LOWER(TRIM(NEW.email));
END$$
```

### OLD vs NEW

| Context | OLD | NEW |
|---|---|---|
| INSERT | Not available | Inserted values |
| UPDATE | Values before update | Values after update |
| DELETE | Deleted values | Not available |

### Trigger Caveats
- Triggers fire **per row** by default (`FOR EACH ROW`)
- Cannot use `COMMIT`/`ROLLBACK` inside triggers
- Recursive triggers disabled by default
- Can cause hidden performance issues — document them!

---

## 14. Aggregations & Functions

### Aggregate Functions

```sql
SELECT
    COUNT(*)                    AS total_employees,
    COUNT(DISTINCT dept_id)     AS dept_count,
    SUM(salary)                 AS total_payroll,
    AVG(salary)                 AS avg_salary,
    MIN(salary)                 AS min_salary,
    MAX(salary)                 AS max_salary,
    STD(salary)                 AS salary_stddev
FROM employees;

-- GROUP BY
SELECT dept_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY dept_id;

-- HAVING (filter on aggregate result)
SELECT dept_id, AVG(salary) AS avg_sal
FROM employees
GROUP BY dept_id
HAVING avg_sal > 75000;

-- WHERE vs HAVING
-- WHERE  → filters rows BEFORE grouping
-- HAVING → filters groups AFTER grouping
```

### String Functions

```sql
SELECT
    UPPER('hello'),              -- 'HELLO'
    LOWER('WORLD'),              -- 'world'
    LENGTH('MySQL'),             -- 5
    CHAR_LENGTH('MySQL'),        -- 5 (bytes vs chars differ for unicode)
    TRIM('  hello  '),           -- 'hello'
    LTRIM('  hello'),            -- 'hello'
    RTRIM('hello  '),            -- 'hello'
    CONCAT('Hello', ' ', 'World'), -- 'Hello World'
    CONCAT_WS('-', '2024','01','15'), -- '2024-01-15'
    SUBSTRING('Hello World', 7, 5),  -- 'World'
    LEFT('Hello World', 5),      -- 'Hello'
    RIGHT('Hello World', 5),     -- 'World'
    REPLACE('Hello World', 'World', 'MySQL'), -- 'Hello MySQL'
    INSTR('Hello World', 'World'),  -- 7 (position)
    LPAD('42', 5, '0'),          -- '00042'
    RPAD('42', 5, '0'),          -- '42000'
    REVERSE('MySQL'),            -- 'LQSyM'
    REPEAT('ab', 3);             -- 'ababab'
```

### Date Functions

```sql
SELECT
    NOW(),                            -- '2024-12-25 10:30:00'
    CURDATE(),                        -- '2024-12-25'
    CURTIME(),                        -- '10:30:00'
    DATE('2024-12-25 10:30:00'),      -- '2024-12-25'
    YEAR('2024-12-25'),               -- 2024
    MONTH('2024-12-25'),              -- 12
    DAY('2024-12-25'),                -- 25
    DAYNAME('2024-12-25'),            -- 'Wednesday'
    MONTHNAME('2024-12-25'),          -- 'December'
    DATEDIFF('2024-12-31','2024-01-01'), -- 365
    DATE_ADD('2024-01-01', INTERVAL 30 DAY),  -- '2024-01-31'
    DATE_SUB('2024-01-31', INTERVAL 1 MONTH), -- '2023-12-31'
    DATE_FORMAT(NOW(), '%d/%m/%Y'),   -- '25/12/2024'
    UNIX_TIMESTAMP(),                 -- epoch seconds
    FROM_UNIXTIME(1703462400);        -- convert epoch to datetime
```

### Numeric Functions

```sql
SELECT
    ABS(-42),        -- 42
    CEIL(4.2),       -- 5
    FLOOR(4.9),      -- 4
    ROUND(4.567, 2), -- 4.57
    TRUNCATE(4.567, 2), -- 4.56 (no rounding)
    MOD(10, 3),      -- 1
    POWER(2, 10),    -- 1024
    SQRT(144),       -- 12
    RAND();          -- random float 0-1
```

### Window Functions (MySQL 8.0+)

```sql
-- ROW_NUMBER, RANK, DENSE_RANK
SELECT
    name,
    dept_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS row_num,
    RANK()        OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rank_num,
    DENSE_RANK()  OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dense_rank_num
FROM employees;

-- RANK vs DENSE_RANK
-- Salaries: 90000, 90000, 80000
-- RANK:       1,     1,     3  (gap after tie)
-- DENSE_RANK: 1,     1,     2  (no gap)

-- LAG / LEAD (compare with previous/next row)
SELECT
    name,
    salary,
    LAG(salary, 1)  OVER (ORDER BY hire_date) AS prev_salary,
    LEAD(salary, 1) OVER (ORDER BY hire_date) AS next_salary,
    salary - LAG(salary, 1) OVER (ORDER BY hire_date) AS change
FROM employees;

-- Running total
SELECT
    name,
    salary,
    SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM employees;

-- Nth Salary (Top-N per group)
SELECT * FROM (
    SELECT name, dept_id, salary,
           DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dr
    FROM employees
) ranked
WHERE dr = 2;  -- 2nd highest salary per department
```

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

## 16. EXPLAIN & Query Optimization

### Understanding EXPLAIN

```sql
EXPLAIN SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > 70000;
```

**EXPLAIN output columns:**

| Column | Meaning |
|---|---|
| `id` | Query step ID |
| `select_type` | SIMPLE, SUBQUERY, DERIVED, UNION |
| `table` | Table being accessed |
| `type` | Access type (best → worst) |
| `possible_keys` | Indexes that could be used |
| `key` | Index actually used |
| `key_len` | Length of index used |
| `rows` | Estimated rows examined |
| `filtered` | % of rows after WHERE filter |
| `Extra` | Additional info |

### Access Types (type column) — Best to Worst

```
system   → single row in MyISAM/MEMORY (best)
const    → at most one matching row (PK/unique lookup)
eq_ref   → one row per join row (PK/unique join)
ref      → multiple rows per join (non-unique index)
range    → index range scan (BETWEEN, <, >, IN)
index    → full index scan (better than ALL)
ALL      → full table scan (WORST — avoid!)
```

```sql
-- Use EXPLAIN ANALYZE (MySQL 8.0.18+) for actual execution stats
EXPLAIN ANALYZE SELECT * FROM employees WHERE dept_id = 1;

-- Use FORMAT=JSON for more detail
EXPLAIN FORMAT=JSON SELECT * FROM employees WHERE salary > 50000;
```

### Reading EXPLAIN — Red Flags

```sql
-- ❌ BAD: type = ALL (full table scan)
EXPLAIN SELECT * FROM employees WHERE YEAR(hire_date) = 2020;

-- ✅ FIX: use range condition for index
EXPLAIN SELECT * FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2020-12-31';

-- ❌ BAD: Extra = "Using filesort" on large tables
EXPLAIN SELECT * FROM employees ORDER BY salary;
-- Fix: Add index on salary

-- ❌ BAD: Extra = "Using temporary"
EXPLAIN SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id;
-- Fix: Add index on dept_id
```

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

## 19. Quick Revision Cheat Sheet

```
╔══════════════════════════════════════════════════════════════════╗
║                  MySQL QUICK CHEAT SHEET                        ║
╠══════════════════════════════════════════════════════════════════╣
║  DDL: CREATE, ALTER, DROP, TRUNCATE, RENAME                     ║
║  DML: SELECT, INSERT, UPDATE, DELETE                            ║
║  DCL: GRANT, REVOKE                                             ║
║  TCL: COMMIT, ROLLBACK, SAVEPOINT                               ║
╠══════════════════════════════════════════════════════════════════╣
║  JOINS                                                          ║
║  INNER   → matching rows only                                   ║
║  LEFT    → all left + matching right                            ║
║  RIGHT   → all right + matching left                            ║
║  FULL    → all rows (UNION of LEFT + RIGHT)                     ║
║  CROSS   → cartesian product                                    ║
║  SELF    → table joined with itself                             ║
╠══════════════════════════════════════════════════════════════════╣
║  KEYS                                                           ║
║  PRIMARY   → unique + not null + clustered index                ║
║  FOREIGN   → references PK in another table                     ║
║  UNIQUE    → unique, allows NULL, multiple per table            ║
║  COMPOSITE → PK/UK on multiple columns                         ║
╠══════════════════════════════════════════════════════════════════╣
║  NORMALIZATION                                                  ║
║  1NF  → atomic values                                           ║
║  2NF  → no partial dependencies                                 ║
║  3NF  → no transitive dependencies                              ║
║  BCNF → every determinant is a superkey                        ║
╠══════════════════════════════════════════════════════════════════╣
║  ACID                                                           ║
║  Atomicity   → all or nothing                                   ║
║  Consistency → valid state before and after                     ║
║  Isolation   → transactions don't interfere                     ║
║  Durability  → committed data persists                          ║
╠══════════════════════════════════════════════════════════════════╣
║  ISOLATION LEVELS (strictest → loosest)                         ║
║  SERIALIZABLE > REPEATABLE READ > READ COMMITTED >              ║
║  READ UNCOMMITTED                                               ║
║  Default: REPEATABLE READ                                       ║
╠══════════════════════════════════════════════════════════════════╣
║  INDEX TYPES                                                    ║
║  Clustered    → PK, data IS the index (1 per table)             ║
║  Non-clustered→ secondary, points to PK                        ║
║  Composite    → multi-column (follow leftmost prefix)           ║
║  Covering     → all query cols in index ("Using index")         ║
║  Full-text    → text search with MATCH...AGAINST                ║
╠══════════════════════════════════════════════════════════════════╣
║  EXPLAIN type column (best → worst)                             ║
║  system > const > eq_ref > ref > range > index > ALL           ║
╠══════════════════════════════════════════════════════════════════╣
║  DELETE vs TRUNCATE vs DROP                                     ║
║  DELETE   → DML, WHERE allowed, can rollback, triggers fire     ║
║  TRUNCATE → DDL, no WHERE, faster, resets AUTO_INCREMENT        ║
║  DROP     → removes entire table                                ║
╠══════════════════════════════════════════════════════════════════╣
║  WHERE vs HAVING                                                ║
║  WHERE  → filters rows BEFORE GROUP BY                          ║
║  HAVING → filters groups AFTER GROUP BY                         ║
╠══════════════════════════════════════════════════════════════════╣
║  UNION vs UNION ALL                                             ║
║  UNION     → removes duplicates (slower)                        ║
║  UNION ALL → keeps duplicates (faster)                          ║
╠══════════════════════════════════════════════════════════════════╣
║  WINDOW FUNCTIONS (MySQL 8.0+)                                  ║
║  ROW_NUMBER()  → unique row number (no ties)                    ║
║  RANK()        → tied rows get same rank + gap                  ║
║  DENSE_RANK()  → tied rows get same rank, no gap               ║
║  LAG(col, n)   → value of col from n rows back                  ║
║  LEAD(col, n)  → value of col from n rows ahead                 ║
╠══════════════════════════════════════════════════════════════════╣
║  COMMON INTERVIEW PATTERNS                                      ║
║  Nth highest salary → DENSE_RANK() or LIMIT/OFFSET             ║
║  Duplicates         → GROUP BY + HAVING COUNT(*) > 1           ║
║  Employees w/o dept → LEFT JOIN + IS NULL                       ║
║  Self-referencing   → SELF JOIN on manager_id = id             ║
║  Running total      → SUM() OVER (ORDER BY ... ROWS ...)        ║
╠══════════════════════════════════════════════════════════════════╣
║  PERFORMANCE CHECKLIST                                          ║
║  ✅ Use indexes on WHERE, JOIN, ORDER BY columns               ║
║  ✅ Avoid SELECT *                                              ║
║  ✅ Avoid functions on indexed columns in WHERE                 ║
║  ✅ Use EXPLAIN to inspect execution plan                       ║
║  ✅ Use covering indexes for read-heavy queries                 ║
║  ✅ Use LIMIT for top-N queries                                 ║
║  ✅ Rewrite correlated subqueries as JOINs                      ║
║  ✅ Solve N+1 with JOINs                                        ║
╚══════════════════════════════════════════════════════════════════╝
```

---

### 💡 Final Interview Tips

- Always **explain your reasoning** — interviewers want to see how you think
- For optimization questions: mention **EXPLAIN**, **indexing strategy**, and **query rewriting**
- Know the difference between **InnoDB and MyISAM** cold
- Practice writing **window functions** — they appear in almost every senior SQL interview
- Understand the **execution order** of SQL: `FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT`
- When asked about slow queries, start with: **"I'd run EXPLAIN first..."**
- Know your **NULL quirks**: `NULL = NULL` is false; use `IS NULL`; `NOT IN` with NULLs returns empty set

---

*Happy Querying! 🚀 — Practice makes permanent.*


