---
title: Strategy Pattern Real-World Examples
description: Form validation, sorting, and payment processing with strategies
sidebar:
  order: 2
---

# Real-World Examples

## Introduction

The Strategy pattern excels in scenarios where you need to switch between different algorithms or behaviors at runtime.

## Form Validation

```javascript
const validators = {
  required: value => value.trim() !== '' ? null : 'Required',
  email: value => /^.+@.+$/.test(value) ? null : 'Invalid email',
  minLength: min => value => value.length >= min ? null : `Min ${min} chars`,
  maxLength: max => value => value.length <= max ? null : `Max ${max} chars`,
  numeric: value => !isNaN(value) ? null : 'Must be a number'
};

function validate(field, value, rules) {
  for (const rule of rules) {
    const error = typeof rule === 'string'
      ? validators[rule](value)
      : rule(value);
    if (error) return { field, error };
  }
  return null;
}

validate('email', 'test@example.com', ['required', 'email']);
// null (valid)

validate('email', '', ['required', 'email']);
// { field: 'email', error: 'Required' }
```

## Payment Processing

```javascript
const paymentStrategies = {
  creditCard: (amount, details) => {
    // Charge via Stripe
    return `Charged $${amount} to card ${details.last4}`;
  },
  paypal: (amount, details) => {
    // Redirect to PayPal
    return `PayPal payment of $${amount}`;
  },
  crypto: (amount, details) => {
    // Process crypto transaction
    return `Crypto payment of ${amount} ${details.currency}`;
  }
};

function processPayment(method, amount, details) {
  const strategy = paymentStrategies[method];
  if (!strategy) throw new Error(`Unknown payment method: ${method}`);
  return strategy(amount, details);
}
```

## Summary

- Form validation with interchangeable rule strategies
- Payment gateways with different providers
- Sorting algorithms selected at runtime
- Compression algorithms (gzip, brotli, etc.)

## Further Reading

- [Refactoring Guru: Strategy](https://refactoring.guru/design-patterns/strategy)
