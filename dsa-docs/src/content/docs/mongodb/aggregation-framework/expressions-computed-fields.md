---
title: "Expressions & Computed Fields"
description: "Use MongoDB aggregation expressions with $project, $addFields, math, strings, dates, and conditionals."
---

# Expressions & Computed Fields

Aggregation expressions calculate new values from existing fields.

## `$addFields`

Adds fields without removing existing fields.

```js
db.products.aggregate([
  {
    $addFields: {
      priceWithTax: { $multiply: ["$price", 1.18] }
    }
  }
])
```

## `$project` With Computed Fields

```js
db.products.aggregate([
  {
    $project: {
      name: 1,
      finalPrice: { $subtract: ["$price", "$discount"] },
      _id: 0
    }
  }
])
```

## String Expressions

```js
db.users.aggregate([
  {
    $project: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      emailLower: { $toLower: "$email" }
    }
  }
])
```

## Conditional Expressions

```js
db.orders.aggregate([
  {
    $project: {
      totalAmount: 1,
      orderSize: {
        $cond: [
          { $gte: ["$totalAmount", 5000] },
          "large",
          "normal"
        ]
      }
    }
  }
])
```

## Date Expressions

```js
db.orders.aggregate([
  {
    $project: {
      year: { $year: "$createdAt" },
      month: { $month: "$createdAt" },
      dayOfWeek: { $dayOfWeek: "$createdAt" }
    }
  }
])
```

## Array Expressions

```js
db.orders.aggregate([
  {
    $addFields: {
      itemCount: { $size: "$items" },
      firstItem: { $arrayElemAt: ["$items", 0] }
    }
  }
])
```

## Convert Types

```js
db.orders.aggregate([
  {
    $project: {
      totalAsString: { $toString: "$totalAmount" },
      roundedTotal: { $round: ["$totalAmount", 2] }
    }
  }
])
```

