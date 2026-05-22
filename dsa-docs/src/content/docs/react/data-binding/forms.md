---
title: "Forms"
description: "React forms, controlled and uncontrolled components, and form libraries."
---

# Forms

- React uses forms to collect user data.
- Use `event.target.value` for field value, `event.target.name` for field name.
- Use `event.preventDefault()` to prevent page refresh on submit.

### Controlled vs Uncontrolled Components

| Feature | Uncontrolled | Controlled |
|---------|-------------|------------|
| One-time value retrieval |  |  |
| Validating on submit |  |  |
| Default value |  |  |
| Field-level Validation |  |  |
| Conditionally disabling submit |  |  |
| Enforcing input format |  |  |
| Dynamic inputs |  |  |

```jsx
// Controlled input
<input onChange={this.onChange} value={this.state.name} />

// Textarea in React
<textarea value={this.state.description} />

// Select in React
<select value={this.state.mycar}>
  <option value="Ford">Ford</option>
</select>
```

### NPM Libraries for Form Handling
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [formik](https://www.npmjs.com/package/formik)
- [yup](https://www.npmjs.com/package/yup)

---
