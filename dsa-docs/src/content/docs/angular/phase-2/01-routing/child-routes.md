---
title: "Child Routes"
description: "Nested routing with child routes."
sidebar:
  order: 2
---

## Introduction
Child routes allow nested navigation within a parent component. The parent component has its own <router-outlet> where child components render.

## Implementation

```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
```

## Summary
Child routes organize complex layouts and create natural URL hierarchies."
