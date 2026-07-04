---
title: "Property Binding"
description: "Learn how to bind component properties to element properties using square bracket syntax [ ]."
sidebar:
  order: 2
---

## Introduction
Property binding allows you to set properties of HTML elements, directives, or components from your component class. It's a one-way data binding from component to template.

## Why do we need this?
While interpolation is great for displaying text, many HTML element properties (like `disabled`, `src`, `href`) are not strings but boolean values, URLs, or objects. Property binding lets you set these properties directly with the correct type.

## Real-world analogy
Think of property binding like setting the properties of a remote-controlled car. You don't just label it "fast" or "slow" (which would be like interpolation), you actually set its speed property to a number, its direction to an angle, and its power state to true/false.

## Visual Explanation
![property binding diagram](https://via.placeholder.com/400x200?text=Property+Binding+[prop]+=%E2%80%9Dvalue%E2%80%9D)

## Mermaid Diagram
```mermaid
flowchart LR
    A[Component Property: imageUrl] -->|Value: "photo.jpg"| B[<img [src]="imageUrl">]
    B --> C[<img src="photo.jpg"> in DOM]
```

## Deep Explanation
Property binding uses square brackets `[ ]` to set an element property to a template expression. Unlike interpolation which always results in a string, property binding preserves the type of the value.

### Syntax
```html
[element-property]="template-expression"
```
The target is the name of an element property (not an attribute), surrounded by square brackets.

### Common Properties to Bind
- `[src]` - for `<img>`, `<iframe>`, `<video>` elements
- `[href]` - for `<a>` elements
- `[disabled]` - for `<button>`, `<input>`, `<select>`, `<textarea>`
- `[checked]` - for checkboxes and radio buttons
- `[value]` - for input, select, textarea
- `[class]`, `[style]` - for CSS classes and inline styles
- `[innerHTML]` - for setting HTML content (use with caution!)

### Special Cases
- **Class Binding**: `[class.some-class]="condition"` adds/removes a CSS class
- **Style Binding**: `[style.width.px]="size"` sets inline styles with units
- **Attribute Binding**: When there's no corresponding property, use `attr.` prefix: `[attr.aria-label]="label"`
- **Colspan/Rowspan**: Use `attr.colspan` since there's no `colSpan` property

## Code Example
```typescript
// banner.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <div class="banner">
      <h1 [textContent]="title">{{ title }}</h1>
      <img [src]="imageUrl" [alt]="altText" [class.active]="isActive">
      <button 
        [disabled]="isLoading"
        [class.primary]="!isLoading"
        [class.secondary]="isLoading"
      >
        {{ buttonText }}
      </button>
    </div>
  `
})
export class BannerComponent {
  title = 'Welcome to Our Site';
  imageUrl = 'https://example.com/banner.jpg';
  altText = 'Promotional Banner';
  isActive = true;
  isLoading = false;
  buttonText = 'Get Started';
  
  startLoading() {
    this.isLoading = true;
    this.buttonText = 'Loading...';
  }
}
```

## Best Practices
- Use property binding for element properties, not attributes (except when no property exists)
- For boolean properties, bind directly (don't rely on string presence/absence)
- Prefer property binding over interpolation when setting properties (it's more efficient and type-safe)
- Use `[[ ]]` (bracket parentheses) for two-way binding when needed
- For SVG elements, use `attr.` prefix as SVG uses attributes, not properties

## Common Mistakes
- Confusing attributes with properties (e.g., using `[value]` vs `value` attribute)
- Trying to bind to non-existent properties (results in errors)
- Forgetting that `[disabled]` expects a boolean, not a string
- Using interpolation for properties that aren't strings (like `[src]` with `{{ url }}` - works but less efficient)
- Overlooking security risks with `[innerHTML]` (can lead to XSS attacks)

## Interview Questions
1. What's the difference between an HTML attribute and a DOM property?
2. When should you use property binding instead of interpolation?
3. How do you bind to CSS classes and styles in Angular?
4. What is the purpose of the `attr.` prefix in binding syntax?
5. How does `[ngClass]` differ from `[class.some-class]="condition"`?

## Summary
Property binding (`[ ]`) is a one-way data binding technique that sets element properties to values from your component. Unlike interpolation which always produces strings, property binding preserves data types, making it essential for setting boolean properties, URLs, objects, and other non-string values. It's a fundamental building block for creating dynamic, interactive templates in Angular applications.