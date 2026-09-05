// ─── Tricky JavaScript Code Output Questions (100) ─────────────────────────
// Each entry: [question, difficulty, answer]

export const JS_TRICKY_QUESTIONS = [
  // ── 1. Equality & Type Coercion ───────────────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log([] == ![]);\nconsole.log([] == []);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
true
false
\`\`\`
**Explanation:**
- \`[] == ![]\`: The unary \`!\` has higher precedence than \`==\`. Since \`[]\` is an object, it is truthy, so \`![]\` becomes \`false\`. Now we have \`[] == false\`. When comparing an object to a boolean, both convert to numbers: \`false\` becomes \`0\`, and \`[]\` calls \`[].toString()\` -> \`""\` -> \`0\`. Since \`0 == 0\`, it evaluates to \`true\`!
- \`[] == []\`: Arrays are reference objects. Two distinct array literals occupy separate memory locations, so reference equality is \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(0 == "0");\nconsole.log(0 === "0");\nconsole.log(null == undefined);\nconsole.log(null === undefined);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
false
true
false
\`\`\`
**Explanation:**
- \`0 == "0"\`: Loose equality coerces \`"0"\` to number \`0\`. \`0 == 0\` is \`true\`.
- \`0 === "0"\`: Strict equality checks both type and value. \`number !== string\`, so \`false\`.
- \`null == undefined\`: By ECMAScript spec rule, \`null\` and \`undefined\` loosely equal only each other and nothing else.
- \`null === undefined\`: Different primitive types, so \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log([] + []);\nconsole.log([] + {});\nconsole.log({} + []);\nconsole.log({} + {});\n\`\`\``,
    "hard",
    `Output:
\`\`\`
""
"[object Object]"
"[object Object]"
"[object Object][object Object]"
\`\`\`
**Explanation:**
- The \`+\` operator with objects calls \`ToPrimitive\`, which invokes \`.toString()\`.
- \`[].toString()\` is \`""\`. \`"" + ""\` = \`""\`.
- \`[].toString() + {}.toString()\` = \`"" + "[object Object]"\` = \`"[object Object]"\`.
- In JavaScript expressions (or when wrapped in parentheses), \`({} + [])\` evaluates to \`"[object Object]" + ""\` which gives \`"[object Object]"\`. (Note: In bare REPL without parens, \`{} + []\` may be parsed as an empty block followed by \`+[]\` = \`0\`).
- \`{}.toString() + {}.toString()\` = \`"[object Object][object Object]"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(1 < 2 < 3);\nconsole.log(3 > 2 > 1);\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
false
\`\`\`
**Explanation:**
- Comparison operators are evaluated from left to right.
- \`1 < 2 < 3\`: First \`1 < 2\` evaluates to \`true\`. Then \`true < 3\` coerces \`true\` to \`1\`. \`1 < 3\` evaluates to \`true\`.
- \`3 > 2 > 1\`: First \`3 > 2\` evaluates to \`true\`. Then \`true > 1\` coerces \`true\` to \`1\`. \`1 > 1\` evaluates to \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(true == "1");\nconsole.log(false == "0");\nconsole.log(false == "");\nconsole.log(false == []);\nconsole.log(false == {});\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
true
true
true
false
\`\`\`
**Explanation:**
- With \`==\`, boolean operands are converted to numbers first: \`true\` -> \`1\`, \`false\` -> \`0\`.
- \`1 == "1"\` -> \`1 == 1\` (\`true\`).
- \`0 == "0"\` -> \`0 == 0\` (\`true\`).
- \`0 == ""\` -> \`0 == 0\` (\`true\`).
- \`0 == []\` -> \`[].toString()\` is \`""\`, \`0 == 0\` (\`true\`).
- \`0 == {}\` -> \`{}.toString()\` is \`"[object Object]"\`, \`Number("[object Object]")\` is \`NaN\`, \`0 == NaN\` is \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(null == 0);\nconsole.log(null > 0);\nconsole.log(null >= 0);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
false
false
true
\`\`\`
**Explanation:**
- \`null == 0\`: The equality algorithm only equates \`null\` to \`undefined\` or itself. It does NOT convert \`null\` to a number for \`==\`. Hence, \`false\`.
- \`null > 0\`: Relational comparison operators (\`>\`, \`<\`, \`>=\`, \`<=\`) convert operands to primitives/numbers. \`Number(null)\` is \`0\`. \`0 > 0\` is \`false\`.
- \`null >= 0\`: Relational comparison converts \`null\` to \`0\`. \`0 >= 0\` is \`true\`! (Also evaluated as \`!(null < 0)\` -> \`!(0 < 0)\` -> \`true\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(undefined == 0);\nconsole.log(undefined > 0);\nconsole.log(undefined >= 0);\nconsole.log(undefined <= 0);\n\`\`\``,
    "med",
    `Output:
\`\`\`
false
false
false
false
\`\`\`
**Explanation:**
- \`undefined == 0\`: \`undefined\` only equals \`null\` or \`undefined\` under loose equality. So \`false\`.
- For all relational comparisons (\`>\`, \`<\`, \`>=\`, \`<=\`), \`Number(undefined)\` is \`NaN\`.
- Any relational comparison involving \`NaN\` always returns \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log([1, 2] + [3, 4]);\nconsole.log([1] + 1);\nconsole.log([1] - 1);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"1,23,4"
"11"
0
\`\`\`
**Explanation:**
- \`[1, 2] + [3, 4]\`: Both arrays convert to strings via \`.toString()\`, giving \`"1,2"\` and \`"3,4"\`. Concatenation gives \`"1,23,4"\`.
- \`[1] + 1\`: \`[1].toString()\` is \`"1"\`. \`"1" + 1\` gives string \`"11"\`.
- \`[1] - 1\`: The subtraction operator \`-\` only works on numbers. \`"1"\` coerces to number \`1\`. \`1 - 1 = 0\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log("5" - 3);\nconsole.log("5" + 3);\nconsole.log("5" - "x");\nconsole.log(10 / "2");\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2
"53"
NaN
5
\`\`\`
**Explanation:**
- Subtraction, multiplication, and division always coerce operands to numbers.
- \`"5" - 3\` = \`5 - 3 = 2\`.
- Addition with a string triggers string concatenation: \`"5" + 3\` = \`"53"\`.
- \`"5" - "x"\`: \`"x"\` cannot be parsed as a number, yielding \`NaN\`. \`5 - NaN = NaN\`.
- \`10 / "2"\` = \`10 / 2 = 5\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(+"");\nconsole.log(+false);\nconsole.log(+true);\nconsole.log(+null);\nconsole.log(+undefined);\nconsole.log(+[]);\nconsole.log(+[99]);\nconsole.log(+[1, 2]);\nconsole.log(+{});\n\`\`\``,
    "med",
    `Output:
\`\`\`
0
0
1
0
NaN
0
99
NaN
NaN
\`\`\`
**Explanation:**
- The unary \`+\` operator invokes \`Number()\`.
- \`+""\` -> \`0\`.
- \`+false\` -> \`0\`, \`+true\` -> \`1\`.
- \`+null\` -> \`0\`.
- \`+undefined\` -> \`NaN\`.
- \`+[]\` -> \`[].toString()\` is \`""\` -> \`0\`.
- \`+[99]\` -> \`"99"\` -> \`99\`.
- \`+[1, 2]\` -> \`"1,2"\` -> \`NaN\`.
- \`+{}\` -> \`"[object Object]"\` -> \`NaN\`.`
  ],

  // ── 2. typeof, instanceof, & NaN Quirks ───────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof null);\nconsole.log(typeof undefined);\nconsole.log(typeof NaN);\nconsole.log(typeof []);\nconsole.log(typeof (() => {}));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"object"
"undefined"
"number"
"object"
"function"
\`\`\`
**Explanation:**
- \`typeof null\` returning \`"object"\` is a famous legacy bug from JavaScript's first implementation in 1995 (type tag 000 was for objects, and \`null\` was represented as NULL pointer \`0x00\`).
- \`NaN\` stands for "Not a Number", but its numeric representation in IEEE-754 makes its JavaScript type \`"number"\`.
- Functions are first-class callable objects, so \`typeof\` returns \`"function"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof typeof 1);\nconsole.log(typeof typeof null);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"string"
"string"
\`\`\`
**Explanation:**
- The \`typeof\` operator ALWAYS returns a string (e.g. \`"number"\`, \`"object"\`, \`"boolean"\`).
- \`typeof 1\` evaluates to \`"number"\`.
- \`typeof "number"\` evaluates to \`"string"\`.
- Similarly, \`typeof null\` is \`"object"\`, and \`typeof "object"\` is \`"string"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(NaN === NaN);\nconsole.log(NaN == NaN);\nconsole.log(Object.is(NaN, NaN));\nconsole.log([NaN].indexOf(NaN));\nconsole.log([NaN].includes(NaN));\n\`\`\``,
    "hard",
    `Output:
\`\`\`
false
false
true
-1
true
\`\`\`
**Explanation:**
- According to IEEE 754 and JavaScript spec, \`NaN\` is the ONLY value in JavaScript that is not equal to itself using either \`==\` or \`===\`.
- \`Object.is(NaN, NaN)\` uses the SameValue algorithm, which treats two \`NaN\` values as identical (\`true\`).
- \`Array.prototype.indexOf\` uses strict equality (\`===\`), so it cannot find \`NaN\` and returns \`-1\`.
- \`Array.prototype.includes\` uses the SameValueZero algorithm, which considers \`NaN\` equal to \`NaN\`, returning \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(isNaN("hello"));\nconsole.log(Number.isNaN("hello"));\nconsole.log(isNaN(undefined));\nconsole.log(Number.isNaN(undefined));\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
false
true
false
\`\`\`
**Explanation:**
- Global \`isNaN(val)\` first coerces \`val\` to a number. \`Number("hello")\` is \`NaN\`, so it returns \`true\`. \`Number(undefined)\` is also \`NaN\`, returning \`true\`.
- \`Number.isNaN(val)\` (ES6) is strict: it only returns \`true\` if the value is OF TYPE number AND is currently \`NaN\`. Neither \`"hello"\` (string) nor \`undefined\` is of type number.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction A() {}\nconst a = new A();\nconsole.log(a instanceof A);\nconsole.log(a instanceof Object);\nconsole.log("hello" instanceof String);\nconsole.log(new String("hello") instanceof String);\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
true
false
true
\`\`\`
**Explanation:**
- \`instanceof\` tests whether the \`prototype\` property of a constructor appears anywhere in the prototype chain of an object.
- \`a\` inherits from \`A.prototype\` which inherits from \`Object.prototype\`.
- \`"hello"\` is a primitive string, not an object. Primitives do not have prototype chains, so \`instanceof\` returns \`false\`.
- \`new String("hello")\` creates a String object wrapper, so \`instanceof String\` is \`true\`.`
  ],

  // ── 3. Truthy vs Falsy Gotchas ────────────────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Boolean([]));\nconsole.log(Boolean({}));\nconsole.log(Boolean("0"));\nconsole.log(Boolean("false"));\nconsole.log(Boolean(new Boolean(false)));\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
true
true
true
true
\`\`\`
**Explanation:**
- There are exactly 8 falsy values in JavaScript: \`false\`, \`0\`, \`-0\`, \`0n\`, \`""\`, \`null\`, \`undefined\`, and \`NaN\`.
- EVERYTHING ELSE is truthy!
- \`[]\` and \`{}\` are objects -> truthy.
- \`"0"\` and \`"false"\` are non-empty strings -> truthy.
- \`new Boolean(false)\` creates an object wrapper around \`false\`. Because it is an object, it is truthy!`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nif ([]) console.log("A");\nif ([] == false) console.log("B");\nif ([] === false) console.log("C");\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"A"
"B"
\`\`\`
**Explanation:**
- \`if ([])\`: The condition evaluates \`Boolean([])\`, which is \`true\` because all objects are truthy. So \`"A"\` is logged.
- \`[] == false\`: Loose equality coerces \`false\` to number \`0\`, and \`[]\` to primitive \`""\` then number \`0\`. \`0 == 0\` is \`true\`, so \`"B"\` is logged!
- \`[] === false\`: Strict equality checks type. An array object is not a boolean primitive, so this is \`false\` and \`"C"\` is not printed.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(0 || "default");\nconsole.log(0 ?? "default");\nconsole.log("" || "fallback");\nconsole.log("" ?? "fallback");\nconsole.log(false ?? true);\nconsole.log(null ?? "valid");\n\`\`\``,
    "med",
    `Output:
\`\`\`
"default"
0
"fallback"
""
false
"valid"
\`\`\`
**Explanation:**
- \`||\` returns the first TRUTHY operand. Since \`0\`, \`""\`, and \`false\` are falsy, \`||\` falls back to the right operand.
- \`??\` (Nullish Coalescing) ONLY checks if the left operand is \`null\` or \`undefined\`.
- \`0\` is not nullish -> returns \`0\`.
- \`""\` is not nullish -> returns \`""\`.
- \`false\` is not nullish -> returns \`false\`.
- \`null\` is nullish -> returns \`"valid"\`.`
  ],

  // ── 4. Hoisting & Temporal Dead Zone ──────────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(x);\nvar x = 10;\nfunction test() {\n  console.log(y);\n  var y = 20;\n}\ntest();\n\`\`\``,
    "easy",
    `Output:
\`\`\`
undefined
undefined
\`\`\`
**Explanation:**
- \`var\` declarations are hoisted to the top of their enclosing function or global scope and initialized with \`undefined\`.
- The assignment (\`x = 10\` and \`y = 20\`) remains in place.
- Accessing \`x\` or \`y\` before their assignment statements yields \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(a);\nlet a = 5;\n\`\`\``,
    "med",
    `Output:
\`\`\`
ReferenceError: Cannot access 'a' before initialization
\`\`\`
**Explanation:**
- \`let\` and \`const\` are hoisted to the top of the block, but they are NOT initialized.
- The span between the start of the block and the declaration line is known as the Temporal Dead Zone (TDZ).
- Attempting to read or write a variable in its TDZ throws a \`ReferenceError\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nvar a = 1;\nfunction foo() {\n  console.log(a);\n  var a = 2;\n  console.log(a);\n}\nfoo();\nconsole.log(a);\n\`\`\``,
    "med",
    `Output:
\`\`\`
undefined
2
1
\`\`\`
**Explanation:**
- Inside \`foo()\`, the local declaration \`var a\` is hoisted to the top of \`foo\`'s scope.
- This local \`a\` shadows the global \`a\`.
- At the first \`console.log(a)\`, the local \`a\` has been initialized to \`undefined\` but not yet assigned \`2\`.
- After \`a = 2\`, it logs \`2\`.
- In the global scope, the global \`a\` is untouched and remains \`1\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfoo();\nbar();\n\nfunction foo() {\n  console.log("Foo!");\n}\nvar bar = function() {\n  console.log("Bar!");\n};\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Foo!"
TypeError: bar is not a function
\`\`\`
**Explanation:**
- Function declarations (\`function foo() {}\`) are fully hoisted along with their implementation. Calling \`foo()\` before its definition works fine.
- Function expressions assigned to \`var\` hoist only the variable declaration initialized to \`undefined\`.
- When \`bar()\` is called, \`bar\` is \`undefined\`. Invoking \`undefined()\` results in \`TypeError: bar is not a function\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nvar x = 1;\nif (true) {\n  var x = 2;\n  let y = 3;\n}\nconsole.log(x);\nconsole.log(typeof y);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2
"undefined"
\`\`\`
**Explanation:**
- \`var\` is function-scoped (or globally scoped), not block-scoped. The \`var x = 2\` inside the \`if\` block overwrites the outer \`x\`.
- \`let\` is block-scoped. \`y\` exists only within the \`if\` block. Outside the block, \`y\` is not defined. \`typeof y\` on an undeclared variable returns \`"undefined"\` safely without throwing.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet x = 1;\n{\n  console.log(x);\n  let x = 2;\n}\n\`\`\``,
    "hard",
    `Output:
\`\`\`
ReferenceError: Cannot access 'x' before initialization
\`\`\`
**Explanation:**
- The block creates a new lexical scope.
- Inside this block, \`let x = 2\` is hoisted to the top of the block, shadowing the outer \`x = 1\`.
- Because the inner \`x\` is now in its Temporal Dead Zone (TDZ) at the point of \`console.log(x)\`, JavaScript throws a \`ReferenceError\` rather than falling back to the outer \`x\`.`
  ],

  // ── 5. Closures & Loops ───────────────────────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n\`\`\``,
    "med",
    `Output:
\`\`\`
3
3
3
\`\`\`
**Explanation:**
- \`var i\` is function/globally scoped. There is only ONE \`i\` variable shared across all iterations.
- The loop runs synchronously to completion, incrementing \`i\` to \`3\`.
- Later, when the macro-task timers fire and their callbacks execute, all three arrow functions reference the exact same \`i\`, which is now \`3\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n\`\`\``,
    "med",
    `Output:
\`\`\`
0
1
2
\`\`\`
**Explanation:**
- \`let\` declarations in a \`for\` loop create a NEW lexical binding for each loop iteration.
- Each \`setTimeout\` callback closes over its own unique instance of \`i\` with its respective iteration value (0, 1, 2).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfor (var i = 0; i < 3; i++) {\n  ((j) => {\n    setTimeout(() => console.log(j), 100);\n  })(i);\n}\n\`\`\``,
    "med",
    `Output:
\`\`\`
0
1
2
\`\`\`
**Explanation:**
- An Immediately Invoked Function Expression (IIFE) creates a new function scope on every loop iteration.
- The current value of \`i\` is passed into the IIFE as parameter \`j\`.
- The callback closes over the argument \`j\`, preserving 0, 1, and 2 independently.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction createCounter() {\n  let count = 0;\n  return {\n    inc: () => ++count,\n    get: () => count\n  };\n}\nconst c1 = createCounter();\nconst c2 = createCounter();\nc1.inc();\nc1.inc();\nconsole.log(c1.get(), c2.get());\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2 0
\`\`\`
**Explanation:**
- Each invocation of \`createCounter()\` allocates a new lexical environment with its own private \`count\` variable.
- \`c1\` and \`c2\` hold completely separate closures with separate counters. Incrementing \`c1\` has no effect on \`c2\`.`
  ],

  // ── 6. 'this' Keyword & Function Binding ──────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = {\n  name: "Alice",\n  getName: function() {\n    return this.name;\n  },\n  getArrowName: () => {\n    return this.name;\n  }\n};\nconsole.log(obj.getName());\nconsole.log(obj.getArrowName());\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Alice"
undefined
\`\`\`
**Explanation:**
- \`obj.getName()\`: Regular functions determine \`this\` dynamically based on invocation. Since it was called as a method on \`obj\`, \`this\` points to \`obj\`.
- \`obj.getArrowName()\`: Arrow functions DO NOT have their own \`this\`. They capture \`this\` lexically from the enclosing scope where \`obj\` was defined (here, the module/global scope). In the global scope, \`this.name\` is \`undefined\` (or \`window.name\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst person = {\n  name: "Bob",\n  greet: function() {\n    console.log("Hi, " + this.name);\n  }\n};\nconst greetFn = person.greet;\ngreetFn();\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Hi, undefined" (or "Hi, " in browsers)
\`\`\`
**Explanation:**
- When \`person.greet\` is assigned to \`greetFn\`, it loses its receiver object context.
- When invoked standalone as \`greetFn()\`, default binding applies. In non-strict mode, \`this\` is the global object (\`window\` or \`global\`). In strict mode, \`this\` is \`undefined\` (which would throw a TypeError if accessing \`this.name\`). Since \`name\` is not defined on the global object, \`this.name\` is \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction greet() {\n  console.log(this.name);\n}\nconst user = { name: "Carol" };\nconst bound = greet.bind(user);\nconst other = { name: "Dave" };\nbound.call(other);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"Carol"
\`\`\`
**Explanation:**
- A function created with \`Function.prototype.bind\` has a hard-bound \`this\`.
- Subsequent calls to \`.call()\`, \`.apply()\`, or another \`.bind()\` CANNOT override the bound \`this\` context.
- Only the \`new\` constructor invocation can override a bound \`this\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = {\n  count: 10,\n  doSomething() {\n    setTimeout(function() {\n      console.log(this.count);\n    }, 0);\n    setTimeout(() => {\n      console.log(this.count);\n    }, 0);\n  }\n};\nobj.doSomething();\n\`\`\``,
    "med",
    `Output:
\`\`\`
undefined
10
\`\`\`
**Explanation:**
- In the first \`setTimeout\`, a regular function callback is invoked by the event loop in default execution context. Its \`this\` defaults to \`window\` (or \`global\`), where \`count\` is \`undefined\`.
- In the second \`setTimeout\`, an arrow function lexically captures \`this\` from \`doSomething()\`, where \`this\` is \`obj\`. Thus, \`this.count\` is \`10\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction Person(name) {\n  this.name = name;\n  return { name: "Overridden" };\n}\nconst p = new Person("Eve");\nconsole.log(p.name);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"Overridden"
\`\`\`
**Explanation:**
- When a constructor function is invoked with \`new\`, if it explicitly returns an OBJECT, that returned object becomes the result of the \`new\` expression.
- If the constructor returns a primitive (number, string, boolean, etc.), the returned value is ignored and the newly created instance (\`this\`) is returned.
- Because \`{ name: "Overridden" }\` is an object, \`p\` is that returned object.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction Person(name) {\n  this.name = name;\n  return "Ignored Primitive";\n}\nconst p = new Person("Frank");\nconsole.log(p.name);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Frank"
\`\`\`
**Explanation:**
- When a constructor returns a primitive value (like a string), the return value is discarded by the \`new\` operator.
- The newly allocated instance bound to \`this\` is returned instead, so \`p.name\` is \`"Frank"\`.`
  ],

  // ── 7. Object & Array References, Mutation & Cloning ──────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = { x: 1 };\nconst b = a;\nb.x = 2;\nconsole.log(a.x);\n\nlet c = { y: 1 };\nlet d = c;\nd = { y: 2 };\nconsole.log(c.y);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2
1
\`\`\`
**Explanation:**
- \`b = a\` copies the object reference. Mutating a property via \`b.x = 2\` modifies the shared underlying object, so \`a.x\` is also \`2\`.
- \`d = { y: 2 }\` reassigns \`d\` to a brand-new object in memory. It breaks the link between \`d\` and \`c\`. \`c\` remains pointing to the original object \`{ y: 1 }\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj1 = { a: 1, b: { c: 2 } };\nconst obj2 = { ...obj1 };\nobj2.a = 99;\nobj2.b.c = 99;\nconsole.log(obj1.a);\nconsole.log(obj1.b.c);\n\`\`\``,
    "med",
    `Output:
\`\`\`
1
99
\`\`\`
**Explanation:**
- The object spread operator \`{ ...obj1 }\` performs a SHALLOW copy.
- Primitive properties like \`a\` are copied by value: modifying \`obj2.a\` does not affect \`obj1.a\`.
- Nested objects like \`b\` are copied by reference: \`obj1.b\` and \`obj2.b\` point to the exact same object in heap memory. Changing \`obj2.b.c\` modifies \`obj1.b.c\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3, 4, 5];\narr.length = 2;\nconsole.log(arr);\narr.length = 4;\nconsole.log(arr);\nconsole.log(arr[3]);\n\`\`\``,
    "med",
    `Output:
\`\`\`
[1, 2]
[1, 2, <2 empty items>]
undefined
\`\`\`
**Explanation:**
- Setting the \`length\` property of an array to a smaller number truncates it in-place, permanently deleting the excess elements.
- Increasing \`length\` back up creates empty slots (sparse array), not elements with \`undefined\`.
- Accessing empty slot \`arr[3]\` returns \`undefined\`, but the slot does not exist (\`3 in arr\` is \`false\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3];\narr[10] = 99;\nconsole.log(arr.length);\nconsole.log(arr.filter(x => x !== undefined).length);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
11
4
\`\`\`
**Explanation:**
- Assigning index \`10\` updates the array length to \`10 + 1 = 11\`.
- Indices 3 through 9 are empty slots (holes).
- Array iteration methods like \`.filter()\`, \`.map()\`, and \`.forEach()\` SKIP empty slots entirely!
- The filter callback is only executed for indices 0, 1, 2, and 10 (4 items). All 4 pass the filter, resulting in an array of length 4.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = Object.freeze({ a: 1, b: { c: 2 } });\nobj.a = 10;\nobj.b.c = 20;\nconsole.log(obj.a);\nconsole.log(obj.b.c);\n\`\`\``,
    "med",
    `Output:
\`\`\`
1
20
\`\`\`
**Explanation:**
- \`Object.freeze()\` is shallow. It freezes the top-level properties of the object (\`a\` cannot be modified, added, or deleted).
- It does NOT automatically freeze nested objects. \`obj.b\` remains mutable, so \`obj.b.c = 20\` succeeds.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = {};\nconst b = { key: "b" };\nconst c = { key: "c" };\na[b] = 123;\na[c] = 456;\nconsole.log(a[b]);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
456
\`\`\`
**Explanation:**
- Standard JavaScript object keys must be Strings or Symbols.
- When an object is used as a key in plain object \`a\`, it is coerced to a string via \`.toString()\`.
- \`b.toString()\` evaluates to \`"[object Object]"\`.
- \`c.toString()\` also evaluates to \`"[object Object]"\`.
- Therefore, \`a[c] = 456\` overwrites \`a["[object Object]"]\`. \`a[b]\` reads \`a["[object Object]"]\`, which is \`456\`. (To preserve object identity, use \`Map\`).`
  ],

  // ── 8. Event Loop & Async Execution Order ─────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");\n\`\`\``,
    "med",
    `Output:
\`\`\`
"1"
"4"
"3"
"2"
\`\`\`
**Explanation:**
- Synchronous code runs first: \`"1"\` then \`"4"\`.
- Microtasks (like \`Promise.then\`) have higher priority than macrotasks. All microtasks drain immediately when the call stack clears.
- Thus, the microtask queue logs \`"3"\`.
- Finally, the event loop picks the macrotask (\`setTimeout\`) callback, which logs \`"2"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log("Start");\nsetTimeout(() => console.log("Timeout"), 0);\nPromise.resolve()\n  .then(() => {\n    console.log("Promise 1");\n    return Promise.resolve("Promise 2");\n  })\n  .then(res => console.log(res));\nconsole.log("End");\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"Start"
"End"
"Promise 1"
"Promise 2"
"Timeout"
\`\`\`
**Explanation:**
- Synchronous code runs: \`"Start"\`, registers \`setTimeout\` (macrotask), enqueues first promise \`.then\` (microtask), logs \`"End"\`.
- Call stack empties. Microtask queue runs: logs \`"Promise 1"\`.
- Returning a resolved promise creates another microtask tick, resolving to log \`"Promise 2"\`.
- Only when ALL microtasks are exhausted does the macrotask queue run, logging \`"Timeout"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nasync function foo() {\n  console.log("A");\n  await null;\n  console.log("B");\n}\nconsole.log("C");\nfoo();\nconsole.log("D");\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"C"
"A"
"D"
"B"
\`\`\`
**Explanation:**
- Synchronous: logs \`"C"\`.
- Calls \`foo()\`. Inside \`foo\`, code executes synchronously up to the first \`await\`: logs \`"A"\`.
- \`await null\` pauses execution of \`foo\` and schedules the remainder as a microtask.
- Control returns to the caller: logs \`"D"\`.
- Call stack clears. The scheduled microtask resumes \`foo\`: logs \`"B"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nasync function test() {\n  console.log(1);\n  await test2();\n  console.log(2);\n}\nasync function test2() {\n  console.log(3);\n}\nconsole.log(4);\ntest();\nconsole.log(5);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
4
1
3
5
2
\`\`\`
**Explanation:**
- Synchronous execution logs \`4\`.
- \`test()\` starts synchronously: logs \`1\`.
- \`await test2()\` immediately invokes \`test2()\`, logging \`3\`.
- \`test2()\` returns a resolved Promise. The \`await\` yields control and queues the continuation of \`test()\` into microtasks.
- Main thread continues and logs \`5\`.
- Microtask queue runs the continuation of \`test()\`, logging \`2\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nPromise.resolve()\n  .then(() => {\n    throw new Error("Oh no!");\n  })\n  .catch(err => {\n    console.log("Caught: " + err.message);\n    return "Recovered";\n  })\n  .then(val => {\n    console.log("Then: " + val);\n  });\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Caught: Oh no!"
"Then: Recovered"
\`\`\`
**Explanation:**
- The first \`.then()\` throws an error, rejecting the promise chain.
- The error bypasses any subsequent success handlers until it reaches \`.catch()\`.
- \`.catch()\` logs \`"Caught: Oh no!"\` and returns \`"Recovered"\`.
- Returning a non-error value from \`.catch()\` resolves the promise chain, allowing the following \`.then()\` to execute with \`"Recovered"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nPromise.resolve(1)\n  .then(2)\n  .then(Promise.resolve(3))\n  .then(console.log);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
1
\`\`\`
**Explanation:**
- The arguments to \`.then()\` must be FUNCTIONS: \`.then(onFulfilled, onRejected)\`.
- If a non-function value (like a number \`2\` or a Promise object \`Promise.resolve(3)\`) is passed to \`.then()\`, JavaScript ignores it and falls back to the identity function \`x => x\` (Promise value fall-through).
- The value \`1\` falls straight through both invalid \`.then\` calls to \`console.log\`, which outputs \`1\`.`
  ],

  // ── 9. Array Methods & Quirks ─────────────────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(["1", "2", "3"].map(parseInt));\n\`\`\``,
    "hard",
    `Output:
\`\`\`
[1, NaN, NaN]
\`\`\`
**Explanation:**
- \`Array.prototype.map\` passes three arguments to its callback: \`(element, index, array)\`.
- \`parseInt\` accepts two arguments: \`(string, radix)\`.
- Iteration 0: \`parseInt("1", 0)\` -> radix 0 defaults to base 10 -> \`1\`.
- Iteration 1: \`parseInt("2", 1)\` -> radix 1 is invalid (radix must be between 2 and 36) -> \`NaN\`.
- Iteration 2: \`parseInt("3", 2)\` -> radix 2 (binary) only allows '0' and '1'. '3' is invalid in binary -> \`NaN\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst numbers = [10, 5, 40, 25, 100, 1];\nnumbers.sort();\nconsole.log(numbers);\n\`\`\``,
    "med",
    `Output:
\`\`\`
[1, 10, 100, 25, 40, 5]
\`\`\`
**Explanation:**
- By default, \`Array.prototype.sort()\` converts all elements to strings and compares their UTF-16 code units.
- In lexicographical (alphabetical) order, \`"1"\` comes before \`"10"\`, which comes before \`"100"\`, which comes before \`"25"\`.
- To sort numerically, you must supply a comparator: \`numbers.sort((a, b) => a - b)\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3];\nconst res = arr.reduce((acc, val) => acc + val);\nconsole.log(res);\n\nconst empty = [];\ntry {\n  empty.reduce((acc, val) => acc + val);\n} catch (e) {\n  console.log(e.name);\n}\n\`\`\``,
    "med",
    `Output:
\`\`\`
6
"TypeError"
\`\`\`
**Explanation:**
- When \`reduce\` is called without an \`initialValue\`, it takes the first element (\`arr[0]\`) as the accumulator and begins iterating from index 1. For \`[1, 2, 3]\`, it produces \`1 + 2 + 3 = 6\`.
- Calling \`reduce\` on an empty array without an initial value throws a \`TypeError: Reduce of empty array with no initial value\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3];\nconst [a, , b] = arr;\nconsole.log(a, b);\n\nconst [x = 10, y = 20] = [undefined, null];\nconsole.log(x, y);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
1 3
10 null
\`\`\`
**Explanation:**
- Comma with no identifier \`[a, , b]\` skips index 1, taking \`arr[0]\` into \`a\` (1) and \`arr[2]\` into \`b\` (3).
- Default values in destructuring ONLY activate if the incoming value is strictly \`undefined\`.
- For \`x\`, the value is \`undefined\`, so default \`10\` is used.
- For \`y\`, the value is \`null\`, which is not undefined, so \`y\` is \`null\`.`
  ],

  // ── 10. Numbers, Math & Floating Point ─────────────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(0.1 + 0.2 === 0.3);\nconsole.log(0.1 + 0.2);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
false
0.30000000000000004
\`\`\`
**Explanation:**
- JavaScript uses IEEE-754 double precision floating point numbers (binary base 2).
- Neither 0.1 nor 0.2 can be represented exactly as finite binary fractions (just like 1/3 in base 10).
- Their binary approximation sum produces \`0.30000000000000004\`, which is not strictly equal to \`0.3\`.
- To compare floats, check tolerance: \`Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Math.max());\nconsole.log(Math.min());\nconsole.log(Math.max() < Math.min());\n\`\`\``,
    "hard",
    `Output:
\`\`\`
-Infinity
Infinity
true
\`\`\`
**Explanation:**
- \`Math.max()\` with no arguments returns \`-Infinity\` (the identity element for max comparison: any real number \`x > -Infinity\`).
- \`Math.min()\` with no arguments returns \`Infinity\` (the identity element for min comparison: any real number \`x < Infinity\`).
- Therefore, \`-Infinity < Infinity\` evaluates to \`true\`!`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(9007199254740991 + 1 === 9007199254740991 + 2);\nconsole.log(Number.MAX_SAFE_INTEGER);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
true
9007199254740991
\`\`\`
**Explanation:**
- \`Number.MAX_SAFE_INTEGER\` is \`2^53 - 1 = 9007199254740991\`.
- Beyond this value, IEEE-754 64-bit floats cannot represent every consecutive integer because the 53-bit significand overflows.
- Both \`9007199254740991 + 1\` and \`9007199254740991 + 2\` round to \`9007199254740992\`, making the comparison \`true\`. For larger integers, use \`BigInt\` (\`9007199254740991n\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(1 / 0);\nconsole.log(-1 / 0);\nconsole.log(0 / 0);\nconsole.log(Object.is(0, -0));\n\`\`\``,
    "med",
    `Output:
\`\`\`
Infinity
-Infinity
NaN
false
\`\`\`
**Explanation:**
- Division by zero does not throw in JavaScript. Positive number divided by 0 is \`Infinity\`; negative number divided by 0 is \`-Infinity\`.
- \`0 / 0\` is an indeterminate form, resulting in \`NaN\`.
- In IEEE-754, signed zeros exist: \`+0\` and \`-0\`. While \`0 === -0\` is \`true\`, \`Object.is(0, -0)\` strictly distinguishes them and returns \`false\`.`
  ],

  // ── 11. Destructuring, Arguments & Functions ──────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction show(a, b, c) {}\nfunction showDefault(a, b = 1, c) {}\nfunction showRest(a, ...b) {}\nconsole.log(show.length);\nconsole.log(showDefault.length);\nconsole.log(showRest.length);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
3
1
1
\`\`\`
**Explanation:**
- \`Function.prototype.length\` returns the number of formal parameters up to (but not including) the FIRST parameter with a default value or rest parameter.
- \`show\` has 3 standard parameters -> \`3\`.
- In \`showDefault\`, \`b\` has a default value, so counting stops at \`a\` -> \`1\`.
- In \`showRest\`, \`...b\` is a rest parameter, so only \`a\` is counted -> \`1\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction fn(a, b) {\n  arguments[0] = 99;\n  console.log(a);\n}\nfn(10, 20);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
99
\`\`\`
**Explanation:**
- In non-strict mode without default, rest, or destructured parameters, the \`arguments\` object is live-aliased to the formal named parameters.
- Mutating \`arguments[0]\` automatically mutates \`a\`.
- In \`"use strict"\` mode or if default parameters are present, this live syncing is decoupled and \`a\` would remain \`10\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst fn = (...args) => {\n  console.log(typeof arguments);\n};\ntry {\n  fn(1, 2);\n} catch (e) {\n  console.log(e.name);\n}\n\`\`\``,
    "med",
    `Output:
\`\`\`
"undefined" (in module/browser) or ReferenceError
\`\`\`
**Explanation:**
- Arrow functions DO NOT have an \`arguments\` object.
- Accessing \`arguments\` inside an arrow function either accesses an outer enclosing non-arrow function's \`arguments\`, or throws a \`ReferenceError\` (or returns \`undefined\` if checking \`typeof arguments\` at module scope).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = (1, 2, 3);\nconsole.log(a);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
3
\`\`\`
**Explanation:**
- The comma operator evaluates each of its operands from left to right and returns the value of the LAST operand.
- \`1\`, \`2\`, and \`3\` are evaluated sequentially, and \`3\` is returned and assigned to \`a\`.`
  ],

  // ── 12. Object Properties, Prototypes & Classes ────────────────────────────
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst proto = { shared: 10 };\nconst child = Object.create(proto);\nchild.shared += 5;\nconsole.log(child.shared);\nconsole.log(proto.shared);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
15
10
\`\`\`
**Explanation:**
- \`child.shared += 5\` is equivalent to \`child.shared = child.shared + 5\`.
- When reading \`child.shared\`, it looks up the prototype chain and finds \`10\` on \`proto\`.
- \`10 + 5 = 15\`.
- When writing the result back, it creates an OWN property on \`child\` named \`shared\` with value \`15\`.
- It does NOT modify the prototype object \`proto\`, so \`proto.shared\` remains \`10\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = {};\nObject.defineProperty(obj, "hidden", {\n  value: 42,\n  enumerable: false\n});\nconsole.log(obj.hidden);\nconsole.log(Object.keys(obj));\nconsole.log("hidden" in obj);\n\`\`\``,
    "med",
    `Output:
\`\`\`
42
[]
true
\`\`\`
**Explanation:**
- The property \`hidden\` exists on \`obj\` with value \`42\`.
- Because \`enumerable\` was set to \`false\`, \`Object.keys(obj)\` and \`for...in\` loops omit it, so \`Object.keys(obj)\` returns an empty array \`[]\`.
- The \`in\` operator checks prototype chain existence regardless of enumerability, returning \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst sym1 = Symbol("key");\nconst sym2 = Symbol("key");\nconst obj = { [sym1]: "first", [sym2]: "second" };\nconsole.log(sym1 === sym2);\nconsole.log(Object.keys(obj).length);\nconsole.log(Object.getOwnPropertySymbols(obj).length);\n\`\`\``,
    "med",
    `Output:
\`\`\`
false
0
2
\`\`\`
**Explanation:**
- Every \`Symbol()\` call creates a unique, guaranteed-distinct identifier. Even with identical description strings, \`sym1 !== sym2\`.
- Symbol-keyed properties are intentionally ignored by \`Object.keys()\` and \`JSON.stringify()\`.
- To retrieve symbol properties, use \`Object.getOwnPropertySymbols(obj)\`, which finds both symbols (length 2).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst user = {\n  name: "Dan",\n  address: {\n    city: "NYC"\n  }\n};\nconsole.log(user?.address?.city);\nconsole.log(user?.contact?.email);\nconsole.log(user?.getAge?.());\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"NYC"
undefined
undefined
\`\`\`
**Explanation:**
- Optional chaining (\`?.\`) checks whether the reference is \`null\` or \`undefined\` before accessing properties or invoking methods.
- If it is nullish, evaluation short-circuits and immediately returns \`undefined\` instead of throwing a \`TypeError\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2, 3];\nconst b = [1, 2, 3];\nconst c = "1,2,3";\nconsole.log(a == c);\nconsole.log(a == b);\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
false
\`\`\`
**Explanation:**
- \`a == c\`: Array \`a\` is coerced to a primitive string via \`a.toString()\`, which returns \`"1,2,3"\`. \`"1,2,3" == "1,2,3"\` is \`true\`.
- \`a == b\`: Two separate array references are never equal, so \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst data = [1, 2, 3];\ndelete data[1];\nconsole.log(data.length);\nconsole.log(data[1]);\nconsole.log(1 in data);\n\`\`\``,
    "med",
    `Output:
\`\`\`
3
undefined
false
\`\`\`
**Explanation:**
- The \`delete\` operator removes the property at index 1 from the array object, turning index 1 into an empty hole (sparse slot).
- It does NOT shift subsequent elements or decrease the array's \`length\`, so length is still \`3\`.
- Accessing \`data[1]\` yields \`undefined\`, but \`1 in data\` returns \`false\` because the index property no longer exists.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(parseInt(0.0000005));\nconsole.log(parseInt(0.000005));\n\`\`\``,
    "hard",
    `Output:
\`\`\`
5
0
\`\`\`
**Explanation:**
- \`parseInt\` first converts its input to a string using \`String(arg)\`.
- Very small numbers (less than \`10^-6\`) are formatted in scientific exponential notation: \`String(0.0000005)\` is \`"5e-7"\`.
- \`parseInt("5e-7")\` parses up to the non-digit \`'e'\`, returning \`5\`!
- For \`0.000005\` (\`5 * 10^-6\`), \`String(0.000005)\` is \`"0.000005"\`. Parsing starts at \`'0'\` and stops at the decimal point, returning \`0\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log([] == false);\nconsole.log(![] == false);\nconsole.log([] == ![]);\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
true
true
\`\`\`
**Explanation:**
- \`[] == false\`: Both convert to numbers. \`"" -> 0\` and \`false -> 0\`. \`0 == 0\` is \`true\`.
- \`![] == false\`: \`![]\` is \`!true = false\`. \`false == false\` is \`true\`.
- Since both sides equal \`false\` under coercion, \`[] == ![]\` evaluates to \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet count = 0;\nfunction counter() {\n  return count++;\n}\nconsole.log(counter() + counter() * counter());\n\`\`\``,
    "med",
    `Output:
\`\`\`
2
\`\`\`
**Explanation:**
- JavaScript expressions evaluate operands strictly from left to right.
- First \`counter()\` runs: returns \`0\` (count is now 1).
- Multiplication has higher precedence, but the second \`counter()\` is evaluated next: returns \`1\` (count is now 2).
- Third \`counter()\` runs: returns \`2\` (count is now 3).
- The arithmetic expression is \`0 + (1 * 2) = 0 + 2 = 2\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = {};\nconst b = { key: "b" };\nconst map = new Map();\nmap.set(b, 123);\nmap.set({ key: "b" }, 456);\nconsole.log(map.get(b));\nconsole.log(map.size);\n\`\`\``,
    "med",
    `Output:
\`\`\`
123
2
\`\`\`
**Explanation:**
- Unlike plain objects, ES6 \`Map\` supports object references as keys.
- \`b\` and the literal \`{ key: "b" }\` are two distinct object references in memory.
- Therefore, they occupy two different entries in the map, so \`map.size\` is \`2\` and \`map.get(b)\` accurately returns \`123\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(JSON.stringify({ a: undefined, b: () => {}, c: Symbol("s"), d: 4 }));\nconsole.log(JSON.stringify([undefined, () => {}, Symbol("s"), 4]));\n\`\`\``,
    "med",
    `Output:
\`\`\`
"{\"d\":4}"
"[null,null,null,4]"
\`\`\`
**Explanation:**
- In objects, \`JSON.stringify()\` completely omits properties whose values are \`undefined\`, functions, or Symbols.
- In arrays, to preserve indexing, \`undefined\`, functions, and Symbols are converted into \`null\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction* gen() {\n  console.log("A");\n  yield 1;\n  console.log("B");\n  yield 2;\n}\nconst g = gen();\nconsole.log("Start");\nconsole.log(g.next().value);\nconsole.log(g.next().value);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Start"
"A"
1
"B"
2
\`\`\`
**Explanation:**
- Calling a generator function \`gen()\` does NOT execute its body immediately; it returns an iterator generator object.
- \`"Start"\` is logged first.
- The first \`g.next()\` runs code until the first \`yield\`: logs \`"A"\` and yields \`1\`.
- The second \`g.next()\` resumes from the pause point: logs \`"B"\` and yields \`2\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof (function() {} && function() {}));\nconsole.log(typeof (1, "2", true));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"function"
"boolean"
\`\`\`
**Explanation:**
- \`function() {} && function() {}\`: The logical \`&&\` operator returns the second operand if the first is truthy. Both functions are objects (truthy), so the expression returns the second function. \`typeof\` a function is \`"function"\`.
- In \`(1, "2", true)\`, the comma operator returns the last operand, \`true\`. \`typeof true\` is \`"boolean"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst x = [1, 2, 3];\nconst y = x.reverse();\ny.push(4);\nconsole.log(x);\nconsole.log(y);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
[3, 2, 1, 4]
[3, 2, 1, 4]
\`\`\`
**Explanation:**
- \`Array.prototype.reverse()\` mutates the array IN-PLACE and returns the reference to the same array.
- \`y\` references the exact same array as \`x\`.
- Pushing \`4\` onto \`y\` modifies that shared array, so both \`x\` and \`y\` are \`[3, 2, 1, 4]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2, 3];\nconst b = a.slice();\nb.push(4);\nconsole.log(a);\nconsole.log(b);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
[1, 2, 3]
[1, 2, 3, 4]
\`\`\`
**Explanation:**
- Unlike \`.reverse()\`, \`.slice()\` returns a shallow copy of a portion (or whole) of the array into a brand-new array object.
- Modifying \`b\` does not affect \`a\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet x = 10;\nfunction test(x = 5, y = x) {\n  console.log(x, y);\n}\ntest();\ntest(20);\n\`\`\``,
    "med",
    `Output:
\`\`\`
5 5
20 20
\`\`\`
**Explanation:**
- Default parameter expressions are evaluated in their own intermediate scope at invocation time.
- In \`test()\`, \`x\` defaults to \`5\`, and \`y\` defaults to the parameter \`x\` (which is \`5\`), logging \`5 5\`.
- In \`test(20)\`, \`x\` is passed as \`20\`, so \`y\` defaults to \`x = 20\`, logging \`20 20\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction test(y = x, x = 2) {}\ntry {\n  test();\n} catch (e) {\n  console.log(e.name);\n}\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"ReferenceError"
\`\`\`
**Explanation:**
- Default parameters are evaluated from left to right.
- When computing the default for \`y\`, parameter \`x\` has not yet been initialized.
- Accessing \`x\` in its Temporal Dead Zone (TDZ) inside the parameter list throws a \`ReferenceError\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3];\nconsole.log(arr.concat([4, [5]]));\nconsole.log(arr.flat ? [1, [2, [3]]].flat() : "no flat");\n\`\`\``,
    "med",
    `Output:
\`\`\`
[1, 2, 3, 4, [5]]
[1, 2, [3]]
\`\`\`
**Explanation:**
- \`concat()\` only flattens arrays passed as arguments by ONE level. The nested \`[5]\` inside \`[4, [5]]\` remains an array.
- \`flat()\` defaults to depth 1, flattening \`[1, [2, [3]]]\` to \`[1, 2, [3]]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Object.prototype.toString.call([]));\nconsole.log(Object.prototype.toString.call(null));\nconsole.log(Object.prototype.toString.call(undefined));\nconsole.log(Object.prototype.toString.call(new Date()));\n\`\`\``,
    "med",
    `Output:
\`\`\`
"[object Array]"
"[object Null]"
"[object Undefined]"
"[object Date]"
\`\`\`
**Explanation:**
- \`Object.prototype.toString.call(val)\` is the gold standard in JavaScript for accurate type inspection.
- Unlike \`typeof\`, it properly identifies \`"[object Null]"\`, \`"[object Array]"\`, and built-in objects like \`"[object Date]"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst target = { a: 1 };\nconst source = { b: 2 };\nconst res = Object.assign(target, source);\nconsole.log(res === target);\nconsole.log(target);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
{ a: 1, b: 2 }
\`\`\`
**Explanation:**
- \`Object.assign(target, ...sources)\` copies properties into \`target\` and returns the \`target\` object itself.
- \`target\` is mutated directly and is reference-equal to \`res\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst str = "hello";\nstr.custom = 123;\nconsole.log(str.custom);\n\`\`\``,
    "med",
    `Output:
\`\`\`
undefined
\`\`\`
**Explanation:**
- Primitive strings are not objects.
- When accessing or setting a property on a primitive, JavaScript temporarily wraps it in an object wrapper (\`new String(str)\`).
- The property \`custom\` is added to this temporary wrapper object, which is immediately discarded afterwards.
- Accessing \`str.custom\` creates a new temporary wrapper with no such property, returning \`undefined\` (or throws a TypeError in strict mode).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [10, 20, 30];\nfor (const x in a) {\n  console.log(typeof x, x);\n  break;\n}\n\`\`\``,
    "med",
    `Output:
\`\`\`
"string" "0"
\`\`\`
**Explanation:**
- \`for...in\` iterates over the enumerable PROPERTY KEYS of an object (including arrays).
- Array indices are stored as string keys (\`"0"\`, \`"1"\`, \`"2"\`).
- To iterate over array values, use \`for...of\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log("b" + "a" + +"a" + "a");\n\`\`\``,
    "med",
    `Output:
\`\`\`
"baNaNa"
\`\`\`
**Explanation:**
- \`+"a"\` attempts to convert the string \`"a"\` to a number using the unary \`+\` operator.
- Since \`"a"\` cannot be converted to a valid number, it evaluates to \`NaN\`.
- String concatenation then combines: \`"b" + "a" + NaN + "a"\` = \`"baNaNa"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst regex = /test/g;\nconsole.log(regex.test("test"));\nconsole.log(regex.test("test"));\nconsole.log(regex.test("test"));\n\`\`\``,
    "hard",
    `Output:
\`\`\`
true
false
true
\`\`\`
**Explanation:**
- Regular expressions with the global \`g\` flag are stateful in JavaScript.
- They maintain a \`lastIndex\` pointer.
- First test: finds match at index 0, sets \`lastIndex = 4\`, returns \`true\`.
- Second test: starts searching from index 4. String has ended, so it finds no match, resets \`lastIndex = 0\`, and returns \`false\`.
- Third test: starts searching from index 0 again, finds match, returns \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(new Date(2025, 0, 1).getMonth());\nconsole.log(new Date(2025, 12, 1).getMonth());\n\`\`\``,
    "med",
    `Output:
\`\`\`
0
0
\`\`\`
**Explanation:**
- JavaScript \`Date\` months are ZERO-INDEXED (0 = January, 11 = December).
- Month 0 is January, so \`getMonth()\` returns \`0\`.
- Month 12 overflows the 0-11 range and rolls over into January of the following year (2026), where the month index is \`0\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction test() {\n  return\n  {\n    success: true\n  };\n}\nconsole.log(test());\n\`\`\``,
    "easy",
    `Output:
\`\`\`
undefined
\`\`\`
**Explanation:**
- Automatic Semicolon Insertion (ASI) automatically inserts a semicolon after \`return\` because the opening curly brace \`{\` is on the next line.
- The function executes \`return;\` and exits immediately with \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = {\n  a: 1,\n  b: 2,\n  get sum() {\n    return this.a + this.b;\n  }\n};\nconsole.log(obj.sum);\nobj.a = 10;\nconsole.log(obj.sum);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
3
12
\`\`\`
**Explanation:**
- A getter property \`get sum()\` dynamically re-computes its return value every time \`obj.sum\` is read.
- After updating \`obj.a = 10\`, reading \`obj.sum\` recalculates \`10 + 2 = 12\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = {};\nconst b = { [a]: "hello" };\nconsole.log(b["[object Object]"]);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"hello"
\`\`\`
**Explanation:**
- Computed property keys in object literals \`[a]\` coerce the expression to a string.
- \`a.toString()\` evaluates to \`"[object Object]"\`.
- Therefore, the property name is literally \`"[object Object]"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst x = [1, 2, 3];\nconst y = [1, 2, 3];\nconsole.log(JSON.stringify(x) === JSON.stringify(y));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
\`\`\`
**Explanation:**
- Both \`x\` and \`y\` serialize to the identical JSON string \`"[1,2,3]"\`.
- String comparison compares primitive values, so \`"[1,2,3]" === "[1,2,3]"\` evaluates to \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Number("   123   "));\nconsole.log(Number("123abc"));\nconsole.log(parseInt("123abc"));\nconsole.log(parseInt("abc123"));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
123
NaN
123
NaN
\`\`\`
**Explanation:**
- \`Number()\` trims leading and trailing whitespace and parses \`"123"\` to \`123\`.
- \`Number("123abc")\` is strict: any non-digit character causes the entire conversion to fail, returning \`NaN\`.
- \`parseInt("123abc")\` parses characters from left to right until encountering the first non-numeric character \`'a'\`, returning \`123\`.
- \`parseInt("abc123")\` starts with a non-digit, so parsing fails immediately, returning \`NaN\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst f = () => {};\nconsole.log(f.prototype);\nconsole.log(new f());\n\`\`\``,
    "med",
    `Output:
\`\`\`
undefined
TypeError: f is not a constructor
\`\`\`
**Explanation:**
- Arrow functions do not have a \`prototype\` property.
- They lack the internal \`[[Construct]]\` method, so calling them with \`new\` throws a \`TypeError: f is not a constructor\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nclass Animal {\n  static count = 0;\n  constructor() {\n    Animal.count++;\n  }\n}\nnew Animal();\nnew Animal();\nconsole.log(Animal.count);\nconst a = new Animal();\nconsole.log(a.count);\n\`\`\``,
    "med",
    `Output:
\`\`\`
2
undefined
\`\`\`
**Explanation:**
- Static class properties belong to the class constructor function (\`Animal\`), not to individual instances.
- After 2 instantiations, \`Animal.count\` is \`2\`.
- Instances like \`a\` do not inherit static properties on their prototype chain, so \`a.count\` is \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2, 3];\nconst b = a;\na.length = 0;\nconsole.log(b);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
[]
\`\`\`
**Explanation:**
- \`b\` references the same array as \`a\`.
- Resetting \`a.length = 0\` empties the array in-place.
- Both \`a\` and \`b\` now point to the emptied array \`[]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet a = 1;\nlet b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2 1
\`\`\`
**Explanation:**
- Array destructuring allows concise variable swapping without requiring a temporary variable.
- \`[b, a]\` creates \`[2, 1]\`, which is destructured back into \`a = 2\` and \`b = 1\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof (void 0));\nconsole.log(void "anything");\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"undefined"
undefined
\`\`\`
**Explanation:**
- The \`void\` operator evaluates the given expression and always returns the primitive value \`undefined\`.
- \`typeof (void 0)\` is \`"undefined"\`.
- \`void 0\` was traditionally preferred over \`undefined\` because in old JavaScript (pre-ES5), the global \`undefined\` could accidentally be reassigned.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = { a: 1 };\nObject.seal(obj);\nobj.a = 99;\nobj.b = 100;\ndelete obj.a;\nconsole.log(obj.a);\nconsole.log(obj.b);\n\`\`\``,
    "med",
    `Output:
\`\`\`
99
undefined
\`\`\`
**Explanation:**
- \`Object.seal()\` prevents adding new properties and prevents deleting existing properties.
- However, it STILL allows modifying the values of existing writable properties.
- \`obj.a = 99\` succeeds.
- \`obj.b = 100\` fails silently (or throws in strict mode).
- \`delete obj.a\` fails, leaving \`obj.a\` as \`99\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst map = new Map();\nconst key1 = {};\nconst key2 = {};\nmap.set(key1, "One");\nmap.set(key2, "Two");\nconsole.log(map.get(key1));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"One"
\`\`\`
**Explanation:**
- In a \`Map\`, keys are compared by identity (SameValueZero algorithm).
- \`key1\` and \`key2\` are separate object instances with distinct identities, so their stored values remain independent.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst set = new Set([1, 2, 2, 3, 4, 4, 5]);\nconsole.log([...set]);\nconsole.log(set.size);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
[1, 2, 3, 4, 5]
5
\`\`\`
**Explanation:**
- A \`Set\` only stores unique values. Any duplicate values passed during initialization or added with \`.add()\` are discarded.
- \`size\` reflects the unique count (5).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst sym = Symbol("desc");\nconsole.log(sym.description);\nconsole.log(String(sym));\ntry {\n  console.log(sym + "");\n} catch (e) {\n  console.log(e.name);\n}\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"desc"
"Symbol(desc)"
"TypeError"
\`\`\`
**Explanation:**
- \`sym.description\` reads the optional description string.
- Explicit string conversion via \`String(sym)\` works and returns \`"Symbol(desc)"\`.
- However, implicit coercion with \`+\` throws \`TypeError: Cannot convert a Symbol value to a string\` to prevent accidental property naming collisions.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(true + true);\nconsole.log(true - false);\nconsole.log(true / false);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2
1
Infinity
\`\`\`
**Explanation:**
- Arithmetic operators convert booleans to numbers: \`true -> 1\` and \`false -> 0\`.
- \`1 + 1 = 2\`.
- \`1 - 0 = 1\`.
- \`1 / 0 = Infinity\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2, 3];\nconst b = [4, 5, 6];\nconsole.log(a.push(...b));\nconsole.log(a);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
6
[1, 2, 3, 4, 5, 6]
\`\`\`
**Explanation:**
- \`Array.prototype.push()\` appends elements to the end of the array and RETURNS the new \`length\` of the array.
- After pushing 3 elements, the length is \`6\`.
- Array \`a\` is mutated in-place to \`[1, 2, 3, 4, 5, 6]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3, 4];\nconst removed = arr.splice(1, 2, 99);\nconsole.log(arr);\nconsole.log(removed);\n\`\`\``,
    "med",
    `Output:
\`\`\`
[1, 99, 4]
[2, 3]
\`\`\`
**Explanation:**
- \`splice(start, deleteCount, ...items)\` mutates the array.
- Starting at index 1, it deletes 2 items (\`2\` and \`3\`) and inserts \`99\`.
- It returns an array of the removed elements: \`[2, 3]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst user = { name: "Sam" };\nconst proxy = new Proxy(user, {\n  get(target, prop) {\n    return prop in target ? target[prop] : "Not Found";\n  }\n});\nconsole.log(proxy.name);\nconsole.log(proxy.age);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Sam"
"Not Found"
\`\`\`
**Explanation:**
- \`Proxy\` intercepts fundamental operations like property access via the \`get\` trap.
- For \`proxy.name\`, the property exists on \`target\`, so \`"Sam"\` is returned.
- For \`proxy.age\`, \`age\` does not exist on \`target\`, so the trap returns \`"Not Found"\` instead of \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nasync function fail() {\n  throw new Error("Boom");\n}\nfail().catch(e => console.log(e.message));\nconsole.log("After fail");\n\`\`\``,
    "med",
    `Output:
\`\`\`
"After fail"
"Boom"
\`\`\`
**Explanation:**
- An async function always returns a Promise.
- Throwing an error inside an async function rejects the returned promise.
- Rejection handling via \`.catch()\` is queued as a microtask.
- The synchronous code continues, logging \`"After fail"\`.
- When the microtask queue runs, \`"Boom"\` is logged.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet a = 0;\nfunction test() {\n  a = 10;\n  return;\n  function a() {}\n}\ntest();\nconsole.log(a);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
0
\`\`\`
**Explanation:**
- The function declaration \`function a() {}\` inside \`test\` is hoisted to the top of \`test\`'s scope as a local variable.
- When \`a = 10\` executes, it assigns \`10\` to that local variable \`a\`.
- The global variable \`a\` is not touched and remains \`0\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof (() => {}));\nconsole.log(typeof class {});\nconsole.log(typeof Math);\nconsole.log(typeof JSON);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"function"
"function"
"object"
"object"
\`\`\`
**Explanation:**
- Arrow functions are functions -> \`"function"\`.
- ES6 classes are syntactic sugar over constructor functions -> \`"function"\`.
- \`Math\` and \`JSON\` are built-in static namespace objects, not callable constructor functions -> \`"object"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2];\nconst b = [3, 4];\nconsole.log([ ...a, ...b ]);\nconsole.log({ ...a });\n\`\`\``,
    "med",
    `Output:
\`\`\`
[1, 2, 3, 4]
{ 0: 1, 1: 2 }
\`\`\`
**Explanation:**
- Array spread inside an array combines the elements into a single array \`[1, 2, 3, 4]\`.
- Spreading an array inside an object literal \`{ ...a }\` creates an object with numeric keys corresponding to the array indices: \`{ 0: 1, 1: 2 }\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(1..toString());\nconsole.log((1).toString());\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"1"
"1"
\`\`\`
**Explanation:**
- \`1.toString()\` without parentheses throws a \`SyntaxError\` because the JS parser interprets the first dot as a decimal point.
- With two dots \`1..toString()\`, the first dot is the decimal point (\`1.\`), and the second dot is property access!
- \`(1).toString()\` uses grouping parentheses to disambiguate, safely calling \`.toString()\` on number \`1\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst x = {}\nconsole.log(x.toString());\nconsole.log(Object.create(null).toString);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"[object Object]"
undefined
\`\`\`
**Explanation:**
- Standard objects inherit from \`Object.prototype\`, which provides \`.toString()\`.
- \`Object.create(null)\` creates a completely bare dictionary object with NO prototype chain. It does not inherit from \`Object.prototype\`, so \`.toString\` is \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(!!"false" == !!"true");\nconsole.log(Boolean("false") === Boolean("true"));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
true
\`\`\`
**Explanation:**
- Both \`"false"\` and \`"true"\` are non-empty strings, so both evaluate to boolean \`true\`.
- \`true == true\` is \`true\`.
- \`true === true\` is \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = {\n  prop: 42,\n  func: function() {\n    const inner = () => this.prop;\n    return inner();\n  }\n};\nconsole.log(obj.func());\n\`\`\``,
    "med",
    `Output:
\`\`\`
42
\`\`\`
**Explanation:**
- \`obj.func()\` sets \`this\` of \`func\` to \`obj\`.
- The arrow function \`inner\` lexically captures \`this\` from its enclosing function (\`func\`).
- Therefore, inside \`inner\`, \`this.prop\` accesses \`obj.prop\`, which is \`42\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Number.isInteger(10));\nconsole.log(Number.isInteger(10.0));\nconsole.log(Number.isInteger(10.5));\nconsole.log(Number.isInteger("10"));\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
true
false
false
\`\`\`
**Explanation:**
- In JavaScript, all numbers are floats. \`10\` and \`10.0\` have identical IEEE-754 representations and zero fractional component, so \`Number.isInteger(10.0)\` is \`true\`.
- \`10.5\` has a fractional part, so \`false\`.
- \`Number.isInteger\` does not coerce types; passing a string returns \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3];\nObject.defineProperty(arr, "0", { writable: false });\narr[0] = 99;\nconsole.log(arr[0]);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
1
\`\`\`
**Explanation:**
- Array indices are regular object properties under the hood.
- Making property \`"0"\` non-writable prevents reassignment.
- \`arr[0] = 99\` fails silently in non-strict mode (or throws in strict mode), leaving \`arr[0]\` as \`1\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst [head, ...tail] = "code";\nconsole.log(head);\nconsole.log(tail);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"c"
["o", "d", "e"]
\`\`\`
**Explanation:**
- Strings implement the iterable protocol (\`Symbol.iterator\`).
- Array destructuring consumes the iterator.
- The first character \`"c"\` is bound to \`head\`.
- The rest operator \`...tail\` collects the remaining characters into an array of single-character strings: \`["o", "d", "e"]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(2 ** 3 ** 2);\nconsole.log((2 ** 3) ** 2);\n\`\`\``,
    "hard",
    `Output:
\`\`\`
512
64
\`\`\`
**Explanation:**
- The exponentiation operator \`**\` is RIGHT-ASSOCIATIVE.
- \`2 ** 3 ** 2\` is evaluated as \`2 ** (3 ** 2) = 2 ** 9 = 512\`.
- Parentheses force left-associativity: \`(2 ** 3) ** 2 = 8 ** 2 = 64\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet x = 5;\nconst result = x++ + ++x;\nconsole.log(result, x);\n\`\`\``,
    "med",
    `Output:
\`\`\`
12 7
\`\`\`
**Explanation:**
- Evaluated left to right:
- \`x++\` returns the current value \`5\` and then increments \`x\` to \`6\`.
- \`++x\` increments \`x\` from \`6\` to \`7\` and returns the new value \`7\`.
- \`5 + 7 = 12\`. Final \`x\` is \`7\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst person = {\n  firstName: "Jane",\n  lastName: "Doe",\n  get fullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  }\n};\nconsole.log(person.fullName);\nperson.fullName = "John Smith";\nconsole.log(person.fullName);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"Jane Doe"
"Jane Doe"
\`\`\`
**Explanation:**
- \`fullName\` is defined with only a getter (\`get\`) and no setter (\`set\`).
- Attempting to set \`person.fullName = "John Smith"\` fails silently in non-strict mode (or throws a TypeError in strict mode).
- The value remains \`"Jane Doe"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction check() {\n  return this;\n}\nconsole.log(check.call(undefined) === (typeof window !== "undefined" ? window : global));\n\`\`\``,
    "hard",
    `Output:
\`\`\`
true
\`\`\`
**Explanation:**
- In non-strict mode, if \`null\` or \`undefined\` is passed as \`thisArg\` to \`.call()\`, \`.apply()\`, or \`.bind()\`, the JavaScript runtime replaces it with the global object (\`window\` in browsers, \`global\` in Node.js).
- In strict mode (\`"use strict"\`), this boxing does not happen and \`this\` remains \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [0];\nif (a) {\n  console.log(a == true);\n} else {\n  console.log(false);\n}\n\`\`\``,
    "hard",
    `Output:
\`\`\`
false
\`\`\`
**Explanation:**
- \`if (a)\`: The array \`[0]\` is an object, so it is truthy. The \`if\` branch executes.
- Inside the branch, \`a == true\` compares \`[0] == true\`.
- Boolean \`true\` coerces to number \`1\`.
- \`[0].toString()\` is \`"0"\`, which coerces to number \`0\`.
- \`0 == 1\` is \`false\`!
- So \`[0]\` is truthy in an \`if\` condition, yet \`[0] == true\` is \`false\`!`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst x = { val: 10 };\nfunction modify(obj) {\n  obj.val = 20;\n  obj = { val: 30 };\n  return obj;\n}\nconst y = modify(x);\nconsole.log(x.val);\nconsole.log(y.val);\n\`\`\``,
    "med",
    `Output:
\`\`\`
20
30
\`\`\`
**Explanation:**
- Object parameters are passed by reference-value (sharing the reference).
- \`obj.val = 20\` modifies the property of the object referenced by \`x\`.
- Reassigning the parameter \`obj = { val: 30 }\` merely changes the local reference variable inside \`modify\`. It does not rebind \`x\`.
- The returned object is the new object \`{ val: 30 }\`, so \`y.val\` is \`30\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst items = [1, 2, 3];\nitems[items.length] = 4;\nconsole.log(items);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
[1, 2, 3, 4]
\`\`\`
**Explanation:**
- \`items.length\` is initially \`3\`.
- Assigning \`items[3] = 4\` appends the element at the next available index, identical to \`items.push(4)\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(+"Infinity");\nconsole.log(+Infinity);\nconsole.log(+"-Infinity");\n\`\`\``,
    "easy",
    `Output:
\`\`\`
Infinity
Infinity
-Infinity
\`\`\`
**Explanation:**
- The unary \`+\` operator parses \`"Infinity"\` and \`"-Infinity"\` as valid numeric constants in JavaScript.
- They convert to positive and negative \`Infinity\` respectively.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Boolean(new String("")));\nconsole.log(Boolean(""));\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
false
\`\`\`
**Explanation:**
- \`""\` is an empty primitive string, which is falsy.
- \`new String("")\` creates an Object wrapper around the string.
- All objects in JavaScript are TRUTHY, regardless of their wrapped value!`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = { x: 1 };\nconst b = { x: 1 };\nconsole.log(a === b);\nconsole.log(a == b);\nconsole.log(Object.is(a, b));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
false
false
false
\`\`\`
**Explanation:**
- In JavaScript, objects are compared by reference identity, not structural content.
- \`a\` and \`b\` point to two independent objects in heap memory.
- All three comparison operators return \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet x = 1;\n(function() {\n  console.log(x);\n  var x = 2;\n})();\n\`\`\``,
    "med",
    `Output:
\`\`\`
undefined
\`\`\`
**Explanation:**
- The IIFE creates a new function scope.
- \`var x = 2\` inside the function is hoisted to the top of the function and initialized as \`undefined\`.
- It shadows the outer \`let x = 1\`, so the log prints \`undefined\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof NaN);\nconsole.log(NaN === NaN);\nconsole.log(Number.isNaN(NaN));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"number"
false
true
\`\`\`
**Explanation:**
- \`NaN\` is of type \`"number"\`.
- \`NaN === NaN\` is always \`false\`.
- \`Number.isNaN(NaN)\` correctly identifies it as \`NaN\`, returning \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log([..."hello"]);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
["h", "e", "l", "l", "o"]
\`\`\`
**Explanation:**
- The spread operator on a string invokes its iterator, splitting the string into an array of individual code point characters.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction test() {\n  console.log(arguments.length);\n}\ntest(1, 2, 3);\ntest();\n\`\`\``,
    "easy",
    `Output:
\`\`\`
3
0
\`\`\`
**Explanation:**
- \`arguments.length\` reflects the exact count of arguments passed to the function call at runtime.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2, 3];\nconst b = a;\nb[0] = 99;\nconsole.log(a[0]);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
99
\`\`\`
**Explanation:**
- Arrays are objects and assigned by reference.
- Mutating \`b\` directly mutates the same array referenced by \`a\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst s = new Set([1, 1, 2, 3, 3]);\nconsole.log(s.size);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
3
\`\`\`
**Explanation:**
- Sets automatically deduplicate values. The set contains \`1, 2, 3\`, with a size of \`3\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log("5" * 2);\nconsole.log("5" / 2);\nconsole.log("5" % 2);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
10
2.5
1
\`\`\`
**Explanation:**
- Multiplication, division, and modulo coerce strings to numbers: \`5 * 2 = 10\`, \`5 / 2 = 2.5\`, \`5 % 2 = 1\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst x = null;\nconsole.log(typeof x);\nconsole.log(x == undefined);\nconsole.log(x === undefined);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"object"
true
false
\`\`\`
**Explanation:**
- \`typeof null\` is \`"object"\`.
- \`null == undefined\` is \`true\` (special spec rule).
- \`null === undefined\` is \`false\` (different types).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = { x: 1 };\nconsole.log("x" in obj);\nconsole.log("toString" in obj);\nconsole.log(obj.hasOwnProperty("toString"));\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
true
false
\`\`\`
**Explanation:**
- \`in\` operator checks the object and its prototype chain. \`x\` is an own property (\`true\`), and \`toString\` is on \`Object.prototype\` (\`true\`).
- \`hasOwnProperty\` only returns \`true\` for properties defined directly on the instance itself. Since \`toString\` is inherited, it returns \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst fn = () => 42;\nconsole.log(fn());\nconst fn2 = () => ({ a: 1 });\nconsole.log(fn2());\n\`\`\``,
    "easy",
    `Output:
\`\`\`
42
{ a: 1 }
\`\`\`
**Explanation:**
- Arrow functions with concise bodies implicitly return the expression result.
- To return an object literal implicitly, it must be wrapped in parentheses \`({ a: 1 })\` so the curly braces are not parsed as a function body block.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet a = 5;\nlet b = a++;\nconsole.log(a, b);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
6 5
\`\`\`
**Explanation:**
- Post-increment \`a++\` yields the original value \`5\` before incrementing \`a\` to \`6\`.
- \`b\` receives \`5\`, while \`a\` becomes \`6\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2, 3];\nconsole.log(a.includes(2));\nconsole.log(a.includes(4));\nconsole.log(a.includes("2"));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
false
false
\`\`\`
**Explanation:**
- \`Array.prototype.includes\` checks for element existence using strict equality (SameValueZero).
- String \`"2"\` does not match number \`2\`, returning \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(1 + 2 + "3" + 4 + 5);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"3345"
\`\`\`
**Explanation:**
- Evaluated left to right:
- \`1 + 2\` = \`3\` (numeric addition).
- \`3 + "3"\` = \`"33"\` (number + string -> string concatenation).
- \`"33" + 4\` = \`"334"\` (string concatenation continues).
- \`"334" + 5\` = \`"3345"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof Array);\nconsole.log(typeof Function);\nconsole.log(typeof Object);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"function"
"function"
"function"
\`\`\`
**Explanation:**
- Built-in constructors (\`Array\`, \`Function\`, \`Object\`, \`String\`, \`Number\`) are all constructor functions in JavaScript, so their \`typeof\` is \`"function"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3];\nconsole.log(arr.join(" - "));\nconsole.log(arr.join(""));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"1 - 2 - 3"
"123"
\`\`\`
**Explanation:**
- \`join()\` joins all array elements into a string using the specified separator.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = { x: 1 };\nconst b = Object.freeze(a);\nconsole.log(a === b);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
\`\`\`
**Explanation:**
- \`Object.freeze()\` freezes the passed object and returns the exact same object reference.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Math.round(2.5));\nconsole.log(Math.round(-2.5));\n\`\`\``,
    "hard",
    `Output:
\`\`\`
3
-2
\`\`\`
**Explanation:**
- \`Math.round(x)\` rounds half-way values towards positive infinity (\`+Infinity\`).
- For \`2.5\`, rounding up towards \`+Infinity\` gives \`3\`.
- For \`-2.5\`, rounding up towards \`+Infinity\` gives \`-2\` (not \`-3\`)!`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst str = "apple,banana,orange";\nconsole.log(str.split(",")[1]);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"banana"
\`\`\`
**Explanation:**
- \`str.split(",")\` splits the string into array \`["apple", "banana", "orange"]\`. Index 1 is \`"banana"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Number.isFinite(100));\nconsole.log(Number.isFinite(Infinity));\nconsole.log(Number.isFinite("100"));\nconsole.log(isFinite("100"));\n\`\`\``,
    "med",
    `Output:
\`\`\`
true
false
false
true
\`\`\`
**Explanation:**
- \`Number.isFinite(val)\` does not coerce: if \`val\` is not of type number, it returns \`false\` immediately.
- Global \`isFinite("100")\` coerces \`"100"\` to number \`100\`, which is finite, so it returns \`true\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [10, 20, 30];\nconsole.log(a.at(-1));\nconsole.log(a.at(-2));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
30
20
\`\`\`
**Explanation:**
- \`Array.prototype.at()\` supports negative indexing.
- \`-1\` returns the last element (\`30\`).
- \`-2\` returns the second to last element (\`20\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = { a: 1 };\nconsole.log("a" in obj);\ndelete obj.a;\nconsole.log("a" in obj);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
false
\`\`\`
**Explanation:**
- Property \`a\` exists initially.
- \`delete obj.a\` permanently removes the property.
- \`"a" in obj\` now returns \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst p = Promise.resolve(10);\nPromise.all([p, 20, "thirty"]).then(values => console.log(values));\n\`\`\``,
    "med",
    `Output:
\`\`\`
[10, 20, "thirty"]
\`\`\`
**Explanation:**
- \`Promise.all()\` accepts an iterable of values.
- Non-promise values (like \`20\` or \`"thirty"\`) are automatically wrapped in \`Promise.resolve()\`.
- All resolve concurrently to \`[10, 20, "thirty"]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst x = [1, 2, 3];\nconst y = [...x];\nconsole.log(x === y);\nconsole.log(x[0] === y[0]);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
false
true
\`\`\`
**Explanation:**
- \`[...x]\` creates a new array instance (\`x !== y\`).
- Primitive values copied into \`y\` match the primitives in \`x\` (\`1 === 1\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction test() {\n  return typeof arguments;\n}\nconsole.log(test());\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"object"
\`\`\`
**Explanation:**
- The \`arguments\` object is an array-like object. Its \`typeof\` is \`"object"\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst str = "JavaScript";\nconsole.log(str.substring(4, 0));\nconsole.log(str.slice(4, 0));\n\`\`\``,
    "hard",
    `Output:
\`\`\`
"Java"
""
\`\`\`
**Explanation:**
- \`String.prototype.substring(start, end)\`: If \`start > end\`, it automatically swaps the arguments! \`substring(4, 0)\` becomes \`substring(0, 4)\`, returning \`"Java"\`.
- \`String.prototype.slice(start, end)\`: If \`start > end\` (and both positive), it does NOT swap and returns an empty string \`""\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log([1, 2, 3].indexOf(2));\nconsole.log([1, 2, 3].indexOf(4));\nconsole.log([1, 2, 3].indexOf("2"));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
1
-1
-1
\`\`\`
**Explanation:**
- \`indexOf\` uses strict equality (\`===\`).
- Element \`2\` is found at index \`1\`.
- \`4\` is not found, returning \`-1\`.
- \`"2"\` does not strictly equal \`2\`, returning \`-1\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nlet x = 1;\nx = (x++, x + 2);\nconsole.log(x);\n\`\`\``,
    "med",
    `Output:
\`\`\`
4
\`\`\`
**Explanation:**
- Inside parentheses, the comma operator evaluates operands left to right.
- \`x++\` increments \`x\` from \`1\` to \`2\`.
- Next, \`x + 2\` evaluates to \`2 + 2 = 4\`.
- The comma operator returns the value of the last operand (\`4\`), which is assigned to \`x\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2];\nconst b = a;\na.push(3);\nconsole.log(b.length);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
3
\`\`\`
**Explanation:**
- \`a\` and \`b\` point to the same array object. Pushing \`3\` increases length to \`3\` on both references.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Boolean(null));\nconsole.log(Boolean(undefined));\nconsole.log(Boolean(NaN));\nconsole.log(Boolean(0));\nconsole.log(Boolean(""));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
false
false
false
false
false
\`\`\`
**Explanation:**
- All 5 of these values are among the core 8 falsy primitives in JavaScript.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof (1n));\nconsole.log(1n == 1);\nconsole.log(1n === 1);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"bigint"
true
false
\`\`\`
**Explanation:**
- \`1n\` is of primitive type \`"bigint"\`.
- Under loose equality (\`==\`), BigInt and Number compare by numerical value, so \`1n == 1\` is \`true\`.
- Under strict equality (\`===\`), types differ (\`bigint\` vs \`number\`), so \`1n === 1\` is \`false\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst arr = [1, 2, 3];\nconsole.log(arr.find(x => x > 1));\nconsole.log(arr.findIndex(x => x > 1));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2
1
\`\`\`
**Explanation:**
- \`find()\` returns the first element satisfying the predicate (\`2\`).
- \`findIndex()\` returns the index of that first matching element (\`1\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst obj = {};\nconst sym = Symbol();\nobj[sym] = "value";\nconsole.log(JSON.stringify(obj));\nconsole.log(obj[sym]);\n\`\`\``,
    "med",
    `Output:
\`\`\`
"{}"
"value"
\`\`\`
**Explanation:**
- Symbol-keyed properties are hidden from \`JSON.stringify()\`, resulting in an empty JSON object string \`"{}"\`.
- The property is still accessible directly via \`obj[sym]\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Number.isNaN(NaN));\nconsole.log(Number.isNaN("NaN"));\nconsole.log(Number.isNaN(undefined));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
false
false
\`\`\`
**Explanation:**
- \`Number.isNaN\` checks if the type is Number AND value is \`NaN\`. Neither \`"NaN"\` (string) nor \`undefined\` is of type number.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst set = new Set();\nset.add({});\nset.add({});\nconsole.log(set.size);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
2
\`\`\`
**Explanation:**
- Each literal \`{}\` instantiates a distinct object with its own memory address. Since they have different references, both are kept in the Set.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nfunction Person() {}\nPerson.prototype.age = 25;\nconst p1 = new Person();\nconst p2 = new Person();\np1.age = 30;\nconsole.log(p1.age);\nconsole.log(p2.age);\n\`\`\``,
    "med",
    `Output:
\`\`\`
30
25
\`\`\`
**Explanation:**
- Assigning \`p1.age = 30\` creates an OWN property on \`p1\`, shadowing the prototype property.
- \`p2\` has no own \`age\` property, so it falls back to \`Person.prototype.age\`, which is \`25\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst str = "hello";\nconsole.log(str.toUpperCase());\nconsole.log(str);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"HELLO"
"hello"
\`\`\`
**Explanation:**
- Strings in JavaScript are primitive and completely IMMUTABLE.
- All string methods return a new string, leaving the original variable unchanged.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(Math.max(-1, -2, -3));\nconsole.log(Math.min(-1, -2, -3));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
-1
-3
\`\`\`
**Explanation:**
- For negative numbers, larger values are closer to 0 (\`-1 > -2 > -3\`).
- \`Math.max\` returns \`-1\`; \`Math.min\` returns \`-3\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst x = [1, 2, 3];\nx.reverse();\nconsole.log(x[0]);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
3
\`\`\`
**Explanation:**
- \`reverse()\` mutates \`x\` in-place. The array becomes \`[3, 2, 1]\`, so \`x[0]\` is \`3\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = { x: 1 };\nconst b = { y: 2 };\nconst c = Object.assign({}, a, b);\nconsole.log(c);\n\`\`\``,
    "easy",
    `Output:
\`\`\`
{ x: 1, y: 2 }
\`\`\`
**Explanation:**
- Properties from \`a\` and \`b\` are copied into the new target object \`{}\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst a = [1, 2, 3];\nconsole.log(a.every(x => x > 0));\nconsole.log(a.some(x => x > 2));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
true
true
\`\`\`
**Explanation:**
- \`every\` checks if all items satisfy the condition (all > 0 -> \`true\`).
- \`some\` checks if at least one item satisfies the condition (3 > 2 -> \`true\`).`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconst fn = new Function("a", "b", "return a + b;");\nconsole.log(fn(5, 10));\n\`\`\``,
    "med",
    `Output:
\`\`\`
15
\`\`\`
**Explanation:**
- \`new Function(...args, body)\` dynamically constructs a function from string arguments.
- Invoking \`fn(5, 10)\` executes \`return 5 + 10;\`, producing \`15\`.`
  ],
  [
    `What is the output of the following code?\n\`\`\`javascript\nconsole.log(typeof Symbol.iterator);\nconsole.log(typeof Symbol.for("test"));\n\`\`\``,
    "easy",
    `Output:
\`\`\`
"symbol"
"symbol"
\`\`\`
**Explanation:**
- Well-known symbols like \`Symbol.iterator\` and global registry symbols created with \`Symbol.for()\` are primitives of type \`"symbol"\`.`
  ]
];
