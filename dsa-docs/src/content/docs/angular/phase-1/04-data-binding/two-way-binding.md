---
title: "Two-Way Binding"
description: "Learn how to synchronize data between component and template using the banana-in-a-box syntax [()]."
sidebar:
  order: 4
---

## Introduction
Two-way binding combines property and event binding to create a synchronization loop between component properties and template elements. Changes in either direction automatically update the other.

## Why do we need this?
Two-way binding simplifies common patterns like form inputs where you want to display the current value and update it when the user types. Without it, you'd need both property binding (to display) and event binding (to update) separately.

## Real-world analogy
Think of two-way binding like a two-way radio. When you speak into it, your voice transmits to the other person. When they speak, you hear them immediately. Both ends stay in sync without manual intervention.

## Visual Explanation
![two-way binding diagram](https://via.placeholder.com/400x200?text=Two-Way+Binding+[()]+=%E2%80%9Dsynchronized%22)

## Mermaid Diagram
```mermaid
flowchart LR
    A[Component Property: name] -->|Update Value| B[(name)] 
    B --> C[<input [(ngModel)]="name">]
    C -->|Input Event| D[Update Component Property]
    D --> A
    subgraph Bidirectional Sync
        direction TB
        A <->|ngModel| C
    end
```

## Deep Explanation
Two-way binding is syntactic sugar for combining property binding and event binding. The `[(ngModel)]` directive (known as "banana in a box") automatically:
1. Sets the element's value property from the component property (property binding)
2. Listens for input events and updates the component property (event binding)

### How It Works Under the Hood
```html
<!-- This: -->
<input [(ngModel)]="userName">

<!-- Is shorthand for: -->
<input [ngModel]="userName" (ngModelChange)="userName = $event">
```

### Requirements
To use `ngModel`, you need to import `FormsModule` in your module:
```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule]
})
export class AppModule { }
```

### Beyond ngModel
While `ngModel` is the most common two-way binding directive, you can create custom two-way bindings for your own components by following the pattern:
- Input property: `@Input() value: any;`
- Output property: `@Output() valueChange = new EventEmitter<any>();`
Then use: `[(value)]="property"`

## Code Example
```typescript
// user-profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: `
    <div class="profile">
      <h2>User Profile</h2>
      
      <div class="field">
        <label>Name:</label>
        <input 
          type="text"
          [(ngModel)]="user.name"
          placeholder="Enter name"
        >
      </div>
      
      <div class="field">
        <label>Email:</label>
        <input 
          type="email"
          [(ngModel)]="user.email"
          placeholder="Enter email"
        >
      </div>
      
      <div class="field">
        <label>Age:</label>
        <input 
          type="number"
          [(ngModel)]="user.age"
          min="0"
          max="120"
        >
      </div>
      
      <div class="preview">
        <h3>Preview:</h3>
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Age: {{ user.age }}</p>
      </div>
    </div>
  `
})
export class UserProfileComponent {
  user = {
    name: '',
    email: '',
    age: 0
  };
  
  // You could also use getters/setters for validation
  // get name(): string { return this._name; }
  // set name(value: string) { 
  //   this._name = value.trim();
  // }
}
```

## Advanced: Custom Two-Way Binding
```typescript
// color-picker.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  template: `
    <div>
      <label>Color: </label>
      <input 
        type="color"
        [value]="color"
        (input)="colorChange.emit($event.target.value)"
      >
      <div class="preview" [style.background-color]="color"></div>
    </div>
  `
})
export class ColorPickerComponent {
  @Input() color: string = '#ffffff';
  @Output() colorChange = new EventEmitter<string>();
}

// Usage in parent:
// <app-color-picker [(color)]="selectedColor"></app-color-picker>
```

## Best Practices
- Use two-way binding for form controls where you need to both display and update values
- Remember to import `FormsModule` for `ngModel` to work
- For custom two-way bindings, follow the `@Input()`/`@Output()Change` pattern
- Consider using reactive forms for complex validation scenarios
- Be aware that two-way binding can sometimes make data flow harder to trace
- Use one-way binding when data only flows in one direction for better performance

## Common Mistakes
- Forgetting to import `FormsModule` when using `ngModel`
- Trying to use two-way binding on elements that don't support it (like `<div>`)
- Misunderstanding that `[(ngModel)]` requires both input and output properties
- Overusing two-way binding when one-way binding would suffice (performance)
- Not realizing that two-way binding creates two watchers (can affect performance in large lists)
- Confusing the naming convention for custom two-way bindings (must be `[input]Change`)

## Interview Questions
1. What is two-way binding in Angular and what is its syntax?
2. How does `[(ngModel)]` work under the hood?
3. What module do you need to import to use `ngModel`?
4. How would you create a custom two-way binding directive?
5. When would you choose two-way binding over separate property and event binding?
6. What are the performance implications of two-way binding?
7. How does two-way binding differ in template-driven vs reactive forms?

## Summary
Two-way binding (`[()]`) creates a synchronized connection between component properties and template elements, eliminating the need to write separate property and event bindings for interactive controls. While most commonly used with `ngModel` for form inputs, the pattern can be applied to any component by implementing matching input and output properties. It's a powerful productivity tool that should be used judiciously to maintain clear data flow in your application.