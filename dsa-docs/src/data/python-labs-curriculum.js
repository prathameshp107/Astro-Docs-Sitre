// ────────────────────────────────────────────────────
// Python Labs — Complete Curriculum Data
// 24 Lessons · 10 Code Challenges · 8 Projects · Bug Fixes
// ────────────────────────────────────────────────────

// ─── HELPERS ───

function testContains(pattern) {
  return (code) => code.includes(pattern);
}

function testRegex(regex) {
  return (code) => regex.test(code);
}

function stripComments(code) {
  return code
    .split("\n")
    .map((line) => line.replace(/#.*$/, ""))
    .join("\n");
}

function hasDeclaration(name, valueCheck) {
  return (code) => {
    const source = stripComments(code);
    const pattern = new RegExp(`(?:^|\\n)\\s*${name}\\s*=\\s*${valueCheck || ".*"}`, "m");
    return pattern.test(source);
  };
}

// ─── LESSONS ───

export const PYTHON_LESSONS = [
  // ═════════════════════════════════════════════════
  // BEGINNER
  // ═════════════════════════════════════════════════

  {
    id: "python-basics",
    chapter: 1,
    title: "Python Basics",
    level: "Beginner",
    tags: ["Python", "print", "comments", "syntax"],
    conceptExplanation: `Python is a high-level, interpreted programming language known for its readability and simplicity.

**Key Characteristics:**
• Python uses indentation (spaces/tabs) to define code blocks — no curly braces needed
• It's dynamically typed — no need to declare variable types
• Everything in Python is an object
• Python follows PEP 8 style guidelines

**Your First Python Program:**
\\\`\\\`\\\`python
print("Hello, World!")
\\\`\\\`\\\`

**Comments:**
\\\`\\\`\\\`python
# This is a single-line comment

"""
This is a
multi-line comment
"""
\\\`\\\`\\\``,
    keyRules: [
      "Use 4 spaces for indentation (never tabs)",
      "Python is case-sensitive — Name and name are different",
      "Use print() to display output to the console",
      "Comments start with # — use them to explain your code",
      "File names should be snake_case: my_program.py",
    ],
    task: `Write a Python program that:
1. Prints "Hello, World!" to the console
2. Prints your name on a new line
3. Prints your age
4. Adds a comment explaining what the program does`,
    starterCode: `# My first Python program

# TODO: Print "Hello, World!"

# TODO: Print your name

# TODO: Print your age
`,
    solutionCode: `# My first Python program — prints personal details
print("Hello, World!")
print("Prathamesh")
print(25)`,
    hint: `• Use print("text") to print strings
• Use print(number) to print numbers
• Comments start with #`,
    tests: [
      { name: "print() function used", validate: testContains("print(") },
      { name: "Comment present", validate: testContains("#") },
      { name: "String printed", validate: testContains('"') || testContains("'") },
      { name: "At least 3 print statements", validate: (c) => (c.match(/print/g) || []).length >= 3 },
    ],
  },

  {
    id: "variables-data-types",
    chapter: 2,
    title: "Variables & Data Types",
    level: "Beginner",
    tags: ["Variables", "int", "float", "str", "bool", "type()"],
    conceptExplanation: `Variables store data in memory. Python has several built-in data types.

**Creating Variables:**
\\\`\\\`\\\`python
name = "Alice"        # str — string
age = 25              # int — integer
height = 5.6          # float — decimal
is_student = True     # bool — boolean
\\\`\\\`\\\`

**Common Data Types:**
• str — Text: "Hello", 'World'
• int — Whole numbers: 42, -7, 0
• float — Decimal numbers: 3.14, -0.5
• bool — True or False
• NoneType — None (absence of value)

**Type Checking:**
\\\`\\\`\\\`python
type(variable)  # Returns the type
\\\`\\\`\\\``,
    keyRules: [
      "Use snake_case for variable names: my_variable",
      "Variable names must start with a letter or underscore",
      "Use type() to check a variable's data type",
      "Python is dynamically typed — a variable can change type",
      "None represents the absence of a value",
    ],
    task: `Create variables for:
1. A string variable called name with your name
2. An integer variable called age with your age
3. A float variable called height with your height
4. A boolean variable called is_student
5. Print each variable with a label
6. Print the type of each variable using type()`,
    starterCode: `# Create variables
name =  # TODO
age =  # TODO
height =  # TODO
is_student =  # TODO

# Print variables with labels
# Example: print("Name:", name)

# Print types
# Example: print(type(name))
`,
    solutionCode: `name = "Prathamesh"
age = 25
height = 5.9
is_student = True

print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Is Student:", is_student)

print("Type of name:", type(name))
print("Type of age:", type(age))
print("Type of height:", type(height))
print("Type of is_student:", type(is_student))`,
    hint: `• Strings use quotes: "text" or 'text'
• Integers don't need quotes: 25
• Floats have decimals: 5.9
• Booleans are True or False (capital T and F)
• Use type() to check data types`,
    tests: [
      { name: "String variable 'name' created", validate: testContains("name =") && (testContains('"') || testContains("'")) },
      { name: "Integer variable 'age' created", validate: testContains("age =") },
      { name: "Float variable 'height' created", validate: testContains("height =") },
      { name: "Boolean variable 'is_student' created", validate: testContains("is_student =") },
      { name: "type() function used", validate: testContains("type(") },
      { name: "All variables printed", validate: (c) => (c.match(/print/g) || []).length >= 8 },
    ],
  },

  {
    id: "operators",
    chapter: 3,
    title: "Operators",
    level: "Beginner",
    tags: ["Operators", "Arithmetic", "Comparison", "Assignment"],
    conceptExplanation: `Operators perform operations on variables and values.

**Arithmetic Operators:**
\\\`\\\`\\\`python
+  # Addition: 5 + 3 = 8
-  # Subtraction: 10 - 4 = 6
*  # Multiplication: 3 * 4 = 12
/  # Division: 15 / 3 = 5.0 (returns float)
// # Floor division: 17 // 5 = 3
%  # Modulus: 17 % 5 = 2
** # Exponentiation: 2 ** 3 = 8
\\\`\\\`\\\`

**Comparison Operators:**
\\\`\\\`\\\`python
==  # Equal to
!=  # Not equal to
>   # Greater than
<   # Less than
>=  # Greater than or equal to
<=  # Less than or equal to
\\\`\\\`\\\`

**Assignment Operators:**
\\\`\\\`\\\`python
=   # Assign
+=  # Add and assign: x += 5 is x = x + 5
-=  # Subtract and assign
*=  # Multiply and assign
/=  # Divide and assign
\\\`\\\`\\\``,
    keyRules: [
      "Division (/) always returns a float",
      "Use // for integer (floor) division",
      "Use == to compare, = to assign",
      "Exponentiation is ** not ^ (^ is bitwise XOR)",
      "Python follows PEMDAS order of operations",
    ],
    task: `Write a program that:
1. Creates two numbers a=15 and b=4
2. Prints the result of each arithmetic operation
3. Prints whether a is greater than b
4. Uses compound assignment (+=) to add b to a
5. Prints the updated value of a`,
    starterCode: `a = 15
b = 4

# Arithmetic operations
# TODO: print a + b, a - b, a * b, a / b, a // b, a % b, a ** b

# Comparison
# TODO: print whether a > b

# Compound assignment
# TODO: use += to add b to a, then print a
`,
    solutionCode: `a = 15
b = 4

print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("a / b =", a / b)
print("a // b =", a // b)
print("a % b =", a % b)
print("a ** b =", a ** b)

print("a > b:", a > b)

a += b
print("After a += b:", a)`,
    hint: `• a + b for addition
• a ** b for exponentiation (a to the power b)
• a > b returns True or False
• a += b is same as a = a + b`,
    tests: [
      { name: "Arithmetic operators used", validate: (c) => testContains("+") && testContains("-") && testContains("*") },
      { name: "Comparison operator used", validate: testContains(">") || testContains("<") },
      { name: "Compound assignment used", validate: testContains("+=") || testContains("-=") },
      { name: "Results printed", validate: (c) => (c.match(/print/g) || []).length >= 5 },
    ],
  },

  {
    id: "conditionals",
    chapter: 4,
    title: "Conditional Statements",
    level: "Beginner",
    tags: ["if", "elif", "else", "conditionals"],
    conceptExplanation: `Conditionals let your code make decisions based on conditions.

**if/elif/else:**
\\\`\\\`\\\`python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
\\\`\\\`\\\`

**Logical Operators:**
\\\`\\\`\\\`python
and  # Both conditions must be True
or   # At least one condition must be True
not  # Inverts the condition
\\\`\\\`\\\`

**Ternary Operator:**
\\\`\\\`\\\`python
status = "Adult" if age >= 18 else "Minor"
\\\`\\\`\\\``,
    keyRules: [
      "Use : after if, elif, and else",
      "Indent the code inside each block by 4 spaces",
      "Use elif (not else if) for multiple conditions",
      "The condition doesn't need parentheses (but you can use them)",
      "Use pass as a placeholder for empty code blocks",
    ],
    task: `Write a program that:
1. Creates a variable score with a number
2. Uses if/elif/else to print grades: A (≥90), B (≥80), C (≥70), D (≥60), F (<60)
3. Uses a ternary to determine pass/fail (≥60 passes)
4. Uses and/or to combine conditions`,
    starterCode: `score = 85

# if/elif/else for grades
# TODO

# Ternary for pass/fail
# result =  # TODO
# print("Result:", result)

# Logical operators
# has_passed =  # TODO use and
# print("Has passed:", has_passed)
`,
    solutionCode: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
print("Grade:", grade)

result = "Pass" if score >= 60 else "Fail"
print("Result:", result)

has_passed = score >= 60 and score <= 100
print("Has passed:", has_passed)

is_perfect = score == 100 or grade == "A"
print("Is perfect:", is_perfect)`,
    hint: `• if condition: — don't forget the colon
• elif condition: — for additional conditions
• else: — catches everything else
• Ternary: value_if_true if condition else value_if_false`,
    tests: [
      { name: "if/elif/else chain used", validate: testContains("elif") },
      { name: "Ternary expression used", validate: testContains("if") && testContains("else") },
      { name: "and operator used", validate: testContains("and") },
      { name: "or operator used", validate: testContains("or") },
      { name: "Results printed", validate: (c) => (c.match(/print/g) || []).length >= 3 },
    ],
  },

  {
    id: "loops",
    chapter: 5,
    title: "Loops",
    level: "Beginner",
    tags: ["for", "while", "range", "iteration"],
    conceptExplanation: `Loops let you repeat code multiple times.

**For Loop:**
\\\`\\\`\\\`python
# With range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# With range(start, stop)
for i in range(2, 7):
    print(i)  # 2, 3, 4, 5, 6

# With range(start, stop, step)
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\\\`\\\`\\\`

**While Loop:**
\\\`\\\`\\\`python
count = 0
while count < 5:
    print(count)
    count += 1
\\\`\\\`\\\`

**Loop Control:**
\\\`\\\`\\\`python
break    # Exit the loop
continue # Skip to next iteration
\\\`\\\`\\\``,
    keyRules: [
      "range(n) generates 0 to n-1",
      "range(start, stop) generates start to stop-1",
      "Always increment counters in while loops to avoid infinite loops",
      "Use break to exit early, continue to skip",
      "for loops can iterate directly over strings, lists, tuples, etc.",
    ],
    task: `Write a program that:
1. Creates a list of 5 numbers
2. Uses a for loop to print each number multiplied by 2
3. Uses a while loop to print numbers 1 to 5
4. Uses a for loop with range to calculate sum of 1 to 10
5. Prints all results`,
    starterCode: `numbers = [10, 20, 30, 40, 50]

# 1. For loop - each number * 2
print("Doubled:")
# TODO

# 2. While loop - numbers 1 to 5
print("Count:")
# TODO

# 3. Sum using for loop with range
total = 0
# TODO
print("Sum of 1 to 10:", total)
`,
    solutionCode: `numbers = [10, 20, 30, 40, 50]

print("Doubled:")
for n in numbers:
    print(n * 2)

print("Count:")
i = 1
while i <= 5:
    print(i)
    i += 1

total = 0
for i in range(1, 11):
    total += i
print("Sum of 1 to 10:", total)`,
    hint: `• for item in list: iterates over items
• while condition: loops until condition is False
• range(1, 11) generates 1, 2, 3, ..., 10
• Don't forget to update counters in while loops`,
    tests: [
      { name: "for loop used to iterate", validate: testContains("for ") && testContains(" in ") },
      { name: "while loop used", validate: testContains("while") },
      { name: "range() used", validate: testContains("range(") },
      { name: "Results printed", validate: (c) => (c.match(/print/g) || []).length >= 3 },
    ],
  },

  {
    id: "functions",
    chapter: 6,
    title: "Functions",
    level: "Beginner",
    tags: ["Functions", "def", "return", "parameters"],
    conceptExplanation: `Functions are reusable blocks of code that perform a specific task.

**Defining Functions:**
\\\`\\\`\\\`python
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    result = a + b
    return result
\\\`\\\`\\\`

**Default Parameters:**
\\\`\\\`\\\`python
def greet(name="Guest"):
    return f"Hello, {name}!"
\\\`\\\`\\\`

**Multiple Returns:**
\\\`\\\`\\\`python
def get_min_max(numbers):
    return min(numbers), max(numbers)

low, high = get_min_max([3, 1, 4, 1, 5])
\\\`\\\`\\\`

**Lambda Functions:**
\\\`\\\`\\\`python
square = lambda x: x ** 2
add = lambda a, b: a + b
\\\`\\\`\\\``,
    keyRules: [
      "Use def to define a function",
      "Functions without return return None",
      "Parameters are the inputs; arguments are the values passed",
      "Use docstrings (\"\"\") to document what a function does",
      "Lambda functions are anonymous single-expression functions",
    ],
    task: `Write functions that:
1. Define add(a, b) that returns the sum
2. Define is_even(n) that returns True if n is even
3. Define greet(name) with a default parameter "Guest"
4. Call all functions and print results`,
    starterCode: `# 1. Add function
def add(a, b):
    # TODO: return a + b
    pass

# 2. Even check function
def is_even(n):
    # TODO: return True if n is even
    pass

# 3. Greet function with default
def greet(name="Guest"):
    # TODO: return f"Hello, {name}!"
    pass

# Test the functions
print("add(3, 7):", add(3, 7))
print("is_even(5):", is_even(5))
print("is_even(10):", is_even(10))
print("greet('Alice'):", greet("Alice"))
print("greet():", greet())
`,
    solutionCode: `def add(a, b):
    return a + b

def is_even(n):
    return n % 2 == 0

def greet(name="Guest"):
    return f"Hello, {name}!"

print("add(3, 7):", add(3, 7))
print("is_even(5):", is_even(5))
print("is_even(10):", is_even(10))
print("greet('Alice'):", greet("Alice"))
print("greet():", greet())`,
    hint: `• def function_name(params): defines a function
• return sends back a value
• Default: def func(param=default):
• f-strings: f"Hello, {name}!"`,
    tests: [
      { name: "Function 'add' defined", validate: testContains("def add") },
      { name: "Function 'is_even' defined", validate: testContains("def is_even") },
      { name: "Function 'greet' with default param", validate: testContains("def greet") && testContains("=") },
      { name: "return used in functions", validate: (c) => (c.match(/return/g) || []).length >= 3 },
    ],
  },

  {
    id: "lists",
    chapter: 7,
    title: "Lists",
    level: "Beginner",
    tags: ["Lists", "append", "insert", "remove", "indexing"],
    conceptExplanation: `Lists store ordered collections of items. They are mutable (can be changed after creation).

**Creating Lists:**
\\\`\\\`\\\`python
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]
empty = []
\\\`\\\`\\\`

**Accessing Items:**
\\\`\\\`\\\`python
fruits[0]    # "apple" (first item)
fruits[-1]   # "cherry" (last item)
fruits[1:3]  # ["banana", "cherry"] (slicing)
\\\`\\\`\\\`

**Common Methods:**
\\\`\\\`\\\`python
fruits.append("orange")   # Add to end
fruits.insert(1, "mango") # Add at index
fruits.remove("banana")   # Remove by value
popped = fruits.pop()     # Remove and return last
fruits.sort()             # Sort in place
len(fruits)               # Get length
\\\`\\\`\\\``,
    keyRules: [
      "Lists are indexed starting from 0",
      "Negative indexing starts from the end (-1 is last)",
      "Lists are mutable — you can change items after creation",
      "Slicing returns a new list: list[start:stop:step]",
      "Use list() to convert other types to lists",
    ],
    task: `Write a program that:
1. Creates a list called colors with 4 colors
2. Adds two colors with append()
3. Removes a color with remove()
4. Inserts a color at index 1
5. Prints the final list, its length, and sorted version`,
    starterCode: `# 1. Create list
colors = ["red", "blue", "green", "yellow"]

# 2. Add colors with append
# TODO

# 3. Remove a color
# TODO

# 4. Insert at index 1
# TODO

# 5. Print results
print("Final list:", colors)
print("Length:", len(colors))
print("Sorted:", sorted(colors))
`,
    solutionCode: `colors = ["red", "blue", "green", "yellow"]

colors.append("purple")
colors.append("orange")
print("After append:", colors)

colors.remove("yellow")
print("After remove:", colors)

colors.insert(1, "pink")
print("After insert:", colors)

print("Final list:", colors)
print("Length:", len(colors))
print("Sorted:", sorted(colors))`,
    hint: `• list.append(item) — adds to end
• list.remove(item) — removes first occurrence
• list.insert(index, item) — inserts at position
• len(list) — gets length
• sorted(list) — returns new sorted list`,
    tests: [
      { name: "append() method used", validate: testContains(".append(") },
      { name: "remove() method used", validate: testContains(".remove(") },
      { name: "insert() method used", validate: testContains(".insert(") },
      { name: "len() function used", validate: testContains("len(") },
      { name: "sorted() function used", validate: testContains("sorted(") },
    ],
  },

  {
    id: "tuples-sets",
    chapter: 8,
    title: "Tuples & Sets",
    level: "Beginner",
    tags: ["Tuples", "Sets", "immutable", "unordered"],
    conceptExplanation: `Tuples and sets are additional collection types in Python.

**Tuples** — Ordered, immutable collections:
\\\`\\\`\\\`python
point = (3, 4)
colors = ("red", "green", "blue")
single = (1,)  # Note the trailing comma!

# Tuple unpacking
x, y = point
print(x)  # 3
\\\`\\\`\\\`

**Sets** — Unordered collections of unique items:
\\\`\\\`\\\`python
unique = {1, 2, 3, 3, 2}
print(unique)  # {1, 2, 3}

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)  # Union: {1, 2, 3, 4, 5}
print(a & b)  # Intersection: {3}
print(a - b)  # Difference: {1, 2}
\\\`\\\`\\\`

**When to use:**
• Tuple for coordinates, records, function returns (immutable)
• Set for removing duplicates, membership testing, math operations`,
    keyRules: [
      "Tuples are immutable — cannot change after creation",
      "Sets automatically remove duplicates",
      "Sets are unordered — you can't index into them",
      "Use tuples for data that shouldn't change",
      "Use sets when you need unique items or set operations",
    ],
    task: `Write a program that:
1. Creates a tuple coordinates with (x, y)
2. Unpacks the tuple into variables and prints them
3. Creates a set from a list with duplicates
4. Performs union and intersection on two sets
5. Prints all results`,
    starterCode: `# 1. Create a tuple
coordinates = (10, 20)

# 2. Unpack tuple
# TODO

# 3. Set from list with duplicates
numbers = [1, 2, 2, 3, 3, 3, 4, 5]
unique_numbers =  # TODO
print("Unique numbers:", unique_numbers)

# 4. Set operations
set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}
# TODO: union
# TODO: intersection
# TODO: difference

print("Union:")
print("Intersection:")
print("Difference:")
`,
    solutionCode: `coordinates = (10, 20)

x, y = coordinates
print("x:", x, "y:", y)

numbers = [1, 2, 2, 3, 3, 3, 4, 5]
unique_numbers = set(numbers)
print("Unique numbers:", unique_numbers)

set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}

print("Union:", set_a | set_b)
print("Intersection:", set_a & set_b)
print("Difference:", set_a - set_b)`,
    hint: `• Tuple: (item1, item2)
• Unpack: var1, var2 = tuple
• set(list) converts list to set
• | for union, & for intersection, - for difference`,
    tests: [
      { name: "Tuple created", validate: testContains("(") && testContains(")") },
      { name: "Tuple unpacking used", validate: testContains(",") && testContains("=") },
      { name: "set() conversion used", validate: testContains("set(") },
      { name: "Set operations used", validate: testContains("|") || testContains("&") || testContains("-") },
    ],
  },

  {
    id: "dictionaries",
    chapter: 9,
    title: "Dictionaries",
    level: "Beginner",
    tags: ["dict", "keys", "values", "items", "get"],
    conceptExplanation: `Dictionaries store key-value pairs for fast data lookup.

**Creating Dictionaries:**
\\\`\\\`\\\`python
student = {
    "name": "Alice",
    "age": 25,
    "grades": [90, 85, 88]
}
\\\`\\\`\\\`

**Accessing and Modifying:**
\\\`\\\`\\\`python
student["name"]        # "Alice"
student.get("age")     # 25 (safe access)
student["city"] = "NYC"  # Add new key
student["age"] = 26      # Update value
del student["grades"]    # Delete key
\\\`\\\`\\\`

**Dictionary Methods:**
\\\`\\\`\\\`python
student.keys()    # All keys
student.values()  # All values
student.items()   # All (key, value) pairs

for key, value in student.items():
    print(f"{key}: {value}")
\\\`\\\`\\\``,
    keyRules: [
      "Keys must be immutable (strings, numbers, tuples)",
      "Values can be any type (lists, dicts, objects)",
      "Use get() for safe access — returns None if key missing",
      "Dictionaries are mutable — add/update/delete freely",
      "Dictionaries maintain insertion order (Python 3.7+)",
    ],
    task: `Write a program that:
1. Creates a dictionary person with name, age, city
2. Adds a new key 'job' after creation
3. Updates the age
4. Prints all keys and values using .keys() and .values()
5. Iterates over items with a for loop`,
    starterCode: `# 1. Create dictionary
person = {
    "name": "Alice",
    "age": 30,
    "city": "Mumbai"
}

# 2. Add new key
# TODO

# 3. Update age
# TODO

# 4. Print keys and values
print("Keys:")
print("Values:")

# 5. Iterate over items
print("\\nPerson details:")
# TODO
`,
    solutionCode: `person = {
    "name": "Alice",
    "age": 30,
    "city": "Mumbai"
}

person["job"] = "Engineer"
person["age"] = 31

print("Keys:", list(person.keys()))
print("Values:", list(person.values()))

print("\nPerson details:")
for key, value in person.items():
    print(f"{key}: {value}")`,
    hint: `• dict["key"] = value — add or update
• dict.keys() — get all keys
• dict.values() — get all values
• dict.items() — get key-value pairs
• for k, v in dict.items(): iterates through all`,
    tests: [
      { name: "Dictionary created with data", validate: testContains("person") && testContains(":") },
      { name: "New key added after creation", validate: testContains("person[") || testContains('person["') || testContains("person['") },
      { name: ".keys() method used", validate: testContains(".keys(") },
      { name: ".values() method used", validate: testContains(".values(") },
      { name: ".items() iteration used", validate: testContains(".items(") },
    ],
  },

  {
    id: "string-manipulation",
    chapter: 10,
    title: "String Manipulation",
    level: "Beginner",
    tags: ["Strings", "split", "join", "upper", "lower", "strip", "f-strings"],
    conceptExplanation: `Python has powerful string manipulation capabilities.

**String Methods:**
\\\`\\\`\\\`python
text = "  Hello, Python World!  "

text.lower()          # "  hello, python world!  "
text.upper()          # "  HELLO, PYTHON WORLD!  "
text.strip()          # "Hello, Python World!"
text.replace("World", "Python")  # "Hello, Python Python!"
text.split(",")       # ["  Hello", " Python World!  "]
", ".join(["a", "b", "c"])  # "a, b, c"
text.startswith("Hello")  # True
text.count("o")       # 3
text.find("Python")   # 10
\\\`\\\`\\\`

**f-strings (Formatted Strings):**
\\\`\\\`\\\`python
name = "Alice"
age = 25
print(f"My name is {name} and I'm {age} years old.")
print(f"Next year I'll be {age + 1}.")
\\\`\\\`\\\``,
    keyRules: [
      "Strings are immutable — methods return new strings",
      "Use f-strings for string formatting (Python 3.6+)",
      "strip() removes whitespace from both ends",
      "split() returns a list, join() combines a list into a string",
      "Use in to check if a substring exists: 'Py' in 'Python'",
    ],
    task: `Write a program that:
1. Creates a string with leading/trailing spaces
2. Strips the string and converts to uppercase
3. Splits the string into words
4. Replaces a word with another
5. Uses f-strings to format output`,
    starterCode: `text = "  hello, python learner!  "

# 1. Strip whitespace
cleaned =  # TODO
print("Cleaned:", cleaned)

# 2. Uppercase
upper_text =  # TODO
print("Uppercase:", upper_text)

# 3. Split into words
words =  # TODO
print("Words:", words)

# 4. Replace word
replaced =  # TODO
print("Replaced:", replaced)

# 5. f-string
name = "Python"
version = 3
print()  # TODO: f-string with name and version
`,
    solutionCode: `text = "  hello, python learner!  "

cleaned = text.strip()
print("Cleaned:", cleaned)

upper_text = cleaned.upper()
print("Uppercase:", upper_text)

words = cleaned.split()
print("Words:", words)

replaced = cleaned.replace("python", "Python")
print("Replaced:", replaced)

name = "Python"
version = 3
print(f"I'm learning {name} {version}.x!")`,
    hint: `• .strip() — removes whitespace
• .upper() — converts to uppercase
• .split() — splits on whitespace (returns list)
• .replace(old, new) — replaces substrings
• f"text {variable}" — formatted strings`,
    tests: [
      { name: "strip() method used", validate: testContains(".strip(") },
      { name: "upper() or lower() used", validate: testContains(".upper(") || testContains(".lower(") },
      { name: "split() method used", validate: testContains(".split(") },
      { name: "replace() method used", validate: testContains(".replace(") },
      { name: "f-string used", validate: testContains("f\"") || testContains("f'") },
    ],
  },

  // ═════════════════════════════════════════════════
  // INTERMEDIATE
  // ═════════════════════════════════════════════════

  {
    id: "list-comprehensions",
    chapter: 11,
    title: "List Comprehensions",
    level: "Intermediate",
    tags: ["Comprehensions", "list", "dict", "set", "filter"],
    conceptExplanation: `Comprehensions provide a concise way to create collections.

**List Comprehension:**
\\\`\\\`\\\`python
# Traditional
squares = []
for i in range(10):
    squares.append(i ** 2)

# Comprehension (one line!)
squares = [i ** 2 for i in range(10)]
\\\`\\\`\\\`

**With Condition:**
\\\`\\\`\\\`python
evens = [x for x in range(20) if x % 2 == 0]
\\\`\\\`\\\`

**Dictionary Comprehension:**
\\\`\\\`\\\`python
square_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
\\\`\\\`\\\`

**Set Comprehension:**
\\\`\\\`\\\`python
unique_lengths = {len(word) for word in words}
\\\`\\\`\\\`

**Nested Comprehension:**
\\\`\\\`\\\`python
matrix = [[i * j for j in range(3)] for i in range(3)]
\\\`\\\`\\\``,
    keyRules: [
      "List comprehension: [expr for item in iterable]",
      "Add condition: [expr for item in iterable if condition]",
      "Don't overuse — if it spans multiple lines, use a regular loop",
      "Dictionary comprehension: {key: value for item in iterable}",
      "Comprehensions are generally faster than manual loops",
    ],
    task: `Write a program that:
1. Creates a list of squares using list comprehension (1 to 10)
2. Creates a list of even numbers from 0 to 20 using comprehension with filter
3. Creates a dictionary mapping numbers to their cubes using dict comprehension
4. Creates a set of string lengths using set comprehension
5. Prints all results`,
    starterCode: `# 1. Squares list comprehension
squares =  # TODO: [x**2 for x in range(1, 11)]
print("Squares:", squares)

# 2. Even numbers with filter
evens =  # TODO
print("Evens:", evens)

# 3. Dict comprehension - numbers to cubes
cubes =  # TODO: {x: x**3 for x in range(1, 6)}
print("Cubes dict:", cubes)

# 4. Set comprehension - string lengths
words = ["hello", "world", "python", "is", "great"]
lengths =  # TODO
print("Word lengths:", lengths)
`,
    solutionCode: `squares = [x**2 for x in range(1, 11)]
print("Squares:", squares)

evens = [x for x in range(21) if x % 2 == 0]
print("Evens:", evens)

cubes = {x: x**3 for x in range(1, 6)}
print("Cubes dict:", cubes)

words = ["hello", "world", "python", "is", "great"]
lengths = {len(w) for w in words}
print("Word lengths:", lengths)`,
    hint: `• [expr for item in iterable] — basic list comprehension
• [expr for item in iterable if cond] — with filter
• {key: val for item in iterable} — dict comprehension
• {expr for item in iterable} — set comprehension`,
    tests: [
      { name: "List comprehension used", validate: (c) => c.includes("[") && c.includes("for ") && c.includes(" in ") && c.includes("]") },
      { name: "Comprehension with if condition", validate: testContains("if") && testContains("for") },
      { name: "Dict comprehension used", validate: testContains(":") && testContains("for") },
      { name: "Results printed", validate: (c) => (c.match(/print/g) || []).length >= 4 },
    ],
  },

  {
    id: "file-handling",
    chapter: 12,
    title: "File Handling",
    level: "Intermediate",
    tags: ["Files", "open", "read", "write", "with"],
    conceptExplanation: `File handling allows reading from and writing to files.

**Opening Files:**
\\\`\\\`\\\`python
file = open("data.txt", "r")  # Read mode
content = file.read()
file.close()
\\\`\\\`\\\`

**Using 'with' (recommended — auto-closes):**
\\\`\\\`\\\`python
with open("data.txt", "r") as file:
    content = file.read()
    # File auto-closes after the block
\\\`\\\`\\\`

**File Modes:**
\\\`\\\`\\\`python
"r"  # Read (default)
"w"  # Write (overwrites)
"a"  # Append
"r+" # Read and write
"b"  # Binary mode (rb, wb)
\\\`\\\`\\\`

**Reading Methods:**
\\\`\\\`\\\`python
file.read()        # Entire file as string
file.readline()    # One line
file.readlines()   # List of lines
\\\`\\\`\\\`

**Writing:**
\\\`\\\`\\\`python
file.write("Hello\\n")
file.writelines(["line1\\n", "line2\\n"])
\\\`\\\`\\\``,
    keyRules: [
      "Always use 'with' to auto-close files",
      "Use 'w' mode carefully — it overwrites existing files",
      "Check if file exists before reading (use os.path.exists or try/except)",
      "Use encoding='utf-8' for text files with special characters",
      "Close files when done — especially in 'w' mode",
    ],
    task: `For this console lesson, simulate file handling by:
1. Creating a dictionary representing a file (content as string)
2. Writing a function read_file(data) that returns the content
3. Writing a function write_file(data, content) that replaces the content
4. Writing a function append_file(data, content) that adds to the content
5. Testing all functions`,
    starterCode: `# Simulate file operations with a dictionary
file_system = {}

def read_file(filename):
    # TODO: return content if filename exists, else "File not found"
    pass

def write_file(filename, content):
    # TODO: store content in file_system[filename]
    pass

def append_file(filename, content):
    # TODO: add content to existing content
    pass

# Test
write_file("notes.txt", "Hello, this is my first file!\\n")
print("After write:", read_file("notes.txt"))

append_file("notes.txt", "This is appended text.\\n")
print("After append:", read_file("notes.txt"))

write_file("notes.txt", "Overwritten content.\\n")
print("After overwrite:", read_file("notes.txt"))
`,
    solutionCode: `file_system = {}

def read_file(filename):
    return file_system.get(filename, "File not found")

def write_file(filename, content):
    file_system[filename] = content

def append_file(filename, content):
    if filename in file_system:
        file_system[filename] += content
    else:
        file_system[filename] = content

write_file("notes.txt", "Hello, this is my first file!\n")
print("After write:", read_file("notes.txt"))

append_file("notes.txt", "This is appended text.\n")
print("After append:", read_file("notes.txt"))

write_file("notes.txt", "Overwritten content.\n")
print("After overwrite:", read_file("notes.txt"))`,
    hint: `• read: return file_system.get(filename, default)
• write: file_system[filename] = content
• append: file_system[filename] += content
• Check if key exists: if filename in file_system:`,
    tests: [
      { name: "read_file function defined", validate: testContains("def read_file") },
      { name: "write_file function defined", validate: testContains("def write_file") },
      { name: "append_file function defined", validate: testContains("def append_file") },
      { name: "All functions tested with print", validate: (c) => (c.match(/print/g) || []).length >= 3 },
    ],
  },

  {
    id: "exception-handling",
    chapter: 13,
    title: "Exception Handling",
    level: "Intermediate",
    tags: ["try", "except", "finally", "raise", "errors"],
    conceptExplanation: `Exception handling makes your code robust by gracefully handling errors.

**Basic try/except:**
\\\`\\\`\\\`python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(result)
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Can't divide by zero!")
else:
    print("No errors occurred!")
finally:
    print("This always runs.")
\\\`\\\`\\\`

**Common Exception Types:**
• ValueError — Wrong value type
• TypeError — Operation on wrong type
• ZeroDivisionError — Division by zero
• FileNotFoundError — File doesn't exist
• KeyError — Dictionary key not found
• IndexError — List index out of range

**Raising Exceptions:**
\\\`\\\`\\\`python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
\\\`\\\`\\\``,
    keyRules: [
      "Always catch specific exceptions, not bare except:",
      "Use else for code that runs when no exception occurs",
      "Use finally for cleanup (closing files, releasing resources)",
      "Raise exceptions with meaningful error messages",
      "Don't suppress exceptions you can't handle — let them propagate",
    ],
    task: `Write a program that:
1. Creates a safe_divide(a, b) function that handles ZeroDivisionError
2. Creates a get_element(lst, index) that handles IndexError
3. Creates a convert_int(value) that handles ValueError
4. Uses try/except/else/finally in each function
5. Tests all functions with both valid and invalid inputs`,
    starterCode: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"
    else:
        return result
    finally:
        print(f"  safe_divide({a}, {b}) completed")

def get_element(lst, index):
    # TODO: handle IndexError
    pass

def convert_int(value):
    # TODO: handle ValueError
    pass

# Test
print("safe_divide(10, 2):", safe_divide(10, 2))
print("safe_divide(10, 0):", safe_divide(10, 0))
print()
print("get_element([1,2,3], 1):", get_element([1, 2, 3], 1))
print("get_element([1,2,3], 10):", get_element([1, 2, 3], 10))
print()
print("convert_int('42'):", convert_int("42"))
print("convert_int('hello'):", convert_int("hello"))
`,
    solutionCode: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"
    else:
        return result
    finally:
        print(f"  safe_divide({a}, {b}) completed")

def get_element(lst, index):
    try:
        return lst[index]
    except IndexError:
        return f"Error: Index {index} out of range"
    finally:
        print(f"  get_element(len={len(lst)}, idx={index}) completed")

def convert_int(value):
    try:
        return int(value)
    except ValueError:
        return f"Error: Cannot convert '{value}' to integer"
    finally:
        print(f"  convert_int('{value}') completed")

print("safe_divide(10, 2):", safe_divide(10, 2))
print()
print("safe_divide(10, 0):", safe_divide(10, 0))
print()
print("get_element([1,2,3], 1):", get_element([1, 2, 3], 1))
print()
print("get_element([1,2,3], 10):", get_element([1, 2, 3], 10))
print()
print("convert_int('42'):", convert_int("42"))
print()
print("convert_int('hello'):", convert_int("hello"))`,
    hint: `• try: — code that might raise an exception
• except ErrorType: — handle specific error
• else: — runs if no exception occurred
• finally: — always runs (cleanup)
• raise ErrorType("message") — throw an error`,
    tests: [
      { name: "Try/except used", validate: testContains("try:") && testContains("except") },
      { name: "ZeroDivisionError handled", validate: testContains("ZeroDivisionError") },
      { name: "IndexError handled", validate: testContains("IndexError") },
      { name: "ValueError handled", validate: testContains("ValueError") },
      { name: "finally block used", validate: testContains("finally:") },
    ],
  },

  {
    id: "modules-packages",
    chapter: 14,
    title: "Modules & Packages",
    level: "Intermediate",
    tags: ["import", "from", "as", "modules", "packages"],
    conceptExplanation: `Modules let you organize code into separate files for reusability.

**Importing Modules:**
\\\`\\\`\\\`python
import math
print(math.sqrt(16))  # 4.0

from math import pi, sqrt
print(pi)             # 3.14159...

from math import *   # Import everything (not recommended)

import math as m     # Alias
print(m.cos(0))      # 1.0
\\\`\\\`\\\`

**Common Standard Library Modules:**
• math — Mathematical functions
• random — Random number generation
• datetime — Date and time handling
• os — Operating system interface
• json — JSON parsing
• re — Regular expressions
• collections — Specialized containers
• itertools — Iterator tools

**Creating a Module:**
\\\`\\\`\\\`python
# my_module.py
def greet(name):
    return f"Hello, {name}!"

# main.py
import my_module
print(my_module.greet("Alice"))
\\\`\\\`\\\``,
    keyRules: [
      "Import specific functions with 'from module import func'",
      "Use aliases for modules with long names: import numpy as np",
      "Avoid 'from module import *' — pollutes namespace",
      "Put all imports at the top of the file",
      "__name__ == '__main__' lets a file run as script or module",
    ],
    task: `For this single-file lesson, simulate modules by:
1. Creating a dictionary math_ops with math functions (sqrt, sin, cos)
2. Creating a dict string_ops with string utilities (reverse, count_vowels)
3. Importing (destructuring) specific functions
4. Using functions from both "modules"
5. Printing all results`,
    starterCode: `# Module 1: Math operations
math_ops = {
    "square": lambda x: x ** 2,
    "cube": lambda x: x ** 3,
    "sqrt": lambda x: x ** 0.5,
    "hypotenuse": lambda a, b: (a**2 + b**2) ** 0.5,
}

# Module 2: String operations
string_ops = {
    "reverse": lambda s: s[::-1],
    "count_chars": lambda s: len(s),
    "upper": lambda s: s.upper(),
}

# TODO: "Import" functions by destructuring
# Example: square = math_ops["square"]

# Test
print(f"square(5) = {square(5)}")
print(f"cube(3) = {cube(3)}")
print(f"sqrt(25) = {sqrt(25)}")
print(f"hypotenuse(3, 4) = {hypotenuse(3, 4)}")
print(f"reverse('Python') = {reverse('Python')}")
print(f"count_chars('Hello') = {count_chars('Hello')}")
`,
    solutionCode: `math_ops = {
    "square": lambda x: x ** 2,
    "cube": lambda x: x ** 3,
    "sqrt": lambda x: x ** 0.5,
    "hypotenuse": lambda a, b: (a**2 + b**2) ** 0.5,
}

string_ops = {
    "reverse": lambda s: s[::-1],
    "count_chars": lambda s: len(s),
    "upper": lambda s: s.upper(),
}

square = math_ops["square"]
cube = math_ops["cube"]
sqrt = math_ops["sqrt"]
hypotenuse = math_ops["hypotenuse"]
reverse = string_ops["reverse"]
count_chars = string_ops["count_chars"]

print(f"square(5) = {square(5)}")
print(f"cube(3) = {cube(3)}")
print(f"sqrt(25) = {sqrt(25)}")
print(f"hypotenuse(3, 4) = {hypotenuse(3, 4)}")
print(f"reverse('Python') = {reverse('Python')}")
print(f"count_chars('Hello') = {count_chars('Hello')}")`,
    hint: `• Destructure: func_name = module["func_name"]
• This simulates: from module import func_name
• Lambda: lambda params: expression
• [::-1] reverses a string`,
    tests: [
      { name: "math_ops module created", validate: testContains("math_ops") && testContains(":") },
      { name: "string_ops module created", validate: testContains("string_ops") && testContains(":") },
      { name: "Functions extracted from modules", validate: testContains("= math_ops[") || testContains("= string_ops[") },
      { name: "All functions called and printed", validate: (c) => (c.match(/print/g) || []).length >= 6 },
    ],
  },

  {
    id: "oop-basics",
    chapter: 15,
    title: "OOP in Python",
    level: "Intermediate",
    tags: ["Class", "Object", "__init__", "self", "methods"],
    conceptExplanation: `Object-Oriented Programming organizes code around objects and classes.

**Defining a Class:**
\\\`\\\`\\\`python
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"

    # Constructor
    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age

    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"

    # Method with __str__ for string representation
    def __str__(self):
        return f"{self.name} ({self.age} years old)"
\\\`\\\`\\\`

**Creating Objects:**
\\\`\\\`\\\`python
dog1 = Dog("Buddy", 3)
dog2 = Dog("Lucy", 5)

print(dog1.bark())     # "Buddy says Woof!"
print(dog2)            # "Lucy (5 years old)"
print(dog1.species)    # "Canis familiaris"
\\\`\\\`\\\``,
    keyRules: [
      "self refers to the current instance (like 'this' in other languages)",
      "__init__ is the constructor — called when creating new objects",
      "Instance attributes are unique to each object",
      "Class attributes are shared across all instances",
      "Use __str__ to define how print() displays the object",
    ],
    task: `Write a program that:
1. Defines a Book class with title, author, year
2. Has a method get_info() that returns a formatted string
3. Has a method is_old() that returns True if book is older than 50 years
4. Creates 2-3 book objects
5. Calls methods and prints results`,
    starterCode: `class Book:
    def __init__(self, title, author, year):
        # TODO: store attributes
        pass

    def get_info(self):
        # TODO: return f"{title} by {author} ({year})"
        pass

    def is_old(self, current_year=2026):
        # TODO: return True if book is over 50 years old
        pass

# Create books
book1 = Book("1984", "George Orwell", 1949)
book2 = Book("The Catcher in the Rye", "J.D. Salinger", 1951)
book3 = Book("Python Basics", "Prathamesh", 2024)

# Test methods
# TODO: print book info
# TODO: print which books are old
`,
    solutionCode: `class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

    def get_info(self):
        return f"{self.title} by {self.author} ({self.year})"

    def is_old(self, current_year=2026):
        return current_year - self.year > 50

book1 = Book("1984", "George Orwell", 1949)
book2 = Book("The Catcher in the Rye", "J.D. Salinger", 1951)
book3 = Book("Python Basics", "Prathamesh", 2024)

print(book1.get_info())
print(book2.get_info())
print(book3.get_info())

print(f"\nIs '{book1.title}' old? {book1.is_old()}")
print(f"Is '{book3.title}' old? {book3.is_old()}")`,
    hint: `• class ClassName: defines a class
• def __init__(self, params): constructor
• self.attr = value creates instance attributes
• self is always the first parameter of instance methods`,
    tests: [
      { name: "Class defined with __init__", validate: testContains("class ") && testContains("__init__") },
      { name: "self used to store attributes", validate: (c) => (c.match(/self\./g) || []).length >= 3 },
      { name: "get_info method defined", validate: testContains("def get_info") },
      { name: "is_old method defined", validate: testContains("def is_old") },
      { name: "Objects created and methods called", validate: testContains("Book(") },
    ],
  },

  {
    id: "inheritance-polymorphism",
    chapter: 16,
    title: "Inheritance & Polymorphism",
    level: "Intermediate",
    tags: ["Inheritance", "super()", "override", "polymorphism"],
    conceptExplanation: `Inheritance allows a class to reuse code from a parent class.

**Basic Inheritance:**
\\\`\\\`\\\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"
\\\`\\\`\\\`

**Using super():**
\\\`\\\`\\\`python
class Vehicle:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

class Car(Vehicle):
    def __init__(self, brand, year, doors):
        super().__init__(brand, year)
        self.doors = doors
\\\`\\\`\\\`

**Polymorphism** — Different classes can use the same interface:
\\\`\\\`\\\`python
animals = [Dog("Buddy"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())  # Same method, different behavior
\\\`\\\`\\\``,
    keyRules: [
      "Use super().__init__() to call parent constructor",
      "Child classes inherit all methods and attributes from parent",
      "Override methods in child classes to change behavior",
      "Python supports multiple inheritance (use with caution)",
      "isinstance(obj, Class) checks if obj is an instance of Class",
    ],
    task: `Write a program that:
1. Defines a base Employee class with name, salary, and a work() method
2. Defines Manager and Developer classes that inherit from Employee
3. Overrides the work() method in each subclass
4. Uses super().__init__() in subclasses
5. Demonstrates polymorphism by calling work() on different objects`,
    starterCode: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def work(self):
        return f"{self.name} is working..."

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        # TODO: use super().__init__()
        pass

    def work(self):
        # TODO: return f"{self.name} is managing a team of {self.team_size}"
        pass

class Developer(Employee):
    def __init__(self, name, salary, language):
        # TODO: use super().__init__()
        pass

    def work(self):
        # TODO: return f"{self.name} is writing {self.language} code"
        pass

# Test polymorphism
employees = [
    Manager("Alice", 90000, 5),
    Developer("Bob", 80000, "Python"),
    Developer("Charlie", 85000, "JavaScript"),
]

for emp in employees:
    print(emp.work())
`,
    solutionCode: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def work(self):
        return f"{self.name} is working..."

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size

    def work(self):
        return f"{self.name} is managing a team of {self.team_size}"

class Developer(Employee):
    def __init__(self, name, salary, language):
        super().__init__(name, salary)
        self.language = language

    def work(self):
        return f"{self.name} is writing {self.language} code"

employees = [
    Manager("Alice", 90000, 5),
    Developer("Bob", 80000, "Python"),
    Developer("Charlie", 85000, "JavaScript"),
]

for emp in employees:
    print(emp.work())`,
    hint: `• class Child(Parent): — inheritance
• super().__init__(params) — call parent constructor
• Override: redefine the method in the child class
• Polymorphism: call the same method on different types`,
    tests: [
      { name: "Base Employee class defined", validate: testContains("class Employee") },
      { name: "Manager inherits from Employee", validate: testContains("class Manager(Employee") },
      { name: "Developer inherits from Employee", validate: testContains("class Developer(Employee") },
      { name: "super().__init__() used", validate: testContains("super().__init__(") },
      { name: "Work method demonstrates polymorphism", validate: testContains("for emp") || testContains("for ") },
    ],
  },

  // ═════════════════════════════════════════════════
  // ADVANCED
  // ═════════════════════════════════════════════════

  {
    id: "iterators-generators",
    chapter: 17,
    title: "Iterators & Generators",
    level: "Advanced",
    tags: ["Iterators", "Generators", "yield", "__iter__", "__next__"],
    conceptExplanation: `Generators produce values on-the-fly, making them memory-efficient for large datasets.

**Generators with yield:**
\\\`\\\`\\\`python
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5
\\\`\\\`\\\`

**Generator Expressions:**
\\\`\\\`\\\`python
squares = (x**2 for x in range(10))
print(next(squares))  # 0
print(next(squares))  # 1
\\\`\\\`\\\`

**Custom Iterator:**
\\\`\\\`\\\`python
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1
\\\`\\\`\\\`

**Why Generators?**
• Memory-efficient — don't store all values in memory
• Lazy evaluation — values are produced only when needed
• Can represent infinite sequences`,
    keyRules: [
      "yield pauses the function and returns a value; the function resumes on next() call",
      "Generators are single-use — you can't iterate over them twice",
      "Use generator expressions () instead of list comprehensions [] for large data",
      "StopIteration is raised when a generator is exhausted",
      "Generators are great for reading large files line by line",
    ],
    task: `Write a program that:
1. Creates a generator function fibonacci(n) that yields n Fibonacci numbers
2. Creates a generator function even_numbers(start, end) that yields even numbers in range
3. Creates a generator expression for squares
4. Iterates over generators with for loops and prints values`,
    starterCode: `# 1. Fibonacci generator
def fibonacci(n):
    # TODO: yield first n Fibonacci numbers
    # 0, 1, 1, 2, 3, 5, 8, 13, ...
    pass

# 2. Even numbers generator
def even_numbers(start, end):
    # TODO: yield even numbers from start to end
    pass

# 3. Generator expression
squares =  # TODO: (x**2 for x in range(1, 6))

# Test
print("Fibonacci (first 8):")
for num in fibonacci(8):
    print(num, end=" ")
print()

print("\\nEven numbers (2 to 10):")
for num in even_numbers(2, 10):
    print(num, end=" ")
print()

print("\\nSquares:")
for s in squares:
    print(s, end=" ")
print()
`,
    solutionCode: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

def even_numbers(start, end):
    for i in range(start, end + 1):
        if i % 2 == 0:
            yield i

squares = (x**2 for x in range(1, 6))

print("Fibonacci (first 8):")
for num in fibonacci(8):
    print(num, end=" ")
print()

print("\nEven numbers (2 to 10):")
for num in even_numbers(2, 10):
    print(num, end=" ")
print()

print("\nSquares:")
for s in squares:
    print(s, end=" ")
print()`,
    hint: `• def generator(): ... yield value — creates a generator
• Generator expressions: (expr for item in iterable)
• Fibonacci: a, b = b, a + b
• Use range() with condition to filter even numbers`,
    tests: [
      { name: "Generator with yield defined", validate: testContains("yield") },
      { name: "fibonacci generator function", validate: testContains("def fibonacci") },
      { name: "even_numbers generator function", validate: testContains("def even_numbers") },
      { name: "Generator expression used", validate: testContains("(") && testContains("for ") && testContains(" in ") && testContains(")") },
    ],
  },

  {
    id: "decorators",
    chapter: 18,
    title: "Decorators",
    level: "Advanced",
    tags: ["Decorators", "@", "wraps", "higher-order functions"],
    conceptExplanation: `Decorators modify functions or methods without changing their code.

**Basic Decorator:**
\\\`\\\`\\\`python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(0.5)
    return "Done!"

print(slow_function())
\\\`\\\`\\\`

**Decorator with Arguments:**
\\\`\\\`\\\`python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello(name):
    print(f"Hello, {name}!")
\\\`\\\`\\\``,
    keyRules: [
      "Decorators are functions that take a function and return a function",
      "Use *args and **kwargs to handle any function signature",
      "Use functools.wraps to preserve the original function's metadata",
      "Decorators run at function definition time, not call time",
      "Multiple decorators stack: @a @b func() runs a(b(func))",
    ],
    task: `Write a program that:
1. Creates a decorator uppercase_result that makes the result uppercase
2. Creates a decorator log_call that prints "Calling function_name..."
3. Applies both decorators to functions
4. Calls decorated functions
5. Prints results`,
    starterCode: `# 1. Uppercase result decorator
def uppercase_result(func):
    def wrapper(*args, **kwargs):
        # TODO: call func, get result, convert to uppercase, return
        pass
    return wrapper

# 2. Log call decorator
def log_call(func):
    def wrapper(*args, **kwargs):
        # TODO: print "Calling {func.__name__}..."
        # TODO: call func and return result
        pass
    return wrapper

# 3. Apply decorators
@uppercase_result
def greet(name):
    return f"Hello, {name}!"

@log_call
def add(a, b):
    return a + b

# Test
print(greet("Alice"))
print()
print(f"add(3, 5) = {add(3, 5)}")
`,
    solutionCode: `def uppercase_result(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return str(result).upper()
    return wrapper

def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        return func(*args, **kwargs)
    return wrapper

@uppercase_result
def greet(name):
    return f"Hello, {name}!"

@log_call
def add(a, b):
    return a + b

print(greet("Alice"))
print()
print(f"add(3, 5) = {add(3, 5)}")`,
    hint: `• @decorator above a function applies it
• wrapper(*args, **kwargs) captures all arguments
• func(*args, **kwargs) calls original function
• func.__name__ gets the function name`,
    tests: [
      { name: "Decorator functions defined", validate: testContains("def ") && testContains("wrapper") },
      { name: "@ syntax used to apply decorators", validate: testContains("@") },
      { name: "*args and **kwargs used", validate: testContains("*args") && testContains("**kwargs") },
      { name: "Results printed correctly", validate: (c) => (c.match(/print/g) || []).length >= 2 },
    ],
  },

  {
    id: "context-managers",
    chapter: 19,
    title: "Context Managers",
    level: "Advanced",
    tags: ["with", "context manager", "__enter__", "__exit__", "contextlib"],
    conceptExplanation: `Context managers simplify resource management by ensuring proper setup/cleanup.

**Class-based Context Manager:**
\\\`\\\`\\\`python
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        print(f"Opening {self.filename}")
        self.file = open(self.filename, "w")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        print(f"Closed {self.filename}")
        return False  # Don't suppress exceptions

with ManagedFile("test.txt") as f:
    f.write("Hello, Context Manager!")
\\\`\\\`\\\`

**Using contextlib:**
\\\`\\\`\\\`python
from contextlib import contextmanager

@contextmanager
def managed_file(filename):
    print(f"Opening {filename}")
    f = open(filename, "w")
    try:
        yield f
    finally:
        f.close()
        print(f"Closed {filename}")
\\\`\\\`\\\`

**Common Uses:**
• File operations (open/close)
• Database connections (connect/disconnect)
• Locks (acquire/release)
• Timing operations`,
    keyRules: [
      "__enter__ returns the resource, __exit__ cleans it up",
      "__exit__ receives exception details (None if no exception)",
      "Return True from __exit__ to suppress exceptions",
      "Use @contextmanager decorator for simpler context managers",
      "Always use 'with' for resource management",
    ],
    task: `Write a program that:
1. Creates a Timer context manager (class-based) that measures execution time
2. Creates a ManagedList context manager using @contextmanager that auto-saves on exit
3. Tests both context managers
4. Prints timing results`,
    starterCode: `import time
from contextlib import contextmanager

# 1. Timer context manager (class-based)
class Timer:
    def __enter__(self):
        # TODO: record start time
        self.start =  # TODO
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        # TODO: calculate elapsed time and print
        elapsed =  # TODO
        print(f"Execution time: {elapsed:.4f} seconds")
        return False

# 2. ManagedList context manager
@contextmanager
def managed_list():
    # TODO: create a list, yield it, then print "List saved"
    pass

# Test Timer
print("Testing Timer:")
with Timer():
    total = sum(range(1000000))
    print(f"Sum = {total}")

print()

# Test ManagedList
print("Testing ManagedList:")
with managed_list() as my_list:
    my_list.append("item1")
    my_list.append("item2")
    print(f"List contents: {my_list}")
`,
    solutionCode: `import time
from contextlib import contextmanager

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.time() - self.start
        print(f"Execution time: {elapsed:.4f} seconds")
        return False

@contextmanager
def managed_list():
    lst = []
    try:
        yield lst
    finally:
        print(f"List saved! Final state: {lst}")

print("Testing Timer:")
with Timer():
    total = sum(range(1000000))
    print(f"Sum = {total}")

print()
print("Testing ManagedList:")
with managed_list() as my_list:
    my_list.append("item1")
    my_list.append("item2")
    print(f"List contents: {my_list}")`,
    hint: `• Timer: __enter__ records start, __exit__ calculates elapsed
• time.time() gets current time in seconds
• @contextmanager: yield the resource, cleanup in finally
• __exit__ parameters: (exc_type, exc_val, exc_tb)`,
    tests: [
      { name: "Timer class with __enter__/__exit__", validate: testContains("class Timer") && testContains("__enter__") && testContains("__exit__") },
      { name: "@contextmanager decorator used", validate: testContains("from contextlib import") || testContains("@contextmanager") },
      { name: "time module imported", validate: testContains("import time") },
      { name: "Both context managers tested", validate: (c) => (c.match(/with /g) || []).length >= 2 },
    ],
  },

  {
    id: "async-python",
    chapter: 20,
    title: "Async Python",
    level: "Advanced",
    tags: ["async", "await", "asyncio", "coroutines", "concurrency"],
    conceptExplanation: `Asynchronous programming allows concurrent execution of I/O-bound tasks.

**Async Functions (Coroutines):**
\\\`\\\`\\\`python
import asyncio

async def fetch_data(name):
    print(f"Fetching {name}...")
    await asyncio.sleep(1)  # Simulate I/O
    print(f"Got {name}!")
    return f"Data from {name}"
\\\`\\\`\\\`

**Running Multiple Tasks:**
\\\`\\\`\\\`python
async def main():
    # Run concurrently
    results = await asyncio.gather(
        fetch_data("API 1"),
        fetch_data("API 2"),
        fetch_data("API 3"),
    )
    print(results)

asyncio.run(main())
\\\`\\\`\\\`

**Async Context Managers:**
\\\`\\\`\\\`python
class AsyncResource:
    async def __aenter__(self):
        print("Acquiring resource...")
        await asyncio.sleep(0.5)
        return self

    async def __aexit__(self, *args):
        print("Releasing resource...")
        await asyncio.sleep(0.3)
\\\`\\\`\\\``,
    keyRules: [
      "Async functions are defined with async def",
      "Use await to call other async functions (non-blocking)",
      "Use asyncio.gather() to run tasks concurrently",
      "asyncio.sleep() simulates I/O — never use time.sleep() in async code",
      "asyncio.run(main()) is the entry point",
    ],
    task: `Write a program that:
1. Creates an async function delay(seconds, message) that waits and prints
2. Creates a main() that runs multiple delays concurrently using asyncio.gather
3. Demonstrates sequential vs concurrent execution with timing comparison
4. Prints results`,
    starterCode: `import asyncio
import time

async def delay(seconds, message):
    # TODO: print "Starting: {message}"
    # TODO: await asyncio.sleep(seconds)
    # TODO: print "Finished: {message}"
    # TODO: return message
    pass

async def main():
    # Sequential
    start = time.time()
    result1 = await delay(1, "Task A")
    result2 = await delay(1, "Task B")
    result3 = await delay(1, "Task C")
    seq_time = time.time() - start
    print(f"\\nSequential took: {seq_time:.2f}s")

    # Concurrent
    start = time.time()
    results = await asyncio.gather(
        delay(1, "Task X"),
        delay(1, "Task Y"),
        delay(1, "Task Z"),
    )
    conc_time = time.time() - start
    print(f"\\nConcurrent took: {conc_time:.2f}s")
    print(f"Results: {results}")

# Run
asyncio.run(main())
`,
    solutionCode: `import asyncio
import time

async def delay(seconds, message):
    print(f"Starting: {message}")
    await asyncio.sleep(seconds)
    print(f"Finished: {message}")
    return message

async def main():
    # Sequential
    start = time.time()
    result1 = await delay(1, "Task A")
    result2 = await delay(1, "Task B")
    result3 = await delay(1, "Task C")
    seq_time = time.time() - start
    print(f"\nSequential took: {seq_time:.2f}s")

    # Concurrent
    start = time.time()
    results = await asyncio.gather(
        delay(1, "Task X"),
        delay(1, "Task Y"),
        delay(1, "Task Z"),
    )
    conc_time = time.time() - start
    print(f"\nConcurrent took: {conc_time:.2f}s")
    print(f"Results: {results}")

asyncio.run(main())`,
    hint: `• async def func(): defines async function
• await asyncio.sleep(n) pauses without blocking
• asyncio.gather(t1, t2, t3) runs tasks concurrently
• time.time() measures elapsed time`,
    tests: [
      { name: "async def used for coroutine", validate: testContains("async def") },
      { name: "await keyword used", validate: testContains("await") },
      { name: "asyncio.gather() used for concurrency", validate: testContains("asyncio.gather(") },
      { name: "Timing comparison logged", validate: testContains("time.time()") || testContains("time.time(") },
    ],
  },

  // ═════════════════════════════════════════════════
  // META-ADVANCED
  // ═════════════════════════════════════════════════

  {
    id: "metaclasses",
    chapter: 21,
    title: "Metaclasses",
    level: "Advanced",
    tags: ["Metaclasses", "type()", "__new__", "__init_subclass__", "metaprogramming"],
    conceptExplanation: `Metaclasses are classes of classes — they define how a class behaves.

**Everything is an Object:**
In Python, classes themselves are objects. The type of a class is its metaclass.

\\\`\\\`\\\`python
# The default metaclass is 'type'
print(type(42))         # <class 'int'>
print(type(int))        # <class 'type'>
print(type(type))       # <class 'type'>
\\\`\\\`\\\`

**Creating Classes Dynamically with type():**
\\\`\\\`\\\`python
# Instead of class syntax, you can create a class using type()
# type(name, bases, dict)

Dog = type("Dog", (), {"speak": lambda self: "Woof!"})

d = Dog()
print(d.speak())  # "Woof!"
\\\`\\\`\\\`

**Custom Metaclass:**
\\\`\\\`\\\`python
class AutoReprMeta(type):
    """Metaclass that auto-generates __repr__ for all instances."""
    def __new__(mcs, name, bases, namespace):
        if "__repr__" not in namespace:
            attrs = [k for k in namespace if not k.startswith("_")]
            if attrs:
                fmt = ", ".join(f"{a}={{{a}}}" for a in attrs)
                namespace["__repr__"] = lambda self: f"{name}({fmt.format(**{a: getattr(self, a) for a in attrs})})"
        return super().__new__(mcs, name, bases, namespace)

class Point(metaclass=AutoReprMeta):
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p)  # Point(x=3, y=4)
\\\`\\\`\\\`

**When to Use Metaclasses:**
• ORMs (SQLAlchemy, Django) — define models declaratively
• Singleton / Registry patterns
• Auto-registration of subclasses
• Validation of class attributes at definition time
• Framework-level API design

**__init_subclass__ (Simpler Alternative):**
In Python 3.6+, you can use __init_subclass__ instead of a metaclass for many use cases.

\\\`\\\`\\\`python
class PluginBase:
    plugins = {}

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        PluginBase.plugins[cls.__name__] = cls

class AudioPlugin(PluginBase): pass
class VideoPlugin(PluginBase): pass

print(PluginBase.plugins)  # {'AudioPlugin': ..., 'VideoPlugin': ...}
\\\`\\\`\\\``,
    keyRules: [
      "type is the default metaclass — it creates class objects",
      "type(name, bases, dict) creates a class dynamically",
      "A metaclass inherits from type",
      "__new__ in a metaclass runs when the class is defined (not instantiated)",
      "Prefer __init_subclass__ over metaclasses for simple subclass tracking",
      "Metaclasses are powerful but can make code harder to understand — use sparingly",
    ],
    task: `Write a program that:
1. Shows that type(MyClass) returns <class 'type'>
2. Creates a class dynamically using type(name, bases, dict) with at least one method
3. Defines a LoggerMeta metaclass that auto-logs: prints "Creating class: {name}" in __new__
4. Creates a class using the LoggerMeta metaclass
5. Instantiates and calls methods on the metaclass-based class`,
    starterCode: `# 1. Show that classes are objects of type 'type'
class Sample:
    pass

print("type(Sample):", type(Sample))
print("type(type):", type(type))

# 2. Create a class dynamically using type()
# DynamicGreeter = type(...)  # TODO
# g = DynamicGreeter()
# print(g.greet())

# 3. LoggerMeta metaclass
class LoggerMeta(type):
    def __new__(mcs, name, bases, namespace):
        # TODO: print f"Creating class: {name}"
        # TODO: call super().__new__
        pass

# 4. Class using LoggerMeta
class MyLoggedClass(metaclass=LoggerMeta):
    def do_something(self):
        return "Doing something!"

# 5. Instantiate and use
obj = MyLoggedClass()
print(obj.do_something())
`,
    solutionCode: `class Sample:
    pass

print("type(Sample):", type(Sample))
print("type(type):", type(type))

DynamicGreeter = type("DynamicGreeter", (), {
    "greet": lambda self: f"Hello from {type(self).__name__}!"
})

g = DynamicGreeter()
print(g.greet())

class LoggerMeta(type):
    def __new__(mcs, name, bases, namespace):
        print(f"Creating class: {name}")
        return super().__new__(mcs, name, bases, namespace)

class MyLoggedClass(metaclass=LoggerMeta):
    def do_something(self):
        return "Doing something!"

obj = MyLoggedClass()
print(obj.do_something())`,
    hint: `• type(AnyClass) returns <class 'type'>
• Dynamic: type("Name", (base,), {"method": lambda self: ...})
• Metaclass __new__ receives (mcs, name, bases, namespace)
• Always call super().__new__() in metaclass __new__`,
    tests: [
      { name: "type() used to show class type", validate: testContains("type(Sample)") || testContains("type(") },
      { name: "Class created with type(name, bases, dict)", validate: testContains('type("') || testContains("type('") },
      { name: "LoggerMeta defined as metaclass", validate: testContains("class LoggerMeta(type)") },
      { name: "__new__ method in metaclass", validate: testContains("__new__") && testContains("super().__new__") },
      { name: "metaclass=LoggerMeta used", validate: testContains("metaclass=LoggerMeta") || testContains("metaclass =") },
    ],
  },

  {
    id: "descriptors",
    chapter: 22,
    title: "Descriptors",
    level: "Advanced",
    tags: ["Descriptors", "__get__", "__set__", "__delete__", "property", "__getattribute__"],
    conceptExplanation: `Descriptors control how attribute access works on objects. They are the underlying mechanism for properties, methods, and classmethods.

**Descriptor Protocol:**
Any object that defines __get__, __set__, or __delete__ is a descriptor.

\\\`\\\`\\\`python
class Descriptor:
    def __get__(self, obj, objtype=None):
        return f"Getting from {type(obj).__name__}"

    def __set__(self, obj, value):
        print(f"Setting {value} on {type(obj).__name__}")

    def __delete__(self, obj):
        print(f"Deleting from {type(obj).__name__}")
\\\`\\\`\\\`

**Data vs Non-Data Descriptors:**
• Data descriptor: defines both __get__ and __set__ (overrides instance dict)
• Non-data descriptor: defines only __get__ (instance dict takes priority)

**Property — A Built-in Descriptor:**
\\\`\\\`\\\`python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5/9
\\\`\\\`\\\`

**Validated Attribute with Descriptor:**
\\\`\\\`\\\`python
class PositiveNumber:
    def __set_name__(self, owner, name):
        self.name = f"_{name}"

    def __get__(self, obj, objtype=None):
        return getattr(obj, self.name, 0)

    def __set__(self, obj, value):
        if value < 0:
            raise ValueError(f"{self.name[1:]} must be positive")
        setattr(obj, self.name, value)

class Order:
    quantity = PositiveNumber()
    price = PositiveNumber()

    def __init__(self, quantity, price):
        self.quantity = quantity
        self.price = price

order = Order(10, 25.0)
print(order.quantity)  # 10
order.quantity = -5     # ValueError: quantity must be positive
\\\`\\\`\\\`

**Method Resolution with Descriptors:**
Python functions are descriptors! That's how methods receive self.

\\\`\\\`\\\`python
class MyClass:
    def method(self):
        return "Hello"

# function.__get__ binds self automatically when accessed on an instance
print(MyClass.method)       # <function MyClass.method at ...>
print(MyClass().method)     # <bound method ...>
\\\`\\\`\\\``,
    keyRules: [
      "Descriptors are objects that define __get__, __set__, or __delete__",
      "Data descriptors (__set__) override instance dictionaries",
      "Non-data descriptors (only __get__) can be shadowed by instance attributes",
      "__set_name__ is called when the descriptor is assigned to a class attribute",
      "property() is implemented using the descriptor protocol",
      "Functions are non-data descriptors — that's how methods get bound to instances",
    ],
    task: `Write a program that:
1. Creates a simple descriptor LoggedAttr that logs every get and set
2. Uses __set_name__ to track the attribute name
3. Creates a Person class that uses LoggedAttr for 'name' and 'age'
4. Creates a property celsius with a getter and setter that converts to/from fahrenheit
5. Demonstrates get/set on both the descriptor and property`,
    starterCode: `# 1. LoggedAttr descriptor
class LoggedAttr:
    def __set_name__(self, owner, name):
        # TODO: store the attribute name as self.name
        pass

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        # TODO: get the actual value from obj's __dict__
        # TODO: print f"Getting {self.name}: {value}"
        # TODO: return value
        pass

    def __set__(self, obj, value):
        # TODO: print f"Setting {self.name} to {value}"
        # TODO: set the value in obj's __dict__ under self.name
        pass

# 2. Person class using LoggedAttr
class Person:
    name = LoggedAttr()
    age = LoggedAttr()

    def __init__(self, name, age):
        self.name = name
        self.age = age

# 3. Test LoggedAttr
p = Person("Alice", 30)
print("Name:", p.name)
print("Age:", p.age)
p.name = "Bob"
print("Updated name:", p.name)

# 4. Property with celsius/fahrenheit conversion
# TODO: Add a Temperature class with celsius property
# that converts to/from fahrenheit
`,
    solutionCode: `class LoggedAttr:
    def __set_name__(self, owner, name):
        self.name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        value = obj.__dict__[self.name]
        print(f"Getting {self.name[1:]}: {value}")
        return value

    def __set__(self, obj, value):
        print(f"Setting {self.name[1:]} to {value}")
        obj.__dict__[self.name] = value

class Person:
    name = LoggedAttr()
    age = LoggedAttr()

    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 30)
print("Name:", p.name)
print("Age:", p.age)
p.name = "Bob"
print("Updated name:", p.name)

# Property example
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5/9

t = Temperature(25)
print(f"{t.celsius}°C = {t.fahrenheit}°F")
t.fahrenheit = 100
print(f"After setting 100°F: {t.celsius}°C")`,
    hint: `• Descriptor __set_name__ receives (self, owner, name)
• Store values using obj.__dict__[self.name]
• Properties use @property getter and @<name>.setter decorator
• Fahrenheit: C * 9/5 + 32, Celsius: (F - 32) * 5/9`,
    tests: [
      { name: "Logging descriptor class defined", validate: testContains("class LoggedAttr") },
      { name: "__set_name__ method defined", validate: testContains("__set_name__") },
      { name: "__get__ method defined", validate: testContains("__get__") },
      { name: "__set__ method defined", validate: testContains("__set__") },
      { name: "@property decorator used", validate: testContains("@property") },
    ],
  },

  {
    id: "multiprocessing",
    chapter: 23,
    title: "Multiprocessing",
    level: "Advanced",
    tags: ["multiprocessing", "Process", "Pool", "Queue", "parallelism"],
    conceptExplanation: `Multiprocessing allows you to run code in parallel across multiple CPU cores, bypassing the GIL (Global Interpreter Lock).

**Process vs Thread:**
• Threads share memory — good for I/O, but limited by GIL for CPU work
• Processes have separate memory — good for CPU-bound tasks, each has its own GIL

**Basic Process:**
\\\`\\\`\\\`python
from multiprocessing import Process

def worker(name):
    print(f"Worker {name} is running")

if __name__ == "__main__":
    processes = []
    for i in range(4):
        p = Process(target=worker, args=(i,))
        p.start()
        processes.append(p)

    for p in processes:
        p.join()  # Wait for all processes to finish
\\\`\\\`\\\`

**Process Pool:**
\\\`\\\`\\\`python
from multiprocessing import Pool

def square(n):
    return n ** 2

if __name__ == "__main__":
    with Pool(processes=4) as pool:
        results = pool.map(square, range(10))
    print(results)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\\\`\\\`\\\`

**Inter-Process Communication (Queue):**
\\\`\\\`\\\`python
from multiprocessing import Process, Queue

def producer(q):
    for i in range(5):
        q.put(f"Item {i}")

def consumer(q):
    while True:
        item = q.get()
        if item is None:  # Poison pill to signal stop
            break
        print(f"Consumed: {item}")

if __name__ == "__main__":
    q = Queue()
    prod = Process(target=producer, args=(q,))
    cons = Process(target=consumer, args=(q,))
    prod.start()
    cons.start()
    prod.join()
    q.put(None)  # Signal consumer to stop
    cons.join()
\\\`\\\`\\\`

**Shared Memory (Value, Array):**
\\\`\\\`\\\`python
from multiprocessing import Process, Value, Array

def increment(counter, arr):
    for i in range(len(arr)):
        arr[i] += 1
    counter.value += 1

if __name__ == "__main__":
    counter = Value("i", 0)  # 'i' = signed integer
    arr = Array("i", [1, 2, 3, 4, 5])
    p = Process(target=increment, args=(counter, arr))
    p.start()
    p.join()
    print(counter.value)  # 1
    print(list(arr))       # [2, 3, 4, 5, 6]
\\\`\\\`\\\``,
    keyRules: [
      "Always guard process creation with if __name__ == '__main__'",
      "Use Pool for map/reduce style parallelism",
      "Use Queue (not multiprocessing.Queue) for safe communication",
      "Processes don't share memory — use Queue, Pipe, Value, or Array to share data",
      "join() blocks until the process finishes",
      "Use poison pills (None) to signal workers to shut down gracefully",
    ],
    task: `Write a program that:
1. Defines a function is_prime(n) that checks if a number is prime
2. Creates a Pool of processes to check which numbers 1-20 are prime in parallel
3. Uses a Queue to send results back from a worker process
4. Simulates timing the parallel vs sequential execution
5. Prints all results`,
    starterCode: `from multiprocessing import Process, Queue, Pool
import time

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def check_prime(n):
    """Return (n, is_prime_result)"""
    return (n, is_prime(n))

if __name__ == "__main__":
    numbers = range(1, 21)

    # Sequential
    start = time.time()
    sequential = [(n, is_prime(n)) for n in numbers]
    seq_time = time.time() - start
    print(f"Sequential took: {seq_time:.4f}s")
    primes = [n for n, p in sequential if p]
    print(f"Primes found (sequential): {primes}")

    # Parallel with Pool
    start = time.time()
    with Pool(processes=4) as pool:
        parallel = pool.map(check_prime, numbers)
    par_time = time.time() - start
    print(f"\\nParallel took: {par_time:.4f}s")
    primes_par = [n for n, p in parallel if p]
    print(f"Primes found (parallel): {primes_par}")
`,
    solutionCode: `from multiprocessing import Process, Queue, Pool
import time

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def check_prime(n):
    return (n, is_prime(n))

if __name__ == "__main__":
    numbers = range(1, 21)

    # Sequential
    start = time.time()
    sequential = [(n, is_prime(n)) for n in numbers]
    seq_time = time.time() - start
    print(f"Sequential took: {seq_time:.4f}s")
    primes = [n for n, p in sequential if p]
    print(f"Primes found (sequential): {primes}")

    # Parallel with Pool
    start = time.time()
    with Pool(processes=4) as pool:
        parallel = pool.map(check_prime, numbers)
    par_time = time.time() - start
    print(f"\nParallel took: {par_time:.4f}s")
    primes_par = [n for n, p in parallel if p]
    print(f"Primes found (parallel): {primes_par}")`,
    hint: `⚠ Note: multiprocessing is not supported in Pyodide (browser).
Run this code locally with: python your_file.py

• Pool(processes=N).map(func, iterable) runs in parallel
• if __name__ == "__main__": is required for multiprocessing
• is_prime checks divisors up to sqrt(n)
• pool.map returns results in order`,
    tests: [
      { name: "Pool imported from multiprocessing", validate: testContains("from multiprocessing import") && testContains("Pool") },
      { name: "if __name__ == '__main__' guard", validate: testContains("if __name__ ==") },
      { name: "pool.map() used for parallel computation", validate: testContains("pool.map(") },
      { name: "Timing comparison logged", validate: testContains("time.time()") || testContains("time.time(") },
    ],
  },

  {
    id: "type-hints",
    chapter: 24,
    title: "Type Hints",
    level: "Advanced",
    tags: ["Type Hints", "typing", "Optional", "Union", "TypeVar", "Protocol"],
    conceptExplanation: `Type hints add static type information to Python code, improving readability and enabling static analysis with tools like mypy.

**Basic Type Hints:**
\\\`\\\`\\\`python
name: str = "Alice"
age: int = 25
height: float = 5.6
is_active: bool = True
\\\`\\\`\\\`

**Function Annotations:**
\\\`\\\`\\\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

def process(items: list[int]) -> dict[str, int]:
    return {str(i): i for i in items}
\\\`\\\`\\\`

**Optional and Union:**
\\\`\\\`\\\`python
from typing import Optional, Union, Any

def find_user(user_id: int) -> Optional[str]:
    # Returns str or None
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

def process_value(value: Union[int, str]) -> str:
    return f"Got: {value}"

# Python 3.10+ shorthand: X | Y instead of Union[X, Y]
def process(value: int | str) -> str:
    return f"Got: {value}"
\\\`\\\`\\\`

**Generic Types:**
\\\`\\\`\\\`python
from typing import TypeVar, Generic

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: list[T] = []

    def push(self, item: T) -> None:
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()

# Usage
int_stack = Stack[int]()
int_stack.push(1)
int_stack.push(2)
print(int_stack.pop())  # 2
\\\`\\\`\\\`

**Protocol (Structural Typing):**
\\\`\\\`\\\`python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

def render(obj: Drawable) -> None:
    obj.draw()

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

render(Circle())  # Works because Circle has draw()
\\\`\\\`\\\`

**Literal and Final:**
\\\`\\\`\\\`python
from typing import Literal, Final

MODE: Final = "production"  # Cannot be reassigned

def set_status(status: Literal["active", "inactive"]) -> None:
    print(f"Status set to {status}")

set_status("active")    # OK
set_status("unknown")   # Type checker error!
\\\`\\\`\\\``,
    keyRules: [
      "Type hints are not enforced at runtime — they're for static analysis and documentation",
      "Use Optional[X] for values that could be None (or X | None in Python 3.10+)",
      "Use Union[X, Y] for values that could be multiple types (or X | Y in Python 3.10+)",
      "Use TypeVar for generic functions and classes",
      "Use Protocol for structural (duck) typing",
      "Use Final for constants that shouldn't be reassigned",
      "Run mypy to check type hints: mypy your_file.py",
    ],
    task: `Write a program that:
1. Adds type hints to all function parameters and return types
2. Uses List[int] and Dict[str, Any] for complex types
3. Uses Optional for a function that might return None
4. Creates a generic function using TypeVar that works with any type
5. Uses Protocol to define a structural type interface`,
    starterCode: `from typing import List, Dict, Optional, TypeVar, Protocol, Any

# 1. Basic type hints
# TODO: add type hints to the function below
def add(a: int, b: int) -> int:
    return a + b

# 2. List and Dict types
# TODO: add type hints: process_data takes List[int], returns Dict[str, int]
def process_data(numbers):
    return {str(n): n ** 2 for n in numbers}

# 3. Optional return type
def find_item(items: List[str], target: str):
    # TODO: return Optional[str] — the item if found, else None
    if target in items:
        return target
    return None

# 4. Generic function with TypeVar
T = TypeVar("T")
def first_element(items: List[T]) -> Optional[T]:
    # TODO: return the first element if list is not empty, else None
    pass

# 5. Protocol
class Named(Protocol):
    # TODO: define a protocol with name: str attribute
    pass

def greet(obj: Named) -> str:
    return f"Hello, {obj.name}!"

class Person:
    def __init__(self, name: str):
        self.name = name

# Test
print(add(5, 3))
print(process_data([1, 2, 3]))
print(find_item(["a", "b", "c"], "b"))
print(find_item(["a", "b", "c"], "z"))
print(first_element([10, 20, 30]))
print(first_element([]))
print(greet(Person("Alice")))
`,
    solutionCode: `from typing import List, Dict, Optional, TypeVar, Protocol, Any

def add(a: int, b: int) -> int:
    return a + b

def process_data(numbers: List[int]) -> Dict[str, int]:
    return {str(n): n ** 2 for n in numbers}

def find_item(items: List[str], target: str) -> Optional[str]:
    if target in items:
        return target
    return None

T = TypeVar("T")
def first_element(items: List[T]) -> Optional[T]:
    if items:
        return items[0]
    return None

class Named(Protocol):
    name: str

def greet(obj: Named) -> str:
    return f"Hello, {obj.name}!"

class Person:
    def __init__(self, name: str):
        self.name = name

print(add(5, 3))
print(process_data([1, 2, 3]))
print(find_item(["a", "b", "c"], "b"))
print(find_item(["a", "b", "c"], "z"))
print(first_element([10, 20, 30]))
print(first_element([]))
print(greet(Person("Alice")))`,
    hint: `• def func(param: type) -> return_type:
• List[X] for lists, Dict[K, V] for dicts
• Optional[X] means X | None
• TypeVar("T") creates a generic type variable
• Protocol defines structural typing — any class with matching methods/attrs works`,
    tests: [
      { name: "Type hints on function params", validate: testContains(": str") || testContains(": int") || testContains(": List[") },
      { name: "-> Return type annotation", validate: testContains("->") },
      { name: "Optional type used", validate: testContains("Optional[") },
      { name: "TypeVar and generic used", validate: testContains("TypeVar") && testContains("Generic") },
      { name: "Protocol defined", validate: testContains("class ") && testContains("(Protocol)") },
    ],
  },
];

// ─── CODE CHALLENGES ───

export const PYTHON_CHALLENGES = [
  {
    id: "challenge-fizzbuzz",
    title: "1. FizzBuzz",
    problem: "Write a function that prints numbers from 1 to n. For multiples of 3, print 'Fizz' instead. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'.",
    difficulty: "Easy",
    tags: ["Loops", "Conditionals", "Modulo"],
    starterCode: `def fizzbuzz(n):
    # TODO: print numbers 1 to n with Fizz/Buzz/FizzBuzz rules
    pass

# Test
fizzbuzz(15)
`,
    solution: `def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

fizzbuzz(15)`,
    hint: "Use modulo (%) to check divisibility. Check i % 15 first for FizzBuzz.",
    tests: [
      { name: "fizzbuzz function defined", validate: testContains("def fizzbuzz") },
      { name: "Modulo operator used", validate: testContains("%") },
      { name: "Multiple of 3 and 5 checked first", validate: (c) => c.indexOf("3") < c.indexOf("5") || c.indexOf("15") > -1 },
    ],
  },
  {
    id: "challenge-palindrome",
    title: "2. Palindrome Checker",
    problem: "Write a function that checks whether a given string is a palindrome (reads the same forwards and backwards, ignoring case and spaces).",
    difficulty: "Easy",
    tags: ["Strings", "Slicing", "Functions"],
    starterCode: `def is_palindrome(text):
    # TODO: return True if text is palindrome, False otherwise
    pass

# Test
print(is_palindrome("racecar"))  # Expected: True
print(is_palindrome("hello"))    # Expected: False
print(is_palindrome("A man a plan a canal Panama"))  # Expected: True
`,
    solution: `def is_palindrome(text):
    cleaned = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

print(is_palindrome("racecar"))
print(is_palindrome("hello"))
print(is_palindrome("A man a plan a canal Panama"))`,
    hint: "Clean the string: lowercase, remove spaces. Then compare with reversed version [::-1].",
    tests: [
      { name: "is_palindrome function defined", validate: testContains("def is_palindrome") },
      { name: "String reversal used [::-1]", validate: testContains("[::-1]") },
      { name: "Case insensitive comparison", validate: testContains(".lower(") },
    ],
  },
  {
    id: "challenge-anagram",
    title: "3. Anagram Detection",
    problem: "Write a function that checks if two strings are anagrams (contain the same letters in different order, ignoring case and spaces).",
    difficulty: "Easy",
    tags: ["Strings", "Sorting", "Dictionaries"],
    starterCode: `def are_anagrams(str1, str2):
    # TODO: return True if strings are anagrams
    pass

# Test
print(are_anagrams("listen", "silent"))  # Expected: True
print(are_anagrams("hello", "world"))    # Expected: False
print(are_anagrams("Astronomer", "Moon starer"))  # Expected: True
`,
    solution: `def are_anagrams(str1, str2):
    def clean(s):
        return ''.join(sorted(s.lower().replace(" ", "")))
    return clean(str1) == clean(str2)

print(are_anagrams("listen", "silent"))
print(are_anagrams("hello", "world"))
print(are_anagrams("Astronomer", "Moon starer"))`,
    hint: "Clean both strings (lowercase, remove spaces), sort the characters, and compare.",
    tests: [
      { name: "are_anagrams function defined", validate: testContains("def are_anagrams") },
      { name: "String sorting used", validate: testContains("sorted(") },
      { name: "Case insensitive with .lower()", validate: testContains(".lower(") },
    ],
  },
  {
    id: "challenge-word-counter",
    title: "4. Word Counter",
    problem: "Write a function that takes a string and returns a dictionary with the count of each word (case-insensitive).",
    difficulty: "Easy",
    tags: ["Dictionaries", "Strings", "split"],
    starterCode: `def word_count(text):
    # TODO: return dict with word frequencies
    pass

# Test
result = word_count("The quick brown fox jumps over the lazy dog")
print(result)  # Expected: {'the': 2, 'quick': 1, 'brown': 1, ...}
`,
    solution: `def word_count(text):
    words = text.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts

result = word_count("The quick brown fox jumps over the lazy dog")
print(result)`,
    hint: "Use .lower().split() to get words, then dict.get(word, 0) to count.",
    tests: [
      { name: "word_count function defined", validate: testContains("def word_count") },
      { name: ".split() method used", validate: testContains(".split(") },
      { name: "dict.get() used for counting", validate: testContains(".get(") || testContains("get(") },
    ],
  },
  {
    id: "challenge-file-analyzer",
    title: "5. File Analyzer",
    problem: "Write a function that simulates analyzing a file's content. Given a string (simulating file content), count lines, words, characters, and find the longest word.",
    difficulty: "Medium",
    tags: ["Strings", "Functions", "Analysis"],
    starterCode: `def analyze_text(text):
    # TODO: return dict with line_count, word_count, char_count, longest_word
    pass

# Test
sample = """Python is amazing
It is powerful and easy to learn
Perfect for beginners and experts alike"""

result = analyze_text(sample)
print(result)
`,
    solution: `def analyze_text(text):
    lines = text.split("\\n")
    words = text.split()
    longest = max(words, key=len)
    return {
        "line_count": len(lines),
        "word_count": len(words),
        "char_count": len(text),
        "longest_word": longest,
    }

sample = """Python is amazing
It is powerful and easy to learn
Perfect for beginners and experts alike"""

result = analyze_text(sample)
print(result)`,
    hint: "Split by '\\n' for lines, by whitespace for words. Use max(words, key=len) for longest.",
    tests: [
      { name: "analyze_text function defined", validate: testContains("def analyze_text") },
      { name: "Line splitting with \\n", validate: testContains('\\n') || testContains("split") },
      { name: "longest word found with max()", validate: testContains("max(") && testContains("key=len") },
    ],
  },
  {
    id: "challenge-grade-system",
    title: "6. Student Grade System",
    problem: "Write a function that takes a dictionary of student names and their scores, and returns each student's grade, the class average, and who got the highest score.",
    difficulty: "Medium",
    tags: ["Dictionaries", "Loops", "Conditionals"],
    starterCode: `def calculate_grades(students):
    # TODO: students is a dict like {"Alice": 85, "Bob": 92}
    # Return: dict with grade per student, average, and top student
    pass

# Test
students = {
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78,
    "Diana": 95,
    "Eve": 88
}

result = calculate_grades(students)
print(result)
`,
    solution: `def calculate_grades(students):
    grades = {}
    for name, score in students.items():
        if score >= 90: grades[name] = "A"
        elif score >= 80: grades[name] = "B"
        elif score >= 70: grades[name] = "C"
        elif score >= 60: grades[name] = "D"
        else: grades[name] = "F"

    average = sum(students.values()) / len(students)
    top_student = max(students, key=students.get)

    return {
        "grades": grades,
        "average": round(average, 1),
        "top_student": top_student,
        "top_score": students[top_student],
    }

students = {"Alice": 85, "Bob": 92, "Charlie": 78, "Diana": 95, "Eve": 88}
result = calculate_grades(students)
print(result)`,
    hint: "Iterate over students.items(). Use max(dict, key=dict.get) to find top student.",
    tests: [
      { name: "calculate_grades function defined", validate: testContains("def calculate_grades") },
      { name: ".items() used to iterate", validate: testContains(".items(") },
      { name: "max() with key used for top student", validate: testContains("max(") },
    ],
  },
  {
    id: "challenge-expense-tracker",
    title: "7. Expense Tracker",
    problem: "Write a set of functions to manage expenses: add expense, get total by category, and get total spending.",
    difficulty: "Medium",
    tags: ["Functions", "Dictionaries", "Data Management"],
    starterCode: `expenses = []

def add_expense(amount, category, description):
    # TODO: add expense dict to list
    pass

def total_by_category():
    # TODO: return dict of category -> total
    pass

def total_spent():
    # TODO: return total amount of all expenses
    pass

# Test
add_expense(50, "Food", "Lunch")
add_expense(30, "Transport", "Bus fare")
add_expense(20, "Food", "Coffee")
add_expense(100, "Shopping", "Books")

print("Total by category:", total_by_category())
print("Total spent:", total_spent())
`,
    solution: `expenses = []

def add_expense(amount, category, description):
    expenses.append({
        "amount": amount,
        "category": category,
        "description": description,
    })

def total_by_category():
    totals = {}
    for e in expenses:
        totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
    return totals

def total_spent():
    return sum(e["amount"] for e in expenses)

add_expense(50, "Food", "Lunch")
add_expense(30, "Transport", "Bus fare")
add_expense(20, "Food", "Coffee")
add_expense(100, "Shopping", "Books")

print("Total by category:", total_by_category())
print("Total spent:", total_spent())`,
    hint: "Store expenses as list of dicts. Use .get() for category totals. Use sum() with generator for total.",
    tests: [
      { name: "add_expense function defined", validate: testContains("def add_expense") },
      { name: "total_by_category function defined", validate: testContains("def total_by_category") },
      { name: "sum() used for total", validate: testContains("sum(") },
    ],
  },
  {
    id: "challenge-data-parser",
    title: "8. Data Parser",
    problem: "Write a function that parses a CSV-like string and returns a list of dictionaries with proper type conversion.",
    difficulty: "Medium",
    tags: ["Strings", "CSV", "Type Conversion", "List Comprehension"],
    starterCode: `def parse_csv(csv_string):
    # Each line: "name,age,city,score"
    # Return: list of dicts with proper types (age->int, score->float)
    pass

# Test
data = """Alice,25,Mumbai,85.5
Bob,30,Delhi,92.3
Charlie,22,Pune,78.0"""

result = parse_csv(data)
for row in result:
    print(row)
`,
    solution: `def parse_csv(csv_string):
    lines = csv_string.strip().split("\\n")
    result = []
    for line in lines:
        parts = line.split(",")
        name, age, city, score = parts
        result.append({
            "name": name,
            "age": int(age),
            "city": city,
            "score": float(score),
        })
    return result

data = """Alice,25,Mumbai,85.5
Bob,30,Delhi,92.3
Charlie,22,Pune,78.0"""

result = parse_csv(data)
for row in result:
    print(row)`,
    hint: "Split by '\\n' for lines, then by ',' for fields. Use int() and float() for type conversion.",
    tests: [
      { name: "parse_csv function defined", validate: testContains("def parse_csv") },
      { name: "String split used", validate: testContains(".split(") },
      { name: "Type conversion with int()", validate: testContains("int(") },
      { name: "Type conversion with float()", validate: testContains("float(") },
    ],
  },
  {
    id: "challenge-api-consumer",
    title: "9. API Consumer",
    problem: "Write a function that simulates fetching data from an API and processing it. The 'API' returns a list of user dictionaries. Filter by active users and calculate average age.",
    difficulty: "Hard",
    tags: ["Lists", "Filtering", "Comprehensions", "Data Processing"],
    starterCode: `def fetch_users():
    # Simulated API response
    return [
        {"id": 1, "name": "Alice", "age": 28, "active": True},
        {"id": 2, "name": "Bob", "age": 32, "active": False},
        {"id": 3, "name": "Charlie", "age": 24, "active": True},
        {"id": 4, "name": "Diana", "age": 35, "active": True},
        {"id": 5, "name": "Eve", "age": 29, "active": False},
    ]

def process_users():
    # TODO: fetch users
    # TODO: filter active users
    # TODO: calculate average age of active users
    # TODO: return dict with active_users list and average_age
    pass

result = process_users()
print(result)
`,
    solution: `def fetch_users():
    return [
        {"id": 1, "name": "Alice", "age": 28, "active": True},
        {"id": 2, "name": "Bob", "age": 32, "active": False},
        {"id": 3, "name": "Charlie", "age": 24, "active": True},
        {"id": 4, "name": "Diana", "age": 35, "active": True},
        {"id": 5, "name": "Eve", "age": 29, "active": False},
    ]

def process_users():
    users = fetch_users()
    active = [u for u in users if u["active"]]
    avg_age = sum(u["age"] for u in active) / len(active)
    return {
        "active_users": active,
        "average_age": round(avg_age, 1),
        "total_active": len(active),
    }

result = process_users()
print(result)`,
    hint: "Use list comprehension with if condition to filter. Use sum() with generator for average.",
    tests: [
      { name: "process_users function defined", validate: testContains("def process_users") },
      { name: "List comprehension with filter used", validate: testContains("for ") && testContains("if ") },
      { name: "Average calculated with sum()", validate: testContains("sum(") },
    ],
  },
  {
    id: "challenge-log-analyzer",
    title: "10. Log Analyzer",
    problem: "Write a function that analyzes server log entries. Each log is a string with format: 'IP_ADDRESS - - [DATE] \"METHOD /path HTTP/1.1\" STATUS_CODE SIZE'. Return IP addresses sorted by request count.",
    difficulty: "Hard",
    tags: ["Strings", "Regex", "Dictionaries", "Sorting"],
    starterCode: `def analyze_logs(log_entries):
    # TODO: count requests per IP, return sorted list of (ip, count)
    pass

# Test
logs = [
    '192.168.1.1 - - [10/Jan/2026] "GET /index.html HTTP/1.1" 200 2326',
    '10.0.0.1 - - [10/Jan/2026] "POST /api/login HTTP/1.1" 401 1234',
    '192.168.1.1 - - [10/Jan/2026] "GET /about.html HTTP/1.1" 200 5432',
    '10.0.0.2 - - [10/Jan/2026] "GET /index.html HTTP/1.1" 200 2326',
    '192.168.1.1 - - [10/Jan/2026] "POST /api/data HTTP/1.1" 500 789',
    '10.0.0.1 - - [10/Jan/2026] "GET /contact.html HTTP/1.1" 200 1234',
]

result = analyze_logs(logs)
print(result)
`,
    solution: `def analyze_logs(log_entries):
    ip_counts = {}
    for entry in log_entries:
        ip = entry.split()[0]  # First field is the IP
        ip_counts[ip] = ip_counts.get(ip, 0) + 1
    return sorted(ip_counts.items(), key=lambda x: x[1], reverse=True)

logs = [
    '192.168.1.1 - - [10/Jan/2026] "GET /index.html HTTP/1.1" 200 2326',
    '10.0.0.1 - - [10/Jan/2026] "POST /api/login HTTP/1.1" 401 1234',
    '192.168.1.1 - - [10/Jan/2026] "GET /about.html HTTP/1.1" 200 5432',
    '10.0.0.2 - - [10/Jan/2026] "GET /index.html HTTP/1.1" 200 2326',
    '192.168.1.1 - - [10/Jan/2026] "POST /api/data HTTP/1.1" 500 789',
    '10.0.0.1 - - [10/Jan/2026] "GET /contact.html HTTP/1.1" 200 1234',
]

result = analyze_logs(logs)
print(result)`,
    hint: "Split each line by spaces, first element is the IP. Use dict.get() for counting. Sort by count descending.",
    tests: [
      { name: "analyze_logs function defined", validate: testContains("def analyze_logs") },
      { name: "IP extraction with split", validate: testContains(".split(") },
      { name: "Sorted by count descending", validate: testContains("sorted(") && testContains("reverse") },
    ],
  },
];

// ─── PROJECTS ───

export const PYTHON_PROJECTS = [
  {
    id: "project-todo-cli",
    title: "1. Todo CLI App",
    overview: "Build a command-line todo application with add, list, complete, and delete functionality. Data is stored in memory.",
    why: "Todo apps teach the fundamentals of CRUD operations and data management.",
    concepts: ["Lists", "Dictionaries", "Functions", "User Input"],
    checklist: [
      { text: "Add new tasks with description", done: false },
      { text: "List all tasks with status", done: false },
      { text: "Mark tasks as complete", done: false },
      { text: "Delete tasks", done: false },
      { text: "Show pending/completed counts", done: false },
    ],
    starterCode: `# Todo CLI App
todos = []
next_id = 1

def add_task(description):
    # TODO: add task with id, description, done=False
    pass

def list_tasks():
    # TODO: print all tasks with their status
    pass

def complete_task(task_id):
    # TODO: mark task as done
    pass

def delete_task(task_id):
    # TODO: remove task by id
    pass

def get_stats():
    # TODO: return dict with total, pending, completed counts
    pass

# Test
add_task("Learn Python basics")
add_task("Build a project")
add_task("Write tests")
complete_task(1)
list_tasks()
print("Stats:", get_stats())
delete_task(3)
print("After delete:")
list_tasks()
`,
    milestones: [
      { title: "Add & List Tasks", task: "Implement add_task() and list_tasks()" },
      { title: "Complete & Delete", task: "Implement complete_task() and delete_task()" },
      { title: "Stats & Polish", task: "Implement get_stats() with task counts" },
    ],
    solution: `todos = []
next_id = 1

def add_task(description):
    global next_id
    todos.append({"id": next_id, "description": description, "done": False})
    next_id += 1

def list_tasks():
    if not todos:
        print("No tasks yet!")
        return
    for task in todos:
        status = "✓" if task["done"] else "○"
        print(f"{status} [{task['id']}] {task['description']}")

def complete_task(task_id):
    for task in todos:
        if task["id"] == task_id:
            task["done"] = True
            return
    print(f"Task {task_id} not found")

def delete_task(task_id):
    global todos
    todos = [t for t in todos if t["id"] != task_id]

def get_stats():
    total = len(todos)
    done = sum(1 for t in todos if t["done"])
    return {"total": total, "pending": total - done, "completed": done}

add_task("Learn Python basics")
add_task("Build a project")
add_task("Write tests")
complete_task(1)
list_tasks()
print("Stats:", get_stats())
delete_task(3)
print("After delete:")
list_tasks()`,
    tests: [
      { name: "add_task function defined", validate: testContains("def add_task") },
      { name: "list_tasks function defined", validate: testContains("def list_tasks") },
      { name: "complete_task function defined", validate: testContains("def complete_task") },
      { name: "delete_task function defined", validate: testContains("def delete_task") },
      { name: "get_stats function defined", validate: testContains("def get_stats") },
    ],
  },
  {
    id: "project-expense-manager",
    title: "2. Expense Manager",
    overview: "Build an expense tracking system that categorizes expenses, generates summaries, and exports reports.",
    why: "Expense managers teach data aggregation, categorization, and reporting patterns.",
    concepts: ["Dictionaries", "Functions", "Data Aggregation"],
    checklist: [
      { text: "Add expenses with amount, category, date", done: false },
      { text: "View total by category", done: false },
      { text: "View monthly summary", done: false },
      { text: "Find largest expense", done: false },
    ],
    starterCode: `# Expense Manager
expenses = []

def add_expense(amount, category, description, date=""):
    # TODO: add expense dict
    pass

def category_totals():
    # TODO: return dict of category -> total
    pass

def largest_expense():
    # TODO: return the expense with highest amount
    pass

def summary():
    # TODO: return dict with total, count, average
    pass

# Test
add_expense(1500, "Food", "Groceries", "2026-01-10")
add_expense(200, "Transport", "Bus pass", "2026-01-11")
add_expense(3000, "Shopping", "New shoes", "2026-01-12")
add_expense(500, "Food", "Lunch", "2026-01-13")

print("Category totals:", category_totals())
print("Largest:", largest_expense())
print("Summary:", summary())
`,
    milestones: [
      { title: "Add & Track", task: "Implement add_expense with structured data" },
      { title: "Analysis", task: "Implement category_totals and largest_expense" },
      { title: "Reports", task: "Implement summary with totals and averages" },
    ],
    solution: `expenses = []

def add_expense(amount, category, description, date=""):
    expenses.append({
        "amount": amount,
        "category": category,
        "description": description,
        "date": date,
    })

def category_totals():
    totals = {}
    for e in expenses:
        totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
    return totals

def largest_expense():
    return max(expenses, key=lambda e: e["amount"])

def summary():
    amounts = [e["amount"] for e in expenses]
    return {
        "total": sum(amounts),
        "count": len(amounts),
        "average": round(sum(amounts) / len(amounts), 2),
    }

add_expense(1500, "Food", "Groceries", "2026-01-10")
add_expense(200, "Transport", "Bus pass", "2026-01-11")
add_expense(3000, "Shopping", "New shoes", "2026-01-12")
add_expense(500, "Food", "Lunch", "2026-01-13")

print("Category totals:", category_totals())
print("Largest:", largest_expense())
print("Summary:", summary())`,
    tests: [
      { name: "add_expense with all fields", validate: testContains("def add_expense") },
      { name: "category_totals function", validate: testContains("def category_totals") },
      { name: "max() with key used", validate: testContains("max(") && testContains("key=") },
      { name: "summary with total/count/avg", validate: testContains("def summary") },
    ],
  },
  {
    id: "project-password-manager",
    title: "3. Password Manager",
    overview: "Build a password manager that stores, retrieves, and validates passwords. Learn about security fundamentals.",
    why: "Password managers teach hashing, data validation, and secure storage patterns.",
    concepts: ["Dictionaries", "Hashing", "Validation"],
    checklist: [
      { text: "Store service credentials securely", done: false },
      { text: "Validate password strength", done: false },
      { text: "Retrieve passwords by service", done: false },
      { text: "List all stored services", done: false },
    ],
    starterCode: `# Password Manager
vault = {}

def add_password(service, username, password):
    # TODO: validate password, store in vault
    pass

def get_password(service):
    # TODO: return stored credentials for service
    pass

def is_strong_password(password):
    # TODO: check if password is strong (8+ chars, has upper, lower, digit)
    pass

def list_services():
    # TODO: return list of stored service names
    pass

# Test
print(is_strong_password("weak"))  # Should be False
print(is_strong_password("Str0ng!Pass"))  # Should be True

add_password("github", "alice", "G1thub!Pass")
add_password("email", "alice@email.com", "Em@il2024")
print("Services:", list_services())
print("GitHub:", get_password("github"))
`,
    milestones: [
      { title: "Password Validation", task: "Implement is_strong_password checker" },
      { title: "Store & Retrieve", task: "Implement add_password and get_password" },
      { title: "Service Management", task: "Implement list_services and error handling" },
    ],
    solution: `vault = {}

def is_strong_password(password):
    if len(password) < 8:
        return False
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    return has_upper and has_lower and has_digit

def add_password(service, username, password):
    if not is_strong_password(password):
        return "Error: Password not strong enough"
    vault[service] = {"username": username, "password": password}
    return f"Password for {service} stored securely"

def get_password(service):
    return vault.get(service, "Service not found")

def list_services():
    return list(vault.keys())

print(is_strong_password("weak"))
print(is_strong_password("Str0ng!Pass"))

add_password("github", "alice", "G1thub!Pass")
add_password("email", "alice@email.com", "Em@il2024")
print("Services:", list_services())
print("GitHub:", get_password("github"))`,
    tests: [
      { name: "is_strong_password validation", validate: testContains("def is_strong_password") },
      { name: "Upper/lower/digit checks", validate: testContains(".isupper(") || testContains(".islower(") || testContains(".isdigit(") },
      { name: "add_password function defined", validate: testContains("def add_password") },
      { name: "get_password function defined", validate: testContains("def get_password") },
    ],
  },
  {
    id: "project-weather-app",
    title: "4. Weather App",
    overview: "Build a weather data processor that fetches (simulated) weather data, filters by conditions, and generates reports.",
    why: "Weather apps teach async patterns, data transformation, and aggregate calculations.",
    concepts: ["Functions", "Data Processing", "Filtering", "Comprehensions"],
    checklist: [
      { text: "Simulate weather data for multiple cities", done: false },
      { text: "Find cities with specific conditions", done: false },
      { text: "Calculate average temperature", done: false },
      { text: "Generate weather report", done: false },
    ],
    starterCode: `# Weather App
def get_weather_data():
    # Simulated weather data
    return [
        {"city": "Mumbai", "temp": 32, "condition": "sunny", "humidity": 65},
        {"city": "London", "temp": 15, "condition": "cloudy", "humidity": 80},
        {"city": "Tokyo", "temp": 22, "condition": "rainy", "humidity": 90},
        {"city": "Dubai", "temp": 40, "condition": "sunny", "humidity": 20},
        {"city": "Paris", "temp": 18, "condition": "rainy", "humidity": 75},
        {"city": "New York", "temp": 25, "condition": "sunny", "humidity": 55},
    ]

def filter_by_condition(condition):
    # TODO: return cities with given condition
    pass

def average_temperature():
    # TODO: calculate average temp across all cities
    pass

def generate_report():
    # TODO: return dict with summary stats
    pass

# Test
print("Sunny cities:", filter_by_condition("sunny"))
print("Average temp:", average_temperature())
print("Report:", generate_report())
`,
    milestones: [
      { title: "Data & Filtering", task: "Implement filter_by_condition" },
      { title: "Calculations", task: "Implement average_temperature" },
      { title: "Reports", task: "Implement generate_report with full stats" },
    ],
    solution: `def get_weather_data():
    return [
        {"city": "Mumbai", "temp": 32, "condition": "sunny", "humidity": 65},
        {"city": "London", "temp": 15, "condition": "cloudy", "humidity": 80},
        {"city": "Tokyo", "temp": 22, "condition": "rainy", "humidity": 90},
        {"city": "Dubai", "temp": 40, "condition": "sunny", "humidity": 20},
        {"city": "Paris", "temp": 18, "condition": "rainy", "humidity": 75},
        {"city": "New York", "temp": 25, "condition": "sunny", "humidity": 55},
    ]

def filter_by_condition(condition):
    data = get_weather_data()
    return [d for d in data if d["condition"] == condition]

def average_temperature():
    data = get_weather_data()
    temps = [d["temp"] for d in data]
    return round(sum(temps) / len(temps), 1)

def generate_report():
    data = get_weather_data()
    temps = [d["temp"] for d in data]
    return {
        "cities_count": len(data),
        "avg_temp": round(sum(temps) / len(temps), 1),
        "max_temp": max(d["temp"] for d in data),
        "min_temp": min(d["temp"] for d in data),
        "sunny_cities": len([d for d in data if d["condition"] == "sunny"]),
    }

print("Sunny cities:", filter_by_condition("sunny"))
print("Average temp:", average_temperature())
print("Report:", generate_report())`,
    tests: [
      { name: "filter_by_condition function", validate: testContains("def filter_by_condition") },
      { name: "List comprehension with filter", validate: testContains("for ") && testContains("if ") },
      { name: "average_temperature function", validate: testContains("def average_temperature") },
      { name: "generate_report with stats", validate: testContains("def generate_report") },
    ],
  },
  {
    id: "project-chat-app",
    title: "5. Chat Application",
    overview: "Build a simple chat system with users, messages, and room management. Messages are stored in memory.",
    why: "Chat apps teach event-driven architecture, data structures for real-time features, and user management.",
    concepts: ["Classes", "Dictionaries", "Data Structures"],
    checklist: [
      { text: "Create chat rooms", done: false },
      { text: "Send messages to rooms", done: false },
      { text: "View message history", done: false },
      { text: "List active rooms/users", done: false },
    ],
    starterCode: `# Chat Application
class ChatRoom:
    def __init__(self, name):
        # TODO: initialize room with name, messages list, users set
        pass

    def add_user(self, username):
        # TODO: add user to room
        pass

    def send_message(self, username, text):
        # TODO: add message with username, text, timestamp
        pass

    def get_messages(self, limit=10):
        # TODO: return last 'limit' messages
        pass

    def user_count(self):
        # TODO: return number of users in room
        pass

# Test
room = ChatRoom("Python Learners")
room.add_user("Alice")
room.add_user("Bob")
room.send_message("Alice", "Hello everyone!")
room.send_message("Bob", "Hi Alice! Learning Python?")
room.send_message("Alice", "Yes! It's amazing!")

print("Users:", room.user_count())
print("Recent messages:")
for msg in room.get_messages(3):
    print(f"  [{msg['user']}]: {msg['text']}")
`,
    milestones: [
      { title: "Room Setup", task: "Implement __init__ and add_user" },
      { title: "Messaging", task: "Implement send_message and get_messages" },
      { title: "Room Stats", task: "Implement user_count and polish" },
    ],
    solution: `import time

class ChatRoom:
    def __init__(self, name):
        self.name = name
        self.messages = []
        self.users = set()

    def add_user(self, username):
        self.users.add(username)
        return f"{username} joined {self.name}"

    def send_message(self, username, text):
        if username not in self.users:
            return f"Error: {username} not in room"
        self.messages.append({
            "user": username,
            "text": text,
            "time": time.strftime("%H:%M:%S"),
        })
        return "Message sent"

    def get_messages(self, limit=10):
        return self.messages[-limit:]

    def user_count(self):
        return len(self.users)

room = ChatRoom("Python Learners")
room.add_user("Alice")
room.add_user("Bob")
room.send_message("Alice", "Hello everyone!")
room.send_message("Bob", "Hi Alice! Learning Python?")
room.send_message("Alice", "Yes! It's amazing!")

print("Users:", room.user_count())
print("Recent messages:")
for msg in room.get_messages(3):
    print(f"  [{msg['user']}]: {msg['text']}")`,
    tests: [
      { name: "ChatRoom class defined", validate: testContains("class ChatRoom") },
      { name: "__init__ with name/messages/users", validate: testContains("__init__") && testContains("self.messages") },
      { name: "send_message method defined", validate: testContains("def send_message") },
      { name: "get_messages method defined", validate: testContains("def get_messages") },
    ],
  },
  {
    id: "project-inventory-system",
    title: "6. Inventory System",
    overview: "Build an inventory management system that tracks products, quantities, prices, and handles stock operations.",
    why: "Inventory systems teach complex state management, validation, and reporting patterns.",
    concepts: ["Classes", "Validation", "Data Management"],
    checklist: [
      { text: "Add products with price/quantity", done: false },
      { text: "Update stock levels", done: false },
      { text: "Process sales (reduce stock)", done: false },
      { text: "Generate low stock alerts", done: false },
      { text: "Calculate total inventory value", done: false },
    ],
    starterCode: `# Inventory Management System
class Inventory:
    def __init__(self):
        # TODO: initialize products dict
        pass

    def add_product(self, sku, name, price, quantity):
        # TODO: add product to inventory
        pass

    def update_stock(self, sku, quantity_change):
        # TODO: increase or decrease stock (positive/negative change)
        pass

    def process_sale(self, sku, quantity):
        # TODO: reduce stock, return total price
        pass

    def low_stock_alerts(self, threshold=5):
        # TODO: return products with stock below threshold
        pass

    def total_value(self):
        # TODO: return total value of all inventory
        pass

# Test
store = Inventory()
store.add_product("PY001", "Python Book", 29.99, 10)
store.add_product("PY002", "Laptop", 999.99, 3)
store.add_product("PY003", "Mouse", 19.99, 2)

store.process_sale("PY001", 2)
store.update_stock("PY002", -1)
print("Total value: $", store.total_value())
print("Low stock alerts:", store.low_stock_alerts(5))
`,
    milestones: [
      { title: "Product Management", task: "Implement add_product and __init__" },
      { title: "Stock Operations", task: "Implement update_stock and process_sale" },
      { title: "Reports & Alerts", task: "Implement low_stock_alerts and total_value" },
    ],
    solution: `class Inventory:
    def __init__(self):
        self.products = {}

    def add_product(self, sku, name, price, quantity):
        self.products[sku] = {"name": name, "price": price, "quantity": quantity}

    def update_stock(self, sku, quantity_change):
        if sku in self.products:
            self.products[sku]["quantity"] += quantity_change

    def process_sale(self, sku, quantity):
        if sku not in self.products:
            return "Product not found"
        if self.products[sku]["quantity"] < quantity:
            return "Insufficient stock"
        self.products[sku]["quantity"] -= quantity
        return round(self.products[sku]["price"] * quantity, 2)

    def low_stock_alerts(self, threshold=5):
        return {sku: p for sku, p in self.products.items() if p["quantity"] < threshold}

    def total_value(self):
        return round(sum(p["price"] * p["quantity"] for p in self.products.values()), 2)

store = Inventory()
store.add_product("PY001", "Python Book", 29.99, 10)
store.add_product("PY002", "Laptop", 999.99, 3)
store.add_product("PY003", "Mouse", 19.99, 2)

store.process_sale("PY001", 2)
store.update_stock("PY002", -1)
print("Total value: $", store.total_value())
print("Low stock alerts:", store.low_stock_alerts(5))`,
    tests: [
      { name: "Inventory class defined", validate: testContains("class Inventory") },
      { name: "add_product method defined", validate: testContains("def add_product") },
      { name: "process_sale with validation", validate: testContains("def process_sale") },
      { name: "total_value calculation", validate: testContains("def total_value") },
    ],
  },
  {
    id: "project-blog-backend",
    title: "7. Blog Backend",
    overview: "Build a blog backend system with posts, comments, and user management. Features include creating, editing, and searching posts.",
    why: "Blog systems teach relational data modeling, search functionality, and content management patterns.",
    concepts: ["Classes", "Search", "Data Relationships"],
    checklist: [
      { text: "Create and publish posts", done: false },
      { text: "Add comments to posts", done: false },
      { text: "Search posts by title/content", done: false },
      { text: "List posts by author", done: false },
      { text: "Track post statistics", done: false },
    ],
    starterCode: `# Blog Backend
import time

class Blog:
    def __init__(self):
        self.posts = {}
        self.next_id = 1

    def create_post(self, title, content, author):
        # TODO: create post with id, title, content, author, timestamp, comments
        pass

    def add_comment(self, post_id, author, text):
        # TODO: add comment to post
        pass

    def search_posts(self, query):
        # TODO: search by title or content (case-insensitive)
        pass

    def get_user_posts(self, author):
        # TODO: return all posts by author
        pass

    def get_stats(self):
        # TODO: return total posts, total comments
        pass

# Test
blog = Blog()
blog.create_post("Python Tips", "Python is amazing for beginners...", "Alice")
blog.create_post("Advanced Python", "Decorators and generators...", "Bob")
blog.add_comment(1, "Bob", "Great tips!")
blog.add_comment(1, "Charlie", "Thanks for sharing!")

print("Search 'python':", blog.search_posts("python"))
print("Alice's posts:", blog.get_user_posts("Alice"))
print("Stats:", blog.get_stats())
`,
    milestones: [
      { title: "Post Management", task: "Implement create_post and data model" },
      { title: "Comments & Search", task: "Implement add_comment and search_posts" },
      { title: "Analytics", task: "Implement get_user_posts and get_stats" },
    ],
    solution: `import time

class Blog:
    def __init__(self):
        self.posts = {}
        self.next_id = 1

    def create_post(self, title, content, author):
        post_id = self.next_id
        self.next_id += 1
        self.posts[post_id] = {
            "id": post_id,
            "title": title,
            "content": content,
            "author": author,
            "timestamp": time.strftime("%Y-%m-%d %H:%M"),
            "comments": [],
        }
        return post_id

    def add_comment(self, post_id, author, text):
        if post_id not in self.posts:
            return "Post not found"
        self.posts[post_id]["comments"].append({
            "author": author,
            "text": text,
            "timestamp": time.strftime("%Y-%m-%d %H:%M"),
        })

    def search_posts(self, query):
        query = query.lower()
        return [p for p in self.posts.values()
                if query in p["title"].lower() or query in p["content"].lower()]

    def get_user_posts(self, author):
        return [p for p in self.posts.values() if p["author"] == author]

    def get_stats(self):
        total_comments = sum(len(p["comments"]) for p in self.posts.values())
        return {"total_posts": len(self.posts), "total_comments": total_comments}

blog = Blog()
blog.create_post("Python Tips", "Python is amazing for beginners...", "Alice")
blog.create_post("Advanced Python", "Decorators and generators...", "Bob")
blog.add_comment(1, "Bob", "Great tips!")
blog.add_comment(1, "Charlie", "Thanks for sharing!")

print("Search 'python':", blog.search_posts("python"))
print("Alice's posts:", blog.get_user_posts("Alice"))
print("Stats:", blog.get_stats())`,
    tests: [
      { name: "Blog class defined", validate: testContains("class Blog") },
      { name: "create_post method defined", validate: testContains("def create_post") },
      { name: "search_posts with case-insensitive", validate: testContains(".lower(") },
      { name: "Stats with total counts", validate: testContains("def get_stats") },
    ],
  },
  {
    id: "project-ai-assistant",
    title: "8. AI Assistant",
    overview: "Build a simulated AI assistant that can answer questions, remember context, perform calculations, and manage a todo list.",
    why: "AI assistants teach command parsing, context management, and extensible architecture patterns.",
    concepts: ["Classes", "Command Pattern", "NLP Simulation"],
    checklist: [
      { text: "Process natural language commands", done: false },
      { text: "Perform calculations", done: false },
      { text: "Manage todo list", done: false },
      { text: "Remember user name", done: false },
      { text: "Handle unknown commands gracefully", done: false },
    ],
    starterCode: `# AI Assistant
class Assistant:
    def __init__(self, name="PyBot"):
        self.name = name
        self.user_name = None
        self.todos = []

    def process(self, command):
        # TODO: parse command and respond appropriately
        pass

    def handle_math(self, expression):
        # TODO: evaluate math expression safely
        pass

    def handle_todo(self, action, item=""):
        # TODO: add/list/remove todos
        pass

# Test
bot = Assistant()
print(bot.process("my name is Alice"))
print(bot.process("what is my name"))
print(bot.process("add todo learn python"))
print(bot.process("add todo build a project"))
print(bot.process("list todos"))
print(bot.process("calculate 15 + 27"))
print(bot.process("what is the weather"))  # Unknown command
`,
    milestones: [
      { title: "Basic Commands", task: "Implement name recognition and math" },
      { title: "Todo Management", task: "Implement todo add/list/remove" },
      { title: "Graceful Handling", task: "Handle unknown commands and edge cases" },
    ],
    solution: `import re

class Assistant:
    def __init__(self, name="PyBot"):
        self.name = name
        self.user_name = None
        self.todos = []

    def process(self, command):
        cmd = command.lower()

        # Check name
        if "my name is" in cmd:
            self.user_name = cmd.split("my name is")[-1].strip().title()
            return f"Nice to meet you, {self.user_name}!"

        if "what is my name" in cmd:
            if self.user_name:
                return f"Your name is {self.user_name}!"
            return "I don't know your name yet!"

        # Math
        if cmd.startswith("calculate "):
            expr = cmd.replace("calculate ", "")
            return self.handle_math(expr)

        # Todos
        if cmd.startswith("add todo"):
            item = cmd.replace("add todo", "").strip()
            return self.handle_todo("add", item)

        if cmd == "list todos":
            return self.handle_todo("list")

        if cmd.startswith("remove todo"):
            item = cmd.replace("remove todo", "").strip()
            return self.handle_todo("remove", item)

        return f"Sorry, I don't understand '{command}'. Try: 'calculate', 'add todo', 'list todos', or 'my name is...'"

    def handle_math(self, expression):
        try:
            allowed = expression.replace(" ", "")
            if re.match(r'^[\\d+\\-*/().]+$', allowed):
                result = eval(allowed)
                return f"{expression} = {result}"
            return "I can only do basic math (+, -, *, /)"
        except:
            return "I couldn't calculate that expression"

    def handle_todo(self, action, item=""):
        if action == "add":
            self.todos.append(item)
            return f"Added '{item}' to todos"
        elif action == "list":
            if not self.todos:
                return "Your todo list is empty!"
            result = "Your todos:\\n"
            for i, todo in enumerate(self.todos, 1):
                result += f"  {i}. {todo}\\n"
            return result
        elif action == "remove":
            if item in self.todos:
                self.todos.remove(item)
                return f"Removed '{item}' from todos"
            return f"'{item}' not found in todos"

bot = Assistant()
print(bot.process("my name is Alice"))
print(bot.process("what is my name"))
print(bot.process("add todo learn python"))
print(bot.process("add todo build a project"))
print(bot.process("list todos"))
print(bot.process("calculate 15 + 27"))
print(bot.process("what is the weather"))`,
    tests: [
      { name: "Assistant class defined", validate: testContains("class Assistant") },
      { name: "process method with command parsing", validate: testContains("def process") },
      { name: "Math evaluation with safe expression", validate: testContains("eval(") || testContains("re.match") },
      { name: "Todo management (add/list)", validate: testContains("todos") && testContains("append") },
    ],
  },
];

// ─── DEBUGGING CHALLENGES (Interview Prep) ───

export const PYTHON_DEBUG_CHALLENGES = [
  {
    id: "debug-infinite-loop",
    title: "1. The Infinite Loop",
    problem: "The while loop runs forever. Find and fix the bug.",
    learningGoal: "Understand loop termination and counter updates.",
    brokenCode: `# This loop runs forever!
count = 0
while count < 10:
    print(count)
    # Something is missing here
print("Done!")`,
    expectedResult: "Add count += 1 inside the loop to increment the counter.",
    solution: `count = 0
while count < 10:
    print(count)
    count += 1
print("Done!")`,
    hint: "What's missing inside the while loop? How does the loop eventually stop?",
    tests: [
      { name: "Counter increment found", validate: (c) => testContains("count += 1") || testContains("count = count + 1") || testContains("count++") },
    ],
  },
  {
    id: "debug-mutable-default",
    title: "2. The Mutable Default Argument",
    problem: "The function adds items to the list, but the list keeps growing across calls instead of being empty.",
    learningGoal: "Understand why mutable default arguments (like lists) are dangerous.",
    brokenCode: `def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("apple"))    # Expected: ['apple']
print(add_item("banana"))   # Expected: ['banana'] but gets ['apple', 'banana']`,
    expectedResult: "Use None as default and create a new list inside the function.",
    solution: `def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("apple"))
print(add_item("banana"))`,
    hint: "Default arguments are evaluated only once at function definition. What could you use instead of [] as the default?",
    tests: [
      { name: "None used as default instead of []", validate: testContains("None") && (testContains("if items is None") || testContains("if items == None")) },
    ],
  },
  {
    id: "debug-scope-error",
    title: "3. The Scope Error",
    problem: "The function tries to modify a global variable but creates a new local variable instead.",
    learningGoal: "Understand variable scoping and the global keyword.",
    brokenCode: `count = 0

def increment():
    count += 1
    return count

print(increment())  # Expected: 1 but get UnboundLocalError`,
    expectedResult: "Declare 'global count' inside the function before modifying it.",
    solution: `count = 0

def increment():
    global count
    count += 1
    return count

print(increment())`,
    hint: "When you assign to a variable inside a function, Python assumes it's local. How do you tell Python it's a global variable?",
    tests: [
      { name: "global keyword used", validate: testContains("global ") },
    ],
  },
  {
    id: "debug-list-modification",
    title: "4. The Vanishing List Items",
    problem: "While iterating over a list and removing items, some items are skipped.",
    learningGoal: "Understand why modifying a list during iteration causes issues.",
    brokenCode: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # Expected: [1, 3, 5, 7, 9] but gets wrong result`,
    expectedResult: "Create a new list with the filtered items instead of removing while iterating.",
    solution: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
numbers = [n for n in numbers if n % 2 != 0]
print(numbers)`,
    hint: "What happens to the index when you remove an item while looping forward? Try creating a new list instead.",
    tests: [
      { name: "New list created instead of modifying in place", validate: testContains("for ") && testContains("if ") || testContains("filter") },
    ],
  },
  {
    id: "debug-comparison-chain",
    title: "5. The Broken Comparison",
    problem: "The chain comparison doesn't work as expected.",
    learningGoal: "Python supports chained comparisons naturally.",
    brokenCode: `x = 5
# Check if x is between 1 and 10
if 1 < x < 10:
    print("x is between 1 and 10")
else:
    print("x is NOT between 1 and 10")  # This runs incorrectly

# Actually the code works! Let's fix this different bug:
def in_range(value, low, high):
    return low < value < high

print(in_range(5, 1, 10))  # True
print(in_range(15, 1, 10))  # False

# Real bug: incorrect string comparison
def compare_strings(a, b):
    if a > b:
        return f"{a} is greater"
    elif a < b:
        return f"{a} is smaller"
    else:
        return "Equal"

# Strings compared case-sensitively when it shouldn't be
print(compare_strings("apple", "Banana"))  # Bug: 'apple' > 'Banana' because 'a' > 'B'`,
    expectedResult: "Use .lower() or .upper() for case-insensitive string comparison.",
    solution: `def compare_strings(a, b):
    a_lower = a.lower()
    b_lower = b.lower()
    if a_lower > b_lower:
        return f"{a} is greater"
    elif a_lower < b_lower:
        return f"{a} is smaller"
    else:
        return "Equal"

print(compare_strings("apple", "Banana"))`,
    hint: "String comparison is case-sensitive by default. 'a' > 'B' because lowercase letters have higher ASCII values.",
    tests: [
      { name: "Case-insensitive comparison used", validate: testContains(".lower(") || testContains(".upper(") },
    ],
  },
  {
    id: "debug-recursion-limit",
    title: "6. The Recursion Limit",
    problem: "The recursive function exceeds the maximum recursion depth for large inputs.",
    learningGoal: "Understand recursion limits and how to implement iterative solutions.",
    brokenCode: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))    # Works: 120
print(factorial(1000))  # RecursionError!`,
    expectedResult: "Convert to iterative solution or increase recursion limit with sys.setrecursionlimit.",
    solution: `def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

print(factorial(5))
print(factorial(1000))`,
    hint: "Each recursive call adds to the call stack. How can you calculate factorial iteratively?",
    tests: [
      { name: "Iterative solution used", validate: testContains("for ") || testContains("while") },
    ],
  },
  {
    id: "debug-wrong-exception",
    title: "7. The Wrong Exception Type",
    problem: "The except block catches too broadly, hiding real bugs.",
    learningGoal: "Always catch specific exceptions instead of bare except.",
    brokenCode: `def divide(a, b):
    try:
        result = a / b
    except:
        result = None
    return result

print(divide(10, 2))    # Works
print(divide(10, 0))    # Returns None (ok)
print(divide("10", 2))  # Should error but returns None (hides bug!)`,
    expectedResult: "Catch specific exceptions (ZeroDivisionError, TypeError) separately.",
    solution: `def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        result = None
        print("Error: Division by zero")
    except TypeError:
        result = None
        print("Error: Invalid type")
    return result

print(divide(10, 2))
print(divide(10, 0))
print(divide("10", 2))`,
    hint: "A bare 'except:' catches ALL exceptions including TypeError. What specific exceptions should you catch?",
    tests: [
      { name: "Specific exception handled", validate: testContains("ZeroDivisionError") || testContains("TypeError") },
    ],
  },
  {
    id: "debug-shallow-copy",
    title: "8. The Shallow Copy Problem",
    problem: "Modifying a nested list in the copy also modifies the original.",
    learningGoal: "Understand shallow vs deep copy in Python.",
    brokenCode: `original = [[1, 2, 3], [4, 5, 6]]
copy = original.copy()  # Shallow copy

copy[0][0] = 99

print("Original:", original)  # Changed! [[99, 2, 3], [4, 5, 6]]
print("Copy:", copy)          # [[99, 2, 3], [4, 5, 6]]`,
    expectedResult: "Use copy.deepcopy() or create new nested lists to avoid shared references.",
    solution: `import copy
original = [[1, 2, 3], [4, 5, 6]]
copy = copy.deepcopy(original)

copy[0][0] = 99

print("Original:", original)  # [[1, 2, 3], [4, 5, 6]]
print("Copy:", copy)          # [[99, 2, 3], [4, 5, 6]]`,
    hint: "list.copy() only copies the outer list. The inner lists are still shared references. What does deepcopy do?",
    tests: [
      { name: "deepcopy imported/used", validate: testContains("copy.deepcopy") || testContains("deepcopy") },
    ],
  },
  {
    id: "debug-string-immutability",
    title: "9. The Immutable String",
    problem: "Attempting to modify a string in place doesn't work.",
    learningGoal: "Strings are immutable in Python — you must create new strings.",
    brokenCode: `text = "hello"
text[0] = "H"  # TypeError! Strings are immutable
print(text)`,
    expectedResult: "Create a new string: text = 'H' + text[1:] or text = text.capitalize()",
    solution: `text = "hello"
text = "H" + text[1:]
print(text)`,
    hint: "Strings can't be changed in place. How can you create a new string with the first character capitalized?",
    tests: [
      { name: "New string created instead of modifying", validate: (c) => testContains(" + ") || testContains(".capitalize(") || testContains(".replace(") },
    ],
  },
  {
    id: "debug-silent-fail",
    title: "10. The Silent Failure",
    problem: "A function silently fails when it should raise an error.",
    learningGoal: "Don't suppress errors silently — raise them or return error values.",
    brokenCode: `def get_user(users, user_id):
    for user in users:
        if user["id"] == user_id:
            return user
    # No return for missing user — returns None silently!

users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]

# This returns None without any indication of failure
result = get_user(users, 5)
print(f"Found: {result['name']}")  # TypeError! NoneType...`,
    expectedResult: "Raise a KeyError or return an error message when user is not found.",
    solution: `def get_user(users, user_id):
    for user in users:
        if user["id"] == user_id:
            return user
    raise KeyError(f"User with id {user_id} not found")

users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]

try:
    result = get_user(users, 5)
    print(f"Found: {result['name']}")
except KeyError as e:
    print(f"Error: {e}")`,
    hint: "What happens when the function doesn't explicitly return? How can you make failures visible?",
    tests: [
      { name: "Error raised for missing user", validate: testContains("raise ") },
    ],
  },
];
