import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { motion } from 'framer-motion';
import { MCQ_CATEGORIES } from './MCQData.js';
import { getInitialProgress, getAccuracy, getCategoryAccuracy, getStreakInfo, getAllAchievements } from './MCQStore.js';

export default function MCQDashboard() {
  const [progress, setProgress] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const p = getInitialProgress();
    setProgress(p);
  }, []);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  if (!progress) {
    return <div className="min-h-screen bg-[var(--mcq-bg)] flex items-center justify-center">
      <div className="animate-pulse text-[var(--mcq-text-muted)]">Loading...</div>
    </div>;
  }

  const accuracy = getAccuracy(progress);
  const streak = getStreakInfo(progress);
  const allAchievements = getAllAchievements();
  const earnedAchievements = progress.achievements || [];
  const categoriesWithProgress = MCQ_CATEGORIES.filter(c => progress.categoryProgress[c.id]);

  // Determine weak and strong areas
  const areaEntries = Object.entries(progress.categoryProgress).map(([id, data]) => ({
    id,
    name: MCQ_CATEGORIES.find(c => c.id === id)?.name || id,
    icon: MCQ_CATEGORIES.find(c => c.id === id)?.icon || '📁',
    accuracy: data.answered > 0 ? Math.round((data.correct / data.answered) * 100) : 0,
    answered: data.answered,
    color: MCQ_CATEGORIES.find(c => c.id === id)?.color || '#64748b',
  }));
  const strongAreas = areaEntries.filter(a => a.accuracy >= 70).sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);
  const weakAreas = areaEntries.filter(a => a.accuracy < 70 && a.answered > 0).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);

  return (
    <div className={`min-h-screen bg-[var(--mcq-bg)] text-[var(--mcq-text)] ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[var(--mcq-nav-bg)] backdrop-blur-xl border-b border-[var(--mcq-border)]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href={`${base}mcq`} className="flex items-center gap-2 text-[var(--mcq-text-secondary)] hover:text-[var(--mcq-text-primary)] transition-colors no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            <span className="text-sm font-medium">MCQ Hub</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-yellow-400">✦ {progress.xp} XP</span>
            <span className="text-xs text-[var(--mcq-text-muted)]">Level {progress.level}</span>
            <a href={`${base}practice`} className="mcq-btn-ghost text-sm">Labs</a>
            <a href={`${base}overview`} className="mcq-btn-ghost text-sm">Docs</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <div>
              <h1 className="text-2xl font-bold text-[var(--mcq-text-primary)]">Your Dashboard</h1>
              <p className="text-sm text-[var(--mcq-text-secondary)]">Track your learning progress and achievements</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Questions Solved', value: progress.totalAnswered, icon: '📝', color: '#60a5fa' },
            { label: 'Accuracy', value: `${accuracy}%`, icon: '🎯', color: accuracy >= 70 ? '#22c55e' : accuracy >= 40 ? '#f59e0b' : '#ef4444' },
            { label: 'Current Streak', value: `🔥 ${streak.current}`, icon: '🔥', color: '#f59e0b' },
            { label: 'Best Streak', value: `🏆 ${streak.best}`, icon: '🏆', color: '#a78bfa' },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{s.icon}</span>
              </div>
              <span className="text-lg font-extrabold block" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[0.65rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Categories Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="p-5 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-[var(--mcq-text-primary)] mb-4">Category Progress</h2>
            <div className="space-y-3">
              {MCQ_CATEGORIES.slice(0, 8).map(cat => {
                const cp = progress.categoryProgress[cat.id];
                const a = cp ? getCategoryAccuracy(progress, cat.id) : 0;
                return (
                  <a key={cat.id} href={`${base}mcq/${cat.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--mcq-surface-hover)] transition-colors no-underline group">
                    <span className="text-lg">{cat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-[var(--mcq-text-primary)] truncate">{cat.name}</span>
                        <span className="text-[0.6rem] text-[var(--mcq-text-muted)]">{cp?.answered || 0}/{cat.questionCount}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--mcq-border)] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${a}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)` }} />
                      </div>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: a >= 70 ? '#22c55e' : a >= 40 ? '#f59e0b' : '#64748b' }}>{a}%</span>
                  </a>
                );
              })}
            </div>
            <a href={`${base}mcq`} className="mt-4 text-xs text-blue-400/70 hover:text-blue-400 transition-colors inline-flex items-center gap-1">
              View all categories <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </motion.div>

          {/* Strong vs Weak Areas */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="space-y-4">
            {strongAreas.length > 0 && (
              <div className="p-5 rounded-xl border border-green-500/10 bg-[var(--mcq-surface-20)] backdrop-blur-sm">
                <h2 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <span>💪</span> Strong Areas
                </h2>
                <div className="space-y-2">
                  {strongAreas.map(a => (
                    <a key={a.id} href={`${base}mcq/${a.id}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--mcq-surface-hover)] transition-colors no-underline">
                      <span>{a.icon}</span>
                      <span className="text-xs text-[var(--mcq-text-body)] flex-1">{a.name}</span>
                      <span className="text-xs font-semibold text-green-400">{a.accuracy}%</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            {weakAreas.length > 0 && (
              <div className="p-5 rounded-xl border border-red-500/10 bg-[var(--mcq-surface-20)] backdrop-blur-sm">
                <h2 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span>📚</span> Areas to Improve
                </h2>
                <div className="space-y-2">
                  {weakAreas.map(a => (
                    <a key={a.id} href={`${base}mcq/${a.id}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--mcq-surface-hover)] transition-colors no-underline">
                      <span>{a.icon}</span>
                      <span className="text-xs text-[var(--mcq-text-body)] flex-1">{a.name}</span>
                      <span className="text-xs font-semibold text-red-400">{a.accuracy}%</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="mb-8">
          <h2 className="text-sm font-semibold text-[var(--mcq-text-primary)] mb-4 flex items-center gap-2">
            <span>🏅</span> Achievements
            <span className="text-[0.6rem] text-[var(--mcq-text-muted)] font-normal">({earnedAchievements.length}/{allAchievements.length})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allAchievements.map(def => {
              const earned = earnedAchievements.find(a => a.id === def.id);
              return (
                <div key={def.id} className={`p-3 rounded-lg border text-center transition-all ${
                  earned ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] opacity-40'
                }`}>
                  <span className="text-xl block mb-1">{def.icon}</span>
                  <span className={`text-[0.65rem] font-semibold block ${earned ? 'text-yellow-300' : 'text-[var(--mcq-text-muted)]'}`}>{def.name}</span>
                  <span className="text-[0.55rem] text-[var(--mcq-text-muted)]">{def.desc}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-5 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] backdrop-blur-sm mb-8">
          <h2 className="text-sm font-semibold text-[var(--mcq-text-primary)] mb-4">Recent Activity</h2>
          {progress.answeredQuestions.length === 0 ? (
            <div className="text-center py-6">
              <span className="text-3xl block mb-2">🚀</span>
              <p className="text-sm text-[var(--mcq-text-secondary)]">No questions answered yet. Start a quiz!</p>
              <a href={`${base}mcq`} className="mcq-btn-primary mt-4 inline-flex text-sm">Browse Categories</a>
            </div>
          ) : (
            <div className="space-y-1.5">
              {[...progress.answeredQuestions].reverse().slice(0, 10).map((q, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg text-xs">
                  <span>{q.correct ? '✅' : '❌'}</span>
                  <span className="text-[var(--mcq-text-secondary)]">Question #{q.id}</span>
                  <span className="text-[var(--mcq-text-muted)] ml-auto">{formatTime(q.timestamp)}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--mcq-border)] py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-[var(--mcq-text-muted)]">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
          <div className="flex gap-4">
            <a href={`${base}mcq`} className="hover:text-blue-400 transition-colors">Categories</a>
            <a href={base} className="hover:text-blue-400 transition-colors">Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function formatTime(ts) {
  if (!ts) return '';
  const diff = Date.now() - ts;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}
