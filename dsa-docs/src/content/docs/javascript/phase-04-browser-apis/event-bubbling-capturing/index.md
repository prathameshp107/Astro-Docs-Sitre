---
title: Event Bubbling & Capturing
description: Understanding event propagation — bubbling and capturing phases
sidebar:
  order: 6
---

# Event Bubbling & Capturing

## Introduction

When an event fires on an element, it **propagates** through the DOM tree in three phases: **capturing** (down), **target** (at), and **bubbling** (up).

## Topics Covered

- [Bubbling](./bubbling) — Events propagate up from the target by default
- [Capturing](./capturing) — Listening during the capture phase
- [stopPropagation](./stopPropagation) — Halting event propagation

## Summary

Capturing (down) → Target → Bubbling (up). Default listeners run in bubbling phase. `{ capture: true }` for capturing phase. `stopPropagation()` halts propagation.

## Further Reading

- [MDN: Event Bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling)
