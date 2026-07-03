---
title: addEventListener
description: Attaching event handlers to elements
sidebar:
  order: 1
---

# addEventListener

## Introduction

`addEventListener` attaches an event handler to an element without overwriting existing handlers.

## Basic Usage

```javascript
const button = document.querySelector('button');

button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log('Event type:', event.type);  // 'click'
  console.log('Target:', event.target);     // The clicked element
});

// Multiple listeners on the same element
button.addEventListener('click', handler1);
button.addEventListener('click', handler2); // Both run independently
```

## Removing Listeners

```javascript
function handleClick(event) {
  console.log('Clicked');
  button.removeEventListener('click', handleClick); // Runs once
}

button.addEventListener('click', handleClick);

// Options: { once: true } — auto-removes after first call
button.addEventListener('click', handler, { once: true });
```

## Options

```javascript
element.addEventListener('click', handler, {
  capture: false,    // Use capture phase instead of bubbling
  once: false,       // Auto-remove after first invocation
  passive: false     // If true, indicates handler won't call preventDefault()
});
```

## Summary

- Use `addEventListener` instead of `onclick` properties (supports multiple handlers)
- Use `removeEventListener` for cleanup (requires named function reference)
- `{ once: true }` for auto-removing handlers
- Named functions enable proper removal

## Further Reading

- [MDN: EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
