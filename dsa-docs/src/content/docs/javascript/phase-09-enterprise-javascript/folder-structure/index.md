---
title: Folder Structure
description: Organizing enterprise JavaScript projects for maintainability
sidebar:
  order: 2
---

# Folder Structure

## Introduction

A well-organized folder structure makes code easy to find, understand, and maintain as teams grow.

## Recommended Structure

```
src/
├── app/                    # Application setup
│   ├── App.jsx
│   ├── router.jsx
│   └── store.js
├── features/               # Feature modules
│   ├── auth/
│   ├── dashboard/
│   └── settings/
├── shared/                 # Shared utilities
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── api/
├── config/                 # Configuration
│   └── constants.js
└── styles/                 # Global styles
    └── global.css
```

## Principles

- **Feature-first**: Group by feature, not by file type
- **Co-location**: Keep related files together (component + test + styles)
- **Shared vs specific**: Shared goes in `shared/`, feature-specific stays in `features/`
- **Barrel exports**: Use `index.js` files for clean imports

## Summary

- Feature-based structure scales better than type-based
- Co-locate tests with their components
- Use barrel files for clean exports
- Keep shared utilities separate from feature code

## Further Reading

- [Feature-driven structure](https://reactjs.org/docs/faq-structure.html)
