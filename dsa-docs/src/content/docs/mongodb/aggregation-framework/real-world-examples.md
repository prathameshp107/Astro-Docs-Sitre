---
title: "Real-World Aggregation Examples"
description: "Practical MongoDB aggregation examples for sales reports, best-selling products, task analytics, and user summaries."
---

# Real-World Aggregation Examples

## Monthly Sales Report

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      totalRevenue: { $sum: "$totalAmount" },
      orderCount: { $sum: 1 },
      averageOrderValue: { $avg: "$totalAmount" }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } },
  {
    $project: {
      _id: 0,
      period: {
        $concat: [
          { $toString: "$_id.year" },
          "-",
          { $toString: "$_id.month" }
        ]
      },
      totalRevenue: 1,
      orderCount: 1,
      averageOrderValue: { $round: ["$averageOrderValue", 2] }
    }
  }
])
```

## Top 5 Best-Selling Products

```js
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      productName: { $first: "$items.name" },
      totalSold: { $sum: "$items.quantity" },
      revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
    }
  },
  { $sort: { totalSold: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      productId: "$_id",
      productName: 1,
      totalSold: 1,
      revenue: 1
    }
  }
])
```

## Task Analytics By Assignee

```js
db.tasks.aggregate([
  { $match: { projectId: ObjectId("64f000000000000000000001") } },
  {
    $lookup: {
      from: "users",
      localField: "assignedTo",
      foreignField: "_id",
      as: "assignee"
    }
  },
  { $unwind: { path: "$assignee", preserveNullAndEmptyArrays: true } },
  {
    $group: {
      _id: {
        assignee: "$assignee.name",
        status: "$status"
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id.assignee": 1, "_id.status": 1 } }
])
```

## User Order Summary

```js
db.users.aggregate([
  { $match: { _id: ObjectId("64f000000000000000000001") } },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  },
  {
    $addFields: {
      totalOrders: { $size: "$orders" },
      totalSpent: { $sum: "$orders.totalAmount" },
      lastOrderAt: { $max: "$orders.createdAt" }
    }
  },
  {
    $project: {
      name: 1,
      email: 1,
      totalOrders: 1,
      totalSpent: 1,
      lastOrderAt: 1,
      orders: 0
    }
  }
])
```

