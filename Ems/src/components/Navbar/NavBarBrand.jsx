import React from 'react';

const NavbarBrand = ({ onClick }) => {
  return (
    <div className="flex items-center">
      <a 
        href="/" 
        className="flex items-center gap-2 text-neutral-900 dark:text-white transition-all duration-300 hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick();
        }}
      >
        <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center shadow-subtle">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        <span className="font-semibold text-lg tracking-tight hidden sm:block">
          NavBrand
        </span>
      </a>
    </div>
  );
};

export default NavbarBrand;