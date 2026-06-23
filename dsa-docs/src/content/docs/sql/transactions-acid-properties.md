---
title: "Transactions & ACID Properties"
description: "UPDATE accounts SET balance = balance - 500 WHERE id = 1; -- debit UPDATE accounts SET balance = balance + 500 WHERE id = 2; -- credit"
sidebar:
  order: 19
---

## 9. Transactions & ACID Properties

> 📖 **Isolation levels and deadlocks are covered in detail on the [Isolation Levels & Deadlocks page →](/DSA-Notes-Problems/sql/isolation-levels-and-deadlocks)**

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

```mermaid
flowchart TB
    subgraph ACID[ACID Properties]
        A["ATOMICITY<br/>All or nothing<br/>✅ Commit or ❌ Rollback"]
        C["CONSISTENCY<br/>Valid state to valid state<br/>✅ Rules & constraints respected"]
        I["ISOLATION<br/>No interference between txns<br/>✅ Invisible intermediate state"]
        D["DURABILITY<br/>Persists after commit<br/>✅ Survives crashes (WAL)"]
    end
    
    Transaction[START TRANSACTION] --> A
    A --> C
    C --> I
    I --> D
    D --> COMMIT
    
    style A fill:#7c3aed,color:#fff
    style C fill:#3b82f6,color:#fff
    style I fill:#059669,color:#fff
    style D fill:#f59e0b,color:#fff
```

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

> 📖 **Isolation levels, anomalies, and deadlocks are now on the dedicated [Isolation Levels & Deadlocks page →](/DSA-Notes-Problems/sql/isolation-levels-and-deadlocks)**

---