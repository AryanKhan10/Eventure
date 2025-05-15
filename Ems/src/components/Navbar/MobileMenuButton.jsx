import React from 'react';
import { motion } from 'framer-motion';

const MobileMenuButton = ({ isOpen, onClick }) => {
  const top = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6 }
  };
  
  const center = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  
  const bottom = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6 }
  };

  return (
    <button
      type="button"
      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
      aria-expanded={isOpen ? 'true' : 'false'}
      onClick={onClick}
    >
      <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
      <div className="w-6 h-6 flex flex-col justify-around">
        <motion.div
          className="w-6 h-0.5 bg-current rounded-full origin-center"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={top}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-6 h-0.5 bg-current rounded-full origin-center"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={center}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-6 h-0.5 bg-current rounded-full origin-center"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={bottom}
          transition={{ duration: 0.3 }}
        />
      </div>
    </button>
  );
};

export default MobileMenuButton;