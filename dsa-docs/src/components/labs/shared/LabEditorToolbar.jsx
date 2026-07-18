import { FiPlay, FiRefreshCw, FiMaximize2, FiMinimize2, FiPlus, FiMinus, FiShare2, FiCheck } from "react-icons/fi";
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
  // Fullscreen
  onFullscreen,
  isFullscreen,
  // Font size controls
  fontSize,
  onFontSizeUp,
  onFontSizeDown,
  // Share controls
  code,
  onShare,
}) {
  const p = prefix;
  const [shared, setShared] = useState(false);
  const [hoverStates, setHoverStates] = useState({
    run: false,
    reset: false,
    fullscreen: false,
    fontUp: false,
    fontDown: false,
  });

  const handleShare = () => {
    if (onShare) {
      onShare();
      return;
    }
    if (!code) return;
    try {
      const hash = btoa(unescape(encodeURIComponent(code)));
      const shareUrl = `${window.location.origin}${window.location.pathname}#code=${hash}`;
      navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (e) {
      /* ignore */
    }
  };

  const handleMouseEnter = (buttonType) => {
    setHoverStates((prev) => ({ ...prev, [buttonType]: true }));
  };

  const handleMouseLeave = (buttonType) => {
    setHoverStates((prev) => ({ ...prev, [buttonType]: false }));
  };

  return (
    <div className={`${p}-editor-actions`}>
      <button
        className={`${p}-btn-run ${isRunning ? "disabled" : ""} ${hoverStates.run ? "hover" : ""}`}
        onClick={onRun}
        disabled={isRunning}
        title={`${shortcut}`}
        style={runButtonStyle}
        onMouseEnter={() => handleMouseEnter("run")}
        onMouseLeave={() => handleMouseLeave("run")}
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
        onMouseEnter={() => handleMouseEnter("reset")}
        onMouseLeave={() => handleMouseLeave("reset")}
      >
        <FiRefreshCw size={14} />
        Reset
      </button>

      {/* Font-size controls (opt-in) */}
      {onFontSizeDown && (
        <button
          className={`${p}-btn-secondary ${hoverStates.fontDown ? "hover" : ""}`}
          onClick={onFontSizeDown}
          title="Decrease font size"
          aria-label="Decrease editor font size"
          onMouseEnter={() => handleMouseEnter("fontDown")}
          onMouseLeave={() => handleMouseLeave("fontDown")}
          style={{ padding: "0 6px", minWidth: "unset" }}
        >
          <FiMinus size={13} />
        </button>
      )}
      {fontSize != null && (
        <span
          style={{ fontSize: "11px", opacity: 0.6, userSelect: "none", minWidth: "28px", textAlign: "center" }}
        >
          {fontSize}px
        </span>
      )}
      {onFontSizeUp && (
        <button
          className={`${p}-btn-secondary ${hoverStates.fontUp ? "hover" : ""}`}
          onClick={onFontSizeUp}
          title="Increase font size"
          aria-label="Increase editor font size"
          onMouseEnter={() => handleMouseEnter("fontUp")}
          onMouseLeave={() => handleMouseLeave("fontUp")}
          style={{ padding: "0 6px", minWidth: "unset" }}
        >
          <FiPlus size={13} />
        </button>
      )}

      {code !== undefined && (
        <button
          className={`${p}-btn-secondary`}
          onClick={handleShare}
          title="Share your code"
          aria-label="Share code"
          style={{ padding: "0 8px", minWidth: "unset", display: "flex", gap: "0.25rem", alignItems: "center" }}
        >
          {shared ? <FiCheck size={13} style={{ color: "#22c55e" }} /> : <FiShare2 size={13} />}
          <span style={{ fontSize: "11px" }}>{shared ? "Copied!" : "Share"}</span>
        </button>
      )}

      {extraButtons}

      {/* Fullscreen toggle (opt-in) */}
      {onFullscreen && (
        <button
          className={`${p}-btn-secondary ${hoverStates.fullscreen ? "hover" : ""}`}
          onClick={onFullscreen}
          title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen editor (F11)"}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          onMouseEnter={() => handleMouseEnter("fullscreen")}
          onMouseLeave={() => handleMouseLeave("fullscreen")}
          style={{ marginLeft: "auto", padding: "0 8px", minWidth: "unset" }}
        >
          {isFullscreen ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
        </button>
      )}

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
