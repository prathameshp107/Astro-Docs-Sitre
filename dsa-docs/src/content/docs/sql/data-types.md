---
title: "Data Types"
description: "Interview Tip: Use TIMESTAMP for audit fields (createdat, updatedat) — it auto-converts to server timezone. Use DATETIME when timezone-independence is nee"
sort: 3
---

## 3. Data Types

### Numeric Types

```sql
TINYINT      -- 1 byte,  range: -128 to 127
SMALLINT     -- 2 bytes, range: -32,768 to 32,767
MEDIUMINT    -- 3 bytes
INT          -- 4 bytes, range: ~-2B to 2B
BIGINT       -- 8 bytes
FLOAT(p)     -- Approximate decimal (4 or 8 bytes)
DOUBLE       -- Double precision float
DECIMAL(M,D) -- Exact decimal → use for money! (e.g., DECIMAL(10,2))
```

### String Types

```sql
CHAR(n)      -- Fixed length, max 255  → fast for fixed-size data (e.g., country code)
VARCHAR(n)   -- Variable length, max 65,535 → most common
TEXT         -- Up to 65,535 chars (no default, not indexable fully)
MEDIUMTEXT   -- Up to 16 MB
LONGTEXT     -- Up to 4 GB
ENUM('a','b')-- One value from a list → stored as integer internally
SET('a','b') -- Multiple values from a list
```

### Date & Time Types

```sql
DATE         -- YYYY-MM-DD
TIME         -- HH:MM:SS
DATETIME     -- YYYY-MM-DD HH:MM:SS  (no timezone)
TIMESTAMP    -- YYYY-MM-DD HH:MM:SS  (stores UTC, auto-converts timezone)
YEAR         -- YYYY
```

> **Interview Tip:** Use `TIMESTAMP` for audit fields (`created_at`, `updated_at`) — it auto-converts to server timezone. Use `DATETIME` when timezone-independence is needed.

### Binary Types

```sql
BINARY(n)    -- Fixed-length binary
VARBINARY(n) -- Variable-length binary
BLOB         -- Binary large object (images, files)
```

---