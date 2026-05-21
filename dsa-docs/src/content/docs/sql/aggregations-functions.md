---
title: "Aggregations & Functions"
description: "-- GROUP BY SELECT deptid, COUNT(), AVG(salary) FROM employees GROUP BY deptid;"
sidebar:
  order: 24
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