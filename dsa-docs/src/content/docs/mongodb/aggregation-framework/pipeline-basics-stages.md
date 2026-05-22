---
title: "Pipeline Basics & Stages"
description: "How MongoDB aggregation pipelines work and how documents move through stages."
---

# Pipeline Basics & Stages

An aggregation pipeline is an ordered array of stages.

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", totalSpent: { $sum: "$totalAmount" } } },
  { $sort: { totalSpent: -1 } }
])
```

## Flow

```text
orders collection
  -> $match   filter completed orders
  -> $group   group by user
  -> $sort    highest spenders first
  -> result
```

## Stage Rules

- Stages run from top to bottom.
- Each stage outputs documents for the next stage.
- Stage order matters for correctness and performance.
- Put filtering stages early when possible.
- Use `$project` to remove large fields if later stages do not need them.

## Aggregation vs find()

Use `find()` for simple reads:

```js
db.users.find({ role: "admin" })
```

Use `aggregate()` when you need transformation:

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$totalAmount" } } }
])
```

## Common Pipeline Patterns

Filtering:

```js
[{ $match: { status: "active" } }]
```

Report:

```js
[
  { $match: { status: "completed" } },
  { $group: { _id: "$category", revenue: { $sum: "$amount" } } },
  { $sort: { revenue: -1 } }
]
```

Join and reshape:

```js
[
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $project: { totalAmount: 1, "user.name": 1 } }
]
```

