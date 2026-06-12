// ─── Progress Store — localStorage Based ───

const STORAGE_KEY = 'mcq-progress';

function loadProgress() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProgress(data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore quota errors */ }
}

export function getInitialProgress() {
  const saved = loadProgress();
  if (saved) return saved;
  return {
    totalAnswered: 0,
    totalCorrect: 0,
    totalWrong: 0,
    currentStreak: 0,
    bestStreak: 0,
    xp: 0,
    level: 1,
    answeredQuestions: [], // { id, correct, timestamp }
    categoryProgress: {},  // { categoryId: { answered, correct, topics: { topicName: { answered, correct } } } }
    achievements: [],
    lastActive: null,
  };
}

export function recordAnswer(progress, question, selectedAnswer) {
  const isCorrect = arraysEqual(
    [...selectedAnswer].sort(),
    [...question.correctAnswer].sort()
  );

  const updated = { ...progress };
  updated.totalAnswered += 1;
  if (isCorrect) {
    updated.totalCorrect += 1;
    updated.currentStreak += 1;
    updated.bestStreak = Math.max(updated.bestStreak, updated.currentStreak);
    updated.xp += question.xpReward || 10;
  } else {
    updated.totalWrong += 1;
    updated.currentStreak = 0;
  }

  // Track answered questions
  updated.answeredQuestions = [
    ...updated.answeredQuestions,
    { id: question.id, correct: isCorrect, timestamp: Date.now() },
  ];

  // Track category progress
  const catId = question.technology;
  if (!updated.categoryProgress[catId]) {
    updated.categoryProgress[catId] = { answered: 0, correct: 0, topics: {} };
  }
  const cat = updated.categoryProgress[catId];
  cat.answered += 1;
  if (isCorrect) cat.correct += 1;

  // Track topic progress
  if (!cat.topics[question.topic]) {
    cat.topics[question.topic] = { answered: 0, correct: 0 };
  }
  const topic = cat.topics[question.topic];
  topic.answered += 1;
  if (isCorrect) topic.correct += 1;

  // Calculate level
  updated.level = Math.floor(updated.xp / 100) + 1;

  // Check achievements
  updated.achievements = checkAchievements(updated);

  updated.lastActive = Date.now();
  saveProgress(updated);
  return updated;
}

export function getAccuracy(progress) {
  if (progress.totalAnswered === 0) return 0;
  return Math.round((progress.totalCorrect / progress.totalAnswered) * 100);
}

export function getCategoryAccuracy(progress, categoryId) {
  const cat = progress.categoryProgress[categoryId];
  if (!cat || cat.answered === 0) return 0;
  return Math.round((cat.correct / cat.answered) * 100);
}

export function getTopicAccuracy(progress, categoryId, topicName) {
  const cat = progress.categoryProgress[categoryId];
  if (!cat || !cat.topics[topicName]) return 0;
  const topic = cat.topics[topicName];
  return Math.round((topic.correct / topic.answered) * 100);
}

export function isQuestionAnswered(progress, questionId) {
  return progress.answeredQuestions.some(q => q.id === questionId);
}

export function getStreakInfo(progress) {
  return { current: progress.currentStreak, best: progress.bestStreak };
}

const ACHIEVEMENT_DEFS = [
  { id: 'first-answer', name: 'First Steps', desc: 'Answer your first question', icon: '🎯', check: (p) => p.totalAnswered >= 1 },
  { id: 'ten-answers', name: 'Getting Started', desc: 'Answer 10 questions', icon: '📚', check: (p) => p.totalAnswered >= 10 },
  { id: 'fifty-answers', name: 'Dedicated Learner', desc: 'Answer 50 questions', icon: '💪', check: (p) => p.totalAnswered >= 50 },
  { id: 'hundred-answers', name: 'Centurion', desc: 'Answer 100 questions', icon: '🏆', check: (p) => p.totalAnswered >= 100 },
  { id: 'perfect-ten', name: 'Perfect Streak', desc: 'Answer 10 in a row correctly', icon: '🔥', check: (p) => p.bestStreak >= 10 },
  { id: 'perfect-25', name: 'Unstoppable', desc: 'Answer 25 in a row correctly', icon: '💎', check: (p) => p.bestStreak >= 25 },
  { id: 'first-cat', name: 'Explorer', desc: 'Complete questions in any category', icon: '🧭', check: (p) => Object.keys(p.categoryProgress).length >= 1 },
  { id: 'three-cats', name: 'Polyglot', desc: 'Answer questions in 3 different categories', icon: '🗺️', check: (p) => Object.keys(p.categoryProgress).length >= 3 },
  { id: 'hundred-xp', name: 'Apprentice', desc: 'Earn 100 XP', icon: '⭐', check: (p) => p.xp >= 100 },
  { id: 'five-hundred-xp', name: 'Expert', desc: 'Earn 500 XP', icon: '🌟', check: (p) => p.xp >= 500 },
  { id: 'thousand-xp', name: 'Master', desc: 'Earn 1000 XP', icon: '👑', check: (p) => p.xp >= 1000 },
  { id: 'ninety-accuracy', name: 'Precision', desc: 'Achieve 90%+ accuracy', icon: '🎯', check: (p) => p.totalAnswered >= 20 && getAccuracy(p) >= 90 },
];

function checkAchievements(progress) {
  const earned = [...progress.achievements];
  for (const def of ACHIEVEMENT_DEFS) {
    if (!earned.some(a => a.id === def.id) && def.check(progress)) {
      earned.push({ id: def.id, name: def.name, desc: def.desc, icon: def.icon, earnedAt: Date.now() });
    }
  }
  return earned;
}

export function getAllAchievements() {
  return ACHIEVEMENT_DEFS;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
