---
title: Removing Elements
description: Removing DOM elements from the page
sidebar:
  order: 4
---

# Removing Elements

## Introduction

Remove DOM elements cleanly using modern methods.

## Removing an Element

```javascript
const element = document.querySelector('.to-remove');

// Modern method (preferred)
element.remove();

// Legacy method
element.parentNode.removeChild(element);
```

## Removing Children

```javascript
const parent = document.querySelector('.container');

// Remove all children
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}

// Modern: replace content (clears children)
parent.replaceChildren();

// Or simply: innerHTML = '' (fast but unsafe with listeners)
parent.innerHTML = '';
```

## Summary

- `element.remove()` — modern, clean removal
- `element.parentNode.removeChild(element)` — legacy method
- `parent.replaceChildren()` — removes all children
- Always clean up event listeners when removing elements

## Further Reading

- [MDN: ChildNode.remove](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)
