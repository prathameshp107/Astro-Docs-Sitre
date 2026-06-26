---
title: "JSON & Full-Text Search"
description: "MySQL's JSON column type and FULLTEXT indexes — storing documents and searching text efficiently, explained simply."
sidebar:
  order: 39
---

## JSON & Full-Text Search

MySQL supports **JSON columns** (store structured data) and **FULLTEXT indexes** (search text efficiently). Two powerful features for modern apps.

### Real-World Analogy

Think of a **shipping package**:

- **JSON column**: Like a box where you can put anything — labels, fragile stickers, instructions. You don't need a separate shelf for every possible item.
- **FULLTEXT index**: Like having an index at the back of a book. Instead of reading every page, you jump directly to pages containing "MongoDB".

### JSON Columns

```sql
-- Create a table with a JSON column
CREATE TABLE products (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100),
    price       DECIMAL(10,2),
    attributes  JSON,  -- flexible, store any extra fields
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert JSON data
INSERT INTO products (name, price, attributes) VALUES
    ('Laptop Pro', 1499.99, '{
        "color": "Space Gray",
        "ram": "16GB",
        "storage": "512GB SSD",
        "ports": ["USB-C", "HDMI"],
        "weight_kg": 1.8,
        "in_stock": true
    }'),
    ('Wireless Mouse', 49.99, '{
        "color": "White",
        "connection": "Bluetooth 5.0",
        "battery_life": "12 months",
        "ergonomic": true
    }');
```

### Querying JSON Data

```sql
-- Access JSON fields with arrow operators
SELECT
    name,
    attributes->>'$.color' AS color,
    attributes->>'$.ram' AS ram
FROM products
WHERE attributes->>'$.color' = 'Space Gray';

-- JSON path expressions
SELECT * FROM products
WHERE JSON_EXTRACT(attributes, '$.storage') = '512GB SSD';

-- Check if a path exists
SELECT * FROM products
WHERE JSON_CONTAINS_PATH(attributes, 'one', '$.ports');

-- Search within JSON arrays
SELECT * FROM products
WHERE JSON_SEARCH(attributes, 'one', 'USB-C');

-- Check JSON type
SELECT JSON_TYPE('"hello"');   -- STRING
SELECT JSON_TYPE('123');        -- INTEGER
SELECT JSON_TYPE('true');       -- BOOLEAN
```

### Modifying JSON Data

```sql
-- Update a JSON field
UPDATE products
SET attributes = JSON_SET(attributes, '$.color', 'Silver')
WHERE id = 1;

-- Add a new JSON field (only if not exists)
UPDATE products
SET attributes = JSON_INSERT(attributes, '$.warranty', '2 years')
WHERE id = 1;

-- Remove a JSON field
UPDATE products
SET attributes = JSON_REMOVE(attributes, '$.ports')
WHERE id = 1;

-- Array operations
UPDATE products
SET attributes = JSON_ARRAY_APPEND(attributes, '$.ports', 'Thunderbolt 4')
WHERE id = 1;
```

### When to Use JSON Columns

```text
✅ Good use cases:
   - Storing flexible metadata / custom fields
   - Product attributes that vary by category
   - User preferences / settings
   - API response caching
   - Event logs / audit data

❌ Avoid when:
   - You need to query JSON fields frequently (use normal columns)
   - You need foreign key / referential integrity
   - You need indexes on JSON fields (it's possible but limited)
   - The data has a fixed schema (use regular columns)
```

### FULLTEXT Search

```sql
-- Create a FULLTEXT index
CREATE TABLE articles (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200),
    body        TEXT,
    FULLTEXT (title, body)  -- combined text index
);

-- Natural language search (default)
SELECT * FROM articles
WHERE MATCH(title, body) AGAINST('database optimization');

-- Boolean mode (include/exclude terms)
SELECT * FROM articles
WHERE MATCH(title, body) AGAINST('database -mysql' IN BOOLEAN MODE);
-- Finds articles with "database" but NOT "mysql"

-- Search with wildcard
SELECT * FROM articles
WHERE MATCH(title, body) AGAINST('optim*' IN BOOLEAN MODE);
-- Matches: optimization, optimize, optimal...

-- Exact phrase
SELECT * FROM articles
WHERE MATCH(title, body) AGAINST('"query optimization"' IN BOOLEAN MODE);
```

### FULLTEXT vs LIKE

```sql
-- ❌ Slow: LIKE with leading wildcard (cannot use index)
SELECT * FROM articles WHERE body LIKE '%optimization%';

-- ✅ Fast: FULLTEXT search (uses FULLTEXT index)
SELECT * FROM articles
WHERE MATCH(body) AGAINST('optimization');

-- Comparison:
-- LIKE '%word%' → Full table scan (scans every row)
-- MATCH...AGAINST → Uses FULLTEXT index (fast)
```

### FULLTEXT Configuration

```sql
-- Check minimum word length (default 3 for InnoDB)
SHOW VARIABLES LIKE 'ft_min_word_len';

-- Check stop words (common words like "the", "and" that are ignored)
SHOW VARIABLES LIKE 'ft_stopword_file';

-- Set minimum word length (in my.cnf)
-- [mysqld]
-- ft_min_word_len=2
-- Then rebuild indexes:
-- REPAIR TABLE articles QUICK;
```

### Hybrid Example: JSON + FULLTEXT

```sql
-- Products with JSON attributes + full-text name search
SELECT name, price, attributes->>'$.color' AS color
FROM products
WHERE MATCH(name) AGAINST('laptop')
  AND attributes->>'$.ram' LIKE '%16GB%';
```

---

### In Simple Words

- **JSON columns** let you store flexible, schema-less data inside MySQL — great for varying attributes
- Use `->>` to extract JSON values; use `JSON_SET`, `JSON_REMOVE` to modify
- **FULLTEXT indexes** enable fast text search — much faster than `LIKE '%word%'`
- `MATCH...AGAINST` is the syntax for FULLTEXT queries
- Use JSON for flexible data; use FULLTEXT for text-heavy searches
