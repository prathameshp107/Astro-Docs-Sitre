---
title: "mergeMap"
description: "Concurrent inner observable execution."
sidebar:
  order: 5
---

## Introduction
mergeMap runs all inner Observables concurrently without cancellation.

## Example

```typescript
clicks$.pipe(
  mergeMap(event => this.http.post('/api/log', event))
).subscribe(); // All requests fire in parallel
```

## When to Use
- Fire-and-forget parallel requests
- Uploading multiple files
- Logging events

## Summary
mergeMap is ideal for scenarios where all operations should run in parallel."
