import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://prathameshp107.github.io',
  base: '/DSA-Notes-Problems',
  integrations: [
    starlight({
      title: 'DSA & Dev Notes',
      description: 'Personal knowledge base for DSA, JavaScript, React, SQL, MongoDB, Docker and Interview Prep',
      defaultLocale: 'en',
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
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Namaste JavaScript',
          items: [{ autogenerate: { directory: 'namaste-js' } }],
        },
        {
          label: 'JavaScript',
          items: [{ autogenerate: { directory: 'javascript' } }],
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
            { label: 'Fundamentals, Routing & Layouts', link: '/nextjs/fundamentals-routing-layouts' },
            { label: 'Components, Styling & Data Fetching', link: '/nextjs/components-styling-data-fetching' },
            { label: 'Middleware & Authentication', link: '/nextjs/middleware-authentication' },
            { label: 'Database, State Management & Forms', link: '/nextjs/database-state-forms' },
            { label: 'Performance Optimization & SEO', link: '/nextjs/performance-seo' },
            { label: 'Error Handling, Deployment & Testing', link: '/nextjs/error-handling-deployment-testing' },
            { label: 'Security & Advanced Concepts', link: '/nextjs/security-advanced-concepts' },
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
          label: 'Data Structures',
          items: [{ autogenerate: { directory: 'data-structures' } }],
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
    }),
  ],
});
