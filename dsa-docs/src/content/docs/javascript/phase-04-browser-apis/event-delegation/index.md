---
title: Event Delegation
description: Efficient event handling using event delegation pattern
sidebar:
  order: 7
---

# Event Delegation

## Introduction

**Event delegation** is a technique where you attach a single event listener to a **parent element** instead of multiple listeners to individual children. It works because events bubble up.

## Topics Covered

- [Without Delegation](./without-delegation) — The problem with individual listeners
- [With Delegation](./with-delegation) — How delegation solves the problem
- [Practical Examples](./practical-examples) — Real-world delegation patterns

## Summary

Single parent listener handles all children via bubbling. Use `e.target.closest()` to identify targets. Works for dynamically added elements. Reduces memory usage.

## Further Reading

- [MDN: Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
