---
title: "8. Interview Questions"
description: "1. What is the difference between CoreModule, SharedModule, and feature modules? CoreModule: singleton services, interceptors, guards — imported ONCE in Ap"
sidebar:
  order: 8
---

## 8. Interview Questions

### Architecture & Module Design (1–15)

**1. What is the difference between CoreModule, SharedModule, and feature modules?**
CoreModule: singleton services, interceptors, guards — imported ONCE in AppModule. SharedModule: reusable UI components, directives, pipes — imported in any feature that needs them. Feature modules: everything owned by one business domain (components, services, store) — lazy-loaded on demand. CoreModule contains singletons; SharedModule contains stateless UI building blocks; feature modules are vertical domain slices.

**2. What is the CoreModule singleton guard and why is it critical?**
Constructor check: `if (parentModule) throw new Error(...)`. If CoreModule is accidentally imported in a lazy-loaded feature module, Angular creates a second instance of all its provided services — two `AuthService` instances, interceptors firing twice per request, duplicate global state. The guard catches this at startup.

**3. Explain the Smart/Dumb component pattern and its benefits.**
Smart (container) components connect to the store/services and orchestrate data flow. Dumb (presentational) components receive data only via `@Input()` and emit only via `@Output()`. Benefits: dumb components are trivially unit-testable (just pass props), universally reusable, always `OnPush` compatible, and can be visually developed in isolation (Storybook).

**4. How does lazy loading work internally?**
The Angular router uses dynamic `import()` when a lazy route is activated. The CLI creates a separate JS chunk at build time. On route activation, the router fetches the chunk, bootstraps the module, and renders the component. Preloading strategies (`PreloadAllModules`, `QuicklinkStrategy`) download lazy chunks in the background after initial load.

**5. What is the SCAM pattern?**
Single Component Angular Module — one module per component, making each independently lazy-loadable. Useful in Angular 12–14 before standalone components. With Angular 14+ standalone components, SCAM is largely superseded, but the principle (fine-grained code splitting) still applies.

**6. How do you prevent circular dependencies between feature modules?**
Features never import other features. Shared data belongs in domain models or Core. Feature-to-feature communication happens via NgRx Store (dispatch action → select state) or a shared Core service, never via direct component or service cross-imports.

**7. What is Dependency Inversion in Angular architecture?**
Feature modules depend on abstract repository interfaces (e.g., `ProductRepository`), not concrete implementations. The infrastructure layer provides concrete classes (`ProductApiRepository`). Register via `{ provide: ProductRepository, useClass: ProductApiRepository }`. In tests: swap to `{ provide: ProductRepository, useClass: MockProductRepository }`. Features never need to change when the data source changes.

**8. What is a barrel file and what are the tradeoffs?**
An `index.ts` re-exporting from multiple files in a directory. Pro: cleaner imports. Con: circular dependency risks, slows TypeScript compilation in large projects, accidentally exposes internal types. Prefer explicit exports; never use `export * from` broadly.

**9. What is `APP_INITIALIZER` and name a real-world use case.**
It runs factory functions before the app bootstraps — Angular waits for returned Promises/Observables to complete. Real uses: loading feature flags from an API, fetching the current user session (so components start with user data available), loading translation files for i18n, establishing WebSocket connections.

**10. What is `forRoot()` vs `forChild()` in Angular modules?**
`forRoot()` configures a module with providers intended as singletons — called once in AppModule (`RouterModule.forRoot(routes)`, `StoreModule.forRoot(reducers)`). `forChild()` adds feature config without re-providing root singletons — called in feature modules (`RouterModule.forChild(routes)`, `StoreModule.forFeature('products', reducer)`).

**11. How do you share state between two sibling feature modules?**
Via NgRx Store: Module A dispatches an action → Reducer updates shared state slice → Module B selects it. Alternatively, a BehaviorSubject in a Core service. Never directly import between feature modules — that creates coupling and breaks lazy-loading benefits.

**12. What is micro-frontend architecture and how does Angular support it?**
Micro-frontends split a large frontend into independently deployable apps owned by different teams. Angular supports this via: (1) Module Federation (webpack) — teams export Angular components loaded dynamically by a shell app, (2) Angular Elements — compile components as Web Components consumable by any framework.

**13. How do you enforce architecture boundaries in an Nx monorepo?**
Use `@nx/enforce-module-boundaries` ESLint rule with project tags (`type:feature`, `type:shared`, `scope:products`). Define which tag combinations can import each other. Violations fail CI. This prevents a features lib from importing another features lib, enforcing the intended architecture automatically.

**14. What is the difference between `providedIn: 'root'` and providing in a module?**
`providedIn: 'root'` creates a singleton in the root injector — tree-shakeable (removed if never injected). Providing in a module's `providers` creates a singleton scoped to that module's injector hierarchy — not tree-shakeable. Use `providedIn: 'root'` for app-wide singletons; use module providers for services that should have separate instances per lazy-loaded module.

**15. How would you architect a multi-tenant Angular app?**
A tenant-aware config service (loaded from `/api/tenants/{id}/config` or subdomain detection) provides: theme tokens, feature flags, API base URLs, role configurations. Feature modules remain tenant-agnostic; they inject the config service for tenant-specific behavior. JWTs contain tenant claims. CSS custom properties handle tenant theming via `document.documentElement.style.setProperty('--primary', config.primaryColor)`.

---

### Authentication & Security (16–25)

**16. Why store refresh tokens in httpOnly cookies, not localStorage?**
localStorage is accessible via JavaScript — any XSS vulnerability can read and exfiltrate tokens. HttpOnly cookies are inaccessible to JavaScript even if an attacker injects a script. Combine with `SameSite=Strict` to prevent CSRF. Access tokens (short-lived, in memory) are less dangerous if briefly exposed.

**17. How do you handle simultaneous 401s during token refresh?**
Use a boolean `isRefreshing` flag and a `BehaviorSubject<string | null>` as a queue. The first 401 triggers refresh and sets `isRefreshing = true`. Concurrent 401s see the flag and subscribe to the BehaviorSubject (`filter(token => token !== null).take(1)`). When refresh completes, the new token is emitted and all queued requests retry simultaneously.

**18. What is RBAC and how do you implement it in Angular?**
Role-Based Access Control: users have roles, roles have permissions. Angular implementation: (1) JWT payload contains `roles[]`, (2) `RoleGuard` checks `route.data.roles` against user roles, (3) `*hasPermission="'products:write'"` structural directive hides UI elements, (4) always enforce on the server — Angular RBAC is UX only, never security.

**19. How does Angular protect against XSS?**
Angular auto-sanitizes all template bindings (`{{ expr }}`, `[innerHTML]`). Never call `bypassSecurityTrustHtml()` with user input. Set a strict Content Security Policy header. Avoid `eval()`. Use `DomSanitizer` for dynamic URLs bound to `[href]`/`[src]`. Enable strict template type-checking.

**20. What is CSRF and how does Angular handle it?**
Cross-Site Request Forgery: malicious site makes the browser send requests using the user's cookies. Prevention: `SameSite=Strict` cookies + CSRF tokens. Angular's `HttpClientModule` automatically reads the `XSRF-TOKEN` cookie and sends it as `X-XSRF-TOKEN` header on mutating requests — zero configuration needed.

**21. How do you redirect back to the original URL after login?**
Store the attempted URL in `AuthGuard`: `router.navigate(['/login'], { queryParams: { returnUrl: state.url } })`. After login, read `returnUrl` from query params: `this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/')`. Validate it's a relative path to prevent open redirect attacks.

**22. What is OAuth 2.0 PKCE and why is it required for SPAs?**
PKCE prevents authorization code interception. The app generates a random `code_verifier`, hashes it as `code_challenge`, sends the challenge in the auth request. When exchanging the code for tokens, the app sends the original `code_verifier`. Only the legitimate app can provide it, preventing a stolen code from being exchanged. SPAs can't store client secrets, making PKCE essential.

**23. How do you sync logout across multiple browser tabs?**
Use the `storage` event: when tab A calls `localStorage.setItem('logout', Date.now())` on logout, all other tabs receive the `storage` event and can clear state and redirect to login. Alternatively, use the `BroadcastChannel` API for explicit same-origin cross-tab messaging.

**24. What security headers should your Angular app's server return?**
`Content-Security-Policy` (restricts script/style sources), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (prevents clickjacking), `Strict-Transport-Security` (forces HTTPS), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (restricts browser APIs).

**25. How would you implement permission-based UI in a template?**
Create a structural directive `*hasPermission` that injects `AuthService`, checks the user's permissions array, and calls `ViewContainerRef.createEmbeddedView(templateRef)` or `ViewContainerRef.clear()`. Usage: `<button *hasPermission="'products:delete'">Delete</button>`. Always pair with server-side enforcement — template hiding is UX, not security.

---

### HTTP & State Management (26–40)

**26. How do you implement optimistic UI updates in NgRx?**
Dispatch an action that immediately updates state (optimistically). The Effect runs the HTTP call. On success, optionally confirm with server response. On failure, dispatch a rollback action with the previous state snapshot. This gives instant UI feedback while maintaining eventual consistency.

**27. What is NgRx Entity Adapter and why use it?**
`EntityAdapter` normalizes collections into `{ ids: string[], entities: Record<id, T> }`. Benefits: O(1) lookups by ID, no duplicate IDs, built-in selectors (`selectAll`, `selectTotal`), and pre-built reducer helpers (`addOne`, `updateOne`, `removeMany`, `setAll`). Avoids O(n) array searches and simplifies update logic.

**28. Explain NgRx selector memoization.**
Selectors cache their last output and only recompute when their input selectors return new references (`===`). This is critical for OnPush: if the selector's output reference hasn't changed, the component doesn't re-render. Composed selectors chain — if an upstream slice didn't change, all downstream selectors return cached values.

**29. What does `shareReplay(1)` do and when would you use it?**
Multicasts an Observable and replays the last value to late subscribers — it acts like a BehaviorSubject seeded by the source. Use for HTTP requests that should fire once but deliver to any subscriber at any time (user profile, app config). Without it, each subscriber triggers a new HTTP request (cold Observable default behavior).

**30. How do you implement global HTTP response caching?**
Several layers: (1) `shareReplay(1)` for in-memory lifetime-of-service caching, (2) custom interceptor with a `Map<url, CachedResponse>` and TTL, (3) `Cache-Control` + `ETag`/`Last-Modified` headers for browser-level HTTP caching, (4) Service Worker (Angular PWA) for offline-capable caching of GET requests. Enterprise: combine all four for different data freshness requirements.

**31. How does `exhaustMap` differ from `switchMap` for a form submit button?**
`switchMap` cancels previous requests — for a submit button this would cancel an in-flight POST if the user double-clicks. `exhaustMap` ignores new outer emissions while an inner is active — the second click is dropped entirely, which is the correct behavior. After the request completes, the button accepts new clicks.

**32. How do you implement a global loading indicator for all HTTP requests?**
`LoadingInterceptor` increments a counter on request, decrements it in `finalize()` (guarantees decrement even on error), and emits to a `BehaviorSubject<number>`. `LoadingService.isLoading$` maps `count > 0`. App shell shows a progress bar via `isLoading$ | async`. The `finalize()` ensures no leak even if the request errors.

**33. How do you implement WebSocket integration with NgRx?**
Create an Effect that opens a WebSocket (`webSocket` from `rxjs/webSocket`) when an action fires. Map incoming messages to NgRx actions. Dispatch them: they flow through reducers normally. Use `takeUntil(actions$.pipe(ofType(disconnectWS)))` for cleanup. Add `retryWhen` with exponential backoff for reconnection.

**34. What is NgRx ComponentStore and when should you use it over global Store?**
`ComponentStore` provides local, lifecycle-bound state management — no Actions/Reducers/Effects boilerplate. Use it when: state is scoped to one component tree, doesn't need cross-feature access, or the Redux overhead is disproportionate (a complex data grid with local sorting/pagination, a multi-step form wizard, a draggable widget).

**35. How do you test an NgRx Reducer?**
Reducers are pure functions — no TestBed needed. Call directly: `const state = myReducer(initialState, myAction({ payload }))`. Assert the returned state shape. This is the fastest Angular test possible — synchronous, no mocking, no DOM. Test every `on()` handler independently with various initial states.

**36. How would you implement undo/redo in NgRx?**
Maintain a history stack in state: `{ past: State[], present: State, future: State[] }`. The `undo` action: pops from `past`, moves `present` to `future`, sets popped state as `present`. The `redo` action: pops from `future`, pushes `present` to `past`, sets popped as `present`. Limit depth (e.g., 20) to prevent memory growth.

**37. Explain `withLatestFrom` vs `combineLatest` in NgRx Effects.**
`withLatestFrom(store.select(selector))` takes the latest Store value once per action emission — used in Effects to get current state when handling an action. `combineLatest` re-emits whenever any source emits — used to derive computed state in selectors or when you want to react to changes in multiple streams.

**38. How do you handle race conditions when two Effects update the same state slice?**
Use `concatMap` in the Effect if ordering matters (process sequentially). Use NgRx's `concatLatestFrom` instead of `withLatestFrom` for stable reads. Design reducers to handle partial/out-of-order updates gracefully using optimistic versioning or server-assigned sequence numbers.

**39. What is the difference between `tap` and side-effecting code in a Reducer?**
Reducers must be pure — no side effects (no HTTP, no console.log, no localStorage). Use `tap` inside Effects for controlled side effects (logging, analytics, localStorage persistence). Any side effect in a Reducer makes the state unpredictable, breaks time-travel debugging, and violates the Redux contract.

**40. How do you implement real-time collaborative features (e.g., shared cart) with Angular?**
WebSocket Effect receives server-pushed cart updates → dispatches `cartUpdatedByServer({ items })` action → Reducer merges remote changes with local state (conflict resolution strategy: last-write-wins or CRDT). Show "John is editing this cart" indicators via a separate `presence` state slice. Debounce local changes before syncing to prevent update storms.

---

### Testing (41–50)

**41. What is TestBed and how does it work?**
TestBed creates a mock Angular testing module with specified declarations, imports, and providers — similar to a real NgModule but scoped to the test. `createComponent()` instantiates a component in a test host. `inject()` retrieves service instances. Each `describe` block gets a fresh TestBed module by default.

**42. What is the difference between `fakeAsync` and `waitForAsync`?**
`waitForAsync` uses real microtask queue — you `await fixture.whenStable()`. `fakeAsync` patches async APIs and lets you control time with `tick(ms)` and `flush()`. `fakeAsync` is more predictable for testing debounced operations, timers, and chains of async operations. Cannot use `fakeAsync` with XHR — use `HttpTestingController` instead.

**43. How do you test an NgRx Reducer?**
Call it as a pure function: `const state = myReducer(initial, action)`. Assert the returned state. No TestBed, no async, no mocking needed. This is the fastest Angular test possible — pure function in, assertion out.

**44. What is a Jasmine Spy and when do you use `createSpyObj`?**
A spy wraps a function to track calls and control return values. `jasmine.createSpyObj('Name', ['method1', 'method2'])` creates an object with all methods as spies. Configure return values: `spy.method.and.returnValue(of([]))`. Preferred over hand-written mocks — less code, automatic call verification.

**45. How do you test a component with the `async` pipe?**
After `fixture.detectChanges()` (triggers ngOnInit + subscribes), use `fakeAsync` + `tick()` to flush microtasks, then `fixture.detectChanges()` again to update the view with the emitted value. Or use `waitForAsync` with `fixture.whenStable()`. Assert the DOM after the second `detectChanges()`.

**46. How do you write E2E tests that don't depend on a real backend?**
Use `cy.intercept()` (Cypress) or `page.route()` (Playwright) to stub all network calls with fixture JSON files. Login via API call (not UI flow) to skip repetitive login. Use `data-cy` attributes as selectors — stable, not tied to CSS classes. Test UI behavior, not backend correctness.

**47. What does code coverage measure and what are its limits?**
Coverage measures which lines/branches/functions tests execute. 80% line coverage means 80% of code was reached. Limits: a test can reach code without meaningful assertions (false confidence). Focus coverage on business logic (services, reducers, pipes). Don't chase 100% — test behaviors that matter, not lines.

**48. How do you test a Route Guard?**
Unit: call `guard.canActivate(mockRoute, mockState)` directly with spy mocks for `Router` and `AuthService`. Integration: `RouterTestingModule.withRoutes([...])`, navigate to the protected route, assert the resulting URL (redirected or allowed). Unit tests are faster; integration tests verify the full router interaction.

**49. What is the difference between shallow and deep component testing?**
Shallow testing uses `NO_ERRORS_SCHEMA` — child components aren't rendered. Tests the parent in isolation quickly. Deep testing compiles and renders all child components — more realistic but requires declaring/importing all dependencies. Best practice: shallow for unit behavior, deep for integration behavior, E2E for user flows.

**50. How do you test a component that uses `@ViewChild`?**
After `fixture.detectChanges()` (which triggers `ngAfterViewInit`), the `@ViewChild` reference is populated. Access: `component.myChildRef`. If it's an Angular component, call its methods or check its state directly. Use `By.directive(ChildComponent)` to query it in the fixture DOM.

---

### Performance & Scalability (51–65)

**51. How do you diagnose a slow Angular application?**
(1) Angular DevTools — visualize CD cycles and their duration. (2) Chrome DevTools Performance tab — record interactions, find long tasks (>50ms). (3) Lighthouse — TTI, FCP, bundle sizes. (4) webpack-bundle-analyzer — find oversized chunks. (5) `window.performance.mark()` for custom timing around critical paths.

**52. When is virtual scrolling essential and how does CDK implement it?**
Essential for lists with >200 items. `CdkVirtualScrollViewport` calculates which items are visible, renders only those plus a buffer, and recycles DOM nodes as the user scrolls. All 10,000 items exist only in memory — only ~20 DOM nodes exist at any time. Uses `IntersectionObserver` and scroll events internally.

**53. What does AOT compilation improve over JIT?**
AOT compiles templates at build time: removes ~300KB Angular compiler from the bundle, catches template errors at build time, pre-compiles templates (no runtime parse overhead), produces smaller and faster bundles. JIT compiles at runtime — used in development for faster rebuilds.

**54. What is Angular Universal (SSR) and when should you use it?**
Universal renders the app on the server, sends populated HTML to the browser. Benefits: fast First Contentful Paint, SEO (crawlers see full HTML). Use for: marketing/content sites where SEO matters, apps targeting slow connections. Tradeoff: server infrastructure complexity, `TransferState` to avoid double-loading data, and `isPlatformBrowser()` guards for browser-only APIs.

**55. What is `@defer` (Angular 17+) and how does it differ from lazy loading?**
`@defer (on viewport)` downloads, compiles, and renders a template block only when it enters the viewport. Unlike route-based lazy loading (route-level granularity), `@defer` works within a single route's template at the component level. Ideal for below-the-fold heavy components that shouldn't block initial render.

**56. How do you optimize a component that renders a complex chart on every CD cycle?**
Run the chart rendering code `ngZone.runOutsideAngular(() => chart.update())`. Only re-render when data actually changes using `OnPush` + reference equality. Debounce resize events. Use `requestAnimationFrame` for smooth updates. Cache computed data with `memo` or a pure pipe.

**57. What is Incremental Hydration (Angular 17+)?**
Without it: Universal renders HTML, Angular destroys it and re-renders (wasteful, causes flicker). With incremental hydration, Angular reuses server-rendered DOM nodes and attaches event handlers without re-rendering. Drastically reduces Time to Interactive and eliminates content shift.

**58. How do you handle a 100,000-item dataset in an Angular app?**
(1) Paginate server-side — never load all at once. (2) Use virtual scroll for long visible lists. (3) Filter/search server-side, not client-side. (4) Normalize to NgRx Entity for O(1) lookups. (5) If client-side filtering is needed for large datasets, run in a Web Worker to avoid blocking the main thread.

**59. How does `trackBy` work and when does Angular reuse vs recreate DOM nodes?**
With `trackBy`, Angular gets a stable key per item. On array replacement: items with the same key → DOM node is reused (only update inputs); new keys → new DOM nodes created; missing keys → DOM nodes destroyed. Without `trackBy`, any array replacement destroys and recreates all DOM nodes regardless of data changes.

**60. How do you implement HTTP caching with ETags?**
Server sends `ETag: "abc123"` with responses. On subsequent requests, Angular (via interceptor) sends `If-None-Match: "abc123"`. If unchanged, server returns `304 Not Modified`. The interceptor serves the cached response. Implement with a `Map<url, { etag, data }>` in the interceptor.

**61. What is tree-shaking and how do you enable it fully?**
Tree-shaking removes unused exports at build time. Requirements: ES modules (`import/export` — not CommonJS), named imports (not `import * as`), no side-effect imports, `sideEffects: false` in `package.json`. Angular's CLI enables it by default. Common pitfall: importing from `rxjs` directly instead of `rxjs/operators` (pre-v6) prevents tree-shaking of operators.

**62. How do you reduce Time to First Byte for an Angular app?**
(1) Deploy to CDN edge locations near users. (2) Enable HTTP/2 for multiplexed connections. (3) Use brotli/gzip compression on Nginx. (4) Preload critical chunks with `<link rel="preload">`. (5) Consider Angular Universal for server-side rendering. (6) Minimize `index.html` response size.

**63. How do you implement a performance budget in Angular CLI?**
In `angular.json` under `configurations.production.budgets`: set `maximumWarning` and `maximumError` for `initial` (the main bundle) and `anyComponentStyle` (per-component CSS). The build fails if error limits are exceeded. This enforces performance as a hard CI requirement.

**64. When would you use a Web Worker in Angular?**
For computationally expensive operations that would block the main thread: sorting/filtering large datasets, image processing, cryptography, running ML models client-side, complex data transformations. Angular CLI supports Web Workers: `ng generate web-worker my-worker`. Use `postMessage`/`onmessage` for communication.

**65. How do you measure and improve Core Web Vitals for an Angular app?**
LCP (Largest Contentful Paint): preload hero images, SSR for fast initial HTML, optimize images. FID/INP (Interaction to Next Paint): reduce JS bundle size, split long tasks, use Web Workers. CLS (Cumulative Layout Shift): reserve space for images/ads with explicit dimensions, avoid font swaps. Measure with Lighthouse, Chrome CrUX, or web-vitals library.

---

### Deployment & Enterprise Operations (66–75)

**66. What is the critical Nginx config issue that breaks Angular SPA deployments?**
Without `try_files $uri $uri/ /index.html`, navigating directly to `/products/123` returns 404 — nginx looks for a file at that path, finds none. The fix serves `index.html` for any unmatched path, letting Angular's router handle the URL client-side. This is the most common SPA deployment mistake.

**67. How does content-hash file naming enable CDN caching?**
Angular CLI appends a hash of the file's content to output filenames (`main.4a7b3c.js`). Since the filename changes when content changes, CDN can cache with `max-age=31536000, immutable`. `index.html` is NOT content-hashed and must have `Cache-Control: no-cache` so browsers always fetch fresh version (which references new hashed filenames).

**68. What is zero-downtime deployment for an Angular app?**
(1) Build and upload new static files alongside old ones (content-hash filenames prevent conflicts). (2) Update CDN/nginx to serve new `index.html`. (3) Users finishing sessions use old bundles (still available). (4) New users get new bundles. (5) Delete old bundles after a grace period (e.g., 24 hours). Zero traffic disruption at all stages.

**69. What are multi-stage Docker builds and why are they important for Angular?**
Stage 1 (builder): installs Node.js, all `node_modules`, and runs `ng build`. Stage 2 (runtime): starts from `nginx:alpine`, copies only the compiled `dist/` folder. Final image is ~25MB (nginx + static files) instead of ~500MB (Node.js + all node_modules). Smaller images → faster deployments, smaller attack surface.

**70. How do you implement feature flags for gradual rollouts?**
`APP_INITIALIZER` fetches flags from `/api/feature-flags` at startup. `FeatureFlagService.isEnabled('new-checkout')` returns `Observable<boolean>`. Use in routes (`canActivate: [FeatureFlagGuard]`) and templates (`*featureFlag="'beta-search'"`). For gradual rollouts, server returns flag values per user segment (by role, country, percentage). Enable without redeployment.

**71. How do you set up environment-specific builds in CI/CD?**
`angular.json` defines configurations (`production`, `staging`, `preview`) with `fileReplacements` and build settings. CI/CD environment variables inject secrets: `sed -i "s/SENTRY_DSN_PLACEHOLDER/$SENTRY_DSN/" dist/index.html`. Or use runtime config: Angular fetches `/assets/config.json` at startup (not compiled in) — change server config without rebuilding.

**72. Explain blue-green deployment for an Angular frontend.**
Maintain two identical production environments. Current traffic goes to blue. Deploy new version to green. Run smoke tests on green. Switch load balancer/DNS to point to green — instant cutover, zero downtime. Blue remains available for immediate rollback if issues arise. Swap back in seconds vs. minutes for a rollback.

**73. What are the risks of Service Workers (`@angular/pwa`) in enterprise apps?**
A buggy service worker can cache a broken app version permanently — users get a broken experience even after you push a fix. Mitigate: (1) Use `updateActivateAll` in `ngsw-config.json`, (2) implement a "new version available" notification prompting users to refresh, (3) monitor SW errors in production, (4) have a kill switch: unregister the SW via API if needed.

**74. How do you monitor Angular frontend errors in production?**
Custom `ErrorHandler` (`{ provide: ErrorHandler, useClass: GlobalErrorHandler }`) sends all uncaught errors to Sentry: `Sentry.captureException(error)`. Include context: user ID, session ID, current route, app version. HTTP errors: `ErrorInterceptor` captures status codes. Performance: `Sentry.startTransaction()` for critical user flows. Alert on error rate spikes in Grafana/DataDog.

**75. You're joining a large Angular project with no tests, poor architecture, and performance issues. What's your 90-day plan?**
Days 1–30: Audit (Lighthouse, bundle analysis, `npm audit`, component dependency graph). Add error tracking (Sentry) — you need to know what's broken in production before touching anything. Enable TypeScript strict mode — surface real bugs. Days 31–60: Add tests for the two highest-risk paths (checkout, auth). Extract SharedModule for duplicated components. Add `OnPush` to leaf components — zero behavior change, immediate CD improvement. Days 61–90: Lazy load the 3 largest bundles. Establish code review standards and architecture decision records (ADRs). Present measurable outcomes to stakeholders: bundle size -40%, error rate -60%, Lighthouse score +20. Architecture refactoring follows — never leads — because you need production visibility first.

---

*This guide represents production wisdom from engineers who have shipped Angular at scale across large engineering organizations. Every pattern exists because a team learned the cost of not using it.*

**Continue to Phase 5** → Micro-frontends, Angular Signals, Web Workers, Angular Libraries, and Module Federation.
