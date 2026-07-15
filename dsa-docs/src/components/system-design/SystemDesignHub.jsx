import { useState } from 'react';
import EstimationCalculator from './EstimationCalculator';
import DatabaseAdvisor from './DatabaseAdvisor';

const CASE_STUDIES = [
  { slug: 'url-shortener', title: 'Design URL Shortener (TinyURL)', desc: 'Key generation, redirection, caching, and database scaling.', interactive: true, link: '/system-design/url-shortener' },
  { slug: 'uber', title: 'Design Ride-Sharing (Uber)', desc: 'Geospatial indexing (Geohash), WebSocket connections, and matching service.', interactive: true, link: '/system-design/url-shortener?case=uber' }, // we can support query params or separate pages. Let's make separate pages or load them dynamically.
  { slug: 'whatsapp', title: 'Design Chat App (WhatsApp)', desc: 'WebSocket servers, message queuing, delivery status checks, and presence store.', interactive: true, link: '/system-design/url-shortener?case=whatsapp' },
  { slug: 'instagram', title: 'Design News Feed (Instagram)', desc: 'Fan-out write/read paths, feed caching, media storage, and scaling read paths.', interactive: false },
  { slug: 'youtube', title: 'Design Video Platform (YouTube)', desc: 'Transcoding pipelines, CDN delivery, view counters, and upload flow.', interactive: false },
  { slug: 'google-drive', title: 'Design Cloud Storage (Google Drive)', desc: 'Chunking uploads, sync conflict resolution, and metadata sharding.', interactive: false },
  { slug: 'netflix', title: 'Design Video Streaming (Netflix)', desc: 'Content delivery networks, localized transcoding, and playback architecture.', interactive: false },
  { slug: 'payment-gateway', title: 'Design Payment Gateway', desc: 'Idempotent transactions, reconciliation loops, and ledger architecture.', interactive: false },
];

const LLD_PROJECTS = [
  { slug: 'parking-lot', title: 'Parking Lot Design', patterns: 'Singleton, Factory, Command', diagram: true },
  { slug: 'cache-system', title: 'In-Memory Cache (LRU/LFU)', patterns: 'Strategy, Doubly Linked List', diagram: true },
  { slug: 'rate-limiter', title: 'Distributed Rate Limiter', patterns: 'Token Bucket, Sliding Log', diagram: true },
  { slug: 'elevator-system', title: 'Elevator Control System', patterns: 'State, Strategy, Dispatcher', diagram: false },
  { slug: 'splitwise', title: 'Expense Sharing (Splitwise)', patterns: 'Composite, Observer, Simplification', diagram: false },
  { slug: 'bookmyshow', title: 'Movie Ticket Booking', patterns: 'Concurrency Locks, Strategy', diagram: false },
];

const HLD_TOPICS = [
  { title: 'Scaling Fundamentals', slug: '01-introduction-to-hld' },
  { title: 'Capacity Estimation', slug: '03-capacity-estimation' },
  { title: 'Load Balancers', slug: '05-load-balancers' },
  { title: 'API Gateways', slug: '06-api-gateway' },
  { title: 'Caching Strategies', slug: '07-caching-strategies' },
  { title: 'Database Selection', slug: '08-database-selection' },
  { title: 'Message Queues', slug: '09-message-queues' },
  { title: 'CDN Architectures', slug: '11-cdn-design' },
];

export default function SystemDesignHub() {
  const [activeTab, setActiveTab] = useState('case-studies');

  const base = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

  return (
    <div className="sys-hub-container">
      {/* Hero Section */}
      <section className="sys-hub-hero">
        <div className="sys-hub-badge">Premium Feature</div>
        <h1 className="sys-hub-title">System Design Hub</h1>
        <p className="sys-hub-subtitle">
          Evolve architectures from a single server to serving billions of users. 
          Learn High-Level Design (HLD) and Low-Level Design (LLD) with interactive visualizers.
        </p>

        {/* Quick Stats */}
        <div className="sys-hub-stats-row">
          <div className="sys-hub-stat-item">
            <span className="stat-num">20</span>
            <span className="stat-lbl">HLD Topics</span>
          </div>
          <div className="sys-hub-divider"></div>
          <div className="sys-hub-stat-item">
            <span className="stat-num">10</span>
            <span className="stat-lbl">Case Studies</span>
          </div>
          <div className="sys-hub-divider"></div>
          <div className="sys-hub-stat-item">
            <span className="stat-num">15</span>
            <span className="stat-lbl">LLD Projects</span>
          </div>
        </div>
      </section>

      {/* Grid: Main Sections / Hub Tabs */}
      <div className="sys-hub-tabs">
        <button 
          className={`sys-hub-tab-btn ${activeTab === 'case-studies' ? 'active' : ''}`}
          onClick={() => setActiveTab('case-studies')}
        >
          📂 Case Studies
        </button>
        <button 
          className={`sys-hub-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          🧮 Capacity Calculator
        </button>
        <button 
          className={`sys-hub-tab-btn ${activeTab === 'lld' ? 'active' : ''}`}
          onClick={() => setActiveTab('lld')}
        >
          ⚙️ LLD / OOP Design
        </button>
        <button 
          className={`sys-hub-tab-btn ${activeTab === 'advisor' ? 'active' : ''}`}
          onClick={() => setActiveTab('advisor')}
        >
          🤖 DB Advisor
        </button>
      </div>

      {/* Tab Panels */}
      <div className="sys-hub-content">
        {/* PANEL: Case Studies */}
        {activeTab === 'case-studies' && (
          <div className="sys-hub-panel">
            <div className="panel-header">
              <h2>Architectural Case Studies</h2>
              <p>Step-by-step scaling patterns from real-world products.</p>
            </div>
            
            <div className="sys-hub-grid">
              {CASE_STUDIES.map((c) => (
                <div key={c.slug} className={`sys-hub-card ${c.interactive ? 'interactive-card' : ''}`}>
                  {c.interactive && (
                    <div className="card-badge-wrap">
                      <span className="card-badge animate-pulse">Interactive</span>
                    </div>
                  )}
                  <h3 className="card-title">{c.title}</h3>
                  <p className="card-desc">{c.desc}</p>
                  <div className="card-footer">
                    {c.interactive ? (
                      <a 
                        href={c.slug === 'url-shortener' 
                          ? `${base}/system-design/url-shortener` 
                          : `${base}/system-design/url-shortener?case=${c.slug}`
                        } 
                        className="card-action-btn primary"
                      >
                        Launch Visualizer →
                      </a>
                    ) : (
                      <a href={`${base}/hld/case-studies/design-${c.slug}`} className="card-action-btn secondary">
                        Read Guide
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick HLD Course Links */}
            <div className="sys-hub-course-box">
              <h3>📚 HLD Fundamentals Course</h3>
              <p>Master the building blocks of distributed systems before diving into case studies.</p>
              <div className="course-links-grid">
                {HLD_TOPICS.map((topic, i) => (
                  <a key={i} href={`${base}/hld/${topic.slug}`} className="course-link-chip">
                    {topic.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL: Calculator */}
        {activeTab === 'calculator' && (
          <div className="sys-hub-panel">
            <div className="panel-header">
              <h2>Back-of-the-Envelope Calculator</h2>
              <p>Estimate QPS, bandwidth, and database storage needs in seconds.</p>
            </div>
            <EstimationCalculator />

            {/* Quick Cheat Sheet / Reference */}
            <div className="sys-hub-cheatsheet-container">
              {/* Card 1: Latency */}
              <div className="sys-hub-cheatsheet-card">
                <h4 className="cheatsheet-card-title">⏱️ Latencies Systems Engineers Should Know</h4>
                <div className="cheatsheet-table-wrap">
                  <table className="cheatsheet-table">
                    <thead>
                      <tr>
                        <th>Operation</th>
                        <th>Latency (Approx)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>L1 Cache reference</td><td className="mono-val">0.5 ns</td></tr>
                      <tr><td>L2 Cache reference</td><td className="mono-val">7 ns</td></tr>
                      <tr><td>Main memory reference</td><td className="mono-val">100 ns</td></tr>
                      <tr><td>Send 2KB over 1 Gbps network</td><td className="mono-val">20,000 ns (20 µs)</td></tr>
                      <tr><td>Read 1MB sequentially from SSD</td><td className="mono-val">1,000,000 ns (1 ms)</td></tr>
                      <tr><td>Disk seek (HDD)</td><td className="mono-val">10,000,000 ns (10 ms)</td></tr>
                      <tr><td>Round trip within same DC</td><td className="mono-val">500,000 ns (500 µs)</td></tr>
                      <tr><td>WAN Round trip (SF to NY)</td><td className="mono-val">45 ms</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card 2: SLA */}
              <div className="sys-hub-cheatsheet-card">
                <h4 className="cheatsheet-card-title">🎯 High Availability SLA / Downtime Limits</h4>
                <div className="cheatsheet-table-wrap">
                  <table className="cheatsheet-table">
                    <thead>
                      <tr>
                        <th>SLA Percent</th>
                        <th>Downtime per Year</th>
                        <th>Downtime per Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>99% ("Two Nines")</td><td>3.65 days</td><td>14.4 minutes</td></tr>
                      <tr><td>99.9% ("Three Nines")</td><td>8.77 hours</td><td>1.44 minutes</td></tr>
                      <tr><td>99.99% ("Four Nines")</td><td className="green-val">52.56 minutes</td><td className="green-val">8.6 seconds</td></tr>
                      <tr><td>99.999% ("Five Nines")</td><td className="gold-val">5.26 minutes</td><td className="gold-val">864 ms</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: LLD */}
        {activeTab === 'lld' && (
          <div className="sys-hub-panel">
            <div className="panel-header">
              <h2>Low-Level & Object-Oriented Design</h2>
              <p>Master machine coding, SOLID principles, and object-oriented design patterns.</p>
            </div>

            <div className="sys-hub-grid">
              {LLD_PROJECTS.map((p) => (
                <div key={p.slug} className={`sys-hub-card ${p.diagram ? 'lld-interactive-card' : ''}`}>
                  {p.diagram && (
                    <div className="card-badge-wrap">
                      <span className="card-badge lld">UML Class Diagram</span>
                    </div>
                  )}
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-desc">Design patterns: <code>{p.patterns}</code></p>
                  <div className="card-footer">
                    {p.diagram ? (
                      <a href={`${base}/lld/projects/design-${p.slug}`} className="card-action-btn primary lld-btn">
                        View Class Schema →
                      </a>
                    ) : (
                      <a href={`${base}/lld/projects/design-${p.slug}`} className="card-action-btn secondary">
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* LLD theory links */}
            <div className="sys-hub-course-box">
              <h3>🛠️ LLD & OOP Principles</h3>
              <div className="course-links-grid">
                <a href={`${base}/lld/01-oop-fundamentals`} className="course-link-chip">OOP Fundamentals</a>
                <a href={`${base}/lld/02-solid-principles`} className="course-link-chip">SOLID Principles</a>
                <a href={`${base}/lld/04-class-diagrams`} className="course-link-chip">Class Diagrams (UML)</a>
                <a href={`${base}/lld/05-object-relationships`} className="course-link-chip">Object Relationships</a>
                <a href={`${base}/lld/07-dependency-injection`} className="course-link-chip">Dependency Injection</a>
                <a href={`${base}/lld/09-machine-coding-approach`} className="course-link-chip">Machine Coding Strategy</a>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: Advisor */}
        {activeTab === 'advisor' && (
          <div className="sys-hub-panel">
            <div className="panel-header">
              <h2>Interactive Database Advisor</h2>
              <p>Determine the optimal database technology for your application requirements.</p>
            </div>
            <DatabaseAdvisor />
          </div>
        )}
      </div>
    </div>
  );
}
