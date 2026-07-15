import { useState } from 'react';

const QUESTIONS = [
  {
    id: 'structure',
    title: '1. What is the structure of your data?',
    options: [
      { value: 'relational', label: 'Relational & Structured', desc: 'Strict schemas, complex multi-table joins, transactions.' },
      { value: 'document', label: 'Semi-structured (JSON)', desc: 'Nested documents, flexible fields, hierarchical data.' },
      { value: 'kv', label: 'Key-Value pairs', desc: 'Ultra-simple lookup by a single unique ID.' },
      { value: 'geo', label: 'Geospatial coordinates', desc: 'Queries like "find nearest drivers within 5km".' },
      { value: 'graph', label: 'Highly connected networks', desc: 'Complex social graphs, fraud rings, dependency trees.' },
    ],
  },
  {
    id: 'scale',
    title: '2. What are your scaling & throughput priorities?',
    options: [
      { value: 'acid', label: 'Strong ACID Consistency', desc: 'Must guarantee zero errors (e.g., banking ledger, billing).' },
      { value: 'write_heavy', label: 'Extreme Write Throughput', desc: 'Millions of raw events, logs, or metrics per second (IoT, chat logs).' },
      { value: 'read_heavy', label: 'Sub-millisecond Read Speeds', desc: 'Instantaneous response for hot/popular data lookup (cache, sessions).' },
    ],
  },
  {
    id: 'growth',
    title: '3. What is your expected dataset growth?',
    options: [
      { value: 'moderate', label: 'Moderate & Bounded (< 500GB)', desc: 'Fits comfortably on a single server, scales vertically.' },
      { value: 'massive', label: 'Massive & Unbounded (Terabytes/Petabytes)', desc: 'Requires horizontal sharding across hundreds of cheap nodes.' },
    ],
  },
];

const RECOMMENDATIONS = {
  'relational-acid-moderate': {
    tech: 'PostgreSQL / MySQL',
    type: 'Relational Database (RDBMS)',
    why: 'Your structured schema and strict ACID needs are best handled by classic RDBMS. PostgreSQL scales vertically up to 500GB easily and supports advanced indexing.',
    pros: ['Strong consistency', 'Rich SQL queries', 'Matured ecosystem'],
    cons: ['Difficult to scale write paths horizontally', 'Schema modifications require locks'],
  },
  'relational-acid-massive': {
    tech: 'NewSQL (Spanner / CockroachDB)',
    type: 'Distributed Relational Database',
    why: 'You need relational SQL features and ACID transactions, but at massive horizontally sharded scale. NewSQL databases use consensus algorithms (Raft/Paxos) to guarantee consistency across shards.',
    pros: ['Horizontal scaling', 'Global transactions', 'SQL support'],
    cons: ['Higher latency than single-node RDBMS', 'Expensive cloud hosting cost'],
  },
  'document-write_heavy-massive': {
    tech: 'MongoDB / DynamoDB',
    type: 'Document Store (NoSQL)',
    why: 'Semi-structured JSON datasets with massive horizontal scaling are the sweet spot for document stores. DynamoDB offers single-digit millisecond latency at unbounded scale by auto-sharding keys.',
    pros: ['Schemaless flexibility', 'Easy horizontal partitioning', 'Excellent write speeds'],
    cons: ['No complex joins', 'Transactions are slow and limited'],
  },
  'kv-read_heavy-moderate': {
    tech: 'Redis / Memcached',
    type: 'In-Memory Key-Value Cache',
    why: 'For sub-millisecond lookup speeds on cacheable data, in-memory caches are unmatched. Redis supports rich structures (hashes, lists, sets) in RAM.',
    pros: ['Extreme read/write speeds', 'Rich data structures', 'Atomic operations'],
    cons: ['Data must fit in RAM', 'Volatile unless snapshotting is tuned'],
  },
  'geo-write_heavy-massive': {
    tech: 'Cassandra + Geohash / Redis',
    type: 'Wide-Column Geo Index',
    why: 'Uber-style ride matching requires storing coordinates in RAM (Redis Geohash structures) for queries, and archiving them asynchronously into Cassandra wide-column shards.',
    pros: ['Sub-10ms lookup', 'High concurrent write limits', 'Scales out horizontally'],
    cons: ['Complex application-level geo clustering'],
  },
  'graph-acid-moderate': {
    tech: 'Neo4j / Amazon Neptune',
    type: 'Graph Database',
    why: 'Your data is defined by relationships. Neo4j handles multi-hop queries (e.g. Friend-of-Friend-of-Friend) in constant time by storing direct pointers instead of heavy SQL join scans.',
    pros: ['Lightning fast relation traversals', 'Flexible graph properties'],
    cons: ['Difficult to shard horizontally', 'Lacks bulk-aggregation efficiency'],
  },
  // Default fallback
  'default': {
    tech: 'DynamoDB / Cassandra',
    type: 'Wide-Column / Document Store',
    why: 'Based on your unstructured schema and need for scale, horizontal wide-column NoSQL stores provide high partition tolerance and write throughput by trading away strict multi-table relational joins.',
    pros: ['Linear write scale', 'Highly available', 'Flexible model'],
    cons: ['Requires query-first indexing modeling', 'No native SQL joins'],
  }
};

export default function DatabaseAdvisor() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({ structure: '', scale: '', growth: '' });
  const [result, setResult] = useState(null);

  const handleSelect = (value) => {
    const currentQuestion = QUESTIONS[step];
    const newSelections = { ...selections, [currentQuestion.id]: value };
    setSelections(newSelections);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate recommendation
      const key = `${newSelections.structure}-${newSelections.scale}-${newSelections.growth}`;
      const rec = RECOMMENDATIONS[key] || RECOMMENDATIONS.default;
      setResult(rec);
      setStep(step + 1);
    }
  };

  const resetWizard = () => {
    setStep(0);
    setSelections({ structure: '', scale: '', growth: '' });
    setResult(null);
  };

  return (
    <div className="db-wizard-card">
      <div className="db-wizard-header">
        <span className="db-wizard-icon">🤖</span>
        <div>
          <h3 className="db-wizard-title">Interactive Database Advisor</h3>
          <p className="db-wizard-subtitle">Answer 3 simple questions to find the ideal storage tech for your system.</p>
        </div>
      </div>

      <div className="db-wizard-body">
        {step < QUESTIONS.length ? (
          <div className="db-wizard-step">
            {/* Progress Bar */}
            <div className="db-wizard-progress-bar">
              <div 
                className="db-wizard-progress-fill" 
                style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h4 className="db-wizard-question-title">{QUESTIONS[step].title}</h4>
            <div className="db-wizard-options">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.value}
                  className="db-wizard-option-btn"
                  onClick={() => handleSelect(opt.value)}
                >
                  <div className="option-label">{opt.label}</div>
                  <div className="option-desc">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="db-wizard-result">
            <div className="result-badge">Recommended Storage Solution</div>
            <h4 className="result-tech">{result.tech}</h4>
            <div className="result-type">{result.type}</div>

            <p className="result-why">{result.why}</p>

            <div className="result-pros-cons">
              <div className="pros-block">
                <span className="block-title">✅ Strengths</span>
                <ul>
                  {result.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="cons-block">
                <span className="block-title">⚠️ Trade-offs</span>
                <ul>
                  {result.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>

            <button className="db-wizard-restart-btn" onClick={resetWizard}>
              🔄 Run Another Estimation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
