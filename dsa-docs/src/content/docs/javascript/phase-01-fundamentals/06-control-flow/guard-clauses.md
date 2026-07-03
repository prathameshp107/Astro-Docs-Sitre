---
title: Guard Clauses
description: Using early returns to write cleaner conditional logic
sidebar:
  order: 5
---

# Guard Clauses

## Introduction

Guard clauses (early returns) exit a function at the top when certain conditions aren't met, avoiding deeply nested `if` statements.

## Why Do We Need This?

Deeply nested code is hard to read and maintain. Guard clauses flatten the logic and make error/edge-case handling clear at the top.

## Before — Deep Nesting

```javascript
function processOrder(order) {
  if (order) {
    if (order.isValid) {
      if (order.paymentReceived) {
        // process order...
        return 'Order processed';
      } else {
        return 'Payment pending';
      }
    } else {
      return 'Invalid order';
    }
  } else {
    return 'No order';
  }
}
```

## After — Guard Clauses

```javascript
function processOrder(order) {
  if (!order) return 'No order';
  if (!order.isValid) return 'Invalid order';
  if (!order.paymentReceived) return 'Payment pending';

  // process order...
  return 'Order processed';
}
```

## Visual Explanation

```mermaid
flowchart LR
    Input["Order Input"]
    G1{"order exists?"} -->|No| R1["Return 'No order'"]
    G1 -->|Yes| G2{"order.isValid?"}
    G2 -->|No| R2["Return 'Invalid order'"]
    G2 -->|Yes| G3{"payment received?"}
    G3 -->|No| R3["Return 'Payment pending'"]
    G3 -->|Yes| Process["Process order ✅"]
```

## Best Practices

- Place guard clauses at the top of functions
- Each guard handles one edge case
- The main logic stays at the bottom, un-nested
- Guards improve readability and reduce cognitive load

## Summary

- Guard clauses return early when conditions aren't met
- They flatten nested code
- They make error handling obvious
- Main logic stays clean at the bottom
