---
title: Microtask and Macrotask Queues
description: Understanding JavaScript's task queues — priority and execution order
sidebar:
  order: 8
---

# Microtask & Macrotask Queues

## Introduction

JavaScript has **two task queues**: microtasks (high priority) and macrotasks (lower priority). The event loop processes all microtasks before moving to the next macrotask.

## Topics Covered

- [What Goes Where](./what-goes-where) — Which operations go in which queue
- [Execution Order](./execution-order) — How the event loop prioritizes queues
- [Starvation](./starvation) — When microtasks prevent macrotasks from running

## Summary

Microtasks run before the next macrotask. Microtask queue is fully cleared each cycle. Promise callbacks are microtasks.

## Further Reading

- [MDN: Using microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)
