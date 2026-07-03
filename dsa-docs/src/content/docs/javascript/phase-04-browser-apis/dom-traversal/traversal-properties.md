---
title: Traversal Properties
description: Moving between elements with parent, child, and sibling properties
sidebar:
  order: 1
---

# Traversal Properties

## Introduction

DOM traversal properties let you navigate the DOM tree by moving to parent, child, or sibling elements.

## Visual Explanation

```mermaid
flowchart TD
    A["&lt;div class='parent'&gt;"]
    B["&lt;p&gt;First&lt;/p&gt;"]
    C["&lt;p&gt;Target&lt;/p&gt; ★"]
    D["&lt;p&gt;Last&lt;/p&gt;"]

    A --> B
    A --> C
    A --> D

    E["parentElement → div.parent"]
    F["previousElementSibling → &lt;p&gt;First&lt;/p&gt;"]
    G["nextElementSibling → &lt;p&gt;Last&lt;/p&gt;"]

    C -.-> E
    C -.-> F
    C -.-> G
```

## Traversal Properties

```javascript
const element = document.querySelector('.target');

// Up (parent)
element.parentElement;          // Direct parent element
element.closest('.container');  // Nearest ancestor matching selector

// Sideways (siblings)
element.previousElementSibling; // Previous sibling
element.nextElementSibling;     // Next sibling

// Down (children)
element.children;               // HTMLCollection of children
element.firstElementChild;      // First child
element.lastElementChild;       // Last child
element.querySelector('.child'); // Deep search in children
```

## Summary

- `parentElement` — direct parent
- `previousElementSibling` / `nextElementSibling` — siblings
- `children` — all child elements
- `firstElementChild` / `lastElementChild` — first and last child

## Further Reading

- [MDN: Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
