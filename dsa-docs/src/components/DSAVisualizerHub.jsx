import { useState, useEffect } from 'react';
import Skeleton, { SkeletonHero, SkeletonGrid, SkeletonStats } from './Skeleton.jsx';


const DSA_TOPICS = [
  { id: 'arrays', icon: '📋', label: 'Arrays', desc: 'Insert, delete, update, traverse, and search in arrays', color: '#3b82f6' },
  { id: 'sorting', icon: '🔀', label: 'Sorting', desc: 'Bubble, Selection, Insertion, Merge, Quick Sort', color: '#f59e0b' },
  { id: 'trees', icon: '🌳', label: 'Trees', desc: 'BST operations, Inorder, Preorder, Postorder traversals', color: '#22c55e' },
  { id: 'graphs', icon: '📊', label: 'Graphs', desc: 'BFS, DFS on undirected, directed, weighted graphs', color: '#a78bfa' },
  { id: 'linked-list', icon: '⛓️', label: 'Linked Lists', desc: 'Singly, doubly, circular linked lists', color: '#ec4899' },
  { id: 'stack', icon: '📚', label: 'Stacks', desc: 'Push, pop, peek operations', color: '#14b8a6' },
  { id: 'queue', icon: '🎯', label: 'Queues', desc: 'Enqueue, dequeue, circular queue', color: '#f97316' },
  { id: 'heap', icon: '⛰️', label: 'Heaps', desc: 'Min-heap, max-heap, heapify', color: '#8b5cf6' },
  { id: 'searching', icon: '🔍', label: 'Searching', desc: 'Linear search, binary search', color: '#06b6d4' },
  { id: 'recursion', icon: '🔄', label: 'Recursion', desc: 'Recursive calls, call stack visualization', color: '#e11d48' },
  { id: 'dp', icon: '🧮', label: 'Dynamic Programming', desc: 'Memoization, tabulation, LCS, knapsack', color: '#10b981' },
  { id: 'hashing', icon: '🔑', label: 'Hash Tables', desc: 'Hash functions, collision resolution', color: '#6366f1' },
];

const readyTopics = ['arrays', 'sorting', 'trees', 'graphs', 'stack', 'queue', 'linked-list', 'heap', 'searching', 'recursion', 'dp'];

export default function DSAVisualizerHub() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoaded(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  if (loading) {
    return (
      <div className="landing-page loaded">
        <SkeletonHero />
        <SkeletonGrid count={12} variant="topic-card" columns={3} cardHeight="60px" />
        <SkeletonStats count={4} />
      </div>
    );
  }

  return (
    <div className={`landing-page ${loaded ? 'loaded' : ''}`}>
      {/* Hero */}
      <section className="hero" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <div className="hero-badge"><span className="badge-dot" /> Interactive DSA Learning</div>
          <h1 className="hero-title">
            Data Structures &<br />
            <span className="hero-highlight">Algorithms Visualizer</span>
          </h1>
          <p className="hero-desc">Watch algorithms come to life with interactive animations. Step through each operation, understand complexity, and master DSA concepts visually.</p>
          <div className="hero-actions">
            <a href={`${base}visualizer/arrays`} className="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              Start Visualizing <span className="btn-arrow">→</span>
            </a>
            <a href={`${base}overview`} className="btn btn-secondary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
              Explore Docs
            </a>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="topics-section" style={{ marginTop: '2rem' }}>
        <div className="section-header">
          <span className="section-tag">Interactive Visualizers</span>
          <h2>Choose a Topic</h2>
          <p>Click any visualizer below to explore DSA concepts with step-by-step animations.</p>
        </div>
        <div className="topics-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
          {DSA_TOPICS.map((topic) => {
            const isBuilt = readyTopics.includes(topic.id);
            return (
              <a
                key={topic.id}
                href={isBuilt ? `${base}visualizer/${topic.id}` : undefined}
                onClick={!isBuilt ? (e) => e.preventDefault() : undefined}
                className="topic-card"
                style={{ cursor: isBuilt ? 'pointer' : 'default', opacity: isBuilt ? 1 : 0.55 }}
              >
                <span className="topic-card-icon">{topic.icon}</span>
                <div className="topic-card-info">
                  <h4>{topic.label} {!isBuilt && <span className="text-[10px] font-semibold" style={{ color: '#94a3b8' }}>(Coming Soon)</span>}</h4>
                  <p>{topic.desc}</p>
                </div>
                {isBuilt && (
                  <svg className="topic-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                )}
              </a>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" style={{ marginTop: '3rem' }}>
        <div className="stat-item"><span className="stat-value">4</span><span className="stat-label">Active Visualizers</span></div>
        <div className="stat-item"><span className="stat-value">12</span><span className="stat-label">Topics Planned</span></div>
        <div className="stat-item"><span className="stat-value">5+</span><span className="stat-label">Sorting Algorithms</span></div>
        <div className="stat-item"><span className="stat-value">3</span><span className="stat-label">Tree Traversals</span></div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
          <div className="footer-links">
            <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`${base}overview`}>Docs</a>
            <a href={base}>Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
