---
title: "Feature Modules"
description: "Organize code by business domain."
sidebar:
  order: 2
---

## Introduction
Feature modules organize code by business domain rather than technical layer. Each feature is a self-contained vertical slice.

## Structure

```
features/
├── auth/       (login, register, guards, store)
├── products/   (list, detail, search, store)
├── cart/       (items, checkout, store)
└── orders/     (history, tracking, store)
```

## Benefits
- Team ownership
- Natural lazy loading boundaries
- Easy to add/remove features

## Summary
Feature modules are the standard for organizing enterprise Angular applications."
