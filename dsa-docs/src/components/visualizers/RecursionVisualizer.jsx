import { useRecursionStore } from '../../store/visualizerStore';
import { motion, AnimatePresence } from 'framer-motion';

const EXAMPLES = [
  { id: 'factorial', label: 'Factorial', desc: 'fact(n) = n × fact(n-1)' },
  { id: 'fibonacci', label: 'Fibonacci', desc: 'fib(n) = fib(n-1) + fib(n-2)' },
  { id: 'hanoi', label: 'Tower of Hanoi', desc: 'Move n disks from A to C using B' },
];

export default function RecursionVisualizer() {
  const { callStack, returnValues, highlighted, currentExample, isAnimating, setExample, runFactorial, runFibonacci, runHanoi, stopAnimation } = useRecursionStore();

  const handleRun = () => {
    if (isAnimating) { stopAnimation(); return; }
    const n = currentExample === 'hanoi' ? 3 : currentExample === 'factorial' ? 5 : 6;
    if (currentExample === 'factorial') runFactorial(n);
    else if (currentExample === 'fibonacci') runFibonacci(n);
    else runHanoi(n);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => { if (!isAnimating) setExample(ex.id); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentExample === ex.id
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                : 'border border-[var(--mcq-border)] text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            {ex.label}
          </button>
        ))}
        <div className="w-px h-8 bg-white/10" />
        <button
          onClick={handleRun}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg ${
            isAnimating
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-blue-500/20 hover:shadow-xl'
          }`}
        >
          {isAnimating ? 'Stop' : `Run ${currentExample === 'hanoi' ? '(n=3)' : currentExample === 'factorial' ? '(n=5)' : '(n=6)'}`}
        </button>
        <button onClick={stopAnimation} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
          Reset
        </button>
      </div>

      {/* Formula */}
      <div className="px-4 py-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-400 text-sm font-mono">
        {EXAMPLES.find(e => e.id === currentExample)?.desc}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Call Stack */}
        <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] min-h-[300px]">
          <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-3 uppercase tracking-wider">Call Stack</div>
          <div className="flex flex-col-reverse gap-1 min-h-[240px]">
            <AnimatePresence>
              {callStack.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--mcq-text-muted)] text-sm py-8 text-center">
                  Run an example to see the call stack in action
                </motion.div>
              ) : (
                callStack.map((call, i) => {
                  const maxDepth = Math.max(...callStack.map(c => c.depth), 1);
                  return (
                    <motion.div
                      key={`${call.func}-${i}`}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{
                        opacity: 1, x: 0, height: 'auto',
                        backgroundColor: i === callStack.length - 1 ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.08)',
                        borderColor: i === callStack.length - 1 ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.15)',
                      }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="px-3 py-2 rounded-lg border text-xs font-mono overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <span className={i === callStack.length - 1 ? 'text-blue-400 font-bold' : 'text-[var(--mcq-text-secondary)]'}>
                          {'  '.repeat(call.depth)}{call.func}
                        </span>
                      </div>
                      <div className="text-[10px] text-[var(--mcq-text-muted)] mt-0.5">{call.line}</div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Return Values */}
        <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] min-h-[300px]">
          <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-3 uppercase tracking-wider">Return Values</div>
          <div className="flex flex-col gap-1.5">
            <AnimatePresence>
              {returnValues.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--mcq-text-muted)] text-sm py-8 text-center">
                  Return values will appear here as functions complete
                </motion.div>
              ) : (
                returnValues.map((rv, i) => (
                  <motion.div
                    key={`rv-${i}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10"
                  >
                    <span className="text-emerald-400 text-sm">←</span>
                    <span className="text-xs font-mono text-[var(--mcq-text)]">{rv.func}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">= {rv.value}</span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
