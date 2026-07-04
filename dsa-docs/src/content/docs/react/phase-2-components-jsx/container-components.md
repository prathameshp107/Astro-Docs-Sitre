---
title: "Container Components"
description: "Container components: components that manage data, state, and business logic, delegating rendering to presentational components."
---

# Container Components

## Introduction

Container (or "smart") components are concerned with **how things work**. They manage state, fetch data, contain business logic, and pass data down to presentational components.

## Characteristics

- Manage state and data fetching
- Contain business logic
- Delegate rendering to presentational children
- Connect to data sources (APIs, Redux, context)
- Less reusable (specific to app logic)

## Example

```jsx
function UserContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(d => { setUsers(d); setLoading(false); });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} onEdit={handleEdit} />
      ))}
    </div>
  );
}
```

## Best Practices

💡 The container/presentational pattern separates concerns: containers handle logic, presentational handles UI.

🚀 Use custom hooks to extract reusable logic from containers.

## MCQ

1. **What does a container component manage?** A) UI styling  B) Data + logic  C) Animations  D) Layout → *B*
2. **How does a container pass data?** A) Via props  B) Via global vars  C) Via DOM  D) Via CSS → *A*

## Summary

📖 Smart components that handle data and logic, delegating rendering to presentational components.

## Related Topics

[Presentational Components](presentational-components) | [Custom Hooks](../phase-4-hooks/custom-hooks)
