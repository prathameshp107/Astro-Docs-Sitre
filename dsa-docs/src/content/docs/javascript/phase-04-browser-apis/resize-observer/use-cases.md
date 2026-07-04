---
title: Use Cases
description: Practical applications of Resize Observer
sidebar:
  order: 2
---

# Use Cases

## Introduction

Resize Observer is useful for responsive components that need to adapt to their container size.

## Common Use Cases

- Responsive components that adapt to their container
- Canvas/Chart resizing when parent changes size
- Dashboard widgets that reflow based on available space
- Text truncation detection

## Example: Responsive Component

```javascript
class ResponsiveComponent {
  constructor(element) {
    this.element = element;
    this.observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;

      if (width < 400) {
        element.classList.add('compact');
        element.classList.remove('full');
      } else if (width < 800) {
        element.classList.add('medium');
        element.classList.remove('compact', 'full');
      } else {
        element.classList.add('full');
        element.classList.remove('compact', 'medium');
      }
    });

    this.observer.observe(element);
  }

  destroy() {
    this.observer.disconnect();
  }
}

// Usage
const card = new ResponsiveComponent(document.querySelector('.card'));
```

## Summary

- Use for container-based responsive design (not viewport-based)
- Efficient — fires only when element actually changes size
- Unlike window resize event, works on any element
- Essential for reusable component libraries

## Further Reading

- [MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
