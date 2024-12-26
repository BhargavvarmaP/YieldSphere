import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      const section = sectionRef.current;
      const content = contentRef.current;

      gsap.to(content, {
        y: () => (section.offsetHeight * speed),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};
