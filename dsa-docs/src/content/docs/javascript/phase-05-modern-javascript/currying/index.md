---
title: Currying
description: Transforming multi-argument functions into chained single-argument functions
sidebar:
  order: 6
---

# Currying

## Introduction

**Currying** transforms a function with multiple arguments into a sequence of functions, each taking a **single argument**.

## Topics Covered

- [How Currying Works](./how-it-works) — Transforming multi-arg functions into chains
- [Partial Application](./partial-application) — Pre-setting arguments with currying

## Summary

Currying: `fn(a, b, c)` → `fn(a)(b)(c)`. Enables partial application. Creates specialized functions from general ones. Useful for configuration and logging.

## Further Reading

- [MDN: Currying](https://developer.mozilla.org/en-US/docs/Glossary/Currying)
