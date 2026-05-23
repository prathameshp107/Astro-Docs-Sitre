---
title: "5. Memory Leaks"
description: "1. Unsubscribed Observables — the 1 cause 2. Event listeners not removed — addEventListener without removeEventListener 3. setTimeout/setInterval not clear"
sidebar:
  order: 5
---

## 5. Memory Leaks

### Common Causes

1. **Unsubscribed Observables** — the #1 cause
2. **Event listeners not removed** — `addEventListener` without `removeEventListener`
3. **setTimeout/setInterval** not cleared
4. **DOM references** held after component destroy
5. **Detached components** in dynamic component creation

---

### Detection

```typescript
// Chrome DevTools → Memory → Heap Snapshot
// Take snapshot → destroy component → take snapshot → compare
// Look for: Component class instances still in memory
```

---

### Prevention Patterns

#### Pattern 1: takeUntil (Recommended)

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

#### Pattern 2: async Pipe (Best Practice)

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

#### Pattern 3: takeUntilDestroyed (Angular 16+)

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

#### Pattern 4: Manual Unsubscribe (for Single Subscriptions)

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

#### Pattern 5: Subscription Array

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

#### Event Listener Leaks

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
