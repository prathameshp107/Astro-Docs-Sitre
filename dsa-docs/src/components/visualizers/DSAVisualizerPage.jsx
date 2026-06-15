import { useState, useEffect } from 'react';
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

const VISUALIZER_MAP = {
  arrays: ArrayVisualizer,
  sorting: SortingVisualizer,
  trees: TreeVisualizer,
  graphs: GraphVisualizer,
  stack: StackVisualizer,
  queue: QueueVisualizer,
  'linked-list': LinkedListVisualizer,
  heap: HeapVisualizer,
  recursion: RecursionVisualizer,
  dp: DPVisualizer,
  searching: SearchingVisualizer,
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

function Section({ title, children, className = '' }) {
  const [setRef, inView] = useInView(0.1);
  return (
    <section
      ref={setRef}
      className={`mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function AccordionItem({ question, difficulty, hint, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const diffColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="border border-[var(--mcq-border)] rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-3">
          <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${diffColors[difficulty] || diffColors.Medium}`}>
            {difficulty}
          </span>
          <span className="text-[var(--mcq-text)] font-medium">{question}</span>
        </span>
        <svg
          className={`w-4 h-4 text-[var(--mcq-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 border-t border-[var(--mcq-border)]">
          <div className="flex items-start gap-2 mt-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 text-xs font-bold">!</span>
            <p className="text-sm text-[var(--mcq-text-secondary)] leading-relaxed">{hint}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DSAVisualizerPage({ topicId }) {
  const topic = DSA_TOPICS[topicId];
  const VisualizerComponent = VISUALIZER_MAP[topicId];
  const [activeSection, setActiveSection] = useState('visualizer');
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-2">Topic Not Found</h1>
        <p className="text-[var(--mcq-text-muted)] mb-6">The visualizer you're looking for doesn't exist yet.</p>
        <a href={`${base}visualizer`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          ← Back to Visualizers
        </a>
      </div>
    );
  }

  const sections = [
    { id: 'visualizer', label: 'Visualizer' },
    { id: 'overview', label: 'Overview' },
    { id: 'complexity', label: 'Complexity' },
    { id: 'code', label: 'Code Examples' },
    { id: 'questions', label: 'Interview Questions' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <a
          href={`${base}visualizer`}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--mcq-text-muted)] hover:text-white transition-colors mb-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          Back to Visualizers
        </a>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{topic.icon}</span>
          <h1 className="text-3xl font-bold text-white">{topic.title}</h1>
        </div>
        <p className="text-[var(--mcq-text-secondary)] max-w-2xl">{topic.description}</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 mb-8 p-1 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)] overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeSection === s.id
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'text-[var(--mcq-text-muted)] hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Visualizer Section */}
      {activeSection === 'visualizer' && (
        <Section title="Interactive Visualizer">
          <div className="p-5 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)]">
            {VisualizerComponent ? (
              <VisualizerComponent />
            ) : (
              <div className="py-16 text-center">
                <div className="text-4xl mb-3">🚧</div>
                <p className="text-[var(--mcq-text-muted)] text-lg">Visualizer coming soon</p>
                <p className="text-[var(--mcq-text-muted)] text-sm mt-1">This visualizer is under development.</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <>
          <Section title="What is it?">
            <p className="text-[var(--mcq-text-body)] leading-relaxed">{topic.overview.what}</p>
          </Section>

          <Section title="Why is it used?">
            <p className="text-[var(--mcq-text-body)] leading-relaxed">{topic.overview.why}</p>
          </Section>

          <Section title="Real-World Examples">
            <div className="grid md:grid-cols-2 gap-3">
              {topic.overview.examples.map((ex, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)]">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm font-bold">{i + 1}</span>
                  <p className="text-[var(--mcq-text-body)] text-sm">{ex}</p>
                </div>
              ))}
            </div>
          </Section>

          <div className="grid md:grid-cols-2 gap-4">
            <Section title="Advantages">
              <div className="space-y-2">
                {topic.overview.advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span className="text-sm text-[var(--mcq-text-body)]">{adv}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Disadvantages">
              <div className="space-y-2">
                {topic.overview.disadvantages.map((dis, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span className="text-sm text-[var(--mcq-text-body)]">{dis}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </>
      )}

      {/* Complexity Section */}
      {activeSection === 'complexity' && (
        <Section title="Time & Space Complexity">
          <ComplexityTable data={topic.complexity} />
          <p className="mt-3 text-xs text-[var(--mcq-text-muted)]">* Average case. Worst case may differ (e.g., BST worst case O(n) if unbalanced).</p>
        </Section>
      )}

      {/* Code Section */}
      {activeSection === 'code' && (
        <Section title="Code Examples">
          <CodeTabs code={topic.code} />
        </Section>
      )}

      {/* Interview Questions Section */}
      {activeSection === 'questions' && (
        <Section title="Interview Questions">
          <p className="text-sm text-[var(--mcq-text-muted)] mb-4">Click a question to reveal hints and solution approaches.</p>
          <div className="space-y-2">
            {topic.interviewQuestions.map((q, i) => (
              <AccordionItem
                key={i}
                question={q.question}
                difficulty={q.difficulty}
                hint={q.hint}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
