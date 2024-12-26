import React from 'react';
import { motion } from 'framer-motion';
import type { HistoricalData } from '../../types/analytics';

interface TokenChartProps {
  data: HistoricalData[];
  height?: number;
}

export function TokenChart({ data, height = 200 }: TokenChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = ((d.value - minValue) / range) * height;
    return `${x},${height - y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} className="overflow-visible">
      <motion.polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-600"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}