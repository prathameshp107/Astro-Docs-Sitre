/*
============================================================
INTERVIEW ARRAY MANIPULATION PROBLEMS
============================================================
These problems are extremely common in coding interviews.
They test understanding of array traversal, shifting,
and in-place manipulation.
============================================================
*/



/*
============================================================
1. REMOVE DUPLICATES FROM SORTED ARRAY
============================================================

Problem:
Given a sorted array, remove duplicate elements in-place
and return the new length.

Example:
Input: [1,1,2,2,3,4,4]
Output: [1,2,3,4]

Explanation:
Because the array is sorted, duplicates appear next to each other.
We can use two pointers to track unique elements.
*/


/*
Approach — Two Pointer

Time Complexity: O(n)
Space Complexity: O(1)
*/

function removeDuplicates(arr) {

  if (arr.length === 0) return 0

  let i = 0

  for (let j = 1; j < arr.length; j++) {

    if (arr[i] !== arr[j]) {
      i++
      arr[i] = arr[j]
    }

  }

  return i + 1

}





/*
============================================================
2. LEFT ROTATE ARRAY BY ONE
============================================================

Problem:
Rotate array left by one position.

Example:
[1,2,3,4,5]

Output:
[2,3,4,5,1]

Explanation:
Store first element and shift all elements left.
*/


/*
Approach — Shift Elements

Time Complexity: O(n)
Space Complexity: O(1)
*/

function leftRotateByOne(arr) {

  let first = arr[0]

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1]
  }

  arr[arr.length - 1] = first

  return arr

}





/*
============================================================
3. LEFT ROTATE ARRAY BY K PLACES
============================================================

Problem:
Rotate array left by k positions.

Example:
[1,2,3,4,5]
k = 2

Output:
[3,4,5,1,2]

Explanation:
First k elements move to the end.
*/


/*
Approach 1 — Extra Array

Time Complexity: O(n)
Space Complexity: O(n)
*/

function leftRotateByK(arr, k) {

  let n = arr.length

  k = k % n

  let rotated = arr.slice(k).concat(arr.slice(0, k))

  return rotated

}





/*
Approach 2 — Reversal Algorithm (Optimal)

Steps:
1. Reverse first k elements
2. Reverse remaining elements
3. Reverse whole array

Time Complexity: O(n)
Space Complexity: O(1)
*/

function reverse(arr, start, end) {

  while (start < end) {

    [arr[start], arr[end]] = [arr[end], arr[start]]

    start++
    end--

  }

}

function leftRotateOptimal(arr, k) {

  let n = arr.length
  k = k % n

  reverse(arr, 0, k - 1)
  reverse(arr, k, n - 1)
  reverse(arr, 0, n - 1)

  return arr

}





/*
============================================================
4. MOVE ZEROS TO END
============================================================

Problem:
Move all zeros to the end of the array
while maintaining the order of non-zero elements.

Example:
[0,1,0,3,12]

Output:
[1,3,12,0,0]

Explanation:
Shift non-zero elements forward and place zeros at the end.
*/


/*
Approach — Two Pointer

Time Complexity: O(n)
Space Complexity: O(1)
*/

function moveZeros(arr) {

  let index = 0

  for (let i = 0; i < arr.length; i++) {

    if (arr[i] !== 0) {

      [arr[i], arr[index]] = [arr[index], arr[i]]

      index++

    }

  }

  return arr

}





/*
============================================================
5. ROTATE ARRAY (RIGHT ROTATION)
============================================================

Problem:
Rotate array to the right by k positions.

Example:
[1,2,3,4,5]
k = 2

Output:
[4,5,1,2,3]

Explanation:
Elements from end move to front.
*/


/*
Approach — Reversal Algorithm

Steps:
1. Reverse whole array
2. Reverse first k elements
3. Reverse remaining elements

Time Complexity: O(n)
Space Complexity: O(1)
*/

function rotateArrayRight(arr, k) {

  let n = arr.length

  k = k % n

  reverse(arr, 0, n - 1)

  reverse(arr, 0, k - 1)

  reverse(arr, k, n - 1)

  return arr

}





/*
============================================================
TEST CASES
============================================================
*/

console.log(removeDuplicates([1,1,2,2,3,4,4]))

console.log(leftRotateByOne([1,2,3,4,5]))

console.log(leftRotateByK([1,2,3,4,5],2))

console.log(moveZeros([0,1,0,3,12]))

console.log(rotateArrayRight([1,2,3,4,5],2))