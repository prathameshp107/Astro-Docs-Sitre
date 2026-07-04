---
title: Practical Examples
description: Real-world event delegation patterns
sidebar:
  order: 3
---

# Practical Examples

## Introduction

Here are practical, reusable event delegation patterns for common scenarios.

## Table with Action Buttons

```javascript
document.querySelector('table').addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  const action = e.target.closest('button');

  if (action?.dataset.action === 'delete') {
    row?.remove();
  } else if (action?.dataset.action === 'edit') {
    console.log('Editing row:', row?.dataset.id);
  }
});
```

## Dynamic List with Delete

```javascript
document.querySelector('#task-list').addEventListener('click', (e) => {
  const btn = e.target.closest('.delete-btn');
  if (btn) {
    btn.closest('li').remove();
  }
});
```

## Form Validation (Events That Don't Bubble)

```javascript
// blur doesn't bubble — use capture phase
document.querySelector('form').addEventListener('blur', (e) => {
  if (e.target.matches('input, textarea, select')) {
    validateField(e.target);
  }
}, true); // Capture phase because blur doesn't bubble
```

## Summary

- Use `e.target.closest()` to identify the target element
- Works with data attributes for actions
- Use capture phase for events that don't bubble (focus, blur)
- Single listener handles all current and future elements

## Further Reading

- [MDN: closest method](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
