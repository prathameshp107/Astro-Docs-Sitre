import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  ExternalLink,
  Maximize,
  Minimize,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  BookOpen,
  FileText,
  Eye,
  RefreshCw
} from 'lucide-react';

export default function ModernPdfViewer({ note, allNotes = [], onClose, onSelectNote }) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState('default'); // 'default', 'dark', 'sepia'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  if (!note) return null;

  // Safe encoded URL for spaces/special characters
  const encodedUrl = note.url ? encodeURI(note.url) : '';
  const viewerUrl = `${encodedUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

  // Previous & Next note navigation
  const currentIndex = allNotes.findIndex(n => n.id === note.id);
  const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
  const nextNote = currentIndex >= 0 && currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

  // Sync title and URL history
  useEffect(() => {
    setIsLoading(true);
    setZoom(100);
    setRotation(0);
    const url = new URL(window.location.href);
    url.searchParams.set('doc', note.id);
    window.history.replaceState({}, '', url.toString());

    const originalTitle = document.title;
    document.title = `${note.title} | Notes Hub - Interview Prep Buddy`;

    return () => {
      document.title = originalTitle;
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('doc');
      window.history.replaceState({}, '', cleanUrl.toString());
    };
  }, [note.id]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.();
        } else {
          onClose();
        }
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom(z => Math.min(250, z + 20));
      } else if (e.key === '-') {
        e.preventDefault();
        setZoom(z => Math.max(50, z - 20));
      } else if (e.key === '0') {
        e.preventDefault();
        setZoom(100);
        setRotation(0);
      } else if (e.key === 'r' || e.key === 'R') {
        setRotation(r => (r + 90) % 360);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/notes?doc=${note.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Filter effect style based on reading mode
  const getFilterStyle = () => {
    if (viewMode === 'dark') {
      return 'invert(92%) hue-rotate(180deg) contrast(110%) brightness(95%)';
    }
    if (viewMode === 'sepia') {
      return 'sepia(45%) contrast(95%) brightness(98%)';
    }
    return 'none';
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-2xl text-zinc-100 overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`PDF Viewer: ${note.title}`}
    >
      {/* ── Top Modern Glass Navigation Bar ── */}
      <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 backdrop-blur-xl z-20 shrink-0 gap-3">
        {/* Left: Document Info & Back */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 text-xs font-medium transition-all hover:scale-105 active:scale-95 shrink-0 border border-zinc-700/50 shadow-sm"
            title="Back to Notes Library (Esc)"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="min-w-0 flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: note.color || '#6366f1' }}
            />
            <div className="truncate">
              <h2 className="text-xs sm:text-sm font-bold text-zinc-100 truncate tracking-tight">
                {note.title}
              </h2>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <span className="truncate">{note.categoryLabel}</span>
                <span>•</span>
                <span className="font-mono text-zinc-300 font-semibold">{note.sizeFormatted}</span>
                {note.badge && (
                  <>
                    <span>•</span>
                    <span className="text-amber-400 font-medium hidden sm:inline">{note.badge}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Document Switcher (Previous / Next) */}
        <div className="hidden lg:flex items-center gap-1 bg-zinc-950/60 p-1 rounded-xl border border-zinc-800/80">
          <button
            onClick={() => prevNote && onSelectNote(prevNote)}
            disabled={!prevNote}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:pointer-events-none transition-all"
            title={prevNote ? `Previous: ${prevNote.title}` : 'First document'}
          >
            <ChevronLeft size={14} />
            <span className="text-[11px]">Prev</span>
          </button>
          <span className="text-[11px] text-zinc-500 px-2 font-mono">
            {currentIndex + 1} / {allNotes.length}
          </span>
          <button
            onClick={() => nextNote && onSelectNote(nextNote)}
            disabled={!nextNote}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:pointer-events-none transition-all"
            title={nextNote ? `Next: ${nextNote.title}` : 'Last document'}
          >
            <span className="text-[11px]">Next</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="flex items-center bg-zinc-950/60 rounded-xl border border-zinc-800/80 p-0.5">
            <button
              onClick={() => setZoom(z => Math.max(50, z - 20))}
              className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all active:scale-90"
              title="Zoom out (-)"
              aria-label="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="px-2 py-1 text-[11px] font-mono text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-all"
              title="Click to reset zoom (0)"
            >
              {zoom}%
            </button>
            <button
              onClick={() => setZoom(z => Math.min(250, z + 20))}
              className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all active:scale-90"
              title="Zoom in (+)"
              aria-label="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Rotate */}
          <button
            onClick={() => setRotation(r => (r + 90) % 360)}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white transition-all border border-zinc-700/50 hidden md:flex items-center justify-center active:scale-90"
            title="Rotate 90° clockwise (R)"
            aria-label="Rotate"
          >
            <RotateCw size={14} />
          </button>

          {/* Reading Mode Toggle */}
          <div className="hidden sm:flex items-center bg-zinc-950/60 rounded-xl border border-zinc-800/80 p-0.5">
            <button
              onClick={() => setViewMode('default')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                viewMode === 'default'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Default Day Mode"
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('dark')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                viewMode === 'dark'
                  ? 'bg-zinc-800 text-amber-300 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Dark Eye-Comfort Mode"
            >
              Dark
            </button>
            <button
              onClick={() => setViewMode('sepia')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                viewMode === 'sepia'
                  ? 'bg-amber-900/50 text-amber-200 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Sepia Warm Mode"
            >
              Sepia
            </button>
          </div>

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white transition-all border border-zinc-700/50 hidden md:flex items-center justify-center active:scale-90"
            title="Copy link to this document"
            aria-label="Copy link"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>

          {/* Open in new tab */}
          <a
            href={encodedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white transition-all border border-zinc-700/50 hidden sm:flex items-center justify-center active:scale-90"
            title="Open raw PDF in new browser tab"
            aria-label="Open in new tab"
          >
            <ExternalLink size={14} />
          </a>

          {/* Download button */}
          <a
            href={encodedUrl}
            download={note.fileName}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
            title="Download PDF"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download</span>
          </a>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white transition-all border border-zinc-700/50 hidden sm:flex items-center justify-center active:scale-90"
            title="Toggle fullscreen (F)"
            aria-label="Fullscreen"
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white border border-rose-500/40 transition-all active:scale-90"
            title="Close viewer (Esc)"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>
      </header>

      {/* ── Main Viewport Area ── */}
      <main className="relative flex-1 w-full bg-zinc-950 overflow-auto flex items-center justify-center p-2 sm:p-4 select-none">
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md z-10 pointer-events-none transition-opacity duration-300">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
                <FileText size={28} className="text-indigo-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] animate-spin">
                <RefreshCw size={10} />
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-zinc-300">
              Loading <span className="text-indigo-400 font-semibold">{note.title}</span>...
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">High-Resolution Vector PDF ({note.sizeFormatted})</p>
          </div>
        )}

        {/* Transform Container for Zoom, Rotation and Reading Filters */}
        <div
          className="w-full h-full max-w-6xl mx-auto flex items-center justify-center transition-transform duration-200"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <div
            className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/90 bg-white transition-all duration-300"
            style={{
              filter: getFilterStyle(),
            }}
          >
            <iframe
              src={viewerUrl}
              title={note.title}
              className="w-full h-full border-0 bg-white"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>

        {/* Floating Quick Action Badge */}
        {copied && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-emerald-600/95 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-emerald-400/40 backdrop-blur-md animate-in slide-in-from-bottom duration-200 z-30">
            <Check size={14} />
            <span>Direct link copied to clipboard!</span>
          </div>
        )}
      </main>

      {/* ── Bottom Mini Quick Switcher Bar ── */}
      <footer className="px-4 py-2 bg-zinc-900/80 border-t border-zinc-800/60 backdrop-blur-md text-[11px] text-zinc-400 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 truncate">
          <BookOpen size={13} className="text-indigo-400 shrink-0" />
          <span className="truncate">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-[10px] border border-zinc-700">+</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-[10px] border border-zinc-700">-</kbd> to zoom, <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-[10px] border border-zinc-700">R</kbd> to rotate, <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-[10px] border border-zinc-700">F</kbd> for fullscreen.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-zinc-500">Document ID: {note.id}</span>
          <a
            href={encodedUrl}
            download={note.fileName}
            className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline flex items-center gap-1"
          >
            <Download size={12} />
            <span>Save Offline</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
