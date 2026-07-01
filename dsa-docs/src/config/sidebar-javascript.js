const sidebar = [
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
