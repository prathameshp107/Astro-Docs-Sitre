const sidebar = [
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
];
export default sidebar;
