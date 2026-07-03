---
title: Promise APIs
description: JavaScript Promise combinators — all, race, allSettled, any
sidebar:
  order: 5
---

# Promise APIs

## Introduction

JavaScript provides several static methods to work with multiple promises concurrently. Each serves a different concurrency pattern.

## Topics Covered

- [Promise.all](./promise-all) — Wait for all to fulfill
- [Promise.race](./promise-race) — First to settle wins
- [Promise.allSettled](./promise-allSettled) — Wait for all, never rejects
- [Promise.any](./promise-any) — First success wins

## Learning Objectives

- Know when to use each Promise combinator
- Understand the difference between all, race, allSettled, and any
- Handle errors appropriately for each method

## Summary

| Method | Resolves | Rejects |
|--------|----------|---------|
| `Promise.all` | When all fulfill | When any rejects |
| `Promise.race` | When any settles | When any settles |
| `Promise.allSettled` | When all settle | Never |
| `Promise.any` | When any fulfills | When all reject |

## Further Reading

- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
