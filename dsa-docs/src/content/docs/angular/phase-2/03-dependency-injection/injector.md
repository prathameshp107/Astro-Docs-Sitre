---
title: "Injectors"
description: "Understanding Angular injectors."
sidebar:
  order: 1
---

## Introduction
An injector is responsible for creating and delivering service instances. Angular creates a tree of injectors that mirrors the component hierarchy.

## Injector Hierarchy

```
Root Injector (app-level)
├── Lazy Module Injector
│   └── Component Injector
│       └── Child Component Injector
└── Eager Module Injector
```

## Resolution Algorithm
Angular looks for a provider at the current level, then walks up the injector tree until it finds one. If none found, throws NullInjectorError."
