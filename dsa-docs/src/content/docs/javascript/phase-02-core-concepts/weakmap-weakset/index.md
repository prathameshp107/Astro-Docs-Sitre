---
title: WeakMap & WeakSet
description: JavaScript WeakMap and WeakSet — weak references for memory-safe collections
sidebar:
  order: 14
---

# WeakMap & WeakSet

## Introduction

**WeakMap** and **WeakSet** are collections that hold **weak references** to their keys. If there are no other references to a key object, it can be garbage collected, and the entry is automatically removed — preventing memory leaks.

## Learning Objectives

- Understand weak references vs strong references
- Use WeakMap for object-associated data
- Use WeakSet for tracking objects
- Know when to use WeakMap/WeakSet vs Map/Set

## Topics Covered

| Topic | Description | Est. Time |
|-------|-------------|-----------|
| [WeakMap](./weakmap) | Key-value pairs with weak object keys | 15 min |
| [WeakSet](./weakset) | Object collections with weak references | 10 min |

## Prerequisites

- Map and Set basics
- Garbage collection concepts
- Understanding of object references

## Learning Path

```
WeakMap → WeakSet
```

## Related Topics

- [Map](../map/)
- [Set](../set/)
- [Memory Management](../memory-management/)
- [Garbage Collection](../garbage-collection/)
