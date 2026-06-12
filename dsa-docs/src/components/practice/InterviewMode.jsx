import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { SNIPPET_QUESTIONS } from "../../data/questions.js";

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Mixed"];
const QUESTION_COUNTS = [5, 10, 15, 20];
const TIME_LIMITS = [
  { label: "30s per question", value: 30 },
  { label: "60s per question", value: 60 },
  { label: "90s per question", value: 90 },
  { label: "No limit", value: 0 },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateOptions(question, allQuestions) {
  const correct = question.expectedOutput;
  // Collect wrong options from other questions
  const others = allQuestions
    .filter((q) => q.id !== question.id && q.expectedOutput !== correct)
    .map((q) => q.expectedOutput);
  const wrongs = shuffle(others).slice(0, 3);
  // If not enough wrongs, add some common wrong answers
  while (wrongs.length < 3) {
    wrongs.push(`undefined`);
  }
  const options = shuffle([correct, ...wrongs.slice(0, 3)]);
  return { options, correct };
}

const SCORE_STORAGE_KEY = "prac-interview-scores";

function getStoredScores() {
  try {
    return JSON.parse(sessionStorage.getItem(SCORE_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function storeScore(score) {
  const scores = getStoredScores();
  scores.push({ ...score, date: Date.now() });
  // Keep last 20 sessions
  if (scores.length > 20) scores.shift();
  sessionStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
}

export default function InterviewMode({ onSelectCode }) {
  const [phase, setPhase] = useState("setup"); // setup | playing | review | results
  const [settings, setSettings] = useState({
    difficulty: "Mixed",
    count: 10,
    timeLimit: 60,
  });
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startInterview = useCallback(() => {
    let pool = SNIPPET_QUESTIONS;
    if (settings.difficulty !== "Mixed") {
      pool = pool.filter((q) => q.difficulty === settings.difficulty);
    }
    if (pool.length === 0) {
      setError(`No questions found for difficulty: ${settings.difficulty}. Try "All Levels" instead.`);
      return;
    }
    const selected = shuffle(pool).slice(0, settings.count);
    const withOptions = selected.map((q) => ({
      ...q,
      ...generateOptions(q, SNIPPET_QUESTIONS),
    }));
    setQuestions(withOptions);
    setCurrent(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsTimeUp(false);
    startTimeRef.current = Date.now();
    if (settings.timeLimit > 0) {
      setTimeLeft(settings.timeLimit);
    }
    setError(null);
    setPhase("playing");
  }, [settings]);

  // Timer effect
  useEffect(() => {
    if (phase !== "playing" || settings.timeLimit === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, settings.timeLimit, current]);

  // Auto-show feedback when time is up
  useEffect(() => {
    if (isTimeUp && !showFeedback) {
      setShowFeedback(true);
      const q = questions[current];
      if (q) {
        setAnswers((prev) => [
          ...prev,
          {
            questionId: q.id,
            selected: null,
            correct: false,
            timeUp: true,
            skipped: true,
          },
        ]);
      }
    }
  }, [isTimeUp, showFeedback, current, questions]);

  const handleSelect = (option) => {
    if (showFeedback || isTimeUp) return;
    setSelectedOption(option);
    setShowFeedback(true);
    const q = questions[current];
    const isCorrect = option === q.correct;
    setAnswers((prev) => [
      ...prev,
      {
        questionId: q.id,
        selected: option,
        correct: isCorrect,
        timeUp: false,
        skipped: false,
      },
    ]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsTimeUp(false);
      if (settings.timeLimit > 0) {
        setTimeLeft(settings.timeLimit);
      }
    } else {
      // End of interview
      finishInterview();
    }
  };

  const finishInterview = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const totalTime = Math.round((Date.now() - startTimeRef.current) / 1000);
    const correct = answers.filter((a) => a.correct).length;
    const score = {
      correct,
      total: answers.length,
      accuracy: answers.length > 0 ? Math.round((correct / answers.length) * 100) : 0,
      time: totalTime,
      difficulty: settings.difficulty,
      answers,
    };
    storeScore(score);
    setPhase("results");
  };

  const skipToResults = () => {
    // Fill remaining questions as skipped
    const remaining = questions.slice(answers.length).map((q) => ({
      questionId: q.id,
      selected: null,
      correct: false,
      timeUp: false,
      skipped: true,
    }));
    setAnswers((prev) => [...prev, ...remaining]);
    finishInterview();
  };

  const diffColor = (d) =>
    d === "Easy" ? "#22c55e" : d === "Medium" ? "#f59e0b" : "#ef4444";

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const base = import.meta.env.BASE_URL || "/";

  // ─── SETUP PHASE ───
  if (phase === "setup") {
    const pastScores = getStoredScores();
    const stats = pastScores.length > 0
      ? {
          total: pastScores.reduce((s, x) => s + x.total, 0),
          correct: pastScores.reduce((s, x) => s + x.correct, 0),
          sessions: pastScores.length,
          avgAcc: Math.round(
            pastScores.reduce((s, x) => s + x.accuracy, 0) / pastScores.length
          ),
        }
      : null;

    return (
      <div className="interview-setup">
        <div className="interview-setup-header">
          <div className="interview-setup-icon">🎤</div>
          <h2>Interview Mode</h2>
          <p>Test your JavaScript knowledge under timed conditions. Get scored instantly with detailed analytics.</p>
        </div>

        {error && (
          <div className="interview-error-banner">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {stats && (
          <div className="interview-stats-bar">
            <div className="interview-stat-item">
              <span className="interview-stat-val">{stats.sessions}</span>
              <span className="interview-stat-lbl">Sessions</span>
            </div>
            <div className="interview-stat-item">
              <span className="interview-stat-val">{stats.avgAcc}%</span>
              <span className="interview-stat-lbl">Avg Accuracy</span>
            </div>
            <div className="interview-stat-item">
              <span className="interview-stat-val">{stats.correct}/{stats.total}</span>
              <span className="interview-stat-lbl">Total Solved</span>
            </div>
          </div>
        )}

        <div className="interview-settings">
          <div className="interview-setting-group">
            <label>Difficulty</label>
            <div className="interview-chip-group">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  className={`interview-chip ${settings.difficulty === d ? "active" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, difficulty: d }))}
                >
                  {d === "Mixed" ? "All Levels" : d}
                </button>
              ))}
            </div>
          </div>

          <div className="interview-setting-group">
            <label>Questions</label>
            <div className="interview-chip-group">
              {QUESTION_COUNTS.map((c) => (
                <button
                  key={c}
                  className={`interview-chip ${settings.count === c ? "active" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, count: c }))}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="interview-setting-group">
            <label>Time Limit</label>
            <div className="interview-chip-group">
              {TIME_LIMITS.map((t) => (
                <button
                  key={t.value}
                  className={`interview-chip ${settings.timeLimit === t.value ? "active" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, timeLimit: t.value }))}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="interview-start-btn" onClick={startInterview}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Start Interview
        </button>
      </div>
    );
  }

  // ─── PLAYING / REVIEW PHASE ───
  if (phase === "playing" || phase === "review") {
    const q = questions[current];
    if (!q) return null;
    const progress = ((current + 1) / questions.length) * 100;
    const isReview = phase === "review";
    const answered = answers[current];
    const isCorrect = answered?.correct;

    return (
      <div className="interview-playing">
        {/* Top bar */}
        <div className="interview-topbar">
          <div className="interview-progress-info">
            <span className="interview-q-counter">
              Question {current + 1} of {questions.length}
            </span>
            <span className="interview-diff-badge" style={{ color: diffColor(q.difficulty), background: `${diffColor(q.difficulty)}15` }}>
              {q.difficulty}
            </span>
            <span className="interview-topic-badge">{q.topic}</span>
          </div>
          <div className="interview-topbar-right">
            {settings.timeLimit > 0 && (
              <div className={`interview-timer ${timeLeft <= 10 ? "warning" : ""}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {formatTime(timeLeft)}
              </div>
            )}
            <span className="interview-score-inline">
              {answers.filter((a) => a.correct).length}/{answers.length} correct
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="interview-progress-track">
          <div className="interview-progress-fill" style={{ width: `${progress}%` }} />
          <div className="interview-progress-dots">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`interview-dot ${
                  i < answers.length
                    ? answers[i]?.correct
                      ? "correct"
                      : "wrong"
                    : i === current
                    ? "active"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="interview-body">
          {/* Question */}
          <div className="interview-question-area">
            <h3 className="interview-question-title">{q.title}</h3>
            <p className="interview-question-desc">What is the output of this code?</p>
            <pre className="interview-code-block"><code>{q.code}</code></pre>
          </div>

          {/* Options */}
          <div className="interview-options-area">
            {q.options.map((opt, i) => {
              let cls = "interview-option";
              if (showFeedback || isReview) {
                if (opt === q.correct) cls += " correct";
                if (opt === selectedOption && !isCorrect) cls += " wrong";
                if (answered?.selected === opt && !answered?.correct) cls += " wrong";
                if (answered?.selected === opt && answered?.correct) cls += " correct";
              }
              if (selectedOption === opt && !showFeedback) cls += " selected";
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleSelect(opt)}
                  disabled={showFeedback || isReview}
                >
                  <span className="interview-opt-label">{String.fromCharCode(65 + i)}</span>
                  <code className="interview-opt-code">{opt}</code>
                  {(showFeedback || isReview) && opt === q.correct && (
                    <span className="interview-opt-check">✓</span>
                  )}
                  {(showFeedback || isReview) && opt === selectedOption && !isCorrect && (
                    <span className="interview-opt-cross">✗</span>
                  )}
                </button>
              );
            })}

            {/* Feedback */}
            {(showFeedback || isReview) && (
              <div className={`interview-feedback ${isCorrect ? "correct" : "wrong"}`}>
                <div className="interview-feedback-header">
                  <span className="interview-feedback-icon">{isCorrect ? "✅" : "❌"}</span>
                  <span className="interview-feedback-title">
                    {isCorrect ? "Correct!" : answered?.timeUp ? "Time's Up!" : "Incorrect"}
                  </span>
                </div>
                <div className="interview-feedback-detail">
                  <h4>Expected Output</h4>
                  <pre className="interview-output-block">{q.expectedOutput}</pre>
                  <h4>Explanation</h4>
                  <p>{q.explanation}</p>
                </div>
                <div className="interview-feedback-actions">
                  <button className="interview-try-btn" onClick={() => { if (onSelectCode) onSelectCode(q.code); }}>
                    Try in Playground
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="interview-nav">
              <button className="interview-nav-btn primary" onClick={nextQuestion}>
                {current < questions.length - 1 ? "Next Question →" : "See Results →"}
              </button>
              <button className="interview-nav-btn ghost" onClick={skipToResults}>
                Skip to Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULTS PHASE ───
  if (phase === "results") {
    const correct = answers.filter((a) => a.correct).length;
    const total = answers.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const answered = answers.filter((a) => !a.skipped).length;
    const timeTaken = answers.reduce((s, a) => s + (a.timeUp ? 0 : 0), 0);
    const totalTime = Math.round((Date.now() - startTimeRef.current) / 1000);

    const getGrade = (pct) => {
      if (pct >= 90) return { label: "Excellent!", color: "#22c55e" };
      if (pct >= 70) return { label: "Good!", color: "#60a5fa" };
      if (pct >= 50) return { label: "Fair", color: "#f59e0b" };
      return { label: "Keep Practicing", color: "#ef4444" };
    };
    const grade = getGrade(accuracy);

    return (
      <div className="interview-results">
        {/* Score Hero */}
        <div className="interview-results-hero">
          <div className="interview-grade-ring" style={{ borderColor: grade.color }}>
            <span className="interview-grade-pct" style={{ color: grade.color }}>{accuracy}%</span>
            <span className="interview-grade-label" style={{ color: grade.color }}>{grade.label}</span>
          </div>
          <div className="interview-results-stats">
            <div className="interview-result-stat">
              <span className="interview-result-num">{correct}/{total}</span>
              <span className="interview-result-lbl">Correct</span>
            </div>
            <div className="interview-result-stat">
              <span className="interview-result-num">{answered}</span>
              <span className="interview-result-lbl">Answered</span>
            </div>
            <div className="interview-result-stat">
              <span className="interview-result-num">{formatTime(totalTime)}</span>
              <span className="interview-result-lbl">Total Time</span>
            </div>
            <div className="interview-result-stat">
              <span className="interview-result-num">{settings.count}</span>
              <span className="interview-result-lbl">Questions</span>
            </div>
          </div>
        </div>

        {/* Per-question breakdown */}
        <div className="interview-breakdown">
          <h3>Question Breakdown</h3>
          <div className="interview-breakdown-list">
            {questions.map((q, i) => {
              const a = answers[i];
              const isCorrect = a?.correct;
              return (
                <div key={q.id} className={`interview-breakdown-item ${isCorrect ? "correct" : "wrong"}`}>
                  <div className="interview-bd-left">
                    <span className="interview-bd-icon">{isCorrect ? "✅" : "❌"}</span>
                    <div>
                      <span className="interview-bd-title">{q.title}</span>
                      <span className="interview-bd-difficulty" style={{ color: diffColor(q.difficulty) }}>
                        {q.difficulty} · {q.topic}
                      </span>
                    </div>
                  </div>
                  <div className="interview-bd-right">
                    {a?.timeUp ? (
                      <span className="interview-bd-timeup">Time up</span>
                    ) : a?.skipped ? (
                      <span className="interview-bd-skipped">Skipped</span>
                    ) : (
                      <code className="interview-bd-answer">{a?.selected}</code>
                    )}
                    <button className="interview-bd-preview-btn" onClick={() => {
                      setCurrent(i);
                      setPhase("review");
                    }}>
                      Review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="interview-results-actions">
          <button className="interview-start-btn" onClick={() => setPhase("setup")}>
            Try Again
          </button>
          <button className="interview-start-btn ghost" onClick={() => setPhase("setup")}>
            Change Settings
          </button>
        </div>
      </div>
    );
  }

  return null;
}
