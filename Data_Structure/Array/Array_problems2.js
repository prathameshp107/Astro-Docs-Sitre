/*
============================================================
BASIC ARRAY PROBLEMS
============================================================
These problems build the foundation for many interview questions.
Understanding these helps with sorting, searching, and optimization.
============================================================
*/



/*
============================================================
1. FIND THE LARGEST ELEMENT IN ARRAY
============================================================

Problem:
Find the largest number in an array.

Example:
[3, 7, 2, 9, 5]

Output:
9

Explanation:
Traverse the array and keep track of the largest value.
*/


/*
Approach — Linear Scan

Time Complexity: O(n)
Space Complexity: O(1)
*/

function findLargest(arr) {

  let largest = arr[0]

  for (let i = 1; i < arr.length; i++) {

    if (arr[i] > largest) {
      largest = arr[i]
    }

  }

  return largest
}





/*
============================================================
2. FIND THE MINIMUM ELEMENT IN ARRAY
============================================================

Problem:
Find the smallest element in the array.

Example:
[3, 7, 2, 9, 5]

Output:
2

Explanation:
Iterate through the array and track the smallest value.
*/


/*
Approach — Linear Scan

Time Complexity: O(n)
Space Complexity: O(1)
*/

function findMinimum(arr) {

  let min = arr[0]

  for (let i = 1; i < arr.length; i++) {

    if (arr[i] < min) {
      min = arr[i]
    }

  }

  return min
}





/*
============================================================
3. FIND THE SECOND LARGEST ELEMENT
============================================================

Problem:
Find the second largest element in the array.

Example:
[10, 20, 4, 45, 99]

Output:
45

Explanation:
Track both largest and second largest values.
*/


/*
Approach — Single Pass

Time Complexity: O(n)
Space Complexity: O(1)
*/

function secondLargest(arr) {

  let largest = -Infinity
  let second = -Infinity

  for (let num of arr) {

    if (num > largest) {

      second = largest
      largest = num

    } else if (num > second && num !== largest) {

      second = num

    }

  }

  return second
}





/*
============================================================
4. FIND THE NTH LARGEST ELEMENT
============================================================

Problem:
Find the nth largest element in the array.

Example:
[4, 2, 7, 1, 9]

n = 2

Output:
7
*/


/*
Approach 1 — Sorting

Explanation:
Sort array in descending order.

Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function nthLargest(arr, n) {

  const sorted = [...arr].sort((a, b) => b - a)

  return sorted[n - 1]

}





/*
============================================================
5. FIND THE NTH MINIMUM ELEMENT
============================================================

Problem:
Find the nth smallest element in the array.

Example:
[4, 2, 7, 1, 9]

n = 2

Output:
2
*/


/*
Approach — Sorting

Time Complexity: O(n log n)
Space Complexity: O(1)
*/

function nthMinimum(arr, n) {

  const sorted = [...arr].sort((a, b) => a - b)

  return sorted[n - 1]

}





/*
============================================================
6. CHECK IF ARRAY IS SORTED
============================================================

Problem:
Check if array is sorted in ascending order.

Example:
[1,2,3,4,5] → true
[1,3,2,4] → false

Explanation:
Compare each element with the next element.
*/


/*
Approach — Linear Scan

Time Complexity: O(n)
Space Complexity: O(1)
*/

function isArraySorted(arr) {

  for (let i = 0; i < arr.length - 1; i++) {

    if (arr[i] > arr[i + 1]) {
      return false
    }

  }

  return true
}





/*
============================================================
TEST CASES
============================================================
*/

console.log(findLargest([3,7,2,9,5]))

console.log(findMinimum([3,7,2,9,5]))

console.log(secondLargest([10,20,4,45,99]))

console.log(nthLargest([4,2,7,1,9],2))

console.log(nthMinimum([4,2,7,1,9],2))

console.log(isArraySorted([1,2,3,4,5]))