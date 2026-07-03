---
title: The Event Object
description: Properties and methods of the event object
sidebar:
  order: 2
---

# The Event Object

## Introduction

When an event fires, an **event object** is passed to the handler with details about the event.

## Key Properties

```javascript
element.addEventListener('click', (e) => {
  e.target;            // Element that triggered the event
  e.currentTarget;     // Element the listener is attached to
  e.type;              // Event type ('click', 'keydown', etc.)
  e.bubbles;           // Whether the event bubbles (boolean)
  e.eventPhase;        // 1=capture, 2=at target, 3=bubbling
  e.timeStamp;         // Time when the event occurred
});
```

## Key Methods

```javascript
element.addEventListener('click', (e) => {
  e.preventDefault();       // Cancel default behavior
  e.stopPropagation();      // Stop event from bubbling/capturing
  e.stopImmediatePropagation(); // Stop + prevent other handlers on same element
});
```

## Event Properties by Type

```javascript
// Mouse events: clientX, clientY, button
element.addEventListener('mousemove', (e) => {
  console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
  console.log(`Button: ${e.button}`); // 0=left, 1=middle, 2=right
});

// Keyboard events: key, code, altKey, ctrlKey, shiftKey
document.addEventListener('keydown', (e) => {
  console.log(`Key pressed: ${e.key} (code: ${e.code})`);
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault(); // Prevent browser save dialog
  }
});
```

## Summary

- `e.target` — the element that triggered the event
- `e.currentTarget` — the element with the listener
- `e.preventDefault()` — cancel default behavior
- `e.stopPropagation()` — stop event propagation
- Properties vary by event type (mouse, keyboard, etc.)

## Further Reading

- [MDN: Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
