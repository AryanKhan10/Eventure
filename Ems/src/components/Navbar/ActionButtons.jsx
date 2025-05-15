import React from 'react';

const ActionButtons = ({ isMobile }) => {
  const containerClasses = isMobile
    ? 'mt-6 pt-6 border-t border-neutral-200'
    : 'hidden md:flex md:items-center';

  const primaryButtonClasses = isMobile
    ? 'w-full flex justify-center py-3 px-4 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200'
    : 'ml-6 inline-flex items-center px-4 py-2 rounded-md bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200';

  const secondaryButtonClasses = isMobile
    ? 'w-full flex justify-center mt-3 py-3 px-4 rounded-md border border-neutral-300 text-neutral-800 font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200'
    : 'ml-4 inline-flex items-center px-4 py-2 rounded-md border border-neutral-300 text-neutral-800 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200';

  return (
    <div className={containerClasses}>
      <a
        href="/login"
        className={secondaryButtonClasses}
        onClick={(e) => {
          e.preventDefault();
          console.log('Login clicked');
        }}
      >
        Log in
      </a>
      <a
        href="/signup"
        className={primaryButtonClasses}
        onClick={(e) => {
          e.preventDefault();
          console.log('Sign up clicked');
        }}
      >
        Sign up
      </a>
    </div>
  );
};

export default ActionButtons;