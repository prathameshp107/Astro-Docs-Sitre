import { useState, useMemo } from "react";
import { useStoryStore } from "../../store/storyStore.js";
import categoriesData from "../../data/behavioral/categories.json";
import StoryCard from "./StoryCard.jsx";

const EMPTY_FORM = { title: "", situation: "", task: "", action: "", result: "", tags: [] };

function wordCount(text) {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

function sentenceCount(text) {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean).length;
}

function countWord(text, word) {
  const re = new RegExp(`\\b${word}\\b`, "gi");
  return (text.match(re) || []).length;
}

/**
 * Client-side "lint" hints — no AI needed. Teaches the STAR framework
 * through cheap heuristics, per roadmap §3.2.
 */
function useLintHints(form) {
  return useMemo(() => {
    const hints = [];

    // 1. Situation should be brief (<= 2 sentences)
    if (form.situation.trim() && sentenceCount(form.situation) > 2) {
      hints.push({
        field: "situation",
        message: "Trim — interviewers lose interest in setup. Aim for 2 sentences max.",
      });
    }

    // 2. Action should be the bulk of the story (>= 60% of total words)
    const totalWords =
      wordCount(form.situation) + wordCount(form.task) + wordCount(form.action) + wordCount(form.result);
    const actionWords = wordCount(form.action);
    if (totalWords >= 20 && actionWords / totalWords < 0.6) {
      hints.push({
        field: "action",
        message: "The Action is the answer — it should be the bulk of your story (60%+ of the words).",
      });
    }

    // 3. Ownership — "we" shouldn't outweigh "I" in Action
    const weCount = countWord(form.action, "we");
    const iCount = countWord(form.action, "i");
    if (weCount > iCount && weCount > 0) {
      hints.push({
        field: "action",
        message: 'Interviewers hire YOU — own your part. Try turning some "we" into "I".',
      });
    }

    // 4. Result should be quantified
    if (form.result.trim() && !/\d/.test(form.result)) {
      hints.push({
        field: "result",
        message: "Add a number: time saved, bugs prevented, users affected, revenue impacted.",
      });
    }

    return hints;
  }, [form.situation, form.task, form.action, form.result]);
}

function HintList({ hints, field }) {
  const fieldHints = hints.filter((h) => h.field === field);
  if (fieldHints.length === 0) return null;
  return (
    <div className="bhv-lint-hints">
      {fieldHints.map((h, i) => (
        <p key={i} className="bhv-lint-hint">
          ⚠ {h.message}
        </p>
      ))}
    </div>
  );
}

function localPolish(form) {
  const polished = { ...form };
  const logs = [];

  // Situation: limit to 2 sentences and clean up fillers
  if (form.situation.trim()) {
    let sit = form.situation;
    const fillers = [
      { re: /\bbasically\b\s*/gi, rep: "" },
      { re: /\bactually\b\s*/gi, rep: "" },
      { re: /\bjust\b\s*/gi, rep: "" },
      { re: /\bessentially\b\s*/gi, rep: "" },
      { re: /\bin order to\b\s*/gi, rep: "to " },
    ];
    let changedFillers = false;
    fillers.forEach((f) => {
      if (f.re.test(sit)) {
        sit = sit.replace(f.re, f.rep);
        changedFillers = true;
      }
    });
    if (changedFillers) {
      logs.push("Removed filler words ('basically', 'actually', 'in order to') for a crisper setup.");
    }

    const sents = sit.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
    if (sents.length > 2) {
      sit = sents.slice(0, 2).join(". ") + ".";
      logs.push("Trimmed the situation to the first 2 sentences. Keep the context brief so the interviewer stays engaged.");
    }
    polished.situation = sit;
  }

  // Task: clean up and tighten
  if (form.task.trim()) {
    let task = form.task;
    task = task.replace(/\bin order to\b\s*/gi, "to ");
    polished.task = task;
  }

  // Action: passive voice and weak verb substitution
  if (form.action.trim()) {
    let act = form.action;
    
    // Replace weak verbs with strong ones
    const verbReplacements = [
      { re: /\b(helped|assisted)\b/gi, rep: "facilitated", label: "Elevated 'helped' to 'facilitated'" },
      { re: /\b(managed|supervised)\b/gi, rep: "orchestrated", label: "Elevated 'managed' to 'orchestrated'" },
      { re: /\b(created|made)\b/gi, rep: "engineered", label: "Upgraded 'created' to 'engineered'" },
      { re: /\b(built)\b/gi, rep: "architected", label: "Upgraded 'built' to 'architected'" },
      { re: /\b(worked on)\b/gi, rep: "spearheaded", label: "Replaced 'worked on' with 'spearheaded'" },
      { re: /\b(fixed|solved)\b/gi, rep: "resolved", label: "Upgraded 'fixed' to 'resolved'" },
      { re: /\b(tested)\b/gi, rep: "validated", label: "Upgraded 'tested' to 'validated'" },
      { re: /\b(improved)\b/gi, rep: "optimized", label: "Upgraded 'improved' to 'optimized'" },
      { re: /\b(talked to|discussed with)\b/gi, rep: "collaborated with", label: "Replaced with 'collaborated with'" },
    ];

    verbReplacements.forEach((v) => {
      if (v.re.test(act)) {
        act = act.replace(v.re, v.rep);
        logs.push(`${v.label} for a more executive, high-ownership tone.`);
      }
    });

    // Check passive voice
    const passiveRe = /\b(was|were)\s+(\w+ed|built|done|made|fixed|solved)\s+by\b/gi;
    if (passiveRe.test(act)) {
      logs.push("Converted passive voice ('was done by') into active voice to highlight your direct impact.");
      act = act.replace(passiveRe, (match, p1, p2) => `I ${p2}`);
    }

    // Check if 'we' outweighs 'I'
    const weCount = (act.match(/\bwe\b/gi) || []).length;
    const iCount = (act.match(/\bi\b/gi) || []).length;
    if (weCount > iCount && weCount > 0) {
      logs.push("Contains high amount of 'we' pronouns. Swapped to 'I' where appropriate to own your contributions.");
      act = act.replace(/\bwe\b/gi, "I");
    }

    polished.action = act;
  }

  // Result: check for metrics
  if (form.result.trim()) {
    let res = form.result;
    if (!/\d/.test(res)) {
      logs.push("WARNING: Result lacks hard metrics. Added metric reminder placeholder to prompt you to add quantified impact.");
      res = res.replace(/\.?$/, " [resulting in a X% improvement / saving Y hours].");
    }
    polished.result = res;
  }

  return { polished, logs };
}

function AIPolishModal({ isOpen, onClose, original, polishedData, onAccept }) {
  if (!isOpen || !polishedData) return null;
  const { polished, logs } = polishedData;

  return (
    <div className="bhv-polish-modal-backdrop" onClick={onClose}>
      <div className="bhv-polish-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bhv-polish-modal-header">
          <h3>✨ AI STAR Story Polish</h3>
          <button className="bhv-polish-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="bhv-polish-modal-body">
          <div className="bhv-polish-logs">
            <h4>Optimization Suggestions ({logs.length})</h4>
            {logs.length === 0 ? (
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Your story structure looks strong! Wording is tight and metrics are present.
              </p>
            ) : (
              <ul className="bhv-polish-log-list">
                {logs.map((log, i) => (
                  <li key={i}>{log}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="bhv-polish-modal-columns">
            <div className="bhv-polish-col">
              <h4>Original Story</h4>
              <div className="bhv-polish-box">
                <div className="bhv-polish-section">
                  <strong>Situation:</strong>
                  <p>{original.situation || "—"}</p>
                </div>
                <div className="bhv-polish-section">
                  <strong>Task:</strong>
                  <p>{original.task || "—"}</p>
                </div>
                <div className="bhv-polish-section">
                  <strong>Action:</strong>
                  <p>{original.action || "—"}</p>
                </div>
                <div className="bhv-polish-section">
                  <strong>Result:</strong>
                  <p>{original.result || "—"}</p>
                </div>
              </div>
            </div>

            <div className="bhv-polish-col">
              <h4>Polished Suggestion</h4>
              <div className="bhv-polish-box polished">
                <div className="bhv-polish-section">
                  <strong>Situation:</strong>
                  <p>{polished.situation || "—"}</p>
                </div>
                <div className="bhv-polish-section">
                  <strong>Task:</strong>
                  <p>{polished.task || "—"}</p>
                </div>
                <div className="bhv-polish-section">
                  <strong>Action:</strong>
                  <p>
                    {polished.action ? (
                      polished.action.split(/\b(facilitated|orchestrated|engineered|architected|spearheaded|resolved|validated|optimized|collaborated with)\b/g).map((part, i) => {
                        const isVerb = ["facilitated", "orchestrated", "engineered", "architected", "spearheaded", "resolved", "validated", "optimized", "collaborated with"].includes(part.toLowerCase());
                        return isVerb ? <span key={i} className="highlight-change">{part}</span> : part;
                      })
                    ) : "—"}
                  </p>
                </div>
                <div className="bhv-polish-section">
                  <strong>Result:</strong>
                  <p>
                    {polished.result ? (
                      polished.result.includes("[resulting in a X% improvement") ? (
                        <>
                          {polished.result.split("[resulting in")[0]}
                          <span className="highlight-metric">[resulting in a X% improvement / saving Y hours]</span>
                        </>
                      ) : polished.result
                    ) : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bhv-polish-modal-footer">
          <button className="bhv-btn-secondary" onClick={onClose}>Keep Original</button>
          <button className="bhv-btn-primary" onClick={onAccept}>Accept Polish & Apply</button>
        </div>
      </div>
    </div>
  );
}

export default function StoryBuilder() {
  const { stories, addStory, updateStory, deleteStory } = useStoryStore();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showPolishModal, setShowPolishModal] = useState(false);
  const [polishedData, setPolishedData] = useState(null);

  const categories = categoriesData.categories;
  const hints = useLintHints(form);

  const triggerPolish = () => {
    const { polished, logs } = localPolish(form);
    setPolishedData({ polished, logs });
    setShowPolishModal(true);
  };

  const acceptPolish = () => {
    if (polishedData) {
      setForm(polishedData.polished);
    }
    setShowPolishModal(false);
    setPolishedData(null);
  };

  const setField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleTag = (tagId) =>
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tagId) ? f.tags.filter((t) => t !== tagId) : [...f.tags, tagId],
    }));

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingId) {
      updateStory(editingId, form);
    } else {
      addStory(form);
    }
    resetForm();
  };

  const handleEdit = (story) => {
    setForm({
      title: story.title,
      situation: story.situation,
      task: story.task,
      action: story.action,
      result: story.result,
      tags: story.tags,
    });
    setEditingId(story.id);
  };

  const handleDelete = (id) => {
    if (editingId === id) resetForm();
    deleteStory(id);
  };

  return (
    <div className="bhv-story-builder">
      <form className="bhv-story-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit story" : "Build a new STAR story"}</h3>

        <label className="bhv-field">
          <span>Title</span>
          <input
            type="text"
            placeholder="e.g. The rollback that saved a launch"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
          />
        </label>

        <label className="bhv-field">
          <span>Situation <em>(2 sentences max — set the scene, then move on)</em></span>
          <textarea
            rows={2}
            placeholder="What was the context?"
            value={form.situation}
            onChange={(e) => setField("situation", e.target.value)}
          />
          <HintList hints={hints} field="situation" />
        </label>

        <label className="bhv-field">
          <span>Task</span>
          <textarea
            rows={2}
            placeholder="What were you responsible for?"
            value={form.task}
            onChange={(e) => setField("task", e.target.value)}
          />
        </label>

        <label className="bhv-field">
          <span>Action <em>(the bulk of the story — what did YOU do, first person)</em></span>
          <textarea
            rows={5}
            placeholder="Walk through what you specifically did..."
            value={form.action}
            onChange={(e) => setField("action", e.target.value)}
          />
          <HintList hints={hints} field="action" />
        </label>

        <label className="bhv-field">
          <span>Result <em>(quantify it)</em></span>
          <textarea
            rows={2}
            placeholder="What happened? Include a number if you can."
            value={form.result}
            onChange={(e) => setField("result", e.target.value)}
          />
          <HintList hints={hints} field="result" />
        </label>

        <div className="bhv-field">
          <span>Categories this story can answer</span>
          <div className="bhv-tag-checkboxes">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                className={`bhv-tag-checkbox ${form.tags.includes(cat.id) ? "active" : ""}`}
                onClick={() => toggleTag(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bhv-story-form-actions">
          <button type="submit" className="bhv-btn-primary">
            {editingId ? "Save changes" : "Add story"}
          </button>
          <button
            type="button"
            className="bhv-btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "0.25rem", border: "1px solid var(--accent)" }}
            onClick={triggerPolish}
            disabled={!form.situation.trim() && !form.action.trim()}
            title="Polishes spelling, passive voice, weak verbs, and flags missing metrics."
          >
            ✨ AI Polish
          </button>
          {editingId && (
            <button type="button" className="bhv-btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bhv-story-list">
        <h3>Your stories ({stories.length})</h3>
        {stories.length === 0 ? (
          <div className="bhv-empty">
            <h3>No stories yet</h3>
            <p>Build your first STAR story above. Aim for 8–10 that together cover every category.</p>
          </div>
        ) : (
          stories.map((story) => (
            <StoryCard key={story.id} story={story} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </div>

      <AIPolishModal
        isOpen={showPolishModal}
        onClose={() => setShowPolishModal(false)}
        original={form}
        polishedData={polishedData}
        onAccept={acceptPolish}
      />
    </div>
  );
}
