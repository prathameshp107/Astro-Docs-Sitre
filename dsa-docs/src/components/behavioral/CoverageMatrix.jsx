import { useMemo } from "react";
import { useStoryStore } from "../../store/storyStore.js";
import categoriesData from "../../data/behavioral/categories.json";

export default function CoverageMatrix() {
  const { stories } = useStoryStore();
  const categories = categoriesData.categories;

  const coverage = useMemo(() => {
    return categories.map((cat) => {
      const coveringStories = stories.filter((s) => s.tags.includes(cat.id));
      return { category: cat, coveringStories };
    });
  }, [categories, stories]);

  const gapCount = coverage.filter((c) => c.coveringStories.length === 0).length;

  if (stories.length === 0) {
    return (
      <div className="bhv-empty">
        <h3>No stories yet</h3>
        <p>Add stories in the Story Bank tab first — the coverage matrix will show which categories they cover.</p>
      </div>
    );
  }

  return (
    <div className="bhv-coverage-matrix-wrap">
      <div className="bhv-matrix-summary">
        <span className="bhv-matrix-summary-stat">
          <strong>{categories.length - gapCount}</strong> / {categories.length} categories covered
        </span>
        {gapCount > 0 && (
          <span className="bhv-matrix-summary-gap">{gapCount} gap{gapCount > 1 ? "s" : ""} remaining</span>
        )}
      </div>

      <div className="bhv-matrix-scroll">
        <table className="bhv-matrix">
          <thead>
            <tr>
              <th className="bhv-matrix-corner">Category</th>
              {stories.map((s) => (
                <th key={s.id} className="bhv-matrix-story-head" title={s.title}>
                  {s.title.length > 16 ? `${s.title.slice(0, 16)}…` : s.title}
                </th>
              ))}
              <th className="bhv-matrix-count-head">Count</th>
            </tr>
          </thead>
          <tbody>
            {coverage.map(({ category, coveringStories }) => (
              <tr key={category.id} className={coveringStories.length === 0 ? "bhv-matrix-row-gap" : ""}>
                <td className="bhv-matrix-cat-cell">{category.label}</td>
                {stories.map((s) => (
                  <td key={s.id} className="bhv-matrix-cell">
                    {s.tags.includes(category.id) ? (
                      <span className="bhv-matrix-check">✓</span>
                    ) : (
                      <span className="bhv-matrix-dash">—</span>
                    )}
                  </td>
                ))}
                <td className="bhv-matrix-count-cell">{coveringStories.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {gapCount > 0 && (
        <div className="bhv-matrix-gaps">
          <h3>Gaps — you have no story for these categories yet</h3>
          {coverage
            .filter((c) => c.coveringStories.length === 0)
            .map(({ category }) => (
              <div key={category.id} className="bhv-gap-card">
                <h4>{category.label}</h4>
                <ul>
                  {category.joggerPrompts.map((prompt, i) => (
                    <li key={i}>{prompt}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
