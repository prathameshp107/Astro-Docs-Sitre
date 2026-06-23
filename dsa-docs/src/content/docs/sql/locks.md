---
title: "Locks"
description: "TABLE-LEVEL LOCK (MyISAM / InnoDB DDL) ├── READ LOCK → all sessions can read, no writes └── WRITE LOCK → only lock holder can read/write"
sidebar:
  order: 20
---

## 10. Locks

### Lock Types

```mermaid
flowchart TB
    subgraph RowLock[ROW-LEVEL LOCKS — InnoDB]
        S["Shared Lock (S)<br/>🔍 READ lock<br/>Multiple readers allowed"]
        X["Exclusive Lock (X)<br/>✏️ WRITE lock<br/>Only one writer, no readers"]
        I["Intention Lock<br/>🔮 Signals intent to lock rows"]
    end
    
    subgraph TableLock[TABLE-LEVEL LOCKS — MyISAM / DDL]
        R["READ LOCK<br/>📖 All can read,<br/>no writes allowed"]
        W["WRITE LOCK<br/>🔒 Only lock holder<br/>can read/write"]
        U["UNLOCK TABLES<br/>🔓 Release all locks"]
    end
    
    style S fill:#3b82f6,color:#fff
    style X fill:#ef4444,color:#fff
    style I fill:#f59e0b,color:#fff
    style R fill:#059669,color:#fff
    style W fill:#7c3aed,color:#fff
    style U fill:#10b981,color:#fff
```

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

> 📖 **Deadlocks are covered in detail on the [Isolation Levels & Deadlocks page →](/DSA-Notes-Problems/sql/isolation-levels-and-deadlocks)**

---