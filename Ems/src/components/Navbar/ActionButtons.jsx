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
              className='rounded-md border border-purple-500 text-lg font-semibold  p-2 text-purple-500 hover:text-purple-500 transition-all duration-200 delay-100'
            >
              Log in
            </Link>
            <Link 
              to={"/signup"}
              className="rounded-md border border-purple-500 text-lg font-semibold p-2 text-purple-500 hover:text-purple-500 transition-all duration-200 delay-100"
            >
              Sign up
            </Link>
          </>
        ):(
          <>
            <Link 
              to={"/"}
              className="rounded-md border border-purple-500 text-lg font-semibold p-2 text-purple-500 hover:text-purple-500 transition-all duration-200 delay-100"
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