import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStackStore } from '../../store/visualizers/stackStore';

export default function StackVisualizer() {
  const { stack, highlighted, operations, push, pop, peek, clear, randomPush } = useStackStore();
  const [value, setValue] = useState('');
  const [stepDesc, setStepDesc] = useState('');

  const showStep = (text) => {
    setStepDesc(text);
    setTimeout(() => setStepDesc(''), 2000);
  };

  const handlePush = () => {
    const val = parseInt(value);
    if (isNaN(val)) return;
    push(val);
    showStep(`Push(${val}): Adding ${val} to the TOP of the stack — LIFO principle. Stack now has ${stack.length + 1} element(s). The new top is [${stack.length}] = ${val}.`);
    setValue('');
  };

  const handlePop = () => {
    const topVal = stack[stack.length - 1];
    pop();
    showStep(`Pop(): Removing the TOP element ${topVal} from the stack — the most recently added item leaves first (LIFO). Stack now has ${stack.length - 1} element(s).`);
  };

  const handlePeek = () => {
    peek();
    showStep(`Peek(): Looking at the TOP element without removing it — stack[${stack.length - 1}] = ${stack[stack.length - 1]}. The stack still has ${stack.length} elements.`);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePush()}
            placeholder="Value"
            className="w-20 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
          />
          <button onClick={handlePush} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all">
            Push
          </button>
          <button onClick={handlePop} disabled={stack.length === 0} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            Pop
          </button>
          <button onClick={handlePeek} disabled={stack.length === 0} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            Peek
          </button>
          <button onClick={randomPush} className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
            Random
          </button>
          <button onClick={clear} className="px-4 py-2 rounded-lg border border-red-500/20 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all">
            Clear
          </button>
        </div>
      </div>

      {/* Step Description */}
      {stepDesc && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2.5 rounded-xl border text-sm leading-relaxed"
          style={{
            backgroundColor: stepDesc.includes('removing') || stepDesc.includes('Pop')
              ? 'rgba(245, 158, 11, 0.08)'
              : stepDesc.includes('Peek')
              ? 'rgba(96, 165, 250, 0.08)'
              : 'rgba(34, 197, 94, 0.08)',
            borderColor: stepDesc.includes('removing') || stepDesc.includes('Pop')
              ? 'rgba(245, 158, 11, 0.15)'
              : stepDesc.includes('Peek')
              ? 'rgba(96, 165, 250, 0.15)'
              : 'rgba(34, 197, 94, 0.15)',
            color: 'var(--mcq-text-body)',
          }}
        >
          <span className="mr-1.5">
            {stepDesc.includes('Push') ? '📥' : stepDesc.includes('Pop') ? '📤' : '👁️'}
          </span>
          {stepDesc}
        </motion.div>
      )}

      {/* Stack Visualization */}
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] min-h-[350px]">
            <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-3 uppercase tracking-wider text-center">Stack (LIFO — Last In, First Out)</div>
            <div className="flex flex-col-reverse items-center gap-1.5" style={{ minHeight: '280px' }}>
              <AnimatePresence>
                {stack.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--mcq-text-muted)] text-sm py-12">
                    Stack is empty — push values to get started
                  </motion.div>
                ) : (
                  stack.map((val, i) => {
                    const isTop = i === stack.length - 1;
                    const isHighlighted = highlighted === i;
                    return (
                      <motion.div
                        key={`s-${i}-${val}`}
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{
                          opacity: 1, x: 0, scale: 1,
                          backgroundColor: isHighlighted ? '#60a5fa' : isTop ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.12)',
                          borderColor: isTop ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.2)',
                        }}
                        exit={{ opacity: 0, x: 50, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="w-3/4 max-w-[200px] px-4 py-3 rounded-lg border text-sm font-mono font-bold text-center"
                        style={{ color: isHighlighted ? '#fff' : 'rgba(255,255,255,0.8)' }}
                      >
                        {val}
                        {isTop && <span className="ml-2 text-[9px] text-blue-300 font-semibold">← TOP</span>}
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
            {stack.length > 0 && (
              <div className="mt-3 text-center text-xs text-[var(--mcq-text-muted)]">
                Size: {stack.length} | Top: [{stack.length - 1}] = {stack[stack.length - 1]} | Bottom: [0] = {stack[0]}
              </div>
            )}
          </div>
        </div>

        {/* Operations Log */}
        <div className="w-64">
          <div className="p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] h-full">
            <div className="text-xs font-semibold text-[var(--mcq-text-muted)] mb-3 uppercase tracking-wider">Operations Log</div>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {[...operations].reverse().map((op, i) => (
                <div key={op.timestamp} className="flex items-center gap-2 text-xs font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${op.type === 'push' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className={op.type === 'push' ? 'text-emerald-400' : 'text-amber-400'}>
                    {op.type === 'push' ? `push(${op.value})` : `pop() → ${op.value}`}
                  </span>
                </div>
              ))}
              {operations.length === 0 && <span className="text-[var(--mcq-text-muted)] text-xs">No operations yet</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
