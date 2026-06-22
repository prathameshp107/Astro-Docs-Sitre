import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

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
        },
      {
        label: 'Namaste JavaScript',
        items: [{ autogenerate: { directory: 'namaste-js' } }],
      },
      {
        label: 'JavaScript',
        items: [
          { autogenerate: { directory: 'javascript' } },
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
          { label: 'Props', link: '/react/props' },
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
              { label: 'Layouts and Templates', link: '/nextjs/fundamentals/layouts-and-templates' },
              { label: 'Review & Practice', link: '/nextjs/fundamentals/review-practice-interview' },
            ],
          },
          {
            label: 'Core Concepts',
            items: [
              { label: 'Components', link: '/nextjs/core-concepts/components' },
              { label: 'Styling', link: '/nextjs/core-concepts/styling' },
              { label: 'Data Fetching', link: '/nextjs/core-concepts/data-fetching' },
              { label: 'Rendering Methods', link: '/nextjs/core-concepts/rendering-methods' },
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
              { label: 'Forms and Validation', link: '/nextjs/data-and-forms/forms-and-validation' },
              { label: 'Review & Practice', link: '/nextjs/data-and-forms/review-practice-interview' },
            ],
          },
          {
            label: 'Performance & SEO',
            items: [
              { label: 'Performance Optimization', link: '/nextjs/performance-seo/performance-optimization' },
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
            label: 'Core MongoDB',
            items: [
              { label: 'Fundamentals & CRUD', link: '/mongodb/fundamentals-crud' },
              { label: 'Data Modeling', link: '/mongodb/data-modeling' },
              { label: 'Query & Filtering', link: '/mongodb/query-filtering' },
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
            label: 'Performance',
            items: [
              { label: 'Indexing', link: '/mongodb/indexing' },
            ],
          },
          {
            label: 'Advanced & Integration',
            items: [
              { label: 'Advanced Topics', link: '/mongodb/advanced-topics' },
              { label: 'Mongoose Node.js Integration', link: '/mongodb/mongoose-nodejs-integration' },
            ],
          },
          {
            label: 'Interview & Revision',
            items: [
              { label: 'Top 100 Interview Questions', link: '/mongodb/top-100-interview-questions' },
              { label: 'Quick Reference Cheat Sheet', link: '/mongodb/quick-reference-cheat-sheet' },
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
            ],
          },
          {
            label: 'Integration & Commands',
            items: [
              { label: 'Redis with Node.js', link: '/redis/redis-with-node-js' },
              { label: 'Redis with Docker', link: '/redis/redis-with-docker' },
              { label: 'Commands Cheat Sheet', link: '/redis/common-redis-commands-cheat-sheet' },
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
            label: 'Stacks & Queues',
            items: [{ autogenerate: { directory: 'data-structures/stacks-queues' } }],
          },
          {
            label: 'Hashing',
            items: [{ autogenerate: { directory: 'data-structures/hashing' } }],
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
            label: 'Graphs',
            items: [{ autogenerate: { directory: 'data-structures/graphs' } }],
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
            label: 'Recursion & Backtracking',
            items: [{ autogenerate: { directory: 'data-structures/recursion' } }],
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
            label: 'Core Concepts',
            items: [
              { label: 'Introduction to Node.js', link: '/nodejs/introduction' },
              { label: 'Node.js Architecture', link: '/nodejs/architecture' },
              { label: 'Core Modules', link: '/nodejs/core-modules' },
              { label: 'Async Programming', link: '/nodejs/async-programming' },
            ],
          },
          {
            label: 'Building Applications',
            items: [
              { label: 'Building APIs', link: '/nodejs/building-apis' },
              { label: 'Express.js Framework', link: '/nodejs/express-framework' },
              { label: 'Authentication & Security', link: '/nodejs/authentication-security' },
              { label: 'Databases', link: '/nodejs/databases' },
            ],
          },
          {
            label: 'Advanced Topics',
            items: [
              { label: 'Advanced Node.js', link: '/nodejs/advanced' },
              { label: 'Production Architecture', link: '/nodejs/production-architecture' },
              { label: 'Design Patterns', link: '/nodejs/design-patterns' },
              { label: 'Performance Optimization', link: '/nodejs/performance' },
            ],
          },
          {
            label: 'Testing & Deployment',
            items: [
              { label: 'Testing', link: '/nodejs/testing' },
              { label: 'Deployment', link: '/nodejs/deployment' },
            ],
          },
          {
            label: 'Architecture & Interview',
            items: [
              { label: 'Project Architecture', link: '/nodejs/project-architecture' },
              { label: 'Interview Questions', link: '/nodejs/interview-questions' },
            ],
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
    ],
  }), react()],
});
