import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<{ value: number }>({ value: 0 });
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && counterRef.current) {
      gsap.to(countRef.current, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = 
              prefix + 
              countRef.current.value.toFixed(decimals) +
              suffix;
          }
        },
      });
    }
  }, [end, duration, prefix, suffix, decimals, isInView]);

  return (
    <span ref={counterRef} className={className}>
      {prefix + '0' + suffix}
    </span>
  );
};
