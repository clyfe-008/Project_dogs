import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import NavBar from './NavBar';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';

function SideBar() {
  const [sideBar, setSideBar] = useState(false);

  const showSidebar = () => {
    setSideBar(!sideBar);
  };

  return (
    <>
      <div className='sidebar'>
        <Link to="#" className='menu-bars' onClick={showSidebar}>
          <FaIcons.FaBars />
        </Link>
      </div>
      <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='nav-bar-toggle'>
            <Link to="#" className="menu-bars" onClick={showSidebar}>
              <AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.CName}>
              <Link to={item.path}>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
