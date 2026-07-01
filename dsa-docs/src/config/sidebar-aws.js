const sidebar = [
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
          { label: '🎯 Interview Questions (150+)', link: '/aws/interview-questions' },
        ],
      },
];
export default sidebar;
