---
title: AbortController
description: Cancelling fetch requests and async operations
sidebar:
  order: 10
---

# AbortController

## Introduction

**AbortController** allows you to cancel fetch requests programmatically using an `AbortSignal`.

## Topics Covered

- [Basic Usage](./basic-usage) — Creating and using AbortController
- [Timeout Pattern](./timeout-pattern) — Automatic cancellation after timeout
- [Use Cases](./use-cases) — Navigation, search, and cleanup patterns

## Summary

AbortController cancels fetch requests. Create with `new AbortController()`, pass `signal` to fetch, call `controller.abort()` to cancel. Catch `AbortError` to handle cancellation.

## Further Reading

- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
