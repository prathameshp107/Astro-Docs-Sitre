---
title: "$lookup & $unwind"
description: "Join collections with $lookup and flatten arrays with $unwind in MongoDB aggregation."
---

# $lookup & $unwind

`$lookup` joins documents from another collection. `$unwind` flattens arrays.

## `$lookup` Basic Syntax

```js
{
  $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user"
  }
}
```

## Join Orders With Users

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  }
])
```

The result contains `user` as an array:

```js
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  totalAmount: 2500,
  user: [
    { _id: ObjectId("..."), name: "Alice" }
  ]
}
```

## `$unwind`

`$unwind` converts each array element into a separate document.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" }
])
```

## Preserve Empty Arrays

Use this when a missing match should not remove the document.

```js
{ $unwind: { path: "$user", preserveNullAndEmptyArrays: true } }
```

## `$lookup` With Pipeline

Use pipeline form when the join needs filters, projections, or multiple conditions.

```js
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      let: { userId: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$userId", "$$userId"] } } },
        { $match: { status: "completed" } },
        { $project: { totalAmount: 1, createdAt: 1 } }
      ],
      as: "completedOrders"
    }
  }
])
```

## Common `$unwind` Use Case

Flatten order items:

```js
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" }
    }
  }
])
```

