---
title: "Angular Form Types in TypeScript"
description: "Complete guide to typing Angular forms: typed reactive forms, FormGroup types, custom validators, and form value types."
---

## Angular Form Types

### Typed Reactive Form

```typescript
interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
  role: FormControl<'user' | 'admin'>;
  address: FormGroup<{
    street: FormControl<string>;
    city: FormControl<string>;
    zip: FormControl<string>;
  }>;
}

const form = new FormGroup<UserForm>({
  name: new FormControl('', { nonNullable: true }),
  email: new FormControl('', { nonNullable: true }),
  age: new FormControl(null),
  role: new FormControl('user', { nonNullable: true }),
  address: new FormGroup({
    street: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    zip: new FormControl('', { nonNullable: true }),
  }),
});

// Typed value access
const nameValue: string = form.value.name!; // typed!
```

### Interview Questions

**Easy:** How do you type a FormGroup in Angular?

**Medium:** What's the difference between FormControl with and without nonNullable?

**Hard:** How would you create a typed custom validator that checks field dependencies?
