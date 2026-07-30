export default function ComplexityTable({ data }) {
  const badge = (val) => {
    const v = val.toLowerCase();
    if (v.includes('o(1)') || v.includes('θ(1)'))
      return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-emerald-500/20';
    if (v.includes('log'))
      return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40 shadow-blue-500/20';
    if (v.includes('o(n') || v.includes('θ(n'))
      return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40 shadow-amber-500/20';
    if (v.includes('o(n²') || v.includes('θ(n²') || v.includes('o(n^2'))
      return 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/40 shadow-rose-500/20';
    return 'bg-[var(--sketch-bg-dim)] text-[var(--sketch-text-muted)] border-[var(--sketch-border)]';
  };

  return (
    <div className="space-y-6 font-sketch">
      {/* Chalkboard Complexity Table */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-5 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse select-none">
          <thead>
            <tr className="border-b-2 border-[var(--sketch-border)] font-header text-base text-[var(--sketch-accent-orange)]">
              <th className="py-3 px-4">Operation</th>
              <th className="py-3 px-4">Time Complexity</th>
              <th className="py-3 px-4">Space Complexity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sketch-border)] text-sm">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[var(--sketch-text)] font-header text-base">
                  {row.operation}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-mono font-bold border shadow-sm ${badge(row.time)}`}>
                    ⚡ {row.time}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-mono font-bold border shadow-sm ${badge(row.space)}`}>
                    💾 {row.space}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual Complexity Legend Guide */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-4 rounded-xl flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="font-bold text-[var(--sketch-text)]">O(1)</span>
          <span>Constant (Excellent)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="font-bold text-[var(--sketch-text)]">O(log n)</span>
          <span>Logarithmic (Great)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="font-bold text-[var(--sketch-text)]">O(n)</span>
          <span>Linear (Good)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span className="font-bold text-[var(--sketch-text)]">O(n²)</span>
          <span>Quadratic (Slow)</span>
        </div>
      </div>
    </div>
  );
}
