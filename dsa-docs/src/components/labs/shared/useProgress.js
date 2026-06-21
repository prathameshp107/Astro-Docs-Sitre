import { useState, useCallback, useEffect } from "react";

export default function useProgress(storageKey, initialData = {}) {
  const [progress, setProgress] = useState(initialData);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        sessionStorage.getItem(storageKey) || JSON.stringify(initialData)
      );
      setProgress(stored);
    } catch {
      // ignore
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProgress = useCallback(
    (newProgress) => {
      setProgress(newProgress);
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(newProgress));
      } catch {
        // ignore
      }
    },
    [storageKey]
  );

  const markDone = useCallback(
    (key, id) => {
      if (!progress[key]?.includes(id)) {
        const next = {
          ...progress,
          [key]: [...(progress[key] || []), id],
        };
        saveProgress(next);
      }
    },
    [progress, saveProgress]
  );

  const computeStats = useCallback(
    (totals) => {
      const keys = Object.keys(totals);
      let total = 0;
      let totalAll = 0;
      const stats = {};

      keys.forEach((key) => {
        const done = progress[key]?.length || 0;
        const totalCount = totals[key];
        stats[`${key}Done`] = done;
        stats[`${key}Total`] = totalCount;
        stats[key] = progress[key] || [];
        total += done;
        totalAll += totalCount;
      });

      stats.total = total;
      stats.totalAll = totalAll;
      stats.pct = totalAll > 0 ? Math.round((total / totalAll) * 100) : 0;
      return stats;
    },
    [progress]
  );

  return { progress, setProgress, saveProgress, markDone, computeStats };
}
