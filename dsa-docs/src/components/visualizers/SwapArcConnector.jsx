import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SwapArcConnector({ containerRef, fromIndex, toIndex, label = 'swapping' }) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const updateCoords = () => {
      if (!containerRef?.current) return;
      const cards = containerRef.current.querySelectorAll('.sketch-card');
      if (cards[fromIndex] && cards[toIndex]) {
        const c1 = cards[fromIndex].getBoundingClientRect();
        const c2 = cards[toIndex].getBoundingClientRect();
        const parent = containerRef.current.getBoundingClientRect();

        const x1 = c1.left + c1.width / 2 - parent.left;
        const x2 = c2.left + c2.width / 2 - parent.left;
        const y = Math.max(c1.bottom, c2.bottom) - parent.top + 48;

        setCoords({ x1, x2, y });
      }
    };

    updateCoords();
    const timer = setTimeout(updateCoords, 50);
    window.addEventListener('resize', updateCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCoords);
    };
  }, [fromIndex, toIndex, containerRef]);

  if (!coords) return null;

  const { x1, x2, y } = coords;
  const fromX = x1;
  const toX = x2;
  const bottomY = y + 24;

  const pathD = `M ${fromX} ${y} V ${bottomY} H ${toX} V ${y + 6}`;

  return (
    <AnimatePresence>
      <motion.svg
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 overflow-visible"
      >
        {/* Glow backdrop path */}
        <path
          d={pathD}
          fill="none"
          stroke="#f43f5e"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />
        {/* Main hand-drawn stroke */}
        <path
          d={pathD}
          fill="none"
          stroke="#f43f5e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrowhead pointing UP at toX */}
        <polygon
          points={`${toX - 5},${y + 12} ${toX},${y + 4} ${toX + 5},${y + 12}`}
          fill="#f43f5e"
        />
        {/* Handwritten label underneath */}
        <text
          x={(fromX + toX) / 2}
          y={bottomY + 16}
          textAnchor="middle"
          fill="#f43f5e"
          className="font-sketch font-bold select-none"
          style={{ fontFamily: "'Patrick Hand', 'Caveat', cursive", fontSize: '17px' }}
        >
          {label}
        </text>
      </motion.svg>
    </AnimatePresence>
  );
}
