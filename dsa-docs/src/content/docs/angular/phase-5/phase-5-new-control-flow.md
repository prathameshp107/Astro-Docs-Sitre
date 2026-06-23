---
title: "2. New Control Flow (@if, @for, @switch)"
description: "@if, @for (with track), @switch, @empty — migration from *ngIf, *ngFor, *ngSwitch."
sidebar:
  order: 2
---

## 2. New Control Flow (`@if`, `@for`, `@switch`)

### Simple Words First 🟡
In older Angular, you used `*ngIf`, `*ngFor`, and `*ngSwitch` — these are **structural directives** (they start with `*` and change the DOM). Angular 17 introduced a **new syntax** using `@` symbols that looks cleaner, works faster, and feels more like writing regular JavaScript.

Think of `@if` / `@for` as **Angular's built-in if-else and for-each** — just like in TypeScript, but inside your HTML template.

---

### `@if` — Replaces `*ngIf`

```typescript
@Component({
  selector: 'app-conditional',
  template: `
    <!-- 🆕 NEW: @if syntax (Angular 17+) -->
    @if (isLoggedIn) {
      <p>Welcome back, {{ username }}!</p>
    } @else {
      <p>Please log in.</p>
    }

    <!-- ⬅️ OLD: *ngIf syntax -->
    <p *ngIf="isLoggedIn; else loginMessage">Welcome back!</p>
    <ng-template #loginMessage><p>Please log in.</p></ng-template>
  `
})
export class ConditionalComponent {
  isLoggedIn = false;
  username = 'Alice';
}
```

**Multiple conditions:**

```typescript
@if (role === 'admin') {
  <app-admin-panel />
} @else if (role === 'editor') {
  <app-editor-panel />
} @else {
  <app-user-panel />
}
```

---

### `@for` — Replaces `*ngFor`

```typescript
@Component({
  selector: 'app-product-list',
  template: `
    <!-- 🆕 NEW: @for with track -->
    <div class="product-grid">
      @for (product of products; track product.id) {
        <div class="product-card">
          <h3>{{ product.name }}</h3>
          <p>${{ product.price }}</p>
        </div>
      } @empty {
        <p>No products found. 😕</p>
      }
    </div>

    <!-- ⬅️ OLD: *ngFor -->
    <div *ngFor="let product of products; trackBy: trackById">...</div>
  `
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
  ];
}
```

**The `track` keyword is REQUIRED** — it tells Angular how to identify each item (like `trackBy` in `*ngFor`).

**Local variables inside `@for`:**

```typescript
@for (item of items; track item.id; let i = $index, first = $first, last = $last) {
  <div [class.highlight]="first">
    {{ i + 1 }}. {{ item.name }}
    @if (last) { <span>← Last item</span> }
  </div>
}
```

Available variables: `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`

---

### `@switch` — Replaces `*ngSwitch`

```typescript
@Component({
  selector: 'app-status-display',
  template: `
    <!-- 🆕 NEW: @switch -->
    @switch (status) {
      @case ('loading') {
        <app-spinner />
      }
      @case ('success') {
        <app-success-message />
      }
      @case ('error') {
        <app-error-message />
      }
      @default {
        <p>Unknown status</p>
      }
    }

    <!-- ⬅️ OLD: *ngSwitch -->
    <div [ngSwitch]="status">
      <app-spinner *ngSwitchCase="'loading'" />
      <app-success-message *ngSwitchCase="'success'" />
      <app-error-message *ngSwitchCase="'error'" />
      <p *ngSwitchDefault>Unknown</p>
    </div>
  `
})
export class StatusDisplayComponent {
  status: 'loading' | 'success' | 'error' = 'loading';
}
```

---

### Migration Guide

| Old Syntax | New Syntax |
|---|---|
| `*ngIf="condition"` | `@if (condition) { ... }` |
| `*ngIf="cond; else ref"` | `@if (cond) { ... } @else { ... }` |
| `*ngFor="let item of list"` | `@for (item of list; track item.id) { ... }` |
| `*ngFor="let item of list; trackBy: fn"` | `@for (item of list; track item.id) { ... }` |
| `[ngSwitch]="val"` + `*ngSwitchCase` | `@switch (val) { @case ('x') { ... } }` |

---

### Why the New Syntax?

| Feature | Old (`*ngIf`, `*ngFor`) | New (`@if`, `@for`) |
|---|---|---|
| Performance | Creates wrapper `<ng-template>` | No wrapper — faster rendering |
| Type checking | Limited | Better type inference in `@for` |
| `@empty` block | Not available | Built-in |
| Readability | Needs `<ng-template>` for else | `@else` is part of the syntax |
| Bundle size | Larger (structural directive code) | Smaller |

---

### In Simple Words 🧠

- **`@if`** works like `if/else if/else` in JavaScript — no more `*ngIf` and `<ng-template>`
- **`@for`** needs `track` to identify each item (REQUIRED!) — use `product.id` or `$index`
- **`@empty`** shows content when the list is empty — no more manual `*ngIf="items.length === 0"`
- **`@switch`** is cleaner than `[ngSwitch]` + multiple `*ngSwitchCase`
- The new syntax is **faster, smaller, and easier to read** — migrate when you can!
