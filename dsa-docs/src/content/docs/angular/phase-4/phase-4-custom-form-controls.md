---
title: "10. Custom Form Controls"
description: "ControlValueAccessor for building reusable form inputs."
sidebar:
  order: 12
---

## 10. Custom Form Controls

### Simple Words First 🟡
Angular's built-in form controls (`<input>`, `<select>`, `<textarea>`) are great. But sometimes you need a **custom input** — like a star rating, a color picker, or a country selector. `ControlValueAccessor` is the bridge that connects your custom component to Angular's forms system.

It's like building your own **custom remote control** that works with any TV (Angular form). The TV doesn't care about the remote's brand — it just needs the right signals (value, touch state, disabled state).

---

### The ControlValueAccessor Interface

```typescript
interface ControlValueAccessor {
  writeValue(value: any): void;           // Form control writes value TO your component
  registerOnChange(fn: any): void;        // Your component tells form value CHANGED
  registerOnTouched(fn: any): void;       // Your component tells form it was TOUCHED
  setDisabledState?(isDisabled: boolean): void; // Form disables your component
}
```

### Example: Star Rating Control

```typescript
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  template: `
    <div class="star-rating">
      <button
        *ngFor="let star of [1,2,3,4,5]; let i = index"
        (click)="setRating(star)"
        [class.active]="star <= value"
        [disabled]="disabled"
        type="button"
        aria-label="Rate {{ star }} stars">
        {{ star <= value ? '★' : '☆' }}
      </button>
    </div>
  `,
  styles: [`
    .star-rating button {
      font-size: 2rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #ccc;
    }
    .star-rating button.active {
      color: #f59e0b;
    }
    .star-rating button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
})
export class StarRatingComponent implements ControlValueAccessor {
  value: number = 0;
  disabled: boolean = false;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  // Called by Angular form — write a value TO the component
  writeValue(value: number): void {
    this.value = value ?? 0;
  }

  // Called by Angular form — register a callback for value changes
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  // Called by Angular form — register a callback for touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Called by Angular form — enable/disable the component
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setRating(rating: number): void {
    if (this.disabled) return;
    this.value = rating;
    this.onChange(rating);    // 👈 Tell the form the value changed
    this.onTouched();         // 👈 Tell the form it was touched
  }
}
```

### Using the Custom Control

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule, StarRatingComponent],
  template: `
    <form [formGroup]="reviewForm">
      <label>Rate this product:</label>
      <app-star-rating formControlName="rating" />
      <!-- 👆 Works like a regular <input>! -->

      <div *ngIf="ratingControl?.invalid && ratingControl?.touched">
        Rating is required
      </div>

      <button type="submit" [disabled]="reviewForm.invalid">Submit</button>
    </form>
  `
})
export class ReviewFormComponent {
  reviewForm = new FormGroup({
    rating: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  get ratingControl() {
    return this.reviewForm.get('rating');
  }
}
```

### Common Patterns

```typescript
// Pattern 1: Toggle switch (boolean control)
@Component({
  selector: 'app-toggle',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ToggleComponent), multi: true }],
  template: `
    <button (click)="toggle()" [class.active]="value" type="button">
      {{ value ? 'ON' : 'OFF' }}
    </button>
  `
})
export class ToggleComponent implements ControlValueAccessor {
  value = false;
  // ... implement the same 4 methods
}

// Pattern 2: Tag input (array control)
// A text input that creates tags on Enter

// Pattern 3: Color picker (string control)
// A visual color selection grid
```

### 🚨 Common Gotchas

```typescript
// ❌ Forgetting multi: true in providers
providers: [
  { provide: NG_VALUE_ACCESSOR, useExisting: StarRatingComponent }
  // ❌ Without multi: true, this REPLACES all other value accessors!
]

// ✅ Always add multi: true
providers: [
  { provide: NG_VALUE_ACCESSOR, useExisting: StarRatingComponent, multi: true }
]

// ❌ Not handling disabled state
// If setDisabledState isn't implemented, your component ignores [disabled]

// ❌ Using forwardRef incorrectly
// forwardRef(() => StarRatingComponent) is needed because the class
// reference isn't available yet at the time of the provider definition
```

### In Simple Words 🧠

- **`ControlValueAccessor`** lets ANY component work with Angular forms (template-driven or reactive)
- Implement 4 methods: `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`
- Register with `NG_VALUE_ACCESSOR` + `multi: true` in providers
- Use `forwardRef` to reference the component class before it's defined
- Your custom control works with `formControlName`, `ngModel`, validators — just like a native input
- Great for: star ratings, color pickers, tag inputs, autocomplete, toggle switches
