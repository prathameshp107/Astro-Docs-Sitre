---
title: "Stored Procedures & Functions"
description: "CREATE PROCEDURE giveraise( IN deptnameparam VARCHAR(100), IN raisepercent DECIMAL(5,2), OUT affectedrows INT ) BEGIN DECLARE deptidval INT;"
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