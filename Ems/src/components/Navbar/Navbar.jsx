import React, { useState, useEffect } from 'react';
import NavbarBrand from './NavBarBrand'
import NavLinks from './NavLinks';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import ActionButtons from './ActionButtons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu on resize (if mobile menu is open and screen becomes large)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 border border-b-2
    ${hasScrolled 
      ? 'bg-white shadow-subtle' 
      : 'bg-white/90 backdrop-blur-sm'}
    transition-all duration-300
  `;

  return (
    <header className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <NavbarBrand onClick={closeMenu} />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-between md:flex-1">
            <NavLinks closeMenu={closeMenu} />
            <ActionButtons />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <MobileMenuButton isOpen={isOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  );
};

export default Navbar;