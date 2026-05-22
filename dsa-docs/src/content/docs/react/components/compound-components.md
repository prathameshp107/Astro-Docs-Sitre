---
title: "Compound Components"
description: "React component pattern where related child components work together."
---

# Compound Components

Compound components are multiple components designed to work together under one parent API.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.Title = function CardTitle({ children }) {
  return <h2>{children}</h2>;
};

Card.Body = function CardBody({ children }) {
  return <p>{children}</p>;
};
```

Use it like this:

```jsx
<Card>
  <Card.Title>Title</Card.Title>
  <Card.Body>Description</Card.Body>
</Card>
```

## Benefit

The parent component gives structure while child components keep the API readable.

