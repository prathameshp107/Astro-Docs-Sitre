---
title: "Integration Testing"
description: "Test component interactions."
sidebar:
  order: 2
---

## Introduction
Integration tests verify that multiple units work together correctly.

## Component Testing

```typescript
describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, SharedModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
  });

  it('should display products', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(cards.length).toBeGreaterThan(0);
  });
});
```

## Summary
Integration tests verify component interactions with their dependencies."
