---
title: "Advanced Topics"
description: "Transactions ensure multiple operations either all succeed or all fail (ACID compliance). Requires a Replica Set or Sharded Cluster (not standalone)."
sort: 7
---

## 7. Advanced Topics

### 7.1 Transactions

Transactions ensure **multiple operations either all succeed or all fail** (ACID compliance). Requires a Replica Set or Sharded Cluster (not standalone).

```
Without Transaction:              With Transaction:
debit account A  ✅               START TRANSACTION
credit account B ❌ FAILS          debit account A  ✅
→ Money lost! Inconsistent        credit account B ❌ FAILS
                                  ROLLBACK → both undone ✅
                                  No money lost. Consistent.
```

```js
// Transaction example: Transfer money between accounts
const transferMoney = async (fromId, toId, amount) => {
  const session = await mongoose.startSession();

  try {
    // Start transaction
    session.startTransaction();

    // Find source account
    const fromAccount = await Account.findById(fromId).session(session);

    if (!fromAccount || fromAccount.balance < amount) {
      throw new Error('Insufficient funds');
    }

    // Debit source
    await Account.findByIdAndUpdate(
      fromId,
      { $inc: { balance: -amount } },
      { session }   // pass session to all operations!
    );

    // Credit destination
    await Account.findByIdAndUpdate(
      toId,
      { $inc: { balance: +amount } },
      { session }
    );

    // Create transaction record
    await Transaction.create([{
      from: fromId,
      to: toId,
      amount,
      status: 'success',
      timestamp: new Date()
    }], { session });

    // Commit if all succeeded
    await session.commitTransaction();
    console.log('✅ Transfer successful');

  } catch (error) {
    // Rollback everything on any error
    await session.abortTransaction();
    console.error('❌ Transfer failed, rolled back:', error.message);
    throw error;

  } finally {
    // Always end the session
    session.endSession();
  }
};
```

---

### 7.2 Replica Sets

A Replica Set is a **group of MongoDB servers** that maintain the same data — providing high availability and automatic failover.

```
Replica Set Architecture:

  ┌─────────────────────────────────────────┐
  │                Replica Set              │
  │                                         │
  │   PRIMARY         SECONDARY  SECONDARY  │
  │   ┌───────┐       ┌───────┐  ┌───────┐  │
  │   │ node1 │──────▶│ node2 │  │ node3 │  │
  │   │(write)│  repl │(read) │  │(read) │  │
  │   └───────┘       └───────┘  └───────┘  │
  │       ↑                                  │
  │  Client writes                           │
  │                                          │
  │  If PRIMARY fails → election happens    │
  │  → one SECONDARY becomes new PRIMARY    │
  └─────────────────────────────────────────┘
```

**Key points:**
- All writes go to the **Primary**
- Reads can go to Primary or Secondaries (configurable)
- If Primary fails, Secondaries **elect a new Primary** automatically
- Minimum 3 nodes recommended (1 primary + 2 secondaries, or + 1 arbiter)
- **Required for Transactions**

```js
// Read preference — optionally read from secondaries
mongoose.connect(uri, {
  readPreference: 'secondaryPreferred'  // prefer secondaries for reads
});
```

---

### 7.3 Sharding

Sharding **splits data across multiple machines** — horizontal scaling for massive datasets.

```
Without Sharding:              With Sharding:
┌─────────────────┐            ┌─────────┐  ┌─────────┐  ┌─────────┐
│  Single Server  │            │ Shard 1 │  │ Shard 2 │  │ Shard 3 │
│  100M documents │            │ userId  │  │ userId  │  │ userId  │
│  (overloaded)   │            │ A–333K  │  │333K–666K│  │666K–1M  │
└─────────────────┘            └─────────┘  └─────────┘  └─────────┘
                                         ↑
                                    mongos router
                                  (query router — client
                                   connects here)
```

**Shard key:** The field used to distribute data. Choose carefully!

```
Good shard keys:
  - High cardinality (many unique values)
  - Even distribution
  - Used in most queries

Bad shard keys:
  - Low cardinality (boolean, status)
  - Monotonically increasing (_id, timestamp) — creates "hot" shard
  - Never appears in queries
```

---

### 7.4 Performance Best Practices

```
1. SCHEMA DESIGN
   ─────────────
   ✅ Design schemas around your query patterns (query-first design)
   ✅ Embed data that's always accessed together
   ✅ Reference data that grows unboundedly
   ✅ Denormalize read-heavy data (snapshot pattern)

2. INDEXING
   ─────────
   ✅ Index every field used in find(), sort(), and $lookup
   ✅ Use compound indexes that match your queries (ESR rule)
   ✅ Use explain() to verify index usage
   ✅ Monitor index usage — remove unused indexes
   ❌ Don't over-index — write performance suffers

3. QUERIES
   ────────
   ✅ Use projection — only return fields you need
   ✅ Use pagination (limit + skip or cursor-based)
   ✅ Put $match early in aggregation pipelines
   ✅ Use $limit before $sort when possible in pipelines
   ❌ Avoid $where (JavaScript execution in queries — very slow)
   ❌ Avoid leading regex /^/ (can't use index)
   ❌ Avoid $ne and $nin on large collections (not selective)

4. CONNECTIONS
   ────────────
   ✅ Use connection pooling (Mongoose does this by default)
   ✅ Set appropriate pool size for your app's concurrency
   ✅ Close connections properly in serverless environments

5. OPERATIONS
   ────────────
   ✅ Use bulk operations (insertMany, updateMany) instead of loops
   ✅ Use $inc, $push instead of read-modify-write
   ✅ Avoid very large documents (MongoDB limit: 16MB)
   ✅ Use TTL indexes for auto-expiring data (sessions, logs)

6. MONITORING
   ───────────
   ✅ Use MongoDB Atlas built-in monitoring
   ✅ Watch out for COLLSCAN in slow query logs
   ✅ Monitor oplog size for replica sets
   ✅ Track memory usage — MongoDB works best when indexes fit in RAM
```

---

### 7.5 Common Error Codes

| Code | Error | Common Cause |
|------|-------|-------------|
| 11000 | Duplicate key | Inserting a document that violates a unique index |
| 121 | Document validation failure | Document doesn't match $jsonSchema validation |
| 16500 | Too many requests | Atlas free tier throttling |
| 2 | BadValue | Invalid field/operator in query |
| 13 | Unauthorized | Authentication/permission issue |

```js
// Handle duplicate key error
try {
  await User.create({ email: "existing@example.com" });
} catch (err) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    throw new Error(`${field} already exists`);
  }
  throw err;
}
```

---