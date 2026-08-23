// Auto-extracted from MCQData.js

export default [
  // ─── Topic 1: What is OOP? (oop-1 to oop-5) ───
  {
    id: 'oop-1',
    technology: 'oops',
    topic: 'What is OOP?',
    difficulty: 'easy',
    question: 'What does OOP stand for?',
    options: ['Object-Oriented Programming', 'Object-Ordered Programming', 'Operational Object Programming', 'Outcome-Oriented Process'],
    correctAnswer: [0],
    type: 'single',
    explanation: 'OOP stands for Object-Oriented Programming, a programming paradigm that organizes code around objects and data rather than functions and logic.',
    keyConcept: 'OOP is a paradigm that models real-world entities as objects with data (properties) and behavior (methods).',
    xpReward: 5,
    tags: ['oops', 'basics', 'definition'],
  },
  {
    id: 'oop-2',
    technology: 'oops',
    topic: 'What is OOP?',
    difficulty: 'easy',
    question: 'Which of the following is NOT one of the four main pillars of OOP?',
    options: ['Encapsulation', 'Inheritance', 'Compilation', 'Polymorphism'],
    correctAnswer: [2],
    type: 'single',
    explanation: 'The four pillars of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is a process of converting source code to machine code, not an OOP concept.',
    keyConcept: 'The four pillars of OOP are: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
    xpReward: 5,
    tags: ['oops', 'pillars', 'basics'],
  },
  {
    id: 'oop-3',
    technology: 'oops',
    topic: 'What is OOP?',
    difficulty: 'easy',
    question: 'Which programming paradigm focuses on functions and stateless computation?',
    options: ['Object-Oriented Programming', 'Functional Programming', 'Procedural Programming', 'Event-Driven Programming'],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Functional Programming treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. OOP focuses on objects with state and behavior.',
    keyConcept: 'OOP = objects with state + behavior. Functional = pure functions, immutability. Procedural = step-by-step instructions.',
    xpReward: 5,
    tags: ['oops', 'paradigms', 'comparison'],
  },
  {
    id: 'oop-4',
    technology: 'oops',
    topic: 'What is OOP?',
    difficulty: 'medium',
    question: 'What is the primary advantage of OOP over procedural programming?',
    options: [
      'It runs faster',
      'It models real-world entities more naturally, making code reusable and maintainable',
      'It uses less memory',
      'It eliminates all bugs',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: "OOP's main advantage is that it models real-world entities as objects, making code more intuitive, reusable through inheritance, and maintainable through encapsulation.",
    keyConcept: 'OOP provides code reusability (inheritance), modularity (encapsulation), and extensibility (polymorphism).',
    xpReward: 10,
    tags: ['oops', 'advantage', 'procedural'],
  },
  {
    id: 'oop-5',
    technology: 'oops',
    topic: 'What is OOP?',
    difficulty: 'medium',
    question: 'What is a key difference between class-based OOP and prototype-based OOP?',
    codeSnippet: `// Class-based (Java, C++, TypeScript)
class Dog {
  speak() { return "Woof!"; }
}
// Prototype-based (JavaScript)
function Dog() {}
Dog.prototype.speak = function() {
  return "Woof!";
};`,
    options: [
      'Class-based uses classes as blueprints; prototype-based uses existing objects as templates',
      'Class-based is slower than prototype-based',
      'Prototype-based does not support inheritance',
      'There is no difference — they are the same concept with different syntax',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Class-based OOP (Java, C++, TypeScript) uses classes as blueprints to create objects. Prototype-based OOP (JavaScript) creates objects directly and uses existing objects as prototypes to inherit behavior.',
    keyConcept: 'Classes are blueprints; prototypes are template objects. Both enable inheritance but through different mechanisms.',
    xpReward: 15,
    tags: ['oops', 'class-based', 'prototype-based'],
  },

  // ─── Topic 2: Class & Object (oop-6 to oop-10) ───
  {
    id: 'oop-6',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'easy',
    question: 'What is a class in OOP?',
    options: [
      'A blueprint or template for creating objects',
      'An instance of an object',
      'A function that performs a specific task',
      'A variable that stores data',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A class is a blueprint or template that defines the structure (properties) and behavior (methods) that its objects will have. It is not an object itself but a definition.',
    keyConcept: 'A class is a blueprint. An object is an instance created from that blueprint.',
    xpReward: 5,
    tags: ['class', 'definition', 'basics'],
  },
  {
    id: 'oop-7',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'easy',
    question: 'What is an object in OOP?',
    options: [
      'An instance of a class that has state and behavior',
      'A blueprint for creating classes',
      'A function that modifies data',
      'A primitive data type like a number or string',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'An object is a specific instance of a class. It has its own state (property values) and can perform actions (methods). Each object occupies its own memory space.',
    keyConcept: 'Objects are concrete instances with their own data. Classes are abstract definitions.',
    xpReward: 5,
    tags: ['object', 'instance', 'basics'],
  },
  {
    id: 'oop-8',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'easy',
    question: 'What is the correct syntax to create an object from a class?',
    codeSnippet: `class Car {
  constructor(brand) {
    this.brand = brand;
  }
}`,
    options: [
      'const myCar = new Car("Toyota");',
      'const myCar = Car("Toyota");',
      'const myCar = Car.create("Toyota");',
      'const myCar = Car.new("Toyota");',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The `new` keyword is used to create an object from a class. It allocates memory, calls the constructor, and returns the new object instance.',
    keyConcept: 'Use `new ClassName()` to instantiate an object. The `new` keyword allocates memory and calls the constructor.',
    xpReward: 5,
    tags: ['class', 'object', 'instantiation', 'new'],
  },
  {
    id: 'oop-9',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'easy',
    question: 'Can a single class create multiple objects?',
    options: [
      'Yes, a class can create multiple independent objects',
      'No, each class can only create one object',
      'Yes, but all objects share the same property values',
      'No, classes cannot create objects directly',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A class can create multiple independent objects (instances). Each object gets its own copy of instance properties, so changing one object does not affect others.',
    keyConcept: 'A class can produce many independent instances, each with its own state.',
    xpReward: 5,
    tags: ['class', 'instance', 'multiple-objects'],
  },
  {
    id: 'oop-10',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'medium',
    question: 'What is the output of this code?',
    codeSnippet: `class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
}
const a = new Counter();
const b = new Counter();
a.increment();
console.log(a.count, b.count);`,
    options: ['1, 1', '1, 0', '0, 1', '1, undefined'],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Each object gets its own `count` property. When `a.increment()` is called, it increments only `a`\'s count to 1. Object `b` has its own separate count property which remains 0.',
    keyConcept: 'Each instance has independent state. Changes to one instance do not affect others.',
    xpReward: 10,
    tags: ['class', 'object', 'state', 'independence'],
  },

  // ─── Topic 3: Constructor & this (oop-11 to oop-15) ───
  {
    id: 'oop-11',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'easy',
    question: 'What is the purpose of a constructor in a class?',
    options: [
      'To initialize the object\'s properties when it is created',
      'To destroy the object when it is no longer needed',
      'To define static methods on the class',
      'To create a copy of the class blueprint',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A constructor is a special method that is automatically called when an object is created. It initializes the object\'s properties and sets up the initial state.',
    keyConcept: 'Constructors initialize new objects. They run once at creation time and set up initial property values.',
    xpReward: 5,
    tags: ['constructor', 'initialization', 'basics'],
  },
  {
    id: 'oop-12',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'medium',
    question: 'What does the `this` keyword refer to inside a class method?',
    codeSnippet: `class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
}
const p = new Person("Alice");
console.log(p.greet());`,
    options: [
      'The object that the method was called on (the instance)',
      'The class itself',
      'The global/window object',
      'The constructor function',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Inside a class method, `this` refers to the object instance that the method was called on. When `p.greet()` is called, `this` inside `greet()` refers to the `p` object.',
    keyConcept: '`this` in a method refers to the object that called the method. It provides access to the instance\'s properties.',
    xpReward: 10,
    tags: ['this', 'context', 'method'],
  },
  {
    id: 'oop-13',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'medium',
    question: 'What happens if you don\'t define a constructor in a JavaScript class?',
    options: [
      'JavaScript provides a default empty constructor',
      'The class cannot be instantiated',
      'An error is thrown at runtime',
      'The parent class constructor is not called',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'If you don\'t define a constructor, JavaScript automatically provides a default empty constructor. For a base class, it\'s `constructor() {}`. For a derived class, it\'s `constructor(...args) { super(...args); }`.',
    keyConcept: 'Every class has a constructor — either explicitly defined or implicitly provided by JavaScript.',
    xpReward: 10,
    tags: ['constructor', 'default', 'javascript'],
  },
  {
    id: 'oop-14',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'medium',
    question: 'What will the following code output?',
    codeSnippet: `class Parent {
  constructor() {
    console.log("Parent");
  }
}
class Child extends Parent {
  constructor() {
    console.log("Child");
  }
}
new Child();`,
    options: ['"Child" then "Parent"', '"Parent" then "Child"', 'ReferenceError', 'TypeError'],
    correctAnswer: [3],
    type: 'single',
    explanation: 'In JavaScript, a derived class constructor must call `super()` before using `this`. Failure to call `super()` results in a ReferenceError. The correct code would be: `constructor() { super(); console.log("Child"); }`.',
    keyConcept: 'In derived classes, you MUST call `super()` before accessing `this` in the constructor.',
    xpReward: 15,
    tags: ['constructor', 'super', 'inheritance', 'error'],
  },
  {
    id: 'oop-15',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'hard',
    question: 'What will this code log?',
    codeSnippet: `const obj = {
  name: "Alice",
  greet: () => {
    console.log(\`Hello, \${this.name}\`);
  },
};
obj.greet();`,
    options: ['"Hello, Alice"', '"Hello, undefined"', '"Hello, "', 'ReferenceError'],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Arrow functions do not have their own `this`. They inherit `this` from the enclosing lexical scope. Here, the enclosing scope is the global/module scope, not the `obj` object. So `this.name` is `undefined`.',
    keyConcept: 'Arrow functions capture `this` from the surrounding lexical scope. Regular functions get `this` from the caller.',
    xpReward: 15,
    tags: ['this', 'arrow-function', 'lexical-scope'],
  },

  // ─── Topic 4: Encapsulation (oop-16 to oop-20) ───
  {
    id: 'oop-16',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'easy',
    question: 'What is encapsulation in OOP?',
    options: [
      'Bundling data and methods together and hiding internal details',
      'Creating multiple classes from a single base class',
      'Changing the behavior of a method at runtime',
      'Dividing a program into multiple files',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Encapsulation is the bundling of data (properties) and methods (behavior) that operate on that data into a single unit (class), while restricting direct access to some of the object\'s internal components.',
    keyConcept: 'Encapsulation = data hiding + bundling. Keep internal state private, expose only what\'s necessary.',
    xpReward: 5,
    tags: ['encapsulation', 'data-hiding', 'basics'],
  },
  {
    id: 'oop-17',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'medium',
    question: 'How is encapsulation typically achieved in class-based languages?',
    options: [
      'Using access modifiers like private and public',
      'Using the extends keyword',
      'Using abstract methods',
      'Using static methods',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Encapsulation is achieved through access modifiers (private, protected, public) that control visibility of class members. Private members cannot be accessed from outside the class, enforcing data hiding.',
    keyConcept: 'Access modifiers (private, protected, public) enforce encapsulation by controlling visibility of class members.',
    xpReward: 10,
    tags: ['encapsulation', 'access-modifiers', 'private'],
  },
  {
    id: 'oop-18',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'medium',
    question: 'What will this JavaScript code output?',
    codeSnippet: `class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance());
console.log(acc.#balance);`,
    options: ['100, 100', '100, undefined', '100, SyntaxError', '100, 0'],
    correctAnswer: [2],
    type: 'single',
    explanation: 'The `#balance` is a private field (ES2020+). `acc.getBalance()` works because the method is inside the class and can access private fields. `acc.#balance` throws a SyntaxError because private fields cannot be accessed from outside the class.',
    keyConcept: 'JavaScript `#` prefix creates true private fields. Accessing them outside the class throws an error.',
    xpReward: 15,
    tags: ['encapsulation', 'private-fields', 'javascript', 'syntax'],
  },
  {
    id: 'oop-19',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'easy',
    question: 'What is the main benefit of encapsulation?',
    options: [
      'Protects internal data from unintended modification',
      'Makes the code run faster',
      'Reduces the number of classes needed',
      'Eliminates the need for constructors',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Encapsulation protects an object\'s internal state from unintended or harmful modification by external code. It enforces controlled access through public methods, ensuring data integrity.',
    keyConcept: 'Encapsulation prevents external code from directly modifying internal state, protecting data integrity.',
    xpReward: 5,
    tags: ['encapsulation', 'benefit', 'data-integrity'],
  },
  {
    id: 'oop-20',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'medium',
    question: 'What is the purpose of getters and setters in encapsulation?',
    codeSnippet: `class Temperature {
  #celsius = 0;
  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }
  set fahrenheit(value) {
    this.#celsius = (value - 32) * 5/9;
  }
}`,
    options: [
      'To provide controlled access to private fields with validation logic',
      'To make all properties publicly accessible',
      'To delete private fields from the object',
      'To create copies of the object',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Getters and setters provide controlled access to private fields. They allow validation, transformation, or computation when getting or setting values, while keeping the internal representation hidden.',
    keyConcept: 'Getters/setters enable computed properties and validation on access. They expose a controlled interface over private data.',
    xpReward: 10,
    tags: ['encapsulation', 'getters', 'setters', 'accessors'],
  },

  // ─── Topic 5: Abstraction (oop-21 to oop-25) ───
  {
    id: 'oop-21',
    technology: 'oops',
    topic: 'Abstraction',
    difficulty: 'easy',
    question: 'What is abstraction in OOP?',
    options: [
      'Hiding complex implementation details and showing only essential features',
      'Making all methods public',
      'Creating multiple objects from one class',
      'Copying properties from one object to another',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Abstraction means hiding the complex implementation details and exposing only the essential features of an object. It reduces complexity by providing a simple interface.',
    keyConcept: 'Abstraction hides complexity. Users interact with a simple interface without knowing internal details.',
    xpReward: 5,
    tags: ['abstraction', 'hiding-complexity', 'basics'],
  },
  {
    id: 'oop-22',
    technology: 'oops',
    topic: 'Abstraction',
    difficulty: 'medium',
    question: 'How is abstraction different from encapsulation?',
    options: [
      'Abstraction hides implementation complexity; encapsulation hides data and bundles it with methods',
      'They are the same concept with different names',
      'Encapsulation hides complexity; abstraction hides data',
      'Abstraction is about security; encapsulation is about performance',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Abstraction focuses on hiding implementation complexity by providing a simplified interface. Encapsulation focuses on hiding internal data and bundling it with methods that operate on it. Abstraction = what it does. Encapsulation = how it protects its data.',
    keyConcept: 'Abstraction = hiding complexity (interface). Encapsulation = hiding data (access control). They work together.',
    xpReward: 10,
    tags: ['abstraction', 'encapsulation', 'difference'],
  },
  {
    id: 'oop-23',
    technology: 'oops',
    topic: 'Abstraction',
    difficulty: 'hard',
    question: 'What is an abstract class?',
    codeSnippet: `// TypeScript example
abstract class Shape {
  abstract getArea(): number;
  getDescription(): string {
    return \`Area: \${this.getArea()}\`;
  }
}
class Circle extends Shape {
  constructor(private radius: number) { super(); }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}`,
    options: [
      'A class that cannot be instantiated directly and may contain abstract (unimplemented) methods',
      'A class that can only create one object',
      'A class that has no methods, only properties',
      'A class that cannot be inherited from',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'An abstract class cannot be instantiated directly. It serves as a base class that defines a common interface, with some methods left abstract (unimplemented) for subclasses to implement. It can also contain concrete (implemented) methods.',
    keyConcept: 'Abstract classes provide partial implementation. Subclasses complete the missing pieces. Use when related classes share structure.',
    xpReward: 15,
    tags: ['abstraction', 'abstract-class', 'inheritance'],
  },
  {
    id: 'oop-24',
    technology: 'oops',
    topic: 'Abstraction',
    difficulty: 'easy',
    question: 'Which of the following is a real-world example of abstraction?',
    options: [
      'A car\'s steering wheel and pedals — you drive without knowing engine mechanics',
      'A calculator showing each internal calculation step',
      'A phone that requires you to know its circuit design to make a call',
      'A house where all wiring is exposed on the walls',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A car\'s steering wheel and pedals provide a simple interface while hiding the complex engine, transmission, and fuel systems. This is abstraction — providing essential controls while hiding complexity.',
    keyConcept: 'Abstraction is everywhere in daily life: remote controls, car dashboards, smartphone interfaces.',
    xpReward: 5,
    tags: ['abstraction', 'real-world', 'analogy'],
  },
  {
    id: 'oop-25',
    technology: 'oops',
    topic: 'Abstraction',
    difficulty: 'medium',
    question: 'What is the purpose of an interface in achieving abstraction?',
    options: [
      'To define a contract of what methods a class must implement, without providing implementation',
      'To provide a complete implementation of all methods',
      'To store data for the class',
      'To improve performance by skipping implementation details',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'An interface defines a contract — a set of method signatures that implementing classes must provide. The interface specifies WHAT to do, and each class decides HOW to do it. This achieves abstraction by separating specification from implementation.',
    keyConcept: 'Interfaces define WHAT (contract). Classes define HOW (implementation). This is the essence of abstraction.',
    xpReward: 10,
    tags: ['abstraction', 'interface', 'contract'],
  },

  // ─── Topic 6: Inheritance (oop-26 to oop-30) ───
  {
    id: 'oop-26',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'easy',
    question: 'What is inheritance in OOP?',
    options: [
      'A mechanism where one class acquires properties and methods of another class',
      'A way to hide data from other classes',
      'A technique to create multiple objects',
      'A method of deleting unused objects',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). This promotes code reuse and establishes a hierarchical relationship.',
    keyConcept: 'Inheritance establishes an IS-A relationship. A Dog IS-AN Animal. It enables code reuse through hierarchical classification.',
    xpReward: 5,
    tags: ['inheritance', 'reuse', 'is-a'],
  },
  {
    id: 'oop-27',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'medium',
    question: 'What does the `extends` keyword do in this code?',
    codeSnippet: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}
class Dog extends Animal {
  speak() {
    return \`\${this.name} barks\`;
  }
}
const d = new Dog("Rex");
console.log(d.speak());`,
    options: [
      'Dog inherits from Animal and overrides the speak method',
      'Dog creates a copy of Animal\'s methods',
      'Dog and Animal become the same class',
      'Dog can only use its own methods, not Animal\'s',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`extends` makes Dog a subclass of Animal. Dog inherits the constructor from Animal (via `super()`) and overrides the `speak()` method. The output is "Rex barks" because Dog\'s version takes precedence.',
    keyConcept: '`extends` creates inheritance. Overriding replaces parent methods with child-specific implementations.',
    xpReward: 10,
    tags: ['inheritance', 'extends', 'override'],
  },
  {
    id: 'oop-28',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'easy',
    question: 'What type of relationship does inheritance represent?',
    options: ['IS-A relationship', 'HAS-A relationship', 'USES-A relationship', 'PART-OF relationship'],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Inheritance represents an IS-A relationship. For example, a Dog IS-AN Animal, a Car IS-A Vehicle. If the relationship is HAS-A (a Car HAS-AN Engine), composition should be used instead.',
    keyConcept: 'IS-A = inheritance. HAS-A = composition. Choosing correctly is crucial for good design.',
    xpReward: 5,
    tags: ['inheritance', 'is-a', 'relationship'],
  },
  {
    id: 'oop-29',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'medium',
    question: 'What is the output of this code?',
    codeSnippet: `class A {
  constructor() { console.log("A"); }
}
class B extends A {
  constructor() {
    super();
    console.log("B");
  }
}
class C extends B {
  constructor() {
    super();
    console.log("C");
  }
}
new C();`,
    options: ['"A", "B", "C"', '"C", "B", "A"', '"A", "C", "B"', '"C", "A", "B"'],
    correctAnswer: [0],
    type: 'single',
    explanation: 'When creating a `C` instance, constructors chain from parent to child. First `super()` in C calls B\'s constructor, which calls `super()` to A\'s constructor. A logs first, then B, then C. The chain is: A → B → C.',
    keyConcept: 'Constructor chaining goes from parent to child. Each `super()` call goes up the chain before the current constructor runs.',
    xpReward: 10,
    tags: ['inheritance', 'constructor-chain', 'super'],
  },
  {
    id: 'oop-30',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'hard',
    question: 'What is a common problem with deep inheritance hierarchies (5+ levels)?',
    options: [
      'The fragile base class problem — changes at the top can break subclasses unpredictably',
      'Objects use too much memory',
      'The code compiles slower',
      'Methods cannot be overridden in deep hierarchies',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Deep inheritance leads to the fragile base class problem: a change in a base class can have unintended effects on all subclasses. This makes the code hard to maintain and refactor. Composition is often preferred over deep inheritance.',
    keyConcept: 'Prefer shallow hierarchies. Use composition over inheritance to avoid the fragile base class problem.',
    xpReward: 15,
    tags: ['inheritance', 'fragile-base-class', 'design'],
  },

  // ─── Topic 7: Polymorphism (oop-31 to oop-35) ───
  {
    id: 'oop-31',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'easy',
    question: 'What does polymorphism mean in OOP?',
    options: [
      'The ability of objects to take many forms — the same interface can work with different types',
      'The ability to create multiple objects from a class',
      'The process of converting one data type to another',
      'The ability to hide data from other classes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Polymorphism (Greek for "many forms") allows objects of different classes to respond to the same method call in their own way. The same interface can work with different underlying types.',
    keyConcept: 'Polymorphism: same method name, different implementations. "One interface, many implementations."',
    xpReward: 5,
    tags: ['polymorphism', 'many-forms', 'basics'],
  },
  {
    id: 'oop-32',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'medium',
    question: 'What are the two main types of polymorphism?',
    options: [
      'Compile-time (overloading) and Runtime (overriding)',
      'Static and Dynamic',
      'Public and Private',
      'Direct and Indirect',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Compile-time polymorphism (method overloading) is resolved at compile time based on parameters. Runtime polymorphism (method overriding) is resolved at runtime when a subclass provides its own implementation of a parent method.',
    keyConcept: 'Overloading = same name, different params (compile time). Overriding = same signature, different impl (runtime).',
    xpReward: 10,
    tags: ['polymorphism', 'overloading', 'overriding'],
  },
  {
    id: 'oop-33',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'medium',
    question: 'What will this code output?',
    codeSnippet: `class Animal {
  speak() { return "Some sound"; }
}
class Cat extends Animal {
  speak() { return "Meow"; }
}
class Dog extends Animal {
  speak() { return "Woof"; }
}
function makeSound(animal) {
  console.log(animal.speak());
}
makeSound(new Animal());
makeSound(new Cat());
makeSound(new Dog());`,
    options: [
      '"Some sound", "Meow", "Woof"',
      '"Some sound", "Some sound", "Some sound"',
      '"Meow", "Woof", "Some sound"',
      'TypeError',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Despite the parameter type being `Animal`, each object calls its own overridden `speak()` method at runtime. This is runtime polymorphism — the exact method is determined by the actual object type, not the variable type.',
    keyConcept: 'Polymorphism: the JVM/runtime calls the actual object\'s method, not the reference type\'s method.',
    xpReward: 10,
    tags: ['polymorphism', 'runtime', 'override'],
  },
  {
    id: 'oop-34',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'medium',
    question: 'What is duck typing?',
    codeSnippet: `// If it walks like a duck and quacks like a duck...
function makeItQuack(duck) {
  console.log(duck.quack());
}
makeItQuack({ quack: () => "Quack!" });
makeItQuack({ quack: () => "Moo?" }); // Still works!`,
    options: [
      'An object\'s suitability is determined by its methods and properties, not its type',
      'A design pattern for creating duck objects',
      'A feature only available in statically-typed languages',
      'A way to optimize object creation',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Duck typing (from "if it walks like a duck...") means an object\'s type is determined by its behavior, not its declared type. If an object has the required methods, it can be used regardless of its class hierarchy.',
    keyConcept: 'Duck typing: "If it walks like a duck and quacks like a duck, it\'s a duck." Common in Python and JavaScript.',
    xpReward: 10,
    tags: ['polymorphism', 'duck-typing', 'dynamic'],
  },
  {
    id: 'oop-35',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'hard',
    question: 'What does this TypeScript code demonstrate?',
    codeSnippet: `interface PaymentProcessor {
  process(amount: number): string;
}
class CreditCard implements PaymentProcessor {
  process(amount: number) {
    return \`Charged \$\${amount} to card\`;
  }
}
class PayPal implements PaymentProcessor {
  process(amount: number) {
    return \`Charged \$\${amount} via PayPal\`;
  }
}
function checkout(processor: PaymentProcessor, amount: number) {
  return processor.process(amount);
}`,
    options: [
      'Polymorphism through interfaces — different implementations of the same contract',
      'Method overloading — same method, different parameters',
      'Encapsulation — data hiding through interfaces',
      'Inheritance — extending a base class',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'This demonstrates polymorphism through interfaces. Both `CreditCard` and `PayPal` implement the same `PaymentProcessor` interface. The `checkout` function works with any implementation, and the correct `process` method is called based on the actual object type.',
    keyConcept: 'Interfaces enable polymorphic behavior. Code against interfaces, not concrete implementations.',
    xpReward: 15,
    tags: ['polymorphism', 'interface', 'typescript'],
  },

  // ─── Topic 8: SOLID Principles (oop-36 to oop-40) ───
  {
    id: 'oop-36',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'easy',
    question: 'What does the SOLID acronym stand for?',
    options: [
      'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion',
      'Simple, Object-oriented, Logical, Integrated, Dynamic',
      'Standard Object Language Interface Design',
      'Structured, Ordered, Linear, Inherited, Defined',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'SOLID is an acronym for five design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. Together they guide maintainable OOP design.',
    keyConcept: 'SOLID = SRP, OCP, LSP, ISP, DIP. These principles help create maintainable, scalable object-oriented code.',
    xpReward: 10,
    tags: ['solid', 'principles', 'design'],
  },
  {
    id: 'oop-37',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'medium',
    question: 'Which SOLID principle is violated in this code?',
    codeSnippet: `class Report {
  generate() { /* generate data */ }
  printPDF() { /* print to PDF */ }
  sendEmail() { /* send via email */ }
  saveToDB() { /* save to database */ }
}`,
    options: [
      'Single Responsibility Principle — the class has multiple reasons to change',
      'Open/Closed Principle — the class is not open for extension',
      'Liskov Substitution — the class cannot be substituted',
      'Interface Segregation — the interface is too small',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'This class violates SRP because it has multiple responsibilities: generating data, printing, sending emails, and database operations. Each is a separate reason to change. It should be split into separate classes.',
    keyConcept: 'SRP: A class should have only one reason to change. Split responsibilities into focused classes.',
    xpReward: 15,
    tags: ['solid', 'srp', 'single-responsibility'],
  },
  {
    id: 'oop-38',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'medium',
    question: 'What does the Open/Closed Principle state?',
    options: [
      'Classes should be open for extension but closed for modification',
      'Classes should be open for modification but closed for extension',
      'All methods should be public',
      'Classes should have only one method',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'OCP means you should be able to extend a class\'s behavior (via inheritance, composition, or interfaces) without modifying its source code. New functionality is added through new code, not changes to existing, tested code.',
    keyConcept: 'OCP: Extend behavior through new classes, not by modifying existing ones. Use inheritance and interfaces.',
    xpReward: 10,
    tags: ['solid', 'ocp', 'open-closed'],
  },
  {
    id: 'oop-39',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'hard',
    question: 'Which scenario violates the Liskov Substitution Principle?',
    codeSnippet: `class Rectangle {
  setWidth(w) { this.width = w; }
  setHeight(h) { this.height = h; }
  getArea() { return this.width * this.height; }
}
class Square extends Rectangle {
  setWidth(w) {
    this.width = w;
    this.height = w;  // Maintains square invariant
  }
  setHeight(h) {
    this.width = h;
    this.height = h;
  }
}`,
    options: [
      'Square changes the behavior of setWidth/setHeight in a way that surprises callers expecting Rectangle behavior',
      'Square inherits from Rectangle correctly with no issues',
      'Square should not have a getArea method',
      'Square uses more memory than Rectangle',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'This classic LSP violation occurs because a `Square` changes `setWidth` and `setHeight` to also set the other dimension. Code that works with a `Rectangle` and separately calls `setWidth(5)` then `setHeight(10)` expecting area 50 will get 100 from a `Square` instead.',
    keyConcept: 'LSP: Subtypes must be substitutable for their base types without altering the correctness of the program.',
    xpReward: 20,
    tags: ['solid', 'lsp', 'liskov-substitution'],
  },
  {
    id: 'oop-40',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'hard',
    question: 'What does the Dependency Inversion Principle (DIP) recommend?',
    codeSnippet: `// Instead of this:
class UserService {
  constructor() {
    this.db = new MySQLDatabase();
  }
}
// Do this:
class UserService {
  constructor(database) {
    this.db = database;  // Depends on abstraction
  }
}`,
    options: [
      'High-level modules should not depend on low-level modules; both should depend on abstractions',
      'All classes should depend on concrete implementations',
      'Dependencies should only be injected through constructors',
      'No class should have any dependencies',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'DIP states that high-level modules (business logic) should not depend on low-level modules (database, network). Both should depend on abstractions (interfaces). This decouples the code and makes it easier to swap implementations.',
    keyConcept: 'DIP: Depend on abstractions, not concretions. Inject dependencies rather than creating them inside the class.',
    xpReward: 15,
    tags: ['solid', 'dip', 'dependency-inversion'],
  },

  // ─── Topic 9: Relationships (oop-41 to oop-45) ───
  {
    id: 'oop-41',
    technology: 'oops',
    topic: 'Relationships',
    difficulty: 'easy',
    question: 'What is association in OOP?',
    options: [
      'A relationship where one object knows about and uses another object',
      'A parent-child inheritance relationship',
      'The process of creating a new object',
      'A way to destroy unused objects',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Association is a relationship where one object has a reference to another and can communicate with it. Both objects have independent lifetimes. For example, a Teacher and Student are associated — they know about each other but can exist independently.',
    keyConcept: 'Association = objects know about each other. Both have independent lifetimes. The weakest type of relationship.',
    xpReward: 5,
    tags: ['relationships', 'association', 'basics'],
  },
  {
    id: 'oop-42',
    technology: 'oops',
    topic: 'Relationships',
    difficulty: 'medium',
    question: 'What is the difference between aggregation and composition?',
    options: [
      'Aggregation is a weak HAS-A (part can exist without whole); Composition is a strong HAS-A (part dies with the whole)',
      'Aggregation is for inheritance; Composition is for interfaces',
      'Aggregation means the child class inherits from the parent; Composition means the parent creates the child',
      'There is no difference — they are synonyms',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Aggregation: the part can exist independently of the whole (e.g., a Department has Teachers — if the department closes, teachers still exist). Composition: the part cannot exist without the whole (e.g., a House has Rooms — if the house is destroyed, rooms cease to exist).',
    keyConcept: 'Composition = strong ownership (part dies with whole). Aggregation = weak ownership (part survives whole).',
    xpReward: 10,
    tags: ['relationships', 'aggregation', 'composition'],
  },
  {
    id: 'oop-43',
    technology: 'oops',
    topic: 'Relationships',
    difficulty: 'medium',
    question: 'Which relationship does this code represent?',
    codeSnippet: `class Room {
  constructor(name) { this.name = name; }
}
class House {
  constructor() {
    this.rooms = [
      new Room("Living"),
      new Room("Bedroom"),
    ];
  }
}
const house = new House();
// When house is destroyed, rooms are destroyed too`,
    options: ['Composition', 'Aggregation', 'Association', 'Inheritance'],
    correctAnswer: [0],
    type: 'single',
    explanation: 'This is composition because rooms are created inside the House constructor and are owned by the House. When the House object is garbage collected, the Room objects owned by it become unreachable. Rooms have no independent existence outside the House.',
    keyConcept: 'Composition: `new Room()` inside the constructor implies creation-time ownership and lifetime dependency.',
    xpReward: 10,
    tags: ['relationships', 'composition', 'example'],
  },
  {
    id: 'oop-44',
    technology: 'oops',
    topic: 'Relationships',
    difficulty: 'easy',
    question: 'What is UML primarily used for in OOP?',
    options: [
      'Visually representing classes, relationships, and object interactions in a standardized way',
      'Compiling object-oriented code',
      'Testing object-oriented programs',
      'Managing object memory allocation',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'UML (Unified Modeling Language) is a standardized visual language for representing OOP designs. Class diagrams show classes with their attributes, methods, and relationships (inheritance, association, composition, etc.).',
    keyConcept: 'UML class diagrams visually document OOP design: classes, relationships, and multiplicities.',
    xpReward: 5,
    tags: ['relationships', 'uml', 'diagrams'],
  },
  {
    id: 'oop-45',
    technology: 'oops',
    topic: 'Relationships',
    difficulty: 'medium',
    question: 'What does a dependency relationship mean?',
    codeSnippet: `class OrderService {
  calculateTotal(order) {
    const taxService = new TaxService();
    return order.subtotal + taxService.calculate(order);
  }
}`,
    options: [
      'A temporary, weaker relationship where a class uses another class as a method parameter or local variable',
      'A permanent relationship where one class owns another',
      'An inheritance relationship between parent and child',
      'A relationship where one class stores another as a property',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Dependency is the weakest relationship. Class A depends on Class B if B is used as a method parameter, local variable, or return type. Unlike association, the dependency is temporary and not stored as a field.',
    keyConcept: 'Dependency = temporary use (method param, local var). Weaker than association, no field reference.',
    xpReward: 10,
    tags: ['relationships', 'dependency', 'usage'],
  },

  // ─── Topic 10: Interfaces & Abstract (oop-46 to oop-50) ───
  {
    id: 'oop-46',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'easy',
    question: 'What is an interface in OOP?',
    options: [
      'A contract that specifies what methods a class must implement, without providing implementation',
      'A class that cannot be inherited from',
      'A concrete class with all methods implemented',
      'A variable that holds a reference to an object',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'An interface defines a contract — a set of method signatures (and sometimes properties) that implementing classes must provide. Interfaces contain no implementation; they specify only WHAT to do, not HOW.',
    keyConcept: 'Interfaces define WHAT. Classes define HOW. Interfaces enable abstraction and loose coupling.',
    xpReward: 5,
    tags: ['interface', 'contract', 'abstraction'],
  },
  {
    id: 'oop-47',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'medium',
    question: 'What does this TypeScript interface enforce?',
    codeSnippet: `interface Flyable {
  fly(): void;
  land(): void;
}
class Bird implements Flyable {
  fly() { console.log("Flying"); }
  land() { console.log("Landing"); }
}`,
    options: [
      'Bird must implement both fly() and land() methods — TypeScript will error if they are missing',
      'Bird automatically gets fly() and land() from the interface',
      'The interface provides default implementations of fly() and land()',
      'Bird can choose which methods to implement from the interface',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'When a class `implements` an interface, it must provide implementations for all methods declared in the interface. TypeScript (and statically-typed languages) will throw a compile-time error if any method is missing.',
    keyConcept: '`implements` enforces a contract. All interface methods must be implemented, or the code won\'t compile.',
    xpReward: 10,
    tags: ['interface', 'typescript', 'implements'],
  },
  {
    id: 'oop-48',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'medium',
    question: 'What is a key difference between an abstract class and an interface?',
    options: [
      'An abstract class can have some implemented methods and state; an interface traditionally has no implementation or state',
      'Interfaces can have constructors; abstract classes cannot',
      'Abstract classes support multiple inheritance; interfaces do not',
      'There is no difference — they are interchangeable',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'An abstract class can have both abstract (unimplemented) and concrete (implemented) methods, as well as fields/state. An interface traditionally defines only method signatures. In TypeScript/Java, a class can implement multiple interfaces but extend only one abstract class.',
    keyConcept: 'Abstract class = partial implementation + state. Interface = pure contract. Use abstract for related classes, interface for capabilities.',
    xpReward: 10,
    tags: ['interface', 'abstract-class', 'comparison'],
  },
  {
    id: 'oop-49',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'easy',
    question: 'Can you create an object directly from an abstract class?',
    options: [
      'No — abstract classes cannot be instantiated directly',
      'Yes — abstract classes work like regular classes',
      'Yes, but only if all methods are implemented',
      'No — abstract classes do not have constructors',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Abstract classes cannot be instantiated directly. They are designed to be base classes that are extended by concrete subclasses. The subclass must implement all abstract methods before it can be instantiated.',
    keyConcept: 'Abstract classes are incomplete. They serve as base classes and require a concrete subclass for instantiation.',
    xpReward: 5,
    tags: ['abstract-class', 'instantiation', 'basics'],
  },
  {
    id: 'oop-50',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'medium',
    question: 'What does the `implements` keyword signify?',
    codeSnippet: `// TypeScript
interface Drawable {
  draw(): void;
}
interface Resizable {
  resize(factor: number): void;
}
class Circle implements Drawable, Resizable {
  draw() { /* ... */ }
  resize(f: number) { /* ... */ }
}`,
    options: [
      'The class promises to fulfill the contracts defined by the interfaces',
      'The class automatically inherits method implementations from the interfaces',
      'The class becomes abstract',
      'The class can only implement one interface',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`implements` means the class agrees to fulfill all the contracts defined by the specified interfaces. A class can implement multiple interfaces (as shown — Circle implements both Drawable and Resizable), enabling flexible type composition.',
    keyConcept: '`implements` is a promise to satisfy the interface contract. Multiple interfaces can be implemented by one class.',
    xpReward: 10,
    tags: ['interface', 'implements', 'typescript'],
  },

  // ─── Topic 11: Access & Design (oop-51 to oop-55) ───
  {
    id: 'oop-51',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'easy',
    question: 'What are access modifiers in OOP?',
    options: [
      'Keywords that control the visibility and accessibility of class members',
      'Methods that modify object properties',
      'Variables that store access permissions',
      'Decorators that add functionality to methods',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Access modifiers (like public, private, protected) control where class members (properties and methods) can be accessed from. They are fundamental to implementing encapsulation.',
    keyConcept: 'Access modifiers enforce encapsulation: public (anywhere), protected (class + subclasses), private (class only).',
    xpReward: 5,
    tags: ['access-modifiers', 'visibility', 'basics'],
  },
  {
    id: 'oop-52',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'easy',
    question: 'What does the `private` access modifier do?',
    options: [
      'Restricts access to only within the same class',
      'Allows access from any class',
      'Allows access from the class and its subclasses',
      'Makes the member accessible only within the same file',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`private` restricts access to only within the declaring class. Not even subclasses can access private members. This is the most restrictive access level and provides the strongest encapsulation.',
    keyConcept: 'Private = class-only access. Strongest encapsulation. Use for internal implementation details.',
    xpReward: 5,
    tags: ['access-modifiers', 'private', 'encapsulation'],
  },
  {
    id: 'oop-53',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'medium',
    question: 'What does the DRY principle stand for and what does it mean?',
    options: [
      'Don\'t Repeat Yourself — avoid code duplication by extracting shared logic',
      'Dynamic Resource Yielding — optimize memory usage',
      'Data Retrieval Yield — optimize database queries',
      'Direct Return Yielding — return values directly without variables',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'DRY (Don\'t Repeat Yourself) means every piece of knowledge should have a single, unambiguous representation in the system. Duplication leads to maintenance issues — changes must be made in multiple places, increasing the risk of inconsistencies.',
    keyConcept: 'DRY: Extract duplicated code into reusable methods, classes, or modules. One source of truth for each concept.',
    xpReward: 10,
    tags: ['design', 'dry', 'principles'],
  },
  {
    id: 'oop-54',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What does "Favor composition over inheritance" mean?',
    codeSnippet: `// Inheritance approach:
class Pizza {
  /* ... */
}
class PepperoniPizza extends Pizza {
  /* ... */
}

// Composition approach:
class Pizza {
  constructor(toppings) {
    this.toppings = toppings;
  }
}
const pizza = new Pizza([new Pepperoni()]);`,
    options: [
      'Prefer assembling objects from smaller, focused components (HAS-A) rather than deep class hierarchies (IS-A)',
      'Always use inheritance instead of composition',
      'Composition is only for interfaces, not classes',
      'Inheritance should always be preferred for code reuse',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Composition (HAS-A) offers more flexibility than inheritance (IS-A). With composition, you can mix and match behaviors, change them at runtime, and avoid the fragile base class problem. Deep inheritance hierarchies are rigid and hard to maintain.',
    keyConcept: 'Composition = flexible, runtime-changeable. Inheritance = rigid, compile-time-fixed. Prefer composition for most cases.',
    xpReward: 15,
    tags: ['design', 'composition', 'inheritance', 'comparison'],
  },
  {
    id: 'oop-55',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What is the Law of Demeter (Principle of Least Knowledge)?',
    codeSnippet: `// Violates Law of Demeter:
customer.getOrder().getItem().getPrice();

// Follows Law of Demeter:
customer.getItemPrice(itemId);`,
    options: [
      'An object should only communicate with its immediate neighbors, not with objects 2+ levels away',
      'Every class should have exactly one public method',
      'All methods should be private by default',
      'Objects should never call methods on other objects',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The Law of Demeter states that a method should only call methods on: the object itself, its own parameters, objects it creates, or its direct component fields. Chained calls like `a.getB().getC().doSomething()` violate this, creating tight coupling.',
    keyConcept: 'Law of Demeter: "Don\'t talk to strangers." Only interact with immediate dependencies. Avoid deep method chaining.',
    xpReward: 15,
    tags: ['design', 'law-of-demeter', 'coupling'],
  },

  // ─── New Questions ───
  // ─── Design Patterns & Advanced OOP (oop-56 to oop-65) ───
  {
    id: 'oop-56',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What is the Observer design pattern?',
    codeSnippet: `// Subject maintains a list of observers and notifies them
class Subject {
  constructor() { this.observers = []; }
  subscribe(obs) { this.observers.push(obs); }
  notify(data) { this.observers.forEach(o => o.update(data)); }
}`,
    options: [
      'A pattern where an object (subject) maintains a list of dependents (observers) and notifies them of state changes',
      'A pattern that restricts object creation to a single instance',
      'A pattern that provides a simplified interface to a complex subsystem',
      'A pattern that creates objects without specifying their concrete classes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The Observer pattern defines a one-to-many dependency between objects. When the subject changes state, all its observers are notified and updated automatically. Common in event-driven systems, MVC architecture, and reactive programming (RxJS Observables).',
    keyConcept: 'Observer: one-to-many notification. Used in event systems, pub/sub, MVC. Loose coupling between subject and observers.',
    xpReward: 15,
    tags: ['design-patterns', 'observer', 'events'],
  },
  {
    id: 'oop-57',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What is the Singleton pattern and when should it be used?',
    options: [
      'Ensures a class has only one instance and provides a global point of access to it; use for logging, config, thread pools',
      'Creates multiple instances of a class for better performance',
      'Allows a class to be instantiated multiple times with the same state',
      'Provides a way to create objects without using the new keyword',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Singleton ensures a class has exactly one instance and provides a global access point. It is useful for shared resources like logging, configuration managers, connection pools, and caches. However, it can make code harder to test (tight coupling) and should be used sparingly.',
    keyConcept: 'Singleton: private constructor, static instance, global access. Can cause hidden dependencies and testing difficulties.',
    xpReward: 15,
    tags: ['design-patterns', 'singleton', 'creation'],
  },
  {
    id: 'oop-58',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What is the Factory pattern used for?',
    codeSnippet: `// Factory method creates objects without exposing creation logic
class LoggerFactory {
  create(type) {
    if (type === 'file') return new FileLogger();
    if (type === 'console') return new ConsoleLogger();
    if (type === 'cloud') return new CloudLogger();
    throw new Error('Unknown logger type');
  }
}`,
    options: [
      'Defines an interface for creating objects but lets subclasses decide which class to instantiate',
      'Creates a single instance of a class',
      'Allows incompatible interfaces to work together',
      'Provides a simplified interface to a complex system',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The Factory Method pattern defines an interface for creating objects, but lets subclasses or methods decide which concrete class to instantiate. It encapsulates object creation, making the code more flexible and decoupled from specific implementations.',
    keyConcept: 'Factory: encapsulates object creation, promotes loose coupling. Use when creation logic is complex or may vary.',
    xpReward: 15,
    tags: ['design-patterns', 'factory', 'creation'],
  },
  {
    id: 'oop-59',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'medium',
    question: 'What is dependency injection?',
    codeSnippet: `// Without DI: class creates its own dependencies
class EmailService {
  constructor() { this.transporter = new SMTPTransport(); }
}

// With DI: dependencies are passed in
class EmailService {
  constructor(transporter) { this.transporter = transporter; }
}`,
    options: [
      'A technique where an object receives its dependencies from an external source rather than creating them itself',
      'A pattern that prevents any class from having dependencies',
      'A method of copying dependencies between objects',
      'A way to automatically detect class dependencies at compile time',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Dependency injection (DI) is a technique where dependencies (objects a class needs) are provided externally (via constructor, setter, or interface) rather than created internally. This promotes loose coupling, testability (easy to mock), and adherence to DIP.',
    keyConcept: 'DI: inject dependencies from outside. Benefits: testability, flexibility, loose coupling. Common in frameworks like Angular, Spring.',
    xpReward: 10,
    tags: ['di', 'dependency-injection', 'design'],
  },
  {
    id: 'oop-60',
    technology: 'oops',
    topic: 'What is OOP?',
    difficulty: 'easy',
    question: 'What is the difference between a class and an object?',
    options: [
      'A class is a blueprint; an object is an instance created from that blueprint',
      'A class is created at runtime; an object is defined at compile time',
      'A class can be used directly; an object is just a template',
      'There is no difference — they are the same thing',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A class is a compile-time definition (blueprint) that specifies the structure and behavior of objects. An object is a runtime instance of a class with its own memory space and state. You can create many objects from one class.',
    keyConcept: 'Class = cookie cutter. Object = cookie. Many objects can be created from one class, each with its own state.',
    xpReward: 5,
    tags: ['class', 'object', 'difference'],
  },
  {
    id: 'oop-61',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'medium',
    question: 'What is the diamond problem in inheritance?',
    codeSnippet: `// Diamond problem in C++
class A { void foo() {} };
class B : public A {};
class C : public A {};
class D : public B, public C {}; // D inherits foo from both B and C`,
    options: [
      'An ambiguity that arises when a class inherits from two classes that both inherit from the same base class',
      'A problem with diamond-shaped ERD diagrams in databases',
      'A performance issue with multi-level inheritance chains',
      'A syntax error in all programming languages',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The diamond problem occurs in languages that support multiple inheritance (C++). When class D inherits from B and C, and both B and C inherit from A, there is ambiguity about which `foo()` method D should use. Languages like Java and C# avoid this by not supporting multiple class inheritance, using interfaces instead.',
    keyConcept: 'Diamond problem: ambiguity from multiple inheritance. Languages solve it via virtual inheritance (C++) or interfaces (Java, C#).',
    xpReward: 10,
    tags: ['inheritance', 'diamond-problem', 'multiple-inheritance'],
  },
  {
    id: 'oop-62',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'medium',
    question: 'In TypeScript, what does the `protected` access modifier allow?',
    options: [
      'Access from the declaring class and its subclasses, but not from external code',
      'Access from any code in any class',
      'Access only from within the declaring class',
      'Access only from within the same file or module',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`protected` falls between `private` and `public`. Protected members are accessible within the declaring class and any subclass (even across packages/modules), but not from external code. This is useful when subclasses need to use or override a method but external callers should not.',
    keyConcept: 'Protected = accessible in class + subclasses. Private = class only. Public = everywhere.',
    xpReward: 10,
    tags: ['encapsulation', 'protected', 'access-modifiers'],
  },
  {
    id: 'oop-63',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'hard',
    question: 'What problem does the Interface Segregation Principle (ISP) address?',
    codeSnippet: `// Violates ISP: fat interface
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}
// Better: segregated interfaces
interface Workable { work(): void; }
interface Eatable { eat(): void; }
interface Sleepable { sleep(): void; }`,
    options: [
      'Interfaces should be small and specific so that implementing classes only need to implement what they actually use',
      'Interfaces should have many methods to be useful',
      'All classes should implement the same interface',
      'Interfaces should be written in a single file',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'ISP states that no client should be forced to depend on methods it does not use. Large, "fat" interfaces should be split into smaller, more specific ones. For example, a Robot class that implements `Worker` should not be forced to implement `eat()` and `sleep()`. Segregated interfaces allow robots to only implement `Workable`.',
    keyConcept: 'ISP: Split fat interfaces into smaller, role-specific interfaces. Avoids forcing classes to implement methods they don\'t need.',
    xpReward: 15,
    tags: ['solid', 'isp', 'interface-segregation'],
  },
  {
    id: 'oop-64',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'hard',
    question: 'What is method overriding vs method overloading?',
    codeSnippet: `// Overloading (compile-time polymorphism):
class Calc {
  add(a, b) { return a + b; }
  add(a, b, c) { return a + b + c; }
}

// Overriding (runtime polymorphism):
class Animal {
  speak() { return "sound"; }
}
class Dog extends Animal {
  speak() { return "Woof"; }  // overrides parent
}`,
    options: [
      'Overloading: same method name, different parameters (compile time). Overriding: same signature, different implementation in subclass (runtime)',
      'Overloading happens at runtime; overriding happens at compile time',
      'Overloading is only for constructors; overriding is for regular methods',
      'They are the same concept with different terminology',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Method overloading: multiple methods with the same name but different parameters (number or types). Resolved at compile time. Method overriding: a subclass provides a specific implementation of a method already defined in its parent class. Same signature. Resolved at runtime (dynamic dispatch).',
    keyConcept: 'Overloading: different params, compile time, does not require inheritance. Overriding: same signature, runtime, requires inheritance.',
    xpReward: 10,
    tags: ['polymorphism', 'overloading', 'overriding', 'comparison'],
  },
  {
    id: 'oop-65',
    technology: 'oops',
    topic: 'Abstraction',
    difficulty: 'medium',
    question: 'What is the Facade pattern?',
    codeSnippet: `// Facade provides a simple interface to a complex subsystem
class HomeTheaterFacade {
  constructor(amp, player, lights) { /* ... */ }
  watchMovie(movie) {
    // Complex subsystem interactions simplified:
    this.lights.dim(0.5);
    this.player.play(movie);
    this.amp.setVolume(30);
    // User just calls: watchMovie("Inception")
  }
}`,
    options: [
      'A structural pattern that provides a simplified interface to a complex subsystem or library',
      'A pattern for creating objects in a family',
      'A pattern for notifying multiple objects of state changes',
      'A pattern for adapting one interface to another',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The Facade pattern provides a unified, simplified interface to a set of interfaces in a subsystem. It hides the complexity of the subsystem and makes it easier to use. For example, a home theater facade wraps amplifier, DVD player, projector, and lights into a simple `watchMovie()` method.',
    keyConcept: 'Facade: simplifies complex subsystems. Reduces coupling between clients and subsystem components.',
    xpReward: 10,
    tags: ['design-patterns', 'facade', 'structural'],
  },

  // ─── Additional Questions (oop-66 to oop-80) ───
  {
    id: 'oop-66',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'hard',
    question: 'What happens when you violate the Liskov Substitution Principle?',
    codeSnippet: `class Bird {
  fly() { return "Flying"; }
}
class Penguin extends Bird {
  fly() { throw new Error("Penguins can\'t fly!"); }
}`,
    options: [
      'Code that works with Bird may break when substituted with Penguin — the subtype changes behavior in unexpected ways',
      'Everything works fine — penguins just cannot fly',
      'Penguin should not extend Bird because of the fly method',
      'LSP only applies to statically typed languages',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'This classic LSP violation: a Penguin is a Bird but cannot fly. Code that calls `bird.fly()` expecting success will break. The fix: create a separate `FlyingBird` subclass or use a `Flyable` interface. LSP ensures that subclasses can replace their parent class without breaking the system.',
    keyConcept: 'LSP: subtypes must be substitutable. If a subtype throws unexpected errors, it violates LSP. Design hierarchies to match behavior, not real-world analogies.',
    xpReward: 15,
    tags: ['solid', 'lsp', 'liskov-substitution', 'polymorphism'],
  },
  {
    id: 'oop-67',
    technology: 'oops',
    topic: 'What is OOP?',
    difficulty: 'easy',
    question: 'What is the difference between procedural and object-oriented programming?',
    options: [
      'Procedural: functions operate on data (separated). OOP: data and methods are bundled together in objects.',
      'Procedural uses objects; OOP uses functions',
      'Procedural is always faster than OOP',
      'OOP does not use functions, only methods',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'In procedural programming, data is separate from functions that operate on it. In OOP, data (properties) and behavior (methods) are encapsulated in objects. OOP makes it easier to model real-world entities, reuse code, and manage complexity in large systems.',
    keyConcept: 'Procedural: data + functions separate. OOP: data + methods together. OOP scales better for complex systems.',
    xpReward: 5,
    tags: ['oops', 'procedural', 'comparison', 'paradigms'],
  },
  {
    id: 'oop-68',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'easy',
    question: 'What is the relationship between a class and an object?',
    options: [
      'A class is a template/blueprint; an object is a concrete instance created from that template',
      'An object is a template; a class is created from the object',
      'They are the same concept with different names',
      'A class exists at runtime; an object exists at compile time',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A class is a definition that describes structure and behavior. An object is a concrete instance of that class with its own memory and state. Multiple objects can be created from one class, each with different property values.',
    keyConcept: 'Class = definition (blueprint). Object = concrete instance. Many objects from one class.',
    xpReward: 5,
    tags: ['class', 'object', 'relationship'],
  },
  {
    id: 'oop-69',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'medium',
    question: 'What is ad-hoc polymorphism (method overloading)?',
    codeSnippet: `// Multiple methods with same name, different params
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    return a + b;
  }
}`,
    options: [
      'Multiple functions with the same name but different parameter types/counts — resolved at compile time',
      'A function that adapts to any type dynamically',
      'Polymorphism through inheritance only',
      'A function that can be called with any number of arguments',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Ad-hoc polymorphism (overloading) allows multiple functions with the same name but different parameters. The compiler selects the correct version based on argument types/count. Supported in Java, C++, C#, TypeScript (function overloads). JavaScript does not support true overloading — the last definition wins.',
    keyConcept: 'Overloading: same name, different params, compile-time resolution. Also called ad-hoc polymorphism. Not supported in JS.',
    xpReward: 10,
    tags: ['polymorphism', 'overloading', 'ad-hoc'],
  },
  {
    id: 'oop-70',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'hard',
    question: 'How does encapsulation relate to information hiding?',
    options: [
      'Encapsulation bundles data with methods; information hiding restricts access to internal details. They work together.',
      'Encapsulation and information hiding are the same thing',
      'Information hiding prevents encapsulation',
      'Encapsulation is about performance; information hiding is about security',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Encapsulation is the mechanism of bundling data and methods together. Information hiding is the principle of restricting access to internals (via private/protected). They are related but distinct: encapsulation enables hiding, but you can encapsulate without hiding (everything public). Good OOP uses both together.',
    keyConcept: 'Encapsulation = bundling. Information hiding = restricting access. Both together = proper data protection.',
    xpReward: 10,
    tags: ['encapsulation', 'information-hiding', 'design'],
  },
  {
    id: 'oop-71',
    technology: 'oops',
    topic: 'Abstraction',
    difficulty: 'hard',
    question: 'What is the difference between an abstract class and a concrete class?',
    options: [
      'Abstract class: cannot be instantiated, may have abstract methods. Concrete class: fully implemented, can be instantiated.',
      'Abstract class can be instantiated; concrete class cannot',
      'Abstract class has no methods; concrete class has all methods',
      'They are the same — the terms are interchangeable',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'An abstract class serves as a base and cannot be instantiated on its own. It may contain abstract methods (no implementation) that subclasses must implement, plus concrete methods with full implementation. A concrete class has all methods implemented and can be instantiated.',
    keyConcept: 'Abstract: incomplete, needs subclass. Concrete: complete, instantiable. Use abstract for shared base behavior.',
    xpReward: 5,
    tags: ['abstraction', 'abstract-class', 'concrete-class'],
  },
  {
    id: 'oop-72',
    technology: 'oops',
    topic: 'Relationships',
    difficulty: 'medium',
    question: 'What is a dependency injection container?',
    options: [
      'A framework that automatically resolves and injects dependencies — maintains a registry of how to create objects',
      'A container that stores all dependencies in a file',
      'A class that contains all dependencies of an application',
      'A database for storing dependency information',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A DI container (or IoC container) is a framework that manages dependency creation and injection. You register interfaces/classes with their implementations and lifetimes (singleton, transient, scoped). The container automatically resolves the dependency graph and injects dependencies when creating objects. Examples: InversifyJS (TS), Awilix (JS), Angular DI, Spring DI.',
    keyConcept: 'DI container: automatic dependency resolution. Register → Resolve → Inject. Lifetimes: singleton, transient, scoped.',
    xpReward: 15,
    tags: ['di', 'dependency-injection', 'container', 'ioc'],
  },
  {
    id: 'oop-73',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What is the KISS principle?',
    options: [
      'Keep It Simple, Stupid — simplicity should be a key goal in design; avoid unnecessary complexity',
      'Keep It Secure, Stupid — security should be the primary concern',
      'Keep It Structured, Stupid — always use strict code structure',
      'Keep It Synchronized, Stupid — keep data consistent across components',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'KISS (Keep It Simple, Stupid) advocates for simplicity in design. Simple code is easier to understand, test, maintain, and debug. Avoid over-engineering, premature abstractions, and unnecessary complexity. Write code for humans first — the simplest solution that works is often the best.',
    keyConcept: 'KISS: simplicity over cleverness. Simple code = maintainable code. Avoid over-engineering for hypothetical future needs.',
    xpReward: 5,
    tags: ['design', 'kiss', 'principles', 'simplicity'],
  },
  {
    id: 'oop-74',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What is the YAGNI principle?',
    options: [
      'You Ain\'t Gonna Need It — do not add functionality until it is actually needed',
      'You Are Generally Not Infallible — always test your code',
      'You Always Get Nifty Implementations — aim for elegant solutions',
      'Your Application Gets New Integrations — plan for extensibility',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'YAGNI (You Ain\'t Gonna Need It) warns against building for hypothetical future requirements. Only implement what is currently needed — future needs often differ from predictions. Premature extensibility adds complexity, slows development, and may never be used. Refactor when the actual need arises.',
    keyConcept: 'YAGNI: don\'t build for fantasy futures. Solve today\'s problems today. Refactor when real need emerges.',
    xpReward: 5,
    tags: ['design', 'yagni', 'principles', 'simplicity'],
  },
  {
    id: 'oop-75',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'medium',
    question: 'What is cohesion in software design?',
    options: [
      'A measure of how focused and related the responsibilities of a module/class are — high cohesion is good',
      'A measure of how dependent a module is on other modules',
      'The process of combining multiple classes into one',
      'The ability of classes to work together',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Cohesion measures how closely related the elements within a module/class are. High cohesion: a class has a single, well-defined purpose (all methods work toward that purpose). Low cohesion: a class does unrelated things (violates SRP). High cohesion → easier to understand, maintain, and reuse.',
    keyConcept: 'High cohesion = focused, single-purpose. Low cohesion = scattered, multiple purposes. SRP helps achieve high cohesion.',
    xpReward: 10,
    tags: ['design', 'cohesion', 'srp', 'modularity'],
  },
  {
    id: 'oop-76',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'medium',
    question: 'What is coupling in software design?',
    options: [
      'A measure of how dependent a module is on other modules — loose coupling is good, tight coupling is bad',
      'A measure of how connected two classes are in the code',
      'The process of linking modules together',
      'The ability of a class to be used in different contexts',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Coupling measures dependencies between modules. Loose coupling: modules interact through well-defined interfaces, changes in one have minimal impact on others. Tight coupling: modules are highly dependent, changes ripple through. Aim for: high cohesion within modules, loose coupling between modules. DI, interfaces, and events help achieve loose coupling.',
    keyConcept: 'Loose coupling: minimal dependencies, easier maintenance. Tight coupling: fragile, hard to change. DI and interfaces reduce coupling.',
    xpReward: 10,
    tags: ['design', 'coupling', 'loose-coupling', 'modularity'],
  },
  {
    id: 'oop-77',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'hard',
    question: 'What is subtype polymorphism vs parametric polymorphism?',
    codeSnippet: `// Subtype: via inheritance
Cat extends Animal → polymorphic: Animal a = new Cat()

// Parametric: via generics
Array<T> → Array<string>, Array<number>`,
    options: [
      'Subtype: polymorphism through inheritance (override). Parametric: polymorphism through generics/type parameters.',
      'Subtype uses generics; parametric uses inheritance',
      'They are the same thing',
      'Subtype is for classes; parametric is for functions',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Subtype polymorphism (inclusion polymorphism): a subclass can be used where its parent type is expected — achieved through inheritance and method overriding. Parametric polymorphism: a function/type works uniformly for any type — achieved through generics/templates. TypeScript generics and Java generics are parametric polymorphism.',
    keyConcept: 'Subtype: inheritance + overriding. Parametric (generics): type parameters. Both enable code reuse with different mechanisms.',
    xpReward: 15,
    tags: ['polymorphism', 'subtype', 'parametric', 'generics'],
  },
  {
    id: 'oop-78',
    technology: 'oops',
    topic: 'Relationships',
    difficulty: 'hard',
    question: 'What is a UML class diagram and what does it show?',
    options: [
      'A visual diagram showing classes, attributes, methods, and relationships (inheritance, association, composition, dependency)',
      'A diagram showing only the inheritance hierarchy',
      'A diagram showing database tables and relationships',
      'A diagram showing user interfaces and navigation',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'UML class diagrams model the static structure of a system: classes (with attributes and methods), visibility (+ public, - private, # protected), relationships (inheritance: hollow triangle arrow, association: plain line, composition: filled diamond, aggregation: hollow diamond, dependency: dashed arrow), and multiplicities (1, 0..*, 1..*, etc.).',
    keyConcept: 'UML class diagram: visual OOP design. Relationships: inherit (triangle), compose (filled diamond), aggregate (hollow diamond).',
    xpReward: 10,
    tags: ['uml', 'class-diagram', 'relationships', 'design'],
  },
  {
    id: 'oop-79',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'hard',
    question: 'What is the Strategy pattern?',
    codeSnippet: `// Strategy interface + concrete strategies
interface SortStrategy {
  sort(data: number[]): number[];
}
class QuickSort implements SortStrategy {
  sort(data: number[]) { /* quicksort */ }
}
class BubbleSort implements SortStrategy {
  sort(data: number[]) { /* bubblesort */ }
}

// Context uses the strategy
class Sorter {
  constructor(private strategy: SortStrategy) {}
  sort(data: number[]) { return this.strategy.sort(data); }
}`,
    options: [
      'A behavioral pattern that lets you define a family of algorithms, encapsulate each one, and make them interchangeable',
      'A pattern that creates a single algorithm optimized for all cases',
      'A pattern that sorts data in the database',
      'A pattern that defines a step-by-step sorting process',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The Strategy pattern defines a family of interchangeable algorithms. Each algorithm is encapsulated in its own class implementing a common interface. The context class delegates to the strategy, allowing algorithms to be swapped at runtime. Use for: sorting algorithms, compression, validation rules, payment processing.',
    keyConcept: 'Strategy: interchangeable algorithms. Open/Closed: add new strategies without changing context. Composition over inheritance.',
    xpReward: 15,
    tags: ['design-patterns', 'strategy', 'behavioral'],
  },
  {
    id: 'oop-80',
    technology: 'oops',
    topic: 'Access & Design',
    difficulty: 'medium',
    question: 'What is the Decorator pattern?',
    codeSnippet: `// Base component
interface Coffee { cost(): number; }
class SimpleCoffee implements Coffee {
  cost() { return 5; }
}

// Decorator wraps and adds behavior
class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 2; }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee); // cost = 7`,
    options: [
      'A structural pattern that attaches additional responsibilities to an object dynamically by wrapping it',
      'A pattern that decorates the UI with visual elements',
      'A pattern that creates multiple decorator objects',
      'A pattern that removes functionality from an object',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The Decorator pattern wraps an object with a new class that adds behavior before/after delegating to the original. Multiple decorators can be stacked (each wraps the previous). Benefits: more flexible than inheritance for adding behavior, follows Open/Closed, and enables combining behaviors at runtime.',
    keyConcept: 'Decorator: wrap and enhance. More flexible than subclassing. Stackable. Examples: middleware, streams, logging.',
    xpReward: 15,
    tags: ['design-patterns', 'decorator', 'structural', 'wrapper'],
  },
  {
    id: 'oop-81',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'medium',
    question: 'Why must `super()` be called before using `this` in a derived class constructor?',
    options: [
      'Because `this` is not initialised until the base constructor runs',
      'Because super() assigns the class name used for debugging',
      'It is a style convention, not a requirement',
      'Because super() registers the class in the prototype chain lazily',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'In a derived constructor the instance does not exist until the base constructor creates it, so `this` is in a temporal dead zone beforehand and touching it throws a ReferenceError. Calling super() first is what brings `this` into existence, which is also why a derived constructor that omits super() entirely fails.',
    keyConcept: 'The base constructor creates the instance; `this` is unusable until super() returns.',
    xpReward: 20,
    tags: ['constructor', 'super', 'inheritance', 'this'],
  },
  {
    id: 'oop-82',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'hard',
    question: 'Why is calling an overridable method from a constructor considered dangerous?',
    options: [
      'Constructors cannot call instance methods at all',
      'It always causes infinite recursion',
      'The subclass override runs before the subclass constructor has initialised its own fields, so it sees uninitialised state',
      'It prevents the object from being garbage collected',
    ],
    correctAnswer: [2],
    type: 'single',
    explanation: 'Base construction completes before derived construction, but virtual dispatch already resolves to the subclass override. That override therefore executes while the subclass\' own fields are still default or undefined — a bug that only appears once someone subclasses the type. Prefer a private or final method, or an explicit init step after construction.',
    keyConcept: 'Virtual dispatch is live during base construction, before subclass fields exist.',
    xpReward: 25,
    tags: ['constructor', 'polymorphism', 'initialization-order', 'pitfall'],
  },
  {
    id: 'oop-83',
    technology: 'oops',
    topic: 'Constructor & this',
    difficulty: 'medium',
    question: 'What is constructor chaining?',
    options: [
      'Defining several constructors with different signatures',
      'One constructor delegating to another — to a sibling overload or to the base class — so initialisation logic lives in one place',
      'Calling a constructor from an instance method',
      'Creating objects in a loop',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'A convenience constructor supplying defaults delegates to the fuller one rather than duplicating its body, so the invariant checks exist once. Languages spell it differently — `this(...)` for a sibling and `super(...)` for the base in Java, `: this(...)` in C# — but the point is the same: a single authoritative initialisation path.',
    keyConcept: 'Delegate rather than duplicate, so initialisation and validation live in exactly one constructor.',
    xpReward: 20,
    tags: ['constructor', 'chaining', 'delegation', 'dry'],
  },
  {
    id: 'oop-84',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'medium',
    question: 'When should you choose an abstract class over an interface?',
    options: [
      'Whenever the language supports both',
      'When you need shared implementation or state alongside the contract',
      'When several unrelated types must implement the same methods',
      'When the type will never be subclassed',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'An interface states a contract and nothing else, and a type can implement many. An abstract class can carry fields, constructors and concrete helper methods, but single inheritance means a type gets only one. So: interface for "can do this", abstract class for "is a kind of this, and here is the shared machinery".',
    keyConcept: 'Interfaces describe capability and compose freely; abstract classes share implementation but consume the inheritance slot.',
    xpReward: 20,
    tags: ['abstract-class', 'interface', 'design'],
  },
  {
    id: 'oop-85',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'hard',
    question: 'What is the diamond problem, and how do interfaces avoid it?',
    options: [
      'Two classes inheriting from the same base, resolved by casting',
      'A class inheriting the same member along two paths, ambiguous with state; interfaces avoid it by declaring behaviour without state',
      'A cycle in the inheritance graph, which compilers reject',
      'Four classes forming a diamond in a UML diagram',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'With multiple inheritance of implementation, a class inheriting from two parents that share a base can end up with two copies of that base\'s state, and no clear rule for which member wins. Interfaces carry no state, so implementing several is unambiguous. Once default methods enter the picture the conflict returns for behaviour, which is why Java requires an explicit override to disambiguate.',
    keyConcept: 'Ambiguity comes from inherited state; stateless contracts compose safely.',
    xpReward: 25,
    tags: ['diamond-problem', 'multiple-inheritance', 'interface', 'default-methods'],
  },
  {
    id: 'oop-86',
    technology: 'oops',
    topic: 'Interfaces & Abstract',
    difficulty: 'hard',
    question: 'Why is "program to an interface, not an implementation" recommended?',
    options: [
      'Interfaces execute faster than concrete classes',
      'It reduces the total amount of code',
      'It is required by most compilers',
      'Depending on the contract lets any conforming implementation be substituted, which enables testing and change without touching callers',
    ],
    correctAnswer: [3],
    type: 'single',
    explanation: 'A caller that names a concrete type is welded to it; one that names the contract accepts any implementation — a fake in tests, a different database driver, a caching decorator. That substitutability is what makes dependency injection and the Strategy pattern work, and it is the practical form of the Dependency Inversion Principle. It does not make anything faster, and often adds code.',
    keyConcept: 'Depend on contracts to keep implementations swappable; the payoff is testability and change tolerance, not speed.',
    xpReward: 25,
    tags: ['interface', 'dependency-inversion', 'testability', 'solid'],
  },
  {
    id: 'oop-87',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'medium',
    question: 'Why is composition often preferred over inheritance?',
    options: [
      'Inheritance is deprecated in modern languages',
      'Composition avoids tight coupling to a base class\'s implementation and can be changed at runtime',
      'Composition always uses less memory',
      'Inheritance cannot express code reuse',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Inheritance exposes a subclass to its parent\'s internals, so a base-class change can silently break it — the fragile base class problem — and the relationship is fixed at compile time. Composition delegates to a collaborator held behind an interface, which can be swapped per instance or per call. Inheritance still fits genuine is-a hierarchies with stable bases.',
    keyConcept: 'Inheritance is compile-time and white-box; composition is runtime and black-box.',
    xpReward: 20,
    tags: ['composition', 'inheritance', 'coupling', 'design'],
  },
  {
    id: 'oop-88',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'hard',
    question: 'What does the Liskov Substitution Principle actually require?',
    options: [
      'A subclass must override every method of its parent',
      'A subclass must not add new public methods',
      'A subclass instance must be usable anywhere the parent is expected, without weakening guarantees or strengthening requirements',
      'A subclass must have the same constructor signature as its parent',
    ],
    correctAnswer: [2],
    type: 'single',
    explanation: 'Substitutability is behavioural, not just structural. An override may accept more and promise at least as much, never the reverse: it must not narrow accepted input, weaken the postcondition, or throw exceptions callers were not told about. The classic violation is Square extending Rectangle — setting width independently of height breaks what Rectangle promised.',
    keyConcept: 'Preconditions may only weaken and postconditions only strengthen in an override.',
    xpReward: 25,
    tags: ['liskov', 'solid', 'inheritance', 'contracts'],
  },
  {
    id: 'oop-89',
    technology: 'oops',
    topic: 'Inheritance',
    difficulty: 'medium',
    question: 'What is method hiding, as distinct from overriding?',
    options: [
      'Making a method private in the subclass',
      'Declaring a static or non-virtual member with the same name, so which one runs depends on the reference type rather than the object type',
      'Removing an inherited method entirely',
      'Overloading a method with different parameters',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Overriding is resolved by the runtime type of the object. Hiding — a static method redeclared, or `new` in C# without `virtual`/`override` — is resolved by the compile-time type of the reference. The same object therefore behaves differently depending on which variable you call through, which is exactly the confusion to avoid.',
    keyConcept: 'Overriding dispatches on the object; hiding dispatches on the reference type.',
    xpReward: 20,
    tags: ['method-hiding', 'overriding', 'static-dispatch', 'polymorphism'],
  },
  {
    id: 'oop-90',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'medium',
    question: 'What is the difference between a shallow and a deep copy of an object?',
    options: [
      'A shallow copy duplicates the top-level object but shares referenced objects; a deep copy duplicates the whole graph',
      'A shallow copy copies only public fields; a deep copy also copies private ones',
      'A shallow copy is a reference; a deep copy is a new object',
      'They differ only in performance',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A shallow copy gives new top-level storage while nested objects remain shared, so mutating a nested list is visible through both copies — the usual surprise. A deep copy recursively duplicates everything, at the cost of time, memory, and having to handle cycles and shared references sensibly.',
    keyConcept: 'Shallow copies share the interior; deep copies duplicate the whole reachable graph.',
    xpReward: 20,
    tags: ['shallow-copy', 'deep-copy', 'cloning', 'mutability'],
  },
  {
    id: 'oop-91',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'hard',
    question: 'Why must overriding equals be accompanied by overriding hashCode?',
    options: [
      'The compiler refuses to build otherwise',
      'hashCode is used for ordering in sorted collections',
      'Equal objects must produce equal hash codes, or hash-based collections will fail to find entries they contain',
      'equals is only called after hashCode returns true',
    ],
    correctAnswer: [2],
    type: 'single',
    explanation: 'Hash containers first pick a bucket by hash, then compare within it. Two objects that are equal but hash differently land in different buckets, so a HashSet can hold visible duplicates and a HashMap lookup can miss a key that is present. The reverse — equal hashes for unequal objects — is merely a collision and remains correct.',
    keyConcept: 'equals/hashCode must agree: equal implies same hash. The converse is allowed.',
    xpReward: 25,
    tags: ['equals', 'hashcode', 'collections', 'contracts'],
  },
  {
    id: 'oop-92',
    technology: 'oops',
    topic: 'Class & Object',
    difficulty: 'medium',
    question: 'What distinguishes a static member from an instance member?',
    options: [
      'Static members are immutable',
      'A static member belongs to the class itself and is shared by all instances; an instance member exists per object',
      'Static members are always private',
      'Static members are created lazily on first instantiation',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Static state exists once per class and is reachable without an instance, which suits counters, caches and factory methods — and makes it a common source of hidden global state and thread-safety bugs. A static method also cannot touch instance fields or participate in overriding, since there is no receiver to dispatch on.',
    keyConcept: 'Static belongs to the class and is shared; it cannot access instance state or be overridden.',
    xpReward: 20,
    tags: ['static', 'instance', 'class-members', 'shared-state'],
  },
  {
    id: 'oop-93',
    technology: 'oops',
    topic: 'Encapsulation',
    difficulty: 'hard',
    question: 'Why does returning a mutable internal collection from a getter break encapsulation?',
    options: [
      'It is slower than returning a copy',
      'The caller receives a reference to internal state and can mutate it, bypassing the class\'s invariants',
      'It prevents the field from being garbage collected',
      'It exposes the field name to callers',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Handing out the live list means callers can add or clear entries without going through the methods that validate and maintain invariants — so the class can no longer guarantee its own state. Return an unmodifiable view or a defensive copy, and note that a shallow copy still exposes the elements themselves if those are mutable.',
    keyConcept: 'Exposing a reference to internal mutable state surrenders control of the invariants.',
    xpReward: 25,
    tags: ['encapsulation', 'defensive-copy', 'immutability', 'invariants'],
  },
  {
    id: 'oop-94',
    technology: 'oops',
    topic: 'Polymorphism',
    difficulty: 'hard',
    question: 'What is the difference between compile-time and runtime polymorphism?',
    options: [
      'Compile-time polymorphism is overloading, resolved by the compiler from the declared types; runtime polymorphism is overriding, resolved by the object\'s actual type',
      'Compile-time polymorphism only works with primitives',
      'Runtime polymorphism is slower and therefore deprecated',
      'They are two names for the same mechanism',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Overload resolution happens statically, using the declared types of the arguments — so a variable typed as the base class selects the base overload even if it holds a subclass instance. Overriding is dispatched dynamically through the object\'s real type. Mixing them up produces the classic surprise where the "wrong" overload is chosen.',
    keyConcept: 'Overloads are picked from declared types at compile time; overrides from the actual type at runtime.',
    xpReward: 25,
    tags: ['polymorphism', 'overloading', 'overriding', 'dispatch'],
  },
  {
    id: 'oop-95',
    technology: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'hard',
    question: 'What does the Interface Segregation Principle advise?',
    options: [
      'Every class should implement exactly one interface',
      'Interfaces should be in separate files from classes',
      'Prefer several focused interfaces over one large one, so no client depends on methods it does not use',
      'Interfaces should never be changed once published',
    ],
    correctAnswer: [2],
    type: 'single',
    explanation: 'A fat interface forces implementers to supply members they have no use for — the tell-tale sign being methods that throw UnsupportedOperationException — and couples every client to changes in parts it never touches. Splitting by client need keeps implementations honest and recompilation local. It is the interface-level counterpart of the Single Responsibility Principle.',
    keyConcept: 'Split interfaces by client need; stub methods that throw are the smell this principle names.',
    xpReward: 25,
    tags: ['solid', 'interface-segregation', 'design', 'coupling'],
  },
];
