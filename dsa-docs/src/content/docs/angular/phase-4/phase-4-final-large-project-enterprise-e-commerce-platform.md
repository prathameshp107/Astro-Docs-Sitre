---
title: "7. Final Large Project: Enterprise E-Commerce Platform"
description: "// Reducer (immutable) export const cartReducer = createReducer(initialCartState, on(addToCart, (state, { product, quantity }) = { const existing = state.i"
sidebar:
  order: 13
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

![Enterprise E-Commerce — Full Architecture](/DSA-Notes-Problems/assets/angular/phase-4-4-enterprise-e-commerce-full-architecture.svg)

---
