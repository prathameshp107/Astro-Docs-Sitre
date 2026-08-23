export const queueLogic = {
  'queue': {
    title: 'Queue Operations (FIFO - First In First Out)',
    input: 'Enqueue [10, 20, 30, 40], Dequeue 10',
    goal: 'Demonstrate FIFO enqueue (at rear) and dequeue (at front) mechanics with pointers.',
    terms: {
      'Front Pointer': 'Tracks index of first element to be removed.',
      'Rear Pointer': 'Tracks index of last inserted element.',
      'FIFO Principle': 'First In, First Out — element enqueued first is dequeued first.'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Initialize Empty Queue (front = -1, rear = -1)',
        activeLine: 1,
        left: -1,
        right: -1,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'front = -1, rear = -1, Queue = []',
        comparison: 'Queue Empty',
        action: 'Init Queue',
        desc: 'Initialize empty queue structure. Both front (removal index) and rear (insertion index) pointers are initialized to -1, indicating that the queue buffer currently contains zero elements.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Enqueue 10 ➔ front = 0, rear = 0',
        activeLine: 2,
        left: 0,
        right: 0,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'front = 0, rear = 0, queue[0] = 10',
        comparison: '10 Enqueued',
        action: 'Enqueue 10',
        desc: 'To enqueue the first element 10, we initialize both front and rear pointers to index 0 (front = 0, rear = 0) and place value 10 at queue[0]. Element 10 is now simultaneously the head and tail of the queue.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Enqueue 20, 30, 40 ➔ rear = 3',
        activeLine: 3,
        left: 0,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'front = 0, rear = 3, Queue = [10, 20, 30, 40]',
        comparison: 'Queue Full',
        action: 'Enqueue 20, 30, 40',
        desc: 'Next, we enqueue elements 20, 30, and 40 sequentially. Each insertion increments the rear pointer while front remains stationary at index 0. Rear advances from 0 to 3, filling the queue buffer.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Dequeue Front Element (10) ➔ front Moves to 1',
        activeLine: 3,
        left: 1,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'dequeued = 10, front = front + 1 = 1',
        comparison: '10 Dequeued (FIFO)',
        action: 'Dequeue Element',
        desc: 'We perform a dequeue operation to remove an element following the FIFO (First-In-First-Out) rule. The element at front pointer (10 at queue[0]) is dequeued, and front advances to index 1 (value 20).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Queue Operations Complete 🎉',
        activeLine: 4,
        left: 1,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'Queue = [20, 30, 40], front = 1, rear = 3',
        comparison: 'O(1) CONSTANT TIME 🎉',
        action: 'Return Queue State',
        isMatch: true,
        desc: 'All queue operations complete in O(1) constant time per operation because elements are enqueued at rear and dequeued at front without shifting array elements.'
      }
    ]
  },

  'queue-enqueue': {
    title: 'Queue Enqueue Operation O(1)',
    input: 'Enqueue elements [10, 20, 30, 40] into Queue',
    goal: 'Demonstrate pointer-based FIFO queue insertions at the rear.',
    terms: {
      'rear': 'Index pointer tracking the last inserted element.',
      'enqueue': 'rear = rear + 1, queue[rear] = item',
      'overflow': 'Check if rear == max_size - 1 before enqueuing.'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Check Overflow Condition (rear == -1)',
        activeLine: 1,
        left: -1,
        right: -1,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'front = -1, rear = -1, max_size = 4',
        comparison: 'rear (-1) == max_size - 1 (FALSE ❌)',
        action: 'Check Overflow',
        desc: 'Line 1: Before enqueuing element 10, we check for Queue Overflow by evaluating if rear == max_size - 1 (-1 == 3). The condition is FALSE, indicating available slot capacity in the buffer.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Enqueue First Element 10 ➔ Set front = 0, rear = 0',
        activeLine: 2,
        left: 0,
        right: 0,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'front = 0, rear = 0, queue[0] = 10',
        comparison: 'Front & Rear Initialized to 0',
        action: 'Init Pointers',
        desc: 'Line 2 & 3: Since this is the first element being inserted into an empty queue (front == -1), we initialize front = 0 and advance rear from -1 to 0.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Element 10 Placed at Index 0',
        activeLine: 4,
        left: 0,
        right: 0,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'queue[rear] = 10',
        comparison: '10 Enqueued ✅',
        action: 'Place 10',
        desc: 'Line 4: We store the incoming value 10 into queue[rear], setting queue[0] = 10. Element 10 is now successfully enqueued at index 0.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Increment rear = 1 ➔ Enqueue 20',
        activeLine: 3,
        left: 0,
        right: 1,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'rear = 1, queue[1] = 20',
        comparison: '20 Enqueued ✅',
        action: 'Enqueue 20',
        desc: 'Line 3 & 4: Enqueuing element 20. Rear pointer increments from 0 to 1, and value 20 is placed into queue[1]. Front pointer remains stationary at index 0 (value 10).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Increment rear = 2 ➔ Enqueue 30',
        activeLine: 3,
        left: 0,
        right: 2,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'rear = 2, queue[2] = 30',
        comparison: '30 Enqueued ✅',
        action: 'Enqueue 30',
        desc: 'Line 3 & 4: Enqueuing element 30. Rear pointer increments from 1 to 2, and value 30 is placed into queue[2]. Queue size is now 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Increment rear = 3 ➔ Enqueue 40 ➔ ENQUEUED ALL 🎉',
        activeLine: 4,
        left: 0,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'rear = 3, queue[3] = 40',
        comparison: 'QUEUE FULL 🎉',
        action: 'Enqueue 40 (Full)',
        isMatch: true,
        desc: 'Line 3 & 4: Enqueuing final element 40. Rear pointer increments from 2 to 3, placing 40 at queue[3]. Rear has reached max_size - 1 (3 == 3), meaning the queue buffer is now completely full!'
      }
    ]
  },

  'queue-dequeue': {
    title: 'Queue Dequeue Operation O(1)',
    input: 'Queue = [10, 20, 30, 40], Dequeue Front Element',
    goal: 'Demonstrate FIFO deletion at front pointer and underflow checking.',
    terms: {
      'underflow': 'Check front == -1 before dequeuing.',
      'dequeue': 'val = queue[front], front = front + 1'
    },
    array: [10, 20, 30, 40],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Check Underflow Condition (front = 0)',
        activeLine: 1,
        left: 0,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'front = 0, rear = 3',
        comparison: 'front == -1 (FALSE ❌)',
        action: 'Check Underflow',
        desc: 'Line 1: Before removing an element, we check for Queue Underflow by evaluating if front == -1 or front > rear (0 == -1). The condition is FALSE, confirming that the queue contains active elements to dequeue.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Read Front Element val = queue[front] (10)',
        activeLine: 2,
        left: 0,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'dequeuedVal = queue[0] = 10',
        comparison: 'Element 10 Read',
        action: 'Read Front Val',
        desc: 'Line 2: We copy the element located at the current front index (queue[front] = queue[0] = 10) into a temporary return variable dequeuedVal.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Increment front = front + 1 = 1',
        activeLine: 3,
        left: 1,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'front = 1',
        comparison: '10 Dequeued from Queue',
        action: 'Increment front',
        desc: 'Line 3: To remove the front element in accordance with FIFO rules, we advance the front pointer by 1 (front = front + 1 = 1). Element 10 is dequeued, and front now points to index 1 (value 20).'
      },
      {
        stepNum: 4,
        title: 'Step 4: Return Dequeued Value = 10 ➔ Dequeue Complete! 🎉',
        activeLine: 4,
        left: 1,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40],
        computation: 'returnedVal = 10, front = 1',
        comparison: 'DEQUEUED 10 ✅',
        action: 'Return 10',
        isMatch: true,
        desc: 'Line 4: The dequeue operation completes by returning value 10. The remaining active queue elements are [20, 30, 40] spanning from front (1) to rear (3), executed in O(1) time!'
      }
    ]
  },

  'queue-circular-queue': {
    title: 'Circular Queue (Ring Buffer) O(1)',
    input: 'Queue Capacity = 5, Wraparound Pointers',
    goal: 'Reuse empty spaces created by dequeued elements using modulo arithmetic rear = (rear + 1) % MAX.',
    terms: {
      'Modulo Formula': 'next_index = (current_index + 1) % Capacity',
      'Full Condition': '(rear + 1) % Capacity == front'
    },
    array: [10, 20, 30, 40, 50],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Circular Queue Initialization (front = 0, rear = 3)',
        activeLine: 1,
        left: 0,
        right: 3,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40, 50],
        computation: 'front = 0, rear = 3, capacity = 5',
        comparison: 'Slots 0..3 Filled',
        action: 'Init Circular Queue',
        desc: 'Line 1: Initialize circular queue (ring buffer) with capacity 5. Elements [10, 20, 30, 40] occupy indices 0 through 3. Front is at index 0 (10) and Rear is at index 3 (40).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Enqueue 50 ➔ rear = (3 + 1) % 5 = 4',
        activeLine: 2,
        left: 0,
        right: 4,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40, 50],
        computation: 'rear = (3 + 1) % 5 = 4',
        comparison: 'Queue Full at Capacity 5',
        action: 'Enqueue 50',
        desc: 'Line 2: Enqueue 50 using circular index formula: rear = (rear + 1) % capacity = (3 + 1) % 5 = 4. Element 50 is stored at index 4, filling the buffer to capacity.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Dequeue 10 ➔ front = (0 + 1) % 5 = 1',
        activeLine: 3,
        left: 1,
        right: 4,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [10, 20, 30, 40, 50],
        computation: 'front = (0 + 1) % 5 = 1',
        comparison: 'Slot 0 Freed up!',
        action: 'Dequeue 10',
        desc: 'Line 3: Dequeue element 10 from front. We advance front using circular formula: front = (front + 1) % capacity = (0 + 1) % 5 = 1. Slot 0 is now freed up for future wraparound insertions!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Enqueue 60 ➔ rear Wraps Around to Index 0! (rear = 0) 🎉',
        activeLine: 4,
        left: 1,
        right: 0,
        leftLabel: 'front',
        rightLabel: 'rear',
        array: [60, 20, 30, 40, 50],
        computation: 'rear = (4 + 1) % 5 = 0 ➔ queue[0] = 60',
        comparison: 'WRAPPED AROUND 🎉',
        action: 'Wrap Enqueue 60',
        isMatch: true,
        desc: 'Line 4: Enqueue element 60. We calculate next rear = (4 + 1) % 5 = 0. Thanks to modulo arithmetic, rear wraps around to index 0, inserting 60 into the newly freed slot 0! 🎉'
      }
    ]
  }
};
