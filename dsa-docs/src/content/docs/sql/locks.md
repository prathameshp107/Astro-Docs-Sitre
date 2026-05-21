---
title: "Locks"
description: "TABLE-LEVEL LOCK (MyISAM / InnoDB DDL) ├── READ LOCK → all sessions can read, no writes └── WRITE LOCK → only lock holder can read/write"
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