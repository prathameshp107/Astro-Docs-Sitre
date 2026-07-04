---
title: closest() Method
description: Finding the nearest ancestor matching a selector
sidebar:
  order: 3
---

# closest() Method

## Introduction

The `closest()` method traverses up the DOM tree from the current element, finding the nearest ancestor that matches a CSS selector.

## Basic Usage

```javascript
const element = document.querySelector('.child');

// Find nearest ancestor with class 'container'
const container = element.closest('.container');

// Find nearest ancestor that's a button
const button = element.closest('button');
```

## Practical: Event Delegation

```javascript
document.addEventListener('click', (e) => {
  // Find the nearest button ancestor of the clicked element
  const button = e.target.closest('button');
  if (button) {
    console.log('Clicked button:', button.textContent);
  }
});

// Works with any selector
document.querySelector('table').addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (row) {
    console.log('Clicked row:', row.dataset.id);
  }
});
```

## closest vs parentElement

| Method | Direction | Accepts Selector |
|--------|-----------|-----------------|
| `parentElement` | One level up | ❌ No |
| `closest()` | Multiple levels up | ✅ Yes |

```javascript
// parentElement — only one level
element.parentElement; // Immediate parent only

// closest — traverses up until match or root
element.closest('.wrapper'); // Might be grandparent or further
```

## Summary

- `closest()` traverses UP the DOM tree
- Returns the nearest matching ancestor or null
- Accepts any CSS selector as argument
- Essential for event delegation patterns

## Further Reading

- [MDN: Element.closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
