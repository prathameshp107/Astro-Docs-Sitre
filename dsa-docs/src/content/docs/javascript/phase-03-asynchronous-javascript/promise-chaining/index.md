---
title: Promise Chaining
description: Sequencing async operations with promise chains
sidebar:
  order: 4
---

# Promise Chaining

## Introduction

Promise chaining sequences async operations where each step waits for the previous one to complete before starting.

## Topics Covered

- [Basic Chaining](./basic-chaining) — How chaining works step by step
- [Error Propagation](./error-propagation) — How errors flow through chains
- [Returning Promises](./returning-promises) — Nesting vs flattening async operations

## Learning Objectives

- Understand how `.then()` chains work
- Know how errors propagate through chains
- Recognize when to flatten nested promises

## Summary

Each `.then()` receives the previous return value. Return a value or a promise. Errors skip to the nearest `.catch()`. Chains are flat, not nested.

## Further Reading

- [MDN: Promise Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining)
