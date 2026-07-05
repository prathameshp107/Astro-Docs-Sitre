// Merges logic for judge, plans, and MCQ stores

// Helper for standard map union merge
function mergeMap(mapA = {}, mapB = {}, mergeFn) {
  const merged = { ...mapA };
  for (const [key, valB] of Object.entries(mapB)) {
    if (key in merged) {
      merged[key] = mergeFn(merged[key], valB);
    } else {
      merged[key] = valB;
    }
  }
  return merged;
}

// ─── Judge Store Merge ───
export function mergeJudge(a = {}, b = {}) {
  // Merge Solved: 'accepted' > 'attempted'
  const solved = mergeMap(a.solved || {}, b.solved || {}, (valA, valB) => {
    return valA === 'accepted' || valB === 'accepted' ? 'accepted' : 'attempted';
  });

  // Merge Drafts: Latest timestamp wins (legacy strings fallback: longer length wins)
  const drafts = mergeMap(a.drafts || {}, b.drafts || {}, (draftA, draftB) => {
    const langs = new Set([...Object.keys(draftA || {}), ...Object.keys(draftB || {})]);
    const mergedLangs = {};
    for (const lang of langs) {
      const valA = draftA?.[lang];
      const valB = draftB?.[lang];
      
      if (!valA) {
        mergedLangs[lang] = valB;
      } else if (!valB) {
        mergedLangs[lang] = valA;
      } else {
        // Both exist: compare timestamps if objects, otherwise compare lengths
        const tsA = typeof valA === 'object' && valA !== null ? valA.timestamp || 0 : 0;
        const tsB = typeof valB === 'object' && valB !== null ? valB.timestamp || 0 : 0;
        
        if (tsA || tsB) {
          mergedLangs[lang] = tsA >= tsB ? valA : valB;
        } else {
          // Legacy string fallback
          const codeA = typeof valA === 'string' ? valA : valA.code || '';
          const codeB = typeof valB === 'string' ? valB : valB.code || '';
          mergedLangs[lang] = codeA.length >= codeB.length ? valA : valB;
        }
      }
    }
    return mergedLangs;
  });

  // Merge Submissions: deduplicate by timestamp 'ts' and limit to 50
  const submissions = mergeMap(a.submissions || {}, b.submissions || {}, (subsA = [], subsB = []) => {
    const map = new Map();
    // Later submissions override earlier ones if timestamps overlap
    [...subsA, ...subsB].forEach(sub => {
      if (sub && sub.ts) {
        const existing = map.get(sub.ts);
        if (!existing || sub.verdict === 'accepted') {
          map.set(sub.ts, sub);
        }
      }
    });
    return Array.from(map.values())
      .sort((s1, s2) => s2.ts - s1.ts)
      .slice(0, 50);
  });

  return { solved, drafts, submissions };
}

// ─── Plans Store Merge ───
export function mergePlans(a = {}, b = {}) {
  const active = Array.from(new Set([...(a.active || []), ...(b.active || [])]));
  
  const progress = mergeMap(a.progress || {}, b.progress || {}, (progA, progB) => {
    const startedAt = Math.min(progA.startedAt || Date.now(), progB.startedAt || Date.now());
    const lastTouched = Math.max(progA.lastTouched || 0, progB.lastTouched || 0);
    const done = { ...(progA.done || {}), ...(progB.done || {}) };
    return { startedAt, lastTouched, done };
  });

  return { active, progress };
}

// ─── MCQ Store Merge ───
export function mergeMcq(a = {}, b = {}) {
  // Merge answered questions list, deduplicate by id
  const map = new Map();
  const allAnswers = [...(a.answeredQuestions || []), ...(b.answeredQuestions || [])];
  
  for (const ans of allAnswers) {
    if (!ans || !ans.id) continue;
    const existing = map.get(ans.id);
    if (!existing) {
      map.set(ans.id, ans);
    } else {
      // Correct answer beats incorrect answer
      if (ans.correct && !existing.correct) {
        map.set(ans.id, ans);
      } else if (ans.correct === existing.correct) {
        // Later answer wins
        if (ans.timestamp > existing.timestamp) {
          map.set(ans.id, ans);
        }
      }
    }
  }

  const answeredQuestions = Array.from(map.values()).sort((q1, q2) => q1.timestamp - q2.timestamp);

  // Merge Category Progress maps directly
  const categoryProgress = mergeMap(a.categoryProgress || {}, b.categoryProgress || {}, (catA, catB) => {
    const answered = Math.max(catA.answered || 0, catB.answered || 0);
    const correct = Math.max(catA.correct || 0, catB.correct || 0);
    
    const topics = mergeMap(catA.topics || {}, catB.topics || {}, (topA, topB) => ({
      answered: Math.max(topA.answered || 0, topB.answered || 0),
      correct: Math.max(topA.correct || 0, topB.correct || 0),
    }));

    return { answered, correct, topics };
  });

  // Merge Achievements: union by achievement ID, keeping earliest earnedAt
  const achMap = new Map();
  [...(a.achievements || []), ...(b.achievements || [])].forEach(ach => {
    if (!ach || !ach.id) return;
    const existing = achMap.get(ach.id);
    if (!existing || ach.earnedAt < existing.earnedAt) {
      achMap.set(ach.id, ach);
    }
  });
  const achievements = Array.from(achMap.values());

  // Aggregate values
  const totalCorrect = answeredQuestions.filter(q => q.correct).length;
  const totalAnswered = answeredQuestions.length;
  const totalWrong = totalAnswered - totalCorrect;

  // Streak logic: take the max bestStreak, currentStreak is resolved by lastActive
  const bestStreak = Math.max(a.bestStreak || 0, b.bestStreak || 0);
  const lastActive = Math.max(a.lastActive || 0, b.lastActive || 0);
  
  // Resolve currentStreak based on who is more active
  let currentStreak = 0;
  if (lastActive) {
    if (a.lastActive === lastActive) currentStreak = a.currentStreak || 0;
    else currentStreak = b.currentStreak || 0;
  }

  // XP & Levels
  const xp = Math.max(a.xp || 0, b.xp || 0);
  const level = Math.max(a.level || 1, b.level || 1);

  return {
    totalAnswered,
    totalCorrect,
    totalWrong,
    currentStreak,
    bestStreak,
    xp,
    level,
    answeredQuestions,
    categoryProgress,
    achievements,
    lastActive
  };
}
