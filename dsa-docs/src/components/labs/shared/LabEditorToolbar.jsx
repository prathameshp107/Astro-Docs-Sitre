import { FiPlay, FiRefreshCw } from "react-icons/fi";

export default function LabEditorToolbar({
  isRunning,
  onRun,
  onReset,
  runLabel = "Run",
  lang,
  langIcon,
  shortcut = "Ctrl+Enter to run",
  extraButtons,
  runButtonStyle,
  prefix = "jsl",
}) {
  const p = prefix;
  return (
    <div className={`${p}-editor-actions`}>
      <button
        className={`${p}-btn-run`}
        onClick={onRun}
        disabled={isRunning}
        title={`${shortcut}`}
        style={runButtonStyle}
      >
        {isRunning ? (
          <><span className={`${p}-spinner`} /> Running</>
        ) : (
          <><FiPlay size={14} fill="currentColor" /> {runLabel}</>
        )}
      </button>
      <button className={`${p}-btn-secondary`} onClick={onReset}>
        <FiRefreshCw size={14} />
        Reset
      </button>
      {extraButtons}
      {lang && (
        <span className={`${p}-editor-lang`}>
          {langIcon}
          {lang}
        </span>
      )}
      <span className={`${p}-editor-shortcut`}>{shortcut}</span>
    </div>
  );
}
