---
title: Event Loop
description: Understanding the JavaScript event loop
sidebar:
  order: 7
---

# Event Loop

## Introduction

The **event loop** is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.

## Topics Covered

- [How It Works](./how-it-works) — Call stack, Web APIs, and queues
- [Execution Order](./execution-order) — What runs when and why

## Learning Objectives

- Understand the event loop's role in JavaScript
- Know the order of execution for sync and async code
- Understand microtasks vs macrotasks priority

## Summary

Event loop enables async concurrency in single-threaded JS. Microtasks run before macrotasks. The event loop pauses when the call stack is not empty.

## Further Reading

- [MDN: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
