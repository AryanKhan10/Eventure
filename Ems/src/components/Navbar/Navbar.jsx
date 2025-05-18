
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from 'lucide-react';
import ActionButtons from './ActionButtons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Since we don't have an auth slice yet, we'll use the event slice for now
  // You can later move this to a dedicated auth slice if needed
  const role = useSelector(state => state.auth?.user?.role);
// console.log(role)
  const navItems = [
    { role: "user", name: 'Events', path: '/events', current: true },
    { role: "user", name: 'My Tickets', path: '/my-tickets', current: false },
    { role: "organizer", name: 'Create Event', path: '/create-event', current: false },
    { role: "organizer", name: 'My Events', path: '/my-events', current: false },
    { role: "admin", name: 'Dashboard', path: '/dashboard', current: false },
    { role: "admin", name: 'Manage Users', path: '/manage-users', current: false },
    { role: "admin", name: 'Manage Events', path: '/manage-events', current: false },
  ];

  // Filter the navItems based on user role
  // For admin, show all routes
  // For organizer, show organizer and user routes
  // For user, show only user routes
  const filteredNavItems = navItems.filter(item =>item.role === role);

  // console.log(filteredNavItems)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="mx-2 h-8 w-8 bg-gradient-to-br from-purple-500 to-blue-300 rounded-lg flex items-center justify-center shadow-subtle">
              <span className="text-white font-bold text-lg">E</span>
            </div>
              <Link to="/" className="text-2xl font-bold text-gray-800">Eventure</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    item.current
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
               <ActionButtons/>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-300"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`sm:hidden transform transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 max-h-screen' 
            : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden'
        }`}
      >
        <div className="pt-2 pb-3 space-y-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${
                item.current
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <ActionButtons containerClasses='flex flex-col gap-2 px-8 text-center py-4'/>
      </div>
    </nav>
  );
};

export default Navbar;