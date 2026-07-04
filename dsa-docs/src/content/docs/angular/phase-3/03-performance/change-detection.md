---
title: "Change Detection Deep Dive"
description: "Understanding Angular's change detection mechanism."
sidebar:
  order: 4
---

## Introduction
Angular's change detection determines when to update the DOM. It's triggered by Zone.js patching browser async APIs.

## How It Works

1. User clicks button → Zone.js intercepts
2. Microtask queue empties → onMicrotaskEmpty fires
3. ApplicationRef.tick() runs change detection
4. Angular walks component tree, checks bindings
5. Updates DOM where values changed

## Zone.js Alternative (Angular 18+)
Signals enable zone-less change detection for finer-grained updates."
