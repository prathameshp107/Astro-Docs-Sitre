---
title: "$group & Accumulators"
description: "Group MongoDB documents and calculate counts, sums, averages, min, max, arrays, and unique sets."
---

# $group & Accumulators

`$group` groups documents by a key and calculates aggregate values.

## Basic Syntax

```js
{
  $group: {
    _id: "$fieldToGroupBy",
    outputField: { $accumulator: "$valueField" }
  }
}
```

## Common Accumulators

| Accumulator | Meaning |
| --- | --- |
| `$sum` | Adds values or counts documents |
| `$avg` | Calculates average |
| `$min` | Finds minimum |
| `$max` | Finds maximum |
| `$push` | Adds values to an array |
| `$addToSet` | Adds unique values to an array |
| `$first` | First value in group |
| `$last` | Last value in group |

## Count Documents Per Status

```js
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])
```

## Revenue Per Customer

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$totalAmount" },
      averageOrderValue: { $avg: "$totalAmount" },
      orderCount: { $sum: 1 },
      highestOrder: { $max: "$totalAmount" }
    }
  },
  { $sort: { totalSpent: -1 } }
])
```

## Group By Multiple Fields

```js
db.orders.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        status: "$status"
      },
      count: { $sum: 1 },
      revenue: { $sum: "$totalAmount" }
    }
  }
])
```

## Overall Total

Use `_id: null` when you want one result for the whole collection.

```js
db.orders.aggregate([
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$totalAmount" },
      totalOrders: { $sum: 1 }
    }
  }
])
```

## `$push` vs `$addToSet`

`$push` keeps duplicates:

```js
{ $group: { _id: "$category", brands: { $push: "$brand" } } }
```

`$addToSet` keeps unique values:

```js
{ $group: { _id: "$category", brands: { $addToSet: "$brand" } } }
```

