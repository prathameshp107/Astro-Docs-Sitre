import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

import remarkPracticeLinks from './src/plugins/remark-practice-links.mjs';

const isVercel = !!process.env.VERCEL;
const site = isVercel && process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://prathameshp107.github.io';

export default defineConfig({
  site,
  ...(isVercel ? {} : { base: '/DSA-Notes-Problems' }),
  server: {
    host: 'localhost',
    port: 4321,
  },
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        clientPort: 4321,
      },
    },
    optimizeDeps: {
      include: ['@babel/standalone', 'react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  integrations: [starlight({
    title: 'DSA & Dev Notes',
    description: 'Personal knowledge base for DSA, JavaScript, React, SQL, MongoDB, Docker and Interview Prep',
    defaultLocale: 'en',
    components: {
      Sidebar: './src/components/Sidebar.astro',
    },
    social: [
      {
        icon: 'github',
        label: 'GitHub',
        href: 'https://github.com/prathameshp107/DSA-Notes-Problems',
      },
    ],
    logo: {
      alt: 'DSA Notes',
      src: './src/assets/logo.svg',
    },
    customCss: ['./src/styles/custom.css', './src/styles/docs-overview.css'],      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Overview',
          link: '/overview',
        },
        {
          label: 'Playground',
          link: '/playground',
        },
        {
          label: 'JS Interview Lab',
          link: '/labs',
        },
        {
          label: 'MCQ Hub',
          link: '/mcq',
        },
        {
          label: 'MCQ Dashboard',
          link: '/mcq/dashboard',
        },        {
        label: 'Object-Oriented Programming (OOP)',
        items: [{ autogenerate: { directory: 'oops' } }],
      },
      {
        label: 'Computer Networks',
        items: [
          { label: 'Overview', link: '/networks' },
          {
            label: '01. Fundamentals',
            items: [{ autogenerate: { directory: 'networks/01-fundamentals' } }],
          },
          {
            label: '02. Transport',
            items: [{ autogenerate: { directory: 'networks/02-transport' } }],
          },
          {
            label: '03. Web Protocols',
            items: [{ autogenerate: { directory: 'networks/03-web-protocols' } }],
          },
          {
            label: '04. Infrastructure',
            items: [{ autogenerate: { directory: 'networks/04-infrastructure' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'networks/05-interview' } }],
          },
        ],
      },
      {
        label: 'Git & GitHub',
        items: [
          { label: 'Overview', link: '/git' },
          {
            label: '01. Basics',
            items: [{ autogenerate: { directory: 'git/01-basics' } }],
          },
          {
            label: '02. Branching',
            items: [{ autogenerate: { directory: 'git/02-branching' } }],
          },
          {
            label: '03. Remote & GitHub',
            items: [{ autogenerate: { directory: 'git/03-remote-and-github' } }],
          },
          {
            label: '04. Advanced',
            items: [{ autogenerate: { directory: 'git/04-advanced' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'git/05-interview' } }],
          },
        ],
      },
      {
        label: 'HTML & CSS',
        items: [
          { label: 'Overview', link: '/html-css' },
          {
            label: '01. HTML Basics',
            items: [{ autogenerate: { directory: 'html-css/01-html' } }],
          },
          {
            label: '02. CSS Basics',
            items: [{ autogenerate: { directory: 'html-css/02-css-basics' } }],
          },
          {
            label: '03. Layout',
            items: [{ autogenerate: { directory: 'html-css/03-layout' } }],
          },
          {
            label: '04. Advanced',
            items: [{ autogenerate: { directory: 'html-css/04-advanced' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'html-css/05-interview' } }],
          },
        ],
      },
      {
        label: 'Tailwind CSS',
        items: [
          { label: 'Tailwind Overview', link: '/tailwind' },
          {
            label: '01. Basics',
            items: [{ autogenerate: { directory: 'tailwind/01-basics' } }],
          },
          {
            label: '02. Core Utilities',
            items: [{ autogenerate: { directory: 'tailwind/02-core-utilities' } }],
          },
          {
            label: '03. Layout',
            items: [{ autogenerate: { directory: 'tailwind/03-layout' } }],
          },
          {
            label: '04. Advanced',
            items: [{ autogenerate: { directory: 'tailwind/04-advanced' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'tailwind/05-interview' } }],
          },
        ],
      },
      {
        label: 'Namaste JavaScript',
        items: [
          { label: 'Overview', link: '/namaste-js' },
          {
            label: 'Season 1 — Foundations',
            items: [
              { label: '1. Execution Context', link: '/namaste-js/season-1/execution-context' },
              { label: '2. How JS is Executed & Call Stack', link: '/namaste-js/season-1/how-js-is-executed-call-stack' },
              { label: '3. Hoisting', link: '/namaste-js/season-1/hoisting-in-javascript-variables-functions' },
              { label: '4. Functions & Variable Environments', link: '/namaste-js/season-1/functions-and-variable-environments' },
              { label: '5. Shortest JS Program, window & this', link: '/namaste-js/season-1/shortest-js-program-window-this-keyword' },
              { label: '6. undefined vs not defined', link: '/namaste-js/season-1/undefined-vs-not-defined-in-js' },
              { label: '7. Scope Chain & Lexical Environment', link: '/namaste-js/season-1/the-scope-chain-scope-lexical-environment' },
              { label: '8. let & const, Temporal Dead Zone', link: '/namaste-js/season-1/let-const-in-js-temporal-dead-zone' },
              { label: '9. Block Scope & Shadowing', link: '/namaste-js/season-1/block-scope-shadowing-in-js' },
              { label: '10. Closures', link: '/namaste-js/season-1/closures-in-js' },
              { label: '11. setTimeout + Closures', link: '/namaste-js/season-1/settimeout-closures-interview-question' },
              { label: '12. Famous Interview Questions ft. Closures', link: '/namaste-js/season-1/famous-interview-questions-ft-closures' },
              { label: '13. First Class Functions', link: '/namaste-js/season-1/first-class-functions-ft-anonymous-functions' },
              { label: '14. Callback Functions', link: '/namaste-js/season-1/callback-functions-in-js-ft-event-listeners' },
              { label: '15. Event Loop', link: '/namaste-js/season-1/asynchronous-javascript-event-loop-from-scratch' },
              { label: '16. V8 Architecture', link: '/namaste-js/season-1/js-engine-exposed-googles-v8-architecture' },
              { label: '17. Trust issues with setTimeout', link: '/namaste-js/season-1/trust-issues-with-settimeout' },
              { label: '18. Higher-Order Functions', link: '/namaste-js/season-1/higher-order-functions-ft-functional-programming' },
              { label: '19. map, filter & reduce', link: '/namaste-js/season-1/map-filter-reduce' },
            ],
          },
          {
            label: 'Season 2 — Promises & Async',
            items: [
              { label: '20. Callback Hell & Inversion of Control', link: '/namaste-js/season-2/callback-hell-inversion-of-control' },
              { label: '21. Promises', link: '/namaste-js/season-2/promises' },
              { label: '22. Creating a Promise, Chaining & Error Handling', link: '/namaste-js/season-2/creating-a-promise-chaining-error-handling' },
              { label: '23. Promise APIs (all, allSettled, race, any)', link: '/namaste-js/season-2/promise-apis-all-allsettled-race-any' },
              { label: '24. async / await', link: '/namaste-js/season-2/async-await' },
              { label: '25. this keyword in JavaScript', link: '/namaste-js/season-2/this-keyword-in-javascript' },
            ],
          },
        ],
      },
      {
        label: 'JavaScript',
        items: [
          {
            label: 'Getting Started',
            items: [{ autogenerate: { directory: 'javascript/getting-started' } }],
          },
          {
            label: 'Variables',
            items: [{ autogenerate: { directory: 'javascript/variables' } }],
          },
          {
            label: 'Core Language',
            items: [{ autogenerate: { directory: 'javascript/core-language' } }],
          },
          {
            label: 'Collections',
            items: [{ autogenerate: { directory: 'javascript/collections' } }],
          },
          {
            label: 'Advanced Language',
            items: [{ autogenerate: { directory: 'javascript/advanced-language' } }],
          },
          {
            label: 'Async JavaScript',
            items: [{ autogenerate: { directory: 'javascript/async' } }],
          },
          {
            label: 'Browser APIs',
            items: [{ autogenerate: { directory: 'javascript/browser-apis' } }],
          },
          { label: '📋 JS Interview Questions (200+)', link: '/javascript/interview-questions' },
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
      {
        label: 'React',
        items: [
          { label: 'Introduction to React', link: '/react/introduction' },
          { label: 'React Project Structure', link: '/react/project-structure' },
          { label: 'JSX', link: '/react/jsx' },
          {
            label: 'Components',
            items: [
              { label: 'Components Overview', link: '/react/components' },
              { label: 'Functional Components', link: '/react/components/functional-components' },
              { label: 'Class Components', link: '/react/components/class-components' },
              { label: 'Presentational Components', link: '/react/components/presentational-components' },
              { label: 'Container Components', link: '/react/components/container-components' },
              { label: 'Controlled Components', link: '/react/components/controlled-components' },
              { label: 'Uncontrolled Components', link: '/react/components/uncontrolled-components' },
              { label: 'Higher-Order Components', link: '/react/components/higher-order-components' },
              { label: 'Custom Hook Components', link: '/react/components/custom-hook-components' },
              { label: 'Compound Components', link: '/react/components/compound-components' },
              { label: 'Layout Components', link: '/react/components/layout-components' },
              { label: 'Component Lifecycle', link: '/react/components/component-lifecycle' },
            ],
          },
          { label: 'Props', items: [
              { label: 'Props Overview', link: '/react/props' },
              { label: 'Prop Types', link: '/react/props/prop-types' },
              { label: 'Children Prop', link: '/react/props/children-prop' },
              { label: 'Default Props & Destructuring', link: '/react/props/default-props' },
            ],
          },
          {
            label: 'Hooks',
            items: [
              { label: 'Hooks Overview', link: '/react/hooks' },
              { label: 'useState', link: '/react/hooks/use-state' },
              { label: 'useEffect', link: '/react/hooks/use-effect' },
              { label: 'useRef', link: '/react/hooks/use-ref' },
              { label: 'useMemo', link: '/react/hooks/use-memo' },
              { label: 'useCallback', link: '/react/hooks/use-callback' },
              { label: 'useContext', link: '/react/hooks/use-context' },
              { label: 'useReducer', link: '/react/hooks/use-reducer' },
              { label: 'Custom Hooks', link: '/react/hooks/custom-hooks' },
              { label: 'useLayoutEffect', link: '/react/hooks/use-layout-effect' },
              { label: 'useImperativeHandle', link: '/react/hooks/use-imperative-handle' },
              { label: 'useId', link: '/react/hooks/use-id' },
              { label: 'useTransition', link: '/react/hooks/use-transition' },
              { label: 'useDeferredValue', link: '/react/hooks/use-deferred-value' },
              { label: 'useSyncExternalStore', link: '/react/hooks/use-sync-external-store' },
            ],
          },
          { label: 'React Strict Mode', link: '/react/strict-mode' },
          { label: 'Fragments', link: '/react/fragments' },
          {
            label: 'Data Binding & Core Concepts',
            items: [
              { label: 'Overview', link: '/react/data-binding' },
              { label: 'Data Binding Concepts', link: '/react/data-binding/data-binding-concepts' },
              { label: 'Conditional Rendering', link: '/react/data-binding/conditional-rendering' },
              { label: 'Lists and Keys', link: '/react/data-binding/lists-and-keys' },
              { label: 'React Events', link: '/react/data-binding/events' },
              { label: 'Lifecycle Hooks', link: '/react/data-binding/lifecycle-hooks' },
              { label: 'Forms', link: '/react/data-binding/forms' },
              { label: 'HTTP Methods & Axios', link: '/react/data-binding/http-methods-axios' },
              { label: 'Higher Order Components', link: '/react/data-binding/higher-order-components' },
              { label: 'Routing', link: '/react/data-binding/routing' },
              { label: 'State Management', link: '/react/data-binding/state-management' },
            ],
          },
          { label: 'React Setup Guideline', link: '/react/react-setup-guideline' },
          {
            label: 'Advanced Concepts',
            items: [
              { label: 'Error Boundaries', link: '/react/advanced/error-boundaries' },
              { label: 'Suspense & Lazy Loading', link: '/react/advanced/suspense-and-lazy' },
              { label: 'Portals', link: '/react/advanced/portals' },
              { label: 'Refs & forwardRef', link: '/react/advanced/refs-and-forwardref' },
              { label: 'Performance & Memoization', link: '/react/advanced/performance-and-memo' },
              { label: 'Reconciliation & Virtual DOM', link: '/react/advanced/reconciliation-and-virtual-dom' },
              { label: 'Prop Drilling', link: '/react/advanced/prop-drilling' },
            ],
          },
          {
            label: 'Modern React (v19)',
            items: [
              { label: 'Actions & Forms', link: '/react/modern-react/actions-and-forms' },
              { label: 'useOptimistic', link: '/react/modern-react/use-optimistic' },
              { label: 'use() Hook', link: '/react/modern-react/use-hook' },
              { label: 'Server Components', link: '/react/modern-react/server-components' },
              { label: 'Modern React Interview', link: '/react/modern-react/modern-react-interview' },
            ],
          },
          {
            label: 'React Interview Questions',
            items: [
              { label: 'Overview', link: '/react/interview-questions' },
              { label: 'Easy Questions', link: '/react/interview-questions/easy-questions' },
              { label: 'Medium Questions', link: '/react/interview-questions/medium-questions' },
              { label: 'Hard Questions', link: '/react/interview-questions/hard-questions' },
              { label: 'Quick Cheatsheet', link: '/react/interview-questions/quick-cheatsheet' },
            ],
          },
        ],
      },
      {
        label: 'Next.js',
        items: [
          { label: 'Next.js Overview', link: '/nextjs' },
          {
            label: 'Fundamentals',
            items: [
              { label: 'Introduction to Next.js', link: '/nextjs/fundamentals/introduction' },
              { label: 'Installing Next.js', link: '/nextjs/fundamentals/installing-nextjs' },
              { label: 'Folder Structure', link: '/nextjs/fundamentals/folder-structure' },
              { label: 'Routing', link: '/nextjs/fundamentals/routing' },
              { label: 'Special Files', link: '/nextjs/fundamentals/special-files' },
              { label: 'Dynamic Routes', link: '/nextjs/fundamentals/dynamic-routes' },
              { label: 'Layouts and Templates', link: '/nextjs/fundamentals/layouts-and-templates' },
              { label: 'Review & Practice', link: '/nextjs/fundamentals/review-practice-interview' },
            ],
          },
          {
            label: 'Core Concepts',
            items: [
              { label: 'Components', link: '/nextjs/core-concepts/components' },
              { label: 'Server & Client Components', link: '/nextjs/core-concepts/server-and-client-components' },
              { label: 'Styling', link: '/nextjs/core-concepts/styling' },
              { label: 'Data Fetching', link: '/nextjs/core-concepts/data-fetching' },
              { label: 'Rendering Methods', link: '/nextjs/core-concepts/rendering-methods' },
              { label: 'Streaming & Suspense', link: '/nextjs/core-concepts/streaming-and-suspense' },
              { label: 'Caching & Revalidation', link: '/nextjs/core-concepts/caching-and-revalidation' },
              { label: 'Route Handlers', link: '/nextjs/core-concepts/route-handlers' },
              { label: 'API Routes and Backend', link: '/nextjs/core-concepts/api-routes-backend' },
              { label: 'Review & Practice', link: '/nextjs/core-concepts/review-practice-interview' },
            ],
          },
          {
            label: 'Middleware & Authentication',
            items: [
              { label: 'Middleware', link: '/nextjs/auth/middleware' },
              { label: 'Authentication', link: '/nextjs/auth/authentication' },
              { label: 'Review & Practice', link: '/nextjs/auth/review-practice-interview' },
            ],
          },
          {
            label: 'Data, State & Forms',
            items: [
              { label: 'Database Integration', link: '/nextjs/data-and-forms/database-integration' },
              { label: 'State Management', link: '/nextjs/data-and-forms/state-management' },
              { label: 'Server Actions', link: '/nextjs/data-and-forms/server-actions' },
              { label: 'Forms and Validation', link: '/nextjs/data-and-forms/forms-and-validation' },
              { label: 'Review & Practice', link: '/nextjs/data-and-forms/review-practice-interview' },
            ],
          },
          {
            label: 'Performance & SEO',
            items: [
              { label: 'Performance Optimization', link: '/nextjs/performance-seo/performance-optimization' },
              { label: 'Image, Font & Script Optimization', link: '/nextjs/performance-seo/image-font-script-optimization' },
              { label: 'Metadata & SEO', link: '/nextjs/performance-seo/metadata-and-seo' },
              { label: 'SEO in Next.js', link: '/nextjs/performance-seo/seo' },
              { label: 'Review & Practice', link: '/nextjs/performance-seo/review-practice-interview' },
            ],
          },
          {
            label: 'Production',
            items: [
              { label: 'Error Handling', link: '/nextjs/production/error-handling' },
              { label: 'Deployment', link: '/nextjs/production/deployment' },
              { label: 'Testing', link: '/nextjs/production/testing' },
              { label: 'Review & Practice', link: '/nextjs/production/review-practice-interview' },
            ],
          },
          {
            label: 'Advanced',
            items: [
              { label: 'Security Best Practices', link: '/nextjs/advanced/security-best-practices' },
              { label: 'Parallel & Intercepting Routes', link: '/nextjs/advanced/parallel-and-intercepting-routes' },
              { label: 'Edge & Node.js Runtimes', link: '/nextjs/advanced/edge-and-runtimes' },
              { label: 'Partial Prerendering (PPR)', link: '/nextjs/advanced/partial-prerendering' },
              { label: 'Advanced Concepts', link: '/nextjs/advanced/advanced-concepts' },
              { label: 'Review & Practice', link: '/nextjs/advanced/review-practice-interview' },
            ],
          },
        ],
      },
      {
        label: 'Angular',
        items: [
          { label: 'Overview', link: '/angular' },
          {
            label: 'Phase 1: Fundamentals',
            items: [{ autogenerate: { directory: 'angular/phase-1' } }],
          },
          {
            label: 'Phase 2: Components, Routing & Forms',
            items: [{ autogenerate: { directory: 'angular/phase-2' } }],
          },
          {
            label: 'Phase 3: Advanced',
            items: [{ autogenerate: { directory: 'angular/phase-3' } }],
          },
          {
            label: 'Phase 4: Enterprise',
            items: [{ autogenerate: { directory: 'angular/phase-4' } }],
          },
          {
            label: 'Phase 5: Modern Angular',
            items: [{ autogenerate: { directory: 'angular/phase-5' } }],
          },
        ],
      },
      {
        label: 'SQL / MySQL',
        items: [
          { label: 'SQL / MySQL Overview', link: '/sql' },
          {
            label: 'Database Basics',
            items: [
              { label: 'Database & RDBMS Basics', link: '/sql/database-rdbms-basics' },
              { label: 'MySQL Architecture', link: '/sql/mysql-architecture' },
              { label: 'Data Types', link: '/sql/data-types' },
              { label: 'Keys & Constraints', link: '/sql/keys-constraints' },
              { label: 'Normalization', link: '/sql/normalization' },
            ],
          },
          {
            label: 'Querying Data',
            items: [
              { label: 'CRUD Operations', link: '/sql/crud-operations' },
              { label: 'Aggregations & Functions', link: '/sql/aggregations-functions' },
              { label: 'Subqueries & CTEs', link: '/sql/subqueries-ctes' },
              { label: 'Views', link: '/sql/views' },
              { label: 'Window Functions', link: '/sql/window-functions' },
              { label: 'Set Operations', link: '/sql/set-operations' },
              { label: 'CASE & Conditional Logic', link: '/sql/case-and-conditional-logic' },
              { label: 'Query Execution Order', link: '/sql/query-execution-order' },
              { label: 'NULL Handling', link: '/sql/null-handling' },
            ],
          },
          {
            label: 'Joins',
            items: [
              { label: 'Joins Overview', link: '/sql/joins' },
              { label: 'INNER JOIN', link: '/sql/inner-join' },
              { label: 'LEFT JOIN', link: '/sql/left-join-left-outer-join' },
              { label: 'RIGHT JOIN', link: '/sql/right-join-right-outer-join' },
              { label: 'FULL OUTER JOIN', link: '/sql/full-outer-join' },
              { label: 'CROSS JOIN', link: '/sql/cross-join' },
              { label: 'SELF JOIN', link: '/sql/self-join' },
              { label: 'Exclusion Joins', link: '/sql/exclusion-joins-anti-joins' },
              { label: 'JOIN Conditions & Pitfalls', link: '/sql/join-conditions-pitfalls' },
              { label: 'Choosing the Right Join', link: '/sql/choosing-the-right-join-decision-guide' },
            ],
          },
          {
            label: 'Performance & Transactions',
            items: [
              { label: 'Indexing', link: '/sql/indexing' },
              { label: 'EXPLAIN & Query Optimization', link: '/sql/explain-query-optimization' },
              { label: 'Performance Optimization', link: '/sql/performance-optimization' },
              { label: 'Transactions & ACID', link: '/sql/transactions-acid-properties' },
              { label: 'Isolation Levels & Deadlocks', link: '/sql/isolation-levels-and-deadlocks' },
              { label: 'Locks', link: '/sql/locks' },
            ],
          },
          {
            label: 'Programmability',
            items: [
              { label: 'Stored Procedures & Functions', link: '/sql/stored-procedures-functions' },
              { label: 'Triggers', link: '/sql/triggers' },
            ],
          },
          {
            label: 'Administration & Scaling',
            items: [
              { label: 'Users & Privileges', link: '/sql/users-and-privileges' },
              { label: 'Backup & Restore', link: '/sql/backup-and-restore' },
              { label: 'Replication', link: '/sql/replication' },
              { label: 'Partitioning & Sharding', link: '/sql/partitioning-and-sharding' },
              { label: 'JSON & Full-Text Search', link: '/sql/json-and-fulltext' },
            ],
          },
          {
            label: 'Interview & Revision',
            items: [
              { label: 'MySQL Interview Prep', link: '/sql/interview-prep' },
              { label: 'Common Interview Questions', link: '/sql/common-interview-questions-answers' },
              { label: 'Quick Revision Cheat Sheet', link: '/sql/quick-revision-cheat-sheet' },
              { label: 'Quick Reference Summary', link: '/sql/quick-reference-summary' },
            ],
          },
        ],
      },
      {
        label: 'MongoDB',
        items: [
          { label: 'MongoDB Overview', link: '/mongodb' },
          {
            label: 'Getting Started',
            items: [
              { label: 'What is MongoDB?', link: '/mongodb/getting-started/what-is-mongodb' },
              { label: 'Installation & Tools', link: '/mongodb/getting-started/installation-and-tools' },
              { label: 'Documents & Collections', link: '/mongodb/getting-started/documents-and-collections' },
            ],
          },
          {
            label: 'Core MongoDB',
            items: [
              { label: 'Fundamentals & CRUD', link: '/mongodb/core/fundamentals-crud' },
              { label: 'Query & Filtering', link: '/mongodb/core/query-filtering' },
              { label: 'Data Modeling', link: '/mongodb/core/data-modeling' },
              { label: 'Indexing', link: '/mongodb/core/indexing' },
            ],
          },
          {
            label: 'Aggregation Framework',
            items: [
              { label: 'Aggregation Overview', link: '/mongodb/aggregation-framework' },
              { label: 'Pipeline Basics & Stages', link: '/mongodb/aggregation-framework/pipeline-basics-stages' },
              { label: '$match, $project, $sort', link: '/mongodb/aggregation-framework/filter-project-sort-pagination' },
              { label: '$group & Accumulators', link: '/mongodb/aggregation-framework/group-accumulators' },
              { label: '$lookup & $unwind', link: '/mongodb/aggregation-framework/lookup-unwind' },
              { label: 'Expressions & Computed Fields', link: '/mongodb/aggregation-framework/expressions-computed-fields' },
              { label: 'Real-World Examples', link: '/mongodb/aggregation-framework/real-world-examples' },
              { label: 'Aggregation Optimization', link: '/mongodb/aggregation-framework/aggregation-optimization' },
            ],
          },
          {
            label: 'Operations',
            items: [
              { label: 'Replication & Replica Sets', link: '/mongodb/operations/replication-and-replica-sets' },
              { label: 'Sharding', link: '/mongodb/operations/sharding' },
              { label: 'Transactions', link: '/mongodb/operations/transactions' },
              { label: 'Read & Write Concern', link: '/mongodb/operations/read-write-concern' },
              { label: 'Change Streams', link: '/mongodb/operations/change-streams' },
              { label: 'Performance & explain()', link: '/mongodb/operations/performance-and-explain' },
            ],
          },
          {
            label: 'Security',
            items: [
              { label: 'Authentication & Authorization', link: '/mongodb/security/authentication-and-authorization' },
              { label: 'Schema Validation', link: '/mongodb/security/schema-validation' },
              { label: 'Security Best Practices', link: '/mongodb/security/security-best-practices' },
            ],
          },
          {
            label: 'Integration',
            items: [
              { label: 'Mongoose — Node.js', link: '/mongodb/mongoose-nodejs-integration' },
            ],
          },
          {
            label: 'Interview & Revision',
            items: [
              { label: 'Top 100 Interview Questions', link: '/mongodb/top-100-interview-questions' },
              { label: 'Quick Reference Cheat Sheet', link: '/mongodb/quick-reference-cheat-sheet' },
              { label: 'Advanced Topics Hub', link: '/mongodb/advanced-topics' },
            ],
          },
        ],
      },
      {
        label: 'Redis',
        items: [
          { label: 'Redis Overview', link: '/redis' },
          {
            label: 'Core Concepts',
            items: [
              { label: 'Introduction to Redis', link: '/redis/introduction-to-redis' },
              { label: 'In-Memory Database', link: '/redis/what-is-an-in-memory-database' },
              { label: 'Redis Architecture', link: '/redis/redis-architecture' },
              { label: 'Installing Redis', link: '/redis/installing-redis' },
              { label: 'Data Types Overview', link: '/redis/redis-data-types-overview' },
            ],
          },
          {
                        label: 'Data Types',
            items: [
              { label: 'Strings', link: '/redis/redis-strings' },
              { label: 'Lists', link: '/redis/redis-lists' },
              { label: 'Sets', link: '/redis/redis-sets' },
              { label: 'Sorted Sets', link: '/redis/redis-sorted-sets' },
              { label: 'Hashes', link: '/redis/redis-hashes' },
              { label: 'Streams', link: '/redis/redis-streams' },
            ],
          },
          {
            label: 'Features & Patterns',
            items: [
              { label: 'Key Expiration & TTL', link: '/redis/key-expiration-and-ttl' },
              { label: 'Persistence', link: '/redis/redis-persistence' },
              { label: 'Pub/Sub', link: '/redis/redis-pub-sub' },
              { label: 'Transactions', link: '/redis/redis-transactions' },
              { label: 'Caching Patterns', link: '/redis/redis-caching-patterns' },
              { label: 'Eviction Policies', link: '/redis/redis-eviction-policies' },
              { label: 'Distributed Locks', link: '/redis/redis-distributed-locks' },
            ],
          },
          {
            label: 'Scaling & High Availability',
            items: [
              { label: 'Replication', link: '/redis/redis-replication' },
              { label: 'Sentinel', link: '/redis/redis-sentinel' },
              { label: 'Cluster', link: '/redis/redis-cluster' },
            ],
          },
          {
            label: 'Integration & Commands',
            items: [
              { label: 'Redis with Node.js', link: '/redis/redis-with-node-js' },
              { label: 'Redis with Docker', link: '/redis/redis-with-docker' },
              { label: 'Commands Cheat Sheet', link: '/redis/common-redis-commands-cheat-sheet' },
              { label: 'Security', link: '/redis/redis-security' },
            ],
          },
          {
            label: 'Practice & Interview',
            items: [
              { label: 'Common Beginner Mistakes', link: '/redis/common-beginner-mistakes' },
              { label: 'Best Practices', link: '/redis/redis-best-practices' },
              { label: 'Interview Questions', link: '/redis/redis-interview-questions' },
              { label: 'Learning Roadmap', link: '/redis/summary-and-learning-roadmap' },
            ],
          },
        ],
      },
      {
        label: 'Data Structures',
        items: [
          { label: 'Home', link: '/data-structures' },
          {
            label: 'Fundamentals',
            items: [{ autogenerate: { directory: 'data-structures/fundamentals' } }],
          },
          {
            label: 'Arrays',
            items: [
              { label: 'Arrays Overview', link: '/data-structures/arrays/arrays' },
              { label: 'Two Sum Problem', link: '/data-structures/arrays/two-sum-problem' },
              { label: 'Array Problems', link: '/data-structures/arrays/array-problems' },
              {
                label: 'Array Methods',
                items: [{ autogenerate: { directory: 'data-structures/arrays/array-methods' } }],
              },
            ],
          },
          {
            label: 'Strings',
            items: [{ autogenerate: { directory: 'data-structures/strings' } }],
          },
          {
            label: 'Matrix',
            items: [{ autogenerate: { directory: 'data-structures/matrix' } }],
          },
          {
            label: 'Hashing',
            items: [{ autogenerate: { directory: 'data-structures/hashing' } }],
          },
          {
            label: 'Stacks & Queues',
            items: [{ autogenerate: { directory: 'data-structures/stacks-queues' } }],
          },
          {
            label: 'Heap & Priority Queue',
            items: [
              { label: 'Priority Queue & Heap', link: '/data-structures/stacks-queues/priority-queue-and-heap' },
              { label: 'Heap Operations', link: '/data-structures/trees/09-heap' },
              { label: 'Heap Sort', link: '/data-structures/sorting/07-heap-sort' },
              { label: 'Top K Elements (Heap Pattern)', link: '/data-structures/interview-prep/13-top-k-heap' },
            ],
          },
          {
            label: 'Linked List',
            items: [{ autogenerate: { directory: 'data-structures/linked-list' } }],
          },
          {
            label: 'Trees',
            items: [{ autogenerate: { directory: 'data-structures/trees' } }],
          },
          {
            label: 'Graphs',
            items: [{ autogenerate: { directory: 'data-structures/graphs' } }],
          },
          {
            label: 'Sorting',
            items: [{ autogenerate: { directory: 'data-structures/sorting' } }],
          },
          {
            label: 'Binary Search',
            items: [
              { autogenerate: { directory: 'data-structures/binary-search' } },
              {
                label: '5 Core Patterns',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/02-patterns' } }],
              },
              {
                label: '10 Classic Problems',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/03-problems' } }],
              },
              {
                label: 'Advanced Topics',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/04-advanced' } }],
              },
              {
                label: 'Interview Questions',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/05-interview-questions' } }],
              },
            ],
          },
          {
            label: 'Recursion & Backtracking',
            items: [{ autogenerate: { directory: 'data-structures/recursion' } }],
          },
          {
            label: 'Dynamic Programming',
            items: [
              { autogenerate: { directory: 'data-structures/dynamic-programming' } },
              {
                label: '1D DP Problems',
                items: [{ autogenerate: { directory: 'data-structures/dynamic-programming/04-1d-dp' } }],
              },
              {
                label: '2D DP Problems',
                items: [{ autogenerate: { directory: 'data-structures/dynamic-programming/05-2d-dp' } }],
              },
              {
                label: 'String DP Problems',
                items: [{ autogenerate: { directory: 'data-structures/dynamic-programming/06-string-dp' } }],
              },
            ],
          },
          {
            label: 'Greedy',
            items: [{ autogenerate: { directory: 'data-structures/greedy' } }],
          },
          {
            label: 'Bit Manipulation',
            items: [{ autogenerate: { directory: 'data-structures/bit-manipulation' } }],
          },
          {
            label: 'Math',
            items: [{ autogenerate: { directory: 'data-structures/math' } }],
          },
          {
            label: 'Interview Prep',
            items: [{ autogenerate: { directory: 'data-structures/interview-prep' } }],
          },
        ],
      },
      {
        label: 'Node.js',
        items: [
          { label: 'Node.js Overview', link: '/nodejs' },
          {
            label: '1. Fundamentals',
            items: [{ autogenerate: { directory: 'nodejs/fundamentals' } }],
          },
          {
            label: '2. Core Concepts',
            items: [{ autogenerate: { directory: 'nodejs/core' } }],
          },
          {
            label: '3. Web Development',
            items: [{ autogenerate: { directory: 'nodejs/web' } }],
          },
          {
            label: '4. Data Layer',
            items: [{ autogenerate: { directory: 'nodejs/data' } }],
          },
          {
            label: '5. Production',
            items: [{ autogenerate: { directory: 'nodejs/production' } }],
          },
          { label: '6. Interview Questions', link: '/nodejs/interview-questions' },
        ],
      },
      {
        label: 'GraphQL',
        items: [
          { label: 'GraphQL Overview', link: '/graphql' },
          {
            label: '01. Basics',
            items: [{ autogenerate: { directory: 'graphql/01-basics' } }],
          },
          {
            label: '02. Operations',
            items: [{ autogenerate: { directory: 'graphql/02-operations' } }],
          },
          {
            label: '03. Server',
            items: [{ autogenerate: { directory: 'graphql/03-server' } }],
          },
          {
            label: '04. Client & Practice',
            items: [{ autogenerate: { directory: 'graphql/04-client-and-practice' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'graphql/05-interview' } }],
          },
        ],
      },
      {
        label: 'Python',
        items: [
          { label: 'Python Overview', link: '/python' },
          {
            label: 'Introduction',
            items: [{ autogenerate: { directory: 'python/01-introduction' } }],
          },
          {
            label: 'Setup & Environment',
            items: [{ autogenerate: { directory: 'python/02-setup' } }],
          },
          {
            label: 'Python Basics',
            items: [{ autogenerate: { directory: 'python/03-basics' } }],
          },
          {
            label: 'Strings',
            items: [{ autogenerate: { directory: 'python/04-strings' } }],
          },
          {
            label: 'Numbers & Math',
            items: [{ autogenerate: { directory: 'python/05-numbers' } }],
          },
          {
            label: 'Collections',
            items: [{ autogenerate: { directory: 'python/06-collections' } }],
          },
          {
            label: 'Control Flow',
            items: [{ autogenerate: { directory: 'python/07-control-flow' } }],
          },
          {
            label: 'Functions',
            items: [{ autogenerate: { directory: 'python/08-functions' } }],
          },
          {
            label: 'Exception Handling',
            items: [{ autogenerate: { directory: 'python/09-exception-handling' } }],
          },
          {
            label: 'Object-Oriented Programming',
            items: [{ autogenerate: { directory: 'python/10-oop' } }],
          },
          {
            label: 'Modules & Packages',
            items: [{ autogenerate: { directory: 'python/11-modules-packages' } }],
          },
          {
            label: 'File Handling',
            items: [{ autogenerate: { directory: 'python/12-file-handling' } }],
          },
          {
            label: 'Regular Expressions',
            items: [{ autogenerate: { directory: 'python/13-regex' } }],
          },
          {
            label: 'Iterators, Generators & Decorators',
            items: [{ autogenerate: { directory: 'python/14-iterators-generators-decorators' } }],
          },
          {
            label: 'Advanced Concepts',
            items: [{ autogenerate: { directory: 'python/15-advanced-concepts' } }],
          },
          {
            label: 'Standard Library',
            items: [{ autogenerate: { directory: 'python/15b-standard-library' } }],
          },
          {
            label: 'Concurrency',
            items: [{ autogenerate: { directory: 'python/16-concurrency' } }],
          },
          {
            label: 'Database Programming',
            items: [{ autogenerate: { directory: 'python/17-database-programming' } }],
          },
          {
            label: 'Testing',
            items: [{ autogenerate: { directory: 'python/18-testing' } }],
          },
          {
            label: 'Interview Preparation',
            items: [{ autogenerate: { directory: 'python/19-interview-preparation' } }],
          },
        ],
      },
      {
        label: 'TypeScript',
        items: [
          { label: 'Introduction', link: '/typescript/introduction' },
          { label: 'Setup', link: '/typescript/setup' },
          {
            label: 'Basic Types',
            items: [
              { label: 'Overview', link: '/typescript/basic-types' },
              { label: 'Primitive Types', link: '/typescript/basic-types/primitive-types' },
              { label: 'Special Types', link: '/typescript/basic-types/special-types' },
              { label: 'Arrays & Tuples', link: '/typescript/basic-types/arrays-and-tuples' },
            ],
          },
          { label: 'Type Inference', link: '/typescript/type-inference' },
          {
            label: 'Type System',
            items: [
              { label: 'Union Types', link: '/typescript/unions' },
              { label: 'Intersection Types', link: '/typescript/intersections' },
              { label: 'Literal Types', link: '/typescript/literal-types' },
              { label: 'Enums', link: '/typescript/enums' },
              { label: 'Tuples', link: '/typescript/tuples' },
            ],
          },
          {
            label: 'Functions',
            items: [
              { label: 'Functions Overview', link: '/typescript/functions' },
              { label: 'Function Annotations', link: '/typescript/functions-section/function-annotations' },
              { label: 'Function Overloads', link: '/typescript/functions-section/function-overloads' },
              { label: 'Async Functions', link: '/typescript/functions-section/async-functions' },
            ],
          },
          {
            label: 'Objects & Interfaces',
            items: [
              { label: 'Objects', link: '/typescript/objects' },
              { label: 'Interfaces', link: '/typescript/interfaces' },
              { label: 'Type Aliases', link: '/typescript/type-aliases' },
              { label: 'Index Signatures', link: '/typescript/objects-section/index-signatures' },
              { label: 'Nested Objects', link: '/typescript/objects-section/nested-objects' },
              { label: 'Property Modifiers', link: '/typescript/objects-section/property-modifiers' },
              { label: 'Excess Property Checks', link: '/typescript/objects-section/excess-property-checks' },
              { label: 'Extending Interfaces', link: '/typescript/interfaces-section/extending-interfaces' },
              { label: 'Declaration Merging', link: '/typescript/interfaces-section/declaration-merging' },
              { label: 'Interface vs Type', link: '/typescript/interfaces-section/interface-vs-type' },
            ],
          },
          {
            label: 'Generics',
            items: [
              { label: 'Generics Overview', link: '/typescript/generics' },
              { label: 'Generic Constraints', link: '/typescript/generics-section/generic-constraints' },
              { label: 'Generic Patterns', link: '/typescript/generics-section/generic-patterns' },
              { label: 'Advanced Generics', link: '/typescript/advanced-generics' },
              { label: 'Utility Types', link: '/typescript/utility-types' },
            ],
          },
          {
            label: 'Advanced Types',
            items: [
              { label: 'Mapped Types', link: '/typescript/mapped-types' },
              { label: 'Conditional Types', link: '/typescript/conditional-types' },
              { label: 'Indexed Access Types', link: '/typescript/indexed-access-types' },
              { label: 'Type Guards', link: '/typescript/type-guards' },
              { label: 'Type Branding', link: '/typescript/advanced-types/type-branding' },
              { label: 'Satisfies Operator', link: '/typescript/advanced-types/satisfies-operator' },
              { label: 'Assertion Functions', link: '/typescript/advanced-types/assertion-functions' },
              { label: 'Template Literal Types', link: '/typescript/advanced-types/template-literal-types' },
              { label: 'Async/Await Deep Dive', link: '/typescript/advanced-types/async-await' },
              { label: 'Error Handling Patterns', link: '/typescript/advanced-types/error-handling' },
            ],
          },
          {
            label: 'Architecture',
            items: [
              { label: 'Decorators', link: '/typescript/decorators' },
              { label: 'Namespaces', link: '/typescript/namespaces' },
              { label: 'Modules', link: '/typescript/modules' },
              { label: 'Declaration Files', link: '/typescript/declaration-files' },
              { label: 'tsconfig', link: '/typescript/tsconfig' },
            ],
          },
          {
            label: 'React + TypeScript',
            items: [
              { label: 'React TypeScript Overview', link: '/typescript/react-typescript' },
              { label: 'Props Types', link: '/typescript/react-section/react-props-types' },
              { label: 'Hooks Types', link: '/typescript/react-section/react-hooks-types' },
              { label: 'Event Types', link: '/typescript/react-section/react-event-types' },
              { label: 'Context Types', link: '/typescript/react-section/react-context-types' },
              { label: 'Custom Hooks', link: '/typescript/react-section/react-custom-hooks' },
              { label: 'State Management', link: '/typescript/react-section/react-state-management' },
            ],
          },
          {
            label: 'Angular + TypeScript',
            items: [
              { label: 'Angular TypeScript Overview', link: '/typescript/angular-typescript' },
              { label: 'Service Types', link: '/typescript/angular-section/angular-services-types' },
              { label: 'Form Types', link: '/typescript/angular-section/angular-forms-types' },
              { label: 'RxJS Types', link: '/typescript/angular-section/angular-rxjs-types' },
              { label: 'DI Types', link: '/typescript/angular-section/angular-di-types' },
            ],
          },
          {
            label: 'Node.js + TypeScript',
            items: [
              { label: 'Node TypeScript Overview', link: '/typescript/node-typescript' },
              { label: 'Express Types', link: '/typescript/node-section/node-express-types' },
              { label: 'DTO Patterns', link: '/typescript/node-section/node-dto-patterns' },
              { label: 'Middleware Types', link: '/typescript/node-section/node-middleware-types' },
              { label: 'Error Handling', link: '/typescript/node-section/node-error-handling' },
              { label: 'Database Types', link: '/typescript/node-section/node-database-types' },
            ],
          },
          { label: 'Interview Questions', link: '/typescript/interview-questions' },
          { label: 'Cheatsheet', link: '/typescript/cheatsheet' },
          { label: 'Roadmap', link: '/typescript/roadmap' },
        ],
      },
      {
        label: 'Cloud & AWS',
        items: [
          { label: 'Cloud & AWS Overview', link: '/aws' },
          {
            label: '01. Fundamentals',
            items: [{ autogenerate: { directory: 'aws/01-fundamentals' } }],
          },
          {
            label: '02. Compute',
            items: [{ autogenerate: { directory: 'aws/02-compute' } }],
          },
          {
            label: '03. Storage & Database',
            items: [{ autogenerate: { directory: 'aws/03-storage-and-database' } }],
          },
          {
            label: '04. Networking & Delivery',
            items: [{ autogenerate: { directory: 'aws/04-networking-and-delivery' } }],
          },
          {
            label: '05. Deployment',
            items: [{ autogenerate: { directory: 'aws/05-deployment' } }],
          },
          {
            label: '06. Interview',
            items: [{ autogenerate: { directory: 'aws/06-interview' } }],
          },
        ],
      },
      {
        label: 'Docker',
        items: [
          { label: 'Docker Overview', link: '/docker' },
          {
            label: 'Fundamentals',
            items: [{ autogenerate: { directory: 'docker/fundamentals' } }],
          },
          {
            label: 'Advanced Docker',
            items: [{ autogenerate: { directory: 'docker/advanced' } }],
          },
          {
            label: 'Orchestration',
            items: [{ autogenerate: { directory: 'docker/orchestration' } }],
          },
        ],
      },
      {
        label: 'Design Patterns & SOLID',
        items: [
          { label: 'Overview', link: '/design-patterns' },
          {
            label: '01. Fundamentals',
            items: [{ autogenerate: { directory: 'design-patterns/01-fundamentals' } }],
          },
          {
            label: '02. SOLID Principles',
            items: [{ autogenerate: { directory: 'design-patterns/02-solid' } }],
          },
          {
            label: '03. Creational',
            items: [{ autogenerate: { directory: 'design-patterns/03-creational' } }],
          },
          {
            label: '04. Structural',
            items: [{ autogenerate: { directory: 'design-patterns/04-structural' } }],
          },
          {
            label: '05. Behavioral',
            items: [{ autogenerate: { directory: 'design-patterns/05-behavioral' } }],
          },
          {
            label: '06. Practical Guide',
            items: [{ autogenerate: { directory: 'design-patterns/06-practical' } }],
          },
          {
            label: '07. Interview',
            items: [{ autogenerate: { directory: 'design-patterns/07-interview' } }],
          },
        ],
      },
      {
        label: 'System Design',
        items: [
          { label: 'Overview', link: '/system-design' },
          {
            label: 'Fundamentals',
            items: [{ autogenerate: { directory: 'system-design/01-fundamentals' } }],
          },
          {
            label: 'Building Blocks',
            items: [{ autogenerate: { directory: 'system-design/02-building-blocks' } }],
          },
          {
            label: 'Databases',
            items: [{ autogenerate: { directory: 'system-design/03-databases' } }],
          },
          {
            label: 'Caching',
            items: [{ autogenerate: { directory: 'system-design/04-caching' } }],
          },
          {
            label: 'Communication',
            items: [{ autogenerate: { directory: 'system-design/05-communication' } }],
          },
          {
            label: 'Architecture Patterns',
            items: [{ autogenerate: { directory: 'system-design/06-architecture-patterns' } }],
          },
          {
            label: 'Distributed Systems',
            items: [{ autogenerate: { directory: 'system-design/07-distributed-systems' } }],
          },
          {
            label: 'Reliability & Scale',
            items: [{ autogenerate: { directory: 'system-design/08-reliability-and-scale' } }],
          },
          {
            label: 'Security',
            items: [{ autogenerate: { directory: 'system-design/09-security' } }],
          },
          {
            label: 'Interview Guide',
            items: [{ autogenerate: { directory: 'system-design/10-interview-guide' } }],
          },
          {
            label: 'Case Studies',
            items: [{ autogenerate: { directory: 'system-design/11-case-studies' } }],
          },
        ],
      },
      {
        label: 'High-Level Design (HLD)',
        items: [
          { label: 'HLD Overview', link: '/hld' },
          {
            label: 'Fundamentals',
            items: [
              { label: '01. Introduction to HLD', link: '/hld/01-introduction-to-hld' },
              { label: '02. Requirements', link: '/hld/02-requirements-gathering' },
              { label: '03. Capacity Estimation', link: '/hld/03-capacity-estimation' },
              { label: '04. Monolith vs Microservices', link: '/hld/04-monolith-vs-microservices' },
            ],
          },
          {
            label: 'Architecture Components',
            items: [
              { label: '05. Load Balancers', link: '/hld/05-load-balancers' },
              { label: '06. API Gateway', link: '/hld/06-api-gateway' },
              { label: '07. Caching Strategies', link: '/hld/07-caching-strategies' },
              { label: '08. Database Selection', link: '/hld/08-database-selection' },
              { label: '09. Message Queues', link: '/hld/09-message-queues' },
              { label: '10. Event-Driven Architecture', link: '/hld/10-event-driven-architecture' },
              { label: '11. CDN Design', link: '/hld/11-cdn-design' },
              { label: '12. Auth Architecture', link: '/hld/12-authentication-architecture' },
              { label: '13. File Storage', link: '/hld/13-file-storage-architecture' },
            ],
          },
          {
            label: 'Advanced Topics',
            items: [
              { label: '14. Monitoring & Observability', link: '/hld/14-monitoring-and-observability' },
              { label: '15. High Availability', link: '/hld/15-high-availability' },
              { label: '16. Disaster Recovery', link: '/hld/16-disaster-recovery' },
              { label: '17. Cloud Architecture', link: '/hld/17-cloud-architecture' },
              { label: '18. Multi-Tenant Systems', link: '/hld/18-multi-tenant-systems' },
              { label: '19. Real-Time Systems', link: '/hld/19-real-time-systems' },
              { label: '20. System Design Interviews', link: '/hld/20-system-design-interviews' },
            ],
          },
          {
            label: 'Case Studies',
            items: [
              { label: '1. URL Shortener', link: '/hld/case-studies/design-url-shortener' },
              { label: '2. WhatsApp', link: '/hld/case-studies/design-whatsapp' },
              { label: '3. Netflix', link: '/hld/case-studies/design-netflix' },
              { label: '4. YouTube', link: '/hld/case-studies/design-youtube' },
              { label: '5. Uber', link: '/hld/case-studies/design-uber' },
              { label: '6. Instagram', link: '/hld/case-studies/design-instagram' },
              { label: '7. Google Drive', link: '/hld/case-studies/design-google-drive' },
              { label: '8. Notification System', link: '/hld/case-studies/design-notification-system' },
              { label: '9. Payment Gateway', link: '/hld/case-studies/design-payment-gateway' },
              { label: '10. Search Engine', link: '/hld/case-studies/design-search-engine' },
            ],
          },
        ],
      },
      {
        label: 'Low-Level Design (LLD)',
        items: [
          { label: 'LLD Overview', link: '/lld' },
          {
            label: '01. OOP & Design Principles',
            items: [
              { label: '01. OOP Fundamentals', link: '/lld/01-oop-fundamentals' },
              { label: '02. SOLID Principles', link: '/lld/02-solid-principles' },
              { label: '03. UML Basics', link: '/lld/03-uml-basics' },
              { label: '04. Class Diagrams', link: '/lld/04-class-diagrams' },
              { label: '05. Object Relationships', link: '/lld/05-object-relationships' },
            ],
          },
          {
            label: '02. Code & Architecture',
            items: [
              { label: '06. Design Principles', link: '/lld/06-design-principles' },
              { label: '07. Dependency Injection', link: '/lld/07-dependency-injection' },
              { label: '08. Design Pattern Selection', link: '/lld/08-design-pattern-selection' },
              { label: '09. Machine Coding Approach', link: '/lld/09-machine-coding-approach' },
              { label: '10. Code Organization', link: '/lld/10-code-organization' },
            ],
          },
          {
            label: 'LLD Projects',
            items: [
              { label: '1. Parking Lot', link: '/lld/projects/design-parking-lot' },
              { label: '2. ATM', link: '/lld/projects/design-atm' },
              { label: '3. BookMyShow', link: '/lld/projects/design-bookmyshow' },
              { label: '4. Library Management', link: '/lld/projects/design-library-management' },
              { label: '5. Hotel Management', link: '/lld/projects/design-hotel-management' },
              { label: '6. Elevator System', link: '/lld/projects/design-elevator-system' },
              { label: '7. Vending Machine', link: '/lld/projects/design-vending-machine' },
              { label: '8. Splitwise', link: '/lld/projects/design-splitwise' },
              { label: '9. Chess Game', link: '/lld/projects/design-chess-game' },
              { label: '10. Snake & Ladder', link: '/lld/projects/design-snake-and-ladder' },
              { label: '11. Tic Tac Toe', link: '/lld/projects/design-tic-tac-toe' },
              { label: '12. Logging Framework', link: '/lld/projects/design-logging-framework' },
              { label: '13. Notification Service', link: '/lld/projects/design-notification-service' },
              { label: '14. Rate Limiter', link: '/lld/projects/design-rate-limiter' },
              { label: '15. Cache System', link: '/lld/projects/design-cache-system' },
            ],
          },
        ],
      },
      {
        label: 'Interview Prep',
        items: [{ autogenerate: { directory: 'interview' } }],
      },
    ],
    head: [
      {
        tag: 'meta',
        attrs: {
          name: 'keywords',
          content: 'DSA, JavaScript, React, MongoDB, SQL, Docker, Interview Prep',
        },
      },
      {
        tag: 'script',
        attrs: {
          type: 'module',
        },
        content: `
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.15.0/dist/mermaid.esm.min.mjs';

          let rendering = false;

          async function renderMermaid() {
            if (rendering) return;
            rendering = true;
            try {
            const theme = document.documentElement.getAttribute('data-theme');
            mermaid.initialize({
              startOnLoad: false,
              theme: theme === 'light' ? 'default' : 'dark',
              themeVariables: {
                primaryColor: theme === 'light' ? '#7c3aed' : '#a78bfa',
                primaryTextColor: '#ffffff',
                primaryBorderColor: theme === 'light' ? '#7c3aed' : '#a78bfa',
                lineColor: theme === 'light' ? '#64748b' : '#94a3b8',
                secondaryColor: theme === 'light' ? '#f5f3ff' : '#1e1b4b',
                tertiaryColor: theme === 'light' ? '#f8fafc' : '#0f172a',
              }
            });

            // Find mermaid code blocks in their various HTML wrappers
            // Starlight/expressive-code structures them as: <pre data-language="mermaid"><code>...</code></pre>
            // Regular markdown renders as: <pre><code class="language-mermaid">...</code></pre>
            const blocks = [];

            document.querySelectorAll('pre[data-language="mermaid"]').forEach(el => {
              if (!blocks.includes(el)) blocks.push(el);
            });

            document.querySelectorAll('pre > code.language-mermaid').forEach(el => {
              const pre = el.parentElement;
              if (pre && !blocks.includes(pre)) blocks.push(pre);
            });

            document.querySelectorAll('pre.language-mermaid').forEach(el => {
              if (!blocks.includes(el)) blocks.push(el);
            });

            // Remove old SVG renders before re-rendering
            document.querySelectorAll('.mermaid svg').forEach(svg => svg.remove());

            // Convert each matched block into a .mermaid div
            blocks.forEach(pre => {
              // Skip if already processed
              if (pre.dataset.mermaidProcessed) return;
              pre.dataset.mermaidProcessed = 'true';

              const code = pre.querySelector('code');
              let content;
              if (code) {
                // Expressive Code splits each line into a .ec-line element.
                // textContent joins them with NO newline, breaking mermaid.
                // Rebuild source by joining lines with newlines.
                const lines = code.querySelectorAll('.ec-line');
                content = lines.length
                  ? Array.from(lines).map(l => l.textContent).join('\\n')
                  : code.textContent;
              } else {
                content = pre.textContent;
              }

              const div = document.createElement('div');
              div.className = 'mermaid';
              div.textContent = content;

              pre.parentNode.replaceChild(div, pre);
            });

            // Render all unrendered .mermaid divs in one pass (mermaid handles ids/attachment)
            const nodes = document.querySelectorAll('.mermaid:not([data-rendered])');
            if (nodes.length) {
              nodes.forEach(el => el.dataset.rendered = 'true');
              try {
                await mermaid.run({ nodes: Array.from(nodes) });
              } catch(e) {
                console.error('Mermaid diagram failed:', e);
              }
            }
            } finally {
              rendering = false;
            }
          }

          // Run on initial page load and every Astro client-side navigation
          // astro:page-load fires on initial visit too in Astro 6
          document.addEventListener('astro:page-load', renderMermaid);
          // Module scripts are deferred; page-load may have already fired. Run once now.
          renderMermaid();

          // Re-render on theme change (no page reload)
          const themeObserver = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light' || theme === 'dark') {
              renderMermaid();
            }
          });
          themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        `,
      },
    ],
  }), react()],
});
