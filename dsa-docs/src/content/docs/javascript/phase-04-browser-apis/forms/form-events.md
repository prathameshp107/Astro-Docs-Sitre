---
title: Form Events
description: Submit, input, change, and blur events on forms
sidebar:
  order: 1
---

# Form Events

## Introduction

Forms fire several events during user interaction — submit, input, change, and blur — each with different timing and use cases.

## Submit Event

```javascript
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page reload
  console.log('Form submitted!');
});
```

## Input vs Change

```javascript
// 'input' — fires on every keystroke/change (real-time)
input.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});

// 'change' — fires when value is committed (blur after change)
input.addEventListener('change', (e) => {
  console.log('Final value:', e.target.value);
});
```

## Focus Events

```javascript
input.addEventListener('focus', () => {
  input.classList.add('focused');
});

input.addEventListener('blur', () => {
  input.classList.remove('focused');
  validateField(input); // Validate when user leaves field
});
```

## Summary

- `submit` — form submission (preventDefault to intercept)
- `input` — real-time value changes (every keystroke)
- `change` — committed value change (on blur)
- `focus` / `blur` — field focus state

## Further Reading

- [MDN: Form events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)
