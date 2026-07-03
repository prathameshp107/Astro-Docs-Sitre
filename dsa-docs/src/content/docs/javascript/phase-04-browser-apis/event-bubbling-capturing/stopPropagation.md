---
title: stopPropagation
description: Halting event propagation
sidebar:
  order: 3
---

# stopPropagation

## Introduction

`stopPropagation()` prevents the event from further propagation in the capturing and bubbling phases.

## stopPropagation

```javascript
button.addEventListener('click', (e) => {
  e.stopPropagation(); // Stops event from bubbling further
  console.log('Button clicked — propagation stopped');
});

// Parent listener never fires
div.addEventListener('click', () => {
  console.log('This never runs');
});
```

## stopImmediatePropagation

```javascript
button.addEventListener('click', (e) => {
  e.stopImmediatePropagation(); // Stops ALL other listeners on this element too
  console.log('First handler — runs');
});

button.addEventListener('click', () => {
  console.log('This never runs — stopped by stopImmediatePropagation');
});

button.addEventListener('click', () => {
  console.log('This also never runs');
});
```

## When to Use

- Prevent parent handlers from reacting to child events
- Isolate component behavior
- Stop event delegation interference (use sparingly)

## When NOT to Use

- Don't use as a crutch — event delegation relies on bubbling
- Consider if you really need to stop propagation
- Overusing it makes debugging difficult

## Summary

- `stopPropagation()` — stops bubbling/capturing
- `stopImmediatePropagation()` — also stops other handlers on same element
- Use sparingly — it can break event delegation patterns
- `preventDefault()` does NOT stop propagation

## Further Reading

- [MDN: Event.stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
