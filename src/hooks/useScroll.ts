import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  scrollX: number;
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export const useScroll = (threshold = 50): ScrollState => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: window.scrollY,
    scrollX: window.scrollX,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      const isAtTop = scrollY < threshold;
      const isAtBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - threshold;

      setScrollState({
        scrollY,
        scrollX,
        direction,
        isAtTop,
        isAtBottom,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrollState;
};
