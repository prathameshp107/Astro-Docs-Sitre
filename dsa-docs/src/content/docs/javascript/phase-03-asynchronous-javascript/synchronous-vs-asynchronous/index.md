---
title: Synchronous vs Asynchronous
description: Understanding blocking and non-blocking execution in JavaScript
sidebar:
  order: 1
---

# Synchronous vs Asynchronous

## Introduction

JavaScript is **single-threaded** — it can only execute one piece of code at a time. This topic covers the fundamental difference between synchronous (blocking) and asynchronous (non-blocking) execution.

## Topics Covered

- [Blocking vs Non-Blocking](./blocking-vs-nonblocking) — How blocking differs from non-blocking execution
- [Execution Model](./execution-model) — How JavaScript handles sync and async under the hood

## Learning Objectives

- Understand the difference between synchronous and asynchronous execution
- Recognize blocking vs non-blocking operations
- Understand why async is essential for web applications

## Prerequisites

- Basic JavaScript syntax
- Understanding of functions

## Key Points

| Synchronous | Asynchronous |
|------------|-------------|
| Blocks until complete | Non-blocking, continues execution |
| Sequential execution | Pending operations resume later |
| Simpler mental model | More complex but necessary for I/O |

## Further Reading

- [MDN: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
