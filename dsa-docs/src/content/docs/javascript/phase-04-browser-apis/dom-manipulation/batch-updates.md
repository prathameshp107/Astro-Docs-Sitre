---
title: Batch Updates
description: Using DocumentFragment for efficient batch DOM operations
sidebar:
  order: 5
---

# Batch Updates

## Introduction

Each DOM manipulation triggers layout calculations. Batch updates using `DocumentFragment` minimize reflows for better performance.

## The Problem

```javascript
// ❌ Multiple reflows (slow)
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(document.createElement('div'));
}
// Each appendChild triggers a reflow — 1000 reflows!
```

## The Solution

```javascript
// ✅ Single reflow (fast) — use DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(document.createElement('div'));
}
document.body.appendChild(fragment); // One reflow only
```

## How It Works

1. Create a DocumentFragment (lightweight, not in DOM)
2. Build your elements inside the fragment
3. Append the fragment to the DOM (one operation)
4. Fragment's children are transferred, fragment itself is empty

## Summary

- Each DOM write can trigger a reflow (expensive)
- Batch reads together, batch writes together
- Use `DocumentFragment` for bulk insertions
- One append of the fragment = one reflow

## Further Reading

- [MDN: DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
