import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDPStore } from '../../store/visualizers/dpStore';

const EXAMPLES = [
  { id: 'fibonacci', label: 'Fibonacci', desc: 'Bottom-up DP for nth Fibonacci number', param: 'n=10' },
  { id: 'knapsack', label: '0/1 Knapsack', desc: 'Max value with weight constraint (W=7)', param: 'W=7' },
  { id: 'lcs', label: 'Longest Common Subsequence', desc: 'LCS of ABCDEF and ACBEDF', param: '' },
  { id: 'coinchange', label: 'Coin Change', desc: 'Min coins for amount 12', param: 'amount=12' },
];

const EXAMPLE_DEFAULTS = {
  fibonacci: { param: 10, label: 'n', max: 15, suffix: '' },
  knapsack: { param: 7, label: 'W', max: 12, suffix: '' },
  lcs: { param: null, label: '', max: null, suffix: '' },
  coinchange: { param: 12, label: 'amount', max: 20, suffix: '' },
};

const getDelayFromPos = (pos) => Math.max(5, Math.round(2000 * Math.pow(0.945, pos - 1)));

export default function DPVisualizer() {
  const { table, highlighted, steps, currentExample, isAnimating, result, currentStep, desc, setExample, runFibonacci, runKnapsack, runLCS, runCoinChange, stopAnimation } = useDPStore();
  const [param, setParam] = useState('');
  const [speed, setSpeed] = useState(() => getDelayFromPos(65));
  const [sliderPos, setSliderPos] = useState(65);
  const defaults = EXAMPLE_DEFAULTS[currentExample] || EXAMPLE_DEFAULTS.fibonacci;

  const handleRun = () => {
    if (isAnimating) { stopAnimation(); return; }
    const p = parseInt(param);
    const pVal = (param === '' || isNaN(p)) ? defaults.param : Math.min(p, defaults.max);
    if (currentExample === 'fibonacci') runFibonacci(pVal, speed);
    else if (currentExample === 'knapsack') runKnapsack(pVal, speed);
    else if (currentExample === 'lcs') runLCS(speed);
    else runCoinChange(pVal, speed);
  };

  const handleSetExample = (id) => {
    if (!isAnimating) {
      setExample(id);
      setParam('');
    }
  };

  const maxVal = Math.max(...table.flat().filter(v => v !== Infinity && isFinite(v)), 1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => handleSetExample(ex.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentExample === ex.id
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'border border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            {ex.label}
          </button>
        ))}
        {(currentExample === 'fibonacci' || currentExample === 'knapsack' || currentExample === 'coinchange') && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--mcq-text-muted)] font-mono">{defaults.label}=</span>
            <input
              type="number"
              value={param}
              onChange={(e) => setParam(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRun()}
              placeholder={String(defaults.param)}
              className="w-16 px-2 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
            />
          </div>
        )}
        <div className="w-px h-8 bg-white/10" />
        <button
          onClick={handleRun}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg ${
            isAnimating
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-blue-500/20 hover:shadow-xl'
          }`}
        >
          {isAnimating ? 'Stop' : 'Run'}
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
            disabled={isAnimating}
            className="w-20 accent-blue-500"
          />
          <span className="w-6 text-center" title="Fast">🐇</span>
          <span className="font-mono text-[10px] text-white/40 min-w-[3rem] text-center tabular-nums">
            {speed >= 1000 ? `${(speed / 1000).toFixed(1)}s` : `${speed}ms`}
          </span>
        </div>

        <button onClick={stopAnimation} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
          Reset
        </button>
      </div>

      {/* Info */}
      <div className="flex gap-4 text-xs text-[var(--mcq-text-muted)]">
        <span>Algorithm: <strong className="text-white">{EXAMPLES.find(e => e.id === currentExample)?.desc}</strong></span>
        {result !== null && <span>| Result: <strong className="text-emerald-400">{result}</strong></span>}
        {currentStep > 0 && <span>| Step: <strong className="text-blue-400">{currentStep}</strong></span>}
      </div>

      {/* Step Description */}
      {desc && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-400 text-sm font-mono">
          {desc}
        </motion.div>
      )}

      {/* DP Table Visualization */}
      <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] overflow-x-auto">
        {currentExample === 'fibonacci' || currentExample === 'coinchange' ? (
          /* 1D DP Table */
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-2 uppercase tracking-wider">DP Table</div>
            <div className="flex flex-wrap gap-1.5">
              {table.map((val, i) => {
                const isHL = highlighted.includes(i);
                const validVal = val === Infinity || !isFinite(val) ? '∞' : val;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: isHL ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255,255,255,0.04)',
                      borderColor: isHL ? 'rgba(96, 165, 250, 0.4)' : 'rgba(255,255,255,0.08)',
                      scale: isHL ? 1.05 : 1,
                    }}
                    className="flex flex-col items-center px-3 py-2 rounded-lg border min-w-[48px]"
                  >
                    <span className="text-[10px] text-[var(--mcq-text-muted)] mb-1">{i}</span>
                    <span className={`text-xs font-mono font-bold ${isHL ? 'text-blue-400' : 'text-[var(--mcq-text)]'}`}>{validVal}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : currentExample === 'knapsack' || currentExample === 'lcs' ? (
          /* 2D DP Table */
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-2 uppercase tracking-wider">DP Table</div>
            <div className="inline-flex flex-col gap-0.5">
              {table.map((row, i) => (
                <div key={i} className="flex gap-0.5">
                  {row.map((val, j) => {
                    const isHL = highlighted[0] === i && highlighted[1] === j;
                    return (
                      <motion.div
                        key={j}
                        animate={{
                          backgroundColor: isHL ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255,255,255,0.04)',
                          borderColor: isHL ? 'rgba(96, 165, 250, 0.4)' : 'rgba(255,255,255,0.06)',
                          scale: isHL ? 1.1 : 1,
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded border text-[10px] font-mono"
                        style={{ color: isHL ? '#60a5fa' : 'rgba(255,255,255,0.7)' }}
                      >
                        {val}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Summary */}
      {result !== null && (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
          <div className="text-sm text-[var(--mcq-text-body)]">
            <span className="font-semibold text-emerald-400">Result: </span>
            {currentExample === 'fibonacci' && `fib(10) = ${result}`}
            {currentExample === 'knapsack' && `Maximum value = ${result}`}
            {currentExample === 'lcs' && `Length of LCS = ${result}`}
            {currentExample === 'coinchange' && `Minimum coins needed = ${result}`}
          </div>
        </div>
      )}
    </div>
  );
}
