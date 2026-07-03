---
title: Iterators
description: JavaScript iteration protocol — iterables, iterators, custom iterables, and for...of
sidebar:
  order: 9
---

# Iterators

## Introduction

The **iteration protocol** defines a standard way to produce a sequence of values. An **iterable** has a `Symbol.iterator` method that returns an **iterator** (an object with a `next()` method).

## Learning Objectives

- Understand the iteration protocol (iterable + iterator)
- Use `for...of` with built-in iterables
- Create custom iterables with `Symbol.iterator`
- Know which built-in types are iterable

## Visual Summary

```mermaid
sequenceDiagram
    participant Loop as for...of
    participant Iterable as Array [1,2,3]
    participant Iterator as Iterator
    
    Loop->>Iterable: Symbol.iterator
    Iterable->>Iterator: Return iterator
    Loop->>Iterator: next()
    Iterator->>Loop: { value: 1, done: false }
    Loop->>Iterator: next()
    Iterator->>Loop: { value: 2, done: false }
    Loop->>Iterator: next()
    Iterator->>Loop: { value: 3, done: false }
    Loop->>Iterator: next()
    Iterator->>Loop: { value: undefined, done: true }
```

## Topics Covered

| Topic | Description | Est. Time |
|-------|-------------|-----------|
| [Iteration Protocol](./iteration-protocol) | Iterable, iterator, next() | 15 min |
| [Custom Iterables](./custom-iterables) | Implementing Symbol.iterator | 15 min |

## Prerequisites

- Symbols (Symbol.iterator)
- Loops and iteration
- Understanding of objects

## Learning Path

```
Iteration Protocol → Custom Iterables
```

## Related Topics

- [Generators](../generators/)
- [Symbols](../symbols/)
- [Map](../map/)
- [Set](../set/)
