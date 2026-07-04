---
title: "Memoization"
description: "Cache expensive computation results."
sidebar:
  order: 5
---

## Introduction
Memoization caches the results of expensive computations and returns cached results when the same inputs occur again.

## NgRx Selectors
NgRx selectors are memoized — they only recompute when their inputs change.

## Pure Pipes
Pure pipes only recompute when input references change, providing implicit memoization.

## Summary
Memoization prevents redundant computation, improving application performance."
