---
title: "Authorization"
description: "Control user access with RBAC."
sidebar:
  order: 2
---

## Introduction
Authorization controls what authenticated users can do. RBAC (Role-Based Access Control) is the most common pattern.

## Implementation

```typescript
// Route guard
{
  path: 'admin',
  canActivate: [RoleGuard],
  data: { roles: ['ADMIN'] }
}

// Structural directive
@Directive({ selector: '[hasPermission]' })
export class HasPermissionDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {}

  @Input() set hasPermission(permission: string) {
    if (authService.hasPermission(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

## Summary
Always enforce authorization on the server — Angular controls are UX only."
