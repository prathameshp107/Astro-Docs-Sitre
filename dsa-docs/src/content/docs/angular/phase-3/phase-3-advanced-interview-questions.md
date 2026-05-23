---
title: "6. Advanced Interview Questions"
description: "1. What is Zone.js and why does Angular need it? Zone.js monkey-patches async browser APIs to create execution contexts (zones). Angular uses it to know wh"
sidebar:
  order: 6
---

## 6. Advanced Interview Questions

### Change Detection (Questions 1–10)

**1. What is Zone.js and why does Angular need it?**
Zone.js monkey-patches async browser APIs to create execution contexts (zones). Angular uses it to know *when* async operations complete so it can trigger change detection automatically without the developer calling `detectChanges()` manually.

**2. Explain the difference between `markForCheck()` and `detectChanges()`.**
`markForCheck()` marks the component and its ancestors as dirty — CD will check them on the *next* Angular CD cycle (asynchronous). `detectChanges()` synchronously runs CD for the component's subtree immediately, regardless of Angular's scheduled cycle. Use `detectChanges()` when running outside NgZone.

**3. What triggers change detection in an OnPush component?**
Four things: (1) An `@Input` changes by reference, (2) an event originates inside the component's template, (3) an `async` pipe emits a new value, (4) `ChangeDetectorRef.markForCheck()` is called manually.

**4. Why does mutating an object NOT trigger OnPush change detection?**
OnPush uses reference equality (`===`) to detect `@Input` changes. Mutating a property on an object doesn't change the object's reference — it's still the same memory address. Angular sees the same reference and skips the check.

**5. How does Angular's LView work internally?**
LView is an internal array data structure Angular creates for each component view. It stores the component's bindings (old values), DOM nodes, directives, and queries. During CD, Angular iterates LView entries and compares old vs new values using `===`. If a value changed, it updates the DOM node.

**6. What is `NgZone.runOutsideAngular()` and when would you use it?**
It executes a function in the parent (browser) zone, bypassing NgZone. Use it for code that runs frequently but doesn't affect Angular bindings — requestAnimationFrame loops, WebSocket message handlers, third-party charting libraries, heavy computations.

**7. How does the `async` pipe integrate with OnPush?**
The `async` pipe calls `ChangeDetectorRef.markForCheck()` inside its `transform()` method whenever the Observable/Promise emits. This marks the component dirty, allowing OnPush components to re-render reactively.

**8. What is a detached change detector and why would you use it?**
`cdr.detach()` removes the component from Angular's CD tree — Angular will never automatically check it. You manually call `cdr.detectChanges()` when you want to update. Use this for highly performance-critical components where you have full control over update timing.

**9. Explain the full change detection cycle from user click to DOM update.**
User clicks → Zone.js intercepts event listener callback → runs inside NgZone → microtask queue empties → `NgZone.onMicrotaskEmpty` fires → `ApplicationRef.tick()` called → walks component tree top-down → for each component, evaluates template expressions in LView → if value changed, calls `Renderer2` to update the DOM node.

**10. Can Angular work without Zone.js?**
Yes, with `zone: 'noop'` in `bootstrapApplication`. You must then trigger all CD manually via `ApplicationRef.tick()` or `ChangeDetectorRef.detectChanges()`. Angular 18+ Signals are designed to work zone-less by using fine-grained reactivity.

---

### RxJS (Questions 11–25)

**11. What is the difference between Observable and Promise?**
Observables are lazy (don't execute until subscribed), can emit multiple values over time, are cancellable (via unsubscribe), and are composable (operators). Promises are eager (execute immediately), emit exactly one value or error, are not cancellable, and can't be composed without chaining.

**12. Explain Cold vs Hot Observables.**
A **cold** Observable creates a new data producer for each subscriber (e.g., `HttpClient.get` — each subscriber gets its own HTTP request). A **hot** Observable shares one producer among all subscribers (e.g., Subject, `fromEvent` on a DOM element). Subjects multicast a cold Observable to create a hot stream.

**13. What is the difference between Subject, BehaviorSubject, ReplaySubject, and AsyncSubject?**
`Subject`: No initial value, no replay. `BehaviorSubject`: Holds current value, emits immediately to new subscribers. `ReplaySubject(n)`: Replays last N values to new subscribers. `AsyncSubject`: Emits only the last value, only on `complete()`.

**14. Explain `switchMap` vs `mergeMap` vs `concatMap` vs `exhaustMap`.**
`switchMap`: Cancels previous inner Observable on new outer emission (use for search, navigation). `mergeMap`: Runs all inner Observables concurrently (use for parallel requests). `concatMap`: Queues inner Observables — next starts only after current completes (use for sequential operations). `exhaustMap`: Ignores new outer emissions while inner is active (use for login button — ignore extra clicks).

**15. What is the difference between `catchError` and `retry`?**
`catchError` intercepts an error and replaces the stream with a recovery Observable (or rethrows). `retry(n)` resubscribes to the source Observable up to `n` times before propagating the error. Use `retryWhen` or `retry({ delay: ... })` for exponential backoff.

**16. What does `share()` do and why use it?**
`share()` is `pipe(multicast(() => new Subject()), refCount())`. It converts a cold Observable into hot (multicasting) and shares the subscription among multiple subscribers. Only one HTTP request fires even if 5 components subscribe to the same `http.get().pipe(share())`.

**17. What is `shareReplay(1)` and when would you use it?**
`shareReplay(1)` multicasts and replays the last emission to late subscribers. Ideal for HTTP requests that should fire once but whose result should be available to late-arriving components (e.g., a config endpoint or user profile fetch at startup).

**18. Explain `combineLatest` vs `forkJoin` vs `zip`.**
`combineLatest([a$, b$])`: Emits whenever any source emits, with the latest values from all sources (requires each to emit at least once). `forkJoin([a$, b$])`: Waits for ALL to complete, emits an array of last values (like Promise.all). `zip([a$, b$])`: Pairs values by index position — waits for corresponding emissions from all sources.

**19. What is a memory leak in RxJS and how does `takeUntil` prevent it?**
If you subscribe inside `ngOnInit` and never unsubscribe, the Observable holds a reference to the component's closure, preventing garbage collection even after the component is destroyed. `takeUntil(destroy$)` completes the Observable (and runs teardown logic) when `destroy$` emits in `ngOnDestroy`.

**20. What is `distinctUntilChanged` and when is it useful?**
It only emits when the current value differs from the previous value (using `===` or a custom comparator). Useful in search: don't trigger a new HTTP request if the user deletes and retypes the same query.

**21. Explain `startWith` and `scan` together.**
`startWith(initial)` emits an initial value before the source emits. `scan((acc, curr) => ..., seed)` is the Observable equivalent of `reduce` but emits on each emission. Together: `scan((state, action) => reducer(state, action), initialState).pipe(startWith(initialState))` — essentially hand-rolled state management.

**22. How do you handle errors in an NgRx Effect?**
Wrap the inner Observable in `switchMap` (or `mergeMap`) with `catchError` returning `of(failureAction(...))`. The `catchError` must be inside the flattening operator so the outer Effect stream doesn't terminate.

**23. What is `exhaustMap` used for?**
It ignores new outer emissions while the current inner Observable is still active. Classic use case: a login form's submit button — if the user clicks submit twice, the second click is ignored until the first login request completes.

**24. Describe the difference between `tap` and `map`.**
`map` transforms values (pure, changes the stream's data). `tap` performs side effects without modifying the value (logging, analytics, triggering loading state). `tap` receives a value and passes it through unchanged.

**25. What is `fromEvent` and how is it different from `addEventListener`?**
`fromEvent(element, 'click')` creates a cold Observable wrapping `addEventListener`. It automatically calls `removeEventListener` when the subscription is unsubscribed — eliminating the manual cleanup needed with raw `addEventListener`.

---

### State Management / NgRx (Questions 26–35)

**26. What is the Redux pattern and why does NgRx use it?**
Redux is a predictable state container with three principles: single source of truth (one Store), state is read-only (only Actions can trigger changes), changes are made with pure functions (Reducers). NgRx adopts this for Angular to enable deterministic state, time-travel debugging, and separation of concerns.

**27. What is the difference between `dispatch` and `select`?**
`store.dispatch(action)` sends an action to the store — it flows through Reducers (synchronously) and Effects (asynchronously). `store.select(selector)` returns an Observable of a slice of state, automatically emitting when that slice changes.

**28. Why must reducers be pure functions?**
Pure functions have no side effects and always return the same output for the same input. This enables: time-travel debugging (replay actions), predictable state transitions, memoization in selectors, and server-side rendering (state serialization).

**29. What is the `createFeatureSelector` for?**
It creates a top-level selector that gets a named feature slice from `AppState`. This avoids typing `state.featureName` everywhere and enables type-safe access to feature state from lazy-loaded modules.

**30. How do NgRx Selectors achieve memoization?**
`createSelector` uses the Reselect algorithm. Each selector stores its last input and output. Before recomputing, it checks (using `===`) if inputs changed. If inputs are identical, it returns the cached output — no recomputation. This is crucial for `OnPush` components; they only re-render when the selector emits a new reference.

**31. What is the Entity pattern in NgRx?**
`@ngrx/entity` provides utilities for managing collections. It stores items in a normalized form: `{ ids: [1,2,3], entities: { 1: {...}, 2: {...} } }`. This enables O(1) lookups and avoids duplicates. `EntityAdapter` provides pre-built selectors (`selectAll`, `selectEntities`) and reducer helpers (`addOne`, `updateOne`, `removeOne`).

**32. How do you implement optimistic updates in NgRx?**
Dispatch an action that immediately updates state (optimistically), trigger the HTTP call in an Effect. On success, optionally confirm/refresh the state. On failure, dispatch a rollback action that reverts the optimistic change.

**33. What is NgRx ComponentStore and when would you use it instead of the global Store?**
`ComponentStore` is a local, self-contained state management solution scoped to a component (or service). It doesn't use Actions/Reducers — state is updated via `updater` functions and effects are declared inline. Use it for complex component-level state (a multi-step form wizard, a draggable chart) where global store overhead isn't warranted.

**34. How do you test NgRx Effects?**
Use `provideMockActions()` from `@ngrx/effects/testing` to provide a mock Actions stream. Inject a mock HTTP service. Subscribe to the Effect, push test actions to the mock stream, and assert the dispatched output actions.

**35. What is `RouterStore` in NgRx?**
`@ngrx/router-store` connects the Angular Router to the NgRx Store. Router events are dispatched as Actions and router state (URL, params, queryParams) is stored in the Store. This makes route state accessible via selectors and allows Effects to react to navigation events.

---

### Performance (Questions 36–44)

**36. How does lazy loading reduce initial load time?**
Feature modules are compiled into separate JS chunks. The Angular router loads chunks on demand using dynamic `import()`. The initial bundle only includes `AppModule` and eagerly loaded routes — typically reducing initial bundle by 40–70% in large apps.

**37. Why is using a method call in an Angular template bad for performance?**
Template expressions are evaluated on every CD cycle. `{{ computeExpensiveValue() }}` runs on every CD cycle — potentially hundreds of times per second. Use a pure pipe or a property that's computed once in the component.

**38. What is the SCAM pattern and how does it help performance?**
Single Component Angular Module — one module per component. This enables Angular's router to lazy-load individual components rather than entire feature modules, enabling much more granular code splitting.

**39. How does `trackBy` work internally in `*ngFor`?**
Without `trackBy`, Angular compares items by object identity. When an array is replaced (new reference), all items are "new" — Angular destroys and recreates all DOM nodes. With `trackBy`, Angular compares the *tracked key* (e.g., `user.id`). Items with the same key are moved/reused rather than destroyed.

**40. When would you use `runOutsideAngular` for performance?**
When running code that triggers frequent events (scroll handlers, mousemove, requestAnimationFrame) that don't affect Angular template bindings. Without it, Zone.js would trigger a CD cycle for every scroll event — potentially 60+ times per second.

**41. What is preloading strategy in Angular routing?**
After initial route loads, Angular can preload lazy chunks in the background. `PreloadAllModules` preloads all lazy modules. `QuicklinkStrategy` (library) preloads only modules linked by visible router links. Custom strategies can preload based on user role or network speed.

**42. What is differential loading?**
Angular CLI produces two sets of bundles: ES2015+ (for modern browsers) and ES5 (for legacy browsers). The HTML uses `<script type="module">` for modern bundles and `<script nomodule>` for legacy. Modern browsers load smaller ES2015+ bundles; old browsers load polyfill-heavy ES5 bundles.

**43. How do you measure Angular app performance?**
Chrome DevTools Performance tab (record + analyze frame budget), Lighthouse audit, `ng build --stats-json` + webpack-bundle-analyzer for bundle sizes, Angular DevTools browser extension for CD cycle visualization, `window.performance.mark()` for custom timing.

**44. What is the `@defer` block in Angular 17+ and how does it improve performance?**
`@defer` lazily loads a template block and its associated components/pipes only when a specified trigger fires (viewport intersection, user interaction, custom condition). This defers hydration and download of heavy components until needed — more granular than lazy-loaded routes.

---

### Memory Leaks (Questions 45–50)

**45. How does an unsubscribed Observable cause a memory leak?**
The Observable's subscriber function holds a closure reference to the component's `this`. If the component is destroyed but the Observable still has an active subscriber, the garbage collector cannot free the component — it's still referenced by the Observable's internal subscriber list.

**46. What is the preferred modern approach to subscription cleanup in Angular 16+?**
`takeUntilDestroyed(this.destroyRef)` from `@angular/core/rxjs-interop`. It uses `DestroyRef` (injectable) to automatically complete the Observable when the associated injection context (component/service) is destroyed — no manual `ngOnDestroy` needed.

**47. How would you detect a memory leak in an Angular app?**
Chrome DevTools → Memory tab → take a heap snapshot, navigate to create/destroy the suspect component multiple times, take another snapshot, compare snapshots by "Object allocated between snapshots" — look for component class instances that should have been collected.

**48. Can a service cause a memory leak? Give an example.**
Yes. If a `providedIn: 'root'` service subscribes to an interval or WebSocket and never unsubscribes, that subscription lives for the entire application lifetime. If the service is `providedIn: component` but the component is destroyed without the service cleaning up, the service itself (and its subscriptions) leaks.

**49. Why is it a problem to hold DOM element references in Angular?**
Holding `ElementRef.nativeElement` in a property or closure prevents the DOM node (and its entire subtree) from being garbage collected even after the component is destroyed. This is especially bad in dynamic component creation scenarios. Use `Renderer2` abstractions instead of direct DOM references.

**50. What is the `async` pipe's role in preventing memory leaks?**
The `async` pipe subscribes to an Observable in `ngOnInit` and **automatically unsubscribes** in `ngOnDestroy` via Angular's pipe lifecycle. It also calls `ChangeDetectorRef.markForCheck()` on new emissions (enabling OnPush compatibility). Using `async` pipe eliminates both the subscription management boilerplate AND the leak risk.

---

*This guide covers Angular's internal mechanisms at an architectural level. For practical mastery: build a feature with OnPush throughout, implement a full NgRx feature slice with effects, and profile a real app with Angular DevTools.*
