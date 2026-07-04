---
title: Inserting Elements
description: Adding elements to the DOM at specific positions
sidebar:
  order: 2
---

# Inserting Elements

## Introduction

After creating elements, you need to insert them into the DOM. Modern methods like `append` and `prepend` are cleaner than older methods.

## Classic Methods

```javascript
const container = document.querySelector('.container');
const element = document.createElement('p');
element.textContent = 'New paragraph';

// Append as last child
container.appendChild(element);

// Insert at a specific position (before first child)
container.insertBefore(element, container.firstChild);
```

## Modern Methods (Preferred)

```javascript
const container = document.querySelector('.container');
const element = document.createElement('p');
element.textContent = 'New paragraph';

container.prepend(element);   // Insert as first child
container.append(element);    // Insert as last child
container.before(element);    // Insert before the container itself
container.after(element);     // Insert after the container itself
element.replaceWith(newElement); // Replace element with a new one
```

## Multiple Elements at Once

```javascript
// Modern methods accept multiple arguments
const p1 = document.createElement('p');
const p2 = document.createElement('p');
container.append(p1, p2, 'Some text'); // Appends all three
```

## Summary

| Method | Position |
|--------|----------|
| `appendChild()` | Last child (classic) |
| `insertBefore()` | Before a reference node |
| `append()` | Last child (modern) |
| `prepend()` | First child (modern) |
| `before()` | Before the element |
| `after()` | After the element |
| `replaceWith()` | Replaces the element |

## Further Reading

- [MDN: Node.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
