---
title: "11. Assignments"
description: "Goal: Practice creating components and using interpolation."
sidebar:
  order: 11
---

## 8. Assignments

### In Simple Words 🧠

- Assignments are the best way to solidify what you've learned — code each one from scratch
- Start with the basics (profile card) and work your way up to the full product catalog
- Don't peek at solutions until you've tried for at least 15 minutes
- Focus on understanding WHY each piece works, not just making it work
- The skills you practice here (data binding, directives, pipes) are used in EVERY Angular project

---

### Assignment 2: Data Binding Practice

**Goal:** Practice all 4 types of data binding.

**Task:**
Create a `UserFormComponent` with:
1. An input field for a name (two-way binding with `[(ngModel)]`)
2. A live preview: "Hello, [name]!" that updates as you type
3. A "Submit" button that is disabled until name has at least 3 characters
4. When submitted, display the submitted name below the form

**Starter code:**
```typescript
export class UserFormComponent {
  name: string = '';
  submittedName: string = '';
  // Your code here
}
```

---

### Assignment 3: Directives Practice

**Goal:** Practice `*ngIf`, `*ngFor`, and `*ngSwitch`.

**Task:**
Create a `TaskListComponent`:
1. Display a list of tasks using `*ngFor`
2. Each task has: id, title, priority ('low' | 'medium' | 'high'), completed (boolean)
3. Use `*ngIf` to show "✅ Done" badge only for completed tasks
4. Use `*ngSwitch` to show colored dots based on priority (🟢 low, 🟡 medium, 🔴 high)
5. Add a filter button to show/hide completed tasks
6. Show "No tasks found" when the list is empty

---

### Assignment 4: Custom Pipe

**Goal:** Create a useful custom pipe.

**Task:**
Create a `TimeAgoPipe` that converts a date to a human-readable "time ago" string:
- Less than 60 seconds → "just now"
- Less than 60 minutes → "X minutes ago"
- Less than 24 hours → "X hours ago"
- Otherwise → "X days ago"

```html
<!-- Usage: -->
<p>Posted: {{ post.createdAt | timeAgo }}</p>
<!-- Output: "Posted: 5 minutes ago" -->
```

---

### Assignment 5: Putting It Together

**Goal:** Build a mini product catalog app.

**Task:**
Create a `ProductCatalogComponent` with:
1. An array of 6 products (name, price, category, inStock boolean, rating)
2. Search input to filter products by name (use a filter pipe or `*ngIf`)
3. Show "In Stock" or "Out of Stock" badge using `*ngIf`
4. Format price with `currency` pipe (INR)
5. Show star rating using `*ngFor` (loop 5 stars, fill them based on rating)
6. "Add to Cart" button disabled when out of stock
7. Counter showing how many items are in the cart

---
