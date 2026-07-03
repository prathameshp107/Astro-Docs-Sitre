import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArrayStore } from '../../store/visualizers/arrayStore';

export default function ArrayVisualizer() {
  const { array, highlighted, selected, insert, deleteAt, update, search, randomize, generateSorted, setArray } = useArrayStore();
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [opType, setOpType] = useState('insert');
  const [animating, setAnimating] = useState(false);
  const [stepDesc, setStepDesc] = useState('');
  const [speed, setSpeed] = useState(500); // milliseconds
  const [arraySize, setArraySize] = useState(10);
  const [showLegend, setShowLegend] = useState(false);
  const timerRef = useRef(null);
  const descTimerRef = useRef(null);

  useEffect(() => {
    return () => { clearTimeout(timerRef.current); clearTimeout(descTimerRef.current); };
  }, []);

  // Regenerate array when size changes
  useEffect(() => {
    setArray(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 90) + 1));
  }, [arraySize]);

  const showStep = (text) => {
    setStepDesc(text);
    clearTimeout(descTimerRef.current);
    descTimerRef.current = setTimeout(() => setStepDesc(''), 2500);
  };

  const handleOperation = () => {
    if (animating) return;
    const val = parseInt(value);
    const idx = parseInt(index);
    if (isNaN(val)) return;
    setAnimating(true);
    setSearchResult(null);

    switch (opType) {
      case 'insert': {
        const pos = isNaN(idx) ? array.length : Math.min(idx, array.length);
        const clampedPos = Math.max(0, pos);
        if (clampedPos === array.length) {
          showStep(`Appending \${val} to the end of the array â€” O(1) amortized operation`);
        } else {
          showStep(`Inserting \${val} at index \${clampedPos} â€” shifting elements [\${clampedPos}..\${array.length - 1}] right by 1 position â€” O(n) operation`);
        }
        insert(val, clampedPos);
        break;
      }
      case 'delete': {
        const delIdx = isNaN(idx) ? array.indexOf(val) : idx;
        if (delIdx >= 0 && delIdx < array.length) {
          showStep(`Deleting element \${array[delIdx]} at index \${delIdx} â€” shifting elements [\${delIdx + 1}..\${array.length - 1}] left by 1 position â€” O(n) operation`);
          deleteAt(delIdx);
        } else {
          showStep(`Value \${val} not found in array â€” nothing to delete`);
        }
        break;
      }
      case 'update': {
        if (!isNaN(idx) && idx >= 0 && idx < array.length) {
          showStep(`Updating array[\${idx}] from \${array[idx]} to \${val} â€” O(1) random access operation`);
          update(idx, val);
        } else {
          showStep(`Invalid index: \${idx} â€” valid range is [0..\${array.length - 1}]`);
        }
        break;
      }
    }

    timerRef.current = setTimeout(() => setAnimating(false), speed);
  };

  const handleSearch = () => {
    const val = parseInt(searchValue);
    if (isNaN(val)) return;
    const idx = search(val);
    setSearchResult(idx);
    if (idx >= 0) {
      showStep(`Linear search: scanning array element by element â€” found \${val} at index \${idx} âœ…`);
    } else {
      showStep(`Linear search: scanned all \${array.length} elements â€” value \${val} is not in the array âŒ`);
    }
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseInt(e.target.value));
  };

  const handleSizeChange = (e) => {
    setArraySize(parseInt(e.target.value));
  };

  const handleReset = () => {
    setArray(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 90) + 1));
    setValue('');
    setIndex('');
    setSearchValue('');
    setSearchResult(null);
    setStepDesc('');
  };

  const maxVal = Math.max(...array, 1);

  return (
    <div className="space-y-6">
      {/* Header with Info */} 
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between lg:justify-start gap-4">
        <div className="flex-1 lg:flex-none">
          <h2 className="text-xl font-bold text-[var(--mcq-text)] mb-1">Array Visualizer</h2>
          <p className="text-[var(--mcq-text-muted)] text-sm">
            Visualize array operations: insertion, deletion, updates, and linear search
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-[var(--mcq-text-muted)]">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-500" /> Selected
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-500" /> Found
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-500" /> Error
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" /> Normal
          </span>
        </div>
      </div>

      {/* Controls Sidebar */}
      <aside className="w-full lg:w-72 bg-[var(--mcq-surface-20)] rounded-xl border border-[var(--mcq-border)] p-4">
        <div className="space-y-4">
          {/* Operation Controls */}
          <div className="space-y-3">
            <label className="text-[var(--mcq-text-muted)] text-sm font-medium block">Operation</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <select
                  value={opType}
                  onChange={(e) => setOpType(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] focus:outline-none focus:border-blue-400"
                >
                  <option value="insert">Insert</option>
                  <option value="delete">Delete</option>
                  <option value="update">Update</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Value"
                  className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
                />
                <input
                  type="number"
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  placeholder="Index"
                  className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <button
                onClick={handleOperation}
                disabled={animating}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all disabled:opacity-50"
              >
                {opType === 'delete' ? 'Delete' : opType === 'update' ? 'Update' : 'Insert'}
              </button>
            </div>
          </div>

          {/* Search Controls */}
          <div className="space-y-3">
            <label className="text-[var(--mcq-text-muted)] text-sm font-medium block">Search</label>
            <div className="space-y-2">
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={handleSearch}
                className="w-full px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
              >
                Search
              </button>
            </div>
          </div>

          {/* Array Controls */}
          <div className="space-y-3">
            <label className="text-[var(--mcq-text-muted)] text-sm font-medium block">Array</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--mcq-text-muted)]">Size:</span>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={arraySize}
                  onChange={handleSizeChange}
                  className="flex-1 h-1 bg-[var(--mcq-surface-30)] rounded"
                />
                <span className="text-xs font-mono text-[var(--mcq-text)]">{arraySize}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={randomize}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
                >
                  Randomize
                </button>
                <button
                  onClick={generateSorted}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
                >
                  Sorted
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Speed Control */}
          <div className="space-y-3 mt-4">
            <label className="text-[var(--mcq-text-muted)] text-sm font-medium block">Speed (ms)</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[var(--mcq-text-muted)]">
                <span title="Slow">ðŸ¢</span>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  value={speed}
                  onChange={handleSpeedChange}
                  className="flex-1 h-1 bg-[var(--mcq-surface-30)] rounded"
                />
                <span title="Fast">ðŸ‡</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--mcq-text-muted)]">
                <span>Slow</span>
                <span className="font-mono">{speed >= 1000 ? `${(speed / 1000).toFixed(1)}s` : `${speed}ms`}</span>
                <span>Fast</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Visualization Area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Algorithm Info */}
        <div className="bg-[var(--mcq-surface-30)] rounded-xl border border-[var(--mcq-border)] p-4">
          <h3 className="text-lg font-semibold text-[var(--mcq-text)] mb-2">About Arrays</h3>
          <div className="space-y-2 text-[var(--mcq-text-secondary)] text-sm">
            <div className="flex items-start">
              <span className="flex-shrink-0 mr-2">â–¶</span>
              <span>Contiguous memory storage for elements of the same data type</span>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 mr-2">â–¶</span>
              <span>Direct index-based access: O(1) time complexity</span>
            </div>
            <div class="flex items-start">
              <span className="flex-shrink-0 mr-2">â–¶</span>
              <span>Insertion/deletion at beginning/middle: O(n) due to element shifting</span>
            </div>
            <div class="flex items-start">
              <span className="flex-shrink-0 mr-2">â–¶</span>
              <span>Insertion/deletion at end: O(1) amortized (with dynamic arrays)</span>
            </div>
            <div class="flex items-start">
              <span className="flex-shrink-0 mr-2">â–¶</span>
              <span>Memory efficient: no pointer overhead, excellent cache locality</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[var(--mcq-border)/20]">
            <span className="text-xs text-[var(--mcq-text-muted)] font-mono">
              Current: [{array.map((v, i) => \`\${i}:\${v}\`).join(', ')}]
            </span>
          </div>
        </div>

        {/* Step Description */}
        {stepDesc && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="px-4 py-2.5 rounded-xl border text-sm leading-relaxed"
            style={{
              backgroundColor: stepDesc.includes('âœ…') || stepDesc.includes('Found')
                ? 'rgba(34, 197, 94, 0.08)'
                : stepDesc.includes('âŒ')
                ? 'rgba(239, 68, 68, 0.08)'
                : 'rgba(96, 165, 250, 0.08)',
              borderColor: stepDesc.includes('âœ…') || stepDesc.includes('Found')
                ? 'rgba(34, 197, 94, 0.15)'
                : stepDesc.includes('âŒ')
                ? 'rgba(239, 68, 68, 0.15)'
                : 'rgba(96, 165, 250, 0.15)',
              color: stepDesc.includes('âœ…') || stepDesc.includes('Found')
                ? '#22c55e'
                : stepDesc.includes('âŒ)'
                ? '#f87171'
                : 'var(--mcq-text-body)',
            }}
          >
            ðŸ“– {stepDesc}
          </motion.div>
        )}

        {/* Search Result */}
        {searchResult !== null && (
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${searchResult >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {searchResult >= 0 ? `Found at index ${searchResult}` : 'Value not found'}
          </div>
        )}

        {/* Array Visualization */}
        <div className="flex-1 flex items-end gap-2 px-4 py-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] overflow-x-auto relative">
          <div className="flex-1 flex flex-col items-end pb-4">
            {/* Index labels (below the bars) */}
            <div className="flex space-x-2 mb-2">
              {array.map((_, i) => (
                <div key={\`index-\${i}\`} className="text-xs text-[var(--mcq-text-muted)] w-[40px] text-center">
                  [{i}]
                </div>
              ))}
            </div>
            {/* Bars with values */}
            <AnimatePresence>
              {array.map((val, i) => {
                const isHighlighted = highlighted.includes(i);
                const isSelected = selected === i;
                const height = Math.max((val / maxVal) * 180, 20); // Max height 180px, min 20px

                return (
                  <motion.div
                    key={\`bar-\${i}\`}
                    initial={{ opacity: 0, x: i > Math.min(...(highlighted.length ? highlighted : [-1])) ? 30 : -30 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      height,
                      backgroundColor: isSelected
                        ? '#22c55e'
                        : isHighlighted
                        ? '#60a5fa'
                        : 'rgba(59, 130, 246, 0.3)',
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30, duration: speed / 1000 }}
                    className="relative flex-1 flex items-end bg-white/5 rounded-t-lg group cursor-pointer"
                  >
                    {/* Value inside the bar */}
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono font-bold text-white/90">
                      {val}
                    </div>
                    {/* Optional: show index on hover */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white/60 mb-2">@{i}</div>
                  </div>
                );
              })}  
            </AnimatePresence>
          </div>
        </div>

        {/* Array Values (as chips) */}
        <div className="flex flex-wrap gap-2 px-4">
          {array.map((val, i) => (
            <span
              key={i}
              className={\`${
                selected === i
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : highlighted.includes(i)
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  : 'bg-white/5 text-[var(--mcq-text-muted)] border-white/10'
              }`}
            >
              [{i}]: {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
