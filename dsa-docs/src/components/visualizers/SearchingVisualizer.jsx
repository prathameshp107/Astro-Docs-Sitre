import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchingStore } from '../../store/visualizerStore';

const getDelayFromPos = (pos) => Math.max(5, Math.round(2000 * Math.pow(0.945, pos - 1)));

export default function SearchingVisualizer() {
  const { array, steps, currentStep, result, isAnimating, searchType, setSearchType, runSearch, nextStep, resetSearch, randomArray } = useSearchingStore();
  const [target, setTarget] = useState('29');
  const [speed, setSpeed] = useState(() => getDelayFromPos(65));
  const [sliderPos, setSliderPos] = useState(65);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (isAnimating && currentStep >= 0 && currentStep < steps.length - 1) {
      timerRef.current = setTimeout(() => nextStep(), speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isAnimating, currentStep, steps]);

  const handleSearch = () => {
    const val = parseInt(target);
    if (isNaN(val)) return;
    runSearch(val);
    // Show first step immediately, rest auto-animate
    nextStep();
  };

  const step = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;
  const maxVal = Math.max(...array, 1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <div className="flex gap-1">
          <button
            onClick={() => { if (!isAnimating) setSearchType('linear'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              searchType === 'linear'
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'border border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            Linear Search
          </button>
          <button
            onClick={() => { if (!isAnimating) setSearchType('binary'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              searchType === 'binary'
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'border border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            Binary Search
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for..."
            className="w-24 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleSearch}
            disabled={isAnimating}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isAnimating ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="w-px h-8 bg-white/10" />          <button onClick={nextStep} disabled={steps.length === 0} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            {isAnimating ? 'Step →' : 'Next Step'}
          </button>
        <button onClick={resetSearch} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
          Reset
        </button>
        <button onClick={randomArray} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
          New Array
        </button>

        <div className="flex items-center gap-2 text-xs text-[var(--mcq-text-muted)]">
          <span className="w-6 text-center" title="Slow">🐢</span>
          <input
            type="range"
            min="1"
            max="100"
            value={sliderPos}
            onChange={(e) => {
              const pos = Number(e.target.value);
              setSliderPos(pos);
              setSpeed(getDelayFromPos(pos));
            }}
            className="w-20 accent-blue-500"
          />
          <span className="w-6 text-center" title="Fast">🐇</span>
          <span className="font-mono text-[10px] text-white/40 min-w-[3rem] text-center tabular-nums">
            {speed >= 1000 ? `${(speed / 1000).toFixed(1)}s` : `${speed}ms`}
          </span>
        </div>
      </div>

      {/* Status */}
      {step && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            step.found
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : step.index === -1
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}
        >
          {step.desc}
        </motion.div>
      )}

      <div className="flex gap-6">
        {/* Array Visualization */}
        <div className="flex-1">
          <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)]">
            {searchType === 'binary' && step && (
              <div className="flex gap-2 mb-3 text-xs text-[var(--mcq-text-muted)] font-mono">
                <span>left: <strong className="text-blue-400">{step.left}</strong></span>
                <span>| mid: <strong className="text-amber-400">{step.mid}</strong></span>
                <span>| right: <strong className="text-blue-400">{step.right}</strong></span>
              </div>
            )}

            <div className="flex items-end gap-1 min-h-[200px]">
              <AnimatePresence mode="popLayout">
                {array.map((val, i) => {
                  const isCurrent = step && step.index === i;
                  const isFound = step && step.found && isCurrent;
                  const inSearchRange = searchType === 'binary' && step && i >= step.left && i <= step.right;
                  const isLeftBound = searchType === 'binary' && step && i === step.left;
                  const isRightBound = searchType === 'binary' && step && i === step.right;
                  const isMid = searchType === 'binary' && step && i === step.mid;

                  let bgColor = 'rgba(59, 130, 246, 0.12)';
                  let borderColor = 'rgba(59, 130, 246, 0.15)';
                  if (isFound) { bgColor = '#22c55e'; borderColor = '#22c55e'; }
                  else if (isCurrent) { bgColor = '#60a5fa'; borderColor = '#60a5fa'; }
                  else if (isMid) { bgColor = 'rgba(245, 158, 11, 0.25)'; borderColor = 'rgba(245, 158, 11, 0.3)'; }
                  else if (isLeftBound || isRightBound) { bgColor = 'rgba(96, 165, 250, 0.15)'; borderColor = 'rgba(96, 165, 250, 0.3)'; }
                  else if (!inSearchRange && searchType === 'binary' && step) { bgColor = 'rgba(255,255,255,0.03)'; borderColor = 'rgba(255,255,255,0.05)'; }

                  const height = (val / maxVal) * 170;

                  return (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: i !== undefined ? (inSearchRange || searchType === 'linear') ? 1 : 0.3 : 0,
                        y: 0,
                        height: Math.max(height, 16),
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="flex-1 max-w-[50px] rounded-t-lg border relative group cursor-pointer"
                      style={{ minHeight: '16px' }}
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {val}
                      </div>
                      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[9px] font-mono" style={{ color: isFound ? '#fff' : isCurrent ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                        {i}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Index labels */}
          <div className="flex gap-1 mt-2">
            {array.map((val, i) => (
              <div key={i} className="flex-1 max-w-[50px] text-center">
                <span className={`text-[10px] font-mono ${step && i === step.index ? 'text-blue-400 font-bold' : 'text-[var(--mcq-text-muted)]'}`}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Log */}
        <div className="w-64">
          <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] h-full">
            <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-3 uppercase tracking-wider">Search Steps</div>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`px-2 py-1.5 rounded text-[11px] font-mono transition-all ${
                    i === currentStep
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : i < currentStep
                      ? 'text-[var(--mcq-text-muted)]'
                      : 'text-[var(--mcq-text-muted)] opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      s.found ? 'bg-emerald-400' : s.index === -1 ? 'bg-red-400' : 'bg-blue-400'
                    }`} />
                    {s.desc}
                  </div>
                </div>
              ))}
              {steps.length === 0 && <span className="text-[var(--mcq-text-muted)] text-xs">Enter a value and click Search</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
