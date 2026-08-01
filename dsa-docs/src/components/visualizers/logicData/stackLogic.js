export const stackLogic = {
  'stack': {
    title: 'Stack Data Structure (LIFO — Last In First Out)',
    input: 'Stack Capacity = 4, Push [10, 20, 30, 40], Pop',
    goal: 'Demonstrate LIFO push and pop mechanics with Top pointer in O(1) constant time.',
    terms: {
      'Top Pointer': 'Index pointer tracking the topmost element in the stack. Initialized to -1 (empty).',
      'LIFO Principle': 'Last In, First Out — element pushed last is popped first.',
      'Overflow': 'Attempting to push to a full stack (top == max_size - 1).',
      'Underflow': 'Attempting to pop from an empty stack (top == -1).'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Empty Stack (top = -1)',
        activeLine: 1,
        top: -1,
        stack: [],
        state: { top: -1, 'stack.isEmpty': 'TRUE ✅' },
        array: [10, 20, 30, 40],
        computation: 'top = -1, Stack = []',
        comparison: 'Stack Empty',
        action: 'Init Stack',
        desc: 'Initialize empty stack structure. The top pointer is initialized to -1, which acts as a sentinel index signifying that the stack is currently empty and contains 0 elements.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Push 10 onto Stack (top = 0)',
        activeLine: 2,
        top: 0,
        stack: [10],
        state: { top: 0, 'stack[0]': 10 },
        array: [10, 20, 30, 40],
        computation: 'top = top + 1 = 0, stack[0] = 10',
        comparison: '10 Pushed',
        action: 'Push 10',
        desc: 'To push element 10 onto the stack, we first increment the top pointer from -1 to 0 (top = top + 1 = 0). We then place value 10 at stack index 0. The top pointer now points directly to 10 as the topmost element.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Push 20 & 30 onto Stack (top = 2)',
        activeLine: 2,
        top: 2,
        stack: [10, 20, 30],
        state: { top: 2, 'stack[1]': 20, 'stack[2]': 30 },
        array: [10, 20, 30, 40],
        computation: 'stack = [10, 20, 30], top = 2',
        comparison: 'Stack Size = 3',
        action: 'Push 20, 30',
        desc: 'Next, we push elements 20 and 30 sequentially. Pushing 20 advances top from 0 to 1 and stores 20 at stack[1]. Pushing 30 advances top from 1 to 2 and stores 30 at stack[2]. The stack size is now 3 with 30 at the top.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Pop Top Element (30)',
        activeLine: 3,
        top: 1,
        stack: [10, 20],
        state: { poppedVal: 30, top: 1 },
        array: [10, 20, 30, 40],
        computation: 'popped = stack[2] (30), top = top - 1 = 1',
        comparison: '30 Popped (LIFO)',
        action: 'Pop Element',
        desc: 'We perform a pop operation to remove the topmost element according to the LIFO (Last-In-First-Out) rule. We retrieve value 30 from stack[top=2] and decrement top from 2 to 1. Element 30 is removed and top now points to 20.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Stack Operations Complete 🎉',
        activeLine: 4,
        top: 1,
        stack: [10, 20],
        state: { returnedVal: 30, top: 1, status: 'STACK OPERATIONS COMPLETE 🎉' },
        array: [10, 20, 30, 40],
        computation: 'Stack = [10, 20], top = 1',
        comparison: 'STACK OPERATIONS O(1) 🎉',
        action: 'Return Stack State',
        isMatch: true,
        desc: 'All push and pop operations complete successfully in O(1) constant time per operation because accessing or modifying the top index requires zero element shifting.'
      }
    ]
  },

  'push': {
    title: 'Stack Push Operation O(1)',
    input: 'Push elements [10, 20, 30, 40] into Stack',
    goal: 'Demonstrate pointer-based push operation and overflow checking.',
    terms: {
      'top': 'Index pointer tracking topmost element.',
      'push': 'top = top + 1, stack[top] = item',
      'overflow': 'Check if top == max_size - 1 before pushing.'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Check Overflow Condition (top == -1)',
        activeLine: 1,
        top: -1,
        stack: [],
        state: { top: -1, 'top == max_size - 1': 'FALSE ❌', itemToPush: 10 },
        array: [10, 20, 30, 40],
        computation: 'top = -1, max_size = 4',
        comparison: 'top == max_size - 1 (FALSE ❌)',
        action: 'Check Overflow',
        desc: 'Line 1: Before pushing a new element (10), we check for Stack Overflow by evaluating if top == max_size - 1 (-1 == 3). The condition evaluates to FALSE, confirming that the stack has free capacity to accept new items.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Increment top = 0 & Push 10',
        activeLine: 2,
        top: 0,
        stack: [10],
        state: { top: 0, 'stack[0]': 10 },
        array: [10, 20, 30, 40],
        computation: 'top = top + 1 = 0, stack[0] = 10',
        comparison: 'top Updated to 0',
        action: 'Increment top',
        desc: 'Line 2: To prepare the target slot for element 10, we increment the top pointer by 1 (top = top + 1 = 0). The top pointer now references slot index 0.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Element 10 Pushed onto Stack',
        activeLine: 3,
        top: 0,
        stack: [10],
        state: { 'stack[0]': 10, status: 'PUSHED 10 ✅' },
        array: [10, 20, 30, 40],
        computation: 'stack[0] = 10',
        comparison: '10 Pushed ✅',
        action: 'Place 10',
        desc: 'Line 3: We store the input value 10 into the array at stack[top], setting stack[0] = 10. Element 10 is now safely pushed onto the stack as the new top element.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Increment top = 1 & Push 20',
        activeLine: 2,
        top: 1,
        stack: [10, 20],
        state: { top: 1, 'stack[1]': 20 },
        array: [10, 20, 30, 40],
        computation: 'top = 1, stack[1] = 20',
        comparison: '20 Pushed ✅',
        action: 'Push 20',
        desc: 'Line 2 & 3: Pushing the next element 20. We first increment top from 0 to 1 (top = 1), then place value 20 into stack[1]. Element 20 now sits above 10 in the LIFO stack structure.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Increment top = 2 & Push 30',
        activeLine: 2,
        top: 2,
        stack: [10, 20, 30],
        state: { top: 2, 'stack[2]': 30 },
        array: [10, 20, 30, 40],
        computation: 'top = 2, stack[2] = 30',
        comparison: '30 Pushed ✅',
        action: 'Push 30',
        desc: 'Line 2 & 3: Pushing element 30. We increment top from 1 to 2, then write value 30 into stack[2]. Element 30 becomes the new topmost element of the stack.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Increment top = 3 & Push 40 ➔ STACK FULL 🎉',
        activeLine: 2,
        top: 3,
        stack: [10, 20, 30, 40],
        state: { top: 3, 'stack[3]': 40, status: 'STACK FULL 🎉' },
        array: [10, 20, 30, 40],
        computation: 'top = 3, stack[3] = 40',
        comparison: 'STACK FULL 🎉',
        action: 'Push 40 (Full)',
        isMatch: true,
        desc: 'Line 2 & 3: Pushing final element 40. Top increments from 2 to 3, storing 40 at stack[3]. The top pointer reaches max_size - 1 (3 == 3), signaling that the stack is now completely full!'
      }
    ]
  },

  'pop': {
    title: 'Stack Pop Operation O(1)',
    input: 'Stack = [10, 20, 30, 40], Pop Top Element',
    goal: 'Demonstrate LIFO deletion and underflow checking.',
    terms: {
      'underflow': 'Check top == -1 before popping.',
      'pop': 'val = stack[top], top = top - 1'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Check Underflow Condition (top = 3)',
        activeLine: 1,
        top: 3,
        stack: [10, 20, 30, 40],
        state: { top: 3, 'top == -1': 'FALSE ❌' },
        array: [10, 20, 30, 40],
        computation: 'top = 3',
        comparison: 'top == -1 (FALSE ❌)',
        action: 'Check Underflow',
        desc: 'Line 1: Before attempting to remove an element, we check for Stack Underflow by evaluating if top == -1 (3 == -1). The condition is FALSE, verifying that the stack contains active elements to pop.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Read Popped Element val = stack[top] (40)',
        activeLine: 2,
        top: 3,
        stack: [10, 20, 30, 40],
        state: { poppedVal: 40, top: 3 },
        array: [10, 20, 30, 40],
        computation: 'poppedVal = stack[3] = 40',
        comparison: 'Element 40 Read',
        action: 'Read Top Val',
        desc: 'Line 2: We inspect the current top index (top = 3) and copy the value stored at stack[top] (stack[3] = 40) into a temporary return variable poppedVal.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Decrement top = top - 1 = 2',
        activeLine: 3,
        top: 2,
        stack: [10, 20, 30],
        state: { top: 2, poppedVal: 40 },
        array: [10, 20, 30, 40],
        computation: 'top = 2',
        comparison: '40 Removed from Stack',
        action: 'Decrement top',
        desc: 'Line 3: To remove the top element from the active stack according to LIFO, we decrement the top pointer by 1 (top = top - 1 = 2). Element 40 is logically removed, and top now points to index 2 (value 30).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Return Popped Value = 40 ➔ Pop Complete! 🎉',
        activeLine: 4,
        top: 2,
        stack: [10, 20, 30],
        state: { returnedVal: 40, top: 2, status: 'POPPED 40 ✅' },
        array: [10, 20, 30, 40],
        computation: 'returnedVal = 40, top = 2',
        comparison: 'POPPED 40 ✅',
        action: 'Return 40',
        isMatch: true,
        desc: 'Line 4: The pop algorithm finishes by returning the retrieved value 40. The stack now contains [10, 20, 30] with top = 2, executed in O(1) constant time without shifting remaining elements.'
      }
    ]
  },

  'peek': {
    title: 'Stack Peek / Top Operation O(1)',
    input: 'Stack = [10, 20, 30, 40], Peek Top',
    goal: 'Return topmost element without modifying stack or pointers in O(1) time.',
    terms: {
      'peek': 'Return stack[top] without decrementing top.'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Check Underflow (top = 3)',
        activeLine: 1,
        top: 3,
        stack: [10, 20, 30, 40],
        state: { top: 3, 'top == -1': 'FALSE ❌' },
        array: [10, 20, 30, 40],
        computation: 'top = 3',
        comparison: 'top == -1 (FALSE ❌)',
        action: 'Check Underflow',
        desc: 'Line 1: Check underflow condition top == -1 (3 == -1). The condition is FALSE, confirming that at least one element exists in the stack.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Return stack[top] = 40 ➔ Peek Complete! 🎉',
        activeLine: 2,
        top: 3,
        stack: [10, 20, 30, 40],
        state: { peekedVal: 40, top: 3, status: 'PEEK SUCCESS ✅' },
        array: [10, 20, 30, 40],
        computation: 'peekedVal = 40, top = 3',
        comparison: 'PEEK SUCCESS ✅',
        action: 'Return 40',
        isMatch: true,
        desc: 'Line 2: Retrieve and return the value stored at stack[top] (40) without modifying the top pointer or altering stack contents. Peek completes in O(1) constant time.'
      }
    ]
  },

  'valid-parentheses': {
    title: 'Valid Parentheses String Matching O(N)',
    input: 'String s = "{[()]}", Check Bracket Matching',
    goal: 'Use stack to verify matching pairs of opening and closing brackets.',
    terms: {
      'Opening Bracket': 'Push onto stack: (, {, [',
      'Closing Bracket': 'Pop top from stack and verify matching pair: ), }, ]'
    },
    array: ['{', '[', '(', ')', ']', '}'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Read Char "{" ➔ Push "{" onto Stack',
        activeLine: 1,
        top: -1,
        stack: [],
        state: { char: '{', action: 'push {' },
        array: ['{', '[', '(', ')', ']', '}'],
        computation: 'char = "{", action = push {',
        comparison: 'Open Bracket Encountered',
        action: 'Push {',
        desc: 'Line 1: Read character "{". Since "{" is an opening bracket, we push it onto the stack to track its expected closing counterpart. Stack = ["{"].'
      },
      {
        stepNum: 2,
        title: 'Step 2: Read Char "[" ➔ Push "[" onto Stack',
        activeLine: 1,
        top: 0,
        stack: ['{'],
        state: { char: '[', action: 'push [' },
        array: ['{', '[', '(', ')', ']', '}'],
        computation: 'char = "[", action = push [',
        comparison: 'Open Bracket Encountered',
        action: 'Push [',
        desc: 'Line 1: Read character "[". As an opening bracket, "[" is pushed onto the stack above "{". The stack now holds ["{", "["] with "[" at the top.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Read Char "(" ➔ Push "(" onto Stack',
        activeLine: 1,
        top: 1,
        stack: ['{', '['],
        state: { char: '(', action: 'push (' },
        array: ['{', '[', '(', ')', ']', '}'],
        computation: 'char = "(", action = push (',
        comparison: 'Open Bracket Encountered',
        action: 'Push (',
        desc: 'Line 1: Read character "(". Being an opening bracket, "(" is pushed onto the stack. The stack now holds ["{", "[", "("] with "(" as the current top.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Read Char ")" ➔ Match Top "(" ➔ Pop "("',
        activeLine: 2,
        top: 2,
        stack: ['{', '[', '('],
        state: { char: ')', top: '(', match: '")" matches "("' },
        array: ['{', '[', '(', ')', ']', '}'],
        computation: 'char = ")", top = "(", match = ")" matches "("',
        comparison: 'Matching Bracket Pair ✅',
        action: 'Pop (',
        desc: 'Line 2: Read character ")". Since ")" is a closing bracket, we inspect the top of the stack. The top element is "(", which matches ")". We pop "(" from the stack. Remaining stack: ["{", "["].'
      },
      {
        stepNum: 5,
        title: 'Step 5: Read Char "]" ➔ Match Top "[" ➔ Pop "["',
        activeLine: 2,
        top: 1,
        stack: ['{', '['],
        state: { char: ']', top: '[', match: '"]" matches "["' },
        array: ['{', '[', '(', ')', ']', '}'],
        computation: 'char = "]", top = "[", match = "]" matches "["',
        comparison: 'Matching Bracket Pair ✅',
        action: 'Pop [',
        desc: 'Line 2: Read character "]". The top element of the stack is "[", which correctly matches "]". We pop "[" from the stack. Remaining stack: ["{"].'
      },
      {
        stepNum: 6,
        title: 'Step 6: Read Char "}" ➔ Match Top "{" ➔ Pop "{"',
        activeLine: 2,
        top: 0,
        stack: ['{'],
        state: { char: '}', top: '{', match: '"}" matches "{"' },
        array: ['{', '[', '(', ')', ']', '}'],
        computation: 'char = "}", top = "{", match = "}" matches "{"',
        comparison: 'Matching Bracket Pair ✅',
        action: 'Pop {',
        desc: 'Line 2: Read character "}". The top element of the stack is "{", which matches "}". We pop "{" from the stack. The stack becomes completely empty.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Stack is Empty ➔ VALID PARENTHESES 🎉',
        activeLine: 3,
        top: -1,
        stack: [],
        state: { 'stack.isEmpty': 'TRUE ✅', result: 'true', status: 'VALID PARENTHESES 🎉' },
        array: ['{', '[', '(', ')', ']', '}'],
        computation: 'stack.isEmpty() == TRUE',
        comparison: 'VALID PARENTHESES 🎉',
        action: 'Return TRUE',
        isMatch: true,
        desc: 'Line 3: We reach the end of the input string and check stack.isEmpty(). Since all opening brackets were matched and popped, stack is empty (TRUE), returning true for a valid parenthesis string!'
      }
    ]
  },

  'min-stack': {
    title: 'Min Stack O(1) Minimum Tracking',
    input: 'Push [5, 2, 8, 1], getMin()',
    goal: 'Track current minimum element in O(1) time using an auxiliary minStack.',
    terms: {
      'Main Stack': 'Holds all pushed values.',
      'Min Stack': 'Holds minimum value seen so far at each level.'
    },
    array: [5, 2, 8, 1],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Push 5 ➔ minStack = [5]',
        activeLine: 1,
        top: 0,
        stack: [5],
        minStack: [5],
        state: { 'stack': '[5]', 'minStack': '[5]', 'getMin()': 5 },
        array: [5, 2, 8, 1],
        computation: 'stack=[5], minStack=[5], getMin()=5',
        comparison: 'Min = 5',
        action: 'Push 5',
        desc: 'Push element 5. The main stack receives 5. The auxiliary minStack pushes min(5, ∞) = 5. Currently, 5 is the overall minimum value.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Push 2 ➔ minStack = [5, 2]',
        activeLine: 1,
        top: 1,
        stack: [5, 2],
        minStack: [5, 2],
        state: { 'stack': '[5, 2]', 'minStack': '[5, 2]', 'getMin()': 2 },
        array: [5, 2, 8, 1],
        computation: 'stack=[5, 2], minStack=[5, 2], getMin()=2',
        comparison: 'Min = 2',
        action: 'Push 2',
        desc: 'Push element 2. Main stack receives 2. The minStack evaluates min(2, previous_min=5) = 2 and pushes 2. Calling getMin() will now return 2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Push 8 ➔ minStack = [5, 2, 2]',
        activeLine: 1,
        top: 2,
        stack: [5, 2, 8],
        minStack: [5, 2, 2],
        state: { 'stack': '[5, 2, 8]', 'minStack': '[5, 2, 2]', 'getMin()': 2 },
        array: [5, 2, 8, 1],
        computation: 'stack=[5, 2, 8], minStack=[5, 2, 2], getMin()=2',
        comparison: 'Min = 2',
        action: 'Push 8',
        desc: 'Push element 8. Main stack receives 8. The minStack evaluates min(8, previous_min=2) = 2 and pushes 2. getMin() remains 2 because 8 is larger than current minimum.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Push 1 ➔ getMin() = 1 in O(1) Time 🎉',
        activeLine: 2,
        top: 3,
        stack: [5, 2, 8, 1],
        minStack: [5, 2, 2, 1],
        state: { 'stack': '[5, 2, 8, 1]', 'minStack': '[5, 2, 2, 1]', 'getMin()': 1, status: 'GETMIN O(1) 🎉' },
        array: [5, 2, 8, 1],
        computation: 'stack=[5, 2, 8, 1], minStack=[5, 2, 2, 1], getMin()=1',
        comparison: 'GETMIN IN O(1) 🎉',
        action: 'Return minStack.top()',
        isMatch: true,
        desc: 'Push element 1. Main stack receives 1. The minStack evaluates min(1, previous_min=2) = 1 and pushes 1. getMin() instantly returns top of minStack (1) in O(1) time!'
      }
    ]
  }
};
