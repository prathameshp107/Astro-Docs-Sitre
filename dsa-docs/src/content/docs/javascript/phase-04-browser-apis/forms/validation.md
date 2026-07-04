---
title: Validation
description: Client-side form validation with JavaScript
sidebar:
  order: 3
---

# Validation

## Introduction

Validate form input using the Constraint Validation API for real-time feedback.

## Real-Time Validation

```javascript
const input = document.querySelector('input[type="email"]');

input.addEventListener('input', () => {
  if (input.validity.valid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
    console.log(input.validationMessage);
  }
});
```

## Constraint Validation API

```javascript
input.validity.valueMissing;    // Required but empty
input.validity.typeMismatch;    // Wrong email/URL format
input.validity.tooShort;        // Below minlength
input.validity.rangeUnderflow;  // Below min value
input.validity.patternMismatch; // Doesn't match pattern attribute
input.validity.valid;           // All constraints pass (the one to check)
```

## Custom Validation

```javascript
input.addEventListener('input', () => {
  if (input.value.length < 3) {
    input.setCustomValidity('Must be at least 3 characters');
  } else if (!input.value.includes('@')) {
    input.setCustomValidity('Must be a valid email');
  } else {
    input.setCustomValidity(''); // Clear custom error
  }
  input.reportValidity(); // Show the error message
});
```

## Summary

- Use `input.validity.valid` to check if a field is valid
- Check specific validity properties for detailed errors
- `setCustomValidity()` for custom validation messages
- `reportValidity()` to display validation messages

## Further Reading

- [MDN: Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
