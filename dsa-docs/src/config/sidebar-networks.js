const sidebar = [
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
];
export default sidebar;
