---
title: "Query & Filtering"
description: "Used to compare field values."
sidebar:
  order: 2
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