---
title: "MongoDB Interview Questions"
description: "150+ MongoDB interview questions from beginner to advanced with hidden answers."
sidebar:
  order: 999
  label: "Interview Questions (150+)"
---

> **How to use:** Click any question to expand the answer.

---

## 🟢 Easy (Q1–Q50)

<details class="qa-card qa-easy">
<summary>
Q1. What is MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**MongoDB** is a **NoSQL, document-oriented database** that stores data as flexible JSON-like documents (BSON) instead of rows and columns. It was built for **scalability, flexibility, and high performance**.

**Key traits:**
- **Schema-less** — each document in a collection can have different fields
- **Document-oriented** — data stored as BSON documents
- **Horizontally scalable** — via sharding
- **Rich query language** — CRUD, aggregation, geospatial, text search

**Comparison with SQL databases:**

| Feature | SQL (MySQL/PostgreSQL) | MongoDB |
|---------|----------------------|---------|
| Data format | Tables, rows, columns | Collections, documents |
| Schema | Rigid, fixed | Flexible, dynamic |
| Joins | JOINs | Embedding / `$lookup` |
| Scalability | Vertical (scale up) | Horizontal (scale out) |
| Transactions | ACID | ACID (v4.0+) |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. What is a document in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **document** is the basic unit of data in MongoDB — equivalent to a row in SQL. Documents are stored in **BSON format** (Binary JSON) and have these characteristics:

- Set of **key-value pairs** with support for nested objects and arrays
- Maximum document size is **16MB**
- Each document must have a unique `_id` field

```js
{
  "_id": ObjectId("64f1b2c3d4e5f6a7b8c9d0e1"),
  "name": "Alice",
  "email": "alice@example.com",
  "age": 28,
  "address": { "city": "Mumbai", "pincode": "400001" },
  "skills": ["JavaScript", "MongoDB", "Node.js"],
  "isActive": true,
  "createdAt": ISODate("2024-01-15T10:00:00Z")
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What is the difference between a collection and a database?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- A **Database** is the top-level container that holds collections. One MongoDB server can host multiple databases.
- A **Collection** is a group of documents inside a database — equivalent to a table in SQL. Collections are schema-less.

**Hierarchy:**
```
MongoDB Server
  └── Database: "ecommerce"
        ├── Collection: "users"
        │     ├── Document: { _id: 1, name: "Alice" }
        │     └── Document: { _id: 2, name: "Bob" }
        ├── Collection: "products"
        └── Collection: "orders"
```

```js
use ecommerce              // switch to database
show collections           // list collections
db.createCollection("users") // create collection explicitly
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What is BSON and how is it different from JSON?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**BSON** (Binary JSON) is MongoDB's internal binary serialization format. **JSON** is a human-readable text format.

| Feature | JSON | BSON |
|---------|------|------|
| Format | Text (human-readable) | Binary (machine-readable) |
| Speed | Slower to parse | Faster to parse/encode |
| Data types | String, Number, Boolean, Array, Object, Null | All JSON types + Date, ObjectId, Binary, Decimal128, Int32, Int64, Timestamp |

**Extra BSON types:**
```js
{
  "_id":       ObjectId("64f1b2c3..."),    // ObjectId
  "createdAt": ISODate("2024-01-01"),      // Date
  "price":     NumberDecimal("99.99"),     // Decimal128
  "count":     NumberInt(42)               // 32-bit integer
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. What is _id and ObjectId in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Every MongoDB document **must** have an `_id` field that acts as the **primary key**. If you don't provide `_id`, MongoDB auto-generates an **ObjectId**.

**ObjectId structure (12 bytes):**
```
┌──────────────┬────────────┬──────────┐
│  4 bytes     │  5 bytes   │ 3 bytes  │
│  Unix        │  Random    │ Increment│
│  Timestamp   │  Machine   │ Counter   │
└──────────────┴────────────┴──────────┘
```

```js
// Auto-generated _id
db.users.insertOne({ name: "Alice" })
// { _id: ObjectId("64f1b2c3d4e5f6a7b8c9d0e1"), name: "Alice" }

// Custom _id
db.users.insertOne({ _id: "user_alice_001", name: "Alice" })

// Extract timestamp from ObjectId
ObjectId("64f1b2c3...").getTimestamp()  // 2023-09-01
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. How do you insert documents in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`insertOne()`** — Insert a single document:
```js
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  age: 28
})
// { acknowledged: true, insertedId: ObjectId("...") }
```

**`insertMany()`** — Insert multiple documents:
```js
db.products.insertMany([
  { name: "Laptop", price: 75000 },
  { name: "Mouse",  price: 1200 }
])
// { acknowledged: true, insertedCount: 2 }
```

**Ordered vs Unordered:**
```js
// Default: ordered = true (stops on first error)
db.users.insertMany([...docs])

// Unordered: inserts all valid docs even if some fail
db.users.insertMany([...docs], { ordered: false })
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. How does find() work in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- `find()` returns a **cursor** to all matching documents
- `findOne()` returns the **first matching document** (or null)

```js
// Get ALL documents
db.users.find()

// With filter
db.users.find({ role: "admin" })

// Single result
db.users.findOne({ email: "alice@example.com" })

// With projection
db.users.find({ role: "admin" }, { name: 1, email: 1 })

// Chaining
db.users.find({ isActive: true }).sort({ createdAt: -1 }).limit(10)
```

**Cursor methods:**
```js
db.users.find().count()       // total matching count
db.users.find().pretty()      // formatted output
db.users.find().toArray()     // convert cursor to array
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. What are update operators in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Update operators modify specific fields without replacing the entire document.

| Operator | Purpose | Example |
|----------|---------|---------|
| `$set` | Set a field value | `{ $set: { age: 30 } }` |
| `$unset` | Remove a field | `{ $unset: { temp: "" } }` |
| `$inc` | Increment a number | `{ $inc: { count: 1 } }` |
| `$push` | Add to array | `{ $push: { tags: "new" } }` |
| `$pull` | Remove from array | `{ $pull: { tags: "old" } }` |
| `$addToSet` | Add to array (no duplicates) | `{ $addToSet: { roles: "admin" } }` |
| `$rename` | Rename a field | `{ $rename: { "old": "new" } }` |

```js
// Always use operators — never do this:
// ❌ db.users.updateOne({...}, { age: 30 })
// ✅ db.users.updateOne({...}, { $set: { age: 30 } })
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. What is the difference between updateOne(), updateMany(), and replaceOne()?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Method | What it does | Affects |
|--------|-------------|---------|
| `updateOne()` | Updates first matching doc using operators | 1 document |
| `updateMany()` | Updates all matching docs using operators | N documents |
| `replaceOne()` | Replaces the entire document (except `_id`) | 1 document |

```js
// updateOne — modify specific fields
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { age: 30 }, $inc: { loginCount: 1 } }
)

// updateMany — apply change to all matching
db.orders.updateMany(
  { status: "pending", dueDate: { $lt: new Date() } },
  { $set: { status: "overdue" } }
)

// replaceOne — entire document is replaced
db.users.replaceOne(
  { _id: ObjectId("...") },
  { name: "New Name", email: "new@example.com" }
  // All previous fields GONE!
)
```

**Upsert:** `{ upsert: true }` — insert if no match found.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. How do you delete documents in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`deleteOne()`** — Deletes first matching document:
```js
db.users.deleteOne({ _id: ObjectId("...") })
// { acknowledged: true, deletedCount: 1 }
```

**`deleteMany()`** — Deletes all matching documents:
```js
db.users.deleteMany({ isActive: false })
db.logs.deleteMany({ createdAt: { $lt: cutoffDate } })
db.tempData.deleteMany({})  // clears all docs but keeps collection
```

**`findOneAndDelete()`** — Deletes and returns the deleted document:
```js
const deleted = db.tasks.findOneAndDelete({ _id: ObjectId("...") })
```

**`drop()`** — Removes the entire collection including indexes (faster for bulk clear).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. What are comparison operators in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Operator | Meaning | SQL Equivalent |
|----------|---------|----------------|
| `$eq` | Equal to | `=` |
| `$ne` | Not equal to | `!=` |
| `$gt` | Greater than | `>` |
| `$gte` | Greater than or equal | `>=` |
| `$lt` | Less than | `<` |
| `$lte` | Less than or equal | `<=` |
| `$in` | Value in array | `IN (...)` |
| `$nin` | Value not in array | `NOT IN (...)` |

```js
db.users.find({ age: { $gt: 25 } })
db.products.find({ price: { $gte: 500, $lte: 5000 } })
db.orders.find({ status: { $ne: "cancelled" } })
db.users.find({ "address.city": { $in: ["Mumbai", "Delhi"] } })
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. What are logical operators in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`$and`** — All conditions must be true:
```js
db.users.find({ age: { $gte: 18 }, role: "admin", isActive: true })
// Use explicit $and when SAME field has multiple conditions
db.users.find({
  $and: [ { name: /^A/ }, { name: { $ne: "Anonymous" } } ]
})
```

**`$or`** — At least one condition must be true:
```js
db.products.find({
  $or: [ { price: { $lt: 100 } }, { category: "Sale" } ]
})
```

**`$not`** — Inverts a condition:
```js
db.users.find({ age: { $not: { $gt: 30 } } })
```

**`$nor`** — None of the conditions must be true:
```js
db.users.find({ $nor: [ { role: "admin" }, { status: "banned" } ] })
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. What is projection in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Projection** controls which fields are returned — reduces data transferred:

```js
// Include only name and email
db.users.find({}, { name: 1, email: 1 })
// Result: { _id: ..., name: "Alice", email: "..." }

// Exclude _id too
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Exclude sensitive fields
db.users.find({}, { password: 0, secretKey: 0 })

// Array slice — return only first 3 tags
db.posts.find({}, { title: 1, tags: { $slice: 3 } })
```

**Rules:**
- You cannot mix inclusions and exclusions — **except** `_id` can be excluded alongside inclusions
- Use projection in production to avoid over-fetching data

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. How does sorting work in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- **`1`** = Ascending (A→Z, 0→9)
- **`-1`** = Descending (Z→A, 9→0)

```js
// Ascending price
db.products.find().sort({ price: 1 })

// Descending price
db.products.find().sort({ price: -1 })

// Multi-field sort
db.products.find().sort({ category: 1, price: 1 })

// Latest 5 orders
db.orders.find({ userId: ObjectId("...") })
  .sort({ createdAt: -1 })
  .limit(5)
```

**Tips:**
- Combine `sort()` with `limit()` for efficiency
- String sorting is case-sensitive by default ("Z" before "a")
- Index on sort fields dramatically improves performance

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. How does limit() and skip() work for pagination?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
const page = 2;
const limit = 10;
const skip = (page - 1) * limit;  // = 10

db.products.find().sort({ name: 1 }).skip(skip).limit(limit)
```

**Cursor-based pagination (better for large datasets):**
```js
// First page
db.posts.find().sort({ _id: -1 }).limit(10)

// Next page: pass the last _id as cursor
db.posts.find({ _id: { $lt: lastSeenId } }).sort({ _id: -1 }).limit(10)
```

**Note:** `skip()` is inefficient for large offsets — it still scans and discards documents.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What are the $exists and $type operators?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`$exists`** — Checks whether a field exists:
```js
db.users.find({ phone: { $exists: true } })   // has phone field
db.users.find({ email: { $exists: false } })   // missing email
```

**`$type`** — Filters by BSON data type:
```js
db.users.find({ age: { $type: "number" } })  // age is numeric
db.users.find({ age: { $type: "string" } })  // age stored as string (bad!)
db.users.find({ _id: { $type: "objectId" } })
```

**Common BSON type aliases:** `"double"`, `"string"`, `"object"`, `"array"`, `"objectId"`, `"bool"`, `"date"`, `"null"`, `"int"`, `"long"`, `"decimal"`

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. What are the $in, $all, and $elemMatch operators?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`$in`** — Value matches ANY value in array:
```js
db.users.find({ "address.city": { $in: ["Mumbai", "Delhi"] } })
```

**`$all`** — Array field contains ALL specified values:
```js
db.products.find({ tags: { $all: ["wireless", "bluetooth"] } })
```

**`$elemMatch`** — At least one array element matches ALL conditions:
```js
db.orders.find({
  items: { $elemMatch: { price: { $gt: 500 }, quantity: { $gt: 2 } } }
})
```

**Why `$elemMatch` matters:** Without it, `{ "items.price": { $gt: 500 }, "items.quantity": { $gt: 2 } }` matches if ANY element has price > 500 and ANY (possibly different) element has qty > 2. `$elemMatch` ensures the SAME element satisfies both conditions.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. How do you use $regex for string searching?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`$regex`** allows pattern matching on string fields using PCRE (Perl Compatible Regular Expressions):

```js
db.users.find({ name: { $regex: /^A/ } })        // starts with A
db.users.find({ name: { $regex: /alice/i } })     // case-insensitive
db.users.find({ email: { $regex: /@gmail\.com$/ } }) // ends with @gmail.com
db.users.find({ name: { $regex: /^[AB]/i } })     // starts with A or B
```

**Performance warning:**
```
✅ /^Alice/   ← uses index (anchored)
❌ /Alice/    ← cannot use index (leading wildcard)
```

**Note:** Prefer Text Indexes (`$text`) over `$regex` for full-text search.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. What is the difference between countDocuments() and estimatedDocumentCount()?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Method | How it works | Speed | Use when |
|--------|-------------|-------|---------|
| `countDocuments(filter)` | Scans matching documents | Slower (accurate) | Need exact count with filter |
| `estimatedDocumentCount()` | Uses collection metadata (no scan) | Very fast | Need approx total count |

```js
db.users.countDocuments()                      // exact total count
db.users.countDocuments({ role: "admin" })     // exact filtered count
db.users.estimatedDocumentCount()              // fast estimate (no filter)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. How does the upsert option work?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`upsert: true`** means: update if document exists, insert if not (update + insert = upsert).

```js
db.userSettings.updateOne(
  { userId: "u123" },
  { $set: { theme: "dark", language: "en" } },
  { upsert: true }
)
// If exists → updates. If not → creates new document.

// $setOnInsert — only set on NEW documents
db.userSettings.updateOne(
  { userId: "u123" },
  { $set: { theme: "dark" }, $setOnInsert: { createdAt: new Date() } },
  { upsert: true }
)
```

**Real-world:** Page view counters, session management, user preferences.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. What are $push and $pull for array operations?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`$push`** — Adds element(s) to an array:
```js
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { skills: "GraphQL" } }
)

// Add multiple
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { skills: { $each: ["Docker", "K8s"] } } }
)

// Capped array (keep latest 10)
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { notifications: { $each: [msg], $slice: -10 } } }
)
```

**`$pull`** — Removes matching elements:
```js
db.users.updateOne({ _id: ObjectId("...") }, { $pull: { skills: "PHP" } })
db.orders.updateOne(
  { _id: ObjectId("...") },
  { $pull: { items: { category: "Cancelled" } } }
)
```

**`$addToSet`** — Like `$push` but prevents duplicates.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. How does distinct() work?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`distinct()` returns an array of unique values for a field:

```js
db.users.distinct("role")
// ["admin", "user", "moderator"]

db.users.distinct("address.city")
// ["Mumbai", "Delhi", "Bangalore"]

db.orders.distinct("status", { userId: ObjectId("u1") })
// ["pending", "delivered"]

db.products.distinct("category", { price: { $lt: 1000 } })
```

**Note:** Limited to 16MB result — for larger sets, use aggregation with `$group`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. How does $size work for array queries?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`$size` matches documents where an array has **exactly** a specific length:

```js
db.users.find({ skills: { $size: 3 } })     // exactly 3 skills
db.orders.find({ items: { $size: 1 } })      // exactly 1 item
db.posts.find({ tags: { $size: 0 } })        // empty array
```

**For greater than / less than N:**
```js
// At least 3 elements (index 2 exists)
db.users.find({ "skills.2": { $exists: true } })

// Using aggregation $expr:
db.users.aggregate([
  { $match: { $expr: { $gt: [{ $size: "$skills" }, 2] } } }
])
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. What is the MongoDB Shell (mongosh)?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**mongosh** is the modern MongoDB Shell — a JavaScript-based interactive interface.

**Common commands:**
```js
show dbs                           // list databases
use myapp                          // switch database
db                                 // show current db
show collections                   // list collections
db.users.drop()                    // drop collection
db.users.stats()                   // collection statistics
db.serverStatus()                  // server info
db.currentOp()                     // running operations
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. How do you import/export data in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**mongoimport:**
```bash
mongoimport --db myapp --collection users --file users.json --jsonArray
mongoimport --db myapp --collection products --type csv --headerline --file products.csv
```

**mongoexport:**
```bash
mongoexport --db myapp --collection users --out users_backup.json
mongoexport --db myapp --collection orders --query '{"status": "completed"}' --out completed.json
```

**mongodump / mongorestore** (binary backup):
```bash
mongodump --db myapp --out ./backup
mongorestore --db myapp ./backup/myapp
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What is the $where operator and why avoid it?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`$where` passes a JavaScript expression to filter documents — evaluated for **every single document**.

```js
// ❌ AVOID — extremely slow, no index usage
db.users.find({ $where: function() {
  return this.firstName + " " + this.lastName === "Alice Johnson"
}})

// ✅ BETTER — use regular query
db.users.find({ firstName: "Alice", lastName: "Johnson" })

// ✅ BETTER — use $expr for field comparisons
db.products.find({ $expr: { $gt: ["$sellingPrice", "$costPrice"] } })
```

**Why avoid:** Can't use indexes, slow (JS engine per doc), security risk, deprecated.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. What is a capped collection?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **capped collection** is a **fixed-size collection** that automatically overwrites oldest documents when full (circular buffer).

```js
db.createCollection("activityLogs", {
  capped: true,
  max: 1000,           // max documents
  size: 5242880        // 5MB max size (required)
})
```

**Behaviors:**
- Oldest doc auto-removed when full
- Cannot delete individual documents
- Cannot update if size changes
- Documents stored in insertion order

**Use cases:** Application logs, activity feeds, real-time event streaming (tailable cursors).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. How do you rename a field in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use the `$rename` update operator:

```js
// Single document
db.users.updateOne(
  { _id: ObjectId("...") },
  { $rename: { "userName": "username" } }
)

// All documents
db.users.updateMany(
  {},
  { $rename: { "phoneNumber": "phone", "emailAddress": "email" } }
)

// Nested field
db.users.updateMany(
  {},
  { $rename: { "address.streetName": "address.street" } }
)
```

**Note:** If new field name already exists, it's overwritten. Missing source fields are no-ops.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. How does MongoDB handle null vs missing fields?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

This is a common source of bugs:

```js
// Document A: phone: null (explicitly null)
// Document B: no phone field (missing)

db.users.find({ phone: null })
// Matches BOTH A and B! — null matches both null values AND missing fields

// Match ONLY null values
db.users.find({ phone: { $type: "null" } })
// Matches only A

// Match ONLY missing fields
db.users.find({ phone: { $exists: false } })
// Matches only B

// Field exists with any value (including null)
db.users.find({ phone: { $exists: true } })
// Matches A (not B)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. How do you create and drop indexes?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
// Create indexes
db.users.createIndex({ email: 1 })
db.users.createIndex({ email: 1 }, { unique: true })
db.orders.createIndex({ userId: 1, createdAt: -1 })
db.products.createIndex({ name: "text", description: "text" })  // text index
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })  // TTL

// View indexes
db.users.getIndexes()
db.users.indexStats()

// Drop indexes
db.users.dropIndex({ email: 1 })
db.users.dropIndex("email_1")
db.users.dropIndexes()  // drop ALL except _id
```

**Note:** `createIndex()` is idempotent. `_id` index is automatic and cannot be dropped.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q31. What is a MongoDB client and connecting to MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Connect using the MongoDB driver or Mongoose:

```js
// Native MongoDB Node.js driver
const { MongoClient } = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017/mydb")
await client.connect()
const db = client.db("mydb")
const users = db.collection("users")

// Mongoose
const mongoose = require("mongoose")
await mongoose.connect("mongodb://localhost:27017/mydb")
const User = mongoose.model("User", userSchema)
```

**Connection string format:**
```
mongodb://username:password@host:port/database?options
mongodb+srv://cluster.mongodb.net/mydb  // Atlas connection
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q32. What is the different data types supported in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

MongoDB supports rich BSON data types:

| Type | Example | Description |
|------|---------|-------------|
| String | `"hello"` | UTF-8 string |
| Integer | `42` | 32/64-bit integer |
| Double | `3.14` | Floating point |
| Boolean | `true` | True/false |
| Date | `ISODate(...)` | 64-bit millisecond timestamp |
| ObjectId | `ObjectId(...)` | 12-byte unique identifier |
| Array | `[1, 2, 3]` | List of values |
| Embedded Document | `{ city: "Mumbai" }` | Nested object |
| Null | `null` | Null value |
| Decimal128 | `NumberDecimal("99.99")` | High-precision decimal |
| Binary Data | `BinData(...)` | Binary byte array |
| Timestamp | `Timestamp(...)` | Internal timestamp |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q33. What is the use of pretty() in MongoDB shell?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`pretty()` formats the output in a readable way:

```js
db.users.find().pretty()
```

Without `pretty()`:
```
{ "_id" : ObjectId("..."), "name" : "Alice", "address" : { "city" : "Mumbai" } }
```

With `pretty()`:
```js
{
  "_id" : ObjectId("..."),
  "name" : "Alice",
  "address" : {
    "city" : "Mumbai"
  }
}
```

It's a shell-only convenience method (not available in drivers).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q34. How do you use $inc for atomic increments?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`$inc` atomically increments or decrements a numeric field:

```js
// Increment by 1
db.products.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stockCount: -1 } }  // decrement stock by 1
)

// Increment multiple fields
db.users.updateOne(
  { _id: ObjectId("...") },
  { $inc: { loginCount: 1, points: 10 } }
)
```

**Key benefits:**
- **Atomic** — no race conditions, safe for concurrent operations
- No need for read-modify-write pattern
- Negative values for decrementing

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q35. What are MongoDB databases and namespaces?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Namespace** is the combination of database name and collection name: `database.collection`.

```
Namespace: myapp.users
           │         │
       database   collection
```

**Reserved databases:**
- `admin` — authentication and authorization
- `local` — server-specific data (oplog, etc.)
- `config` — sharded cluster configuration

**Naming rules:**
- Database names: case-sensitive, max 64 bytes
- Collection names: can contain `.` and `$` (but avoid)
- `system.` prefix is reserved for internal collections

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q36. What is the MongoDB data directory?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **data directory** is where MongoDB stores database files:

- **Default path (Linux/macOS):** `/data/db`
- **Default path (Windows):** `C:\data\db`
- **Custom path:** `mongod --dbpath /my/custom/path`

**Contents:**
```
/data/db/
├── WiredTiger           # storage engine data
├── WiredTiger.lock      # lock file
├── diagnostic.data/     # telemetry data
├── journal/             # write-ahead journal
├── myapp/               # database directory
│   ├── collection.wt    # collection data
│   └── index.wt         # index data
└── mongod.lock          # server lock file
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q37. What is the difference between MongoDB and MySQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | MongoDB | MySQL |
|--------|---------|-------|
| **Type** | NoSQL document DB | Relational (RDBMS) |
| **Schema** | Schema-less, dynamic | Fixed schema, predefined tables |
| **Data format** | BSON documents | Rows and columns |
| **Relationships** | Embedded docs / `$lookup` | JOINs |
| **Scaling** | Horizontal (sharding native) | Vertical (primary) |
| **ACID** | Multi-doc ACID (v4.0+) | Full ACID |
| **Query language** | MQL (JSON-based) | SQL |
| **Use cases** | Real-time, big data, catalogs | Structured, strict schema apps |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q38. What is a replica set in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **replica set** is a group of MongoDB servers that maintain the same data set, providing **high availability** and **data redundancy**.

**Components:**
- **Primary** — handles all write operations
- **Secondaries** — replicate data from primary (read-only by default)
- **Arbiter** (optional) — votes in elections but doesn't store data

```
┌─────────────────┐
│   PRIMARY       │ ← All writes go here
│   node1:27017   │
└────────┬────────┘
         │ replication
    ┌────┴────┬────┴────┐
    ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│SECONDARY│ │SECONDARY│ │ARBITER │
│node2    │ │node3    │ │node4    │
│(reads)  │ │(reads)  │ │(vote   │
└────────┘ └────────┘ └────────┘
```

**Automatic failover:** If primary fails, secondaries elect a new primary.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q39. What is sharding in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Sharding** is MongoDB's approach to **horizontal scaling** — distributing data across multiple servers.

**Components:**
- **Shards** — store the actual data (each shard is a replica set)
- **Config servers** — store cluster metadata
- **Mongos** — query router, routes requests to appropriate shards

```
         Application
              │
              ▼
         ┌──────────┐
         │  mongos  │ ← Query router
         │ (router) │
         └────┬─────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│ Shard 1│ │ Shard 2│ │ Shard 3│
│(RS)    │ │(RS)    │ │(RS)    │
└────────┘ └────────┘ └────────┘
```

**Shard key** determines how data is distributed across shards. Choose carefully!

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q40. What is a shard key?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **shard key** is a field (or compound fields) that determines how MongoDB distributes documents across shards.

```js
// Enable sharding on database
sh.enableSharding("myapp")

// Shard collection on userId
sh.shardCollection("myapp.orders", { userId: "hashed" })
```

**Shard key strategies:**
- **Hashed shard key** — even distribution, good for random access
- **Ranged shard key** — keeps related data together, good for range queries
- **Compound shard key** — combines multiple fields

**Key considerations:**
- Cannot be changed after sharding
- High cardinality (many unique values) is essential
- Query performance depends on shard key

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q41. What is an index in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

An **index** is a data structure (B-Tree) that stores a small portion of a collection's data for fast query lookup.

```
Without Index: COLLSCAN — reads every document (O(n))
With Index:    IXSCAN  — jumps directly to matching docs (O(log n))
```

**Types of indexes:**
- Single field index: `{ email: 1 }`
- Compound index: `{ userId: 1, createdAt: -1 }`
- Multikey index: on array fields
- Text index: for full-text search
- Geospatial index: for location queries
- TTL index: auto-expire documents
- Unique index: enforce uniqueness

**Trade-off:** Indexes speed up reads but slow down writes (index must be updated).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q42. How do you use $text for text search?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Text indexes** enable full-text search across string fields:

```js
// Create text index
db.products.createIndex({ name: "text", description: "text" })

// Search
db.products.find({ $text: { $search: "wireless" } })
db.products.find({ $text: { $search: "\"noise cancelling\"" } }) // exact phrase
db.products.find({ $text: { $search: "laptop -gaming" } })       // exclude

// Sort by relevance
db.products.find(
  { $text: { $search: "bluetooth speaker" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })

// Weighted index
db.products.createIndex(
  { name: "text", description: "text" },
  { weights: { name: 3, description: 1 } }
)
```

**Note:** Only one text index per collection.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q43. What is a TTL index?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **TTL (Time-To-Live) index** automatically removes documents after a specified time:

```js
// Delete sessions after 1 hour
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)

// Delete password reset tokens after 24 hours
db.passwordResets.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 }
)
```

**How it works:**
- A background thread checks the TTL index every 60 seconds
- Documents where `createdAt < now - expireAfterSeconds` are deleted
- The indexed field must be a date or array of dates

**Use cases:** Session expiration, temporary data, event logs, password reset tokens.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q44. What is the difference between SQL and MongoDB terminology?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| SQL | MongoDB | Meaning |
|-----|---------|---------|
| Database | Database | Container |
| Table | Collection | Group of records |
| Row | Document | Individual record |
| Column | Field | Data field |
| Primary Key | `_id` | Unique identifier |
| Index | Index | Performance lookup |
| JOIN | `$lookup` / Embedding | Combining data |
| Foreign Key | Reference | Linking documents |
| WHERE | `find()` filter | Filtering |
| GROUP BY | `$group` | Aggregation |
| ORDER BY | `.sort()` | Sorting |
| SELECT | Projection | Field selection |
| INSERT | `insertOne/insertMany` | Creating records |
| UPDATE | `updateOne/updateMany` | Updating |
| DELETE | `deleteOne/deleteMany` | Removing |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q45. How do you use $set and $unset?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**`$set`** — Sets a field value (creates if not exists):
```js
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { age: 30, email: "new@example.com", updatedAt: new Date() } }
)
```

**`$unset`** — Removes a field:
```js
db.users.updateOne(
  { _id: ObjectId("...") },
  { $unset: { tempToken: "", resetCode: "" } }
)
```

**Key difference:**
- `$set` with value `null` sets the field to null (field still exists)
- `$unset` completely removes the field from the document

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q46. What is the findAndModify command?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`findAndModify` atomically finds, modifies, and returns a document in one operation:

```js
// findOneAndUpdate
const updated = db.tasks.findOneAndUpdate(
  { status: "pending" },
  { $set: { status: "processing", startedAt: new Date() } },
  { sort: { priority: -1, createdAt: 1 }, returnDocument: "after" }
)

// findOneAndDelete
const deleted = db.tasks.findOneAndDelete({ _id: ObjectId("...") })

// findOneAndReplace
const replaced = db.tasks.findOneAndReplace(
  { _id: ObjectId("...") },
  { newTask: true }
)
```

**Options:** `sort`, `projection`, `returnDocument: "before"|"after"`, `upsert`.

**Use case:** Atomic operations like queue processing (get next job and mark it running).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q47. How do you handle errors in MongoDB?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Common MongoDB errors and error codes:

```js
// Error code 11000 — Duplicate key
try {
  await db.users.insertOne({ email: "existing@example.com" })
} catch (err) {
  if (err.code === 11000) {
    console.log(`Duplicate: ${Object.keys(err.keyValue)}`)
  }
}

// Error code 13 — Unauthorized
// Error code 50 — Query exceeds 16MB limit
// Error code 11600 — Interrupted, server shutdown
// Error code 13436 — Not primary (secondary can't write)

// Write concern errors
db.orders.insertOne(doc, { writeConcern: { w: "majority" } })
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q48. What is the difference between embedded and referenced documents?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Embedded documents** — store related data inside the same document:
```js
{
  _id: ObjectId("u1"),
  name: "Alice",
  address: { street: "123 MG Road", city: "Mumbai" }
}
```

**Referenced documents** — store in separate collections, linked by ID:
```js
// users collection
{ _id: ObjectId("u1"), name: "Alice" }

// orders collection
{ _id: ObjectId("o1"), userId: ObjectId("u1"), total: 2500 }
```

**When to embed:**
- Data always accessed together
- One-to-one relationships
- Small, bounded data

**When to reference:**
- Data grows unboundedly
- Shared across many documents
- Need independent query capability

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q49. How do you check MongoDB server status?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

```js
// Server status (comprehensive)
db.serverStatus()

// Database stats
db.stats()
// { collections: 15, objects: 100000, avgObjSize: 256, dataSize: 25600000, ... }

// Collection stats
db.users.stats()
// { ns: "myapp.users", count: 50000, size: 12800000, ... }

// Connection status
db.runCommand({ connectionStatus: 1 })

// Uptime
db.serverStatus().uptime  // in seconds

// Current operations
db.currentOp()
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q50. What is the use of MongoDB Compass?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**MongoDB Compass** is a GUI tool for visualizing and interacting with MongoDB data.

**Features:**
- **Visual query builder** — build queries without writing code
- **Schema visualization** — view field types and distributions
- **Index management** — create/delete indexes visually
- **Performance profiler** — identify slow queries
- **Aggregation pipeline builder** — build pipelines visually
- **Real-time server stats** — monitor operations

Compass is useful for:
- Exploring unfamiliar databases
- Debugging queries
- Visualizing schema patterns
- Teaching/learning MongoDB

</div>
</details>

---

## 🟡 Medium (Q51–Q110)

<details class="qa-card qa-medium">
<summary>
Q51. What is a compound index and the ESR rule?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **compound index** includes multiple fields in a single index. Field order matters significantly.

```js
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })
```

**Prefix rule:** This index supports queries on:
- `userId` ✅
- `userId + status` ✅
- `userId + status + createdAt` ✅
- `status` ❌ (doesn't start with userId)

**The ESR Rule (Equality → Sort → Range):**
```
Design compound indexes in this field order:
1. Equality fields first     (exact match)
2. Sort fields next          (sorting)
3. Range fields last         ($gt, $lt, etc.)

Query: { userId: "u1", status: "active", age: { $gt: 25 } }
        ↑ equality    ↑ equality     ↑ range

Best index: { userId: 1, status: 1, age: 1 }
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. What is the aggregation pipeline?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **aggregation pipeline** is a framework for data transformation and analytics. Documents flow through stages like an assembly line.

```js
db.collection.aggregate([
  { $stage1: { options } },
  { $stage2: { options } },
  { $stage3: { options } }
])
```

**Visual flow:**
```
Collection (1000 docs)
        ↓
{ $match: { status: "active" } }  →  500 docs
        ↓
{ $group: { _id: "$role", count: { $sum: 1 } } }  →  5 docs
        ↓
{ $sort: { count: -1 } }  →  5 docs (sorted)
        ↓
Result: Top 3 roles by user count
```

**Key stages:** `$match`, `$group`, `$sort`, `$project`, `$lookup`, `$unwind`, `$addFields`, `$bucket`, `$facet`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. How does $group work in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$group` groups documents by a specified field and computes aggregate values:

```js
// Count users per role
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])

// Revenue analytics per category
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: {
    _id: "$items.category",
    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
    avgPrice:     { $avg: "$items.price" },
    minPrice:     { $min: "$items.price" },
    maxPrice:     { $max: "$items.price" }
  }}
])

// Overall total (_id: null groups ALL documents)
db.orders.aggregate([
  { $group: { _id: null, grandTotal: { $sum: "$amount" } } }
])
```

**Accumulators:** `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet`, `$first`, `$last`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. How does $lookup work in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$lookup` performs a **left outer join** with another collection:

```js
// Basic $lookup — simple field equality
db.orders.aggregate([
  { $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "customer"
  }},
  { $unwind: "$customer" },  // flatten array to object
  { $project: { orderId: "$_id", totalAmount: 1, "customer.name": 1 } }
])

// Pipeline $lookup — advanced conditions
db.orders.aggregate([{
  $lookup: {
    from: "products",
    let: { orderedIds: "$items.productId" },
    pipeline: [
      { $match: { $expr: { $in: ["$_id", "$$orderedIds"] } } },
      { $project: { name: 1, price: 1 } }
    ],
    as: "productDetails"
  }
}])
```

**Note:** `$lookup` always returns an **array** — use `$unwind` to flatten.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What is $unwind and when to use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$unwind` deconstructs an array field — creates one output document per array element:

```js
// Before: { _id: 1, skills: ["JS", "Python"] }
// After:
{ _id: 1, skills: "JS" }
{ _id: 1, skills: "Python" }

// Real-world: count units sold per product
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: {
    _id: "$items.productId",
    totalSold: { $sum: "$items.quantity" }
  }}
])

// Handle empty arrays
{ $unwind: { path: "$skills", preserveNullAndEmptyArrays: true } }

// Track element position
{ $unwind: { path: "$skills", includeArrayIndex: "skillIndex" } }
```

**Note:** `$unwind` can multiply document count significantly — always follow with `$group` or `$limit`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. What is $project in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$project` reshapes documents — includes/excludes fields, renames, and computes new fields:

```js
// Simple inclusion
{ $project: { name: 1, email: 1, _id: 0 } }

// Computed fields
{ $project: {
  name: 1,
  priceWithTax: { $multiply: ["$price", 1.18] },
  fullName: { $concat: ["$firstName", " ", "$lastName"] },
  yearJoined: { $year: "$createdAt" }
}}

// Conditional field
{ $project: {
  status: { $cond: { if: { $gte: ["$score", 70] }, then: "Pass", else: "Fail" } }
}}

// Array operations
{ $project: {
  firstTag: { $arrayElemAt: ["$tags", 0] },
  tagCount: { $size: "$tags" }
}}
```

**vs `$addFields`:** `$project` replaces the document (only specified fields remain). `$addFields` adds fields while keeping all original fields.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. What is the difference between $addFields and $project?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Stage | Behavior |
|-------|---------|
| `$project` | Replaces document — only specified fields remain |
| `$addFields` | Adds/modifies fields — all original fields are kept |

```js
// Original: { _id: 1, name: "Alice", price: 100, qty: 5 }

// $project — strips original fields
{ $project: { totalValue: { $multiply: ["$price", "$qty"] } } }
// Result: { _id: 1, totalValue: 500 } — name,price,qty are GONE

// $addFields — adds field, keeps everything
{ $addFields: { totalValue: { $multiply: ["$price", "$qty"] } } }
// Result: { _id: 1, name: "Alice", price: 100, qty: 5, totalValue: 500 }
```

**Use `$addFields`** when you want to enrich documents without losing fields. `$set` is an alias for `$addFields` (MongoDB 4.2+).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. Where should $match be placed in a pipeline?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Always put `$match` as early as possible** to reduce documents flowing through later stages.

```js
// ✅ GOOD — filter first, process fewer docs
db.orders.aggregate([
  { $match: { status: "completed", createdAt: { $gte: new Date("2024-01-01") } } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } }
])

// ❌ BAD — group ALL docs first, then filter
db.orders.aggregate([
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $match: { total: { $gt: 1000 } } }
])
```

**Legitimate post-group `$match`:**
```js
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  { $match: { totalSpent: { $gt: 5000 } } }  // MUST be after $group
])
```

**Key:** `$match` at the start can use indexes; later in pipeline it cannot.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. What is $expr and how is it used?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$expr` allows using aggregation expressions inside query operators — enables comparing two fields in the same document:

```js
// Compare two fields
db.products.find({
  $expr: { $gt: ["$sellingPrice", "$costPrice"] }
})

// Find users with same first and last name
db.users.find({
  $expr: { $eq: ["$firstName", "$lastName"] }
})

// Where discount > 20% of total
db.orders.find({
  $expr: { $gt: ["$discountAmount", { $multiply: ["$totalAmount", 0.2] }] }
})

// In aggregation $match
db.inventory.aggregate([
  { $match: { $expr: { $lt: ["$stock", "$reorderLevel"] } } }
])
```

**Note:** `$expr` can use indexes only with simple field comparisons on indexed fields.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. What is $facet in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$facet` runs multiple independent sub-pipelines on the same input — perfect for building search/filter UIs:

```js
db.products.aggregate([
  { $match: { $text: { $search: "laptop" } } },

  { $facet: {
    "results": [           // Paginated results
      { $sort: { price: 1 } },
      { $skip: 0 },
      { $limit: 10 },
      { $project: { name: 1, price: 1 } }
    ],
    "categoryCounts": [    // Filter counts
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ],
    "brandCounts": [       // Brand counts
      { $group: { _id: "$brand", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ],
    "totalCount": [        // Total count
      { $count: "total" }
    ]
  }}
])
```

**Benefit:** Single query instead of 4 separate queries — processes input documents once.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q61. What are $bucket and $bucketAuto?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`$bucket`** groups documents into manually defined ranges:
```js
db.products.aggregate([{
  $bucket: {
    groupBy: "$price",
    boundaries: [0, 1000, 5000, 20000, 100000],
    default: "100000+",
    output: { count: { $sum: 1 }, products: { $push: "$name" } }
  }
}])
// { _id: 0, count: 45 }   ← 0 — 999
// { _id: 1000, count: 120 } ← 1000 — 4999
```

**`$bucketAuto`** automatically creates N evenly-distributed buckets:
```js
db.products.aggregate([{
  $bucketAuto: {
    groupBy: "$price",
    buckets: 5,
    output: { count: { $sum: 1 }, avgPrice: { $avg: "$price" } }
  }
}])
```

**Use cases:** Histograms, price distribution reports, age group analysis.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. What is embedding vs referencing in data modeling?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Decision guide:**

| Scenario | Recommendation |
|---------|---------------|
| Data always accessed together | **Embed** |
| Small, bounded data | **Embed** |
| One-to-one relationship | **Embed** |
| Data grows unboundedly (order history) | **Reference** |
| Data shared across documents | **Reference** |
| Need to query nested data independently | **Reference** |
| One-to-many (large many) | **Reference** |
| Many-to-many | **Reference** |

**Rule of thumb:** "Data that is accessed together should be stored together."

**Trade-offs:**
- Embedding = fast reads (one query), risk of large documents (16MB limit)
- Referencing = normalized, requires multiple queries or `$lookup`

Most MongoDB schemas use a **mix** of both approaches.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. How do you model one-to-many relationships?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Pattern 1: Embed array** (good for small, bounded data):
```js
{
  _id: ObjectId("u1"),
  name: "Alice",
  addresses: [
    { label: "Home", city: "Mumbai" },
    { label: "Office", city: "Pune" }
  ]
}
```

**Pattern 2: Reference from "many" side** (most common):
```js
// users: { _id: ObjectId("u1"), name: "Alice" }
// orders: { _id: ObjectId("o1"), userId: ObjectId("u1"), total: 2500 }
db.orders.find({ userId: ObjectId("u1") })  // get all orders for Alice
```

**Pattern 3: Reference from "one" side** (small "many"):
```js
{
  _id: ObjectId("p1"),
  title: "My Blog Post",
  commentIds: [ObjectId("c1"), ObjectId("c2")]
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. How do you model many-to-many relationships?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Example:** Students and Courses.

**Junction collection (recommended):**
```js
// students: { _id: ObjectId("s1"), name: "Ravi" }
// courses:  { _id: ObjectId("c1"), title: "MongoDB" }

// enrollments (junction)
{ _id: ObjectId("e1"),
  studentId: ObjectId("s1"),
  courseId:  ObjectId("c1"),
  enrolledAt: ISODate("2024-01-10"),
  progress: 65,
  grade: "A"
}

// Get all courses for a student
db.enrollments.find({ studentId: ObjectId("s1") })

// Get all students in a course
db.enrollments.find({ courseId: ObjectId("c1") })
```

**Embed references on both sides** (small datasets only):
```js
// students: { enrolledCourseIds: [ObjectId("c1"), ObjectId("c2")] }
// courses:  { enrolledStudentIds: [ObjectId("s1"), ObjectId("s2")] }
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. What is schema validation in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

MongoDB supports JSON Schema validation to enforce document structure:

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
        age: { bsonType: "int", minimum: 0, maximum: 120 },
        role: { enum: ["admin", "user", "moderator"] }
      }
    }
  },
  validationLevel: "strict",   // "strict" or "moderate"
  validationAction: "error"    // "error" or "warn"
})
```

**Levels:** `strict` — validates all; `moderate` — validates inserts + updates to already-valid docs

**Actions:** `error` — rejects; `warn` — allows but logs warning

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. What are Mongoose schemas and models?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

- **Schema** defines the structure, data types, and rules for documents
- **Model** is a class built from a schema — provides interface to interact with a collection

```js
const userSchema = new Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age:   { type: Number, min: 0, max: 120 },
  role:  { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true })  // auto-adds createdAt, updatedAt

const User = mongoose.model('User', userSchema)  // collection: 'users'

// Usage
await User.create({ name: "Alice", email: "alice@example.com" })
await User.find({ role: "admin" })
await User.findByIdAndUpdate(id, { $set: { age: 30 } })
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. What are Mongoose middleware (hooks)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Middleware** (hooks) are functions that run before/after Mongoose operations:

**Pre-save — Hash password:**
```js
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})
```

**Pre-find — Exclude inactive:**
```js
userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } })
  next()
})
```

**Post-save — Send email:**
```js
userSchema.post('save', async function(doc, next) {
  await sendWelcomeEmail(doc.email, doc.name)
  next()
})
```

**Pre-delete — Cleanup:**
```js
userSchema.pre('deleteOne', { document: true }, async function(next) {
  await Order.deleteMany({ userId: this._id })
  next()
})
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. What is Mongoose population (populate)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`populate()` automatically replaces a referenced ObjectId with the actual document:

```js
const orderSchema = new Schema({
  userId:   { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

// Populate user (makes a separate query)
const order = await Order.findById(id).populate('userId')
// userId is now the full User object, not just ObjectId

// With field selection
await Order.findById(id).populate('userId', 'name email')

// Populate multiple fields
await Order.findById(id)
  .populate('userId', 'name email')
  .populate('products', 'name price')

// Nested populate
await Order.findById(id).populate({
  path: 'userId',
  select: 'name department',
  populate: { path: 'department', select: 'name' }
})
```

**Note:** `populate()` makes separate queries — it's JS-level, not DB-level join.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. What are Mongoose virtuals?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Virtuals** are computed fields on a document that are **not stored in the database**:

```js
const userSchema = new Schema({
  firstName: String,
  lastName:  String,
  dob:       Date
})

// Virtual getter
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

// Virtual age from DOB
userSchema.virtual('age').get(function() {
  return new Date().getFullYear() - this.dob.getFullYear()
})

// Virtual with setter
userSchema.virtual('fullName')
  .get(function() { return `${this.firstName} ${this.lastName}` })
  .set(function(name) {
    [this.firstName, this.lastName] = name.split(' ')
  })

// Include in JSON
const userSchema = new Schema({ ... }, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. How do you use $cond and $switch in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`$cond`** — if/then/else:
```js
{ $cond: { if: <condition>, then: <trueValue>, else: <falseValue> } }
// or: { $cond: [<condition>, <trueValue>, <falseValue>] }

db.products.aggregate([{ $project: {
  priceLabel: { $cond: [{ $gte: ["$price", 10000] }, "Expensive", "Affordable"] }
}}])
```

**`$switch`** — multi-case conditional:
```js
db.orders.aggregate([{ $project: {
  priority: { $switch: {
    branches: [
      { case: { $gte: ["$amount", 100000] }, then: "VIP" },
      { case: { $gte: ["$amount", 10000] },  then: "High" },
      { case: { $gte: ["$amount", 1000] },   then: "Medium" }
    ],
    default: "Low"
  }}
}}])
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q71. What are $out and $merge in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**`$out`** — Writes results to a **new collection** (replaces entire collection):
```js
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  { $out: "userSpendingSummary" }  // creates/replaces collection
])
```

**`$merge`** — Writes results to an **existing collection** (merge/upsert):
```js
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  { $merge: {
    into: "userStats",
    on: "_id",
    whenMatched: "merge",       // merge, replace, keepExisting, fail
    whenNotMatched: "insert"    // insert, discard, fail
  }}
])
```

**Use cases:** Materialized views, pre-computed aggregations, ETL pipelines.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q72. What are aggregation expressions?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Aggregation expressions compute values inside pipeline stages:

**Arithmetic:** `$add`, `$subtract`, `$multiply`, `$divide`, `$mod`, `$round`, `$abs`

**String:** `$concat`, `$toUpper`, `$toLower`, `$substr`, `$strLenCP`, `$trim`

**Date:** `$year`, `$month`, `$dayOfMonth`, `$dayOfWeek`, `$hour`, `$dateToString`

**Array:** `$size`, `$arrayElemAt`, `$first`, `$last`, `$in`, `$filter`, `$map`

**Conditional:** `$cond`, `$switch`, `$ifNull`

```js
{ $project: {
  fullName:  { $concat: ["$firstName", " ", "$lastName"] },
  year:      { $year: "$createdAt" },
  firstTag:  { $arrayElemAt: ["$tags", 0] },
  hasRole:   { $in: ["admin", "$roles"] },
  adult:     { $cond: [{ $gte: ["$age", 18] }, "Adult", "Minor"] },
  price:     { $ifNull: ["$price", 0] }  // default 0 if missing
}}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q73. What is $push vs $addToSet in $group?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Accumulator | Behavior |
|-------------|---------|
| `$push` | Adds ALL values (including duplicates) |
| `$addToSet` | Adds only UNIQUE values (no duplicates) |

```js
// Input: orders with tags ["electronics", "sale", "electronics"]

db.orders.aggregate([{ $group: {
  _id: "$userId",
  allTags:    { $push: "$tag" },     // ["electronics", "sale", "electronics"]
  uniqueTags: { $addToSet: "$tag" }   // ["electronics", "sale"]
}}])
```

**When to use:**
- `$push`: preserved insertion order, all duplicates (e.g., all order IDs)
- `$addToSet`: distinct values (e.g., unique categories per user)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q74. How does pipeline $lookup work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The pipeline version of `$lookup` allows joining with **conditions beyond field equality**:

```js
// Join orders with only expensive products
db.orders.aggregate([{ $lookup: {
  from: "products",
  let: { orderedIds: "$items.productId", minPrice: 5000 },
  pipeline: [{
    $match: { $expr: {
      $and: [
        { $in: ["$_id", "$$orderedIds"] },
        { $gte: ["$price", "$$minPrice"] }
      ]
    }}
  }],
  as: "expensiveProducts"
}}])

// Self-join (employees with their manager)
db.employees.aggregate([{ $lookup: {
  from: "employees",
  localField: "managerId",
  foreignField: "_id",
  as: "manager"
}}])
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q75. How does $unwind with includeArrayIndex work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`includeArrayIndex` adds a field tracking the index position of each element:

```js
// Document: { _id: 1, skills: ["JS", "Python", "MongoDB"] }

db.users.aggregate([{ $unwind: {
  path: "$skills",
  includeArrayIndex: "skillIndex",
  preserveNullAndEmptyArrays: true
}}])

// Result:
{ _id: 1, skills: "JS",      skillIndex: 0 }
{ _id: 1, skills: "Python",  skillIndex: 1 }
{ _id: 1, skills: "MongoDB", skillIndex: 2 }

// Find primary (first) address
db.users.aggregate([
  { $unwind: { path: "$addresses", includeArrayIndex: "idx" } },
  { $match: { idx: 0 } },
  { $project: { name: 1, primaryAddress: "$addresses" } }
])
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q76. What is $graphLookup for recursive traversal?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$graphLookup` performs **recursive lookups** for graph-like hierarchies:

```js
// employees: { _id: 1, name: "CEO", managerId: null }
//            { _id: 2, name: "CTO", managerId: 1 }
//            { _id: 3, name: "Dev", managerId: 2 }

db.employees.aggregate([
  { $match: { name: "CTO" } },
  { $graphLookup: {
    from: "employees",
    startWith: "$_id",
    connectFromField: "_id",
    connectToField: "managerId",
    as: "reportees",
    maxDepth: 10,
    depthField: "level"
  }}
])
```

**Use cases:** Org charts, category trees, social networks, bill of materials, recommendation engines.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q77. What is $replaceRoot in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$replaceRoot` replaces the entire document with an embedded document:

```js
// Original: { _id: 1, name: "Alice", address: { city: "Mumbai", pin: "400001" } }

{ $replaceRoot: { newRoot: "$address" } }
// Result: { city: "Mumbai", pin: "400001" }
// _id and name are gone

// Merge nested fields with root
{ $replaceRoot: {
  newRoot: { $mergeObjects: ["$address", "$$ROOT"] }
}}
```

**Use cases:** Normalizing nested data after `$unwind`, promoting sub-documents. `$replaceWith` is an alias (MongoDB 4.2+).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q78. How does Mongoose handle duplicate key errors?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Error code `11000` = duplicate key violation:

```js
try {
  await User.create({ email: "existing@example.com" })
} catch (err) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    const value = err.keyValue[field]
    throw new Error(`${field} "${value}" already exists`)
  }
  throw err
}

// Generic error handler
function handleMongoError(err) {
  if (err.name === 'ValidationError') {
    const msgs = Object.values(err.errors).map(e => e.message)
    return { status: 400, message: msgs.join(', ') }
  }
  if (err.code === 11000) {
    return { status: 409, message: `${Object.keys(err.keyValue)[0]} already in use` }
  }
  return { status: 500, message: 'Internal error' }
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q79. What is $setWindowFields?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$setWindowFields` (MongoDB 5.0+) adds SQL-like window functions — computes values across a window of documents **without collapsing** groups:

```js
// Running total per user (ordered by date)
db.orders.aggregate([{ $setWindowFields: {
  partitionBy: "$userId",
  sortBy: { createdAt: 1 },
  output: {
    runningTotal: {
      $sum: "$amount",
      window: { documents: ["unbounded", "current"] }
    },
    orderRank: {
      $rank: {}
    }
  }
}}])
```

**Output (for one user):**
```
{ _id: ..., userId: "u1", amount: 100, createdAt: Jan 1, runningTotal: 100, orderRank: 1 }
{ _id: ..., userId: "u1", amount: 200, createdAt: Jan 5, runningTotal: 300, orderRank: 2 }
{ _id: ..., userId: "u1", amount: 50,  createdAt: Jan 10, runningTotal: 350, orderRank: 3 }
```

**Window functions:** `$rank`, `$denseRank`, `$rowNumber`, `$sum`, `$avg`, `$first`, `$last`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q80. What is $sample in aggregation?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$sample` randomly selects N documents from the input:

```js
// Select 3 random products
db.products.aggregate([
  { $sample: { size: 3 } }
])

// Random products from a specific category
db.products.aggregate([
  { $match: { category: "Electronics" } },
  { $sample: { size: 5 } }
])
```

**How it works:**
- For `size < 5%` of collection: uses random cursor (fast)
- For larger samples: sorts by random value (may need `allowDiskUse`)

**Use cases:** Random recommendations, feature product selection, A/B test sampling.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q81. What are MongoDB transactions?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Multi-document transactions** (MongoDB 4.0+) ensure ACID across multiple operations:

```js
const session = client.startSession()

try {
  session.startTransaction()

  await db.orders.insertOne(order, { session })
  await db.inventory.updateMany(
    { _id: { $in: items } },
    { $inc: { stock: -1 } },
    { session }
  )

  await session.commitTransaction()
} catch (err) {
  await session.abortTransaction()
  throw err
} finally {
  session.endSession()
}
```

**ACID properties:**
- **Atomicity** — all or nothing
- **Consistency** — data is valid after transaction
- **Isolation** — concurrent transactions don't interfere
- **Durability** — committed data persists

**Limitations:** 60-second default timeout, 16MB document limit per write.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q82. What are read concern and write concern?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Read concern** controls data consistency for reads:

| Level | Guarantee |
|-------|-----------|
| `local` | Returns latest data (default, fastest) |
| `majority` | Only returns data acknowledged by majority |
| `linearizable` | Most strict — reads most recent write |
| `available` | For sharded clusters (fastest, no guarantee) |

**Write concern** controls write acknowledgment:

| Level | Guarantee |
|-------|-----------|
| `w: 0` | Fire-and-forget (fastest, no ack) |
| `w: 1` | Acknowledged by primary (default) |
| `w: "majority"` | Acknowledged by majority of replica set |
| `w: "majority"`, `j: true` | Majority + journal (safest) |

```js
db.orders.insertOne(doc, { writeConcern: { w: "majority", j: true } })
db.orders.find().readConcern("majority")
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q83. What is the WiredTiger storage engine?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**WiredTiger** is the default MongoDB storage engine (since v3.2).

**Key features:**
```
Document-level Locking:
  Locks at document level (not collection/database)
  → Multiple writers on different docs simultaneously
  → Great write concurrency

Compression:
  Data: Snappy (default), zlib, zstd
  Index: Prefix compression
  → 60-80% disk space savings

Checkpoint System:
  Data written to disk in 60-second checkpoints
  Journal ensures durability between checkpoints

Cache:
  Default = 50% of RAM - 1GB
  (e.g., 16GB RAM → ~7GB WiredTiger cache)
```

```js
db.serverStatus().storageEngine
// { name: "wiredTiger", ... }

db.collection.stats()
// shows compression and cache stats
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q84. How do you use explain() for query analysis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```js
// Three verbosity modes
db.users.find({ email: "alice@example.com" }).explain("executionStats")

// Key output fields:
{
  executionStats: {
    executionTimeMillis: 2,       // total query time
    totalDocsExamined: 1,         // should be close to totalDocsReturned
    totalDocsReturned: 1,         // actual results
    executionStages: {
      stage: "IXSCAN",            // IXSCAN = good | COLLSCAN = bad
      indexName: "email_1"        // which index used
    }
  }
}
```

**What to look for:**
```
✅ stage: "IXSCAN"           → Using an index
❌ stage: "COLLSCAN"         → Full scan (needs index)
✅ totalDocsExamined ≈ totalDocsReturned  → Efficient
❌ totalDocsExamined >> totalDocsReturned → Low selectivity
✅ executionTimeMillis < 100             → Acceptable
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q85. What are performance best practices?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Schema Design:**
- Design schemas around query patterns (query-driven design)
- Embed data accessed together; reference growing data
- Denormalize for read-heavy workloads

**2. Indexing:**
- Index fields used in `find()`, `sort()`, and `$lookup foreignField`
- Use `explain()` to verify index usage
- Use ESR rule for compound index field ordering
- Avoid indexing low-cardinality fields (boolean, 2-value status)

**3. Queries:**
- Use projection — only fetch needed fields
- Put `$match` early in aggregation pipelines
- Avoid `$where` (can't use indexes)
- Avoid leading regex wildcards

**4. Operations:**
- Use bulk operations instead of loops
- Use `$inc`, `$push` instead of read-modify-write
- Use TTL indexes for expiring data
- Keep documents reasonably sized (< 1MB typically)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q86. What is the oplog in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **oplog** (operations log) is a **capped collection** in the `local` database that records all write operations. It's the foundation of **replication** in MongoDB.

**How it works:**
```
Primary: writes data → writes to oplog
Secondary: reads oplog → applies same operations locally
```

```js
// View oplog
use local
db.oplog.rs.find().sort({ $natural: -1 }).limit(1)

// Oplog entry example:
{
  "ts": Timestamp(1704067200, 1),    // timestamp
  "op": "i",                          // operation: i=insert, u=update, d=delete
  "ns": "myapp.users",               // namespace (database.collection)
  "o": { _id: 1, name: "Alice" },    // the document/operation
  "o2": { _id: 1 }                   // update condition (for updates)
}
```

**Key considerations:**
- Oplog size is configurable (default: 5% of free disk space, min 1GB, max 50GB)
- If secondaries fall too far behind, they go into RECOVERING state
- Monitor `lag` (replication delay) for healthy replication

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q87. What are change streams in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Change streams** allow applications to subscribe to real-time data changes:

```js
const changeStream = db.collection("users").watch()

changeStream.on("change", (change) => {
  console.log(change.operationType)  // "insert", "update", "replace", "delete"
  console.log(change.documentKey)    // { _id: ObjectId("...") }
  console.log(change.fullDocument)   // the affected document
})

// With pipeline — filter specific changes
const pipeline = [
  { $match: { "fullDocument.role": "admin" } }
]
const adminStream = db.collection("users").watch(pipeline)
```

**Features:**
- Resume via resume tokens
- Filter by operation type
- Available on replica sets and sharded clusters
- Ordered guarantees within a shard

**Use cases:** Real-time dashboards, notifications, cache invalidation, event-driven architectures.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q88. What is the Aggregation Pipeline performance optimization?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Key optimization strategies:**

1. **Put `$match` and `$limit` early** to reduce document flow:
```js
✅ { $match: ... }, { $limit: 100 }, { $group: ... }
```

2. **Use indexes for the first `$match`** (only stage that can use indexes)

3. **Pipeline sequencing:**
   - `$match` before `$project` (if filtering on original fields)
   - `$match` before `$sort` (reduces docs to sort)
   - `$project` before `$group` (reduces docs to process)

4. **Avoid large `$unwind` + `$group`** — can explode document count

5. **Use `allowDiskUse: true`** for large sorts/groupings:
```js
db.orders.aggregate([...], { allowDiskUse: true })
```

6. **Limit stages**: Each stage adds overhead. Fewer stages = faster pipeline.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q89. What are MongoDB indexes: single, compound, multikey?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Single field index:**
```js
db.users.createIndex({ email: 1 })  // ascending
```

**Compound index (multiple fields):**
```js
db.orders.createIndex({ userId: 1, createdAt: -1 })
// Supports queries on: userId, userId+createdAt
```

**Multikey index (on array fields):**
```js
// Automatically created when indexing an array field
db.users.createIndex({ skills: 1 })
// Each array element gets an index entry
// { skills: ["JS", "Python"] } → indexed as "JS" and "Python"
```

**Limitations:**
- A compound multikey index can have at most ONE array field
- Multikey indexes are larger (multiple entries per document)
- Cannot use multikey index for covered queries on array field

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q90. What are covered queries in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A **covered query** is satisfied entirely by an index — MongoDB doesn't need to examine documents:

```js
// Index: { name: 1, email: 1 }

// Covered query — all returned fields are in the index
db.users.find(
  { name: "Alice" },                    // filter uses indexed field
  { _id: 0, name: 1, email: 1 }        // only return indexed fields
).explain("executionStats")
// executionStages.stage: "PROJECTION_COVERED"
// totalDocsExamined: 0  (no document fetch needed!)
```

**Benefits:**
- **Extremely fast** — reads from index only (in memory)
- No document fetch (reduced I/O)

**Requirements for covered query:**
- All fields in filter must be in the index
- All fields in projection must be in the index
- `_id` must be explicitly excluded (`_id: 0`)
- No array field in the index (can't be covered)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q91. What are the different sharding strategies?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Ranged sharding** — data divided by value ranges:
```js
sh.shardCollection("myapp.users", { age: 1 })
// age 0-20 → shard 1, age 21-40 → shard 2, etc.
```
✅ Good for range queries on shard key
⚠️ Risk of uneven distribution (hot shard)

**Hashed sharding** — data evenly distributed via hash:
```js
sh.shardCollection("myapp.users", { userId: "hashed" })
// hash(userId) determines which shard
```
✅ Even distribution
❌ No efficient range queries

**Zone sharding** — data localized to specific shards:
```js
sh.addShardToZone("shard1", "US")
sh.updateZoneKeyRange("myapp.users", { region: "US" }, { region: "US" }, "US")
```
✅ Useful for geo-located data

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q92. What is the Bucket Pattern in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Bucket Pattern** groups related data into "buckets" to reduce document count for time-series or IoT data:

```js
// Without bucket — one document per reading
{ sensorId: "s1", ts: ISODate("2024-01-01T00:00:00"), temp: 25.1 }
{ sensorId: "s1", ts: ISODate("2024-01-01T00:01:00"), temp: 25.3 }
// ← 1440 documents per day per sensor!

// With bucket pattern — group readings into time windows
{
  sensorId: "s1",
  date: ISODate("2024-01-01"),
  readings: [
    { ts: ISODate("2024-01-01T00:00:00"), temp: 25.1 },
    { ts: ISODate("2024-01-01T00:01:00"), temp: 25.3 },
    // ... up to N readings per bucket
  ],
  readingCount: 1440,
  avgTemp: 25.2
}
// ← 1 document per day per sensor!
```

**Benefits:** Fewer documents, better index usage, pre-computed aggregates.

**Use cases:** IoT sensor data, stock tickers, log aggregation, analytics.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q93. What is the Computed Pattern in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Computed Pattern** pre-computes expensive calculations at write time to avoid doing them at read time:

```js
// Without computed pattern — compute on every read
db.orders.aggregate([
  { $group: { _id: "$userId", total: { $sum: "$amount" } } }
])  // ← Expensive! Scans all orders every time

// With computed pattern — store pre-computed totals
{
  userId: ObjectId("u1"),
  totalSpent: 25000,         // ← pre-computed
  orderCount: 15,
  lastOrderDate: ISODate("2024-06-01"),
  averageOrderValue: 1666.67
}
```

**How to implement:**
1. Update computed fields on each relevant write
2. Or use a periodic aggregation → `$merge` into a summary collection
3. Or use `$merge` within the aggregation pipeline

**Use cases:** User stats, dashboard summaries, leaderboards, inventory counts.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q94. How do you handle schema migrations in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Since MongoDB is schema-less, migrations can be done incrementally:

**Method 1: Lazy migration (update on read):**
```js
app.get('/api/users/:id', async (req, res) => {
  let user = await User.findById(req.params.id)

  // Migrate old field format on access
  if (user.fullName && !user.firstName) {
    const [first, ...last] = user.fullName.split(' ')
    user.firstName = first
    user.lastName = last.join(' ')
    delete user.fullName
    await user.save()
  }

  res.json(user)
})
```

**Method 2: Batch migration script:**
```js
const batch = async () => {
  let processed = 0
  const cursor = User.find({ fullName: { $exists: true } }).cursor()

  for (let user = await cursor.next(); user != null; user = await cursor.next()) {
    const [first, ...last] = user.fullName.split(' ')
    await User.updateOne(
      { _id: user._id },
      { $set: { firstName: first, lastName: last.join(' ') }, $unset: { fullName: "" } }
    )
    processed++
  }
  console.log(`Migrated ${processed} users`)
}
```

**Key principle:** Add new fields alongside old ones, then remove old fields after confirming.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q95. What is the Subset Pattern in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Subset Pattern** stores a small subset of commonly accessed data within a document to reduce loading full documents:

```js
// Instead of loading full product with 1000 reviews:
{
  _id: ObjectId("p1"),
  name: "Laptop",
  price: 75000,
  avgRating: 4.5,
  reviewCount: 5000,
  recentReviews: [           // ← Only last 5 reviews
    { userId: "u1", text: "Great!", rating: 5 },
    { userId: "u2", text: "Good", rating: 4 },
    // ... 3 more
  ],
  // Full reviews stored in separate collection
}
```

**Benefits:**
- Less data loaded for listing pages
- Faster page loads for product cards, user profiles
- Full data still available via separate collection/query

**Use cases:** Recent activity, top comments, preview data.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q96. What are MongoDB indexes: partial, sparse, and TTL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Partial index** — only indexes documents matching a filter:
```js
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { isActive: true } }
)
// Smaller index, faster queries for active users
```

**Sparse index** — only indexes documents where the field exists:
```js
db.users.createIndex(
  { phone: 1 },
  { sparse: true }
)
// Useful when field exists only on some documents
```

**TTL index** — auto-deletes documents after a time:
```js
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)
// Documents auto-deleted 1 hour after createdAt
```

**Use cases:**
- Partial: Filtered queries (e.g., active users only)
- Sparse: Optional fields (e.g., phone number)
- TTL: Temporary data (sessions, cache, logs)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q97. What is ACID compliance in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

MongoDB 4.0+ provides **multi-document ACID transactions**.

**ACID guarantees:**

| Property | MongoDB Implementation |
|----------|----------------------|
| **Atomicity** | Transaction commits all or aborts all |
| **Consistency** | Schema validation enforced within transactions |
| **Isolation** | Snapshot isolation — reads see consistent state |
| **Durability** | Write concern `majority` with journaling |

**Before 4.0:** MongoDB had single-document ACID (operations on one document were atomic).

**Single-document atomicity:**
```js
// This entire update is atomic — either all fields update or none
db.users.updateOne(
  { _id: ObjectId("...") },
  { $inc: { balance: -100 }, $push: { transactions: { amount: -100 } } }
)
```

**Multi-document transactions** extend ACID across multiple documents/collections.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q98. How do MongoDB indexes affect write performance?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Every index slows down writes** because indexes must be updated on every insert/update/delete.

```js
// Collection with no indexes: fast writes
db.rawLogs.insertOne(data)
// → 1 write operation

// Collection with 5 indexes: slower writes
db.orders.insertOne(order)
// → 1 write + 5 index updates = 6 operations
```

**Index overhead guidelines:**
- Each additional index adds ~5-15% write overhead
- Limit indexes to those actually used by queries
- Remove unused indexes (check with `indexStats()`)

**Strategies to reduce index impact:**
- Batch writes in bulk operations
- Use sparse/partial indexes where applicable
- Drop unused indexes during large migrations
- Use background index builds for live environments

```js
db.orders.indexStats()  // check index usage stats
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q99. What is the Aggregation Pipeline stage order optimization?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Optimal stage ordering for performance:**

```
$match (early, uses indexes)
  → $sort (before $group if sorting input)
    → $limit (reduce document count)
      → $project (reduce document size)
        → $unwind (if needed)
          → $lookup (fewer docs to join)
            → $group
              → $sort (on aggregated data)
                → $limit
                  → $project (final shape)
```

**Special optimizations:**

1. **`$sort` + `$limit`** — MongoDB optimizes to a "top N" sort (keeps only N items in memory)
```js
✅ db.products.aggregate([
  { $sort: { price: -1 } },
  { $limit: 10 }  // only sorts top 10, not all!
])
```

2. **Co-located `$match` + `$sort`** — uses index for both
```js
// Index: { status: 1, createdAt: -1 }
✅ { $match: { status: "active" } },
   { $sort: { createdAt: -1 } }  // uses same index
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q100. What is GeoJSON and geospatial queries in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

MongoDB supports geospatial queries for location-based data:

```js
// Store location as GeoJSON
db.places.insertOne({
  name: "Central Park",
  location: {
    type: "Point",
    coordinates: [-73.9654, 40.7829]  // [longitude, latitude]
  }
})

// Create 2dsphere index
db.places.createIndex({ location: "2dsphere" })

// Find places near a point (within 1km)
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-73.97, 40.78] },
      $maxDistance: 1000,  // meters
      $minDistance: 0
    }
  }
})

// Find within a polygon
db.places.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[[ -74, 40 ], [ -73, 40 ], [ -73, 41 ], [ -74, 41 ], [ -74, 40 ]]]
      }
    }
  }
})
```

**GeoJSON types:** Point, LineString, Polygon, MultiPoint, MultiPolygon, GeometryCollection.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q101. What is the role of mongos in sharded clusters?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**mongos** is the query router in a sharded cluster. It acts as the interface between applications and shards.

**Responsibilities:**
```
Application → mongos → config servers (metadata)
                  ↓
           which shard has the data?
                  ↓
           → shard 1, shard 2, etc.
```

**How it works:**
1. Application connects to mongos (not directly to shards)
2. mongos looks up routing info from config servers
3. Routes queries to appropriate shards
4. Merges results from multiple shards

**Key points:**
- Usually run **multiple mongos** for high availability
- Stateless — can be restarted without data loss
- Routes based on **shard key**
- Can merge sort results from multiple shards

```js
// Connect to mongos (port 27017 by default)
mongosh --host mongos1.example.com --port 27017
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q102. What is MongoDB Atlas?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**MongoDB Atlas** is MongoDB's fully-managed cloud database service.

**Features:**
- **Multi-cloud** — deploy on AWS, Azure, GCP
- **Automated operations** — backups, patching, scaling
- **Global clusters** — distribute data across regions
- **Built-in monitoring** — metrics, alerts, performance advisor
- **Atlas Search** — Lucene-based full-text search
- **Atlas Data Lake** — query data in S3/Azure Blob
- **Serverless instances** — auto-scale to zero

**Connection:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp
```

**Tiers:**
- **M0** — Free (512MB storage, shared RAM)
- **M2/M5** — Shared clusters (low cost)
- **M10+** — Dedicated clusters (production)
- **Serverless** — Pay-per-use, auto-scale

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q103. What is the Outlier Pattern in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Outlier Pattern** handles documents that don't follow normal data patterns (e.g., users with extreme amounts of data).

```js
// Normal user — references in a separate collection
{
  _id: ObjectId("u1"),
  name: "Alice",
  orderIds: [ObjectId("o1"), ObjectId("o2")]  // ~10 orders
}

// Outlier user — millions of orders
{
  _id: ObjectId("u_power_user"),
  name: "Bob",
  orderIds: []  // empty — can't store millions of refs
}
// Additional collection for outliers:
// { _id: ObjectId("bp1"), userId: ObjectId("u_power_user"),
//   orderIds: [ObjectId("o1"), ..., ObjectId("o1000000")] }
```

**Why needed:** Normal patterns break at scale. For example:
- A social media user with 10M followers
- A company with 1M employees
- A product with 500K reviews

**Solution:** Detect outliers and handle them differently — different schema, separate collection, or paginated access.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q104. How do you handle soft deletes in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Soft delete** marks a document as deleted without physically removing it:

```js
// Add isDeleted and deletedAt fields
{
  _id: ObjectId("..."),
  name: "Alice",
  isDeleted: false,
  deletedAt: null
}

// Soft delete — mark as deleted
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { isDeleted: true, deletedAt: new Date() } }
)

// Exclude soft-deleted from queries
db.users.find({ isDeleted: { $ne: true } })

// Or create a partial index for queries
db.users.createIndex(
  { name: 1, email: 1 },
  { partialFilterExpression: { isDeleted: false } }
)

// Hard delete old soft-deleted records (cleanup)
db.users.deleteMany({ isDeleted: true, deletedAt: { $lt: cutoffDate } })
```

**Pros:** Recoverable, audit trail, no data loss
**Cons:** More data, need to filter everywhere

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q105. How do you use $redact for field-level security?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$redact` restricts document content based on data sensitivity:

```js
// Document with security levels
{
  _id: 1,
  title: "Public Post",
  tags: ["general"],
  classification: "public",
  confidential: { _id: 2, text: "Secret info", classification: "confidential" }
}

// Query — user with "confidential" clearance
db.posts.aggregate([
  { $match: { _id: 1 } },
  { $redact: {
    $cond: {
      if:   { $eq: ["$classification", "confidential"] },
      then: "$$PRUNE",    // remove this field
      else: "$$DESCEND"   // keep and check nested docs
    }
  }}
])
// Result: only public fields shown, confidential fields removed
```

**Access levels:**
- `$$DESCEND` — keep the field, continue checking nested
- `$$PRUNE` — remove the field entirely
- `$$KEEP` — keep the field, stop checking

**Note:** For serious security, use server-side field-level security (not client-side).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q106. What is the difference between wiredTiger cache and system cache?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

MongoDB uses two levels of caching:

**WiredTiger Internal Cache:**
- Default: 50% of (RAM - 1GB)
- Stores uncompressed data pages
- Eviction is page-based (LRU)
- Configured: `wiredTigerCacheSizeGB`

**Filesystem Cache:**
- OS-level cache (uses available free memory)
- Stores compressed data pages
- MongoDB "touches" pages -> OS caches them

**Why both?**
```
WiredTiger Cache (uncompressed) ← fast reads
       ↓ eviction (when full)
Filesystem Cache (compressed) ← on disk format, smaller
       ↓ eviction
Disk
```

**Memory sizing:**
- WiredTiger cache: ~50% of RAM
- Filesystem cache: remaining available memory
- Working set (indexes + hot data) should fit in RAM

**Check cache usage:**
```js
db.serverStatus().wiredTiger.cache
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q107. What is the Aggregation $merge stage for incremental ETL?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`$merge` enables **incremental ETL (Extract, Transform, Load)** by merging new results into existing collections:

```js
// Daily sales summary — incremental update
db.orders.aggregate([
  // Only process today's orders
  { $match: { createdAt: { $gte: today_start } } },

  // Aggregate by product
  { $group: {
    _id: "$productId",
    dailyRevenue: { $sum: "$amount" },
    orderCount: { $sum: 1 }
  }},

  // Merge with existing product_sales collection
  { $merge: {
    into: "product_sales",
    on: "_id",                    // match on productId
    whenMatched: [{
      $addFields: {
        totalRevenue: { $add: ["$totalRevenue", "$dailyRevenue"] },
        dailyRevenue: "$dailyRevenue",
        lastUpdated: "$$NOW"
      }
    }],
    whenNotMatched: "insert"
  }}
])
```

**Benefits:**
- Process only new/changed data each run
- Don't reprocess historical data
- Allows real-time aggregations

**Comparison:**
- `$out`: replaces entire collection (not incremental)
- `$merge`: merges with existing data (incremental)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q108. How do you handle concurrency control in MongoDB?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Document-level locking** and **optimistic concurrency control:**

**1. Atomic operators (no lock needed):**
```js
// $inc is atomic — safe for concurrent increments
db.products.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stock: -1 } }  // won't cause race condition
)
```

**2. findAndModify for queue-like operations:**
```js
// Atomically get next task and mark it processing
const task = db.tasks.findOneAndUpdate(
  { status: "pending" },
  { $set: { status: "processing", workerId: process.pid } },
  { sort: { priority: -1 }, returnDocument: "after" }
)
```

**3. Optimistic concurrency with version field:**
```js
// Schema: { _id: 1, balance: 100, version: 1 }

const update = await db.accounts.updateOne(
  { _id: 1, version: currentVersion },  // check version hasn't changed
  { $inc: { balance: -50 }, $inc: { version: 1 } }
)

if (update.modifiedCount === 0) {
  // Someone else modified the document — retry
}
```

**4. Transactions for multi-document operations:**
```js
const session = client.startSession()
session.startTransaction()
// ... multiple operations
await session.commitTransaction()
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q109. What is the role of the config database in sharding?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **config database** (`config`) stores metadata about the sharded cluster. It's hosted on **config servers** (replica set).

**Key collections in config:**

```js
// Chunk distribution
db.config.chunks.find().limit(1)
// { _id: "myapp.users-userId_1-MinKey", shard: "shard1", min: { userId: MinKey }, max: { userId: -123456789 } }

// Shard list
db.config.shards.find()
// { _id: "shard1", host: "shard1.example.com:27018" }

// Databases
db.config.databases.find()
// { _id: "myapp", primary: "shard1", partitioned: true }

// Collections
db.config.collections.find()
// { _id: "myapp.users", key: { userId: "hashed" }, ... }

// Settings
db.config.settings.find()
// { _id: "balancer", enabled: true }
```

**Config server failure = cluster unavailability.** Always run config servers as a 3-member replica set.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q110. How do you choose between MongoDB and SQL databases?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Choose MongoDB when:**
- Schema is flexible or evolves frequently
- Need horizontal scaling (sharding) natively
- Data is document-oriented (JSON-like)
- High write throughput needed
- Rapid prototyping and agile development
- Polyglot data (different documents, different fields)
- Hierarchical/embedded data relationships

**Choose SQL when:**
- Strict, fixed schema (banking, accounting)
- Complex JOINs and relationships
- Strong ACID compliance critical
- Complex aggregations with GROUP BY, window functions
- Well-established relational data model
- Reporting/BI tools need SQL interface
- Need for strict referential integrity

**When both:**
Use MongoDB for core app data, SQL for reporting/analytics. Many modern apps use both (polyglot persistence).

</div>
</details>

---

## 🔴 Hard (Q111–Q155)

<details class="qa-card qa-hard">
<summary>
Q111. How does MongoDB handle election and failover in replica sets?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

When the primary fails, secondaries hold an **election** to select a new primary.

**Election process:**
1. **Detection** — secondaries detect primary is unreachable (no heartbeat in 10 seconds)
2. **Call for election** — a secondary starts an election
3. **Voting** — each node votes based on priority and oplog freshness
4. **New primary** — the node with highest priority that's up-to-date wins
5. **Rollback** — old primary's unreplicated writes are rolled back (stored in separate files)

**Voting members** must be an odd number:
- 3 members: standard (1 primary + 2 secondaries)
- 3 members: 2 regular + 1 arbiter (no data, just vote)
- 5 members: 3 regular + 2 secondaries

```js
// Configure priority (higher = more likely to become primary)
cfg = rs.conf()
cfg.members[1].priority = 2  // make node2 primary
rs.reconfig(cfg)
```

**Election triggers:**
- Primary loses connection to majority
- Primary steps down (maintenance)
- A higher-priority secondary becomes available

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q112. What is the balancer in sharded clusters?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **balancer** is a background process that keeps data evenly distributed across shards by moving chunks.

**How it works:**
1. Monitors chunk distribution across shards
2. When one shard has significantly more chunks than others, migration begins
3. **Chunk migration** — copies chunk data to new shard, then updates metadata
4. Balancer runs by default on mongos

**Balancer operations:**
```js
// Check balancer state
sh.getBalancerState()

// Enable/disable
sh.startBalancer()
sh.stopBalancer()

// Set balancing window (off-peak hours)
db.settings.updateOne(
  { _id: "balancer" },
  { $set: {
    activeWindow: { start: "02:00", stop: "06:00" },
    _id: "balancer"
  }},
  { upsert: true }
)

// Check chunk distribution
sh.status()
```

**Chunk size:** Default is 128MB. Smaller = more even distribution but more migrations. Larger = fewer migrations but potential hotspots.

**Note:** Balancing happens in background and shouldn't affect normal operations.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q113. What is the Aggregation $mergeObjects operator?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`$mergeObjects` combines multiple documents into one — useful for merging fields from different sources:

```js
// Merge two objects
{ $project: {
  fullDoc: { $mergeObjects: ["$base", "$override"] }
}}
// base: { a: 1, b: 2 }, override: { b: 3, c: 4 }
// Result: { a: 1, b: 3, c: 4 }  (override wins)

// Merge nested address to root level
{ $replaceRoot: {
  newRoot: { $mergeObjects: ["$$ROOT", "$address"] }
}}
// Promotes address.city, address.pin to root

// Aggregate user settings with defaults
{ $project: {
  settings: { $mergeObjects: [
    { theme: "light", lang: "en", notifications: true },  // defaults
    "$userSettings"                                        // user overrides
  ]
}}}

// Merge with dynamic fields
{ $group: {
  _id: "$category",
  merged: { $mergeObjects: { $last: "$$ROOT" } }
}}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q114. How do you choose a shard key?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Choosing the right shard key is the most important sharding decision. Bad shard keys cause hotspots and performance issues.

**Characteristics of a good shard key:**

1. **High cardinality** — many unique values
   - ✅ `userId` (millions of unique values)
   - ❌ `status` (only 3-5 values)

2. **Even distribution** — values spread evenly
   - ✅ Hashed `userId` — even random distribution
   - ❌ `createdAt` — all new data goes to one shard (monotonically increasing)

3. **Query isolation** — queries should target a single shard
   - ✅ `find({ userId: "u123" })` → hits 1 shard
   - ❌ `find({ name: "Alice" })` → hits ALL shards (scatter-gather)

**Common strategies:**
```js
// Hashed shard key (best for general purpose)
sh.shardCollection("myapp.events", { eventId: "hashed" })

// Compound shard key (for range + distribution)
sh.shardCollection("myapp.orders", { userId: 1, createdAt: 1 })

// Ranged shard key (for geo-partitioning)
sh.shardCollection("myapp.users", { region: 1, _id: 1 })
```

**Avoid:**
- Monotonically increasing keys (timestamp, auto-increment)
- Low-cardinality keys (boolean, status enum)
- Keys that can't be used for common queries

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q115. What are MongoDB anti-patterns?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Common MongoDB anti-patterns and how to fix them:**

**1. Unbounded arrays**
```js
// ❌ Anti-pattern: array that grows without limit
{ userId: "u1", orders: [o1, o2, ..., o10000] }  // hits 16MB limit!

// ✅ Fix: Reference instead — store orders in separate collection
{ userId: "u1" }
// orders collection: { userId: "u1", ... }
```

**2. No indexes on query fields**
```js
// ❌ Full collection scan on every query
db.users.find({ email: "alice@example.com" })

// ✅ Fix: Index the field
db.users.createIndex({ email: 1 })
```

**3. Massive document sizes (> 1MB)**
```js
// ❌ Storing entire post history + comments in user doc
// ✅ Fix: Separate into posts and comments collections
```

**4. Using MongoDB for JOIN-heavy relational data**
```js
// ❌ Too many $lookup stages slow everything down
// ✅ Consider embedding or using a relational DB
```

**5. Separate collections for every variation**
```js
// ❌ logs_2024_01, logs_2024_02, logs_2024_03
// ✅ Use single collection with date field + index
```

**6. $where queries**
```js
// ❌ db.users.find({ $where: "..." }) — can't use indexes
// ✅ Use $expr or restructure the schema
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q116. How do MongoDB backup and restore work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Backup strategies:**

**1. mongodump (logical backup):**
```bash
# All databases
mongodump --out /backup/$(date +%Y%m%d)

# Single database
mongodump --db myapp --out /backup/myapp

# With auth
mongodump --uri "mongodb://user:pass@host:27017" --out /backup
```

**2. File system snapshot (physical backup):**
```bash
# LVM snapshot (Linux)
lvcreate --size 100G --snapshot --name mdb_snap /dev/vg/mongodb
mount /dev/vg/mdb_snap /mnt/snapshot
# Copy files from snapshot
umount /mnt/snapshot
lvremove /dev/vg/mdb_snap
```

**3. Atlas backup (managed):**
- Continuous backups (every 6-24 hours)
- Point-in-time recovery (PITR) — restore to any second in last 7 days

**Restore:**
```bash
mongorestore --drop /backup/20240101     # restores all
mongorestore --db myapp /backup/myapp    # single database
```

**Key considerations:**
- mongodump affects performance — run during low traffic
- For sharded clusters, use Atlas or file system snapshots
- Always test backups by restoring to a dev environment

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q117. How does MongoDB handle cross-shard queries?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Cross-shard queries** (scatter-gather) hit multiple shards and merge results:

```js
// Targeted query (efficient) — goes to ONE shard
db.orders.find({ userId: "u123" })
// mongos routes directly to the shard containing userId "u123"

// Scatter-gather query (inefficient) — goes to ALL shards
db.orders.find({ status: "pending" })
// mongos broadcasts to ALL shards, merges results
```

**Performance implications:**
```
Simple query (targeted):
  Request → mongos → 1 shard → response → 1 network hop

Scatter-gather:
  Request → mongos → ALL shards → merge results → response
                     ↓
              Each shard executes query
              mongos merges & sorts
```

**Minimizing cross-shard queries:**
1. Always include shard key in queries
2. Use hashed shard key for even distribution + targeted lookups
3. Compound shard keys: include high-cardinality prefix

**Aggregation on sharded collections:**
- `$match` + `$group` → first merged on each shard, then merged on mongos
- Pipeline split: parts that can run on shards + final merge on mongos

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q118. What is the Aggregation $convert and type conversion?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`$convert` converts fields between BSON types with error handling:

```js
// $convert with error handling
{ $project: {
  age: { $convert: {
    input: "$age",
    to: "int",
    onError: 0,        // default if conversion fails
    onNull: null       // value if input is null
  }}
}}

// $toInt — shorthand
{ $project: { age: { $toInt: "$age" } } }

// Type conversion operators:
// $toInt, $toLong, $toDouble, $toDecimal, $toString
// $toDate, $toObjectId, $toBool, $toArray

// Handling mixed types
db.users.aggregate([{ $project: {
  normalizedAge: {
    $switch: {
      branches: [
        { case: { $eq: [{ $type: "$age" }, "string"] }, then: { $toInt: "$age" } },
        { case: { $eq: [{ $type: "$age" }, "int"] }, then: "$age" },
        { case: { $eq: [{ $type: "$age" }, "double"] }, then: { $toInt: "$age" } }
      ],
      default: 0
    }
  }
}}])
```

**Common use cases:** Fixing data type inconsistencies, normalizing data from different sources.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q119. How does MongoDB Atlas Search work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Atlas Search** is MongoDB's built-in full-text search powered by Apache Lucene (same engine as Elasticsearch).

**Create search index:**
```json
{
  "mappings": {
    "fields": {
      "name": {
        "type": "string",
        "analyzer": "lucene.standard"
      },
      "description": {
        "type": "string",
        "analyzer": "lucene.english"
      },
      "price": {
        "type": "number"
      },
      "category": {
        "type": "string",
        "facet": true
      }
    }
  }
}
```

**Search queries:**
```js
// Basic text search with relevance scoring
db.products.aggregate([{
  $search: {
    text: {
      query: "wireless bluetooth",
      path: ["name", "description"]
    }
  }
}])

// Autocomplete
db.products.aggregate([{
  $search: {
    autocomplete: {
      query: "wirel",
      path: "name"
    }
  }
}])

// Faceted search (with counts)
db.products.aggregate([{
  $searchMeta: {
    facet: {
      operator: { text: { query: "laptop", path: "name" } },
      facets: {
        category: { type: "string", path: "category" }
      }
    }
  }
}])
```

**Atlas Search vs $text:**
- Atlas Search: Lucene-based, supports fuzzy, autocomplete, synonyms, facets
- $text: Built-in, simpler, limited features

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q120. What are MongoDB security best practices?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Authentication and authorization:**
```js
// Enable authentication in mongod config
// security:
//   authorization: "enabled"

// Create admin user
db.createUser({
  user: "admin",
  pwd: passwordPrompt(),
  roles: ["root"]
})

// Create application user (least privilege)
db.createUser({
  user: "app_user",
  pwd: passwordPrompt(),
  roles: [
    { role: "readWrite", db: "myapp" },
    { role: "read", db: "logs" }
  ]
})
```

**Network security:**
- Bind to specific IPs, not 0.0.0.0
- Use firewalls/VPCs
- Enable TLS/SSL for connections
- Use mongod `--tlsMode requireTLS`

**Encryption:**
- **At-rest encryption** — WiredTiger encryption at rest
- **In-transit encryption** — TLS/SSL
- **Client-side field-level encryption** — encrypt specific fields

**Other practices:**
- Enable auditing (`auditLog`)
- Regularly rotate passwords
- Use SCRAM or LDAP/X.509 authentication
- Run mongod as non-root user
- Keep MongoDB version updated
- Use `localhost` exception only for initial setup

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q121. What is client-side field-level encryption (FLE)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Client-Side Field Level Encryption (FLE)** encrypts specific fields before they leave the application — the database never sees the plaintext.

```js
// Configure FLE
const client = new MongoClient(uri, {
  autoEncryption: {
    keyVaultNamespace: "encryption.__keyVault",
    kmsProviders: {
      local: {
        key: localMasterKey  // 96-byte base64 key
      }
    },
    schemaMap: {
      "myapp.users": {
        bsonType: "object",
        encryptProperties: {
          "ssn": {
            encrypt: {
              keyId: [uuid],
              bsonType: "string",
              algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
            }
          }
        }
      }
    }
  }
})

// Insert — ssn is encrypted before sending to MongoDB
await db.users.insertOne({
  name: "Alice",
  ssn: "123-45-6789"  // automatically encrypted
})

// Query — encryption is transparent
const user = await db.users.findOne({ name: "Alice" })
// user.ssn is decrypted automatically
```

**Benefits:** End-to-end encryption, database admins can't read encrypted fields, compliance (HIPAA, GDPR).

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q122. How do MongoDB time series collections work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Time Series Collections** (MongoDB 5.0+) are optimized for storing time-stamped data:

```js
// Create time series collection
db.createCollection("weather", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",       // optional — for filtering
    granularity: "seconds"       // "seconds", "minutes", "hours"
  }
})

// Insert — automatically bucketed
db.weather.insertMany([
  { timestamp: ISODate("2024-01-01T00:00:00"), metadata: { sensor: "s1" }, temp: 25.1 },
  { timestamp: ISODate("2024-01-01T00:01:00"), metadata: { sensor: "s1" }, temp: 25.3 },
])

// Query normally
db.weather.find({
  timestamp: { $gte: ISODate("2024-01-01"), $lt: ISODate("2024-01-02") },
  "metadata.sensor": "s1"
})

// Aggregation
db.weather.aggregate([
  { $match: { "metadata.sensor": "s1" } },
  { $group: { _id: { $dateTrunc: { date: "$timestamp", unit: "hour" } }, avgTemp: { $avg: "$temp" } } }
])
```

**Benefits:**
- Automatic bucketing (handles the Bucket Pattern internally)
- Better compression
- Optimized for append-heavy workloads
- No need to manually manage bucketing logic

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q123. How does MongoDB handle read/write isolation levels?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

MongoDB provides configurable isolation levels:

**Read Concern (consistency of reads):**
```
"local"         → read latest data (fastest, default)
"available"     → read latest from each shard (sharded clusters)
"majority"      → read data committed by majority
"linearizable"  → read most recent write (strictest, slowest)
```

**Write Concern (durability of writes):**
```
w: 0            → fire-and-forget (fastest, no ack)
w: 1            → acknowledged by primary (default)
w: "majority"   → acknowledged by majority (safest)
j: true         → written to journal
```

**Read Preference (where reads go in replica sets):**
```
primary            → all reads to primary (strong consistency)
primaryPreferred   → primary, fallback to secondary
secondary          → all reads to secondary (scale reads)
secondaryPreferred → secondary, fallback to primary
nearest            → lowest latency node
```

```js
// In production
db.orders.insertOne(order, { writeConcern: { w: "majority", j: true } })
db.orders.find().readConcern("majority").readPref("secondaryPreferred")
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q124. How do you monitor MongoDB performance?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Monitoring tools and metrics:**

**1. mongostat — real-time operations:**
```bash
mongostat --host localhost --port 27017 1
# Shows: inserts, queries, updates, deletes, conn, qrw, arw, %dirty, %used
```

**2. mongotop — read/write activity:**
```bash
mongotop 5  # refresh every 5 seconds
# Shows: total, read, write time per collection
```

**3. db.serverStatus() — comprehensive stats:**
```js
db.serverStatus().connections   // connection count
db.serverStatus().opcounters    // operations breakdown
db.serverStatus().network       // bytes in/out
db.serverStatus().mem           // memory usage
db.serverStatus().extra_info    // page faults
db.serverStatus().asserts       // error asserts
```

**4. Slow query monitoring:**
```js
// Enable profiler
db.setProfilingLevel(1, { slowms: 100 })  // log queries > 100ms

// View slow queries
db.system.profile.find({ millis: { $gt: 1000 } }).sort({ ts: -1 }).limit(10)

// Disable profiler
db.setProfilingLevel(0)
```

**5. Key metrics to watch:**
- **Page faults** — working set doesn't fit in memory
- **Queue (qrw)** — operations waiting for locks
- **%dirty** — WiredTiger eviction pressure (> 20% = trouble)
- **Scatter-gather ratio** — if high, improve shard key

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q125. What are MongoDB's $map and $filter for array transformations?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`$map`** transforms each element of an array:
```js
// Apply discount to all items
{ $project: {
  items: {
    $map: {
      input: "$items",
      as: "item",
      in: {
        name: "$$item.name",
        price: { $multiply: ["$$item.price", 0.9] },  // 10% off
        quantity: "$$item.quantity"
      }
    }
  }
}}

// Convert all prices from INR to USD
{ $addFields: {
  pricesUSD: {
    $map: {
      input: "$pricesINR",
      as: "price",
      in: { $divide: ["$$price", 83] }
    }
  }
}}
```

**`$filter`** selects elements matching a condition:
```js
// Only keep items with price > 100
{ $project: {
  expensiveItems: {
    $filter: {
      input: "$items",
      as: "item",
      cond: { $gt: ["$$item.price", 100] }
    }
  }
}}

// Filter active users from array
{ $project: {
  activeUsers: {
    $filter: {
      input: "$users",
      as: "user",
      cond: { $eq: ["$$user.isActive", true] }
    }
  }
}}
```

**`$$this`** refers to the current element (when `as` is omitted):
```js
{ $map: { input: "$arr", in: { $multiply: ["$$this", 2] } } }
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q126. How do you handle schema evolution in MongoDB?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

MongoDB's schema-less design makes schema evolution easier than SQL, but still requires strategy:

**1. Additive changes (safe, backward-compatible):**
```js
// Add new optional field — old documents work fine
// Schema now has 'phone', old docs without 'phone' still valid

// Application code handles both:
if (user.phone) {
  // new field
}
```

**2. Deprecation (dual-write):**
```js
// Write both old and new field during migration
db.users.updateOne(
  { _id: id },
  { $set: {
    fullName: "Alice Johnson",     // new field
    firstName: "Alice",            // old field (still needed)
    lastName: "Johnson"            // old field (still needed)
  }}
)

// Read: prefer new field, fallback to old
const name = user.fullName || `${user.firstName} ${user.lastName}`
```

**3. Batch migration:**
```js
// One-time script to migrate all documents
const batch = async () => {
  const cursor = db.users.find({ fullName: { $exists: true }, firstName: { $exists: false } })

  while (await cursor.hasNext()) {
    const user = await cursor.next()
    const [first, ...last] = user.fullName.split(' ')
    db.users.updateOne(
      { _id: user._id },
      { $set: { firstName: first, lastName: last.join(' ') } }
    )
  }

  // After confirming all migrated, remove old field
  db.users.updateMany({}, { $unset: { fullName: "" } })
}
```

**4. Version field:**
```js
// Include schema version for major changes
{ _id: 1, schemaVersion: 2, ... }

// Handle multiple versions in code
switch (doc.schemaVersion) {
  case 1: return migrateV1toV2(doc)
  case 2: return doc
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q127. What is the relationship between MongoDB and the CAP theorem?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **CAP theorem** states a distributed system can only guarantee 2 of 3: **Consistency**, **Availability**, and **Partition Tolerance**.

**MongoDB is CP (Consistency + Partition Tolerance) by default:**

```
CAP Triangle:
        Consistency
           / \
          /   \
         /     \
  Availability — Partition Tolerance

MongoDB default: CP
  - Strong consistency (read concern "majority")
  - When partition occurs, secondary waits for consistency
  - May reject reads during failover (not available)
```

**Configurable trade-offs:**

| Configuration | Type | Use Case |
|--------------|------|----------|
| Write concern: w=1, Read prefs: primary | CP | Strong consistency |
| Write concern: w="majority", Read concern: "majority" | CP+ | Durable consistency |
| Read prefs: secondaryPreferred | AP | Read scale, eventual consistency |
| Write concern: w=0 | AP | Fire-and-forget writes |

**MongoDB in practice:**
- Default behavior: **CP** — prefers consistency over availability
- Can be tuned to **AP** with relaxed read/write concerns
- Replica sets provide **high availability** within CP model (automatic failover)
- Sharding adds **horizontal scalability** while maintaining CP per shard

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q128. How does MongoDB's aggregation $let and $accumulator work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`$let`** defines variables for use within an expression:
```js
{ $project: {
  discounted: {
    $let: {
      vars: { discount: { $multiply: ["$price", 0.1] } },
      in: { $subtract: ["$price", "$$discount"] }
    }
  }
}}

// With multiple variables
{ $project: {
  profit: {
    $let: {
      vars: {
        revenue: { $multiply: ["$price", "$quantity"] },
        cost: { $multiply: ["$costPrice", "$quantity"] }
      },
      in: { $subtract: ["$$revenue", "$$cost"] }
    }
  }
}}
```

**`$accumulator`** defines custom accumulators using JavaScript (for complex calculations):
```js
db.scores.aggregate([{ $group: {
  _id: "$team",
  medianScore: {
    $accumulator: {
      init: function() { return [] },
      accumulate: function(state, score) { return state.concat([score]) },
      accumulateArgs: ["$score"],
      merge: function(s1, s2) { return s1.concat(s2) },
      finalize: function(state) {
        state.sort()
        const mid = Math.floor(state.length / 2)
        return state.length % 2 ? state[mid] : (state[mid-1] + state[mid]) / 2
      },
      lang: "js"
    }
  }
}}])
```

**Note:** `$accumulator` runs JavaScript — use sparingly. Prefer built-in accumulators when possible.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q129. How do you manage MongoDB connections in Node.js?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Connection pooling** — reuse connections for performance:

```js
// Native driver
const { MongoClient } = require('mongodb')

const client = new MongoClient(uri, {
  maxPoolSize: 10,         // max connections in pool
  minPoolSize: 1,          // keep at least 1 connection
  maxIdleTimeMS: 30000,    // close idle connections after 30s
  waitQueueTimeoutMS: 5000 // timeout waiting for connection
})

// Single connection for the application lifetime
let cachedClient = null

async function getClient() {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri)
    cachedClient.on('error', () => { cachedClient = null })
  }
  return cachedClient
}
```

```js
// Mongoose connection management
const mongoose = require('mongoose')

mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})

// Connection events
mongoose.connection.on('connected', () => console.log('Connected'))
mongoose.connection.on('error', (err) => console.error('Error:', err))
mongoose.connection.on('disconnected', () => console.log('Disconnected'))

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})
```

**Best practices:**
- One connection pool per application
- Don't create new connections per request
- Set reasonable pool size (CPU cores * 2-4)
- Close connections on app shutdown

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q130. How does MongoDB handle chunk splitting and migration?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Chunk splitting** divides chunks when they exceed the configured size:

```js
// Default chunk size: 128MB
// When a chunk exceeds 128MB, it splits into two smaller chunks

// Check chunk size config
use config
db.settings.find({ _id: "chunksize" })
// { _id: "chunksize", value: 128 }

// Change chunk size (64MB — smaller = more even distribution)
db.settings.updateOne(
  { _id: "chunksize" },
  { $set: { value: 64 } }
)
```

**Chunk migration process:**
```
1. Source shard receives "moveChunk" command
2. Source shard copies chunk data to destination shard
3. Destination shard indexes the new documents
4. Source shard waits for destination to catch up
5. Critical section: writes to chunk are blocked briefly
6. Metadata updated on config servers
7. Source shard deletes the migrated documents
```

**Migration impact:**
- Minimal impact for most workloads
- Can cause performance degradation during large migrations
- Use balancing windows to schedule during off-peak

```js
// Manually move a chunk
sh.moveChunk("myapp.users", { userId: 12345 }, "shard2")

// Check balancer status
sh.status()
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q131. How do you use MongoDB with event-driven architecture?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Event-driven patterns with MongoDB:**

**1. Change Streams for event sourcing:**
```js
// Capture all user changes for event processing
const pipeline = [{ $match: { "fullDocument.role": "user" } }]
const changeStream = db.users.watch(pipeline)

changeStream.on('change', async (change) => {
  switch (change.operationType) {
    case 'insert':
      await sendWelcomeEmail(change.fullDocument.email)
      await updateUserCounter()
      break
    case 'update':
      await publishUserUpdatedEvent(change)
      break
    case 'delete':
      await cleanupUserData(change.documentKey._id)
      break
  }
})
```

**2. Outbox pattern (reliable event publishing):**
```js
async function createOrder(orderData) {
  const session = client.startSession()
  session.startTransaction()

  try {
    // Insert order
    await db.orders.insertOne(orderData, { session })

    // Insert event into outbox (same transaction)
    await db.eventOutbox.insertOne({
      type: "OrderCreated",
      data: orderData,
      status: "pending",
      createdAt: new Date()
    }, { session })

    await session.commitTransaction()

    // After commit, publish the event
    // (If this fails, a separate worker retries from outbox)
  } catch {
    await session.abortTransaction()
  } finally {
    session.endSession()
  }
}

// Worker: publish pending events
async function processOutbox() {
  const events = await db.eventOutbox.find({ status: "pending" }).limit(100)
  for (const event of events) {
    try {
      await publish(event)
      await db.eventOutbox.updateOne(
        { _id: event._id },
        { $set: { status: "published", publishedAt: new Date() } }
      )
    } catch (err) {
      await db.eventOutbox.updateOne(
        { _id: event._id },
        { $inc: { retryCount: 1 } }
      )
    }
  }
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q132. What is the Transaction Coordinator in MongoDB?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

In a **sharded cluster**, multi-document transactions require a **Transaction Coordinator** to coordinate across shards:

**How it works:**
```
1. Application starts transaction on mongos
2. mongos becomes the coordinator
3. Coordinator contacts each shard involved
4. Each shard's TransactionParticipant manages local operations
5. On commit:
   - Coordinator sends "prepare" to all participant shards
   - Each shard prepares (logs transaction)
   - Coordinator sends "commit" if all prepared
   - Each shard finalizes
6. On abort:
   - Coordinator sends "abort" to all participants
```

**Transaction coordinator responsibilities:**
- Tracks transaction state (init → in_progress → preparing → committed/aborted)
- Handles recovery if a shard fails mid-transaction
- Manages transaction timeout (default: 60 seconds)
- Coordinates distributed locking

```js
// Configure transaction settings
const session = client.startSession({
  defaultTransactionOptions: {
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
    maxCommitTimeMS: 30000  // 30 second commit window
  }
})
```

**Limitations:**
- Maximum transaction size: 16MB (per shard)
- Maximum runtime: default 60 seconds
- No operations on config/admin/local databases within transactions
- No write to capped collections within transactions

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q133. How does MongoDB handle index intersection?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Index intersection** uses multiple indexes to satisfy a query when no single compound index covers all conditions:

```js
// Indexes: { status: 1 } and { createdAt: 1 }

// Query that could use index intersection:
db.orders.find({
  status: "completed",
  createdAt: { $gte: ISODate("2024-01-01") }
})
```

**How it works:**
1. MongoDB scans index on `status` — gets matching doc IDs
2. Scans index on `createdAt` — gets matching doc IDs
3. Intersects the two sets of doc IDs
4. Fetches the intersection from documents

**When intersection is used:**
- No single compound index covers the query
- Query optimizer estimates intersection is faster than a single index
- The intersection eliminates many documents

**Index intersection vs compound index:**
```
Compound index { status: 1, createdAt: 1 }:
  - Single index scan
  - Faster, less memory
  - Preferred when query pattern is known

Index intersection:
  - Two index scans + merge
  - Slower, uses more memory
  - Useful for ad-hoc queries
```

**To check:** Look for `stage: "AND_SORTED"` or `stage: "AND_HASH"` in explain output.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q134. What is the Aggregation $count vs $group difference?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`$count`** — shorthand for counting documents:
```js
{ $count: "total" }
// Result: [{ total: 1000 }]
```

**`$group` with `$sum: 1`** — equivalent but verbose:
```js
{ $group: { _id: null, total: { $sum: 1 } } }
// Result: [{ _id: null, total: 1000 }]
```

**The difference:**
| Feature | `$count` | `$group` |
|---------|----------|----------|
| Output field | Named field | `_id` + field |
| Grouping | All docs (no grouping) | Can group by key |
| Simplicity | Cleaner | Verbose |

**`$count` is sugar for:**
```
{ $group: { _id: null, count: { $sum: 1 } } } +
{ $project: { _id: 0, count: 1 } }
```

**When to use:**
- Use `$count` for simple total counts
- Use `$group` when you need grouping by a key:
```js
{ $group: { _id: "$category", count: { $sum: 1 } } }
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q135. How does MongoDB handle consistency in sharded clusters?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

MongoDB provides **strong consistency** within shards (replica sets) and **eventual consistency** across shards by default.

**Within a shard (replica set):**
- Primary handles all writes
- Read concern "majority" = strong consistency
- Read preference "primary" = strong consistency

**Across shards:**
- Cross-shard reads may see inconsistent state during chunk migrations
- A query spanning shards might see different states
- Distributed transactions provide ACID guarantees across shards

**Consistency models:**

| Scenario | Guarantee |
|----------|-----------|
| Single shard write + read with "majority" | Strong consistency |
| Single shard write + read with "local" | Possibly stale read |
| Cross-shard query without transaction | Eventual consistency |
| Cross-shard transaction | Snapshot isolation |

**Tuning consistency in sharded clusters:**
```js
// Strongest consistency (slower)
session.startTransaction({
  readConcern: { level: "snapshot" },
  writeConcern: { w: "majority" }
})

// Weaker consistency (faster)
db.orders.find().readPref("secondary")
```

**Config server reads** always use majority read concern for metadata consistency.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q136. What are the common MongoDB deployment architectures?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**1. Standalone (development only):**
```
[mongod] — single node, no replication
❌ No HA, no replication
✅ Good for development
```

**2. Replica Set (production, up to ~10k ops/sec):**
```
[mongod primary] → [mongod secondary 1]
                → [mongod secondary 2]
                → [arbiter] (optional)
✅ High availability, read scaling
✅ Automatic failover
```

**3. Sharded Cluster (production, > 10k ops/sec):**
```
[mongos 1] [mongos 2]        ← query routers
      \        /
  [config servers (RS)]      ← metadata
      /        \
[shard1 RS] [shard2 RS]      ← data shards
✅ Horizontal scaling, > 10k ops/sec
✅ Distribute data across regions
```

**4. Multi-region (global distribution):**
```
Region 1 (US):
  [primary]
    ↓ async replication
Region 2 (EU):
  [secondary] — local reads

Or with tagged replication:
  { "region": "US" } — all writes to US primary
  { "region": "EU" } — reads from EU secondary
```

**5. Atlas Serverless (auto-scaling):**
```
[Atlas Serverless Instance] — auto-scales to zero
✅ Pay per usage, no capacity planning
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q137. How do you handle data migration with zero downtime?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Zero-downtime migration strategy:**

**Phase 1: Dual-write (safe path)**
```js
// Write to both old and new collections
async function saveUser(userData) {
  await Promise.all([
    db.users_v1.insertOne(userData),
    db.users_v2.insertOne(transform(userData)),  // new schema
  ])
}

// Read from new, fallback to old
async function getUser(id) {
  let user = await db.users_v2.findOne({ _id: id })
  if (!user) {
    user = await db.users_v1.findOne({ _id: id })
    user = transform(user)
    await db.users_v2.insertOne(user)  // backfill
  }
  return user
}
```

**Phase 2: Backfill historical data**
```js
// Batch process old documents
async function backfill(batchSize = 1000) {
  let processed = 0
  const cursor = db.users_v1.find({ migrated: { $ne: true } })

  while (await cursor.hasNext()) {
    const batch = []
    for (let i = 0; i < batchSize && await cursor.hasNext(); i++) {
      batch.push(await cursor.next())
    }

    await db.users_v2.insertMany(batch.map(transform))
    await db.users_v1.updateMany(
      { _id: { $in: batch.map(d => d._id) } },
      { $set: { migrated: true } }
    )
    processed += batch.length
    console.log(`Migrated ${processed} documents`)
  }
}
```

**Phase 3: Cutover**
```js
// When confident: switch reads to new collection
// Update any views, indexes, and references
// Remove dual-write

// Phase 4: Cleanup
db.users_v1.drop()  // after confirming everything works
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q138. How does MongoDB handle document versioning?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Document versioning strategies:**

**1. Version field (optimistic concurrency):**
```js
{
  _id: ObjectId("..."),
  name: "Alice",
  email: "alice@example.com",
  __v: 5  // version counter (Mongoose adds this automatically)
}

// Optimistic update
const result = await db.users.updateOne(
  { _id: id, __v: currentVersion },
  { $set: { name: "Bob" }, $inc: { __v: 1 } }
)

if (result.modifiedCount === 0) {
  // Conflict — document was modified by another process
  // Re-fetch and retry
}
```

**2. Separate history collection:**
```js
// Current version
db.users.insertOne({ _id: 1, name: "Alice", version: 3 })

// History (immutable log)
db.userHistory.insertOne({
  userId: 1,
  version: 3,
  data: { name: "Alice" },
  changedAt: new Date(),
  changedBy: "admin"
})
```

**3. Embedded history (for small docs):**
```js
{
  _id: 1,
  name: "Alice",
  revisions: [
    { name: "Alice", timestamp: ISODate("2024-01-01"), version: 1 },
    { name: "Alice J.", timestamp: ISODate("2024-06-01"), version: 2 }
  ]
}
```

**4. Delta storage (space efficient):**
```js
{
  _id: 1,
  current: { name: "Alice", email: "alice@example.com" },
  deltas: [
    { patch: { email: "alice@newdomain.com" }, at: ISODate("2024-06-01") }
  ]
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q139. How do you implement multi-tenancy in MongoDB?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Multi-tenancy strategies:**

**1. Separate database per tenant (isolated):**
```js
// Connect to tenant's database
const tenantDb = client.db(`tenant_${tenantId}`)
const users = tenantDb.collection("users")

// Pros: Strong isolation, easy to restore per tenant
// Cons: Many databases (~500 max databases per cluster)
// Best for: Enterprise customers with strict isolation needs
```

**2. Separate collection per tenant:**
```js
// Collection name includes tenant
const collection = db.getCollection(`users_${tenantId}`)

// Pros: Easier to manage than separate databases
// Cons: Many collections, harder to query across tenants
```

**3. Document-level tenant field (most common):**
```js
// All tenants in same collection, filtered by tenantId
{
  _id: ObjectId("..."),
  tenantId: "tenant_acme_corp",
  name: "Alice",
  email: "alice@example.com"
}

// Always filter by tenantId
db.users.find({ tenantId: "tenant_acme_corp" })

// Compound index for tenant isolation
db.users.createIndex({ tenantId: 1, email: 1 }, { unique: true })

// Pros: Simple, scalable, easy cross-tenant queries (for admin)
// Cons: Must include tenantId in ALL queries
```

**4. Hybrid approach:**
```js
// Small tenants: shared collection with tenantId field
// Large tenants: dedicated database
if (isLargeTenant(tenantId)) {
  return client.db(`tenant_${tenantId}`)
} else {
  return sharedDb.collection("users")
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q140. How do you optimize aggregation pipeline for large datasets?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Aggregation optimization strategies for large datasets:**

**1. Early filter + index:**
```js
// ✅ Index on { date: 1, status: 1 }
{ $match: { date: { $gte: start, $lt: end }, status: "active" } }
// Uses index, reduces input to later stages by 90%+
```

**2. Pipeline ordering:**
```js
✅ Correct order:
{ $match }, { $limit }, { $project }, { $unwind }, { $group }, { $sort }, { $limit }

// $match BEFORE $project (so you can filter on original fields)
// $limit BEFORE $expensive stages (group, lookup)
```

**3. Use allowDiskUse for large data:**
```js
db.collection.aggregate([...], { allowDiskUse: true })
// Prevents 100MB memory limit error for $sort/$group
```

**4. Pre-aggregate with $merge:**
```js
// Instead of running expensive aggregation on every request,
// pre-compute and store results
db.orders.aggregate([
  { $match: { date: { $gte: today } } },
  { $group: { _id: "$productId", revenue: { $sum: "$amount" } } },
  { $merge: { into: "daily_sales", on: "_id", whenMatched: "replace" } }
])
// Then query daily_sales — much faster!
```

**5. Parallel processing with $facet:**
```js
// Single pass through data, multiple aggregations
{ $facet: { total: [...], byCategory: [...], byRegion: [...] } }
```

**6. Avoid unnecessary $unwind:** If you can use `$first` or `$arrayElemAt` instead, do it.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q141. How do you implement audit logging in MongoDB?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Audit logging strategies:**

**1. Application-level audit log:**
```js
// Audit middleware
async function audit(req, res, next) {
  const originalJson = res.json.bind(res)
  res.json = function(body) {
    if (req.method !== 'GET') {
      db.auditLogs.insertOne({
        userId: req.user.id,
        action: `${req.method} ${req.path}`,
        requestBody: sanitize(req.body),
        responseStatus: res.statusCode,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        timestamp: new Date()
      }).catch(err => console.error('Audit failed:', err))
    }
    return originalJson(body)
  }
  next()
}
```

**2. Change Streams for audit:**
```js
const sensitiveCollections = ['users', 'orders', 'payments']

sensitiveCollections.forEach(collName => {
  const stream = db.collection(collName).watch([], { fullDocument: 'updateLookup' })

  stream.on('change', (change) => {
    db.auditLogs.insertOne({
      collection: collName,
      operation: change.operationType,
      documentId: change.documentKey._id,
      diff: change.updateDescription,
      timestamp: new Date(),
      userId: getUserIdFromContext() // depends on app architecture
    })
  })
})
```

**3. MongoDB auditing feature (enterprise):**
```yaml
# mongod.conf
auditLog:
  destination: file
  format: JSON
  path: /var/log/mongodb/audit.log
  filter: '{ atype: { $in: ["createCollection", "dropCollection", "dropDatabase", "createUser", "dropUser"] } }'
```

**4. Soft deletes for audit trail:**
```js
// For compliance: never truly delete
db.users.updateOne(
  { _id: id },
  { $set: { isDeleted: true, deletedAt: new Date(), deletedBy: userId } }
)
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q142. What are MongoDB Realm Functions and Triggers?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**MongoDB Realm** (Atlas App Services) provides serverless functions and database triggers:

**Realm Functions (serverless JavaScript):**
```js
// A function that runs in Atlas (no server management)
exports = function(userId) {
  const collection = context.services.get("mongodb-atlas").db("myapp").collection("users")
  return collection.findOne({ _id: BSON.ObjectId(userId) })
}
```

**Database Triggers:**
```js
// Trigger on user insert
exports = function(changeEvent) {
  const { fullDocument, operationType } = changeEvent

  if (operationType === "insert") {
    // Send welcome email
    context.functions.execute("sendEmail", {
      to: fullDocument.email,
      template: "welcome"
    })

    // Create default settings
    const settings = context.services.get("mongodb-atlas").db("myapp").collection("settings")
    settings.insertOne({ userId: fullDocument._id, theme: "light" })
  }
}
```

**Trigger types:**
- **Pre/Post insert** — before or after document insert
- **Pre/Post update** — before or after document update
- **Pre/Post delete** — before or after document delete
- **Scheduled** — cron-based triggers

**Authentication triggers:**
```js
// Before user creation
exports = async (event) => {
  const { email } = event.user.data
  // Validate email domain
  if (!email.endsWith("@company.com")) {
    return { reject: true, reason: "Must use company email" }
  }
  return { reject: false }
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q143. How do you implement full-text search with ranking in MongoDB?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Text search with relevance scoring:**

**1. Basic text index search with score:**
```js
db.products.createIndex({ name: "text", description: "text" })

db.products.find(
  { $text: { $search: "wireless bluetooth speaker" } },
  { score: { $meta: "textScore" }, name: 1, price: 1 }
).sort({ score: { $meta: "textScore" } })
```

**2. Weighted text index:**
```js
// Give name 10x importance over description
db.products.createIndex(
  { name: "text", description: "text", tags: "text" },
  { weights: { name: 10, description: 1, tags: 5 } }
)
// Products with "wireless" in name rank higher than those only in description
```

**3. Text search with language:**
```js
db.articles.createIndex({ content: "text" }, { default_language: "english" })

// Search in specific language
db.articles.find(
  { $text: { $search: "running", $language: "english" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
// "running" also matches "run", "ran", "runner" (stemming)
```

**4. Exclusion and phrases:**
```js
// Exclude "used" from results
{ $text: { $search: "laptop -used" } }

// Exact phrase
{ $text: { $search: '"gaming laptop"' } }

// Require both terms
{ $text: { $search: '"wireless" "bluetooth"' } }
```

**5. Aggregation with text score:**
```js
db.products.aggregate([
  { $match: { $text: { $search: "laptop" } } },
  { $addFields: { score: { $meta: "textScore" } } },
  { $sort: { score: -1 } },
  { $limit: 20 },
  { $project: { name: 1, price: 1, score: 1 } }
])
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q144. How do you handle MongoDB replication lag?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Replication lag** is the delay between a write on primary and its application on secondaries.

**Causes of lag:**
- High write volume on primary
- Slow network between nodes
- Underpowered secondaries (less CPU/RAM)
- Long-running operations on primary
- Secondary not keeping up with oplog

**Monitoring lag:**
```js
// Check replication status
rs.status()

// Output:
// members[0].stateStr: "PRIMARY"
// members[1].stateStr: "SECONDARY"
// members[1].optimeDate: 2024-01-15T10:00:05Z
// members[1].lastHeartbeat: 2024-01-15T10:00:06Z
// members[1].syncingTo: "primary:27017"

// Calculate lag
// Lag = primary's optime - secondary's optime
// If lag > 10 seconds → investigate!
```

**Handling lag in application:**
```js
// Read from primary if you need latest data
db.collection.find().readPref("primary")

// Check secondary lag before reading
async function readWithLagCheck() {
  const status = await adminDb.command({ replSetGetStatus: true })
  const maxLag = Math.max(...status.members
    .filter(m => m.stateStr === "SECONDARY")
    .map(m => (Date.now() - m.optimeDate.getTime()) / 1000)
  )

  if (maxLag < 5) {  // less than 5 seconds
    return db.collection.find().readPref("secondary").toArray()
  } else {
    return db.collection.find().readPref("primary").toArray()
  }
}
```

**Preventing lag:**
- Use write concern majority only when needed (slower but safer)
- Add indexes on secondaries (but they inherit primary's indexes)
- Ensure secondaries have sufficient resources
- Monitor oplog size — if secondaries fall too far, they go RECOVERING

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q145. How do you use MongoDB $function and custom JavaScript in aggregation?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`$function`** (MongoDB 4.4+) defines custom JavaScript functions in aggregation:

```js
// Custom string transformation
db.products.aggregate([{ $project: {
  slug: {
    $function: {
      body: function(name) {
        return name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      },
      args: ["$name"],
      lang: "js"
    }
  }
}}])

// Complex business logic
db.orders.aggregate([{ $addFields: {
  discountAmount: {
    $function: {
      body: function(amount, quantity) {
        const total = amount * quantity
        if (total > 100000) return total * 0.15
        if (total > 50000) return total * 0.10
        if (total > 10000) return total * 0.05
        return 0
      },
      args: ["$unitPrice", "$quantity"],
      lang: "js"
    }
  }
}}])

// Text similarity (simple Levenshtein)
db.products.aggregate([{ $match: {
  $expr: {
    $function: {
      body: function(search, target) {
        // Simple contains check (case-insensitive)
        return target.toLowerCase().includes(search.toLowerCase())
      },
      args: ["laptop", "$name"],
      lang: "js"
    }
  }
}}])
```

**Performance considerations:**
- `$function` runs JavaScript — slower than native operators
- Cannot use indexes
- Use only when native aggregation operators can't express the logic
- Consider `$accumulator` for group-level custom logic

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q146. How do you handle MongoDB error handling in production?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Production error handling strategies:**

**1. Retry logic for transient errors:**
```js
async function withRetry(fn, maxRetries = 3) {
  let lastError
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (!isRetryable(err)) throw err
      await sleep(Math.pow(2, i) * 100)  // exponential backoff
    }
  }
  throw lastError
}

function isRetryable(err) {
  const retryableCodes = [
    11600, // interrupted
    11601, // interrupted at shutdown
    13436, // not primary
    13435, // no primary
    63,    // stale config
    50,    // max time exceeded
  ]
  return retryableCodes.includes(err.code) || err.message.includes("network error")
}
```

**2. Connection error handling:**
```js
const mongoose = require('mongoose')

// Auto-reconnect with exponential backoff
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected, attempting reconnect...')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err)
  // Alert monitoring system
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  await mongoose.connection.close()
  process.exit(0)
})
```

**3. Write concern errors:**
```js
try {
  await db.orders.insertOne(order, { writeConcern: { w: "majority", wtimeout: 5000 } })
} catch (err) {
  if (err.code === 64) {  // Write concern timeout
    // Log for investigation, but don't crash
    console.error('Write concern timeout:', err)
    // The write may have succeeded — verify later
  }
  throw err
}
```

**4. Monitoring with health checks:**
```js
async function healthCheck() {
  try {
    const result = await adminDb.command({ ping: 1 })
    if (result.ok !== 1) throw new Error('Ping failed')
    return { status: 'healthy', responseTime: '~5ms' }
  } catch (err) {
    return { status: 'unhealthy', error: err.message }
  }
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q147. How does MongoDB handle rolling upgrades?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Rolling upgrades** update replica set members one at a time for zero downtime:

**1. Upgrade secondaries first:**
```bash
# Step 1: Upgrade one secondary
rs.stepDown(300)  # optional: step down primary first
# Stop secondary, upgrade mongod, restart

# Step 2: Wait for secondary to catch up
rs.status()  # check lag = 0

# Step 3: Upgrade next secondary
# Repeat for each secondary
```

**2. Step down primary (no downtime):**
```bash
# Gracefully step down primary
rs.stepDown(60)  # primary unavailable for up to 60s

# A new primary is elected automatically
# Clients should retry writes during this window

# Upgrade the old primary (now secondary)
# After upgrade, it will rejoin the replica set
```

**3. Feature compatibility version (for major upgrades):**
```js
// Before upgrading, check feature compatibility
db.adminCommand({ getParameter: 1, featureCompatibilityVersion: 1 })
// { featureCompatibilityVersion: { version: "5.0" } }

// After rolling upgrade to 6.0:
db.adminCommand({ setFeatureCompatibilityVersion: "6.0" })
// Enables new 6.0 features
```

**4. Sharded cluster upgrade:**
```bash
# 1. Upgrade config servers (all at once, they're a replica set)
# 2. Upgrade mongos routers (restart one by one)
# 3. Upgrade each shard (rolling, one replica set at a time)
```

**Key considerations:**
- Always test upgrades in staging first
- Check MongoDB compatibility matrix (no skipping major versions!)
- Backup before upgrading
- Monitor replication lag during upgrade
- Have rollback plan ready

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q148. What are MongoDB database profiler levels and optimization?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **database profiler** logs query execution details for performance analysis:

```js
// Profiler levels:
// 0 — off (default)
// 1 — log slow queries (slower than slowms)
// 2 — log all queries

// Enable profiler: log queries > 100ms
db.setProfilingLevel(1, { slowms: 100 })

// Enable profiler: log ALL operations (dev only!)
db.setProfilingLevel(2)

// Check current profiler level
db.getProfilingStatus()
// { was: 1, slowms: 100, sampleRate: 1 }

// View slow queries
db.system.profile.find({
  millis: { $gt: 1000 },  // queries > 1 second
  ns: { $ne: "admin.$cmd" }
}).sort({ ts: -1 }).limit(20).pretty()
```

**What to look for:**
```js
// Slow query example
{
  "op": "query",
  "ns": "myapp.orders",
  "command": { "find": "orders", "filter": { "status": "pending" } },
  "keysExamined": 0,        // ❌ No index used
  "docsExamined": 50000,    // ❌ Full scan
  "nreturned": 150,
  "millis": 842,            // ❌ Slow (> 800ms)
  "execStats": {
    "stage": "COLLSCAN"     // ❌ No index
  }
}
```

**Profiler collection considerations:**
- `system.profile` is a capped collection (default 1MB)
- For production, use Atlas Performance Advisor or third-party tools
- Enable profiling judiciously — adds overhead
- Sample rate: `{ sampleRate: 0.5 }` to profile only 50% of operations

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q149. How do MongoDB aggregation $sortByCount and $count work with performance?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**`$sortByCount`** is shorthand for `$group` + `$sort`:

```js
// Equivalent to:
// { $group: { _id: "$category", count: { $sum: 1 } } },
// { $sort: { count: -1 } }

db.products.aggregate([
  { $sortByCount: "$category" }
])
// Result:
// { _id: "Electronics", count: 150 }
// { _id: "Clothing", count: 120 }
// { _id: "Books", count: 85 }
```

**Performance comparison:**
```js
// Approach A: $sortByCount (shorthand, good for simple counts)
{ $sortByCount: "$field" }

// Approach B: Manual (more flexible, same performance)
{ $group: { _id: "$field", count: { $sum: 1 } } },
{ $sort: { count: -1 } }

// Approach C: With $match filter (best)
{ $match: { price: { $gt: 100 } } },
{ $sortByCount: "$category" }
```

**Performance tips:**
- `$sortByCount` is convenient but not faster than manual `$group` + `$sort`
- For large collections, add `$match` before `$sortByCount`
- `allowDiskUse` for very large groups
- Consider pre-computing counts with `$merge` for frequently accessed aggregations

**Limitations:**
- Cannot use accumulators other than count
- `_id` field is always the grouped value (can't rename without extra `$project`)
- Sort is always descending by count

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q150. What is MongoDB's approach to eventual consistency and conflict resolution?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**MongoDB is CP (strongly consistent) by design**, but can be tuned for eventual consistency:

**Default behavior (strong consistency):**
```js
// Write to primary, read from primary
// Strong consistency guarantee
db.orders.insertOne(order, { writeConcern: { w: "majority" } })
db.orders.find().readConcern("majority")
```

**Eventual consistency (when secondary reads):**
```js
// Read from any secondary — may read stale data momentarily
db.orders.find().readPref("secondary")

// You might get:
// T1: Write "status: completed" to primary
// T2: Read from secondary — still sees "status: pending"
// T3: Secondary replicates — now sees "status: completed"
```

**Conflict resolution strategies:**

**1. Last-write-wins (LWW) — default:**
```js
// MongoDB uses LWW conflict resolution
// Last write to a document wins
// No merge — document is replaced
```

**2. Causal consistency (MongoDB 3.6+):**
```js
// Ensures operations see causally related operations
const session = client.startSession({ causalConsistency: true })

session.advanceClusterTime(session.operationTime)
// Subsequent reads will see writes that happened before
```

**3. Read-your-own-writes:**
```js
// Use "majority" read concern to ensure you see your writes
const result = await db.orders.insertOne(order)
await db.orders.findOne(
  { _id: result.insertedId },
  { readConcern: { level: "majority" } }
)
```

**4. Application-level conflict resolution:**
```js
// Optimistic locking with version field
const doc1 = await db.documents.findOne({ _id: id })
doc1.data.field = "new value"
doc1.version++

const result = await db.documents.replaceOne(
  { _id: id, version: doc1.version - 1 },
  doc1
)
if (result.modifiedCount === 0) {
  // Conflict — re-fetch and resolve
  const current = await db.documents.findOne({ _id: id })
  // Manual merge or retry
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q151. How do you implement MongoDB pagination with total count efficiently?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Efficient pagination with total count — two strategies:**

**Strategy 1: $facet (single query, best for moderate data):**
```js
db.products.aggregate([
  { $match: { category: "Electronics", price: { $gt: 100 } } },
  { $facet: {
    metadata: [{ $count: "total" }],
    data: [
      { $sort: { price: 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]
  }},
  { $project: {
    data: 1,
    total: { $ifNull: [{ $arrayElemAt: ["$metadata.total", 0] }, 0] }
  }}
])
// Single query returns both data and total count
```

**Strategy 2: Sequential (best for large data):**
```js
const [data, total] = await Promise.all([
  db.products.find({ category: "Electronics", price: { $gt: 100 } })
    .sort({ price: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray(),
  db.products.countDocuments({ category: "Electronics", price: { $gt: 100 } })
])
```

**Strategy 3: Cursor-based (best for real-time, large datasets):**
```js
// First page
const page1 = await db.products.find({ category: "Electronics" })
  .sort({ _id: -1 })
  .limit(limit)
  .toArray()

// Next page — use last _id as cursor (faster than skip)
const lastId = page1[page1.length - 1]._id
const page2 = await db.products.find({
  category: "Electronics",
  _id: { $lt: lastId }
})
  .sort({ _id: -1 })
  .limit(limit)
  .toArray()

// Total count (approximate, from metadata)
const total = await db.products.estimatedDocumentCount()
```

**Performance comparison:**
```
skip(1000000) + limit(20)  → still scans 1M documents ❌
cursor-based (_id > last) → scans only 20 documents    ✅
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q152. How do MongoDB numeric types affect performance?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**MongoDB supports multiple numeric types with different performance characteristics:**

**Numeric types:**
```js
// Double (default) — 8 bytes, floating point
{ price: 99.99 }

// 32-bit integer — 4 bytes
{ count: NumberInt(42) }

// 64-bit integer — 8 bytes
{ bigNum: NumberLong(9007199254740993) }

// Decimal128 — 16 bytes, exact precision
{ price: NumberDecimal("99.99") }
```

**Performance guidelines:**

| Type | Bytes | Precision | Use Case |
|------|-------|-----------|----------|
| `int32` | 4 | Exact integer | Counters, IDs < 2B |
| `int64` | 8 | Exact integer | Counters > 2B, timestamps |
| `double` | 8 | Approx (15 digits) | Most general numbers |
| `decimal128` | 16 | Exact (34 digits) | Financial, monetary |

**Type comparison:**
```js
// Double has precision issues:
db.items.insertOne({ price: 0.1 })
db.items.insertOne({ price: 0.2 })
db.items.aggregate([{ $group: { _id: null, total: { $sum: "$price" } } }])
// Result: { total: 0.30000000000000004 }  // ❌ Floating point error!

// Decimal has exact precision:
db.items.insertOne({ price: NumberDecimal("0.1") })
db.items.insertOne({ price: NumberDecimal("0.2") })
db.items.aggregate([{ $group: { _id: null, total: { $sum: "$price" } } }])
// Result: { total: NumberDecimal("0.3") }  // ✅ Exact!
```

**Performance impact:**
- `int32` is fastest (smallest)
- `decimal128` is slowest (largest, requires more CPU)
- Use `double` for general-purpose numbers
- Use `decimal128` only when you need exact decimal precision (money)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q153. How do MongoDB $planCacheStats and query plans work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

MongoDB's **query planner** evaluates multiple plans and caches the best one:

**How query planning works:**
```
1. Query arrives
2. Planner generates candidate plans (using different indexes)
3. Each candidate executes briefly (race)
4. Winning plan is cached in plan cache
5. Subsequent identical queries reuse the cached plan
6. Cache is invalidated after:
   - index changes (create/drop)
   - collection statistics change significantly
   - 1000 writes to the collection
```

**Plan cache inspection:**
```js
// View cached plans for a collection
db.users.aggregate([{ $planCacheStats: {} }])

// Output example:
{
  "planCacheKey": "ABCD1234",
  "isActive": true,
  "createdFromQuery": { "query": { "email": "alice@example.com" } },
  "cachedPlan": { "stage": "IXSCAN", "indexName": "email_1" }
}
```

**Manually clear plan cache:**
```js
// Clear all cached plans for collection
db.users.getPlanCache().clear()

// Clear plans for specific query shape
db.users.getPlanCache().clearPlansByQuery({ email: "alice@example.com" })

// List all cached query shapes
db.users.getPlanCache().listQueryShapes()
```

**When to clear plan cache:**
- After creating new indexes
- After data distribution changes significantly
- If you observe unstable query performance
- After bulk inserts/deletes

```js
// Force query planner to re-evaluate
db.users.find({ email: "test@example.com" }).hint({ email: 1 })
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q154. How do you implement a tagging system in MongoDB?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Tagging strategies in MongoDB:**

**1. Array of strings (simple):**
```js
{
  _id: 1,
  title: "MongoDB Guide",
  tags: ["database", "nosql", "mongodb"]
}

// Find by tag
db.posts.find({ tags: "mongodb" })

// Find by multiple tags (AND)
db.posts.find({ tags: { $all: ["database", "nosql"] } })

// Index for tag queries
db.posts.createIndex({ tags: 1 })
```

**2. Weighted tags (with metadata):**
```js
{
  _id: 1,
  title: "MongoDB Guide",
  tags: [
    { name: "database", weight: 10 },
    { name: "nosql", weight: 8 },
    { name: "mongodb", weight: 10 }
  ]
}

// Find by tag name
db.posts.find({ "tags.name": "database" })

// Sort by tag relevance
db.posts.aggregate([
  { $match: { "tags.name": { $in: ["database", "nosql"] } } },
  { $addFields: {
    relevance: { $sum: "$tags.weight" }
  }},
  { $sort: { relevance: -1 } }
])
```

**3. Tags as keys (category mapping):**
```js
// Tags collection
{ _id: "mongodb", postCount: 42, relatedTags: ["database", "nosql"] }
{ _id: "nosql", postCount: 35, relatedTags: ["database"] }
{ _id: "javascript", postCount: 78, relatedTags: ["web", "frontend"] }

// Efficient tag cloud query
db.tags.find().sort({ postCount: -1 }).limit(20)

// Auto-suggest
db.tags.find({ _id: { $regex: /^mon/i } }).limit(10)
```

**4. Tag frequency aggregation:**
```js
db.posts.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 20 }
])
// Top 20 most used tags
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q155. What are MongoDB 6.0 and 7.0 key features?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**MongoDB 6.0 (2022) key features:**

**1. Change Streams with pre-images:**
```js
// See document state BEFORE the change
db.collection.watch([], { showExpandedEvents: true })
// FullDocumentPreImage: "whenAvailable" or "required"
```

**2. Cluster-to-cluster sync:** Built-in continuous data sync between clusters.

**3. Queryable Encryption:** Encrypt data in a way that still allows querying.

**4. Time Series enhancements:**
- `$setWindowFields` for time series
- Improved compression
- Columnar storage index (beta)

**5. Aggregation improvements:**
- `$sampleRate` — random sampling stage
- Wildcard indexes in `$match`
- `$lookup` with `let` variables improvements

**MongoDB 7.0 (2023) key features:**

**1. Queryable Encryption GA:**
- Encrypted range queries
- Encrypted equality matches
- Encrypted search

**2. Time Series columnar index (GA):**
- Up to 90% compression
- Faster analytical queries

**3. Aggregation improvements:**
- `$sample` with random seed
- `$dateAdd`, `$dateDiff`, `$dateTrunc`, `$dateSubtract`
- `$fill` — fills gaps in time series data

**4. Performance:**
- 40% faster aggregation (improved pipeline execution)
- Improved chunk migration
- Faster index builds

**5. Security:**
- Automatic encryption key rotation
- LDAP authorization improvements
- Audit log filtering enhancements

</div>
</details>

---

> **💡 Tip:** Practice these questions by explaining them out loud or writing the queries. Focus on understanding the trade-offs (embedding vs referencing, when to use indexes, shard key selection) as interviewers love discussing design decisions. MongoDB's flexibility is its superpower — your answers should reflect thoughtful schema design.
