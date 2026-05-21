/*
============================================================
DSA INTERVIEW PRACTICE
Author: Prathamesh Pawar
Topic: Arrays & Strings
============================================================
Each problem includes:
1. Problem statement
2. Short explanation
3. Multiple approaches
4. Time & Space complexity
============================================================
*/



/*
============================================================
1. TWO SUM
============================================================

Problem:
Given an array of integers and a target value,
return the indices of two numbers such that they add up to the target.

Example:
nums = [2,7,11,15]
target = 9

Output:
[0,1]

Explanation:
2 + 7 = 9

Idea:
Find two numbers whose sum equals the target.
*/


/*
Approach 1 — Brute Force

Explanation:
Check every possible pair of numbers.

Steps:
1. Pick first element
2. Compare with every other element
3. If sum equals target → return indices

Time Complexity: O(n²)
Space Complexity: O(1)
*/

function twoSumBrute(nums, target) {

  for (let i = 0; i < nums.length; i++) {

    for (let j = i + 1; j < nums.length; j++) {

      if (nums[i] + nums[j] === target) {
        return [i, j]
      }

    }

  }

  return []

}



/*
Approach 2 — Hash Map (Optimal)

Explanation:
Store numbers we have already seen.

Steps:
1. For each number calculate complement:
   complement = target - current number
2. Check if complement already exists in map
3. If yes → solution found

Time Complexity: O(n)
Space Complexity: O(n)
*/

function twoSumHash(nums, target) {

  const map = new Map()

  for (let i = 0; i < nums.length; i++) {

    const complement = target - nums[i]

    if (map.has(complement)) {
      return [map.get(complement), i]
    }

    map.set(nums[i], i)

  }

  return []

}



/*
Approach 3 — Two Pointer (Only for Sorted Array)

Explanation:
Use two pointers from start and end.

Steps:
1. If sum is small → move left pointer
2. If sum is big → move right pointer
3. If equal → return indices

Time Complexity: O(n)
Space Complexity: O(1)
*/

function twoSumTwoPointer(nums, target) {

  let left = 0
  let right = nums.length - 1

  while (left < right) {

    const sum = nums[left] + nums[right]

    if (sum === target) return [left, right]

    if (sum < target) left++
    else right--

  }

  return []

}





/*
============================================================
2. PALINDROME
============================================================

Problem:
Check if a string reads the same forward and backward.

Examples:
"racecar" → true
"madam" → true
"hello" → false

Explanation:
A palindrome remains identical when reversed.
*/


/*
Approach 1 — Reverse String

Explanation:
Reverse the string and compare with original.

Time Complexity: O(n)
Space Complexity: O(n)
*/

function isPalindromeReverse(str) {

  const reversed = str.split('').reverse().join('')
  return reversed === str

}



/*
Approach 2 — Two Pointer (Best)

Explanation:
Compare characters from start and end.

Steps:
1. Compare first and last character
2. Move pointers inward
3. Stop if mismatch found

Time Complexity: O(n)
Space Complexity: O(1)
*/

function isPalindromeTwoPointer(str) {

  let left = 0
  let right = str.length - 1

  while (left < right) {

    if (str[left] !== str[right]) {
      return false
    }

    left++
    right--

  }

  return true

}





/*
============================================================
3. REVERSE STRING
============================================================

Problem:
Reverse the characters of a string.

Example:
"hello" → "olleh"

Explanation:
The first character becomes last and last becomes first.
*/


/*
Approach 1 — Built-in Functions

Explanation:
Split → Reverse → Join

Time Complexity: O(n)
*/

function reverseStringBuiltIn(str) {

  return str.split('').reverse().join('')

}



/*
Approach 2 — Loop

Explanation:
Iterate from end to start and build new string.

Time Complexity: O(n)
Space Complexity: O(n)
*/

function reverseStringLoop(str) {

  let result = ""

  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i]
  }

  return result

}



/*
Approach 3 — Two Pointer

Explanation:
Swap characters from both ends.

Time Complexity: O(n)
Space Complexity: O(n)
*/

function reverseStringTwoPointer(str) {

  let arr = str.split('')
  let left = 0
  let right = arr.length - 1

  while (left < right) {

    [arr[left], arr[right]] = [arr[right], arr[left]]

    left++
    right--

  }

  return arr.join('')

}





/*
============================================================
4. MERGE SORTED ARRAY
============================================================

Problem:
Merge two sorted arrays into one sorted array.

Example:
nums1 = [1,2,3]
nums2 = [2,5,6]

Output:
[1,2,2,3,5,6]

Explanation:
Since arrays are already sorted,
we can compare smallest elements first.
*/


/*
Approach 1 — Two Pointer Merge

Explanation:
Use two pointers and pick smaller element.

Time Complexity: O(n + m)
Space Complexity: O(n + m)
*/

function mergeSortedArray(nums1, nums2) {

  let result = []
  let i = 0
  let j = 0

  while (i < nums1.length && j < nums2.length) {

    if (nums1[i] < nums2[j]) {

      result.push(nums1[i])
      i++

    } else {

      result.push(nums2[j])
      j++

    }

  }

  return result
    .concat(nums1.slice(i))
    .concat(nums2.slice(j))

}



/*
Approach 2 — Concatenate and Sort

Explanation:
Combine arrays then sort.

Time Complexity: O((n+m) log(n+m))
*/

function mergeUsingSort(nums1, nums2) {

  return nums1.concat(nums2).sort((a, b) => a - b)

}





/*
============================================================
5. VALID PARENTHESES
============================================================

Problem:
Check if parentheses are balanced.

Examples:
"()[]{}" → true
"(]" → false
"([)]" → false

Explanation:
Each opening bracket must have a correct closing bracket
in the correct order.
*/


/*
Approach — Stack

Explanation:
Use stack to store opening brackets.

Steps:
1. Push opening brackets
2. When closing bracket appears
   check top of stack
3. If mismatch → invalid

Time Complexity: O(n)
Space Complexity: O(n)
*/

function isValidParentheses(str) {

  const stack = []

  const map = {
    ")": "(",
    "}": "{",
    "]": "["
  }

  for (let char of str) {

    if (char === "(" || char === "{" || char === "[") {

      stack.push(char)

    } else {

      if (stack.pop() !== map[char]) {
        return false
      }

    }

  }

  return stack.length === 0

}





/*
============================================================
TEST CASES
============================================================
*/

console.log(twoSumHash([2,7,11,15],9))

console.log(isPalindromeTwoPointer("racecar"))

console.log(reverseStringLoop("hello"))

console.log(mergeSortedArray([1,2,3],[2,5,6]))

console.log(isValidParentheses("()[]{}"))
