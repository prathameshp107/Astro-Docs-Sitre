---
title: Dynamic Import
description: Lazy-loading modules with dynamic import() expressions
sidebar:
  order: 4
---

# Dynamic Import

## Introduction

Dynamic `import()` is a function-like expression that **lazy-loads** modules on demand. Unlike static `import`, it can be called conditionally and returns a Promise.

## Topics Covered

- [Code Splitting](./code-splitting) — Lazy loading with dynamic import
- [Use Cases](./use-cases) — Route-based splitting, conditional loading, on-demand libraries

## Summary

`import()` returns a Promise for lazy loading. Enables code splitting and route-based loading. Works with async/await.

## Further Reading

- [MDN: Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
