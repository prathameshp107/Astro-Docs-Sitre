import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Skeleton, { SkeletonGrid } from '../Skeleton.jsx';
import { MCQ_CATEGORIES, getTopicsForCategory, getQuestionsForCategory } from './MCQData.js';
import { getInitialProgress, getCategoryAccuracy, getTopicAccuracy } from './MCQStore.js';
import { CategoryIcon } from './CategoryIcons.jsx';

function ProgressRing({ value, size = 40, color }) {
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle fill="none" stroke="var(--mcq-border)" strokeWidth="3" cx={size/2} cy={size/2} r={r} />
        <circle fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
          cx={size/2} cy={size/2} r={r}
          strokeDasharray={circ}
          strokeDashoffset={value > 0 ? offset : circ}
          style={{ transition: 'stroke-dashoffset 0.7s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.48rem', fontWeight: 800, color: value > 0 ? color : 'var(--mcq-text-muted)',
      }}>
        {value > 0 ? `${value}%` : '—'}
      </div>
    </div>
  );
}

export default function MCQCategory({ categoryId }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTopic, setSearchTopic] = useState('');
  const [selectedMode, setSelectedMode] = useState('practice');

  const cat = MCQ_CATEGORIES.find(c => c.id === categoryId);
  const topics = cat ? getTopicsForCategory(categoryId) : [];
  const questions = cat ? getQuestionsForCategory(categoryId) : [];
  const questionCount = questions.length;

  useEffect(() => {
    setProgress(getInitialProgress());
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [categoryId]);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  const filteredTopics = useMemo(() =>
    searchTopic.trim()
      ? topics.filter(t => t.name.toLowerCase().includes(searchTopic.toLowerCase()))
      : topics,
    [topics, searchTopic]
  );

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', padding: '48px 24px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <Skeleton variant="avatar" size="64px" />
            <div style={{ flex: 1 }}>
              <Skeleton variant="badge" width="100px" height="22px" style={{ marginBottom: '8px' }} />
              <Skeleton variant="text" width="50%" height="32px" style={{ marginBottom: '6px' }} />
              <Skeleton variant="text" width="70%" height="14px" />
            </div>
          </div>
          <SkeletonGrid count={9} variant="topic-card" columns={3} cardHeight="70px" />
        </div>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--mcq-bg)' }}>
        <div className="text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--mcq-text-primary)' }}>Category Not Found</h1>
          <a href={`${base}mcq`} className="mcq-btn-primary mt-4 inline-flex">Back to MCQ Hub</a>
        </div>
      </div>
    );
  }

  const catProgress = progress?.categoryProgress[categoryId];
  const accuracy = progress ? getCategoryAccuracy(progress, categoryId) : 0;
  const answered = catProgress?.answered || 0;
  const masteryTier = accuracy >= 90 ? 'mastered' : accuracy >= 60 ? 'proficient' : answered > 0 ? 'learning' : 'new';

  const modeLabels = { practice: '📝 Practice', assessment: '⏱️ Timed', interview: '🎯 Interview' };

  // Quick-start URL for "Start All" button
  const startAllHref = `${base}mcq/quiz/${categoryId}?mode=${selectedMode}`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)' }}>
      {/* Orbs */}
      <div className="mcq-orb-container" aria-hidden>
        <div className="mcq-orb mcq-orb-1" />
        <div className="mcq-orb mcq-orb-2" />
      </div>

      {/* Header */}
      <section className="relative z-10 pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6" style={{ fontSize: '0.75rem', color: 'var(--mcq-text-muted)' }}>
            <a href={`${base}mcq`} style={{ color: 'var(--mcq-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
              className="hover:text-blue-400 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              MCQ Hub
            </a>
            <span>/</span>
            <span style={{ color: 'var(--mcq-text-primary)', fontWeight: 600 }}>{cat.name}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start gap-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
              <CategoryIcon categoryId={categoryId} size={30} />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span style={{
                  padding: '3px 10px', borderRadius: 999, fontSize: '0.65rem', fontWeight: 600,
                  background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}25`
                }}>{questionCount} Questions</span>
                <span className={`mastery-badge ${masteryTier}`}>
                  {masteryTier === 'mastered' ? '★ Mastered' : masteryTier === 'proficient' ? '✓ Proficient' : masteryTier === 'learning' ? '⚡ Learning' : 'New'}
                </span>
                {cat.difficulties.map(d => (
                  <span key={d} style={{
                    padding: '2px 8px', borderRadius: 999, fontSize: '0.58rem', fontWeight: 600,
                    background: 'var(--mcq-surface-20)', color: 'var(--mcq-text-muted)', border: '1px solid var(--mcq-border)'
                  }}>{d}</span>
                ))}
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--mcq-text-primary)' }}>{cat.name}</h1>
              <p className="text-sm mb-0" style={{ color: 'var(--mcq-text-secondary)', maxWidth: '480px' }}>{cat.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <a href={startAllHref} className="mcq-btn-primary text-sm px-5 py-2.5">
                {answered > 0 ? 'Continue Quiz →' : 'Start All →'}
              </a>
              <a href={`${base}mcq/dashboard`} className="mcq-btn-ghost text-xs text-center" style={{ justifyContent: 'center' }}>
                View Dashboard
              </a>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label: 'Questions', value: questionCount, color: cat.color },
              { label: 'Completed', value: `${answered}/${questionCount}`, color: cat.color },
              { label: 'Accuracy', value: `${accuracy}%`, color: accuracy >= 80 ? '#22c55e' : accuracy >= 50 ? '#f59e0b' : '#ef4444' },
              { label: 'Topics', value: topics.length, color: cat.color },
            ].map(s => (
              <div key={s.label} style={{
                padding: '14px 16px', borderRadius: 14, border: '1px solid var(--mcq-border)',
                background: 'var(--mcq-surface-20)', backdropFilter: 'blur(8px)',
              }}>
                <span className="block text-xl font-extrabold" style={{ color: s.color }}>{s.value}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mcq-text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mode Picker + Topics ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Mode selector */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--mcq-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quiz Mode:</span>
          {Object.entries(modeLabels).map(([key, label]) => (
            <button key={key}
              onClick={() => setSelectedMode(key)}
              className={`mcq-mode-pill ${selectedMode === key ? 'active' : ''}`}>
              {label}
            </button>
          ))}
        </motion.div>

        {/* Search + header */}
        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--mcq-text-primary)' }}>
            Topics Covered
            <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--mcq-text-muted)', marginLeft: 8 }}>
              ({filteredTopics.length}/{topics.length})
            </span>
          </h2>
          <div className="relative" style={{ minWidth: '180px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mcq-text-muted)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="mcq-search-input"
              style={{ padding: '7px 12px 7px 32px', fontSize: '0.75rem' }}
              placeholder="Search topics..."
              value={searchTopic}
              onChange={e => setSearchTopic(e.target.value)}
            />
          </div>
        </div>

        {/* Topics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredTopics.map((topic, i) => {
            const tAccuracy = progress ? getTopicAccuracy(progress, categoryId, topic.name) : 0;
            const topicMastery = tAccuracy >= 90 ? 'mastered' : tAccuracy >= 60 ? 'proficient' : tAccuracy > 0 ? 'learning' : 'new';
            const topicHref = `${base}mcq/quiz/${categoryId}?topic=${encodeURIComponent(topic.name)}&mode=${selectedMode}`;

            return (
              <motion.a
                key={topic.name}
                href={topicHref}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
                className="mcq-topic-card"
                style={{ textDecoration: 'none' }}
              >
                <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{topic.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mcq-text-primary)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {topic.name}
                  </h4>
                  <span style={{ fontSize: '0.62rem', color: 'var(--mcq-text-muted)' }}>{topic.count} questions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  {tAccuracy > 0 && <span className={`mastery-badge ${topicMastery}`} style={{ fontSize: '0.52rem' }}>{tAccuracy}%</span>}
                  <ProgressRing value={tAccuracy} size={34} color={cat.color} />
                </div>
              </motion.a>
            );
          })}
        </div>

        {filteredTopics.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--mcq-text-muted)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🔍</span>
            No topics match "<strong>{searchTopic}</strong>"
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-6" style={{ borderColor: 'var(--mcq-border)' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs" style={{ color: 'var(--mcq-text-muted)' }}>
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
