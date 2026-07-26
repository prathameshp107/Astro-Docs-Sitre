import {
  ArrowLeftRight,
  LayoutGrid,
  ArrowUpDown,
  GitBranch,
  Share2,
  Link,
  Layers,
  ListOrdered,
  Pyramid,
  Search,
  Repeat,
  Zap,
  KeyRound
} from 'lucide-react';

const ICON_MAP = {
  'two-pointers': { Icon: ArrowLeftRight, color: '#f59e0b' },
  'arrays': { Icon: LayoutGrid, color: '#7c3aed' },
  'sorting': { Icon: ArrowUpDown, color: '#c026d3' },
  'trees': { Icon: GitBranch, color: '#10b981' },
  'graphs': { Icon: Share2, color: '#f59e0b' },
  'linked-list': { Icon: Link, color: '#ec4899' },
  'stack': { Icon: Layers, color: '#14b8a6' },
  'queue': { Icon: ListOrdered, color: '#f97316' },
  'heaps': { Icon: Pyramid, color: '#8b5cf6' },
  'searching': { Icon: Search, color: '#06b6d4' },
  'recursion': { Icon: Repeat, color: '#e11d48' },
  'dp': { Icon: Zap, color: '#3b82f6' },
  'hash-table': { Icon: KeyRound, color: '#6366f1' },
};

export default function DSATopicIcon({ id, size = 24, className = "" }) {
  const item = ICON_MAP[id];
  if (!item) return <span>📊</span>;
  const { Icon, color } = item;
  return <Icon size={size} className={`inline-block flex-shrink-0 ${className}`} style={{ color }} />;
}
