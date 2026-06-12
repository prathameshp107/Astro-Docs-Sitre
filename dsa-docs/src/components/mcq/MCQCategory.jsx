import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { motion } from 'framer-motion';
import { MCQ_CATEGORIES, getTopicsForCategory, getQuestionsForCategory } from './MCQData.js';
import { getInitialProgress, getCategoryAccuracy, getTopicAccuracy } from './MCQStore.js';

function useMCQTheme() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const html = document.documentElement;
    const update = () => setIsDark(html.getAttribute('data-theme') !== 'light');
    update();
    const obs = new MutationObserver(update);
    obs.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

export default function MCQCategory({ categoryId }) {
  const [progress, setProgress] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const cat = MCQ_CATEGORIES.find(c => c.id === categoryId);
  const topics = cat ? getTopicsForCategory(categoryId) : [];
  const questions = cat ? getQuestionsForCategory(categoryId) : [];

  useEffect(() => {
    setLoaded(true);
    setProgress(getInitialProgress());
  }, [categoryId]);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  if (!cat) {
    return (
      <div className="min-h-screen bg-[var(--mcq-bg)] flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-2xl font-bold text-[var(--mcq-text-primary)] mb-2">Category Not Found</h1>
          <p className="text-[var(--mcq-text-secondary)] mb-6">The category you're looking for doesn't exist.</p>
          <a href={`${base}mcq`} className="mcq-btn-primary">Back to MCQ Hub</a>
        </div>
      </div>
    );
  }

  const catProgress = progress?.categoryProgress[categoryId];
  const accuracy = progress ? getCategoryAccuracy(progress, categoryId) : 0;
  const answered = catProgress?.answered || 0;

  return (
    <div className={`min-h-screen bg-[var(--mcq-bg)] text-[var(--mcq-text)] ${loaded ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute bottom-[-10px] rounded-full bg-gradient-to-br from-blue-500/30 to-emerald-400/15 animate-[particleRise_linear_infinite]"
            style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${6 + Math.random() * 8}s`, width: `${2 + Math.random() * 4}px`, height: `${2 + Math.random() * 4}px` }} />
        ))}
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[var(--mcq-nav-bg)] backdrop-blur-xl border-b border-[var(--mcq-border)]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href={`${base}mcq`} className="flex items-center gap-2 text-[var(--mcq-text-secondary)] hover:text-[var(--mcq-text-primary)] transition-colors no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            <span className="text-sm font-medium">Back</span>
          </a>
          <div className="flex items-center gap-3">
            {progress && <span className="text-xs text-[var(--mcq-text-muted)]">Level {progress.level} · {progress.xp} XP</span>}
            <a href={`${base}practice`} className="mcq-btn-ghost text-sm">Labs</a>
            <a href={`${base}overview`} className="mcq-btn-ghost text-sm">Docs</a>
            <a href={`${base}mcq/dashboard`} className="mcq-btn-ghost text-sm">Dashboard</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative z-10 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border flex-shrink-0"
              style={{ background: `${cat.color}15`, borderColor: `${cat.color}30` }}>
              {cat.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold border"
                  style={{ background: `${cat.color}15`, color: cat.color, borderColor: `${cat.color}25` }}>
                  {cat.questionCount} Questions
                </span>
                <div className="flex gap-1">
                  {cat.difficulties.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded text-[0.6rem] font-medium bg-[var(--mcq-surface-20)] text-[var(--mcq-text-muted)]">{d}</span>
                  ))}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-[var(--mcq-text-primary)] mb-2">{cat.name}</h1>
              <p className="text-sm text-[var(--mcq-text-secondary)] max-w-xl">{cat.description}</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href={`${base}mcq/quiz/${categoryId}`} className="mcq-btn-primary">
                {answered > 0 ? 'Continue Quiz' : 'Start Quiz'}
              </a>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Questions', value: cat.questionCount, color: cat.color },
              { label: 'Completed', value: `${answered}/${cat.questionCount}`, color: cat.color },
              { label: 'Accuracy', value: `${accuracy}%`, color: accuracy >= 80 ? '#22c55e' : accuracy >= 50 ? '#f59e0b' : '#ef4444' },
              { label: 'Topics', value: topics.length, color: cat.color },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] backdrop-blur-sm">
                <span className="text-lg font-extrabold text-[var(--mcq-text-primary)] block" style={{ color: s.color }}>{s.value}</span>
                <span className="text-[0.65rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Topics */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-lg font-semibold text-[var(--mcq-text-primary)] mb-5">Topics Covered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.map((topic, i) => {
            const tAccuracy = progress ? getTopicAccuracy(progress, categoryId, topic.name) : 0;
            return (
              <motion.a
                key={topic.name}
                href={`${base}mcq/quiz/${categoryId}?topic=${encodeURIComponent(topic.name)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3.5 rounded-lg border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] hover:bg-[var(--mcq-surface-hover)] hover:border-blue-400/15 transition-all duration-200 no-underline group"
              >
                <span className="text-lg">{topic.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--mcq-text-primary)] truncate">{topic.name}</h4>
                  <span className="text-[0.65rem] text-[var(--mcq-text-muted)]">{topic.count} questions</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-semibold" style={{ color: tAccuracy >= 80 ? '#22c55e' : tAccuracy >= 50 ? '#f59e0b' : '#64748b' }}>
                    {tAccuracy > 0 ? `${tAccuracy}%` : ''}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--mcq-border)] py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-[var(--mcq-text-muted)]">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
          <div className="flex gap-4">
            <a href={`${base}mcq`} className="hover:text-blue-400 transition-colors">All Categories</a>
            <a href={`${base}mcq/dashboard`} className="hover:text-blue-400 transition-colors">Dashboard</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
