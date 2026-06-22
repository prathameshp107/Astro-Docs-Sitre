---
title: "Closures in JS"
description: "Function bundled along with its lexical scope is called a closure in JavaScript."
sidebar:
  order: 10
---


# Episode 10 : Closures in JS

- Function bundled along with it's lexical scope is **closure**.


```mermaid
flowchart TB
    subgraph xFunc["function x()"]
        VarA["var a = 7"] --> yFunc
            
        subgraph yFunc["function y()"]
            Log["console.log(a)
→ Accesses 'a' from parent scope"] --> Return["return y"]
        end
    end

    ClosureFormation["Closure Formed
x() returns function y
along with its lexical scope (a = 7)

var z = x()
→ z holds y + closure over a"]
    
    Later["Later in code:
z() → still remembers a = 7
Even after x() has finished!"]

    Return --> ClosureFormation --> Later

    style xFunc fill:#7c3aed,color:#fff
    style yFunc fill:#4f46e5,color:#fff
    style VarA fill:#059669,color:#fff
    style Log fill:#6366f1,color:#fff
    style ClosureFormation fill:#d97706,color:#fff
    style Later fill:#0d9488,color:#fff
```


- JavaScript has a lexcial scope environment. If a function needs to access a variable, it first goes to its local memory. When it does not find it there, it goes to the memory of its lexical parent. See Below code, Over here function **y** along with its lexical scope i.e. (function x) would be called a closure.

  ```js
  function x() {
    var a = 7;
    function y() {
      console.log(a);
    }
    return y;
  }
  var z = x();
  console.log(z); // value of z is entire code of function y.
  ```

  - In above code, When y is returned, not only is the function returned but the entire closure (fun y + its lexical scope) is returned and put inside z. So when z is used somewhere else in program, it still remembers var a inside x()

  - Another Example
    ```js
    function z() {
      var b = 900;
      function x() {
        var a = 7;
        function y() {
          console.log(a, b);
        }
        y();
      }
      x();
    }
    z(); // 7 900
    ```

- Thus In simple words, we can say:
  - **\*A closure is a function** that has access to its outer function scope even after the function has returned. Meaning, A closure can remember and access variables and arguments reference of its outer function even after the function has returned.\*

<br>

- ![Closure Explaination](/DSA-Notes-Problems/assets/js/closure.jpg "Lexical Scope")

- Advantages of Closure:

  - Module Design Pattern
  - Currying
  - Memoize
  - Data hiding and encapsulation
  - setTimeouts etc.

- Disadvantages of Closure:
  - Over consumption of memory
  - Memory Leak
  - Freeze browser

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=qikxEIxsXco&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/qikxEIxsXco/0.jpg" width="750"
alt="Closure in JS Youtube Link"/></a>

<br>

<hr>

<br>