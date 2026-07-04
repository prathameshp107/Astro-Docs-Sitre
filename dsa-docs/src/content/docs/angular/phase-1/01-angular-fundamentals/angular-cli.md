---
title: "Angular CLI"
description: "Using the Angular CLI for project creation, scaffolding, and development."
sidebar:
  order: 5
---

## 2.3 Angular CLI

### Simple Words First 🟡
The Angular CLI (Command Line Interface) is like a **magic wand**. Instead of manually creating 15 files to make one component, you type one command and it does everything for you.

### Installation

```bash
# Install Angular CLI globally (do this once on your machine)
npm install -g @angular/cli

# Verify installation
ng version
```

### Most Used CLI Commands

```bash
# Create a new project
ng new my-app

# Start the development server (with live reload)
ng serve

# Generate a new component
ng generate component user-list
# Shorthand:
ng g c user-list

# Generate a service
ng g s user

# Generate a module
ng g m users

# Build for production
ng build --configuration production

# Run tests
ng test

# Get help
ng help
```
---