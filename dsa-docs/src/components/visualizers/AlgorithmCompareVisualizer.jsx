import { useState, useEffect, useRef } from 'react';
import '../../styles/sketch-visualizer.css';

// Sorting step generators that record array state, comparison count, and swap count
function generateBubbleSortTrace(initialArr) {
  const arr = [...initialArr];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, desc: 'Starting Bubble Sort' });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      if (arr[j] > arr[j + 1]) {
        swaps++;
        swapped = true;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        steps.push({
          arr: [...arr],
          compIdxs: [j, j + 1],
          swapIdxs: [j, j + 1],
          comparisons,
          swaps,
          desc: `Swapped ${arr[j + 1]} and ${arr[j]}`,
        });
      } else {
        steps.push({
          arr: [...arr],
          compIdxs: [j, j + 1],
          swapIdxs: [],
          comparisons,
          swaps,
          desc: `Compared ${arr[j]} and ${arr[j + 1]} (in order)`,
        });
      }
    }
    if (!swapped) break;
  }
  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, done: true, desc: 'Sorted!' });
  return steps;
}

function generateSelectionSortTrace(initialArr) {
  const arr = [...initialArr];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, desc: 'Starting Selection Sort' });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        arr: [...arr],
        compIdxs: [minIdx, j],
        swapIdxs: [],
        comparisons,
        swaps,
        desc: `Checking if ${arr[j]} < ${arr[minIdx]}`,
      });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      steps.push({
        arr: [...arr],
        compIdxs: [],
        swapIdxs: [i, minIdx],
        comparisons,
        swaps,
        desc: `Swapped minimum ${arr[i]} into position ${i}`,
      });
    }
  }
  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, done: true, desc: 'Sorted!' });
  return steps;
}

function generateInsertionSortTrace(initialArr) {
  const arr = [...initialArr];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, desc: 'Starting Insertion Sort' });

  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0) {
      comparisons++;
      if (arr[j] > key) {
        swaps++;
        arr[j + 1] = arr[j];
        steps.push({
          arr: [...arr],
          compIdxs: [j, j + 1],
          swapIdxs: [j + 1],
          comparisons,
          swaps,
          desc: `Shifted ${arr[j + 1]} right`,
        });
        j--;
      } else {
        steps.push({
          arr: [...arr],
          compIdxs: [j, i],
          swapIdxs: [],
          comparisons,
          swaps,
          desc: `${key} >= ${arr[j]}, insert position found`,
        });
        break;
      }
    }
    arr[j + 1] = key;
  }
  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, done: true, desc: 'Sorted!' });
  return steps;
}

function generateQuickSortTrace(initialArr) {
  const arr = [...initialArr];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, desc: 'Starting Quick Sort' });

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      if (arr[j] <= pivot) {
        i++;
        swaps++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        steps.push({
          arr: [...arr],
          compIdxs: [j, high],
          swapIdxs: [i, j],
          comparisons,
          swaps,
          desc: `arr[${j}] <= pivot ${pivot}, swapped arr[${i}] and arr[${j}]`,
        });
      } else {
        steps.push({
          arr: [...arr],
          compIdxs: [j, high],
          swapIdxs: [],
          comparisons,
          swaps,
          desc: `arr[${j}] > pivot ${pivot}, no swap`,
        });
      }
    }
    swaps++;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    steps.push({
      arr: [...arr],
      compIdxs: [],
      swapIdxs: [i + 1, high],
      comparisons,
      swaps,
      desc: `Placed pivot ${arr[i + 1]} at final index ${i + 1}`,
    });
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      qs(low, pi - 1);
      qs(pi + 1, high);
    }
  }

  qs(0, arr.length - 1);
  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, done: true, desc: 'Sorted!' });
  return steps;
}

function generateMergeSortTrace(initialArr) {
  const arr = [...initialArr];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, desc: 'Starting Merge Sort' });

  function merge(low, mid, high) {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);
    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
      comparisons++;
      if (left[i] <= right[j]) {
        swaps++;
        arr[k] = left[i];
        steps.push({
          arr: [...arr],
          compIdxs: [k],
          swapIdxs: [k],
          comparisons,
          swaps,
          desc: `Merged ${left[i]} into index ${k}`,
        });
        i++;
      } else {
        swaps++;
        arr[k] = right[j];
        steps.push({
          arr: [...arr],
          compIdxs: [k],
          swapIdxs: [k],
          comparisons,
          swaps,
          desc: `Merged ${right[j]} into index ${k}`,
        });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      swaps++;
      arr[k] = left[i];
      steps.push({
        arr: [...arr],
        compIdxs: [k],
        swapIdxs: [k],
        comparisons,
        swaps,
        desc: `Copied remaining ${left[i]} to index ${k}`,
      });
      i++;
      k++;
    }

    while (j < right.length) {
      swaps++;
      arr[k] = right[j];
      steps.push({
        arr: [...arr],
        compIdxs: [k],
        swapIdxs: [k],
        comparisons,
        swaps,
        desc: `Copied remaining ${right[j]} to index ${k}`,
      });
      j++;
      k++;
    }
  }

  function ms(low, high) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      ms(low, mid);
      ms(mid + 1, high);
      merge(low, mid, high);
    }
  }

  ms(0, arr.length - 1);
  steps.push({ arr: [...arr], compIdxs: [], swapIdxs: [], comparisons, swaps, done: true, desc: 'Sorted!' });
  return steps;
}

const ALGORITHMS = {
  bubble: { name: 'Bubble Sort', time: 'O(N²)', space: 'O(1)', fn: generateBubbleSortTrace },
  selection: { name: 'Selection Sort', time: 'O(N²)', space: 'O(1)', fn: generateSelectionSortTrace },
  insertion: { name: 'Insertion Sort', time: 'O(N²)', space: 'O(1)', fn: generateInsertionSortTrace },
  quick: { name: 'Quick Sort', time: 'O(N log N)', space: 'O(log N)', fn: generateQuickSortTrace },
  merge: { name: 'Merge Sort', time: 'O(N log N)', space: 'O(N)', fn: generateMergeSortTrace },
};

export default function AlgorithmCompareVisualizer() {
  const [algo1Key, setAlgo1Key] = useState('bubble');
  const [algo2Key, setAlgo2Key] = useState('merge');
  const [arraySize, setArraySize] = useState(20);
  const [distribution, setDistribution] = useState('random');

  const [baseArray, setBaseArray] = useState([]);
  const [trace1, setTrace1] = useState([]);
  const [trace2, setTrace2] = useState([]);

  const [stepIdx1, setStepIdx1] = useState(0);
  const [stepIdx2, setStepIdx2] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(25); // ms per step

  // Generate initial dataset
  const generateNewData = () => {
    let arr = [];
    if (distribution === 'random') {
      arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 85) + 15);
    } else if (distribution === 'reversed') {
      arr = Array.from({ length: arraySize }, (_, i) => Math.floor(((arraySize - i) / arraySize) * 85) + 15);
    } else if (distribution === 'nearly-sorted') {
      arr = Array.from({ length: arraySize }, (_, i) => Math.floor(((i + 1) / arraySize) * 85) + 15);
      // Swap 2 random elements to make it nearly sorted
      if (arr.length > 4) {
        const i1 = Math.floor(Math.random() * (arr.length - 2));
        const i2 = i1 + 2;
        const temp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = temp;
      }
    }
    setBaseArray(arr);
    const t1 = ALGORITHMS[algo1Key].fn(arr);
    const t2 = ALGORITHMS[algo2Key].fn(arr);
    setTrace1(t1);
    setTrace2(t2);
    setStepIdx1(0);
    setStepIdx2(0);
    setIsRunning(false);
  };

  useEffect(() => {
    generateNewData();
  }, [algo1Key, algo2Key, arraySize, distribution]);

  // Stepping loop
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      let bothDone = true;

      setStepIdx1((prev) => {
        if (prev < trace1.length - 1) {
          bothDone = false;
          return prev + 1;
        }
        return prev;
      });

      setStepIdx2((prev) => {
        if (prev < trace2.length - 1) {
          bothDone = false;
          return prev + 1;
        }
        return prev;
      });

      if (bothDone) {
        setIsRunning(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isRunning, speed, trace1.length, trace2.length]);

  const currentStep1 = trace1[stepIdx1] || trace1[0] || { arr: baseArray, comparisons: 0, swaps: 0 };
  const currentStep2 = trace2[stepIdx2] || trace2[0] || { arr: baseArray, comparisons: 0, swaps: 0 };

  const isFinished1 = stepIdx1 >= trace1.length - 1 && trace1.length > 0;
  const isFinished2 = stepIdx2 >= trace2.length - 1 && trace2.length > 0;

  const winner =
    isFinished1 && !isFinished2
      ? ALGORITHMS[algo1Key].name
      : isFinished2 && !isFinished1
      ? ALGORITHMS[algo2Key].name
      : isFinished1 && isFinished2
      ? trace1.length <= trace2.length
        ? ALGORITHMS[algo1Key].name
        : ALGORITHMS[algo2Key].name
      : null;

  return (
    <div className="sketch-container font-sketch space-y-6">
      {/* Top Config Controls */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-5 md:p-6 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-xs font-mono text-[var(--sketch-accent-orange)] uppercase mb-1 font-bold">
              Algorithm 1 (Left)
            </label>
            <select
              value={algo1Key}
              onChange={(e) => setAlgo1Key(e.target.value)}
              className="bg-[var(--sketch-bg)] border border-[var(--sketch-border)] text-[var(--sketch-text)] px-3 py-1.5 rounded-xl font-header font-bold text-sm"
            >
              {Object.entries(ALGORITHMS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.name} ({v.time})
                </option>
              ))}
            </select>
          </div>

          <div className="text-xl font-bold font-header text-amber-400 self-end pb-2">VS</div>

          <div>
            <label className="block text-xs font-mono text-sky-400 uppercase mb-1 font-bold">
              Algorithm 2 (Right)
            </label>
            <select
              value={algo2Key}
              onChange={(e) => setAlgo2Key(e.target.value)}
              className="bg-[var(--sketch-bg)] border border-[var(--sketch-border)] text-[var(--sketch-text)] px-3 py-1.5 rounded-xl font-header font-bold text-sm"
            >
              {Object.entries(ALGORITHMS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.name} ({v.time})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--sketch-text-muted)] uppercase mb-1 font-bold">
              Distribution
            </label>
            <select
              value={distribution}
              onChange={(e) => setDistribution(e.target.value)}
              className="bg-[var(--sketch-bg)] border border-[var(--sketch-border)] text-[var(--sketch-text)] px-3 py-1.5 rounded-xl font-header text-sm"
            >
              <option value="random">🎲 Random Array</option>
              <option value="reversed">📉 Reversed (Worst Case)</option>
              <option value="nearly-sorted">📈 Nearly Sorted</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--sketch-text-muted)] uppercase mb-1 font-bold">
              Array Size: {arraySize}
            </label>
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="w-24 accent-amber-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`sketch-button px-5 py-2.5 rounded-xl font-header font-bold text-sm flex items-center gap-2 shadow-lg ${
              isRunning ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            <span>{isRunning ? '⏸ Pause' : '🏁 Start Race!'}</span>
          </button>

          <button
            onClick={generateNewData}
            className="sketch-button px-4 py-2 text-sm font-sketch hover:bg-white/5 rounded-xl"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Winner Banner if Finished */}
      {winner && (isFinished1 || isFinished2) && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/60 shadow-lg text-center animate-pulse">
          <span className="text-2xl mr-2">🏆</span>
          <span className="text-xl md:text-2xl font-bold font-header text-amber-400">
            {winner} finished first!
          </span>
          <p className="text-sm text-[var(--sketch-text-muted)] mt-1">
            Notice how asymptotic Big-O bounds translate directly into fewer comparison and swap operations in practice.
          </p>
        </div>
      )}

      {/* Side-by-Side Dual Arenas */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Arena 1 */}
        <div className="sketch-border bg-[var(--sketch-bg-dim)] p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--sketch-border)] pb-3 mb-4">
              <div>
                <span className="text-xs font-mono text-[var(--sketch-accent-orange)] font-bold">LANE 1</span>
                <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                  {ALGORITHMS[algo1Key].name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[var(--sketch-text-muted)] block">Time / Space</span>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {ALGORITHMS[algo1Key].time} · {ALGORITHMS[algo1Key].space}
                </span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-center">
              <div className="bg-[var(--sketch-bg)] p-2.5 rounded-xl border border-[var(--sketch-border)]">
                <div className="text-[10px] text-[var(--sketch-text-muted)]">COMPARISONS</div>
                <div className="text-lg font-bold text-amber-300">{currentStep1.comparisons}</div>
              </div>
              <div className="bg-[var(--sketch-bg)] p-2.5 rounded-xl border border-[var(--sketch-border)]">
                <div className="text-[10px] text-[var(--sketch-text-muted)]">SWAPS / WRITES</div>
                <div className="text-lg font-bold text-rose-300">{currentStep1.swaps}</div>
              </div>
              <div className="bg-[var(--sketch-bg)] p-2.5 rounded-xl border border-[var(--sketch-border)]">
                <div className="text-[10px] text-[var(--sketch-text-muted)]">PROGRESS</div>
                <div className="text-lg font-bold text-sky-300">
                  {Math.round(((stepIdx1 + 1) / (trace1.length || 1)) * 100)}%
                </div>
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-56 bg-[var(--sketch-bg)] p-3 rounded-xl border border-[var(--sketch-border)] flex items-end justify-center gap-1 overflow-hidden relative">
              {(currentStep1.arr || []).map((val, idx) => {
                const isComp = currentStep1.compIdxs?.includes(idx);
                const isSwap = currentStep1.swapIdxs?.includes(idx);
                let barColor = 'bg-amber-500/35 border-amber-500/60';
                if (isSwap) barColor = 'bg-rose-500 border-rose-400';
                else if (isComp) barColor = 'bg-sky-400 border-sky-300';
                else if (isFinished1) barColor = 'bg-emerald-500/50 border-emerald-400';

                return (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className={`flex-1 min-w-[4px] max-w-[18px] border-t-2 rounded-t transition-all duration-75 ${barColor}`}
                    title={`Index ${idx}: ${val}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-3 text-xs font-mono text-[var(--sketch-text-muted)] text-center truncate">
            {currentStep1.desc || 'Idle'}
          </div>
        </div>

        {/* Arena 2 */}
        <div className="sketch-border bg-[var(--sketch-bg-dim)] p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--sketch-border)] pb-3 mb-4">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold">LANE 2</span>
                <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                  {ALGORITHMS[algo2Key].name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[var(--sketch-text-muted)] block">Time / Space</span>
                <span className="text-sm font-mono font-bold text-sky-400">
                  {ALGORITHMS[algo2Key].time} · {ALGORITHMS[algo2Key].space}
                </span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-center">
              <div className="bg-[var(--sketch-bg)] p-2.5 rounded-xl border border-[var(--sketch-border)]">
                <div className="text-[10px] text-[var(--sketch-text-muted)]">COMPARISONS</div>
                <div className="text-lg font-bold text-amber-300">{currentStep2.comparisons}</div>
              </div>
              <div className="bg-[var(--sketch-bg)] p-2.5 rounded-xl border border-[var(--sketch-border)]">
                <div className="text-[10px] text-[var(--sketch-text-muted)]">SWAPS / WRITES</div>
                <div className="text-lg font-bold text-rose-300">{currentStep2.swaps}</div>
              </div>
              <div className="bg-[var(--sketch-bg)] p-2.5 rounded-xl border border-[var(--sketch-border)]">
                <div className="text-[10px] text-[var(--sketch-text-muted)]">PROGRESS</div>
                <div className="text-lg font-bold text-sky-300">
                  {Math.round(((stepIdx2 + 1) / (trace2.length || 1)) * 100)}%
                </div>
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-56 bg-[var(--sketch-bg)] p-3 rounded-xl border border-[var(--sketch-border)] flex items-end justify-center gap-1 overflow-hidden relative">
              {(currentStep2.arr || []).map((val, idx) => {
                const isComp = currentStep2.compIdxs?.includes(idx);
                const isSwap = currentStep2.swapIdxs?.includes(idx);
                let barColor = 'bg-sky-500/35 border-sky-500/60';
                if (isSwap) barColor = 'bg-rose-500 border-rose-400';
                else if (isComp) barColor = 'bg-amber-400 border-amber-300';
                else if (isFinished2) barColor = 'bg-emerald-500/50 border-emerald-400';

                return (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className={`flex-1 min-w-[4px] max-w-[18px] border-t-2 rounded-t transition-all duration-75 ${barColor}`}
                    title={`Index ${idx}: ${val}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-3 text-xs font-mono text-[var(--sketch-text-muted)] text-center truncate">
            {currentStep2.desc || 'Idle'}
          </div>
        </div>
      </div>

      {/* Deep Educational Takeaways & Complexity Breakdown */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl shadow-xl space-y-4">
        <h4 className="text-xl font-bold font-header text-amber-400 flex items-center gap-2">
          <span>💡</span> Why Does Algorithm Efficiency Matter?
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm leading-relaxed text-[var(--sketch-text)]">
          <div className="bg-[var(--sketch-bg)] p-4 rounded-xl border border-[var(--sketch-border)]">
            <h5 className="font-bold text-amber-300 mb-1">O(N²) Quadratic Sorting (Bubble, Selection, Insertion)</h5>
            <p className="text-[var(--sketch-text-muted)]">
              Quadratic algorithms compare nearly every pair of elements. On an array of 40 elements, Bubble Sort performs up to 780 comparisons. On 10,000 elements, it takes ~50,000,000 comparisons!
            </p>
          </div>
          <div className="bg-[var(--sketch-bg)] p-4 rounded-xl border border-[var(--sketch-border)]">
            <h5 className="font-bold text-sky-300 mb-1">O(N log N) Divide & Conquer (Merge, Quick Sort)</h5>
            <p className="text-[var(--sketch-text-muted)]">
              Divide-and-conquer algorithms cut the problem in half recursively. On 40 elements, Merge Sort needs only ~180 comparisons. On 10,000 elements, it requires only ~130,000 operations — over 300x faster!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
