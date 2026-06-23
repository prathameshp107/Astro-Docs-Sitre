---
title: "6. Directives"
description: "Angular has three types: 1. Structural Directives — Change the DOM structure (add/remove elements) 2. Attribute Directives — Change the appearance/behavior"
sidebar:
  order: 6
---

## 6. Directives

#### Simple Words First 🟡
A directive is an **instruction tag** you add to an HTML element to tell Angular "do something special with this element." Think of it as a **sticky note on furniture** in a house — the note says "move this to the left" or "paint this red" or "show this only on weekends."

Angular has three types:
1. **Structural Directives** — Change the DOM structure (add/remove elements)
2. **Attribute Directives** — Change the appearance/behavior of elements
3. **Components** — Are technically directives with templates

---

### 6.1 `*ngIf` — Conditional Rendering

```typescript
export class NgIfExampleComponent {
  isLoggedIn: boolean = false;
  userRole: string = 'admin';
  user: { name: string } | null = { name: 'Alice' };

  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
```

```html
<!-- Basic ngIf: Show element only if condition is true -->
<div *ngIf="isLoggedIn">
  Welcome back! You are logged in.
</div>

<!-- ngIf with else: Show alternative when false -->
<div *ngIf="isLoggedIn; else loginPrompt">
  <p>You're logged in!</p>
  <button (click)="toggleLogin()">Logout</button>
</div>

<!-- The else template is defined with #templateName -->
<ng-template #loginPrompt>
  <p>Please log in to continue.</p>
  <button (click)="toggleLogin()">Login</button>
</ng-template>

<!-- ngIf with then and else -->
<ng-container *ngIf="isLoggedIn; then loggedInView; else loggedOutView">
</ng-container>
<ng-template #loggedInView><p>Dashboard</p></ng-template>
<ng-template #loggedOutView><p>Login Page</p></ng-template>

<!-- Null checking with ngIf (safe navigation) -->
<div *ngIf="user">
  {{ user.name }}  <!-- Safe! user is guaranteed not null here -->
</div>

<!-- ⚠️ Common Mistake -->
<!-- ngIf REMOVES the element from DOM — it doesn't just hide it! -->
<!-- Use [hidden] to just hide (keep in DOM): -->
<div [hidden]="!isLoggedIn">This is HIDDEN but still in DOM</div>
<div *ngIf="isLoggedIn">This is REMOVED from DOM when false</div>
```

---

### 6.2 `*ngFor` — List Rendering

```typescript
export class NgForExampleComponent {
  users = [
    { id: 1, name: 'Alice', role: 'Admin', active: true },
    { id: 2, name: 'Bob', role: 'User', active: false },
    { id: 3, name: 'Carol', role: 'User', active: true },
    { id: 4, name: 'Dave', role: 'Moderator', active: true }
  ];

  colors: string[] = ['red', 'green', 'blue', 'yellow'];

  // ALWAYS provide this for performance (like 'key' in React)
  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
```

```html
<!-- Basic ngFor -->
<ul>
  <li *ngFor="let user of users">
    {{ user.name }} — {{ user.role }}
  </li>
</ul>

<!-- ngFor with INDEX -->
<ul>
  <li *ngFor="let user of users; let i = index">
    {{ i + 1 }}. {{ user.name }}
  </li>
</ul>

<!-- All available loop variables -->
<div *ngFor="let user of users;
             let i = index;
             let isFirst = first;
             let isLast = last;
             let isEven = even;
             let isOdd = odd">

  <div [class.highlight]="isEven">
    {{ i }}: {{ user.name }}
    <span *ngIf="isFirst">← FIRST</span>
    <span *ngIf="isLast">← LAST</span>
  </div>
</div>

<!-- trackBy: PERFORMANCE OPTIMIZATION (always use this!) -->
<!-- Without trackBy, Angular re-renders the entire list on ANY change -->
<!-- With trackBy, Angular only updates the items that actually changed -->
<li *ngFor="let user of users; trackBy: trackByUserId">
  {{ user.name }}
</li>

<!-- Nested ngFor -->
<div *ngFor="let dept of departments">
  <h3>{{ dept.name }}</h3>
  <ul>
    <li *ngFor="let emp of dept.employees">{{ emp.name }}</li>
  </ul>
</div>
```

---

### 6.3 `*ngSwitch` — Multiple Conditions

```typescript
export class NgSwitchExampleComponent {
  status: string = 'active';    // Try: 'pending', 'inactive', 'banned'
  dayOfWeek: number = 1;
}
```

```html
<!-- ngSwitch works like a JavaScript switch statement -->
<!-- [ngSwitch] goes on the container, *ngSwitchCase on each option -->

<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">
    ✅ Account is Active
  </p>
  <p *ngSwitchCase="'pending'">
    ⏳ Account is Pending Verification
  </p>
  <p *ngSwitchCase="'inactive'">
    😴 Account is Inactive
  </p>
  <p *ngSwitchCase="'banned'">
    🚫 Account has been Banned
  </p>
  <p *ngSwitchDefault>
    ❓ Unknown Status: {{ status }}
  </p>
</div>

<!-- ngSwitch with numbers -->
<div [ngSwitch]="dayOfWeek">
  <p *ngSwitchCase="1">Monday — Start of the week!</p>
  <p *ngSwitchCase="5">Friday — TGIF! 🎉</p>
  <p *ngSwitchCase="6">Saturday — Weekend!</p>
  <p *ngSwitchCase="0">Sunday — Rest day!</p>
  <p *ngSwitchDefault>{{ dayOfWeek }} — Regular weekday</p>
</div>
```

---

### 6.4 Attribute Directives: `ngClass` and `ngStyle`

```typescript
export class AttributeDirectivesComponent {
  isHighlighted: boolean = true;
  isError: boolean = false;
  isWarning: boolean = true;
  score: number = 75;

  textColor: string = 'blue';
  fontSize: number = 16;
}
```

```html
<!-- ── ngClass ── -->

<!-- Single class -->
<div [ngClass]="'active'">Always has 'active' class</div>

<!-- Conditional class -->
<div [ngClass]="{'highlighted': isHighlighted}">
  Text is highlighted if isHighlighted is true
</div>

<!-- Multiple conditional classes -->
<div [ngClass]="{
  'error': isError,
  'warning': isWarning,
  'highlight': isHighlighted
}">
  Multiple classes applied conditionally
</div>

<!-- Expression-based class -->
<div [ngClass]="score >= 90 ? 'grade-a' : score >= 70 ? 'grade-b' : 'grade-c'">
  Your grade
</div>

<!-- ── ngStyle ── -->

<!-- Single style -->
<p [ngStyle]="{'color': textColor}">Colored text</p>

<!-- Multiple styles -->
<p [ngStyle]="{
  'color': textColor,
  'font-size': fontSize + 'px',
  'font-weight': isHighlighted ? 'bold' : 'normal'
}">
  Styled text
</p>

<!-- ── Shorthand alternatives ── -->
<!-- [class.className]="condition" — cleanest for single class -->
<div [class.active]="isHighlighted">Active</div>
<div [class.error]="isError">Error</div>

<!-- [style.property]="value" — cleanest for single style -->
<p [style.color]="textColor">Colored</p>
<p [style.fontSize.px]="fontSize">Sized text</p>
```

---

### 6.5 Custom Directives

#### Simple Words First 🟡
Built-in directives cover common cases. But what if you want to **highlight text when you hover** over any element, or **auto-format phone numbers** as you type? You create a **Custom Directive** — your own reusable instruction tag!

```bash
# Generate with CLI
ng generate directive highlight
# Creates: src/app/highlight.directive.ts
```

```typescript
// highlight.directive.ts
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'  // Applied as an attribute: <p appHighlight>
})
export class HighlightDirective implements OnInit {

  // @Input: Accept configuration from the parent
  @Input() appHighlight: string = 'yellow';    // Highlight color
  @Input() defaultColor: string = 'transparent';

  constructor(private el: ElementRef) {
    // el.nativeElement gives us the actual DOM element
  }

  ngOnInit(): void {
    // Set default background when directive loads
    this.setBackground(this.defaultColor);
  }

  // @HostListener: Listen to events on the host element
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.setBackground(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setBackground(this.defaultColor);
  }

  private setBackground(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

```html
<!-- Using the custom directive -->

<!-- Basic usage: uses default yellow color -->
<p appHighlight>Hover over me to see yellow highlight!</p>

<!-- Passing a color value -->
<p [appHighlight]="'lightblue'" defaultColor="lightyellow">
  Hover for blue, default is light yellow
</p>

<!-- In a list -->
<li *ngFor="let item of items" [appHighlight]="'lightgreen'">
  {{ item }}
</li>
```

#### Another Custom Directive: Click Outside

```typescript
// click-outside.directive.ts
@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    // If click target is NOT inside this element → emit event
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  }
}
```

```html
<!-- Close dropdown when clicking outside -->
<div appClickOutside (clickOutside)="closeDropdown()">
  <div class="dropdown-menu" *ngIf="isOpen">
    <!-- dropdown content -->
  </div>
</div>
```

---
