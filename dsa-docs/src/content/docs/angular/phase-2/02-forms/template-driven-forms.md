---
title: "Template-Driven Forms"
description: "Build forms using ngModel and template directives."
sidebar:
  order: 2
---

## Introduction
Template-driven forms rely on directives like ngModel in the HTML template. Angular implicitly creates the form model.

## Example

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
      <input name="email" [(ngModel)]="user.email" required email #emailField="ngModel">
      <div *ngIf="emailField.invalid && emailField.touched">
        <span *ngIf="emailField.errors?.['required']">Required</span>
      </div>
      <button type="submit" [disabled]="loginForm.invalid">Submit</button>
    </form>
  `
})
export class LoginComponent {
  user = { email: '', password: '' };
  onSubmit(form: NgForm) { /* ... */ }
}
```

## Summary
Template-driven forms are great for simple forms with basic validation needs."
