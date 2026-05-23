---
title: "7. Final Large Project: Enterprise E-Commerce Platform"
description: "// Reducer (immutable) export const cartReducer = createReducer(initialCartState, on(addToCart, (state, { product, quantity }) = { const existing = state.i"
sidebar:
  order: 7
---

## 7. Final Large Project: Enterprise E-Commerce Platform

### Full Architecture

```
enterprise-ecommerce/
├── src/app/
│   ├── core/          (AuthService, TokenService, Interceptors, Guards)
│   ├── shared/        (UI library: Button, Modal, Form, Pipes, Directives)
│   ├── features/
│   │   ├── auth/      (Login, Register, Forgot, OAuth)
│   │   ├── products/  (Catalog, Search, Filters, Detail, Reviews)
│   │   ├── cart/      (Drawer, Item management, Quantity, Promo codes)
│   │   ├── checkout/  (Multi-step: Shipping → Payment → Confirmation)
│   │   ├── orders/    (History, Tracking, Returns, Invoices)
│   │   ├── account/   (Profile, Addresses, Payment methods, Wishlist)
│   │   └── admin/     (Dashboard, Product CRUD, Orders, Users, Analytics)
│   ├── store/         (Root NgRx: AppState configuration)
│   ├── app-routing.module.ts
│   └── app.module.ts
└── environments/
```

### Root State

```typescript
export interface AppState {
  auth:     AuthState;     // { user, loading, error }
  products: ProductsState; // EntityAdapter normalized + filters + pagination
  cart:     CartState;     // { items, promoCode, discount, loading }
  orders:   OrdersState;   // { ids, entities, loading }
  ui:       UIState;       // { sidebarOpen, theme, notifications }
}
```

### Cart — Complete NgRx Implementation

```typescript
// Actions
export const addToCart      = createAction('[Cart] Add',    props<{ product: Product; quantity: number }>());
export const removeFromCart = createAction('[Cart] Remove', props<{ productId: string }>());
export const updateQty      = createAction('[Cart] Update', props<{ productId: string; quantity: number }>());
export const clearCart      = createAction('[Cart] Clear');

// Reducer (immutable)
export const cartReducer = createReducer(initialCartState,
  on(addToCart, (state, { product, quantity }) => {
    const existing = state.items.find(i => i.productId === product.id);
    if (existing) {
      return { ...state, items: state.items.map(i =>
        i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
      )};
    }
    return { ...state, items: [...state.items, { productId: product.id, name: product.name,
      price: product.price, imageUrl: product.imageUrl, quantity }]
    };
  }),
  on(removeFromCart, (s, { productId }) => ({ ...s, items: s.items.filter(i => i.productId !== productId) })),
  on(clearCart, () => initialCartState)
);

// Selectors
export const selectCartItems    = createSelector(selectCartState, s => s.items);
export const selectCartCount    = createSelector(selectCartItems, items => items.reduce((s, i) => s + i.quantity, 0));
export const selectCartSubtotal = createSelector(selectCartItems, items => items.reduce((s, i) => s + i.price * i.quantity, 0));
export const selectCartTotal    = createSelector(selectCartSubtotal, selectCartState,
  (subtotal, state) => subtotal * (1 - state.discount));
```

### Product Search Effects

```typescript
@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts, applyFilters, changePage),
      withLatestFrom(this.store.select(selectProductFilters)),
      switchMap(([, filters]) =>
        this.productApi.getAll(filters).pipe(
          map(res => loadProductsSuccess({ products: res.data, pagination: res.meta })),
          catchError(error => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Debounced search
  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSearchQuery),
      debounceTime(400),
      distinctUntilChanged((a, b) => a.query === b.query),
      map(() => loadProducts())
    )
  );
}
```

### Admin Routing (RBAC)

```typescript
const adminRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['ADMIN'] },
  children: [
    { path: 'dashboard',  component: AdminDashboardComponent },
    { path: 'products',   component: AdminProductListComponent },
    { path: 'products/new', component: AdminProductFormComponent },
    { path: 'products/:id/edit', component: AdminProductFormComponent },
    { path: 'orders',     component: AdminOrdersComponent },
    { path: 'users',      component: AdminUsersComponent },
    { path: 'analytics',  component: AdminAnalyticsComponent }
  ]
}];
```

---

### E-Commerce Full Architecture Diagram

```svg
<svg viewBox="0 0 760 700" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="760" height="700" fill="#060a10" rx="14"/>
  <text x="380" y="36" text-anchor="middle" fill="#f1f5f9" font-size="17" font-weight="700">Enterprise E-Commerce — Full Architecture</text>

  <rect x="300" y="56" width="160" height="38" rx="7" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="380" y="80" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="600">Browser (Angular SPA)</text>

  <rect x="260" y="118" width="240" height="36" rx="7" fill="#1e1e0f" stroke="#eab308" stroke-width="1.5"/>
  <text x="380" y="141" text-anchor="middle" fill="#fde047" font-size="11" font-weight="600">Angular Router + Guards (AuthGuard, RoleGuard)</text>

  <line x1="380" y1="94" x2="380" y2="118" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ec1)"/>

  <text x="380" y="178" text-anchor="middle" fill="#64748b" font-size="10">Lazy-Loaded Feature Modules</text>

  <rect x="20" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#ec4899" stroke-width="1.5"/>
  <text x="70" y="210" text-anchor="middle" fill="#f9a8d4" font-size="10" font-weight="600">auth/</text>
  <text x="70" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Login · Register</text>
  <text x="70" y="238" text-anchor="middle" fill="#4b5563" font-size="8">OAuth · JWT</text>

  <rect x="132" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="182" y="210" text-anchor="middle" fill="#67e8f9" font-size="10" font-weight="600">products/</text>
  <text x="182" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Catalog · Search</text>
  <text x="182" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Filter · Detail</text>

  <rect x="244" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#f97316" stroke-width="1.5"/>
  <text x="294" y="210" text-anchor="middle" fill="#fdba74" font-size="10" font-weight="600">cart/</text>
  <text x="294" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Drawer · Items</text>
  <text x="294" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Promo Codes</text>

  <rect x="356" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#a855f7" stroke-width="1.5"/>
  <text x="406" y="210" text-anchor="middle" fill="#d8b4fe" font-size="10" font-weight="600">checkout/</text>
  <text x="406" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Multi-step</text>
  <text x="406" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Payment · Confirm</text>

  <rect x="468" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#22c55e" stroke-width="1.5"/>
  <text x="518" y="210" text-anchor="middle" fill="#86efac" font-size="10" font-weight="600">orders/</text>
  <text x="518" y="226" text-anchor="middle" fill="#4b5563" font-size="8">History · Track</text>
  <text x="518" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Returns</text>

  <rect x="580" y="188" width="100" height="56" rx="6" fill="#0f1219" stroke="#eab308" stroke-width="1.5"/>
  <text x="630" y="210" text-anchor="middle" fill="#fde047" font-size="10" font-weight="600">admin/</text>
  <text x="630" y="226" text-anchor="middle" fill="#4b5563" font-size="8">Dashboard · CRUD</text>
  <text x="630" y="238" text-anchor="middle" fill="#4b5563" font-size="8">Analytics</text>

  <line x1="310" y1="154" x2="70"  y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="340" y1="154" x2="182" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="365" y1="154" x2="294" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="390" y1="154" x2="406" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="415" y1="154" x2="518" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="445" y1="154" x2="630" y2="188" stroke="#eab308" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- NgRx Store -->
  <rect x="160" y="282" width="440" height="72" rx="8" fill="#110e1e" stroke="#a855f7" stroke-width="2"/>
  <text x="380" y="302" text-anchor="middle" fill="#d8b4fe" font-size="13" font-weight="600">NgRx Store (AppState)</text>
  <rect x="180" y="312" width="68" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="214" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">AuthState</text>
  <rect x="260" y="312" width="80" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="300" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">ProductsState</text>
  <rect x="352" y="312" width="65" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="384" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">CartState</text>
  <rect x="429" y="312" width="72" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="465" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">OrdersState</text>
  <rect x="513" y="312" width="60" height="26" rx="4" fill="#1a0e20" stroke="#a855f7" stroke-width="1"/>
  <text x="543" y="329" text-anchor="middle" fill="#d8b4fe" font-size="9">UIState</text>

  <line x1="380" y1="244" x2="380" y2="282" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#ec2)"/>

  <!-- Effects -->
  <rect x="160" y="390" width="440" height="52" rx="8" fill="#1a1008" stroke="#f97316" stroke-width="1.5"/>
  <text x="380" y="412" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">NgRx Effects</text>
  <text x="380" y="430" text-anchor="middle" fill="#4b5563" font-size="10">ProductsEffects · CartEffects · AuthEffects · OrdersEffects</text>

  <line x1="380" y1="354" x2="380" y2="390" stroke="#f97316" stroke-width="1.5" marker-end="url(#ec3)"/>

  <!-- Interceptors -->
  <rect x="200" y="478" width="360" height="52" rx="8" fill="#0f1e1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="380" y="498" text-anchor="middle" fill="#86efac" font-size="12" font-weight="600">HTTP Interceptors</text>
  <text x="280" y="518" text-anchor="middle" fill="#4b5563" font-size="9">AuthInterceptor</text>
  <text x="380" y="518" text-anchor="middle" fill="#4b5563" font-size="9">ErrorInterceptor</text>
  <text x="480" y="518" text-anchor="middle" fill="#4b5563" font-size="9">LoadingInterceptor</text>

  <line x1="380" y1="442" x2="380" y2="478" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ec4)"/>

  <!-- REST API -->
  <rect x="230" y="566" width="300" height="52" rx="8" fill="#14110a" stroke="#f97316" stroke-width="2"/>
  <text x="380" y="586" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">Backend REST API</text>
  <text x="290" y="606" text-anchor="middle" fill="#4b5563" font-size="9">/products · /cart</text>
  <text x="430" y="606" text-anchor="middle" fill="#4b5563" font-size="9">/orders · /auth · /admin</text>

  <line x1="380" y1="530" x2="380" y2="566" stroke="#f97316" stroke-width="1.5" marker-end="url(#ec5)"/>

  <!-- Databases -->
  <rect x="100" y="650" width="160" height="36" rx="7" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="180" y="673" text-anchor="middle" fill="#94a3b8" font-size="11">PostgreSQL</text>
  <rect x="300" y="650" width="160" height="36" rx="7" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="380" y="673" text-anchor="middle" fill="#94a3b8" font-size="11">Redis (Cache)</text>
  <rect x="500" y="650" width="160" height="36" rx="7" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="580" y="673" text-anchor="middle" fill="#94a3b8" font-size="11">Elasticsearch</text>

  <line x1="320" y1="618" x2="180" y2="650" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="380" y1="618" x2="380" y2="650" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="440" y1="618" x2="580" y2="650" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>

  <defs>
    <marker id="ec1" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#6366f1"/></marker>
    <marker id="ec2" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#a855f7"/></marker>
    <marker id="ec3" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f97316"/></marker>
    <marker id="ec4" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#22c55e"/></marker>
    <marker id="ec5" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f97316"/></marker>
  </defs>
</svg>
```

---
