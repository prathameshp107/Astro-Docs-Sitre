---
title: "Triggers"
description: "DELIMITER $$"
sort: 23
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