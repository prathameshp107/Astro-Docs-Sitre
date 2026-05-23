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
