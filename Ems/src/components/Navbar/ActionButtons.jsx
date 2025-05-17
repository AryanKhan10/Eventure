import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';

const ActionButtons = ({ containerClasses }) => {

  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth)

  return (
    <div className={containerClasses}>
      {
        token === null ?
        (
          <>
            <Link to={'/login'}
              className='cursor-pointer group relative mx-2 rounded-md border border-transparent bg-black py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]'
            >
              Log in
            </Link>
            <Link 
              to={"/signup"}
              className="cursor-pointer group relative mx-2 rounded-md border border-transparent bg-black py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign up
            </Link>
          </>
        ):(
          <>
            <Link 
              to={"/"}
              className="cursor-pointer group relative mx-2 rounded-md border border-transparent bg-black py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
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