import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSortingStore } from '../../store/visualizerStore';

const ALGORITHMS = [
  { id: 'bubble', label: 'Bubble Sort' },
  { id: 'selection', label: 'Selection Sort' },
  { id: 'insertion', label: 'Insertion Sort' },
  { id: 'merge', label: 'Merge Sort' },
  { id: 'quick', label: 'Quick Sort' },
];

const ALGO_EXPLANATIONS = {
  bubble: 'Repeatedly compare adjacent elements and swap them if they are in the wrong order. Larger elements "bubble up" to the end with each pass.',
  selection: 'Find the smallest element in the unsorted portion and swap it to the front. Builds the sorted portion one element at a time.',
  insertion: 'Pick each element and insert it into its correct position among the already-sorted elements to the left. Like sorting a hand of playing cards.',
  merge: 'Split the array into halves, recursively sort each half, then merge the sorted halves back together. Uses divide-and-conquer.',
  quick: 'Pick a pivot element, partition the array so smaller elements go left and larger go right, then recursively sort both partitions.',
};

const getDelayFromPos = (pos) => Math.max(5, Math.round(2000 * Math.pow(0.945, pos - 1)));

export default function SortingVisualizer() {
  const { array, arraySize, algorithm, isSorting, comparing, swapping, sorted, setAlgorithm, setArraySize, randomize, setState } = useSortingStore();
  const [speed, setSpeed] = useState(() => getDelayFromPos(65));
  const [sliderPos, setSliderPos] = useState(65);
  const [isRunning, setIsRunning] = useState(false);
  const [stepDesc, setStepDesc] = useState('');
  const abortRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => { abortRef.current = true; clearTimeout(timerRef.current); };
  }, []);

  const sleep = useCallback((ms) => new Promise(r => { timerRef.current = setTimeout(r, ms); }), []);

  const updateDesc = (text) => {
    if (!abortRef.current) setStepDesc(text);
  };

  const runSort = useCallback(async () => {
    if (isRunning) return;
    abortRef.current = false;
    setIsRunning(true);
    setStepDesc('');
    setState({ isSorting: true, comparing: [], swapping: [], sorted: [] });

    const arr = [...array];

    if (algorithm === 'bubble') {
      updateDesc(`Starting Bubble Sort on array of ${arr.length} elements`);
      await sleep(speed * 1.5);
      for (let i = 0; i < arr.length - 1 && !abortRef.current; i++) {
        updateDesc(`Pass ${i + 1}: Bubbling the largest unsorted element to position ${arr.length - 1 - i}`);
        await sleep(speed);
        for (let j = 0; j < arr.length - i - 1 && !abortRef.current; j++) {
          setState({ comparing: [j, j + 1] });
          updateDesc(`Comparing adjacent elements: arr[${j}]=${arr[j]} vs arr[${j+1}]=${arr[j+1]} — ${arr[j] > arr[j+1] ? `${arr[j]} > ${arr[j+1]} → need to swap` : `${arr[j]} ≤ ${arr[j+1]} → already in correct order`}`);
          await sleep(speed);
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            setState({ swapping: [j, j + 1], array: [...arr] });
            updateDesc(`Swapped: ${arr[j+1]} and ${arr[j]} — ${arr[j+1]} bubbles up, ${arr[j]} sinks down`);
            await sleep(speed);
          }
          setState({ comparing: [], swapping: [] });
        }
        setState({ sorted: [...Array(arr.length - i - 1).keys()] });
        updateDesc(`Pass ${i + 1} complete — element ${arr[arr.length - 1 - i]} is now in its final sorted position ✅`);
        await sleep(speed);
      }
      updateDesc(`✅ Bubble Sort complete! Array is now sorted in ascending order.`);
    } else if (algorithm === 'selection') {
      updateDesc(`Starting Selection Sort on array of ${arr.length} elements`);
      await sleep(speed * 1.5);
      for (let i = 0; i < arr.length - 1 && !abortRef.current; i++) {
        let minIdx = i;
        updateDesc(`Pass ${i + 1}: Scanning unsorted portion from index ${i} to ${arr.length - 1} to find the minimum element`);
        await sleep(speed);
        for (let j = i + 1; j < arr.length && !abortRef.current; j++) {
          setState({ comparing: [j, minIdx] });
          updateDesc(`Comparing: arr[${j}]=${arr[j]} vs current minimum arr[${minIdx}]=${arr[minIdx]} — ${arr[j] < arr[minIdx] ? `${arr[j]} < ${arr[minIdx]} → new minimum found at index ${j}` : `${arr[j]} ≥ ${arr[minIdx]} → not smaller`}`);
          await sleep(speed);
          if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          setState({ swapping: [i, minIdx], array: [...arr] });
          updateDesc(`Swapped minimum arr[${minIdx}]=${arr[i]} with arr[${i}]=${arr[minIdx]} — minimum placed at position ${i}`);
          await sleep(speed);
        } else {
          updateDesc(`Element at index ${i} (${arr[i]}) is already the minimum — no swap needed`);
          await sleep(speed);
        }
        setState({ comparing: [], swapping: [], sorted: [...Array(i + 1).keys()] });
      }
      setState({ sorted: Array.from({ length: arr.length }, (_, i) => i) });
      updateDesc(`✅ Selection Sort complete! Array is now sorted in ascending order.`);
    } else if (algorithm === 'insertion') {
      updateDesc(`Starting Insertion Sort — first element (${arr[0]}) is trivially sorted. Picking up cards one by one...`);
      await sleep(speed * 1.5);
      for (let i = 1; i < arr.length && !abortRef.current; i++) {
        const key = arr[i];
        updateDesc(`Picked element arr[${i}]=${key} — inserting it into the sorted portion [${arr.slice(0, i).join(', ')}]`);
        await sleep(speed);
        let j = i;
        while (j > 0 && arr[j - 1] > key && !abortRef.current) {
          setState({ comparing: [j, j - 1] });
          updateDesc(`${arr[j - 1]} > ${key} → shifting ${arr[j - 1]} right to make room`);
          await sleep(speed);
          arr[j] = arr[j - 1];
          j--;
          setState({ array: [...arr] });
        }
        arr[j] = key;
        setState({ array: [...arr] });
        if (j === i) {
          updateDesc(`${key} is already in the correct position — no shifting needed`);
        } else {
          updateDesc(`Inserted ${key} at index ${j} — elements [${arr.slice(0, i + 1).join(', ')}] are now sorted`);
        }
        await sleep(speed);
        setState({ comparing: [], swapping: [] });
      }
      setState({ sorted: Array.from({ length: arr.length }, (_, i) => i) });
      updateDesc(`✅ Insertion Sort complete! Array is now sorted in ascending order.`);
    } else if (algorithm === 'merge') {
      updateDesc(`Starting Merge Sort — using divide-and-conquer to sort ${arr.length} elements`);
      await sleep(speed * 1.5);
      const merge = async (l, m, r) => {
        const left = arr.slice(l, m + 1);
        const right = arr.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        updateDesc(`Merging sorted halves: left=[${left.join(', ')}] (indices ${l}..${m}) and right=[${right.join(', ')}] (indices ${m+1}..${r})`);
        await sleep(speed);
        while (i < left.length && j < right.length && !abortRef.current) {
          setState({ comparing: [l + i, m + 1 + j] });
          updateDesc(`Comparing: ${left[i]} vs ${right[j]} — taking the smaller element (${left[i] <= right[j] ? left[i] : right[j]})`);
          await sleep(speed / 2);
          if (left[i] <= right[j]) { arr[k] = left[i]; i++; }
          else { arr[k] = right[j]; j++; }
          k++;
          setState({ array: [...arr] });
        }
        while (i < left.length) { arr[k] = left[i]; i++; k++; }
        while (j < right.length) { arr[k] = right[j]; j++; k++; }
        setState({ array: [...arr], comparing: [] });
        updateDesc(`Merged into sorted segment: [${arr.slice(l, r + 1).join(', ')}]`);
        await sleep(speed);
      };
      const mergeSort = async (l, r, depth = 0) => {
        if (l >= r || abortRef.current) return;
        const m = Math.floor((l + r) / 2);
        updateDesc(`Splitting range [${l}..${r}] into left [${l}..${m}] and right [${m+1}..${r}]`);
        await sleep(speed);
        await mergeSort(l, m, depth + 1);
        await mergeSort(m + 1, r, depth + 1);
        await merge(l, m, r);
      };
      await mergeSort(0, arr.length - 1);
      if (!abortRef.current) {
        setState({ sorted: Array.from({ length: arr.length }, (_, i) => i) });
        updateDesc(`✅ Merge Sort complete! Array is now sorted in ascending order.`);
      }
    } else if (algorithm === 'quick') {
      updateDesc(`Starting Quick Sort — picking a pivot and partitioning the array`);
      await sleep(speed * 1.5);
      const partition = async (low, high) => {
        const pivot = arr[high];
        setState({ comparing: [high] });
        updateDesc(`Choose pivot = arr[${high}]=${pivot} (last element). Elements smaller than ${pivot} go left, larger go right.`);
        await sleep(speed);
        let i = low - 1;
        for (let j = low; j < high && !abortRef.current; j++) {
          setState({ comparing: [j, high] });
          updateDesc(`Comparing arr[${j}]=${arr[j]} with pivot=${pivot}: ${arr[j] < pivot ? `${arr[j]} < ${pivot} → belongs on LEFT side, swapping into position ${i + 1}` : `${arr[j]} ≥ ${pivot} → belongs on RIGHT side, leaving in place`}`);
          await sleep(speed);
          if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            setState({ swapping: [i, j], array: [...arr] });
            await sleep(speed);
          }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setState({ swapping: [i + 1, high], array: [...arr] });
        updateDesc(`Placed pivot ${pivot} at its correct position ${i + 1} — elements left of it are smaller, right are larger ✅`);
        await sleep(speed);
        setState({ comparing: [], swapping: [] });
        return i + 1;
      };
      const quickSort = async (low, high) => {
        if (low < high && !abortRef.current) {
          const pi = await partition(low, high);
          await quickSort(low, pi - 1);
          await quickSort(pi + 1, high);
        }
      };
      await quickSort(0, arr.length - 1);
      if (!abortRef.current) {
        setState({ sorted: Array.from({ length: arr.length }, (_, i) => i) });
        updateDesc(`✅ Quick Sort complete! Array is now sorted in ascending order.`);
      }
    }

    if (!abortRef.current) {
      setState({ isSorting: false, comparing: [], swapping: [] });
    }
    setIsRunning(false);
  }, [algorithm, array, speed, isRunning, setState, sleep]);

  const stopSort = () => {
    abortRef.current = true;
    setIsRunning(false);
    setStepDesc('');
    setState({ isSorting: false, comparing: [], swapping: [] });
  };

  const maxVal = Math.max(...array, 1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] focus:outline-none focus:border-blue-400"
        >
          {ALGORITHMS.map((a) => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 text-xs text-[var(--mcq-text-muted)]">
          <span>Size:</span>
          <input
            type="range"
            min="5"
            max="50"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isRunning}
            className="w-20 accent-blue-500"
          />
          <span className="font-mono">{arraySize}</span>
        </div>

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
            disabled={isRunning}
            className="w-24 accent-blue-500"
          />
          <span className="w-6 text-center" title="Fast">🐇</span>
          <span className="font-mono text-[10px] text-white/40 min-w-[3rem] text-center tabular-nums">
            {speed >= 1000 ? `${(speed / 1000).toFixed(1)}s` : `${speed}ms`}
          </span>
        </div>

        <button
          onClick={isRunning ? stopSort : runSort}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            isRunning
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl'
          }`}
        >
          {isRunning ? 'Stop' : 'Start Sorting'}
        </button>

        <button
          onClick={randomize}
          disabled={isRunning}
          className="px-4 py-2 rounded-lg border border-[var(--mcq-border)] text-sm font-semibold text-[var(--mcq-text-secondary)] hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
        >
          Randomize
        </button>
      </div>

      {/* Algorithm Explanation */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-[var(--mcq-text-secondary)] leading-relaxed"
      >
        <span className="font-semibold text-blue-400">How it works: </span>
        {ALGO_EXPLANATIONS[algorithm]}
      </motion.div>

      {/* Step Description */}
      {stepDesc && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 rounded-xl border text-sm font-medium leading-relaxed"
          style={{
            backgroundColor: stepDesc.startsWith('✅') ? 'rgba(34, 197, 94, 0.08)' : 'rgba(96, 165, 250, 0.08)',
            borderColor: stepDesc.startsWith('✅') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(96, 165, 250, 0.15)',
            color: stepDesc.startsWith('✅') ? '#22c55e' : 'var(--mcq-text-body)',
          }}
        >
          {stepDesc.startsWith('✅') && <span className="mr-1.5">🎉</span>}
          {stepDesc}
        </motion.div>
      )}

      {/* Visualization */}
      <div className="flex items-end gap-[2px] min-h-[300px] p-4 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)]">
        {array.map((val, i) => {
          const isComparing = comparing.includes(i);
          const isSwapping = swapping.includes(i);
          const isSorted = sorted.includes(i);
          const height = (val / maxVal) * 260;

          return (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm relative group"
              style={{
                height: Math.max(height, 4),
                backgroundColor: isSorted
                  ? '#22c55e'
                  : isSwapping
                  ? '#f59e0b'
                  : isComparing
                  ? '#60a5fa'
                  : 'rgba(99, 102, 241, 0.4)',
                transition: 'height 0.1s ease, background-color 0.15s ease',
              }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                {val}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-[var(--mcq-text-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-indigo-400/40" /> Unsorted
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-blue-400" /> Comparing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-400" /> Swapping
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-emerald-400" /> Sorted
        </span>
      </div>
    </div>
  );
}
