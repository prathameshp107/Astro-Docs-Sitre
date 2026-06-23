---
title: "4. Standalone Components"
description: "Standalone components, bootstrapApplication, provideRouter, provideHttpClient — no NgModules."
sidebar:
  order: 4
---

## 4. Standalone Components

### Simple Words First 🟡
Before Angular 14, every component HAD to belong to an `NgModule` — think of it like every employee needing to be in a department. Standalone components are like **freelancers** — they can work on their own without being in any department. They declare their own dependencies directly.

Starting from Angular 15+, **standalone is the default and recommended approach.**

---

### Before: Module-Based (Old Way)

```typescript
// app.module.ts — You NEEDED this file
@NgModule({
  declarations: [AppComponent, UserListComponent, UserCardComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }

// main.ts — Bootstrap the module
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);
```

### After: Standalone (New Way)

```typescript
// user-card.component.ts — Standalone component
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import what you need DIRECTLY

@Component({
  selector: 'app-user-card',
  standalone: true,  // ✅ This component needs NO module!
  imports: [CommonModule],  // Import dependencies right here
  template: `
    <div class="card">
      <h3>{{ userName }}</h3>
      <p *ngIf="isActive">✅ Active</p>
    </div>
  `
})
export class UserCardComponent {
  @Input() userName: string = '';
  @Input() isActive: boolean = false;
}

// app.component.ts — Also standalone
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCardComponent, RouterOutlet], // Import components directly
  template: `
    <app-user-card userName="Alice" [isActive]="true" />
    <router-outlet />
  `
})
export class AppComponent { }

// main.ts — Bootstrap directly (no module!)
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),       // Instead of RouterModule
    provideHttpClient(),          // Instead of HttpClientModule
    provideAnimations(),          // Instead of BrowserAnimationsModule
  ]
});
```

### provide* Functions

```typescript
// Instead of importing NgModules, use provide* functions:

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor])
    ),
    provideAnimations(),

    // Regular providers still work the same
    UserService,
    { provide: APP_CONFIG, useValue: config },
  ]
});
```

### Lazy Loading Routes

```typescript
// With standalone, lazy loading is SIMPLER:
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent)
    // No need for loadChildren with modules!
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent)
  }
];
```

### Standalone Pipes and Directives

```typescript
// standalone.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true  // ✅ Can be used without a module
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    return value.replace(search, `<mark>${search}</mark>`);
  }
}

// standalone.directive.ts
@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
```

### Component-Level Providers

```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  providers: [ProductService],  // Only THIS component tree gets this instance
  template: `...`
})
export class ProductListComponent { }
```

### Module-Based vs Standalone

| Feature | Module-Based | Standalone |
|---|---|---|
| Setup | NgModule required | No NgModule needed |
| Dependencies | Declared in module | Imported directly in component |
| Lazy loading | `loadChildren` | `loadComponent` |
| Bootstrap | `platformBrowserDynamic().bootstrapModule()` | `bootstrapApplication()` |
| Provider setup | `imports` in NgModule | `provide*` functions |
| Learning curve | Steeper (modules concept) | Simpler (just the component) |

### In Simple Words 🧠

- **Standalone components** don't need NgModules — they work on their own
- Add `standalone: true` to the `@Component` decorator
- Import dependencies directly in `imports: [...]` of the component
- Bootstrap with `bootstrapApplication()` instead of `bootstrapModule()`
- Use `provideRouter()`, `provideHttpClient()`, etc. instead of module imports
- **Standalone is the default in Angular 17+** — always use it for new projects
- Old module-based code still works — you can migrate gradually
