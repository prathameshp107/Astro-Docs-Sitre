---
title: "Reusable Form Components"
description: "Build reusable form components with ControlValueAccessor."
sidebar:
  order: 12
---

## Introduction
Reusable form components encapsulate common form patterns and can be used with template-driven and reactive forms via ControlValueAccessor.

## Example

```typescript
@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRatingComponent),
    multi: true
  }]
})
export class StarRatingComponent implements ControlValueAccessor {
  writeValue(value: any) { /* ... */ }
  registerOnChange(fn: any) { /* ... */ }
  registerOnTouched(fn: any) { /* ... */ }
  setDisabledState(isDisabled: boolean) { /* ... */ }
}
```

## Summary
ControlValueAccessor makes any component compatible with Angular forms."
