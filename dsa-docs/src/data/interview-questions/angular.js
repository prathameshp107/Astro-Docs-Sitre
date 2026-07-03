// ─── Angular Interview Questions (200) ──────────────────────────────────
export const ANGULAR_QUESTIONS = [
  // ── Easy ─────────────────────────────────────────────────────────────────
  [
    "What is Angular and how does it differ from AngularJS?",
    "easy",
    "Angular (2+) is a complete rewrite of AngularJS (1.x). Key differences: Angular uses TypeScript, component-based architecture (vs MVC in AngularJS), supports mobile, has a new change detection system (Zone.js), uses dependency injection with hierarchical injectors, and has a CLI. AngularJS uses JavaScript, controllers/$scope, and is not mobile-ready. Angular is faster and more modular."
  ],
  [
    "What is a component in Angular? What does @Component decorator do?",
    "easy",
    "A component is the basic building block of an Angular UI — it controls a part of the screen via a template, styles, and logic. The `@Component` decorator adds metadata: `selector` (CSS tag name), `template`/`templateUrl` (HTML), `style`/`styleUrls` (CSS), `changeDetection`, `providers`, etc. Angular compiles this metadata into a component definition."
  ],
  [
    "What is a module in Angular? What is the purpose of @NgModule?",
    "easy",
    "`@NgModule` organizes related components, directives, pipes, and services into a cohesive block. It declares what belongs to the module (`declarations`), what it needs from other modules (`imports`), what services it provides (`providers`), and what it exposes to other modules (`exports`). Every Angular app has a root `AppModule`. Since v14, standalone components can exist without NgModules."
  ],
  [
    "What is data binding in Angular? Name the four types.",
    "easy",
    "Data binding synchronizes the component with the DOM. Four types: 1) Interpolation `{{ value }}` — one-way from component to template. 2) Property binding `[property]=\"value\"` — one-way component to template. 3) Event binding `(event)=\"handler()\"` — one-way template to component. 4) Two-way binding `[(ngModel)]=\"property\"` — property + event binding combined (banana-in-a-box syntax)."
  ],
  [
    "What is property binding in Angular? Give an example.",
    "easy",
    "Property binding sets an element/Directive/Component property with a component value. Syntax: `[propertyName]=\"expression\"`. Example: `<img [src]=\"imageUrl\">` sets the image source dynamically, or `<button [disabled]=\"isLoading\">`. Angular evaluates the expression and assigns the result to the target property."
  ],
  [
    "What is event binding in Angular? Give an example.",
    "easy",
    "Event binding listens to DOM events and calls a method in the component. Syntax: `(eventName)=\"handler($event)\"`. Example: `<button (click)=\"onSave($event)\">Save</button>`. The `$event` object carries event-specific data. Angular automatically unsubscribes when the component is destroyed."
  ],
  [
    "What is interpolation in Angular templates?",
    "easy",
    "Interpolation uses double curly braces `{{ expression }}` to embed component property values into the template. Angular evaluates the expression and converts it to a string. Example: `<h1>{{ title }}</h1>` or `<p>{{ 2 + 2 }}</p>`. Expressions can include method calls and pipes but not assignment operators or `new`."
  ],
  [
    "What is two-way data binding and how does [(ngModel)] work?",
    "easy",
    "Two-way binding synchronizes data both ways — component → template and template → component. `[(ngModel)]=\"property\"` is syntactic sugar for `[ngModel]=\"property\" (ngModelChange)=\"property=$event\"`. Requires `FormsModule`. When the input value changes, `ngModelChange` fires and updates the property. Ideal for form inputs."
  ],
  [
    "What is a directive in Angular? Name the built-in structural directives.",
    "easy",
    "A directive is a class with a `@Directive` decorator that adds behavior to elements. Three types: components (directive with template), structural directives (alter DOM layout — `*ngIf`, `*ngFor`, `*ngSwitch`), and attribute directives (change appearance/behavior — `ngClass`, `ngStyle`, `ngModel`). Structural directives are preceded by `*` and control DOM structure."
  ],
  [
    "What does *ngIf do and how is it different from [hidden]?",
    "easy",
    "`*ngIf=\"condition\"` removes/adds the element from the DOM based on truthiness. `[hidden]=\"condition\"` only sets `display: none` via CSS. `*ngIf` is better for performance (no hidden DOM elements, no leftover bindings). `[hidden]` keeps the element in the DOM (may affect layout). Use `*ngIf` when you want to conditionally render heavy components."
  ],
  [
    "What does *ngFor do and what is trackBy?",
    "easy",
    "`*ngFor=\"let item of items\"` iterates over a collection and renders template for each item. `trackBy` is a function that returns a unique identifier for each item (e.g., `trackByFn(index, item) => item.id`). It helps Angular identify which items changed/added/removed — avoiding DOM re-creation on every change. Critical for list performance with mutable data."
  ],
  [
    "What is *ngSwitch used for?",
    "easy",
    "`*ngSwitch=\"expression\"` is a structural directive that conditionally renders elements matching a value. Used with `*ngSwitchCase=\"value\"` and `*ngSwitchDefault`. Example: `<div [ngSwitch]=\"color\"><p *ngSwitchCase=\"'red'\">Red</p><p *ngSwitchDefault>Other</p></div>`. Only the matching case is added to the DOM."
  ],
  [
    "What is a pipe in Angular? Name five built-in pipes.",
    "easy",
    "A pipe transforms data in templates using the `|` syntax. Built-in pipes: `date` (format dates), `uppercase`/`lowercase` (string case), `currency` (format money), `percent` (format ratio), `json` (serialize objects), `slice` (extract array/string portions), `async` (unwraps Observables/Promises). Pipes can be chained: `{{ value | date | uppercase }}`."
  ],
  [
    "How do you use the date pipe in Angular?",
    "easy",
    "The `date` pipe formats a date value. Syntax: `{{ dateValue | date:'format' }}`. Formats: `'short'` (M/d/yy, h:mm), `'medium'` (MMM d, y, h:mm:ss), `'long'`, `'full'`, or custom patterns like `'dd/MM/yyyy'`. You can pass timezone: `{{ value | date:'short':'UTC' }}`. Example: `{{ today | date:'fullDate' }}` produces \"Monday, June 15, 2026\"."
  ],
  [
    "What is the async pipe and why is it preferred?",
    "easy",
    "The `async` pipe automatically subscribes to an Observable or Promise and returns the latest emitted value. It handles subscription cleanup on component destroy (prevents memory leaks). Example: `{{ data$ | async }}`. For Observables, use with `*ngIf` to handle null values: `<div *ngIf=\"data$ | async as data\">{{ data.name }}</div>`. Reduces boilerplate compared to manual subscribe/unsubscribe."
  ],
  [
    "What is a service in Angular?",
    "easy",
    "A service is a class focused on a specific concern — data access, logging, business logic, or utility functions. Typically decorated with `@Injectable`. Services promote reusability, separation of concerns, and testability. They are injected into components via dependency injection. Example: `@Injectable() export class DataService { fetchUsers() { ... } }`."
  ],
  [
    "What is dependency injection in Angular?",
    "easy",
    "DI is a design pattern where a class receives its dependencies from an external source rather than creating them itself. Angular's DI system provides services declaratively via constructors: `constructor(private dataService: DataService) {}`. The injector creates and caches service instances. Hierarchical DI allows different injectors at module/component level."
  ],
  [
    "What is the @Injectable decorator?",
    "easy",
    "`@Injectable()` marks a class as available for dependency injection. It generates metadata that Angular uses to resolve parameters. With `providedIn: 'root'`, the service is tree-shakable (only included in bundle if used) and registered as a singleton at root level. Alternative: list it in `providers` array of a module/component."
  ],
  [
    "How do you pass data from parent to child component?",
    "easy",
    "Use the `@Input()` decorator on the child's property. The parent binds using property binding: `<child [inputData]=\"parentProperty\"></child>`. The child declares `@Input() inputData: type;`. Angular updates the child whenever the parent property changes. Use setters or `ngOnChanges` for reacting to input changes."
  ],
  [
    "How does a child component emit events to its parent? (@Output)",
    "easy",
    "The child uses `@Output()` with an `EventEmitter`. Example: `@Output() itemSelected = new EventEmitter<number>();`. Emit: `this.itemSelected.emit(value);`. The parent listens: `<child (itemSelected)=\"onItemSelected($event)\"></child>`. Angular's `EventEmitter` extends `Subject` and completes when the component is destroyed."
  ],
  [
    "What is Angular CLI and what does ng generate do?",
    "easy",
    "Angular CLI is a command-line tool for creating and managing Angular projects. `ng generate` (or `ng g`) scaffolds code: `ng g component my-component`, `ng g service my-service`, `ng g pipe my-pipe`, `ng g module my-module`, etc. It follows best practices (files, imports, NgModule registration). Speeds up development and ensures consistent project structure."
  ],
  [
    "What is the difference between constructor and ngOnInit?",
    "easy",
    "The constructor is called by JavaScript/TypeScript to create the class instance — should only be used for DI injection. `ngOnInit` is an Angular lifecycle hook called after Angular has initialized all data-bound properties (`@Input`s are available here). Use `ngOnInit` for initialization logic, data fetching, and setup. Never do heavy work in the constructor."
  ],
  [
    "What is router-outlet in Angular?",
    "easy",
    "`<router-outlet>` is an Angular directive that acts as a placeholder — it marks where the routed component should be displayed. Angular dynamically inserts/removes components matching the current route into this outlet. Supports nested outlets for child routes. You can name outlets for auxiliary routing."
  ],
  [
    "What is routerLink and how is it different from href?",
    "easy",
    "`routerLink` is an Angular directive for navigation without page reload. Example: `<a [routerLink]=\"['/users', userId]\">`. Unlike `href` (which triggers full page reload and loses application state), `routerLink` uses the Angular Router to update the URL and swap components. `routerLinkActive=\"active\"` conditionally applies CSS class when the link is active."
  ],
  [
    "What are the four NgModule arrays: declarations, imports, providers, exports?",
    "easy",
    "`declarations`: components, directives, and pipes that belong to THIS module. `imports`: other modules whose exported components/directives/pipes are needed. `providers`: services registered with the module's injector. `exports`: subset of declarations available to modules that import THIS module. Only `declarations` items can be exported."
  ],
  [
    "What is the difference between template-driven and reactive forms?",
    "easy",
    "Template-driven: form logic in template (using `ngModel`, `#ref`), easier for simple forms, asynchronous, less scalable. Reactive forms: form model defined explicitly in component (FormGroup, FormControl), synchronous, more testable, better validation, complex form support. Reactive forms are preferred for most applications."
  ],
  [
    "What is ngModel in template-driven forms?",
    "easy",
    "`ngModel` creates a `FormControl` instance from the DOM element automatically. With two-way binding: `<input [(ngModel)]=\"name\">`. Without banana syntax: `<input [ngModel]=\"name\" (ngModelChange)=\"name=$event\">`. Requires `FormsModule`. For tracking form state, use template reference: `#myForm=\"ngForm\"`."
  ],
  [
    "What is FormControl and how do you create one?",
    "easy",
    "`FormControl` tracks the value and validation state of an individual form input. Created programmatically: `const name = new FormControl('initialValue', [Validators.required]);`. In reactive forms: `this.form = new FormGroup({ email: new FormControl('') });`. Provides `value`, `status`, `valid`, `touched`, `errors`, and `valueChanges` Observable."
  ],
  [
    "What is FormGroup?",
    "easy",
    "`FormGroup` is a group of `FormControl` instances tracked as one unit. It aggregates the value and validation status of its children. Example: `this.profileForm = new FormGroup({ firstName: new FormControl(''), lastName: new FormControl('') })`. Access values: `this.profileForm.value`. Validation passes only when all child controls are valid."
  ],
  [
    "What does providedIn: 'root' mean on a service?",
    "easy",
    "`providedIn: 'root'` in `@Injectable({ providedIn: 'root' })` registers the service with the root injector — making it a singleton across the entire application. It enables tree-shaking: if the service is never injected, it's excluded from the bundle. This is the preferred way to provide services since Angular 6."
  ],

  // ── Medium ────────────────────────────────────────────────────────────────
  [
    "What are Angular lifecycle hooks and in what order do they run?",
    "med",
    "Lifecycle hooks run in this order: `ngOnChanges` → `ngOnInit` → `ngDoCheck` → `ngAfterContentInit` → `ngAfterContentChecked` → `ngAfterViewInit` → `ngAfterViewChecked` → `ngOnDestroy`. `ngOnChanges` fires whenever @Input properties change (first call before ngOnInit). `ngDoCheck` runs during every change detection cycle. `ngAfterViewInit` fires once after the view is fully initialized. `ngOnDestroy` fires just before component destruction."
  ],
  [
    "What is ngOnChanges and when does it fire?",
    "med",
    "`ngOnChanges(changes: SimpleChanges)` fires when ANY `@Input` property changes. It receives a map of `SimpleChange` objects containing `previousValue`, `currentValue`, and `firstChange`. Fires before `ngOnInit` on first change detection. Use for reacting to input changes, e.g., resetting internal state when an input changes."
  ],
  [
    "What is ngOnDestroy and why is it important?",
    "med",
    "`ngOnDestroy()` fires just before Angular destroys a component/directive. Use it for cleanup: unsubscribing Observables, detaching event handlers, clearing intervals/timeouts, aborting HTTP requests (via AbortController), and detaching change detector refs. Failure to unsubscribe causes memory leaks and unwanted callbacks after component removal."
  ],
  [
    "What is ngAfterViewInit and when would you use it?",
    "med",
    "`ngAfterViewInit()` fires once after Angular fully initializes the component's view and child views. Use when you need to access child components via `@ViewChild` (which is undefined before this hook). Common uses: initialize third-party UI libraries that need DOM elements, set focus on an input, adjust layout based on rendered content."
  ],
  [
    "What is the difference between @ViewChild and @ContentChild?",
    "med",
    "`@ViewChild` queries elements/components from the component's own view (template). `@ContentChild` queries projected content from the parent (via `<ng-content>`). Both are available in `ngAfterViewInit` and `ngAfterContentInit` respectively. Use `@ViewChild` for template refs, `@ContentChild` for projected child access."
  ],
  [
    "What is ng-content and how does content projection work?",
    "med",
    "`<ng-content></ng-content>` is a placeholder for projected content — parent components pass HTML between the child's tags. Supports multiple slots via `select` attribute: `<ng-content select=\"[header]\"></ng-content>`. Projected content uses the PARENT'S (not child's) component context. Content projection enables reusable layout components."
  ],
  [
    "What is a template reference variable? How do you use #ref?",
    "med",
    "A template reference variable (`#myVar`) gives access to a DOM element, directive, or component from within the template. Example: `<input #myInput>` lets you reference `myInput.value` elsewhere in the template. `#myForm=\"ngForm\"` gets the NgForm instance. Pass to events: `<button (click)=\"log(myInput.value)\">`. Access in component via `@ViewChild('myInput')`."
  ],
  [
    "What is the safe navigation operator (?.) in Angular templates?",
    "med",
    "The safe navigation operator `?.` (also called Elvis operator) prevents errors when accessing properties of `null` or `undefined` objects. Example: `{{ user?.address?.city }}` returns `undefined` instead of throwing if `user` or `address` is null. Alternative: use `*ngIf` or `??` (nullish coalescing): `{{ user?.address?.city ?? 'Unknown' }}`."
  ],
  [
    "What is the difference between structural and attribute directives?",
    "med",
    "Structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`) modify the DOM structure — add/remove/replace elements. They use the `*` prefix syntax which de-sugars into `<ng-template>`. Attribute directives (`ngClass`, `ngStyle`, `ngModel`) change the appearance or behavior of an element without altering DOM structure. Custom attribute directives use `@Directive` with `ElementRef` and `Renderer2`."
  ],
  [
    "How do you create a custom attribute directive?",
    "med",
    "Use `@Directive({ selector: '[appHighlight]' })`. Inject `ElementRef` and `Renderer2`. Implement `@HostListener` for events and `@HostBinding` for property bindings. Example: `@Directive({ selector: '[appHighlight]' }) export class HighlightDirective { constructor(private el: ElementRef, private renderer: Renderer2) {} @HostListener('mouseenter') onMouseEnter() { this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow'); } }`. Apply as `<p appHighlight>Text</p>`."
  ],
  [
    "How do you create a custom pipe?",
    "med",
    "Use `@Pipe({ name: 'myPipe' })` and implement `PipeTransform` interface with a `transform(value, ...args)` method. Example: `@Pipe({ name: 'truncate' }) export class TruncatePipe implements PipeTransform { transform(value: string, maxLength: number = 20): string { return value.length > maxLength ? value.slice(0, maxLength) + '...' : value; } }`. Add to NgModule `declarations`. Use: `{{ text | truncate:50 }}`."
  ],
  [
    "What is a pure vs impure pipe? When would you use an impure pipe?",
    "med",
    "Pure pipes (default: `pure: true`) only re-evaluate when their input reference changes — efficient, uses simple comparison. Impure pipes (`pure: false`) run on every change detection cycle. Use impure pipes for arrays/objects that mutate internally (e.g., filtering a list as the user types). Warning: impure pipes are expensive — use sparingly or switch to reactive pipes with `async`."
  ],
  [
    "What is ChangeDetectionStrategy.OnPush and how does it improve performance?",
    "med",
    "`OnPush` tells Angular to skip change detection for a component unless: 1) An `@Input` property reference changes (immutable update). 2) An event originates from the component or its children. 3) An Observable bound with `async` pipe emits. 4) `markForCheck()` is called explicitly. Reduces unnecessary checks, making apps faster. Requires immutable data patterns — never mutate inputs, always create new references."
  ],
  [
    "What are RxJS Observables and how do they differ from Promises?",
    "med",
    "Observables are lazy collections of multiple values over time. Promises: single value, eager (start executing immediately), not cancellable. Observables: multiple values, lazy (execute when subscribed), cancellable via `unsubscribe()`. Observables have operators (`.map`, `.filter`, `.switchMap`) for transformation. Angular uses Observables heavily (HttpClient, forms, router)."
  ],
  [
    "What is the difference between Subject, BehaviorSubject, and ReplaySubject?",
    "med",
    "Subject: multicast Observable — no initial value, only emits new values to current subscribers. BehaviorSubject: requires initial value, replays the LAST value to new subscribers. ReplaySubject: replays a buffer of N previous values to new subscribers. Use case: Subject for ephemeral events, BehaviorSubject for state (default value), ReplaySubject for caching recent N emissions."
  ],
  [
    "What are common RxJS operators? Explain map, filter, switchMap, mergeMap.",
    "med",
    "`map` transforms each emitted value. `filter` passes through values that satisfy a condition. `switchMap` maps to a new inner Observable, canceling the previous one — ideal for search (autocomplete) where only the latest request matters. `mergeMap` (flatMap) maps to inner Observables and merges all emissions interleaved — use when order doesn't matter (multiple independent API calls)."
  ],
  [
    "What does the takeUntil operator do and how does it prevent memory leaks?",
    "med",
    "`takeUntil(notifier$)` completes an Observable when the `notifier$` emits. Used for auto-cleanup: create a `destroy$ = new Subject<void>()`, pipe `.pipe(takeUntil(this.destroy$))` on all subscriptions, then `this.destroy$.next(); this.destroy$.complete();` in `ngOnDestroy`. This ensures all subscriptions are automatically cleaned up when the component is destroyed."
  ],
  [
    "What is an HTTP interceptor and what can you do with it?",
    "med",
    "An HTTP interceptor (implements `HttpInterceptor`) intercepts HTTP requests/responses globally. Use cases: add Authorization headers, log requests, handle error responses globally, transform requests/responses, show/hide loading spinner, retry failed requests. Register via `HTTP_INTERCEPTORS` multi-provider. Example: `intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>`."
  ],
  [
    "How do you handle HTTP errors globally in Angular?",
    "med",
    "Create an interceptor that catches errors using `.pipe(catchError(error => { ... }))`. Check `error.status` for specific HTTP codes. For 401: redirect to login. For 500: show generic error toast. Re-throw with `throwError()` for local error handling. Use `RetryInterceptor` to retry failed requests with exponential backoff. `HttpClient` wraps errors in `HttpErrorResponse`."
  ],
  [
    "What does Angular's HttpClient return and how do you consume it?",
    "med",
    "`HttpClient` methods return an `Observable<HttpResponse<T>>` by default, but you typically access the deserialized body via generic types: `this.http.get<User[]>('/api/users')`. Requests are cold — they only execute when subscribed. Use `async` pipe in templates for automatic subscribe/unsubscribe, or `.subscribe()` in components with proper cleanup."
  ],
  [
    "What are route guards? Explain CanActivate.",
    "med",
    "Route guards control navigation to/from routes. `CanActivate` — determines if a route can be activated (e.g., user is authenticated). Returns `boolean`, `UrlTree` (redirect), or `Observable<boolean | UrlTree>`. Other guards: `CanActivateChild`, `CanDeactivate`, `CanLoad`, `Resolve`. In modern Angular, use functional guards (`CanActivateFn`) instead of class-based: `export const authGuard: CanActivateFn = (route, state) => { return inject(AuthService).isLoggedIn(); }`."
  ],
  [
    "What is ActivatedRoute and how do you read route parameters?",
    "med",
    "`ActivatedRoute` contains information about the currently active route — params, data, queryParams, fragments. Read route params: `this.route.params.subscribe(params => this.id = params['id'])` or with `paramMap`: `this.route.paramMap.subscribe(map => this.id = map.get('id'))`. For snapshot (on init): `this.route.snapshot.paramMap.get('id')`. Uses `paramMap` for consistent API (supports multiple params of same name)."
  ],
  [
    "How do you pass query parameters in Angular routing?",
    "med",
    "Using `Router.navigate`: `this.router.navigate(['/users'], { queryParams: { page: 1, sort: 'name' } })`. Using `routerLink`: `<a [routerLink]=\"['/users']\" [queryParams]=\"{page: 1}\">`. Read via `ActivatedRoute`: `this.route.queryParamMap.subscribe(params => console.log(params.get('page')))`. Access snapshot: `this.route.snapshot.queryParams`. Merge with `queryParamsHandling: 'merge'` to preserve existing query params."
  ],
  [
    "What are child routes in Angular?",
    "med",
    "Child routes are routes nested within a parent route, defined using `children` in route config. The parent template includes `<router-outlet></router-outlet>` where child components render. Example: `{ path: 'users', component: UsersComponent, children: [ { path: ':id', component: UserDetailComponent }, { path: '', component: UserListComponent } ] }`. Enables hierarchical UI with shared layout."
  ],
  [
    "How do you lazy load a feature module in Angular?",
    "med",
    "In the route config, use `loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)`. For standalone components: `loadComponent: () => import('./admin.component').then(c => c.AdminComponent)`. The module/component is only loaded when the user navigates to that route, reducing initial bundle size. Generated as a separate chunk by the bundler."
  ],
  [
    "What is a Resolver in Angular routing?",
    "med",
    "A Resolver pre-fetches data BEFORE navigating to a route. Implements `Resolve<T>` interface with `resolve()` method returning data as Observable/Promise. Register in route config under `resolve: { data: MyResolver }`. Access resolved data via `ActivatedRoute.snapshot.data['data']`. Use cases: loading essential data (user profile) before rendering. Warning: navigation is blocked until data loads — provide loading states with `loading` guard or skeleton screens."
  ],
  [
    "What are Validators in Reactive Forms?",
    "med",
    "Validators are functions that validate FormControl/FormGroup values. Built-in: `Validators.required`, `Validators.minLength(3)`, `Validators.maxLength(100)`, `Validators.email`, `Validators.pattern(/^[a-z]+$/)`, `Validators.min(0)`, `Validators.max(100)`. Apply via array: `new FormControl('', [Validators.required, Validators.email])`. Custom validators return `null` (valid) or `{ errorName: true }` (invalid)."
  ],
  [
    "How do you add custom validators to a FormControl or FormGroup?",
    "med",
    "A custom validator is a function that takes a `FormControl` (or `AbstractControl`) and returns `ValidationErrors | null`. Example: `function noSpaces(control: AbstractControl): ValidationErrors | null { return (control.value || '').includes(' ') ? { noSpaces: true } : null; }`. For FormGroup validators (cross-field), use `(group: FormGroup) => { ... }`. Async validators return `Promise<ValidationErrors | null>` or `Observable<ValidationErrors | null>`."
  ],
  [
    "What is FormArray and when would you use it?",
    "med",
    "`FormArray` tracks an array of FormControl/FormGroup/FormArray instances as one unit. Useful for dynamic lists (adding/removing items). Example: `this.skills = new FormArray([ new FormControl(''), new FormControl('') ]);`. Iterate: `this.skills.controls.forEach(...)`. Add: `this.skills.push(new FormControl(''))`. Remove: `this.skills.removeAt(index)`. `<div formArrayName=\"skills\">` binds in template."
  ],
  [
    "What is the difference between valueChanges and statusChanges on a form?",
    "med",
    "`valueChanges` is an Observable that emits the current value whenever the form/control value changes. `statusChanges` emits the validation status (`VALID`, `INVALID`, `PENDING`, `DISABLED`). Both fire on every form interaction. Use `valueChanges` to react to data changes (debounce for API calls). Use `statusChanges` for global form validation checks or enabling/disabling save buttons."
  ],
  [
    "What is standalone component in Angular (v14+)?",
    "med",
    "Standalone components have `standalone: true` in `@Component` and don't need to be declared in an NgModule. They directly import dependencies via `imports` array in the decorator. Can be bootstrapped directly with `bootstrapApplication(AppComponent, { providers: [...] })`. Simplifies project structure, reduces boilerplate, and enables lazy loading without NgModules. The default in Angular 17+."
  ],
  [
    "What is the difference between ViewEncapsulation strategies?",
    "med",
    "`Emulated` (default): styles scoped via attribute selectors — no Shadow DOM. `ShadowDom`: uses native browser Shadow DOM (true encapsulation, no leaks either way). `None`: styles are global (no encapsulation). Use `ShadowDom` for web components or third-party embedding. Use `Emulated` for most apps. Use `None` sparingly (e.g., for shared styles that should be global)."
  ],
  [
    "What is ngZone and what does zone.js do in Angular?",
    "med",
    "`zone.js` patches async APIs (setTimeout, addEventListener, Promise, XHR) to notify Angular when to run change detection. `NgZone` is the Angular service wrapping zone.js. Use `ngZone.runOutsideAngular(() => {...})` to run code outside Angular (avoid unnecessary change detection for high-frequency events like scroll/mousemove). Use `ngZone.run(() => {...})` to re-enter Angular after outside work."
  ],
  [
    "How do you communicate between sibling components in Angular?",
    "med",
    "Options: 1) Shared service with a `BehaviorSubject` in `providedIn: 'root'` — both siblings inject the service and communicate via the subject. 2) Parent mediates via `@Input`/`@Output` — parent passes data and listens for events. 3) NgRx or other state management for complex state. 4) `@ViewChild` to access a sibling's public API (tight coupling, avoid). 5) Router params for route-based siblings."
  ],
  [
    "What is the InjectionToken and when would you use it?",
    "med",
    "`InjectionToken<T>` creates a token for DI that avoids collisions (unlike string tokens). Use for: non-class dependencies (config objects, functions), primitive values, or when you need a named provider: `const API_URL = new InjectionToken<string>('api.url');`. Provide: `{ provide: API_URL, useValue: 'https://api.example.com' }`. Inject: `constructor(@Inject(API_URL) private apiUrl: string) {}`."
  ],
  [
    "How does the Angular DI hierarchy work (root, module, component)?",
    "med",
    "Angular has a hierarchical injector system. If a service is `providedIn: 'root'`, a single instance is available everywhere. If provided in `@NgModule.providers`, the service is available to all components in that module (and its imports). If provided in `@Component.providers`, a NEW instance is created for each component instance (not available to children). The injector looks up the hierarchy until found."
  ],

  // ── Hard ──────────────────────────────────────────────────────────────────
  [
    "How does Angular change detection work under the hood?",
    "hard",
    "Angular uses Zone.js to monkey-patch all browser async APIs. When any async event fires (click, XHR, setTimeout), Zone.js triggers `ApplicationRef.tick()`, which runs change detection from the root component down the component tree. Angular compares each bound expression's current value with the previous one (via strict reference check). For `Default` strategy, it checks ALL components. For `OnPush`, it only checks the component and its children if inputs changed, events fired, or `async` pipe emitted."
  ],
  [
    "What is the difference between Default and OnPush change detection strategies?",
    "hard",
    "`Default`: Angular checks every component on every change detection cycle regardless of whether inputs changed — can be slow for large component trees. `OnPush`: only checks the component and its subtree when: @Input reference changes (new object), an event fires within the component, an `async` pipe emits, or `markForCheck()` is called. `OnPush` drastically reduces checks but requires immutable data patterns (always create new arrays/objects instead of mutating)."
  ],
  [
    "Why does mutating an array input not trigger OnPush change detection?",
    "hard",
    "`OnPush` uses reference equality to detect input changes. Array.push() mutates the same array reference — Angular sees the same reference, assumes no change, and skips checking. Fix: create a new array reference: `this.items = [...this.items, newItem]`. For existing mutations, call `this.cdr.markForCheck()` after mutating, or use `BehaviorSubject` with `async` pipe."
  ],
  [
    "What is markForCheck() vs detectChanges() on ChangeDetectorRef?",
    "hard",
    "`markForCheck()` schedules the component and its ancestors for change detection on the next cycle (no immediate run). Safe to call anywhere, doesn't cause `ExpressionChangedAfterItHasBeenChecked` errors. `detectChanges()` runs change detection IMMEDIATELY on this component and its children — can cause the ExpressionChanged error if called at the wrong time. Use `markForCheck()` in most cases; use `detectChanges()` only when you need an immediate update (e.g., after async operation outside Angular's zone)."
  ],
  [
    "What is the difference between cold and hot observables?",
    "hard",
    "Cold: starts emitting only when subscribed to, each subscriber gets the full sequence independently (like `HttpClient` calls, `of`, `from`). Hot: emits regardless of subscribers, shares the same sequence (like `fromEvent`, `Subject`, `BehaviorSubject`). Cold observables create a new producer per subscription. Hot observables share a producer. Use `shareReplay(1)` to convert cold to hot (share and replay last value)."
  ],
  [
    "What is the difference between switchMap, mergeMap, concatMap, and exhaustMap?",
    "hard",
    "`switchMap`: maps to inner observable, cancels previous inner when new outer emits (autocomplete). `mergeMap`: maps to inner, runs all in parallel, emits interleaved (order NOT preserved). `concatMap`: queues inner observables, runs sequentially one at a time (order preserved). `exhaustMap`: ignores new outer emissions while inner is running (button clicks, login). Choose based on desired concurrency behavior."
  ],
  [
    "How do you prevent memory leaks from RxJS subscriptions?",
    "hard",
    "Three strategies: 1) `async` pipe in templates (automatic subscribe/unsubscribe). 2) `takeUntil(destroy$)` pattern: `this.service.data$.pipe(takeUntil(this.destroy$)).subscribe()`, then call `destroy$.next()` in `ngOnDestroy`. 3) `take(1)` for one-shot observables. 4) Use `| async` with `let` variable for Observable data. 5) Modern: `takeUntilDestroyed()` operator (Angular 16+) — automatically completes when the component is destroyed."
  ],
  [
    "What is shareReplay() and when should you use it?",
    "hard",
    "`shareReplay(count)` multicasts an Observable — shares the source subscription among multiple subscribers and replays the last `count` emissions to late subscribers. Use for caching HTTP responses: `this.data$ = this.http.get('/api/data').pipe(shareReplay(1))`. All subscribers share one HTTP request and get the cached result. `shareReplay({ bufferSize: 1, refCount: true })` unsubscribes when all subscribers are gone (prevents memory leaks)."
  ],
  [
    "What are Angular Signals (v16+)? How do they differ from RxJS?",
    "hard",
    "Signals are a reactive primitive for managing state in Angular. A signal (`const count = signal(0)`) holds a value and notifies consumers when it changes. `computed()` derives values from other signals. `effect()` runs side effects when signals change. Signals are synchronous, simple, and work seamlessly with Angular's change detection (no Zone.js needed). RxJS is better for async streams, complex compositions, and operators. Signals are replacing Zone.js for change detection in Angular 17+."
  ],
  [
    "What is signal(), computed(), and effect() in Angular?",
    "hard",
    "`signal(initialValue)` creates a writable signal — read with `signal()`, write with `signal.set(value)` or `signal.update(fn)`. `computed(() => expression)` creates a read-only signal that derives its value from other signals (recomputed lazily only when dependencies change). `effect(() => { ... })` runs a function whenever any signal it reads changes — runs once initially and again on dependency changes. Used for side effects (logging, saving to localStorage)."
  ],
  [
    "What is Angular Universal and how does SSR work?",
    "hard",
    "Angular Universal enables server-side rendering (SSR). The server runs the Angular app, renders HTML for the initial page, and sends it to the browser (faster initial load, SEO). After HTML loads, the client-side Angular app bootstraps (hydration) to become interactive. Configured via `@nguniversal/express-engine` or the Node.js SSR with `provideClientHydration()`. Improves Core Web Vitals (LCP, FCP)."
  ],
  [
    "What is hydration in Angular Universal?",
    "hard",
    "Hydration is the process where the client-side Angular app reuses existing server-rendered DOM instead of destroying and re-creating it. Enabled via `provideClientHydration()`. Benefits: avoids flash of content, preserves user interactions, reduces work. Angular matches server-generated DOM nodes with client component instances during bootstrap. Hydration mismatch occurs if server and client HTML differ."
  ],
  [
    "How does Angular's Ivy compiler differ from the old View Engine?",
    "hard",
    "Ivy (Angular 9+) replaced View Engine. Benefits: smaller bundle sizes (tree-shakable, incremental compilation), faster compilation (ngc → ngtsc), better debugging (type-checked templates, clearer error messages), improved metaprogramming (NgModules are optional), faster testing (TestBed with Ivy is faster). Ivy compiles each component independently rather than globally — enables lazy loading and code splitting."
  ],
  [
    "What is tree-shaking in Angular and how does Ivy improve it?",
    "hard",
    "Tree-shaking eliminates unused code from the final bundle. Ivy improves tree-shaking by compiling components into standalone instructions that can be independently removed — if a component is not used, its code is excluded. View Engine generated global metadata that was harder to shake. Ivy also enables `providedIn: 'root'` (services tree-shaken if not injected) and standalone components (less NgModule overhead)."
  ],
  [
    "What is the Angular compilation model (JIT vs AOT)?",
    "hard",
    "JIT (Just-in-Time): compiles templates in the browser at runtime — larger bundle (compiler included), slower startup. AOT (Ahead-of-Time): compiles templates during build — smaller bundle, faster rendering, detects template errors at build time, more secure (no eval). Angular 9+ uses AOT by default (ng build --aot). `ng serve` uses JIT for faster rebuilds. AOT is required for production."
  ],
  [
    "What are preloading strategies for lazy loaded modules?",
    "hard",
    "Preloading starts loading lazy modules in the background after the initial bundle loads. Strategies: `PreloadAllModules` — loads ALL lazy routes after initial load. `QuicklinkStrategy` (from `ngx-quicklink`) — preloads routes visible in the viewport. Custom: implement `PreloadingStrategy` interface with a `preload(route, load)` method — decide based on route data (`data: { preload: true }`). Balances initial load time with navigation speed."
  ],
  [
    "How do you implement a canDeactivate guard to warn about unsaved changes?",
    "hard",
    "Implement a `CanDeactivate` interface. Example: `export interface HasUnsavedChanges { hasUnsavedChanges(): boolean; }`. Guard: `canDeactivate(component: HasUnsavedChanges) { return !component.hasUnsavedChanges() || confirm('You have unsaved changes. Discard?'); }`. In the component, implement `hasUnsavedChanges() { return this.form.dirty; }`. For async dialogs, return `Observable<boolean>`."
  ],
  [
    "What is NgRx? Explain the Actions → Reducers → Store → Selectors flow.",
    "hard",
    "NgRx is a state management library for Angular based on Redux principles. Flow: Component dispatches an `Action` (object with type and payload). The `Reducer` (pure function) receives current state and action, returns new state (immutable update). The new state is stored in the `Store` (single source of truth). `Selectors` (pure functions) query slices of state using memoized selectors (`createSelector`). Components subscribe to selectors to reactively update."
  ],
  [
    "What are NgRx Effects and how do they handle side effects?",
    "hard",
    "Effects handle external interactions (API calls, localStorage, WebSockets) as side effects of dispatched actions. An effect listens for an action, performs async work, and dispatches new actions (success/failure). Example: `loadItems$ = createEffect(() => this.actions$.pipe(ofType('[Items] Load'), switchMap(() => this.api.getItems().pipe(map(items => LoadItemsSuccess({ items }))))))`. Effects are long-running services that start on app bootstrap."
  ],
  [
    "What is NgRx Entity and how does it simplify collection state?",
    "hard",
    "NgRx Entity provides helpers for managing collections in the store. It provides `createEntityAdapter` with CRUD operations (`addOne`, `removeOne`, `updateOne`, `upsertOne`, `setAll`). Manages `ids: string[]` (sorted) and `entities: Dictionary<T>` for normalized state. Selectors: `selectAll`, `selectTotal`, `selectById`. Reduces boilerplate for managing collections — sorting, filtering, pagination built-in."
  ],
  [
    "What is the difference between NgRx and Akita or NGXS?",
    "hard",
    "NgRx: based on Redux (actions, reducers, effects), more boilerplate, highly structured, large ecosystem. Akita: simpler API, less boilerplate, entity management built-in, inspired by Observable data stores. NGXS: uses classes/decorators for actions, simpler than NgRx, less boilerplate, integrated state/actions. NgRx is most popular for large enterprise apps; NGXS/Akita for smaller teams wanting less ceremony."
  ],
  [
    "How do you implement optimistic updates in Angular with NgRx?",
    "hard",
    "Optimistic update: update the store immediately (before API response), then handle rollback on failure. Flow: 1) Dispatch `UpdateItem` action. 2) Reducer updates state immediately. 3) Effect calls API. 4) On success — dispatch success (no state change needed). 5) On failure — dispatch failure with the previous state, reducer rolls back. Optionally show a snackbar/tooltip explaining the error."
  ],
  [
    "What is the Angular CDK and what does it provide?",
    "hard",
    "The Component Dev Kit (CDK) is a set of behavior primitives for building UI components. Provides: `Overlay` (floating panels), `A11y` (keyboard navigation, live announcer), `Platform` (platform detection), `Observers` (ResizeObserver/CDK), `Scrolling` (virtual scroll), `Layout` (breakpoint observer), `Drag and Drop`, `Table` (data source), `Portal` (dynamic content rendering), `Tree`, `Text field` (autosize textarea). No pre-built UI components — just building blocks."
  ],
  [
    "What is virtual scrolling and how does CDK ScrollingModule work?",
    "hard",
    "Virtual scrolling renders only visible items in a scrollable list — drastically reduces DOM size. `@angular/cdk/scrolling` provides `<cdk-virtual-scroll-viewport itemSize=\"50\">`. Uses `*cdkVirtualFor` instead of `*ngFor`. Viewport measures scroll position and renders only items within the visible area + buffer. Virtual scroll handles thousands of items efficiently where `*ngFor` would freeze the UI."
  ],
  [
    "What is the Overlay CDK and how is it used?",
    "hard",
    "`@angular/cdk/overlay` provides flexible floating panel positioning. Handles: scroll strategies (close/reposition on scroll), position strategies (connected to element, centered), backdrop customization, keyboard escape. Used by Angular Material components (dialog, menu, tooltip, dropdown). Example: `this.overlay.create({ positionStrategy: this.overlay.position().flexibleConnectedTo(origin).withPositions([...]), scrollStrategy: this.overlay.scrollStrategies.reposition() })`."
  ],
  [
    "How do you dynamically create and destroy components in Angular?",
    "hard",
    "Use `ViewContainerRef.createComponent()` (inject a template reference via `@ViewChild('container', { read: ViewContainerRef }) vcr;`). Dynamically load: `const componentRef = this.vcr.createComponent(MyComponent)`. Pass inputs: `componentRef.instance.someInput = value`. Destroy: `componentRef.destroy()`. For dynamic components in lazy modules, `createComponent` supports `NgModuleRef` for component resolution."
  ],
  [
    "What is ViewContainerRef and how is it used for dynamic components?",
    "hard",
    "`ViewContainerRef` is a reference to a view container — a DOM element where Angular can attach/detach components. Accessed via `@ViewChild('target', { read: ViewContainerRef })`. Methods: `createComponent<T>(component, options?)` — creates and inserts a component; `insert(viewRef)` — inserts existing view; `clear()` — removes all views; `indexOf(viewRef)` — get index. Essential for dynamic template rendering and component injection."
  ],
  [
    "What is ng-template, TemplateRef, and how does *ngIf use ng-template internally?",
    "hard",
    "`<ng-template>` defines a template that is NOT rendered unless explicitly used. Angular's structural directives (`*ngIf`, `*ngFor`) are syntactic sugar for `<ng-template>` wrappers. `*ngIf=\"cond\"` desugars to `<ng-template [ngIf]=\"cond\"><div>...</div></ng-template>`. `TemplateRef` is the class that references the embedded template. `ViewContainerRef.createEmbeddedView(templateRef)` renders it dynamically."
  ],
  [
    "What is the difference between @ContentChild and @ContentChildren?",
    "hard",
    "`@ContentChild` returns the FIRST matching projected content element/directive. `@ContentChildren` returns a `QueryList<T>` of ALL matching elements. `QueryList` is iterable, supports `changes` Observable (emits when projected content changes). Use `@ContentChildren` for multiple projected slots or repeated elements. Both are available from `ngAfterContentInit` lifecycle hook."
  ],
  [
    "What is multi-provider tokens in Angular DI?",
    "hard",
    "Multi-provider (`multi: true`) registers multiple providers for the same token as an array. Used for HTTP_INTERCEPTORS, APP_INITIALIZER, and ROUTES tokens. Example: `{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }`. Multiple interceptors all contribute to the same token. Without `multi: true`, a later provider would override the earlier one."
  ],
  [
    "How does forwardRef work in Angular DI?",
    "hard",
    "`forwardRef(() => SomeClass)` creates a forward reference — used when Angular needs to reference a class that hasn't been defined yet (circular dependency or class ordering issue). Common with `@Inject(forwardRef(() => ParentComponent))` in parent-child DI relationships, or in providers where the token class is defined later in the file."
  ],
  [
    "What is the APP_INITIALIZER token and when would you use it?",
    "hard",
    "`APP_INITIALIZER` is a multi-provider token that runs functions during app initialization BEFORE the app boots. Useful for: loading configuration (API endpoints, feature flags), fetching user session/tokens, initializing third-party SDKs. Example: `{ provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true }`. App bootstrap waits for all initializers to resolve."
  ],
  [
    "How do you write a schematic for Angular CLI?",
    "hard",
    "Schematics automate code generation with `ng generate`. Create a collection (package) with `schema.json` (params definition) and `index.ts` (factory function). The factory receives a `Tree` and `SchemaContext`, uses `Rule` pipelines to transform the tree (create/update files). Use `@schematics/angular` utilities for adding imports, modifying NgModules. Published as npm package. Example: custom `ng g my-schematic:store` generates NgRx boilerplate."
  ],
  [
    "What is the Angular Elements (Web Components) feature?",
    "hard",
    "Angular Elements converts Angular components into native Web Components (Custom Elements) that can be used in ANY framework or even plain HTML. Uses `@angular/elements` with `createCustomElement()`. The component is registered: `customElements.define('my-button', createCustomElement(MyButton, { injector }))`. Inputs/Outputs are automatically mapped to HTML attributes/events. Enables Angular components in non-Angular projects."
  ],
  [
    "How do you profile and debug performance issues in an Angular app?",
    "hard",
    "Use Chrome DevTools Performance tab to record and analyze change detection cycles. Angular DevTools (browser extension) provides component tree, profiler (records change detection time per component), dependency injection tree, and state inspection. Enable `ng.profiler.timeChangeDetection()` in dev mode to measure CD time. Look for: too many `*ngFor` items, missing `trackBy`, frequent change detection (check Zone.js triggers), over-use of impure pipes, large component trees without OnPush."
  ],
  [
    "What are Angular Signals and how do they enable fine-grained reactivity?",
    "hard",
    "Signals provide fine-grained reactivity — when a signal changes, only the components that READ that signal are updated, not the entire component tree. Unlike Zone.js (which runs CD on all components). `computed()` signals are lazily evaluated and only recompute when dependencies change. This enables \"push-based\" change detection: the signal pushes updates directly to consumers, skipping the global CD cycle. Much more efficient for complex UIs."
  ],
  [
    "What is the difference between signal(), computed(), and effect()?",
    "hard",
    "`signal()` — writable state container, read via getter `signal()`, write via `.set()` or `.update()`. `computed()` — derived read-only signal, auto-tracks dependencies, lazy+ memoized (recomputes only when deps change). `effect()` — runs side effects when any consumed signal changes, runs once initially, automatic cleanup (destroyed with component or via `DestroyRef`). Use `signal` for state, `computed` for derived data, `effect` for side effects (logging, sync)."
  ],
  [
    "How does signal-based change detection differ from Zone.js change detection?",
    "hard",
    "Zone.js patches browser APIs — ANY async operation triggers a full component tree check (even if nothing changed). Signal-based: each component tracks which signals it reads. When a signal changes, only the reading component is marked for check (or directly updated with `ChangeDetectionStrategy.OnPush`). No Zone.js needed (smaller bundle, less overhead). Signal components can skip Zone.js entirely via `provideExperimentalZonelessChangeDetection()`."
  ],
  [
    "What is the input() signal API and how does it replace @Input?",
    "hard",
    "`input<T>()` creates a signal-based input: `readonly name = input<string>()`. Parent binds as before: `<child [name]=\"value\">`. Inside the component, read as `this.name()` — it's a signal, so Angular knows when this input is read. Supports defaults: `input(0)`, aliases: `input({ alias: 'myName' })`, and required: `input.required<T>()`. Works seamlessly with OnPush and signal change detection. Replaces `@Input()` in modern Angular."
  ],
  [
    "What is model() in Angular and how does it enable two-way binding with signals?",
    "hard",
    "`model<T>()` creates a signal that supports two-way binding. Like `input()` + `output()` combined. Parent: `<child [(value)]=\"parentValue\" />` or `<child [value]=\"parentValue\" (valueChange)=\"parentValue=$event\" />`. In child: `readonly value = model.required<number>()`. Child updates the parent: `this.value.set(newValue)`. Unlike `input()`, `model()` is writable — changes propagate back to the parent automatically."
  ],
  [
    "What is the output() function and how does it differ from @Output EventEmitter?",
    "med",
    "`output<T>()` creates a typed output without `EventEmitter`. No dependency on `@angular/core`'s EventEmitter (lighter). Simply: `itemSelected = output<number>()`. Emit: `this.itemSelected.emit(value)`. Parent listens: `<child (itemSelected)=\"onSelect($event)\" />`. `output()` is functional (doesn't need decorator metadata), works without class decorator tweaks, and is tree-shakable. Preferred over `@Output()` in modern Angular."
  ],
  [
    "What does the viewChild() signal query return compared to @ViewChild?",
    "hard",
    "`viewChild<T>(SomeComponent)` returns a `Signal<T | undefined>`. Example: `private cmp = viewChild(MyComponent)`. Access: `this.cmp()` returns the component instance or `undefined` (if not yet initialized). No `{ static: true/false }` confusion — always dynamic. `viewChildren()` returns a signal of `ReadonlyArray<T>`. Compared to `@ViewChild` (property set by Angular after view init), signal queries are reactive — accessible in `effect()` or `computed()`."
  ],
  [
    "What is the contentChild() and contentChildren() signal query?",
    "hard",
    "Similar to `viewChild()` but for projected content. `contentChild(MyDirective)` returns `Signal<T | undefined>`. `contentChildren(MyDirective)` returns `Signal<ReadonlyArray<T>>`. Reactive — component reacts when projected content changes. Replaces `@ContentChild`/`@ContentChildren` decorators. Read in `effect()` or computed context."
  ],
  [
    "How does toSignal() bridge an Observable into a signal?",
    "hard",
    "`toSignal(obs$, { initialValue })` converts an Observable into a signal that updates whenever the Observable emits. The signal returns the latest value or initialValue before first emission. The subscription is auto-managed (cleaned up when component is destroyed). Example: `data = toSignal(this.http.get('/api/data'), { initialValue: [] })`. Bridges RxJS streams into the signal world for use in computed/effect."
  ],
  [
    "How does toObservable() convert a signal back into an Observable?",
    "hard",
    "`toObservable(mySignal)` returns an Observable that emits whenever the signal changes. Uses `effect()` internally to track changes. Useful when integrating signal-based state with RxJS operators (debounceTime, switchMap). Example: `searchResults$ = toObservable(this.searchTerm).pipe(debounceTime(300), switchMap(term => this.api.search(term)))`. Creates a bridge from signals to RxJS pipelines."
  ],
  [
    "What is zoneless change detection and how do you enable it?",
    "hard",
    "Zoneless CD removes dependency on Zone.js for change detection. Angular relies on signals, `async` pipe emissions, and explicit change markers to update the view. Enabled with `provideExperimentalZonelessChangeDetection()`. Benefits: smaller bundle (no zone.js polyfill), fewer false-positive CD cycles, simpler mental model. Still experimental — some edge cases require manual `ChangeDetectorRef.markForCheck()`."
  ],
  [
    "What is provideExperimentalZonelessChangeDetection used for?",
    "hard",
    "`provideExperimentalZonelessChangeDetection()` is a provider function that configures Angular to run without Zone.js. Angular only runs change detection when: a signal changes, an `async` pipe receives a value, an event fires in the component, or `markForCheck()` is called. Removes need for zone.js in the bundle. Use in `ApplicationConfig` (standalone): `providers: [provideExperimentalZonelessChangeDetection()]`."
  ],
  [
    "What are standalone components and why are they now the default?",
    "med",
    "Standalone components (`standalone: true`) don't need NgModules. They import dependencies directly in `@Component.imports`. Benefits: less boilerplate, faster compilation (no NgModule analysis), simpler lazy loading (`loadComponent`), tree-shakable, easier testing. Since Angular 17, `ng new` generates standalone apps by default. NgModules are still supported but standalone is the recommended approach."
  ],
  [
    "How does bootstrapApplication differ from bootstrapModule?",
    "med",
    "`bootstrapApplication(AppComponent, config)` bootstraps a standalone root component directly — no NgModule needed. `config` is `ApplicationConfig` with `providers` array. `bootstrapModule(AppModule)` bootstraps via an NgModule. `bootstrapApplication` is simpler, faster (no PlatformRef overhead), and is the modern approach. Replaces `platformBrowserDynamic().bootstrapModule(AppModule)`."
  ],
  [
    "What is provideRouter and how does it replace RouterModule.forRoot?",
    "med",
    "`provideRouter(routes)` is a function that provides the router service configuration in standalone apps. Replaces `RouterModule.forRoot(routes)` in NgModule imports. Can be extended with router features: `provideRouter(routes, withPreloading(PreloadAllModules), withDebugTracing(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))`. Works with `bootstrapApplication`'s providers array."
  ],
  [
    "What is provideHttpClient and how do you register interceptors with it?",
    "med",
    "`provideHttpClient()` provides the `HttpClient` service in standalone apps (replaces `HttpClientModule`). Register interceptors with `withInterceptors([myInterceptorFn])` for functional interceptors or `withInterceptorsFromDi()` for class-based interceptors. Example: `provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]), withFetch())`. `withFetch()` uses the native `fetch` API instead of XHR."
  ],
  [
    "What are functional HTTP interceptors and how do they differ from class-based ones?",
    "hard",
    "Functional interceptors are plain functions (`HttpInterceptorFn`) instead of classes. Simpler: `export const authInterceptor: HttpInterceptorFn = (req, next) => { const token = inject(AuthService).getToken(); const clone = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }); return next(clone); };`. No `HTTP_INTERCEPTORS` multi-provider needed — registered via `withInterceptors([...])`. Functional interceptors are tree-shakable and easier to compose."
  ],
  [
    "What are functional route guards (CanActivateFn) and why are they preferred?",
    "med",
    "Functional guards are plain functions: `export const authGuard: CanActivateFn = (route, state) => { return inject(AuthService).isLoggedIn() || inject(Router).createUrlTree(['/login']); };`. Preferred over class guards because: simpler (no class boilerplate), tree-shakable, use `inject()` for DI (no constructor injection). Registered directly in route config: `{ path: 'admin', canActivate: [authGuard] }`."
  ],
  [
    "What is the new control flow syntax @if, @for, and @switch?",
    "med",
    "Angular 17+ introduced a new block-based control flow: `@if (condition) { ... } @else if (other) { ... } @else { ... }`. `@for (item of items; track item.id) { ... } @empty { <p>No items</p> }`. `@switch (value) { @case 'a' { ... } @default { ... } }`. Better performance (no micro-template creation), better type narrowing in `@if`, built-in `@empty` for `@for`. Replaces `*ngIf`, `*ngFor`, `*ngSwitch`."
  ],
  [
    "Why does @for require a track expression?",
    "med",
    "`@for` requires a `track` expression (e.g., `track item.id`) to efficiently identify each item. Unlike `*ngFor` (where `trackBy` is optional), `@for` enforces it because without tracking, the framework must re-create all DOM elements on every change. Track helps Angular identify inserted/moved/removed items and update only what changed — critical for performance with dynamic lists."
  ],
  [
    "What is the @defer block and how does it enable deferrable views?",
    "hard",
    "`@defer` lazy-loads and renders a block of content when a specified trigger condition is met. Example: `@defer (on viewport) { <heavy-component /> } @placeholder { <div>Loading...</div> } @loading { <spinner /> } @error { <p>Failed</p> }`. Dependencies are code-split into separate chunks. Improves initial bundle size and startup time. Triggers: `on idle` (browser idle), `on viewport` (visible), `on interaction` (user clicks), `on timer(5s)`, `on hover`."
  ],
  [
    "What triggers can a @defer block use (on idle, on viewport, on interaction)?",
    "hard",
    "Triggers for `@defer`: `on idle` — when browser is idle (requestIdleCallback). `on viewport` — when placeholder enters the viewport (IntersectionObserver). `on interaction` — on click/keydown. `on hover` — on mouseenter. `on immediate` — eagerly (immediately after rendering). `on timer(5s)` — after 5 seconds. Multiple triggers: `on viewport; on idle` (whichever comes first). `when condition` — custom boolean trigger. `prefetch on idle` — preloads resources but doesn't render."
  ],
  [
    "What are @placeholder, @loading, and @error blocks in deferred views?",
    "hard",
    "`@placeholder` — displayed while the main content is not yet loaded (min size: 250ms). `@loading` — shown during actual loading (after minimum placeholder time, min duration: 500ms). `@error` — shown if the deferred content fails to load (chunk load error). All are optional. Provides a polished progressive loading experience without manual state management."
  ],
  [
    "What is the inject() function and when do you use it over constructor injection?",
    "med",
    "`inject(SomeToken)` is a function that returns the dependency. Used in: functional guards, interceptors, pipes, and also in component constructors (alternative to constructor params). Useful when you need DI in non-class contexts (functions, `APP_INITIALIZER` factories). In component constructors, `inject()` can be called in the class body: `private dataService = inject(DataService)`. Must be called in injection context (during construction)."
  ],
  [
    "How does inject() enable composable dependency logic in functions?",
    "hard",
    "`inject()` works outside classes — you can create reusable functions that inject services. Example: `export function getCurrentUser() { return inject(AuthService).getCurrentUser(); }`. This function can be called from any component's constructor or property initializer. Enables composable, service-based utilities without class dependency injection boilerplate. Used extensively in functional guards, interceptors, and utility libraries."
  ],
  [
    "What is takeUntilDestroyed and how does it simplify subscription cleanup?",
    "hard",
    "`takeUntilDestroyed()` is an RxJS operator (Angular 16+) that automatically completes an Observable when the component/directive is destroyed. Usage: `this.service.data$.pipe(takeUntilDestroyed()).subscribe(...)`. No need for a manual `destroy$` Subject — Angular handles it. Internally uses `DestroyRef`. Must be called in injection context. Simplifies cleanup and prevents memory leaks with zero boilerplate."
  ],
  [
    "What is DestroyRef and how do you use it for teardown logic?",
    "hard",
    "`DestroyRef` is a service that provides a callback for cleanup on destroy. Injected: `private destroyRef = inject(DestroyRef)`. Register cleanup: `this.destroyRef.onDestroy(() => { /* cleanup code */ })`. Replaces manual `ngOnDestroy` for simple cleanup. Used internally by `takeUntilDestroyed` and `effect()` for automatic cleanup. Available in any injection context."
  ],
  [
    "What is the difference between effect() and computed() for derived state?",
    "hard",
    "`computed()` produces a read-only derived value — it's reactive, memoized, lazy (only recalculates when read and dependencies change). Use for pure transformations (filtering, mapping, combining signals). `effect()` produces side effects — runs imperatively with no return value. Use for logging, saving to localStorage, or triggering non-signal APIs. Never write state changes inside `computed()` — it should be pure."
  ],
  [
    "Why should you avoid writing to signals inside computed()?",
    "hard",
    "`computed()` should be a pure function that only returns a derived value. Writing to signals inside `computed()` can cause infinite loops (reading triggers recomputation which writes which triggers recomputation...). It also makes data flow unpredictable — side effects belong in `effect()`, not `computed()`. Angular actively warns about this in development. Always keep `computed()` read-only."
  ],
  [
    "How do signals interact with OnPush change detection?",
    "hard",
    "Signals integrate naturally with OnPush: when a signal read in a template changes, Angular automatically marks the component for check. No need for `markForCheck()` — the signal framework handles it. This makes OnPush much easier to use (no manual marking). Signal-based components with OnPush are the recommended approach for optimal performance. The component only checks when signals it reads actually change."
  ],
  [
    "What is the afterNextRender and afterRender lifecycle in Angular?",
    "hard",
    "`afterNextRender(() => {...})` runs a callback ONCE after the NEXT render cycle completes — use for browser-only code that must happen after DOM is rendered (third-party library init, measuring elements). `afterRender(() => {...})` runs after EVERY render. Both are available in Angular 17+ (signals-based). More precise than `ngAfterViewInit` — designed for signal-based CD without Zone.js. Must be called in injection context."
  ],
  [
    "How does Angular's new hydration (provideClientHydration) avoid full re-rendering?",
    "hard",
    "`provideClientHydration()` enables reuse of server-rendered DOM. Angular matches server-generated DOM nodes (via `ng-server-context` attributes and DOM node indexes) with client component instances. Instead of clearing the DOM and re-rendering (as in pre-hydration days), Angular attaches event listeners and activates the component tree on existing nodes. Avoids flash, preserves scroll position, and reduces initial render work."
  ],
  [
    "What is incremental hydration in recent Angular versions?",
    "hard",
    "Incremental hydration hydrates lazy-loaded components gradually — not all at once. Components wrapped in `@defer` are hydrated only when their trigger condition is met. Reduces initial JavaScript execution and improves TTI (Time to Interactive). The shell loads first and is interactive immediately, while deferred sections load progressively."
  ],
  [
    "What is the difference between Angular standalone APIs and NgModules going forward?",
    "med",
    "Standalone is the default and recommended approach. NgModules are still supported but not required. Standalone: simpler (no NgModules), tree-shakable, lazy loading via `loadComponent`, faster compilation. NgModules: still needed for some libraries, View Engine compatibility, and existing large codebases. New projects should use standalone. NgModules may be deprecated in a future major version."
  ],
  [
    "How do you migrate an NgModule app to standalone components?",
    "hard",
    "Migration: 1) Add `standalone: true` to each component/directive/pipe. 2) Move imports from NgModule to `@Component.imports`. 3) Replace `bootstrapModule` with `bootstrapApplication`. 4) Replace `RouterModule.forRoot` with `provideRouter`. 5) Replace `HttpClientModule` with `provideHttpClient`. 6) Use Angular CLI's `ng generate @angular/core:standalone` schematic to automate migration. Conduct incrementally — standalone and NgModule components can coexist."
  ],

  // ── Code / Implementation ─────────────────────────────────────────────────
  [
    "Write a counter using signal() with increment and a computed double.",
    "med",
    "`const count = signal(0); const double = computed(() => count() * 2);` Template: `{{ count() }} x 2 = {{ double() }} <button (click)=\"count.update(c => c + 1)\">+</button>`. The `computed` auto-updates when `count` changes. For decrement: `count.update(c => c - 1)`. For reset: `count.set(0)`."
  ],
  [
    "Implement an effect() that logs whenever a signal changes.",
    "med",
    "`effect(() => { console.log('Count changed to:', this.count()); });` The effect runs once immediately and again whenever `count()` changes. Angular auto-tracks signal dependencies read inside the effect. Use `effect({ allowSignalWrites: true })` if you need to write to signals inside effects (not recommended). Destroyed automatically with the component."
  ],
  [
    "Convert an HttpClient call into a signal with toSignal().",
    "hard",
    "`data = toSignal(this.http.get<User[]>('/api/users'), { initialValue: [] });` Template: `@for (user of data(); track user.id) { ... }`. The `toSignal` subscribes to the observable, returns current value or initialValue, and auto-unsubscribes on destroy. For loading state: combine with `BehaviorSubject` or use separate loading signal."
  ],
  [
    "Write a standalone component that uses input() and output() signals.",
    "hard",
    "`@Component({ standalone: true, selector: 'app-counter', template: \`<button (click)=\"increment()\">{{ count() }}</button>\` }) export class CounterComponent { readonly min = input(0); readonly max = input(100); readonly count = input.required<number>(); readonly countChange = output<number>(); increment() { const next = Math.min(this.count() + 1, this.max()); this.countChange.emit(next); } }` Parent: `<app-counter [(count)]=\"value\" [min]=\"0\" [max]=\"10\" />`."
  ],
  [
    "Implement a debounced search using a Subject and switchMap.",
    "hard",
    "`private searchSubject = new Subject<string>(); results$ = this.searchSubject.pipe(debounceTime(300), distinctUntilChanged(), switchMap(term => this.api.search(term)), shareReplay(1)); onSearch(term: string) { this.searchSubject.next(term); }` Template: `<input (input)=\"onSearch($event.target.value)\" /> <ul>@for (item of results$ | async; track item.id) { ... }</ul>`. `switchMap` cancels previous search when new input arrives."
  ],
  [
    "Write a custom structural directive *appUnless that is the inverse of *ngIf.",
    "hard",
    "`@Directive({ selector: '[appUnless]' }) export class UnlessDirective { private hasView = false; constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {} @Input() set appUnless(condition: boolean) { if (!condition && !this.hasView) { this.viewContainer.createEmbeddedView(this.templateRef); this.hasView = true; } else if (condition && this.hasView) { this.viewContainer.clear(); this.hasView = false; } } }` Usage: `<div *appUnless=\"isHidden\">Visible when isHidden is false</div>`."
  ],
  [
    "Implement a custom attribute directive that highlights an element on hover.",
    "med",
    "`@Directive({ selector: '[appHighlight]' }) export class HighlightDirective { @HostBinding('style.backgroundColor') bgColor: string; @HostListener('mouseenter') onEnter() { this.bgColor = this.highlightColor || 'yellow'; } @HostListener('mouseleave') onLeave() { this.bgColor = 'transparent'; } @Input('appHighlight') highlightColor: string; }` Usage: `<p [appHighlight]=\"'lightblue'\">Hover me</p>`."
  ],
  [
    "Write a custom pipe that truncates a string to N characters.",
    "med",
    "`@Pipe({ name: 'truncate' }) export class TruncatePipe implements PipeTransform { transform(value: string, maxLength = 50, suffix = '...'): string { if (!value) return ''; return value.length > maxLength ? value.substring(0, maxLength) + suffix : value; } }` Usage: `{{ longText | truncate:100 }}` or `{{ longText | truncate:50:'…' }}`. Register in standalone component: `import { TruncatePipe }` and add to `@Component.imports`."
  ],
  [
    "Implement a functional HTTP interceptor that adds an Authorization header.",
    "hard",
    "`export const authInterceptor: HttpInterceptorFn = (req, next) => { const token = inject(AuthService).getToken(); if (token) { const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }); return next(cloned); } return next(req); };` Register: `provideHttpClient(withInterceptors([authInterceptor]))`. Add error handling: `.pipe(catchError(err => { if(err.status === 401) inject(Router).navigate(['/login']); return throwError(err); }))`."
  ],
  [
    "Write a functional CanActivateFn guard that checks an auth signal.",
    "med",
    "`export const authGuard: CanActivateFn = (route, state) => { const auth = inject(AuthService); const router = inject(Router); if (auth.isAuthenticated()) return true; return router.parseUrl('/login?returnUrl=' + state.url); };` Register: `{ path: 'admin', canActivate: [authGuard], loadComponent: () => import('./admin.component') }`. Returns `UrlTree` for redirect instead of always going to login."
  ],
  [
    "Implement a Resolver that prefetches data before a route activates.",
    "med",
    "`export const userResolver: ResolveFn<User> = (route) => { return inject(UserService).getUser(route.paramMap.get('id')!); };` Route config: `{ path: 'user/:id', resolve: { user: userResolver }, component: UserComponent }`. Access: `const user = inject(ActivatedRoute).snapshot.data['user']`. For errors: wrap in `catchError` and return `EMPTY` or redirect observable."
  ],
  [
    "Write a reactive form with FormGroup, validators, and error display.",
    "med",
    "`this.loginForm = new FormGroup({ email: new FormControl('', [Validators.required, Validators.email]), password: new FormControl('', [Validators.required, Validators.minLength(6)]) }); onSubmit() { if (this.loginForm.valid) { ... } }` Template: `<form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\"> <input formControlName=\"email\" /> @if (email?.invalid && email?.touched) { <span>Valid email required</span> } </form>`."
  ],
  [
    "Implement a dynamic FormArray that adds and removes form rows.",
    "hard",
    "`items = new FormArray([new FormGroup({ name: new FormControl(''), qty: new FormControl(1) })]); addItem() { this.items.push(new FormGroup({ name: new FormControl(''), qty: new FormControl(1) })); } removeItem(i: number) { this.items.removeAt(i); }` Template: `<div formArrayName=\"items\"> @for (item of items.controls; track i; let i = $index) { <div [formGroupName]=\"i\"> <input formControlName=\"name\" /> <input type=\"number\" formControlName=\"qty\" /> <button (click)=\"removeItem(i)\">Remove</button> </div> } </div>`."
  ],
  [
    "Write a custom validator that checks two password fields match.",
    "hard",
    "`export const passwordsMatch: ValidatorFn = (group: AbstractControl) => { const password = group.get('password'); const confirm = group.get('confirmPassword'); return password && confirm && password.value !== confirm.value ? { passwordsDontMatch: true } : null; };` Usage: `this.form = new FormGroup({...}, { validators: passwordsMatch })`. Error display: `@if (form.errors?.passwordsDontMatch) { <span>Passwords must match</span> }`."
  ],
  [
    "Implement an async validator that checks username availability via HTTP.",
    "hard",
    "`export function usernameAvailable(): AsyncValidatorFn { return (control: AbstractControl) => { if (!control.value) return of(null); return inject(UserService).checkUsername(control.value).pipe(map(available => available ? null : { usernameTaken: true }), catchError(() => of(null))); }; }` Usage: `username: new FormControl('', { validators: [Validators.required], asyncValidators: [usernameAvailable()], updateOn: 'blur' })`."
  ],
  [
    "Use takeUntilDestroyed to clean up a subscription in a component.",
    "hard",
    "`readonly data$ = this.service.getData().pipe(takeUntilDestroyed()).subscribe(data => { this.data.set(data); });` No need for manual `ngOnDestroy` — `takeUntilDestroyed()` auto-completes when the component is destroyed. Must be called in injection context (component constructor or property initializer). Optionally pass `DestroyRef`: `takeUntilDestroyed(this.destroyRef)`."
  ],
  [
    "Implement a @defer block that loads a heavy component on viewport.",
    "hard",
    "`@defer (on viewport; prefetch on idle) { <heavy-chart-component /> } @placeholder { <div style=\"height: 400px\" class=\"skeleton\">Chart loading...</div> } @loading { <spinner /> } @error { <p>Failed to load chart</p> }` The chart component and its dependencies are code-split. The skeleton placeholder ensures layout stability (prevents CLS). `prefetch on idle` starts downloading resources during idle time."
  ],
  [
    "Write @for with track to render a list efficiently.",
    "med",
    "`@for (user of users(); track user.id; let i = $index, first = $first, last = $last, even = $even, odd = $odd) { <div [class.even]=\"even\" [class.first]=\"first\">{{ i + 1 }}. {{ user.name }}</div> } @empty { <p>No users found.</p> }`. The `track` expression (`user.id`) is REQUIRED and enables DOM reuse on list changes. `$even`/`$odd`/`$first`/`$last` are local variables."
  ],
  [
    "Implement content projection with multiple ng-content select slots.",
    "hard",
    "`<div class=\"card\"><div class=\"header\"><ng-content select=\"[cardTitle]\"></ng-content></div><div class=\"body\"><ng-content select=\"[cardBody]\"></ng-content></div><div class=\"footer\"><ng-content select=\"[cardFooter]\"></ng-content></div></div>` Usage: `<app-card><span cardTitle>Title</span><p cardBody>Content</p><span cardFooter>Footer</span></app-card>`. Falls back to default slot if selector not used."
  ],
  [
    "Dynamically create a component using ViewContainerRef.createComponent.",
    "hard",
    "`@ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef; loadComponent() { this.container.clear(); import('./heavy.component').then(m => { const ref = this.container.createComponent(m.HeavyComponent); ref.instance.someInput = 'value'; ref.instance.someOutput.subscribe(val => console.log(val)); }); }` Template: `<ng-template #container></ng-template><button (click)=\"loadComponent()\">Load</button>`."
  ],
  [
    "Implement a service that shares state between siblings via a BehaviorSubject.",
    "med",
    "`@Injectable({ providedIn: 'root' }) export class SharedStateService { private userSubject = new BehaviorSubject<User | null>(null); user$ = this.userSubject.asObservable(); setUser(user: User) { this.userSubject.next(user); } getUser(): User | null { return this.userSubject.getValue(); } }` Both siblings inject the service. One calls `setUser()`, the other subscribes to `user$` with `async` pipe."
  ],
  [
    "Write an InjectionToken and provide a config object with it.",
    "med",
    "`export const APP_CONFIG = new InjectionToken<AppConfig>('app.config'); // In providers: { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com', appName: 'MyApp', version: '1.0' } }` Injection: `private config = inject(APP_CONFIG); console.log(config.apiUrl);`. Ideal for environment-specific configuration without importing environment files everywhere."
  ],
  [
    "Implement an APP_INITIALIZER that loads config before app startup.",
    "hard",
    "`export function initializeApp(configService: ConfigService) { return () => configService.load().toPromise(); } // providers array: { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true }` The app waits for the promise to resolve before bootstrapping. Config is available globally. For multiple initializers, add each as a separate entry with `multi: true`."
  ],
  [
    "Use inject() inside a function to build a reusable data-fetching helper.",
    "hard",
    "`export function createApiService() { const http = inject(HttpClient); return { getUsers: () => http.get<User[]>('/api/users'), getUser: (id: number) => http.get<User>(`/api/users/${id}`) }; }` Usage in component: `private api = createApiService(); users = toSignal(this.api.getUsers(), { initialValue: [] })`. Enables composable, injection-aware utilities without class boilerplate."
  ],
  [
    "Implement OnPush component that updates via signals only.",
    "hard",
    "`@Component({ changeDetection: ChangeDetectionStrategy.OnPush, template: `<p>{{ count() }}</p><button (click)=\"increment()\">+</button>` }) export class CounterComponent { count = signal(0); increment() { this.count.update(c => c + 1); } }` With signals and OnPush, Angular only checks this component when `count` actually changes. No need for `markForCheck()` — signals handle it automatically."
  ],
  [
    "Write a computed signal that filters a list signal by a query signal.",
    "hard",
    "`users = signal<User[]>([]); searchQuery = signal(''); filteredUsers = computed(() => { const q = this.searchQuery().toLowerCase(); return this.users().filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)); });` Template: `<input [value]=\"searchQuery()\" (input)=\"searchQuery.set($event.target.value)\" /> @for (u of filteredUsers(); track u.id) { ... }`. Reactive filtering without RxJS — signals handle reactivity automatically."
  ],
  [
    "Implement a model() signal for a custom two-way bound rating component.",
    "hard",
    "`@Component({ selector: 'app-rating', template: \`@for (star of [1,2,3,4,5]; track star) { <span (click)=\"setRating(star)\" [class.filled]=\"star <= rating()\">★</span> }\` }) export class RatingComponent { readonly rating = model(0); setRating(val: number) { this.rating.set(val); } }` Parent: `<app-rating [(rating)]=\"productRating\" />`."
  ],
  [
    "Use viewChild() signal to focus an input after view init.",
    "hard",
    "`private inputEl = viewChild<ElementRef<HTMLInputElement>>('myInput'); constructor() { afterNextRender(() => { this.inputEl()?.nativeElement.focus(); }); }` Template: `<input #myInput />`. `viewChild()` returns a Signal that's `undefined` until view init. `afterNextRender` runs after render is complete — safe to access the DOM."
  ],
  [
    "Implement an NgRx feature with createReducer, createAction, and a selector.",
    "hard",
    "`export const loadUsers = createAction('[Users] Load Users'); export const usersLoaded = createAction('[Users] Load Success', props<{ users: User[] }>()); export const usersReducer = createReducer(initialState, on(loadUsers, state => ({ ...state, loading: true })), on(usersLoaded, (state, { users }) => ({ ...state, users, loading: false }))); export const selectUsers = createSelector((state: AppState) => state.users, s => s.users);` Component: `store.dispatch(loadUsers()); users$ = store.select(selectUsers)`."
  ],
  [
    "Write an NgRx Effect that handles a load action with an HTTP call.",
    "hard",
    "`loadUsers$ = createEffect(() => this.actions$.pipe(ofType(loadUsers), switchMap(() => this.api.getUsers().pipe(map(users => usersLoaded({ users })), catchError(err => of(loadUsersFailure({ error: err.message })))))));` Handle response with success action, errors with failure action. `switchMap` cancels previous load if a new one comes. Effects are long-lived services that don't need cleanup."
  ],
  [
    "Implement virtual scrolling with cdk-virtual-scroll-viewport.",
    "hard",
    "`<cdk-virtual-scroll-viewport itemSize=\"50\" class=\"viewport\" minBufferPx=\"200\" maxBufferPx=\"400\"> <div *cdkVirtualFor=\"let item of items\">{{ item.name }}</div> </cdk-virtual-scroll-viewport>` CSS: `.viewport { height: 500px; }`. Only visible items + buffer are rendered. Handles scroll position, recycling DOM nodes. For dynamic item sizes, use `cdkVirtualScrollStrategy` custom strategy or `AutoSizeVirtualScrollStrategy`."
  ],
  [
    "Use CDK Overlay to display a custom tooltip.",
    "hard",
    "`@Directive({ selector: '[appTooltip]' }) export class TooltipDirective { @Input('appTooltip') text = ''; private overlayRef: OverlayRef | null = null; constructor(private overlay: Overlay) {} @HostListener('mouseenter') show() { const position = this.overlay.position().flexibleConnectedTo(this.el).withPositions([{ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' }]); this.overlayRef = this.overlay.create({ positionStrategy: position, scrollStrategy: this.overlay.scrollStrategies.close() }); const portal = new TemplatePortal(this.tooltipTemplate, this.viewContainerRef); this.overlayRef.attach(portal); } @HostListener('mouseleave') hide() { this.overlayRef?.detach(); } }`."
  ],
  [
    "Implement lazy loading of a standalone route with loadComponent.",
    "med",
    "`{ path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [authGuard] }` The component is code-split and loaded only when the user navigates to `/admin`. No NgModule needed — standalone component is loaded directly. Can also use `loadChildren` for modules."
  ],
  [
    "Write a canDeactivate guard that warns about unsaved form changes.",
    "hard",
    "`export const unsavedChangesGuard: CanDeactivateFn<{ hasUnsavedChanges: () => boolean }> = (component) => { return component.hasUnsavedChanges() ? confirm('You have unsaved changes. Are you sure you want to leave?') : true; };` Route: `{ path: 'editor', component: EditorComponent, canDeactivate: [unsavedChangesGuard] }`. Component implements `hasUnsavedChanges()` checking if form is dirty."
  ],
  [
    "Implement a shareReplay-cached HTTP service to avoid duplicate requests.",
    "hard",
    "`@Injectable({ providedIn: 'root' }) export class CachedService { private cache = new Map<string, Observable<any>>(); getData<T>(key: string, request: () => Observable<T>): Observable<T> { if (!this.cache.has(key)) { this.cache.set(key, request().pipe(shareReplay(1), catchError(err => { this.cache.delete(key); return throwError(err); }))); } return this.cache.get(key)!; } clearCache(key?: string) { if (key) this.cache.delete(key); else this.cache.clear(); } }`."
  ],

  // ── Tricky output / behavior ──────────────────────────────────────────────
  [
    "What happens if you read a signal inside computed but never call it elsewhere?",
    "hard",
    "The computed is lazily evaluated — it doesn't recompute until it's actually read. If the computed is never consumed (not used in template, not in an effect), it never runs even if its dependencies change. This is a performance optimization: unused derivations cost nothing. Once read, it caches the result and only recomputes when dependencies change."
  ],
  [
    "Why does mutating an array passed to an OnPush input not update the view?",
    "hard",
    "OnPush checks input references via `===`. Mutating an array (`.push()`, `[i] = val`) keeps the same reference — Angular sees no change. Fix: create a new array (spread, concat, filter) to get a new reference, or call `markForCheck()` after mutation. Signals solve this naturally — signal updates always trigger view updates regardless of reference."
  ],
  [
    "What is logged: effect() reading signal a, when only signal b changes?",
    "hard",
    "Nothing is logged. Effects only re-run when signals they READ change. If the effect only reads `a()` and `b` changes, the effect doesn't re-run. This is the core of fine-grained reactivity — effects automatically track their dependencies at runtime and only re-execute when those specific dependencies change."
  ],
  [
    "Does computed() recompute every access or only when dependencies change?",
    "hard",
    "Only when dependencies change. `computed()` is memoized — it caches the last computed value and returns it without recomputation on repeated reads (as long as no dependency changed). This is the key performance benefit over calling a function in the template (which runs on every CD cycle). Dependencies are tracked lazily at the first read."
  ],
  [
    "Why does an effect() run once immediately after it is created?",
    "med",
    "Effects run once immediately to collect their dependencies. During this initial run, Angular records which signals are read. When any of those signals change later, the effect re-runs. The initial run also establishes the baseline state. You can think of it as: run once to track → re-run when tracked signals change."
  ],
  [
    "What happens if you call set() on a signal inside its own computed()?",
    "hard",
    "Angular throws an error (`Cannot write to a signal inside a computed`). `computed()` must be pure — writing to a signal inside it would break the unidirectional data flow and could create infinite loops. Writing to signals belongs in event handlers, `effect()`, or explicit state mutation methods."
  ],
  [
    "Why does ExpressionChangedAfterItHasBeenChecked error occur and when?",
    "hard",
    "This error occurs in dev mode when a value changes between the first and second pass of change detection (Angular runs CD twice in dev). Common causes: updating parent's state from a child's lifecycle hook (`ngAfterViewInit`), setting async data synchronously, modifying state inside `ngDoCheck`. Fix: use `setTimeout`, `Promise.resolve().then()`, or run outside Angular zone."
  ],
  [
    "What value does ngOnChanges receive on the very first change?",
    "med",
    "On the first change (before `ngOnInit`), `ngOnChanges` receives `SimpleChange` objects where `isFirstChange()` returns `true` and `previousValue` is `undefined` (or the initial value if there was one). This is before any @Input is set from the parent. The `currentValue` contains the initial input value."
  ],
  [
    "What is the order of ngOnInit, ngAfterViewInit, and the constructor?",
    "med",
    "Order: Constructor → `ngOnInit` → `ngAfterViewInit`. Constructor is called first (for DI). `ngOnInit` fires after the first `ngOnChanges` (when inputs are available). `ngAfterViewInit` fires last — after the component's view and child views are fully initialized. Use: constructor for DI, `ngOnInit` for initialization, `ngAfterViewInit` for DOM-dependent logic."
  ],
  [
    "Why is @ViewChild undefined in the constructor but set in ngAfterViewInit?",
    "med",
    "The view hasn't been initialized yet in the constructor — Angular hasn't queried for child elements/components. The `@ViewChild` property is populated after the view is created, which happens before `ngAfterViewInit` (technically between `ngOnInit` and `ngAfterViewInit` lifecycle hooks). Always access `@ViewChild` in `ngAfterViewInit` or later."
  ],
  [
    "What happens if you forget trackBy in *ngFor over a frequently replaced array?",
    "med",
    "Without tracking, Angular uses identity comparison — if the array reference changes, ALL DOM elements are destroyed and re-created even if the same items exist. This causes: performance issues (unnecessary DOM operations), loss of focus/scroll position, and unwanted animation triggers. Always use `trackBy` when the list is likely to change or contains complex items."
  ],
  [
    "Why does an async pipe create a new subscription on each template usage?",
    "hard",
    "Each `async` pipe instance creates its own subscription to the Observable. If you use `{{ data$ | async }}` twice, you subscribe twice (two separate HTTP calls for cold observables). Fix: use `*ngIf=\"data$ | async as data\"` or `@let data = data$ | async` to share one subscription. For hot observables (BehaviorSubject), multiple subscriptions share the same source."
  ],
  [
    "What happens if you subscribe to a cold observable twice?",
    "hard",
    "Two separate subscriptions = two separate executions. For an HTTP call via `HttpClient`, this means TWO HTTP requests. Each subscription creates a new producer. To share: use `shareReplay(1)` to multicast. This is why the `async` pipe pattern with `as` variable is important — it shares one subscription across the template."
  ],
  [
    "Why does switchMap cancel the previous inner observable but mergeMap does not?",
    "hard",
    "`switchMap` unsubscribes from the previous inner observable when a new value arrives (cancelling it). `mergeMap` subscribes to all inner observables in parallel — no cancellation. Use `switchMap` when only the latest result matters (search, autocomplete). Use `mergeMap` when all results are needed (multiple independent API calls)."
  ],
  [
    "What is logged if a BehaviorSubject is subscribed after two next() calls?",
    "med",
    "A late subscriber receives the LAST value (the most recent `next()` value) because BehaviorSubject replays the latest value. If `subject.next(1); subject.next(2);` then `subject.subscribe(console.log)` — it logs `2` (and any future values). The first value `1` is missed."
  ],
  [
    "What does a ReplaySubject(2) emit to a late subscriber after three values?",
    "hard",
    "A `ReplaySubject(2)` with `bufferSize=2` replays the last 2 values. After values `1, 2, 3` are emitted, a new subscriber receives `2, 3`. The first value `1` is no longer in the buffer. Great for caching the last N events for late subscribers."
  ],
  [
    "Why does updating a property inside setTimeout still update the OnPush view by default?",
    "hard",
    "`setTimeout` triggers Zone.js's `onMicrotaskEmpty`, which triggers Angular change detection. Zone.js patches `setTimeout` to notify Angular. Even with OnPush, the event that triggered the setTimeout (or the setTimeout timer callback itself) runs inside Angular's zone — causing a CD cycle. To prevent: use `ngZone.runOutsideAngular(() => setTimeout(...))`."
  ],
  [
    "What happens to change detection if you run code inside ngZone.runOutsideAngular?",
    "hard",
    "Angular does NOT know about events happening outside its zone. Change detection won't be triggered automatically. You must manually call `markForCheck()` or `detectChanges()` to update the view. Useful for high-frequency events (mousemove, scroll) where you want to avoid triggering CD for every event."
  ],
  [
    "Why does a template binding to a method call run on every change detection cycle?",
    "hard",
    "Angular doesn't know if a method's return value changed — it must call the method to check. This means the method runs on EVERY change detection cycle (potentially hundreds of times). Solution: use a property (computed once), a pure pipe, or a `computed()` signal. Avoid method calls in templates for frequently-changing data."
  ],
  [
    "What renders if @if condition changes but the referenced signal is read in @else?",
    "med",
    "If the signal is read inside `@else`, it's only tracked when `@else` is rendered. When the condition changes from true to false, `@else` is created and the signal is read. On subsequent changes, the signal dependency is properly tracked. Signals are tracked lazily — only signals read during the actual render are dependencies."
  ],
  [
    "Why does an impure pipe execute on every change detection run?",
    "med",
    "Impure pipes (`pure: false`) run on every change detection cycle regardless of input changes — Angular cannot optimize them. Pure pipes only run when their input reference changes. Impure pipes are useful for filtering/sorting arrays that mutate internally but come with a performance cost. Use sparingly or migrate to reactive patterns with `async` pipe + RxJS."
  ],
  [
    "What happens if two providers use the same token without multi: true?",
    "hard",
    "The LAST provider wins — it overrides all previous ones. This is a common source of bugs: when multiple modules provide the same service token, only the last one is effective. Always use `multi: true` when multiple providers for the same token are intended (HTTP_INTERCEPTORS, APP_INITIALIZER)."
  ],
  [
    "Why does a service provided in a component create a new instance per component?",
    "hard",
    "Providing a service in `@Component({ providers: [MyService] })` tells Angular to create a NEW instance of `MyService` for each component instance. This child injector overrides the parent injector. Useful for component-scoped state (each component gets its own copy). To share a singleton, provide at module or root level."
  ],
  [
    "What happens if inject() is called outside an injection context?",
    "hard",
    "`inject()` throws `'NG0203: inject() must be called from an injection context'`. Injection context includes: constructors, property initializers, factory functions for providers, guard/interceptor functions, and `APP_INITIALIZER` factories. Cannot be called in regular methods, promises, setTimeout, etc. Use manual DI via constructor injection for class methods."
  ],
  [
    "Why does takeUntil need to be the last operator in the pipe?",
    "hard",
    "`takeUntil` completes the observable when the notifier emits. If placed before other operators, those downstream operators never run. Placement matters: `.pipe(switchMap(...), takeUntil(destroy$))` — the switchMap runs, and takeUntil completes the entire chain. `.pipe(takeUntil(destroy$), switchMap(...))` — takeUntil completes before switchMap ever fires!"
  ],
  [
    "Why does signal-based state skip the need for markForCheck under OnPush?",
    "hard",
    "Signals integrate with Angular's change detection. When a signal value changes, Angular automatically schedules a check for any component that reads that signal in its template. No manual `markForCheck()` needed — the signal framework handles it. This is one of the key advantages of signals: OnPush becomes much simpler to use correctly."
  ],
  [
    "What happens if a @defer block's trigger never fires?",
    "med",
    "The deferred content NEVER loads — it remains as the placeholder indefinitely. The placeholder stays visible and no resources for the deferred content are downloaded (unless `prefetch` is specified). This is intentional: if you defer loading until user interaction and the user never interacts, the content never loads. Add a `when` condition as fallback if needed."
  ],
  [
    "Why might two-way [(ngModel)] not update if ChangeDetectionStrategy is OnPush?",
    "hard",
    "With OnPush, `ngModel` updates might not trigger change detection because `ngModel` is a third-party-like directive. The input event updates the model value but if the component isn't already marked for check, the view won't update. Fix: use reactive forms (`formControl`), add `markForCheck()` on input events, or use signals which auto-mark for check."
  ],
  [
    "What is the output of computed() chained on another computed when the base signal updates?",
    "hard",
    "When the base signal updates, both the intermediate `computed()` and the final `computed()` that depends on it are re-evaluated (lazily — on next read). The base `computed` updates first, triggering the dependent `computed` to be marked dirty. The dependency graph is a DAG — changes propagate through the chain correctly without redundant work."
  ],
];
