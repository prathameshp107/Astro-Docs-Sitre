---
title: "4. Performance Optimization"
description: "Lazy loading defers loading of feature modules until the route is accessed. This reduces the initial bundle size, improving Time to Interactive (TTI)."
sidebar:
  order: 4
---

## 4. Performance Optimization

### Lazy Loading

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

### TrackBy

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

### Pure Pipes

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

### OnPush + Immutability Pattern

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

### Memoization

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

### Virtual Scrolling

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

### Bundle Optimization

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
