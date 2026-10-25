import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '../Skeleton.jsx';
import { MCQ_CATEGORIES, getQuestionsForCategory } from './MCQData.js';
import { getInitialProgress, recordAnswer, getAccuracy, arraysEqual } from './MCQStore.js';
import { useSrsStore } from '../../store/srsStore.js';
import { CategoryIcon } from './CategoryIcons.jsx';
import '../../styles/sketch-visualizer.css';

// ─── Fisher-Yates Shuffle ───────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Deterministic shuffle, seeded from a string.
 *
 * Used to reorder each question's OPTIONS. The bank has a severe answer-position
 * bias — 82% of correct answers sat at index 0, so always picking A scored 82%
 * and the quiz measured nothing. Options are now reordered per question.
 *
 * Seeded rather than random so a question keeps the same option order across
 * re-renders, submit, and review — a fresh Math.random() on every render would
 * move the options under the user's cursor.
 */
function seededShuffle(arr, seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Progress Dot Mini-map ─────────────────────────────────
function ProgressMinimap({ results, total, current }) {
  return (
    <div className="mcq-progress-dots">
      {Array.from({ length: total }, (_, i) => {
        const r = results[i];
        const cls = i === current ? 'current' :
          r === undefined ? '' :
          r.correct ? 'answered-correct' : 'answered-wrong';
        return <div key={i} className={`mcq-progress-dot ${cls}`} title={`Q${i+1}`} />;
      })}
    </div>
  );
}

// ─── Timer Ring ─────────────────────────────────────────────
function TimerRing({ timeLeft, totalTime, size = 36 }) {
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  const pct = totalTime > 0 ? (timeLeft / totalTime) : 1;
  const offset = circ - pct * circ;
  const color = pct > 0.5 ? 'var(--mcq-timer-safe)' : pct > 0.2 ? 'var(--mcq-timer-warn)' : 'var(--mcq-timer-danger)';
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  return (
    <div className="mcq-timer-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle fill="none" stroke="var(--mcq-border)" strokeWidth="3" cx={size/2} cy={size/2} r={r} />
        <circle fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
          cx={size/2} cy={size/2} r={r}
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
      <div className="mcq-timer-label" style={{ color }}>
        {mins > 0 ? `${mins}:${secs.toString().padStart(2,'0')}` : `${secs}s`}
      </div>
    </div>
  );
}

// ─── XP Flyout ─────────────────────────────────────────────
function XPFlyout({ xp, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="xp"
          initial={{ opacity: 0, y: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: -60, scale: 1.1 }}
          exit={{ opacity: 0, y: -90, scale: 0.9 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{
            position: 'fixed', bottom: '30%', right: '2rem', zIndex: 9999,
            pointerEvents: 'none', fontSize: '1.3rem', fontWeight: 900,
            color: '#fbbf24', textShadow: '0 0 16px rgba(251,191,36,0.6)',
          }}
        >
          +{xp} XP ✦
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Confetti (CSS particle burst) ─────────────────────────
function ConfettiParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    color: ['#2563eb','#22c55e','#f59e0b','#ec4899','#a78bfa','#06b6d4'][i % 6],
    delay: Math.random() * 0.4,
    dur: 1.2 + Math.random() * 0.8,
    size: 5 + Math.random() * 6,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998, overflow: 'hidden' }} aria-hidden>
      {particles.map(p => (
        <motion.div key={p.id}
          style={{
            position: 'absolute', top: 0, left: `${p.x}%`,
            width: p.size, height: p.size, borderRadius: Math.random() > 0.5 ? '50%' : 2,
            background: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ y: '110vh', opacity: 0, rotate: 360 * (Math.random() > 0.5 ? 1 : -1), scale: 0.5 }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

// ─── Bookmark Store ─────────────────────────────────────────
function getBookmarks() {
  try { return JSON.parse(localStorage.getItem('mcq-bookmarks') || '[]'); } catch { return []; }
}
function toggleBookmark(id) {
  const bm = getBookmarks();
  const idx = bm.indexOf(id);
  if (idx >= 0) bm.splice(idx, 1); else bm.push(id);
  localStorage.setItem('mcq-bookmarks', JSON.stringify(bm));
  return bm.includes(id) ? false : true;
}

// ─── Main Quiz Component ────────────────────────────────────
export default function MCQQuiz({ categoryId }) {
  const [loading, setLoading] = useState(false); // SSR-safe: effects do not run on the server, so an initial `true` made the server-rendered HTML a skeleton with no crawlable content.
  const [progress, setProgress] = useState(null);
  const [allQuestions, setAllQuestions] = useState(() => getQuestionsForCategory(categoryId));

  // Quiz config — read from URL client-side (fixes static build bug)
  const [initialTopic, setInitialTopic] = useState(null);
  const [initialMode, setInitialMode] = useState('practice');

  // Setup state
  const [showSetup, setShowSetup] = useState(true);
  const [mode, setMode] = useState('practice');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [secondsPerQuestion, setSecondsPerQuestion] = useState(60);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [xpGained, setXpGained] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [showXP, setShowXP] = useState(false);
  const [lastXP, setLastXP] = useState(10);
  const [showConfetti, setShowConfetti] = useState(false);

  const timerRef = useRef(null);
  const cat = MCQ_CATEGORIES.find(c => c.id === categoryId);
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  // ── Read URL params client-side (the critical static-site fix) ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic');
    const modeParam = params.get('mode') || 'practice';
    setInitialTopic(topicParam || null);
    setInitialMode(modeParam);
    setMode(modeParam);
    // If topic is in URL: jump straight to quiz, skip setup
    if (topicParam) {
      setShowSetup(false);
      setQuizStarted(true);
    } else {
      // No topic: show setup screen
      setShowSetup(true);
    }
  }, []);

  useEffect(() => {
    setProgress(getInitialProgress());
    setAllQuestions(getQuestionsForCategory(categoryId));
    setBookmarks(getBookmarks());
    const timer = setTimeout(() => setLoading(false), 280);
    return () => clearTimeout(timer);
  }, [categoryId]);

  // Timer for assessment mode
  useEffect(() => {
    if (mode === 'assessment' && quizStarted && !quizFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(p => {
          if (p <= 1) { clearInterval(timerRef.current); finishQuiz(); return 0; }
          return p - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [mode, quizStarted, quizFinished]);

  // Filtered + shuffled questions
  const filteredQuestions = useMemo(() => {
    let qs = [...allQuestions];
    if (initialTopic && initialTopic !== 'all') qs = qs.filter(q => q.topic === initialTopic);
    if (selectedDifficulty !== 'all') qs = qs.filter(q => q.difficulty === selectedDifficulty);
    return qs;
  }, [allQuestions, initialTopic, selectedDifficulty]);

  const shuffledQuestions = useMemo(() => {
    const qs = [...filteredQuestions];
    const count = Math.min(questionCount, qs.length);
    return mode === 'interview' ? shuffle(qs).slice(0, count) : qs.slice(0, count);
  }, [filteredQuestions, mode, questionCount]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQ = shuffledQuestions.length;

  /**
   * Per-question option order, plus the correct indices remapped into it.
   * Everything downstream must use `view.options` / `view.correct` rather than
   * the raw question, or the answer check compares across two index spaces.
   */
  const view = useMemo(() => {
    if (!currentQuestion) return null;
    const order = seededShuffle(
      currentQuestion.options.map((_, i) => i),
      String(currentQuestion.id ?? currentQuestion.question),
    );
    return {
      options: order.map((i) => currentQuestion.options[i]),
      correct: (currentQuestion.correctAnswer ?? []).map((ci) => order.indexOf(ci)),
    };
  }, [currentQuestion]);

  const isMultiSelect = view?.correct?.length > 1;

  // ── Handlers ──────────────────────────────────────────────
  const handleOptionClick = useCallback((idx) => {
    if (submitted) return;
    setSelectedAnswers(prev => {
      if (isMultiSelect) return prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx];
      return [idx];
    });
  }, [submitted, isMultiSelect]);

  const handleSubmit = useCallback(() => {
    if (!currentQuestion || selectedAnswers.length === 0) return;
    setSubmitted(true);
    const correct = arraysEqual([...selectedAnswers].sort(), [...view.correct].sort());
    setIsCorrect(correct);
    if (correct) {
      setStreakCount(p => p + 1);
      const xp = currentQuestion.xpReward || 10;
      setXpGained(p => p + xp);
      setLastXP(xp);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1200);
    } else {
      setStreakCount(0);
      // Auto-create spaced repetition flashcard for incorrect answer
      useSrsStore.getState().addAutoCard({
        id: `mcq-wrong-${currentQuestion.id}`,
        type: 'mcq-replay',
        front: `Replay MCQ: **${currentQuestion.question}**`,
        back: `Correct answer: **${view.options[view.correct[0]]}**\n\nExplanation: ${currentQuestion.explanation}`,
        categoryId: categoryId,
        mcqRef: currentQuestion.id
      });
    }
    const newProgress = recordAnswer(progress, currentQuestion, selectedAnswers);
    setProgress(newProgress);
  }, [currentQuestion, selectedAnswers, progress]);

  const handleNext = useCallback(() => {
    setQuizResults(prev => [...prev, { question: currentQuestion, selected: selectedAnswers, correct: isCorrect }]);
    if (currentIndex + 1 >= totalQ) {
      finishQuiz();
    } else {
      setCurrentIndex(p => p + 1);
      setSelectedAnswers([]);
      setSubmitted(false);
      setIsCorrect(null);
    }
  }, [currentIndex, totalQ, currentQuestion, selectedAnswers, isCorrect]);

  function finishQuiz() {
    setQuizFinished(true);
    clearInterval(timerRef.current);
  }

  const startQuiz = useCallback(() => {
    setQuizStarted(true);
    setShowSetup(false);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setSubmitted(false);
    setIsCorrect(null);
    setQuizFinished(false);
    setQuizResults([]);
    setXpGained(0);
    setStreakCount(0);
    if (mode === 'assessment') {
      const t = Math.min(questionCount, filteredQuestions.length) * secondsPerQuestion;
      setTimeLeft(t);
      setTotalTime(t);
    }
  }, [mode, questionCount, filteredQuestions, secondsPerQuestion]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (showSetup || quizFinished) return;
      const n = parseInt(e.key);
      if (!submitted && n >= 1 && n <= 4 && currentQuestion?.options?.length >= n) {
        handleOptionClick(n - 1);
      } else if (e.key === 'Enter' && !submitted && selectedAnswers.length > 0) {
        handleSubmit();
      } else if ((e.key === 'Enter' || e.key === ' ') && submitted) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [submitted, selectedAnswers, showSetup, quizFinished, currentQuestion, handleOptionClick, handleSubmit, handleNext]);

  const handleBookmark = () => {
    if (!currentQuestion) return;
    toggleBookmark(currentQuestion.id);
    setBookmarks(getBookmarks());
  };

  const diffColor = {
    easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444', expert: '#a78bfa',
  }[currentQuestion?.difficulty] || '#64748b';

  const isBookmarked = currentQuestion && bookmarks.includes(currentQuestion.id);

  // ── Loading ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', padding: '48px 24px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <Skeleton variant="text" width="100px" height="14px" style={{ marginBottom: '32px' }} />
          <Skeleton variant="text" width="100%" height="80px" style={{ marginBottom: '16px' }} />
          {[1,2,3,4].map(i => (
            <Skeleton key={i} variant="text" width="100%" height="52px" style={{ marginBottom: '10px', borderRadius: '14px' }} />
          ))}
          <Skeleton variant="text" width="140px" height="42px" style={{ marginTop: '20px', borderRadius: '10px' }} />
        </div>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--mcq-bg)' }}>
        <p style={{ color: 'var(--mcq-text-secondary)' }}>Category not found</p>
      </div>
    );
  }

  // ─── Setup Screen ─────────────────────────────────────────
  if (showSetup && !quizStarted) {
    const MODE_CONFIG = {
      practice: { label: 'Practice', desc: 'Instant feedback. Learn as you go.', icon: '📝' },
      assessment: { label: 'Assessment', desc: 'Timed test. Results at the end.', icon: '⏱️' },
      interview: { label: 'Interview', desc: 'Random mix. Real simulation.', icon: '🎯' },
    };
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '480px', width: '100%' }}>
          <a href={`${base}mcq/${categoryId}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--mcq-text-secondary)', textDecoration: 'none', marginBottom: '32px' }}
            className="hover:text-blue-400 transition-colors">
            ← Back to {cat.name}
          </a>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>{cat.icon}</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--mcq-text-primary)', marginBottom: '4px' }}>Quiz Setup</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--mcq-text-secondary)' }}>{cat.name} — {filteredQuestions.length} questions available</p>
          </div>

          {/* Mode */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mcq-text-muted)', display: 'block', marginBottom: '8px' }}>Quiz Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {Object.entries(MODE_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setMode(key)}
                  style={{
                    padding: '10px 8px', borderRadius: 12, border: `1.5px solid ${mode === key ? 'rgba(37,99,235,0.4)' : 'var(--mcq-border)'}`,
                    background: mode === key ? 'rgba(37,99,235,0.08)' : 'var(--mcq-surface-20)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  }}>
                  <span style={{ fontSize: '1.1rem', display: 'block', marginBottom: '4px' }}>{cfg.icon}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--mcq-text-primary)', display: 'block' }}>{cfg.label}</span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--mcq-text-muted)' }}>{cfg.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mcq-text-muted)', display: 'block', marginBottom: '8px' }}>Difficulty</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['all','easy','medium','hard'].map(d => (
                <button key={d} onClick={() => setSelectedDifficulty(d)}
                  className={`mcq-mode-pill ${selectedDifficulty === d ? 'active' : ''}`}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div style={{ marginBottom: mode === 'assessment' ? '16px' : '24px' }}>
            <label style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mcq-text-muted)', display: 'block', marginBottom: '8px' }}>Questions</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[5,10,15,20].map(n => (
                <button key={n} onClick={() => setQuestionCount(n)}
                  className={`mcq-mode-pill ${questionCount === n ? 'active' : ''}`}>{n}</button>
              ))}
            </div>
          </div>

          {/* Timer (assessment) */}
          {mode === 'assessment' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mcq-text-muted)', display: 'block', marginBottom: '8px' }}>Seconds Per Question</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[30,45,60,90,120].map(n => (
                  <button key={n} onClick={() => setSecondsPerQuestion(n)}
                    className={`mcq-mode-pill ${secondsPerQuestion === n ? 'active' : ''}`}>
                    {n < 60 ? `${n}s` : `${n/60}m`}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={startQuiz} className="mcq-btn-primary w-full justify-center text-sm py-3">
            {mode === 'practice' ? '📝 Start Practice' : mode === 'assessment' ? '⏱️ Start Assessment' : '🎯 Start Interview'}
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── Results Screen ───────────────────────────────────────
  if (quizFinished) {
    const correctCount = quizResults.filter(r => r.correct).length;
    const finalAccuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const isGreat = finalAccuracy >= 80;

    if (isGreat && !showConfetti) setShowConfetti(true);

    const r = (54);
    const circ = 2 * Math.PI * r;
    const ringColor = finalAccuracy >= 70 ? '#22c55e' : finalAccuracy >= 40 ? '#f59e0b' : '#ef4444';

    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)' }}>
        {isGreat && <ConfettiParticles />}

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: '520px', width: '100%' }}>
          {/* Score Ring */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 16px' }}>
              <svg width={120} height={120} viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle fill="none" stroke="var(--mcq-border)" strokeWidth="8" cx="60" cy="60" r={r} />
                <circle fill="none" stroke={ringColor} strokeWidth="8" strokeLinecap="round"
                  cx="60" cy="60" r={r}
                  strokeDasharray={circ}
                  strokeDashoffset={circ - (finalAccuracy / 100) * circ}
                  style={{ transition: 'stroke-dashoffset 1.2s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: ringColor }}>{finalAccuracy}%</span>
                <span style={{ fontSize: '0.55rem', color: 'var(--mcq-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Accuracy</span>
              </div>
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--mcq-text-primary)', marginBottom: '4px' }}>
              {finalAccuracy >= 90 ? '🏆 Outstanding!' : finalAccuracy >= 70 ? '🎉 Great Job!' : finalAccuracy >= 50 ? '👍 Nice Try!' : '💪 Keep Practicing!'}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--mcq-text-secondary)' }}>
              {mode === 'assessment' ? 'Assessment' : 'Quiz'} Complete
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
            {[
              { v: `${correctCount}/${totalQ}`, l: 'Correct', c: '#22c55e' },
              { v: `+${xpGained}`, l: 'XP', c: '#fbbf24' },
              { v: streakCount > 0 ? `🔥 ${streakCount}` : '—', l: 'Best Streak', c: '#f59e0b' },
              { v: `${totalQ - correctCount}`, l: 'Wrong', c: '#ef4444' },
            ].map(s => (
              <div key={s.l} style={{ padding: '12px 8px', borderRadius: 12, border: '1px solid var(--mcq-border)', background: 'var(--mcq-surface-20)', textAlign: 'center' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: s.c, display: 'block' }}>{s.v}</span>
                <span style={{ fontSize: '0.55rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mcq-text-muted)' }}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--mcq-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              Question Breakdown
            </h3>
            <div className="mcq-results-breakdown">
              {quizResults.map((r, i) => (
                <div key={i} className={`mcq-result-row ${r.correct ? 'correct' : 'wrong'}`}>
                  <span>{r.correct ? '✅' : '❌'}</span>
                  <span style={{ flex: 1, color: 'var(--mcq-text-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.question.question.slice(0, 55)}...
                  </span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--mcq-text-muted)', flexShrink: 0 }}>+{r.question.xpReward} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={startQuiz} className="mcq-btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
              Try Again
            </button>
            <a href={`${base}mcq/${categoryId}`} className="mcq-btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
              Back to {cat.name}
            </a>
            <a href={`${base}mcq`} className="mcq-btn-ghost" style={{ padding: '10px 12px', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Empty State ──────────────────────────────────────────
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--mcq-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>📭</span>
          <p style={{ color: 'var(--mcq-text-secondary)', marginBottom: '16px' }}>No questions available for this filter.</p>
          <a href={`${base}mcq/${categoryId}`} className="mcq-btn-secondary" style={{ fontSize: '0.8rem' }}>← Change Filters</a>
        </div>
      </div>
    );
  }

  const progressPct = totalQ > 0 ? ((currentIndex + (submitted ? 1 : 0)) / totalQ) * 100 : 0;

  // ─── Quiz Active ──────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: 'var(--mcq-bg)', color: 'var(--mcq-text)' }}>
      {/* XP Flyout */}
      <XPFlyout xp={lastXP} show={showXP} />

      {/* Top Bar */}
      <div className="mcq-quiz-topbar">
        <div className="mcq-quiz-topbar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <a href={`${base}mcq/${categoryId}`} style={{ color: 'var(--mcq-text-muted)', textDecoration: 'none', flexShrink: 0 }}
              className="hover:text-blue-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </a>
            <span style={{ fontSize: '0.75rem', color: 'var(--mcq-text-muted)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {cat.icon} {cat.name}{initialTopic ? ` · ${initialTopic}` : ''}
            </span>
            <span style={{
              padding: '2px 8px', borderRadius: 999, fontSize: '0.58rem', fontWeight: 700,
              background: 'rgba(96,165,250,0.1)', borderColor: 'rgba(96,165,250,0.2)', border: '1px solid',
              color: '#93c5fd', flexShrink: 0,
            }}>
              {mode === 'practice' ? '📝' : mode === 'assessment' ? '⏱️' : '🎯'} {mode}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {streakCount >= 3 && (
              <span className="mcq-streak-badge">🔥 {streakCount}</span>
            )}
            {mode === 'assessment' && timeLeft !== null && (
              <TimerRing timeLeft={timeLeft} totalTime={totalTime} />
            )}
            <span style={{ fontSize: '0.72rem', color: 'var(--mcq-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
              {currentIndex + 1} / {totalQ}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700 }}>✦ {progress?.xp || 0}</span>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ padding: '6px 24px 8px', borderTop: '1px solid var(--mcq-border)', background: 'var(--mcq-nav-bg)' }}>
          <ProgressMinimap results={quizResults} total={totalQ} current={currentIndex} />
        </div>

        {/* Thin progress line */}
        <div style={{ height: '2px', background: 'var(--mcq-border)' }}>
          <div style={{
            height: '100%', background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
            width: `${progressPct}%`, transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Question Area */}
      <div className="mcq-question-area max-w-4xl mx-auto px-4 my-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl font-sketch border-2 border-[var(--sketch-border)] shadow-2xl"
          >
            {/* Meta row */}
            <div className="mcq-question-meta">
              <span style={{
                padding: '3px 10px', borderRadius: 999, fontSize: '0.62rem', fontWeight: 700,
                background: `${diffColor}15`, color: diffColor, border: `1px solid ${diffColor}25`,
              }}>
                {currentQuestion.difficulty}
              </span>
              {currentQuestion.topic && (
                <span style={{ fontSize: '0.7rem', color: 'var(--mcq-text-muted)' }}>
                  {currentQuestion.topic}
                </span>
              )}
              {isMultiSelect && (
                <span style={{
                  padding: '2px 8px', borderRadius: 999, fontSize: '0.6rem', fontWeight: 700,
                  background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)',
                }}>
                  Multi-Select
                </span>
              )}
              <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#fbbf24', fontWeight: 600 }}>
                +{currentQuestion.xpReward || 10} XP
              </span>
              <button onClick={handleBookmark} className={`mcq-bookmark-btn ${isBookmarked ? 'saved' : ''}`}>
                {isBookmarked ? '★ Saved' : '☆ Save'}
              </button>
            </div>

            {/* Question text */}
            <h2 className="mcq-question-text">{currentQuestion.question}</h2>

            {/* Code Snippet */}
            {currentQuestion.codeSnippet && (
              <div className="mcq-code-block">
                <div className="mcq-code-header">
                  <span className="mcq-code-dot" style={{ background: '#ef4444' }} />
                  <span className="mcq-code-dot" style={{ background: '#f59e0b' }} />
                  <span className="mcq-code-dot" style={{ background: '#22c55e' }} />
                  <span style={{ fontSize: '0.6rem', color: 'var(--mcq-text-muted)', marginLeft: '8px', fontFamily: 'monospace' }}>
                    {currentQuestion.technology || 'code'}.js
                  </span>
                </div>
                <pre className="mcq-code-pre">{currentQuestion.codeSnippet}</pre>
              </div>
            )}

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}
              role="group" aria-label="Answer options">
              {view.options.map((opt, i) => {
                const isSelected = selectedAnswers.includes(i);
                const isCorrectOpt = submitted && view.correct.includes(i);
                const isWrongSelected = submitted && isSelected && !isCorrectOpt;
                const isDimmed = submitted && !isCorrectOpt && !isSelected;

                let cls = '';
                if (submitted) {
                  cls = isCorrectOpt ? 'correct' : isWrongSelected ? 'wrong' : isDimmed ? 'dimmed' : '';
                } else if (isSelected) {
                  cls = 'selected';
                }

                return (
                  <button
                    key={i}
                    className={`mcq-option-btn ${cls}`}
                    onClick={() => handleOptionClick(i)}
                    disabled={submitted}
                    role={isMultiSelect ? 'checkbox' : 'radio'}
                    aria-checked={isSelected}
                    aria-label={`Option ${String.fromCharCode(65+i)}: ${opt}`}
                  >
                    <span className="mcq-option-letter">
                      {submitted && isCorrectOpt ? '✓' : submitted && isWrongSelected ? '✗' : String.fromCharCode(65+i)}
                    </span>
                    <span className="mcq-option-text">{opt}</span>
                    {!submitted && (
                      <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: 'var(--mcq-text-muted)', flexShrink: 0, fontFamily: 'monospace', opacity: 0.6 }}>
                        {i + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Keyboard hints */}
            {!submitted && (
              <div className="mcq-kbd-hints" style={{ marginBottom: '16px' }}>
                <span className="mcq-kbd-hint"><span className="mcq-kbd">1-4</span> select</span>
                <span className="mcq-kbd-hint"><span className="mcq-kbd">↵</span> submit</span>
              </div>
            )}

            {/* Submit / Feedback / Next */}
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswers.length === 0}
                className="mcq-btn-primary"
                style={{ fontSize: '0.85rem', padding: '10px 24px', opacity: selectedAnswers.length === 0 ? 0.4 : 1, cursor: selectedAnswers.length === 0 ? 'not-allowed' : 'pointer' }}
                aria-label="Submit answer"
              >
                Submit Answer
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>
                </svg>
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                {/* Feedback Panel */}
                <div className={`mcq-feedback-panel ${isCorrect ? 'correct' : 'wrong'}`}>
                  <div className="mcq-feedback-header">
                    <div className="mcq-feedback-icon">
                      {isCorrect ? '✅' : '❌'}
                    </div>
                    <span style={{ fontWeight: 700, color: isCorrect ? '#4ade80' : '#f87171', fontSize: '0.9rem' }}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                    {isCorrect && (
                      <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>
                        +{currentQuestion.xpReward || 10} XP
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--mcq-text-body)', lineHeight: 1.6, marginBottom: '10px' }}>
                    {currentQuestion.explanation}
                  </p>

                  <div style={{
                    padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(37,99,235,0.1)',
                    background: 'rgba(37,99,235,0.04)',
                  }}>
                    <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '3px' }}>
                      Key Concept
                    </span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--mcq-text-body)', lineHeight: 1.5, margin: 0 }}>
                      {currentQuestion.keyConcept}
                    </p>
                  </div>

                  {currentQuestion.tags?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                      {currentQuestion.tags.map(t => (
                        <span key={t} style={{
                          padding: '2px 6px', borderRadius: 4, fontSize: '0.58rem',
                          background: 'var(--mcq-surface-20)', color: 'var(--mcq-text-muted)',
                        }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={handleNext} className="mcq-btn-primary" style={{ fontSize: '0.85rem', padding: '10px 24px' }}>
                    {currentIndex + 1 >= totalQ ? 'See Results 🎯' : 'Next Question →'}
                  </button>
                  <span className="mcq-kbd-hint" style={{ fontSize: '0.65rem' }}>
                    <span className="mcq-kbd">Space</span> or <span className="mcq-kbd">↵</span> to continue
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16 max-w-4xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">❓</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                {cat.name} Interactive Quiz Player
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Interactive practice mode with real-time feedback, spaced-repetition flashcard generation, keyboard shortcuts, and performance tracking.
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
              <span>🚀</span> Visualizers & Hubs
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}mcq`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> All MCQ Categories
                </a>
              </li>
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
              {mode.toUpperCase()} MODE ACTIVE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
