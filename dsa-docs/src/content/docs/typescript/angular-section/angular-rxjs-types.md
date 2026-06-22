---
title: "RxJS Types in Angular with TypeScript"
description: "Complete guide to typing RxJS observables in Angular: Observable, Subject, BehaviorSubject, operators, and async pipe."
---

## RxJS Types in Angular

### Observable and Subject Types

```typescript
// Observable typed stream
const user$: Observable<User> = this.http.get<User>('/api/users/1');

// BehaviorSubject with type
private loadingSubject = new BehaviorSubject<boolean>(false);
loading$: Observable<boolean> = this.loadingSubject.asObservable();

// Subject
private errorSubject = new Subject<string | null>();
error$ = this.errorSubject.asObservable();
```

### Typed Operators

```typescript
import { map, filter, catchError, switchMap } from 'rxjs/operators';

const userNames$: Observable<string> = this.http.get<User[]>('/api/users').pipe(
  map(users => users.map(u => u.name)),
  switchMap(names => of(names.join(', ')))
);
```

### Interview Questions

**Easy:** How do you type an Observable in Angular?

**Medium:** What's the difference between Subject and BehaviorSubject types?

**Hard:** How would you type a custom RxJS operator?
