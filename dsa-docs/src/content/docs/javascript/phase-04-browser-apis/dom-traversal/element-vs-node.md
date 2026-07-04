---
title: Element vs Node
description: Element traversal vs Node traversal in the DOM
sidebar:
  order: 2
---

# Element vs Node

## Introduction

You can traverse the DOM using either **Element** properties (elements only) or **Node** properties (includes text, comments). Element properties are preferred.

## Node Traversal

```javascript
// Node traversal (includes text nodes, comments)
element.parentNode;
element.childNodes;     // Includes text nodes (whitespace!)
element.firstChild;
element.lastChild;
element.previousSibling;
element.nextSibling;
```

## Element Traversal (Preferred)

```javascript
// Element traversal (elements only) ← PREFERRED
element.parentElement;
element.children;       // Elements only (no text nodes)
element.firstElementChild;
element.lastElementChild;
element.previousElementSibling;
element.nextElementSibling;
```

## Why Element Traversal is Better

```html
<div>
  <p>First</p>
  <p>Second</p>
</div>
```

```javascript
const div = document.querySelector('div');

// Node — includes text nodes (whitespace between tags)
console.log(div.childNodes.length); // 5: text, p, text, p, text

// Element — elements only
console.log(div.children.length);   // 2: p, p (clean!)
```

## Summary

- Node traversal includes text and comment nodes (messy)
- Element traversal returns elements only (clean)
- Always prefer Element properties for most use cases
- `children` vs `childNodes` is the most common distinction

## Further Reading

- [MDN: Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)
