import QuestionBank from "./QuestionBank.jsx";

export default function BehavioralHub() {
  return (
    <div className="bhv-platform" style={{ padding: "1.5rem 0" }}>
      <div className="bhv-tab-content" style={{ padding: "0 1.25rem" }}>
        <QuestionBank />
      </div>
    </div>
  );
}
