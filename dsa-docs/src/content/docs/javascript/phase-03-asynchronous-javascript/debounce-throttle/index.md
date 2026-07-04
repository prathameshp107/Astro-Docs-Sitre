---
title: Debounce and Throttle
description: Rate-limiting rapid events with debounce and throttle patterns
sidebar:
  order: 13
---

# Debounce & Throttle

## Introduction

**Debounce** and **Throttle** are two patterns for controlling how often a function is executed in response to rapid events (typing, scrolling, resizing).

## Topics Covered

- [Debounce](./debounce) — Execute after a pause in events
- [Throttle](./throttle) — Execute at maximum intervals
- [Leading Option](./leading-option) — Execute immediately, then debounce
- [Use Cases](./use-cases) — When to use each pattern
- [Debounce vs Throttle](./comparison) — Key differences at a glance

## Summary

**Debounce**: Wait for pause, then execute (search, autocomplete). **Throttle**: Execute at max rate (scroll, resize, animation). Both prevent excessive function calls.

## Further Reading

- [MDN: Debounce](https://developer.mozilla.org/en-US/docs/Glossary/Debounce)
