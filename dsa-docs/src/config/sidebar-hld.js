const sidebar = [
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
];
export default sidebar;
