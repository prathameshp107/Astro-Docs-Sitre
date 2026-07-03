---
title: "Interpolation"
description: "Learn how to display component data in templates using interpolation syntax {{ }}."
sidebar:
  order: 1
---

## Introduction
Interpolation is the simplest form of data binding in Angular. It allows you to embed component data directly into your template using double curly braces {{ }}.

## Why do we need this?
Interpolation provides a quick and readable way to display dynamic data in your views without writing complex binding syntax. It's perfect for displaying text content, concatenating strings, and showing simple expressions.

## Real-world analogy
Think of interpolation like a mail merge in a word processor. You insert placeholders (like <<Name>>) in a document, and when you print, those placeholders get replaced with actual data from a database. In Angular, {{ }} are the placeholders that get replaced with component property values.

## Visual Explanation
![interpolation diagram](https://via.placeholder.com/400x200?text=Interpolation:+{{data}})

## Mermaid Diagram
```mermaid
flowchart LR
    A[Component Property] -->|Value: "John"| B{{{{ "Hello, " + name + "!" }}}}
    B --> C[Template Renders: "Hello, John!"]
```

## Deep Explanation
Interpolation is a one-way data binding from component to template. The template expression inside {{ }} is evaluated by Angular and the result is converted to a string and inserted into the DOM.

### Basic Syntax
```html
{{ expression }}
```
The expression can be:
- A property: `{{ userName }}`
- A string concatenation: `{{ 'Hello, ' + userName }}`
- A method call: `{{ getFullName() }}`
- A mathematical expression: `{{ 2 + 2 }}`
- A ternary operator: `{{ isLoggedIn ? 'Logout' : 'Login' }}`

### What You Can't Do
- Assignment statements: `{{ userName = 'John' }}` (invalid)
- `new` keyword: `{{ new Date() }}` (invalid)
- Chaining semicolons: `{{ x = 5; y = 6; x + y }}` (invalid)
- Bitwise operators like `|` or `&` (these have special meaning in templates)

## Code Example
```typescript
// user.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <div>
      <h2>Welcome, {{ name }}!</h2>
      <p>You have {{ messageCount }} new messages.</p>
      <p>Today is {{ today | date }}</p>
      <button [disabled]="isDisabled">
        {{ isDisabled ? 'Enabled' : 'Disabled' }}
      </button>
    </div>
  `
})
export class UserComponent {
  name = 'Alice';
  messageCount = 5;
  today = new Date();
  isDisabled = false;
  
  toggle() {
    this.isDisabled = !this.isDisabled;
  }
}
```

## Best Practices
- Keep template expressions simple; move complex logic to component methods
- Use pipes for data transformation when appropriate (like date formatting)
- Avoid calling methods frequently in templates as they run on every change detection cycle
- Prefer property bindings over interpolation when setting element properties (like `[disabled]` vs `disabled="false"`)

## Common Mistakes
- Trying to use assignment in interpolation (doesn't work)
- Forgetting that interpolation only produces strings - for boolean attributes use property binding
- Calling expensive methods in template expressions (performance issue)
- Using complex expressions that are hard to read and test

## Interview Questions
1. What is interpolation in Angular and how is it represented syntactically?
2. What types of expressions can you use in interpolation?
3. What are the limitations of interpolation compared to property binding?
4. When would you prefer property binding over interpolation?
5. How does interpolation differ from template expressions in general?

## Summary
Interpolation (`{{ }}`) is Angular's simplest data binding mechanism for displaying component data as text in templates. It evaluates expressions and converts them to strings, making it ideal for displaying dynamic text content. While powerful for simple displays, more complex interactions should use property binding, event binding, or two-way binding.