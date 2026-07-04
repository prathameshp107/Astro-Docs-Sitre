// Plan bank loader. Plans live as individual JSON files under ./plans/*.json
// import.meta.glob keeps the manifest in sync automatically.
const modules = import.meta.glob("./plans/**/*.json", { eager: true });

const PLANS = Object.values(modules).map((m) => m.default ?? m);

export function getPlans() {
  return PLANS;
}

export function getPlanById(id) {
  return PLANS.find((p) => p.id === id);
}

export function getPlanManifest() {
  return PLANS.map(({ id, title, tagline, difficulty, durationDays, hoursPerDay, tags, heroTopics }) => ({
    id, title, tagline, difficulty, durationDays, hoursPerDay, tags, heroTopics,
  }));
}
