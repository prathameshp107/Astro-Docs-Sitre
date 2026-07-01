const sidebar = [
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
];
export default sidebar;
