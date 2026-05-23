---
title: "6. Interview Questions & Answers"
description: "---"
sidebar:
  order: 6
---

## 6. Interview Questions & Answers

### Components & Lifecycle

---

**Q1. What are lifecycle hooks in Angular and why do we need them?**

**Answer:** Lifecycle hooks are methods that Angular calls at specific moments during a component's life — from creation to destruction. They let you run code at the right moment without guessing when the DOM is ready or when inputs are available.

Key hooks: `constructor` → `ngOnChanges` → `ngOnInit` → `ngDoCheck` → `ngAfterContentInit` → `ngAfterViewInit` → `ngOnDestroy`.

---

**Q2. What is the difference between `ngOnInit` and `constructor`?**

**Answer:**

| constructor | ngOnInit |
|---|---|
| TypeScript concept, not Angular-specific | Angular lifecycle hook |
| Runs first, before any inputs | Runs after @Input() values are set |
| Inject services here | Fetch data, initialize logic here |
| DOM not ready | Component initialized, template rendered |

Rule: Inject in constructor, work in ngOnInit.

---

**Q3. What is `ngOnChanges` and when is it called?**

**Answer:** `ngOnChanges` fires every time an `@Input()` property receives a new value from the parent. It receives a `SimpleChanges` object that contains the `previousValue`, `currentValue`, and a `firstChange` boolean for each changed property. It runs BEFORE `ngOnInit` on the first load.

---

**Q4. Why is `ngOnDestroy` important?**

**Answer:** It prevents memory leaks. When a component is destroyed, any active subscriptions, timers, or event listeners still hold references and keep running, consuming memory. In `ngOnDestroy`, you should call `.unsubscribe()` on Observables, `clearInterval()`/`clearTimeout()` on timers, and remove any manually added event listeners.

---

**Q5. What is `@ViewChild` and when can you safely access it?**

**Answer:** `@ViewChild` lets a parent component get a direct reference to a child component or DOM element. You can only safely access it inside `ngAfterViewInit` or later — Angular hasn't rendered the view in earlier hooks, so the reference is `undefined`.

```typescript
@ViewChild('myInput') inputRef!: ElementRef;

ngAfterViewInit() {
  this.inputRef.nativeElement.focus(); // Safe here
}
```

---

**Q6. What is the difference between `@ViewChild` and `@ContentChild`?**

**Answer:**
- `@ViewChild`: Accesses elements/components in the component's OWN template (`.html` file)
- `@ContentChild`: Accesses elements projected INTO the component via `<ng-content>`

Available in:
- `@ViewChild` → `ngAfterViewInit`
- `@ContentChild` → `ngAfterContentInit`

---

**Q7. How do parent and child components communicate?**

**Answer:** Four main ways:
1. **Parent → Child**: `@Input()` decorator (property binding)
2. **Child → Parent**: `@Output()` + `EventEmitter` (event binding)
3. **Parent → Child direct access**: `@ViewChild` (call methods on child)
4. **Any → Any**: Shared service with Observable/Signal

---

**Q8. What is `EventEmitter` and how does it work?**

**Answer:** `EventEmitter` is an Angular class (extends RxJS Subject) that lets a child component broadcast events to its parent. You declare it with `@Output()`, call `.emit(value)` to fire the event, and the parent listens with `(eventName)="handler($event)"` in the template.

---

**Q9. What is content projection and `<ng-content>`?**

**Answer:** Content projection allows a parent to inject HTML into a child component's template, similar to Vue's slots or React's `children` prop. Named slots use `select` attribute: `<ng-content select="[card-header]">`. The content comes from outside, so it belongs to the parent's context (parent's variables and styles).

---

**Q10. How do you create dynamic components in Angular?**

**Answer:** Using `createComponent()` (Angular 13+):
```typescript
const componentRef = createComponent(MyComponent, {
  environmentInjector: this.injector
});
this.appRef.attachView(componentRef.hostView);
document.body.appendChild(componentRef.hostView.rootNodes[0]);
```
This is used for modals, tooltips, notifications, and any UI that appears dynamically.

---

### Dependency Injection

---

**Q11. What problem does Dependency Injection solve?**

**Answer:** DI solves:
- **Tight coupling**: Classes don't create their own dependencies
- **Hard to test**: With DI, you can swap real services with mocks
- **Memory waste**: Singletons mean one instance for all consumers
- **Dependency hell**: You don't need to pass deeply nested dependencies manually

---

**Q12. What is the difference between `providedIn: 'root'` and providing in a component?**

**Answer:**
- `providedIn: 'root'`: One singleton instance for the whole app, tree-shakeable (removed from bundle if unused)
- `providers: [MyService]` in a component: A NEW instance is created for each instance of that component — not shared

---

**Q13. What is hierarchical injection?**

**Answer:** Angular has a tree of injectors that mirrors the component tree. When a component requests a service, Angular looks up the tree until it finds a provider. Child injectors can override parent services — a component with its own `providers: []` gets its own instance, not the parent's.

---

**Q14. What is `InjectionToken` and when do you use it?**

**Answer:** `InjectionToken` is used to inject non-class values (strings, objects, primitives) that can't be used as tokens directly. Example:

```typescript
export const API_URL = new InjectionToken<string>('api.url');
// Provider: { provide: API_URL, useValue: 'https://api.example.com' }
// Inject: constructor(@Inject(API_URL) private url: string)
```

---

**Q15. What are the different provider types?**

**Answer:**
- `useClass`: Provide an alternative class implementation
- `useValue`: Provide a literal value or object
- `useFactory`: Compute the value at runtime (can inject other services)
- `useExisting`: Alias one token to another

---

### Routing

---

**Q16. What is `RouterOutlet` and why is it needed?**

**Answer:** `<router-outlet>` is the placeholder in the template where Angular renders the component that matches the current URL. Without it, Angular wouldn't know WHERE to display the routed component. You can have multiple named outlets for advanced layouts.

---

**Q17. What is the difference between `routerLink` and `href` for navigation?**

**Answer:**
- `href`: Full browser navigation — reloads the entire page, loses all application state
- `routerLink`: Angular's client-side navigation — no page reload, preserves app state, faster, works with lazy loading and route guards

---

**Q18. How do you read URL parameters in Angular?**

**Answer:** Using `ActivatedRoute`:
```typescript
// Route params (/products/:id)
this.route.snapshot.paramMap.get('id');  // One-time
this.route.paramMap.subscribe(p => p.get('id'));  // Reactive

// Query params (/products?sort=price)
this.route.snapshot.queryParamMap.get('sort');
```

---

**Q19. What is lazy loading and why is it important?**

**Answer:** Lazy loading splits your app into separate JavaScript bundles, loading each bundle only when the user navigates to that route. Benefits: faster initial load, smaller initial bundle, better performance on slow connections. Implemented with `loadChildren` or `loadComponent` using dynamic `import()`.

---

**Q20. What are route guards and what types exist?**

**Answer:** Route guards are functions that control navigation:
- `CanActivate`: Can the user enter this route?
- `CanDeactivate`: Can the user leave this route? (unsaved changes)
- `CanMatch`: Should this route even be considered for matching?
- `Resolve`: Pre-fetch data before the component activates
- `CanActivateChild`: Protect all child routes

---

**Q21. What is the `Resolve` guard used for?**

**Answer:** Resolve pre-fetches data before the component is shown. Instead of showing a loading spinner inside the component, the router waits for the resolver to complete, then passes the data via `route.snapshot.data`. This ensures the component always renders with data available.

---

**Q22. How do you implement breadcrumbs with Angular Router?**

**Answer:** Add `data` to route definitions and read it in a breadcrumb component:

```typescript
// Route:
{ path: 'products', data: { breadcrumb: 'Products' }, ... }
{ path: ':id', data: { breadcrumb: 'Product Detail' }, ... }

// Component reads Router events and builds breadcrumb array from
// router.events, filter for NavigationEnd, then traverse ActivatedRoute tree
```

---

**Q23. What is `pathMatch: 'full'` used for?**

**Answer:** It's used on redirect routes to prevent matching too eagerly. `pathMatch: 'full'` means the entire URL must match, not just start with the path. Without it, `{ path: '', redirectTo: '/home' }` would match EVERY URL (since every URL starts with empty string).

---

**Q24. How does the Router handle `**` (wildcard) routes?**

**Answer:** `**` is the wildcard route that matches any URL not matched by earlier routes. It MUST be the LAST route in the array because Angular matches routes top-to-bottom, first-match wins. Typically used for 404 pages.

---

**Q25. What are auxiliary routes?**

**Answer:** Auxiliary (named) routes allow multiple independent router outlets in the same component:
```html
<router-outlet></router-outlet>          <!-- primary -->
<router-outlet name="sidebar"></router-outlet>  <!-- auxiliary -->
```
Navigate with: `router.navigate([{ outlets: { sidebar: ['help'] } }])`

---

### Angular Forms

---

**Q26. What is the difference between Template-Driven and Reactive Forms?**

**Answer:** Template-Driven forms are simpler — you use `ngModel` directives in the HTML, and Angular implicitly creates the form model. Reactive forms are explicit — you define the complete form structure in TypeScript using `FormGroup`/`FormControl`, giving more control, easier testing, and better support for dynamic forms.

---

**Q27. What is `FormBuilder` and why use it?**

**Answer:** `FormBuilder` is a helper service that reduces boilerplate when creating reactive forms. Instead of `new FormGroup({ name: new FormControl('', Validators.required) })`, you write `this.fb.group({ name: ['', Validators.required] })`. It's purely syntactic sugar but significantly cleaner.

---

**Q28. What is `FormControl` and what states can it have?**

**Answer:** `FormControl` tracks the value and validation state of an individual form field. States:
- **valid/invalid**: Does it pass all validators?
- **pristine/dirty**: Has the user typed in it?
- **touched/untouched**: Has the user visited (blurred) this field?
- **pending**: Async validator is still running

---

**Q29. How do you create custom validators in Angular?**

**Answer:**

```typescript
// Sync validator function
function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
  return /\s/.test(control.value) ? { hasSpaces: true } : null;
}

// Use: new FormControl('', [noSpacesValidator])

// Async validator (returns Observable)
function uniqueEmailValidator(service: UserService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.checkEmail(control.value).pipe(
      map(taken => taken ? { emailTaken: true } : null)
    );
  };
}
```

---

**Q30. What is a cross-field validator?**

**Answer:** A validator applied to a `FormGroup` that compares multiple fields, like confirming passwords match:

```typescript
this.fb.group({
  password: [''],
  confirm: ['']
}, { validators: passwordMatchValidator });

function passwordMatchValidator(group: AbstractControl) {
  const p = group.get('password')?.value;
  const c = group.get('confirm')?.value;
  return p === c ? null : { mismatch: true };
}
```

---

**Q31. What is `FormArray` and when do you use it?**

**Answer:** `FormArray` manages a dynamic list of `FormControl` or `FormGroup` objects. Use it when the user can add/remove rows, like a list of phone numbers, work experiences, or skills. You add with `.push()`, remove with `.removeAt(index)`, and access controls via `.controls` array.

---

**Q32. What does `markAllAsTouched()` do and why is it used on submit?**

**Answer:** It marks every control as "touched," which triggers the display of all validation errors at once. By default, errors only show when a user has visited (touched) a field. On form submit, if you want to show ALL errors immediately, call `this.form.markAllAsTouched()` before returning.

---

**Q33. How do you disable a form field in reactive forms?**

**Answer:**
```typescript
// In form definition:
this.fb.control({ value: 'readonly-value', disabled: true })

// Programmatically:
this.form.get('email')?.disable();
this.form.get('email')?.enable();
```
⚠️ Note: Disabled controls are NOT included in `form.value` — use `form.getRawValue()` to include them.

---

**Q34. What is the difference between `setValue` and `patchValue`?**

**Answer:**
- `setValue`: Must provide a value for EVERY control in the form — throws error if you miss one
- `patchValue`: Only updates the fields you provide — ignores missing fields

Use `patchValue` when editing (you may not have all fields), `setValue` when you have the complete object.

---

**Q35. How do async validators impact UX and how do you handle the delay?**

**Answer:** Async validators call APIs which take time. During this time, the control is in `pending` state. To improve UX:
1. Use `debounceTime` to avoid calling the API on every keystroke
2. Show a spinner when `control.pending === true`
3. Use `distinctUntilChanged()` to avoid redundant API calls
4. Cache results where possible

---

### Advanced & Architecture

---

**Q36. What are Angular Signals and how do they compare to RxJS?**

**Answer:** Signals (Angular 16+) are a simpler reactive primitive:
- **Signals**: Synchronous, simpler, no unsubscribe needed, great for local UI state
- **RxJS Observables**: Async, powerful operators, great for HTTP/streams/complex async flows

Signals use `signal()`, `computed()`, and `effect()`. They integrate with Angular's change detection and can automatically update the view without `async` pipe or `.subscribe()`.

---

**Q37. What is Change Detection and what strategies exist?**

**Answer:** Change detection is how Angular knows when to update the DOM. Two strategies:
- **Default**: Angular checks the entire component tree after every event — simpler but can be slow for large apps
- **OnPush**: Angular only checks a component when its `@Input()` reference changes, an event fires within it, or you manually call `markForCheck()`. Much more performant but requires immutable data patterns.

---

**Q38. What is the Angular Router's `NavigationExtras` object?**

**Answer:** It's an optional configuration passed to `router.navigate()`:
```typescript
this.router.navigate(['/products'], {
  queryParams: { page: 1, sort: 'price' },
  queryParamsHandling: 'merge',  // or 'preserve'
  fragment: 'reviews',
  replaceUrl: true,              // Don't add to browser history
  state: { fromCart: true }      // Pass transient state
});
```

---

**Q39. How do you share data between unrelated (sibling) components?**

**Answer:** Three approaches:
1. **Service with Subject/BehaviorSubject**: Both components inject the service; service holds the state; components subscribe/update
2. **Angular Signals**: Signal in a service, components read it
3. **NgRx/Akita/NGXS**: State management libraries for complex apps — unidirectional data flow with actions and reducers

---

**Q40. What is the difference between `Subject`, `BehaviorSubject`, and `ReplaySubject`?**

**Answer:**

| Type | Initial Value | Late Subscribers | Use Case |
|---|---|---|---|
| `Subject` | None | Miss past emissions | Events, one-way triggers |
| `BehaviorSubject` | Required | Get latest value | Current state (user, theme) |
| `ReplaySubject(n)` | None | Get last n values | Cache recent history |
| `AsyncSubject` | None | Get last value on complete | Load-once operations |

In Angular services, `BehaviorSubject` is most common for shared state because new subscribers immediately get the current value (e.g., current user, current theme).

---

### Bonus: Quick-Fire Architecture Questions

---

**Q. What is the difference between `declarations`, `imports`, and `providers` in `@NgModule`?**

**Answer:**
- `declarations`: Components, directives, pipes that BELONG to this module
- `imports`: Other modules whose exports you want to use
- `providers`: Services to register in this module's injector
- `exports`: Declarations you want to share with other modules that import this one

---

**Q. What is `trackBy` in `*ngFor` and why does it matter?**

**Answer:** Without `trackBy`, Angular re-creates ALL DOM elements when the array changes. With `trackBy`, you provide a function that returns a unique identifier (like `id`), and Angular only re-renders the items that actually changed. Critical for performance with large lists.

---

**Q. When would you use `ChangeDetectorRef.markForCheck()` vs `detectChanges()`?**

**Answer:**
- `markForCheck()`: Marks the component and its ancestors for checking in the next CD cycle — used with `OnPush` strategy when state changes asynchronously
- `detectChanges()`: Runs change detection synchronously RIGHT NOW on this component and its children — used after manually updating state outside Angular's zone

---

**Q. What is `NgZone` and `zone.js`?**

**Answer:** Zone.js monkey-patches browser async APIs (setTimeout, Promise, XMLHttpRequest, etc.) to intercept them. When any async operation completes, Zone.js notifies Angular to run change detection. `NgZone.runOutsideAngular()` lets you run code without triggering CD (useful for performance-intensive operations like canvas animations).

---

### Summary Cheat Sheet

```
Components:
  constructor()         → Inject services
  ngOnChanges()         → React to @Input changes
  ngOnInit()            → Fetch data (runs once)
  ngAfterViewInit()     → Use @ViewChild
  ngOnDestroy()         → Unsubscribe everything

Communication:
  @Input()              → Parent to Child
  @Output() + Emit      → Child to Parent
  @ViewChild            → Parent accesses child directly
  Service               → Any to Any

Routing:
  Routes array          → URL → Component mapping
  router-outlet         → Where component renders
  routerLink            → Navigate without reload
  ActivatedRoute        → Read URL params
  Guards                → Control navigation access
  Resolve               → Pre-fetch data

Forms:
  Template-Driven       → Simple, ngModel
  Reactive              → Complex, FormBuilder
  FormGroup             → Container of controls
  FormControl           → Single field + validation
  FormArray             → Dynamic list of controls
  Validators            → Sync + Async validation
```

---

*End of Angular Phase 2: Components, Routing & Forms*

*Next: Phase 3 — RxJS, State Management, Performance Optimization, Testing*
