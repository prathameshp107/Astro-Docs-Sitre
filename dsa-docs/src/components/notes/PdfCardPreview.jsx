import React, { useState } from 'react';
import {
  FileText,
  Eye,
  Maximize2,
  Sparkles,
  Network,
  GitFork,
  Cpu,
  Database,
  Server,
  Code,
  Layers,
  Zap,
  Boxes,
  BookOpen
} from 'lucide-react';

// Select topic-specific icon for the document mockup
function getTopicIcon(note) {
  const t = (note.title + ' ' + (note.tags || []).join(' ')).toLowerCase();
  if (t.includes('system design') || t.includes('hld') || t.includes('microservice')) return Network;
  if (t.includes('dsa') || t.includes('algorithm') || t.includes('tree') || t.includes('graph')) return GitFork;
  if (t.includes('llm') || t.includes('ai') || t.includes('rag') || t.includes('gpt')) return Cpu;
  if (t.includes('docker') || t.includes('kubernetes') || t.includes('container')) return Server;
  if (t.includes('sql') || t.includes('database') || t.includes('redis')) return Database;
  if (t.includes('react') || t.includes('javascript') || t.includes('nextjs')) return Code;
  if (t.includes('case study') || t.includes('blinkit') || t.includes('whatsapp')) return Layers;
  return FileText;
}

export default function PdfCardPreview({ note, onOpenFull }) {
  const [showLiveEmbed, setShowLiveEmbed] = useState(false);
  const TopicIcon = getTopicIcon(note);
  const accentColor = note.color || '#6366f1';
  const encodedUrl = note.url ? encodeURI(note.url) : '';

  const handleToggleLive = (e) => {
    e.stopPropagation();
    setShowLiveEmbed(!showLiveEmbed);
  };

  return (
    <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800/80 mb-3.5 select-none group/preview">
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:14px_14px] opacity-20 pointer-events-none" />

      {/* ── Mode 1: Live Interactive Iframe Peek ── */}
      {showLiveEmbed ? (
        <div className="relative w-full h-full bg-white animate-in fade-in duration-200">
          <iframe
            src={`${encodedUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
            title={`Preview of ${note.title}`}
            className="w-full h-full border-0"
            loading="lazy"
          />
          {/* Top Bar inside Live Peek */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
            <button
              onClick={handleToggleLive}
              className="px-2 py-1 rounded-md bg-zinc-900/90 text-zinc-300 hover:text-white text-[10px] font-medium border border-zinc-700/80 shadow-md backdrop-blur-md"
              title="Return to card cover"
            >
              Close Peek
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenFull(note);
              }}
              className="p-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
              title="Expand to Full Modern Viewer"
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>
      ) : (
        /* ── Mode 2: Realistic Stylized Document Sheet Preview ── */
        <div className="relative w-full h-full flex items-center justify-center p-3">
          {/* The Document Sheet */}
          <div className="relative w-44 sm:w-48 h-full bg-zinc-900/95 rounded-lg border border-zinc-700/60 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-0.5 flex flex-col justify-between p-3 overflow-hidden">
            {/* Top Sheet Header */}
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[9px] font-mono text-zinc-400 font-semibold tracking-wider uppercase">
                  PDF • P.1
                </span>
              </div>

              {/* Document Icon & Title Miniature */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
                >
                  <TopicIcon size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-zinc-200 truncate leading-tight">
                    {note.title}
                  </div>
                  <div className="text-[9px] text-zinc-500 truncate">
                    {note.categoryLabel}
                  </div>
                </div>
              </div>

              {/* Wireframe Paragraph Lines */}
              <div className="space-y-1.5 my-2">
                <div className="h-1.5 bg-zinc-800 rounded-full w-full" />
                <div className="h-1.5 bg-zinc-800/80 rounded-full w-5/6" />
                <div className="h-1.5 bg-zinc-800/60 rounded-full w-4/6" />
              </div>

              {/* Mini Diagram / Code Wireframe Box */}
              <div className="p-1.5 rounded bg-zinc-950/70 border border-zinc-800/80 text-[8px] font-mono text-zinc-400 space-y-0.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>// architecture</span>
                  <span className="text-emerald-400">● 60fps</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded w-4/5" />
                <div className="h-1 bg-indigo-500/40 rounded w-3/5" />
              </div>
            </div>

            {/* Bottom Sheet Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[8px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1">
                <Sparkles size={8} className="text-amber-400" />
                <span>{note.badge || 'Vector PDF'}</span>
              </span>
              <span>{note.sizeFormatted}</span>
            </div>
          </div>

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 z-10">
            <button
              onClick={() => onOpenFull(note)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Eye size={13} />
              <span>Open PDF Studio</span>
            </button>

            <button
              onClick={handleToggleLive}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[10px] font-medium border border-zinc-700/60 shadow-md transition-all hover:scale-105"
            >
              <span>Peek Live Page 1</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
