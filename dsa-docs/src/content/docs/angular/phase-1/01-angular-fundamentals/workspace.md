---
title: "Angular Workspace"
description: "Understanding Angular workspace structure and monorepo management."
sidebar:
  order: 6
---

## Introduction
An Angular workspace is a folder that contains one or more Angular projects (applications or libraries) along with shared configuration files.

## Why do we need it?
To manage multiple related projects in a single repository, share dependencies, and maintain consistent tooling across the organization.

## Real-world analogy
Like a business park that houses multiple companies (projects) sharing common infrastructure (utilities, security, parking) — an Angular workspace contains multiple projects sharing node_modules, CLI configuration, and build tools.

## Visual Explanation
![workspace diagram](https://via.placeholder.com/400x200?text=Angular+Workspace+Structure)

## Mermaid Diagram
```mermaid
graph TD
    A[Angular Workspace] --> B[angular.json]
    A --> C[package.json]
    A --> D[tsconfig.json]
    A --> E[/projects/]
    E --> F[Project 1: your-app]
    E --> G[Project 2: your-lib]
    F --> F1[src/]
    F --> F2[project-specific tsconfig]
    G --> G1[src/lib/]
    G --> G2[package.json (for library)]
    A --> H[.gitignore]
    A --> I[README.md]
    A --> J[/node_modules/]
```

## Deep Explanation
Introduced in Angular 6, the workspace structure changed from a single application per CLI setup to a monorepo-style approach:
- **angular.config.json** (deprecated) → **angular.json** (workspace-wide configuration)
- **package.json**: Root dependencies shared by all projects
- **tsconfig.json**: Root TypeScript configuration (can be extended by projects)
- **projects/**: Directory containing individual projects
- Each project has its own:
  - src/ (application source)
  - project-specific tsconfig (extends root)
  - build targets in angular.json
- Supports both applications and libraries
- Enables ng generate library/my-lib
- Allows sharing of code via local npm packages (ng-packagr)

## Code Example
```json
// angular.json (workspace configuration)
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "customer-portal": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      // ... architect configuration
    },
    "ui-components": {
      "projectType": "library",
      "root": "projects/ui-components",
      "sourceRoot": "projects/ui-components/src",
      "prefix": "ui",
      // ... library-specific configuration
    }
  }
}
```

## Best Practices
- Use a workspace when you have multiple related applications (e.g., admin dashboard, public site)
- Create reusable libraries for shared components and services
- Keep third-party dependencies in the root package.json
- Use project-specific tsconfig to extend the root configuration
- Leverage npm workspaces or Yarn workspaces for finer control (though Angular CLI manages this)
- Document the purpose of each project in the workspace/README.md

## Common Mistakes
- Treating the workspace like a single project and putting all code in src/
- Forgetting to build libraries before consuming them in applications
- Misunderstanding the difference between application and project types
- Not setting up proper paths for library consumption
- Committing the dist/ or node_modules/ folders

## Interview Questions
1. What is the difference between an Angular workspace and an Angular project?
2. How would you create a library within an Angular workspace?
3. Where are build targets defined for projects in a workspace?

## Summary
An Angular workspace provides a scalable structure for managing multiple Angular projects (applications and libraries) under a single configuration, promoting code reuse and consistent tooling.