---
title: "12. Interview Questions & Answers"
description: "---"
sidebar:
  order: 12
---

## 9. Interview Questions & Answers

### Beginner Angular Interview Questions

---

**Q1: What is Angular?**

**A:** Angular is an open-source, TypeScript-based front-end web application framework developed by Google. It's used to build single-page applications (SPAs) that are fast, scalable, and maintainable. Angular provides a complete solution including routing, forms handling, HTTP communication, and testing utilities built-in.

---

**Q2: What is the difference between AngularJS and Angular?**

**A:** AngularJS (1.x) was written in JavaScript and used an MVC architecture with $scope for data binding. Angular (2+) is a complete rewrite in TypeScript, uses a component-based architecture, is much faster (Ivy renderer), has better mobile support, and includes a powerful CLI. They are not backward compatible — completely different frameworks despite the similar name.

---

**Q3: What is a Component in Angular?**

**A:** A Component is the basic building block of an Angular application. It controls a specific piece of the UI. Every component has three parts: a TypeScript class (logic and data), an HTML template (view), and CSS styles (look). Components are decorated with `@Component({ selector, templateUrl, styleUrls })`.

---

**Q4: What is a Module in Angular?**

**A:** A Module (`@NgModule`) is a container that groups related components, directives, pipes, and services. Every Angular app has at least one module — the `AppModule`. Modules help organize code into features and control what's available where. The `@NgModule` decorator takes `declarations`, `imports`, `providers`, `exports`, and `bootstrap` arrays.

---

**Q5: What is data binding in Angular? How many types are there?**

**A:** Data binding is the mechanism that connects the component's data (TypeScript) to the template (HTML). There are 4 types:
1. **Interpolation** `{{ }}` — One-way: Component → Template (display text)
2. **Property Binding** `[ ]` — One-way: Component → Template (bind to DOM properties)
3. **Event Binding** `( )` — One-way: Template → Component (respond to user events)
4. **Two-Way Binding** `[( )]` — Both directions simultaneously (using `ngModel`)

---

**Q6: What is interpolation?**

**A:** Interpolation is a form of data binding that lets you display component property values in the template using double curly braces `{{ expression }}`. It converts the expression to a string and inserts it into the HTML. Example: `<h1>Hello, {{ userName }}!</h1>`. It can also evaluate expressions like `{{ 2 + 2 }}` or method calls like `{{ getTitle() }}`.

---

**Q7: What is the difference between `[ ]` (property binding) and `{{ }}` (interpolation)?**

**A:** Both flow data from component to template. The key difference: interpolation always outputs a **string**, while property binding can bind **any type** (boolean, object, etc.) directly to a DOM property. Use property binding when the target expects a non-string value. For example, `[disabled]="true"` correctly disables a button, but `disabled="{{ true }}"` would set `disabled="true"` as a string and wouldn't work correctly for boolean HTML attributes.

---

**Q8: What is `*ngIf` and how does it work?**

**A:** `*ngIf` is a structural directive that conditionally adds or removes an element from the DOM based on a truthy/falsy expression. Unlike CSS `display: none`, `*ngIf` completely removes the element and all its children from the DOM when false — which saves memory but means the component is destroyed and recreated. Syntax: `<div *ngIf="condition; else elseTemplate">`.

---

**Q9: What is `*ngFor` and what is `trackBy`?**

**A:** `*ngFor` is a structural directive that repeats a template element for each item in a collection. `let item of items` creates a local variable for each iteration. Available local variables: `index`, `first`, `last`, `even`, `odd`. `trackBy` is a performance optimization — it provides Angular a unique identifier for each item so Angular can efficiently update only the items that changed, instead of re-rendering the entire list on any data change.

---

**Q10: What is a Directive in Angular?**

**A:** Directives are instructions in the DOM. There are 3 types: (1) **Component Directives** — Components are directives with templates; (2) **Structural Directives** — Change the DOM structure by adding/removing elements (prefixed with `*` like `*ngIf`, `*ngFor`); (3) **Attribute Directives** — Change the appearance or behavior of an existing element without changing the DOM structure (like `ngClass`, `ngStyle`, `ngModel`).

---

**Q11: What is a Pipe in Angular?**

**A:** A pipe transforms data for display in templates using the `|` character. Example: `{{ price | currency:'INR' }}`. Built-in pipes include `date`, `uppercase`, `lowercase`, `currency`, `number`, `percent`, `json`, `slice`, and `async`. You can also create custom pipes by implementing the `PipeTransform` interface with a `transform(value, ...args)` method and decorating with `@Pipe({ name: 'pipeName' })`.

---

**Q12: What is the `async` pipe? Why is it special?**

**A:** The `async` pipe automatically subscribes to an Observable or Promise and returns the latest value. When the component is destroyed, it automatically **unsubscribes** — preventing memory leaks. This makes it the preferred way to handle Observables in templates. Example: `{{ user$ | async }}` or `*ngFor="let user of users$ | async"`.

---

**Q13: What is the Angular CLI?**

**A:** The Angular CLI (Command Line Interface) is a tool that automates common Angular development tasks. Key commands: `ng new` (create project), `ng serve` (run dev server with live reload), `ng generate` (create components/services/modules), `ng build` (compile for production), `ng test` (run unit tests), `ng lint` (check code quality). It ensures consistent project structure across teams.

---

**Q14: What is `ngModel` and what module is required?**

**A:** `ngModel` is a directive that implements two-way data binding for form elements. It keeps the component property and the input field in sync — when either changes, the other updates automatically. To use `ngModel`, you **must import `FormsModule`** in your module's `imports` array. It combines property binding `[ngModel]="value"` and event binding `(ngModelChange)="value = $event"` into one `[(ngModel)]` syntax.

---

**Q15: What is TypeScript and why does Angular use it?**

**A:** TypeScript is a superset of JavaScript that adds static typing, interfaces, generics, and modern features that compile to plain JavaScript. Angular uses TypeScript because: (1) Type safety catches errors during development before runtime; (2) Better IDE support with autocomplete and refactoring; (3) Interfaces and decorators are used extensively in Angular's architecture; (4) More readable and maintainable code in large teams. TypeScript code is compiled to JavaScript before running in the browser.

---

**Q16: What is `app.module.ts`?**

**A:** `app.module.ts` is the root module of an Angular application. It's decorated with `@NgModule` and defines: `declarations` (which components/directives/pipes belong to this module), `imports` (external modules needed), `providers` (services), and `bootstrap` (the root component to render first). Angular reads this file to understand the entire application structure. Every Angular app must have exactly one root module.

---

**Q17: What is the role of `main.ts`?**

**A:** `main.ts` is the entry point of the Angular application. It calls `platformBrowserDynamic().bootstrapModule(AppModule)` to start the Angular framework. This tells Angular to load `AppModule` as the root module, read its `bootstrap` property to find the root component (`AppComponent`), and render that component's template to replace the `<app-root>` tag in `index.html`.

---

**Q18: What is the `selector` in a component?**

**A:** The `selector` in `@Component` metadata defines the HTML tag name used to include that component in templates. For example, `selector: 'app-user-card'` means you use `<app-user-card></app-user-card>` in any template to render that component. Angular uses CSS selector syntax — element selectors (`app-user`) are most common for components, while attribute selectors (`[appHighlight]`) are used for directives.

---

**Q19: What is an Interface in TypeScript and why is it used in Angular?**

**A:** An interface defines the "shape" of an object — what properties and their types it must have. It's a contract at development time (not present in compiled JavaScript). In Angular, interfaces are used to type-check data from APIs, define model shapes, and ensure consistency. Example: `interface User { id: number; name: string; email: string; }` — then TypeScript ensures every "User" object has those exact properties with those types.

---

**Q20: What is the difference between `ngClass` and `[class.name]`?**

**A:** Both apply CSS classes conditionally. `[class.className]="condition"` is the cleaner shorthand for toggling a **single class**: `<div [class.active]="isActive">`. `[ngClass]` is more powerful and handles **multiple classes** at once using an object map: `<div [ngClass]="{'active': isActive, 'error': hasError}">`. Use `[class.x]` for simple single-class toggling and `[ngClass]` when you need multiple conditional classes.

---

**Q21: What are lifecycle hooks in Angular?**

**A:** Lifecycle hooks are methods called by Angular at specific points in a component's life. Key hooks: `ngOnInit` (after component initializes — use for API calls), `ngOnChanges` (when `@Input` values change), `ngOnDestroy` (before component is destroyed — use to clean up subscriptions and timers), `ngAfterViewInit` (after template is rendered — use to access DOM elements). Implement the corresponding interface (`OnInit`, `OnDestroy`, etc.) to use each hook.

---

**Q22: What is the difference between `constructor` and `ngOnInit`?**

**A:** The `constructor` is a TypeScript/JavaScript concept — it runs when the class is instantiated and is used for **Dependency Injection** (injecting services). At constructor time, `@Input` properties aren't set yet. `ngOnInit` is an Angular lifecycle hook that runs after Angular has initialized the component and set all input properties. **Best practice:** Use the constructor only for DI. Put initialization logic (API calls, setup using @Input values) in `ngOnInit`.

---

**Q23: What is `*ngSwitch` and when would you use it over `*ngIf`?**

**A:** `*ngSwitch` evaluates a single expression and renders the matching template block, similar to a JavaScript switch statement. Use `*ngSwitch` when you have **3 or more mutually exclusive conditions** based on the **same variable** — it's cleaner than multiple `*ngIf` statements. Use `*ngIf` for simple true/false conditions or when conditions involve different variables. `*ngSwitch` uses `[ngSwitch]` on the container, `*ngSwitchCase` for each option, and `*ngSwitchDefault` for the fallback.

---

**Q24: What is SPA (Single Page Application)?**

**A:** A Single Page Application loads a single HTML file once and dynamically updates content as the user navigates, without full page reloads. The browser downloads the JavaScript application once, and Angular's Router handles navigation by swapping components on screen. Benefits: Faster navigation (no page reloads), app-like feel, reduced server load (only data fetched after initial load). Drawbacks: Larger initial load, SEO challenges (solved with Angular Universal/SSR).

---

**Q25: What is `@Input()` decorator?**

**A:** `@Input()` marks a component property as an **input property** — meaning a parent component can pass data into it. Example: `@Input() userId: number = 0;` in a child component. Parent uses it as: `<app-user-detail [userId]="selectedId">`. This is how components communicate downward (parent → child). The `ngOnChanges` lifecycle hook is called when `@Input` values change.

---

**Q26: What is Dependency Injection in Angular?**

**A:** Dependency Injection (DI) is a design pattern where a class receives its dependencies from an external source rather than creating them itself. In Angular, when you list a service in a constructor parameter, Angular's injector automatically creates and provides that service instance. Example: `constructor(private userService: UserService)` — Angular automatically provides `UserService` to the component. This makes code testable (you can inject mock services in tests) and avoids duplicate service instances.

---

**Q27: What is a Service in Angular?**

**A:** A Service is a class decorated with `@Injectable` that contains **shared business logic** — API calls, data transformation, state management, logging, etc. Services are not tied to any specific component, making them reusable across the app. They're provided via Dependency Injection. Best practice: Keep components "thin" (just UI logic) and put all business logic in services. Use `providedIn: 'root'` to make a service available app-wide as a singleton.

---

**Q28: What does `providedIn: 'root'` mean?**

**A:** `providedIn: 'root'` in `@Injectable({ providedIn: 'root' })` means the service is registered with the root injector, making it: (1) Available throughout the entire application without adding it to any module's `providers` array; (2) A **singleton** — only one instance is created and shared by all who inject it; (3) Tree-shakeable — if nothing uses the service, it's not included in the production bundle. This is the recommended way to provide most services.

---

**Q29: What is `ng-template` and when would you use it?**

**A:** `<ng-template>` defines a template block that is **not rendered by default** — it's a placeholder that Angular can use when needed. It's used with structural directives: as the `else` template in `*ngIf` (`<ng-template #elsePart>`), as the internal implementation of structural directives, and for creating reusable template fragments. Unlike regular HTML elements, `ng-template` itself never appears in the DOM.

---

**Q30: What is View Encapsulation in Angular?**

**A:** View Encapsulation controls how component styles are scoped. Three modes: (1) **Emulated** (default) — Angular adds unique attributes to elements and rewrites CSS selectors to scope styles to the component, preventing leakage to other components; (2) **None** — Component styles become global — can affect other components; (3) **ShadowDom** — Uses native browser Shadow DOM for true encapsulation. Emulated is recommended for most cases as it works across all browsers and provides good style isolation without Shadow DOM overhead.

---

> ## 🎓 Congratulations!
>
> You've completed Angular Phase 1: Fundamentals. You now understand:
> - What Angular is and why it exists
> - How to set up your development environment
> - TypeScript fundamentals used in Angular
> - Core concepts: Components, Templates, Modules, Decorators
> - All 4 types of Data Binding
> - Structural and Attribute Directives
> - Built-in and Custom Pipes
>
> **Next Steps — Phase 2 covers:**
> - Services & Dependency Injection (in depth)
> - Routing & Navigation
> - HTTP Client & API calls
> - RxJS & Observables
> - Reactive Forms & Template-Driven Forms
> - Component Communication (@Input, @Output, EventEmitter)

---

*Guide created for Angular learners at all levels. Happy coding! 🚀*
