---
title: "CRUD Operations"
description: "USE companydb;"
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