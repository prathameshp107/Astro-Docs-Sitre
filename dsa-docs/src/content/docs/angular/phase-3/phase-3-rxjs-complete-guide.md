---
title: "2. RxJS Complete Guide"
description: "RxJS is a library for reactive programming using Observables — lazy, composable streams of values over time. Unlike Promises (single value, eager), Observa"
sidebar:
  order: 2
---

## 2. RxJS Complete Guide

### Mental Model

RxJS is a library for **reactive programming** using **Observables** — lazy, composable streams of values over time. Unlike Promises (single value, eager), Observables are:

- **Lazy**: nothing happens until `.subscribe()` is called
- **Cancellable**: `.unsubscribe()` cleans up resources
- **Composable**: operators transform streams without side effects
- **Multi-value**: can emit 0, 1, or infinite values

---

### Core Concepts

#### Observable

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

#### Observer

An Observer is a consumer of Observable values. It's a plain object with three optional callbacks:

```typescript
const observer = {
  next:     (value: number) => console.log('Got:', value),
  error:    (err: any)      => console.error('Error:', err),
  complete: ()              => console.log('Stream complete'),
};
```

#### Subscription

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

### Subjects — Multicasting

A Subject is both an **Observable AND an Observer**. It multicast — one execution, multiple subscribers.

#### Subject

```typescript
const subject = new Subject<number>();

subject.subscribe(v => console.log('A:', v));
subject.subscribe(v => console.log('B:', v));

subject.next(1);  // A: 1, B: 1
subject.next(2);  // A: 2, B: 2
// Late subscribers get NOTHING of past values
```

#### BehaviorSubject

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

#### ReplaySubject

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

#### AsyncSubject

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

### RxJS Architecture Diagram

![RxJS Stream Architecture](/DSA-Notes-Problems/assets/angular/phase-3-2-rxjs-stream-architecture.svg)

---

### Operators Deep Dive

#### `map` — Transform Values

```typescript
// Transforms each emitted value
from([1, 2, 3]).pipe(
  map(n => n * 10)
).subscribe(console.log); // 10, 20, 30
```

**Internal:** Creates a new Observable that subscribes to the source and applies the projection function on each `next()` call.

#### `filter` — Conditional Pass-Through

```typescript
from([1, 2, 3, 4, 5]).pipe(
  filter(n => n % 2 === 0)
).subscribe(console.log); // 2, 4
```

#### `switchMap` — Cancellable Inner Observable

**Use case:** Search autocomplete — cancel previous HTTP request when user types again.

```typescript
searchInput$.pipe(
  debounceTime(300),
  switchMap(term => this.http.get(`/api/search?q=${term}`))
  // If new term arrives, CANCELS the previous HTTP request
).subscribe(results => this.results = results);
```

**Internal:** On each outer emission, unsubscribes from the previous inner Observable and subscribes to the new one. Only the **latest** inner Observable is active.

#### `mergeMap` — Concurrent Inner Observables

```typescript
// All inner Observables run concurrently (no cancellation)
clicks$.pipe(
  mergeMap(event => this.http.post('/api/log', event))
).subscribe(); // All requests fire and run in parallel
```

**Use case:** Fire-and-forget parallel requests.

#### `concatMap` — Sequential Inner Observables

```typescript
// Waits for each inner Observable to complete before subscribing to the next
actions$.pipe(
  concatMap(action => this.processAction(action)) // Strictly sequential
).subscribe();
```

**Use case:** Sequential file uploads, ordered form submissions.

#### `tap` — Side Effects Without Transformation

```typescript
this.http.get('/api/users').pipe(
  tap(users => console.log('Fetched:', users)), // Logging, analytics
  tap(users => this.loadingService.hide()),
  map(users => users.filter(u => u.active))
).subscribe(activeUsers => this.users = activeUsers);
```

#### `debounceTime` — Ignore Rapid Emissions

```typescript
fromEvent(searchBox, 'input').pipe(
  debounceTime(400), // Wait 400ms after last keystroke
  map(e => (e.target as HTMLInputElement).value),
  distinctUntilChanged(), // Don't emit if value hasn't changed
  switchMap(term => this.searchService.search(term))
).subscribe(results => this.results = results);
```

#### `catchError` — Error Recovery

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
