---
title: "Aggregation Optimization"
description: "Best practices for making MongoDB aggregation pipelines faster and safer."
---

# Aggregation Optimization

Aggregation performance depends heavily on stage order and indexes.

## Put `$match` Early

Good:

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$totalAmount" } } }
])
```

Bad:

```js
db.orders.aggregate([
  { $group: { _id: "$userId", total: { $sum: "$totalAmount" } } },
  { $match: { status: "completed" } }
])
```

The bad version groups too much data and may also be logically wrong because `status` is no longer available after grouping.

## Use Indexes Before Blocking Stages

`$match` and `$sort` can use indexes when they appear early and match index order.

```js
db.orders.createIndex({ status: 1, createdAt: -1 })

db.orders.aggregate([
  { $match: { status: "completed" } },
  { $sort: { createdAt: -1 } },
  { $limit: 20 }
])
```

## Avoid Carrying Large Fields

If large fields are not needed, remove them early.

```js
db.posts.aggregate([
  { $project: { content: 0, rawHtml: 0 } },
  { $group: { _id: "$authorId", postCount: { $sum: 1 } } }
])
```

## Use `$limit` After `$sort`

Top-N queries should sort and limit early.

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $sort: { totalAmount: -1 } },
  { $limit: 10 }
])
```

## Be Careful With `$lookup`

`$lookup` can become expensive if the foreign collection is large.

Best practices:

- Make sure `foreignField` is indexed.
- Filter before `$lookup`.
- Use pipeline form to project only required fields.
- Avoid joining huge arrays when a denormalized model would be better.

## Use `explain()`

```js
db.orders.explain("executionStats").aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$totalAmount" } } }
])
```

Look for:

- Whether indexes are used.
- How many documents are scanned.
- Expensive blocking stages.
- High memory usage.

## Memory Limit

Some aggregation stages may need memory, especially `$group` and `$sort`.

For large pipelines:

```js
db.orders.aggregate(
  [
    { $group: { _id: "$userId", total: { $sum: "$totalAmount" } } }
  ],
  { allowDiskUse: true }
)
```

Use `allowDiskUse` when needed, but also check whether indexes, filtering, or schema design can reduce the workload.

