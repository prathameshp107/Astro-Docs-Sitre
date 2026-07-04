---
title: "Data Binding"
description: "Learn how to synchronize data between component and template using Angular's four binding types."
sidebar:
  order: 4
---

## Introduction
Data binding is the mechanism that connects your component's data (the model) with the user interface (the user sees in the template (the view). Angular's templating system). With data binding, you can automatically reflect changes in your component properties in the UI, and respond to user interactions by updating your component state.

## Why do we need this?
Manually updating the DOM in response to data changes is error-prone and inefficient. Angular's data binding system automates this synchronization, making your application more predictable and easier to develop.

## Real-world analogy
Think of data binding like the connection between a spreadsheet cell and a chart. When you update the cell value, the chart updates automatically without you having to redraw it. Similarly, when the user interacts with the chart (like dragging a point), the underlying cell value updates.

## Visual Explanation
![data binding overview](https://via.placeholder.com/600x300?text=Data+Binding+Overview)

## Mermaid Diagram
```mermaid
flowchart TB
    A[Component Data] -->|Property Binding| B[Element Property]
    A -->|Interpolation| C[Text Content]
    D[User Action] -->|Event Binding| E[Component Method]
    E -->|Updates Data| A
    subgraph Two-Way Binding
        A <->|ngModel| F[Form Element]
    end
```

## Deep Explanation
Angular provides four types of data binding, each serving a different purpose:

### 1. Interpolation (`{{ }}`)
- **Direction**: Component → Template
- **Purpose**: Display component data as text in the template
- **Use case**: Showing text content, concatenating strings, simple expressions

### 2. Property Binding (`[ ]`)
- **Direction**: Component → Template
- **Purpose**: Set element properties, directive properties, or component properties
- **Use case**: Setting `src`, `href`, `disabled`, CSS classes, inline styles

### 3. Event Binding `( )`
- **Direction**: Template → Component
- **Purpose**: Listen to and respond to user actions and DOM events
- **Use case**: Handling clicks, key presses, form submissions, mouse events

### 4. Two-Way Binding `[()]`
- **Direction**: Component ↔ Template
- **Purpose**: Synchronize data between component property and form element
- **Use case**: Form inputs where you need to both display and update values

## Code Example
Here's a component demonstrating all four binding types:

```typescript
// data-binding-demo.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding-demo',
  template: `
    <div class="demo">
      <!-- 1. Interpolation -->
      <h2>Welcome, {{ userName }}!</h2>
      
      <!-- 2. Property Binding -->
      <img [src]="imageUrl" [alt]="userName + "'s photo'">
      <button [disabled]="isLoading">Loading...</button>
      
      <!-- 3. Event Binding -->
      <button (click)="updateName()">Change Name</button>
      <input (keyup.enter)="saveName()" [placeholder]="placeholder">
      
      <!-- 4. Two-Way Binding -->
      <div>
        <label>Name: </label>
        <input [(ngModel)]="editName">
        <p>Edited name: {{ editName }}</p>
      </div>
    </div>
  `
})
export class DataBindingDemoComponent {
  userName = 'Alice';
  imageUrl = 'https://example.com/alice.jpg';
  isLoading = false;
  placeholder = 'Enter name...';
  editName = '';
  
  updateName(): void {
    this.userName = this.userName === 'Alice' ? 'Bob' : 'Alice';
  }
  
  saveName(): void {
    this.userName = this.editName;
    this.editName = '';
  }
}
```

## Best Practices
- Use interpolation for displaying text content
- Use property binding for setting element properties and attributes
- Use event binding to respond to user interactions
- Use two-way binding for form inputs where you need to read and write values
- Always import `FormsModule` when using `ngModel`
- Keep template expressions simple; move complex logic to component methods
- Unsubscribe from observables in `ngOnDestroy` to prevent memory leaks

## Common Mistakes
- Confusing when to use each binding type
- Forgetting that interpolation only produces strings
- Trying to set boolean attributes with interpolation instead of property binding
- Overlooking the need to import `FormsModule` for two-way binding
- Putting complex logic in template expressions (hard to test and debug)
- Using two-way binding when one-way binding would suffice

## Interview Questions
1. What are the four types of data binding in Angular?
2. What's the difference between property binding and interpolation?
3. How does event binding enable communication from template to component?
4. What is two-way binding actually happens when you use two-way binding syntax `[()]`?
5. When would you choose one binding type over another?
6. What module is required for two-way binding with `ngModel`?
7. How does data binding relate to Angular's change detection system?
8. What are the performance characteristics of each binding type?

## Summary
Angular's data binding system provides a declarative way to synchronize data between component and template. By mastering the four binding types—interpolation, property binding, event binding, and two-way binding—you can build dynamic, responsive applications with minimal boilerplate code. Understanding when to use each type is key to writing efficient, maintainable Angular applications.