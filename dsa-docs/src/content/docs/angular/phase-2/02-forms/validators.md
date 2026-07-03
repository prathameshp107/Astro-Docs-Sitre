---
title: "Built-in Validators"
description: "Angular's built-in form validators."
sidebar:
  order: 7
---

## Introduction
Angular provides several built-in validators for common validation scenarios.

## Built-in Validators

```typescript
Validators.required       // Field must have a value
Validators.email          // Value must be a valid email
Validators.minLength(3)   // Minimum length
Validators.maxLength(20)  // Maximum length
Validators.pattern(/^[a-z]+$/)  // Regex pattern
Validators.min(0)         // Minimum numeric value
Validators.max(100)       // Maximum numeric value
Validators.nullValidator  // No validation
Validators.compose([...]) // Combine multiple validators
```

## Summary
Built-in validators cover most common validation scenarios."
