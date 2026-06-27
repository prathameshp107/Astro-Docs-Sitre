---
title: "Angular Interview Questions (2025)"
description: "100+ Angular interview questions from easy to hard — components, signals, RxJS, routing, change detection, lazy loading. Answers hidden, click to reveal."
sidebar:
  order: 99
  label: "Interview Questions (100+)"
seoType: faq
faqItems:
  - q: "What is Angular?"
    a: "Angular is an open-source, TypeScript-based front-end web application framework maintained by Google. It is used to build single-page applications (SPAs) with a component-based architecture, built-in routing, HTTP client, reactive forms, and dependency injection."
  - q: "What is the difference between AngularJS and Angular?"
    a: "AngularJS (1.x) is written in JavaScript and uses MVC with $scope. Angular (2+) is a complete TypeScript rewrite with a component-based architecture, Ivy renderer, Angular CLI, and much better performance. They are not backward compatible."
  - q: "What is a Component in Angular?"
    a: "A Component is the basic building block of an Angular application. It controls a piece of UI and consists of a TypeScript class (logic), an HTML template (view), and CSS styles. It is decorated with @Component({ selector, templateUrl, styleUrls })."
  - q: "What are the four types of data binding in Angular?"
    a: "1. Interpolation {{ }} — component to template as string. 2. Property binding [prop] — component to template for any type. 3. Event binding (event) — template to component. 4. Two-way binding [(ngModel)] — both directions simultaneously."
  - q: "What is dependency injection in Angular?"
    a: "Dependency Injection (DI) is a design pattern where a class receives its dependencies from an external injector rather than creating them itself. In Angular, you declare dependencies in the constructor and Angular's injector provides them automatically."
  - q: "What is the difference between ngOnInit and the constructor?"
    a: "The constructor runs before @Input() values are set and should only declare dependencies. ngOnInit runs once after all @Input() properties are initialized, making it the right place for data fetching and initialization logic."
  - q: "What is lazy loading in Angular routing?"
    a: "Lazy loading loads feature modules or components only when the user navigates to their route, reducing the initial bundle size. It uses loadChildren or loadComponent with dynamic import() in the route definition."
  - q: "What is ChangeDetectionStrategy.OnPush?"
    a: "OnPush tells Angular to only check a component when an @Input() reference changes, an event originates from it, or an Observable via async pipe emits. It significantly improves performance in large apps by reducing unnecessary change detection cycles."
  - q: "What are Angular Signals?"
    a: "Signals are a reactive primitive introduced in Angular 16 that provide a synchronous, push-based reactivity system. A signal wraps a value and notifies consumers when it changes. They use signal(), computed(), and effect() and enable zoneless change detection."
  - q: "What is the async pipe in Angular?"
    a: "The async pipe automatically subscribes to an Observable or Promise and returns its latest value. It also automatically unsubscribes when the component is destroyed, preventing memory leaks. It is the preferred pattern over manual subscriptions in templates."
---

> **How to use:** Click any question to expand the answer. Questions are ordered from Easy → Medium → Hard.

---

## Easy (Q1–Q30)

<details class="qa-card qa-easy">
<summary>Q1. What is Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

Angular is an open-source, TypeScript-based front-end web application framework maintained by Google. It is used to build single-page applications (SPAs) that are fast, scalable, and maintainable.

Angular provides a complete solution out of the box: component-based architecture, routing (`@angular/router`), HTTP client (`@angular/common/http`), reactive forms, dependency injection, and a powerful CLI.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q2. What is the difference between AngularJS and Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

| | AngularJS (1.x) | Angular (2+) |
|---|---|---|
| Language | JavaScript | TypeScript |
| Architecture | MVC with `$scope` | Component-based |
| Data binding | Two-way via `$scope` | One-way by default, two-way with `[()]` |
| Mobile | Poor | Good |
| Performance | Slower | Much faster (Ivy renderer) |
| CLI | None | `@angular/cli` |

They are **not backward compatible** — completely different frameworks.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q3. What is a Component in Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

A Component is the **basic building block** of an Angular application. It controls a specific piece of the UI.

Every component has three parts:
1. **TypeScript class** — logic and data
2. **HTML template** — the view
3. **CSS styles** — look and feel

Decorated with `@Component({ selector, templateUrl, styleUrls })`.

```ts
@Component({
  selector: 'app-hello',
  template: `<h1>Hello {{ name }}</h1>`,
})
export class HelloComponent {
  name = 'Angular';
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q4. What is a Module in Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

A Module (`@NgModule`) is a container that groups related components, directives, pipes, and services. Every Angular app has at least one module — `AppModule`.

`@NgModule` takes:
- `declarations` — components/directives/pipes owned by this module
- `imports` — other modules to use
- `providers` — services to register
- `exports` — what other modules can use
- `bootstrap` — root component (AppModule only)

In modern Angular (v14+), standalone components reduce the need for NgModules.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q5. What are the four types of data binding in Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

1. **Interpolation** `{{ expression }}` — Component → Template (renders as string)
2. **Property Binding** `[property]="value"` — Component → Template (binds any type)
3. **Event Binding** `(event)="handler()"` — Template → Component (user events)
4. **Two-Way Binding** `[(ngModel)]="prop"` — Both directions simultaneously

```html
<p>{{ title }}</p>               <!-- Interpolation -->
<img [src]="imageUrl" />        <!-- Property binding -->
<button (click)="save()">Save</button>  <!-- Event binding -->
<input [(ngModel)]="name" />    <!-- Two-way binding -->
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q6. What is `*ngIf` and how does it work? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`*ngIf` is a structural directive that **conditionally adds or removes** an element from the DOM.

Unlike `display: none`, `*ngIf` completely **destroys** the element when false, freeing memory. When truthy again, the element is recreated from scratch.

```html
<div *ngIf="isLoggedIn; else loginTpl">Welcome!</div>
<ng-template #loginTpl><a routerLink="/login">Login</a></ng-template>
```

Use `display: none` when you need to preserve state (like form inputs); use `*ngIf` when the branch is truly not needed.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q7. What is `*ngFor` and what is `trackBy`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`*ngFor` repeats a template for each item in a collection.

Available local variables: `index`, `first`, `last`, `even`, `odd`.

**`trackBy`** is a performance optimization — it gives Angular a unique key per item so Angular only re-renders items that actually changed, instead of re-rendering the whole list.

```html
<li *ngFor="let user of users; trackBy: trackById">{{ user.name }}</li>
```

```ts
trackById(index: number, user: User) { return user.id; }
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q8. What are the three types of Directives? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

1. **Component Directives** — Components are directives with a template (`@Component`)
2. **Structural Directives** — Change DOM structure by adding/removing elements. Prefixed with `*`: `*ngIf`, `*ngFor`, `*ngSwitch`
3. **Attribute Directives** — Change appearance/behavior of an existing element without altering DOM structure: `ngClass`, `ngStyle`, `ngModel`

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q9. What is a Pipe in Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

A Pipe transforms data for display in templates using the `|` character.

```html
{{ price | currency:'INR' }}
{{ today | date:'dd/MM/yyyy' }}
{{ name | uppercase }}
```

**Built-in pipes:** `date`, `uppercase`, `lowercase`, `currency`, `number`, `percent`, `json`, `slice`, `async`, `keyvalue`.

Custom pipes implement `PipeTransform`:
```ts
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 30): string {
    return value.length > limit ? value.slice(0, limit) + '…' : value;
  }
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q10. What is a Service in Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

A Service is a class decorated with `@Injectable()` that holds **shared logic or data** — API calls, business logic, state management.

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers() { return this.http.get<User[]>('/api/users'); }
}
```

`providedIn: 'root'` registers it as a singleton available app-wide without adding it to any module's `providers`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q11. What is Dependency Injection (DI) in Angular? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

Dependency Injection is a design pattern where a class receives its dependencies from an external source rather than creating them itself. Angular's DI system:

1. You declare what you need in the constructor: `constructor(private svc: UserService)`
2. Angular's injector creates/provides the dependency for you

Benefits: loose coupling, easier testing (can inject mocks), reusability.

```ts
export class ProfileComponent {
  constructor(private userSvc: UserService) {}  // DI provides UserService
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q12. What is Angular CLI? Name common commands. <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

Angular CLI is a command-line tool for scaffolding, building, and managing Angular projects.

Common commands:
```bash
ng new my-app            # create new project
ng serve                 # dev server (localhost:4200)
ng generate component foo  # create component
ng generate service bar    # create service
ng build --prod          # production build
ng test                  # run unit tests
ng lint                  # lint code
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q13. What is `@Input()` and `@Output()`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

**`@Input()`** — Allows parent to pass data **into** a child component:
```ts
// child
@Input() title: string = '';
```
```html
<!-- parent -->
<app-card [title]="'Hello'"></app-card>
```

**`@Output()`** — Allows child to emit events **up** to parent using `EventEmitter`:
```ts
// child
@Output() saved = new EventEmitter<string>();
onSave() { this.saved.emit('data'); }
```
```html
<!-- parent -->
<app-form (saved)="onSaved($event)"></app-form>
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q14. What is `ngOnInit`? Why use it instead of the constructor? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`ngOnInit` is a lifecycle hook called **once** after the component's input properties are set for the first time.

Use `ngOnInit` for initialization logic (fetching data, setting up subscriptions) because:
- **Constructor** runs before `@Input()` values are available
- Constructor should only do DI (declare dependencies)
- `ngOnInit` is where the component is ready to use

```ts
ngOnInit() {
  this.userSvc.getUsers().subscribe(users => this.users = users);
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q15. What is the Angular component lifecycle order? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

Order of lifecycle hooks:

1. `constructor`
2. `ngOnChanges` (called before init and on every @Input change)
3. `ngOnInit` (once, after first ngOnChanges)
4. `ngDoCheck` (every change detection cycle)
5. `ngAfterContentInit` (once, after content projection)
6. `ngAfterContentChecked`
7. `ngAfterViewInit` (once, after view + children init)
8. `ngAfterViewChecked`
9. `ngOnDestroy` (just before component destroyed)

Most commonly used: `ngOnInit`, `ngOnChanges`, `ngOnDestroy`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q16. What is `ngOnDestroy` used for? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`ngOnDestroy` runs just before Angular destroys the component. Use it to clean up resources to prevent memory leaks:

```ts
private sub = new Subscription();

ngOnInit() {
  this.sub = this.svc.data$.subscribe(d => this.data = d);
}

ngOnDestroy() {
  this.sub.unsubscribe();  // prevent memory leak
}
```

Other cleanup: clear intervals/timeouts, detach event listeners, complete subjects.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q17. What is `ViewChild` and `ContentChild`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

**`@ViewChild`** — access a child component/element in the **component's own template**:
```ts
@ViewChild('myInput') inputRef!: ElementRef;
ngAfterViewInit() { this.inputRef.nativeElement.focus(); }
```

**`@ContentChild`** — access a child projected via `<ng-content>` from the parent:
```ts
@ContentChild(SomeComponent) projected!: SomeComponent;
```

Key rule: `@ViewChild` is available in `ngAfterViewInit`; `@ContentChild` in `ngAfterContentInit`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q18. What is RouterLink and how does it differ from `href`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`routerLink` is Angular's directive for navigation that keeps it a **single-page app** — no full page reload:

```html
<a routerLink="/about">About</a>
<a [routerLink]="['/user', userId]">Profile</a>
```

Using `href="/about"` causes a **full page reload**, losing all app state. `routerLink` uses the HTML5 History API to change the URL and let Angular's router handle rendering.

`routerLinkActive="active"` adds a CSS class when the route matches.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q19. What is `ngModel` and which module provides it? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`ngModel` implements **two-way data binding** on form controls. It requires `FormsModule` (or `ReactiveFormsModule`).

```html
<input [(ngModel)]="username" />
<p>Hello, {{ username }}</p>
```

`[(ngModel)]` is syntactic sugar for `[ngModel]="username" (ngModelChange)="username = $event"`.

In standalone components, import `FormsModule` directly in the component's `imports` array.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q20. What is `ngClass` and `ngStyle`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

**`ngClass`** — dynamically add/remove CSS classes:
```html
<div [ngClass]="{ active: isActive, error: hasError }"></div>
<div [ngClass]="['btn', isPrimary ? 'btn-primary' : 'btn-secondary']"></div>
```

**`ngStyle`** — dynamically set inline styles:
```html
<div [ngStyle]="{ color: textColor, 'font-size': fontSize + 'px' }"></div>
```

Prefer `[class.active]="isActive"` and `[style.color]="color"` syntax for single class/style bindings — cleaner.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q21. What is the `async` pipe? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

The `async` pipe automatically **subscribes** to an Observable or Promise and returns the latest value. It also **unsubscribes** automatically on component destroy — no manual cleanup needed.

```html
<div *ngIf="users$ | async as users">
  <li *ngFor="let u of users">{{ u.name }}</li>
</div>
```

This is the preferred pattern over manually subscribing in `ngOnInit`, because it avoids memory leaks and works with `OnPush` change detection.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q22. What is `ng-content`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`<ng-content>` enables **content projection** — inserting content from a parent into a child's template (similar to `slot` in web components).

```html
<!-- card.component.html -->
<div class="card">
  <ng-content select="[slot=header]"></ng-content>
  <ng-content></ng-content>
</div>
```

```html
<!-- parent usage -->
<app-card>
  <h2 slot="header">Title</h2>
  <p>Body content here</p>
</app-card>
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q23. What is `ng-template` and `ng-container`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

**`<ng-template>`** — defines a template block that is NOT rendered unless explicitly used (via `*ngIf else`, `ngTemplateOutlet`, etc.):
```html
<div *ngIf="loggedIn; else guestTpl">Welcome back!</div>
<ng-template #guestTpl><a href="/login">Login</a></ng-template>
```

**`<ng-container>`** — a logical grouping element that renders **no DOM element** itself. Useful to apply structural directives without adding a wrapper `<div>`:
```html
<ng-container *ngIf="items.length">
  <li *ngFor="let i of items">{{ i }}</li>
</ng-container>
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q24. What is Angular Router and how do you define routes? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

Angular Router maps URL paths to components.

```ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', component: NotFoundComponent },  // wildcard
];
```

Add `<router-outlet></router-outlet>` in `app.component.html` to mark where routed components render.

In standalone apps: `provideRouter(routes)` in `app.config.ts`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q25. What is `HttpClient` and how do you use it? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`HttpClient` (from `@angular/common/http`) is Angular's service for making HTTP requests. It returns Observables.

```ts
// app.config.ts (standalone)
provideHttpClient()

// service
constructor(private http: HttpClient) {}

getUsers() {
  return this.http.get<User[]>('https://api.example.com/users');
}

createUser(user: User) {
  return this.http.post('/api/users', user);
}
```

Always subscribe (or use `async` pipe) to trigger the request — Observables are lazy.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q26. What is `FormModule` vs `ReactiveFormsModule`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

**Template-driven forms** (`FormsModule`):
- Logic in the template (`ngModel`)
- Less code, easier for simple forms
- Asynchronous, not easily unit-testable

**Reactive forms** (`ReactiveFormsModule`):
- Logic in the TypeScript class (`FormGroup`, `FormControl`)
- More verbose but more powerful and testable
- Synchronous, observable-based, preferred for complex forms

```ts
// Reactive example
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.minLength(8)],
});
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q27. What is `EventEmitter`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`EventEmitter` is a class used with `@Output()` to emit custom events from child to parent. It extends RxJS `Subject`.

```ts
@Output() submitted = new EventEmitter<FormData>();

onSubmit() {
  this.submitted.emit(this.formData);
}
```

```html
<app-form (submitted)="handleSubmit($event)"></app-form>
```

Use `EventEmitter` only for `@Output()` events; for other pub/sub needs, use a plain RxJS `Subject`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q28. What does `providedIn: 'root'` mean? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`providedIn: 'root'` in `@Injectable` registers the service as a **singleton** at the application root injector level. The service is available everywhere in the app without adding it to any module's `providers` array.

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {}
```

Benefits: tree-shakable (not bundled if unused), automatic singleton, no module boilerplate. Alternatives: `providedIn: 'platform'`, `providedIn: 'any'`, or module-level providers.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q29. What is `<router-outlet>`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`<router-outlet>` is a placeholder directive that Angular's router uses to render the matched route's component. Think of it as the "mount point" for routed views.

```html
<!-- app.component.html -->
<app-navbar></app-navbar>
<router-outlet></router-outlet>  <!-- routed component renders here -->
<app-footer></app-footer>
```

Named outlets allow multiple router outlets: `<router-outlet name="sidebar"></router-outlet>`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>Q30. What is `ngOnChanges`? <span class="qa-difficulty-badge easy">Easy</span></summary>
<div class="qa-answer">

`ngOnChanges` fires **before `ngOnInit`** and every time a data-bound `@Input()` property value changes. It receives a `SimpleChanges` object with previous and current values.

```ts
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    const prev = changes['userId'].previousValue;
    const curr = changes['userId'].currentValue;
    this.loadUser(curr);
  }
}
```

Only fires for `@Input()` changes, not for internal property mutations.

</div>
</details>

---

## Medium (Q31–Q70)

<details class="qa-card qa-medium">
<summary>Q31. What is an Observable in Angular? How does it differ from a Promise? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

| | Observable | Promise |
|---|---|---|
| Values | Multiple (stream) | Single |
| Execution | Lazy (only runs on subscribe) | Eager (runs immediately) |
| Cancellable | Yes (`unsubscribe()`) | No |
| Operators | Rich RxJS operators | `.then()/.catch()` only |
| Async/await | Needs `firstValueFrom()` | Native support |

```ts
// Observable - lazy, multiple values
const obs$ = interval(1000);
const sub = obs$.subscribe(n => console.log(n));
sub.unsubscribe();  // cancel

// Promise - eager, one value
const p = fetch('/api').then(r => r.json());
```

Observables are preferred in Angular for HTTP, routing events, and form value changes.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q32. What is RxJS? Name common operators used in Angular. <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous programs using observable sequences.

**Common Angular operators:**
- `map` — transform each value
- `filter` — filter values
- `switchMap` — cancel previous inner observable, switch to new (HTTP search)
- `mergeMap` — run inner observables in parallel
- `concatMap` — run inner observables sequentially
- `tap` — side effects without transforming
- `catchError` — error handling
- `debounceTime` — wait N ms before emitting (search input)
- `distinctUntilChanged` — skip duplicate consecutive values
- `takeUntil` — complete when another observable emits (unsubscribe pattern)
- `forkJoin` — wait for all observables to complete (parallel HTTP)
- `combineLatest` — emit when any source emits, with all latest values

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q33. What is a Subject? Types of Subjects in RxJS? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

A `Subject` is both an Observable and an Observer — it can emit values AND be subscribed to. It's multicasting (all subscribers get the same emission).

```ts
const subject = new Subject<string>();
subject.subscribe(v => console.log('A:', v));
subject.subscribe(v => console.log('B:', v));
subject.next('hello');  // both A and B receive 'hello'
```

**Types:**
- **`Subject`** — no initial value, only future emissions
- **`BehaviorSubject`** — holds a current value, new subscribers get it immediately
- **`ReplaySubject(n)`** — replays last N values to new subscribers
- **`AsyncSubject`** — emits only the last value when the sequence completes

`BehaviorSubject` is the most common for shared state in services.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q34. What is lazy loading in Angular routing? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Lazy loading loads feature modules only when the user navigates to their route — reducing initial bundle size and improving startup time.

```ts
const routes: Routes = [
  { path: 'admin', loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule) },
  // Standalone (Angular 14+)
  { path: 'dashboard', loadComponent: () =>
      import('./dashboard.component').then(c => c.DashboardComponent) },
];
```

The router code-splits the module into a separate chunk. Angular CLI automatically splits at every `loadChildren`/`loadComponent` boundary.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q35. What are Route Guards? Name the types. <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Route Guards control **whether navigation can proceed or not**.

Types (functional guards, Angular 15+):

| Guard | Purpose |
|---|---|
| `canActivate` | Can user enter this route? |
| `canActivateChild` | Can user enter child routes? |
| `canDeactivate` | Can user leave this route? (unsaved changes) |
| `canMatch` | Should this route even be matched? |
| `resolve` | Pre-fetch data before route activates |

```ts
// Functional guard (modern)
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q36. What is a Resolver in Angular? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

A Resolver pre-fetches data **before** a route activates. The router waits for the resolver to complete before rendering the component — so the component always has data immediately.

```ts
export const userResolver: ResolveFn<User> = (route) => {
  const id = route.paramMap.get('id')!;
  return inject(UserService).getUser(id);
};

// Route definition
{ path: 'user/:id', component: UserComponent, resolve: { user: userResolver } }

// In component
constructor(private route: ActivatedRoute) {}
ngOnInit() {
  this.user = this.route.snapshot.data['user'];
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q37. What is `ChangeDetectionStrategy.OnPush`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

By default, Angular checks the entire component tree on every event. `OnPush` tells Angular to only check a component when:

1. An `@Input()` reference changes
2. An event originates from the component or its children
3. An Observable subscribed via `async` pipe emits
4. Change detection is manually triggered (`MarkForCheck`, `detectChanges`)

```ts
@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

**Key rule:** With `OnPush`, mutating an object/array won't trigger updates — you must pass a new reference (`[...arr]` or `{...obj}`).

Performance optimization for large component trees.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q38. What is Zone.js and NgZone? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

**Zone.js** is a library that monkey-patches browser async APIs (setTimeout, Promises, XHR, etc.) to intercept their execution. Angular uses it to know when async operations complete so it can trigger change detection automatically.

**`NgZone`** is Angular's wrapper around Zone.js with two key methods:
- `ngZone.run()` — run code inside Angular's zone (triggers change detection)
- `ngZone.runOutsideAngular()` — run code outside Angular's zone (performance, e.g., heavy animations)

```ts
constructor(private ngZone: NgZone) {}

startHeavyWork() {
  this.ngZone.runOutsideAngular(() => {
    // runs without triggering CD on every frame
    requestAnimationFrame(() => this.ngZone.run(() => this.done = true));
  });
}
```

In Angular 18+, zoneless mode is experimental — apps can opt out of Zone.js entirely using Signals.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q39. What is the difference between pure and impure pipes? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

**Pure pipe** (default) — only re-runs `transform()` when the input reference changes. Angular can cache the result. Suitable for most transformations.

**Impure pipe** — re-runs `transform()` on every change detection cycle, regardless of whether the input changed. Use only when the pipe depends on mutable state (e.g., current date, external state).

```ts
@Pipe({ name: 'myPipe', pure: false })  // impure
export class MyPipe implements PipeTransform { ... }
```

Impure pipes can hurt performance. Avoid unless necessary — prefer storing derived values in the component instead.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q40. What is `ViewEncapsulation`? What are the modes? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

ViewEncapsulation controls how component styles are scoped.

| Mode | Behavior |
|---|---|
| `Emulated` (default) | Angular adds unique attribute selectors to CSS — styles don't leak out or in |
| `ShadowDom` | Uses native Shadow DOM — true isolation |
| `None` | No encapsulation — styles are global |

```ts
@Component({
  encapsulation: ViewEncapsulation.None,  // styles go global
})
```

`Emulated` is best for most cases. Use `None` when you need to style third-party components. `ShadowDom` when building web components.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q41. What is `FormGroup`, `FormControl`, and `FormBuilder`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

**`FormControl`** — tracks value and validity of a single input field.

**`FormGroup`** — groups multiple `FormControl`s into a single object.

**`FormArray`** — dynamic list of controls.

**`FormBuilder`** — service that simplifies creating form groups.

```ts
constructor(private fb: FormBuilder) {}

this.form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  address: this.fb.group({
    city: [''],
    zip: ['']
  })
});

// Access values
this.form.get('email')?.value;
this.form.value;  // all values as object
this.form.valid;  // boolean
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q42. How do you create a custom validator in Reactive Forms? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

A custom validator is a function that returns `null` (valid) or a `ValidationErrors` object (invalid).

```ts
// Sync validator
function noSpaces(control: AbstractControl): ValidationErrors | null {
  return control.value?.includes(' ')
    ? { noSpaces: 'No spaces allowed' }
    : null;
}

// Use it
this.form = this.fb.group({
  username: ['', [Validators.required, noSpaces]]
});
```

**Cross-field validator** (on the FormGroup):
```ts
function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const p = group.get('password')?.value;
  const c = group.get('confirm')?.value;
  return p === c ? null : { mismatch: true };
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q43. What is an HTTP Interceptor? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

An HTTP Interceptor intercepts every HTTP request/response to add cross-cutting behavior: auth tokens, logging, error handling, loading spinners.

```ts
// Functional interceptor (Angular 15+)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) inject(Router).navigate(['/login']);
      return throwError(() => err);
    })
  );
};

// Register in app.config.ts
provideHttpClient(withInterceptors([authInterceptor]))
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q44. What is `switchMap` and when to use it? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`switchMap` maps each source emission to an inner Observable, **cancelling** the previous inner observable when a new one arrives.

**Best use case:** Search-as-you-type (cancel previous HTTP call when user types again).

```ts
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.apiService.search(query))
).subscribe(results => this.results = results);
```

- Use `switchMap` when only the **latest** result matters (search, route params)
- Use `mergeMap` when all results matter (parallel, order doesn't matter)
- Use `concatMap` when order matters (sequential queue)
- Use `exhaustMap` when you want to ignore new emissions while processing (login button)

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q45. What is `HostListener` and `HostBinding`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Used in directives/components to interact with the **host element** (the element the directive is applied to).

**`@HostListener`** — listens to events on the host element:
```ts
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.background = 'yellow';
  }
  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.background = '';
  }
  constructor(private el: ElementRef) {}
}
```

**`@HostBinding`** — binds to a property of the host element:
```ts
@HostBinding('class.active') isActive = false;
@HostBinding('attr.disabled') isDisabled = false;
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q46. What is `ElementRef` and `Renderer2`? When to use Renderer2 over ElementRef? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

**`ElementRef`** — gives direct access to the native DOM element:
```ts
constructor(private el: ElementRef) {}
ngAfterViewInit() {
  this.el.nativeElement.style.color = 'red';  // direct DOM mutation
}
```

**`Renderer2`** — Angular's abstraction for DOM manipulation. Safer:
```ts
constructor(private renderer: Renderer2, private el: ElementRef) {}
ngAfterViewInit() {
  this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
}
```

**Use `Renderer2`** because:
1. Works with Angular Universal (SSR) — no `document`/`window` dependency
2. Works in Web Workers
3. XSS-safe for setting attributes
4. Future-proof if Angular moves off the DOM

Avoid `nativeElement` direct manipulation unless absolutely necessary.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q47. What is `forRoot()` and `forChild()` pattern? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Pattern used by Angular modules (like `RouterModule`, `StoreModule`) to configure a module with providers at the **root** vs **feature** level.

- **`forRoot(config)`** — call once in `AppModule`. Registers the service as a singleton + module declarations. E.g., `RouterModule.forRoot(routes)`.
- **`forChild()`** — call in feature modules. Registers only declarations (no duplicate singleton providers). E.g., `RouterModule.forChild(featureRoutes)`.

This prevents multiple instances of services (like the router) when lazy-loaded modules are included.

```ts
// AppModule
RouterModule.forRoot(appRoutes)

// AdminModule (lazy loaded)
RouterModule.forChild(adminRoutes)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q48. What is `TemplateRef` and `ViewContainerRef`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

**`TemplateRef`** — represents an embedded template (`<ng-template>`). It is a blueprint — not rendered until inserted.

**`ViewContainerRef`** — a container in the DOM where you can dynamically insert views (from TemplateRef or components).

```ts
@Directive({ selector: '[appIf]' })
export class IfDirective {
  constructor(
    private tpl: TemplateRef<any>,
    private vc: ViewContainerRef
  ) {}

  @Input() set appIf(condition: boolean) {
    if (condition) this.vc.createEmbeddedView(this.tpl);
    else this.vc.clear();
  }
}
```

This is how `*ngIf` is implemented internally.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q49. What is `SharedModule` and `CoreModule` pattern? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

An architectural pattern for organizing modules:

**`CoreModule`** — imported once in `AppModule`. Contains:
- Singleton services (guards, interceptors)
- Root-level components (Navbar, Footer)
- Guards constructor to throw if imported more than once

**`SharedModule`** — imported in every feature module that needs it. Contains:
- Reusable components, directives, pipes
- `CommonModule`, `ReactiveFormsModule` re-exports
- No services (would break singleton pattern)

```ts
@NgModule({
  declarations: [LoadingSpinnerComponent, TruncatePipe],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, TruncatePipe, CommonModule]
})
export class SharedModule {}
```

In modern standalone Angular, this pattern is less needed — import directly.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q50. What is the `async`/`await` equivalent for Observables? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Use `firstValueFrom()` or `lastValueFrom()` from RxJS to convert an Observable to a Promise so you can use `async/await`:

```ts
import { firstValueFrom } from 'rxjs';

async loadUser(id: string) {
  try {
    const user = await firstValueFrom(this.userService.getUser(id));
    this.user = user;
  } catch (err) {
    console.error(err);
  }
}
```

`firstValueFrom` takes the first emission and completes. `lastValueFrom` waits for completion and takes the last value. The old `toPromise()` is deprecated.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q51. What is `InjectionToken`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`InjectionToken` creates a DI token for non-class values (strings, objects, configs, functions) that can't be used as DI tokens directly.

```ts
// Create token
export const API_URL = new InjectionToken<string>('API_URL');

// Provide in app.config.ts
{ provide: API_URL, useValue: 'https://api.example.com' }

// Inject in service
constructor(@Inject(API_URL) private apiUrl: string) {}
```

In modern Angular, use `inject()` function:
```ts
const apiUrl = inject(API_URL);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q52. What is hierarchical DI in Angular? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Angular has a **tree of injectors** that mirrors the component tree. Each node can have its own providers.

When resolving a dependency:
1. Check the component's own injector
2. Walk up the component tree
3. Check the module injector
4. Check the root (environment) injector

This means you can have **multiple instances** of a service — useful for state scoped to a subtree:

```ts
@Component({
  providers: [CounterService],  // local instance for this component and its children
})
export class WidgetComponent {}
```

Two widgets → two independent `CounterService` instances.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q53. What is AOT compilation? Difference from JIT? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

**JIT (Just-in-Time):** Templates compiled in the **browser** at runtime. Larger bundle (includes compiler). Slower first load. Good for development.

**AOT (Ahead-of-Time):** Templates compiled at **build time** on the server. No compiler shipped. Faster rendering. Detects template errors at build time. Default in production builds.

```bash
ng build            # AOT by default
ng serve --aot      # AOT in dev
```

AOT benefits:
- Smaller bundle (no Angular compiler)
- Faster render (no compilation step)
- Earlier error detection
- More secure (template injections caught at build time)

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q54. How do you handle errors in Angular HTTP requests? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

```ts
this.http.get('/api/data').pipe(
  catchError((error: HttpErrorResponse) => {
    if (error.status === 0) {
      // Network error
      console.error('Network error:', error.error);
    } else {
      // Server error
      console.error(`Server error ${error.status}:`, error.message);
    }
    return throwError(() => new Error('Something went wrong'));
  })
).subscribe({
  next: data => this.data = data,
  error: err => this.errorMsg = err.message
});
```

For global error handling, use an HTTP interceptor with `catchError`.
For uncaught errors, implement `ErrorHandler`:
```ts
@Injectable()
class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) { /* log to Sentry etc */ }
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q55. What is `forkJoin`? When do you use it? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`forkJoin` runs multiple observables **in parallel** and emits an array of their last values only when **all** complete. Perfect for parallel HTTP calls.

```ts
forkJoin({
  user: this.http.get<User>('/api/user/1'),
  orders: this.http.get<Order[]>('/api/orders'),
  config: this.http.get<Config>('/api/config'),
}).subscribe(({ user, orders, config }) => {
  this.user = user;
  this.orders = orders;
});
```

**Caveat:** If any observable errors, `forkJoin` errors and others are cancelled. Handle with `catchError` on each inner observable if needed.

`combineLatest` emits on every emission. `forkJoin` only emits once when all complete.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q56. What is `takeUntil` pattern for unsubscription? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`takeUntil` completes a subscription when another observable emits — commonly used for automatic unsubscription on component destroy.

```ts
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.data$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(d => this.data = d);

  interval(1000).pipe(
    takeUntil(this.destroy$)
  ).subscribe(n => this.counter = n);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

Cleaner alternative in Angular 16+: `takeUntilDestroyed()` from `@angular/core/rxjs-interop`:
```ts
data$ = this.service.data$.pipe(takeUntilDestroyed());
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q57. What is Angular Universal (SSR)? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Angular Universal enables **Server-Side Rendering (SSR)** — the Angular app runs on Node.js server to render HTML, which is sent to the browser. This gives:

- **Better SEO** — crawlers see content immediately
- **Faster First Contentful Paint** — user sees content before JS loads
- **Social media previews** — `<meta>` tags resolved at render time

```bash
ng add @angular/ssr
ng build && node dist/server/server.mjs
```

**Pitfalls:**
- No `window`, `document`, `localStorage` on the server — guard with `isPlatformBrowser()`
- State transfer (`TransferState`) prevents double HTTP requests

In Angular 17+, SSR is a first-class option available in `ng new`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q58. What is `ActivatedRoute`? How do you read route params? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`ActivatedRoute` gives you information about the currently active route — params, query params, data, URL.

```ts
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  // Snapshot (one-time read)
  const id = this.route.snapshot.paramMap.get('id');

  // Observable (reacts to param changes without recreating component)
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.loadUser(id);
  });

  // Query params
  this.route.queryParams.subscribe(qp => this.page = qp['page']);
}
```

Use the Observable approach when navigating between the same route (e.g., paging) to avoid recreating the component.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q59. What is `Router.navigate` vs `Router.navigateByUrl`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

**`navigate(commands, extras?)`** — navigates using an array of commands (relative navigation supported):
```ts
this.router.navigate(['/user', userId, 'profile'], { queryParams: { tab: 'settings' } });
this.router.navigate(['../sibling'], { relativeTo: this.route });  // relative
```

**`navigateByUrl(url)`** — navigates using an absolute URL string:
```ts
this.router.navigateByUrl('/user/42?tab=settings');
```

Prefer `navigate()` — it's more composable and supports relative navigation. Use `navigateByUrl()` when you have a full URL string (e.g., from redirect).

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q60. What is `canDeactivate` guard? When do you use it? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`canDeactivate` prevents navigation away from a route — useful to warn users about unsaved changes.

```ts
export const unsavedChangesGuard: CanDeactivateFn<EditComponent> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};

// Route
{ path: 'edit/:id', component: EditComponent, canDeactivate: [unsavedChangesGuard] }
```

The guard can return `boolean`, `UrlTree`, or `Observable<boolean>` (for async confirmation dialogs).

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q61. What is `ng-template` with `ngTemplateOutlet`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`ngTemplateOutlet` renders a `TemplateRef` at a specific location, optionally with a context object.

```html
<!-- Define template -->
<ng-template #loading>
  <div class="spinner">Loading...</div>
</ng-template>

<ng-template #userCard let-user="user">
  <div>{{ user.name }}</div>
</ng-template>

<!-- Use template -->
<ng-container *ngTemplateOutlet="loading"></ng-container>
<ng-container *ngTemplateOutlet="userCard; context: { user: currentUser }"></ng-container>
```

Useful for reusable template fragments within the same component, or passing templates as `@Input()` to child components for customization.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q62. What is a standalone component? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

Standalone components (Angular 14+) don't belong to any `NgModule`. They declare their own dependencies in their `imports` array — making them self-contained and more tree-shakable.

```ts
@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, RouterLink, DatePipe, UserCardComponent],
  template: `...`,
})
export class ProfileComponent {}
```

In Angular 17+, standalone is the **default** when using `ng generate`. The entire app can be standalone:
```ts
// main.ts
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q63. What is `TestBed`? How do you test a component? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`TestBed` is Angular's primary testing utility that creates an Angular testing module environment.

```ts
describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],  // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // trigger ngOnInit + initial CD
  });

  it('should increment count', () => {
    component.increment();
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain('1');
  });
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q64. What is `fakeAsync` and `tick`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`fakeAsync` wraps a test in a fake async zone where time is controlled manually. `tick(ms)` advances the virtual clock.

```ts
it('should show result after delay', fakeAsync(() => {
  component.startLoading();
  tick(2000);  // advance 2 seconds
  fixture.detectChanges();
  expect(component.loaded).toBe(true);
}));

// For promises/microtasks
it('should resolve promise', fakeAsync(() => {
  let result = '';
  Promise.resolve('hello').then(v => result = v);
  flushMicrotasks();  // flush pending microtasks
  expect(result).toBe('hello');
}));
```

Alternative: `async/await` with `fixture.whenStable()` for real async.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q65. What is `ngDoCheck`? When is it called? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`ngDoCheck` fires on **every change detection cycle** — even when Angular doesn't detect any changes through its normal mechanism. It runs after `ngOnChanges` each cycle.

Use it to detect changes Angular can't (deeply mutated objects, custom comparison):
```ts
ngDoCheck() {
  if (this.items !== this.prevItems) {
    this.prevItems = [...this.items];
    this.doSomething();
  }
}
```

**Caution:** Runs very frequently — keep logic minimal and fast. It's commonly used by the Angular team to implement `ngFor`, `ngIf`, etc. internally. For most app code, prefer `ngOnChanges` or immutable data patterns with `OnPush`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q66. What is `ngAfterViewInit`? Common use cases? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`ngAfterViewInit` fires **once** after the component's view (template) and all child views are fully initialized and available in the DOM.

Common use cases:
- Access `@ViewChild` elements (first available here, not in `ngOnInit`)
- Focus an input element
- Initialize third-party libraries that need DOM (Chart.js, etc.)
- Measure element dimensions

```ts
@ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

ngAfterViewInit() {
  const ctx = this.canvasRef.nativeElement.getContext('2d');
  new Chart(ctx, this.chartConfig);
}
```

**Important:** Don't modify state that affects the template in `ngAfterViewInit` — it triggers `ExpressionChangedAfterItHasBeenCheckedError`. Use `setTimeout(()=> ..., 0)` or `queueMicrotask` if needed.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q67. What is Angular's `DestroyRef`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`DestroyRef` (Angular 16+) is an injectable that lets you register cleanup callbacks when a component/service/directive is destroyed — without implementing `OnDestroy`.

```ts
constructor() {
  const destroyRef = inject(DestroyRef);
  destroyRef.onDestroy(() => {
    console.log('Cleanup!');
    this.subscription.unsubscribe();
  });
}
```

Powers `takeUntilDestroyed()`:
```ts
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

data$ = this.service.items$.pipe(takeUntilDestroyed());
```

No need to manually manage a `Subject` + `ngOnDestroy` pattern anymore.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q68. What is `RouterLinkActive`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`routerLinkActive` adds a CSS class to an element when its associated `routerLink` matches the current URL:

```html
<nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
</nav>
```

By default it also matches child routes (e.g., `/about/team` also activates `/about`). To require exact match:
```html
<a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
```

Use `#rla="routerLinkActive"` template variable to check `.isActive` programmatically.

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q69. What is `TransferState`? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`TransferState` prevents double HTTP requests when using Angular Universal (SSR):

1. Server renders the page and makes HTTP calls
2. Server serializes the response data into the HTML as a `<script>` tag
3. Browser reads that data from the DOM instead of making a new request

```ts
// Modern approach (Angular 16+): automatic with HttpClient
// In app.config.server.ts:
provideClientHydration()
// This automatically transfers HttpClient state — no manual TransferState needed
```

For custom state:
```ts
const key = makeStateKey<User[]>('users');
// Server: state.set(key, users)
// Browser: const users = state.get(key, null)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>Q70. What is `inject()` function? When to use it over constructor injection? <span class="qa-difficulty-badge medium">Medium</span></summary>
<div class="qa-answer">

`inject()` is a function that retrieves a dependency from the current injection context — without needing constructor parameters.

```ts
// In component field initializer (Angular 14+)
export class MyComponent {
  private userService = inject(UserService);
  private router = inject(Router);
}

// In functional guards
export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn();
};

// In class field initializer — enables takeUntilDestroyed()
data$ = inject(UserService).getUsers().pipe(
  takeUntilDestroyed()
);
```

Benefits over constructor: works in standalone functions (guards, resolvers), enables inline initialization, cleaner for composable utilities. Modern Angular style prefers `inject()`.

</div>
</details>

---

## Hard (Q71–Q103)

<details class="qa-card qa-hard">
<summary>Q71. What is Angular Ivy? What improvements did it bring? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Ivy is Angular's compilation and rendering engine (default since Angular 9, replacing View Engine).

**Key improvements:**
- **Tree-shakable** — only used framework code is bundled; unused directives/pipes dropped
- **Smaller bundles** — "Hello World" app dropped from ~130KB to ~30KB
- **Locality principle** — each component compiled independently; no global compilation needed
- **Improved debugging** — component instance accessible via `ng.getComponent(el)` in devtools
- **Better type checking** — `strictTemplates` catches template type errors at build time
- **Faster builds** — incremental compilation
- **Foundation for standalone** — enabled standalone components, `inject()` function, Signals

Under Ivy, component templates are compiled to **TypeScript instruction functions** rather than ng_factory files.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q72. What are Angular Signals? How do they work? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Signals (Angular 16+, stable in 17+) are a reactive primitive — a **synchronous, push-based reactivity system** that replaces Zone.js-driven change detection.

A Signal is a wrapper around a value that notifies consumers when the value changes.

```ts
// Writable signal
const count = signal(0);
console.log(count());        // read: 0
count.set(5);                // write
count.update(c => c + 1);    // update based on previous

// Computed signal (derived, lazy, cached)
const doubled = computed(() => count() * 2);

// Effect (side effect when signals change)
effect(() => {
  console.log('Count changed:', count());
});
```

**How they enable zoneless CD:**
- Angular tracks which signals a template reads during rendering
- When a signal changes, only the components that read it are re-rendered
- No more Zone.js monkey-patching needed

Signals make `ChangeDetectionStrategy.OnPush` effectively automatic.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q73. What is `computed()` in Angular Signals? How does it differ from `effect()`? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

**`computed()`** — creates a derived signal whose value is recalculated when its dependencies change. It is:
- **Lazy** — only recomputes when read
- **Cached** — same value returned if dependencies unchanged
- **Synchronous** — returns a value

```ts
const firstName = signal('John');
const lastName = signal('Doe');
const fullName = computed(() => `${firstName()} ${lastName()}`);

console.log(fullName()); // 'John Doe'
firstName.set('Jane');
console.log(fullName()); // 'Jane Doe' (recomputed)
```

**`effect()`** — runs a side effect when signals it reads change. It is:
- **Eager** — runs immediately on change (not lazy)
- **No return value** — for side effects only (logging, DOM sync, analytics)
- Returns a cleanup function

```ts
effect(() => {
  document.title = `Count: ${count()}`;
  return () => { /* cleanup on re-run or destroy */ };
});
```

Don't use `effect()` to update signals — use `computed()` or signal methods instead (can cause infinite loops).

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q74. What is the `@defer` block? When would you use it? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`@defer` (Angular 17+) is a template syntax for **lazy-loading parts of a template** — components, directives, pipes are only downloaded when needed.

```html
@defer (on viewport) {
  <app-heavy-chart [data]="data" />
} @placeholder {
  <div class="placeholder">Chart loading area</div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>Failed to load chart</p>
}
```

**Triggers:**
- `on idle` — when browser is idle
- `on viewport` — when element enters viewport
- `on interaction` — on click/focus
- `on hover` — on hover
- `on timer(2s)` — after delay
- `when condition` — when expression is truthy

**Benefits:** Zero JS for deferred content until trigger fires. No manual `loadChildren` needed. Works at template level without router involvement.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q75. What is the new control flow syntax in Angular 17? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular 17 introduced built-in control flow syntax that replaces `*ngIf`, `*ngFor`, `*ngSwitch` directives:

```html
<!-- @if -->
@if (user.isLoggedIn) {
  <p>Welcome, {{ user.name }}</p>
} @else if (user.isGuest) {
  <p>Hello, Guest</p>
} @else {
  <a routerLink="/login">Login</a>
}

<!-- @for (requires track!) -->
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No items found</li>
}

<!-- @switch -->
@switch (status) {
  @case ('active') { <span class="green">Active</span> }
  @case ('error') { <span class="red">Error</span> }
  @default { <span>Unknown</span> }
}
```

**Benefits over directives:**
- Better type narrowing inside `@if`
- `@empty` block built into `@for`
- `track` is required (no accidental performance issues)
- More readable, no `ng-container` hacks
- Slightly smaller bundle (no directive overhead)

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q76. What is zoneless Angular? How to enable it? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Zoneless Angular (experimental in v18, stabilizing in v19+) removes the Zone.js dependency entirely, using Signals for change detection triggers.

**Why zoneless:**
- Smaller bundle (~98KB Zone.js removed)
- Faster boot
- Better compatibility with micro-frontends and native async
- Predictable CD — only runs when signals change or `markForCheck()` called

**Enable in Angular 18+:**
```ts
// app.config.ts
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // remove provideZoneChangeDetection()
  ]
};
```

Remove Zone.js from `polyfills` in `angular.json`.

**Requirements:**
- Use Signals for reactive state
- Use `async` pipe (subscribes through markForCheck)
- Manual `ChangeDetectorRef.markForCheck()` for non-signal state changes

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q77. What is `input()` signal function vs `@Input()` decorator? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular 17.1+ introduced **signal inputs** — `@Input()` as a Signal:

```ts
// Old: @Input() decorator
@Input() userId!: string;
@Input({ required: true }) name!: string;
@Input({ transform: numberAttribute }) age!: number;

// New: signal input
userId = input<string>();               // optional, returns InputSignal<string|undefined>
name = input.required<string>();        // required
age = input(0, { transform: numberAttribute }); // with default + transform
```

**Benefits of signal inputs:**
- Type-safe (required inputs can't be undefined without explicit handling)
- Reactive — can use in `computed()` and `effect()`
- No need for `ngOnChanges` to react to input changes:

```ts
// Reactive to input change automatically
protected url = computed(() => `/api/user/${this.userId()}`);
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q78. What is `output()` function vs `@Output()` decorator? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular 17.3+ introduced `output()` function as a modern replacement for `@Output() EventEmitter`:

```ts
// Old
@Output() selected = new EventEmitter<User>();

// New
selected = output<User>();

// Emit
this.selected.emit(user);

// With transform (outputFromObservable)
import { outputFromObservable } from '@angular/core/rxjs-interop';
valueChange = outputFromObservable(this.formControl.valueChanges);
```

**Benefits:**
- No `EventEmitter` (which extends `Subject`) — cleaner
- `outputToObservable()` lets parents subscribe as Observable
- Consistent with signal-based APIs
- Works with zoneless

Usage in parent template is identical to `@Output()` — no change needed.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q79. What is `linkedSignal()`? (Angular 19) <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`linkedSignal()` (Angular 19, developer preview) creates a **writable signal that resets when a source signal changes** — solving the common pattern where you have a local selection that should reset when the data it's based on changes.

```ts
// Problem: selectedItem should reset when items changes
items = input<Item[]>([]);
// With linkedSignal:
selectedItem = linkedSignal(() => this.items()[0]);  // defaults to first item

// When items changes, selectedItem resets to items()[0]
// But it's also writable:
this.selectedItem.set(specificItem);  // user selection works
```

Replaces the error-prone pattern of `effect(() => this.selected.set(this.items()[0]))`.

Advanced form with equality and previous value:
```ts
selectedItem = linkedSignal<Item[], Item>({
  source: this.items,
  computation: (newItems, previous) =>
    newItems.find(i => i.id === previous?.value?.id) ?? newItems[0]
});
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q80. What is `resource()` in Angular 19? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`resource()` (Angular 19, developer preview) is a signal-based async data fetching primitive that automatically re-fetches when its reactive dependencies (signals) change.

```ts
userId = signal(1);

userResource = resource({
  request: () => ({ id: this.userId() }),  // reactive params
  loader: async ({ request, abortSignal }) => {
    const res = await fetch(`/api/user/${request.id}`, { signal: abortSignal });
    return res.json() as User;
  }
});

// In template
@if (userResource.isLoading()) {
  <app-spinner />
} @else if (userResource.error()) {
  <p>Error: {{ userResource.error() }}</p>
} @else {
  <p>{{ userResource.value()?.name }}</p>
}
```

`rxResource()` variant works with Observables instead of Promises. Automatic cancellation via `AbortSignal`.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q81. What is `ChangeDetectorRef`? Methods and use cases? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`ChangeDetectorRef` gives manual control over change detection for a component.

Key methods:

| Method | Effect |
|---|---|
| `markForCheck()` | Marks component and ancestors as dirty — CD will run on next cycle |
| `detectChanges()` | Runs CD synchronously on this component and children |
| `detach()` | Removes component from CD tree completely |
| `reattach()` | Re-attaches to CD tree |

```ts
constructor(private cdr: ChangeDetectorRef) {}

// OnPush + async data from outside Angular zone
someCallback(data: any) {
  this.data = data;
  this.cdr.markForCheck();  // tell Angular to check this component
}

// Manual CD for performance-critical components
ngOnInit() {
  this.cdr.detach();  // no auto CD
  setInterval(() => {
    this.data = this.getData();
    this.cdr.detectChanges();  // only when we want
  }, 5000);
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q82. What is module federation in Angular (Micro-Frontends)? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Module Federation (Webpack 5) allows multiple Angular apps (micro-frontends) to share code and load components/modules from each other at runtime.

```ts
// Host app webpack config (via @angular-architects/module-federation)
{
  remotes: {
    'mfe1': 'mfe1@http://localhost:4201/remoteEntry.js'
  }
}

// Remote app exposes:
{
  exposes: {
    './Component': './src/app/my/my.component.ts'
  }
}

// Host lazy-loads remote:
{ path: 'mfe1', loadChildren: () =>
  loadRemoteModule({ remoteEntry: 'http://localhost:4201/remoteEntry.js',
    remoteName: 'mfe1', exposedModule: './Module'
  }).then(m => m.MyModule)
}
```

**Benefits:** Independent deployments, team autonomy, technology diversity.
**Challenges:** Shared library version conflicts, increased complexity, SSR limitations.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q83. What is `@let` syntax in Angular 18? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`@let` (Angular 18+) declares a local template variable from an expression — like a template-scoped `const`:

```html
@let user = currentUser$ | async;
@let greeting = 'Hello, ' + user?.name + '!';

@if (user) {
  <h1>{{ greeting }}</h1>
  <p>Role: {{ user.role }}</p>
}
```

**Before `@let`** you needed workarounds:
```html
<!-- Ugly workaround -->
<ng-container *ngIf="currentUser$ | async as user">
  <h1>Hello, {{ user.name }}</h1>
</ng-container>
```

`@let` scopes are block-scoped (like JS `let`) — variables defined inside `@if/@for` blocks aren't accessible outside.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q84. Explain Angular's dependency injection tree: environment vs element injectors. <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular 14+ formalized two separate injector trees:

**Environment Injectors** (top of the tree):
- Root injector (providers from `bootstrapApplication` or `AppModule`)
- Platform injector (across multiple apps on same page)
- `@NgModule` injectors (lazy-loaded modules get their own)

**Element Injectors** (component tree):
- Each component/directive can have its own providers
- Defined via `providers` in `@Component({ providers: [] })`
- Created when component is created, destroyed when component is destroyed

**Resolution order:** element injector → parent element injectors → environment injectors → root → platform.

```ts
@Component({
  providers: [
    { provide: DataService, useClass: LocalDataService }  // shadows root DataService
  ]
})
export class FeatureComponent {}
```

Use `{ providedIn: 'root' }` for singletons, component providers for scoped instances.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q85. What is `ExpressionChangedAfterItHasBeenCheckedError`? How to fix it? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

This error occurs in dev mode when a value used in a template changes **after** Angular finished checking it in the same CD cycle.

Angular verifies in dev mode by running CD twice and comparing — if values differ, it throws.

**Common causes:**
1. Modifying state in `ngAfterViewInit` that's bound in the template
2. Parent changes child's `@Input` in `ngAfterViewChecked`
3. Services that emit synchronously during CD

**Fixes:**

Option 1: Defer the update to the next tick:
```ts
ngAfterViewInit() {
  Promise.resolve().then(() => {
    this.isLoaded = true;  // runs after current CD cycle
  });
}
```

Option 2: Use `queueMicrotask`:
```ts
ngAfterViewInit() {
  queueMicrotask(() => this.isLoaded = true);
}
```

Option 3: Move initialization to `ngOnInit` (runs before the view is checked).

Option 4: Use `ChangeDetectorRef.detectChanges()` after the mutation.

**Warning:** `setTimeout(fn, 0)` works but causes an extra CD cycle — `Promise.resolve()` is cheaper.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q86. What is Angular's `APP_INITIALIZER`? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`APP_INITIALIZER` is a multi-provider token that runs **before the application bootstraps**. Useful for loading config, translations, or doing auth checks before the app renders.

```ts
// app.config.ts
function initializeApp(configService: ConfigService) {
  return () => configService.load();  // returns Promise or Observable
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ]
};
```

Angular waits for all `APP_INITIALIZER` factories to resolve before rendering the root component. Multiple initializers can be registered (`multi: true`).

**Caveat:** A slow or failing initializer blocks the entire app from loading — add error handling and timeouts.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q87. What is Angular's `@defer` `prefetch` and `when` condition? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`@defer` supports separate triggers for **loading** (when JS downloads) vs **showing** (when rendered):

```html
<!-- prefetch when idle, show on interaction -->
@defer (on interaction; prefetch on idle) {
  <app-complex-form />
}

<!-- Programmatic condition -->
@defer (when isReady) {
  <app-dashboard [data]="data" />
} @placeholder {
  <div>Loading dashboard...</div>
}

<!-- Prefetch immediately but show only when user navigates -->
@defer (when showDetails; prefetch on immediate) {
  <app-details [item]="item" />
}
```

**Prefetch triggers** (same as show triggers): `idle`, `viewport`, `interaction`, `hover`, `immediate`, `timer(x)`, `when condition`.

Prefetching downloads JS early (when browser is idle) but defers rendering — best UX for content that will likely be needed soon.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q88. What is tree shaking and how does Angular support it? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Tree shaking is dead code elimination — the bundler (Webpack/Rollup/esbuild) removes unused exports from the final bundle.

**How Angular enables tree shaking:**

1. **`providedIn: 'root'` services** — if the service is never injected anywhere, it's removed from the bundle. Module-level `providers: [Service]` prevents tree shaking of that service.

2. **Ivy's locality** — each component is self-contained. Angular only bundles directives/pipes actually used in templates (not the full `@angular/common`).

3. **Standalone components** — import only what you need per component, not entire modules.

4. **ES modules** — static `import/export` (not dynamic `require`) enables static analysis.

```ts
// NOT tree-shakable (imported in NgModule.providers)
providers: [SomeService]

// Tree-shakable
@Injectable({ providedIn: 'root' })
export class SomeService {}
```

Check bundle sizes with `ng build --stats-json` + `webpack-bundle-analyzer`.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q89. What is `Signal-based` component vs `Zone-based` component? Interop? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

**Zone-based (traditional):**
- Zone.js patches async APIs
- CD runs automatically after every async operation
- `Default` or `OnPush` CD strategy
- `ngOnChanges` for reactive inputs

**Signal-based (modern):**
- CD triggered by signal mutations, not zone
- Can use `ChangeDetectionStrategy.OnPush` with zero manual `markForCheck()`
- `input()`, `output()`, `model()` signal primitives
- Works with zoneless or zone-based apps

**Interop:** Signal-based and zone-based components can coexist in the same app. A zone app can gradually adopt signals:

```ts
// Hybrid: zone-based app, signal component
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,  // works great with signals
  template: `<p>{{ count() }}</p>`
})
export class HybridComponent {
  count = signal(0);
}
```

Gradual migration: add `OnPush` + signals first, then remove Zone.js when ready.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q90. What is `@angular/cdk`? Common uses? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular CDK (Component Dev Kit) is a set of behavior primitives for building custom UI components — without opinionated styling (unlike Angular Material).

**Key CDK modules:**

| Module | Provides |
|---|---|
| `overlay` | Floating panels, dropdowns, tooltips |
| `drag-drop` | Drag and drop with ordering |
| `virtual-scroll` | Efficient rendering of large lists |
| `a11y` | Focus trapping, keyboard navigation, ARIA |
| `layout` | Media query breakpoint observation |
| `portal` | Render components outside the current view |
| `stepper` | Step-based navigation |
| `table` | Data table infrastructure |

```ts
// Virtual scroll example
import { ScrollingModule } from '@angular/cdk/scrolling';

<cdk-virtual-scroll-viewport itemSize="50" style="height: 400px">
  <div *cdkVirtualFor="let item of items">{{ item }}</div>
</cdk-virtual-scroll-viewport>
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q91. What is `HttpContext` in Angular? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`HttpContext` (Angular 12+) lets you pass custom metadata with HTTP requests — consumed by interceptors. Replaces the hack of using custom headers for interceptor communication.

```ts
// Define a token
const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

// Use in request
this.http.get('/api/public', {
  context: new HttpContext().set(SKIP_AUTH, true)
});

// Interceptor checks it
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) return next(req);  // skip for public routes
  return next(req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) }));
};
```

Much cleaner than using URL patterns or custom headers to communicate intent to interceptors.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q92. How does Angular handle SSR and hydration in Angular 16+? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

**Destructive hydration (old):** Server renders HTML, then browser discards it and re-renders from scratch. Causes flickering.

**Non-destructive hydration (Angular 16+):** Server renders HTML → browser reuses the existing DOM nodes and attaches Angular event listeners without re-creating elements. Zero flicker.

```ts
// app.config.ts (client)
provideClientHydration()

// app.config.server.ts
mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering()]
})
```

**Angular 17+ hydration features:**
- `provideClientHydration(withEventReplay())` — replay events that fire before hydration completes
- Incremental hydration with `@defer (hydrate on ...)` — defer hydration of non-critical parts
- Automatic `TransferState` for `HttpClient` responses

**Constraints:** No DOM manipulation in `ngOnInit` that differs between server/client. Guard with `isPlatformBrowser()`.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q93. What is the `model()` signal in Angular? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`model()` (Angular 17.2+) creates a **two-way bindable signal** — it's both an input and an output in one. Replaces the `@Input() value` + `@Output() valueChange` pattern for two-way binding.

```ts
// Child component
@Component({ selector: 'app-counter' })
export class CounterComponent {
  count = model(0);  // or model.required<number>()
  increment() { this.count.update(c => c + 1); }
}

// Parent template
<app-counter [(count)]="myCount" />
// equivalent to:
<app-counter [count]="myCount" (countChange)="myCount = $event" />
```

`model()` returns a `ModelSignal<T>` which extends `WritableSignal<T>` — readable and writable in both child and parent.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q94. What is Angular Schematics? How do you create a custom schematic? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Schematics are code generators and transformers used by Angular CLI (`ng generate`, `ng add`, `ng update`). They operate on a virtual file system — changes are only written if the schematic succeeds.

**Create a custom schematic:**
```bash
npm install -g @angular-devkit/schematics-cli
schematics blank --name=my-schematic
cd my-schematic
```

```ts
// src/my-schematic/index.ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function mySchematic(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    tree.create('hello.txt', `Hello ${options.name}!`);
    return tree;
  };
}
```

```bash
schematics .:my-schematic --name=World --dry-run
```

**Use cases:** Enforce team code standards, generate boilerplate, automate migrations (Angular's own `ng update` uses schematics).

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q95. What is `TestBed.overrideComponent`? When is it needed? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`TestBed.overrideComponent` replaces parts of a component's metadata (template, providers, imports) **after** `TestBed.configureTestingModule` but before `compileComponents`.

```ts
TestBed.overrideComponent(MyComponent, {
  set: {
    providers: [{ provide: UserService, useClass: MockUserService }],
    template: '<p>Simple test template</p>'
  }
});
```

**When needed:**
- Replacing a child component's provider without re-configuring the whole test module
- Overriding a standalone component's imports in deep integration tests
- Simplifying templates to speed up rendering in tests

```ts
// Standalone component override
TestBed.overrideComponent(AppComponent, {
  add: { imports: [RouterTestingModule] },
  remove: { imports: [BrowserAnimationsModule] }  // too heavy for unit test
});
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q96. How do you implement a dynamic component in Angular? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Dynamic components are created programmatically at runtime — useful for modals, toasts, dynamic forms.

**Modern approach (Angular 13+):**
```ts
@Component({
  template: `<ng-container #container></ng-container>`
})
export class HostComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  loadComponent(type: Type<any>, inputs: Record<string, any>) {
    this.container.clear();
    const ref = this.container.createComponent(type);
    Object.entries(inputs).forEach(([key, value]) => {
      ref.setInput(key, value);
    });
    return ref;
  }
}

// Usage
this.loadComponent(AlertComponent, { message: 'Hello!', type: 'success' });
```

No `entryComponents` array needed since Angular 13 (Ivy handles it automatically).

**`ComponentRef.setInput()`** (Angular 14+) properly triggers `ngOnChanges` for the dynamically set inputs.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q97. What is `NgOptimizedImage` directive? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`NgOptimizedImage` (Angular 15+, from `@angular/common`) is a directive that improves image performance by:

- Adding `loading="lazy"` for offscreen images
- Setting `fetchpriority="high"` for LCP images
- Generating `srcset` for responsive images
- Warning about missing `width`/`height` (prevents CLS)
- Supporting image loaders for CDNs (Imgix, Cloudflare, etc.)

```html
<img ngSrc="hero.jpg" width="1280" height="720" priority />
<!--  ^ priority = fetchpriority high + no lazy (LCP image) -->

<img ngSrc="avatar.jpg" width="100" height="100" />
<!-- auto lazy loaded -->
```

```ts
// With CDN loader
provideImgixLoader('https://my-cdn.imgix.net/')
// Generates: srcset="my-cdn.imgix.net/avatar.jpg?w=100 1x, ...2x"
```

Replace `<img src>` with `<img ngSrc>` for all images — significant Core Web Vitals improvement.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q98. What is the difference between `ViewRef`, `EmbeddedViewRef`, and `ComponentRef`? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

These are different types of views in Angular's view hierarchy:

**`ViewRef`** — abstract base for a view. Provides `detectChanges()`, `markForCheck()`, `destroy()`.

**`EmbeddedViewRef`** — a view created from a `TemplateRef` (via `ViewContainerRef.createEmbeddedView()`). Exposes `context` for template variables.

```ts
const tplRef: TemplateRef<any>;
const viewRef: EmbeddedViewRef<any> = viewContainer.createEmbeddedView(tplRef, { $implicit: data });
viewRef.context.$implicit = newData;  // update context
viewRef.detectChanges();
```

**`ComponentRef`** — a view created from a component type (via `ViewContainerRef.createComponent()`). Provides:
- `.instance` — the component class instance
- `.setInput(name, value)` — set @Input signals properly
- `.changeDetectorRef` — control CD
- `.location` — ElementRef of host element

```ts
const ref = viewContainer.createComponent(MyComponent);
ref.setInput('title', 'Dynamic!');
ref.instance.someMethod();
ref.destroy();
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q99. What is `@angular/elements` (Angular Elements)? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular Elements lets you package Angular components as **Custom Elements (Web Components)** — native browser elements that work without Angular.

```ts
import { createCustomElement } from '@angular/elements';

@NgModule({})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(MyComponent, { injector: this.injector });
    customElements.define('my-widget', el);
  }
}
```

```html
<!-- Works in any HTML page, Vue, React, plain HTML -->
<my-widget title="Hello"></my-widget>
```

**Use cases:**
- Embed Angular components in non-Angular apps
- Widget libraries distributed as Web Components
- Micro-frontend islands in non-Angular shells
- CMS content areas with dynamic components

**Trade-off:** Larger bundle size (includes Angular runtime). Better for widget libraries than micro-frontends at scale.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q100. How does Angular's router handle scroll restoration and scroll behavior? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular Router can manage scroll position across navigation:

```ts
// Enable scroll restoration
provideRouter(routes, withInMemoryScrolling({
  scrollPositionRestoration: 'enabled',  // restore on back/forward
  anchorScrolling: 'enabled'             // support fragment (#section) links
}))
```

Options for `scrollPositionRestoration`:
- `'disabled'` (default) — no scroll management
- `'top'` — always scroll to top on navigation
- `'enabled'` — restore previous scroll position on back/forward, top on new navigation

**Custom scroll behavior:**
```ts
import { ViewportScroller } from '@angular/common';

constructor(private vs: ViewportScroller) {}

scrollTo(anchor: string) {
  this.vs.scrollToAnchor(anchor);
}

// Listen to scroll events
router.events.pipe(
  filter(e => e instanceof Scroll)
).subscribe((e: Scroll) => {
  if (e.position) this.vs.scrollToPosition(e.position);
  else if (e.anchor) this.vs.scrollToAnchor(e.anchor);
  else this.vs.scrollToPosition([0, 0]);
});
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q101. What is `provideRouter` with functional API vs `RouterModule.forRoot`? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

Angular 14+ introduced a functional router configuration API for standalone apps that's more tree-shakable:

```ts
// Old: NgModule approach
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })]
})

// New: functional features (tree-shakable — only bundles features you use)
provideRouter(
  routes,
  withPreloading(PreloadAllModules),
  withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
  withRouterConfig({ onSameUrlNavigation: 'reload' }),
  withComponentInputBinding(),   // route params → @Input() automatically
  withViewTransitions(),         // View Transitions API
  withDebugTracing()             // dev only
)
```

**`withComponentInputBinding()`** — automatically binds route params, query params, and resolved data to component `@Input()` with matching names — no more injecting `ActivatedRoute`.

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q102. What is `withComponentInputBinding()`? How does it simplify route params? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

`withComponentInputBinding()` (Angular 16+) automatically maps route params, query params, and resolver data to `@Input()` properties with matching names — no `ActivatedRoute` injection needed.

```ts
// Route definition
{ path: 'user/:id', component: UserComponent, resolve: { profile: userResolver } }

// Old way (required ActivatedRoute)
constructor(private route: ActivatedRoute) {}
ngOnInit() {
  this.id = this.route.snapshot.paramMap.get('id');
  this.profile = this.route.snapshot.data['profile'];
}

// New way (with withComponentInputBinding() enabled)
@Input() id!: string;          // from :id param
@Input() page?: string;         // from ?page= query param
@Input() profile!: UserProfile; // from resolver
```

Works with signal inputs too:
```ts
id = input.required<string>();     // from :id
profile = input<UserProfile>();    // from resolver
```

Enable once in `app.config.ts`:
```ts
provideRouter(routes, withComponentInputBinding())
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>Q103. How do you optimize large Angular apps for production? <span class="qa-difficulty-badge hard">Hard</span></summary>
<div class="qa-answer">

**Build-time optimizations:**
- Production build: `ng build` (AOT, tree shaking, minification, dead code elimination)
- `OnPush` change detection everywhere
- Lazy load all feature modules/components with `loadComponent`/`loadChildren`
- `@defer` for below-fold content
- `provideRouter(withPreloading(QuicklinkStrategy))` for smart preloading

**Runtime optimizations:**
- `trackBy` in all `@for`/`*ngFor`
- `async` pipe over manual subscriptions
- Pure pipes over method calls in templates (method calls run every CD)
- `NgOptimizedImage` for all images
- Virtual scroll (`cdk-virtual-scroll-viewport`) for long lists

**Bundle analysis:**
```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/my-app/stats.json
```

**Signals (Angular 17+):**
- Signal-based components + `OnPush` → minimal CD scope
- Eventual zoneless → remove Zone.js overhead entirely

**Caching:**
- Service worker (`@angular/pwa`) for asset caching
- `TransferState` for SSR to avoid double HTTP calls
- HTTP caching headers on API responses

</div>
</details>
