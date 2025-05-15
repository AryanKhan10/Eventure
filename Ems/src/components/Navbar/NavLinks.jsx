import React from 'react';
import { useSelector } from 'react-redux';
import NavLink from './NavLink';

const NavLinks = ({ isMobile = false, closeMenu = () => {} }) => {
  const role  = useSelector((state) => state.auth?.user?.role);

  const navItems = [
    { role: "user", name: 'Events', href: '/events', current: true },
    { role: "user", name: 'My Tickets', href: '/my-tickets', current: false },
    { role: "organizer", name: 'Create Event', href: '/create-events', current: false },
    { role: "organizer", name: 'My Event', href: '/my-events', current: false },
    { role: "admin", name: 'Dashboard', href: '/dashboard', current: false },
    { role: "admin", name: 'Manage Users', href: '/manage-users', current: false },
    { role: "admin", name: 'Manage Events', href: '/manage-events', current: false },
  ];

  const filteredNavItems = navItems.filter(item => item.role === role);

  const linkClasses = isMobile
    ? 'block w-full py-3 px-4 text-neutral-800 font-medium hover:bg-neutral-100 rounded-md transition-colors'
    : 'inline-flex items-center text-sm font-medium text-neutral-700 hover:text-primary-600 px-1 py-2 relative group transition-colors duration-200';

  const activeLinkClasses = isMobile
    ? 'block w-full py-3 px-4 text-primary-600 font-medium hover:bg-neutral-100 rounded-md transition-colors'
    : 'inline-flex items-center text-sm font-medium text-primary-600 px-1 py-2 relative group transition-colors duration-200';

  const mobileGroupClasses = 'py-2';
  const desktopGroupClasses = 'relative px-3';

  return (
    <nav className={`${isMobile ? 'space-y-1' : 'hidden md:ml-10 md:flex md:items-center md:space-x-1'}`}>
      {filteredNavItems.map((item) => (
        <div key={item.name} className={isMobile ? mobileGroupClasses : desktopGroupClasses}>
          <NavLink 
            item={item} 
            isMobile={isMobile} 
            linkClasses={item.current ? activeLinkClasses : linkClasses}
            closeMenu={closeMenu}
          />
        </div>
      ))}
    </nav>
  );
};

export default NavLinks;