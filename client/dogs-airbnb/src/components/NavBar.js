import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      
      {isSidebarVisible && (
        <div className="sidebar">
          <ul>
                <li>
                  <Link to='/signup'>Signup</Link>
                </li> 
                <li>
                  <Link to='/developers'>Developers</Link>
                </li>
                
                <li>
                  <Link to='/contact'>Contact</Link>
                </li>
                <li>
                  <Link to='/about'>About</Link>
                </li>
            </ul>
        </div>
      )}

      <nav className="navbar">
       
        <svg
          onClick={toggleSidebar}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="user-icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <span className="login-prompt">Login</span>
      </nav>
      <Outlet/>
    </div>
  );
};

export default NavBar;

