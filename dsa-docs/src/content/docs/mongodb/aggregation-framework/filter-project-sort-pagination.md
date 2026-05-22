---
title: "$match, $project, $sort, $limit, $skip"
description: "Filtering, shaping, sorting, limiting, and paginating data in MongoDB aggregation."
---

# $match, $project, $sort, $limit, $skip

These stages are the foundation of most aggregation pipelines.

## `$match`

`$match` filters documents. It uses the same query syntax as `find()`.

```js
db.orders.aggregate([
  { $match: { status: "completed" } }
])
```

Filter by date:

```js
db.orders.aggregate([
  {
    $match: {
      createdAt: {
        $gte: new Date("2024-01-01"),
        $lt: new Date("2025-01-01")
      }
    }
  }
])
```

Best practice: put `$match` as early as possible so later stages process fewer documents.

## `$project`

`$project` controls the output shape.

Include fields:

```js
{ $project: { name: 1, email: 1, _id: 0 } }
```

Rename fields:

```js
{
  $project: {
    _id: 0,
    customerName: "$name",
    customerEmail: "$email"
  }
}
```

Create computed fields:

```js
{
  $project: {
    name: 1,
    priceWithTax: { $multiply: ["$price", 1.18] }
  }
}
```

## `$sort`

Sort ascending with `1`, descending with `-1`.

```js
{ $sort: { createdAt: -1 } }
```

Sort by multiple fields:

```js
{ $sort: { category: 1, price: -1 } }
```

## `$limit`

Keep only a fixed number of documents.

```js
{ $limit: 10 }
```

## `$skip`

Skip documents. Commonly used with pagination.

```js
db.products.aggregate([
  { $sort: { createdAt: -1 } },
  { $skip: 20 },
  { $limit: 10 }
])
```

For large page numbers, prefer range-based pagination using an indexed field like `_id` or `createdAt`.

