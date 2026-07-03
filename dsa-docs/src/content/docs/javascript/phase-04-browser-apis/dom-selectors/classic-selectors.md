---
title: Classic Selectors
description: Using getElementById, getElementsByClassName, and more
sidebar:
  order: 2
---

# Classic Selectors

## Introduction

Before `querySelector`, JavaScript provided several methods for selecting elements by ID, class, tag, or name.

## The Classic Methods

```javascript
// By ID (fastest)
document.getElementById('header');

// By class name (returns HTMLCollection)
document.getElementsByClassName('card');

// By tag name
document.getElementsByTagName('div');

// By name attribute
document.getElementsByName('email');
```

## When to Use

| Method | Returns | Use Case |
|--------|---------|----------|
| `getElementById` | Single element | Fastest for IDs |
| `getElementsByClassName` | HTMLCollection (live) | Selection by class |
| `getElementsByTagName` | HTMLCollection (live) | Selection by tag |
| `getElementsByName` | NodeList | Form elements by name |

## Summary

- `getElementById()` — fastest method for IDs
- Classic methods return live collections (except name)
- Modern `querySelector` is preferred for flexibility
- Classic methods are still valid for targeted use cases

## Further Reading

- [MDN: Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
