// Problem bank loader. Problems live as individual JSON files under
// ./problems/*.json — this glob keeps the manifest in sync automatically
// instead of hand-maintaining a separate index file that can drift.
const modules = import.meta.glob("./problems/*.json", { eager: true });

const PROBLEMS = Object.values(modules).map((m) => m.default ?? m);

export function getJudgeProblems() {
  return PROBLEMS;
}

export function getJudgeProblemById(id) {
  return PROBLEMS.find((p) => p.id === id);
}

export function getJudgeManifest() {
  return PROBLEMS.map(({ id, title, difficulty, topics, companies }) => ({ id, title, difficulty, topics, companies }));
}
