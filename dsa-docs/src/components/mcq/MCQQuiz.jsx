import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ThemeToggle from '../ThemeToggle.jsx';
import { motion } from 'framer-motion';
import { MCQ_CATEGORIES, getQuestionsForCategory } from './MCQData.js';
import { getInitialProgress, recordAnswer, getAccuracy, getStreakInfo } from './MCQStore.js';

const MODE_CONFIG = {
  practice: { label: 'Practice', desc: 'Instant feedback. Learn as you go.', icon: '📝' },
  assessment: { label: 'Assessment', desc: 'Timed test. Results at the end.', icon: '⏱️' },
  interview: { label: 'Interview', desc: 'Random mix. Real simulation.', icon: '🎯' },
};

export default function MCQQuiz({ categoryId, initialTopic }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [mode, setMode] = useState('practice');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showSetup, setShowSetup] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [xpGained, setXpGained] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const timerRef = useRef(null);

  const cat = MCQ_CATEGORIES.find(c => c.id === categoryId);

  useEffect(() => {
    setLoaded(true);
    setProgress(getInitialProgress());
    const qs = getQuestionsForCategory(categoryId);
    setAllQuestions(qs);
  }, [categoryId]);

  // Timer for assessment mode
  useEffect(() => {
    if (mode === 'assessment' && quizStarted && !quizFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [mode, quizStarted, quizFinished]);

  const filteredQuestions = useMemo(() => {
    let qs = [...allQuestions];
    if (initialTopic && initialTopic !== 'all') {
      qs = qs.filter(q => q.topic === initialTopic);
    }
    if (selectedDifficulty !== 'all') {
      qs = qs.filter(q => q.difficulty === selectedDifficulty);
    }
    return qs;
  }, [allQuestions, initialTopic, selectedDifficulty]);

  const shuffledQuestions = useMemo(() => {
    const qs = [...filteredQuestions];
    if (mode === 'interview') {
      return qs.sort(() => Math.random() - 0.5).slice(0, Math.min(questionCount, qs.length));
    }
    if (mode === 'assessment') {
      return qs.slice(0, Math.min(questionCount, qs.length));
    }
    return qs.slice(0, Math.min(questionCount, qs.length));
  }, [filteredQuestions, mode, questionCount]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const isMultiSelect = currentQuestion?.correctAnswer.length > 1;
  const progressPct = totalQuestions > 0 ? ((currentIndex + (submitted ? 1 : 0)) / totalQuestions) * 100 : 0;

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  // ─── Handlers ───

  const handleOptionClick = useCallback((index) => {
    if (submitted) return;
    setSelectedAnswers(prev => {
      if (isMultiSelect) {
        return prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
      }
      return [index];
    });
  }, [submitted, isMultiSelect]);

  const handleSubmit = useCallback(() => {
    if (!currentQuestion || selectedAnswers.length === 0) return;
    setSubmitted(true);

    const correct = arraysEqual(
      [...selectedAnswers].sort(),
      [...currentQuestion.correctAnswer].sort()
    );
    setIsCorrect(correct);

    if (correct) {
      setStreakCount(prev => prev + 1);
    } else {
      setStreakCount(0);
    }

    setXpGained(prev => prev + (correct ? currentQuestion.xpReward : 0));

    const newProgress = recordAnswer(progress, currentQuestion, selectedAnswers);
    setProgress(newProgress);
  }, [currentQuestion, selectedAnswers, progress]);

  const handleNext = useCallback(() => {
    const result = {
      question: currentQuestion,
      selected: selectedAnswers,
      correct: isCorrect,
    };
    setQuizResults(prev => [...prev, result]);

    if (currentIndex + 1 >= totalQuestions) {
      finishQuiz();
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setSubmitted(false);
      setIsCorrect(null);
    }
  }, [currentIndex, totalQuestions, currentQuestion, selectedAnswers, isCorrect]);

  function finishQuiz() {
    setQuizFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
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
      setTimeLeft(totalQuestions * 60);
    }
  }, [mode, totalQuestions]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !submitted && selectedAnswers.length > 0) {
      handleSubmit();
    } else if ((e.key === 'Enter' || e.key === ' ') && submitted) {
      handleNext();
    }
  }, [submitted, selectedAnswers, handleSubmit, handleNext]);

  const diffColor = {
    easy: '#22c55e',
    medium: '#f59e0b',
    hard: '#ef4444',
    expert: '#a78bfa',
  }[currentQuestion?.difficulty] || '#64748b';

  if (!cat) {
    return <div className="min-h-screen bg-[var(--mcq-bg)] flex items-center justify-center"><p className="text-[var(--mcq-text-secondary)]">Category not found</p></div>;
  }

  // ─── Setup Screen ───
  if (showSetup) {
    return (
      <div className="min-h-screen bg-[var(--mcq-bg)] text-[var(--mcq-text)] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full">
          <a href={`${base}mcq/${categoryId}`} className="inline-flex items-center gap-1.5 text-sm text-[var(--mcq-text-secondary)] hover:text-[var(--mcq-text-primary)] mb-8 transition-colors no-underline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to {cat.name}
          </a>

          <div className="text-center mb-8">
            <span className="text-4xl mb-3 block">{cat.icon}</span>
            <h1 className="text-2xl font-bold text-[var(--mcq-text-primary)] mb-2">Quiz Setup</h1>
            <p className="text-sm text-[var(--mcq-text-secondary)]">{cat.name} — {filteredQuestions.length} questions available</p>
          </div>

          {/* Mode selection */}
          <div className="space-y-2 mb-6">
            <label className="text-[0.65rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">Quiz Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(MODE_CONFIG).map(([key, config]) => (
                <button key={key} onClick={() => setMode(key)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    mode === key ? 'border-blue-400/40 bg-blue-500/10' : 'border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] hover:bg-[var(--mcq-surface-hover)]'
                  }`}>
                  <span className="text-lg block mb-1">{config.icon}</span>
                  <span className="text-xs font-semibold text-[var(--mcq-text-primary)] block">{config.label}</span>
                  <span className="text-[0.6rem] text-[var(--mcq-text-muted)]">{config.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2 mb-6">
            <label className="text-[0.65rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">Difficulty</label>
            <div className="flex gap-2">
              {['all', 'easy', 'medium', 'hard'].map(d => (
                <button key={d} onClick={() => setSelectedDifficulty(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedDifficulty === d ? 'border-blue-400/30 bg-blue-500/10 text-blue-400' : 'border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-[var(--mcq-text-primary)] hover:bg-[var(--mcq-surface-20)]'
                  }`}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div className="space-y-2 mb-8">
            <label className="text-[0.65rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">Questions</label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map(n => (
                <button key={n} onClick={() => setQuestionCount(n)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    questionCount === n ? 'border-blue-400/30 bg-blue-500/10 text-blue-400' : 'border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-[var(--mcq-text-primary)] hover:bg-[var(--mcq-surface-20)]'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button onClick={startQuiz} className="mcq-btn-primary w-full justify-center text-base py-3">
            {mode === 'practice' ? 'Start Practice' : mode === 'assessment' ? 'Start Assessment' : 'Start Interview'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── Results Screen ───
  if (quizFinished) {
    const correctCount = quizResults.filter(r => r.correct).length;
    const finalAccuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    return (
      <div className="min-h-screen bg-[var(--mcq-bg)] text-[var(--mcq-text)] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full">
          {/* Result header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4"
              style={{ borderColor: finalAccuracy >= 70 ? '#22c55e' : finalAccuracy >= 40 ? '#f59e0b' : '#ef4444' }}>
              {finalAccuracy >= 70 ? '🎉' : finalAccuracy >= 40 ? '👍' : '💪'}
            </div>
            <h1 className="text-2xl font-bold text-[var(--mcq-text-primary)] mb-1">
              {finalAccuracy >= 90 ? 'Outstanding!' : finalAccuracy >= 70 ? 'Great Job!' : finalAccuracy >= 50 ? 'Nice Try!' : 'Keep Practicing!'}
            </h1>
            <p className="text-[var(--mcq-text-secondary)] text-sm">{mode === 'assessment' ? 'Assessment Complete' : 'Quiz Complete'}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] text-center">
              <span className="text-2xl font-extrabold text-[var(--mcq-text-primary)] block">{finalAccuracy}%</span>
              <span className="text-[0.6rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">Accuracy</span>
            </div>
            <div className="p-4 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] text-center">
              <span className="text-2xl font-extrabold text-[var(--mcq-text-primary)] block">{correctCount}/{totalQuestions}</span>
              <span className="text-[0.6rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">Correct</span>
            </div>
            <div className="p-4 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] text-center">
              <span className="text-2xl font-extrabold text-[var(--mcq-text-primary)] block">+{xpGained}</span>
              <span className="text-[0.6rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">XP Earned</span>
            </div>
            <div className="p-4 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] text-center">
              <span className="text-2xl font-extrabold text-[var(--mcq-text-primary)] block">{streakCount > 0 ? `🔥 ${streakCount}` : '—'}</span>
              <span className="text-[0.6rem] font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider">Best Streak</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-[var(--mcq-text-muted)] uppercase tracking-wider mb-3">Question Breakdown</h3>
            <div className="space-y-1.5">
              {quizResults.map((r, i) => (
                <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg text-xs border ${
                  r.correct ? 'border-green-500/15 bg-green-500/5' : 'border-red-500/15 bg-red-500/5'
                }`}>
                  <span className="flex items-center gap-2">
                    <span>{r.correct ? '✅' : '❌'}</span>
                    <span className="text-[var(--mcq-text-body)] truncate max-w-[200px]">{r.question.question.slice(0, 50)}...</span>
                  </span>
                  <span className="text-[var(--mcq-text-muted)]">{r.question.xpReward} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={startQuiz} className="mcq-btn-primary flex-1 justify-center">Try Again</button>
            <a href={`${base}mcq/${categoryId}`} className="mcq-btn-secondary flex-1 justify-center">Category</a>
            <a href={`${base}mcq`} className="mcq-btn-ghost flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Quiz Active ───
  if (!currentQuestion) {
    return <div className="min-h-screen bg-[var(--mcq-bg)] flex items-center justify-center"><p className="text-[var(--mcq-text-secondary)]">No questions available</p></div>;
  }

  return (
    <div className="min-h-screen bg-[var(--mcq-bg)] text-[var(--mcq-text)]" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Quiz Top Bar */}
      <div className="sticky top-0 z-50 bg-[var(--mcq-nav-bg)] backdrop-blur-md border-b border-[var(--mcq-border)]">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-12">
          <div className="flex items-center gap-3">
            <a href={`${base}mcq/${categoryId}`} className="text-[var(--mcq-text-muted)] hover:text-[var(--mcq-text-primary)] transition-colors no-underline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            </a>
            <span className="text-xs text-[var(--mcq-text-muted)] font-medium">{cat.icon} {cat.name}</span>
            <span className="text-[0.6rem] font-semibold px-2 py-0.5 rounded border"
              style={{ background: `${MODE_CONFIG[mode] ? 'rgba(96,165,250,0.1)' : 'rgba(255,255,255,0.05)'}`, borderColor: 'var(--mcq-border)', color: '#93c5fd' }}>
              {MODE_CONFIG[mode]?.label}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {mode === 'assessment' && timeLeft !== null && (
              <span className={`text-xs font-mono font-semibold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-[var(--mcq-text-muted)]'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            )}
            <span className="text-xs text-[var(--mcq-text-muted)]">{currentIndex + 1}/{totalQuestions}</span>
            <span className="text-xs text-yellow-400">✦ {progress?.xp || 0}</span>
            <ThemeToggle />
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-[var(--mcq-border-light)]">
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Question Area */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {/* Question Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{ background: `${diffColor}15`, color: diffColor, borderColor: `${diffColor}25` }}>
              {currentQuestion.difficulty}
            </span>
            <span className="text-xs text-[var(--mcq-text-muted)]">Topic: {currentQuestion.topic}</span>
            {isMultiSelect && (
              <span className="text-[0.6rem] font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Multiple Select
              </span>
            )}
            <span className="text-[0.6rem] text-yellow-500/70 ml-auto">+{currentQuestion.xpReward} XP</span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-[var(--mcq-text-primary)] mb-4 leading-relaxed">{currentQuestion.question}</h2>

          {/* Code Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="mb-6 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-code-bg)] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--mcq-border)] bg-[var(--mcq-snippet-header)]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-[0.6rem] text-[var(--mcq-text-muted)] ml-2 font-mono">code.js</span>
              </div>
              <pre className="p-4 text-sm leading-relaxed font-mono text-[var(--mcq-text-body)] overflow-x-auto whitespace-pre-wrap m-0">{currentQuestion.codeSnippet}</pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5 mb-6">
            {currentQuestion.options.map((opt, i) => {
              let optionClass = 'border-[var(--mcq-border-strong)] bg-[var(--mcq-surface-20)] hover:bg-[var(--mcq-surface-hover)] hover:border-[var(--mcq-border-hover)]';
              let isSelected = selectedAnswers.includes(i);

              if (submitted) {
                const isCorrectOpt = currentQuestion.correctAnswer.includes(i);
                if (isCorrectOpt) {
                  optionClass = 'border-green-500/30 bg-green-500/10';
                } else if (isSelected && !isCorrectOpt) {
                  optionClass = 'border-red-500/30 bg-red-500/10';
                } else {
                  optionClass = 'border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] opacity-50';
                }
              } else if (isSelected) {
                optionClass = 'border-blue-400/40 bg-blue-500/10';
              }

              return (
                <button key={i} onClick={() => handleOptionClick(i)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-lg border text-left transition-all duration-200 ${
                    submitted ? 'cursor-default' : 'cursor-pointer'
                  } ${optionClass}`}
                  disabled={submitted}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                    submitted && currentQuestion.correctAnswer.includes(i)
                      ? 'bg-green-500/20 text-green-400'
                      : submitted && isSelected
                      ? 'bg-red-500/20 text-red-400'
                      : isSelected
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-[var(--mcq-surface-20)] text-[var(--mcq-text-muted)]'
                  }`}>
                    {submitted && currentQuestion.correctAnswer.includes(i) ? '✓' : submitted && isSelected ? '✗' : String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm text-[var(--mcq-text-body)] leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Submit / Next */}
          {!submitted ? (
            <button onClick={handleSubmit} disabled={selectedAnswers.length === 0}
              className={`mcq-btn-primary px-8 py-2.5 text-sm ${selectedAnswers.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}>
              Submit Answer
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="12" x2="2" y2="12"/><polyline points="5 9 2 12 5 15"/></svg>
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {/* Feedback */}
              <div className={`p-4 rounded-xl border mb-4 ${
                isCorrect ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                  <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>

                {/* Explanation */}
                <div className="text-xs text-[var(--mcq-text-body)] leading-relaxed mb-2">{currentQuestion.explanation}</div>

                {/* Key Concept */}
                <div className="mt-2 p-2.5 rounded-lg border border-blue-400/10 bg-blue-500/5">
                  <span className="text-[0.6rem] font-semibold text-blue-400 uppercase tracking-wider">Key Concept</span>
                  <p className="text-xs text-[var(--mcq-text-body)] mt-0.5">{currentQuestion.keyConcept}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentQuestion.tags.map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded text-[0.55rem] bg-[var(--mcq-surface-20)] text-[var(--mcq-text-muted)]">{t}</span>
                  ))}
                </div>
              </div>

              <button onClick={handleNext} className="mcq-btn-primary px-8 py-2.5 text-sm">
                {currentIndex + 1 >= totalQuestions ? 'See Results' : 'Next Question'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mcq-quiz-footer">
        <div className="quiz-footer-inner">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
        </div>
      </footer>
    </div>
  );
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
