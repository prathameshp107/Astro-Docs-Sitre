import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBacktrackingStore } from '../../store/visualizers/backtrackingStore';

const NQUEENS_CODE = [
  { line: 1, text: 'function solveNQueens(board, row):' },
  { line: 2, text: '    if row == N: record solution, return' },
  { line: 3, text: '    for col from 0 to N-1:' },
  { line: 4, text: '        if isValid(board, row, col):' },
  { line: 5, text: '            place Queen at (row, col)' },
  { line: 6, text: '            solveNQueens(board, row + 1)' },
  { line: 7, text: '            remove Queen at (row, col) // Backtrack' },
];

const SUDOKU_CODE = [
  { line: 1, text: 'function solveSudoku(board):' },
  { line: 2, text: '    find empty cell (row, col)' },
  { line: 3, text: '    for num from 1 to N:' },
  { line: 4, text: '        if isValidPlacement(board, row, col, num):' },
  { line: 5, text: '            board[row][col] ← num' },
  { line: 6, text: '            if solveSudoku(board) return true' },
  { line: 7, text: '            board[row][col] ← empty // Backtrack' },
];

const SUBSETS_CODE = [
  { line: 1, text: 'function generateSubsets(index, path):' },
  { line: 2, text: '    if index == N: result.add(path), return' },
  { line: 3, text: '    path.add(arr[index]) // Include' },
  { line: 4, text: '    generateSubsets(index + 1, path)' },
  { line: 5, text: '    path.pop() // Exclude (Backtrack)' },
  { line: 6, text: '    generateSubsets(index + 1, path)' },
];

const CODE_MAP = {
  'n-queens': NQUEENS_CODE,
  'sudoku': SUDOKU_CODE,
  'subsets': SUBSETS_CODE,
};

const TRACK_TITLES = {
  'n-queens': '1. N-Queens Problem (4x4 Chessboard)',
  'sudoku': '2. Sudoku Solver (4x4 Mini Grid)',
  'subsets': '3. Subsets (Power Set Decision Tree)',
};

const EXPECTED_OUTPUTS = {
  'n-queens': '2 Valid Solutions for 4x4',
  'sudoku': 'Full Unique Grid Completion',
  'subsets': '2^N = 8 Total Subsets',
};

export default function BacktrackingVisualizer() {
  const {
    track,
    steps,
    currentStep,
    isPlaying,
    speed,
    practiceMode,
    userCode,
    setCurrentStep,
    nextStep,
    prevStep,
    restart,
    togglePlay,
    setSpeed,
    togglePracticeMode,
    setUserCode,
  } = useBacktrackingStore();

  const step = steps[currentStep] || steps[0];
  const activeCode = CODE_MAP[track] || NQUEENS_CODE;

  // Autoplay timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        nextStep();
      }, 1500 / speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, nextStep]);

  const trackLabel = TRACK_TITLES[track] || 'Backtracking Pattern';
  const expectedOutput = EXPECTED_OUTPUTS[track] || 'Valid Solution';

  return (
    <div className="sketch-container font-sketch">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sketch-border)] pb-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--sketch-accent-orange)] font-mono mb-1 font-bold">
            ALGORITHM PATTERN
          </div>
          <h2 className="text-3xl font-bold font-header flex items-center gap-3">
            Backtracking & State Exploration
            <span className="text-sm px-3 py-0.5 rounded-full sketch-border-soft text-[var(--sketch-accent-orange)] font-sketch">
              {trackLabel}
            </span>
          </h2>
        </div>

        {/* Expected Output Card */}
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl font-mono text-xs text-amber-300 shadow-sm">
          <span className="text-amber-400 font-bold font-header text-sm">🎯 Target:</span>
          <span>{expectedOutput}</span>
        </div>
      </div>

      {/* Progress Milestone Dots */}
      <div className="flex items-center gap-2 text-xs text-[var(--sketch-text-muted)] mb-5">
        <span>Milestones:</span>
        <div className="sketch-milestones">
          {steps.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`sketch-milestone-dot cursor-pointer ${i <= currentStep ? 'active' : ''}`}
              title={`Step ${i + 1}`}
            />
          ))}
        </div>
        <span className="font-mono ml-2">step {currentStep + 1} / {steps.length}</span>
      </div>

      {/* Main Canvas + Debugger Row */}
      <div className="sketch-canvas-row">
        {/* Visualization Canvas */}
        <div className="sketch-canvas-box sketch-border">
          <div className="absolute top-3 left-4 text-xs font-mono text-[var(--sketch-text-muted)]">
            Step Execution Canvas ({track.toUpperCase()})
          </div>

          {/* Canvas View Depending on Track */}
          <div className="flex flex-col items-center justify-center my-6 min-h-[300px]">
            {track === 'n-queens' && (
              <div className="grid grid-cols-4 gap-2 bg-slate-900/80 p-4 rounded-2xl border-2 border-[var(--sketch-border)] shadow-2xl">
                {(step.board || [
                  [0, 0, 0, 0],
                  [0, 0, 0, 0],
                  [0, 0, 0, 0],
                  [0, 0, 0, 0]
                ]).map((rowArr, rIdx) =>
                  rowArr.map((cell, cIdx) => {
                    const isQueen = cell === 1;
                    const isConflict = step.conflictCell && step.conflictCell[0] === rIdx && step.conflictCell[1] === cIdx;
                    const isCurrentRowCol = step.row === rIdx && step.col === cIdx;
                    const isLightSquare = (rIdx + cIdx) % 2 === 0;

                    return (
                      <motion.div
                        key={`${rIdx}-${cIdx}`}
                        layout
                        animate={{
                          scale: isQueen || isConflict ? 1.05 : 1,
                        }}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex flex-col items-center justify-center font-mono text-2xl font-bold border-2 transition-all relative ${
                          isConflict
                            ? 'bg-rose-500/30 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                            : isQueen
                            ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400'
                            : isCurrentRowCol
                            ? 'border-cyan-400 bg-cyan-500/20'
                            : isLightSquare
                            ? 'bg-[var(--sketch-bg)] border-[var(--sketch-border)] text-slate-400'
                            : 'bg-[var(--sketch-bg-dim)] border-[var(--sketch-border)] text-slate-500'
                        }`}
                      >
                        {isQueen ? '👑' : isConflict ? '❌' : ''}
                        <span className="text-[9px] text-slate-500 absolute bottom-1 right-1 font-mono">
                          {rIdx},{cIdx}
                        </span>
                      </motion.div>
                    );
                  })
                )}
              </div>
            )}

            {track === 'sudoku' && (
              <div className="grid grid-cols-4 gap-2 bg-slate-900/80 p-4 rounded-2xl border-2 border-[var(--sketch-border)] shadow-2xl">
                {(step.board || [
                  [1, 2, 3, 4],
                  [3, 4, 1, 2],
                  [2, 1, 4, 3],
                  [4, 3, 2, 1]
                ]).map((rowArr, rIdx) =>
                  rowArr.map((num, cIdx) => {
                    const isCurrentCell = step.row === rIdx && step.col === cIdx;
                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-mono text-xl md:text-2xl font-bold border-2 ${
                          isCurrentCell
                            ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-lg shadow-amber-500/30'
                            : num !== 0
                            ? 'border-[var(--sketch-border)] bg-[var(--sketch-bg)] text-amber-400'
                            : 'border-dashed border-slate-700 text-slate-600'
                        }`}
                      >
                        {num !== 0 ? num : ''}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {track === 'subsets' && (
              <div className="flex flex-col items-center gap-4">
                <div className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] text-center">
                  <span className="text-xs text-[var(--sketch-text-muted)] block mb-1 font-mono">CURRENT SUBSET PATH:</span>
                  <span className="text-xl font-bold font-mono text-amber-400">
                    [{(step.currentSubset || step.currentPath || []).join(', ')}]
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
                  <span className="text-xs font-mono text-[var(--sketch-text-muted)] w-full text-center">GENERATED SUBSETS:</span>
                  {(step.subsets || [[]]).map((sub, idx) => (
                    <span key={idx} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                      [{sub.join(', ')}]
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Debug Panel (Code & State) */}
        <div className="sketch-debug-panel">
          {/* Pseudocode Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--sketch-border)]">
              <span className="font-header font-bold text-lg">Concept Code</span>
              <button
                onClick={togglePracticeMode}
                className="px-2.5 py-1 text-xs sketch-button"
              >
                {practiceMode ? '👁️ View' : '✏️ Practice'}
              </button>
            </div>

            {practiceMode ? (
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={9}
                className="w-full bg-transparent p-2 font-mono text-xs text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded focus:outline-none"
              />
            ) : (
              <div className="space-y-0.5">
                {activeCode.map((c) => {
                  const isActive = step.activeLine === c.line;
                  return (
                    <div
                      key={c.line}
                      className={`sketch-code-line ${isActive ? 'active' : ''}`}
                    >
                      <span className="w-6 text-[var(--sketch-text-muted)] select-none">{c.line}</span>
                      <span className="whitespace-pre">{c.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* State Variable Box */}
          <div className="sketch-panel-box sketch-border">
            <div className="font-header font-bold text-lg mb-2 pb-1 border-b border-[var(--sketch-border)]">
              State
            </div>
            <div className="space-y-1">
              {Object.entries(step.state || {}).map(([key, value]) => (
                <div key={key} className="sketch-state-var">
                  <span className="text-[var(--sketch-text-muted)]">{key}</span>
                  <span className="font-bold text-[var(--sketch-accent-orange)]">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="sketch-explanation-bar sketch-border">
        <span className="text-xl select-none">✏️</span>
        <div className="flex-1 text-sm md:text-base leading-relaxed font-sketch">
          <span className="font-mono text-xs px-2 py-0.5 rounded sketch-border-soft mr-2 text-[var(--sketch-accent-orange)]">
            line {step.activeLine}
          </span>
          {step.desc}
        </div>
      </div>

      {/* Bottom Playback Controls Bar */}
      <div className="sketch-playback-bar sketch-border">
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            className="sketch-button px-3 py-1.5"
            title="Restart"
          >
            ↺
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="sketch-button px-3 py-1.5"
            title="Previous step"
          >
            |◀
          </button>
          <button
            onClick={togglePlay}
            className="sketch-button px-4 py-1.5 font-bold bg-amber-500/20 border-amber-500"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep >= steps.length - 1}
            className="sketch-button px-3 py-1.5"
            title="Next step"
          >
            ▶|
          </button>
        </div>

        {/* Scrubber Timeline */}
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="sketch-scrubber"
          />
        </div>

        {/* Speed Multiplier Pills */}
        <div className="flex items-center gap-1">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-0.5 text-xs sketch-button ${speed === s ? 'bg-amber-500/20 border-amber-500 font-bold' : ''}`}
            >
              {s === 0.5 ? '0.5x (Slow)' : `${s}x`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
