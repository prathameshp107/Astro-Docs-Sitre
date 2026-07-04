---
title: "Project Overview"
description: "What you'll build and learn with the admin dashboard project."
---

# Project Overview

## What You'll Build

An admin dashboard where users can sign in, view analytics, manage users, and interact with data visualizations. The dashboard has a sidebar layout, protected routes, and real data from a database.

## Key Features

### 1. Authentication

- Sign in with email/password or Google
- Session management with Auth.js
- Protected routes via middleware

### 2. Dashboard Layout

- Persistent sidebar with navigation
- Header with user avatar and logout
- Responsive — collapses to mobile menu

### 3. Analytics Page

- Key metrics (users, revenue, orders)
- Line chart for monthly trends
- Bar chart for category distribution

### 4. Users Management

- Paginated user table
- Search and filter functionality
- Edit and delete actions

## Pages

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/login` | Sign in page | No |
| `/dashboard` | Analytics overview | Yes |
| `/dashboard/users` | User management | Yes |
| `/dashboard/settings` | Profile settings | Yes |

## Learning Objectives

- Configure middleware for route protection
- Build a responsive sidebar layout
- Fetch and display chart data from a database
- Implement CRUD operations in a dashboard context
- Handle loading states with Suspense boundaries
