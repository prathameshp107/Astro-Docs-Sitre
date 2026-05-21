# 🍃 Complete MongoDB Notes
### From Beginner to Advanced — A Practical Reference Guide

> **Who is this for?**
> - Beginners who want to learn MongoDB from scratch
> - Developers who want to revise before interviews or projects
> - Anyone building Node.js / Express apps with MongoDB

---

## 📋 Table of Contents

1. [Fundamentals & CRUD](#1-fundamentals--crud)
2. [Query & Filtering](#2-query--filtering)
3. [Data Modeling](#3-data-modeling)
4. [Indexing](#4-indexing)
5. [Aggregation Framework](#5-aggregation-framework)
6. [Mongoose — Node.js Integration](#6-mongoose--nodejs-integration)
7. [Advanced Topics](#7-advanced-topics)
8. [Quick Reference Cheat Sheet](#8-quick-reference-cheat-sheet)

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

## 2. Query & Filtering

### 2.1 Comparison Operators

Used to compare field values.

```
Operator    Meaning               SQL Equivalent
──────────────────────────────────────────────────
$eq         Equal to              =
$ne         Not equal to          !=
$gt         Greater than          >
$gte        Greater than or equal >=
$lt         Less than             <
$lte        Less than or equal    <=
```

```js
// Products priced above ₹1000
db.products.find({ price: { $gt: 1000 } })

// Users aged between 18 and 30 (inclusive)
db.users.find({ age: { $gte: 18, $lte: 30 } })

// Orders NOT in "cancelled" status
db.orders.find({ status: { $ne: "cancelled" } })

// Products that cost exactly ₹500
db.products.find({ price: { $eq: 500 } })
// Shorthand (same result):
db.products.find({ price: 500 })

// Stock less than 10 (low stock alert)
db.products.find({ stock: { $lt: 10 } })
```

---

### 2.2 Logical Operators

**`$and`** — All conditions must be true

```js
// Active admin users aged over 25
db.users.find({
  $and: [
    { role: "admin" },
    { isActive: true },
    { age: { $gt: 25 } }
  ]
})

// Shorthand (implicit AND — same result):
db.users.find({ role: "admin", isActive: true, age: { $gt: 25 } })
```

> 💡 Implicit AND (comma-separated) is preferred. Use explicit `$and` when you need to check the **same field twice**.

```js
// Price > 100 AND price < 500 (same field — needs explicit $and or range)
db.products.find({ price: { $gt: 100, $lt: 500 } })
```

**`$or`** — At least one condition must be true

```js
// Users who are admin OR premium
db.users.find({
  $or: [
    { role: "admin" },
    { role: "premium" }
  ]
})

// Tasks that are urgent OR overdue
db.tasks.find({
  $or: [
    { priority: "high" },
    { status: "overdue" }
  ]
})

// Combining $and and $or
// Active users who are (admin OR premium)
db.users.find({
  isActive: true,
  $or: [
    { role: "admin" },
    { role: "premium" }
  ]
})
```

**`$not`** — Inverts the condition

```js
// Users who are NOT admin
db.users.find({ role: { $not: { $eq: "admin" } } })
// Simpler way:
db.users.find({ role: { $ne: "admin" } })

// Products NOT in the ₹100-₹500 range
db.products.find({ price: { $not: { $gte: 100, $lte: 500 } } })
```

**`$nor`** — None of the conditions must be true

```js
// Users who are neither admin nor banned
db.users.find({
  $nor: [
    { role: "admin" },
    { status: "banned" }
  ]
})
```

---

### 2.3 Element Operators

**`$exists`** — Check if a field exists or not

```js
// Users who have a phone number on record
db.users.find({ phone: { $exists: true } })

// Users missing an email (data quality check)
db.users.find({ email: { $exists: false } })

// Users with a verified field set to anything
db.users.find({ verifiedAt: { $exists: true } })
```

**`$type`** — Filter by BSON data type

```js
// Find documents where age is stored as a number (not string)
db.users.find({ age: { $type: "number" } })

// Find docs where _id is an ObjectId
db.users.find({ _id: { $type: "objectId" } })

// Find docs with string names
db.users.find({ name: { $type: "string" } })
```

BSON type aliases: `"string"`, `"int"`, `"long"`, `"double"`, `"bool"`, `"date"`, `"null"`, `"array"`, `"object"`, `"objectId"`

---

### 2.4 Array Operators

**`$in`** — Field value is in a list

```js
// Users in specific cities
db.users.find({ "address.city": { $in: ["Mumbai", "Delhi", "Bangalore"] } })

// Orders with status pending or processing
db.orders.find({ status: { $in: ["pending", "processing"] } })

// Products in specific categories
db.products.find({ category: { $in: ["Electronics", "Accessories"] } })
```

**`$nin`** — Field value is NOT in a list

```js
// Products NOT in these categories
db.products.find({ category: { $nin: ["Discontinued", "Draft"] } })
```

**`$all`** — Array contains ALL specified values

```js
// Products that have BOTH "wireless" AND "bluetooth" tags
db.products.find({ tags: { $all: ["wireless", "bluetooth"] } })

// Tasks that require both frontend and backend skills
db.tasks.find({ skills: { $all: ["frontend", "backend"] } })
```

**`$elemMatch`** — At least one array element matches ALL conditions

```js
// Orders with at least one item costing > ₹500 with qty > 2
db.orders.find({
  items: {
    $elemMatch: {
      price: { $gt: 500 },
      quantity: { $gt: 2 }
    }
  }
})

// Students with at least one exam score between 80 and 100
db.students.find({
  scores: {
    $elemMatch: { $gte: 80, $lte: 100 }
  }
})
```

> 💡 **Without `$elemMatch`**, conditions are checked **across different elements**.
> **With `$elemMatch`**, both conditions must match the **same element**.

```js
// These are different!

// This matches if ANY element >= 80 AND ANY element <= 100 (could be different elements)
db.students.find({ scores: { $gte: 80, $lte: 100 } })

// This matches only if a SINGLE element is between 80 and 100
db.students.find({ scores: { $elemMatch: { $gte: 80, $lte: 100 } } })
```

---

### 2.5 Projection — Selecting Fields

Projection controls **which fields are returned** in results.
- `1` = include the field
- `0` = exclude the field

```js
// Include only name and email (exclude everything else)
db.users.find({}, { name: 1, email: 1 })
// Result: { _id: ObjectId(...), name: "Alice", email: "alice@..." }
// Note: _id is always included unless explicitly excluded

// Include only name and email, hide _id
db.users.find({}, { name: 1, email: 1, _id: 0 })
// Result: { name: "Alice", email: "alice@..." }

// Exclude sensitive fields
db.users.find({}, { password: 0, secretToken: 0 })

// Nested field projection
db.users.find({}, { name: 1, "address.city": 1 })

// Array slice — get first 2 items from array
db.users.find({}, { name: 1, tags: { $slice: 2 } })
```

> ⚠️ You cannot mix include and exclude in the same projection, **except for `_id`**.

---

### 2.6 Sorting and Limiting

**`sort()`** — Sort results

```js
// Sort by price: low to high (1 = ascending)
db.products.find().sort({ price: 1 })

// Sort by price: high to low (-1 = descending)
db.products.find().sort({ price: -1 })

// Sort by multiple fields: category A-Z, then price low-high within each category
db.products.find().sort({ category: 1, price: 1 })

// Sort users by createdAt newest first
db.users.find().sort({ createdAt: -1 })
```

**`limit()`** — Limit number of results

```js
// Get only top 5 most expensive products
db.products.find().sort({ price: -1 }).limit(5)

// Get latest 10 orders
db.orders.find().sort({ createdAt: -1 }).limit(10)
```

**`skip()`** — Skip documents (for pagination)

```js
// Pagination: page 1 (items 1-10)
db.products.find().sort({ name: 1 }).skip(0).limit(10)

// Page 2 (items 11-20)
db.products.find().sort({ name: 1 }).skip(10).limit(10)

// Page 3 (items 21-30)
db.products.find().sort({ name: 1 }).skip(20).limit(10)
```

**Pagination formula:**
```js
const page = 3;
const limit = 10;
const skip = (page - 1) * limit; // = 20

db.products.find().sort({ name: 1 }).skip(skip).limit(limit)
```

---

### 2.7 Real-World Query Examples

```js
// E-Commerce: Get affordable, in-stock electronics
db.products.find({
  category: "Electronics",
  price: { $lte: 5000 },
  stock: { $gt: 0 }
}).sort({ price: 1 }).limit(20)

// Task App: My high-priority pending tasks, newest first
db.tasks.find({
  assignedTo: "alice@example.com",
  status: { $in: ["pending", "in-progress"] },
  priority: { $in: ["high", "critical"] }
}).sort({ createdAt: -1 })

// Blog: Published posts with specific tags, last 10
db.posts.find({
  status: "published",
  tags: { $all: ["mongodb", "tutorial"] }
}, {
  title: 1, author: 1, createdAt: 1, tags: 1
}).sort({ createdAt: -1 }).limit(10)

// Users: Find unverified users registered in last 7 days
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
db.users.find({
  isVerified: false,
  createdAt: { $gte: sevenDaysAgo }
}).sort({ createdAt: 1 })
```

---

## 3. Data Modeling

Data modeling is the most **critical skill** in MongoDB. Good schema design = fast, scalable app. Bad schema = performance nightmares.

### 3.1 The Core Question: Embed or Reference?

```
Embedding (Denormalization)        Referencing (Normalization)
──────────────────────────────     ────────────────────────────
Store related data INSIDE          Store related data in a
the same document                  SEPARATE collection and
                                   link with an ID

user document:                     users collection:
{                                  { _id: ObjectId("u1"), name: "Alice" }
  name: "Alice",
  address: {                       addresses collection:
    city: "Mumbai",                { userId: ObjectId("u1"),
    pin: "400001"                    city: "Mumbai" }
  }
}
```

---

### 3.2 Embedding — Pros & Cons

**Use embedding when:**
- Data is always accessed together
- Nested data belongs to one parent (ownership)
- Nested data doesn't grow unboundedly
- You need fast reads (one query = complete data)

```js
// ✅ Good embed: User with address (always loaded together, never changes independently)
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com",
  address: {
    street: "123 Marine Drive",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India"
  },
  preferences: {
    theme: "dark",
    notifications: true,
    language: "en"
  }
}
```

| ✅ Pros | ❌ Cons |
|---------|--------|
| Single query to load everything | Document can become very large |
| Better read performance | Updating nested data is verbose |
| Atomic updates | Data duplication if shared across documents |
| Works well for 1-to-1 relationships | Hard to query deeply nested data |

---

### 3.3 Referencing — Pros & Cons

**Use referencing when:**
- Data is accessed independently
- Data is shared across many documents
- Nested data grows unboundedly (e.g., comments on a post)
- You want to update one place and reflect everywhere

```js
// users collection
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com"
}

// orders collection (references user)
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),    // reference to user
  totalAmount: 2500,
  status: "delivered",
  createdAt: ISODate("2024-01-10")
}
```

| ✅ Pros | ❌ Cons |
|---------|--------|
| No data duplication | Requires multiple queries (or $lookup) |
| Update once, reflect everywhere | Slightly slower reads |
| Cleaner, smaller documents | No built-in referential integrity (like SQL) |
| Works well for growing data | More complex application code |

---

### 3.4 One-to-One Relationship

**Example: User and their Profile**

One user has exactly one profile.

**✅ Recommended: Embed** (they're always loaded together)

```js
// Single document
{
  _id: ObjectId("u1"),
  email: "alice@example.com",
  password: "$2b$10$hashedpassword",
  profile: {
    firstName: "Alice",
    lastName: "Johnson",
    bio: "Full-stack developer",
    avatar: "https://cdn.example.com/alice.jpg",
    dob: ISODate("1995-06-15"),
    phone: "+91-9876543210"
  },
  createdAt: ISODate("2024-01-01")
}
```

---

### 3.5 One-to-Many Relationship

**Example: User and their Orders**

One user can have many orders.

**Option A — Embed orders IN user** (❌ Bad for growing data)

```js
// DON'T do this — orders array grows forever, document gets huge
{
  _id: ObjectId("u1"),
  name: "Alice",
  orders: [ ...potentially thousands of orders... ]
  // MongoDB document limit = 16MB!
}
```

**Option B — Reference: Store userId in each order** (✅ Recommended)

```js
// users collection
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com",
  totalOrders: 14  // optional: denormalized count for fast access
}

// orders collection
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),        // reference back to user
  items: [
    { productId: ObjectId("p1"), name: "Laptop Pro", qty: 1, price: 75000 },
    { productId: ObjectId("p2"), name: "Mouse",       qty: 2, price: 1200 }
  ],
  totalAmount: 77400,
  status: "delivered",
  shippingAddress: {
    street: "123 Marine Drive",
    city: "Mumbai"
  },
  createdAt: ISODate("2024-01-10")
}
```

**Query: Get all orders for Alice**

```js
db.orders.find({ userId: ObjectId("u1") }).sort({ createdAt: -1 })
```

---

### 3.6 Many-to-Many Relationship

**Example: Students and Courses**

One student can enroll in many courses. One course can have many students.

**Option A — Reference IDs on both sides:**

```js
// students collection
{
  _id: ObjectId("s1"),
  name: "Ravi Patel",
  email: "ravi@example.com",
  enrolledCourses: [
    ObjectId("c1"),   // references to courses
    ObjectId("c2"),
    ObjectId("c3")
  ]
}

// courses collection
{
  _id: ObjectId("c1"),
  title: "Full Stack Web Dev",
  instructor: "Prof. Sharma",
  price: 4999,
  enrolledStudents: [
    ObjectId("s1"),   // references to students
    ObjectId("s2")
  ]
}
```

**Option B — Junction/Enrollment collection** (✅ Better when relationship has extra data)

```js
// students collection
{ _id: ObjectId("s1"), name: "Ravi Patel" }

// courses collection
{ _id: ObjectId("c1"), title: "Full Stack Web Dev" }

// enrollments collection (the "junction table")
{
  _id: ObjectId("e1"),
  studentId: ObjectId("s1"),
  courseId: ObjectId("c1"),
  enrolledAt: ISODate("2024-01-05"),
  progress: 65,        // % completion — belongs to the relationship!
  grade: null,
  completedAt: null
}
```

> Use a junction collection when the relationship itself has **extra data** (progress, date enrolled, grade, etc.)

---

### 3.7 Practical Schema Examples

#### E-Commerce: Users + Orders + Products

```js
// users
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com",
  role: "customer",
  savedAddresses: [          // embedded — small, user-owned
    {
      label: "Home",
      street: "123 MG Road",
      city: "Bangalore",
      pincode: "560001"
    }
  ],
  createdAt: ISODate("2023-06-01")
}

// products
{
  _id: ObjectId("p1"),
  name: "MacBook Pro 14",
  description: "Apple M3 chip...",
  price: 199000,
  category: "Laptops",
  brand: "Apple",
  stock: 25,
  images: ["img1.jpg", "img2.jpg"],
  tags: ["apple", "laptop", "m3"],
  ratings: { average: 4.7, count: 128 }
}

// orders
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),        // reference
  items: [                       // embedded snapshot of product data at time of purchase
    {
      productId: ObjectId("p1"),
      name: "MacBook Pro 14",    // snapshot — price might change later!
      price: 199000,
      quantity: 1
    }
  ],
  totalAmount: 199000,
  status: "processing",          // pending → processing → shipped → delivered
  shippingAddress: {             // snapshot — user might move later!
    street: "123 MG Road",
    city: "Bangalore",
    pincode: "560001"
  },
  paymentMethod: "credit_card",
  createdAt: ISODate("2024-01-15")
}
```

> 💡 **Snapshot Pattern**: In orders, embed a copy of the product name/price and shipping address. If the product price changes or the user moves, the order history stays accurate.

---

#### Task Management App Schema

```js
// users
{
  _id: ObjectId("u1"),
  name: "Alice",
  email: "alice@example.com"
}

// projects
{
  _id: ObjectId("proj1"),
  name: "Website Redesign",
  ownerId: ObjectId("u1"),      // reference
  members: [ObjectId("u1"), ObjectId("u2"), ObjectId("u3")],
  createdAt: ISODate("2024-01-01")
}

// tasks
{
  _id: ObjectId("t1"),
  title: "Design homepage",
  description: "Create wireframes and final design",
  projectId: ObjectId("proj1"),     // reference
  assignedTo: ObjectId("u2"),       // reference
  createdBy: ObjectId("u1"),        // reference
  status: "in-progress",            // todo → in-progress → review → done
  priority: "high",
  tags: ["design", "homepage"],
  dueDate: ISODate("2024-02-01"),
  comments: [                        // embedded — always accessed with task
    {
      userId: ObjectId("u1"),
      text: "Please use the brand colors",
      createdAt: ISODate("2024-01-15")
    }
  ],
  createdAt: ISODate("2024-01-10")
}
```

---

### 3.8 Decision Guide: Embed vs Reference

```
Ask yourself these questions:

1. Is the data always accessed together?
   YES → Consider embedding
   NO  → Consider referencing

2. Can the nested data grow without bound?
   YES (many items over time) → Reference
   NO  (1 address, 1 profile) → Embed

3. Is the data shared across multiple documents?
   YES → Reference (update once)
   NO  → Embed is fine

4. Do you need to query the nested data independently?
   YES → Consider a separate collection
   NO  → Embedding works

5. Is write performance critical?
   YES → Fewer documents (embed) = less I/O
   NO  → Referencing is fine

Rule of thumb:
─────────────────────────────────────────
Small, bounded, owned data  → EMBED
Large, growing, shared data → REFERENCE
```

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

## 5. Aggregation Framework

### 5.1 What is Aggregation?

Aggregation is MongoDB's way to **transform and analyze data** — like a pipeline where documents flow through stages, each stage modifying the output.

```
Documents
    ↓
[$match]    → filter documents (like WHERE)
    ↓
[$group]    → group and calculate (like GROUP BY)
    ↓
[$sort]     → sort results (like ORDER BY)
    ↓
[$project]  → shape the output (like SELECT)
    ↓
Result
```

```js
// Basic aggregation syntax
db.collection.aggregate([
  { $stage1: { ... } },
  { $stage2: { ... } },
  { $stage3: { ... } }
])
```

---

### 5.2 `$match` — Filter Documents

Works exactly like `find()` but inside a pipeline.

```js
// Filter only completed orders
{ $match: { status: "completed" } }

// Filter orders from the last 30 days
{ $match: { createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } } }

// ✅ Always put $match EARLY in the pipeline to reduce data flowing through
```

---

### 5.3 `$group` — Group and Aggregate

```js
// Group syntax:
{ $group: { _id: <grouping field>, <field>: { <accumulator>: <expression> } } }
```

**Accumulator operators:**

| Operator | Description |
|----------|-------------|
| `$sum` | Sum of values |
| `$avg` | Average of values |
| `$min` | Minimum value |
| `$max` | Maximum value |
| `$count` | Count documents |
| `$push` | Add values to an array |
| `$addToSet` | Add unique values to an array |
| `$first` | First value in group |
| `$last` | Last value in group |

```js
// Count users per role
{ $group: { _id: "$role", count: { $sum: 1 } } }
// Result: [{ _id: "admin", count: 3 }, { _id: "user", count: 145 }]

// Total and average order amount per user
{ $group: {
  _id: "$userId",
  totalSpent: { $sum: "$totalAmount" },
  avgOrderValue: { $avg: "$totalAmount" },
  orderCount: { $sum: 1 },
  maxOrder: { $max: "$totalAmount" }
}}

// Group by category, collect product names
{ $group: {
  _id: "$category",
  products: { $push: "$name" },   // array of product names
  uniqueBrands: { $addToSet: "$brand" }
}}

// Overall total (no grouping key — _id: null)
{ $group: {
  _id: null,
  totalRevenue: { $sum: "$totalAmount" },
  totalOrders: { $sum: 1 }
}}
```

---

### 5.4 `$project` — Shape the Output

```js
// Include specific fields (like SELECT)
{ $project: { name: 1, email: 1, _id: 0 } }

// Computed fields
{ $project: {
  name: 1,
  fullPrice: { $multiply: ["$price", 1.18] },   // price with 18% GST
  discountedPrice: { $subtract: ["$price", 100] }
}}

// String operations
{ $project: {
  nameUpper: { $toUpper: "$name" },
  greeting: { $concat: ["Hello, ", "$name", "!"] }
}}
```

---

### 5.5 `$sort`, `$limit`, `$skip`

```js
{ $sort: { totalAmount: -1 } }    // highest first
{ $sort: { createdAt: -1 } }      // newest first

{ $limit: 10 }                    // top 10 results

{ $skip: 20 }                     // skip first 20 (pagination)
```

---

### 5.6 `$lookup` — Joins Between Collections

```js
// $lookup syntax:
{ $lookup: {
  from: "other_collection",     // collection to join
  localField: "myField",        // field in THIS collection
  foreignField: "theirField",   // field in OTHER collection
  as: "resultArray"             // name of new array field
}}
```

```js
// Join orders with user data
db.orders.aggregate([
  { $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user"
  }},
  { $unwind: "$user" }   // convert user array to single object
])

// Result:
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),
  totalAmount: 2500,
  user: {               // ← joined data
    _id: ObjectId("u1"),
    name: "Alice Johnson",
    email: "alice@example.com"
  }
}
```

---

### 5.7 `$unwind` — Flatten Arrays

```js
// Before $unwind:
{ _id: 1, name: "Alice", tags: ["admin", "premium", "verified"] }

// After $unwind: { path: "$tags" }:
{ _id: 1, name: "Alice", tags: "admin" }
{ _id: 1, name: "Alice", tags: "premium" }
{ _id: 1, name: "Alice", tags: "verified" }
// Creates one document per array element
```

---

### 5.8 Real-World Aggregation Examples

#### 📊 Example 1: Monthly Sales Report

```js
db.orders.aggregate([
  // Step 1: Only completed orders
  { $match: { status: "completed" } },

  // Step 2: Group by year + month
  { $group: {
    _id: {
      year:  { $year:  "$createdAt" },
      month: { $month: "$createdAt" }
    },
    totalRevenue:  { $sum: "$totalAmount" },
    orderCount:    { $sum: 1 },
    avgOrderValue: { $avg: "$totalAmount" },
    maxSale:       { $max: "$totalAmount" }
  }},

  // Step 3: Sort by year then month
  { $sort: { "_id.year": 1, "_id.month": 1 } },

  // Step 4: Format the output
  { $project: {
    _id: 0,
    period: { $concat: [
      { $toString: "$_id.year" }, "-",
      { $toString: "$_id.month" }
    ]},
    totalRevenue:  1,
    orderCount:    1,
    avgOrderValue: { $round: ["$avgOrderValue", 2] }
  }}
])

// Output:
// { period: "2024-1", totalRevenue: 452000, orderCount: 45, avgOrderValue: 10044.44 }
// { period: "2024-2", totalRevenue: 388000, orderCount: 38, avgOrderValue: 10210.53 }
```

---

#### 📊 Example 2: Top 5 Best-Selling Products

```js
db.orders.aggregate([
  // Step 1: Flatten the items array
  { $unwind: "$items" },

  // Step 2: Group by product
  { $group: {
    _id: "$items.productId",
    productName:   { $first: "$items.name" },
    totalSold:     { $sum: "$items.quantity" },
    totalRevenue:  { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
  }},

  // Step 3: Sort by units sold (highest first)
  { $sort: { totalSold: -1 } },

  // Step 4: Top 5 only
  { $limit: 5 },

  // Step 5: Clean output
  { $project: {
    _id: 0,
    productId: "$_id",
    productName: 1,
    totalSold: 1,
    totalRevenue: 1
  }}
])
```

---

#### 📊 Example 3: Task Analytics by Status and Assignee

```js
db.tasks.aggregate([
  // Step 1: Only tasks in a specific project
  { $match: { projectId: ObjectId("proj1") } },

  // Step 2: Join with users to get names
  { $lookup: {
    from: "users",
    localField: "assignedTo",
    foreignField: "_id",
    as: "assignee"
  }},
  { $unwind: { path: "$assignee", preserveNullAndEmpty: true } },

  // Step 3: Group by assignee + status
  { $group: {
    _id: {
      assignee: "$assignee.name",
      status: "$status"
    },
    count: { $sum: 1 }
  }},

  // Step 4: Sort
  { $sort: { "_id.assignee": 1, "_id.status": 1 } }
])

// Output:
// { _id: { assignee: "Alice", status: "done" }, count: 8 }
// { _id: { assignee: "Alice", status: "in-progress" }, count: 3 }
// { _id: { assignee: "Bob", status: "done" }, count: 5 }
```

---

#### 📊 Example 4: User Orders Summary (with $lookup)

```js
db.users.aggregate([
  // Step 1: Specific user
  { $match: { _id: ObjectId("u1") } },

  // Step 2: Join with orders
  { $lookup: {
    from: "orders",
    localField: "_id",
    foreignField: "userId",
    as: "orders"
  }},

  // Step 3: Add computed fields
  { $addFields: {
    totalOrders:  { $size: "$orders" },
    totalSpent:   { $sum: "$orders.totalAmount" },
    lastOrderAt:  { $max: "$orders.createdAt" }
  }},

  // Step 4: Clean output
  { $project: {
    name: 1,
    email: 1,
    totalOrders: 1,
    totalSpent: 1,
    lastOrderAt: 1,
    orders: 0    // remove the big orders array from output
  }}
])
```

---

## 6. Mongoose — Node.js Integration

### 6.1 What is Mongoose?

Mongoose is an **ODM (Object Data Modeling) library** for MongoDB in Node.js. It adds:
- Schemas (structure for documents)
- Validation (enforce rules before saving)
- Middleware (run code before/after operations)
- Helper methods and plugins

```
MongoDB Driver (raw)         Mongoose (ODM)
─────────────────────        ─────────────────
No schema                    Schema-based
Manual validation            Built-in validation
Raw JS objects               Model instances with methods
No middleware                Pre/post hooks
```

---

### 6.2 Setup

```bash
npm install mongoose
```

```js
// db.js — database connection
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Options for Mongoose 6+:
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

```js
// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

connectDB();
const app = express();
app.use(express.json());
```

---

### 6.3 Defining a Schema

A Schema defines the **structure, types, and rules** for documents.

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // Basic field
  name: String,

  // Field with options
  email: {
    type: String,
    required: [true, 'Email is required'],  // validation
    unique: true,
    lowercase: true,                         // auto-transform
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters'],
    select: false    // never return password in queries by default
  },

  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age seems too high']
  },

  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: '{VALUE} is not a valid role'
    },
    default: 'user'
  },

  isActive: {
    type: Boolean,
    default: true
  },

  // Nested object
  address: {
    street: String,
    city: String,
    pincode: String
  },

  // Array of strings
  tags: [String],

  // Array of objects
  socialLinks: [{
    platform: String,
    url: String
  }],

  // Reference to another collection
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'          // collection name to reference
  },

  // Custom validation
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{9,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
}, {
  timestamps: true   // auto-adds createdAt and updatedAt fields
});
```

---

### 6.4 Creating a Model

```js
// A Model is a class that lets you interact with a collection
const User = mongoose.model('User', userSchema);
// 'User' → collection name will be 'users' (lowercased + pluralized)

module.exports = User;
```

---

### 6.5 Mongoose Validation

```js
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [2, 'Name too short'],
    maxlength: [100, 'Name too long'],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other']
  },
  sku: {
    type: String,
    unique: true,
    uppercase: true
  },
  stock: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be a whole number'
    }
  }
});
```

---

### 6.6 Middleware (Pre/Post Hooks)

Middleware runs **automatically** before or after certain operations.

```js
const bcrypt = require('bcrypt');

// Pre-save hook: hash password before saving
userSchema.pre('save', async function(next) {
  // 'this' refers to the document being saved

  // Only hash if password was modified (not on other updates)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Pre-save hook: auto-generate slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

// Post-save hook: log after save
userSchema.post('save', function(doc, next) {
  console.log(`User saved: ${doc.email}`);
  next();
});

// Pre-remove hook: clean up related data
userSchema.pre('deleteOne', { document: true }, async function(next) {
  await Order.deleteMany({ userId: this._id });
  await Task.updateMany({ assignedTo: this._id }, { $unset: { assignedTo: "" } });
  next();
});

// Pre-find hook: always exclude inactive users
userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});
```

---

### 6.7 Instance & Static Methods

```js
// Instance method — called on a document instance
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role
  };
};

// Static method — called on the Model itself
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActiveAdmins = function() {
  return this.find({ role: 'admin', isActive: true });
};

// Usage:
const user = await User.findByEmail('alice@example.com');
const isMatch = await user.comparePassword('mypassword');
```

---

### 6.8 CRUD with Mongoose + Express

```js
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role:  { type: String, default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

```js
// controllers/userController.js
const User = require('../models/User');

// ─── CREATE ──────────────────────────────────────────────
// POST /users
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // User.create() = new User(data) + user.save()

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    if (err.code === 11000) {  // duplicate key
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

// ─── READ ALL ─────────────────────────────────────────────
// GET /users?role=admin&page=1&limit=10
const getUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, sort = 'createdAt' } = req.query;

    const filter = {};
    if (role) filter.role = role;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter)
          .select('-password')           // exclude password
          .sort({ [sort]: -1 })
          .skip(skip)
          .limit(Number(limit)),
      User.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── READ ONE ─────────────────────────────────────────────
// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────
// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,         // return updated document
        runValidators: true // run schema validators on update
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────
// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
```

```js
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  createUser, getUsers, getUserById, updateUser, deleteUser
} = require('../controllers/userController');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
```

---

### 6.9 Populate — Resolving References

```js
const postSchema = new Schema({
  title:   String,
  content: String,
  author:  { type: Schema.Types.ObjectId, ref: 'User' },
  tags:    [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true });

// Populate author info
const post = await Post.findById(id).populate('author', 'name email');
// Result: { title: "...", author: { name: "Alice", email: "alice@..." } }

// Populate multiple fields
const post = await Post.findById(id)
  .populate('author', 'name email')
  .populate('tags', 'name color');

// Deep/nested populate
const order = await Order.findById(id)
  .populate({
    path: 'userId',
    select: 'name email',
    populate: {
      path: 'department',   // nested populate
      select: 'name'
    }
  });
```

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

## 8. Quick Reference Cheat Sheet

### CRUD Commands

```js
// ─── INSERT ───────────────────────────────
db.col.insertOne({ field: "value" })
db.col.insertMany([{ ... }, { ... }])

// ─── FIND ─────────────────────────────────
db.col.find()                           // all docs
db.col.find({ field: "value" })         // with filter
db.col.findOne({ field: "value" })      // first match
db.col.find({}, { field1: 1, _id: 0 }) // projection
db.col.find().sort({ field: -1 })       // sort desc
db.col.find().limit(10).skip(20)        // pagination
db.col.countDocuments({ status: "ok" }) // count

// ─── UPDATE ───────────────────────────────
db.col.updateOne({ filter }, { $set: { field: val } })
db.col.updateMany({ filter }, { $set: { field: val } })
db.col.updateOne({ filter }, { $inc: { count: 1 } })
db.col.updateOne({ filter }, { $push: { arr: item } })
db.col.updateOne({ filter }, { $pull: { arr: item } })
db.col.updateOne({ filter }, { $unset: { field: "" } })
db.col.findByIdAndUpdate(id, { $set: {...} }, { new: true })

// ─── DELETE ───────────────────────────────
db.col.deleteOne({ _id: ObjectId("...") })
db.col.deleteMany({ status: "inactive" })
db.col.findByIdAndDelete(id)
```

### Query Operators

```js
// Comparison
{ age: { $gt: 18 } }           // greater than
{ age: { $gte: 18, $lte: 30 }} // between
{ status: { $ne: "banned" } }  // not equal
{ role: { $in: ["a","b"] } }   // in list
{ role: { $nin: ["x","y"] } }  // not in list

// Logical
{ $and: [{...}, {...}] }        // all true
{ $or:  [{...}, {...}] }        // any true
{ field: { $not: {...} } }      // negate

// Element
{ field: { $exists: true } }   // field exists
{ field: { $type: "string" } } // type check

// Array
{ arr: { $all: ["a","b"] } }   // contains all
{ arr: { $elemMatch: {...} } }  // element matches
```

### Aggregation Stages

```js
db.col.aggregate([
  { $match:   { status: "active" } },
  { $group:   { _id: "$field", total: { $sum: "$amount" } } },
  { $sort:    { total: -1 } },
  { $limit:   10 },
  { $skip:    0 },
  { $project: { field: 1, _id: 0 } },
  { $lookup:  { from: "other", localField: "id", foreignField: "_id", as: "data" } },
  { $unwind:  "$arrayField" },
  { $addFields: { newField: { $sum: "$arr" } } },
  { $count:   "totalCount" }
])
```

### Mongoose Quick Reference

```js
// Model CRUD
Model.create(data)
Model.find(filter).select('f1 f2').sort({f:-1}).limit(10).skip(0)
Model.findById(id)
Model.findOne(filter)
Model.findByIdAndUpdate(id, {$set:data}, {new:true, runValidators:true})
Model.findByIdAndDelete(id)
Model.countDocuments(filter)
Model.exists(filter)

// Populate
.populate('field', 'name email')
.populate({ path: 'field', select: 'name', populate: { path: 'nested' } })

// Schema Options
{ type: String, required: true, unique: true, trim: true, lowercase: true }
{ type: Number, min: 0, max: 100, default: 0 }
{ type: String, enum: ['a', 'b', 'c'] }
{ type: Schema.Types.ObjectId, ref: 'ModelName' }
{ timestamps: true }  // schema option — auto createdAt & updatedAt

// Middleware
schema.pre('save', function(next) { ... next(); })
schema.post('save', function(doc, next) { ... next(); })
```

---

*🍃 These notes cover everything from MongoDB basics to production-level advanced topics. Use them as a reference while building projects, preparing for interviews, or learning from scratch.*

*Happy coding!* 🚀
