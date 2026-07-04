---
title: "Lists and Keys"
description: "Rendering lists in React: using map(), the key prop for stable identity, and why index keys cause bugs."
---

# Lists and Keys

## Introduction

React renders lists using JavaScript's `map()` method to transform an array into an array of JSX elements. Each element in a rendered list needs a special `key` prop that gives it a **stable, unique identity** across renders. Keys help React identify which items changed, were added, or were removed.

---

## Basic List Rendering

```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange'];

  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

**Explanation:** `map()` transforms each string into a `<li>` element. The `key` prop is the fruit name itself — stable and unique.

---

## Why Use `map()` Instead of `forEach()`?

`forEach()` returns `undefined`. `map()` returns a new array. Since JSX needs an array of elements, `map()` is the correct choice.

```jsx
// ❌ BAD — forEach returns undefined, nothing renders
const items = [];
arr.forEach(item => items.push(<li>{item}</li>));

// ✅ GOOD — map returns an array of elements
const items = arr.map(item => <li key={item}>{item}</li>);
```

---

## The Key Prop

Keys tell React which array item corresponds to which component instance across renders. This matters when the list changes — items are inserted, deleted, or reordered.

- **Stable:** The key should stay the same for the same item across renders.
- **Unique:** No two sibling items should have the same key.

```jsx
// ✅ GOOD — database ID is stable and unique
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// ❌ BAD — Math.random() changes every render, destroys all DOM nodes
{users.map(user => (
  <UserCard key={Math.random()} user={user} />
))}
```

---

## Index as Key: When It's Safe and When It Breaks

Using the array index as a key is a common pitfall:

```jsx
// ⚠️ Works but fragile
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}
```

**When it's safe:**
- The list is **static** — items are never reordered, inserted, or deleted.
- The list is **small** and has no stateful children (no inputs, checkboxes).

**When it breaks:**
- Items are reordered (sort, filter).
- Items are inserted or deleted from the middle.
- Children have local state (input fields lose values).

---

## Example: Index Key Bug

```jsx
import { useState } from 'react';

export default function IndexKeyDemo() {
  const [items, setItems] = useState(['Alice', 'Bob', 'Charlie']);

  const deleteFirst = () => setItems(prev => prev.slice(1));

  return (
    <div>
      <button onClick={deleteFirst}>Delete First</button>
      {items.map((item, index) => (
        <div key={index}> {/* ❌ Index key — after deletion, "Bob" gets index 0, keeps Alice's input */}
          {item}: <input placeholder="Comment..." />
        </div>
      ))}
    </div>
  );
}
```

**Why it breaks:** When "Alice" is deleted, "Bob" shifts to index 0. React associates the input state with index 0 (which was Alice's), so Bob's input shows Alice's old text. Using `key={item}` fixes this.

---

## Rendering from JSON Files

```jsx
import products from './products.json';

function ProductList() {
  return (
    <div>
      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '12px' }}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Best Practices

💡 **Did You Know?** Keys only need to be unique among siblings, not globally unique across the entire app. Two different lists can use the same keys.

🚀 **Best Practices**
- Use database IDs (`user.id`, `product.id`) as keys.
- Use stable identifiers like slugs or UUIDs.
- For static lists, index keys are acceptable but prefer stable IDs.
- Never use `Math.random()` or `Date.now()` as keys.
- Keys are not passed as props to the component — React uses them internally.

---

## Common Mistakes

⚠ **Missing Key Warning**: If you forget the key prop, React logs a warning: `Each child in a list should have a unique "key" prop`. Always add a key.

⚠ **Duplicate Keys**: Two siblings with the same key cause unpredictable rendering bugs. React may reuse or skip items.

⚠ **Keys on Fragments**: If you use `<></>`, you can't add a key. Use `<Fragment key={id}>` instead.

```jsx
import { Fragment } from 'react';

{items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.name}</dt>
    <dd>{item.description}</dd>
  </Fragment>
))}
```

---

## Summary

- Use `map()` to render lists from arrays.
- Use stable, unique `key` props for list items.
- Avoid index keys when lists can change.
- Keys help React identify items across re-renders.

## Related Topics

- [Conditional Rendering](conditional-rendering)
- [Events in React](events)
- [Children Prop](children-prop)

## Further Reading

- [React Docs: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React Docs: Key Prop](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
