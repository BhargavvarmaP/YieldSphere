import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, Info, HelpCircle } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home' },
  { icon: Info, label: 'About' },
  { icon: HelpCircle, label: 'Help' },
  { icon: Settings, label: 'Settings' }
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <motion.button
        onClick={toggleMenu}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg transition-transform duration-300 transform hover:scale-110"
      >
        <span className="text-white text-2xl">+</span>
      </motion.button>

      {isOpen && (
        <div className="flex flex-col items-end mt-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center p-2 rounded-lg bg-gray-800 shadow-lg cursor-pointer hover:bg-gray-700"
            >
              <item.icon className="text-white w-6 h-6 mr-2" />
              <span className="text-white">{item.label}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
