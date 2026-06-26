---
title: "Forms & Inputs"
description: "HTML forms let users enter and submit data — inputs, labels, validation attributes, and button types."
sidebar:
  order: 4
---

## Forms & Inputs

### 🤔 What is a Form?

A form is a section of a webpage where users can enter information and send it to a server.

Think of it like a **paper application form**:
- There are fields to fill (name, email, message)
- Each field has a label so you know what to type
- You click "Submit" and the form gets processed

```html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <button type="submit">Submit</button>
</form>
```

> **Result:** A simple form with a text input and a submit button. Clicking submit sends the data to `/submit`.

---

### 📝 Input Types

HTML provides many input types for different kinds of data:

```html
<!-- Text -->
<input type="text" placeholder="Enter your name">

<!-- Email (validates @ format) -->
<input type="email" placeholder="you@example.com">

<!-- Password (hides characters) -->
<input type="password" placeholder="Enter password">

<!-- Number (with min/max) -->
<input type="number" min="1" max="100" value="10">

<!-- Date picker -->
<input type="date">

<!-- Color picker -->
<input type="color" value="#ff0000">

<!-- Checkbox (yes/no toggle) -->
<input type="checkbox" id="agree">
<label for="agree">I agree to the terms</label>

<!-- Radio buttons (choose one) -->
<input type="radio" name="gender" value="male" id="male">
<label for="male">Male</label>
<input type="radio" name="gender" value="female" id="female">
<label for="female">Female</label>

<!-- Dropdown select -->
<select>
  <option value="">Choose...</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>

<!-- Text area (multi-line) -->
<textarea rows="4" cols="50" placeholder="Write your message here..."></textarea>

<!-- Range slider -->
<input type="range" min="0" max="100" value="50">
```

> **Result:** Each input type renders differently — email shows a keyboard with @ on mobile, date shows a calendar picker, color shows a color wheel, etc.

---

### 🏷️ Labels

Always connect labels to inputs using `for` and `id`:

```html
<!-- Connected label -->
<label for="email">Email Address:</label>
<input type="email" id="email" name="email">

<!-- Clicking the label focuses the input! -->
```

**Why labels matter:**
- Clicking the label focuses the input (bigger click target)
- Screen readers read the label aloud
- Better for mobile users

---

### ✅ Validation

HTML includes built-in validation:

```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" required>
  
  <label for="age">Age (18-99):</label>
  <input type="number" id="age" min="18" max="99" required>
  
  <label for="url">Website:</label>
  <input type="url" id="url" placeholder="https://example.com">
  
  <label for="password">Password (min 6 chars):</label>
  <input type="password" id="password" minlength="6" required>
  
  <button type="submit">Submit</button>
</form>
```

| Attribute | What it does |
|-----------|-------------|
| `required` | Field must be filled |
| `min` / `max` | Number range |
| `minlength` / `maxlength` | Character length limits |
| `pattern` | Regex pattern matching |
| `type="email"` | Must be a valid email |
| `type="url"` | Must be a valid URL |

> **Result:** If the user tries to submit with invalid data, the browser shows an error message automatically (no JavaScript needed).

---

### 🔘 Button Types

```html
<!-- Submits the form (default) -->
<button type="submit">Submit</button>

<!-- Resets all form fields to default values -->
<button type="reset">Reset</button>

<!-- Does nothing — used for custom JavaScript -->
<button type="button">Click Me</button>
```

> **Result:** A submit button sends the form, reset clears it, and a plain button waits for custom JavaScript.

---

### 📋 Complete Form Example

```html
<form action="/signup" method="POST">
  <h2>Sign Up</h2>
  
  <label for="name">Full Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" minlength="6" required>
  
  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="">Select...</option>
    <option value="US">United States</option>
    <option value="UK">United Kingdom</option>
    <option value="IN">India</option>
  </select>
  
  <label>
    <input type="checkbox" name="terms" required>
    I agree to the Terms & Conditions
  </label>
  
  <button type="submit">Create Account</button>
</form>
```

> **Result:** A complete sign-up form with text, email, password, dropdown, checkbox, and submit button. Validation happens automatically.

---

### In Simple Words

- `<form>` wraps all the inputs; `action` sets where data goes, `method` sets how (GET/POST)
- Use the right `<input type>` — email, number, date, password — for each kind of data
- Always connect `<label>` to inputs with `for` and `id`
- HTML validates automatically with `required`, `min`, `max`, `minlength`, `pattern`
- `<button type="submit">` sends the form; `type="reset"` clears it; `type="button"` does nothing (used with JS)
