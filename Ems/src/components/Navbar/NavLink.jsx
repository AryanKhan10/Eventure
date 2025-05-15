import React from 'react';

const NavLink = ({ item, isMobile, linkClasses, closeMenu }) => {
  console.log(item)
  const handleClick = (e) => {
    e.preventDefault();
    closeMenu();
    console.log(`Navigating to ${item.href}`);
  };
  
  return (
    <div className={isMobile ? '' : 'relative group'}>
      <a
        href={item?.href}
        className={linkClasses}
        onClick={handleClick}
        aria-current={item?.current ? 'page' : undefined}
      >
        {item?.name}
        
        {/* Active indicator for desktop */}
        {!isMobile && item?.current && (
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 rounded-full" />
        )}
      </a>
    </div>
  );
};

export default NavLink;