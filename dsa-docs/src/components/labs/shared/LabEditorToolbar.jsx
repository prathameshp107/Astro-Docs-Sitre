import { FiPlay, FiRefreshCw } from "react-icons/fi";
import { useState } from "react";

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
  // Hover states for toolbar buttons
  const [hoverStates, setHoverStates] = useState({
    run: false,
    reset: false
  });

  // Handle hover states
  const handleMouseEnter = (buttonType) => {
    setHoverStates(prev => ({ ...prev, [buttonType]: true }));
  };

  const handleMouseLeave = (buttonType) => {
    setHoverStates(prev => ({ ...prev, [buttonType]: false }));
  };

  return (
    <div className={`${p}-editor-actions`}>
      <button
        className={`${p}-btn-run ${isRunning ? "disabled" : ""} ${hoverStates.run ? "hover" : ""}`}
        onClick={onRun}
        disabled={isRunning}
        title={`${shortcut}`}
        style={runButtonStyle}
        onMouseEnter={() => handleMouseEnter('run')}
        onMouseLeave={() => handleMouseLeave('run')}
      >
        {isRunning ? (
          <><span className={`${p}-spinner`} /> Running</>
        ) : (
          <><FiPlay size={14} fill="currentColor" /> {runLabel}</>
        )}
      </button>
      <button
        className={`${p}-btn-secondary ${hoverStates.reset ? "hover" : ""}`}
        onClick={onReset}
        onMouseEnter={() => handleMouseEnter('reset')}
        onMouseLeave={() => handleMouseLeave('reset')}
      >
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
