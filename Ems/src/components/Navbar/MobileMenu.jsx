import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavLinks from './NavLinks';
import ActionButtons from './ActionButtons';

const MobileMenu = ({ isOpen, closeMenu }) => {
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3 }
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        opacity: { duration: 0.3 },
        height: { duration: 0.4 }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t border-neutral-100 shadow-subtle">
            <NavLinks isMobile={true} closeMenu={closeMenu} />
            <ActionButtons isMobile={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;