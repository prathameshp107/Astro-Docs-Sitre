---
title: "6. Modern Angular Interview Questions"
description: "Q&A for Signals, @defer, new control flow, standalone components, SSR, and hydration."
sidebar:
  order: 6
---

## 6. Modern Angular Interview Questions

### Signals

**Q1: What is a Signal and how is it different from a regular variable?**

A Signal is a reactive wrapper around a value. When the value changes, Angular automatically knows about it and updates the UI. A regular variable wouldn't trigger any UI updates.

```typescript
const count = signal(0);
count.set(5); // Angular knows to re-render anything that reads count()
```

**Q2: What is the difference between `signal()`, `computed()`, and `effect()`?**

- `signal()` — holds a value and notifies Angular when it changes
- `computed()` — derives a value from other signals, auto-recalculates
- `effect()` — runs side effects (like console.log) when signal dependencies change

**Q3: When would you use Signals vs RxJS?**

Signals for component state (form inputs, toggles, counters). RxJS for async operations (HTTP requests, WebSocket streams, debounced input). They can work together via `toSignal()` and `toObservable()`.

### New Control Flow

**Q4: What is the `track` keyword in `@for`? Why is it required?**

`track` tells Angular how to identify each item uniquely. It's required for performance — Angular uses it to know which items were added, removed, or moved. Use `track product.id` (unique ID) or `track $index` (position-based, if items don't have IDs).

**Q5: What does `@empty` do in `@for`?**

`@empty` shows content when the list is empty — it replaces the need for `*ngIf="items.length === 0"`.

### Standalone Components

**Q6: What is a standalone component?**

A component with `standalone: true` that doesn't need to be declared in an NgModule. It imports its dependencies directly.

**Q7: How do you bootstrap a standalone app?**

Use `bootstrapApplication(AppComponent, { providers: [...] })` instead of `platformBrowserDynamic().bootstrapModule(AppModule)`.

**Q8: What are `provide*` functions?**

Functions like `provideRouter()`, `provideHttpClient()`, `provideAnimations()` that set up providers without needing NgModules.

### Deferrable Views

**Q9: What does `@defer` do?**

Lazily loads a component — it's not downloaded or rendered until a trigger condition is met. Makes initial load faster.

**Q10: Name four `@defer` triggers and when to use each.**

| Trigger | When to use |
|---|---|
| `on idle` | Non-critical content (default) |
| `on viewport` | Content below the fold |
| `on interaction` | Modals, accordions, tabs |
| `on timer(ms)` | Delayed loading |

### SSR & Hydration

**Q11: What is SSR and how does it help?**

Server-Side Rendering renders the Angular app on the server into HTML. The browser gets ready-to-show HTML — faster first paint, better SEO.

**Q12: What is hydration?**

Hydration takes the pre-rendered HTML from SSR and attaches Angular's event listeners and interactivity without re-rendering the DOM.

**Q13: What browsers APIs don't work in SSR?**

`window`, `document`, `localStorage`, `navigator` — they don't exist on the server. Use `isPlatformBrowser()` to check or inject the `DOCUMENT` token.
