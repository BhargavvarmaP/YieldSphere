import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useAnimation } from '../../hooks/useAnimation';
import { cardVariants, buttonVariants, containerVariants, itemVariants } from './animations/variants';
import { useAnimationStore } from '../../store/innovativeStore';

export const SocialRecovery: React.FC = () => {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { animateIn } = useAnimation();
  const [guardians, setGuardians] = React.useState<string[]>([]);
  const [newGuardian, setNewGuardian] = React.useState('');

  useEffect(() => {
    if (containerRef.current) {
      animateIn(containerRef.current);
    }
  }, []);

  const handleAddGuardian = () => {
    if (newGuardian && !guardians.includes(newGuardian)) {
      setGuardians([...guardians, newGuardian]);
      setNewGuardian('');
    }
  };

  const handleRemoveGuardian = (guardian: string) => {
    setGuardians(guardians.filter(g => g !== guardian));
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="p-4 bg-white rounded-lg shadow-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold mb-4"
        >
          Social Recovery Setup
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex gap-2">
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              type="email"
              value={newGuardian}
              onChange={(e) => setNewGuardian(e.target.value)}
              placeholder="Guardian's email"
              className="flex-1 p-2 border rounded-md"
            />
            <motion.button
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              onClick={handleAddGuardian}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Guardian
            </motion.button>
          </div>
          
          <motion.div 
            variants={containerVariants}
            className="space-y-2"
          >
            <AnimatePresence>
              {guardians.map((guardian, index) => (
                <motion.div
                  key={guardian}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <span>{guardian}</span>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleRemoveGuardian(guardian)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SocialRecovery;
