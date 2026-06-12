import { useState, useEffect, useRef, useCallback } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

const particleCount = 20;

export default function MCQHub() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
    setProgress(getInitialProgress());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!glowRef.current || !heroRef.current) return;
    requestAnimationFrame(() => {
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.15), transparent 60%)`;
    });
  }, []);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const accuracy = progress ? getAccuracy(progress) : 0;
  const streak = progress ? getStreakInfo(progress) : { current: 0, best: 0 };

  return (
    <div className="min-h-screen bg-[var(--mcq-bg)] text-[var(--mcq-text)] transition-colors duration-300">
      {/* Particles */}
      <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-800`} aria-hidden="true">
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-[-10px] rounded-full bg-gradient-to-br from-blue-500/40 to-emerald-400/20 animate-[particleRise_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--mcq-nav-bg)] backdrop-blur-xl border-b border-[var(--mcq-border)]' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href={base} className="flex items-center gap-2 font-bold text-[var(--mcq-text-primary)] hover:opacity-85 transition-opacity no-underline">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#mcq-brand)" />
              <text x="14" y="19" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">M</text>
              <defs><linearGradient id="mcq-brand" x1="0" y1="0" x2="28" y2="28">
                <stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#f472b6" />
              </linearGradient></defs>
            </svg>
            <span>MCQ Hub</span>
          </a>
          <div className="flex items-center gap-2">
            {progress && (
              <div className="hidden sm:flex items-center gap-4 text-xs text-[var(--mcq-text-muted)]">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">✦</span> {progress.xp} XP
                </span>
                <span>Level {progress.level}</span>
              </div>
            )}
            <a href={`${base}mcq/dashboard`} className="mcq-btn-ghost text-sm">Dashboard</a>
            <a href={`${base}practice`} className="mcq-btn-ghost text-sm">Labs</a>
            <a href={`${base}overview`} className="mcq-btn-ghost text-sm">Docs</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative z-10 pt-16 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-[-1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent_80%)]" />
          <div ref={glowRef} className="absolute inset-0" />
          <div className="absolute rounded-full blur-[100px] opacity-20 animate-[float_12s_ease-in-out_infinite] top-[-10%] right-[-5%] w-[500px] h-[500px] bg-radial-[circle_at_center,blue_0%,transparent_70%]" />
          <div className="absolute rounded-full blur-[100px] opacity-20 animate-[float_12s_ease-in-out_infinite_-4s] bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-radial-[circle_at_center,emerald_0%,transparent_70%]" />
          <div className="absolute rounded-full blur-[100px] opacity-20 animate-[float_12s_ease-in-out_infinite_-8s] top-[30%] left-[40%] w-[350px] h-[350px] bg-radial-[circle_at_center,purple_0%,transparent_70%]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-emerald-400/5 text-blue-300 text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Interactive Quizzes
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--mcq-text-primary)] max-w-4xl mx-auto mb-4">
              Master Programming Concepts{' '}
              <span className="mcq-gradient-text">Through Interactive Quizzes</span>
            </h1>

            <p className="text-lg text-[var(--mcq-text-secondary)] max-w-xl mx-auto leading-relaxed mb-8">
              Test your knowledge. Track your progress. Prepare for interviews with thousands of curated questions across 14+ technologies.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a href="#categories" className="mcq-btn-primary text-base px-6 py-3">
                Start Learning
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href={`${base}mcq/dashboard`} className="mcq-btn-secondary text-base px-6 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                View Dashboard
              </a>
            </div>

            {/* Topic pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-2xl mx-auto">
              {['JavaScript','React','TypeScript','Python','SQL','CSS','Git','DSA','System Design'].map((t, i) => (
                <span key={t} className="px-3 py-1 rounded-full border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] text-[var(--mcq-text-muted)] text-xs font-medium transition-all hover:border-blue-400/25 hover:text-blue-300 hover:bg-blue-500/8"
                  style={{ animationDelay: `${0.8 + i * 0.06}s` }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      {progress && (
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 max-w-6xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-center gap-0 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] backdrop-blur-md p-4">
            {[
              { value: MCQ_CATEGORIES.length, label: 'Categories' },
              { value: progress.totalAnswered, label: 'Answered' },
              { value: `${accuracy}%`, label: 'Accuracy' },
              { value: `${progress.xp}`, label: 'XP' },
              { value: `Lv.${progress.level}`, label: 'Level' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center px-4 sm:px-6">
                <span className="text-lg font-extrabold text-[var(--mcq-text-primary)] bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">{s.value}</span>
                <span className="text-[0.65rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Categories Grid */}
      <section id="categories" className="relative z-10 max-w-6xl mx-auto px-6 py-8 mb-16">
        <div className="mcq-section-header">
          <span className="mcq-section-tag">Categories</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--mcq-text-primary)] mb-3">Choose Your Path</h2>
          <p className="text-[var(--mcq-text-secondary)] max-w-md mx-auto">Browse all technology categories and start testing your knowledge.</p>
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
                className="group relative flex flex-col p-5 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden no-underline"
                style={{ borderColor: cat.borderColor }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${cat.color}08, transparent 60%)` }} />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-white/[0.01] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />

                <div className="flex items-center justify-between mb-3 relative z-[1]">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold border`}
                    style={{ background: `${cat.color}15`, color: cat.color, borderColor: `${cat.color}25` }}>
                    {cat.questionCount} Q
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[var(--mcq-text-primary)] mb-1.5 relative z-[1]">{cat.name}</h3>
                <p className="text-xs text-[var(--mcq-text-secondary)] leading-relaxed mb-3 relative z-[1] line-clamp-2">{cat.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3 relative z-[1]">
                  {cat.difficulties.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded text-[0.6rem] font-medium bg-[var(--mcq-surface-20)] text-[var(--mcq-text-muted)]">{d}</span>
                  ))}
                </div>

                <div className="mt-auto relative z-[1]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[0.65rem] text-[var(--mcq-text-muted)] font-medium uppercase tracking-wider">
                      {catProgress ? `${catProgress.answered}/${cat.questionCount}` : '0/' + cat.questionCount}
                    </span>
                    <span className="text-[0.65rem] font-semibold" style={{ color: cat.color }}>
                      {catAccuracy}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--mcq-border)] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${catAccuracy}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)` }} />
                  </div>
                </div>

                <div className="relative z-[1] mt-3 pt-3 border-t border-[var(--mcq-border)] flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-400/80 group-hover:text-blue-400 transition-colors">
                    {catProgress ? 'Continue →' : 'Start Quiz →'}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--mcq-border)] py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-[var(--mcq-text-muted)]">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
          <div className="flex gap-4">
            <a href={`${base}mcq/dashboard`} className="hover:text-blue-400 transition-colors">Dashboard</a>
            <a href={base} className="hover:text-blue-400 transition-colors">Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
