---
title: "3. Routing"
description: "A web app has many \"pages\" (components). Routing is the system that decides which component to show based on the URL."
sidebar:
  order: 3
---

## 3. Routing

### What is Routing?

A web app has many "pages" (components). Routing is the system that decides **which component to show** based on the URL.

```
URL: /products        → Show ProductListComponent
URL: /products/42     → Show ProductDetailComponent (id=42)
URL: /admin/users     → Show UsersComponent (if user is admin)
URL: /login           → Show LoginComponent
```

---

### Routing Flow Diagram

```svg
<svg viewBox="0 0 720 580" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
  <!-- Background -->
  <rect width="720" height="580" fill="#0f172a" rx="16"/>
  <text x="360" y="36" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="bold">Angular Router Navigation Flow</text>
  
  <!-- User Action -->
  <rect x="260" y="56" width="200" height="52" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="360" y="78" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">User Action</text>
  <text x="360" y="97" text-anchor="middle" fill="#94a3b8" font-size="10">Click link / navigate() / URL change</text>
  
  <line x1="360" y1="108" x2="360" y2="133" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  <defs>
    <marker id="ra" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>
  
  <!-- Router parses URL -->
  <rect x="200" y="133" width="320" height="52" rx="10" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
  <text x="360" y="155" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">Router Parses URL</text>
  <text x="360" y="173" text-anchor="middle" fill="#94a3b8" font-size="10">Matches URL against route configuration array</text>
  
  <line x1="360" y1="185" x2="360" y2="210" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Run Guards -->
  <rect x="200" y="210" width="320" height="52" rx="10" fill="#3a2a1a" stroke="#f59e0b" stroke-width="2"/>
  <text x="360" y="232" text-anchor="middle" fill="#f59e0b" font-size="13" font-weight="bold">Run Guards</text>
  <text x="360" y="250" text-anchor="middle" fill="#94a3b8" font-size="10">CanActivate, CanDeactivate, CanMatch</text>
  
  <!-- Guard decision branches -->
  <line x1="360" y1="262" x2="360" y2="285" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Decision Diamond -->
  <polygon points="360,285 430,320 360,355 290,320" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="360" y="316" text-anchor="middle" fill="#94a3b8" font-size="12">Guard</text>
  <text x="360" y="332" text-anchor="middle" fill="#94a3b8" font-size="12">passes?</text>
  
  <!-- Yes path -->
  <line x1="430" y1="320" x2="530" y2="320" stroke="#34d399" stroke-width="2" marker-end="url(#ra)"/>
  <text x="480" y="313" text-anchor="middle" fill="#34d399" font-size="11">YES</text>
  
  <!-- No path -->
  <line x1="290" y1="320" x2="140" y2="320" stroke="#ef4444" stroke-width="2"/>
  <line x1="140" y1="320" x2="140" y2="480" stroke="#ef4444" stroke-width="2"/>
  <line x1="140" y1="480" x2="200" y2="480" stroke="#ef4444" stroke-width="2" marker-end="url(#ra)"/>
  <text x="215" y="313" text-anchor="middle" fill="#ef4444" font-size="11">NO</text>
  
  <!-- Redirect box -->
  <rect x="200" y="456" width="200" height="48" rx="10" fill="#3a1a1a" stroke="#ef4444" stroke-width="2"/>
  <text x="300" y="476" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">Redirect to /login</text>
  <text x="300" y="494" text-anchor="middle" fill="#94a3b8" font-size="10">or show 403 page</text>
  
  <!-- Run Resolver -->
  <rect x="530" y="295" width="150" height="52" rx="10" fill="#2a1a3a" stroke="#c084fc" stroke-width="2"/>
  <text x="605" y="317" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">Run Resolver</text>
  <text x="605" y="335" text-anchor="middle" fill="#94a3b8" font-size="10">Pre-fetch data</text>
  
  <line x1="605" y1="347" x2="605" y2="372" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Activate Component -->
  <rect x="460" y="372" width="290" height="52" rx="10" fill="#1a2a3a" stroke="#fb923c" stroke-width="2"/>
  <text x="605" y="394" text-anchor="middle" fill="#fb923c" font-size="13" font-weight="bold">Activate Component</text>
  <text x="605" y="412" text-anchor="middle" fill="#94a3b8" font-size="10">Render in &lt;router-outlet&gt;, update URL</text>
  
  <line x1="605" y1="424" x2="605" y2="449" stroke="#64748b" stroke-width="2" marker-end="url(#ra)"/>
  
  <!-- Update view -->
  <rect x="460" y="449" width="290" height="52" rx="10" fill="#1a3a2f" stroke="#34d399" stroke-width="2"/>
  <text x="605" y="471" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">View Updated</text>
  <text x="605" y="489" text-anchor="middle" fill="#94a3b8" font-size="10">User sees new page component</text>
  
  <!-- Title -->
  <text x="360" y="555" text-anchor="middle" fill="#475569" font-size="10">Navigation events fire throughout: NavigationStart → RoutesRecognized → GuardsCheckStart → ... → NavigationEnd</text>
</svg>
```

---

### Setting Up Routes

```typescript
// app.routes.ts (Angular 17+ standalone approach)
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Basic route
  { path: '', component: HomeComponent },

  // Route with URL parameter (:id is a variable)
  { path: 'products/:id', component: ProductDetailComponent },

  // Nested (child) routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserDetailComponent }
    ]
  },

  // Lazy loaded module (only loads JavaScript when user navigates here)
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(r => r.shopRoutes)
  },

  // Route with guard
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard]
  },

  // Wildcard — catches any unmatched URL
  { path: '**', component: PageNotFoundComponent }
];
```

```typescript
// main.ts — bootstrap with routes
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
```

---

### `router-outlet` — The Display Window

Think of `<router-outlet>` as a **screen** where Angular projects the active component.

```html
<!-- app.component.html -->
<nav>
  <!-- routerLink is like href but handled by Angular (no page reload) -->
  <a routerLink="/">Home</a>
  <a routerLink="/products">Products</a>
  <a routerLink="/admin">Admin</a>
  
  <!-- routerLinkActive adds a class when this route is active -->
  <a routerLink="/profile" routerLinkActive="active-link">Profile</a>
</nav>

<!-- The matched component renders here -->
<router-outlet></router-outlet>

<footer>© 2024 MyApp</footer>
```

---

### Reading Route Parameters

```typescript
// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `
    <h1>Product #{{ productId }}</h1>
    <p>Category: {{ category }}</p>
    <button (click)="goBack()">Go Back</button>
  `
})
export class ProductDetailComponent implements OnInit {

  productId: string = '';
  category: string = '';

  constructor(
    private route: ActivatedRoute,  // Current route info
    private router: Router          // For programmatic navigation
  ) {}

  ngOnInit(): void {
    // Method 1: Snapshot (one-time read, doesn't update if URL changes)
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';

    // Method 2: Observable (reacts to URL changes, e.g., prev/next navigation)
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') ?? '';
      this.loadProduct(this.productId);
    });

    // Read query parameters: /products/42?category=electronics&sort=price
    this.route.queryParamMap.subscribe(queryParams => {
      this.category = queryParams.get('category') ?? 'all';
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
    // Or with parameters:
    // this.router.navigate(['/products'], { queryParams: { page: 1 } });
  }

  private loadProduct(id: string): void {
    this.productService.getProduct(id).subscribe(/* ... */);
  }
}
```

---

### Route Guards

Guards are functions that decide if navigation should proceed.

#### CanActivate — Protect Routes

```typescript
// auth.guard.ts (Functional guard — Angular 15+)
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // Proceed with navigation
  }

  // Save the URL they were trying to reach
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  
  return false;  // Block navigation
};

// Role-based guard
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  
  if (authService.hasRole('admin')) {
    return true;
  }
  
  return inject(Router).createUrlTree(['/unauthorized']);
};
```

#### CanDeactivate — Prevent Leaving with Unsaved Changes

```typescript
// unsaved-changes.guard.ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate) {
    return component.canDeactivate();
  }
  return true;
};

// In the component:
export class EditProductComponent implements CanComponentDeactivate {
  isDirty = false;  // Track if form has unsaved changes
  
  canDeactivate(): boolean {
    if (this.isDirty) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  }
}
```

#### Resolve — Pre-fetch Data

```typescript
// product.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const productResolver: ResolveFn<Product> = (route) => {
  const productId = route.paramMap.get('id')!;
  return inject(ProductService).getProduct(productId);
  // Angular waits for this Observable to complete before activating the route
};

// Route config:
{
  path: 'products/:id',
  component: ProductDetailComponent,
  resolve: { product: productResolver }
}

// Component reads resolved data:
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const product = this.route.snapshot.data['product'];
    // Data is already loaded! No loading spinner needed.
  }
}
```

---

### Lazy Loading

Without lazy loading, Angular loads ALL your code upfront — even pages the user may never visit.

With lazy loading, each feature loads its code only when needed.

```typescript
// app.routes.ts
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(r => r.adminRoutes)
  // ↑ This import() creates a separate JavaScript bundle
  // The browser only downloads admin code when user goes to /admin
}

// Even single components can be lazy loaded (Angular 14+):
{
  path: 'about',
  loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
}
```

---
