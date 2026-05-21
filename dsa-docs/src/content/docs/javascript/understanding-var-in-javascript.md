---
title: "Understanding \"var\" in JavaScript"
description: "In JavaScript, var is a keyword that helps us create variables. Think of variables like labeled boxes where you can put different things, like numbers or w"
sidebar:
  order: 6
---

## Understanding "var" in JavaScript

In JavaScript, `var` is a keyword that helps us create variables. Think of variables like labeled boxes where you can put different things, like numbers or words. Here's what you need to know about `var`:

1. **Declaration:** When you say `var` followed by a name, you're telling the computer, "Hey, I want a box with this name to put something in later." It's like reserving a space for your stuff.

   ```javascript
   var age;
   ```

2. **Assignment:** After reserving the space, you can put something in the box using the `=` symbol. This is like saying, "Put this number or word inside the box named 'age'."

   ```javascript
   age = 25;
   ```

3. **Initialization:** Sometimes, you can do both steps together. This is like getting a new box and immediately putting something in it.

   ```javascript
   var name = "John";
   ```

4. **Shadowing:** Imagine you have a big box with a label, and then you put a smaller box with the same label inside it. The smaller box hides the big one. In JavaScript, you can use `var` to make a new box with the same name as an existing one, and it hides the old one.

   ```javascript
   var age = 30; // The big 'age' box
   function example() {
     var age = 40; // The small 'age' box inside the function
     console.log(age); // Outputs: 40 (inside the function)
   }
   console.log(age); // Outputs: 30 (outside the function)
   ```

Remember, `var` used to be common in JavaScript, but now we have `let` and `const` that work a bit better. They make sure your boxes don't hide each other unexpectedly. But understanding `var` helps you read older code and know how things used to work!