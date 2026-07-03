---
title: "Folder Structure"
description: "Canonical Angular enterprise folder structure."
sidebar:
  order: 3
---

## Introduction
A consistent folder structure helps teams navigate large codebases.

## Structure

```
src/app/
├── core/         (singletons: auth, interceptors, guards)
├── shared/       (reusable UI: components, directives, pipes)
├── features/     (business domains: products, cart, admin)
├── store/        (global state configuration)
├── app.routes.ts
└── app.component.ts
```

## Summary
A well-organized folder structure scales with team size and application complexity."
