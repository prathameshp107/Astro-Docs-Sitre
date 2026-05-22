---
title: "Uncontrolled Components"
description: "Form components where the DOM stores the current input value."
---

# Uncontrolled Components

An uncontrolled component lets the DOM manage the form value. React reads the value only when needed, usually through a ref.

```jsx
function InputField() {
  const inputRef = React.useRef();

  function handleClick() {
    console.log(inputRef.current.value);
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Submit</button>
    </>
  );
}
```

## When To Use

- Simple forms
- File inputs
- Cases where you do not need live validation

Controlled components are usually preferred when form state matters.

