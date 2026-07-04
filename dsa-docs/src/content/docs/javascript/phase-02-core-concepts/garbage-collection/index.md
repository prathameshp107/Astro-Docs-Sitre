---
title: Garbage Collection
description: JavaScript garbage collection — mark-and-sweep, generational GC, V8 optimization
sidebar:
  order: 16
---

# Garbage Collection

## Introduction

**Garbage collection (GC)** is automatic memory management. JavaScript engines periodically find and free memory that is no longer reachable.

## Learning Objectives

- Understand the mark-and-sweep algorithm
- Learn V8's generational GC approach
- Identify what causes memory leaks
- Apply best practices to help the GC

## Topics Covered

| Topic | Description | Est. Time |
|-------|-------------|-----------|
| [Mark-and-Sweep](./mark-and-sweep) | The core GC algorithm | 15 min |
| [Generational GC](./generational-gc) | V8's young/old generation strategy | 15 min |
| [Common Leaks](./common-leaks) | What prevents GC from working | 10 min |

## Prerequisites

- Memory management basics
- Understanding of object references
- Scope and closures

## Learning Path

```
Mark-and-Sweep → Generational GC → Common Leaks
```

## Related Topics

- [Memory Management](../memory-management/)
- [WeakMap & WeakSet](../weakmap-weakset/)
- [V8 Internals](../../phase-08-javascript-internals/)
