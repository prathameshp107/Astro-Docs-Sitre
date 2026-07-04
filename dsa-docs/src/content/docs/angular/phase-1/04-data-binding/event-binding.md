---
title: "Event Binding"
description: "Learn how to respond to user actions and DOM events using parentheses syntax ( )."
sidebar:
  order: 3
---

## Introduction
Event binding allows you to listen for and respond to user actions like clicks, key presses, mouse movements, and form submissions. It's a one-way data binding from template to component.

## Why do we need this?
Applications need to respond to user interactions. Event binding connects DOM events to component methods, enabling interactive behavior like form validation, navigation, and dynamic updates.

## Real-world analogy
Think of event binding like wiring a doorbell. When someone presses the button (event), it triggers a chime (your component method). The wire (event binding) connects the physical action to the response.

## Visual Explanation
![event binding diagram](https://via.placeholder.com/400x200?text=Event+Binding+(event)=%E2%80%9Dhandler%22)

## Mermaid Diagram
```mermaid
flowchart LR
    A[User Clicks Button] --> B[(click)="handleClick()"]
    B --> C[Component Method: handleClick()]
    C --> D[Update State: count++]
    D --> E[View Updates: Display new count]
```

## Deep Explanation
Event binding uses parentheses `( )` to listen for DOM events and execute template statements when the event occurs.

### Syntax
```html
(event)="template-statement"
```
The target is the name of a DOM event (like `click`, `keydown`, `submit`), surrounded by parentheses.

### The $event Object
When handling DOM events, Angular provides the `$event` object containing information about the event:
- For mouse events: coordinates, button pressed, etc.
- For keyboard events: key pressed, modifier keys (Shift, Ctrl, etc.)
- For form events: input values, etc.

### Common Events
- **Mouse**: `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave`
- **Keyboard**: `keydown`, `keyup`, `keypress`
- **Form**: `submit`, `change`, `input`, `focus`, `blur`
- **Element**: `load`, `error`, `resize`, `scroll`

### Statement vs Expression
In event binding, you write a **statement** (like a method call) not an expression. You can:
- Call a method: `(click)="save()"`
- Call with parameters: `(click)="deleteItem(item.id)"`
- Use the $event object: `(keyup)="onKey($event)"`
- Assign values: `(input)="searchTerm = $event.target.value"`
- Use multiple statements: `(click)="doThis(); doThat()"`

## Code Example
```typescript
// search.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <div class="search-box">
      <input 
        type="text"
        [placeholder]="placeholder"
        (input)="onSearch($event.target.value)"
        (keyup.enter)="search()"
      >
      <button 
        [disabled]="!searchTerm"
        (click)="search()"
      >
        Search
      </button>
      
      <div *ngIf="results.length > 0" class="results">
        <h3>Results for "{{ searchTerm }}":</h3>
        <ul>
          <li *ngFor="let result of results">
            {{ result.title }}
          </li>
        </ul>
      </div>
      
      <div *ngIf="error" class="error">
        Error: {{ error }}
      </div>
    </div>
  `
})
export class SearchComponent {
  placeholder = 'Search...';
  searchTerm = '';
  results: any[] = [];
  error = '';
  
  onSearch(term: string): void {
    this.searchTerm = term;
  }
  
  search(): void {
    if (!this.searchToken.trim()) {
      this.error = 'Please enter a search term';
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      this.results = [
        { id: 1, title: `Result 1 for "${this.searchTerm}"` },
        { id: 2, title: `Result 2 for "${this.searchTerm}"` }
      ];
      this.error = '';
    }, 500);
  }
}
```

## Best Practices
- Use `$event` to access event data when needed
- Prefer specific events (like `keyup.enter`) over generic ones when possible
- Keep event handlers in the component class, not in the template
- For form inputs, consider using `ngModel` with two-way binding for simpler code
- Always validate and sanitize user input in event handlers
- Unsubscribe from observable event listeners in `ngOnDestroy` if using RxJS

## Common Mistakes
- Forgetting to pass `$event` when you need event data
- Using parentheses for property binding or square brackets for event binding
- Putting complex logic directly in event handlers (should be in component methods)
- Not handling event propagation properly (forgetting `$event.stopPropagation()` when needed)
- Confusing `(change)` and `(input)` events for form elements
- Trying to use two-way binding syntax `[()]` for events that don't support it

## Interview Questions
1. What's the difference between event binding and property binding?
2. How do you access the event object in Angular event binding?
3. What's the difference between `(click)` and `(dblclick)`?
4. How would you handle the Enter key in an input field?
5. What's the difference between `(input)` and `(change)` events?
6. How do you prevent default browser behavior in Angular event handlers?
7. Can you bind to custom events? How?

## Summary
Event binding `( )` enables components to respond to user actions and DOM events. By linking events to component methods, you create interactive applications that respond to clicks, keystrokes, form submissions, and more. Combined with property binding, it forms the foundation of Angular's unidirectional data flow, making your application's behavior predictable and easy to debug.