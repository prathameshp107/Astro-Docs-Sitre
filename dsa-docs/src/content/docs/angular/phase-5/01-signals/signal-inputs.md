---
title: "Signal Inputs & Model"
description: "Reactive component inputs and two-way binding."
sidebar:
  order: 4
---

## Introduction
Angular 17.1+ introduced signal-based inputs (input/output functions) and model() for two-way binding.

## Example

```typescript
@Component({ ... })
export class MyComponent {
  name = input.required<
