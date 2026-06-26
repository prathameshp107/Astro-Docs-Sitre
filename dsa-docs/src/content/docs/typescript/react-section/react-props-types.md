---
title: "React Props Types in TypeScript"
description: "Complete guide to typing React component props with TypeScript: interfaces, unions, generics, children, and advanced patterns."
---

## React Props Types

### Basic Props Interface

```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onClick, children }) => {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{label}{children}</button>;
};
```

### Generic Props

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return <ul>{items.map((item, i) => <li key={keyExtractor(item)}>{renderItem(item, i)}</li>)}</ul>;
}
```

### Interview Questions

**Easy:** How do you type React props with TypeScript?

**Medium:** How do you make a generic component with typed props?

**Hard:** How would you type a polymorphic component's 'as' prop?
