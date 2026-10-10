import { useState } from 'react';
import { getVisualizerQuiz } from '../../data/visualizers/quizData.js';

export default function VisualizerQuiz({ topicId }) {
  const quiz = getVisualizerQuiz(topicId);
  if (!quiz || quiz.length === 0) return null;

  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const handleSelect = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return; // already answered
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanation((prev) => ({ ...prev, [qIdx]: true }));
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).reduce((acc, [qIdx, optIdx]) => {
    return optIdx === quiz[qIdx]?.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="sketch-border bg-[var(--sketch-bg-dim)] mt-10 mb-8 rounded-2xl p-5 md:p-8 font-sketch shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ACTIVE RECALL PRACTICE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-header text-[var(--sketch-text)] flex items-center gap-3">
            <span>🧠</span> Test Your Understanding
          </h3>
          <p className="text-sm text-[var(--sketch-text-muted)] mt-1">
            Check your conceptual grasp with high-yield interview questions based on this visualization.
          </p>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl font-mono text-xs text-amber-300">
            <span>Score:</span>
            <span className="font-bold text-sm text-amber-400">
              {correctCount} / {quiz.length}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {quiz.map((q, qIdx) => {
          const selected = answers[qIdx];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={qIdx}
              className="sketch-border bg-[var(--sketch-bg)] p-5 rounded-2xl shadow-sm transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-500/20 text-amber-500 font-header font-bold text-sm flex items-center justify-center border border-amber-500/40">
                  Q{qIdx + 1}
                </span>
                <p className="text-[var(--sketch-text)] text-base md:text-lg font-medium leading-relaxed">
                  {q.question}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid sm:grid-cols-2 gap-2.5 mb-3">
                {q.options.map((opt, optIdx) => {
                  let btnStyle =
                    'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)] hover:border-amber-500/60 hover:bg-amber-500/5';

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle =
                        'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold shadow-sm shadow-emerald-500/20';
                    } else if (optIdx === selected) {
                      btnStyle =
                        'border-rose-500 bg-rose-500/15 text-rose-300 font-semibold';
                    } else {
                      btnStyle =
                        'border-[var(--sketch-border)] opacity-50 bg-[var(--sketch-bg-dim)] text-[var(--sketch-text-muted)] cursor-not-allowed';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      disabled={isAnswered}
                      className={`text-left p-3.5 rounded-xl border transition-all text-sm md:text-base flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="font-mono text-xs font-bold opacity-75 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      )}
                      {isAnswered && optIdx === selected && !isCorrect && (
                        <span className="text-rose-400 font-bold shrink-0">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {isAnswered && (
                <div
                  className={`p-3.5 rounded-xl text-sm leading-relaxed mt-3 flex items-start gap-2.5 border ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <span className="shrink-0 text-base">
                    {isCorrect ? '🎉' : '💡'}
                  </span>
                  <div>
                    <span className="font-bold">
                      {isCorrect ? 'Correct! ' : 'Explanation: '}
                    </span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner & Next Step CTA */}
      {answeredCount === quiz.length && (
        <div className="mt-6 pt-5 border-t border-[var(--sketch-border)] flex flex-wrap items-center justify-between gap-4 bg-amber-500/5 p-4 rounded-xl border border-amber-500/20">
          <div>
            <div className="text-sm font-bold text-amber-400">
              {correctCount === quiz.length
                ? '🏆 Outstanding! 100% on conceptual mastery.'
                : '📚 Good practice! Review the explanations above to solidify.'}
            </div>
            <div className="text-xs text-[var(--sketch-text-muted)] mt-0.5">
              Want more questions? Our interactive MCQ engine covers all 15+ DSA & System Design topics.
            </div>
          </div>
          <a
            href="/mcq"
            className="sketch-button px-4 py-2 text-sm font-header font-bold bg-amber-500 text-black hover:bg-amber-400 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Explore MCQ Quiz Hub</span>
            <span>→</span>
          </a>
        </div>
      )}
    </div>
  );
}
