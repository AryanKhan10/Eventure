import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';

const ActionButtons = ({ isMobile }) => {

  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth)
  const containerClasses = isMobile
    ? 'mt-6 pt-6 border-t border-neutral-200'
    : 'hidden md:flex md:items-center gap-3';

  const primaryButtonClasses = isMobile
    ? 'w-full flex justify-center py-3 px-6 rounded-lg bg-primary-600 text-white font-semibold shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:shadow-primary-700/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:-translate-y-0.5 transition-all duration-200'
    : 'inline-flex items-center px-6 py-2.5 rounded-lg bg-primary-600 text-white font-semibold shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:text-white hover:shadow-primary-700/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:-translate-y-0.5 transition-all duration-200';

  const secondaryButtonClasses = isMobile
    ? 'w-full flex justify-center mt-3 py-3 px-6 rounded-lg border-2 border-neutral-300 text-neutral-800 font-semibold hover:bg-neutral-50 hover:border-primary-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:-translate-y-0.5 transition-all duration-200'
    : 'inline-flex items-center px-6 py-2.5 rounded-lg border-2 border-neutral-300 text-neutral-800 font-semibold hover:bg-neutral-50 hover:border-primary-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:-translate-y-0.5 transition-all duration-200';

  return (
    <div className={containerClasses}>
      {
        token === null ?
        (
          <>
            <Link to={'/login'}
              className={secondaryButtonClasses}
            >
              Log in
            </Link>
            <Link 
              to={"/signup"}
              className={primaryButtonClasses}
            >
              Sign up
            </Link>
          </>
        ):(
          <>
            <Link 
              to={"/"}
              className={primaryButtonClasses}
              onClick={()=>{logout(dispatch)}}
            >
              Logout
            </Link>
          </>
        )
      }
    </div>
  );
};

export default ActionButtons;