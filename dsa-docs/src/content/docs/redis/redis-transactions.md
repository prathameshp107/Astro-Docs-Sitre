---
title: "Redis Transactions"
description: "A Redis transaction ensures a group of commands executes atomically — either all commands run, or none do (in case of a DISCARD). No other client can inter"
---

## 14. Redis Transactions

### What is a Redis Transaction?

A Redis transaction ensures a **group of commands executes atomically** — either all commands run, or none do (in case of a DISCARD). No other client can interrupt the sequence.

### MULTI / EXEC / DISCARD Flow

```mermaid
flowchart TB
    Start[Client sends commands] --> Check{Want atomic<br/>execution?}
    Check -->|Yes| MULTI["MULTI<br/>Begin transaction"]
    Check -->|No| Direct["Run commands directly<br/>(not atomic)"]
    
    MULTI --> Queue["Queue commands<br/>SET balance:alice 500<br/>DECRBY balance:alice 100<br/>INCRBY balance:bob 100"]
    Queue --> Decision{Ready to<br/>execute?}
    Decision -->|Yes ✅| EXEC["EXEC<br/>All commands run atomically<br/>No other client can interrupt"]
    Decision -->|No ❌| DISCARD["DISCARD<br/>Queued commands thrown away<br/>Nothing happens"]
    
    subgraph Optimistic[Optimistic Locking with WATCH]
        Watch["WATCH balance:alice<br/>Monitor key for changes"] --> MULTI2[MULTI]
        MULTI2 --> Queue2[DECRBY balance:alice 200]
        Queue2 --> EXEC2{EXEC}
        EXEC2 -->|Key unchanged ✅| Success[Transaction succeeds]
        EXEC2 -->|Key changed by another client ❌| Fail[EXEC returns nil<br/>Retry the transaction]
    end
    
    style Start fill:#3b82f6,color:#fff
    style Check fill:#f59e0b,color:#fff
    style MULTI fill:#7c3aed,color:#fff
    style Queue fill:#3b82f6,color:#fff
    style Decision fill:#f59e0b,color:#fff
    style EXEC fill:#059669,color:#fff
    style DISCARD fill:#ef4444,color:#fff
    style Optimistic fill:#ec4899,color:#fff
    style Success fill:#059669,color:#fff
    style Fail fill:#ef4444,color:#fff
```

---

### MULTI / EXEC / DISCARD

```bash
# Begin transaction
MULTI

# Queue commands (they don't execute yet)
SET balance:alice 500
SET balance:bob 300
DECRBY balance:alice 100
INCRBY balance:bob 100

# Execute all queued commands atomically
EXEC
# Output:
# 1) OK
# 2) OK
# 3) (integer) 400
# 4) (integer) 400

# To cancel a transaction before EXEC
MULTI
SET key "value"
DISCARD   # All queued commands are thrown away
```

---

### WATCH — Optimistic Locking

`WATCH` monitors keys for changes. If a watched key is modified by another client before `EXEC`, the transaction is aborted (returns nil).

```bash
# Watch the balance key
WATCH balance:alice

# Begin transaction
MULTI

# Queue operations
DECRBY balance:alice 200

# EXEC will fail (return nil) if balance:alice was changed by another client
EXEC
# If successful: returns array of results
# If watched key changed: returns nil → retry the transaction
```

---

### Important Notes

> **Note:** Redis transactions are NOT like database transactions. They do not support rollbacks on runtime errors. If one command fails during EXEC (e.g., wrong type), other commands still run.

| Concept | Redis Transactions | SQL Transactions |
|---|---|---|
| Atomicity | Commands execute as a group | Full ACID atomicity |
| Rollback on error | No | Yes |
| Isolation | No other client interrupts | Yes |
| Durability | Depends on persistence config | Yes |

---
