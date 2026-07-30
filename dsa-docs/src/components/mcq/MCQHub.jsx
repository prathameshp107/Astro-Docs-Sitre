import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton, { SkeletonStats, SkeletonGrid } from '../Skeleton.jsx';
import { MCQ_CATEGORIES, getQuestionsForCategory } from './MCQData.js';
import { getInitialProgress, getAccuracy, getCategoryAccuracy, getStreakInfo } from './MCQStore.js';
import CommandPalette from './CommandPalette.jsx';
import { CategoryIcon, CATEGORY_ICONS } from './CategoryIcons.jsx';
import '../../styles/sketch-visualizer.css';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function ProgressRing({ value, size = 44, color = '#2563eb' }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="mcq-progress-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="mcq-progress-ring-track" cx={size/2} cy={size/2} r={r} />
        <circle
          className="mcq-progress-ring-fill"
          cx={size/2} cy={size/2} r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={value > 0 ? offset : circ}
        />
      </svg>
      <div className="mcq-progress-ring-label">{value > 0 ? `${value}%` : ''}</div>
    </div>
  );
}

export default function MCQHub() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [showCmd, setShowCmd] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoaded(true);
    setProgress(getInitialProgress());
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  // Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCmd(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const accuracy = progress ? getAccuracy(progress) : 0;
  const streak = progress ? getStreakInfo(progress) : { current: 0, best: 0 };
  const totalQuestions = MCQ_CATEGORIES.reduce((sum, c) => sum + getQuestionsForCategory(c.id).length, 0);

  // Last used category (continue banner)
  const lastCategoryId = progress
    ? Object.entries(progress.categoryProgress || {}).sort(([,a], [,b]) => (b.lastActive || 0) - (a.lastActive || 0))[0]?.[0]
    : null;
  const lastCategory = lastCategoryId ? MCQ_CATEGORIES.find(c => c.id === lastCategoryId) : null;

  // Filter categories by search
  const filteredCategories = searchQuery.trim()
    ? MCQ_CATEGORIES.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MCQ_CATEGORIES;

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', padding: '80px 24px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Skeleton variant="badge" width="160px" height="28px" style={{ margin: '0 auto 16px' }} />
            <Skeleton variant="text" width="60%" height="48px" style={{ margin: '0 auto 12px' }} />
            <Skeleton variant="text" width="40%" height="16px" style={{ margin: '0 auto 32px' }} />
          </div>
          <SkeletonStats count={5} />
          <SkeletonGrid count={9} variant="card" columns={3} cardHeight="220px" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)' }}>
      {/* Animated Background Orbs */}
      <div className="mcq-orb-container" aria-hidden>
        <div className="mcq-orb mcq-orb-1" />
        <div className="mcq-orb mcq-orb-2" />
        <div className="mcq-orb mcq-orb-3" />
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {showCmd && <CommandPalette base={base} onClose={() => setShowCmd(false)} />}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-16 pb-6 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mcq-hero-badge">
              <span className="mcq-hero-pulse" />
              Interactive MCQ Hub
            </div>

            <h1 className="mcq-hero-title">
              Master Dev Concepts{' '}
              <span className="mcq-hero-gradient-text">Through Quizzes</span>
            </h1>

            <p className="text-base max-w-lg mx-auto leading-relaxed mb-8" style={{ color: 'var(--mcq-text-secondary)' }}>
              {totalQuestions.toLocaleString()}+ curated questions across 15 technologies. Practice, assess, and ace your interviews.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href="#categories" className="mcq-btn-primary text-sm px-5 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Start Learning
              </a>
              <button
                onClick={() => setShowCmd(true)}
                className="mcq-btn-secondary text-sm px-5 py-2.5 flex items-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Search
                <span style={{ fontSize: '0.6rem', background: 'var(--mcq-surface-20)', border: '1px solid var(--mcq-border)', borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace' }}>
                  ⌘K
                </span>
              </button>
              <a href={`${base}mcq/dashboard`} className="mcq-btn-secondary text-sm px-5 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                Dashboard
              </a>
            </div>

            {/* Stats ticker */}
            <div className="mcq-stats-ticker max-w-3xl mx-auto">
              {[
                { value: MCQ_CATEGORIES.length, label: 'Categories' },
                { value: totalQuestions.toLocaleString(), label: 'Questions' },
                { value: progress?.totalAnswered || 0, label: 'Answered' },
                { value: `${accuracy}%`, label: 'Accuracy' },
                { value: streak.current > 0 ? `🔥 ${streak.current}` : `Lv.${progress?.level || 1}`, label: streak.current > 0 ? 'Streak' : 'Level' },
              ].map(s => (
                <div key={s.label} className="mcq-stats-ticker-item">
                  <span className="mcq-stats-ticker-value">{s.value}</span>
                  <span className="mcq-stats-ticker-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Tech pills with real brand icons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '20px', maxWidth: '680px', margin: '16px auto 0' }}>
              {[
                { id: 'javascript', label: 'JavaScript' },
                { id: 'react', label: 'React' },
                { id: 'typescript', label: 'TypeScript' },
                { id: 'python', label: 'Python' },
                { id: 'nodejs', label: 'Node.js' },
                { id: 'css', label: 'CSS' },
                { id: 'git', label: 'Git' },
                { id: 'mongodb', label: 'MongoDB' },
                { id: 'system-design', label: 'System Design' },
              ].map(({ id, label }) => (
                <a key={id} href={`${base}mcq/${id}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 12px', borderRadius: 999,
                    border: '1px solid var(--mcq-border)',
                    background: 'var(--mcq-surface-20)', color: 'var(--mcq-text-secondary)',
                    fontSize: '0.72rem', fontWeight: 500, textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                  className="hover:border-[var(--mcq-border-hover)] hover:text-[var(--mcq-text-primary)]"
                >
                  <CategoryIcon categoryId={id} size={12} />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ── Continue Banner ── */}
      {lastCategory && progress?.categoryProgress[lastCategoryId]?.answered > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-6xl mx-auto px-6 mb-6"
        >
          <div className="mcq-continue-banner">
            <div className="flex items-center gap-3 min-w-0">
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{lastCategory.icon}</span>
              <div className="min-w-0">
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mcq-text-primary)' }}>
                  Continue: {lastCategory.name}
                </p>
                <p style={{ fontSize: '0.65rem', color: 'var(--mcq-text-muted)' }}>
                  {progress.categoryProgress[lastCategoryId]?.answered} questions answered
                </p>
              </div>
            </div>
            <a href={`${base}mcq/quiz/${lastCategoryId}`} className="mcq-btn-primary text-xs px-4 py-1.5 whitespace-nowrap flex-shrink-0">
              Resume →
            </a>
          </div>
        </motion.div>
      )}

      {/* ── Category Grid ── */}
      <section id="categories" className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--mcq-text-primary)' }}>Choose Your Path</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--mcq-text-secondary)' }}>
              {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} available
            </p>
          </div>
          <div className="relative" style={{ minWidth: '220px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mcq-text-muted)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="mcq-search-input"
              placeholder="Filter categories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mcq-bento-grid"
        >
          {filteredCategories.map(cat => {
            const catProgress = progress?.categoryProgress[cat.id];
            const catAccuracy = catProgress ? getCategoryAccuracy(progress, cat.id) : 0;
            const qCount = getQuestionsForCategory(cat.id).length;
            const answered = catProgress?.answered || 0;
            const masteryTier =
              catAccuracy >= 90 ? 'mastered' :
              catAccuracy >= 60 ? 'proficient' :
              answered > 0 ? 'learning' : 'new';
            const masteryLabel =
              masteryTier === 'mastered' ? '★ Mastered' :
              masteryTier === 'proficient' ? '✓ Proficient' :
              masteryTier === 'learning' ? '⚡ Learning' : 'New';

            return (
              <motion.a
                key={cat.id}
                href={`${base}mcq/${cat.id}`}
                variants={cardVariants}
                className="mcq-bento-card"
                style={{
                  '--card-color': cat.color,
                  '--card-color-border': `${cat.color}40`,
                  '--card-color-bg': `${cat.color}12`,
                  '--card-color-glow': `${cat.color}10`,
                  textDecoration: 'none',
                }}
              >
                {/* Header row */}
                <div className="mcq-bento-header">
                  <div className="mcq-bento-icon-wrap"
                    style={{ background: `${cat.color}15`, borderColor: `${cat.color}25` }}>
                    <CategoryIcon categoryId={cat.id} size={24} />
                  </div>
                  <ProgressRing value={catAccuracy} color={cat.color} />
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--mcq-text-primary)', lineHeight: 1.2 }}>
                      {cat.name}
                    </h3>
                    <span className={`mastery-badge ${masteryTier}`}>{masteryLabel}</span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--mcq-text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                    {cat.description}
                  </p>

                  {/* Difficulty tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {cat.difficulties.map(d => (
                      <span key={d} style={{
                        padding: '2px 7px', borderRadius: 999, fontSize: '0.58rem', fontWeight: 600,
                        background: 'var(--mcq-surface-20)', color: 'var(--mcq-text-muted)',
                        border: '1px solid var(--mcq-border)',
                      }}>{d}</span>
                    ))}
                  </div>
                </div>

                {/* Progress bar + footer */}
                <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--mcq-text-muted)', fontWeight: 500 }}>
                      {answered}/{qCount} questions
                    </span>
                    {answered > 0 && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: cat.color }}>{catAccuracy}%</span>
                    )}
                  </div>
                  <div style={{ height: '3px', borderRadius: 999, background: 'var(--mcq-border)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 999, transition: 'width 0.6s ease',
                      width: `${answered > 0 ? Math.max(2, (answered / qCount) * 100) : 0}%`,
                      background: `linear-gradient(90deg, ${cat.color}, ${cat.color}90)`,
                    }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--mcq-border)' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#2563eb' }}>
                      {answered > 0 ? 'Continue →' : 'Start Quiz →'}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--mcq-text-muted)' }}>{qCount} Q</span>
                  </div>
                </div>
              </motion.a>
            );
          })}

          {filteredCategories.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--mcq-text-muted)' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🔍</span>
              <p>No categories match "<strong>{searchQuery}</strong>"</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16 max-w-6xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">❓</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                MCQ Practice & Developer Quiz Studio
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Master programming concepts through interactive multiple-choice quizzes across 15 developer topics with instant feedback, streak counters, and performance analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-sm font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-sm font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[var(--sketch-border)]">
          {/* Column 1: Frontend MCQ */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <CategoryIcon categoryId="react" size={18} /> Frontend Quizzes
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}mcq/javascript`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="javascript" size={15} /> JavaScript Quizzes
                </a>
              </li>
              <li>
                <a href={`${base}mcq/react`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="react" size={15} /> React Quizzes
                </a>
              </li>
              <li>
                <a href={`${base}mcq/typescript`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="typescript" size={15} /> TypeScript Quizzes
                </a>
              </li>
              <li>
                <a href={`${base}mcq/css`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="css" size={15} /> CSS Quizzes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Backend & Languages */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <CategoryIcon categoryId="python" size={18} /> Backend & Core
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}mcq/nodejs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="nodejs" size={15} /> Node.js Quizzes
                </a>
              </li>
              <li>
                <a href={`${base}mcq/python`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="python" size={15} /> Python Quizzes
                </a>
              </li>
              <li>
                <a href={`${base}mcq/system-design`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="system-design" size={15} /> System Design
                </a>
              </li>
              <li>
                <a href={`${base}mcq/git`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="git" size={15} /> Git Quizzes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Databases & Tools */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <CategoryIcon categoryId="mongodb" size={18} /> DB & DevOps
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}mcq/mongodb`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="mongodb" size={15} /> MongoDB Quizzes
                </a>
              </li>
              <li>
                <a href={`${base}mcq/sql`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="sql" size={15} /> SQL Quizzes
                </a>
              </li>
              <li>
                <a href={`${base}mcq/docker`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <CategoryIcon categoryId="docker" size={15} /> Docker Quizzes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Navigation */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🚀</span> Visualizers & Labs
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}visualizer`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Visualizer Studio
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Interview Questions Hub
                </a>
              </li>
              <li>
                <a href={`${base}labs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Practice Labs Hub
                </a>
              </li>
              <li>
                <a href={`${base}mcq/dashboard`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> MCQ Analytics Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Design Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} MCQ Quiz Studio · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {MCQ_CATEGORIES.length} Topic Categories Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
