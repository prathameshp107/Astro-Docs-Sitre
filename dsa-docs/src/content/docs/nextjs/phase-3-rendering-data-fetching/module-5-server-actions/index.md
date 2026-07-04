---
title: "Module 5: Server Actions"
description: "Both get you food, but the drive-through is faster and requires fewer steps."
---

# Module 5: Server Actions

## Introduction
Server Actions are functions that run on the server but can be called directly from Client Components. They enable you to handle form submissions, data mutations, and cache revalidation without creating API endpoints. Using the `"use server"` directive, you define server-side logic that Client Components can invoke seamlessly.

## Why do we need this?
Traditional form handling requires: create an API endpoint → write client-side fetch logic → handle loading/error states → manually refresh data. Server Actions simplify this: define an async function with `"use server"`, call it from a form's `action` attribute, and Next.js handles the rest — including automatic revalidation.

## Problem Statement
Form handling in React apps has historically been complex. You need to manage form state, handle submissions, show loading indicators, validate data, display errors, and refresh the UI after success. Server Actions eliminate most of this boilerplate by running on the server and integrating directly with Next.js's caching system.

## Real World Story
A team building a task management app needed to handle: creating tasks, updating status, adding comments, and deleting items. Previously, each action required a separate API endpoint with client-side state management. After adopting Server Actions, they reduced form-related code by 70% and eliminated all client-side loading states — the UI updates automatically after each Server Action completes.

## Real World Analogy
Think of Server Actions like **a drive-through window**:
- **Traditional API approach**: You park your car, walk into the restaurant, order at the counter (API endpoint), wait, get your food, walk back, and drive away (client-side state management)
- **Server Actions**: You pull up to the drive-through window, place your order (form submit), the kitchen prepares it (server function), and hands it to you directly (automatic UI update)

Both get you food, but the drive-through is faster and requires fewer steps.

## Learning objectives
By the end of this module, you will be able to:
- Create and use Server Actions with `"use server"`
- Handle form submissions with Server Actions
- Implement mutations with cache revalidation
- Handle errors, loading states, and optimistic updates

## Prerequisites
- Completed Modules 1-4 of Phase 3
- Understanding of forms and mutations

## Learning roadmap
1. What are Server Actions
2. Form Handling with Server Actions
3. Mutations and Revalidation
4. Error Handling and Optimistic Updates

## Topics covered
- `"use server"` directive (inline and module-level)
- Form `action` attribute with Server Actions
- `useActionState` for form state management
- `useFormStatus` for loading states
- `revalidatePath` for cache refresh
- `revalidateTag` for targeted invalidation
- Error handling in Server Actions
- Optimistic updates with `useOptimistic`
- Server Actions with Client Component event handlers

## Estimated learning time
8-10 hours

## Real-world applications
- Contact forms
- Comment systems
- Task management (CRUD)
- E-commerce carts
- User profile updates

## Practice exercises
- Build a comment form with Server Action
- Implement task creation with revalidation
- Add optimistic updates for likes

## Mini Projects
- **Task Manager**: Full CRUD with Server Actions
- **Comment System**: Nested comments with revalidation
- **E-commerce Cart**: Add/remove items with Server Actions

## Related Topics
- Data Fetching Patterns (Module 2)
- Caching & Revalidation (Module 3)
- Forms and Validation (Phase 4)
- Authentication (Phase 5)
