/**
 * Reddit Post Templates & Subreddit Targeting
 *
 * Tailored, high-value, anti-spam markdown posts for developer, student,
 * and DSA communities. Each post is framed authentically as a free learning tool
 * built to solve interview prep pain points.
 */

export const REDDIT_POSTS = [
  {
    sub: 'SideProject',
    flair: 'Project',
    title: 'I built a free interactive interview prep platform with 80+ step-by-step DSA visualizers and system design guides',
    body: `Hey r/SideProject!

Over the past several months, I've been working on a free, open-source platform called **Interview Prep Buddy** to solve a frustration I always had while prepping for technical interviews: static diagrams and walls of text don't help build true intuition for algorithms and system design.

🔗 **Live Platform:** [https://interviewpreprationbuddy.in](https://interviewpreprationbuddy.in)  
📂 **GitHub:** [https://github.com/prathameshp107/DSA-Notes-Problems](https://github.com/prathameshp107/DSA-Notes-Problems)

### What's inside:
- **80+ Interactive DSA Visualizers:** Step-by-step execution for Sorting (Bubble, Merge, Quick), Trees (Traversals, BST, Invert), Graphs (BFS, DFS, Dijkstra, Cycle Detection), Two Pointers, Sliding Window, DP, Heaps, and Tries.
- **Pattern-First Learning:** Grouped by interview patterns rather than random problem lists so you learn *how to recognize patterns*.
- **System Design & Core CS:** Illustrated guides for high-scalability architectures, caching, load balancing, plus JavaScript, React, SQL, MongoDB, and Docker.
- **Interactive MCQ & Practice Rounds:** Test your conceptual edge cases before real technical screens.
- **100% Free & No Paywalls:** No premium tier, no email gated content.

### Tech Stack:
- Built with **Astro (Starlight)** for blazing fast static delivery.
- Interactive visualizations built with **React**, **Tailwind/Vanilla CSS**, and **Framer Motion**.

I'd really love your honest feedback, bug reports, and suggestions on what algorithms or system design topics you'd like to see next!`,
  },
  {
    sub: 'leetcode',
    flair: 'Resource',
    title: 'I created a free platform with step-by-step visualizers for all major LeetCode patterns (Two Pointers, Sliding Window, DP, Trees, Graphs)',
    body: `Hey r/leetcode,

One of the biggest roadblocks when grinding LeetCode is visualizing what pointer manipulations, stack states, or recursion trees actually look like in memory at every single step.

I built a free, zero-paywall learning platform called **Interview Prep Buddy** to help visualize the exact mechanics of major coding interview patterns.

🔗 **Link:** [https://interviewpreprationbuddy.in](https://interviewpreprationbuddy.in)

### Key Features for LeetCode Prep:
1. **Interactive Pattern Visualizers (80+ Algorithms):**
   - **Two Pointers:** Two Sum II, 3Sum, Valid Palindrome, Container With Most Water, Trapping Rain Water, Floyd's Cycle.
   - **Sliding Window:** Longest Substring, Max Sum Subarray, Fruit Into Baskets.
   - **Trees & Graphs:** BST searches, Invert Tree, Level Order, BFS/DFS grid traversals, Dijkstra, Cycle Detection.
   - **Dynamic Programming:** Coin Change table progression, 0/1 Knapsack, Climbing Stairs, LCS.
   - **Heaps & Backtracking:** Heapify, Heap Sort, N-Queens, Sudoku Solver.
2. **Step-by-Step Playback:** Step forward, pause, and inspect pointer movements, arrays, and recursion stacks frame by frame.
3. **Complexity & Edge Cases:** Time & space complexity breakdown for every pattern with common interview traps.

Everything is completely free and open for the community. I hope this helps anyone currently preparing for upcoming tech rounds! Would love your thoughts and suggestions.`,
  },
  {
    sub: 'learnprogramming',
    flair: 'Resource',
    title: 'Free interactive platform to learn DSA patterns step-by-step with visualizers and animated walkthroughs',
    body: `Hello r/learnprogramming,

When learning Data Structures and Algorithms for the first time, reading code line by line often isn't enough to understand how pointers shift, how recursion unwinds, or how trees rebalance.

To help self-taught developers and CS students build genuine visual intuition, I built a free educational tool called **Interview Prep Buddy**.

🔗 **Try it here:** [https://interviewpreprationbuddy.in](https://interviewpreprationbuddy.in)  
📂 **Source Code:** [https://github.com/prathameshp107/DSA-Notes-Problems](https://github.com/prathameshp107/DSA-Notes-Problems)

### What it covers:
- **Foundations:** Arrays, Linked Lists, Stacks, Queues, Hash Tables.
- **Algorithms:** Sorting algorithms (Bubble, Selection, Insertion, Merge, Quick), Binary Search, Recursion (Tower of Hanoi, Fibonacci).
- **Advanced Patterns:** Two Pointers, Sliding Window, Trees, Graphs, Heaps, and Dynamic Programming.
- **Self-Assessment:** Interactive MCQ quiz rounds with detailed explanations for each question.
- **Interview Prep:** Guides for JavaScript, React, SQL, and System Design fundamentals.

It is completely free, requires no signup or login, and has no paywalled features. 

Feel free to check it out if you are currently learning algorithms or getting ready for job applications. Feedback and contributions are very welcome!`,
  },
  {
    sub: 'webdev',
    flair: 'Showcase',
    title: 'I built an interactive frontend & full-stack interview prep hub with algorithm visualizers and JS/React deep dives',
    body: `Hey r/webdev!

I wanted to share a project I've been developing: **Interview Prep Buddy**, an interactive platform focused on helping web developers prepare for modern technical screens.

🔗 **Site:** [https://interviewpreprationbuddy.in](https://interviewpreprationbuddy.in)

### Why I built it:
Most interview prep sites are either purely backend/LeetCode focused, or locked behind expensive monthly subscriptions. I wanted an open, free resource that balances core DSA with real-world web engineering topics.

### What's included:
- **Interactive Algorithm Visualizers:** Over 80 animations for sorting, searching, sliding window, and graph traversals.
- **Frontend Deep Dives:** JavaScript execution context, event loop, closures, prototypes, React reconciler, custom hooks, and state management.
- **System Design for Web:** CDN caching, SSR vs CSR, database indexing, rate limiting, and API architecture.
- **Fast & Responsive:** Built with Astro (Starlight) for near-instant page transitions, with interactive React widgets embedded seamlessly.

Would love feedback on UX, performance, or topics you feel are missing for frontend/fullstack interviews!`,
  },
  {
    sub: 'developersIndia',
    flair: 'Resource',
    title: 'Created a free, zero-paywall interview preparation platform: 80+ interactive DSA visualizers, system design, and MCQ practice rounds',
    body: `Hi everyone,

Sharing a project I built to help Indian tech students and job seekers prepare effectively for campus placements and off-campus SDE hiring rounds: **Interview Prep Buddy**.

🔗 **Website:** [https://interviewpreprationbuddy.in](https://interviewpreprationbuddy.in)  
📂 **GitHub:** [https://github.com/prathameshp107/DSA-Notes-Problems](https://github.com/prathameshp107/DSA-Notes-Problems)

### Highlights:
1. **80+ Interactive DSA Visualizers:** Step-by-step visual execution for all popular interview patterns (Arrays, Two Pointers, Sliding Window, Trees, Graphs, DP, Heaps, Backtracking).
2. **System Design & Core CS:** Clear, illustrated breakdowns of System Design concepts, plus JavaScript, React, SQL, MongoDB, and Docker.
3. **Practice MCQ Rounds:** Online assessment style quiz questions to test your speed and edge-case knowledge.
4. **Zero Paywalls:** 100% free with no subscriptions or email gates.

I hope this helps your interview preparation. Any feedback, suggestions, or feature requests are warmly appreciated!`,
  },
];

export function getRedditPost(subName) {
  return REDDIT_POSTS.find(p => p.sub.toLowerCase() === subName.toLowerCase());
}
