---
title: Debounce vs Throttle
description: Key differences between debounce and throttle
sidebar:
  order: 5
---

# Debounce vs Throttle

## Introduction

While both patterns rate-limit function calls, they have different behaviors and use cases.

## Quick Comparison

| Feature | Debounce | Throttle |
|---------|----------|----------|
| Fires | After events stop | At regular intervals |
| Use case | Search, validation | Scroll, resize, game loop |
| First execution | After delay (or leading) | Immediately |
| Result | Single execution | Regular executions |

## Visual Comparison

```mermaid
sequenceDiagram
    participant Events as Events
    participant Debounced as Debounced
    participant Throttled as Throttled

    Note over Events: User types quickly
    Events->>Debounced: 1
    Events->>Debounced: 2
    Events->>Debounced: 3
    Events-->>Debounced: (WAITING...)
    Debounced-->>Events: Executes once

    Note over Events: Window scrolls rapidly
    Events->>Throttled: 1
    Events-->>Throttled: (waiting)
    Events->>Throttled: 2 ✅
    Events-->>Throttled: (waiting)
    Events->>Throttled: 3 ✅
```

## When to Choose Which

- **Debounce**: When you only care about the final state after rapid events stop (search, validation)
- **Throttle**: When you need regular updates during rapid events (scroll progress, mouse position)

## Summary

| Pattern | Behavior | Best For |
|---------|----------|----------|
| Debounce | Executes after pause | Search, autocomplete, resize |
| Throttle | Executes at intervals | Scroll, mouse tracking, game input |
| Leading debounce | Executes immediately, then debounces | Save buttons, form submit |

## Further Reading

- [MDN: Debounce](https://developer.mozilla.org/en-US/docs/Glossary/Debounce)
- [MDN: Throttle](https://developer.mozilla.org/en-US/docs/Glossary/Throttle)
