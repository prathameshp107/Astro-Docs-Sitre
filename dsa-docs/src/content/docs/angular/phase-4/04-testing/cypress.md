---
title: "Cypress"
description: "End-to-end testing with Cypress."
sidebar:
  order: 6
---

## Introduction
Cypress is a modern E2E testing framework that runs tests in the browser.

## Example

```typescript
describe('Product List', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products*', { fixture: 'products' }).as('getProducts');
    cy.visit('/products');
  });

  it('displays product cards', () => {
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });
});
```

## Summary
Cypress provides a developer-friendly E2E testing experience for Angular apps."
