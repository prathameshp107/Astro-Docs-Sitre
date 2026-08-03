export const linkedListLogic = {
  'linked-list': {
    title: 'Linked List Operations & Traversal',
    input: 'List = [10 → 20 → 30 → 40 → NULL]',
    goal: 'Demonstrate pointer-based traversal, node insertion, deletion, and link reversal.',
    terms: {
      'head': 'Pointer to the first node in the linked list.',
      'curr': 'Current node pointer being processed.',
      'next': 'Pointer to the subsequent node (curr.next).'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Traversal — curr = head (val 10)',
        left: 0, right: 0,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = head ➔ val = 10',
        comparison: '10 != null (TRUE ✅)',
        action: 'Process Node 10',
        desc: 'Initialize curr = head (node 10). Check condition curr != null (TRUE ✅).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Advance curr = curr.next ➔ Node 20',
        left: 1, right: 1,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = curr.next ➔ val = 20',
        comparison: '20 != null (TRUE ✅)',
        action: 'Process Node 20',
        desc: 'Advance curr = curr.next to index 1 (val 20). Check condition curr != null (TRUE ✅).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Advance curr = curr.next ➔ Node 30',
        left: 2, right: 2,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = curr.next ➔ val = 30',
        comparison: '30 != null (TRUE ✅)',
        action: 'Process Node 30',
        desc: 'Advance curr = curr.next to index 2 (val 30). Check condition curr != null (TRUE ✅).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Advance curr = curr.next ➔ Node 40',
        left: 3, right: 3,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = curr.next ➔ val = 40',
        comparison: '40 != null (TRUE ✅)',
        action: 'Process Node 40',
        desc: 'Advance curr = curr.next to index 3 (val 40). Check condition curr != null (TRUE ✅).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Traversal Complete ➔ Processed All Nodes 🎉',
        left: 3, right: 3,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = NULL',
        comparison: 'TRAVERSAL COMPLETE 🎉',
        action: 'Return Processed Nodes',
        isMatch: true,
        desc: 'Advance curr = curr.next (NULL). Traversal complete! Processed all 4 nodes in O(N) time! 🎉'
      }
    ]
  },

  'singly-ll': {
    title: 'Singly Linked List Traversal O(N)',
    input: 'List = [10 → 20 → 30 → 40 → NULL]',
    goal: 'Traverse list sequentially from head to NULL using next pointer.',
    terms: {
      'head': 'Pointer to first node.',
      'curr': 'Active node pointer advancing node-by-node.',
      'curr.next': 'Reference to next node structure in memory.'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Start Traversal — curr = head (node 10)',
        left: 0, right: 0,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = head (10)',
        comparison: '10 != null (TRUE ✅)',
        action: 'Process Node 10',
        desc: 'Set curr = head (node 10). Loop condition curr != null holds true. Process node 10.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Advance curr = curr.next ➔ Node 20',
        left: 1, right: 1,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = curr.next (20)',
        comparison: '20 != null (TRUE ✅)',
        action: 'Process Node 20',
        desc: 'Follow next pointer to node 20. Process node 20.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Advance curr = curr.next ➔ Node 30',
        left: 2, right: 2,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = curr.next (30)',
        comparison: '30 != null (TRUE ✅)',
        action: 'Process Node 30',
        desc: 'Follow next pointer to node 30. Process node 30.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Advance curr = curr.next ➔ Node 40',
        left: 3, right: 3,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = curr.next (40)',
        comparison: '40 != null (TRUE ✅)',
        action: 'Process Node 40',
        desc: 'Follow next pointer to node 40. Process node 40.'
      },
      {
        stepNum: 5,
        title: 'Step 5: curr = curr.next (NULL) ➔ Traversal Complete! 🎉',
        left: 3, right: 3,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = NULL',
        comparison: 'NULL != null (FALSE ❌)',
        action: 'Terminate Loop',
        isMatch: true,
        desc: 'curr becomes NULL. Loop terminates. All 4 nodes visited sequentially in O(N) time! 🎉'
      }
    ]
  },

  'insert-head': {
    title: 'Linked List — Insertion at Head O(1)',
    input: 'List = [10 → 20 → 30 → NULL], Value to Insert = 5',
    goal: 'Prepend new node at beginning of list in O(1) constant time without shifting elements.',
    terms: {
      'newNode': 'Newly allocated node object with val = 5.',
      'head': 'Original head pointer of the list.',
      'newNode.next': 'Link pointer set to point to existing head.'
    },
    array: [5, 10, 20, 30],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Create New Node — val = 5',
        left: 0, right: 1,
        leftLabel: 'newNode', rightLabel: 'head',
        array: [5, 10, 20, 30],
        computation: 'newNode.val = 5, newNode.next = null',
        comparison: 'Node Allocated',
        action: 'Point newNode.next',
        desc: 'Allocate memory and initialize newNode with value 5.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Point newNode.next to head (node 10)',
        left: 0, right: 1,
        leftLabel: 'newNode', rightLabel: 'head',
        array: [5, 10, 20, 30],
        computation: 'newNode.next = head (10)',
        comparison: 'Link 5 → 10 Created',
        action: 'Reassign Head Pointer',
        desc: 'Set newNode.next = head. The new node 5 now links directly to former head node 10.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Reassign head = newNode (node 5)',
        left: 0, right: 0,
        leftLabel: 'new head', rightLabel: 'new head',
        array: [5, 10, 20, 30],
        computation: 'head = newNode (5)',
        comparison: '5 is New Head ✅',
        action: 'Verify Head Insertion',
        desc: 'Update head pointer to newNode (5). Node 5 becomes the official start of the list.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Insertion at Head Complete ➔ 5 → 10 → 20 → 30 → NULL 🎉',
        left: 0, right: 0,
        leftLabel: 'head', rightLabel: 'head',
        array: [5, 10, 20, 30],
        computation: 'List = 5 → 10 → 20 → 30 → NULL',
        comparison: 'O(1) CONSTANT TIME 🎉',
        action: 'Return Head',
        isMatch: true,
        desc: 'Head insertion complete! List updated to 5 → 10 → 20 → 30 → NULL in O(1) constant time! 🎉'
      }
    ]
  },

  'delete-node': {
    title: 'Linked List — Deletion by Value O(N)',
    input: 'List = [10 → 20 → 30 → 40 → NULL], Target Value = 20',
    goal: 'Traverse list to find target value, then bypass target node by re-linking prev.next = curr.next.',
    terms: {
      'prev': 'Pointer to previous node before target.',
      'curr': 'Pointer to node currently being checked for target value.',
      'Unlinking': 'Setting prev.next = curr.next to bypass target node in memory.'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init Pointers — curr = head (10), prev = NULL',
        left: 0, right: 0,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'curr = head (10), Target = 20',
        comparison: '10 == 20 (FALSE ❌)',
        action: 'Advance Pointers',
        desc: 'Initialize curr = head (node 10), prev = NULL. Compare 10 == 20 (FALSE ❌).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Advance prev = node(10), curr = node(20)',
        left: 0, right: 1,
        leftLabel: 'prev', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'prev = 10, curr = 20',
        comparison: '20 == 20 (MATCH FOUND! ✅)',
        action: 'Unlink Node 20',
        desc: 'Advance prev to node 10 and curr to node 20. Compare 20 == 20 (MATCH FOUND! ✅).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Unlink Target — Set prev.next = curr.next (30)',
        left: 0, right: 2,
        leftLabel: 'prev', rightLabel: 'prev.next',
        array: [10, 30, 40],
        computation: 'prev.next = curr.next (30)',
        comparison: 'Node 20 Bypassed ✅',
        action: 'Free Memory',
        desc: 'Unlink node 20 by setting prev.next = curr.next (node 30). Node 10 now points directly to 30.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Deletion Complete ➔ 10 → 30 → 40 → NULL 🎉',
        left: 0, right: 1,
        leftLabel: 'head', rightLabel: 'prev.next',
        array: [10, 30, 40],
        computation: 'List = 10 → 30 → 40 → NULL',
        comparison: 'DELETED IN O(N) TIME 🎉',
        action: 'Return Head',
        isMatch: true,
        desc: 'Deletion complete! Target node 20 removed. Resulting list: 10 → 30 → 40 → NULL! 🎉'
      }
    ]
  },

  'reverse-ll': {
    title: 'Reverse Linked List O(N)',
    input: 'List = [10 → 20 → 30 → 40 → NULL]',
    goal: 'Reverse direction of all next pointers in-place using three pointers (prev, curr, next).',
    terms: {
      'prev': 'Tracks previous node (new next pointer target). Starts at NULL.',
      'curr': 'Current node being reversed. Starts at head.',
      'next': 'Temporary storage for curr.next before breaking the forward link.'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init Pointer States — prev = NULL, curr = head (node 10)',
        left: 0, right: 0,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'prev = NULL, curr = 10, head = 10',
        comparison: '10 != null (TRUE ✅)',
        action: 'Init Pointers',
        desc: 'Initialize prev = NULL, curr = head (node 10). Check while condition curr != null (10 != null is TRUE).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Iteration 1 (Node 10) — Save next = 20, set curr.next = prev (NULL)',
        left: 0, right: 1,
        leftLabel: 'curr', rightLabel: 'next',
        array: [10, 20, 30, 40],
        computation: 'next = curr.next (20), 10.next = NULL',
        comparison: 'Link 10 → NULL Reversed',
        action: 'Reverse Link 10',
        desc: 'Save next pointer = node 20. Reverse link: set curr.next = prev (node 10 now points to NULL).'
      },
      {
        stepNum: 3,
        title: 'Step 3: Iteration 1 (Node 10) — Advance prev = 10, curr = 20',
        left: 0, right: 1,
        leftLabel: 'prev', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'prev = 10, curr = 20',
        comparison: 'Pointers Shifted Right',
        action: 'Advance Pointers',
        desc: 'Advance pointers: set prev = curr (node 10) and curr = next (node 20).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Iteration 2 (Node 20) — Save next = 30, set curr.next = prev (10)',
        left: 1, right: 2,
        leftLabel: 'curr', rightLabel: 'next',
        array: [10, 20, 30, 40],
        computation: 'next = curr.next (30), 20.next = 10',
        comparison: 'Link 20 → 10 Reversed',
        action: 'Reverse Link 20',
        desc: 'Save next pointer = node 30. Reverse link: set curr.next = prev (node 20 now points to 10).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Iteration 2 (Node 20) — Advance prev = 20, curr = 30',
        left: 1, right: 2,
        leftLabel: 'prev', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'prev = 20, curr = 30',
        comparison: 'Pointers Shifted Right',
        action: 'Advance Pointers',
        desc: 'Advance pointers: set prev = curr (node 20) and curr = next (node 30).'
      },
      {
        stepNum: 6,
        title: 'Step 6: Iteration 3 (Node 30) — Save next = 40, set curr.next = prev (20)',
        left: 2, right: 3,
        leftLabel: 'curr', rightLabel: 'next',
        array: [10, 20, 30, 40],
        computation: 'next = curr.next (40), 30.next = 20',
        comparison: 'Link 30 → 20 Reversed',
        action: 'Reverse Link 30',
        desc: 'Save next pointer = node 40. Reverse link: set curr.next = prev (node 30 now points to 20).'
      },
      {
        stepNum: 7,
        title: 'Step 7: Iteration 3 (Node 30) — Advance prev = 30, curr = 40',
        left: 2, right: 3,
        leftLabel: 'prev', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'prev = 30, curr = 40',
        comparison: 'Pointers Shifted Right',
        action: 'Advance Pointers',
        desc: 'Advance pointers: set prev = curr (node 30) and curr = next (node 40).'
      },
      {
        stepNum: 8,
        title: 'Step 8: Iteration 4 (Node 40) — Save next = NULL, set curr.next = prev (30)',
        left: 3, right: 3,
        leftLabel: 'curr', rightLabel: 'curr',
        array: [10, 20, 30, 40],
        computation: 'next = NULL, 40.next = 30',
        comparison: 'Link 40 → 30 Reversed',
        action: 'Reverse Link 40',
        desc: 'Save next pointer = NULL. Reverse link: set curr.next = prev (node 40 now points to 30).'
      },
      {
        stepNum: 9,
        title: 'Step 9: Iteration 4 (Node 40) — Advance prev = 40, curr = NULL',
        left: 3, right: 3,
        leftLabel: 'prev', rightLabel: 'prev',
        array: [10, 20, 30, 40],
        computation: 'prev = 40, curr = NULL',
        comparison: 'curr Reaches End',
        action: 'Advance Pointers',
        desc: 'Advance pointers: set prev = curr (node 40) and curr = next (NULL).'
      },
      {
        stepNum: 10,
        title: 'Step 10: Check Loop Condition — curr == NULL ➔ Loop Terminates',
        left: 3, right: 3,
        leftLabel: 'prev', rightLabel: 'prev',
        array: [10, 20, 30, 40],
        computation: 'curr == NULL',
        comparison: 'NULL != null (FALSE ❌)',
        action: 'Terminate Loop',
        desc: 'Check while loop condition: curr != null is FALSE (NULL != null). Loop terminates.'
      },
      {
        stepNum: 11,
        title: 'Step 11: Return prev (Node 40) ➔ Reversal Complete! 🎉',
        left: 0, right: 3,
        leftLabel: 'old head', rightLabel: 'new head',
        array: [40, 30, 20, 10],
        computation: 'Return prev (node 40)',
        comparison: '40 → 30 → 20 → 10 → NULL 🎉',
        action: 'Return prev',
        isMatch: true,
        desc: 'Return prev (node 40). List successfully reversed to 40 → 30 → 20 → 10 → NULL in O(N) time! 🎉'
      }
    ]
  }
};
