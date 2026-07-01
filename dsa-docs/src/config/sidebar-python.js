const sidebar = [
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
          { label: '🎯 Interview Questions (150+)', link: '/python/interview-questions' },
          {
            label: 'Interview Preparation',
            items: [{ autogenerate: { directory: 'python/19-interview-preparation' } }],
          },
        ],
      },
];
export default sidebar;
