import { useState, useEffect } from 'react';
import VisualizerArticle from './VisualizerArticle.jsx';
import RecorderBridge from './RecorderBridge.jsx';
import '../../styles/sketch-visualizer.css';
import { DSA_TOPICS } from '../../data/visualizers/dsaTopics';
import ComplexityTable from '../visualizer-common/ComplexityTable';
import CodeTabs from '../visualizer-common/CodeTabs';
import ArrayVisualizer from './ArrayVisualizer';
import SortingVisualizer from './SortingVisualizer';
import TreeVisualizer from './TreeVisualizer';
import GraphVisualizer from './GraphVisualizer';
import StackVisualizer from './StackVisualizer';
import QueueVisualizer from './QueueVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer';
import HeapVisualizer from './HeapVisualizer';
import RecursionVisualizer from './RecursionVisualizer';
import DPVisualizer from './DPVisualizer';
import SearchingVisualizer from './SearchingVisualizer';
import TwoPointersVisualizer from './TwoPointersVisualizer';
import SlidingWindowVisualizer from './SlidingWindowVisualizer';
import BacktrackingVisualizer from './BacktrackingVisualizer';
import HashTableVisualizer from './HashTableVisualizer';

const VISUALIZER_MAP = {
  'two-pointers': TwoPointersVisualizer,
  'sliding-window': SlidingWindowVisualizer,
  'backtracking': BacktrackingVisualizer,
  arrays: ArrayVisualizer,
  sorting: SortingVisualizer,
  searching: SearchingVisualizer,
  trees: TreeVisualizer,
  graphs: GraphVisualizer,
  stack: StackVisualizer,
  queue: QueueVisualizer,
  'linked-list': LinkedListVisualizer,
  heap: HeapVisualizer,
  heaps: HeapVisualizer,
  recursion: RecursionVisualizer,
  dp: DPVisualizer,
  'hash-table': HashTableVisualizer,
  'hash-tables': HashTableVisualizer,
};

function useInView(threshold = 0.1) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.unobserve(ref); }
    }, { threshold });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return [setRef, inView];
}

function Section({ title, icon, children, className = '' }) {
  const [setRef, inView] = useInView(0.1);
  return (
    <section
      ref={setRef}
      className={`mb-10 transition-all duration-700 font-sketch ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--sketch-text)] mb-4 flex items-center gap-3 font-header">
        <span className="text-2xl">{icon || '✦'}</span>
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}

function AccordionItem({ question, difficulty, hint, index }) {
  const [open, setOpen] = useState(false);

  const diffColors = {
    Easy: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-emerald-500/20',
    Medium: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40 shadow-amber-500/20',
    Hard: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/40 shadow-rose-500/20',
  };

  return (
    <div className="sketch-border bg-[var(--sketch-bg-dim)] rounded-2xl mb-4 overflow-hidden shadow-md font-sketch transition-all hover:scale-[1.005]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-3 flex-1 min-w-0">
          <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--sketch-accent-orange)]/15 border border-[var(--sketch-accent-orange)]/40 text-[var(--sketch-accent-orange)] font-mono font-bold text-xs flex items-center justify-center">
            #{index + 1}
          </span>
          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border shadow-sm ${diffColors[difficulty] || diffColors.Medium}`}>
            {difficulty}
          </span>
          <span className="text-[var(--sketch-text)] font-header font-bold text-lg md:text-xl truncate">
            {question}
          </span>
        </span>
        <div className={`w-8 h-8 rounded-full border border-[var(--sketch-border)] flex items-center justify-center text-[var(--sketch-text-muted)] transition-transform duration-300 ${open ? 'rotate-180 bg-amber-500/20 text-amber-500 border-amber-500/40' : ''}`}>
          ▼
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 border-t border-[var(--sketch-border)] bg-[var(--sketch-bg)]/50">
          <div className="sketch-border bg-[var(--sketch-bg-dim)] p-4 rounded-xl flex items-start gap-3 mt-2">
            <span className="text-2xl select-none">💡</span>
            <div className="flex-1">
              <div className="font-header font-bold text-sm text-[var(--sketch-accent-orange)] mb-1">
                Hint & Interview Approach:
              </div>
              <p className="text-base text-[var(--sketch-text)] leading-relaxed font-sketch">
                {hint}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import VisualizerSidebar from './VisualizerSidebar';
import LogicSection from './LogicSection';

export default function DSAVisualizerPage({ topicId }) {
  const normalizedTopicId = topicId === 'heaps' ? 'heap' : topicId;
  const topic = DSA_TOPICS[topicId] || DSA_TOPICS[normalizedTopicId];
  const VisualizerComponent = VISUALIZER_MAP[topicId] || VISUALIZER_MAP[normalizedTopicId];
  const [activeSection, setActiveSection] = useState('visualizer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  // NOTE: there was a `loading` state here, initialised to true and cleared by a
  // 300ms setTimeout inside useEffect. Effects never run during SSR, so the
  // server-rendered HTML for every /visualizer/* route was the skeleton and
  // nothing else — no headings, no copy, no internal links for a crawler to
  // read. Nothing on this component is async (DSA_TOPICS and VISUALIZER_MAP are
  // static imports), so the skeleton was purely decorative and is now gone.
  // Do not reintroduce a mount-gated placeholder here without an SSR fallback.

  // Keyboard shortcut (Ctrl+B, Cmd+B, or \) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      } else if (e.key === '\\' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sketch">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold font-header text-[var(--sketch-text)] mb-2">Topic Not Found</h1>
        <p className="text-[var(--sketch-text-muted)] mb-6">The visualizer you're looking for doesn't exist yet.</p>
        <a href={`${base}visualizer`} className="sketch-button inline-flex items-center gap-2 px-6 py-3 font-bold bg-amber-500/20 border-amber-500">
          ← Back to Visualizers Hub
        </a>
      </div>
    );
  }

  const sections = [
    { id: 'visualizer', label: 'Visualizer', icon: '🎨' },
    { id: 'logic', label: 'Core Logic & Breakdown', icon: '🧠' },
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'complexity', label: 'Complexity', icon: '⚡' },
    { id: 'code', label: 'Code Examples', icon: '💻' },
    { id: 'questions', label: 'Interview Questions', icon: '🎯' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--sketch-bg)] font-sketch">
      {/* Inert unless the URL carries ?record=1 — see RecorderBridge. */}
      <RecorderBridge topicId={topicId} />

      {/* Left Navigation Sidebar */}
      <VisualizerSidebar activeTopicId={topicId} currentBase={base} isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((prev) => !prev)} />

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-8 min-w-0 transition-all">
        {/* Header Bar with Sidebar Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <a
              href={`${base}visualizer`}
              className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--sketch-text-muted)] hover:text-[var(--sketch-text)] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              Back to Visualizers Hub
            </a>

            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="sketch-button text-xs flex items-center gap-2 font-sketch"
              title="Toggle sidebar (Ctrl+B or \)"
            >
              <span>{isSidebarOpen ? '◀ Hide Sidebar' : '▶ Show Sidebar'}</span>
              <span className="font-mono text-[10px] opacity-60 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">Ctrl+B</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{topic.icon}</span>
            <h1 className="text-3xl md:text-4xl font-bold font-header text-[var(--sketch-text)]">{topic.title}</h1>
          </div>
          <p className="text-[var(--sketch-text-muted)] text-base max-w-3xl leading-relaxed">{topic.description}</p>
        </div>

        {/* Chalkboard Sketch Section Navigation Bar */}
        <div className="sketch-border bg-[var(--sketch-bg-dim)] p-2 rounded-2xl shadow-xl flex items-center justify-start md:justify-center gap-2 overflow-x-auto mb-8 sketch-no-scrollbar">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--sketch-accent-orange)] text-white shadow-lg shadow-orange-500/30 scale-[1.03] border-2 border-amber-400 font-header font-bold text-base'
                    : 'text-[var(--sketch-text-muted)] hover:text-[var(--sketch-text)] hover:bg-white/5 font-hand text-lg'
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Visualizer Section */}
        {activeSection === 'visualizer' && (
          <div className="mb-10">
            {topicId === 'two-pointers' || topicId === 'sliding-window' || topicId === 'backtracking' || topicId === 'arrays' || topicId === 'sorting' || topicId === 'searching' || topicId === 'linked-list' || topicId === 'trees' || topicId === 'graphs' || topicId === 'stack' || topicId === 'queue' || topicId === 'heaps' || topicId === 'recursion' || topicId === 'dp' || topicId === 'hash-table' || topicId === 'hash-tables' ? (
              <VisualizerComponent />
            ) : (
              <div className="sketch-border bg-[var(--sketch-bg-dim)] p-8 rounded-2xl text-center shadow-xl">
                {VisualizerComponent ? (
                  <VisualizerComponent />
                ) : (
                  <div className="py-16 text-center font-sketch">
                    <div className="text-5xl mb-3">🚧</div>
                    <p className="text-2xl font-header text-[var(--sketch-text)]">Visualizer Coming Soon</p>
                    <p className="text-[var(--sketch-text-muted)] text-base mt-1">This algorithm module is currently under active development.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Dedicated Core Logic Section */}
        {activeSection === 'logic' && (
          <div className="mb-10">
            <LogicSection topicId={topicId} />
          </div>
        )}

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl shadow-md">
                <h3 className="text-2xl font-bold font-header text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
                  <span>💡</span> What is it?
                </h3>
                <p className="text-[var(--sketch-text)] text-lg leading-relaxed">{topic.overview.what}</p>
              </div>

              <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl shadow-md">
                <h3 className="text-2xl font-bold font-header text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
                  <span>🎯</span> Why is it used?
                </h3>
                <p className="text-[var(--sketch-text)] text-lg leading-relaxed">{topic.overview.why}</p>
              </div>
            </div>

            <Section title="Real-World Applications" icon="🌐">
              <div className="grid md:grid-cols-2 gap-4">
                {topic.overview.examples.map((ex, i) => (
                  <div key={i} className="sketch-border bg-[var(--sketch-bg-dim)] p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:scale-[1.01] transition-transform">
                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 font-header font-bold text-lg flex items-center justify-center border border-amber-500/40">
                      #{i + 1}
                    </span>
                    <p className="text-[var(--sketch-text)] text-base leading-relaxed pt-1">{ex}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="sketch-border bg-emerald-500/10 border-emerald-500/30 p-6 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold font-header text-emerald-500 mb-4 flex items-center gap-2">
                  <span>✓</span> Key Advantages
                </h3>
                <div className="space-y-3">
                  {topic.overview.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-3 text-base text-[var(--sketch-text)]">
                      <span className="text-emerald-500 font-bold text-lg">✓</span>
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sketch-border bg-rose-500/10 border-rose-500/30 p-6 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold font-header text-rose-500 mb-4 flex items-center gap-2">
                  <span>✗</span> Trade-offs & Limitations
                </h3>
                <div className="space-y-3">
                  {topic.overview.disadvantages.map((dis, i) => (
                    <div key={i} className="flex items-start gap-3 text-base text-[var(--sketch-text)]">
                      <span className="text-rose-500 font-bold text-lg">✗</span>
                      <span>{dis}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complexity Section */}
        {activeSection === 'complexity' && (
          <Section title="Time & Space Complexity" icon="⚡">
            <ComplexityTable data={topic.complexity} />
            <p className="mt-4 text-xs font-mono text-[var(--sketch-text-muted)] italic">
              * Note: Complexities represent standard average cases. Worst-case bounds may vary depending on implementation (e.g., unbalanced BST degradation to O(n)).
            </p>
          </Section>
        )}

        {/* Code Section */}
        {activeSection === 'code' && (
          <Section title="Multi-Language Implementation Studio" icon="💻">
            <CodeTabs code={topic.code} />
          </Section>
        )}

        {/* Interview Questions Section */}
        {activeSection === 'questions' && (
          <Section title="Top Interview Questions & Problem Patterns" icon="🎯">
            <p className="text-base text-[var(--sketch-text-muted)] mb-5">
              Select a question to reveal strategic interview hints, algorithm patterns, and optimal approaches.
            </p>
            <div className="space-y-3">
              {topic.interviewQuestions.map((q, i) => (
                <AccordionItem
                  key={i}
                  index={i}
                  question={q.question}
                  difficulty={q.difficulty}
                  hint={q.hint}
                />
              ))}
            </div>
          </Section>
        )}

        {/*
          Reference article. Hidden on the 'visualizer' tab so the animation has
          the screen to itself; shown under every other section.

          Hidden with CSS rather than `activeSection !== 'visualizer' && ...`
          on purpose: 'visualizer' is the default tab, so it is what renders on
          the server. Conditional rendering would strip the article from the
          served HTML and take these pages back to ~200 crawlable words. Kept in
          the DOM, it stays indexable and the FAQPage schema keeps matching real
          on-page content, while readers on the visualizer tab don't see it.
        */}
        <div className={activeSection === 'visualizer' ? 'hidden' : ''}>
          <VisualizerArticle topicId={topicId} />
        </div>
      </div>
    </div>
  );
}
