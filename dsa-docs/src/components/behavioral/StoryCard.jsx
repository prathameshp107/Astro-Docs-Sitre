import categoriesData from "../../data/behavioral/categories.json";

const categoryById = Object.fromEntries(
  categoriesData.categories.map((c) => [c.id, c])
);

function truncate(text, max = 140) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

export default function StoryCard({ story, onEdit, onDelete }) {
  return (
    <div className="bhv-story-card">
      <div className="bhv-story-card-header">
        <h3>{story.title}</h3>
        <div className="bhv-story-card-actions">
          <button className="bhv-btn-secondary" onClick={() => onEdit(story)}>
            Edit
          </button>
          <button className="bhv-btn-danger" onClick={() => onDelete(story.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="bhv-story-card-star">
        <p><strong>S:</strong> {truncate(story.situation)}</p>
        <p><strong>T:</strong> {truncate(story.task)}</p>
        <p><strong>A:</strong> {truncate(story.action)}</p>
        <p><strong>R:</strong> {truncate(story.result)}</p>
      </div>

      <div className="bhv-story-card-tags">
        {story.tags.length === 0 ? (
          <span className="bhv-story-tag-empty">No categories tagged yet</span>
        ) : (
          story.tags.map((tagId) => (
            <span key={tagId} className="bhv-story-tag">
              {categoryById[tagId]?.label || tagId}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
