---
title: "3. State Management"
description: "As applications grow, component communication becomes complex:"
sidebar:
  order: 3
---

## 3. State Management

### Why State Management?

As applications grow, component communication becomes complex:

- `@Input`/`@Output` chains become deeply nested (**prop drilling**)
- Multiple components need the same data (**shared state**)
- User actions must be traceable (**debugging**)
- State mutations become unpredictable (**race conditions**)

State management solves this with a **single source of truth** and **unidirectional data flow**.

---

### Component State

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

### Service State (Reactive Services)

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

### NgRx — Redux Pattern for Angular

NgRx implements the **Redux pattern** with RxJS. State is:

- **Immutable** — never mutated directly
- **Single source** — one global Store
- **Predictable** — only Actions can trigger state changes via Reducers
- **Traceable** — every state transition is recorded

#### Core Concepts

##### Store

The Store is an **RxJS Observable** wrapping your entire application state as a plain object (the **AppState** tree).

```typescript
// AppState — the shape of your entire application state
interface AppState {
  users: UsersState;
  products: ProductsState;
  ui: UIState;
}
```

##### Actions

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

##### Reducers

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

##### Effects

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

##### Selectors

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

### NgRx Architecture Diagram

![NgRx Unidirectional Data Flow](/DSA-Notes-Problems/assets/angular/phase-3-3-ngrx-unidirectional-data-flow.svg)

---
