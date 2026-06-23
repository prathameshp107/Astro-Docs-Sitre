---
title: "Fundamentals & CRUD"
description: "MongoDB is a NoSQL, document-oriented database. Instead of storing data in rows and columns like SQL, it stores data as JSON-like documents."
sidebar:
  order: 1
---

## 1. Fundamentals & CRUD

### 1.1 What is MongoDB?

MongoDB is a **NoSQL, document-oriented database**. Instead of storing data in rows and columns like SQL, it stores data as **JSON-like documents**.

```
SQL World         →     MongoDB World
─────────────────────────────────────
Database          →     Database
Table             →     Collection
Row               →     Document
Column            →     Field
Primary Key       →     _id (ObjectId)
JOIN              →     $lookup / Embedding
```

**Why MongoDB?**
- Flexible schema — no rigid columns
- Scales horizontally (sharding)
- Great for hierarchical/nested data
- Fast reads/writes for many use cases
- Native JSON support — perfect for JavaScript/Node.js apps

---

### 1.2 Core Concepts

#### 📁 Database
A MongoDB server can hold **multiple databases**. Each database is isolated.

```js
use myapp        // switch to (or create) database called "myapp"
db               // shows current database
show dbs         // list all databases
```

#### 📂 Collection
A collection is like a **table** — a group of related documents. Collections are created automatically when you first insert data.

```js
show collections                  // list collections in current db
db.createCollection("users")      // explicitly create a collection
db.users.drop()                   // delete a collection
```

#### 📄 Document
A document is a **single record**, stored as BSON (Binary JSON). Think of it like a JavaScript object.

```json
{
  "_id": ObjectId("64f1b2c3d4e5f6a7b8c9d0e1"),
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28,
  "address": {
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "tags": ["admin", "verified"],
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

### 1.3 BSON vs JSON

| Feature | JSON | BSON |
|---------|------|------|
| Format | Text (human-readable) | Binary (machine-readable) |
| Speed | Slower to parse | Faster to parse |
| Data types | Limited (string, number, bool, array, object, null) | Extended (Date, ObjectId, Binary, Decimal128, etc.) |
| Size | Smaller text | Slightly larger binary |
| Used for | API responses, config files | MongoDB internal storage |

**In practice:** You write JSON, MongoDB stores BSON internally. You never deal with BSON directly.

```js
// You write this (JSON-like):
db.users.insertOne({ name: "Bob", createdAt: new Date() })

// MongoDB stores it as BSON internally with full type info
// When you read it back, it looks like JSON again
```

---

### 1.4 `_id` and ObjectId

Every document **must have a unique `_id`** field. If you don't provide one, MongoDB auto-generates an `ObjectId`.

```
ObjectId Structure (12 bytes):
┌──────────────┬────────────┬──────────┬──────────────┐
│  4 bytes     │  5 bytes   │ 3 bytes  │   Total: 12  │
│  Timestamp   │  Random    │ Counter  │              │
│  (seconds)   │  (unique)  │          │              │
└──────────────┴────────────┴──────────┘
```

```js
// Auto-generated ObjectId
{ _id: ObjectId("64f1b2c3d4e5f6a7b8c9d0e1") }

// You can also use a custom _id
{ _id: "user_alice_001", name: "Alice" }
{ _id: 42, name: "Bob" }

// Extract timestamp from ObjectId
const id = new ObjectId("64f1b2c3d4e5f6a7b8c9d0e1");
id.getTimestamp(); // 2023-09-01T... (when it was created)

// Search by ObjectId (must use ObjectId(), not plain string)
db.users.findOne({ _id: ObjectId("64f1b2c3d4e5f6a7b8c9d0e1") })
```

---

### 1.5 CRUD Operations

#### ➕ INSERT — Creating Documents

**`insertOne()`** — Insert a single document

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

**`insertMany()`** — Insert multiple documents at once

```js
db.products.insertMany([
  {
    name: "Laptop Pro",
    price: 75000,
    category: "Electronics",
    stock: 50,
    tags: ["laptop", "computer"]
  },
  {
    name: "Wireless Mouse",
    price: 1200,
    category: "Electronics",
    stock: 200,
    tags: ["mouse", "wireless"]
  },
  {
    name: "Notebook A5",
    price: 150,
    category: "Stationery",
    stock: 500,
    tags: ["notebook", "writing"]
  }
])

// Result:
// { acknowledged: true, insertedCount: 3, insertedIds: { 0: ..., 1: ..., 2: ... } }
```

**Ordered vs Unordered insert:**
```js
// By default, insertMany stops on first error (ordered: true)
// To insert all valid docs even if some fail:
db.products.insertMany([ ...docs ], { ordered: false })
```

---

#### 🔍 READ — Finding Documents

**`find()`** — Returns all matching documents (returns a cursor)

```js
// Get ALL documents in collection
db.users.find()

// Get all with formatting (MongoDB shell)
db.users.find().pretty()

// Find with filter
db.users.find({ role: "admin" })

// Find users aged 25
db.users.find({ age: 25 })

// Find in nested field
db.users.find({ "address.city": "Mumbai" })
```

**`findOne()`** — Returns the first matching document

```js
// Find by email (common for login)
db.users.findOne({ email: "alice@example.com" })

// Find by _id
db.users.findOne({ _id: ObjectId("64f1b2c3d4e5f6a7b8c9d0e1") })
```

**Real-world example — Task management app:**

```js
// Get all incomplete tasks assigned to a user
db.tasks.find({
  assignedTo: "alice@example.com",
  status: "pending"
})

// Get a specific task by ID
db.tasks.findOne({ _id: ObjectId("...") })
```

---

#### ✏️ UPDATE — Modifying Documents

> ⚠️ **Important:** Always use update operators like `$set`. Without them, the document gets **replaced entirely**.

**Common Update Operators:**

| Operator | What it does |
|----------|-------------|
| `$set` | Set a field value |
| `$unset` | Remove a field |
| `$inc` | Increment a number |
| `$push` | Add item to array |
| `$pull` | Remove item from array |
| `$addToSet` | Add to array only if not already there |
| `$rename` | Rename a field |

**`updateOne()`** — Updates the first matching document

```js
// ✅ Correct — use $set
db.users.updateOne(
  { email: "alice@example.com" },      // filter
  { $set: { age: 29, role: "superadmin" } }  // update
)

// ❌ Wrong — replaces entire document!
db.users.updateOne(
  { email: "alice@example.com" },
  { age: 29 }   // DANGER: removes all other fields!
)

// Increment a field (e.g., login count)
db.users.updateOne(
  { email: "alice@example.com" },
  { $inc: { loginCount: 1 } }
)

// Add a tag to array
db.users.updateOne(
  { email: "alice@example.com" },
  { $push: { tags: "premium" } }
)

// Remove a field
db.users.updateOne(
  { email: "alice@example.com" },
  { $unset: { temporaryToken: "" } }
)
```

**`updateMany()`** — Updates all matching documents

```js
// Mark all pending tasks older than a date as "overdue"
db.tasks.updateMany(
  { status: "pending", dueDate: { $lt: new Date() } },
  { $set: { status: "overdue" } }
)

// Deactivate all users with role "trial"
db.users.updateMany(
  { role: "trial" },
  { $set: { isActive: false } }
)
```

**`upsert`** — Update if exists, insert if not:

```js
db.settings.updateOne(
  { userId: "alice123" },
  { $set: { theme: "dark", language: "en" } },
  { upsert: true }  // creates doc if not found
)
```

**`findOneAndUpdate()`** — Returns the document (before or after update):

```js
// Get the updated document back
const updated = db.users.findOneAndUpdate(
  { email: "alice@example.com" },
  { $set: { lastLogin: new Date() } },
  { returnDocument: "after" }  // return new version
)
```

---

#### 🗑️ DELETE — Removing Documents

**`deleteOne()`** — Deletes the first matching document

```js
// Delete a specific user
db.users.deleteOne({ email: "spam@example.com" })

// Delete by ID
db.users.deleteOne({ _id: ObjectId("64f1b2c3...") })
```

**`deleteMany()`** — Deletes all matching documents

```js
// Delete all inactive users
db.users.deleteMany({ isActive: false })

// Delete all completed tasks older than 30 days
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
db.tasks.deleteMany({
  status: "completed",
  completedAt: { $lt: thirtyDaysAgo }
})

// Delete ALL documents in a collection (careful!)
db.logs.deleteMany({})
```

**`findOneAndDelete()`** — Returns the deleted document:

```js
const deletedTask = db.tasks.findOneAndDelete({ _id: ObjectId("...") })
// Returns the doc before deletion — useful for confirmation
```

---

#### 📊 CRUD Quick Reference

```
Operation     Method              Example
─────────────────────────────────────────────────────────────────
Create        insertOne()         db.users.insertOne({name:"Ali"})
Create Many   insertMany()        db.users.insertMany([{...},{...}])
Read All      find()              db.users.find({role:"admin"})
Read One      findOne()           db.users.findOne({email:"..."})
Update One    updateOne()         db.users.updateOne({...},{$set:{...}})
Update Many   updateMany()        db.users.updateMany({...},{$set:{...}})
Delete One    deleteOne()         db.users.deleteOne({_id: ObjectId(...)})
Delete Many   deleteMany()        db.users.deleteMany({isActive:false})
```

---