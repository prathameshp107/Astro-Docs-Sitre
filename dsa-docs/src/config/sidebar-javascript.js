const sidebar = [
      {
        label: 'JavaScript',
        items: [
          // Phase 1 — JavaScript Fundamentals
          {
            label: 'Phase 1 — Fundamentals',
            items: [
              { label: '01. Introduction', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/01-introduction' } }] },
              { label: '02. Environment', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/02-environment' } }] },
              { label: '03. Variables', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/03-variables' } }] },
              { label: '04. Data Types', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/04-data-types' } }] },
              { label: '05. Operators', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/05-operators' } }] },
              { label: '06. Control Flow', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/06-control-flow' } }] },
              { label: '07. Functions', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/07-functions' } }] },
              { label: '08. Scope', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/08-scope' } }] },
              { label: '09. Arrays', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/09-arrays' } }] },
              { label: '10. Objects', items: [{ autogenerate: { directory: 'javascript/phase-01-fundamentals/10-objects' } }] },
            ],
          },
          // Phase 2 — JavaScript Core Concepts
          {
            label: 'Phase 2 — Core Concepts',
            items: [
              { label: 'Execution Context', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/execution-context' } }] },
              { label: 'Call Stack', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/call-stack' } }] },
              { label: 'Hoisting', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/hoisting' } }] },
              { label: 'this Keyword', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/this-keyword' } }] },
              { label: 'Prototypes', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/prototypes' } }] },
              { label: 'Inheritance', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/inheritance' } }] },
              { label: 'Classes', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/classes' } }] },
              { label: 'Modules', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/modules' } }] },
              { label: 'Iterators', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/iterators' } }] },
              { label: 'Generators', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/generators' } }] },
              { label: 'Symbols', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/symbols' } }] },
              { label: 'Map', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/map' } }] },
              { label: 'Set', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/set' } }] },
              { label: 'WeakMap/WeakSet', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/weakmap-weakset' } }] },
              { label: 'Memory Management', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/memory-management' } }] },
              { label: 'Garbage Collection', items: [{ autogenerate: { directory: 'javascript/phase-02-core-concepts/garbage-collection' } }] },
            ],
          },
          // Phase 3 — Asynchronous JavaScript
          {
            label: 'Phase 3 — Async JS',
            items: [
              { label: 'Sync vs Async', link: '/javascript/phase-03-asynchronous-javascript/synchronous-vs-asynchronous' },
              { label: 'Callbacks & Callback Hell', link: '/javascript/phase-03-asynchronous-javascript/callbacks' },
              { label: 'Promises', link: '/javascript/phase-03-asynchronous-javascript/promises' },
              { label: 'Promise Chaining', link: '/javascript/phase-03-asynchronous-javascript/promise-chaining' },
              { label: 'Promise APIs', link: '/javascript/phase-03-asynchronous-javascript/promise-apis' },
              { label: 'Async/Await', link: '/javascript/phase-03-asynchronous-javascript/async-await' },
              { label: 'Event Loop', link: '/javascript/phase-03-asynchronous-javascript/event-loop' },
              { label: 'Microtask & Macrotask', link: '/javascript/phase-03-asynchronous-javascript/microtask-macrotask' },
              { label: 'Fetch API', link: '/javascript/phase-03-asynchronous-javascript/fetch-api' },
              { label: 'AbortController', link: '/javascript/phase-03-asynchronous-javascript/abort-controller' },
              { label: 'Web Workers', link: '/javascript/phase-03-asynchronous-javascript/web-workers' },
              { label: 'requestAnimationFrame', link: '/javascript/phase-03-asynchronous-javascript/request-animation-frame' },
              { label: 'Debounce & Throttle', link: '/javascript/phase-03-asynchronous-javascript/debounce-throttle' },
            ],
          },
          // Phase 4 — Browser APIs
          {
            label: 'Phase 4 — Browser APIs',
            items: [
              { label: 'DOM Overview', link: '/javascript/phase-04-browser-apis/dom' },
              { label: 'DOM Selectors', link: '/javascript/phase-04-browser-apis/dom-selectors' },
              { label: 'DOM Traversal', link: '/javascript/phase-04-browser-apis/dom-traversal' },
              { label: 'DOM Manipulation', link: '/javascript/phase-04-browser-apis/dom-manipulation' },
              { label: 'Events', link: '/javascript/phase-04-browser-apis/events' },
              { label: 'Bubbling & Capturing', link: '/javascript/phase-04-browser-apis/event-bubbling-capturing' },
              { label: 'Event Delegation', link: '/javascript/phase-04-browser-apis/event-delegation' },
              { label: 'Forms', link: '/javascript/phase-04-browser-apis/forms' },
              { label: 'Web Storage', link: '/javascript/phase-04-browser-apis/web-storage' },
              { label: 'Cookies', link: '/javascript/phase-04-browser-apis/cookies' },
              { label: 'IndexedDB', link: '/javascript/phase-04-browser-apis/indexeddb' },
              { label: 'Clipboard API', link: '/javascript/phase-04-browser-apis/clipboard-api' },
              { label: 'History API', link: '/javascript/phase-04-browser-apis/history-api' },
              { label: 'Location API', link: '/javascript/phase-04-browser-apis/location-api' },
              { label: 'Navigator API', link: '/javascript/phase-04-browser-apis/navigator-api' },
              { label: 'Geolocation', link: '/javascript/phase-04-browser-apis/geolocation' },
              { label: 'Intersection Observer', link: '/javascript/phase-04-browser-apis/intersection-observer' },
              { label: 'Mutation Observer', link: '/javascript/phase-04-browser-apis/mutation-observer' },
              { label: 'Resize Observer', link: '/javascript/phase-04-browser-apis/resize-observer' },
            ],
          },
          // Phase 5 — Modern JavaScript
          {
            label: 'Phase 5 — Modern JS',
            items: [
              { label: 'ES6+ Overview', link: '/javascript/phase-05-modern-javascript/es6-overview' },
              { label: 'Template Literals', link: '/javascript/phase-05-modern-javascript/template-literals' },
              { label: 'Destructuring', link: '/javascript/phase-05-modern-javascript/destructuring' },
              { label: 'Dynamic Import', link: '/javascript/phase-05-modern-javascript/dynamic-import' },
              { label: 'Functional Programming', link: '/javascript/phase-05-modern-javascript/functional-programming' },
              { label: 'Currying', link: '/javascript/phase-05-modern-javascript/currying' },
              { label: 'Composition', link: '/javascript/phase-05-modern-javascript/composition' },
              { label: 'BigInt', link: '/javascript/phase-05-modern-javascript/bigint' },
            ],
          },
          // Phase 6 — Performance
          {
            label: 'Phase 6 — Performance',
            items: [
              { label: 'Rendering, Repaint & Reflow', link: '/javascript/phase-06-performance/rendering-repaint-reflow' },
              { label: 'Performance API', link: '/javascript/phase-06-performance/performance-api' },
              { label: 'Memory Optimization', link: '/javascript/phase-06-performance/memory-optimization' },
              { label: 'Lazy Loading', link: '/javascript/phase-06-performance/lazy-loading' },
              { label: 'Tree Shaking & Code Splitting', link: '/javascript/phase-06-performance/tree-shaking-code-splitting' },
            ],
          },
          // Phase 7 — Design Patterns
          {
            label: 'Phase 7 — Design Patterns',
            items: [
              { label: 'Module Pattern', link: '/javascript/phase-07-design-patterns/module-pattern' },
              { label: 'Singleton', link: '/javascript/phase-07-design-patterns/singleton' },
              { label: 'Factory', link: '/javascript/phase-07-design-patterns/factory' },
              { label: 'Observer', link: '/javascript/phase-07-design-patterns/observer' },
              { label: 'Strategy', link: '/javascript/phase-07-design-patterns/strategy' },
              { label: 'Command', link: '/javascript/phase-07-design-patterns/command' },
              { label: 'Decorator', link: '/javascript/phase-07-design-patterns/decorator' },
              { label: 'Proxy', link: '/javascript/phase-07-design-patterns/proxy' },
              { label: 'Pub-Sub', link: '/javascript/phase-07-design-patterns/pub-sub' },
            ],
          },
          // Phase 8 — JavaScript Internals
          {
            label: 'Phase 8 — Internals',
            items: [
              { label: 'Parser', link: '/javascript/phase-08-javascript-internals/parser' },
              { label: 'Compiler & Interpreter', link: '/javascript/phase-08-javascript-internals/compiler-interpreter' },
              { label: 'V8 Architecture', link: '/javascript/phase-08-javascript-internals/v8-architecture' },
              { label: 'Hidden Classes & IC', link: '/javascript/phase-08-javascript-internals/hidden-classes-inline-cache' },
              { label: 'Event Loop Internals', link: '/javascript/phase-08-javascript-internals/event-loop-internals' },
              { label: 'Memory Layout', link: '/javascript/phase-08-javascript-internals/memory-layout' },
            ],
          },
          // Phase 9 — Enterprise JavaScript
          {
            label: 'Phase 9 — Enterprise JS',
            items: [
              { label: 'Architecture', link: '/javascript/phase-09-enterprise-javascript/architecture' },
              { label: 'Folder Structure', link: '/javascript/phase-09-enterprise-javascript/folder-structure' },
              { label: 'Logging', link: '/javascript/phase-09-enterprise-javascript/logging' },
              { label: 'Error Handling', link: '/javascript/phase-09-enterprise-javascript/error-handling' },
              { label: 'Testing', link: '/javascript/phase-09-enterprise-javascript/testing' },
              { label: 'Security', link: '/javascript/phase-09-enterprise-javascript/security' },
              { label: 'Clean Code', link: '/javascript/phase-09-enterprise-javascript/clean-code' },
              { label: 'Best Practices', link: '/javascript/phase-09-enterprise-javascript/best-practices' },
            ],
          },
          { label: '🎯 Interview Questions (150+)', link: '/javascript/interview-questions' },
          {
            label: 'Interview Questions',
            items: [
              { label: 'Overview', link: '/javascript/interview' },
              { label: 'Fundamentals', link: '/javascript/interview/fundamentals' },
              { label: 'Objects, Prototypes & Classes', link: '/javascript/interview/objects-prototypes' },
              { label: 'Arrays & Collections', link: '/javascript/interview/arrays-collections' },
              { label: 'ES6+ & Modern JS', link: '/javascript/interview/es6-modern' },
              { label: 'Async JavaScript', link: '/javascript/interview/async-js' },
              { label: 'DOM & Browser APIs', link: '/javascript/interview/dom-browser-apis' },
              { label: 'Advanced & System Design', link: '/javascript/interview/advanced-topics' },
              { label: 'Trick Questions — Code Output', link: '/javascript/interview/js-code-tricky-questions' },
            ],
          },
        ],
      },
];
export default sidebar;
