import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";

export default function LabTopbar({
  base,
  title,
  icon,
  children,
  progressStats,
  monacoTheme,
  onToggleTheme,
  progressBarClass,
  prefix = "jsl",
  onOpenPalette,
}) {
  const p = prefix;
  return (
    <div className={`${p}-topbar`}>
      <div className={`${p}-topbar-left`}>
        <a href={`${base}labs`} className={`${p}-top-back`}>
          <FiArrowLeft size={16} />
          Labs
        </a>
        <div className={`${p}-top-brand`}>
          {icon && (
            <div className={`${p}-top-brand-icon`} style={icon.style}>
              {icon.component}
            </div>
          )}
          <span className={`${p}-top-title`}>{title}</span>
        </div>
      </div>
      <div className={`${p}-topbar-center`}>
        <span className={`${p}-top-progress-text`}>
          {progressStats.total}/{progressStats.totalAll} completed
        </span>
        <div className={`${p}-top-progress-bar`}>
          <div
            className={`${p}-top-progress-fill ${progressBarClass || ""}`}
            style={{ width: `${progressStats.pct}%` }}
          />
        </div>
        <span className={`${p}-top-percent`}>{progressStats.pct}%</span>
      </div>
      <div className={`${p}-topbar-right`}>
        {onOpenPalette && (
          <button
            className={`${p}-btn-command-palette`}
            onClick={onOpenPalette}
            title="Open Command Palette (Ctrl+K)"
          >
            <span>Search / Commands</span>
            <kbd className="lcp-kbd">Ctrl+K</kbd>
          </button>
        )}
        {children}
        <button
          className={`${p}-btn-icon`}
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {monacoTheme === "jsl-dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>
      </div>
    </div>
  );
}
