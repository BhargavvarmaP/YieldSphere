import { useState, useEffect } from 'react';
import { animate } from 'framer-motion';

export function useAnimatedCounter(
  endValue: number,
  duration: number = 2,
  decimals: number = 0
) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, endValue, {
      duration,
      onUpdate: (value) => {
        setDisplayValue(Number(value.toFixed(decimals)));
      },
    });

    return () => controls.stop();
  }, [endValue, duration, decimals]);

  return displayValue;
}