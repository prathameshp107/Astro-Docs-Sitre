---
title: "Mocking"
description: "Mock dependencies in Angular tests."
sidebar:
  order: 3
---

## Introduction
Mocking replaces real dependencies with controlled substitutes for isolated testing.

## Jasmine Spies

```typescript
const spy = jasmine.createSpyObj('ProductService', ['getAll']);
spy.getAll.and.returnValue(of(mockProducts));

TestBed.configureTestingModule({
  providers: [{ provide: ProductService, useValue: spy }]
});
```

## Summary
Mocking is essential for isolating the unit under test from its dependencies."
