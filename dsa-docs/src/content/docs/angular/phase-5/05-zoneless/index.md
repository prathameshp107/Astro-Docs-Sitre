---
title: "Zoneless Change Detection"
description: "Run Angular without Zone.js using Signals."
sidebar:
  order: 1
---

## Introduction
Zoneless change detection removes Zone.js from Angular, using Signals to trigger change detection only when data actually changes — resulting in smaller bundles, faster boot times, and more predictable rendering.

## Why do we need this?
Zone.js monkey-patches all browser async APIs to detect when to run change detection — adding ~50KB to your bundle, causing unnecessary CD cycles, and making debugging harder. Zoneless mode eliminates these issues entirely.

## Topics Covered
- What is zoneless Angular and why it matters
- Enabling zoneless mode
- Zoneless-compatible component patterns
- Gradual migration from zone-based to zoneless
- Common pitfalls and debugging

## Learning Roadmap
1. Understand what Zone.js does and why it's problematic
2. Learn how Signals enable zoneless change detection
3. Enable zoneless mode in your app
4. Adopt zoneless-compatible patterns (Signals, OnPush, async pipe)
5. Remove Zone.js dependency

## Prerequisites
- Understanding of Angular change detection (`OnPush`, `Default`)
- Experience with Angular Signals
- Angular 18+ (experimental) or 19+ (improved stability)
- Familiarity with `ChangeDetectorRef`

## Real-world use cases
- New Angular 18+ projects starting with zoneless from day one
- Performance-critical apps where every KB and millisecond matters
- Apps transitioning to Signal-based reactivity
- Micro-frontends where Zone.js conflicts between frameworks
- SSR/SSG apps that don't need Zone.js on the client
