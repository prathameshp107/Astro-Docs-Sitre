---
title: "SQL Interview Questions"
description: "150+ SQL interview questions from beginner to advanced with hidden answers."
sidebar:
  order: 999
  label: "Interview Questions (150+)"
---

> **How to use:** Click any question to expand the answer.

---

## 🟢 Easy (Q1–Q50)

<details class="qa-card qa-easy">
<summary>
Q1. What is SQL and what is it used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**SQL (Structured Query Language)** is a standard programming language used to manage and manipulate relational databases. It's used to:

- **Query data** — `SELECT`
- **Manipulate data** — `INSERT`, `UPDATE`, `DELETE`
- **Define data structures** — `CREATE`, `ALTER`, `DROP`
- **Control access** — `GRANT`, `REVOKE`

```sql
SELECT name, salary FROM employees WHERE salary > 50000;
```

SQL is the foundation of database interaction in web applications, analytics, and backend systems.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. What is a relational database?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **relational database** organizes data into **tables** (relations) with **rows** (records) and **columns** (fields). Tables can be linked via **keys** (primary/foreign).

```
employees                          departments
┌────┬────────┬─────────┐         ┌────┬─────────────┐
│ id │ name   │ dept_id │── FK ──→│ id │ dept_name   │
├────┼────────┼─────────┤         ├────┼─────────────┤
│  1 │ Alice  │   10    │         │ 10 │ IT          │
│  2 │ Bob    │   20    │         │ 20 │ HR          │
└────┴────────┴─────────┘         └────┴─────────────┘
```

**Key features:**
- Data stored in tables with relationships
- Enforces **ACID** properties
- Uses **SQL** for querying
- Examples: MySQL, PostgreSQL, Oracle, SQL Server

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What are the different categories of SQL commands?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

SQL commands are grouped into **5 categories**:

| Category | Full Name | Commands |
|----------|-----------|----------|
| **DDL** | Data Definition Language | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **DML** | Data Manipulation Language | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** | Data Control Language | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control Language | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |
| **DQL** | Data Query Language | `SELECT` (often grouped under DML) |

```sql
DDL: CREATE TABLE users (id INT PRIMARY KEY);
DML: INSERT INTO users VALUES (1, 'Alice');
DCL: GRANT SELECT ON users TO 'john';
TCL: COMMIT;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What is a Primary Key?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Primary Key** is a column (or set of columns) that **uniquely identifies** each row in a table.

**Rules:**
- Must contain **unique** values
- Cannot be **NULL**
- Only **one** primary key per table
- Often used with `AUTO_INCREMENT`

```sql
CREATE TABLE users (
  id   INT          PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- Composite primary key
CREATE TABLE enrollments (
  student_id INT,
  course_id  INT,
  PRIMARY KEY (student_id, course_id)
);
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. What is a Foreign Key?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Foreign Key** is a column that references the Primary Key of another table, establishing a relationship and ensuring **referential integrity**.

```sql
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id  INT,
  amount   DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
```

**Referential actions:**
| Action | Behavior |
|--------|----------|
| `CASCADE` | Update/delete child rows automatically |
| `SET NULL` | Set child FK to NULL |
| `RESTRICT` | Prevent parent delete if children exist |
| `NO ACTION` | Same as RESTRICT |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. What is the difference between CHAR and VARCHAR?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | CHAR(n) | VARCHAR(n) |
|---------|---------|------------|
| **Storage** | Fixed length (padded with spaces) | Variable length + 1-2 bytes |
| **Speed** | Slightly faster | Slightly slower |
| **Space** | Wastes space if data is shorter | Efficient |
| **Max** | 255 characters | 65,535 characters |
| **Use case** | Fixed-length codes (ISO, UUID) | Variable text (names, emails) |

```sql
-- CHAR: always 2 bytes stored
country_code CHAR(2) -- 'US', 'IN', 'GB'

-- VARCHAR: only stores actual data
email VARCHAR(255)   -- 'alice@example.com' uses ~18 bytes
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. What is the difference between DELETE, TRUNCATE, and DROP?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | DELETE | TRUNCATE | DROP |
|---------|--------|----------|------|
| **Type** | DML | DDL | DDL |
| **Removes** | Selected rows | All rows | Entire table |
| **WHERE clause** | ✅ Yes | ❌ No | ❌ No |
| **Can ROLLBACK** | ✅ Yes | ❌ No (mostly) | ❌ No |
| **Triggers fire** | ✅ Yes | ❌ No | ❌ No |
| **Resets AUTO_INCREMENT** | ❌ No | ✅ Yes | N/A |
| **Speed** | Slow (row by row) | Fast | Instant |

```sql
DELETE FROM employees WHERE id = 5;  -- one row
TRUNCATE TABLE employees;            -- all rows, keep structure
DROP TABLE employees;                -- entire table gone
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. What are the different numeric data types in MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Type | Storage | Range |
|------|---------|-------|
| `TINYINT` | 1 byte | -128 to 127 |
| `SMALLINT` | 2 bytes | -32,768 to 32,767 |
| `MEDIUMINT` | 3 bytes | -8M to 8M |
| `INT` | 4 bytes | -2B to 2B |
| `BIGINT` | 8 bytes | Very large |
| `DECIMAL(p,s)` | Variable | Exact precision |
| `FLOAT` | 4 bytes | Approximate |
| `DOUBLE` | 8 bytes | Higher precision |

```sql
salary DECIMAL(10,2)  -- 99999999.99 (exact)
rating FLOAT           -- approximate
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. What are the date/time data types in MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Type | Format | Example | Use Case |
|------|--------|---------|----------|
| `DATE` | YYYY-MM-DD | 2024-04-06 | Birthdays, events |
| `TIME` | HH:MM:SS | 14:30:00 | Duration, time of day |
| `DATETIME` | YYYY-MM-DD HH:MM:SS | 2024-04-06 14:30:00 | General timestamps |
| `TIMESTAMP` | YYYY-MM-DD HH:MM:SS | 2024-04-06 14:30:00 | Auto-updating fields |
| `YEAR` | YYYY | 2024 | Year only |

```sql
CREATE TABLE events (
  event_date DATE,
  event_time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. What is the difference between DATETIME and TIMESTAMP?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | DATETIME | TIMESTAMP |
|---------|----------|-----------|
| **Range** | '1000-01-01' to '9999-12-31' | '1970-01-01' to '2038-01-19' |
| **Storage** | 8 bytes | 4 bytes |
| **Timezone** | Stored as-is | Converted to UTC, converted back on retrieval |
| **Auto-update** | Manual only | `DEFAULT CURRENT_TIMESTAMP` + `ON UPDATE` |
| **Index** | Slightly slower | Slightly faster |

```sql
-- TIMESTAMP is timezone-aware
-- If you insert '2024-04-06 14:30:00' with session timezone +05:30
-- It stores as UTC: '2024-04-06 09:00:00'
-- Retrieval converts back to session timezone
```

**Use DATETIME** when you don't need timezone conversion.
**Use TIMESTAMP** for audit columns (`created_at`, `updated_at`).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. What is a UNIQUE constraint?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **UNIQUE** constraint ensures all values in a column (or column combination) are distinct.

```sql
CREATE TABLE users (
  id    INT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,  -- no two users can have the same email
  phone VARCHAR(15) UNIQUE    -- multiple UNIQUE columns allowed
);

-- Add UNIQUE later
ALTER TABLE users ADD UNIQUE (email);

-- Composite UNIQUE
ALTER TABLE users ADD UNIQUE (first_name, last_name);
```

**Key differences from Primary Key:**
- Can have multiple UNIQUE constraints (only one PK)
- UNIQUE can contain NULL values (PK cannot)
- Both create an index automatically

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. What is the DEFAULT constraint?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **DEFAULT** constraint provides a default value for a column when no value is specified during insertion.

```sql
CREATE TABLE employees (
  id         INT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  department VARCHAR(50) DEFAULT 'General',
  salary     DECIMAL(10,2) DEFAULT 0.00,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employees (id, name) VALUES (1, 'Alice');
-- department = 'General', salary = 0.00, is_active = TRUE, created_at = NOW()
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. What is a CHECK constraint?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **CHECK** constraint validates that column values meet a specified condition (MySQL 8.0.16+).

```sql
CREATE TABLE employees (
  id     INT PRIMARY KEY,
  name   VARCHAR(100),
  age    INT CHECK (age >= 18 AND age <= 100),
  salary DECIMAL(10,2) CHECK (salary >= 0),
  gender ENUM('M', 'F', 'Other')
);

-- Named check (better for error messages)
CREATE TABLE products (
  id    INT PRIMARY KEY,
  price DECIMAL(10,2),
  CONSTRAINT chk_price_positive CHECK (price > 0)
);
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. What is NULL in SQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**NULL** represents an **unknown** or **missing** value — it is NOT the same as zero or empty string.

```sql
-- Check for NULL (cannot use = or !=)
SELECT * FROM employees WHERE phone IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;

-- NULL in comparisons
NULL = NULL   -- NULL (not TRUE!)
NULL != NULL  -- NULL (not FALSE!)
NULL = 5      -- NULL

-- NULL in arithmetic
10 + NULL     -- NULL
CONCAT('Hi', NULL) -- NULL

-- NULL in aggregates
SELECT COUNT(*), COUNT(phone), AVG(salary)
FROM employees;
-- COUNT(*) counts all rows
-- COUNT(phone) excludes NULLs
-- AVG ignores NULLs
```

**Avoid:** `NOT IN` with NULLs can produce unexpected results.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. What is the WHERE clause?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **WHERE** clause filters rows before any grouping occurs. It uses conditions to select only matching records.

```sql
-- Comparison operators
SELECT * FROM employees WHERE salary >= 50000;
SELECT * FROM employees WHERE department = 'IT';

-- Multiple conditions
SELECT * FROM employees
WHERE department = 'IT' AND salary > 70000;

SELECT * FROM employees
WHERE department = 'IT' OR department = 'HR';

-- Range
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 80000;

-- List match
SELECT * FROM employees WHERE department IN ('IT', 'HR', 'Finance');

-- Pattern matching
SELECT * FROM employees WHERE name LIKE 'A%';     -- starts with A
SELECT * FROM employees WHERE name LIKE '%son';   -- ends with 'son'
SELECT * FROM employees WHERE name LIKE '%mith%'; -- contains 'mith'

-- NULL check
SELECT * FROM employees WHERE manager_id IS NULL;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What is the ORDER BY clause?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**ORDER BY** sorts the result set in ascending (`ASC`, default) or descending (`DESC`) order.

```sql
-- Single column
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees
ORDER BY department ASC, salary DESC;

-- By column position
SELECT name, salary FROM employees ORDER BY 2 DESC; -- order by salary

-- With expressions
SELECT name, salary * 12 AS annual FROM employees
ORDER BY annual DESC;

-- NULL ordering
SELECT name, manager_id FROM employees
ORDER BY manager_id ASC;  -- NULLs appear first (default in MySQL)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. What is the LIMIT clause?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**LIMIT** restricts the number of rows returned. `OFFSET` skips a specified number of rows before starting.

```sql
-- Top 5 highest paid
SELECT name, salary FROM employees
ORDER BY salary DESC
LIMIT 5;

-- Pagination: page 2 (rows 11-20)
SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 10;

-- Shorthand syntax
LIMIT 10 OFFSET 10  →  LIMIT 10, 10  (MySQL only)
```

**Interview tip:** `LIMIT` + `OFFSET` with large offsets can be slow. Use keyset pagination for better performance.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. What is the SELECT statement?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**SELECT** retrieves data from one or more tables. It can include filtering, sorting, grouping, and joining.

```sql
-- Full syntax order
SELECT    column1, column2
FROM      table1
JOIN      table2 ON condition
WHERE     filter_condition
GROUP BY  columns
HAVING    group_filter
ORDER BY  columns
LIMIT     count OFFSET skip;

-- Execution order (important!)
-- FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

-- Basic examples
SELECT * FROM employees;                        -- all columns
SELECT DISTINCT department FROM employees;      -- unique values
SELECT name, salary * 12 AS annual FROM employees;  -- expression
SELECT NOW(), CURDATE();                        -- functions
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. What does SELECT DISTINCT do?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**SELECT DISTINCT** removes duplicate rows from the result set, returning only unique values.

```sql
-- Unique departments
SELECT DISTINCT department FROM employees;

-- Unique combinations
SELECT DISTINCT department, location FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department) FROM employees;

-- DISTINCT vs GROUP BY
SELECT DISTINCT department FROM employees;        -- simpler
SELECT department FROM employees GROUP BY department;  -- more flexible (can add aggregates)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. How do you use LIKE for pattern matching?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**LIKE** performs pattern matching using two wildcards:

- `%` — Matches **any sequence** of characters (including zero)
- `_` — Matches **exactly one** character

```sql
-- % (any sequence)
SELECT * FROM employees WHERE name LIKE 'A%';      -- starts with A
SELECT * FROM employees WHERE name LIKE '%son';     -- ends with 'son'
SELECT * FROM employees WHERE name LIKE '%mith%';   -- contains 'mith'
SELECT * FROM employees WHERE email LIKE '%@gmail.com';

-- _ (one character)
SELECT * FROM employees WHERE name LIKE 'A_';       -- exactly 2 chars, starts with A
SELECT * FROM employees WHERE name LIKE '____';     -- exactly 4 characters

-- Escape special chars
SELECT * FROM products WHERE code LIKE '100\%';     -- literal % (with ESCAPE)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. What are IN and BETWEEN operators?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**IN** checks if a value matches any value in a list. **BETWEEN** checks if a value is within a range (inclusive).

```sql
-- IN: value in a list
SELECT * FROM employees WHERE department IN ('IT', 'Finance', 'HR');

-- IN with subquery
SELECT * FROM employees
WHERE dept_id IN (SELECT id FROM departments WHERE active = 1);

-- NOT IN
SELECT * FROM employees WHERE department NOT IN ('HR', 'Admin');

-- BETWEEN: inclusive range
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 80000;
-- Equivalent to: salary >= 40000 AND salary <= 80000

-- BETWEEN with dates
SELECT * FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';

-- NOT BETWEEN
SELECT * FROM employees WHERE salary NOT BETWEEN 30000 AND 50000;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. What is an alias in SQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

An **alias** gives a table or column a temporary name, making queries more readable. Use `AS` (optional).

```sql
-- Column alias
SELECT name AS employee_name, salary * 12 AS annual_salary
FROM employees;

-- Table alias (essential for joins and self-joins)
SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;

-- Self-join alias
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;

-- Alias with spaces (use quotes)
SELECT name AS "Employee Name" FROM employees;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. How do you use INSERT INTO?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**INSERT** adds new rows to a table.

```sql
-- Insert one row
INSERT INTO employees (name, email, department, salary)
VALUES ('Alice', 'alice@mail.com', 'IT', 75000);

-- Insert multiple rows (faster)
INSERT INTO employees (name, email, department, salary)
VALUES
  ('Bob', 'bob@mail.com', 'HR', 60000),
  ('Carol', 'carol@mail.com', 'Finance', 80000);

-- Insert from another query
INSERT INTO high_earners (name, salary)
SELECT name, salary FROM employees WHERE salary > 100000;

-- Insert with default values
INSERT INTO employees (name) VALUES ('David');
-- Other columns get their DEFAULT values

-- Insert ignoring duplicates
INSERT IGNORE INTO employees (id, name) VALUES (1, 'Alice');
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. How do you use UPDATE?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**UPDATE** modifies existing rows. **Always use WHERE** unless you want to update all rows!

```sql
-- Update single column
UPDATE employees SET salary = 85000 WHERE id = 1;

-- Update multiple columns
UPDATE employees
SET salary = 90000, department = 'Engineering'
WHERE id = 1;

-- Update with arithmetic
UPDATE employees SET salary = salary * 1.10 WHERE department = 'IT';

-- Update with subquery
UPDATE employees
SET manager_id = (SELECT id FROM employees WHERE name = 'Alice')
WHERE department = 'IT';

-- Update with JOIN (MySQL)
UPDATE employees e
JOIN departments d ON e.dept_id = d.id
SET e.salary = e.salary * 1.15
WHERE d.dept_name = 'Engineering';
```

**⚠️ Safety pattern:**
```sql
-- First preview
SELECT * FROM employees WHERE department = 'HR';
-- Then update
UPDATE employees SET salary = salary * 1.05 WHERE department = 'HR';
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. How do you use DELETE?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**DELETE** removes rows from a table. **Always use WHERE** unless you want to empty the table!

```sql
-- Delete specific row
DELETE FROM employees WHERE id = 5;

-- Delete with condition
DELETE FROM employees WHERE department = 'HR' AND salary < 30000;

-- Delete with subquery
DELETE FROM employees
WHERE dept_id NOT IN (SELECT id FROM departments);

-- Delete with JOIN (MySQL)
DELETE e FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.id IS NULL;

-- Delete all rows (keep table)
DELETE FROM employees;
-- Faster alternative: TRUNCATE TABLE employees;
```

**⚠️ Safety pattern:**
```sql
-- Check first
SELECT * FROM employees WHERE department = 'Temp';
-- Then delete
DELETE FROM employees WHERE department = 'Temp';
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What is the CREATE TABLE statement?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**CREATE TABLE** defines a new table with its columns, data types, and constraints.

```sql
-- Basic table
CREATE TABLE employees (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE,
  department VARCHAR(50) DEFAULT 'General',
  salary     DECIMAL(10,2) CHECK (salary >= 0),
  hired_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table with foreign key
CREATE TABLE orders (
  order_id   INT PRIMARY KEY AUTO_INCREMENT,
  user_id    INT NOT NULL,
  amount     DECIMAL(10,2),
  order_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Temporary table (session-specific)
CREATE TEMPORARY TABLE temp_results (
  id INT,
  score INT
);

-- Create like another table (copies structure)
CREATE TABLE employees_backup LIKE employees;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. What is the ALTER TABLE statement?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**ALTER TABLE** modifies an existing table's structure.

```sql
-- Add a column
ALTER TABLE employees ADD phone VARCHAR(15);

-- Add column at specific position
ALTER TABLE employees ADD age INT AFTER name;

-- Drop a column
ALTER TABLE employees DROP COLUMN age;

-- Modify column data type
ALTER TABLE employees MODIFY salary FLOAT;

-- Rename a column
ALTER TABLE employees RENAME COLUMN phone TO mobile;

-- Change column name AND type (both)
ALTER TABLE employees CHANGE mobile contact_no VARCHAR(20);

-- Add constraint
ALTER TABLE employees ADD CONSTRAINT chk_salary CHECK (salary > 0);

-- Drop constraint
ALTER TABLE employees DROP CONSTRAINT chk_salary;

-- Rename table
ALTER TABLE employees RENAME TO staff;
-- or
RENAME TABLE employees TO staff;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. What is the DROP TABLE statement?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**DROP TABLE** permanently removes a table and all its data from the database. This operation cannot be undone (unless you have a backup).

```sql
-- Drop single table
DROP TABLE employees;

-- Drop multiple tables
DROP TABLE employees, departments;

-- Drop with IF EXISTS (prevents error if table doesn't exist)
DROP TABLE IF EXISTS employees;

-- Drop database
DROP DATABASE company_db;

-- Drop temporary table
DROP TEMPORARY TABLE temp_results;
```

**⚠️ Comparison:**
- `DELETE FROM employees` — removes all rows, keeps structure
- `TRUNCATE TABLE employees` — removes all rows (faster), keeps structure
- `DROP TABLE employees` — removes everything (table + data)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. What is the TRUNCATE TABLE statement?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**TRUNCATE TABLE** removes **all rows** from a table instantly while keeping the table structure. It's a DDL command.

```sql
TRUNCATE TABLE employees;
```

**Properties:**
- ✅ Much faster than `DELETE` (no row-by-row logging)
- ✅ Resets AUTO_INCREMENT counter to 0
- ❌ Cannot use WHERE clause
- ❌ Cannot be rolled back (in most cases)
- ❌ Does NOT fire triggers
- ❌ Doesn't work with foreign key references

**When to use TRUNCATE vs DELETE:**
- Use `TRUNCATE` to quickly clear test/staging tables
- Use `DELETE` when you need a WHERE clause or transactional safety

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. What are the string functions in MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```sql
-- Case conversion
UPPER('hello')        -- 'HELLO'
LOWER('HELLO')        -- 'hello'

-- Trimming
TRIM('  hello  ')     -- 'hello'
LTRIM('  hello')      -- 'hello'
RTRIM('hello  ')      -- 'hello'

-- Substring
SUBSTRING('hello', 2, 3)   -- 'ell'
LEFT('hello', 2)           -- 'he'
RIGHT('hello', 2)          -- 'lo'

-- Length
LENGTH('hello')       -- 5 (bytes)
CHAR_LENGTH('hello')  -- 5 (characters - same for ASCII)

-- Concatenation
CONCAT('Hello', ' ', 'World')   -- 'Hello World'
CONCAT_WS('-', '2024', '04', '06')  -- '2024-04-06'

-- Search
LOCATE('ll', 'hello')   -- 3 (position)
INSTR('hello', 'll')    -- 3

-- Replace
REPLACE('hello world', 'world', 'SQL')  -- 'hello SQL'

-- Reverse
REVERSE('hello')  -- 'olleh'

-- Repeat
REPEAT('x', 3)    -- 'xxx'
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q31. What are the date functions in MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```sql
-- Current date/time
NOW()         -- 2024-04-06 14:30:00
CURDATE()     -- 2024-04-06
CURTIME()     -- 14:30:00

-- Extract parts
YEAR(NOW())      -- 2024
MONTH(NOW())     -- 4
DAY(NOW())       -- 6
DAYOFWEEK(NOW()) -- 7 (Sunday=1)
DAYNAME(NOW())   -- 'Saturday'
MONTHNAME(NOW()) -- 'April'

-- Date arithmetic
DATE_ADD('2024-01-01', INTERVAL 1 MONTH)   -- 2024-02-01
DATE_SUB('2024-01-01', INTERVAL 7 DAY)     -- 2023-12-25
DATEDIFF('2024-03-01', '2024-01-01')       -- 60 (days)

-- Format
DATE_FORMAT(CURDATE(), '%M %d, %Y')  -- 'April 06, 2024'
DATE_FORMAT(CURDATE(), '%Y-%m-%d')   -- '2024-04-06'

-- Last day of month
LAST_DAY('2024-02-01')  -- '2024-02-29'

-- Extract
EXTRACT(YEAR FROM NOW())     -- 2024
EXTRACT(MONTH FROM NOW())    -- 4
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q32. What are the numeric/math functions in MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```sql
-- Rounding
ROUND(3.14159, 2)   -- 3.14
ROUND(3.14159)      -- 3
CEIL(3.1)           -- 4 (ceiling)
FLOOR(3.9)          -- 3 (floor)
TRUNCATE(3.14159, 2) -- 3.14 (truncate, no rounding)

-- Absolute
ABS(-10)            -- 10

-- Power/Square root
POW(2, 3)           -- 8
SQRT(16)            -- 4

-- Random
RAND()              -- random number 0 to 1
FLOOR(RAND() * 100) -- 0 to 99

-- Modulo
MOD(10, 3)          -- 1
10 % 3              -- 1

-- Sign
SIGN(-5)            -- -1
SIGN(0)             -- 0
SIGN(5)             -- 1

-- Greatest/Least
GREATEST(3, 7, 1)   -- 7
LEAST(3, 7, 1)      -- 1
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q33. What is the CASE expression?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**CASE** provides if-then-else logic in SQL. It can be used in SELECT, WHERE, ORDER BY, and other clauses.

```sql
-- Simple CASE (equality)
SELECT name, salary,
  CASE department
    WHEN 'IT' THEN 'Technology'
    WHEN 'HR' THEN 'People'
    ELSE 'Other'
  END AS category
FROM employees;

-- Searched CASE (conditions)
SELECT name, salary,
  CASE
    WHEN salary >= 100000 THEN 'Senior'
    WHEN salary >= 60000  THEN 'Mid-level'
    WHEN salary >= 30000  THEN 'Junior'
    ELSE 'Intern'
  END AS level
FROM employees;

-- CASE in ORDER BY
SELECT name, department, salary
FROM employees
ORDER BY
  CASE department
    WHEN 'IT' THEN 1
    WHEN 'Finance' THEN 2
    ELSE 3
  END;

-- CASE with aggregation (pivot)
SELECT
  SUM(CASE WHEN department = 'IT' THEN 1 ELSE 0 END) AS it_count,
  SUM(CASE WHEN department = 'HR' THEN 1 ELSE 0 END) AS hr_count
FROM employees;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q34. What is COALESCE and IFNULL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**COALESCE** returns the first non-NULL value from a list. **IFNULL** returns a replacement for NULL.

```sql
-- COALESCE (multiple values)
SELECT
  name,
  COALESCE(phone, email, 'No contact') AS contact
FROM employees;
-- Returns first non-NULL: phone → email → 'No contact'

-- IFNULL (two values)
SELECT name, IFNULL(phone, 'No phone') AS phone FROM employees;

-- NULLIF (returns NULL if equal)
SELECT NULLIF(a, b);  -- if a = b, returns NULL; otherwise returns a

-- Practical use: division by zero prevention
SELECT
  total_sales,
  total_employees,
  total_sales / NULLIF(total_employees, 0) AS per_capita
FROM departments;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q35. What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT)?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```sql
-- COUNT(*): total rows (includes NULLs)
SELECT COUNT(*) FROM employees;           -- 100 rows

-- COUNT(column): non-NULL values only
SELECT COUNT(phone) FROM employees;       -- 85 (15 NULLs excluded)

-- COUNT(DISTINCT): unique non-NULL values
SELECT COUNT(DISTINCT department) FROM employees;  -- 5 unique departments

-- Practical examples
SELECT
  COUNT(*)                    AS total_employees,
  COUNT(manager_id)           AS has_manager,
  COUNT(DISTINCT department)  AS unique_depts,
  COUNT(DISTINCT manager_id)  AS unique_managers
FROM employees;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q36. What are the aggregate functions in SQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Aggregate functions perform calculations across rows and return a **single value**. They ignore NULLs (except `COUNT(*)`).

```sql
SELECT
  COUNT(*)      AS total,         -- number of rows
  COUNT(salary) AS with_salary,   -- non-NULL values
  SUM(salary)   AS total_salary,  -- sum
  AVG(salary)   AS avg_salary,    -- average
  MAX(salary)   AS highest,       -- maximum
  MIN(salary)   AS lowest,        -- minimum
  STD(salary)   AS std_dev,       -- standard deviation
  VARIANCE(salary) AS variance,   -- variance
  GROUP_CONCAT(name) AS names     -- concatenate values (MySQL)
FROM employees;
```

**Key point:** Aggregates ignore NULLs:
- `AVG(salary)` = SUM of salaries / count of non-NULL salaries
- `COUNT(salary)` = count of non-NULL salaries
- Use `IFNULL(salary, 0)` if you want to include NULLs as zeros

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q37. What is GROUP BY?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**GROUP BY** groups rows that have the same values in specified columns, allowing aggregate calculations per group.

```sql
-- Basic grouping
SELECT department, COUNT(*) AS total, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Multiple columns
SELECT department, location, COUNT(*) AS total
FROM employees
GROUP BY department, location;

-- With ORDER BY
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- Important: SELECT columns must be in GROUP BY or be aggregated
-- ✅ Correct
SELECT department, COUNT(*) FROM employees GROUP BY department;

-- ❌ Error (name is neither in GROUP BY nor aggregated)
SELECT department, name, COUNT(*) FROM employees GROUP BY department;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q38. What is HAVING and how is it different from WHERE?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Clause | When it runs | What it filters |
|--------|-------------|-----------------|
| **WHERE** | Before GROUP BY | Individual **rows** |
| **HAVING** | After GROUP BY | **Groups** (using aggregates) |

```sql
-- WHERE: filter rows BEFORE grouping
-- HAVING: filter groups AFTER grouping

SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal
FROM employees
WHERE salary > 30000               -- exclude low earners
GROUP BY department
HAVING cnt > 5                      -- only departments with >5 employees
   AND avg_sal > 60000;             -- with average salary > 60000

-- WHERE can use columns, HAVING can use aggregates
-- ❌ WHERE cannot use aggregate functions
SELECT department FROM employees
WHERE COUNT(*) > 5                  -- ERROR!
GROUP BY department;

-- ✅ HAVING can use aggregates
SELECT department FROM employees
GROUP BY department
HAVING COUNT(*) > 5;                -- correct
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q39. What is the difference between WHERE and ON in a JOIN?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- **ON** defines how tables are **joined** (the join condition)
- **WHERE** **filters** the result after the join

**Key difference with LEFT JOIN:**
```sql
-- Filter in WHERE: removes rows AFTER join (can turn LEFT JOIN into INNER)
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.dept_name = 'IT';
-- Only employees in IT — David (no dept) is excluded by WHERE

-- Filter in ON: applied BEFORE/during join (preserves all left rows)
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id AND d.dept_name = 'IT';
-- All employees — David appears with NULL for dept_name
```

| Clause | When it runs | Effect on LEFT JOIN |
|--------|-------------|-------------------|
| `ON` condition | During join | Doesn't exclude left-table rows |
| `WHERE` condition | After join | Can exclude left-table rows |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q40. What is the SQL execution order?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

SQL queries are executed in this logical order (not written order):

```sql
-- Written order:
SELECT   column1, aggregate(col2)
FROM     table1
JOIN     table2 ON condition
WHERE    filter
GROUP BY column
HAVING   group_filter
ORDER BY column
LIMIT    n OFFSET m;

-- Execution order:
-- 1. FROM      → which table(s)?
-- 2. JOIN      → combine tables
-- 3. WHERE     → filter rows (no aggregates yet)
-- 4. GROUP BY  → group rows
-- 5. HAVING    → filter groups (aggregates available)
-- 6. SELECT    → compute columns/expressions
-- 7. ORDER BY  → sort results
-- 8. LIMIT     → restrict output
```

**Why this matters:**
- You can't use column aliases from SELECT in WHERE (WHERE runs first)
- You CAN use aliases in ORDER BY (runs after SELECT)
- HAVING can use aggregate results, WHERE cannot

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q41. What is a schema in a database?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **schema** is the logical container that holds database objects (tables, views, indexes, procedures, etc.). In MySQL, the terms "schema" and "database" are often used interchangeably.

```sql
-- In MySQL, CREATE SCHEMA is a synonym for CREATE DATABASE
CREATE SCHEMA company_db;
CREATE DATABASE company_db;  -- same thing

-- View schema information
SHOW DATABASES;           -- list all schemas
SHOW TABLES;              -- tables in current schema
DESCRIBE employees;       -- column info for a table
SHOW CREATE TABLE employees;  -- full table definition

-- Information schema (metadata)
SELECT TABLE_NAME, TABLE_ROWS
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'company_db';
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q42. What is the difference between DDL, DML, DCL, and TCL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Type | Purpose | Commands | Auto-Commit | Rollback |
|------|---------|----------|-------------|----------|
| **DDL** | Define/modify structure | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` | ✅ Yes | ❌ No |
| **DML** | Manipulate data | `SELECT`, `INSERT`, `UPDATE`, `DELETE` | ❌ No | ✅ Yes |
| **DCL** | Control access | `GRANT`, `REVOKE` | ✅ Yes | ❌ No |
| **TCL** | Manage transactions | `COMMIT`, `ROLLBACK`, `SAVEPOINT` | N/A | N/A |

```sql
-- DDL: defines structure (auto-committed)
CREATE TABLE users (id INT PRIMARY KEY);

-- DML: manipulates data (can be rolled back)
START TRANSACTION;
  INSERT INTO users VALUES (1, 'Alice');
ROLLBACK;  -- undoes the insert

-- DCL: controls permissions
GRANT SELECT ON users TO 'john';

-- TCL: transaction control
SAVEPOINT sp1;
ROLLBACK TO sp1;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q43. What is an ENUM in MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**ENUM** is a string data type that restricts a column to one value from a predefined list.

```sql
CREATE TABLE employees (
  id       INT PRIMARY KEY,
  name     VARCHAR(100),
  gender   ENUM('M', 'F', 'Other'),
  status   ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

INSERT INTO employees VALUES (1, 'Alice', 'F', 'active');
INSERT INTO employees VALUES (2, 'Bob', 'M', DEFAULT);  -- 'active'

-- ENUM values are stored as integers internally (1, 2, 3...)
-- Can be compared by index position
SELECT * FROM employees WHERE gender > 1;  -- values after 'M'
```

**Pros:** Compact storage (1-2 bytes), data integrity
**Cons:** Adding new values requires ALTER TABLE (schema change), not portable

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q44. What are SET operations in SQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**SET operations** combine results from multiple SELECT queries.

```sql
-- UNION: removes duplicates (sorts results)
SELECT name FROM employees
UNION
SELECT name FROM contractors;
-- Returns unique names from both tables

-- UNION ALL: keeps duplicates (faster)
SELECT name FROM employees
UNION ALL
SELECT name FROM contractors;
-- Returns ALL names, including duplicates

-- INTERSECT: rows that appear in both (MySQL 8.0.31+)
SELECT name FROM employees
INTERSECT
SELECT name FROM contractors;

-- EXCEPT: rows in first but not in second (MySQL 8.0.31+)
SELECT name FROM employees
EXCEPT
SELECT name FROM contractors;
```

**Rules:** Same number of columns, compatible data types
**Note:** MySQL 8.0.31+ supports `INTERSECT` and `EXCEPT`. Earlier versions use workarounds.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q45. How do you show table structure in MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```sql
-- Show columns in a table
DESCRIBE employees;
DESC employees;
EXPLAIN employees;  -- MySQL treats EXPLAIN and DESCRIBE as synonyms for tables

-- Output:
-- +----------+--------------+------+-----+---------+----------------+
-- | Field    | Type         | Null | Key | Default | Extra          |
-- +----------+--------------+------+-----+---------+----------------+
-- | id       | int          | NO   | PRI | NULL    | auto_increment |
-- | name     | varchar(100) | YES  |     | NULL    |                |
-- | email    | varchar(255) | YES  | UNI | NULL    |                |
-- +----------+--------------+------+-----+---------+----------------+

-- Show full table definition
SHOW CREATE TABLE employees;

-- Show table status (size, rows, engine)
SHOW TABLE STATUS LIKE 'employees';

-- List all tables
SHOW TABLES;

-- Show all databases
SHOW DATABASES;
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q46. What is the difference between MyISAM and InnoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | MyISAM | InnoDB |
|---------|--------|--------|
| **Transactions** | ❌ No | ✅ Yes (ACID) |
| **Foreign Keys** | ❌ No | ✅ Yes |
| **Row-level locking** | ❌ No (table-level) | ✅ Yes |
| **Full-text indexes** | ✅ Yes | ✅ Yes (MySQL 5.6+) |
| **Crash recovery** | ❌ Poor | ✅ Good (redo log) |
| **COUNT(*)** | Fast (cached) | Slower (full scan) |
| **Storage** | 3 files (.frm, .MYD, .MYI) | 2 files (.frm, .ibd) |
| **Compression** | ✅ Yes | ✅ Yes (with compression) |
| **Use case** | Read-heavy, analytics | OLTP, data integrity |

```sql
-- Check engine
SHOW TABLE STATUS LIKE 'employees';

-- Specify engine
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100)
) ENGINE=InnoDB;
```

**Default:** InnoDB since MySQL 5.5+ (MyISAM was default before).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q47. What is normalization?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Normalization** organizes data to reduce redundancy and improve integrity. It involves splitting tables and defining relationships.

**1NF: Atomic values**
```
❌ Non-atomic                       ✅ 1NF
┌────┬────────┬──────────────┐      ┌────┬────────┬──────┐
│ id │ name   │ phones        │      │ id │ name   │ phone│
├────┼────────┼──────────────┤      ├────┼────────┼──────┤
│ 1  │ Alice  │ 111, 222     │  →   │ 1  │ Alice  │ 111  │
└────┴────────┴──────────────┘      │ 1  │ Alice  │ 222  │
                                    └────┴────────┴──────┘
```

**2NF: No partial dependency on composite key**
```sql
-- Split into: students(student_id, name), courses(course_id, name)
-- enrollments(student_id, course_id, grade)
```

**3NF: No transitive dependency**
```sql
-- ❌ employee(id, name, dept_id, dept_name, dept_location)
-- dept_name depends on dept_id, not employee id

-- ✅ employees(id, name, dept_id)
--    departments(dept_id, dept_name, location)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q48. What is denormalization?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Denormalization** is the intentional introduction of redundancy into a database design to **improve read performance** by reducing JOINs.

```sql
-- Normalized (3NF)
SELECT o.order_id, u.name, o.amount
FROM orders o
JOIN users u ON o.user_id = u.id;  -- needs JOIN every time

-- Denormalized (redundant but faster reads)
CREATE TABLE orders_denormalized (
  order_id INT,
  user_name VARCHAR(100),  -- copied from users table
  amount DECIMAL(10,2)
);
SELECT order_id, user_name, amount FROM orders_denormalized;  -- no JOIN
```

**When to denormalize:**
- Read-heavy reporting/analytics
- Star/snowflake schema in data warehouses
- When JOIN performance is a bottleneck

**Cost:** More storage, update anomalies, data inconsistency risk.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q49. What is an index in SQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

An **index** is a data structure (usually B-Tree) that speeds up data retrieval at the cost of slower writes and extra storage.

```
Without Index:                With Index (B-Tree):
Scan all 1M rows  →           Jump directly to matching rows
     🐢 O(n)                          🚀 O(log n)
```

```sql
-- Create index
CREATE INDEX idx_department ON employees(department);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Composite index (for multi-column queries)
CREATE INDEX idx_dept_salary ON employees(department, salary);

-- Drop index
DROP INDEX idx_department ON employees;

-- Check index usage
EXPLAIN SELECT * FROM employees WHERE department = 'IT';
-- Look for: key (index used), rows (scanned)
```

**What to index:**
- Columns in WHERE, JOIN ON, ORDER BY, GROUP BY
- High-cardinality columns (many unique values)

**What NOT to index:**
- Low-cardinality (gender, boolean)
- Tables with heavy writes (index maintenance is expensive)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q50. What are constraints in SQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Constraints** enforce rules on data in tables to maintain integrity.

```sql
CREATE TABLE employees (
  -- PRIMARY KEY: unique identifier, NOT NULL, one per table
  id         INT PRIMARY KEY AUTO_INCREMENT,

  -- NOT NULL: cannot be empty
  name       VARCHAR(100) NOT NULL,

  -- UNIQUE: all values must be different
  email      VARCHAR(255) UNIQUE,

  -- DEFAULT: value used when none provided
  status     VARCHAR(20) DEFAULT 'active',

  -- CHECK: validates condition (MySQL 8.0.16+)
  salary     DECIMAL(10,2) CHECK (salary > 0),

  -- FOREIGN KEY: references another table
  dept_id    INT,
  FOREIGN KEY (dept_id) REFERENCES departments(id)
    ON DELETE SET NULL
);

-- Add constraints to existing table
ALTER TABLE employees
  ADD CONSTRAINT chk_age CHECK (age >= 18),
  ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(id);
```

</div>
</details>

---

## 🟡 Medium (Q51–Q110)

<details class="qa-card qa-medium">
<summary>
Q51. What is an INNER JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**INNER JOIN** returns only rows that have matching values in **both** tables. Unmatched rows are excluded.

```sql
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
```

**Venn diagram:** Only the intersection (matching rows from both).

```
employees                         departments
┌────┬────────┬─────────┐         ┌────┬─────────────┐
│ id │ name   │ dept_id │         │ id │ dept_name   │
├────┼────────┼─────────┤         ├────┼─────────────┤
│  1 │ Alice  │  10     │────────▶│ 10 │ IT          │
│  2 │ Bob    │  20     │────────▶│ 20 │ HR          │
│  3 │ David  │  NULL   │    ❌   │ 30 │ Finance     │
│  4 │ Eve    │  10     │────────▶│    │ Marketing   │
└────┴────────┴─────────┘         └────┴─────────────┘
```

**Result:** Only Alice, Bob, Eve appear (David has NULL dept, Marketing has no employees)

- Most common join type
- Can omit `INNER` (just `JOIN` — same thing)
- Excludes rows with NULL join keys

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. What is a LEFT JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**LEFT JOIN** returns **all rows from the left table**, with matching rows from the right table. If no match exists, right-side columns are NULL.

```sql
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
```

```
employees (LEFT)          departments (RIGHT)
┌────────┐                ┌─────────────┐
│ Alice  │───────────────▶│ IT          │  ✅ Match
│ Bob    │───────────────▶│ HR          │  ✅ Match
│ David  │────✗──────────▶│ NULL        │  ⚠️ No dept → NULL
│ Eve    │───────────────▶│ IT          │  ✅ Match
└────────┘                └─────────────┘
```

**Result:** All 4 employees appear. David gets NULL for department.

**Common use cases:**
```sql
-- Find employees without a department
SELECT e.name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.id IS NULL;

-- Include all items, even those never ordered
SELECT p.name, o.order_id
FROM products p
LEFT JOIN orders o ON p.id = o.product_id;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. What is a RIGHT JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**RIGHT JOIN** returns **all rows from the right table**, with matching rows from the left table. If no match exists, left-side columns are NULL.

```sql
SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id;
```

```
employees (LEFT)          departments (RIGHT)
┌────────┐                ┌─────────────┐
│ Alice  │───────────────▶│ IT          │  ✅ Match
│ Bob    │───────────────▶│ HR          │  ✅ Match
│ NULL   │◀──────✗────────│ Marketing   │  ⚠️ No employee → NULL
└────────┘                └─────────────┘
```

**Result:** All departments appear. Marketing gets NULL for employee name.

```sql
-- Find departments without employees
SELECT d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id
WHERE e.id IS NULL;
```

**Note:** RIGHT JOIN is less common — most developers prefer LEFT JOIN by swapping table order.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. What is a FULL OUTER JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**FULL OUTER JOIN** returns **all rows from both tables**. Missing matches get NULL on the opposite side.

**⚠️ MySQL doesn't support FULL OUTER JOIN directly.** Use UNION of LEFT and RIGHT JOIN:

```sql
-- MySQL workaround
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id

UNION

SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id;
```

**Result:**
```
┌────────┬─────────────┐
│ name   │ dept_name   │
├────────┼─────────────┤
│ Alice  │ IT          │
│ Bob    │ HR          │
│ David  │ NULL        │  ← employee with no dept
│ NULL   │ Marketing   │  ← dept with no employee
└────────┴─────────────┘
```

**Use case:** Finding unmatched rows on both sides (orphaned records).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What is a SELF JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **SELF JOIN** joins a table with itself, using aliases to distinguish the two roles.

```sql
-- Find employee-manager relationships
SELECT
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

**Sample data:**
```
employees
┌────┬────────┬────────────┐
│ id │ name   │ manager_id │
├────┼────────┼────────────┤
│  1 │ Alice  │   NULL     │  ← CEO
│  2 │ Bob    │   1        │  ← reports to Alice
│  3 │ Carol  │   1        │  ← reports to Alice
│  4 │ David  │   2        │  ← reports to Bob
└────┴────────┴────────────┘
```

**Other use cases:**
```sql
-- Find employees with same manager
SELECT a.name, b.name AS colleague
FROM employees a
JOIN employees b ON a.manager_id = b.manager_id
WHERE a.id < b.id;  -- avoid duplicate pairs

-- Find product categories and subcategories
SELECT c1.name AS category, c2.name AS subcategory
FROM categories c1
JOIN categories c2 ON c1.id = c2.parent_id;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. What is a CROSS JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**CROSS JOIN** returns the **Cartesian product** — every row from table A paired with every row from table B. No `ON` condition needed.

```sql
SELECT e.name, d.dept_name
FROM employees e
CROSS JOIN departments d;
-- 5 employees × 4 departments = 20 rows
```

**Result:**
```
┌────────┬─────────────┐
│ name   │ dept_name   │
├────────┼─────────────┤
│ Alice  │ IT          │
│ Alice  │ HR          │
│ Alice  │ Finance     │
│ Alice  │ Marketing   │
│ Bob    │ IT          │
│ ...    │ ...         │  ← every employee × every department
└────────┴─────────────┘
```

**Use cases:**
- Generating all combinations (e.g., all products × all stores)
- Creating test data
- Calendar tables (all dates × all hours)
- Pivot/unpivot operations

**⚠️ Be careful:** Accidental CROSS JOIN without WHERE/ON can create huge result sets.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. What is a self-join query to find duplicate emails?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- Find all users with duplicate emails
SELECT a.id, a.email
FROM users a
JOIN users b ON a.email = b.email AND a.id < b.id;

-- Full details of duplicates
SELECT * FROM users
WHERE email IN (
  SELECT email FROM users
  GROUP BY email
  HAVING COUNT(*) > 1
)
ORDER BY email;

-- Delete duplicates (keep the lowest ID)
DELETE FROM users
WHERE id NOT IN (
  SELECT MIN(id) FROM users GROUP BY email
);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. How do you find the second highest salary?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Three approaches — each useful in different scenarios:

```sql
-- Method 1: Subquery (simplest)
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 2: LIMIT + OFFSET (works for Nth highest)
SELECT DISTINCT salary FROM employees
ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Method 3: Window function (most flexible — Nth salary)
SELECT DISTINCT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) t WHERE rnk = 2;

-- Nth highest (generalized)
SELECT DISTINCT salary FROM employees e1
WHERE N = (SELECT COUNT(DISTINCT salary) FROM employees e2
           WHERE e2.salary >= e1.salary);
-- Replace N with position (2 for 2nd, 3 for 3rd, etc.)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. What is a subquery?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **subquery** is a query nested inside another query (enclosed in parentheses). It can be used in SELECT, FROM, WHERE, or HAVING clauses.

```sql
-- Scalar subquery (returns one value)
SELECT name, salary FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Row subquery (returns one row)
SELECT * FROM employees
WHERE (department, salary) = (
  SELECT department, MAX(salary) FROM employees
  GROUP BY department LIMIT 1
);

-- Table subquery (used in FROM — derived table)
SELECT dept, avg_salary
FROM (
  SELECT department AS dept, AVG(salary) AS avg_salary
  FROM employees GROUP BY department
) AS dept_stats
WHERE avg_salary > 60000;

-- Subquery with IN
SELECT name FROM employees
WHERE dept_id IN (
  SELECT id FROM departments WHERE location = 'New York'
);

-- Subquery with EXISTS (correlated)
SELECT d.dept_name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e WHERE e.dept_id = d.id
);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. What is a correlated subquery?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **correlated subquery** references columns from the outer query and is re-executed **for each row** of the outer query.

```sql
-- Find employees earning more than their department average
SELECT e1.name, e1.salary, e1.department
FROM employees e1
WHERE e1.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department = e1.department  -- ← references outer query
);

-- Find departments that have at least 3 employees
SELECT d.dept_name
FROM departments d
WHERE (
  SELECT COUNT(*) FROM employees e
  WHERE e.dept_id = d.id
) >= 3;
```

**Performance:** Can be slow for large tables because the subquery runs once per outer row. Consider rewriting with JOIN or window functions.

```sql
-- Same query with GROUP BY (often faster)
SELECT e1.name, e1.salary, e1.department
FROM employees e1
JOIN (
  SELECT department, AVG(salary) AS avg_sal
  FROM employees GROUP BY department
) dept_avg ON e1.department = dept_avg.department
WHERE e1.salary > dept_avg.avg_sal;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q61. What is the difference between subquery and JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Aspect | Subquery | JOIN |
|--------|----------|------|
| **Readability** | Simple for basic filters | Better for multi-table output |
| **Performance** | Can be slower (runs repeatedly for correlated) | Usually faster with proper indexes |
| **Flexibility** | Can't return columns from other tables | Can select from multiple tables |
| **Duplicates** | No risk (just filters) | May need DISTINCT |
| **Aggregation** | Good for scalar comparisons | Better for grouped results |

**When to use each:**

```sql
-- ✅ Subquery: when you just need a filter value
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- ✅ JOIN: when you need data from multiple tables
SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;

-- ✅ JOIN: replacing IN subquery (usually faster)
SELECT e.name FROM employees e
JOIN departments d ON e.dept_id = d.id
WHERE d.dept_name = 'IT';
-- Better than: WHERE dept_id IN (SELECT id FROM departments WHERE dept_name = 'IT')
```

**Modern MySQL optimizer** often treats both the same way — use what's clearer.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. What is a CTE (Common Table Expression)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **CTE** is a temporary named result set that exists only within a single query's scope. It makes complex queries more readable.

```sql
-- Basic CTE
WITH dept_stats AS (
  SELECT department, AVG(salary) AS avg_sal, COUNT(*) AS emp_count
  FROM employees
  GROUP BY department
)
SELECT e.name, e.salary, d.avg_sal, d.emp_count
FROM employees e
JOIN dept_stats d ON e.department = d.department
WHERE e.salary > d.avg_sal;

-- Multiple CTEs
WITH
dept_stats AS (
  SELECT department, AVG(salary) AS avg_sal
  FROM employees GROUP BY department
),
high_performers AS (
  SELECT e.* FROM employees e
  WHERE e.salary > (SELECT avg_sal FROM dept_stats d WHERE d.department = e.department)
)
SELECT * FROM high_performers;

-- CTE with window function
WITH ranked AS (
  SELECT name, salary, department,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT * FROM ranked WHERE rnk <= 3;  -- top 3 per department
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. What is a recursive CTE?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **recursive CTE** calls itself to process hierarchical or tree-structured data (org charts, category trees, etc.).

```sql
-- Find all employees reporting directly or indirectly to Alice
WITH RECURSIVE org_chart AS (
  -- Anchor: start with Alice (CEO)
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE name = 'Alice'

  UNION ALL

  -- Recursive: find all direct reports of those already found
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;

-- Generate a series of numbers
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT * FROM numbers;

-- Calendar table
WITH RECURSIVE dates AS (
  SELECT '2024-01-01' AS date
  UNION ALL
  SELECT date + INTERVAL 1 DAY FROM dates WHERE date < '2024-12-31'
)
SELECT * FROM dates;
```

**Structure:** Anchor member (initial set) + Recursive member (references CTE itself)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. What are window functions in SQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Window functions** perform calculations across a set of rows related to the current row **without collapsing** them into a single output row.

```sql
SELECT name, department, salary,
  -- Ranking functions
  ROW_NUMBER()   OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK()         OVER (PARTITION BY department ORDER BY salary DESC) AS ranking,
  DENSE_RANK()   OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank,
  NTILE(4)       OVER (ORDER BY salary DESC) AS quartile,

  -- Aggregate window functions
  SUM(salary)    OVER (PARTITION BY department) AS dept_total,
  AVG(salary)    OVER (PARTITION BY department) AS dept_avg,
  MAX(salary)    OVER (PARTITION BY department) AS dept_max,
  MIN(salary)    OVER (PARTITION BY department) AS dept_min,
  COUNT(*)       OVER (PARTITION BY department) AS dept_count,

  -- Value functions
  LAG(salary, 1)  OVER (ORDER BY salary) AS prev_salary,
  LEAD(salary, 1) OVER (ORDER BY salary) AS next_salary,
  FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS highest_paid,
  LAST_VALUE(name)  OVER (PARTITION BY department ORDER BY salary DESC
    RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_paid
FROM employees;
```

**Key parts:**
- `PARTITION BY` — divides rows into groups (like GROUP BY without collapsing)
- `ORDER BY` — defines ordering within each partition
- `ROWS/RANGE` — defines frame boundaries (default: all rows in partition to current)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
SELECT salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn,
  RANK()       OVER (ORDER BY salary DESC) AS r,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dr
FROM employees;
```

**Given salaries:** 90000, 80000, 80000, 70000, 60000

| salary | ROW_NUMBER | RANK | DENSE_RANK |
|--------|-----------|------|------------|
| 90000 | 1 | 1 | 1 |
| 80000 | 2 | 2 | 2 |
| 80000 | 3 | 2 | 2 |
| 70000 | 4 | 4 | 3 |
| 60000 | 5 | 5 | 4 |

| Function | Handles ties | Gaps after ties |
|----------|-------------|-----------------|
| **ROW_NUMBER** | Arbitrary order | No (always unique) |
| **RANK** | Same rank for ties | ✅ Yes (gap) |
| **DENSE_RANK** | Same rank for ties | ❌ No (no gap) |

```sql
-- Use ROW_NUMBER for pagination/unique ranking
-- Use RANK for "Olympic style" ranking (gaps)
-- Use DENSE_RANK when you want compact ranking (no gaps)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. What are LAG() and LEAD() functions?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**LAG()** accesses data from a **previous** row. **LEAD()** accesses data from a **following** row.

```sql
SELECT
  date,
  amount,
  LAG(amount, 1)  OVER (ORDER BY date) AS prev_day,     -- previous row
  LAG(amount, 7)  OVER (ORDER BY date) AS prev_week,    -- 7 rows back
  LEAD(amount, 1) OVER (ORDER BY date) AS next_day,     -- next row
  LEAD(amount, 1, 0) OVER (ORDER BY date) AS next_day_default  -- default 0 if NULL
FROM daily_sales;
```

**Real-world examples:**

```sql
-- Day-over-day change
SELECT date, amount,
  LAG(amount) OVER (ORDER BY date) AS prev,
  amount - LAG(amount) OVER (ORDER BY date) AS change
FROM daily_sales;

-- Month-over-month comparison
SELECT
  DATE_FORMAT(order_date, '%Y-%m') AS month,
  SUM(amount) AS revenue,
  LAG(SUM(amount)) OVER (ORDER BY DATE_FORMAT(order_date, '%Y-%m')) AS prev_month,
  SUM(amount) - LAG(SUM(amount)) OVER (ORDER BY DATE_FORMAT(order_date, '%Y-%m'))
    AS growth
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m');
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. What is the PARTITION BY clause in window functions?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**PARTITION BY** divides the result set into partitions (groups) over which the window function is applied independently. It's like GROUP BY but doesn't collapse rows.

```sql
-- Top earner in each department
SELECT name, department, salary,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;

-- Running total per department
SELECT name, department, salary,
  SUM(salary) OVER (PARTITION BY department ORDER BY salary) AS running_total
FROM employees;

-- Department average compared per employee
SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg,
  salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg
FROM employees;
```

**Without PARTITION BY:** function uses the entire result set as one partition.

```sql
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS overall_rank,      -- one global rank
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank  -- per dept
FROM employees;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. What is a View in SQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **View** is a virtual table based on a `SELECT` query. It doesn't store data — it's a **saved query** that produces results on the fly.

```sql
-- Create a view
CREATE VIEW it_team AS
SELECT id, name, email, salary
FROM employees
WHERE department = 'IT';

-- Use like a table
SELECT * FROM it_team;
SELECT name FROM it_team WHERE salary > 80000;

-- Update view definition
CREATE OR REPLACE VIEW it_team AS
SELECT id, name, salary, email, phone
FROM employees WHERE department = 'IT';

-- Drop a view
DROP VIEW it_team;
```

**Why use views:**
- **Security** — expose only specific columns to certain users
- **Simplification** — encapsulate complex JOINs/aggregations
- **Consistency** — all queries use the same logic

**Materialized View** (not native in MySQL — use indexed views or triggers): Stores the query result physically for faster reads. Refreshed periodically.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. What is the difference between a View and a Materialized View?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | View | Materialized View |
|---------|------|-------------------|
| **Data storage** | None (virtual) | Stores result physically |
| **Speed** | Slower (runs query each time) | Faster (pre-computed) |
| **Freshness** | Always current | May be stale |
| **Storage space** | None | Requires disk space |
| **Index** | Can't index | Can create indexes |
| **DML operations** | Limited (simple views) | Full DML support |
| **Updates** | Auto-reflects table changes | Needs manual refresh |

```sql
-- View (standard)
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active';

-- Materialized View (not native MySQL - emulated with tables + triggers)
CREATE TABLE mvw_department_stats AS
SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal
FROM employees GROUP BY department;

-- Refresh using event/trigger
TRUNCATE TABLE mvw_department_stats;
INSERT INTO mvw_department_stats
SELECT department, COUNT(*), AVG(salary)
FROM employees GROUP BY department;
```

**Note:** PostgreSQL and Oracle support materialized views natively. MySQL doesn't.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. What are the different types of indexes in MySQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Index Type | Description | Use Case |
|------------|-------------|----------|
| **B-Tree** | Default, balanced tree | `=`, `>`, `<`, `>=`, `<=`, `BETWEEN`, `LIKE 'prefix%'` |
| **Hash** | Hash table (Memory engine) | Exact lookups `=` only |
| **Full-Text** | Text search index | `MATCH ... AGAINST` for text search |
| **Spatial** | GIS data | `POINT`, `POLYGON`, `GEOMETRY` |
| **Unique** | Enforces uniqueness | Email, username |
| **Composite** | Multiple columns | Multi-column WHERE conditions |
| **Clustered** | Determines physical order (PRIMARY KEY in InnoDB) | Range queries |
| **Covering** | Contains all query columns | Avoids table access |

```sql
-- B-Tree index (default)
CREATE INDEX idx_name ON employees(name);

-- Unique index
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Composite index
CREATE INDEX idx_dept_salary ON employees(department, salary);

-- Full-text index
CREATE FULLTEXT INDEX idx_search ON articles(title, body);

-- Covering index example
CREATE INDEX idx_covering ON employees(department, salary, name);
-- This index can serve this query without touching the table:
SELECT name, salary FROM employees WHERE department = 'IT';
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q71. What is a composite index and how does column order matter?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **composite index** (multi-column index) covers multiple columns. The **column order** determines which queries can use it.

```sql
CREATE INDEX idx_dept_salary ON employees(department, salary, hire_date);
```

**Leftmost prefix rule:** The index can be used for queries that filter on:
- `department` only ✅
- `department AND salary` ✅
- `department AND salary AND hire_date` ✅
- `salary` only ❌ (skips the first column)
- `hire_date` only ❌
- `department AND hire_date` ✅ partial (uses only department part)

```sql
-- ✅ Uses index efficiently
SELECT * FROM employees WHERE department = 'IT';
SELECT * FROM employees WHERE department = 'IT' AND salary > 80000;
SELECT * FROM employees WHERE department = 'IT' AND salary > 80000 AND hire_date > '2023-01-01';

-- ❌ Cannot use index efficiently
SELECT * FROM employees WHERE salary > 80000;
SELECT * FROM employees WHERE hire_date > '2023-01-01';
```

**Best practice:** Put the most selective/high-cardinality column first, then the next most selective.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q72. What is a covering index?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **covering index** contains **all the columns needed** by a query. MySQL can satisfy the query entirely from the index without reading table rows.

```sql
-- Create covering index
CREATE INDEX idx_covering ON employees(department, salary, name);

-- This query can be answered using ONLY the index
SELECT name, salary FROM employees WHERE department = 'IT';
-- EXPLAIN shows: "Using index" (no table access)
```

**Benefits:**
- Much faster (index is smaller than table)
- Less I/O (index fits in memory better)
- No table lookups

**How to identify:**
```sql
EXPLAIN SELECT name, salary FROM employees WHERE department = 'IT';
-- Look for: "Using index" in Extra column
```

**Design tip:** If a query always needs columns `a`, `b`, `c` with a filter on `a`, create `INDEX(a, b, c)` so the index covers everything.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q73. What is EXPLAIN in MySQL and how do you read it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**EXPLAIN** shows the query execution plan — how MySQL will execute a query.

```sql
EXPLAIN SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id
WHERE e.salary > 50000;
```

**Key columns to understand:**

| Column | Meaning | Good to see |
|--------|---------|-------------|
| **type** | Access method | `const`, `eq_ref`, `ref`, `range`, `index`, `ALL` |
| **key** | Index used | Not NULL |
| **rows** | Rows examined | Low number |
| **Extra** | Additional info | `Using index`, `Using where` |

**Access types (fastest to slowest):**
```
system/const  → single row (perfect)
eq_ref        → one row per join (primary key lookup)
ref           → multiple matching rows (index lookup)
range         → range scan (BETWEEN, >, <)
index         → full index scan
ALL           → full table scan (worst — add index!)
```

```sql
-- Analyze a slow query
EXPLAIN FORMAT=JSON SELECT ...;  -- detailed JSON output
EXPLAIN ANALYZE SELECT ...;      -- MySQL 8.0.18+: run + measure actual time
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q74. What is normalization and what are the normal forms?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Normalization** reduces data redundancy and improves integrity by organizing tables systematically.

**1NF — Atomic values:**
```
❌ Bad: phones = '111-222-333'          (multiple values)
✅ Good: Each phone has its own row
```

**2NF — No partial dependency on composite key:**
```sql
-- 2NF violation: course_name depends on course_id (part of composite key)
-- enrollment(student_id, course_id, student_name, course_name, grade)
-- Fix: split into students, courses, enrollments
```

**3NF — No transitive dependency:**
```sql
-- 3NF violation: dept_name depends on dept_id, not employee
-- employee(id, name, dept_id, dept_name, dept_location)
-- Fix: employees(id, name, dept_id) + departments(dept_id, dept_name, location)
```

**BCNF — Every determinant must be a candidate key:**
```
Stricter version of 3NF — resolves overlapping composite keys
```

**Summary:**
| Form | Rule |
|------|------|
| 1NF | Atomic columns (no repeating groups) |
| 2NF | 1NF + no partial dependency |
| 3NF | 2NF + no transitive dependency |
| BCNF | 3NF + every determinant is a candidate key |

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q75. What is a transaction in SQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **transaction** is a group of SQL operations treated as a **single unit** — all succeed or all fail (atomicity).

```sql
-- Bank transfer: atomic operation
START TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;  -- both succeed, changes permanent

-- If error occurs
START TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  -- error here...
ROLLBACK;  -- both undone, balance restored
```

**Transaction control commands:**
| Command | Effect |
|---------|--------|
| `START TRANSACTION` | Begin a transaction |
| `COMMIT` | Save all changes permanently |
| `ROLLBACK` | Undo all changes in the transaction |
| `SAVEPOINT name` | Set a savepoint for partial rollback |
| `ROLLBACK TO name` | Roll back to a savepoint |
| `RELEASE SAVEPOINT name` | Remove a savepoint |

```sql
-- SAVEPOINT example
START TRANSACTION;
  INSERT INTO orders VALUES (1, 100);
  SAVEPOINT order_created;
  INSERT INTO payments VALUES (1, 100);
  -- payment fails
  ROLLBACK TO order_created;  -- undo only payment, keep order
COMMIT;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q76. What are the ACID properties?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**ACID** stands for the four properties that guarantee reliable database transactions:

| Property | Meaning | Example |
|----------|---------|---------|
| **A**tomicity | All or nothing — partial success is rolled back | Bank transfer: debit + credit must both succeed |
| **C**onsistency | Database stays in a valid state (constraints hold) | Total money before = total after |
| **I**solation | Concurrent transactions don't interfere | Two users booking last ticket don't corrupt data |
| **D**urability | Committed changes survive system failures | After COMMIT, power loss won't lose data |

```sql
-- ACID in practice
START TRANSACTION;
  -- Atomicity: both updates happen or neither does
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;

  -- Consistency: CHECK constraints, foreign keys are validated
  -- Isolation: other transactions see either old or new state
COMMIT;
-- Durability: this data is now safely on disk
```

**InnoDB implements ACID through:**
- Redo log (durability)
- Undo log (atomicity, rollback)
- Row-level locking + MVCC (isolation)
- Constraints + foreign keys (consistency)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q77. What are the transaction isolation levels?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Isolation levels** control how concurrent transactions interact. From lowest to highest isolation:

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|-----------|--------------------|--------------|
| **READ UNCOMMITTED** | ✅ Possible | ✅ Possible | ✅ Possible |
| **READ COMMITTED** | ❌ Prevented | ✅ Possible | ✅ Possible |
| **REPEATABLE READ** (MySQL default) | ❌ Prevented | ❌ Prevented | ✅ Possible (but InnoDB prevents) |
| **SERIALIZABLE** | ❌ Prevented | ❌ Prevented | ❌ Prevented |

**Anomalies:**
- **Dirty Read** — Reading uncommitted data from another transaction
- **Non-Repeatable Read** — Same row read twice, different values (another TX updated it)
- **Phantom Read** — Same query returns different rows (another TX inserted/deleted rows)

```sql
-- Set isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

**MySQL default:** `REPEATABLE READ` — InnoDB's MVCC prevents both non-repeatable reads and phantoms in most cases.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q78. What is a deadlock in MySQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **deadlock** occurs when two or more transactions each hold a lock that the other needs, causing infinite waiting.

```
Transaction 1:                  Transaction 2:
  LOCK Row A ✅                    LOCK Row B ✅
  WANT Row B ❌     DEADLOCK!      WANT Row A ❌
```

**MySQL's response:** InnoDB **automatically detects** deadlocks and rolls back the transaction that did the least work (has the fewest changes).

```sql
-- Check deadlock info
SHOW ENGINE INNODB STATUS;
-- Look for: LATEST DETECTED DEADLOCK section
```

**Prevention strategies:**
```sql
-- 1. Lock tables in consistent order
-- ❌ Avoid
-- TX1: Update A → Update B
-- TX2: Update B → Update A

-- ✅ Better: Both update in same order
-- TX1: Update A → Update B
-- TX2: Update A → Update B

-- 2. Keep transactions short
START TRANSACTION;
  UPDATE accounts SET balance = balance - 10 WHERE id = 1;
  UPDATE accounts SET balance = balance + 10 WHERE id = 2;
COMMIT;

-- 3. Use lower isolation level if acceptable
-- 4. Add proper indexes (reduces lock range)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q79. What is a stored procedure in MySQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **stored procedure** is a reusable set of SQL statements stored on the server. It can accept parameters and return results.

```sql
-- Create a procedure
DELIMITER //
CREATE PROCEDURE GetEmployeesByDept(IN dept_name VARCHAR(50))
BEGIN
  SELECT id, name, salary
  FROM employees
  WHERE department = dept_name
  ORDER BY salary DESC;
END //
DELIMITER ;

-- Call the procedure
CALL GetEmployeesByDept('IT');

-- Procedure with OUT parameter
DELIMITER //
CREATE PROCEDURE GetDeptStats(
  IN  dept      VARCHAR(50),
  OUT avg_sal   DECIMAL(10,2),
  OUT max_sal   DECIMAL(10,2)
)
BEGIN
  SELECT AVG(salary), MAX(salary)
  INTO avg_sal, max_sal
  FROM employees WHERE department = dept;
END //
DELIMITER ;

CALL GetDeptStats('IT', @avg, @max);
SELECT @avg AS avg_salary, @max AS max_salary;
```

**Benefits:** Reusability, security (can grant EXECUTE without table access), network efficiency.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q80. What is the difference between a stored procedure and a stored function?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | Stored Procedure | Stored Function |
|---------|-----------------|-----------------|
| **Returns** | Multiple result sets / OUT params | Single value (must return) |
| **Call syntax** | `CALL proc()` | Inside `SELECT func()` |
| **Use in SELECT** | ❌ No | ✅ Yes |
| **OUT/INOUT params** | ✅ Yes | ❌ No |
| **Transaction support** | ✅ Yes | ❌ No (inside functions) |
| **Error handling** | Full support | Limited |

```sql
-- Function: returns a single value, used in SELECT
DELIMITER //
CREATE FUNCTION CalculateTax(salary DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  DECLARE tax DECIMAL(10,2);
  IF salary > 100000 THEN SET tax = salary * 0.30;
  ELSEIF salary > 50000 THEN SET tax = salary * 0.20;
  ELSE SET tax = salary * 0.10;
  END IF;
  RETURN tax;
END //
DELIMITER ;

-- Use in SELECT
SELECT name, salary, CalculateTax(salary) AS tax FROM employees;

-- Procedure: called standalone
CALL GetEmployeesByDept('IT');
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q81. What is a trigger in MySQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **trigger** is a block of SQL that **automatically executes** before or after `INSERT`, `UPDATE`, or `DELETE` on a table.

```sql
-- Audit log trigger
CREATE TRIGGER log_salary_change
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  IF OLD.salary <> NEW.salary THEN
    INSERT INTO salary_audit (emp_id, old_salary, new_salary, changed_at)
    VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
  END IF;
END;
```

**Trigger timing:**
| Timing | When it fires | Use Case |
|--------|---------------|----------|
| `BEFORE INSERT` | Before row insertion | Validate/transform data |
| `AFTER INSERT` | After row insertion | Log new records |
| `BEFORE UPDATE` | Before row update | Validate changes |
| `AFTER UPDATE` | After row update | Audit trail |
| `BEFORE DELETE` | Before row deletion | Prevent deletion |
| `AFTER DELETE` | After row deletion | Archive deleted rows |

```sql
-- Prevent deletion of active users
CREATE TRIGGER prevent_active_user_delete
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
  IF OLD.status = 'active' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot delete active users';
  END IF;
END;

-- Auto-set timestamp
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON employees
FOR EACH ROW
SET NEW.updated_at = NOW();
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q82. What is the difference between UNION and UNION ALL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | UNION | UNION ALL |
|---------|-------|-----------|
| **Duplicates** | Removes duplicate rows | Keeps all rows |
| **Performance** | Slower (must sort/dedupe) | Faster (no dedup) |
| **Memory** | More (needs temp table) | Less |
| **Use case** | Need unique results | All results needed |

```sql
-- UNION: removes duplicates (slower)
SELECT name FROM employees
UNION
SELECT name FROM contractors;
-- Unique names from both tables

-- UNION ALL: keeps duplicates (faster)
SELECT name FROM employees
UNION ALL
SELECT name FROM contractors;
-- All names, including duplicates

-- Rules:
-- 1. Same number of columns
-- 2. Compatible data types
-- 3. Column order matters
-- 4. Only the last SELECT can have ORDER BY / LIMIT
```

**Performance ratio:** `UNION` can be 2-5x slower than `UNION ALL` for large datasets.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q83. How do you find duplicate records in a table?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- Find duplicates by email
SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING cnt > 1;

-- Get all columns of duplicate records
SELECT * FROM users
WHERE email IN (
  SELECT email FROM users
  GROUP BY email
  HAVING COUNT(*) > 1
)
ORDER BY email;

-- Delete duplicates (keep row with lowest ID)
DELETE FROM users
WHERE id NOT IN (
  SELECT MIN(id) FROM users GROUP BY email
);

-- Delete duplicates across multiple columns
DELETE FROM users
WHERE id NOT IN (
  SELECT MIN(id) FROM users
  GROUP BY first_name, last_name, email
);

-- Find duplicates using window function
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY email ORDER BY id
  ) AS rn
  FROM users
) t WHERE rn > 1;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q84. What is an anti-join?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

An **anti-join** returns rows from one table that have **no match** in another table.

```sql
-- Method 1: LEFT JOIN + IS NULL (preferred — safe with NULLs)
SELECT e.*
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.id IS NULL;

-- Method 2: NOT EXISTS (also safe)
SELECT * FROM employees e
WHERE NOT EXISTS (
  SELECT 1 FROM departments d WHERE d.id = e.dept_id
);

-- Method 3: NOT IN (⚠️ DANGEROUS — unexpected results with NULLs)
SELECT * FROM employees
WHERE dept_id NOT IN (SELECT id FROM departments);
-- If any id in departments is NULL, the result is EMPTY!

-- Why NOT IN breaks with NULLs:
-- dept_id NOT IN (10, 20, 30, NULL)
-- → dept_id != 10 AND dept_id != 20 AND dept_id != 30 AND dept_id != NULL
-- → ... AND NULL  ← this makes the entire WHERE FALSE
```

**Recommendation:** Use `NOT EXISTS` or `LEFT JOIN ... IS NULL` — never `NOT IN` with a subquery that might return NULLs.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q85. What is the difference between INNER JOIN and LEFT JOIN?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Aspect | INNER JOIN | LEFT JOIN |
|--------|------------|-----------|
| **Left table rows** | Only matched | ALL rows kept |
| **Right table rows** | Only matched | Matched only (NULL for missing) |
| **Result rows** | ≤ min(left, right) rows | = left table rows (at minimum) |
| **Unmatched left rows** | ❌ Excluded | ✅ Included with NULLs |
| **Use case** | Need only data with matches | Need ALL left data, optional right data |

```sql
-- INNER JOIN: only employees WITH a department
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
-- David (no dept) excluded

-- LEFT JOIN: ALL employees, with department if they have one
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
-- David included with NULL dept_name
```

**Visual:**
```
INNER JOIN:  ◯ ∩ ◯   (intersection)
LEFT JOIN:   (◯ ∪ ◯) with left emphasis
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q86. What is the N+1 query problem?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **N+1 problem** occurs when you execute 1 query to get N parent rows, then N additional queries for each parent's child data — resulting in N+1 total queries.

```sql
-- ❌ N+1 problem (pseudo-code)
-- Query 1: Get all orders (returns 100 orders)
SELECT * FROM orders;                              -- 1 query

-- Query 2-101: Get user for each order (100 queries!)
SELECT * FROM users WHERE id = order[0].user_id;   -- N queries
SELECT * FROM users WHERE id = order[1].user_id;   -- N queries
-- ... (runs 100 times!)

-- ✅ Fix with JOIN (1 query)
SELECT o.*, u.name AS user_name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id;                  -- 1 query total

-- ✅ Fix with eager loading (ORM)
-- User::with('orders')->find(1);  (2 queries instead of N+1)
```

**In ORMs (like Rails ActiveRecord, Laravel Eloquent, Hibernate):**
```ruby
# ❌ N+1
orders = Order.all
orders.each { |order| puts order.user.name }

# ✅ Eager load
orders = Order.includes(:user).all
orders.each { |order| puts order.user.name }
```

**Cost:** With 100 orders, N+1 = 101 queries vs 1 query with JOIN.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q87. What is query optimization and what are common techniques?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Query optimization** improves query execution speed. Here are the key techniques:

```sql
-- 1. Use EXPLAIN to analyze
EXPLAIN SELECT * FROM employees WHERE department = 'IT';
-- Check type (avoid ALL), key (should use index), rows (should be low)

-- 2. Add indexes on WHERE, JOIN, ORDER BY columns
CREATE INDEX idx_dept ON employees(department);

-- 3. Avoid SELECT *
SELECT name, salary FROM employees;  -- only needed columns

-- 4. Avoid functions on indexed columns
-- ❌ Slow: YEAR() on indexed column prevents index usage
WHERE YEAR(hire_date) = 2023
-- ✅ Fast: range query uses index
WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31'

-- 5. Use LIMIT for pagination
SELECT * FROM employees ORDER BY id LIMIT 20;

-- 6. Prefer JOIN over subquery
-- ❌ Subquery (often slower)
SELECT name FROM employees WHERE dept_id IN (SELECT id FROM departments WHERE active = 1);
-- ✅ JOIN (often faster)
SELECT e.name FROM employees e JOIN departments d ON e.dept_id = d.id WHERE d.active = 1;

-- 7. Use EXISTS instead of IN for large subqueries
SELECT * FROM departments d
WHERE EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.id);

-- 8. Partition large tables
-- 9. Use covering indexes
-- 10. Avoid `OR` — use `UNION` or `IN`
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q88. What is the difference between clustered and non-clustered indexes?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | Clustered Index | Non-Clustered Index |
|---------|----------------|---------------------|
| **Data arrangement** | Physically reorders table data | Logical pointer to data |
| **Number per table** | Only **1** (the table itself) | Many (up to 999) |
| **Leaf nodes** | Contain actual data rows | Contain pointers to rows |
| **Speed for range** | Very fast (rows are adjacent) | Slower (lookup per row) |
| **Default** | PRIMARY KEY (InnoDB) | Any other index |

**InnoDB specifics:**
- The PRIMARY KEY is always a clustered index
- If no PK defined, InnoDB creates a hidden 6-byte clustered index
- Secondary (non-clustered) indexes store the PK value as the pointer

```
Clustered Index (PK):
┌──────────────┐
│  B-Tree      │  Leaf = actual data rows
│  id=1 → Row1 │
│  id=2 → Row2 │  ← rows physically ordered by id
│  id=3 → Row3 │
└──────────────┘

Non-Clustered Index (on name):
┌──────────────┐
│  B-Tree      │  Leaf = PK value (id)
│  Alice → 1   │
│  Bob → 2     │  ← then needs PK lookup for full row
│  Carol → 3   │
└──────────────┘
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q89. What is a full-text index and how does it work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **FULLTEXT index** enables efficient text search in large text columns using word matching.

```sql
-- Create full-text index
CREATE TABLE articles (
  id    INT PRIMARY KEY,
  title VARCHAR(200),
  body  TEXT,
  FULLTEXT INDEX idx_search (title, body)
);

-- Search using MATCH...AGAINST
-- Natural Language Mode (relevance-based)
SELECT title, MATCH(title, body) AGAINST('database optimization') AS relevance
FROM articles
WHERE MATCH(title, body) AGAINST('database optimization')
ORDER BY relevance DESC;

-- Boolean Mode (operators)
SELECT title FROM articles
WHERE MATCH(title, body) AGAINST('+database -nosql' IN BOOLEAN MODE);
-- + = must include, - = must exclude, * = wildcard

-- Query Expansion (finds related content)
SELECT title FROM articles
WHERE MATCH(title, body) AGAINST('database' WITH QUERY EXPANSION);
```

**Limitations:**
- Minimum word length (default 3-4 characters)
- Stop words are ignored (the, and, of, etc.)
- 50% threshold in natural language mode

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q90. What is the difference between WHERE and HAVING?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Clause | Filters | When it runs | Can use aggregates? |
|--------|---------|-------------|-------------------|
| **WHERE** | Individual **rows** | Before GROUP BY | ❌ No |
| **HAVING** | **Groups** | After GROUP BY | ✅ Yes |

```sql
-- Correct usage
SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal
FROM employees
WHERE salary > 30000             -- filter low earners BEFORE grouping
GROUP BY department
HAVING COUNT(*) > 5               -- only depts with >5 employees
   AND AVG(salary) > 60000;       -- and avg salary > 60000

-- ❌ Error: aggregate in WHERE
SELECT department, COUNT(*)
FROM employees
WHERE COUNT(*) > 5                 -- ERROR: can't use aggregate in WHERE
GROUP BY department;

-- ✅ Correct: aggregate in HAVING
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- ❌ Wrong: non-aggregate filter in HAVING
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING department = 'IT';          -- use WHERE for this!
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q91. How do you achieve pagination in SQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- Method 1: LIMIT + OFFSET (simple, but slow for large offsets)
SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 0;   -- page 1 (rows 1-10)

SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 10;  -- page 2 (rows 11-20)

SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;  -- page 3 (rows 21-30)

-- Method 2: Keyset/Cursor pagination (faster for large datasets)
SELECT * FROM employees
WHERE id > 0
ORDER BY id
LIMIT 10;  -- first page

SELECT * FROM employees
WHERE id > 10    -- use last id from previous page
ORDER BY id
LIMIT 10;  -- second page

-- Method 3: Using ROW_NUMBER (for arbitrary ordering)
WITH paginated AS (
  SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS rn
  FROM employees
)
SELECT * FROM paginated WHERE rn BETWEEN 11 AND 20;
```

**Performance tip:** For large offsets, **keyset pagination** is much faster than `LIMIT/OFFSET` because MySQL doesn't need to scan and discard skipped rows.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q92. What is a composite primary key?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **composite primary key** uses two or more columns together to uniquely identify each row.

```sql
-- Many-to-many relationship
CREATE TABLE enrollments (
  student_id INT,
  course_id  INT,
  enrolled_date DATE,
  grade      CHAR(1),
  PRIMARY KEY (student_id, course_id),  -- combination must be unique
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Order detail line items
CREATE TABLE order_items (
  order_id   INT,
  product_id INT,
  quantity   INT,
  price      DECIMAL(10,2),
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

**Implications:**
- Both columns together must be unique (individual columns can have duplicates)
- Foreign key references to this table need both columns
- InnoDB creates a clustered index on the composite key
- Order matters for index usage (leftmost prefix rule applies)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q93. What are the different types of keys in SQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Key Type | Description | Example |
|----------|-------------|---------|
| **Primary Key** | Unique identifier for each row | `id INT PRIMARY KEY` |
| **Foreign Key** | References PK of another table | `dept_id REFERENCES departments(id)` |
| **Unique Key** | Ensures unique values | `email VARCHAR(255) UNIQUE` |
| **Composite Key** | Two+ columns forming a PK | `PRIMARY KEY (student_id, course_id)` |
| **Candidate Key** | Any column that could be a PK | `id`, `email` both qualify |
| **Alternate Key** | Candidate key NOT chosen as PK | `email` if `id` is PK |
| **Super Key** | Any column/combination that uniquely identifies a row | `id`, `email`, `(id, name)` |
| **Natural Key** | Key with business meaning | `ssn`, `email` |
| **Surrogate Key** | Artificial key (no business meaning) | `AUTO_INCREMENT id` |

```sql
CREATE TABLE employees (
  id       INT PRIMARY KEY,            -- surrogate key
  ssn      CHAR(9) UNIQUE,            -- natural key (candidate/alternate)
  email    VARCHAR(255) UNIQUE,        -- natural key (candidate/alternate)
  dept_id  INT,
  FOREIGN KEY (dept_id) REFERENCES departments(id)  -- foreign key
);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q94. What is the difference between IN and EXISTS?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Aspect | IN | EXISTS |
|--------|----|--------|
| **How it works** | Evaluates all values in subquery | Stops at first match |
| **NULL handling** | ⚠️ Returns empty if NULLs present | ✅ Works correctly with NULLs |
| **Subquery result** | Returns value list | Just checks existence (SELECT 1) |
| **Performance (small subquery)** | Faster | Comparable |
| **Performance (large subquery)** | Slower (evaluates all) | Faster (stops on match) |
| **Correlated** | Not typically | ✅ Naturally correlated |

```sql
-- IN: good for small, known lists
SELECT * FROM employees
WHERE dept_id IN (10, 20, 30);

-- IN with subquery ⚠️
SELECT * FROM employees
WHERE dept_id IN (SELECT id FROM departments);
-- If departments.id has any NULL → no rows returned!

-- EXISTS: good for large/correlated subqueries
SELECT d.dept_name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e WHERE e.dept_id = d.id
);
```

**Modern optimizer:** MySQL 8.0 often transforms `IN` to `EXISTS` internally for better performance. Use whichever is clearer for your use case.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q95. How do you find employees without a manager or without a department?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- Employees without a manager (NULL manager_id)
SELECT * FROM employees WHERE manager_id IS NULL;

-- Employees without a department (NULL dept_id)
SELECT * FROM employees WHERE dept_id IS NULL;

-- Using LEFT JOIN (more useful when you need details)
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.id IS NULL;
-- Only employees with no matching department

-- Departments without any employees
SELECT d.dept_name
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.id
WHERE e.id IS NULL;

-- Using NOT EXISTS (often faster)
SELECT * FROM departments d
WHERE NOT EXISTS (
  SELECT 1 FROM employees e WHERE e.dept_id = d.id
);

-- Using NOT IN (⚠️ careful with NULLs)
SELECT * FROM departments
WHERE id NOT IN (SELECT dept_id FROM employees WHERE dept_id IS NOT NULL);
-- Must exclude NULLs from subquery!
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q96. What is referential integrity?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Referential integrity** ensures that relationships between tables remain consistent — every foreign key value in a child table must exist in the parent table's primary key (or be NULL).

```sql
-- Referential integrity via FOREIGN KEY
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id  INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
```

**What it prevents:**
- ❌ Orphan records (order with no user)
- ❌ Deleting a user who still has orders
- ❌ Mismatched data across related tables

**Referential actions:**
| Action | Behavior when parent is deleted |
|--------|---------------------------------|
| `CASCADE` | Delete related child rows too |
| `SET NULL` | Set child FK to NULL |
| `RESTRICT` | Prevent parent deletion |
| `NO ACTION` | Same as RESTRICT |
| `SET DEFAULT` | Set child FK to default (limited support) |

**Without referential integrity (MyISAM):** Must manage relationships manually in application code.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q97. What is a JOIN condition and how is it different from a WHERE condition?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **ON** condition specifies how tables are joined. The **WHERE** condition filters the result after joining.

```sql
-- ON: defines the join relationship
-- WHERE: filters the joined result

SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.dept_name = 'IT';
-- Result: Only employees in IT department
-- David (no dept) is excluded by WHERE
```

**Critical difference with LEFT JOIN:**
```sql
-- Filter in ON: applied during join, doesn't exclude left rows
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d
  ON e.dept_id = d.id AND d.dept_name = 'IT';
-- Result: ALL employees (David gets NULL) with IT value when matched

-- Filter in WHERE: applied after join, CAN exclude left rows
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.dept_name = 'IT';
-- Result: ONLY employees in IT department (LEFT JOIN becomes INNER!)
```

**For INNER JOIN:** Both `ON` and `WHERE` produce the same result.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q98. How do you update a table using data from another table?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- Method 1: UPDATE with JOIN (MySQL-specific)
UPDATE employees e
JOIN departments d ON e.dept_id = d.id
SET e.salary = e.salary * 1.15,
    e.department_name = d.dept_name
WHERE d.location = 'New York';

-- Method 2: UPDATE with subquery
UPDATE employees
SET salary = (
  SELECT AVG(salary) FROM employees WHERE department = 'IT'
)
WHERE department = 'IT';

-- Method 3: UPDATE with correlated subquery
UPDATE employees e
SET salary = salary * 1.10
WHERE (
  SELECT COUNT(*) FROM projects p
  WHERE p.assigned_to = e.id
) > 3;

-- Replace table with data from another table
REPLACE INTO employees_backup
SELECT * FROM employees WHERE active = 1;
```

**⚠️ Safety first:**
```sql
-- Preview before updating
SELECT e.name, e.salary, e.salary * 1.15 AS new_salary
FROM employees e
JOIN departments d ON e.dept_id = d.id
WHERE d.location = 'New York';

-- Then run the update
UPDATE employees e
JOIN departments d ON e.dept_id = d.id
SET e.salary = e.salary * 1.15
WHERE d.location = 'New York';
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q99. What is the difference between DATE, DATETIME, and TIMESTAMP?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Type | Format | Range | Storage | Timezone | Use Case |
|------|--------|-------|---------|----------|----------|
| **DATE** | YYYY-MM-DD | 1000-01-01 to 9999-12-31 | 3 bytes | No | Birthdays, events |
| **DATETIME** | YYYY-MM-DD HH:MM:SS | 1000-01-01 to 9999-12-31 | 8 bytes | No | General timestamps |
| **TIMESTAMP** | YYYY-MM-DD HH:MM:SS | 1970-01-01 to 2038-01-19 | 4 bytes | **Yes** | Audit fields |

```sql
-- TIMESTAMP auto-updates with timezone
CREATE TABLE events (
  event_date DATE,                    -- no time, no tz
  starts_at DATETIME,                -- has time, no tz
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- auto-tz
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- TIMESTAMP timezone behavior:
-- Value is converted to UTC for storage, back to session tz on retrieval
SET time_zone = '+05:30';
INSERT INTO events (starts_at) VALUES ('2024-04-06 14:30:00');
-- Stored as UTC: 2024-04-06 09:00:00

-- Year 2038 problem: TIMESTAMP range ends at 2038-01-19
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q100. What is a foreign key constraint and what happens on delete/update?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **foreign key constraint** ensures referential integrity between parent and child tables.

```sql
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id  INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
```

**Referential actions when parent row is deleted:**

| Action | Child rows behavior |
|--------|-------------------|
| `CASCADE` | Delete child rows automatically |
| `SET NULL` | Set FK column to NULL |
| `RESTRICT` | **Prevent** parent deletion (default) |
| `NO ACTION` | Same as RESTRICT (checked at end of statement) |
| `SET DEFAULT` | Set FK to default (InnoDB ignores this) |

```sql
-- RESTRICT: prevents deletion if children exist
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
-- DELETE FROM users WHERE id = 1; → Error! (has orders)

-- CASCADE: deletes children automatically
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- DELETE FROM users WHERE id = 1; → Also deletes user's orders

-- SET NULL: nullifies FK in children
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
-- DELETE FROM users WHERE id = 1; → Sets orders.user_id to NULL
```

**Constraint management:**
```sql
-- Disable FK checks (for bulk operations)
SET FOREIGN_KEY_CHECKS = 0;
-- ... do bulk operations
SET FOREIGN_KEY_CHECKS = 1;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q101. What are DCL commands in SQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**DCL (Data Control Language)** commands manage user permissions and access control.

```sql
-- Create a user
CREATE USER 'john'@'localhost' IDENTIFIED BY 'password123';

-- Grant privileges
GRANT SELECT, INSERT ON company_db.employees TO 'john'@'localhost';
GRANT ALL PRIVILEGES ON company_db.* TO 'admin'@'localhost';
GRANT SELECT ON company_db.* TO 'readonly'@'%';  -- any host

-- Grant with GRANT OPTION (user can grant to others)
GRANT SELECT ON company_db.* TO 'manager'@'localhost' WITH GRANT OPTION;

-- View user privileges
SHOW GRANTS FOR 'john'@'localhost';
SHOW GRANTS FOR CURRENT_USER();

-- Revoke privileges
REVOKE INSERT ON company_db.employees FROM 'john'@'localhost';
REVOKE ALL PRIVILEGES ON company_db.* FROM 'readonly'@'%';

-- Drop user
DROP USER 'john'@'localhost';

-- Common privileges
-- SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, INDEX
-- EXECUTE (for procedures/functions)
```

**Best practice:** Grant minimum required privileges. Use `GRANT ... ON schema.*` sparingly.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q102. What are database transactions used for?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Transactions** ensure that multiple SQL operations execute as a single, atomic unit — either all succeed or all are rolled back.

**Real-world examples:**

```sql
-- 1. Bank transfer (must be atomic)
START TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;

-- 2. Order processing (multiple steps)
START TRANSACTION;
  INSERT INTO orders (user_id, amount) VALUES (1, 200);
  UPDATE products SET stock = stock - 1 WHERE id = 5;
  INSERT INTO payments (order_id, amount) VALUES (LAST_INSERT_ID(), 200);
COMMIT;

-- 3. Error-safe batch processing
START TRANSACTION;
  UPDATE employees SET salary = salary * 1.10;
  -- what if this fails?
ROLLBACK;  -- undo everything

-- 4. Using SAVEPOINT for partial rollback
START TRANSACTION;
  INSERT INTO users (name) VALUES ('Alice');
  SAVEPOINT after_user;
  INSERT INTO profiles (user_id, bio) VALUES (LAST_INSERT_ID(), 'Bio');
  -- profile insert fails
  ROLLBACK TO after_user;  -- undo profile, keep user
COMMIT;
```

**Transaction properties:** ACID (Atomicity, Consistency, Isolation, Durability)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q103. What is the difference between READ COMMITTED and REPEATABLE READ?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | READ COMMITTED | REPEATABLE READ |
|---------|----------------|-----------------|
| **Dirty Reads** | ❌ Prevented | ❌ Prevented |
| **Non-Repeatable Reads** | ✅ Possible | ❌ Prevented |
| **Phantom Reads** | ✅ Possible | ❌ Prevented (InnoDB) |
| **MySQL default?** | ❌ No | ✅ Yes |
| **Performance** | Slightly faster | Slightly slower |
| **Implementation** | Statement-level snapshot | Transaction-level snapshot |

```sql
-- Non-Repeatable Read example:
-- Transaction A reads salary = 50000
-- Transaction B updates salary to 60000 and commits
-- Transaction A reads salary again → now 60000! (different value)

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- Rows can change between reads in the same transaction

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- Transaction sees a consistent snapshot of data as of the first read
```

**InnoDB's MVCC implementation:**
- **READ COMMITTED**: Each statement creates a new snapshot
- **REPEATABLE READ**: One snapshot for the entire transaction

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q104. What is the difference between `ON DELETE CASCADE` and `ON DELETE SET NULL`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- CASCADE: When parent is deleted, child rows are also deleted
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id  INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- DELETE FROM users WHERE id = 1; → All orders for user 1 are also deleted

-- SET NULL: When parent is deleted, child FK becomes NULL
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id  INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
-- DELETE FROM users WHERE id = 1; → orders.user_id becomes NULL for user 1
```

| Action | Effect on children | Use case |
|--------|-------------------|----------|
| **CASCADE** | Child rows are **deleted** | Order → Order Items (cascade delete) |
| **SET NULL** | Child FK becomes **NULL** | Employee → Department (keep employee when dept is deleted) |
| **RESTRICT** | **Prevents** parent deletion | Product → Orders (can't delete product with existing orders) |

**Choosing the right action:**
- **CASCADE**: Child data has no meaning without parent (order items)
- **SET NULL**: Child data is still useful without parent (employee without dept)
- **RESTRICT**: Safety-critical relationships (don't allow accidental deletion)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q105. What is the difference between a PRIMARY KEY and a UNIQUE constraint?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | PRIMARY KEY | UNIQUE |
|---------|-------------|--------|
| **Purpose** | Uniquely identifies each row | Ensures distinct values |
| **Count per table** | Only **1** | **Multiple** allowed |
| **NULL values** | ❌ Not allowed | ✅ Allowed (multiple NULLs) |
| **Clustered index** | ✅ Yes (InnoDB) | ❌ No (non-clustered) |
| **Foreign key reference** | ✅ Can be referenced | ❌ Cannot be referenced |

```sql
CREATE TABLE users (
  id         INT PRIMARY KEY,       -- only 1 PK
  email      VARCHAR(255) UNIQUE,   -- multiple UNIQUE allowed
  username   VARCHAR(50) UNIQUE,
  ssn        CHAR(9) UNIQUE,
  phone      VARCHAR(20) UNIQUE
);

-- UNIQUE allows NULLs
INSERT INTO users (id, email) VALUES (1, 'alice@mail.com');
INSERT INTO users (id, email) VALUES (2, NULL);  -- ✅ allowed
INSERT INTO users (id, email) VALUES (3, NULL);  -- ✅ also allowed (multiple NULLs)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q106. How do you optimize queries with multiple JOINs?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- Example: 3-table JOIN that needs optimization
SELECT e.name, d.dept_name, l.city
FROM employees e
JOIN departments d ON e.dept_id = d.id
JOIN locations l ON d.location_id = l.id
WHERE e.salary > 50000 AND d.active = 1;
```

**Optimization strategies:**

1. **Index JOIN columns:**
```sql
CREATE INDEX idx_dept_id ON employees(dept_id);
CREATE INDEX idx_location_id ON departments(location_id);
CREATE INDEX idx_dept_id_active ON departments(id, active);  -- covering
```

2. **Filter early — move WHERE into JOIN conditions:**
```sql
SELECT e.name, d.dept_name, l.city
FROM employees e
JOIN departments d ON e.dept_id = d.id AND d.active = 1  -- filter before join
JOIN locations l ON d.location_id = l.id
WHERE e.salary > 50000;
```

3. **Choose the right join order:**
```sql
-- MySQL optimizer usually chooses the best order, but use STRAIGHT_JOIN for manual control
SELECT STRAIGHT_JOIN e.name, d.dept_name, l.city
FROM employees e  -- smallest result first
JOIN departments d ON e.dept_id = d.id
JOIN locations l ON d.location_id = l.id;
```

4. **Use covering indexes for common queries:**
```sql
CREATE INDEX idx_covering ON employees(dept_id, salary, name);
```

5. **Avoid unnecessary columns:**
```sql
SELECT e.name, d.dept_name  -- only needed columns
FROM ...;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q107. What is a correlated subquery vs non-correlated subquery?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Aspect | Non-Correlated | Correlated |
|--------|----------------|------------|
| **Execution** | Runs **once** | Runs **once per outer row** |
| **Reference** | Independent of outer query | References outer query columns |
| **Performance** | Fast (single execution) | Slow (may run many times) |
| **Example** | `WHERE salary > (SELECT AVG(salary) FROM employees)` | `WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.dept = e1.dept)` |

**Non-correlated:**
```sql
-- Inner query runs once, result reused for all outer rows
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
-- (SELECT AVG(salary) FROM employees) runs ONCE
```

**Correlated:**
```sql
-- Inner query runs for EVERY outer row
SELECT e1.name, e1.salary, e1.department
FROM employees e1
WHERE e1.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department = e1.department  -- ← references outer query!
);
-- Inner query runs once per row in employees
```

**Rewriting correlated subqueries for better performance:**
```sql
-- Instead of correlated subquery, use window function or JOIN
WITH dept_avg AS (
  SELECT department, AVG(salary) AS avg_sal
  FROM employees GROUP BY department
)
SELECT e.name, e.salary, e.department
FROM employees e
JOIN dept_avg d ON e.department = d.department
WHERE e.salary > d.avg_sal;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q108. What are the string comparison pitfalls in SQL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- 1. Case sensitivity depends on collation
-- utf8mb4_general_ci (ci = case insensitive — default)
SELECT * FROM employees WHERE name = 'alice';  -- matches 'Alice', 'ALICE'

-- utf8mb4_bin (binary/case sensitive)
SELECT * FROM employees WHERE name = 'alice';  -- only matches 'alice'

-- 2. Trailing space handling
SELECT 'hello' = 'hello  ';  -- TRUE in MySQL (trailing spaces ignored)
SELECT 'hello' LIKE 'hello  ';  -- FALSE (LIKE respects trailing spaces)

-- 3. NULL comparisons
SELECT * FROM employees WHERE name = NULL;     -- returns nothing!
SELECT * FROM employees WHERE name IS NULL;    -- correct

-- 4. Empty string vs NULL
INSERT INTO employees (name) VALUES ('');      -- empty string
INSERT INTO employees (name) VALUES (NULL);    -- null
SELECT * FROM employees WHERE name = '';       -- finds empty string
SELECT * FROM employees WHERE name IS NULL;    -- finds NULL

-- 5. LIKE with special characters
SELECT * FROM products WHERE code LIKE '100%';  -- matches 100, 1000, 10000...
SELECT * FROM products WHERE code LIKE '100\%';  -- escape to match literally
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q109. How do you handle date range queries efficiently?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```sql
-- ❌ Slow: function on indexed column prevents index usage
SELECT * FROM orders WHERE YEAR(order_date) = 2023 AND MONTH(order_date) = 4;

-- ✅ Fast: range query uses index
SELECT * FROM orders
WHERE order_date BETWEEN '2023-04-01' AND '2023-04-30';

-- ❌ Slow: day-of-week filter prevents index use
SELECT * FROM orders WHERE DAYOFWEEK(order_date) = 1;  -- Sunday

-- ✅ Fast: use date range for the specific Sundays
SELECT * FROM orders
WHERE order_date >= '2024-01-01'
  AND DAYOFWEEK(order_date) = 1;

-- Index on date column
CREATE INDEX idx_order_date ON orders(order_date);

-- Date comparison with time
-- ❌ WHERE order_date = '2024-04-06' won't match rows with time component
-- ✅ Use range
SELECT * FROM orders
WHERE order_date >= '2024-04-06' AND order_date < '2024-04-07';

-- Date formatting for output (slight performance cost)
SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS formatted_date FROM orders;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q110. What is the RECURSIVE keyword in CTEs?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`WITH RECURSIVE` enables a CTE to reference itself, processing hierarchical data.

**Structure:** Anchor member (initial rows) + Recursive member (iterates)

```sql
-- Generate a number series
WITH RECURSIVE numbers AS (
  SELECT 1 AS n                                       -- anchor
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10              -- recursive
)
SELECT * FROM numbers;

-- Org chart: find all people under a manager
WITH RECURSIVE org_tree AS (
  -- Anchor: find the manager
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE name = 'Alice'

  UNION ALL

  -- Recursive: find direct reports
  SELECT e.id, e.name, e.manager_id, t.level + 1
  FROM employees e
  JOIN org_tree t ON e.manager_id = t.id
)
SELECT * FROM org_tree ORDER BY level, name;

-- Category tree (all subcategories)
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id, 0 AS depth
  FROM categories WHERE parent_id IS NULL

  UNION ALL

  SELECT c.id, c.name, c.parent_id, ct.depth + 1
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY depth, name;

-- Fibonacci sequence
WITH RECURSIVE fibonacci AS (
  SELECT 0 AS n, 1 AS next
  UNION ALL
  SELECT next, n + next FROM fibonacci WHERE next < 100
)
SELECT n FROM fibonacci;
```

</div>
</details>

---

## 🔴 Hard (Q111–Q150+)

<details class="qa-card qa-hard">
<summary>
Q111. How does InnoDB's MVCC (Multi-Version Concurrency Control) work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**MVCC** allows concurrent transactions to see different versions of data without locking each other. InnoDB implements it using:

**Key components:**
1. **Undo Log** — stores old versions of rows for rollback and consistent reads
2. **Read View** — snapshot of active transactions at a point in time
3. **Hidden columns** — each row has `DB_TRX_ID` (last modifying transaction ID) and `DB_ROLL_PTR` (pointer to undo log)

**How it works:**
```
Transaction A (TX ID=100) starts, reads row:
  → InnoDB checks: is the row's DB_TRX_ID < 100?
  → Yes: This version was committed before TX A started → visible
  → No: Check undo log for an older version

Transaction B (TX ID=101) updates same row:
  → Creates new version of row (DB_TRX_ID = 101)
  → Old version preserved in undo log
  → Transaction A still sees old version (consistent read)
```

**Benefits:**
- Readers never block writers
- Writers never block readers
- Consistent non-locking reads (no SELECT ... FOR UPDATE needed)
- Repeatable Read isolation without locks

**InnoDB uses MVCC for:**
- `REPEATABLE READ` — snapshot at first read in transaction
- `READ COMMITTED` — snapshot per statement

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q112. What is the difference between locking and blocking in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Locking** is how MySQL prevents concurrent access to data. **Blocking** is when one transaction waits for another's lock to be released.

**Lock types:**
```sql
-- Shared (S) lock: multiple transactions can READ
SELECT ... LOCK IN SHARE MODE;

-- Exclusive (X) lock: only one transaction can WRITE
SELECT ... FOR UPDATE;
INSERT, UPDATE, DELETE;  -- automatically acquire X locks

-- Intention locks: signaling intent to lock at a finer level
-- Intention Shared (IS), Intention Exclusive (IX)
```

**Lock granularity:**
| Type | Covers | Performance |
|------|--------|-------------|
| Row-level | Specific rows (InnoDB) | ✅ Best concurrency |
| Gap lock | Gap between index records | Prevents phantoms |
| Next-key lock | Row + gap before it | InnoDB default |
| Table-level | Entire table (MyISAM) | ❌ Worst concurrency |

```sql
-- Check current locks
SHOW OPEN TABLES WHERE In_use > 0;
SHOW ENGINE INNODB STATUS;

-- Set lock wait timeout (seconds)
SET innodb_lock_wait_timeout = 50;

-- Examples of blocking:
-- TX1: UPDATE employees SET salary = 80000 WHERE id = 1;
-- TX2: UPDATE employees SET salary = 90000 WHERE id = 1;  ← BLOCKED
-- TX2 waits until TX1 commits or rolls back
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q113. What is a gap lock and when does InnoDB use it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A **gap lock** locks a gap between index records, preventing other transactions from inserting new rows in that gap. This is how InnoDB prevents phantom reads at `REPEATABLE READ` level.

```sql
-- Example: employees table with salary index
-- Existing salaries: 30000, 50000, 70000

-- Transaction A:
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000 FOR UPDATE;
-- This locks:
-- - The gap (30000, 50000) ← prevents inserting salary 40000
-- - The record 50000 (next-key lock = row + gap)
-- - The gap (50000, 70000) ← prevents inserting salary 60000

-- Transaction B:
INSERT INTO employees (id, salary) VALUES (100, 45000);
-- ⏳ BLOCKED by Transaction A's gap lock!
```

**Types of gap locks:**
| Lock Type | Effect |
|-----------|--------|
| **Record lock** | Locks a single index record |
| **Gap lock** | Locks gap between records (prevents inserts) |
| **Next-key lock** | Record lock + gap lock before it (InnoDB default) |
| **Insert intention lock** | Special gap lock for INSERT operations |

**When gap locks are used:**
- `REPEATABLE READ` isolation level (default)
- `SELECT ... FOR UPDATE` or `SELECT ... LOCK IN SHARE MODE`
- `UPDATE` and `DELETE` with range conditions
- Unique index lookups on unique column (no gap lock needed)

**To reduce gap locking:** Use `READ COMMITTED` or use unique indexes for lookups.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q114. How do you design a database schema for an e-commerce platform?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- Users
CREATE TABLE users (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  name       VARCHAR(100),
  address    TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products with categories
CREATE TABLE categories (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  name      VARCHAR(100) NOT NULL,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE products (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  stock       INT NOT NULL DEFAULT 0,
  category_id INT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders (immutable after placement)
CREATE TABLE orders (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  status      ENUM('pending','confirmed','shipped','delivered','cancelled'),
  total       DECIMAL(12,2) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  order_id    INT NOT NULL,
  product_id  INT NOT NULL,
  quantity    INT NOT NULL,
  unit_price  DECIMAL(10,2) NOT NULL,  -- snapshot of price at order time
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Cart
CREATE TABLE cart_items (
  user_id    INT NOT NULL,
  product_id INT NOT NULL,
  quantity   INT NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

**Key design decisions:**
- `order_items.unit_price` stores price at time of order (product price may change)
- Orders are immutable after placement (historical record)
- Categories use self-join for unlimited hierarchy
- Stock management should use transactions with `SELECT ... FOR UPDATE`

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q115. How do you handle concurrent inventory updates in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- ❌ Race condition: two users ordering last item simultaneously
-- User A: SELECT stock FROM products WHERE id = 1;  → stock = 1
-- User B: SELECT stock FROM products WHERE id = 1;  → stock = 1 (same!)
-- User A: UPDATE products SET stock = 0 WHERE id = 1;
-- User B: UPDATE products SET stock = 0 WHERE id = 1;  → over-sold!

-- ✅ Solution 1: Optimistic locking (version column)
CREATE TABLE products (
  id      INT PRIMARY KEY,
  stock   INT NOT NULL,
  version INT NOT NULL DEFAULT 1
);

-- Update with version check
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE id = 1 AND version = 5 AND stock >= 1;
-- If version changed (another user updated first), affected_rows = 0
-- Retry the operation

-- ✅ Solution 2: Pessimistic locking (SELECT ... FOR UPDATE)
START TRANSACTION;
  -- Lock the row so no other transaction can read/write it
  SELECT stock FROM products WHERE id = 1 FOR UPDATE;
  -- Check stock >= 1
  UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;

-- ✅ Solution 3: Atomic UPDATE (simplest for stock decrement)
UPDATE products
SET stock = stock - 1
WHERE id = 1 AND stock >= 1;  -- condition in WHERE prevents overselling

-- Then check affected_rows: if 0, stock was insufficient
```

**Recommendation:** For high-concurrency systems, use atomic UPDATE with stock check in WHERE clause (Solution 3). It's the simplest and most performant.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q116. What is the difference between `HAVING` and `WHERE` with aggregates in subqueries?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- WHERE with subquery (filter by aggregate result)
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
-- WHERE runs before GROUP BY. Subquery is a separate query.

-- HAVING (filter grouped result by aggregate)
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
-- HAVING runs AFTER GROUP BY, on the grouped result

-- Using HAVING without GROUP BY (treats all rows as one group)
SELECT AVG(salary) AS avg_sal
FROM employees
HAVING AVG(salary) > 50000;  -- valid, equivalent to WHERE after aggregation

-- Complex example combining both
SELECT department, AVG(salary) AS avg_sal, COUNT(*) AS cnt
FROM employees
WHERE hire_date > '2020-01-01'    -- filter rows first
GROUP BY department
HAVING COUNT(*) > 3                -- filter groups
   AND AVG(salary) > 50000;
```

**Key difference:**
| Clause | Access to aggregates | When it runs |
|--------|-------------------|-------------|
| `WHERE` | ❌ Can't use `COUNT()`, `SUM()`, etc. | Before GROUP BY |
| `HAVING` | ✅ Can use `COUNT()`, `SUM()`, etc. | After GROUP BY |
| `WHERE` with subquery | ✅ Can compare to aggregate result | Before GROUP BY |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q117. How do you implement soft deletes in SQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Soft delete** marks a row as deleted instead of physically removing it. The row is hidden from normal queries.

```sql
-- Add deleted_at column (NULL = active, timestamp = deleted)
ALTER TABLE employees
ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;

-- Add is_active for simpler queries
ALTER TABLE employees
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

-- View: active records only
CREATE VIEW active_employees AS
SELECT * FROM employees WHERE deleted_at IS NULL;

-- Soft delete
UPDATE employees SET deleted_at = NOW(), is_active = FALSE WHERE id = 5;

-- Select only active
SELECT * FROM employees WHERE deleted_at IS NULL;

-- Restore
UPDATE employees SET deleted_at = NULL, is_active = TRUE WHERE id = 5;

-- Hard delete old soft-deleted records (cleanup)
DELETE FROM employees WHERE deleted_at < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- Index for performance
CREATE INDEX idx_active ON employees(deleted_at);
```

**Considerations:**
- All queries must filter `WHERE deleted_at IS NULL`
- Foreign keys still reference the "deleted" row
- Unique constraints can conflict with soft-deleted rows
- Use views to simplify queries
- Consider a cleanup job to hard-delete after X days

**Indexed pattern:** `WHERE deleted_at IS NULL` works well with a partial index (PostgreSQL) or filtered index (SQL Server).

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q118. What are the different types of replication in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**MySQL replication** copies data from a source (primary) to one or more replicas.

**Replication types:**

| Type | Description | Use Case |
|------|-------------|----------|
| **Async** | Primary doesn't wait for replica | Default, best performance |
| **Semi-sync** | Primary waits for at least one replica ACK | Balance of safety + performance |
| **Group** | Multi-primary, consensus-based | High availability |
| **GTID-based** | Uses Global Transaction IDs | Easier failover |
| **Log-based** | Based on binary log position | Legacy |

```sql
-- On primary: enable binary logging
-- my.cnf
[mysqld]
server-id = 1
log_bin = /var/log/mysql/mysql-bin.log
binlog_format = ROW

-- Create replication user
CREATE USER 'replica'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';

-- Show primary status
SHOW MASTER STATUS;

-- On replica:
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='primary.example.com',
  SOURCE_USER='replica',
  SOURCE_PASSWORD='password',
  SOURCE_LOG_FILE='mysql-bin.000001',
  SOURCE_LOG_POS=12345;

START REPLICA;
SHOW REPLICA STATUS\G
```

**Benefits:**
- Read scaling (distribute SELECT queries)
- High availability (promote replica on failure)
- Backups without impacting primary
- Geographic distribution

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q119. What is sharding and how is it different from partitioning?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Sharding** distributes data across **multiple database servers** (horizontal scaling). **Partitioning** divides a table within a **single server**.

| Feature | Partitioning | Sharding |
|---------|-------------|----------|
| **Scope** | Within one database server | Across multiple servers |
| **Complexity** | Low (built-in) | High (application-level) |
| **Scaling** | Up to available disk/memory | Horizontally unlimited |
| **Schema changes** | Easy | Complex (all shards) |
| **Cross-shard queries** | N/A (single server) | Complex/expensive |
| **Transactions** | Full support (single node) | Limited (distributed) |

```sql
-- Partitioning (MySQL native)
CREATE TABLE orders (
  id         INT NOT NULL,
  order_date DATE NOT NULL,
  amount     DECIMAL(10,2),
  PRIMARY KEY (id, order_date)
)
PARTITION BY RANGE (YEAR(order_date)) (
  PARTITION p2022 VALUES LESS THAN (2023),
  PARTITION p2023 VALUES LESS THAN (2024),
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

**Sharding strategies:**
- **Range sharding**: users 1-10000 on shard 1, 10001-20000 on shard 2
- **Hash sharding**: `shard = hash(user_id) % N`
- **Directory-based**: lookup table maps keys to shards

**When to shard:** > 1TB data, write throughput exceeds single server capacity, need geographic distribution.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q120. How does query optimization work at the database engine level?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Query optimization** is the process where MySQL's optimizer selects the most efficient execution plan.

**Optimizer steps:**

```
SQL Query → Parser → Preprocessor → Optimizer → Execution Plan → Execution Engine
```

**Optimizer techniques:**
```sql
-- 1. Cost-based optimization
-- The optimizer uses table statistics to estimate cost:
SHOW TABLE STATUS LIKE 'employees';
SHOW INDEX FROM employees;
ANALYZE TABLE employees;  -- update statistics

-- 2. Join reordering
-- Optimizer tries different join orders to minimize intermediate results
SELECT * FROM a JOIN b JOIN c ...
-- May try: a→b→c, a→c→b, b→a→c, etc.

-- 3. Index selection
-- Chooses the most selective index
SELECT * FROM employees WHERE department = 'IT' AND salary > 80000;
-- Chooses which index: idx_dept, idx_salary, or idx_dept_salary

-- 4. Subquery transformation
-- Converts subqueries to JOINs when beneficial
EXPLAIN FORMAT=JSON SELECT * FROM employees
WHERE dept_id IN (SELECT id FROM departments WHERE active = 1);

-- 5. Constant folding
SELECT * FROM employees WHERE salary = 50000 + 10000;
-- → WHERE salary = 60000

-- 6. View merging
-- Merges view definition into the outer query
```

**Force optimizer behavior:**
```sql
-- Hint to use specific index
SELECT * FROM employees USE INDEX (idx_department) WHERE department = 'IT';

-- Ignore an index
SELECT * FROM employees IGNORE INDEX (idx_salary) WHERE salary > 50000;

-- Force index (use even if optimizer thinks it's worse)
SELECT * FROM employees FORCE INDEX (idx_department) WHERE department = 'IT';
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q121. How do you design a table for hierarchical data (categories, org charts)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

There are four main approaches to storing hierarchical data in SQL:

**1. Adjacency List (simplest — uses parent_id):**
```sql
CREATE TABLE categories (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  name      VARCHAR(100),
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);
-- ✅ Simple inserts
-- ❌ Recursive queries needed to get full tree
-- WITH RECURSIVE or application-level recursion
```

**2. Nested Set (optimized for reads):**
```sql
CREATE TABLE categories (
  id   INT PRIMARY KEY,
  name VARCHAR(100),
  lft  INT NOT NULL,  -- left bound
  rgt  INT NOT NULL   -- right bound
);
-- Get all descendants: WHERE lft > parent.lft AND rgt < parent.rgt
-- ✅ One query for full subtree
-- ❌ Expensive inserts/updates
```

**3. Materialized Path (store full path as string):**
```sql
CREATE TABLE categories (
  id   INT PRIMARY KEY,
  name VARCHAR(100),
  path VARCHAR(500)  -- e.g., '/electronics/computers/laptops'
);
-- Get all children: WHERE path LIKE '/electronics/%'
-- ✅ Simple queries with LIKE
-- ❌ Path updates are expensive
```

**4. Closure Table (separate table for ancestry):**
```sql
CREATE TABLE categories (
  id   INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE category_paths (
  ancestor   INT NOT NULL,
  descendant INT NOT NULL,
  depth      INT NOT NULL,
  PRIMARY KEY (ancestor, descendant)
);
-- ✅ Fast all queries
-- ❌ More storage, complex maintenance
```

**Recommendation:** Start with **Adjacency List** + `WITH RECURSIVE`. Move to **Closure Table** when performance matters.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q122. What is the difference between `CHAR_LENGTH` and `LENGTH`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Key difference:** `LENGTH()` returns the length in **bytes**, while `CHAR_LENGTH()` returns the length in **characters**.

```sql
-- For single-byte characters (ASCII), they return the same
SELECT LENGTH('hello');        -- 5 bytes
SELECT CHAR_LENGTH('hello');   -- 5 characters

-- For multibyte characters (UTF-8), they differ
SELECT LENGTH('héllo');         -- 6 bytes (é is 2 bytes)
SELECT CHAR_LENGTH('héllo');    -- 5 characters

SELECT LENGTH('ありがとう');       -- 15 bytes (each char is 3 bytes)
SELECT CHAR_LENGTH('ありがとう');  -- 5 characters

-- Practical impact
CREATE TABLE articles (
  title VARCHAR(255)  -- 255 characters, not bytes!
);
```

**When to use which:**
- `CHAR_LENGTH()` — when you need the **character count** (UI display, validation)
- `LENGTH()` — when you need the **storage size** (disk space, memory estimation)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q123. How do you convert rows to columns (pivot) in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- Sample data: monthly sales
-- sales: year, month, amount
-- 2023, Jan, 1000
-- 2023, Feb, 1200
-- 2023, Mar, 900

-- Method 1: CASE-based pivot
SELECT
  year,
  SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) AS Jan,
  SUM(CASE WHEN month = 'Feb' THEN amount ELSE 0 END) AS Feb,
  SUM(CASE WHEN month = 'Mar' THEN amount ELSE 0 END) AS Mar,
  SUM(amount) AS total
FROM sales
GROUP BY year;

-- Method 2: Dynamic pivot (stored procedure)
SET @sql = NULL;
SELECT GROUP_CONCAT(DISTINCT
  CONCAT('SUM(CASE WHEN month = ''', month, ''' THEN amount ELSE 0 END) AS `', month, '`')
) INTO @sql
FROM sales;

SET @sql = CONCAT('SELECT year, ', @sql, ', SUM(amount) AS total FROM sales GROUP BY year');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Method 3: Using COALESCE for comma-separated values
SELECT department,
       GROUP_CONCAT(name ORDER BY salary DESC) AS employees
FROM employees
GROUP BY department;
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q124. What is the difference between `NOW()`, `CURRENT_TIMESTAMP`, and `SYSDATE()`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Function | Returns | Behavior |
|----------|---------|----------|
| `NOW()` | Current datetime | Constant within a **statement** |
| `CURRENT_TIMESTAMP` | Current datetime | Synonym for `NOW()` |
| `SYSDATE()` | Current datetime | Executed at **moment of invocation** |

```sql
SELECT NOW(), SYSDATE(), SLEEP(2), NOW(), SYSDATE();
-- NOW()        → 2024-04-06 14:30:00 (same both times)
-- SYSDATE()    → 2024-04-06 14:30:00 (first call)
-- SLEEP(2)     → 0
-- NOW()        → 2024-04-06 14:30:00 (same!)
-- SYSDATE()    → 2024-04-06 14:30:02 (2 seconds later!)
```

**Why this matters:**
- `NOW()` returns the **statement start time** — consistent for the entire query
- `SYSDATE()` returns the **actual current time** — can vary within a long query
- In replication, `SYSDATE()` can cause inconsistency between primary and replica

**Recommendation:** Use `NOW()` unless you specifically need `SYSDATE()` behavior.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q125. How do you find duplicate indexes in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- Check all indexes on a table
SHOW INDEX FROM employees;

-- Find indexes with same columns (prefixes)
SELECT
  TABLE_NAME,
  GROUP_CONCAT(DISTINCT INDEX_NAME ORDER BY INDEX_NAME) AS indexes
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'company_db'
GROUP BY TABLE_NAME, INDEX_NAME;

-- Find redundant indexes (one index is prefix of another)
-- Example: idx_dept(dept) and idx_dept_salary(dept, salary)
-- idx_dept is redundant because idx_dept_salary covers it

-- Check unused indexes (since MySQL restart)
SELECT
  object_schema,
  object_name,
  index_name,
  count_star AS reads
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE count_star = 0
  AND index_name IS NOT NULL
  AND index_name != 'PRIMARY'
  AND object_schema = 'company_db';
```

**Dropping redundant indexes:**
```sql
-- If idx_dept and idx_dept_salary both exist, drop idx_dept
DROP INDEX idx_dept ON employees;
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q126. What is the difference between `UNION`, `INTERSECT`, and `EXCEPT`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- Sample data
-- Table A: 1, 2, 3, 4
-- Table B: 3, 4, 5, 6

-- UNION: all unique values
SELECT value FROM table_a
UNION
SELECT value FROM table_b;
-- Result: 1, 2, 3, 4, 5, 6

-- UNION ALL: all values (including duplicates)
SELECT value FROM table_a
UNION ALL
SELECT value FROM table_b;
-- Result: 1, 2, 3, 4, 3, 4, 5, 6

-- INTERSECT: values in BOTH tables (MySQL 8.0.31+)
SELECT value FROM table_a
INTERSECT
SELECT value FROM table_b;
-- Result: 3, 4

-- EXCEPT: values in A but NOT in B (MySQL 8.0.31+)
SELECT value FROM table_a
EXCEPT
SELECT value FROM table_b;
-- Result: 1, 2

-- Pre-8.0.31 workarounds:
-- INTERSECT:
SELECT DISTINCT a.value FROM table_a a
WHERE a.value IN (SELECT value FROM table_b);

-- EXCEPT:
SELECT DISTINCT a.value FROM table_a a
WHERE a.value NOT IN (SELECT value FROM table_b WHERE value IS NOT NULL);
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q127. What are the different types of SQL injection and how do you prevent them?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**SQL injection** occurs when user input is unsafely concatenated into SQL queries.

**Types of SQL injection:**
```sql
-- 1. Classic: ' OR '1'='1
-- Input: "admin' OR '1'='1"
SELECT * FROM users WHERE username = 'admin' OR '1'='1';  -- returns all users!

-- 2. UNION-based
-- Input: "1' UNION SELECT * FROM credit_cards"
SELECT * FROM orders WHERE id = '1' UNION SELECT * FROM credit_cards;

-- 3. Blind (boolean-based)
-- Input: "1' AND (SELECT COUNT(*) FROM users) > 0 -- "
SELECT * FROM users WHERE id = '1' AND (SELECT COUNT(*) FROM users) > 0;

-- 4. Time-based blind
-- Input: "1' AND IF(SLEEP(5), 1, 0) -- "
SELECT * FROM users WHERE id = '1' AND IF(SLEEP(5), 1, 0);
```

**Prevention:**
```sql
-- ✅ 1. Parameterized queries (PREPARED STATEMENTS) — BEST
PREPARE stmt FROM 'SELECT * FROM users WHERE email = ?';
SET @email = 'user@example.com';
EXECUTE stmt USING @email;
DEALLOCATE PREPARE stmt;

-- ✅ 2. Stored procedures (if parameterized internally)
CALL GetUserByEmail('user@example.com');

-- ✅ 3. Input validation (whitelist)
-- Validate input type (INT, DATE, ENUM value)
IF NOT @input REGEXP '^[0-9]+$' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid ID'; END IF;

-- ✅ 4. Escape user input (last resort)
-- Use QUOTE() or prepared statements instead
```

**Best practice:** Always use parameterized queries/prepared statements. Never concatenate user input into SQL.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q128. What is a covering index and how do you identify one?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A **covering index** contains all columns needed by a query. MySQL can satisfy the query entirely from the index without accessing the table.

```sql
-- Create a covering index
CREATE INDEX idx_covering ON employees(department, salary, name);

-- This query is answered entirely from the index:
SELECT name, salary FROM employees WHERE department = 'IT';
-- EXPLAIN shows: "Using index" in Extra column

-- How to identify:
EXPLAIN FORMAT=JSON
SELECT name, salary FROM employees WHERE department = 'IT';
\G
-- Look for: "using_index": true

-- Benefits of covering indexes:
-- 1. Only index pages are read (much smaller than table)
-- 2. No table lookups (reduces random I/O)
-- 3. Index is usually cached in memory (InnoDB buffer pool)

-- How to design covering indexes:
-- 1. Identify frequently-run queries
-- 2. Include WHERE columns first (for lookups)
-- 3. Include SELECT columns (to cover the query)
-- 4. Include ORDER BY columns (to avoid filesort)

-- Example: optimize this query
SELECT department, COUNT(*) AS cnt
FROM employees
WHERE salary > 50000
GROUP BY department;

-- Covering index: idx_covering(salary, department)
CREATE INDEX idx_covering ON employees(salary, department);
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q129. How do MySQL indexes work internally (B-Tree structure)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

MySQL uses **B+Tree** (balanced tree) indexes. Understanding the structure helps optimize queries.

**B+Tree structure:**
```
                    [Root Node]
               /        |        \
        [Branch]    [Branch]    [Branch]
        /    \      /    \      /    \
    [Leaf] [Leaf] [Leaf] [Leaf] [Leaf] [Leaf]
      ↓      ↓      ↓      ↓      ↓      ↓
    Row1   Row5   Row10  Row15  Row20  Row25
```

**Key properties:**
- **Root** — top-level node, points to branch nodes
- **Branch nodes** — intermediate nodes (not stored in InnoDB for depth > 2)
- **Leaf nodes** — contain actual values + pointers to rows (InnoDB PK values)
- All leaf nodes are at the **same depth** (balanced)
- Leaf nodes are **linked** for efficient range scans

**In InnoDB:**
```
Clustered Index (Primary Key):
    Leaf = actual row data (all columns)
    
Secondary Index (any other index):
    Leaf = column values + PK value
    Then needs an extra lookup to the clustered index
```

**Index lookup complexity:**
- Single value: O(log n) — very fast
- Range scan: O(log n + k) — fast for small ranges
- Full index scan: O(n) — still better than full table scan

**How many disk accesses for a lookup?**
- A 3-level B+Tree can index millions of rows
- Typical depth: 3-4 levels for billions of rows
- Each level = 1 disk read (if not cached)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q130. What is the difference between `INNER JOIN` and `EXISTS`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Aspect | INNER JOIN | EXISTS |
|--------|------------|--------|
| **Result** | Columns from both tables | Columns from outer table only |
| **Duplicates** | Can create duplicates (1:N) | No duplicate risk |
| **Performance (small tables)** | Comparable | Comparable |
| **Performance (large subquery)** | May need DISTINCT | Usually faster |
| **NULL handling** | Standard join | ✅ Safe with NULLs |

```sql
-- INNER JOIN: useful when you need data from both tables
SELECT DISTINCT d.dept_name
FROM departments d
INNER JOIN employees e ON d.id = e.dept_id;
-- Need DISTINCT because 1 department has many employees

-- EXISTS: just checking existence, no data needed from right table
SELECT d.dept_name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e WHERE e.dept_id = d.id
);
-- No duplicates, no DISTINCT needed

-- EXISTS is often faster when:
-- 1. The subquery can use indexes efficiently
-- 2. The outer table is large and subquery is selective
-- 3. You don't need data from the right table

-- JOIN is preferred when:
-- 1. You need columns from both tables
-- 2. Both tables are small
-- 3. The join selectivity is high (most rows match)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q131. What is the difference between `GROUP BY` and `DISTINCT`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Aspect | DISTINCT | GROUP BY |
|--------|----------|----------|
| **Purpose** | Remove duplicate rows | Group rows for aggregation |
| **Aggregates** | ❌ Cannot use | ✅ Can use COUNT(), SUM(), etc. |
| **Sorting** | No guarantee | Sorts result (MySQL) |
| **Performance** | Slightly faster for dedup only | Slightly slower (more work) |
| **Flexibility** | Simple deduplication | Multi-column, expressions, HAVING |

```sql
-- Same result for simple deduplication:
SELECT DISTINCT department FROM employees;
SELECT department FROM employees GROUP BY department;

-- GROUP BY can do more:
SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- DISTINCT with multiple columns:
SELECT DISTINCT department, location FROM employees;

-- GROUP BY with multiple columns:
SELECT department, location, COUNT(*)
FROM employees
GROUP BY department, location;

-- DISTINCT can't use HAVING:
SELECT DISTINCT department FROM employees;
-- Can't filter based on count

-- MySQL optimization: DISTINCT and GROUP BY often use the same execution plan
```

**Rule of thumb:** Use `DISTINCT` for simple deduplication. Use `GROUP BY` when you also need aggregates or HAVING.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q132. How do you calculate running totals and moving averages in SQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Running total:**
```sql
-- Using window function (MySQL 8.0+)
SELECT date, amount,
  SUM(amount) OVER (ORDER BY date) AS running_total,
  SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) AS running_total2
FROM daily_sales;

-- Per group
SELECT department, name, salary,
  SUM(salary) OVER (PARTITION BY department ORDER BY salary) AS dept_running
FROM employees;
```

**Moving average:**
```sql
-- 3-day moving average
SELECT date, amount,
  AVG(amount) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS moving_avg_3day,
  -- 7-day moving average
  AVG(amount) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7day
FROM daily_sales;

-- Running total without window functions (pre-8.0)
SELECT a.date, a.amount,
  SUM(b.amount) AS running_total
FROM daily_sales a
JOIN daily_sales b ON b.date <= a.date
GROUP BY a.date, a.amount
ORDER BY a.date;
-- ⚠️ Very slow for large tables!
```

**Cumulative percentage:**
```sql
WITH total AS (SELECT SUM(sales) AS grand_total FROM products)
SELECT name, sales,
  sales / (SELECT grand_total FROM total) * 100 AS pct,
  SUM(sales) OVER (ORDER BY sales DESC) / (SELECT grand_total FROM total) * 100 AS cumulative_pct
FROM products;
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q133. What is a semi-join and how does MySQL optimize it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A **semi-join** returns rows from the first table that have **at least one** matching row in the second table. It's like an INNER JOIN but without duplicates.

```sql
-- Semi-join pattern (returns departments that have employees)
SELECT * FROM departments d
WHERE EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.id);

-- Also a semi-join:
SELECT * FROM departments d
WHERE d.id IN (SELECT dept_id FROM employees);
```

**MySQL semi-join optimization (5.6+):**
When MySQL detects a subquery suitable for semi-join, it transforms the execution for better performance.

```sql
-- MySQL internally transforms:
SELECT * FROM departments
WHERE id IN (SELECT dept_id FROM employees WHERE salary > 50000);

-- Into something like:
SELECT d.* FROM departments d
SEMI JOIN employees e ON d.id = e.dept_id AND e.salary > 50000;
```

**Semi-join strategies MySQL can use:**
| Strategy | Description |
|----------|-------------|
| **Duplicate Weedout** | Create temporary table, remove duplicates |
| **First Match** | Stop scanning inner table after first match |
| **Loose Scan** | Use index to skip duplicate groups |
| **Materialization** | Materialize subquery into temp table, add index |
| **Materialization-Lookup** | Same, but lookup-based |

**Anti-join:** The opposite — rows with NO match (`NOT IN`, `NOT EXISTS`).

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q134. What is the difference between `ROW_NUMBER()` and `RANK()` in practice?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
SELECT name, salary, department,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn,
  RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
FROM employees;
```

**Practical example with ties:**

| name | salary | dept | ROW_NUMBER | RANK |
|------|--------|------|-----------|------|
| Alice | 90000 | IT | 1 | 1 |
| Bob | 80000 | IT | 2 | 2 |
| Carol | 80000 | IT | 3 | 2 |
| David | 70000 | IT | 4 | 4 |

**When to use each:**

```sql
-- ROW_NUMBER: pagination, unique ranking, deduplication
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
  FROM users
)
DELETE FROM users WHERE id IN (SELECT id FROM ranked WHERE rn > 1);
-- Keeps one row per email (the first by id)

-- RANK: Olympic-style ranking
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;
-- "I'm tied for 2nd place"

-- DENSE_RANK: Compact ranking (Nth highest salary)
SELECT DISTINCT salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr
  FROM employees
) t WHERE dr = 3;
-- Third highest salary
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q135. How do you handle many-to-many relationships in SQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Many-to-many relationships require a **junction table** (bridge table) between the two entities.

```sql
-- Students and Courses (many-to-many)
CREATE TABLE students (
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL
);

-- Junction table
CREATE TABLE enrollments (
  student_id INT NOT NULL,
  course_id  INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  grade       CHAR(1),
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Courses for a specific student
SELECT c.title, e.grade
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE s.id = 1;

-- Students in a specific course
SELECT s.name, e.grade
FROM courses c
JOIN enrollments e ON c.id = e.course_id
JOIN students s ON e.student_id = s.id
WHERE c.id = 1;
```

**Other many-to-many examples:**
- Orders ↔ Products (via `order_items`)
- Users ↔ Roles (via `user_roles`)
- Authors ↔ Books (via `book_authors`)
- Tags ↔ Posts (via `post_tags`)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q136. What are database transactions best practices?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- Best Practice 1: Keep transactions SHORT
START TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
-- ✅ Short, focused, no user interaction inside

-- Best Practice 2: Never put user input prompts inside transactions
-- ❌ Bad
START TRANSACTION;
  -- user prompted for input (holding locks!)
  SELECT quantity FROM inventory WHERE product_id = 1 FOR UPDATE;
  -- waiting for user...
COMMIT;

-- Best Practice 3: Consistent lock ordering
-- ✅ All transactions lock in the same order
-- TX1: UPDATE A → UPDATE B
-- TX2: UPDATE A → UPDATE B  (same order!)
-- ❌ Different order causes deadlocks
-- TX1: UPDATE A → UPDATE B
-- TX2: UPDATE B → UPDATE A  (DEADLOCK!)

-- Best Practice 4: Handle errors and rollback
START TRANSACTION;
  INSERT INTO orders (user_id, amount) VALUES (1, 100);
  UPDATE products SET stock = stock - 1 WHERE id = 5;
  IF ROW_COUNT() = 0 THEN
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient stock';
  END IF;
COMMIT;

-- Best Practice 5: Use appropriate isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- For most applications, READ COMMITTED is sufficient

-- Best Practice 6: Monitor long-running transactions
SELECT trx_id, trx_state, trx_started, trx_rows_locked
FROM information_schema.innodb_trx;
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q137. How does MySQL handle `ORDER BY` with `LIMIT` optimization?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

MySQL optimizes `ORDER BY ... LIMIT n` to avoid sorting the entire result set.

```sql
-- Without optimization: sorts ALL rows, then returns top 10
SELECT * FROM employees ORDER BY salary DESC LIMIT 10;

-- With index optimization: scans top 10 from index directly
CREATE INDEX idx_salary ON employees(salary);

-- EXPLAIN shows: "Using index" (key = idx_salary)
-- MySQL scans the index in order, stops after 10 rows
-- No filesort needed!

-- Limit pushdown optimization (MySQL 8.0):
-- For joins with ORDER BY ... LIMIT, MySQL pushes limit to each table
SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id
ORDER BY e.salary DESC
LIMIT 5;
-- MySQL may stop early after finding 5 best results
```

**Filesort avoidance tips:**
```sql
-- ✅ Uses index (no filesort)
CREATE INDEX idx_dept_salary ON employees(department, salary);
SELECT * FROM employees ORDER BY department, salary;

-- ❌ Still needs filesort (ORDER BY doesn't match index order)
SELECT * FROM employees ORDER BY salary, department;

-- ✅ Index for ORDER BY + LIMIT
CREATE INDEX idx_salary ON employees(salary DESC);
SELECT * FROM employees ORDER BY salary DESC LIMIT 10;
-- Scans 10 entries from index, no table sort needed
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q138. What are the different types of table locks in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Lock Type | Scope | Engine | Effect |
|-----------|-------|--------|--------|
| **Table Read Lock** | Entire table | MyISAM | Others can read, can't write |
| **Table Write Lock** | Entire table | MyISAM | Others can't read or write |
| **Row Shared (S) Lock** | Specific rows | InnoDB | Others can read, can't write |
| **Row Exclusive (X) Lock** | Specific rows | InnoDB | Others can't read or write |
| **Intent Shared (IS)** | Table-level | InnoDB | Plans to lock rows with S lock |
| **Intent Exclusive (IX)** | Table-level | InnoDB | Plans to lock rows with X lock |
| **Auto-Inc Lock** | Table-level | InnoDB | Manages AUTO_INCREMENT |

```sql
-- Explicit table locks (MyISAM or with LOCK TABLES)
LOCK TABLES employees READ;   -- shared read lock
SELECT * FROM employees;       -- allowed
UPDATE employees SET salary = 0;  -- ERROR! Table locked for read only
UNLOCK TABLES;

LOCK TABLES employees WRITE;  -- exclusive write lock
INSERT INTO employees VALUES (1, 'Alice');  -- allowed
UNLOCK TABLES;

-- InnoDB row-level locks
SELECT * FROM employees WHERE id = 1 LOCK IN SHARE MODE;  -- S lock
SELECT * FROM employees WHERE id = 1 FOR UPDATE;           -- X lock

-- Check lock status
SHOW OPEN TABLES WHERE In_use > 0;
SHOW ENGINE INNODB STATUS\G
SELECT * FROM performance_schema.data_locks\G
```

**InnoDB vs MyISAM locking:**
- **InnoDB:** Row-level (better concurrency, fewer lock conflicts)
- **MyISAM:** Table-level (simple but poor concurrency)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q139. How do you optimize queries with OR conditions?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`OR` conditions can prevent index usage. Here's how to optimize them:

```sql
-- ❌ OR with different columns may not use indexes efficiently
SELECT * FROM employees
WHERE department = 'IT' OR salary > 100000;

-- ✅ Solution 1: Use UNION
SELECT * FROM employees WHERE department = 'IT'
UNION
SELECT * FROM employees WHERE salary > 100000;

-- ✅ Solution 2: Create a composite index
CREATE INDEX idx_dept_salary ON employees(department, salary);

-- ✅ Solution 3: Use IN instead of OR (same column)
-- ❌
SELECT * FROM employees WHERE department = 'IT' OR department = 'HR';
-- ✅
SELECT * FROM employees WHERE department IN ('IT', 'HR');

-- ✅ Solution 4: Rewrite with UNION ALL if no duplicates needed
SELECT * FROM employees WHERE department = 'IT'
UNION ALL
SELECT * FROM employees WHERE salary > 100000 AND department != 'IT';

-- ✅ Solution 5: Use EXISTS as alternative
SELECT * FROM employees e1
WHERE EXISTS (
  SELECT 1 FROM employees e2
  WHERE (e2.dept = 'IT' AND e2.id = e1.id)
     OR (e2.salary > 100000 AND e2.id = e1.id)
);
```

**When UNION helps:**
- Each branch of the OR can use a different index
- The branches access different parts of the table

**When UNION hurts:**
- The OR condition is simple (one index covers both)
- The table is small (table scan is faster than UNION overhead)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q140. How do you implement audit logging in SQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Method 1: Triggers (database-level)**
```sql
-- Create audit table
CREATE TABLE employees_audit (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  emp_id     INT NOT NULL,
  field_name VARCHAR(50),
  old_value  TEXT,
  new_value  TEXT,
  changed_by VARCHAR(100),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for UPDATE
CREATE TRIGGER audit_employee_changes
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  IF OLD.salary <> NEW.salary THEN
    INSERT INTO employees_audit (emp_id, field_name, old_value, new_value, changed_by)
    VALUES (OLD.id, 'salary', OLD.salary, NEW.salary, CURRENT_USER());
  END IF;
  IF OLD.department <> NEW.department THEN
    INSERT INTO employees_audit (emp_id, field_name, old_value, new_value, changed_by)
    VALUES (OLD.id, 'department', OLD.department, NEW.department, CURRENT_USER());
  END IF;
END;

-- Trigger for DELETE
CREATE TRIGGER audit_employee_delete
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO employees_audit (emp_id, field_name, old_value, changed_by)
  VALUES (OLD.id, 'DELETED', CONCAT_WS(',', OLD.name, OLD.salary, OLD.department), CURRENT_USER());
END;
```

**Method 2: Application-level (more flexible)**
```sql
-- Add versioning to the table
CREATE TABLE employees (
  id        INT PRIMARY KEY,
  name      VARCHAR(100),
  salary    DECIMAL(10,2),
  version   INT NOT NULL DEFAULT 1,
  updated_by VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Separate history table
CREATE TABLE employees_history LIKE employees;
ALTER TABLE employees_history ADD PRIMARY KEY (id, version);

-- Application copies old version to history before update
```

**Method 3: Binary log-based (MySQL Enterprise)**
- Use MySQL Enterprise Audit plugin
- No application changes needed
- Captures all queries (not just data changes)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q141. What is the difference between `LOCK IN SHARE MODE` and `FOR UPDATE`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Feature | `LOCK IN SHARE MODE` | `FOR UPDATE` |
|---------|---------------------|--------------|
| **Lock type** | Shared (S) lock | Exclusive (X) lock |
| **Other reads** | ✅ Allowed | ❌ Blocked |
| **Other writes** | ❌ Blocked | ❌ Blocked |
| **Other `FOR UPDATE`** | ❌ Blocked | ❌ Blocked |
| **Other `LOCK IN SHARE MODE`** | ✅ Allowed | ❌ Blocked |
| **Use case** | Read current value, prevent modification | Read + prepare for update |

```sql
-- Transaction A
START TRANSACTION;
SELECT * FROM products WHERE id = 1 LOCK IN SHARE MODE;
-- Gains S lock on product 1

-- Transaction B: Can read normally
SELECT * FROM products WHERE id = 1;  -- ✅ Allowed

-- Transaction B: Can also take S lock
SELECT * FROM products WHERE id = 1 LOCK IN SHARE MODE;  -- ✅ Allowed

-- Transaction B: Cannot update or take X lock
UPDATE products SET price = 20 WHERE id = 1;  -- ⏳ BLOCKED
SELECT * FROM products WHERE id = 1 FOR UPDATE;  -- ⏳ BLOCKED

-- Transaction A: Can't upgrade to X lock if others hold S lock!
SELECT * FROM products WHERE id = 1 FOR UPDATE;  -- ⏳ DEADLOCK risk!
```

**When to use each:**
- `LOCK IN SHARE MODE`: When you want to read a value and ensure it doesn't change before COMMIT (e.g., reading a config)
- `FOR UPDATE`: When you're going to UPDATE the row (inventory, banking). Prevents deadlocks better.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q142. How do you handle schema migrations in production?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Schema migration best practices for production databases:**

**1. Use migration tools:**
```sql
-- Tools: Flyway, Liquibase, Alembic (Python), Rails Migrations
-- Each migration is versioned and run in order

-- Example migration 001_add_email_to_users.sql
ALTER TABLE users ADD COLUMN email VARCHAR(255) AFTER name;
```

**2. Safe ALTER TABLE strategies:**

```sql
-- ✅ Small tables: ALTER directly
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- ✅ Large tables: Use pt-online-schema-change (Percona Toolkit)
-- pt-online-schema-change --alter "ADD COLUMN phone VARCHAR(20)" D=company,t=users

-- ✅ Or gh-ost (GitHub's online schema migration)
-- gh-ost --alter "ADD COLUMN phone VARCHAR(20)" --database company --table users
```

**3. Backward-compatible changes:**
```sql
-- ✅ Add column (existing code ignores unknown columns)
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL;

-- ❌ Rename column (will break queries using old name)
ALTER TABLE users RENAME COLUMN phone TO mobile;
-- ✅ Instead: add new column, update code, drop old column later

-- ✅ Deprecate gradually
ALTER TABLE users ADD COLUMN mobile VARCHAR(20);
-- Step 1: Add column + write to both columns
-- Step 2: Deploy code to read from new column
-- Step 3: Backfill data
-- Step 4: Drop old column
```

**4. Execute during low traffic:**
```sql
-- Check current queries
SHOW FULL PROCESSLIST;

-- Kill long-running queries before migration
KILL QUERY 12345;
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q143. What is a query plan and how do you read it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A **query plan** (execution plan) shows how MySQL will execute your query — the steps, indexes, and join methods.

```sql
EXPLAIN SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id
WHERE e.salary > 50000
ORDER BY e.name
LIMIT 10;
```

**Output columns explained:**

| Column | What it shows | Good/Bad |
|--------|---------------|----------|
| `id` | Query step number | Lower = executes later |
| `select_type` | SIMPLE, PRIMARY, SUBQUERY, DERIVED, UNION | |
| `table` | Table name | |
| `type` | Access method | `const` ✅ best → `ALL` ❌ worst |
| `possible_keys` | Indexes MySQL could use | |
| `key` | Index actually used | Should not be NULL |
| `key_len` | Length of key used | Longer = more specific |
| `ref` | How the key was matched | `const`, column name |
| `rows` | Estimated rows examined | Lower is better |
| `Extra` | Additional info | Key indicators below |

**Access types (best to worst):**
```
const     → single row by PK (perfect)
eq_ref    → one row per join (PK/NK lookups)
ref       → multiple matches by index
ref_or_null → ref + NULL matches
range     → BETWEEN, >, <, IN with index
index     → full index scan
ALL       → full table scan (BAD!)
```

**Extra column hints:**
```
Using index          → Covering index (excellent!)
Using where          → Filtering after table access
Using index condition → Index condition pushdown (good)
Using filesort       → Needs sort (add index to avoid)
Using temporary      → Needs temp table (add index to avoid)
Using MRR            → Multi-range read optimization
```

```sql
-- JSON format (more detailed)
EXPLAIN FORMAT=JSON SELECT ...;
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q144. How do you backup and restore a MySQL database?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Logical backup (mysqldump):**
```sql
-- Backup single database
mysqldump -u root -p company_db > backup.sql

-- Backup single table
mysqldump -u root -p company_db employees > employees_backup.sql

-- Backup multiple databases
mysqldump -u root -p --databases db1 db2 > backup.sql

-- Backup all databases
mysqldump -u root -p --all-databases > all_backup.sql

-- Backup with routines and events
mysqldump -u root -p --routines --events --triggers company_db > full_backup.sql

-- Restore
mysql -u root -p company_db < backup.sql
mysql -u root -p < all_backup.sql
```

**Physical backup (faster for large DBs):**
```bash
# Using Percona XtraBackup
xtrabackup --backup --target-dir=/backup/
xtrabackup --prepare --target-dir=/backup/
xtrabackup --copy-back --target-dir=/backup/
```

**Backup strategies:**

| Type | Speed | Restore time | Point-in-time recovery |
|------|-------|-------------|----------------------|
| mysqldump (SQL) | Slow | Slow | ❌ No |
| Binary log | Continuous | Fast | ✅ Yes |
| Physical (xtrabackup) | Fast | Fast | ✅ Yes |
| Snapshot (LVM) | Instant | Medium | ❌ Limited |

**Point-in-time recovery using binary logs:**
```sql
-- Full backup
mysqldump --all-databases --master-data=2 > full_backup.sql

-- Restore full backup
mysql < full_backup.sql

-- Apply binary logs up to a specific time
mysqlbinlog --stop-datetime="2024-04-06 14:30:00" mysql-bin.000001 | mysql
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q145. What is the difference between `WHERE` and `ON` in JOIN condition for filtering?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**For INNER JOIN:** WHERE and ON produce the same result.
**For LEFT JOIN:** WHERE and ON behave differently.

```sql
-- Filter in ON (LEFT JOIN keeps all left rows)
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d
  ON e.dept_id = d.id AND d.dept_name = 'IT';
-- Result: ALL employees. Only matching IT dept names shown.
-- David (no dept) → NULL

-- Filter in WHERE (LEFT JOIN becomes INNER)
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.dept_name = 'IT';
-- Result: ONLY employees in IT. David excluded.
-- Same as INNER JOIN!
```

**Execution order difference:**
```
ON:     Applied during JOIN
WHERE:  Applied AFTER JOIN

LEFT JOIN:
1. ON  determines which right-table rows to match
2. WHERE filters the entire result
```

**When to use each:**
- **ON**: When you want to keep ALL left rows, regardless of match
- **WHERE**: When you want to filter the final result set

**For RIGHT JOIN:** The opposite applies — WHERE filters left-table rows.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q146. How does MySQL handle full-text search and what are the limitations?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

```sql
-- Create full-text index
CREATE TABLE articles (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200),
  body  TEXT,
  FULLTEXT INDEX idx_search (title, body)
) ENGINE=InnoDB;

-- Natural Language Mode (relevance-based)
SELECT title,
  MATCH(title, body) AGAINST('database optimization') AS relevance
FROM articles
WHERE MATCH(title, body) AGAINST('database optimization')
ORDER BY relevance DESC;

-- Boolean Mode (with operators)
SELECT title FROM articles
WHERE MATCH(title, body) AGAINST('+database -nosql' IN BOOLEAN MODE);
-- + : must include
-- - : must exclude
-- ~ : decrease relevance
-- * : wildcard (optimiz* → optimization, optimize)
-- "" : exact phrase

-- Query Expansion (finds related content)
SELECT title FROM articles
WHERE MATCH(title, body) AGAINST('database' WITH QUERY EXPANSION);
```

**Limitations:**
```
1. Minimum word length: 3 (InnoDB) or 4 (MyISAM) characters by default
   → Words like 'cpu', 'ram' might be ignored
   → Change: innodb_ft_min_token_size

2. Stopwords: Common words (the, and, of, to) are ignored
   → Customize: ft_stopword_file

3. 50% threshold: Natural language mode ignores words present in >50% of rows
   → Boolean mode bypasses this

4. No fuzzy/search-as-you-type matching
   → MySQL doesn't support typo tolerance

5. No relevance ranking customization (TF-IDF is internal)

6. Performance degrades with very large text volumes
   → Consider Elasticsearch/Sphinx for advanced search
```

**Alternatives:** Elasticsearch, Meilisearch, Sphinx for production-grade search.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q147. What is the difference between a temporary table and a derived table?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Feature | Derived Table | Temporary Table |
|---------|--------------|-----------------|
| **Scope** | Within a single query | Session-wide |
| **Can have indexes** | ❌ No | ✅ Yes |
| **Reusable** | ❌ One-time use | ✅ Yes (across multiple queries) |
| **Explicit creation** | ❌ No (subquery in FROM) | ✅ `CREATE TEMPORARY TABLE` |
| **Visibility** | Current query only | Current session only |
| **Disk vs memory** | Optimizer decides | Configurable |

```sql
-- Derived table (subquery in FROM)
SELECT dept, avg_salary
FROM (
  SELECT department AS dept, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
) AS derived_table
WHERE avg_salary > 60000;

-- Temporary table
CREATE TEMPORARY TABLE dept_stats AS
SELECT department, AVG(salary) AS avg_salary, COUNT(*) AS cnt
FROM employees
GROUP BY department;

-- Add index for performance
ALTER TABLE dept_stats ADD INDEX idx_dept(department);

-- Reuse in multiple queries
SELECT * FROM dept_stats WHERE cnt > 10;
SELECT * FROM dept_stats WHERE avg_salary > 60000;
-- Also visible to called stored procedures
```

**When to use temporary tables:**
- Complex multi-step data processing
- Need to reuse intermediate results
- Need indexes on intermediate data
- Need to share data across procedure calls within a session

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q148. What is the difference between `IN` and `= ANY`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`IN` and `= ANY` are equivalent in most scenarios. Both check if a value matches any value in a subquery or list.

```sql
-- These are equivalent:
SELECT * FROM employees WHERE dept_id IN (10, 20, 30);
SELECT * FROM employees WHERE dept_id = ANY (VALUES ROW(10), ROW(20), ROW(30));

-- With subqueries:
SELECT * FROM employees WHERE dept_id IN (SELECT id FROM departments WHERE active = 1);
SELECT * FROM employees WHERE dept_id = ANY (SELECT id FROM departments WHERE active = 1);
```

**Subtle differences:**

| Aspect | IN | = ANY |
|--------|----|-------|
| **NULL handling** | Returns empty if subquery contains NULL | Same behavior |
| **Syntax with list** | `IN (1, 2, 3)` ✅ | `= ANY (VALUES ROW(1), ROW(2))` less common |
| **Negative** | `NOT IN` (⚠️ NULL issue) | `<> ALL` or `NOT IN` |
| **Comparison operators** | Only equality | `> ANY`, `< ANY`, `<> ALL` etc. |

**Why use `= ANY`?**
```sql
-- More expressive with other operators:
SELECT * FROM employees
WHERE salary > ANY (SELECT salary FROM employees WHERE department = 'IT');
-- Returns employees earning more than ANY (at least one) IT employee

SELECT * FROM employees
WHERE salary > ALL (SELECT salary FROM employees WHERE department = 'IT');
-- Returns employees earning more than ALL IT employees
```

**Practical difference:** `= ANY` is more commonly used in PostgreSQL. `IN` is more common in MySQL. They're functionally identical for equality checks.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q149. How do you identify and fix slow queries in production?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Step 1: Enable slow query log**
```sql
-- my.cnf
[mysqld]
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2  -- queries taking > 2 seconds
log_queries_not_using_indexes = 1
```

**Step 2: Analyze slow query log**
```bash
mysqldumpslow -s t -t 10 /var/log/mysql/slow.log  # top 10 by time
pt-query-digest /var/log/mysql/slow.log             # Percona Toolkit
```

**Step 3: Profile specific queries**
```sql
EXPLAIN ANALYZE SELECT * FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.created_at > '2024-01-01';
-- Shows actual execution time per step

-- Check current running queries
SHOW FULL PROCESSLIST;
SELECT * FROM performance_schema.events_statements_current\G
```

**Step 4: Common fixes**
```sql
-- ❌ Problem: Full table scan
EXPLAIN SELECT * FROM orders WHERE user_id = 123;
-- type: ALL, rows: 1,000,000

-- ✅ Fix: Add index
CREATE INDEX idx_user_id ON orders(user_id);
-- type: ref, rows: 15

-- ❌ Problem: Filesort for ORDER BY
EXPLAIN SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at;
-- Extra: Using filesort

-- ✅ Fix: Add composite index
CREATE INDEX idx_status_created ON orders(status, created_at);
-- Extra: Using index

-- ❌ Problem: Temporary table
EXPLAIN SELECT DISTINCT user_id, status FROM orders;
-- Extra: Using temporary

-- ✅ Fix: Add covering index
CREATE INDEX idx_user_status ON orders(user_id, status);
```

**Step 5: Monitor repeatedly**
```sql
-- Check buffer pool hit rate
SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_read%';

-- Check thread states
SHOW GLOBAL STATUS LIKE 'Threads_%';
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q150. What are the main differences between MySQL and PostgreSQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Feature | MySQL | PostgreSQL |
|---------|-------|-----------|
| **License** | Oracle (dual license) | Open source (PostgreSQL license) |
| **ACID compliance** | ✅ (InnoDB) | ✅ (fully) |
| **SQL standards** | Partial | Excellent (closer to SQL standard) |
| **JSON support** | ✅ JSON column | ✅ JSONB (binary, indexed) |
| **Full-text search** | ✅ Basic | ✅ Better (tsvector/tsquery) |
| **Index types** | B-Tree, Hash, Full-Text, Spatial | B-Tree, Hash, GiST, GIN, SP-GiST, BRIN |
| **Window functions** | ✅ (8.0+) | ✅ (Excellent) |
| **CTE/Recursive CTE** | ✅ (8.0+) | ✅ (Excellent) |
| **Materialized views** | ❌ (emulated) | ✅ Native |
| **Partial indexes** | ❌ | ✅ `CREATE INDEX ... WHERE condition` |
| **Concurrent indexes** | ❌ (blocks writes) | ✅ `CREATE INDEX CONCURRENTLY` |
| **Replication** | Async, semi-sync, group | Streaming, logical, cascading |
| **Partitioning** | ✅ (range, list, hash) | ✅ (range, list, hash) |
| **VACUUM** | ❌ Not needed | ✅ Required (MVCC cleanup) |
| **Performance** | Fast reads | Fast complex queries |
| **Use case** | Web apps, read-heavy | Complex queries, data integrity |

**When to choose MySQL:**
- Simple read-heavy web applications
- LAMP stack (PHP integration)
- Replication for read scaling
- Ease of setup and management

**When to choose PostgreSQL:**
- Complex queries and analytics
- Need advanced indexing (GIN, GiST)
- JSONB document storage
- Data integrity and SQL compliance
- GIS/spatial data (PostGIS)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q151. How does connection pooling work in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Connection pooling** reuses database connections instead of creating a new connection for each request. This reduces overhead significantly.

**Without pooling:**
```
Request 1 → Open TCP connection → Auth → Query → Close connection
Request 2 → Open TCP connection → Auth → Query → Close connection
Request 3 → Open TCP connection → Auth → Query → Close connection
```

**With pooling:**
```
[Connection Pool] — 10 pre-opened connections
     ↓
Request 1 → Get connection from pool → Query → Return to pool
Request 2 → Get connection from pool → Query → Return to pool
Request 3 → Get connection from pool → Query → Return to pool
```

**Pool implementations:**
```javascript
// Node.js (mysql2 with pool)
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company_db',
  waitForConnections: true,    // queue requests when pool is full
  connectionLimit: 10,         // max simultaneous connections
  queueLimit: 0,               // unlimited queue
  idleTimeout: 60000,          // close idle connections after 60s
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Use the pool
const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
```

**Optimal pool size:**
```
Rule of thumb: (CPU cores × 2) + disk spindles
Example: 8 cores + 1 disk → 17 connections

Too many connections causes:
- Context switching overhead
- Memory pressure
- Database contention (locking)
```

**MySQL-side configuration:**
```sql
SHOW VARIABLES LIKE 'max_connections';  -- default 151
SHOW VARIABLES LIKE 'wait_timeout';     -- default 28800 (8 hours)
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Aborted_connects';
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q152. What is the N+1 problem and how do ORMs handle it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **N+1 query problem** happens when:
1. You run 1 query to get N parent records
2. Then N additional queries to get related child records for each parent

**Total: N+1 queries (very inefficient!)**

```sql
-- ❌ N+1 in raw SQL
-- Query 1: Get 100 orders
SELECT * FROM orders LIMIT 100;

-- Queries 2-101: Get user for EACH order (100 separate queries!)
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id = 2;
-- ... 98 more times

-- ✅ Fix with JOIN
SELECT o.*, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
LIMIT 100;
-- 1 query instead of 101!
```

**In ORMs (eager loading vs lazy loading):**
```javascript
// ❌ Lazy loading (N+1 in ORM)
const orders = await Order.findAll();
for (const order of orders) {
  const user = await order.getUser();  // N queries!
  console.log(user.name);
}

// ✅ Eager loading (solves N+1)
const orders = await Order.findAll({
  include: [{ model: User, as: 'user' }]  // 1 JOIN query
});
for (const order of orders) {
  console.log(order.user.name);
}
```

**How different ORMs handle it:**
| ORM | Eager Loading | Syntax |
|-----|--------------|--------|
| Rails ActiveRecord | `includes(:user)` | Preloads associations |
| Laravel Eloquent | `with('user')` | Eager loading |
| Sequelize (Node.js) | `include: [User]` | Join-based |
| Hibernate (Java) | `JOIN FETCH` | Fetch join |
| SQLAlchemy (Python) | `joinedload(User)` | Eager loading |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q153. How do you implement row-level security in MySQL?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

MySQL doesn't have native row-level security (RLS) like PostgreSQL. Here are workarounds:

**Method 1: Views (simplest)**
```sql
-- Let each manager see only their team
CREATE VIEW my_team AS
SELECT *
FROM employees
WHERE manager_id = (
  SELECT id FROM employees WHERE email = CURRENT_USER()
);
-- Grant access to view, not underlying table
GRANT SELECT ON my_team TO 'manager'@'localhost';
```

**Method 2: Application-enforced (most common)**
```sql
-- Add tenant_id to every table
CREATE TABLE orders (
  id        INT PRIMARY KEY,
  tenant_id INT NOT NULL,
  user_id   INT,
  amount    DECIMAL(10,2)
);
CREATE INDEX idx_tenant ON orders(tenant_id);

-- Application always filters by tenant:
SELECT * FROM orders WHERE tenant_id = ?;

-- RLS via stored procedures
DELIMITER //
CREATE PROCEDURE GetMyOrders(IN user_id INT)
BEGIN
  SELECT * FROM orders WHERE user_id = user_id;
END //
DELIMITER ;
GRANT EXECUTE ON PROCEDURE GetMyOrders TO 'app_user'@'localhost';
```

**Method 3: Stored procedures with session variables**
```sql
-- Set user context at login
CREATE PROCEDURE SetUserContext(IN user_id INT)
BEGIN
  SET @current_user_id = user_id;
  SET @current_role = (SELECT role FROM users WHERE id = user_id);
END;

-- Procedure that uses the session context
CREATE PROCEDURE GetSecureData()
BEGIN
  IF @current_role = 'admin' THEN
    SELECT * FROM sensitive_data;
  ELSE
    SELECT * FROM sensitive_data WHERE user_id = @current_user_id;
  END IF;
END;
```

**Recommendation:** For most applications, application-level filtering is simpler and more maintainable than database-level RLS.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q154. What is the difference between `STRAIGHT_JOIN` and regular `JOIN`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**STRAIGHT_JOIN** forces MySQL to read tables in the order specified in the query, bypassing the optimizer's join order optimization.

```sql
-- Regular JOIN: optimizer chooses join order
SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;
-- MySQL may read departments first if it estimates better performance

-- STRAIGHT_JOIN: force exact join order (left table first)
SELECT e.name, d.dept_name
FROM employees e
STRAIGHT_JOIN departments d ON e.dept_id = d.id;
-- Forces: employees first, then departments
```

**When to use STRAIGHT_JOIN:**
```sql
-- When the optimizer consistently chooses a bad join order
-- Check with EXPLAIN:
EXPLAIN SELECT e.*, o.*
FROM orders o
JOIN employees e ON o.employee_id = e.id
WHERE e.department = 'IT';
-- If optimizer reads orders first (big table) and employees second (filtered),
-- but employees is more selective, STRAIGHT_JOIN helps:

EXPLAIN SELECT STRAIGHT_JOIN e.*, o.*
FROM employees e
JOIN orders o ON o.employee_id = e.id
WHERE e.department = 'IT';
```

**Important notes:**
- Only use when you've proven the optimizer is wrong (uncommon in modern MySQL)
- Test with and without on production data
- May become obsolete with optimizer improvements after version upgrades
- For SELECT only (not INSERT/UPDATE/DELETE)

**Better alternatives:** Index optimization, query hints (`USE INDEX`, `FORCE INDEX`)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q155. How do you design a database for multi-tenancy?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Multi-tenancy** means a single application instance serves multiple customers (tenants). There are three main approaches:

**1. Separate Database (highest isolation):**
```sql
-- Each tenant gets their own database
-- tenant_1_db: orders, users, products
-- tenant_2_db: orders, users, products
-- tenant_3_db: orders, users, products

✅ Pros: Strong isolation, easy backup per tenant
✅ Pros: Can scale individual tenants
❌ Cons: More connections, schema changes on all databases
❌ Cons: Cross-tenant queries impossible
```

**2. Separate Schema (shared server):**
```sql
-- Each tenant gets their own schema
-- CREATE SCHEMA tenant_1;
-- CREATE SCHEMA tenant_2;

SET search_path TO tenant_1;
SELECT * FROM orders;  -- queries tenant_1.orders

✅ Pros: Good isolation, standard SQL
✅ Pros: Easier schema updates
❌ Cons: Server resource limits
```

**3. Shared Table (all tenants in same tables):**
```sql
CREATE TABLE orders (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  tenant_id INT NOT NULL,          -- tenant discriminator
  user_id   INT,
  amount    DECIMAL(10,2),
  INDEX idx_tenant_id (tenant_id)  -- critical!
);

-- Every query MUST filter by tenant!
SELECT * FROM orders WHERE tenant_id = ?;
```

**Comparison:**
| Factor | Separate DB | Separate Schema | Shared Table |
|--------|------------|----------------|--------------|
| Isolation | ✅ Best | ✅ Good | ❌ Least |
| Cost | ❌ High | Medium | ✅ Low |
| Scalability | ✅ Best | ✅ Good | ❌ Needs indexes |
| Backup/restore per tenant | ✅ Easy | ✅ Easy | ❌ Complex |
| Schema changes | ❌ Apply to all | ✅ Apply per tenant | ✅ One change |
| Cross-tenant queries | ❌ No | ❌ Hard | ✅ Possible |
| Max tenants | Hundreds | Thousands | Millions |

**Recommendation:** Start with shared table (simplest). Add tenant_id to every table and every query. Move to separate schemas/databases when isolation requires it.

</div>
</details>
---

> 💪 **Good luck with your interviews!**
>
> **Core topics to master:** JOINs · Indexes · ACID · Window Functions · Normalization · Query Optimization
>
> Practice writing queries from scratch without copy-paste — interviewers love seeing you think through problems live.
