---
title: "Aggregation Framework"
description: "Aggregation is MongoDB's way to transform and analyze data — like a pipeline where documents flow through stages, each stage modifying the output."
sidebar:
  order: 5
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