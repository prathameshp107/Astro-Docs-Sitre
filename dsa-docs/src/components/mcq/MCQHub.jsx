import { useState, useEffect } from 'react';
import Skeleton, { SkeletonStats, SkeletonGrid } from '../Skeleton.jsx';
import { FiArrowRight, FiBarChart2 } from "react-icons/fi";

import { motion } from 'framer-motion';
import { MCQ_CATEGORIES } from './MCQData.js';
import { getInitialProgress, getAccuracy, getCategoryAccuracy, getStreakInfo } from './MCQStore.js';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
};

export default function MCQHub() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    setLoaded(true);
    setProgress(getInitialProgress());
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const accuracy = progress ? getAccuracy(progress) : 0;
  const streak = progress ? getStreakInfo(progress) : { current: 0, best: 0 };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)', padding: '80px 24px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hero skeleton */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Skeleton variant="badge" width="160px" height="28px" style={{ margin: '0 auto 16px' }} />
            <Skeleton variant="text" width="60%" height="40px" style={{ margin: '0 auto 12px' }} />
            <Skeleton variant="text" width="40%" height="16px" style={{ margin: '0 auto 32px' }} />
          </div>
          {/* Stats skeleton */}
          <SkeletonStats count={5} />
          {/* Category cards skeleton */}
          <SkeletonGrid count={9} variant="card" columns={3} cardHeight="220px" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)' }}>
      {/* Hero */}
      <section className="relative z-10 pt-16 pb-8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'var(--mcq-border)', background: 'var(--mcq-surface)', color: 'var(--mcq-text-muted)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563eb' }} />
              Interactive Quizzes
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-[-0.02em] max-w-4xl mx-auto mb-4"
              style={{ color: 'var(--mcq-text-primary)' }}>
              Master Programming Concepts{' '}
              <span style={{ color: '#2563eb' }}>Through Interactive Quizzes</span>
            </h1>

            <p className="text-lg max-w-xl mx-auto leading-relaxed mb-8"
              style={{ color: 'var(--mcq-text-secondary)' }}>
              Test your knowledge. Track your progress. Prepare for interviews with thousands of curated questions across 14+ technologies.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a href="#categories" className="mcq-btn-primary text-base px-6 py-3">
                Start Learning
                <FiArrowRight size={16} />
              </a>
              <a href={`${base}mcq/dashboard`} className="mcq-btn-secondary text-base px-6 py-3">
                <FiBarChart2 size={16} />
                View Dashboard
              </a>
            </div>

            {/* Topic pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-2xl mx-auto">
              {['JavaScript','React','TypeScript','Python','SQL','CSS','Git','DSA','System Design'].map((t, i) => (
                <span key={t} className="px-3 py-1 rounded-full border text-xs font-medium transition-all"
                  style={{
                    borderColor: 'var(--mcq-border)',
                    background: 'var(--mcq-surface)',
                    color: 'var(--mcq-text-muted)',
                    animationDelay: `${0.8 + i * 0.06}s`,
                    animation: 'fadeUp 0.4s ease both',
                  }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      {progress && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10 max-w-6xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-center gap-0 rounded-xl border p-4"
            style={{ borderColor: 'var(--mcq-border)', background: 'var(--mcq-surface)' }}>
            {[
              { value: MCQ_CATEGORIES.length, label: 'Categories' },
              { value: progress.totalAnswered, label: 'Answered' },
              { value: `${accuracy}%`, label: 'Accuracy' },
              { value: `${progress.xp}`, label: 'XP' },
              { value: `Lv.${progress.level}`, label: 'Level' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center px-4 sm:px-6">
                <span className="text-lg font-extrabold" style={{ color: 'var(--mcq-text-primary)' }}>{s.value}</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider mt-0.5" style={{ color: 'var(--mcq-text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Categories Grid */}
      <section id="categories" className="relative z-10 max-w-6xl mx-auto px-6 py-8 mb-16">
        <div className="mcq-section-header">
          <span className="mcq-section-tag">Categories</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--mcq-text-primary)' }}>Choose Your Path</h2>
          <p className="max-w-md mx-auto" style={{ color: 'var(--mcq-text-secondary)' }}>Browse all technology categories and start testing your knowledge.</p>
        </div>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MCQ_CATEGORIES.map((cat) => {
            const catProgress = progress?.categoryProgress[cat.id];
            const catAccuracy = catProgress ? getCategoryAccuracy(progress, cat.id) : 0;
            return (
              <motion.a
                key={cat.id}
                href={`${base}mcq/${cat.id}`}
                variants={cardVariants}
                className="group relative flex flex-col p-5 rounded-xl border transition-all duration-200 hover:-translate-y-1 overflow-hidden no-underline"
                style={{
                  borderColor: cat.borderColor || 'var(--mcq-border)',
                  background: 'var(--mcq-surface)',
                }}
              >
                <div className="flex items-center justify-between mb-3 relative z-[1]">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold border"
                    style={{ background: `${cat.color}15`, color: cat.color, borderColor: `${cat.color}25` }}>
                    {cat.questionCount} Q
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-1.5 relative z-[1]" style={{ color: 'var(--mcq-text-primary)' }}>{cat.name}</h3>
                <p className="text-xs leading-relaxed mb-3 relative z-[1] line-clamp-2" style={{ color: 'var(--mcq-text-secondary)' }}>{cat.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3 relative z-[1]">
                  {cat.difficulties.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded text-[0.6rem] font-medium"
                      style={{ background: 'var(--mcq-surface)', color: 'var(--mcq-text-muted)' }}>{d}</span>
                  ))}
                </div>

                <div className="mt-auto relative z-[1]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[0.65rem] font-medium uppercase tracking-wider" style={{ color: 'var(--mcq-text-muted)' }}>
                      {catProgress ? `${catProgress.answered}/${cat.questionCount}` : '0/' + cat.questionCount}
                    </span>
                    <span className="text-[0.65rem] font-semibold" style={{ color: cat.color }}>
                      {catAccuracy}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--mcq-border)' }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${catAccuracy}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)` }} />
                  </div>
                </div>

                <div className="relative z-[1] mt-3 pt-3 border-t flex items-center justify-between"
                  style={{ borderColor: 'var(--mcq-border)' }}>
                  <span className="text-xs font-medium transition-colors" style={{ color: '#2563eb' }}>
                    {catProgress ? 'Continue →' : 'Start Quiz →'}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-6" style={{ borderColor: 'var(--mcq-border)' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs" style={{ color: 'var(--mcq-text-muted)' }}>
          <p>Built by <strong>Prathamesh Pawar</strong></p>
          <div className="flex gap-4">
            <a href={`${base}mcq/dashboard`} className="hover:opacity-80 transition-opacity">Dashboard</a>
            <a href={base} className="hover:opacity-80 transition-opacity">Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
