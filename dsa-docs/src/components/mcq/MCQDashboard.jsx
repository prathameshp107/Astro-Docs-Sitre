import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../Skeleton.jsx';
import { MCQ_CATEGORIES, getQuestionsForCategory } from './MCQData.js';
import { getInitialProgress, getAccuracy, getCategoryAccuracy, getStreakInfo, getAllAchievements } from './MCQStore.js';
import { CategoryIcon } from './CategoryIcons.jsx';

// ─── Activity Heatmap ──────────────────────────────────────
function ActivityHeatmap({ answeredQuestions }) {
  const today = new Date();
  const weeks = 17;
  const cells = weeks * 7;

  // Build a map of date → count
  const dateMap = {};
  answeredQuestions.forEach(q => {
    if (!q.timestamp) return;
    const d = new Date(q.timestamp);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    dateMap[key] = (dateMap[key] || 0) + 1;
  });

  const maxCount = Math.max(1, ...Object.values(dateMap));

  const grid = Array.from({ length: cells }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (cells - 1 - i));
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const count = dateMap[key] || 0;
    const level = count === 0 ? 0 : count <= maxCount * 0.25 ? 1 : count <= maxCount * 0.5 ? 2 : count <= maxCount * 0.75 ? 3 : 4;
    return { date: d, count, level };
  });

  const columns = [];
  for (let w = 0; w < weeks; w++) {
    columns.push(grid.slice(w * 7, (w + 1) * 7));
  }

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div>
      <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-start', minWidth: 'fit-content' }}>
          {columns.map((col, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {col.map((cell, di) => (
                <div
                  key={di}
                  className={`mcq-heatmap-cell level-${cell.level}`}
                  title={`${cell.date.toDateString()}: ${cell.count} questions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.58rem', color: 'var(--mcq-text-muted)' }}>Less</span>
        {[0,1,2,3,4].map(l => (
          <div key={l} className={`mcq-heatmap-cell level-${l}`} style={{ margin: 0 }} />
        ))}
        <span style={{ fontSize: '0.58rem', color: 'var(--mcq-text-muted)' }}>More</span>
      </div>
    </div>
  );
}

// ─── Sparkline Chart ───────────────────────────────────────
function Sparkline({ data, color = '#2563eb', height = 44 }) {
  if (!data.length) return null;
  const max = Math.max(1, ...data);
  const w = 200;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - (v / max) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${height}`} style={{ width: '100%', height }} preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* Fill area */}
      <polyline
        points={`0,${height} ${pts} ${w},${height}`}
        fill={`${color}18`}
        stroke="none"
      />
    </svg>
  );
}

export default function MCQDashboard() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = getInitialProgress();
    setProgress(p);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  // 7-day XP sparkline
  const xpByDay = useMemo(() => {
    if (!progress) return [];
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    });
    return days.map(dayStart => {
      const dayEnd = dayStart + 86400000;
      return progress.answeredQuestions
        .filter(q => q.timestamp >= dayStart && q.timestamp < dayEnd && q.correct)
        .reduce((sum, q) => sum + 10, 0);
    });
  }, [progress]);

  if (loading || !progress) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Skeleton variant="text" width="200px" height="28px" style={{ marginBottom: '8px' }} />
          <Skeleton variant="text" width="300px" height="14px" style={{ marginBottom: '32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ padding: '16px', borderRadius: 14, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)' }}>
                <Skeleton variant="text" width="50%" height="24px" style={{ marginBottom: '6px' }} />
                <Skeleton variant="text" width="70%" height="10px" />
              </div>
            ))}
          </div>
          <Skeleton variant="text" width="100%" height="100px" style={{ borderRadius: 14, marginBottom: '24px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <Skeleton variant="text" width="100%" height="280px" style={{ borderRadius: 14 }} />
            <Skeleton variant="text" width="100%" height="280px" style={{ borderRadius: 14 }} />
          </div>
        </div>
      </div>
    );
  }

  const accuracy = getAccuracy(progress);
  const streak = getStreakInfo(progress);
  const allAchievements = getAllAchievements();
  const earnedAchievements = progress.achievements || [];

  const areaEntries = Object.entries(progress.categoryProgress).map(([id, data]) => ({
    id,
    name: MCQ_CATEGORIES.find(c => c.id === id)?.name || id,
    icon: MCQ_CATEGORIES.find(c => c.id === id)?.icon || '📁',
    color: MCQ_CATEGORIES.find(c => c.id === id)?.color || '#64748b',
    accuracy: data.answered > 0 ? Math.round((data.correct / data.answered) * 100) : 0,
    answered: data.answered,
    correct: data.correct,
  }));
  const strongAreas = areaEntries.filter(a => a.accuracy >= 70).sort((a, b) => b.accuracy - a.accuracy).slice(0, 4);
  const weakAreas = areaEntries.filter(a => a.accuracy < 70 && a.answered > 0).sort((a, b) => a.accuracy - b.accuracy).slice(0, 4);

  // Top missed questions (most wrong answers per category)
  const topMissed = areaEntries
    .filter(a => a.answered > 0)
    .map(a => ({ ...a, wrong: a.answered - a.correct, pct: 100 - a.accuracy }))
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 5);

  const xpToNextLevel = 100 - (progress.xp % 100);
  const currentLevelXP = progress.xp % 100;

  const dayLabels = ['7d','6d','5d','4d','3d','2d','1d'];

  return (
    <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)' }}>
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--mcq-text-primary)', lineHeight: 1.1 }}>
                📊 Your Dashboard
              </h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--mcq-text-secondary)', marginTop: '3px' }}>
                Track your learning progress, streaks, and achievements
              </p>
            </div>
            <a href={`${base}mcq`} className="mcq-btn-secondary" style={{ fontSize: '0.78rem', padding: '8px 16px' }}>
              ← MCQ Hub
            </a>
          </div>
        </motion.div>

        {/* Top Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}
          className="sm:grid-cols-4">
          {[
            { label: 'Questions Solved', value: progress.totalAnswered, icon: '📝', color: '#60a5fa', sub: `${progress.totalCorrect} correct` },
            { label: 'Overall Accuracy', value: `${accuracy}%`, icon: '🎯', color: accuracy >= 70 ? '#22c55e' : accuracy >= 40 ? '#f59e0b' : '#ef4444', sub: `${progress.totalWrong} wrong` },
            { label: 'Current Streak', value: `🔥 ${streak.current}`, icon: '🔥', color: '#f59e0b', sub: `Best: ${streak.best}` },
            { label: 'Total XP', value: progress.xp, icon: '✦', color: '#fbbf24', sub: `Level ${progress.level}` },
          ].map(s => (
            <div key={s.label} style={{
              padding: '16px', borderRadius: 14, border: '1px solid var(--mcq-border)',
              background: 'var(--mcq-surface-20)', backdropFilter: 'blur(8px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: s.color, display: 'block', lineHeight: 1.1 }}>{s.value}</span>
              <span style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mcq-text-muted)', display: 'block' }}>{s.label}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--mcq-text-secondary)', marginTop: '2px', display: 'block' }}>{s.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Level Progress Bar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ padding: '14px 18px', borderRadius: 14, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--mcq-text-primary)' }}>Level {progress.level}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--mcq-text-muted)' }}>{currentLevelXP}/100 XP → Level {progress.level + 1}</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: 'var(--mcq-border)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 999,
              width: `${currentLevelXP}%`,
              background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
              transition: 'width 0.8s ease',
            }} />
          </div>
        </motion.div>

        {/* Activity Heatmap + 7-day Sparkline */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', marginBottom: '20px', alignItems: 'start' }}
          className="lg:grid-cols-[1fr_200px]">

          {/* Heatmap */}
          <div style={{ padding: '16px', borderRadius: 14, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mcq-text-primary)', marginBottom: '12px' }}>
              📅 Activity (17 Weeks)
            </h2>
            <ActivityHeatmap answeredQuestions={progress.answeredQuestions} />
          </div>

          {/* 7-day sparkline */}
          <div style={{ padding: '16px', borderRadius: 14, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)', minWidth: '160px' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mcq-text-primary)', marginBottom: '4px' }}>7-Day XP</h2>
            <p style={{ fontSize: '0.6rem', color: 'var(--mcq-text-muted)', marginBottom: '10px' }}>Daily XP earned</p>
            <Sparkline data={xpByDay} color="#2563eb" height={44} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              {dayLabels.map(d => (
                <span key={d} style={{ fontSize: '0.52rem', color: 'var(--mcq-text-muted)' }}>{d}</span>
              ))}
            </div>
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--mcq-border)' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb' }}>{xpByDay.reduce((a,b) => a+b, 0)}</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--mcq-text-muted)', marginLeft: '4px' }}>XP this week</span>
            </div>
          </div>
        </motion.div>

        {/* Categories + Weak/Strong + Top Missed */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          {/* Category Progress */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ padding: '16px', borderRadius: 14, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mcq-text-primary)', marginBottom: '14px' }}>
              Category Progress
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MCQ_CATEGORIES.slice(0, 8).map(cat => {
                const cp = progress.categoryProgress[cat.id];
                const a = cp ? getCategoryAccuracy(progress, cat.id) : 0;
                const qCount = getQuestionsForCategory(cat.id).length;
                return (
                  <a key={cat.id} href={`${base}mcq/${cat.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: 8, textDecoration: 'none', color: 'var(--mcq-text)', transition: 'background 0.1s' }}
                    className="hover:bg-[var(--mcq-surface-hover)] transition-colors">
                    <CategoryIcon categoryId={cat.id} size={16} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--mcq-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</span>
                        <span style={{ fontSize: '0.58rem', color: 'var(--mcq-text-muted)', flexShrink: 0, marginLeft: 4 }}>{cp?.answered || 0}/{qCount}</span>
                      </div>
                      <div style={{ height: '3px', borderRadius: 999, background: 'var(--mcq-border)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 999, width: `${a}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}90)`, transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, color: a >= 70 ? '#22c55e' : a >= 40 ? '#f59e0b' : 'var(--mcq-text-muted)', flexShrink: 0, width: '32px', textAlign: 'right' }}>{a}%</span>
                  </a>
                );
              })}
            </div>
            <a href={`${base}mcq`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: '10px', fontSize: '0.7rem', color: '#60a5fa', textDecoration: 'none' }}>
              View all →
            </a>
          </motion.div>

          {/* Right column: Strong + Weak + Top Missed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Strong Areas */}
            {strongAreas.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
                style={{ padding: '14px', borderRadius: 14, border: '1px solid rgba(34,197,94,0.15)', background: 'var(--mcq-surface-20)' }}>
                <h2 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4ade80', marginBottom: '10px' }}>💪 Strong Areas</h2>
                {strongAreas.map(a => (
                  <a key={a.id} href={`${base}mcq/${a.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 6px', borderRadius: 8, textDecoration: 'none', marginBottom: '4px' }}
                    className="hover:bg-[var(--mcq-surface-hover)] transition-colors">
                    <CategoryIcon categoryId={a.id} size={15} />
                    <span style={{ fontSize: '0.72rem', color: 'var(--mcq-text-body)', flex: 1 }}>{a.name}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4ade80' }}>{a.accuracy}%</span>
                  </a>
                ))}
              </motion.div>
            )}

            {/* Weak Areas */}
            {weakAreas.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                style={{ padding: '14px', borderRadius: 14, border: '1px solid rgba(239,68,68,0.12)', background: 'var(--mcq-surface-20)' }}>
                <h2 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f87171', marginBottom: '10px' }}>📚 Needs Work</h2>
                {weakAreas.map(a => (
                  <a key={a.id} href={`${base}mcq/quiz/${a.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 6px', borderRadius: 8, textDecoration: 'none', marginBottom: '4px' }}
                    className="hover:bg-[var(--mcq-surface-hover)] transition-colors">
                    <CategoryIcon categoryId={a.id} size={15} />
                    <span style={{ fontSize: '0.72rem', color: 'var(--mcq-text-body)', flex: 1 }}>{a.name}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f87171' }}>{a.accuracy}%</span>
                    <span style={{ fontSize: '0.58rem', color: '#60a5fa' }}>Retry →</span>
                  </a>
                ))}
              </motion.div>
            )}

            {/* Empty state */}
            {areaEntries.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', borderRadius: 14, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🚀</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--mcq-text-secondary)', marginBottom: '12px' }}>Start your first quiz to see progress here!</p>
                <a href={`${base}mcq`} className="mcq-btn-primary" style={{ fontSize: '0.75rem', padding: '8px 16px' }}>Browse Categories</a>
              </div>
            )}
          </div>
        </div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--mcq-text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🏅 Achievements
            <span style={{ fontSize: '0.65rem', color: 'var(--mcq-text-muted)', fontWeight: 400 }}>
              ({earnedAchievements.length}/{allAchievements.length} earned)
            </span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
            {allAchievements.map(def => {
              const earned = earnedAchievements.find(a => a.id === def.id);
              return (
                <div key={def.id} style={{
                  padding: '12px 8px', borderRadius: 12, textAlign: 'center',
                  border: `1px solid ${earned ? 'rgba(251,191,36,0.2)' : 'var(--mcq-border)'}`,
                  background: earned ? 'rgba(251,191,36,0.04)' : 'var(--mcq-surface-20)',
                  opacity: earned ? 1 : 0.4, transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: '1.3rem', display: 'block', marginBottom: '4px' }}>{def.icon}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: earned ? '#fcd34d' : 'var(--mcq-text-muted)', display: 'block' }}>{def.name}</span>
                  <span style={{ fontSize: '0.55rem', color: 'var(--mcq-text-muted)', display: 'block', marginTop: '2px' }}>{def.desc}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ padding: '16px', borderRadius: 14, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mcq-text-primary)', marginBottom: '12px' }}>Recent Activity</h2>
          {progress.answeredQuestions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🚀</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--mcq-text-secondary)' }}>No questions answered yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[...progress.answeredQuestions].reverse().slice(0, 8).map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: 8, fontSize: '0.72rem' }}>
                  <span>{q.correct ? '✅' : '❌'}</span>
                  <span style={{ color: 'var(--mcq-text-secondary)', flex: 1 }}>Question #{q.id}</span>
                  <span style={{ color: 'var(--mcq-text-muted)', fontSize: '0.62rem' }}>{formatTime(q.timestamp)}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--mcq-border)', padding: '20px 24px' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs" style={{ color: 'var(--mcq-text-muted)' }}>
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
