---
title: "Indexing"
description: "Without an index, MongoDB does a Collection Scan — it reads every document to find matching ones. This is fine for small collections but becomes catastroph"
sort: 4
---

## 4. Indexing

### 4.1 What is an Index and Why Does It Matter?

Without an index, MongoDB does a **Collection Scan** — it reads **every document** to find matching ones. This is fine for small collections but becomes catastrophically slow for millions of records.

```
Without Index (Collection Scan):
[doc1][doc2][doc3][doc4]...[doc999999][doc1000000]
  ↑ check every single document → O(n) time

With Index (B-Tree lookup):
                [root]
              /        \
          [A-M]        [N-Z]
         /     \       /   \
      [A-F] [G-M] [N-S] [T-Z]
         → jump directly to result → O(log n) time
```

**Real impact example:**
```
Collection: 1,000,000 documents
Query: db.users.find({ email: "alice@example.com" })

Without index: scans 1,000,000 docs → ~500ms
With index:    finds directly       → ~1ms
```

---

### 4.2 Creating Indexes

**Single Field Index:**

```js
// Create ascending index on email
db.users.createIndex({ email: 1 })

// Create descending index on createdAt (latest first searches)
db.users.createIndex({ createdAt: -1 })

// Unique index (prevents duplicate emails)
db.users.createIndex({ email: 1 }, { unique: true })

// Sparse index (only indexes docs where field exists)
db.users.createIndex({ phone: 1 }, { sparse: true })

// TTL Index — auto-delete documents after N seconds
// (e.g., expire sessions after 1 hour)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

---

### 4.3 Compound Index

An index on **multiple fields together**. Order matters!

```js
// Index on category + price (for category-filtered price sorting)
db.products.createIndex({ category: 1, price: 1 })

// Index on userId + createdAt (for user's timeline queries)
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Index on status + assignedTo + dueDate (for task queries)
db.tasks.createIndex({ status: 1, assignedTo: 1, dueDate: 1 })
```

**How compound indexes work (ESR Rule):**

```
ESR Rule: Equality → Sort → Range

Query: Find active users, sorted by name, age between 20-30

Best index: { isActive: 1, name: 1, age: 1 }
             ─────────    ───────  ─────────
             Equality     Sort     Range
```

**Prefix rule — a compound index can serve multiple queries:**

```js
// Index: { userId: 1, status: 1, createdAt: -1 }

// ✅ These queries CAN use the index:
db.orders.find({ userId: ObjectId("u1") })
db.orders.find({ userId: ObjectId("u1"), status: "pending" })
db.orders.find({ userId: ObjectId("u1"), status: "pending" }).sort({ createdAt: -1 })

// ❌ This query CANNOT use the index (doesn't start with userId):
db.orders.find({ status: "pending" })
```

---

### 4.4 Text Index

For **full-text search** across string fields.

```js
// Create text index on product name and description
db.products.createIndex({ name: "text", description: "text" })

// Only one text index per collection
// Assign weights (name is 3x more important than description)
db.products.createIndex(
  { name: "text", description: "text" },
  { weights: { name: 3, description: 1 } }
)

// Search using text index
db.products.find({ $text: { $search: "wireless bluetooth" } })

// Search for exact phrase
db.products.find({ $text: { $search: "\"noise cancelling\"" } })

// Exclude a word
db.products.find({ $text: { $search: "laptop -gaming" } })

// Sort by relevance score
db.products.find(
  { $text: { $search: "wireless mouse" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

---

### 4.5 Managing Indexes

```js
// List all indexes on a collection
db.users.getIndexes()

// Check if a query is using an index (VERY USEFUL for debugging)
db.users.find({ email: "alice@example.com" }).explain("executionStats")
// Look for: "IXSCAN" (index scan) = good, "COLLSCAN" (collection scan) = bad

// Drop a specific index
db.users.dropIndex({ email: 1 })
db.users.dropIndex("email_1")  // by index name

// Drop all indexes (except _id)
db.users.dropIndexes()
```

---

### 4.6 Index Performance Best Practices

```
✅ DO:
  - Index fields used in WHERE, SORT, and JOIN ($lookup) clauses
  - Use compound indexes that match your most common query patterns
  - Use unique indexes to enforce data integrity
  - Monitor with explain() to verify index usage

❌ DON'T:
  - Index every field — each index slows down WRITES (insert/update/delete)
  - Index low-cardinality fields (boolean, gender) — not selective enough
  - Create redundant indexes (e.g., {a:1} and {a:1,b:1} — first is prefix of second)

Rule of thumb:
  Every index you add:
  - Speeds up READS by that indexed query
  - Slows down ALL WRITES (because indexes must be updated)
  - Uses extra disk/memory space
```

---