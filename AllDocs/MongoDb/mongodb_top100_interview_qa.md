# 🍃 Top 100 MongoDB Interview Questions & Answers
### Complete Guide for Beginners → Intermediate → Advanced

> **How to use this guide:**
> - Beginners: Start from Q1 and read through Q30
> - Intermediate developers: Focus on Q31–Q70
> - Experienced developers: Jump to Q71–Q100
> - Quick revision: Read the **Key Points** of each question

---

## 📋 Table of Contents

| Section | Questions | Topics |
|---------|-----------|--------|
| [🟢 Basic](#-section-1-basic-questions-q1--q30) | Q1 – Q30 | Fundamentals, CRUD, Basic Queries |
| [🟡 Intermediate](#-section-2-intermediate-questions-q31--q70) | Q31 – Q70 | Indexing, Aggregation, Data Modeling |
| [🔴 Advanced](#-section-3-advanced-questions-q71--q100) | Q71 – Q100 | Transactions, Sharding, Replica Sets, Architecture |

---

## 🟢 Section 1: Basic Questions (Q1 – Q30)

---

### Q1. What is MongoDB?

**Question:**
What is MongoDB and how is it different from traditional relational databases?

**Answer:**
- MongoDB is a **NoSQL, document-oriented database** that stores data as flexible JSON-like documents (BSON) instead of rows and columns
- It was built for **scalability, flexibility, and high performance**
- Unlike SQL databases, MongoDB has **no fixed schema** — each document in a collection can have different fields
- It is open-source and developed by MongoDB Inc.

**Comparison:**

| Feature | SQL (MySQL/PostgreSQL) | MongoDB |
|---------|----------------------|---------|
| Data format | Tables, rows, columns | Collections, documents, fields |
| Schema | Rigid, fixed | Flexible, dynamic |
| Joins | Yes (JOINs) | Embedding / `$lookup` |
| Scalability | Vertical (scale up) | Horizontal (scale out) |
| Transactions | Full ACID | ACID (v4.0+) |
| Query language | SQL | MQL (MongoDB Query Language) |

**Key Points:**
- MongoDB stores data as BSON documents (like JSON objects)
- No rigid schema — fields can vary between documents
- Best for hierarchical data, real-time apps, and high-volume workloads

---

### Q2. What is a Document in MongoDB?

**Question:**
What is a MongoDB document and how is it structured?

**Answer:**
- A **document** is the basic unit of data in MongoDB — equivalent to a row in SQL
- Documents are stored in **BSON format** (Binary JSON) but written like JSON objects
- A document is a set of **key-value pairs** with support for nested objects and arrays
- Maximum document size is **16MB**

**Example:**
```js
{
  "_id": ObjectId("64f1b2c3d4e5f6a7b8c9d0e1"),
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28,
  "address": {
    "city": "Mumbai",
    "pincode": "400001"
  },
  "skills": ["JavaScript", "MongoDB", "Node.js"],
  "isActive": true,
  "createdAt": ISODate("2024-01-15T10:00:00Z")
}
```

**Key Points:**
- Documents support nested objects (embedded documents) and arrays
- Each document must have a unique `_id` field
- Fields can hold different data types: strings, numbers, booleans, arrays, objects, dates
- Documents in the same collection can have different fields (schema-less)

---

### Q3. What is the difference between a Collection and a Database in MongoDB?

**Question:**
Explain the difference between a Collection and a Database in MongoDB.

**Answer:**
- A **Database** is the top-level container that holds collections. One MongoDB server can host multiple databases. Each database has its own files on disk.
- A **Collection** is a group of documents inside a database — equivalent to a table in SQL. Collections are schema-less, meaning documents inside don't need the same structure.

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

**Example:**
```js
use ecommerce              // switch to (or create) database
db.createCollection("users")   // create a collection explicitly
show dbs                   // list all databases
show collections           // list all collections in current db
```

**Key Points:**
- A server → multiple databases → multiple collections → multiple documents
- Collections are created automatically on first insert
- `use dbName` switches the active database

---

### Q4. What is BSON? How is it different from JSON?

**Question:**
What is BSON and how does it differ from JSON in MongoDB?

**Answer:**
- **JSON** (JavaScript Object Notation) is a human-readable text format for data exchange
- **BSON** (Binary JSON) is MongoDB's internal binary-encoded serialization format
- MongoDB accepts data as JSON-like syntax but stores it as BSON internally

**Differences:**

| Feature | JSON | BSON |
|---------|------|------|
| Format | Text (human-readable) | Binary (machine-readable) |
| Speed | Slower to parse | Faster to parse/encode |
| Size | More compact for text | Slightly larger (adds metadata) |
| Data types | String, Number, Boolean, Array, Object, Null | All JSON types + Date, ObjectId, Binary, Decimal128, Int32, Int64, Timestamp |
| Ordering | No guaranteed field order | Fields are ordered |

**Extra BSON types MongoDB supports:**
```js
{
  "_id":       ObjectId("64f1b2c3..."),    // ObjectId type
  "createdAt": ISODate("2024-01-01"),      // Date type
  "price":     NumberDecimal("99.99"),     // Decimal128 type
  "count":     NumberInt(42),              // 32-bit integer
  "bigNum":    NumberLong(9007199254740993) // 64-bit integer
}
```

**Key Points:**
- You write JSON; MongoDB stores BSON — the conversion is automatic
- BSON enables faster scanning and richer data types
- BSON is not human-readable on disk but you never deal with it directly

---

### Q5. What is `_id` and ObjectId in MongoDB?

**Question:**
What is the `_id` field in MongoDB? What is an ObjectId?

**Answer:**
- Every MongoDB document **must** have an `_id` field that acts as the **primary key**
- If you don't provide `_id` when inserting, MongoDB auto-generates an **ObjectId**
- `_id` must be **unique** within a collection

**ObjectId structure (12 bytes):**
```
┌──────────────┬────────────┬──────────┐
│  4 bytes     │  5 bytes   │ 3 bytes  │
│  Unix        │  Random    │ Incrementing
│  Timestamp   │  Value     │ Counter  │
└──────────────┴────────────┴──────────┘

Example: 64f1b2c3  d4e5f6a7b8  c9d0e1
          (time)    (random)   (counter)
```

**Example:**
```js
// Auto-generated _id
db.users.insertOne({ name: "Alice" })
// Result: { _id: ObjectId("64f1b2c3d4e5f6a7b8c9d0e1"), name: "Alice" }

// Custom _id
db.users.insertOne({ _id: "user_alice_001", name: "Alice" })

// Query by ObjectId — must wrap in ObjectId()
db.users.findOne({ _id: ObjectId("64f1b2c3d4e5f6a7b8c9d0e1") })

// Extract creation timestamp from ObjectId
const id = ObjectId("64f1b2c3d4e5f6a7b8c9d0e1")
id.getTimestamp()  // 2023-09-01T...
```

**Key Points:**
- ObjectId embeds a creation timestamp — you can derive when a document was created from its `_id`
- Always use `ObjectId("...")` when querying by `_id`, not a plain string
- You can use any unique value as `_id` (string, number, UUID)

---

### Q6. How do you insert documents in MongoDB?

**Question:**
Explain the different ways to insert documents into a MongoDB collection.

**Answer:**
MongoDB provides two main insert methods:

**`insertOne()`** — Insert a single document:
```js
db.users.insertOne({
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 28,
  role: "admin",
  createdAt: new Date()
})

// Result:
// { acknowledged: true, insertedId: ObjectId("...") }
```

**`insertMany()`** — Insert multiple documents at once:
```js
db.products.insertMany([
  { name: "Laptop", price: 75000, category: "Electronics" },
  { name: "Mouse",  price: 1200,  category: "Electronics" },
  { name: "Pen",    price: 15,    category: "Stationery" }
])

// Result:
// { acknowledged: true, insertedCount: 3, insertedIds: { 0: ..., 1: ..., 2: ... } }
```

**Ordered vs Unordered insert:**
```js
// Default: ordered = true (stops on first error)
db.users.insertMany([...docs])

// Unordered: inserts all valid docs even if some fail
db.users.insertMany([...docs], { ordered: false })
```

**Key Points:**
- `insertOne()` returns `insertedId`; `insertMany()` returns `insertedIds` object
- With `ordered: true` (default), if one doc fails, subsequent docs are not inserted
- With `ordered: false`, MongoDB inserts all valid docs and reports errors separately

---

### Q7. How does `find()` work in MongoDB?

**Question:**
How do you use the `find()` method in MongoDB? What is the difference between `find()` and `findOne()`?

**Answer:**
- `find()` returns a **cursor** to all documents matching the filter
- `findOne()` returns the **first matching document** (or null)

**Syntax:**
```js
db.collection.find(filter, projection)
db.collection.findOne(filter, projection)
```

**Examples:**
```js
// Get ALL documents
db.users.find()

// Get users with role "admin"
db.users.find({ role: "admin" })

// Get first matching user
db.users.findOne({ email: "alice@example.com" })

// Find with nested field
db.users.find({ "address.city": "Mumbai" })

// Find by ObjectId
db.users.findOne({ _id: ObjectId("64f1b2c3...") })

// Combine with sort, limit
db.users.find({ isActive: true }).sort({ createdAt: -1 }).limit(10)
```

**Cursor methods:**
```js
db.users.find().count()      // total matching count
db.users.find().pretty()     // formatted output in shell
db.users.find().toArray()    // convert cursor to array
```

**Key Points:**
- `find()` is lazy — it doesn't fetch data until iterated
- `findOne()` is a convenience wrapper that returns null (not an empty cursor) if not found
- Always add filters to avoid full collection scans on large collections

---

### Q8. What are Update Operators in MongoDB?

**Question:**
What update operators does MongoDB provide, and why should you always use them?

**Answer:**
Update operators **modify specific fields** in a document without replacing the entire document.

> ⚠️ Without update operators, MongoDB **replaces the entire document** with just the new values — all other fields are lost!

**Common Update Operators:**

| Operator | Purpose | Example |
|----------|---------|---------|
| `$set` | Set a field value | `{ $set: { age: 30 } }` |
| `$unset` | Remove a field | `{ $unset: { tempToken: "" } }` |
| `$inc` | Increment a number | `{ $inc: { count: 1 } }` |
| `$push` | Add to array | `{ $push: { tags: "new" } }` |
| `$pull` | Remove from array | `{ $pull: { tags: "old" } }` |
| `$addToSet` | Add to array (no duplicates) | `{ $addToSet: { roles: "admin" } }` |
| `$rename` | Rename a field | `{ $rename: { "oldName": "newName" } }` |
| `$mul` | Multiply a value | `{ $mul: { price: 1.1 } }` |
| `$min` | Update if new value is lower | `{ $min: { score: 50 } }` |
| `$max` | Update if new value is higher | `{ $max: { score: 100 } }` |

**Examples:**
```js
// Correct way — use $set
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { age: 29, lastLogin: new Date() } }
)

// Increment login count
db.users.updateOne(
  { _id: ObjectId("...") },
  { $inc: { loginCount: 1 } }
)

// Push to array
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { notifications: { msg: "Welcome!", date: new Date() } } }
)

// Remove a field
db.users.updateOne(
  { _id: ObjectId("...") },
  { $unset: { resetToken: "" } }
)
```

**Key Points:**
- Always use operators like `$set` — never do `db.col.updateOne({...}, { field: val })`
- `$inc` is atomic — safe for counters in concurrent environments
- `$addToSet` prevents duplicate entries in arrays, unlike `$push`

---

### Q9. What is the difference between `updateOne()`, `updateMany()`, and `replaceOne()`?

**Question:**
What is the difference between `updateOne()`, `updateMany()`, and `replaceOne()` in MongoDB?

**Answer:**

| Method | What it does | Affects |
|--------|-------------|---------|
| `updateOne()` | Updates first matching document using operators | 1 document |
| `updateMany()` | Updates all matching documents using operators | N documents |
| `replaceOne()` | Replaces the entire document (except `_id`) | 1 document |

**Examples:**
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

// replaceOne — entire document is replaced (only _id is kept)
db.users.replaceOne(
  { _id: ObjectId("...") },
  { name: "New Name", email: "new@example.com", role: "user" }
  // All previous fields GONE — replaced with this new object
)
```

**Upsert option** — insert if no match found:
```js
db.settings.updateOne(
  { userId: "u123" },
  { $set: { theme: "dark" } },
  { upsert: true }  // creates a new doc if filter matches nothing
)
```

**Key Points:**
- `updateOne` / `updateMany` use operators — original document fields are preserved
- `replaceOne` completely overwrites the document — use with caution
- `upsert: true` = update if exists, insert if not

---

### Q10. How do you delete documents in MongoDB?

**Question:**
What are the methods to delete documents in MongoDB and when do you use each?

**Answer:**

**`deleteOne()`** — Deletes the first matching document:
```js
// Delete by ID (most common)
db.users.deleteOne({ _id: ObjectId("64f1b2c3...") })

// Delete first matching user with this email
db.users.deleteOne({ email: "spam@example.com" })

// Result: { acknowledged: true, deletedCount: 1 }
```

**`deleteMany()`** — Deletes all matching documents:
```js
// Delete all inactive users
db.users.deleteMany({ isActive: false })

// Delete all logs older than 30 days
const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
db.logs.deleteMany({ createdAt: { $lt: cutoff } })

// Delete ALL documents in collection (keeps collection + indexes)
db.tempData.deleteMany({})
```

**`findOneAndDelete()`** — Deletes and returns the deleted document:
```js
const deleted = db.tasks.findOneAndDelete({ _id: ObjectId("...") })
// Returns the document that was deleted — useful for confirmation or cleanup
```

**Key Points:**
- `deleteMany({})` clears all docs but keeps the collection (unlike `drop()`)
- `drop()` removes the entire collection including indexes — faster for bulk clear
- Always confirm your filter before `deleteMany()` — test with `find()` first!
- `findOneAndDelete()` is useful when you need to process the document before deleting (e.g., archiving)

---

### Q11. What are comparison operators in MongoDB?

**Question:**
Explain the comparison query operators available in MongoDB with examples.

**Answer:**
Comparison operators filter documents based on field value comparisons.

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

**Examples:**
```js
// Users older than 25
db.users.find({ age: { $gt: 25 } })

// Products between ₹500 and ₹5000
db.products.find({ price: { $gte: 500, $lte: 5000 } })

// Orders NOT cancelled
db.orders.find({ status: { $ne: "cancelled" } })

// Users in specific cities
db.users.find({ "address.city": { $in: ["Mumbai", "Delhi", "Bangalore"] } })

// Products NOT in these categories
db.products.find({ category: { $nin: ["Discontinued", "OutOfStock"] } })
```

**Key Points:**
- `$eq` is usually implicit — `{ age: 25 }` is the same as `{ age: { $eq: 25 } }`
- `$in` accepts an array and is more efficient than multiple `$or` conditions
- Range queries with `$gte`/`$lte` can use indexes effectively

---

### Q12. What are logical operators in MongoDB?

**Question:**
Explain the logical operators in MongoDB: `$and`, `$or`, `$not`, and `$nor`.

**Answer:**

**`$and`** — All conditions must be true:
```js
// Explicit $and
db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { role: "admin" },
    { isActive: true }
  ]
})

// Implicit AND (shorthand — same result)
db.users.find({ age: { $gte: 18 }, role: "admin", isActive: true })

// Use explicit $and when the SAME field has multiple conditions
db.users.find({
  $and: [
    { name: { $regex: /^A/ } },
    { name: { $ne: "Anonymous" } }
  ]
})
```

**`$or`** — At least one condition must be true:
```js
db.products.find({
  $or: [
    { price: { $lt: 100 } },
    { category: "Sale" }
  ]
})
```

**`$not`** — Inverts a condition:
```js
// Users NOT older than 30
db.users.find({ age: { $not: { $gt: 30 } } })
```

**`$nor`** — None of the conditions must be true:
```js
// Users who are neither admin nor banned
db.users.find({
  $nor: [
    { role: "admin" },
    { status: "banned" }
  ]
})
```

**Combining operators:**
```js
// Active users who are (admin OR premium), age > 21
db.users.find({
  isActive: true,
  age: { $gt: 21 },
  $or: [
    { role: "admin" },
    { plan: "premium" }
  ]
})
```

**Key Points:**
- Use implicit AND (comma) for cleaner code when conditions are on different fields
- Use explicit `$and` when applying multiple conditions to the **same field**
- `$or` is useful for OR-style filtering across different fields or values

---

### Q13. What is Projection in MongoDB?

**Question:**
What is projection in MongoDB? How do you include or exclude specific fields in query results?

**Answer:**
- **Projection** controls which fields are returned in query results
- It reduces the amount of data transferred — important for performance
- `1` = **include** the field; `0` = **exclude** the field

**Syntax:**
```js
db.collection.find(filter, { field1: 1, field2: 1 })
```

**Examples:**
```js
// Include only name and email (all others excluded, _id auto-included)
db.users.find({}, { name: 1, email: 1 })
// Result: { _id: ..., name: "Alice", email: "alice@..." }

// Include name and email, explicitly exclude _id
db.users.find({}, { name: 1, email: 1, _id: 0 })
// Result: { name: "Alice", email: "alice@..." }

// Exclude sensitive fields (show everything except password)
db.users.find({}, { password: 0, secretKey: 0 })

// Project nested field
db.users.find({}, { name: 1, "address.city": 1 })

// Array slice — return only first 3 elements of tags array
db.posts.find({}, { title: 1, tags: { $slice: 3 } })

// Array elemMatch — return only matching array elements
db.orders.find(
  {},
  { items: { $elemMatch: { category: "Electronics" } } }
)
```

**Key Points:**
- You cannot mix inclusions and exclusions in one projection — **except** for `_id` (which can be excluded alongside inclusions)
- Use projection in production to avoid over-fetching data
- Projecting only needed fields speeds up queries and reduces bandwidth

---

### Q14. How does sorting work in MongoDB?

**Question:**
How do you sort query results in MongoDB? What values are used for sort order?

**Answer:**
- Use `.sort()` method on a cursor to order results
- **`1`** = Ascending (A→Z, 0→9, oldest→newest)
- **`-1`** = Descending (Z→A, 9→0, newest→oldest)

**Examples:**
```js
// Sort by price: lowest first (ascending)
db.products.find().sort({ price: 1 })

// Sort by price: highest first (descending)
db.products.find().sort({ price: -1 })

// Sort by name A-Z, then price low-high (multi-field sort)
db.products.find().sort({ category: 1, price: 1 })

// Latest 5 orders
db.orders.find({ userId: ObjectId("...") })
         .sort({ createdAt: -1 })
         .limit(5)

// Sort + projection combo
db.users.find({ role: "admin" }, { name: 1, email: 1 })
        .sort({ name: 1 })
```

**Key Points:**
- `sort()` should be combined with `limit()` for efficiency — don't sort millions of documents unnecessarily
- For multi-field sorts, field order matters: first field is primary sort key
- String sorting is case-sensitive by default — "Z" comes before "a" in ASCII order
- Adding an index on the sort field dramatically improves sort performance

---

### Q15. How does `limit()` and `skip()` work for pagination?

**Question:**
How do you implement pagination in MongoDB using `limit()` and `skip()`?

**Answer:**
- `limit(n)` — returns at most `n` documents
- `skip(n)` — skips the first `n` documents in the result
- Together, they implement **offset-based pagination**

**Pagination formula:**
```js
const page = 2;   // current page number
const limit = 10; // items per page
const skip = (page - 1) * limit;  // = 10

db.products.find().sort({ name: 1 }).skip(skip).limit(limit)
```

**Full pagination example:**
```js
async function getProducts(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    db.products.find()
               .sort({ createdAt: -1 })
               .skip(skip)
               .limit(limit),
    db.products.countDocuments()
  ]);

  return {
    data: products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  };
}
```

**Limitation of skip-based pagination:**
```
Problem: skip(1000000) still scans 1M docs before skipping
Solution: Cursor-based pagination (use _id as cursor)
```

**Cursor-based pagination (better for large datasets):**
```js
// First page
db.posts.find().sort({ _id: -1 }).limit(10)

// Next page: pass the last _id from previous page as cursor
db.posts.find({ _id: { $lt: lastSeenId } }).sort({ _id: -1 }).limit(10)
```

**Key Points:**
- `skip()` is inefficient for large offsets — it scans and discards documents
- Use cursor-based pagination (keyset pagination) for better performance at scale
- Always combine `skip()` with a `sort()` to get consistent results


---

### Q16. What are Element Operators `$exists` and `$type`?

**Question:**
What are the `$exists` and `$type` operators in MongoDB and when do you use them?

**Answer:**

**`$exists`** — Checks whether a field exists in a document:
```js
// Find users who have a phone number
db.users.find({ phone: { $exists: true } })

// Find users missing an email (data quality check)
db.users.find({ email: { $exists: false } })

// Find users where address exists AND is not null
db.users.find({ address: { $exists: true, $ne: null } })
```

**`$type`** — Filters documents by the BSON data type of a field:
```js
// Find docs where age is stored as a number
db.users.find({ age: { $type: "number" } })

// Find docs where age is stored as a string (bad data)
db.users.find({ age: { $type: "string" } })

// Find all docs where _id is an ObjectId
db.users.find({ _id: { $type: "objectId" } })

// Find docs where a field is null
db.users.find({ deletedAt: { $type: "null" } })
```

**Common BSON type aliases:**
```
"double", "string", "object", "array", "binData",
"objectId", "bool", "date", "null", "int", "long", "decimal"
```

**Key Points:**
- `$exists: false` matches both missing fields AND fields with null values differently — be careful
- `$type` is useful for finding data type inconsistencies (e.g., age stored as string in some docs)
- Combine `$exists` and `$type` for precise field validation queries

---

### Q17. What are Array Operators in MongoDB?

**Question:**
Explain the `$in`, `$all`, and `$elemMatch` array operators in MongoDB.

**Answer:**

**`$in`** — Field value matches ANY value in the provided array:
```js
// Users in any of these cities
db.users.find({ "address.city": { $in: ["Mumbai", "Delhi", "Pune"] } })

// Orders with these statuses
db.orders.find({ status: { $in: ["pending", "processing"] } })
```

**`$all`** — Array field contains ALL specified values:
```js
// Products tagged with BOTH "wireless" AND "bluetooth"
db.products.find({ tags: { $all: ["wireless", "bluetooth"] } })

// Tasks requiring ALL these skills
db.tasks.find({ requiredSkills: { $all: ["React", "Node.js"] } })
```

**`$elemMatch`** — At least one array element matches ALL conditions:
```js
// Orders with at least one item: price > 500 AND qty > 2
db.orders.find({
  items: {
    $elemMatch: {
      price: { $gt: 500 },
      quantity: { $gt: 2 }
    }
  }
})
```

**Why `$elemMatch` matters:**
```js
// These behave DIFFERENTLY:

// Without $elemMatch:
// Matches if items array has ANY element with price > 500
// AND ANY element (possibly different) with qty > 2
db.orders.find({ "items.price": { $gt: 500 }, "items.quantity": { $gt: 2 } })

// With $elemMatch:
// Matches only if a SINGLE element has BOTH price > 500 AND qty > 2
db.orders.find({ items: { $elemMatch: { price: { $gt: 500 }, quantity: { $gt: 2 } } } })
```

**Key Points:**
- `$in` is efficient and can use indexes
- `$all` requires the array to contain every listed value (order doesn't matter)
- `$elemMatch` is critical when you need multiple conditions on the **same array element**

---

### Q18. What is `$regex` in MongoDB?

**Question:**
How do you use regular expressions for string searching in MongoDB?

**Answer:**
- `$regex` allows **pattern matching** on string fields
- MongoDB uses PCRE (Perl Compatible Regular Expressions)

**Examples:**
```js
// Find users whose name starts with "A"
db.users.find({ name: { $regex: /^A/ } })
// or:
db.users.find({ name: { $regex: "^A" } })

// Case-insensitive search
db.users.find({ name: { $regex: /alice/i } })
// or:
db.users.find({ name: { $regex: "alice", $options: "i" } })

// Contains a word anywhere
db.products.find({ description: { $regex: /wireless/i } })

// Ends with a pattern
db.users.find({ email: { $regex: /@gmail\.com$/ } })

// Match name starting with "A" or "B"
db.users.find({ name: { $regex: /^[AB]/i } })
```

**Performance warning:**
```
Leading wildcard regex (e.g., /.*word/) = CANNOT use index → full scan
Anchored regex (e.g., /^word/) = CAN use index → fast

✅ db.users.find({ name: /^Alice/ })  ← uses index
❌ db.users.find({ name: /Alice/ })   ← cannot use index (leading wildcard)
```

**Key Points:**
- Prefer Text Indexes (`$text`) over `$regex` for full-text search — much faster
- Anchored regex patterns (`^`) can use indexes
- Use `$options: "i"` for case-insensitive matching

---

### Q19. What is `countDocuments()` and `estimatedDocumentCount()`?

**Question:**
What is the difference between `countDocuments()` and `estimatedDocumentCount()` in MongoDB?

**Answer:**

| Method | How it works | Speed | Use when |
|--------|-------------|-------|---------|
| `countDocuments(filter)` | Counts by scanning matching documents | Slower (accurate) | Need exact count with a filter |
| `estimatedDocumentCount()` | Uses collection metadata (no scan) | Very fast | Need approx total count of entire collection |

**Examples:**
```js
// Count all users
db.users.countDocuments()

// Count users with specific filter
db.users.countDocuments({ role: "admin", isActive: true })

// Fast estimate of total documents (no filter support)
db.users.estimatedDocumentCount()

// In Mongoose
const total = await User.countDocuments({ isActive: true })
const estimate = await User.estimatedDocumentCount()
```

**Key Points:**
- Use `estimatedDocumentCount()` for dashboard totals where speed matters more than precision
- Use `countDocuments(filter)` when you need exact filtered counts
- For large collections, even `countDocuments()` without filters can be slow — prefer `estimatedDocumentCount()` for total counts

---

### Q20. How do you handle the `upsert` option?

**Question:**
What is the `upsert` option in MongoDB update operations?

**Answer:**
- `upsert: true` means: **update if the document exists, insert it if not**
- Combines "update" + "insert" = **upsert**
- Avoids having to first check existence then insert/update

**Examples:**
```js
// Update user settings if exists; create if not
db.userSettings.updateOne(
  { userId: "u123" },
  { $set: { theme: "dark", language: "en", notifications: true } },
  { upsert: true }
)

// If a doc with userId "u123" exists → updates it
// If it doesn't exist → creates:
// { userId: "u123", theme: "dark", language: "en", notifications: true }

// Using $setOnInsert — only set these fields on NEW documents
db.userSettings.updateOne(
  { userId: "u123" },
  {
    $set: { theme: "dark" },
    $setOnInsert: { createdAt: new Date() }  // only set when inserting
  },
  { upsert: true }
)
```

**Real-world use cases:**
```js
// Track page view count (create or increment)
db.pageStats.updateOne(
  { page: "/home" },
  { $inc: { views: 1 }, $set: { lastVisited: new Date() } },
  { upsert: true }
)

// Save/update user session
db.sessions.updateOne(
  { sessionId: "abc123" },
  { $set: { userId: "u1", expiresAt: new Date(Date.now() + 3600000) } },
  { upsert: true }
)
```

**Key Points:**
- `upsert` is atomic — no race condition between check-then-insert
- `$setOnInsert` is used alongside `$set` to set fields only when creating a new document
- `findOneAndUpdate()` also supports `upsert: true`

---

### Q21. What are the `$push` and `$pull` array update operators?

**Question:**
How do you add and remove elements from arrays in MongoDB documents?

**Answer:**

**`$push`** — Adds an element to an array:
```js
// Add a new skill to user's skills array
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { skills: "GraphQL" } }
)

// Add multiple elements at once
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { skills: { $each: ["Docker", "Kubernetes"] } } }
)

// Push and maintain a max array size (keep only latest 10 notifications)
db.users.updateOne(
  { _id: ObjectId("...") },
  {
    $push: {
      notifications: {
        $each: [{ msg: "New message", date: new Date() }],
        $slice: -10  // keep last 10 items
      }
    }
  }
)
```

**`$pull`** — Removes matching elements from an array:
```js
// Remove a specific skill
db.users.updateOne(
  { _id: ObjectId("...") },
  { $pull: { skills: "PHP" } }
)

// Remove elements matching a condition
db.orders.updateOne(
  { _id: ObjectId("...") },
  { $pull: { items: { category: "Cancelled" } } }
)
```

**`$addToSet`** — Like `$push` but prevents duplicates:
```js
db.users.updateOne(
  { _id: ObjectId("...") },
  { $addToSet: { roles: "premium" } }  // adds only if not already present
)
```

**Key Points:**
- `$push` allows duplicates; `$addToSet` does not
- Use `$each` with `$push` to add multiple elements atomically
- Use `$slice` with `$push` to implement a capped array (like a recent activity log)

---

### Q22. What does `distinct()` do in MongoDB?

**Question:**
How does the `distinct()` method work and when should you use it?

**Answer:**
- `distinct()` returns an **array of unique values** for a specified field
- Like SQL's `SELECT DISTINCT`

**Examples:**
```js
// Get all unique roles in users collection
db.users.distinct("role")
// Result: ["admin", "user", "moderator", "premium"]

// Get unique cities from all users
db.users.distinct("address.city")
// Result: ["Mumbai", "Delhi", "Bangalore", "Pune"]

// Distinct with filter
db.orders.distinct("status", { userId: ObjectId("u1") })
// Result: ["pending", "delivered"]  (only for this user)

// Get unique categories from products under ₹1000
db.products.distinct("category", { price: { $lt: 1000 } })
```

**Key Points:**
- `distinct()` returns a plain array, not a cursor
- Limited to 16MB result — for very large result sets, use aggregation with `$group` instead
- Useful for populating filter dropdowns in UIs (e.g., all available categories)

---

### Q23. What is `$size` in MongoDB?

**Question:**
How do you query documents based on the size of an array field in MongoDB?

**Answer:**
- `$size` matches documents where an array has **exactly** a specified number of elements

**Examples:**
```js
// Find users with exactly 3 skills
db.users.find({ skills: { $size: 3 } })

// Find orders with exactly 1 item
db.orders.find({ items: { $size: 1 } })

// Find posts with no tags (empty array)
db.posts.find({ tags: { $size: 0 } })
```

**For "greater than N elements" use aggregation or `$exists` trick:**
```js
// Find users with MORE than 2 skills
db.users.find({ "skills.2": { $exists: true } })
// Checks if index 2 (3rd element) exists → array has at least 3 elements

// Or use aggregation:
db.users.aggregate([
  { $match: { $expr: { $gt: [{ $size: "$skills" }, 2] } } }
])
```

**Key Points:**
- `$size` only checks for **exact** array length, not greater/less than
- To query by minimum array size, use `{ "array.N": { $exists: true } }` where N is the minimum index
- `$expr` with `$size` in aggregation is more flexible

---

### Q24. What is the MongoDB Shell and how is it used?

**Question:**
What is the MongoDB Shell (mongosh) and what are common commands used in it?

**Answer:**
- **mongosh** is the modern MongoDB Shell — a JavaScript-based interactive interface to MongoDB
- Used for database administration, data exploration, scripting, and querying

**Common shell commands:**
```js
// ─── Connection ────────────────────────────────
mongosh                           // connect to localhost
mongosh "mongodb://host:27017"    // connect to specific host
mongosh --username admin --password  // connect with auth

// ─── Database commands ─────────────────────────
show dbs                          // list all databases
use myapp                         // switch to database
db                                // show current database
db.dropDatabase()                 // delete current database

// ─── Collection commands ───────────────────────
show collections                  // list collections
db.createCollection("users")      // create collection
db.users.drop()                   // drop a collection
db.users.stats()                  // collection statistics

// ─── Utility commands ──────────────────────────
db.serverStatus()                 // server info
db.currentOp()                    // running operations
db.killOp(opId)                   // kill a slow query
```

**Key Points:**
- mongosh is the replacement for the legacy `mongo` shell
- It supports full JavaScript including `for` loops, functions, and `async/await`
- Useful for one-time data migrations, debugging, and admin tasks

---

### Q25. How do you import and export data in MongoDB?

**Question:**
What tools does MongoDB provide for importing and exporting data?

**Answer:**

**`mongoimport`** — Import data from JSON/CSV:
```bash
# Import JSON file
mongoimport --db myapp --collection users --file users.json --jsonArray

# Import CSV
mongoimport --db myapp --collection products --type csv \
  --headerline --file products.csv

# Import with authentication
mongoimport --uri "mongodb://user:pass@host:27017/db" \
  --collection users --file data.json
```

**`mongoexport`** — Export data to JSON/CSV:
```bash
# Export collection to JSON
mongoexport --db myapp --collection users --out users_backup.json

# Export with query filter
mongoexport --db myapp --collection orders \
  --query '{"status": "completed"}' --out completed_orders.json

# Export to CSV
mongoexport --db myapp --collection users \
  --type csv --fields name,email,role --out users.csv
```

**`mongodump` / `mongorestore`** — Binary backup/restore (better for full backups):
```bash
mongodump --db myapp --out ./backup        # create binary dump
mongorestore --db myapp ./backup/myapp     # restore from dump
```

**Key Points:**
- `mongoimport/export` works with human-readable JSON/CSV — good for specific collections
- `mongodump/mongorestore` creates binary backups — better for full database backups
- Always test imports on a dev database before production

---

### Q26. What is the `$where` operator and why should you avoid it?

**Question:**
What is the `$where` operator in MongoDB and why is it considered a performance concern?

**Answer:**
- `$where` allows you to **pass a JavaScript expression or function** to filter documents
- MongoDB evaluates the JavaScript for **every single document** in the collection

**Example:**
```js
// ❌ AVOID — extremely slow
db.users.find({
  $where: function() {
    return this.firstName + " " + this.lastName === "Alice Johnson"
  }
})

// ✅ BETTER — use a regular query
db.users.find({
  firstName: "Alice",
  lastName: "Johnson"
})

// ✅ BETTER — use $expr for field comparisons
db.products.find({
  $expr: { $gt: ["$sellingPrice", "$costPrice"] }
})
```

**Why `$where` is bad:**
- **Cannot use indexes** → always does a full collection scan
- **Slow** — executes JS engine for every document
- **Security risk** — potential injection if user input reaches it
- **Deprecated in newer MongoDB versions**

**Key Points:**
- Never use `$where` in production
- Use `$expr` for complex expressions that compare fields within a document
- Use proper query operators — they are always faster and can use indexes

---

### Q27. What is a Capped Collection?

**Question:**
What is a capped collection in MongoDB and what are its use cases?

**Answer:**
- A **capped collection** is a **fixed-size collection** that automatically overwrites the oldest documents when it reaches its size limit
- Documents are stored in **insertion order** (like a circular buffer / ring buffer)
- Very fast writes because documents are never moved or deleted individually

**Create a capped collection:**
```js
// Max 1000 documents
db.createCollection("activityLogs", {
  capped: true,
  max: 1000,
  size: 5242880  // 5MB max size (required field)
})

// Convert existing collection to capped
db.runCommand({ convertToCapped: "logs", size: 10485760 })
```

**Behaviors:**
```js
// Insert works normally
db.activityLogs.insertOne({ action: "login", userId: "u1", ts: new Date() })

// When full: oldest doc auto-removed, new doc added
// You cannot delete individual documents from a capped collection
// You cannot update a document if it would change its size
```

**Use cases:**
- Application logs / audit trails
- Recent activity feeds
- Circular event buffers
- Tailable cursors (real-time streaming)

**Key Points:**
- Once full, oldest documents are automatically replaced — no manual cleanup needed
- Cannot delete individual docs or do free-form updates (size-changing updates forbidden)
- Use for **time-series data** where you only need recent N records

---

### Q28. How do you rename a field in MongoDB?

**Question:**
How do you rename a field in existing MongoDB documents?

**Answer:**
- Use the `$rename` update operator to rename fields

**Examples:**
```js
// Rename single field in one document
db.users.updateOne(
  { _id: ObjectId("...") },
  { $rename: { "userName": "username" } }
)

// Rename field in ALL documents
db.users.updateMany(
  {},
  { $rename: { "phoneNumber": "phone", "emailAddress": "email" } }
)

// Rename nested field
db.users.updateMany(
  {},
  { $rename: { "address.streetName": "address.street" } }
)
```

**Key Points:**
- `$rename` moves the field to the new name and removes the old one
- If the new field name already exists, that field is overwritten
- If the source field doesn't exist, the operation is a no-op (no error)
- Use `updateMany({}, ...)` with caution in production — always test first

---

### Q29. What is the difference between `null` and missing fields in MongoDB?

**Question:**
How does MongoDB handle `null` values and what is the difference between a field set to `null` and a field that doesn't exist?

**Answer:**
```js
// Document A: field is explicitly null
{ _id: 1, name: "Alice", phone: null }

// Document B: field doesn't exist (missing)
{ _id: 2, name: "Bob" }

// Query: { phone: null } matches BOTH A and B!
db.users.find({ phone: null })
// Returns both documents — null query matches null values AND missing fields

// To match ONLY null values (not missing)
db.users.find({ phone: { $type: "null" } })
// Returns only Document A

// To match ONLY missing fields
db.users.find({ phone: { $exists: false } })
// Returns only Document B

// To match docs where phone exists but might be null
db.users.find({ phone: { $exists: true } })
// Returns only Document A (field exists, even though it's null)
```

**Key Points:**
- `{ field: null }` matches both `null` values AND missing fields
- Use `$exists: false` to match truly missing fields
- Use `{ $type: "null" }` to match only explicitly null fields
- This behavior catches many developers off-guard — important interview topic!

---

### Q30. How do you create and drop indexes from the shell?

**Question:**
What are the basic commands to create, view, and drop indexes in MongoDB?

**Answer:**
```js
// ─── Create Indexes ─────────────────────────────────
// Single field index
db.users.createIndex({ email: 1 })

// Unique index
db.users.createIndex({ email: 1 }, { unique: true })

// Index with custom name
db.users.createIndex({ createdAt: -1 }, { name: "idx_created_desc" })

// Compound index
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Text index for search
db.products.createIndex({ name: "text", description: "text" })

// TTL index: auto-delete after 1 hour
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })

// Sparse index: only index docs where field exists
db.users.createIndex({ phone: 1 }, { sparse: true })

// ─── View Indexes ───────────────────────────────────
db.users.getIndexes()           // list all indexes
db.users.indexStats()           // index usage statistics

// ─── Drop Indexes ───────────────────────────────────
db.users.dropIndex({ email: 1 })          // by index key
db.users.dropIndex("email_1")             // by auto-generated name
db.users.dropIndex("idx_created_desc")    // by custom name
db.users.dropIndexes()                    // drop ALL (except _id)
```

**Key Points:**
- `_id` index is always created automatically and cannot be dropped
- `createIndex()` is idempotent — calling it again with the same spec does nothing
- Creating an index on a large collection can be slow — use `{ background: true }` in older versions (MongoDB 4.4+ does this automatically)

---

## 🟡 Section 2: Intermediate Questions (Q31 – Q70)

---

### Q31. What is an Index in MongoDB and why is it important?

**Question:**
What is an index in MongoDB? How does it improve query performance?

**Answer:**
- An index is a **data structure** (B-Tree) that stores a small portion of a collection's data in a way that makes queries **faster**
- Without an index, MongoDB performs a **Collection Scan (COLLSCAN)** — reading every document
- With an index, MongoDB performs an **Index Scan (IXSCAN)** — jumping directly to matching documents

**Visual comparison:**
```
Without Index:
[doc1][doc2][doc3][doc4]...[doc1000000]
  ↑ Check every doc → O(n) time → SLOW

With B-Tree Index:
              [M]
            /     \
          [F]     [T]
         /   \   /   \
       [A-E][G-K][N-S][U-Z]
         → Jump directly → O(log n) → FAST
```

**Demonstrate with `explain()`:**
```js
// Without index — shows COLLSCAN (bad)
db.users.find({ email: "alice@example.com" }).explain("executionStats")
// executionStats.executionStages.stage: "COLLSCAN"
// totalDocsExamined: 1000000

// After creating index — shows IXSCAN (good)
db.users.createIndex({ email: 1 })
db.users.find({ email: "alice@example.com" }).explain("executionStats")
// executionStats.executionStages.stage: "IXSCAN"
// totalDocsExamined: 1
```

**Key Points:**
- Every index speeds up reads but **slows down writes** (index must be updated on insert/update/delete)
- The `_id` field is always indexed automatically
- Use `explain("executionStats")` to verify if your query uses an index

---

### Q32. What is a Compound Index?

**Question:**
What is a compound index in MongoDB? What is the ESR rule?

**Answer:**
- A **compound index** includes **multiple fields** in a single index
- The order of fields in a compound index matters significantly

**Example:**
```js
// Index on userId + status + createdAt
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })
```

**Prefix rule — the index supports these queries:**
```js
// ✅ Uses the index (starts with userId)
db.orders.find({ userId: ObjectId("u1") })

// ✅ Uses the index
db.orders.find({ userId: ObjectId("u1"), status: "pending" })

// ✅ Uses the index fully
db.orders.find({ userId: ObjectId("u1"), status: "pending" })
         .sort({ createdAt: -1 })

// ❌ Cannot use this index (doesn't start with userId)
db.orders.find({ status: "pending" })
```

**The ESR Rule (Equality → Sort → Range):**
```
Design compound indexes in this field order:
1. Equality fields first     (e.g., userId: exact match)
2. Sort fields next          (e.g., createdAt: for sorting)
3. Range fields last         (e.g., price: { $gt: 100 })

Query: { userId: "u1", status: "active", age: { $gt: 25 } }
                          ↑ equality    ↑ equality   ↑ range

Best index: { userId: 1, status: 1, age: 1 }
```

**Key Points:**
- A compound index on `{ a, b, c }` supports queries on `a`, `a+b`, and `a+b+c` — but NOT `b`, `c`, or `b+c` alone
- Field order in the index spec matters — `{ a:1, b:1 }` ≠ `{ b:1, a:1 }`
- ESR rule guides optimal index field ordering

---

### Q33. What is a Text Index in MongoDB?

**Question:**
How do text indexes work in MongoDB and how do you perform full-text search?

**Answer:**
- **Text indexes** enable **full-text search** across string fields
- They tokenize, stem, and ignore stop words (the, a, is, etc.)
- Only **one text index** is allowed per collection

**Create and use text index:**
```js
// Create text index on name and description
db.products.createIndex({ name: "text", description: "text" })

// Search for products containing "wireless"
db.products.find({ $text: { $search: "wireless" } })

// Search for phrase (exact match)
db.products.find({ $text: { $search: "\"noise cancelling\"" } })

// Exclude a term
db.products.find({ $text: { $search: "laptop -gaming" } })

// Sort by relevance score
db.products.find(
  { $text: { $search: "bluetooth speaker" } },
  { score: { $meta: "textScore" }, name: 1 }
).sort({ score: { $meta: "textScore" } })
```

**Weighted text index:**
```js
// Give name field 3x importance vs description
db.products.createIndex(
  { name: "text", description: "text" },
  { weights: { name: 3, description: 1 }, name: "product_text_idx" }
)
```

**Key Points:**
- Text search is language-aware — supports stemming (e.g., "running" matches "run")
- Only one text index per collection, but it can span multiple fields
- For production-grade search, consider Atlas Search (Lucene-based) or Elasticsearch

---

### Q34. What is the Aggregation Pipeline in MongoDB?

**Question:**
Explain the MongoDB aggregation pipeline and how it works.

**Answer:**
- The **aggregation pipeline** is a framework for **data transformation and analytics**
- Documents flow through a **series of stages** — each stage transforms the data
- Like an assembly line: input → stage1 → stage2 → ... → output

**Pipeline structure:**
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
{ $group: { _id: "$role", count: { $sum: 1 } } }  →  5 docs (by role)
        ↓
{ $sort: { count: -1 } }  →  5 docs (sorted)
        ↓
{ $limit: 3 }  →  3 docs (top 3)
        ↓
Result: Top 3 roles by active user count
```

**Full example:**
```js
db.orders.aggregate([
  // Stage 1: Filter
  { $match: { status: "completed", createdAt: { $gte: new Date("2024-01-01") } } },

  // Stage 2: Group by userId
  { $group: {
    _id: "$userId",
    totalOrders: { $sum: 1 },
    totalSpent:  { $sum: "$totalAmount" },
    avgOrder:    { $avg: "$totalAmount" }
  }},

  // Stage 3: Sort by total spent
  { $sort: { totalSpent: -1 } },

  // Stage 4: Top 10 customers
  { $limit: 10 }
])
```

**Key Points:**
- Pipelines are more powerful than `find()` for analytics and transformations
- Put `$match` as early as possible to reduce documents flowing through later stages
- Put `$match` before `$project` if `$match` uses original fields
- Use `allowDiskUse: true` for pipelines processing very large datasets

---

### Q35. Explain the `$group` stage in aggregation.

**Question:**
How does the `$group` aggregation stage work? What accumulators does it support?

**Answer:**
- `$group` groups documents by a specified expression (`_id`) and computes aggregate values

**Syntax:**
```js
{ $group: { _id: <expression>, <field>: { <accumulator>: <expression> } } }
```

**Accumulators:**

| Accumulator | Description |
|-------------|-------------|
| `$sum` | Sum of values |
| `$avg` | Average |
| `$min` | Minimum value |
| `$max` | Maximum value |
| `$count` | Count (MongoDB 5.0+) |
| `$push` | Adds values to array (with duplicates) |
| `$addToSet` | Adds unique values to array |
| `$first` | First value in group |
| `$last` | Last value in group |

**Examples:**
```js
// Count users per role
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])
// Result: [{ _id: "admin", count: 5 }, { _id: "user", count: 120 }]

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

// Overall total (no grouping key)
db.orders.aggregate([
  { $group: {
    _id: null,
    grandTotal: { $sum: "$amount" },
    orderCount: { $sum: 1 }
  }}
])
```

**Key Points:**
- `_id: null` groups ALL documents into a single group for overall stats
- `$push` builds arrays of values within each group (useful for collecting all items)
- After `$group`, original document fields are no longer accessible — only `_id` and computed fields

---

### Q36. What is `$lookup` in aggregation?

**Question:**
How does the `$lookup` stage work in MongoDB aggregation? How is it similar to SQL JOIN?

**Answer:**
- `$lookup` performs a **left outer join** with another collection
- It adds an array field to each document with matching documents from the joined collection

**Basic syntax:**
```js
{ $lookup: {
  from: "other_collection",    // collection to join with
  localField: "myField",       // field from current collection
  foreignField: "theirField",  // field from other collection to match
  as: "outputArray"            // name of the new array field
}}
```

**Example — Orders with User Details:**
```js
db.orders.aggregate([
  // Join orders with users
  { $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "customer"
  }},

  // Flatten array to object (since userId matches one user)
  { $unwind: "$customer" },

  // Shape the output
  { $project: {
    orderId: "$_id",
    totalAmount: 1,
    status: 1,
    "customer.name": 1,
    "customer.email": 1
  }}
])
```

**Advanced pipeline `$lookup` (MongoDB 3.6+):**
```js
// Join with conditions beyond field equality
{ $lookup: {
  from: "products",
  let: { orderItems: "$items" },
  pipeline: [
    { $match: { $expr: { $in: ["$_id", "$$orderItems.productId"] } } },
    { $project: { name: 1, price: 1 } }
  ],
  as: "productDetails"
}}
```

**Key Points:**
- `$lookup` always returns an **array** — even if one match; use `$unwind` to flatten to object
- It's a **left outer join** — all documents from the left collection are returned
- For performance, ensure the `foreignField` is indexed
- Multiple `$lookup` stages can be chained for complex joins

---

### Q37. What is `$unwind` in aggregation?

**Question:**
What does the `$unwind` stage do in MongoDB aggregation and why is it used?

**Answer:**
- `$unwind` **deconstructs an array field** — creates one output document per array element
- Commonly used before `$group` to aggregate on array elements, or after `$lookup` to flatten results

**Example:**
```js
// Document before $unwind:
{ _id: 1, name: "Alice", skills: ["JS", "Python", "MongoDB"] }

// After { $unwind: "$skills" }:
{ _id: 1, name: "Alice", skills: "JS" }
{ _id: 1, name: "Alice", skills: "Python" }
{ _id: 1, name: "Alice", skills: "MongoDB" }
// 3 documents created from 1
```

**Real-world use: Count total units sold by product**
```js
db.orders.aggregate([
  // Each order has an items array — unwind it
  { $unwind: "$items" },

  // Now each doc represents one item in one order
  { $group: {
    _id: "$items.productId",
    productName: { $first: "$items.name" },
    totalSold:   { $sum: "$items.quantity" }
  }},

  { $sort: { totalSold: -1 } }
])
```

**Handling empty arrays:**
```js
// By default, $unwind removes docs with empty/missing arrays
// To preserve them:
{ $unwind: { path: "$skills", preserveNullAndEmptyArrays: true } }
```

**Key Points:**
- `$unwind` can multiply document count significantly — always follow with `$group` or `$limit`
- Use `preserveNullAndEmptyArrays: true` to keep documents where the array is empty or missing
- `includeArrayIndex` option adds an index field showing the element's position in the original array

---

### Q38. What is `$project` in aggregation?

**Question:**
What is the `$project` stage in aggregation and what can it do beyond simple field selection?

**Answer:**
- `$project` **reshapes documents** — include/exclude fields, rename fields, and compute new fields

**Examples:**
```js
// Basic include/exclude
{ $project: { name: 1, email: 1, _id: 0 } }

// Rename a field
{ $project: { userName: "$name", userEmail: "$email" } }

// Computed fields
{ $project: {
  name: 1,
  priceWithTax: { $multiply: ["$price", 1.18] },             // GST
  discounted:   { $subtract: ["$price", "$discountAmount"] },
  fullName:     { $concat: ["$firstName", " ", "$lastName"] },
  nameUpper:    { $toUpper: "$name" },
  yearJoined:   { $year: "$createdAt" }
}}

// Conditional field
{ $project: {
  name: 1,
  status: {
    $cond: {
      if:   { $gte: ["$score", 70] },
      then: "Pass",
      else: "Fail"
    }
  }
}}

// Array operations
{ $project: {
  name: 1,
  firstTag:    { $arrayElemAt: ["$tags", 0] },
  tagCount:    { $size: "$tags" },
  hasPremium:  { $in: ["premium", "$roles"] }
}}
```

**Key Points:**
- `$project` is like SQL's `SELECT` but much more powerful — supports expressions
- Use `$addFields` if you want to add computed fields WITHOUT removing existing ones
- `$project: { field: 0 }` excludes; `$project: { field: 1 }` includes (can't mix, except `_id`)

---

### Q39. What is `$addFields` and how is it different from `$project`?

**Question:**
What is the difference between `$addFields` and `$project` in MongoDB aggregation?

**Answer:**

| Stage | Behavior |
|-------|---------|
| `$project` | Replaces document — only specified fields remain |
| `$addFields` | Adds/modifies fields — all original fields are kept |

```js
// Original document:
{ _id: 1, name: "Alice", price: 100, qty: 5 }

// Using $project:
{ $project: { totalValue: { $multiply: ["$price", "$qty"] } } }
// Result: { _id: 1, totalValue: 500 }
// ← name, price, qty are GONE

// Using $addFields:
{ $addFields: { totalValue: { $multiply: ["$price", "$qty"] } } }
// Result: { _id: 1, name: "Alice", price: 100, qty: 5, totalValue: 500 }
// ← all original fields preserved, totalValue ADDED
```

**Practical use:**
```js
db.products.aggregate([
  {
    $addFields: {
      priceWithGST: { $multiply: ["$price", 1.18] },
      isExpensive:  { $gt: ["$price", 10000] }
    }
  },
  { $match: { isExpensive: true } }
])
```

**Key Points:**
- Use `$addFields` when you want to enrich documents without losing existing fields
- Use `$project` when you want to reshape/reduce the document
- `$set` is an alias for `$addFields` (MongoDB 4.2+)

---

### Q40. What is `$match` and where should it be placed in a pipeline?

**Question:**
How does `$match` work in aggregation and why is placement in the pipeline important?

**Answer:**
- `$match` filters documents in the pipeline — like `WHERE` in SQL
- It reduces the number of documents flowing into subsequent stages

**Always put `$match` as early as possible:**
```js
// ✅ GOOD — filter first, then process fewer documents
db.orders.aggregate([
  { $match: { status: "completed", createdAt: { $gte: new Date("2024-01-01") } } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } }
])

// ❌ BAD — group ALL docs first, then filter (wasteful)
db.orders.aggregate([
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $match: { total: { $gt: 1000 } } }
])
```

**Filtering after group (legitimate use):**
```js
// This $match MUST come after $group — filtering on computed field
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  { $match: { totalSpent: { $gt: 5000 } } }  // ← this can only happen after $group
])
```

**`$match` with text search:**
```js
db.products.aggregate([
  { $match: { $text: { $search: "wireless bluetooth" } } },
  { $sort: { score: { $meta: "textScore" } } }
])
```

**Key Points:**
- `$match` at the start can **use indexes** — later in pipeline it cannot
- Every document filtered by `$match` reduces memory and CPU usage for later stages
- Use `$match` both at the start (to filter input) and after `$group` (to filter aggregated results)

---

### Q41. What is Embedding vs Referencing in data modeling?

**Question:**
What is the difference between embedding and referencing in MongoDB data modeling? When should you use each?

**Answer:**

**Embedding** — Store related data inside the same document:
```js
// User with embedded address
{
  _id: ObjectId("u1"),
  name: "Alice",
  address: {
    street: "123 MG Road",
    city: "Mumbai",
    pincode: "400001"
  }
}
```

**Referencing** — Store related data in separate collections, linked by ID:
```js
// users collection
{ _id: ObjectId("u1"), name: "Alice" }

// orders collection
{ _id: ObjectId("o1"), userId: ObjectId("u1"), total: 2500 }
```

**Decision guide:**

| Scenario | Recommendation |
|---------|---------------|
| Data always accessed together | **Embed** |
| Data is small and bounded | **Embed** |
| One-to-one relationship | **Embed** |
| Data grows unboundedly (e.g., order history) | **Reference** |
| Data shared across multiple documents | **Reference** |
| Need to query nested data independently | **Reference** |
| One-to-many (large many) | **Reference** |
| Many-to-many | **Reference** |

```
Rule of thumb:
"Data that is accessed together should be stored together"
```

**Key Points:**
- Embedding = fast reads (one query), risk of large documents
- Referencing = normalized data, requires multiple queries or `$lookup`
- MongoDB document size limit is **16MB** — a strong reason to reference growing data
- Most MongoDB schemas use a mix of both approaches

---

### Q42. What is the One-to-Many relationship pattern in MongoDB?

**Question:**
How do you model a One-to-Many relationship in MongoDB? What patterns are available?

**Answer:**

**Pattern 1: Embed array (good for small, bounded data)**
```js
// User with embedded addresses (max 3-5 per user)
{
  _id: ObjectId("u1"),
  name: "Alice",
  addresses: [
    { label: "Home", city: "Mumbai" },
    { label: "Office", city: "Pune" }
  ]
}
```

**Pattern 2: Reference from "many" side (recommended for most cases)**
```js
// users collection
{ _id: ObjectId("u1"), name: "Alice" }

// orders collection (each order references the user)
{ _id: ObjectId("o1"), userId: ObjectId("u1"), total: 2500 }
{ _id: ObjectId("o2"), userId: ObjectId("u1"), total: 1800 }
{ _id: ObjectId("o3"), userId: ObjectId("u1"), total: 950  }

// Query: Get all orders for Alice
db.orders.find({ userId: ObjectId("u1") })
```

**Pattern 3: Reference from "one" side (for small "many")**
```js
// Post with array of comment IDs
{
  _id: ObjectId("p1"),
  title: "My Blog Post",
  commentIds: [ObjectId("c1"), ObjectId("c2"), ObjectId("c3")]
}

// comments collection
{ _id: ObjectId("c1"), text: "Great post!", userId: ObjectId("u1") }
```

**Key Points:**
- **Most common pattern:** reference from the "many" side (`userId` in orders)
- Never embed arrays that can grow without bound — hits 16MB doc limit
- Use indexes on reference fields (`userId` in orders) for fast lookups

---

### Q43. What is the Many-to-Many relationship pattern?

**Question:**
How do you model a Many-to-Many relationship in MongoDB?

**Answer:**
**Example:** Students and Courses (each student can enroll in many courses; each course has many students)

**Option 1: Embed references on both sides (for small datasets)**
```js
// students
{
  _id: ObjectId("s1"),
  name: "Ravi",
  enrolledCourseIds: [ObjectId("c1"), ObjectId("c2")]
}

// courses
{
  _id: ObjectId("c1"),
  title: "MongoDB Mastery",
  enrolledStudentIds: [ObjectId("s1"), ObjectId("s2"), ObjectId("s3")]
}
```

**Option 2: Junction collection (recommended — especially when relationship has data)**
```js
// students collection
{ _id: ObjectId("s1"), name: "Ravi" }

// courses collection
{ _id: ObjectId("c1"), title: "MongoDB Mastery" }

// enrollments collection (junction)
{
  _id: ObjectId("e1"),
  studentId: ObjectId("s1"),
  courseId:  ObjectId("c1"),
  enrolledAt: ISODate("2024-01-10"),
  progress:   65,          // belongs to the relationship
  grade:      null,
  status:     "active"
}

// Query: Get all courses for student s1
db.enrollments.find({ studentId: ObjectId("s1") })

// Query: Get all students in course c1
db.enrollments.find({ courseId: ObjectId("c1") })
```

**Key Points:**
- A junction collection is better when the relationship itself has attributes (grade, enrollment date)
- Create indexes on both foreign key fields in the junction collection
- Use `$lookup` to join junction with course/student data in queries

---

### Q44. What is the `$expr` operator?

**Question:**
What is `$expr` in MongoDB and what problems does it solve?

**Answer:**
- `$expr` allows using **aggregation expressions inside query operators**
- Enables **comparing two fields** within the same document in a query
- Allows using aggregation operators in `find()` and `$match`

**Examples:**
```js
// Find products where sellingPrice > costPrice (compare two fields)
db.products.find({
  $expr: { $gt: ["$sellingPrice", "$costPrice"] }
})
// Cannot do this without $expr!

// Find users where first name and last name are the same
db.users.find({
  $expr: { $eq: ["$firstName", "$lastName"] }
})

// Find orders where discount is more than 20% of total
db.orders.find({
  $expr: {
    $gt: [
      "$discountAmount",
      { $multiply: ["$totalAmount", 0.2] }
    ]
  }
})

// In aggregation $match stage
db.inventory.aggregate([
  { $match: { $expr: { $lt: ["$stock", "$reorderLevel"] } } }
])
// Find items where current stock is below reorder level
```

**Key Points:**
- Before `$expr`, you couldn't compare two fields in the same document using `find()`
- `$expr` can use indexes if it uses simple comparisons on indexed fields
- Essential for business logic queries that compare computed values

---

### Q45. What is `$facet` in aggregation?

**Question:**
What is the `$facet` aggregation stage and when is it useful?

**Answer:**
- `$facet` runs **multiple independent aggregation pipelines** within a single stage on the same input
- Returns a single document with separate results for each sub-pipeline
- Perfect for building **search result pages with filters and counts simultaneously**

**Example — E-commerce search results with facets:**
```js
db.products.aggregate([
  // Filter: search results
  { $match: { $text: { $search: "laptop" } } },

  // Run multiple sub-pipelines simultaneously
  { $facet: {
    // Facet 1: paginated results
    "results": [
      { $sort: { price: 1 } },
      { $skip: 0 },
      { $limit: 10 },
      { $project: { name: 1, price: 1, brand: 1 } }
    ],

    // Facet 2: count per category
    "categoryCounts": [
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ],

    // Facet 3: count per brand
    "brandCounts": [
      { $group: { _id: "$brand", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ],

    // Facet 4: total result count
    "totalCount": [
      { $count: "total" }
    ]
  }}
])

// Output:
{
  results: [ ...10 products... ],
  categoryCounts: [ { _id: "Laptops", count: 45 }, ... ],
  brandCounts: [ { _id: "Apple", count: 12 }, ... ],
  totalCount: [ { total: 120 } ]
}
```

**Key Points:**
- `$facet` processes the input documents **once** and runs each sub-pipeline in parallel
- Without `$facet`, you'd need multiple separate queries — one for results, one for each facet count
- Ideal for building filter/search UIs with counts

---

### Q46. What is the `$bucket` and `$bucketAuto` stage?

**Question:**
What are the `$bucket` and `$bucketAuto` aggregation stages used for?

**Answer:**
- `$bucket` groups documents into **manually defined ranges** (buckets)
- `$bucketAuto` automatically creates **N evenly-distributed buckets**

**`$bucket` example — group products by price range:**
```js
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 1000, 5000, 20000, 100000],
      default: "100000+",   // catch-all for out-of-range values
      output: {
        count:   { $sum: 1 },
        products: { $push: "$name" }
      }
    }
  }
])
// Output:
// { _id: 0,     count: 45 }  ← ₹0–₹999
// { _id: 1000,  count: 120 } ← ₹1000–₹4999
// { _id: 5000,  count: 67 }  ← ₹5000–₹19999
// { _id: 20000, count: 23 }  ← ₹20000–₹99999
```

**`$bucketAuto` example:**
```js
db.products.aggregate([
  {
    $bucketAuto: {
      groupBy: "$price",
      buckets: 5,            // automatically create 5 equal buckets
      output: { count: { $sum: 1 }, avgPrice: { $avg: "$price" } }
    }
  }
])
```

**Key Points:**
- `$bucket` gives you full control over bucket boundaries
- `$bucketAuto` is useful when you don't know the data distribution ahead of time
- Both are great for generating histograms and distribution reports

---

### Q47. What are Performance Best Practices in MongoDB?

**Question:**
What are the key performance best practices when working with MongoDB?

**Answer:**

**1. Schema Design:**
```
✅ Design schemas around your query patterns (query-driven design)
✅ Embed data that's always accessed together
✅ Reference data that grows unboundedly
✅ Denormalize read-heavy data when needed
```

**2. Indexing:**
```js
// ✅ Index every field used in find(), sort(), and $lookup foreignField
db.orders.createIndex({ userId: 1, createdAt: -1 })

// ✅ Use explain() to verify index usage
db.orders.find({ userId: "u1" }).explain("executionStats")

// ❌ Don't index low-cardinality fields (boolean, status with 2 values)
// ❌ Don't create redundant indexes
```

**3. Queries:**
```js
// ✅ Use projection — only fetch needed fields
db.users.find({}, { name: 1, email: 1 })

// ✅ Put $match early in aggregation pipelines
// ✅ Use $limit before heavy operations
// ❌ Avoid $where — executes JS, can't use indexes
// ❌ Avoid leading regex /^/ — can't use index
// ❌ Avoid $ne/$nin on large unindexed collections
```

**4. Connections:**
```js
// ✅ Use connection pooling (Mongoose does this by default)
mongoose.connect(uri, { maxPoolSize: 10 })
```

**5. Operations:**
```js
// ✅ Use bulk operations instead of loops
await User.bulkWrite([...operations])

// ✅ Use $inc, $push instead of read-modify-write
// ✅ Use TTL indexes for expiring data
// ❌ Don't create very large documents (keep < 1MB typically)
```

**Key Points:**
- Most MongoDB performance problems are caused by missing indexes or poor schema design
- Always verify with `explain("executionStats")` — look for `IXSCAN` not `COLLSCAN`
- Keep working set (indexes + hot data) in RAM for best performance

---

### Q48. What is the WiredTiger storage engine?

**Question:**
What is the WiredTiger storage engine in MongoDB and what are its key features?

**Answer:**
- **WiredTiger** has been the default MongoDB storage engine since version 3.2
- It replaced the older MMAPv1 engine

**Key features:**
```
Document-level Locking:
  WiredTiger locks at the document level (not collection/database level)
  → Multiple writers can work on DIFFERENT documents simultaneously
  → Greatly improved write concurrency over MMAPv1

Compression:
  Data compression: Snappy (default), zlib, zstd
  Index compression: Prefix compression
  → 60-80% disk space savings vs uncompressed storage

Checkpoint System:
  Data written to disk in 60-second checkpoints
  Journal ensures durability between checkpoints

Cache:
  WiredTiger internal cache: default = 50% of RAM - 1GB
  (e.g., 16GB RAM → ~7GB WiredTiger cache)
```

```js
// Check storage engine
db.serverStatus().storageEngine
// { name: "wiredTiger", ... }

// Check compression stats
db.collection.stats()
```

**Key Points:**
- Document-level concurrency = high write throughput
- Compression saves significant disk space with minimal CPU overhead
- Properly sizing the WiredTiger cache is important for performance

---

### Q49. What is the explain() method and how do you read its output?

**Question:**
How do you use `explain()` in MongoDB and what are the key things to look for in its output?

**Answer:**
```js
// Three verbosity modes:
db.users.find({ email: "alice@example.com" }).explain()
// → "queryPlanner" mode: shows chosen plan, no execution stats

db.users.find({ email: "alice@example.com" }).explain("executionStats")
// → Shows detailed execution stats: docs examined, time, etc.

db.users.find({ email: "alice@example.com" }).explain("allPlansExecution")
// → Shows stats for ALL candidate plans (most verbose)
```

**Key fields to look at:**
```js
{
  "executionStats": {
    "executionTimeMillis": 2,       // ← Total query time
    "totalDocsExamined": 1,         // ← Should be close to totalDocsReturned
    "totalDocsReturned": 1,         // ← Actual results
    "executionStages": {
      "stage": "IXSCAN",            // ← IXSCAN = good | COLLSCAN = bad
      "indexName": "email_1"        // ← Which index was used
    }
  }
}
```

**What to look for:**
```
✅ stage: "IXSCAN"           → Using an index (good)
❌ stage: "COLLSCAN"         → Full scan (needs an index)

✅ totalDocsExamined ≈ totalDocsReturned  → Efficient query
❌ totalDocsExamined >> totalDocsReturned → Inefficient (low selectivity)

✅ executionTimeMillis < 100             → Acceptable
❌ executionTimeMillis > 1000           → Slow query, investigate
```

**Key Points:**
- `explain("executionStats")` is the most useful mode for optimization
- `COLLSCAN` is almost always a sign you need an index
- A large gap between `totalDocsExamined` and `totalDocsReturned` suggests poor index selectivity

---

### Q50. What is the `$count` stage in aggregation?

**Question:**
How do you count documents in an aggregation pipeline?

**Answer:**
```js
// Simple count using $count stage
db.orders.aggregate([
  { $match: { status: "pending" } },
  { $count: "pendingOrders" }
])
// Result: { pendingOrders: 142 }

// Count with grouping
db.users.aggregate([
  { $group: { _id: "$role", userCount: { $sum: 1 } } },
  { $sort: { userCount: -1 } }
])

// Total count as part of a $facet
db.products.aggregate([
  { $match: { category: "Electronics" } },
  { $facet: {
    results:    [{ $limit: 10 }],
    totalCount: [{ $count: "total" }]
  }}
])
```

**Alternative — `$group` with `$sum`:**
```js
db.orders.aggregate([
  { $match: { status: "pending" } },
  { $group: { _id: null, total: { $sum: 1 } } }
])
// Result: { _id: null, total: 142 }
```

**Key Points:**
- `$count` is a shorthand for `{ $group: { _id: null, n: { $sum: 1 } } }` + `{ $project: { _id: 0 } }`
- For simple counts without grouping, `countDocuments()` is simpler
- In `$facet`, use `$count` to get total result count alongside paginated results

---

### Q51. What is schema validation in MongoDB?

**Question:**
How does MongoDB enforce schema validation rules on a collection?

**Answer:**
- MongoDB is schema-less by default, but you can add **JSON Schema validation** to enforce rules

**Creating collection with validation:**
```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "Must be a valid email"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120
        },
        role: {
          enum: ["admin", "user", "moderator"],
          description: "Must be a valid role"
        }
      }
    }
  },
  validationLevel: "strict",   // "strict" (default) or "moderate"
  validationAction: "error"    // "error" (default) or "warn"
})

// Add validation to existing collection
db.runCommand({
  collMod: "users",
  validator: { $jsonSchema: { ... } },
  validationLevel: "strict"
})
```

**Validation levels:**
- `strict` — validates all inserts and updates
- `moderate` — validates inserts and updates to docs that already pass validation

**Validation actions:**
- `error` — rejects invalid documents with an error
- `warn` — allows invalid documents but logs a warning

**Key Points:**
- Schema validation is enforced at the database level, not just the application level
- Mongoose provides application-level validation; MongoDB validation is an extra safety net
- `validationAction: "warn"` is useful during migration phases

---

### Q52. What are Mongoose Schemas and Models?

**Question:**
What are Schemas and Models in Mongoose and how do they relate?

**Answer:**
- **Schema** defines the **structure, data types, and rules** for documents
- **Model** is a **class** built from a schema — it provides the interface to interact with a collection

**Schema:**
```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age:   { type: Number, min: 0, max: 120 },
  role:  { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  address: {
    city: String,
    country: { type: String, default: 'India' }
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true  // auto-adds createdAt and updatedAt
})
```

**Model:**
```js
const User = mongoose.model('User', userSchema)
// 'User' → collection name is 'users' (plural, lowercase)

module.exports = User
```

**Using the Model:**
```js
// Create
const user = await User.create({ name: "Alice", email: "alice@example.com" })

// Read
const users = await User.find({ role: "admin" })
const user  = await User.findById(id)

// Update
await User.findByIdAndUpdate(id, { $set: { age: 30 } }, { new: true })

// Delete
await User.findByIdAndDelete(id)
```

**Key Points:**
- Schema = blueprint; Model = the class that uses the blueprint
- Mongoose adds validation, middleware, and helper methods on top of raw MongoDB
- `new: true` in `findByIdAndUpdate` returns the updated document; without it, returns the original

---

### Q53. What are Mongoose Middleware (Hooks)?

**Question:**
What are Mongoose middleware (pre and post hooks) and what are they used for?

**Answer:**
- Middleware (hooks) are functions that run **before or after** Mongoose operations
- Types: `pre` (before) and `post` (after)
- Operations: `save`, `find`, `findOne`, `update`, `delete`, `validate`

**Pre-save hook — Hash password before saving:**
```js
const bcrypt = require('bcrypt')

userSchema.pre('save', async function(next) {
  // 'this' = the document being saved

  if (!this.isModified('password')) return next()  // only hash if changed

  try {
    this.password = await bcrypt.hash(this.password, 12)
    next()
  } catch (err) {
    next(err)  // pass error to next middleware
  }
})
```

**Pre-save hook — Auto-generate slug:**
```js
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-')
  }
  next()
})
```

**Post-save hook — Send welcome email:**
```js
userSchema.post('save', async function(doc, next) {
  await sendWelcomeEmail(doc.email, doc.name)
  next()
})
```

**Pre-find hook — Exclude inactive users from all queries:**
```js
userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } })
  next()
})
```

**Pre-delete hook — Clean up related data:**
```js
userSchema.pre('deleteOne', { document: true }, async function(next) {
  await Order.deleteMany({ userId: this._id })
  await Session.deleteMany({ userId: this._id })
  next()
})
```

**Key Points:**
- `this` in `pre` hooks refers to the document (for `save`) or the query (for `find/update`)
- Always call `next()` or `next(err)` to proceed or abort the operation
- `post` hooks receive the result document as first argument
- Hooks are powerful for cross-cutting concerns: logging, validation, cleanup, encryption

---

### Q54. What is Mongoose Population (populate)?

**Question:**
What is Mongoose's `populate()` method and how does it work?

**Answer:**
- `populate()` automatically **replaces a referenced ObjectId** with the actual document from the referenced collection
- Works through the `ref` option in the schema

**Setup:**
```js
const orderSchema = new Schema({
  userId:   { type: Schema.Types.ObjectId, ref: 'User' },   // ref to User model
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})
```

**Using populate:**
```js
// Populate single field
const order = await Order.findById(id).populate('userId')
// userId is now the full User object, not just an ObjectId

// Populate with field selection
const order = await Order.findById(id).populate('userId', 'name email')
// Only name and email of user are populated

// Populate multiple fields
const order = await Order.findById(id)
  .populate('userId', 'name email')
  .populate('products', 'name price')

// Nested populate
const order = await Order.findById(id).populate({
  path: 'userId',
  select: 'name department',
  populate: {
    path: 'department',  // populate user's department too
    select: 'name'
  }
})

// Populate entire collection query
const orders = await Order.find({ status: 'pending' })
  .populate('userId', 'name email phone')
```

**Key Points:**
- `populate()` makes a **separate query** to the referenced collection — not a real join
- It is a JavaScript-level operation, not a database-level join
- For large datasets, consider aggregation `$lookup` for better performance
- Always use `select` in `populate()` to avoid fetching unnecessary fields

---

### Q55. What is `$sort` in aggregation vs `.sort()` in queries?

**Question:**
What is the difference between `$sort` in aggregation and `.sort()` in queries?

**Answer:**

| | Query `.sort()` | Aggregation `$sort` |
|--|----------------|---------------------|
| Where | After `find()` | Inside pipeline array |
| On what | Original document fields | Current stage fields |
| Indexes | Can use indexes | Uses indexes only at start |
| Disk use | Configurable | `allowDiskUse` needed for large data |

**Query sort:**
```js
// Sort directly in a find query
db.users.find({ isActive: true }).sort({ name: 1, age: -1 })

// Mongoose
const users = await User.find({ isActive: true }).sort({ createdAt: -1 }).limit(20)
```

**Aggregation `$sort`:**
```js
db.users.aggregate([
  { $match: { isActive: true } },
  { $group: { _id: "$role", count: { $sum: 1 } } },
  { $sort: { count: -1 } },    // ← sort on COMPUTED field 'count'
  { $limit: 5 }
])
```

**Memory limit:**
```js
// Aggregation $sort can hit 100MB memory limit on large sorts
// Enable disk use to handle this:
db.orders.aggregate([...pipeline...], { allowDiskUse: true })
```

**Key Points:**
- `$sort` in aggregation can sort on computed fields created by earlier stages
- Placing `$sort` early in a pipeline (on indexed fields) allows index usage
- Combine `$sort` with `$limit` immediately after for "top N" queries — MongoDB optimizes this

---

### Q56. What are Mongoose virtuals?

**Question:**
What are virtual properties in Mongoose and what are they used for?

**Answer:**
- Virtuals are **computed fields** on a Mongoose document that are **not stored in the database**
- They are derived from existing fields and exist only in the application layer

**Examples:**
```js
const userSchema = new Schema({
  firstName: String,
  lastName:  String,
  dob:       Date,
  price:     Number,
  discount:  Number
})

// Virtual: full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

// Virtual: age from date of birth
userSchema.virtual('age').get(function() {
  const today = new Date()
  const birth = this.dob
  return today.getFullYear() - birth.getFullYear()
})

// Virtual: final price after discount
userSchema.virtual('finalPrice').get(function() {
  return this.price - (this.price * this.discount / 100)
})

// Virtual with setter
userSchema.virtual('fullName')
  .get(function() { return `${this.firstName} ${this.lastName}` })
  .set(function(name) {
    const [first, ...last] = name.split(' ')
    this.firstName = first
    this.lastName = last.join(' ')
  })

// Usage
const user = await User.findById(id)
console.log(user.fullName)  // "Alice Johnson"
user.fullName = "Bob Smith" // sets firstName and lastName
```

**Include virtuals in JSON output:**
```js
const userSchema = new Schema({ ... }, {
  toJSON:   { virtuals: true },   // include in .toJSON()
  toObject: { virtuals: true }    // include in .toObject()
})
```

**Key Points:**
- Virtuals are not persisted to the database — they exist only in memory
- They don't appear in `User.find()` results unless you configure `toJSON: { virtuals: true }`
- Useful for derived data like full name, age, formatted dates, computed prices

---

### Q57. What is `$cond` in aggregation?

**Question:**
How do you use conditional logic in MongoDB aggregation with `$cond` and `$switch`?

**Answer:**

**`$cond`** — if/then/else:
```js
{ $cond: { if: <condition>, then: <trueValue>, else: <falseValue> } }
// or shorthand:
{ $cond: [<condition>, <trueValue>, <falseValue>] }
```

**Examples:**
```js
// Label products as "Expensive" or "Affordable"
db.products.aggregate([
  { $project: {
    name: 1,
    price: 1,
    priceLabel: {
      $cond: {
        if:   { $gte: ["$price", 10000] },
        then: "Expensive",
        else: "Affordable"
      }
    }
  }}
])

// Pass/Fail based on score
db.exams.aggregate([
  { $project: {
    student: 1,
    score: 1,
    result: { $cond: [{ $gte: ["$score", 50] }, "Pass", "Fail"] }
  }}
])
```

**`$switch`** — multi-case conditional:
```js
db.orders.aggregate([
  { $project: {
    orderId: "$_id",
    priorityLevel: {
      $switch: {
        branches: [
          { case: { $gte: ["$amount", 100000] }, then: "VIP" },
          { case: { $gte: ["$amount", 10000] },  then: "High" },
          { case: { $gte: ["$amount", 1000] },   then: "Medium" }
        ],
        default: "Low"
      }
    }
  }}
])
```

**Key Points:**
- `$cond` is like ternary operator: `condition ? then : else`
- `$switch` is like a series of if-else conditions — first matching branch wins
- Both can be nested for complex logic
- Use with `$addFields` to add conditional fields without removing others

---

### Q58. What is the `$out` and `$merge` aggregation stage?

**Question:**
What are the `$out` and `$merge` stages in aggregation and how do they differ?

**Answer:**

**`$out`** — Writes pipeline results to a **new collection** (replaces entire collection):
```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
    _id: "$userId",
    totalSpent: { $sum: "$amount" },
    orderCount: { $sum: 1 }
  }},
  { $out: "userSpendingSummary" }  // ← writes result to this collection
])
// If "userSpendingSummary" exists, it is REPLACED entirely
```

**`$merge`** — Writes pipeline results to an **existing collection** (merge/upsert):
```js
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  {
    $merge: {
      into: "userStats",
      on: "_id",                        // match field
      whenMatched: "merge",             // merge fields if doc exists
      whenNotMatched: "insert"          // insert if doc doesn't exist
    }
  }
])
// whenMatched options: "replace", "keepExisting", "merge", "fail", pipeline
// whenNotMatched options: "insert", "discard", "fail"
```

**Key Points:**
- `$out` replaces the target collection atomically — old data is gone
- `$merge` allows fine-grained control: merge, replace, insert, or discard
- Both must be the **last stage** in the pipeline
- Useful for materialized views: pre-compute expensive aggregations and store results

---

### Q59. What is an Aggregation Expression?

**Question:**
What are aggregation expressions in MongoDB? Give examples of common expression operators.

**Answer:**
Aggregation expressions are operators used **inside aggregation stages** to compute values.

**Arithmetic:**
```js
{ $add:      ["$price", "$tax"] }             // addition
{ $subtract: ["$total", "$discount"] }        // subtraction
{ $multiply: ["$price", "$quantity"] }        // multiplication
{ $divide:   ["$total", "$count"] }           // division
{ $mod:      ["$value", 2] }                  // modulo
{ $round:    ["$avgPrice", 2] }               // round to 2 decimal places
{ $abs:      "$temperature" }                 // absolute value
```

**String:**
```js
{ $concat:    ["$firstName", " ", "$lastName"] }
{ $toUpper:   "$name" }
{ $toLower:   "$email" }
{ $substr:    ["$text", 0, 50] }    // first 50 chars
{ $strLenCP:  "$name" }             // string length
{ $trim:      { input: "$name" } }
```

**Date:**
```js
{ $year:        "$createdAt" }
{ $month:       "$createdAt" }
{ $dayOfMonth:  "$createdAt" }
{ $dayOfWeek:   "$createdAt" }
{ $hour:        "$createdAt" }
{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
```

**Array:**
```js
{ $size:         "$tags" }                // array length
{ $arrayElemAt:  ["$items", 0] }          // first element
{ $first:        "$scores" }              // (MongoDB 4.4+)
{ $last:         "$scores" }
{ $in:           ["admin", "$roles"] }    // check if value in array
{ $filter: { input: "$items", cond: { $gt: ["$$this.price", 100] } } }
```

**Key Points:**
- Expressions are used in `$project`, `$addFields`, `$group`, `$match` (via `$expr`), etc.
- `$$this` refers to the current element in array operations like `$filter`, `$map`
- `$$ROOT` refers to the current top-level document

---

### Q60. What is the difference between `$push` and `$addToSet` in `$group`?

**Question:**
In aggregation, what is the difference between `$push` and `$addToSet` accumulators?

**Answer:**

| Accumulator | Behavior |
|-------------|---------|
| `$push` | Adds ALL values to array (including duplicates) |
| `$addToSet` | Adds only UNIQUE values to array (no duplicates) |

**Example:**
```js
// Orders data:
// { userId: "u1", tag: "electronics" }
// { userId: "u1", tag: "sale" }
// { userId: "u1", tag: "electronics" }  ← duplicate tag!

// Using $push
db.orders.aggregate([
  { $group: {
    _id: "$userId",
    allTags:    { $push: "$tag" },
    uniqueTags: { $addToSet: "$tag" }
  }}
])

// Result:
{
  _id: "u1",
  allTags:    ["electronics", "sale", "electronics"],  // ← duplicates kept
  uniqueTags: ["electronics", "sale"]                  // ← duplicates removed
}
```

**Key Points:**
- `$push` preserves insertion order and all duplicates
- `$addToSet` gives you a unique set but the order is not guaranteed
- Use `$addToSet` when you want distinct values (e.g., unique categories per user)
- Use `$push` when you want all values including duplicates (e.g., all order IDs)

---

### Q61. What is `$lookup` with pipeline (advanced joins)?

**Question:**
How do you perform advanced joins using `$lookup` with a pipeline in MongoDB?

**Answer:**
The pipeline version of `$lookup` allows joining with **conditions beyond simple field equality**.

**Syntax:**
```js
{ $lookup: {
  from: "other_collection",
  let: { localVar: "$localField" },  // define variables from local doc
  pipeline: [
    { $match: { $expr: { <condition using $$localVar> } } },
    { ... more stages ... }
  ],
  as: "resultArray"
}}
```

**Example — Join orders with product details only for expensive items:**
```js
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      let: { orderedProductIds: "$items.productId", minPrice: 5000 },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$_id", "$$orderedProductIds"] },
                { $gte: ["$price", "$$minPrice"] }
              ]
            }
          }
        },
        { $project: { name: 1, price: 1, category: 1 } }
      ],
      as: "expensiveProducts"
    }
  }
])
```

**Example — Self-join (employees with their manager):**
```js
db.employees.aggregate([
  {
    $lookup: {
      from: "employees",    // same collection!
      localField: "managerId",
      foreignField: "_id",
      as: "manager"
    }
  },
  { $unwind: { path: "$manager", preserveNullAndEmptyArrays: true } }
])
```

**Key Points:**
- Pipeline `$lookup` is more flexible but can be slower than simple `$lookup`
- Use `let` to pass local fields as variables (accessed as `$$varName`) into the pipeline
- Always index the foreign collection's field for best `$lookup` performance

---

### Q62. What is the role of `$unwind` with `includeArrayIndex`?

**Question:**
How can you use `$unwind` to track the position of array elements?

**Answer:**
- `includeArrayIndex` adds a field that contains the **index position** of each unwound element

**Example:**
```js
// Document:
{ _id: 1, name: "Alice", skills: ["JS", "Python", "MongoDB"] }

// Unwind with index tracking
db.users.aggregate([
  {
    $unwind: {
      path: "$skills",
      includeArrayIndex: "skillIndex",
      preserveNullAndEmptyArrays: true
    }
  }
])

// Result:
{ _id: 1, name: "Alice", skills: "JS",      skillIndex: 0 }
{ _id: 1, name: "Alice", skills: "Python",  skillIndex: 1 }
{ _id: 1, name: "Alice", skills: "MongoDB", skillIndex: 2 }
```

**Practical use — Find the primary (first) address:**
```js
db.users.aggregate([
  { $unwind: { path: "$addresses", includeArrayIndex: "addrIndex" } },
  { $match: { addrIndex: 0 } },  // only keep first address
  { $project: { name: 1, primaryAddress: "$addresses" } }
])
```

**Key Points:**
- `includeArrayIndex` is useful when element order/position matters for analysis
- Combined with `$match` on the index, you can select specific elements by position
- Useful for first/last element analytics without using `$arrayElemAt`

---

### Q63. What is `$graphLookup`?

**Question:**
What is the `$graphLookup` aggregation stage and when is it used?

**Answer:**
- `$graphLookup` performs **recursive lookups** — it traverses graph-like relationships (like trees or hierarchies)
- Perfect for employee hierarchies, category trees, social network connections

**Example — Employee org chart:**
```js
// employees collection:
{ _id: 1, name: "CEO",       managerId: null }
{ _id: 2, name: "CTO",       managerId: 1 }
{ _id: 3, name: "Eng Lead",  managerId: 2 }
{ _id: 4, name: "Developer", managerId: 3 }

// Find all reports under CTO (recursive)
db.employees.aggregate([
  { $match: { name: "CTO" } },
  {
    $graphLookup: {
      from: "employees",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "managerId",
      as: "reportingChain",
      maxDepth: 10,         // limit recursion depth
      depthField: "level"   // add depth level to each result
    }
  }
])
```

**Key Points:**
- Works like a recursive SQL CTE (WITH RECURSIVE)
- Use `maxDepth` to prevent infinite loops in cyclic graphs
- Performance-intensive — use sparingly on large datasets
- Great for: org charts, category hierarchies, friend-of-friend queries

---

### Q64. How does MongoDB handle null vs missing field queries?

**Question:**
How does MongoDB differentiate between querying for null values and missing fields?

**Answer:**
This is a common source of bugs. See the behavior:
```js
// Sample docs:
// A: { _id: 1, name: "Alice", phone: null }     ← phone is null
// B: { _id: 2, name: "Bob" }                    ← phone is missing
// C: { _id: 3, name: "Carol", phone: "9876" }   ← phone has value

// Query 1: { phone: null }
db.users.find({ phone: null })
// Matches A AND B — returns both null AND missing!

// Query 2: Match ONLY null (not missing)
db.users.find({ phone: { $type: "null" } })
// Matches only A

// Query 3: Match ONLY missing (not null)
db.users.find({ phone: { $exists: false } })
// Matches only B

// Query 4: Field exists with any value (including null)
db.users.find({ phone: { $exists: true } })
// Matches A and C (not B)

// Query 5: Field exists AND is not null
db.users.find({ phone: { $exists: true, $ne: null } })
// Matches only C
```

**Key Points:**
- `{ field: null }` matches both null values and missing fields — common interview gotcha!
- Use `$type: "null"` for explicitly null values only
- Use `$exists: false` for truly missing fields
- This distinction is critical for data validation and cleanup queries

---

### Q65. What is the Aggregation `$replaceRoot` stage?

**Question:**
What is `$replaceRoot` in aggregation and when is it useful?

**Answer:**
- `$replaceRoot` **replaces the entire input document** with a specified embedded document

**Syntax:**
```js
{ $replaceRoot: { newRoot: <expression> } }
// or (MongoDB 4.2+):
{ $replaceWith: <expression> }
```

**Example — Promote nested address to top level:**
```js
// Original:
{ _id: 1, name: "Alice", address: { city: "Mumbai", pin: "400001" } }

// Aggregation:
db.users.aggregate([
  { $replaceRoot: { newRoot: "$address" } }
])

// Result:
{ city: "Mumbai", pin: "400001" }
// ← _id and name are gone; address object becomes the document
```

**Merge with original document:**
```js
db.users.aggregate([
  {
    $replaceRoot: {
      newRoot: { $mergeObjects: ["$address", "$$ROOT"] }
    }
  }
])
// ← Promotes address fields to top level while keeping other fields
```

**Key Points:**
- `$replaceRoot` is useful after `$unwind` to normalize nested data
- Use `$mergeObjects` with `$$ROOT` to merge nested fields with the parent
- `$replaceWith` is the shorthand alias (MongoDB 4.2+)

---

### Q66. What is Mongoose Error Handling for duplicate keys?

**Question:**
How do you handle duplicate key errors (E11000) in Mongoose?

**Answer:**
```js
// Error code 11000 = duplicate key violation

// Basic handling
try {
  const user = await User.create({ email: "existing@example.com" })
} catch (err) {
  if (err.code === 11000) {
    // err.keyValue = { email: "existing@example.com" }
    const field = Object.keys(err.keyValue)[0]
    const value = err.keyValue[field]
    throw new Error(`${field} "${value}" already exists`)
  }
  throw err
}

// Generic duplicate error handler
function handleMongoError(err) {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return { status: 400, message: messages.join(', ') }
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return { status: 409, message: `${field} already in use` }
  }
  return { status: 500, message: 'Internal server error' }
}

// Express error middleware
app.use((err, req, res, next) => {
  const { status, message } = handleMongoError(err)
  res.status(status).json({ success: false, error: message })
})
```

**Key Points:**
- Error code `11000` = duplicate key; `11001` = duplicate key on update (older MongoDB)
- `err.keyValue` tells you which field and value caused the conflict
- Always handle `11000` explicitly in create/update endpoints for clean error messages

---

### Q67. What is `$setWindowFields` in MongoDB?

**Question:**
What is the `$setWindowFields` aggregation stage used for?

**Answer:**
- `$setWindowFields` (MongoDB 5.0+) adds **window functions** like SQL's `OVER()` clause
- Computes values across a window of documents **without collapsing them** into groups

**Example — Running total and rank:**
```js
db.sales.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$region",        // group by region (like SQL PARTITION BY)
      sortBy: { date: 1 },           // sort within partition
      output: {
        runningTotal: {
          $sum: "$amount",
          window: { documents: ["unbounded", "current"] }  // from first to current
        },
        rank: { $rank: {} },         // rank within partition
        movingAvg: {
          $avg: "$amount",
          window: { documents: [-2, 0] }  // average of last 3 docs
        }
      }
    }
  }
])
```

**Key Points:**
- `$setWindowFields` computes values across related documents without losing individual records
- Supports: `$sum`, `$avg`, `$rank`, `$denseRank`, `$rowNumber`, `$shift`
- `partitionBy` divides documents into independent windows (like GROUP BY but without collapsing)
- Great for: running totals, rankings, moving averages, lead/lag analysis

---

### Q68. What is the `$sample` aggregation stage?

**Question:**
How do you get a random sample of documents from a collection in MongoDB?

**Answer:**
- `$sample` returns a **random subset** of documents from the collection

**Examples:**
```js
// Get 10 random products
db.products.aggregate([{ $sample: { size: 10 } }])

// Get 5 random active users
db.users.aggregate([
  { $match: { isActive: true } },
  { $sample: { size: 5 } }
])

// Random product recommendation
const randomProducts = await Product.aggregate([
  { $match: { category: "Electronics", inStock: true } },
  { $sample: { size: 4 } },
  { $project: { name: 1, price: 1, image: 1 } }
])
```

**How it works:**
- If `size` ≤ 5% of collection size: uses a pseudo-random cursor with reservoir sampling
- If `size` > 5%: does a full collection scan and random sort (slower)

**Key Points:**
- `$sample` is the correct way to get random documents — don't sort by `Math.random()` on the client
- Put `$match` before `$sample` for filtered random selection
- For very large collections, `$sample` can be slow if size is large relative to collection

---

### Q69. What is `allowDiskUse` in aggregation?

**Question:**
What is `allowDiskUse` in MongoDB aggregation and when do you need it?

**Answer:**
- Aggregation pipelines have a **100MB memory limit** per stage
- When this limit is exceeded, MongoDB throws an error
- `allowDiskUse: true` allows aggregation to **spill to disk** for intermediate results

**Usage:**
```js
// In mongosh
db.orders.aggregate([...pipeline...], { allowDiskUse: true })

// In Mongoose
const result = await Order.aggregate([...pipeline...]).allowDiskUse(true)

// Using the driver directly
await db.collection('orders').aggregate([...pipeline...], { allowDiskUse: true }).toArray()
```

**When you need it:**
```
- Large $sort stages (sorting millions of documents)
- $group with huge number of groups
- $lookup results in very large arrays
- Processing entire large collections without sufficient $match filtering
```

**Best practice — prefer fixing the query over using allowDiskUse:**
```
1. Add $match early to reduce data volume
2. Add $project to reduce document size
3. Add proper indexes
4. If still needed → use allowDiskUse
```

**Key Points:**
- `allowDiskUse: true` is slower than in-memory processing
- It writes temporary files to the `_tmp` subdirectory of the `--dbpath`
- MongoDB Atlas disables `allowDiskUse` for M0/M2/M5 (free/shared tier) clusters
- Always try to reduce data volume with `$match` and `$project` before resorting to `allowDiskUse`

---

### Q70. What is the `$redact` aggregation stage?

**Question:**
What is the `$redact` stage and how is it used for document-level security?

**Answer:**
- `$redact` **restricts content** of documents based on information stored within them
- It recursively traverses the document and conditionally includes/excludes fields

**System variables:**
- `$$KEEP` — keep the current document/sub-document and all its children
- `$$PRUNE` — exclude the current sub-document and all children
- `$$DESCEND` — keep current level but check children

**Example — Role-based field filtering:**
```js
// Documents with accessLevel field
{
  title: "Q4 Financial Report",
  accessLevel: 3,
  summary: { text: "Revenue increased...", accessLevel: 3 },
  details: { financials: "...", accessLevel: 5 }  ← higher security
}

// Redact based on user's clearance level
db.reports.aggregate([
  {
    $redact: {
      $cond: {
        if:   { $lte: ["$accessLevel", userClearanceLevel] },
        then: "$$DESCEND",   // check children
        else: "$$PRUNE"      // hide this and children
      }
    }
  }
])
```

**Key Points:**
- `$redact` is a security/access control tool — restricts data at the aggregation level
- More secure than application-level filtering because filtering happens at the database
- Requires `accessLevel` or similar fields to be stored within documents/sub-documents
- Works recursively — each sub-document is independently evaluated

---

## 🔴 Section 3: Advanced Questions (Q71 – Q100)

---

### Q71. What are MongoDB Transactions and when do you use them?

**Question:**
What are multi-document ACID transactions in MongoDB? When and how do you use them?

**Answer:**
- MongoDB 4.0+ supports **multi-document ACID transactions**
- Transactions guarantee that multiple operations on multiple documents/collections either **all succeed or all fail**
- Required for operations where **data consistency across multiple documents is critical**

**ACID in MongoDB transactions:**
```
Atomicity   → All operations commit or all roll back
Consistency → Database moves from one valid state to another
Isolation   → Concurrent transactions don't see each other's partial changes
Durability  → Committed data survives system failures
```

**Example — Bank transfer:**
```js
const transferFunds = async (fromId, toId, amount) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const from = await Account.findById(fromId).session(session)
    if (!from || from.balance < amount) {
      throw new Error('Insufficient funds')
    }

    // Both operations must succeed together
    await Account.findByIdAndUpdate(fromId, { $inc: { balance: -amount } }, { session })
    await Account.findByIdAndUpdate(toId,   { $inc: { balance: +amount } }, { session })

    await Transaction.create([{
      from: fromId, to: toId, amount, status: 'completed'
    }], { session })

    await session.commitTransaction()
    return { success: true }

  } catch (error) {
    await session.abortTransaction()  // rolls back all operations
    throw error
  } finally {
    session.endSession()
  }
}
```

**Key Points:**
- Transactions require a **Replica Set** (even single-node replica set works for dev)
- Transactions have a 60-second default timeout — keep them short
- Performance overhead is higher than non-transactional operations
- For single-document operations, MongoDB is always atomic without transactions

---

### Q72. What is a Replica Set in MongoDB?

**Question:**
What is a MongoDB Replica Set? How does it provide high availability?

**Answer:**
- A **Replica Set** is a group of MongoDB servers (nodes) that maintain the **same dataset**
- Provides **automatic failover** and **data redundancy**
- Minimum recommended: **3 nodes** (1 primary + 2 secondaries)

**Architecture:**
```
Replica Set (3 nodes):

  PRIMARY                    SECONDARY              SECONDARY
  ┌───────────┐              ┌──────────┐           ┌──────────┐
  │  node1    │──oplog──────▶│  node2   │           │  node3   │
  │  (writes) │──oplog──────────────────────────────▶          │
  └───────────┘              └──────────┘           └──────────┘
      ↑                           ↑                     ↑
  Client                    Can serve reads       Can serve reads
  (all writes)              (if configured)      (if configured)

  If PRIMARY fails:
  Secondaries hold an ELECTION → one becomes new PRIMARY automatically
  Typically completes in 10-30 seconds
```

**Key concepts:**
```js
// Connect to replica set
mongoose.connect("mongodb://host1:27017,host2:27017,host3:27017/mydb?replicaSet=myRS")

// Write concern — how many nodes must acknowledge a write
{ writeConcern: { w: "majority" } }   // majority of nodes must acknowledge

// Read preference — where to read from
{ readPreference: "secondaryPreferred" }  // prefer secondaries for reads
```

**Read preferences:**
| Option | Reads from |
|--------|-----------|
| `primary` | Only primary (default) |
| `primaryPreferred` | Primary, fall back to secondary |
| `secondary` | Only secondaries |
| `secondaryPreferred` | Secondaries, fall back to primary |
| `nearest` | Lowest network latency |

**Key Points:**
- Replica sets provide **high availability** and **disaster recovery**
- **Required for transactions** in MongoDB
- Oplog (operations log) is how primary replicates to secondaries
- Arbiter nodes participate in elections but hold no data

---

### Q73. What is MongoDB Sharding?

**Question:**
What is sharding in MongoDB? How does it enable horizontal scaling?

**Answer:**
- **Sharding** distributes data across multiple machines (shards) — horizontal scaling
- Each shard holds a **subset of the data**
- A **mongos router** directs queries to the correct shard(s)
- A **config server** (replica set) stores cluster metadata and shard key ranges

**Architecture:**
```
Client
  ↓
mongos (Query Router)
  ↓ [consults config servers for routing]
  ├──▶ Shard 1 (Replica Set): userId A–333K
  ├──▶ Shard 2 (Replica Set): userId 333K–666K
  └──▶ Shard 3 (Replica Set): userId 666K–1M

Config Servers (Replica Set):
  Store: shard key ranges, cluster metadata
```

**Shard key selection:**
```js
// Enable sharding on database
sh.enableSharding("myapp")

// Shard a collection using userId as shard key
sh.shardCollection("myapp.orders", { userId: "hashed" })
// "hashed" = hash-based sharding (even distribution)
// 1 = range-based sharding

// Good shard keys:
// ✅ High cardinality (many unique values)
// ✅ Even distribution across shards
// ✅ Used in most queries (for targeted queries)

// Bad shard keys:
// ❌ Low cardinality (boolean, status)
// ❌ Monotonically increasing (_id, timestamp) → hot shard problem
// ❌ Not in common queries → scatter-gather queries
```

**Targeted vs scatter-gather queries:**
```
Targeted query (includes shard key):   → goes to ONE shard  → fast
db.orders.find({ userId: "u1" })

Scatter-gather (no shard key):         → goes to ALL shards → slow
db.orders.find({ status: "pending" })  (must ask all shards)
```

**Key Points:**
- Sharding is for when a single replica set can no longer handle the data volume or throughput
- The shard key cannot be changed after sharding — choose carefully
- MongoDB Atlas automates most sharding complexity

---

### Q74. What is the Oplog in MongoDB?

**Question:**
What is the MongoDB Oplog (operations log) and how does it work?

**Answer:**
- The **oplog** (operations log) is a **special capped collection** (`local.oplog.rs`) on the primary node
- It records every **write operation** that modifies data
- Secondary nodes continuously **read and replay** the oplog to stay in sync with the primary

**Oplog entry structure:**
```js
{
  "ts": Timestamp(1704067200, 1),  // time of operation
  "op": "i",                        // operation type: i=insert, u=update, d=delete, c=command
  "ns": "myapp.users",             // namespace (db.collection)
  "o":  { _id: ObjectId("..."), name: "Alice", email: "alice@..." }  // operation data
}
```

**Operation types:**
```
"i" → insert
"u" → update
"d" → delete
"c" → command (createCollection, dropCollection, etc.)
"n" → no-op (heartbeat)
```

**Oplog window:**
- The oplog is a **capped collection** — it has a fixed size (configurable)
- Older entries are overwritten when full
- If a secondary falls too far behind (oplog window), it needs to **initial sync** instead

**Key Points:**
- The oplog is the foundation of MongoDB replication
- Larger oplog = longer window for secondaries to catch up after downtime
- Oplog is also used by **Change Streams** for real-time change notifications
- Tools like MongoDB Kafka Connector tap into the oplog for change data capture (CDC)

---

### Q75. What are Change Streams in MongoDB?

**Question:**
What are MongoDB Change Streams and how do you use them for real-time updates?

**Answer:**
- **Change Streams** allow applications to **subscribe to real-time changes** in a collection, database, or entire deployment
- Built on top of the oplog
- Available in MongoDB 3.6+ on Replica Sets

**Basic usage:**
```js
// Watch a collection for all changes
const changeStream = db.collection('orders').watch()

changeStream.on('change', (change) => {
  console.log('Change detected:', change)
})

// Watch for specific operations
const changeStream = db.collection('orders').watch([
  { $match: { operationType: { $in: ['insert', 'update'] } } }
])

// With full document on update
const changeStream = db.collection('orders').watch([], {
  fullDocument: 'updateLookup'  // return the updated document
})

changeStream.on('change', (change) => {
  console.log('Operation:', change.operationType)  // insert, update, delete, replace
  console.log('Document:', change.fullDocument)
  console.log('Changes:', change.updateDescription)
})
```

**Resume token — reconnect without missing events:**
```js
let resumeToken
const changeStream = collection.watch()

changeStream.on('change', (change) => {
  resumeToken = change._id    // save the resume token
  processChange(change)
})

// On reconnect:
const newStream = collection.watch([], { resumeAfter: resumeToken })
```

**Key Points:**
- Change Streams are perfect for: real-time notifications, event-driven microservices, cache invalidation, audit logs
- Require a Replica Set (even single-node in development)
- Use `resumeAfter` to handle disconnects without losing events
- Available at collection, database, or deployment level

---

### Q76. What is Write Concern in MongoDB?

**Question:**
What is Write Concern in MongoDB and how does it affect data durability?

**Answer:**
- **Write Concern** describes the **level of acknowledgment** requested from MongoDB for write operations
- Higher write concern = more durable but slightly slower

**Write concern options:**
```js
// w: number of nodes that must acknowledge the write
{ writeConcern: { w: 0 } }           // no acknowledgment (fire and forget)
{ writeConcern: { w: 1 } }           // primary only acknowledges (default)
{ writeConcern: { w: 2 } }           // primary + 1 secondary
{ writeConcern: { w: "majority" } }  // majority of nodes must acknowledge (safest)

// j: write to journal before acknowledging
{ writeConcern: { w: 1, j: true } }  // acknowledged + written to journal

// wtimeout: max wait time for acknowledgment (milliseconds)
{ writeConcern: { w: "majority", wtimeout: 5000 } }
```

**In Mongoose:**
```js
// Set at connection level
mongoose.connect(uri, { writeConcern: { w: 'majority' } })

// Set at operation level
await User.create(data, { writeConcern: { w: 'majority', j: true } })
```

**Trade-offs:**
```
w: 0    → Fastest, least durable (data loss possible)
w: 1    → Good balance (default)
w: majority → Safest, slightly slower (recommended for financial data)
j: true → Survives mongod crash (journal is written first)
```

**Key Points:**
- `w: "majority"` is recommended for critical data — ensures a replica set majority has the data
- `j: true` ensures data is on disk before acknowledging — survives process crash
- Higher write concern increases write latency but reduces risk of data loss

---

### Q77. What is Read Concern in MongoDB?

**Question:**
What is Read Concern in MongoDB and how does it affect data consistency?

**Answer:**
- **Read Concern** controls the **consistency and isolation properties** of data returned from read operations

**Read concern levels:**

| Level | Description | Use case |
|-------|-------------|---------|
| `local` | Returns data from current node (may not be majority-committed) | Default; fastest |
| `available` | Same as local for replica sets; for sharded clusters, may return orphaned data | Highest availability |
| `majority` | Returns data acknowledged by majority of nodes | Consistent reads |
| `linearizable` | Reflects all prior majority-acknowledged writes | Strongest consistency |
| `snapshot` | Consistent snapshot of majority-committed data at a point in time | Transactions |

**Usage:**
```js
// Using read concern in a query
db.orders.find({ status: "completed" }).readConcern("majority")

// In Mongoose
const orders = await Order.find({ status: "completed" })
  .read('majority')

// In transactions (snapshot is the default)
session.startTransaction({
  readConcern: { level: "snapshot" },
  writeConcern: { w: "majority" }
})
```

**Key Points:**
- `local` is the default and fastest — suitable for most use cases
- `majority` prevents reading data that might be rolled back
- `linearizable` is the strongest but slowest — only for single-document reads
- In transactions, `snapshot` ensures the transaction sees a consistent view of data

---

### Q78. What is the difference between vertical and horizontal scaling in MongoDB?

**Question:**
How do you scale MongoDB applications? What is the difference between vertical and horizontal scaling?

**Answer:**

**Vertical Scaling (Scale Up):**
```
Add more resources to a single server:
  8GB RAM → 64GB RAM
  4 cores → 32 cores
  SSD upgrade

Pros: Simple, no application changes
Cons: Has physical limits, expensive, single point of failure
     (A powerful machine still has one CPU threshold)
```

**Horizontal Scaling (Scale Out) — MongoDB's strength:**
```
Add more servers (shards):
  [Server1: users A-M] + [Server2: users N-Z]
  → [Server1] + [Server2] + [Server3] + [Server4]

Pros: Nearly unlimited scale, cost-effective commodity hardware
Cons: More complex, needs shard key planning
```

**MongoDB scaling strategies:**

```
Read-heavy workload:
  → Add replica set secondaries
  → Use readPreference: "secondaryPreferred"
  → Add caching layer (Redis)

Write-heavy workload:
  → Shard the collection (distribute writes)
  → Batch write operations
  → Use async writes where durability allows

Data volume growth:
  → Sharding to distribute storage
  → Archive old data (cold storage)
  → Use TTL indexes for automatic expiry

Query performance:
  → Add indexes for query patterns
  → Improve schema design
  → Use aggregation pipeline caching
```

**Key Points:**
- MongoDB is designed for horizontal scaling via sharding
- Start with vertical scaling (simpler) and shard when you hit limits
- Read scaling is easier (add secondaries); write scaling requires sharding

---

### Q79. What is MongoDB Atlas?

**Question:**
What is MongoDB Atlas and what advantages does it offer over self-hosted MongoDB?

**Answer:**
- **MongoDB Atlas** is MongoDB's fully-managed **Database as a Service (DBaaS)** on AWS, GCP, and Azure

**Key features:**
```
Infrastructure:
  ✅ Automated provisioning and scaling
  ✅ Built-in replica sets on all paid tiers
  ✅ Multi-region and multi-cloud deployments
  ✅ Auto-scaling (both storage and compute)

Operations:
  ✅ Automated backups (continuous with PITR)
  ✅ Automated patching and upgrades
  ✅ Performance Advisor (index recommendations)
  ✅ Real-time monitoring and alerts

Developer features:
  ✅ Atlas Search (Lucene-based full-text search)
  ✅ Atlas App Services (serverless functions, triggers)
  ✅ Atlas Data API (REST/GraphQL API without backend)
  ✅ Atlas Charts (built-in visualization)
  ✅ Online Archive (automatic cold storage tiering)
  ✅ Vector Search (for AI/semantic search)
```

**Self-hosted vs Atlas:**

| | Self-hosted | Atlas |
|--|------------|-------|
| Control | Full control | Limited (managed) |
| Operations burden | High | Low |
| Cost | Hardware + ops team | Subscription based |
| Features | Core MongoDB only | Atlas-specific extras |
| Compliance | You manage | Many certifications built-in |

**Key Points:**
- Atlas is the recommended choice for most teams — eliminates ops complexity
- Free tier (M0) available for development and learning
- Atlas Search is significantly better than MongoDB's built-in text indexes

---

### Q80. What is the MongoDB Connection String?

**Question:**
What is a MongoDB connection string and what are its key components?

**Answer:**
```
Standard URI format:
mongodb://[username:password@]host[:port][/database][?options]

SRV format (for Atlas/replica sets with DNS):
mongodb+srv://[username:password@]host[/database][?options]
```

**Examples:**
```js
// Local development
"mongodb://localhost:27017/myapp"

// With authentication
"mongodb://admin:password123@localhost:27017/myapp?authSource=admin"

// Replica Set
"mongodb://host1:27017,host2:27017,host3:27017/myapp?replicaSet=myRS"

// MongoDB Atlas (SRV)
"mongodb+srv://username:password@cluster0.abcde.mongodb.net/myapp"

// Atlas with options
"mongodb+srv://user:pass@cluster.mongodb.net/myapp?retryWrites=true&w=majority"
```

**Common options:**

| Option | Description |
|--------|-------------|
| `replicaSet` | Replica set name |
| `authSource` | Authentication database |
| `retryWrites` | Auto-retry write operations |
| `w` | Write concern |
| `maxPoolSize` | Max connection pool size |
| `connectTimeoutMS` | Connection timeout |
| `ssl=true` | Enable SSL/TLS |

**In Mongoose:**
```js
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
```

**Key Points:**
- Never hardcode connection strings — use environment variables
- MongoDB Atlas provides the connection string in the dashboard
- `retryWrites=true` is recommended for Atlas (automatically retries failed writes)

---

### Q81. What are the different deployment architectures for MongoDB?

**Question:**
What are the main MongoDB deployment architectures? When do you use each?

**Answer:**

**1. Standalone (Development only):**
```
[mongod]
Single server, no redundancy
Use for: Local development, testing
Never use in production
```

**2. Replica Set (Production standard):**
```
[Primary] ──oplog──▶ [Secondary] ──oplog──▶ [Secondary]

3-node minimum
Use for: Most production deployments
Provides: High availability, failover, read scaling
```

**3. Sharded Cluster (Large scale):**
```
[Client] → [mongos router]
                ↓
[Config Server RS] (metadata)
                ↓
[Shard 1 RS] [Shard 2 RS] [Shard 3 RS]
(each shard is itself a replica set)

Use for: Very large datasets, high write throughput
Provides: Horizontal scaling
```

**4. Multi-Region / Global Clusters:**
```
Region 1 (US)     Region 2 (EU)     Region 3 (APAC)
[Primary]         [Secondary]        [Secondary]
[Secondary]

Use for: Global applications, data locality requirements
Provides: Low latency worldwide, data residency compliance
```

**Key Points:**
- Always use at least a replica set in production — standalone has no failover
- Add sharding only when a replica set can't handle your data/throughput
- Global clusters (Atlas) automatically route writes to the nearest region

---

### Q82. How does MongoDB handle concurrent writes?

**Question:**
How does MongoDB handle concurrent write operations and what locking mechanisms does it use?

**Answer:**
- MongoDB uses **document-level concurrency control** via the **WiredTiger storage engine**
- WiredTiger uses **optimistic concurrency control** with MVCC (Multi-Version Concurrency Control)

**Lock levels:**
```
Global Lock    → Affects entire mongod (used only for global operations like backups)
Database Lock  → Affects entire database (DDL operations like createIndex)
Collection Lock→ Affects a collection (collection-level operations)
Document Lock  → Affects a single document (read/write operations) ← WiredTiger default
```

**MVCC (Multi-Version Concurrency Control):**
```
Reader 1: reading document A (v1)
Writer 1: writing document A (creates v2)

With MVCC:
- Reader 1 still sees v1 (snapshot at query start)
- Writer 1 creates v2 simultaneously
- No locking between readers and writers!
→ Readers never block writers
→ Writers never block readers
```

**Atomic operations:**
```js
// Single document operations are ALWAYS atomic
db.accounts.updateOne(
  { _id: "acc1" },
  { $inc: { balance: -100 } }
)
// This is atomic — no other operation can see a partial update

// For multi-document atomicity, use transactions
```

**Key Points:**
- WiredTiger's document-level locking enables high write concurrency
- Readers and writers don't block each other (MVCC)
- Single-document operations are always atomic in MongoDB (even without transactions)
- Multi-document atomicity requires explicit transactions

---

### Q83. What is the Aggregation Pipeline performance optimization?

**Question:**
What techniques can you use to optimize slow aggregation pipelines?

**Answer:**

**1. Put `$match` first to filter early:**
```js
// ✅ Good: filter first (reduces data volume)
[{ $match: { status: "active", createdAt: { $gte: cutoff } } }, { $group: ... }]

// ❌ Bad: process all docs first
[{ $group: ... }, { $match: { status: "active" } }]
```

**2. Index usage — `$match` at start can use indexes:**
```js
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })

db.orders.aggregate([
  { $match: { userId: ObjectId("u1"), status: "pending" } },  // uses index!
  { $sort: { createdAt: -1 } }  // also uses index!
])
```

**3. Reduce document size early with `$project`:**
```js
[
  { $match: { ... } },
  { $project: { relevantField1: 1, relevantField2: 1 } },  // strip unused fields early
  { $group: { ... } }
]
```

**4. Use `$limit` + `$sort` together (Top-N optimization):**
```js
// MongoDB optimizes $sort + $limit by using a min-heap internally
[{ $sort: { score: -1 } }, { $limit: 10 }]
```

**5. Use `$unwind` carefully:**
```js
// $unwind can dramatically increase document count
// Always follow with $match or $group to reduce back
[{ $unwind: "$items" }, { $match: { "items.category": "Electronics" } }]
```

**6. Use `explain()` on pipelines:**
```js
db.orders.explain("executionStats").aggregate([...pipeline...])
// Look for IXSCAN vs COLLSCAN, and totalDocsExamined
```

**Key Points:**
- Pipeline optimization follows the same principle as query optimization: reduce data as early as possible
- `$match` and `$sort` at the start can use indexes
- Use `allowDiskUse: true` as a last resort — fix the query first
- MongoDB has an internal **pipeline optimizer** that can reorder some stages automatically

---

### Q84. What are MongoDB Time Series Collections?

**Question:**
What are Time Series collections in MongoDB and when should you use them?

**Answer:**
- **Time Series collections** (MongoDB 5.0+) are optimized for **time-stamped data** like IoT sensor readings, metrics, logs, financial data
- MongoDB stores time series data more efficiently using columnar storage internally

**Creating a Time Series collection:**
```js
db.createCollection("sensorReadings", {
  timeseries: {
    timeField: "timestamp",      // field containing the time
    metaField: "sensorId",       // field to group measurements (metadata)
    granularity: "seconds"       // "seconds", "minutes", "hours"
  },
  expireAfterSeconds: 86400 * 30  // auto-expire after 30 days
})
```

**Inserting time series data:**
```js
db.sensorReadings.insertMany([
  { sensorId: "sensor_A1", timestamp: new Date(), temperature: 22.5, humidity: 65 },
  { sensorId: "sensor_A1", timestamp: new Date(), temperature: 22.8, humidity: 64 },
  { sensorId: "sensor_B2", timestamp: new Date(), temperature: 18.3, humidity: 70 }
])
```

**Querying:**
```js
// Get readings for a sensor in last hour
db.sensorReadings.find({
  sensorId: "sensor_A1",
  timestamp: { $gte: new Date(Date.now() - 3600000) }
}).sort({ timestamp: 1 })

// Aggregation — hourly average temperature
db.sensorReadings.aggregate([
  { $match: { sensorId: "sensor_A1" } },
  { $group: {
    _id: { $dateToString: { format: "%Y-%m-%dT%H:00", date: "$timestamp" } },
    avgTemp: { $avg: "$temperature" }
  }},
  { $sort: { _id: 1 } }
])
```

**Key Points:**
- Time series collections use columnar compression — significantly reduces storage (often 70–90%)
- They are automatically indexed on the time field + meta field
- Cannot update or delete individual measurements (append-only)
- Ideal for: IoT data, application metrics, financial tick data, server logs

---

### Q85. What is MongoDB Atlas Search?

**Question:**
What is MongoDB Atlas Search and how is it different from regular text indexes?

**Answer:**
- **Atlas Search** is a **full-text search engine** built into MongoDB Atlas, powered by Apache Lucene
- Provides far more advanced search capabilities than MongoDB's built-in `$text` indexes

**Comparison:**

| Feature | `$text` index | Atlas Search |
|---------|--------------|-------------|
| Engine | MongoDB native | Apache Lucene |
| Relevance scoring | Basic | Advanced (BM25) |
| Autocomplete | ❌ | ✅ |
| Fuzzy search | ❌ | ✅ |
| Facets | ❌ | ✅ |
| Custom analyzers | ❌ | ✅ |
| Synonyms | ❌ | ✅ |
| Geo search | ❌ | ✅ |
| Highlighting | ❌ | ✅ |

**Atlas Search query examples:**
```js
// Basic search
db.products.aggregate([
  {
    $search: {
      index: "product_search",
      text: {
        query: "wireless bluetooth headphones",
        path: ["name", "description"],
        fuzzy: { maxEdits: 1 }        // handle typos
      }
    }
  },
  { $limit: 10 },
  { $project: { name: 1, price: 1, score: { $meta: "searchScore" } } }
])

// Autocomplete
db.products.aggregate([
  {
    $search: {
      autocomplete: {
        query: "wire",
        path: "name"
      }
    }
  },
  { $limit: 5 }
])
```

**Key Points:**
- Atlas Search requires a **search index** configured in Atlas UI or via Atlas CLI
- Only available on MongoDB Atlas (not self-hosted)
- Much more suitable for production search features than `$text` indexes

---

### Q86. What is a Zone in MongoDB Sharding?

**Question:**
What are zones in MongoDB sharding and how do they support data locality?

**Answer:**
- **Zones** allow you to **associate specific shard key ranges** with designated shards
- Used for **data locality** — keeping certain data on servers in specific geographic regions or hardware

**Use cases:**
```
1. Geographic compliance: EU user data must stay in EU servers
2. Hardware tiering: Hot data on fast SSDs, cold data on HDDs
3. Multi-tenancy: Each tenant's data isolated to their own shard
```

**Example — geographic data locality:**
```js
// Add zone labels to shards
sh.addShardToZone("shard1", "US")   // shard1 is in US datacenter
sh.addShardToZone("shard2", "EU")   // shard2 is in EU datacenter
sh.addShardToZone("shard3", "APAC") // shard3 is in Asia

// Assign key ranges to zones
sh.updateZoneKeyRange(
  "myapp.users",
  { region: "US", _id: MinKey },    // min boundary
  { region: "US", _id: MaxKey },    // max boundary
  "US"                               // zone name
)

sh.updateZoneKeyRange("myapp.users", { region: "EU", _id: MinKey }, { region: "EU", _id: MaxKey }, "EU")
sh.updateZoneKeyRange("myapp.users", { region: "APAC", _id: MinKey }, { region: "APAC", _id: MaxKey }, "APAC")
```

**Key Points:**
- Zones enforce that only designated shards hold data for specified key ranges
- The shard key must include the zone-differentiating field (e.g., `region`)
- Critical for GDPR compliance — ensures EU data stays in EU dataservers

---

### Q87. What is MongoDB Compass?

**Question:**
What is MongoDB Compass and what can you do with it?

**Answer:**
- **MongoDB Compass** is the official **graphical user interface (GUI)** for MongoDB
- Free to download and use

**Key capabilities:**
```
📊 Data Explorer:
  - Browse databases, collections, documents visually
  - Edit documents in a form view or JSON editor
  - Filter, sort, and project with a visual query builder

📈 Performance:
  - Real-time performance panel (operations, memory, network)
  - Index management (create, drop, analyze)
  - Explain plan visualizer (see if queries use indexes)

🔍 Aggregation Pipeline Builder:
  - Build pipelines visually with stage-by-stage output preview
  - Export pipelines to application code (JavaScript, Python, etc.)

🔒 Schema Analysis:
  - Analyze field types and value distributions
  - Detect schema inconsistencies

🧬 Embedded MongoDB Shell:
  - Run mongosh commands directly in the GUI
```

**Key Points:**
- Compass is excellent for development, debugging, and data exploration
- The aggregation builder is invaluable for learning and building complex pipelines
- Available in 3 editions: Full (all features), Readonly (view only), Isolated (no internet)

---

### Q88. What is the difference between `$merge` and `$out` in aggregation?

**Question:**
When would you use `$merge` over `$out` as the final stage of an aggregation pipeline?

**Answer:**

| Feature | `$out` | `$merge` |
|---------|--------|---------|
| Target collection | Replaced entirely | Updated incrementally |
| If doc exists | Replaces everything | Configurable (merge/replace/fail/keep) |
| If doc not found | N/A | Configurable (insert/discard/fail) |
| Atomic | Yes (collection-level) | Per document |
| Use case | Full materialized view refresh | Incremental updates |

**`$out` — full refresh:**
```js
// Runs nightly to completely replace the summary
db.orders.aggregate([
  { $match: { year: 2024 } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $out: "annual_summary_2024" }   // replaces entire collection atomically
])
```

**`$merge` — incremental update:**
```js
// Runs hourly to update only changed records
db.orders.aggregate([
  { $match: { updatedAt: { $gte: lastRunTime } } },   // only recent changes
  { $group: { _id: "$userId", recentTotal: { $sum: "$amount" } } },
  {
    $merge: {
      into: "user_stats",
      on: "_id",
      whenMatched: [
        { $addFields: { cumulativeTotal: { $add: ["$cumulativeTotal", "$$new.recentTotal"] } } }
      ],
      whenNotMatched: "insert"
    }
  }
])
```

**Key Points:**
- Use `$out` for complete materialized view refreshes (simpler, atomic)
- Use `$merge` for incremental updates or when target collection must not lose existing data
- Both require the stage to be **last** in the pipeline
- `$merge` with `whenMatched: "pipeline"` allows complex merge logic using aggregation expressions

---

### Q89. What is Partial Index in MongoDB?

**Question:**
What is a partial index and what advantage does it have over a regular index?

**Answer:**
- A **partial index** indexes only **documents that match a filter expression**
- Smaller than a full index → less RAM, faster index maintenance

**Syntax:**
```js
db.collection.createIndex(
  { field: 1 },
  { partialFilterExpression: { <filter condition> } }
)
```

**Examples:**
```js
// Index only active users (skip inactive — 80% of collection might be inactive)
db.users.createIndex(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { isActive: { $eq: true } }
  }
)

// Index only documents where phone exists
db.users.createIndex(
  { phone: 1 },
  { partialFilterExpression: { phone: { $exists: true } } }
)

// Index only orders above ₹10,000 (high-value orders)
db.orders.createIndex(
  { userId: 1, amount: -1 },
  { partialFilterExpression: { amount: { $gt: 10000 } } }
)
```

**Querying with partial index:**
```js
// ✅ This query uses the partial index
db.users.find({ email: "alice@example.com", isActive: true })

// ❌ This query CANNOT use the partial index (missing filter condition)
db.users.find({ email: "alice@example.com" })
```

**Key Points:**
- Partial indexes are smaller → faster to scan and fit in RAM more easily
- Query must include the `partialFilterExpression` fields to use the index
- Useful for "hot path" queries on a subset of data (active records, high-value transactions)

---

### Q90. What is the WiredTiger Cache and how does it affect performance?

**Question:**
What is the WiredTiger cache and how should you size it for optimal MongoDB performance?

**Answer:**
- WiredTiger has an **internal cache** that holds recently accessed data and indexes in memory
- The more of the working set that fits in cache, the fewer disk reads required

**Default cache size:**
```
Default = max(50% of RAM - 1GB, 256MB)

Examples:
  16GB RAM → cache = 7GB
  8GB RAM  → cache = 3GB
  4GB RAM  → cache = 1.5GB
```

**Configure cache size:**
```yaml
# mongod.conf
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 4    # set to 4GB regardless of RAM
```

```js
// Or via command line:
// mongod --wiredTigerCacheSizeGB 4

// Check current cache usage in mongosh:
db.serverStatus().wiredTiger.cache
```

**The "Working Set":**
```
Working set = indexes + hot data (frequently accessed documents)

If working set fits in cache:
  → Reads served from RAM (microseconds)
  
If working set exceeds cache:
  → Cache evictions → disk I/O (milliseconds)
  → Performance drops significantly (100x+ slower)
```

**Monitoring cache:**
```js
db.serverStatus().wiredTiger.cache
// Look for:
// "bytes currently in the cache" vs "maximum bytes configured"
// High "pages read into cache" = cache pressure
// High "unmodified pages evicted" = working set > cache
```

**Key Points:**
- Keep your working set (hot data + indexes) within the WiredTiger cache for best performance
- If query patterns change, cache pressure changes — monitor with `db.serverStatus()`
- Don't set cache too large — OS also needs memory for file system cache

---

### Q91. What is MongoDB Realm / App Services?

**Question:**
What is MongoDB App Services (formerly Realm) and how does it extend MongoDB?

**Answer:**
- **MongoDB Atlas App Services** is a serverless backend platform built on MongoDB Atlas

**Key components:**
```
Atlas Functions:
  - Serverless JavaScript functions
  - Run in response to events or HTTP calls
  - No infrastructure to manage

Atlas Triggers:
  - Database Triggers: run functions when data changes (insert/update/delete)
  - Scheduled Triggers: cron-job style recurring functions
  - Authentication Triggers: run on user login/register

Data API:
  - Auto-generated REST API for CRUD operations
  - No backend code needed for simple operations

GraphQL API:
  - Auto-generated GraphQL API from your data model

Atlas Device Sync (Realm):
  - Sync data between MongoDB Atlas and mobile/edge devices
  - Works offline, syncs when connected
```

**Example — Database trigger:**
```js
// Trigger: runs every time an order is inserted
exports = async function(changeEvent) {
  const order = changeEvent.fullDocument
  const userId = order.userId

  // Auto-update user's total order count
  const users = context.services.get("mongodb-atlas").db("myapp").collection("users")
  await users.updateOne(
    { _id: userId },
    { $inc: { totalOrders: 1, totalSpent: order.amount } }
  )

  // Send notification
  await context.functions.execute("sendOrderConfirmation", order)
}
```

**Key Points:**
- App Services reduces backend boilerplate for common patterns
- Database triggers are excellent for denormalization maintenance and event-driven architectures
- Atlas Device Sync handles the complexity of offline-first mobile applications

---

### Q92. How do you perform a database migration in MongoDB?

**Question:**
How do you safely perform schema changes and data migrations in MongoDB?

**Answer:**
MongoDB's flexible schema means migrations are different from SQL `ALTER TABLE` — but they still require care.

**Strategy 1: Lazy migration (schema versioning):**
```js
// Add a schemaVersion field
{
  _id: ObjectId("..."),
  name: "Alice",
  schemaVersion: 1       // track current schema version
}

// Application handles both old and new schema:
function processUser(user) {
  if (!user.schemaVersion || user.schemaVersion < 2) {
    // migrate on read
    user = migrateUserV1toV2(user)
  }
  return user
}
```

**Strategy 2: Background migration script:**
```js
// Migration script: add 'isActive' field to all users
const batchSize = 1000
let processed = 0

while (true) {
  const result = await User.updateMany(
    { isActive: { $exists: false } },  // only docs missing the field
    { $set: { isActive: true } },
    { limit: batchSize }
  )

  processed += result.modifiedCount
  console.log(`Migrated ${processed} users`)

  if (result.modifiedCount < batchSize) break  // done
  await sleep(100)  // rate limit to avoid overwhelming the database
}
```

**Strategy 3: Rename fields:**
```js
// Rename field across all documents
db.users.updateMany(
  { userName: { $exists: true } },
  { $rename: { "userName": "username" } }
)
```

**Rollback plan:**
```
Always test migrations on a copy of production data first
Take a backup before running production migrations
Keep rollback scripts ready
Consider dual-write period: write to both old and new fields until migration completes
```

**Key Points:**
- MongoDB migrations don't need downtime — the flexible schema allows gradual migration
- Process in batches to avoid long-running operations that lock resources
- Always test with production data volume before running on production
- Use `$exists` to find documents that need migration

---

### Q93. What is a Real-world Architecture for a High-Traffic E-Commerce App?

**Question:**
How would you architect a MongoDB-based e-commerce application for high traffic?

**Answer:**

**Architecture overview:**
```
                                CDN (static assets)
                                      ↓
Users → Load Balancer → App Servers (Node.js / multiple instances)
                              ↓              ↓
                        Redis Cache    MongoDB Atlas
                        (sessions,     (application data)
                         hot data)           ↓
                                    Replica Set (3 nodes)
                                    + Read from secondaries
                                    + Sharding when needed
```

**Collection design:**
```js
// users — embed small, owned data
{ _id, email, passwordHash, profile: {...}, savedAddresses: [...few...] }

// products — read-heavy, heavily indexed
{ _id, name, price, category, brand, stock, tags, ratings }
// Indexes: { category, price }, { brand }, text index, { tags }

// orders — write-heavy, partition by userId
{ _id, userId, items: [snapshot], totalAmount, status, createdAt }
// Index: { userId, createdAt } for order history

// inventory — high-contention, use atomic $inc
{ _id: productId, available: 100, reserved: 5 }
// Always use $inc — never read-modify-write

// sessions → Redis (not MongoDB, much faster for TTL data)
```

**Key optimizations:**
```
1. Cache product catalog in Redis (changes rarely, read millions of times)
2. Read product details from Atlas secondary replicas
3. Index on { category: 1, price: 1 } for catalog browsing
4. Shard orders collection on { userId: "hashed" } for even distribution
5. Use $inc for inventory to prevent overselling
6. Denormalize product snapshot into order (price history protection)
7. Use Atlas Search for product search
8. TTL index on sessions/carts (auto-expire after 30 days)
9. Aggregate sales reports on replica, not primary
```

**Key Points:**
- Separate read and write concerns — run analytics on secondaries
- Cache aggressively at application layer (Redis) for read-heavy data
- Use atomic operations for inventory to prevent race conditions
- Design indexes around your most critical query paths

---

### Q94. What is the Bucket Pattern in MongoDB?

**Question:**
What is the Bucket Pattern in MongoDB and when is it used?

**Answer:**
- The **Bucket Pattern** groups related data into buckets (documents) to balance between too many small documents and too few large documents
- Especially useful for **time-series and IoT data**

**Problem without bucket pattern:**
```
// 1,000,000 individual sensor readings = 1,000,000 documents
// Too many documents → slow queries, index overhead
{ sensorId: "A1", ts: "2024-01-01T00:00:01", temp: 22.1 }
{ sensorId: "A1", ts: "2024-01-01T00:00:02", temp: 22.2 }
// ... one document per reading
```

**With bucket pattern (group into hourly buckets):**
```js
{
  sensorId: "A1",
  startTime: ISODate("2024-01-01T10:00:00"),
  endTime:   ISODate("2024-01-01T11:00:00"),
  count: 60,                    // readings in this bucket
  measurements: [               // array of readings
    { ts: ISODate("..."), temp: 22.1 },
    { ts: ISODate("..."), temp: 22.3 },
    // ... up to 60 readings
  ],
  summary: {                    // pre-computed stats
    minTemp: 21.8,
    maxTemp: 23.1,
    avgTemp: 22.4
  }
}
```

**Benefits:**
```
✅ 60x fewer documents (one per hour instead of one per minute)
✅ Pre-computed summary stats per bucket (no need to scan all readings for avg)
✅ Better compression
✅ Fewer index entries
```

**Key Points:**
- Bucket size should balance: too small = too many documents; too large = document too big
- MongoDB 5.0+ Time Series collections implement a form of bucketing automatically
- Great for: IoT sensors, application metrics, financial tick data

---

### Q95. What is the Computed Pattern in MongoDB?

**Question:**
What is the Computed Pattern in MongoDB and how does it improve performance?

**Answer:**
- The **Computed Pattern** pre-computes expensive calculations and stores the result in the document
- Trades write cost for drastically faster reads
- Ideal for values that are **read frequently but calculated infrequently**

**Example — Product with pre-computed average rating:**
```js
// Without Computed Pattern:
// Every time user views product, calculate avg from 10,000 review documents
// Very expensive for popular products!

// With Computed Pattern:
{
  _id: ObjectId("p1"),
  name: "Laptop Pro",
  price: 75000,
  // Pre-computed from reviews collection:
  ratings: {
    average: 4.6,        // pre-computed
    count: 2847,         // pre-computed
    distribution: {
      "5": 1423,
      "4": 895,
      "3": 312,
      "2": 145,
      "1": 72
    }
  }
}

// Update ratings when new review added:
db.products.updateOne(
  { _id: productId },
  {
    $inc: { "ratings.count": 1 },
    $set: {
      "ratings.average": newAverage,  // recomputed by app
      [`ratings.distribution.${newRating}`]: { $inc: 1 }
    }
  }
)
```

**Other examples:**
```js
// User stats
{
  userId: "u1",
  name: "Alice",
  // Pre-computed:
  stats: {
    totalOrders: 47,
    totalSpent: 125000,
    avgOrderValue: 2659
  }
}

// Blog post
{
  title: "MongoDB Tips",
  // Pre-computed engagement:
  engagement: {
    views: 15432,
    likes: 892,
    comments: 134,
    shares: 67
  }
}
```

**Key Points:**
- The Computed Pattern shifts work from reads (frequent) to writes (less frequent)
- Background jobs can recompute values periodically if real-time accuracy is not required
- Combine with Atlas Triggers for automatic recomputation on data change

---

### Q96. What is the Outlier Pattern in MongoDB?

**Question:**
What is the Outlier Pattern in MongoDB and what problem does it solve?

**Answer:**
- The **Outlier Pattern** addresses the situation where **most documents follow one pattern** but a few outliers have massively more data

**Problem:**
```
A social media app stores follower IDs in each user document.
Most users: 50–500 followers → small embedded array ✅
Celebrity users: 10,000,000 followers → document too large ❌
```

**Outlier Pattern solution:**
```js
// Regular user (followers embedded):
{
  _id: ObjectId("u1"),
  name: "Regular User",
  followerCount: 250,
  followers: [ObjectId("u2"), ObjectId("u3"), ... /* 250 IDs */],
  hasExtraFollowers: false
}

// Celebrity user (overflow to separate collection):
{
  _id: ObjectId("u999"),
  name: "Famous Celebrity",
  followerCount: 10000000,
  followers: [ObjectId("u2"), ObjectId("u3"), ... /* first 1000 IDs */],
  hasExtraFollowers: true   // flag indicating overflow exists
}

// celebrity_followers_overflow collection (for those with 1000+ followers):
{
  userId: ObjectId("u999"),
  page: 2,
  followers: [ObjectId("u1001"), ... /* next 1000 IDs */]
}
```

**Application logic:**
```js
async function getFollowers(userId) {
  const user = await User.findById(userId)

  if (!user.hasExtraFollowers) {
    return user.followers          // normal case — fast
  }

  // Outlier: fetch from overflow collection too
  const overflow = await FollowerOverflow.find({ userId })
  return [...user.followers, ...overflow.flatMap(o => o.followers)]
}
```

**Key Points:**
- The Outlier Pattern optimizes for the common case (most users) without being broken by edge cases (outliers)
- The `hasExtraFollowers` flag tells the application which path to take
- The 95% common case is fast; the 5% outlier case requires extra work

---

### Q97. What are common MongoDB Anti-Patterns?

**Question:**
What are the most common MongoDB anti-patterns that lead to performance issues?

**Answer:**

**Anti-pattern 1: Massive Arrays (unbounded arrays)**
```js
// ❌ WRONG: Growing array in a document
{ userId: "u1", orderIds: [id1, id2, id3, ... /* millions of IDs! */] }
// Will hit 16MB limit, causes write amplification

// ✅ CORRECT: Reference from the "many" side
{ orderId: "o1", userId: "u1" }  // in orders collection
```

**Anti-pattern 2: Unnecessary Collections**
```js
// ❌ WRONG: Separate collection for every user's todos
// "user_u1_todos", "user_u2_todos" ... "user_u100000_todos" collections

// ✅ CORRECT: One todos collection with userId field
{ _id, userId: "u1", title: "Buy milk", status: "pending" }
```

**Anti-pattern 3: Using ObjectId as timestamp**
```js
// ❌ WRONG: Don't derive time from ObjectId for queries
db.orders.find({}).sort({ _id: 1 })  // using _id as timestamp proxy

// ✅ CORRECT: Store explicit timestamp field
{ _id, createdAt: new Date(), ... }
db.orders.createIndex({ createdAt: -1 })
```

**Anti-pattern 4: Overusing `$where`**
```js
// ❌ WRONG
db.users.find({ $where: "this.age > 25" })  // can't use indexes, executes JS

// ✅ CORRECT
db.users.find({ age: { $gt: 25 } })
```

**Anti-pattern 5: Case-insensitive regex without text index**
```js
// ❌ WRONG for large collections (full scan)
db.products.find({ name: { $regex: /laptop/i } })

// ✅ CORRECT: Text index for case-insensitive search
db.products.createIndex({ name: "text" })
db.products.find({ $text: { $search: "laptop" } })
```

**Anti-pattern 6: No indexes on query fields**
```js
// ❌ WRONG: Finding users by email with no index
db.users.find({ email: "alice@example.com" })  // full collection scan!

// ✅ CORRECT:
db.users.createIndex({ email: 1 }, { unique: true })
```

**Anti-pattern 7: Read-Modify-Write for counters**
```js
// ❌ WRONG: Race condition!
const user = await User.findById(id)
await User.updateOne({ _id: id }, { $set: { count: user.count + 1 } })

// ✅ CORRECT: Atomic $inc
await User.updateOne({ _id: id }, { $inc: { count: 1 } })
```

**Key Points:**
- Most anti-patterns cause either 16MB document limit issues or missing index COLLSCAN problems
- The read-modify-write race condition is the most dangerous — always use atomic operators
- Always model data around query patterns, not around data relationships

---

### Q98. How do you secure a MongoDB deployment?

**Question:**
What are the key security practices for a MongoDB deployment?

**Answer:**

**1. Authentication:**
```js
// Create admin user
db.createUser({
  user: "adminUser",
  pwd: "strongPassword123!",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})

// Create application user (least privilege)
db.createUser({
  user: "appUser",
  pwd: "appPassword",
  roles: [{ role: "readWrite", db: "myapp" }]
})
```

**2. Enable authentication in config:**
```yaml
# mongod.conf
security:
  authorization: "enabled"
net:
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
    CAFile: /etc/ssl/ca.pem
```

**3. Network security:**
```yaml
net:
  bindIp: 127.0.0.1,10.0.0.5  # bind to specific IPs only
  # Never use 0.0.0.0 in production!
```

**4. Role-based access control (RBAC):**
```js
// Built-in roles:
// read, readWrite, dbAdmin, userAdmin, clusterAdmin, etc.

// Custom role for read-only analytics
db.createRole({
  role: "analyticsUser",
  privileges: [{
    resource: { db: "myapp", collection: "orders" },
    actions: ["find", "aggregate"]
  }],
  roles: []
})
```

**5. Atlas security (recommended):**
```
✅ Network Access: IP allowlist (never 0.0.0.0/0)
✅ Database Users: least privilege principle
✅ Encryption at rest: enabled by default on Atlas
✅ TLS/SSL: enforced by Atlas
✅ Audit logs: track all operations
✅ VPC Peering / Private Link: no public internet exposure
```

**Key Points:**
- Never run MongoDB without authentication (`--auth` flag or config file)
- Never bind to `0.0.0.0` in production — restrict to application server IPs
- Apply the principle of least privilege — app users should not have `dbAdmin` rights
- Enable TLS/SSL for all connections in production

---

### Q99. What is MongoDB's approach to GDPR compliance?

**Question:**
How does MongoDB support GDPR (and similar data privacy regulations) requirements?

**Answer:**

**Key GDPR requirements and MongoDB approaches:**

**1. Right to Erasure (Right to be Forgotten):**
```js
// Hard delete user and all related data
await User.deleteOne({ _id: userId })
await Order.updateMany({ userId }, { $unset: { userId: "" } })  // anonymize
await AuditLog.updateMany({ userId }, { $set: { userId: "DELETED" } })
```

**2. Data minimization — only collect what's needed:**
```js
// Only project necessary fields in API responses
await User.findById(id).select('name email preferences')
// Never return password, tokens, internal IDs to frontend
```

**3. Encryption of personal data:**
```js
// Field-level encryption (MongoDB CSFLE - Client-Side Field Level Encryption)
// SSN, credit card numbers can be encrypted at field level
const clientEncryption = new ClientEncryption(mongoClient, {
  keyVaultNamespace: "encryption.__keyVault",
  kmsProviders: { aws: { accessKeyId, secretAccessKey } }
})

// Encrypt sensitive field before storing
const encryptedSSN = await clientEncryption.encrypt(ssn, {
  algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
  keyId: dataKeyId
})
```

**4. Data portability:**
```js
// Export all user data
const userData = await User.findById(userId)
const userOrders = await Order.find({ userId })
const userActivity = await ActivityLog.find({ userId })
// Provide as JSON download
```

**5. Data locality (with sharding zones):**
```js
// Keep EU users' data in EU shards
sh.updateZoneKeyRange("myapp.users",
  { region: "EU", _id: MinKey },
  { region: "EU", _id: MaxKey },
  "EU_ZONE"
)
```

**Atlas features for compliance:**
- Encryption at rest (always on in Atlas)
- In-use encryption (CSFLE / Queryable Encryption)
- Audit logging
- Data residency (select regions)
- SOC2, ISO 27001, HIPAA, PCI DSS certifications available

**Key Points:**
- MongoDB's field-level encryption (CSFLE) encrypts sensitive fields BEFORE they leave the app
- Sharding zones ensure data physically stays in the correct geographic region
- Design your schema with data privacy in mind from the start — retrofitting is hard

---

### Q100. What are common MongoDB interview questions on real-world scenarios?

**Question:**
How would you solve these common real-world MongoDB design challenges?

**Answer:**

**Scenario 1: Design a notification system**
```js
// notifications collection
{
  _id: ObjectId,
  userId: ObjectId,      // recipient
  type: "order_shipped", // event type
  title: "Your order has shipped!",
  body: "Order #12345 is on its way",
  metadata: { orderId: ObjectId },
  isRead: false,
  createdAt: Date
}

// Indexes:
db.notifications.createIndex({ userId: 1, isRead: 1, createdAt: -1 })

// Get unread count (fast because of index)
db.notifications.countDocuments({ userId: userId, isRead: false })

// Mark all read
db.notifications.updateMany({ userId: userId, isRead: false }, { $set: { isRead: true } })
```

**Scenario 2: Rate limiting with MongoDB**
```js
// rate_limits collection with TTL
db.createCollection("rateLimits")
db.rateLimits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })

async function checkRateLimit(userId, maxRequests = 100, windowSeconds = 60) {
  const now = new Date()
  const windowStart = new Date(now - windowSeconds * 1000)

  const result = await db.rateLimits.findOneAndUpdate(
    { userId, windowStart: { $gte: windowStart } },
    {
      $inc: { count: 1 },
      $setOnInsert: { windowStart: now, expiresAt: new Date(now.getTime() + windowSeconds * 1000) }
    },
    { upsert: true, returnDocument: "after" }
  )

  if (result.count > maxRequests) {
    throw new Error("Rate limit exceeded")
  }
}
```

**Scenario 3: Leaderboard**
```js
// scores collection
db.scores.createIndex({ gameId: 1, score: -1 })

// Get top 10 for a game
db.scores.find({ gameId: "game1" })
         .sort({ score: -1 })
         .limit(10)
         .project({ userId: 1, score: 1, username: 1 })

// Upsert player score (keep only best score)
db.scores.updateOne(
  { userId: userId, gameId: gameId, score: { $lt: newScore } },  // only update if better
  { $set: { score: newScore, updatedAt: new Date() } },
  { upsert: true }
)
```

**Scenario 4: Implementing audit trail**
```js
// audit_logs collection (append-only, never update or delete)
{
  _id: ObjectId,
  timestamp: Date,
  action: "user.updated",      // what happened
  performedBy: ObjectId,       // who did it
  targetId: ObjectId,          // what was affected
  before: { ... },             // state before change
  after: { ... },              // state after change
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/..."
}

// Create audit log entry on every user update:
userSchema.post('findOneAndUpdate', async function(doc) {
  await AuditLog.create({
    action: 'user.updated',
    performedBy: this._update.$set.updatedBy,
    targetId: doc._id,
    after: doc.toObject()
  })
})
```

**Key Points:**
- Real-world questions test your ability to apply MongoDB patterns to specific problems
- Common themes: notifications, rate limiting, leaderboards, audit trails, analytics
- Always consider: query patterns first, then schema; indexes for all filter/sort fields; atomic operations for counters
- Be ready to discuss trade-offs: embedding vs referencing, consistency vs performance, simplicity vs scalability

---

## 🎯 Final Revision Cheat Sheet

### Most Commonly Asked Topics

```
Fundamentals:
  ✅ Document vs Collection vs Database
  ✅ BSON vs JSON (data types, binary)
  ✅ ObjectId structure and _id
  ✅ { field: null } matches null AND missing

CRUD:
  ✅ Always use $set with updateOne/updateMany
  ✅ insertMany ordered vs unordered
  ✅ upsert: true (update if exists, insert if not)
  ✅ findOneAndDelete returns the deleted doc

Operators:
  ✅ $in/$nin vs $all vs $elemMatch
  ✅ $exists vs $type vs null query behavior
  ✅ $inc is atomic — use for counters
  ✅ $push vs $addToSet (duplicates)

Indexing:
  ✅ IXSCAN (good) vs COLLSCAN (bad)
  ✅ ESR Rule: Equality → Sort → Range
  ✅ Compound index prefix rule
  ✅ Index slows writes, speeds reads

Aggregation:
  ✅ $match early to reduce data
  ✅ $group with accumulators ($sum, $avg)
  ✅ $lookup = left outer join (returns array)
  ✅ $unwind flattens arrays
  ✅ $facet runs multiple sub-pipelines

Data Modeling:
  ✅ Embed: always together, small, owned
  ✅ Reference: grows, shared, independent
  ✅ 16MB document limit
  ✅ Snapshot pattern for order items

Advanced:
  ✅ Transactions need Replica Set
  ✅ Replica Set: 3 nodes, auto-failover
  ✅ Sharding: mongos + config + shards
  ✅ Good shard key: high cardinality, even dist
  ✅ Change Streams for real-time updates
```

---

*🍃 Good luck with your MongoDB interview! Remember: explain your reasoning, discuss trade-offs, and relate answers to real-world scenarios — that's what separates strong candidates.*
