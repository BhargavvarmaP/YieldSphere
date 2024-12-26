import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAnimationStore } from '../store/innovativeStore';

interface AnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
}

export const useAnimation = () => {
  const timeline = useRef(gsap.timeline());
  const { setIsAnimating, setCurrentAnimation } = useAnimationStore();

  const animateIn = (
    element: HTMLElement, 
    options: AnimationOptions = {}
  ) => {
    const { duration = 0.5, ease = 'power2.out', delay = 0 } = options;
    
    setIsAnimating(true);
    setCurrentAnimation('in');

    return timeline.current
      .fromTo(
        element,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration, 
          ease,
          delay,
          onComplete: () => {
            setIsAnimating(false);
            setCurrentAnimation(null);
          }
        }
      );
  };

  const animateOut = (
    element: HTMLElement, 
    options: AnimationOptions = {}
  ) => {
    const { duration = 0.5, ease = 'power2.in', delay = 0 } = options;
    
    setIsAnimating(true);
    setCurrentAnimation('out');

    return timeline.current
      .to(element, { 
        opacity: 0, 
        y: -20, 
        duration, 
        ease,
        delay,
        onComplete: () => {
          setIsAnimating(false);
          setCurrentAnimation(null);
        }
      });
  };

  const animateShake = (
    element: HTMLElement,
    options: AnimationOptions = {}
  ) => {
    const { duration = 0.5, ease = 'power2.inOut', delay = 0 } = options;
    
    setIsAnimating(true);
    setCurrentAnimation('shake');

    return timeline.current
      .to(element, {
        x: 0,
        duration,
        ease,
        delay,
        onComplete: () => {
          setIsAnimating(false);
          setCurrentAnimation(null);
        },
      })
      .to(element, {
        x: [-10, 10, -10, 10, 0] as any,
        duration: duration,
        ease: ease,
      });
  };

  useEffect(() => {
    return () => {
      timeline.current.kill();
    };
  }, []);

  return { 
    animateIn, 
    animateOut, 
    animateShake,
    timeline: timeline.current 
  };
};
