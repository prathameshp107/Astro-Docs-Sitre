# Angular Phase 3 — Advanced Architecture Guide

> **Senior Angular Software Architect Reference**
> Deep internals, architecture diagrams, real-world patterns, and 50 interview questions.

---

## Table of Contents

1. [Change Detection](#change-detection)
2. [RxJS Complete Guide](#rxjs-complete-guide)
3. [State Management](#state-management)
4. [Performance Optimization](#performance-optimization)
5. [Memory Leaks](#memory-leaks)
6. [Interview Questions](#interview-questions)

---

# 1. Change Detection

## Why Angular Needs Change Detection

Angular maintains a **component tree** that mirrors your DOM. When data changes (user clicks, HTTP responses, timers), Angular must know *which* components to re-render. Change detection is the mechanism that answers: "Has the model changed? If so, update the view."

Angular's change detection is **pull-based** — Angular *asks* "has anything changed?" rather than waiting to be told. This is different from React (virtual DOM diffing) or Vue (reactive proxies).

---

## Zone.js — The Change Detection Trigger

### What Is Zone.js?

Zone.js is a **monkey-patching library** that intercepts all asynchronous browser APIs. It wraps every async operation in a "zone" — a persistent execution context that Angular can hook into.

### What Zone.js Patches

Zone.js overrides (monkey-patches) the following APIs at application bootstrap:

```
setTimeout / setInterval / clearTimeout / clearInterval
Promise.then / Promise.catch / Promise.finally
XMLHttpRequest.open / XMLHttpRequest.send
addEventListener / removeEventListener
requestAnimationFrame
MutationObserver
```

### Internal Mechanism

When your Angular app bootstraps (`platformBrowserDynamic().bootstrapModule(AppModule)`), Angular creates a special zone called **NgZone**. Every async operation your app runs lives inside this zone.

```typescript
// Simplified internal representation of NgZone
class NgZone {
  private _inner: Zone;      // The Angular zone
  private _outer: Zone;      // The parent (browser) zone

  constructor() {
    // Zone.js onMicrotaskEmpty hook
    this._inner = Zone.current.fork({
      name: 'angular',
      onHasTask: (delegate, current, target, hasTaskState) => {
        // When task queue empties → trigger change detection
        if (!hasTaskState.microTask && !hasTaskState.macroTask) {
          this.onMicrotaskEmpty.emit(null); // <-- triggers ApplicationRef.tick()
        }
      }
    });
  }

  run<T>(fn: () => T): T {
    return this._inner.run(fn); // Execute inside Angular zone
  }

  runOutsideAngular<T>(fn: () => T): T {
    return this._outer.run(fn); // Bypass Angular zone (no CD triggered)
  }
}
```

**Flow:**

1. User clicks a button → Zone.js intercepts the event listener call
2. The callback runs *inside* the Angular zone
3. When the microtask queue empties, Zone.js fires `onMicrotaskEmpty`
4. Angular's `ApplicationRef.tick()` is called → full change detection cycle begins

```typescript
// Internal ApplicationRef.tick() — simplified
class ApplicationRef {
  tick(): void {
    for (const view of this._views) {
      view.detectChanges(); // Walk every component tree
    }
  }
}
```

---

## Architecture Diagram — Zone.js to DOM Update

```svg
<svg viewBox="0 0 700 620" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <!-- Background -->
  <rect width="700" height="620" fill="#0f1117" rx="12"/>

  <!-- Title -->
  <text x="350" y="38" text-anchor="middle" fill="#e2e8f0" font-size="18" font-weight="700">Angular Change Detection Flow</text>

  <!-- Step 1: User Action -->
  <rect x="230" y="60" width="240" height="56" rx="10" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="350" y="84" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="600">User Action</text>
  <text x="350" y="103" text-anchor="middle" fill="#64748b" font-size="11">(click, input, HTTP response, timer)</text>

  <!-- Arrow 1 -->
  <line x1="350" y1="116" x2="350" y2="148" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="370" y="136" fill="#94a3b8" font-size="10">intercepts</text>

  <!-- Step 2: Zone.js -->
  <rect x="200" y="148" width="300" height="68" rx="10" fill="#1e3a2f" stroke="#22c55e" stroke-width="2"/>
  <text x="350" y="172" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Zone.js (NgZone)</text>
  <text x="350" y="190" text-anchor="middle" fill="#64748b" font-size="11">Monkey-patches async APIs</text>
  <text x="350" y="206" text-anchor="middle" fill="#64748b" font-size="11">Tracks task queue → fires onMicrotaskEmpty</text>

  <!-- Arrow 2 -->
  <line x1="350" y1="216" x2="350" y2="248" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="360" y="236" fill="#94a3b8" font-size="10">ApplicationRef.tick()</text>

  <!-- Step 3: Change Detection Engine -->
  <rect x="175" y="248" width="350" height="80" rx="10" fill="#2d1e3a" stroke="#a855f7" stroke-width="2"/>
  <text x="350" y="272" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="600">Change Detection Engine</text>
  <text x="350" y="290" text-anchor="middle" fill="#64748b" font-size="11">Walks component tree top-down</text>
  <text x="350" y="308" text-anchor="middle" fill="#64748b" font-size="11">Compares old vs new values (dirty checking)</text>

  <!-- Strategy branch -->
  <line x1="350" y1="328" x2="350" y2="355" stroke="#a855f7" stroke-width="2" marker-end="url(#arrow3)"/>

  <!-- Branch point -->
  <circle cx="350" cy="360" r="6" fill="#a855f7"/>

  <!-- Default Strategy box -->
  <line x1="344" y1="360" x2="200" y2="400" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="100" y="400" width="200" height="60" rx="8" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="200" y="422" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Default Strategy</text>
  <text x="200" y="440" text-anchor="middle" fill="#64748b" font-size="10">Check ALL components</text>
  <text x="200" y="455" text-anchor="middle" fill="#64748b" font-size="10">every CD cycle</text>

  <!-- OnPush Strategy box -->
  <line x1="356" y1="360" x2="500" y2="400" stroke="#06b6d4" stroke-width="1.5"/>
  <rect x="400" y="400" width="210" height="60" rx="8" fill="#0f1e22" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="505" y="422" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="600">OnPush Strategy</text>
  <text x="505" y="440" text-anchor="middle" fill="#64748b" font-size="10">Check only if: @Input ref changed,</text>
  <text x="505" y="455" text-anchor="middle" fill="#64748b" font-size="10">event in component, async pipe emits</text>

  <!-- Arrow to View Checking -->
  <line x1="200" y1="460" x2="280" y2="498" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow4)"/>
  <line x1="505" y1="460" x2="420" y2="498" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#arrow4)"/>

  <!-- Step 4: View Checking -->
  <rect x="195" y="498" width="310" height="56" rx="10" fill="#1e1e2e" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="521" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="600">Template Expression Check</text>
  <text x="350" y="540" text-anchor="middle" fill="#64748b" font-size="11">LView dirty-checks bindings: {{ expr }}, [prop]</text>

  <!-- Arrow to DOM -->
  <line x1="350" y1="554" x2="350" y2="584" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow5)"/>

  <!-- Step 5: DOM Update -->
  <rect x="230" y="584" width="240" height="26" rx="8" fill="#1a2e1a" stroke="#4ade80" stroke-width="1.5"/>
  <text x="350" y="601" text-anchor="middle" fill="#86efac" font-size="12" font-weight="600">DOM Update (Renderer2)</text>

  <!-- Arrow markers -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
    </marker>
    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/>
    </marker>
    <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7"/>
    </marker>
    <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/>
    </marker>
    <marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
    </marker>
  </defs>
</svg>
```

---

## Default Change Detection Strategy

```typescript
@Component({
  selector: 'app-user',
  template: `<h1>{{ user.name }}</h1>`,
  // changeDetection: ChangeDetectionStrategy.Default  ← implicit
})
export class UserComponent {
  @Input() user: { name: string };
}
```

### Internal Behavior

Angular uses **LView** (Logical View) — an internal data structure representing each component's state. In Default strategy, Angular walks the entire component tree on every CD cycle and re-evaluates **every bound expression** using dirty-checking.

```
Root
├── AppComponent       ← always checked
│   ├── HeaderComponent   ← always checked
│   ├── UserListComponent ← always checked
│   │   ├── UserComponent ← always checked
│   │   └── UserComponent ← always checked
│   └── FooterComponent   ← always checked
```

Even if only `HeaderComponent` changed, **all** components are checked. This is **O(n)** per CD cycle.

---

## OnPush Change Detection Strategy

```typescript
@Component({
  selector: 'app-user',
  template: `<h1>{{ user.name }}</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: { name: string };
}
```

### What Triggers OnPush

Angular marks a component **dirty** (needs checking) only when:

1. **`@Input` reference changes** — object identity (`===`) changes, not deep equality
2. **An event originates inside the component** — DOM event in the component's template
3. **An `async` pipe emits a new value** — Angular calls `markForCheck()` internally
4. **`ChangeDetectorRef.markForCheck()`** is explicitly called

```typescript
// Correct: new reference triggers OnPush
this.user = { ...this.user, name: 'Alice' };  // ✅ new object ref

// Wrong: mutating object does NOT trigger OnPush
this.user.name = 'Alice';  // ❌ same object ref, CD skipped
```

### Internal: markForCheck() vs detectChanges()

```typescript
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class MyComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  // Marks this + all ancestors as dirty.
  // CD will check them on the NEXT cycle.
  triggerFromParent(): void {
    this.cdr.markForCheck();
  }

  // Synchronously runs CD for THIS subtree immediately.
  // Useful for running outside NgZone.
  triggerImmediately(): void {
    this.cdr.detectChanges();
  }
}
```

### Detached View

```typescript
// Completely opt out of automatic CD
this.cdr.detach();

// Manually trigger when needed
setInterval(() => {
  this.data = fetchData();
  this.cdr.detectChanges();
}, 5000);
```

---

## Running Code Outside NgZone

```typescript
@Component({ ... })
export class HeavyAnimationComponent implements OnInit {
  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Heavy RAF loop — don't trigger CD on every frame
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        this.updateCanvas(); // DOM manipulation, no Angular bindings
        requestAnimationFrame(animate);
      };
      animate();
    });

    // When you DO need Angular to know about a change:
    this.ngZone.run(() => {
      this.someAngularProperty = 'updated';
      // Now CD will pick this up
    });
  }
}
```

---

# 2. RxJS Complete Guide

## Mental Model

RxJS is a library for **reactive programming** using **Observables** — lazy, composable streams of values over time. Unlike Promises (single value, eager), Observables are:

- **Lazy**: nothing happens until `.subscribe()` is called
- **Cancellable**: `.unsubscribe()` cleans up resources
- **Composable**: operators transform streams without side effects
- **Multi-value**: can emit 0, 1, or infinite values

---

## Core Concepts

### Observable

An Observable is a **function** that, when called (subscribed), sets up a stream and starts pushing values to the observer.

```typescript
import { Observable } from 'rxjs';

// Creating an Observable from scratch
const myObs$ = new Observable<number>((subscriber) => {
  // This function (subscriber fn) runs on every .subscribe() call
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();

  // Teardown logic — runs on unsubscribe or complete
  return () => {
    console.log('Cleaned up!');
  };
});

// Nothing runs until here:
myObs$.subscribe({
  next: (v) => console.log(v),   // 1, 2, 3
  error: (e) => console.error(e),
  complete: () => console.log('Done'),
});
```

**Key internal insight:** Each `.subscribe()` call creates a **new, independent execution** of the Observable. Two subscribers get independent streams (unicast by default).

### Observer

An Observer is a consumer of Observable values. It's a plain object with three optional callbacks:

```typescript
const observer = {
  next:     (value: number) => console.log('Got:', value),
  error:    (err: any)      => console.error('Error:', err),
  complete: ()              => console.log('Stream complete'),
};
```

### Subscription

A Subscription represents the **execution** of an Observable. Calling `.unsubscribe()` runs the teardown logic.

```typescript
const sub: Subscription = interval(1000).subscribe(console.log);

// Later...
sub.unsubscribe(); // Stops the interval and cleans up
```

You can group subscriptions:

```typescript
const subs = new Subscription();
subs.add(obs1$.subscribe(...));
subs.add(obs2$.subscribe(...));
subs.unsubscribe(); // cancels both
```

---

## Subjects — Multicasting

A Subject is both an **Observable AND an Observer**. It multicast — one execution, multiple subscribers.

### Subject

```typescript
const subject = new Subject<number>();

subject.subscribe(v => console.log('A:', v));
subject.subscribe(v => console.log('B:', v));

subject.next(1);  // A: 1, B: 1
subject.next(2);  // A: 2, B: 2
// Late subscribers get NOTHING of past values
```

### BehaviorSubject

Holds the **current value** and immediately emits it to new subscribers.

```typescript
const behavior$ = new BehaviorSubject<number>(0); // initial value = 0

behavior$.subscribe(v => console.log('Early:', v)); // Early: 0 (immediately)

behavior$.next(5);
behavior$.next(10);

behavior$.subscribe(v => console.log('Late:', v));  // Late: 10 (current value)

console.log(behavior$.value); // 10 — synchronous access to current value
```

**Use case:** Shared application state, current user, current route data.

### ReplaySubject

Replays **N past values** to new subscribers.

```typescript
const replay$ = new ReplaySubject<number>(3); // buffer size = 3

replay$.next(1);
replay$.next(2);
replay$.next(3);
replay$.next(4);

replay$.subscribe(v => console.log(v)); // Prints: 2, 3, 4 (last 3)
```

**Use case:** Caching recent events (e.g., last 3 search queries, activity logs).

### AsyncSubject

Emits **only the last value**, and only when `.complete()` is called.

```typescript
const async$ = new AsyncSubject<number>();

async$.subscribe(v => console.log(v));

async$.next(1);
async$.next(2);
async$.next(3);
async$.complete(); // Only now: prints 3
```

**Use case:** HTTP requests where you only care about the final result (mirrors Promise behavior).

---

## RxJS Architecture Diagram

```svg
<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="700" height="500" fill="#0a0e1a" rx="12"/>
  <text x="350" y="36" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="700">RxJS Stream Architecture</text>

  <!-- Data Source -->
  <rect x="260" y="56" width="180" height="50" rx="9" fill="#1e2d1e" stroke="#22c55e" stroke-width="2"/>
  <text x="350" y="77" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Data Source</text>
  <text x="350" y="95" text-anchor="middle" fill="#4b5563" font-size="10">HTTP / Event / Timer / Array</text>

  <line x1="350" y1="106" x2="350" y2="134" stroke="#22c55e" stroke-width="2" marker-end="url(#g1)"/>

  <!-- Observable -->
  <rect x="230" y="134" width="240" height="50" rx="9" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="155" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="600">Observable</text>
  <text x="350" y="173" text-anchor="middle" fill="#4b5563" font-size="10">Lazy stream — nothing runs until subscribed</text>

  <line x1="350" y1="184" x2="350" y2="212" stroke="#6366f1" stroke-width="2" marker-end="url(#g2)"/>

  <!-- Operator Pipeline -->
  <rect x="150" y="212" width="400" height="140" rx="9" fill="#0f1219" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="350" y="234" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="600">Operator Pipeline</text>

  <!-- Op boxes -->
  <rect x="170" y="244" width="90" height="34" rx="6" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1"/>
  <text x="215" y="265" text-anchor="middle" fill="#fcd34d" font-size="11">map(fn)</text>

  <rect x="275" y="244" width="90" height="34" rx="6" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1"/>
  <text x="320" y="265" text-anchor="middle" fill="#fcd34d" font-size="11">filter(pred)</text>

  <rect x="380" y="244" width="100" height="34" rx="6" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1"/>
  <text x="430" y="265" text-anchor="middle" fill="#fcd34d" font-size="11">switchMap(fn)</text>

  <!-- Arrows between ops -->
  <line x1="260" y1="261" x2="275" y2="261" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#g3)"/>
  <line x1="365" y1="261" x2="380" y2="261" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#g3)"/>

  <rect x="170" y="296" width="90" height="34" rx="6" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1"/>
  <text x="215" y="317" text-anchor="middle" fill="#fcd34d" font-size="11">debounceTime</text>

  <rect x="275" y="296" width="90" height="34" rx="6" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1"/>
  <text x="320" y="317" text-anchor="middle" fill="#fcd34d" font-size="11">catchError</text>

  <rect x="380" y="296" width="100" height="34" rx="6" fill="#1e1a0f" stroke="#f59e0b" stroke-width="1"/>
  <text x="430" y="317" text-anchor="middle" fill="#fcd34d" font-size="11">tap(side-effect)</text>

  <line x1="260" y1="313" x2="275" y2="313" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#g3)"/>
  <line x1="365" y1="313" x2="380" y2="313" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#g3)"/>

  <line x1="350" y1="352" x2="350" y2="380" stroke="#f59e0b" stroke-width="2" marker-end="url(#g3)"/>

  <!-- Subscriber -->
  <rect x="215" y="380" width="270" height="50" rx="9" fill="#1e1020" stroke="#ec4899" stroke-width="2"/>
  <text x="350" y="401" text-anchor="middle" fill="#f9a8d4" font-size="13" font-weight="600">Subscriber (Observer)</text>
  <text x="350" y="419" text-anchor="middle" fill="#4b5563" font-size="10">next() / error() / complete()</text>

  <line x1="350" y1="430" x2="350" y2="458" stroke="#ec4899" stroke-width="2" marker-end="url(#g4)"/>

  <!-- Subscription -->
  <rect x="245" y="458" width="210" height="32" rx="8" fill="#14110f" stroke="#f97316" stroke-width="1.5"/>
  <text x="350" y="479" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">Subscription (teardown)</text>

  <defs>
    <marker id="g1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#22c55e"/></marker>
    <marker id="g2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#6366f1"/></marker>
    <marker id="g3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f59e0b"/></marker>
    <marker id="g4" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ec4899"/></marker>
  </defs>
</svg>
```

---

## Operators Deep Dive

### `map` — Transform Values

```typescript
// Transforms each emitted value
from([1, 2, 3]).pipe(
  map(n => n * 10)
).subscribe(console.log); // 10, 20, 30
```

**Internal:** Creates a new Observable that subscribes to the source and applies the projection function on each `next()` call.

### `filter` — Conditional Pass-Through

```typescript
from([1, 2, 3, 4, 5]).pipe(
  filter(n => n % 2 === 0)
).subscribe(console.log); // 2, 4
```

### `switchMap` — Cancellable Inner Observable

**Use case:** Search autocomplete — cancel previous HTTP request when user types again.

```typescript
searchInput$.pipe(
  debounceTime(300),
  switchMap(term => this.http.get(`/api/search?q=${term}`))
  // If new term arrives, CANCELS the previous HTTP request
).subscribe(results => this.results = results);
```

**Internal:** On each outer emission, unsubscribes from the previous inner Observable and subscribes to the new one. Only the **latest** inner Observable is active.

### `mergeMap` — Concurrent Inner Observables

```typescript
// All inner Observables run concurrently (no cancellation)
clicks$.pipe(
  mergeMap(event => this.http.post('/api/log', event))
).subscribe(); // All requests fire and run in parallel
```

**Use case:** Fire-and-forget parallel requests.

### `concatMap` — Sequential Inner Observables

```typescript
// Waits for each inner Observable to complete before subscribing to the next
actions$.pipe(
  concatMap(action => this.processAction(action)) // Strictly sequential
).subscribe();
```

**Use case:** Sequential file uploads, ordered form submissions.

### `tap` — Side Effects Without Transformation

```typescript
this.http.get('/api/users').pipe(
  tap(users => console.log('Fetched:', users)), // Logging, analytics
  tap(users => this.loadingService.hide()),
  map(users => users.filter(u => u.active))
).subscribe(activeUsers => this.users = activeUsers);
```

### `debounceTime` — Ignore Rapid Emissions

```typescript
fromEvent(searchBox, 'input').pipe(
  debounceTime(400), // Wait 400ms after last keystroke
  map(e => (e.target as HTMLInputElement).value),
  distinctUntilChanged(), // Don't emit if value hasn't changed
  switchMap(term => this.searchService.search(term))
).subscribe(results => this.results = results);
```

### `catchError` — Error Recovery

```typescript
this.http.get('/api/data').pipe(
  catchError(err => {
    console.error(err);
    return of([]); // Return fallback Observable — stream continues
    // OR: throw err; — rethrow, stream terminates with error
  })
).subscribe(data => this.data = data);
```

**Internal:** Subscribes to the returned Observable on error, effectively replacing the errored stream.

---

# 3. State Management

## Why State Management?

As applications grow, component communication becomes complex:

- `@Input`/`@Output` chains become deeply nested (**prop drilling**)
- Multiple components need the same data (**shared state**)
- User actions must be traceable (**debugging**)
- State mutations become unpredictable (**race conditions**)

State management solves this with a **single source of truth** and **unidirectional data flow**.

---

## Component State

Simple, local state — fine for isolated UI components:

```typescript
@Component({
  template: `
    <button (click)="toggle()">{{ isOpen ? 'Close' : 'Open' }}</button>
    <div *ngIf="isOpen">Content</div>
  `
})
export class DropdownComponent {
  isOpen = false; // Component-local state

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
```

**When to use:** State that's only relevant to one component and its children.

---

## Service State (Reactive Services)

Share state between components using RxJS:

```typescript
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private currentUser$ = new BehaviorSubject<User | null>(null);

  // Public read-only stream
  readonly user$ = this.currentUser$.asObservable();

  setUser(user: User): void {
    this.currentUser$.next(user);
  }

  clearUser(): void {
    this.currentUser$.next(null);
  }
}

// Component
@Component({
  template: `<span>{{ (user$ | async)?.name }}</span>`
})
export class ProfileComponent {
  user$ = this.userState.user$;
  constructor(private userState: UserStateService) {}
}
```

**When to use:** Shared state across a feature, no complex side effects needed.

---

## NgRx — Redux Pattern for Angular

NgRx implements the **Redux pattern** with RxJS. State is:

- **Immutable** — never mutated directly
- **Single source** — one global Store
- **Predictable** — only Actions can trigger state changes via Reducers
- **Traceable** — every state transition is recorded

### Core Concepts

#### Store

The Store is an **RxJS Observable** wrapping your entire application state as a plain object (the **AppState** tree).

```typescript
// AppState — the shape of your entire application state
interface AppState {
  users: UsersState;
  products: ProductsState;
  ui: UIState;
}
```

#### Actions

Actions are plain objects describing **what happened**, not how state should change.

```typescript
import { createAction, props } from '@ngrx/store';

// Action Creators (factories)
export const loadUsers      = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);
```

**Naming convention:** `[Source] Event` — e.g., `[Users Page] Load Users`.

#### Reducers

Pure functions: `(currentState, action) → newState`. **Never mutate state** — always return a new object.

```typescript
import { createReducer, on } from '@ngrx/store';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,           // new array reference
    loading: false
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
```

#### Effects

Effects handle **side effects** (HTTP, localStorage, navigation) — they listen for Actions, perform work, and dispatch new Actions.

```typescript
@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),                      // Filter for this action
      switchMap(() =>
        this.userService.getAll().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
```

#### Selectors

Selectors are **pure functions** that derive data from the Store. They are **memoized** — only recompute if their input slice changed.

```typescript
import { createSelector, createFeatureSelector } from '@ngrx/store';

// Base selectors
const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers   = createSelector(selectUsersState, s => s.users);
export const selectLoading    = createSelector(selectUsersState, s => s.loading);
export const selectError      = createSelector(selectUsersState, s => s.error);

// Derived / composed selector
export const selectActiveUsers = createSelector(
  selectAllUsers,
  users => users.filter(u => u.isActive) // Only recomputes if selectAllUsers changes
);
```

```typescript
// Using selectors in components
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class UsersComponent {
  users$   = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store) {
    this.store.dispatch(loadUsers()); // Trigger the effect
  }
}
```

---

## NgRx Architecture Diagram

```svg
<svg viewBox="0 0 700 560" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="700" height="560" fill="#080c14" rx="12"/>
  <text x="350" y="36" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="700">NgRx Unidirectional Data Flow</text>

  <!-- Component (top) -->
  <rect x="260" y="58" width="180" height="52" rx="9" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="80" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="600">Component</text>
  <text x="350" y="98" text-anchor="middle" fill="#4b5563" font-size="10">Dispatches actions, selects state</text>

  <!-- Down arrow to Action -->
  <line x1="350" y1="110" x2="350" y2="140" stroke="#6366f1" stroke-width="2" marker-end="url(#na1)"/>
  <text x="358" y="128" fill="#94a3b8" font-size="10">dispatch()</text>

  <!-- Action -->
  <rect x="255" y="140" width="190" height="52" rx="9" fill="#1e1e0f" stroke="#eab308" stroke-width="2"/>
  <text x="350" y="162" text-anchor="middle" fill="#fde047" font-size="13" font-weight="600">Action</text>
  <text x="350" y="180" text-anchor="middle" fill="#4b5563" font-size="10">{ type: '[Users] Load', payload }</text>

  <!-- Branches: Reducer + Effects -->
  <line x1="350" y1="192" x2="350" y2="218" stroke="#eab308" stroke-width="2" marker-end="url(#na2)"/>
  <circle cx="350" cy="222" r="5" fill="#eab308"/>

  <!-- To Reducer -->
  <line x1="345" y1="222" x2="200" y2="260" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="100" y="260" width="200" height="64" rx="9" fill="#0f1e14" stroke="#22c55e" stroke-width="2"/>
  <text x="200" y="284" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Reducer</text>
  <text x="200" y="302" text-anchor="middle" fill="#4b5563" font-size="10">(state, action) ⇒ newState</text>
  <text x="200" y="316" text-anchor="middle" fill="#4b5563" font-size="10">Pure function, immutable</text>

  <!-- To Effects -->
  <line x1="355" y1="222" x2="500" y2="260" stroke="#f97316" stroke-width="1.5"/>
  <rect x="400" y="260" width="200" height="64" rx="9" fill="#1a1008" stroke="#f97316" stroke-width="2"/>
  <text x="500" y="284" text-anchor="middle" fill="#fdba74" font-size="13" font-weight="600">Effects</text>
  <text x="500" y="302" text-anchor="middle" fill="#4b5563" font-size="10">Side effects: HTTP, Storage</text>
  <text x="500" y="316" text-anchor="middle" fill="#4b5563" font-size="10">Dispatches new actions</text>

  <!-- Effects feedback arrow back to Action -->
  <path d="M 600 292 Q 660 222 600 180 Q 560 140 450 168" fill="none" stroke="#f97316" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#na5)"/>
  <text x="630" y="230" fill="#f97316" font-size="9" text-anchor="middle">dispatch()</text>
  <text x="630" y="242" fill="#f97316" font-size="9" text-anchor="middle">Success/Fail</text>

  <!-- Reducer to Store -->
  <line x1="200" y1="324" x2="200" y2="380" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="200" y1="380" x2="280" y2="408" stroke="#22c55e" stroke-width="1.5" marker-end="url(#na3)"/>

  <!-- Store -->
  <rect x="215" y="408" width="270" height="60" rx="9" fill="#110e1e" stroke="#a855f7" stroke-width="2"/>
  <text x="350" y="432" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="600">Store (AppState)</text>
  <text x="350" y="450" text-anchor="middle" fill="#4b5563" font-size="10">Single immutable state tree (RxJS Observable)</text>
  <text x="350" y="464" text-anchor="middle" fill="#4b5563" font-size="9">{ users: [], loading: false, error: null }</text>

  <!-- Store to Selector -->
  <line x1="350" y1="468" x2="350" y2="496" stroke="#a855f7" stroke-width="2" marker-end="url(#na4)"/>

  <!-- Selector -->
  <rect x="220" y="496" width="260" height="48" rx="9" fill="#1a0e20" stroke="#ec4899" stroke-width="2"/>
  <text x="350" y="516" text-anchor="middle" fill="#f9a8d4" font-size="13" font-weight="600">Selector (Memoized)</text>
  <text x="350" y="534" text-anchor="middle" fill="#4b5563" font-size="10">Derives data — only recomputes on input change</text>

  <!-- Selector back to Component -->
  <path d="M 480 520 Q 560 520 560 88 Q 560 58 440 70" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#na6)"/>
  <text x="568" y="310" fill="#ec4899" font-size="9" text-anchor="middle">store.select()</text>
  <text x="568" y="322" fill="#ec4899" font-size="9" text-anchor="middle">async pipe</text>

  <defs>
    <marker id="na1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#6366f1"/></marker>
    <marker id="na2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#eab308"/></marker>
    <marker id="na3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#22c55e"/></marker>
    <marker id="na4" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#a855f7"/></marker>
    <marker id="na5" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f97316"/></marker>
    <marker id="na6" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ec4899"/></marker>
  </defs>
</svg>
```

---

# 4. Performance Optimization

## Lazy Loading

Lazy loading defers loading of feature modules until the route is accessed. This reduces the **initial bundle size**, improving Time to Interactive (TTI).

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
  },
  {
    // Angular 14+ standalone lazy loading
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.component')
        .then(c => c.SettingsComponent)
  }
];
```

**Internal:** The Angular router uses dynamic `import()`. Webpack (or ESBuild) creates separate chunk files. The chunk is downloaded only when the route is first navigated to.

```
Initial bundle:   main.js  (core + eager routes)
Lazy chunks:      dashboard.js  (downloaded on demand)
                  settings.js   (downloaded on demand)
```

---

## TrackBy

Without `trackBy`, `*ngFor` destroys and recreates all DOM nodes when the array reference changes. With `trackBy`, Angular identifies items by a key and only re-renders changed items.

```typescript
// Template
@Component({
  template: `
    <li *ngFor="let user of users; trackBy: trackByUserId">
      {{ user.name }}
    </li>
  `
})
export class UsersComponent {
  users: User[] = [];

  // TrackBy function: return a unique, stable identifier
  trackByUserId(index: number, user: User): number {
    return user.id;  // Angular uses this to identify DOM nodes
  }
}
```

**Without trackBy:** Replace array → destroy 1000 DOM nodes → recreate 1000 DOM nodes.
**With trackBy:** Replace array → diff by ID → only update 2 changed nodes.

---

## Pure Pipes

Angular only re-executes a **pure pipe** when its input **reference** changes. Impure pipes re-run on every CD cycle.

```typescript
@Pipe({
  name: 'activeUsers',
  pure: true  // default — only recomputes when input ref changes
})
export class ActiveUsersPipe implements PipeTransform {
  transform(users: User[]): User[] {
    return users.filter(u => u.isActive);
  }
}

// Template
{{ users | activeUsers }}
// Recomputes ONLY when `users` array reference changes
// Much cheaper than calling filterUsers() in the template
```

**Why methods in templates are bad:** `{{ filterUsers(users) }}` is called on **every CD cycle** — potentially thousands of times per second.

---

## OnPush + Immutability Pattern

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-user-card [user]="user$ | async"></app-user-card>`
})
export class UserPageComponent {
  user$ = this.store.select(selectCurrentUser);
  constructor(private store: Store) {}
}

// Service: always return new references (immutable updates)
updateUser(update: Partial<User>): void {
  this.store.dispatch(updateUser({ user: { ...this.currentUser, ...update } }));
  // New object reference → OnPush components detect change
}
```

---

## Memoization

```typescript
// Custom memoization decorator for expensive computations
function Memoize() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    const cache = new Map();

    descriptor.value = function(...args: any[]) {
      const cacheKey = JSON.stringify(args);
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
      const result = original.apply(this, args);
      cache.set(cacheKey, result);
      return result;
    };
    return descriptor;
  };
}

// Usage
class AnalyticsService {
  @Memoize()
  computeExpensiveMetric(data: number[]): number {
    // Only computed once per unique data set
    return data.reduce((sum, n) => sum + n * Math.sqrt(n), 0);
  }
}
```

---

## Virtual Scrolling

Renders only **visible items** in long lists. Critical for lists with 1000+ items.

```typescript
// Install: @angular/cdk
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="56" style="height: 500px">
      <div *cdkVirtualFor="let user of users; trackBy: trackById"
           class="user-row">
        {{ user.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class UserListComponent {
  users = Array.from({ length: 100_000 }, (_, i) => ({ id: i, name: `User ${i}` }));
  trackById = (i: number, u: any) => u.id;
}
```

**Internal:** CDK VirtualScrollViewport calculates which items are in the viewport and only renders those, maintaining a buffer. Scroll events update the rendered range.

---

## Bundle Optimization

```typescript
// angular.json — production build configuration
"configurations": {
  "production": {
    "budgets": [
      { "type": "initial", "maximumWarning": "500kb", "maximumError": "1mb" },
      { "type": "anyComponentStyle", "maximumWarning": "2kb" }
    ],
    "outputHashing": "all",
    "optimization": true,      // Tree-shaking, minification
    "sourceMap": false,
    "namedChunks": false,
    "aot": true                // Ahead-of-Time compilation
  }
}
```

```bash
# Analyze bundle composition
npx ng build --stats-json
npx webpack-bundle-analyzer dist/app/stats.json
```

**Key techniques:**

- **Tree-shaking:** Import only what you use (`import { map } from 'rxjs/operators'` not `import * as rxjs`)
- **AOT compilation:** Compiles templates at build time, removes Angular compiler from bundle (~300KB)
- **Differential loading:** Serves ES2015+ bundles to modern browsers, ES5 to legacy (automatic in Angular CLI)
- **SCAM pattern (Single Component Angular Module):** One component per module enables finer lazy-loading granularity

---

# 5. Memory Leaks

## Common Causes

1. **Unsubscribed Observables** — the #1 cause
2. **Event listeners not removed** — `addEventListener` without `removeEventListener`
3. **setTimeout/setInterval** not cleared
4. **DOM references** held after component destroy
5. **Detached components** in dynamic component creation

---

## Detection

```typescript
// Chrome DevTools → Memory → Heap Snapshot
// Take snapshot → destroy component → take snapshot → compare
// Look for: Component class instances still in memory
```

---

## Prevention Patterns

### Pattern 1: takeUntil (Recommended)

```typescript
@Component({ ... })
export class UserComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // All subscriptions are auto-cleaned when destroy$ emits
    this.userService.users$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(users => this.users = users);

    interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(tick => this.tick = tick);

    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => this.userService.getUser(params['id']))
    ).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();     // Emit → all takeUntil complete
    this.destroy$.complete(); // Clean up the Subject itself
  }
}
```

### Pattern 2: async Pipe (Best Practice)

```typescript
// Angular manages subscriptions automatically via async pipe
@Component({
  template: `
    <!-- Angular subscribes on init, unsubscribes on destroy -->
    <div *ngFor="let user of users$ | async">{{ user.name }}</div>
    <p>Loading: {{ loading$ | async }}</p>
  `
})
export class UserListComponent {
  users$   = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectLoading);
  // No manual subscribe/unsubscribe needed!
}
```

### Pattern 3: takeUntilDestroyed (Angular 16+)

```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({ ... })
export class ModernComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    interval(1000).pipe(
      takeUntilDestroyed(this.destroyRef) // No manual ngOnDestroy needed
    ).subscribe(console.log);
  }
}
```

### Pattern 4: Manual Unsubscribe (for Single Subscriptions)

```typescript
@Component({ ... })
export class SimpleComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  ngOnInit(): void {
    this.sub = this.service.data$.subscribe(d => this.data = d);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
```

### Pattern 5: Subscription Array

```typescript
@Component({ ... })
export class MultiSubComponent implements OnDestroy {
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.a$.subscribe(a => this.a = a),
      this.b$.subscribe(b => this.b = b),
      this.c$.subscribe(c => this.c = c)
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
```

### Event Listener Leaks

```typescript
@Directive({ selector: '[appClickOutside]' })
export class ClickOutsideDirective implements OnInit, OnDestroy {
  private handler = (e: MouseEvent) => this.onDocumentClick(e);

  ngOnInit(): void {
    // Store the reference — SAME function reference needed for removal
    document.addEventListener('click', this.handler);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handler); // ← crucial
  }

  private onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  }
}
```

---

# 6. Advanced Interview Questions

## Change Detection (Questions 1–10)

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

## RxJS (Questions 11–25)

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

## State Management / NgRx (Questions 26–35)

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

## Performance (Questions 36–44)

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

## Memory Leaks (Questions 45–50)

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
