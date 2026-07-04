---
title: Architecture
description: JavaScript application architecture patterns for enterprise projects
sidebar:
  order: 1
---

# Architecture

## Introduction

Enterprise JavaScript applications need well-defined architecture to remain maintainable as they grow.

## Common Architectures

### Layered Architecture

```
┌─────────────────────────┐
│     Presentation        │  React/Vue/Angular components
├─────────────────────────┤
│     Application         │  Services, use cases
├─────────────────────────┤
│     Domain              │  Business logic, entities
├─────────────────────────┤
│     Infrastructure      │  API clients, database, storage
└─────────────────────────┘
```

### Feature-Based Structure

```javascript
src/
├── features/
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   └── products/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types.ts
└── shared/
    ├── components/
    ├── utils/
    └── api/
```

## Principles

- **Separation of concerns**: Each module has a single responsibility
- **Dependency inversion**: High-level modules shouldn't depend on low-level modules
- **DRY**: Don't repeat yourself
- **SOLID**: Apply SOLID principles where appropriate

## Summary

- Feature-based architecture scales well
- Clear separation of concerns is critical
- Apply SOLID and DRY principles
- Document architectural decisions (ADRs)

## Further Reading

- [Martin Fowler: Enterprise Architecture](https://martinfowler.com/architecture/)
