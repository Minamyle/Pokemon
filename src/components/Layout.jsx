import React, { useState } from 'react';
import Sidebar from './Sidebar';

// Functional component 'Layout' with a prop 'children' representing nested components
const Layout = ({ children }) => {
  // State variable to track the visibility of the sidebar, initially set to false
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className='flex flex-row w-[100vw] overflow-x-hidden'>
      <div className='relative z-[100]'>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      </div>
    

    <div className={` ml-auto relative ${!showSidebar? 'sidebar-slide-in-topbar' : 'sidebar-slide-out-in-topbar'} overflow-x-hidden`}>
      <div className={`fixed h-[100vh] menu_right  pb-6  flex items-end ml-6 `}>
      <img src='https://cdn-icons-png.flaticon.com/128/9330/9330299.png' className='bg-white w-10 cursor-pointer h-10' onClick={() => setShowSidebar(!showSidebar)}/>
      </div>
      {children}
    </div>
    

    </div>
  );
}

export default Layout;
