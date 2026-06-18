export default function ComplexityTable({ data }) {
  const badge = (val) => {
    const v = val.toLowerCase();
    if (v.includes('o(1)') || v.includes('θ(1)')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (v.includes('log')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (v.includes('o(n') || v.includes('θ(n')) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    if (v.includes('o(n²') || v.includes('θ(n²') || v.includes('o(n^2')) return 'bg-red-500/10 text-red-400 border-red-500/20';
    return 'bg-white/5 text-[var(--mcq-text-muted)] border-white/10';
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--mcq-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500/10 to-emerald-500/5">
            <th className="text-left px-4 py-3 font-semibold text-[var(--mcq-text-primary)]">Operation</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--mcq-text-primary)]">Time Complexity</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--mcq-text-primary)]">Space Complexity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-[var(--mcq-border)] hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 font-medium text-[var(--mcq-text)]">{row.operation}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${badge(row.time)}`}>
                  {row.time}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${badge(row.space)}`}>
                  {row.space}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
