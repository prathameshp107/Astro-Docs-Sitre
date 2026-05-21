---
title: "Understanding \"const\" in JavaScript"
description: "In JavaScript, const is a keyword that introduces the concept of constants, which are variables with fixed, unchanging values. Let's delve deeper into how"
sidebar:
  order: 8
---

## Understanding "const" in JavaScript

In JavaScript, `const` is a keyword that introduces the concept of constants, which are variables with fixed, unchanging values. Let's delve deeper into how `const` works:

1. **Declaration:** When you declare a constant using `const`, you're essentially creating a labeled container for a value that remains constant. It's like setting up a special box for something that won't change.

   ```javascript
   const pi = 3.14;
   ```

2. **Assignment:** After declaring a constant, you assign it a value once, and that's it. You can't put anything else in the box. It's like sealing the box with the value you've chosen.

   ```javascript
   const age = 25;
   ```

3. **Initialization:** Unlike `let`, with `const`, you must assign a value when declaring. It's like placing something inside the box as soon as you create it.

   ```javascript
   const name = "John";
   ```

4. **Block Scoping:** Similar to `let`, `const` respects block boundaries. The constant only exists within the block it's declared in. This feature helps prevent accidental changes.

   ```javascript
   if (true) {
     const x = 10; // 'x' only exists within this if-block
     console.log(x); // Outputs: 10
   }
   console.log(x); // Throws an error (x is not defined)
   ```

5. **No Reassignment:** One of the key features of `const` is that once you assign a value to it, you can't change it. It's like sealing the box and declaring, "This value will remain as is forever."

   ```javascript
   const pi = 3.14;
   pi = 3.14159; // Throws an error (can't reassign)
   ```

6. **Usage for Unchanging Values:** Use `const` for things that shouldn't change, such as mathematical constants (like π), configuration settings, or values that remain consistent throughout your program.

7. **Objects and Arrays:** While a `const` variable itself can't be reassigned, the contents of objects and arrays declared with `const` can be modified. The container remains constant, but the items inside can change.

   ```javascript
   const numbers = [1, 2, 3];
   numbers.push(4); // This is allowed
   numbers = [5, 6, 7]; // Throws an error (can't reassign)
   ```

Remember, `const` provides a way to ensure that certain values remain unchanging throughout your program. It's like having a sealed box that safeguards the value you initially placed inside.

# Data Types in JavaScript

In JavaScript, data types categorize the various kinds of values that variables can hold. They play a critical role in how values are stored, manipulated, and interact within your code. There are two primary categories of data types: primitive data types and composite data types. Let's dive deeper into primitive data types, elaborating on each point with comprehensive explanations and examples:

### Primitive Data Types:

Primitive data types are the fundamental building blocks of data in JavaScript. They are simple, immutable values that represent basic concepts. JavaScript has six primitive data types:

1. **Number:**
   - Represents both integer and floating-point numbers.
   - Examples: `42`, `3.14`, `-10`.
      #### "Number" Data Type in JavaScript

      In JavaScript, the "Number" data type plays a crucial role in managing numeric values, encompassing both integers and floating-point numbers. It serves as the foundation for performing mathematical operations, calculations, and various computations. Let's delve into a comprehensive understanding of the "Number" data type, addressing each point in detail:

      #### Mathematical Operations and Type Coercion:

      JavaScript handles type coercion during mathematical operations, even in edge cases. Let's examine some scenarios:

      1. **Edge Cases of Addition and Subtraction:**
            - JavaScript converts values to a common type for addition and subtraction.
            - Example: `"5" + 2` results in `"52"` (string concatenation), while `"5" - 2` results in `3` (numeric subtraction).

      2. **Adding Number with Boolean:**
            - When a number is added to a boolean, JavaScript treats `true` as 1 and `false` as 0.
            - Example: `true + 10` results in `11`.

      3. **Subtracting Boolean from Number:**
            - When you subtract a boolean from a number, JavaScript similarly converts `true` to 1 and `false` to 0.
            - Example: `5 - false` results in `5`.

      #### Special Numeric Values:

      1. **NaN (Not-a-Number):**
            - Represents undefined or unrepresentable values resulting from mathematical operations.
            - Example: `0 / 0` results in `NaN`.

      2. **Infinity and -Infinity:**
            - Arise from mathematical operations like division by zero or overflow.
            - Example: `1 / 0` results in `Infinity`, and `-1 / 0` results in `-Infinity`.

      #### Infinity and Maximum Values:

      1. **Infinity:**
            - Represents a value greater than any other number.
            - Example: `Infinity` is the result of `1 / 0`.

      2. **Number.MAX_VALUE:**
            - Represents the largest finite positive number that can be represented in JavaScript.
            - Example: `Number.MAX_VALUE` is approximately `1.7976931348623157e+308`.

      #### Conversion to Number:

      1. **parseInt() and parseFloat():**
            - `parseInt()` converts a string to an integer.
            - `parseFloat()` converts a string to a floating-point number.
            - Example: `parseInt("10")` results in `10`, and `parseFloat("3.14")` results in `3.14`.

         **Logic Behind parseInt() and parseFloat():**
            - These functions parse from left to right until an invalid character is encountered.
            - For `parseInt()`, it stops parsing when a non-digit character is encountered.
            - For `parseFloat()`, it considers digits, a single decimal point, and scientific notation.

         #### Example Scenarios:

         ```javascript
         console.log("5" + 2);           // Outputs: "52"
         console.log("5" - 2);           // Outputs: 3
         console.log(true + 10);         // Outputs: 11
         console.log(5 - false);         // Outputs: 5

         console.log(0 / 0);             // Outputs: NaN
         console.log(1 / 0);             // Outputs: Infinity
         console.log(-1 / 0);            // Outputs: -Infinity

         console.log(Number.MAX_VALUE);   // Outputs: 1.7976931348623157e+308

         console.log(parseInt("10"));     // Outputs: 10
         console.log(parseFloat("3.14")); // Outputs: 3.14
         ```

2. **String:**
   - Represents sequences of characters, often used for text.
   - Enclose strings in single or double quotes.
   - Examples: `"Hello"`, `'World'`.

     ### Strings in JavaScript

      In JavaScript, strings are essential for handling textual data. They represent sequences of characters
      #### Creating Strings:

      Strings can be created using single quotes `'`, double quotes `"`, or backticks `` ` ``:

      ```javascript
      let singleQuoted = 'Hello, world!';
      let doubleQuoted = "JavaScript is versatile.";
      let backticks = `Strings can use ${interpolation}.`;
      ```

      #### String Properties and Methods:
      
      1. **String Length:**
         - `length`: Returns the number of characters in a string.
           ```javascript
           const str = "Hello, world!";
           console.log(str.length); // Outputs: 13
           ```
      
      2. **Accessing Characters:**
         - Indexing: You can access individual characters in a string using their index.
           ```javascript
           const str = "JavaScript";
           console.log(str[0]); // Outputs: "J"
           console.log(str.charAt(4)); // Outputs: "S"
           ```
      
      3. **Substring:**
         - `substring(start, end)`: Returns a new string containing characters from the specified start index to the end index (excluding).
         - `substr(start, length)`: Returns a new string containing characters from the specified start index and up to the specified length.
         - `slice(start, end)`: Returns a new string containing characters from the specified start index to the end index (excluding), similar to `substring`.
           ```javascript
           const str = "JavaScript";
           console.log(str.substring(0, 4)); // Outputs: "Java"
           console.log(str.substr(4, 6));    // Outputs: "Script"
           console.log(str.slice(4, 7));     // Outputs: "Scr"
           ```
      
      4. **Searching and Finding:**
         - `indexOf(searchString, startIndex)`: Returns the index of the first occurrence of the specified search string, starting from the given index.
         - `lastIndexOf(searchString, startIndex)`: Returns the index of the last occurrence of the specified search string, starting from the given index.
         - `includes(searchString)`: Returns a boolean indicating whether the string contains the specified search string.
         - `startsWith(searchString)`: Returns a boolean indicating whether the string starts with the specified search string.
         - `endsWith(searchString)`: Returns a boolean indicating whether the string ends with the specified search string.
           ```javascript
           const str = "JavaScript is great";
           console.log(str.indexOf("is"));       // Outputs: 11
           console.log(str.includes("great"));  // Outputs: true
           console.log(str.startsWith("Java")); // Outputs: true
           ```
      
      5. **Changing Case:**
         - `toUpperCase()`: Returns a new string with all characters converted to uppercase.
         - `toLowerCase()`: Returns a new string with all characters converted to lowercase.
           ```javascript
           const str = "JavaScript";
           console.log(str.toUpperCase()); // Outputs: "JAVASCRIPT"
           console.log(str.toLowerCase()); // Outputs: "javascript"
           ```
      
      6. **Replacing:**
         - `replace(oldValue, newValue)`: Returns a new string with all occurrences of the old value replaced by the new value.
           ```javascript
           const str = "Hello, world!";
           const newStr = str.replace("world", "universe");
           console.log(newStr); // Outputs: "Hello, universe!"
           ```
      
      7. **Trimming:**
         - `trim()`: Returns a new string with leading and trailing white spaces removed.
           ```javascript
           const str = "   Hello, world!   ";
           console.log(str.trim()); // Outputs: "Hello, world!"
           ```
      
      8. **Splitting and Joining:**
         - `split(separator)`: Splits the string into an array of substrings based on the specified separator.
         - `join(separator)`: Joins an array of strings into a single string, using the specified separator.
           ```javascript
           const str = "apple,banana,orange";
           const fruitsArray = str.split(",");
           console.log(fruitsArray); // Outputs: ["apple", "banana", "orange"]
           console.log(fruitsArray.join(" | ")); // Outputs: "apple | banana | orange"
           ```
      
      9. **String Concatenation:**
         - `concat(string1, string2, ..., stringN)`: Combines multiple strings and returns a new concatenated string.
           ```javascript
           const str1 = "Hello, ";
           const str2 = "world!";
           const greeting = str1.concat(str2);
           console.log(greeting); // Outputs: "Hello, world!"
           ```
      
      10. **String Template Literals:**
          - Template literals allow you to embed expressions within a string, denoted by backticks (\` \`). They offer a convenient way to interpolate variables and expressions.
          ```javascript
          const name = "Alice";
          const age = 30;
          const message = `My name is ${name} and I am ${age} years old.`;
          console.log(message); // Outputs: "My name is Alice and I am 30 years old."
          ```
      
      11. **Character Code Access:**
          - `charCodeAt(index)`: Returns the Unicode value of the character at the specified index.
          ```javascript
          const str = "Hello";
          console.log(str.charCodeAt(0)); // Outputs: 72 (Unicode value of 'H')
          ```
      
      12. **String Comparison:**
          - `localeCompare(otherString)`: Compares two strings and returns a number indicating their relative order in the current locale.
          ```javascript
          const str1 = "apple";
          const str2 = "banana";
          console.log(str1.localeCompare(str2)); // Outputs: -1 (str1 comes before str2)
          ```
      
      13. **String Repeating:**
          - `repeat(count)`: Creates and returns a new string by repeating the original string a specified number of times.
          ```javascript
          const str = "abc";
          console.log(str.repeat(3)); // Outputs: "abcabcabc"
          ```
      
      14. **Unicode Escaping:**
          - `escape()`: Returns a new string with Unicode escape sequences for non-ASCII characters.
          - `unescape()`: Converts Unicode escape sequences back to characters.
          ```javascript
          const nonAscii = "çüö";
          const escaped = escape(nonAscii);
          console.log(escaped); // Outputs: "%E7%FC%F6"
          console.log(unescape(escaped)); // Outputs: "çüö"
          ```
      
      15. **String Padding:**
          - `padStart(targetLength, padString)`: Pads the current string with the specified pad string until the target length is reached.
          - `padEnd(targetLength, padString)`: Pads the current string from the end with the specified pad string until the target length is reached.
          ```javascript
          const num = "42";
          console.log(num.padStart(5, "0")); // Outputs: "00042"
          console.log(num.padEnd(6, "*"));  // Outputs: "42****"
          ```
      
      16. **Regular Expressions:**
          String methods like `match()`, `search()`, `replace()`, and `split()` can be used with regular expressions to perform advanced string manipulations.
      

      #### String Escape Sequences:

      Strings can include special characters using escape sequences:

         - `\'`: Single quote
         - `\"`: Double quote
         - `\\`: Backslash
         - `\n`: Newline
         - `\t`: Tab
         - `\r`: Carriage return
         - `\uXXXX`: Unicode escape sequence


      #### String Interpolation (Template Literals):

      Using backticks, template literals allow embedding expressions directly in strings:

      ```javascript
      let name = "Alice";
      let greeting = `Hello, ${name}!`;
      // Outputs: "Hello, Alice!"
      ```

      #### String Manipulation:

      1. **String Concatenation:**
         - Combine strings using the `+` operator.
         ```javascript
         let firstName = "John";
         let lastName = "Doe";
         let fullName = firstName + " " + lastName; // Outputs: "John Doe"
         ```
      2. **String Methods for Manipulation:**
         - Use methods like `substring()`, `replace()`, `split()`, `trim()`, etc., for complex manipulations.
         ```javascript
         let text = "Hello, world!";
         let modified = text.replace("world", "JavaScript"); // Outputs: "Hello, JavaScript!"
         ```
      3. **String Conversion to Other Data Types:**
         - Use `parseInt()` or `parseFloat()` to convert strings to numbers.
         ```javascript
         let strNumber = "42";
         let num = parseInt(strNumber); // Outputs: 42
         ```

         #### String Immutability:

         Strings in JavaScript are immutable, meaning they cannot be changed after creation. Any manipulation creates a new string:

         ```javascript
         let original = "Hello";
         let modified = original + " World"; // New string is created
         ```

         #### Example Scenarios:

         ```javascript
         let text = "JavaScript";
         console.log(text.length);             // Outputs: 10
         console.log(text[3]);                // Outputs: "a"
         console.log(text.toUpperCase());      // Outputs: "JAVASCRIPT"

         let message = "Hello, world!";
         console.log(message.indexOf("world")); // Outputs: 7
         console.log(message.substr(0, 5));     // Outputs: "Hello"
         console.log(message.split(", "));      // Outputs: ["Hello", "world!"]

         let template = `Hello, ${name}!`;
         console.log(template);                // Outputs: "Hello, Alice!"
         ```


3. **Boolean:**
   - Represents binary logical values: `true` or `false`.
   - Used for making decisions and controlling program flow.
   - Examples: `true`, `false`.

4. **Undefined:**
   - Represents a declared variable that has not been assigned a value.
   - Example: `let name;`.

5. **Null:**
   - Represents an intentional absence of any value or a null value.
   - Often used to indicate that a variable or object property has no value.
   - Example: `let result = null;`.

6. **Symbol (ES6):**
   - Represents a unique and immutable value, often used as object property keys.
   - Helps prevent accidental name clashes in objects.
   - Example: `const id = Symbol("user_id");`.

#### Key Points about Primitive Data Types:

- **Immutability:**
  - Primitive values are immutable, meaning their values cannot be changed once they are created. For example, if you have a number `x = 5`, you cannot modify the value of `x` to something else.

- **Pass-by-Value:**
  - When you assign a primitive value to a variable or pass it to a function, a copy of the value is created. Changes to the copy do not affect the original value.

- **Comparisons:**
  - Primitive values are compared based on their actual value. Two numbers with the same value are equal, as are two strings with the same characters.

- **Typeof Operator:**
  - You can use the `typeof` operator to determine the data type of a value.

#### Example Scenarios:

```javascript
let age = 25;             // Number
let name = "John";        // String
let isStudent = true;     // Boolean
let pet = null;           // Null
let city;                 // Undefined

console.log(typeof age);         // Outputs: "number"
console.log(typeof name);        // Outputs: "string"
console.log(typeof isStudent);   // Outputs: "boolean"
console.log(typeof pet);         // Outputs: "object" (historical quirk)
console.log(typeof city);        // Outputs: "undefined"
```


### Non-Primitive Types in JavaScript:

Non-primitive types, also known as reference types, are more complex data structures that can hold multiple values and have methods associated with them. Unlike primitive types, which store single values, non-primitive types can store collections of values, making them more versatile for complex programming tasks. These types are passed by reference, meaning that when they're assigned to a variable or passed as a function argument, they reference the same underlying data in memory.

Here are the main non-primitive types in JavaScript:

1. **Objects:**
   Objects are collections of key-value pairs, where the keys are strings (or Symbols) and the values can be of any data type, including other objects and functions. Objects are used to represent structured data and provide a way to group related information together. They are highly customizable and can have properties and methods associated with them.

   Example:
   ```javascript
   const person = {
     firstName: "John",
     lastName: "Doe",
     age: 30,
     address: {
       street: "123 Main St",
       city: "Cityville"
     }
   };
   console.log(person.firstName); // Outputs: "John"
   ```
   Certainly! Let's dive deeper into object methods and provide more examples for a comprehensive understanding.

      ### **Object Methods in JavaScript:**

      JavaScript objects come with built-in methods that can be used to manipulate and interact with their properties and values. Here are some additional commonly used object methods:

      1. **`Object.keys(obj)`**:
         The `Object.keys()` method returns an array containing all enumerable property names of the given object.
      
         ```javascript
         const person = {
           firstName: "John",
           lastName: "Doe",
           age: 30
         };
         const keys = Object.keys(person);
         console.log(keys); // Outputs: ["firstName", "lastName", "age"]
         ```
      
      2. **`Object.values(obj)`**:
         The `Object.values()` method returns an array containing all enumerable property values of the given object.
      
         ```javascript
         const person = {
           firstName: "John",
           lastName: "Doe",
           age: 30
         };
         const values = Object.values(person);
         console.log(values); // Outputs: ["John", "Doe", 30]
         ```
      
      3. **`Object.entries(obj)`**:
         The `Object.entries()` method returns an array of arrays, where each inner array contains an enumerable property's key and value.
      
         ```javascript
         const person = {
           firstName: "John",
           lastName: "Doe",
           age: 30
         };
         const entries = Object.entries(person);
         console.log(entries);
         // Outputs: [["firstName", "John"], ["lastName", "Doe"], ["age", 30]]
         ```
      
      4. **Property Access and Assignment**:
         You can access and assign object properties using dot notation or bracket notation.
      
         ```javascript
         const person = {
           firstName: "John",
           lastName: "Doe"
         };
         
         // Property Access
         console.log(person.firstName);    // Outputs: "John"
         console.log(person["lastName"]);  // Outputs: "Doe"
         
         // Property Assignment
         person.age = 30;
         person["address"] = "123 Main St";
         console.log(person); // Outputs: {firstName: "John", lastName: "Doe", age: 30, address: "123 Main St"}
         ```
      
      5. **`Object.assign(target, ...sources)`**:
         The `Object.assign()` method is used to copy the values of all enumerable properties from one or more source objects to a target object. It returns the modified target object.
      
         ```javascript
         const target = { a: 1 };
         const source = { b: 2, c: 3 };
         const result = Object.assign(target, source);
         console.log(result); // Outputs: { a: 1, b: 2, c: 3 }
         ```
      
      6. **Cloning an Object**:
         You can use `Object.assign({}, originalObject)` to create a shallow clone of an object. Alternatively, you can use the spread operator (`{...originalObject}`) to achieve the same result.
      
         ```javascript
         const original = { a: 1, b: 2 };
         
         // Shallow Clone using Object.assign()
         const clone1 = Object.assign({}, original);
         
         // Shallow Clone using Spread Operator
         const clone2 = { ...original };
         
         console.log(clone1); // Outputs: { a: 1, b: 2 }
         console.log(clone2); // Outputs: { a: 1, b: 2 }
         ```


2. **Arrays:**
   Arrays are ordered collections of values, usually of the same type but not necessarily. They allow you to store multiple items in a single variable. Arrays have built-in methods for adding, removing, and manipulating elements. They are often used for lists and sequences of data.

   Example:
   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   console.log(numbers.length); // Outputs: 5
   console.log(numbers[2]);     // Outputs: 3
   ```
      #### **Array Methods:**

      Arrays come with a range of built-in methods that allow you to perform various operations on array elements. Let's explore some of the commonly used methods:

      1. **`join(separator)`**:
         The `join` method converts all the elements of an array into a string and concatenates them using the specified `separator`.

         ```javascript
         const fruits = ["apple", "banana", "orange"];
         const fruitString = fruits.join(", ");
         console.log(fruitString); // Outputs: "apple, banana, orange"
         ```

      2. **`slice(start, end)`**:
         The `slice` method returns a shallow copy of a portion of an array between the specified `start` and `end` indices (excluding `end`).

         ```javascript
         const numbers = [1, 2, 3, 4, 5];
         const slicedNumbers = numbers.slice(1, 4);
         console.log(slicedNumbers); // Outputs: [2, 3, 4]
         ```

      3. **`filter(callback)`**:
         The `filter` method creates a new array containing all elements that pass the provided `callback` function's test.

         ```javascript
         const numbers = [1, 2, 3, 4, 5];
         const evenNumbers = numbers.filter(num => num % 2 === 0);
         console.log(evenNumbers); // Outputs: [2, 4]
         ```

      4. **`find(callback)`**:
         The `find` method returns the first element in the array that satisfies the provided `callback` function's test.

         ```javascript
         const fruits = ["apple", "banana", "orange"];
         const foundFruit = fruits.find(fruit => fruit === "banana");
         console.log(foundFruit); // Outputs: "banana"
         ```

      5. **`map(callback)`**:
         The `map` method creates a new array by applying the provided `callback` function to each element of the original array.

         ```javascript
         const numbers = [1, 2, 3, 4, 5];
         const doubledNumbers = numbers.map(num => num * 2);
         console.log(doubledNumbers); // Outputs: [2, 4, 6, 8, 10]
         ```


3. **Functions:**
   Functions are a special type of object that can be invoked to perform a specific task. They can be assigned to variables, passed as arguments, and returned from other functions. Functions are a fundamental part of JavaScript's ability to implement logic and behavior.

   Example:
   ```javascript
   function add(a, b) {
     return a + b;
   }
   const result = add(3, 5); // result = 8
   ```

4. **Dates:**
   The `Date` object is used to work with dates and times. It provides methods for creating, formatting, and manipulating dates. Dates are crucial for applications that need to work with time-sensitive data and scheduling.

   Example:
   ```javascript
   const currentDate = new Date();
   console.log(currentDate.getFullYear()); // Outputs the current year
   ```

5. **Regular Expressions:**
   Regular expressions are objects that represent patterns in strings. They allow for advanced string searching, validation, and manipulation based on patterns.

   Example:
   ```javascript
   const pattern = /[0-9]+/;
   const text = "The price is $50.";
   console.log(text.match(pattern)); // Outputs: ["50"]
   ```

6. **Custom Objects:**
   You can define your own non-primitive types using constructor functions or ES6 classes. These custom objects can have properties and methods defined by you, allowing you to model real-world concepts and behaviors.

   Example:
   ```javascript
   class Car {
     constructor(make, model) {
       this.make = make;
       this.model = model;
     }
   
     start() {
       console.log(`${this.make} ${this.model} engine started.`);
     }
   }
   
   const myCar = new Car("Toyota", "Corolla");
   myCar.start(); // Outputs: "Toyota Corolla engine started."
   ```

7. **Map and Set:**
   ES6 introduced the `Map` and `Set` objects. A `Map` is a collection of key-value pairs where keys can be any data type, and a `Set` is a collection of unique values. These data structures provide specialized ways to store and manage data.

   Example:
   ```javascript
   const myMap = new Map();
   myMap.set("key1", "value1");
   console.log(myMap.get("key1")); // Outputs: "value1"
   
   const mySet = new Set();
   mySet.add("item1");
   console.log(mySet.has("item1")); // Outputs: true
   ```

Non-primitive types in JavaScript are fundamental for building more complex applications by allowing you to store, manipulate, and organize various types of data.