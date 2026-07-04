---
title: "Standalone Components"
description: "Learn about Angular standalone components and how they simplify application architecture."
sidebar:
  order: 4
---

## Introduction

Standalone components are components that don't need to be declared in an NgModule. They manage their own dependencies by directly importing what they need. Introduced in Angular 14 and became the default in Angular 17.

## Why do we need this?

NgModules added complexity and boilerplate. Standalone components eliminate the need for NgModule files, making Angular more approachable for beginners and reducing boilerplate for experienced developers.

## Real-world analogy

Think of NgModules as **company departments**. Every employee had to belong to a department. Standalone components are like **freelancers** — they work independently and import only what they need directly.

## Deep Explanation

```typescript
@Component({
  selector: 'app-example',
  standalone: true,  // No NgModule needed
  imports: [CommonModule, FormsModule],  // Import dependencies directly
  template: `<p>{{ message }}</p>`
})
export class ExampleComponent {
  message = 'Hello from standalone!';
}

// Bootstrap without NgModule
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
```

## Best Practices

- Use standalone for all new components in Angular 17+
- Use provide* functions (provideRouter, provideHttpClient) instead of modules
- Lazy load with loadComponent() instead of loadChildren()

## Summary

Standalone components are the modern way to build Angular apps. They reduce boilerplate, simplify architecture, and are the recommended approach for Angular 17+."
