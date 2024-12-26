import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface AnimatedTextProps {
  children: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  animation?: 'fade' | 'slide' | 'split';
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  element = 'p',
  className = '',
  animation = 'fade',
  delay = 0,
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (textRef.current && animation === 'split') {
      const split = new SplitText(textRef.current, {
        type: 'words,chars',
        linesClass: 'split-line',
      });

      gsap.from(split.chars, {
        duration: 0.6,
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        delay,
        ease: 'back.out(1.7)',
      });

      return () => {
        split.revert();
      };
    }
  }, [animation, delay, children]);

  const getAnimationVariants = () => {
    switch (animation) {
      case 'slide':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.6,
              delay,
              ease: [0.43, 0.13, 0.23, 0.96],
            },
          },
        };
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.6,
              delay,
              ease: 'easeOut',
            },
          },
        };
      default:
        return {};
    }
  };

  const Component = motion[element];
  const variants = getAnimationVariants();

  if (animation === 'split') {
    const Tag = element;
    return <Tag ref={textRef} className={className}>{children}</Tag>;
  }

  return (
    <Component
      ref={textRef}
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </Component>
  );
};
