import React, { createContext, useContext, useCallback } from 'react';
import { useAnimationStore } from '../store/innovativeStore';

interface AnimationContextType {
  isAnimating: boolean;
  currentAnimation: string | null;
  startAnimation: (name: string) => void;
  endAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAnimating, currentAnimation, setIsAnimating, setCurrentAnimation } = useAnimationStore();

  const startAnimation = useCallback((name: string) => {
    setIsAnimating(true);
    setCurrentAnimation(name);
  }, [setIsAnimating, setCurrentAnimation]);

  const endAnimation = useCallback(() => {
    setIsAnimating(false);
    setCurrentAnimation(null);
  }, [setIsAnimating, setCurrentAnimation]);

  return (
    <AnimationContext.Provider
      value={{
        isAnimating,
        currentAnimation,
        startAnimation,
        endAnimation,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return context;
};
