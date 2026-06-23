---
title: "Users & Privileges"
description: "Managing MySQL users, GRANT/REVOKE privileges, roles, and the principle of least privilege — explained simply."
sidebar:
  order: 35
---

## Users & Privileges

MySQL uses a **role-based access control (RBAC)** system. Every connection needs a user account, and each user has specific **privileges** (permissions).

### Real-World Analogy

Think of a **company building with different access levels**:

| User | Badge | Can Access |
|------|-------|-----------|
| **App User** | Employee badge | Only the main floor (app database) |
| **Developer** | Tech badge | Server room (read + write code) |
| **Admin** | Master key | Everything — including the vault |
| **Read-only User** | Visitor pass | Only the lobby (SELECT only) |

### Creating Users

```sql
-- Create a user (MySQL 8+)
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password_123';

-- Create a user that can connect from any host
CREATE USER 'app_user'@'%' IDENTIFIED BY 'secure_password_123';

-- Create a user with specific auth plugin
CREATE USER 'app_user'@'localhost'
IDENTIFIED WITH mysql_native_password BY 'password';

-- View existing users
SELECT user, host, plugin FROM mysql.user;
```

### Granting Privileges

```sql
-- Grant specific privileges on a specific table
GRANT SELECT, INSERT, UPDATE ON company_db.employees TO 'app_user'@'localhost';

-- Grant on ALL tables in a database
GRANT SELECT, INSERT, UPDATE, DELETE ON company_db.* TO 'app_user'@'localhost';

-- Grant ALL privileges on a database
GRANT ALL PRIVILEGES ON company_db.* TO 'developer'@'localhost';

-- Grant global privileges (across all databases)
GRANT CREATE, DROP ON *.* TO 'admin'@'localhost';

-- Grant SELECT only (read-only user)
GRANT SELECT ON company_db.* TO 'readonly_user'@'%';

-- Always apply changes
FLUSH PRIVILEGES;
```

### Common Privileges

| Privilege | What It Allows |
|-----------|---------------|
| `SELECT` | Read data from tables |
| `INSERT` | Add new rows |
| `UPDATE` | Modify existing rows |
| `DELETE` | Remove rows |
| `CREATE` | Create databases/tables |
| `DROP` | Delete databases/tables |
| `ALTER` | Modify table structure |
| `INDEX` | Create/drop indexes |
| `EXECUTE` | Run stored procedures |
| `ALL PRIVILEGES` | Everything |

### Principle of Least Privilege

```sql
-- ❌ Too much: app user doesn't need DROP/CREATE
GRANT ALL PRIVILEGES ON company_db.* TO 'app_user'@'localhost';

-- ✅ Correct: only what the app needs
GRANT SELECT, INSERT, UPDATE, DELETE ON company_db.* TO 'app_user'@'localhost';
```

### Revoking Privileges

```sql
-- Revoke specific privilege
REVOKE DELETE ON company_db.* FROM 'app_user'@'localhost';

-- Revoke all privileges
REVOKE ALL PRIVILEGES ON company_db.* FROM 'app_user'@'localhost';

-- Check what privileges a user has
SHOW GRANTS FOR 'app_user'@'localhost';
```

### Roles (MySQL 8+)

Roles make it easier to manage permissions for groups of users.

```sql
-- Create a role
CREATE ROLE 'read_only', 'read_write', 'admin_role';

-- Grant privileges to the role
GRANT SELECT ON company_db.* TO 'read_only';
GRANT SELECT, INSERT, UPDATE, DELETE ON company_db.* TO 'read_write';
GRANT ALL PRIVILEGES ON company_db.* TO 'admin_role';

-- Assign role to users
GRANT 'read_only' TO 'reporting_user'@'localhost';
GRANT 'read_write' TO 'app_user'@'localhost';

-- Set default role (auto-activated on login)
SET DEFAULT ROLE 'read_write' TO 'app_user'@'localhost';

-- Activate role manually
SET ROLE 'read_only';

-- View current roles
SELECT CURRENT_ROLE();
```

### Viewing and Managing Privileges

```sql
-- Show all users
SELECT User, Host FROM mysql.user;

-- Show grants for current user
SHOW GRANTS;

-- Show grants for specific user
SHOW GRANTS FOR 'app_user'@'localhost';

-- Drop a user
DROP USER 'old_user'@'localhost';
```

### Security Best Practices

```text
✅ Use strong passwords (12+ chars, mixed case, numbers, symbols)
✅ Create separate users for each application
✅ Grant minimum necessary privileges (least privilege)
✅ Use roles to manage permissions consistently
✅ Regularly audit user privileges
✅ Remove unused accounts

❌ Never use root for applications
❌ Don't grant ALL PRIVILEGES to app users
❌ Avoid using '%' host (allow from any host) when possible
```

---

### In Simple Words

- **Users** are accounts that connect to MySQL; **privileges** are what they can do
- **GRANT** gives permissions; **REVOKE** takes them away
- **Least privilege** = give users only the permissions they absolutely need
- **Roles** (MySQL 8+) let you group privileges and assign them to many users at once
- Always use `FLUSH PRIVILEGES` after changing grants
